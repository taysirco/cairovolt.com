'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { resetTracking } from '@/lib/analytics';

/**
 * Lightweight, user-initiated interface feedback.
 *
 * This layer is limited to click feedback, scroll-progress state, and cart-button
 * press feedback. It never interrupts navigation or reacts to page visibility.
 */
export default function InteractiveEffects() {
    const scrollMilestonesRef = useRef<Set<number>>(new Set());
    const rafIdRef = useRef<number>(0);
    const pathname = usePathname();

    useEffect(() => {
        resetTracking();
        scrollMilestonesRef.current.clear();
    }, [pathname]);

    const handleGlobalClick = useCallback((event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const interactive = target?.closest('a, button, [role="button"], [data-interactive]');
        if (!interactive || interactive.classList.contains('cv-no-ripple')) return;

        const element = interactive as HTMLElement;
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const maxDimension = Math.max(rect.width, rect.height);
        const ripple = document.createElement('span');
        const originalPosition = element.style.position;
        const originalOverflow = element.style.overflow;

        ripple.className = 'cv-ripple';
        ripple.style.cssText = `
            position: absolute;
            left: ${x - maxDimension}px;
            top: ${y - maxDimension}px;
            width: ${maxDimension * 2}px;
            height: ${maxDimension * 2}px;
            border-radius: 50%;
            background: currentColor;
            opacity: 0.12;
            transform: scale(0);
            pointer-events: none;
            animation: cv-ripple-expand 400ms ease-out forwards;
        `;

        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        ripple.addEventListener('animationend', () => {
            ripple.remove();
            if (originalPosition) element.style.position = originalPosition;
            else element.style.removeProperty('position');
            if (originalOverflow) element.style.overflow = originalOverflow;
            else element.style.removeProperty('overflow');
        }, { once: true });
    }, []);

    const handleScroll = useCallback(() => {
        if (rafIdRef.current) return;

        rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = 0;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (documentHeight <= 0) return;

            const progress = Math.round((window.scrollY / documentHeight) * 100);
            for (const milestone of [25, 50, 75, 100]) {
                if (progress < milestone || scrollMilestonesRef.current.has(milestone)) continue;

                scrollMilestonesRef.current.add(milestone);
                document.documentElement.setAttribute('data-scroll-depth', milestone.toString());

                if (milestone >= 75) {
                    document.querySelector('[data-scroll-reveal]')?.classList.add('cv-revealed');
                }
            }
        });
    }, []);

    const handlePointerDown = useCallback((event: PointerEvent) => {
        const target = event.target as HTMLElement;
        const cartButton = target?.closest('[data-add-to-cart], [data-cart-action]');
        if (!cartButton) return;

        cartButton.classList.add('cv-pressing');
        const cleanup = () => {
            cartButton.classList.remove('cv-pressing');
            window.removeEventListener('pointerup', cleanup);
            window.removeEventListener('pointercancel', cleanup);
        };

        window.addEventListener('pointerup', cleanup, { once: true });
        window.addEventListener('pointercancel', cleanup, { once: true });
    }, []);

    useEffect(() => {
        if (!document.getElementById('cv-fx-styles')) {
            const style = document.createElement('style');
            style.id = 'cv-fx-styles';
            style.textContent = `
                @keyframes cv-ripple-expand {
                    to { transform: scale(1); opacity: 0; }
                }
                .cv-pressing {
                    transform: scale(0.97) !important;
                    transition: transform 0.1s ease !important;
                }
                .cv-revealed {
                    animation: cv-reveal 0.6s ease-out forwards;
                }
                @keyframes cv-reveal {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }

        document.addEventListener('click', handleGlobalClick, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('pointerdown', handlePointerDown as EventListener, { passive: true });

        return () => {
            document.removeEventListener('click', handleGlobalClick);
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('pointerdown', handlePointerDown as EventListener);
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        };
    }, [handleGlobalClick, handlePointerDown, handleScroll]);

    return null;
}
