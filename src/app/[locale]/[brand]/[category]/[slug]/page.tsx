import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFirestore } from '@/lib/firebase-admin';
import { getProductBySlug, getSmartRelatedProducts } from '@/lib/static-products';
import ProductPageClient from './ProductPageClient';
import { ProductSchema, BreadcrumbSchema, FAQSchema } from '@/components/schemas/ProductSchema';
import { SpeakableSchema } from '@/components/schemas/AEOSchemas';
import { calculateVerifiedAggregateRating } from '@/lib/verified-reviews';
import { getProductReviews as getStaticProductReviews, calculateAggregateRating as calcStaticAggregateRating } from '@/data/product-reviews';
import { getProductSEO } from '@/data/product-seo-enhancements';

type Props = {
    params: Promise<{ locale: string; brand: string; category: string; slug: string }>;
};

interface Product {
    id: string;
    slug: string;
    sku?: string;
    brand: string;
    categorySlug: string;
    price: number;
    originalPrice?: number;
    stock?: number;
    featured?: boolean;
    images?: Array<{ url: string; alt?: string; isPrimary?: boolean }>;
    translations?: {
        en?: { name?: string; description?: string; shortDescription?: string; features?: string[]; metaTitle?: string; metaDesc?: string; faqs?: Array<{ question: string; answer: string }> };
        ar?: { name?: string; description?: string; shortDescription?: string; features?: string[]; metaTitle?: string; metaDesc?: string; faqs?: Array<{ question: string; answer: string }> };
    };
    seo?: { keywords?: string; focusKeyword?: string; canonical?: string };
}

async function getProduct(slug: string): Promise<Product | null> {
    // First try static data
    const staticProduct = getProductBySlug(slug);
    if (staticProduct) {
        return {
            id: `static_${staticProduct.slug}`,
            ...staticProduct
        } as Product;
    }

    // Then try Firebase
    try {
        const db = await getFirestore();
        if (!db) return null;

        const snapshot = await db.collection('products')
            .where('slug', '==', slug)
            .limit(1)
            .get();

        if (snapshot.empty) return null;

        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Product;
    } catch (error) {
        console.warn(`Failed to fetch product ${slug} from Firebase`, error);
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, brand, category, slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return {
            title: locale === 'ar' ? 'المنتج غير موجود' : 'Product Not Found'
        };
    }

    const isArabic = locale === 'ar';
    const t = product.translations?.[isArabic ? 'ar' : 'en'] || product.translations?.en || {};

    // Dynamic meta title template with keyword-rich fallback
    const dynamicTitle = t.metaTitle || (isArabic
        ? `${t.name} — اشتري ${product.brand} اصلي في مصر | سعر ${product.price?.toLocaleString()} جنيه | كايرو فولت`
        : `${t.name} — Buy Original ${product.brand} in Egypt | ${product.price?.toLocaleString()} EGP | CairoVolt`);

    return {
        title: dynamicTitle,
        description: t.metaDesc || t.shortDescription || t.description?.substring(0, 160),
        keywords: product.seo?.keywords || '',
        openGraph: {
            title: dynamicTitle,
            description: t.metaDesc || t.shortDescription,
            siteName: isArabic ? 'كايرو فولت - مصر' : 'CairoVolt Egypt',
            images: product.images?.[0]?.url ? [{
                url: product.images[0].url,
                alt: isArabic
                    ? `${t.name} اصلي في مصر - توصيل سريع القاهرة والجيزة`
                    : `${t.name} Original Egypt - Fast Cairo Delivery`,
                width: 1200,
                height: 630,
            }] : [],
            locale: isArabic ? 'ar_EG' : 'en_US',
            countryName: 'Egypt',
        },
        // Product-specific OG meta tags for e-commerce
        other: {
            'geo.region': 'EG',
            'geo.placename': isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt',
            'geo.position': '30.0444;31.2357',
            'ICBM': '30.0444, 31.2357',
            'product:price:amount': String(product.price),
            'product:price:currency': 'EGP',
            'product:availability': (product.stock ?? 0) > 0 ? 'in stock' : 'out of stock',
            'product:condition': 'new',
            'product:brand': product.brand,
        },
        alternates: {
            canonical: isArabic
                ? `https://cairovolt.com/${brand.toLowerCase()}/${category.toLowerCase()}/${slug}`
                : `https://cairovolt.com/en/${brand.toLowerCase()}/${category.toLowerCase()}/${slug}`,
            languages: {
                'ar': `https://cairovolt.com/${brand.toLowerCase()}/${category.toLowerCase()}/${slug}`,
                'en': `https://cairovolt.com/en/${brand.toLowerCase()}/${category.toLowerCase()}/${slug}`,
                'x-default': `https://cairovolt.com/${brand.toLowerCase()}/${category.toLowerCase()}/${slug}`,
            }
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { locale, brand, category, slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    // Get static product for smart related products
    const staticProduct = getProductBySlug(slug);

    // Use smart algorithm to get related products (always returns products)
    // STRICT FILTER: Only show related products from the SAME BRAND to prevent cross-contamination
    const relatedProducts = staticProduct
        ? getSmartRelatedProducts(staticProduct, 8)
            .filter(p => p.brand.toLowerCase() === product.brand.toLowerCase())
            .map(p => ({ id: `static_${p.slug}`, ...p } as Product))
        : [];

    const productName = product.translations?.[locale as 'ar' | 'en']?.name || product.translations?.en?.name || '';
    const productDescription = product.translations?.[locale as 'ar' | 'en']?.description || product.translations?.en?.description || '';
    const isArabic = locale === 'ar';

    // Fetch verified aggregate rating for SEO Schema
    const verifiedAggregateRating = await calculateVerifiedAggregateRating(slug);

    // Get static product reviews for structured data (unique per product)
    const staticReviews = getStaticProductReviews(
        slug,
        category,
        {
            en: product.translations?.en?.name || slug.replace(/-/g, ' '),
            ar: product.translations?.ar?.name || slug.replace(/-/g, ' ')
        },
        product.price,
        {
            en: product.translations?.en?.features || ['quality'],
            ar: product.translations?.ar?.features || ['الجودة']
        }
    );

    // Map reviews to locale-specific content for schema
    const schemaReviews = staticReviews.map(r => ({
        author: r.author,
        rating: r.rating,
        reviewBody: isArabic ? r.reviewBody.ar : r.reviewBody.en,
        pros: r.pros ? (isArabic ? r.pros.ar : r.pros.en) : undefined,
        cons: r.cons ? (isArabic ? r.cons.ar : r.cons.en) : undefined,
        datePublished: r.datePublished,
        location: r.location,
    }));

    // Use verified rating if available, fall back to static reviews rating
    const staticAggregateRating = calcStaticAggregateRating(staticReviews);
    const aggregateRating = verifiedAggregateRating || (staticAggregateRating ? {
        ratingValue: staticAggregateRating.ratingValue,
        reviewCount: Number(staticAggregateRating.reviewCount),
        bestRating: Number(staticAggregateRating.bestRating),
        worstRating: Number(staticAggregateRating.worstRating),
    } : null);

    return (
        <>
            <ProductSchema
                product={{
                    ...product,
                    sku: product.sku || product.id,
                    stock: product.stock || 0,
                    translations: {
                        en: {
                            name: product.translations?.en?.name || '',
                            description: product.translations?.en?.description || ''
                        },
                        ar: {
                            name: product.translations?.ar?.name || '',
                            description: product.translations?.ar?.description || ''
                        }
                    },
                    images: product.images?.map(img => ({ url: img.url, alt: img.alt || '' })) || []
                }}
                locale={locale}
                aggregateRating={aggregateRating ? {
                    ratingValue: aggregateRating.ratingValue,
                    reviewCount: String(aggregateRating.reviewCount),
                    bestRating: String(aggregateRating.bestRating),
                    worstRating: String(aggregateRating.worstRating)
                } : undefined}
                reviews={schemaReviews}
                specifications={getProductSEO(slug)?.specifications}
            />

            {/* BreadcrumbSchema for navigation - STRICTLY using Product Data, not URL Params */}
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isArabic ? '' : '/en'}` },
                    { name: product.brand, url: `https://cairovolt.com${isArabic ? '' : '/en'}/${product.brand.toLowerCase()}` },
                    {
                        name: product.categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        url: `https://cairovolt.com${isArabic ? '' : '/en'}/${product.brand.toLowerCase()}/${product.categorySlug.toLowerCase()}`
                    },
                    { name: productName, url: `https://cairovolt.com${isArabic ? '' : '/en'}/${product.brand.toLowerCase()}/${product.categorySlug.toLowerCase()}/${product.slug}` },
                ]}
                locale={locale}
            />

            {/* SpeakableSchema for voice search */}
            <SpeakableSchema
                pageUrl={`https://cairovolt.com${isArabic ? '' : '/en'}/${brand}/${category}/${slug}`}
                speakableSelectors={['h1', '.product-description', '.product-features']}
                headline={productName}
                description={productDescription.substring(0, 200)}
                locale={locale}
            />

            {/* Product-Specific FAQSchema */}
            {(() => {
                const productFaqs = product.translations?.[isArabic ? 'ar' : 'en']?.faqs;
                return productFaqs && productFaqs.length > 0 ? (
                    <FAQSchema
                        faqs={productFaqs}
                        locale={locale}
                    />
                ) : null;
            })()}

            <ProductPageClient
                product={product}
                relatedProducts={relatedProducts}
                locale={locale}
                brand={brand}
                category={category}
            />
        </>
    );
}
