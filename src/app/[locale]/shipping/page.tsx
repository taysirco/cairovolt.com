import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Shipping' });
    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        alternates: {
            canonical: locale === 'ar'
                ? 'https://cairovolt.com/shipping'
                : 'https://cairovolt.com/en/shipping',
            languages: {
                'ar': 'https://cairovolt.com/shipping',
                'en': 'https://cairovolt.com/en/shipping',
                'x-default': 'https://cairovolt.com/shipping',
            },
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default function ShippingPage() {
    const t = useTranslations('Shipping');
    const locale = useLocale();
    const isArabic = locale === 'ar';

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isArabic ? '' : '/en'}` },
                    { name: t('title'), url: `https://cairovolt.com${isArabic ? '' : '/en'}/shipping` },
                ]}
                locale={locale}
            />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {t('title')}
                        </h1>

                        <div className="space-y-8">
                            {/* Delivery Areas */}
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                    <span className="text-3xl">🚚</span>
                                    {t('deliveryAreas.title')}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">{t('deliveryAreas.description')}</p>
                                <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {['cairo', 'giza', 'alexandria', 'delta', 'upperEgypt', 'redSea'].map((area) => (
                                        <li key={area} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <span className="text-green-500">✓</span>
                                            {t(`deliveryAreas.${area}`)}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Delivery Time */}
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                    <span className="text-3xl">⏰</span>
                                    {t('deliveryTime.title')}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                                        <h3 className="font-semibold text-lg mb-2">{t('deliveryTime.cairo')}</h3>
                                        <p className="text-3xl font-bold text-blue-600">1-2 {t('deliveryTime.days')}</p>
                                    </div>
                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                                        <h3 className="font-semibold text-lg mb-2">{t('deliveryTime.provinces')}</h3>
                                        <p className="text-3xl font-bold text-purple-600">3-5 {t('deliveryTime.days')}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Shipping Cost */}
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                    <span className="text-3xl">💰</span>
                                    {t('shippingCost.title')}
                                </h2>
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
                                    <p className="text-lg mb-2">{t('shippingCost.freeShipping')}</p>
                                    <p className="text-gray-600 dark:text-gray-400">{t('shippingCost.belowMinimum')}</p>
                                </div>
                            </section>

                            {/* Cash on Delivery */}
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                    <span className="text-3xl">💵</span>
                                    {t('cod.title')}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">{t('cod.description')}</p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
