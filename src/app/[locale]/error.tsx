'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const locale = useLocale();
    const isRTL = locale === 'ar';

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

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
