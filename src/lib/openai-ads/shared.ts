/**
 * OpenAI (ChatGPT) Ads measurement — shared, side-effect-free helpers.
 *
 * Used by BOTH the browser Pixel wrapper (`./pixel.ts`) and the server
 * Conversions API sender (`./conversions-api.ts`) so the two channels agree on
 * the event id, the amount unit, the content items and the URL hygiene rules.
 * Keep this file free of `@/` aliases and of browser/node-only APIs so it can
 * be unit-tested with `node --test --experimental-strip-types`.
 *
 * Docs (verified 2026-09-06):
 *   https://developers.openai.com/ads/measurement-pixel
 *   https://developers.openai.com/ads/conversions-api
 *   https://developers.openai.com/ads/supported-events
 */

import { normalizeEgyptianPhone, isValidEgyptianPhone } from '../egyptian-phone.ts';

/** Public identifier — safe to ship in the browser bundle. */
export const OPENAI_ADS_PIXEL_ID = 'K8QGQ8ULRsFPeG892Pi4w9';

/** Store currency. The ad account bills in USD; order data stays in EGP. */
export const ORDER_CURRENCY = 'EGP';

/** Hosts whose pages may be reported as the conversion `source_url`. */
export const ALLOWED_SOURCE_HOSTS = new Set(['cairovolt.com', 'www.cairovolt.com']);

/** Fallback conversion page when the browser context is missing or invalid. */
export const DEFAULT_ORDER_SOURCE_URL = 'https://cairovolt.com/checkout';

export type OpenAiEventName =
    | 'page_viewed'
    | 'contents_viewed'
    | 'items_added'
    | 'checkout_started'
    | 'order_created';

export interface OpenAiContentItem {
    id: string;
    name?: string;
    content_type?: 'product' | 'page';
    quantity?: number;
    amount?: number;
    currency?: string;
    group_id?: string;
}

/** `data` object for the `contents` shape (all commerce + page events). */
export interface OpenAiContentsData {
    type: 'contents';
    amount?: number;
    currency?: string;
    contents?: OpenAiContentItem[];
}

/**
 * The stable, non-sensitive event reference shared by the Pixel `event_id`
 * and the Conversions API `id`. Derived from the order id the server already
 * persists, so a retry, a refresh of /confirm or a second visit can never mint
 * a new id for the same order — and a second real order always gets its own.
 */
export function orderCreatedEventId(orderId: string): string {
    return `order_${orderId}`;
}

/**
 * EGP → piastres (ISO 4217 minor unit, exponent 2), as an integer.
 * 1730 EGP → 173000. Non-finite or negative input collapses to 0 rather than
 * throwing: a malformed amount must never break an order.
 */
export function egpToMinorUnits(egp: unknown): number {
    const n = typeof egp === 'number' ? egp : Number(egp);
    if (!Number.isFinite(n) || n <= 0) return 0;
    return Math.round(n * 100);
}

export interface OrderLineForAds {
    sku?: string;
    slug?: string;
    productId?: string;
    name?: string;
    price?: number;      // unit price in EGP, server-resolved
    quantity?: number;
    bundleId?: string;
}

/**
 * Catalog line items → OpenAI `contents[]`. The id is the catalog SKU when the
 * server resolved one, else the product slug/id — never a display name.
 */
export function orderLinesToContents(lines: OrderLineForAds[]): OpenAiContentItem[] {
    const out: OpenAiContentItem[] = [];
    for (const line of lines || []) {
        const id = String(line.sku || line.slug || line.productId || '').trim();
        if (!id) continue;
        const quantity = Math.max(1, Math.floor(Number(line.quantity) || 1));
        const item: OpenAiContentItem = {
            id,
            content_type: 'product',
            quantity,
        };
        const name = String(line.name || '').trim();
        if (name) item.name = name.slice(0, 200);
        const unitMinor = egpToMinorUnits(line.price);
        if (unitMinor > 0) {
            item.amount = unitMinor;
            item.currency = ORDER_CURRENCY;
        }
        const groupId = String(line.slug || line.productId || '').trim();
        if (groupId && groupId !== id) item.group_id = groupId;
        out.push(item);
    }
    return out;
}

/**
 * Build the `order_created` data object. `totalAmountEgp` is the SERVER total
 * after coupon + bundle discounts and INCLUDING the shipping fee — i.e. what
 * the courier collects on delivery. The same number feeds GA4 and TikTok.
 */
export function buildOrderCreatedData(
    lines: OrderLineForAds[],
    totalAmountEgp: number,
): OpenAiContentsData {
    return {
        type: 'contents',
        amount: egpToMinorUnits(totalAmountEgp),
        currency: ORDER_CURRENCY,
        contents: orderLinesToContents(lines),
    };
}

/**
 * Egyptian mobile → the digit string OpenAI wants hashed:
 * country code kept, leading `+` and leading zeroes removed, 8–15 digits.
 * `01012345678` → `201012345678`. Returns null for anything that is not a
 * well-formed Egyptian mobile — we never guess a country code.
 */
export function egyptianPhoneToHashInput(raw: unknown): string | null {
    const national = normalizeEgyptianPhone(raw);
    if (!isValidEgyptianPhone(national)) return null;
    return `20${national.slice(1)}`;
}

/**
 * Reduce a page URL to `scheme://host/path` on an allowed host, dropping the
 * query string, the fragment and anything that is not a cairovolt.com page.
 * Returns null when the input cannot be used, so callers fall back explicitly.
 */
export function sanitizeSourceUrl(
    raw: unknown,
    allowedHosts: Set<string> = ALLOWED_SOURCE_HOSTS,
): string | null {
    if (typeof raw !== 'string' || raw.length === 0 || raw.length > 2048) return null;
    let url: URL;
    try {
        url = new URL(raw);
    } catch {
        return null;
    }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    if (!allowedHosts.has(url.hostname)) return null;
    // Path only — no query, no fragment, no credentials. A path that looks like
    // it carries personal data (the /confirm?order=… fallback encodes the whole
    // order in the query, which we have already dropped) is reduced further.
    const path = url.pathname.replace(/\/+$/, '') || '/';
    return `${url.protocol}//${url.hostname}${path}`;
}

/**
 * Opaque OpenAI attribution identifiers (`__oppref` / `__obref` cookie values)
 * are passed through unmodified — but only if they look like a token and not
 * like injected junk. Printable ASCII, no whitespace, bounded length.
 */
export function sanitizeOpaqueRef(raw: unknown): string | null {
    if (typeof raw !== 'string') return null;
    const v = raw.trim();
    if (v.length === 0 || v.length > 512) return null;
    if (!/^[\x21-\x7E]+$/.test(v)) return null;
    return v;
}

/** Read a cookie value by name from a `document.cookie` string (browser side). */
export function readCookie(cookieString: string, name: string): string | null {
    if (!cookieString) return null;
    for (const part of cookieString.split(';')) {
        const eq = part.indexOf('=');
        if (eq < 0) continue;
        if (part.slice(0, eq).trim() !== name) continue;
        try {
            return decodeURIComponent(part.slice(eq + 1).trim());
        } catch {
            return part.slice(eq + 1).trim();
        }
    }
    return null;
}

/**
 * Attribution + consent context the checkout page sends alongside the order.
 * Everything here is optional and validated again on the server; it is NOT a
 * public "send any conversion" surface — it rides on the order-creation
 * request and only influences the metadata of the server-side event that
 * the order commit itself produces.
 */
export interface AdsContextInput {
    pageUrl?: string;
    oppref?: string;
    obref?: string;
    consent?: boolean;
}

export interface AdsContext {
    sourceUrl: string;
    oppref: string | null;
    obref: string | null;
    consent: boolean;
}

export function normalizeAdsContext(
    raw: unknown,
    fallbackSourceUrl: string = DEFAULT_ORDER_SOURCE_URL,
): AdsContext {
    const input = (raw && typeof raw === 'object' ? raw : {}) as AdsContextInput;
    return {
        sourceUrl: sanitizeSourceUrl(input.pageUrl) || fallbackSourceUrl,
        oppref: sanitizeOpaqueRef(input.oppref),
        obref: sanitizeOpaqueRef(input.obref),
        // Consent defaults to allowed (the Pixel's own default) unless the
        // browser explicitly reported a denial.
        consent: input.consent !== false,
    };
}
