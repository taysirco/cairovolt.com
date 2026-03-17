import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

/**
 * API Key Authentication for Write Operations
 * 
 * Read endpoints (GET) remain public for AI agents.
 * Write endpoints (POST/PUT/DELETE) on /api/products and /api/categories
 * require a valid API key via the X-API-Key header.
 * 
 * The M2M checkout endpoint (/api/v1/checkout) is intentionally public
 * to allow AI agents to place orders without authentication.
 * 
 * Set the API key via environment variable:
 *   CAIROVOLT_API_KEY="your-strong-secret-here"
 */

const API_KEY_HEADER = 'x-api-key';

export function validateApiKey(req: NextRequest): NextResponse | null {
    const apiKey = process.env.CAIROVOLT_API_KEY;

    // If no API key is configured, skip auth (development mode)
    if (!apiKey) {
        logger.warn('CAIROVOLT_API_KEY not set — write APIs are unprotected');
        return null;
    }

    const providedKey = req.headers.get(API_KEY_HEADER);

    if (!providedKey) {
        return NextResponse.json({
            error: 'Authentication required',
            message: 'Provide API key via X-API-Key header',
            docs: 'https://cairovolt.com/api/openapi.json',
        }, { status: 401 });
    }

    if (providedKey !== apiKey) {
        return NextResponse.json({
            error: 'Invalid API key',
        }, { status: 403 });
    }

    return null; // Auth passed
}
