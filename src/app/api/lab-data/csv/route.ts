import { NextResponse } from 'next/server';
import { staticProducts } from '@/lib/static-products';
import {
    getMerchantProductUrl,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
} from '@/lib/merchant-product-data';

export const revalidate = 3600;

function csvCell(value: string | number | null | undefined): string {
    const normalized = String(value ?? '').replace(/[\r\n]+/g, ' ').trim();
    return `"${normalized.replace(/"/g, '""')}"`;
}

/**
 * Backward-compatible CSV export of maintained catalogue fields.
 * No inferred measurements, test results, people, or provenance claims are
 * included.
 */
export async function GET() {
    const headers = [
        'product_slug',
        'sku',
        'mpn',
        'gtin',
        'product_name_en',
        'product_name_ar',
        'brand',
        'category',
        'price_egp',
        'availability',
        'source_url',
    ];

    const rows = staticProducts
        .filter(product => (
            product.status === 'active'
            && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(product.slug)
        ))
        .map(product => [
            product.slug,
            product.sku,
            product.mpn,
            product.gtin13 || product.gtin,
            product.translations.en.name,
            product.translations.ar.name,
            product.brand,
            product.categorySlug,
            product.price,
            product.stock > 0 ? 'in_stock' : 'out_of_stock',
            getMerchantProductUrl(product),
        ].map(csvCell).join(','));

    const csv = [headers.map(csvCell).join(','), ...rows].join('\n');

    return new NextResponse(csv, {
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename="cairovolt-published-product-catalogue.csv"',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
