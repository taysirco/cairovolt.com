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
    const { pathname } = request.nextUrl;

    // Skip API routes, static files, etc.
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        /\.[a-zA-Z][a-zA-Z0-9]{1,5}$/.test(pathname)
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

    // 1. Strict Lowercase Enforcement (SEO Requirement)
    if (pathname !== pathname.toLowerCase()) {
        const url = request.nextUrl.clone();
        url.pathname = pathname.toLowerCase();
        return NextResponse.redirect(url, { status: 301 });
    }

    // 2. Pass through to next-intl middleware for locale handling
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
