'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { CategorySeoData, FAQItem, BuyingGuideSection, TrustSignal, SoundcoreData, PowerBankData } from '@/data/category-seo';
import { BreadcrumbSchema } from './schemas/ProductSchema';
import { HowToSchema, ItemListSchema } from './schemas/AEOSchemas';
import RelatedLinks from './seo/RelatedLinks';
import { CollectionOverviewBlock } from './seo/CategoryOverviewBlock';
import { SvgIcon } from './ui/SvgIcon';
import { MarkdownRenderer } from './ui/MarkdownRenderer';

const CategoryComparisonTable = dynamic(() => import('./seo/ProductGuides').then(mod => mod.CategoryComparisonTable), {
    loading: () => <div className="animate-pulse h-64 bg-gray-100 dark:bg-gray-800 rounded-xl mb-12"></div>
});
const ExpertOpinion = dynamic(() => import('./seo/ProductGuides').then(mod => mod.ExpertOpinion), {
    loading: () => <div className="animate-pulse h-48 bg-gray-100 dark:bg-gray-800 rounded-xl mb-12"></div>
});

interface Product {
    id: string;
    slug: string;
    brand: string;
    categorySlug: string;
    price: number;
    originalPrice?: number;
    images?: Array<{ url: string; alt?: string; isPrimary?: boolean }>;
    translations?: {
        en?: { name?: string; description?: string; shortDescription?: string };
        ar?: { name?: string; description?: string; shortDescription?: string };
    };
}

interface CategoryTemplateProps {
    brand: 'Anker' | 'Joyroom';
    brandColor: 'blue' | 'red';
    category: string;
    categorySlug: string;
    seoContent: CategorySeoData['seoContent'];
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
    'other': 'other',
};

function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default function CategoryTemplate({
    brand,
    brandColor,
    category,
    categorySlug,
    seoContent,
    soundcoreData,
    powerBankData,
    initialProducts = []
}: CategoryTemplateProps) {
    const locale = useLocale();
    const tCat = useTranslations('Categories');
    const tBrand = useTranslations('Brands');
    const tCommon = useTranslations('Common');
    const content = locale === 'ar' ? seoContent.ar : seoContent.en;
    const isRTL = locale === 'ar';

    // Get translated category name
    const categoryKey = categoryKeyMap[categorySlug] || 'other';
    const translatedCategory = tCat(categoryKey);
    const translatedBrand = brand === 'Anker' ? tBrand('anker') : tBrand('joyroom');

    // Initialize with server-side products if available
    const [dbProducts, setDbProducts] = useState<Product[]>(initialProducts);
    const [loading, setLoading] = useState(initialProducts.length === 0);

    useEffect(() => {
        // If we already have products from server, we can still fetch fresh data
        // but we don't need to show loading state if we have initial data
        fetch(`/api/products?brand=${brand}&category=${categorySlug}`)
            .then(res => res.json())
            .then(data => {
                // Handle both old array format and new paginated format
                if (data.items && Array.isArray(data.items)) {
                    if (data.items.length > 0) {
                        setDbProducts(data.items);
                    }
                } else if (Array.isArray(data)) {
                    if (data.length > 0) {
                        setDbProducts(data);
                    }
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch products:', err);
                setLoading(false);
            });
    }, [brand, categorySlug]);

    const brandColorClass = brandColor === 'blue'
        ? 'from-blue-600 to-blue-400'
        : 'from-red-600 to-red-400';

    const bgLightClass = brandColor === 'blue'
        ? 'bg-blue-50 dark:bg-blue-900/10'
        : 'bg-red-50 dark:bg-red-900/10';

    const badgeColorClass = brandColor === 'blue'
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';

    const buttonColorClass = brandColor === 'blue'
        ? 'bg-blue-600 hover:bg-blue-700'
        : 'bg-red-600 hover:bg-red-700';

    // Use database products if available, otherwise use initialProducts.
    // We avoid falling back to 'content.products' which creates empty slugs.
    const productsToShow = dbProducts.length > 0 ? dbProducts : initialProducts;

    const displayProducts = productsToShow.map(p => {
        // Fallback logic for images: PRIORITIZE static images if available
        // This overrides potentially broken URLs from database with known-good static paths
        let imageUrl = p.images?.[0]?.url;

        if (initialProducts.length > 0) {
            const staticProduct = initialProducts.find(sp => sp.slug === p.slug);
            if (staticProduct?.images?.[0]?.url) {
                imageUrl = staticProduct.images[0].url;
            }
        }

        return {
            id: p.id,
            slug: p.slug,
            name: p.translations?.[locale as 'ar' | 'en']?.name || p.translations?.en?.name || 'Product',
            price: p.price,
            originalPrice: p.originalPrice,
            image: imageUrl,
            badge: undefined as string | undefined
        };
    });

    // Breadcrumbs - Arabic default locale uses '/', English uses '/en/'
    // Use proper brand casing (Anker, Joyroom)
    const localePrefix = locale === 'ar' ? '' : '/en';
    const breadcrumbs = [
        { name: tCommon('home'), url: `https://cairovolt.com${localePrefix}` },
        { name: translatedBrand, url: `https://cairovolt.com${localePrefix}/${brand}` },
        { name: translatedCategory, url: `https://cairovolt.com${localePrefix}/${brand}/${categorySlug}` }
    ];

    return (
        <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
            {content.faq && <FAQSchema faqs={content.faq} />}
            <BreadcrumbSchema items={breadcrumbs} locale={locale} />

            {/* HowTo Schema for Buying Guide - AEO Optimization */}
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
                            ? `https://cairovolt.com${localePrefix}/${brand}/${categorySlug}/${p.slug}`
                            : `https://cairovolt.com${localePrefix}/${brand}/${categorySlug}`,
                        image: p.image || '/placeholder.png',
                        price: p.price,
                        position: idx + 1,
                    }))}
                    locale={locale}
                />
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
                        <Link href={`${localePrefix}/${brand}`} className="hover:text-white">
                            {translatedBrand}
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white font-medium">{translatedCategory}</span>
                    </nav>

                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">{content.title}</h1>
                    <p className="text-base md:text-xl text-white/90 mb-4 md:mb-6">{content.subtitle}</p>

                    {/* Trust Signals (Hero) */}
                    {content.trustSignals && (
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-6">
                            {content.trustSignals.map((signal, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                    <span className="text-yellow-300">
                                        {signal.type === 'originality' && (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                        )}
                                        {signal.type === 'warranty' && (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                                        )}
                                        {signal.type === 'expert_verified' && (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11l2 2 4-4" /></svg>
                                        )}
                                    </span>
                                    <span className="text-xs md:text-sm font-medium text-white">{signal.text}</span>
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
            <section className="container mx-auto px-4 py-8">
                <h2 className="text-xl font-bold mb-6">
                    {locale === 'ar' ? 'المنتجات' : 'Products'}
                    {loading && <span className="text-sm font-normal text-gray-500 ml-2">...</span>}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {displayProducts.map((product, idx) => (
                        <Link
                            key={product.id || idx}
                            href={product.slug
                                ? `${localePrefix}/${brand}/${categorySlug}/${product.slug}`
                                : '#'
                            }
                            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                        >
                            {/* Product Image */}
                            <div className="w-full aspect-square bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
                                {product.image ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        loading={idx < 4 ? 'eager' : 'lazy'}
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-contain p-2 group-hover:scale-105 transition-transform"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className={`text-3xl font-bold bg-gradient-to-r ${brandColorClass} bg-clip-text text-transparent`}>
                                            {brand.charAt(0)}
                                        </span>
                                    </div>
                                )}
                                {/* C2PA verified badge */}
                                <span
                                    className="absolute bottom-1 right-1 bg-emerald-500 text-white rounded-full p-0.5"
                                    title={locale === 'ar' ? 'صورة موثّقة — C2PA' : 'Verified image — C2PA'}
                                >
                                    <SvgIcon name="shield" className="w-2.5 h-2.5" />
                                </span>
                            </div>

                            {/* Product Info */}
                            <div className="p-3">
                                {product.badge && (
                                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${badgeColorClass}`}>
                                        {product.badge}
                                    </span>
                                )}
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors mb-2">
                                    {product.name}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-base font-bold text-gray-900 dark:text-white">
                                            {product.price}
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-normal ml-1">{locale === 'ar' ? 'ج.م' : 'EGP'}</span>
                                        {product.originalPrice && product.originalPrice > product.price && (
                                            <span className="text-xs text-gray-400 line-through ml-2">{product.originalPrice}</span>
                                        )}
                                    </div>
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center ${brandColorClass} text-white shadow-sm text-xs`}>
                                        →
                                    </span>
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

            {/* Soundcore Section for "ankersoundcore" SEO - Only renders for audio category */}
            {soundcoreData && (
                <section className="py-16 bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-950">
                    <div className="container mx-auto px-4">
                        {/* Section Title & Tagline */}
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-bold mb-4">
                                <SvgIcon name="headphones" className="w-5 h-5 inline-block" /> {isRTL ? soundcoreData.tagline.ar : soundcoreData.tagline.en}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black mb-4 dark:text-white">
                                {isRTL ? soundcoreData.title.ar : soundcoreData.title.en}
                            </h2>
                            <div className="h-1.5 w-24 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
                        </div>

                        {/* History */}
                        <div className="max-w-4xl mx-auto mb-12">
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-purple-100 dark:border-gray-700 shadow-lg">
                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    {isRTL ? soundcoreData.history.ar : soundcoreData.history.en}
                                </p>
                            </div>
                        </div>

                        {/* Achievements Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                            {soundcoreData.achievements.map((achievement, idx) => (
                                <div key={idx} className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800">
                                    <SvgIcon name={achievement.icon} className="w-8 h-8 mb-2 mx-auto text-purple-500" />
                                    <span className="text-2xl md:text-3xl font-black text-purple-600 dark:text-purple-400 block mb-1">
                                        {isRTL ? achievement.stat.ar : achievement.stat.en}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {isRTL ? achievement.label.ar : achievement.label.en}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Audio Technologies */}
                        <div className="max-w-5xl mx-auto mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">
                                {isRTL ? 'تقنيات الصوت الحصرية' : 'Exclusive Audio Technologies'}
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {soundcoreData.technologies.map((tech, idx) => (
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
                                {soundcoreData.useCases.map((useCase, idx) => (
                                    <div key={idx} className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all">
                                        <SvgIcon name={useCase.icon} className="w-10 h-10 mb-3 mx-auto text-purple-500" />
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                            {isRTL ? useCase.title.ar : useCase.title.en}
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {isRTL ? useCase.description.ar : useCase.description.en}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Soundcore Trust Badges */}
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 mb-12">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {soundcoreData.trustBadges.map((badge, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center p-3">
                                        <SvgIcon name={badge.icon} className="w-7 h-7 mb-2 text-purple-500" />
                                        <span className="font-bold text-sm text-gray-900 dark:text-white">
                                            {isRTL ? badge.title.ar : badge.title.en}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {isRTL ? badge.description.ar : badge.description.en}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Soundcore FAQs */}
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">
                                {isRTL ? 'أسئلة شائعة عن Soundcore' : 'Soundcore FAQ'}
                            </h3>
                            <div className="space-y-4">
                                {(isRTL ? soundcoreData.faq.ar : soundcoreData.faq.en).map((item, idx) => (
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

            {/* NEW: PowerBank Section for "باور بانك انكر" SEO - Only renders for power-banks category */}
            {powerBankData && (
                <section className="py-16 bg-gradient-to-b from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950">
                    <div className="container mx-auto px-4">
                        {/* Section Title & Tagline */}
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold mb-4">
                                <SvgIcon name="battery" className="w-5 h-5 inline-block" /> {isRTL ? powerBankData.tagline.ar : powerBankData.tagline.en}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black mb-4 dark:text-white">
                                {isRTL ? powerBankData.title.ar : powerBankData.title.en}
                            </h2>
                            <div className="h-1.5 w-24 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-cyan-600"></div>
                        </div>

                        {/* History */}
                        <div className="max-w-4xl mx-auto mb-12">
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-blue-100 dark:border-gray-700 shadow-lg">
                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    {isRTL ? powerBankData.history.ar : powerBankData.history.en}
                                </p>
                            </div>
                        </div>

                        {/* Achievements Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                            {powerBankData.achievements.map((achievement, idx) => (
                                <div key={idx} className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800">
                                    <SvgIcon name={achievement.icon} className="w-8 h-8 mb-2 mx-auto text-blue-500" />
                                    <span className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 block mb-1">
                                        {isRTL ? achievement.stat.ar : achievement.stat.en}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {isRTL ? achievement.label.ar : achievement.label.en}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Charging Technologies */}
                        <div className="max-w-5xl mx-auto mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">
                                {isRTL ? 'تقنيات الشحن الحصرية' : 'Exclusive Charging Technologies'}
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {powerBankData.technologies.map((tech, idx) => (
                                    <div key={idx} className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors shadow-sm">
                                        <div className="flex items-center gap-3 mb-3">
                                            <SvgIcon name={tech.icon} className="w-6 h-6 text-blue-500" />
                                            <h4 className="font-bold text-lg text-blue-600 dark:text-blue-400">
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
                                {powerBankData.useCases.map((useCase, idx) => (
                                    <div key={idx} className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all">
                                        <SvgIcon name={useCase.icon} className="w-10 h-10 mb-3 mx-auto text-blue-500" />
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                            {isRTL ? useCase.title.ar : useCase.title.en}
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {isRTL ? useCase.description.ar : useCase.description.en}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PowerBank Trust Badges */}
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 mb-12">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {powerBankData.trustBadges.map((badge, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center p-3">
                                        <SvgIcon name={badge.icon} className="w-7 h-7 mb-2 text-blue-500" />
                                        <span className="font-bold text-sm text-gray-900 dark:text-white">
                                            {isRTL ? badge.title.ar : badge.title.en}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {isRTL ? badge.description.ar : badge.description.en}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PowerBank FAQs */}
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">
                                {isRTL ? 'أسئلة شائعة عن باور بانك انكر' : 'Anker Power Bank FAQ'}
                            </h3>
                            <div className="space-y-4">
                                {(isRTL ? powerBankData.faq.ar : powerBankData.faq.en).map((item, idx) => (
                                    <details key={idx} className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            {item.question}
                                            <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
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

            {/* Category AEO Block - Answer-First Content for AI/Voice Search */}
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
                        {/* SEO Description */}
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
                                    ['منتجات أصلية 100%', 'ضمان الوكيل الرسمي', 'استرجاع خلال 14 يوم'],
                                    ['باركود أصلي قابل للفحص', 'كفالة استبدال فوري', 'دفع عند الاستلام'],
                                    ['مختوم بختم الشركة', 'حماية لمدة 18 شهر', 'توصيل لجميع المحافظات'],
                                ];
                                const enTrustBoxSets = [
                                    ['100% Original', 'Official Warranty', '14 Days Return'],
                                    ['Scan-Verifiable Barcode', 'Instant Replacement', 'Cash on Delivery'],
                                    ['Company Stamped', '18-Month Protection', 'Nationwide Delivery'],
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

                {/* Related Categories - Internal Linking */}
                <RelatedLinks
                    currentUrl={`/${brand}/${categorySlug}`}
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
                        href="https://wa.me/201063374834"
                        className="inline-block px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
                    >
                        {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                    </a>
                </div>
            </section>
        </div>
    );
}
