import { createHash, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API Key Authentication for Write Operations
 * 
 * Catalogue read endpoints (GET) are public.
 * Write endpoints (POST/PUT/DELETE) on /api/products and /api/categories
 * require a valid API key via the X-API-Key header.
 * 
 * The checkout endpoint is customer-facing, like the website checkout. It
 * remains public while validating catalogue prices and quantities and applying
 * server-side input limits and rate limits.
 * 
 * Set the API key via environment variable:
 *   CAIROVOLT_API_KEY="your-strong-secret-here"
 */

const API_KEY_HEADER = 'x-api-key';

/**
 * Compare secrets without leaking how many leading characters matched.
 * Hashing first gives timingSafeEqual fixed-size buffers for every input.
 */
export function safeSecretEqual(provided: string, expected: string): boolean {
    const providedDigest = createHash('sha256').update(provided, 'utf8').digest();
    const expectedDigest = createHash('sha256').update(expected, 'utf8').digest();

    return timingSafeEqual(providedDigest, expectedDigest);
}

export function hasValidApiKey(req: NextRequest): boolean {
    const apiKey = process.env.CAIROVOLT_API_KEY;
    const providedKey = req.headers.get(API_KEY_HEADER);

    return Boolean(apiKey && providedKey && safeSecretEqual(providedKey, apiKey));
}

export function validateApiKey(req: NextRequest): NextResponse | null {
    const apiKey = process.env.CAIROVOLT_API_KEY;

    if (!apiKey) {
        return NextResponse.json({
            error: 'Authentication unavailable',
        }, {
            status: 503,
            headers: { 'Cache-Control': 'no-store' },
        });
    }

    const providedKey = req.headers.get(API_KEY_HEADER);

    if (!providedKey) {
        return NextResponse.json({
            error: 'Authentication required',
            message: 'Provide API key via X-API-Key header',
        }, {
            status: 401,
            headers: { 'Cache-Control': 'no-store' },
        });
    }

    if (!safeSecretEqual(providedKey, apiKey)) {
        return NextResponse.json({
            error: 'Invalid API key',
        }, {
            status: 403,
            headers: { 'Cache-Control': 'no-store' },
        });
    }

    return null; // Auth passed
}
