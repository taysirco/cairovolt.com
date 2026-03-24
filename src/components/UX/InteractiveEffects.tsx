'use client';

import { useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { attachCopyListener, attachFaqToggleListener, trackScrollDepth, trackExitIntent, trackWhatsappClick, resetTracking } from '@/lib/analytics';

/**
 * InteractiveEffects — UX Micro-Interaction Layer
 *
 * Enhances user experience through responsive micro-interactions:
 *
 * 1. Instant Click Feedback
 *    - Ripple effect on interactive elements
 *    - Visual response within 16ms
 *
 * 2. Scroll Progress Tracking
 *    - Tracks 25/50/75/100% milestones
 *    - At 75%: reveals additional content sections
 *
 * 3. Page Leave Overlay
 *    - Detects mouse leaving viewport (desktop)
 *    - Shows WhatsApp CTA to reduce abandonment
 *
 * 4. Optimistic Interaction States
 *    - Add-to-cart buttons show instant visual state change on pointerdown
 *
 * NOTE: All interactions are genuine visual responses to real user actions.
 */
export default function InteractiveEffects() {
    const scrollMilestonesRef = useRef<Set<number>>(new Set());
    const pageLeaveShownRef = useRef(false);
    const rafIdRef = useRef<number>(0);
    const pathname = usePathname();

    // Reset tracking state on route change
    useEffect(() => {
        resetTracking();
        scrollMilestonesRef.current.clear();
        pageLeaveShownRef.current = false;
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

    // ─── 2. Scroll Progress Tracking ───
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

                    // ── GA4 Signal: scroll_engagement at each milestone ──
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

    // ─── 3. Page Leave Overlay ───
    const handlePageLeave = useCallback((e: MouseEvent) => {
        // Only trigger when mouse moves above the viewport
        if (e.clientY > 5) return;
        if (pageLeaveShownRef.current) return;
        pageLeaveShownRef.current = true;

        // Track exit overlay shown
        trackExitIntent('shown');

        // Show WhatsApp helper banner
        const existingCta = document.getElementById('cv-exit-cta');
        if (existingCta) return;

        const isArabic = document.documentElement.dir === 'rtl' ||
            document.documentElement.lang?.startsWith('ar');

        const cta = document.createElement('div');
        cta.id = 'cv-exit-cta';
        cta.setAttribute('role', 'complementary');
        cta.setAttribute('aria-label', isArabic ? 'عرض خاص' : 'Special offer');
        cta.innerHTML = `
            <div class="cv-exit-inner">
                <button class="cv-exit-close" aria-label="${isArabic ? 'إغلاق' : 'Close'}">&times;</button>
                <p class="cv-exit-text">
                    ${isArabic
                ? '🔋 لسه بتدور؟ كلّمنا على واتساب — هنساعدك تختار الأنسب!'
                : '🔋 Still browsing? Chat with us on WhatsApp — we\'ll help you choose!'}
                </p>
                <a href="https://wa.me/201558245974"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="cv-exit-btn">
                    ${isArabic ? '💬 واتساب' : '💬 WhatsApp'}
                </a>
            </div>
        `;

        document.body.appendChild(cta);

        // Animate in
        requestAnimationFrame(() => {
            cta.classList.add('cv-exit-visible');
        });

        // Close handler
        const closeBtn = cta.querySelector('.cv-exit-close');
        closeBtn?.addEventListener('click', () => {
            trackExitIntent('dismissed');
            cta.classList.remove('cv-exit-visible');
            setTimeout(() => cta.remove(), 300);
        }, { once: true });

        // Auto-dismiss after 8 seconds
        setTimeout(() => {
            if (cta.parentNode) {
                cta.classList.remove('cv-exit-visible');
                setTimeout(() => cta.remove(), 300);
            }
        }, 8000);
    }, []);

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

                /* WhatsApp CTA — uses CSS logical properties for RTL safety */
                #cv-exit-cta {
                    position: fixed;
                    bottom: 24px;
                    inset-inline-start: 24px;
                    z-index: 9990;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.3s ease, transform 0.3s ease;
                    pointer-events: none;
                }
                #cv-exit-cta.cv-exit-visible {
                    opacity: 1;
                    transform: translateY(0);
                    pointer-events: auto;
                }
                .cv-exit-inner {
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    color: white;
                    padding: 20px 24px;
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                    max-width: 320px;
                    position: relative;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .cv-exit-close {
                    position: absolute;
                    top: 8px;
                    inset-inline-end: 12px;
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.5);
                    font-size: 20px;
                    cursor: pointer;
                    padding: 4px 8px;
                    line-height: 1;
                }
                .cv-exit-close:hover { color: white; }
                .cv-exit-text {
                    margin: 0 0 12px;
                    font-size: 14px;
                    line-height: 1.6;
                }
                .cv-exit-btn {
                    display: inline-block;
                    background: #25d366;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 10px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 14px;
                    transition: background 0.2s;
                }
                .cv-exit-btn:hover { background: #1ebb57; }

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

        // Attach all listeners
        document.addEventListener('click', handleGlobalClick, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('mouseout', handlePageLeave as EventListener, { passive: true });
        document.addEventListener('pointerdown', handlePointerDown as EventListener, { passive: true });

        // Clipboard and FAQ analytics
        const removeCopyListener = attachCopyListener();
        const removeFaqListener = attachFaqToggleListener();

        // Exit-intent CTA click tracking
        const handleWhatsappCta = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.closest?.('.cv-exit-btn')) {
                trackExitIntent('clicked');
                trackWhatsappClick('exit_intent');
            }
        };
        document.addEventListener('click', handleWhatsappCta, { passive: true });

        // Mobile exit-intent: fires when user switches apps/tabs
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden' && !pageLeaveShownRef.current) {
                trackExitIntent('shown');
                // Don't set pageLeaveShownRef — let mouseout CTA still work on desktop
                // This is a silent signal-only fire for mobile devices
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('click', handleGlobalClick);
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mouseout', handlePageLeave as EventListener);
            document.removeEventListener('pointerdown', handlePointerDown as EventListener);
            document.removeEventListener('click', handleWhatsappCta);
            document.removeEventListener('visibilitychange', handleVisibilityChange);

            removeCopyListener?.();
            removeFaqListener?.();

            // Cleanup rAF
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [handleGlobalClick, handleScroll, handlePageLeave, handlePointerDown]);

    // Silent component — all work is done via event listeners
    return null;
}
