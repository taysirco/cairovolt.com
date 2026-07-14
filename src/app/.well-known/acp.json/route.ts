import { NextResponse } from 'next/server';

/**
 * Agentic Commerce Protocol (ACP) — /.well-known/acp.json
 * 
 * Spec: https://agenticcommerce.dev
 * RFC:  https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.discovery.md
 * 
 * DiscoveryResponse document per the ACP RFC conformance checklist:
 *  - protocol.name = "acp"
 *  - protocol.version = YYYY-MM-DD format
 *  - protocol.supported_versions = non-empty array, chronological
 *  - transports includes "rest"
 *  - capabilities.services = string[] (closed enum: checkout, orders, carts, delegate_payment)
 */

export const revalidate = 86400; // 24h ISR

export function GET() {
    const baseUrl = 'https://cairovolt.com';

    // Strict ACP DiscoveryResponse per RFC
    const discovery = {
        protocol: {
            name: 'acp',
            version: '2025-09-29',
            supported_versions: ['2025-09-29'],
            documentation_url: 'https://agenticcommerce.dev',
        },
        api_base_url: `${baseUrl}/api/v1`,
        transports: ['rest', 'mcp'],
        capabilities: {
            // services is a string[] of closed-enum values per RFC
            services: ['checkout', 'orders', 'carts'],
            extensions: [
                {
                    name: 'fulfillment',
                    spec: 'https://agenticcommerce.dev/specs/fulfillment',
                },
            ],
            supported_currencies: ['EGP'],
            supported_locales: ['ar-EG', 'en-US'],
        },
    };

    return NextResponse.json(discovery, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}
