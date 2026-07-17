import { staticProducts } from '@/lib/static-products';
import { Feed } from 'feed';
import {
    CATALOG_LAST_REVIEWED_AT,
    getMerchantProductUrl,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
} from '@/lib/merchant-product-data';

// RSS feed for active catalogue listings.

export const revalidate = 3600; // Refreshes the feed every hour

export async function GET() {
    const baseUrl = 'https://cairovolt.com';
    const date = new Date(CATALOG_LAST_REVIEWED_AT);

    const feed = new Feed({
        title: 'CairoVolt Product Catalogue',
        description: 'Active Anker, Soundcore, and Joyroom product listings with current catalogue prices and links.',
        id: baseUrl,
        link: baseUrl,
        language: "en, ar",
        image: `${baseUrl}/logo.png`,
        favicon: `${baseUrl}/favicon.ico`,
        copyright: `© ${date.getFullYear()} CairoVolt`,
        updated: date,
        generator: 'CairoVolt',
        feedLinks: {
            rss2: `${baseUrl}/feed.xml`,
        },
        author: {
            name: 'CairoVolt',
            email: 'info@cairovolt.com',
            link: baseUrl
        }
    });

    staticProducts.filter(product =>
        product.status === 'active'
        && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(product.slug)
    ).forEach(product => {
        const url = getMerchantProductUrl(product, 'en');

        feed.addItem({
            title: `${product.brand} - ${product.translations.en.name}`,
            id: url,
            link: url,
            description: product.translations.en.shortDescription || product.translations.en.description,
            content: `
                <h3>${product.translations.en.name}</h3>
                <p><strong>Brand:</strong> ${product.brand}</p>
                <p><strong>Price:</strong> ${product.price} EGP</p>
                <p>${product.translations.en.description}</p>
                <hr/>
                <p><em>النسخة العربية (Arabic Description):</em></p>
                <p>${product.translations.ar.description}</p>
            `,
            author: [
                {
                    name: 'CairoVolt',
                    email: 'info@cairovolt.com',
                    link: baseUrl,
                }
            ],
            date,
            image: product.images.length > 0
                ? (product.images[0].url.startsWith('http') ? product.images[0].url : `${baseUrl}${product.images[0].url}`)
                : undefined,
        });
    });

    return new Response(feed.rss2(), {
        status: 200,
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
