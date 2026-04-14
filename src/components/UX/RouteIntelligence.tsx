'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { canPrefetch, isPrefetchableUrl, markPrefetched } from '@/lib/prefetch-shared';

/**
 * RouteIntelligence — Predictive Page Prefetch
 * 
 * Analyzes the user's current page and prefetches the pages they're most
 * likely to navigate to next. Uses router.prefetch() via requestIdleCallback
 * to avoid any impact on page performance.
 * 
 * Prefetch map:
 *   Homepage     → /anker/power-banks, /joyroom/audio, /blog
 *   Brand page   → Top 3 categories for that brand
 *   Product page → /checkout (high purchase intent)
 *   Other pages  → No prediction
 * 
 * Renders null — zero DOM impact.
 */

// Brand → most popular categories mapping
const BRAND_CATEGORIES: Record<string, string[]> = {
    anker: ['power-banks', 'wall-chargers', 'cables'],
    joyroom: ['audio', 'power-banks', 'cables'],
};

function getPageType(pathname: string): { type: string; locale: string; brand?: string } {
    // Remove leading slash and split
    const segments = pathname.replace(/^\//, '').split('/');

    // Determine locale
    let locale = 'ar';
    let startIdx = 0;
    if (segments[0] === 'en') {
        locale = 'en';
        startIdx = 1;
    }

    const rest = segments.slice(startIdx);

    if (rest.length === 0 || (rest.length === 1 && rest[0] === '')) {
        return { type: 'home', locale };
    }
    if (rest.length === 1) {
        // Could be a brand page (/anker) or static page (/blog)
        const slug = rest[0];
        if (BRAND_CATEGORIES[slug]) {
            return { type: 'brand', locale, brand: slug };
        }
        return { type: 'static', locale };
    }
    if (rest.length === 3) {
        // Product page: /brand/category/slug
        return { type: 'product', locale };
    }
    // Category page or other
    return { type: 'other', locale };
}

function getPredictedUrls(pathname: string): string[] {
    const { type, locale, brand } = getPageType(pathname);
    const prefix = locale === 'ar' ? '' : '/en';

    switch (type) {
        case 'home':
            return [
                `${prefix}/anker/power-banks`,
                `${prefix}/joyroom/audio`,
                `${prefix}/blog`,
            ];

        case 'brand':
            if (brand && BRAND_CATEGORIES[brand]) {
                return BRAND_CATEGORIES[brand].slice(0, 3).map(
                    cat => `${prefix}/${brand}/${cat}`
                );
            }
            return [];

        case 'product':
            // User on product page → likely to checkout
            return [`${prefix}/checkout`];

        default:
            return [];
    }
}

export default function RouteIntelligence() {
    const pathname = usePathname();
    const router = useRouter();
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        // Clear any pending timer from previous navigation
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Wait 2500ms after mount to ensure current page is fully rendered
        timerRef.current = setTimeout(() => {
            if (!canPrefetch()) return;

            const urls = getPredictedUrls(pathname);
            if (urls.length === 0) return;

            // Schedule each prefetch during idle time
            const schedulePrefetch = (url: string) => {
                if (!isPrefetchableUrl(url)) return;

                const doPrefetch = () => {
                    try {
                        markPrefetched(url);
                        router.prefetch(url);
                    } catch {
                        // Graceful degradation
                    }
                };

                if ('requestIdleCallback' in window) {
                    requestIdleCallback(doPrefetch, { timeout: 5000 });
                } else {
                    setTimeout(doPrefetch, 200);
                }
            };

            urls.forEach(schedulePrefetch);
        }, 2500);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [pathname, router]);

    // Silent component — all work is done in effects
    return null;
}
