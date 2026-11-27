/**
 * Shared Organization identity signals and verified Product entity links.
 *
 * Single source of truth consumed by:
 * - GlobalBusinessSchema (on-page OnlineStore JSON-LD @graph)
 * - /api/knowledge-graph (machine/AI entity graph)
 * - ProductSchema (product-level alternateName and verified manufacturer sameAs)
 *
 * Every external URL listed here represents either an official CairoVolt profile
 * or a verified HTTP-200 official manufacturer product page. Never list
 * unverified, broken, or unrelated third-party URLs.
 */

export const ORGANIZATION_TELEPHONE = '+201558245974';

/**
 * Verified official CairoVolt profiles across social, code, research, and
 * publishing platforms for OnlineStore.sameAs entity reconciliation.
 */
export const ORGANIZATION_SAME_AS: readonly string[] = [
    'https://www.facebook.com/cairovolt',
    'https://www.instagram.com/cairovolt',
    'https://www.tiktok.com/@cairovolt',
    'https://x.com/cairovolt',
    'https://www.youtube.com/@cairovolt',
    'https://github.com/cairovolt123',
    'https://gitlab.com/cairovolt.com',
    'https://huggingface.co/cairovolt123',
    'https://cairovoltcom.substack.com',
    'https://dev.to/ahmed_fe8ba0bcbc449dcec06',
    'https://medium.com/@cairovolt.com',
    'https://mastodon.social/@CairoVolt',
    'https://cairovolt.gumroad.com',
    'https://linktr.ee/cairovolt',
    'https://hackaday.io/cairovolt123',
    'https://500px.com/p/cairovoltcom',
    'https://about.me/cairovolt123',
];

export interface ProductEntityMeta {
    /** Bilingual canonical model aliases shoppers and AI systems query by. */
    alternateNames: {
        en: readonly string[];
        ar: readonly string[];
    };
    /** Verified HTTP-200 official manufacturer product page(s), when available. */
    sameAs?: readonly string[];
}

export const PRODUCT_ENTITY_META: Readonly<Record<string, ProductEntityMeta>> = {
    'soundcore-liberty-4-nc': {
        alternateNames: {
            en: [
                'Anker Soundcore Liberty 4 NC',
                'Soundcore Liberty 4 NC A3947',
                'Anker Liberty 4 NC',
                'ساوندكور ليبرتي 4 NC',
            ],
            ar: [
                'Anker Soundcore Liberty 4 NC',
                'Soundcore Liberty 4 NC A3947',
                'سماعة انكر ليبرتي 4 NC',
                'ايربودز ساوندكور ليبرتي 4 NC',
            ],
        },
        // Verified HTTP 200 official manufacturer listing on soundcore.com.
        sameAs: ['https://www.soundcore.com/products/liberty-4-nc-a3947z11'],
    },
    'anker-soundcore-r50i-nc': {
        alternateNames: {
            en: [
                'Anker Soundcore R50i NC',
                'Soundcore R50i NC A3959',
                'Soundcore R50i NC A3959H11',
                'Anker R50i NC',
                'سماعة انكر R50i NC',
            ],
            ar: [
                'Anker Soundcore R50i NC',
                'Soundcore R50i NC A3959',
                'سماعة انكر R50i NC',
                'ايربودز انكر ساوندكور R50i NC',
            ],
        },
    },
};

export function getProductEntityMeta(slug: string): ProductEntityMeta | undefined {
    return PRODUCT_ENTITY_META[slug];
}
