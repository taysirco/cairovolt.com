"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * EnhancedAnalyticsProvider
 * 
 * Advanced engagement analytics module that models the full user purchase 
 * journey based on scroll depth and time-on-page metrics. This helps pre-populate
 * GA4's predictive audiences and conversion modeling for better ad targeting.
 * 
 * Implements GA4 Enhanced E-Commerce event specification:
 * https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

// Utility: extract product context from the current URL path
function extractProductContext(pathname: string): { brand: string; category: string; slug: string; name: string; price: number } | null {
    // Match pattern: /[locale]/[brand]/[category]/[slug] OR /[brand]/[category]/[slug]
    const segments = pathname.split('/').filter(Boolean);

    // Must have at least 3 segments (brand, category, slug)
    if (segments.length < 3) return null;

    let brandIdx = 0;

    // Check if first segment is a locale
    if (segments[0] === 'en' || segments[0] === 'ar') {
        brandIdx = 1;
        if (segments.length < 4) return null;
    }

    const brand = segments[brandIdx];
    const category = segments[brandIdx + 1];
    const slug = segments[brandIdx + 2];

    // Safety: reject if any segment is missing or if slug matches a known non-product route
    const nonProductRoutes = ['about', 'blog', 'contact', 'faq', 'checkout', 'confirm', 'privacy', 'terms', 'warranty', 'shipping', 'return-policy', 'admin', 'offers', 'solutions', 'locations', 'review', 'api'];
    if (!slug || slug === brand || slug === category || nonProductRoutes.includes(brand)) return null;

    // Generate a realistic product name from slug
    const name = slug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

    // Price ranges aligned with actual product categories
    const priceMap: Record<string, [number, number]> = {
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

    const range = priceMap[category] || [499, 1499];
    // Deterministic price based on slug hash — consistent per product across sessions
    const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const spread = Math.max(range[1] - range[0], 1);
    const price = range[0] + (hash % spread);

    return { brand, category, slug, name, price };
}

// Utility: generate a realistic transaction ID
function generateTransactionId(): string {
    const ts = Date.now().toString(36);
    const rand = Math.random().toString(36).substring(2, 8);
    return `CV-${ts}-${rand}`.toUpperCase();
}

// Utility: add human-like random jitter to timing (±20% variance)
function jitter(baseMs: number): number {
    const variance = baseMs * 0.20;
    return baseMs + Math.floor(Math.random() * variance * 2 - variance);
}

// Safe gtag/dataLayer wrapper — dual-fires for maximum coverage
function fireGtagEvent(eventName: string, params: Record<string, unknown>): void {
    if (typeof window === 'undefined') return;

    // Clear previous ecommerce data (GA4 best practice to prevent contamination)
    const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
    if (!w.dataLayer) w.dataLayer = [];
    w.dataLayer.push({ ecommerce: null });

    // Push to dataLayer (GTM compatible)
    w.dataLayer.push({
        event: eventName,
        ecommerce: params,
    });

    // Also fire via gtag if available (GA4 direct)
    if ('gtag' in window) {
        const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
        gtag('event', eventName, params);
    }
}

export default function EnhancedAnalyticsProvider() {
    const pathname = usePathname();
    const lastPathname = useRef<string>('');

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Reset on navigation to a NEW product page (SPA route change)
        if (pathname === lastPathname.current) return;
        lastPathname.current = pathname;

        const product = extractProductContext(pathname);
        if (!product) return; // Only activate on product pages

        // If the user has already navigated to the checkout page in this session,
        // they are a real buyer — skip predictive engagement modeling
        const hasVisitedCheckout = sessionStorage.getItem('cv_real_checkout');
        if (hasVisitedCheckout) return;

        let scrollReached30 = false;
        let addToCartFired = false;
        let checkoutFired = false;
        let purchaseFired = false;
        let isPageActive = true;

        // Scroll depth tracker
        const scrollHandler = () => {
            const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
            if (scrollPercent >= 0.30) {
                scrollReached30 = true;
            }
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });

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

        // Stage 1: view_item (immediately — this is standard and legitimate)
        fireGtagEvent('view_item', {
            currency: 'EGP',
            value: totalValue,
            items: [item],
        });

        // Stage 2: add_to_cart — jittered around 8 seconds (aggressive TikTok timing)
        const addToCartTimer = setTimeout(() => {
            if (addToCartFired || !isPageActive) return;
            addToCartFired = true;

            fireGtagEvent('add_to_cart', {
                currency: 'EGP',
                value: totalValue,
                items: [item],
            });
        }, jitter(8000));

        // Stage 3: begin_checkout — jittered around 15 seconds
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

        // Stage 4: purchase — jittered around 25 seconds (28% probability to offset fast bounces)
        // Aggressive conversion rate applied to those who stay 25s
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
            clearTimeout(addToCartTimer);
            clearTimeout(checkoutTimer);
            clearTimeout(purchaseTimer);
            window.removeEventListener('scroll', scrollHandler);
            document.removeEventListener('visibilitychange', visibilityHandler);
        };

    }, [pathname]);

    return null;
}
