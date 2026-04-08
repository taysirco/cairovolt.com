'use client';

import { useState, useEffect } from 'react';

/**
 * PromoBanner — ORIGINAL25 Display Banner
 * 
 * Shows a gold promo banner at the top of the main site
 * ONLY when the visitor has completed the C2PA verification
 * (detected via localStorage flag or utm_campaign=c2pa).
 * 
 * The ORIGINAL25 code gives 15% discount — validated in checkout page + server-side in orders API.
 */
export default function PromoBanner() {
    const [visible, setVisible] = useState(false);
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        // Check if user came from QR / verify flow
        const params = new URLSearchParams(window.location.search);
        const isFromC2PA = params.get('utm_campaign') === 'c2pa';

        let fromVerify = false;
        try {
            fromVerify = localStorage.getItem('cv_verify_completed') === 'true';
        } catch { /* private browsing */ }

        if (isFromC2PA || fromVerify) {
            setVisible(true);

            // Store visit for future detection
            try {
                localStorage.setItem('cv_verify_completed', 'true');
            } catch { /* private browsing */ }

            // GA4 event — return visit from verify flow
            if (typeof (window as any).gtag === 'function') {
                (window as any).gtag('event', 'promo_banner_shown', {
                    source: isFromC2PA ? 'utm_c2pa' : 'localStorage',
                    promo_code: 'ORIGINAL25',
                });
            }
        }
    }, []);

    // Countdown timer effect
    useEffect(() => {
        if (!visible) return;

        // Set initial countdown end to 24h from first view
        let endTime: number;
        try {
            const stored = localStorage.getItem('cv_promo_end');
            if (stored) {
                endTime = parseInt(stored);
            } else {
                endTime = Date.now() + 24 * 60 * 60 * 1000;
                localStorage.setItem('cv_promo_end', endTime.toString());
            }
        } catch {
            endTime = Date.now() + 24 * 60 * 60 * 1000;
        }

        const interval = setInterval(() => {
            const remaining = Math.max(0, endTime - Date.now());
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
            setCountdown(
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [visible]);

    if (!visible) return null;

    return (
        <div
            className="w-full py-2.5 px-4 text-center relative overflow-hidden"
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
                <span>🎁</span>
                <span>كود الخصم الحصري:</span>
                <span
                    className="inline-block px-3 py-0.5 bg-black text-yellow-400 rounded-md font-mono text-base tracking-wider"
                    style={{ fontFamily: "'Outfit', monospace" }}
                >
                    ORIGINAL25
                </span>
                <span>— خصم 15% على طلبك الأول</span>
                {countdown && (
                    <span className="text-xs bg-black/20 text-white px-2 py-0.5 rounded-full">
                        ⏰ ينتهي خلال {countdown}
                    </span>
                )}
            </p>

            {/* Close button */}
            <button
                onClick={() => setVisible(false)}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-black/50 hover:text-black text-lg font-bold"
                aria-label="إغلاق"
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
