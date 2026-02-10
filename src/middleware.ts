import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Brand case correction mapping
const brandCaseMap: Record<string, string> = {
    'anker': 'Anker',
    'joyroom': 'Joyroom',
};

export default function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip API routes, static files, etc.
    // Use precise file extension check (letter + alphanums) to avoid skipping
    // product URLs with dots like /joyroom-usb-a-type-c-1.2m
    const hasFileExtension = /\.[a-zA-Z][a-zA-Z0-9]{1,5}$/.test(pathname);
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        hasFileExtension
    ) {
        return NextResponse.next();
    }

    // ── Broken / malformed URLs → home ──
    if (pathname === '/$' || pathname === '/&') {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        url.search = '';
        return NextResponse.redirect(url, { status: 301 });
    }

    // ── Search page URLs → home (no search page exists) ──
    // Handles /search, /ar/search, /en/search (with any query params)
    if (
        pathname === '/search' ||
        pathname === '/ar/search' ||
        pathname === '/en/search'
    ) {
        const url = request.nextUrl.clone();
        url.pathname = pathname === '/en/search' ? '/en' : '/';
        url.search = '';
        return NextResponse.redirect(url, { status: 301 });
    }

    // Check for lowercase brand names and redirect to proper casing
    const pathSegments = pathname.split('/').filter(Boolean);

    // Determine if first segment is locale
    const hasLocale = pathSegments[0] === 'en' || pathSegments[0] === 'ar';
    const locale = hasLocale ? pathSegments[0] : null;
    const slugIndex = hasLocale ? 1 : 0;
    const firstSlug = pathSegments[slugIndex]?.toLowerCase();

    // ── Combined: /ar/ prefix strip + brand case correction in ONE redirect ──
    // /ar/joyroom/product → /Joyroom/product (single 301 instead of 2-3 hops)
    // /en/joyroom/product → /en/Joyroom/product
    // /anker/product → /Anker/product
    if (firstSlug && brandCaseMap[firstSlug]) {
        const actualBrand = pathSegments[slugIndex];
        const properBrand = brandCaseMap[firstSlug];
        const isArLocale = locale === 'ar';
        const needsCaseFix = actualBrand !== properBrand && actualBrand.toLowerCase() === firstSlug;

        // Redirect if: brand case is wrong OR /ar/ prefix needs stripping (ar is default locale)
        if (needsCaseFix || isArLocale) {
            const correctedSegments = [...pathSegments];

            // Fix brand casing
            correctedSegments[slugIndex] = properBrand;

            // Strip /ar/ prefix (ar is default locale, should have no prefix)
            if (isArLocale) {
                correctedSegments.splice(0, 1); // Remove 'ar' segment
            }

            const correctedPath = '/' + correctedSegments.join('/');
            const url = request.nextUrl.clone();
            url.pathname = correctedPath;

            return NextResponse.redirect(url, { status: 301 });
        }
    }

    // Continue with internationalization middleware
    return intlMiddleware(request);
}

export const config = {
    // Match internationalized pathnames
    // Exclude /api, /_next, and files with extensions
    matcher: ['/((?!api|_next|.*\\..*).*)', '/(ar|en)/:path*']
};
