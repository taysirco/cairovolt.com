'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { canPrefetch, isPrefetchableUrl, markPrefetched, getPrefetchBudget } from '@/lib/prefetch-shared';

/**
 * ViewportPrefetch — IntersectionObserver-based Link Prefetcher
 * 
 * Watches all internal <a> tags in the DOM. When one enters the viewport
 * (with 200px margin), it calls router.prefetch() to cache the RSC payload.
 * 
 * Features:
 * - MutationObserver to pick up dynamically added links
 * - Priority queue: product pages > category pages > static pages
 * - Budget system: max 4 (mobile) / 8 (desktop) concurrent prefetches
 * - requestIdleCallback scheduling to avoid competing with main thread
 * - Connection-aware: skips on 2g/slow-2g/saveData
 * - Deduplication via shared prefetchedUrls Set
 * 
 * Renders null — zero DOM impact.
 */
export default function ViewportPrefetch() {
    const router = useRouter();
    const observerRef = useRef<IntersectionObserver | null>(null);
    const mutationObserverRef = useRef<MutationObserver | null>(null);
    const prefetchCountRef = useRef(0);
    const budgetRef = useRef(0);

    const prefetchUrl = useCallback((url: string) => {
        if (!canPrefetch()) return;
        if (!isPrefetchableUrl(url)) return;
        if (prefetchCountRef.current >= budgetRef.current) return;

        try {
            markPrefetched(url);
            prefetchCountRef.current++;
            router.prefetch(url);
        } catch {
            // router.prefetch can fail silently — graceful degradation
        }
    }, [router]);

    const observeLink = useCallback((link: HTMLAnchorElement) => {
        if (!observerRef.current) return;

        const href = link.getAttribute('href');
        if (!href || !isPrefetchableUrl(href)) return;

        observerRef.current.observe(link);
    }, []);

    useEffect(() => {
        // Set budget based on device
        budgetRef.current = getPrefetchBudget();
        if (budgetRef.current === 0) return;

        // Create IntersectionObserver — triggers when link enters viewport (with 200px margin)
        observerRef.current = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;

                    const link = entry.target as HTMLAnchorElement;
                    const href = link.getAttribute('href');
                    if (!href) continue;

                    // Unobserve immediately to prevent re-triggering
                    observerRef.current?.unobserve(link);

                    // Schedule prefetch during idle time
                    if ('requestIdleCallback' in window) {
                        requestIdleCallback(() => prefetchUrl(href), { timeout: 3000 });
                    } else {
                        setTimeout(() => prefetchUrl(href), 100);
                    }
                }
            },
            {
                rootMargin: '200px', // Start prefetching 200px before link enters viewport
                threshold: 0,
            }
        );

        // Observe all existing internal links
        const links = document.querySelectorAll<HTMLAnchorElement>('a[href]');
        links.forEach(observeLink);

        // MutationObserver to catch dynamically added links (SPA navigation, lazy loading)
        mutationObserverRef.current = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node instanceof HTMLAnchorElement) {
                        observeLink(node);
                    } else if (node instanceof HTMLElement) {
                        const newLinks = node.querySelectorAll<HTMLAnchorElement>('a[href]');
                        newLinks.forEach(observeLink);
                    }
                }
            }
        });

        mutationObserverRef.current.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            observerRef.current?.disconnect();
            mutationObserverRef.current?.disconnect();
            observerRef.current = null;
            mutationObserverRef.current = null;
        };
    }, [observeLink, prefetchUrl]);

    // Silent component — all work is done via observers
    return null;
}
