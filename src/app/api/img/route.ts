import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { readFile } from 'fs/promises';
import sharp from 'sharp';

/**
 * Custom Image Optimization API Route
 * 
 * Replaces the broken /_next/image endpoint on Firebase App Hosting.
 * Accepts: /api/img?url=/products/...&w=256&q=75
 * Returns: Optimized WebP image at requested width.
 * 
 * Security: Only allows /products/** and /blog/** paths.
 * Caching: immutable, 1-year browser cache.
 */

// Allowed path prefixes for security.
// IMPORTANT: must cover every local path that next/image can request through
// this loader (see src/lib/image-loader.ts + next.config.ts localPatterns).
// '/images/' is required — blog cover heroes (/images/blog/posts/*.webp, the
// LCP element on every blog page), team avatars (/images/team/*) and OG art
// (/images/blog/og/*) all live there. Without it they 403 and fail to load.
const ALLOWED_PREFIXES = ['/products/', '/blog/', '/images/', '/cairovolt_logo'];

// Valid widths (next.config.ts deviceSizes + imageSizes + fixed image widths)
const VALID_WIDTHS = new Set([64, 80, 96, 128, 160, 256, 320, 384, 360, 414, 640, 750, 828, 1080, 1200, 1920]);

// In-memory LRU cache for hot images. Each instance re-optimizes an image with
// sharp only on a cold cache miss; thereafter it serves from RAM (and Cloudflare
// edge-caches the immutable response on top). Bumped 100→300 so a single instance
// holds more of the hot set across the homepage/category/product/blog grids
// before evicting. ~300 small resized webp/avif buffers fit comfortably in the
// 2GB instance.
const cache = new Map<string, { buffer: Uint8Array; contentType: string }>();
const MAX_CACHE = 300;

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const url = searchParams.get('url');
    const w = parseInt(searchParams.get('w') || '0', 10);
    const q = parseInt(searchParams.get('q') || '75', 10);

    // Validate parameters
    if (!url) {
        return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
    }

    if (!VALID_WIDTHS.has(w)) {
        return NextResponse.json(
            { error: `Invalid width. Allowed: ${[...VALID_WIDTHS].sort((a, b) => a - b).join(', ')}` },
            { status: 400 }
        );
    }

    const quality = Math.max(1, Math.min(100, q));

    // Security: only allow whitelisted paths
    const decodedUrl = decodeURIComponent(url);
    if (!ALLOWED_PREFIXES.some(prefix => decodedUrl.startsWith(prefix))) {
        return NextResponse.json({ error: 'Path not allowed' }, { status: 403 });
    }

    // Prevent directory traversal
    if (decodedUrl.includes('..') || decodedUrl.includes('\0')) {
        return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    // Check cache
    const cacheKey = `${decodedUrl}:${w}:${quality}`;
    const cached = cache.get(cacheKey);
    if (cached) {
        return new NextResponse(cached.buffer as unknown as BodyInit, {
            headers: {
                'Content-Type': cached.contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
                'CDN-Cache-Control': 'public, max-age=31536000',
                'X-Image-Optimized': 'hit',
            },
        });
    }

    try {
        // Read source file from public directory
        const filePath = join(process.cwd(), 'public', decodedUrl);
        const fileBuffer = await readFile(filePath);

        // Detect if input is already WebP/AVIF
        const isWebP = decodedUrl.endsWith('.webp');
        const isAvif = decodedUrl.endsWith('.avif');

        // Determine output format based on Accept header
        const accept = request.headers.get('accept') || '';
        let outputFormat: 'avif' | 'webp' | 'jpeg' = 'webp';
        let contentType = 'image/webp';

        if (accept.includes('image/avif') && !isAvif) {
            outputFormat = 'avif';
            contentType = 'image/avif';
        } else if (isWebP || accept.includes('image/webp')) {
            outputFormat = 'webp';
            contentType = 'image/webp';
        }

        // Process with sharp
        let pipeline = sharp(fileBuffer)
            .resize(w, undefined, { fit: 'inside', withoutEnlargement: true });

        if (outputFormat === 'avif') {
            pipeline = pipeline.avif({ quality, effort: 4 });
        } else if (outputFormat === 'webp') {
            pipeline = pipeline.webp({ quality, effort: 4 });
        } else {
            pipeline = pipeline.jpeg({ quality, mozjpeg: true });
        }

        const optimizedBuffer = new Uint8Array(await pipeline.toBuffer());

        // Update cache (evict oldest if full)
        if (cache.size >= MAX_CACHE) {
            const firstKey = cache.keys().next().value;
            if (firstKey) cache.delete(firstKey);
        }
        cache.set(cacheKey, { buffer: optimizedBuffer, contentType });

        return new NextResponse(optimizedBuffer as unknown as BodyInit, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
                'CDN-Cache-Control': 'public, max-age=31536000',
                'Vary': 'Accept',
                'X-Image-Optimized': 'miss',
                'X-Original-Size': String(fileBuffer.length),
                'X-Optimized-Size': String(optimizedBuffer.length),
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        if (message.includes('ENOENT')) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }
        console.error('[/api/img] Error optimizing image:', message);
        return NextResponse.json({ error: 'Failed to optimize image' }, { status: 500 });
    }
}
