import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { validateApiKey } from '@/lib/api-auth';
import { buildManifest, signManifest } from '@/lib/content-credentials';

/**
 * Admin: Batch sign Content Credentials for all Firestore products
 *
 * POST /api/admin/sign-content
 * Requires X-API-Key header (same key as write operations)
 *
 * Body (optional):
 *   { slug: string }   → sign only one product
 *   { force: true }    → re-sign already-signed products
 *
 * This endpoint is the server-side equivalent of the batch script,
 * useful when local Firebase credentials are not available.
 */

export async function POST(req: NextRequest) {
    const authError = validateApiKey(req);
    if (authError) return authError;

    // Verify signing keys are configured
    if (!process.env.CAIROVOLT_PRIVATE_KEY || !process.env.CAIROVOLT_PUBLIC_KEY) {
        return NextResponse.json({
            error: 'Signing keys not configured. Set CAIROVOLT_PRIVATE_KEY and CAIROVOLT_PUBLIC_KEY.',
            setup: 'Run: node scripts/generate-signing-keys.mjs',
        }, { status: 503 });
    }

    let body: { slug?: string; force?: boolean } = {};
    try {
        body = await req.json().catch(() => ({}));
    } catch { /* empty body is fine */ }

    const { slug: slugFilter, force = false } = body;

    try {
        const db = await getFirestore();
        let query = db.collection('products') as FirebaseFirestore.Query;
        if (slugFilter) query = query.where('slug', '==', slugFilter);

        const snapshot = await query.get();

        let signed = 0;
        let skipped = 0;
        const errors: string[] = [];

        const batch = db.batch();
        let batchOps = 0;

        for (const doc of snapshot.docs) {
            const data = doc.data();

            if (data.contentCredentials && !force) {
                skipped++;
                continue;
            }

            try {
                const translations = data.translations as Record<string, Record<string, string>> | undefined;
                const title = translations?.en?.name || (data.slug as string) || doc.id;

                const manifest = buildManifest({
                    title,
                    format: 'image/jpeg',
                    captureMethod: 'c2pa.captured',
                });
                const credential = await signManifest(manifest);

                batch.update(doc.ref, { contentCredentials: credential });
                batchOps++;
                signed++;

                // Firestore batch limit is 500
                if (batchOps === 490) {
                    await batch.commit();
                    batchOps = 0;
                }
            } catch (err) {
                errors.push(`${data.slug || doc.id}: ${err instanceof Error ? err.message : 'unknown error'}`);
            }
        }

        if (batchOps > 0) {
            await batch.commit();
        }

        return NextResponse.json({
            success: true,
            total: snapshot.size,
            signed,
            skipped,
            errors: errors.length > 0 ? errors : undefined,
            message: `Signed ${signed} products. Skipped ${skipped} (already signed). Use force:true to re-sign.`,
            verifyAt: 'https://cairovolt.com/api/v1/verify-content?slug=<product-slug>',
        });

    } catch (err) {
        console.error('sign-content batch error:', err);
        return NextResponse.json({
            error: 'Batch signing failed',
            details: err instanceof Error ? err.message : 'Unknown error',
        }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const authError = validateApiKey(req);
    if (authError) return authError;

    const keysConfigured = !!(process.env.CAIROVOLT_PRIVATE_KEY && process.env.CAIROVOLT_PUBLIC_KEY);

    try {
        const db = await getFirestore();
        const [total, signed] = await Promise.all([
            db.collection('products').count().get(),
            db.collection('products').where('contentCredentials', '!=', null).count().get(),
        ]);

        return NextResponse.json({
            keysConfigured,
            products: {
                total: total.data().count,
                signed: signed.data().count,
                unsigned: total.data().count - signed.data().count,
            },
            actions: {
                signAll: { method: 'POST', url: '/api/admin/sign-content', body: {} },
                signOne: { method: 'POST', url: '/api/admin/sign-content', body: { slug: '<product-slug>' } },
                resignAll: { method: 'POST', url: '/api/admin/sign-content', body: { force: true } },
            },
        });
    } catch (err) {
        return NextResponse.json({
            keysConfigured,
            error: 'Could not fetch product counts',
            details: err instanceof Error ? err.message : 'Unknown error',
        }, { status: 503 });
    }
}
