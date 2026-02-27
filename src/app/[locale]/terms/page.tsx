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
    const t = await getTranslations({ locale, namespace: 'Terms' });
    const title = t('metaTitle');
    const description = t('metaDescription');
    return {
        title,
        description,
        alternates: {
            canonical: locale === 'ar'
                ? 'https://cairovolt.com/terms'
                : 'https://cairovolt.com/en/terms',
            languages: {
                'ar': 'https://cairovolt.com/terms',
                'en': 'https://cairovolt.com/en/terms',
                'x-default': 'https://cairovolt.com/terms',
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

export default function TermsPage() {
    const t = useTranslations('Terms');
    const locale = useLocale();
    const isArabic = locale === 'ar';

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isArabic ? '' : '/en'}` },
                    { name: t('title'), url: `https://cairovolt.com${isArabic ? '' : '/en'}/terms` },
                ]}
                locale={locale}
            />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {t('title')}
                        </h1>
                        <p className="text-center text-gray-500 mb-12">{t('lastUpdated')}</p>

                        <div className="space-y-8">
                            {['acceptance', 'orders', 'pricing', 'shipping', 'returns', 'warranty', 'liability', 'changes'].map((section) => (
                                <section key={section} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                        {t(`sections.${section}.title`)}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                                        {t(`sections.${section}.content`)}
                                    </p>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
