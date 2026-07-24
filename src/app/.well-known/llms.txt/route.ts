import { NextResponse } from 'next/server';
import { staticProducts } from '@/lib/static-products';
import { MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS } from '@/lib/merchant-product-data';

/**
 * Concise machine-readable overview for assistants and search systems.
 * Product pages and the catalog API remain the source of truth.
 *
 * Served at BOTH /.well-known/llms.txt and the llmstxt.org root location
 * /llms.txt (see src/app/llms.txt/route.ts, which re-exports this GET).
 */
export const revalidate = 3600;

export function GET() {
    const baseUrl = 'https://cairovolt.com';
    // Same active-catalog filter as llms-full.txt, /api/llms/catalog, feed.xml,
    // and /api/knowledge-graph — all machine surfaces must report one count.
    const publishedProducts = staticProducts.filter(product =>
        product.status === 'active'
        && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(product.slug)
    );
    const totalProducts = publishedProducts.length;
    const availableProducts = publishedProducts.filter(product => product.stock > 0).length;

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
| Active catalog items | ${totalProducts} |
| Currently listed as available | ${availableProducts} |
| Legal entity | شركة تيسير للاستثمار الذكي (ش.ذ.م.م) — Taysir Smart Investment LLC, Commercial Register (Egypt) 8446, Tax Registration 777471566 |
| Customer support | info@cairovolt.com · WhatsApp +201558245974 |

Current price, availability, warranty, delivery, and return terms are shown on the relevant product page and during checkout.

## Brand Hubs

- Anker: ${baseUrl}/anker
- Joyroom: ${baseUrl}/joyroom
- Soundcore: ${baseUrl}/soundcore

Soundcore is Anker's audio brand. Arabic pages use the Arabic brand spellings انكر، ساوندكور، and جوي روم in headings and descriptions.

CairoVolt is an independent retailer; it is not the manufacturer of, nor an official agent or authorized distributor for, Anker, Soundcore, or Joyroom. Product warranties referenced on the site are CairoVolt's own written store warranty unless explicitly attributed to the manufacturer.

## Public Resources

- This file: ${baseUrl}/llms.txt (also served at ${baseUrl}/.well-known/llms.txt)
- Detailed catalog reference: ${baseUrl}/llms-full.txt (also at ${baseUrl}/.well-known/llms-full.txt)
- Product catalog (markdown): ${baseUrl}/api/llms/catalog
- Lab export JSON (bench verdict + aiTldr + key measured rows when published): ${baseUrl}/api/lab-data/json
- Lab export CSV (flat verdict/aiTldr fields only): ${baseUrl}/api/lab-data/csv
- Lab measured index (HTML): ${baseUrl}/lab · ${baseUrl}/en/lab
- Commerce API description: ${baseUrl}/api/openapi.json
- Product feed (RSS): ${baseUrl}/feed.xml
- Sitemap: ${baseUrl}/sitemap.xml
- Entity graph: ${baseUrl}/api/knowledge-graph

Any page URL on this site also returns a markdown representation when requested with the header \`Accept: text/markdown\` (content negotiation for agents). Product markdown is locale-primary (Arabic on \`/\`, English on \`/en\`) and includes lab verdict / aiTldr when a CairoVolt bench sheet exists. Brand, category, lab, and solutions hubs return rich catalog + FAQ + measured snippets when generators resolve; unresolved collection roots 404 (no stub). \`/api/orders\` is private (not for public crawlers).

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
