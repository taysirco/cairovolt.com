import { NextResponse } from 'next/server';
import { buildJwks } from '@/lib/media-verification';

/**
 * Web Bot Auth — HTTP Message Signatures Directory
 * /.well-known/http-message-signatures-directory
 * 
 * IETF Draft: draft-meunier-http-message-signatures-directory
 * Format: JWKS (RFC 7517)
 * 
 * Publishes our signing keys so receiving sites can verify 
 * requests signed by CairoVolt's bots/agents. Reuses the same
 * JWKS from /.well-known/jwks.json (ES384 / P-384 C2PA keys).
 * 
 * This enables Web Bot Auth — portable identity for automated
 * agents using Ed25519/ECDSA keypairs and standardized JWKS directories.
 */

export const revalidate = 3600; // 1h ISR

export async function GET() {
    try {
        const jwks = await buildJwks();
        return NextResponse.json(jwks, {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch {
        // If signing keys aren't configured, return a valid empty JWKS
        // so the scan sees valid JSON instead of an HTML error page
        return NextResponse.json(
            { keys: [] },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, max-age=3600',
                    'Access-Control-Allow-Origin': '*',
                },
            },
        );
    }
}
