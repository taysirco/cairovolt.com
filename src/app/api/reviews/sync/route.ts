/**
 * Review-request engine — Google Sheets → review tokens → WhatsApp outbox.
 *
 * GET  ?key=…   Scan the orders sheet for delivered orders inside the request
 *               window, match each to a real catalog product, create a review
 *               token and queue a ready-to-send WhatsApp request.
 * POST          List queued requests (admin lobby).
 * PATCH         Update a request's status: 'sent' | 'dismissed'.
 *
 * All three verbs require the ADMIN_TASKS_SECRET (Bearer header or ?key=).
 * GET is also what the daily scheduler calls (e.g. Cloud Scheduler / any cron):
 *   curl -s "https://cairovolt.com/api/reviews/sync?key=$ADMIN_TASKS_SECRET"
 *
 * Policy notes (Google review snippets):
 *  - Requests go to ALL delivered orders in the window — never filtered by
 *    expected sentiment.
 *  - The thank-you incentive is sentiment-neutral (see lib/review-incentive).
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { getSecret } from '@/lib/get-secrets';
import { createReviewToken, generateReviewRequestMessage } from '@/lib/verified-reviews';
import { matchOrderProduct } from '@/lib/match-order-product';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const DELIVERED_STATUS = 'تم التوصيل';
// Sheet markers — once written to ملاحظات the row is never reprocessed
const PROCESSED_MARKER = '📝 تم إرسال طلب التقييم';
const UNMATCHED_MARKER = '📝 تقييم: المنتج يحتاج مطابقة يدوية';

// Request window: wait for the customer to actually live with the product
// (~delivery + a few days), and don't nag about months-old orders.
const MIN_DAYS_SINCE_ORDER = 6;
const MAX_DAYS_SINCE_ORDER = 45;

function isAuthorized(req: NextRequest): boolean {
    const secret = process.env.ADMIN_TASKS_SECRET;
    if (!secret) return false; // unset secret = endpoint disabled, never open
    const header = req.headers.get('authorization') || '';
    const bearer = header.startsWith('Bearer ') ? header.slice(7) : '';
    const key = req.nextUrl.searchParams.get('key') || bearer;
    return key.length > 0 && key === secret;
}

/** Egyptian phone → international wa.me format (201XXXXXXXXX) */
function toWhatsAppNumber(raw: string): string | null {
    let digits = (raw || '').replace(/\D/g, '');
    if (!digits) return null;
    if (digits.startsWith('0020')) digits = digits.slice(2);
    if (digits.startsWith('20')) return digits;
    if (digits.startsWith('0')) return `2${digits}`;       // 01XXXXXXXXX → 201XXXXXXXXX
    if (digits.length === 10 && digits.startsWith('1')) return `20${digits}`; // 1XXXXXXXXX
    return digits.length >= 11 ? digits : null;
}

/** Parse sheet date (dd/mm/yyyy variants, ISO) → days since that date, or null */
function daysSince(raw: string): number | null {
    const s = (raw || '').trim();
    if (!s) return null;
    let date: Date | null = null;

    const dmy = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);
    if (dmy) {
        const year = dmy[3].length === 2 ? 2000 + Number(dmy[3]) : Number(dmy[3]);
        date = new Date(year, Number(dmy[2]) - 1, Number(dmy[1]));
    } else {
        const parsed = new Date(s);
        if (!isNaN(parsed.getTime())) date = parsed;
    }

    if (!date || isNaN(date.getTime())) return null;
    return Math.floor((Date.now() - date.getTime()) / 86_400_000);
}

async function getGoogleAuth() {
    const GOOGLE_CLIENT_EMAIL = await getSecret('google_service_account_email');
    const GOOGLE_PRIVATE_KEY = await getSecret('google_private_key');

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        throw new Error('Google Sheets credentials missing');
    }

    return new JWT({
        email: GOOGLE_CLIENT_EMAIL,
        key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
}

// GET: scan delivered orders → create tokens + queue WhatsApp requests
export async function GET(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const SHEET_ID = process.env.GOOGLE_SHEET_ID;
        if (!SHEET_ID) {
            return NextResponse.json({ error: 'Sheet ID not configured' }, { status: 500 });
        }

        const auth = await getGoogleAuth();
        const doc = new GoogleSpreadsheet(SHEET_ID, auth);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        const results: Array<Record<string, unknown>> = [];
        let skippedOutsideWindow = 0;
        const db = await getFirestore();

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            const status = row.get('الحالة') || '';
            const notes = row.get('ملاحظات') || '';
            const orderDate = row.get('التاريخ') || '';
            const customerName = row.get('الاسم') || '';
            const customerPhone = row.get('رقم الواتس') || row.get('رقم الهاتف') || '';
            const sheetProductName = row.get('اسم المنتج') || '';
            const governorate = row.get('المحافظة') || '';

            // Skip: not delivered / already handled / missing essentials
            if (status !== DELIVERED_STATUS) continue;
            if (notes.includes(PROCESSED_MARKER) || notes.includes(UNMATCHED_MARKER)) continue;
            if (!customerName || !customerPhone || !sheetProductName) continue;

            // Request window — wait after delivery, skip stale orders.
            // Unparseable date fails open: the order IS delivered.
            const age = daysSince(orderDate);
            if (age !== null && (age < MIN_DAYS_SINCE_ORDER || age > MAX_DAYS_SINCE_ORDER)) {
                skippedOutsideWindow++;
                continue;
            }

            try {
                const waNumber = toWhatsAppNumber(customerPhone);
                const matched = matchOrderProduct(sheetProductName);

                // Unmatched product → queue for manual handling, never guess a
                // slug (a review on the wrong product page is worse than none).
                if (!matched || !waNumber) {
                    row.set('ملاحظات', `${notes}\n${UNMATCHED_MARKER}`.trim());
                    await row.save();

                    await db.collection('review_requests').add({
                        rowNumber: i + 2,
                        customerName,
                        customerPhone,
                        sheetProductName,
                        governorate,
                        status: 'unmatched',
                        reason: !matched ? 'product-not-matched' : 'invalid-phone',
                        source: 'google_sheets_sync',
                        createdAt: FieldValue.serverTimestamp(),
                    });
                    results.push({ rowNumber: i + 2, customerName, sheetProductName, status: 'unmatched' });
                    continue;
                }

                const orderId = `GS-${i + 2}-${Date.now()}`;
                const token = await createReviewToken(
                    orderId,
                    orderId,
                    matched.slug,
                    matched.nameAr,
                    customerName,
                    customerPhone,
                    governorate || 'مصر',
                    new Date()
                );

                const message = generateReviewRequestMessage(
                    customerName.split(' ')[0],
                    matched.nameAr,
                    token,
                    'ar'
                );

                const reviewUrl = `https://cairovolt.com/review/${token}`;
                const whatsappLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

                row.set('ملاحظات', `${notes}\n${PROCESSED_MARKER}\n${reviewUrl}`.trim());
                await row.save();

                await db.collection('review_requests').add({
                    orderId,
                    rowNumber: i + 2,
                    customerName,
                    customerPhone,
                    productName: matched.nameAr,
                    productSlug: matched.slug,
                    governorate,
                    token,
                    reviewUrl,
                    whatsappLink,
                    status: 'pending',
                    source: 'google_sheets_sync',
                    createdAt: FieldValue.serverTimestamp(),
                });

                results.push({
                    rowNumber: i + 2,
                    customerName,
                    productName: matched.nameAr,
                    productSlug: matched.slug,
                    status: 'created',
                });
            } catch (rowError) {
                results.push({
                    rowNumber: i + 2,
                    customerName,
                    error: rowError instanceof Error ? rowError.message : String(rowError),
                    status: 'error',
                });
            }
        }

        return NextResponse.json({
            success: true,
            processed: results.length,
            skippedOutsideWindow,
            results,
        });
    } catch (error) {
        console.error('Sheet sync error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// POST: list queued requests for the admin lobby
export async function POST(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const db = await getFirestore();
        const snapshot = await db.collection('review_requests')
            .orderBy('createdAt', 'desc')
            .limit(100)
            .get();

        const requests = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
        }));

        return NextResponse.json({ success: true, total: requests.length, requests });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// PATCH: mark a request 'sent' (after the WhatsApp message went out) or 'dismissed'
export async function PATCH(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id, status } = await req.json();
        if (!id || !['sent', 'dismissed'].includes(status)) {
            return NextResponse.json({ error: 'id and status (sent|dismissed) required' }, { status: 400 });
        }

        const db = await getFirestore();
        await db.collection('review_requests').doc(id).update({
            status,
            updatedAt: FieldValue.serverTimestamp(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
