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
                // Aggressively prerender product pages when hovered
                source: "document",
                where: {
                    and: [
                        { href_matches: "/*/*/*/*" }, // Matches /locale/brand/category/slug
                        { not: { href_matches: "/*/admin/*" } }
                    ]
                },
                eagerness: "moderate" // Prerender on hover/pointerdown
            }
        ],
        prefetch: [
            {
                // Prefetch category and brand hubs just by being on the screen
                source: "document",
                where: {
                    and: [
                        { href_matches: "/*/*" }, // Matches /locale/brand or /locale/brand/category
                        { not: { href_matches: "/*/admin/*" } }
                    ]
                },
                eagerness: "conservative" // Prefetch on pointer hover
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
