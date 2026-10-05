// Which public page paths have a markdown twin at /api/markdown-negotiate/<path>.
//
// The middleware used to rewrite EVERY request carrying `Accept: text/markdown`
// to the markdown route, so an agent asking for /contact or /terms got a
// generic 550-byte stub with HTTP 200 instead of the real page. Now only paths
// with a real generator are rewritten; everything else falls through to the
// HTML page, and the markdown route itself 404s paths it has no generator for.
//
// Pattern-level on purpose: the markdown route still validates the concrete
// brand/category/product/article/governorate and answers 404 or 301 exactly as
// the HTML surface does. Keep this module dependency-free (edge middleware).
//
// MAINTENANCE: when a generator is added to or removed from
// src/app/api/markdown-negotiate/[...slug]/route.ts, update this list.

const PRODUCT_BRANDS = new Set(['anker', 'joyroom', 'soundcore', 'jbl']);
const GENERIC_CATEGORY_ROOTS = new Set(['power-banks', 'chargers', 'cables', 'earbuds']);
const SINGLE_PAGES = new Set(['about', 'faq', 'shipping', 'return-policy', 'warranty', 'lab', 'blog']);

/** True when `pathname` (as requested, e.g. "/en/anker/power-banks") has a markdown twin. */
export function hasMarkdownTwin(pathname: string): boolean {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'en') segments.shift();

    // Arabic home (/) and English home (/en).
    if (segments.length === 0) return true;

    const [first, second] = segments;

    // Brand hubs, brand categories and product pages: /brand, /brand/category, /brand/category/slug.
    if (PRODUCT_BRANDS.has(first)) return segments.length <= 3;

    // Cross-brand category hubs: /power-banks, /chargers, /cables, /earbuds.
    if (GENERIC_CATEGORY_ROOTS.has(first)) return segments.length === 1;

    if (segments.length === 1) return SINGLE_PAGES.has(first);

    if (segments.length === 2) {
        // Blog articles, solution pages and governorate delivery pages.
        // (/solutions and /locations themselves have no HTML page.)
        return first === 'blog' || first === 'solutions' || first === 'locations'
            ? Boolean(second)
            : false;
    }

    return false;
}
