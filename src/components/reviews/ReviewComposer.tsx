'use client';

/**
 * ⭐ كاتب التقييم على صفحة المنتج — النظام المبسّط
 *
 * 1) تسجيل دخول بجوجل (Google Identity Services — سكربت واحد، بلا حزم).
 * 2) نجوم + عنوان اختياري + نص + رقم واتساب (لهدية 5% بعد الموافقة) + حتى 3 صور.
 * 3) الصور تُضغط على جهاز العميل (canvas ≤1200px JPEG) قبل الرفع — صفحة المنتج
 *    تبقى خفيفة والرفع سريع حتى على شبكات المحمول.
 * 4) التقييم يدخل قائمة مراجعة الأدمن؛ فور الموافقة يصل كوبون 5% واتساب.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface Props {
    productSlug: string;
    productName: string;
    locale: string;
}

interface GoogleCredentialResponse { credential: string }

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (cfg: Record<string, unknown>) => void;
                    renderButton: (el: HTMLElement, cfg: Record<string, unknown>) => void;
                };
            };
        };
        FB?: {
            init: (cfg: Record<string, unknown>) => void;
            login: (cb: (res: FbLoginResponse) => void, opts?: Record<string, unknown>) => void;
        };
        fbAsyncInit?: () => void;
    }
}

interface FbLoginResponse {
    status: string;
    authResponse?: { accessToken: string; userID: string };
}

const MAX_PHOTOS = 3;

/** ضغط صورة على المتصفح: أقصى بُعد 1200px، JPEG جودة 0.78 → dataURL */
async function compressImage(file: File): Promise<string | null> {
    if (!file.type.startsWith('image/')) return null;
    const bitmap = await createImageBitmap(file).catch(() => null);
    if (!bitmap) return null;
    const maxDim = 1200;
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    let quality = 0.78;
    let out = canvas.toDataURL('image/jpeg', quality);
    // لو ما زالت أكبر من ~550KB قلّل الجودة تدريجياً (حارس الخادم 600KB)
    while (out.length * 0.75 > 550 * 1024 && quality > 0.4) {
        quality -= 0.12;
        out = canvas.toDataURL('image/jpeg', quality);
    }
    return out.length * 0.75 > 580 * 1024 ? null : out;
}

export default function ReviewComposer({ productSlug, productName, locale }: Props) {
    const isArabic = locale === 'ar';
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    const fbAppId = process.env.NEXT_PUBLIC_FB_APP_ID || '';
    const gsiRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [credential, setCredential] = useState('');
    const [provider, setProvider] = useState<'google' | 'facebook'>('google');
    const [userName, setUserName] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverStar, setHoverStar] = useState(0);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [busy, setBusy] = useState(false);
    const [done, setDone] = useState(false);
    const [verifiedBuyer, setVerifiedBuyer] = useState(false);
    const [error, setError] = useState('');
    const [gsiReady, setGsiReady] = useState(false);

    const initGsi = useCallback(() => {
        if (!clientId || !window.google || !gsiRef.current || credential) return;
        try {
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: (res: GoogleCredentialResponse) => {
                    setCredential(res.credential);
                    setProvider('google');
                    try {
                        const payload = JSON.parse(atob(res.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
                        setUserName(String(payload.name || payload.email || ''));
                    } catch { /* الاسم تحسين شكلي فقط */ }
                },
                auto_select: false,
            });
            window.google.accounts.id.renderButton(gsiRef.current, {
                theme: 'outline', size: 'large', shape: 'pill',
                text: 'continue_with', locale: isArabic ? 'ar' : 'en',
            });
            setGsiReady(true);
        } catch { /* يظهر زر إعادة المحاولة */ }
    }, [clientId, credential, isArabic]);

    useEffect(() => { if (open) initGsi(); }, [open, initGsi]);

    // 🔗 تحويل ذكي من رسالة الواتساب مباشرةً لقسم التقييم: لو الرابط يقصد التقييم
    //    (#write-review أو #reviews أو ?rvw=) نفتح الصندوق ونهبط على *بداية* القسم
    //    (العنوان + زر «اكتب تقييمك») لا على التقييمات نفسها. block:'start' يحترم
    //    scroll-margin-top (84px) فلا يختفي الزر تحت الهيدر الثابت. نعيد المحاولة
    //    لأن القسم يُرسَم على العميل (content-visibility) وارتفاع الصندوق يكبر عند فتحه.
    useEffect(() => {
        let intent = false;
        try {
            const u = new URL(window.location.href);
            intent = u.hash === '#write-review' || u.hash === '#reviews'
                || u.searchParams.has('rvw') || u.searchParams.has('rt');
        } catch { intent = false; }
        if (!intent) return;
        setOpen(true);
        const timers: ReturnType<typeof setTimeout>[] = [];
        const scrollToSection = () => {
            // بطاقة قسم التقييمات (العنوان في أعلاها) أولاً، ثم صندوق الكتابة كبديل
            const el = document.querySelector('.verified-reviews') || document.getElementById('write-review');
            if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        // محاولات متتالية حتى يستقر التخطيط الكسول ويكتمل ارتفاع الصندوق المفتوح
        [350, 900, 1600].forEach(d => timers.push(setTimeout(scrollToSection, d)));
        return () => timers.forEach(clearTimeout);
    }, []);

    // 🔵 دخول فيسبوك (FB JS SDK) — يُحمَّل عند فتح الفورم فقط
    const fbLogin = useCallback(() => {
        if (!fbAppId) return;
        const doLogin = () => {
            window.FB?.login((res) => {
                if (res.status === 'connected' && res.authResponse?.accessToken) {
                    setCredential(res.authResponse.accessToken);
                    setProvider('facebook');
                    setUserName('');
                }
            }, { scope: 'public_profile' });
        };
        if (window.FB) { doLogin(); return; }
        window.fbAsyncInit = () => {
            window.FB?.init({ appId: fbAppId, cookie: false, xfbml: false, version: 'v21.0' });
            doLogin();
        };
        const s = document.createElement('script');
        s.src = 'https://connect.facebook.net/ar_AR/sdk.js';
        s.async = true; s.defer = true;
        document.body.appendChild(s);
    }, [fbAppId]);

    const onPickPhotos = async (files: FileList | null) => {
        if (!files) return;
        setError('');
        const remaining = MAX_PHOTOS - photos.length;
        for (const f of Array.from(files).slice(0, remaining)) {
            const compressed = await compressImage(f);
            if (compressed) setPhotos(p => [...p, compressed]);
        }
    };

    const submit = async () => {
        setError('');
        if (!credential) { setError(isArabic ? 'سجّل الدخول بجوجل أو فيسبوك أولاً' : 'Sign in with Google or Facebook first'); return; }
        if (!rating) { setError(isArabic ? 'اختر عدد النجوم' : 'Pick a star rating'); return; }
        if (text.trim().length < 10) { setError(isArabic ? 'اكتب تقييماً من 10 أحرف على الأقل' : 'Write at least 10 characters'); return; }
        setBusy(true);
        try {
            // مرجع المكافأة: رمز من رابط طلب التقييم على واتساب (?rvw=) — يربط التقييم
            // بهاتف العميل خادمياً لإرسال كوبون 5% بعد الاعتماد بلا سؤال العميل عن رقمه.
            let rewardRef = '';
            try {
                const u = new URL(window.location.href);
                rewardRef = (u.searchParams.get('rvw') || u.searchParams.get('rt') || '').slice(0, 64);
            } catch { /* لا شيء */ }
            const res = await fetch('/api/reviews/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential, provider, productSlug, rating, title, reviewText: text, rewardRef, photos }),
            });
            const j = await res.json();
            if (!res.ok) { setError(String(j.error || 'حصل خطأ — جرّب تاني')); return; }
            setVerifiedBuyer(j.verifiedBuyer === true);
            setDone(true);
        } catch {
            setError(isArabic ? 'تعذّر الإرسال — جرّب تاني' : 'Network error — try again');
        } finally {
            setBusy(false);
        }
    };

    if (done) {
        return (
            <div id="write-review" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 my-4 text-center">
                <div className="text-2xl mb-1">🌟</div>
                <p className="font-bold text-emerald-800">{isArabic ? 'وصل تقييمك — شكراً!' : 'Review received — thank you!'}</p>
                <p className="text-sm text-emerald-700 mt-1">
                    {verifiedBuyer
                        ? (isArabic
                            ? 'تقييمك قيد المراجعة، وفور الموافقة عليه هتوصلك هدية كوبون خصم 5% على الواتساب 🎁'
                            : 'Your review is in moderation — once approved, a 5% coupon gift arrives on WhatsApp 🎁')
                        : (isArabic
                            ? 'تقييمك قيد المراجعة — شكراً لمساعدتك عملاء آخرين يختاروا صح 🌟'
                            : 'Your review is in moderation — thanks for helping other shoppers 🌟')}
                    {verifiedBuyer && <span className="block mt-1">✅ {isArabic ? 'تم توثيقك كمشترٍ' : 'Verified buyer'}</span>}
                </p>
            </div>
        );
    }

    return (
        <div id="write-review" className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 my-4 bg-white dark:bg-gray-900">
            <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" onLoad={initGsi} />
            {!open ? (
                <button
                    onClick={() => setOpen(true)}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base transition-colors"
                >
                    ⭐ {isArabic ? 'اكتب تقييمك' : 'Write a review'}
                </button>
            ) : (
                <div className="space-y-3">
                    <p className="font-bold text-gray-900 dark:text-white">
                        {isArabic ? `قيّم ${productName}` : `Review ${productName}`}
                    </p>

                    {!credential ? (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {isArabic ? 'سجّل الدخول بضغطة واحدة عشان نتأكد إن التقييم حقيقي:' : 'One-tap sign-in keeps reviews genuine:'}
                            </p>
                            <div ref={gsiRef} className="flex justify-center" />
                            {!gsiReady && (
                                <button onClick={initGsi} className="text-xs text-blue-600 underline w-full text-center">
                                    {isArabic ? 'زر جوجل مش ظاهر؟ اضغط هنا' : 'Google button missing? Tap here'}
                                </button>
                            )}
                            {fbAppId && (
                                <button onClick={fbLogin}
                                    className="w-full py-2.5 rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold text-sm transition-colors">
                                    {isArabic ? 'المتابعة بحساب فيسبوك' : 'Continue with Facebook'}
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-emerald-700">✓ {isArabic ? `أهلاً ${userName || ''}` : `Hi ${userName || ''}`}</p>

                            {/* النجوم بأرقام 1→5 (ثابتة الاتجاه) + تسمية حيّة حتى لا يقيّم العميل بالخطأ */}
                            <div>
                                <div className="flex gap-2 justify-center items-end" dir="ltr">
                                    {[1, 2, 3, 4, 5].map(s => {
                                        const on = s <= (hoverStar || rating);
                                        return (
                                            <button key={s} type="button"
                                                onMouseEnter={() => setHoverStar(s)} onMouseLeave={() => setHoverStar(0)}
                                                onClick={() => setRating(s)}
                                                className="flex flex-col items-center gap-0.5 group focus:outline-none"
                                                aria-label={`${s} ${isArabic ? 'من 5' : 'of 5'}`} aria-pressed={rating === s}>
                                                <span className={`text-3xl transition-transform group-hover:scale-110 ${on ? 'grayscale-0' : 'grayscale opacity-40'}`}>⭐</span>
                                                <span className={`text-xs font-extrabold ${on ? 'text-amber-500' : 'text-gray-400'}`}>{s}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="text-center text-sm font-bold mt-1.5" aria-live="polite">
                                    {(hoverStar || rating)
                                        ? <span className="text-amber-600">{isArabic ? `تقييمك: ${hoverStar || rating} من 5` : `Your rating: ${hoverStar || rating} of 5`}</span>
                                        : <span className="text-gray-500">{isArabic ? 'اختر عدد النجوم — 1 = سيّئ، 5 = ممتاز' : 'Pick a rating — 1 = poor, 5 = excellent'}</span>}
                                </p>
                            </div>

                            <input value={title} onChange={e => setTitle(e.target.value)} maxLength={90}
                                placeholder={isArabic ? 'عنوان قصير (اختياري)' : 'Short title (optional)'}
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-transparent" />

                            <textarea value={text} onChange={e => setText(e.target.value)} rows={4} maxLength={1200}
                                placeholder={isArabic ? 'إيه رأيك في المنتج؟ (10 أحرف على الأقل)' : 'Your honest experience (10+ chars)'}
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-transparent" />

                            <div>
                                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                                    📷 {isArabic ? `صور المنتج (اختياري — حتى ${MAX_PHOTOS})` : `Product photos (optional, up to ${MAX_PHOTOS})`}
                                </label>
                                <div className="flex gap-2 items-center flex-wrap">
                                    {photos.map((p, i) => (
                                        <div key={i} className="relative">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={p} alt="" className="h-16 w-16 object-cover rounded-lg border" />
                                            <button onClick={() => setPhotos(ph => ph.filter((_, x) => x !== i))}
                                                className="absolute -top-1.5 -left-1.5 bg-rose-500 text-white rounded-full w-5 h-5 text-xs leading-none">×</button>
                                        </div>
                                    ))}
                                    {photos.length < MAX_PHOTOS && (
                                        <label className="h-16 w-16 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer text-2xl text-gray-400">
                                            +
                                            <input type="file" accept="image/*" multiple className="hidden"
                                                onChange={e => onPickPhotos(e.target.files)} />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {error && <p className="text-sm text-rose-600 font-medium">{error}</p>}

                            <button onClick={submit} disabled={busy}
                                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold transition-colors">
                                {busy ? (isArabic ? 'جارٍ الإرسال…' : 'Submitting…') : (isArabic ? 'أرسل التقييم' : 'Submit review')}
                            </button>
                            <p className="text-[11px] text-gray-500 text-center">
                                {isArabic
                                    ? 'كل التقييمات تُراجَع قبل النشر — قيّم بصراحتك الكاملة'
                                    : 'All reviews are checked before publishing — please be fully honest'}
                            </p>
                        </>
                    )}
                    {error && !credential && <p className="text-sm text-rose-600">{error}</p>}
                </div>
            )}
        </div>
    );
}
