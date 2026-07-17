import Link from 'next/link';
import { getBrandDisplayName } from '@/lib/arabic-brand-names';

/** Links an eligible order to its CairoVolt warranty-record lookup. */
export default function BrandVerification({
    brand,
    locale = 'ar',
}: {
    brand: string;
    locale: string;
}) {
    const isRTL = locale === 'ar';
    const brandDisplay = getBrandDisplayName(brand, locale);
    const verifyHref = isRTL ? '/verify' : '/en/verify';

    return (
        <aside className="container mx-auto px-4 mt-5" aria-labelledby="brand-verification-title">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/20 p-4">
                <span className="text-2xl" aria-hidden="true">🔐</span>
                <div className="flex-1">
                    <h2 id="brand-verification-title" className="font-bold text-gray-900 dark:text-white">
                        {isRTL ? `راجع سجل ضمان ${brandDisplay}` : `Check your ${brandDisplay} warranty record`}
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        {isRTL
                            ? 'إذا كان مع طلبك سيريال على كرت ضمان كايرو فولت، يمكنك إدخاله لعرض سجل الضمان. لا يعد السجل شهادة أصالة من الشركة المصنّعة.'
                            : 'If your order includes a serial on a CairoVolt warranty card, enter it to view the warranty record. The record is not a manufacturer authenticity certificate.'}
                    </p>
                </div>
                <Link
                    href={verifyHref}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg bg-gray-900 dark:bg-white px-4 py-2 text-sm font-bold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
                >
                    {isRTL ? 'عرض سجل الضمان' : 'View warranty record'}
                </Link>
            </div>
        </aside>
    );
}
