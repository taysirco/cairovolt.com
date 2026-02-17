import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogArticle, getAllBlogSlugs, blogArticles } from '@/data/blog-articles';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import { ArticleSchema, SpeakableSchema, HowToSchema } from '@/components/schemas/AEOSchemas';
import { FAQSchema } from '@/components/schemas/ProductSchema';
import { getProductBySlug } from '@/lib/static-products';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { QuickAnswerBox } from '@/components/ui/QuickAnswerBox';
import { getEntitiesForArticle, entitiesToJsonLd } from '@/data/entity-registry';
import BlogInteractiveWidgets from '@/components/interactive/BlogInteractiveWidgets';

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
    const slugs = getAllBlogSlugs();
    return ['en', 'ar'].flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const article = getBlogArticle(slug);

    if (!article) return {};

    const isArabic = locale === 'ar';
    const trans = article.translations[isArabic ? 'ar' : 'en'];

    return {
        title: trans.metaTitle,
        description: trans.metaDescription,
        keywords: trans.keywords,
        alternates: {
            canonical: isArabic
                ? `https://cairovolt.com/blog/${slug}`
                : `https://cairovolt.com/en/blog/${slug}`,
            languages: {
                'ar': `https://cairovolt.com/blog/${slug}`,
                'en': `https://cairovolt.com/en/blog/${slug}`,
                'x-default': `https://cairovolt.com/blog/${slug}`,
            },
        },
        openGraph: {
            title: trans.metaTitle,
            description: trans.metaDescription,
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'article',
            siteName: isArabic ? 'كايرو فولت' : 'Cairo Volt',
            publishedTime: article.publishDate,
            modifiedTime: article.modifiedDate,
        },
        robots: {
            index: true,
            follow: true,
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

export default async function BlogArticlePage({ params }: Props) {
    const { locale, slug } = await params;
    const article = getBlogArticle(slug);

    if (!article) {
        notFound();
    }

    const isArabic = locale === 'ar';
    const trans = article.translations[isArabic ? 'ar' : 'en'];
    const catLabel = categoryLabels[article.category];

    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return locale === 'ar' ? cleanPath : `/${locale}${cleanPath}`;
    };

    // Get related articles (same category, excluding current)
    const relatedArticles = blogArticles
        .filter(a => a.slug !== slug)
        .slice(0, 3);

    return (
        <>
            {/* Schema Markup */}
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isArabic ? '' : '/en'}` },
                    { name: isArabic ? 'المدونة' : 'Blog', url: `https://cairovolt.com${isArabic ? '' : '/en'}/blog` },
                    { name: trans.title, url: `https://cairovolt.com${isArabic ? '' : '/en'}/blog/${slug}` },
                ]}
                locale={locale}
            />
            <ArticleSchema
                headline={trans.title}
                description={trans.metaDescription}
                url={`https://cairovolt.com${isArabic ? '' : '/en'}/blog/${slug}`}
                locale={locale}
                articleType="BlogPosting"
                datePublished={article.publishDate}
                dateModified={article.modifiedDate}
                about={entitiesToJsonLd(getEntitiesForArticle(slug).about, isArabic ? 'ar' : 'en')}
                mentions={entitiesToJsonLd(getEntitiesForArticle(slug).mentions, isArabic ? 'ar' : 'en')}
            />
            <SpeakableSchema
                pageUrl={`https://cairovolt.com${isArabic ? '' : '/en'}/blog/${slug}`}
                headline={trans.title}
                description={trans.metaDescription}
                locale={locale}
            />
            {trans.faq && trans.faq.length > 0 && (
                <FAQSchema faqs={trans.faq} locale={locale} />
            )}
            {/* HowTo Schema for the charger identification guide */}
            {slug === 'original-vs-fake-apple-charger-egypt' && (
                <HowToSchema
                    title={isArabic ? 'ازاي تفرق بين شاحن ابل الأصلي والتقليد' : 'How to Identify Original vs Fake Apple Charger'}
                    description={isArabic ? '7 خطوات لفحص شاحن ابل والتأكد إنه أصلي' : '7 steps to verify your Apple charger is authentic'}
                    steps={[
                        { name: isArabic ? 'افحص العلبة' : 'Check the box', text: isArabic ? 'العلبة الأصلية عليها باركود وطباعة عالية الجودة' : 'Original box has high-quality printing and barcode' },
                        { name: isArabic ? 'شوف الوزن' : 'Feel the weight', text: isArabic ? 'الأصلي أتقل بسبب مكونات الأمان الداخلية' : 'Original is heavier due to internal safety components' },
                        { name: isArabic ? 'افحص منفذ USB' : 'Inspect USB port', text: isArabic ? 'المنفذ الأصلي لونه رمادي متناسق والحواف ناعمة' : 'Authentic port has consistent grey color and smooth edges' },
                        { name: isArabic ? 'شوف كتابة Designed by Apple' : 'Check markings', text: isArabic ? 'الشاحن الأصلي مكتوب عليه Designed by Apple in California' : 'Genuine charger has "Designed by Apple in California" printed' },
                        { name: isArabic ? 'اختبر الشحن' : 'Test charging', text: isArabic ? 'الأصلي يشحن بدون سخونة زيادة ويعطي الواطية الصح' : 'Original charges without excessive heat and delivers correct wattage' },
                        { name: isArabic ? 'تحقق من الرقم التسلسلي' : 'Verify serial', text: isArabic ? 'استخدم موقع ابل للتحقق من الرقم التسلسلي' : 'Use Apple website to verify the serial number' },
                        { name: isArabic ? 'اشتري من موزع معتمد' : 'Buy authorized', text: isArabic ? 'اشتري من موزع معتمد زي كايرو فولت عشان تضمن الأصالة' : 'Buy from authorized dealers like CairoVolt to guarantee authenticity' },
                    ]}
                    locale={locale}
                />
            )}

            <main className="min-h-screen bg-white dark:bg-gray-900" dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Breadcrumb */}
                <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                    <div className="container mx-auto px-4 py-3">
                        <nav className="text-sm text-gray-500 flex items-center gap-1 flex-wrap">
                            <Link href={getLocalizedHref('/')} className="hover:text-blue-600 transition-colors">
                                {isArabic ? 'الرئيسية' : 'Home'}
                            </Link>
                            <span className="mx-1">/</span>
                            <Link href={getLocalizedHref('/blog')} className="hover:text-blue-600 transition-colors">
                                {isArabic ? 'المدونة' : 'Blog'}
                            </Link>
                            <span className="mx-1">/</span>
                            <span className="text-gray-900 dark:text-white font-medium truncate max-w-[250px]">
                                {trans.title}
                            </span>
                        </nav>
                    </div>
                </div>

                {/* Article Header */}
                <header className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
                    <div className="mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            <SvgIcon name={catLabel.icon} className="w-4 h-4" /> {isArabic ? catLabel.ar : catLabel.en}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        {trans.title}
                    </h1>

                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {trans.excerpt}
                    </p>

                    {/* Quick Answer Box - Concise answer for users and search engines */}
                    {trans.quickAnswer && (
                        <QuickAnswerBox answer={trans.quickAnswer} locale={locale} variant="highlighted" />
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-100 dark:border-gray-700">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <time dateTime={article.modifiedDate}>
                                {new Date(article.modifiedDate).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
                                    year: 'numeric', month: 'long', day: 'numeric',
                                })}
                            </time>
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {isArabic ? `${article.readingTime} دقائق قراءة` : `${article.readingTime} min read`}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            {isArabic ? 'فريق كايرو فولت' : 'Cairo Volt Team'}
                        </span>
                    </div>
                </header>

                {/* Article Content */}
                <article className="container mx-auto px-4 max-w-4xl pb-12">
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none
                            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100 dark:prose-h2:border-gray-800
                            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                            prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                            prose-li:text-gray-600 dark:prose-li:text-gray-300
                            prose-strong:text-gray-900 dark:prose-strong:text-white
                            prose-table:border-collapse prose-table:w-full prose-table:text-sm prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-sm prose-table:border prose-table:border-gray-200 dark:prose-table:border-gray-700
                            prose-th:bg-gradient-to-r prose-th:from-blue-600 prose-th:to-blue-700 prose-th:text-white prose-th:p-3.5 prose-th:text-start prose-th:font-bold prose-th:border-b prose-th:border-blue-500 prose-th:text-xs prose-th:uppercase prose-th:tracking-wider
                            prose-td:p-3.5 prose-td:border-b prose-td:border-gray-100 dark:prose-td:border-gray-700/50
                            [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-blue-50/50 dark:[&_tbody_tr:hover]:bg-blue-900/10 [&_tbody_tr:nth-child(even)]:bg-gray-50/50 dark:[&_tbody_tr:nth-child(even)]:bg-gray-800/30
                            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: trans.content }}
                    />

                    {/* Interactive Widgets (Calculators, Mermaid Diagrams) — Dwell Time optimization */}
                    <BlogInteractiveWidgets slug={slug} locale={locale} />

                    {/* FAQ Section */}
                    {trans.faq && trans.faq.length > 0 && (
                        <section className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                                <SvgIcon name="question" className="w-6 h-6" />
                                {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                            </h2>
                            <div className="space-y-3">
                                {trans.faq.map((item, idx) => (
                                    <details
                                        key={idx}
                                        className="group bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                                    >
                                        <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
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

                    {/* CTA */}
                    <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white text-center">
                        <h3 className="text-2xl font-bold mb-3">
                            {isArabic ? 'مستعد للشراء؟' : 'Ready to Buy?'}
                        </h3>
                        <p className="mb-6 text-white/90">
                            {isArabic
                                ? 'تسوق منتجات أصلية مع ضمان رسمي وتوصيل لباب البيت'
                                : 'Shop original products with official warranty and home delivery'}
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link
                                href={getLocalizedHref('/anker')}
                                className="px-6 py-3 bg-white text-blue-700 font-bold rounded-full hover:bg-gray-100 transition-colors"
                            >
                                {isArabic ? 'تسوق Anker' : 'Shop Anker'}
                            </Link>
                            <Link
                                href={getLocalizedHref('/joyroom')}
                                className="px-6 py-3 bg-white/10 border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-colors"
                            >
                                {isArabic ? 'تسوق Joyroom' : 'Shop Joyroom'}
                            </Link>
                        </div>
                    </div>

                    {/* Product Recommendations */}
                    {article.relatedProducts && article.relatedProducts.length > 0 && (
                        <section className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                {isArabic ? <><SvgIcon name="cart" className="w-6 h-6 inline-block" /> المنتجات المذكورة في المقال</> : <><SvgIcon name="cart" className="w-6 h-6 inline-block" /> Products Mentioned in This Article</>}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {article.relatedProducts.map((slug) => {
                                    const prod = getProductBySlug(slug);
                                    if (!prod) return null;
                                    const pTrans = prod.translations[isArabic ? 'ar' : 'en'];
                                    const brandColor = prod.brand.toLowerCase() === 'anker' ? 'blue' : 'red';
                                    return (
                                        <Link
                                            key={slug}
                                            href={getLocalizedHref(`/${prod.brand}/${prod.categorySlug}/${slug}`)}
                                            className={`group p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-${brandColor}-200 transition-all`}
                                        >
                                            <div className={`text-xs font-bold text-${brandColor}-600 mb-1`}>{prod.brand}</div>
                                            <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-2 line-clamp-2">{pTrans.name}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-bold text-green-600">
                                                    {prod.price.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                                                </span>
                                                <span className={`text-xs px-2 py-1 rounded-full bg-${brandColor}-50 dark:bg-${brandColor}-900/30 text-${brandColor}-700 dark:text-${brandColor}-300 group-hover:bg-${brandColor}-100 transition-colors`}>
                                                    {isArabic ? 'تسوق' : 'Shop'} →
                                                </span>
                                            </div>
                                            {prod.originalPrice && prod.originalPrice > prod.price && (
                                                <div className="mt-1">
                                                    <span className="text-xs text-gray-400 line-through">{prod.originalPrice.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}</span>
                                                    <span className="text-xs text-red-500 font-bold ml-2 rtl:mr-2 rtl:ml-0">
                                                        -{Math.round((1 - prod.price / prod.originalPrice) * 100)}%
                                                    </span>
                                                </div>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <section className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                {isArabic ? 'مقالات ذات صلة' : 'Related Articles'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {relatedArticles.map((related) => {
                                    const rTrans = related.translations[isArabic ? 'ar' : 'en'];
                                    const rCat = categoryLabels[related.category];
                                    return (
                                        <Link
                                            key={related.slug}
                                            href={getLocalizedHref(`/blog/${related.slug}`)}
                                            className="p-5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all hover:-translate-y-0.5"
                                        >
                                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                                <SvgIcon name={rCat.icon} className="w-4 h-4" /> {isArabic ? rCat.ar : rCat.en}
                                            </span>
                                            <h3 className="font-bold text-sm mt-2 text-gray-900 dark:text-white line-clamp-2">
                                                {rTrans.title}
                                            </h3>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    )}
                </article>
            </main>
        </>
    );
}
