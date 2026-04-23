import { NextResponse } from 'next/server';

/**
 * Root OpenAPI with MPP Payment Discovery — /openapi.json
 * 
 * Machine Payment Protocol (MPP)
 * https://mpp.dev
 * https://paymentauth.org/draft-payment-discovery-00.txt
 * 
 * Extends the OpenAPI 3.1 specification with x-payment-info on
 * payable operations so AI agents can discover payment endpoints
 * and initiate transactions programmatically.
 */

export const revalidate = 86400; // 24h ISR

export function GET() {
    const baseUrl = 'https://cairovolt.com';

    const spec = {
        openapi: '3.1.0',
        info: {
            title: 'CairoVolt M2M Commerce API',
            description:
                "Machine-to-Machine API for AI agents to browse products, check prices/availability, and place Cash on Delivery orders on CairoVolt — Egypt's authorized Anker & Joyroom distributor.",
            version: '1.0.0',
            contact: {
                name: 'CairoVolt Support',
                email: 'support@cairovolt.com',
                url: `${baseUrl}/en/contact`,
            },
            'x-logo': {
                url: `${baseUrl}/cairovolt_logo.png`,
            },
        },
        // MPP: Top-level service info for payment categorization
        'x-service-info': {
            name: 'CairoVolt Commerce',
            categories: ['e-commerce', 'electronics', 'mobile-accessories'],
            region: 'EG',
            currency: 'EGP',
        },
        servers: [{ url: baseUrl, description: 'Production' }],
        paths: {
            '/api/v1/checkout': {
                post: {
                    operationId: 'placeOrder',
                    summary: 'Place a Cash on Delivery order',
                    description:
                        'Submit a COD order. Requires customer name, phone, address, city, and product selections. Ships to all 27 Egyptian governorates. Free shipping above 500 EGP.',
                    // MPP: Payment discovery metadata
                    'x-payment-info': {
                        intent: 'charge',
                        method: 'card',
                        amount: { min: 149, max: 15000 },
                        currency: 'EGP',
                        description: 'Cash on Delivery order for mobile accessories',
                    },
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['name', 'phone', 'address', 'city', 'items'],
                                    properties: {
                                        name: { type: 'string', description: 'Customer full name' },
                                        phone: { type: 'string', description: 'Egyptian phone number' },
                                        address: { type: 'string', description: 'Full delivery address' },
                                        city: { type: 'string', description: 'City/Governorate name' },
                                        items: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    slug: { type: 'string' },
                                                    quantity: { type: 'integer', minimum: 1 },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'Order placed successfully' },
                        '400': { description: 'Invalid input' },
                    },
                },
            },
            '/api/v1/quick-cod': {
                post: {
                    operationId: 'quickCodOrder',
                    summary: 'Quick single-product COD order',
                    description:
                        'Simplified one-click Cash on Delivery order for a single product. Ideal for agent-driven quick purchases.',
                    'x-payment-info': {
                        intent: 'charge',
                        method: 'card',
                        amount: { min: 149, max: 5000 },
                        currency: 'EGP',
                        description: 'Quick COD order for a single product',
                    },
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['name', 'phone', 'address', 'city', 'productSlug'],
                                    properties: {
                                        name: { type: 'string' },
                                        phone: { type: 'string' },
                                        address: { type: 'string' },
                                        city: { type: 'string' },
                                        productSlug: { type: 'string' },
                                        quantity: { type: 'integer', minimum: 1, default: 1 },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'Quick order placed successfully' },
                    },
                },
            },
            '/api/products': {
                get: {
                    operationId: 'listProducts',
                    summary: 'List all products',
                    description: 'Returns the full CairoVolt product catalog with prices, availability, and specifications.',
                    parameters: [
                        { name: 'brand', in: 'query', schema: { type: 'string', enum: ['anker', 'joyroom'] } },
                        { name: 'category', in: 'query', schema: { type: 'string' } },
                    ],
                    responses: {
                        '200': { description: 'Product list' },
                    },
                },
            },
            '/api/v1/verify-content': {
                post: {
                    operationId: 'verifyProduct',
                    summary: 'Verify product authenticity',
                    description: 'Verify a product serial number using C2PA digital fingerprinting (ES384).',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['serial'],
                                    properties: {
                                        serial: { type: 'string', description: '13-character serial (CV-XXXXXXXXXXX)' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'Verification result' },
                    },
                },
            },
        },
    };

    return NextResponse.json(spec, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}
