import { NextResponse } from 'next/server';
import { staticProducts } from '@/lib/static-products';
import {
    getMerchantProductUrl,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
} from '@/lib/merchant-product-data';
import { getAgentLabSummary } from '@/lib/agent-lab-export';

export const revalidate = 3600;

function csvCell(value: string | number | null | undefined): string {
    const normalized = String(value ?? '').replace(/[\r\n]+/g, ' ').trim();
    return `"${normalized.replace(/"/g, '""')}"`;
}

/**
 * CSV catalogue + compact lab fields for spreadsheet / agent ingest.
 * Nested result tables live in /api/lab-data/json — CSV stays flat.
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
        'has_bench',
        'verdict_en',
        'verdict_ar',
        'ai_tldr_en',
        'ai_tldr_ar',
        'test_date',
        'sample_id',
    ];

    const rows = staticProducts
        .filter(product => (
            product.status === 'active'
            && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(product.slug)
        ))
        .map(product => {
            const labEn = getAgentLabSummary(product.slug, 'en');
            const labAr = getAgentLabSummary(product.slug, 'ar');
            return [
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
                labEn?.hasBench || labAr?.hasBench ? 'yes' : 'no',
                labEn?.verdict || '',
                labAr?.verdict || '',
                (labEn?.aiTldr || []).slice(0, 3).join(' | '),
                (labAr?.aiTldr || []).slice(0, 3).join(' | '),
                labEn?.testDate || labAr?.testDate || '',
                labEn?.sampleId || labAr?.sampleId || '',
            ].map(csvCell).join(',');
        });

    const csv = [headers.map(csvCell).join(','), ...rows].join('\n');

    return new NextResponse(csv, {
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename="cairovolt-lab-catalogue.csv"',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
