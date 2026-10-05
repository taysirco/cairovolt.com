/**
 * Blog → product reverse index: the "guides about this product" rail on PDPs.
 *
 * Articles send thousands of body links to product pages, but product pages
 * linked back to no article at all, so the editorial graph only ran one way.
 * This module answers "which live guides actually discuss this product?" from
 * the lightweight blog index alone (no article bodies are loaded).
 *
 * SERVER-ONLY by contract: call it from the product route (a server component)
 * and pass the result down as a plain prop. Never import it — or any blog data —
 * into ProductPageClient or another client component.
 *
 * Membership is `bodyProductLinks` (product slugs the article body really links
 * to, emitted by scripts/generate-blog-index.mjs), not `relatedProducts`: a
 * curated related-products chip is weaker evidence that the article is about
 * the product than an in-body link. An index entry without that field yields
 * no guides rather than guessing.
 *
 * Only `getLiveIndex()` entries are candidates, so a scheduled article (whose
 * URL still 404s at the edge until its publishDate) can never be linked.
 *
 * Imports the generated index directly (the same `getLiveIndex` that
 * '@/data/blog-index' re-exports), as blog-category-bridge does, so the product
 * route does not also pull in that module's per-article dynamic-import loader.
 */

import { getLiveIndex, type BlogIndexEntry } from '@/data/blog-index.generated';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';

export interface ProductGuideLink {
    href: string;
    title: string;
}

/**
 * djb2 string hash (unsigned 32-bit). Deterministic across builds and between
 * server and client, so an ordering derived from it never drifts on hydration
 * or between two prerenders of the same page.
 */
export function stableStringHash(value: string): number {
    let hash = 5381;
    for (let i = 0; i < value.length; i++) {
        hash = ((hash << 5) + hash + value.charCodeAt(i)) >>> 0;
    }
    return hash;
}

function bodyLinksOf(entry: BlogIndexEntry): string[] | undefined {
    const links = (entry as { bodyProductLinks?: string[] }).bodyProductLinks;
    return Array.isArray(links) ? links : undefined;
}

/**
 * Up to `limit` live articles whose body links to `productSlug`, localised.
 *
 * Order:
 *   1. articles that lead with this product — it is the first product the body
 *      links to, or the first curated related product;
 *   2. then a stable per-pair hash (djb2 of `${productSlug}:${articleSlug}`), so
 *      hub SKUs cited by dozens of articles do not all show the same three;
 *   3. then newest publishDate first (only matters on a hash collision).
 *
 * Hrefs are locale-correct: `/blog/<slug>` (Arabic) or `/en/blog/<slug>`;
 * Arabic titles get the site's Arabic brand spellings, as on the article page.
 */
export function getGuidesForProduct(
    productSlug: string,
    locale: string,
    limit = 3,
): ProductGuideLink[] {
    if (!productSlug || limit <= 0) return [];
    const isArabic = locale === 'ar';

    const candidates = getLiveIndex()
        .filter(entry => bodyLinksOf(entry)?.includes(productSlug))
        .map(entry => {
            const bodyLinks = bodyLinksOf(entry) ?? [];
            const leads = bodyLinks[0] === productSlug || entry.relatedProducts?.[0] === productSlug;
            return {
                entry,
                leads,
                hash: stableStringHash(`${productSlug}:${entry.slug}`),
                time: Date.parse(entry.publishDate) || 0,
            };
        });

    candidates.sort((a, b) =>
        Number(b.leads) - Number(a.leads)
        || a.hash - b.hash
        || b.time - a.time,
    );

    const guides: ProductGuideLink[] = [];
    for (const { entry } of candidates) {
        if (guides.length >= limit) break;
        const rawTitle = (isArabic ? entry.translations.ar : entry.translations.en)?.title?.trim();
        if (!rawTitle) continue;
        guides.push({
            href: `${isArabic ? '' : '/en'}/blog/${entry.slug}`,
            // Same Arabic brand spellings the article page itself renders
            // (localizeArabicBrandContent on its title); JBL stays Latin.
            title: isArabic ? localizeArabicBrandNames(rawTitle) : rawTitle,
        });
    }
    return guides;
}
