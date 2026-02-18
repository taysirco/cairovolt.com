import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { FAQSchema, BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import VoiceSearchFAQ from '@/components/seo/VoiceSearchFAQ';
import DarkSocialTracker from '@/components/seo/DarkSocialTracker';

export const revalidate = 86400;

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'FAQ' });
    const title = t('metaTitle');
    const description = t('metaDescription');
    return {
        title,
        description,
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
            <BreadcrumbSchema
                items={[
                    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${locale === 'ar' ? '' : '/en'}` },
                    { name: t('title'), url: `https://cairovolt.com${locale === 'ar' ? '' : '/en'}/faq` },
                ]}
                locale={locale}
            />
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
                                        <span className="text-3xl text-orange-500">
                                            {category === 'ordering' && (
                                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
                                            )}
                                            {category === 'shipping' && (
                                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                                            )}
                                            {category === 'warranty' && (
                                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                            )}
                                            {category === 'products' && (
                                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                            )}
                                            {category === 'payment' && (
                                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                            )}
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

                        {/* Voice Search FAQ — Egyptian Arabic Q&A for voice/AI search */}
                        <div className="mt-8">
                            <VoiceSearchFAQ
                                productName={locale === 'ar' ? 'أسئلة شائعة — كايرو فولت' : 'FAQ — Cairo Volt'}
                                locale={locale}
                                qaList={locale === 'ar' ? [
                                    { question: 'هو باور بانك أنكر بيشغل راوتر WE لما النور يقطع؟', answer: 'أيوة، اختبرناه في كايرو فولت وبيشغل راوتر WE VDSL لمدة 14 ساعة متواصلة دون إعادة تشغيل.' },
                                    { question: 'بتوصلوا لحد بابي ولا لازم أنزل؟', answer: 'بنوصل لحد باب بيتك في كل محافظات مصر. القاهرة والجيزة في 24-48 ساعة، والشحن 40 جنيه أو مجاني فوق 500 جنيه.' },
                                    { question: 'إيه يضمنلي إن المنتج أصلي؟', answer: 'كايرو فولت شركة مسجلة (سجل تجاري 8446). كل منتج متبرشم وعليه باركود أصلي للتحقق من موقع أنكر. ضمان 18 شهر.' },
                                ] : [
                                    { question: 'Does the Anker 737 power bank run a WE router during power cuts?', answer: 'Yes, we tested it at CairoVolt and it runs a WE VDSL router for 14 continuous hours without restart.' },
                                    { question: 'Do you deliver to my door?', answer: 'We deliver to all 27 Egyptian governorates. Cairo/Giza in 24-48 hours, 40 EGP shipping or free above 500 EGP.' },
                                    { question: 'How do I verify products are original?', answer: 'CairoVolt is registered (CR: 8446). All products come sealed with original barcode verifiable on Anker\'s site. 18-month warranty.' },
                                ]}
                            />
                        </div>

                        {/* Dark Social Tracker */}
                        <DarkSocialTracker />

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

