import { NextResponse } from 'next/server';
import { staticProducts } from '@/lib/static-products';

/**
 * Concise machine-readable overview for assistants and search systems.
 * Product pages and the catalog API remain the source of truth.
 */
export const revalidate = 3600;

export function GET() {
    const baseUrl = 'https://cairovolt.com';
    const totalProducts = staticProducts.length;
    const availableProducts = staticProducts.filter(product => product.stock > 0).length;

    const content = `# CairoVolt — كايرو فولت

> Egyptian online store for mobile power, charging, audio, and related accessories.

## Store

| Field | Value |
|---|---|
| Website | ${baseUrl} |
| Country | Egypt |
| Languages | Arabic, English |
| Currency | EGP |
| Brands in catalog | Anker, Joyroom, Soundcore |
| Catalog items | ${totalProducts} |
| Currently listed as available | ${availableProducts} |
| Customer support | support@cairovolt.com · WhatsApp +201558245974 |

Current price, availability, warranty, delivery, and return terms are shown on the relevant product page and during checkout.

## Brand Hubs

- Anker: ${baseUrl}/anker
- Joyroom: ${baseUrl}/joyroom
- Soundcore: ${baseUrl}/soundcore

Soundcore is Anker's audio brand. Arabic pages use the Arabic brand spellings انكر and ساوندكور in headings and descriptions.

## Public Resources

- Product catalog: ${baseUrl}/api/llms/catalog
- Detailed catalog reference: ${baseUrl}/.well-known/llms-full.txt
- Commerce API description: ${baseUrl}/api/openapi.json
- Product feed: ${baseUrl}/api/feed
- Entity graph: ${baseUrl}/api/knowledge-graph

## CairoVolt Warranty Serial Check

A customer with a CairoVolt warranty card can check its 13-character serial at ${baseUrl}/verify or by sending:

\`\`\`http
POST ${baseUrl}/api/verify
Content-Type: application/json

{"serial":"CV-1ABCDEm313"}
\`\`\`

The check confirms that the serial was issued by CairoVolt and activates or displays its CairoVolt warranty record. It does not certify manufacturer authenticity and must not be described as independent proof that a third-party product is genuine.

## Commerce API

Use the published API description before sending requests: ${baseUrl}/api/openapi.json

- Browse or filter catalog items: GET ${baseUrl}/api/products
- Check a product by slug or query: GET ${baseUrl}/api/v1/checkout
- Submit a Cash on Delivery order: POST ${baseUrl}/api/v1/checkout

Customer information should be sent only when the customer has explicitly asked to place an order.
`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
