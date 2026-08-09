const SITE_ORIGIN = 'https://cairovolt.com';

const GTIN_LENGTHS = new Set([8, 12, 13, 14]);
const DOCUMENTED_CATALOG_GTIN_PREFIXES = ['0194644', '0840053', '0848061'];

type ProductRouteIdentity = {
    brand: string;
    categorySlug?: string;
    slug: string;
};

/**
 * Return the established catalogue route for a product without changing any
 * page URL. Soundcore is its own public route even for legacy records whose
 * brand field still says Anker.
 */
export function getMerchantProductBrandSlug(product: Pick<ProductRouteIdentity, 'brand' | 'categorySlug'>): string {
    const brand = product.brand.trim().toLowerCase();
    const category = product.categorySlug?.trim().toLowerCase();
    const isSoundcoreCategory = category === 'audio' || category === 'speakers';

    if (brand === 'soundcore' || (brand === 'anker' && isSoundcoreCategory)) {
        return 'soundcore';
    }

    return brand;
}

export function getMerchantProductUrl(product: ProductRouteIdentity, locale: string = 'ar'): string {
    const localePrefix = locale === 'en' ? '/en' : '';
    const brand = getMerchantProductBrandSlug(product);
    const category = product.categorySlug?.trim().toLowerCase() || '';
    const path = [brand, category, product.slug].filter(Boolean).join('/');

    return `${SITE_ORIGIN}${localePrefix}/${path}`;
}

/** Validate the GS1 check digit before exposing a catalogue identifier. */
export function normalizeGtin(...candidates: Array<string | undefined>): string | undefined {
    for (const candidate of candidates) {
        const gtin = candidate?.trim();
        if (!gtin || !/^\d+$/.test(gtin) || !GTIN_LENGTHS.has(gtin.length)) {
            continue;
        }

        const checkDigit = Number(gtin.at(-1));
        let sum = 0;
        let positionFromRight = 0;

        for (let index = gtin.length - 2; index >= 0; index -= 1) {
            const weight = positionFromRight % 2 === 0 ? 3 : 1;
            sum += Number(gtin[index]) * weight;
            positionFromRight += 1;
        }

        if ((10 - (sum % 10)) % 10 === checkDigit) {
            return gtin;
        }
    }

    return undefined;
}

/**
 * Publish only checksum-valid GTINs from catalogue prefixes that can be tied
 * to the stocked Anker/Soundcore variants. Joyroom and unfamiliar regional
 * identifiers stay omitted until a barcode from the exact stocked package is
 * recorded; their MPN remains available for product matching.
 */
export function getMerchantGtin(...candidates: Array<string | undefined>): string | undefined {
    const gtin = normalizeGtin(...candidates);
    return gtin && DOCUMENTED_CATALOG_GTIN_PREFIXES.some((prefix) => gtin.startsWith(prefix))
        ? gtin
        : undefined;
}

export function getGtinSchemaProperty(gtin: string | undefined): Record<string, string> {
    if (!gtin) return {};
    return { [`gtin${gtin.length}`]: gtin };
}

export function normalizeMpn(value: string | undefined): string | undefined {
    const mpn = value?.trim();
    return mpn && mpn.length <= 70 ? mpn : undefined;
}

export const STANDARD_SHIPPING_MIN_EGP = 70;
export const STANDARD_SHIPPING_MAX_EGP = 130;
export const STANDARD_DELIVERY_MIN_DAYS = 1;
export const STANDARD_DELIVERY_MAX_DAYS = 5;

/**
 * Return window published on /return-policy.
 *
 * Single source for every surface that restates it — Offer.hasMerchantReturnPolicy
 * on product pages, the store-level MerchantReturnPolicy node, and the machine
 * answer block in llms.txt. A number that disagrees across those surfaces is
 * exactly the kind of inconsistency Merchant review and AI answers both punish.
 */
export const STANDARD_RETURN_WINDOW_DAYS = 14;

/**
 * Records omitted from Merchant and machine catalogs while their public URLs
 * remain untouched. The two Joyroom cables are `status: "retired"` and lack
 * stable product landing pages.
 *
 * R50i NC and Nano 45W 1C-PD used to be listed here as alias stubs of P30i and
 * Nano 45W. That was wrong and is reversed: each is a separate product with its
 * own SKU (SH30 / variant A3959H11, barcode 194644197421 — owner-verified from the box 2026-08-02; AC09 against AC01)
 * and its own independently tracked stock — 812 and 222 units. A single
 * catalogue record cannot hold two stock counts, so a shared MPN was never
 * sufficient evidence of one product. Before collapsing two records again,
 * check stock and SKU, not just MPN.
 */
export const MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS = new Set([
    'joyroom-usb-a-lightning-1.2m', // status: retired
    'joyroom-usb-a-type-c-1.2m', // status: retired
    // JBL launch batch — excluded from the Merchant feed until real product
    // images land (an imageless offer emits an invalid <g:image_link> and
    // risks disapproval; see JBL-STRATEGY.md §10 gate 1). Remove each slug
    // as its public/products/jbl/<slug>/ gallery is populated.
    'jbl-go-4',
    'jbl-clip-5',
    'jbl-flip-6',
    'jbl-flip-7',
    'jbl-charge-5',
    'jbl-charge-6',
    'jbl-xtreme-4',
    'jbl-pulse-5',
    'jbl-boombox-3',
    'jbl-partybox-encore-essential',
    'jbl-partybox-club-120',
    'jbl-partybox-stage-320',
    'jbl-partybox-1000',
    'jbl-partybox-wireless-mic',
    'jbl-tune-520bt',
    'jbl-tune-720bt',
    'jbl-tune-770nc',
    'jbl-wave-beam',
    'jbl-tune-buds',
    'jbl-tour-pro-2',
    'jbl-t110',
    'jbl-t110bt',
    // A1681 was excluded here as a recalled SKU. Owner attests the stock on hand
    // was serial-checked against anker.com/rc2506 and falls outside the affected
    // range — see RECALL_STOCK_VERIFIED_OUTSIDE_SCOPE, which also keeps the
    // disclosure on the product page. Re-exclude if a new batch is unverified.
]);

/**
 * Slugs whose model carries an active manufacturer/CPSC recall.
 *
 * Recall findings are written up per product in `src/data/details/<slug>.ts` —
 * NOT in `src/data/products/` — so grepping the product record alone returns
 * nothing and reads as "no recall". This set exists so listing surfaces can ask
 * the question directly instead of re-deriving it from prose.
 *
 * Membership here is *disclosure*, not suppression: these products stay in the
 * catalogue, in the grid and in listings. Suppression is a separate decision and
 * lives in MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS, which A1681 is in and A1263
 * deliberately is not.
 */
export const RECALL_AFFECTED_PRODUCT_SLUGS = new Set([
    // A1263 — CPSC June 2025, US-manufactured units Jan 2016 – Oct 2019,
    // fire/overheating hazard. Serial-scoped, so the PDP is the place that can
    // explain scope; listings only need to say "check before you buy".
    'anker-powercore-10000',
    // A1681 — Anker/CPSC rc2506. Also Merchant-excluded above.
    'anker-zolo-a1681-20000',
]);

/** True when the slug's model has an active recall that a buyer should see. */
export function isRecallAffectedSlug(slug: string): boolean {
    return RECALL_AFFECTED_PRODUCT_SLUGS.has(slug);
}

/**
 * Recalls broad enough that the store does not sell the model at all, so the PDP
 * blocks purchase rather than merely disclosing.
 *
 * This is deliberately narrower than RECALL_AFFECTED_PRODUCT_SLUGS. A1681's
 * recall covers the whole model (anker.com/rc2506) and the page states plainly
 * that no new units are sold. A1263's is scoped to US-manufactured units from a
 * date window, so its buyers are told to check their serial — disclosure, not a
 * block.
 *
 * Keep this separate from SEO_NOINDEX_PRODUCT_SLUGS. The PDP used to derive both
 * its recall banner and its out-of-stock state from that indexing set, so making
 * a recall notice findable silently removed the warning and made a recalled pack
 * purchasable. Indexing and safety are unrelated questions.
 */
export const RECALL_PURCHASE_BLOCKED_PRODUCT_SLUGS = new Set<string>([]);

/** True when an active recall means this model must not be sold at all. */
export function isRecallPurchaseBlockedSlug(slug: string): boolean {
    return RECALL_PURCHASE_BLOCKED_PRODUCT_SLUGS.has(slug);
}

/**
 * Models named in a recall programme whose CairoVolt stock was serial-checked
 * against the manufacturer's tool and found outside the affected range.
 *
 * This is an owner attestation about physical inventory, recorded with its date
 * so the basis is auditable — it is not something the codebase can verify. The
 * product page still states that the model appears in a recall programme and
 * still links the official serial checker, because a buyer who searches the
 * model number will find the recall and a silent page would read as concealment.
 * What changes is the claim: from "do not use / not sold" to "these units were
 * checked and fall outside it, verify yours on arrival".
 *
 * If stock is replenished from a new batch, re-check before trusting this.
 */
export const RECALL_STOCK_VERIFIED_OUTSIDE_SCOPE: Record<string, { checkedOn: string; source: string }> = {
    'anker-zolo-a1681-20000': { checkedOn: '2026-07-28', source: 'anker.com/rc2506' },
};

/** True when this model is in a recall programme but our stock was checked clear. */
export function isRecallStockVerifiedOutsideScope(slug: string): boolean {
    return Object.prototype.hasOwnProperty.call(RECALL_STOCK_VERIFIED_OUTSIDE_SCOPE, slug);
}

/**
 * Duplicate-identity PDPs that must 301 to the canonical public product URL.
 * Paths are locale-unprefixed (Arabic default); /en is added by the redirect layer.
 */
export const SEO_ALIAS_REDIRECTS: Record<string, string> = {
    // Retired cables with no standalone landing page — the category is the
    // honest destination. Do NOT add an active, separately stocked product here:
    // R50i NC and Nano 45W 1C-PD were listed here in error and are now served at
    // their own URLs. See MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS above.
    'joyroom-usb-a-lightning-1.2m': '/joyroom/cables',
    'joyroom-usb-a-type-c-1.2m': '/joyroom/cables',
};

/**
 * Pages kept out of the index and the HTML sitemap.
 *
 * A1681 used to sit here. It was removed on the owner's instruction: the page is
 * a recall notice for people who already own the affected unit ("لا نبيع وحدات
 * جديدة منه" / shown as unavailable), and a safety notice nobody can find helps
 * nobody. It is indexable and listed again, and every listing surface renders it
 * with the ⚠️ recall marker via RECALL_AFFECTED_PRODUCT_SLUGS.
 *
 * It stays in MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS: organic discovery of a
 * safety notice is the point, but feeding a recalled model into Merchant as a
 * purchasable offer is a different act with its own policy exposure.
 */
export const SEO_NOINDEX_PRODUCT_SLUGS = new Set<string>([]);

/** Slugs omitted from the HTML sitemap (aliases already redirected + recalls). */
export const SEO_SITEMAP_EXCLUDED_PRODUCT_SLUGS = new Set([
    ...Object.keys(SEO_ALIAS_REDIRECTS),
    ...SEO_NOINDEX_PRODUCT_SLUGS,
]);

/**
 * True when the slug may appear in featured grids, related/bundle slots,
 * category listings, and other promotional surfaces. Alias stubs and
 * recalled SKUs stay reachable by direct URL (or 301) but are not promoted.
 */
export function isStorefrontPromotableSlug(slug: string): boolean {
    return !SEO_SITEMAP_EXCLUDED_PRODUCT_SLUGS.has(slug);
}

/**
 * Resolve a slug to the promotable canonical for cards / related rails.
 * Returns null for recalls and for aliases that only redirect to a category.
 */
export function canonicalPromotableSlug(slug: string): string | null {
    if (SEO_NOINDEX_PRODUCT_SLUGS.has(slug)) return null;
    const destination = SEO_ALIAS_REDIRECTS[slug];
    if (destination) {
        const parts = destination.split('/').filter(Boolean);
        // /brand/category/product-slug → promote the product; /brand/category → drop
        return parts.length >= 3 ? parts[parts.length - 1] : null;
    }
    return slug;
}

/**
 * Rewrite an internal pathname that still points at an alias or recall slug.
 * Used by HTML sanitization so old blog/product hrefs stop promoting bad SKUs.
 */
export function rewriteDeprecatedProductPath(pathname: string): string {
    const input = pathname.trim();
    const localePrefix = /^\/en(?=\/|$)/.test(input) ? '/en' : '';
    const withoutLocale = input.replace(/^\/en(?=\/|$)/, '').replace(/^\//, '');
    const pathMatch = withoutLocale.match(/^([^?#]*)(.*)$/);
    if (!pathMatch) return pathname;

    const pathPart = pathMatch[1];
    const suffix = pathMatch[2] || '';
    const segments = pathPart.split('/').filter(Boolean);
    if (segments.length === 0) return pathname;

    const slug = segments[segments.length - 1];
    if (SEO_NOINDEX_PRODUCT_SLUGS.has(slug)) {
        // Keep a dedicated recall PDP for owners; do not deep-link it from content.
        return `${localePrefix}/anker/power-banks${suffix}`;
    }

    const destination = SEO_ALIAS_REDIRECTS[slug];
    if (destination) {
        return `${localePrefix}${destination}${suffix}`;
    }

    return pathname;
}

/** Deduplicate and remap a related-product slug list for public surfaces. */
export function sanitizeRelatedProductSlugs(slugs: readonly string[]): string[] {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const slug of slugs) {
        const canonical = canonicalPromotableSlug(slug);
        if (!canonical || seen.has(canonical)) continue;
        seen.add(canonical);
        out.push(canonical);
    }
    return out;
}

/** Date of the latest full catalog-content and offer review. */
export const CATALOG_LAST_REVIEWED_AT = '2026-08-09T00:00:00+03:00';
