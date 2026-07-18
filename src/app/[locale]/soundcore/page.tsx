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
import {
    ARABIC_BRAND_NAMES,
    localizeArabicBrandContent,
    localizeArabicBrandNames,
} from '@/lib/arabic-brand-names';

export const dynamicParams = false;

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
    return [{ locale: 'ar' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isArabic = locale === 'ar';
    const meta = isArabic
        ? {
            title: 'ساوندكور من انكر مصر | سماعات وايربودز وسبيكرات',
            description: 'تصفح ايربودز وهيدفون وسبيكرات ساوندكور من انكر في مصر، وقارن ANC والتطبيق وEQ وLDAC وBassUp وPartyCast وتصنيفات IP حسب كل موديل.',
            keywords: 'ساوندكور, انكر, سماعات ساوندكور, سبيكر ساوندكور, ايربودز ساوندكور, ساوندكور مصر',
        }
        : {
            title: 'Soundcore by Anker Egypt | Earbuds, Headphones & Speakers',
            description: 'Browse Soundcore by Anker earbuds, headphones, and speakers in Egypt. Compare model-specific ANC, app/EQ, LDAC, BassUp, PartyCast, and IP ratings.',
            keywords: 'soundcore, anker soundcore, soundcore egypt, soundcore earbuds, soundcore speakers',
        };
    const canonical = isArabic ? 'https://cairovolt.com/soundcore' : 'https://cairovolt.com/en/soundcore';

    return {
        title: { absolute: meta.title },
        description: meta.description,
        keywords: isArabic
            ? localizeArabicBrandNames(meta.keywords)
            : meta.keywords,
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
 * Picks active Soundcore products across the audio and speaker categories.
 * Featured catalogue entries appear first, followed by price.
 */
function getSoundcoreFeaturedProducts(max: number) {
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
    const audioCategory = data.categories.find(category => category.href === '/soundcore/audio');
    const speakerCategory = data.categories.find(category => category.href === '/soundcore/speakers');
    const baseHref = isRTL ? '' : '/en';
    const getHref = (path: string) => `${baseHref}${path}`;
    const products = getSoundcoreFeaturedProducts(12);
    const { anker: ankerAr, soundcore: soundcoreAr } = ARABIC_BRAND_NAMES;
    const pageHeading = isRTL
        ? `منتجات ${soundcoreAr} من ${ankerAr} في مصر`
        : 'Soundcore by Anker Products in Egypt';
    const pageDescription = isRTL
        ? `تصفح ايربودز وهيدفون وسبيكرات ${soundcoreAr}، وقارن العزل والتطبيق والكودك والبطارية ومقاومة المياه حسب الموديل قبل مراجعة السعر والتوافر في صفحة المنتج.`
        : 'Browse Soundcore earbuds, headphones, and speakers, comparing noise control, app support, codecs, battery, and water ratings by model before checking price and availability.';
    const topSummary = isRTL
        ? `اختر ايربودز أو هيدفون أو سبيكرات ${soundcoreAr}؛ مزايا ANC وLDAC والتطبيق والربط وتصنيف IP تختلف حسب الموديل.`
        : 'Choose Soundcore earbuds, headphones, or speakers; ANC, LDAC, app, linking, and IP features vary by model.';

    const quickAnswer = isRTL
        ? `${soundcoreAr} علامة صوتيات ضمن عائلة ${ankerAr}. تنقسم المنتجات هنا إلى سماعات شخصية ومكبرات صوت، لكن تقنيات ANC وHearID وLDAC وBassUp وPartyCast وتصنيفات IP ليست موجودة بالمستوى نفسه في كل موديل. صفحة المنتج هي المرجع للمواصفات والتوافق.`
        : 'Soundcore is an audio brand in the Anker family. This catalogue separates personal audio from speakers, but ANC, HearID, LDAC, BassUp, PartyCast, and IP ratings are not shared equally by every model. The product page is the specification and compatibility reference.';
    const serviceBadges = isRTL
        ? [
            { icon: 'headphones', title: 'سماعات ومكبرات صوت', description: 'اختر القسم المناسب لاستخدامك' },
            { icon: 'shield', title: 'ضمان كايرو فولت', description: 'المدة والشروط في صفحة المنتج' },
            { icon: 'money', title: 'الدفع عند الاستلام', description: 'يُؤكد مع مراجعة الطلب' },
        ]
        : [
            { icon: 'headphones', title: 'Personal Audio & Speakers', description: 'Choose the category that fits your use' },
            { icon: 'shield', title: 'CairoVolt Warranty', description: 'Duration and terms are on the product page' },
            { icon: 'money', title: 'Cash on Delivery', description: 'Confirmed during order review' },
        ];
    const soundcoreFaq = isRTL
        ? [
            { question: `ما علاقة ${soundcoreAr} بـ${ankerAr}؟`, answer: `${soundcoreAr} علامة متخصصة في الصوتيات ضمن عائلة ${ankerAr}. يعرض كايرو فولت منتجاتها في قسم السماعات الشخصية وقسم مكبرات الصوت.` },
            { question: `كيف أختار بين أقسام ${soundcoreAr}؟`, answer: 'اختر قسم audio للايربودز والهيدفون، وقسم speakers لمكبرات الصوت المحمولة. راجع صفحة المنتج للتأكد من المواصفات والتوافق والتوافر.' },
            { question: `ما مدة ضمان كايرو فولت على منتجات ${soundcoreAr}؟`, answer: 'تختلف مدة الضمان وأهليته حسب المنتج. صفحة كل منتج هي المرجع لشروط ضمان كايرو فولت المكتوبة وقت الطلب.' },
            { question: `هل تطبيق ${soundcoreAr} يثبت أصالة المنتج؟`, answer: 'توافق المنتج مع التطبيق ميزة تشغيلية وليس شهادة مستقلة من الشركة المصنّعة لإثبات الأصالة. راجع بيانات الموديل والفاتورة وأدوات الشركة المصنّعة إن وُجدت.' },
        ]
        : [
            { question: 'How are Soundcore and Anker related?', answer: 'Soundcore is an audio brand in the Anker family. CairoVolt groups its products into personal-audio and Bluetooth-speaker sections.' },
            { question: 'Which Soundcore category should I choose?', answer: 'Use the audio section for earbuds and headphones, and the speakers section for portable speakers. Check each product page for specifications, compatibility, and availability.' },
            { question: 'How long is the CairoVolt warranty on Soundcore products?', answer: 'Warranty eligibility and duration vary by product. The product page is the source for the written CairoVolt warranty terms at the time of ordering.' },
            { question: 'Does the Soundcore app prove that a product is authentic?', answer: 'App compatibility is an operating feature, not an independent manufacturer authenticity certificate. Check the model details, invoice, and any manufacturer verification tools that are available.' },
        ];
    const canonicalPage = `https://cairovolt.com${baseHref}/soundcore`;
    const featuredProductsSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': `${canonicalPage}#featured-products-list`,
        name: isRTL
            ? `منتجات ${soundcoreAr} مختارة في مصر`
            : 'Featured Soundcore Products in Egypt',
        isPartOf: { '@id': `${canonicalPage}#collectionpage` },
        numberOfItems: products.length,
        itemListOrder: 'https://schema.org/ItemListUnordered',
        itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: isRTL
                ? localizeArabicBrandNames(product.translations.ar.name)
                : product.translations.en.name,
            url: `${canonicalPage}/${product.categorySlug}/${product.slug}`,
        })),
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* ─── Structured Data ─── */}
            <BreadcrumbSchema
                items={[
                    { name: isRTL ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${baseHref}` },
                    { name: isRTL ? ankerAr : 'Anker', url: `https://cairovolt.com${baseHref}/anker` },
                    { name: isRTL ? soundcoreAr : 'Soundcore', url: `https://cairovolt.com${baseHref}/soundcore` },
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
                                {isRTL ? `علامة صوتية من ${ankerAr}` : 'An audio brand by Anker'}
                                <span aria-hidden="true">{isRTL ? '←' : '→'}</span>
                            </Link>

                            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 backdrop-blur-md">
                                <span className="h-2 w-2 rounded-full bg-green-300 animate-pulse"></span>
                                <span className="text-[11px] font-bold tracking-wide text-white md:text-xs">
                                    {isRTL ? `صوتيات ${soundcoreAr}` : 'Soundcore Audio'}
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
                            href="#featured-products"
                            className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-black text-white backdrop-blur-sm transition hover:bg-white/20 md:text-sm"
                        >
                            <SvgIcon name="fire" className="h-4 w-4" />
                            {isRTL ? 'منتجات مختارة' : 'Featured products'}
                            <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
                        </a>
                        <span className="hidden text-[11px] font-medium text-white/85 sm:inline md:text-xs">
                            {isRTL ? 'ضمان كايرو فولت حسب المنتج' : 'Product-specific CairoVolt warranty'}
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

                {/* Selected products from both catalogue sections. */}
                {products.length > 0 && (
                <section id="featured-products" className="scroll-mt-32 py-4 sm:py-5 md:py-8">
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuredProductsSchema) }}
                    />
                    <div className="container mx-auto px-4">
                        <div className="mb-4 grid gap-2 md:mb-5 md:grid-cols-2 md:items-end md:gap-8">
                            <div>
                                <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-r from-orange-100 to-red-100 px-3 py-1 dark:border-orange-800/50 dark:from-orange-900/30 dark:to-red-900/30">
                                    <SvgIcon name="fire" className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    <span className="text-xs font-bold text-orange-700 dark:text-orange-300">
                                        {isRTL ? 'منتجات مختارة من الكتالوج' : 'Featured Catalogue Products'}
                                    </span>
                                </div>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white sm:text-2xl md:text-3xl lg:text-4xl">
                                    {isRTL ? `مختارات من ${soundcoreAr}` : 'Soundcore Product Picks'}
                                </h2>
                            </div>
                            <div>
                                <p className="text-xs leading-5 text-gray-600 dark:text-gray-400 sm:text-sm sm:leading-6 md:text-base">
                                    {isRTL
                                        ? `مزيج من ايربودز وسبيكرات ${soundcoreAr} المتاحة؛ تظهر مدة ضمان كايرو فولت وشروطه في صفحة كل منتج.`
                                        : 'A mix of available Soundcore earbuds and speakers; each product page states its CairoVolt warranty duration and terms.'}
                                </p>
                                <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-5">
                            {products.map((product) => {
                                const rawTranslation = product.translations[isRTL ? 'ar' : 'en'];
                                const t = isRTL
                                    ? localizeArabicBrandContent(rawTranslation)
                                    : rawTranslation;
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
                                                    alt={isRTL
                                                        ? localizeArabicBrandNames(product.images[0].alt || t.name)
                                                        : (product.images[0].alt || t.name)}
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
                                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                                <span className="font-black text-orange-600 dark:text-orange-400 text-sm md:text-base">
                                                    {isRTL ? `${product.price.toLocaleString('ar-EG')} ج.م` : `EGP ${product.price.toLocaleString('en-EG')}`}
                                                </span>
                                                {product.originalPrice > product.price && (
                                                    <>
                                                        <span className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString(isRTL ? 'ar-EG' : 'en-EG')}</span>
                                                        <span className="rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-extrabold text-white">
                                                            {isRTL ? `خصم ${Math.round((1 - product.price / product.originalPrice) * 100)}%` : `-${Math.round((1 - product.price / product.originalPrice) * 100)}%`}
                                                        </span>
                                                    </>
                                                )}
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
                            {isRTL ? 'دليل أقسام ساوندكور' : 'Soundcore Category Guide'}
                        </span>
                        <h2 id="soundcore-guide-heading" className="mt-2 text-2xl font-black text-gray-950 dark:text-white md:text-3xl">
                            {isRTL ? `ملخص ${soundcoreAr} للشراء في مصر` : 'Soundcore buying summary for Egypt'}
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-gray-700 dark:text-gray-300 md:text-base">
                            {pageDescription}
                        </p>
                    </div>
                    <div className="mx-auto max-w-2xl">
                        <QuickAnswerBox answer={quickAnswer} locale={locale} variant="subtle" />
                    </div>
                </div>
            </section>

            {/* Store service information. */}
            <section className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-6 border-y border-gray-100 dark:border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        {serviceBadges.map((badge) => (
                            <div key={badge.title} className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-white/60 dark:hover:bg-gray-800/50 transition-colors">
                                <SvgIcon name={badge.icon} className="w-7 h-7 mb-2 text-orange-600 dark:text-orange-400" />
                                <span className="font-bold text-sm text-gray-900 dark:text-white">
                                    {badge.title}
                                </span>
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                    {badge.description}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand and catalogue scope. */}
            <section className="py-16 bg-white dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-black mb-3 dark:text-white">
                            {isRTL ? `عن ${soundcoreAr}` : 'About Soundcore'}
                        </h2>
                        <div className="h-1.5 w-24 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>
                    </div>

                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-8 rounded-3xl border border-orange-100 dark:border-gray-700">
                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                {isRTL
                                    ? `${soundcoreAr} علامة صوتيات ضمن عائلة ${ankerAr}. يجمع هذا الدليل روابط أقسام المنتجات المتاحة في كايرو فولت؛ وتظل صفحة المنتج المرجع للسعر الحالي والمواصفات والتوافر وشروط الضمان.`
                                    : 'Soundcore is an audio brand in the Anker family. This directory links the product sections available from CairoVolt; the product page remains the source for current price, specifications, availability, and warranty terms.'}
                            </p>
                            <p className="mt-5 text-base leading-7 text-gray-700 dark:text-gray-300">
                                {isRTL ? (
                                    <>
                                        ابدأ من <Link href={getHref('/soundcore/audio')} className="font-bold text-orange-700 underline decoration-orange-300 underline-offset-4 dark:text-orange-300">قسم سماعات {soundcoreAr}</Link> للايربودز والهيدفون،
                                        أو <Link href={getHref('/soundcore/speakers')} className="font-bold text-pink-700 underline decoration-pink-300 underline-offset-4 dark:text-pink-300">قسم سبيكرات {soundcoreAr}</Link> لمكبرات الصوت.
                                        ولمنتجات الشحن انتقل إلى <Link href={getHref('/anker')} className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 dark:text-blue-300">دليل {ankerAr}</Link>،
                                        ثم قارن <Link href={getHref('/anker/wall-chargers')} className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 dark:text-blue-300">شواحن {ankerAr}</Link> أو <Link href={getHref('/anker/power-banks')} className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 dark:text-blue-300">باور بانك {ankerAr}</Link>.
                                    </>
                                ) : (
                                    <>
                                        Start with <Link href={getHref('/soundcore/audio')} className="font-bold text-orange-700 underline decoration-orange-300 underline-offset-4 dark:text-orange-300">Soundcore earbuds and headphones</Link>,
                                        or browse <Link href={getHref('/soundcore/speakers')} className="font-bold text-pink-700 underline decoration-pink-300 underline-offset-4 dark:text-pink-300">Soundcore Bluetooth speakers</Link>.
                                        For charging, return to the <Link href={getHref('/anker')} className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 dark:text-blue-300">Anker guide</Link> and compare <Link href={getHref('/anker/wall-chargers')} className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 dark:text-blue-300">Anker wall chargers</Link> or <Link href={getHref('/anker/power-banks')} className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 dark:text-blue-300">Anker power banks</Link>.
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="technology-glossary" aria-labelledby="soundcore-technology-heading" className="border-y border-orange-100 bg-gradient-to-b from-orange-50 to-white py-14 dark:border-orange-950 dark:from-gray-900 dark:to-gray-950">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-9 max-w-4xl text-center">
                        <span className="text-xs font-black uppercase tracking-wide text-orange-700 dark:text-orange-300">
                            {isRTL ? 'قاموس تقنيات ساوندكور' : 'Soundcore technology glossary'}
                        </span>
                        <h2 id="soundcore-technology-heading" className="mt-2 text-3xl font-black text-gray-950 dark:text-white md:text-4xl">
                            {isRTL ? 'ما الذي تعنيه المزايا في كل موديل؟' : 'What do the model features mean?'}
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-gray-700 dark:text-gray-300 md:text-base">
                            {isRTL ? data.technologyNote.ar : data.technologyNote.en}
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {data.technologyGlossary.map((technology) => (
                            <article key={technology.id} className="flex h-full flex-col rounded-3xl border border-orange-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                                        <SvgIcon name={technology.icon} className="h-6 w-6" />
                                    </span>
                                    <h3 className="text-lg font-black text-gray-950 dark:text-white">
                                        {isRTL ? technology.name.ar : technology.name.en}
                                    </h3>
                                </div>
                                <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">
                                    {isRTL ? technology.description.ar : technology.description.en}
                                </p>
                                <p className="mt-4 rounded-2xl bg-gray-50 p-4 text-xs leading-6 text-gray-600 dark:bg-gray-950 dark:text-gray-400">
                                    {isRTL ? technology.modelExamples.ar : technology.modelExamples.en}
                                </p>
                                <Link href={getHref(technology.href)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:underline dark:text-orange-300">
                                    {technology.href.endsWith('/audio')
                                        ? (isRTL ? `قارن سماعات ${soundcoreAr}` : 'Compare Soundcore audio')
                                        : (isRTL ? `قارن سبيكرات ${soundcoreAr}` : 'Compare Soundcore speakers')}
                                    <span aria-hidden="true">{isRTL ? '←' : '→'}</span>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category links. */}
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
                                    <div className="text-base">{isRTL ? `سماعات ${soundcoreAr}` : 'Soundcore Earbuds'}</div>
                                    <div className="mt-1 text-xs font-normal leading-5 text-gray-500">
                                        {isRTL ? audioCategory?.description.ar : audioCategory?.description.en}
                                    </div>
                                </div>
                                <span className="text-2xl text-orange-600">{isRTL ? '←' : '→'}</span>
                            </Link>
                            <Link href={getHref('/soundcore/speakers')} className="flex items-center gap-4 px-6 py-5 bg-white text-gray-900 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                                <SvgIcon name="speaker" className="w-8 h-8 text-pink-600" />
                                <div className={isRTL ? 'text-right flex-1' : 'text-left flex-1'}>
                                    <div className="text-base">{isRTL ? `سبيكرات ${soundcoreAr}` : 'Soundcore Speakers'}</div>
                                    <div className="mt-1 text-xs font-normal leading-5 text-gray-500">
                                        {isRTL ? speakerCategory?.description.ar : speakerCategory?.description.en}
                                    </div>
                                </div>
                                <span className="text-2xl text-pink-600">{isRTL ? '←' : '→'}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Common catalogue and warranty questions. */}
            <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-black mb-3 text-center dark:text-white">
                        {isRTL ? `الأسئلة الشائعة عن ${soundcoreAr}` : 'Soundcore Frequently Asked Questions'}
                    </h2>
                    <div className="h-1.5 w-24 mx-auto mb-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>

                    <div className="space-y-3">
                        {soundcoreFaq.map((item) => (
                            <details key={item.question} className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 open:shadow-lg transition-all duration-300">
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
