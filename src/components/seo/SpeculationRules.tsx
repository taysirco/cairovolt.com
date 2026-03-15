'use client';

import { usePathname } from 'next/navigation';

export default function SpeculationRules() {
    const pathname = usePathname();

    // Speculation Rules API - Supported natively in Chrome 109+
    // This instructs the browser to download and render the linked pages
    // IN THE BACKGROUND before the user even clicks them.
    // It provides a "zero latency" feel (0ms navigation time).
    const rulesJson = {
        prerender: [
            {
                // 🔥 EAGER prerender product pages — zero-latency navigation
                // Chrome prerenders in background IMMEDIATELY when link is visible
                source: "document",
                where: {
                    and: [
                        { href_matches: "/*/*/*/*" }, // /locale/brand/category/slug
                        { not: { href_matches: "/*/admin/*" } }
                    ]
                },
                eagerness: "eager" // Prerender immediately, not just on hover
            },
            {
                // Governorate location pages — prerender on hover
                source: "document",
                where: {
                    and: [
                        { href_matches: "/*/locations/*" },
                        { not: { href_matches: "/*/admin/*" } }
                    ]
                },
                eagerness: "moderate" // Prerender on hover/pointerdown
            }
        ],
        prefetch: [
            {
                // Category and brand hubs — prefetch on hover (upgraded from conservative)
                source: "document",
                where: {
                    and: [
                        { href_matches: "/*/*" }, // /locale/brand or /locale/brand/category
                        { not: { href_matches: "/*/admin/*" } },
                        { not: { href_matches: "/*/*/*/*" } } // Don't duplicate product rules
                    ]
                },
                eagerness: "moderate" // Prefetch on hover instead of click intent
            }
        ]
    };

    // We still depend on pathname to potentially re-trigger rendering if needed by React,
    // though the rules themselves are static.
    if (!pathname) return null;

    return (
        <script
            type="speculationrules"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(rulesJson) }}
        />
    );
}
