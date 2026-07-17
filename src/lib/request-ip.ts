import { isIP } from 'node:net';

function normalizeIp(value: string): string {
    const candidate = value.trim().replace(/^\[|\]$/g, '');
    const withoutPort = candidate.includes('.')
        ? candidate.replace(/:\d+$/, '')
        : candidate;
    return isIP(withoutPort) ? withoutPort : '';
}

/**
 * Return the client address added immediately before the Google frontend hop.
 * This avoids trusting an arbitrary first X-Forwarded-For value supplied by a
 * caller while retaining a safe fallback for local development.
 */
export function getClientIp(headers: Headers): string {
    const forwarded = (headers.get('x-forwarded-for') || '')
        .split(',')
        .map(normalizeIp)
        .filter(Boolean);

    if (forwarded.length >= 2) return forwarded[forwarded.length - 2];
    if (forwarded.length === 1) return forwarded[0];

    return normalizeIp(headers.get('x-real-ip') || '') || 'unknown';
}
