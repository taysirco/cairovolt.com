import { Metadata } from 'next';
import Link from 'next/link';
import { getLiveIndex } from '@/data/blog-index';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import BlogPagination from '@/components/blog/BlogPagination';
import { localizeArabicBrandContent } from '@/lib/arabic-brand-names';

// Hourly ISR so newly-scheduled articles appear in the listing within ~1h.
export const revalidate = 3600;

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
        ? 'أدلة شراء ومقارنات ومراجعات تساعدك على اختيار اكسسوارات الموبايل المناسبة في مصر، ومنها الباور بانك والشواحن والسماعات من انكر وجوي روم وساوندكور وJBL.'
        : 'Buying guides, comparisons, and reviews to help you choose suitable mobile accessories in Egypt, including power banks, chargers, and earbuds from Anker, Joyroom, Soundcore, and JBL.';

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
            // Advertise the locale's fresh-guides RSS (rel="alternate").
            types: {
                'application/rss+xml': isArabic
                    ? [{ url: 'https://cairovolt.com/api/discover-feed', title: 'كايرو فولت — أحدث الأدلة' }]
                    : [{ url: 'https://cairovolt.com/api/discover-feed?locale=en', title: 'CairoVolt — Latest guides' }],
            },
        },
        openGraph: {
            title,
            description,
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'website',
            siteName: isArabic ? 'كايرو فولت' : 'CairoVolt',
        },
    };
}

/* ─── Category labels (passed to client component) ─────────── */
const categoryLabels: Record<string, { ar: string; en: string; icon: string }> = {
    'buying-guide': { ar: 'دليل شراء', en: 'Buying Guide', icon: 'book' },
    'comparison':   { ar: 'مقارنة',    en: 'Comparison',   icon: 'scale' },
    'how-to':       { ar: 'شرح',       en: 'How-To',       icon: 'wrench' },
    'review':       { ar: 'مراجعة',    en: 'Review',       icon: 'star' },
    'tips':         { ar: 'نصائح',     en: 'Tips',         icon: 'bulb' },
};

export default async function BlogPage({ params }: Props) {
    const { locale } = await params;
    const isArabic = locale === 'ar';

    /*
     * Serialize only the fields the client component needs.
     * This keeps the JS bundle lean and avoids passing full HTML content
     * (which can be very large) to the client.
     */
    const sortedArticles = getLiveIndex()
        .sort((a, b) => new Date(b.modifiedDate).getTime() - new Date(a.modifiedDate).getTime())
        .map((a) => {
            const rawTrans = a.translations[isArabic ? 'ar' : 'en'];
            const trans = isArabic ? localizeArabicBrandContent(rawTrans) : rawTrans;
            return {
                slug: a.slug,
                category: a.category,
                readingTime: a.readingTime,
                coverImage: a.coverImage,
                publishDate: a.publishDate,
                modifiedDate: a.modifiedDate,
                title: trans.title,
                excerpt: trans.excerpt,
            };
        });

    const totalArticles = sortedArticles.length;
    const localePrefix = isArabic ? '' : '/en';
    const pageUrl = `https://cairovolt.com${localePrefix}/blog`;

    // Breadcrumb trail — one list feeds both the JSON-LD and the visible nav,
    // so their names and URLs cannot drift apart.
    const breadcrumbItems = [
        { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${localePrefix}`, href: isArabic ? '/' : '/en' },
        { name: isArabic ? 'المدونة' : 'Blog', url: pageUrl, href: `${localePrefix}/blog` },
    ];

    // Crawlable index of EVERY live guide, grouped by topic. The paginated grid
    // above is client state (<button>s), so without this list only the first 20
    // articles had a real <a href> from the hub. Live entries only (getLiveIndex
    // is publishDate-gated); no new URLs, no pagination parameters.
    const guidesByCategory = [
        ...Object.keys(categoryLabels),
        ...Array.from(new Set(sortedArticles.map((a) => a.category))).filter((c) => !(c in categoryLabels)),
    ]
        .map((category) => ({
            category,
            label: categoryLabels[category]
                ? (isArabic ? categoryLabels[category].ar : categoryLabels[category].en)
                : category,
            articles: sortedArticles.filter((a) => a.category === category),
        }))
        .filter((group) => group.articles.length > 0);

    // Blog node: names the hub as a Blog and lists its live posts by the same
    // @id each article page gives its BlogPosting (…/blog/<slug>#article).
    const blogSchema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${pageUrl}#blog`,
        url: pageUrl,
        name: isArabic ? 'مدونة كايرو فولت' : 'CairoVolt Blog',
        inLanguage: isArabic ? 'ar-EG' : 'en-EG',
        isPartOf: { '@id': 'https://cairovolt.com/#website' },
        publisher: { '@id': 'https://cairovolt.com/#organization' },
        blogPost: sortedArticles.map((a) => {
            const articleUrl = `${pageUrl}/${a.slug}`;
            return {
                '@type': 'BlogPosting',
                '@id': `${articleUrl}#article`,
                url: articleUrl,
                headline: a.title,
            };
        }),
    };

    return (
        <>
            <BreadcrumbSchema
                items={breadcrumbItems.map(({ name, url }) => ({ name, url }))}
                locale={locale}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Breadcrumb — mirrors the BreadcrumbList JSON-LD above */}
                <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700" dir={isArabic ? 'rtl' : 'ltr'}>
                    <div className="container mx-auto px-4 py-3">
                        <nav aria-label={isArabic ? 'مسار التنقل' : 'Breadcrumb'} className="text-sm text-gray-500 flex items-center gap-1 flex-wrap">
                            <Link href={breadcrumbItems[0].href} className="hover:text-blue-600 transition-colors">
                                {breadcrumbItems[0].name}
                            </Link>
                            <span className="mx-1">/</span>
                            <span className="text-gray-900 dark:text-white font-medium" aria-current="page">
                                {breadcrumbItems[1].name}
                            </span>
                        </nav>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-12 md:py-16">

                    {/* ── Hero ──────────────────────────────────────── */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {isArabic ? 'مدونة كايرو فولت' : 'CairoVolt Blog'}
                        </h1>
                        <p className="text-xl md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {isArabic
                                ? 'أدلة شراء ومقارنات ونصائح لاختيار اكسسوارات الموبايل المناسبة في مصر'
                                : 'Buying guides, comparisons, and tips for choosing suitable mobile accessories in Egypt'}
                        </p>
                        {/* Article count badge */}
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {isArabic ? `${totalArticles} تدوينة` : `${totalArticles} articles`}
                        </div>
                    </div>

                    {/* ── Client-side paginated grid ────────────────── */}
                    {/*
                     * SEO STRATEGY:
                     * - Only /blog is indexed (canonical set above).
                     * - Pagination is pure client-side JS state — no URL segments
                     *   like /blog/2 or ?page=2 are ever created or crawled.
                     * - Individual article pages /blog/[slug] carry full SEO weight.
                     * - Google sees all articles via sitemap.ts, not via paginated pages.
                     */}
                    <BlogPagination
                        articles={sortedArticles}
                        isArabic={isArabic}
                        locale={locale}
                        categoryLabels={categoryLabels}
                    />

                    {/* ── All guides by topic (server-rendered, crawlable) ── */}
                    <section
                        aria-labelledby="all-guides-by-topic"
                        className="max-w-6xl mx-auto mt-16 pt-10 border-t border-gray-200 dark:border-gray-700"
                        dir={isArabic ? 'rtl' : 'ltr'}
                    >
                        <h2 id="all-guides-by-topic" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {isArabic ? 'كل الأدلة حسب الموضوع' : 'All guides by topic'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                            {guidesByCategory.map((group) => (
                                <div key={group.category}>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        {group.label}{' '}
                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">({group.articles.length})</span>
                                    </h3>
                                    <ul className="space-y-1.5 text-sm leading-6">
                                        {group.articles.map((a) => (
                                            <li key={a.slug}>
                                                <Link
                                                    href={`${localePrefix}/blog/${a.slug}`}
                                                    prefetch={false}
                                                    className="text-blue-700 dark:text-blue-400 hover:underline"
                                                >
                                                    {a.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}
