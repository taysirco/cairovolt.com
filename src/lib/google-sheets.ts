import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { getSecret } from './get-secrets';

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
        console.log('Google Sheets Auth initialized for:', GOOGLE_CLIENT_EMAIL);
        return auth;
    } catch (error) {
        console.error('Google Auth Init Failed:', error);
        return null;
    }
}

export async function appendOrderToSheet(orderData: any) {
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const auth = await getAuth();

    if (!SHEET_ID || !auth) {
        console.error('Google Sheets credentials missing or invalid');
        return;
    }

    try {
        const doc = new GoogleSpreadsheet(SHEET_ID, auth);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0]; // Assume first sheet

        const rows = orderData.items.map((item: any) => ({
            'تاريخ الطلب': new Date().toLocaleDateString('ar-EG'),
            'الاسم': orderData.customerName,
            'رقم الهاتف': orderData.phone,
            'رقم الواتس': orderData.whatsapp || orderData.phone,
            'المحافظة': orderData.cityLabel || orderData.city,
            'المنطقة': '', // Not collected explicitly
            'العنوان': orderData.address,
            'تفاصيل الطلب': `${item.name} (x${item.quantity})`,
            'الكمية': item.quantity,
            'توتال السعر شامل الشحن': orderData.totalAmount, // Total order price
            'اسم المنتج': item.name,
            'الحالة': 'جديد',
            'ملاحظات': 'طلب من الموقع',
        }));

        await sheet.addRows(rows);
        console.log('Order added to Google Sheet successfully. Rows:', rows.length);
    } catch (error: any) {
        console.error('Error appending to Google Sheet:', error?.message || error, 'Code:', error?.code, 'Status:', error?.status);
        // Reset cached auth on auth errors so it's rebuilt next time
        if (error?.code === 401 || error?.code === 403 || error?.message?.includes('invalid_grant')) {
            cachedAuth = null;
        }
    }
}
