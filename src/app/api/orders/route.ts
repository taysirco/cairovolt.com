import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { appendOrderToSheet } from '@/lib/google-sheets';
import { validateApiKey } from '@/lib/api-auth';
import { sendTtqOrderEvent } from '@/lib/tiktokEventsApi';

// ═══════════ Server-side Coupon Validation ═══════════
const SERVER_VALID_COUPONS: Record<string, number> = {
    'ORIGINAL25': 0.15, // 15% discount
};

// Defense-in-depth: sanitize user-submitted text before storing
function sanitizeInput(input: unknown, maxLength = 500): string {
    if (typeof input !== 'string') return '';
    return input
        .replace(/<[^>]*>/g, '')          // Strip HTML tags
        .replace(/[<>"'&]/g, '')          // Remove dangerous chars
        .replace(/javascript\s*:/gi, '')  // Block JS injection
        .trim()
        .slice(0, maxLength);
}

// Validate Egyptian phone number format server-side
function isValidEgyptianPhone(phone: string): boolean {
    return /^01[0125][0-9]{8}$/.test(phone);
}

export async function POST(req: NextRequest) {
    let db;
    try {
        db = await getFirestore();
    } catch (initError: unknown) {
        console.error('Firestore init failed in orders route:', initError);
        return NextResponse.json({
            error: 'Service Unavailable: Database initialization failed',
        }, { status: 503 });
    }

    try {
        const data = await req.json();

        // Validate required fields
        if (!data.customerName || !data.phone || !data.address || !data.city || !data.items?.length) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Sanitize and validate phone
        const cleanPhone = String(data.phone).replace(/[^0-9]/g, '');
        if (!isValidEgyptianPhone(cleanPhone)) {
            return NextResponse.json({ error: 'Invalid Egyptian phone number. Must start with 01 and be 11 digits.' }, { status: 400 });
        }

        // Generate readable Order ID (e.g., CV-1706543)
        const orderId = `CV-${Math.floor(Date.now() / 1000).toString().slice(-6)}`;

        const orderData = {
            orderId,
            customerName: sanitizeInput(data.customerName, 100),
            phone: cleanPhone,
            whatsapp: sanitizeInput(data.whatsapp || data.phone, 20).replace(/[^0-9]/g, '') || cleanPhone,
            address: sanitizeInput(data.address, 300),
            city: sanitizeInput(data.city, 50),
            cityLabel: sanitizeInput(data.cityLabel, 50) || null,
            items: Array.isArray(data.items) ? data.items.slice(0, 20) : [], // Cap at 20 items
            totalAmount: typeof data.totalAmount === 'number' ? data.totalAmount : 0,
            // ═══ Coupon: Server-side re-validation (defense-in-depth) ═══
            couponCode: null as string | null,
            couponDiscount: 0,
            subtotalBeforeDiscount: typeof data.subtotal === 'number' ? data.subtotal : 0,
            status: 'pending',
            paymentMethod: 'cod',
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        // Server-side coupon verification — never trust client-side calculations
        if (data.couponCode && typeof data.couponCode === 'string') {
            const code = data.couponCode.trim().toUpperCase();
            const serverRate = SERVER_VALID_COUPONS[code];
            if (serverRate) {
                const subtotal = typeof data.subtotal === 'number' ? data.subtotal : 0;
                const serverDiscount = Math.round(subtotal * serverRate);
                const subtotalAfterDiscount = subtotal - serverDiscount;
                const shipping = subtotalAfterDiscount >= 1350 ? 0 : 40;
                const recalculatedTotal = subtotalAfterDiscount + shipping;

                orderData.couponCode = code;
                orderData.couponDiscount = serverDiscount;
                orderData.totalAmount = recalculatedTotal;
            }
            // If invalid coupon, silently ignore — orderData keeps totalAmount from client
        }

        const docRef = await db.collection('orders').add(orderData);

        // Defer Google Sheets sync + TikTok S2S to AFTER the response is sent.
        // This eliminates ~2-3 seconds of blocking time for the user.
        const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
        const clientUA = req.headers.get('user-agent') || '';

        after(async () => {
            try {
                await appendOrderToSheet({
                    ...orderData,
                    id: docRef.id
                });
            } catch (sheetError) {
                console.error('Failed to sync with Google Sheet (deferred):', sheetError);
            }

            // TikTok Events API: Server-side PlaceAnOrder event
            try {
                await sendTtqOrderEvent(
                    orderId,
                    Array.isArray(data.items) ? data.items.slice(0, 20) : [],
                    typeof data.totalAmount === 'number' ? orderData.totalAmount : 0,
                    cleanPhone,
                    clientIp,
                    clientUA,
                );
            } catch (ttqError) {
                console.error('TikTok S2S event failed (deferred):', ttqError);
            }
        });

        // Response sent immediately after Firestore write — no waiting for Sheets
        return NextResponse.json({
            id: docRef.id,
            orderId: orderId,
            message: 'Order placed successfully'
        });
    } catch (error: unknown) {
        console.error('Error creating order:', error);
        return NextResponse.json({
            error: 'Failed to create order',
        }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const authError = validateApiKey(req);
    if (authError) return authError;

    const db = await getFirestore();

    try {
        const snapshot = await db.collection('orders').orderBy('createdAt', 'desc').get();
        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
