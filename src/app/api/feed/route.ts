import { NextResponse } from 'next/server';
import { products as staticProducts } from '@/data/seed-products';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';
import {
    getMerchantProductUrl,
    getMerchantGtin,
    normalizeMpn,
    STANDARD_DELIVERY_MAX_DAYS,
    STANDARD_DELIVERY_MIN_DAYS,
    STANDARD_SHIPPING_MAX_EGP,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
} from '@/lib/merchant-product-data';

/**
 * Merchant Center XML Product Feed
 * Google Merchant Center can pull this RSS 2.0 feed to populate the Shopping tab.
 * URL: https://cairovolt.com/api/feed
 *
 * Uses the same version-controlled catalogue that powers product pages,
 * structured data, and server-side checkout price validation. Catalogue
 * availability must be updated before Merchant Center fetches the feed.
 */

interface FeedProduct {
    id: string;
    title: string;
    description: string;
    link: string;
    imageLink: string;
    price: number;
    availability: 'in_stock' | 'out_of_stock';
    brand: string;
    gtin?: string;
    mpn?: string;
    googleCategory?: string;
    productType: string;
    condition: string;
    shippingPrice: number;
    additionalImages: string[];
    highlights: string[];
}

// Google product taxonomy (full text paths) — only confidently-mapped categories;
// google_product_category is optional, product_type always carries our own tree.
const GOOGLE_CATEGORY: Record<string, string> = {
    'wall-chargers': 'Electronics > Electronics Accessories > Power > Power Adapters & Chargers',
    'car-chargers': 'Electronics > Electronics Accessories > Power > Power Adapters & Chargers',
    'power-banks': 'Electronics > Electronics Accessories > Power > Power Adapters & Chargers',
    'cables': 'Electronics > Electronics Accessories > Cables',
    'audio': 'Electronics > Audio > Audio Components > Headphones & Headsets',
    'speakers': 'Electronics > Audio > Audio Components > Speakers',
    // Previously unmapped → no google_product_category was emitted (Merchant tip).
    'car-holders': 'Electronics > Communications > Telephony > Mobile Phone Accessories > Mobile Phone Mounts & Stands',
    'car-accessories': 'Electronics > Communications > Telephony > Mobile Phone Accessories > Mobile Phone Mounts & Stands',
    'smart-watches': 'Electronics > Electronics Accessories > Wearable Technology',
};

/** Strip HTML + entities to clean plain text for the feed description. */
function stripHtmlToText(s: string): string {
    return s
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

// Records without a stable landing page, and documented regional-name aliases,
// are kept out of Merchant so each submitted offer has one unambiguous page.
// Public routes, canonicals and redirects are not changed here.
// Always use static data — the authoritative price source.
// Google Merchant Center must always display correct, current prices.
function getProducts(): FeedProduct[] {
    const activeProducts = staticProducts.filter(
        (p) => p.status === 'active' && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(p.slug),
    );
    const skuCounts = activeProducts.reduce<Map<string, number>>((counts, product) => {
        if (product.sku) counts.set(product.sku, (counts.get(product.sku) || 0) + 1);
        return counts;
    }, new Map());

    return activeProducts.map((p) => {
        const arName = localizeArabicBrandNames(
            p.translations?.ar?.name || p.slug.replace(/-/g, ' '),
        );
        // Rich description: short lead + the full (stripped) body copy that already
        // powers the product page, instead of the ~150-char shortDescription the
        // feed used before (Merchant "add missing details to 26 products"). Reuses
        // the already-neutralized copy verbatim — no new performance claims.
        const arShort = localizeArabicBrandNames(p.translations?.ar?.shortDescription || '');
        const arBody = stripHtmlToText(localizeArabicBrandNames(p.translations?.ar?.description || ''));
        const richDesc = (arBody ? (arShort ? `${arShort}\n\n${arBody}` : arBody) : arShort)
            .trim()
            .substring(0, 2000);
        // Product highlights from the existing feature bullets (strip the leading emoji).
        const features = (p.translations?.ar as { features?: string[] } | undefined)?.features || [];
        const highlights = features
            .map((f) => localizeArabicBrandNames(String(f)).replace(/^[^\p{L}\p{N}]+/u, '').trim())
            .filter(Boolean)
            .slice(0, 10)
            .map((h) => h.substring(0, 150));
        const toAbs = (u: string) => (u.startsWith('http') ? u : `https://cairovolt.com${u}`);
        const primaryImage = p.images?.find((img) => img.isPrimary)?.url || p.images?.[0]?.url || '';
        // All non-primary product images → g:additional_image_link (Google cap 10).
        const additionalImages = (p.images || [])
            .filter((img) => !img.isPrimary && !!img.url)
            .map((img) => toAbs(img.url))
            .filter((u) => u !== toAbs(primaryImage))
            .slice(0, 10);
        const gtin = getMerchantGtin(
            (p as Record<string, unknown>).gtin13 as string | undefined,
            (p as Record<string, unknown>).gtin as string | undefined,
        );
        const mpn = normalizeMpn((p as Record<string, unknown>).mpn as string | undefined);

        return {
            // Preserve established SKU IDs when unique. A slug is used for
            // duplicate catalogue SKUs so every Merchant item keeps a
            // deterministic, collision-free ID.
            id: p.sku && skuCounts.get(p.sku) === 1 ? p.sku : p.slug,
            title: arName.substring(0, 150),
            description: richDesc,
            link: getMerchantProductUrl(p),
            imageLink: primaryImage.startsWith('http')
                ? primaryImage
                : `https://cairovolt.com${primaryImage}`,
            // Submit the current checkout price. A sale_price is only valid
            // when its historical reference price is independently supported.
            price: p.price,
            availability: (p.stock ?? 0) > 0 ? 'in_stock' as const : 'out_of_stock' as const,
            brand: p.brand,
            gtin,
            mpn,
            googleCategory: GOOGLE_CATEGORY[p.categorySlug],
            productType: `CairoVolt > ${p.brand} > ${p.categorySlug.replace(/-/g, ' ')}`,
            condition: 'new',
            // The checkout charges 70-130 EGP by governorate below the
            // threshold. Google explicitly allows a non-excessive
            // overestimate when one nationwide feed rate is required.
            shippingPrice: p.price >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_MAX_EGP,
            additionalImages,
            highlights,
        };
    });
}

// Escape raw text for XML element content (fields not wrapped in CDATA).
// The Google taxonomy paths contain "&" ("Headphones & Headsets") which is
// illegal in XML and aborts Merchant Center parsing at the first occurrence.
function xmlEscape(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function cdataEscape(s: string): string {
    return s.replace(/]]>/g, ']]]]><![CDATA[>');
}

function formatMoney(value: number): string {
    return `${value.toFixed(2)} EGP`;
}

export async function GET() {
    const products = await getProducts();

    const items = products.map(p => `
    <item>
      <g:id>${xmlEscape(p.id)}</g:id>
      <title><![CDATA[${cdataEscape(p.title)}]]></title>
      <description><![CDATA[${cdataEscape(p.description)}]]></description>
      <link>${xmlEscape(p.link)}</link>
      <g:image_link>${xmlEscape(p.imageLink)}</g:image_link>
      ${p.additionalImages.map((u) => `<g:additional_image_link>${xmlEscape(u)}</g:additional_image_link>`).join('\n      ')}
      <g:price>${formatMoney(p.price)}</g:price>
      <g:availability>${p.availability}</g:availability>
      <g:condition>${p.condition}</g:condition>
      <g:brand>${xmlEscape(p.brand)}</g:brand>
      ${p.googleCategory ? `<g:google_product_category>${xmlEscape(p.googleCategory)}</g:google_product_category>` : ''}
      <g:product_type>${xmlEscape(p.productType)}</g:product_type>
      ${p.highlights.map((h) => `<g:product_highlight>${xmlEscape(h)}</g:product_highlight>`).join('\n      ')}
      <g:custom_label_0>CairoVolt Catalog</g:custom_label_0>
      <g:custom_label_1>Cash on Delivery Egypt</g:custom_label_1>
      ${p.gtin ? `<g:gtin>${xmlEscape(p.gtin)}</g:gtin>` : ''}
      ${p.mpn ? `<g:mpn>${xmlEscape(p.mpn)}</g:mpn>` : ''}
      <g:shipping>
        <g:country>EG</g:country>
        <g:service>Standard delivery</g:service>
        <g:price>${formatMoney(p.shippingPrice)}</g:price>
        <g:min_handling_time>0</g:min_handling_time>
        <g:max_handling_time>0</g:max_handling_time>
        <g:min_transit_time>${STANDARD_DELIVERY_MIN_DAYS}</g:min_transit_time>
        <g:max_transit_time>${STANDARD_DELIVERY_MAX_DAYS}</g:max_transit_time>
      </g:shipping>
    </item>`).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>CairoVolt Product Feed</title>
    <link>https://cairovolt.com</link>
    <description>CairoVolt product feed for Google Merchant Center</description>
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
