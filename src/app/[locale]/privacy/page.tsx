import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Privacy' });
    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        alternates: {
            canonical: locale === 'ar'
                ? 'https://cairovolt.com/privacy'
                : 'https://cairovolt.com/en/privacy',
            languages: {
                'ar': 'https://cairovolt.com/privacy',
                'en': 'https://cairovolt.com/en/privacy',
                'x-default': 'https://cairovolt.com/privacy',
            },
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default function PrivacyPage() {
    const t = useTranslations('Privacy');

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                        {t('title')}
                    </h1>
                    <p className="text-center text-gray-500 mb-12">{t('lastUpdated')}</p>

                    <div className="space-y-8">
                        {['collection', 'usage', 'sharing', 'security', 'cookies', 'rights', 'contact'].map((section) => (
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
    );
}
