// Server Component — product image with concise ownership metadata
// DO NOT add 'use client' — server-rendered component

import Image from 'next/image';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';

interface ProductImageProps {
    /** Image source path (relative or absolute URL) */
    src: string;
    /** Descriptive alternative text */
    alt: string;
    /** Product context retained for compatible call sites */
    slug?: string;
    brand?: string;
    category?: string;
    /** Image dimensions (not needed when fill=true) */
    width?: number;
    height?: number;
    /** Use fill layout (for card images inside a positioned container) */
    fill?: boolean;
    /** Sizes attribute for responsive images */
    sizes?: string;
    /** Responsive source set for pre-sized static images */
    srcSet?: string;
    /** Loading strategy */
    loading?: 'eager' | 'lazy';
    /** Next.js Image priority flag */
    priority?: boolean;
    /** Serve the exact source file without the image optimizer */
    unoptimized?: boolean;
    /** Whether this is the primary product image */
    isPrimary?: boolean;
    /** Locale used to localize the alternative text */
    locale?: string;
    /** Lightweight mode for listing cards */
    lightweight?: boolean;
    /** Additional CSS classes for the figure container */
    className?: string;
    /** Additional CSS classes for the Image element */
    imageClassName?: string;
}

/**
 * Product image wrapper with accessible text and general ownership metadata.
 * Technical provenance is intentionally omitted unless it is embedded in and
 * verifiable from the underlying media file.
 */
export function ProductImage({
    src,
    alt,
    width = 800,
    height = 800,
    fill = false,
    sizes,
    srcSet,
    loading,
    priority = false,
    unoptimized = false,
    isPrimary = false,
    locale = 'ar',
    lightweight = false,
    className = '',
    imageClassName = '',
}: ProductImageProps) {
    const displayAlt = locale === 'ar' ? localizeArabicBrandNames(alt) : alt;
    const year = new Date().getFullYear();
    const figureStyle = fill
        ? { position: 'relative' as const, width: '100%', height: '100%', overflow: 'hidden' as const }
        : { position: 'relative' as const, overflow: 'hidden' as const };

    return (
        <figure
            style={figureStyle}
            className={lightweight ? className : `group ${className}`}
            itemScope
            itemType="https://schema.org/ImageObject"
        >
            <meta itemProp="creator" content="CairoVolt" />
            <meta itemProp="creditText" content="CairoVolt" />
            <meta itemProp="copyrightNotice" content={`© ${year} CairoVolt`} />
            {isPrimary && <meta itemProp="representativeOfPage" content="true" />}
            {fill ? (
                <Image
                    src={src}
                    alt={displayAlt}
                    fill
                    sizes={sizes}
                    loading={loading}
                    priority={priority}
                    unoptimized={unoptimized}
                    fetchPriority={priority ? 'high' : undefined}
                    itemProp="contentUrl"
                    className={imageClassName || 'object-contain'}
                    {...(srcSet ? { srcSet } : {})}
                />
            ) : (
                <Image
                    src={src}
                    alt={displayAlt}
                    width={width}
                    height={height}
                    loading={loading}
                    priority={priority}
                    unoptimized={unoptimized}
                    fetchPriority={priority ? 'high' : undefined}
                    itemProp="contentUrl"
                    className={imageClassName || 'object-contain'}
                    {...(srcSet ? { srcSet } : {})}
                />
            )}
        </figure>
    );
}
