import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { isAdminRequestAuthorized, isAdminTaskRequestAuthorized } from '@/lib/admin-session';
import crypto from 'crypto';

function isAuthorized(req: NextRequest): boolean {
    return isAdminRequestAuthorized(req) || isAdminTaskRequestAuthorized(req);
}

interface ReviewPayload {
    id: string;
    productSlug: string;
    customerName: string;
    customerPhone: string;
    governorate: string;
    rating: number;
    reviewText: string;
    pros: string[];
    cons: string[];
    locale: string;
    reviewDate: string;
    purchaseDate: string;
}

function generateFirestoreId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
}

function generateOrderId(): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let p1 = '';
    for (let i = 0; i < 8; i++) {
        p1 += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    let p2 = '';
    const hex = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++) {
        p2 += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return `CV-${p1}-${p2}`;
}

/**
 * POST /api/admin/seed-reviews
 * Seeds realistic review data into Firestore with matching mock orders.
 * Accepts a JSON body: { reviews: ReviewPayload[] }
 */
export async function POST(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getFirestore();
    const body = await req.json() as { reviews: ReviewPayload[] };
    const reviews = body.reviews;

    if (!Array.isArray(reviews) || reviews.length === 0) {
        return NextResponse.json({ error: 'reviews array is required' }, { status: 400 });
    }

    let reviewsAdded = 0;
    let ordersAdded = 0;
    const errors: string[] = [];

    for (const review of reviews) {
        try {
            // Generate 100% natural production-like IDs
            const orderDocId = generateFirestoreId();
            const orderId = generateOrderId();
            
            // Generate review doc ID using the exact sha256 hash logic from verified-reviews.ts
            const reviewDocId = crypto.createHash('sha256')
                .update(`${orderDocId}\u0000${review.productSlug}`, 'utf8')
                .digest('hex');

            const purchaseDate = new Date(review.purchaseDate);
            const reviewDate = new Date(review.reviewDate);

            // Create matching order
            const orderData = {
                orderId,
                customerName: review.customerName,
                phone: review.customerPhone,
                items: [{ slug: review.productSlug, name: review.productSlug.replace(/-/g, ' '), quantity: 1 }],
                status: 'تم التوصيل',
                cityLabel: review.governorate,
                governorate: review.governorate,
                orderDate: purchaseDate,
                deliveryDate: reviewDate,
                total: 0,
                isSeeded: true,
                createdAt: FieldValue.serverTimestamp(),
            };
            await db.collection('orders').doc(orderDocId).set(orderData, { merge: true });
            ordersAdded++;

            // Create review
            const nameParts = review.customerName.split(' ').filter(Boolean);
            const initials = nameParts.length > 1
                ? `${nameParts[0]} ${nameParts[1].charAt(0)}.`
                : nameParts[0];

            const reviewData = {
                productSlug: review.productSlug,
                productName: review.productSlug.replace(/-/g, ' '),
                orderId,
                orderDocId,
                customerName: review.customerName,
                customerInitials: initials,
                customerPhone: review.customerPhone,
                rating: review.rating,
                reviewText: review.reviewText.slice(0, 500),
                pros: (review.pros || []).slice(0, 5),
                cons: (review.cons || []).slice(0, 5),
                purchaseDate,
                reviewDate,
                isVerified: true,
                status: 'approved',
                governorate: review.governorate,
                helpfulCount: Math.floor(Math.random() * 5),
                locale: review.locale || 'ar',
                isSeeded: true,
                createdAt: FieldValue.serverTimestamp(),
            };
            await db.collection('reviews').doc(reviewDocId).set(reviewData, { merge: true });
            reviewsAdded++;

        } catch (err) {
            const error = err as Error;
            errors.push(`${review.id}: ${error.message}`);
        }
    }

    try {
        revalidateTag('reviews', 'default');
    } catch (err) {
        console.error('Failed to revalidate reviews tag:', err);
    }

    return NextResponse.json({
        success: true,
        reviewsAdded,
        ordersAdded,
        errors: errors.length > 0 ? errors : undefined,
    });
}

// DELETE /api/admin/seed-reviews — purge all seeded reviews and orders
export async function DELETE(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const db = await getFirestore();
    let reviewsDeleted = 0;
    let ordersDeleted = 0;

    // Delete seeded reviews
    const reviewsSnap = await db.collection('reviews').where('isSeeded', '==', true).get();
    reviewsDeleted = reviewsSnap.docs.length;
    if (reviewsDeleted > 0) {
        const docs = reviewsSnap.docs;
        for (let i = 0; i < docs.length; i += 499) {
            const batch = db.batch();
            docs.slice(i, i + 499).forEach(doc => batch.delete(doc.ref));
            await batch.commit();
        }
    }

    // Delete seeded orders
    const ordersSnap = await db.collection('orders').where('isSeeded', '==', true).get();
    ordersDeleted = ordersSnap.docs.length;
    if (ordersDeleted > 0) {
        const docs = ordersSnap.docs;
        for (let i = 0; i < docs.length; i += 499) {
            const batch = db.batch();
            docs.slice(i, i + 499).forEach(doc => batch.delete(doc.ref));
            await batch.commit();
        }
    }

    try {
        revalidateTag('reviews', 'default');
    } catch (err) {
        console.error('Failed to revalidate reviews tag:', err);
    }

    return NextResponse.json({ success: true, reviewsDeleted, ordersDeleted });
}
