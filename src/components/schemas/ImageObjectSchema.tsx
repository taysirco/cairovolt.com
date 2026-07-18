// Server Component — structured data
// DO NOT add 'use client' here!

interface ProductImageInfo {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    isPrimary?: boolean;
}

interface ImageObjectSchemaProps {
    images: ProductImageInfo[];
    productName: string;
    productSlug: string;
    productBrand: string;
    productCategory: string;
    locale: string;
    baseUrl?: string;
}

/**
 * Emits a concise ImageObject for each product image.
 *
 * Only properties supported by the catalog and the image file are included.
 * Capture devices, locations, and other technical metadata belong here only
 * when they can be read from an embedded, verifiable source.
 */
export function ImageObjectSchema({
    images,
    productName,
    productSlug,
    productBrand,
    productCategory,
    locale,
    baseUrl = 'https://cairovolt.com',
}: ImageObjectSchemaProps) {
    const isArabic = locale === 'ar';
    const productUrl = `${baseUrl}${isArabic ? '' : '/en'}/${productBrand.toLowerCase()}/${productCategory.toLowerCase()}/${productSlug}`;

    const schemas = images.slice(0, 8).map((image, index) => {
        const absoluteUrl = image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`;
        const name = image.alt || (isArabic
            ? `${productName} — صورة ${index + 1}`
            : `${productName} — Image ${index + 1}`);

        return {
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            '@id': `${absoluteUrl}#imageobject`,
            contentUrl: absoluteUrl,
            url: absoluteUrl,
            name,
            caption: name,
            ...(image.isPrimary || index === 0 ? { representativeOfPage: true } : {}),
            ...(image.width ? { width: image.width } : {}),
            ...(image.height ? { height: image.height } : {}),
            isPartOf: { '@type': 'WebPage', '@id': productUrl },
            // CairoVolt shoots/processes its own product photography, so declare
            // the license (satisfies Google's image "license" field + enables the
            // licensable-image feature). Terms = all-rights-reserved statement.
            license: `${baseUrl}/terms`,
            acquireLicensePage: `${baseUrl}/contact`,
            creditText: 'CairoVolt',
            copyrightNotice: 'CairoVolt',
        };
    });

    return (
        <>
            {schemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
}
