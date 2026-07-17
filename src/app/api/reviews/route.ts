/**
 * Reviews API Endpoints
 * GET: Fetch purchase-verified reviews for a product from Firestore
 * POST: Submit a new verified review
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import {
    getProductReviews,
    submitReview,
    calculateVerifiedAggregateRating,
    validateReviewToken,
    getReviewCustomerDisplayName,
} from '@/lib/verified-reviews';
import { getProductBySlug } from '@/lib/static-products';
import {
    localizeArabicBrandContent,
    localizeArabicBrandNames,
} from '@/lib/arabic-brand-names';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';

const MAX_REVIEW_BODY_BYTES = 16 * 1024;
const MAX_REVIEW_TEXT_LENGTH = 500;
const MAX_REVIEW_TITLE_LENGTH = 100;
const MAX_DISPLAY_NAME_LENGTH = 50;
const MAX_LIST_ITEMS = 5;
const MAX_LIST_ITEM_LENGTH = 160;
const REVIEW_TOKEN_PATTERN = /^[a-f0-9]{32}$/i;
const PRODUCT_SLUG_PATTERN = /^[a-z0-9][a-z0-9._-]{0,179}$/;

function rateLimitResponse(req: NextRequest, isWrite: boolean): NextResponse | null {
    const result = checkRateLimit(`reviews:${getClientIp(req.headers)}`, isWrite);
    if (result.allowed) return null;

    return NextResponse.json(
        { error: 'Too many requests. Please try again shortly.' },
        {
            status: 429,
            headers: { 'Cache-Control': 'no-store', 'Retry-After': '60' },
        },
    );
}

function normalizeSingleLine(value: unknown): string {
    return typeof value === 'string'
        ? value.replace(/[\u0000-\u001f\u007f<>]/g, ' ').replace(/\s+/g, ' ').trim()
        : '';
}

function normalizeReviewText(value: unknown): string {
    return typeof value === 'string'
        ? value.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f<>]/g, '').trim()
        : '';
}

function normalizeReviewList(value: unknown): string[] | null {
    if (value === undefined || value === null) return [];
    if (!Array.isArray(value) || value.length > MAX_LIST_ITEMS) return null;

    const items: string[] = [];
    for (const entry of value) {
        const normalized = normalizeSingleLine(entry);
        if (typeof entry !== 'string' || normalized.length > MAX_LIST_ITEM_LENGTH) return null;
        if (normalized) items.push(normalized);
    }
    return items;
}

// GET /api/reviews?productSlug=xxx&locale=ar
export async function GET(req: NextRequest) {
    const limited = rateLimitResponse(req, false);
    if (limited) return limited;

    const { searchParams } = new URL(req.url);
    const productSlug = searchParams.get('productSlug');
    const token = searchParams.get('token');
    const locale = searchParams.get('locale') || 'ar';
    if (locale !== 'ar' && locale !== 'en') {
        return NextResponse.json({ error: 'Unsupported locale' }, { status: 400 });
    }
    const isArabic = locale === 'ar';

    try {
        // If token is provided, validate it and return token info
        if (token) {
            if (!REVIEW_TOKEN_PATTERN.test(token)) {
                return NextResponse.json({
                    valid: false,
                    error: 'رابط التقييم غير صالح أو منتهي الصلاحية'
                }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
            }

            const tokenData = await validateReviewToken(token);
            if (!tokenData) {
                return NextResponse.json({
                    valid: false,
                    error: 'رابط التقييم غير صالح أو منتهي الصلاحية'
                }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
            }

            return NextResponse.json({
                valid: true,
                productName: isArabic
                    ? localizeArabicBrandNames(tokenData.productName)
                    : tokenData.productName,
                productSlug: tokenData.productSlug,
                customerName: getReviewCustomerDisplayName(tokenData.customerName),
                purchaseMonth: tokenData.purchaseDate.toISOString().slice(0, 7),
            }, { headers: { 'Cache-Control': 'no-store' } });
        }

        // If productSlug is provided, return reviews for that product
        if (!productSlug) {
            return NextResponse.json({
                error: 'productSlug is required'
            }, { status: 400 });
        }
        if (!PRODUCT_SLUG_PATTERN.test(productSlug)) {
            return NextResponse.json({ error: 'Invalid productSlug' }, { status: 400 });
        }

        // Return only approved, purchase-verified Firestore reviews and their
        // matching aggregate rating.
        const [verifiedReviews, aggregateRating] = await Promise.all([
            getProductReviews(productSlug),
            calculateVerifiedAggregateRating(productSlug),
        ]);
        const publicReviews = verifiedReviews.map(review => ({
            id: review.id,
            customerName: review.customerName,
            rating: review.rating,
            title: review.title,
            reviewText: review.reviewText,
            pros: review.pros,
            cons: review.cons,
            reviewDate: review.reviewDate,
            governorate: review.governorate,
            isVerified: review.isVerified,
            helpfulCount: review.helpfulCount,
        }));
        const reviews = isArabic
            ? localizeArabicBrandContent(publicReviews)
            : publicReviews;

        return NextResponse.json({
            reviews,
            aggregateRating,
            total: reviews.length
        });
    } catch {
        console.error('Review retrieval failed');
        return NextResponse.json({
            error: 'Failed to fetch reviews',
        }, { status: 500 });
    }
}

// POST /api/reviews - Submit a new review
export async function POST(req: NextRequest) {
    const limited = rateLimitResponse(req, true);
    if (limited) return limited;

    const declaredLength = Number(req.headers.get('content-length') || 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_REVIEW_BODY_BYTES) {
        return NextResponse.json({ success: false, error: 'حجم الطلب أكبر من المسموح' }, { status: 413 });
    }

    try {
        const rawBody = await req.text();
        if (Buffer.byteLength(rawBody, 'utf8') > MAX_REVIEW_BODY_BYTES) {
            return NextResponse.json({ success: false, error: 'حجم الطلب أكبر من المسموح' }, { status: 413 });
        }

        let data: Record<string, unknown>;
        try {
            const parsed = JSON.parse(rawBody);
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
                throw new Error('Invalid payload');
            }
            data = parsed as Record<string, unknown>;
        } catch {
            return NextResponse.json({ success: false, error: 'بيانات الطلب غير صالحة' }, { status: 400 });
        }

        const token = normalizeSingleLine(data.token);
        const reviewText = normalizeReviewText(data.reviewText);
        const title = normalizeSingleLine(data.title);
        const customerDisplayName = normalizeSingleLine(data.customerDisplayName);
        const pros = normalizeReviewList(data.pros);
        const cons = normalizeReviewList(data.cons);

        // Validate required fields
        if (!REVIEW_TOKEN_PATTERN.test(token)) {
            return NextResponse.json({
                success: false,
                error: 'رابط التقييم مطلوب'
            }, { status: 400 });
        }

        if (!Number.isInteger(data.rating) || Number(data.rating) < 1 || Number(data.rating) > 5) {
            return NextResponse.json({
                success: false,
                error: 'التقييم يجب أن يكون من 1 إلى 5 نجوم'
            }, { status: 400 });
        }

        if (reviewText.length < 10 || reviewText.length > MAX_REVIEW_TEXT_LENGTH) {
            return NextResponse.json({
                success: false,
                error: `يرجى كتابة تقييم من 10 إلى ${MAX_REVIEW_TEXT_LENGTH} حرف`
            }, { status: 400 });
        }
        if (title.length > MAX_REVIEW_TITLE_LENGTH
            || customerDisplayName.length > MAX_DISPLAY_NAME_LENGTH
            || pros === null || cons === null) {
            return NextResponse.json({
                success: false,
                error: 'بعض حقول التقييم تتجاوز الحدود المسموحة'
            }, { status: 400 });
        }

        const result = await submitReview({
            token,
            rating: Number(data.rating),
            title: title || undefined,
            reviewText,
            pros: pros.length > 0 ? pros : undefined,
            cons: cons.length > 0 ? cons : undefined,
            customerDisplayName: customerDisplayName || undefined
        });

        if (!result.success) {
            return NextResponse.json({
                success: false,
                error: result.error
            }, { status: 400 });
        }

        // Invalidate cached review data and the affected product pages.
        revalidateTag('reviews', { expire: 0 });
        if (result.productSlug) {
            revalidatePath(`/[locale]/[brand]/[category]/${result.productSlug}`, 'page');
            const product = getProductBySlug(result.productSlug);
            if (product) {
                const isSoundcore = (product.categorySlug === 'audio' || product.categorySlug === 'speakers') && product.brand === 'Anker';
                const brandPath = isSoundcore ? 'soundcore' : (product.brand || '').toLowerCase();
                for (const locale of ['', '/en']) {
                    revalidatePath(`${locale}/${brandPath}/${product.categorySlug}/${result.productSlug}`);
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: 'شكراً لك! تم إرسال تقييمك بنجاح'
        });

    } catch {
        console.error('Review submission failed');
        return NextResponse.json({
            success: false,
            error: 'حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.',
        }, { status: 500 });
    }
}
