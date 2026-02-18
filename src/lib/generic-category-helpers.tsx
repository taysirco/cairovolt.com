import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getGenericCategory } from '@/data/generic-categories';
import { getBlogArticle } from '@/data/blog-articles';
import { staticProducts } from '@/lib/static-products';
import { BreadcrumbSchema, FAQSchema } from '@/components/schemas/ProductSchema';
import VoiceSearchFAQ from '@/components/seo/VoiceSearchFAQ';
import DarkSocialTracker from '@/components/seo/DarkSocialTracker';

/**
 * Generate metadata for a generic category page
 * Used by each static category route (/earbuds, /power-banks, etc.)
 */
export function generateCategoryMetadata(locale: string, categorySlug: string): Metadata {
    const data = getGenericCategory(categorySlug);
    if (!data) return {};

    const cleanSlug = categorySlug.toLowerCase();
    const isArabic = locale === 'ar';
    const meta = data.metadata[isArabic ? 'ar' : 'en'];

    const canonicalUrl = isArabic
        ? `https://cairovolt.com/${cleanSlug}`
        : `https://cairovolt.com/en/${cleanSlug}`;

    return {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'ar': `https://cairovolt.com/${cleanSlug}`,
                'en': `https://cairovolt.com/en/${cleanSlug}`,
                'x-default': `https://cairovolt.com/${cleanSlug}`,
            },
        },
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: canonicalUrl,
            locale: isArabic ? 'ar_EG' : 'en_US',
            alternateLocale: isArabic ? 'en_US' : 'ar_EG',
            type: 'website',
            siteName: isArabic ? 'كايرو فولت' : 'Cairo Volt',
            images: [{
                url: 'https://cairovolt.com/logo.png',
                width: 1200,
                height: 630,
                alt: meta.title,
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.title,
            description: meta.description,
            images: ['https://cairovolt.com/logo.png'],
        },
        robots: { index: true, follow: true },
        other: {
            'article:author': isArabic ? 'كايرو فولت' : 'Cairo Volt',
            'geo.region': 'EG',
            'geo.placename': isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt',
            'geo.position': '30.0444;31.2357',
            'ICBM': '30.0444, 31.2357',
        },
    };
}

/**
 * Shared generic category page content component
 * Used by each static category route (/earbuds, /power-banks, etc.)
 */
export function GenericCategoryContent({
    locale,
    categorySlug,
}: {
    locale: string;
    categorySlug: string;
}) {
    const data = getGenericCategory(categorySlug);
    if (!data) return null;

    const cleanSlug = categorySlug.toLowerCase();

    const isArabic = locale === 'ar';
    const content = data.content[isArabic ? 'ar' : 'en'];
    const faq = data.faq[isArabic ? 'ar' : 'en'];
    const richContent = data.richContent[isArabic ? 'ar' : 'en'];
    const relatedArticles = data.relatedBlogSlugs
        .map(slug => getBlogArticle(slug))
        .filter(Boolean);

    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return locale === 'ar' ? cleanPath : `/${locale}${cleanPath}`;
    };

    // Gather products from all brand categories
    const allProducts = data.brandCategories.flatMap(bc => {
        return staticProducts
            .filter(p => p.brand.toLowerCase() === bc.brand.toLowerCase() && p.categorySlug === bc.categorySlug)
            .map(p => ({
                ...p,
                brandDisplay: bc.brand,
                brandSlug: bc.brandSlug,
                catSlug: bc.categorySlug,
            }));
    });

    // Sort: featured first, then by price
    const sortedProducts = allProducts.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.price - b.price;
    });

    return (
        <>
            {/* Schema */}
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isArabic ? '' : '/en'}` },
                    { name: content.title, url: `https://cairovolt.com${isArabic ? '' : '/en'}/${cleanSlug}` },
                ]}
                locale={locale}
            />
            {faq.length > 0 && <FAQSchema faqs={faq} locale={locale} />}

            <main className="min-h-screen bg-gray-50 dark:bg-gray-950" dir={isArabic ? 'rtl' : 'ltr'} itemScope itemType="https://schema.org/CollectionPage">
                <meta itemProp="name" content={content.title} />
                <meta itemProp="description" content={data.metadata[isArabic ? 'ar' : 'en'].description} />
                <meta itemProp="inLanguage" content={isArabic ? 'ar' : 'en'} />

                {/* Breadcrumb */}
                <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                    <div className="container mx-auto px-4 py-3">
                        <nav className="text-sm text-gray-500 flex items-center gap-1" aria-label="Breadcrumb">
                            <Link href={getLocalizedHref('/')} className="hover:text-blue-600 transition-colors">
                                {isArabic ? 'الرئيسية' : 'Home'}
                            </Link>
                            <span className="mx-1">/</span>
                            <span className="text-gray-900 dark:text-white font-medium">{content.title}</span>
                        </nav>
                    </div>
                </div>

                {/* Hero */}
                <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 md:py-16">
                    <div className="container mx-auto px-4 text-center max-w-3xl">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4" itemProp="headline">{content.title}</h1>
                        <p className="text-lg md:text-xl text-white/90 mb-6">{content.subtitle}</p>
                        <p className="text-white/80 text-sm md:text-base leading-relaxed">{content.intro}</p>
                    </div>
                </header>

                {/* Brand Filters + Products */}
                <section className="container mx-auto px-4 py-8" aria-label={isArabic ? 'المنتجات' : 'Products'}>
                    <nav className="flex flex-wrap gap-3 justify-center mb-8" aria-label={isArabic ? 'تصفية حسب العلامة' : 'Filter by brand'}>
                        {data.brandCategories.map(bc => (
                            <Link
                                key={bc.brand}
                                href={getLocalizedHref(`/${bc.brandSlug}/${bc.categorySlug}`)}
                                className={`px-5 py-2.5 rounded-full font-medium text-sm border transition-all hover:shadow-md ${bc.brand === 'Anker'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
                                    : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                                    }`}
                            >
                                {isArabic ? `تسوق ${bc.brand}` : `Shop ${bc.brand}`}
                            </Link>
                        ))}
                    </nav>

                    {/* Products Grid */}
                    {sortedProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {sortedProducts.map((product) => {
                                const t = product.translations[isArabic ? 'ar' : 'en'];
                                const primaryImage = product.images?.find(i => i.isPrimary)?.url || product.images?.[0]?.url;
                                const discount = product.originalPrice > product.price
                                    ? Math.round((1 - product.price / product.originalPrice) * 100)
                                    : 0;

                                return (
                                    <Link
                                        key={product.slug}
                                        href={getLocalizedHref(`/${product.brandSlug}/${product.catSlug}/${product.slug}`)}
                                        className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 p-4" itemProp="image">
                                            {discount > 0 && (
                                                <span className={`absolute top-2 ${isArabic ? 'right-2' : 'left-2'} px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full z-10`}>
                                                    -{discount}%
                                                </span>
                                            )}
                                            <span className={`absolute top-2 ${isArabic ? 'left-2' : 'right-2'} px-2 py-0.5 text-xs font-medium rounded-full z-10 ${product.brandDisplay === 'Anker'
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                                                }`}>
                                                {product.brandDisplay}
                                            </span>
                                            {primaryImage ? (
                                                <Image
                                                    src={primaryImage}
                                                    alt={t?.name || product.slug}
                                                    fill
                                                    loading="lazy"
                                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-300">
                                                    {product.brandDisplay.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="p-3 md:p-4">
                                            <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors" itemProp="name">
                                                {t?.name || product.slug}
                                            </h3>
                                            <div className="flex items-end gap-2" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                                                <meta itemProp="priceCurrency" content="EGP" />
                                                <meta itemProp="availability" content={product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'} />
                                                <span className="text-lg font-bold text-gray-900 dark:text-white" itemProp="price" content={String(product.price)}>
                                                    {product.price.toLocaleString()}
                                                </span>
                                                <span className="text-xs text-gray-500">{isArabic ? 'ج.م' : 'EGP'}</span>
                                                {product.originalPrice > product.price && (
                                                    <span className="text-xs text-gray-400 line-through">
                                                        {product.originalPrice.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-gray-500">
                            <p className="text-lg">{isArabic ? 'لا توجد منتجات حالياً' : 'No products available'}</p>
                        </div>
                    )}
                </section>

                {/* Buying Tips */}
                <section className="bg-white dark:bg-gray-900 py-12" aria-label={isArabic ? 'نصائح الشراء' : 'Buying Tips'}>
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                            {isArabic ? 'نصائح الشراء' : 'Buying Tips'}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {content.buyingTips.map((tip, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                                        {idx + 1}
                                    </span>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                {faq.length > 0 && (
                    <section className="container mx-auto px-4 py-12 max-w-4xl" aria-label={isArabic ? 'الأسئلة الشائعة' : 'FAQ'}>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                            {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                        </h2>
                        <div className="space-y-3">
                            {faq.map((item, idx) => (
                                <details
                                    key={idx}
                                    className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                                >
                                    <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <span className={`${isArabic ? 'pl-4' : 'pr-4'}`}>{item.question}</span>
                                        <span className="transform group-open:rotate-180 transition-transform text-gray-400 flex-shrink-0">▼</span>
                                    </summary>
                                    <div className="px-5 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                                        {item.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>
                )}

                {/* Rich Content (SEO guide) */}
                {richContent && (
                    <article className="bg-white dark:bg-gray-900 py-12 border-t border-gray-100 dark:border-gray-800" itemScope itemType="https://schema.org/Article">
                        <meta itemProp="headline" content={content.title} />
                        <meta itemProp="author" content={isArabic ? 'كايرو فولت' : 'Cairo Volt'} />
                        <meta itemProp="dateModified" content={new Date().toISOString().split('T')[0]} />
                        <meta itemProp="publisher" content={isArabic ? 'كايرو فولت' : 'Cairo Volt'} />
                        <meta itemProp="inLanguage" content={isArabic ? 'ar' : 'en'} />
                        <div className="container mx-auto px-4 max-w-4xl">
                            <div
                                className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-gray-900 dark:prose-h2:text-white prose-table:text-sm prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-3 prose-td:p-3 prose-table:border prose-table:border-gray-200 dark:prose-table:border-gray-700 prose-tr:border-b prose-tr:border-gray-200 dark:prose-tr:border-gray-700 prose-strong:text-gray-900 dark:prose-strong:text-white prose-a:text-blue-600 prose-li:my-1"
                                dangerouslySetInnerHTML={{ __html: richContent }}
                                itemProp="articleBody"
                            />
                        </div>
                    </article>
                )}

                {/* Related Blog Articles */}
                {relatedArticles.length > 0 && (
                    <section className="bg-gray-50 dark:bg-gray-950 py-12 border-t border-gray-100 dark:border-gray-800" aria-label={isArabic ? 'مقالات ذات صلة' : 'Related Articles'}>
                        <div className="container mx-auto px-4 max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                                {isArabic ? 'مقالات ذات صلة' : 'Related Articles'}
                            </h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                {relatedArticles.map(article => {
                                    if (!article) return null;
                                    const trans = article.translations[isArabic ? 'ar' : 'en'];
                                    return (
                                        <Link
                                            key={article.slug}
                                            href={getLocalizedHref(`/blog/${article.slug}`)}
                                            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-all hover:-translate-y-1"
                                        >
                                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                                                {article.category}
                                            </span>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mt-2 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm">
                                                {trans.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                                {trans.metaDescription}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                            <div className="text-center mt-6">
                                <Link
                                    href={getLocalizedHref('/blog')}
                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                                >
                                    {isArabic ? 'عرض كل المقالات' : 'View All Articles'}
                                    <span>{isArabic ? '←' : '→'}</span>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Voice Search FAQ — Egyptian Arabic Q&A for voice/AI search domination */}
                {faq.length > 0 && (
                    <section className="container mx-auto px-4 py-8 max-w-4xl">
                        <VoiceSearchFAQ
                            productName={content.title}
                            locale={locale}
                            qaList={faq.slice(0, 4).map(f => ({
                                question: f.question,
                                answer: f.answer,
                            }))}
                        />
                    </section>
                )}

                {/* Dark Social Tracker for category pages */}
                <DarkSocialTracker />

                {/* HowTo Schema for buying tips — AEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'HowTo',
                            name: isArabic ? `كيف تختار أفضل ${content.title}` : `How to Choose the Best ${content.title}`,
                            description: data.metadata[isArabic ? 'ar' : 'en'].description,
                            step: content.buyingTips.map((tip, i) => ({
                                '@type': 'HowToStep',
                                position: i + 1,
                                text: tip,
                            })),
                        }),
                    }}
                />

                {/* Speakable Schema — AEO (voice search) */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebPage',
                            name: content.title,
                            speakable: {
                                '@type': 'SpeakableSpecification',
                                cssSelector: ['h1', '.prose h2', '.prose p', 'summary', 'details > div'],
                            },
                            url: `https://cairovolt.com${isArabic ? '' : '/en'}/${categorySlug}`,
                        }),
                    }}
                />

                {/* CollectionPage Schema + AggregateOffer */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'CollectionPage',
                            name: content.title,
                            description: data.metadata[isArabic ? 'ar' : 'en'].description,
                            url: `https://cairovolt.com${isArabic ? '' : '/en'}/${categorySlug}`,
                            inLanguage: isArabic ? 'ar' : 'en',
                            dateModified: new Date().toISOString().split('T')[0],
                            author: {
                                '@type': 'Organization',
                                name: isArabic ? 'كايرو فولت' : 'Cairo Volt',
                                url: 'https://cairovolt.com',
                            },
                            isPartOf: {
                                '@type': 'WebSite',
                                name: isArabic ? 'كايرو فولت' : 'Cairo Volt',
                                url: 'https://cairovolt.com',
                            },
                            about: {
                                '@type': 'Thing',
                                name: content.title,
                                description: data.metadata[isArabic ? 'ar' : 'en'].description,
                            },
                            ...(sortedProducts.length > 0 && {
                                mainEntity: {
                                    '@type': 'ItemList',
                                    numberOfItems: sortedProducts.length,
                                    itemListElement: sortedProducts.slice(0, 10).map((p, i) => ({
                                        '@type': 'ListItem',
                                        position: i + 1,
                                        url: `https://cairovolt.com${isArabic ? '' : '/en'}/${p.brandSlug}/${p.catSlug}/${p.slug}`,
                                        name: p.translations[isArabic ? 'ar' : 'en']?.name || p.slug,
                                    })),
                                },
                                offers: {
                                    '@type': 'AggregateOffer',
                                    priceCurrency: 'EGP',
                                    lowPrice: Math.min(...sortedProducts.map(p => p.price)),
                                    highPrice: Math.max(...sortedProducts.map(p => p.price)),
                                    offerCount: sortedProducts.length,
                                    availability: 'https://schema.org/InStock',
                                },
                            }),
                        }),
                    }}
                />
            </main>
        </>
    );
}
