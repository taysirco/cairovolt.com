'use client';

import { useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { initCopyTracking, initFaqTracking, trackScrollDepth, trackOverlayAction, trackWhatsappClick, resetTracking } from '@/lib/analytics';

/**
 * InteractiveEffects — UX Micro-Interaction Layer
 *
 * Enhances user experience through responsive micro-interactions:
 *
 * 1. Instant Click Feedback
 *    - Ripple effect on interactive elements
 *    - Visual response within 16ms
 *
 * 2. Scroll Progress
 *    - Tracks milestones and reveals additional content
 *
 * 3. Promotional Overlay
 *    - Shows WhatsApp CTA for visitor engagement
 *
 * 4. Optimistic Interaction States
 *    - Add-to-cart buttons show instant visual state change on pointerdown
 */
export default function InteractiveEffects() {
    const scrollMilestonesRef = useRef<Set<number>>(new Set());
    const promoShownRef = useRef(false);
    const rafIdRef = useRef<number>(0);
    const pathname = usePathname();

    // Reset state on route change
    useEffect(() => {
        resetTracking();
        scrollMilestonesRef.current.clear();
        promoShownRef.current = false;
    }, [pathname]);

    // ─── 1. Instant Click Ripple ───
    const handleGlobalClick = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target) return;

        // Find the clickable parent (button, link, or interactive element)
        const interactive = target.closest('a, button, [role="button"], [data-interactive]');
        if (!interactive) return;
        if (interactive.classList.contains('cv-no-ripple')) return;

        const el = interactive as HTMLElement;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const maxDim = Math.max(rect.width, rect.height);

        // Create ripple — instant visual feedback
        const ripple = document.createElement('span');
        ripple.className = 'cv-ripple';
        ripple.style.cssText = `
            position: absolute;
            left: ${x - maxDim}px;
            top: ${y - maxDim}px;
            width: ${maxDim * 2}px;
            height: ${maxDim * 2}px;
            border-radius: 50%;
            background: currentColor;
            opacity: 0.12;
            transform: scale(0);
            pointer-events: none;
            animation: cv-ripple-expand 400ms ease-out forwards;
        `;

        // Ensure parent has relative positioning for the ripple
        const originalPosition = el.style.position;
        const originalOverflow = el.style.overflow;
        if (getComputedStyle(el).position === 'static') {
            el.style.position = 'relative';
        }
        el.style.overflow = 'hidden';

        el.appendChild(ripple);

        // Cleanup
        ripple.addEventListener('animationend', () => {
            ripple.remove();
            if (!originalPosition) el.style.removeProperty('position');
            else el.style.position = originalPosition;
            if (!originalOverflow) el.style.removeProperty('overflow');
            else el.style.overflow = originalOverflow;
        }, { once: true });
    }, []);

    // ─── 2. Scroll Progress ───
    const handleScroll = useCallback(() => {
        // Throttle with rAF (1 check per frame, not per scroll event)
        if (rafIdRef.current) return;

        rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = 0;

            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;

            const progress = Math.round((scrollTop / docHeight) * 100);
            const milestones = [25, 50, 75, 100];

            for (const ms of milestones) {
                if (progress >= ms && !scrollMilestonesRef.current.has(ms)) {
                    scrollMilestonesRef.current.add(ms);

                    // Set data attribute for CSS-driven reveals
                    document.documentElement.setAttribute('data-scroll-depth', ms.toString());

                    // Classify page type for analytics
                    const pageType = window.location.pathname.includes('/checkout') ? 'checkout'
                        : window.location.pathname.includes('/confirm') ? 'confirm'
                        : window.location.pathname.includes('/contact') ? 'contact'
                        : window.location.pathname.includes('/blog') ? 'blog'
                        : 'product';
                    trackScrollDepth(ms, pageType);

                    // At 75%+ depth: reveal additional content (if exists)
                    if (ms >= 75) {
                        const revealSection = document.querySelector('[data-scroll-reveal]');
                        if (revealSection) {
                            revealSection.classList.add('cv-revealed');
                        }
                    }
                }
            }
        });
    }, []);

    // ─── 3. Promotional Overlay (Show WhatsApp CTA) ───
    const showPromoOverlay = useCallback(() => {
        if (promoShownRef.current) return;
        promoShownRef.current = true;

        // Persist across page navigations within same session
        try { sessionStorage.setItem('cv-promo-shown', '1'); } catch { /* noop */ }

        trackOverlayAction('shown');

        // Prevent duplicate DOM nodes
        const existingCta = document.getElementById('cv-promo-cta');
        if (existingCta) return;

        const isArabic = document.documentElement.dir === 'rtl' ||
            document.documentElement.lang?.startsWith('ar');

        const cta = document.createElement('div');
        cta.id = 'cv-promo-cta';
        cta.setAttribute('role', 'complementary');
        cta.setAttribute('aria-label', isArabic ? 'عرض خاص' : 'Special offer');
        cta.innerHTML = `
            <div class="cv-promo-inner">
                <button class="cv-promo-close" aria-label="${isArabic ? 'إغلاق' : 'Close'}">&times;</button>
                <p class="cv-promo-text">
                    ${isArabic
                ? '🔋 لسه بتدور؟ كلّمنا على واتساب — هنساعدك تختار الأنسب!'
                : '🔋 Still browsing? Chat with us on WhatsApp — we\'ll help you choose!'}
                </p>
                <a href="https://wa.me/201558245974"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="cv-promo-btn">
                    ${isArabic ? '💬 واتساب' : '💬 WhatsApp'}
                </a>
            </div>
        `;

        document.body.appendChild(cta);

        // Animate in
        requestAnimationFrame(() => {
            cta.classList.add('cv-promo-visible');
        });

        // Close handler
        const closeBtn = cta.querySelector('.cv-promo-close');
        closeBtn?.addEventListener('click', () => {
            trackOverlayAction('dismissed');
            cta.classList.remove('cv-promo-visible');
            setTimeout(() => cta.remove(), 300);
        }, { once: true });

        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            if (cta.parentNode) {
                cta.classList.remove('cv-promo-visible');
                setTimeout(() => cta.remove(), 300);
            }
        }, 10000);
    }, []);

    // ─── 3a. Desktop exit intent: mouse leaves viewport top ───
    const handleDesktopExitIntent = useCallback((e: MouseEvent) => {
        if (e.clientY > 5) return;
        showPromoOverlay();
    }, [showPromoOverlay]);

    // ─── 4. Optimistic Add-to-Cart Feedback ───
    const handlePointerDown = useCallback((e: PointerEvent) => {
        const target = e.target as HTMLElement;
        const cartBtn = target.closest('[data-add-to-cart], [data-cart-action]');
        if (!cartBtn) return;

        // Instant visual feedback on pointerdown (before click fires)
        cartBtn.classList.add('cv-pressing');

        const cleanup = () => {
            cartBtn.classList.remove('cv-pressing');
            window.removeEventListener('pointerup', cleanup);
            window.removeEventListener('pointercancel', cleanup);
        };

        window.addEventListener('pointerup', cleanup, { once: true });
        window.addEventListener('pointercancel', cleanup, { once: true });
    }, []);

    // ─── Mount all listeners ───
    useEffect(() => {
        // Check if already shown this session (survives SPA navigations)
        try {
            if (sessionStorage.getItem('cv-promo-shown') === '1') {
                promoShownRef.current = true;
            }
        } catch { /* sessionStorage unavailable */ }

        // Inject ripple animation keyframes (once)
        if (!document.getElementById('cv-fx-styles')) {
            const style = document.createElement('style');
            style.id = 'cv-fx-styles';
            style.textContent = `
                @keyframes cv-ripple-expand {
                    to {
                        transform: scale(1);
                        opacity: 0;
                    }
                }

                /* WhatsApp promo banner — mobile-first positioning */
                #cv-promo-cta {
                    position: fixed;
                    bottom: 16px;
                    left: 16px;
                    right: 16px;
                    z-index: 9990;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.3s ease, transform 0.3s ease;
                    pointer-events: none;
                }
                @media (min-width: 640px) {
                    #cv-promo-cta {
                        left: auto;
                        right: auto;
                        inset-inline-start: 24px;
                        bottom: 24px;
                        max-width: 360px;
                    }
                }
                #cv-promo-cta.cv-promo-visible {
                    opacity: 1;
                    transform: translateY(0);
                    pointer-events: auto;
                }
                .cv-promo-inner {
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    color: white;
                    padding: 20px 24px;
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                    position: relative;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .cv-promo-close {
                    position: absolute;
                    top: 8px;
                    inset-inline-end: 12px;
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.5);
                    font-size: 24px;
                    cursor: pointer;
                    padding: 4px 8px;
                    line-height: 1;
                    -webkit-tap-highlight-color: transparent;
                    touch-action: manipulation;
                    min-width: 44px;
                    min-height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .cv-promo-close:hover { color: white; }
                .cv-promo-text {
                    margin: 0 0 12px;
                    font-size: 14px;
                    line-height: 1.6;
                    padding-inline-end: 24px;
                }
                .cv-promo-btn {
                    display: inline-block;
                    background: #25d366;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 10px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 15px;
                    transition: background 0.2s;
                    -webkit-tap-highlight-color: transparent;
                    touch-action: manipulation;
                    min-height: 44px;
                }
                .cv-promo-btn:hover { background: #1ebb57; }
                .cv-promo-btn:active { background: #19a84d; }

                /* Optimistic cart press */
                .cv-pressing {
                    transform: scale(0.97) !important;
                    transition: transform 0.1s ease !important;
                }

                /* Scroll reveal animation */
                .cv-revealed {
                    animation: cv-reveal 0.6s ease-out forwards;
                }
                @keyframes cv-reveal {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }

        // ─── Core listeners ───
        document.addEventListener('click', handleGlobalClick, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('mouseout', handleDesktopExitIntent as EventListener, { passive: true });
        document.addEventListener('pointerdown', handlePointerDown as EventListener, { passive: true });

        // Copy and section-expand analytics
        const removeCopyListener = initCopyTracking();
        const removeFaqListener = initFaqTracking();

        // Promo overlay click tracking
        const handleWhatsappCta = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.closest?.('.cv-promo-btn')) {
                trackOverlayAction('clicked');
                trackWhatsappClick('promo');
            }
        };
        document.addEventListener('click', handleWhatsappCta, { passive: true });

        // ─── Mobile Exit-Intent: visibilitychange ───
        // When the user switches tabs, presses back, swipe-back on iOS,
        // or switches apps — show the overlay WHEN they return.
        let wasHidden = false;
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                wasHidden = true;
                // Track that user attempted to leave
                if (!promoShownRef.current) {
                    trackOverlayAction('exit_attempt_mobile');
                }
            } else if (document.visibilityState === 'visible' && wasHidden) {
                wasHidden = false;
                // User has RETURNED — show promo to re-engage them
                // Small delay so the page is fully visible first
                setTimeout(() => {
                    showPromoOverlay();
                }, 500);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // ─── Mobile Exit-Intent: Rapid scroll-up detection ───
        // On mobile, a fast upward scroll usually means the user is reaching
        // for the address bar or back button. Detect this gesture.
        let lastScrollY = window.scrollY;
        let lastScrollTime = Date.now();
        let mobileScrollCheckRAF = 0;

        const handleMobileScrollExit = () => {
            if (mobileScrollCheckRAF) return;
            mobileScrollCheckRAF = requestAnimationFrame(() => {
                mobileScrollCheckRAF = 0;
                const currentY = window.scrollY;
                const currentTime = Date.now();
                const deltaY = lastScrollY - currentY; // positive = scrolling UP
                const deltaTime = currentTime - lastScrollTime;

                // Detect rapid upward scroll: >300px up in <300ms
                // and user is near top of page (within first 25%)
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = docHeight > 0 ? (currentY / docHeight) * 100 : 0;

                if (deltaY > 300 && deltaTime < 300 && scrollPercent < 25) {
                    showPromoOverlay();
                }

                lastScrollY = currentY;
                lastScrollTime = currentTime;
            });
        };

        // Only attach mobile scroll detection on touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            window.addEventListener('scroll', handleMobileScrollExit, { passive: true });
        }

        // ─── Mobile Exit-Intent: Idle timeout ───
        // After 45 seconds of no interaction on a product page,
        // gently show the overlay (user is stuck/undecided)
        let idleTimer: ReturnType<typeof setTimeout> | null = null;
        const IDLE_TIMEOUT = 45000; // 45 seconds
        const isProductPage = window.location.pathname.split('/').length >= 4;

        const resetIdleTimer = () => {
            if (idleTimer) clearTimeout(idleTimer);
            if (promoShownRef.current || !isProductPage) return;
            idleTimer = setTimeout(() => {
                showPromoOverlay();
            }, IDLE_TIMEOUT);
        };

        if (isProductPage && !promoShownRef.current) {
            resetIdleTimer();
            // Reset on any interaction
            const idleEvents = ['touchstart', 'scroll', 'click', 'keydown'] as const;
            idleEvents.forEach(evt => {
                window.addEventListener(evt, resetIdleTimer, { passive: true });
            });
        }

        // ─── Cleanup ───
        return () => {
            document.removeEventListener('click', handleGlobalClick);
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mouseout', handleDesktopExitIntent as EventListener);
            document.removeEventListener('pointerdown', handlePointerDown as EventListener);
            document.removeEventListener('click', handleWhatsappCta);
            document.removeEventListener('visibilitychange', handleVisibilityChange);

            if (isTouchDevice) {
                window.removeEventListener('scroll', handleMobileScrollExit);
            }

            if (idleTimer) clearTimeout(idleTimer);
            if (isProductPage) {
                const idleEvents = ['touchstart', 'scroll', 'click', 'keydown'] as const;
                idleEvents.forEach(evt => {
                    window.removeEventListener(evt, resetIdleTimer);
                });
            }

            removeCopyListener?.();
            removeFaqListener?.();

            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
            if (mobileScrollCheckRAF) {
                cancelAnimationFrame(mobileScrollCheckRAF);
            }
        };
    }, [handleGlobalClick, handleScroll, handleDesktopExitIntent, handlePointerDown, showPromoOverlay]);

    // Silent component — all work is done via event listeners
    return null;
}
