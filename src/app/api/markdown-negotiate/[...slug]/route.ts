import { NextRequest, NextResponse } from 'next/server';
import { staticProducts } from '@/lib/static-products';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';

/**
 * Markdown Content Negotiation Handler
 * /api/markdown-negotiate/[...slug]/route.ts
 * 
 * When the middleware detects Accept: text/markdown, it rewrites
 * the request here. This handler serves markdown representations
 * of CairoVolt pages to AI agents.
 * 
 * Strategy:
 * - Homepage → serves llms.txt (our curated markdown representation)
 * - Product pages → generate markdown from product data
 * - Other pages → return a minimal markdown summary
 * 
 * Standard: https://accept.md / Cloudflare Markdown-for-Agents
 */

export const revalidate = 3600;

const COLLECTION_ROOTS = new Set([
    'anker',
    'joyroom',
    'soundcore',
    'power-banks',
    'chargers',
    'cables',
    'earbuds',
]);

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    const { slug } = await params;
    const path = slug.join('/');
    const baseUrl = 'https://cairovolt.com';
    const routeSegments = slug[0] === 'en' || slug[0] === 'ar' ? slug.slice(1) : slug;
    const localePrefix = slug[0] === 'en' ? '/en' : '';

    // Homepage → serve llms.txt (our comprehensive markdown representation)
    if (path === 'index' || path === '') {
        try {
            // Use production URL — request.nextUrl.origin is unreliable during ISR/SSR
            const llmsResponse = await fetch(`${baseUrl}/.well-known/llms.txt`, {
                headers: { 'Accept': 'text/plain' },
                next: { revalidate: 3600 },
            });
            
            if (llmsResponse.ok) {
                const llmsContent = await llmsResponse.text();
                return new NextResponse(llmsContent, {
                    headers: {
                        'Content-Type': 'text/markdown; charset=utf-8',
                        'Vary': 'Accept',
                        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
                        'X-Content-Source': 'llms.txt',
                    },
                });
            }
        } catch {
            // Fall through to generic handler
        }
    }

    // Product pages follow /[brand]/[category]/[slug], with an optional /en.
    if (routeSegments.length === 3) {
        const [brand, category, productSlug] = routeSegments;
        const product = staticProducts.find(item =>
            item.slug === productSlug
            && item.brand.toLowerCase() === brand.toLowerCase()
            && item.categorySlug === category,
        );

        if (product) {
            const md = generateProductMarkdown(product, localePrefix);
            return new NextResponse(md, {
                headers: {
                    'Content-Type': 'text/markdown; charset=utf-8',
                    'Vary': 'Accept',
                    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
                },
            });
        }
    }

    // Brand and category collection pages.
    if (routeSegments.length <= 2 && COLLECTION_ROOTS.has(routeSegments[0] || '')) {
        const segment = routeSegments.at(-1) || '';
        const md = `# CairoVolt — ${segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}

Browse this collection at [cairovolt.com/${path}](${baseUrl}/${path})

## About CairoVolt

CairoVolt is an Egyptian online store for **Anker**, **Joyroom**, and **Soundcore** accessories.

- Service area: Egypt
- Free shipping above ${FREE_SHIPPING_THRESHOLD.toLocaleString('en-US')} EGP
- 💰 Cash on Delivery
- ✅ CairoVolt warranty-card serial lookup available at ${baseUrl}/verify

## API Access

- Product catalog: ${baseUrl}/api/llms/catalog
- OpenAPI spec: ${baseUrl}/api/openapi.json
`;

        return new NextResponse(md, {
            headers: {
                'Content-Type': 'text/markdown; charset=utf-8',
                'Vary': 'Accept',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });
    }

    // Generic fallback — return a basic markdown page with navigation hints
    const md = `# CairoVolt — ${path.replace(/-/g, ' ').replace(/\//g, ' / ').replace(/\b\w/g, c => c.toUpperCase())}

This page is available at [cairovolt.com/${path}](${baseUrl}/${path})

## About CairoVolt

CairoVolt is an Egyptian online store for **Anker**, **Joyroom**, and **Soundcore** accessories.

### Key Links

- [Full Product Catalog (Markdown)](${baseUrl}/api/llms/catalog)
- [OpenAPI Specification](${baseUrl}/api/openapi.json)
- [AI Instructions](${baseUrl}/.well-known/llms.txt)

### Contact

- WhatsApp: +201558245974
- Email: support@cairovolt.com
- Website: ${baseUrl}
`;

    return new NextResponse(md, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}


function plainText(value: string | undefined): string {
    return (value || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function generateProductMarkdown(
    product: (typeof staticProducts)[number],
    localePrefix: string,
): string {
    const name = plainText(product.translations.en.name);
    const nameAr = plainText(product.translations.ar.name);
    const description = plainText(
        product.translations.en.shortDescription || product.translations.en.description,
    );
    const productPath = `${localePrefix}/${product.brand.toLowerCase()}/${product.categorySlug}/${product.slug}`;
    const productUrl = `https://cairovolt.com${productPath}`;

    return `# ${name}${nameAr ? ` (${nameAr})` : ''}

| Field | Value |
|-------|-------|
| Brand | ${product.brand} |
| Category | ${product.categorySlug} |
| Price | ${product.price} EGP |
| In Stock | ${product.stock > 0 ? 'Yes' : 'No'} |
| Shipping | Free above ${FREE_SHIPPING_THRESHOLD.toLocaleString('en-US')} EGP |
| Payment | Cash on Delivery |

## Description

${description || `${name} is listed in the CairoVolt catalog.`}

## Buy This Product

\`\`\`bash
curl -X POST "https://cairovolt.com/api/v1/checkout" \\
  -H "Content-Type: application/json" \\
  -d '{"slug": "${product.slug}", "quantity": 1, "customerName": "...", "phone": "...", "address": "...", "city": "cairo"}'
\`\`\`

## Links

- [Product Page](${productUrl})
- [Full Catalog](https://cairovolt.com/api/llms/catalog)
`;
}
