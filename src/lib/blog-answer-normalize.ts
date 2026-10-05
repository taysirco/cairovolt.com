/**
 * Blog answer-surface normalizer: the ONLY path by which an article's
 * quickAnswer, FAQ and body content reach rendered output.
 *
 * WHY THIS EXISTS
 * 1. Markup residue. quickAnswer and FAQ answers are rendered as TEXT in the
 *    QuickAnswerBox, the FAQ accordion, BlogPosting.abstract, FAQPage JSON-LD,
 *    the Speakable target and the markdown twin. Authors wrote `<strong>`, `**`,
 *    `<a href>` and `[text](url)` into ~80 of those fields, so readers, TTS and
 *    answer engines got literal tags and asterisks. `toPlainAnswer` turns them
 *    into the plain sentence they were meant to be.
 * 2. Price drift. Catalogue prices change on every price-sync run, while prices
 *    typed into article prose stay frozen. Copy may instead say
 *    `{{price:<product-slug>}}`; `resolvePriceTokens` swaps in the product's
 *    CURRENT catalogue price at render time, so the two can never disagree.
 *
 * TOKEN CONTRACT (C1)
 *   `{{price:<product-slug>}}` — allowed ONLY in translations.{ar,en}.quickAnswer,
 *   faq[].question, faq[].answer and content. The currency word stays literal in
 *   the copy ("{{price:anker-nano-45w}} جنيه" / "EGP {{price:anker-nano-45w}}").
 *   It resolves to the product's `price` formatted with toLocaleString('en-US')
 *   (e.g. "1,730"). A missing / non-active / non-positive-price product resolves
 *   to a neutral fallback and is reported — the literal token never reaches HTML.
 *   scripts/generate-blog-index.mjs fails the build if a token appears in title,
 *   metaTitle, metaDescription, excerpt or keywords (those surfaces bypass this
 *   module).
 *
 * This file deliberately has NO imports so it can be unit-checked with
 * `node --experimental-strip-types` and shipped to any runtime.
 */

/** Matches one price token; group 1 is the product slug. */
export const PRICE_TOKEN_RE = /\{\{price:([a-z0-9][a-z0-9.-]*)\}\}/g;

// PRICE_TOKEN_RE plus an optional currency word on either side, so an
// unresolvable token can drop its literal currency word (see resolvePriceTokens).
const PRICE_TOKEN_WITH_CURRENCY_RE = /(EGP\s?)?\{\{price:([a-z0-9][a-z0-9.-]*)\}\}(\s?(?:EGP|جنيهات|جنيه(?:\s?مصري)?|ج\.م|ج)(?![ء-ي]))?/g;

/** Text shown in place of a token whose product cannot be priced. */
export const PRICE_TOKEN_FALLBACK = {
    ar: 'السعر في صفحة المنتج',
    en: 'see product page for price',
} as const;

/** Minimal product view the resolver needs (kept import-free on purpose). */
export interface PriceLookupResult {
    price: number;
    status?: string;
}

export type PriceLookup = (slug: string) => PriceLookupResult | undefined | null;

export interface AnswerFaqItem {
    question: string;
    answer: string;
}

/** The fields of a blog translation this module reads or rewrites. */
export interface NormalizableTranslation {
    content: string;
    quickAnswer?: string;
    faq?: AnswerFaqItem[];
}

function fallbackFor(locale: string): string {
    return locale === 'ar' ? PRICE_TOKEN_FALLBACK.ar : PRICE_TOKEN_FALLBACK.en;
}

// Tags that separate words visually; dropping them outright would glue the
// neighbouring words together ("…</p><p>…"), so they become a space instead.
const BLOCK_TAG_RE = /<\/?(?:br|p|div|li|ul|ol|h[1-6]|tr|td|th|table|thead|tbody|section|article|blockquote|hr)\b[^>]*>/gi;
// Any other tag-like markup (<strong>, <a href="…">, </em> …). A '<' that is not
// immediately followed by a letter or '/'+letter — e.g. "< 100Wh" or "<5V" — is
// a comparison, not markup, and is left alone.
const INLINE_TAG_RE = /<\/?[a-zA-Z][^>]*>/g;
const MD_LINK_RE = /\[([^\]\n]+)\]\(([^)\s]*)\)/g;

function decodeEntities(s: string): string {
    return s
        .replace(/&nbsp;/gi, ' ')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#0*39;/g, "'")
        .replace(/&#x0*27;/gi, "'")
        // &amp; last, so "&amp;lt;" decodes one level per pass (see toPlainAnswer).
        .replace(/&amp;/gi, '&');
}

function plainPass(s: string): string {
    return decodeEntities(
        s
            .replace(BLOCK_TAG_RE, ' ')
            .replace(INLINE_TAG_RE, '')
            .replace(/\*\*/g, '')
            .replace(/__/g, '')
            .replace(MD_LINK_RE, '$1'),
    )
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Plain-text form of an answer string: tags removed (inner text kept), `<br>`
 * and block tags → space, `**`/`__` emphasis removed, `[text](url)` → text,
 * common entities decoded, whitespace collapsed.
 *
 * Idempotent: the pass is repeated until the output stops changing, so an
 * entity-encoded tag (`&lt;strong&gt;`) that only becomes markup after decoding
 * is removed too, and `toPlainAnswer(toPlainAnswer(x)) === toPlainAnswer(x)`.
 */
export function toPlainAnswer(s: string | undefined | null): string {
    if (typeof s !== 'string' || s.length === 0) return '';
    let current = s;
    for (let i = 0; i < 6; i++) {
        const next = plainPass(current);
        if (next === current) return next;
        current = next;
    }
    return current;
}

/**
 * Replace every `{{price:<slug>}}` with the product's current catalogue price
 * (toLocaleString('en-US')), or with the locale fallback when the product is
 * missing, not `active`, or has no positive price. `onMissing` is called once
 * per unresolved token.
 */
export function resolvePriceTokens(
    s: string,
    lookup: PriceLookup,
    locale: string,
    onMissing?: (slug: string) => void,
): string {
    if (typeof s !== 'string' || s.indexOf('{{price:') === -1) return s;
    // The currency word is literal copy next to the token ("EGP {{price:x}}",
    // "{{price:x}} جنيه", "{{price:x}}ج"). It is captured so the fallback can drop
    // it — "see product page for price EGP" reads as broken — and put back
    // untouched when the price resolves.
    return s.replace(PRICE_TOKEN_WITH_CURRENCY_RE, (_match: string, before: string | undefined, slug: string, after: string | undefined) => {
        const product = lookup(slug);
        const price = product ? Number(product.price) : NaN;
        if (!product || product.status !== 'active' || !Number.isFinite(price) || price <= 0) {
            if (onMissing) onMissing(slug);
            return fallbackFor(locale);
        }
        return `${before ?? ''}${price.toLocaleString('en-US')}${after ?? ''}`;
    });
}

/**
 * Last line of defence: anything still shaped like a price token after
 * resolution (bad casing, stray spaces, an unterminated token) is replaced by
 * the fallback text, never shipped literally.
 */
function scrubSurvivingTokens(s: string, locale: string, where: string): string {
    if (typeof s !== 'string' || s.indexOf('{{price:') === -1) return s;
    console.warn(`[blog] malformed price token survived normalization in ${where}`);
    return s
        .replace(/\{\{price:[^{}]*\}\}/g, fallbackFor(locale))
        .replace(/\{\{price:/g, fallbackFor(locale));
}

/**
 * Normalize one locale of an article for output. Returns a NEW object:
 *   quickAnswer → toPlainAnswer(resolve(quickAnswer))
 *   faq[]       → { question: plain(resolve(q)), answer: plain(resolve(a)) }
 *   content     → resolve(content)   (HTML preserved; the renderer sanitizes it)
 * title, metaTitle, metaDescription, excerpt and keywords are passed through
 * untouched (only a surviving literal token would be scrubbed, with a warning).
 */
export function normalizeArticleTranslation<T extends NormalizableTranslation>(
    t: T,
    lookup: PriceLookup,
    locale: string,
    articleSlug: string = 'unknown-article',
): T {
    const where = `${articleSlug} (${locale})`;
    const onMissing = (slug: string) => {
        console.warn(`[blog] unresolved price token ${slug} in ${articleSlug}`);
    };
    const resolve = (s: string) => scrubSurvivingTokens(resolvePriceTokens(s, lookup, locale, onMissing), locale, where);

    const out: T = { ...t };
    out.content = resolve(t.content ?? '');
    if (typeof t.quickAnswer === 'string') {
        out.quickAnswer = toPlainAnswer(resolve(t.quickAnswer));
    }
    if (Array.isArray(t.faq)) {
        out.faq = t.faq.map((item) => ({
            question: toPlainAnswer(resolve(item.question)),
            answer: toPlainAnswer(resolve(item.answer)),
        }));
    }

    // Token-banned fields: never rewritten in normal operation. If a token was
    // nevertheless authored there (the index generator should have failed the
    // build first), scrub it rather than print "{{price:…}}" on the page.
    const record = out as unknown as Record<string, unknown>;
    for (const key of ['title', 'metaTitle', 'metaDescription', 'excerpt', 'keywords']) {
        const value = record[key];
        if (typeof value === 'string' && value.indexOf('{{price:') !== -1) {
            record[key] = scrubSurvivingTokens(value, locale, `${where} ${key}`);
        }
    }
    return out;
}
