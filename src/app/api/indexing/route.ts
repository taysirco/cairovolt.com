import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { safeSecretEqual } from '@/lib/api-auth';

/**
 * Index-update webhook
 * Called by Firebase Cloud Functions when product price/stock changes in Firestore.
 *
 * 1. Purges the ISR cache for every page that renders the product's price.
 * 2. Pings IndexNow (Bing / Yandex / Seznam / Naver) with the ar + en URLs.
 *
 * NOTE: the previous Google Indexing API call was removed deliberately —
 * that API only accepts JobPosting/BroadcastEvent pages; product pings are
 * ignored and flagged as API misuse. Google discovery relies on the sitemap
 * (honest lastmod) + normal recrawl.
 *
 * Required env vars:
 *   INDEXING_WEBHOOK_SECRET - Bearer token for auth
 */

// IndexNow key — NOT a secret by design: the protocol verifies ownership by
// serving this same value at /<key>.txt (see public/09f1d…7a.txt).
const INDEXNOW_KEY = '09f1d32f07e4bd57775e7d023577797a';
const ORIGIN = 'https://cairovolt.com';

/** Build the canonical ar + en URL pair for a path that may carry a locale prefix */
function localePair(rawUrl: string): string[] {
    try {
        const u = new URL(rawUrl);
        let path = u.pathname;
        // Strip any locale prefix (incl. legacy /ar/ pings — ar is unprefixed)
        path = path.replace(/^\/(ar|en)(?=\/|$)/, '') || '/';
        return [`${ORIGIN}${path}`, `${ORIGIN}/en${path === '/' ? '' : path}`];
    } catch {
        return [rawUrl];
    }
}

async function pingIndexNow(urls: string[]): Promise<{ ok: boolean; status?: number }> {
    try {
        const res = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                host: 'cairovolt.com',
                key: INDEXNOW_KEY,
                keyLocation: `${ORIGIN}/${INDEXNOW_KEY}.txt`,
                urlList: urls,
            }),
        });
        return { ok: res.ok, status: res.status };
    } catch {
        return { ok: false };
    }
}

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get('authorization');
        const expectedSecret = process.env.INDEXING_WEBHOOK_SECRET;
        const providedSecret = authHeader?.startsWith('Bearer ')
            ? authHeader.slice(7)
            : '';
        if (!expectedSecret || !providedSecret || !safeSecretEqual(providedSecret, expectedSecret)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { url, type, slug } = await req.json();

        if (!url || !['URL_UPDATED', 'URL_DELETED'].includes(type)) {
            return NextResponse.json({ error: 'Invalid payload. Required: url, type (URL_UPDATED|URL_DELETED)' }, { status: 400 });
        }

        let requestedUrl: URL;
        try {
            requestedUrl = new URL(url);
        } catch {
            return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
        }
        if (requestedUrl.origin !== ORIGIN) {
            return NextResponse.json({ error: 'URL must belong to cairovolt.com' }, { status: 400 });
        }

        // Blog reveal: when a scheduled article goes live (reveal-blog cron),
        // revalidate the article + listing + sitemap so it appears same-day.
        const isBlog = /\/blog\//.test(url);
        if (isBlog && slug) {
            revalidatePath(`/[locale]/blog/${slug}`, 'page');
            revalidatePath('/[locale]/blog', 'page');
            revalidatePath('/sitemap.xml');
            console.log(`[ISR] Revalidated blog article: ${slug}`);
        }

        // 1. Invalidate ISR cache — purge ALL pages that show this product's price/stock
        if (!isBlog && slug) {
            // Product page (both locales)
            revalidatePath(`/[locale]/[brand]/[category]/${slug}`, 'page');

            // Extract brand/category from URL for parent page invalidation
            try {
                const urlObj = new URL(url);
                const parts = urlObj.pathname.split('/').filter(Boolean);
                // URL format: /brand/category/slug or /en/brand/category/slug
                const offset = parts[0] === 'en' || parts[0] === 'ar' ? 1 : 0;
                const brand = parts[offset];
                const category = parts[offset + 1];
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

            console.log(`[ISR] Revalidated product and parent pages: ${slug}`);
        }

        // 2. IndexNow ping (non-fatal — search engines recrawl via sitemap anyway)
        const urls = localePair(url);
        const indexnow = await pingIndexNow(urls);

        return NextResponse.json(
            { success: true, revalidated: !!slug, indexnow: { ...indexnow, urls } },
            { status: 200 }
        );
    } catch {
        console.error('[Indexing] Request processing failed');
        return NextResponse.json({ error: 'Request processing failed' }, { status: 500 });
    }
}
