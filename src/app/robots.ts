import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                // Allow full access — only block non-indexable pages
                userAgent: 'Googlebot',
                allow: [
                    '/',
                    '/api/feed',           // Merchant Center feed
                    '/api/discover-feed',  // Google Discover RSS
                    '/api/knowledge-graph',    // Entity Data API
                    '/api/llms/catalog',   // M2M Catalog API
                    '/api/v1/verify-content',  // C2PA Content Verification
                    '/.well-known/',       // DID + JWKS + llms.txt
                ],
                disallow: [
                    '/checkout',
                    '/cart',
                    '/account',
                    '/admin',
                    '/confirm',
                    '/review/',
                    '/api/products',
                    '/api/categories',
                    '/api/orders',
                    '/api/reviews',
                    '/api/seed',
                    '/api/admin',
                    '/api/verify',
                    '/api/serials',
                    '/api/v1',
                    '/wishlist',
                    '/*?*',                // Block parameterized URLs
                ],
            },
            {
                // All other bots (Bingbot, etc.)
                userAgent: '*',
                allow: [
                    '/',
                    '/api/knowledge-graph',
                    '/api/llms/catalog',
                    '/api/v1/verify-content',  // C2PA Content Verification
                    '/.well-known/',       // DID + JWKS + llms.txt
                ],
                disallow: [
                    '/checkout',
                    '/cart',
                    '/account',
                    '/admin',
                    '/confirm',
                    '/review/',
                    '/api/',
                    '/wishlist',
                    '/*?*',                // Block all parameterized URLs
                ],
            },
            {
                // Aggressively block AI Scrapers & Data Miners to protect server capacity
                // and preserve crawl budget for Googlebot.
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'ClaudeBot',
                    'Claude-Web',
                    'CCBot',
                    'Bytespider',
                    'Applebot-Extended',
                    'anthropic-ai',
                    'OmigiliBot',
                    'Omigili',
                    'FacebookBot',
                    'Diffbot',
                    'Amazonbot',
                    'PerplexityBot',
                ],
                disallow: ['/'],
            },
        ],
        sitemap: [
            'https://cairovolt.com/sitemap.xml',
            'https://cairovolt.com/image-sitemap.xml',
        ],
    };
}
