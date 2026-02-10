import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Warranty' });
    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
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
    };
}

export default function WarrantyPage() {
    const t = useTranslations('Warranty');

    return (
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
                                <span className="text-3xl">🛡️</span>
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
                                <span className="text-3xl">✅</span>
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
                                <span className="text-3xl">❌</span>
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
                                <span className="text-3xl">📋</span>
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
    );
}
