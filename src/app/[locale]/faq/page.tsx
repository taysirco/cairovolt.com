import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { FAQSchema } from '@/components/schemas/ProductSchema';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'FAQ' });
    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        alternates: {
            canonical: locale === 'ar'
                ? 'https://cairovolt.com/faq'
                : 'https://cairovolt.com/en/faq',
            languages: {
                'ar': 'https://cairovolt.com/faq',
                'en': 'https://cairovolt.com/en/faq',
                'x-default': 'https://cairovolt.com/faq',
            },
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

const faqCategories = ['ordering', 'shipping', 'warranty', 'products', 'payment'] as const;

export default async function FAQPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'FAQ' });

    // Build FAQ data for Schema
    const allFaqs: Array<{ question: string; answer: string }> = [];
    for (const category of faqCategories) {
        for (const num of [1, 2, 3]) {
            allFaqs.push({
                question: t(`categories.${category}.q${num}`),
                answer: t(`categories.${category}.a${num}`),
            });
        }
    }

    return (
        <>
            <FAQSchema faqs={allFaqs} locale={locale} />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {t('title')}
                        </h1>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
                            {t('subtitle')}
                        </p>

                        <div className="space-y-8">
                            {faqCategories.map((category) => (
                                <section key={category} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                                        <span className="text-3xl">
                                            {category === 'ordering' && '🛒'}
                                            {category === 'shipping' && '🚚'}
                                            {category === 'warranty' && '🛡️'}
                                            {category === 'products' && '📱'}
                                            {category === 'payment' && '💳'}
                                        </span>
                                        {t(`categories.${category}.title`)}
                                    </h2>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((num) => (
                                            <details key={num} className="group bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                                <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                                                    <span>{t(`categories.${category}.q${num}`)}</span>
                                                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                                                </summary>
                                                <p className="px-5 pb-5 text-gray-600 dark:text-gray-400">
                                                    {t(`categories.${category}.a${num}`)}
                                                </p>
                                            </details>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>

                        {/* Contact CTA */}
                        <div className="mt-12 text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-4">{t('stillNeedHelp')}</h3>
                            <p className="mb-6 opacity-90">{t('contactUs')}</p>
                            <Link href="/contact" className="inline-block bg-white text-orange-600 font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-shadow">
                                {t('contactButton')}
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

