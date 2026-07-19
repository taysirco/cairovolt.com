/**
 * CairoVolt Service Worker v6 — Fast, validated media
 *
 * Strategy:
 * - App Shell (layout, fonts, CSS): Cache First
 * - Product Images: Cache First after MIME validation
 * - API Routes: Network Only — always fresh data
 * - HTML Pages: Network First (cache = offline fallback only)
 * - Cloudflare-aware: respects cf-cache-status headers
 *
 * NOTE: HTML is Network First — not Stale-While-Revalidate — because a
 * navigation response carries security headers (Content-Security-Policy, etc.).
 * Serving a stale cached page would enforce a STALE CSP and could block newly
 * allowlisted scripts (e.g. Google/Facebook sign-in). The origin already marks
 * HTML `no-store`/DYNAMIC, so it is meant to be fresh; the SW cache is kept only
 * as an offline fallback. Static/versioned assets stay Cache First (instant).
 *
 * Cached assets can reduce repeat-visit network work.
 */

const CACHE_VERSION = 'v6';
const CACHE_NAME = `cairovolt-${CACHE_VERSION}`;
const STATIC_CACHE = `cairovolt-static-${CACHE_VERSION}`;
const IMG_CACHE = `cairovolt-images-${CACHE_VERSION}`;

// Max items per cache to prevent unbounded growth
const MAX_IMAGES = 200;
const MAX_PAGES = 50;

// Critical shell assets to pre-cache on install
const SHELL_ASSETS = [
    '/',
    '/manifest.json',
];

// Install — pre-cache shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            return cache.addAll(SHELL_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => !key.endsWith(CACHE_VERSION))
                    .map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch handler — routing strategy
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip API routes (except /api/img which is cacheable)
    if (url.pathname.startsWith('/api/') && !url.pathname.startsWith('/api/img')) return;

    // Skip external requests
    if (url.origin !== self.location.origin) return;

    // Skip __firebase internals
    if (url.pathname.startsWith('/__firebase')) return;

    // Strategy routing
    if (isImageRequest(url)) {
        event.respondWith(cacheFirstImage(request, IMG_CACHE, MAX_IMAGES));
    } else if (isStaticAsset(url)) {
        event.respondWith(cacheFirst(request, STATIC_CACHE));
    } else if (isNavigationRequest(request)) {
        event.respondWith(networkFirst(request, CACHE_NAME, MAX_PAGES));
    }
});

// ── Strategies ──

async function cacheFirst(request, cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    if (cached) return cached;

    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
            // Evict oldest if over limit
            if (maxItems) trimCache(cacheName, maxItems);
        }
        return response;
    } catch {
        return new Response('Offline', { status: 503 });
    }
}

function isValidImageResponse(response) {
    return response.ok && response.headers.get('content-type')?.toLowerCase().startsWith('image/');
}

async function fetchValidatedImage(request) {
    const response = await fetch(request);
    if (isValidImageResponse(response)) return response;

    // A stale edge can occasionally return an HTML fallback with status 200
    // for an image URL. Retry with a versioned query key to refresh the object.
    const retryUrl = new URL(request.url);
    retryUrl.searchParams.set('cv-image-retry', CACHE_VERSION);
    const retryRequest = new Request(retryUrl.toString(), {
        method: 'GET',
        headers: request.headers,
        mode: request.mode,
        credentials: request.credentials,
        redirect: request.redirect,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
        cache: 'reload',
    });
    const retryResponse = await fetch(retryRequest);
    return isValidImageResponse(retryResponse) ? retryResponse : response;
}

async function cacheFirstImage(request, cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    if (cached) {
        if (isValidImageResponse(cached)) return cached;
        await cache.delete(request);
    }

    try {
        const response = await fetchValidatedImage(request);
        if (isValidImageResponse(response)) {
            await cache.put(request, response.clone());
            if (maxItems) trimCache(cacheName, maxItems);
        }
        return response;
    } catch {
        return new Response('Offline', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
    }
}

// HTML navigations: always try the network first so the page (and its
// security headers like CSP) is fresh. Fall back to the cached copy only when
// offline. This avoids serving a stale page whose old CSP would block newly
// allowlisted scripts (Google/Facebook sign-in).
async function networkFirst(request, cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
            if (maxItems) trimCache(cacheName, maxItems);
        }
        return response;
    } catch {
        const cached = await cache.match(request);
        return cached || new Response('Offline', { status: 503 });
    }
}

// ── Cache Management ──

async function trimCache(cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxItems) {
        // Delete oldest entries (FIFO)
        const toDelete = keys.length - maxItems;
        for (let i = 0; i < toDelete; i++) {
            await cache.delete(keys[i]);
        }
    }
}

// ── Classifiers ──

function isImageRequest(url) {
    return (
        url.pathname.startsWith('/api/img') ||
        url.pathname.startsWith('/products/') ||
        url.pathname.startsWith('/images/') ||
        /\.(webp|avif|jpg|jpeg|png|svg|ico)$/.test(url.pathname)
    );
}

function isStaticAsset(url) {
    return (
        url.pathname.startsWith('/_next/static/') ||
        /\.(js|css|woff2?|json)$/.test(url.pathname)
    );
}

function isNavigationRequest(request) {
    return request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html');
}
