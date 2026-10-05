/**
 * Category slug → `Categories` message key (messages/{ar,en}.json).
 *
 * One map for every surface that names a product's shelf: the visible PDP
 * breadcrumb and spec table (ProductPageClient, a client component) and the
 * BreadcrumbList JSON-LD (the server page). They used to disagree — the schema
 * title-cased the slug, so Arabic product pages told machines their category
 * was "Cables" / "Wall Chargers" while the visible crumb read "كابلات شحن" /
 * "شواحن حائط". Unknown slugs fall back to `Categories.other` at the call site.
 *
 * Pure data, no imports: safe to load from client and server code alike.
 */
export const categoryKeyMap: Record<string, string> = {
    'power-banks': 'powerBanks',
    'wall-chargers': 'wallChargers',
    'cables': 'cables',
    'car-chargers': 'carChargers',
    'audio': 'audio',
    'smart-watches': 'smartWatches',
    'speakers': 'speakers',
    'headphones': 'headphones',
    'earbuds': 'earbuds',
    'partybox': 'partybox',
    // These three routed shelves existed without a mapping, so every product on
    // them fell through to Categories.other and rendered a breadcrumb reading
    // "منتجات أخرى" / "Other Products". The message keys were already present.
    'accessories': 'accessories',
    'car-holders': 'carHolders',
    'car-accessories': 'carAccessories',
};
