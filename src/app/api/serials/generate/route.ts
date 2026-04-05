import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { generateSerial, generateBatchId, buildVerifyUrl } from '@/lib/serial-generator';

// Simple API key protection
const API_KEY = process.env.SERIALS_API_KEY || 'cv-serials-dev-key-2026';

export async function POST(request: NextRequest) {
    try {
        // API Key auth
        const apiKey = request.headers.get('x-api-key');
        if (apiKey !== API_KEY) {
            return NextResponse.json(
                { error: 'unauthorized', message: 'Invalid API key.' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { count = 10, batchSequence = 'A' } = body;

        // productId is OPTIONAL — serials are universal
        const productId = body.productId || null;

        if (count < 1 || count > 500) {
            return NextResponse.json(
                { error: 'invalid_count', message: 'count must be between 1 and 500.' },
                { status: 400 }
            );
        }

        const db = await getFirestore();
        const serialsRef = db.collection('warranty_serials');
        const batchId = generateBatchId(batchSequence);

        // Generate unique serials with collision detection
        const serials: string[] = [];
        const qrUrls: string[] = [];
        const batch = db.batch();
        let attempts = 0;
        const maxAttempts = count * 3;

        while (serials.length < count && attempts < maxAttempts) {
            attempts++;
            const code = generateSerial();

            // Check for collision
            const existing = await serialsRef.where('code', '==', code).limit(1).get();
            if (!existing.empty) continue;

            const docRef = serialsRef.doc();
            batch.set(docRef, {
                code,
                productId,      // null = universal, can be assigned later
                batchId,
                status: 'unused',
                createdAt: new Date(),
                activatedAt: null,
                warrantyCode: null,
                warrantyExpiresAt: null,
                activatedUA: null,
                activatedIP: null,
            });

            serials.push(code);
            qrUrls.push(buildVerifyUrl(code));
        }

        // Commit batch write
        await batch.commit();

        return NextResponse.json({
            success: true,
            batchId,
            productId,
            count: serials.length,
            serials,
            qrUrls,
        });

    } catch (error) {
        console.error('[Serials Generate] Error:', error);
        return NextResponse.json(
            { error: 'server_error', message: 'Failed to generate serials.' },
            { status: 500 }
        );
    }
}
