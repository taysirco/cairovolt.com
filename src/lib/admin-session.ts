import 'server-only';

import { createHmac, randomBytes } from 'node:crypto';
import { NextRequest } from 'next/server';
import { safeSecretEqual } from '@/lib/api-auth';

export const ADMIN_SESSION_COOKIE = '__Host-cv_admin_session';
export const ADMIN_SESSION_MAX_AGE_SECONDS = 2 * 60 * 60;

const TOKEN_VERSION = 'v1';
const MIN_ADMIN_SECRET_LENGTH = 32;
const MAX_ADMIN_SECRET_LENGTH = 512;

export function getAdminSessionSecret(): string | null {
    const secret = process.env.ADMIN_SESSION_SECRET;
    return secret
        && secret.length >= MIN_ADMIN_SECRET_LENGTH
        && secret.length <= MAX_ADMIN_SECRET_LENGTH
        ? secret
        : null;
}

export function getAdminTasksSecret(): string | null {
    const secret = process.env.ADMIN_TASKS_SECRET;
    return secret
        && secret.length >= MIN_ADMIN_SECRET_LENGTH
        && secret.length <= MAX_ADMIN_SECRET_LENGTH
        ? secret
        : null;
}

function signPayload(payload: string, secret: string): string {
    return createHmac('sha256', secret).update(payload, 'utf8').digest('base64url');
}

export function createAdminSessionToken(secret: string): string {
    const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE_SECONDS;
    const nonce = randomBytes(18).toString('base64url');
    const payload = `${TOKEN_VERSION}.${expiresAt}.${nonce}`;
    const signature = signPayload(payload, secret);

    return `${payload}.${signature}`;
}

export function isAdminSessionValid(req: NextRequest): boolean {
    const secret = getAdminSessionSecret();
    const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (!secret || !token) return false;

    const parts = token.split('.');
    if (parts.length !== 4) return false;

    const [version, expiresAtRaw, nonce, providedSignature] = parts;
    if (
        version !== TOKEN_VERSION
        || !/^\d+$/.test(expiresAtRaw)
        || !/^[A-Za-z0-9_-]{24}$/.test(nonce)
        || !/^[A-Za-z0-9_-]{43}$/.test(providedSignature)
    ) {
        return false;
    }

    const expiresAt = Number(expiresAtRaw);
    const now = Math.floor(Date.now() / 1000);
    if (!Number.isSafeInteger(expiresAt)
        || expiresAt <= now
        || expiresAt > now + ADMIN_SESSION_MAX_AGE_SECONDS + 5) {
        return false;
    }

    const payload = `${version}.${expiresAtRaw}.${nonce}`;
    const expectedSignature = signPayload(payload, secret);

    return safeSecretEqual(providedSignature, expectedSignature);
}

export function isAdminRequestAuthorized(req: NextRequest): boolean {
    if (isAdminSessionValid(req)) return true;

    const secret = getAdminTasksSecret();
    const authorization = req.headers.get('authorization') || '';
    const bearer = authorization.match(/^Bearer\s+([^\s]+)$/i)?.[1] || '';

    return Boolean(
        secret
        && bearer
        && bearer.length <= MAX_ADMIN_SECRET_LENGTH
        && safeSecretEqual(bearer, secret),
    );
}

/**
 * Authenticate scheduled/admin automation independently from browser sessions.
 * Bearer or X-Admin-Task-Secret is preferred. The query parameter keeps the
 * existing scheduler compatible until its configuration is rotated.
 */
export function isAdminTaskRequestAuthorized(req: NextRequest): boolean {
    const secret = getAdminTasksSecret();
    if (!secret) return false;

    const authorization = req.headers.get('authorization') || '';
    const bearer = authorization.match(/^Bearer\s+([^\s]+)$/i)?.[1] || '';
    const headerSecret = req.headers.get('x-admin-task-secret') || '';
    const legacyQuerySecret = req.nextUrl.searchParams.get('key') || '';
    const provided = bearer || headerSecret || legacyQuerySecret;

    return Boolean(
        provided
        && provided.length <= MAX_ADMIN_SECRET_LENGTH
        && safeSecretEqual(provided, secret),
    );
}
