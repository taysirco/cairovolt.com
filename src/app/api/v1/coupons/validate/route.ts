/** Public checkout coupon validation endpoint. */
import { NextRequest, NextResponse } from 'next/server';
import { validateCoupon } from '@/lib/coupons';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';

export async function POST(req: NextRequest) {
    const ip = getClientIp(req.headers);
    if (!checkRateLimit(ip, true).allowed) {
        return NextResponse.json(
            { valid: false, error: 'Too many requests' },
            { status: 429, headers: { 'Retry-After': '60', 'Cache-Control': 'no-store' } },
        );
    }

    const contentLength = Number(req.headers.get('content-length') || 0);
    if (Number.isFinite(contentLength) && contentLength > 4096) {
        return NextResponse.json(
            { valid: false, error: 'Request too large' },
            { status: 413, headers: { 'Cache-Control': 'no-store' } },
        );
    }

    let code = '';
    try {
        const rawBody = await req.text();
        if (Buffer.byteLength(rawBody, 'utf8') > 4096) {
            return NextResponse.json(
                { valid: false, error: 'Request too large' },
                { status: 413, headers: { 'Cache-Control': 'no-store' } },
            );
        }
        const body = JSON.parse(rawBody);
        code = String(body?.code || '').trim().toUpperCase();
    } catch {
        return NextResponse.json(
            { valid: false, error: 'Invalid request' },
            { status: 400, headers: { 'Cache-Control': 'no-store' } },
        );
    }
    if (!/^[A-Z0-9_-]{3,24}$/.test(code)) {
        return NextResponse.json(
            { valid: false, type: 'percent', value: 0 },
            { headers: { 'Cache-Control': 'no-store' } },
        );
    }
    const v = await validateCoupon(code);
    return NextResponse.json(
        { valid: v.valid, type: v.type, value: v.value },
        { headers: { 'Cache-Control': 'no-store' } },
    );
}
