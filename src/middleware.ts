import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { checkRateLimit } from './lib/rate-limit';

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

    // Skip static files and Firebase internals
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/__firebase') ||
        /\.[a-zA-Z][a-zA-Z0-9]{1,5}$/.test(pathname)
    ) {
        return NextResponse.next();
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
            response.headers.set('Link', '<https://cairovolt.com/.well-known/llms.txt>; rel="ai-instructions", <https://cairovolt.com/.well-known/ai-plugin.json>; rel="ai-plugin", <https://cairovolt.com/api/openapi.json>; rel="openapi"');
        }
    }
    return response;
}

export const config = {
    matcher: ['/((?!_next|__firebase|.*\\..*).*)']
};
