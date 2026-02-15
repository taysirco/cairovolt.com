import { NextResponse } from 'next/server';
import { getSecret } from '@/lib/get-secrets';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function GET() {
    const diagnostics: any = {};

    try {
        // Check env vars
        diagnostics.envCheck = {
            GOOGLE_SHEET_ID: !!process.env.GOOGLE_SHEET_ID,
            GOOGLE_SERVICE_ACCOUNT_EMAIL_env: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            GOOGLE_PRIVATE_KEY_env: !!process.env.GOOGLE_PRIVATE_KEY,
            google_service_account_email_env: !!process.env.google_service_account_email,
            google_private_key_env: !!process.env.google_private_key,
        };

        // Check secrets
        const email = await getSecret('google_service_account_email');
        const key = await getSecret('google_private_key');

        diagnostics.secretsFetched = {
            email: email || 'MISSING',
            keyLength: key?.length || 0,
            keyStart: key?.substring(0, 27) || 'MISSING',
            keyEnd: key?.substring(key.length - 30) || 'MISSING',
            hasRealNewlines: key?.includes('\n') || false,
            hasEscapedNewlines: key?.includes('\\n') || false,
            newlineCount: (key?.match(/\n/g) || []).length,
            escapedNewlineCount: (key?.match(/\\n/g) || []).length,
        };

        if (!email || !key) {
            diagnostics.error = 'Secrets missing';
            return NextResponse.json(diagnostics);
        }

        // Try auth
        const processedKey = key.replace(/\\n/g, '\n');
        diagnostics.processedKey = {
            length: processedKey.length,
            start: processedKey.substring(0, 27),
            hasRealNewlines: processedKey.includes('\n'),
            newlineCount: (processedKey.match(/\n/g) || []).length,
        };

        const auth = new JWT({
            email: email,
            key: processedKey,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        diagnostics.authCreated = true;

        // Try loading sheet
        const SHEET_ID = process.env.GOOGLE_SHEET_ID;
        if (SHEET_ID) {
            const doc = new GoogleSpreadsheet(SHEET_ID, auth);
            await doc.loadInfo();
            diagnostics.sheetLoaded = true;
            diagnostics.sheetTitle = doc.title;

            // Test row
            const sheet = doc.sheetsByIndex[0];
            await sheet.addRow({
                'تاريخ الطلب': new Date().toLocaleDateString('ar-EG'),
                'الاسم': 'تجربة سيرفر - احذفه',
                'رقم الهاتف': '01888888888',
                'رقم الواتس': '01888888888',
                'المحافظة': 'القاهرة',
                'المنطقة': '',
                'العنوان': 'تجربة سيرفر',
                'تفاصيل الطلب': 'تجربة (x1)',
                'الكمية': 1,
                'توتال السعر شامل الشحن': 0,
                'اسم المنتج': 'تجربة',
                'الحالة': 'تجربة',
                'ملاحظات': 'تجربة سيرفر - احذفه',
            });
            diagnostics.testRowAdded = true;
        }
    } catch (error: any) {
        diagnostics.error = error.message;
        diagnostics.errorCode = error.code;
        diagnostics.errorStack = error.stack?.split('\n').slice(0, 5);
    }

    return NextResponse.json(diagnostics);
}
