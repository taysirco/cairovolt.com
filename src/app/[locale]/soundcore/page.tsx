import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { QuickAnswerBox } from '@/components/ui/QuickAnswerBox';
import { ProductImage } from '@/components/ui/ProductImage';
import { soundcoreHub } from '@/data/soundcore-hub';
import { staticProducts } from '@/lib/static-products';
import CategoryDiscoveryGrid from '@/components/brand/CategoryDiscoveryGrid';

export const dynamicParams = false;

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
    return [{ locale: 'ar' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isArabic = locale === 'ar';
    const meta = isArabic ? soundcoreHub.metadata.ar : soundcoreHub.metadata.en;
    const canonical = isArabic ? 'https://cairovolt.com/soundcore' : 'https://cairovolt.com/en/soundcore';

    return {
        title: { absolute: meta.title },
        description: meta.description,
        keywords: meta.keywords,
        alternates: {
            canonical,
            languages: {
                'ar-EG': 'https://cairovolt.com/soundcore',
                'en-EG': 'https://cairovolt.com/en/soundcore',
                'x-default': 'https://cairovolt.com/soundcore',
            },
        },
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: canonical,
            locale: isArabic ? 'ar_EG' : 'en_EG',
            type: 'website',
            siteName: 'CairoVolt',
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.title,
            description: meta.description,
        },
    };
}

/**
 * Picks Soundcore best-sellers across both lines (audio + speakers).
 * Post-migration: products carry brand="Soundcore" directly + live at /soundcore/{cat}/{slug}.
 * Sorts: featured first, then by price ascending (entry-level shows first).
 */
function getSoundcoreBestSellers(max: number) {
    return staticProducts
        .filter(p =>
            p.status === 'active' &&
            p.brand.toLowerCase() === 'soundcore'
        )
        .sort((a, b) => {
            if (a.featured !== b.featured) return a.featured ? -1 : 1;
            return a.price - b.price;
        })
        .slice(0, max);
}

export default async function SoundcoreHubPage({ params }: Props) {
    const { locale } = await params;
    const isRTL = locale === 'ar';

    if (locale !== 'ar' && locale !== 'en') notFound();

    const data = soundcoreHub;
    const baseHref = isRTL ? '' : '/en';
    const getHref = (path: string) => `${baseHref}${path}`;
    const products = getSoundcoreBestSellers(12);
    const pageHeading = isRTL
        ? 'منتجات ساوند كور الأصلية في مصر من Anker'
        : 'Original Soundcore by Anker Products in Egypt';
    const pageDescription = data.metadata[isRTL ? 'ar' : 'en'].description;
    const topSummary = isRTL
        ? 'اختر ايربودز أو هيدفون أو سبيكرات ساوند كور الأصلية، ثم انتقل مباشرةً إلى المنتجات الأكثر طلبًا بضمان كايرو فولت لمدة 18 شهرًا.'
        : 'Choose original Soundcore earbuds, headphones, or speakers, then shop the most requested products directly with an 18-month CairoVolt warranty.';

    const quickAnswer = isRTL
        ? 'ساوند كور (Soundcore) هي العلامة الفرعية للصوتيات من Anker، أُطلقت سنة 2016. تنقسم منتجاتها لعائلتين فقط: (1) سماعات/ايربودز/هيدفون في /soundcore/audio، و(2) مكبرات صوت بلوتوث في /soundcore/speakers. كل المنتجات بضمان 18 شهر من كايرو فولت.'
        : 'Soundcore is Anker\'s audio sub-brand, launched in 2016. Products split into two lines only: (1) earbuds/headphones at /soundcore/audio, and (2) Bluetooth speakers at /soundcore/speakers. All carry an 18-month CairoVolt warranty.';
    const canonicalPage = `https://cairovolt.com${baseHref}/soundcore`;
    const bestSellerSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': `${canonicalPage}#best-sellers-list`,
        name: isRTL
            ? `أفضل ${products.length} منتج من ساوند كور في مصر`
            : `Top ${products.length} Soundcore Products in Egypt`,
        isPartOf: { '@id': `${canonicalPage}#collectionpage` },
        numberOfItems: products.length,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: product.translations[isRTL ? 'ar' : 'en'].name,
            url: `${canonicalPage}/${product.categorySlug}/${product.slug}`,
        })),
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* ─── Structured Data ─── */}
            <BreadcrumbSchema
                items={[
                    { name: isRTL ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${baseHref}` },
                    { name: isRTL ? 'Anker' : 'Anker', url: `https://cairovolt.com${baseHref}/anker` },
                    { name: 'Soundcore', url: `https://cairovolt.com${baseHref}/soundcore` },
                ]}
                locale={locale}
            />
            {/* Compact commerce header. The full explanatory copy remains
                visible below the category and product decision layers. */}
            <header id="brand-hero" className="relative scroll-mt-32 overflow-hidden py-4 md:py-5">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 opacity-95"></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-15"></div>

                <div className="container relative z-10 mx-auto px-4 text-center lg:grid lg:grid-cols-5 lg:items-center lg:gap-8 lg:text-start">
                    <div className="lg:col-span-3">
                        <div className="mb-2 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                            <Link
                                href={getHref('/anker')}
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md transition-colors hover:bg-black/40 md:text-xs"
                            >
                                <SvgIcon name="link" className="h-3.5 w-3.5" />
                                {isRTL ? 'علامة صوتية من Anker' : 'An audio brand by Anker'}
                                <span aria-hidden="true">{isRTL ? '←' : '→'}</span>
                            </Link>

                            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 backdrop-blur-md">
                                <span className="h-2 w-2 rounded-full bg-green-300 animate-pulse"></span>
                                <span className="text-[11px] font-bold tracking-wide text-white md:text-xs">
                                    {isRTL ? data.hero.badge.ar : data.hero.badge.en}
                                </span>
                            </div>
                        </div>

                        <h1 className="mb-2 bg-gradient-to-b from-white to-white/70 bg-clip-text text-2xl font-black leading-tight tracking-tight text-transparent drop-shadow-sm md:text-3xl lg:text-4xl">
                            {pageHeading}
                        </h1>

                        <p data-top-summary className="mx-auto mb-4 max-w-4xl text-sm font-light leading-relaxed text-white/90 md:text-base lg:mx-0 lg:mb-0">
                            {topSummary}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2.5 lg:col-span-2 lg:justify-end">
                        <a
                            href="#shop-by-category"
                            className="group inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-black text-gray-900 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl md:text-sm"
                        >
                            <SvgIcon name="compass" className="h-4 w-4 text-orange-600" />
                            {isRTL ? 'اختر طريقة الاستماع' : 'Choose how you listen'}
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
                        <span className="hidden text-[11px] font-medium text-white/85 sm:inline md:text-xs">
                            {isRTL ? 'أصلي 100% · ادفع عند الاستلام' : '100% original · Cash on delivery'}
                        </span>
                    </div>
                </div>
            </header>

            <div id="commerce-entry">
                <CategoryDiscoveryGrid
                    collection="soundcore"
                    categories={data.categories}
                    locale={locale}
                    pageName={pageHeading}
                    pageDescription={pageDescription}
                />

                {/* ─── BEST SELLERS (mixed audio + speakers) ─── */}
                {products.length > 0 && (
                <section id="best-sellers" className="scroll-mt-32 py-4 sm:py-5 md:py-8">
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(bestSellerSchema) }}
                    />
                    <div className="container mx-auto px-4">
                        <div className="mb-4 grid gap-2 md:mb-5 md:grid-cols-2 md:items-end md:gap-8">
                            <div>
                                <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-r from-orange-100 to-red-100 px-3 py-1 dark:border-orange-800/50 dark:from-orange-900/30 dark:to-red-900/30">
                                    <SvgIcon name="fire" className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    <span className="text-xs font-bold text-orange-700 dark:text-orange-300">
                                        {isRTL ? 'الأكثر مبيعاً في مصر' : 'Best Sellers in Egypt'}
                                    </span>
                                </div>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white sm:text-2xl md:text-3xl lg:text-4xl">
                                    {isRTL ? `أفضل ${products.length} منتج من ساوند كور` : `Top ${products.length} Soundcore Products`}
                                </h2>
                            </div>
                            <div>
                                <p className="text-xs leading-5 text-gray-600 dark:text-gray-400 sm:text-sm sm:leading-6 md:text-base">
                                    {isRTL
                                        ? 'مزيج من ايربودز وسبيكرات ساوند كور الأصلية — مع ضمان كايرو فولت لمدة 18 شهرًا.'
                                        : 'A mix of original Soundcore earbuds and speakers — with an 18-month CairoVolt warranty.'}
                                </p>
                                <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-5">
                            {products.map((product) => {
                                const t = product.translations[isRTL ? 'ar' : 'en'];
                                const productUrl = getHref(`/soundcore/${product.categorySlug}/${product.slug}`);
                                const isSpeaker = product.categorySlug === 'speakers';
                                return (
                                    <Link
                                        key={product.slug}
                                        href={productUrl}
                                        className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-800 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="relative aspect-square bg-white overflow-hidden">
                                            {product.images?.[0]?.url ? (
                                                <ProductImage
                                                    src={product.images[0].url}
                                                    alt={product.images[0].alt || t.name}
                                                    slug={product.slug}
                                                    brand={product.brand}
                                                    category={product.categorySlug}
                                                    fill
                                                    loading="lazy"
                                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                                    imageClassName="object-contain p-3 group-hover:scale-110 transition-transform duration-500"
                                                    locale={locale}
                                                    lightweight
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-3xl font-black text-gray-200 dark:text-gray-700">S</div>
                                            )}
                                            <span className={`absolute bottom-2 ${isRTL ? 'right-2' : 'left-2'} text-white text-[9px] md:text-[10px] font-semibold px-2 py-0.5 rounded-full z-10 ${
                                                isSpeaker ? 'bg-pink-600/80' : 'bg-orange-600/80'
                                            }`}>
                                                {isSpeaker
                                                    ? (isRTL ? 'سبيكر' : 'Speaker')
                                                    : (isRTL ? 'ايربودز' : 'Earbuds')}
                                            </span>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 min-h-[2.5rem]">
                                                {t.name.split('|')[0].trim()}
                                            </h3>
                                            <div className="font-black text-orange-600 dark:text-orange-400 text-sm md:text-base">
                                                {isRTL ? `${product.price.toLocaleString('ar-EG')} ج.م` : `EGP ${product.price.toLocaleString('en-EG')}`}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
                )}
            </div>

            <section id="brand-guide" aria-labelledby="soundcore-guide-heading" className="scroll-mt-32 bg-white py-8 dark:bg-gray-950 sm:py-10">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-5 max-w-3xl text-center">
                        <span className="text-xs font-black uppercase tracking-wide text-orange-700">
                            {isRTL ? 'دليل شراء موثوق' : 'Trusted buying guide'}
                        </span>
                        <h2 id="soundcore-guide-heading" className="mt-2 text-2xl font-black text-gray-950 dark:text-white md:text-3xl">
                            {isRTL ? 'ملخص ساوند كور للشراء في مصر' : 'Soundcore buying summary for Egypt'}
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-gray-700 dark:text-gray-300 md:text-base">
                            {isRTL ? data.hero.description.ar : data.hero.description.en}
                        </p>
                    </div>
                    <div className="mx-auto max-w-2xl">
                        <QuickAnswerBox answer={quickAnswer} locale={locale} variant="subtle" />
                    </div>
                </div>
            </section>

            {/* ─── Trust Badges Bar ─── */}
            <section className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-6 border-y border-gray-100 dark:border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {data.trustBadges.map((badge, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-white/60 dark:hover:bg-gray-800/50 transition-colors">
                                <SvgIcon name={badge.icon} className="w-7 h-7 mb-2 text-orange-600 dark:text-orange-400" />
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

            {/* ─── About / History ─── */}
            <section className="py-16 bg-white dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-black mb-3 dark:text-white">
                            {isRTL ? 'قصة ساوند كور' : 'The Soundcore Story'}
                        </h2>
                        <div className="h-1.5 w-24 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>
                    </div>

                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-8 rounded-3xl border border-orange-100 dark:border-gray-700">
                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                {isRTL ? data.history.ar : data.history.en}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {data.stats.map((s, idx) => (
                            <div key={idx} className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800">
                                <SvgIcon name={s.icon} className="w-8 h-8 mb-2 mx-auto text-orange-500" />
                                <span className="text-2xl md:text-3xl font-black text-orange-600 dark:text-orange-400 block mb-1">
                                    {isRTL ? s.value.ar : s.value.en}
                                </span>
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                    {isRTL ? s.label.ar : s.label.en}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Technologies ─── */}
            <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black mb-3 dark:text-white">
                            {isRTL ? 'التقنيات الحصرية لساوند كور' : 'Soundcore Signature Technologies'}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            {isRTL
                                ? 'كل تقنية موجودة عبر خطّي المنتجات (الايربودز والسبيكرات)'
                                : 'Every technology runs across both product lines (earbuds & speakers)'}
                        </p>
                        <div className="h-1.5 w-24 mx-auto mt-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                        {data.technologies.map((tech, idx) => (
                            <div key={idx} className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-800 transition-colors hover:shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30">
                                        <SvgIcon name={tech.icon} className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                    </span>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                        {tech.name}
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {isRTL ? tech.description.ar : tech.description.en}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Cross-link reinforcement (bottom CTA) ─── */}
            <section className="py-16 bg-white dark:bg-black">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-black mb-3">
                                {isRTL ? 'ابدأ التسوّق الآن' : 'Start Shopping Now'}
                            </h2>
                            <p className="text-white/90 text-base md:text-lg">
                                {isRTL ? 'اختر العائلة المناسبة لاحتياجك' : 'Pick the family that fits your need'}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                            <Link href={getHref('/soundcore/audio')} className="flex items-center gap-4 px-6 py-5 bg-white text-gray-900 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                                <SvgIcon name="headphones" className="w-8 h-8 text-orange-600" />
                                <div className={isRTL ? 'text-right flex-1' : 'text-left flex-1'}>
                                    <div className="text-base">{isRTL ? 'سماعات ساوند كور' : 'Soundcore Earbuds'}</div>
                                    <div className="text-xs text-gray-500 font-normal">{isRTL ? '26 موديل — من 699 جنيه' : '26 models — from EGP 699'}</div>
                                </div>
                                <span className="text-2xl text-orange-600">{isRTL ? '←' : '→'}</span>
                            </Link>
                            <Link href={getHref('/soundcore/speakers')} className="flex items-center gap-4 px-6 py-5 bg-white text-gray-900 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                                <SvgIcon name="speaker" className="w-8 h-8 text-pink-600" />
                                <div className={isRTL ? 'text-right flex-1' : 'text-left flex-1'}>
                                    <div className="text-base">{isRTL ? 'سبيكرات ساوند كور' : 'Soundcore Speakers'}</div>
                                    <div className="text-xs text-gray-500 font-normal">{isRTL ? '4 موديلات — من 1,249 جنيه' : '4 models — from EGP 1,249'}</div>
                                </div>
                                <span className="text-2xl text-pink-600">{isRTL ? '←' : '→'}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-black mb-3 text-center dark:text-white">
                        {isRTL ? 'الأسئلة الشائعة عن ساوند كور' : 'Soundcore Frequently Asked Questions'}
                    </h2>
                    <div className="h-1.5 w-24 mx-auto mb-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>

                    <div className="space-y-3">
                        {(isRTL ? data.faq.ar : data.faq.en).map((item, idx) => (
                            <details key={idx} className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 open:shadow-lg transition-all duration-300">
                                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                                    <span className="font-bold text-base md:text-lg dark:text-white">{item.question}</span>
                                    <span className="transform group-open:rotate-180 transition-transform text-gray-400">▼</span>
                                </summary>
                                <div className="px-5 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-800 pt-4">
                                    {item.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
