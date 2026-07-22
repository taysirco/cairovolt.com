import { NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { staticProducts } from '@/lib/static-products';
import { logger } from '@/lib/logger';
import { categoryDiscovery } from '@/data/category-discovery';
import { brandData } from '@/data/brand-data';
import { soundcoreHub } from '@/data/soundcore-hub';
import {
    getCanonicalProductPath,
    resolveSitemapImageUrl,
} from './image-sitemap-utils';

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

function readProduct(value: unknown): Product | null {
    if (!value || typeof value !== 'object') return null;

    const candidate = value as Record<string, unknown>;
    if (
        typeof candidate.slug !== 'string'
        || typeof candidate.brand !== 'string'
        || typeof candidate.categorySlug !== 'string'
    ) {
        return null;
    }

    const images = Array.isArray(candidate.images)
        ? candidate.images.flatMap(image => {
            if (!image || typeof image !== 'object') return [];
            const imageRecord = image as Record<string, unknown>;
            return typeof imageRecord.url === 'string'
                ? [{ url: imageRecord.url }]
                : [];
        })
        : [];

    return {
        slug: candidate.slug,
        brand: candidate.brand,
        categorySlug: candidate.categorySlug,
        images,
    };
}

function mergeImages(primary: ProductImage[] = [], additional: ProductImage[] = []) {
    const merged = new Map<string, ProductImage>();

    for (const image of [...primary, ...additional]) {
        if (typeof image?.url !== 'string') continue;
        const key = image.url.trim();
        if (key && !merged.has(key)) merged.set(key, image);
    }

    return [...merged.values()];
}

function getValidImageUrls(images: ProductImage[] = []) {
    const urls = new Set<string>();

    for (const image of images) {
        const resolvedUrl = resolveSitemapImageUrl(image.url);
        if (resolvedUrl) urls.add(resolvedUrl);
    }

    return [...urls];
}

function appendImageEntry(xml: string, pageUrl: string, imageUrls: string[]) {
    if (imageUrls.length === 0) return xml;

    let entry = `  <url>\n    <loc>${escapeXml(pageUrl)}</loc>\n`;
    for (const imageUrl of imageUrls) {
        entry += `    <image:image>\n      <image:loc>${escapeXml(imageUrl)}</image:loc>\n    </image:image>\n`;
    }
    entry += '  </url>\n';

    return xml + entry;
}

export async function GET() {
    const products = new Map<string, Product>();

    // Exclude products that have permanent redirects in next.config.ts
    const redirectedSlugs = new Set([
        'joyroom-usb-a-lightning-1.2m',
        'joyroom-usb-a-type-c-1.2m',
    ]);

    // Get static products (excluding redirected)
    staticProducts
        .filter(p => !redirectedSlugs.has(p.slug))
        .forEach(product => {
            products.set(product.slug, {
                slug: product.slug,
                brand: product.brand,
                categorySlug: product.categorySlug,
                images: product.images,
            });
        });

    // Get Firebase products (hard 12s ceiling so prerender never stalls the build)
    try {
        const db = await Promise.race([
            getFirestore(),
            new Promise<null>((resolve) => setTimeout(() => resolve(null), 12_000)),
        ]);
        if (db) {
            const snapshot = await Promise.race([
                db.collection('products').get(),
                new Promise<null>((resolve) => setTimeout(() => resolve(null), 12_000)),
            ]);
            snapshot?.docs.forEach(doc => {
                const data = readProduct(doc.data());
                if (!data || redirectedSlugs.has(data.slug)) return;

                const existing = products.get(data.slug);
                if (existing) {
                    // Static catalog routing is authoritative. Firestore may
                    // contribute additional valid images, but never an old
                    // brand/category alias for the page URL.
                    products.set(data.slug, {
                        ...existing,
                        images: mergeImages(existing.images, data.images),
                    });
                    return;
                }

                products.set(data.slug, data);
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
        const imageUrls = Object.entries(discovery.items)
            .filter(([href]) => visibleCategoryHrefs[collection]?.has(href))
            .map(([, item]) => resolveSitemapImageUrl(`${item.imageBase}-800.webp`))
            .filter((url): url is string => Boolean(url));

        for (const localePrefix of ['', '/en']) {
            xml = appendImageEntry(
                xml,
                `${baseUrl}${localePrefix}/${collection}`,
                imageUrls,
            );
        }
    }

    for (const product of products.values()) {
        const productPath = getCanonicalProductPath(product);
        const imageUrls = getValidImageUrls(product.images);
        if (!productPath || imageUrls.length === 0) continue;

        xml = appendImageEntry(xml, `${baseUrl}${productPath}`, imageUrls);
        xml = appendImageEntry(xml, `${baseUrl}/en${productPath}`, imageUrls);
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
