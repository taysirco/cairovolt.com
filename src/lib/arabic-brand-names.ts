/**
 * Canonical Arabic display spellings for CairoVolt's listed brands.
 *
 * Keep technical identifiers, URLs, slugs, API values, and Schema.org Brand
 * entity names in their official Latin form. These helpers are only for
 * Arabic human-facing copy and localized descriptive metadata.
 */
export const ARABIC_BRAND_NAMES = {
    anker: 'انكر',
    soundcore: 'ساوندكور',
    joyroom: 'جوي روم',
} as const;

const LATIN_TOKEN_BOUNDARY = 'A-Za-z0-9_';

function hasUrlLikeContext(
    text: string,
    brandStart: number,
    brandEnd: number,
): boolean {
    const tokenBefore = text
        .slice(0, brandStart)
        .match(/[^\s"'<>()[\]{}]*$/u)?.[0] ?? '';
    const tokenAfter = text
        .slice(brandEnd)
        .match(/^[^\s"'<>()[\]{}]*/u)?.[0] ?? '';
    const token = `${tokenBefore}${text.slice(brandStart, brandEnd)}${tokenAfter}`;

    // Human-facing combined brand notation is prose, not a path. Keep this
    // ahead of the slash checks below so "Anker/Soundcore" is localized.
    if (/^(?:Anker|Soundcore|Joyroom|انكر|ساوندكور|جوي روم)[/-](?:Anker|Soundcore|Joyroom|انكر|ساوندكور|جوي روم)[.,:;!?]?$/u.test(token)) {
        return false;
    }

    // Protect absolute/relative URLs, fragments, handles, query values, and
    // attribute-like identifiers while still allowing sentence punctuation
    // such as "انكر؟" to be localized normally.
    return /^(?:https?:\/\/|www\.|\.{0,2}\/|[#@?])/iu.test(token)
        || tokenBefore.includes('=')
        || tokenBefore.includes('?')
        || tokenBefore.includes('#')
        || tokenBefore.includes('@')
        || (/^[?#]/u.test(tokenAfter) && tokenAfter.length > 1)
        || (tokenAfter.startsWith('&') && tokenAfter.includes('='))
        || /^[-a-z0-9]+(?:[-/][-a-z0-9]+)+$/u.test(token)
        || tokenBefore.includes('/')
        || /^\/[a-z0-9_-]+(?:[/?#.]|$)/u.test(tokenAfter)
        || /^\.[a-z]{2,}(?:[/:?#]|$)/iu.test(tokenAfter);
}

function replaceStandaloneLatinBrand(
    text: string,
    latinName: string,
    arabicName: string,
): string {
    const pattern = new RegExp(
        `(^|[^${LATIN_TOKEN_BOUNDARY}])${latinName}(?=$|[^${LATIN_TOKEN_BOUNDARY}])`,
        'gi',
    );

    return text.replace(
        pattern,
        (match, prefix: string, offset: number, source: string) => {
            const brandStart = offset + prefix.length;
            const brandEnd = brandStart + latinName.length;

            if (hasUrlLikeContext(source, brandStart, brandEnd)) {
                return match;
            }

            return `${prefix}${arabicName}`;
        },
    );
}

/**
 * Localize brand words inside Arabic-facing plain text.
 *
 * The token boundaries intentionally protect URL/domain/path occurrences such
 * as `/anker`, `/soundcore/audio`, and `anker.com/verify`.
 */
export function localizeArabicBrandNames(text: string): string {
    let localized = text
        .replace(/ساوند\s+كور/gu, ARABIC_BRAND_NAMES.soundcore)
        .replace(/أنكر/gu, ARABIC_BRAND_NAMES.anker)
        .replace(/جوي\s*روم/gu, ARABIC_BRAND_NAMES.joyroom);

    localized = replaceStandaloneLatinBrand(
        localized,
        'Soundcore',
        ARABIC_BRAND_NAMES.soundcore,
    );
    localized = replaceStandaloneLatinBrand(
        localized,
        'Anker',
        ARABIC_BRAND_NAMES.anker,
    );
    localized = replaceStandaloneLatinBrand(
        localized,
        'Joyroom',
        ARABIC_BRAND_NAMES.joyroom,
    );

    return localized;
}

/** Localize text nodes in rich HTML without touching tags or attributes. */
export function localizeArabicBrandHtml(html: string): string {
    return html
        .split(/(<[^>]*>)/g)
        .map((part) => part.startsWith('<') ? part : localizeArabicBrandNames(part))
        .join('');
}

/** Deep-localize a known human-facing Arabic content object. */
export function localizeArabicBrandContent<T>(value: T): T {
    if (typeof value === 'string') {
        return localizeArabicBrandNames(value) as T;
    }

    if (Array.isArray(value)) {
        return value.map((item) => localizeArabicBrandContent(item)) as T;
    }

    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [
                key,
                localizeArabicBrandContent(item),
            ]),
        ) as T;
    }

    return value;
}

/** Deep-localize only values nested under an `ar` key in bilingual data. */
export function localizeArabicFields<T>(value: T): T {
    const visit = (item: unknown, insideArabicField: boolean): unknown => {
        if (typeof item === 'string') {
            return insideArabicField ? localizeArabicBrandNames(item) : item;
        }

        if (Array.isArray(item)) {
            return item.map((entry) => visit(entry, insideArabicField));
        }

        if (item && typeof item === 'object') {
            return Object.fromEntries(
                Object.entries(item).map(([key, entry]) => [
                    key,
                    visit(entry, insideArabicField || key === 'ar'),
                ]),
            );
        }

        return item;
    };

    return visit(value, false) as T;
}

/** Return the localized display name while leaving unknown brands untouched. */
export function getBrandDisplayName(brand: string, locale: string): string {
    const trimmed = brand.trim();
    // URL slugs arrive lowercase ("anker"); normalize to Latin display first.
    const latinDisplay = /^[a-z0-9-]+$/.test(trimmed)
        ? trimmed
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ')
        : trimmed;

    if (locale !== 'ar') return latinDisplay;

    const normalized = latinDisplay.toLowerCase();
    if (normalized.includes('soundcore') || normalized.includes('ساوندكور') || normalized.includes('ساوند كور')) {
        return ARABIC_BRAND_NAMES.soundcore;
    }
    if (normalized.includes('joyroom') || normalized.includes('جوي روم') || normalized.includes('جويروم')) {
        return ARABIC_BRAND_NAMES.joyroom;
    }
    if (normalized.includes('anker') || normalized.includes('أنكر') || normalized.includes('انكر')) {
        return ARABIC_BRAND_NAMES.anker;
    }

    return localizeArabicBrandNames(latinDisplay);
}
