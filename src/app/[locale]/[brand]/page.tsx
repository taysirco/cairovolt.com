import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { brandData } from '@/data/brand-data';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import { BrandOverviewBlock } from '@/components/content/CategoryOverviewBlock';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { QuickAnswerBox } from '@/components/ui/QuickAnswerBox';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import ShareAnalytics from '@/components/content/ShareAnalytics';
import { staticProducts } from '@/lib/static-products';
import BestSellingProducts from '@/components/products/BestSellingProducts';
import SoundcoreFamilyStrip from '@/components/products/SoundcoreFamilyStrip';
import CategoryDiscoveryGrid from '@/components/brand/CategoryDiscoveryGrid';

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

    // CTR-optimized brand page title
    const brandProductCount = staticProducts.filter(
        p => p.status === 'active' && p.brand.toLowerCase() === brand.toLowerCase()
    ).length;
    const brandName = data.hero.title.replace(/\s*Egypt$/i, '');
    const arTitle = `منتجات ${brandName} الأصلية في مصر ⚡ ${brandProductCount} منتج | ضمان كايرو فولت`;
    const enTitle = `${brandName} Products in Egypt ⚡ ${brandProductCount} Products | CairoVolt Warranty`;

    const dynamicTitle = isArabic ? arTitle : enTitle;
    const canonical = isArabic
        ? `https://cairovolt.com/${brand.toLowerCase()}`
        : `https://cairovolt.com/en/${brand.toLowerCase()}`;

    // Strict lowercase for canonical URLs (URL best practice)
    return {
        title: { absolute: dynamicTitle },
        description: meta.description,
        keywords: meta.keywords,
        alternates: {
            canonical,
            languages: {
                'ar-EG': `https://cairovolt.com/${brand.toLowerCase()}`,
                'en-EG': `https://cairovolt.com/en/${brand.toLowerCase()}`,
                'x-default': `https://cairovolt.com/${brand.toLowerCase()}`,
            },
        },
        openGraph: {
            ...(meta.openGraph || {}),
            title: dynamicTitle,
            description: meta.description,
            url: canonical,
            siteName: 'CairoVolt',
            locale: isArabic ? 'ar_EG' : 'en_EG',
            type: 'website',
            ...(socialImageUrl && {
                images: [{ url: socialImageUrl, alt: socialImageAlt, width: 800, height: 800 }]
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: dynamicTitle,
            description: meta.description,
            images: socialImageUrl ? [socialImageUrl] : undefined,
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

    const brandProductCount = staticProducts.filter(product =>
        product.status === 'active' && product.brand.toLowerCase() === brand.toLowerCase()
    ).length;
    const brandName = data.hero.title.replace(/\s*Egypt$/i, '');
    const pageHeading = isRTL
        ? `منتجات ${brandName} الأصلية في مصر`
        : `Original ${brandName} Products in Egypt`;
    const pageDescription = isRTL ? data.metadata.ar.description : data.metadata.en.description;

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

            {/* FAQPage schema removed — Google deprecated FAQ rich results May 7, 2026 */}

            {/* Compact commerce header: one clear H1 and a short, visible answer.
                The category and product decision layers follow immediately in
                the same DOM order for customers, crawlers, and screen readers. */}
            <header id="brand-hero" className="relative scroll-mt-32 overflow-hidden py-4 md:py-5">
                {/* Dynamic Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${data.hero.bgGradient} opacity-90`}></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>

                {/* Content */}
                <div className="container relative z-10 mx-auto px-4 text-center lg:grid lg:grid-cols-5 lg:items-center lg:gap-8 lg:text-start">
                    <div className="lg:col-span-3">
                        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-[11px] font-bold tracking-wide text-white md:text-xs">
                                {isRTL ? data.hero.badge.ar : data.hero.badge.en}
                            </span>
                        </div>

                        <h1 className="mb-2 bg-gradient-to-b from-white to-white/70 bg-clip-text text-2xl font-black leading-tight tracking-tight text-transparent drop-shadow-sm md:text-3xl lg:text-4xl">
                            {pageHeading}
                        </h1>

                        <p data-top-summary className={`mx-auto mb-4 max-w-4xl text-sm font-light leading-relaxed md:text-base lg:mx-0 lg:mb-0 ${brand === 'joyroom' ? 'text-red-50' : 'text-blue-50'
                            }`}>
                            {isRTL ? data.hero.description.ar : data.hero.description.en}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2.5 lg:col-span-2 lg:justify-end">
                        <a
                            href="#shop-by-category"
                            className="group inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-black text-gray-900 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl md:text-sm"
                        >
                            <SvgIcon name="compass" className={`h-4 w-4 ${brand === 'joyroom' ? 'text-red-600' : 'text-blue-600'}`} />
                            {isRTL ? 'اختر القسم' : 'Choose a category'}
                            <span aria-hidden="true">{isRTL ? '←' : '→'}</span>
                        </a>
                        <a
                            href="#best-sellers"
                            className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-black text-white backdrop-blur-sm transition hover:bg-white/20 md:text-sm"
                        >
                            <SvgIcon name="fire" className="h-4 w-4" />
                            {isRTL ? 'الأكثر مبيعًا' : 'Best sellers'}
                            <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
                        </a>

                        {data.hero.heroProduct && (
                            <Link
                                href={getLocalizedHref(data.hero.heroProduct.link.href)}
                                className="group hidden min-h-10 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-black text-white backdrop-blur-sm transition hover:bg-white/20 md:text-sm lg:inline-flex"
                            >
                                <SvgIcon name="star" className="h-4 w-4" />
                                <span>{isRTL ? data.hero.heroProduct.link.text.ar : data.hero.heroProduct.link.text.en}</span>
                                <span aria-hidden="true" className={`${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`}>
                                    {isRTL ? '←' : '→'}
                                </span>
                            </Link>
                        )}

                        <span className="hidden text-[11px] font-medium text-white/80 sm:inline md:text-xs">
                            {isRTL ? 'أصلي 100% · ادفع عند الاستلام' : '100% original · Cash on delivery'}
                        </span>
                    </div>
                </div>
            </header>

            {/* Verification Banner (Joyroom Only) */}
            {brand === 'joyroom' && (
                <div className="overflow-hidden bg-yellow-400 py-2 text-black">
                    <div className="container mx-auto flex items-center justify-center gap-2 px-4 text-center text-xs font-bold md:text-sm">
                        {isRTL ? 'تنبيه: تأكد دائماً من وجود "الكود الذهبي" لضمان المنتج الأصلي.' : 'Alert: Always verify the "Golden Code" to ensure authenticity.'}
                    </div>
                </div>
            )}

            <div id="commerce-entry">
                <CategoryDiscoveryGrid
                    collection={brand as 'anker' | 'joyroom'}
                    categories={data.categories}
                    locale={locale}
                    pageName={pageHeading}
                    pageDescription={pageDescription}
                />

                <BestSellingProducts
                    brandSlug={brand}
                    brandDisplayName={data.hero.title}
                    locale={locale}
                    maxProducts={20}
                />
            </div>

            {/* Visible, server-rendered answer-engine context remains on the
                page, but follows the shopping decisions instead of blocking
                them above the fold. */}
            <section id="brand-guide" aria-labelledby={`${brand}-guide-heading`} className="scroll-mt-32 bg-white py-8 dark:bg-gray-950 sm:py-10">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-5 max-w-3xl text-center">
                        <span className={`text-xs font-black uppercase tracking-wide ${brand === 'joyroom' ? 'text-red-700' : 'text-blue-700'}`}>
                            {isRTL ? 'دليل شراء موثوق' : 'Trusted buying guide'}
                        </span>
                        <h2 id={`${brand}-guide-heading`} className="mt-2 text-2xl font-black text-gray-950 dark:text-white md:text-3xl">
                            {isRTL ? `ملخص ${brandName} للشراء في مصر` : `${brandName} buying summary for Egypt`}
                        </h2>
                    </div>

                    {data.quickAnswer && (
                        <div className="mx-auto mb-5 max-w-3xl">
                            <QuickAnswerBox
                                answer={isRTL ? data.quickAnswer.ar : data.quickAnswer.en}
                                locale={locale}
                                variant="subtle"
                            />
                        </div>
                    )}

                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        {data.hero.features.map((feature) => (
                            <div key={feature.en} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 md:px-5 md:py-2.5 md:text-sm">
                                <span className="text-green-600" aria-hidden="true">✓</span>
                                {isRTL ? feature.ar : feature.en}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Soundcore relationship remains visible and crawlable, but
                no longer sits between Anker shoppers and Anker products. */}
            {brand === 'anker' && <SoundcoreFamilyStrip locale={locale} />}

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
                    totalProducts={brandProductCount}
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
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
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
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
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
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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
