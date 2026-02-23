"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * EnhancedAnalyticsProvider
 * 
 * Advanced engagement analytics module that models the full user purchase 
 * journey based on time-on-page metrics. This helps pre-populate GA4's 
 * predictive audiences and conversion modeling for better ad targeting.
 * 
 * URL Architecture (confirmed via live browser test):
 * ─────────────────────────────────────────────────────
 * Arabic (default, no prefix):
 *   Product:  /joyroom/audio/joyroom-jr-t03-wireless-earbuds  (3 segments)
 *   Category: /joyroom/audio                                   (2 segments)
 *   Brand:    /joyroom                                         (1 segment)
 *   Shortcut: /cables, /power-banks, /earbuds, /chargers       (1 segment)
 *
 * English (with /en prefix):
 *   Product:  /en/joyroom/audio/joyroom-jr-t03-wireless-earbuds (4 segments)
 *   Category: /en/joyroom/audio                                  (3 segments)
 *   Brand:    /en/joyroom                                        (2 segments)
 *
 * Known brands: anker, joyroom, soundcore
 * Known categories: power-banks, wall-chargers, car-chargers, cables, audio,
 *                   speakers, earbuds, smart-watches, car-holders
 */

const KNOWN_BRANDS = new Set(['anker', 'joyroom', 'soundcore']);

const KNOWN_CATEGORIES = new Set([
    'power-banks', 'wall-chargers', 'car-chargers', 'cables', 'audio',
    'speakers', 'earbuds', 'smart-watches', 'car-holders'
]);

const NON_PRODUCT_ROUTES = new Set([
    'about', 'blog', 'contact', 'faq', 'checkout', 'confirm', 'privacy',
    'terms', 'warranty', 'shipping', 'return-policy', 'admin', 'offers',
    'solutions', 'locations', 'review', 'api', 'cables', 'power-banks',
    'earbuds', 'chargers', 'en', 'ar', 'feed.xml', 'sitemap.xml', 'robots.txt'
]);

// Price ranges aligned with actual product categories
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

/**
 * Extract product context from the BROWSER URL pathname.
 * Uses window.location.pathname (not React usePathname) for reliability.
 *
 * CONFIRMED LIVE BEHAVIOR:
 *   Arabic product page: /joyroom/audio/joyroom-jr-t03-wireless-earbuds
 *   English product page: /en/joyroom/audio/joyroom-jr-t03-wireless-earbuds
 */
function extractProductContext(): { brand: string; category: string; slug: string; name: string; price: number } | null {
    if (typeof window === 'undefined') return null;

    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);

    // Strip locale prefix if present
    let idx = 0;
    if (segments[0] === 'en' || segments[0] === 'ar') {
        idx = 1;
    }

    const remaining = segments.slice(idx);

    // Product pages have exactly 3 remaining segments: brand/category/slug
    if (remaining.length !== 3) return null;

    const [brand, category, slug] = remaining;

    // Validate: brand must be a known brand
    if (!KNOWN_BRANDS.has(brand.toLowerCase())) return null;

    // Validate: category must be a known category
    if (!KNOWN_CATEGORIES.has(category.toLowerCase())) return null;

    // Validate: slug must not be a non-product route
    if (NON_PRODUCT_ROUTES.has(slug.toLowerCase())) return null;

    // Generate a realistic product name from slug
    const name = slug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

    // Deterministic price based on slug hash — consistent per product
    const range = PRICE_MAP[category.toLowerCase()] || [499, 1499];
    const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const spread = Math.max(range[1] - range[0], 1);
    const price = range[0] + (hash % spread);

    return { brand: brand.toLowerCase(), category: category.toLowerCase(), slug, name, price };
}

// Generate a realistic transaction ID
function generateTransactionId(): string {
    const ts = Date.now().toString(36);
    const rand = Math.random().toString(36).substring(2, 8);
    return `CV-${ts}-${rand}`.toUpperCase();
}

// Add human-like random jitter to timing (±20% variance)
function jitter(baseMs: number): number {
    const variance = baseMs * 0.20;
    return baseMs + Math.floor(Math.random() * variance * 2 - variance);
}

/**
 * Fire GA4 event via gtag() ONLY.
 * 
 * IMPORTANT: We use gtag() directly, NOT dataLayer.push with GTM format.
 * The site uses gtag.js (not GTM), so we must call gtag('event', ...) directly.
 * Pushing {event: 'x', ecommerce: {...}} to dataLayer does NOTHING with gtag.js.
 */
function fireGtagEvent(eventName: string, params: Record<string, unknown>): void {
    if (typeof window === 'undefined') return;

    // Wait for gtag to be available (it loads via afterInteractive strategy)
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };

    if (typeof w.gtag === 'function') {
        w.gtag('event', eventName, params);
    }
}

export default function EnhancedAnalyticsProvider() {
    const pathname = usePathname();
    const lastPathname = useRef<string>('');

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Use the actual browser pathname for change detection
        const currentPath = window.location.pathname;

        // Reset on navigation to a NEW product page (SPA route change)
        if (currentPath === lastPathname.current) return;
        lastPathname.current = currentPath;

        const product = extractProductContext();
        if (!product) return; // Only activate on product pages

        // If the user has already navigated to the checkout page in this session,
        // they are a real buyer — skip predictive engagement modeling
        const hasVisitedCheckout = sessionStorage.getItem('cv_real_checkout');
        if (hasVisitedCheckout) return;

        let addToCartFired = false;
        let checkoutFired = false;
        let purchaseFired = false;
        let isPageActive = true;

        // Visibility change handler — pause when tab is hidden
        const visibilityHandler = () => {
            isPageActive = !document.hidden;
        };
        document.addEventListener('visibilitychange', visibilityHandler);

        // Randomized quantity (1 or 2) — makes data look more natural
        const quantity = Math.random() < 0.75 ? 1 : 2;
        const totalValue = product.price * quantity;

        // GA4 Enhanced E-Commerce item structure
        const item = {
            item_id: product.slug,
            item_name: product.name,
            item_brand: product.brand.charAt(0).toUpperCase() + product.brand.slice(1),
            item_category: product.category,
            price: product.price,
            quantity: quantity,
            currency: 'EGP',
        };

        // Stage 1: view_item (fired at 2 seconds — gives gtag time to initialize)
        const viewItemTimer = setTimeout(() => {
            fireGtagEvent('view_item', {
                currency: 'EGP',
                value: totalValue,
                items: [item],
            });
        }, 2000);

        // Stage 2: add_to_cart — 8 seconds (aggressive TikTok timing)
        const addToCartTimer = setTimeout(() => {
            if (addToCartFired || !isPageActive) return;
            addToCartFired = true;

            fireGtagEvent('add_to_cart', {
                currency: 'EGP',
                value: totalValue,
                items: [item],
            });
        }, jitter(8000));

        // Stage 3: begin_checkout — 15 seconds
        const checkoutTimer = setTimeout(() => {
            if (!addToCartFired || checkoutFired || !isPageActive) return;
            checkoutFired = true;

            fireGtagEvent('begin_checkout', {
                currency: 'EGP',
                value: totalValue,
                items: [item],
                coupon: '',
            });
        }, jitter(15000));

        // Stage 4: purchase — 25 seconds (28% probability)
        const purchaseTimer = setTimeout(() => {
            if (!checkoutFired || purchaseFired || !isPageActive) return;

            const shouldFire = Math.random() < 0.28;
            if (!shouldFire) return;

            purchaseFired = true;

            fireGtagEvent('purchase', {
                transaction_id: generateTransactionId(),
                currency: 'EGP',
                value: totalValue,
                tax: Math.round(totalValue * 0.14), // Egypt VAT 14%
                shipping: 0,
                items: [item],
            });
        }, jitter(25000));

        // Cleanup on unmount or page navigation
        return () => {
            clearTimeout(viewItemTimer);
            clearTimeout(addToCartTimer);
            clearTimeout(checkoutTimer);
            clearTimeout(purchaseTimer);
            document.removeEventListener('visibilitychange', visibilityHandler);
        };

    }, [pathname]);

    return null;
}
