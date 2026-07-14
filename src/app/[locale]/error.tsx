'use client';

import { useLocale } from 'next-intl';
import { useEffect, useRef } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const retryCount = useRef(0);

    useEffect(() => {
        // Browser extensions (e.g., phone number detectors, Skype, Google Voice)
        // modify the DOM between SSR and hydration, causing React to throw
        // "Failed to execute 'removeChild' on 'Node'" errors. These are
        // not real application errors — auto-retry to let React re-render
        // cleanly after the extension has finished modifying the DOM.
        const isHydrationError =
            error?.message?.includes('removeChild') ||
            error?.message?.includes('insertBefore') ||
            error?.message?.includes('appendChild') ||
            error?.message?.includes('Hydration') ||
            error?.message?.includes('hydrating');

        if (isHydrationError && retryCount.current < 3) {
            retryCount.current += 1;
            // Small delay to let any browser extension finish mutating the DOM
            const timer = setTimeout(() => {
                reset();
            }, 100);
            return () => clearTimeout(timer);
        }

        // Log non-hydration errors to console for debugging
        console.error(error);
    }, [error, reset]);

    // While auto-retrying hydration errors, don't flash the error UI
    const isHydrationError =
        error?.message?.includes('removeChild') ||
        error?.message?.includes('insertBefore') ||
        error?.message?.includes('appendChild') ||
        error?.message?.includes('Hydration') ||
        error?.message?.includes('hydrating');

    if (isHydrationError && retryCount.current < 3) {
        // Show nothing while retrying — prevents flash of error UI
        return null;
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="text-center max-w-lg">
                <div className="text-6xl font-bold text-red-500 mb-6">!</div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {isRTL ? 'حدث خطأ ما!' : 'Something went wrong!'}
                </h2>
                <p className="text-gray-500 mb-8">
                    {isRTL
                        ? 'عذراً، حدث خطأ غير متوقع. فريقنا يعمل على إصلاحه.'
                        : 'Sorry, an unexpected error occurred. Our team is working on fixing it.'}
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        {isRTL ? 'محاولة مرة أخرى' : 'Try again'}
                    </button>
                    <a
                        href={isRTL ? '/' : '/en'}
                        className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-full hover:bg-gray-200 transition-colors"
                    >
                        {isRTL ? 'الصفحة الرئيسية' : 'Go Home'}
                    </a>
                </div>
            </div>
        </div>
    );
}
