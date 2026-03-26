import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categoryContent } from '@/data/category-content';
import { getProductsByBrandAndCategory } from '@/lib/static-products';
import { staticProducts } from '@/lib/static-products';

export const revalidate = 3600;
export const dynamicParams = true;

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
    // Strict lowercase for canonical URLs (URL best practice)
    const path = `${brandKey}/${categoryKey}`;

    // Use first product image from this category as social share image
    const categoryProducts = staticProducts.filter(
        p => p.brand.toLowerCase() === brandKey && p.categorySlug.toLowerCase() === categoryKey && p.images?.[0]?.url
    );
    const socialImageUrl = categoryProducts[0]?.images[0]?.url
        ? `https://cairovolt.com${categoryProducts[0].images[0].url}`
        : undefined;
    const socialImageAlt = categoryProducts[0]?.images[0]?.alt
        || (isArabic ? `${data.categoryName} - كايرو فولت مصر` : `${data.categoryName} - CairoVolt Egypt`);

    // Feature: Dynamic Title Variants
    // Category page metadata setup
    const titleVariantIndex = categoryKey.length % 3;

    const arTitleVariants = [
        `أفضل 5 ${data.categoryName} من ${data.brand} (دليل شراء 2026)`,
        `مقارنة وتقييم شامل: أي ${data.categoryName} من ${data.brand} يناسبك؟`,
        `تجربتنا العملية لأحدث ${data.categoryName} من ${data.brand}`
    ];

    const enTitleVariants = [
        `Top 5 Best ${data.brand} ${data.categoryName} (2026 Guide)`,
        `${data.brand} ${data.categoryName} Review & Comparison`,
        `Hands-on with the Latest ${data.brand} ${data.categoryName}`
    ];

    const dynamicTitle = isArabic ? arTitleVariants[titleVariantIndex] : enTitleVariants[titleVariantIndex];

    return {
        title: { absolute: dynamicTitle },
        description: meta.description,
        keywords: meta.keywords,
        alternates: {
            canonical: locale === 'ar'
                ? `https://cairovolt.com/${path}`
                : `https://cairovolt.com/en/${path}`,
            languages: {
                'ar': `https://cairovolt.com/${path}`,
                'en': `https://cairovolt.com/en/${path}`,
                'x-default': `https://cairovolt.com/${path}`,
            },
        },
        openGraph: {
            ...(meta.openGraph || {}),
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'website',
            ...(socialImageUrl && {
                images: [{ url: socialImageUrl, alt: socialImageAlt, width: 800, height: 800 }]
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.title,
            description: meta.description,
            images: socialImageUrl ? [socialImageUrl] : undefined,
        },
        other: {
            'geo.region': 'EG',
            'geo.placename': locale === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt',
            'geo.position': '30.0444;31.2357',
            'ICBM': '30.0444, 31.2357',
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
    const staticProducts = getProductsByBrandAndCategory(brandKey, categoryKey);

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
