import { staticProducts } from '@/lib/static-products';
import { Feed } from 'feed';

// Standard RSS Syndication Feed for Content Discovery
// Automatically aggregates new product listings for external syndication channels.

export const revalidate = 3600; // Refreshes the feed every hour

export async function GET() {
    const baseUrl = 'https://cairovolt.com';
    const date = new Date();

    const feed = new Feed({
        title: "Cairo Volt - Premium Electrical Engineering Accessories",
        description: "Egypt's premier source for authentic Anker and Joyroom mobile accessories. Verified, tested, and guaranteed.",
        id: baseUrl,
        link: baseUrl,
        language: "en, ar",
        image: `${baseUrl}/logo.png`,
        favicon: `${baseUrl}/favicon.ico`,
        copyright: `All rights reserved ${date.getFullYear()}, Cairo Volt Engineers`,
        updated: date, // Today's date
        generator: "Next.js Feed System",
        feedLinks: {
            rss2: `${baseUrl}/feed.xml`,
        },
        author: {
            name: "Eng. Ahmed Salem",
            email: "info@cairovolt.com",
            link: baseUrl
        }
    });

    // Populate the feed with our products
    staticProducts.forEach(product => {
        const url = `${baseUrl}/en/${product.brand.toLowerCase()}/${product.categorySlug}/${product.slug}`;

        feed.addItem({
            title: `${product.brand} - ${product.translations.en.name} | Officially Tested`,
            id: url,
            link: url,
            description: product.translations.en.shortDescription || product.translations.en.description,
            // Add a snippet of the Arabic description so international bots also pick up local relevance
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
                    name: "Cairo Volt Validation Labs",
                    email: "labs@cairovolt.com",
                    link: `${baseUrl}/about`
                }
            ],
            contributor: [
                {
                    name: "Eng. Ahmed",
                    link: baseUrl
                }
            ],
            date: new Date(),
            image: product.images.length > 0 ? `${baseUrl}${product.images[0].url}` : undefined
        });
    });

    // Output raw RSS 2.0 XML
    return new Response(feed.rss2(), {
        status: 200,
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
