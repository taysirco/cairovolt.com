import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { readFile } from 'fs/promises';
import sharp from 'sharp';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';

/** Optimizes allow-listed local product and content images. */

// Allowed path prefixes for security.
// IMPORTANT: must cover every local path that next/image can request through
// this loader (see src/lib/image-loader.ts + next.config.ts localPatterns).
// '/images/' is required — blog cover heroes (/images/blog/posts/*.webp, the
// LCP element on every blog page), team avatars (/images/team/*) and OG art
// (/images/blog/og/*) all live there. Without it they 403 and fail to load.
const ALLOWED_PREFIXES = ['/products/', '/blog/', '/images/', '/videos/', '/cairovolt_logo'];

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
    const ip = getClientIp(request.headers);
    if (!checkRateLimit(ip, false).allowed) {
        return NextResponse.json(
            { error: 'Too many requests' },
            { status: 429, headers: { 'Retry-After': '60' } },
        );
    }

    const { searchParams } = request.nextUrl;
    const url = searchParams.get('url');
    const w = parseInt(searchParams.get('w') || '0', 10);
    const requestedQuality = parseInt(searchParams.get('q') || '75', 10);

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

    const quality = Number.isFinite(requestedQuality)
        ? Math.max(30, Math.min(90, Math.round(requestedQuality / 5) * 5))
        : 75;

    // The loader sends a root-relative URL. Parse it to remove cache-busting
    // query strings while rejecting protocol-relative and external URLs.
    if (!url.startsWith('/') || url.startsWith('//')) {
        return NextResponse.json({ error: 'Path not allowed' }, { status: 403 });
    }
    let imagePath: string;
    let cacheVersion = '';
    try {
        const parsedUrl = new URL(url, 'https://cairovolt.local');
        imagePath = decodeURIComponent(parsedUrl.pathname);
        const requestedVersion = parsedUrl.searchParams.get('v') || '';
        if (requestedVersion && !/^[A-Za-z0-9._-]{1,32}$/.test(requestedVersion)) {
            return NextResponse.json({ error: 'Invalid image version' }, { status: 400 });
        }
        cacheVersion = requestedVersion;
    } catch {
        return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    if (!ALLOWED_PREFIXES.some(prefix => imagePath.startsWith(prefix))) {
        return NextResponse.json({ error: 'Path not allowed' }, { status: 403 });
    }

    // Prevent directory traversal
    if (imagePath.includes('..') || imagePath.includes('\0')
        || !/\.(?:avif|webp|png|jpe?g)$/i.test(imagePath)) {
        return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const accept = request.headers.get('accept') || '';
    const outputFormat: 'avif' | 'webp' = accept.includes('image/avif') ? 'avif' : 'webp';
    const contentType = outputFormat === 'avif' ? 'image/avif' : 'image/webp';
    const browserCacheControl = cacheVersion
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=86400, stale-while-revalidate=604800';
    const cdnCacheControl = cacheVersion
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=86400, stale-while-revalidate=604800';

    // Check cache
    const cacheKey = `${imagePath}:${cacheVersion || 'unversioned'}:${w}:${quality}:${outputFormat}`;
    const cached = cache.get(cacheKey);
    if (cached) {
        return new NextResponse(cached.buffer as unknown as BodyInit, {
            headers: {
                'Content-Type': cached.contentType,
                'Cache-Control': browserCacheControl,
                'CDN-Cache-Control': cdnCacheControl,
                'Vary': 'Accept',
                'X-Image-Optimized': 'hit',
            },
        });
    }

    try {
        // Read source file from public directory
        const filePath = join(process.cwd(), 'public', imagePath);
        const fileBuffer = await readFile(filePath);

        // Process with sharp
        let pipeline = sharp(fileBuffer)
            .resize(w, undefined, { fit: 'inside', withoutEnlargement: true });

        if (outputFormat === 'avif') {
            pipeline = pipeline.avif({ quality, effort: 4 });
        } else if (outputFormat === 'webp') {
            pipeline = pipeline.webp({ quality, effort: 4 });
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
                'Cache-Control': browserCacheControl,
                'CDN-Cache-Control': cdnCacheControl,
                'Vary': 'Accept',
                'X-Image-Optimized': 'miss',
                'X-Original-Size': String(fileBuffer.length),
                'X-Optimized-Size': String(optimizedBuffer.length),
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : '';
        if (message.includes('ENOENT')) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }
        console.error('[/api/img] Image optimization failed.');
        return NextResponse.json({ error: 'Failed to optimize image' }, { status: 500 });
    }
}
