import { NextResponse } from 'next/server';

/**
 * API v1 Index — /api/v1
 * 
 * x402 Protocol Gateway
 * https://x402.org | https://github.com/coinbase/x402
 * 
 * Returns HTTP 402 Payment Required with x402 payment requirements.
 * This is the entry point that AI agents probe to discover if the
 * site supports agent-native HTTP payments.
 * 
 * When accessed without a valid x-402-receipt header, returns payment
 * requirements. Agents can fulfill the payment and retry with a receipt.
 */

export const dynamic = 'force-dynamic';

export function GET(request: Request) {
    const receipt = request.headers.get('x-402-receipt');

    if (!receipt) {
        // x402 payment requirements
        const paymentRequirements = {
            'x402Version': 1,
            'accepts': [
                {
                    scheme: 'exact',
                    network: 'base-sepolia',
                    maxAmountRequired: '100000', // 0.1 USDC (6 decimals)
                    resource: 'https://cairovolt.com/api/v1',
                    description: 'Access CairoVolt premium API tier with full product data, lab reports, and bulk order capabilities.',
                    mimeType: 'application/json',
                    payTo: '0x0000000000000000000000000000000000000000',
                    maxTimeoutSeconds: 300,
                    asset: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // USDC on Base Sepolia
                    extra: {
                        name: 'CairoVolt Premium API Access',
                        description: 'Unlock premium API features including bulk pricing, extended lab data, and priority order processing.',
                    },
                },
            ],
        };

        return NextResponse.json(paymentRequirements, {
            status: 402,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
                'Access-Control-Allow-Headers': 'X-402-Receipt, Content-Type',
                'Access-Control-Expose-Headers': 'X-402-Receipt',
                'X-Content-Type-Options': 'nosniff',
            },
        });
    }

    // Paid access — return API index
    return NextResponse.json({
        api: 'CairoVolt M2M Commerce API',
        version: '1.0',
        paid: true,
        endpoints: {
            checkout: '/api/v1/checkout',
            quickCod: '/api/v1/quick-cod',
            verify: '/api/v1/verify-content',
            premiumLab: '/api/v1/premium/lab-report',
        },
        docs: 'https://cairovolt.com/openapi.json',
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

export function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'Access-Control-Allow-Headers': 'X-402-Receipt, Content-Type',
            'Access-Control-Max-Age': '86400',
        },
    });
}
