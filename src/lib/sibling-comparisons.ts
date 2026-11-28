/**
 * Curated server-resolved sibling comparison cards for priority product pairs.
 *
 * Rendered directly on product pages (visible SSR HTML, not hidden inside
 * collapsed accordions) to help undecided shoppers compare adjacent tiers
 * without bouncing back to search, while passing live catalogue prices and
 * contextual internal links between sibling models.
 *
 * SERVER-ONLY: reads from staticProducts so prices never drift from checkout.
 */
import { getProductBySlug } from '@/lib/static-products';

export interface SiblingComparisonRow {
    label: string;
    currentValue: string;
    siblingValue: string;
}

export interface SiblingComparisonData {
    heading: string;
    subheading: string;
    currentLabel: string;
    currentPrice: number;
    siblingLabel: string;
    siblingHref: string;
    siblingPrice: number;
    siblingCta: string;
    rows: SiblingComparisonRow[];
    comparisonGuide?: {
        label: string;
        href: string;
    };
    disambiguationNote?: {
        prefix: string;
        linkText: string;
        href: string;
        suffix: string;
    };
}

export function getSiblingComparisonForProduct(
    slug: string,
    locale: string,
): SiblingComparisonData | null {
    const isAr = locale === 'ar';
    const prefix = isAr ? '' : '/en';

    if (slug === 'soundcore-liberty-4-nc') {
        const current = getProductBySlug('soundcore-liberty-4-nc');
        const sibling = getProductBySlug('anker-soundcore-r50i-nc');
        if (!current || !sibling || sibling.status !== 'active') return null;

        return {
            heading: isAr
                ? 'مقارنة سريعة: ليبرتي 4 NC مقابل R50i NC'
                : 'Quick compare: Liberty 4 NC vs R50i NC',
            subheading: isAr
                ? 'أيهما يناسب ميزانيتك واستخدامك في مصر؟'
                : 'Which Soundcore ANC tier fits your phone and budget in Egypt?',
            currentLabel: isAr ? 'ليبرتي 4 NC (A3947)' : 'Liberty 4 NC (A3947)',
            currentPrice: current.price,
            siblingLabel: isAr ? 'R50i NC (A3959)' : 'R50i NC (A3959)',
            siblingHref: `${prefix}/soundcore/audio/anker-soundcore-r50i-nc`,
            siblingPrice: sibling.price,
            siblingCta: isAr ? 'شاهد صفحة R50i NC' : 'View R50i NC page',
            rows: [
                {
                    label: isAr ? 'العزل (ANC)' : 'ANC System',
                    currentValue: isAr ? 'Adaptive ANC 2.0 + HearID' : 'Adaptive ANC 2.0 + HearID',
                    siblingValue: isAr ? 'تكيفي معلن حتى 42dB' : '42dB adaptive (rated)',
                },
                {
                    label: isAr ? 'الصوت والكودك' : 'Driver & Codecs',
                    currentValue: isAr ? '11mm · LDAC (أندرويد) + AAC' : '11mm · Android LDAC + AAC',
                    siblingValue: isAr ? '10mm BassUp · SBC / AAC' : '10mm BassUp · SBC / AAC',
                },
                {
                    label: isAr ? 'البطارية والعلبة' : 'Battery & Case',
                    currentValue: isAr ? '9س 42د مقاسة (7س 51د ANC) · Qi' : '9h 42m measured (7h 51m ANC) · Qi',
                    siblingValue: isAr ? '40س 16د صافية (6س 12د ANC) · حامل 65°' : '40h 16m net (6h 12m ANC) · 65° stand',
                },
                {
                    label: isAr ? 'المكالمات والحماية' : 'Mics & IP Rating',
                    currentValue: isAr ? '6 مايكات AI · IPX4 · BT 5.3' : '6-mic AI · IPX4 · BT 5.3',
                    siblingValue: isAr ? '4 مايكات AI · IP54 · BT 5.4' : '4-mic AI · IP54 · BT 5.4',
                },
            ],
            comparisonGuide: {
                label: isAr
                    ? 'اقرأ المقارنة الكاملة: Liberty 4 NC ضد R50i NC في مصر'
                    : 'Read full Liberty 4 NC vs R50i NC comparison guide',
                href: `${prefix}/blog/soundcore-liberty-4-nc-vs-r50i-nc-comparison`,
            },
        };
    }

    if (slug === 'anker-soundcore-r50i-nc') {
        const current = getProductBySlug('anker-soundcore-r50i-nc');
        const sibling = getProductBySlug('soundcore-liberty-4-nc');
        const r50iBase = getProductBySlug('anker-soundcore-r50i');
        if (!current || !sibling || sibling.status !== 'active') return null;

        return {
            heading: isAr
                ? 'مقارنة سريعة: R50i NC مقابل ليبرتي 4 NC'
                : 'Quick compare: R50i NC vs Liberty 4 NC',
            subheading: isAr
                ? 'تبحث عن عزل أعلى وكودك LDAC وشحن لاسلكي؟ قارن الفئتين قبل الطلب.'
                : 'Deciding between budget ANC and mid-flagship LDAC + wireless charging?',
            currentLabel: isAr ? 'R50i NC (A3959)' : 'R50i NC (A3959)',
            currentPrice: current.price,
            siblingLabel: isAr ? 'ليبرتي 4 NC (A3947)' : 'Liberty 4 NC (A3947)',
            siblingHref: `${prefix}/soundcore/audio/soundcore-liberty-4-nc`,
            siblingPrice: sibling.price,
            siblingCta: isAr ? 'قارن مع ليبرتي 4 NC' : 'View Liberty 4 NC',
            rows: [
                {
                    label: isAr ? 'العزل (ANC)' : 'ANC System',
                    currentValue: isAr ? 'تكيفي معلن حتى 42dB' : '42dB adaptive (rated)',
                    siblingValue: isAr ? 'Adaptive ANC 2.0 + HearID' : 'Adaptive ANC 2.0 + HearID',
                },
                {
                    label: isAr ? 'الصوت والكودك' : 'Driver & Codecs',
                    currentValue: isAr ? '10mm BassUp · SBC / AAC' : '10mm BassUp · SBC / AAC',
                    siblingValue: isAr ? '11mm · LDAC (أندرويد) + AAC' : '11mm · Android LDAC + AAC',
                },
                {
                    label: isAr ? 'البطارية والعلبة' : 'Battery & Case',
                    currentValue: isAr ? '40س 16د صافية مقاسة · حامل 65°' : '40h 16m net measured · 65° stand',
                    siblingValue: isAr ? '9س 42د مقاسة (7س 51د ANC) · Qi' : '9h 42m measured (7h 51m ANC) · Qi',
                },
                {
                    label: isAr ? 'المكالمات والحماية' : 'Mics & IP Rating',
                    currentValue: isAr ? '4 مايكات AI · IP54 · BT 5.4' : '4-mic AI · IP54 · BT 5.4',
                    siblingValue: isAr ? '6 مايكات AI · IPX4 · BT 5.3' : '6-mic AI · IPX4 · BT 5.3',
                },
            ],
            comparisonGuide: {
                label: isAr
                    ? 'اقرأ المقارنة الكاملة: Liberty 4 NC ضد R50i NC في مصر'
                    : 'Read full Liberty 4 NC vs R50i NC comparison guide',
                href: `${prefix}/blog/soundcore-liberty-4-nc-vs-r50i-nc-comparison`,
            },
            ...(r50iBase && r50iBase.status === 'active' ? {
                disambiguationNote: {
                    prefix: isAr
                        ? 'ملاحظة: هذه النسخة بعزل ANC (موديل A3959). تبحث عن النسخة الأرخص بلا عزل؟ راجع '
                        : 'Note: this is the ANC model (A3959). Looking for the lower-priced non-ANC version? See ',
                    linkText: isAr
                        ? `ساوندكور R50i العادية (${r50iBase.price.toLocaleString('en-US')} ج.م)`
                        : `Soundcore R50i (${r50iBase.price.toLocaleString('en-US')} EGP)`,
                    href: `${prefix}/soundcore/audio/anker-soundcore-r50i`,
                    suffix: '.',
                },
            } : {}),
        };
    }

    if (slug === 'anker-soundcore-r50i') {
        const current = getProductBySlug('anker-soundcore-r50i');
        const sibling = getProductBySlug('anker-soundcore-r50i-nc');
        if (!current || !sibling || sibling.status !== 'active') return null;

        return {
            heading: isAr
                ? 'تريد عزل ضوضاء ANC وبطارية أطول؟ قارن R50i مع R50i NC'
                : 'Want active noise cancelling? Compare R50i vs R50i NC',
            subheading: isAr
                ? 'الفرق العملي بين A3949 (بلا عزل) وA3959 (بعزل 42dB وحامل موبايل).'
                : 'Key differences between A3949 (no ANC) and A3959 (42dB ANC + phone stand).',
            currentLabel: isAr ? 'R50i العادية (A3949)' : 'R50i Standard (A3949)',
            currentPrice: current.price,
            siblingLabel: isAr ? 'R50i NC (A3959)' : 'R50i NC (A3959)',
            siblingHref: `${prefix}/soundcore/audio/anker-soundcore-r50i-nc`,
            siblingPrice: sibling.price,
            siblingCta: isAr ? 'ترقية إلى R50i NC' : 'View R50i NC Upgrade',
            rows: [
                {
                    label: isAr ? 'عزل الضوضاء' : 'Active Noise Cancelling',
                    currentValue: isAr ? 'غير متوفر (عزل سلبي فقط)' : 'None (passive seal only)',
                    siblingValue: isAr ? 'عزل تكيفي معلن حتى 42dB' : '42dB adaptive ANC (rated)',
                },
                {
                    label: isAr ? 'البطارية الإجمالية' : 'Total Battery',
                    currentValue: isAr ? 'حتى 30 ساعة (معلنة)' : 'Up to 30h (rated)',
                    siblingValue: isAr ? '40س 16د صافية مقاسة (45س معلنة)' : '40h 16m net measured (45h rated)',
                },
                {
                    label: isAr ? 'البلوتوث والاتصال' : 'Bluetooth & Multipoint',
                    currentValue: isAr ? 'BT 5.3 · جهاز واحد' : 'BT 5.3 · Single device',
                    siblingValue: isAr ? 'BT 5.4 · Multipoint جهازين' : 'BT 5.4 · Dual-device Multipoint',
                },
                {
                    label: isAr ? 'العلبة والمقاومة' : 'Case & Protection',
                    currentValue: isAr ? 'علبة بحبل تعليق · IPX5' : 'Lanyard case · IPX5',
                    siblingValue: isAr ? 'علبة بحامل موبايل · IP54' : 'Phone-stand case · IP54',
                },
            ],
        };
    }

    return null;
}
