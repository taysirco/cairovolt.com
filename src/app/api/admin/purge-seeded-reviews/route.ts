/**
 * One-shot maintenance: purge synthetic seeded reviews from Firestore.
 *
 * The (deleted) /api/reviews/seed + seed-v2 endpoints injected synthetic
 * reviews fingerprinted by their generated order IDs (SEED-* / DOC-* /
 * ORD-{timestamp}-*). Read paths already exclude them; this removes them
 * permanently so the collection holds genuine reviews only.
 *
 * GET  ?key=…              Dry-run: counts per product + samples, deletes nothing.
 * POST ?key=… {execute:true}  Actually delete (batched, 400/batch).
 *
 * Requires ADMIN_TASKS_SECRET. Route is under /api/admin → blocked in
 * robots.txt and X-Robots-Tag noindex via middleware.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { isSeededReview } from '@/lib/verified-reviews';

function isAuthorized(req: NextRequest): boolean {
    const secret = process.env.ADMIN_TASKS_SECRET;
    if (!secret) return false;
    const header = req.headers.get('authorization') || '';
    const bearer = header.startsWith('Bearer ') ? header.slice(7) : '';
    const key = req.nextUrl.searchParams.get('key') || bearer;
    return key.length > 0 && key === secret;
}

interface SeededDocSummary {
    totalReviews: number;
    seededCount: number;
    genuineCount: number;
    perProduct: Record<string, number>;
    samples: Array<{ id: string; productSlug: string; customerName: string; orderId: string; rating: number }>;
    seededIds: string[];
}

async function scanSeeded(): Promise<SeededDocSummary> {
    const db = await getFirestore();
    const snapshot = await db.collection('reviews').get();

    const perProduct: Record<string, number> = {};
    const samples: SeededDocSummary['samples'] = [];
    const seededIds: string[] = [];
    let seededCount = 0;

    snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (isSeededReview(data as { orderId?: string; orderDocId?: string })) {
            seededCount++;
            seededIds.push(doc.id);
            const slug = data.productSlug || '(unknown)';
            perProduct[slug] = (perProduct[slug] || 0) + 1;
            if (samples.length < 10) {
                samples.push({
                    id: doc.id,
                    productSlug: slug,
                    customerName: data.customerName || '',
                    orderId: data.orderId || data.orderDocId || '',
                    rating: data.rating || 0,
                });
            }
        }
    });

    return {
        totalReviews: snapshot.size,
        seededCount,
        genuineCount: snapshot.size - seededCount,
        perProduct,
        samples,
        seededIds,
    };
}

// GET: dry-run report
export async function GET(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { seededIds, ...report } = await scanSeeded();
        void seededIds;
        return NextResponse.json({ dryRun: true, ...report });
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// POST {execute: true}: delete seeded docs in batches
export async function POST(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json().catch(() => ({}));
        if (body.execute !== true) {
            return NextResponse.json({
                error: 'Pass {"execute": true} to confirm deletion. Use GET for a dry-run first.',
            }, { status: 400 });
        }

        const db = await getFirestore();
        const { seededIds, seededCount, genuineCount, totalReviews } = await scanSeeded();

        let deleted = 0;
        for (let i = 0; i < seededIds.length; i += 400) {
            const batch = db.batch();
            seededIds.slice(i, i + 400).forEach(id => {
                batch.delete(db.collection('reviews').doc(id));
            });
            await batch.commit();
            deleted += Math.min(400, seededIds.length - i);
        }

        return NextResponse.json({
            executed: true,
            totalBefore: totalReviews,
            deleted,
            genuineRemaining: genuineCount,
        });
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
