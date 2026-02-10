import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/Anker/',
                    '/Joyroom/',
                    '/en/',
                ],
                disallow: [
                    '/api/',
                    '/checkout/',
                    '/confirm/',
                    '/private/',
                    '/_next/',
                    '/admin/',
                ],
            },
            {
                // Google Bots
                userAgent: ['Googlebot', 'Googlebot-Image', 'Google-Extended'],
                allow: '/',
                disallow: ['/api/', '/checkout/', '/_next/'],
            },
            {
                // Bing Bot
                userAgent: ['Bingbot', 'Slurp'],
                allow: '/',
                disallow: ['/api/', '/checkout/', '/_next/'],
            },
            {
                // AI Crawlers - OpenAI
                userAgent: ['GPTBot', 'ChatGPT-User'],
                allow: ['/', '/llms.txt', '/ai.txt'],
                disallow: ['/api/', '/checkout/'],
            },
            {
                // AI Crawlers - Anthropic
                userAgent: ['ClaudeBot', 'Claude-Web', 'anthropic-ai'],
                allow: ['/', '/llms.txt', '/ai.txt'],
                disallow: ['/api/', '/checkout/'],
            },
            {
                // AI Crawlers - Others
                userAgent: ['PerplexityBot', 'cohere-ai', 'meta-externalagent', 'YouBot'],
                allow: ['/', '/llms.txt', '/ai.txt'],
                disallow: ['/api/', '/checkout/'],
            },
            {
                // Apple
                userAgent: 'Applebot',
                allow: '/',
            },
        ],
        sitemap: [
            'https://cairovolt.com/sitemap.xml',
            'https://cairovolt.com/image-sitemap.xml',
        ],
        host: 'https://cairovolt.com',
    };
}
