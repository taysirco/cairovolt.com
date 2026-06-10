
import { MetadataRoute } from 'next';
import { brandData } from '@/data/brand-data';
import { governorates } from '@/data/governorates';
import { categoryContent } from '@/data/category-content';
import { staticProducts } from '@/lib/static-products';
import { logger } from '@/lib/logger';
import { blogArticles } from '@/data/blog-articles';
import { genericCategories } from '@/data/generic-categories';
import { getFirestore } from '@/lib/firebase-admin';
import { labData } from '@/data/product-tests';
import { getProductDetail } from '@/data/product-details';

const baseUrl = 'https://cairovolt.com';

// Helper to ensure lowercase brands/categories for URLs (Strict URL best practice)
const toLower = (str: string) => str.toLowerCase();

/**
 * Build hreflang alternates for a given path.
 * Arabic (ar-EG) is the sovereign version; x-default → Arabic.
 * English (en-EG) is geo-scoped to Egypt — tells Google NOT to rank for US/UK.
 */
function buildAlternates(path: string) {
    const arUrl = `${baseUrl}${path}`;
    const enUrl = `${baseUrl}/en${path}`;
    return {
        languages: {
            'ar-EG': arUrl,
            'en-EG': enUrl,
            'x-default': arUrl, // Arabic is sovereign
        },
    };
}

/**
 * Arabic entry — full priority.
 * lastModified is emitted ONLY when a real modification date is known.
 * A fabricated site-wide default teaches Google to distrust the whole
 * sitemap's lastmod signal, which hurts recrawl scheduling for the pages
 * (blog) where the date IS real.
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

/** English entry — reduced priority (60% of Arabic) to focus crawl budget */
function enEntry(path: string, priority: number, freq: MetadataRoute.Sitemap[0]['changeFrequency'], lastMod?: Date): MetadataRoute.Sitemap[0] {
    return {
        url: `${baseUrl}/en${path}`,
        priority: Math.round(priority * 0.6 * 10) / 10, // 60% of Arabic priority
        changeFrequency: freq,
        ...(lastMod && { lastModified: lastMod }),
        alternates: buildAlternates(path),
    };
}

/** Add both ar + en entries with Arabic prioritized */
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
    // Standalone landing for the "soundcore" / "ساوند كور" keyword cluster (~20k searches/mo).
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
    const redirectedSlugs = new Set([
        'joyroom-usb-a-lightning-1.2m',
        'joyroom-usb-a-type-c-1.2m',
    ]);
    const staticSlugs = new Set(staticProducts.map(p => p.slug));

    staticProducts
        .filter(p => !redirectedSlugs.has(p.slug))
        .forEach(product => {
            const path = `/${toLower(product.brand)}/${toLower(product.categorySlug)}/${product.slug}`;
            const hasLabData = !!(labData[product.slug] || getProductDetail(product.slug)?.labVerified);
            const priority = hasLabData ? 1.0 : 0.9;
            // 'weekly' is the honest cadence — product copy rarely changes daily,
            // and overstating freshness erodes sitemap trust.
            addBilingual(routes, path, priority, 'weekly');
        });

    // Firebase-only products
    try {
        const db = await getFirestore();
        if (db) {
            const snapshot = await db.collection('products').get();
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                if (data.slug && data.brand && data.categorySlug && !staticSlugs.has(data.slug)) {
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

    // ── Blog ──
    addBilingual(routes, '/blog', 0.7, 'weekly');
    blogArticles.forEach(article => {
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
            addBilingual(routes, `/solutions/${solution.slug}`, 0.7, 'monthly');
        });
    } catch {
        // Solutions data not available
    }

    // NOTE: machine-readable endpoints (llms.txt, /api/knowledge-graph,
    // /api/lab-data/json, openapi.json) are deliberately NOT in the sitemap.
    // Sitemaps are for canonical, indexable HTML pages; non-HTML endpoints
    // here only generate "crawled — currently not indexed" noise in Search
    // Console. AI agents discover them via robots.txt, the bot-only Link
    // header (middleware), and the /.well-known/ convention.

    return routes;
}



