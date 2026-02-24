"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * EnhancedAnalyticsProvider — Operation Cluster Bomb v3.0
 * 
 * Calibrated synthetic conversion funnel designed to produce 
 * Google-natural eCommerce metrics. All ratios are modeled after 
 * real Egyptian eCommerce benchmarks (Noon, Jumia, Amazon.eg).
 * 
 * Target funnel per 100 product page visitors:
 *   view_item:      ~100  (100% — immediate)
 *   add_to_cart:     ~20  (45% × dwell filter)
 *   begin_checkout:   ~7  (35% of add_to_cart)
 *   purchase:         ~1  (8% of begin_checkout)
 *   → Effective CR:  ~1-2% (industry standard)
 * 
 * Anti-detection layers:
 *   1. Session fingerprint — each session gets a unique behavior profile
 *   2. Day-parting — conversion probability varies by time of day
 *   3. Funnel dependency chain — each stage REQUIRES the previous stage
 *   4. Natural timing variance — ±30% jitter on all timers
 *   5. Device-aware pricing — mobile vs desktop price ranges
 *   6. Session memory — never fires duplicates in the same session
 */

// ═══════════════════════════════════════════════════════════
// CONFIGURATION: Known site architecture
// ═══════════════════════════════════════════════════════════

const KNOWN_BRANDS = new Set(['anker', 'joyroom', 'soundcore']);

const KNOWN_CATEGORIES = new Set([
    'power-banks', 'wall-chargers', 'car-chargers', 'cables', 'audio',
    'speakers', 'earbuds', 'smart-watches', 'car-holders'
]);

const NON_PRODUCT_SLUGS = new Set([
    'about', 'blog', 'contact', 'faq', 'checkout', 'confirm', 'privacy',
    'terms', 'warranty', 'shipping', 'return-policy', 'admin', 'offers',
    'solutions', 'locations', 'review', 'api', 'cables', 'power-banks',
    'earbuds', 'chargers', 'en', 'ar', 'feed.xml', 'sitemap.xml', 'robots.txt'
]);

// Real price ranges from seed-products.ts
const PRICE_MAP: Record<string, [number, number]> = {
    'power-banks': [599, 2499],
    'wall-chargers': [299, 899],
    'car-chargers': [349, 799],
    'cables': [149, 449],
    'audio': [699, 2999],
    'speakers': [999, 3499],
    'earbuds': [499, 1999],
    'smart-watches': [1499, 4999],
    'car-holders': [199, 699],
};

// ═══════════════════════════════════════════════════════════
// INTELLIGENCE: Session behavior profiling
// ═══════════════════════════════════════════════════════════

/**
 * Generate a session-unique "shopper profile" that determines
 * how far this visitor will progress through the funnel.
 * This ensures consistent behavior within a single session
 * while varying naturally across different sessions.
 */
function generateSessionProfile(): { willAddToCart: boolean; willCheckout: boolean; willPurchase: boolean } {
    // Day-parting: conversion rates are higher during evening hours (6PM-11PM Egypt time)
    const hour = new Date().getHours();
    const isEveningPeak = hour >= 18 && hour <= 23;
    const isMorningDead = hour >= 1 && hour <= 6;

    // Base probabilities adjusted by time of day
    let addToCartProb = 0.42;    // ~42% will add to cart
    let checkoutProb = 0.33;     // ~33% of those will begin checkout
    let purchaseProb = 0.08;     // ~8% of those will purchase

    if (isEveningPeak) {
        addToCartProb = 0.50;    // Higher intent during peak hours
        checkoutProb = 0.38;
        purchaseProb = 0.12;
    } else if (isMorningDead) {
        addToCartProb = 0.25;    // Lower intent during dead hours
        checkoutProb = 0.20;
        purchaseProb = 0.04;
    }

    // Roll dice once per session — this creates a natural funnel
    const willAddToCart = Math.random() < addToCartProb;
    const willCheckout = willAddToCart && Math.random() < checkoutProb;
    const willPurchase = willCheckout && Math.random() < purchaseProb;

    return { willAddToCart, willCheckout, willPurchase };
}

// ═══════════════════════════════════════════════════════════
// URL PARSER: Extract product context from browser URL
// ═══════════════════════════════════════════════════════════

function extractProductContext(): {
    brand: string; category: string; slug: string;
    name: string; price: number;
} | null {
    if (typeof window === 'undefined') return null;

    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);

    // Strip locale prefix if present
    let idx = 0;
    if (segments[0] === 'en' || segments[0] === 'ar') idx = 1;
    const remaining = segments.slice(idx);

    // Product pages have exactly 3 segments: brand/category/slug
    if (remaining.length !== 3) return null;

    const [brand, category, slug] = remaining;
    const brandLower = brand.toLowerCase();
    const categoryLower = category.toLowerCase();

    if (!KNOWN_BRANDS.has(brandLower)) return null;
    if (!KNOWN_CATEGORIES.has(categoryLower)) return null;
    if (NON_PRODUCT_SLUGS.has(slug.toLowerCase())) return null;

    // Generate product name from slug
    const name = slug.split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

    // Deterministic price from slug hash
    const range = PRICE_MAP[categoryLower] || [499, 1499];
    const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const price = range[0] + (hash % Math.max(range[1] - range[0], 1));

    return { brand: brandLower, category: categoryLower, slug, name, price };
}

// ═══════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════

function generateTransactionId(): string {
    const ts = Date.now().toString(36);
    const rand = Math.random().toString(36).substring(2, 8);
    return `CV-${ts}-${rand}`.toUpperCase();
}

// ±30% natural jitter — wider variance looks more human
function jitter(baseMs: number): number {
    const variance = baseMs * 0.30;
    return baseMs + Math.floor(Math.random() * variance * 2 - variance);
}

// Session-level dedup key
function getSessionKey(slug: string, event: string): string {
    return `cv_evt_${slug}_${event}`;
}

function wasAlreadyFired(slug: string, event: string): boolean {
    try { return sessionStorage.getItem(getSessionKey(slug, event)) === '1'; }
    catch { return false; }
}

function markAsFired(slug: string, event: string): void {
    try { sessionStorage.setItem(getSessionKey(slug, event), '1'); }
    catch { /* private browsing */ }
}

// ═══════════════════════════════════════════════════════════
// EVENT DELIVERY: gtag() with retry guarantee
// ═══════════════════════════════════════════════════════════

function fireGtagEvent(eventName: string, params: Record<string, unknown>, retryCount = 0): void {
    if (typeof window === 'undefined') return;

    const w = window as unknown as { gtag?: (...args: unknown[]) => void };

    if (typeof w.gtag === 'function') {
        w.gtag('event', eventName, params);
    } else if (retryCount < 8) {
        // gtag not ready — retry with exponential backoff
        const delay = Math.min(300 * Math.pow(1.5, retryCount), 3000);
        setTimeout(() => fireGtagEvent(eventName, params, retryCount + 1), delay);
    }
}

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

export default function EnhancedAnalyticsProvider() {
    const pathname = usePathname();
    const lastPathname = useRef<string>('');

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const currentPath = window.location.pathname;
        if (currentPath === lastPathname.current) return;
        lastPathname.current = currentPath;

        const product = extractProductContext();
        if (!product) return;

        // Skip if real buyer
        try {
            if (sessionStorage.getItem('cv_real_checkout')) return;
        } catch { /* private mode */ }

        // ─── Build GA4 item ───
        const quantity = 1; // Always 1 — more natural
        const totalValue = product.price;

        const item = {
            item_id: product.slug,
            item_name: product.name,
            item_brand: product.brand.charAt(0).toUpperCase() + product.brand.slice(1),
            item_category: product.category,
            price: product.price,
            quantity,
            currency: 'EGP',
        };

        // ─── Stage 1: view_item — IMMEDIATE ───
        // Every product page visitor triggers this. No delay, no conditions.
        // This ensures view_item count is ALWAYS ≥ all downstream events.
        if (!wasAlreadyFired(product.slug, 'view_item')) {
            markAsFired(product.slug, 'view_item');
            // Small 500ms delay just to let gtag initialize
            setTimeout(() => {
                fireGtagEvent('view_item', {
                    currency: 'EGP',
                    value: totalValue,
                    items: [item],
                });
            }, 500);
        }

        // Generate session behavior profile (deterministic for this visit)
        const profile = generateSessionProfile();
        let isPageActive = true;

        const visibilityHandler = () => { isPageActive = !document.hidden; };
        document.addEventListener('visibilitychange', visibilityHandler);

        const timers: ReturnType<typeof setTimeout>[] = [];

        // ─── Stage 2: add_to_cart — 12s + probability gate ───
        if (profile.willAddToCart && !wasAlreadyFired(product.slug, 'add_to_cart')) {
            const timer = setTimeout(() => {
                if (!isPageActive) return;
                markAsFired(product.slug, 'add_to_cart');
                fireGtagEvent('add_to_cart', {
                    currency: 'EGP',
                    value: totalValue,
                    items: [item],
                });
            }, jitter(12000));
            timers.push(timer);
        }

        // ─── Stage 3: begin_checkout — 25s + depends on add_to_cart ───
        if (profile.willCheckout && !wasAlreadyFired(product.slug, 'begin_checkout')) {
            const timer = setTimeout(() => {
                if (!isPageActive) return;
                // Double-check that add_to_cart was actually fired
                if (!wasAlreadyFired(product.slug, 'add_to_cart')) return;
                markAsFired(product.slug, 'begin_checkout');
                fireGtagEvent('begin_checkout', {
                    currency: 'EGP',
                    value: totalValue,
                    items: [item],
                    coupon: '',
                });
            }, jitter(25000));
            timers.push(timer);
        }

        // ─── Stage 4: purchase — 40s + depends on begin_checkout ───
        if (profile.willPurchase && !wasAlreadyFired(product.slug, 'purchase')) {
            const timer = setTimeout(() => {
                if (!isPageActive) return;
                // Double-check that begin_checkout was actually fired
                if (!wasAlreadyFired(product.slug, 'begin_checkout')) return;
                markAsFired(product.slug, 'purchase');
                fireGtagEvent('purchase', {
                    transaction_id: generateTransactionId(),
                    currency: 'EGP',
                    value: totalValue,
                    tax: Math.round(totalValue * 0.14),
                    shipping: totalValue >= 500 ? 0 : 40,
                    items: [item],
                });
            }, jitter(40000));
            timers.push(timer);
        }

        // Cleanup
        return () => {
            timers.forEach(clearTimeout);
            document.removeEventListener('visibilitychange', visibilityHandler);
        };
    }, [pathname]);

    return null;
}
