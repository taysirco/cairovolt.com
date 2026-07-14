/**
 * Simple in-memory rate limiter for API routes
 * 
 * Limits:
 *   - Read  (GET):  120 requests per minute per IP
 *   - Write (POST/PUT/DELETE): 20 requests per minute per IP
 * 
 * Uses a sliding window approach with automatic cleanup.
 * For production at scale, consider Redis-based rate limiting.
 */

interface RateLimitEntry {
    count: number;
    resetAt: number;
}

const readStore = new Map<string, RateLimitEntry>();
const writeStore = new Map<string, RateLimitEntry>();

const READ_LIMIT = 120;   // requests per window
const WRITE_LIMIT = 20;   // requests per window
const WINDOW_MS = 60_000; // 1 minute

// Lazy cleanup — runs inline instead of setInterval to avoid serverless memory leaks
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 5 * 60_000; // 5 minutes

function cleanupIfNeeded() {
    const now = Date.now();
    if (now - lastCleanup < CLEANUP_INTERVAL) return;
    lastCleanup = now;
    for (const [key, entry] of readStore) {
        if (now > entry.resetAt) readStore.delete(key);
    }
    for (const [key, entry] of writeStore) {
        if (now > entry.resetAt) writeStore.delete(key);
    }
}

export interface RateLimitResult {
    allowed: boolean;
    limit: number;
    remaining: number;
    resetAt: number;
}

export function checkRateLimit(ip: string, isWrite: boolean): RateLimitResult {
    cleanupIfNeeded();
    const store = isWrite ? writeStore : readStore;
    const limit = isWrite ? WRITE_LIMIT : READ_LIMIT;
    const now = Date.now();

    let entry = store.get(ip);

    if (!entry || now > entry.resetAt) {
        entry = { count: 0, resetAt: now + WINDOW_MS };
        store.set(ip, entry);
    }

    entry.count++;

    return {
        allowed: entry.count <= limit,
        limit,
        remaining: Math.max(0, limit - entry.count),
        resetAt: entry.resetAt,
    };
}
