import { staticProducts } from '@/lib/static-products';
import { Feed } from 'feed';
import {
    CATALOG_LAST_REVIEWED_AT,
    getMerchantProductUrl,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
} from '@/lib/merchant-product-data';
import { CATALOG_LASTMOD } from '@/data/catalog-lastmod.generated';

// RSS feed for active catalogue listings.

export const revalidate = 3600; // Refreshes the feed every hour

/**
 * Per-product date from the committed lastmod map (moves only when the
 * product or details file changes). A slug the map does not know yet falls
 * back to the catalog review date — never to the request time.
 */
function productDate(slug: string, fallback: Date): Date {
    const entry = CATALOG_LASTMOD[slug];
    const date = entry ? new Date(entry.lastmod) : undefined;
    return date && !Number.isNaN(date.getTime()) ? date : fallback;
}

export async function GET() {
    const baseUrl = 'https://cairovolt.com';
    const reviewedAt = new Date(CATALOG_LAST_REVIEWED_AT);
    const listedProducts = staticProducts.filter(product =>
        product.status === 'active'
        && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(product.slug)
    );
    // lastBuildDate = the newest item date, so the channel and its items agree.
    const date = listedProducts.reduce(
        (latest, product) => {
            const itemDate = productDate(product.slug, reviewedAt);
            return itemDate > latest ? itemDate : latest;
        },
        reviewedAt,
    );

    const feed = new Feed({
        title: 'CairoVolt Product Catalogue',
        description: 'Active Anker, Soundcore, Joyroom, and JBL product listings with current catalogue prices and links.',
        id: baseUrl,
        link: baseUrl,
        // One valid RSS language code. Item titles and bodies are English; the
        // Arabic description inside each item is labelled as such.
        language: 'en',
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

    listedProducts.forEach(product => {
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
            date: productDate(product.slug, reviewedAt),
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
