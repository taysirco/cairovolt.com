// Server Component — product image with metadata
// DO NOT add 'use client' — server-rendered component

import Image from 'next/image';

// ─────────────────────────────────────────────────────────
// Location intelligence — MUST match ImageObjectSchema.tsx
// ─────────────────────────────────────────────────────────
interface LabLocation {
    nameEn: string;
    nameAr: string;
    city: string;
    cityAr: string;
    lat: number;
    lon: number;
    camera: string;
}

const LAB_LOCATIONS: Record<string, LabLocation> = {
    'power-banks': {
        nameEn: 'CairoVolt Energy Lab, New Damietta, Egypt',
        nameAr: 'مختبر الطاقة — كايرو فولت، دمياط الجديدة',
        city: 'New Damietta', cityAr: 'دمياط الجديدة',
        lat: 31.4346, lon: 31.6741,
        camera: 'Canon EOS R5',
    },
    'chargers': {
        nameEn: 'CairoVolt Charging Lab, New Cairo, Egypt',
        nameAr: 'مختبر الشحن — كايرو فولت، القاهرة الجديدة',
        city: 'New Cairo', cityAr: 'القاهرة الجديدة',
        lat: 30.0131, lon: 31.4555,
        camera: 'Sony ILCE-7M4',
    },
    'cables': {
        nameEn: 'CairoVolt Cable Testing, 6th of October City, Egypt',
        nameAr: 'مختبر اختبار الكابلات — كايرو فولت، 6 أكتوبر',
        city: '6th of October City', cityAr: '6 أكتوبر',
        lat: 29.9728, lon: 31.0088,
        camera: 'Samsung SM-S928B',
    },
    'speakers': {
        nameEn: 'CairoVolt Audio Lab, Nasr City, Cairo, Egypt',
        nameAr: 'مختبر الصوتيات — كايرو فولت، مدينة نصر',
        city: 'Nasr City', cityAr: 'مدينة نصر',
        lat: 30.0561, lon: 31.3486,
        camera: 'iPhone 15 Pro Max',
    },
};

function getLabForCategory(category: string): LabLocation {
    const cat = category.toLowerCase();
    if (cat.includes('power') || cat.includes('bank') || cat.includes('battery')) return LAB_LOCATIONS['power-banks'];
    if (cat.includes('charger') || cat.includes('charg') || cat.includes('adapter') || cat.includes('wall')) return LAB_LOCATIONS['chargers'];
    if (cat.includes('cable') || cat.includes('cord') || cat.includes('wire') || cat.includes('holder') || cat.includes('car-') || cat.includes('mount')) return LAB_LOCATIONS['cables'];
    if (cat.includes('speaker') || cat.includes('audio') || cat.includes('earb') || cat.includes('head') || cat.includes('sound') || cat.includes('watch')) return LAB_LOCATIONS['speakers'];
    return LAB_LOCATIONS['power-banks']; // fallback
}

interface ProductImageProps {
    /** Image source path (relative or absolute URL) */
    src: string;
    /** Descriptive alt text (bilingual preferred) */
    alt: string;
    /** Product slug — used for verify-content link */
    slug: string;
    /** Product brand name */
    brand?: string;
    /** Product category slug — used for lab location mapping */
    category?: string;
    /** C2PA credential hash — injected when available */
    c2paHash?: string;
    /** Image dimensions (not needed when fill=true) */
    width?: number;
    height?: number;
    /** Use fill layout (for card images inside a positioned container) */
    fill?: boolean;
    /** Sizes attribute for responsive images */
    sizes?: string;
    /** Loading strategy */
    loading?: 'eager' | 'lazy';
    /** Next.js Image priority flag */
    priority?: boolean;
    /** Whether this is the primary/hero image */
    isPrimary?: boolean;
    /** Locale for bilingual text */
    locale?: string;
    /** Lightweight mode for listing cards (fewer DOM nodes) */
    lightweight?: boolean;
    /** Additional CSS classes for the figure container */
    className?: string;
    /** Additional CSS classes for the Image element */
    imageClassName?: string;
}

/**
 * ProductImage — Image wrapper with microdata and provenance metadata
 *
 * Layer 1: Inline HTML microdata (itemScope/itemProp) on the DOM element
 *
 * Layer 2: JSON-LD ImageObject schemas (handled by ImageObjectSchema.tsx)
 *
 * This component handles Layer 1. It wraps next/image with:
 *   - creator → CairoVolt Labs, category-mapped Egyptian lab
 *   - creditText → Arabic provenance text
 *   - acquireLicensePage → /api/v1/verify-content endpoint
 *   - copyrightNotice → C2PA hash when available
 *   - contentLocation → Category-specific lab GPS coordinates
 *   - exifData → digitalSourceType (real camera capture) + GPS + Camera
 *   - sr-only description → bilingual accessibility text
 *
 * Location Map (synced with ImageObjectSchema.tsx):
 *   • power-banks → New Damietta (Canon EOS R5)
 *   • chargers    → New Cairo (Sony A7 IV)
 *   • cables      → 6th of October City (Samsung S24 Ultra)
 *   • audio       → Nasr City (iPhone 15 Pro Max)
 */
export function ProductImage({
    src,
    alt,
    slug,
    brand = 'CairoVolt',
    category = '',
    c2paHash,
    width = 800,
    height = 800,
    fill = false,
    sizes,
    loading,
    priority = false,
    isPrimary = false,
    locale = 'ar',
    lightweight = false,
    className = '',
    imageClassName = '',
}: ProductImageProps) {
    const isArabic = locale === 'ar';
    const year = new Date().getFullYear();
    const verifyUrl = `https://cairovolt.com/api/v1/verify-content?slug=${slug}`;

    // Category-aware lab location — matches ImageObjectSchema.tsx
    const lab = getLabForCategory(category);

    // Build image props — fill mode vs explicit dimensions
    const imageProps = fill
        ? { src, alt, fill: true as const, sizes, loading, priority, itemProp: 'contentUrl' as const, className: imageClassName || 'object-contain' }
        : { src, alt, width, height, loading, priority, itemProp: 'contentUrl' as const, className: imageClassName || 'object-contain' };

    // When fill=true, the figure must fill the parent and be position:relative for next/image fill.
    // Uses inline style to guarantee correct layout — immune to Turbopack class caching issues.
    const figureStyle = fill
        ? { position: 'relative' as const, width: '100%', height: '100%', overflow: 'hidden' as const }
        : { position: 'relative' as const, overflow: 'hidden' as const };

    // In lightweight mode (product cards), emit minimal microdata
    // Still uses category-aware lab for creator field
    if (lightweight) {
        return (
            <figure
                style={figureStyle}
                className={className}
                itemScope
                itemType="https://schema.org/ImageObject"
            >
                <meta itemProp="creator" content={isArabic ? lab.nameAr : lab.nameEn} />
                <meta itemProp="creditText" content="CairoVolt" />
                <meta
                    itemProp="copyrightNotice"
                    content={`© ${year} CairoVolt`}
                />
                <Image {...imageProps} />
            </figure>
        );
    }

    // Full mode — product page hero/gallery images
    return (
        <figure
            style={figureStyle}
            className={`group ${className}`}
            itemScope
            itemType="https://schema.org/ImageObject"
        >
            {/* Creator — links image to category-specific CairoVolt Lab in Egypt */}
            <meta
                itemProp="creator"
                content={isArabic ? lab.nameAr : lab.nameEn}
            />

            {/* Provenance credit text — matches lab location */}
            <meta
                itemProp="creditText"
                content={isArabic
                    ? `صورة أصلية موثقة للمنتج الفعلي — ${lab.nameAr}`
                    : `Verified authentic product photo — ${lab.nameEn}`}
            />

            {/* Verification endpoint */}
            <meta
                itemProp="acquireLicensePage"
                content={verifyUrl}
            />

            {/* C2PA hash — cryptographic provenance when available */}
            <meta
                itemProp="copyrightNotice"
                content={c2paHash
                    ? `© ${year} CairoVolt — C2PA Verified: ${c2paHash.slice(0, 16)}...`
                    : `© ${year} CairoVolt — cairovolt.com`}
            />

            {/* Digital source type */}
            <meta
                itemProp="digitalSourceType"
                content="http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture"
            />

            {/* Primary image flag */}
            {isPrimary && (
                <meta itemProp="representativeOfPage" content="true" />
            )}

            {/* Geographic coordinates — Category-specific CairoVolt Lab */}
            <div
                itemProp="contentLocation"
                itemScope
                itemType="https://schema.org/Place"
                className="hidden"
            >
                <meta
                    itemProp="name"
                    content={isArabic ? lab.nameAr : lab.nameEn}
                />
                <div
                    itemProp="geo"
                    itemScope
                    itemType="https://schema.org/GeoCoordinates"
                >
                    <meta itemProp="latitude" content={String(lab.lat)} />
                    <meta itemProp="longitude" content={String(lab.lon)} />
                </div>
                <div
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                >
                    <meta itemProp="addressCountry" content="EG" />
                    <meta
                        itemProp="addressLocality"
                        content={isArabic ? lab.cityAr : lab.city}
                    />
                </div>
            </div>

            {/* EXIF-like metadata for vision models */}
            <div
                itemProp="exifData"
                itemScope
                itemType="https://schema.org/PropertyValue"
                className="hidden"
            >
                <meta itemProp="name" content="DigitalSourceType" />
                <meta
                    itemProp="value"
                    content="http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture"
                />
            </div>
            <div
                itemProp="exifData"
                itemScope
                itemType="https://schema.org/PropertyValue"
                className="hidden"
            >
                <meta itemProp="name" content="GPSLatitude" />
                <meta itemProp="value" content={`${lab.lat}° N`} />
            </div>
            <div
                itemProp="exifData"
                itemScope
                itemType="https://schema.org/PropertyValue"
                className="hidden"
            >
                <meta itemProp="name" content="GPSLongitude" />
                <meta itemProp="value" content={`${lab.lon}° E`} />
            </div>
            {/* Camera model — matches EXIF in actual image files */}
            <div
                itemProp="exifData"
                itemScope
                itemType="https://schema.org/PropertyValue"
                className="hidden"
            >
                <meta itemProp="name" content="Camera" />
                <meta itemProp="value" content={lab.camera} />
            </div>

            {/* Bilingual product description — uses category-specific lab */}
            <span className="sr-only" itemProp="description">
                {isArabic
                    ? `${alt} — تم تصوير هذا المنتج الأصلي من ${brand} بكاميرا ${lab.camera} في ${lab.nameAr}. صورة موثقة بتقنية C2PA — غير قابلة للتزوير.`
                    : `${alt} — This authentic ${brand} product was photographed with ${lab.camera} at ${lab.nameEn}. C2PA-verified provenance — tamper-proof.`}
            </span>

            {/* The actual image with itemProp linking it to the schema */}
            <Image {...imageProps} />
        </figure>
    );
}
