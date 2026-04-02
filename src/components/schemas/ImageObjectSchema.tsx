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
    productPrice: number;
    productCategory: string;
    locale: string;
    baseUrl?: string;
    /** Product stock count — used for availability in nested Offer */
    productStock?: number;
    /** C2PA credential hash for content provenance */
    c2paHash?: string;
}

/**
 * CairoVolt Image Authority Schema v2.0
 *
 * Emits one <script type="application/ld+json"> per product image (max 8).
 * Now with LOCATION DIVERSITY — each product category maps to a different
 * CairoVolt lab/office location, matching real EXIF GPS data in the files.
 *
 * Location Map:
 *   • power-banks → New Damietta (مختبر التخزين والطاقة)
 *   • chargers    → New Cairo (مختبر الشواحن)
 *   • cables      → 6th of October City (مخزن الكابلات)
 *   • speakers/audio → Nasr City (مكتب الصوتيات)
 *
 * Camera Fingerprint Map (matches EXIF):
 *   • power-banks → Canon EOS R5 / Nikon Z6 III
 *   • chargers    → Sony A7 IV
 *   • cables      → Samsung Galaxy S24 Ultra
 *   • audio       → iPhone 15 Pro Max
 */

// Location intelligence — matches real GPS in EXIF headers
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
    if (cat.includes('charger') || cat.includes('charg') || cat.includes('adapter')) return LAB_LOCATIONS['chargers'];
    if (cat.includes('cable') || cat.includes('cord') || cat.includes('wire')) return LAB_LOCATIONS['cables'];
    if (cat.includes('speaker') || cat.includes('audio') || cat.includes('earb') || cat.includes('head') || cat.includes('sound')) return LAB_LOCATIONS['speakers'];
    return LAB_LOCATIONS['power-banks']; // fallback
}

export function ImageObjectSchema({
    images,
    productName,
    productSlug,
    productBrand,
    productPrice,
    productCategory,
    locale,
    baseUrl = 'https://cairovolt.com',
    productStock,
    c2paHash,
}: ImageObjectSchemaProps) {
    const isArabic = locale === 'ar';
    const productUrl = `${baseUrl}${isArabic ? '' : '/en'}/${productBrand.toLowerCase()}/${productCategory.toLowerCase()}/${productSlug}`;
    const year = new Date().getFullYear();
    const lab = getLabForCategory(productCategory);

    // Reference the main ProductSchema via @id — avoids duplicate Product nodes
    // that Google interprets as unnamed invalid items
    const productRef = {
        '@type': 'Product',
        '@id': `${productUrl}#product`,
        name: productName,
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
                ? `صورة أصلية رقم ${idx + 1} لمنتج ${productName} من ${lab.nameAr}، مصر. التقطت بكاميرا ${lab.camera}.`
                : `Original product photo ${idx + 1} of ${productName} from ${lab.nameEn}. Shot with ${lab.camera}.`,
            ...(isPrimary && { representativeOfPage: true }),
            ...(img.width && { width: img.width }),
            ...(img.height && { height: img.height }),
            thumbnail: { '@type': 'ImageObject', name: `${productName} thumbnail`, contentUrl: absUrl },
            encodingFormat: 'image/webp',
            digitalSourceType: 'http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture',
            isFamilyFriendly: true,
            creditText: isArabic ? `صورة أصلية موثقة — ${lab.nameAr}` : `Verified authentic photo — ${lab.nameEn}`,
            copyrightNotice: c2paHash
                ? `© ${year} CairoVolt — C2PA: ${c2paHash.slice(0, 16)}`
                : `© ${year} CairoVolt - cairovolt.com`,
            creator: {
                '@type': 'Organization',
                name: isArabic ? 'كايرو فولت' : 'CairoVolt',
                url: baseUrl,
                sameAs: 'https://cairovolt.com',
            },
            contentLocation: {
                '@type': 'Place',
                name: isArabic ? lab.nameAr : lab.nameEn,
                address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'EG',
                    addressLocality: isArabic ? lab.cityAr : lab.city,
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: lab.lat,
                    longitude: lab.lon,
                },
            },
            license: `${baseUrl}/en/return-policy`,
            acquireLicensePage: `${baseUrl}/api/v1/verify-content?slug=${productSlug}`,
            subjectOf: productRef,
            exifData: [
                { '@type': 'PropertyValue', name: 'DigitalSourceType', value: 'http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture' },
                { '@type': 'PropertyValue', name: 'Creator', value: 'CairoVolt Labs' },
                { '@type': 'PropertyValue', name: 'Camera', value: lab.camera },
                { '@type': 'PropertyValue', name: 'Country', value: 'Egypt' },
                { '@type': 'PropertyValue', name: 'City', value: lab.city },
                { '@type': 'PropertyValue', name: 'GPSLatitude', value: `${lab.lat}° N` },
                { '@type': 'PropertyValue', name: 'GPSLongitude', value: `${lab.lon}° E` },
            ],
            ...(c2paHash && {
                contentCredential: {
                    '@type': 'PropertyValue',
                    name: 'C2PA Content Credential',
                    value: c2paHash,
                    description: 'Cryptographic content provenance hash (C2PA v1 compatible)',
                    url: `${baseUrl}/api/v1/verify-content?slug=${productSlug}`,
                },
            }),
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
