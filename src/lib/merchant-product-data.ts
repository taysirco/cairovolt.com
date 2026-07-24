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
 * Records omitted from Merchant and machine catalogs while their public URLs
 * remain untouched. Two lack stable product landing pages. The P30i record is
 * a regional-name alias of R50i NC: Soundcore identifies both as model A3959.
 * The Nano 45W 1C-PD record is a descriptive-slug alias of the primary Nano
 * 45W listing: both resolve to Anker model A2664 (variant A2664K11 on the
 * primary listing), so publishing them as separate Merchant offers would
 * create a duplicate-SKU signal.
 */
export const MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS = new Set([
    'joyroom-usb-a-lightning-1.2m',
    'joyroom-usb-a-type-c-1.2m',
    // P30i (A3959) is the public + Merchant canonical; R50i NC remains the alias stub.
    'anker-nano-45w-1c-pd', // A2664 alias of anker-nano-45w
    'anker-soundcore-r50i-nc', // A3959 alias of soundcore-p30i — do not duplicate Merchant SKU
    'anker-zolo-a1681-20000', // active Anker/CPSC recall (rc2506) — do not promote in Merchant
]);

/**
 * Duplicate-identity PDPs that must 301 to the canonical public product URL.
 * Paths are locale-unprefixed (Arabic default); /en is added by the redirect layer.
 */
export const SEO_ALIAS_REDIRECTS: Record<string, string> = {
    'anker-nano-45w-1c-pd': '/anker/wall-chargers/anker-nano-45w',
    // Gold bench lives on P30i (A3959); R50i NC is the regional-name stub.
    'anker-soundcore-r50i-nc': '/soundcore/audio/soundcore-p30i-earbuds',
    'joyroom-usb-a-lightning-1.2m': '/joyroom/cables',
    'joyroom-usb-a-type-c-1.2m': '/joyroom/cables',
};

/**
 * Keep the HTML page for owners / safety disclosure, but exclude from indexing
 * and the HTML sitemap so Shopping/organic do not promote the SKU.
 */
export const SEO_NOINDEX_PRODUCT_SLUGS = new Set([
    'anker-zolo-a1681-20000',
]);

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
export const CATALOG_LAST_REVIEWED_AT = '2026-07-17T00:00:00+02:00';
