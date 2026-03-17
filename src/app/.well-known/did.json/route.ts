import { NextResponse } from 'next/server';
import { buildDidDocument } from '@/lib/media-verification';

/**
 * DID Document — /.well-known/did.json
 *
 * Implements did:web:cairovolt.com per W3C DID Core spec.
 * Required for Content Credentials / C2PA signer identity resolution.
 *
 * Verifiers fetch this URL to retrieve the public key that was used
 * to sign product content credentials.
 *
 * Spec: https://w3c-ccg.github.io/did-method-web/
 */

export async function GET() {
    try {
        const doc = await buildDidDocument();
        return NextResponse.json(doc, {
            headers: {
                'Content-Type': 'application/did+json',
                'Cache-Control': 'public, max-age=3600',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (err) {
        console.error('DID document error:', err);
        return NextResponse.json(
            { error: 'DID document unavailable — signing keys not configured' },
            { status: 503 },
        );
    }
}
