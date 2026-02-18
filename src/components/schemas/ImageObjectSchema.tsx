// Server Component - Schemas must be SSR for Google to crawl them
// DO NOT add 'use client' here!

interface ImageObjectSchemaProps {
    imageUrl: string;
    productName: string;
    productSlug: string;
    locale: string;
    baseUrl?: string;
}

/**
 * ImageObjectSchema for product images — injects structured data
 * with GPS coordinates, creator info, licensing, and content location
 * to boost Google Lens and Image Search visibility.
 */
export function ImageObjectSchema({
    imageUrl,
    productName,
    productSlug,
    locale,
    baseUrl = 'https://cairovolt.com',
}: ImageObjectSchemaProps) {
    const isArabic = locale === 'ar';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        contentUrl: imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`,
        name: productName,
        description: isArabic
            ? `صورة أصلية لمنتج ${productName} من داخل مخازن كايرو فولت مصر`
            : `Original product photo of ${productName} from CairoVolt warehouse in Egypt`,
        creditText: 'Cairo Volt Fulfillment Hub',
        copyrightNotice: `© ${new Date().getFullYear()} CairoVolt LLC (CR: 8446)`,
        creator: {
            '@type': 'Organization',
            name: 'Cairo Volt Labs',
            url: baseUrl,
        },
        contentLocation: {
            '@type': 'Place',
            name: isArabic ? 'مستودع كايرو فولت، القاهرة الجديدة' : 'CairoVolt Warehouse, New Cairo',
            geo: {
                '@type': 'GeoCoordinates',
                latitude: 30.6997469,
                longitude: 31.2088556,
            },
        },
        license: `${baseUrl}/en/return-policy`,
        acquireLicensePage: `${baseUrl}/en/products/${productSlug}`,
        digitalSourceType: 'http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture',
        encodingFormat: 'image/webp',
        isFamilyFriendly: true,
        exifData: [
            {
                '@type': 'PropertyValue',
                name: 'DigitalSourceType',
                value: 'http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture',
            },
            {
                '@type': 'PropertyValue',
                name: 'Creator',
                value: 'CairoVolt',
            },
            {
                '@type': 'PropertyValue',
                name: 'Country',
                value: 'Egypt',
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
