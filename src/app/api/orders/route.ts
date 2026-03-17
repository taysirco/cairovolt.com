import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { appendOrderToSheet } from '@/lib/google-sheets';
import { validateApiKey } from '@/lib/api-auth';

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

        // Generate readable Order ID (e.g., CV-1706543)
        const orderId = `CV-${Math.floor(Date.now() / 1000).toString().slice(-6)}`;

        const orderData = {
            orderId,
            customerName: data.customerName,
            phone: data.phone,
            whatsapp: data.whatsapp || data.phone,
            address: data.address,
            city: data.city,
            cityLabel: data.cityLabel || null, // Firestore doesn't accept undefined
            items: data.items,
            totalAmount: data.totalAmount,
            status: 'pending',
            paymentMethod: 'cod',
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        const docRef = await db.collection('orders').add(orderData);

        // Defer Google Sheets sync to AFTER the response is sent.
        // This eliminates ~2-3 seconds of blocking time for the user.
        after(async () => {
            try {
                await appendOrderToSheet({
                    ...orderData,
                    id: docRef.id
                });
            } catch (sheetError) {
                console.error('Failed to sync with Google Sheet (deferred):', sheetError);
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
