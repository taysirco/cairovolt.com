// Server Component — product image with concise ownership metadata
// DO NOT add 'use client' — server-rendered component

import Image from 'next/image';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';

/**
 * Static responsive candidates for a product master image.
 *
 * WHY THIS EXISTS — measured, not assumed:
 * `next.config.ts` points `images.loaderFile` at `/api/img`, but the Firebase
 * App Hosting adapter (`x-fah-adapter: nextjs-14.0.21`) neutralises the loader
 * in production. Proof: a fresh local `npm run build` emits 23/23 category-card
 * images as `/api/img?...` with full srcSets, while the same page live at
 * cairovolt.com emits 0 `/api/img` URLs, 0 `srcset`, and 0 `sizes` — even
 * though `CategoryTemplate` passes `sizes`. next/image is therefore running as
 * if `unoptimized` were set, so every device downloads the full ~1080px master
 * (median 40.1 KB).
 *
 * `<img srcset>` is plain HTML and survives the adapter untouched — the JBL
 * category cards already prove it (their `<picture><source srcSet>` renders
 * intact live). So we emit the ladder ourselves against the pre-generated
 * static siblings, which are edge-cached (`cdn-cache-status: hit`, TTFB ~0.19s).
 *
 * Coverage verified across `public/products`: 932 of 936 image stems have both
 * a `-480` and a `-800` sibling. The only 4 without are `-pill` derivatives,
 * which are excluded below. `-thumb` (128px gallery strip, median 2.1 KB) is
 * also excluded — giving it a 480/800 ladder would make it ~9x heavier.
 */
const PRODUCT_MASTER = /^(\/products\/.+?)(-800|-480)?\.webp(\?.*)?$/;

function deriveStaticSrcSet(src: string): string | undefined {
    const match = PRODUCT_MASTER.exec(src);
    if (!match) return undefined;
    const base = match[1];
    // No pre-generated siblings exist for these stems.
    if (base.endsWith('-thumb') || base.endsWith('-pill')) return undefined;
    const query = match[3] ?? '';
    return `${base}-480.webp${query} 480w, ${base}-800.webp${query} 800w`;
}

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
        ? { position: 'absolute' as const, inset: 0, overflow: 'hidden' as const }
        : { position: 'relative' as const, overflow: 'hidden' as const };

    // next/image silently DROPS a caller-supplied `srcSet` (and `sizes`) — its
    // own computed attributes are spread last and overwrite them with
    // `undefined`. Verified in the built markup: the product-page hero passes
    // both and emitted neither. So when we have a real candidate ladder we
    // render the <img> ourselves, replicating next/image's exact attributes.
    const responsiveSrcSet = srcSet ?? deriveStaticSrcSet(src);

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
            {responsiveSrcSet ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={src}
                    srcSet={responsiveSrcSet}
                    sizes={sizes}
                    alt={displayAlt}
                    // `priority` means "paint me first" — an explicit lazy hint
                    // would contradict it, so it is omitted (browser default is
                    // eager), matching what next/image emits.
                    loading={priority ? undefined : (loading ?? 'lazy')}
                    fetchPriority={priority ? 'high' : undefined}
                    decoding="async"
                    itemProp="contentUrl"
                    className={imageClassName || 'object-contain'}
                    {...(fill
                        ? {
                            style: {
                                position: 'absolute' as const,
                                height: '100%',
                                width: '100%',
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0,
                                color: 'transparent',
                            },
                        }
                        : { width, height, style: { color: 'transparent' } })}
                />
            ) : fill ? (
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
