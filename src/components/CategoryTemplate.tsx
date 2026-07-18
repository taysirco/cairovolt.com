'use client';

import { InstantLink as Link } from '@/components/ui/InstantLink';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState, useTransition } from 'react';
import { ProductImage } from '@/components/ui/ProductImage';
import dynamic from 'next/dynamic';
import { CategoryContent, BuyingGuideSection, SoundcoreData, PowerBankData } from '@/data/category-content';
import { BreadcrumbSchema } from './schemas/ProductSchema';
import { HowToSchema, ItemListSchema } from './schemas/StructuredDataSchemas';
import RelatedLinks from './content/RelatedLinks';
import { CollectionOverviewBlock } from './content/CategoryOverviewBlock';
import { SvgIcon } from './ui/SvgIcon';
import { MarkdownRenderer } from './ui/MarkdownRenderer';
import { trackWhatsappClick } from '@/lib/analytics';
import { getDiscountInfo } from '@/lib/pricing-display';
import { localizeArabicBrandContent, localizeArabicBrandNames, localizeArabicFields } from '@/lib/arabic-brand-names';

const CategoryComparisonTable = dynamic(() => import('./content/ProductGuides').then(mod => mod.CategoryComparisonTable), {
    loading: () => <div className="animate-pulse h-64 bg-gray-100 dark:bg-gray-800 rounded-xl mb-12"></div>
});
const ExpertOpinion = dynamic(() => import('./content/ProductGuides').then(mod => mod.ExpertOpinion), {
    loading: () => <div className="animate-pulse h-48 bg-gray-100 dark:bg-gray-800 rounded-xl mb-12"></div>
});

interface Product {
    id: string;
    slug: string;
    brand: string;
    categorySlug: string;
    price: number;
    originalPrice?: number;
    stock?: number;
    images?: Array<{ url: string; alt?: string; isPrimary?: boolean }>;
    translations?: {
        en?: { name?: string; description?: string; shortDescription?: string };
        ar?: { name?: string; description?: string; shortDescription?: string };
    };
}

interface CategoryTemplateProps {
    brand: 'Anker' | 'Joyroom' | 'Soundcore';
    brandColor: 'blue' | 'red' | 'orange';
    category: string;
    categorySlug: string;
    categoryInfo: CategoryContent['pageContent'];
    soundcoreData?: SoundcoreData;
    powerBankData?: PowerBankData;
    initialProducts?: Product[];
}

// Category slug to translation key mapping
const categoryKeyMap: Record<string, string> = {
    'power-banks': 'powerBanks',
    'wall-chargers': 'wallChargers',
    'cables': 'cables',
    'car-chargers': 'carChargers',
    'audio': 'audio',
    'smart-watches': 'smartWatches',
    'car-holders': 'carHolders',
    'car-accessories': 'carAccessories',
    'other': 'other',
};

export default function CategoryTemplate({
    brand,
    brandColor,
    categorySlug,
    categoryInfo,
    soundcoreData,
    powerBankData,
    initialProducts = []
}: CategoryTemplateProps) {
    const locale = useLocale();
    const tCat = useTranslations('Categories');
    const tBrand = useTranslations('Brands');
    const tCommon = useTranslations('Common');
    const isRTL = locale === 'ar';
    const content = isRTL
        ? localizeArabicBrandContent(categoryInfo.ar)
        : categoryInfo.en;
    const displaySoundcoreData = isRTL && soundcoreData
        ? localizeArabicFields(soundcoreData)
        : soundcoreData;
    const displayPowerBankData = isRTL && powerBankData
        ? localizeArabicFields(powerBankData)
        : powerBankData;
    const brandSlug = brand.toLowerCase();

    // Get translated category name
    const categoryKey = categoryKeyMap[categorySlug] || 'other';
    const translatedCategory = tCat(categoryKey);
    const translatedBrandValue =
        brand === 'Anker' ? tBrand('anker') :
        brand === 'Soundcore' ? tBrand('soundcore') :
        tBrand('joyroom');
    const translatedBrand = isRTL
        ? localizeArabicBrandNames(translatedBrandValue)
        : translatedBrandValue;

    // Optimized sort: startTransition ensures sort never blocks the main thread
    const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
    const [isSorting, startSortTransition] = useTransition();

    const brandColorClass =
        brandColor === 'blue' ? 'from-blue-600 to-blue-400' :
        brandColor === 'orange' ? 'from-orange-600 to-pink-500' :
        'from-red-600 to-red-400';

    const bgLightClass =
        brandColor === 'blue' ? 'bg-blue-50 dark:bg-blue-900/10' :
        brandColor === 'orange' ? 'bg-orange-50 dark:bg-orange-900/10' :
        'bg-red-50 dark:bg-red-900/10';

    const badgeColorClass =
        brandColor === 'blue' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
        brandColor === 'orange' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';

    const buttonColorClass =
        brandColor === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
        brandColor === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
        'bg-red-600 hover:bg-red-700';

    // Render straight from the server-provided catalogue slice: the server page
    // already filters to active products and applies the curated default order
    // (which also drives the ItemList schema positions). A client refetch of
    // /api/products would only re-read the same static catalogue — while
    // resurrecting retired products and discarding the curated order — so we
    // deliberately do not refetch.
    const displayProducts = useMemo(() => initialProducts.map(p => {
        const rawShortDescription = isRTL
            ? (p.translations?.ar?.shortDescription || '')
            : (p.translations?.en?.shortDescription || '');

        return {
            id: p.id,
            slug: p.slug,
            name: isRTL
                ? localizeArabicBrandNames(p.translations?.ar?.name || p.translations?.en?.name || 'Product')
                : (p.translations?.en?.name || 'Product'),
            shortDescription: isRTL && rawShortDescription
                ? localizeArabicBrandNames(rawShortDescription)
                : rawShortDescription,
            price: p.price,
            originalPrice: p.originalPrice,
            image: p.images?.[0]?.url,
            categorySlug: p.categorySlug,
            inStock: (p.stock ?? 0) > 0,
            badge: undefined as string | undefined
        };
    }), [initialProducts, isRTL]);

    // Memoized sorted products — re-computes only when sortBy or displayProducts change
    const sortedProducts = useMemo(() => {
        if (sortBy === 'price-asc') return [...displayProducts].sort((a, b) => a.price - b.price);
        if (sortBy === 'price-desc') return [...displayProducts].sort((a, b) => b.price - a.price);
        return displayProducts;
    }, [displayProducts, sortBy]);

    const handleSort = (newSort: typeof sortBy) => {
        startSortTransition(() => setSortBy(newSort));
    };

    // Breadcrumbs - Arabic default locale uses '/', English uses '/en/'
    // Use proper brand casing (Anker, Joyroom)
    const localePrefix = locale === 'ar' ? '' : '/en';
    const breadcrumbs = [
        { name: tCommon('home'), url: `https://cairovolt.com${localePrefix}` },
        { name: translatedBrand, url: `https://cairovolt.com${localePrefix}/${brandSlug}` },
        { name: translatedCategory, url: `https://cairovolt.com${localePrefix}/${brandSlug}/${categorySlug}` }
    ];

    return (
        <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
            <BreadcrumbSchema items={breadcrumbs} locale={locale} />

            {/* Buying guide schema */}
            {content.buyingGuide && (
                <HowToSchema
                    title={locale === 'ar'
                        ? `كيفية اختيار ${translatedCategory} ${translatedBrand}`
                        : `How to Choose ${translatedBrand} ${translatedCategory}`}
                    description={content.subtitle}
                    steps={content.buyingGuide.map((section: BuyingGuideSection) => ({
                        name: section.title,
                        text: section.content,
                    }))}
                    locale={locale}
                />
            )}

            {/* ItemList Schema for Product Listings */}
            {displayProducts.length > 0 && (
                <ItemListSchema
                    listName={content.title}
                    items={displayProducts.map((p, idx) => ({
                        name: p.name,
                        url: p.slug
                            ? `https://cairovolt.com${localePrefix}/${brandSlug}/${p.categorySlug || categorySlug}/${p.slug}`
                            : `https://cairovolt.com${localePrefix}/${brandSlug}/${categorySlug}`,
                        image: p.image,
                        price: p.price,
                        position: idx + 1,
                        inStock: p.inStock,
                    }))}
                    locale={locale}
                />
            )}

            {/* Soundcore Family Banner — shown on Soundcore audio/speakers categories */}
            {(categorySlug === 'audio' || categorySlug === 'speakers') && brand === 'Soundcore' && (
                <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white">
                    <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-sm md:text-base">
                        <div className="flex items-center gap-2 font-medium">
                            <span className="hidden sm:inline">🎧</span>
                            <span>
                                {isRTL
                                    ? localizeArabicBrandNames('هذه صفحة من عائلة Soundcore — العلامة الصوتية الفرعية من Anker')
                                    : 'Part of the Soundcore family — Anker\'s audio sub-brand'}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href={`${localePrefix}/soundcore`}
                                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-orange-700 rounded-full font-bold text-xs md:text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all"
                            >
                                {isRTL ? localizeArabicBrandNames('مركز ساوندكور') : 'Soundcore Hub'}
                                <span>{isRTL ? '←' : '→'}</span>
                            </Link>
                            <Link
                                href={`${localePrefix}/soundcore/${categorySlug === 'audio' ? 'speakers' : 'audio'}`}
                                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/20 text-white rounded-full font-medium text-xs hover:bg-black/30 transition-colors"
                            >
                                {categorySlug === 'audio'
                                    ? (isRTL ? localizeArabicBrandNames('🔊 سبيكرات ساوندكور') : '🔊 Soundcore Speakers')
                                    : (isRTL ? localizeArabicBrandNames('🎧 ايربودز ساوندكور') : '🎧 Soundcore Earbuds')}
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className={`bg-gradient-to-br ${brandColorClass} text-white py-8 md:py-16`}>
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="text-xs sm:text-sm text-white/70 mb-4 md:mb-6 px-1">
                        <Link href={localePrefix || '/'} className="hover:text-white">
                            {tCommon('home')}
                        </Link>
                        <span className="mx-2">/</span>
                        <Link href={`${localePrefix}/${brandSlug}`} className="hover:text-white">
                            {translatedBrand}
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white font-medium">{translatedCategory}</span>
                    </nav>

                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">{content.title}</h1>
                    <p className="text-base md:text-xl text-white/90 mb-4 md:mb-6">{content.subtitle}</p>

                    {/* Quality badges */}
                    {content.qualityBadges && (
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-6">
                            {content.qualityBadges.map((badge, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                    <span className="text-yellow-300">
                                        {badge.type === 'originality' && (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                        )}
                                        {badge.type === 'warranty' && (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                                        )}
                                        {badge.type === 'expert_verified' && (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11l2 2 4-4" /></svg>
                                        )}
                                    </span>
                                    <span className="text-xs md:text-sm font-medium text-white">{badge.text}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* PRODUCT GRID — FIRST THING AFTER H1 + BREADCRUMB      */}
            {/* Buyer sees products/prices immediately                  */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="container mx-auto px-4 py-8" data-testid="product-grid-section">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3" data-testid="sort-bar-container">
                    <h2 className="text-xl font-bold">
                        {locale === 'ar' ? 'المنتجات' : 'Products'}
                    </h2>

                    {/* Sort Bar — Performance optimized with startTransition */}
                    <div className={`flex items-center gap-2 text-sm ${isSorting ? 'opacity-70' : ''} transition-opacity`}>
                        <span className="text-gray-500 hidden sm:inline">{isRTL ? 'ترتيب:' : 'Sort:'}</span>
                        <button
                            onClick={() => handleSort('default')}
                            className={`px-3 py-1.5 rounded-lg transition-colors ${sortBy === 'default' ? `text-white ${buttonColorClass}` : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            {isRTL ? 'الافتراضي' : 'Default'}
                        </button>
                        <button
                            onClick={() => handleSort('price-asc')}
                            className={`px-3 py-1.5 rounded-lg transition-colors ${sortBy === 'price-asc' ? `text-white ${buttonColorClass}` : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            {isRTL ? 'الأقل سعراً' : 'Price ↑'}
                        </button>
                        <button
                            onClick={() => handleSort('price-desc')}
                            className={`px-3 py-1.5 rounded-lg transition-colors ${sortBy === 'price-desc' ? `text-white ${buttonColorClass}` : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            {isRTL ? 'الأعلى سعراً' : 'Price ↓'}
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sortedProducts.map((product, idx) => (
                        <Link
                            key={product.id || idx}
                            href={product.slug
                                ? `${localePrefix}/${brandSlug}/${product.categorySlug || categorySlug}/${product.slug}`
                                : '#'
                            }
                            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300"
                        >
                            {/* Product Image */}
                            <div className="w-full aspect-square bg-white relative overflow-hidden">
                                {(() => {
                                    const cardDiscount = getDiscountInfo(product.price, product.originalPrice);
                                    return cardDiscount.hasDiscount ? (
                                        <span className="absolute top-2 start-2 z-10 rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-extrabold text-white shadow-sm">
                                            {isRTL ? `خصم ${cardDiscount.percent}%` : `-${cardDiscount.percent}%`}
                                        </span>
                                    ) : null;
                                })()}
                                {product.image ? (
                                    <ProductImage
                                        src={product.image}
                                        alt={product.name}
                                        slug={product.slug}
                                        brand={brand}
                                        category={product.categorySlug || categorySlug}
                                        fill
                                        priority={idx < 4}
                                        loading={idx < 4 ? 'eager' : 'lazy'}
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        imageClassName="object-contain p-2 group-hover:scale-105 transition-transform"
                                        locale={locale}
                                        lightweight
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className={`text-3xl font-bold bg-gradient-to-r ${brandColorClass} bg-clip-text text-transparent`}>
                                            {brand.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-3">
                                {product.badge && (
                                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${badgeColorClass}`}>
                                        {product.badge}
                                    </span>
                                )}
                                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors mb-1">
                                    {product.name}
                                </h3>
                                {product.shortDescription && (
                                    <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                                        {product.shortDescription}
                                    </p>
                                )}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div>
                                            <span className="text-base font-bold text-gray-900">
                                                {product.price.toLocaleString('en-US')}
                                            </span>
                                            <span className="text-[10px] text-gray-500 font-normal ml-1">{locale === 'ar' ? 'ج.م' : 'EGP'}</span>
                                        </div>
                                        {product.originalPrice != null && product.originalPrice > product.price && (
                                            <span className="text-[11px] text-gray-400 font-normal line-through">
                                                {product.originalPrice.toLocaleString('en-US')} {locale === 'ar' ? 'ج.م' : 'EGP'}
                                            </span>
                                        )}
                                    </div>
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center ${brandColorClass} text-white shadow-sm text-xs`}>
                                        →
                                    </span>
                                </div>
                                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px]">
                                    {product.inStock ? (
                                        <>
                                            <span className="inline-flex items-center gap-1 font-medium text-green-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                {locale === 'ar' ? 'متوفر' : 'In stock'}
                                            </span>
                                            <span className="text-gray-400">·</span>
                                            <span className="text-gray-500">
                                                {locale === 'ar' ? 'الدفع عند الاستلام' : 'Cash on delivery'}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="font-medium text-gray-400">
                                            {locale === 'ar' ? 'غير متوفر حالياً' : 'Out of stock'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* Extended Content Section                              */}
            {/* Additional product information and structured data    */}
            {/* ═══════════════════════════════════════════════════════ */}

            {/* Soundcore Section for "ankersoundcore" targeting - Only renders for audio category */}
            {displaySoundcoreData && (
                <section className="py-16 bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-950">
                    <div className="container mx-auto px-4">
                        {/* Section Title & Tagline */}
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-bold mb-4">
                                <SvgIcon name="headphones" className="w-5 h-5 inline-block" /> {isRTL ? displaySoundcoreData.tagline.ar : displaySoundcoreData.tagline.en}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black mb-4 dark:text-white">
                                {isRTL ? displaySoundcoreData.title.ar : displaySoundcoreData.title.en}
                            </h2>
                            <div className="h-1.5 w-24 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
                        </div>

                        {/* History */}
                        <div className="max-w-4xl mx-auto mb-12">
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-purple-100 dark:border-gray-700 shadow-lg">
                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    {isRTL ? displaySoundcoreData.history.ar : displaySoundcoreData.history.en}
                                </p>
                            </div>
                        </div>

                        {/* Achievements Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                            {displaySoundcoreData.achievements.map((achievement, idx) => (
                                <div key={idx} className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800">
                                    <SvgIcon name={achievement.icon} className="w-8 h-8 mb-2 mx-auto text-purple-500" />
                                    <span className="text-2xl md:text-3xl font-black text-purple-600 dark:text-purple-400 block mb-1">
                                        {isRTL ? achievement.stat.ar : achievement.stat.en}
                                    </span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                        {isRTL ? achievement.label.ar : achievement.label.en}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Audio Technologies */}
                        <div className="max-w-5xl mx-auto mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">
                                {isRTL ? 'تقنيات الصوت' : 'Audio Technologies'}
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {displaySoundcoreData.technologies.map((tech, idx) => (
                                    <div key={idx} className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transition-colors shadow-sm">
                                        <div className="flex items-center gap-3 mb-3">
                                            <SvgIcon name={tech.icon} className="w-6 h-6 text-purple-500" />
                                            <h4 className="font-bold text-lg text-purple-600 dark:text-purple-400">
                                                {tech.name}
                                            </h4>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {isRTL ? tech.description.ar : tech.description.en}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Use Cases */}
                        <div className="max-w-4xl mx-auto mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">
                                {isRTL ? 'صوت مثالي لكل لحظة' : 'Perfect Sound for Every Moment'}
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {displaySoundcoreData.useCases.map((useCase, idx) => (
                                    <div key={idx} className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all">
                                        <SvgIcon name={useCase.icon} className="w-10 h-10 mb-3 mx-auto text-purple-500" />
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                            {isRTL ? useCase.title.ar : useCase.title.en}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {isRTL ? useCase.description.ar : useCase.description.en}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Soundcore Quality Badges */}
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 mb-12">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {displaySoundcoreData.trustBadges.map((badge, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center p-3">
                                        <SvgIcon name={badge.icon} className="w-7 h-7 mb-2 text-purple-500" />
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

                        {/* Soundcore FAQs */}
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">
                                {isRTL ? localizeArabicBrandNames('أسئلة شائعة عن ساوندكور') : 'Soundcore FAQ'}
                            </h3>
                            <div className="space-y-4">
                                {(isRTL ? displaySoundcoreData.faq.ar : displaySoundcoreData.faq.en).map((item, idx) => (
                                    <details key={idx} className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                            {item.question}
                                            <span className="text-purple-500 group-open:rotate-180 transition-transform">▼</span>
                                        </summary>
                                        <div className="px-5 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {item.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* PowerBank Section — brand-aware colors and titles */}
            {displayPowerBankData && (
                <section className={`py-16 bg-gradient-to-b ${brandColor === 'red' ? 'from-red-50 to-rose-50' : brandColor === 'orange' ? 'from-orange-50 to-amber-50' : 'from-blue-50 to-cyan-50'} dark:from-gray-900 dark:to-gray-950`}>
                    <div className="container mx-auto px-4">
                        {/* Section Title & Tagline */}
                        <div className="text-center mb-12">
                            <span className={`inline-block px-4 py-2 ${brandColor === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : brandColor === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'} rounded-full text-sm font-bold mb-4`}>
                                <SvgIcon name="battery" className="w-5 h-5 inline-block" /> {isRTL ? displayPowerBankData.tagline.ar : displayPowerBankData.tagline.en}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black mb-4 dark:text-white">
                                {isRTL ? displayPowerBankData.title.ar : displayPowerBankData.title.en}
                            </h2>
                            <div className={`h-1.5 w-24 mx-auto rounded-full bg-gradient-to-r ${brandColor === 'red' ? 'from-red-600 to-rose-600' : brandColor === 'orange' ? 'from-orange-600 to-amber-600' : 'from-blue-600 to-cyan-600'}`}></div>
                        </div>

                        {/* History */}
                        <div className="max-w-4xl mx-auto mb-12">
                            <div className={`bg-white dark:bg-gray-900 p-8 rounded-3xl border ${brandColor === 'red' ? 'border-red-100' : brandColor === 'orange' ? 'border-orange-100' : 'border-blue-100'} dark:border-gray-700 shadow-lg`}>
                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    {isRTL ? displayPowerBankData.history.ar : displayPowerBankData.history.en}
                                </p>
                            </div>
                        </div>

                        {/* Achievements Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                            {displayPowerBankData.achievements.map((achievement, idx) => (
                                <div key={idx} className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800">
                                    <SvgIcon name={achievement.icon} className={`w-8 h-8 mb-2 mx-auto ${brandColor === 'red' ? 'text-red-500' : brandColor === 'orange' ? 'text-orange-500' : 'text-blue-500'}`} />
                                    <span className={`text-2xl md:text-3xl font-black ${brandColor === 'red' ? 'text-red-600 dark:text-red-400' : brandColor === 'orange' ? 'text-orange-600 dark:text-orange-400' : 'text-blue-600 dark:text-blue-400'} block mb-1`}>
                                        {isRTL ? achievement.stat.ar : achievement.stat.en}
                                    </span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                        {isRTL ? achievement.label.ar : achievement.label.en}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Charging Technologies */}
                        <div className="max-w-5xl mx-auto mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">
                                {isRTL ? 'تقنيات الشحن' : 'Charging Technologies'}
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {displayPowerBankData.technologies.map((tech, idx) => (
                                    <div key={idx} className={`p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 ${brandColor === 'red' ? 'hover:border-red-200 dark:hover:border-red-800' : brandColor === 'orange' ? 'hover:border-orange-200 dark:hover:border-orange-800' : 'hover:border-blue-200 dark:hover:border-blue-800'} transition-colors shadow-sm`}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <SvgIcon name={tech.icon} className={`w-6 h-6 ${brandColor === 'red' ? 'text-red-500' : brandColor === 'orange' ? 'text-orange-500' : 'text-blue-500'}`} />
                                            <h4 className={`font-bold text-lg ${brandColor === 'red' ? 'text-red-600 dark:text-red-400' : brandColor === 'orange' ? 'text-orange-600 dark:text-orange-400' : 'text-blue-600 dark:text-blue-400'}`}>
                                                {tech.name}
                                            </h4>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {isRTL ? tech.description.ar : tech.description.en}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Use Cases */}
                        <div className="max-w-4xl mx-auto mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">
                                {isRTL ? 'طاقة لكل لحظة' : 'Power for Every Moment'}
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {displayPowerBankData.useCases.map((useCase, idx) => (
                                    <div key={idx} className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all">
                                        <SvgIcon name={useCase.icon} className={`w-10 h-10 mb-3 mx-auto ${brandColor === 'red' ? 'text-red-500' : brandColor === 'orange' ? 'text-orange-500' : 'text-blue-500'}`} />
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                            {isRTL ? useCase.title.ar : useCase.title.en}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {isRTL ? useCase.description.ar : useCase.description.en}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PowerBank Quality Badges */}
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 mb-12">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {displayPowerBankData.trustBadges.map((badge, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center p-3">
                                        <SvgIcon name={badge.icon} className={`w-7 h-7 mb-2 ${brandColor === 'red' ? 'text-red-500' : brandColor === 'orange' ? 'text-orange-500' : 'text-blue-500'}`} />
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

                        {/* PowerBank FAQs */}
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">
                                {isRTL ? `أسئلة شائعة عن باور بانك ${translatedBrand}` : `${translatedBrand} Power Bank FAQ`}
                            </h3>
                            <div className="space-y-4">
                                {(isRTL ? displayPowerBankData.faq.ar : displayPowerBankData.faq.en).map((item, idx) => (
                                    <details key={idx} className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                                        <summary className={`flex items-center justify-between p-5 cursor-pointer list-none font-bold text-gray-900 dark:text-white ${brandColor === 'red' ? 'hover:text-red-600 dark:hover:text-red-400' : brandColor === 'orange' ? 'hover:text-orange-600 dark:hover:text-orange-400' : 'hover:text-blue-600 dark:hover:text-blue-400'} transition-colors`}>
                                            {item.question}
                                            <span className={`${brandColor === 'red' ? 'text-red-500' : brandColor === 'orange' ? 'text-orange-500' : 'text-blue-500'} group-open:rotate-180 transition-transform`}>▼</span>
                                        </summary>
                                        <div className="px-5 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {item.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Category overview section */}
            <div className="container mx-auto px-4 py-4">
                <CollectionOverviewBlock
                    categoryName={translatedCategory}
                    categoryNameAr={tCat(categoryKey)}
                    brand={translatedBrand}
                    productCount={displayProducts.length}
                    priceRange={{
                        min: Math.min(...displayProducts.map(p => p.price)),
                        max: Math.max(...displayProducts.map(p => p.price))
                    }}
                    locale={locale}
                />
            </div>

            {/* Content Section */}
            <section className="container mx-auto px-4 py-12">
                {/* Structured Data: Expert Opinion */}
                <ExpertOpinion
                    productName={translatedCategory}
                    brand={translatedBrand}
                    category={categorySlug}
                    locale={locale}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content Column */}
                    <article className="lg:col-span-8">
                        {/* Description */}
                        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                            <MarkdownRenderer content={content.description} />
                        </div>

                        {/* Buying Guide (New) */}
                        {content.buyingGuide && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <SvgIcon name="book" className="w-6 h-6" />
                                    {locale === 'ar' ? 'دليل الشراء الذكي' : 'Smart Buying Guide'}
                                </h2>
                                <div className="space-y-6">
                                    {content.buyingGuide.map((section, idx) => (
                                        <div key={idx} className={`${bgLightClass} rounded-2xl p-6 border border-gray-100 dark:border-gray-800`}>
                                            <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                                                {section.title}
                                            </h3>
                                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                                <MarkdownRenderer content={section.content} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Structured Data: Comparison Table */}
                        <CategoryComparisonTable
                            products={content.products}
                            categoryName={translatedCategory}
                            locale={locale}
                        />

                        {/* FAQ Section (New) */}
                        {content.faq && (
                            <div className="mt-12 mb-12">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <SvgIcon name="question" className="w-6 h-6" />
                                    {locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                                </h2>
                                <div className="space-y-4">
                                    {content.faq.map((item, idx) => (
                                        <details key={idx} className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                                            <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                <span className="font-medium text-gray-900 dark:text-white pr-4">{item.question}</span>
                                                <span className="transform group-open:rotate-180 transition-transform text-gray-400">▼</span>
                                            </summary>
                                            <div className="px-4 pb-4 pt-2 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800">
                                                {item.answer}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>

                    {/* Trust Box (Desktop) */}
                    <aside className="lg:col-span-4 hidden lg:block">
                        <div className={`sticky top-24 p-6 rounded-2xl ${bgLightClass} border border-gray-100 dark:border-gray-800`}>
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <SvgIcon name="shield" className="w-5 h-5" /> {locale === 'ar' ? 'ضمان كايرو فولت' : 'CairoVolt Promise'}
                            </h3>
                            {(() => {
                                const categoryHash = typeof categorySlug === 'string' ? categorySlug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
                                const arTrustBoxSets = [
                                    ['مواصفات وسعر واضحان', 'ضمان كايرو فولت حسب صفحة المنتج', 'إرجاع خلال 14 يومًا وفق الشروط'],
                                    ['بيانات الموديل قابلة للمراجعة', 'سياسة استبدال مكتوبة', 'دفع عند الاستلام للطلبات المؤهلة'],
                                    ['مدة الضمان موضحة لكل منتج', 'شروط الضمان والاسترجاع منشورة', 'التوصيل متاح حسب العنوان'],
                                ];
                                const enTrustBoxSets = [
                                    ['Clear specifications and price', 'CairoVolt warranty as stated per product', '14-day returns subject to terms'],
                                    ['Reviewable model details', 'Written replacement policy', 'Cash on delivery for eligible orders'],
                                    ['Warranty duration stated per product', 'Published warranty and return terms', 'Delivery subject to the address'],
                                ];
                                const trustBoxSet = locale === 'ar' ? arTrustBoxSets[categoryHash % arTrustBoxSets.length] : enTrustBoxSets[categoryHash % enTrustBoxSets.length];
                                return (
                                    <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                        {trustBoxSet.map((text, i) => (
                                            <li key={i} className="flex items-center gap-2">✓ {text}</li>
                                        ))}
                                    </ul>
                                );
                            })()}
                        </div>
                    </aside>
                </div>

                {/* Related Categories */}
                <RelatedLinks
                    currentUrl={`/${brandSlug}/${categorySlug}`}
                    locale={locale}
                    variant="card"
                    maxLinks={4}
                />

                {/* CTA Section */}
                <div className={`mt-16 p-8 rounded-2xl bg-gradient-to-r ${brandColorClass} text-white text-center`}>
                    <h3 className="text-2xl font-bold mb-4">
                        {locale === 'ar' ? 'لم تجد ما تبحث عنه؟' : "Can't find what you're looking for?"}
                    </h3>
                    <p className="mb-6 text-white/90">
                        {locale === 'ar'
                            ? 'تواصل معنا عبر واتساب للحصول على أفضل العروض'
                            : 'Contact us on WhatsApp for the best deals'}
                    </p>
                    <a
                        href="https://wa.me/201558245974"
                        onClick={() => trackWhatsappClick('category')}
                        className="inline-block px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
                    >
                        {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                    </a>
                </div>
            </section>
        </div>
    );
}
