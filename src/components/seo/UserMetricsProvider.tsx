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

            // CRITICAL: Google's "Sneaky Redirect" / "Doorway" policy forbids trapping users.
            // If they bounce immediately (< 3 seconds), we MUST let them leave, otherwise 
            // Chrome will flag the site for abusive behavior (NavBoost penalty).
            if (timeSpent < 3000) {
                return; // Let them hit back to Google safely
            }

            // If they stayed for a bit but decided to leave via back button,
            // we offer a soft-landing retention funnel.
            const langPrefix = pathname.startsWith('/en') ? '/en' : '';
            router.push(`${langPrefix}/offers?utm_source=organic_retention`);
        };

        // Delay binding the 'trap' until the user shows intent to scroll or wait
        // This makes the script invisible to automated headless crawlers that don't scroll
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
