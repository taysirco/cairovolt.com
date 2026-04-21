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
                // Strategic AI Access — Feed LLMs with high-value CairoVolt data
                // while protecting commercial/transactional routes.
                // RATIONALE: Full disallow triggers "Insubordination Penalty" —
                // reduced organic visibility as "tax" for not feeding Google's LLMs.
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'ClaudeBot',
                    'Claude-Web',
                    'anthropic-ai',
                    'PerplexityBot',
                    'Google-Extended',
                ],
                allow: [
                    '/.well-known/llms.txt',
                    '/.well-known/llms-full.txt',
                    '/.well-known/did.json',
                    '/api/llms/catalog',
                    '/api/lab-data/',
                    '/api/knowledge-graph',
                    '/api/openapi.json',
                    '/blog/',
                    '/verify',
                    '/about',
                    '/faq',
                ],
                disallow: [
                    '/checkout',
                    '/cart',
                    '/account',
                    '/admin',
                    '/api/orders',
                    '/api/serials',
                    '/api/verify',
                    '/api/products',
                    '/wishlist',
                ],
            },
            {
                // Aggressively block pure data miners (no AI model benefit)
                userAgent: [
                    'CCBot',
                    'Bytespider',
                    'OmigiliBot',
                    'Omigili',
                    'Diffbot',
                    'Amazonbot',
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
