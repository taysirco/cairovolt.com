/**
 * Verified Reviews System for CairoVolt
 * Only real customer reviews from verified orders
 */

import { getFirestore } from './firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import crypto from 'crypto';
import { logger } from './logger';
import { REVIEW_THANKS_LABEL_AR, REVIEW_THANKS_LABEL_EN } from './review-incentive';

// ============================================
// INTERFACES
// ============================================

export interface VerifiedReview {
    id: string;
    productSlug: string;
    productName: string;
    orderId: string;
    orderDocId: string;
    customerName: string;
    customerInitials: string;  // أول حرفين من الاسم للخصوصية
    rating: 1 | 2 | 3 | 4 | 5;
    title?: string;
    reviewText: string;
    pros?: string[];
    cons?: string[];
    images?: string[];
    purchaseDate: Date;
    reviewDate: Date;
    isVerified: boolean;
    status: 'pending' | 'approved' | 'rejected';
    governorate: string;
    helpfulCount: number;
    locale: 'ar' | 'en';
}

export interface ReviewSubmission {
    token: string;          // توكن فريد للتحقق
    rating: number;
    title?: string;
    reviewText: string;
    pros?: string[];
    cons?: string[];
    images?: string[];
    customerDisplayName?: string; // اسم العرض (اختياري)
}

export interface ReviewToken {
    token: string;
    orderId: string;
    orderDocId: string;
    productSlug: string;
    productName: string;
    customerName: string;
    customerPhone: string;
    governorate: string;
    purchaseDate: Date;
    expiresAt: Date;
    used: boolean;
}

export interface AggregateRating {
    ratingValue: string;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
}

// ============================================
// TOKEN GENERATION
// ============================================

/**
 * Generate a secure review token for an order
 * This token is sent to the customer via WhatsApp
 */
export function generateReviewToken(orderId: string, productSlug: string): string {
    const data = `${orderId}-${productSlug}-${Date.now()}`;
    return crypto.createHash('sha256').update(data).digest('hex').substring(0, 32);
}

/**
 * Create a review token entry in Firestore
 */
export async function createReviewToken(
    orderId: string,
    orderDocId: string,
    productSlug: string,
    productName: string,
    customerName: string,
    customerPhone: string,
    governorate: string,
    purchaseDate: Date
): Promise<string> {
    const db = await getFirestore();
    const token = generateReviewToken(orderId, productSlug);

    // Token expires in 30 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await db.collection('review_tokens').doc(token).set({
        token,
        orderId,
        orderDocId,
        productSlug,
        productName,
        customerName,
        customerPhone,
        governorate,
        purchaseDate,
        expiresAt,
        used: false,
        createdAt: FieldValue.serverTimestamp()
    });

    return token;
}

/**
 * Validate a review token
 */
export async function validateReviewToken(token: string): Promise<ReviewToken | null> {
    const db = await getFirestore();
    const doc = await db.collection('review_tokens').doc(token).get();

    if (!doc.exists) {
        return null;
    }

    const data = doc.data() as any;

    // Check if token is expired
    if (new Date(data.expiresAt.toDate()) < new Date()) {
        return null;
    }

    // Check if token is already used
    if (data.used) {
        return null;
    }

    return {
        ...data,
        purchaseDate: data.purchaseDate.toDate(),
        expiresAt: data.expiresAt.toDate()
    } as ReviewToken;
}

// ============================================
// REVIEW SUBMISSION
// ============================================

/**
 * Submit a verified review
 */
export async function submitReview(submission: ReviewSubmission): Promise<{ success: boolean; error?: string; productSlug?: string }> {
    const db = await getFirestore();

    // Validate token
    const tokenData = await validateReviewToken(submission.token);
    if (!tokenData) {
        return { success: false, error: 'رابط التقييم غير صالح أو منتهي الصلاحية' };
    }

    // Validate rating
    if (submission.rating < 1 || submission.rating > 5) {
        return { success: false, error: 'التقييم يجب أن يكون من 1 إلى 5' };
    }

    // Validate review text
    if (!submission.reviewText || submission.reviewText.length < 10) {
        return { success: false, error: 'يرجى كتابة تقييم لا يقل عن 10 أحرف' };
    }

    // Generate customer initials for privacy
    const nameParts = tokenData.customerName.split(' ');
    const initials = nameParts.length > 1
        ? `${nameParts[0]} ${nameParts[1].charAt(0)}.`
        : nameParts[0];

    // Create review - filter out undefined values for Firestore
    const review = {
        productSlug: tokenData.productSlug,
        productName: tokenData.productName,
        orderId: tokenData.orderId,
        orderDocId: tokenData.orderDocId,
        customerName: submission.customerDisplayName || initials,
        customerInitials: initials,
        rating: submission.rating as 1 | 2 | 3 | 4 | 5,
        reviewText: submission.reviewText,
        purchaseDate: tokenData.purchaseDate,
        reviewDate: new Date(),
        isVerified: true,
        status: 'approved',
        governorate: tokenData.governorate,
        helpfulCount: 0,
        locale: 'ar',
        // Optional fields - only include if defined
        ...(submission.title && { title: submission.title }),
        ...(submission.pros?.length && { pros: submission.pros }),
        ...(submission.cons?.length && { cons: submission.cons }),
        ...(submission.images?.length && { images: submission.images }),
    };

    // Save review
    await db.collection('reviews').add({
        ...review,
        reviewDate: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp()
    });

    // Mark token as used
    await db.collection('review_tokens').doc(submission.token).update({
        used: true,
        usedAt: FieldValue.serverTimestamp()
    });

    // productSlug lets the API route revalidate the product page + the
    // 'reviews' cache tag immediately — otherwise the JSON-LD aggregateRating
    // waits out the unstable_cache TTL (1h) before a new review appears.
    return { success: true, productSlug: tokenData.productSlug };
}

// ============================================
// REVIEW RETRIEVAL
// ============================================

/**
 * Synthetic reviews injected by the (now removed) /api/reviews/seed and
 * /api/reviews/seed-v2 endpoints carry generated order identifiers:
 *   v1: orderId/orderDocId = `SEED-{timestamp}-{i}`
 *   v2: orderId = `ORD-{timestamp}-{rand}`, orderDocId = `DOC-{timestamp}-{i}`
 * Real reviews reference an actual Firestore order document (20-char auto-ID,
 * no hyphens), so these prefixes are a reliable fingerprint. Excluding them at
 * read time keeps every consumer (JSON-LD, aggregateRating, UI) honest even
 * while the seeded documents still exist in the collection.
 */
const SEEDED_ID_PATTERN = /^(SEED-|DOC-\d|ORD-\d{13}-)/;

export function isSeededReview(data: { orderId?: string; orderDocId?: string }): boolean {
    return SEEDED_ID_PATTERN.test(data.orderDocId || '') || SEEDED_ID_PATTERN.test(data.orderId || '');
}

/**
 * Get approved reviews for a product — genuine, order-backed reviews ONLY.
 */
export async function getProductReviews(productSlug: string, limit: number = 20): Promise<VerifiedReview[]> {
    try {
        const db = await getFirestore();
        const snapshot = await db.collection('reviews')
            .where('productSlug', '==', productSlug)
            .where('status', '==', 'approved')
            .orderBy('reviewDate', 'desc')
            .limit(limit)
            .get();

        return snapshot.docs
            .filter(doc => !isSeededReview(doc.data() as { orderId?: string; orderDocId?: string }))
            .map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    purchaseDate: data.purchaseDate?.toDate?.() || new Date(),
                    reviewDate: data.reviewDate?.toDate?.() || new Date()
                } as VerifiedReview;
            });
    } catch (error) {
        logger.warn('Failed to fetch reviews:', error);
        return [];
    }
}

/**
 * Genuine reviews submitted from a given governorate — powers the unique
 * local-proof section on /locations/[governorate] pages (anti-doorway:
 * every governorate page accumulates real, page-specific content).
 * Equality-only filters → no composite Firestore index required.
 */
export async function getReviewsByGovernorate(governorateName: string, max: number = 6): Promise<VerifiedReview[]> {
    try {
        const db = await getFirestore();
        const snapshot = await db.collection('reviews')
            .where('status', '==', 'approved')
            .where('governorate', '==', governorateName)
            .limit(30)
            .get();

        return snapshot.docs
            .filter(doc => !isSeededReview(doc.data() as { orderId?: string; orderDocId?: string }))
            .map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    purchaseDate: data.purchaseDate?.toDate?.() || new Date(),
                    reviewDate: data.reviewDate?.toDate?.() || new Date()
                } as VerifiedReview;
            })
            .sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime())
            .slice(0, max);
    } catch (error) {
        logger.warn('Failed to fetch governorate reviews:', error);
        return [];
    }
}

/**
 * Get total review count for a product
 */
export async function getProductReviewCount(productSlug: string): Promise<number> {
    try {
        const db = await getFirestore();
        // Projection query instead of .count(): seeded reviews must be
        // excluded, and that requires inspecting order identifiers.
        const snapshot = await db.collection('reviews')
            .where('productSlug', '==', productSlug)
            .where('status', '==', 'approved')
            .select('orderId', 'orderDocId')
            .get();

        return snapshot.docs.filter(doc => !isSeededReview(doc.data() as { orderId?: string; orderDocId?: string })).length;
    } catch (error) {
        logger.warn('Failed to get review count:', error);
        return 0;
    }
}

/**
 * Calculate aggregate rating for a product
 * Only returns data if there are 3+ reviews (minimum for meaningful aggregate)
 */
export async function calculateVerifiedAggregateRating(productSlug: string): Promise<AggregateRating | null> {
    const reviews = await getProductReviews(productSlug, 100);

    // Require at least 3 reviews for a meaningful aggregate rating
    if (reviews.length < 3) {
        return null;
    }

    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = (totalRating / reviews.length).toFixed(1);

    return {
        ratingValue: avgRating,
        reviewCount: reviews.length,
        bestRating: 5,
        worstRating: 1
    };
}

// ============================================
// WHATSAPP INTEGRATION
// ============================================

/**
 * Generate WhatsApp review request message
 */
export function generateReviewRequestMessage(
    customerName: string,
    productName: string,
    token: string,
    locale: 'ar' | 'en' = 'ar'
): string {
    // Arabic is default (no prefix), English uses /en
    const reviewUrl = locale === 'ar'
        ? `https://cairovolt.com/review/${token}`
        : `https://cairovolt.com/en/review/${token}`;

    if (locale === 'ar') {
        return `أهلاً ${customerName}!

أتمنى إن ${productName} نال إعجابك!

لو عندك دقيقة، شاركنا رأيك الصادق — مدح أو نقد، الاتنين يفيدونا ويساعدوا عملاء تانيين يختاروا صح:

${reviewUrl}

🎁 وكهدية شكر: بعد إرسال تقييمك — أياً كان رأيك — هيظهر لك كود ${REVIEW_THANKS_LABEL_AR} على طلبك الجاي.

شكراً لثقتك في كايرو فولت!`;
    }

    return `Hello ${customerName}!

Hope you're enjoying your ${productName}!

If you have a minute, share your honest feedback — praise or criticism, both help us and help other customers choose right:

${reviewUrl}

🎁 As a thank-you: after submitting your review — whatever your opinion — you'll get a ${REVIEW_THANKS_LABEL_EN} code for your next order.

Thanks for trusting CairoVolt!`;
}

/**
 * Generate review tokens for all products in an order
 */
export async function generateOrderReviewTokens(
    orderId: string,
    orderDocId: string,
    customerName: string,
    customerPhone: string,
    governorate: string,
    purchaseDate: Date,
    items: Array<{ slug: string; name: string }>
): Promise<Array<{ productSlug: string; productName: string; token: string; reviewUrl: string }>> {
    const tokens = [];

    for (const item of items) {
        const token = await createReviewToken(
            orderId,
            orderDocId,
            item.slug,
            item.name,
            customerName,
            customerPhone,
            governorate,
            purchaseDate
        );

        tokens.push({
            productSlug: item.slug,
            productName: item.name,
            token,
            reviewUrl: `https://cairovolt.com/review/${token}`
        });
    }

    return tokens;
}
