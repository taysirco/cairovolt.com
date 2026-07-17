import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getFirestore } from '@/lib/firebase-admin';
import { matchOrderProduct } from '@/lib/match-order-product';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';
import {
    createReviewToken,
    generateReviewRequestMessage,
    isDeliveredOrderStatus,
} from '@/lib/verified-reviews';

const MAX_WEBHOOK_BODY_BYTES = 16 * 1024;
const MAX_SECRET_LENGTH = 512;
const ORDER_REFERENCE_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{2,119}$/;
const PRODUCT_SLUG_PATTERN = /^[a-z0-9][a-z0-9._-]{0,179}$/;
const NO_STORE_HEADERS = {
    'Cache-Control': 'private, no-store, no-cache, max-age=0, must-revalidate',
    'Pragma': 'no-cache',
};

function json(body: unknown, status = 200, extraHeaders?: Record<string, string>) {
    return NextResponse.json(body, {
        status,
        headers: { ...NO_STORE_HEADERS, ...extraHeaders },
    });
}

function normalizeSingleLine(value: unknown): string {
    if (typeof value !== 'string' && typeof value !== 'number') return '';
    return String(value)
        .normalize('NFKC')
        .replace(/[\u0000-\u001f\u007f<>]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function normalizePhone(value: unknown): string {
    let digits = normalizeSingleLine(value).replace(/\D/g, '');
    if (digits.startsWith('0020')) digits = digits.slice(2);
    if (digits.startsWith('20')) return digits;
    if (digits.startsWith('0')) return `2${digits}`;
    if (digits.length === 10 && digits.startsWith('1')) return `20${digits}`;
    return digits;
}

function normalizeNameForMatch(value: unknown): string {
    return normalizeSingleLine(value).toLocaleLowerCase('ar-EG');
}

function secretMatches(candidate: unknown, expected: string): boolean {
    if (typeof candidate !== 'string' || !candidate || candidate.length > MAX_SECRET_LENGTH) {
        return false;
    }

    const candidateHash = crypto.createHash('sha256').update(candidate, 'utf8').digest();
    const expectedHash = crypto.createHash('sha256').update(expected, 'utf8').digest();
    return crypto.timingSafeEqual(candidateHash, expectedHash);
}

function getWebhookSecret(): string | null {
    const secret = process.env.REVIEW_WEBHOOK_SECRET;
    return secret && secret.length >= 32 && secret.length <= MAX_SECRET_LENGTH
        ? secret
        : null;
}

function isWebhookAuthorized(
    req: NextRequest,
    bodySecret: unknown,
    expectedSecret: string,
): boolean {
    const authorization = req.headers.get('authorization') || '';
    const bearer = authorization.match(/^Bearer\s+([^\s]+)$/i)?.[1] || '';
    const headerSecret = req.headers.get('x-webhook-secret') || '';

    // The body form remains compatible with the existing Apps Script caller;
    // every form is checked only against REVIEW_WEBHOOK_SECRET.
    return [bearer, headerSecret, bodySecret]
        .some(candidate => secretMatches(candidate, expectedSecret));
}

function itemSlug(item: Record<string, unknown>): string {
    const direct = normalizeSingleLine(item.slug).toLowerCase();
    if (PRODUCT_SLUG_PATTERN.test(direct)) return direct;

    const productId = normalizeSingleLine(item.productId).toLowerCase();
    const fromProductId = productId.startsWith('static_')
        ? productId.slice('static_'.length)
        : productId;
    if (PRODUCT_SLUG_PATTERN.test(fromProductId)) return fromProductId;

    return matchOrderProduct(normalizeSingleLine(item.name))?.slug || '';
}

function findOrderItem(
    orderData: Record<string, unknown>,
    productSlug: string,
): Record<string, unknown> | null {
    if (!Array.isArray(orderData.items) || orderData.items.length === 0 || orderData.items.length > 50) {
        return null;
    }

    for (const rawItem of orderData.items) {
        if (!rawItem || typeof rawItem !== 'object' || Array.isArray(rawItem)) continue;
        const item = rawItem as Record<string, unknown>;
        if (itemSlug(item) === productSlug) return item;
    }

    return null;
}

async function findOrder(orderReference: string) {
    const db = await getFirestore();
    const byOrderId = await db.collection('orders')
        .where('orderId', '==', orderReference)
        .limit(2)
        .get();

    if (byOrderId.size === 1) return byOrderId.docs[0];
    if (byOrderId.size > 1) return null;

    const direct = await db.collection('orders').doc(orderReference).get();
    return direct.exists ? direct : null;
}

export async function POST(req: NextRequest) {
    const ip = getClientIp(req.headers);
    const rateCheck = checkRateLimit(`reviews-webhook:${ip}`, true);
    if (!rateCheck.allowed) {
        return json({ error: 'Too many requests' }, 429, { 'Retry-After': '60' });
    }

    const expectedSecret = getWebhookSecret();
    if (!expectedSecret) {
        return json({ error: 'Service temporarily unavailable' }, 503);
    }

    const declaredLength = Number(req.headers.get('content-length') || 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_WEBHOOK_BODY_BYTES) {
        return json({ error: 'Request payload is too large' }, 413);
    }

    let rawBody = '';
    try {
        rawBody = await req.text();
    } catch {
        return json({ error: 'Invalid request payload' }, 400);
    }
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_WEBHOOK_BODY_BYTES) {
        return json({ error: 'Request payload is too large' }, 413);
    }

    let data: Record<string, unknown>;
    try {
        const parsed: unknown = JSON.parse(rawBody);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            throw new Error('Invalid payload');
        }
        data = parsed as Record<string, unknown>;
    } catch {
        return json({ error: 'Invalid request payload' }, 400);
    }

    if (!isWebhookAuthorized(req, data.secret, expectedSecret)) {
        return json({ error: 'Unauthorized' }, 401);
    }

    const orderReference = normalizeSingleLine(data.orderId);
    const customerName = normalizeSingleLine(data.customerName);
    const customerPhone = normalizePhone(data.customerPhone);
    const productName = normalizeSingleLine(data.productName);
    const suppliedSlug = normalizeSingleLine(data.productSlug).toLowerCase();
    const deliveryStatus = normalizeSingleLine(data.status || data.deliveryStatus);
    const matchedProduct = productName ? matchOrderProduct(productName) : null;
    const productSlug = suppliedSlug || matchedProduct?.slug || '';

    if (!ORDER_REFERENCE_PATTERN.test(orderReference)
        || !customerName || customerName.length > 100
        || customerPhone.length < 11 || customerPhone.length > 15
        || !productName || productName.length > 180
        || !PRODUCT_SLUG_PATTERN.test(productSlug)
        || !isDeliveredOrderStatus(deliveryStatus)) {
        return json({ error: 'Invalid webhook payload' }, 400);
    }

    try {
        const orderDocument = await findOrder(orderReference);
        if (!orderDocument || !orderDocument.exists) {
            return json({ error: 'Order could not be verified' }, 404);
        }

        const orderData = orderDocument.data() as Record<string, unknown>;
        const authoritativeOrderId = normalizeSingleLine(orderData.orderId);
        const authoritativeName = normalizeSingleLine(orderData.customerName);
        const authoritativePhone = normalizePhone(orderData.whatsapp || orderData.phone);
        const authoritativeItem = findOrderItem(orderData, productSlug);
        if (!authoritativeOrderId
            || (orderReference !== orderDocument.id && orderReference !== authoritativeOrderId)
            || normalizeNameForMatch(authoritativeName) !== normalizeNameForMatch(customerName)
            || authoritativePhone !== customerPhone
            || !authoritativeItem) {
            return json({ error: 'Order details do not match' }, 409);
        }

        const db = await getFirestore();
        const orderRef = db.collection('orders').doc(orderDocument.id);
        await db.runTransaction(async transaction => {
            const currentOrder = await transaction.get(orderRef);
            if (!currentOrder.exists) throw new Error('Order unavailable');

            const currentData = currentOrder.data() as Record<string, unknown>;
            const currentPhone = normalizePhone(currentData.whatsapp || currentData.phone);
            if (normalizeSingleLine(currentData.orderId) !== authoritativeOrderId
                || normalizeNameForMatch(currentData.customerName) !== normalizeNameForMatch(authoritativeName)
                || currentPhone !== authoritativePhone
                || !findOrderItem(currentData, productSlug)) {
                throw new Error('Order changed');
            }

            if (!isDeliveredOrderStatus(currentData.status)) {
                transaction.update(orderRef, {
                    status: 'delivered',
                    deliveryEvidenceSource: 'review_webhook',
                    deliveryConfirmedAt: FieldValue.serverTimestamp(),
                    updatedAt: FieldValue.serverTimestamp(),
                });
            }
        });

        const authoritativeProductName = normalizeSingleLine(authoritativeItem.name)
            || matchedProduct?.nameAr
            || productName;
        const governorate = normalizeSingleLine(orderData.cityLabel)
            || normalizeSingleLine(orderData.city)
            || 'مصر';
        const purchaseDate = orderData.createdAt
            && typeof orderData.createdAt === 'object'
            && 'toDate' in orderData.createdAt
            && typeof (orderData.createdAt as { toDate?: unknown }).toDate === 'function'
            ? (orderData.createdAt as { toDate: () => Date }).toDate()
            : new Date();

        const token = await createReviewToken(
            authoritativeOrderId,
            orderDocument.id,
            productSlug,
            authoritativeProductName,
            authoritativeName,
            authoritativePhone,
            governorate,
            purchaseDate,
        );

        const firstName = authoritativeName.split(' ').filter(Boolean)[0] || authoritativeName;
        const message = generateReviewRequestMessage(
            firstName,
            authoritativeProductName,
            token,
            'ar',
        );
        const reviewUrl = `https://cairovolt.com/review/${token}`;
        const whatsappLink = `https://wa.me/${authoritativePhone}?text=${encodeURIComponent(message)}`;
        const requestId = crypto.createHash('sha256')
            .update(`${orderDocument.id}\u0000${productSlug}`, 'utf8')
            .digest('hex');
        const requestRef = db.collection('review_requests').doc(requestId);
        const duplicate = await db.runTransaction(async transaction => {
            const existing = await transaction.get(requestRef);
            if (existing.exists) return true;

            transaction.create(requestRef, {
                orderId: authoritativeOrderId,
                orderDocId: orderDocument.id,
                customerName: authoritativeName,
                customerPhone: authoritativePhone,
                productName: authoritativeProductName,
                productSlug,
                token,
                reviewUrl,
                whatsappLink,
                status: 'pending',
                source: 'review_webhook',
                createdAt: FieldValue.serverTimestamp(),
            });
            return false;
        });

        return json({
            success: true,
            duplicate,
            token,
            reviewUrl,
            whatsappMessage: message,
            whatsappLink,
        });
    } catch {
        return json({ error: 'Failed to process review request' }, 500);
    }
}
