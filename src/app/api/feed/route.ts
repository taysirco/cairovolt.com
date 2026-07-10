import { NextResponse } from 'next/server';
import { products as staticProducts } from '@/data/seed-products';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';

/**
 * Merchant Center XML Product Feed
 * Google Merchant Center can pull this RSS 2.0 feed to populate the Shopping tab.
 * URL: https://cairovolt.com/api/feed
 *
 * Pulls from static seed data. In production with Firestore,
 * replace with a Firestore query for real-time stock/price accuracy.
 */

interface FeedProduct {
    id: string;
    title: string;
    description: string;
    link: string;
    imageLink: string;
    price: number;
    salePrice?: number;
    availability: 'in stock' | 'out of stock';
    brand: string;
    gtin?: string;
    mpn?: string;
    googleCategory?: string;
    productType: string;
    condition: string;
    shippingPrice: number;
}

// Google product taxonomy (full text paths) — only confidently-mapped categories;
// google_product_category is optional, product_type always carries our own tree.
const GOOGLE_CATEGORY: Record<string, string> = {
    'wall-chargers': 'Electronics > Electronics Accessories > Power > Power Adapters & Chargers',
    'car-chargers': 'Electronics > Electronics Accessories > Power > Power Adapters & Chargers',
    'power-banks': 'Electronics > Electronics Accessories > Power > Power Adapters & Chargers',
    'cables': 'Electronics > Electronics Accessories > Cables',
    'audio': 'Electronics > Audio > Audio Components > Headphones & Headsets',
    'speakers': 'Electronics > Audio > Audio Players & Recorders > Speakers',
};

// Always use static data — the authoritative price source.
// Google Merchant Center must always display correct, current prices.
function getProducts(): FeedProduct[] {
    return staticProducts
        .filter((p) => (p.stock ?? 0) > 0)
        .map((p) => {
            const arName = p.translations?.ar?.name || p.slug.replace(/-/g, ' ');
            const arDesc = p.translations?.ar?.shortDescription || '';
            // Canonical URL path: Soundcore (Anker audio sub-brand) products live
            // under /soundcore/... — /anker/audio/... does not exist and would 404.
            const isSoundcore = (p.categorySlug === 'audio' || p.categorySlug === 'speakers') && p.brand === 'Anker';
            const brandPath = isSoundcore ? 'soundcore' : (p.brand || '').toLowerCase();
            const primaryImage = p.images?.find((img) => img.isPrimary)?.url || p.images?.[0]?.url || '';
            const original = (p as Record<string, unknown>).originalPrice as number | undefined;
            const hasSale = !!original && original > p.price;
            const gtin = ((p as Record<string, unknown>).gtin13 || (p as Record<string, unknown>).gtin) as string | undefined;
            const mpn = (p as Record<string, unknown>).mpn as string | undefined;

            return {
                id: p.sku || p.slug,
                title: arName.substring(0, 150),
                description: arDesc.substring(0, 5000),
                link: `https://cairovolt.com/${brandPath}/${p.categorySlug}/${p.slug}`,
                imageLink: primaryImage.startsWith('http')
                    ? primaryImage
                    : `https://cairovolt.com${primaryImage}`,
                // Sale model mirrors the site: price = pre-discount anchor,
                // sale_price = the actual selling price shown on page.
                price: hasSale ? (original as number) : p.price,
                salePrice: hasSale ? p.price : undefined,
                availability: (p.stock ?? 0) > 0 ? 'in stock' as const : 'out of stock' as const,
                brand: p.brand,
                gtin: gtin || undefined,
                mpn: mpn || undefined,
                googleCategory: GOOGLE_CATEGORY[p.categorySlug],
                productType: isSoundcore
                    ? 'Electronics > Mobile Accessories > Soundcore'
                    : `Electronics > Mobile Accessories > ${p.brand}`,
                condition: 'new',
                shippingPrice: p.price >= FREE_SHIPPING_THRESHOLD ? 0 : 70,
            };
        });
}

export async function GET() {
    const products = await getProducts();

    const items = products.map(p => `
    <item>
      <g:id>${p.id}</g:id>
      <title><![CDATA[${p.title}]]></title>
      <description><![CDATA[${p.description}]]></description>
      <link>${p.link}</link>
      <g:image_link>${p.imageLink}</g:image_link>
      <g:price>${p.price}.00 EGP</g:price>
      ${p.salePrice ? `<g:sale_price>${p.salePrice}.00 EGP</g:sale_price>` : ''}
      <g:availability>${p.availability}</g:availability>
      <g:condition>${p.condition}</g:condition>
      <g:brand>${p.brand}</g:brand>
      ${p.googleCategory ? `<g:google_product_category>${p.googleCategory}</g:google_product_category>` : ''}
      <g:product_type>${p.productType}</g:product_type>
      <g:custom_label_0>CairoVolt Lab Verified</g:custom_label_0>
      <g:custom_label_1>Cash on Delivery Egypt</g:custom_label_1>
      ${p.gtin ? `<g:gtin>${p.gtin}</g:gtin>` : ''}
      ${p.mpn ? `<g:mpn>${p.mpn}</g:mpn>` : ''}
      ${!p.gtin && !p.mpn ? '<g:identifier_exists>false</g:identifier_exists>' : ''}
      <g:shipping>
        <g:country>EG</g:country>
        <g:price>${p.shippingPrice}.00 EGP</g:price>
      </g:shipping>
    </item>`).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>CairoVolt Product Feed</title>
    <link>https://cairovolt.com</link>
    <description>Official product feed for Google Merchant Center</description>
${items}
  </channel>
</rss>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
