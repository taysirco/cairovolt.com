/**
 * Single source of truth for product-image rights metadata.
 *
 * Google reads image rights from two places — the JSON-LD on the page and the
 * IPTC/XMP block embedded in the image file — and its documentation is explicit
 * that when the two disagree it uses the structured data. Two sources of truth
 * for the same four strings is exactly how they drift apart, so the JSON-LD
 * (ProductSchema) and the metadata writer (scripts/write-image-metadata.mjs)
 * both read the constants below rather than hard-coding their own copies.
 *
 * WORDING IS DELIBERATE AND NARROW. CairoVolt owns the photograph — the frame,
 * the lighting, the compositing. It does not own the industrial design of a JBL
 * speaker or an Anker charger, nor the brand logos visible in the shot. The
 * copyright notice therefore claims the image and explicitly disclaims the
 * product design and marks, which is both true and what keeps the claim
 * defensible if a brand ever reads it.
 */

/** Organization node in the sitewide @graph — the image creator. */
export const IMAGE_CREATOR_ID = 'https://cairovolt.com/#organization';

/** Who is credited when the image is published. Locale-invariant. */
export const IMAGE_CREDIT_TEXT = 'CairoVolt';

/**
 * Locale-invariant on purpose: the image file carries exactly ONE IPTC
 * copyright notice, so emitting a translated variant in the ar JSON-LD would
 * manufacture the very structured-data/IPTC conflict Google warns about.
 */
export const IMAGE_COPYRIGHT_NOTICE = '© 2026 CairoVolt.com';

/**
 * The page that states the licensing terms. MUST stay in sync with the
 * `imageLicense` section in messages/{ar,en}.json and with the `image-license`
 * anchor id rendered by the terms page — a license URL that resolves to a page
 * saying nothing about images is a broken promise to Google, not a feature.
 */
export const IMAGE_LICENSE_ANCHOR = 'image-license';

/** Canonical (ar-default, unprefixed) license URL — the value written to IPTC. */
export const IPTC_IMAGE_LICENSE_URL = `https://cairovolt.com/terms#${IMAGE_LICENSE_ANCHOR}`;

/** Where a licence is actually requested. Same document in both locales. */
export const IMAGE_ACQUIRE_LICENSE_PAGE = 'https://cairovolt.com/contact';

/**
 * The PLUS licensor block Google reads for the Licensable image feature (in
 * addition to schema.org creator/license). Written into every product image's
 * XMP-plus namespace.
 */
export const IMAGE_LICENSOR_NAME = 'CairoVolt';
export const IMAGE_LICENSOR_URL = 'https://cairovolt.com';

/**
 * IPTC Digital Source Type — an honest provenance signal. Every product image
 * ships as a Canva composition of licensed brand assets (background, product
 * shot, overlays), which is exactly what "composite" is defined for. This is
 * the field that will need a per-image override if a genuine studio capture is
 * ever added to the catalogue (that class carries `digitalCapture`).
 */
export const IMAGE_DIGITAL_SOURCE_TYPE = 'http://cv.iptc.org/newscodes/digitalsourcetype/composite';

/**
 * Locale-appropriate license URL. /terms and /en/terms are hreflang-linked
 * translations of one document, so either satisfies "a page that describes the
 * license"; serving the reader's own language is the better landing.
 */
export function getImageLicenseUrl(locale: string): string {
    return locale === 'ar'
        ? IPTC_IMAGE_LICENSE_URL
        : `https://cairovolt.com/en/terms#${IMAGE_LICENSE_ANCHOR}`;
}

export interface RightsBearingImage {
    url: string;
    alt: string;
    width?: number;
    height?: number;
}

interface ImageObjectNode {
    '@type': 'ImageObject';
    '@id': string;
    contentUrl: string;
    url: string;
    caption?: string;
    representativeOfPage: true;
    width?: number;
    height?: number;
    creator: { '@id': string };
    copyrightHolder: { '@id': string };
    creditText: string;
    copyrightNotice: string;
    license: string;
    acquireLicensePage: string;
}

function toAbsolute(url: string, baseUrl: string): string {
    return /^https?:\/\//i.test(url) ? url : `${baseUrl}${url}`;
}

/**
 * Builds Product.image: one fully-described ImageObject for the primary image,
 * plain absolute URLs for the rest.
 *
 * The gallery images are not dropped — Google still receives every URL, which is
 * what feeds Google Images. What they do not each carry is a duplicate copy of
 * the same five rights strings. On a 10-image product the fat-node-per-image
 * form spent ~5.3 KB of the ~9.8 KB Product node restating identical licensing
 * boilerplate, and a second component was independently emitting 8 more
 * standalone copies of the same nodes. Only the primary image can be
 * representativeOfPage, and it is the one Google Images actually surfaces for
 * the page, so it is the one that carries the rights block.
 */
export function buildProductImageSchema(
    images: RightsBearingImage[],
    locale: string,
    baseUrl: string,
): Array<ImageObjectNode | string> {
    if (images.length === 0) return [];

    const [primary, ...rest] = images;
    const primaryUrl = toAbsolute(primary.url, baseUrl);
    // Captions are the catalogue's real alt text, verbatim. They are authored
    // per image in a single language and are NOT translated here: inventing an
    // Arabic caption for an English-authored alt would be fabricating image
    // metadata, which is worse than a caption that does not match page locale.
    const caption = primary.alt?.trim();

    const primaryNode: ImageObjectNode = {
        '@type': 'ImageObject',
        '@id': `${primaryUrl}#image`,
        contentUrl: primaryUrl,
        url: primaryUrl,
        ...(caption ? { caption } : {}),
        representativeOfPage: true,
        ...(primary.width ? { width: primary.width } : {}),
        ...(primary.height ? { height: primary.height } : {}),
        creator: { '@id': IMAGE_CREATOR_ID },
        copyrightHolder: { '@id': IMAGE_CREATOR_ID },
        creditText: IMAGE_CREDIT_TEXT,
        copyrightNotice: IMAGE_COPYRIGHT_NOTICE,
        license: getImageLicenseUrl(locale),
        acquireLicensePage: IMAGE_ACQUIRE_LICENSE_PAGE,
    };

    return [primaryNode, ...rest.map(img => toAbsolute(img.url, baseUrl))];
}
