/**
 * CairoVolt Service Worker — Instant Repeat Visits
 * 
 * Strategy:
 * - App Shell (layout, fonts, CSS): Cache First — instant load
 * - Product Images: Cache First — never re-download
 * - API Routes: Network First — always fresh data
 * - HTML Pages: Stale-While-Revalidate — instant load + background refresh
 * 
 * Result: Repeat visits load in ~0ms (from cache)
 */

const CACHE_NAME = 'cairovolt-v2';
const STATIC_CACHE = 'cairovolt-static-v2';
const IMG_CACHE = 'cairovolt-images-v2';

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
                    .filter((key) => key !== CACHE_NAME && key !== STATIC_CACHE && key !== IMG_CACHE)
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

    // Strategy routing
    if (isImageRequest(url)) {
        event.respondWith(cacheFirst(request, IMG_CACHE, 365 * 24 * 60 * 60));
    } else if (isStaticAsset(url)) {
        event.respondWith(cacheFirst(request, STATIC_CACHE, 365 * 24 * 60 * 60));
    } else if (isNavigationRequest(request)) {
        event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
    }
});

// ── Strategies ──

async function cacheFirst(request, cacheName, maxAge) {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        return new Response('Offline', { status: 503 });
    }
}

async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    // Start network fetch in background
    const networkPromise = fetch(request).then((response) => {
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    }).catch(() => cached || new Response('Offline', { status: 503 }));

    // Return cached immediately, or wait for network
    return cached || networkPromise;
}

// ── Classifiers ──

function isImageRequest(url) {
    return (
        url.pathname.startsWith('/api/img') ||
        url.pathname.startsWith('/products/') ||
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
