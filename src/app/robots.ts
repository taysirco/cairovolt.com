import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                // Googlebot gets the full crawl budget — only block non-indexable pages
                userAgent: 'Googlebot',
                allow: [
                    '/',
                    '/api/feed',           // Merchant Center feed
                    '/api/discover-feed',  // Google Discover RSS
                    '/api/topical-map',    // Semantic Graph API
                    '/api/llms/catalog',   // M2M Catalog API
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
                    '/*?*',                // Block all parameterized URLs to save Crawl Budget
                ],
            },
            {
                // All other bots (Bingbot, etc.)
                userAgent: '*',
                allow: [
                    '/',
                    '/api/topical-map',
                    '/api/llms/catalog',
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
                    '/privacy',
                    '/terms',
                    '/shipping',
                    '/return-policy',
                    '/warranty',
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
