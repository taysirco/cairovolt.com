'use client';

import { InstantLink as Link } from '@/components/ui/InstantLink';
import { ProductImage } from '@/components/ui/ProductImage';
import { getBrandDisplayName, localizeArabicBrandNames } from '@/lib/arabic-brand-names';
import { getDiscountInfo } from '@/lib/pricing-display';

interface FBTProduct {
    id: string;
    slug: string;
    brand: string;
    categorySlug: string;
    price: number;
    originalPrice?: number;
    images?: Array<{ url: string; alt?: string; isPrimary?: boolean }>;
    translations?: {
        en?: { name?: string };
        ar?: { name?: string };
    };
    /** Localized "why it pairs" line (from the smart complementary engine). */
    reason?: string;
    slot?: 'essential' | 'accessory';
}

interface FrequentlyBoughtTogetherProps {
    products: FBTProduct[];
    locale: string;
}

/**
 * 🛒 «الذين اشتروا هذا المنتج في الغالب اشتروا أيضاً»
 *
 * قسم توصيات "شراء متكرر معاً" — يعرض المكمّلات الحقيقية (essential/accessory) القادمة
 * من محرّك الكومبو الذكي، ولكل قطعة **سبب مختصر** يوضّح لماذا تُشترى مع المنتج.
 * مميّز عن قسم «قد يعجبك أيضاً» (الذي يعرض بقية المقترحات) فلا تكرار.
 */
export default function FrequentlyBoughtTogether({ products, locale }: FrequentlyBoughtTogetherProps) {
    const isArabic = locale === 'ar';

    if (!products || products.length === 0) return null;

    const items = products.slice(0, 4);

    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return isArabic ? cleanPath : `/${locale}${cleanPath}`;
    };

    return (
        <section className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2.5 mb-1">
                <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center" aria-hidden="true">
                    {/* users / community icon → "الذين اشتروا" */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                </span>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                    {isArabic ? 'الذين اشتروا هذا المنتج في الغالب اشتروا أيضاً' : 'Customers who bought this often also bought'}
                </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5 ps-11">
                {isArabic ? 'مقترحات مكمّلة تكمّل تجربتك مع المنتج' : 'Complementary picks that complete your setup'}
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
                {items.map((product) => {
                    const t = product.translations?.[isArabic ? 'ar' : 'en'] || product.translations?.en;
                    const productName = isArabic
                        ? localizeArabicBrandNames(t?.name || product.slug)
                        : (t?.name || product.slug);
                    const brandDisplayName = getBrandDisplayName(product.brand, locale);
                    const productUrl = getLocalizedHref(`/${product.brand.toLowerCase()}/${product.categorySlug.toLowerCase()}/${product.slug}`);
                    const d = getDiscountInfo(product.price, product.originalPrice);

                    return (
                        <Link
                            key={product.id}
                            href={productUrl}
                            className="relative flex flex-col w-[calc(50%-0.375rem)] sm:w-[180px] md:w-[200px] flex-shrink-0 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-3 transition-all hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700 group"
                        >
                            {product.slot === 'essential' && (
                                <span className="absolute top-2 z-10 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-extrabold text-white shadow-sm start-2">
                                    {isArabic ? 'مكمّل أساسي' : 'Essential'}
                                </span>
                            )}

                            {/* Image */}
                            <div className="relative aspect-square mb-3 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
                                {product.images?.[0]?.url ? (
                                    <ProductImage
                                        src={product.images[0].url}
                                        alt={productName}
                                        slug={product.slug}
                                        brand={product.brand}
                                        category={product.categorySlug}
                                        fill
                                        imageClassName="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 45vw, 200px"
                                        locale={locale}
                                        lightweight
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex flex-col flex-1">
                                <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                                    {brandDisplayName}
                                </div>
                                <h4 className="mt-0.5 font-semibold text-gray-900 dark:text-white text-sm leading-tight line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" title={productName}>
                                    {productName}
                                </h4>

                                {product.reason && (
                                    <p className="mt-1.5 flex items-start gap-1 text-[11px] leading-snug text-gray-500 dark:text-gray-400">
                                        <svg className="w-3.5 h-3.5 mt-px flex-shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                        </svg>
                                        <span className="line-clamp-2">{product.reason}</span>
                                    </p>
                                )}

                                <div className="mt-auto pt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
                                        {product.price.toLocaleString('en-US')} <span className="text-xs">{isArabic ? 'ج.م' : 'EGP'}</span>
                                    </span>
                                    {d.hasDiscount && product.originalPrice != null && (
                                        <>
                                            <span className="text-xs text-gray-400 line-through">
                                                {product.originalPrice.toLocaleString('en-US')}
                                            </span>
                                            <span className="rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-extrabold text-white">
                                                -{d.percent}%
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
