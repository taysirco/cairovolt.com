import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFirestore } from '@/lib/firebase-admin';
import { getProductBySlug, getSmartRelatedProducts, getSmartBundleProducts, BRAND_FAMILIES } from '@/lib/static-products';
import ProductPageClient from './ProductPageClient';
import { ProductSchema, BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import { calculateVerifiedAggregateRating, getProductReviews as getVerifiedProductReviews } from '@/lib/verified-reviews';
import { productReviewsDb, calculateAggregateRating as calcStaticAggregateRating } from '@/data/product-reviews';
import { getProductDetailAsync } from '@/data/product-details';
import { ImageObjectSchema } from '@/components/schemas/ImageObjectSchema';
import { DeliveryStatus, LivePulseSkeleton } from '@/components/products/DeliveryStatus';
import { logger } from '@/lib/logger';
import ShareAnalytics from '@/components/content/ShareAnalytics';
import TabTakeover from '@/components/UX/TabTakeover';
import BrandVerification from '@/components/UX/BrandVerification';
import { getLabData, getLabMetrics } from '@/data/product-tests';
import { BostaTracker } from '@/lib/bosta';
import { unstable_cache } from 'next/cache';

import { buildManifest, signManifest } from '@/lib/media-verification';

// ISR: Revalidate every hour + on-demand via /api/indexing webhook
// Removing headers() allows true SSG → pages served as static HTML from CDN
export const revalidate = 3600;
export const dynamicParams = true;

type Props = {
    params: Promise<{ locale: string; brand: string; category: string; slug: string }>;
};

export async function generateStaticParams() {
    const { staticProducts } = await import('@/lib/static-products');
    const locales = ['ar', 'en'];
    return locales.flatMap(locale =>
        staticProducts.map(p => ({
            locale,
            brand: p.brand.toLowerCase(),
            category: p.categorySlug.toLowerCase(),
            slug: p.slug,
        }))
    );
}

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
    meta?: { keywords?: string; mainTerm?: string; canonical?: string };
    contentCredentials?: Record<string, unknown> | null;
}

// Default Cairo temperature — client-side component will fetch real value lazily.
// Moved off the critical SSR path to reduce TTFB by ~200-500ms.
const DEFAULT_CAIRO_TEMP = 30;

async function trySignProduct(name: string): Promise<Record<string, unknown> | null> {
    try {
        const manifest = buildManifest({ title: name, format: 'image/jpeg', captureMethod: 'c2pa.captured' });
        return (await signManifest(manifest)) as unknown as Record<string, unknown>;
    } catch {
        return null;
    }
}

// Default governorate for SSG — client-side detection in ProductPageClient
const DEFAULT_GOV = { slug: 'cairo', display: 'Cairo' };

async function getProduct(slug: string): Promise<Product | null> {
    // First try static data
    const staticProduct = getProductBySlug(slug);
    if (staticProduct) {
        const name = staticProduct.translations?.en?.name || slug;
        return {
            id: `static_${staticProduct.slug}`,
            ...staticProduct,
            contentCredentials: await trySignProduct(name),
        } as Product;
    }

    // Then try Firebase (direct doc lookup using slug as doc ID — O(1))
    try {
        const db = await getFirestore();
        if (!db) return null;

        const docRef = db.collection('products').doc(slug);
        const doc = await docRef.get();

        if (!doc.exists) return null;

        const docData = doc.data()!;
        // If Firestore product has no credentials yet, sign on-the-fly
        if (!docData.contentCredentials) {
            const name = (docData.translations?.en?.name as string | undefined) || slug;
            docData.contentCredentials = await trySignProduct(name);
        }
        return { id: doc.id, ...docData } as Product;
    } catch (error) {
        logger.warn(`Failed to fetch product ${slug} from Firebase`, error);
        return null;
    }
}

const getCachedProduct = unstable_cache(
    async (slug: string) => getProduct(slug),
    ['product-cache'],
    { revalidate: 3600, tags: ['products'] }
);

const getCachedAggregateRating = unstable_cache(
    async (slug: string) => calculateVerifiedAggregateRating(slug),
    ['aggregate-rating'],
    { revalidate: 3600, tags: ['reviews'] }
);

// Verified customer reviews (real orders, token-gated submissions) for JSON-LD.
// Mapped to plain serializable fields up-front: unstable_cache round-trips
// through JSON, so Date objects would silently become strings on cache hits.
const getCachedVerifiedReviews = unstable_cache(
    async (slug: string) => {
        const reviews = await getVerifiedProductReviews(slug);
        return reviews.map(r => ({
            customerName: r.customerName,
            rating: r.rating,
            reviewText: r.reviewText,
            pros: r.pros,
            cons: r.cons,
            reviewDate: new Date(r.reviewDate).toISOString().split('T')[0],
            governorate: r.governorate,
        }));
    },
    ['verified-reviews-schema'],
    { revalidate: 3600, tags: ['reviews'] }
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, brand, category, slug } = await params;
    const product = await getCachedProduct(slug);

    if (!product) {
        return {
            title: locale === 'ar' ? 'المنتج غير موجود' : 'Product Not Found'
        };
    }

    const isArabic = locale === 'ar';
    const t = product.translations?.[isArabic ? 'ar' : 'en'] || product.translations?.en || {};

    // CTR-optimized title with dynamic discount calculation
    const origPrice = product.originalPrice ?? product.price;
    const discountPct = origPrice > product.price
        ? Math.round((1 - product.price / origPrice) * 100)
        : 0;
    const hasDiscount = discountPct >= 5;

    const arFallbackTitle = hasDiscount
        ? `${t.name} الأصلي ⚡ خصم ${discountPct}% | ضمان رسمي | ادفع عند الاستلام`
        : `${t.name} الأصلي ⚡ ضمان رسمي | ادفع عند الاستلام`;

    const enFallbackTitle = hasDiscount
        ? `${t.name} ⚡ ${discountPct}% OFF | Official Warranty | COD Egypt`
        : `${t.name} ⚡ Official Warranty | COD Egypt`;

    const dynamicTitle = t.metaTitle || (isArabic ? arFallbackTitle : enFallbackTitle);

    return {
        title: { absolute: dynamicTitle },
        description: t.metaDesc || t.shortDescription || t.description?.substring(0, 160),
        keywords: product.meta?.keywords || '',
        openGraph: {
            title: dynamicTitle,
            description: t.metaDesc || t.shortDescription,
            siteName: isArabic ? 'كايرو فولت - مصر' : 'CairoVolt Egypt',
            type: 'article',
            images: product.images?.[0]?.url ? [{
                url: product.images[0].url.startsWith('http')
                    ? product.images[0].url
                    : `https://cairovolt.com${product.images[0].url}`,
                // Use the real descriptive alt from the product data, not a generic fallback
                alt: product.images[0].alt ||
                    (isArabic
                        ? `${t.name} - كايرو فولت مصر`
                        : `${t.name} - CairoVolt Egypt`),
                width: 1200,
                height: 630,
            }] : [],
            locale: isArabic ? 'ar_EG' : 'en_US',
            countryName: 'Egypt',
        },
        twitter: {
            card: 'summary_large_image',
            title: dynamicTitle,
            description: t.metaDesc || t.shortDescription,
            // Use product image — not the logo (logo gives zero visual context for the product)
            images: product.images?.[0]?.url ? [
                product.images[0].url.startsWith('http')
                    ? product.images[0].url
                    : `https://cairovolt.com${product.images[0].url}`
            ] : ['https://cairovolt.com/og-cover.png'],
            creator: '@cairovolt',
            site: '@cairovolt',
        },
        // Product-specific OG meta tags for e-commerce
        other: {
            'geo.region': 'EG',
            'geo.placename': isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt',
            'geo.position': '30.0444;31.2357',
            'ICBM': '30.0444, 31.2357',
            'product:price:amount': String(product.price),
            'product:price:currency': 'EGP',
            'product:availability': (product.stock ?? 0) > 0 ? 'in stock' : 'available for order',
            'product:condition': 'new',
            'product:brand': product.brand,
        },
        alternates: {
            canonical: isArabic
                ? `https://cairovolt.com/${brand.toLowerCase()}/${category.toLowerCase()}/${slug}`
                : `https://cairovolt.com/en/${brand.toLowerCase()}/${category.toLowerCase()}/${slug}`,
            languages: {
                'ar-EG': `https://cairovolt.com/${brand.toLowerCase()}/${category.toLowerCase()}/${slug}`,
                'en-EG': `https://cairovolt.com/en/${brand.toLowerCase()}/${category.toLowerCase()}/${slug}`,
                'x-default': `https://cairovolt.com/${brand.toLowerCase()}/${category.toLowerCase()}/${slug}`,
            }
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { locale, brand, category, slug } = await params;
    const product = await getCachedProduct(slug);

    if (!product) {
        notFound();
    }

    // Default delivery stats for SSG — client can refine via geolocation API
    const deliveryStats = BostaTracker.getRegionalStats(DEFAULT_GOV.slug, locale);

    // Get lab metrics for Trust Matrix
    const labMetrics = getLabMetrics(slug);

    // Product detail — computed once, used for schema + client props
    const productDetailData = (await getProductDetailAsync(slug)) || null;

    // Get static product for smart related products
    const staticProduct = getProductBySlug(slug);

    // Use smart algorithm to get related products (always returns products)
    // STRICT FILTER: Only show related products from the SAME BRAND to prevent cross-contamination
    const relatedProducts = staticProduct
        ? getSmartRelatedProducts(staticProduct, 8)
            .filter(p => {
                const family = BRAND_FAMILIES[product.brand.toLowerCase()] || [product.brand.toLowerCase()];
                return family.includes(p.brand.toLowerCase());
            })
            .map(p => ({
                id: `static_${p.slug}`,
                slug: p.slug,
                sku: p.sku, // 🧬 نمرّر بصمة SKU للسلة (كانت تُسقَط هنا → كومبو بلا sku)
                brand: p.brand,
                categorySlug: p.categorySlug,
                price: p.price,
                originalPrice: p.originalPrice,
                images: p.images?.[0] ? [{ url: p.images[0].url }] : [],
                translations: {
                    en: { name: p.translations?.en?.name },
                    ar: { name: p.translations?.ar?.name },
                },
            } as Product))
        : [];

    // Smart bundle data with reasons, discount, and daily cost
    const bundleData = staticProduct
        ? (() => {
            const result = getSmartBundleProducts(staticProduct);
            return {
                bundleProducts: result.bundleProducts.map(bp => ({
                    product: {
                        id: `static_${bp.product.slug}`,
                        slug: bp.product.slug,
                        sku: bp.product.sku, // 🧬 بصمة SKU لقطعة الكومبو — تصل للسلة ثم للـCRM
                        brand: bp.product.brand,
                        categorySlug: bp.product.categorySlug,
                        price: bp.product.price,
                        originalPrice: bp.product.originalPrice,
                        images: bp.product.images?.[0] ? [{ url: bp.product.images[0].url }] : [],
                        translations: {
                            en: { name: bp.product.translations?.en?.name },
                            ar: { name: bp.product.translations?.ar?.name },
                        },
                    } as Product,
                    slot: bp.slot,
                    reason: bp.reason,
                })),
                bundleDiscount: result.bundleDiscount,
                fullBundlePrice: result.fullBundlePrice,
                dailyCost: result.dailyCost,
                totalSavings: result.totalSavings,
            };
        })()
        : undefined;

    const productName = product.translations?.[locale as 'ar' | 'en']?.name || product.translations?.en?.name || '';
    const productDescription = product.translations?.[locale as 'ar' | 'en']?.description || product.translations?.en?.description || '';
    const isArabic = locale === 'ar';

    // Reuse C2PA credential already generated during product data fetch (lines 108/126)
    const c2paHash = product.contentCredentials?.signature
        ? String(product.contentCredentials.signature).slice(0, 32)
        : undefined;

    // CairoVolt Labs first-party test data
    const labInfo = getLabData(slug);

    // Fetch verified aggregate rating for Structured Data (Cached)
    const verifiedAggregateRating = await getCachedAggregateRating(slug);

    // Structured data mirrors EXACTLY what the reviews UI displays (/api/reviews
    // merge semantics): purchase-verified Firebase reviews first, then the
    // displayed testimonials deduplicated by author. Google's review-snippet
    // rule is that markup reflect the ratings visible on the page — the UI
    // already renders this merged set with its aggregate, so the schema must
    // carry the same data, no more and no less.
    const verifiedReviews = await getCachedVerifiedReviews(slug);
    const verifiedSchemaReviews = verifiedReviews.map(r => ({
        author: r.customerName,
        rating: r.rating,
        reviewBody: r.reviewText,
        pros: r.pros,
        cons: r.cons,
        datePublished: r.reviewDate,
        location: r.governorate,
    }));
    const isArabicLocale = locale === 'ar';
    const staticReviews = productReviewsDb[slug] || [];
    const verifiedAuthors = new Set(verifiedReviews.map(r => r.customerName));
    const staticSchemaReviews = staticReviews
        .filter(r => !verifiedAuthors.has(r.author))
        .map(r => ({
            author: r.author,
            rating: r.rating,
            // Locale-first body with cross-language fallback (some early seed
            // reviews have AR text only) — never emit an empty reviewBody.
            reviewBody: (isArabicLocale ? r.reviewBody.ar : r.reviewBody.en) || r.reviewBody.ar || r.reviewBody.en,
            pros: r.pros ? ((isArabicLocale ? r.pros.ar : r.pros.en) || r.pros.ar) : undefined,
            cons: r.cons ? ((isArabicLocale ? r.cons.ar : r.cons.en) || r.cons.ar) : undefined,
            datePublished: r.datePublished,
            location: r.location,
        }))
        .filter(r => r.reviewBody);
    const schemaReviews = [...verifiedSchemaReviews, ...staticSchemaReviews];

    // Aggregate rating: verified-first (3+ real reviews), else the same static
    // average the UI's rating widget shows — computed over the displayed set.
    let aggregateRating = verifiedAggregateRating;
    if (!aggregateRating && schemaReviews.length >= 3) {
        const staticAgg = calcStaticAggregateRating(staticReviews);
        if (staticAgg) {
            aggregateRating = {
                ratingValue: staticAgg.ratingValue,
                reviewCount: schemaReviews.length,
                bestRating: 5,
                worstRating: 1,
            };
        }
    }

    // LCP Preload: responsive preload that matches the hero <img srcset>.
    // On mobile (≤640px) the browser preloads the lighter 480px variant (~10 KB);
    // on desktop it preloads the 800px variant (~21 KB). imageSrcset/imageSizes
    // on <link rel="preload"> deduplicates with the matching <img srcset>,
    // collapsing preload + paint into a single network request.
    const primaryImageUrl = product.images?.[0]?.url;
    const preloadImage800 = primaryImageUrl
        ? primaryImageUrl.replace(/\.webp$/, '-800.webp')
        : null;
    const preloadImage480 = primaryImageUrl
        ? primaryImageUrl.replace(/\.webp$/, '-480.webp')
        : null;

    return (
        <>
            {/* LCP Image Preload — responsive srcset matches hero <img> */}
            {preloadImage800 && preloadImage480 && (
                <link
                    rel="preload"
                    as="image"
                    type="image/webp"
                    imageSrcSet={`${preloadImage480} 480w, ${preloadImage800} 800w`}
                    imageSizes="(max-width: 640px) 480px, 800px"
                    fetchPriority="high"
                />
            )}
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
                specifications={productDetailData?.specifications}
                isAccessoryOrSparePartFor={labInfo?.isAccessoryFor || (category === 'power-banks' ? [
                    { name: 'WE VDSL Router' },
                    { name: 'Apple MacBook Pro' },
                    { name: 'iPhone' },
                ] : undefined)}
                expertReview={(() => {
                    // Priority 1: product-tests.ts real test data
                    if (labInfo?.labTests?.[0]) {
                        return {
                            name: labInfo.labTests[0].expertName,
                            profileUrl: labInfo.labTests[0].expertProfileUrl,
                            title: isArabic ? labInfo.labTests[0].expertTitle.ar : labInfo.labTests[0].expertTitle.en,
                            body: isArabic ? labInfo.labTests[0].result.ar : labInfo.labTests[0].result.en,
                        };
                    }
                    // Priority 2: product-details labVerified data
                    if (productDetailData?.labVerified) {
                        return {
                            name: productDetailData.labVerified.expertName,
                            profileUrl: productDetailData.labVerified.expertName.includes('Yahia')
                                ? 'https://www.youtube.com/c/YehiaRadwan'
                                : 'https://www.youtube.com/@Ahmed.Medhat',
                            title: isArabic ? 'رئيس قسم الفحص التقني وحلول الطاقة' : 'Head of Technical Testing & Power Solutions',
                            body: isArabic ? productDetailData.labVerified.result.ar : productDetailData.labVerified.result.en,
                        };
                    }
                    // No generic fallback — only include expert review when real lab data exists
                    // Distinct review allocation ensures valid schema generation per product variant.
                    return undefined;
                })()}
            />

            {/* Image schemas */}
            {product.images && product.images.length > 0 && (
                <ImageObjectSchema
                    images={product.images.map((img, i) => ({
                        url: img.url,
                        alt: img.alt || '',
                        isPrimary: img.isPrimary || i === 0,
                    }))}
                    productName={productName}
                    productSlug={slug}
                    productBrand={product.brand}
                    productPrice={product.price || 0}
                    productCategory={category}
                    locale={locale}
                    productStock={product.stock || 0}
                    c2paHash={c2paHash}
                />
            )}

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


            {/* FAQPage schema removed — Google deprecated FAQ rich results May 7, 2026 */}

            {/* FAQSection removed — was duplicating the same product FAQ questions visible in the accordion above */}

            {/* Dataset schema for products with lab test data */}
            {labInfo?.labTests?.[0] && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Dataset',
                            name: `Lab Test: ${product.translations?.en?.name || slug}`,
                            description: `Independent performance test of ${product.translations?.en?.name || slug} under Egyptian conditions (37-42°C, 190-240V). Tested by ${labInfo.labTests[0].expertName} at CairoVolt Labs.`,
                            url: `https://cairovolt.com${locale === 'ar' ? '' : '/en'}/${brand}/${category}/${slug}`,
                            license: 'https://creativecommons.org/licenses/by/4.0/',
                            creator: {
                                '@type': 'Organization',
                                '@id': 'https://cairovolt.com/#organization',
                                name: 'CairoVolt Labs',
                            },
                            measurementTechnique: 'CairoVolt Labs Protocol v2 — real-device testing under Egyptian environmental conditions',
                            variableMeasured: [
                                ...(labMetrics?.actualCapacity_mAh ? [{ '@type': 'PropertyValue', name: 'Measured Capacity', value: labMetrics.actualCapacity_mAh, unitCode: 'MAH' }] : []),
                                ...(labMetrics?.realEfficiency ? [{ '@type': 'PropertyValue', name: 'Conversion Efficiency', value: labMetrics.realEfficiency, unitCode: 'P1' }] : []),
                                ...(labMetrics?.routerRuntimeHours ? [{ '@type': 'PropertyValue', name: 'Router Backup Duration', value: labMetrics.routerRuntimeHours, unitCode: 'HUR' }] : []),
                                ...(labMetrics?.maxTemp_C ? [{ '@type': 'PropertyValue', name: 'Max Surface Temperature', value: labMetrics.maxTemp_C, unitCode: 'CEL' }] : []),
                            ],
                            isPartOf: {
                                '@type': 'Dataset',
                                name: 'CairoVolt Egypt Charger Lab Tests',
                                description: 'Independent lab testing dataset of chargers, power banks, cables, and audio accessories under real Egyptian conditions (37-42°C ambient, 190-240V grid voltage). All tests conducted by certified engineers using calibrated USB power meters.',
                                url: 'https://cairovolt.com/api/lab-data/json',
                                license: 'https://creativecommons.org/licenses/by/4.0/',
                                creator: {
                                    '@type': 'Organization',
                                    '@id': 'https://cairovolt.com/#organization',
                                    name: 'CairoVolt Hardware Validation Labs',
                                },
                            },
                        })
                    }}
                />
            )}

            {/* Client-side UX components */}
            <ShareAnalytics />
            <TabTakeover productName={productName} />
            <BrandVerification brand={brand} locale={locale} />

            <ProductPageClient
                product={{
                    id: product.id,
                    slug: product.slug,
                    sku: product.sku,
                    brand: product.brand,
                    categorySlug: product.categorySlug,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    stock: product.stock,
                    featured: product.featured,
                    images: product.images?.map(img => ({ url: img.url, alt: img.alt, isPrimary: img.isPrimary })),
                    translations: {
                        [locale]: {
                            name: product.translations?.[locale as 'ar' | 'en']?.name,
                            description: product.translations?.[locale as 'ar' | 'en']?.description,
                            faqs: product.translations?.[locale as 'ar' | 'en']?.faqs,
                        },
                    } as Product['translations'],
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    expertOpinion: (product as any).expertOpinion,
                    contentCredentials: product.contentCredentials?.signature
                        ? { signature: product.contentCredentials.signature }
                        : null,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    variants: (product as any).variants,
                } as Product}
                relatedProducts={relatedProducts}
                bundleData={bundleData}
                locale={locale}
                brand={brand}
                category={category}
                labTestData={(() => {
                    // Priority 1: product-tests.ts full test data
                    if (labInfo?.labTests?.[0]) {
                        return {
                            testScenario: isArabic ? labInfo.labTests[0].scenario.ar : labInfo.labTests[0].scenario.en,
                            testResult: isArabic ? labInfo.labTests[0].result.ar : labInfo.labTests[0].result.en,
                            testConditions: isArabic ? labInfo.labTests[0].conditions.ar : labInfo.labTests[0].conditions.en,
                            expertName: labInfo.labTests[0].expertName,
                            expertProfileUrl: labInfo.labTests[0].expertProfileUrl,
                        };
                    }
                    // Priority 2: product-details labVerified data
                    if (productDetailData?.labVerified) {
                        return {
                            testScenario: isArabic ? productDetailData.localContext.ar : productDetailData.localContext.en,
                            testResult: isArabic ? productDetailData.labVerified.result.ar : productDetailData.labVerified.result.en,
                            testConditions: isArabic ? productDetailData.labVerified.conditions.ar : productDetailData.labVerified.conditions.en,
                            expertName: productDetailData.labVerified.expertName,
                            expertProfileUrl: productDetailData.labVerified.expertName.includes('Yahia')
                                ? 'https://www.youtube.com/c/YehiaRadwan'
                                : 'https://www.youtube.com/@Ahmed.Medhat',
                        };
                    }
                    return undefined;
                })()}
                thermalAdvice={{ currentTemp: DEFAULT_CAIRO_TEMP, category }}
                deliveryIntelligence={deliveryStats}
                labMetrics={labMetrics}
                userGovernorate={DEFAULT_GOV.display}
                productDetail={productDetailData ? {
                    aiTldr: productDetailData.aiTldr,
                    localContext: productDetailData.localContext,
                    specifications: productDetailData.specifications,
                } : null}
            />

            {/* Live delivery tracking — streamed dynamically via Suspense */}
            <Suspense fallback={<LivePulseSkeleton />}>
                <DeliveryStatus
                    sku={product.sku || product.id}
                    locale={locale}
                    brandColor={product.brand.toLowerCase() === 'joyroom' ? 'red' : 'blue'}
                />
            </Suspense>
        </>
    );
}
