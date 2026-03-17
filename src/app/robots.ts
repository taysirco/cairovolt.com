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
                    '/.well-known/llms.txt',
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
                    '/.well-known/llms.txt',
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
        ],
        sitemap: [
            'https://cairovolt.com/sitemap.xml',
            'https://cairovolt.com/image-sitemap.xml',
        ],
    };
}
