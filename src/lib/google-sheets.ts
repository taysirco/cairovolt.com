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

        // ═══ صف واحد لكل طلب (مهما تعددت المنتجات — كومبو أو سلة) ═══
        // المنتجات تُجمع داخل خلية H بسطر لكل منتج (\n يظهر متعدد الأسطر في
        // الشيت)، والكمية في I إجمالية، وأسماء مختصرة مجمعة في K — لا صفوف
        // مكررة لنفس العميل، وكل بيانات الطلب (الإجمالي/الشحن/الملاحظات) محفوظة.
        const items: any[] = orderData.items || [];
        const itemsSummary = items
            .map((item: any) => `${String(item.name || '').split('|')[0].trim()} (x${item.quantity}) - ${(item.price || 0) * (item.quantity || 1)} EGP`)
            .join('\n');
        const totalQuantity = items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
        const shortNames = items.map((item: any) => {
            const short = getShortName(item);
            return items.length > 1 && (item.quantity || 1) > 1 ? `${short} x${item.quantity}` : short;
        }).join(' + ');

        // 🧬 بصمة SKU للطلب: sku القطعة الأعلى قيمة (نفس منطق ويبهوك الـCRM). يقرأها
        // smart-engine من العمود X (النطاق A2:X) فيبصم الطلب skuResolvedBy:'store'
        // بلا تخمين بالاسم — شبكة أمان لو فشل مسار الويبهوك المتوازي. fallback من
        // الكتالوج الثابت لو القطعة وصلت بلا sku (سلة قديمة/إضافة سريعة).
        const primaryItem = items.length
            ? [...items].sort((a: any, b: any) => ((b.price || 0) * (b.quantity || 1)) - ((a.price || 0) * (a.quantity || 1)))[0]
            : null;
        const primarySku = String(primaryItem?.sku || (primaryItem ? findProduct(primaryItem)?.sku : '') || '');

        const row = [
            /* A */ (() => { const d = new Date(); return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`; })(),
            /* B */ orderData.customerName,
            /* C */ orderData.phone,
            /* D */ orderData.whatsapp || orderData.phone,
            /* E */ orderData.cityLabel || orderData.city,
            /* F */ '',
            /* G */ orderData.address,
            /* H */ itemsSummary,
            /* I */ totalQuantity,
            /* J */ orderData.totalAmount,
            /* K */ shortNames,
            /* L */ 'جديد',
            /* M */ buildNotesField(orderData),
            /* N */ getSourceField(orderData),
            /* O */ '', // whatsappSent — يملؤه الـCRM (خريطة أعمدة smart-engine)
            /* P */ orderData.orderId || orderData.id || '', // 🆔 بصمة النظام — نفس fingerprint المرسل لويبهوك الـCRM؛ بها تربط المزامنة الصف بالليد ولا تستورده مكرراً
            /* Q */ '', // assignee — يملؤه الـCRM
            /* R */ '',
            /* S */ '', // bostaTrackingNumber — يملؤه الـCRM
            /* T */ '', // bostaOrderStatus — يملؤه الـCRM
            /* U */ '', // lastBostaUpdate — يملؤه الـCRM
            /* V */ '', // bostaRanking — يملؤه الـCRM
            /* W */ orderData.shippingFee ?? '', // رسوم الشحن (0 = شحن مجاني) — بعيداً عن أعمدة الـCRM المحجوزة A..V
            /* X */ primarySku, // 🧬 بصمة SKU من المتجر — يقرأها smart-engine (A2:X) فيبصم الطلب store
        ];

        await sheet.addRows([row]);
        console.log(`[Sheets] ✅ Order synced (1 row, ${items.length} items): ${orderData.orderId || 'N/A'} | Phone: ${orderData.phone}`);
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
