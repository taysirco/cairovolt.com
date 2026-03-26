import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';

export const revalidate = 2592000;

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Shipping' });
    const title = t('metaTitle');
    const description = t('metaDescription');
    const canonicalUrl = locale === 'ar'
        ? 'https://cairovolt.com/shipping'
        : 'https://cairovolt.com/en/shipping';
    return {
        title: { absolute: title },
        description,
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
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            locale: locale === 'ar' ? 'ar_EG' : 'en_US',
            type: 'website',
            siteName: locale === 'ar' ? 'كايرو فولت' : 'Cairo Volt',
            images: [{ url: '/og-cover.png', width: 1200, height: 630, alt: locale === 'ar' ? 'كايرو فولت - اكسسوارات الموبايل' : 'Cairo Volt - Mobile Accessories' }],
        },
        other: {
            'geo.region': 'EG',
            'geo.placename': locale === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt',
            'geo.position': '30.0444;31.2357',
            'ICBM': '30.0444, 31.2357',
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
                                    <span className="text-3xl text-blue-500">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                                    </span>
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
                                    <span className="text-3xl text-purple-500">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </span>
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
                                    <span className="text-3xl text-green-500">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </span>
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
                                    <span className="text-3xl text-green-600">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    </span>
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
