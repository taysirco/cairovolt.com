import { NextResponse } from 'next/server';
import { products as staticProducts } from '@/data/seed-products';

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
    availability: 'in stock' | 'out of stock';
    brand: string;
    gtin?: string;
    condition: string;
    shippingPrice: number;
}

// Always use static data — the authoritative price source.
// Google Merchant Center must always display correct, current prices.
function getProducts(): FeedProduct[] {
    return staticProducts
        .filter((p) => (p.stock ?? 0) > 0)
        .map((p) => {
            const arName = p.translations?.ar?.name || p.slug.replace(/-/g, ' ');
            const arDesc = p.translations?.ar?.shortDescription || '';
            const brand = (p.brand || '').toLowerCase();
            const primaryImage = p.images?.find((img) => img.isPrimary)?.url || p.images?.[0]?.url || '';

            return {
                id: p.sku || p.slug,
                title: arName,
                description: arDesc.substring(0, 5000),
                link: `https://cairovolt.com/${brand}/${p.categorySlug}/${p.slug}`,
                imageLink: primaryImage.startsWith('http')
                    ? primaryImage
                    : `https://cairovolt.com${primaryImage}`,
                price: p.price,
                availability: (p.stock ?? 0) > 0 ? 'in stock' as const : 'out of stock' as const,
                brand: p.brand,
                gtin: (p as Record<string, unknown>).gtin as string | undefined,
                condition: 'new',
                shippingPrice: p.price >= 1350 ? 0 : 40,
            };
        });
}

export async function GET() {
    const products = await getProducts();

    // Price validity window — indicates offer is current (expires tomorrow)
    const priceValidUntil = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const items = products.map(p => `
    <item>
      <g:id>${p.id}</g:id>
      <title><![CDATA[${p.title}]]></title>
      <description><![CDATA[${p.description}]]></description>
      <link>${p.link}</link>
      <g:image_link>${p.imageLink}</g:image_link>
      <g:price>${p.price}.00 EGP</g:price>
      <g:sale_price_effective_date>${new Date().toISOString().split('T')[0]}/${priceValidUntil}</g:sale_price_effective_date>
      <g:availability>${p.availability}</g:availability>
      <g:condition>${p.condition}</g:condition>
      <g:brand>${p.brand}</g:brand>
      <g:product_type>Electronics > Mobile Accessories > ${p.brand}</g:product_type>
      <g:custom_label_0>CairoVolt Lab Verified</g:custom_label_0>
      <g:custom_label_1>Cash on Delivery Egypt</g:custom_label_1>
      ${p.gtin ? `<g:gtin>${p.gtin}</g:gtin>` : ''}
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
