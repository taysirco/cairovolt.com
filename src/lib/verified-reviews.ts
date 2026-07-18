/**
 * Verified Reviews System for CairoVolt
 * Only real customer reviews from verified orders
 */

import { getFirestore } from './firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import crypto from 'crypto';
import { logger } from './logger';
// (قيم قديمة أُبقيت للدوال الخاملة token-era — النظام الجديد يكافئ 5% عبر REV5 من الـCRM)
const REVIEW_THANKS_LABEL_AR = 'خصم 5%';
const REVIEW_THANKS_LABEL_EN = '5% off';

const REVIEW_TOKEN_PATTERN = /^[a-f0-9]{32}$/i;
const PRODUCT_SLUG_PATTERN = /^[a-z0-9][a-z0-9._-]{0,179}$/;
const DELIVERED_ORDER_STATUSES = new Set([
    'delivered',
    'completed',
    'تم التوصيل',
    'مكتمل',
]);
const MAX_REVIEW_TEXT_LENGTH = 500;
const MAX_REVIEW_TITLE_LENGTH = 100;
const MAX_DISPLAY_NAME_LENGTH = 50;
const MAX_LIST_ITEMS = 5;
const MAX_LIST_ITEM_LENGTH = 160;
const MAX_REVIEW_IMAGES = 3;

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

function normalizeList(value: unknown, maxItems: number, maxLength: number): string[] | null {
    if (value === undefined) return [];
    if (!Array.isArray(value) || value.length > maxItems) return null;

    const result: string[] = [];
    for (const entry of value) {
        const normalized = normalizeSingleLine(entry);
        if (typeof entry !== 'string' || normalized.length > maxLength) return null;
        if (normalized) result.push(normalized);
    }
    return result;
}

function toDate(value: unknown): Date | null {
    if (value instanceof Date && Number.isFinite(value.getTime())) return value;
    if (value && typeof value === 'object' && 'toDate' in value
        && typeof (value as { toDate?: unknown }).toDate === 'function') {
        const converted = (value as { toDate: () => Date }).toDate();
        return converted instanceof Date && Number.isFinite(converted.getTime()) ? converted : null;
    }
    return null;
}

function normalizePhone(value: unknown): string {
    let digits = normalizeSingleLine(value).replace(/\D/g, '');
    if (digits.startsWith('0020')) digits = digits.slice(2);
    if (digits.startsWith('20')) return digits;
    if (digits.startsWith('0')) return `2${digits}`;
    if (digits.length === 10 && digits.startsWith('1')) return `20${digits}`;
    return digits;
}

function normalizeOrderItemSlug(value: unknown): string {
    const normalized = normalizeSingleLine(value).toLowerCase();
    const withoutStaticPrefix = normalized.startsWith('static_')
        ? normalized.slice('static_'.length)
        : normalized;
    return PRODUCT_SLUG_PATTERN.test(withoutStaticPrefix) ? withoutStaticPrefix : '';
}

function getOrderItemForSlug(
    orderData: Record<string, unknown>,
    productSlug: string,
): Record<string, unknown> | null {
    if (!Array.isArray(orderData.items) || orderData.items.length === 0 || orderData.items.length > 50) {
        return null;
    }

    for (const rawItem of orderData.items) {
        if (!rawItem || typeof rawItem !== 'object' || Array.isArray(rawItem)) continue;
        const item = rawItem as Record<string, unknown>;
        const itemSlug = normalizeOrderItemSlug(item.slug)
            || normalizeOrderItemSlug(item.productId);
        if (itemSlug === productSlug) return item;
    }

    return null;
}

export function isDeliveredOrderStatus(value: unknown): boolean {
    return DELIVERED_ORDER_STATUSES.has(normalizeSingleLine(value).toLowerCase());
}

function getAuthoritativeOrderData(
    orderDocId: string,
    orderData: Record<string, unknown>,
    expected: {
        orderId: string;
        productSlug: string;
        customerPhone?: string;
    },
): {
    orderDocId: string;
    orderId: string;
    productSlug: string;
    productName: string;
    customerName: string;
    customerPhone: string;
    governorate: string;
    purchaseDate: Date | null;
} | null {
    if (!isDeliveredOrderStatus(orderData.status)) return null;

    const orderId = normalizeSingleLine(orderData.orderId);
    const customerName = normalizeSingleLine(orderData.customerName);
    const customerPhone = normalizePhone(orderData.whatsapp || orderData.phone);
    const expectedPhone = normalizePhone(expected.customerPhone);
    const item = getOrderItemForSlug(orderData, expected.productSlug);
    if (!orderId
        || orderId !== expected.orderId
        || !customerName
        || !customerPhone
        || (expected.customerPhone !== undefined
            && (!expectedPhone || customerPhone !== expectedPhone))
        || !item) {
        return null;
    }

    const productName = normalizeSingleLine(item.name);
    if (!productName) return null;

    const governorate = normalizeSingleLine(orderData.cityLabel)
        || normalizeSingleLine(orderData.city)
        || 'مصر';

    return {
        orderDocId,
        orderId,
        productSlug: expected.productSlug,
        productName: productName.slice(0, 180),
        customerName: customerName.slice(0, 100),
        customerPhone,
        governorate: governorate.slice(0, 80),
        purchaseDate: toDate(orderData.createdAt),
    };
}

export function isReviewBackedByDeliveredOrder(
    reviewData: Record<string, unknown>,
    orderDocId: string,
    orderData: Record<string, unknown>,
): boolean {
    const orderId = normalizeSingleLine(reviewData.orderId);
    const storedOrderDocId = normalizeSingleLine(reviewData.orderDocId);
    const productSlug = normalizeSingleLine(reviewData.productSlug).toLowerCase();
    const tokenPhone = normalizePhone(reviewData.customerPhone);
    if (!orderId
        || !storedOrderDocId
        || storedOrderDocId.length > 120
        || !PRODUCT_SLUG_PATTERN.test(productSlug)) {
        return false;
    }

    // New reviews additionally bind the customer phone to the order. Historical
    // reviews did not persist that field, so they can still be retained when a
    // unique delivered order contains the reviewed product. The stored document
    // id is intentionally not compared here: older tokens sometimes stored a
    // legacy id while the authoritative order kept the same public orderId.
    return Boolean(getAuthoritativeOrderData(orderDocId, orderData, {
        orderId,
        productSlug,
        ...(tokenPhone && { customerPhone: tokenPhone }),
    }));
}

export function getReviewCustomerDisplayName(customerName: string): string {
    const firstName = normalizeSingleLine(customerName).split(' ').filter(Boolean)[0] || '';
    return firstName.slice(0, 40);
}

function parseReviewTokenData(token: string, data: Record<string, unknown> | undefined): ReviewToken | null {
    if (!data || data.used !== false) return null;

    const expiresAt = toDate(data.expiresAt);
    const purchaseDate = toDate(data.purchaseDate);
    const orderId = normalizeSingleLine(data.orderId);
    const orderDocId = normalizeSingleLine(data.orderDocId);
    const productSlug = normalizeSingleLine(data.productSlug);
    const productName = normalizeSingleLine(data.productName);
    const customerName = normalizeSingleLine(data.customerName);
    const customerPhone = normalizePhone(data.customerPhone);
    const governorate = normalizeSingleLine(data.governorate);

    if (!expiresAt || expiresAt.getTime() <= Date.now() || !purchaseDate
        || !orderId || orderId.length > 120
        || !orderDocId || orderDocId.length > 120
        || !PRODUCT_SLUG_PATTERN.test(productSlug)
        || !productName || productName.length > 180
        || !customerName || customerName.length > 100
        || customerPhone.length < 10 || customerPhone.length > 15
        || !governorate || governorate.length > 80) {
        return null;
    }

    return {
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
    };
}

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
    // Keep the existing 32-character token format while using cryptographic
    // randomness so simultaneous requests cannot produce the same token.
    void orderId;
    void productSlug;
    return crypto.randomBytes(16).toString('hex');
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
    const normalizedOrderId = normalizeSingleLine(orderId);
    const normalizedOrderDocId = normalizeSingleLine(orderDocId);
    const normalizedProductSlug = normalizeSingleLine(productSlug);
    const normalizedProductName = normalizeSingleLine(productName);
    const normalizedCustomerName = normalizeSingleLine(customerName);
    const normalizedCustomerPhone = normalizePhone(customerPhone);
    const normalizedGovernorate = normalizeSingleLine(governorate);
    const normalizedPurchaseDate = toDate(purchaseDate);

    if (!normalizedOrderId || normalizedOrderId.length > 120
        || !normalizedOrderDocId || normalizedOrderDocId.length > 120
        || !PRODUCT_SLUG_PATTERN.test(normalizedProductSlug)
        || !normalizedProductName || normalizedProductName.length > 180
        || !normalizedCustomerName || normalizedCustomerName.length > 100
        || normalizedCustomerPhone.length < 10 || normalizedCustomerPhone.length > 15
        || !normalizedGovernorate || normalizedGovernorate.length > 80
        || !normalizedPurchaseDate) {
        throw new Error('Invalid review-token input');
    }

    const db = await getFirestore();
    const token = generateReviewToken(normalizedOrderId, normalizedProductSlug);
    const orderRef = db.collection('orders').doc(normalizedOrderDocId);
    const keyId = crypto.createHash('sha256')
        .update(`${normalizedOrderDocId}\u0000${normalizedProductSlug}`, 'utf8')
        .digest('hex');
    const keyRef = db.collection('review_token_keys').doc(keyId);
    const tokenRef = db.collection('review_tokens').doc(token);
    const legacyTokens = await db.collection('review_tokens')
        .where('orderDocId', '==', normalizedOrderDocId)
        .where('productSlug', '==', normalizedProductSlug)
        .limit(1)
        .get();
    const legacyToken = legacyTokens.docs.find(document => REVIEW_TOKEN_PATTERN.test(document.id));

    // Token expires in 30 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    return db.runTransaction(async transaction => {
        const orderDocument = await transaction.get(orderRef);
        const keyDocument = await transaction.get(keyRef);
        if (!orderDocument.exists) {
            throw new Error('Order evidence is unavailable');
        }

        const orderData = getAuthoritativeOrderData(
            orderDocument.id,
            orderDocument.data() as Record<string, unknown>,
            {
                orderId: normalizedOrderId,
                productSlug: normalizedProductSlug,
                customerPhone: normalizedCustomerPhone,
            },
        );
        if (!orderData) {
            throw new Error('Order evidence does not match the review request');
        }

        if (keyDocument.exists) {
            const existingToken = normalizeSingleLine(keyDocument.data()?.token);
            if (!REVIEW_TOKEN_PATTERN.test(existingToken)) {
                throw new Error('Review-token index is inconsistent');
            }
            const existingTokenDocument = await transaction.get(
                db.collection('review_tokens').doc(existingToken),
            );
            const existingData = existingTokenDocument.data();
            if (!existingTokenDocument.exists
                || normalizeSingleLine(existingData?.orderDocId) !== normalizedOrderDocId
                || normalizeSingleLine(existingData?.productSlug) !== normalizedProductSlug) {
                throw new Error('Review-token index is inconsistent');
            }
            return existingToken;
        }

        if (legacyToken) {
            const legacyTokenDocument = await transaction.get(
                db.collection('review_tokens').doc(legacyToken.id),
            );
            if (!legacyTokenDocument.exists
                || normalizeSingleLine(legacyTokenDocument.data()?.orderDocId) !== normalizedOrderDocId
                || normalizeSingleLine(legacyTokenDocument.data()?.productSlug) !== normalizedProductSlug) {
                throw new Error('Legacy review token is inconsistent');
            }
            transaction.create(keyRef, {
                token: legacyToken.id,
                orderDocId: orderData.orderDocId,
                productSlug: orderData.productSlug,
                createdAt: FieldValue.serverTimestamp(),
            });
            return legacyToken.id;
        }

        transaction.create(tokenRef, {
            token,
            orderId: orderData.orderId,
            orderDocId: orderData.orderDocId,
            productSlug: orderData.productSlug,
            productName: orderData.productName || normalizedProductName,
            customerName: orderData.customerName || normalizedCustomerName,
            customerPhone: orderData.customerPhone,
            governorate: orderData.governorate || normalizedGovernorate,
            purchaseDate: orderData.purchaseDate || normalizedPurchaseDate,
            expiresAt,
            used: false,
            createdAt: FieldValue.serverTimestamp(),
        });
        transaction.create(keyRef, {
            token,
            orderDocId: orderData.orderDocId,
            productSlug: orderData.productSlug,
            createdAt: FieldValue.serverTimestamp(),
        });

        return token;
    });
}

/**
 * Validate a review token
 */
export async function validateReviewToken(token: string): Promise<ReviewToken | null> {
    if (!REVIEW_TOKEN_PATTERN.test(token)) return null;

    const db = await getFirestore();
    const doc = await db.collection('review_tokens').doc(token).get();

    if (!doc.exists) {
        return null;
    }

    const tokenData = parseReviewTokenData(token, doc.data());
    // A stored, unused and unexpired token remains a valid customer link even
    // when its historical orderDocId no longer points at the order document.
    // Order evidence is resolved transactionally at submission time; it decides
    // whether the submission is published or held for a safe manual match.
    return tokenData;
}

// ============================================
// REVIEW SUBMISSION
// ============================================

/**
 * Submit a verified review
 */
export async function submitReview(submission: ReviewSubmission): Promise<{ success: boolean; error?: string; productSlug?: string }> {
    const token = normalizeSingleLine(submission.token);
    if (!REVIEW_TOKEN_PATTERN.test(token)) {
        return { success: false, error: 'رابط التقييم غير صالح أو منتهي الصلاحية' };
    }

    if (!Number.isInteger(submission.rating) || submission.rating < 1 || submission.rating > 5) {
        return { success: false, error: 'التقييم يجب أن يكون من 1 إلى 5' };
    }

    const reviewText = normalizeReviewText(submission.reviewText);
    const title = normalizeSingleLine(submission.title);
    const displayName = normalizeSingleLine(submission.customerDisplayName);
    const pros = normalizeList(submission.pros, MAX_LIST_ITEMS, MAX_LIST_ITEM_LENGTH);
    const cons = normalizeList(submission.cons, MAX_LIST_ITEMS, MAX_LIST_ITEM_LENGTH);
    const images = normalizeList(submission.images, MAX_REVIEW_IMAGES, 500);

    if (reviewText.length < 10 || reviewText.length > MAX_REVIEW_TEXT_LENGTH) {
        return { success: false, error: 'يرجى كتابة تقييم لا يقل عن 10 أحرف' };
    }
    if (title.length > MAX_REVIEW_TITLE_LENGTH
        || displayName.length > MAX_DISPLAY_NAME_LENGTH
        || pros === null || cons === null || images === null
        || images.some(image => {
            try {
                return new URL(image).protocol !== 'https:';
            } catch {
                return true;
            }
        })) {
        return { success: false, error: 'بعض حقول التقييم تتجاوز الحدود المسموحة' };
    }

    const db = await getFirestore();
    const tokenRef = db.collection('review_tokens').doc(token);

    return db.runTransaction(async transaction => {
        const tokenDocument = await transaction.get(tokenRef);
        if (!tokenDocument.exists) {
            return { success: false, error: 'رابط التقييم غير صالح أو منتهي الصلاحية' };
        }

        const tokenData = parseReviewTokenData(token, tokenDocument.data());
        if (!tokenData) {
            return { success: false, error: 'رابط التقييم غير صالح أو منتهي الصلاحية' };
        }

        const expectedOrder = {
            orderId: tokenData.orderId,
            productSlug: tokenData.productSlug,
            customerPhone: tokenData.customerPhone,
        };
        const directOrderRef = db.collection('orders').doc(tokenData.orderDocId);
        const directOrderDocument = await transaction.get(directOrderRef);
        let orderEvidence = directOrderDocument.exists
            ? getAuthoritativeOrderData(
                directOrderDocument.id,
                directOrderDocument.data() as Record<string, unknown>,
                expectedOrder,
            )
            : null;

        // Some historical tokens contain a legacy Firestore document id. If
        // the direct lookup cannot prove the order, accept a fallback only when
        // the public orderId resolves to exactly one document and that document
        // independently matches delivery status, phone and purchased product.
        if (!orderEvidence) {
            const orderIdQuery = db.collection('orders')
                .where('orderId', '==', tokenData.orderId)
                .limit(2);
            const orderIdSnapshot = await transaction.get(orderIdQuery);
            if (orderIdSnapshot.size === 1) {
                const matchedOrderDocument = orderIdSnapshot.docs[0];
                orderEvidence = getAuthoritativeOrderData(
                    matchedOrderDocument.id,
                    matchedOrderDocument.data() as Record<string, unknown>,
                    expectedOrder,
                );
            }
        }

        const authoritativeCustomerName = orderEvidence?.customerName || tokenData.customerName;
        const nameParts = authoritativeCustomerName.split(' ').filter(Boolean);
        const initials = nameParts.length > 1
            ? `${nameParts[0]} ${nameParts[1].charAt(0)}.`
            : nameParts[0];

        if (!orderEvidence) {
            const pendingId = crypto.createHash('sha256')
                .update(`${token}\u0000pending-order-match`, 'utf8')
                .digest('hex');
            const pendingRef = db.collection('pending_review_submissions').doc(pendingId);
            const existingPending = await transaction.get(pendingRef);

            if (!existingPending.exists) {
                transaction.create(pendingRef, {
                    orderId: tokenData.orderId,
                    orderDocId: tokenData.orderDocId,
                    productSlug: tokenData.productSlug,
                    productName: tokenData.productName,
                    customerPhone: tokenData.customerPhone,
                    customerName: displayName || initials,
                    customerInitials: initials,
                    rating: submission.rating as 1 | 2 | 3 | 4 | 5,
                    reviewText,
                    purchaseDate: tokenData.purchaseDate,
                    submittedAt: FieldValue.serverTimestamp(),
                    createdAt: FieldValue.serverTimestamp(),
                    isVerified: false,
                    status: 'pending_order_match',
                    matchReason: 'order_evidence_unresolved',
                    governorate: tokenData.governorate,
                    locale: 'ar',
                    ...(title && { title }),
                    ...(pros.length > 0 && { pros }),
                    ...(cons.length > 0 && { cons }),
                    ...(images.length > 0 && { images }),
                });
            }

            transaction.update(tokenRef, {
                used: true,
                usedAt: FieldValue.serverTimestamp(),
                pendingSubmissionId: pendingId,
            });

            return { success: true, productSlug: tokenData.productSlug };
        }

        const reviewId = crypto.createHash('sha256')
            .update(`${orderEvidence.orderDocId}\u0000${orderEvidence.productSlug}`, 'utf8')
            .digest('hex');
        const reviewRef = db.collection('reviews').doc(reviewId);
        const existingReview = await transaction.get(reviewRef);
        if (existingReview.exists) {
            return { success: false, error: 'تم إرسال تقييم لهذا المنتج من قبل' };
        }

        transaction.create(reviewRef, {
            productSlug: orderEvidence.productSlug,
            productName: orderEvidence.productName,
            orderId: orderEvidence.orderId,
            orderDocId: orderEvidence.orderDocId,
            customerPhone: orderEvidence.customerPhone,
            customerName: displayName || initials,
            customerInitials: initials,
            rating: submission.rating as 1 | 2 | 3 | 4 | 5,
            reviewText,
            purchaseDate: orderEvidence.purchaseDate || tokenData.purchaseDate,
            reviewDate: FieldValue.serverTimestamp(),
            createdAt: FieldValue.serverTimestamp(),
            isVerified: true,
            status: 'approved',
            governorate: orderEvidence.governorate,
            helpfulCount: 0,
            locale: 'ar',
            ...(title && { title }),
            ...(pros.length > 0 && { pros }),
            ...(cons.length > 0 && { cons }),
            ...(images.length > 0 && { images }),
        });

        transaction.update(tokenRef, {
            used: true,
            usedAt: FieldValue.serverTimestamp(),
            matchedOrderDocId: orderEvidence.orderDocId,
        });

        return { success: true, productSlug: orderEvidence.productSlug };
    });
}

function parseVerifiedReview(id: string, data: Record<string, unknown>): VerifiedReview | null {
    const rating = Number(data.rating);
    const productSlug = normalizeSingleLine(data.productSlug);
    const productName = normalizeSingleLine(data.productName);
    const orderId = normalizeSingleLine(data.orderId);
    const orderDocId = normalizeSingleLine(data.orderDocId);
    const customerName = normalizeSingleLine(data.customerName);
    const customerInitials = normalizeSingleLine(data.customerInitials);
    const reviewText = normalizeReviewText(data.reviewText);
    const governorate = normalizeSingleLine(data.governorate);
    const reviewDate = toDate(data.reviewDate);
    const purchaseDate = toDate(data.purchaseDate) || reviewDate;
    const title = normalizeSingleLine(data.title);
    const pros = normalizeList(data.pros, MAX_LIST_ITEMS, MAX_LIST_ITEM_LENGTH);
    const cons = normalizeList(data.cons, MAX_LIST_ITEMS, MAX_LIST_ITEM_LENGTH);
    const images = normalizeList(data.images, MAX_REVIEW_IMAGES, 500);

    if (data.status !== 'approved' || data.isVerified !== true
        || !PRODUCT_SLUG_PATTERN.test(productSlug) || !productName
        || !orderId || !orderDocId || !customerName
        || !Number.isInteger(rating) || rating < 1 || rating > 5
        || reviewText.length < 10 || reviewText.length > MAX_REVIEW_TEXT_LENGTH
        || !governorate || !reviewDate || !purchaseDate) {
        return null;
    }

    return {
        id,
        productSlug,
        productName: productName.slice(0, 180),
        orderId: orderId.slice(0, 120),
        orderDocId: orderDocId.slice(0, 120),
        customerName: customerName.slice(0, MAX_DISPLAY_NAME_LENGTH),
        customerInitials: (customerInitials || customerName).slice(0, MAX_DISPLAY_NAME_LENGTH),
        rating: rating as 1 | 2 | 3 | 4 | 5,
        ...(title && { title: title.slice(0, MAX_REVIEW_TITLE_LENGTH) }),
        reviewText,
        ...(pros && pros.length > 0 && { pros }),
        ...(cons && cons.length > 0 && { cons }),
        ...(images && images.length > 0 && {
            images: images.filter(image => {
                try {
                    return new URL(image).protocol === 'https:';
                } catch {
                    return false;
                }
            }),
        }),
        purchaseDate,
        reviewDate,
        isVerified: true,
        status: 'approved',
        governorate: governorate.slice(0, 80),
        helpfulCount: Number.isInteger(data.helpfulCount) && Number(data.helpfulCount) > 0
            ? Math.min(Number(data.helpfulCount), 1_000_000)
            : 0,
        locale: data.locale === 'en' ? 'en' : 'ar',
    };
}

async function filterOrderBackedReviews(
    db: Awaited<ReturnType<typeof getFirestore>>,
    documents: Array<{
        id: string;
        data(): Record<string, unknown>;
    }>,
): Promise<VerifiedReview[]> {
    const allCandidates = documents
        .map(document => ({
            data: document.data(),
            review: parseVerifiedReview(document.id, document.data()),
        }))
        .filter((candidate): candidate is typeof candidate & { review: VerifiedReview } => (
            candidate.review !== null
        ));

    // ⭐ النظام المبسّط: تقييمات صفحة المنتج الموقَّعة بجوجل (authProvider) بوابتها
    //    هي مراجعة الأدمن (status=approved في الاستعلام) — لا تشترط ربط طلب مُسلَّم.
    //    التقييمات القديمة (token-era) تبقى على فحص الطلب الصارم كما هي.
    const directApproved = allCandidates
        .filter(c => typeof c.data.authProvider === 'string' && c.data.authProvider)
        .map(c => c.review);
    const candidates = allCandidates.filter(c => !(typeof c.data.authProvider === 'string' && c.data.authProvider));

    if (candidates.length === 0) return directApproved;

    const orderRefs = candidates.map(candidate => (
        db.collection('orders').doc(candidate.review.orderDocId)
    ));
    const orderDocuments = await db.getAll(...orderRefs);
    const resolvedOrderDocIds = new Map<number, string>();
    const fallbackCandidatesByOrderId = new Map<string, number[]>();

    candidates.forEach((candidate, index) => {
        const orderDocument = orderDocuments[index];
        if (orderDocument.exists && isReviewBackedByDeliveredOrder(
            candidate.data,
            orderDocument.id,
            orderDocument.data() as Record<string, unknown>,
        )) {
            resolvedOrderDocIds.set(index, orderDocument.id);
            return;
        }

        const candidateIndexes = fallbackCandidatesByOrderId.get(candidate.review.orderId) || [];
        candidateIndexes.push(index);
        fallbackCandidatesByOrderId.set(candidate.review.orderId, candidateIndexes);
    });

    // A legacy orderDocId is repaired logically at read time only when orderId
    // points to one unique order. Nothing is rewritten or deleted in Firestore.
    await Promise.all(Array.from(fallbackCandidatesByOrderId.entries()).map(
        async ([orderId, candidateIndexes]) => {
            const snapshot = await db.collection('orders')
                .where('orderId', '==', orderId)
                .limit(2)
                .get();
            if (snapshot.size !== 1) return;

            const matchedOrderDocument = snapshot.docs[0];
            for (const candidateIndex of candidateIndexes) {
                const candidate = candidates[candidateIndex];
                if (isReviewBackedByDeliveredOrder(
                    candidate.data,
                    matchedOrderDocument.id,
                    matchedOrderDocument.data() as Record<string, unknown>,
                )) {
                    resolvedOrderDocIds.set(candidateIndex, matchedOrderDocument.id);
                }
            }
        },
    ));

    const legacyBacked = candidates.flatMap((candidate, index) => {
        const resolvedOrderDocId = resolvedOrderDocIds.get(index);
        return resolvedOrderDocId
            ? [{ ...candidate.review, orderDocId: resolvedOrderDocId }]
            : [];
    });
    // دمج الجديد (موقَّع جوجل + معتمَد) مع القديم (مربوط بطلب) مرتّبين بالأحدث
    return [...directApproved, ...legacyBacked]
        .sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime());
}

// ============================================
// REVIEW RETRIEVAL
// ============================================

/**
 * Get approved reviews submitted through an order-backed review token.
 */
export async function getProductReviews(productSlug: string, limit: number = 20): Promise<VerifiedReview[]> {
    if (!PRODUCT_SLUG_PATTERN.test(productSlug)) return [];
    const safeLimit = Math.max(1, Math.min(Number.isInteger(limit) ? limit : 20, 100));

    try {
        const db = await getFirestore();
        const snapshot = await db.collection('reviews')
            .where('productSlug', '==', productSlug)
            .where('status', '==', 'approved')
            .orderBy('reviewDate', 'desc')
            .limit(safeLimit)
            .get();

        return await filterOrderBackedReviews(db, snapshot.docs);
    } catch {
        logger.warn('Failed to fetch reviews');
        return [];
    }
}

/**
 * Approved order-backed reviews submitted from a given governorate.
 * Equality-only filters → no composite Firestore index required.
 */
export async function getReviewsByGovernorate(governorateName: string, max: number = 6): Promise<VerifiedReview[]> {
    const normalizedGovernorate = normalizeSingleLine(governorateName);
    if (!normalizedGovernorate || normalizedGovernorate.length > 80) return [];
    const safeMax = Math.max(1, Math.min(Number.isInteger(max) ? max : 6, 20));

    try {
        const db = await getFirestore();
        const snapshot = await db.collection('reviews')
            .where('status', '==', 'approved')
            .where('governorate', '==', normalizedGovernorate)
            .limit(30)
            .get();

        return (await filterOrderBackedReviews(db, snapshot.docs))
            .sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime())
            .slice(0, safeMax);
    } catch {
        logger.warn('Failed to fetch governorate reviews');
        return [];
    }
}

/**
 * Get total review count for a product
 */
export async function getProductReviewCount(productSlug: string): Promise<number> {
    if (!PRODUCT_SLUG_PATTERN.test(productSlug)) return 0;

    try {
        const db = await getFirestore();
        const snapshot = await db.collection('reviews')
            .where('productSlug', '==', productSlug)
            .where('status', '==', 'approved')
            .get();

        return (await filterOrderBackedReviews(db, snapshot.docs)).length;
    } catch {
        logger.warn('Failed to get review count');
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
    if (!REVIEW_TOKEN_PATTERN.test(token)) {
        throw new Error('Invalid review token');
    }
    const safeCustomerName = normalizeSingleLine(customerName).slice(0, 100);
    const safeProductName = normalizeSingleLine(productName).slice(0, 180);
    if (!safeCustomerName || !safeProductName) {
        throw new Error('Invalid review-request message input');
    }

    // Arabic is default (no prefix), English uses /en
    const reviewUrl = locale === 'ar'
        ? `https://cairovolt.com/review/${token}`
        : `https://cairovolt.com/en/review/${token}`;

    if (locale === 'ar') {
        return `أهلاً ${safeCustomerName}!

أتمنى إن ${safeProductName} نال إعجابك!

لو عندك دقيقة، شاركنا رأيك الصادق — مدح أو نقد، الاتنين يفيدونا ويساعدوا عملاء تانيين يختاروا صح:

${reviewUrl}

🎁 وكهدية شكر: بعد إرسال تقييمك — أياً كان رأيك — هيظهر لك كود ${REVIEW_THANKS_LABEL_AR} على طلبك الجاي.

شكراً لثقتك في كايرو فولت!`;
    }

    return `Hello ${safeCustomerName}!

Hope you're enjoying your ${safeProductName}!

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
    if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
        throw new Error('Invalid review-token item list');
    }

    const tokens = [];

    for (const item of items) {
        const productSlug = normalizeSingleLine(item?.slug);
        const productName = normalizeSingleLine(item?.name);
        if (!PRODUCT_SLUG_PATTERN.test(productSlug)
            || !productName || productName.length > 180) {
            throw new Error('Invalid review-token item');
        }

        const token = await createReviewToken(
            orderId,
            orderDocId,
            productSlug,
            productName,
            customerName,
            customerPhone,
            governorate,
            purchaseDate
        );

        tokens.push({
            productSlug,
            productName,
            token,
            reviewUrl: `https://cairovolt.com/review/${token}`
        });
    }

    return tokens;
}
