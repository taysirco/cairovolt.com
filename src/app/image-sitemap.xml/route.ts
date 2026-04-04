import { NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { staticProducts } from '@/lib/static-products';
import { logger } from '@/lib/logger';

const baseUrl = 'https://cairovolt.com';

// Category-aware geo_location — synced with ProductImage.tsx & ImageObjectSchema.tsx
function getGeoForCategory(cat: string): string {
    const c = cat.toLowerCase();
    if (c.includes('power') || c.includes('bank') || c.includes('battery')) return 'New Damietta, Egypt';
    if (c.includes('charger') || c.includes('charg') || c.includes('adapter') || c.includes('wall')) return 'New Cairo, Egypt';
    if (c.includes('cable') || c.includes('cord') || c.includes('wire') || c.includes('holder') || c.includes('car-') || c.includes('mount')) return '6th of October City, Egypt';
    if (c.includes('speaker') || c.includes('audio') || c.includes('earb') || c.includes('head') || c.includes('sound') || c.includes('watch')) return 'Nasr City, Cairo, Egypt';
    return 'Cairo, Egypt';
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
    translations?: {
        en?: { name?: string };
        ar?: { name?: string };
    };
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
                translations: product.translations,
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
                    translations: data.translations,
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

    for (const product of products) {
        if (!product.images || product.images.length === 0) continue;

        // IMPORTANT: Keep brand fully lowercase to match actual Next.js routes
        const brandSlug = product.brand.toLowerCase();
        const categorySlug = product.categorySlug.toLowerCase();
        const productPath = `/${brandSlug}/${categorySlug}/${product.slug}`;

        const productNameEn = product.translations?.en?.name || product.slug;
        const productNameAr = product.translations?.ar?.name || product.slug;

        // Arabic URL entry (default locale)
        xml += `  <url>
    <loc>${baseUrl}${productPath}</loc>
`;
        for (const image of product.images) {
            const imageUrl = image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`;
            // Use the real per-image alt text — falls back to product name + angle label
            const imgIndex = (image.order ?? 0) + 1;
            const captionAr = image.alt
                ? escapeXml(image.alt)
                : escapeXml(`${productNameAr} - صورة ${imgIndex} - كايرو فولت مصر`);
            const titleEn = image.alt
                ? escapeXml(image.alt)
                : escapeXml(`${productNameEn} - Image ${imgIndex} - CairoVolt Egypt`);

            xml += `    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:caption>${captionAr}</image:caption>
      <image:title>${titleEn}</image:title>
      <image:geo_location>${escapeXml(getGeoForCategory(product.categorySlug))}</image:geo_location>
      <image:license>${baseUrl}/en/return-policy</image:license>
    </image:image>
`;
        }
        xml += `  </url>
`;

        // English URL entry
        xml += `  <url>
    <loc>${baseUrl}/en${productPath}</loc>
`;
        for (const image of product.images) {
            const imageUrl = image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`;
            const imgIndex = (image.order ?? 0) + 1;
            const titleEn = image.alt
                ? escapeXml(image.alt)
                : escapeXml(`${productNameEn} - Image ${imgIndex} - CairoVolt Egypt`);

            xml += `    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:caption>${titleEn}</image:caption>
      <image:title>${titleEn}</image:title>
      <image:geo_location>${escapeXml(getGeoForCategory(product.categorySlug))}</image:geo_location>
      <image:license>${baseUrl}/en/return-policy</image:license>
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

function escapeXml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
