'use client';
import { flushSync } from 'react-dom';
import { trackViewItem, trackAddToCart, trackImageGallerySwipe, trackQuantityChange, trackWhatsappClick, type AnalyticsItem } from '@/lib/analytics';

import Link from 'next/link';
import Image from 'next/image';
import { ProductImage } from '@/components/ui/ProductImage';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { QuickSummary } from '@/components/content/ProductGuides';
import { CategoryOverviewBlock } from '@/components/content/CategoryOverviewBlock';
import { useCart } from '@/context/CartContext';
import TestResultsBlock from '@/components/content/TestResultsBlock';
import ProductTestResults from '@/components/content/ProductTestResults';
import ProductGuarantees from '@/components/products/ProductGuarantees';
import type { RegionalStats } from '@/lib/bosta';
import type { LabMetrics } from '@/data/product-tests';

// Lazy Load Heavy Components
const VerifiedReviews = dynamic(() => import('@/components/reviews/VerifiedReviews'), {
    loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-800 rounded-2xl animate-pulse my-8" />,
    ssr: false
});

const RelatedProducts = dynamic(() => import('@/components/products/RelatedProducts'), {
    ssr: false
});

const BundleSelector = dynamic(() => import('@/components/products/BundleSelector'), {
    loading: () => <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-2xl animate-pulse my-8" />,
    ssr: false
});

const ProductComparisonTable = dynamic(() => import('@/components/content/ProductGuides').then(mod => mod.ProductComparisonTable));
const ExpertOpinion = dynamic(() => import('@/components/content/ProductGuides').then(mod => mod.ExpertOpinion));
const ProductFAQ = dynamic(() => import('@/components/content/ProductGuides').then(mod => mod.ProductFAQ));

const BackupTimeCalculator = dynamic(() => import('@/components/UX/BackupTimeCalculator'), {
    ssr: false
});
import RelatedLinks from '@/components/content/RelatedLinks';
import { getProductDetail } from '@/data/product-details';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { ContentCredentialsBadge } from '@/components/UX/ContentCredentialsBadge';

// Lightweight HTML sanitizer — strips dangerous tags while preserving formatting
function sanitizeHtml(html: string): string {
    // Remove script, style, iframe, object, embed, form, and event handlers
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
        .replace(/<object[\s\S]*?<\/object>/gi, '')
        .replace(/<embed[^>]*>/gi, '')
        .replace(/<form[\s\S]*?<\/form>/gi, '')
        .replace(/<input[^>]*>/gi, '')
        .replace(/<textarea[\s\S]*?<\/textarea>/gi, '')
        .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '') // on* event handlers
        .replace(/\son\w+\s*=\s*\S+/gi, '') // unquoted on* handlers
        .replace(/javascript\s*:/gi, 'blocked:') // javascript: URIs
        .replace(/data\s*:/gi, 'blocked:'); // data: URIs
}


interface Product {
    id: string; // Add id
    slug: string;
    sku?: string;
    brand: string;
    categorySlug: string;
    price: number;
    originalPrice?: number;
    stock?: number;
    featured?: boolean;
    images?: Array<{ url: string; alt?: string; isPrimary?: boolean }>;
    translations?: {
        en?: { name?: string; description?: string; shortDescription?: string; features?: string[]; metaTitle?: string; metaDesc?: string; faqs?: Array<{ question: string; answer: string }>; };
        ar?: { name?: string; description?: string; shortDescription?: string; features?: string[]; metaTitle?: string; metaDesc?: string; faqs?: Array<{ question: string; answer: string }>; };
    };
    expertOpinion?: {
        en?: string;
        ar?: string;
    };
    meta?: { keywords?: string; mainTerm?: string };
    contentCredentials?: Record<string, unknown> | null;
}

interface ProductPageClientProps {
    product: Product;
    relatedProducts?: Product[];
    locale: string;
    brand: string;
    category: string;
    labTestData?: {
        testScenario: string;
        testResult: string;
        testConditions: string;
        expertName: string;
        expertProfileUrl: string;
    };
    thermalAdvice?: {
        currentTemp: number;
        category: string;
    };
    deliveryIntelligence: RegionalStats;
    labMetrics: LabMetrics | null;
    userGovernorate: string;
}

// Category mapping for breadcrumb
const categoryKeyMap: Record<string, string> = {
    'power-banks': 'powerBanks',
    'wall-chargers': 'wallChargers',
    'cables': 'cables',
    'car-chargers': 'carChargers',
    'audio': 'audio',
    'smart-watches': 'smartWatches',
};

export default function ProductPageClient({ product, relatedProducts = [], locale, brand, category, labTestData, thermalAdvice, deliveryIntelligence, labMetrics, userGovernorate }: ProductPageClientProps) {
    const tCommon = useTranslations('Common');
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    // Get translations for the current product
    const tProduct = useTranslations('Product');
    const tCat = useTranslations('Categories');
    const tBrand = useTranslations('Brands');

    const tFAQ = useTranslations('FAQ');
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showAddedFeedback, setShowAddedFeedback] = useState(false);

    // Sticky Buy Bar Logic
    const [showStickyBar, setShowStickyBar] = useState(false);
    const addToCartButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Show sticky bar when main button is NOT visible (scrolled past)
                setShowStickyBar(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (addToCartButtonRef.current) {
            observer.observe(addToCartButtonRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Analytics: log product view
    useEffect(() => {
        trackViewItem({
            item_id: product.id,
            item_name: product.translations?.[locale as 'ar' | 'en']?.name || product.slug,
            item_brand: product.brand,
            item_category: product.categorySlug,
            price: product.price,
            quantity: 1,
        });
    }, [product.id, product.slug, product.brand, product.categorySlug, product.price, product.translations, locale]);

    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return locale === 'ar' ? cleanPath : `/${locale}${cleanPath}`;
    };

    const currentTranslation = product.translations?.[locale as 'ar' | 'en'] || product.translations?.en;
    const productName = currentTranslation?.name || product.slug;
    const productDesc = currentTranslation?.description || '';
    const productShortDesc = currentTranslation?.shortDescription || '';
    const productFeatures = currentTranslation?.features || [];
    const productDetail = getProductDetail(product.slug);

    const handleAddToCart = () => {
        // flushSync forces React to paint the green feedback BEFORE startTransition batches the cart update
        flushSync(() => {
            setShowAddedFeedback(true);
        });
        setTimeout(() => setShowAddedFeedback(false), 1500);

        // Analytics: log add to cart
        trackAddToCart({
            item_id: product.id,
            item_name: productName,
            item_brand: product.brand,
            item_category: product.categorySlug,
            price: product.price,
            quantity: quantity,
        });

        // Cart update happens in background via useTransition in CartContext
        addToCart({
            productId: product.id,
            name: productName,
            price: product.price,
            quantity: quantity,
            image: product.images?.[0]?.url,
            brand: product.brand
        });
    };

    const images = product.images || [];
    const primaryImage = images[selectedImage]?.url || '';
    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    const translatedCategory = tCat(categoryKeyMap[category] || 'other');
    const translatedBrand = brand === 'anker' ? tBrand('anker') : tBrand('joyroom');
    const brandColor = brand === 'anker' ? 'blue' : 'red';

    const isRTL = locale === 'ar';
    const isOutOfStock = (product.stock || 0) <= 0;

    // Breadcrumb Data - Strict Lowercase URLs
    const brandLower = product.brand.toLowerCase();
    const categoryLower = product.categorySlug.toLowerCase();

    // Display names (Capitalized)
    const brandDisplay = product.brand.charAt(0).toUpperCase() + product.brand.slice(1);
    // categorySlug is reliable for linking, category param might be mixed case

    const productDisplayTitle = product.translations?.[locale as 'en' | 'ar']?.name || product.slug;

    // Dynamic Headings for AI Summary
    const hash = typeof product.slug === 'string' ? product.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;

    const arAiHeadings = ['ملخص سريع', 'الخلاصة المختصرة', 'عشان وقتك', 'في السريع كده', 'إجابتك المختصرة', 'ع الماشي'];
    const enAiHeadings = ['Quick Summary', 'TL;DR', 'Fast Facts', 'In a Nutshell', 'For Your Time', 'Bottom Line'];

    const selectedArAiHeading = arAiHeadings[hash % arAiHeadings.length];
    const selectedEnAiHeading = enAiHeadings[hash % enAiHeadings.length];

    return (
        <div className={`min-h-screen pb-20 ${locale === 'ar' ? 'rtl' : 'ltr'}`}>

            {/* Visual Interface Layer */}

            {/* Breadcrumb */}
            <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 overflow-x-auto whitespace-nowrap">
                        <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">
                            {locale === 'ar' ? 'الرئيسية' : 'Home'}
                        </Link>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">/</span>
                        <Link href={getLocalizedHref(`/${brandLower}`)} className="hover:text-blue-600 transition-colors">
                            {brandDisplay}
                        </Link>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">/</span>
                        <Link href={getLocalizedHref(`/${brandLower}/${categoryLower}`)} className="hover:text-blue-600 transition-colors">
                            {translatedCategory}
                        </Link>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">/</span>
                        <span className="text-gray-900 dark:text-white font-medium truncate">
                            {productName}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Product summary */}
            <div className="container mx-auto px-4 pt-4">
                <CategoryOverviewBlock
                    productName={productName}
                    brand={product.brand}
                    category={translatedCategory}
                    price={product.price}
                    locale={locale}
                    shortDescription={productShortDesc}
                />
            </div>

            {/* Product Section */}
            <div className="container mx-auto px-4 py-4 md:py-8 max-w-full">
                <article className="grid lg:grid-cols-2 gap-6 lg:gap-12 max-w-full overflow-hidden">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div
                            className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg"
                            onTouchStart={(e) => {
                                const touch = e.touches[0];
                                (e.currentTarget as HTMLDivElement).dataset.touchStartX = touch.clientX.toString();
                            }}
                            onTouchEnd={(e) => {
                                const touchStartX = parseFloat((e.currentTarget as HTMLDivElement).dataset.touchStartX || '0');
                                const touchEndX = e.changedTouches[0].clientX;
                                const diff = touchStartX - touchEndX;
                                if (Math.abs(diff) > 50) {
                                    if (diff > 0 && selectedImage < images.length - 1) {
                                        setSelectedImage(selectedImage + 1);
                                    } else if (diff < 0 && selectedImage > 0) {
                                        setSelectedImage(selectedImage - 1);
                                    }
                                }
                            }}
                        >
                            {discount > 0 && (
                                <span className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full z-10 shadow-lg`}>
                                    -{discount}%
                                </span>
                            )}
                            {product.featured && (
                                <span className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} px-3 py-1.5 bg-yellow-400 text-black text-sm font-bold rounded-full z-10 flex items-center gap-1`}>
                                    <SvgIcon name="star" className="w-4 h-4" /> {isRTL ? 'مميز' : 'Featured'}
                                </span>
                            )}

                            {/* Navigation Arrows */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)}
                                        className={`absolute ${isRTL ? 'right-2' : 'left-2'} top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110`}
                                        aria-label={isRTL ? 'الصورة السابقة' : 'Previous image'}
                                    >
                                        <svg className={`w-5 h-5 text-gray-700 dark:text-white ${isRTL ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)}
                                        className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110`}
                                        aria-label={isRTL ? 'الصورة التالية' : 'Next image'}
                                    >
                                        <svg className={`w-5 h-5 text-gray-700 dark:text-white ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}

                            {/* Image Counter */}
                            {images.length > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
                                    {selectedImage + 1} / {images.length}
                                </div>
                            )}

                            <div className="w-full h-full relative">
                                {primaryImage ? (
                                    <ProductImage
                                        src={primaryImage}
                                        alt={productName}
                                        slug={product.slug}
                                        brand={product.brand}
                                        c2paHash={product.contentCredentials?.signature ? String(product.contentCredentials.signature).slice(0, 32) : undefined}
                                        fill
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        imageClassName="object-cover transition-transform hover:scale-105"
                                        isPrimary
                                        locale={locale}
                                    />
                                ) : (
                                    <div className={`text-8xl font-bold bg-gradient-to-br ${brand === 'anker' ? 'from-blue-400 to-blue-600' : 'from-red-400 to-red-600'} bg-clip-text text-transparent`}>
                                        {brand.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2 sm:flex sm:gap-3 sm:overflow-x-auto pb-4 lg:pb-2">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => { setSelectedImage(idx); trackImageGallerySwipe(product.id, idx); }}
                                        className={`relative w-full aspect-square rounded-xl border-2 overflow-hidden transition-all bg-white ${selectedImage === idx
                                            ? brand === 'anker'
                                                ? 'border-blue-600 shadow-lg ring-2 ring-blue-600/20'
                                                : 'border-red-600 shadow-lg ring-2 ring-red-600/20'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <Image
                                            src={img.url}
                                            alt={img.alt || productName}
                                            fill
                                            loading="lazy"
                                            sizes="80px"
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Verification badge */}
                        {product.contentCredentials && (
                            <div className="flex justify-end">
                                <ContentCredentialsBadge
                                    credentials={product.contentCredentials as Parameters<typeof ContentCredentialsBadge>[0]['credentials']}
                                    productSlug={product.slug}
                                    locale={locale}
                                />
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6 max-w-full overflow-hidden">

                        {/* AI Quick Summary - New Addition */}
                        <QuickSummary
                            product={{
                                brand: product.brand,
                                price: product.price,
                                translations: {
                                    en: {
                                        name: product.translations?.en?.name || product.slug,
                                        shortDescription: product.translations?.en?.shortDescription || ''
                                    },
                                    ar: {
                                        name: product.translations?.ar?.name || product.slug,
                                        shortDescription: product.translations?.ar?.shortDescription || ''
                                    }
                                }
                            }}
                            locale={locale}
                        />

                        {/* Brand & Stock */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-4 py-1.5 text-sm font-bold rounded-full ${brand === 'anker'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                }`}>
                                {translatedBrand}
                            </span>
                            {/* Availability Badge - Dynamic Brand */}
                            {(product.stock || 0) > 0 ? (
                                <span className={`px-4 py-1.5 text-sm font-medium rounded-full flex items-center gap-2 ${product.brand.toLowerCase() === 'anker'
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                    : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                                    }`}>
                                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                    {product.brand} — {tProduct('inStock')}
                                </span>
                            ) : (
                                <span className="px-4 py-1.5 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full">
                                    {tProduct('outOfStock')}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                            {productName}
                        </h1>

                        {/* Short Description */}
                        {productShortDesc && (
                            <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                {productShortDesc}
                            </p>
                        )}

                        {/* AI TL;DR */}
                        {productDetail?.aiTldr && (
                            <div className={`p-4 rounded-xl border-2 ${brand === 'anker' ? 'border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/30' : 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/30'}`}>
                                <h2 className="text-sm font-bold mb-2 flex items-center gap-1.5 text-gray-800 dark:text-gray-200">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    {isRTL ? selectedArAiHeading : selectedEnAiHeading}
                                </h2>
                                <ul className="space-y-1">
                                    {(isRTL ? productDetail.aiTldr.ar : productDetail.aiTldr.en).map((point: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${brand === 'anker' ? 'bg-blue-500' : 'bg-red-500'}`} />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Local Pain Point */}
                        {productDetail?.localContext && (
                            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                                <p className="text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2">
                                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {isRTL ? productDetail.localContext.ar : productDetail.localContext.en}
                                </p>
                            </div>
                        )}

                        {/* Price */}
                        <div className="flex flex-wrap items-end gap-2 md:gap-3 py-3 md:py-4 border-y border-gray-100 dark:border-gray-800">
                            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                                {product.price.toLocaleString()}
                            </span>
                            <span className="text-base md:text-xl text-gray-500 mb-0.5 md:mb-1">
                                {tCommon('egp')}
                            </span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-base md:text-xl text-gray-400 line-through mb-0.5 md:mb-1">
                                        {product.originalPrice.toLocaleString()}
                                    </span>
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-sm font-bold rounded">
                                        {isRTL ? `وفر ${(product.originalPrice - product.price).toLocaleString()}` : `Save ${(product.originalPrice - product.price).toLocaleString()}`}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Purchase CTAs — Hidden when Out of Stock */}
                        {!isOutOfStock ? (
                            <>
                                {/* Quantity & Add to Cart */}
                                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
                                        <button
                                            onClick={() => { const nq = Math.max(1, quantity - 1); setQuantity(nq); trackQuantityChange(product.id, nq); }}
                                            className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-lg"
                                        >
                                            −
                                        </button>
                                        <span className="px-6 py-3 font-bold text-lg min-w-[3rem] text-center">{quantity}</span>
                                        <button
                                            onClick={() => { const nq = quantity + 1; setQuantity(nq); trackQuantityChange(product.id, nq); }}
                                            className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-lg"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        ref={addToCartButtonRef}
                                        onClick={handleAddToCart}
                                        data-add-to-cart
                                        className={`w-full sm:w-auto sm:flex-1 sm:min-w-[200px] px-6 py-3 font-bold text-base sm:text-lg rounded-xl transition-all duration-200 transform shadow-lg ${showAddedFeedback
                                            ? 'bg-green-600 scale-95 text-white shadow-green-600/30'
                                            : brand === 'anker'
                                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 hover:scale-[1.02]'
                                                : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30 hover:scale-[1.02]'
                                            }`}
                                    >
                                        {showAddedFeedback
                                            ? <><SvgIcon name="cart" className="w-5 h-5 inline-block" /> ✓ {isRTL ? 'تم الإضافة' : 'Added!'}</>
                                            : <><SvgIcon name="cart" className="w-5 h-5 inline-block" /> {tProduct('addToCart')}</>}
                                    </button>
                                </div>


                                {/* Community impact section */}
                                <div className="mt-4 p-4 rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-900/10 flex items-start gap-3 transition-transform hover:-translate-y-1 duration-300 shadow-sm">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-300 text-lg">
                                            💚
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                                            {isRTL ? 'معاً من أجل مصر' : 'Together for Egypt'}
                                        </h4>
                                        <p className="text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed">
                                            {isRTL ? (
                                                <>
                                                    بشرائك هذا المنتج، أنت تساهم مباشرًة بـ <strong className="font-bold underline decoration-emerald-300 underline-offset-2">{Math.max(10, Math.floor(product.price * 0.02))} جنيه</strong> لدعم <span className="font-semibold text-emerald-800 dark:text-emerald-200">مؤسسة مجدي يعقوب للقلب</span> أو <span className="font-semibold text-emerald-800 dark:text-emerald-200">بنك الطعام المصري</span>. شكراً لثقتك ودعمك.
                                                </>
                                            ) : (
                                                <>
                                                    By purchasing this, you directly contribute <strong className="font-bold underline decoration-emerald-300 underline-offset-2">{Math.max(10, Math.floor(product.price * 0.02))} EGP</strong> to support the <span className="font-semibold text-emerald-800 dark:text-emerald-200">Magdi Yacoub Heart Foundation</span>. Thank you for making a difference.
                                                </>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {/* Bundle Selector Component */}
                                <div className="mt-8">
                                    <BundleSelector
                                        mainProduct={product}
                                        relatedProducts={relatedProducts}
                                        locale={locale}
                                    />
                                </div>
                            </>
                        ) : (
                            /* Out of Stock — Notify Me CTA */
                            <div className="space-y-4">
                                <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                                    <svg className="w-10 h-10 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                    </svg>
                                    <p className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-1">
                                        {isRTL ? 'هذا المنتج غير متوفر حالياً' : 'This product is currently out of stock'}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        {isRTL ? 'تواصل معنا عبر واتساب لمعرفة موعد التوفر' : 'Contact us via WhatsApp to know when it\'s back'}
                                    </p>
                                    <a
                                        href={`https://wa.me/201558245974?text=${encodeURIComponent(
                                            isRTL
                                                ? `مرحباً، أريد أن أعرف متى سيتوفر: ${productName}`
                                                : `Hi, I want to know when this will be available: ${productName}`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackWhatsappClick('product')}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/30"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        {isRTL ? 'أبلغني عند التوفر' : 'Notify Me When Available'}
                                    </a>
                                </div>
                                {/* Show related products prominently */}
                                {relatedProducts.length > 0 && (
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                                        <p className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-1">
                                            {isRTL ? 'شاهد منتجات بديلة متوفرة أدناه' : 'See available alternatives below'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Quality Badges — SVG Icons */}
                        <div className="grid grid-cols-2 gap-2 md:gap-4 pt-4 md:pt-6 max-w-full overflow-hidden">
                            {(() => {
                                const trustHash = hash; // reuse existing hash from slug
                                const trustItems = [
                                    { // Original
                                        ar: [{ title: 'منتج أصلي', sub: 'ضمان 100%' }, { title: 'ضمان رسمي', sub: '18 شهر' }, { title: 'شحن سريع', sub: '2-3 أيام' }, { title: 'الدفع عند الاستلام', sub: 'بدون مقدم' }],
                                        en: [{ title: 'Original Product', sub: '100% Guaranteed' }, { title: 'Official Warranty', sub: '18 Months' }, { title: 'Fast Shipping', sub: '2-3 Days' }, { title: 'Cash on Delivery', sub: 'No Prepayment' }]
                                    },
                                    { // Variant 1
                                        ar: [{ title: 'باركود أصلي', sub: 'قابل للفحص' }, { title: 'كفالة الوكيل', sub: 'استبدال فوري' }, { title: 'توصيل سريع', sub: 'كل المحافظات' }, { title: 'ادفع كاش', sub: 'عند الاستلام' }],
                                        en: [{ title: 'Verified Barcode', sub: 'Scan to Confirm' }, { title: 'Dealer Guarantee', sub: 'Instant Replace' }, { title: 'Quick Delivery', sub: 'All Governorates' }, { title: 'Pay Cash', sub: 'On Receipt' }]
                                    },
                                    { // Variant 2
                                        ar: [{ title: 'مختوم بختم الشركة', sub: 'معتمد من الموزع' }, { title: 'حماية 18 شهر', sub: 'ضد عيوب الصناعة' }, { title: 'شحن مصر', sub: '1-3 أيام عمل' }, { title: 'دفع مرن', sub: 'كاش أو فودافون كاش' }],
                                        en: [{ title: 'Company Sealed', sub: 'Distributor Certified' }, { title: '18-Month Shield', sub: 'Manufacturing Defects' }, { title: 'Egypt Shipping', sub: '1-3 Business Days' }, { title: 'Flexible Pay', sub: 'Cash or VodaCash' }]
                                    },
                                ];
                                const selectedSet = isRTL ? trustItems[trustHash % trustItems.length].ar : trustItems[trustHash % trustItems.length].en;
                                const icons = ['green', 'blue', 'indigo', 'emerald'];
                                const iconColors = ['text-green-600', 'text-blue-600', 'text-indigo-600', 'text-emerald-600'];
                                const iconPaths = [
                                    'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                                    'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
                                    'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0',
                                    'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
                                ];
                                return selectedSet.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-white dark:bg-gray-900 rounded-lg md:rounded-xl border border-gray-100 dark:border-gray-800">
                                        <svg className={`w-6 h-6 md:w-8 md:h-8 ${iconColors[i]} flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={iconPaths[i]} />
                                        </svg>
                                        <div>
                                            <div className="font-bold text-xs md:text-sm">{item.title}</div>
                                            <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">{item.sub}</div>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                </article>
            </div>

            {/* Product Details */}
            <div className="container mx-auto px-4 py-12">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-lg">
                    {/* 1. Features Section — "Why should I buy this?" */}
                    {productFeatures.length > 0 && (
                        <section className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800" aria-label={isRTL ? 'مميزات المنتج' : 'Product Features'}>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <SvgIcon name="bolt" className="w-6 h-6" />
                                {tProduct('features')}
                            </h2>
                            <ul className="grid md:grid-cols-2 gap-4">
                                {productFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className={`flex-shrink-0 w-6 h-6 ${brand === 'anker' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'} rounded-full flex items-center justify-center text-sm font-bold`}>
                                            ✓
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* 2. CairoVolt Labs Test Results — Proof after claim */}
                    {labTestData && (
                        <section className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
                            <TestResultsBlock
                                testScenario={labTestData.testScenario}
                                testResult={labTestData.testResult}
                                testConditions={labTestData.testConditions}
                                expertName={labTestData.expertName}
                                expertProfileUrl={labTestData.expertProfileUrl}
                                locale={locale}
                            />
                        </section>
                    )}

                    {/* Product Test Results — product test metrics */}
                    {labMetrics && (
                        <section className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
                            <ProductTestResults
                                sku={product.slug}
                                locale={locale}
                                labMetrics={labMetrics}
                                productName={productName}
                            />
                        </section>
                    )}

                    {/* Trust Matrix — Exclusive Logistics + Lab Metrics */}
                    <section className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
                        <ProductGuarantees
                            sku={product.slug}
                            userGovernorate={userGovernorate}
                            locale={locale}
                            deliveryStats={deliveryIntelligence}
                            labMetrics={labMetrics}
                        />
                    </section>

                    {/* 3. Dynamic Thermal Advice — Supporting evidence */}
                    {thermalAdvice && ['power-banks', 'wall-chargers', 'car-chargers'].includes(thermalAdvice.category) && (
                        <section className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
                            <div className="bg-yellow-50/80 dark:bg-yellow-900/20 border-r-4 border-yellow-500 p-5 rounded-l-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xl">🌡️</span>
                                    <h4 className="font-bold text-yellow-900 dark:text-yellow-200">
                                        {isRTL ? 'تحليل الأداء الحراري (مختبرات كايرو فولت)' : 'Thermal Performance Analysis (CairoVolt Labs)'}
                                    </h4>
                                </div>
                                <p className="text-yellow-800 dark:text-yellow-200 font-medium leading-relaxed">
                                    {thermalAdvice.currentTemp > 35
                                        ? (isRTL
                                            ? `⚠️ تنبيه: درجة حرارة الجو في مصر الآن (${thermalAdvice.currentTemp}°C). هذا المنتج مصمم لتحمل حرارة الصيف المصري بأمان.`
                                            : `⚠️ Alert: Current temperature in Egypt is (${thermalAdvice.currentTemp}°C). This product is designed to handle Egyptian summer heat safely.`)
                                        : (isRTL
                                            ? `✅ الطقس في مصر الآن (${thermalAdvice.currentTemp}°C) مثالي لأداء البطاريات. المنتج سيعمل بأقصى كفاءة.`
                                            : `✅ Current weather in Egypt (${thermalAdvice.currentTemp}°C) is ideal for battery performance. Product will operate at maximum efficiency.`)}
                                </p>
                            </div>
                        </section>
                    )}

                    {/* 4. Enhanced Structured Data Sections — Expert Opinion + FAQs + Comparison */}
                    <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
                        {/* Expert Opinion */}
                        <ExpertOpinion
                            productName={productName}
                            brand={translatedBrand}
                            category={category}
                            locale={locale}
                            customOpinion={product.expertOpinion?.[locale as 'ar' | 'en']}
                        />

                        {/* BackupTimeCalculator — only for power bank products */}
                        {category === 'power-banks' && (
                            <div className="border-t border-gray-100 dark:border-gray-800 my-6 pt-6">
                                <BackupTimeCalculator locale={locale} />
                            </div>
                        )}

                        {/* Smart Product FAQs (Prioritize Specific Layout) */}
                        <div className="border-t border-gray-100 dark:border-gray-800 my-6 pt-6">
                            {/* Pass specific FAQs if they exist */}
                            {currentTranslation?.faqs && currentTranslation.faqs.length > 0 ? (
                                <div className="my-8">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <SvgIcon name="question" className="w-5 h-5" />
                                        {isRTL ? 'أسئلة شائعة عن المنتج' : 'Product FAQs'}
                                    </h3>
                                    <div className="space-y-3">
                                        {currentTranslation.faqs.map((faq, idx) => (
                                            <details key={idx} className="group bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800/50 open:bg-blue-50/50 dark:open:bg-blue-900/10">
                                                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-800 dark:text-gray-200">
                                                    <span>{faq.question}</span>
                                                    <span className="text-xl group-open:rotate-180 transition-transform text-blue-500">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                    </span>
                                                </summary>
                                                <p className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <ProductFAQ
                                    categorySlug={category}
                                    locale={locale}
                                    t={tFAQ}
                                />
                            )}
                        </div>

                        {/* Product Comparison Table */}
                        <ProductComparisonTable
                            product={{
                                slug: product.slug,
                                brand: product.brand,
                                price: product.price,
                                translations: {
                                    en: { name: product.translations?.en?.name || product.slug },
                                    ar: { name: product.translations?.ar?.name || product.slug }
                                }
                            }}
                            locale={locale}
                        />
                    </div>

                    {/* Description Section - Progressive Disclosure Pattern */}
                    {productDesc && (
                        <section className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800" aria-label={isRTL ? 'وصف المنتج' : 'Product Description'}>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <SvgIcon name="clipboard" className="w-6 h-6" />
                                {tProduct('details')}
                            </h2>
                            <div className="relative">
                                <div
                                    className={`prose prose-lg dark:prose-invert max-w-none transition-all duration-500 overflow-hidden ${isDescriptionExpanded ? 'max-h-none' : 'max-h-72'}`}
                                >
                                    <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(productDesc) }} />
                                </div>

                                {!isDescriptionExpanded && (
                                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent flex items-end justify-center pb-4 cursor-pointer" onClick={() => setIsDescriptionExpanded(true)}>
                                    </div>
                                )}

                                <button
                                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                    className="mt-4 mx-auto block px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-full transition-colors text-sm"
                                >
                                    {isDescriptionExpanded
                                        ? (isRTL ? 'إخفاء التفاصيل' : 'Show Less')
                                        : (isRTL ? 'اقرأ جميع المواصفات الهندسية' : 'Read Full Engineering Specs')
                                    }
                                </button>
                            </div>
                        </section>
                    )}

                    {/* Product specifications */}
                    <section className="p-6 md:p-8" aria-label={isRTL ? 'مواصفات المنتج' : 'Product Specifications'}>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span>📊</span>
                            {tProduct('specifications')}
                        </h2>
                        <table className="w-full text-sm md:text-base">
                            <thead className="sr-only">
                                <tr>
                                    <th>{isRTL ? 'المواصفة' : 'Specification'}</th>
                                    <th>{isRTL ? 'القيمة' : 'Value'}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                <tr>
                                    <td className="py-4 text-gray-500 dark:text-gray-400">{tProduct('brand')}</td>
                                    <td className="py-4 font-bold text-end text-gray-900 dark:text-white">{product.brand}</td>
                                </tr>
                                {product.sku && (
                                    <tr>
                                        <td className="py-4 text-gray-500 dark:text-gray-400">{tProduct('sku')}</td>
                                        <td className="py-4 font-bold font-mono text-end text-gray-900 dark:text-white">{product.sku}</td>
                                    </tr>
                                )}
                                <tr>
                                    <td className="py-4 text-gray-500 dark:text-gray-400">{tProduct('category')}</td>
                                    <td className="py-4 font-bold text-end text-gray-900 dark:text-white">{translatedCategory}</td>
                                </tr>
                                <tr>
                                    <td className="py-4 text-gray-500 dark:text-gray-400">{tProduct('warranty')}</td>
                                    <td className="py-4 font-bold text-end text-gray-900 dark:text-white">{isRTL ? (brand === 'joyroom' ? '12 شهر' : '18 شهر') : (brand === 'joyroom' ? '12 Months' : '18 Months')}</td>
                                </tr>
                                <tr>
                                    <td className="py-4 text-gray-500 dark:text-gray-400">{isRTL ? 'المخزون' : 'Stock'}</td>
                                    <td className={`py-4 font-bold text-end ${(product.stock || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {(product.stock || 0) > 0 ? (isRTL ? 'متوفر' : 'Available') : (isRTL ? 'غير متوفر' : 'Out of Stock')}
                                    </td>
                                </tr>
                                {/* Product-specific specifications */}
                                {productDetail?.specifications && (Object.entries(productDetail.specifications) as [string, { en: string; ar: string }][]).map(([key, val]) => (
                                    <tr key={key}>
                                        <td className="py-4 text-gray-500 dark:text-gray-400">{isRTL ? key : key}</td>
                                        <td className="py-4 font-bold text-end text-gray-900 dark:text-white">{isRTL ? val.ar : val.en}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl font-bold mb-4">
                        {isRTL ? `لماذا تختار ${productName}؟` : `Why Choose ${productName}?`}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        {productShortDesc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {product.meta?.keywords?.split(',').slice(0, 6).map((keyword, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                                {keyword.trim()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Verified Customer Reviews Section */}
            <div className="container mx-auto px-4 py-8">
                <VerifiedReviews productSlug={product.slug} locale={locale} />
            </div>
            {/* Related Products Section */}
            <div className="container mx-auto px-4 pb-8">
                <RelatedProducts products={relatedProducts} locale={locale} />

                {/* Related Categories */}
                <RelatedLinks
                    currentUrl={`/${brandLower}/${categoryLower}`}
                    locale={locale}
                    variant="pill"
                    maxLinks={4}
                />
            </div>

            {/* Mobile Sticky Action Bar — Hidden when Out of Stock */}
            {
                !isOutOfStock && (
                    <div
                        className={`lg:hidden fixed bottom-0 left-0 right-0 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'
                            }`}
                    >
                        <div className="flex gap-3 max-w-full">
                            <div className="flex-1">
                                <span className="block text-xs text-gray-500 dark:text-gray-400">{tProduct('price')}</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-xl font-bold">{product.price.toLocaleString()}</span>
                                    <span className="text-xs">{tCommon('egp')}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                data-add-to-cart
                                className={`flex-1 px-4 py-2 font-bold text-white rounded-lg shadow-lg transition-all duration-200 ${showAddedFeedback
                                    ? 'bg-green-600 scale-95 shadow-green-600/20'
                                    : brand === 'anker'
                                        ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                                        : 'bg-red-600 hover:bg-red-700 shadow-red-600/20'
                                    }`}
                            >
                                {showAddedFeedback ? (isRTL ? '✓ تم' : '✓ Added') : tProduct('addToCart')}
                            </button>

                        </div>
                    </div>
                )
            }

            {/* Spacer for sticky bar - only show when bar is visible and in stock */}
        </div>
    );
}
