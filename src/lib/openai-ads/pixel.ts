/**
 * OpenAI (ChatGPT) Ads Measurement Pixel — browser wrapper.
 *
 * The queue stub + `oaiq("init", { pixelId })` live in the static <head>
 * (src/app/[locale]/layout.tsx) so every `measure` call made before the SDK
 * finishes loading is queued, exactly as the official loader does. The SDK
 * script itself is injected by the same interaction gate that loads GA4 and
 * TikTok (first scroll/click/touch, else 15 s) — the queue makes that safe.
 *
 * This module never initialises the pixel; it only enqueues commands.
 * Everything is wrapped so a vendor failure can never break checkout.
 *
 * Pixel ID: K8QGQ8ULRsFPeG892Pi4w9 (public)
 * Docs: https://developers.openai.com/ads/measurement-pixel
 */

import {
    OPENAI_ADS_PIXEL_ID,
    ORDER_CURRENCY,
    egpToMinorUnits,
    egyptianPhoneToHashInput,
    orderCreatedEventId,
    orderLinesToContents,
    readCookie,
    type OpenAiContentItem,
    type OpenAiContentsData,
    type OpenAiEventName,
    type OrderLineForAds,
} from './shared.ts';

type OaiqFn = (...args: unknown[]) => void;

interface OaiqWindow extends Window {
    oaiq?: OaiqFn & { q?: unknown[] };
}

function getOaiq(): OaiqFn | null {
    if (typeof window === 'undefined') return null;
    const w = window as OaiqWindow;
    return typeof w.oaiq === 'function' ? w.oaiq : null;
}

/** Enqueue a command; swallow every error (ad blockers, CSP, vendor throws). */
function call(...args: unknown[]): void {
    try {
        const oaiq = getOaiq();
        if (!oaiq) return;
        oaiq(...args);
    } catch {
        // tracking must never surface as an error to the shopper
    }
}

// ── Consent ─────────────────────────────────────────────────────────────────
// The site has no cookie banner today (Egyptian storefront, no GDPR trigger),
// so measurement is allowed by default — the Pixel's own default. These
// helpers are the single place a future consent UI must call; the same stored
// answer is forwarded to the server with the order so the Conversions API
// honours a denial too. Blocked events are never replayed after consent.

const CONSENT_STORAGE_KEY = 'cv_measurement_consent';

export function getMeasurementConsent(): boolean {
    if (typeof window === 'undefined') return true;
    try {
        return window.localStorage.getItem(CONSENT_STORAGE_KEY) !== 'denied';
    } catch {
        return true;
    }
}

export function setMeasurementConsent(granted: boolean): void {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, granted ? 'granted' : 'denied');
    } catch {
        // storage unavailable — the in-page pixel state below still applies
    }
    call('consent', granted);
}

/** Re-apply a stored denial before the SDK boots (called once from the tracker). */
export function applyStoredConsent(): void {
    if (!getMeasurementConsent()) call('consent', false);
}

// ── Event firing ────────────────────────────────────────────────────────────

interface MeasureOptions {
    event_id?: string;
    opt_out?: boolean;
}

function measure(name: OpenAiEventName, data: OpenAiContentsData, options?: MeasureOptions): void {
    if (typeof window === 'undefined') return;
    if (!getMeasurementConsent()) return;
    if (options && Object.keys(options).length > 0) call('measure', name, data, options);
    else call('measure', name, data);
}

// ── page_viewed (SPA-safe) ──────────────────────────────────────────────────
// Module-level memory of the last reported path: React Strict Mode runs the
// effect twice in development and hydration re-renders once more; comparing
// against the last path collapses those into one event while every genuine
// route change still reports.

let lastPageViewedPath: string | null = null;

export function oaiPageViewed(pathname: string): void {
    if (!pathname || pathname === lastPageViewedPath) return;
    lastPageViewedPath = pathname;
    measure('page_viewed', {
        type: 'contents',
        contents: [{ id: pathname, content_type: 'page' }],
    });
}

/** Test/HMR hook — resets the SPA dedupe memory. */
export function __resetPageViewedMemory(): void {
    lastPageViewedPath = null;
}

// ── Commerce funnel ─────────────────────────────────────────────────────────

export function oaiContentsViewed(item: { id: string; name?: string; priceEgp?: number }): void {
    if (!item.id) return;
    const content: OpenAiContentItem = { id: item.id, content_type: 'product' };
    if (item.name) content.name = item.name.slice(0, 200);
    const minor = egpToMinorUnits(item.priceEgp);
    if (minor > 0) {
        content.amount = minor;
        content.currency = ORDER_CURRENCY;
    }
    measure('contents_viewed', { type: 'contents', contents: [content] });
}

export function oaiItemsAdded(lines: OrderLineForAds[]): void {
    const contents = orderLinesToContents(lines);
    if (contents.length === 0) return;
    const valueEgp = lines.reduce((s, l) => s + (Number(l.price) || 0) * (Number(l.quantity) || 1), 0);
    measure('items_added', {
        type: 'contents',
        amount: egpToMinorUnits(valueEgp),
        currency: ORDER_CURRENCY,
        contents,
    });
}

export function oaiCheckoutStarted(lines: OrderLineForAds[], totalEgp: number): void {
    const contents = orderLinesToContents(lines);
    if (contents.length === 0) return;
    measure('checkout_started', {
        type: 'contents',
        amount: egpToMinorUnits(totalEgp),
        currency: ORDER_CURRENCY,
        contents,
    });
}

/**
 * `order_created` — fired by the checkout page right after the order API
 * confirms the order is committed. The event id comes from the server
 * response, so it matches the Conversions API `id` for that order.
 *
 * Guarded per order in sessionStorage so a retry, a back-navigation or a
 * refresh of the confirmation page never reports the same order twice from
 * the browser (OpenAI would dedupe on the id anyway; this avoids the noise).
 */
export function oaiOrderCreated(order: {
    orderId: string;
    items: OrderLineForAds[];
    totalAmountEgp: number;
}): boolean {
    if (!order.orderId) return false;
    const eventId = orderCreatedEventId(order.orderId);
    const guardKey = `oai_${eventId}`;
    try {
        if (window.sessionStorage.getItem(guardKey)) return false;
        window.sessionStorage.setItem(guardKey, '1');
    } catch {
        // private browsing — fire anyway; the server id keeps it deduplicated
    }
    measure(
        'order_created',
        {
            type: 'contents',
            amount: egpToMinorUnits(order.totalAmountEgp),
            currency: ORDER_CURRENCY,
            contents: orderLinesToContents(order.items),
        },
        { event_id: eventId },
    );
    return true;
}

// ── Advanced matching (request-scoped `user` on init) ───────────────────────

async function sha256Hex(input: string): Promise<string | null> {
    try {
        if (typeof crypto === 'undefined' || !crypto.subtle) return null;
        const bytes = new TextEncoder().encode(input);
        const digest = await crypto.subtle.digest('SHA-256', bytes);
        return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
        return null;
    }
}

/**
 * Attach hashed match data to the pixel session before the conversion fires.
 * Only the phone (the one identifier the COD form always has) is hashed, in
 * the browser, per the documented normalisation. Skipped entirely when the
 * shopper denied measurement. Resolves whether anything was sent.
 */
export async function oaiInitUserFromCheckout(user: {
    phone?: string;
    regionLabel?: string;
}): Promise<boolean> {
    if (typeof window === 'undefined' || !getMeasurementConsent()) return false;
    const digits = egyptianPhoneToHashInput(user.phone);
    if (!digits) return false;
    const phone_number_sha256 = await sha256Hex(digits);
    if (!phone_number_sha256) return false;
    const userObj: Record<string, string> = { phone_number_sha256, country: 'EG' };
    if (user.regionLabel) userObj.region = String(user.regionLabel).slice(0, 128);
    call('init', { pixelId: OPENAI_ADS_PIXEL_ID, user: userObj });
    return true;
}

// ── Attribution context for the server-side event ───────────────────────────

/**
 * The context the checkout page ships with the order so the Conversions API
 * event can carry the same attribution the pixel saw: the `__oppref` click
 * identifier, the `__obref` browser reference (forwarded only with consent)
 * and the conversion page URL (path only — no query/fragment).
 */
export function collectAdsContext(): {
    pageUrl: string;
    oppref?: string;
    obref?: string;
    consent: boolean;
} {
    const consent = getMeasurementConsent();
    const ctx: { pageUrl: string; oppref?: string; obref?: string; consent: boolean } = {
        pageUrl: typeof window !== 'undefined'
            ? `${window.location.origin}${window.location.pathname}`
            : '',
        consent,
    };
    if (typeof document === 'undefined') return ctx;
    try {
        const oppref = readCookie(document.cookie, '__oppref');
        if (oppref) ctx.oppref = oppref;
        if (consent) {
            const obref = readCookie(document.cookie, '__obref');
            if (obref) ctx.obref = obref;
        }
    } catch {
        // cookies blocked — send the page URL only
    }
    return ctx;
}
