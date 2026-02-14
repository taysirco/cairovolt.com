import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categoryData } from '@/data/category-seo';

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
    // Use proper brand casing (Anker, Joyroom) for canonical URLs
    const properBrand = brandKey.charAt(0).toUpperCase() + brandKey.slice(1);
    const path = `${properBrand}/${categoryKey}`;

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

    return (
        <CategoryTemplate
            brand={data.brand}
            brandColor={data.brandColor}
            category={data.categoryName}
            categorySlug={categoryKey}
            seoContent={data.seoContent}
            soundcoreData={data.soundcoreData}
            powerBankData={data.powerBankData}
        />
    );
}
