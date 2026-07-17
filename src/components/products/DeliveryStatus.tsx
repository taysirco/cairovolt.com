interface DeliveryStatusProps {
    sku: string;
    locale: string;
    brandColor?: 'blue' | 'red';
}

/**
 * Static shipping-policy summary.
 *
 * This component deliberately avoids simulated activity, stock, order counts,
 * or dispatch timestamps. The final delivery window is confirmed only after the
 * order address has been reviewed.
 */
export function DeliveryStatus({ locale, brandColor = 'blue' }: DeliveryStatusProps) {
    const isArabic = locale === 'ar';
    const accentColor = brandColor === 'blue' ? 'text-blue-700 dark:text-blue-400' : 'text-red-700 dark:text-red-400';
    const borderColor = brandColor === 'blue' ? 'border-blue-200 dark:border-blue-900/30' : 'border-red-200 dark:border-red-900/30';

    return (
        <div
            className={`bg-gray-50 dark:bg-gray-950/80 border ${borderColor} p-4 mt-6 rounded-xl text-sm`}
            aria-label={isArabic ? 'معلومات الشحن' : 'Shipping information'}
            dir={isArabic ? 'rtl' : 'ltr'}
        >
            <p className="font-bold text-gray-900 dark:text-white mb-3">
                {isArabic ? 'معلومات الشحن والطلب' : 'Shipping and order information'}
            </p>
            <ul className="grid gap-2 text-gray-700 dark:text-gray-300 sm:grid-cols-3">
                <li className="flex items-start gap-2">
                    <span aria-hidden="true" className={accentColor}>✓</span>
                    <span>{isArabic ? 'التوصيل متاح للعناوين المؤهلة داخل مصر' : 'Delivery is available to eligible addresses within Egypt'}</span>
                </li>
                <li className="flex items-start gap-2">
                    <span aria-hidden="true" className={accentColor}>✓</span>
                    <span>{isArabic ? 'الدفع عند الاستلام للطلبات المؤهلة' : 'Cash on delivery for eligible orders'}</span>
                </li>
                <li className="flex items-start gap-2">
                    <span aria-hidden="true" className={accentColor}>ⓘ</span>
                    <span>
                        {isArabic
                            ? 'مدة التوصيل تقديرية، ويُؤكد الموعد بعد مراجعة الطلب والعنوان.'
                            : 'Delivery timing is an estimate and is confirmed after reviewing the order and address.'}
                    </span>
                </li>
            </ul>
        </div>
    );
}

/** Neutral Suspense fallback retained for the existing product-page boundary. */
export function LivePulseSkeleton() {
    return (
        <div className="bg-gray-50 dark:bg-gray-950/80 border border-gray-200 dark:border-gray-800 p-4 mt-6 rounded-xl">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-40 mb-3" />
            <div className="grid gap-2 sm:grid-cols-3">
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
        </div>
    );
}
