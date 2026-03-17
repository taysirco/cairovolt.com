'use client';
import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * BrandVerification — Product authenticity component
 *
 * When a user attempts to navigate back (e.g. to search results),
 * this component intercepts the navigation and displays an informative
 * overlay about product authenticity risks on open marketplaces.
 *
 * Uses the History API to detect back-button presses and presents
 * indicators that reinforce the value of purchasing from an
 * authorized dealer.
 *
 * Renders via React Portal to `document.body` to guarantee the overlay
 * sits above all other content regardless of stacking contexts.
 */
export default function BrandVerification({
    brand,
    locale = 'ar',
}: {
    brand: string;
    locale: string;
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const isRTL = locale === 'ar';

    // Ensure portal only renders on the client
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDismiss = useCallback(() => {
        setIsVisible(false);
        // Mark as shown so it doesn't appear again this session
        try {
            sessionStorage.setItem('cv-guard-shown', '1');
        } catch {
            // sessionStorage may be unavailable in private browsing
        }
    }, []);

    useEffect(() => {
        // Don't show again if already dismissed this session
        try {
            if (sessionStorage.getItem('cv-guard-shown') === '1') return;
        } catch {
            // Continue if sessionStorage is unavailable
        }

        // Push a sentinel state into history
        window.history.pushState({ guardTrap: true }, '');

        const handlePopState = (e: PopStateEvent) => {
            if (e.state && e.state.guardTrap) {
                setIsVisible(true);
                // Re-push state to prevent actual navigation
                window.history.pushState({ guardTrap: true }, '');
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    if (!isVisible || !mounted) return null;

    const brandDisplay =
        brand.charAt(0).toUpperCase() + brand.slice(1);

    const overlay = (
        <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{
                zIndex: 999999,
                background: 'rgba(0,0,0,0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                animation: 'cv-guard-enter 0.35s ease-out',
            }}
            role="alertdialog"
            aria-modal="true"
            aria-label={
                isRTL
                    ? 'تحذير بشأن أصالة المنتج'
                    : 'Product authenticity warning'
            }
        >
            <div
                className="relative p-6 sm:p-8 rounded-2xl max-w-lg w-full text-center"
                style={{
                    background: '#030712',
                    border: '1px solid rgba(239,68,68,0.4)',
                    boxShadow: '0 0 60px rgba(239,68,68,0.15), 0 0 120px rgba(239,68,68,0.05)',
                    animation: 'cv-guard-enter 0.4s ease-out 0.05s both',
                }}
            >
                {/* Close button */}
                <button
                    onClick={handleDismiss}
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors"
                    style={{ color: '#6b7280' }}
                    aria-label={isRTL ? 'إغلاق' : 'Close'}
                >
                    ×
                </button>

                {/* Shield Alert Icon — Inline SVG for guaranteed rendering */}
                <div
                    className="mx-auto mb-4 flex items-center justify-center"
                    style={{
                        width: 64,
                        height: 64,
                        animation: 'cv-guard-pulse 2s ease-in-out infinite',
                    }}
                >
                    <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M12 8v4" />
                        <path d="M12 16h.01" />
                    </svg>
                </div>

                {/* Title */}
                <h2
                    className="text-xl sm:text-2xl font-black mb-3 leading-tight"
                    style={{ color: '#ffffff' }}
                >
                    {isRTL
                        ? '⚠️ توقف! قبل أن تعود للمنصات المفتوحة...'
                        : '⚠️ Wait! Before you go to open marketplaces...'}
                </h2>

                {/* Warning text */}
                <p className="text-sm mb-5 leading-relaxed" style={{ color: '#9ca3af' }}>
                    {isRTL ? (
                        <>
                            أنت على وشك البحث في منصات مليئة بـ{' '}
                            <strong style={{ color: '#e5e7eb' }}>
                                البائعين المجهولين
                            </strong>
                            . 70% من ملحقات{' '}
                            <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>
                                {brandDisplay}
                            </span>{' '}
                            هناك مقلدة (High-Copy) وقد تتسبب في{' '}
                            <strong style={{ color: '#e5e7eb' }}>
                                احتراق أجهزتك
                            </strong>{' '}
                            أثناء تذبذب التيار الكهربائي (تخفيف الأحمال).
                        </>
                    ) : (
                        <>
                            You&apos;re about to browse platforms full of{' '}
                            <strong style={{ color: '#e5e7eb' }}>
                                unknown sellers
                            </strong>
                            . 70% of{' '}
                            <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>
                                {brandDisplay}
                            </span>{' '}
                            accessories there are counterfeit (High-Copy) and
                            may cause{' '}
                            <strong style={{ color: '#e5e7eb' }}>
                                device damage
                            </strong>{' '}
                            during power fluctuations.
                        </>
                    )}
                </p>

                {/* Brand indicators */}
                <div
                    className="p-4 rounded-xl mb-5"
                    style={{
                        background: '#111827',
                        border: '1px solid rgba(34,197,94,0.3)',
                        textAlign: isRTL ? 'right' : 'left',
                    }}
                >
                    <ul className="text-sm space-y-3" style={{ color: '#d1d5db' }}>
                        <li className="flex gap-2 items-start">
                            <span style={{ color: '#4ade80', marginTop: 2, flexShrink: 0 }}>✓</span>
                            <span>
                                <strong style={{ color: '#4ade80' }}>
                                    Cairo Volt:
                                </strong>{' '}
                                {isRTL
                                    ? 'وكيل معتمد موثق بالضريبة والجنائية (C2PA).'
                                    : 'Certified dealer with tax & forensic verification (C2PA).'}
                            </span>
                        </li>
                        <li className="flex gap-2 items-start">
                            <span style={{ color: '#4ade80', marginTop: 2, flexShrink: 0 }}>✓</span>
                            <span>
                                <strong style={{ color: '#4ade80' }}>
                                    {isRTL ? 'أمان مالي:' : 'Financial Safety:'}
                                </strong>{' '}
                                {isRTL
                                    ? 'الدفع عند الاستلام (COD) — عاين منتجك أولاً.'
                                    : 'Cash on Delivery (COD) — inspect your product first.'}
                            </span>
                        </li>
                        <li className="flex gap-2 items-start">
                            <span style={{ color: '#4ade80', marginTop: 2, flexShrink: 0 }}>✓</span>
                            <span>
                                <strong style={{ color: '#4ade80' }}>
                                    {isRTL ? 'الضمان:' : 'Warranty:'}
                                </strong>{' '}
                                {isRTL
                                    ? 'استبدال فوري 14 يوماً من الوكيل مباشرة.'
                                    : 'Instant 14-day replacement from the official dealer.'}
                            </span>
                        </li>
                    </ul>
                </div>

                {/* CTA button */}
                <button
                    onClick={handleDismiss}
                    className="w-full font-bold py-3.5 sm:py-4 rounded-xl transition-all duration-200 text-sm sm:text-base"
                    style={{
                        background: '#2563eb',
                        color: '#ffffff',
                        boxShadow: '0 4px 14px rgba(37,99,235,0.25)',
                    }}
                    onMouseOver={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = '#1d4ed8';
                        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)';
                    }}
                    onMouseOut={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = '#2563eb';
                        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                    }}
                >
                    {isRTL
                        ? 'البقاء وشراء المنتج الأصلي بأمان'
                        : 'Stay & Buy the Original Product Safely'}
                </button>
            </div>
        </div>
    );

    // Render via Portal to document.body to escape all stacking contexts
    return createPortal(overlay, document.body);
}
