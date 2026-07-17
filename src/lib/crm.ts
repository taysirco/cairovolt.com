import { logger } from './logger';

/** Synchronize accepted orders with the configured CRM webhook. */

// The CRM webhook CREATES the lead within ~1-2s of receiving the request and
// only then runs address-correction + courier ranking (up to ~14s) before
// replying — so waiting longer than a couple of seconds buys no reliability,
// it only delays the customer's order confirmation. Aborting early is treated
// as "delivered" below (never retried), which the CRM's fingerprint
// idempotency and the sheet reconciliation both back up.
const CRM_TIMEOUT_MS = 2500;

interface CrmOrderItem {
    sku?: unknown;
    name?: unknown;
    quantity?: unknown;
    price?: unknown;
}

interface CrmOrderData {
    id?: string;
    orderId?: string;
    customerName?: string;
    phone?: string;
    whatsapp?: string;
    city?: string;
    cityLabel?: string | null;
    address?: string;
    items?: CrmOrderItem[];
    totalAmount?: number;
    shippingFee?: number;
    couponCode?: string | null;
    couponDiscount?: number;
    bundleDiscount?: number;
    subtotalBeforeDiscount?: number;
    customerNotes?: string;
    notes?: string;
}

/** الجزء الأول فقط من اسم المنتج (قبل أول "|") — الأسماء التسويقية الكاملة
 *  طويلة جداً لواجهة الـCRM والشيت: "شاحن جوي روم 20 واط PD | أرخص شاحن…" → "شاحن جوي روم 20 واط PD" */
function shortName(name: unknown): string {
    return String(name || '').split('|')[0].trim();
}

function numberOr(value: unknown, fallback: number): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function buildLeadPayload(orderData: CrmOrderData) {
    const items: CrmOrderItem[] = orderData.items || [];
    const productName = items
        .map(it => numberOr(it.quantity, 1) > 1 ? `${shortName(it.name)} x${numberOr(it.quantity, 1)}` : shortName(it.name))
        .join(' + ');
    const totalQuantity = items.reduce((sum, it) => sum + numberOr(it.quantity, 1), 0);
    const orderDetails = items
        .map(it => `${shortName(it.name)} (x${numberOr(it.quantity, 1)}) = ${numberOr(it.price, 0) * numberOr(it.quantity, 1)} ج`)
        .join(' | ');

    const notesParts: string[] = [];
    if (orderData.orderId || orderData.id) notesParts.push(`طلب موقع كايرو فولت #${orderData.orderId || orderData.id}`);
    notesParts.push(`الشحن: ${orderData.shippingFee === 0 ? 'مجاني' : `${orderData.shippingFee ?? '?'} ج`}`);
    if (orderData.couponCode) notesParts.push(`كوبون ${orderData.couponCode} (خصم ${orderData.couponDiscount} ج)`);
    if (Number(orderData.bundleDiscount) > 0) notesParts.push(`خصم الكومبو الذهبي: ${orderData.bundleDiscount} ج`);
    if (orderData.customerNotes || orderData.notes) notesParts.push(String(orderData.customerNotes || orderData.notes));

    // Use the highest-value line item's SKU as the primary reconciliation key.
    const primary = items.length
        ? [...items].sort((a, b) =>
            (numberOr(b.price, 0) * numberOr(b.quantity, 1))
            - (numberOr(a.price, 0) * numberOr(a.quantity, 1)))[0]
        : null;

    return {
        // This reference matches the Google Sheets reconciliation column.
        fingerprint: String(orderData.orderId || orderData.id || ''),
        name: orderData.customerName,
        phone: orderData.phone,
        whatsapp: orderData.whatsapp || orderData.phone,
        governorate: orderData.cityLabel || orderData.city || '',
        address: orderData.address || '',
        productName,
        sku: String(primary?.sku || ''),
        items: items.map(it => ({
            sku: String(it.sku || ''),
            name: shortName(it.name),
            quantity: numberOr(it.quantity, 1),
            price: numberOr(it.price, 0),
        })),
        quantity: String(totalQuantity),
        totalPrice: String(orderData.totalAmount ?? ''),
        shippingFee: Number(orderData.shippingFee ?? 0),
        couponCode: String(orderData.couponCode || ''),
        couponDiscount: Number(orderData.couponDiscount ?? 0),
        bundleDiscount: Number(orderData.bundleDiscount ?? 0),
        subtotal: Number(orderData.subtotalBeforeDiscount ?? 0),
        orderDetails,
        notes: notesParts.join(' | '),
        source: 'CairoVolt.com',
    };
}

/** Synchronize without allowing a CRM outage to invalidate the order. */
export async function safeSendLeadToCRM(orderData: CrmOrderData): Promise<void> {
    const url = process.env.CRM_WEBHOOK_URL;
    if (!url) return;

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const secret = process.env.CRM_WEBHOOK_SECRET;
    if (secret) headers['Authorization'] = `Bearer ${secret}`;
    const body = JSON.stringify(buildLeadPayload(orderData));
    // Retry transient cold-start and availability failures.
    const MAX_ATTEMPTS = 3;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), CRM_TIMEOUT_MS);
            const res = await fetch(url, { method: 'POST', headers, body, signal: controller.signal });
            clearTimeout(timer);

            if (res.ok) {
                await res.body?.cancel().catch(() => undefined);
                logger.info(`[CRM] Lead synchronized on attempt ${attempt}.`);
                return;
            }
            await res.body?.cancel().catch(() => undefined);
            console.error(`[CRM] Webhook responded ${res.status} (attempt ${attempt}/${MAX_ATTEMPTS})`);
            // Retry only transient client-side responses.
            if (res.status >= 400 && res.status < 500 && res.status !== 408 && res.status !== 429) break;
        } catch (error: unknown) {
            const isTimeout = !!(error && typeof error === 'object' && 'name' in error && (error as { name?: string }).name === 'AbortError');
            if (isTimeout) {
                // ⛔ DON'T retry on timeout. The CRM webhook creates the lead first, then
                // runs address-correction + Bosta ranking (up to ~14s) before responding,
                // so a short response timeout almost always means "delivered and created",
                // not "failed". Retrying re-invokes the webhook and creates a DUPLICATE
                // lead (two agents call the same customer). Fail-open here — the sheet
                // reconciliation covers the rare true failure, and the CRM webhook is now
                // idempotent by fingerprint as a second layer.
                console.warn(`[CRM] Response timeout on attempt ${attempt} — lead already created server-side; not retrying (avoids duplicate).`);
                return;
            }
            // Genuine connection failure (request never arrived) — safe to retry.
            console.warn(`[CRM] Attempt ${attempt}/${MAX_ATTEMPTS} failed: network error`);
        }
        if (attempt < MAX_ATTEMPTS) await new Promise((r) => setTimeout(r, 800 * attempt));
    }
    console.error(`[CRM] Lead synchronization failed after ${MAX_ATTEMPTS} attempts; sheet reconciliation remains available.`);
}
