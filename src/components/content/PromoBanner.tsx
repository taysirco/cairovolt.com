'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const CODE = 'WARRANTY5';

/**
 * 🎁 بوكس شكر تفعيل الضمان — يظهر مرة بعد نجاح التحقق من كارت الضمان (خصم 5%).
 *
 * بطاقة عائمة أسفل الشاشة (خارج مسار الهيدر الثابت — لا تصادم):
 *  • قابلة للإغلاق **ويُحفَظ الإغلاق** فلا تعود.
 *  • **تختفي تلقائياً بعد 20 ثانية** بلا أكشن (لا تشوّش على المحتوى).
 *  • **ترتفع فوق أي شريط سفلي** (أيقونة/شريط الطلب على الموبايل) بقياس ارتفاعه حيّاً.
 *  • نسخ الكود بضغطة.
 */
export default function PromoBanner() {
    const pathname = usePathname();
    const isEn = pathname === '/en' || pathname.startsWith('/en/');
    const [visible, setVisible] = useState(false);
    const [copied, setCopied] = useState(false);
    const [bottomPx, setBottomPx] = useState(16);

    const hide = useCallback(() => {
        setVisible(false);
        try { localStorage.setItem('cv_promo_dismissed', 'true'); } catch { /* noop */ }
    }, []);
    const copy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(CODE);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch { /* بعض المتصفحات تمنع الحافظة بلا إذن/HTTPS — الكود ظاهر للنسخ اليدوي */ }
    }, []);

    // إظهار بعد نجاح التحقق (ما لم يُغلَق سابقاً)
    useEffect(() => {
        let showT: number | undefined;
        try {
            const done = localStorage.getItem('cv_verify_completed') === 'true';
            const dismissed = localStorage.getItem('cv_promo_dismissed') === 'true';
            if (done && !dismissed) {
                showT = window.setTimeout(() => setVisible(true), 400);
                const w = window as Window & { gtag?: (c: string, e: string, p: Record<string, string>) => void };
                if (typeof w.gtag === 'function') w.gtag('event', 'promo_banner_shown', { source: 'verified_warranty_record', promo_code: CODE });
            }
        } catch { /* التصفح الخاص */ }
        return () => { if (showT !== undefined) window.clearTimeout(showT); };
    }, []);

    // بعد الظهور: مؤقّت اختفاء 20ث + رفع البطاقة فوق أي شريط سفلي ثابت (أيقونة الطلب)
    useEffect(() => {
        if (!visible) return;
        const hideT = window.setTimeout(hide, 20000);
        const measure = () => {
            let barH = 0;
            document.querySelectorAll('div,section,nav,footer,aside').forEach((el) => {
                if (el.id === 'promo-banner' || el.closest('#promo-banner')) return;
                const cs = getComputedStyle(el);
                if (cs.position !== 'fixed') return;
                // ملتصق بأسفل الشاشة (computed bottom≈0) — أمتن من مقارنة rect.bottom بـ
                // innerHeight (يختلفان على الموبايل: layout vs visual viewport).
                const bottomVal = parseFloat(cs.bottom);
                if (!(bottomVal >= 0 && bottomVal <= 4)) return;
                const h = (el as HTMLElement).offsetHeight;
                const r = el.getBoundingClientRect();
                // شريط/أيقونة الطلب: يمتد بعرض الشاشة وارتفاعه معقول (نستبعد الطبقات كاملة الشاشة)
                if (r.width > window.innerWidth * 0.7 && h >= 40 && h < 220) {
                    barH = Math.max(barH, h);
                }
            });
            setBottomPx(barH > 0 ? barH + 12 : 16);
        };
        measure();
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure, { passive: true });
        const measureT = window.setInterval(measure, 1500); // يلتقط ظهور الشريط بعد تمرير/تنقّل
        return () => {
            window.clearTimeout(hideT);
            window.clearInterval(measureT);
            window.removeEventListener('resize', measure);
            window.removeEventListener('scroll', measure);
        };
    }, [visible, hide]);

    if (!visible) return null;

    return (
        <div
            dir={isEn ? 'ltr' : 'rtl'}
            id="promo-banner"
            className="fixed inset-x-0 z-[60] flex justify-center px-4 pointer-events-none"
            style={{ bottom: bottomPx, transition: 'bottom .2s ease' }}
        >
            <div
                className="pointer-events-auto w-full max-w-sm rounded-2xl border border-amber-300/60 shadow-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg,#92400e 0%,#b45309 35%,#d97706 70%,#f59e0b 100%)', animation: 'promoUp .35s ease-out' }}
            >
                <div className="relative px-4 py-3">
                    <button
                        onClick={hide}
                        aria-label={isEn ? 'Close' : 'إغلاق'}
                        className={`absolute top-2 ${isEn ? 'right-2' : 'left-2'} w-7 h-7 flex items-center justify-center rounded-full text-black/60 hover:text-black hover:bg-black/10 text-lg font-bold leading-none`}
                    >
                        ×
                    </button>

                    <div className="flex items-center gap-3 pe-6">
                        <span className="text-2xl shrink-0" aria-hidden="true">🎁</span>
                        <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-extrabold text-black/90 leading-tight">
                                {isEn ? 'Warranty activated — thank-you gift!' : 'تم تفعيل الضمان — هدية شكراً لك!'}
                            </p>
                            <p className="text-[11px] text-black/70">
                                {isEn ? '5% off your next order' : 'خصم 5% على طلبك الجاي'}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={copy}
                        className="mt-2.5 w-full flex items-center justify-between gap-2 rounded-xl bg-black px-3 py-2 hover:bg-black/90 active:bg-black/80 transition-colors"
                    >
                        <span className="text-base font-bold tracking-wider text-yellow-400" style={{ fontFamily: "'Outfit', monospace" }}>{CODE}</span>
                        <span className="text-xs font-bold text-yellow-300">
                            {copied ? (isEn ? 'Copied ✓' : 'تم النسخ ✓') : (isEn ? 'Tap to copy' : 'اضغط للنسخ')}
                        </span>
                    </button>
                </div>
            </div>

            <style>{`@keyframes promoUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </div>
    );
}
