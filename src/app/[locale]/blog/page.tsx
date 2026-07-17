import { Metadata } from 'next';
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
        ? 'أدلة شراء ومقارنات ومراجعات تساعدك على اختيار اكسسوارات الموبايل المناسبة في مصر، ومنها الباور بانك والشواحن والسماعات من انكر وجوي روم.'
        : 'Buying guides, comparisons, and reviews to help you choose suitable mobile accessories in Egypt, including power banks, chargers, and earbuds from Anker and Joyroom.';

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

                </div>
            </main>
        </>
    );
}
