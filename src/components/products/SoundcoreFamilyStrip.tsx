// Soundcore-family product strip shown on the Anker brand page.
// Product cards link to their canonical /soundcore/... URLs.

import Link from 'next/link';
import { ProductImage } from '@/components/ui/ProductImage';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { staticProducts, StaticProduct } from '@/lib/static-products';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';

interface SoundcoreFamilyStripProps {
    locale: string;
}

// Curated Soundcore catalogue entries.
const soundcoreTopSeven: string[] = [
    'anker-soundcore-r50i-nc',
    'anker-soundcore-r50i',
    'soundcore-liberty-5',
    'anker-soundcore-k20i',
    'soundcore-p20i-earbuds',
    'soundcore-a25i-earbuds',
    'anker-soundcore-flare-2',
];

export default function SoundcoreFamilyStrip({ locale }: SoundcoreFamilyStripProps) {
    const isRTL = locale === 'ar';

    const products: StaticProduct[] = [];
    for (const slug of soundcoreTopSeven) {
        const product = staticProducts.find(
            p => p.slug === slug && p.brand.toLowerCase() === 'soundcore' && p.status === 'active'
        );
        if (product) products.push(product);
    }
    if (products.length === 0) return null;

    const getLocalizedHref = (path: string) => (isRTL ? path : `/${locale}${path}`);
    const canonicalBase = `https://cairovolt.com${isRTL ? '' : '/en'}`;

    // ItemList over the canonical Soundcore URLs.
    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: isRTL
            ? localizeArabicBrandNames('7 مختارات Soundcore — الصوتيات من عائلة Anker')
            : '7 Soundcore Picks — Audio from the Anker Family',
        numberOfItems: products.length,
        itemListOrder: 'https://schema.org/ItemListUnordered',
        itemListElement: products.map((p, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: isRTL
                ? localizeArabicBrandNames(p.translations.ar.name)
                : p.translations.en.name,
            url: `${canonicalBase}/soundcore/${p.categorySlug}/${p.slug}`,
        })),
    };

    return (
        <section className="bg-gradient-to-b from-[#0d0a14] to-gray-950 py-8 md:py-16" aria-labelledby="soundcore-family-heading">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <div className="container mx-auto px-4">
                {/* Header row */}
                <div className="mb-5 md:mb-8 flex flex-wrap items-end justify-between gap-3 md:gap-4">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-400/10 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-[.14em] text-orange-300">
                            <SvgIcon name="headphones" className="h-4 w-4" />
                            {isRTL
                                ? localizeArabicBrandNames('Soundcore من Anker')
                                : 'Soundcore by Anker'}
                        </span>
                        <h2 id="soundcore-family-heading" className="mt-3 md:mt-4 text-xl font-black text-white md:text-4xl">
                            {isRTL
                                ? localizeArabicBrandNames('7 مختارات صوتية من عائلة Anker')
                                : '7 Audio Picks from the Anker Family'}
                        </h2>
                        <p className="mt-1.5 md:mt-2 max-w-2xl text-xs text-gray-400 md:text-base">
                            {isRTL
                                ? localizeArabicBrandNames('Soundcore هي علامة الصوتيات من Anker — دي مختارات من الكتالوج، وشروط ضمان كايرو فولت موضحة في صفحة كل منتج.')
                                : 'Soundcore is Anker\'s audio brand. These are catalogue picks, with CairoVolt warranty terms stated on each product page.'}
                        </p>
                    </div>
                    <Link
                        href={getLocalizedHref('/soundcore')}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                    >
                        {isRTL ? 'كل منتجات ساوندكور' : 'All Soundcore products'}
                        <span>{isRTL ? '←' : '→'}</span>
                    </Link>
                </div>

                {/* 7-card strip: snap-scroll on mobile, single row from lg up */}
                <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:gap-4 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0">
                    {products.map((product) => {
                        const t = product.translations[isRTL ? 'ar' : 'en'];
                        const productName = isRTL
                            ? localizeArabicBrandNames(t.name)
                            : t.name;
                        const href = getLocalizedHref(`/soundcore/${product.categorySlug}/${product.slug}`);
                        return (
                            <Link
                                key={product.slug}
                                href={href}
                                className="group relative w-36 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-white/[0.07] sm:w-40 lg:w-auto"
                            >
                                <div className="relative aspect-square overflow-hidden bg-white">
                                    {product.images?.[0]?.url && (
                                        <ProductImage
                                            src={product.images[0].url}
                                            alt={isRTL ? productName : (product.images[0].alt || productName)}
                                            slug={product.slug}
                                            brand={product.brand}
                                            category={product.categorySlug}
                                            fill
                                            loading="lazy"
                                            sizes="(max-width: 1024px) 40vw, 14vw"
                                            imageClassName="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                                            locale={locale}
                                            lightweight
                                        />
                                    )}
                                </div>
                                <div className="p-3">
                                    <h3 className="line-clamp-2 min-h-[2rem] text-[11px] font-bold leading-4 text-white md:text-xs" title={productName}>
                                        {productName}
                                    </h3>
                                    <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
                                        <span className="text-sm font-black text-orange-300 md:text-base">
                                            {product.price.toLocaleString('en-US')}
                                        </span>
                                        <span className="text-[9px] text-gray-400">{isRTL ? 'ج.م' : 'EGP'}</span>
                                        {product.originalPrice > product.price && (
                                            <>
                                                <span className="text-[10px] text-gray-500 line-through">{product.originalPrice.toLocaleString('en-US')}</span>
                                                <span className="rounded-full bg-red-600 px-1 py-0.5 text-[8px] font-extrabold text-white">
                                                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
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
    );
}
