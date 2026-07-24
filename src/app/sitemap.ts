
import { MetadataRoute } from 'next';
import { brandData } from '@/data/brand-data';
import { governorates } from '@/data/governorates';
import { categoryContent } from '@/data/category-content';
import { staticProducts } from '@/lib/static-products';
import { logger } from '@/lib/logger';
import { blogIndex, isIndexEntryLive } from '@/data/blog-index';
import { genericCategories } from '@/data/generic-categories';
import { getFirestore } from '@/lib/firebase-admin';
import { SEO_SITEMAP_EXCLUDED_PRODUCT_SLUGS } from '@/lib/merchant-product-data';

const baseUrl = 'https://cairovolt.com';

// Keep route segments in the same lowercase form used by the application.
const toLower = (str: string) => str.toLowerCase();

/**
 * Build hreflang alternates for a given path.
 * Arabic is the default unprefixed locale and x-default target.
 * English uses the established /en prefix and the en-EG locale.
 */
function buildAlternates(path: string) {
    const arUrl = `${baseUrl}${path}`;
    const enUrl = `${baseUrl}/en${path}`;
    return {
        languages: {
            'ar-EG': arUrl,
            'en-EG': enUrl,
            'x-default': arUrl,
        },
    };
}

/**
 * Emit lastModified only when the content source has a real modification date.
 */
function arEntry(path: string, priority: number, freq: MetadataRoute.Sitemap[0]['changeFrequency'], lastMod?: Date): MetadataRoute.Sitemap[0] {
    return {
        url: `${baseUrl}${path}`,
        priority,
        changeFrequency: freq,
        ...(lastMod && { lastModified: lastMod }),
        alternates: buildAlternates(path),
    };
}

/** English entry using the site's established relative priority. */
function enEntry(path: string, priority: number, freq: MetadataRoute.Sitemap[0]['changeFrequency'], lastMod?: Date): MetadataRoute.Sitemap[0] {
    return {
        url: `${baseUrl}/en${path}`,
        priority: Math.round(priority * 0.6 * 10) / 10,
        changeFrequency: freq,
        ...(lastMod && { lastModified: lastMod }),
        alternates: buildAlternates(path),
    };
}

/** Add the established Arabic and English route pair. */
function addBilingual(
    routes: MetadataRoute.Sitemap,
    path: string,
    priority: number,
    freq: MetadataRoute.Sitemap[0]['changeFrequency'],
    lastMod?: Date,
) {
    routes.push(arEntry(path, priority, freq, lastMod));
    routes.push(enEntry(path, priority, freq, lastMod));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes: MetadataRoute.Sitemap = [];

    // ── Home ──
    addBilingual(routes, '', 1.0, 'weekly');

    // ── Static Pages ──
    addBilingual(routes, '/about', 0.5, 'monthly', new Date('2025-12-01'));
    addBilingual(routes, '/team', 0.6, 'monthly', new Date('2026-05-29'));
    addBilingual(routes, '/contact', 0.6, 'monthly', new Date('2025-12-01'));
    addBilingual(routes, '/faq', 0.7, 'weekly');
    // Preserve the established bilingual URL as a transparent specifications
    // and calculations hub; no synthetic test dataset is exposed.
    addBilingual(routes, '/lab', 0.8, 'monthly', new Date('2026-07-17'));
    // ── Legal & Policy ──
    addBilingual(routes, '/return-policy', 0.4, 'yearly', new Date('2025-10-01'));
    addBilingual(routes, '/warranty', 0.4, 'yearly', new Date('2025-10-01'));
    addBilingual(routes, '/verify', 0.8, 'monthly', new Date('2026-04-20'));
    addBilingual(routes, '/shipping', 0.5, 'monthly', new Date('2025-12-15'));
    addBilingual(routes, '/terms', 0.3, 'yearly', new Date('2025-08-01'));
    addBilingual(routes, '/privacy', 0.3, 'yearly', new Date('2025-08-01'));

    // ── Brand Pages ──
    Object.keys(brandData).forEach(brandId => {
        addBilingual(routes, `/${toLower(brandId)}`, 0.9, 'weekly');
    });

    // ── Soundcore Hub (Anker audio sub-brand) ──
    // Standalone landing for the Soundcore audio catalogue.
    // Served by a custom route (src/app/[locale]/soundcore/page.tsx) — NOT brandData.
    // Sub-pages (/soundcore/audio, /soundcore/speakers, products) come from categoryContent loop below.
    addBilingual(routes, '/soundcore', 0.95, 'weekly', new Date('2026-05-26'));

    // ── Category Pages ──
    Object.keys(categoryContent).forEach(brandId => {
        const brandSlug = toLower(brandId);
        Object.keys(categoryContent[brandId]).forEach(catSlug => {
            addBilingual(routes, `/${brandSlug}/${toLower(catSlug)}`, 0.8, 'weekly');
        });
    });

    // ── Product Pages ──
    const staticSlugs = new Set(staticProducts.map(p => p.slug));

    staticProducts
        .filter(p => !SEO_SITEMAP_EXCLUDED_PRODUCT_SLUGS.has(p.slug))
        .forEach(product => {
            const path = `/${toLower(product.brand)}/${toLower(product.categorySlug)}/${product.slug}`;
            // 'weekly' is the honest cadence — product copy rarely changes daily,
            // and overstating freshness erodes sitemap trust.
            addBilingual(routes, path, 0.9, 'weekly');
        });

    // Firebase-only products (hard 12s ceiling so prerender never stalls the build)
    try {
        const db = await Promise.race([
            getFirestore(),
            new Promise<null>((resolve) => setTimeout(() => resolve(null), 12_000)),
        ]);
        if (db) {
            const snapshot = await Promise.race([
                db.collection('products').get(),
                new Promise<null>((resolve) => setTimeout(() => resolve(null), 12_000)),
            ]);
            snapshot?.docs.forEach(doc => {
                const data = doc.data();
                if (
                    data.slug
                    && data.brand
                    && data.categorySlug
                    && !staticSlugs.has(data.slug)
                    && !SEO_SITEMAP_EXCLUDED_PRODUCT_SLUGS.has(data.slug)
                ) {
                    const path = `/${toLower(data.brand)}/${toLower(data.categorySlug)}/${data.slug}`;
                    addBilingual(routes, path, 0.9, 'daily');
                }
            });
        }
    } catch (error) {
        logger.warn('Firebase not available for sitemap, using static products only:', error);
    }

    // ── Generic Category Pages ──
    genericCategories.forEach(cat => {
        addBilingual(routes, `/${cat.slug}`, 0.8, 'weekly');
    });

    // ── Blog ── (only LIVE articles — scheduled/future ones stay out of the
    // sitemap until their publishDate arrives; the sitemap is dynamic so it
    // picks up each article on its scheduled day.)
    addBilingual(routes, '/blog', 0.7, 'weekly');
    blogIndex.filter(a => isIndexEntryLive(a)).forEach(article => {
        addBilingual(routes, `/blog/${article.slug}`, 0.8, 'monthly', new Date(article.modifiedDate));
    });

    // ── Governorate Location Pages ──
    governorates.forEach(gov => {
        addBilingual(routes, `/locations/${gov.slug}`, 0.8, 'weekly');
    });

    // ── Solution Pages ──
    try {
        const { solutionsDB } = await import('@/data/solutions-data');
        solutionsDB.forEach(solution => {
            // Thin solution set — keep discoverable but do not over-claim crawl priority.
            addBilingual(routes, `/solutions/${solution.slug}`, 0.4, 'monthly');
        });
    } catch {
        // Solutions data not available
    }

    // NOTE: machine-readable endpoints (llms.txt, /api/knowledge-graph and
    // openapi.json) are deliberately NOT in the sitemap.
    // Sitemaps contain canonical, indexable HTML pages. Machine-readable
    // resources remain discoverable through robots.txt, response Link headers,
    // and their standard /.well-known/ locations.

    return routes;
}
