'use client';

import dynamic from 'next/dynamic';

/**
 * LazyUXComponents — Wrapper for non-visual UX enhancement components.
 *
 * These components only attach event listeners and return null (no visible UI).
 * By wrapping them in a client component with `ssr: false` dynamic imports,
 * their JS is deferred until after hydration — reducing TBT by ~100-150ms.
 *
 * Components deferred:
 * - InteractiveEffects: Ripple effects, scroll tracking, promo overlay, idle detection
 * - UXMetricsEngine: Engagement tracking
 *
 * NOTE: ViewportPrefetch and RouteIntelligence were removed — stacked on Next's
 * default Link prefetch + the speculation-rules block, they prefetched dozens of
 * routes on page load, saturating the connection for ~4.5s and tanking simulated
 * LCP/TBT. Navigation stays instant via InstantLink (hover/touch prefetch) +
 * speculation-rules prerender (moderate) — both intent-based, zero load cost.
 */

const InteractiveEffects = dynamic(() => import('@/components/UX/InteractiveEffects'), { ssr: false });
const UXMetricsEngine = dynamic(() => import('@/components/UX/UXMetricsEngine'), { ssr: false });

export default function LazyUXComponents() {
    return (
        <>
            <InteractiveEffects />
            <UXMetricsEngine />
        </>
    );
}
