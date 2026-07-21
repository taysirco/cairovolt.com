'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * 🎁 بوكس شكر تفعيل الضمان — يظهر مرة واحدة بعد نجاح التحقق من كارت الضمان.
 *
 * أعيد تصميمه من «بار علوي» (كان يتصادم مع الهيدر الثابت الشفاف فيظهر مشوّشاً) إلى
 * **بطاقة عائمة أسفل الشاشة**: خارج مسار الهيدر تماماً (position:fixed)، قابلة للإغلاق
 * **ويُحفَظ الإغلاق فلا تعود**، مع **نسخ الكود بضغطة**. لا تزاحم الهيدر ولا المحتوى.
 */
export default function PromoBanner() {
    const pathname = usePathname();
    const isEn = pathname === '/en' || pathname.startsWith('/en/');
    const [visible, setVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let t: number | undefined;
        try {
            const done = localStorage.getItem('cv_verify_completed') === 'true';
            const dismissed = localStorage.getItem('cv_promo_dismissed') === 'true';
            if (done && !dismissed) {
                t = window.setTimeout(() => setVisible(true), 400); // دخول لطيف بعد استقرار الصفحة
                const w = window as Window & { gtag?: (c: string, e: string, p: Record<string, string>) => void };
                if (typeof w.gtag === 'function') {
                    w.gtag('event', 'promo_banner_shown', { source: 'verified_warranty_record', promo_code: 'WARRANTY10' });
                }
            }
        } catch { /* التصفح الخاص */ }
        return () => { if (t !== undefined) window.clearTimeout(t); };
    }, []);

    const close = () => {
        setVisible(false);
        try { localStorage.setItem('cv_promo_dismissed', 'true'); } catch { /* noop */ }
    };
    const copy = async () => {
        try {
            await navigator.clipboard.writeText('WARRANTY10');
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch { /* بعض المتصفحات تمنع الحافظة بلا HTTPS/إذن */ }
    };

    if (!visible) return null;

    return (
        <div
            dir={isEn ? 'ltr' : 'rtl'}
            id="promo-banner"
            className="fixed bottom-4 inset-x-0 z-[60] flex justify-center px-4 pointer-events-none"
        >
            <div
                className="pointer-events-auto w-full max-w-sm rounded-2xl border border-amber-300/60 shadow-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg,#92400e 0%,#b45309 35%,#d97706 70%,#f59e0b 100%)', animation: 'promoUp .35s ease-out' }}
            >
                <div className="relative px-4 py-3">
                    <button
                        onClick={close}
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
                                {isEn ? '10% off your next order' : 'خصم 10% على طلبك الجاي'}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={copy}
                        className="mt-2.5 w-full flex items-center justify-between gap-2 rounded-xl bg-black px-3 py-2 hover:bg-black/90 active:bg-black/80 transition-colors"
                    >
                        <span className="text-base font-bold tracking-wider text-yellow-400" style={{ fontFamily: "'Outfit', monospace" }}>WARRANTY10</span>
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
