import { NextResponse } from 'next/server';

/**
 * Universal Commerce Protocol (UCP) — /.well-known/ucp
 * 
 * Spec: https://ucp.dev/specification/overview/
 * 
 * Enables AI agents to discover CairoVolt's commerce capabilities,
 * payment methods, and service endpoints via a standardized
 * discovery document.
 */

export const revalidate = 86400; // 24h ISR

export function GET() {
    const baseUrl = 'https://cairovolt.com';

    const profile = {
        ucp: {
            version: '1.0',
            spec_url: 'https://ucp.dev/specification/overview/',
            provider: {
                name: 'CairoVolt',
                description: "Egypt's authorized Anker & Joyroom distributor. Mobile accessories, power banks, chargers, and audio products with official warranty.",
                url: baseUrl,
                logo: `${baseUrl}/cairovolt_logo.png`,
                contact: 'support@cairovolt.com',
            },
            services: [
                {
                    type: 'product_catalog',
                    name: 'Product Catalog',
                    description: 'Browse Anker and Joyroom products with prices, specifications, and availability.',
                    endpoint: `${baseUrl}/api/products`,
                },
                {
                    type: 'checkout',
                    name: 'Cash on Delivery Orders',
                    description: 'Place COD orders shipped to all 27 Egyptian governorates. Free shipping above 500 EGP.',
                    endpoint: `${baseUrl}/api/v1/checkout`,
                },
                {
                    type: 'verification',
                    name: 'Product Authenticity Verification',
                    description: 'Verify product serial numbers using C2PA digital fingerprinting (ES384).',
                    endpoint: `${baseUrl}/api/v1/verify-content`,
                },
                {
                    type: 'lab_data',
                    name: 'Lab Test Results',
                    description: 'Independent lab test data for products under Egyptian conditions (37-42°C).',
                    endpoint: `${baseUrl}/api/lab-data/json`,
                },
            ],
            capabilities: {
                payments: ['cod'],
                currencies: ['EGP'],
                shipping: {
                    regions: ['EG'],
                    methods: ['standard', 'express'],
                    free_above: { amount: 500, currency: 'EGP' },
                },
                languages: ['ar', 'en'],
                authentication: ['bearer', 'none'],
            },
            endpoints: {
                catalog: `${baseUrl}/api/products`,
                checkout: `${baseUrl}/api/v1/checkout`,
                verify: `${baseUrl}/api/v1/verify-content`,
                openapi: `${baseUrl}/openapi.json`,
                mcp: `${baseUrl}/.well-known/mcp/server-card.json`,
                a2a: `${baseUrl}/.well-known/agent-card.json`,
            },
        },
    };

    return NextResponse.json(profile, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}
