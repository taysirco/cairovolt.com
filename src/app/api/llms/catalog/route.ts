import { staticProducts } from '@/lib/static-products';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';
import {
    getMerchantGtin,
    getMerchantProductUrl,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
} from '@/lib/merchant-product-data';
import { getAgentLabSummary } from '@/lib/agent-lab-export';

/**
 * Compact Markdown catalog for assistants and other machine clients.
 * Prices and availability come from the same product records used by the site.
 * Lab verdict / aiTldr are appended only when a published bench sheet exists.
 */
export const revalidate = 3600;

function cleanMarkdown(value: string | undefined): string {
    return (value || '').replace(/\s+/g, ' ').trim();
}

export async function GET() {
    const baseUrl = 'https://cairovolt.com';
    const updated = new Date().toISOString().split('T')[0];
    const publishedProducts = staticProducts.filter(product =>
        product.status === 'active'
        && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(product.slug)
    );
    const categories = Array.from(new Set(publishedProducts.map(product => product.categorySlug)));

    let markdown = '# CairoVolt Product Catalog\n\n';
    markdown += `> Current CairoVolt catalog snapshot. Updated ${updated}.\n`;
    markdown += `> Product pages remain the source of truth for current price and availability.\n`;
    markdown += `> Full lab rows: ${baseUrl}/api/lab-data/json · Accept: text/markdown on product URLs.\n\n`;

    for (const category of categories) {
        markdown += `## ${category.replace(/-/g, ' ').toUpperCase()}\n\n`;

        for (const product of publishedProducts.filter(item => item.categorySlug === category)) {
            const url = getMerchantProductUrl(product);
            const name = cleanMarkdown(product.translations.en.name);
            const description = cleanMarkdown(product.translations.en.shortDescription);
            const arabicDescription = localizeArabicBrandNames(cleanMarkdown(product.translations.ar.shortDescription));
            const gtin = getMerchantGtin(product.gtin13, product.gtin);
            const labEn = getAgentLabSummary(product.slug, 'en');
            const labAr = getAgentLabSummary(product.slug, 'ar');

            markdown += `### [${name}](${url})\n\n`;
            markdown += `- Brand: ${product.brand}\n`;
            markdown += `- Price: ${product.price} EGP\n`;
            markdown += `- Availability: ${product.stock > 0 ? 'In stock' : 'Out of stock'}\n`;
            if (product.sku) markdown += `- SKU: ${product.sku}\n`;
            if (gtin) markdown += `- GTIN/EAN: ${gtin}\n`;
            if (description) markdown += `- Description: ${description}\n`;
            if (arabicDescription) markdown += `- الوصف: ${arabicDescription}\n`;
            if (labEn?.verdict) markdown += `- Lab verdict: ${cleanMarkdown(labEn.verdict)}\n`;
            if (labEn?.aiTldr?.length) {
                markdown += `- Agent TL;DR: ${labEn.aiTldr.slice(0, 3).map(cleanMarkdown).join(' · ')}\n`;
            }
            if (labAr?.verdict) markdown += `- خلاصة المختبر: ${cleanMarkdown(labAr.verdict)}\n`;
            if (labAr?.aiTldr?.length) {
                markdown += `- خلاصة للوكلاء: ${labAr.aiTldr.slice(0, 3).map(cleanMarkdown).join(' · ')}\n`;
            }
            markdown += `- Product page: ${url}\n\n`;
        }
    }

    markdown += `---\n\n`;
    markdown += `API description: ${baseUrl}/api/openapi.json\n`;
    markdown += `Lab export: ${baseUrl}/api/lab-data/json\n`;

    return new Response(markdown, {
        status: 200,
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
