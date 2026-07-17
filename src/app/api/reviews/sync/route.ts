import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { FieldValue } from 'firebase-admin/firestore';
import { getSecret } from '@/lib/get-secrets';
import { getFirestore } from '@/lib/firebase-admin';
import {
    isAdminRequestAuthorized,
    isAdminTaskRequestAuthorized,
} from '@/lib/admin-session';
import { matchOrderProduct } from '@/lib/match-order-product';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';
import {
    createReviewToken,
    generateReviewRequestMessage,
    isDeliveredOrderStatus,
} from '@/lib/verified-reviews';

const DELIVERED_STATUS = 'تم التوصيل';
const PROCESSED_MARKER = '📝 تم إرسال طلب التقييم';
const UNMATCHED_MARKER = '📝 تقييم: الطلب يحتاج مطابقة يدوية';
const MIN_DAYS_SINCE_ORDER = 6;
const MAX_DAYS_SINCE_ORDER = 45;
const MAX_PATCH_BODY_BYTES = 2 * 1024;
const PRODUCT_SLUG_PATTERN = /^[a-z0-9][a-z0-9._-]{0,179}$/;
const REQUEST_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;
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

function isAuthorized(req: NextRequest): boolean {
    return isAdminRequestAuthorized(req) || isAdminTaskRequestAuthorized(req);
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

function normalizeName(value: unknown): string {
    return normalizeSingleLine(value).toLocaleLowerCase('ar-EG');
}

function limited(req: NextRequest, isWrite: boolean): NextResponse | null {
    const result = checkRateLimit(`reviews-sync:${getClientIp(req.headers)}`, isWrite);
    if (result.allowed) return null;
    return json({ error: 'Too many requests' }, 429, { 'Retry-After': '60' });
}

function toWhatsAppNumber(raw: unknown): string | null {
    const normalized = normalizePhone(raw);
    return /^201[0125]\d{8}$/.test(normalized) ? normalized : null;
}

function daysSince(raw: string): number | null {
    const value = raw.trim();
    if (!value) return null;

    let date: Date | null = null;
    const dmy = value.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);
    if (dmy) {
        const year = dmy[3].length === 2 ? 2000 + Number(dmy[3]) : Number(dmy[3]);
        date = new Date(year, Number(dmy[2]) - 1, Number(dmy[1]));
    } else {
        const parsed = new Date(value);
        if (Number.isFinite(parsed.getTime())) date = parsed;
    }

    if (!date || !Number.isFinite(date.getTime())) return null;
    return Math.floor((Date.now() - date.getTime()) / 86_400_000);
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

function findOrderItem(orderData: Record<string, unknown>, productSlug: string) {
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

async function getGoogleAuth() {
    const [email, privateKey] = await Promise.all([
        getSecret('google_service_account_email'),
        getSecret('google_private_key'),
    ]);
    if (!email || !privateKey) throw new Error('Integration unavailable');

    return new JWT({
        email,
        key: privateKey.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
}

async function findOrderByReference(orderReference: string) {
    const db = await getFirestore();
    const query = await db.collection('orders')
        .where('orderId', '==', orderReference)
        .limit(2)
        .get();
    if (query.size === 1) return query.docs[0];
    if (query.size > 1) return null;

    const direct = await db.collection('orders').doc(orderReference).get();
    return direct.exists ? direct : null;
}

function readOrderReference(
    row: { get(header: string): unknown },
    positionalHeader: string | undefined,
): string {
    const candidates = [
        positionalHeader,
        'orderId',
        'Order ID',
        'رقم الطلب',
        'كود الطلب',
    ].filter((header): header is string => Boolean(header));

    for (const header of candidates) {
        const value = normalizeSingleLine(row.get(header));
        if (value) return value;
    }
    return '';
}

async function recordUnmatchedRequest(
    db: Awaited<ReturnType<typeof getFirestore>>,
    sheetId: string,
    rowNumber: number,
    data: {
        customerName: string;
        customerPhone: string;
        sheetProductName: string;
        reason: string;
    },
) {
    const requestId = crypto.createHash('sha256')
        .update(`unmatched\u0000${sheetId}\u0000${rowNumber}`, 'utf8')
        .digest('hex');
    const requestRef = db.collection('review_requests').doc(requestId);
    await db.runTransaction(async transaction => {
        const existing = await transaction.get(requestRef);
        if (existing.exists) return;
        transaction.create(requestRef, {
            rowNumber,
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            sheetProductName: data.sheetProductName,
            status: 'unmatched',
            reason: data.reason,
            source: 'google_sheets_sync',
            createdAt: FieldValue.serverTimestamp(),
        });
    });
}

export async function GET(req: NextRequest) {
    if (!isAuthorized(req)) return json({ error: 'Unauthorized' }, 401);
    const rateResponse = limited(req, true);
    if (rateResponse) return rateResponse;

    try {
        const sheetId = process.env.GOOGLE_SHEET_ID;
        if (!sheetId) return json({ error: 'Review sync is not configured' }, 503);

        const auth = await getGoogleAuth();
        const spreadsheet = new GoogleSpreadsheet(sheetId, auth);
        await spreadsheet.loadInfo();

        const sheet = spreadsheet.sheetsByIndex[0];
        const rows = await sheet.getRows();
        const orderReferenceHeader = sheet.headerValues[15];
        const db = await getFirestore();
        const results: Array<Record<string, unknown>> = [];
        let skippedOutsideWindow = 0;

        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            const status = normalizeSingleLine(row.get('الحالة'));
            const notes = normalizeSingleLine(row.get('ملاحظات'));
            const orderDate = normalizeSingleLine(row.get('date'));
            const sheetCustomerName = normalizeSingleLine(row.get('الاسم'));
            const sheetCustomerPhone = normalizeSingleLine(
                row.get('رقم الواتس') || row.get('رقم الهاتف'),
            );
            const sheetProductName = normalizeSingleLine(row.get('اسم المنتج'));

            if (status !== DELIVERED_STATUS) continue;
            if (notes.includes(PROCESSED_MARKER) || notes.includes(UNMATCHED_MARKER)) continue;
            if (!sheetCustomerName || !sheetCustomerPhone || !sheetProductName) continue;

            const age = daysSince(orderDate);
            if (age !== null && (age < MIN_DAYS_SINCE_ORDER || age > MAX_DAYS_SINCE_ORDER)) {
                skippedOutsideWindow++;
                continue;
            }

            const rowNumber = index + 2;
            try {
                const orderReference = readOrderReference(row, orderReferenceHeader);
                const matchedProduct = matchOrderProduct(sheetProductName);
                const waNumber = toWhatsAppNumber(sheetCustomerPhone);
                const orderDocument = orderReference
                    ? await findOrderByReference(orderReference)
                    : null;

                if (!matchedProduct || !waNumber || !orderDocument || !orderDocument.exists) {
                    row.set('ملاحظات', `${notes}\n${UNMATCHED_MARKER}`.trim());
                    await row.save();
                    try {
                        await recordUnmatchedRequest(db, sheetId, rowNumber, {
                            customerName: sheetCustomerName,
                            customerPhone: sheetCustomerPhone,
                            sheetProductName,
                            reason: !matchedProduct
                                ? 'product-not-matched'
                                : !waNumber
                                    ? 'invalid-phone'
                                    : 'order-not-found',
                        });
                    } catch {
                        // The row marker remains the durable fallback if tracking is unavailable.
                    }
                    results.push({ rowNumber, status: 'unmatched' });
                    continue;
                }

                const orderData = orderDocument.data() as Record<string, unknown>;
                const orderId = normalizeSingleLine(orderData.orderId);
                const customerName = normalizeSingleLine(orderData.customerName);
                const customerPhone = normalizePhone(orderData.whatsapp || orderData.phone);
                const orderItem = findOrderItem(orderData, matchedProduct.slug);
                if (!orderId
                    || (orderReference !== orderId && orderReference !== orderDocument.id)
                    || normalizeName(customerName) !== normalizeName(sheetCustomerName)
                    || customerPhone !== waNumber
                    || !orderItem) {
                    row.set('ملاحظات', `${notes}\n${UNMATCHED_MARKER}`.trim());
                    await row.save();
                    try {
                        await recordUnmatchedRequest(db, sheetId, rowNumber, {
                            customerName: sheetCustomerName,
                            customerPhone: sheetCustomerPhone,
                            sheetProductName,
                            reason: 'order-details-mismatch',
                        });
                    } catch {
                        // The row marker remains the durable fallback if tracking is unavailable.
                    }
                    results.push({ rowNumber, status: 'unmatched' });
                    continue;
                }

                const orderRef = db.collection('orders').doc(orderDocument.id);
                await db.runTransaction(async transaction => {
                    const currentOrder = await transaction.get(orderRef);
                    if (!currentOrder.exists) throw new Error('Order unavailable');
                    const currentData = currentOrder.data() as Record<string, unknown>;
                    if (normalizeSingleLine(currentData.orderId) !== orderId
                        || normalizePhone(currentData.whatsapp || currentData.phone) !== customerPhone
                        || !findOrderItem(currentData, matchedProduct.slug)) {
                        throw new Error('Order changed');
                    }
                    if (!isDeliveredOrderStatus(currentData.status)) {
                        transaction.update(orderRef, {
                            status: 'delivered',
                            deliveryEvidenceSource: 'google_sheets_sync',
                            deliveryConfirmedAt: FieldValue.serverTimestamp(),
                            updatedAt: FieldValue.serverTimestamp(),
                        });
                    }
                });

                const productName = normalizeSingleLine(orderItem.name) || matchedProduct.nameAr;
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
                    orderId,
                    orderDocument.id,
                    matchedProduct.slug,
                    productName,
                    customerName,
                    customerPhone,
                    governorate,
                    purchaseDate,
                );
                const firstName = customerName.split(' ').filter(Boolean)[0] || customerName;
                const message = generateReviewRequestMessage(firstName, productName, token, 'ar');
                const reviewUrl = `https://cairovolt.com/review/${token}`;
                const whatsappLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
                const requestId = crypto.createHash('sha256')
                    .update(`${orderDocument.id}\u0000${matchedProduct.slug}`, 'utf8')
                    .digest('hex');
                const requestRef = db.collection('review_requests').doc(requestId);
                await db.runTransaction(async transaction => {
                    const existing = await transaction.get(requestRef);
                    if (existing.exists) return;
                    transaction.create(requestRef, {
                        orderId,
                        orderDocId: orderDocument.id,
                        rowNumber,
                        customerName,
                        customerPhone,
                        productName,
                        productSlug: matchedProduct.slug,
                        governorate,
                        token,
                        reviewUrl,
                        whatsappLink,
                        status: 'pending',
                        source: 'google_sheets_sync',
                        createdAt: FieldValue.serverTimestamp(),
                    });
                });

                row.set('ملاحظات', `${notes}\n${PROCESSED_MARKER}\n${reviewUrl}`.trim());
                await row.save();
                results.push({
                    rowNumber,
                    customerName,
                    productName,
                    status: 'created',
                    whatsappLink,
                });
            } catch {
                results.push({ rowNumber, status: 'error' });
            }
        }

        return json({
            success: true,
            processed: results.length,
            skippedOutsideWindow,
            results,
        });
    } catch {
        return json({ error: 'Review sync failed' }, 500);
    }
}

export async function POST(req: NextRequest) {
    if (!isAuthorized(req)) return json({ error: 'Unauthorized' }, 401);
    const rateResponse = limited(req, false);
    if (rateResponse) return rateResponse;

    try {
        const db = await getFirestore();
        const snapshot = await db.collection('review_requests')
            .orderBy('createdAt', 'desc')
            .limit(100)
            .get();
        const requests = snapshot.docs.map(document => {
            const data = document.data();
            return {
                id: document.id,
                rowNumber: Number.isInteger(data.rowNumber) ? data.rowNumber : null,
                customerName: normalizeSingleLine(data.customerName),
                customerPhone: normalizeSingleLine(data.customerPhone),
                productName: normalizeSingleLine(data.productName),
                sheetProductName: normalizeSingleLine(data.sheetProductName),
                reviewUrl: normalizeSingleLine(data.reviewUrl),
                whatsappLink: normalizeSingleLine(data.whatsappLink),
                status: normalizeSingleLine(data.status),
                reason: normalizeSingleLine(data.reason),
                createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
            };
        });

        return json({ success: true, total: requests.length, requests });
    } catch {
        return json({ error: 'Unable to load review requests' }, 500);
    }
}

export async function PATCH(req: NextRequest) {
    if (!isAuthorized(req)) return json({ error: 'Unauthorized' }, 401);
    const rateResponse = limited(req, true);
    if (rateResponse) return rateResponse;

    const declaredLength = Number(req.headers.get('content-length') || 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_PATCH_BODY_BYTES) {
        return json({ error: 'Request payload is too large' }, 413);
    }

    let rawBody = '';
    try {
        rawBody = await req.text();
    } catch {
        return json({ error: 'Invalid request' }, 400);
    }
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_PATCH_BODY_BYTES) {
        return json({ error: 'Request payload is too large' }, 413);
    }

    let id = '';
    let status = '';
    try {
        const parsed: unknown = JSON.parse(rawBody);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            throw new Error('Invalid request');
        }
        id = normalizeSingleLine((parsed as { id?: unknown }).id);
        status = normalizeSingleLine((parsed as { status?: unknown }).status);
    } catch {
        return json({ error: 'Invalid request' }, 400);
    }

    if (!REQUEST_ID_PATTERN.test(id) || !['sent', 'dismissed'].includes(status)) {
        return json({ error: 'Invalid request' }, 400);
    }

    try {
        const db = await getFirestore();
        const requestRef = db.collection('review_requests').doc(id);
        const result = await db.runTransaction(async transaction => {
            const document = await transaction.get(requestRef);
            if (!document.exists) return 'missing';
            const currentStatus = normalizeSingleLine(document.data()?.status);
            if (currentStatus === status) return 'unchanged';
            if (!['pending', 'unmatched'].includes(currentStatus)) return 'conflict';

            transaction.update(requestRef, {
                status,
                updatedAt: FieldValue.serverTimestamp(),
            });
            return 'updated';
        });

        if (result === 'missing') return json({ error: 'Review request not found' }, 404);
        if (result === 'conflict') return json({ error: 'Review request cannot be changed' }, 409);
        return json({ success: true });
    } catch {
        return json({ error: 'Unable to update review request' }, 500);
    }
}
