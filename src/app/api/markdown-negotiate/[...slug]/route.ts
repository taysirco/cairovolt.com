import { NextRequest, NextResponse } from 'next/server';
import { staticProducts } from '@/lib/static-products';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
import { KNOWN_TOP_SEGMENTS, LEGACY_PRODUCT_REDIRECTS } from '@/lib/known-routes';
import { BLOG_SCHEDULE } from '@/data/blog-schedule.generated';
import { categoryContent } from '@/data/category-content';

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
 * IMPORTANT — status parity with the HTML surface: the middleware rewrite
 * happens BEFORE its canonicalization/404 gates, so this handler replays
 * the SAME gates (same order, same truth sources — src/middleware.ts /
 * src/lib/known-routes.ts). A URL that 301s or 404s for an HTML client
 * must 301/404 identically for a markdown client; anything else is
 * cloaking-adjacent differential content.
 *
 * Standard: https://accept.md / Cloudflare Markdown-for-Agents
 */

export const revalidate = 3600;

const BASE_URL = 'https://cairovolt.com';

// Product route trees: /[brand]/[category]/[slug] (closed, validated space).
const PRODUCT_BRANDS = new Set(['anker', 'joyroom', 'soundcore']);

// Single-segment collection landing pages (brand hubs + generic categories).
const COLLECTION_ROOTS = new Set([
    'anker',
    'joyroom',
    'soundcore',
    'power-banks',
    'chargers',
    'cables',
    'earbuds',
]);

// Mirrors the middleware's NOT_FOUND_HTML response (status, noindex,
// short cache) in markdown form for the negotiated surface.
function markdownNotFound(path: string): NextResponse {
    const md = `# 404 — Page Not Found

There is no page at cairovolt.com/${path}.

- [CairoVolt Homepage](${BASE_URL})
- [Full Product Catalog (Markdown)](${BASE_URL}/api/llms/catalog)
- [AI Instructions](${BASE_URL}/.well-known/llms.txt)
`;
    return new NextResponse(md, {
        status: 404,
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept',
            'X-Robots-Tag': 'noindex',
            'Cache-Control': 'public, max-age=300',
        },
    });
}

// Permanent redirect to the SAME canonical destination the HTML middleware
// uses. A markdown client re-requests the canonical URL with its original
// Accept header and receives the canonical page's markdown.
function markdownRedirect(targetPath: string): NextResponse {
    return NextResponse.redirect(`${BASE_URL}${targetPath}`, 301);
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    const { slug } = await params;
    const path = slug.join('/');
    const baseUrl = BASE_URL;
    const isHome = path === 'index' || path === '';

    // Homepage → serve llms.txt (our comprehensive markdown representation)
    if (isHome) {
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

    // ── Replay the HTML middleware gates (same order — src/middleware.ts) ──
    // The markdown rewrite fires before those gates run, so they are applied
    // here to keep status codes identical across the two surfaces.
    const pathname = `/${path}`;
    if (!isHome) {
        // Broken / malformed URLs → home.
        if (pathname === '/$' || pathname === '/&') {
            return markdownRedirect('/');
        }

        // Canonicalize the optional Arabic prefix with a permanent redirect.
        if (slug[0] === 'ar') {
            return markdownRedirect(slug.length === 1 ? '/' : `/${slug.slice(1).join('/')}`);
        }

        // Strict lowercase enforcement.
        if (pathname !== pathname.toLowerCase()) {
            return markdownRedirect(pathname.toLowerCase());
        }

        // Soundcore audio products use the dedicated /soundcore route tree.
        const soundcoreMigration = pathname.match(
            /^(\/en)?\/anker\/(audio|speakers)(\/.*)?$/
        );
        if (soundcoreMigration) {
            const [, migrationLocale, migrationCategory, rest] = soundcoreMigration;
            return markdownRedirect(`${migrationLocale || ''}/soundcore/${migrationCategory}${rest || ''}`);
        }

        // Retired product slug 301s — same map and regex as the middleware.
        const legacyProduct = pathname.match(
            /^(\/en)?\/(?:anker|joyroom|soundcore)(?:\/[a-z0-9-]+)?\/([a-z0-9-]+)\/?$/
        );
        if (legacyProduct) {
            const target = LEGACY_PRODUCT_REDIRECTS[legacyProduct[2]];
            if (target) {
                return markdownRedirect(`${legacyProduct[1] || ''}${target}`);
            }
        }
    }

    const routeSegments = slug[0] === 'en' || slug[0] === 'ar' ? slug.slice(1) : slug;
    const localePrefix = slug[0] === 'en' ? '/en' : '';

    if (!isHome) {
        // Real 404 for unknown top-level segments — same allowlist as the HTML gate.
        const firstSegment = routeSegments[0];
        if (firstSegment && !KNOWN_TOP_SEGMENTS.has(firstSegment)) {
            return markdownNotFound(path);
        }

        // Blog scheduling gate — 404 for unknown OR not-yet-published article
        // slugs, evaluated per-request so no cache can freeze the time gate.
        const blogArticle = pathname.match(/^(?:\/(?:en|ar))?\/blog\/([^/]+)\/?$/);
        if (blogArticle) {
            const ts = BLOG_SCHEDULE[blogArticle[1]];
            if (ts === undefined || ts > Date.now()) {
                return markdownNotFound(path);
            }
        }
    }

    // Product pages follow /[brand]/[category]/[slug], with an optional /en.
    if (routeSegments.length === 3 && PRODUCT_BRANDS.has(routeSegments[0])) {
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

        // No matching brand+category+slug in the catalog → not found,
        // matching the HTML product page's not-found result.
        return markdownNotFound(path);
    }

    // Brand and category collection pages.
    if (routeSegments.length <= 2 && COLLECTION_ROOTS.has(routeSegments[0] || '')) {
        // Two-segment paths are only valid brand/category combinations —
        // the same closed space the HTML [brand]/[category] page enforces
        // via categoryContent + dynamicParams=false.
        if (routeSegments.length === 2
            && !categoryContent[routeSegments[0]]?.[routeSegments[1]]) {
            return markdownNotFound(path);
        }

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

    // Deeper paths under the product/collection trees have no HTML route
    // (products are exactly three segments) → not found, like the HTML site.
    if (!isHome && routeSegments.length >= 2 && COLLECTION_ROOTS.has(routeSegments[0] || '')) {
        return markdownNotFound(path);
    }

    // Generic fallback for the remaining KNOWN static pages (about, contact,
    // faq, blog listing, live blog articles, locations, solutions, …) —
    // a basic markdown page with navigation hints.
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
