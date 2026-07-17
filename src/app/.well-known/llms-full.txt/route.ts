import { NextResponse } from 'next/server';
import { staticProducts } from '@/lib/static-products';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';
import {
    getMerchantGtin,
    getMerchantProductUrl,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
} from '@/lib/merchant-product-data';

/**
 * Detailed machine-readable product reference generated from the same static
 * catalog used by the storefront.
 */
export const revalidate = 3600;

function clean(value: string | undefined): string {
    return (value || '').replace(/\s+/g, ' ').trim();
}

export function GET() {
    const baseUrl = 'https://cairovolt.com';
    const publishedProducts = staticProducts.filter(product =>
        product.status === 'active'
        && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(product.slug)
    );
    const available = publishedProducts.filter(product => product.stock > 0);
    const updated = new Date().toISOString().split('T')[0];

    const productSections = publishedProducts.map(product => {
        const brand = product.brand || 'Unknown';
        const category = product.categorySlug || 'general';
        const url = getMerchantProductUrl(product);
        const descriptionEn = clean(product.translations.en.shortDescription || product.translations.en.description);
        const descriptionAr = localizeArabicBrandNames(clean(product.translations.ar.shortDescription || product.translations.ar.description));
        const featuresEn = (product.translations.en.features || []).map(feature => clean(feature)).filter(Boolean);
        const featuresAr = (product.translations.ar.features || []).map(feature => localizeArabicBrandNames(clean(feature))).filter(Boolean);
        const gtin = getMerchantGtin(product.gtin13, product.gtin);

        let section = `## ${clean(product.translations.en.name)}\n\n`;
        section += `- Arabic name: ${localizeArabicBrandNames(clean(product.translations.ar.name))}\n`;
        section += `- Brand: ${brand}\n`;
        section += `- Category: ${category}\n`;
        section += `- Price: ${product.price} EGP\n`;
        section += `- Availability: ${product.stock > 0 ? 'In stock' : 'Out of stock'}\n`;
        if (product.sku) section += `- SKU: ${product.sku}\n`;
        if (gtin) section += `- GTIN/EAN: ${gtin}\n`;
        if (descriptionEn) section += `- Description: ${descriptionEn}\n`;
        if (descriptionAr) section += `- الوصف: ${descriptionAr}\n`;
        if (featuresEn.length) section += `- Features: ${featuresEn.join('; ')}\n`;
        if (featuresAr.length) section += `- المميزات: ${featuresAr.join('؛ ')}\n`;
        section += `- Product page: ${url}\n`;
        return section;
    }).join('\n');

    const content = `# CairoVolt Detailed Catalog Reference
# مرجع كتالوج كايرو فولت

> Generated from the storefront catalog. Updated ${updated}.
> Product pages are the source of truth for current price, availability, warranty, delivery, and return terms.

## Catalog Summary

- Total products: ${publishedProducts.length}
- Currently listed as available: ${available.length}
- Currency: EGP
- Arabic catalog: ${baseUrl}
- English catalog: ${baseUrl}/en
- Compact machine catalog: ${baseUrl}/api/llms/catalog

## Warranty Serial Scope

The form at ${baseUrl}/verify and POST ${baseUrl}/api/verify check CairoVolt warranty-card serials. A successful response confirms a CairoVolt-issued serial and CairoVolt warranty record only; it is not a manufacturer authenticity certificate.

${productSections}
`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
