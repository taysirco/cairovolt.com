import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['ar', 'en'],

    // Arabic is the default locale
    defaultLocale: 'ar',

    // 'as-needed' means: no prefix for default locale (ar), prefix for others (/en)
    localePrefix: 'as-needed',

    // Disable locale detection from browser Accept-Language header
    // This ensures Arabic is ALWAYS shown at root, not based on browser language
    localeDetection: false,

    // Disable the NEXT_LOCALE cookie. With localeDetection:false the locale is
    // resolved purely from the URL prefix, so the cookie was never read for
    // routing — it only forced a per-request Set-Cookie that made every page
    // response uncacheable at the CDN (no edge cache → ~460ms TTFB). Dropping it
    // lets Cloudflare cache the HTML. Verified: NEXT_LOCALE is read nowhere in src/.
    localeCookie: false
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
