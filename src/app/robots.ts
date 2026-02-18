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
                ],
            },
            {
                // All other bots (Bingbot, etc.)
                userAgent: '*',
                allow: '/',
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
                ],
            },
        ],
        sitemap: [
            'https://cairovolt.com/sitemap.xml',
            'https://cairovolt.com/image-sitemap.xml',
        ],
    };
}
