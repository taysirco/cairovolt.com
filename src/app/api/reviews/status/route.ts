/**
 * Review Status API - التحقق من حالة التقييمات لكل المنتجات
 */

import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';
import { isReviewBackedByDeliveredOrder } from '@/lib/verified-reviews';

const MAX_STATUS_REVIEWS = 1000;
const PRODUCT_SLUG_PATTERN = /^[a-z0-9][a-z0-9._-]{0,179}$/;

export async function GET(req: NextRequest) {
    const ip = getClientIp(req.headers);
    const rateCheck = checkRateLimit(`reviews-status:${ip}`, false);
    if (!rateCheck.allowed) {
        return NextResponse.json(
            { error: 'Too many requests. Please try again shortly.' },
            { status: 429, headers: { 'Retry-After': '60' } },
        );
    }

    try {
        const db = await getFirestore();

        // Get all reviews grouped by productSlug
        const snapshot = await db.collection('reviews')
            .where('status', '==', 'approved')
            .limit(MAX_STATUS_REVIEWS)
            .get();

        const validCandidates = snapshot.docs.filter(doc => {
            const data = doc.data();
            const rating = Number(data.rating);
            return data.isVerified === true
                && typeof data.orderId === 'string'
                && typeof data.orderDocId === 'string'
                && typeof data.productSlug === 'string'
                && PRODUCT_SLUG_PATTERN.test(data.productSlug)
                && Number.isInteger(rating)
                && rating >= 1
                && rating <= 5
                && typeof data.reviewText === 'string'
                && data.reviewText.trim().length >= 10
                && data.reviewText.trim().length <= 500
                && typeof data.customerName === 'string'
                && Boolean(data.customerName.trim())
                && Boolean(data.reviewDate);
        });

        const orderDocuments = validCandidates.length > 0
            ? await db.getAll(...validCandidates.map(doc => (
                db.collection('orders').doc(String(doc.data().orderDocId))
            )))
            : [];

        const productReviews: Record<string, { count: number; avgRating: number; ratings: number[] }> = {};

        validCandidates.forEach((doc, index) => {
            const data = doc.data();
            const slug = String(data.productSlug);
            const rating = Number(data.rating);
            const orderDocument = orderDocuments[index];
            if (!orderDocument?.exists || !isReviewBackedByDeliveredOrder(
                data,
                orderDocument.id,
                orderDocument.data() as Record<string, unknown>,
            )) return;

            if (!productReviews[slug]) {
                productReviews[slug] = { count: 0, avgRating: 0, ratings: [] };
            }

            productReviews[slug].count++;
            productReviews[slug].ratings.push(rating);
        });

        // Calculate averages
        Object.keys(productReviews).forEach(slug => {
            const ratings = productReviews[slug].ratings;
            const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
            productReviews[slug].avgRating = Math.round(avg * 10) / 10;
        });

        // Sort by count
        const sorted = Object.entries(productReviews)
            .sort((a, b) => b[1].count - a[1].count)
            .map(([slug, data]) => ({
                slug,
                count: data.count,
                avgRating: data.avgRating,
            }));

        const totalReviews = sorted.reduce((sum, p) => sum + p.count, 0);
        const productsWithReviews = sorted.length;

        return NextResponse.json({
            success: true,
            summary: {
                totalReviews,
                productsWithReviews,
                avgReviewsPerProduct: productsWithReviews > 0
                    ? Math.round(totalReviews / productsWithReviews * 10) / 10
                    : 0,
                resultLimit: MAX_STATUS_REVIEWS,
                truncated: snapshot.size === MAX_STATUS_REVIEWS,
            },
            products: sorted
        }, { headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' } });

    } catch {
        console.error('Review status retrieval failed');
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch review status'
        }, { status: 500 });
    }
}
