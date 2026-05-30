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
                // Gives 0ms navigation for intentional clicks
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
                eagerness: "moderate"
            },
            {
                // Category & brand pages — prerender on hover
                source: "document",
                where: {
                    and: [
                        { href_matches: "/*/*" },
                        { not: { href_matches: "/*/*/*/*" } },
                        { not: { href_matches: "/*/admin/*" } },
                        { not: { href_matches: "/*/checkout*" } },
                        { not: { href_matches: "/*/blog*" } }
                    ]
                },
                eagerness: "moderate"
            },
            {
                // Location pages — prerender on hover
                source: "document",
                where: {
                    and: [
                        { href_matches: "/*/locations/*" },
                        { not: { href_matches: "/*/admin/*" } }
                    ]
                },
                eagerness: "moderate"
            }
        ],
        prefetch: [
            {
                // All internal links — prefetch on intent (hover/pointerdown), NOT on load.
                // "eager" used to prefetch every link the moment the page rendered, which
                // on slow connections saturated bandwidth for ~4.5s and wrecked LCP/TBT.
                // "moderate" fires on hover/pointerdown — same instant feel, zero load cost.
                source: "document",
                where: {
                    and: [
                        { href_matches: "/*" },
                        { not: { href_matches: "/*/admin/*" } },
                        { not: { href_matches: "/*/checkout*" } },
                        { not: { href_matches: "/*/confirm*" } }
                    ]
                },
                eagerness: "moderate"
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
