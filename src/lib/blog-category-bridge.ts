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

import { existsSync } from 'fs';
import path from 'path';
import { blogIndex, getLiveIndex, type BlogIndexEntry } from '@/data/blog-index.generated';
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

/**
 * Evergreen explainers pinned to the shelf whose vocabulary they explain,
 * keyed by the resolved `brand/category` route.
 *
 * The rail used to be "the three newest articles that declare this category",
 * which on money shelves surfaced whatever shipped last — including posts about
 * competitor brands — while the glossary pieces that answer the shelf's own
 * terms (GaN, PD/PPS, mAh vs Wh, ANC, LDAC, 240W) never appeared. Pinned slugs
 * still pass through getLiveIndex(), so a scheduled slug can never be linked.
 */
export const PINNED_ARTICLES: Record<string, readonly string[]> = {
    'anker/wall-chargers': [
        'what-is-gan-gallium-nitride-charger-explained-simply',
        'pd-qc-pps-fast-charging-abbreviations-explained',
        'poweriq-vooc-superfast-turbopower-explained',
    ],
    'anker/power-banks': [
        'best-power-bank-egypt-2026',
        '5000-vs-10000-vs-20000-mah-which-capacity',
        'mah-vs-wh-power-bank-real-capacity-explained',
        'power-bank-airplane-rules-egypt-2026',
    ],
    'joyroom/power-banks': [
        'mah-vs-wh-power-bank-real-capacity-explained',
        'pass-through-charging-power-bank-myth-truth',
        'power-bank-airplane-rules-egypt-2026',
    ],
    'soundcore/audio': [
        'anc-vs-enc-vs-transparency-mode-difference',
        'bassup-ldac-aptx-audio-terms-explained-before-buying',
        'bluetooth-5-4-vs-5-3-vs-5-0-real-difference',
    ],
    'anker/cables': [
        'usb-c-240w-cable-gaming-laptop-when-need',
        'usb-c-cable-guide-egypt-2026',
    ],
    'joyroom/cables': [
        'usb-c-240w-cable-gaming-laptop-when-need',
        'usb-c-cable-guide-egypt-2026',
    ],
    'soundcore/speakers': [
        'bluetooth-speaker-beach-pool-ipx67-rating',
    ],
};

/**
 * A typo in PINNED_ARTICLES must be loud at build time, never a silent 404:
 * every pinned slug has to be in the generated blog index (which is built from
 * src/data/blog/*.ts), and — where the source tree is present, i.e. during a
 * build — its article file must exist.
 */
(function validatePinnedArticles() {
    const indexed = new Set(blogIndex.map(entry => entry.slug));
    const blogDir = path.join(process.cwd(), 'src', 'data', 'blog');
    const canCheckFiles = existsSync(blogDir);
    for (const [route, slugs] of Object.entries(PINNED_ARTICLES)) {
        for (const slug of slugs) {
            if (!indexed.has(slug)) {
                console.warn(`[blog-category-bridge] Pinned article "${slug}" for ${route} is not in the blog index.`);
            }
            if (canCheckFiles && !existsSync(path.join(blogDir, `${slug}.ts`))) {
                console.warn(`[blog-category-bridge] Pinned article "${slug}" for ${route} has no file in src/data/blog.`);
            }
        }
    }
})();

/**
 * Posts whose primary subject is another accessory brand. They can still
 * appear on a shelf that they declare, but they rank behind every on-brand
 * guide rather than occupying the first slots of an Anker or Joyroom shelf.
 */
const OTHER_BRAND_SLUG_PREFIXES = ['mophie-', 'remax-', 'baseus-', 'ugreen-'];

function isOtherBrandArticle(slug: string): boolean {
    return OTHER_BRAND_SLUG_PREFIXES.some(prefix => slug.startsWith(prefix));
}

/** Rail composition: relevance-ranked slots first, then the newest. */
const RELEVANCE_SLOTS = 3;
const NEWEST_SLOTS = 2;

export interface CategoryArticleLink {
    slug: string;
    title: string;
    excerpt: string;
    readingTime: number;
    /** Article's own editorial category — used only for the label chip. */
    category: BlogIndexEntry['category'];
}

/**
 * The shelf's "read before buying" rail, already localised: up to three
 * relevance-ranked guides, then up to two of the newest, deduplicated.
 *
 * Relevance score for a live article:
 *   +3  pinned for this route (PINNED_ARTICLES)
 *   +2  per shelf product its body links to (`bodyProductLinks`); when an index
 *       entry predates that field, +1 per shelf product in `relatedProducts`
 *   +1  its first resolvable `relatedCategories` entry is this shelf
 * Ties break on recency, and posts about another accessory brand rank last.
 *
 * Pinned guides are ranked as a tier ahead of unpinned ones (by score within
 * the tier). Every live entry now carries `bodyProductLinks`, and a price list
 * or model round-up links 5–20 shelf products — at +2 each that outweighs the
 * +3 pin many times over, so on a pure sum the editorially chosen explainers
 * never reached the three relevance slots. The score still orders the pinned
 * guides among themselves and every unpinned candidate after them.
 *
 * Candidates are articles that declare this shelf, are pinned to it, or link
 * one of its products in the body. The "newest" slots only draw from articles
 * that declare the shelf, so recency never pulls in a tangential post.
 *
 * Scheduled-but-unpublished articles are excluded by `getLiveIndex()`: linking
 * to a slug whose page does not exist yet would emit a 404 into every category
 * page, which is the exact failure the scheduled-blog route was hardened
 * against. A category with no live article simply renders no rail.
 *
 * `shelfProductSlugs` is the product list the shelf renders; without it only
 * the pinned and first-category signals apply.
 */
export function getArticlesForCategory(
    brandSlug: string,
    categorySlug: string,
    locale: string,
    limit = 5,
    shelfProductSlugs: readonly string[] = [],
): CategoryArticleLink[] {
    const routes = realCategoryRoutes();
    const target = `${brandSlug.toLowerCase()}/${categorySlug.toLowerCase()}`;
    if (!routes.has(target)) return [];

    const isArabic = locale === 'ar';
    const pinned = new Set(PINNED_ARTICLES[target] ?? []);
    const shelf = new Set(shelfProductSlugs);

    const declares = (entry: BlogIndexEntry) =>
        (entry.relatedCategories || []).some(raw => resolveCategoryKey(raw, routes) === target);

    const shelfLinkScore = (entry: BlogIndexEntry): number => {
        const bodyLinks = (entry as { bodyProductLinks?: string[] }).bodyProductLinks;
        if (Array.isArray(bodyLinks)) {
            return 2 * bodyLinks.filter(slug => shelf.has(slug)).length;
        }
        return (entry.relatedProducts || []).filter(slug => shelf.has(slug)).length;
    };

    const firstCategoryIsShelf = (entry: BlogIndexEntry): boolean => {
        for (const raw of entry.relatedCategories || []) {
            const resolved = resolveCategoryKey(raw, routes);
            if (resolved) return resolved === target;
        }
        return false;
    };

    const scored = getLiveIndex()
        .map(entry => {
            const linkScore = shelfLinkScore(entry);
            const isPinned = pinned.has(entry.slug);
            const isDeclared = declares(entry);
            const score = (isPinned ? 3 : 0) + linkScore + (firstCategoryIsShelf(entry) ? 1 : 0);
            return {
                entry,
                score,
                isPinned,
                isDeclared,
                isCandidate: isPinned || isDeclared || linkScore > 0,
                otherBrand: isOtherBrandArticle(entry.slug),
                time: Date.parse(entry.publishDate),
            };
        })
        .filter(item => item.isCandidate);

    const byRelevance = [...scored]
        .filter(item => item.score > 0)
        .sort((a, b) =>
            Number(a.otherBrand) - Number(b.otherBrand)
            || Number(b.isPinned) - Number(a.isPinned)
            || b.score - a.score
            || b.time - a.time,
        );
    const byRecency = [...scored]
        .filter(item => item.isDeclared)
        .sort((a, b) => Number(a.otherBrand) - Number(b.otherBrand) || b.time - a.time);

    const chosen: BlogIndexEntry[] = [];
    const seen = new Set<string>();
    const take = (items: typeof scored, max: number) => {
        let added = 0;
        for (const item of items) {
            if (chosen.length >= limit || added >= max) break;
            if (seen.has(item.entry.slug)) continue;
            seen.add(item.entry.slug);
            chosen.push(item.entry);
            added += 1;
        }
    };
    take(byRelevance, RELEVANCE_SLOTS);
    take(byRecency, NEWEST_SLOTS);
    // A shelf with few declared articles still fills its rail from the
    // remaining relevance-ranked candidates.
    take(byRelevance, limit);

    return chosen
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
