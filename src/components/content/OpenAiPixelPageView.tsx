'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { applyStoredConsent, oaiPageViewed } from '@/lib/openai-ads/pixel';

/**
 * OpenAiPixelPageView — SPA `page_viewed` tracker for the ChatGPT Ads pixel.
 *
 * The pixel stub + init live in the static <head> (layout.tsx). This component
 * only reports route changes. The wrapper remembers the last reported path, so
 * React Strict Mode's double effect and the hydration re-render produce one
 * event for the landing page while every real navigation still reports.
 */
export function OpenAiPixelPageView() {
    const pathname = usePathname();

    useEffect(() => {
        applyStoredConsent();
    }, []);

    useEffect(() => {
        if (pathname) oaiPageViewed(pathname);
    }, [pathname]);

    return null;
}
