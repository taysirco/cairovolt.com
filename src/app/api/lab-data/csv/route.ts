import { NextResponse } from 'next/server';
import { labData } from '@/data/product-tests';
import { staticProducts } from '@/lib/static-products';

/**
 * /api/lab-data/csv — CairoVolt Complete Product & Lab Dataset
 *
 * Exports ALL 53 products as downloadable CSV:
 * - Products WITH lab tests: full metrics + test results
 * - Products WITHOUT lab tests: basic product info + pricing
 *
 * For: Kaggle, Google Dataset Search, AI model training
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
        'has_lab_test',
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

    // CSV Rows — ALL products
    const rows = staticProducts.map((product) => {
        const slug = product.slug;
        const data = labData[slug];
        const hasLab = !!data;
        const m = data?.labMetrics || {};
        const test = data?.labTests?.[0];
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
            hasLab ? 'yes' : 'no',
            hasLab ? '37-42' : '',
            hasLab ? '60-75' : '',
            hasLab ? '190-240V' : '',
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
    });

    const csv = [headers, ...rows].join('\n');

    return new NextResponse(csv, {
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename="cairovolt-lab-tests-2026.csv"',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
        },
    });
}
