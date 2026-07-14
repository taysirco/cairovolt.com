import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categoryContent } from '@/data/category-content';
import { getProductsByBrandAndCategory } from '@/lib/static-products';
import { staticProducts } from '@/lib/static-products';
import { ankerBestSellers, soundcoreBestSellers } from '@/components/products/BestSellingProducts';

/**
 * The Joyroom car-accessories route is an umbrella landing page. Products keep
 * their canonical catalogue category while this page presents both car lines.
 */
function getLandingPageProducts(brand: string, category: string) {
    if (brand === 'joyroom' && category === 'car-accessories') {
        return staticProducts.filter(product =>
            product.status === 'active' &&
            product.brand.toLowerCase() === brand &&
            (product.categorySlug === 'car-chargers' || product.categorySlug === 'car-holders')
        );
    }

    return getProductsByBrandAndCategory(brand, category)
        .filter(product => product.status === 'active');
}

// ISR: On-demand revalidation only (via /api/indexing webhook)
// Closed param space (categoryContent keys) → real 404 for unknown categories
// instead of FAH soft-404. Product [slug] below stays dynamic (Firebase-only
// products are not enumerable at build time).
export const dynamicParams = false;

type Props = {
    params: Promise<{ locale: string; brand: string; category: string }>;
};

export async function generateStaticParams() {
    const locales = ['ar', 'en'];
    const params: { locale: string; brand: string; category: string }[] = [];
    Object.keys(categoryContent).forEach(brand => {
        Object.keys(categoryContent[brand]).forEach(category => {
            locales.forEach(locale => {
                params.push({ locale, brand, category });
            });
        });
    });
    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, brand, category } = await params;
    const brandKey = brand.toLowerCase();
    const categoryKey = category.toLowerCase();

    const data = categoryContent[brandKey]?.[categoryKey];

    if (!data) return {};

    const isArabic = locale === 'ar';
    const meta = locale === 'ar' ? data.metadata.ar : data.metadata.en;
    const localizedCategoryName = isArabic ? data.pageContent.ar.title : data.pageContent.en.title;
    const arCategoryName = data.pageContent.ar.title.replace(/\s+في مصر$/u, '');
    const enCategoryName = data.pageContent.en.title.replace(/\s+in Egypt$/i, '');
    // Strict lowercase for canonical URLs (URL best practice)
    const path = `${brandKey}/${categoryKey}`;

    // Use first product image from this category as social share image
    const categoryProducts = getLandingPageProducts(brandKey, categoryKey)
        .filter(product => product.images?.[0]?.url);
    const socialImageUrl = categoryProducts[0]?.images[0]?.url
        ? `https://cairovolt.com${categoryProducts[0].images[0].url}`
        : undefined;
    const socialImageAlt = categoryProducts[0]?.images[0]?.alt
        || (isArabic ? `${localizedCategoryName} - كايرو فولت مصر` : `${localizedCategoryName} - CairoVolt Egypt`);

    // Get product count for this category
    const catProducts = getLandingPageProducts(brandKey, categoryKey);
    const productCount = catProducts.length;

    const arTitle = `أفضل ${arCategoryName} ⚡ ${productCount} منتج | الأسعار والتوصيل في مصر`;
    const enTitle = `${enCategoryName} in Egypt ⚡ ${productCount} Products | Prices & COD`;

    const dynamicTitle = isArabic ? arTitle : enTitle;
    const canonical = isArabic
        ? `https://cairovolt.com/${path}`
        : `https://cairovolt.com/en/${path}`;

    return {
        title: { absolute: dynamicTitle },
        description: meta.description,
        keywords: meta.keywords,
        alternates: {
            canonical,
            languages: {
                'ar-EG': `https://cairovolt.com/${path}`,
                'en-EG': `https://cairovolt.com/en/${path}`,
                'x-default': `https://cairovolt.com/${path}`,
            },
        },
        openGraph: {
            ...(meta.openGraph || {}),
            title: dynamicTitle,
            description: meta.description,
            url: canonical,
            siteName: 'CairoVolt',
            locale: isArabic ? 'ar_EG' : 'en_EG',
            type: 'website',
            ...(socialImageUrl && {
                images: [{ url: socialImageUrl, alt: socialImageAlt, width: 800, height: 800 }]
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: dynamicTitle,
            description: meta.description,
            images: socialImageUrl ? [socialImageUrl] : undefined,
        },
    };
}

export default async function DynamicCategoryPage({ params }: Props) {
    const { brand, category } = await params;
    const brandKey = brand.toLowerCase();
    const categoryKey = category.toLowerCase();

    const data = categoryContent[brandKey]?.[categoryKey];

    if (!data) {
        notFound();
    }

    // Get static products server-side for immediate availability
    // This prevents "empty" pages if client-side fetching fails
    const categoryProducts = getLandingPageProducts(brandKey, categoryKey);

    // Default order = demand order: curated best sellers first (same ranking
    // the brand hubs use), then the rest in catalog order. This drives both
    // the visible grid AND the ItemList schema positions.
    const bestSellerRank = new Map(
        [...ankerBestSellers, ...soundcoreBestSellers].map((slug, idx) => [slug, idx]),
    );
    const staticProducts = [...categoryProducts].sort((a, b) => {
        const ra = bestSellerRank.get(a.slug) ?? Infinity;
        const rb = bestSellerRank.get(b.slug) ?? Infinity;
        if (ra !== rb) return ra - rb;
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return 0;
    });

    // Map to the interface expected by CategoryTemplate
    const initialProducts = staticProducts.map(p => ({
        id: `static_${p.slug}`,
        slug: p.slug,
        brand: p.brand,
        categorySlug: p.categorySlug,
        price: p.price,
        originalPrice: p.originalPrice,
        images: p.images.map(img => ({ url: img.url, alt: img.alt, isPrimary: img.isPrimary })),
        translations: p.translations
    }));

    return (
        <CategoryTemplate
            brand={data.brand}
            brandColor={data.brandColor}
            category={data.categoryName}
            categorySlug={categoryKey}
            categoryInfo={data.pageContent}
            soundcoreData={data.soundcoreData}
            powerBankData={data.powerBankData}
            initialProducts={initialProducts}
        />
    );
}
