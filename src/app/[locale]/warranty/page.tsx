import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';

export const revalidate = 2592000;

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Warranty' });
    const title = t('metaTitle');
    const description = t('metaDescription');
    return {
        title,
        description,
        alternates: {
            canonical: locale === 'ar'
                ? 'https://cairovolt.com/warranty'
                : 'https://cairovolt.com/en/warranty',
            languages: {
                'ar': 'https://cairovolt.com/warranty',
                'en': 'https://cairovolt.com/en/warranty',
                'x-default': 'https://cairovolt.com/warranty',
            },
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title,
            description,
            locale: locale === 'ar' ? 'ar_EG' : 'en_US',
            type: 'website',
            siteName: locale === 'ar' ? 'كايرو فولت' : 'Cairo Volt',
        },
        other: {
            'geo.region': 'EG',
            'geo.placename': locale === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt',
            'geo.position': '30.0444;31.2357',
            'ICBM': '30.0444, 31.2357',
        },
    };
}

export default async function WarrantyPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Warranty' });
    const isArabic = locale === 'ar';

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isArabic ? '' : '/en'}` },
                    { name: t('title'), url: `https://cairovolt.com${isArabic ? '' : '/en'}/warranty` },
                ]}
                locale={locale}
            />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                            {t('title')}
                        </h1>

                        <div className="space-y-8">
                            {/* Warranty Period */}
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                    <span className="text-3xl text-green-500">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                    </span>
                                    {t('period.title')}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center">
                                        <p className="text-5xl font-bold text-green-600 mb-2">18</p>
                                        <p className="text-lg font-medium">{t('period.ankerMonths')}</p>
                                        <p className="text-sm text-gray-500">{t('period.ankerProducts')}</p>
                                    </div>
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
                                        <p className="text-5xl font-bold text-blue-600 mb-2">12</p>
                                        <p className="text-lg font-medium">{t('period.joyroomMonths')}</p>
                                        <p className="text-sm text-gray-500">{t('period.joyroomProducts')}</p>
                                    </div>
                                </div>
                            </section>

                            {/* What's Covered */}
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                    <span className="text-3xl text-green-500">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </span>
                                    {t('covered.title')}
                                </h2>
                                <ul className="space-y-3">
                                    {['manufacturing', 'battery', 'charging', 'ports'].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="text-green-500 text-xl">✓</span>
                                            <span className="text-gray-600 dark:text-gray-300">{t(`covered.${item}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* What's Not Covered */}
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                    <span className="text-3xl text-red-500">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </span>
                                    {t('notCovered.title')}
                                </h2>
                                <ul className="space-y-3">
                                    {['physical', 'water', 'misuse', 'unauthorized'].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="text-red-500 text-xl">✗</span>
                                            <span className="text-gray-600 dark:text-gray-300">{t(`notCovered.${item}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* How to Claim */}
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                    <span className="text-3xl text-blue-500">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                    </span>
                                    {t('howToClaim.title')}
                                </h2>
                                <ol className="space-y-4">
                                    {['step1', 'step2', 'step3', 'step4'].map((step, index) => (
                                        <li key={step} className="flex items-start gap-4">
                                            <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full flex items-center justify-center font-bold">
                                                {index + 1}
                                            </span>
                                            <span className="text-gray-600 dark:text-gray-300 pt-1">{t(`howToClaim.${step}`)}</span>
                                        </li>
                                    ))}
                                </ol>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
