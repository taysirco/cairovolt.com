import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { getSecret } from './get-secrets';
import { staticProducts } from './static-products';
import { logger } from './logger';

interface SheetOrderItem {
    productId?: unknown;
    slug?: unknown;
    sku?: unknown;
    name?: unknown;
    quantity?: unknown;
    price?: unknown;
}

interface SheetOrderData {
    id?: string;
    orderId?: string;
    source?: string;
    customerName?: string;
    phone?: string;
    whatsapp?: string;
    city?: string;
    cityLabel?: string | null;
    address?: string;
    items?: SheetOrderItem[];
    totalAmount?: number;
    shippingFee?: number;
    couponCode?: string | null;
    couponDiscount?: number;
}

function getErrorProperty(error: unknown, property: 'code' | 'message'): unknown {
    return error && typeof error === 'object' && property in error
        ? (error as Record<string, unknown>)[property]
        : undefined;
}

function numberOr(value: unknown, fallback: number): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

// Cache the JWT auth object to avoid rebuilding on every call
let cachedAuth: JWT | null = null;

async function getAuth() {
    // Return cached auth if available
    if (cachedAuth) return cachedAuth;

    // Fetch both secrets in parallel instead of sequentially
    const [GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY] = await Promise.all([
        getSecret('google_service_account_email'),
        getSecret('google_private_key'),
    ]);

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.error('[Sheets] Required runtime credentials are unavailable.');
        return null;
    }

    try {
        // Handle both escaped \n and actual newlines in the private key
        const processedKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
        const auth = new JWT({
            email: GOOGLE_CLIENT_EMAIL,
            key: processedKey,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        cachedAuth = auth;
        logger.info('[Sheets] Authentication initialized.');
        return auth;
    } catch {
        console.error('[Sheets] Authentication initialization failed.');
        return null;
    }
}

// Build notes field with coupon info for Google Sheets
function buildNotesField(orderData: SheetOrderData): string {
    const parts: string[] = [`طلب من الموقع - ${orderData.items?.length || 0} منتج`];
    if (orderData.couponCode) {
        parts.push(`كوبون: ${orderData.couponCode} | خصم: ${orderData.couponDiscount} جنيه`);
    }
    return parts.join(' | ');
}

// Product lookup helpers use the in-memory catalog.

/** Look up a product by its slug/productId from the static catalog */
function findProduct(item: SheetOrderItem) {
    const id = String(item.slug || item.productId || '');
    return staticProducts.find(p => p.slug === id);
}

/** Get a short, clean product name (strip brand prefix + trim) */
function getShortName(item: SheetOrderItem): string {
    const product = findProduct(item);
    if (product) {
        // Use Arabic short name: e.g. "زولو A110E 20000" instead of full name"
        const arName = product.translations?.ar?.name || '';
        const enName = product.translations?.en?.name || '';
        // Prefer Arabic, fallback to English, fallback to slug
        // الجزء الأول فقط قبل "|" — الأسماء التسويقية الكاملة طويلة جداً للشيت
        const name = (arName || enName || product.slug).split('|')[0].trim();
        // Truncate to 40 chars max for clean sheet display
        return name.length > 40 ? name.slice(0, 37) + '...' : name;
    }
    // Fallback: first segment before "|", then truncate
        const raw = String(item.name || '').split('|')[0].trim();
    return raw.length > 40 ? raw.slice(0, 37) + '...' : raw;
}

/** Build a short product link using internal /go/ shortener */
function getShortLink(item: SheetOrderItem): string {
    const product = findProduct(item);
    if (product) {
        return `cairovolt.com/go/${product.slug}`;
    }
    // Fallback: use slug/productId if available
    const slug = String(item.slug || item.productId || '');
    return slug ? `cairovolt.com/go/${slug}` : '';
}

// Determine order source label + product link for the المصدر column
function getSourceField(orderData: SheetOrderData): string {
    let source = 'الموقع';
    if (orderData.source === 'quick_cod') source = 'Quick COD';
    else if (orderData.source === 'm2m_checkout') source = 'M2M';
    else if (orderData.source === 'website') source = 'الموقع';

    // Add short link for the first item
    const firstItem = orderData.items?.[0];
    const link = firstItem ? getShortLink(firstItem) : '';
    return link ? `${source} | ${link}` : source;
}

function protectSheetCell(value: string | number): string | number {
    if (typeof value !== 'string') return value;
    return /^[\s]*[=+\-@]/.test(value) ? `'${value}` : value;
}

export async function appendOrderToSheet(orderData: SheetOrderData) {
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const auth = await getAuth();

    if (!SHEET_ID || !auth) {
        console.error('[Sheets] Integration is unavailable.');
        return;
    }

    try {
        const doc = new GoogleSpreadsheet(SHEET_ID, auth);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0]; // First sheet

        // Store one row per order and combine line items in the product cell.
        const items: SheetOrderItem[] = orderData.items || [];
        const itemsSummary = items
            .map(item => {
                const quantity = numberOr(item.quantity, 1);
                return `${String(item.name || '').split('|')[0].trim()} (x${quantity}) - ${numberOr(item.price, 0) * quantity} EGP`;
            })
            .join('\n');
        const totalQuantity = items.reduce((sum, item) => sum + numberOr(item.quantity, 1), 0);
        const shortNames = items.map(item => {
            const short = getShortName(item);
            const quantity = numberOr(item.quantity, 1);
            return items.length > 1 && quantity > 1 ? `${short} x${quantity}` : short;
        }).join(' + ');

        // Use the highest-value line item's SKU for downstream reconciliation.
        const primaryItem = items.length
            ? [...items].sort((a, b) =>
                (numberOr(b.price, 0) * numberOr(b.quantity, 1))
                - (numberOr(a.price, 0) * numberOr(a.quantity, 1)))[0]
            : null;
        const primarySku = String(primaryItem?.sku || (primaryItem ? findProduct(primaryItem)?.sku : '') || '');

        const row: Array<string | number> = [
            /* A */ (() => { const d = new Date(); return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`; })(),
            /* B */ orderData.customerName || '',
            /* C */ orderData.phone || '',
            /* D */ orderData.whatsapp || orderData.phone || '',
            /* E */ orderData.cityLabel || orderData.city || '',
            /* F */ '',
            /* G */ orderData.address || '',
            /* H */ itemsSummary,
            /* I */ totalQuantity,
            /* J */ orderData.totalAmount ?? 0,
            /* K */ shortNames,
            /* L */ 'جديد',
            /* M */ buildNotesField(orderData),
            /* N */ getSourceField(orderData),
            /* O */ '', // whatsappSent — يملؤه الـCRM (خريطة أعمدة smart-engine)
            /* P */ orderData.orderId || orderData.id || '', // Stable order reference for reconciliation
            /* Q */ '', // assignee — يملؤه الـCRM
            /* R */ '',
            /* S */ '', // bostaTrackingNumber — يملؤه الـCRM
            /* T */ '', // bostaOrderStatus — يملؤه الـCRM
            /* U */ '', // lastBostaUpdate — يملؤه الـCRM
            /* V */ '', // bostaRanking — يملؤه الـCRM
            /* W */ orderData.shippingFee ?? '', // رسوم الشحن (0 = شحن مجاني) — بعيداً عن أعمدة الـCRM المحجوزة A..V
            /* X */ primarySku, // Primary SKU for reconciliation
        ];

        await sheet.addRows([row.map(protectSheetCell)]);
        logger.info(`[Sheets] Order synchronized (${items.length} line items).`);
    } catch (error: unknown) {
        console.error('[Sheets] Synchronization request failed.');
        // Reset cached auth on auth errors so it's rebuilt next time
        const code = getErrorProperty(error, 'code');
        const message = getErrorProperty(error, 'message');
        if (code === 401 || code === 403 || (typeof message === 'string' && message.includes('invalid_grant'))) {
            cachedAuth = null;
        }
        // Re-throw so callers (safeAppendOrderToSheet) can retry
        throw error;
    }
}

/**
 * Safe wrapper around appendOrderToSheet with:
 *  - 5-second timeout to avoid blocking the response indefinitely
 *  - 1 automatic retry on failure
 *  - Never throws — always resolves (errors are logged)
 * 
 * This replaces the unreliable after() pattern on Firebase App Hosting (Cloud Run),
 * where the container may terminate before deferred callbacks complete.
 */
export async function safeAppendOrderToSheet(orderData: SheetOrderData): Promise<boolean> {
    const TIMEOUT_MS = 5000;

    for (let attempt = 1; attempt <= 2; attempt++) {
        try {
            await Promise.race([
                appendOrderToSheet(orderData),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error(`Sheet sync timeout after ${TIMEOUT_MS}ms`)), TIMEOUT_MS)
                ),
            ]);
            return true; // Success
        } catch {
            console.error(`[Sheets] Synchronization attempt ${attempt}/2 failed.`);
            if (attempt < 2) {
                // Brief pause before retry
                await new Promise(r => setTimeout(r, 500));
            }
        }
    }

    console.error('[Sheets] Synchronization failed after retry; the Firestore order remains authoritative.');
    return false; // All attempts failed — order is in Firestore but not Sheets
}
