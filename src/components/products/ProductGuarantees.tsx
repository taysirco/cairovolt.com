import Link from 'next/link';
import type { RegionalStats } from '@/lib/bosta';

interface ProductGuaranteesProps {
    sku: string;
    userGovernorate: string;
    locale: string;
    deliveryStats: RegionalStats;
}

/**
 * Clear shipping and payment information based on the published policy.
 * No live carrier activity or performance claims are shown here.
 */
export default function ProductGuarantees({
    userGovernorate,
    locale,
    deliveryStats,
}: ProductGuaranteesProps) {
    const isRTL = locale === 'ar';
    const policyHref = isRTL ? '/shipping' : '/en/shipping';

    return (
        <section
            className="relative overflow-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-white p-6 md:p-8 rounded-2xl my-8 shadow-lg border border-gray-200 dark:border-gray-800"
            id="shipping-information"
            aria-labelledby="shipping-information-title"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500" />

            <div className="flex items-start gap-3 mb-6">
                <div className="w-11 h-11 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center border border-blue-100 dark:border-blue-900/50 shrink-0" aria-hidden="true">
                    🚚
                </div>
                <div>
                    <h3 id="shipping-information-title" className="text-lg sm:text-xl font-black">
                        {isRTL ? 'معلومات الشحن والدفع' : 'Shipping and payment information'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {isRTL
                            ? `تقدير مرجعي للشحن إلى ${userGovernorate}`
                            : `Reference estimate for delivery to ${userGovernorate}`}
                    </p>
                </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800">
                    <span className="text-xl" aria-hidden="true">🗓️</span>
                    <h4 className="font-bold mt-2 mb-1">{isRTL ? 'المدة التقديرية' : 'Estimated timing'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{deliveryStats.delivery_estimate}</p>
                </div>

                <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800">
                    <span className="text-xl" aria-hidden="true">📍</span>
                    <h4 className="font-bold mt-2 mb-1">{isRTL ? 'نطاق التغطية' : 'Coverage'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{deliveryStats.coverage}</p>
                </div>

                <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800">
                    <span className="text-xl" aria-hidden="true">💵</span>
                    <h4 className="font-bold mt-2 mb-1">{isRTL ? 'طريقة الدفع' : 'Payment'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        {deliveryStats.cash_on_delivery
                            ? (isRTL ? 'الدفع عند الاستلام متاح للطلبات المؤهلة' : 'Cash on delivery is available for eligible orders')
                            : (isRTL ? 'تُراجع طرق الدفع عند تأكيد الطلب' : 'Payment options are reviewed at confirmation')}
                    </p>
                </div>
            </div>

            <div className="mt-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 p-4 text-sm text-gray-700 dark:text-gray-300">
                <p>{deliveryStats.confirmation_note}</p>
                <Link href={policyHref} className="inline-flex mt-2 font-bold text-blue-700 dark:text-blue-400 hover:underline">
                    {isRTL ? 'اقرأ سياسة الشحن' : 'Read the shipping policy'}
                </Link>
            </div>
        </section>
    );
}
