import { NextResponse } from 'next/server';

/**
 * Agentic Commerce Protocol (ACP) — /.well-known/acp.json
 * 
 * Spec: https://agenticcommerce.dev
 * RFC:  https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.discovery.md
 * 
 * Discovery document for AI agents to find CairoVolt's ACP
 * implementation, supported transports, and available services.
 */

export const revalidate = 86400; // 24h ISR

export function GET() {
    const baseUrl = 'https://cairovolt.com';

    const acp = {
        protocol: {
            name: 'acp',
            version: '1.0.0',
        },
        api_base_url: `${baseUrl}/api/v1`,
        provider: {
            name: 'CairoVolt',
            description: "Egypt's authorized Anker & Joyroom distributor — mobile accessories with official warranty.",
            url: baseUrl,
            contact: 'support@cairovolt.com',
        },
        transports: [
            'https',
            'json-rpc',
        ],
        capabilities: {
            services: [
                {
                    name: 'product_catalog',
                    description: 'Browse and search Anker & Joyroom products with real-time pricing and availability in EGP.',
                    endpoint: '/api/products',
                    methods: ['GET'],
                },
                {
                    name: 'checkout',
                    description: 'Place Cash on Delivery orders to all 27 Egyptian governorates. Free shipping above 500 EGP.',
                    endpoint: '/api/v1/checkout',
                    methods: ['POST'],
                },
                {
                    name: 'quick_order',
                    description: 'Simplified single-product COD order for agent-driven quick purchases.',
                    endpoint: '/api/v1/quick-cod',
                    methods: ['POST'],
                },
                {
                    name: 'product_verification',
                    description: 'Verify product authenticity using C2PA digital fingerprinting with 13-character serial numbers.',
                    endpoint: '/api/v1/verify-content',
                    methods: ['POST'],
                },
                {
                    name: 'lab_data',
                    description: 'Independent lab test results for products tested under Egyptian conditions (37-42°C ambient).',
                    endpoint: '/api/lab-data/json',
                    methods: ['GET'],
                },
            ],
            payments: {
                methods: ['cod'],
                currencies: ['EGP'],
            },
            shipping: {
                regions: ['EG'],
                governorates: 27,
                free_threshold: { amount: 500, currency: 'EGP' },
            },
            languages: ['ar', 'en'],
        },
        documentation: {
            openapi: `${baseUrl}/openapi.json`,
            llms: `${baseUrl}/.well-known/llms.txt`,
            mcp: `${baseUrl}/.well-known/mcp/server-card.json`,
            a2a: `${baseUrl}/.well-known/agent-card.json`,
        },
    };

    return NextResponse.json(acp, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}
