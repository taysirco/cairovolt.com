import { NextResponse } from 'next/server';

/**
 * robots.txt — Route Handler (instead of MetadataRoute.Robots)
 * 
 * We use a raw route handler instead of the typed export because
 * Next.js's MetadataRoute.Robots doesn't support:
 *   1. Content-Signal directives (contentsignals.org)
 *   2. Custom comments for legal declarations
 * 
 * Content-Signal specification: https://contentsignals.org
 * IETF Draft: https://datatracker.ietf.org/doc/draft-content-signals/
 */

export function GET() {
    const robotsTxt = `# ==========================================================
# CairoVolt robots.txt
# Last updated: 2026-04-22
# ==========================================================

# --- Content Signals (contentsignals.org) ---
# As a condition of accessing this website, you agree to abide by the following content signals:
# (a) If a content-signal = yes, you may collect content for the corresponding use.
# (b) If a content-signal = no, you may not collect content for the corresponding use.
# Signals:
# search = building a search index and providing search results.
# ai-train = training or fine-tuning AI models.
# ai-input = inputting content into one or more AI models for real-time generative tasks (RAG, grounding).
Content-Signal: search=yes, ai-train=no, ai-input=yes

# --- Googlebot (Primary search crawler) ---
User-Agent: Googlebot
Allow: /
Allow: /api/feed
Allow: /api/discover-feed
Allow: /api/knowledge-graph
Allow: /api/llms/catalog
Allow: /api/v1/verify-content
Allow: /api/lab-data/
Allow: /api/openapi.json
Allow: /.well-known/
Disallow: /checkout
Disallow: /cart
Disallow: /account
Disallow: /admin
Disallow: /confirm
Disallow: /review/
Disallow: /api/products
Disallow: /api/categories
Disallow: /api/orders
Disallow: /api/reviews
Disallow: /api/seed
Disallow: /api/admin
Disallow: /api/verify
Disallow: /api/serials
Disallow: /api/v1/checkout
Disallow: /api/v1/orders
Disallow: /wishlist
Disallow: /*?*

# --- All other bots (Bingbot, etc.) ---
User-Agent: *
Allow: /
Allow: /api/knowledge-graph
Allow: /api/llms/catalog
Allow: /api/v1/verify-content
Allow: /api/lab-data/
Allow: /.well-known/
Disallow: /checkout
Disallow: /cart
Disallow: /account
Disallow: /admin
Disallow: /confirm
Disallow: /review/
Disallow: /api/
Disallow: /wishlist
Disallow: /*?*

# --- Strategic AI Access ---
# Feed LLMs with high-value CairoVolt data while protecting
# commercial/transactional routes.
User-Agent: GPTBot
User-Agent: ChatGPT-User
User-Agent: ClaudeBot
User-Agent: Claude-Web
User-Agent: anthropic-ai
User-Agent: PerplexityBot
User-Agent: Google-Extended
Allow: /.well-known/llms.txt
Allow: /.well-known/llms-full.txt
Allow: /.well-known/did.json
Allow: /api/llms/catalog
Allow: /api/lab-data/
Allow: /api/knowledge-graph
Allow: /api/openapi.json
Allow: /blog/
Allow: /verify
Allow: /about
Allow: /faq
Disallow: /checkout
Disallow: /cart
Disallow: /account
Disallow: /admin
Disallow: /api/orders
Disallow: /api/serials
Disallow: /api/verify
Disallow: /api/products
Disallow: /wishlist

# --- Block pure data miners ---
User-Agent: CCBot
User-Agent: Bytespider
User-Agent: OmigiliBot
User-Agent: Omigili
User-Agent: Diffbot
User-Agent: Amazonbot
Disallow: /

# --- Sitemaps ---
Sitemap: https://cairovolt.com/sitemap.xml
Sitemap: https://cairovolt.com/image-sitemap.xml
`;

    return new NextResponse(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}
