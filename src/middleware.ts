import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { checkRateLimit } from './lib/rate-limit';

const intlMiddleware = createMiddleware(routing);

// Known scraper user-agents
const SCRAPER_UA = /ahrefsbot|semrushbot|mj12bot|dotbot|rogerbot|sistrix|megaindex/i;

// Search engine user-agents
const ENGINE_UA = /googlebot|google-extended|bingbot|yandex|baiduspider/i;

// Partner bot user-agents
const PARTNER_UA = /gptbot|chatgpt|claude|anthropic|perplexity|cohere|google-extended/i;

// Junk query params to clean
const JUNK_PARAMS = ['sort', 'filter', 'min_price', 'max_price', 'fbclid', 'gclid'];

// Non-public paths (return 410 for bots)
const BOT_BLOCKED_PATHS = ['/checkout', '/cart', '/account'];

// Paths that should always have noindex regardless of bot type
const NOINDEX_PATHS = ['/admin', '/confirm', '/review/'];

// Pre-computed Link header — avoids string allocation on every request
const RESOURCE_LINKS = '<https://cairovolt.com/.well-known/llms.txt>; rel="ai-instructions", <https://cairovolt.com/.well-known/llms-full.txt>; rel="ai-instructions-full", <https://cairovolt.com/api/openapi.json>; rel="openapi", <https://cairovolt.com/api/lab-data/json>; rel="dataset", <https://cairovolt.com/.well-known/api-catalog>; rel="service-desc"; type="application/linkset+json"';

// Every valid first path segment (after the optional locale prefix).
// Anything else gets a REAL 404 from middleware — the FAH adapter turns
// Next's own not-found responses into HTTP 200 (soft-404), so unknown
// URLs must be rejected before they reach the router.
// MAINTENANCE: extend when adding a brand, generic category, or landing page.
const KNOWN_TOP_SEGMENTS = new Set([
    // brands + brand hubs
    'anker', 'joyroom', 'soundcore',
    // generic category landing pages
    'power-banks', 'chargers', 'cables', 'earbuds',
    // content & info pages
    'about', 'team', 'contact', 'faq', 'blog', 'locations', 'solutions',
    'lab', 'verify', 'warranty', 'shipping', 'return-policy', 'privacy', 'terms',
    // commerce & account flows
    'checkout', 'confirm', 'review', 'search',
    // infrastructure (also have earlier bypasses; listed for safety)
    'admin', 'api', 'go',
]);

const NOT_FOUND_HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>404 — الصفحة غير موجودة | CairoVolt</title>
<style>body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;min-height:100vh;margin:0;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#e2e8f0;text-align:center}main{padding:32px}h1{font-size:64px;margin:0 0 8px;color:#3b82f6}p{color:#94a3b8;margin:0 0 24px}a{display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:700}</style>
</head><body><main><h1>404</h1>
<p>الصفحة غير موجودة — Page not found</p>
<a href="/">العودة للرئيسية · Back home</a></main></body></html>`;

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userAgent = request.headers.get('user-agent') || '';

    // Skip static files, Firebase internals, and image optimizer
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/__firebase') ||
        pathname.startsWith('/api/img') ||
        /\.[a-zA-Z][a-zA-Z0-9]{1,5}$/.test(pathname)
    ) {
        return NextResponse.next();
    }

    // ── .well-known bypass — standalone API routes, no i18n needed ──
    // CRITICAL: Simple NextResponse.next() fails because Next.js resolves
    // /.well-known/xyz as [locale]='.well-known'. We must actively REWRITE
    // to force the router to use the actual route handler at src/app/.well-known/.
    if (pathname.startsWith('/.well-known')) {
        const url = request.nextUrl.clone();
        url.pathname = pathname; // Keep the same path
        return NextResponse.rewrite(url);
    }

    // ── /go URL shortener bypass — standalone route, no i18n needed ──
    if (pathname.startsWith('/go')) {
        return NextResponse.next();
    }

    // ── Markdown Content Negotiation (Accept: text/markdown) ──
    // When AI agents request markdown, rewrite to the markdown negotiation handler
    const acceptHeader = request.headers.get('accept') || '';
    if (acceptHeader.includes('text/markdown') && !pathname.startsWith('/api')) {
        const url = request.nextUrl.clone();
        url.pathname = `/api/markdown-negotiate${pathname === '/' ? '/index' : pathname}`;
        return NextResponse.rewrite(url);
    }

    // /verify is now inside [locale] — let intlMiddleware handle routing

    // ── /admin bypass — internal staff pages, no i18n needed ──
    if (pathname.startsWith('/admin')) {
        const response = NextResponse.next();
        response.headers.set('X-Robots-Tag', 'noindex, nofollow');
        return response;
    }

    // ── API Rate Limiting + CORS ──
    if (pathname.startsWith('/api')) {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const isWrite = request.method !== 'GET' && request.method !== 'HEAD' && request.method !== 'OPTIONS';
        const rateResult = checkRateLimit(ip, isWrite);

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new NextResponse(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
                    'Access-Control-Max-Age': '86400',
                },
            });
        }

        if (!rateResult.allowed) {
            return NextResponse.json(
                { error: 'Rate limit exceeded', retryAfter: Math.ceil((rateResult.resetAt - Date.now()) / 1000) },
                {
                    status: 429,
                    headers: {
                        'Retry-After': String(Math.ceil((rateResult.resetAt - Date.now()) / 1000)),
                        'X-RateLimit-Limit': String(rateResult.limit),
                        'X-RateLimit-Remaining': '0',
                    },
                },
            );
        }

        const response = NextResponse.next();
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('X-RateLimit-Limit', String(rateResult.limit));
        response.headers.set('X-RateLimit-Remaining', String(rateResult.remaining));
        return response;
    }

    // ── Block scraper bots (403) ──
    if (SCRAPER_UA.test(userAgent)) {
        return new NextResponse('Access Denied.', { status: 403 });
    }

    // ── Bot routing ──
    const isSearchBot = ENGINE_UA.test(userAgent);

    if (isSearchBot) {
        const url = request.nextUrl.clone();

        // Clean junk query params → 301 to canonical URL
        let hasJunk = false;
        JUNK_PARAMS.forEach(param => {
            if (url.searchParams.has(param)) {
                url.searchParams.delete(param);
                hasJunk = true;
            }
        });
        if (hasJunk) {
            return NextResponse.redirect(url, 301);
        }

        // Block cart/checkout/account pages → 410 Gone
        if (BOT_BLOCKED_PATHS.some(path => pathname.startsWith(path) || pathname.includes(path))) {
            return new NextResponse(null, { status: 410 });
        }
    }

    // ── Inject X-Robots-Tag: noindex for admin/transactional pages ──
    // NOTE: We must NOT return early here — intlMiddleware must run to resolve [locale].
    // The noindex header is applied after intlMiddleware runs, below.
    const isNoindexPath = NOINDEX_PATHS.some(p => pathname.startsWith(p) || pathname.includes(p));

    // ── Broken / malformed URLs → home ──
    if (pathname === '/$' || pathname === '/&') {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        url.search = '';
        return NextResponse.redirect(url, { status: 301 });
    }

    // 1. Strict Lowercase Enforcement (URL Best Practice)
    if (pathname !== pathname.toLowerCase()) {
        const url = request.nextUrl.clone();
        url.pathname = pathname.toLowerCase();
        return NextResponse.redirect(url, { status: 301 });
    }

    // 2. Soundcore Migration 301s (May 2026) — Anker audio products moved to /soundcore tree.
    // Patterns:
    //   /anker/audio                  → /soundcore/audio
    //   /anker/audio/{slug}           → /soundcore/audio/{slug}
    //   /anker/speakers               → /soundcore/speakers
    //   /anker/speakers/{slug}        → /soundcore/speakers/{slug}
    //   /en/anker/{audio|speakers}/*  → /en/soundcore/{audio|speakers}/*
    // Preserves ~95% link equity via 301 + maintains hreflang consistency.
    const soundcoreMigration = pathname.match(
        /^(\/en)?\/anker\/(audio|speakers)(\/.*)?$/
    );
    if (soundcoreMigration) {
        const [, localePrefix, category, rest] = soundcoreMigration;
        const url = request.nextUrl.clone();
        url.pathname = `${localePrefix || ''}/soundcore/${category}${rest || ''}`;
        return NextResponse.redirect(url, { status: 301 });
    }

    // 3. Real 404 for unknown top-level segments (soft-404 fix).
    // The FAH adapter serves Next's not-found page with HTTP 200, so the only
    // reliable place to emit a real 404 status is the middleware (statuses
    // here DO survive the serving layer — verified via the 301/204 paths).
    // MAINTENANCE: add new top-level routes (brands, landing pages) here.
    const firstSegment = (() => {
        const parts = pathname.split('/').filter(Boolean);
        if (parts[0] === 'en' || parts[0] === 'ar') parts.shift();
        return parts[0];
    })();
    if (firstSegment && !KNOWN_TOP_SEGMENTS.has(firstSegment)) {
        return new NextResponse(NOT_FOUND_HTML, {
            status: 404,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'X-Robots-Tag': 'noindex',
                'Cache-Control': 'public, max-age=300',
            },
        });
    }

    // ── X-Cache-Status + performance headers for all responses ──
    const response = intlMiddleware(request);
    if (response) {
        // Apply noindex for transactional pages (confirm, admin, etc.)
        if (isNoindexPath) {
            response.headers.set('X-Robots-Tag', 'noindex');
        }

        // Clean framework identifiers for all responses
        response.headers.delete('x-powered-by');

        // Resource discovery links only for bots — saves ~380B header per human request
        const isBot = ENGINE_UA.test(userAgent) || PARTNER_UA.test(userAgent);
        if (isBot) {
            const existingLink = response.headers.get('Link');
            response.headers.set('Link', existingLink ? `${existingLink}, ${RESOURCE_LINKS}` : RESOURCE_LINKS);
        }

        // Vary: Accept — critical for content negotiation caching (HTML vs markdown)
        response.headers.set('Vary', 'Accept');

        if (PARTNER_UA.test(userAgent)) {
            response.headers.set('X-Bot-Type', 'partner');
        }

        // ── Edge-cache content HTML (TTFB ~460ms → ~20ms) ──────────────────
        // Safe because locale is URL-only (localeDetection:false) and there is
        // no longer a Set-Cookie (localeCookie:false), so a page's HTML is
        // byte-identical for every visitor (cart, promo, theme are all
        // client-side). We hand Cloudflare a `CDN-Cache-Control` it caches the
        // edge against, while the browser still revalidates (max-age=0) so price
        // changes are never stale to the user. Transactional/personal routes are
        // excluded. NOTE: a Cloudflare "Cache Everything" rule on these paths is
        // required for this to take effect — see deploy notes.
        const isCacheablePage =
            request.method === 'GET' &&
            !/\/(admin|checkout|confirm|cart|account|review|verify)(\/|$)/.test(pathname);
        if (isCacheablePage) {
            response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
            response.headers.set('CDN-Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
        }
    }
    return response;
}

export const config = {
    // Match all paths EXCEPT static files and framework internals.
    // IMPORTANT: .well-known paths must reach middleware for the rewrite bypass,
    // even though they contain a dot. We use two patterns:
    // 1. /.well-known/* — always included
    // 2. Everything else except paths with dots, _next, __firebase, api/img
    // 💰 api/img مستثنى: مرور صور /api/img عبر الـ middleware كان يجعل مهايئ
    //    App Hosting يعيد كتابة Cache-Control إلى private → كل صورة لكل زائر
    //    تُحاسَب كطلب Cloud Run + وقت 2vCPU (مؤكد حياً: cf-cache-status: DYNAMIC).
    //    باستثنائها يصل Cache-Control «public, immutable» الذي يرسله الـ route
    //    فعلاً إلى CDN كلاودفلير/جوجل فتُخدم الصور من الحافة مجاناً.
    matcher: [
        '/.well-known/:path*',
        '/((?!_next|__firebase|api/img|.*\\..*).*)',
    ]
};
