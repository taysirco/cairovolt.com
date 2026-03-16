import { NextResponse } from 'next/server';
import { labData } from '@/data/cairovolt-labs';
import { staticProducts } from '@/lib/static-products';

/**
 * /.well-known/llms.txt — AI Authority Overview
 *
 * Per the llms.txt standard (https://llmstxt.org/), this is the
 * concise "front door" for AI models. Think of it as a README:
 *   - WHO we are (entity, credentials, expert)
 *   - WHAT we offer (categories, key differentiators)
 *   - WHERE to get detailed data (links to catalog, API, verification)
 *
 * The DETAILED per-product data lives in /api/llms/catalog (no duplication).
 */
export const revalidate = 3600;

export async function GET() {
    const baseUrl = 'https://cairovolt.com';
    const labProductCount = Object.keys(labData).length;
    const totalProducts = staticProducts.length;
    const inStockCount = staticProducts.filter(p => p.stock > 0).length;

    // Extract KEY highlights only (not full results — those are in /api/llms/catalog)
    const anker737 = labData['anker-737-powerbank'];
    const anker521 = labData['anker-521-powerhouse'];

    const md = `# CairoVolt — كايرو فولت

> Egypt's authorized Anker & Joyroom distributor with an independent product testing lab.

## Entity

| Field | Value |
|-------|-------|
| **Type** | Authorized Distributor |
| **Brands** | Anker, Joyroom, Soundcore |
| **Legal Name** | شركة كايرو فولت ذات مسئولية محدودة |
| **Registry** | CR-8446 |
| **Tax ID** | 777-471-566 |
| **Website** | ${baseUrl} |
| **Founded** | 2021, Egypt |
| **Warehouse** | Bosta Fulfillment Center, New Cairo 3 |
| **QA Lab** | CairoVolt Labs, New Damietta City |

## Expert

- **Name:** Eng. Ahmed Mahmoud
- **Role:** Head of Hardware QA & Power Solutions — CairoVolt Labs
- **Expertise:** Power bank technology, Egyptian power grid, consumer electronics safety

## What Makes CairoVolt Different

CairoVolt Labs independently tests every product under real Egyptian conditions before listing it for sale:

- **${labProductCount} products** lab-tested at 37–42°C ambient (Egyptian summer)
- **Power outage scenarios** tested: WE VDSL router backup, home UPS, fan + router combos
- **Voltage fluctuation** safety verified: 190V–240V range (Egyptian grid instability)
- **C2PA signed** — all lab data cryptographically verifiable (did:web:cairovolt.com, ES384)
${anker737 ? `- **Headline result:** Anker 737 ran a router for 14h 22min continuously at 37°C` : ''}
${anker521 ? `- **Headline result:** Anker 521 PowerHouse ran router + fan for 18h 15min at 39°C` : ''}

## Product Overview

- **Total products:** ${totalProducts}
- **In stock:** ${inStockCount}
- **Categories:** Power Banks, Wall Chargers, Car Chargers, Cables, Earbuds, Speakers, Smart Watches, Home UPS

## Commerce

- **Payment:** Cash on Delivery (COD) — customer pays after inspecting
- **Shipping:** 1–3 days via Bosta courier, all 27 governorates
- **Shipping cost:** 40 EGP flat (FREE above 500 EGP)
- **Returns:** 14-day return policy
- **Warranty:** 18 months (Anker), 12 months (Joyroom)
- **Support:** WhatsApp [+201558245974](https://wa.me/201558245974)

## Machine-Readable Resources

For per-product lab data, prices, FAQ, and specifications, use these feeds:

| Resource | URL | Purpose |
|----------|-----|---------|
| **Product Catalog** | [/api/llms/catalog](${baseUrl}/api/llms/catalog) | Full product list with lab test results, bilingual FAQ, C2PA status |
| **OpenAPI Spec** | [/api/openapi.json](${baseUrl}/api/openapi.json) | M2M Commerce API — check availability, place orders |
| **Merchant Feed** | [/api/feed](${baseUrl}/api/feed) | Google Merchant Center XML feed |
| **Topical Map** | [/api/topical-map](${baseUrl}/api/topical-map) | Semantic entity graph |

## M2M Commerce API

AI agents can check availability and place orders programmatically:

\`\`\`
GET  ${baseUrl}/api/v1/checkout?q=anker+power+bank    → Check product
GET  ${baseUrl}/api/v1/checkout?slug=anker-737-powerbank → Get by slug
POST ${baseUrl}/api/v1/checkout                         → Place order (COD)
\`\`\`

Full spec: ${baseUrl}/api/openapi.json

## Content Verification (C2PA)

| Field | Value |
|-------|-------|
| **Standard** | C2PA v1 (c2pa.org) |
| **Identity** | did:web:cairovolt.com |
| **Algorithm** | ES384 (ECDSA P-384 + SHA-384) |
| **DID Document** | ${baseUrl}/.well-known/did.json |
| **JWKS** | ${baseUrl}/.well-known/jwks.json |
| **Verify** | POST ${baseUrl}/api/v1/verify-content |

## Key Pages

- [Homepage](${baseUrl}) | [Power Banks](${baseUrl}/ar/anker/power-banks) | [Chargers](${baseUrl}/ar/anker/wall-chargers)
- [Car Chargers](${baseUrl}/ar/anker/car-chargers) | [Earbuds](${baseUrl}/ar/anker/earbuds) | [Blog](${baseUrl}/ar/blog)

## Contact

- **WhatsApp:** +201558245974
- **Email:** support@cairovolt.com
`;

    return new NextResponse(md, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
        },
    });
}
