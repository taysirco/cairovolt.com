import { NextResponse } from 'next/server';

/**
 * API v1 Index — /api/v1
 * 
 * x402 Protocol V2 Gateway
 * https://x402.org | https://docs.x402.org/core-concepts/http-402
 * 
 * Returns HTTP 402 Payment Required with:
 *   - JSON body: x402Version + accepts array
 *   - PAYMENT-REQUIRED header: Base64-encoded payment requirements (V2)
 * 
 * AI agents detect the 402 + PAYMENT-REQUIRED header, prepare a payment,
 * and retry with a PAYMENT-SIGNATURE header containing the payment proof.
 */

export const dynamic = 'force-dynamic';

export function GET(request: Request) {
    const paymentSignature = request.headers.get('payment-signature') || request.headers.get('x-402-receipt');

    if (!paymentSignature) {
        // x402 V2 payment requirements
        const paymentRequirements = {
            x402Version: 2,
            accepts: [
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

        // Base64-encode the payment requirements for the PAYMENT-REQUIRED header (x402 V2)
        const paymentRequiredHeader = Buffer.from(JSON.stringify(paymentRequirements)).toString('base64');

        return NextResponse.json(paymentRequirements, {
            status: 402,
            headers: {
                'Content-Type': 'application/json',
                'PAYMENT-REQUIRED': paymentRequiredHeader,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
                'Access-Control-Allow-Headers': 'PAYMENT-SIGNATURE, X-402-Receipt, Content-Type',
                'Access-Control-Expose-Headers': 'PAYMENT-REQUIRED, PAYMENT-RESPONSE',
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
            'Access-Control-Allow-Headers': 'PAYMENT-SIGNATURE, X-402-Receipt, Content-Type',
            'Access-Control-Expose-Headers': 'PAYMENT-REQUIRED, PAYMENT-RESPONSE',
            'Access-Control-Max-Age': '86400',
        },
    });
}

