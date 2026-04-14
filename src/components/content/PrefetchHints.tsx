'use client';

import { usePathname } from 'next/navigation';

export default function PrefetchHints() {
    const pathname = usePathname();

    // Speculation Rules API - Supported natively in Chrome 109+
    // This instructs the browser to download and render the linked pages
    // IN THE BACKGROUND before the user even clicks them.
    // It provides a "zero latency" feel (0ms navigation time).
    const rulesJson = {
        prerender: [
            {
                // Product pages — prerender on hover/pointerdown (moderate)
                // Previously "eager" which wasted bandwidth by prerending ALL visible product links.
                // "moderate" activates on hover intent — still gives 0ms navigation for intentional clicks.
                source: "document",
                where: {
                    and: [
                        { href_matches: "/*/*/*/*" }, // /locale/brand/category/slug
                        { not: { href_matches: "/*/admin/*" } },
                        { not: { href_matches: "/*/checkout*" } },
                        { not: { href_matches: "/*/confirm*" } },
                        { not: { href_matches: "/*/verify*" } }
                    ]
                },
                eagerness: "moderate" // Prerender on hover — saves ~2-5MB bandwidth vs eager
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
                // Category and brand hubs — prefetch eagerly (lightweight RSC payloads)
                // These pages are small and frequently accessed from any product page.
                source: "document",
                where: {
                    and: [
                        { href_matches: "/*/*" }, // /locale/brand or /locale/brand/category
                        { not: { href_matches: "/*/admin/*" } },
                        { not: { href_matches: "/*/checkout*" } },
                        { not: { href_matches: "/*/confirm*" } },
                        { not: { href_matches: "/*/*/*/*" } } // Don't duplicate product rules
                    ]
                },
                eagerness: "eager" // Prefetch immediately — category pages are small
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
