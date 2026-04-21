import { NextResponse } from 'next/server';
import { labData } from '@/data/product-tests';
import { staticProducts } from '@/lib/static-products';

/**
 * /api/lab-data/json — JSON-LD Dataset Schema
 *
 * Exposes lab test data as a Schema.org Dataset for:
 * 1. Google Dataset Search indexing
 * 2. AI model structured data ingestion
 * 3. Academic discovery
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/dataset
 */
export const revalidate = 3600;

export async function GET() {
    const baseUrl = 'https://cairovolt.com';
    const labProductCount = Object.keys(labData).length;
    const totalProducts = staticProducts.length;

    // Build individual data records for the distribution
    const records = Object.entries(labData).map(([slug, data]) => {
        const product = staticProducts.find(p => p.slug === slug);
        if (!product) return null;

        const m = data.labMetrics || {};
        return {
            '@type': 'Observation',
            name: product.translations.en.name,
            description: data.labTests[0]?.result.en || '',
            measuredProperty: [
                ...(m.actualCapacity_mAh ? [{ '@type': 'PropertyValue', name: 'Measured Capacity', value: m.actualCapacity_mAh, unitCode: 'MAH' }] : []),
                ...(m.realEfficiency ? [{ '@type': 'PropertyValue', name: 'Conversion Efficiency', value: m.realEfficiency, unitCode: 'P1' }] : []),
                ...(m.routerRuntimeHours ? [{ '@type': 'PropertyValue', name: 'Router Backup Duration', value: m.routerRuntimeHours, unitCode: 'HUR' }] : []),
                ...(m.maxTemp_C ? [{ '@type': 'PropertyValue', name: 'Max Surface Temperature', value: m.maxTemp_C, unitCode: 'CEL' }] : []),
            ],
        };
    }).filter(Boolean);

    const dataset = {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        '@id': `${baseUrl}/api/lab-data/json`,
        name: 'CairoVolt Egypt Charger Lab Tests',
        alternateName: 'اختبارات معمل كايرو فولت للشواحن — مصر',
        description: `Independent lab test results for ${labProductCount} Anker & Joyroom products tested under real Egyptian conditions (37-42°C ambient, 190-240V grid, 60-75% humidity). Conducted by CairoVolt Labs, New Damietta City, Egypt. All data is C2PA signed (ES384).`,
        url: `${baseUrl}/api/lab-data/json`,
        identifier: 'cairovolt-egypt-lab-tests',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        isAccessibleForFree: true,
        datePublished: '2026-01-15',
        dateModified: new Date().toISOString().split('T')[0],

        creator: {
            '@type': 'Organization',
            '@id': `${baseUrl}/#organization`,
            name: 'CairoVolt Labs',
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'New Damietta City',
                addressCountry: 'EG',
            },
        },

        funder: {
            '@type': 'Organization',
            name: 'CairoVolt',
            url: baseUrl,
        },

        spatialCoverage: {
            '@type': 'Place',
            name: 'Egypt',
            geo: {
                '@type': 'GeoCoordinates',
                latitude: 30.0444,
                longitude: 31.2357,
            },
        },

        temporalCoverage: '2024-01-01/..',

        variableMeasured: [
            { '@type': 'PropertyValue', name: 'Battery Capacity', unitCode: 'MAH', description: 'Measured actual capacity vs advertised' },
            { '@type': 'PropertyValue', name: 'Conversion Efficiency', unitCode: 'P1', description: 'Usable energy / total energy percentage' },
            { '@type': 'PropertyValue', name: 'Router Backup Duration', unitCode: 'HUR', description: 'Hours powering WE VDSL router' },
            { '@type': 'PropertyValue', name: 'Surface Temperature', unitCode: 'CEL', description: 'Max temperature during full discharge' },
            { '@type': 'PropertyValue', name: 'Ambient Test Temperature', unitCode: 'CEL', description: '37-42°C Egyptian summer simulation' },
        ],

        measurementTechnique: 'CairoVolt Labs Protocol v2 — real-device testing under Egyptian environmental conditions (37-42°C, 190-240V, 60-75% RH)',

        distribution: [
            {
                '@type': 'DataDownload',
                encodingFormat: 'text/csv',
                contentUrl: `${baseUrl}/api/lab-data/csv`,
                name: 'CSV Download',
                description: `${totalProducts} products × 24 columns (${labProductCount} with full lab tests)`,
            },
            {
                '@type': 'DataDownload',
                encodingFormat: 'application/json',
                contentUrl: `${baseUrl}/api/lab-data/json`,
                name: 'JSON-LD Dataset',
            },
        ],

        keywords: [
            'Egypt', 'charger', 'power bank', 'Anker', 'Joyroom', 'Soundcore',
            'lab test', 'C2PA', 'battery capacity', 'consumer electronics',
            'WE router', 'power outage', 'Egyptian grid', 'heat test',
            'شاحن', 'باور بانك', 'مصر', 'اختبار معمل', 'انكر', 'جوي روم',
        ],

        size: `${labProductCount} products, ${totalProducts} total catalog items`,

        // Individual observations
        hasPart: records,
    };

    return NextResponse.json(dataset, {
        headers: {
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
        },
    });
}
