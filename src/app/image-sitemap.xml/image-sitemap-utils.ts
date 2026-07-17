import { extname } from 'node:path';
import { PUBLIC_IMAGE_PATHS } from './public-image-paths.generated';

const LOCAL_ORIGIN = 'https://cairovolt.com';
const IMAGE_EXTENSIONS = new Set([
    '.avif',
    '.gif',
    '.jpeg',
    '.jpg',
    '.png',
    '.svg',
    '.webp',
]);

// These hosts are already approved by the application image configuration.
// Some of them serve valid image responses from extensionless URLs.
const EXTENSIONLESS_IMAGE_HOSTS = new Set([
    'storage.googleapis.com',
    'lh3.googleusercontent.com',
]);

export interface ImageSitemapProductRoute {
    slug: string;
    brand: string;
    categorySlug: string;
}

function hasImageExtension(pathname: string) {
    return IMAGE_EXTENSIONS.has(extname(pathname).toLowerCase());
}

function getLocalAssetPath(pathname: string) {
    let decodedPath: string;

    try {
        decodedPath = decodeURIComponent(pathname);
    } catch {
        return null;
    }

    if (
        decodedPath.includes('\0')
        || decodedPath.includes('\\')
        || decodedPath.split('/').some(segment => segment === '.' || segment === '..')
        || !hasImageExtension(decodedPath)
    ) {
        return null;
    }

    return decodedPath.startsWith('/') ? decodedPath : null;
}

/**
 * Resolve a product or hub image into a crawlable sitemap URL.
 *
 * Local assets are accepted only when the referenced file is present in the
 * build-generated public image manifest. Remote assets must be credential-free
 * HTTPS URLs with an image extension or an approved image-delivery hostname.
 * No request or filesystem lookup is performed at runtime.
 */
export function resolveSitemapImageUrl(rawValue: unknown) {
    if (typeof rawValue !== 'string') return null;

    const value = rawValue.trim();
    if (!value || value.startsWith('//') || /[\u0000-\u001F\u007F]/.test(value)) {
        return null;
    }

    let url: URL;
    try {
        url = value.startsWith('/')
            ? new URL(value, LOCAL_ORIGIN)
            : new URL(value);
    } catch {
        return null;
    }

    if (url.protocol !== 'https:' || url.username || url.password) {
        return null;
    }

    url.hash = '';

    if (url.origin === LOCAL_ORIGIN) {
        const assetPath = getLocalAssetPath(url.pathname);
        return assetPath && PUBLIC_IMAGE_PATHS.has(assetPath) ? url.href : null;
    }

    let decodedPathname: string;
    try {
        decodedPathname = decodeURIComponent(url.pathname);
    } catch {
        return null;
    }

    const hostname = url.hostname.toLowerCase();
    const isFirebaseMediaUrl = hostname === 'firebasestorage.googleapis.com'
        && url.searchParams.get('alt') === 'media';
    const isSupportedRemoteImage = hostname === 'firebasestorage.googleapis.com'
        ? isFirebaseMediaUrl
        : EXTENSIONLESS_IMAGE_HOSTS.has(hostname) || hasImageExtension(decodedPathname);

    return isSupportedRemoteImage ? url.href : null;
}

function normalizeRouteSegment(value: unknown) {
    if (typeof value !== 'string') return null;
    const normalized = value.trim().toLowerCase();
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalized)
        ? normalized
        : null;
}

/** Build the final, non-redirecting product URL used by the public catalog. */
export function getCanonicalProductPath(product: ImageSitemapProductRoute) {
    const slug = normalizeRouteSegment(product.slug);
    const categorySlug = normalizeRouteSegment(product.categorySlug);
    let brandSlug = normalizeRouteSegment(product.brand);

    if (!slug || !categorySlug || !brandSlug) return null;

    // Older Firestore records classified Soundcore items under Anker. The
    // public route tree and canonical pages use /soundcore for audio products.
    if (brandSlug === 'anker' && (categorySlug === 'audio' || categorySlug === 'speakers')) {
        brandSlug = 'soundcore';
    }

    return `/${brandSlug}/${categorySlug}/${slug}`;
}
