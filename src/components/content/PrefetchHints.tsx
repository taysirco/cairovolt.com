'use client';

import { useEffect } from 'react';

// Speculation Rules API — instructs the browser to prefetch/prerender likely
// next navigations in the background for a near-0ms feel. Rules are STATIC, so
// they live at module scope and are inserted exactly once.
const rulesJson = {
    prerender: [
        {
            // Product pages — prerender on hover/pointerdown (moderate)
            source: 'document',
            where: {
                and: [
                    { href_matches: '/*/*/*/*' }, // /locale/brand/category/slug
                    { not: { href_matches: '/*/admin/*' } },
                    { not: { href_matches: '/*/checkout*' } },
                    { not: { href_matches: '/*/confirm*' } },
                    { not: { href_matches: '/*/verify*' } },
                ],
            },
            eagerness: 'moderate',
        },
        {
            // Category & brand pages — prerender on hover
            source: 'document',
            where: {
                and: [
                    { href_matches: '/*/*' },
                    { not: { href_matches: '/*/*/*/*' } },
                    { not: { href_matches: '/*/admin/*' } },
                    { not: { href_matches: '/*/checkout*' } },
                    { not: { href_matches: '/*/blog*' } },
                ],
            },
            eagerness: 'moderate',
        },
        {
            // Location pages — prerender on hover
            source: 'document',
            where: {
                and: [
                    { href_matches: '/*/locations/*' },
                    { not: { href_matches: '/*/admin/*' } },
                ],
            },
            eagerness: 'moderate',
        },
    ],
    prefetch: [
        {
            // All internal links — prefetch on intent (hover/pointerdown), NOT on load.
            source: 'document',
            where: {
                and: [
                    { href_matches: '/*' },
                    { not: { href_matches: '/*/admin/*' } },
                    { not: { href_matches: '/*/checkout*' } },
                    { not: { href_matches: '/*/confirm*' } },
                ],
            },
            eagerness: 'moderate',
        },
    ],
};

export default function PrefetchHints() {
    useEffect(() => {
        // A <script type="speculationrules"> set via innerHTML / dangerouslySetInnerHTML
        // is IGNORED by Chrome ("inserted using the innerHTML setter" warning). The rules
        // are only honored when the element is created programmatically, so build it with
        // createElement + textContent. Feature-detect first so unsupported browsers no-op.
        if (typeof HTMLScriptElement === 'undefined'
            || typeof HTMLScriptElement.supports !== 'function'
            || !HTMLScriptElement.supports('speculationrules')) {
            return;
        }

        const script = document.createElement('script');
        script.type = 'speculationrules';
        script.textContent = JSON.stringify(rulesJson);
        document.body.appendChild(script);

        return () => {
            script.remove();
        };
    }, []);

    return null;
}
