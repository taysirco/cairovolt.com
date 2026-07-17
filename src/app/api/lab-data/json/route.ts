import { NextResponse } from 'next/server';
import { staticProducts } from '@/lib/static-products';
import {
    getMerchantProductUrl,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
} from '@/lib/merchant-product-data';

export const revalidate = 3600;

const BASE_URL = 'https://cairovolt.com';

/**
 * Keeps the established endpoint available as a factual catalogue export.
 * It contains published product fields only; it is not a laboratory dataset.
 */
export async function GET() {
    const items = staticProducts
        .filter(product => (
            product.status === 'active'
            && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(product.slug)
        ))
        .map(product => ({
            slug: product.slug,
            sku: product.sku,
            mpn: product.mpn || null,
            gtin: product.gtin13 || product.gtin || null,
            brand: product.brand,
            category: product.categorySlug,
            name: {
                ar: product.translations.ar.name,
                en: product.translations.en.name,
            },
            price: {
                value: product.price,
                currency: 'EGP',
            },
            availability: product.stock > 0 ? 'in_stock' : 'out_of_stock',
            sourceUrl: getMerchantProductUrl(product),
        }));

    return NextResponse.json({
        name: 'CairoVolt published product catalogue fields',
        methodologyUrl: `${BASE_URL}/lab`,
        description: 'Current catalogue identifiers, names, categories, prices, and availability. This endpoint does not contain laboratory measurements.',
        sourcePolicy: 'Model specifications should be checked against manufacturer documentation for the exact model. Price and availability are CairoVolt catalogue fields and may change.',
        currency: 'EGP',
        itemCount: items.length,
        items,
    }, {
        headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
