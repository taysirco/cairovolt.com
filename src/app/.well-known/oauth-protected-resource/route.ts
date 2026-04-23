import { NextResponse } from 'next/server';

/**
 * OAuth Protected Resource Metadata — /.well-known/oauth-protected-resource
 * 
 * RFC 9728 — OAuth 2.0 Protected Resource Metadata
 * https://www.rfc-editor.org/rfc/rfc9728
 * 
 * Tells AI agents how to obtain access tokens for CairoVolt's
 * protected APIs by declaring the authorization server(s) and
 * supported scopes.
 */

export const revalidate = 86400; // 24h ISR

export function GET() {
    const baseUrl = 'https://cairovolt.com';

    const metadata = {
        // The resource identifier (this server)
        resource: baseUrl,

        // Authorization servers that can issue tokens for this resource
        authorization_servers: [baseUrl],

        // Scopes that this resource supports
        scopes_supported: [
            'catalog:read',           // Browse product catalog
            'orders:write',           // Place COD orders
            'verify:read',            // Verify product authenticity via serial
            'lab-data:read',          // Access lab test results
        ],

        // Bearer token type expected
        token_types_supported: ['bearer'],

        // How tokens are passed to the resource
        bearer_methods_supported: ['header'],

        // JWKS for verifying tokens (reuses C2PA key infrastructure)
        jwks_uri: `${baseUrl}/.well-known/jwks.json`,

        // Resource documentation
        resource_documentation: `${baseUrl}/.well-known/llms.txt`,

        // Signing algorithms accepted
        resource_signing_alg_values_supported: ['ES384'],
    };

    return NextResponse.json(metadata, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}
