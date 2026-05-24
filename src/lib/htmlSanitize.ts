/**
 * Shared HTML processing utilities for content stored in src/data/ (blog
 * articles, product descriptions, etc.). These run on the server during
 * SSR/ISR so search engines see the final, processed HTML on first crawl.
 *
 * Two operations, ordered:
 *   1. sanitizeHtml — defense-in-depth: fix malformed tags + strip
 *      dangerous elements/attributes.
 *   2. localizeInternalLinks — enforce the i18n Quarantine Law: rewrite
 *      internal /... links to /{locale}/... for non-default locales.
 *
 * Always call sanitize BEFORE localize so the link rewrite operates on
 * clean HTML.
 */

/**
 * Defense-in-depth HTML sanitization for admin-controlled content.
 *
 * Why "admin-controlled but still sanitized": even trusted authors make
 * mistakes — extra whitespace inside tags (`< table >`), accidental
 * `<script>` paste, stale `onclick=`. Sanitizing once at the render
 * boundary catches these without forcing manual data audits.
 *
 * IMPORTANT: This is intentionally idempotent — running it twice on
 * already-clean HTML produces the same output. Safe to call from
 * multiple layers if needed.
 */
export function sanitizeHtml(html: string): string {
    return (
        html
            // Fix malformed tags with internal whitespace (e.g. `< table >`,
            // `</td >`). Browsers auto-correct these during parsing, which
            // breaks React hydration when the rendered DOM no longer matches
            // the server-emitted HTML.
            .replace(/<\s+(\w)/g, '<$1')        // `< table` → `<table`
            .replace(/(\w)\s+>/g, '$1>')        // `table >` → `table>`
            .replace(/<\s+\//g, '</')           // `< /td`  → `</td`
            .replace(/\s+>/g, '>')              // ` >`     → `>`
            // Strip dangerous elements
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
            .replace(/<object[\s\S]*?<\/object>/gi, '')
            .replace(/<embed[^>]*>/gi, '')
            .replace(/<form[\s\S]*?<\/form>/gi, '')
            .replace(/<input[^>]*>/gi, '')
            .replace(/<textarea[\s\S]*?<\/textarea>/gi, '')
            // Strip inline event handlers (quoted and unquoted forms)
            .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
            .replace(/\son\w+\s*=\s*\S+/gi, '')
            // Neutralize dangerous URI schemes
            .replace(/javascript\s*:/gi, 'blocked:')
            .replace(/data\s*:/gi, 'blocked:')
    );
}

/**
 * i18n Quarantine Law: rewrite internal links for non-default locales.
 *
 * Site language setup:
 *   - Arabic is the DEFAULT locale and lives at the root domain (no /ar
 *     prefix). When locale === 'ar' this function is a no-op.
 *   - English (and any future locale) lives under /{locale}/. All internal
 *     hrefs beginning with `/` are prefixed with /{locale}/ so a reader
 *     on the English version never bleeds into the Arabic version.
 *
 * The regex is deliberately narrow: it only matches hrefs whose value
 * starts with a single `/`. That means external URLs (`https://`,
 * `mailto:`, `tel:`), anchors (`#x`), and protocol-relative URLs
 * (`//cdn.example.com`) never enter the match at all.
 *
 * Inside the matched group we exclude paths that are *already* localized
 * (`/en/foo`, `/en`, `/en?x`, `/en#x`) by checking that the character
 * after `en` is a path/query/fragment/quote boundary. Without that the
 * regex would happily double-prefix `/en` into `/en/en`.
 */
export function localizeInternalLinks(html: string, locale: string): string {
    if (locale === 'ar') return html; // default locale = no prefix

    // Matches: href="/<path>" or href='/<path>' where <path> is NOT
    //   - `en` followed by [ / ' " # ? ]  (already-localized link)
    //   - `/`                              (protocol-relative URL like //cdn.com)
    return html.replace(
        /href=(["'])\/(?!en[/'"#?]|\/)([^"']*)\1/gi,
        (_match, quote: string, path: string) =>
            `href=${quote}/${locale}/${path}${quote}`,
    );
}
