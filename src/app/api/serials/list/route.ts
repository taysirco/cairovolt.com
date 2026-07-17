import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { isAdminRequestAuthorized } from '@/lib/admin-session';

export async function GET(request: NextRequest) {
    try {
        if (!isAdminRequestAuthorized(request)) {
            return NextResponse.json(
                { error: 'unauthorized' },
                { status: 401, headers: { 'Cache-Control': 'no-store' } }
            );
        }

        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');
        const status = searchParams.get('status') || 'unused';
        const parsedLimit = Number.parseInt(searchParams.get('limit') || '50', 10);
        const limit = Number.isFinite(parsedLimit) && parsedLimit > 0
            ? Math.min(parsedLimit, 200)
            : 50;

        if (status !== 'unused' && status !== 'activated') {
            return NextResponse.json(
                { error: 'invalid_status', message: 'status must be unused or activated.' },
                { status: 400, headers: { 'Cache-Control': 'no-store' } },
            );
        }

        const db = await getFirestore();
        let query = db.collection('warranty_serials')
            .where('status', '==', status)
            .orderBy('createdAt', 'desc')
            .limit(limit);

        if (productId) {
            query = db.collection('warranty_serials')
                .where('productId', '==', productId)
                .where('status', '==', status)
                .orderBy('createdAt', 'desc')
                .limit(limit);
        }

        const snapshot = await query.get();
        const serials = snapshot.docs.map(doc => {
            const d = doc.data();
            return {
                id: doc.id,
                code: d.code,
                productId: d.productId,
                batchId: d.batchId,
                status: d.status,
                createdAt: d.createdAt?.toDate?.()?.toISOString() || null,
            };
        });

        // Get counts per product
        const counts: Record<string, number> = {};
        serials.forEach(s => {
            counts[s.productId] = (counts[s.productId] || 0) + 1;
        });

        return NextResponse.json({
            total: serials.length,
            counts,
            serials,
        }, { headers: { 'Cache-Control': 'no-store' } });

    } catch (error) {
        console.error('[Serials List] Error:', error);
        return NextResponse.json(
            { error: 'server_error', message: 'Failed to list serials.' },
            { status: 500, headers: { 'Cache-Control': 'no-store' } }
        );
    }
}
