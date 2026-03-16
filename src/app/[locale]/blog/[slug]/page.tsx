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

import DarkSocialTracker from '@/components/seo/DarkSocialTracker';
import BlogContentRenderer from '@/components/ui/BlogContentRenderer';

// Defense-in-depth: sanitize HTML content even from static sources
function sanitizeHtml(html: string): string {
    return html
        // Fix malformed tags with internal spaces (e.g. `< table >` → `<table>`)
        // These cause browser DOM auto-correction that breaks React hydration
        .replace(/<\s+(\w)/g, '<$1')
        .replace(/(\w)\s+>/g, '$1>')
        .replace(/<\s+\//g, '</')
        .replace(/\s+>/g, '>')
        // Security: strip dangerous elements
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
        .replace(/<object[\s\S]*?<\/object>/gi, '')
        .replace(/<embed[^>]*>/gi, '')
        .replace(/<form[\s\S]*?<\/form>/gi, '')
        .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/\son\w+\s*=\s*\S+/gi, '')
        .replace(/javascript\s*:/gi, 'blocked:')
        .replace(/data\s*:/gi, 'blocked:');
}

export const revalidate = 86400;
export const dynamicParams = true;

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
            // Blog articles don't have dedicated cover images but this
            // explicit images:[] prevents inheriting the 200x60 layout logo
            images: [],
        },
        // Explicit twitter block prevents falling back to layout logo.png
        // Use 'summary' (not large image) since we have no cover photo
        twitter: {
            card: 'summary',
            title: trans.metaTitle,
            description: trans.metaDescription,
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

    // articleVoiceFAQ removed — was duplicating FAQ section content on the same page

    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return locale === 'ar' ? cleanPath : `/${locale}${cleanPath}`;
    };

    // Get related articles (same category, excluding current)
    const relatedArticles = blogArticles
        .filter(a => a.slug !== slug)
        .slice(0, 3);

    return (
        <div suppressHydrationWarning>
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
            {/* ClaimReview Schema — White Hat factual safety claim for counterfeit charger articles */}
            {(slug === 'original-vs-fake-apple-charger-egypt' || slug === 'do-fake-chargers-damage-iphone-battery') && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'ClaimReview',
                            url: `https://cairovolt.com${isArabic ? '' : '/en'}/blog/${slug}`,
                            claimReviewed: isArabic
                                ? 'الشواحن الرخيصة غير المعتمدة آمنة على بطارية الهاتف مثل الشواحن الأصلية.'
                                : 'Cheap, non-certified chargers are as safe for your phone battery as original chargers.',
                            itemReviewed: {
                                '@type': 'Claim',
                                author: { '@type': 'Organization', name: isArabic ? 'تجار السوق' : 'Market vendors' },
                                datePublished: article.publishDate,
                                appearance: {
                                    '@type': 'OpinionNewsArticle',
                                    url: `https://cairovolt.com${isArabic ? '' : '/en'}/blog/${slug}`,
                                },
                            },
                            author: {
                                '@type': 'Organization',
                                name: isArabic ? 'مختبر كايرو فولت للفحص التقني' : 'CairoVolt Hardware Validation Labs',
                                url: 'https://cairovolt.com',
                            },
                            reviewRating: {
                                '@type': 'Rating',
                                ratingValue: '1',
                                bestRating: '5',
                                worstRating: '1',
                                alternateName: isArabic ? 'خاطئ ومضلل — تسبب حرائق' : 'False & Misleading — Causes fires',
                            },
                            text: isArabic
                                ? 'مختبر كايرو فولت أثبت أن الشواحن غير المعتمدة تصل درجة حرارتها لـ 65+ مئوية مقابل 42 مئوية للشواحن الأصلية. هذا يسبب انتفاخ البطارية وربما حرائق.'
                                : 'CairoVolt Labs proved non-certified chargers reach 65°C+ vs 42°C for original chargers. This causes battery swelling and potential fire hazards.',
                        }),
                    }}
                />
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

            {/* Dark Social Tracker — captures WhatsApp shares as trackable direct traffic */}
            <DarkSocialTracker />

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

                    <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 md:mb-6 leading-tight">
                        {trans.title}
                    </h1>

                    <p className="text-xl md:text-lg text-gray-600 dark:text-gray-300 mb-8 md:mb-6 leading-relaxed">
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
                            {article.author ? article.author.name[isArabic ? 'ar' : 'en'] : (isArabic ? 'فريق كايرو فولت' : 'Cairo Volt Team')}
                        </span>
                    </div>
                </header>

                {/* Article Content */}
                <article className="container mx-auto px-4 md:px-4 max-w-4xl pb-16 md:pb-12">
                    <BlogContentRenderer
                        html={sanitizeHtml(trans.content)}
                        className="prose prose-xl md:prose-lg dark:prose-invert max-w-none
                            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                            prose-h2:text-3xl md:prose-h2:text-2xl prose-h2:mt-12 md:prose-h2:mt-10 prose-h2:mb-5 md:prose-h2:mb-4 prose-h2:pb-3 md:prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100 dark:prose-h2:border-gray-800
                            prose-h3:text-2xl md:prose-h3:text-xl prose-h3:mt-10 md:prose-h3:mt-8 prose-h3:mb-4 md:prose-h3:mb-3
                            prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                            prose-li:text-gray-600 dark:prose-li:text-gray-300
                            prose-strong:text-gray-900 dark:prose-strong:text-white
                            prose-table:border-collapse prose-table:w-full prose-table:text-sm prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-sm prose-table:border prose-table:border-gray-200 dark:prose-table:border-gray-700
                            prose-th:bg-gradient-to-r prose-th:from-blue-600 prose-th:to-blue-700 prose-th:text-white prose-th:p-3.5 prose-th:text-start prose-th:font-bold prose-th:border-b prose-th:border-blue-500 prose-th:text-xs prose-th:uppercase prose-th:tracking-wider
                            prose-td:p-3.5 prose-td:border-b prose-td:border-gray-100 dark:prose-td:border-gray-700/50
                            [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-blue-50/50 dark:[&_tbody_tr:hover]:bg-blue-900/10 [&_tbody_tr:nth-child(even)]:bg-gray-50/50 dark:[&_tbody_tr:nth-child(even)]:bg-gray-800/30
                            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                    />

                    {/* Interactive Widgets (Calculators, Mermaid Diagrams) */}
                    <BlogInteractiveWidgets slug={slug} locale={locale} />

                    {/* CairoVolt Labs Expert Box — E-E-A-T first-party data signal */}
                    <div className="my-10 p-6 bg-gradient-to-br from-blue-950 to-slate-900 text-white rounded-2xl border border-blue-700/30 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">🔬</span>
                            <div>
                                <div className="font-bold text-blue-300 text-sm uppercase tracking-wider">
                                    {isArabic ? 'مختبر كايرو فولت — بيانات طرف أول' : 'CairoVolt Labs — First-Party Data'}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {isArabic ? 'م. يحيى رضوان · مهندس ضمان الجودة' : 'Eng. Yahia Radwan · Quality Assurance Engineer'}
                                </div>
                            </div>
                        </div>
                        <p className="cairovolt-voice-answer text-gray-200 leading-relaxed">
                            {isArabic
                                ? 'باور بانك أنكر 737 اتجرب في مخازن كايرو فولت بالتجمع الثالث في حرارة 37 درجة مئوية وشغل راوتر WE VDSL لمدة 14 ساعة و22 دقيقة متواصلة بدون ريستارت — هذه نتيجة حقيقية من بيئة مصرية لا تجدها في أي مكان آخر.'
                                : 'Anker 737 power bank was tested at CairoVolt\'s warehouse in New Cairo 3 at 37°C and ran a WE VDSL router for 14 hours 22 minutes continuously without restart — a real result from an Egyptian environment unavailable anywhere else.'}
                        </p>
                    </div>

                    {/* VoiceSearchFAQ removed — was duplicating the FAQ accordion below */}

                    {/* Author Profile Bio - E-E-A-T Signal */}
                    {article.author && (
                        <div className="my-12 p-6 md:p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 flex flex-col md:flex-row items-center md:items-start gap-6">
                            <img
                                src={article.author.avatar}
                                alt={article.author.name[isArabic ? 'ar' : 'en']}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md flex-shrink-0"
                                loading="lazy"
                            />
                            <div className="text-center md:text-start flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {article.author.url ? (
                                        <a href={article.author.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                                            {article.author.name[isArabic ? 'ar' : 'en']}
                                        </a>
                                    ) : (
                                        article.author.name[isArabic ? 'ar' : 'en']
                                    )}
                                </h3>
                                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-4">
                                    {article.author.title[isArabic ? 'ar' : 'en']}
                                </p>

                                {article.author.socials && (
                                    <div className="flex items-center justify-center md:justify-start gap-4">
                                        {article.author.socials.youtube && (
                                            <a href={article.author.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="YouTube">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                            </a>
                                        )}
                                        {article.author.socials.instagram && (
                                            <a href={article.author.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Instagram">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                                            </a>
                                        )}
                                        {article.author.socials.tiktok && (
                                            <a href={article.author.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors" aria-label="TikTok">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.26 6.32 6.32 6.32 0 0 0 6.1-4.94 6.27 6.27 0 0 0 .16-1.4V8.42a8.14 8.14 0 0 0 4.7 1.54V6.52a5 5 0 0 1-2.63-.83z" /></svg>
                                            </a>
                                        )}
                                        {article.author.socials.twitter && (
                                            <a href={article.author.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="X (Twitter)">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                            </a>
                                        )}
                                        {article.author.socials.facebook && (
                                            <a href={article.author.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="Facebook">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}


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
                                    const isAnkerBrand = prod.brand.toLowerCase() === 'anker';
                                    return (
                                        <Link
                                            key={slug}
                                            href={getLocalizedHref(`/${prod.brand.toLowerCase()}/${prod.categorySlug.toLowerCase()}/${slug}`)}
                                            className={`group p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-all ${isAnkerBrand ? 'hover:border-blue-200' : 'hover:border-red-200'}`}
                                        >
                                            <div className={`text-xs font-bold mb-1 ${isAnkerBrand ? 'text-blue-600' : 'text-red-600'}`}>{prod.brand}</div>
                                            <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-2 line-clamp-2">{pTrans.name}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-bold text-green-600">
                                                    {prod.price.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                                                </span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${isAnkerBrand ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 group-hover:bg-blue-100' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 group-hover:bg-red-100'} transition-colors`}>
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
        </div>
    );
}
