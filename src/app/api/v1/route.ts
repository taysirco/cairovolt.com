import { NextResponse } from 'next/server';

/**
 * Public API index.
 *
 * Only implemented, production-ready endpoints are advertised here. Paid API
 * access is intentionally omitted until a verified payment processor is
 * configured.
 */
export function GET() {
    return NextResponse.json({
        name: 'CairoVolt API',
        version: '1.0',
        documentation: 'https://cairovolt.com/api/openapi.json',
        endpoints: {
            catalog: '/api/products',
            checkout: '/api/v1/checkout',
            quickOrder: '/api/v1/quick-cod',
            warrantySerialCheck: '/api/verify',
        },
        // checkout and quickOrder answer GET only when given a lookup parameter;
        // a bare GET is a 400 carrying usage. robots.txt Allows both paths, so a
        // crawler following the list above would otherwise collect 4xx responses
        // for endpoints that work fine. These are the same endpoints with a
        // parameter that resolves.
        examples: {
            checkout: '/api/v1/checkout?slug=anker-737-powerbank',
            quickOrder: '/api/v1/quick-cod?sku=AP02',
        },
    }, {
        headers: {
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}
