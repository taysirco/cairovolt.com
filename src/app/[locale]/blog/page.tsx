import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogArticles } from '@/data/blog-articles';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import { SvgIcon } from '@/components/ui/SvgIcon';

export const revalidate = 86400;

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isArabic = locale === 'ar';

    const title = isArabic
        ? 'مدونة كايرو فولت | أدلة شراء ومراجعات اكسسوارات الموبايل'
        : 'CairoVolt Blog | Mobile Accessories Guides & Reviews';
    const description = isArabic
        ? 'أدلة شراء شاملة ومقارنات ومراجعات لأفضل اكسسوارات الموبايل في مصر. باور بانك، شواحن، سماعات من Anker و Joyroom.'
        : 'Complete buying guides, comparisons, and reviews for the best mobile accessories in Egypt. Power banks, chargers, earbuds from Anker & Joyroom.';

    return {
        title: { absolute: title },
        description,
        alternates: {
            canonical: isArabic
                ? 'https://cairovolt.com/blog'
                : 'https://cairovolt.com/en/blog',
            languages: {
                'ar-EG': 'https://cairovolt.com/blog',
                'en-EG': 'https://cairovolt.com/en/blog',
                'x-default': 'https://cairovolt.com/blog',
            },
        },
        openGraph: {
            title,
            description,
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'website',
            siteName: isArabic ? 'كايرو فولت' : 'CairoVolt',
        },
        other: {
            'geo.region': 'EG',
            'geo.placename': isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt',
            'geo.position': '30.0444;31.2357',
            'ICBM': '30.0444, 31.2357',
        },
    };
}

const categoryLabels: Record<string, { ar: string; en: string; icon: string }> = {
    'buying-guide': { ar: 'دليل شراء', en: 'Buying Guide', icon: 'book' },
    'comparison': { ar: 'مقارنة', en: 'Comparison', icon: 'scale' },
    'how-to': { ar: 'شرح', en: 'How-To', icon: 'wrench' },
    'review': { ar: 'مراجعة', en: 'Review', icon: 'star' },
    'tips': { ar: 'نصائح', en: 'Tips', icon: 'bulb' },
};

export default async function BlogPage({ params }: Props) {
    const { locale } = await params;
    const isArabic = locale === 'ar';

    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return locale === 'ar' ? cleanPath : `/${locale}${cleanPath}`;
    };

    // Sort articles by modified date descending
    const sortedArticles = [...blogArticles].sort(
        (a, b) => new Date(b.modifiedDate).getTime() - new Date(a.modifiedDate).getTime()
    );

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isArabic ? '' : '/en'}` },
                    { name: isArabic ? 'المدونة' : 'Blog', url: `https://cairovolt.com${isArabic ? '' : '/en'}/blog` },
                ]}
                locale={locale}
            />

            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-12 md:py-16">
                    {/* Hero */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {isArabic ? 'مدونة كايرو فولت' : 'CairoVolt Blog'}
                        </h1>
                        <p className="text-xl md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {isArabic
                                ? 'أدلة شراء شاملة، مقارنات، ونصائح لاختيار أفضل اكسسوارات الموبايل في مصر'
                                : 'Complete buying guides, comparisons, and tips for choosing the best mobile accessories in Egypt'}
                        </p>
                    </div>

                    {/* Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 max-w-6xl mx-auto">
                        {sortedArticles.map((article) => {
                            const trans = article.translations[isArabic ? 'ar' : 'en'];
                            const catLabel = categoryLabels[article.category];

                            return (
                                <Link
                                    key={article.slug}
                                    href={getLocalizedHref(`/blog/${article.slug}`)}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Cover Image */}
                                    <div className="relative aspect-[1.91/1] overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/10">
                                        {article.coverImage ? (
                                            <Image
                                                src={article.coverImage}
                                                alt={trans.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                                                <SvgIcon name={catLabel.icon} className="w-16 h-16 text-white/20" />
                                            </div>
                                        )}
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                        {/* Category Badge on image */}
                                        <div className="absolute top-3 start-3">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm text-blue-700 dark:text-blue-300 shadow-sm">
                                                <SvgIcon name={catLabel.icon} className="w-3.5 h-3.5" /> {isArabic ? catLabel.ar : catLabel.en}
                                            </span>
                                        </div>
                                        {/* Reading time on image */}
                                        <div className="absolute bottom-3 end-3">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm text-white">
                                                {isArabic ? `${article.readingTime} د` : `${article.readingTime} min`}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 md:p-5">
                                        <h2 className="text-lg md:text-base font-bold text-gray-900 dark:text-white mb-3 md:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                                            {trans.title}
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-3 line-clamp-2">
                                            {trans.excerpt}
                                        </p>

                                        {/* Meta */}
                                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
                                            <span>
                                                {new Date(article.modifiedDate).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                                                {isArabic ? 'اقرأ المزيد' : 'Read more'}
                                                <svg className="w-3.5 h-3.5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>
        </>
    );
}
