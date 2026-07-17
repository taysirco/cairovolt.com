"use client";

import { ProductImage } from '@/components/ui/ProductImage';
import { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
import { BUNDLE_DISCOUNT_PERCENT } from '@/lib/bundle-policy';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';

// We need a shared interface for products passed from server
interface Product {
    id: string;
    slug: string;
    sku?: string; // 🧬 بصمة المنتج — تُمرَّر للسلة كي يبصم الـCRM الكومبو قطعياً
    brand: string;
    categorySlug: string;
    price: number;
    originalPrice?: number;
    images?: Array<{ url: string; alt?: string; isPrimary?: boolean }>;
    translations?: {
        en?: { name?: string };
        ar?: { name?: string };
    };
}

interface BundleProductData {
    product: Product;
    slot: 'essential' | 'accessory';
    reason: { ar: string; en: string };
}

interface BundleData {
    bundleProducts: BundleProductData[];
    bundleDiscount: number;
    fullBundlePrice: number;
    dailyCost: number;
    totalSavings: number;
}

interface BundleSelectorProps {
    mainProduct: Product;
    relatedProducts: Product[];
    bundleData?: BundleData;
    locale: string;
}

export default function BundleSelector({ mainProduct, relatedProducts, bundleData, locale }: BundleSelectorProps) {
    const { addToCart, addBundleToCart, items: cartItems } = useCart();
    const isArabic = locale === 'ar';
    const displayText = (text: string) => isArabic ? localizeArabicBrandNames(text) : text;

    // Use smart bundle data if available, otherwise fall back to relatedProducts
    const smartBundleItems: BundleProductData[] = useMemo(() => {
        if (bundleData && bundleData.bundleProducts.length > 0) {
            return bundleData.bundleProducts;
        }
        // Fallback: wrap relatedProducts without reasons
        return relatedProducts.slice(0, 2).map(p => ({
            product: p,
            slot: 'accessory' as const,
            reason: { ar: '', en: '' },
        }));
    }, [bundleData, relatedProducts]);

    // State to track selected products in the bundle (initially all selected)
    const [selectedIds, setSelectedIds] = useState<string[]>([
        mainProduct.slug,
        ...smartBundleItems.map(bp => bp.product.slug)
    ]);

    // All products in order: main first, then smart bundle items
    const allProducts = useMemo(() => {
        return [
            { product: mainProduct, slot: 'main' as const, reason: { ar: '', en: '' } },
            ...smartBundleItems,
        ];
    }, [mainProduct, smartBundleItems]);

    // Derived state for selected products
    const selectedProducts = useMemo(() => {
        return allProducts.filter(item => selectedIds.includes(item.product.slug));
    }, [allProducts, selectedIds]);

    // Calculate totals from the current catalogue prices. The only displayed
    // saving is the bundle discount that the server also applies at checkout.
    const pricing = useMemo(() => {
        const selectedPrices = selectedProducts.map(item => item.product);
        const totalPrice = selectedPrices.reduce((sum, p) => sum + p.price, 0);

        // Only apply bundle discount if all items selected (complete combo)
        const isFullBundle = selectedProducts.length === allProducts.length && allProducts.length > 1;
        const bundleDiscount = isFullBundle
            ? Math.round(totalPrice * BUNDLE_DISCOUNT_PERCENT / 100)
            : 0;
        const finalPrice = totalPrice - bundleDiscount;
        const totalSavings = bundleDiscount;

        // Daily cost (psychological pricing)
        const dailyCost = Math.round((finalPrice / 365) * 10) / 10;

        // Free-shipping incentive (honest: tied to the real 3,700 EGP threshold)
        const freeShipping = finalPrice >= FREE_SHIPPING_THRESHOLD;
        const unlocksFreeShipping = freeShipping && mainProduct.price < FREE_SHIPPING_THRESHOLD;
        const amountToFreeShipping = freeShipping ? 0 : FREE_SHIPPING_THRESHOLD - finalPrice;

        return { totalPrice, bundleDiscount, finalPrice, totalSavings, dailyCost, isFullBundle, freeShipping, unlocksFreeShipping, amountToFreeShipping };
    }, [selectedProducts, allProducts, mainProduct.price]);

    // Handlers
    const toggleProduct = (id: string) => {
        if (id === mainProduct.slug) return; // Cannot deselect main product
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleAddBundle = () => {
        const toCartItem = (item: typeof selectedProducts[number]) => {
            const t = item.product.translations?.[isArabic ? 'ar' : 'en'] || item.product.translations?.en;
            return {
                productId: item.product.id,
                sku: item.product.sku, // 🧬 بصمة قطعة الكومبو
                name: displayText(t?.name || item.product.slug),
                price: item.product.price,
                quantity: 1,
                image: item.product.images?.[0]?.url,
                brand: item.product.brand,
            };
        };
        const bundleItems = selectedProducts.map(toCartItem);
        // 🏆 كومبو كامل (≥2 منتجات مختارة) → وسمه بـbundleId فيسري خصم الـ5% خادمياً،
        //    مطابقاً للإجمالي المخفّض المعروض. الخصم يُحسب من أسعار الكتالوج على الخادم.
        if (pricing.isFullBundle && bundleItems.length >= 2) {
            addBundleToCart(bundleItems, `combo-static_${mainProduct.slug}`);
        } else {
            // اختيار جزئي — بلا خصم كومبو (مطابقة للعرض): أضف الناقص فقط بلا وسم.
            bundleItems.forEach(bi => {
                if (!cartItems.some(ci => ci.productId === bi.productId)) addToCart(bi);
            });
        }
    };

    if (smartBundleItems.length === 0) return null;

    // Slot label helper
    const getSlotBadge = (slot: string) => {
        if (slot === 'main') return null;
        if (slot === 'essential') {
            return {
                text: isArabic ? 'مطلوب معاه' : 'Essential',
                className: 'bg-blue-600 text-white',
            };
        }
        return {
            text: isArabic ? 'إكسسوار مفيد' : 'Great Add-on',
            className: 'bg-purple-500 text-white',
        };
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-3 sm:p-4 my-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg relative z-10 w-full max-w-full box-border">
            {/* Header */}
            <h3 className="text-base font-bold mb-1 text-gray-900 dark:text-white text-center">
                {isArabic ? '🏆 الكومبو الذهبي — كمّل تجربتك' : '🏆 Golden Combo — Complete Your Setup'}
            </h3>
            {pricing.bundleDiscount > 0 && (
                <p className="text-center text-sm text-green-600 dark:text-green-400 font-semibold mb-1">
                    {isArabic
                        ? `خصم ${pricing.bundleDiscount.toLocaleString('en-US')} ج.م لما تاخدهم مع بعض`
                        : `Save ${pricing.bundleDiscount.toLocaleString('en-US')} EGP when bought together`}
                </p>
            )}
            {pricing.unlocksFreeShipping ? (
                <p className="text-center text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-4">
                    {isArabic
                        ? '🚚 الكومبو ده بيفتحلك الشحن المجاني (بدل 70–130 ج.م)'
                        : '🚚 This combo unlocks FREE shipping (worth 70–130 EGP)'}
                </p>
            ) : pricing.freeShipping ? (
                <p className="text-center text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-4">
                    {isArabic ? '🚚 شحن مجاني لحد باب البيت' : '🚚 Free shipping to your door'}
                </p>
            ) : (
                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                    {isArabic
                        ? `🚚 باقي ${pricing.amountToFreeShipping.toLocaleString('en-US')} ج.م بس على الشحن المجاني`
                        : `🚚 Only ${pricing.amountToFreeShipping.toLocaleString('en-US')} EGP away from free shipping`}
                </p>
            )}

            {/* Mobile Layout: Horizontal Scroll Cards */}
            <div className="block lg:hidden w-full">
                {/* Scrollable Product Cards */}
                <div
                    className="flex overflow-x-auto gap-2 sm:gap-3 pb-4 snap-x snap-mandatory scrollbar-hide -mx-1 px-1"
                    style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
                >
                    {allProducts.map((item) => {
                        const isSelected = selectedIds.includes(item.product.slug);
                        const isMain = item.product.slug === mainProduct.slug;
                        const t = item.product.translations?.[isArabic ? 'ar' : 'en'] || item.product.translations?.en;
                        const productName = displayText(t?.name || item.product.slug);
                        const reasonText = displayText(item.reason[isArabic ? 'ar' : 'en'] || '');
                        const badge = getSlotBadge(item.slot);

                        return (
                            <button
                                key={item.product.id}
                                onClick={() => toggleProduct(item.product.slug)}
                                disabled={isMain}
                                className={`relative flex-shrink-0 w-[calc(50%-8px)] min-w-[130px] max-w-[180px] sm:w-[160px] rounded-2xl border-2 p-2.5 sm:p-3 bg-white dark:bg-gray-800 transition-all duration-300 snap-center
                                    ${isSelected
                                        ? 'border-green-600 shadow-lg shadow-green-600/20'
                                        : 'border-gray-200 dark:border-gray-700 opacity-60'
                                    }
                                    ${!isMain ? 'active:scale-95 cursor-pointer' : 'cursor-default'}`}
                            >
                                {/* Selection Badge */}
                                <div className={`absolute top-2 ${isArabic ? 'left-2' : 'right-2'} w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all z-10
                                    ${isSelected
                                        ? 'bg-green-500 text-white shadow-md'
                                        : 'bg-gray-200 dark:bg-gray-600 text-gray-400'
                                    }`}
                                >
                                    {isSelected ? '✓' : ''}
                                </div>

                                {/* Slot Badge */}
                                {isMain ? (
                                    <div className={`absolute top-2 ${isArabic ? 'right-2' : 'left-2'} px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full z-10`}>
                                        {isArabic ? 'رئيسي' : 'Main'}
                                    </div>
                                ) : badge && (
                                    <div className={`absolute top-2 ${isArabic ? 'right-2' : 'left-2'} px-2 py-0.5 ${badge.className} text-[10px] font-bold rounded-full z-10`}>
                                        {badge.text}
                                    </div>
                                )}

                                {/* Product Image */}
                                <div className="relative w-full aspect-square mb-3 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden">
                                    {item.product.images?.[0]?.url && (
                                        <ProductImage
                                            src={item.product.images[0].url}
                                            alt={productName}
                                            slug={item.product.slug}
                                            brand={item.product.brand}
                                            category={item.product.categorySlug}
                                            fill
                                            sizes="(max-width: 768px) 120px, 160px"
                                            imageClassName="object-cover"
                                            locale={locale}
                                            lightweight
                                        />
                                    )}
                                </div>

                                {/* Product Name */}
                                <p className={`text-sm font-medium leading-tight mb-1 line-clamp-2 h-10 text-start ${isSelected ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 line-through'}`}>
                                    {productName}
                                </p>

                                {/* Reason Text */}
                                {!isMain && reasonText && (
                                    <p className="text-[10px] text-orange-700 dark:text-orange-400 font-medium mb-1 line-clamp-1 text-start">
                                        💡 {reasonText}
                                    </p>
                                )}

                                {/* Price */}
                                <div className={`text-start ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                                    <span className="text-lg font-bold">{item.product.price.toLocaleString('en-US')}</span>
                                    <span className="text-xs ms-1">{isArabic ? 'ج.م' : 'EGP'}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Scroll Indicator Dots */}
                <div className="flex justify-center gap-1.5 mb-4">
                    {allProducts.map((_, idx) => (
                        <div
                            key={idx}
                            className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"
                        />
                    ))}
                </div>

                {/* Total & CTA - More Prominent */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl p-5 border-2 border-yellow-300 dark:border-yellow-700 shadow-lg">
                    {/* Summary Row */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <SvgIcon name="cart" className="w-6 h-6" />
                            <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                                {isArabic ? `${selectedProducts.length} منتجات` : `${selectedProducts.length} items`}
                            </span>
                        </div>
                        {pricing.totalSavings > 0 && (
                            <span className="text-sm font-bold text-green-600 bg-green-100 dark:bg-green-900/50 px-3 py-1.5 rounded-full animate-pulse">
                                {isArabic ? `وفر ${pricing.totalSavings.toLocaleString('en-US')} ج.م` : `Save ${pricing.totalSavings.toLocaleString('en-US')} EGP`}
                            </span>
                        )}
                    </div>

                    {/* Bundle Discount Badge */}
                    {pricing.isFullBundle && pricing.bundleDiscount > 0 && (
                        <div className="text-center mb-3 py-2 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800">
                            <span className="text-sm font-bold text-green-700 dark:text-green-300">
                                🎁 {isArabic
                                    ? `خصم الكومبو: ${pricing.bundleDiscount.toLocaleString('en-US')} ج.م`
                                    : `Combo Discount: ${pricing.bundleDiscount.toLocaleString('en-US')} EGP`}
                            </span>
                        </div>
                    )}

                    {/* Total Price */}
                    <div className="text-center mb-2 py-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {isArabic ? 'الإجمالي' : 'Total'}
                        </div>
                        {pricing.bundleDiscount > 0 && (
                            <span className="text-lg text-gray-400 line-through me-2">
                                {pricing.totalPrice.toLocaleString('en-US')}
                            </span>
                        )}
                        <span className="text-4xl font-black text-gray-900 dark:text-white">
                            {pricing.finalPrice.toLocaleString('en-US')}
                        </span>
                        <span className="text-lg text-gray-500 ms-2">{isArabic ? 'ج.م' : 'EGP'}</span>
                    </div>

                    {/* Daily Cost — Psychological Pricing */}
                    {pricing.isFullBundle && pricing.dailyCost > 0 && (
                        <p className="text-center text-xs text-gray-600 dark:text-gray-400 mb-4">
                            {isArabic
                                ? `💡 يعني بس ${pricing.dailyCost} ج.م في اليوم لمدة سنة`
                                : `💡 That's only ${pricing.dailyCost} EGP/day for a full year`}
                        </p>
                    )}

                    {/* CTA Button */}
                    <button
                        onClick={handleAddBundle}
                        disabled={selectedProducts.length === 0}
                        data-add-to-cart
                        className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 hover:from-yellow-500 hover:via-yellow-600 hover:to-orange-600 text-black font-black py-4 rounded-xl shadow-xl shadow-yellow-500/30 transition-all active:scale-[0.98] text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <SvgIcon name="cart" className="w-5 h-5" />
                        {pricing.totalSavings > 0
                            ? (isArabic
                                ? `أضف الكومبو ووفر ${pricing.totalSavings.toLocaleString('en-US')} ج.م${pricing.freeShipping ? ' + شحن مجاني' : ''}`
                                : `Add Combo & Save ${pricing.totalSavings.toLocaleString('en-US')} EGP${pricing.freeShipping ? ' + Free Shipping' : ''}`)
                            : (isArabic ? 'إضافة الكل للسلة' : 'Add All to Cart')
                        }
                    </button>
                </div>
            </div>

            {/* Desktop Layout - Professional Grid */}
            <div className="hidden lg:block">
                {/* Products Row with Plus Signs */}
                <div className="flex items-stretch justify-start gap-4 mb-8 overflow-x-auto pb-2">
                    {allProducts.map((item, idx) => {
                        const isSelected = selectedIds.includes(item.product.slug);
                        const t = item.product.translations?.[isArabic ? 'ar' : 'en'] || item.product.translations?.en;
                        const productName = displayText(t?.name || item.product.slug);
                        const reasonText = displayText(item.reason[isArabic ? 'ar' : 'en'] || '');
                        const isMain = item.product.slug === mainProduct.slug;
                        const badge = getSlotBadge(item.slot);

                        return (
                            <div key={item.product.id} className="flex items-center">
                                {/* Product Card */}
                                <button
                                    onClick={() => toggleProduct(item.product.slug)}
                                    disabled={isMain}
                                    className={`relative group transition-all duration-300 
                                        ${!isSelected ? 'opacity-50 grayscale' : ''} 
                                        ${!isMain ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default'}`}
                                >
                                    <div className={`w-48 rounded-2xl border-2 p-4 bg-white dark:bg-gray-800 transition-all
                                        ${isSelected
                                            ? 'border-green-600 shadow-xl shadow-green-100 dark:shadow-green-900/20'
                                            : 'border-gray-200 dark:border-gray-700'
                                        }`}
                                    >
                                        {/* Slot Badge (top-left / top-right based on locale) */}
                                        {!isMain && badge && (
                                            <div className={`absolute top-3 ${isArabic ? 'right-3' : 'left-3'} px-2 py-0.5 ${badge.className} text-[10px] font-bold rounded-full z-10`}>
                                                {badge.text}
                                            </div>
                                        )}

                                        {/* Image */}
                                        <div className="relative w-full aspect-square mb-4">
                                            {item.product.images?.[0]?.url && (
                                                <ProductImage
                                                    src={item.product.images[0].url}
                                                    alt={productName}
                                                    slug={item.product.slug}
                                                    brand={item.product.brand}
                                                    category={item.product.categorySlug}
                                                    fill
                                                    sizes="(max-width: 768px) 120px, 160px"
                                                    imageClassName="object-cover"
                                                    locale={locale}
                                                    lightweight
                                                />
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="text-center">
                                            <p className={`text-sm font-medium mb-1 line-clamp-2 h-10 ${!isSelected ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-gray-200'}`}>
                                                {productName}
                                            </p>

                                            {/* Reason Text */}
                                            {!isMain && reasonText && (
                                                <p className="text-[11px] text-orange-700 dark:text-orange-400 font-medium mb-2 line-clamp-1">
                                                    💡 {reasonText}
                                                </p>
                                            )}

                                            <div className="flex items-center justify-center gap-2 flex-wrap">
                                                <span className={`font-bold text-lg ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                                                    {item.product.price.toLocaleString('en-US')}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {isArabic ? 'ج.م' : 'EGP'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Checkbox in corner */}
                                        <div className={`absolute top-3 ${isArabic ? 'left-3' : 'right-3'} w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all
                                            ${isSelected
                                                ? 'bg-green-600 border-green-600 text-white'
                                                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                                            }`}
                                        >
                                            {isSelected && (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </button>

                                {/* Plus Sign */}
                                {idx < allProducts.length - 1 && (
                                    <span className="text-gray-300 dark:text-gray-600 font-light text-4xl mx-5">+</span>
                                )}
                            </div>
                        );
                    })}

                    {/* Equals and Total */}
                    <div className="flex items-center">
                        <span className="text-gray-300 dark:text-gray-600 font-light text-4xl mx-5">=</span>

                        {/* Total Card */}
                        <div className="w-56 rounded-2xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-5 shadow-xl shadow-yellow-100 dark:shadow-yellow-900/10">
                            <div className="text-center mb-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    {isArabic ? `إجمالي ${selectedProducts.length} منتجات` : `Total for ${selectedProducts.length} items`}
                                </p>

                                {/* Show the undiscounted bundle total when a bundle discount applies. */}
                                {pricing.bundleDiscount > 0 && (
                                    <span className="text-lg text-gray-400 line-through block">
                                        {pricing.totalPrice.toLocaleString('en-US')} {isArabic ? 'ج.م' : 'EGP'}
                                    </span>
                                )}

                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {pricing.finalPrice.toLocaleString('en-US')}
                                    <span className="text-base font-medium text-gray-500 ms-1">{isArabic ? 'ج.م' : 'EGP'}</span>
                                </div>

                                {/* Savings badge */}
                                {pricing.totalSavings > 0 && (
                                    <span className="inline-block mt-2 text-sm font-semibold text-green-600 bg-green-100 dark:bg-green-900/40 px-3 py-1 rounded-full">
                                        {isArabic ? `وفرت ${pricing.totalSavings.toLocaleString('en-US')} ج.م` : `Save ${pricing.totalSavings.toLocaleString('en-US')} EGP`}
                                    </span>
                                )}

                                {/* Free Shipping Label */}
                                {pricing.freeShipping && (
                                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-2">
                                        🚚 {isArabic ? 'شحن مجاني' : 'Free shipping'}
                                    </p>
                                )}

                                {/* Bundle Discount Label */}
                                {pricing.isFullBundle && pricing.bundleDiscount > 0 && (
                                    <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                                        {isArabic ? 'خصم المجموعة' : 'Bundle discount'}
                                    </p>
                                )}

                                {/* Daily Cost */}
                                {pricing.isFullBundle && pricing.dailyCost > 0 && (
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                        💡 {isArabic
                                            ? `${pricing.dailyCost} ج.م/يوم لمدة سنة`
                                            : `${pricing.dailyCost} EGP/day for a year`}
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={handleAddBundle}
                                disabled={selectedProducts.length === 0}
                                data-add-to-cart
                                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 px-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {pricing.totalSavings > 0
                                    ? (isArabic
                                        ? `أضف الكومبو ووفر ${pricing.totalSavings.toLocaleString('en-US')} ج.م${pricing.freeShipping ? ' + شحن مجاني' : ''}`
                                        : `Add & Save ${pricing.totalSavings.toLocaleString('en-US')} EGP${pricing.freeShipping ? ' + Free Shipping' : ''}`)
                                    : (isArabic ? 'إضافة الكل للسلة' : 'Add All to Cart')
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
