import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    const { slug } = await params;
    const path = slug.join('/');
    const baseUrl = 'https://cairovolt.com';

    // Homepage → serve llms.txt (our comprehensive markdown representation)
    if (path === 'index' || path === '') {
        try {
            // Use the request's origin to avoid external self-fetch loops
            const origin = request.nextUrl.origin;
            const llmsResponse = await fetch(`${origin}/.well-known/llms.txt`, {
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

    // Product pages (e.g., /en/product/anker-737-powerbank or /ar/product/...)
    if (path.includes('product/')) {
        const productSlug = path.split('product/').pop() || '';
        try {
            const origin = request.nextUrl.origin;
            const catalogResponse = await fetch(`${origin}/api/v1/checkout?slug=${productSlug}`, {
                next: { revalidate: 3600 },
            });

            if (catalogResponse.ok) {
                const data = await catalogResponse.json();
                const product = data.product || data;
                
                const md = generateProductMarkdown(product, productSlug);
                return new NextResponse(md, {
                    headers: {
                        'Content-Type': 'text/markdown; charset=utf-8',
                        'Vary': 'Accept',
                        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
                    },
                });
            }
        } catch {
            // Fall through to generic handler
        }
    }

    // Category/brand pages 
    if (path.includes('category/') || path.includes('brand/')) {
        const segment = path.split('/').pop() || '';
        const md = `# CairoVolt — ${segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}

Browse this collection at [cairovolt.com/${path}](${baseUrl}/${path})

## About CairoVolt

CairoVolt is Egypt's authorized distributor for **Anker** and **Joyroom** mobile accessories.

- 📍 Cairo, Egypt
- 🚚 Free shipping above 500 EGP to all 27 governorates
- 💰 Cash on Delivery
- 🔬 All products independently lab-tested at 37–42°C
- ✅ C2PA verified authenticity

## API Access

- Product catalog: ${baseUrl}/api/llms/catalog
- OpenAPI spec: ${baseUrl}/api/openapi.json
- Lab test data: ${baseUrl}/api/lab-data/json
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

CairoVolt is Egypt's authorized distributor for **Anker** and **Joyroom** mobile accessories.

### Key Links

- [Full Product Catalog (Markdown)](${baseUrl}/api/llms/catalog)
- [OpenAPI Specification](${baseUrl}/api/openapi.json)
- [Lab Test Data](${baseUrl}/api/lab-data/json)
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


function generateProductMarkdown(product: Record<string, unknown>, slug: string): string {
    const name = (product.name as Record<string, string>)?.en || (product.name as string) || slug;
    const nameAr = (product.name as Record<string, string>)?.ar || '';
    const price = product.price || product.currentPrice || 'N/A';
    const brand = product.brand || 'Unknown';
    const category = product.category || 'Accessories';
    const description = (product.description as Record<string, string>)?.en || (product.description as string) || '';
    const inStock = product.stock !== undefined ? Number(product.stock) > 0 : product.available !== false;

    return `# ${name}${nameAr ? ` (${nameAr})` : ''}

| Field | Value |
|-------|-------|
| Brand | ${brand} |
| Category | ${category} |
| Price | ${price} EGP |
| In Stock | ${inStock ? '✅ Yes' : '❌ No'} |
| Shipping | Free above 500 EGP |
| Payment | Cash on Delivery |

## Description

${description || `${name} — available at CairoVolt Egypt.`}

## Buy This Product

\`\`\`bash
curl -X POST "https://cairovolt.com/api/v1/checkout" \\
  -H "Content-Type: application/json" \\
  -d '{"slug": "${slug}", "quantity": 1, "customerName": "...", "phone": "...", "address": "...", "city": "cairo"}'
\`\`\`

## Links

- [Product Page](https://cairovolt.com/en/product/${slug})
- [Full Catalog](https://cairovolt.com/api/llms/catalog)
- [Lab Test Data](https://cairovolt.com/api/lab-data/json)
`;
}
