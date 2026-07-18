'use client';
import { flushSync } from 'react-dom';
import { trackViewItem, trackAddToCart, trackWhatsappClick } from '@/lib/analytics';
import { ttqViewContent } from '@/lib/tiktokPixel';

import Link from 'next/link';
import { ProductImage } from '@/components/ui/ProductImage';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useCart } from '@/context/CartContext';
import ProductGuarantees from '@/components/products/ProductGuarantees';
import BrandVerification from '@/components/UX/BrandVerification';
import type { AggregateRating, Review } from '@/components/reviews/VerifiedReviews';
import type { RegionalStats } from '@/lib/bosta';
import type { ProductVariant } from '@/lib/static-products';
import {
    getBrandDisplayName,
    localizeArabicFields,
    localizeArabicBrandContent,
    localizeArabicBrandHtml,
    localizeArabicBrandNames,
} from '@/lib/arabic-brand-names';

// Lazy Load Heavy Components
const VerifiedReviews = dynamic(() => import('@/components/reviews/VerifiedReviews'), {
    loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-800 rounded-2xl animate-pulse my-8" />,
});

// Content-bearing sections stay dynamic() for code-splitting but WITHOUT
// ssr:false — their HTML (variant picker, cross-sell links, comparison table,
// expert opinion) now arrives server-rendered, so crawlers see the content and
// slow connections get no pop-in. All of them render purely from props/context
// with zero window/document access at render time.
const RelatedProducts = dynamic(() => import('@/components/products/RelatedProducts'));

const BundleSelector = dynamic(() => import('@/components/products/BundleSelector'), {
    loading: () => <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-2xl animate-pulse my-8" />,
});

const ProductComparisonTable = dynamic(() => import('@/components/content/ProductGuides').then(mod => mod.ProductComparisonTable));
const ExpertOpinion = dynamic(() => import('@/components/content/ProductGuides').then(mod => mod.ExpertOpinion));
const ProductFAQ = dynamic(() => import('@/components/content/ProductGuides').then(mod => mod.ProductFAQ));

// Genuinely browser-only widgets keep ssr:false:
// - BackupTimeCalculator: interactive-only calculator, no content/SEO value in
//   its initial HTML — deferring it entirely is intentional perf.
// - ShareButtons: renders navigator.share-dependent UI (supportsNativeShare),
//   so server HTML could mismatch the client and cause hydration errors.
const BackupTimeCalculator = dynamic(() => import('@/components/UX/BackupTimeCalculator'), {
    ssr: false
});
const VariantSelector = dynamic(() => import('@/components/products/VariantSelector'));
const RelatedLinks = dynamic(() => import('@/components/content/RelatedLinks'));
const ShareButtons = dynamic(() => import('@/components/products/ShareButtons'), { ssr: false });
import { SvgIcon } from '@/components/ui/SvgIcon';
import { sanitizeHtml, localizeInternalLinks } from '@/lib/htmlSanitize';
import { getCairoVoltWarrantyPolicy } from '@/lib/warranty-policy';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
import { getDiscountInfo } from '@/lib/pricing-display';


interface Product {
    id: string; // Add id
    slug: string;
    sku?: string;
    mpn?: string;
    gtin?: string;
    gtin13?: string;
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
    variants?: ProductVariant[];
}

interface ProductPageClientProps {
    product: Product;
    relatedProducts?: Product[];
    bundleData?: {
        bundleProducts: Array<{
            product: Product;
            slot: 'essential' | 'accessory';
            reason: { ar: string; en: string };
        }>;
        bundleDiscount: number;
        fullBundlePrice: number;
        dailyCost: number;
        totalSavings: number;
    };
    locale: string;
    brand: string;
    category: string;
    /** Whether /{brand}/{categorySlug} is a real routed page — when false the
     *  breadcrumb stops at the brand hub instead of linking a 404. */
    categoryRouteExists?: boolean;
    deliveryIntelligence: RegionalStats;
    userGovernorate: string;
    initialReviews: Review[];
    initialAggregateRating: AggregateRating | null;
    productDetail: {
        aiTldr?: { en: string[]; ar: string[] };
        localContext?: { en: string; ar: string };
        specifications?: Record<string, { en: string; ar: string }>;
    } | null;
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

export default function ProductPageClient({ product, relatedProducts = [], bundleData, locale, brand, category, categoryRouteExists = true, deliveryIntelligence, userGovernorate, initialReviews, initialAggregateRating, productDetail }: ProductPageClientProps) {
    const isRTL = locale === 'ar';
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

    // ═══ Variant State ═══
    const defaultVariant = useMemo(() => {
        const variants = product.variants || [];
        const productGtin = product.gtin13 || product.gtin;

        // Keep the initial on-page offer aligned with metadata, Merchant feeds
        // and structured data, even if a stale variant flag is introduced.
        return variants.find((variant) =>
            (product.mpn && variant.mpn === product.mpn)
            || (productGtin && variant.gtin === productGtin)
        )
            || variants.find((variant) => variant.price === product.price)
            || variants.find((variant) => variant.isDefault)
            || variants[0];
    }, [product.variants, product.mpn, product.gtin, product.gtin13, product.price]);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(defaultVariant);
    const warrantyPolicy = getCairoVoltWarrantyPolicy(product.slug, brand);
    const warrantyHref = isRTL ? warrantyPolicy.policyUrl : `/en${warrantyPolicy.policyUrl}`;
    const freeShippingFrom = FREE_SHIPPING_THRESHOLD.toLocaleString('en-US');

    // Active pricing — variant overrides product-level values
    const activePrice = selectedVariant?.price ?? product.price;
    const activeOriginalPrice = selectedVariant?.originalPrice ?? product.originalPrice;
    const activeSku = selectedVariant?.sku ?? product.sku;
    const activeStock = selectedVariant?.stock ?? (product.stock || 0);
    // Display-only pre-discount reference (never affects checkout/feed/schema)
    const discount = getDiscountInfo(activePrice, activeOriginalPrice);

    // Variant-aware product for BundleSelector — overrides price/name with selected variant
    const variantAwareMainProduct = useMemo(() => {
        if (!selectedVariant) return product;
        const variantName = selectedVariant.model;
        return {
            ...product,
            id: `static_${product.slug}_${selectedVariant.id}`,
            sku: selectedVariant.sku,
            price: selectedVariant.price,
            translations: {
                ...product.translations,
                en: {
                    ...product.translations?.en,
                    name: product.translations?.en?.name
                        ? `${product.translations.en.name} (${variantName})`
                        : variantName,
                },
                ar: {
                    ...product.translations?.ar,
                    name: product.translations?.ar?.name
                        ? localizeArabicBrandNames(`${product.translations.ar.name} (${variantName})`)
                        : localizeArabicBrandNames(variantName),
                },
            },
        };
    }, [product, selectedVariant]);

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
            price: activePrice,
            quantity: 1,
        });
        // TikTok Pixel: ViewContent
        ttqViewContent({
            content_id: product.id,
            content_name: product.translations?.[locale as 'ar' | 'en']?.name || product.slug,
            content_type: 'product',
            value: activePrice,
        });
    }, [product.id, product.slug, product.brand, product.categorySlug, activePrice, product.translations, locale]);

    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return locale === 'ar' ? cleanPath : `/${locale}${cleanPath}`;
    };

    const rawCurrentTranslation = product.translations?.[locale as 'ar' | 'en'] || product.translations?.en;
    const localizedTextTranslation = isRTL && rawCurrentTranslation
        ? localizeArabicBrandContent({ ...rawCurrentTranslation, description: '' })
        : rawCurrentTranslation;
    const currentTranslation = isRTL && rawCurrentTranslation
        ? {
            ...localizedTextTranslation,
            description: localizeArabicBrandHtml(rawCurrentTranslation.description || ''),
        }
        : rawCurrentTranslation;
    const productName = currentTranslation?.name || product.slug;
    const productDesc = currentTranslation?.description || '';
    // Parse battery capacity from product detail specs for the BackupTimeCalculator.
    // Handles formats like "24,000mAh (86.4Wh)", "10,000mAh", or "256Wh".
    const parsedCapacity = (() => {
        const capStr = productDetail?.specifications?.['Capacity']?.en ?? '';
        const mahMatch = capStr.replace(/,/g, '').match(/(\d+(?:\.\d+)?)\s*mAh/i);
        const whMatch = capStr.replace(/,/g, '').match(/(\d+(?:\.\d+)?)\s*Wh/i);
        const mah = mahMatch ? parseFloat(mahMatch[1]) : 0;
        const wh = whMatch ? parseFloat(whMatch[1]) : 0;
        return mah > 0 ? { mah, wh: wh || undefined } : null;
    })();

    const handleAddToCart = () => {
        // flushSync forces React to paint the green feedback BEFORE startTransition batches the cart update
        flushSync(() => {
            setShowAddedFeedback(true);
        });
        setTimeout(() => setShowAddedFeedback(false), 1500);

        // Build the cart item name: include variant model if applicable
        const cartItemName = selectedVariant
            ? `${productName} — ${selectedVariant.model} (${selectedVariant.capacity})`
            : productName;

        // Analytics: log add to cart (use active variant pricing)
        trackAddToCart({
            item_id: product.id,
            item_name: cartItemName,
            item_brand: product.brand,
            item_category: product.categorySlug,
            price: activePrice,
            quantity: quantity,
        });

        // Cart update happens in background via useTransition in CartContext
        addToCart({
            productId: selectedVariant ? `${product.id}_${selectedVariant.id}` : product.id,
            sku: activeSku, // 🧬 بصمة القطعة (sku الـvariant إن وُجد وإلا sku المنتج)
            name: cartItemName,
            price: activePrice,
            quantity: quantity,
            image: product.images?.[0]?.url,
            brand: product.brand
        });
    };

    // 📲 Order via WhatsApp — the #1 COD conversion path for hesitant buyers.
    //    Opens wa.me with the exact product/model/price/qty + the page URL pre-filled,
    //    and fires a VALUED generate_lead so Google Analytics records the order intent
    //    (and its EGP value) — a real engagement/conversion signal, not a fake purchase.
    const handleWhatsappOrder = () => {
        const url = typeof window !== 'undefined' ? window.location.href : 'https://cairovolt.com';
        const variantLabel = selectedVariant ? ` — ${selectedVariant.model} (${selectedVariant.capacity})` : '';
        const qtyLabel = quantity > 1 ? ` × ${quantity}` : '';
        const priceStr = activePrice.toLocaleString('en-US');
        const msg = isRTL
            ? `مرحبًا، أريد طلب هذا المنتج:\n${productName}${variantLabel}\nالسعر: ${priceStr} ج.م${qtyLabel}\n${url}`
            : `Hi, I'd like to order this product:\n${productName}${variantLabel}\nPrice: ${priceStr} EGP${qtyLabel}\n${url}`;
        trackWhatsappClick('product', {
            value: activePrice * quantity,
            itemId: activeSku,
            itemName: productName,
        });
        if (typeof window !== 'undefined') {
            window.open(`https://wa.me/201558245974?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
        }
    };

    const images = product.images || [];
    const primaryImage = images[selectedImage]?.url || '';
    // LCP hero: serve the pre-generated static variants directly (FAH's
    // adapter can't drive Next 16's optimizer, so <Image> otherwise paints the
    // raw 1080px master AND a hardcoded /api/img preload fetches a 2nd, unused
    // AVIF copy). `unoptimized` + srcSet collapses that to one right-sized
    // request. Every gallery image has -800 and -480 siblings, so swipes are safe.
    const heroImage800 = primaryImage.replace(/\.webp$/, '-800.webp');
    const heroImage480 = primaryImage.replace(/\.webp$/, '-480.webp');
    const heroSrcSet = `${heroImage480} 480w, ${heroImage800} 800w`;
    const translatedCategory = tCat(categoryKeyMap[category] || 'other');
    const normalizedRouteBrand = brand.toLowerCase();
    const normalizedProductBrand = product.brand.toLowerCase();
    const isSoundcoreBrand = normalizedRouteBrand === 'soundcore' || normalizedProductBrand === 'soundcore';
    const isAnkerBrand = !isSoundcoreBrand && (normalizedRouteBrand === 'anker' || normalizedProductBrand === 'anker');
    const translatedBrandValue = isSoundcoreBrand
        ? tBrand('soundcore')
        : isAnkerBrand
            ? tBrand('anker')
            : tBrand('joyroom');
    const translatedBrand = isRTL
        ? localizeArabicBrandNames(translatedBrandValue)
        : translatedBrandValue;
    const fallbackGradientClass = isSoundcoreBrand
        ? 'from-orange-400 to-pink-600'
        : isAnkerBrand
            ? 'from-blue-400 to-blue-600'
            : 'from-red-400 to-red-600';
    const selectedThumbnailClass = isSoundcoreBrand
        ? 'border-orange-500 shadow-lg ring-2 ring-orange-500/20'
        : isAnkerBrand
            ? 'border-blue-600 shadow-lg ring-2 ring-blue-600/20'
            : 'border-red-600 shadow-lg ring-2 ring-red-600/20';
    const brandBadgeClass = isSoundcoreBrand
        ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
        : isAnkerBrand
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
    const summaryClass = isSoundcoreBrand
        ? 'border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/30'
        : isAnkerBrand
            ? 'border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/30'
            : 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/30';
    const summaryDotClass = isSoundcoreBrand ? 'bg-orange-600' : isAnkerBrand ? 'bg-blue-600' : 'bg-red-600';
    const purchaseButtonClass = isSoundcoreBrand
        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-600/30 hover:scale-[1.02]'
        : isAnkerBrand
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 hover:scale-[1.02]'
            : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30 hover:scale-[1.02]';
    const stickyButtonClass = isSoundcoreBrand
        ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/30'
        : isAnkerBrand
            ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'
            : 'bg-red-600 hover:bg-red-700 shadow-red-600/30';
    const isOutOfStock = activeStock <= 0;

    // Breadcrumb Data - Strict Lowercase URLs
    const brandLower = product.brand.toLowerCase();
    const categoryLower = product.categorySlug.toLowerCase();

    // Display names (Capitalized)
    const brandDisplay = getBrandDisplayName(product.brand, locale);
    // categorySlug is reliable for linking, category param might be mixed case

    // Dynamic Headings for AI Summary
    const hash = typeof product.slug === 'string' ? product.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;

    const arAiHeadings = ['ملخص سريع', 'الخلاصة المختصرة', 'عشان وقتك', 'في السريع كده', 'إجابتك المختصرة', 'ع الماشي'];
    const enAiHeadings = ['Quick Summary', 'TL;DR', 'Fast Facts', 'In a Nutshell', 'For Your Time', 'Bottom Line'];

    const selectedArAiHeading = arAiHeadings[hash % arAiHeadings.length];
    const selectedEnAiHeading = enAiHeadings[hash % enAiHeadings.length];

    return (
        <div className={`min-h-screen pb-20 overflow-x-hidden ${locale === 'ar' ? 'rtl' : 'ltr'}`}>

            {/* Visual Interface Layer */}

            {/* Breadcrumb */}
            <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="text-sm text-gray-600 dark:text-gray-400" aria-label={isRTL ? 'مسار التصفح' : 'Breadcrumb'}>
                        <div className="flex flex-wrap items-center gap-y-1">
                            <Link href={`${locale === 'ar' ? '/' : '/en'}`} className="hover:text-blue-600 transition-colors flex-shrink-0">
                                {locale === 'ar' ? 'الرئيسية' : 'Home'}
                            </Link>
                            <span className="mx-2 text-gray-300 dark:text-gray-600 flex-shrink-0">/</span>
                            <Link href={getLocalizedHref(`/${brandLower}`)} className="hover:text-blue-600 transition-colors flex-shrink-0">
                                {brandDisplay}
                            </Link>
                            {/* Only link the category level when its route exists —
                                unrouted categories (e.g. anker/accessories) would 404. */}
                            {categoryRouteExists && (
                                <>
                                    <span className="mx-2 text-gray-300 dark:text-gray-600 flex-shrink-0">/</span>
                                    <Link href={getLocalizedHref(`/${brandLower}/${categoryLower}`)} className="hover:text-blue-600 transition-colors flex-shrink-0">
                                        {translatedCategory}
                                    </Link>
                                </>
                            )}
                        </div>
                        {/* Product name kept in the breadcrumb for crawlers + screen
                            readers, but visually hidden (sr-only) so it doesn't duplicate
                            the visible <h1> below the gallery. sr-only stays in the DOM /
                            accessibility tree (NOT display:none), so SEO is unaffected. */}
                        <p className="sr-only">
                            {productName}
                        </p>
                    </nav>
                </div>
            </div>

            {/* CategoryOverviewBlock removed — content duplicated by QuickSummary + ShortDescription above */}

            {/* Product Section */}
            <div className="container mx-auto px-3 sm:px-4 py-4 md:py-8 max-w-full">
                <article className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 max-w-full min-w-0">
                    {/* Product Images */}
                    <div className="space-y-4 max-w-full min-w-0">
                        {/* Main Image */}
                        <div
                            className="relative aspect-square mx-auto w-full bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg"
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
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-black/60 text-white text-sm rounded-full" style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}>
                                    {`${selectedImage + 1} / ${images.length}`}
                                </div>
                            )}

                            {/* Product Image — full-bleed, fills container edge-to-edge */}
                            <div className="w-full h-full relative">
                                {primaryImage ? (
                                    <ProductImage
                                        src={heroImage800}
                                        srcSet={heroSrcSet}
                                        alt={productName}
                                        slug={product.slug}
                                        brand={product.brand}
                                        category={product.categorySlug || category}
                                        fill
                                        priority
                                        unoptimized
                                        sizes="(max-width: 640px) 480px, 800px"
                                        imageClassName="object-cover transition-transform hover:scale-105"
                                        isPrimary
                                        locale={locale}
                                    />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center text-8xl font-bold bg-gradient-to-br ${fallbackGradientClass} bg-clip-text text-transparent`}>
                                        {brand.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        {images.length > 1 && (
                            <div
                                className="flex flex-nowrap gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory -mx-1 px-1"
                                style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
                            >
                                {images.map((img, idx) => {
                                    // Use pre-generated 128px thumbnail for gallery strips
                                    // (Firebase App Hosting lacks /_next/image optimizer)
                                    const thumbUrl = img.url.replace(/\.webp$/, '-thumb.webp');
                                    return (
                                    <button
                                        key={idx}
                                        aria-label={`View image ${idx + 1}`}
                                        title={`View image ${idx + 1}`}
                                        onClick={() => { setSelectedImage(idx); }}
                                        className={`relative flex-none w-16 sm:w-20 aspect-square rounded-xl border-2 overflow-hidden transition-all snap-start bg-white ${selectedImage === idx
                                            ? selectedThumbnailClass
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <ProductImage
                                            src={thumbUrl}
                                            alt={img.alt || productName}
                                            slug={product.slug}
                                            brand={product.brand}
                                            category={product.categorySlug || category}
                                            fill
                                            loading="lazy"
                                            sizes="80px"
                                            imageClassName="object-cover"
                                            locale={locale}
                                            lightweight
                                        />
                                    </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6 max-w-full min-w-0">

                        {/* QuickSummary removed — duplicated H1 + Brand Badge + Price Block */}

                        {/* Brand & Stock */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-4 py-1.5 text-sm font-bold rounded-full ${brandBadgeClass}`}>
                                {translatedBrand}
                            </span>
                            {/* Availability Badge - Dynamic Brand (variant-aware: follows the selected variant's stock) */}
                            {!isOutOfStock ? (
                                <span className={`px-4 py-1.5 text-sm font-medium rounded-full flex items-center gap-2 ${brandBadgeClass}`}>
                                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                    {brandDisplay} — {tProduct('inStock')}
                                </span>
                            ) : (
                                <span className="px-4 py-1.5 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                                    {tProduct('outOfStock')}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                            {productName}
                        </h1>

                        {/* Verified rating summary — same purchase-verified data as the reviews section; hidden when there are no reviews */}
                        {initialAggregateRating && initialAggregateRating.reviewCount > 0 && (
                            <a
                                href="#reviews"
                                className="inline-flex items-center gap-2 w-fit text-sm text-gray-700 dark:text-gray-300 hover:underline"
                                aria-label={isRTL
                                    ? `التقييم ${initialAggregateRating.ratingValue} من 5 — ${initialAggregateRating.reviewCount} تقييم من عملاء موثقين، انتقل إلى قسم التقييمات`
                                    : `Rated ${initialAggregateRating.ratingValue} out of 5 from ${initialAggregateRating.reviewCount} verified customer ${initialAggregateRating.reviewCount === 1 ? 'review' : 'reviews'}, jump to the reviews section`}
                            >
                                <span className="flex gap-0.5" aria-hidden="true">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span
                                            key={star}
                                            className={`text-base leading-none ${star <= parseFloat(initialAggregateRating.ratingValue) ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </span>
                                <span className="font-bold text-gray-900 dark:text-white" aria-hidden="true">
                                    {initialAggregateRating.ratingValue}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400" aria-hidden="true">
                                    {isRTL
                                        ? `(${initialAggregateRating.reviewCount} تقييم)`
                                        : `(${initialAggregateRating.reviewCount} ${initialAggregateRating.reviewCount === 1 ? 'review' : 'reviews'})`}
                                </span>
                            </a>
                        )}

                        {!initialAggregateRating && initialReviews.length > 0 && (
                            <a
                                href="#reviews"
                                className="inline-flex items-center gap-2 w-fit text-sm text-gray-700 dark:text-gray-300 hover:underline"
                                aria-label={isRTL
                                    ? `عرض ${initialReviews.length} تقييم فردي موثق للمنتج`
                                    : `View ${initialReviews.length} verified individual product ${initialReviews.length === 1 ? 'review' : 'reviews'}`}
                            >
                                <SvgIcon name="check-circle" className="w-4 h-4 text-green-600" />
                                <span>
                                    {isRTL
                                        ? `${initialReviews.length} ${initialReviews.length === 1 ? 'تقييم فردي موثق' : 'تقييمات فردية موثقة'}`
                                        : `${initialReviews.length} verified individual ${initialReviews.length === 1 ? 'review' : 'reviews'}`}
                                </span>
                            </a>
                        )}

                        {/* Short Description removed — already displayed inside QuickSummary above */}

                        {/* AI TL;DR */}
                        {productDetail?.aiTldr && (
                            <div className={`p-4 rounded-xl border-2 ${summaryClass}`}>
                                <h2 className="text-sm font-bold mb-2 flex items-center gap-1.5 text-gray-800 dark:text-gray-200">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    {isRTL ? selectedArAiHeading : selectedEnAiHeading}
                                </h2>
                                <ul className="space-y-1">
                                    {(isRTL ? productDetail.aiTldr.ar : productDetail.aiTldr.en).map((point: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${summaryDotClass}`} />
                                            {isRTL ? localizeArabicBrandNames(point) : point}
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
                                    {isRTL ? localizeArabicBrandNames(productDetail.localContext.ar) : productDetail.localContext.en}
                                </p>
                            </div>
                        )}

                        {/* ═══ Product Variant Selector ═══ */}
                        {product.variants && product.variants.length > 1 && (
                            <VariantSelector
                                variants={product.variants}
                                selectedVariantId={selectedVariant?.id || product.variants[0].id}
                                onSelect={setSelectedVariant}
                                locale={locale}
                                brandColor={isAnkerBrand || isSoundcoreBrand ? 'blue' : 'red'}
                            />
                        )}

                        {/* Price */}
                        <div className="py-3 md:py-4 border-y border-gray-100 dark:border-gray-800">
                            <div className="flex flex-wrap items-end gap-2 md:gap-3">
                                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white transition-all duration-300">
                                    {activePrice.toLocaleString('en-US')}
                                </span>
                                <span className="text-base md:text-xl text-gray-600 dark:text-gray-300 mb-0.5 md:mb-1">
                                    {tCommon('egp')}
                                </span>
                                {discount.hasDiscount && (
                                    <span className="mb-1 inline-flex items-center rounded-full bg-red-600 px-2.5 py-1 text-sm font-extrabold text-white shadow-sm">
                                        {isRTL ? `خصم ${discount.percent}%` : `${discount.percent}% OFF`}
                                    </span>
                                )}
                            </div>
                            {discount.hasDiscount && activeOriginalPrice != null && (
                                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm md:text-base">
                                    <span className="text-gray-400 dark:text-gray-500 line-through">
                                        {activeOriginalPrice.toLocaleString('en-US')} {tCommon('egp')}
                                    </span>
                                    <span className="font-bold text-green-700 dark:text-green-400">
                                        {isRTL
                                            ? `وفّر ${discount.save.toLocaleString('en-US')} ${tCommon('egp')}`
                                            : `Save ${discount.save.toLocaleString('en-US')} ${tCommon('egp')}`}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Trust row — COD, delivery estimate and shipping policy (published policy, estimate-only wording) */}
                        <div className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300 -mt-2">
                            {deliveryIntelligence.cash_on_delivery && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 font-bold text-green-700 dark:text-green-400">
                                    <span aria-hidden="true">💵</span>
                                    {isRTL
                                        ? 'الدفع عند الاستلام متاح للطلبات المؤهلة'
                                        : 'Cash on delivery is available for eligible orders'}
                                </span>
                            )}
                            <p className="flex items-center gap-1.5">
                                <span aria-hidden="true">🗓️</span>
                                {isRTL
                                    ? `التوصيل إلى ${userGovernorate}: ${deliveryIntelligence.delivery_estimate}`
                                    : `Delivery to ${userGovernorate}: ${deliveryIntelligence.delivery_estimate}`}
                            </p>
                            <p className="flex items-center gap-1.5">
                                <span aria-hidden="true">🚚</span>
                                <a href="#shipping-information" className="hover:underline">
                                    {isRTL
                                        ? `الشحن مجاني للطلبات من ${freeShippingFrom} جنيه فأكثر — رسوم الشحن تبدأ من 70 جنيهاً وفق سياسة الشحن`
                                        : `Free shipping on orders of ${freeShippingFrom} EGP or more — shipping fees start from 70 EGP under the shipping policy`}
                                </a>
                            </p>
                        </div>

                        {/* Purchase CTAs — Hidden when Out of Stock */}
                        {!isOutOfStock ? (
                            <>
                                {/* Quantity + Add to Cart + WhatsApp — one row; Add-to-Cart takes the most space */}
                                <div className="flex flex-row items-stretch gap-2 sm:gap-3">
                                    <div className="flex flex-shrink-0 items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                                        <button
                                            onClick={() => { const nq = Math.max(1, quantity - 1); setQuantity(nq); }}
                                            className="px-2.5 sm:px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-lg"
                                            aria-label={isRTL ? 'تقليل الكمية' : 'Decrease quantity'}
                                        >
                                            −
                                        </button>
                                        <span className="px-2 sm:px-5 py-3 font-bold text-lg min-w-[1.75rem] sm:min-w-[3rem] text-center">{quantity}</span>
                                        <button
                                            onClick={() => { const nq = quantity + 1; setQuantity(nq); }}
                                            className="px-2.5 sm:px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-lg"
                                            aria-label={isRTL ? 'زيادة الكمية' : 'Increase quantity'}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        ref={addToCartButtonRef}
                                        onClick={handleAddToCart}
                                        data-add-to-cart
                                        className={`flex-1 min-w-0 px-3 sm:px-6 py-3 font-bold text-sm sm:text-lg rounded-xl transition-all duration-200 transform shadow-lg ${showAddedFeedback
                                            ? 'bg-green-600 scale-95 text-white shadow-green-600/30'
                                            : purchaseButtonClass
                                            }`}
                                    >
                                        {showAddedFeedback
                                            ? <><SvgIcon name="cart" className="w-5 h-5 inline-block" /> ✓ {isRTL ? 'تم الإضافة' : 'Added!'}</>
                                            : <><SvgIcon name="cart" className="w-5 h-5 inline-block" /> {tProduct('addToCart')}</>}
                                    </button>
                                    {/* Order via WhatsApp — reassurance path for hesitant COD buyers */}
                                    <button
                                        type="button"
                                        onClick={handleWhatsappOrder}
                                        className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 font-bold text-sm sm:text-lg rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/25 transition-all"
                                        aria-label={isRTL ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}
                                    >
                                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                        <span className="hidden md:inline whitespace-nowrap">{isRTL ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}</span>
                                    </button>
                                </div>


                                {/* Share Buttons */}
                                <div className="mt-3">
                                    <ShareButtons
                                        slug={product.slug}
                                        productName={productName}
                                        price={activePrice}
                                        locale={locale}
                                    />
                                </div>

                                {/* Bundle Selector Component */}
                                <div className="mt-8">
                                    <BundleSelector
                                        key={selectedVariant?.id || 'default'}
                                        mainProduct={variantAwareMainProduct}
                                        relatedProducts={relatedProducts}
                                        bundleData={bundleData}
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
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
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

                        {/* Quality Badges removed — trust signals already covered by ProductGuarantees Trust Matrix below */}
                    </div>
                </article>
            </div>

            {/* Product Details */}
            <div className="container mx-auto px-3 sm:px-4 py-8 md:py-12">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-lg max-w-full">
                    {/* Features section removed — same data already in Description (narrative) + Specifications (table) */}

                    {/* Warranty-record lookup — placed right before shipping & payment info */}
                    <div className="px-2 pt-6 md:px-4 md:pt-8">
                        <BrandVerification brand={product.brand} locale={locale} />
                    </div>

                    {/* Delivery, warranty and returns */}
                    <section className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
                        <ProductGuarantees
                            sku={product.slug}
                            userGovernorate={userGovernorate}
                            locale={locale}
                            deliveryStats={deliveryIntelligence}
                        />
                    </section>

                    {/* Editorial guidance, FAQs and comparison */}
                    <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800 cv-auto">
                        {/* Expert Opinion */}
                        <ExpertOpinion
                            productName={productName}
                            brand={translatedBrand}
                            category={category}
                            locale={locale}
                            customOpinion={isRTL
                                ? localizeArabicBrandNames(product.expertOpinion?.ar || '')
                                : product.expertOpinion?.en}
                        />

                        {/* BackupTimeCalculator — only for power bank products with parseable capacity */}
                        {category === 'power-banks' && parsedCapacity && (
                            <div className="border-t border-gray-100 dark:border-gray-800 my-6 pt-6">
                                <BackupTimeCalculator
                                    locale={locale}
                                    productName={productName}
                                    batteryCapacityMah={parsedCapacity.mah}
                                    batteryWh={parsedCapacity.wh}
                                />
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
                                price: activePrice,
                                translations: {
                                    en: { name: product.translations?.en?.name || product.slug },
                                    ar: { name: localizeArabicBrandNames(product.translations?.ar?.name || product.slug) }
                                }
                            }}
                            locale={locale}
                        />
                    </div>

                    {/* Description Section - Progressive Disclosure Pattern */}
                    {productDesc && (
                        <section className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800 cv-auto" aria-label={isRTL ? 'وصف المنتج' : 'Product Description'}>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <SvgIcon name="clipboard" className="w-6 h-6" />
                                {tProduct('details')}
                            </h2>
                            <div className="relative">
                                <div
                                    className={`prose prose-lg dark:prose-invert max-w-none transition-all duration-500 overflow-hidden ${isDescriptionExpanded ? 'max-h-none' : 'max-h-72'}`}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: isRTL
                                                ? localizeArabicBrandHtml(localizeInternalLinks(sanitizeHtml(productDesc), locale))
                                                : localizeInternalLinks(sanitizeHtml(productDesc), locale),
                                        }}
                                    />
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
                        <table className="w-full text-sm md:text-base table-fixed">
                            <colgroup>
                                <col className="w-[40%]" />
                                <col className="w-[60%]" />
                            </colgroup>
                            <thead className="sr-only">
                                <tr>
                                    <th>{isRTL ? 'المواصفة' : 'Specification'}</th>
                                    <th>{isRTL ? 'القيمة' : 'Value'}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                <tr>
                                    <td className="py-4 text-gray-600 dark:text-gray-400">{tProduct('brand')}</td>
                                    <td className="py-4 font-bold text-end text-gray-900 dark:text-white">{brandDisplay}</td>
                                </tr>
                                {activeSku && (
                                    <tr>
                                        <td className="py-4 text-gray-600 dark:text-gray-400">{tProduct('sku')}</td>
                                        <td className="py-4 font-bold font-mono text-end text-gray-900 dark:text-white">{activeSku}</td>
                                    </tr>
                                )}
                                <tr>
                                    <td className="py-4 text-gray-600 dark:text-gray-400">{tProduct('category')}</td>
                                    <td className="py-4 font-bold text-end text-gray-900 dark:text-white">{translatedCategory}</td>
                                </tr>
                                <tr>
                                    <td className="py-4 text-gray-600 dark:text-gray-400">
                                        {isRTL ? 'ضمان كايرو فولت' : 'CairoVolt warranty'}
                                    </td>
                                    <td className="py-4 font-bold text-end text-gray-900 dark:text-white">
                                        {warrantyPolicy.months ? (
                                            <>
                                                {isRTL ? `${warrantyPolicy.months} شهرًا — ` : `${warrantyPolicy.months} months — `}
                                                <Link href={warrantyHref} className="text-blue-600 dark:text-blue-400 hover:underline">
                                                    {isRTL ? 'راجع الشروط' : 'see terms'}
                                                </Link>
                                            </>
                                        ) : (
                                            <Link href={warrantyHref} className="text-blue-600 dark:text-blue-400 hover:underline">
                                                {isRTL ? 'راجع الشروط المكتوبة للمنتج' : 'See the written product terms'}
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-4 text-gray-600 dark:text-gray-400">{isRTL ? 'المخزون' : 'Stock'}</td>
                                    <td className={`py-4 font-bold text-end ${!isOutOfStock ? 'text-green-600' : 'text-red-600'}`}>
                                        {!isOutOfStock ? (isRTL ? 'متوفر' : 'Available') : (isRTL ? 'غير متوفر' : 'Out of Stock')}
                                    </td>
                                </tr>
                                {/* Product-specific specifications */}
                                {productDetail?.specifications && (Object.entries(
                                    isRTL ? localizeArabicFields(productDetail.specifications) : productDetail.specifications,
                                ) as [string, { en: string; ar: string }][]).map(([key, val]) => (
                                    <tr key={key}>
                                        <td className="py-4 text-gray-600 dark:text-gray-400">{isRTL ? localizeArabicBrandNames(key) : key}</td>
                                        <td className="py-4 font-bold text-end text-gray-900 dark:text-white">{isRTL ? localizeArabicBrandNames(val.ar) : val.en}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>

            {/* "Why Choose" section removed — shortDescription already shown above + keyword pills = potential stuffing */}

            {/* Verified Customer Reviews Section */}
            <div id="reviews" className="container mx-auto px-4 py-8 cv-auto scroll-mt-24">
                <VerifiedReviews
                    locale={locale}
                    initialReviews={initialReviews}
                    initialAggregateRating={initialAggregateRating}
                    productSlug={product.slug}
                    productName={isRTL ? (product.translations?.ar?.name || product.slug) : (product.translations?.en?.name || product.slug)}
                />
            </div>
            {/* Related Products Section */}
            <div className="container mx-auto px-4 pb-8 cv-auto">
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
                        className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
                    >
                        <div className="sticky-footer-bar bg-zinc-900 border-t-2 border-zinc-700 shadow-[0_-8px_25px_rgba(0,0,0,0.3)] px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]" style={{ backgroundColor: '#18181b' }}>
                            {/* COD chip — same published-policy wording as the trust row */}
                            {deliveryIntelligence.cash_on_delivery && (
                                <p className="text-[11px] font-medium mb-1.5 text-zinc-300" style={{ color: '#d4d4d8' }}>
                                    <span aria-hidden="true">💵</span>{' '}
                                    {isRTL
                                        ? 'الدفع عند الاستلام متاح للطلبات المؤهلة'
                                        : 'Cash on delivery is available for eligible orders'}
                                </p>
                            )}
                            <div className="flex items-center gap-3">
                                {/* Price Section — forced white text on dark bg for guaranteed visibility */}
                                <div className="flex-shrink-0 min-w-[90px]">
                                    <span className="sticky-label block text-[11px] font-medium mb-0.5 text-zinc-400" style={{ color: '#a1a1aa' }}>{tProduct('price')}</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="sticky-price text-xl font-black text-white" style={{ color: '#ffffff' }}>{activePrice.toLocaleString('en-US')}</span>
                                        <span className="sticky-label text-xs font-medium text-zinc-400" style={{ color: '#a1a1aa' }}>{tCommon('egp')}</span>
                                        {discount.hasDiscount && (
                                            <span className="rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-extrabold text-white">
                                                -{discount.percent}%
                                            </span>
                                        )}
                                    </div>
                                    {discount.hasDiscount && activeOriginalPrice != null && (
                                        <span className="block text-[11px] font-medium text-zinc-500 line-through" style={{ color: '#a1a1aa' }}>
                                            {activeOriginalPrice.toLocaleString('en-US')} {tCommon('egp')}
                                        </span>
                                    )}
                                </div>
                                {/* CTA Button */}
                                <button
                                    onClick={handleAddToCart}
                                    data-add-to-cart
                                    className={`flex-1 px-4 py-3.5 font-bold text-white rounded-xl shadow-lg transition-all duration-200 text-base ${showAddedFeedback
                                        ? 'bg-green-600 scale-95 shadow-green-600/30'
                                        : stickyButtonClass
                                        }`}
                                >
                                    {showAddedFeedback ? (isRTL ? '✓ تم' : '✓ Added') : tProduct('addToCart')}
                                </button>
                                {/* Order via WhatsApp — compact, always reachable while scrolling */}
                                <button
                                    type="button"
                                    onClick={handleWhatsappOrder}
                                    className="flex-shrink-0 inline-flex items-center justify-center w-14 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all"
                                    aria-label={isRTL ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Spacer for sticky bar - only show when bar is visible and in stock */}
            {!isOutOfStock && <div className="lg:hidden h-24" />}
        </div>
    );
}
