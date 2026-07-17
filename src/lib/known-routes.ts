// Shared URL truth sources for the public page surface.
//
// Consumed by BOTH gatekeepers so the two content surfaces always agree on
// which URLs exist (same 404s) and where retired URLs point (same 301s):
//   - src/middleware.ts                                  → HTML responses
//   - src/app/api/markdown-negotiate/[...slug]/route.ts  → markdown responses
//     (Accept: text/markdown content negotiation for AI agents)
//
// Keep this module pure data — it must stay edge-runtime safe for middleware.

// Every valid first path segment (after the optional locale prefix).
// Anything else gets a REAL 404 — the FAH adapter turns Next's own
// not-found responses into HTTP 200 (soft-404), so unknown URLs must be
// rejected before they reach the router.
// MAINTENANCE: extend when adding a brand, generic category, or landing page.
export const KNOWN_TOP_SEGMENTS = new Set([
    // brands + brand hubs
    'anker', 'joyroom', 'soundcore',
    // generic category landing pages
    'power-banks', 'chargers', 'cables', 'earbuds',
    // content & info pages
    'about', 'team', 'contact', 'faq', 'blog', 'lab', 'locations', 'solutions',
    'verify', 'warranty', 'shipping', 'return-policy', 'privacy', 'terms',
    // commerce & account flows
    'checkout', 'confirm', 'review', 'search',
    // infrastructure routes handled before public-page validation
    'admin', 'api', 'go',
]);

// Retired product slugs → their established canonical successor paths (301).
// The explicit map prevents legacy links from reaching a soft-not-found page.
// Deliberately fail-open: slugs NOT listed here fall through untouched, so
// Firestore-only products (not in the static catalog) are never affected.
// MAINTENANCE: when a product is retired/renamed, add `old-slug: '/brand/category/new-slug'`.
export const LEGACY_PRODUCT_REDIRECTS: Record<string, string> = {
    'anker-zolo-a1610-5000': '/anker/power-banks/anker-zolo-a110d-10000',
    'anker-zolo-a1650-10000': '/anker/power-banks/anker-zolo-a110d-10000',
    'anker-zolo-a1671-20000': '/anker/power-banks/anker-zolo-a110e-20000',
    'anker-a2643-45w': '/anker/wall-chargers/anker-nano-45w-smart-display-charger',
    'anker-312-a81h5-30w': '/anker/wall-chargers/anker-a2147-gan-charger-30w',
    'anker-nano-30w': '/anker/wall-chargers/anker-a2147-gan-charger-30w',
    'anker-nano-4-a2337-30w': '/anker/wall-chargers/anker-a2147-gan-charger-30w',
    'anker-nano-pro-20w': '/anker/wall-chargers/anker-powerport-20w',
    'anker-usb-c-to-usb-c-100w': '/anker/cables/anker-zolo-usb-c-braided-cable',
    'joyroom-magnetic-wireless-power-bank-10000': '/joyroom/power-banks/joyroom-magnetic-power-bank-10000',
    'soundcore-r50i-earbuds': '/soundcore/audio/anker-soundcore-r50i',
};
