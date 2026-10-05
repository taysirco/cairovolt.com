/**
 * The CairoVolt lead pixel measures arrival at order confirmation ONLY after
 * checkout received a successful order response. It never reads customer data.
 * Legacy commerce/contact/warranty tracking uses its own pixel instance.
 */
export const ORDER_LEAD_PIXEL_ID = 'DB1O8PBC77U5DCODCAM0';
export const ORDER_LEAD_READY_EVENT = 'cv:tiktok-order-leads-ready';
const PENDING_PREFIX = 'cv_order_lead_pending:';
const SENT_PREFIX = 'cv_order_lead_sent:';
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

interface LeadWindow extends Window {
    __cvOrderLeadPixelReady?: boolean;
    __cvLoadOrderLeadPixel?: () => void;
    ttq?: {
        instance: (id: string) => {
            track: (event: string, parameters: Record<string, unknown>, options: { event_id: string }) => void;
        };
    };
}

const pending = new Map<string, number>();
const sent = new Set<string>();

function validOrderId(value: unknown): value is string {
    return typeof value === 'string' && /^CV-[A-Z0-9]+-[A-F0-9]{6}$/.test(value);
}

function allowed(): boolean {
    try { return window.localStorage.getItem('cv_measurement_consent') !== 'denied'; }
    catch { return true; }
}

function forgetPending(orderId: string): void {
    pending.delete(orderId);
    try { window.sessionStorage.removeItem(PENDING_PREFIX + orderId); } catch { /* private mode */ }
}

/** Call only after a successful /api/orders response with a valid orderId. */
export function armConfirmedOrderLead(orderId: unknown): void {
    if (typeof window === 'undefined' || !validOrderId(orderId) || !allowed()) return;
    const now = Date.now();
    pending.set(orderId, now);
    try { window.sessionStorage.setItem(PENDING_PREFIX + orderId, String(now)); }
    catch { /* Memory supports the normal SPA redirect if storage is unavailable. */ }
}

/**
 * Returns true only when the event was queued for the new pixel.
 * Direct URLs, old lastOrder data, warranty pages, URL-encoded orders, denied
 * consent and expired confirmation markers never produce a new lead.
 */
export function trackConfirmedOrderLead(orderId: unknown): boolean {
    if (typeof window === 'undefined' || !validOrderId(orderId)) return false;
    if (!/^\/(?:ar\/|en\/)?confirm\/?$/.test(window.location.pathname)) return false;
    // The legacy URL fallback can contain personal order details. Never load or
    // emit this new pixel on such a URL (including a query carried by referrer).
    if (window.location.search || window.location.hash) return false;
    if (!allowed()) { forgetPending(orderId); return false; }
    if (sent.has(orderId)) return false;
    try {
        if (window.localStorage.getItem(SENT_PREFIX + orderId)) {
            forgetPending(orderId);
            return false;
        }
    } catch { /* Fall back to memory and TikTok's stable event_id. */ }

    let timestamp = pending.get(orderId);
    if (timestamp === undefined) {
        try {
            const saved = window.sessionStorage.getItem(PENDING_PREFIX + orderId);
            if (saved) timestamp = Number(saved);
        } catch { /* No confirmed marker means no event. */ }
    }
    if (!timestamp || !Number.isFinite(timestamp) || timestamp > Date.now()
        || Date.now() - timestamp > MAX_AGE_MS) return false;

    const target = window as LeadWindow;
    // The first page may have had attribution query parameters; load on this
    // clean confirmation URL once the shared bootstrap is ready.
    if (!target.__cvOrderLeadPixelReady && target.__cvLoadOrderLeadPixel) {
        try { target.__cvLoadOrderLeadPixel(); } catch { return false; }
        // The ready event may have re-entered this function and queued it.
        if (sent.has(orderId)) return false;
    }
    if (!target.__cvOrderLeadPixelReady || typeof target.ttq?.instance !== 'function') return false;
    try {
        target.ttq.instance(ORDER_LEAD_PIXEL_ID).track('SubmitForm', {
            description: 'confirmed_order_form',
        }, { event_id: `confirmed_order_${orderId}` });
    } catch { return false; }

    sent.add(orderId);
    forgetPending(orderId);
    try { window.localStorage.setItem(SENT_PREFIX + orderId, '1'); } catch { /* best effort */ }
    return true;
}

/** Only for deterministic local tests; never sends events. */
export function resetOrderLeadMemoryForTests(): void {
    pending.clear();
    sent.clear();
}
