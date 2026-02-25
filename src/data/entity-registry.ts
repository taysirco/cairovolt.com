/**
 * Entity Registry — Central repository of entities with Knowledge Graph links
 * Used by ArticleSchema and ProductSchema to inject `about` and `mentions`
 * for maximum entity-linking signals to Google's Knowledge Graph.
 */

export interface EntityRef {
    name: string;
    nameAr: string;
    type: string;          // schema.org @type
    sameAs: string;        // Wikipedia URL (primary)
    additionalSameAs?: string[]; // Wikidata, official sites
}

// ============================================
// BRAND ENTITIES
// ============================================

const brands: Record<string, EntityRef> = {
    anker: {
        name: 'Anker',
        nameAr: 'أنكر',
        type: 'Brand',
        sameAs: 'https://en.wikipedia.org/wiki/Anker_(company)',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q27646052', 'https://www.anker.com'],
    },
    soundcore: {
        name: 'Soundcore',
        nameAr: 'ساوند كور',
        type: 'Brand',
        sameAs: 'https://en.wikipedia.org/wiki/Anker_(company)#Soundcore',
        additionalSameAs: ['https://www.soundcore.com'],
    },
    joyroom: {
        name: 'Joyroom',
        nameAr: 'جوي روم',
        type: 'Brand',
        sameAs: 'https://www.joyroom.com',
        additionalSameAs: ['https://www.linkedin.com/company/joyroom-official'],
    },
    cairovolt: {
        name: 'Cairo Volt',
        nameAr: 'كايرو فولت',
        type: 'Organization',
        sameAs: 'https://cairovolt.com',
        additionalSameAs: [
            'https://www.facebook.com/cairovolt',
            'https://www.instagram.com/cairovolt',
        ],
    },
    apple: {
        name: 'Apple',
        nameAr: 'ابل',
        type: 'Brand',
        sameAs: 'https://en.wikipedia.org/wiki/Apple_Inc.',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q312'],
    },
    samsung: {
        name: 'Samsung',
        nameAr: 'سامسونج',
        type: 'Brand',
        sameAs: 'https://en.wikipedia.org/wiki/Samsung',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q20718'],
    },
};

// ============================================
// PRODUCT CATEGORY ENTITIES
// ============================================

const productCategories: Record<string, EntityRef> = {
    powerBank: {
        name: 'Power bank',
        nameAr: 'باور بانك',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Battery_charger#Portable',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q2015955'],
    },
    upsDevice: {
        name: 'Uninterruptible power supply',
        nameAr: 'جهاز UPS',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Uninterruptible_power_supply',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q190170'],
    },
    loadShedding: {
        name: 'Electricity load shedding',
        nameAr: 'تخفيف أحمال الكهرباء',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Rolling_blackout',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q1069792'],
    },
    charger: {
        name: 'Battery charger',
        nameAr: 'شاحن',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Battery_charger',
    },
    earbuds: {
        name: 'Earbuds',
        nameAr: 'سماعات لاسلكية',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Earbuds',
    },
    speaker: {
        name: 'Portable speaker',
        nameAr: 'مكبر صوت',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Portable_speaker',
    },
    cable: {
        name: 'USB cable',
        nameAr: 'كابل USB',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/USB',
    },
};

// ============================================
// TECHNOLOGY ENTITIES
// ============================================

const technologies: Record<string, EntityRef> = {
    usbC: {
        name: 'USB-C',
        nameAr: 'USB-C',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/USB-C',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q20722126', 'https://en.wikipedia.org/wiki/USB#USB_Type-C'],
    },
    vdslRouter: {
        name: 'VDSL',
        nameAr: 'راوتر VDSL',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/VDSL',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q7906'],
    },
    usbPD: {
        name: 'USB Power Delivery',
        nameAr: 'USB Power Delivery',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/USB_hardware#USB_Power_Delivery',
    },
    gan: {
        name: 'Gallium nitride',
        nameAr: 'GaN',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Gallium_nitride',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q173447'],
    },
    anc: {
        name: 'Active noise control',
        nameAr: 'إلغاء الضوضاء النشط',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Active_noise_control',
    },
    bluetooth: {
        name: 'Bluetooth',
        nameAr: 'بلوتوث',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Bluetooth',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q42490'],
    },
    lithiumIon: {
        name: 'Lithium-ion battery',
        nameAr: 'بطارية ليثيوم أيون',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Lithium-ion_battery',
    },
    lifepo4: {
        name: 'Lithium iron phosphate battery',
        nameAr: 'بطارية ليثيوم فوسفات الحديد',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Lithium_iron_phosphate_battery',
    },
    quickCharge: {
        name: 'Qualcomm Quick Charge',
        nameAr: 'Qualcomm Quick Charge',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Quick_Charge',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q17022071'],
    },
    magsafe: {
        name: 'MagSafe',
        nameAr: 'ماج سيف',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/MagSafe_(iPhone)',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q110456798'],
    },
    qi2: {
        name: 'Qi2',
        nameAr: 'Qi2',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Qi_(standard)',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q62074762'],
    },
};

// ============================================
// GEOGRAPHIC ENTITIES
// ============================================

const geographic: Record<string, EntityRef> = {
    egypt: {
        name: 'Egypt',
        nameAr: 'مصر',
        type: 'Country',
        sameAs: 'https://en.wikipedia.org/wiki/Egypt',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q79'],
    },
    cairo: {
        name: 'Cairo',
        nameAr: 'القاهرة',
        type: 'City',
        sameAs: 'https://en.wikipedia.org/wiki/Cairo',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q85'],
    },
    newCairo: {
        name: 'New Cairo',
        nameAr: 'القاهرة الجديدة',
        type: 'City',
        sameAs: 'https://en.wikipedia.org/wiki/New_Cairo',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q1031427'],
    },
    damietta: {
        name: 'New Damietta City',
        nameAr: 'مدينة دمياط الجديدة',
        type: 'City',
        sameAs: 'https://en.wikipedia.org/wiki/New_Damietta',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q6001891'],
    },
};

// ============================================
// FULL REGISTRY
// ============================================

export const entityRegistry = {
    ...brands,
    ...productCategories,
    ...technologies,
    ...geographic,
};

// ============================================
// HELPERS
// ============================================

/**
 * Convert entity refs to JSON-LD `about` or `mentions` format
 */
export function entitiesToJsonLd(entityKeys: string[], locale: 'ar' | 'en' = 'en') {
    return entityKeys
        .map(key => entityRegistry[key])
        .filter(Boolean)
        .map(entity => ({
            type: entity.type,
            name: locale === 'ar' ? entity.nameAr : entity.name,
            sameAs: entity.sameAs,
            ...(entity.additionalSameAs && { additionalSameAs: entity.additionalSameAs }),
        }));
}

/**
 * Get entities relevant to a specific product category
 */
export function getEntitiesForCategory(category: string): string[] {
    const base = ['egypt', 'cairo'];

    const categoryMap: Record<string, string[]> = {
        'power-banks': ['anker', 'joyroom', 'cairovolt', 'powerBank', 'upsDevice', 'loadShedding', 'vdslRouter', 'lithiumIon', 'lifepo4', 'usbC', 'usbPD', 'magsafe', 'qi2', 'newCairo'],
        'wall-chargers': ['anker', 'joyroom', 'cairovolt', 'charger', 'usbC', 'usbPD', 'gan', 'quickCharge', 'qi2'],
        'audio': ['anker', 'soundcore', 'joyroom', 'cairovolt', 'earbuds', 'anc', 'bluetooth'],
        'speakers': ['anker', 'soundcore', 'cairovolt', 'speaker', 'bluetooth'],
        'cables': ['anker', 'joyroom', 'cable', 'usbC', 'usbPD'],
        'car-chargers': ['anker', 'joyroom', 'cairovolt', 'charger', 'usbC', 'quickCharge', 'usbPD'],
        'smart-watches': ['joyroom', 'bluetooth'],
        'car-holders': ['joyroom'],
    };

    return [...base, ...(categoryMap[category] || [])];
}

/**
 * Get entities relevant to a specific brand
 */
export function getEntitiesForBrand(brand: string): string[] {
    const base = ['egypt', 'cairo'];
    const brandLower = brand.toLowerCase();

    if (brandLower === 'anker') {
        return [...base, 'anker', 'soundcore', 'cairovolt', 'usbC', 'usbPD', 'gan', 'lithiumIon', 'newCairo', 'damietta'];
    }
    if (brandLower === 'joyroom') {
        return [...base, 'joyroom', 'cairovolt', 'usbC', 'bluetooth'];
    }
    return base;
}

/**
 * Get entities for a specific blog article by slug
 */
export function getEntitiesForArticle(slug: string): { about: string[]; mentions: string[] } {
    const articleEntityMap: Record<string, { about: string[]; mentions: string[] }> = {
        'best-power-bank-egypt-2026': {
            about: ['powerBank', 'loadShedding', 'egypt'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'vdslRouter', 'upsDevice', 'lithiumIon', 'usbC', 'usbPD', 'newCairo', 'cairo'],
        },
        'anker-vs-joyroom-comparison': {
            about: ['anker', 'joyroom', 'egypt'],
            mentions: ['powerBank', 'charger', 'earbuds', 'cable', 'usbC', 'gan', 'cairovolt', 'cairo', 'damietta'],
        },
        'best-iphone-17-charger-egypt': {
            about: ['charger', 'apple', 'egypt'],
            mentions: ['anker', 'usbC', 'usbPD', 'gan', 'cairo'],
        },
        'how-to-identify-original-anker': {
            about: ['anker', 'egypt'],
            mentions: ['powerBank', 'charger', 'cairovolt', 'cairo', 'damietta'],
        },
        'best-bluetooth-earbuds-egypt-2026': {
            about: ['earbuds', 'egypt'],
            mentions: ['anker', 'soundcore', 'joyroom', 'cairovolt', 'anc', 'bluetooth', 'apple', 'cairo', 'newCairo'],
        },
        'how-to-charge-power-bank-correctly': {
            about: ['powerBank', 'lithiumIon'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbC', 'usbPD', 'lifepo4', 'egypt', 'cairo'],
        },
        'best-samsung-s26-charger': {
            about: ['charger', 'samsung', 'egypt'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbC', 'usbPD', 'quickCharge', 'gan', 'cairo', 'newCairo'],
        },
        'original-vs-fake-apple-charger-egypt': {
            about: ['charger', 'apple', 'egypt'],
            mentions: ['anker', 'cairovolt', 'usbC', 'usbPD', 'cairo', 'damietta'],
        },
        'best-power-bank-router-power-outage-egypt': {
            about: ['powerBank', 'loadShedding', 'egypt'],
            mentions: ['anker', 'cairovolt', 'vdslRouter', 'upsDevice', 'lithiumIon', 'lifepo4', 'usbC', 'newCairo', 'cairo'],
        },
        'do-fake-chargers-damage-iphone-battery': {
            about: ['charger', 'apple', 'lithiumIon'],
            mentions: ['anker', 'cairovolt', 'usbC', 'egypt', 'cairo'],
        },
    };

    return articleEntityMap[slug] || { about: ['egypt'], mentions: ['cairo'] };
}
