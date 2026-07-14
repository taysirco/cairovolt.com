/**
 * Review Request Webhook API
 * Called by Google Apps Script when order status changes to "تم التوصيل"
 */

import { NextRequest, NextResponse } from 'next/server';
import { createReviewToken, generateReviewRequestMessage } from '@/lib/verified-reviews';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { logger } from '@/lib/logger';

// Webhook secret for security (should match the one in Google Apps Script)
const WEBHOOK_SECRET = process.env.REVIEW_WEBHOOK_SECRET;

// Fail early if secret is not configured
if (!WEBHOOK_SECRET) {
    console.error('REVIEW_WEBHOOK_SECRET is not configured');
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        // Verify webhook secret — reject if not configured or mismatch
        if (!WEBHOOK_SECRET || data.secret !== WEBHOOK_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Validate required fields
        const { orderId, customerName, customerPhone, productName, productSlug, governorate } = data;

        if (!customerName || !customerPhone || !productName) {
            return NextResponse.json({
                success: false,
                error: 'Missing required fields: customerName, customerPhone, productName'
            }, { status: 400 });
        }

        // Generate a unique order ID if not provided
        const finalOrderId = orderId || `GS-${Date.now()}`;

        // Create review token
        const token = await createReviewToken(
            finalOrderId,
            finalOrderId, // Using orderId as docId for Google Sheets orders
            productSlug || productName.toLowerCase().replace(/\s+/g, '-'),
            productName,
            customerName,
            customerPhone,
            governorate || 'مصر',
            new Date()
        );

        // Generate WhatsApp message
        const message = generateReviewRequestMessage(
            customerName.split(' ')[0], // First name only
            productName,
            token,
            'ar'
        );

        // Generate review URL (Arabic is default, no /ar prefix)
        const reviewUrl = `https://cairovolt.com/review/${token}`;

        // Log the review request for tracking
        try {
            const db = await getFirestore();
            await db.collection('review_requests').add({
                orderId: finalOrderId,
                customerName,
                customerPhone,
                productName,
                token,
                reviewUrl,
                status: 'pending',
                source: 'google_sheets',
                createdAt: FieldValue.serverTimestamp()
            });
        } catch (logError) {
            logger.warn('Failed to log review request:', logError);
            // Continue anyway, this is just for tracking
        }

        return NextResponse.json({
            success: true,
            token,
            reviewUrl,
            whatsappMessage: message,
            // Ready-to-use WhatsApp link
            whatsappLink: `https://wa.me/${customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
        });

    } catch (error: unknown) {
        console.error('Review webhook error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to process review request',
        }, { status: 500 });
    }
}
