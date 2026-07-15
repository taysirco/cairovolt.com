import { sanitizeHtml, localizeInternalLinks, translateAnchorTexts } from '@/lib/htmlSanitize';
import { localizeArabicBrandHtml } from '@/lib/arabic-brand-names';

interface BlogContentRendererProps {
    html: string;
    className?: string;
    locale?: string;
}

/**
 * BlogContentRenderer — Server-rendered HTML renderer for blog articles.
 *
 * Sanitizes the raw HTML stored in src/data/blog/*.ts (defense-in-depth),
 * rewrites internal links for the active locale (i18n Quarantine Law),
 * and automatically translates English anchor texts to Arabic for Arabic articles.
 *
 * Rendered fully server-side: search engines see the final processed
 * HTML on the first crawl wave, with no client-side fallback or skeleton
 * to slow indexing. Sanitization fixes malformed authoring artefacts
 * (e.g. `< table >`, `</td >`) before they reach the DOM, so React
 * hydration of any client components nested inside the article tree
 * stays consistent with the server output.
 */
export default function BlogContentRenderer({
    html,
    className = '',
    locale = 'ar',
}: BlogContentRendererProps) {
    const processedHtml = translateAnchorTexts(
        localizeInternalLinks(sanitizeHtml(html), locale),
        locale
    );
    const processed = locale === 'ar'
        ? localizeArabicBrandHtml(processedHtml)
        : processedHtml;
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: processed }}
        />
    );
}
