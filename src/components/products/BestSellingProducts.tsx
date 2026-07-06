// Server Component — Best-Selling Products Showcase for Brand Pages
// Displays top 15 products in a premium grid with images, prices, and badges

import Link from 'next/link';
import { ProductImage } from '@/components/ui/ProductImage';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { staticProducts, StaticProduct } from '@/lib/static-products';

interface BestSellingProductsProps {
    brandSlug: string;
    brandDisplayName: string;
    locale: string;
    maxProducts?: number;
}

/**
 * Curated list of top-selling Anker product slugs (charging only — post-Soundcore migration).
 */
const ankerBestSellers: string[] = [
    // Power Banks — highest volume
    'anker-powercore-10000',
    'anker-zolo-a110d-10000',
    'anker-powercore-20000',
    'anker-zolo-a110e-20000',
    'anker-zolo-a1681-20000',
    // Wall Chargers — high demand
    'anker-powerport-20w',
    'anker-powerport-25w',
    'anker-nano-45w',
    // Cables — everyday essentials
    'anker-powerline-usb-c-lightning',
    'anker-a8050-usb-c-cable',
    // Car Chargers
    'anker-a2732-charger-35w',
    'anker-521-powerhouse',
];

/**
 * Curated list of top-selling Soundcore products (Anker's audio sub-brand).
 * Mix of earbuds + speakers — driven by R50i, R50i NC, Liberty family.
 */
const soundcoreBestSellers: string[] = [
    // Earbuds — top sellers
    'anker-soundcore-r50i',
    'anker-soundcore-r50i-nc',
    'anker-soundcore-life-p2i',
    'anker-soundcore-k20i',
    'soundcore-p20i-earbuds',
    'soundcore-liberty-4-nc',
    'soundcore-liberty-5',
    // Speakers — flagship
    'anker-soundcore-motion-plus',
    'anker-soundcore-flare-2',
    'soundcore-rave-3-speaker',
    'soundcore-select-4-go-speaker',
];

function getBestSellingProducts(brandSlug: string, max: number): StaticProduct[] {
    if (brandSlug === 'anker' || brandSlug === 'soundcore') {
        const curatedList = brandSlug === 'anker' ? ankerBestSellers : soundcoreBestSellers;
        const ordered: StaticProduct[] = [];
        for (const slug of curatedList) {
            const product = staticProducts.find(
                p => p.slug === slug && p.brand.toLowerCase() === brandSlug && p.status === 'active'
            );
            if (product) ordered.push(product);
            if (ordered.length >= max) break;
        }
        return ordered;
    }

    // Fallback for other brands: featured first, then by price
    return staticProducts
        .filter(p => p.brand.toLowerCase() === brandSlug && p.status === 'active')
        .sort((a, b) => {
            if (a.featured !== b.featured) return a.featured ? -1 : 1;
            return a.price - b.price;
        })
        .slice(0, max);
}

export default function BestSellingProducts({
    brandSlug,
    brandDisplayName,
    locale,
    maxProducts = 20,
}: BestSellingProductsProps) {
    const isRTL = locale === 'ar';
    const isAnker = brandSlug === 'anker';
    const isSoundcore = brandSlug === 'soundcore';
    const products = getBestSellingProducts(brandSlug, maxProducts);

    if (products.length === 0) return null;

    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return isRTL ? cleanPath : `/${locale}${cleanPath}`;
    };

    // Category label mapping
    const categoryLabels: Record<string, { ar: string; en: string }> = {
        'power-banks': { ar: 'باور بانك', en: 'Power Bank' },
        'wall-chargers': { ar: 'شاحن حائط', en: 'Charger' },
        'cables': { ar: 'كابل', en: 'Cable' },
        'car-chargers': { ar: 'شاحن سيارة', en: 'Car Charger' },
        'audio': { ar: 'سماعات', en: 'Audio' },
        'speakers': { ar: 'سبيكر', en: 'Speaker' },
        'other': { ar: 'أخرى', en: 'Other' },
    };

    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-full border border-amber-200 dark:border-amber-800/50">
                        <span className="text-amber-600 dark:text-amber-400">
                            <SvgIcon name="fire" className="w-4 h-4" />
                        </span>
                        <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
                            {isRTL ? 'الأكثر مبيعاً في مصر' : 'Best Sellers in Egypt'}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-gray-900 dark:text-white">
                        {isRTL
                            ? `أفضل ${products.length} منتج من ${brandDisplayName}`
                            : `Top ${products.length} ${brandDisplayName} Products`}
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {isRTL
                            ? 'المنتجات الأعلى تقييماً والأكثر طلباً من عملائنا — أصلية 100% بضمان الوكيل'
                            : 'Top-rated and most requested by our customers — 100% original with official warranty'}
                    </p>
                    <div className={`h-1.5 w-24 mx-auto mt-4 rounded-full ${
                        isSoundcore ? 'bg-gradient-to-r from-orange-600 to-pink-500' :
                        isAnker ? 'bg-gradient-to-r from-blue-600 to-cyan-500' :
                        'bg-gradient-to-r from-red-600 to-orange-500'
                    }`}></div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
                    {products.map((product, idx) => {
                        const t = product.translations[isRTL ? 'ar' : 'en'];
                        const productUrl = getLocalizedHref(
                            `/${brandSlug}/${product.categorySlug}/${product.slug}`
                        );
                        const discount = product.originalPrice
                            ? Math.round((1 - product.price / product.originalPrice) * 100)
                            : 0;
                        const catLabel = categoryLabels[product.categorySlug] || categoryLabels['other'];

                        return (
                            <Link
                                key={product.slug}
                                href={productUrl}
                                className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Rank Badge (Top 3) */}
                                {idx < 3 && (
                                    <div className={`absolute top-2 ${isRTL ? 'right-2' : 'left-2'} z-20 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg ${
                                        idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500' :
                                        idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                                        'bg-gradient-to-br from-orange-400 to-orange-600'
                                    }`}>
                                        {idx + 1}
                                    </div>
                                )}

                                {/* Discount Badge */}
                                {discount > 0 && (
                                    <div className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'} z-20`}>
                                        <span className="inline-block bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                            -{discount}%
                                        </span>
                                    </div>
                                )}

                                {/* Image */}
                                <div className="relative aspect-square bg-white overflow-hidden">
                                    {product.images?.[0]?.url ? (
                                        <ProductImage
                                            src={product.images[0].url}
                                            alt={product.images[0].alt || t.name}
                                            slug={product.slug}
                                            brand={product.brand}
                                            category={product.categorySlug}
                                            fill
                                            priority={idx < 2}
                                            loading={idx < 2 ? 'eager' : 'lazy'}
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                            imageClassName="object-contain p-3 group-hover:scale-110 transition-transform duration-500"
                                            locale={locale}
                                            lightweight
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-4xl font-black text-gray-200 dark:text-gray-700">
                                                {brandDisplayName.charAt(0)}
                                            </span>
                                        </div>
                                    )}

                                    {/* Category Chip */}
                                    <span className={`absolute bottom-2 ${isRTL ? 'right-2' : 'left-2'} bg-black/60 backdrop-blur-sm text-white text-[9px] md:text-[10px] font-semibold px-2 py-0.5 rounded-full z-10`}>
                                        {isRTL ? catLabel.ar : catLabel.en}
                                    </span>

                                    {/* C2PA provenance: crawler-only (JSON-LD + EXIF/XMP) — visible badge removed */}
                                </div>

                                {/* Product Info */}
                                <div className="p-3 md:p-4">
                                    {/* Product Name */}
                                    <h3
                                        className="text-xs md:text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight mb-2 min-h-[2.25rem] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                                        title={t.name}
                                    >
                                        {t.name}
                                    </h3>

                                    {/* Price Row */}
                                    <div className="flex items-end justify-between gap-1">
                                        <div>
                                            <span className={`text-base md:text-lg font-black ${
                                                isSoundcore ? 'text-orange-700 dark:text-orange-400' :
                                                isAnker ? 'text-blue-600 dark:text-blue-400' :
                                                'text-red-600 dark:text-red-400'
                                            }`}>
                                                {product.price.toLocaleString()}
                                            </span>
                                            <span className="text-[10px] text-gray-600 dark:text-gray-400 font-medium mr-1 ml-0.5">
                                                {isRTL ? 'ج.م' : 'EGP'}
                                            </span>
                                            {product.originalPrice && product.originalPrice > product.price && (
                                                <span className="text-xs text-gray-600 dark:text-gray-400 line-through block">
                                                    {product.originalPrice.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs shadow-sm transition-transform group-hover:scale-110 ${
                                            isSoundcore ? 'bg-gradient-to-br from-orange-500 to-pink-500' :
                                            isAnker ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                                            'bg-gradient-to-br from-red-500 to-red-600'
                                        }`}>
                                            {isRTL ? '←' : '→'}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>


            </div>
        </section>
    );
}
