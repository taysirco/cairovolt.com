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

export function GET() {
    const baseUrl = 'https://cairovolt.com';

    const catalog = {
        linkset: [
            {
                anchor: `${baseUrl}/api/v1/checkout`,
                'service-desc': [
                    {
                        href: `${baseUrl}/api/openapi.json`,
                        type: 'application/json',
                    },
                ],
                'service-doc': [
                    {
                        href: `${baseUrl}/.well-known/llms.txt`,
                        type: 'text/plain',
                    },
                ],
            },
            {
                anchor: `${baseUrl}/api/products`,
                'service-desc': [
                    {
                        href: `${baseUrl}/api/openapi.json`,
                        type: 'application/json',
                    },
                ],
                'service-doc': [
                    {
                        href: `${baseUrl}/.well-known/llms.txt`,
                        type: 'text/plain',
                    },
                ],
            },
            {
                anchor: `${baseUrl}/api/feed`,
                'service-desc': [
                    {
                        href: `${baseUrl}/api/openapi.json`,
                        type: 'application/json',
                    },
                ],
                'service-doc': [
                    {
                        href: `${baseUrl}/.well-known/llms.txt`,
                        type: 'text/plain',
                    },
                ],
            },
            {
                anchor: `${baseUrl}/api/knowledge-graph`,
                'service-desc': [
                    {
                        href: `${baseUrl}/api/openapi.json`,
                        type: 'application/json',
                    },
                ],
            },
            {
                anchor: `${baseUrl}/api/lab-data/json`,
                'service-desc': [
                    {
                        href: `${baseUrl}/api/openapi.json`,
                        type: 'application/json',
                    },
                ],
            },
            {
                anchor: `${baseUrl}/api/llms/catalog`,
                'service-doc': [
                    {
                        href: `${baseUrl}/.well-known/llms.txt`,
                        type: 'text/plain',
                    },
                ],
            },
        ],
    };

    return NextResponse.json(catalog, {
        headers: {
            'Content-Type': 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
