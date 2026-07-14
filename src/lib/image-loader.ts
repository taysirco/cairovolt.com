/**
 * Custom Image Loader for Next.js
 * 
 * Routes image optimization through /api/img instead of the broken /_next/image
 * endpoint on Firebase App Hosting.
 * 
 * @see next.config.ts — images.loaderFile
 * @see /api/img/route.ts — the actual optimization handler
 */

'use client';

interface ImageLoaderParams {
    src: string;
    width: number;
    quality?: number;
}

export default function imageLoader({ src, width, quality }: ImageLoaderParams): string {
    // External URLs — pass through unchanged
    if (src.startsWith('http://') || src.startsWith('https://')) {
        return src;
    }

    // Data URLs and blob URLs — pass through
    if (src.startsWith('data:') || src.startsWith('blob:')) {
        return src;
    }

    // Route local images through our custom optimizer
    const q = quality || 75;
    return `/api/img?url=${encodeURIComponent(src)}&w=${width}&q=${q}`;
}
