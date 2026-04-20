import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { brandData } from '@/data/brand-data';
import { ArticleSchema } from '@/components/schemas/StructuredDataSchemas';
import { FAQSchema, BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import { BrandOverviewBlock } from '@/components/content/CategoryOverviewBlock';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { QuickAnswerBox } from '@/components/ui/QuickAnswerBox';
import { getEntitiesForBrand, entitiesToJsonLd } from '@/data/brand-entities';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import ShareAnalytics from '@/components/content/ShareAnalytics';
import { staticProducts } from '@/lib/static-products';
import BestSellingProducts from '@/components/products/BestSellingProducts';

// ISR: On-demand revalidation only (via /api/indexing webhook)
export const dynamicParams = false; // Unknown slugs → automatic 404 (prevents soft 404)

type Props = {
    params: Promise<{ locale: string; brand: string }>;
};

export async function generateStaticParams() {
    const brands = Object.keys(brandData);
    const locales = ['ar', 'en'];
    return locales.flatMap(locale =>
        brands.map(brand => ({ locale, brand }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, brand } = await params;
    const data = brandData[brand.toLowerCase()];

    if (!data) return {};

    const meta = locale === 'ar' ? data.metadata.ar : data.metadata.en;
    const isArabic = locale === 'ar';

    // Use first product image for this brand as the social share image
    // Falls back to layout logo if no products found
    const brandFirstProduct = staticProducts.find(
        p => p.brand.toLowerCase() === brand.toLowerCase() && p.images?.[0]?.url
    );
    const socialImageUrl = brandFirstProduct?.images[0]?.url
        ? `https://cairovolt.com${brandFirstProduct.images[0].url}`
        : undefined;
    const socialImageAlt = brandFirstProduct?.images[0]?.alt
        || (isArabic ? `${data.hero.title} - كايرو فولت مصر` : `${data.hero.title} - CairoVolt Egypt`);

    // Page metadata setup
    const titleVariantIndex = brand.length % 3;

    const arTitleVariants = [
        `منتجات ${data.hero.title} الأصلية في مصر 2026`,
        `تسوق ${data.hero.title} بضمان الوكيل الرسمي`,
        `${data.hero.title} الأصلية بأفضل سعر في مصر`
    ];

    const enTitleVariants = [
        `Original ${data.hero.title} Products in Egypt 2026`,
        `Shop ${data.hero.title} with Official Warranty`,
        `Best Price for Original ${data.hero.title} Gear`
    ];

    const dynamicTitle = isArabic ? arTitleVariants[titleVariantIndex] : enTitleVariants[titleVariantIndex];

    // Strict lowercase for canonical URLs (URL best practice)
    return {
        title: { absolute: dynamicTitle },
        description: meta.description,
        keywords: meta.keywords,
        alternates: {
            canonical: locale === 'ar'
                ? `https://cairovolt.com/${brand.toLowerCase()}`
                : `https://cairovolt.com/en/${brand.toLowerCase()}`,
            languages: {
                'ar': `https://cairovolt.com/${brand.toLowerCase()}`,
                'en': `https://cairovolt.com/en/${brand.toLowerCase()}`,
                'x-default': `https://cairovolt.com/${brand.toLowerCase()}`,
            },
        },
        openGraph: {
            ...(meta.openGraph || {}),
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'website',
            ...(socialImageUrl && {
                images: [{ url: socialImageUrl, alt: socialImageAlt, width: 800, height: 800 }]
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.title,
            description: meta.description,
            images: socialImageUrl ? [socialImageUrl] : undefined,
        },
        other: {
            'geo.region': 'EG',
            'geo.placename': isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt',
            'geo.position': '30.0444;31.2357',
            'ICBM': '30.0444, 31.2357',
        },
    };
}

export default async function BrandHubPage({ params }: Props) {
    const { locale, brand } = await params;
    const isRTL = locale === 'ar';
    const data = brandData[brand.toLowerCase()];

    if (!data) {
        notFound();
    }

    // Helper to get localized href
    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return isRTL ? cleanPath : `/${locale}${cleanPath}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Structured data */}
            <BreadcrumbSchema
                items={[
                    { name: isRTL ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isRTL ? '' : '/en'}` },
                    { name: data.hero.title, url: `https://cairovolt.com${isRTL ? '' : '/en'}/${brand.toLowerCase()}` },
                ]}
                locale={locale}
            />

            {/* Article Schema for Content */}
            {data.article && (
                <ArticleSchema
                    headline={isRTL ? data.article.ar.title : data.article.en.title}
                    description={isRTL ? data.metadata.ar.description : data.metadata.en.description}
                    url={`https://cairovolt.com${isRTL ? '' : '/en'}/${brand.toLowerCase()}`}
                    locale={locale}
                    articleType="Article"
                    sections={(isRTL ? data.article.ar.sections : data.article.en.sections).map((s: { heading: string; content: string }) => ({
                        heading: s.heading,
                        content: s.content
                    }))}
                    about={entitiesToJsonLd(getEntitiesForBrand(brand).slice(0, 3), isRTL ? 'ar' : 'en')}
                    mentions={entitiesToJsonLd(getEntitiesForBrand(brand).slice(3), isRTL ? 'ar' : 'en')}
                />
            )}

            {/* FAQ Schema */}
            {data.faq && (
                <FAQSchema
                    faqs={(isRTL ? data.faq.ar : data.faq.en).map(item => ({
                        question: item.question,
                        answer: item.answer
                    }))}
                    locale={locale}
                />
            )}

            {/* Hero Section 2.0 */}
            <section className={`relative overflow-hidden py-20 md:py-32`}>
                {/* Dynamic Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${data.hero.bgGradient} opacity-90`}></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>

                {/* Content */}
                <div className="container relative z-10 mx-auto px-4 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span className="text-white text-sm md:text-base font-bold tracking-wide">
                            {isRTL ? data.hero.badge.ar : data.hero.badge.en}
                        </span>
                    </div>

                    {/* Title (Brand Declaration) */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 tracking-tight drop-shadow-sm leading-tight max-w-5xl mx-auto">
                        {isRTL
                            ? `متجر كايرو فولت: وجهتك الموثوقة لمنتجات ${data.hero.title} الأصلية في مصر`
                            : `CairoVolt Store: Your Trusted Destination for Original ${data.hero.title} in Egypt`}
                    </h1>

                    {/* Description */}
                    <p className={`text-lg md:text-2xl font-light mb-6 max-w-3xl mx-auto leading-relaxed ${brand === 'joyroom' ? 'text-red-50' : 'text-blue-50'
                        }`}>
                        {isRTL ? data.hero.description.ar : data.hero.description.en}
                    </p>

                    {/* Quick Answer Box */}
                    {data.quickAnswer && (
                        <div className="max-w-2xl mx-auto mb-10">
                            <QuickAnswerBox
                                answer={isRTL ? data.quickAnswer.ar : data.quickAnswer.en}
                                locale={locale}
                                variant="subtle"
                            />
                        </div>
                    )}

                    {/* Hero Product - Pulsing CTA */}
                    {data.hero.heroProduct && (
                        <div className="mb-12 animate-bounce-slow">
                            <Link
                                href={getLocalizedHref(data.hero.heroProduct.link.href)}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold shadow-2xl hover:scale-105 transition-transform duration-300 group"
                            >
                                <span className={`text-xl ${brand === 'joyroom' ? 'text-red-600' : 'text-blue-600'}`}><SvgIcon name="star" className="w-5 h-5" /></span>
                                <span>{isRTL ? data.hero.heroProduct.link.text.ar : data.hero.heroProduct.link.text.en}</span>
                                <span className={`${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`}>
                                    {isRTL ? '←' : '→'}
                                </span>
                            </Link>
                        </div>
                    )}

                    {/* Features Grid */}
                    <div className="flex flex-wrap justify-center gap-3 md:gap-6">
                        {data.hero.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 px-5 py-2.5 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 text-white/90 text-sm md:text-base font-medium">
                                <span className="text-green-400">✓</span>
                                {isRTL ? feature.ar : feature.en}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Verification Banner (Joyroom Only) */}
            {brand === 'joyroom' && (
                <div className="bg-yellow-400 text-black py-3 overflow-hidden">
                    <div className="container mx-auto px-4 flex items-center justify-center gap-2 text-center font-bold text-sm md:text-base animate-pulse">
                        {isRTL ? 'تنبيه: تأكد دائماً من وجود "الكود الذهبي" لضمان المنتج الأصلي.' : 'Alert: Always verify the "Golden Code" to ensure authenticity.'}
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* Best-Selling Products — Top 20 with images & prices        */}
            {/* Drives engagement: customers see top products first        */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <BestSellingProducts
                brandSlug={brand}
                brandDisplayName={data.hero.title}
                locale={locale}
                maxProducts={20}
            />

            {/* Categories Grid (App Style) — Browse by category */}
            <section className="container mx-auto px-4 py-20 -mt-10 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {data.categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            href={getLocalizedHref(cat.href)}
                            className={`group relative p-6 md:p-10 rounded-3xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-800 overflowing-hidden
                                ${brand === 'joyroom' ? 'hover:border-red-500/30' : 'hover:border-blue-500/30'}`}
                        >
                            {/* Floating Badge */}
                            {cat.badge && (
                                <span className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-bold rounded-full shadow-lg z-10`}>
                                    {isRTL ? cat.badge.ar : cat.badge.en}
                                </span>
                            )}

                            {/* Icon */}
                            <div className="text-4xl md:text-6xl mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                <SvgIcon name={cat.icon} className="w-10 h-10" />
                            </div>

                            {/* Text Content */}
                            <h3 className={`text-lg md:text-2xl font-black mb-2 ${brand === 'joyroom' ? 'group-hover:text-red-600' : 'group-hover:text-blue-600'}`}>
                                {isRTL ? cat.title.ar : cat.title.en}
                            </h3>
                            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium mb-4">
                                {isRTL ? cat.description.ar : cat.description.en}
                            </p>

                            {/* Action Row */}
                            <div className="flex items-center justify-between mt-4 md:mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <span className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    {isRTL ? cat.volume.ar : cat.volume.en}
                                </span>
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 group-hover:bg-white group-hover:shadow-md transition-all ${brand === 'joyroom' ? 'text-red-600' : 'text-blue-600'}`}>
                                    {isRTL ? '←' : '→'}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* Extended Info Section: Brand Overview & Trust Elements */}
            {/* Brand content section */}
            {/* ═══════════════════════════════════════════════════════════ */}

            {/* Brand Overview Block - Content Context */}
            <div className="container mx-auto px-4 py-4 relative z-20">
                <BrandOverviewBlock
                    brandName={data.hero.title}
                    brandDescription={isRTL ? data.hero.description.ar : data.hero.description.en}
                    categoryCount={data.categories.length}
                    totalProducts={50}
                    locale={locale}
                />
            </div>

            {/* Quality Badges Banner */}
            {data.trustBadges && (
                <section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-6 border-y border-gray-100 dark:border-gray-700">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {data.trustBadges.map((badge, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
                                    <SvgIcon name={badge.icon} className="w-7 h-7 mb-2" />
                                    <span className="font-bold text-sm text-gray-900 dark:text-white">
                                        {isRTL ? badge.title.ar : badge.title.en}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {isRTL ? badge.description.ar : badge.description.en}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* About Section with History & Achievements */}
            {data.aboutSection && (
                <section className="py-16 bg-white dark:bg-gray-950">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black mb-4 dark:text-white">
                                {isRTL ? data.aboutSection.title.ar : data.aboutSection.title.en}
                            </h2>
                            <div className={`h-1.5 w-24 mx-auto rounded-full ${brand === 'joyroom' ? 'bg-red-600' : 'bg-blue-600'}`}></div>
                        </div>
                        <div className="max-w-4xl mx-auto mb-12">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-8 rounded-3xl border border-blue-100 dark:border-gray-700">
                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    {isRTL ? data.aboutSection.history.ar : data.aboutSection.history.en}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                            {data.aboutSection.achievements.map((achievement, idx) => (
                                <div key={idx} className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800">
                                    <SvgIcon name={achievement.icon} className="w-8 h-8 mb-2 mx-auto text-blue-500" />
                                    <span className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 block mb-1">
                                        {isRTL ? achievement.stat.ar : achievement.stat.en}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {isRTL ? achievement.label.ar : achievement.label.en}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="max-w-5xl mx-auto">
                            <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">
                                {isRTL ? 'التقنيات الحصرية' : 'Exclusive Technologies'}
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {data.aboutSection.technologies.map((tech, idx) => (
                                    <div key={idx} className="p-5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                                        <h4 className="font-bold text-lg mb-2 text-blue-600 dark:text-blue-400">
                                            {tech.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {isRTL ? tech.description.ar : tech.description.en}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* The Trust Vault (Why Section) */}
            <section className="py-20 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 dark:text-white">
                            {isRTL ? data.whySection.title.ar : data.whySection.title.en}
                        </h2>
                        <div className={`h-1.5 w-24 mx-auto rounded-full ${brand === 'joyroom' ? 'bg-red-600' : 'bg-blue-600'}`}></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.whySection.items.map((item, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 text-center hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 group">
                                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                                    <SvgIcon name={item.icon} className="w-12 h-12 mx-auto" />
                                </div>
                                <h4 className="text-xl font-bold mb-3 dark:text-white">
                                    {isRTL ? item.title.ar : item.title.en}
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {isRTL ? item.description.ar : item.description.en}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Article Section (The Meat) */}
            {data.article && (
                <section className="py-20 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <article className="prose prose-lg dark:prose-invert mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                                {isRTL ? data.article.ar.title : data.article.en.title}
                            </h2>
                            {(isRTL ? data.article.ar.sections : data.article.en.sections).map((section, idx) => (
                                <div key={idx} className="mb-10">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <span className={`w-1 h-8 rounded-full ${brand === 'joyroom' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                                        {section.heading}
                                    </h3>
                                    <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                        <MarkdownRenderer content={section.content} />
                                    </div>
                                </div>
                            ))}
                        </article>
                    </div>
                </section>
            )}

            {/* FAQ Section (Accordion) */}
            {data.faq && (
                <section className="py-20 bg-gray-50 dark:bg-gray-950">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                        </h2>
                        <div className="space-y-4">
                            {(isRTL ? data.faq.ar : data.faq.en).map((item, idx) => (
                                <details key={idx} className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 open:shadow-lg transition-all duration-300">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                        <span className="font-bold text-lg dark:text-white">{item.question}</span>
                                        <span className="transform group-open:rotate-180 transition-transform duration-300 text-gray-400">
                                            ▼
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-800 pt-4">
                                        {item.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQSection removed — was duplicating the same FAQ questions shown above */}

            {/* Share Analytics — captures WhatsApp shares */}
            <ShareAnalytics />

        </div>
    );
}

