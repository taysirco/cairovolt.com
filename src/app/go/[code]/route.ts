/**
 * CairoVolt Internal URL Shortener
 * 
 * /go/{product-slug} → 301 redirect to full product page
 * 
 * Benefits:
 * - Zero external dependencies (in-memory static lookup)
 * - Sub-millisecond resolution
 * - Click tracking via Firestore (deferred, non-blocking)
 * - Permanent 301 redirect for SEO link equity
 * 
 * Example:
 *   cairovolt.com/go/anker-zolo-a110e-20000
 *   → cairovolt.com/ar/anker/power-banks/anker-zolo-a110e-20000
 */

import { NextRequest, NextResponse } from 'next/server';
import { staticProducts } from '@/lib/static-products';

// Pre-build lookup map at module load (O(1) access, built once)
const slugMap = new Map<string, { brand: string; category: string; slug: string }>();
for (const p of staticProducts) {
    slugMap.set(p.slug, {
        brand: p.brand.toLowerCase(),
        category: p.categorySlug,
        slug: p.slug,
    });
    // Also map by SKU for even shorter URLs
    if (p.sku && p.sku !== p.slug) {
        slugMap.set(p.sku.toLowerCase(), {
            brand: p.brand.toLowerCase(),
            category: p.categorySlug,
            slug: p.slug,
        });
    }
}

const PRODUCTION_DOMAIN = 'https://cairovolt.com';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;
    const product = slugMap.get(code) || slugMap.get(code.toLowerCase());

    // Resolve the real origin (Firebase App Hosting uses 0.0.0.0 internally)
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
    const proto = req.headers.get('x-forwarded-proto') || 'https';
    const origin = host && !host.startsWith('0.0.0.0')
        ? `${proto}://${host}`
        : PRODUCTION_DOMAIN;

    if (!product) {
        // Unknown code → redirect to homepage
        return NextResponse.redirect(`${origin}/ar`, { status: 302 });
    }

    const fullUrl = `${origin}/ar/${product.brand}/${product.category}/${product.slug}`;

    // Track click asynchronously (fire-and-forget, never blocks redirect)
    trackClick(code, req).catch(() => {});

    // 301 permanent redirect — browsers & search engines cache this
    return NextResponse.redirect(fullUrl, { status: 301 });
}

/** Non-blocking click tracker — logs to console, optionally to Firestore */
async function trackClick(code: string, req: NextRequest): Promise<void> {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
    const ua = req.headers.get('user-agent') || '';
    const referer = req.headers.get('referer') || '';

    console.log(`[ShortURL] 🔗 /go/${code} | IP: ${ip} | Ref: ${referer} | UA: ${ua.slice(0, 60)}`);

    // Optional: persist to Firestore for analytics dashboard
    // Uncomment when needed:
    // try {
    //     const { getFirestore } = await import('@/lib/firebase-admin');
    //     const db = await getFirestore();
    //     await db.collection('short_url_clicks').add({
    //         code,
    //         ip,
    //         userAgent: ua,
    //         referer,
    //         timestamp: new Date(),
    //     });
    // } catch { /* silent */ }
}
