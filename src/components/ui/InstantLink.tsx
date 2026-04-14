'use client';

import { useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { canPrefetch, isPrefetchableUrl, markPrefetched } from '@/lib/prefetch-shared';

type NextLinkProps = React.ComponentProps<typeof Link>;

/**
 * InstantLink — Drop-in Link replacement with hover/touch prefetch
 * 
 * Wraps Next.js <Link> and adds:
 * - onPointerEnter: 80ms debounced router.prefetch() (desktop hover)
 * - onTouchStart: immediate router.prefetch() (mobile touch)
 * - onFocus: router.prefetch() (keyboard navigation / a11y)
 * 
 * Safety guarantees:
 * 1. Passes ALL props through to next/link — including onClick, className, children
 * 2. Never prevents default behavior or stops event propagation
 * 3. Skips prefetch on slow connections (2g/slow-2g/saveData)
 * 4. Skips external links, tel:, mailto:, wa.me, admin, checkout
 * 5. Deduplicates via shared prefetchedUrls Set
 * 6. Produces identical DOM output as next/link
 */
export function InstantLink({ onPointerEnter, onTouchStart, onFocus, href, ...rest }: NextLinkProps) {
    const router = useRouter();
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const doPrefetch = useCallback(() => {
        if (!canPrefetch()) return;

        // Normalize href to string for validation
        const url = typeof href === 'string' ? href : href.pathname || '';
        if (!isPrefetchableUrl(url)) return;

        try {
            markPrefetched(url);
            router.prefetch(url);
        } catch {
            // Graceful degradation
        }
    }, [href, router]);

    // Desktop: prefetch on hover with 80ms debounce
    const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
        // Clear any pending debounce
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(doPrefetch, 80);

        // Call user's original handler if provided
        if (typeof onPointerEnter === 'function') {
            (onPointerEnter as (e: React.PointerEvent<HTMLAnchorElement>) => void)(e);
        }
    }, [doPrefetch, onPointerEnter]);

    // Mobile: prefetch immediately on touch
    const handleTouchStart = useCallback((e: React.TouchEvent<HTMLAnchorElement>) => {
        doPrefetch();

        // Call user's original handler if provided
        if (typeof onTouchStart === 'function') {
            (onTouchStart as (e: React.TouchEvent<HTMLAnchorElement>) => void)(e);
        }
    }, [doPrefetch, onTouchStart]);

    // Keyboard: prefetch on focus (a11y)
    const handleFocus = useCallback((e: React.FocusEvent<HTMLAnchorElement>) => {
        doPrefetch();

        // Call user's original handler if provided
        if (typeof onFocus === 'function') {
            (onFocus as (e: React.FocusEvent<HTMLAnchorElement>) => void)(e);
        }
    }, [doPrefetch, onFocus]);

    return (
        <Link
            href={href}
            onPointerEnter={handlePointerEnter}
            onTouchStart={handleTouchStart}
            onFocus={handleFocus}
            {...rest}
        />
    );
}

export default InstantLink;
