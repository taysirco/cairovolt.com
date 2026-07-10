/**
 * Reviews API Endpoints
 * GET: Fetch reviews for a product (merges static + verified Firebase reviews)
 * POST: Submit a new verified review
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import {
    getProductReviews,
    submitReview,
    calculateVerifiedAggregateRating,
    validateReviewToken
} from '@/lib/verified-reviews';
import { productReviewsDb, calculateAggregateRating as calcStaticAggregateRating } from '@/data/product-reviews';
import { getProductBySlug } from '@/lib/static-products';

// GET /api/reviews?productSlug=xxx&locale=ar
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const productSlug = searchParams.get('productSlug');
    const token = searchParams.get('token');
    const locale = searchParams.get('locale') || 'ar';
    const isArabic = locale === 'ar';

    // If token is provided, validate it and return token info
    if (token) {
        const tokenData = await validateReviewToken(token);
        if (!tokenData) {
            return NextResponse.json({
                valid: false,
                error: 'رابط التقييم غير صالح أو منتهي الصلاحية'
            }, { status: 400 });
        }

        return NextResponse.json({
            valid: true,
            productName: tokenData.productName,
            productSlug: tokenData.productSlug,
            customerName: tokenData.customerName,
            purchaseDate: tokenData.purchaseDate
        });
    }

    // If productSlug is provided, return reviews for that product
    if (!productSlug) {
        return NextResponse.json({
            error: 'productSlug is required'
        }, { status: 400 });
    }

    try {
        // 1. Fetch verified reviews from Firebase
        const firebaseReviews = await getProductReviews(productSlug);
        const verifiedAggregateRating = await calculateVerifiedAggregateRating(productSlug);

        // 2. Get static reviews from product-reviews.ts
        const staticProductReviews = productReviewsDb[productSlug] || [];

        // 3. Map static editorial reviews to the VerifiedReviews component format.
        // isVerified MUST stay false: these are seed testimonials, not purchase-
        // verified submissions, and presenting them as verified is deceptive.
        const mappedStaticReviews = staticProductReviews.map((r, index) => ({
            id: `static_${productSlug}_${index}`,
            customerName: r.author,
            rating: r.rating,
            reviewText: isArabic ? r.reviewBody.ar : r.reviewBody.en,
            pros: r.pros ? (isArabic ? r.pros.ar : r.pros.en) : undefined,
            cons: r.cons ? (isArabic ? r.cons.ar : r.cons.en) : undefined,
            reviewDate: r.datePublished,
            governorate: r.location,
            isVerified: false,
            helpfulCount: 0,
        }));

        // 4. Merge: Firebase verified reviews first, then static reviews
        // Deduplicate by author name to avoid showing the same person twice
        const firebaseAuthorNames = new Set(firebaseReviews.map(r => r.customerName));
        const uniqueStaticReviews = mappedStaticReviews.filter(
            r => !firebaseAuthorNames.has(r.customerName)
        );
        const allReviews = [...firebaseReviews, ...uniqueStaticReviews];

        // 5. Calculate aggregate rating from all reviews
        let aggregateRating = verifiedAggregateRating;
        if (!aggregateRating && allReviews.length >= 3) {
            const staticAgg = calcStaticAggregateRating(staticProductReviews);
            if (staticAgg) {
                aggregateRating = {
                    ratingValue: staticAgg.ratingValue,
                    reviewCount: allReviews.length,
                    bestRating: Number(staticAgg.bestRating),
                    worstRating: Number(staticAgg.worstRating),
                };
            }
        }

        return NextResponse.json({
            reviews: allReviews,
            aggregateRating,
            total: allReviews.length
        });
    } catch (error: unknown) {
        console.error('Error fetching reviews:', error);

        // Fallback: if Firebase fails, still serve static reviews
        const staticProductReviews = productReviewsDb[productSlug] || [];
        if (staticProductReviews.length > 0) {
            const mappedStaticReviews = staticProductReviews.map((r, index) => ({
                id: `static_${productSlug}_${index}`,
                customerName: r.author,
                rating: r.rating,
                reviewText: isArabic ? r.reviewBody.ar : r.reviewBody.en,
                pros: r.pros ? (isArabic ? r.pros.ar : r.pros.en) : undefined,
                cons: r.cons ? (isArabic ? r.cons.ar : r.cons.en) : undefined,
                reviewDate: r.datePublished,
                governorate: r.location,
                isVerified: false,
                helpfulCount: 0,
            }));
            const staticAgg = calcStaticAggregateRating(staticProductReviews);
            return NextResponse.json({
                reviews: mappedStaticReviews,
                aggregateRating: staticAgg ? {
                    ratingValue: staticAgg.ratingValue,
                    reviewCount: mappedStaticReviews.length,
                    bestRating: Number(staticAgg.bestRating),
                    worstRating: Number(staticAgg.worstRating),
                } : null,
                total: mappedStaticReviews.length
            });
        }

        return NextResponse.json({
            error: 'Failed to fetch reviews',
        }, { status: 500 });
    }
}

// POST /api/reviews - Submit a new review
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        // Validate required fields
        if (!data.token) {
            return NextResponse.json({
                success: false,
                error: 'رابط التقييم مطلوب'
            }, { status: 400 });
        }

        if (!data.rating || data.rating < 1 || data.rating > 5) {
            return NextResponse.json({
                success: false,
                error: 'التقييم يجب أن يكون من 1 إلى 5 نجوم'
            }, { status: 400 });
        }

        if (!data.reviewText || data.reviewText.trim().length < 10) {
            return NextResponse.json({
                success: false,
                error: 'يرجى كتابة تقييم لا يقل عن 10 أحرف'
            }, { status: 400 });
        }

        // Clean up pros and cons
        const pros = data.pros?.filter((p: string) => p.trim().length > 0) || [];
        const cons = data.cons?.filter((c: string) => c.trim().length > 0) || [];

        const result = await submitReview({
            token: data.token,
            rating: data.rating,
            title: data.title?.trim(),
            reviewText: data.reviewText.trim(),
            pros: pros.length > 0 ? pros : undefined,
            cons: cons.length > 0 ? cons : undefined,
            customerDisplayName: data.customerDisplayName?.trim()
        });

        if (!result.success) {
            return NextResponse.json({
                success: false,
                error: result.error
            }, { status: 400 });
        }

        // Surface the new review to Google immediately: bust the schema data
        // caches (aggregateRating + review[] both live under the 'reviews'
        // tag) and re-render the product page so the JSON-LD refreshes now
        // instead of after the 1h unstable_cache TTL + 10min ISR window.
        revalidateTag('reviews');
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

    } catch (error: unknown) {
        console.error('Error submitting review:', error);
        return NextResponse.json({
            success: false,
            error: 'حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.',
        }, { status: 500 });
    }
}
