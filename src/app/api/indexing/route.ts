import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { revalidatePath } from 'next/cache';

/**
 * Google Indexing API Webhook
 * Called by Firebase Cloud Functions when product price/stock changes in Firestore.
 * Notifies the Indexing API about updated product pages.
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

        // 1. Invalidate ISR cache — purge ALL pages that show this product's price/stock
        if (slug) {
            // Product page (both locales)
            revalidatePath(`/[locale]/[brand]/[category]/${slug}`, 'page');

            // Extract brand/category from URL for parent page invalidation
            try {
                const urlObj = new URL(url);
                const parts = urlObj.pathname.split('/').filter(Boolean);
                // URL format: /ar/brand/category/slug or /en/brand/category/slug
                const brand = parts[1];
                const category = parts[2];
                if (brand && category) {
                    // Category listing page
                    revalidatePath(`/[locale]/${brand}/${category}`, 'page');
                    // Brand hub page
                    revalidatePath(`/[locale]/${brand}`, 'page');
                }
            } catch { /* URL parsing failed — skip parent pages */ }

            // Home page (shows featured products with prices)
            revalidatePath('/[locale]', 'page');
            // RSS feed (includes prices)
            revalidatePath('/feed.xml', 'layout');

            console.log(`[ISR] 🔄 Purged cache for: ${slug} + parent pages`);
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
