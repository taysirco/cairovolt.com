import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { revalidatePath } from 'next/cache';

/**
 * Google Indexing API Webhook
 * Called by Firebase Cloud Functions when product price/stock changes in Firestore.
 * Instantly notifies Google to re-crawl the updated product page.
 *
 * Required env vars:
 *   INDEXING_WEBHOOK_SECRET - Bearer token for auth
 *   GOOGLE_CLIENT_EMAIL     - Service account email
 *   GOOGLE_PRIVATE_KEY      - Service account private key (with \n escaped)
 */
export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.INDEXING_WEBHOOK_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { url, type, slug } = await req.json();

        if (!url || !['URL_UPDATED', 'URL_DELETED'].includes(type)) {
            return NextResponse.json({ error: 'Invalid payload. Required: url, type (URL_UPDATED|URL_DELETED)' }, { status: 400 });
        }

        // 1. Bust the ISR cache so Googlebot sees the fresh price/stock
        if (slug) {
            revalidatePath(`/[locale]/[brand]/[category]/${slug}`, 'page');
        }

        // 2. Authenticate with Google Indexing API via service account
        const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
        const jwtClient = new google.auth.JWT({
            email: process.env.GOOGLE_CLIENT_EMAIL,
            key: privateKey,
            scopes: ['https://www.googleapis.com/auth/indexing'],
        });

        await jwtClient.authorize();
        const indexing = google.indexing({ version: 'v3', auth: jwtClient });

        // 3. Notify Google
        const response = await indexing.urlNotifications.publish({
            requestBody: { url, type },
        });

        return NextResponse.json(
            { success: true, google_response: response.data },
            { status: 200 }
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
