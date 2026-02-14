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
        type: 'Product',
        sameAs: 'https://en.wikipedia.org/wiki/Battery_charger#Portable',
    },
    charger: {
        name: 'Battery charger',
        nameAr: 'شاحن',
        type: 'Product',
        sameAs: 'https://en.wikipedia.org/wiki/Battery_charger',
    },
    earbuds: {
        name: 'Earbuds',
        nameAr: 'سماعات لاسلكية',
        type: 'Product',
        sameAs: 'https://en.wikipedia.org/wiki/Earbuds',
    },
    speaker: {
        name: 'Portable speaker',
        nameAr: 'مكبر صوت',
        type: 'Product',
        sameAs: 'https://en.wikipedia.org/wiki/Portable_speaker',
    },
    cable: {
        name: 'USB cable',
        nameAr: 'كابل USB',
        type: 'Product',
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
        additionalSameAs: ['https://www.wikidata.org/wiki/Q20722126'],
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
    },
    magsafe: {
        name: 'MagSafe',
        nameAr: 'ماج سيف',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/MagSafe_(iPhone)',
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
        'power-banks': ['anker', 'joyroom', 'powerBank', 'lithiumIon', 'usbC', 'usbPD'],
        'wall-chargers': ['anker', 'joyroom', 'charger', 'usbC', 'usbPD', 'gan', 'quickCharge'],
        'audio': ['anker', 'soundcore', 'joyroom', 'earbuds', 'anc', 'bluetooth'],
        'speakers': ['anker', 'soundcore', 'speaker', 'bluetooth'],
        'cables': ['anker', 'joyroom', 'cable', 'usbC'],
        'car-chargers': ['anker', 'joyroom', 'charger', 'usbC', 'quickCharge'],
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
        return [...base, 'anker', 'soundcore', 'usbC', 'usbPD', 'gan', 'lithiumIon'];
    }
    if (brandLower === 'joyroom') {
        return [...base, 'joyroom', 'usbC', 'bluetooth'];
    }
    return base;
}

/**
 * Get entities for a specific blog article by slug
 */
export function getEntitiesForArticle(slug: string): { about: string[]; mentions: string[] } {
    const articleEntityMap: Record<string, { about: string[]; mentions: string[] }> = {
        'best-power-bank-egypt-2026': {
            about: ['powerBank', 'egypt'],
            mentions: ['anker', 'joyroom', 'lithiumIon', 'usbC', 'usbPD', 'cairo'],
        },
        'anker-vs-joyroom-comparison': {
            about: ['anker', 'joyroom', 'egypt'],
            mentions: ['powerBank', 'charger', 'earbuds', 'cable', 'usbC', 'gan', 'cairo'],
        },
        'best-iphone-17-charger-egypt': {
            about: ['charger', 'apple', 'egypt'],
            mentions: ['anker', 'usbC', 'usbPD', 'gan', 'cairo'],
        },
        'how-to-identify-original-anker': {
            about: ['anker', 'egypt'],
            mentions: ['powerBank', 'charger', 'cairo'],
        },
        'best-bluetooth-earbuds-egypt-2026': {
            about: ['earbuds', 'egypt'],
            mentions: ['anker', 'soundcore', 'joyroom', 'anc', 'bluetooth', 'apple', 'cairo'],
        },
        'how-to-charge-power-bank-correctly': {
            about: ['powerBank', 'lithiumIon'],
            mentions: ['anker', 'joyroom', 'usbC', 'egypt'],
        },
        'best-samsung-s26-charger': {
            about: ['charger', 'samsung', 'egypt'],
            mentions: ['anker', 'usbC', 'usbPD', 'quickCharge', 'cairo'],
        },
        'original-vs-fake-apple-charger-egypt': {
            about: ['charger', 'apple', 'egypt'],
            mentions: ['anker', 'usbC', 'cairo'],
        },
        'best-power-bank-router-power-outage-egypt': {
            about: ['powerBank', 'egypt'],
            mentions: ['anker', 'lithiumIon', 'lifepo4', 'usbC', 'cairo'],
        },
        'do-fake-chargers-damage-iphone-battery': {
            about: ['charger', 'apple', 'lithiumIon'],
            mentions: ['anker', 'usbC', 'egypt', 'cairo'],
        },
    };

    return articleEntityMap[slug] || { about: ['egypt'], mentions: ['cairo'] };
}
