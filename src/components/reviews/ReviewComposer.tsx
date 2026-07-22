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
                    prompt: (cb?: (n: unknown) => void) => void;
                };
            };
        };
        FB?: {
            init: (cfg: Record<string, unknown>) => void;
            login: (cb: (res: FbLoginResponse) => void, opts?: Record<string, unknown>) => void;
            getLoginStatus: (cb: (res: FbLoginResponse) => void, roundtrip?: boolean) => void;
            api: (path: string, params: Record<string, unknown>, cb: (res?: { name?: string }) => void) => void;
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
    const [pros, setPros] = useState('');
    const [cons, setCons] = useState('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [busy, setBusy] = useState(false);
    const [done, setDone] = useState(false);
    const [verifiedBuyer, setVerifiedBuyer] = useState(false);
    const [error, setError] = useState('');
    const [gsiReady, setGsiReady] = useState(false);
    // 🎫 وضع التوكن: العميل جاء برابط طلب-تقييم (?rvw=) — مشترٍ موثَّق فيقيّم بلا تسجيل
    //    دخول على أي متصفح. forceLogin يُظهر تسجيل الدخول احتياطياً لو فشل التحقق.
    const [tokenMode, setTokenMode] = useState(false);
    const [forceLogin, setForceLogin] = useState(false);

    // نطبّق الهوية مرة واحدة فقط (سباق محتمل: قد يرجع جوجل وفيسبوك معاً) — أول مصدر يفوز.
    const connectedRef = useRef(false);
    const applyIdentity = useCallback((token: string, prov: 'google' | 'facebook') => {
        if (connectedRef.current || !token) return false;
        connectedRef.current = true;
        setCredential(token);
        setProvider(prov);
        return true;
    }, []);

    const initGsi = useCallback(() => {
        if (!clientId || !window.google || !gsiRef.current || credential) return;
        try {
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: (res: GoogleCredentialResponse) => {
                    if (!applyIdentity(res.credential, 'google')) return;
                    try {
                        const payload = JSON.parse(atob(res.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
                        setUserName(String(payload.name || payload.email || ''));
                    } catch { /* الاسم تحسين شكلي فقط */ }
                },
                // 🔗 ربط تلقائي فوري للعائدين المسجّلين دخول جوجل — بلا أي ضغطة
                auto_select: true,
                itp_support: true,
                use_fedcm_for_prompt: true,
            });
            window.google.accounts.id.renderButton(gsiRef.current, {
                theme: 'outline', size: 'large', shape: 'pill',
                text: 'continue_with', locale: isArabic ? 'ar' : 'en',
            });
            setGsiReady(true);
            // One Tap: لو للعميل جلسة جوجل نشطة يظهر «المتابعة كـ…» بضغطة واحدة
            //   (أو يُربَط تلقائياً للعائدين). لا يُرسِل التقييم — فقط يثبّت الهوية.
            try { window.google.accounts.id.prompt(); } catch { /* لا شيء */ }
        } catch { /* يظهر زر إعادة المحاولة */ }
    }, [clientId, credential, isArabic, applyIdentity]);

    // 🔗 تحويل ذكي من رسالة الواتساب مباشرةً لقسم التقييم: لو الرابط يقصد التقييم
    //    (#write-review أو #reviews أو ?rvw=) نفتح الصندوق ونهبط فوراً على *بداية* قسم
    //    التقييمات (العنوان + زر «اكتب تقييمك») لا على التقييمات نفسها.
    //    نحسب مقدار الإزاحة من *ارتفاع الهيدر الفعلي* لأنه متجاوب (≈64px موبايل، ≈104px
    //    ديسكتوب) فلا نعتمد على رقم ثابت يخبّي أعلى القسم على الشاشات الكبيرة.
    //    نستخدم window.scrollTo *فورياً* لا 'smooth': القسم داخل content-visibility:auto
    //    والصفحة مشغولة بالـhydration وقت الوصول، والتمرير الناعم يُسقَط في هذي الحالة —
    //    بينما الفوري يفرض حساب التخطيط فيعمل دائماً. حلقة تصحيح قصيرة تعيد المحاولة حتى
    //    يستقر الهبوط ثم تتوقف فلا تزاحم العميل لو مرّر بنفسه.
    useEffect(() => {
        let intent = false;
        try {
            const u = new URL(window.location.href);
            // توكن طلب-التقييم = مشترٍ موثَّق → وضع التوكن (تقييم بلا تسجيل دخول)
            if (u.searchParams.has('rvw') || u.searchParams.has('rt')) setTokenMode(true);
            intent = u.hash === '#write-review' || u.hash === '#reviews'
                || u.searchParams.has('rvw') || u.searchParams.has('rt');
        } catch { intent = false; }
        if (!intent) return;
        setOpen(true);
        let timer: ReturnType<typeof setTimeout>;
        let attempts = 0;
        const settle = () => {
            attempts++;
            // بطاقة قسم التقييمات (العنوان في أعلاها) أولاً، ثم صندوق الكتابة كبديل
            const el = document.querySelector('.verified-reviews') || document.getElementById('write-review');
            if (el) {
                const header = document.querySelector('header');
                const headerH = header ? header.getBoundingClientRect().height : 72;
                const absTop = (el as HTMLElement).getBoundingClientRect().top + window.scrollY;
                const targetY = Math.max(0, Math.round(absTop - headerH - 16)); // تحت الهيدر بـ16px
                if (Math.abs(window.scrollY - targetY) <= 6) return; // وصلنا — أوقف الحلقة
                window.scrollTo({ top: targetY }); // فوري
            }
            if (attempts < 12) timer = setTimeout(settle, 200); // نافذة ~2.4ث
        };
        timer = setTimeout(settle, 100);
        return () => clearTimeout(timer);
    }, []);

    // 🔵 فيسبوك (FB JS SDK): نحمّله ونهيّئه مرة واحدة، ونصفّ ما نحتاجه حتى يجهز.
    const fbCbQueue = useRef<Array<() => void>>([]);
    const fbLoading = useRef(false);
    const ensureFb = useCallback((cb: () => void) => {
        if (!fbAppId) return;
        if (window.FB) { cb(); return; }
        fbCbQueue.current.push(cb);
        if (fbLoading.current) return;
        fbLoading.current = true;
        window.fbAsyncInit = () => {
            try { window.FB?.init({ appId: fbAppId, cookie: true, xfbml: false, version: 'v21.0' }); } catch { /* لا شيء */ }
            const q = fbCbQueue.current; fbCbQueue.current = [];
            q.forEach((fn) => { try { fn(); } catch { /* لا شيء */ } });
        };
        const s = document.createElement('script');
        s.id = 'cv-fb-jssdk';
        s.src = 'https://connect.facebook.net/ar_AR/sdk.js';
        s.async = true; s.defer = true;
        document.body.appendChild(s);
    }, [fbAppId]);

    // نلتقط جلسة فيسبوك (من الفحص التلقائي أو زر الدخول) ونجلب الاسم للترحيب.
    const captureFb = useCallback((res: FbLoginResponse) => {
        if (res.status !== 'connected' || !res.authResponse?.accessToken) return;
        if (!applyIdentity(res.authResponse.accessToken, 'facebook')) return;
        try { window.FB?.api('/me', { fields: 'name' }, (u) => setUserName(u?.name || '')); } catch { /* الاسم تحسين شكلي */ }
    }, [applyIdentity]);

    // 🔗 ربط تلقائي فوري: لو المتصفح مسجّل دخول فيسبوك وسبق أن صرّح للتطبيق،
    //    getLoginStatus يرجع 'connected' ومعه التوكن بلا أي نافذة دخول.
    const fbAutoConnect = useCallback(() => {
        if (connectedRef.current) return;
        ensureFb(() => { try { window.FB?.getLoginStatus((res) => captureFb(res)); } catch { /* لا شيء */ } });
    }, [ensureFb, captureFb]);

    // زر «المتابعة بحساب فيسبوك» — نافذة الدخول تحتاج ضغطة المستخدم (احتياطي).
    const fbLogin = useCallback(() => {
        ensureFb(() => { try { window.FB?.login((res) => captureFb(res), { scope: 'public_profile' }); } catch { /* لا شيء */ } });
    }, [ensureFb, captureFb]);

    // عند فتح الصندوق: نحاول الربط التلقائي فوراً (جوجل One Tap + فيسبوك getLoginStatus)
    //   ليقفز العميل لخطوة كتابة التقييم مباشرة لو عنده جلسة قائمة — بلا مراحل دخول.
    //   في وضع التوكن لا داعي لأي OAuth (التوكن هو الهوية) إلا لو سقط التحقق (forceLogin).
    useEffect(() => {
        if (!open || (tokenMode && !forceLogin)) return;
        initGsi();
        fbAutoConnect();
    }, [open, tokenMode, forceLogin, initGsi, fbAutoConnect]);

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
        // الهوية: إما تسجيل دخول (credential) أو توكن طلب-التقييم (وضع المشترٍ الموثَّق)
        if (!credential && !tokenMode) { setError(isArabic ? 'سجّل الدخول بجوجل أو فيسبوك أولاً' : 'Sign in with Google or Facebook first'); return; }
        if (!rating) { setError(isArabic ? 'اختر عدد النجوم' : 'Pick a star rating'); return; }
        if (text.trim().length < 10) { setError(isArabic ? 'اكتب تقييماً من 10 أحرف على الأقل' : 'Write at least 10 characters'); return; }
        setBusy(true);
        try {
            // مرجع المكافأة: رمز من رابط طلب التقييم على واتساب (?rvw=) — يوثّق المشترِي
            // ويربط التقييم بهاتفه خادمياً لإرسال كوبون 5% بعد الاعتماد بلا سؤاله عن رقمه.
            let rewardRef = '';
            try {
                const u = new URL(window.location.href);
                rewardRef = (u.searchParams.get('rvw') || u.searchParams.get('rt') || '').slice(0, 64);
            } catch { /* لا شيء */ }
            // المميزات/العيوب: سطر لكل نقطة، حتى 5 نقاط، تُنقّى وتُقصّ على الخادم أيضاً.
            const toList = (v: string) => v
                .split('\n')
                .map(s => s.trim())
                .filter(Boolean)
                .slice(0, 5);
            // نرسل الاعتماد فقط لو كان العميل قد سجّل الدخول؛ وإلا نعتمد على التوكن.
            const body: Record<string, unknown> = {
                productSlug, rating, title, reviewText: text, rewardRef, photos,
                pros: toList(pros), cons: toList(cons),
            };
            if (credential) { body.credential = credential; body.provider = provider; }
            const res = await fetch('/api/reviews/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const j = await res.json();
            if (!res.ok) {
                // 401 في وضع التوكن = تعذّر التحقق من الرابط → نُظهر تسجيل الدخول احتياطياً
                if (res.status === 401 && tokenMode && !credential) {
                    setForceLogin(true);
                    setError(isArabic ? 'تعذّر التحقق من رابط التقييم — سجّل الدخول للمتابعة' : 'Could not verify the review link — please sign in');
                    return;
                }
                setError(String(j.error || 'حصل خطأ — جرّب تاني'));
                return;
            }
            setVerifiedBuyer(j.verifiedBuyer === true);
            setDone(true);
        } catch {
            setError(isArabic ? 'تعذّر الإرسال — جرّب تاني' : 'Network error — try again');
        } finally {
            setBusy(false);
        }
    };

    // نُظهر فورم التقييم مباشرة لو: سجّل الدخول، أو وضع التوكن (مشترٍ موثَّق بلا دخول).
    const showForm = credential || (tokenMode && !forceLogin);

    if (done) {
        return (
            <div id="write-review" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 my-4 text-center">
                <div className="text-2xl mb-1">🌟</div>
                <p className="font-bold text-emerald-800">{isArabic ? 'وصل تقييمك — شكراً!' : 'Review received — thank you!'}</p>
                <p className="text-sm text-emerald-700 mt-1">
                    {verifiedBuyer
                        ? (isArabic
                            ? 'تقييمك قيد المراجعة للتأكد إنه حقيقي فقط (مش بنحكم على رأيك) — وبعد نشره هيوصلك كوبون خصم 5% على الواتساب مهما كان تقييمك 🎁'
                            : 'Your review is being checked only for authenticity (not for your opinion) — once posted, a 5% coupon arrives on WhatsApp whatever your rating 🎁')
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

                    {!showForm ? (
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
                                    className="w-full py-2.5 rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2">
                                    {/* شعار فيسبوك «f» أبيض (الحرف يظهر بأزرق الزر عبره) — تمييز فوري وثقة أعلى */}
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[18px] h-[18px] shrink-0">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    {isArabic ? 'المتابعة بحساب فيسبوك' : 'Continue with Facebook'}
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            {credential ? (
                                <p className="text-sm text-emerald-700">✓ {isArabic ? `أهلاً ${userName || ''}` : `Hi ${userName || ''}`}</p>
                            ) : (
                                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-3 py-2">
                                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">✓ {isArabic ? 'موثَّق كمشترٍ من طلبك' : 'Verified buyer from your order'}</p>
                                    <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400/70">{isArabic ? 'يظهر تقييمك باسمك الأول — بلا تسجيل دخول' : 'Shown with your first name — no sign-in needed'}</p>
                                </div>
                            )}

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
                            <p className={`text-[11px] text-left ${text.trim().length < 10 ? 'text-gray-400' : 'text-emerald-600'}`} dir="ltr">
                                {text.trim().length < 10
                                    ? (isArabic ? `باقي ${10 - text.trim().length} حرف على الأقل` : `${10 - text.trim().length} more characters needed`)
                                    : `${text.length} / 1200`}
                            </p>

                            {/* المميزات/العيوب (اختياري) — سطر لكل نقطة؛ تُثري التقييم وتظهر منفصلة */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs font-bold text-emerald-600 block mb-1">
                                        ➕ {isArabic ? 'المميزات (اختياري)' : 'Pros (optional)'}
                                    </label>
                                    <textarea value={pros} onChange={e => setPros(e.target.value)} rows={3}
                                        placeholder={isArabic ? 'نقطة في كل سطر' : 'One point per line'}
                                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-transparent" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-rose-500 block mb-1">
                                        ➖ {isArabic ? 'العيوب (اختياري)' : 'Cons (optional)'}
                                    </label>
                                    <textarea value={cons} onChange={e => setCons(e.target.value)} rows={3}
                                        placeholder={isArabic ? 'نقطة في كل سطر' : 'One point per line'}
                                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-transparent" />
                                </div>
                            </div>

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
                                    ? 'كل التقييمات تُراجَع للتأكد من مصداقيتها فقط — لا نحكم على رأيك. قيّم بصراحتك الكاملة.'
                                    : 'All reviews are checked for authenticity only — we never judge your opinion. Please be fully honest.'}
                            </p>
                            <p className="text-[11px] text-gray-400 text-center">
                                {isArabic
                                    ? '🎁 لو كنت مشترياً موثَّقاً، هتحصل على كوبون خصم 5% مقابل تقييمك الصادق — أياً كان عدد النجوم.'
                                    : '🎁 If you are a verified buyer, you get a 5% coupon for your honest review — regardless of your star rating.'}
                            </p>
                        </>
                    )}
                    {error && !credential && <p className="text-sm text-rose-600">{error}</p>}
                </div>
            )}
        </div>
    );
}
