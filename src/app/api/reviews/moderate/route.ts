/**
 * 🛡️ /api/reviews/moderate — داشبورد الإشراف على التقييمات
 *
 * GET  ?status=pending  → قائمة التقييمات المعلّقة (بالصور وبيانات المكافأة)
 * POST {action:'approve'|'reject'|'hide'|'restore'|'delete', reviewId, reason?}
 *   الموافقة: status=approved + إخطار الـCRM (Bearer CRM_WEBHOOK_SECRET) ليُرسل
 *   كوبون 5% واتساب للعميل. فشل الإخطار لا يفشل الموافقة (rewardStatus=notify_failed
 *   وإعادة الموافقة تعيد المحاولة — idempotent في الـCRM بمعرّف التقييم).
 *   الإخفاء: يخرج التقييم فوراً من الواجهة العامة وAggregateRating وJSON-LD مع
 *   الاحتفاظ بالمحتوى والصور لاستعادته لاحقاً.
 *   الحذف: يخفي أولاً، ثم يحذف صور التقييم المملوكة لنا من Storage، ثم يحذف
 *   مستند Firestore نهائياً ويترك حدث تدقيق بلا محتوى أو بيانات عميل.
 *
 * الحماية: X-Admin-Secret = ADMIN_TASKS_SECRET (نفس نمط /api/reviews/sync).
 */
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import crypto from 'crypto';
import { getFirestore, getStorageBucket } from '@/lib/firebase-admin';
import { isAdminSessionValid } from '@/lib/admin-session';
import { getProductBySlug } from '@/lib/static-products';

const json = (body: unknown, status = 200) =>
    NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

const REVIEW_STATUSES = new Set(['pending', 'approved', 'rejected', 'hidden']);
const MODERATION_ACTIONS = new Set(['approve', 'reject', 'hide', 'restore', 'delete']);
const REVIEW_ID_PATTERN = /^[A-Za-z0-9_-]{5,128}$/;
const PRODUCT_SLUG_PATTERN = /^[a-z0-9][a-z0-9._-]{0,179}$/;
const MAX_DELETE_IMAGES = 10;
const MAX_DASHBOARD_IMAGES = 10;

function moderationReason(value: unknown): string {
    return typeof value === 'string'
        ? value.replace(/[\u0000-\u001f\u007f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200)
        : '';
}

function serializeDate(value: unknown): string | null {
    if (value instanceof Date && Number.isFinite(value.getTime())) return value.toISOString();
    if (value && typeof value === 'object' && 'toDate' in value
        && typeof (value as { toDate?: unknown }).toDate === 'function') {
        const date = (value as { toDate: () => Date }).toDate();
        return Number.isFinite(date.getTime()) ? date.toISOString() : null;
    }
    return null;
}

function dashboardString(value: unknown, maxLength: number): string {
    return typeof value === 'string' ? value.slice(0, maxLength) : '';
}

function dashboardImages(value: unknown): string[] {
    if (!Array.isArray(value)) return [];
    return value
        .filter((image): image is string => (
            typeof image === 'string'
            && image.startsWith('https://')
            && image.length <= 2_000
        ))
        .slice(0, MAX_DASHBOARD_IMAGES);
}

// يبطل بيانات التقييمات والصفحات المشتقة منها: القائمة، المتوسط، وReview JSON-LD.
function revalidateReviews(productSlug = '') {
    try {
        revalidateTag('reviews', 'default');
        if (!PRODUCT_SLUG_PATTERN.test(productSlug)) return;

        const product = getProductBySlug(productSlug);
        if (!product) return;
        const brand = String(product.brand || '').toLowerCase();
        const category = String(product.categorySlug || '').toLowerCase();
        if (!brand || !category) return;

        for (const path of [
            `/${brand}/${category}/${productSlug}`,
            `/ar/${brand}/${category}/${productSlug}`,
            `/en/${brand}/${category}/${productSlug}`,
        ]) {
            revalidatePath(path, 'page');
        }
    } catch (e) {
        console.error('[moderate] revalidate reviews failed:', (e as Error).message);
    }
}

function isAuthorized(req: NextRequest): boolean {
    // جلسة أدمن بالكوكي (الدخول الموحّد من لوحة الحسابات) — أو سر X-Admin-Secret.
    if (isAdminSessionValid(req)) return true;
    const expected = process.env.ADMIN_TASKS_SECRET || '';
    if (!expected) return false;
    const got = req.headers.get('x-admin-secret') || '';
    const gotBuffer = Buffer.from(got);
    const expectedBuffer = Buffer.from(expected);
    return gotBuffer.length === expectedBuffer.length
        && crypto.timingSafeEqual(gotBuffer, expectedBuffer);
}

function reviewOwnedStoragePath(
    value: unknown,
    productSlug: string,
    bucketName: string,
): string | null {
    if (typeof value !== 'string' || !value) return null;

    let path = value;
    if (value.startsWith('https://')) {
        try {
            const url = new URL(value);
            if (url.hostname !== 'firebasestorage.googleapis.com') return null;
            const parts = url.pathname.split('/');
            if (parts[1] !== 'v0' || parts[2] !== 'b' || parts[4] !== 'o') return null;
            if (decodeURIComponent(parts[3] || '') !== bucketName) return null;
            path = decodeURIComponent(parts.slice(5).join('/'));
        } catch {
            return null;
        }
    }

    const expectedPrefix = `reviews/${productSlug}/`;
    return path.startsWith(expectedPrefix)
        && path.length > expectedPrefix.length
        && !path.includes('\u0000')
        ? path
        : null;
}

async function deleteReviewMedia(review: Record<string, unknown>): Promise<{
    deleted: number;
    skipped: number;
    failed: number;
}> {
    const productSlug = String(review.productSlug || '').toLowerCase();
    if (!PRODUCT_SLUG_PATTERN.test(productSlug)) {
        return { deleted: 0, skipped: 0, failed: 0 };
    }

    const bucket = await getStorageBucket();
    const candidates = [
        ...(Array.isArray(review.imagePaths) ? review.imagePaths : []),
        ...(Array.isArray(review.images) ? review.images : []),
    ].slice(0, MAX_DELETE_IMAGES * 2);
    const paths = new Set<string>();
    let skipped = 0;

    for (const candidate of candidates) {
        const path = reviewOwnedStoragePath(candidate, productSlug, bucket.name);
        if (path) paths.add(path);
        else skipped += 1;
        if (paths.size >= MAX_DELETE_IMAGES) break;
    }

    let deleted = 0;
    let failed = 0;
    await Promise.all([...paths].map(async path => {
        try {
            await bucket.file(path).delete({ ignoreNotFound: true });
            deleted += 1;
        } catch {
            failed += 1;
        }
    }));

    return { deleted, skipped, failed };
}

function moderationAudit(
    action: string,
    reviewId: string,
    review: Record<string, unknown>,
    previousStatus: string,
    extra: Record<string, unknown> = {},
) {
    return {
        action,
        reviewId,
        productSlug: String(review.productSlug || '').slice(0, 180),
        previousStatus: previousStatus.slice(0, 30),
        createdAt: FieldValue.serverTimestamp(),
        ...extra,
    };
}

export async function GET(req: NextRequest) {
    if (!isAuthorized(req)) return json({ error: 'Unauthorized' }, 401);
    const status = req.nextUrl.searchParams.get('status') || 'pending';
    if (!REVIEW_STATUSES.has(status)) return json({ error: 'Bad status' }, 400);
    const db = await getFirestore();
    const statusQuery = db.collection('reviews').where('status', '==', status);

    // استعلام خفيف للعداد الحي في الداشبورد؛ لا ينقل محتوى التقييم أو بيانات العميل.
    if (req.nextUrl.searchParams.get('countOnly') === '1') {
        const countSnap = await statusQuery.count().get();
        return json({ count: countSnap.data().count });
    }

    const snap = await statusQuery.limit(60).get();
    const reviews = snap.docs.map(d => {
        const r = d.data() as Record<string, unknown>;
        return {
            id: d.id,
            productSlug: dashboardString(r.productSlug, 180),
            productName: dashboardString(r.productName, 140),
            customerName: dashboardString(r.customerName, 100),
            rating: typeof r.rating === 'number' && Number.isFinite(r.rating)
                ? Math.max(0, Math.min(5, Math.round(r.rating)))
                : 0,
            title: dashboardString(r.title, 120),
            reviewText: dashboardString(r.reviewText, 1_200),
            images: dashboardImages(r.images),
            isVerified: r.isVerified === true,
            authEmail: dashboardString(r.authEmail, 254),
            authProvider: dashboardString(r.authProvider, 40),
            rewardPhone: dashboardString(r.rewardPhone, 40),
            rewardStatus: dashboardString(r.rewardStatus, 60),
            rewardRef: dashboardString(r.rewardRef, 180),
            reviewDate: serializeDate(r.reviewDate),
            hiddenAt: serializeDate(r.hiddenAt),
            hiddenReason: dashboardString(r.hiddenReason, 200),
            deletionStatus: dashboardString(r.deletionStatus, 60),
        };
    }).sort((a, b) => String(b.reviewDate || '').localeCompare(String(a.reviewDate || '')));
    return json({ reviews, count: snap.size });
}

export async function POST(req: NextRequest) {
    if (!isAuthorized(req)) return json({ error: 'Unauthorized' }, 401);
    let body: Record<string, unknown>;
    try { body = await req.json(); } catch { return json({ error: 'Bad JSON' }, 400); }
    const action = String(body.action || '');
    const reviewId = String(body.reviewId || '');
    const reason = moderationReason(body.reason);
    if (!MODERATION_ACTIONS.has(action) || !REVIEW_ID_PATTERN.test(reviewId)) {
        return json({ error: 'Bad request' }, 400);
    }

    const db = await getFirestore();
    const ref = db.collection('reviews').doc(reviewId);
    const snap = await ref.get();
    if (!snap.exists) return json({ error: 'التقييم غير موجود' }, 404);
    const r = snap.data() as Record<string, unknown>;
    const previousStatus = String(r.status || '');
    const auditRef = db.collection('review_moderation_events').doc();

    if (action === 'reject') {
        if (previousStatus !== 'pending') {
            return json({ error: 'يمكن رفض التقييمات المعلّقة فقط', status: previousStatus }, 409);
        }
        const batch = db.batch();
        batch.update(ref, {
            status: 'rejected',
            rejectReason: reason,
            moderatedAt: FieldValue.serverTimestamp(),
            rewardStatus: 'rejected',
        });
        batch.create(auditRef, moderationAudit('reject', reviewId, r, previousStatus, { reason }));
        await batch.commit();
        revalidateReviews(String(r.productSlug || ''));
        return json({ success: true, status: 'rejected' });
    }

    if (action === 'hide') {
        if (previousStatus !== 'approved') {
            return json({ error: 'يمكن إخفاء التقييمات المنشورة فقط', status: previousStatus }, 409);
        }
        const batch = db.batch();
        batch.update(ref, {
            status: 'hidden',
            hiddenAt: FieldValue.serverTimestamp(),
            hiddenReason: reason,
            moderatedAt: FieldValue.serverTimestamp(),
            deletionStatus: FieldValue.delete(),
            deletionErrorCount: FieldValue.delete(),
        });
        batch.create(auditRef, moderationAudit('hide', reviewId, r, previousStatus, { reason }));
        await batch.commit();
        revalidateReviews(String(r.productSlug || ''));
        return json({ success: true, status: 'hidden' });
    }

    if (action === 'restore') {
        if (previousStatus !== 'hidden') {
            return json({ error: 'يمكن استعادة التقييمات المخفية فقط', status: previousStatus }, 409);
        }
        if (typeof r.deletionStatus === 'string' && r.deletionStatus) {
            return json({
                error: 'لا يمكن استعادة التقييم بعد بدء الحذف العميق. أعد محاولة الحذف النهائي لإكمال تنظيف الملفات.',
                status: previousStatus,
            }, 409);
        }
        const batch = db.batch();
        batch.update(ref, {
            status: 'approved',
            restoredAt: FieldValue.serverTimestamp(),
            moderatedAt: FieldValue.serverTimestamp(),
            hiddenAt: FieldValue.delete(),
            hiddenReason: FieldValue.delete(),
            deletionStatus: FieldValue.delete(),
            deletionErrorCount: FieldValue.delete(),
            deletionAttemptedAt: FieldValue.delete(),
        });
        batch.create(auditRef, moderationAudit('restore', reviewId, r, previousStatus));
        await batch.commit();
        revalidateReviews(String(r.productSlug || ''));
        return json({ success: true, status: 'approved' });
    }

    if (action === 'delete') {
        if (previousStatus !== 'approved' && previousStatus !== 'hidden') {
            return json({ error: 'يمكن حذف التقييمات المنشورة أو المخفية فقط', status: previousStatus }, 409);
        }

        // Safety order: make the review non-public before any irreversible media deletion.
        await ref.update({
            status: 'hidden',
            hiddenAt: FieldValue.serverTimestamp(),
            hiddenReason: reason || 'حذف نهائي قيد التنفيذ',
            deletionStatus: 'cleaning_storage',
            deletionAttemptedAt: FieldValue.serverTimestamp(),
        });
        revalidateReviews(String(r.productSlug || ''));

        let media: Awaited<ReturnType<typeof deleteReviewMedia>>;
        try {
            media = await deleteReviewMedia(r);
        } catch {
            await ref.update({
                deletionStatus: 'storage_cleanup_failed',
                deletionErrorCount: 1,
            });
            return json({
                error: 'تم إخفاء التقييم، لكن تعذّر الاتصال بالتخزين لحذف الصور. أعد المحاولة من تبويب المخفية.',
                status: 'hidden',
                partial: true,
                deletedImages: 0,
            }, 502);
        }
        if (media.failed > 0) {
            await ref.update({
                deletionStatus: 'storage_cleanup_failed',
                deletionErrorCount: media.failed,
            });
            return json({
                error: 'تم إخفاء التقييم، لكن تعذّر حذف بعض الصور. أعد المحاولة من تبويب المخفية.',
                status: 'hidden',
                partial: true,
                deletedImages: media.deleted,
            }, 502);
        }

        const batch = db.batch();
        batch.delete(ref);
        batch.create(auditRef, moderationAudit('delete', reviewId, r, previousStatus, {
            reason,
            deletedImageCount: media.deleted,
            skippedExternalImageCount: media.skipped,
        }));
        await batch.commit();
        revalidateReviews(String(r.productSlug || ''));
        return json({
            success: true,
            status: 'deleted',
            deletedImages: media.deleted,
        });
    }

    // approve
    if (previousStatus !== 'pending' && previousStatus !== 'approved') {
        return json({ error: 'لا يمكن نشر هذا التقييم من حالته الحالية', status: previousStatus }, 409);
    }
    await ref.update({
        status: 'approved',
        moderatedAt: FieldValue.serverTimestamp(),
    });

    // ♻️ إبطال كاش تقييمات المنتجات فوراً حتى يظهر التقييم المعتمد على صفحة المنتج
    //    بلا انتظار TTL الساعة (getCachedVerifiedReviews/AggregateRating موسومة بـ'reviews').
    revalidateReviews(String(r.productSlug || ''));

    // 🎁 إخطار الـCRM ليُرسل كوبون 5% (idempotent هناك بمعرّف التقييم)
    let rewardStatus = 'crm_notified';
    try {
        const crmBase = (process.env.CRM_WEBHOOK_URL || '').replace(/\/api\/webhook\/new-lead$/, '');
        const secret = process.env.CRM_WEBHOOK_SECRET || '';
        if (!crmBase || !secret) throw new Error('CRM config missing');
        const resp = await fetch(`${crmBase}/api/webhook/review-approved`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
            body: JSON.stringify({
                reviewId,
                phone: r.rewardPhone || '',
                rewardRef: r.rewardRef || '',
                name: r.customerName,
                productName: r.productName,
                productSlug: r.productSlug,
            }),
            signal: AbortSignal.timeout(15000),
        });
        const j = (await resp.json().catch(() => ({}))) as Record<string, unknown>;
        if (!resp.ok || !j.success) {
            rewardStatus = 'notify_failed';
            console.error('[moderate] CRM notify failed:', resp.status, j.error || '');
        } else if (j.delivery === 'no_reward') {
            rewardStatus = 'no_reward'; // تقييم عضوي بلا رمز حملة — نُشر بلا كوبون
        }
    } catch (e) {
        rewardStatus = 'notify_failed';
        console.error('[moderate] CRM notify error:', (e as Error).message);
    }
    await ref.update({ rewardStatus });
    return json({ success: true, status: 'approved', rewardStatus });
}
