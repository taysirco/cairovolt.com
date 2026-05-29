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
 * - ViewportPrefetch: IntersectionObserver-based link prefetcher
 * - RouteIntelligence: Predictive prefetch
 * - UXMetricsEngine: Engagement tracking
 */

const InteractiveEffects = dynamic(() => import('@/components/UX/InteractiveEffects'), { ssr: false });
const ViewportPrefetch = dynamic(() => import('@/components/UX/ViewportPrefetch'), { ssr: false });
const RouteIntelligence = dynamic(() => import('@/components/UX/RouteIntelligence'), { ssr: false });
const UXMetricsEngine = dynamic(() => import('@/components/UX/UXMetricsEngine'), { ssr: false });

export default function LazyUXComponents() {
    return (
        <>
            <InteractiveEffects />
            <ViewportPrefetch />
            <RouteIntelligence />
            <UXMetricsEngine />
        </>
    );
}
