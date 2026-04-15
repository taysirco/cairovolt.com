/**
 * GA4 E-commerce Analytics Module
 *
 * Standard Google Analytics 4 event tracking for e-commerce flows.
 * Implements recommended GA4 events for product views, cart actions,
 * checkout, and user engagement tracking.
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

// ── gtag wrapper ────────────────────────────────────────────────────────────

type GtagCommand = 'event' | 'config' | 'js';

interface GtagWindow extends Window {
    gtag: (command: GtagCommand, action: string, params?: Record<string, unknown>) => void;
    dataLayer: unknown[];
}

function getGtag(): ((command: GtagCommand, action: string, params?: Record<string, unknown>) => void) | null {
    if (typeof window === 'undefined') return null;
    const w = window as unknown as GtagWindow;
    if (typeof w.gtag !== 'function') return null;
    return w.gtag;
}

/**
 * Dispatches a GA4 event without blocking the main thread.
 * Uses requestIdleCallback where available, falls back to setTimeout.
 */
function dispatchEvent(eventName: string, params: Record<string, unknown> = {}): void {
    const fire = () => {
        try {
            const gtag = getGtag();
            if (!gtag) return;
            gtag('event', eventName, {
                ...params,
                send_to: 'G-ZH7YYZRWSE',
            });
        } catch {
            // Graceful degradation for privacy browsers / ad-blockers
        }
    };

    if (typeof window === 'undefined') return;

    if ('requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(fire);
    } else {
        setTimeout(fire, 0);
    }
}

// ── Deduplication ───────────────────────────────────────────────────────────
// Prevents duplicate events on re-renders and SPA navigations

const trackedEvents = new Set<string>();

function isNewEvent(key: string): boolean {
    if (trackedEvents.has(key)) return false;
    trackedEvents.add(key);
    setTimeout(() => trackedEvents.delete(key), 30_000);
    return true;
}

/**
 * Resets event tracking state — call on SPA route changes
 * to ensure events fire correctly on re-visits.
 */
export function resetTracking(): void {
    trackedEvents.clear();
}

// ── GA4 Item type ───────────────────────────────────────────────────────────

export interface AnalyticsItem {
    item_id: string;
    item_name: string;
    item_brand?: string;
    item_category?: string;
    price?: number;
    quantity?: number;
    currency?: string;
}

function formatItem(item: AnalyticsItem): Record<string, unknown> {
    return {
        item_id: item.item_id,
        item_name: item.item_name,
        item_brand: item.item_brand || '',
        item_category: item.item_category || '',
        price: item.price || 0,
        quantity: item.quantity || 1,
        currency: item.currency || 'EGP',
    };
}

// ═════════════════════════════════════════════════════════════════════════════
// GA4 E-COMMERCE EVENTS
// @see https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
// ═════════════════════════════════════════════════════════════════════════════

/** Tracks when a user views a product page. */
export function trackViewItem(item: AnalyticsItem): void {
    const key = `view_item_${item.item_id}`;
    if (!isNewEvent(key)) return;

    dispatchEvent('view_item', {
        currency: 'EGP',
        value: item.price || 0,
        items: [formatItem(item)],
    });
}

/** Tracks when a user adds an item to their cart. */
export function trackAddToCart(item: AnalyticsItem): void {
    dispatchEvent('add_to_cart', {
        currency: 'EGP',
        value: (item.price || 0) * (item.quantity || 1),
        items: [formatItem(item)],
    });
}

/** Tracks when a user removes an item from their cart. */
export function trackRemoveFromCart(item: AnalyticsItem): void {
    dispatchEvent('remove_from_cart', {
        currency: 'EGP',
        value: (item.price || 0) * (item.quantity || 1),
        items: [formatItem(item)],
    });
}

/** Tracks when the cart is viewed (drawer opened). */
export function trackViewCart(items: AnalyticsItem[], totalValue: number): void {
    const key = 'view_cart';
    if (!isNewEvent(key)) return;

    dispatchEvent('view_cart', {
        currency: 'EGP',
        value: totalValue,
        items: items.map(formatItem),
    });
}

/** Tracks when a user begins the checkout process. */
export function trackBeginCheckout(items: AnalyticsItem[], totalValue: number): void {
    const key = 'begin_checkout';
    if (!isNewEvent(key)) return;

    dispatchEvent('begin_checkout', {
        currency: 'EGP',
        value: totalValue,
        items: items.map(formatItem),
    });
}

/** Tracks a completed purchase. */
export function trackPurchase(
    transactionId: string,
    items: AnalyticsItem[],
    totalValue: number,
    shipping: number = 0,
): void {
    const key = `purchase_${transactionId}`;
    if (!isNewEvent(key)) return;

    dispatchEvent('purchase', {
        transaction_id: transactionId,
        currency: 'EGP',
        value: totalValue,
        shipping: shipping,
        tax: 0,
        items: items.map(formatItem),
    });
}

// ═════════════════════════════════════════════════════════════════════════════
// NavBoost handles: Copy Events, Scroll Depth, FAQ Toggles, and general engagement.

// ═════════════════════════════════════════════════════════════════════════════
// CONTACT & CONVERSION EVENTS
// ═════════════════════════════════════════════════════════════════════════════

/** Tracks WhatsApp link clicks. */
export function trackWhatsappClick(context: 'header' | 'contact' | 'product' | 'promo' | 'confirm' | 'category'): void {
    dispatchEvent('generate_lead', {
        event_category: 'contact',
        event_label: `whatsapp_${context}`,
        currency: 'EGP',
        value: 1,
    });
}

/** Tracks phone number link clicks. */
export function trackPhoneClick(): void {
    dispatchEvent('generate_lead', {
        event_category: 'contact',
        event_label: 'phone_call',
        currency: 'EGP',
        value: 1,
    });
}

/** Tracks email link clicks. */
export function trackEmailClick(): void {
    dispatchEvent('generate_lead', {
        event_category: 'contact',
        event_label: 'email',
    });
}

// ═════════════════════════════════════════════════════════════════════════════
// UX INTERACTION EVENTS
// ═════════════════════════════════════════════════════════════════════════════

// Image tracking and variant tracking is handled automatically via NavBoostEngine.

/** Tracks invoice print actions after purchase. */
export function trackPrintInvoice(orderId: string): void {
    dispatchEvent('select_content', {
        event_category: 'post_purchase',
        content_type: 'print_invoice',
        event_label: orderId,
    });
}

/** Tracks promotional overlay interactions. */
export function trackOverlayAction(action: 'shown' | 'clicked' | 'dismissed' | 'exit_attempt_mobile'): void {
    dispatchEvent('select_content', {
        event_category: 'ux',
        content_type: 'promo_banner',
        event_label: action,
    });
}

// Note: Global event listeners for Copy and FAQ are now handled by NavBoostEngine.
