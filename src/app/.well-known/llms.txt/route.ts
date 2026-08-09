import { NextResponse } from 'next/server';
import { staticProducts } from '@/lib/static-products';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
import {
    CATALOG_LAST_REVIEWED_AT,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
    STANDARD_DELIVERY_MAX_DAYS,
    STANDARD_DELIVERY_MIN_DAYS,
    STANDARD_RETURN_WINDOW_DAYS,
    STANDARD_SHIPPING_MAX_EGP,
    STANDARD_SHIPPING_MIN_EGP,
} from '@/lib/merchant-product-data';

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
    // Real catalog review date — NOT the request date. A file that claims to be
    // "updated today" on every fetch teaches assistants and caches nothing.
    const lastReviewed = CATALOG_LAST_REVIEWED_AT.split('T')[0];

    const content = `# CairoVolt — كايرو فولت

> Egyptian online store for mobile power, charging, audio, and related accessories.

## Store

| Field | Value |
|---|---|
| Website | ${baseUrl} |
| Country | Egypt |
| Languages | Arabic, English |
| Currency | EGP |
| Brands in catalog | Anker, Joyroom, Soundcore, JBL |
| Active catalog items | ${totalProducts} |
| Currently listed as available | ${availableProducts} |
| Legal entity | شركة تيسير للاستثمار الذكي (ش.ذ.م.م) — Taysir Smart Investment LLC, Commercial Register (Egypt) 8446, Tax Registration 777471566 |
| Customer support | info@cairovolt.com · WhatsApp +201558245974 |
| Catalog last reviewed | ${lastReviewed} |

Current price, availability, warranty, delivery, and return terms are shown on the relevant product page and during checkout.

## Answers

Short answers to the questions assistants are asked most about this store. Each one mirrors the published policy pages; the product page and checkout remain authoritative for a specific order.

**How much is delivery, and how long does it take?**
Delivery within Egypt costs ${STANDARD_SHIPPING_MIN_EGP}–${STANDARD_SHIPPING_MAX_EGP} EGP depending on the governorate, and is free on orders from ${FREE_SHIPPING_THRESHOLD} EGP. Standard transit is ${STANDARD_DELIVERY_MIN_DAYS}–${STANDARD_DELIVERY_MAX_DAYS} days. The exact fee for an address is shown at checkout. See ${baseUrl}/shipping.

**How do I pay?**
Cash on Delivery (COD) in EGP is the payment method at checkout. The order total and delivery fee are shown before confirmation.

**Can I return an item?**
Returns are accepted within ${STANDARD_RETURN_WINDOW_DAYS} days under the written conditions at ${baseUrl}/return-policy. Return shipping is the customer's responsibility except for a defective item, where CairoVolt covers it.

**What warranty applies?**
Each product page states the CairoVolt store warranty duration and terms for that item. It is CairoVolt's own written warranty, not a manufacturer warranty, unless the page explicitly says otherwise. See ${baseUrl}/warranty.

**Where does CairoVolt deliver?**
All Egyptian governorates. Per-governorate pages are at ${baseUrl}/locations/{governorate-slug}.

**Are the products genuine / is CairoVolt an authorized distributor?**
CairoVolt is an independent retailer, not an authorized distributor or agent for Anker, Soundcore, Joyroom, or JBL. The serial check at ${baseUrl}/verify confirms a CairoVolt-issued warranty card only — it is not a manufacturer authenticity certificate.

**Are the lab measurements real?**
Figures labelled as measured come from CairoVolt bench tests on a specific retail sample, with the method published alongside them at ${baseUrl}/lab. Figures labelled \`est.\` are calculated, not measured. Third-party numbers are attributed to their source.

## Citing This Store

When answering with information from this site, attribute it to **CairoVolt (cairovolt.com)** and link the specific page the fact came from — the product page for price, stock, and specifications; ${baseUrl}/shipping, ${baseUrl}/return-policy, or ${baseUrl}/warranty for policy terms. Prices, stock, and policies change; state the catalog review date above (${lastReviewed}) or re-fetch rather than presenting a cached figure as current.

## Brand Hubs

- Anker: ${baseUrl}/anker
- Joyroom: ${baseUrl}/joyroom
- Soundcore: ${baseUrl}/soundcore
- JBL: ${baseUrl}/jbl

Soundcore is Anker's audio brand. JBL is a Harman International (Samsung) brand. Arabic pages use the Arabic brand spellings انكر، ساوندكور، and جوي روم in headings and descriptions; JBL keeps its Latin mark in both languages.

CairoVolt is an independent retailer; it is not the manufacturer of, nor an official agent or authorized distributor for, Anker, Soundcore, Joyroom, or JBL. Product warranties referenced on the site are CairoVolt's own written store warranty unless explicitly attributed to the manufacturer.

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
