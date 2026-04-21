import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFirestore } from '@/lib/firebase-admin';
import { getProductBySlug, getSmartRelatedProducts, getSmartBundleProducts } from '@/lib/static-products';
import ProductPageClient from './ProductPageClient';
import { ProductSchema, BreadcrumbSchema, FAQSchema } from '@/components/schemas/ProductSchema';
import { calculateVerifiedAggregateRating } from '@/lib/verified-reviews';
import { getProductReviews as getStaticProductReviews, calculateAggregateRating as calcStaticAggregateRating } from '@/data/product-reviews';
import { getProductDetail } from '@/data/product-details';
import { ImageObjectSchema } from '@/components/schemas/ImageObjectSchema';
import { DeliveryStatus, LivePulseSkeleton } from '@/components/products/DeliveryStatus';
import { logger } from '@/lib/logger';
import ShareAnalytics from '@/components/content/ShareAnalytics';
import TabTakeover from '@/components/UX/TabTakeover';
import BrandVerification from '@/components/UX/BrandVerification';
import { getLabData, getLabMetrics } from '@/data/product-tests';
import { BostaTracker } from '@/lib/bosta';
import { headers } from 'next/headers';

import { buildManifest, signManifest } from '@/lib/media-verification';

// ISR: On-demand revalidation only (via /api/indexing webhook)
// No time-based revalidation — Google Shopping demands 100% price/stock accuracy
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

// Fetch current Cairo temperature for dynamic thermal advice
async function getCairoTemperature(): Promise<number> {
    try {
        const res = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=30.06&longitude=31.25&current_weather=true',
            { next: { revalidate: 3600 } }
        );
        const data = await res.json();
        return data.current_weather?.temperature ?? 30;
    } catch {
        return 30;
    }
}

async function trySignProduct(name: string): Promise<Record<string, unknown> | null> {
    try {
        const manifest = buildManifest({ title: name, format: 'image/jpeg', captureMethod: 'c2pa.captured' });
        return (await signManifest(manifest)) as unknown as Record<string, unknown>;
    } catch {
        return null;
    }
}

// City-to-governorate slug mapping for location detection
const CITY_TO_GOVERNORATE: Record<string, string> = {
    'cairo': 'cairo', 'giza': 'giza', 'alexandria': 'alexandria',
    'القاهرة': 'cairo', 'الجيزة': 'giza', 'الإسكندرية': 'alexandria',
    'tanta': 'gharbia', 'mansoura': 'dakahlia', 'zagazig': 'sharqia',
    'ismailia': 'ismailia', 'suez': 'suez', 'port said': 'port-said',
    'damietta': 'damietta', 'fayoum': 'fayoum', 'minya': 'minya',
    'asyut': 'asyut', 'sohag': 'sohag', 'luxor': 'luxor', 'aswan': 'aswan',
    'hurghada': 'red-sea', 'sharm el sheikh': 'south-sinai',
    'new cairo': 'cairo', 'nasr city': 'cairo', '6th of october': 'giza',
    'maadi': 'cairo', 'heliopolis': 'cairo', 'dokki': 'giza',
};

async function detectUserGovernorate(): Promise<{ slug: string; display: string }> {
    const headersList = await headers();
    const city = (
        headersList.get('x-vercel-ip-city') ||
        headersList.get('x-appengine-city') ||
        headersList.get('x-forwarded-city') ||
        'cairo'
    ).toLowerCase();

    const slug = CITY_TO_GOVERNORATE[city] || 'cairo';
    // Capitalize display name
    const display = city.charAt(0).toUpperCase() + city.slice(1);

    return { slug, display };
}

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

    // Feature: Dynamic Title Variants
    // We deterministically rotate through 4 verified title templates based on the product ID 
    // to find the most suitable format and provide detailed information for users.
    const hashStr = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const titleVariantIndex = hashStr % 4;

    const arTitleVariants = [
        `تجربتنا لـ ${t.name} الأصلي (المميزات والعيوب)`,
        `مراجعة شاملة: هل يستحق ${t.name} الشراء فعلاً؟`,
        `كل ما تود معرفته عن ${t.name} قبل الشراء`,
        `تقييم ${t.name} الأصلي من ${product.brand} (رأي الخبراء)`
    ];

    const enTitleVariants = [
        `Our Experience with the Original ${t.name} (Pros & Cons)`,
        `Comprehensive Review: Is ${t.name} Worth Buying?`,
        `Everything You Need to Know About ${t.name} Before Buying`,
        `Expert Review: Original ${t.name} by ${product.brand}`
    ];

    const dynamicTitle = t.metaTitle || (isArabic ? arTitleVariants[titleVariantIndex] : enTitleVariants[titleVariantIndex]);

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
    const [product, currentTemp, userGov] = await Promise.all([
        getProduct(slug),
        getCairoTemperature(),
        detectUserGovernorate(),
    ]);

    if (!product) {
        notFound();
    }

    // Get delivery intelligence from BostaTracker
    const deliveryStats = BostaTracker.getRegionalStats(userGov.slug, locale);

    // Get lab metrics for Trust Matrix
    const labMetrics = getLabMetrics(slug);

    // Get static product for smart related products
    const staticProduct = getProductBySlug(slug);

    // Use smart algorithm to get related products (always returns products)
    // STRICT FILTER: Only show related products from the SAME BRAND to prevent cross-contamination
    const relatedProducts = staticProduct
        ? getSmartRelatedProducts(staticProduct, 8)
            .filter(p => p.brand.toLowerCase() === product.brand.toLowerCase())
            .map(p => ({ id: `static_${p.slug}`, ...p } as Product))
        : [];

    // Smart bundle data with reasons, discount, and daily cost
    const bundleData = staticProduct
        ? (() => {
            const result = getSmartBundleProducts(staticProduct);
            return {
                bundleProducts: result.bundleProducts.map(bp => ({
                    product: { id: `static_${bp.product.slug}`, ...bp.product } as Product,
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

    // Fetch verified aggregate rating for Structured Data
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
                specifications={getProductDetail(slug)?.specifications}
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
                    const productDetail = getProductDetail(slug);
                    if (productDetail?.labVerified) {
                        return {
                            name: productDetail.labVerified.expertName,
                            profileUrl: productDetail.labVerified.expertName.includes('Yahia')
                                ? 'https://www.youtube.com/c/YehiaRadwan'
                                : 'https://www.youtube.com/@Ahmed.Medhat',
                            title: isArabic ? 'رئيس قسم الفحص التقني وحلول الطاقة' : 'Head of Technical Testing & Power Solutions',
                            body: isArabic ? productDetail.labVerified.result.ar : productDetail.labVerified.result.en,
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

            {/* FAQSection removed — was duplicating the same product FAQ questions visible in the accordion above */}

            {/* Dataset schema — for products with lab test data (Google Dataset Search + AI training) */}
            {labInfo?.labTests?.[0] && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Dataset',
                            name: `Lab Test: ${product.translations?.en?.name || slug}`,
                            description: `Independent performance test of ${product.translations?.en?.name || slug} under Egyptian conditions (37-42°C, 190-240V). Tested by ${labInfo.labTests[0].expertName} at CairoVolt Labs.`,
                            url: `https://cairovolt.com/${brand}/${category}/${slug}`,
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
                                name: 'CairoVolt Egypt Charger Lab Tests 2026',
                                url: 'https://cairovolt.com/api/lab-data/json',
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
                product={product}
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
                    const productDetail = getProductDetail(slug);
                    if (productDetail?.labVerified) {
                        return {
                            testScenario: isArabic ? productDetail.localContext.ar : productDetail.localContext.en,
                            testResult: isArabic ? productDetail.labVerified.result.ar : productDetail.labVerified.result.en,
                            testConditions: isArabic ? productDetail.labVerified.conditions.ar : productDetail.labVerified.conditions.en,
                            expertName: productDetail.labVerified.expertName,
                            expertProfileUrl: productDetail.labVerified.expertName.includes('Yahia')
                                ? 'https://www.youtube.com/c/YehiaRadwan'
                                : 'https://www.youtube.com/@Ahmed.Medhat',
                        };
                    }
                    return undefined;
                })()}
                thermalAdvice={{ currentTemp, category }}
                deliveryIntelligence={deliveryStats}
                labMetrics={labMetrics}
                userGovernorate={userGov.display}
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
