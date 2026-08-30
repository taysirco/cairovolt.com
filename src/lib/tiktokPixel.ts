/**
 * TikTok Pixel Event Tracking Module
 *
 * Full-funnel TikTok Ads conversion tracking for e-commerce flows.
 * Mirrors the GA4 analytics module pattern for consistency.
 *
 * Pixel ID: DAA0JC3C77U98E0UIGAG
 *
 * @see https://ads.tiktok.com/marketing_api/docs?id=1739585700402178
 */

// ── ttq type declarations ──────────────────────────────────────────────────

interface TtqInstance {
  page: () => void;
  track: (event: string, params?: Record<string, unknown>, options?: { event_id?: string }) => void;
  identify: (params: Record<string, unknown>) => void;
  load: (pixelId: string) => void;
}

interface TtqWindow extends Window {
  ttq?: TtqInstance;
}

interface TtqContentItem {
  content_id: string;
  content_name: string;
  price: number;
  quantity: number;
}

function getTtq(): TtqInstance | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as TtqWindow;
  if (!w.ttq || typeof w.ttq.track !== 'function') return null;
  return w.ttq;
}

/**
 * Safely fires a TikTok Pixel event without blocking the main thread.
 * Uses requestIdleCallback where available, falls back to setTimeout.
 */
function fireTtqEvent(eventName: string, params: Record<string, unknown> = {}, eventId?: string): void {
  const fire = () => {
    try {
      const ttq = getTtq();
      if (!ttq) return;
      // event_id enables TikTok to deduplicate this browser event against the
      // matching server-side Events API call (same event name + event_id).
      ttq.track(eventName, params, eventId ? { event_id: eventId } : undefined);
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

// ═════════════════════════════════════════════════════════════════════════════
// TIKTOK E-COMMERCE FUNNEL EVENTS
// ═════════════════════════════════════════════════════════════════════════════

/** Fires when a user views a product page. */
export function ttqViewContent(params: {
  content_id: string;
  content_name: string;
  content_type?: string;
  value?: number;
  currency?: string;
}): void {
  fireTtqEvent('ViewContent', {
    content_id: params.content_id,
    content_name: params.content_name,
    content_type: params.content_type || 'product',
    value: params.value || 0,
    currency: params.currency || 'EGP',
  });
}

/** Fires when a user adds an item to their cart. */
export function ttqAddToCart(params: {
  content_id: string;
  content_name: string;
  value: number;
  quantity?: number;
  currency?: string;
}): void {
  fireTtqEvent('AddToCart', {
    content_id: params.content_id,
    content_name: params.content_name,
    content_type: 'product',
    value: params.value,
    quantity: params.quantity || 1,
    currency: params.currency || 'EGP',
  });
}

/** Fires when a user enters the checkout flow. */
export function ttqInitiateCheckout(params: {
  content_id: string;
  content_ids: string[];
  contents: TtqContentItem[];
  content_name?: string;
  value: number;
  quantity?: number;
  currency?: string;
}): void {
  fireTtqEvent('InitiateCheckout', {
    // Keep singular content_id for Pixel Helper/catalog compatibility while
    // also sending TikTok's current VSA content_ids + contents parameters.
    content_id: params.content_id,
    content_ids: params.content_ids,
    contents: params.contents,
    content_name: params.content_name,
    content_type: 'product',
    value: params.value,
    quantity: params.quantity || 1,
    currency: params.currency || 'EGP',
  });
}

/** Fires when a user successfully places an order. */
export function ttqPlaceAnOrder(params: {
  content_id: string;
  content_name: string;
  value: number;
  quantity?: number;
  currency?: string;
}, eventId?: string): void {
  fireTtqEvent('PlaceAnOrder', {
    content_id: params.content_id,
    content_name: params.content_name,
    content_type: 'product',
    value: params.value,
    quantity: params.quantity || 1,
    currency: params.currency || 'EGP',
  }, eventId);
}

/** Fires the CompletePayment event (COD order confirmation). */
export function ttqCompletePayment(params: {
  content_id: string;
  content_name: string;
  value: number;
  quantity?: number;
  currency?: string;
}, eventId?: string): void {
  fireTtqEvent('CompletePayment', {
    content_id: params.content_id,
    content_name: params.content_name,
    content_type: 'product',
    value: params.value,
    quantity: params.quantity || 1,
    currency: params.currency || 'EGP',
  }, eventId);
}

/** Fires the Contact event — a WhatsApp or phone click.
 *
 *  This store has no lead form: a customer who wants to buy taps WhatsApp or
 *  the phone number, which is why GA4 already counts those as `generate_lead`.
 *  `Contact` is the TikTok standard event that carries the same meaning, and it
 *  is one of the events the Lead objective can optimize toward — without it the
 *  objective has nothing to select, since every other event here is e-commerce.
 *
 *  Pass the product value on product-page clicks so TikTok can optimize toward
 *  the contacts worth having rather than treating every tap as equal. */
export function ttqContact(params: {
  channel: 'whatsapp' | 'phone' | 'email';
  content_id?: string;
  content_name?: string;
  value?: number;
  currency?: string;
} = { channel: 'whatsapp' }, eventId?: string): void {
  fireTtqEvent('Contact', {
    description: params.channel,
    ...(params.content_id ? { content_id: params.content_id } : {}),
    ...(params.content_name ? { content_name: params.content_name, content_type: 'product' } : {}),
    ...(params.value !== undefined ? { value: params.value } : {}),
    currency: params.currency || 'EGP',
  }, eventId);
}
