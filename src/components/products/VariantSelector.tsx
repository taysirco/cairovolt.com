'use client';

import type { ProductVariant } from '@/lib/static-products';

interface VariantSelectorProps {
    variants: ProductVariant[];
    selectedVariantId: string;
    onSelect: (variant: ProductVariant) => void;
    locale: string;
    brandColor?: 'blue' | 'red';
}

export default function VariantSelector({
    variants,
    selectedVariantId,
    onSelect,
    locale,
    brandColor = 'blue',
}: VariantSelectorProps) {
    const isRTL = locale === 'ar';
    const cardCount = variants.length;

    // Colour map based on brand
    const colors = brandColor === 'blue'
        ? {
            ring: 'ring-blue-500/40',
            border: 'border-blue-500',
            bg: 'bg-blue-50 dark:bg-blue-950/40',
            badge: 'bg-blue-600 text-white',
            glow: 'shadow-blue-500/20',
            text: 'text-blue-700 dark:text-blue-300',
            dot: 'bg-blue-500',
        }
        : {
            ring: 'ring-red-500/40',
            border: 'border-red-500',
            bg: 'bg-red-50 dark:bg-red-950/40',
            badge: 'bg-red-600 text-white',
            glow: 'shadow-red-500/20',
            text: 'text-red-700 dark:text-red-300',
            dot: 'bg-red-500',
        };

    // Size labels for Arabic context
    const sizeLabels: Record<number, { en: string; ar: string }> = {
        0: { en: 'Compact', ar: 'الأصغر' },
        1: { en: 'Mid-Range', ar: 'المتوسط' },
        2: { en: 'Pro', ar: 'الأكبر' },
    };

    // For ≤3 cards, use a responsive grid that fits all cards without scroll.
    // For >3 cards, use horizontal scroll.
    const useGrid = cardCount <= 3;

    return (
        <div className="w-full max-w-full overflow-hidden">
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {isRTL ? 'اختر السعة والقدرة:' : 'Choose Capacity & Power:'}
                </h3>
            </div>

            {/* Variant Cards */}
            <div
                className={
                    useGrid
                        ? 'flex gap-2.5 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory sm:grid sm:overflow-visible sm:pb-0 ' +
                          (cardCount === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3') +
                          ' sm:gap-3'
                        : 'flex gap-3 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory'
                }
            >
                {variants.map((variant, idx) => {
                    const isSelected = variant.id === selectedVariantId;
                    const isOutOfStock = variant.stock <= 0;
                    const discount = variant.originalPrice
                        ? Math.round((1 - variant.price / variant.originalPrice) * 100)
                        : 0;

                    return (
                        <button
                            key={variant.id}
                            onClick={() => !isOutOfStock && onSelect(variant)}
                            aria-pressed={isSelected ? 'true' : 'false'}
                            aria-disabled={isOutOfStock ? 'true' : 'false'}
                            aria-label={`${variant.model} — ${variant.capacity} / ${variant.acOutput}${isOutOfStock ? ' (out of stock)' : ''}`}
                            className={`
                                relative text-start
                                flex-shrink-0 w-[140px] sm:w-auto sm:flex-shrink
                                ${useGrid ? 'sm:min-w-0' : 'snap-start'}
                                ${!useGrid ? 'sm:w-[170px] md:w-[190px]' : ''}
                                rounded-xl border-2 p-2.5 sm:p-3 md:p-4
                                transition-all duration-200 ease-out
                                ${isOutOfStock
                                    ? 'border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950 cursor-not-allowed opacity-50 grayscale'
                                    : isSelected
                                        ? `${colors.border} ${colors.bg} ${colors.ring} ring-2 shadow-lg ${colors.glow} scale-[1.02] cursor-pointer`
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md cursor-pointer'
                                }
                            `}
                        >
                            {/* Out of Stock overlay badge */}
                            {isOutOfStock && (
                                <div className={`absolute top-1.5 ${isRTL ? 'left-1.5' : 'right-1.5'} px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-[9px] sm:text-[10px] font-bold`}>
                                    {isRTL ? 'غير متاح' : 'Sold Out'}
                                </div>
                            )}

                            {/* Selection indicator — hidden when out of stock */}
                            {!isOutOfStock && (
                                <div className={`absolute top-1.5 ${isRTL ? 'left-1.5' : 'right-1.5'} w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
                                    ? `${colors.border} ${colors.bg}`
                                    : 'border-gray-300 dark:border-gray-600'
                                }`}>
                                    {isSelected && (
                                        <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${colors.dot} animate-pulse`} />
                                    )}
                                </div>
                            )}

                            {/* Size badge */}
                            <span className={`inline-block text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full mb-1.5 sm:mb-2 ${isSelected && !isOutOfStock
                                ? colors.badge
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                            }`}>
                                {isRTL ? sizeLabels[idx]?.ar : sizeLabels[idx]?.en}
                            </span>

                            {/* Model name */}
                            <div className={`font-bold text-xs sm:text-sm mb-1 leading-tight truncate ${isOutOfStock ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-white'}`}>
                                {variant.model}
                            </div>

                            {/* Key specs — compact on mobile */}
                            <div className="space-y-0.5 mb-2 sm:mb-3">
                                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="truncate">{variant.capacity}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                    </svg>
                                    <span className="truncate">{variant.acOutput} AC</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
                                    </svg>
                                    <span className="truncate">{isRTL ? variant.weight.ar : variant.weight.en}</span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="border-t border-gray-100 dark:border-gray-800 pt-1.5 sm:pt-2">
                                <div className="flex items-baseline gap-1 flex-wrap">
                                    <span className={`text-sm sm:text-lg font-bold ${isOutOfStock ? 'text-gray-400 line-through' : isSelected ? colors.text : 'text-gray-900 dark:text-white'}`}>
                                        {variant.price.toLocaleString()}
                                    </span>
                                    <span className="text-[9px] sm:text-[10px] text-gray-500">
                                        {isRTL ? 'ج.م' : 'EGP'}
                                    </span>
                                </div>
                                {discount > 0 && !isOutOfStock && (
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <span className="text-[9px] sm:text-[10px] line-through text-gray-400">
                                            {variant.originalPrice.toLocaleString()}
                                        </span>
                                        <span className="text-[9px] sm:text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-1 py-0.5 rounded">
                                            -{discount}%
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Stock indicator */}
                            {isOutOfStock ? (
                                <div className="mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] font-medium text-red-500 dark:text-red-400 flex items-center gap-1">
                                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                    </svg>
                                    <span className="truncate">{isRTL ? 'نفد من المخزون' : 'Out of stock'}</span>
                                </div>
                            ) : variant.stock <= 3 && (
                                <div className="mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                                    <span className="truncate">
                                        {isRTL
                                            ? `باقي ${variant.stock} قطع فقط`
                                            : `Only ${variant.stock} left`
                                        }
                                    </span>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
