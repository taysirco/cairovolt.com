/**
 * Canonical brand entities for the three catalog brands.
 *
 * WHY THIS EXISTS
 * Search and AI systems resolve "Anker" or "جوي روم" against an entity graph,
 * not a string. A bare `{"@type":"Brand","name":"Anker"}` leaves that resolution
 * to guesswork; a Brand node carrying `sameAs` links to Wikidata and Wikipedia
 * states which real-world entity is meant. That is the difference between the
 * store being read as *about* the Anker brand and merely mentioning the word.
 *
 * Every URL below was verified to resolve (HTTP 200) and to describe the brand
 * we actually sell — Wikidata first, since it is the reconciliation key both
 * Google's Knowledge Graph and LLM entity linkers key on.
 *
 * Anker Innovations (the manufacturer, used as Product.manufacturer) is a
 * DIFFERENT entity from the Anker brand (Product.brand) — keep them distinct.
 *
 * Consumed by: GlobalBusinessSchema (on-page @graph), /api/knowledge-graph,
 * and ProductSchema (which references these @ids instead of restating them).
 */

export const BRAND_ENTITY_BASE_URL = 'https://cairovolt.com';

export interface BrandEntity {
    /** Lowercase catalog key — matches product.brand.toLowerCase(). */
    key: string;
    /** Schema `name` — the brand's own Latin spelling. */
    name: string;
    /** Arabic spelling used in Arabic headings and copy. */
    arabicName: string;
    /** Stable JSON-LD node id, shared by every surface that emits this brand. */
    id: string;
    /** Verified external identity records (Wikidata → Wikipedia → official site). */
    sameAs: string[];
    /** One-line factual description; no marketing language. */
    description: { en: string; ar: string };
}

function brandId(key: string): string {
    return `${BRAND_ENTITY_BASE_URL}/#brand-${key}`;
}

export const BRAND_ENTITIES: readonly BrandEntity[] = [
    {
        key: 'anker',
        name: 'Anker',
        arabicName: 'انكر',
        id: brandId('anker'),
        sameAs: [
            'https://www.wikidata.org/wiki/Q28452620',
            'https://en.wikipedia.org/wiki/Anker_Innovations',
            'https://www.anker.com',
        ],
        description: {
            en: 'Consumer electronics brand for charging and power accessories, owned by Anker Innovations.',
            ar: 'علامة إلكترونيات استهلاكية لمنتجات الشحن والطاقة، مملوكة لشركة Anker Innovations.',
        },
    },
    {
        key: 'soundcore',
        name: 'Soundcore',
        arabicName: 'ساوندكور',
        id: brandId('soundcore'),
        sameAs: [
            'https://www.wikidata.org/wiki/Q135908171',
            'https://en.wikipedia.org/wiki/Soundcore',
            'https://www.soundcore.com',
        ],
        description: {
            en: 'Audio brand of Anker Innovations, covering earbuds, headphones, and speakers.',
            ar: 'العلامة الصوتية التابعة لشركة Anker Innovations، وتشمل السماعات ومكبرات الصوت.',
        },
    },
    {
        key: 'joyroom',
        name: 'Joyroom',
        arabicName: 'جوي روم',
        id: brandId('joyroom'),
        sameAs: [
            'https://www.wikidata.org/wiki/Q140244997',
            'https://www.joyroom.com',
        ],
        description: {
            en: 'Consumer electronics brand for mobile accessories, including chargers, cables, and power banks.',
            ar: 'علامة إلكترونيات استهلاكية لإكسسوارات الموبايل، وتشمل الشواحن والكابلات والباور بانك.',
        },
    },
] as const;

const BRAND_ENTITY_BY_KEY = new Map(BRAND_ENTITIES.map(brand => [brand.key, brand]));

/** Look up a brand entity by any casing of the catalog brand name. */
export function getBrandEntity(brand: string | undefined): BrandEntity | undefined {
    return brand ? BRAND_ENTITY_BY_KEY.get(brand.toLowerCase()) : undefined;
}

/**
 * schema.org Brand nodes for the JSON-LD `@graph`.
 * Product nodes reference these by `@id` rather than repeating the identity.
 */
export function buildBrandSchemaNodes(locale: string): Array<Record<string, unknown>> {
    const isArabic = locale === 'ar';
    return BRAND_ENTITIES.map(brand => ({
        '@type': 'Brand',
        '@id': brand.id,
        name: brand.name,
        alternateName: brand.arabicName,
        description: isArabic ? brand.description.ar : brand.description.en,
        sameAs: brand.sameAs,
    }));
}
