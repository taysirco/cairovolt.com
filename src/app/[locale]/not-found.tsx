import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: 'Page Not Found | 404' },
    robots: { index: false, follow: false },
};

export default function NotFound() {
    const locale = useLocale();
    const isRTL = locale === 'ar';

    const getLocalizedHref = (path: string) => {
        return isRTL ? path : `/en${path}`;
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="text-center max-w-lg">
                <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
                </h1>
                <p className="text-gray-500 mb-8">
                    {isRTL
                        ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
                        : 'Sorry, the page you are looking for does not exist or has been moved.'}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                    <Link
                        href={getLocalizedHref('/')}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        {isRTL ? 'الصفحة الرئيسية' : 'Go Home'}
                    </Link>
                    <Link
                        href={getLocalizedHref('/anker')}
                        className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-full hover:bg-gray-200 transition-colors"
                    >
                        {isRTL ? 'تسوق Anker' : 'Shop Anker'}
                    </Link>
                    <Link
                        href={getLocalizedHref('/joyroom')}
                        className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-full hover:bg-gray-200 transition-colors"
                    >
                        {isRTL ? 'تسوق Joyroom' : 'Shop Joyroom'}
                    </Link>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <p className="text-sm text-gray-400 mb-3">
                        {isRTL ? 'أقسام شائعة:' : 'Popular categories:'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            { href: '/anker/power-banks', ar: 'باور بانك', en: 'Power Banks' },
                            { href: '/anker/wall-chargers', ar: 'شواحن', en: 'Chargers' },
                            { href: '/joyroom/audio', ar: 'سماعات', en: 'Earbuds' },
                            { href: '/anker/cables', ar: 'كابلات', en: 'Cables' },
                        ].map(cat => (
                            <Link
                                key={cat.href}
                                href={getLocalizedHref(cat.href)}
                                className="px-3 py-1.5 text-sm bg-gray-50 text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                                {isRTL ? cat.ar : cat.en}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
