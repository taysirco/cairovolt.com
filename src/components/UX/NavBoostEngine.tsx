'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { initNavBoostSignals } from '@/lib/navboost-signals';

/**
 * NavBoostEngine — Client Component for Google NavBoost Signal Amplification
 * 
 * Renders null (zero DOM impact). All work is done via event listeners
 * and PerformanceObserver APIs.
 * 
 * Must be placed in the root layout to track ALL pages.
 * Automatically restarts tracking on SPA route changes.
 * 
 * Safe for:
 * ✓ All browsers (Chrome, Safari, Firefox, Edge, Samsung Internet)
 * ✓ Mobile data-saver mode (uses requestIdleCallback, no extra network requests)
 * ✓ Ad blockers (graceful degradation via try/catch)
 * ✓ SSR (guarded with typeof window checks)
 * ✓ React Strict Mode (cleanup function prevents double-fire)
 */
export default function NavBoostEngine() {
    const pathname = usePathname();
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        // Cleanup previous page's listeners
        cleanupRef.current?.();

        // Delay init slightly to let the page render first
        const timerId = setTimeout(() => {
            cleanupRef.current = initNavBoostSignals();
        }, 100);

        return () => {
            clearTimeout(timerId);
            cleanupRef.current?.();
            cleanupRef.current = null;
        };
    }, [pathname]); // Re-init on every route change

    return null;
}
