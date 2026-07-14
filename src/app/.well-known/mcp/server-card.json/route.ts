import { NextResponse } from 'next/server';

/**
 * MCP Server Card — /.well-known/mcp/server-card.json
 * 
 * SEP-2127 — Model Context Protocol Server Discovery
 * Allows AI clients to discover MCP server capabilities
 * before establishing a connection.
 * 
 * Spec: https://modelcontextprotocol.io/specification/2025-03-26/basic/discovery
 */

export const revalidate = 86400; // 24h ISR

export function GET() {
    const serverCard = {
        $schema: 'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json',
        version: '1.0.0',
        protocolVersion: '2025-03-26',
        serverInfo: {
            name: 'CairoVolt Commerce',
            version: '1.0.0',
            description: 'Egypt\'s authorized Anker & Joyroom distributor. Browse products, check real-time availability, view lab test results, and place orders via Cash on Delivery. All products independently lab-tested under Egyptian conditions (37–42°C).',
        },
        transport: {
            type: 'streamable-http',
            url: 'https://cairovolt.com/api/v1/mcp',
        },
        capabilities: {
            tools: {
                available: [
                    {
                        name: 'search_products',
                        description: 'Search CairoVolt product catalog by name, brand, category, or use case. Returns availability, pricing in EGP, and lab test highlights.',
                    },
                    {
                        name: 'check_availability',
                        description: 'Check if a specific product is in stock by slug or SKU. Returns real-time price, stock count, shipping info, and a ready-to-use buy action.',
                    },
                    {
                        name: 'place_order',
                        description: 'Place a Cash on Delivery order. Requires customer name, phone, address, and city. Ships to all 27 Egyptian governorates.',
                    },
                    {
                        name: 'get_lab_results',
                        description: 'Retrieve CairoVolt Labs independent test results for a product. Includes temperature performance, battery efficiency, and power outage scenarios.',
                    },
                    {
                        name: 'verify_product',
                        description: 'Verify product authenticity using 13-character serial number via C2PA digital fingerprinting (ES384).',
                    },
                ],
            },
            resources: {
                available: [
                    {
                        name: 'product_catalog',
                        description: 'Full product catalog with prices, specifications, and lab test data in markdown format.',
                        uri: 'https://cairovolt.com/api/llms/catalog',
                    },
                    {
                        name: 'openapi_spec',
                        description: 'OpenAPI 3.1.0 specification for the CairoVolt M2M Commerce API.',
                        uri: 'https://cairovolt.com/api/openapi.json',
                    },
                    {
                        name: 'lab_data',
                        description: 'Schema.org Dataset with lab test results for all products.',
                        uri: 'https://cairovolt.com/api/lab-data/json',
                    },
                    {
                        name: 'entity_info',
                        description: 'Company overview, entity details, and AI instructions in llms.txt format.',
                        uri: 'https://cairovolt.com/.well-known/llms.txt',
                    },
                ],
            },
        },
        metadata: {
            logo: 'https://cairovolt.com/cairovolt_logo.png',
            contact: 'support@cairovolt.com',
            documentation: 'https://cairovolt.com/.well-known/llms.txt',
            privacyPolicy: 'https://cairovolt.com/en/privacy',
            termsOfService: 'https://cairovolt.com/en/terms',
        },
    };

    return NextResponse.json(serverCard, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
