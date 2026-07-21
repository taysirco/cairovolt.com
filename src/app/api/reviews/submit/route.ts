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
import { verifyGoogleIdToken, verifyFacebookAccessToken, verifyBuyerToken, type ReviewIdentity } from '@/lib/review-auth';
import { getProductBySlug } from '@/lib/static-products';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';

const MAX_BODY_BYTES = 4 * 1024 * 1024;          // 4MB (3 صور مضغوطة + النص)
const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 600 * 1024;              // بعد ضغط العميل — حارس خادمي
const SLUG_PATTERN = /^[a-z0-9-]{3,80}$/;

const json = (body: unknown, status = 200) =>
    NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

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

    // 1) الهوية — إما تسجيل دخول جوجل/فيسبوك، أو توكن طلب-التقييم (?rvw=) لمشترٍ موثَّق.
    //    التوكن يعمل على أي متصفح بلا OAuth، ويثبت شراءً فعلياً (أقوى من حساب عشوائي).
    const provider = String(data.provider || '');
    const credential = String(data.credential || '');
    const rewardRef = String(data.rewardRef || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64);
    let identity: ReviewIdentity | null = null;
    if (credential) {
        identity = provider === 'facebook'
            ? await verifyFacebookAccessToken(credential)
            : await verifyGoogleIdToken(credential);
    }
    if (!identity && rewardRef) identity = await verifyBuyerToken(rewardRef);
    if (!identity) return json({ error: 'سجّل الدخول بجوجل أو فيسبوك، أو افتح رابط التقييم من رسالة الواتساب ثم أعد الإرسال' }, 401);

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

    // 4) مرجع المكافأة (rewardRef) عُرّف أعلاه — يوثّق المشترِي ويربطه بهاتفه في الـCRM
    //    لإرسال كوبون 5% بعد الاعتماد بلا سؤاله عن رقمه. غيابه = تقييم عضوي بلا مكافأة.

    const db = await getFirestore();

    // 5) منع التكرار — مع إبقاء صلاحية التوكن حتى الاعتماد+النشر:
    //    • مسار التوكن (مشترٍ موثَّق): تقييم واحد لكل توكن — لا يُستهلك إلا بموافقة الأدمن
    //      (وجود تقييم approved). المرفوض يسمح بإعادة الإرسال؛ المعلّق يمنع مؤقتاً.
    //      يعالج تعدّد المشتريات: كل طلب له توكنه المستقل فلا يتأثر بعضها ببعض.
    //    • مسار جوجل/فيسبوك: تقييم واحد لكل (مستخدم × منتج) بنفس القاعدة.
    const isTokenId = identity.provider === 'whatsapp';
    const dupSnap = isTokenId
        ? await db.collection('reviews').where('rewardRef', '==', rewardRef).get()
        : await db.collection('reviews')
            .where('authSubject', '==', identity.subject)
            .where('productSlug', '==', productSlug).get();
    const activeDup = dupSnap.docs.find(d => {
        const s = String((d.data() as Record<string, unknown>).status || '');
        return s === 'approved' || s === 'pending';
    });
    if (activeDup) {
        const s = String((activeDup.data() as Record<string, unknown>).status);
        return json({
            error: s === 'approved'
                ? 'قيّمت هذا المنتج بالفعل — شكراً لك! 🌟'
                : 'تقييمك السابق قيد المراجعة — سيظهر فور اعتماده 🙌',
        }, 409);
    }

    // 6) «مشترٍ موثَّق»: وجود مرجع مكافأة يعني أن التقييم جاء من رابط طلب-تقييم
    //    (يُرسَل فقط لعملاء لديهم طلب مُسلَّم). التحقق النهائي للمكافأة يتم في الـCRM.
    const isVerified = rewardRef.length > 0;
    const orderId = '', orderDocId = '', purchaseDate = new Date();

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
        rewardPhone: '',
        rewardRef,
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
