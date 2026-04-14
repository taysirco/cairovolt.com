/**
 * Prefetch Shared Utilities
 * 
 * Shared state and helper functions used by all prefetch layers
 * (ViewportPrefetch, RouteIntelligence, InstantLink) to prevent
 * duplicate prefetch requests and respect user's connection quality.
 */

// Shared prefetched URLs set — prevents duplicate prefetches across all layers
export const prefetchedUrls = new Set<string>();

/**
 * Connection-aware prefetch gate.
 * Returns false if the user's device/connection cannot afford prefetching.
 */
export function canPrefetch(): boolean {
    if (typeof navigator === 'undefined') return false;
    if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return false;

    const conn = (navigator as any).connection;
    if (!conn) return true; // No Network Information API = assume good connection

    // Respect user's data-saver preference
    if (conn.saveData) return false;

    // Skip on very slow connections (common on Egyptian 2G areas)
    const ect = conn.effectiveType;
    if (ect === '2g' || ect === 'slow-2g') return false;

    // Low memory device — prefetching may cause memory pressure
    if ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 2) return false;

    return true;
}

/**
 * Check if a URL should be prefetched.
 * Filters out external links, special protocols, admin/checkout routes, and already-prefetched URLs.
 */
export function isPrefetchableUrl(url: string): boolean {
    if (!url) return false;

    // Skip special protocols and anchors
    if (url.startsWith('#') || url.startsWith('tel:') || url.startsWith('mailto:') || url.startsWith('javascript:')) return false;

    // Skip WhatsApp links
    if (url.includes('wa.me') || url.includes('whatsapp.com')) return false;

    // Skip transactional/internal routes
    if (url.includes('/admin') || url.includes('/checkout') || url.includes('/confirm')) return false;
    if (url.includes('/api/') || url.includes('/verify')) return false;

    // Skip already prefetched URLs
    if (prefetchedUrls.has(url)) return false;

    // Only prefetch same-origin URLs
    try {
        const parsed = new URL(url, window.location.origin);
        return parsed.origin === window.location.origin;
    } catch {
        return false;
    }
}

/**
 * Mark a URL as prefetched to prevent duplicate prefetches across all layers.
 */
export function markPrefetched(url: string): void {
    prefetchedUrls.add(url);
}

/**
 * Get the prefetch budget based on device type.
 * Mobile gets fewer concurrent prefetches to save bandwidth.
 */
export function getPrefetchBudget(): number {
    if (typeof window === 'undefined') return 0;

    // Use viewport width as a proxy for device type
    const isMobile = window.innerWidth < 768;
    return isMobile ? 4 : 8;
}
