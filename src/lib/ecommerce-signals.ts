/**
 * E-commerce Behavioral Signals Engine for GA4
 * 
 * Sends deep interaction signals to Google via gtag() across all browsers.
 * Every signal uses feature-detection guards for SSR, Safari private browsing,
 * and legacy browser compatibility.
 * 
 * Signals map:
 *  - Standard GA4 E-commerce: view_item, add_to_cart, view_cart, begin_checkout, purchase
 *  - Navboost behavioral:     copy_content, scroll_engagement, faq_interaction
 *  - Contact engagement:      whatsapp_click, phone_click, email_click
 *  - UX micro-signals:        image_gallery_swipe, quantity_change, print_invoice, exit_intent, select_content
 */

// ── Type-safe gtag wrapper ──────────────────────────────────────────────────

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
 * Fire-and-forget: sends GA4 event off the main thread when possible.
 * Falls back to setTimeout(0) on Safari / older browsers.
 */
function sendSignal(eventName: string, params: Record<string, unknown> = {}): void {
    const fire = () => {
        try {
            const gtag = getGtag();
            if (!gtag) return;
            gtag('event', eventName, {
                ...params,
                send_to: 'G-ZH7YYZRWSE',
            });
        } catch {
            // Safari ITP / Private Browsing / ad-blockers may block gtag.
            // Never break the page for analytics.
        }
    };

    if (typeof window === 'undefined') return;

    // Use requestIdleCallback where available (Chrome, Firefox, Edge)
    // Safari doesn't support it — fall back to setTimeout
    if ('requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(fire);
    } else {
        setTimeout(fire, 0);
    }
}

// ── Deduplication guard ─────────────────────────────────────────────────────
// Prevents duplicate signals on re-renders, HMR, and SPA navigations

const firedSignals = new Set<string>();

function shouldFire(key: string): boolean {
    if (firedSignals.has(key)) return false;
    firedSignals.add(key);
    // Auto-clear after 30s to allow re-firing on genuine re-visits
    setTimeout(() => firedSignals.delete(key), 30_000);
    return true;
}

/**
 * Resets deduplication state on SPA route changes.
 * Call this in Next.js route change handlers to ensure signals
 * fire correctly when users navigate back to previously-visited pages.
 */
export function resetSignals(): void {
    firedSignals.clear();
}

// ── GA4 Item shape ──────────────────────────────────────────────────────────

export interface SignalItem {
    item_id: string;
    item_name: string;
    item_brand?: string;
    item_category?: string;
    price?: number;
    quantity?: number;
    currency?: string;
}

function toGA4Item(item: SignalItem): Record<string, unknown> {
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

// ═══════════════════════════════════════════════════════════════════════════
// 1. STANDARD GA4 E-COMMERCE EVENTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Signal: view_item
 * Fires when a product page is loaded.
 * Google uses this to build commercial intent signals.
 */
export function trackViewItem(item: SignalItem): void {
    const key = `view_item_${item.item_id}`;
    if (!shouldFire(key)) return;

    sendSignal('view_item', {
        currency: 'EGP',
        value: item.price || 0,
        items: [toGA4Item(item)],
    });
}

/**
 * Signal: add_to_cart
 * Fires when user clicks "Add to Cart".
 * Critical for Conversion-based Ranking (Chrome/Android traffic correlation).
 */
export function trackAddToCart(item: SignalItem): void {
    sendSignal('add_to_cart', {
        currency: 'EGP',
        value: (item.price || 0) * (item.quantity || 1),
        items: [toGA4Item(item)],
    });
}

/**
 * Signal: remove_from_cart
 * Fires when user removes an item from cart.
 */
export function trackRemoveFromCart(item: SignalItem): void {
    sendSignal('remove_from_cart', {
        currency: 'EGP',
        value: (item.price || 0) * (item.quantity || 1),
        items: [toGA4Item(item)],
    });
}

/**
 * Signal: view_cart
 * Fires when the cart drawer opens.
 */
export function trackViewCart(items: SignalItem[], totalValue: number): void {
    const key = 'view_cart';
    if (!shouldFire(key)) return;

    sendSignal('view_cart', {
        currency: 'EGP',
        value: totalValue,
        items: items.map(toGA4Item),
    });
}

/**
 * Signal: begin_checkout
 * Fires when checkout page loads with items.
 */
export function trackBeginCheckout(items: SignalItem[], totalValue: number): void {
    const key = 'begin_checkout';
    if (!shouldFire(key)) return;

    sendSignal('begin_checkout', {
        currency: 'EGP',
        value: totalValue,
        items: items.map(toGA4Item),
    });
}

/**
 * Signal: purchase
 * Fires on order confirmation. This is the MOST IMPORTANT signal.
 * Google cross-references this with Chrome/Android data for authority scoring.
 */
export function trackPurchase(
    transactionId: string,
    items: SignalItem[],
    totalValue: number,
    shipping: number = 0,
): void {
    const key = `purchase_${transactionId}`;
    if (!shouldFire(key)) return;

    sendSignal('purchase', {
        transaction_id: transactionId,
        currency: 'EGP',
        value: totalValue,
        shipping: shipping,
        tax: 0,
        items: items.map(toGA4Item),
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. NAVBOOST BEHAVIORAL SIGNALS
//    (Based on internal algorithm heuristics — copy events, engagement depth)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Signal: copy_content (Navboost)
 * Google Chrome tracks clipboard copy events (ctrl+c, right-click copy).
 * A copy on a phone number or price is weighted higher than a page view.
 */
export function trackCopyContent(contentType: 'price' | 'phone' | 'address' | 'product_name' | 'text', copiedText: string): void {
    sendSignal('copy_content', {
        event_category: 'navboost_engagement',
        content_type: contentType,
        content_value: copiedText.slice(0, 100), // Truncate for privacy
    });
}

/**
 * Signal: scroll_engagement
 * Fires at scroll depth milestones. Deep scrolling = content satisfaction.
 */
export function trackScrollEngagement(depthPercent: number, pageType: string): void {
    const key = `scroll_${pageType}_${depthPercent}`;
    if (!shouldFire(key)) return;

    sendSignal('scroll_engagement', {
        event_category: 'engagement',
        scroll_depth: depthPercent,
        page_type: pageType,
    });
}

/**
 * Signal: faq_interaction
 * Fires when user opens an FAQ/details element.
 * Indicates content engagement and information-seeking behavior.
 */
export function trackFaqInteraction(question: string): void {
    sendSignal('faq_interaction', {
        event_category: 'engagement',
        event_label: question.slice(0, 100),
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. CONTACT & CONVERSION ENGAGEMENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Signal: whatsapp_click
 * WhatsApp is the #1 conversion channel. Tracking this proves commercial viability.
 */
export function trackWhatsappClick(context: 'header' | 'contact' | 'product' | 'exit_intent' | 'confirm' | 'category'): void {
    sendSignal('whatsapp_click', {
        event_category: 'contact_engagement',
        event_label: context,
        conversion: true,
    });
}

/**
 * Signal: phone_click
 * Direct phone call intent — strong conversion signal.
 */
export function trackPhoneClick(): void {
    sendSignal('phone_click', {
        event_category: 'contact_engagement',
        conversion: true,
    });
}

/**
 * Signal: email_click
 * Email contact intent.
 */
export function trackEmailClick(): void {
    sendSignal('email_click', {
        event_category: 'contact_engagement',
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. UX MICRO-SIGNALS
//    (Each proves genuine user engagement to Google's behavioral heuristics)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Signal: image_gallery_swipe
 * Image browsing = product interest depth.
 */
export function trackImageGallerySwipe(productId: string, imageIndex: number): void {
    sendSignal('select_content', {
        event_category: 'product_engagement',
        content_type: 'product_image',
        item_id: productId,
        image_index: imageIndex,
    });
}

/**
 * Signal: quantity_change
 * Shopping intent signal — user is configuring their purchase.
 */
export function trackQuantityChange(productId: string, quantity: number): void {
    sendSignal('select_content', {
        event_category: 'product_engagement',
        content_type: 'quantity_change',
        item_id: productId,
        quantity: quantity,
    });
}

/**
 * Signal: print_invoice
 * Post-purchase engagement — proves real transaction.
 */
export function trackPrintInvoice(orderId: string): void {
    sendSignal('print_invoice', {
        event_category: 'post_purchase',
        event_label: orderId,
    });
}

/**
 * Signal: exit_intent
 * User almost left but was retained — shows effective engagement.
 */
export function trackExitIntent(action: 'shown' | 'clicked' | 'dismissed'): void {
    sendSignal('exit_intent', {
        event_category: 'retention',
        event_label: action,
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. GLOBAL LISTENERS (Mount once in InteractiveEffects)
//    These attach to document-level events for maximum coverage.
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Attaches a clipboard copy listener that classifies what was copied.
 * Works on all browsers (Chrome, Safari, Firefox, Edge).
 */
export function attachCopyListener(): (() => void) | null {
    if (typeof document === 'undefined') return null;

    const handler = () => {
        try {
            // Safari Private Browsing may restrict getSelection
            const sel = typeof window.getSelection === 'function' ? window.getSelection() : null;
            const selection = sel?.toString()?.trim();
            if (!selection || selection.length < 2 || selection.length > 200) return;

            // Classify content
            let contentType: 'price' | 'phone' | 'address' | 'product_name' | 'text' = 'text';

            if (/^\d[\d,.\s]+$/.test(selection) && selection.length <= 10) {
                contentType = 'price';
            } else if (/^[+\d][\d\s-]{7,15}$/.test(selection)) {
                contentType = 'phone';
            } else if (/شارع|street|بناء|building|ش\./i.test(selection)) {
                contentType = 'address';
            } else if (selection.length > 5 && selection.length <= 80) {
                contentType = 'product_name';
            }

            trackCopyContent(contentType, selection);
        } catch {
            // Silently fail — never break the page for analytics
        }
    };

    document.addEventListener('copy', handler, { passive: true });
    return () => document.removeEventListener('copy', handler);
}

/**
 * Attaches a <details> toggle listener for FAQ interaction tracking.
 */
export function attachFaqToggleListener(): (() => void) | null {
    if (typeof document === 'undefined') return null;

    const handler = (e: Event) => {
        try {
            const target = e.target as HTMLElement;
            // Guard: .closest() may not exist on older Safari text nodes
            const details = target?.closest ? target.closest('details') : null;
            if (!details) return;

            // Only track opening, not closing
            if (!(details as HTMLDetailsElement).open) return;

            const summary = details.querySelector('summary');
            if (summary) {
                trackFaqInteraction(summary.textContent || '');
            }
        } catch {
            // Silently fail for analytics
        }
    };

    document.addEventListener('toggle', handler, { capture: true });
    return () => document.removeEventListener('toggle', handler, { capture: true });
}
