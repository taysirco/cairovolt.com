/**
 * 🛡️ /api/reviews/moderate — داشبورد الإشراف على التقييمات
 *
 * GET  ?status=pending  → قائمة التقييمات المعلّقة (بالصور وبيانات المكافأة)
 * POST {action:'approve'|'reject', reviewId, reason?}
 *   الموافقة: status=approved + إخطار الـCRM (Bearer CRM_WEBHOOK_SECRET) ليُرسل
 *   كوبون 5% واتساب للعميل. فشل الإخطار لا يفشل الموافقة (rewardStatus=notify_failed
 *   وإعادة الموافقة تعيد المحاولة — idempotent في الـCRM بمعرّف التقييم).
 *
 * الحماية: X-Admin-Secret = ADMIN_TASKS_SECRET (نفس نمط /api/reviews/sync).
 */
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getFirestore } from '@/lib/firebase-admin';
import { isAdminSessionValid } from '@/lib/admin-session';

const json = (body: unknown, status = 200) =>
    NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

// يبطل كاش بيانات التقييمات (نفس الوسم الذي يستخدمه seed-reviews) — فشله لا يفشل الإشراف.
function revalidateReviews() {
    try {
        revalidateTag('reviews', 'default');
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
    return got.length === expected.length && got === expected;
}

export async function GET(req: NextRequest) {
    if (!isAuthorized(req)) return json({ error: 'Unauthorized' }, 401);
    const status = req.nextUrl.searchParams.get('status') || 'pending';
    if (!['pending', 'approved', 'rejected'].includes(status)) return json({ error: 'Bad status' }, 400);
    const db = await getFirestore();
    const snap = await db.collection('reviews').where('status', '==', status).limit(60).get();
    const reviews = snap.docs.map(d => {
        const r = d.data() as Record<string, unknown>;
        return {
            id: d.id,
            productSlug: r.productSlug, productName: r.productName,
            customerName: r.customerName, rating: r.rating,
            title: r.title, reviewText: r.reviewText,
            images: r.images || [],
            isVerified: r.isVerified === true,
            authEmail: r.authEmail || '', authProvider: r.authProvider || '',
            rewardPhone: r.rewardPhone || '', rewardStatus: r.rewardStatus || '',
            rewardRef: r.rewardRef || '',
            reviewDate: (r.reviewDate as { toDate?: () => Date })?.toDate?.()?.toISOString?.() || null,
        };
    }).sort((a, b) => String(b.reviewDate || '').localeCompare(String(a.reviewDate || '')));
    return json({ reviews });
}

export async function POST(req: NextRequest) {
    if (!isAuthorized(req)) return json({ error: 'Unauthorized' }, 401);
    let body: Record<string, unknown>;
    try { body = await req.json(); } catch { return json({ error: 'Bad JSON' }, 400); }
    const action = String(body.action || '');
    const reviewId = String(body.reviewId || '');
    if (!['approve', 'reject'].includes(action) || !/^[A-Za-z0-9_-]{5,40}$/.test(reviewId)) {
        return json({ error: 'Bad request' }, 400);
    }

    const db = await getFirestore();
    const ref = db.collection('reviews').doc(reviewId);
    const snap = await ref.get();
    if (!snap.exists) return json({ error: 'التقييم غير موجود' }, 404);
    const r = snap.data() as Record<string, unknown>;

    if (action === 'reject') {
        await ref.update({
            status: 'rejected',
            rejectReason: String(body.reason || '').slice(0, 200),
            moderatedAt: new Date(),
            rewardStatus: 'rejected',
        });
        revalidateReviews();
        return json({ success: true, status: 'rejected' });
    }

    // approve
    await ref.update({ status: 'approved', moderatedAt: new Date() });

    // ♻️ إبطال كاش تقييمات المنتجات فوراً حتى يظهر التقييم المعتمد على صفحة المنتج
    //    بلا انتظار TTL الساعة (getCachedVerifiedReviews/AggregateRating موسومة بـ'reviews').
    revalidateReviews();

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
