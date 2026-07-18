/**
 * 🔐 تحقق تسجيل الدخول لتقييمات المنتجات — Google Identity Services
 *
 * العميل يسجّل دخوله بجوجل على صفحة المنتج (GIS One-Tap/زر)، ويرسل الـ ID token
 * (credential JWT) مع تقييمه. هنا نتحقق منه خادمياً عبر نقطة tokeninfo الرسمية:
 * توقيع جوجل + الجمهور (client id) + انتهاء الصلاحية — بلا أي SDK إضافي.
 *
 * فيسبوك: يُضاف لاحقاً بنفس النمط متى جهّز المالك تطبيق Meta (App ID/Secret).
 */

const GOOGLE_TOKENINFO = 'https://oauth2.googleapis.com/tokeninfo';

export interface ReviewIdentity {
    provider: 'google';
    subject: string;   // معرّف المستخدم الثابت لدى المزوّد
    email: string;
    name: string;
    picture?: string;
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
