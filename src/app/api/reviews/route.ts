/**
 * Reviews API Endpoints
 * GET: Fetch reviews for a product
 * POST: Submit a new verified review
 */

import { NextRequest, NextResponse } from 'next/server';
import {
    getProductReviews,
    submitReview,
    calculateVerifiedAggregateRating,
    validateReviewToken
} from '@/lib/verified-reviews';

// GET /api/reviews?productSlug=xxx
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const productSlug = searchParams.get('productSlug');
    const token = searchParams.get('token');

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
        const reviews = await getProductReviews(productSlug);
        const aggregateRating = await calculateVerifiedAggregateRating(productSlug);

        return NextResponse.json({
            reviews,
            aggregateRating,
            total: reviews.length
        });
    } catch (error: unknown) {
        console.error('Error fetching reviews:', error);
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
