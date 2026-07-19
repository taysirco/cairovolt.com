/**
 * ⭐ POST /api/reviews/submit — إرسال تقييم من صفحة المنتج (النظام المبسّط)
 *
 * التدفق: تسجيل دخول جوجل على الصفحة → التقييم (نجوم/عنوان/نص/هاتف واتساب/صور
 * مضغوطة على جهاز العميل) → يُحفظ بحالة pending → داشبورد الإشراف توافق/ترفض →
 * الموافقة تُخطر الـCRM فيرسل كوبون 5% واتساب.
 *
 * الصور: يضغطها المتصفح (≤1200px، JPEG) قبل الرفع؛ هنا نتحقق من الحجم والنوع
 * ونخزّنها في Firebase Storage بتوكن تنزيل — صفحات المنتج تعرض مصغّرات كسولة.
 */
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getFirestore, getStorageBucket } from '@/lib/firebase-admin';
import { verifyGoogleIdToken, verifyFacebookAccessToken } from '@/lib/review-auth';
import { getProductBySlug } from '@/lib/static-products';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';

const MAX_BODY_BYTES = 4 * 1024 * 1024;          // 4MB (3 صور مضغوطة + النص)
const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 600 * 1024;              // بعد ضغط العميل — حارس خادمي
const SLUG_PATTERN = /^[a-z0-9-]{3,80}$/;

const json = (body: unknown, status = 200) =>
    NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

function normalizePhone(v: unknown): string {
    const d = String(v || '').replace(/\D/g, '');
    if (d.startsWith('20')) return d;
    if (d.startsWith('0')) return `2${d}`;
    if (d.startsWith('1') && d.length === 10) return `20${d}`;
    return d;
}

export async function POST(req: NextRequest) {
    const ip = getClientIp(req.headers);
    const rate = checkRateLimit(`reviews-submit:${ip}`, true);
    if (!rate.allowed) return json({ error: 'محاولات كثيرة — جرّب بعد دقيقة' }, 429);

    if (Number(req.headers.get('content-length') || 0) > MAX_BODY_BYTES) {
        return json({ error: 'حجم الطلب كبير — قلّل عدد الصور' }, 413);
    }

    let data: Record<string, unknown>;
    try {
        const raw = await req.text();
        if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) return json({ error: 'حجم الطلب كبير' }, 413);
        data = JSON.parse(raw) as Record<string, unknown>;
    } catch {
        return json({ error: 'طلب غير صالح' }, 400);
    }

    // 1) الهوية — تسجيل دخول جوجل أو فيسبوك إلزامي
    const provider = String(data.provider || 'google');
    const identity = provider === 'facebook'
        ? await verifyFacebookAccessToken(String(data.credential || ''))
        : await verifyGoogleIdToken(String(data.credential || ''));
    if (!identity) return json({ error: 'سجّل الدخول بحساب جوجل أو فيسبوك أولاً ثم أعد الإرسال' }, 401);

    // 2) المنتج
    const productSlug = String(data.productSlug || '').toLowerCase();
    if (!SLUG_PATTERN.test(productSlug)) return json({ error: 'منتج غير معروف' }, 400);
    const product = getProductBySlug(productSlug);
    if (!product) return json({ error: 'منتج غير معروف' }, 400);

    // 3) المحتوى
    const rating = Number(data.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return json({ error: 'اختر تقييماً من 1 إلى 5 نجوم' }, 400);
    const reviewText = String(data.reviewText || '').replace(/\s+/g, ' ').trim();
    if (reviewText.length < 10 || reviewText.length > 1200) return json({ error: 'اكتب تقييماً من 10 إلى 1200 حرف' }, 400);
    const title = String(data.title || '').replace(/\s+/g, ' ').trim().slice(0, 90);
    const displayName = (String(data.displayName || '').trim() || identity.name).slice(0, 60);

    // 4) هاتف الواتساب — بوابة هدية الـ5% (إلزامي لضمان وصول المكافأة)
    const phone = normalizePhone(data.phone);
    if (!/^20(10|11|12|15)\d{8}$/.test(phone)) {
        return json({ error: 'اكتب رقم واتساب مصري صحيح لاستلام هدية 5% بعد الموافقة' }, 400);
    }

    const db = await getFirestore();

    // 5) منع التكرار: تقييم واحد لكل (مستخدم جوجل × منتج)
    const dup = await db.collection('reviews')
        .where('authSubject', '==', identity.subject)
        .where('productSlug', '==', productSlug)
        .limit(1).get();
    if (!dup.empty) return json({ error: 'قيّمت هذا المنتج بالفعل — شكراً لك! 🌟' }, 409);

    // 6) «مشترٍ موثَّق»: الهاتف له طلب في المتجر يحوي هذا المنتج
    let isVerified = false, orderId = '', orderDocId = '', purchaseDate = new Date();
    try {
        // الطلبات تخزّن الهاتف بالصيغة الوطنية (01xxxxxxxxx)؛ normalizePhone يخرج دولياً
        // (2010…) لذا نحوّل بادئة "20" كاملةً إلى "0" — لا "2" وحدها (كانت تنتج 00…).
        const nationalPhone = phone.replace(/^20/, '0');
        const orders = await db.collection('orders').where('phone', '==', nationalPhone).limit(25).get();
        for (const doc of orders.docs) {
            const o = doc.data() as Record<string, unknown>;
            const items = Array.isArray(o.items) ? (o.items as Array<Record<string, unknown>>) : [];
            // مطابقة صارمة فقط: معرّف المنتج أو SKU غير الفارغ — لا مطابقة اسم ضبابية
            // (كانت تربط منتجات مختلفة تتشارك بادئة الاسم، وSKU الفارغ يطابق أي صنف).
            const hit = items.some(it => String(it.productId || '') === productSlug
                || (!!product.sku && String(it.sku || '') === String(product.sku)));
            if (hit) {
                isVerified = true;
                orderId = String(o.orderId || '');
                orderDocId = doc.id;
                const created = o.createdAt as { toDate?: () => Date } | undefined;
                if (created?.toDate) purchaseDate = created.toDate();
                break;
            }
        }
    } catch { /* التوثيق ميزة إضافية — فشله لا يمنع التقييم */ }

    // 7) الصور: JPEG مضغوطة من العميل → Storage بتوكن تنزيل
    const images: string[] = [];
    const photos = Array.isArray(data.photos) ? (data.photos as string[]).slice(0, MAX_PHOTOS) : [];
    if (photos.length) {
        try {
            const bucket = await getStorageBucket();
            for (const [i, photo] of photos.entries()) {
                const b64 = String(photo).replace(/^data:image\/(jpeg|jpg|webp);base64,/, '');
                const buf = Buffer.from(b64, 'base64');
                if (buf.length < 100 || buf.length > MAX_PHOTO_BYTES) continue;
                // JPEG magic bytes (يقبل أيضاً WebP من متصفحات تضغط له)
                const isJpeg = buf[0] === 0xff && buf[1] === 0xd8;
                const isWebp = buf.slice(8, 12).toString('ascii') === 'WEBP';
                if (!isJpeg && !isWebp) continue;
                const token = crypto.randomUUID();
                const path = `reviews/${productSlug}/${Date.now()}_${i}.${isWebp ? 'webp' : 'jpg'}`;
                const file = bucket.file(path);
                await file.save(buf, {
                    contentType: isWebp ? 'image/webp' : 'image/jpeg',
                    metadata: { cacheControl: 'public, max-age=31536000, immutable', metadata: { firebaseStorageDownloadTokens: token } },
                });
                images.push(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${token}`);
            }
        } catch (e) {
            console.error('[reviews/submit] photo upload failed:', (e as Error).message);
        }
    }

    // 8) الحفظ — بحالة pending حتى موافقة الداشبورد
    const now = new Date();
    const docRef = await db.collection('reviews').add({
        productSlug,
        productName: String(product.translations?.ar?.name || product.slug).slice(0, 140),
        orderId, orderDocId,
        customerName: displayName,
        customerInitials: displayName.slice(0, 2),
        rating, title, reviewText,
        pros: [], cons: [],
        images,
        purchaseDate, reviewDate: now, createdAt: now,
        isVerified,
        status: 'pending',
        governorate: '',
        helpfulCount: 0,
        locale: 'ar',
        // هوية المُقيِّم + هاتف المكافأة (لا يُعرضان للعامة — GET يرشّح الحقول)
        authProvider: identity.provider,
        authSubject: identity.subject,
        authEmail: identity.email,
        rewardPhone: phone,
        rewardStatus: 'awaiting_moderation',
        submitIp: ip,
    });

    return json({
        success: true,
        reviewId: docRef.id,
        message: 'وصل تقييمك — قيد المراجعة، وفور الموافقة هتوصلك هدية كوبون 5% على الواتساب 🎁',
        verifiedBuyer: isVerified,
    });
}
