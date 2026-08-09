'use client';

// ProductSpin360 — drag/swipe 360° rotational viewer for product detail pages.
// Zero external deps by design: this repo actively fights JS-weight (three.js /
// @google/model-viewer / react-360-view would each add 100+ KB gz for a feature
// most sessions never open). Vanilla React + native pointer events + <img> tags.
// Frames displayed are CairoVolt's own product photography, not manufacturer-
// supplied assets. The parent component gates rendering on real frame presence
// on disk — this component never fabricates or duplicates frames.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent, TouchEvent as ReactTouchEvent } from 'react';

interface ProductSpin360Props {
    slug: string;
    brand: string;
    frameCount: number;
    locale: 'ar' | 'en';
    /**
     * SEO-visible master URL painted before the viewer boots. It seeds the
     * first <img> paint so crawlers and users on slow connections still see a
     * real product shot while the interleaved preload catches up.
     */
    primaryImage: string;
    /**
     * Localized product name used for the aria-label and the <img> alt text
     * (e.g. "JBL Charge 5 بلوتوث"). Falls back to a generic label if omitted.
     */
    altName?: string;
}

// Drag sensitivity — 15px of horizontal travel advances one frame. A full
// 500px drag lands at ≈2 rotations, matching WebRotate/Sirv's tuned defaults
// for 36-frame spins (webrotate360.com, sirv.com).
const PX_PER_FRAME_DESKTOP = 15;
const PX_PER_FRAME_MOBILE = 10;

// Interactive threshold: 12 evenly-distributed frames form a coherent circle
// on their own, so the viewer accepts input the moment they land. Rest stream
// in the background without blocking interaction.
const INTERACTIVE_MIN_FRAMES = 12;

// Auto-spin: gentle 24fps rotation for exactly 2 full turns on mount, then
// stops for good. Any user interaction cancels it immediately; it never
// resumes without an explicit Space press. Disabled entirely when
// prefers-reduced-motion is set (WCAG 2.2.2 / Pause-Stop-Hide).
const AUTO_SPIN_FPS = 24;
const AUTO_SPIN_TOTAL_ROTATIONS = 2;

// HUD auto-hide (ms).
const HUD_HIDE_MS = 3000;
const HINT_HIDE_MS = 5000;

// Announce frame changes to assistive tech every N frames so screen readers
// aren't flooded during a fast drag.
const ARIA_ANNOUNCE_STRIDE = 6;

/**
 * Interleaved preload order — starts at 0, halves the step each pass, so the
 * first ~12 frames span the full 360° circle (0, 18, 9, 27, 4, 13, 22, 31, …
 * for N=36). A partially-loaded viewer still shows a coherent rotation.
 * Mirrors the reference pattern used by cloudimage-360-view / Sirv Spin.
 */
function buildInterleavedOrder(n: number): number[] {
    const order: number[] = [];
    const seen = new Set<number>();
    const add = (i: number) => {
        const k = ((i % n) + n) % n;
        if (!seen.has(k)) {
            seen.add(k);
            order.push(k);
        }
    };
    add(0);
    let step = n;
    while (step > 1 && order.length < n) {
        step = Math.max(1, Math.floor(step / 2));
        for (let i = 0; i < n; i += step) {
            add(i);
            if (order.length >= n) break;
        }
    }
    // Safety net for any indices missed by the halving pass.
    for (let i = 0; i < n; i++) add(i);
    return order;
}

function pad2(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
}

export default function ProductSpin360({
    slug,
    brand,
    frameCount,
    locale,
    primaryImage,
    altName,
}: ProductSpin360Props) {
    const isRTL = locale === 'ar';
    // Defensive normalization — a parent that miscomputes the count must NOT
    // crash the page, and MUST NOT show fabricated frames. All hooks below
    // run unconditionally (Rules of Hooks); the final render bails to null
    // when there's nothing real to show.
    const safeFrameCount = Math.max(0, Math.floor(frameCount || 0));

    // Precompute every frame URL exactly once — no .padStart() / .toString()
    // work inside the render loop or drag handler.
    const frames = useMemo(() => {
        if (safeFrameCount < 1) return [];
        const brandLower = brand.toLowerCase();
        const base = `/products/${brandLower}/${slug}/spin/${slug}-spin`;
        const out: Array<{ url800: string; url480: string; srcSet: string }> = [];
        for (let i = 0; i < safeFrameCount; i++) {
            const nn = pad2(i + 1); // filenames are 01..NN, not 00-based
            const url800 = `${base}-${nn}-800.webp`;
            const url480 = `${base}-${nn}-480.webp`;
            out.push({
                url800,
                url480,
                srcSet: `${url480} 480w, ${url800} 800w`,
            });
        }
        return out;
    }, [brand, slug, safeFrameCount]);

    const preloadOrder = useMemo(() => buildInterleavedOrder(safeFrameCount), [safeFrameCount]);

    // Cached decoded frames for the session. Not React state — mutating this
    // must never re-render.
    const imageCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());

    const [currentFrame, setCurrentFrame] = useState(0);
    const [loadedCount, setLoadedCount] = useState(0);
    const [hudVisible, setHudVisible] = useState(true);
    const [hintVisible, setHintVisible] = useState(true);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [ariaAnnounce, setAriaAnnounce] = useState<string>('');

    // Buffered drag state — pointer/touch events write here on the raw thread,
    // a rAF pump reads and applies to React state at ≤60fps.
    const pendingFrameRef = useRef<number>(0);
    const rafRef = useRef<number | null>(null);
    const dragStartRef = useRef<{ x: number; y: number; frame: number; active: boolean; horizontal: boolean } | null>(null);
    const pxPerFrameRef = useRef<number>(PX_PER_FRAME_DESKTOP);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const autoSpinTimerRef = useRef<number | null>(null);
    const autoSpinTicksRef = useRef<number>(0);
    const autoSpinKilledRef = useRef<boolean>(false);
    const hudTimerRef = useRef<number | null>(null);
    const hintTimerRef = useRef<number | null>(null);
    const isMountedRef = useRef<boolean>(true);
    const lastAnnouncedRef = useRef<number>(-999);

    // Detect touch/mobile once to tune drag sensitivity.
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        pxPerFrameRef.current = isTouch ? PX_PER_FRAME_MOBILE : PX_PER_FRAME_DESKTOP;
    }, []);

    // Reduced-motion listener.
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mq.matches);
        const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        if (mq.addEventListener) mq.addEventListener('change', onChange);
        else mq.addListener(onChange);
        return () => {
            if (mq.removeEventListener) mq.removeEventListener('change', onChange);
            else mq.removeListener(onChange);
        };
    }, []);

    // Interleaved preload.
    useEffect(() => {
        isMountedRef.current = true;
        if (!frames.length) return;
        // Frame 0 always first (the visible starting frame).
        const seq = preloadOrder.length ? preloadOrder : frames.map((_, i) => i);
        seq.forEach((frameIdx) => {
            if (imageCacheRef.current.has(frameIdx)) return;
            const img = new Image();
            img.decoding = 'async';
            // fetchpriority is only a hint; set it low on preload — the visible
            // <img> uses fetchpriority="high" on the initial paint below.
            try {
                (img as unknown as { fetchPriority?: string }).fetchPriority = 'low';
            } catch {
                /* older browsers ignore */
            }
            img.onload = () => {
                if (!isMountedRef.current) return;
                imageCacheRef.current.set(frameIdx, img);
                setLoadedCount((c) => c + 1);
            };
            img.onerror = () => {
                // Missing frame is fatal for smooth spin, but we don't want to
                // fabricate — leave it out of the cache and increment count so
                // the interactive gate still opens. If the visible index lands
                // on a missing frame the <img> will 404 silently.
                if (!isMountedRef.current) return;
                setLoadedCount((c) => c + 1);
            };
            img.src = frames[frameIdx].url800;
        });
        return () => {
            isMountedRef.current = false;
        };
    }, [frames, preloadOrder]);

    // Cleanup — RAF, timers, cache — only on unmount.
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
            if (autoSpinTimerRef.current != null) window.clearInterval(autoSpinTimerRef.current);
            if (hudTimerRef.current != null) window.clearTimeout(hudTimerRef.current);
            if (hintTimerRef.current != null) window.clearTimeout(hintTimerRef.current);
            imageCacheRef.current.clear();
        };
    }, []);

    const isInteractive = loadedCount >= Math.min(INTERACTIVE_MIN_FRAMES, safeFrameCount);

    // Auto-spin: 2 rotations at 24fps, on mount, then stop.
    // Cancels on first user interaction; never runs if prefers-reduced-motion.
    useEffect(() => {
        if (prefersReducedMotion || autoSpinKilledRef.current) return;
        if (!isInteractive) return;
        if (autoSpinTimerRef.current != null) return; // already running
        const maxTicks = AUTO_SPIN_TOTAL_ROTATIONS * safeFrameCount;
        autoSpinTicksRef.current = 0;
        autoSpinTimerRef.current = window.setInterval(() => {
            if (autoSpinKilledRef.current) {
                if (autoSpinTimerRef.current != null) {
                    window.clearInterval(autoSpinTimerRef.current);
                    autoSpinTimerRef.current = null;
                }
                return;
            }
            autoSpinTicksRef.current += 1;
            setCurrentFrame((prev) => (prev + 1) % safeFrameCount);
            if (autoSpinTicksRef.current >= maxTicks) {
                if (autoSpinTimerRef.current != null) {
                    window.clearInterval(autoSpinTimerRef.current);
                    autoSpinTimerRef.current = null;
                }
                autoSpinKilledRef.current = true;
            }
        }, Math.round(1000 / AUTO_SPIN_FPS));
        return () => {
            if (autoSpinTimerRef.current != null) {
                window.clearInterval(autoSpinTimerRef.current);
                autoSpinTimerRef.current = null;
            }
        };
    }, [isInteractive, prefersReducedMotion, safeFrameCount]);

    const killAutoSpin = useCallback(() => {
        autoSpinKilledRef.current = true;
        if (autoSpinTimerRef.current != null) {
            window.clearInterval(autoSpinTimerRef.current);
            autoSpinTimerRef.current = null;
        }
    }, []);

    // HUD + hint auto-hide.
    useEffect(() => {
        if (hudTimerRef.current != null) window.clearTimeout(hudTimerRef.current);
        hudTimerRef.current = window.setTimeout(() => {
            if (isMountedRef.current) setHudVisible(false);
        }, HUD_HIDE_MS);
        if (hintTimerRef.current != null) window.clearTimeout(hintTimerRef.current);
        hintTimerRef.current = window.setTimeout(() => {
            if (isMountedRef.current) setHintVisible(false);
        }, HINT_HIDE_MS);
        return () => {
            if (hudTimerRef.current != null) window.clearTimeout(hudTimerRef.current);
            if (hintTimerRef.current != null) window.clearTimeout(hintTimerRef.current);
        };
    }, []);

    // rAF-flushed frame commit.
    const scheduleFrameCommit = useCallback((next: number) => {
        if (safeFrameCount < 1) return;
        pendingFrameRef.current = ((next % safeFrameCount) + safeFrameCount) % safeFrameCount;
        if (rafRef.current != null) return;
        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;
            setCurrentFrame(pendingFrameRef.current);
        });
    }, [safeFrameCount]);

    // Announce every ARIA_ANNOUNCE_STRIDE frames, throttled.
    useEffect(() => {
        if (Math.abs(currentFrame - lastAnnouncedRef.current) < ARIA_ANNOUNCE_STRIDE) return;
        lastAnnouncedRef.current = currentFrame;
        const msg = isRTL
            ? `الإطار ${currentFrame + 1} من ${safeFrameCount}`
            : `Frame ${currentFrame + 1} of ${safeFrameCount}`;
        setAriaAnnounce(msg);
    }, [currentFrame, safeFrameCount, isRTL]);

    const hideHud = useCallback(() => {
        setHudVisible(false);
        setHintVisible(false);
    }, []);

    // Direction convention:
    //   LTR: drag right (in reading direction) → advance frame (+1)
    //   RTL: drag left  (in reading direction) → advance frame (+1)
    // i.e. rtlSign inverts the horizontal delta for Arabic so the spin feels
    // "forward with reading" in both locales. Same convention applied to
    // ArrowRight/ArrowLeft below so keyboard and drag stay consistent.
    const rtlSign = isRTL ? -1 : 1;

    // ─── Pointer drag ──────────────────────────────────────────────────────
    const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
        if (!isInteractive) return;
        // Only primary pointer / left mouse.
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        killAutoSpin();
        hideHud();
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            frame: currentFrame,
            active: true,
            horizontal: false, // becomes true once we're sure this isn't a vertical scroll
        };
        try {
            (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        } catch {
            /* older browsers */
        }
    }, [currentFrame, hideHud, isInteractive, killAutoSpin]);

    const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
        const start = dragStartRef.current;
        if (!start || !start.active) return;
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        if (!start.horizontal) {
            // Not yet committed to horizontal: bail if the user is scrolling
            // the page vertically instead of spinning.
            if (Math.abs(dx) < Math.abs(dy) + 8) return;
            start.horizontal = true;
        }
        const deltaFrames = Math.round((dx * rtlSign) / pxPerFrameRef.current);
        scheduleFrameCommit(start.frame + deltaFrames);
    }, [rtlSign, scheduleFrameCommit]);

    const onPointerUp = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
        const start = dragStartRef.current;
        if (start) {
            start.active = false;
            dragStartRef.current = null;
        }
        try {
            (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
        } catch {
            /* noop */
        }
    }, []);

    // Touch — we ONLY preventDefault once we're confidently in a horizontal
    // drag; otherwise vertical page scroll must keep working.
    const onTouchStart = useCallback(() => {
        if (!isInteractive) return;
        // dragStart is set via onPointerDown (pointer events fire on touch too
        // in every browser we support). Nothing extra to do here.
    }, [isInteractive]);

    const onTouchMove = useCallback((e: ReactTouchEvent<HTMLDivElement>) => {
        const start = dragStartRef.current;
        if (start && start.horizontal && e.cancelable) {
            // Prevent the page from scrolling once we're spinning.
            e.preventDefault();
        }
    }, []);

    // ─── Keyboard ─────────────────────────────────────────────────────────
    const onKeyDown = useCallback((e: ReactKeyboardEvent<HTMLDivElement>) => {
        if (!isInteractive) return;
        let handled = true;
        switch (e.key) {
            case 'ArrowRight':
                killAutoSpin();
                hideHud();
                scheduleFrameCommit(currentFrame + rtlSign);
                break;
            case 'ArrowLeft':
                killAutoSpin();
                hideHud();
                scheduleFrameCommit(currentFrame - rtlSign);
                break;
            case 'PageDown':
                killAutoSpin();
                hideHud();
                scheduleFrameCommit(currentFrame + 6 * rtlSign);
                break;
            case 'PageUp':
                killAutoSpin();
                hideHud();
                scheduleFrameCommit(currentFrame - 6 * rtlSign);
                break;
            case 'Home':
                killAutoSpin();
                hideHud();
                scheduleFrameCommit(0);
                break;
            case 'End':
                killAutoSpin();
                hideHud();
                scheduleFrameCommit(safeFrameCount - 1);
                break;
            case ' ':
            case 'Spacebar':
                // Toggle auto-spin: kill if running, restart from current
                // frame if stopped (respect reduced motion).
                if (prefersReducedMotion) {
                    handled = false;
                    break;
                }
                if (autoSpinTimerRef.current != null) {
                    killAutoSpin();
                } else {
                    autoSpinKilledRef.current = false;
                    autoSpinTicksRef.current = 0;
                    const maxTicks = AUTO_SPIN_TOTAL_ROTATIONS * safeFrameCount;
                    autoSpinTimerRef.current = window.setInterval(() => {
                        if (autoSpinKilledRef.current) {
                            if (autoSpinTimerRef.current != null) {
                                window.clearInterval(autoSpinTimerRef.current);
                                autoSpinTimerRef.current = null;
                            }
                            return;
                        }
                        autoSpinTicksRef.current += 1;
                        setCurrentFrame((prev) => (prev + 1) % safeFrameCount);
                        if (autoSpinTicksRef.current >= maxTicks) {
                            if (autoSpinTimerRef.current != null) {
                                window.clearInterval(autoSpinTimerRef.current);
                                autoSpinTimerRef.current = null;
                            }
                            autoSpinKilledRef.current = true;
                        }
                    }, Math.round(1000 / AUTO_SPIN_FPS));
                }
                break;
            default:
                handled = false;
        }
        if (handled) e.preventDefault();
    }, [currentFrame, safeFrameCount, hideHud, isInteractive, killAutoSpin, prefersReducedMotion, rtlSign, scheduleFrameCommit]);

    // ─── Rendering ────────────────────────────────────────────────────────
    // Guard: nothing real to show → render nothing. Constraint #1: no
    // fabricated frames, no placeholder, no "coming soon" fallback.
    if (safeFrameCount < 1 || frames.length === 0) {
        return null;
    }
    const activeFrame = frames[currentFrame] || frames[0];
    // For the first paint, seed with the master primaryImage so crawlers / no-
    // JS see a real product shot immediately. Once the interleaved preload
    // lands frame 0, we swap over. This avoids a broken-image flash if the
    // spin/ directory happens to be temporarily unavailable.
    const initialFrameReady = imageCacheRef.current.has(currentFrame) || loadedCount > 0;
    const displaySrc = initialFrameReady ? activeFrame.url800 : primaryImage;
    const displaySrcSet = initialFrameReady ? activeFrame.srcSet : undefined;

    const preloadProgress = Math.min(1, loadedCount / Math.min(INTERACTIVE_MIN_FRAMES, safeFrameCount));

    const grabbingClass = 'cursor-grab active:cursor-grabbing';
    const productLabel = altName?.trim();
    const ariaLabel = isRTL
        ? `عرض 360 درجة${productLabel ? ` لـ${productLabel}` : ' للمنتج'} — استخدم السحب أو الأسهم للتدوير`
        : `360° rotational view${productLabel ? ` of ${productLabel}` : ''} — drag or use arrow keys to rotate`;

    // Ring progress SVG — dashoffset animates on loadedCount.
    const ringSize = 44;
    const ringStroke = 3;
    const ringRadius = (ringSize - ringStroke) / 2;
    const ringCircumference = 2 * Math.PI * ringRadius;
    const ringDashOffset = ringCircumference * (1 - preloadProgress);
    const ringStyle: CSSProperties = {
        strokeDasharray: `${ringCircumference} ${ringCircumference}`,
        strokeDashoffset: ringDashOffset,
        transition: 'stroke-dashoffset 200ms ease-out',
    };

    return (
        <div
            ref={containerRef}
            role="application"
            aria-label={ariaLabel}
            aria-roledescription={isRTL ? 'عارض دوار 360 درجة' : '360-degree image viewer'}
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={(e) => {
                if (dragStartRef.current?.active) onPointerUp(e);
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onKeyDown={onKeyDown}
            onFocus={killAutoSpin}
            className={`relative aspect-square w-full max-w-full bg-white select-none touch-pan-y outline-none focus:outline-2 focus:outline-orange-500 focus:outline-offset-2 rounded-lg overflow-hidden ${isInteractive ? grabbingClass : 'cursor-wait'}`}
        >
            {/* The main frame — plain <img>, not next/image. src swaps 20+
                times/sec during a drag; the <Image> wrapper's DOM mutations
                would thrash. Bypasses /api/img by design (static WebP). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={displaySrc}
                srcSet={displaySrcSet}
                sizes="(max-width: 640px) 480px, 800px"
                alt={ariaLabel}
                draggable={false}
                decoding="async"
                // First paint gets high priority; subsequent frame swaps are
                // served from the in-memory cache and don't hit the network.
                {...({ fetchPriority: 'high' } as { fetchPriority: 'high' })}
                className="absolute inset-0 h-full w-full object-contain pointer-events-none"
            />

            {/* 360° HUD badge — top-start (LTR: left, RTL: right). */}
            <div
                aria-hidden="true"
                className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-white text-xs font-semibold backdrop-blur-sm transition-opacity duration-500 ${hudVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ direction: 'ltr' }}
            >
                <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 12a9 9 0 1 1-3-6.7" />
                    <polyline points="21 3 21 9 15 9" />
                </svg>
                <span>360°</span>
            </div>

            {/* Preload progress ring — top-end (opposite corner from badge). */}
            {!isInteractive && (
                <div
                    aria-hidden="true"
                    className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} z-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm`}
                    style={{ width: ringSize, height: ringSize }}
                >
                    <svg width={ringSize} height={ringSize} className="-rotate-90">
                        <circle
                            cx={ringSize / 2}
                            cy={ringSize / 2}
                            r={ringRadius}
                            fill="none"
                            stroke="rgba(255,255,255,0.25)"
                            strokeWidth={ringStroke}
                        />
                        <circle
                            cx={ringSize / 2}
                            cy={ringSize / 2}
                            r={ringRadius}
                            fill="none"
                            stroke="#f97316"
                            strokeWidth={ringStroke}
                            strokeLinecap="round"
                            style={ringStyle}
                        />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-white tabular-nums" style={{ direction: 'ltr' }}>
                        {loadedCount}/{Math.min(INTERACTIVE_MIN_FRAMES, safeFrameCount)}
                    </span>
                </div>
            )}

            {/* Drag hint — bottom-center. */}
            <div
                aria-hidden="true"
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full bg-black/60 px-4 py-1.5 text-white text-xs font-medium backdrop-blur-sm transition-opacity duration-500 pointer-events-none ${hintVisible && isInteractive ? 'opacity-100' : 'opacity-0'}`}
            >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12h16" />
                    <polyline points="8 6 4 12 8 18" />
                    <polyline points="16 6 20 12 16 18" />
                </svg>
                <span>{isRTL ? 'اسحب للتدوير' : 'Drag to rotate'}</span>
            </div>

            {/* Live region — polite frame announcements throttled every 6 frames. */}
            <span className="sr-only" aria-live="polite" aria-atomic="true">
                {ariaAnnounce}
            </span>
        </div>
    );
}
