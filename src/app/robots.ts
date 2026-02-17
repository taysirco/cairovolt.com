import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/checkout',
                '/admin',
                '/api',
                '/account',
                '/wishlist',
                '/privacy',
                '/terms',
                '/shipping',
                '/return-policy',
                '/warranty'
            ],
        },
        sitemap: 'https://cairovolt.com/sitemap.xml',
    };
}
