import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';

const API_KEY = process.env.SERIALS_API_KEY || 'cv-serials-dev-key-2026';

export async function GET(request: NextRequest) {
    try {
        const apiKey = request.headers.get('x-api-key');
        if (apiKey !== API_KEY) {
            return NextResponse.json(
                { error: 'unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');
        const status = searchParams.get('status') || 'unused';
        const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);

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
        });

    } catch (error) {
        console.error('[Serials List] Error:', error);
        return NextResponse.json(
            { error: 'server_error', message: 'Failed to list serials.' },
            { status: 500 }
        );
    }
}
