import { Metadata } from 'next';
import { staticProducts } from '@/lib/static-products';
import SearchClient from './SearchClient';

export const revalidate = 86400;

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isArabic = locale === 'ar';

    return {
        title: isArabic ? 'البحث في المنتجات' : 'Product Search',
        description: isArabic
            ? 'ابحث في كل منتجات كايرو فولت — باور بانك، شواحن، سماعات وكابلات انكر وجوي روم.'
            : 'Search all CairoVolt products — Anker & Joyroom power banks, chargers, earbuds and cables.',
        alternates: {
            canonical: isArabic ? 'https://cairovolt.com/search' : 'https://cairovolt.com/en/search',
            languages: {
                'ar-EG': 'https://cairovolt.com/search',
                'en-EG': 'https://cairovolt.com/en/search',
                'x-default': 'https://cairovolt.com/search',
            },
        },
        // Internal search RESULTS must never enter the index (Google guidance);
        // noindex,follow lets crawlers still flow through the linked products.
        robots: { index: false, follow: true },
    };
}

export default async function SearchPage({ params }: Props) {
    const { locale } = await params;

    // Slim client-side index — names, slug path, price, primary image only.
    const index = staticProducts
        .filter(p => (p as { status?: string }).status !== 'archived')
        .map(p => ({
            slug: p.slug,
            url: `/${p.brand.toLowerCase()}/${p.categorySlug.toLowerCase()}/${p.slug}`,
            nameAr: p.translations?.ar?.name || p.slug,
            nameEn: p.translations?.en?.name || p.slug,
            brand: p.brand,
            category: p.categorySlug,
            price: p.price,
            stock: p.stock ?? 0,
            image: p.images?.[0]?.url || '',
        }));

    return <SearchClient locale={locale} index={index} />;
}
