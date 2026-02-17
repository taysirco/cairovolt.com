import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categoryData } from '@/data/category-seo';
import { getProductsByBrandAndCategory } from '@/lib/static-products';

type Props = {
    params: Promise<{ locale: string; brand: string; category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, brand, category } = await params;
    const brandKey = brand.toLowerCase();
    const categoryKey = category.toLowerCase();

    const data = categoryData[brandKey]?.[categoryKey];

    if (!data) return {};

    const meta = locale === 'ar' ? data.metadata.ar : data.metadata.en;
    // Strict lowercase for canonical URLs (SEO requirement)
    const path = `${brandKey}/${categoryKey}`;

    return {
        title: meta.title,
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
        openGraph: meta.openGraph ? { ...meta.openGraph, locale: locale === 'ar' ? 'ar_EG' : 'en_US' } : undefined,
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

    const data = categoryData[brandKey]?.[categoryKey];

    if (!data) {
        notFound();
    }

    // Get static products server-side for immediate SEO availability
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
            seoContent={data.seoContent}
            soundcoreData={data.soundcoreData}
            powerBankData={data.powerBankData}
            initialProducts={initialProducts}
        />
    );
}
