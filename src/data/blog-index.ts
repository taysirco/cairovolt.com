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
 * Lazy-load a SINGLE full blog article by slug.
 *
 * Uses dynamic import() to load only the requested article's module —
 * NOT the entire 5.9MB barrel. This keeps the blog/[slug] page's RSC
 * payload to ~40-100KB instead of megabytes.
 */
export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
    try {
        // Dynamic import with template literal — webpack/turbopack will
        // create a separate chunk for each blog/*.ts file.
        const mod = await import(`./blog/${slug}`) as Record<string, unknown>;
        // Each blog module exports a named const; find the BlogArticle
        const article = Object.values(mod).find(
            (v): v is BlogArticle =>
                typeof v === 'object' && v !== null && 'slug' in v && 'translations' in v
        );
        return article;
    } catch {
        // Slug doesn't match a blog file — return undefined
        return undefined;
    }
}
