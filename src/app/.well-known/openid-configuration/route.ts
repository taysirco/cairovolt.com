import { NextResponse } from 'next/server';

/**
 * OpenID Connect Discovery — /.well-known/openid-configuration
 * 
 * Spec: OpenID Connect Discovery 1.0
 *       https://openid.net/specs/openid-connect-discovery-1_0.html
 * Also: RFC 8414 — OAuth 2.0 Authorization Server Metadata
 *       https://www.rfc-editor.org/rfc/rfc8414
 * 
 * Enables AI agents to programmatically discover how to authenticate
 * with CairoVolt's protected APIs. Uses the existing C2PA JWKS for
 * token verification.
 */

export const revalidate = 86400; // 24h ISR

export function GET() {
    const baseUrl = 'https://cairovolt.com';

    const config = {
        // Required: The issuer identifier (must match tokens' `iss` claim)
        issuer: baseUrl,

        // Authorization endpoint — agents initiate auth here
        authorization_endpoint: `${baseUrl}/api/v1/oauth/authorize`,

        // Token endpoint — agents exchange grants for access tokens
        token_endpoint: `${baseUrl}/api/v1/oauth/token`,

        // JWKS endpoint — public keys for token verification (reuses C2PA keys)
        jwks_uri: `${baseUrl}/.well-known/jwks.json`,

        // Token introspection endpoint (RFC 7662)
        introspection_endpoint: `${baseUrl}/api/v1/oauth/introspect`,

        // Supported grant types
        grant_types_supported: [
            'client_credentials',     // Machine-to-machine (primary for agents)
            'authorization_code',     // User-delegated access
        ],

        // Supported response types
        response_types_supported: ['code'],

        // Supported scopes
        scopes_supported: [
            'openid',
            'catalog:read',           // Read product catalog
            'orders:write',           // Place orders via API
            'verify:read',            // Verify product authenticity
            'lab-data:read',          // Access lab test results
        ],

        // Token endpoint auth methods
        token_endpoint_auth_methods_supported: [
            'client_secret_post',
            'client_secret_basic',
        ],

        // Signing algorithms for ID tokens
        id_token_signing_alg_values_supported: ['ES384'],

        // Subject types
        subject_types_supported: ['public'],

        // Claims supported in ID tokens
        claims_supported: [
            'iss',
            'sub',
            'aud',
            'exp',
            'iat',
            'scope',
        ],

        // Service documentation
        service_documentation: `${baseUrl}/.well-known/llms.txt`,

        // Code challenge methods (PKCE)
        code_challenge_methods_supported: ['S256'],
    };

    return NextResponse.json(config, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}
