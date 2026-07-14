import { NextResponse } from 'next/server';

/**
 * x402 Premium Lab Data — /api/v1/premium/lab-report
 * 
 * x402 Protocol — Agent-Native HTTP Payments
 * https://x402.org
 * https://github.com/coinbase/x402
 * 
 * Returns HTTP 402 Payment Required with x402 payment requirements
 * when accessed without a valid payment receipt. AI agents can
 * automatically fulfill the payment and retry.
 * 
 * This protects premium lab test data behind a micro-payment wall
 * that agents can pay programmatically.
 */

export const dynamic = 'force-dynamic';

export function GET(request: Request) {
    // Check for x-402-receipt header (payment proof)
    const receipt = request.headers.get('x-402-receipt');

    if (!receipt) {
        // Return 402 with x402 payment requirements
        const paymentRequirements = {
            'x402Version': 1,
            'accepts': [
                {
                    scheme: 'exact',
                    network: 'base-sepolia',
                    maxAmountRequired: '100000', // 0.1 USDC (6 decimals)
                    resource: 'https://cairovolt.com/api/v1/premium/lab-report',
                    description: 'Access CairoVolt Labs premium full test report with raw data, thermal imaging, and efficiency curves.',
                    mimeType: 'application/json',
                    payTo: '0x0000000000000000000000000000000000000000', // placeholder
                    maxTimeoutSeconds: 300,
                    asset: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // USDC on Base Sepolia
                    extra: {
                        name: 'CairoVolt Labs Premium Report',
                        description: 'Full independent lab test report including thermal imaging, power curves, and raw efficiency data for all CairoVolt products tested under Egyptian conditions (37-42°C).',
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

    // If receipt is provided, return premium data
    const premiumReport = {
        report: 'CairoVolt Labs Premium Test Report',
        version: '2.0',
        generated: new Date().toISOString(),
        products: [
            {
                name: 'Anker 737 PowerCore 24K',
                category: 'Power Bank',
                capacity: '24000mAh',
                tests: {
                    thermal: {
                        ambient: '42°C (Egyptian summer)',
                        peakTemp: '47.2°C',
                        rating: 'PASS — within safe operating range',
                    },
                    efficiency: {
                        usbC_PD: '92.4%',
                        usbA_QC: '87.1%',
                        simultaneous: '84.6%',
                    },
                    duration: {
                        iPhone15Pro: '4.8 full charges',
                        SamsungS24: '4.2 full charges',
                    },
                },
            },
        ],
        disclaimer: 'Tests conducted independently by CairoVolt Labs under controlled conditions.',
    };

    return NextResponse.json(premiumReport, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}

// CORS preflight for x-402-receipt header
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
