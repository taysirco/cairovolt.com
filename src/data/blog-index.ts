// Lightweight blog index — re-exports from auto-generated standalone file.
// The generated file has ZERO imports from the blog barrel, keeping it truly lightweight.
//
// To regenerate after adding/editing articles:
//   node scripts/generate-blog-index.mjs

// Re-export everything from the generated standalone index
export {
    blogIndex,
    type BlogIndexEntry,
    isIndexEntryLive,
    getLiveIndex,
    getAllIndexSlugs,
    getLiveIndexSlugs,
    getIndexEntry,
} from './blog-index.generated';

import type { BlogArticle } from './blog/_types';

/**
 * Lazy-load a SINGLE full blog article by slug, normalized for output.
 *
 * Uses dynamic import() to load only the requested article's module —
 * NOT the entire 5.9MB barrel. This keeps the blog/[slug] page's RSC
 * payload to ~40-100KB instead of megabytes.
 *
 * Every consumer of full article text (the blog page and the markdown twin in
 * src/app/api/markdown-negotiate) goes through here, so this is the single
 * place where `{{price:<slug>}}` tokens are resolved against the live catalogue
 * and quickAnswer / FAQ text is reduced to plain text (see
 * src/lib/blog-answer-normalize.ts). The returned object is a shallow copy —
 * the imported article module is never mutated.
 *
 * The normalizer and the catalogue are loaded with dynamic import() on purpose:
 * this file is reachable from client bundles (htmlSanitize → getIndexEntry), and
 * a static import of '@/lib/static-products' would drag the full catalogue in.
 */
export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
    let article: BlogArticle | undefined;
    try {
        // Dynamic import with template literal — webpack/turbopack will
        // create a separate chunk for each blog/*.ts file.
        const mod = await import(`./blog/${slug}`) as Record<string, unknown>;
        // Each blog module exports a named const; find the BlogArticle
        article = Object.values(mod).find(
            (v): v is BlogArticle =>
                typeof v === 'object' && v !== null && 'slug' in v && 'translations' in v
        );
    } catch {
        // Slug doesn't match a blog file — return undefined
        return undefined;
    }
    if (!article) return undefined;

    const [{ normalizeArticleTranslation }, { getProductBySlug }] = await Promise.all([
        import('@/lib/blog-answer-normalize'),
        import('@/lib/static-products'),
    ]);
    const lookup = (productSlug: string) => {
        const product = getProductBySlug(productSlug);
        return product ? { price: product.price, status: product.status } : undefined;
    };

    return {
        ...article,
        translations: {
            ar: normalizeArticleTranslation(article.translations.ar, lookup, 'ar', article.slug),
            en: normalizeArticleTranslation(article.translations.en, lookup, 'en', article.slug),
        },
    };
}
