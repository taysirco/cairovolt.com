/**
 * Brand Entities — Central repository of brand and product entities
 * Used by ArticleSchema and ProductSchema to populate `about` and `mentions`
 * for structured entity context.
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
        nameAr: 'انكر',
        type: 'Brand',
        sameAs: 'https://en.wikipedia.org/wiki/Anker_(brand)',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q28452620', 'https://www.anker.com'],
    },
    soundcore: {
        name: 'Soundcore',
        nameAr: 'ساوندكور',
        type: 'Brand',
        sameAs: 'https://en.wikipedia.org/wiki/Anker_(brand)#Soundcore',
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
        name: 'CairoVolt',
        nameAr: 'كايرو فولت',
        type: 'Organization',
        sameAs: 'https://cairovolt.com',
        additionalSameAs: [
            'https://www.facebook.com/cairovolt',
            'https://www.instagram.com/cairovolt',
            'https://www.tiktok.com/@cairovolt',
            'https://www.linkedin.com/company/cairovolt',
            'https://kaggle.com/cairovolt',
            'https://wa.me/201558245974',
            'https://x.com/cairovolt',
            'https://www.youtube.com/@cairovolt',
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
        additionalSameAs: ['https://www.wikidata.org/wiki/Q2208745'],
    },
    upsDevice: {
        name: 'Uninterruptible power supply',
        nameAr: 'جهاز UPS',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Uninterruptible_power_supply',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q207696'],
    },
    loadShedding: {
        name: 'Electricity load shedding',
        nameAr: 'تخفيف أحمال الكهرباء',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Rolling_blackout',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q1438438'],
    },
    charger: {
        name: 'Battery charger',
        nameAr: 'شاحن',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Battery_charger',
    },
    carCharger: {
        name: 'Car charger',
        nameAr: 'شاحن سيارة',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Battery_charger#Vehicle-mounted',
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
        additionalSameAs: ['https://www.wikidata.org/wiki/Q20026619', 'https://en.wikipedia.org/wiki/USB#USB_Type-C'],
    },
    vdslRouter: {
        name: 'VDSL',
        nameAr: 'راوتر VDSL',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/VDSL',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q823923'],
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
        additionalSameAs: ['https://www.wikidata.org/wiki/Q411713'],
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
        additionalSameAs: ['https://www.wikidata.org/wiki/Q39531'],
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
        additionalSameAs: ['https://www.wikidata.org/wiki/Q28456421'],
    },
    magsafe: {
        name: 'MagSafe',
        nameAr: 'ماج سيف',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/MagSafe_(iPhone)',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q100338267'],
    },
    qi2: {
        name: 'Qi2',
        nameAr: 'Qi2',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Qi_(standard)',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q1357469'],
    },
    fastCharging: {
        name: 'Fast charging',
        nameAr: 'الشحن السريع',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Quick_Charge',
    },
    thermalRunaway: {
        name: 'Thermal runaway',
        nameAr: 'الانفلات الحراري',
        type: 'Thing',
        sameAs: 'https://en.wikipedia.org/wiki/Thermal_runaway',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q1972262'],
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
        additionalSameAs: ['https://www.wikidata.org/wiki/Q12191144'],
    },
    damietta: {
        name: 'New Damietta City',
        nameAr: 'مدينة دمياط الجديدة',
        type: 'City',
        sameAs: 'https://en.wikipedia.org/wiki/New_Damietta',
        additionalSameAs: ['https://www.wikidata.org/wiki/Q12211943'],
    },
};

// ============================================
// FULL REGISTRY
// ============================================

export const brandEntities = {
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
        .map(key => brandEntities[key])
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
        // Anker post-migration = charging products only (no Soundcore audio)
        return [...base, 'anker', 'cairovolt', 'usbC', 'usbPD', 'gan', 'lithiumIon', 'newCairo', 'damietta'];
    }
    if (brandLower === 'soundcore') {
        // Soundcore = Anker's audio sub-brand (earbuds + speakers)
        // 'anker' included as parent entity for relationship signaling
        return [...base, 'soundcore', 'anker', 'cairovolt', 'bluetooth', 'earbuds', 'speaker', 'anc'];
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
        'does-fast-charging-damage-battery-truth': {
            about: ['fastCharging', 'lithiumIon', 'charger'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'gan', 'usbPD', 'usbC', 'quickCharge', 'thermalRunaway', 'egypt', 'cairo'],
        },
        'power-bank-airplane-rules-egypt-2026': {
            about: ['powerBank', 'lithiumIon', 'egypt'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'thermalRunaway', 'cairo'],
        },
        'best-car-charger-egypt-2026': {
            about: ['carCharger', 'charger', 'egypt'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbC', 'usbPD', 'quickCharge', 'cable', 'cairo'],
        },
        'why-phone-charging-slowly-causes-solutions': {
            about: ['fastCharging', 'cable', 'charger'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbC', 'usbPD', 'lithiumIon', 'apple', 'samsung', 'egypt', 'cairo'],
        },
        'usb-c-cable-guide-egypt-2026': {
            about: ['cable', 'usbC', 'egypt'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbPD', 'apple', 'samsung', 'fastCharging', 'cairo'],
        },
        'protect-phone-from-heat-summer-egypt': {
            about: ['lithiumIon', 'egypt'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'gan', 'usbC', 'usbPD', 'charger', 'powerBank', 'cable', 'apple', 'samsung', 'fastCharging', 'thermalRunaway', 'cairo', 'newCairo'],
        },
        'power-bank-10000mah-real-capacity-myth': {
            about: ['powerBank', 'lithiumIon', 'egypt'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbC', 'usbPD', 'cable', 'fastCharging', 'cairo', 'newCairo'],
        },
        // — New articles (batch 2) —
        'best-fast-chargers-for-samsung-s26-yahya-radwan': {
            about: ['charger', 'samsung', 'egypt'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbC', 'usbPD', 'quickCharge', 'gan', 'fastCharging', 'cairo'],
        },
        'the-hidden-truth-about-gan-chargers-ahmed-medhat': {
            about: ['gan', 'charger', 'egypt'],
            mentions: ['anker', 'cairovolt', 'usbC', 'usbPD', 'fastCharging', 'thermalRunaway', 'cairo'],
        },
        'how-to-spot-fake-chargers-7-tests': {
            about: ['charger', 'egypt'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'apple', 'samsung', 'usbC', 'cairo'],
        },
        'gan-charger-technology-guide-egypt': {
            about: ['gan', 'charger', 'egypt'],
            mentions: ['anker', 'cairovolt', 'usbC', 'usbPD', 'fastCharging', 'cairo'],
        },
        'soundcore-models-guide-egypt-2026': {
            about: ['soundcore', 'earbuds', 'egypt'],
            mentions: ['anker', 'cairovolt', 'anc', 'bluetooth', 'speaker', 'cairo'],
        },
        'why-charging-cable-breaks-fast-causes-fixes': {
            about: ['cable', 'usbC'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'apple', 'egypt', 'cairo'],
        },
        'can-power-bank-charge-laptop-guide': {
            about: ['powerBank', 'usbPD'],
            mentions: ['anker', 'cairovolt', 'usbC', 'lithiumIon', 'egypt', 'cairo'],
        },
        'best-power-bank-under-1000-egp-egypt': {
            about: ['powerBank', 'egypt'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'lithiumIon', 'usbC', 'usbPD', 'fastCharging', 'cairo'],
        },
        'best-100w-fast-charge-power-bank-iphone-samsung': {
            about: ['powerBank', 'fastCharging'],
            mentions: ['anker', 'cairovolt', 'usbC', 'usbPD', 'apple', 'samsung', 'lithiumIon', 'egypt', 'cairo'],
        },
        'galaxy-s26-ultra-vs-iphone-17-pro-max-power-bank-needs': {
            about: ['powerBank', 'samsung', 'apple'],
            mentions: ['anker', 'cairovolt', 'usbC', 'usbPD', 'fastCharging', 'lithiumIon', 'egypt', 'cairo'],
        },
        'magsafe-magnetic-power-bank-worth-extra-cost': {
            about: ['powerBank', 'magsafe', 'qi2'],
            mentions: ['anker', 'cairovolt', 'apple', 'lithiumIon', 'egypt', 'cairo'],
        },
        'power-bank-for-photographers-dslr-cameras': {
            about: ['powerBank', 'usbPD'],
            mentions: ['anker', 'cairovolt', 'usbC', 'lithiumIon', 'egypt', 'cairo'],
        },
        'power-bank-gaming-pubg-freefire-cooling': {
            about: ['powerBank', 'fastCharging'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbC', 'lithiumIon', 'thermalRunaway', 'egypt', 'cairo'],
        },
        '5000-vs-10000-vs-20000-mah-which-capacity': {
            about: ['powerBank', 'lithiumIon'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbC', 'fastCharging', 'egypt', 'cairo'],
        },
        '20000mah-power-bank-iphone-17-pro-max-charges': {
            about: ['powerBank', 'apple'],
            mentions: ['anker', 'cairovolt', 'usbC', 'usbPD', 'lithiumIon', 'fastCharging', 'egypt', 'cairo'],
        },
        'power-bank-with-digital-display-worth-it': {
            about: ['powerBank'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbC', 'lithiumIon', 'egypt', 'cairo'],
        },
        'power-bank-charge-4-devices-simultaneously': {
            about: ['powerBank', 'usbC'],
            mentions: ['anker', 'cairovolt', 'usbPD', 'fastCharging', 'lithiumIon', 'egypt', 'cairo'],
        },
        'why-power-bank-dies-after-6-months-mistakes': {
            about: ['powerBank', 'lithiumIon'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbC', 'thermalRunaway', 'egypt', 'cairo'],
        },
        'anker-vs-joyroom-power-banks-12-models-tested': {
            about: ['anker', 'joyroom', 'powerBank'],
            mentions: ['cairovolt', 'usbC', 'usbPD', 'fastCharging', 'lithiumIon', 'egypt', 'cairo'],
        },
        'iphone-17-pro-max-charger-20w-30w-45w-which': {
            about: ['charger', 'apple'],
            mentions: ['anker', 'cairovolt', 'usbC', 'usbPD', 'gan', 'fastCharging', 'egypt', 'cairo'],
        },
        'best-gan-multi-port-chargers-office-home-egypt': {
            about: ['gan', 'charger', 'egypt'],
            mentions: ['anker', 'cairovolt', 'usbC', 'usbPD', 'fastCharging', 'cairo'],
        },
        'travel-charger-usb-c-usb-a-sahel-trip': {
            about: ['charger', 'usbC', 'egypt'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbPD', 'gan', 'cairo'],
        },
        '20w-30w-45w-65w-100w-charger-which-you-need': {
            about: ['charger', 'usbPD', 'gan'],
            mentions: ['anker', 'cairovolt', 'usbC', 'fastCharging', 'apple', 'samsung', 'egypt', 'cairo'],
        },
        '2-in-1-wireless-charger-phone-watch-bedside': {
            about: ['qi2', 'magsafe', 'charger'],
            mentions: ['anker', 'cairovolt', 'apple', 'egypt', 'cairo'],
        },
        'charge-phone-overnight-safe-or-not': {
            about: ['lithiumIon', 'fastCharging'],
            mentions: ['anker', 'cairovolt', 'charger', 'apple', 'samsung', 'thermalRunaway', 'egypt', 'cairo'],
        },
        'samsung-s26-ultra-45w-super-fast-charging-real': {
            about: ['charger', 'samsung', 'fastCharging'],
            mentions: ['anker', 'cairovolt', 'usbC', 'usbPD', 'quickCharge', 'gan', 'egypt', 'cairo'],
        },
        'slimmest-100w-laptop-gan-chargers-egypt': {
            about: ['gan', 'charger', 'usbPD'],
            mentions: ['anker', 'cairovolt', 'usbC', 'fastCharging', 'egypt', 'cairo'],
        },
        'why-anker-chargers-disappear-egyptian-markets': {
            about: ['anker', 'egypt'],
            mentions: ['cairovolt', 'charger', 'powerBank', 'usbC', 'gan', 'cairo', 'damietta'],
        },
        'xiaomi-redmi-note-13-pro-best-charger-egypt': {
            about: ['charger', 'egypt'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbC', 'usbPD', 'fastCharging', 'cairo'],
        },
        'hyperjuice-professional-charger-when-need-it': {
            about: ['charger', 'gan', 'usbPD'],
            mentions: ['anker', 'cairovolt', 'usbC', 'fastCharging', 'egypt', 'cairo'],
        },
        'protect-charger-egypt-voltage-fluctuation-summer': {
            about: ['charger', 'egypt'],
            mentions: ['anker', 'cairovolt', 'thermalRunaway', 'loadShedding', 'cairo'],
        },
        'usb-c-240w-cable-gaming-laptop-when-need': {
            about: ['cable', 'usbC', 'usbPD'],
            mentions: ['anker', 'cairovolt', 'fastCharging', 'egypt', 'cairo'],
        },
        '3-meter-charging-cable-bed-living-room': {
            about: ['cable', 'usbC'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'fastCharging', 'egypt', 'cairo'],
        },
        'magnetic-cable-car-charging-pros-cons': {
            about: ['cable', 'carCharger'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbC', 'magsafe', 'egypt', 'cairo'],
        },
        'usb-c-lightning-vs-usb-c-usb-c-faster': {
            about: ['cable', 'usbC', 'apple'],
            mentions: ['anker', 'cairovolt', 'usbPD', 'fastCharging', 'egypt', 'cairo'],
        },
        'protect-cables-car-summer-heat-cairo': {
            about: ['cable', 'egypt'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbC', 'thermalRunaway', 'cairo'],
        },
        'short-30cm-cable-power-bank-extends-life': {
            about: ['cable', 'powerBank'],
            mentions: ['anker', 'joyroom', 'cairovolt', 'usbC', 'fastCharging', 'egypt', 'cairo'],
        },
    };

    return articleEntityMap[slug] || { about: ['egypt'], mentions: ['cairo'] };
}
