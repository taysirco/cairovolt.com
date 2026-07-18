import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFirestore } from '@/lib/firebase-admin';
import { getProductBySlug, getSmartRelatedProducts, getSmartBundleProducts, BRAND_FAMILIES } from '@/lib/static-products';
import ProductPageClient from './ProductPageClient';
import { ProductSchema, BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import { calculateVerifiedAggregateRating, getProductReviews as getVerifiedProductReviews } from '@/lib/verified-reviews';
import { getProductDetailAsync } from '@/data/product-details';
import { ImageObjectSchema } from '@/components/schemas/ImageObjectSchema';
import { DeliveryStatus, LivePulseSkeleton } from '@/components/products/DeliveryStatus';
import { logger } from '@/lib/logger';
import ShareAnalytics from '@/components/content/ShareAnalytics';
import { BostaTracker } from '@/lib/bosta';
import { getMerchantProductBrandSlug } from '@/lib/merchant-product-data';
import { categoryContent } from '@/data/category-content';
import { unstable_cache } from 'next/cache';
import {
    getBrandDisplayName,
    localizeArabicFields,
    localizeArabicBrandContent,
    localizeArabicBrandHtml,
    localizeArabicBrandNames,
} from '@/lib/arabic-brand-names';
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
    images?: Array<{ url: string; alt?: string; isPrimary?: boolean; width?: number; height?: number }>;
    translations?: {
        en?: { name?: string; description?: string; shortDescription?: string; features?: string[]; metaTitle?: string; metaDesc?: string; faqs?: Array<{ question: string; answer: string }> };
        ar?: { name?: string; description?: string; shortDescription?: string; features?: string[]; metaTitle?: string; metaDesc?: string; faqs?: Array<{ question: string; answer: string }> };
    };
    meta?: { keywords?: string; mainTerm?: string; canonical?: string };
}

/**
 * Preserve the catalogue's query-specific metadata while removing only legal
 * or absolute wording that CairoVolt cannot substantiate as a manufacturer or
 * authorised representative. Product specifications and buying intent remain
 * untouched so every page keeps its distinct search value.
 */
function sanitizeCuratedMetadata(value: string | undefined, isArabic: boolean): string {
    if (!value?.trim()) return '';

    const warrantyLabel = isArabic ? 'ضمان كايرو فولت' : 'CairoVolt Warranty';
    const storeLabel = isArabic ? 'متجر كايرو فولت' : 'CairoVolt store';
    let sanitized = value;

    sanitized = sanitized
        // Do not imply a manufacturer/agent warranty; identify the store warranty.
        .replace(/\b(?:official|manufacturer(?:'s)?)\s+warranty\b/giu, warrantyLabel)
        .replace(/\bofficial\s+(?:Anker|Soundcore|Joyroom|انكر|ساوندكور|جوي\s*روم)\s+warranty\b/giu, warrantyLabel)
        .replace(/\b(?:Anker|Soundcore|Joyroom)\s+(?:official\s+)?warranty\b/giu, warrantyLabel)
        .replace(/(?:انكر|ساوندكور|جوي\s*روم)\s+(?:official\s+)?warranty\b/giu, warrantyLabel)
        .replace(/(?:الضمان\s+(?:الرسمي|المعتمد)|ضمان\s+(?:رسمي|الوكيل|الشركة\s+المصنعة|انكر|ساوندكور|جوي\s*روم))/gu, warrantyLabel)
        // Do not present CairoVolt as an authorised representative of a brand.
        .replace(/\b(?:official|authorized)\s+(?:(?:Anker|Soundcore|Joyroom|انكر|ساوندكور|جوي\s*روم)\s+)?(?:dealer|distributor|reseller|agent)\b/giu, storeLabel)
        .replace(/(?:(?:الوكيل|الموزع|المتجر)\s+(?:الرسمي|المعتمد)|(?:وكيل|موزع)\s+(?:انكر|ساوندكور|جوي\s*روم)\s+(?:رسمي|معتمد))/gu, storeLabel)
        // Keep the authenticity term, but remove an unsupported absolute promise.
        .replace(/\b100\s*%\s*(?:guaranteed\s+)?(original|genuine|authentic)\b/giu, '$1')
        .replace(/\b(original|genuine|authentic)\s*100\s*%(?:\s*guaranteed\b)?/giu, '$1')
        .replace(/\b100\s*%\s*guaranteed\b|\bguaranteed\s*100\s*%/giu, isArabic ? 'وفق الشروط' : 'terms apply')
        .replace(/100\s*[%٪]\s*(?:مضمون\s*)?(أصلي|اصلي|أصلية|اصلية)/gu, '$1')
        .replace(/(أصلي|اصلي|أصلية|اصلية)\s*100\s*[%٪]/gu, '$1')
        .replace(/مضمون\s*100\s*[%٪]/gu, 'وفق الشروط');

    if (isArabic) {
        sanitized = localizeArabicBrandNames(sanitized);
    }

    sanitized = sanitized
        .replace(/\s{2,}/gu, ' ')
        .replace(/\s+([,.;:!?،؛])/gu, '$1')
        .replace(/\|\s*\|/gu, '|')
        .replace(/^\s*[|•·]\s*|\s*[|•·]\s*$/gu, '')
        .trim();

    return sanitized;
}

// Default governorate for SSG — client-side detection in ProductPageClient
const DEFAULT_GOV = { slug: 'cairo', display: 'Cairo' };

/**
 * A product is served only at its one true path. The brand segment must match
 * the record's public brand route (Soundcore audio/speakers live under
 * /soundcore even for legacy records whose brand field says Anker — the same
 * mapping the Merchant feed links use via getMerchantProductBrandSlug), and
 * the category segment must match the record's categorySlug. Any other
 * brand/category combination for a known slug must 404 instead of rendering
 * a 200 duplicate whose self-referential canonical endorses the wrong URL.
 * generateStaticParams builds every true path from these exact record fields,
 * so no legitimate URL can ever fail this check.
 */
function isCanonicalProductPath(
    product: Pick<Product, 'brand' | 'categorySlug'>,
    brand: string,
    category: string,
): boolean {
    if (!product.brand || !product.categorySlug) return false;
    return (
        getMerchantProductBrandSlug(product) === brand.toLowerCase() &&
        product.categorySlug.trim().toLowerCase() === category.toLowerCase()
    );
}

async function getProduct(slug: string): Promise<Product | null> {
    // First try static data
    const staticProduct = getProductBySlug(slug);
    if (staticProduct) {
        return {
            id: `static_${staticProduct.slug}`,
            ...staticProduct,
        } as Product;
    }

    // Then try Firebase (direct doc lookup using slug as doc ID — O(1))
    try {
        const db = await getFirestore();
        if (!db) return null;

        const docRef = db.collection('products').doc(slug);
        const doc = await docRef.get();

        if (!doc.exists) return null;

        return { id: doc.id, ...doc.data()! } as Product;
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
            id: r.id,
            customerName: r.customerName,
            rating: r.rating,
            ...(r.title && { title: r.title }),
            reviewText: r.reviewText,
            pros: r.pros,
            cons: r.cons,
            reviewDate: new Date(r.reviewDate).toISOString().split('T')[0],
            governorate: r.governorate,
            isVerified: r.isVerified,
            helpfulCount: r.helpfulCount,
            ...(r.images && r.images.length ? { images: r.images } : {}),
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

    // Known slug under a wrong brand/category segment → 404, so no metadata
    // (canonical/hreflang) is ever emitted for a mislinked duplicate URL.
    if (!isCanonicalProductPath(product, brand, category)) {
        notFound();
    }

    const isArabic = locale === 'ar';
    const rawTranslation = product.translations?.[isArabic ? 'ar' : 'en'] || product.translations?.en || {};
    const localizedTextTranslation = isArabic
        ? localizeArabicBrandContent({ ...rawTranslation, description: '' })
        : rawTranslation;
    const t = isArabic
        ? {
            ...localizedTextTranslation,
            description: localizeArabicBrandHtml(rawTranslation.description || ''),
        }
        : rawTranslation;

    // Build product metadata from current catalogue fields.
    const productName = t.name || slug.replace(/-/g, ' ');
    const brandName = isArabic
        ? localizeArabicBrandNames(product.brand)
        : product.brand;
    const formattedPrice = new Intl.NumberFormat(isArabic ? 'ar-EG' : 'en-EG', {
        style: 'currency',
        currency: 'EGP',
        maximumFractionDigits: 0,
    }).format(product.price);

    const arFallbackTitle = `${productName} | السعر والمواصفات وضمان كايرو فولت`;

    const enFallbackTitle = `${productName} | Price, Specifications & CairoVolt Warranty`;

    const fallbackTitle = isArabic ? arFallbackTitle : enFallbackTitle;
    const fallbackDescription = isArabic
        ? `${productName} من ${brandName} بسعر ${formattedPrice}. راجع المواصفات والتوافق والتوافر ومدة ضمان كايرو فولت وشروطه في صفحة المنتج.`
        : `${productName} by ${brandName} is listed at ${formattedPrice}. Review specifications, compatibility, availability, and written CairoVolt warranty terms on the product page.`;
    const fallbackKeywords = isArabic
        ? `${productName}, ${brandName}, ${localizeArabicBrandNames(product.categorySlug)}, كايرو فولت`
        : `${productName}, ${brandName}, ${product.categorySlug.replace(/-/g, ' ')}, CairoVolt`;

    // Curated catalogue metadata is the primary SEO source. The generic copy
    // exists only for Firestore or legacy records that genuinely lack it.
    const dynamicTitle = sanitizeCuratedMetadata(t.metaTitle, isArabic) || fallbackTitle;
    const safeDescription = sanitizeCuratedMetadata(t.metaDesc, isArabic)
        || sanitizeCuratedMetadata(t.shortDescription, isArabic)
        || fallbackDescription;
    const safeKeywords = sanitizeCuratedMetadata(product.meta?.keywords, isArabic) || fallbackKeywords;

    return {
        title: { absolute: dynamicTitle },
        description: safeDescription,
        keywords: safeKeywords,
        openGraph: {
            title: dynamicTitle,
            description: safeDescription,
            siteName: isArabic ? 'كايرو فولت - مصر' : 'CairoVolt Egypt',
            type: 'article',
            images: product.images?.[0]?.url ? [{
                url: product.images[0].url.startsWith('http')
                    ? product.images[0].url
                    : `https://cairovolt.com${product.images[0].url}`,
                // Use the real descriptive alt from the product data, not a generic fallback
                alt: isArabic
                    ? localizeArabicBrandNames(product.images[0].alt || `${t.name} - كايرو فولت مصر`)
                    : (product.images[0].alt || `${t.name} - CairoVolt Egypt`),
                width: 1200,
                height: 630,
            }] : [],
            locale: isArabic ? 'ar_EG' : 'en_US',
            countryName: 'Egypt',
        },
        twitter: {
            card: 'summary_large_image',
            title: dynamicTitle,
            description: safeDescription,
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

    // Strict path validation — a known slug under a wrong brand/category
    // segment must never render a 200 duplicate page (see isCanonicalProductPath).
    if (!isCanonicalProductPath(product, brand, category)) {
        notFound();
    }

    // Default delivery stats for SSG — client can refine via geolocation API
    const deliveryStats = BostaTracker.getRegionalStats(DEFAULT_GOV.slug, locale);

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

    const isArabic = locale === 'ar';
    const sourceTranslation = product.translations?.[locale as 'ar' | 'en'] || product.translations?.en || {};
    const localizedTextTranslation = isArabic
        ? localizeArabicBrandContent({ ...sourceTranslation, description: '' })
        : sourceTranslation;
    const displayTranslation = isArabic
        ? {
            ...localizedTextTranslation,
            description: localizeArabicBrandHtml(sourceTranslation.description || ''),
        }
        : sourceTranslation;
    const productName = displayTranslation.name || '';
    const productDescription = displayTranslation.description || '';

    // The category route only exists for categoryContent entries (the route has
    // dynamicParams=false). Products in an unrouted category (e.g. anker/accessories)
    // must not emit breadcrumb links — visible or in schema — to a URL that 404s;
    // their breadcrumb falls back to the brand hub instead.
    const categoryRouteExists = Boolean(
        categoryContent[product.brand.toLowerCase()]?.[product.categorySlug.toLowerCase()]
    );

    // Fetch verified aggregate rating for Structured Data (Cached)
    const verifiedAggregateRating = await getCachedAggregateRating(slug);

    // Structured data mirrors the reviews UI and uses only approved,
    // purchase-verified Firestore submissions.
    const verifiedReviews = await getCachedVerifiedReviews(slug);
    const schemaReviews = verifiedReviews.map(r => ({
        author: r.customerName,
        rating: r.rating,
        reviewBody: isArabic ? localizeArabicBrandNames(r.reviewText) : r.reviewText,
        pros: r.pros
            ? (isArabic ? localizeArabicBrandContent(r.pros) : r.pros)
            : undefined,
        cons: r.cons
            ? (isArabic ? localizeArabicBrandContent(r.cons) : r.cons)
            : undefined,
        datePublished: r.reviewDate,
        location: r.governorate,
    }));

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
                            name: localizeArabicBrandNames(product.translations?.ar?.name || ''),
                            description: localizeArabicBrandHtml(product.translations?.ar?.description || '')
                        }
                    },
                    images: product.images?.map(img => ({
                        url: img.url,
                        alt: isArabic ? localizeArabicBrandNames(img.alt || '') : (img.alt || ''),
                        width: img.width,
                        height: img.height,
                    })) || []
                }}
                locale={locale}
                aggregateRating={verifiedAggregateRating ? {
                    ratingValue: verifiedAggregateRating.ratingValue,
                    reviewCount: String(verifiedAggregateRating.reviewCount),
                    bestRating: String(verifiedAggregateRating.bestRating),
                    worstRating: String(verifiedAggregateRating.worstRating)
                } : undefined}
                reviews={schemaReviews}
                specifications={isArabic
                    ? localizeArabicFields(productDetailData?.specifications)
                    : productDetailData?.specifications}
            />

            {/* Image schemas */}
            {product.images && product.images.length > 0 && (
                <ImageObjectSchema
                    images={product.images.map((img, i) => ({
                        url: img.url,
                        alt: isArabic ? localizeArabicBrandNames(img.alt || '') : (img.alt || ''),
                        isPrimary: img.isPrimary || i === 0,
                        width: img.width,
                        height: img.height,
                    }))}
                    productName={productName}
                    productSlug={slug}
                    productBrand={product.brand}
                    productCategory={category}
                    locale={locale}
                />
            )}

            {/* BreadcrumbSchema for navigation - STRICTLY using Product Data, not URL Params.
                The category level is only asserted when its route actually exists —
                schema must never declare navigation to a 404. */}
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isArabic ? '' : '/en'}` },
                    { name: getBrandDisplayName(product.brand, locale), url: `https://cairovolt.com${isArabic ? '' : '/en'}/${product.brand.toLowerCase()}` },
                    ...(categoryRouteExists ? [{
                        name: product.categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        url: `https://cairovolt.com${isArabic ? '' : '/en'}/${product.brand.toLowerCase()}/${product.categorySlug.toLowerCase()}`
                    }] : []),
                    { name: productName, url: `https://cairovolt.com${isArabic ? '' : '/en'}/${product.brand.toLowerCase()}/${product.categorySlug.toLowerCase()}/${product.slug}` },
                ]}
                locale={locale}
            />


            {/* FAQs remain visible; no FAQPage markup is asserted for this commerce page. */}

            {/* FAQSection removed — was duplicating the same product FAQ questions visible in the accordion above */}

            {/* Client-side UX components */}
            <ShareAnalytics />

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
                            name: displayTranslation.name,
                            description: productDescription,
                            faqs: displayTranslation.faqs,
                        },
                    } as Product['translations'],
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    expertOpinion: (product as any).expertOpinion,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    variants: (product as any).variants,
                } as Product}
                relatedProducts={relatedProducts}
                bundleData={bundleData}
                locale={locale}
                brand={brand}
                category={category}
                categoryRouteExists={categoryRouteExists}
                deliveryIntelligence={deliveryStats}
                userGovernorate={DEFAULT_GOV.display}
                initialReviews={verifiedReviews}
                initialAggregateRating={verifiedAggregateRating ? {
                    ratingValue: verifiedAggregateRating.ratingValue,
                    reviewCount: verifiedAggregateRating.reviewCount,
                } : null}
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
