import { NextRequest, NextResponse } from 'next/server';
import {
    ADMIN_SESSION_COOKIE,
    ADMIN_SESSION_MAX_AGE_SECONDS,
    createAdminSessionToken,
    getAdminSessionSecret,
    getAdminTasksSecret,
    isAdminSessionValid,
} from '@/lib/admin-session';
import { safeSecretEqual } from '@/lib/api-auth';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';

export const runtime = 'nodejs';

const NO_STORE_HEADERS = {
    'Cache-Control': 'private, no-store, no-cache, max-age=0, must-revalidate',
    'Pragma': 'no-cache',
};
const MAX_SESSION_BODY_BYTES = 2 * 1024;
const MAX_SECRET_LENGTH = 512;

function rateLimitResponse(req: NextRequest, isWrite: boolean): NextResponse | null {
    const result = checkRateLimit(`admin-session:${getClientIp(req.headers)}`, isWrite);
    if (result.allowed) return null;

    return NextResponse.json(
        { error: 'Too many requests' },
        {
            status: 429,
            headers: { ...NO_STORE_HEADERS, 'Retry-After': '60' },
        },
    );
}

export async function POST(req: NextRequest) {
    const limited = rateLimitResponse(req, true);
    if (limited) return limited;

    const signingSecret = getAdminSessionSecret();
    const loginSecret = getAdminTasksSecret();
    if (!signingSecret || !loginSecret) {
        return NextResponse.json(
            { error: 'Authentication unavailable' },
            { status: 503, headers: NO_STORE_HEADERS },
        );
    }

    const declaredLength = Number(req.headers.get('content-length') || 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_SESSION_BODY_BYTES) {
        return NextResponse.json(
            { error: 'Request payload is too large' },
            { status: 413, headers: NO_STORE_HEADERS },
        );
    }

    let rawBody = '';
    try {
        rawBody = await req.text();
    } catch {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400, headers: NO_STORE_HEADERS },
        );
    }

    if (Buffer.byteLength(rawBody, 'utf8') > MAX_SESSION_BODY_BYTES) {
        return NextResponse.json(
            { error: 'Request payload is too large' },
            { status: 413, headers: NO_STORE_HEADERS },
        );
    }

    let providedSecret = '';
    try {
        const body: unknown = JSON.parse(rawBody);
        if (!body || typeof body !== 'object' || Array.isArray(body)) {
            throw new Error('Invalid request');
        }
        const candidate = (body as { secret?: unknown }).secret;
        providedSecret = typeof candidate === 'string' ? candidate : '';
    } catch {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400, headers: NO_STORE_HEADERS },
        );
    }

    if (!providedSecret
        || providedSecret.length > MAX_SECRET_LENGTH
        || !safeSecretEqual(providedSecret, loginSecret)) {
        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401, headers: NO_STORE_HEADERS },
        );
    }

    const response = NextResponse.json({
        success: true,
        expiresIn: ADMIN_SESSION_MAX_AGE_SECONDS,
    }, { headers: NO_STORE_HEADERS });

    response.cookies.set({
        name: ADMIN_SESSION_COOKIE,
        value: createAdminSessionToken(signingSecret),
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
        priority: 'high',
    });

    return response;
}

export function GET(req: NextRequest) {
    const limited = rateLimitResponse(req, false);
    if (limited) return limited;

    return NextResponse.json(
        { authenticated: isAdminSessionValid(req) },
        { headers: NO_STORE_HEADERS },
    );
}

export function DELETE(req: NextRequest) {
    const limited = rateLimitResponse(req, true);
    if (limited) return limited;

    const response = NextResponse.json(
        { success: true },
        { headers: NO_STORE_HEADERS },
    );

    response.cookies.set({
        name: ADMIN_SESSION_COOKIE,
        value: '',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
        expires: new Date(0),
        priority: 'high',
    });

    return response;
}
