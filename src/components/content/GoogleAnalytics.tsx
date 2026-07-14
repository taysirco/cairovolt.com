'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * GoogleAnalytics — SPA page_view tracker
 *
 * The gtag.js script and initial config are loaded in the static <head>
 * (layout.tsx) so they appear in server-rendered HTML for Google's tag checker.
 *
 * This component handles SPA navigations: fires page_view on each route change
 * so GA4 and Google Ads track every page correctly in the Next.js router.
 */
export function GoogleAnalytics() {
    const pathname = usePathname();

    useEffect(() => {
        // SPA navigation tracking — gtag already initialized in <head>
        if (typeof (window as any).gtag !== 'function') return;
        (window as any).gtag('event', 'page_view', {
            page_path: pathname,
            send_to: ['G-ZH7YYZRWSE', 'AW-18109404098'],
        });
    }, [pathname]);

    return null;
}
