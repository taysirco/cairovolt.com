import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ReturnPolicy' });
    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        alternates: {
            canonical: locale === 'ar'
                ? 'https://cairovolt.com/return-policy'
                : 'https://cairovolt.com/en/return-policy',
            languages: {
                'ar': 'https://cairovolt.com/return-policy',
                'en': 'https://cairovolt.com/en/return-policy',
                'x-default': 'https://cairovolt.com/return-policy',
            },
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default function ReturnPolicyPage() {
    const t = useTranslations('ReturnPolicy');
    const locale = useLocale();
    const isArabic = locale === 'ar';

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isArabic ? '' : '/en'}` },
                    { name: t('title'), url: `https://cairovolt.com${isArabic ? '' : '/en'}/return-policy` },
                ]}
                locale={locale}
            />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            {t('title')}
                        </h1>
                        <p className="text-center text-gray-500 dark:text-gray-400 mb-10 text-sm">
                            {t('lastUpdated')}
                        </p>

                        <div className="space-y-8">
                            {/* Return Window */}
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                    <span className="text-3xl">📦</span>
                                    {t('window.title')}
                                </h2>
                                <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6 text-center">
                                    <p className="text-5xl font-bold text-orange-500 mb-2">14</p>
                                    <p className="text-lg font-medium">{t('window.days')}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('window.description')}</p>
                                </div>
                            </section>

                            {/* Eligibility */}
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                    <span className="text-3xl">✅</span>
                                    {t('eligible.title')}
                                </h2>
                                <ul className="space-y-3">
                                    {['unused', 'originalPackaging', 'accessories', 'receipt'].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="text-green-500 text-xl mt-0.5">✓</span>
                                            <span className="text-gray-600 dark:text-gray-300">{t(`eligible.${item}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Non-Returnable */}
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                    <span className="text-3xl">🚫</span>
                                    {t('nonReturnable.title')}
                                </h2>
                                <ul className="space-y-3">
                                    {['opened', 'damaged', 'misuse', 'noPackaging'].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="text-red-500 text-xl mt-0.5">✗</span>
                                            <span className="text-gray-600 dark:text-gray-300">{t(`nonReturnable.${item}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* How to Return */}
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                    <span className="text-3xl">🔄</span>
                                    {t('howToReturn.title')}
                                </h2>
                                <ol className="space-y-4">
                                    {['step1', 'step2', 'step3', 'step4'].map((step, index) => (
                                        <li key={step} className="flex items-start gap-4">
                                            <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold">
                                                {index + 1}
                                            </span>
                                            <span className="text-gray-600 dark:text-gray-300 pt-1">{t(`howToReturn.${step}`)}</span>
                                        </li>
                                    ))}
                                </ol>
                            </section>

                            {/* Refund Info */}
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                    <span className="text-3xl">💰</span>
                                    {t('refund.title')}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                                        <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-400">{t('refund.processing')}</h3>
                                        <p className="text-3xl font-bold text-green-600">5-7</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('refund.businessDays')}</p>
                                    </div>
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                                        <h3 className="font-semibold text-lg mb-2 text-blue-700 dark:text-blue-400">{t('refund.method')}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{t('refund.methodDescription')}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">{t('refund.shippingNote')}</p>
                            </section>

                            {/* Defective Products */}
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                    <span className="text-3xl">🛡️</span>
                                    {t('defective.title')}
                                </h2>
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                                    <p className="text-gray-700 dark:text-gray-300 mb-3">{t('defective.description')}</p>
                                    <ul className="space-y-2">
                                        {['freeReturn', 'fullRefund', 'warranty'].map((item) => (
                                            <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="text-blue-500">•</span>
                                                {t(`defective.${item}`)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            {/* Contact CTA */}
                            <section className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white shadow-lg">
                                <h2 className="text-2xl font-bold mb-3">{t('contact.title')}</h2>
                                <p className="mb-5 opacity-90">{t('contact.description')}</p>
                                <a
                                    href="https://wa.me/201063374834"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition-colors shadow-md"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    {t('contact.whatsapp')}
                                </a>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
