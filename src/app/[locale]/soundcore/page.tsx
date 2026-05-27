import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import { ArticleSchema } from '@/components/schemas/StructuredDataSchemas';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { QuickAnswerBox } from '@/components/ui/QuickAnswerBox';
import { ProductImage } from '@/components/ui/ProductImage';
import { soundcoreHub } from '@/data/soundcore-hub';
import { staticProducts } from '@/lib/static-products';
import { entitiesToJsonLd } from '@/data/brand-entities';

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
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'website',
            siteName: 'CairoVolt',
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.title,
            description: meta.description,
        },
        other: {
            'geo.region': 'EG',
            'geo.placename': isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt',
            'geo.position': '30.0444;31.2357',
            ICBM: '30.0444, 31.2357',
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
    // Soundcore-focused entity set: primary=brand identity, secondary=tech/geo
    const aboutEntities = ['soundcore', 'anker', 'cairovolt'];
    const mentionEntities = ['bluetooth', 'earbuds', 'speaker', 'anc', 'egypt', 'cairo', 'newCairo'];

    const quickAnswer = isRTL
        ? 'ساوند كور (Soundcore) هي العلامة الفرعية للصوتيات من Anker، أُطلقت سنة 2016. تنقسم منتجاتها لعائلتين فقط: (1) سماعات/ايربودز/هيدفون في /soundcore/audio، و(2) مكبرات صوت بلوتوث في /soundcore/speakers. كل المنتجات بضمان 18 شهر من كايرو فولت.'
        : 'Soundcore is Anker\'s audio sub-brand, launched in 2016. Products split into two lines only: (1) earbuds/headphones at /soundcore/audio, and (2) Bluetooth speakers at /soundcore/speakers. All carry an 18-month CairoVolt warranty.';

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
            <ArticleSchema
                headline={data.metadata[isRTL ? 'ar' : 'en'].title}
                description={data.metadata[isRTL ? 'ar' : 'en'].description}
                url={`https://cairovolt.com${baseHref}/soundcore`}
                locale={locale}
                articleType="Article"
                sections={[
                    { heading: isRTL ? 'تاريخ ساوند كور' : 'Soundcore History', content: data.history[isRTL ? 'ar' : 'en'] },
                ]}
                about={entitiesToJsonLd(aboutEntities, isRTL ? 'ar' : 'en')}
                mentions={entitiesToJsonLd(mentionEntities, isRTL ? 'ar' : 'en')}
            />

            {/* CollectionPage JSON-LD — declares /soundcore as a hub with two child
                collections. hasPart establishes the parent-child relationship for
                Google's entity graph: the hub aggregates /soundcore/audio + /soundcore/speakers. */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        '@id': `https://cairovolt.com${baseHref}/soundcore#collectionpage`,
                        name: data.metadata[isRTL ? 'ar' : 'en'].title,
                        description: data.metadata[isRTL ? 'ar' : 'en'].description,
                        url: `https://cairovolt.com${baseHref}/soundcore`,
                        inLanguage: isRTL ? 'ar-EG' : 'en-EG',
                        isPartOf: { '@id': 'https://cairovolt.com/#website' },
                        about: {
                            '@type': 'Brand',
                            name: 'Soundcore',
                            alternateName: 'ساوند كور',
                            sameAs: [
                                'https://en.wikipedia.org/wiki/Anker_(brand)#Soundcore',
                                'https://www.soundcore.com',
                            ],
                            parentOrganization: {
                                '@type': 'Brand',
                                name: 'Anker',
                                sameAs: 'https://en.wikipedia.org/wiki/Anker_(brand)',
                            },
                        },
                        hasPart: [
                            {
                                '@type': 'CollectionPage',
                                '@id': `https://cairovolt.com${baseHref}/soundcore/audio#collectionpage`,
                                name: isRTL ? 'سماعات ساوند كور (ايربودز + هيدفون)' : 'Soundcore Earbuds & Headphones',
                                url: `https://cairovolt.com${baseHref}/soundcore/audio`,
                                description: isRTL
                                    ? 'سماعات بلوتوث TWS، نيكباند، وهيدفون فوق الأذن من ساوند كور'
                                    : 'Soundcore TWS earbuds, neckbands & over-ear headphones',
                            },
                            {
                                '@type': 'CollectionPage',
                                '@id': `https://cairovolt.com${baseHref}/soundcore/speakers#collectionpage`,
                                name: isRTL ? 'مكبرات صوت ساوند كور (سبيكرات بلوتوث)' : 'Soundcore Bluetooth Speakers',
                                url: `https://cairovolt.com${baseHref}/soundcore/speakers`,
                                description: isRTL
                                    ? 'مكبرات صوت بلوتوث Hi-Res، IPX7 مقاومة الماء، PartyCast'
                                    : 'Hi-Res Bluetooth speakers, IPX7 waterproof, PartyCast',
                            },
                        ],
                        mainEntity: {
                            '@type': 'ItemList',
                            numberOfItems: products.length,
                            itemListElement: products.slice(0, 10).map((p, idx) => ({
                                '@type': 'ListItem',
                                position: idx + 1,
                                url: `https://cairovolt.com${baseHref}/soundcore/${p.categorySlug}/${p.slug}`,
                                name: p.translations[isRTL ? 'ar' : 'en'].name.split('|')[0].trim(),
                            })),
                        },
                    }),
                }}
            />

            {/* ─── Hero ─── */}
            <section className="relative overflow-hidden py-20 md:py-32">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 opacity-95"></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-15"></div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    {/* Lineage badge — clarifies Anker parentage */}
                    <Link
                        href={getHref('/anker')}
                        className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-black/30 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-xs md:text-sm font-medium hover:bg-black/40 transition-colors"
                    >
                        <SvgIcon name="link" className="w-3.5 h-3.5" />
                        {isRTL ? 'علامة فرعية من Anker — اعرف الشركة الأم' : 'A sub-brand of Anker — learn about the parent company'}
                        <span>{isRTL ? '←' : '→'}</span>
                    </Link>

                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/15 backdrop-blur-md border border-white/30 rounded-full shadow-2xl">
                        <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
                        <span className="text-white text-sm md:text-base font-bold tracking-wide">
                            {isRTL ? data.hero.badge.ar : data.hero.badge.en}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-4 tracking-tight drop-shadow-sm leading-tight max-w-5xl mx-auto">
                        {isRTL
                            ? 'ساوند كور (Soundcore) في مصر — العلامة الصوتية الفرعية من Anker'
                            : 'Soundcore by Anker in Egypt — The Official Audio Sub-Brand'}
                    </h1>

                    <p className="text-2xl md:text-3xl font-light text-white/90 italic mb-6">
                        {isRTL ? data.hero.subtitle.ar : data.hero.subtitle.en}
                    </p>

                    <p className="text-base md:text-lg font-light mb-10 max-w-3xl mx-auto leading-relaxed text-orange-50">
                        {isRTL ? data.hero.description.ar : data.hero.description.en}
                    </p>

                    <div className="max-w-2xl mx-auto mb-8">
                        <QuickAnswerBox answer={quickAnswer} locale={locale} variant="subtle" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {data.trustBadges.slice(0, 4).map((badge, idx) => (
                            <div key={idx} className="flex items-center gap-2 px-5 py-2.5 bg-black/25 backdrop-blur-sm rounded-xl border border-white/15 text-white/95 text-sm md:text-base font-medium">
                                <span className="text-green-300">✓</span>
                                {isRTL ? badge.title.ar : badge.title.en}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TWO CATEGORY CARDS (the heart of the hub) ─── */}
            <section className="container mx-auto px-4 -mt-12 relative z-20">
                <div className="grid md:grid-cols-2 gap-6 lg:gap-10 max-w-6xl mx-auto">
                    {data.categories.map((cat, idx) => (
                        <Link
                            key={cat.href}
                            href={getHref(cat.href)}
                            className={`group relative p-8 md:p-10 rounded-3xl bg-white dark:bg-gray-900 shadow-2xl hover:shadow-orange-200/40 dark:hover:shadow-orange-900/30 transition-all duration-300 hover:-translate-y-2 border-2 border-transparent ${
                                idx === 0
                                    ? 'hover:border-orange-400'
                                    : 'hover:border-pink-400'
                            }`}
                        >
                            <span className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'} px-3 py-1 text-xs font-bold rounded-full shadow-md text-white ${
                                idx === 0 ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-pink-500 to-red-500'
                            }`}>
                                {isRTL ? cat.badge.ar : cat.badge.en}
                            </span>

                            <div className={`text-5xl md:text-7xl mb-6 transform group-hover:scale-110 transition-transform ${
                                idx === 0 ? 'text-orange-500' : 'text-pink-500'
                            }`}>
                                <SvgIcon name={cat.icon} className="w-14 h-14 md:w-20 md:h-20" />
                            </div>

                            <h2 className={`text-2xl md:text-3xl font-black mb-3 dark:text-white ${
                                idx === 0 ? 'group-hover:text-orange-600' : 'group-hover:text-pink-600'
                            }`}>
                                {isRTL ? cat.title.ar : cat.title.en}
                            </h2>
                            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                                {isRTL ? cat.description.ar : cat.description.en}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-5">
                                {cat.keyModels.slice(0, 5).map(model => (
                                    <span key={model} className="px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md">
                                        {model}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-gray-800">
                                <div className="text-sm">
                                    <div className="font-bold text-gray-900 dark:text-white">
                                        {isRTL ? cat.priceRange.ar : cat.priceRange.en}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5">
                                        {isRTL ? cat.searchVolume.ar : cat.searchVolume.en}
                                    </div>
                                </div>
                                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg shadow-md ${
                                    idx === 0 ? 'bg-orange-500' : 'bg-pink-500'
                                }`}>
                                    {isRTL ? '←' : '→'}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ─── BEST SELLERS (mixed audio + speakers) ─── */}
            {products.length > 0 && (
                <section className="py-16 md:py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full border border-orange-200 dark:border-orange-800/50">
                                <SvgIcon name="fire" className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                <span className="text-sm font-bold text-orange-700 dark:text-orange-300">
                                    {isRTL ? 'الأكثر مبيعاً في مصر' : 'Best Sellers in Egypt'}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">
                                {isRTL ? `أفضل ${products.length} منتج من ساوند كور` : `Top ${products.length} Soundcore Products`}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                {isRTL
                                    ? 'مزيج من ايربودز ساوند كور وسبيكرات ساوند كور — أصلية بضمان وكيل CairoVolt 18 شهر'
                                    : 'A mix of Soundcore earbuds and speakers — original with CairoVolt 18-month authorized warranty'}
                            </p>
                            <div className="h-1.5 w-24 mx-auto mt-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-5">
                            {products.map(product => {
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
