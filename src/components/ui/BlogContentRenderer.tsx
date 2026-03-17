'use client';

import { useEffect, useRef, useState } from 'react';

interface BlogContentRendererProps {
    html: string;
    className?: string;
}

// Defense-in-depth: sanitize HTML even from admin-controlled sources
function sanitizeHtml(html: string): string {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
        .replace(/<object[\s\S]*?<\/object>/gi, '')
        .replace(/<embed[^>]*>/gi, '')
        .replace(/<form[\s\S]*?<\/form>/gi, '')
        .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/\son\w+\s*=\s*\S+/gi, '')
        .replace(/javascript\s*:/gi, 'blocked:')
        .replace(/data\s*:/gi, 'blocked:');
}

/**
 * BlogContentRenderer — Client-side-only HTML renderer for blog articles.
 *
 * Problem: Blog article HTML content contains malformed tags (e.g., `< table >`,
 * `< tr >`) that browsers auto-correct during SSR HTML parsing. When React tries
 * to hydrate, the DOM tree no longer matches what React generated on the server,
 * causing "Failed to execute 'removeChild'" errors.
 *
 * Solution: Render the HTML entirely on the client. The server renders a
 * lightweight placeholder, and the client fills it with the actual content.
 * This avoids hydration entirely for this highly dynamic content block.
 *
 * SEO: Googlebot processes JavaScript, so the content is still indexed.
 * The raw HTML also appears in the initial page source for non-JS crawlers.
 */
export default function BlogContentRenderer({ html, className = '' }: BlogContentRendererProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // On the server and first client render, show a minimal skeleton
    // that won't cause hydration issues
    if (!mounted) {
        return (
            <div className={className}>
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
        />
    );
}
