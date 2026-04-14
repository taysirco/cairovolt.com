'use client';

import { InstantLink as Link } from '@/components/ui/InstantLink';
import { useTranslations } from 'next-intl';
import { ProductImage } from '@/components/ui/ProductImage';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface Product {
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
}

interface RelatedProductsProps {
    products: Product[];
    locale: string;
}

export default function RelatedProducts({ products, locale }: RelatedProductsProps) {
    const isArabic = locale === 'ar';
    const tCommon = useTranslations('Common');

    // Ensure we don't show empty section
    if (!products || products.length === 0) return null;

    // Limit to 6 products mostly, but accept whatever is passed
    const displayProducts = products.slice(0, 8);

    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return isArabic ? cleanPath : `/${locale}${cleanPath}`;
    };

    return (
        <div className="py-8 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                <SvgIcon name="sparkles" className="w-6 h-6" />
                {isArabic ? 'قد يعجبك أيضاً' : 'You May Also Like'}
            </h3>

            {/* Mobile: Horizontal Snap Scroll | Desktop: Grid */}
            <div className="relative">
                <div
                    className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {displayProducts.map((product) => {
                        const t = product.translations?.[isArabic ? 'ar' : 'en'] || product.translations?.en;
                        const productUrl = getLocalizedHref(`/${product.brand.toLowerCase()}/${product.categorySlug.toLowerCase()}/${product.slug}`);
                        const discount = product.originalPrice
                            ? Math.round((1 - product.price / product.originalPrice) * 100)
                            : 0;

                        return (
                            <Link
                                key={product.id}
                                href={productUrl}
                                className="flex-shrink-0 w-[160px] md:w-[200px] lg:w-auto bg-white rounded-2xl border border-gray-200 p-3 transition-all hover:shadow-lg hover:border-blue-200 group snap-center"
                            >
                                {/* Image Area */}
                                <div className="relative aspect-square mb-3 bg-gray-50 rounded-xl overflow-hidden">
                                    {product.images?.[0]?.url ? (
                                        <ProductImage
                                            src={product.images[0].url}
                                            alt={t?.name || product.slug}
                                            slug={product.slug}
                                            brand={product.brand}
                                            category={product.categorySlug}
                                            fill
                                            imageClassName="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 160px, 250px"
                                            locale={locale}
                                            lightweight
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            No Image
                                        </div>
                                    )}

                                    {/* Discount Badge */}
                                    {discount > 0 && (
                                        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10">
                                            -{discount}%
                                        </span>
                                    )}

                                    {/* Verified indicator */}
                                    <span
                                        className="absolute bottom-1 right-1 bg-emerald-500 text-white rounded-full p-0.5 z-10"
                                        title={isArabic ? 'صورة موثّقة — C2PA' : 'Verified image — C2PA'}
                                    >
                                        <SvgIcon name="shield" className="w-2.5 h-2.5" />
                                    </span>
                                </div>

                                {/* Product Info */}
                                <div className="space-y-1">
                                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                        {product.brand}
                                    </div>

                                    <h4 className="font-semibold text-gray-900 text-sm leading-tight h-10 line-clamp-2 group-hover:text-blue-600 transition-colors" title={t?.name}>
                                        {t?.name}
                                    </h4>

                                    <div className="pt-2 flex items-baseline gap-2">
                                        <span className="font-bold text-blue-600 text-base">
                                            {product.price.toLocaleString()} <span className="text-xs">{isArabic ? 'ج.م' : 'EGP'}</span>
                                        </span>
                                        {product.originalPrice && (
                                            <span className="text-xs text-gray-400 line-through">
                                                {product.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
