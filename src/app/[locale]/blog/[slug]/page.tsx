import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getLiveIndexSlugs, isIndexEntryLive, getIndexEntry, getLiveIndex, getBlogArticleBySlug } from '@/data/blog-index';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import { ArticleSchema, SpeakableSchema, HowToSchema } from '@/components/schemas/StructuredDataSchemas';
import { getProductBySlug } from '@/lib/static-products';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { QuickAnswerBox } from '@/components/ui/QuickAnswerBox';
import { getEntitiesForArticle, entitiesToJsonLd } from '@/data/brand-entities';
import dynamic from 'next/dynamic';
const BlogInteractiveWidgets = dynamic(() => import('@/components/interactive/BlogInteractiveWidgets'));

import ShareAnalytics from '@/components/content/ShareAnalytics';
import SocialShareButtons from '@/components/content/SocialShareButtons';

import { ExpertQuote } from '@/components/content/ExpertQuote';
import BlogContentRenderer from '@/components/ui/BlogContentRenderer';

// Hourly ISR — so a scheduled article reveals within ~1h of its publishDate
// (the daily reveal cron also force-revalidates on the exact day).
export const revalidate = 3600;
// Open slug space: only LIVE articles are prerendered (see generateStaticParams).
// dynamicParams=true lets a not-yet-published (or freshly-added) slug render
// on-demand — the isIndexEntryLive() gate returns a REAL 404 before its
// publishDate and flips to the full article on-demand once the date passes.
// This avoids baking the time-based gate result into a static/ISR prerender,
// which leaked future articles as cached 200s and stranded newly-live ones on
// a stale not-found. Unknown slugs still 404 (getIndexEntry -> notFound()).
export const dynamicParams = true;

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
    // Prerender ONLY currently-live articles. Future (scheduled) articles are
    // intentionally NOT prerendered: with dynamicParams=true they render
    // on-demand, where the isIndexEntryLive() gate 404s them until publishDate
    // and serves the full article once it passes — so the time-based gate result
    // is never frozen into a stale prerender. (getAllIndexSlugs + dynamicParams
    // =false baked the gate into the ISR/CDN cache, leaking future articles as
    // 200 and stranding newly-live ones on a cached not-found.)
    const slugs = getLiveIndexSlugs();
    return ['en', 'ar'].flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    // Use the lightweight index for metadata — no need to load full article content
    const entry = getIndexEntry(slug);

    if (!entry) return {};

    const isArabic = locale === 'ar';
    const trans = entry.translations[isArabic ? 'ar' : 'en'];

    return {
        title: { absolute: trans.metaTitle },
        description: trans.metaDescription,
        keywords: trans.keywords,
        alternates: {
            canonical: isArabic
                ? `https://cairovolt.com/blog/${slug}`
                : `https://cairovolt.com/en/blog/${slug}`,
            languages: {
                'ar-EG': `https://cairovolt.com/blog/${slug}`,
                'en-EG': `https://cairovolt.com/en/blog/${slug}`,
                'x-default': `https://cairovolt.com/blog/${slug}`,
            },
        },
        openGraph: {
            title: trans.metaTitle,
            description: trans.metaDescription,
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'article',
            siteName: isArabic ? 'كايرو فولت' : 'CairoVolt',
            publishedTime: entry.publishDate,
            modifiedTime: entry.modifiedDate,
            // OG images use JPG for maximum Facebook/social compatibility (webp causes fallback to default logo)
            images: entry.coverImage ? [{ 
                url: `https://cairovolt.com/images/blog/og/${slug}.jpg`,
                width: 1200,
                height: 630,
                alt: trans.metaTitle,
                type: 'image/jpeg',
            }] : [],
        },
        twitter: {
            card: entry.coverImage ? 'summary_large_image' : 'summary',
            title: trans.metaTitle,
            description: trans.metaDescription,
            ...(entry.coverImage ? { images: [`https://cairovolt.com/images/blog/og/${slug}.jpg`] } : {}),
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

    // Check the lightweight index first (fast, no content loaded)
    const indexEntry = getIndexEntry(slug);
    if (!indexEntry || !isIndexEntryLive(indexEntry)) {
        notFound();
    }

    // Load ONLY this article's full content via dynamic import (~40KB)
    // instead of the entire barrel (~5.9MB)
    const article = await getBlogArticleBySlug(slug);
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

    // Get related articles from the lightweight index (no content loaded)
    const relatedArticles = getLiveIndex()
        .filter(a => a.slug !== slug)
        .slice(0, 3);

    return (
        <div suppressHydrationWarning>
            {/* Structured Data */}
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
            {/* FAQPage schema removed — Google deprecated FAQ rich results May 7, 2026 */}
            {/* ClaimReview Schema — ClaimReview schema for counterfeit charger articles */}
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

            {/* Share Analytics — captures WhatsApp shares as trackable direct traffic */}
            <ShareAnalytics />

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
                            <span className="text-gray-900 dark:text-white font-medium">
                                {trans.title}
                            </span>
                        </nav>
                    </div>
                </div>
                {/* Cover Image Hero — framed card with C2PA authenticity badge */}
                {article.coverImage && (
                    <div className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/60 dark:to-gray-900 pt-6 md:pt-10 pb-2 md:pb-4">
                        {/* Soft ambient backdrop behind the image */}
                        <div aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10 pointer-events-none" />
                        <div className="container mx-auto px-4 relative">
                            <figure className="relative max-w-5xl mx-auto">
                                <div className="relative aspect-[1200/630] overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl shadow-blue-900/10 dark:shadow-black/40 ring-1 ring-gray-200/70 dark:ring-gray-700/60">
                                    <Image
                                        src={article.coverImage}
                                        alt={trans.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 1024px"
                                        className="object-cover"
                                        priority
                                        fetchPriority="high"
                                    />
                                    {/* Bottom legibility gradient — subtle, only ~30% of the image */}
                                    <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                                    {/* Category badge */}
                                    <div className="absolute top-3 md:top-4 start-3 md:start-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 dark:bg-gray-900/85 backdrop-blur-md text-blue-700 dark:text-blue-300 shadow-md ring-1 ring-black/5">
                                            <SvgIcon name={catLabel.icon} className="w-3.5 h-3.5" /> {isArabic ? catLabel.ar : catLabel.en}
                                        </span>
                                    </div>
                                    {/* C2PA verified badge */}
                                    <div className="absolute top-3 md:top-4 end-3 md:end-4">
                                        <span
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold bg-black/45 backdrop-blur-md text-white border border-white/20 shadow-md tracking-wider"
                                            title={isArabic ? 'صورة موثّقة بمعايير محتوى المصادقة C2PA' : 'Image authenticated with C2PA content credentials'}
                                        >
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 14.06L7.4 12.5l1.42-1.41 2.12 2.12 4.24-4.24 1.42 1.41-5.66 5.68z" />
                                            </svg>
                                            {isArabic ? 'موثّقة · C2PA' : 'Verified · C2PA'}
                                        </span>
                                    </div>
                                    {/* Author micro-credit bottom-start */}
                                    {article.author && (
                                        <div className="absolute bottom-3 md:bottom-4 start-3 md:start-4 flex items-center gap-2">
                                            <Image
                                                src={article.author.avatar}
                                                alt=""
                                                width={32}
                                                height={32}
                                                className="w-7 h-7 md:w-8 md:h-8 rounded-full ring-2 ring-white/80 object-cover"
                                            />
                                            <span className="text-[11px] md:text-xs font-semibold text-white drop-shadow">
                                                {article.author.name[isArabic ? 'ar' : 'en']}
                                            </span>
                                        </div>
                                    )}
                                    {/* Reading time bottom-end */}
                                    <div className="absolute bottom-3 md:bottom-4 end-3 md:end-4">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] md:text-xs font-medium bg-black/45 backdrop-blur-md text-white">
                                            <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {isArabic ? `${article.readingTime} د` : `${article.readingTime} min`}
                                        </span>
                                    </div>
                                </div>
                                <figcaption className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 mt-3 text-center px-4">
                                    {isArabic
                                        ? '© كايرو فولت — صورة محميّة بمعايير محتوى المصادقة C2PA و EXIF/XMP'
                                        : '© CairoVolt — Image authenticated with C2PA content credentials and EXIF/XMP'}
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                )}

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

                    {/* Quick Answer Box */}
                    {trans.quickAnswer && (
                        <QuickAnswerBox answer={trans.quickAnswer} locale={locale} variant="highlighted" />
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 pb-6 border-b border-gray-100 dark:border-gray-700">
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
                            {article.author ? article.author.name[isArabic ? 'ar' : 'en'] : (
                                <Link href={isArabic ? '/about' : '/en/about'} className="text-blue-600 dark:text-blue-400 hover:underline">
                                    {isArabic ? 'فريق تحرير كايرو فولت' : 'CairoVolt Editorial Team'}
                                </Link>
                            )}
                        </span>
                    </div>

                    {/* Social Share Buttons — Top */}
                    <div className="pt-5 pb-2">
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                            {isArabic ? '📤 شارك المقال:' : '📤 Share this article:'}
                        </p>
                        <SocialShareButtons
                            title={trans.title}
                            url={`https://cairovolt.com${isArabic ? '' : '/en'}/blog/${slug}`}
                            locale={locale}
                        />
                    </div>
                </header>

                {/* Article Content */}
                <article className="container mx-auto px-4 md:px-4 max-w-4xl pb-16 md:pb-12">
                    <BlogContentRenderer
                        html={trans.content}
                        locale={locale}
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

                    {/* Verified expert quote — only renders when the article carries a real, sourced quote */}
                    {article.expertQuote && <ExpertQuote quote={article.expertQuote} locale={locale} />}

                    {/*
                      REMOVED: the "CairoVolt Labs — First-Party Data" box.
                      It was hardcoded identically on every article (an Anker 737 / WE-router
                      result shown even on cable/earbud posts) and credited an independent
                      YouTuber as "Quality Assurance Engineer" — neither is true, so it was a
                      fabricated experience + false-employment signal.
                      To bring it back legitimately: store REAL, per-article test data on the
                      BlogArticle object and attribute it to "CairoVolt editorial/lab team"
                      (or a real, named, consenting tester) — never to an unaffiliated creator.
                    */}

                    {/* FAQSection removed — was duplicating the FAQ accordion below */}

                    {/* Author Profile Bio */}
                    {article.author && (
                        <div className="my-12 p-6 md:p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 flex flex-col md:flex-row items-center md:items-start gap-6">
                            <Image
                                src={article.author.avatar}
                                alt={article.author.name[isArabic ? 'ar' : 'en']}
                                width={128}
                                height={128}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md flex-shrink-0"
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

                    {/* Team fallback — when no specific author */}
                    {!article.author && (
                        <div className="my-12 p-6 md:p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30 flex flex-col md:flex-row items-center md:items-start gap-6">
                            <Image
                                src="/images/team/cairovolt-team.webp"
                                alt={isArabic ? 'فريق تحرير كايرو فولت' : 'CairoVolt Editorial Team'}
                                width={128}
                                height={128}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md flex-shrink-0"
                            />
                            <div className="text-center md:text-start flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    <Link href={isArabic ? '/about' : '/en/about'} className="hover:text-blue-600 transition-colors">
                                        {isArabic ? 'فريق تحرير كايرو فولت' : 'CairoVolt Editorial Team'}
                                    </Link>
                                </h3>
                                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-3">
                                    {isArabic ? 'متخصصون في اختبار ومراجعة إكسسوارات الشحن والموبايل' : 'Specialists in testing & reviewing charging and mobile accessories'}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    {isArabic
                                        ? 'يُكتب هذا المحتوى ويُراجع بواسطة فريق التحرير في كايرو فولت. كل مقال يمر بمراجعة دقيقة لضمان دقة المعلومات. للاطلاع على آراء مستقلة، نرشّح لك أيضاً نخبة من صنّاع المحتوى التقني.'
                                        : 'This content is written and reviewed by the CairoVolt editorial team. Every article undergoes thorough review for accuracy. For independent opinions, we also recommend a selection of top tech creators.'}
                                </p>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2">
                                    <Link
                                        href={isArabic ? '/about' : '/en/about'}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        {isArabic ? 'من نحن' : 'About us'}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </Link>
                                    <Link
                                        href={isArabic ? '/team' : '/en/team'}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                                    >
                                        {isArabic ? 'خبراء ننصح بمتابعتهم' : 'Experts we recommend'}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}



                    {/* Social Share Buttons — Bottom (after reading the article) */}
                    <div className="my-10 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                        <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {isArabic ? '📤 عجبك المقال؟ شاركه مع صحابك!' : '📤 Enjoyed this article? Share it!'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {isArabic ? 'ساعد غيرك يستفيد — شارك على السوشيال ميديا' : 'Help others learn — share on social media'}
                        </p>
                        <SocialShareButtons
                            title={trans.title}
                            url={`https://cairovolt.com${isArabic ? '' : '/en'}/blog/${slug}`}
                            locale={locale}
                        />
                    </div>

                    {/* FAQ Section */}
                    {trans.faq && trans.faq.length > 0 && (
                        <section className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                                <SvgIcon name="question" className="w-6 h-6" />
                                {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                            </h2>
                            <div className="space-y-3">
                                {trans.faq.map((item: { question: string; answer: string }, idx: number) => (
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                {article.relatedProducts.map((slug: string) => {
                                    const prod = getProductBySlug(slug);
                                    if (!prod) return null;
                                    const pTrans = prod.translations[isArabic ? 'ar' : 'en'];
                                    const isAnkerBrand = prod.brand.toLowerCase() === 'anker';
                                    const primaryImage = prod.images?.find(img => img.isPrimary) || prod.images?.[0];
                                    return (
                                        <Link
                                            key={slug}
                                            href={getLocalizedHref(`/${prod.brand.toLowerCase()}/${prod.categorySlug.toLowerCase()}/${slug}`)}
                                            className={`group rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 ${isAnkerBrand ? 'hover:border-blue-300 hover:shadow-blue-100/50 dark:hover:shadow-blue-900/30' : 'hover:border-red-300 hover:shadow-red-100/50 dark:hover:shadow-red-900/30'}`}
                                        >
                                            {/* Product Image */}
                                            <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                                                {primaryImage ? (
                                                    <Image
                                                        src={primaryImage.url}
                                                        alt={pTrans.name}
                                                        fill
                                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-600">
                                                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    </div>
                                                )}
                                                {/* Brand badge */}
                                                <div className="absolute top-2.5 start-2.5">
                                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm ${isAnkerBrand ? 'bg-blue-600/90 text-white' : 'bg-red-600/90 text-white'}`}>
                                                        {prod.brand}
                                                    </span>
                                                </div>
                                                {/* Discount badge */}
                                                {prod.originalPrice && prod.originalPrice > prod.price && (
                                                    <div className="absolute top-2.5 end-2.5">
                                                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-red-700 text-white shadow-sm">
                                                            -{Math.round((1 - prod.price / prod.originalPrice) * 100)}%
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            {/* Product Info */}
                                            <div className="p-4">
                                                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3 line-clamp-2 leading-snug">{pTrans.name}</h3>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-lg font-bold text-green-700 dark:text-green-400">
                                                            {prod.price.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                                                        </span>
                                                        {prod.originalPrice && prod.originalPrice > prod.price && (
                                                            <span className="text-xs text-gray-500 dark:text-gray-400 line-through block">
                                                                {prod.originalPrice.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-300 ${isAnkerBrand ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 group-hover:bg-blue-600 group-hover:text-white' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 group-hover:bg-red-600 group-hover:text-white'}`}>
                                                        {isArabic ? 'تسوق' : 'Shop'} →
                                                    </span>
                                                </div>
                                            </div>
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {relatedArticles.map((related) => {
                                    const rTrans = related.translations[isArabic ? 'ar' : 'en'];
                                    const rCat = categoryLabels[related.category];
                                    return (
                                        <Link
                                            key={related.slug}
                                            href={getLocalizedHref(`/blog/${related.slug}`)}
                                            className="group rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                        >
                                            {/* Cover Image */}
                                            <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                                                {related.coverImage ? (
                                                    <Image
                                                        src={related.coverImage}
                                                        alt={rTrans.title}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <SvgIcon name={rCat.icon} className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                                                    </div>
                                                )}
                                                {/* Dark gradient overlay for legibility */}
                                                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                                {/* Category badge */}
                                                <div className="absolute bottom-3 start-3">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 dark:bg-gray-900/80 backdrop-blur-md text-blue-700 dark:text-blue-300 shadow-sm">
                                                        <SvgIcon name={rCat.icon} className="w-3 h-3" /> {isArabic ? rCat.ar : rCat.en}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Article Info */}
                                            <div className="p-4">
                                                <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {rTrans.title}
                                                </h3>
                                                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    {isArabic ? 'اقرأ المزيد' : 'Read more'} →
                                                </span>
                                            </div>
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
