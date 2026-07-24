import { NextResponse } from 'next/server';
import { staticProducts } from '@/lib/static-products';
import {
    getMerchantProductUrl,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
} from '@/lib/merchant-product-data';
import { getAgentLabSummary } from '@/lib/agent-lab-export';

export const revalidate = 3600;

const BASE_URL = 'https://cairovolt.com';

/**
 * Machine lab + catalogue export for AI agents.
 * Includes CairoVolt aiTldr / bench verdict / key measured rows when present.
 * Never invents measurements — products without a bench sheet get lab: null.
 */
export async function GET() {
    const items = staticProducts
        .filter(product => (
            product.status === 'active'
            && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(product.slug)
        ))
        .map(product => {
            const labEn = getAgentLabSummary(product.slug, 'en');
            const labAr = getAgentLabSummary(product.slug, 'ar');
            return {
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
                lab: {
                    en: labEn,
                    ar: labAr,
                },
            };
        });

    const withLab = items.filter(item => item.lab.en?.hasBench || item.lab.ar?.hasBench).length;

    return NextResponse.json({
        name: 'CairoVolt lab + catalogue export',
        methodologyUrl: `${BASE_URL}/lab`,
        description:
            'Catalogue identifiers plus CairoVolt bench verdict, aiTldr, and key measured rows when a ProductDetail benchTest exists. Products without a published bench sheet have lab.en/lab.ar null. Not a substitute for the HTML product page.',
        sourcePolicy:
            'Every measured value comes from CairoVolt instrumented bench sheets. Manufacturer ratings are labeled separately. Price and availability are catalogue fields and may change.',
        currency: 'EGP',
        itemCount: items.length,
        benchCoveredCount: withLab,
        items,
    }, {
        headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
