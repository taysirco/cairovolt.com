import { NextResponse } from 'next/server';

/**
 * API Catalog — /.well-known/api-catalog
 * 
 * RFC 9727 — Well-Known URI for API Discovery
 * Format: application/linkset+json (RFC 9264)
 * 
 * Enables AI agents and automated tooling to discover all public
 * APIs offered by CairoVolt in a single standardized request.
 * 
 * Spec: https://www.rfc-editor.org/rfc/rfc9727
 */

export const revalidate = 86400; // 24h ISR

const BASE_URL = 'https://cairovolt.com';
const CATALOG_URL = `${BASE_URL}/.well-known/api-catalog`;
const CATALOG_LINK = `<${CATALOG_URL}>; rel="api-catalog"; type="application/linkset+json"`;

const responseHeaders = {
    'Content-Type': 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
    'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    'Access-Control-Allow-Origin': '*',
    Link: CATALOG_LINK,
};

export function GET() {
    const catalog = {
        linkset: [
            {
                anchor: CATALOG_URL,
                item: [
                    { href: `${BASE_URL}/api/v1/checkout` },
                    { href: `${BASE_URL}/api/v1/quick-cod` },
                    { href: `${BASE_URL}/api/products` },
                    { href: `${BASE_URL}/api/verify` },
                    { href: `${BASE_URL}/api/feed` },
                    { href: `${BASE_URL}/api/knowledge-graph` },
                    { href: `${BASE_URL}/api/llms/catalog` },
                    { href: `${BASE_URL}/api/lab-data/json` },
                    { href: `${BASE_URL}/api/lab-data/csv` },
                ],
                'service-desc': [
                    {
                        href: `${BASE_URL}/api/openapi.json`,
                        type: 'application/json',
                    },
                ],
                'service-doc': [
                    {
                        href: `${BASE_URL}/.well-known/llms.txt`,
                        type: 'text/plain',
                    },
                ],
            },
        ],
    };

    return NextResponse.json(catalog, {
        headers: responseHeaders,
    });
}

/** RFC 9727 requires the well-known resource's HEAD response to advertise it. */
export function HEAD() {
    return new NextResponse(null, { status: 200, headers: responseHeaders });
}
