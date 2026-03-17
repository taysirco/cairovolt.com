import { NextResponse } from 'next/server';
import { buildJwks } from '@/lib/media-verification';

/**
 * JSON Web Key Set — /.well-known/jwks.json
 *
 * Exposes the public key (ES384 / P-384) used to sign Cairovolt
 * Content Credentials.  Any third party can fetch this endpoint
 * and independently verify that a credential was issued by us.
 *
 * Spec: RFC 7517  https://www.rfc-editor.org/rfc/rfc7517
 */

export async function GET() {
    try {
        const jwks = await buildJwks();
        return NextResponse.json(jwks, {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (err) {
        console.error('JWKS endpoint error:', err);
        return NextResponse.json(
            { error: 'JWKS unavailable — signing keys not configured' },
            { status: 503 },
        );
    }
}
