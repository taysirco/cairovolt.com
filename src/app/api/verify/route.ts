import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { generateWarrantyCode, isValidSerialFormat, getProductName } from '@/lib/serial-generator';
import { FieldValue } from 'firebase-admin/firestore';

// In-memory rate limiter for verify endpoint
const verifyRateStore = new Map<string, { count: number; resetAt: number }>();
const VERIFY_LIMIT = 5; // 5 attempts per hour
const VERIFY_WINDOW = 60 * 60 * 1000; // 1 hour

function checkVerifyRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = verifyRateStore.get(ip);
    if (!entry || now > entry.resetAt) {
        verifyRateStore.set(ip, { count: 1, resetAt: now + VERIFY_WINDOW });
        return true;
    }
    entry.count++;
    return entry.count <= VERIFY_LIMIT;
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') || 'unknown';

        if (!checkVerifyRateLimit(ip)) {
            return NextResponse.json(
                { valid: false, error: 'rate_limited', message: 'محاولات كثيرة. حاول بعد ساعة.' },
                { status: 429 }
            );
        }

        const body = await request.json();
        const rawSerial = (body.serial || '').trim();
        
        // Normalize: any case combination → canonical CV-1XXXXXm313
        // Accepts: cv-1xxxxxm313, CV-1XXXXXM313, cV-1XxXxXM313, etc.
        const normalizeSerial = (s: string): string => {
            if (s.length !== 14) return s;
            const variable = s.substring(4, 9).toUpperCase(); // 5 random chars → UPPERCASE
            return `CV-1${variable}m313`;
        };
        const serial = normalizeSerial(rawSerial);

        // Validate format
        if (!serial || !isValidSerialFormat(serial)) {
            return NextResponse.json(
                { valid: false, error: 'invalid_format', message: 'رقم السيريال غير صحيح.' },
                { status: 400 }
            );
        }

        const db = await getFirestore();
        const serialsRef = db.collection('warranty_serials');

        // Query by serial code
        const snapshot = await serialsRef.where('code', '==', serial).limit(1).get();

        if (snapshot.empty) {
            return NextResponse.json(
                { valid: false, error: 'serial_not_found', message: 'رقم السيريال غير موجود في قاعدة البيانات.' },
                { status: 404 }
            );
        }

        const doc = snapshot.docs[0];
        const data = doc.data();
        const userAgent = request.headers.get('user-agent') || 'unknown';

        // Already activated
        if (data.status === 'activated') {
            const productInfo = data.productId ? getProductName(data.productId) : { ar: 'منتج CairoVolt', en: 'CairoVolt Product' };
            return NextResponse.json({
                valid: true,
                alreadyActivated: true,
                productId: data.productId || 'universal',
                productName: productInfo.ar,
                productNameEn: productInfo.en,
                warrantyCode: data.warrantyCode,
                activatedAt: data.activatedAt?.toDate?.()?.toISOString() || data.activatedAt,
                warrantyExpiresAt: data.warrantyExpiresAt?.toDate?.()?.toISOString() || data.warrantyExpiresAt,
            });
        }

        // Activate the serial
        const warrantyCode = generateWarrantyCode();
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days

        await doc.ref.update({
            status: 'activated',
            activatedAt: FieldValue.serverTimestamp(),
            warrantyCode,
            warrantyExpiresAt: expiresAt,
            activatedUA: userAgent.substring(0, 200),
            activatedIP: ip,
        });

        const productInfo = data.productId ? getProductName(data.productId) : { ar: 'منتج CairoVolt', en: 'CairoVolt Product' };

        // Also log the scan event for analytics
        await db.collection('warranty_scans').add({
            serialCode: serial,
            productId: data.productId || 'universal',
            batchId: data.batchId,
            warrantyCode,
            userAgent: userAgent.substring(0, 200),
            ip,
            city: null,
            scannedAt: FieldValue.serverTimestamp(),
        });

        return NextResponse.json({
            valid: true,
            alreadyActivated: false,
            productId: data.productId || 'universal',
            productName: productInfo.ar,
            productNameEn: productInfo.en,
            warrantyCode,
            activatedAt: now.toISOString(),
            warrantyExpiresAt: expiresAt.toISOString(),
        });

    } catch (error) {
        console.error('[Verify API] Error:', error);
        return NextResponse.json(
            { valid: false, error: 'server_error', message: 'حدث خطأ. حاول مرة أخرى.' },
            { status: 500 }
        );
    }
}
