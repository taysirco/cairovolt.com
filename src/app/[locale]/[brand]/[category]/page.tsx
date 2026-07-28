import CategoryTemplate from '@/components/CategoryTemplate';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categoryContent } from '@/data/category-content';
import { getProductsByBrandAndCategory } from '@/lib/static-products';
import { staticProducts } from '@/lib/static-products';
import { ankerBestSellers, soundcoreBestSellers } from '@/components/products/BestSellingProducts';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';
import { resolveMinPriceToken } from '@/lib/meta-price-token';
import { isRecallAffectedSlug, isRecallStockVerifiedOutsideScope } from '@/lib/merchant-product-data';

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
    const localizedCategoryName = isArabic
        ? localizeArabicBrandNames(data.pageContent.ar.title)
        : data.pageContent.en.title;
    // The composed title always appends the geo token, so strip every occurrence
    // already present in the heading — not just a trailing one. Two shelves carry
    // it mid-string ("Anker Power Banks in Egypt by Capacity and Output"), and the
    // old end-anchored strip let those ship a title that said "in Egypt" twice.
    // Only the <title> is affected; pageContent.title still renders as the H1 with
    // its geo wording intact.
    const arCategoryName = localizeArabicBrandNames(data.pageContent.ar.title).replace(/\s*في مصر/gu, '').trim();
    const enCategoryName = data.pageContent.en.title.replace(/\s*\bin Egypt\b/gi, '').trim();
    // Strict lowercase for canonical URLs (URL best practice)
    const path = `${brandKey}/${categoryKey}`;

    // Use first product image from this category as social share image
    const categoryProducts = getLandingPageProducts(brandKey, categoryKey)
        .filter(product => product.images?.[0]?.url);
    const socialImageUrl = categoryProducts[0]?.images[0]?.url
        ? `https://cairovolt.com${categoryProducts[0].images[0].url}`
        : undefined;
    const rawSocialImageAlt = categoryProducts[0]?.images[0]?.alt
        || (isArabic ? `${localizedCategoryName} - كايرو فولت مصر` : `${localizedCategoryName} - CairoVolt Egypt`);
    const socialImageAlt = isArabic
        ? localizeArabicBrandNames(rawSocialImageAlt)
        : rawSocialImageAlt;

    // Get product count for this category
    const catProducts = getLandingPageProducts(brandKey, categoryKey);
    const productCount = catProducts.length;

    // Only advertise the product count when the shelf is deep enough to be a
    // selling point; thin categories (1-2 items) keep a humanized title instead
    // of boasting "1 Products".
    const arTitle = productCount >= 3
        ? `${arCategoryName} ⚡ ${productCount} منتج | الأسعار والتوصيل في مصر`
        : `${arCategoryName} ⚡ الأسعار والتوصيل في مصر`;
    const enTitle = productCount >= 3
        ? `${enCategoryName} in Egypt ⚡ ${productCount} Products | Prices & COD`
        : `${enCategoryName} in Egypt ⚡ Prices & COD`;

    const dynamicTitle = isArabic ? arTitle : enTitle;
    const localizedDescription = isArabic
        ? localizeArabicBrandNames(meta.description)
        : meta.description;
    // A description may quote this shelf's entry price with a {minPrice} token.
    const metaDescription = resolveMinPriceToken(localizedDescription, catProducts);
    const canonical = isArabic
        ? `https://cairovolt.com/${path}`
        : `https://cairovolt.com/en/${path}`;

    return {
        title: { absolute: dynamicTitle },
        description: metaDescription,
        keywords: isArabic
            ? localizeArabicBrandNames(meta.keywords)
            : meta.keywords,
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
            description: metaDescription,
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
            description: metaDescription,
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

    // Default order = curated catalogue picks first (the same order used by
    // brand hubs), then the rest in catalogue order. This drives both
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

    // Map to the interface expected by CategoryTemplate.
    //
    // CategoryTemplate is a CLIENT component, so every field handed to it is
    // serialised into the page's RSC payload and shipped to the browser. It
    // reads exactly six things per product (see its `displayProducts` memo):
    // id, slug, price, originalPrice, stock, categorySlug, `images[0].url`,
    // and `translations.{ar,en}.{name,shortDescription}`.
    //
    // Passing whole catalogue records instead put the full bilingual product
    // body — long HTML `description`, features, faqs, specifications,
    // metaTitle/metaDesc, buyer checklists — plus every gallery image into the
    // HTML of every category page, where nothing ever read it. Project down to
    // the fields actually consumed; the rendered output is byte-identical.
    const initialProducts = staticProducts.map(p => ({
        id: `static_${p.slug}`,
        slug: p.slug,
        brand: p.brand,
        categorySlug: p.categorySlug,
        price: p.price,
        originalPrice: p.originalPrice,
        stock: p.stock,
        // Resolved here rather than in the client component so the recall list
        // does not ship to the browser. See isRecallAffectedSlug for why this
        // cannot be derived from the product record alone.
        //
        // Stock that was serial-checked against the manufacturer's tool and found
        // outside the affected range does not carry the listing marker: a red
        // recall flag beside the price of a product we verified and sell would
        // mislead as badly as omitting it on one we did not. The product page
        // still discloses the programme and links the serial checker.
        recalled: isRecallAffectedSlug(p.slug) && !isRecallStockVerifiedOutsideScope(p.slug),
        // Only images[0] is rendered (the card thumbnail) — keep its shape, drop the gallery.
        images: p.images.slice(0, 1).map(img => ({ url: img.url, alt: img.alt, isPrimary: img.isPrimary })),
        translations: {
            ar: {
                name: p.translations?.ar?.name,
                shortDescription: p.translations?.ar?.shortDescription,
            },
            en: {
                name: p.translations?.en?.name,
                shortDescription: p.translations?.en?.shortDescription,
            },
        },
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
