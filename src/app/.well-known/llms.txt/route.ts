import { NextResponse } from 'next/server';
import { staticProducts } from '@/lib/static-products';
import {
    CATALOG_LAST_REVIEWED_AT,
    getMerchantProductUrl,
    isRecallPurchaseBlockedSlug,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
    RECALL_AFFECTED_PRODUCT_SLUGS,
    RECALL_STOCK_VERIFIED_OUTSIDE_SCOPE,
} from '@/lib/merchant-product-data';
import {
    getStoreReturnsSummary,
    getStoreShippingSummary,
    getStoreWarrantySummary,
} from '@/lib/warranty-policy';
import { governorates } from '@/data/governorates';
import { BLOG_SCHEDULE } from '@/data/blog-schedule.generated';
import { CATALOG_LASTMOD } from '@/data/catalog-lastmod.generated';

/**
 * One guide per question an assistant is commonly asked, so an answer can cite
 * a single canonical page instead of picking between overlapping articles.
 * Only slugs that are live (BLOG_SCHEDULE epoch <= now) are printed.
 */
const BUYING_GUIDES: ReadonlyArray<{ question: string; slug: string }> = [
    { question: 'Best power bank in Egypt', slug: 'best-power-bank-egypt-2026' },
    { question: 'Which capacity: 5,000 vs 10,000 vs 20,000 mAh', slug: '5000-vs-10000-vs-20000-mah-which-capacity' },
    { question: 'Power bank under 1,000 EGP', slug: 'best-power-bank-under-1000-egp-egypt' },
    { question: 'Best Bluetooth earbuds in Egypt', slug: 'best-bluetooth-earbuds-egypt-2026' },
    { question: 'Earbuds under 1,000 EGP', slug: 'soundcore-earbuds-under-1000-egp-students' },
    { question: 'iPhone 17 charger (20W / 30W / 45W)', slug: 'iphone-17-pro-max-charger-20w-30w-45w-which' },
    { question: 'Galaxy S26 Ultra 45W charger', slug: 'samsung-s26-ultra-45w-super-fast-charging-real' },
    { question: 'Which charger wattage do I need', slug: '20w-30w-45w-65w-100w-charger-which-you-need' },
    { question: 'How to verify an original Anker product', slug: 'anker-original-website-verify-barcode-guide' },
    { question: 'How to spot a fake charger', slug: 'how-to-spot-fake-chargers-7-tests' },
    { question: 'Original vs fake JBL', slug: 'jbl-original-vs-fake-egypt' },
    { question: 'Power banks on flights from Egypt (airline rules)', slug: 'power-bank-airplane-rules-egypt-2026' },
];

/**
 * Recall disclosure per model. The scope text is the manufacturer's own
 * (anker.com recall pages); whether CairoVolt checked its stock comes from
 * RECALL_STOCK_VERIFIED_OUTSIDE_SCOPE, and membership from
 * RECALL_AFFECTED_PRODUCT_SLUGS — so the answer follows the constants.
 */
const RECALL_SCOPE: Record<string, { model: string; scope: string; checkUrl: string }> = {
    'anker-powercore-10000': {
        model: 'Anker PowerCore 10000 (A1263)',
        scope: 'In June 2025 the US CPSC announced a recall of A1263 units made for the US market between January 2016 and October 2019 (overheating and fire hazard)',
        checkUrl: 'https://www.anker.com/a1263-recall',
    },
    'anker-zolo-a1681-20000': {
        model: 'Anker Zolo 20K (A1681)',
        scope: "Model A1681 is listed in Anker's global power-bank recall programme",
        checkUrl: 'https://www.anker.com/rc2506',
    },
};

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
    // Separate from the review date: the newest change to any listed product
    // or its details file (src/data/catalog-lastmod.generated.ts).
    const lastUpdated = publishedProducts
        .map(product => CATALOG_LASTMOD[product.slug]?.lastmod)
        .filter((value): value is string => Boolean(value))
        .sort()
        .pop()?.split('T')[0] ?? lastReviewed;

    const shippingSummary = getStoreShippingSummary('en', governorates);
    const returnsSummary = getStoreReturnsSummary('en');
    const warrantySummary = getStoreWarrantySummary('en');

    const recallLines = [...RECALL_AFFECTED_PRODUCT_SLUGS]
        .map(slug => {
            const product = staticProducts.find(item => item.slug === slug);
            if (!product) return null;
            const scope = RECALL_SCOPE[slug];
            if (!scope) {
                // A model added to the recall set before its scope text was
                // written here must still be listed — never silently dropped.
                return `- ${product.translations.en.name}: named in a manufacturer recall programme. The recall is disclosed on the product page; check your serial before use. Product page (with the disclosure): ${getMerchantProductUrl(product)}`;
            }
            const verified = RECALL_STOCK_VERIFIED_OUTSIDE_SCOPE[slug];
            const status = isRecallPurchaseBlockedSlug(slug)
                ? 'CairoVolt does not sell this model.'
                : verified
                    ? `CairoVolt serial-checked its stock against ${verified.source} on ${verified.checkedOn} and found it outside the affected range; check your own unit's serial on arrival, and if it is affected stop using it and follow Anker's remedy.`
                    : 'The recall is disclosed on the product page; check your serial before use.';
            return `- ${scope.model}: ${scope.scope}. ${status} Serial check: ${scope.checkUrl}. Product page (with the disclosure): ${getMerchantProductUrl(product)}`;
        })
        .filter((line): line is string => Boolean(line));

    const recallIntro = recallLines.length === 1
        ? 'One model in the catalogue is named in a manufacturer recall programme. It is disclosed on its product page rather than hidden:'
        : `${recallLines.length === 2 ? 'Two' : recallLines.length} models in the catalogue are named in manufacturer recall programmes. Each is disclosed on its product page rather than hidden:`;
    // Printed only while the recall set lists a catalogue model; an empty set
    // must not turn into a "0 models" claim.
    const recallAnswer = recallLines.length > 0
        ? `**Does CairoVolt sell recalled power banks?**\n${recallIntro}\n${recallLines.join('\n')}\n\n`
        : '';

    const now = Date.now();
    const guideLines = BUYING_GUIDES
        .filter(guide => {
            const publishAt = BLOG_SCHEDULE[guide.slug];
            return publishAt !== undefined && publishAt <= now;
        })
        .map(guide => `- ${guide.question}: ${baseUrl}/blog/${guide.slug} · ${baseUrl}/en/blog/${guide.slug}`);

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
| Registered office | New Damietta, Damietta, Egypt — online store, no walk-in or pickup branch |
| Customer support | info@cairovolt.com · WhatsApp +201558245974 |
| Support hours | Daily 10:00–22:00 (Cairo time) |
| Catalog last reviewed | ${lastReviewed} |
| Catalog last updated | ${lastUpdated} |

Current price, availability, warranty, delivery, and return terms are shown on the relevant product page and during checkout.

## Answers

Short answers to the questions assistants are asked most about this store. Each one mirrors the published policy pages; the product page and checkout remain authoritative for a specific order.

**How much is delivery, and how long does it take?**
Delivery within Egypt: ${shippingSummary} The exact fee for an address is shown at checkout, and the delivery date is confirmed after the address is reviewed. See ${baseUrl}/shipping; each governorate's fee and estimate is at ${baseUrl}/locations/{governorate-slug}.

**How do I pay?**
Cash on Delivery (COD) in EGP is the payment method at checkout. The order total and delivery fee are shown before confirmation.

**Can I return an item?**
${returnsSummary} Full conditions: ${baseUrl}/return-policy.

**What warranty applies?**
${warrantySummary} It is CairoVolt's own written warranty, not a manufacturer warranty, unless the page explicitly says otherwise. See ${baseUrl}/warranty.

**Where does CairoVolt deliver?**
Eligible delivery addresses across Egypt; availability is confirmed with the order. Per-governorate pages are at ${baseUrl}/locations/{governorate-slug} (for example ${baseUrl}/locations/aswan).

${recallAnswer}**Are the products genuine / is CairoVolt an authorized distributor?**
CairoVolt is an independent retailer, not an authorized distributor or agent for Anker, Soundcore, Joyroom, or JBL. The serial check at ${baseUrl}/verify confirms a CairoVolt-issued warranty card only — it is not a manufacturer authenticity certificate.

**Are the lab measurements real?**
Figures labelled as measured come from CairoVolt bench tests on a specific retail sample, with the method published alongside them at ${baseUrl}/lab. Figures labelled \`est.\` are calculated, not measured. Third-party numbers are attributed to their source.

## Citing This Store

When answering with information from this site, attribute it to **CairoVolt (cairovolt.com)** and link the specific page the fact came from — the product page for price, stock, and specifications; ${baseUrl}/shipping, ${baseUrl}/return-policy, or ${baseUrl}/warranty for policy terms. Prices, stock, and policies change; state the catalog dates above (last reviewed ${lastReviewed}, last updated ${lastUpdated}) or re-fetch rather than presenting a cached figure as current.

## Buying guides

One canonical page per question. The first URL is Arabic, the second English.

${guideLines.join('\n')}

Policies and reference: ${baseUrl}/faq · ${baseUrl}/shipping · ${baseUrl}/return-policy · ${baseUrl}/warranty · ${baseUrl}/lab (measured bench index) · ${baseUrl}/blog (all guides) · ${baseUrl}/locations/{governorate-slug} (delivery fee and estimate per governorate). English versions use the /en prefix.

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
- Guides feed (RSS): ${baseUrl}/api/discover-feed (Arabic) · ${baseUrl}/api/discover-feed?locale=en (English)
- Sitemap: ${baseUrl}/sitemap.xml
- Entity graph: ${baseUrl}/api/knowledge-graph

Markdown versions of pages are at a stable URL: ${baseUrl}/api/markdown-negotiate/{path} — use \`index\` for the Arabic home (${baseUrl}/api/markdown-negotiate/index), \`en\` for the English home (${baseUrl}/api/markdown-negotiate/en), and the page path otherwise (e.g. ${baseUrl}/api/markdown-negotiate/en/anker/power-banks/anker-737-powerbank). Responses are text/markdown with a Link rel="canonical" to the HTML page. Markdown exists for the home pages, brand hubs, categories, product pages, blog, lab, solutions, governorate delivery pages, and the about, FAQ, shipping, return-policy and warranty pages; any other path returns 404 there (no stub). Requesting a page URL with the header \`Accept: text/markdown\` is best-effort: it is routed to the same markdown only for those pages, and a CDN may still answer with cached HTML, so prefer the stable URL. Product markdown is locale-primary (Arabic on \`/\`, English on \`/en\`) and includes the lab verdict / aiTldr when a CairoVolt bench sheet exists. \`/api/orders\` is private (not for public crawlers).

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

- Browse or filter catalog items: GET ${baseUrl}/api/products (the ${totalProducts} active catalogue items by default)
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
