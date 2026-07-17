'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Show the warranty thank-you offer only after a successful record lookup. */
export default function PromoBanner() {
    const pathname = usePathname();
    const isEn = pathname === '/en' || pathname.startsWith('/en/');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let showTimer: number | undefined;
        let fromVerify = false;
        try {
            fromVerify = localStorage.getItem('cv_verify_completed') === 'true';
        } catch { /* private browsing */ }

        if (fromVerify) {
            showTimer = window.setTimeout(() => setVisible(true), 0);

            // Record that the offer was shown after a completed lookup.
            const analyticsWindow = window as Window & {
                gtag?: (command: string, eventName: string, params: Record<string, string>) => void;
            };
            if (typeof analyticsWindow.gtag === 'function') {
                analyticsWindow.gtag('event', 'promo_banner_shown', {
                    source: 'verified_warranty_record',
                    promo_code: 'WARRANTY10',
                });
            }
        }

        return () => {
            if (showTimer !== undefined) window.clearTimeout(showTimer);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className="w-full py-2.5 px-4 text-center relative overflow-hidden"
            dir={isEn ? 'ltr' : 'rtl'}
            style={{
                background: 'linear-gradient(135deg, #92400e 0%, #b45309 30%, #d97706 60%, #f59e0b 100%)',
                zIndex: 50,
            }}
            id="promo-banner"
        >
            {/* Animated shine */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                    animation: 'promoShine 3s ease-in-out infinite',
                }}
            />

            <p className="text-sm md:text-base font-bold text-black relative z-10 flex items-center justify-center gap-2 flex-wrap">
                <span aria-hidden="true">✦</span>
                <span>{isEn ? 'Warranty activation thank-you code:' : 'كود شكر تفعيل الضمان:'}</span>
                <span
                    className="inline-block px-3 py-0.5 bg-black text-yellow-400 rounded-md font-mono text-base tracking-wider"
                    style={{ fontFamily: "'Outfit', monospace" }}
                >
                    WARRANTY10
                </span>
                <span>{isEn ? '— 10% discount' : '— خصم 10%'}</span>
            </p>

            {/* Close button */}
            <button
                onClick={() => setVisible(false)}
                className={`absolute top-1/2 -translate-y-1/2 text-black/70 hover:text-black text-lg font-bold ${isEn ? 'right-3' : 'left-3'}`}
                aria-label={isEn ? 'Close' : 'إغلاق'}
            >
                ×
            </button>

            <style>{`
                @keyframes promoShine {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}
