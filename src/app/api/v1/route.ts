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
    }, {
        headers: {
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}
