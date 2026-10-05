
import { MetadataRoute } from 'next';
import { brandData } from '@/data/brand-data';
import { governorates } from '@/data/governorates';
import { categoryContent } from '@/data/category-content';
import { staticProducts } from '@/lib/static-products';
import { logger } from '@/lib/logger';
import { blogIndex, isIndexEntryLive } from '@/data/blog-index';
import { genericCategories } from '@/data/generic-categories';
import { getFirestore } from '@/lib/firebase-admin';
import { CATALOG_LAST_REVIEWED_AT, SEO_SITEMAP_EXCLUDED_PRODUCT_SLUGS } from '@/lib/merchant-product-data';
import { CATALOG_LASTMOD, CATALOG_SOURCE_LASTMOD } from '@/data/catalog-lastmod.generated';

// The blog scheduling gate is time-based (isIndexEntryLive), so this route must
// NOT be a frozen build-time prerender: without ISR a scheduled article goes
// live on-site yet never enters the sitemap until the next deploy. Verified via
// .next/prerender-manifest.json (initialRevalidateSeconds was false here while
// /feed.xml and /llms.txt already used 3600). Hourly matches the /blog listing.
export const revalidate = 3600;

const baseUrl = 'https://cairovolt.com';

/**
 * Catalog lastmod comes from src/data/catalog-lastmod.generated.ts — a committed
 * map that moves a product's date only when its product or details file
 * actually changes (scripts/generate-catalog-lastmod.mjs; price-sync.yml runs it).
 *
 * One shared "catalog reviewed" date used to stamp every catalog URL, including
 * products added after it, which is the classic way to make Google discard
 * lastmod altogether. CATALOG_LAST_REVIEWED_AT is now only the fallback for a
 * slug the map does not know yet — never the build time.
 */
const catalogReviewedAt = new Date(CATALOG_LAST_REVIEWED_AT);

function mapDate(entry: { lastmod: string } | undefined): Date | undefined {
    if (!entry) return undefined;
    const date = new Date(entry.lastmod);
    return Number.isNaN(date.getTime()) ? undefined : date;
}

function maxDate(dates: Array<Date | undefined>): Date | undefined {
    return dates.reduce<Date | undefined>(
        (latest, date) => (date && (!latest || date > latest) ? date : latest),
        undefined,
    );
}

/** A product's own lastmod; falls back to the review date, never to "now". */
function productLastmod(slug: string): Date {
    return mapDate(CATALOG_LASTMOD[slug]) ?? catalogReviewedAt;
}

function sourceLastmod(key: string): Date | undefined {
    return mapDate(CATALOG_SOURCE_LASTMOD[key]);
}

/** Active products shown on a brand/category shelf. */
function shelfProductSlugs(brandSlug: string, categorySlug: string): string[] {
    return staticProducts
        .filter(product =>
            product.status === 'active'
            && product.brand.toLowerCase() === brandSlug
            && product.categorySlug === categorySlug,
        )
        .map(product => product.slug);
}

/** A category shelf changes when one of its products or its own copy changes. */
function categoryLastmod(brandSlug: string, categorySlug: string): Date {
    return maxDate([
        ...shelfProductSlugs(brandSlug, categorySlug).map(productLastmod),
        sourceLastmod(`category:${brandSlug}/${categorySlug}`),
    ]) ?? catalogReviewedAt;
}

/** A brand hub = the newest of its shelves plus its own hub copy. */
function brandLastmod(brandSlug: string, hubSourceKey: string): Date {
    const categories = Object.keys(categoryContent[brandSlug] || {});
    return maxDate([
        ...categories.map(categorySlug => categoryLastmod(brandSlug, toLower(categorySlug))),
        sourceLastmod(hubSourceKey),
    ]) ?? catalogReviewedAt;
}

/**
 * Coerce a Firestore Timestamp / Date / ISO string into a usable Date.
 * Returns undefined for anything unparseable so the caller falls back to the
 * catalog review date rather than emitting an invalid <lastmod>.
 */
function toValidDate(value: unknown): Date | undefined {
    if (!value) return undefined;
    const candidate =
        typeof (value as { toDate?: () => Date }).toDate === 'function'
            ? (value as { toDate: () => Date }).toDate()
            : new Date(value as string | number | Date);
    return candidate instanceof Date && !Number.isNaN(candidate.getTime())
        ? candidate
        : undefined;
}

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

    // ── Home ── (featured shelves from every brand + its own FAQ copy)
    const homeLastmod = maxDate([
        ...staticProducts
            .filter(product => product.status === 'active')
            .map(product => productLastmod(product.slug)),
        sourceLastmod('source:home'),
    ]) ?? catalogReviewedAt;
    addBilingual(routes, '', 1.0, 'weekly', homeLastmod);

    // ── Static Pages ──
    // Dates of the last substantive content commit on each page (git log of
    // the page source), not of markup-only edits.
    addBilingual(routes, '/about', 0.5, 'monthly', new Date('2026-08-10'));
    addBilingual(routes, '/team', 0.6, 'monthly', new Date('2026-07-17'));
    addBilingual(routes, '/contact', 0.6, 'monthly', new Date('2026-07-18'));
    addBilingual(routes, '/faq', 0.7, 'weekly', sourceLastmod('source:faq') ?? new Date('2026-07-17'));
    // Preserve the established bilingual URL as a transparent specifications
    // and calculations hub; no synthetic test dataset is exposed. Dated by the
    // newest bench sheet it indexes (benchTest.testDate 2026-07-24).
    addBilingual(routes, '/lab', 0.8, 'monthly', new Date('2026-07-24'));
    // ── Legal & Policy ──
    addBilingual(routes, '/return-policy', 0.4, 'yearly', new Date('2025-10-01'));
    addBilingual(routes, '/warranty', 0.4, 'yearly', new Date('2025-10-01'));
    addBilingual(routes, '/verify', 0.8, 'monthly', new Date('2026-04-20'));
    // 2026-10-04: per-governorate delivery list and the 5–6 day line added.
    addBilingual(routes, '/shipping', 0.5, 'monthly', new Date('2026-10-04'));
    addBilingual(routes, '/terms', 0.3, 'yearly', new Date('2025-08-01'));
    addBilingual(routes, '/privacy', 0.3, 'yearly', new Date('2025-08-01'));

    // ── Brand Pages ──
    Object.keys(brandData).forEach(brandId => {
        addBilingual(routes, `/${toLower(brandId)}`, 0.9, 'weekly', brandLastmod(toLower(brandId), 'source:brand-data'));
    });

    // ── Soundcore Hub (Anker audio sub-brand) ──
    // Standalone landing for the Soundcore audio catalogue.
    // Served by a custom route (src/app/[locale]/soundcore/page.tsx) — NOT brandData.
    // Sub-pages (/soundcore/audio, /soundcore/speakers, products) come from categoryContent loop below.
    addBilingual(routes, '/soundcore', 0.95, 'weekly', brandLastmod('soundcore', 'source:soundcore-hub'));

    // ── Category Pages ──
    Object.keys(categoryContent).forEach(brandId => {
        const brandSlug = toLower(brandId);
        Object.keys(categoryContent[brandId]).forEach(catSlug => {
            addBilingual(routes, `/${brandSlug}/${toLower(catSlug)}`, 0.8, 'weekly', categoryLastmod(brandSlug, toLower(catSlug)));
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
            addBilingual(routes, path, 0.9, 'weekly', productLastmod(product.slug));
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
                    // Same honest cadence as static products, and the document's
                    // own updatedAt when Firestore actually carries one.
                    addBilingual(routes, path, 0.9, 'weekly', toValidDate(data.updatedAt) ?? catalogReviewedAt);
                }
            });
        }
    } catch (error) {
        logger.warn('Firebase not available for sitemap, using static products only:', error);
    }

    // ── Generic Category Pages ──
    genericCategories.forEach(cat => {
        const genericLastmod = maxDate([
            ...cat.brandCategories.map(shelf => categoryLastmod(toLower(shelf.brandSlug), shelf.categorySlug)),
            sourceLastmod(`generic:${cat.slug}`),
        ]) ?? catalogReviewedAt;
        addBilingual(routes, `/${cat.slug}`, 0.8, 'weekly', genericLastmod);
    });

    // ── Blog ── (only LIVE articles — scheduled/future ones stay out of the
    // sitemap until their publishDate arrives; the sitemap is dynamic so it
    // picks up each article on its scheduled day.)
    const liveArticles = blogIndex.filter(a => isIndexEntryLive(a));
    // The index's real freshness is its newest live article, not the build time.
    const newestArticleAt = liveArticles.reduce<Date | undefined>((latest, article) => {
        const modified = toValidDate(article.modifiedDate);
        return modified && (!latest || modified > latest) ? modified : latest;
    }, undefined);
    addBilingual(routes, '/blog', 0.7, 'weekly', newestArticleAt);
    liveArticles.forEach(article => {
        addBilingual(routes, `/blog/${article.slug}`, 0.8, 'monthly', new Date(article.modifiedDate));
    });

    // ── Governorate Location Pages ──
    // Rendered from governorates.ts + the shipping fee table, so they move
    // when that data does (falls back to the catalog review date).
    const locationsLastmod = sourceLastmod('source:locations') ?? catalogReviewedAt;
    governorates.forEach(gov => {
        addBilingual(routes, `/locations/${gov.slug}`, 0.8, 'weekly', locationsLastmod);
    });

    // ── Solution Pages ──
    try {
        const { solutionsDB } = await import('@/data/solutions-data');
        const solutionsLastmod = sourceLastmod('source:solutions') ?? new Date('2026-07-24');
        solutionsDB.forEach(solution => {
            // Thin solution set — keep discoverable but do not over-claim crawl priority.
            addBilingual(routes, `/solutions/${solution.slug}`, 0.4, 'monthly', solutionsLastmod);
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
