/**
 * Review Status API - التحقق من حالة التقييمات لكل المنتجات
 */

import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
    try {
        const db = await getFirestore();

        // Get all reviews grouped by productSlug
        const snapshot = await db.collection('reviews')
            .where('status', '==', 'approved')
            .get();

        const productReviews: Record<string, { count: number; avgRating: number; ratings: number[] }> = {};

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            const slug = data.productSlug;

            if (!productReviews[slug]) {
                productReviews[slug] = { count: 0, avgRating: 0, ratings: [] };
            }

            productReviews[slug].count++;
            productReviews[slug].ratings.push(data.rating);
        });

        // Calculate averages
        Object.keys(productReviews).forEach(slug => {
            const ratings = productReviews[slug].ratings;
            const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
            productReviews[slug].avgRating = Math.round(avg * 10) / 10;
            delete (productReviews[slug] as any).ratings;
        });

        // Sort by count
        const sorted = Object.entries(productReviews)
            .sort((a, b) => b[1].count - a[1].count)
            .map(([slug, data]) => ({ slug, ...data }));

        const totalReviews = sorted.reduce((sum, p) => sum + p.count, 0);
        const productsWithReviews = sorted.length;

        return NextResponse.json({
            success: true,
            summary: {
                totalReviews,
                productsWithReviews,
                avgReviewsPerProduct: Math.round(totalReviews / productsWithReviews * 10) / 10
            },
            products: sorted
        });

    } catch (error: any) {
        console.error('Status check error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
