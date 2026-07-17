import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import {
    extractSerialVariable,
    generateWarrantyCode,
    getProductName,
    isValidSerialFormat,
    reconstructSerial,
} from '@/lib/serial-generator';
import { FieldValue } from 'firebase-admin/firestore';
import { getClientIp } from '@/lib/request-ip';
import { addCalendarMonths, getCairoVoltWarrantyPolicy } from '@/lib/warranty-policy';

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
        const ip = getClientIp(request.headers);

        if (!checkVerifyRateLimit(ip)) {
            return NextResponse.json(
                { valid: false, recordFound: false, error: 'rate_limited', message: 'محاولات كثيرة. حاول بعد ساعة.' },
                { status: 429 }
            );
        }

        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { valid: false, recordFound: false, error: 'invalid_request', message: 'بيانات الطلب غير صحيحة.' },
                { status: 400 },
            );
        }
        const serialValue = body && typeof body === 'object' && 'serial' in body
            ? (body as { serial?: unknown }).serial
            : undefined;
        const rawSerial = typeof serialValue === 'string' ? serialValue.trim() : '';
        
        // Normalize valid case variants to the canonical stored form without
        // accepting a different prefix or suffix.
        const normalizeSerial = (s: string): string => {
            if (!isValidSerialFormat(s)) return s;
            return reconstructSerial(extractSerialVariable(s));
        };
        const serial = normalizeSerial(rawSerial);

        // Validate format
        if (!serial || !isValidSerialFormat(serial)) {
            return NextResponse.json(
                { valid: false, recordFound: false, error: 'invalid_format', message: 'رقم السيريال غير صحيح.' },
                { status: 400 }
            );
        }

        const db = await getFirestore();
        const serialsRef = db.collection('warranty_serials');

        // Query by serial code
        const snapshot = await serialsRef.where('code', '==', serial).limit(1).get();

        if (snapshot.empty) {
            return NextResponse.json(
                { valid: false, recordFound: false, error: 'serial_not_found', message: 'رقم السيريال غير موجود في قاعدة البيانات.' },
                { status: 404 }
            );
        }

        const doc = snapshot.docs[0];
        const data = doc.data();

        // Already activated
        if (data.status === 'activated') {
            const productInfo = data.productId ? getProductName(data.productId) : { ar: 'منتج كايرو فولت', en: 'CairoVolt Product' };
            const warrantyPolicy = getCairoVoltWarrantyPolicy(data.productId);
            return NextResponse.json({
                valid: true,
                recordFound: true,
                recordIssuer: 'CairoVolt',
                verificationScope: 'Confirms a CairoVolt-issued serial and warranty record; does not certify manufacturer authenticity.',
                alreadyActivated: true,
                productId: data.productId || 'universal',
                productName: productInfo.ar,
                productNameEn: productInfo.en,
                warrantyCode: data.warrantyCode,
                activatedAt: data.activatedAt?.toDate?.()?.toISOString() || data.activatedAt,
                warrantyExpiresAt: data.warrantyExpiresAt?.toDate?.()?.toISOString() || data.warrantyExpiresAt,
                warrantyDurationMonths: data.warrantyDurationMonths
                    ?? (data.warrantyExpiresAt ? null : warrantyPolicy.months),
                warrantyTermsUrl: warrantyPolicy.policyUrl,
            });
        }

        // Activate the serial
        const warrantyCode = generateWarrantyCode();
        const now = new Date();
        const warrantyPolicy = getCairoVoltWarrantyPolicy(data.productId);
        const expiresAt = warrantyPolicy.months
            ? addCalendarMonths(now, warrantyPolicy.months)
            : null;

        await doc.ref.update({
            status: 'activated',
            activatedAt: FieldValue.serverTimestamp(),
            warrantyCode,
            warrantyExpiresAt: expiresAt,
            warrantyDurationMonths: warrantyPolicy.months,
            warrantyTermsUrl: warrantyPolicy.policyUrl,
        });

        const productInfo = data.productId ? getProductName(data.productId) : { ar: 'منتج كايرو فولت', en: 'CairoVolt Product' };

        // Also log the scan event for analytics
        await db.collection('warranty_scans').add({
            serialCode: serial,
            productId: data.productId || 'universal',
            batchId: data.batchId,
            warrantyCode,
            scannedAt: FieldValue.serverTimestamp(),
        });

        return NextResponse.json({
            valid: true,
            recordFound: true,
            recordIssuer: 'CairoVolt',
            verificationScope: 'Confirms a CairoVolt-issued serial and warranty record; does not certify manufacturer authenticity.',
            alreadyActivated: false,
            productId: data.productId || 'universal',
            productName: productInfo.ar,
            productNameEn: productInfo.en,
            warrantyCode,
            activatedAt: now.toISOString(),
            warrantyExpiresAt: expiresAt?.toISOString() || null,
            warrantyDurationMonths: warrantyPolicy.months,
            warrantyTermsUrl: warrantyPolicy.policyUrl,
        });

    } catch (error) {
        console.error('[Verify API] Error:', error);
        return NextResponse.json(
            { valid: false, recordFound: false, error: 'server_error', message: 'حدث خطأ. حاول مرة أخرى.' },
            { status: 500 }
        );
    }
}
