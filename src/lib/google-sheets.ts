import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { getSecret } from './get-secrets';
import { staticProducts } from './static-products';

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
        console.error('Google Sheets secrets missing. Email:', !!GOOGLE_CLIENT_EMAIL, 'Key:', !!GOOGLE_PRIVATE_KEY);
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
        if (process.env.NODE_ENV === 'development') {
            console.log('Google Sheets Auth initialized for:', GOOGLE_CLIENT_EMAIL);
        }
        return auth;
    } catch (error) {
        console.error('Google Auth Init Failed:', error);
        return null;
    }
}

// Build notes field with coupon info for Google Sheets
function buildNotesField(orderData: any): string {
    const parts: string[] = [`طلب من الموقع - ${orderData.items.length} منتج`];
    if (orderData.couponCode) {
        parts.push(`كوبون: ${orderData.couponCode} | خصم: ${orderData.couponDiscount} جنيه`);
    }
    return parts.join(' | ');
}

// ── Product Lookup Helpers (zero-latency: in-memory static data) ──

/** Look up a product by its slug/productId from the static catalog */
function findProduct(item: any) {
    const id = item.slug || item.productId || '';
    return staticProducts.find(p => p.slug === id);
}

/** Get a short, clean product name (strip brand prefix + trim) */
function getShortName(item: any): string {
    const product = findProduct(item);
    if (product) {
        // Use Arabic short name: e.g. "زولو A110E 20000" instead of full name"
        const arName = product.translations?.ar?.name || '';
        const enName = product.translations?.en?.name || '';
        // Prefer Arabic, fallback to English, fallback to slug
        const name = arName || enName || product.slug;
        // Truncate to 40 chars max for clean sheet display
        return name.length > 40 ? name.slice(0, 37) + '...' : name;
    }
    // Fallback: truncate raw name
    const raw = item.name || '';
    return raw.length > 40 ? raw.slice(0, 37) + '...' : raw;
}

/** Build a short product link using internal /go/ shortener */
function getShortLink(item: any): string {
    const product = findProduct(item);
    if (product) {
        return `cairovolt.com/go/${product.slug}`;
    }
    // Fallback: use slug/productId if available
    const slug = item.slug || item.productId || '';
    return slug ? `cairovolt.com/go/${slug}` : '';
}

// Determine order source label + product link for the المصدر column
function getSourceField(orderData: any): string {
    let source = 'الموقع';
    if (orderData.source === 'quick_cod') source = 'Quick COD';
    else if (orderData.source === 'm2m_checkout') source = 'M2M';
    else if (orderData.source === 'website') source = 'الموقع';

    // Add short link for the first item
    const firstItem = orderData.items?.[0];
    const link = firstItem ? getShortLink(firstItem) : '';
    return link ? `${source} | ${link}` : source;
}

export async function appendOrderToSheet(orderData: any) {
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const auth = await getAuth();

    if (!SHEET_ID || !auth) {
        console.error('[Sheets] ❌ credentials missing or invalid');
        return;
    }

    try {
        const doc = new GoogleSpreadsheet(SHEET_ID, auth);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0]; // First sheet

        const rows = orderData.items.map((item: any, idx: number) => ({
            'التاريخ': new Date().toLocaleDateString('ar-EG'),                              // A
            'الاسم': orderData.customerName,                                               // B
            'رقم الهاتف': orderData.phone,                                                 // C
            'رقم الواتس': orderData.whatsapp || orderData.phone,                           // D
            'المحافظة': orderData.cityLabel || orderData.city,                              // E
            'المنطقة': '',                                                                 // F
            'العنوان': orderData.address,                                                  // G
            'تفاصيل الطلب': `${item.name} (x${item.quantity}) - ${(item.price || 0) * (item.quantity || 1)} EGP`, // H
            'الكمية': item.quantity,                                                       // I
            'توتال السعر شامل الشحن': idx === 0 ? orderData.totalAmount : '',              // J
            'اسم المنتج': getShortName(item),                                              // K
            'الحالة': 'جديد',                                                              // L
            'ملاحظات': idx === 0 ? buildNotesField(orderData) : '',                        // M
            'المصدر': idx === 0 ? getSourceField(orderData) : '',                          // N
        }));

        await sheet.addRows(rows);
        console.log(`[Sheets] ✅ Order synced: ${orderData.orderId || 'N/A'} | Phone: ${orderData.phone} | Rows: ${rows.length}`);
    } catch (error: any) {
        console.error('[Sheets] ❌ Error:', error?.message || error, 'Code:', error?.code, 'Status:', error?.status);
        // Reset cached auth on auth errors so it's rebuilt next time
        if (error?.code === 401 || error?.code === 403 || error?.message?.includes('invalid_grant')) {
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
export async function safeAppendOrderToSheet(orderData: any): Promise<boolean> {
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
        } catch (error: any) {
            console.error(`[Sheets] ⚠️ Attempt ${attempt}/2 failed for order ${orderData.orderId || 'N/A'}:`, error?.message || error);
            if (attempt < 2) {
                // Brief pause before retry
                await new Promise(r => setTimeout(r, 500));
            }
        }
    }

    console.error(`[Sheets] 🚨 CRITICAL: Order ${orderData.orderId || 'N/A'} (Phone: ${orderData.phone}) failed to sync after 2 attempts. Order exists in Firestore but NOT in Google Sheets.`);
    return false; // All attempts failed — order is in Firestore but not Sheets
}
