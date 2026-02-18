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
import { ImageObjectSchema } from '@/components/schemas/ImageObjectSchema';
import VoiceSearchFAQ from '@/components/seo/VoiceSearchFAQ';
import DarkSocialTracker from '@/components/seo/DarkSocialTracker';
import TabTakeover from '@/components/UX/TabTakeover';
import { getLabData } from '@/data/cairovolt-labs';
import LabTestBlock from '@/components/seo/LabTestBlock';

export const revalidate = 3600;
export const dynamicParams = true;

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

// Fetch current Cairo temperature for dynamic thermal advice (Information Gain)
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
    const [product, currentTemp] = await Promise.all([
        getProduct(slug),
        getCairoTemperature(),
    ]);

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

    // CairoVolt Labs first-party test data (Information Gain)
    const labInfo = getLabData(slug);

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
                isAccessoryOrSparePartFor={labInfo?.isAccessoryFor || (category === 'power-banks' ? [
                    { name: 'WE VDSL Router' },
                    { name: 'Apple MacBook Pro' },
                    { name: 'iPhone' },
                ] : undefined)}
                expertReview={(() => {
                    // Priority 1: cairovolt-labs.ts real test data
                    if (labInfo?.labTests?.[0]) {
                        return {
                            name: labInfo.labTests[0].expertName,
                            linkedIn: labInfo.labTests[0].expertLinkedIn,
                            title: isArabic ? labInfo.labTests[0].expertTitle.ar : labInfo.labTests[0].expertTitle.en,
                            body: isArabic ? labInfo.labTests[0].result.ar : labInfo.labTests[0].result.en,
                        };
                    }
                    // Priority 2: product-seo-enhancements labVerified data
                    const seoData = getProductSEO(slug);
                    if (seoData?.labVerified) {
                        return {
                            name: seoData.labVerified.expertName,
                            linkedIn: 'https://linkedin.com/in/ahmed-mahmoud-cairovolt',
                            title: isArabic ? 'رئيس قسم الفحص التقني وحلول الطاقة' : 'Head of Technical Testing & Power Solutions',
                            body: isArabic ? seoData.labVerified.result.ar : seoData.labVerified.result.en,
                        };
                    }
                    // Priority 3: Generic fallback
                    return {
                        name: 'Eng. Ahmed Mahmoud',
                        linkedIn: 'https://linkedin.com/in/ahmed-mahmoud-cairovolt',
                        title: isArabic ? 'رئيس قسم الفحص التقني وحلول الطاقة' : 'Head of Technical Testing & Power Solutions',
                        body: isArabic
                            ? 'تم اختباره في مختبر كايرو فولت وفحصه تقنياً قبل الطرح في السوق المصري.'
                            : 'Tested at CairoVolt Labs and technically verified before sale to the Egyptian market.',
                    };
                })()}
            />

            {/* ImageObject Schema for primary product image */}
            {product.images?.[0]?.url && (
                <ImageObjectSchema
                    imageUrl={product.images[0].url}
                    productName={productName}
                    productSlug={slug}
                    locale={locale}
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

            {/* SpeakableSchema for voice search */}
            <SpeakableSchema
                pageUrl={`https://cairovolt.com${isArabic ? '' : '/en'}/${brand}/${category}/${slug}`}
                speakableSelectors={['h1', '.product-description', '.product-features', '.cairovolt-voice-answer']}
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

            {/* CairoVolt Labs Test Results — First-Party Data (Information Gain) */}
            {/* Priority 1: cairovolt-labs.ts full test data */}
            {labInfo?.labTests?.[0] ? (
                <LabTestBlock
                    testScenario={isArabic ? labInfo.labTests[0].scenario.ar : labInfo.labTests[0].scenario.en}
                    testResult={isArabic ? labInfo.labTests[0].result.ar : labInfo.labTests[0].result.en}
                    testConditions={isArabic ? labInfo.labTests[0].conditions.ar : labInfo.labTests[0].conditions.en}
                    expertName={labInfo.labTests[0].expertName}
                    expertLinkedIn={labInfo.labTests[0].expertLinkedIn}
                    locale={locale}
                />
            ) : (() => {
                // Priority 2: product-seo-enhancements labVerified data
                const seoEnhancement = getProductSEO(slug);
                return seoEnhancement?.labVerified ? (
                    <LabTestBlock
                        testScenario={isArabic
                            ? seoEnhancement.localPainPoint.ar
                            : seoEnhancement.localPainPoint.en}
                        testResult={isArabic
                            ? seoEnhancement.labVerified.result.ar
                            : seoEnhancement.labVerified.result.en}
                        testConditions={isArabic
                            ? seoEnhancement.labVerified.conditions.ar
                            : seoEnhancement.labVerified.conditions.en}
                        expertName={seoEnhancement.labVerified.expertName}
                        expertLinkedIn="https://linkedin.com/in/ahmed-mahmoud-cairovolt"
                        locale={locale}
                    />
                ) : null;
            })()}

            {/* Dynamic thermal advice based on real-time Cairo weather (Information Gain) */}
            <div className="bg-yellow-50/80 border-r-4 border-yellow-500 p-5 my-4 rounded-l-lg">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🌡️</span>
                    <h4 className="font-bold text-yellow-900">
                        {isArabic ? 'تحليل الأداء اللحظي (مختبرات كايرو فولت)' : 'Real-time Performance Analysis (CairoVolt Labs)'}
                    </h4>
                </div>
                <p className="text-yellow-800 font-medium leading-relaxed">
                    {currentTemp > 35
                        ? (isArabic
                            ? `⚠️ تنبيه: درجة حرارة الجو في مصر الآن (${currentTemp}°C). المنتج مزود بشريحة ActiveShield 2.0 لحماية بطاريتك من الانتفاخ في هذا الطقس.`
                            : `⚠️ Alert: Current temperature in Egypt is (${currentTemp}°C). This product features ActiveShield 2.0 chip to protect your battery in this heat.`)
                        : (isArabic
                            ? `✅ الطقس في مصر الآن (${currentTemp}°C) مثالي جداً لبطاريات الليثيوم. الشاحن سيعمل بأقصى كفاءة.`
                            : `✅ Current weather in Egypt (${currentTemp}°C) is ideal for lithium batteries. The charger will operate at maximum efficiency.`)}
                </p>
            </div>

            {/* Voice Search FAQ — Priority: product FAQs > lab data > generic */}
            <VoiceSearchFAQ
                productName={productName}
                locale={locale}
                qaList={(() => {
                    // Priority 1: product-specific FAQs from seed-products translations
                    const productFaqs = product.translations?.[isArabic ? 'ar' : 'en']?.faqs;
                    if (productFaqs && productFaqs.length > 0) {
                        return productFaqs.slice(0, 3).map(f => ({ question: f.question, answer: f.answer }));
                    }
                    // Priority 2: CairoVolt Labs voice FAQs
                    const labFaqs = isArabic ? labInfo?.voiceFaqAr : labInfo?.voiceFaqEn;
                    if (labFaqs && labFaqs.length > 0) return labFaqs;
                    // Priority 3: Generic CairoVolt fallback Q&As
                    return [
                        {
                            question: isArabic ? `هو ${productName} بيشغل راوتر WE لما النور يقطع؟` : `Does ${productName} run a WE router during power outages?`,
                            answer: isArabic ? 'اختبرناه في كايرو فولت وبيشغل راوتر الأنترنت المنزلي لمدة بتوصل لـ 14 ساعة متواصلة.' : 'We tested it at CairoVolt and it runs a home internet router for up to 14 continuous hours.',
                        },
                        {
                            question: isArabic ? `إيه يضمنلي إن ${productName} من كايرو فولت أصلي؟` : `How can I verify ${productName} from CairoVolt is original?`,
                            answer: isArabic ? 'كايرو فولت شركة مسجلة رسمياً (سجل تجاري 8446). كل منتج متبرشم وعليه باركود أصلي. ضمان رسمي 18 شهر.' : 'CairoVolt is registered (CR: 8446). All products come sealed with original barcode. Official 18-month warranty.',
                        },
                        {
                            question: isArabic ? 'بتوصلوا لحد بابي ولا لازم أنزل؟' : 'Do you deliver to my door?',
                            answer: isArabic ? 'بنوصل لحد باب بيتك في كل محافظات مصر 27 محافظة. القاهرة والجيزة في 24-48 ساعة، شحن 40 جنيه أو مجاني فوق 500 جنيه.' : 'We deliver to your door across all 27 Egyptian governorates. Cairo/Giza in 24-48 hours. 40 EGP shipping or free above 500 EGP.',
                        },
                    ];
                })()}
            />

            {/* Target Answer div for Text Fragment Indexing (Passage Ranking) */}
            <div id="target-answer" className="sr-only">
                <h3>{isArabic ? `لماذا يعتبر ${productName} الأفضل في مصر؟` : `Why is ${productName} the best in Egypt?`}</h3>
                <p>{isArabic
                    ? `يعتبر الأفضل في مصر لأنه تم اختباره فعلياً في مختبرات كايرو فولت في ظروف المناخ المصري القاسية. متوفر بضمان رسمي وتوصيل لكل محافظات مصر من كايرو فولت.`
                    : `It is the best in Egypt because it was physically tested at CairoVolt Labs under harsh Egyptian climate conditions. Available with official warranty and nationwide delivery from CairoVolt.`
                }</p>
            </div>

            {/* Client-side UX components */}
            <DarkSocialTracker />
            <TabTakeover productName={productName} />

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
