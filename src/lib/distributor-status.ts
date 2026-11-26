/**
 * CairoVolt's relationship with the brands it sells — the single source of truth.
 *
 * OWNER-CONFIRMED FACTS (2026-11-26):
 * - CairoVolt is an OFFICIAL DISTRIBUTOR ("موزع رسمي") in Egypt of:
 *     • Anker — all Anker-branded products (charging, power, cables, accessories)
 *     • Soundcore — Anker's audio brand
 *     • Joyroom — every Joyroom line CairoVolt sells
 * - The status was granted directly by the brands (Anker and Joyroom).
 * - A distribution document exists and the site may mention it. The owner has
 *   NOT supplied a grant date, certificate number or quote — never publish one.
 * - The status is NOT exclusive: always "an official distributor" /
 *   "موزع رسمي" (indefinite). Never "the only", "exclusive", "sole",
 *   "الوحيد", "الحصري", or "الوكيل" for CairoVolt.
 * - JBL is NOT covered. JBL products are sold as an independent retailer.
 * - Warranty terms and name are UNCHANGED: the "CairoVolt store warranty"
 *   (ضمان متجر كايرو فولت), issued and serviced by CairoVolt, with a physical
 *   warranty card whose serial is checked/activated at /verify. Durations live
 *   in src/lib/warranty-policy.ts.
 *
 * Surfaces that state the relationship (JSON-LD, llms.txt, knowledge graph,
 * markdown twins, About/Contact/Warranty pages) read from here so the wording
 * cannot drift between them.
 */

export type DistributorLocale = 'ar' | 'en';

/** Catalog brand keys (lowercase) covered by the official-distributor status. */
export const OFFICIAL_DISTRIBUTOR_BRAND_KEYS = ['anker', 'soundcore', 'joyroom'] as const;

const OFFICIAL_DISTRIBUTOR_BRAND_SET: ReadonlySet<string> = new Set(OFFICIAL_DISTRIBUTOR_BRAND_KEYS);

/** True for Anker, Soundcore and Joyroom; false for JBL and anything unknown. */
export function isOfficialDistributorBrand(brand?: string | null): boolean {
    return Boolean(brand && OFFICIAL_DISTRIBUTOR_BRAND_SET.has(brand.trim().toLowerCase()));
}

/** The one-sentence statement of the relationship. */
export const DISTRIBUTOR_STATEMENT: Readonly<Record<DistributorLocale, string>> = {
    en: 'CairoVolt is an official distributor of Anker (including its Soundcore audio brand) and Joyroom in Egypt.',
    ar: 'كايرو فولت موزع رسمي لمنتجات انكر (ومنها علامتها الصوتية ساوندكور) وجوي روم في مصر.',
};

/** Where the status comes from — owner-confirmed, no date or number published. */
export const DISTRIBUTOR_GRANT: Readonly<Record<DistributorLocale, string>> = {
    en: 'The status was granted directly by Anker and Joyroom, and the distribution document is available for review on request at info@cairovolt.com.',
    ar: 'وهذه الصفة ممنوحة مباشرةً من انكر وجوي روم، ومستند التوزيع متاح للاطلاع عند الطلب عبر info@cairovolt.com.',
};

/** JBL is outside the distributor status. */
export const JBL_RELATIONSHIP: Readonly<Record<DistributorLocale, string>> = {
    en: 'JBL products are sold by CairoVolt as an independent retailer; CairoVolt is not an official JBL distributor.',
    ar: 'أما منتجات JBL فتبيعها كايرو فولت كمتجر تجزئة مستقل، وكايرو فولت ليست موزعًا رسميًا لـ JBL.',
};

/** What the warranty card is, stated once for every surface. */
export const WARRANTY_CARD_STATEMENT: Readonly<Record<DistributorLocale, string>> = {
    en: 'Eligible orders include a physical CairoVolt warranty card; its serial is activated and checked at cairovolt.com/verify, and claims are handled directly by CairoVolt.',
    ar: 'تصل الطلبات المؤهلة مع كرت ضمان كايرو فولت مطبوع؛ يُفعَّل سيرياله ويُراجَع على cairovolt.com/verify، وتتولى كايرو فولت طلبات الضمان مباشرةً.',
};

/** Full disclosure paragraph: status + grant + JBL carve-out. */
export function getDistributorDisclosure(locale: DistributorLocale): string {
    return `${DISTRIBUTOR_STATEMENT[locale]} ${DISTRIBUTOR_GRANT[locale]} ${JBL_RELATIONSHIP[locale]}`;
}

/**
 * Organization.description for the site-wide OnlineStore node and its mirror
 * in /api/knowledge-graph. States the distributor status first, then the JBL
 * carve-out, so no reader can stretch the claim to all four brands.
 */
export function getOrganizationDescription(locale: DistributorLocale): string {
    return locale === 'ar'
        ? 'كايرو فولت متجر إلكتروني مصري وموزع رسمي لمنتجات انكر (ومنها ساوندكور) وجوي روم في مصر، ويبيع أيضًا منتجات JBL كمتجر تجزئة مستقل؛ مع مواصفات وأسعار وسياسات مكتوبة، وضمان متجر كايرو فولت بكرت ضمان مطبوع، وتوصيل داخل مصر.'
        : 'CairoVolt is an Egyptian online store and an official distributor of Anker (including Soundcore) and Joyroom in Egypt; it also sells JBL products as an independent retailer. It publishes specifications, prices, and policies, backs eligible products with the CairoVolt store warranty and a physical warranty card, and delivers within Egypt.';
}

/**
 * schema.org `hasCredential` nodes (Organization → Credential) for the
 * distributor status — the only Organization property that can carry a
 * granted status. `Brand` is deliberately NOT used: schema.org defines
 * Organization.brand as brands the organization *maintains*, which a
 * distributor does not. No `recognizedBy` legal entity, date, or document
 * number is emitted: none has been supplied, and none may be invented.
 * `about` points at the shared Brand nodes from src/lib/brand-entities.ts.
 */
export function buildDistributorCredentialNodes(
    locale: DistributorLocale,
    brandIds: { anker: string; soundcore: string; joyroom: string },
): Array<Record<string, unknown>> {
    const isArabic = locale === 'ar';
    const egypt = { '@type': 'Country', name: isArabic ? 'مصر' : 'Egypt' };
    const category = isArabic ? 'موزع رسمي' : 'Official distributor';
    return [
        {
            '@type': 'Credential',
            '@id': 'https://cairovolt.com/#credential-anker-distributor',
            name: isArabic
                ? 'موزع رسمي لمنتجات انكر وساوندكور في مصر'
                : 'Official distributor of Anker and Soundcore products in Egypt',
            credentialCategory: category,
            about: [{ '@id': brandIds.anker }, { '@id': brandIds.soundcore }],
            validIn: egypt,
        },
        {
            '@type': 'Credential',
            '@id': 'https://cairovolt.com/#credential-joyroom-distributor',
            name: isArabic
                ? 'موزع رسمي لمنتجات جوي روم في مصر'
                : 'Official distributor of Joyroom products in Egypt',
            credentialCategory: category,
            about: { '@id': brandIds.joyroom },
            validIn: egypt,
        },
    ];
}

const BRAND_LABELS: Record<string, { en: string; ar: string }> = {
    anker: { en: 'Anker', ar: 'انكر' },
    soundcore: { en: 'Soundcore', ar: 'ساوندكور' },
    joyroom: { en: 'Joyroom', ar: 'جوي روم' },
    jbl: { en: 'JBL', ar: 'JBL' },
};

/**
 * Short per-brand relationship label, e.g. "Official Anker distributor in Egypt"
 * or, for JBL, "Independent JBL retailer". Returns '' for an unknown brand.
 */
export function getBrandRelationshipLabel(brand: string | null | undefined, locale: DistributorLocale): string {
    const key = brand?.trim().toLowerCase() || '';
    const label = BRAND_LABELS[key];
    if (!label) return '';
    if (isOfficialDistributorBrand(key)) {
        return locale === 'ar'
            ? `موزع رسمي لمنتجات ${label.ar} في مصر`
            : `Official ${label.en} distributor in Egypt`;
    }
    return locale === 'ar'
        ? `متجر تجزئة مستقل لمنتجات ${label.ar}`
        : `Independent ${label.en} retailer`;
}
