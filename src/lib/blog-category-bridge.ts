/**
 * Blog ↔ category link bridge.
 *
 * Every article in src/data/blog carries a `relatedCategories` array
 * (e.g. `['Anker/power-banks', 'Joyroom/cables']`). Until this module existed
 * that field was declared on all 172 live articles and read by NOTHING: the
 * article page linked out to products only, and category pages linked to no
 * editorial at all. The topical graph was already authored — it just never
 * reached the HTML, which is why the blog carried a large orphan tail and why
 * no commerce page could hand a crawler (or an answer engine) the article that
 * explains the category it is standing in.
 *
 * Two facts make a naive `relatedCategories.includes()` join wrong, and both
 * are handled here rather than at 172 call sites:
 *
 * 1. CASE. Articles write the brand TitleCase (`Anker/cables`); routes are
 *    lowercase (`/anker/cables`). Every comparison here is lowercased.
 *
 * 2. LEGACY KEYS. 40+ articles point at keys that have never been routes —
 *    `Anker/chargers` (the route is `anker/wall-chargers`), `Anker/soundcore`
 *    (Soundcore is its own brand hub), `Smart Watches` (unqualified),
 *    `Anker/portable-power-stations` (never stocked). Because nothing consumed
 *    the field, nothing ever failed loudly and the drift accumulated. They are
 *    remapped below instead of being edited across 40 source files, so a future
 *    typo degrades to "no link" rather than to a 404, and the aliases stay
 *    reviewable in one place.
 *
 * A key that survives normalisation but matches no real route is DROPPED, never
 * rendered. This module must not be able to emit a link to a page that 404s.
 */

import { getLiveIndex, type BlogIndexEntry } from '@/data/blog-index.generated';
import { categoryContent } from '@/data/category-content';

/**
 * Legacy `relatedCategories` values → the route that actually serves that
 * topic. Left side is lowercased before lookup. Only mappings that are
 * editorially defensible are listed: an article about Soundcore earbuds
 * belongs on the Soundcore audio hub, but an article about portable power
 * stations (a line we do not stock) is pointed at power banks only because
 * that is the nearest page a reader of it would actually want.
 */
const CATEGORY_ALIASES: Record<string, string> = {
    // Anker charging: the route has always been `wall-chargers`.
    'anker/chargers': 'anker/wall-chargers',
    'joyroom/chargers': 'joyroom/wall-chargers',
    'joyroom/wireless-chargers': 'joyroom/wall-chargers',
    // Soundcore is a brand hub of its own, not an Anker category.
    'anker/soundcore': 'soundcore/audio',
    'anker/earbuds': 'soundcore/audio',
    'soundcore/earbuds': 'soundcore/audio',
    'soundcore/headphones': 'soundcore/audio',
    'joyroom/earbuds': 'joyroom/audio',
    'anker/speakers': 'soundcore/speakers',
    // Unqualified legacy label from the smart-watch cluster.
    'smart watches': 'joyroom/smart-watches',
    'joyroom/car-mounts': 'joyroom/car-holders',
    // Lines we do not stock — send the reader to the closest real shelf.
    'anker/portable-power-stations': 'anker/power-banks',
    'samsung/chargers': 'anker/wall-chargers',
};

/** Every `brand/category` pair that is a real, rendered route. */
function realCategoryRoutes(): Set<string> {
    const routes = new Set<string>();
    for (const [brand, cats] of Object.entries(categoryContent)) {
        for (const category of Object.keys(cats)) {
            routes.add(`${brand.toLowerCase()}/${category.toLowerCase()}`);
        }
    }
    return routes;
}

/**
 * Normalise one authored key to a real route, or null when no page serves it.
 */
export function resolveCategoryKey(raw: string, routes = realCategoryRoutes()): string | null {
    const key = raw.trim().toLowerCase();
    const mapped = CATEGORY_ALIASES[key] ?? key;
    return routes.has(mapped) ? mapped : null;
}

export interface CategoryArticleLink {
    slug: string;
    title: string;
    excerpt: string;
    readingTime: number;
    /** Article's own editorial category — used only for the label chip. */
    category: BlogIndexEntry['category'];
}

/**
 * Articles that declare this category, newest first, already localised.
 *
 * Scheduled-but-unpublished articles are excluded by `getLiveIndex()`: linking
 * to a slug whose page does not exist yet would emit a 404 into every category
 * page, which is the exact failure the scheduled-blog route was hardened
 * against. A category with no live article simply renders no rail.
 */
export function getArticlesForCategory(
    brandSlug: string,
    categorySlug: string,
    locale: string,
    limit = 3,
): CategoryArticleLink[] {
    const routes = realCategoryRoutes();
    const target = `${brandSlug.toLowerCase()}/${categorySlug.toLowerCase()}`;
    if (!routes.has(target)) return [];

    const isArabic = locale === 'ar';

    return getLiveIndex()
        .filter(entry =>
            (entry.relatedCategories || []).some(raw => resolveCategoryKey(raw, routes) === target),
        )
        .sort((a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate))
        .slice(0, limit)
        .map(entry => {
            const t = isArabic ? entry.translations.ar : entry.translations.en;
            return {
                slug: entry.slug,
                title: t.title,
                excerpt: t.excerpt,
                readingTime: entry.readingTime,
                category: entry.category,
            };
        });
}

/**
 * Bilingual shelf labels, keyed by category slug.
 *
 * These mirror `Categories` in messages/ar.json and messages/en.json verbatim.
 * They are duplicated here rather than read through next-intl because the blog
 * article page is a server component that does not otherwise load the message
 * catalogue, and pulling it in for three chip labels would be a poor trade. If
 * a label changes in the message files, change it here too — a drift shows up
 * as one wrong word, never as a broken link.
 */
const CATEGORY_LABELS: Record<string, { ar: string; en: string }> = {
    'power-banks': { ar: 'باور بانك', en: 'Power Banks' },
    'wall-chargers': { ar: 'شواحن حائط', en: 'Wall Chargers' },
    cables: { ar: 'كابلات شحن', en: 'Charging Cables' },
    'car-chargers': { ar: 'شواحن سيارة', en: 'Car Chargers' },
    audio: { ar: 'سماعات وايربودز', en: 'Audio & Earbuds' },
    'smart-watches': { ar: 'ساعات ذكية', en: 'Smart Watches' },
    speakers: { ar: 'مكبرات صوت', en: 'Bluetooth Speakers' },
    headphones: { ar: 'سماعات رأس (هيدفون)', en: 'Headphones' },
    earbuds: { ar: 'ايربودز وسماعات أذن', en: 'Earbuds' },
    partybox: { ar: 'سماعات حفلات (بازوكا)', en: 'Party Speakers' },
    'car-holders': { ar: 'حوامل سيارة', en: 'Car Holders' },
    'car-accessories': { ar: 'إكسسوارات سيارة', en: 'Car Accessories' },
    accessories: { ar: 'اكسسوارات', en: 'Accessories' },
};

export function getCategoryDisplayName(categorySlug: string, locale: string): string {
    const label = CATEGORY_LABELS[categorySlug];
    if (!label) return categorySlug;
    return locale === 'ar' ? label.ar : label.en;
}

export interface ArticleCategoryLink {
    /** Route path WITHOUT locale prefix, e.g. `/anker/power-banks`. */
    href: string;
    brandSlug: string;
    categorySlug: string;
}

/**
 * The reverse edge: real category routes an article declares. Used by the
 * article page so the editorial → commerce direction is crawlable too, and so
 * a reader who just finished "how many charges does 10,000mAh give" lands on
 * the shelf rather than on a single product.
 */
export function getCategoriesForArticle(
    relatedCategories: string[] | undefined,
    limit = 3,
): ArticleCategoryLink[] {
    const routes = realCategoryRoutes();
    const seen = new Set<string>();
    const out: ArticleCategoryLink[] = [];

    for (const raw of relatedCategories || []) {
        const resolved = resolveCategoryKey(raw, routes);
        if (!resolved || seen.has(resolved)) continue;
        seen.add(resolved);
        const [brandSlug, categorySlug] = resolved.split('/');
        out.push({ href: `/${resolved}`, brandSlug, categorySlug });
        if (out.length >= limit) break;
    }

    return out;
}
