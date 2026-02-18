import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// SEO spy bots to block — saves crawl budget and hides strategy from competitors
const SPY_BOT_PATTERN = /ahrefsbot|semrushbot|mj12bot|dotbot|rogerbot|sistrix|megaindex/i;

// Search engine bots we want to optimize for
const SEARCH_BOT_PATTERN = /googlebot|google-extended|bingbot|yandex|baiduspider/i;

// AI crawlers that consume llms.txt data
const AI_CRAWLER_PATTERN = /gptbot|chatgpt|claude|anthropic|perplexity|cohere|google-extended/i;

// Junk query params that fragment crawl budget
const JUNK_PARAMS = ['sort', 'filter', 'min_price', 'max_price', 'fbclid', 'gclid'];

// Paths bots should not waste crawl budget on (410 for search bots)
const BOT_BLOCKED_PATHS = ['/checkout', '/cart', '/account'];

// Paths that should always have noindex regardless of bot type
const NOINDEX_PATHS = ['/admin', '/confirm', '/review/'];

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userAgent = request.headers.get('user-agent') || '';

    // Skip API routes, static files, Firebase internals
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/__firebase') ||
        /\.[a-zA-Z][a-zA-Z0-9]{1,5}$/.test(pathname)
    ) {
        return NextResponse.next();
    }

    // ── Block competitor spy bots (403) ──
    if (SPY_BOT_PATTERN.test(userAgent)) {
        return new NextResponse('Access Denied.', { status: 403 });
    }

    // ── Search bot optimizations ──
    const isSearchBot = SEARCH_BOT_PATTERN.test(userAgent);

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

        // Block crawling of cart/checkout/account pages → 410 Gone
        if (BOT_BLOCKED_PATHS.some(path => pathname.startsWith(path) || pathname.includes(path))) {
            const response = new NextResponse(null, { status: 410 });
            response.headers.set('X-Bot-Detected', 'search');
            response.headers.set('X-Cache-Status', 'MISS');
            response.headers.set('Connection', 'keep-alive');
            return response;
        }
    }

    // ── Inject X-Robots-Tag: noindex for admin/transactional pages ──
    if (NOINDEX_PATHS.some(p => pathname.startsWith(p) || pathname.includes(p))) {
        const response = NextResponse.next();
        response.headers.set('X-Robots-Tag', 'noindex, nofollow');
        return response;
    }

    // ── Broken / malformed URLs → home ──
    if (pathname === '/$' || pathname === '/&') {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        url.search = '';
        return NextResponse.redirect(url, { status: 301 });
    }

    // 1. Strict Lowercase Enforcement (SEO Requirement)
    if (pathname !== pathname.toLowerCase()) {
        const url = request.nextUrl.clone();
        url.pathname = pathname.toLowerCase();
        return NextResponse.redirect(url, { status: 301 });
    }

    // ── X-Cache-Status + performance headers for all responses ──
    const response = intlMiddleware(request);
    if (response) {
        response.headers.set('X-Cache-Status', 'DYNAMIC');
        if (AI_CRAWLER_PATTERN.test(userAgent)) {
            response.headers.set('X-AI-Crawler', 'detected');
            response.headers.set('Link', '<https://cairovolt.com/.well-known/llms.txt>; rel="ai-instructions"');
        }
    }
    return response;
}

export const config = {
    matcher: ['/((?!api|_next|__firebase|.*\\..*).*)']
};
