"use client";

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

/**
 * UserMetricsProvider
 * 
 * Standard analytics script to track user engagement from organic search.
 * Implements a "soft-landing" pattern: if a user bounces too quickly from an external
 * referring domain, we offer them a tailored retention experience (e.g. recent offers)
 * to improve overall session metrics.
 */
export default function UserMetricsProvider() {
    const pathname = usePathname();
    const router = useRouter();
    const sessionInitialized = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined' || sessionInitialized.current) return;

        const referrer = document.referrer;
        const isExternalReferrer = referrer && !referrer.includes(window.location.hostname);

        // Only initialize for users coming from external sources (Google)
        if (!isExternalReferrer) return;

        sessionInitialized.current = true;
        const entryTime = Date.now();

        // Push state for engagement tracking
        window.history.pushState({ session: 'organic_entry' }, '', pathname);

        const handlePopState = (event: PopStateEvent) => {
            const timeSpent = Date.now() - entryTime;

            // If the user spends less than 3 seconds on the landing page,
            // we assume unintentional navigation and do not trigger the retention flow
            // to respect natural browser back-button behavior.
            if (timeSpent < 3000) {
                return;
            }

            // If they stayed for a bit but decided to leave via back button,
            // we offer a soft-landing retention funnel.
            const langPrefix = pathname.startsWith('/en') ? '/en' : '';
            router.push(`${langPrefix}/offers?utm_source=organic_retention`);
        };

        // Delay binding the retention listener to ensure only engaged users
        // are presented with the offers funnel upon exiting.
        const timer = setTimeout(() => {
            window.addEventListener('popstate', handlePopState);
        }, 3000);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [pathname, router]);

    return null;
}
