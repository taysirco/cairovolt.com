/**
 * 🔐 تحقق تسجيل الدخول لتقييمات المنتجات — جوجل + فيسبوك
 *
 * جوجل: GIS credential (JWT) → tokeninfo الرسمية (توقيع + جمهور + صلاحية).
 * فيسبوك: FB JS SDK access token → التحقق بلا App Secret إطلاقاً:
 *   1) GET /app بالتوكن نفسه → يرجع التطبيق الذي أُصدر له → يطابق app id تطبيقنا.
 *   2) GET /me → id/name(/email إن مُنح). لا أسرار تُتداول أو تُخزَّن.
 */

const GOOGLE_TOKENINFO = 'https://oauth2.googleapis.com/tokeninfo';
const FB_GRAPH = 'https://graph.facebook.com/v21.0';

export interface ReviewIdentity {
    provider: 'google' | 'facebook';
    subject: string;   // معرّف المستخدم الثابت لدى المزوّد
    email: string;
    name: string;
    picture?: string;
}

/** تحقق توكن فيسبوك (JS SDK) بلا App Secret: /app يطابق التطبيق، /me يجلب الهوية */
export async function verifyFacebookAccessToken(accessToken: string): Promise<ReviewIdentity | null> {
    const appId = process.env.NEXT_PUBLIC_FB_APP_ID || '';
    if (!appId || !accessToken || accessToken.length > 512 || !/^[A-Za-z0-9_-]+$/.test(accessToken)) return null;
    try {
        const appRes = await fetch(`${FB_GRAPH}/app?access_token=${encodeURIComponent(accessToken)}`, {
            signal: AbortSignal.timeout(8000),
        });
        if (!appRes.ok) return null;
        const app = (await appRes.json()) as { id?: string };
        if (String(app.id || '') !== appId) return null; // توكن من تطبيق آخر — مرفوض

        const meRes = await fetch(`${FB_GRAPH}/me?fields=id,name,email&access_token=${encodeURIComponent(accessToken)}`, {
            signal: AbortSignal.timeout(8000),
        });
        if (!meRes.ok) return null;
        const me = (await meRes.json()) as { id?: string; name?: string; email?: string };
        if (!me.id) return null;
        return {
            provider: 'facebook',
            subject: me.id,
            email: String(me.email || ''),
            name: String(me.name || 'عميل فيسبوك').slice(0, 80),
        };
    } catch {
        return null;
    }
}

export async function verifyGoogleIdToken(credential: string): Promise<ReviewIdentity | null> {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    if (!clientId || !credential || credential.length > 4096) return null;
    try {
        const res = await fetch(`${GOOGLE_TOKENINFO}?id_token=${encodeURIComponent(credential)}`, {
            // tokeninfo يتحقق من التوقيع والصلاحية بنفسه — أي خطأ يرجع ≠200
            signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) return null;
        const p = (await res.json()) as Record<string, string>;
        if (p.aud !== clientId) return null;                       // صادر لعميلنا تحديداً
        if (p.iss !== 'https://accounts.google.com' && p.iss !== 'accounts.google.com') return null;
        if (!p.sub || !p.email) return null;
        return {
            provider: 'google',
            subject: p.sub,
            email: p.email,
            name: (p.name || p.email.split('@')[0] || '').slice(0, 80),
            picture: p.picture,
        };
    } catch {
        return null;
    }
}
