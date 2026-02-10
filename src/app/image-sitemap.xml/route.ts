import { NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { staticProducts } from '@/lib/static-products';

const baseUrl = 'https://cairovolt.com';

interface ProductImage {
    url: string;
    alt?: string;
    altAr?: string;
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

    // Get static products
    staticProducts.forEach(product => {
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
        console.warn('Firebase not available for image sitemap, using static only:', error);
        // Continue with static products only
    }

    // Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

    for (const product of products) {
        if (!product.images || product.images.length === 0) continue;

        // Use proper brand casing (Anker, Joyroom)
        const properBrand = product.brand.charAt(0).toUpperCase() + product.brand.slice(1).toLowerCase();
        const productPath = `/${properBrand}/${product.categorySlug}/${product.slug}`;

        // Arabic caption with geo
        const captionAr = (img: ProductImage) => img.altAr
            ? `${img.altAr} - توصيل سريع لجميع محافظات مصر`
            : `${product.translations?.ar?.name || product.slug} اصلي في مصر`;

        // English title with geo
        const titleEn = (img: ProductImage) => img.alt
            ? `${img.alt} - Egypt Original`
            : `${product.translations?.en?.name || product.slug} Original Egypt`;

        // Arabic URL entry (default locale)
        xml += `  <url>
    <loc>${baseUrl}${productPath}</loc>
`;
        for (const image of product.images) {
            const imageUrl = image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`;
            xml += `    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:caption>${escapeXml(captionAr(image))}</image:caption>
      <image:geo_location>Cairo, Egypt</image:geo_location>
      <image:title>${escapeXml(titleEn(image))}</image:title>
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
            xml += `    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:caption>${escapeXml(titleEn(image))}</image:caption>
      <image:geo_location>Cairo, Egypt</image:geo_location>
      <image:title>${escapeXml(titleEn(image))}</image:title>
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
