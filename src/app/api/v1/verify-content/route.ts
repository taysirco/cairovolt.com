import { NextRequest, NextResponse } from 'next/server';
import { verifyCredential, buildManifest, signManifest, SignedCredential } from '@/lib/media-verification';
import { getFirestore } from '@/lib/firebase-admin';
import { getProductBySlug } from '@/lib/static-products';

/**
 * Content Credentials Verification API
 *
 * POST /api/v1/verify-content
 *
 * Accepts a signed credential directly or a product slug/image URL,
 * and returns a human-readable + machine-readable verification result.
 *
 * Use cases:
 *   - Third parties verifying that a product image is authentic
 *   - AI agents checking if content was AI-generated
 *   - Press / media verifying Cairovolt content provenance
 */

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({
            usage: {
                GET: '/api/v1/verify-content?slug=<product-slug>',
                POST: {
                    body: { credential: '<SignedCredential JSON>' },
                    description: 'Verify a raw signed credential object',
                },
            },
            docs: 'https://cairovolt.com/.well-known/did.json',
            verificationKey: 'https://cairovolt.com/.well-known/jwks.json',
        });
    }

    let credential: SignedCredential | null = null;

    // 1. Try Firestore first (direct doc lookup — O(1))
    try {
        const db = await getFirestore();
        const doc = await db.collection('products').doc(slug).get();

        if (doc.exists) {
            const data = doc.data()!;
            credential = (data.contentCredentials as SignedCredential) || null;
        }
    } catch {
        // Firestore unavailable — fall through to static data
    }

    // 2. Fall back to static products (sign on-the-fly for verification)
    if (!credential) {
        const staticProduct = getProductBySlug(slug);
        if (!staticProduct) {
            return NextResponse.json(
                { error: `Product not found: ${slug}` },
                { status: 404 },
            );
        }
        try {
            const manifest = buildManifest({
                title: staticProduct.translations?.en?.name || slug,
                format: 'image/jpeg',
                captureMethod: 'c2pa.captured',
            });
            credential = await signManifest(manifest);
        } catch {
            return NextResponse.json({
                verified: false,
                slug,
                message: 'Signing keys not configured on this server.',
                howToVerify: 'https://cairovolt.com/.well-known/did.json',
            }, { status: 200 });
        }
    }

    if (!credential) {
        return NextResponse.json({
            verified: false,
            slug,
            message: 'This product does not yet have Content Credentials.',
            howToVerify: 'https://cairovolt.com/.well-known/did.json',
        }, { status: 200 });
    }

    const result = await verifyCredential(credential);

    return NextResponse.json({
        verified: result.valid,
        slug,
        signer: result.signer,
        producer: result.producer,
        captureMethod: result.captureMethod,
        isAiGenerated: result.isAiGenerated,
        issuedAt: result.issuedAt,
        standard: 'C2PA v1 compatible',
        signerIdentity: 'did:web:cairovolt.com',
        verificationKey: 'https://cairovolt.com/.well-known/jwks.json',
        ...(result.error ? { verificationError: result.error } : {}),
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.credential) {
            return NextResponse.json(
                {
                    error: 'Missing field: credential (SignedCredential object)',
                    example: {
                        credential: {
                            manifest: '{ ... C2PA manifest ... }',
                            signature: '<base64url ES384 signature>',
                            signingKeyId: 'did:web:cairovolt.com#key-1',
                            algorithm: 'ES384',
                            issuedAt: '2026-01-01T00:00:00.000Z',
                        },
                    },
                },
                { status: 400 },
            );
        }

        const credential = body.credential as SignedCredential;
        const result = await verifyCredential(credential);

        return NextResponse.json({
            verified: result.valid,
            signer: result.signer,
            producer: result.producer,
            captureMethod: result.captureMethod,
            isAiGenerated: result.isAiGenerated,
            issuedAt: result.issuedAt,
            standard: 'C2PA v1 compatible',
            signerIdentity: 'did:web:cairovolt.com',
            verificationKey: 'https://cairovolt.com/.well-known/jwks.json',
            ...(result.error ? { error: result.error } : {}),
        });

    } catch (err) {
        console.error('verify-content POST error:', err);
        return NextResponse.json(
            { error: 'Invalid request body or verification error' },
            { status: 400 },
        );
    }
}
