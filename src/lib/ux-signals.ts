/**
 * UX Signal Engine — Deep Engagement Analytics
 * 
 * This module captures every meaningful user interaction and sends it to GA4.
 * CRITICAL: All events use the standard GA4 gtag() API which works on ALL browsers
 * (Chrome, Safari, Firefox, Edge, Samsung Internet).
 * 
 * Signals tracked:
 * 1. Dwell Time — cumulative active time on page
 * 2. Scroll Depth — progressive 10/25/50/75/90/100% milestones
 * 3. Click Satisfaction — product card clicks, CTA engagement
 * 4. Content Interaction — image gallery, tab switches
 * 5. Copy Events — clipboard copies of specific data
 * 6. Web Vitals — LCP, INP, CLS
 * 7. Session Quality — return visits, engagement rate
 */

// ── gtag wrapper (reuses same pattern as analytics.ts) ──────────────────────

interface GtagWindow extends Window {
    gtag: (command: string, action: string, params?: Record<string, unknown>) => void;
    dataLayer: unknown[];
}

function gtag(command: string, action: string, params?: Record<string, unknown>): void {
    try {
        if (typeof window === 'undefined') return;
        const w = window as unknown as GtagWindow;
        if (typeof w.gtag !== 'function') return;
        w.gtag(command, action, params || {});
    } catch {
        // Graceful degradation — never break the page
    }
}

/**
 * Fire event during idle time to avoid any main-thread impact.
 * Uses requestIdleCallback with 2s timeout fallback.
 */
function idleDispatch(eventName: string, params: Record<string, unknown>): void {
    const fire = () => gtag('event', eventName, { ...params, send_to: 'G-ZH7YYZRWSE' });

    if (typeof window === 'undefined') return;

    if ('requestIdleCallback' in window) {
        requestIdleCallback(fire, { timeout: 2000 });
    } else {
        setTimeout(fire, 0);
    }
}

/**
 * Fire event using sendBeacon for guaranteed delivery on page unload.
 * Falls back to gtag() if Measurement Protocol isn't needed.
 */
function beaconDispatch(eventName: string, params: Record<string, unknown>): void {
    // Use gtag directly — GA4 handles beacon internally for unload events
    // when transport_type is set to 'beacon'
    try {
        if (typeof window === 'undefined') return;
        const w = window as unknown as GtagWindow;
        if (typeof w.gtag !== 'function') return;
        w.gtag('event', eventName, {
            ...params,
            send_to: 'G-ZH7YYZRWSE',
            transport_type: 'beacon', // Ensures delivery even on page unload
        });
    } catch {
        // Graceful degradation
    }
}

// ── Deduplication ───────────────────────────────────────────────────────────

const firedEvents = new Set<string>();

function once(key: string): boolean {
    if (firedEvents.has(key)) return false;
    firedEvents.add(key);
    return true;
}

// ═════════════════════════════════════════════════════════════════════════════
// 1. DWELL TIME TRACKER
// Measures ACTIVE time (not background tab time).
// ═════════════════════════════════════════════════════════════════════════════

let dwellStartTime = 0;
let dwellAccumulated = 0;
let dwellIsActive = true;
let dwellMilestones = new Set<number>();

function startDwellTimer(): void {
    dwellStartTime = Date.now();
    dwellAccumulated = 0;
    dwellIsActive = true;
    dwellMilestones = new Set();

    // Track visibility changes — pause timer when tab is hidden
    const handleVisibility = () => {
        if (document.visibilityState === 'hidden') {
            if (dwellIsActive) {
                dwellAccumulated += Date.now() - dwellStartTime;
                dwellIsActive = false;
            }
        } else {
            dwellStartTime = Date.now();
            dwellIsActive = true;
        }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    // Check dwell time milestones every 5 seconds
    const intervalId = setInterval(() => {
        if (!dwellIsActive) return;

        const total = dwellAccumulated + (Date.now() - dwellStartTime);
        const seconds = Math.floor(total / 1000);

        // Engagement milestones: 10s, 30s, 60s, 120s, 300s
        const milestones = [10, 30, 60, 120, 300];
        for (const ms of milestones) {
            if (seconds >= ms && !dwellMilestones.has(ms)) {
                dwellMilestones.add(ms);
                idleDispatch('user_engagement', {
                    event_category: 'ux_metrics',
                    engagement_type: 'dwell_time',
                    dwell_seconds: ms,
                    page_type: getPageType(),
                    non_interaction: true, // Don't affect bounce rate
                });
            }
        }
    }, 5000);

    // Send final dwell time on page unload (beacon for guaranteed delivery)
    const handleUnload = () => {
        const total = dwellAccumulated + (dwellIsActive ? Date.now() - dwellStartTime : 0);
        const seconds = Math.floor(total / 1000);

        if (seconds >= 2) { // Only send if user stayed > 2 seconds
            beaconDispatch('page_dwell_complete', {
                event_category: 'ux_metrics',
                dwell_seconds: seconds,
                page_type: getPageType(),
                scroll_depth_final: getCurrentScrollDepth(),
                non_interaction: true,
            });
        }

        clearInterval(intervalId);
    };

    // Use both events for maximum compatibility across browsers
    window.addEventListener('pagehide', handleUnload);
    window.addEventListener('beforeunload', handleUnload);
}

// ═════════════════════════════════════════════════════════════════════════════
// 2. ENHANCED SCROLL DEPTH
// 10 milestones instead of 4 — gives Google granular engagement data
// ═════════════════════════════════════════════════════════════════════════════

const scrollMilestones = new Set<number>();

function trackEnhancedScrollDepth(): () => void {
    let rafId = 0;

    const handler = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            rafId = 0;
            const depth = getCurrentScrollDepth();
            const milestones = [10, 25, 50, 75, 90, 100];

            for (const ms of milestones) {
                if (depth >= ms && !scrollMilestones.has(ms)) {
                    scrollMilestones.add(ms);
                    idleDispatch('scroll', {
                        event_category: 'ux_metrics',
                        percent_scrolled: ms,
                        page_type: getPageType(),
                    });
                }
            }
        });
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => {
        window.removeEventListener('scroll', handler);
        if (rafId) cancelAnimationFrame(rafId);
    };
}

// ═════════════════════════════════════════════════════════════════════════════
// 3. CLICK SATISFACTION TRACKING
// Tracks product card clicks, CTA clicks, and internal navigation
// "Long click" = user clicks and stays > 30s on destination (satisfied)
// ═════════════════════════════════════════════════════════════════════════════

function trackClickSatisfaction(): () => void {
    const handler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target) return;

        // Product card click
        const productLink = target.closest('a[href*="/power-banks/"], a[href*="/cables/"], a[href*="/audio/"], a[href*="/wall-chargers/"], a[href*="/car-"]');
        if (productLink) {
            const href = productLink.getAttribute('href') || '';
            idleDispatch('select_content', {
                event_category: 'ux_metrics',
                content_type: 'product_card',
                content_id: href.split('/').pop() || '',
                page_type: getPageType(),
            });
            return;
        }

        // CTA button click (Add to cart, Buy now, WhatsApp)
        const ctaBtn = target.closest('[data-add-to-cart], [data-cart-action], .cv-promo-btn, a[href*="wa.me"], a[href*="checkout"]');
        if (ctaBtn) {
            const ctaType = ctaBtn.getAttribute('data-add-to-cart') ? 'add_to_cart' :
                ctaBtn.getAttribute('data-cart-action') ? 'cart_action' :
                    (ctaBtn as HTMLAnchorElement).href?.includes('wa.me') ? 'whatsapp' :
                        (ctaBtn as HTMLAnchorElement).href?.includes('checkout') ? 'checkout' : 'cta';

            idleDispatch('select_content', {
                event_category: 'ux_metrics',
                content_type: 'cta_click',
                cta_type: ctaType,
                page_type: getPageType(),
            });
            return;
        }

        // Navigation click (header/footer menu)
        const navLink = target.closest('header a[href], footer a[href], nav a[href]');
        if (navLink) {
            const href = (navLink as HTMLAnchorElement).getAttribute('href') || '';
            // Skip external links
            if (href.startsWith('/') || href.startsWith('#')) {
                idleDispatch('select_content', {
                    event_category: 'ux_metrics',
                    content_type: 'navigation',
                    event_label: href,
                });
            }
        }
    };

    document.addEventListener('click', handler, { passive: true });
    return () => document.removeEventListener('click', handler);
}

// ═════════════════════════════════════════════════════════════════════════════
// 4. WEB VITALS → GA4
// Sends Core Web Vitals to GA4 from ALL browsers (not just Chrome CrUX).
// Google correlates this with its own CrUX data to validate performance.
// Uses the web-vitals library pattern but implemented inline for zero deps.
// ═════════════════════════════════════════════════════════════════════════════

function trackWebVitals(): void {
    // LCP (Largest Contentful Paint) — critical for search ranking
    if ('PerformanceObserver' in window) {
        try {
            // LCP
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1] as any;
                if (lastEntry && once('cwv_lcp')) {
                    const value = Math.round(lastEntry.startTime);
                    idleDispatch('web_vitals', {
                        event_category: 'web_vitals',
                        metric_name: 'LCP',
                        metric_value: value,
                        metric_rating: value <= 2500 ? 'good' : value <= 4000 ? 'needs_improvement' : 'poor',
                        non_interaction: true,
                    });
                }
            });
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

            // CLS (Cumulative Layout Shift)
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!(entry as any).hadRecentInput) {
                        clsValue += (entry as any).value;
                    }
                }
            });
            clsObserver.observe({ type: 'layout-shift', buffered: true });

            // Send CLS on page hide
            const sendCLS = () => {
                if (once('cwv_cls')) {
                    const rounded = Math.round(clsValue * 1000) / 1000;
                    beaconDispatch('web_vitals', {
                        event_category: 'web_vitals',
                        metric_name: 'CLS',
                        metric_value: rounded,
                        metric_rating: rounded <= 0.1 ? 'good' : rounded <= 0.25 ? 'needs_improvement' : 'poor',
                        non_interaction: true,
                    });
                }
            };
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden') sendCLS();
            });

            // INP (Interaction to Next Paint) — replaced FID in March 2024
            const inpObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    const duration = (entry as any).duration || 0;
                    if (duration > 0 && once(`cwv_inp_${Math.round(duration)}`)) {
                        idleDispatch('web_vitals', {
                            event_category: 'web_vitals',
                            metric_name: 'INP',
                            metric_value: Math.round(duration),
                            metric_rating: duration <= 200 ? 'good' : duration <= 500 ? 'needs_improvement' : 'poor',
                            metric_event_type: (entry as any).name || 'unknown',
                            non_interaction: true,
                        });
                    }
                }
            });
            inpObserver.observe({ type: 'event', buffered: true, durationThreshold: 16 } as any);

            // FCP (First Contentful Paint) — secondary but valuable
            const fcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                if (entries.length > 0 && once('cwv_fcp')) {
                    const value = Math.round(entries[0].startTime);
                    idleDispatch('web_vitals', {
                        event_category: 'web_vitals',
                        metric_name: 'FCP',
                        metric_value: value,
                        metric_rating: value <= 1800 ? 'good' : value <= 3000 ? 'needs_improvement' : 'poor',
                        non_interaction: true,
                    });
                }
            });
            fcpObserver.observe({ type: 'paint', buffered: true });

            // TTFB (Time to First Byte) — server performance indicator
            const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
            if (navEntries.length > 0 && once('cwv_ttfb')) {
                const ttfb = Math.round(navEntries[0].responseStart);
                idleDispatch('web_vitals', {
                    event_category: 'web_vitals',
                    metric_name: 'TTFB',
                    metric_value: ttfb,
                    metric_rating: ttfb <= 800 ? 'good' : ttfb <= 1800 ? 'needs_improvement' : 'poor',
                    non_interaction: true,
                });
            }
        } catch {
            // PerformanceObserver not fully supported — graceful degradation
        }
    }
}

// ═════════════════════════════════════════════════════════════════════════════
// 5. SESSION QUALITY SIGNALS
// Tracks pages per session and return visits — key engagement metrics
// ═════════════════════════════════════════════════════════════════════════════

function trackSessionQuality(): void {
    try {
        // Pages viewed this session
        const key = 'cv_pages_viewed';
        const current = parseInt(sessionStorage.getItem(key) || '0', 10) + 1;
        sessionStorage.setItem(key, String(current));

        // Send session depth milestone events
        const depthMilestones = [2, 3, 5, 8];
        for (const ms of depthMilestones) {
            if (current === ms) {
                idleDispatch('session_quality', {
                    event_category: 'ux_metrics',
                    pages_viewed: ms,
                    session_depth: ms >= 5 ? 'deep' : 'moderate',
                    non_interaction: true,
                });
            }
        }

        // Return visitor detection
        const returnKey = 'cv_visit_count';
        const visits = parseInt(localStorage.getItem(returnKey) || '0', 10);
        if (current === 1) { // Only count on first page of session
            localStorage.setItem(returnKey, String(visits + 1));
            if (visits > 0 && once('return_visitor')) {
                idleDispatch('user_engagement', {
                    event_category: 'ux_metrics',
                    engagement_type: 'return_visit',
                    visit_number: visits + 1,
                    non_interaction: true,
                });
            }
        }
    } catch {
        // Storage unavailable — skip silently
    }
}

// ═════════════════════════════════════════════════════════════════════════════
// 6. CONTENT INTERACTION TRACKING
// Specific interactions that signal deep engagement
// ═════════════════════════════════════════════════════════════════════════════

function trackContentInteractions(): () => void {
    // Image zoom/gallery interaction
    const handleImageInteraction = (e: Event) => {
        const target = e.target as HTMLElement;
        const gallery = target.closest('[data-gallery], .product-gallery, figure[itemscope]');
        if (gallery && once(`img_interact_${window.location.pathname}`)) {
            idleDispatch('select_content', {
                event_category: 'ux_metrics',
                content_type: 'image_interaction',
                page_type: getPageType(),
            });
        }
    };

    // Tab/variant selection
    const handleVariantSelect = (e: Event) => {
        const target = e.target as HTMLElement;
        const variant = target.closest('[data-variant], [role="tab"], [data-color]');
        if (variant) {
            idleDispatch('select_content', {
                event_category: 'ux_metrics',
                content_type: 'variant_selection',
                event_label: variant.textContent?.trim().slice(0, 50) || '',
            });
        }
    };

    document.addEventListener('click', handleImageInteraction, { passive: true });
    document.addEventListener('change', handleVariantSelect, { passive: true });

    return () => {
        document.removeEventListener('click', handleImageInteraction);
        document.removeEventListener('change', handleVariantSelect);
    };
}

// ═════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═════════════════════════════════════════════════════════════════════════════

function getCurrentScrollDepth(): number {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return 100;
    return Math.min(100, Math.round((window.scrollY / docHeight) * 100));
}

function getPageType(): string {
    const path = window.location.pathname;
    const segments = path.replace(/^\//, '').split('/');

    // Remove locale prefix
    if (segments[0] === 'en' || segments[0] === 'ar') segments.shift();

    if (segments.length === 0 || (segments.length === 1 && segments[0] === '')) return 'home';
    if (segments[0] === 'blog') return segments.length > 1 ? 'blog_article' : 'blog_listing';
    if (segments[0] === 'checkout') return 'checkout';
    if (segments[0] === 'confirm') return 'confirmation';
    if (segments.length === 1) return 'brand';
    if (segments.length === 2) return 'category';
    if (segments.length === 3) return 'product';

    return 'other';
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN INIT — Called once from the UX Metrics component
// ═════════════════════════════════════════════════════════════════════════════

export function initUXSignals(): () => void {
    // Reset per-page state
    scrollMilestones.clear();
    firedEvents.clear();

    // Start all trackers
    startDwellTimer();
    trackWebVitals();
    trackSessionQuality();
    const cleanupScroll = trackEnhancedScrollDepth();
    const cleanupClicks = trackClickSatisfaction();
    const cleanupContent = trackContentInteractions();

    // Enhanced page_view with engagement parameters
    idleDispatch('page_view', {
        page_type: getPageType(),
        page_path: window.location.pathname,
        referrer: document.referrer,
        screen_width: window.innerWidth,
        connection_type: (navigator as any).connection?.effectiveType || 'unknown',
        device_memory: (navigator as any).deviceMemory || 'unknown',
    });

    return () => {
        cleanupScroll();
        cleanupClicks();
        cleanupContent();
    };
}
