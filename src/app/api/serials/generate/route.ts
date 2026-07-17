import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { generateSerial, generateBatchId, buildVerifyUrl } from '@/lib/serial-generator';
import { isAdminRequestAuthorized } from '@/lib/admin-session';

export async function POST(request: NextRequest) {
    try {
        if (!isAdminRequestAuthorized(request)) {
            return NextResponse.json(
                { error: 'unauthorized', message: 'Authentication required.' },
                { status: 401, headers: { 'Cache-Control': 'no-store' } }
            );
        }

        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { error: 'invalid_request', message: 'A JSON request body is required.' },
                { status: 400, headers: { 'Cache-Control': 'no-store' } },
            );
        }

        if (!body || typeof body !== 'object' || Array.isArray(body)) {
            return NextResponse.json(
                { error: 'invalid_request', message: 'The request body must be a JSON object.' },
                { status: 400, headers: { 'Cache-Control': 'no-store' } },
            );
        }

        const input = body as Record<string, unknown>;
        const count = input.count === undefined ? 10 : input.count;
        const batchSequence = input.batchSequence === undefined ? 'A' : input.batchSequence;

        // productId is OPTIONAL — serials are universal
        const productId = typeof input.productId === 'string' && input.productId.trim()
            ? input.productId.trim()
            : null;

        if (typeof count !== 'number' || !Number.isInteger(count) || count < 1 || count > 500) {
            return NextResponse.json(
                { error: 'invalid_count', message: 'count must be between 1 and 500.' },
                { status: 400, headers: { 'Cache-Control': 'no-store' } }
            );
        }

        if (typeof batchSequence !== 'string' || !/^[A-Za-z0-9-]{1,16}$/.test(batchSequence)) {
            return NextResponse.json(
                { error: 'invalid_batch_sequence', message: 'batchSequence must be 1-16 letters, numbers, or hyphens.' },
                { status: 400, headers: { 'Cache-Control': 'no-store' } },
            );
        }

        const requestedCount = count;

        const db = await getFirestore();
        const serialsRef = db.collection('warranty_serials');
        const batchId = generateBatchId(batchSequence.toUpperCase());

        // Generate unique serials with collision detection
        const serials: string[] = [];
        const qrUrls: string[] = [];
        const batch = db.batch();
        let attempts = 0;
        const maxAttempts = requestedCount * 3;

        while (serials.length < requestedCount && attempts < maxAttempts) {
            attempts++;
            const code = generateSerial();

            if (serials.includes(code)) continue;

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
        }, { headers: { 'Cache-Control': 'no-store' } });

    } catch (error) {
        console.error('[Serials Generate] Error:', error);
        return NextResponse.json(
            { error: 'server_error', message: 'Failed to generate serials.' },
            { status: 500, headers: { 'Cache-Control': 'no-store' } }
        );
    }
}
