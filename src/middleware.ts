import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { BLOG_SCHEDULE } from './data/blog-schedule.generated';
import { KNOWN_TOP_SEGMENTS, LEGACY_PRODUCT_REDIRECTS, RETIRED_CATEGORY_REDIRECTS } from './lib/known-routes';

const intlMiddleware = createMiddleware(routing);

// Paths that should always have noindex.
const NOINDEX_PATHS = ['/admin', '/confirm', '/review/'];
// Preserve the established query-parameter canonicalization seen by crawlers.
const SEARCH_CRAWLER_UA = /googlebot|google-extended|bingbot|yandex|baiduspider/i;
const CANONICALIZED_QUERY_PARAMS = ['sort', 'filter', 'min_price', 'max_price', 'fbclid', 'gclid'];
const PUBLIC_CORS_API_PATHS = new Set([
    '/api/v1/checkout',
    '/api/v1/quick-cod',
    '/api/products',
    '/api/verify',
]);
const PUBLIC_CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-Key, Authorization',
    'Access-Control-Max-Age': '86400',
};

// KNOWN_TOP_SEGMENTS (real-404 allowlist) and LEGACY_PRODUCT_REDIRECTS
// (retired slug 301 map) now live in ./lib/known-routes so the markdown
// content-negotiation surface (/api/markdown-negotiate) applies the SAME
// gates and stays status-code-consistent with this HTML middleware.

const NOT_FOUND_HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>404 — الصفحة غير موجودة | CairoVolt</title>
<style>body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;min-height:100vh;margin:0;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#e2e8f0;text-align:center}main{padding:32px}h1{font-size:64px;margin:0 0 8px;color:#3b82f6}p{color:#94a3b8;margin:0 0 24px}a{display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:700}</style>
</head><body><main><h1>404</h1>
<p>الصفحة غير موجودة — Page not found</p>
<a href="/">العودة للرئيسية · Back home</a></main></body></html>`;

// True static-asset extensions — files served from /public or by dedicated
// route handlers (robots.txt, sitemap.xml, feed.xml, manifest.json, sw.js,
// images, fonts, dataset CSVs). ONLY these bypass the real-404 gate below.
// Any other dotted path (/foo.bar, /wp-login.php, /random.html) is junk and
// must reach the gate — a bare "has an extension" test previously let every
// dotted URL through to the [locale] catch-all, which rendered a homepage
// clone with HTTP 200 (soft-404), edge-cached for a year.
// MAINTENANCE: extend only when shipping a NEW public-file extension.
const STATIC_ASSET_EXTENSIONS =
    /\.(?:js|css|map|png|jpe?g|webp|avif|gif|svg|ico|txt|xml|json|csv|webmanifest|woff2?|ttf|pdf)$/i;

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userAgent = request.headers.get('user-agent') || '';

    // Skip Next/Firebase internals, the image optimizer, and true static assets.
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/__firebase') ||
        pathname.startsWith('/api/img') ||
        STATIC_ASSET_EXTENSIONS.test(pathname)
    ) {
        return NextResponse.next();
    }

    // Route well-known documents outside locale handling.
    if (pathname.startsWith('/.well-known')) {
        const url = request.nextUrl.clone();
        url.pathname = pathname;
        return NextResponse.rewrite(url);
    }

    // The short-link route is not localized.
    if (pathname.startsWith('/go')) {
        return NextResponse.next();
    }

    // Honor explicit Markdown content negotiation for every caller equally.
    const acceptHeader = request.headers.get('accept') || '';
    if (acceptHeader.includes('text/markdown') && !pathname.startsWith('/api')) {
        const url = request.nextUrl.clone();
        url.pathname = `/api/markdown-negotiate${pathname === '/' ? '/index' : pathname}`;
        return NextResponse.rewrite(url);
    }

    // Internal staff pages are not localized or indexable.
    if (pathname.startsWith('/admin')) {
        const response = NextResponse.next();
        response.headers.set('X-Robots-Tag', 'noindex, nofollow');
        return response;
    }

    // Preserve cross-origin access only for the documented public API surface.
    if (PUBLIC_CORS_API_PATHS.has(pathname)) {
        if (request.method === 'OPTIONS') {
            return new NextResponse(null, {
                status: 204,
                headers: PUBLIC_CORS_HEADERS,
            });
        }
        const response = NextResponse.next();
        for (const [name, value] of Object.entries(PUBLIC_CORS_HEADERS)) {
            response.headers.set(name, value);
        }
        return response;
    }

    // API handlers apply their own authentication, validation, and rate limits.
    if (pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    // Keep the existing crawler-facing 301 destinations for non-canonical
    // query variants. The path, locale and every unrelated query value remain.
    if (SEARCH_CRAWLER_UA.test(userAgent)) {
        const url = request.nextUrl.clone();
        let changed = false;
        for (const parameter of CANONICALIZED_QUERY_PARAMS) {
            if (url.searchParams.has(parameter)) {
                url.searchParams.delete(parameter);
                changed = true;
            }
        }
        if (changed) return NextResponse.redirect(url, 301);
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

    // Canonicalize the optional Arabic prefix with a permanent redirect.
    if (pathname === '/ar' || pathname === '/ar/' || pathname.startsWith('/ar/')) {
        const url = request.nextUrl.clone();
        url.pathname = pathname === '/ar' ? '/' : pathname.slice(3);
        return NextResponse.redirect(url, { status: 301 });
    }

    // 1. Strict Lowercase Enforcement (URL Best Practice)
    if (pathname !== pathname.toLowerCase()) {
        const url = request.nextUrl.clone();
        url.pathname = pathname.toLowerCase();
        return NextResponse.redirect(url, { status: 301 });
    }

    // Soundcore audio products use the dedicated /soundcore route tree.
    // Patterns:
    //   /anker/audio                  → /soundcore/audio
    //   /anker/audio/{slug}           → /soundcore/audio/{slug}
    //   /anker/speakers               → /soundcore/speakers
    //   /anker/speakers/{slug}        → /soundcore/speakers/{slug}
    //   /en/anker/{audio|speakers}/*  → /en/soundcore/{audio|speakers}/*
    const soundcoreMigration = pathname.match(
        /^(\/en)?\/anker\/(audio|speakers)(\/.*)?$/
    );
    if (soundcoreMigration) {
        const [, localePrefix, category, rest] = soundcoreMigration;
        const url = request.nextUrl.clone();
        url.pathname = `${localePrefix || ''}/soundcore/${category}${rest || ''}`;
        return NextResponse.redirect(url, { status: 301 });
    }

    // 2.4 Retired CATEGORY prefix 301s — see RETIRED_CATEGORY_REDIRECTS above.
    // Catches the dead "brand/category" page AND any product deep-link beneath
    // it (old blog links to categories the catalogue never had). Fail-open: a
    // brand/category pair not in the map falls through untouched, so real
    // category and product URLs are never affected.
    const retiredCategory = pathname.match(
        /^(\/en)?\/((?:anker|joyroom|soundcore)\/[a-z0-9-]+)(?:\/.*)?$/
    );
    if (retiredCategory) {
        const categoryTarget = RETIRED_CATEGORY_REDIRECTS[retiredCategory[2]];
        if (categoryTarget) {
            const url = request.nextUrl.clone();
            url.pathname = `${retiredCategory[1] || ''}${categoryTarget}`;
            return NextResponse.redirect(url, { status: 301 });
        }
    }

    // 2.5 Retired product slug 301s — see LEGACY_PRODUCT_REDIRECTS above.
    // Matches /(en/)?brand/<optional middle segment>/<slug>, so both the
    // canonical 3-segment shape and old 2-segment relics (/soundcore/<slug>)
    // are caught, whatever (possibly wrong) category the stale link used.
    // Only fires when the FINAL segment is a known retired slug — valid
    // product URLs and category pages can never match a map key.
    const legacyProduct = pathname.match(
        /^(\/en)?\/(?:anker|joyroom|soundcore)(?:\/[a-z0-9-]+)?\/([a-z0-9-]+)\/?$/
    );
    if (legacyProduct) {
        const target = LEGACY_PRODUCT_REDIRECTS[legacyProduct[2]];
        if (target) {
            const url = request.nextUrl.clone();
            url.pathname = `${legacyProduct[1] || ''}${target}`;
            return NextResponse.redirect(url, { status: 301 });
        }
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

    // 4. Blog scheduling gate — emit a REAL 404 for an unknown OR not-yet-
    // published article slug (/blog/<slug> only; the /blog listing and deeper
    // paths are untouched). Evaluated per-request against a lightweight
    // slug→publishDate map, so no ISR/CDN cache can freeze the time gate: a
    // scheduled post 404s until its publishDate and serves automatically once it
    // passes. 0 in the map = always-live (mirrors isIndexEntryLive's fallback).
    const blogArticle = pathname.match(/^(?:\/(?:en|ar))?\/blog\/([^/]+)\/?$/);
    if (blogArticle) {
        const ts = BLOG_SCHEDULE[blogArticle[1]];
        if (ts === undefined || ts > Date.now()) {
            return new NextResponse(NOT_FOUND_HTML, {
                status: 404,
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                    'X-Robots-Tag': 'noindex',
                    'Cache-Control': 'public, max-age=60',
                },
            });
        }
    }

    // Apply shared response headers after locale resolution.
    const response = intlMiddleware(request);
    if (response) {
        // Apply noindex for transactional pages (confirm, admin, etc.)
        if (isNoindexPath) {
            response.headers.set('X-Robots-Tag', 'noindex');
        }

        // Clean framework identifiers for all responses
        response.headers.delete('x-powered-by');

        // Keep HTML and explicitly negotiated Markdown cache entries separate.
        response.headers.set('Vary', 'Accept');

        // Cache public content at the CDN while excluding personal and transactional pages.
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
    // Include well-known documents and public routes. /_next, /__firebase and
    // the image optimizer stay excluded so their cache headers remain intact.
    // Dotted paths are deliberately NOT excluded here anymore: the middleware
    // separates true static assets (STATIC_ASSET_EXTENSIONS → immediate
    // pass-through, headers untouched) from dotted junk URLs, which must reach
    // the KNOWN_TOP_SEGMENTS real-404 gate instead of soft-404ing as a
    // homepage clone via the [locale] catch-all.
    matcher: [
        '/.well-known/:path*',
        '/((?!_next|__firebase|api/img).*)',
    ]
};
