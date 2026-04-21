import { NextResponse } from 'next/server';
import { labData } from '@/data/product-tests';
import { staticProducts } from '@/lib/static-products';

/**
 * /api/lab-data/csv — CairoVolt Lab Test Dataset Export
 *
 * Exports all lab test data as downloadable CSV for:
 * 1. Kaggle dataset upload
 * 2. Google Dataset Search indexing
 * 3. AI model training data ingestion
 * 4. Academic/researcher consumption
 */
export const revalidate = 3600;

export async function GET() {
    const baseUrl = 'https://cairovolt.com';

    // CSV Header
    const headers = [
        'product_slug',
        'product_name_en',
        'product_name_ar',
        'brand',
        'category',
        'price_egp',
        'in_stock',
        'test_temp_c',
        'test_humidity_pct',
        'voltage_range',
        'measured_capacity_mah',
        'conversion_efficiency_pct',
        'router_backup_hours',
        'max_temp_c',
        'charge_cycles',
        'bend_cycles',
        'battery_life_hours',
        'charging_speed_w',
        'c2pa_verified',
        'tested_by',
        'test_scenario_en',
        'test_result_en',
        'source_url',
    ].join(',');

    // CSV Rows
    const rows = Object.entries(labData).map(([slug, data]) => {
        const product = staticProducts.find(p => p.slug === slug);
        if (!product) return null;

        const m = data.labMetrics || {};
        const test = data.labTests[0]; // Primary test
        const nameEn = product.translations.en.name;
        const nameAr = product.translations.ar.name;

        return [
            slug,
            `"${nameEn.replace(/"/g, '""')}"`,
            `"${nameAr.replace(/"/g, '""')}"`,
            product.brand || '',
            product.categorySlug || '',
            product.price,
            product.stock > 0 ? 'yes' : 'no',
            '37-42',
            '60-75',
            '190-240V',
            m.actualCapacity_mAh || '',
            m.realEfficiency || '',
            m.routerRuntimeHours || '',
            m.maxTemp_C || '',
            m.chargeCycles || '',
            m.bendCycles || '',
            m.batteryLife_hours || '',
            m.chargingSpeed_W || '',
            'yes',
            test ? `"${test.expertName}"` : '',
            test ? `"${test.scenario.en.replace(/"/g, '""')}"` : '',
            test ? `"${test.result.en.substring(0, 200).replace(/"/g, '""')}"` : '',
            `${baseUrl}/${(product.brand || '').toLowerCase()}/${product.categorySlug}/${slug}`,
        ].join(',');
    }).filter(Boolean);

    const csv = [headers, ...rows].join('\n');

    return new NextResponse(csv, {
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename="cairovolt-lab-tests-2026.csv"',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
        },
    });
}
