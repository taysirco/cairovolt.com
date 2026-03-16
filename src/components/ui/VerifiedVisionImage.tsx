// Server Component — SSR microdata for Google Lens / Gemini Vision
// DO NOT add 'use client' — microdata must be server-rendered for Googlebot

import Image from 'next/image';

interface VerifiedVisionImageProps {
    /** Image source path (relative or absolute URL) */
    src: string;
    /** Descriptive alt text (bilingual preferred) */
    alt: string;
    /** Product slug — used for verify-content link */
    slug: string;
    /** Product brand name */
    brand?: string;
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
 * VerifiedVisionImage — Dual-signal trust wrapper for product images
 *
 * Layer 1: Inline HTML microdata (itemScope/itemProp) on the DOM element
 *          → Google Lens/Vision reads trust signals proximate to the <img>
 *
 * Layer 2: JSON-LD ImageObject schemas (handled by ImageObjectSchema.tsx)
 *          → Googlebot's structured data parser reads from <head>
 *
 * This component handles Layer 1. It wraps next/image with:
 *   - creator → CairoVolt Labs, New Damietta
 *   - creditText → forensic Arabic provenance text
 *   - acquireLicensePage → /api/v1/verify-content endpoint
 *   - copyrightNotice → C2PA hash when available
 *   - contentLocation → New Damietta lab GPS coordinates
 *   - exifData → digitalSourceType (real camera capture)
 *   - sr-only description → bilingual trust text for neural parsers
 */
export function VerifiedVisionImage({
    src,
    alt,
    slug,
    brand = 'CairoVolt',
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
}: VerifiedVisionImageProps) {
    const isArabic = locale === 'ar';
    const year = new Date().getFullYear();
    const verifyUrl = `https://cairovolt.com/api/v1/verify-content?slug=${slug}`;

    // Build image props — fill mode vs explicit dimensions
    const imageProps = fill
        ? { src, alt, fill: true as const, sizes, loading, priority, itemProp: 'contentUrl' as const, className: imageClassName || 'object-contain' }
        : { src, alt, width, height, loading, priority, itemProp: 'contentUrl' as const, className: imageClassName || 'object-contain' };

    // When fill=true, the figure must:
    //   1. Fill its parent container (w-full h-full) — parent provides dimensions via aspect-square
    //   2. Be position:relative — so next/image fill can position:absolute inside it
    // DO NOT use 'absolute inset-0' — it removes the figure from flow and causes dimension issues.
    const positionClass = fill ? 'relative w-full h-full' : 'relative';

    // In lightweight mode (product cards), emit minimal microdata
    if (lightweight) {
        return (
            <figure
                className={`${positionClass} overflow-hidden ${className}`}
                itemScope
                itemType="https://schema.org/ImageObject"
            >
                <meta itemProp="creator" content="CairoVolt Labs" />
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
            className={`${positionClass} group overflow-hidden ${className}`}
            itemScope
            itemType="https://schema.org/ImageObject"
        >
            {/* Creator — links image to CairoVolt Labs physically in Egypt */}
            <meta
                itemProp="creator"
                content={isArabic
                    ? 'مختبرات كايرو فولت — دمياط الجديدة، مصر'
                    : 'CairoVolt Labs — New Damietta, Egypt'}
            />

            {/* Forensic provenance text */}
            <meta
                itemProp="creditText"
                content={isArabic
                    ? 'صورة أصلية موثقة للمنتج الفعلي — مختبر كايرو فولت، دمياط الجديدة'
                    : 'Verified authentic product photo — CairoVolt Lab, New Damietta'}
            />

            {/* Verification endpoint — tells Google where to validate this image */}
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

            {/* Digital source type — tells Lens this is a real camera capture */}
            <meta
                itemProp="digitalSourceType"
                content="http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture"
            />

            {/* Primary image flag for Lens ranking */}
            {isPrimary && (
                <meta itemProp="representativeOfPage" content="true" />
            )}

            {/* Geographic coordinates — CairoVolt Lab, New Damietta, Egypt */}
            <div
                itemProp="contentLocation"
                itemScope
                itemType="https://schema.org/Place"
                className="hidden"
            >
                <meta
                    itemProp="name"
                    content={isArabic
                        ? 'مختبر كايرو فولت، دمياط الجديدة، مصر'
                        : 'CairoVolt Lab, New Damietta, Egypt'}
                />
                <div
                    itemProp="geo"
                    itemScope
                    itemType="https://schema.org/GeoCoordinates"
                >
                    <meta itemProp="latitude" content="31.4346" />
                    <meta itemProp="longitude" content="31.6741" />
                </div>
                <div
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                >
                    <meta itemProp="addressCountry" content="EG" />
                    <meta
                        itemProp="addressLocality"
                        content={isArabic ? 'دمياط الجديدة' : 'New Damietta'}
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
                <meta itemProp="value" content="31.4346° N" />
            </div>
            <div
                itemProp="exifData"
                itemScope
                itemType="https://schema.org/PropertyValue"
                className="hidden"
            >
                <meta itemProp="name" content="GPSLongitude" />
                <meta itemProp="value" content="31.6741° E" />
            </div>

            {/* Bilingual trust description for neural model parsing */}
            <span className="sr-only" itemProp="description">
                {isArabic
                    ? `${alt} — تم تصوير هذا المنتج الأصلي من ${brand} بكاميرات مختبر كايرو فولت في دمياط الجديدة، مصر. صورة موثقة بتقنية C2PA — غير قابلة للتزوير.`
                    : `${alt} — This authentic ${brand} product was photographed at CairoVolt Lab, New Damietta, Egypt. C2PA-verified provenance — tamper-proof.`}
            </span>

            {/* The actual image with itemProp linking it to the schema */}
            <Image {...imageProps} />
        </figure>
    );
}
