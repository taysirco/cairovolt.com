'use client';

import { useEffect, useCallback, useRef } from 'react';

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
 * 3. Exit Overlay
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
    const exitIntentShownRef = useRef(false);
    const rafIdRef = useRef<number>(0);

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

                    // At 75%+ depth: reveal additional content (if exists)
                    if (ms >= 75) {
                        const engagementZone = document.querySelector('[data-engagement-reveal]');
                        if (engagementZone) {
                            engagementZone.classList.add('cv-revealed');
                        }
                    }
                }
            }
        });
    }, []);

    // ─── 3. Exit Overlay ───
    const handleExitIntent = useCallback((e: MouseEvent) => {
        // Only trigger when mouse moves above the viewport
        if (e.clientY > 5) return;
        if (exitIntentShownRef.current) return;
        exitIntentShownRef.current = true;

        // Inject a subtle, non-intrusive CTA
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
                <a href="https://wa.me/201063374834"
                   target="_blank"
                   rel="nofollow noopener noreferrer"
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
        document.addEventListener('mouseout', handleExitIntent as EventListener, { passive: true });
        document.addEventListener('pointerdown', handlePointerDown as EventListener, { passive: true });

        return () => {
            document.removeEventListener('click', handleGlobalClick);
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mouseout', handleExitIntent as EventListener);
            document.removeEventListener('pointerdown', handlePointerDown as EventListener);

            // Cleanup rAF
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [handleGlobalClick, handleScroll, handleExitIntent, handlePointerDown]);

    // Silent component — all work is done via event listeners
    return null;
}
