// Server Component - Schemas must be SSR for Google to crawl them
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
    productPrice: number;
    productCategory: string;
    locale: string;
    baseUrl?: string;
}

/**
 * Google Lens–optimised ImageObject schemas.
 *
 * Emits one <script type="application/ld+json"> per product image (max 8).
 * Key signals for Google Lens:
 *   • subjectOf → Product (name, price, brand, url) — triggers "Buy" card in Lens
 *   • representativeOfPage = true on primary image
 *   • digitalSourceType = digitalCapture (not AI-generated)
 *   • contentLocation with GPS coordinates (Cairo)
 *   • width / height for dimension signals
 *   • thumbnail for quick visual matching
 */
export function ImageObjectSchema({
    images,
    productName,
    productSlug,
    productBrand,
    productPrice,
    productCategory,
    locale,
    baseUrl = 'https://cairovolt.com',
}: ImageObjectSchemaProps) {
    const isArabic = locale === 'ar';
    const productUrl = `${baseUrl}${isArabic ? '' : '/en'}/${productBrand.toLowerCase()}/${productCategory.toLowerCase()}/${productSlug}`;
    const year = new Date().getFullYear();

    // Build primary image URL for the nested Product (Google requires `image` on every Product entity)
    const primaryImage = images[0];
    const primaryImageUrl = primaryImage
        ? (primaryImage.url.startsWith('http') ? primaryImage.url : `${baseUrl}${primaryImage.url}`)
        : `${baseUrl}/logo.png`;

    const productSubject = {
        '@type': 'Product',
        name: productName,
        description: `${productName} — ${isArabic ? 'متوفر الآن في كايرو فولت مصر' : 'Available now at CairoVolt Egypt'}`,
        url: productUrl,
        image: primaryImageUrl,
        brand: { '@type': 'Brand', name: productBrand },
        offers: {
            '@type': 'Offer',
            price: productPrice,
            priceCurrency: 'EGP',
            availability: 'https://schema.org/InStock',
            url: productUrl,
            seller: { '@type': 'Organization', '@id': 'https://cairovolt.com/#organization', name: isArabic ? 'كايرو فولت' : 'CairoVolt', url: baseUrl },
        },
    };

    const schemas = images.slice(0, 8).map((img, idx) => {
        const absUrl = img.url.startsWith('http') ? img.url : `${baseUrl}${img.url}`;
        const isPrimary = img.isPrimary || idx === 0;

        return {
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            '@id': `${absUrl}#imageobject`,
            contentUrl: absUrl,
            url: absUrl,
            name: img.alt || (isArabic
                ? `${productName} — صورة ${idx + 1} — كايرو فولت مصر`
                : `${productName} — Image ${idx + 1} — CairoVolt Egypt`),
            description: isArabic
                ? `صورة أصلية رقم ${idx + 1} لمنتج ${productName} من مخازن كايرو فولت، مصر. التقطت بكاميرا حقيقية.`
                : `Original product photo ${idx + 1} of ${productName} from CairoVolt warehouse, Egypt. Captured with a real camera.`,
            ...(isPrimary && { representativeOfPage: true }),
            ...(img.width && { width: img.width }),
            ...(img.height && { height: img.height }),
            thumbnail: { '@type': 'ImageObject', name: `${productName} thumbnail`, contentUrl: absUrl },
            encodingFormat: 'image/webp',
            digitalSourceType: 'http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture',
            isFamilyFriendly: true,
            creditText: 'CairoVolt',
            copyrightNotice: `© ${year} CairoVolt - cairovolt.com`,
            creator: {
                '@type': 'Organization',
                name: isArabic ? 'كايرو فولت' : 'CairoVolt',
                url: baseUrl,
                sameAs: 'https://cairovolt.com',
            },
            contentLocation: {
                '@type': 'Place',
                name: isArabic ? 'مستودع كايرو فولت، القاهرة الجديدة' : 'CairoVolt Warehouse, New Cairo, Egypt',
                address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'EG',
                    addressLocality: isArabic ? 'القاهرة الجديدة' : 'New Cairo',
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 30.6997469,
                    longitude: 31.2088556,
                },
            },
            license: `${baseUrl}/en/return-policy`,
            acquireLicensePage: productUrl,
            subjectOf: productSubject,
            exifData: [
                { '@type': 'PropertyValue', name: 'DigitalSourceType', value: 'http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture' },
                { '@type': 'PropertyValue', name: 'Creator', value: 'CairoVolt' },
                { '@type': 'PropertyValue', name: 'Country', value: 'Egypt' },
                { '@type': 'PropertyValue', name: 'City', value: 'Cairo' },
            ],
        };
    });

    return (
        <>
            {schemas.map((schema, idx) => (
                <script
                    key={idx}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
}
