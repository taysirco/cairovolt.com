import { NextResponse } from 'next/server';

/**
 * A2A Agent Card — /.well-known/agent-card.json
 * 
 * Google Agent-to-Agent (A2A) Protocol
 * https://github.com/google/A2A
 * 
 * Machine-readable "business card" for CairoVolt's commerce agent,
 * enabling other AI agents to discover capabilities, skills, and
 * communication endpoints.
 */

export const revalidate = 86400; // 24h ISR

export function GET() {
    const baseUrl = 'https://cairovolt.com';

    const agentCard = {
        // Agent identity
        name: 'CairoVolt Commerce Agent',
        description: "Egypt's authorized Anker & Joyroom distributor. Search products, check availability, view lab test results, verify authenticity, and place Cash on Delivery orders across all 27 Egyptian governorates.",
        version: '1.0.0',
        url: baseUrl,

        // Provider info
        provider: {
            organization: 'CairoVolt',
            url: baseUrl,
            contact: 'support@cairovolt.com',
        },

        // Capabilities
        capabilities: {
            streaming: false,
            pushNotifications: false,
            stateTransitionHistory: false,
        },

        // Skills this agent can perform
        skills: [
            {
                id: 'product-search',
                name: 'Product Search',
                description: 'Search CairoVolt catalog by name, brand, or category. Returns product names, prices in EGP, availability, and purchase links.',
                tags: ['commerce', 'search', 'products'],
                examples: [
                    'Find Anker power banks',
                    'What Joyroom earbuds are available?',
                    'Show me USB-C cables under 200 EGP',
                ],
            },
            {
                id: 'order-placement',
                name: 'Order Placement',
                description: 'Place Cash on Delivery orders. Requires customer name, phone, address, and city. Ships to all 27 Egyptian governorates. Free shipping above 500 EGP.',
                tags: ['commerce', 'orders', 'checkout'],
                examples: [
                    'Order an Anker 20000mAh power bank to Cairo',
                    'Place a COD order for Joyroom T03s earbuds',
                ],
            },
            {
                id: 'product-verification',
                name: 'Product Verification',
                description: 'Verify product authenticity using a 13-character serial number via C2PA digital fingerprinting (ES384 cryptographic signature).',
                tags: ['verification', 'authenticity', 'security'],
                examples: [
                    'Verify serial number CV-A1B2C3D4E5F',
                    'Is this Anker product genuine?',
                ],
            },
            {
                id: 'lab-results',
                name: 'Lab Test Results',
                description: "Retrieve CairoVolt Labs independent test results including temperature performance (37-42°C Egyptian conditions), battery efficiency, and power outage scenarios.",
                tags: ['testing', 'quality', 'lab-data'],
                examples: [
                    'Show lab results for Anker 737 power bank',
                    'How does this charger perform in Egyptian heat?',
                ],
            },
        ],

        // Supported input/output
        defaultInputModes: ['text/plain', 'application/json'],
        defaultOutputModes: ['text/plain', 'application/json'],

        // Authentication
        authentication: {
            schemes: ['bearer'],
            credentials: null, // Public APIs, no auth required currently
        },

        // Related endpoints
        endpoints: {
            api: `${baseUrl}/api/openapi.json`,
            mcp: `${baseUrl}/.well-known/mcp/server-card.json`,
            llms: `${baseUrl}/.well-known/llms.txt`,
            agentSkills: `${baseUrl}/.well-known/agent-skills/index.json`,
        },
    };

    return NextResponse.json(agentCard, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}
