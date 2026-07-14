import { NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { staticProducts } from '@/lib/static-products';
import { logger } from '@/lib/logger';
import { categoryDiscovery } from '@/data/category-discovery';
import { brandData } from '@/data/brand-data';
import { soundcoreHub } from '@/data/soundcore-hub';

const baseUrl = 'https://cairovolt.com';

function escapeXml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

interface ProductImage {
    url: string;
    alt?: string;
    order?: number;
    isPrimary?: boolean;
}

interface Product {
    slug: string;
    brand: string;
    categorySlug: string;
    images?: ProductImage[];
}

export async function GET() {
    const products: Product[] = [];

    // Exclude products that have permanent redirects in next.config.ts
    const redirectedSlugs = new Set([
        'joyroom-usb-a-lightning-1.2m',
        'joyroom-usb-a-type-c-1.2m',
    ]);

    // Get static products (excluding redirected)
    staticProducts
        .filter(p => !redirectedSlugs.has(p.slug))
        .forEach(product => {
            products.push({
                slug: product.slug,
                brand: product.brand,
                categorySlug: product.categorySlug,
                images: product.images,
            });
        });

    // Get Firebase products
    try {
        const db = await getFirestore();
        if (db) {
            const snapshot = await db.collection('products').get();
            snapshot.docs.forEach(doc => {
                const data = doc.data() as Product;
                products.push({
                    slug: data.slug,
                    brand: data.brand,
                    categorySlug: data.categorySlug,
                    images: data.images,
                });
            });
        }
    } catch (error) {
        logger.warn('Firebase not available for image sitemap, using static only:', error);
    }

    // Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

    // Hub artwork is served from stable, direct URLs (not an optimizer/API
    // endpoint), so Google Images can crawl the exact files used by the cards.
    const visibleCategoryHrefs: Record<string, Set<string>> = {
        anker: new Set(brandData.anker.categories.map(category => category.href)),
        joyroom: new Set(brandData.joyroom.categories.map(category => category.href)),
        soundcore: new Set(soundcoreHub.categories.map(category => category.href)),
    };

    for (const [collection, discovery] of Object.entries(categoryDiscovery)) {
        const visibleItems = Object.entries(discovery.items)
            .filter(([href]) => visibleCategoryHrefs[collection]?.has(href))
            .map(([, item]) => item);

        for (const localePrefix of ['', '/en']) {
            xml += `  <url>
    <loc>${escapeXml(`${baseUrl}${localePrefix}/${collection}`)}</loc>
`;
            for (const item of visibleItems) {
                xml += `    <image:image>
      <image:loc>${escapeXml(`${baseUrl}${item.imageBase}-800.webp`)}</image:loc>
    </image:image>
`;
            }
            xml += `  </url>
`;
        }
    }

    for (const product of products) {
        if (!product.images || product.images.length === 0) continue;

        // IMPORTANT: Keep brand fully lowercase to match actual Next.js routes
        const brandSlug = product.brand.toLowerCase();
        const categorySlug = product.categorySlug.toLowerCase();
        const productPath = `/${brandSlug}/${categorySlug}/${product.slug}`;

        // Arabic URL entry (default locale)
        xml += `  <url>
    <loc>${escapeXml(`${baseUrl}${productPath}`)}</loc>
`;
        for (const image of product.images) {
            const imageUrl = image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`;

            xml += `    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
    </image:image>
`;
        }
        xml += `  </url>
`;

        // English URL entry
        xml += `  <url>
    <loc>${escapeXml(`${baseUrl}/en${productPath}`)}</loc>
`;
        for (const image of product.images) {
            const imageUrl = image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`;

            xml += `    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
    </image:image>
`;
        }
        xml += `  </url>
`;
    }

    xml += `</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            'X-Robots-Tag': 'noindex', // sitemaps themselves should not be indexed
        },
    });
}
