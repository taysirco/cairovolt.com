/**
 * Shared lab/AEO export helpers for AI agents and machine surfaces.
 * Pulls bilingual aiTldr + benchTest verdict/results from ProductDetail —
 * the same source HTML PDPs render — without inventing measurements.
 */
import type { LocalizedText, ProductDetail } from '@/data/details/_types';
import { getProductDetail } from '@/data/product-details';

export type AgentLocale = 'ar' | 'en';

export function localizeAgentText(value: LocalizedText | undefined, locale: AgentLocale): string {
    if (value == null) return '';
    if (typeof value === 'string') return value.trim();
    return (locale === 'ar' ? value.ar : value.en).trim();
}

export interface AgentLabSummary {
    slug: string;
    hasBench: boolean;
    aiTldr: string[];
    verdict: string;
    testDate?: string;
    engineer?: string;
    sampleId?: string;
    sku?: string;
    /** Cap results so machine payloads stay answer-first, not dump-sized. */
    keyResults: Array<{
        param: string;
        rated: string;
        measured: string;
        note: string;
    }>;
    methodology: string;
    pros: string[];
    limits: string[];
}

const MAX_RESULTS = 8;

export function buildAgentLabSummary(
    slug: string,
    detail: ProductDetail | undefined,
    locale: AgentLocale,
    options?: { maxResults?: number },
): AgentLabSummary | null {
    if (!detail) return null;
    const maxResults = options?.maxResults ?? MAX_RESULTS;
    const aiTldr = (detail.aiTldr?.[locale] || []).map(s => s.trim()).filter(Boolean);
    const bench = detail.benchTest;
    const verdict = localizeAgentText(bench?.verdict, locale);
    const keyResults = (bench?.results || []).slice(0, maxResults).map(row => ({
        param: localizeAgentText(row.param, locale),
        rated: localizeAgentText(row.rated, locale),
        measured: localizeAgentText(row.measured, locale),
        note: localizeAgentText(row.note, locale),
    }));

    if (!aiTldr.length && !verdict && !keyResults.length) return null;

    return {
        slug,
        hasBench: Boolean(bench),
        aiTldr,
        verdict,
        testDate: bench?.testDate,
        engineer: localizeAgentText(bench?.engineer, locale) || undefined,
        sampleId: bench?.sampleId,
        sku: bench?.sku,
        keyResults,
        methodology: localizeAgentText(bench?.methodology, locale),
        pros: (bench?.pros || []).map(p => localizeAgentText(p, locale)).filter(Boolean),
        limits: (bench?.limits || []).map(p => localizeAgentText(p, locale)).filter(Boolean),
    };
}

export function getAgentLabSummary(
    slug: string,
    locale: AgentLocale = 'en',
    options?: { maxResults?: number },
): AgentLabSummary | null {
    return buildAgentLabSummary(slug, getProductDetail(slug), locale, options);
}

/** Compact markdown block for product MD / llms-full / catalog. */
export function formatAgentLabMarkdown(
    summary: AgentLabSummary,
    locale: AgentLocale,
): string {
    const isAr = locale === 'ar';
    const lines: string[] = [];

    if (summary.aiTldr.length) {
        lines.push(isAr ? '## خلاصة للوكلاء (aiTldr)' : '## Agent TL;DR (aiTldr)');
        lines.push('');
        for (const bullet of summary.aiTldr) {
            lines.push(`- ${bullet}`);
        }
        lines.push('');
    }

    if (summary.verdict || summary.hasBench) {
        lines.push(isAr ? '## خلاصة المختبر' : '## Lab verdict');
        lines.push('');
        if (summary.verdict) lines.push(summary.verdict);
        const meta: string[] = [];
        if (summary.sku) meta.push(`SKU ${summary.sku}`);
        if (summary.sampleId) meta.push(summary.sampleId);
        if (summary.testDate) meta.push(summary.testDate);
        if (summary.engineer) meta.push(summary.engineer);
        if (meta.length) lines.push(`\n_${meta.join(' · ')}_`);
        lines.push('');
    }

    if (summary.keyResults.length) {
        lines.push(isAr ? '## قياسات مختارة' : '## Key measured results');
        lines.push('');
        lines.push(
            isAr
                ? '| المقياس | المصنّع | قِسناه |'
                : '| Metric | Rated | Measured |',
        );
        lines.push('|---|---|---|');
        for (const row of summary.keyResults) {
            const param = row.param.replace(/\|/g, '/') || '—';
            const rated = (row.rated || '—').replace(/\|/g, '/');
            const measured = (row.measured || '—').replace(/\|/g, '/');
            lines.push(`| ${param} | ${rated} | ${measured} |`);
        }
        lines.push('');
    }

    if (summary.pros.length || summary.limits.length) {
        if (summary.pros.length) {
            lines.push(isAr ? '### نقاط قوة مقاسة' : '### Measured strengths');
            lines.push('');
            for (const p of summary.pros.slice(0, 5)) lines.push(`- ${p}`);
            lines.push('');
        }
        if (summary.limits.length) {
            lines.push(isAr ? '### حدود / تحفظات' : '### Limits / caveats');
            lines.push('');
            for (const p of summary.limits.slice(0, 5)) lines.push(`- ${p}`);
            lines.push('');
        }
    }

    return lines.join('\n').trim();
}
