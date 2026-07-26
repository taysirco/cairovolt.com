/**
 * Entry-price token for meta descriptions.
 *
 * A description may write `{minPrice}` where it wants the cheapest live price on
 * whatever shelf the page lists. Resolving it here rather than typing a figure
 * into the copy means the SERP snippet is filled from the catalogue at build
 * time and cannot drift from the shelf — this repo already carries a price in
 * roughly twenty places, and a hard-coded number in metadata would quietly
 * become a twenty-first that nobody remembers to update on a price change.
 *
 * Descriptions without the token are returned untouched, so pages that do not
 * opt in are unaffected.
 */

/** Structural subset of a catalogue product that this helper needs. */
export interface PricedProduct {
    price?: number;
}

const TOKEN = '{minPrice}';
/** Matches the whole sentence carrying the token, in Arabic or Latin script. */
const TOKEN_SENTENCE = /[^.!؟]*\{minPrice\}[^.!؟]*[.!؟]\s*/g;

export function resolveMinPriceToken(description: string, products: readonly PricedProduct[]): string {
    if (!description.includes(TOKEN)) return description;

    const prices = products
        .map(product => product.price)
        .filter((price): price is number => typeof price === 'number' && price > 0);

    // Nothing priced to quote: drop the sentence that asked for a figure rather
    // than shipping a literal "{minPrice}" into a search result.
    if (prices.length === 0) return description.replace(TOKEN_SENTENCE, '').trim();

    return description.split(TOKEN).join(Math.min(...prices).toLocaleString('en-US')).trim();
}
