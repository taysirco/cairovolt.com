/**
 * 🔐 /api/admin/sso — دخول موحّد للوحات المتجر من لوحة الحسابات (CRM) بلا مفتاح.
 *
 * الـCRM (مصادَق كدور accounting) يولّد رمزاً قصير العمر موقّعاً HMAC بالسرّ المشترك
 * (ADMIN_TASKS_SECRET = STORE_ADMIN_SECRET) ويفتح هذا الرابط؛ هنا نتحقق من التوقيع
 * والصلاحية ثم نُنشئ جلسة أدمن (نفس كوكي /api/admin/session) ونحوّل للّوحة المطلوبة.
 * لا يُكشف السرّ للمتصفح إطلاقاً، والرمز يصلح 60 ثانية لمرة واحدة فعلياً.
 */
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import {
    ADMIN_SESSION_COOKIE,
    ADMIN_SESSION_MAX_AGE_SECONDS,
    createAdminSessionToken,
    getAdminSessionSecret,
    getAdminTasksSecret,
} from '@/lib/admin-session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TARGETS: Record<string, string> = {
    wholesale: '/admin/wholesale',
    moderation: '/admin/moderation',
};

const fail = (msg: string, status = 401) =>
    new NextResponse(msg, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const target = params.get('target') || 'wholesale';
    const token = params.get('token') || '';
    const dest = TARGETS[target] || '/admin/wholesale';

    const signingSecret = getAdminSessionSecret();
    const sharedSecret = getAdminTasksSecret();
    if (!signingSecret || !sharedSecret) return fail('SSO غير متاح', 503);

    // token = <expMs>.<hmacHex>   ،  hmac = HMAC-SHA256(shared, target + '|' + expMs)
    const dot = token.indexOf('.');
    const expMs = dot > 0 ? parseInt(token.slice(0, dot), 10) : 0;
    const sig = dot > 0 ? token.slice(dot + 1) : '';
    if (!expMs || !/^[a-f0-9]{64}$/.test(sig)) return fail('رمز غير صالح');
    if (Date.now() > expMs || expMs - Date.now() > 5 * 60_000) return fail('انتهت صلاحية الرابط — أعد المحاولة من لوحة الحسابات');

    const expected = crypto.createHmac('sha256', sharedSecret).update(`${target}|${expMs}`).digest('hex');
    const ok = sig.length === expected.length
        && crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
    if (!ok) return fail('رمز غير صالح');

    const res = NextResponse.redirect(new URL(dest, req.url), { status: 303 });
    res.cookies.set({
        name: ADMIN_SESSION_COOKIE,
        value: createAdminSessionToken(signingSecret),
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    });
    res.headers.set('Cache-Control', 'no-store');
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
}
