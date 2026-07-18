/**
 * pricing-display.ts
 * ------------------------------------------------------------------
 * Single source of truth for how a "before-discount" (strikethrough) price is
 * derived for display. The current `price` is always the real selling price
 * (checkout / feed / schema). `originalPrice` is the higher pre-discount
 * reference; every catalogue product carries one at a guaranteed 11–19% above
 * `price` (see scripts/data — the originalPrice values baked into src/data).
 *
 * Display-only: this never touches checkout math, the Google Merchant feed, or
 * Product JSON-LD, all of which continue to submit `price` alone.
 */
export interface DiscountInfo {
    /** true when there is a valid, higher pre-discount price to show */
    hasDiscount: boolean;
    /** whole-number discount percentage, e.g. 15 */
    percent: number;
    /** absolute saving in EGP (originalPrice - price) */
    save: number;
}

export function getDiscountInfo(
    price: number,
    originalPrice?: number | null,
): DiscountInfo {
    if (
        typeof price === 'number' &&
        typeof originalPrice === 'number' &&
        Number.isFinite(originalPrice) &&
        originalPrice > price
    ) {
        return {
            hasDiscount: true,
            percent: Math.round((1 - price / originalPrice) * 100),
            save: originalPrice - price,
        };
    }
    return { hasDiscount: false, percent: 0, save: 0 };
}
