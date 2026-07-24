/**
 * Shared CairoVolt measured-lab index for HTML /lab and agent markdown.
 * Rows come only from published ProductDetail.benchTest sheets — never invented.
 */
import { cache } from 'react';
import { staticProducts } from '@/lib/static-products';
import {
    getMerchantProductUrl,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
} from '@/lib/merchant-product-data';
import { localizeArabicBrandNames, getBrandDisplayName } from '@/lib/arabic-brand-names';
import { getAgentLabSummary, type AgentLocale } from '@/lib/agent-lab-export';

export interface LabIndexRow {
    slug: string;
    sku: string;
    brand: string;
    categorySlug: string;
    nameEn: string;
    nameAr: string;
    price: number;
    inStock: boolean;
    productUrlAr: string;
    productUrlEn: string;
    testDate: string;
    sampleId: string;
    benchSku: string;
    verdictEn: string;
    verdictAr: string;
    aiTldrEn: string[];
    aiTldrAr: string[];
}

function buildLabIndexRows(): LabIndexRow[] {
    const rows: LabIndexRow[] = [];

    for (const product of staticProducts) {
        if (product.status !== 'active') continue;
        if (MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(product.slug)) continue;

        const labEn = getAgentLabSummary(product.slug, 'en');
        if (!labEn?.hasBench) continue;
        const labAr = getAgentLabSummary(product.slug, 'ar');

        rows.push({
            slug: product.slug,
            sku: product.sku || labEn.sku || '—',
            brand: product.brand,
            categorySlug: product.categorySlug,
            nameEn: product.translations.en.name,
            nameAr: localizeArabicBrandNames(product.translations.ar.name),
            price: product.price,
            inStock: product.stock > 0,
            productUrlAr: getMerchantProductUrl(product, 'ar'),
            productUrlEn: getMerchantProductUrl(product, 'en'),
            testDate: labEn.testDate || '',
            sampleId: labEn.sampleId || '',
            benchSku: labEn.sku || product.sku || '',
            verdictEn: labEn.verdict || '',
            verdictAr: labAr?.verdict || labEn.verdict || '',
            aiTldrEn: labEn.aiTldr || [],
            aiTldrAr: labAr?.aiTldr || [],
        });
    }

    return rows.sort((a, b) => {
        const brandCmp = a.brand.localeCompare(b.brand);
        if (brandCmp !== 0) return brandCmp;
        const dateCmp = (b.testDate || '').localeCompare(a.testDate || '');
        if (dateCmp !== 0) return dateCmp;
        return a.nameEn.localeCompare(b.nameEn);
    });
}

/** Request-memoized builder (React cache) — safe for metadata + page + markdown. */
export const getLabIndexRows = cache(buildLabIndexRows);

/** Group measured rows by brand for HTML + agent scanability. */
export function groupLabIndexByBrand(rows: LabIndexRow[]): Array<{ brand: string; rows: LabIndexRow[] }> {
    const map = new Map<string, LabIndexRow[]>();
    for (const row of rows) {
        const list = map.get(row.brand) || [];
        list.push(row);
        map.set(row.brand, list);
    }
    return [...map.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([brand, brandRows]) => ({ brand, rows: brandRows }));
}

export function formatLabIndexMarkdown(
    locale: AgentLocale,
    rowsInput?: LabIndexRow[],
): string {
    const isAr = locale === 'ar';
    const rows = rowsInput ?? getLabIndexRows();
    const groups = groupLabIndexByBrand(rows);
    const lines: string[] = [];

    lines.push(isAr ? '## فهرس القياسات المنشورة' : '## Published measured index');
    lines.push('');
    lines.push(
        isAr
            ? `عدد المنتجات ذات تقرير مختبر منشور: **${rows.length}** عبر **${groups.length}** علامات. المصدر: أوراق ProductDetail.benchTest — بدون أرقام مخترعة.`
            : `Products with a published CairoVolt bench sheet: **${rows.length}** across **${groups.length}** brands. Source: ProductDetail.benchTest sheets — no invented numbers.`,
    );
    lines.push('');

    for (const group of groups) {
        lines.push(`### ${getBrandDisplayName(group.brand, locale)} (${group.rows.length})`);
        lines.push('');
        lines.push(
            isAr
                ? '| SKU | المنتج | الخلاصة | التاريخ | الصفحة |'
                : '| SKU | Product | Verdict | Date | Page |',
        );
        lines.push('|---|---|---|---|---|');

        for (const row of group.rows) {
            const name = isAr ? row.nameAr : row.nameEn;
            const verdict = (isAr ? row.verdictAr : row.verdictEn)
                .replace(/\|/g, '/')
                .replace(/\s+/g, ' ')
                .trim()
                .slice(0, 160);
            const url = isAr ? row.productUrlAr : row.productUrlEn;
            const sku = (row.benchSku || row.sku || '—').replace(/\|/g, '/');
            lines.push(
                `| ${sku} | [${name.replace(/\|/g, '/')}](${url}) | ${verdict || '—'} | ${row.testDate || '—'} | [PDP](${url}) |`,
            );
        }
        lines.push('');
    }

    lines.push(
        isAr
            ? `تصدير JSON: https://cairovolt.com/api/lab-data/json · CSV: https://cairovolt.com/api/lab-data/csv · الصفحة البشرية: https://cairovolt.com/lab`
            : `JSON export: https://cairovolt.com/api/lab-data/json · CSV: https://cairovolt.com/api/lab-data/csv · Human index: https://cairovolt.com/en/lab`,
    );

    return lines.join('\n');
}
