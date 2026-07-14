export type DiscoveryCollectionKey = 'anker' | 'joyroom' | 'soundcore';

export type LocalizedCopy = {
    ar: string;
    en: string;
};

export type DiscoveryTone =
    | 'sky'
    | 'indigo'
    | 'sand'
    | 'mint'
    | 'violet'
    | 'rose'
    | 'peach'
    | 'cyan';

export type DiscoveryVisual = 'balanced' | 'wide' | 'tall' | 'white';

export interface CategoryDiscoveryPresentation {
    headline: LocalizedCopy;
    description: LocalizedCopy;
    action: LocalizedCopy;
    signal: LocalizedCopy;
    alt: LocalizedCopy;
    /** Base path only. The component appends -480.webp / -800.webp. */
    imageBase: string;
    tone: DiscoveryTone;
    visual: DiscoveryVisual;
}

export interface CategoryDiscoveryCollection {
    eyebrow: LocalizedCopy;
    title: LocalizedCopy;
    intro: LocalizedCopy;
    /** Product brand associated with the source; this does not assert copyright ownership. */
    sourceBrand: string;
    accent: 'blue' | 'red' | 'orange';
    items: Record<string, CategoryDiscoveryPresentation>;
}

/**
 * Conversion copy and visual treatment for brand-hub subcategories.
 *
 * Taxonomy stays owned by brand-data.ts / soundcore-hub.ts; this map only adds
 * the emotional headline, image, and visual treatment keyed by canonical href.
 * That keeps links and category availability tied to the page's real source.
 */
export const categoryDiscovery: Record<DiscoveryCollectionKey, CategoryDiscoveryCollection> = {
    anker: {
        accent: 'blue',
        sourceBrand: 'Anker',
        eyebrow: { ar: 'ابدأ من احتياجك', en: 'Start with what you need' },
        title: {
            ar: 'اختر قسم منتجات Anker المناسب لجهازك',
            en: 'Choose the right Anker category for your device',
        },
        intro: {
            ar: 'طاقة وشحن وكابلات للبيت والشغل والعربية—كل قسم يوصّلك مباشرةً للخيارات المتوافقة بدل الحيرة بين الموديلات.',
            en: 'Power, charging, cables, and car gear—each category takes you straight to compatible options instead of a wall of model numbers.',
        },
        items: {
            '/anker/power-banks': {
                headline: { ar: 'طاقة تكمّل يومك', en: 'Power that lasts all day' },
                description: {
                    ar: 'سعات عملية للسفر والشغل، من الحجم الخفيف حتى شحن اللابتوب.',
                    en: 'Practical capacity for commutes, travel, and even laptop charging.',
                },
                action: { ar: 'تصفّح باور بانك Anker', en: 'Browse Anker power banks' },
                signal: { ar: '10K–25K mAh', en: '10K–25K mAh' },
                alt: {
                    ar: 'باور بانك Anker Zolo أسود بكابل مدمج',
                    en: 'Black Anker Zolo power bank with a built-in cable',
                },
                imageBase: '/images/categories/anker/anker-power-banks-category-card-cairovolt-egypt',
                tone: 'sky',
                visual: 'tall',
            },
            '/anker/wall-chargers': {
                headline: { ar: 'شحن أسرع، بحجم أصغر', en: 'Faster power, smaller charger' },
                description: {
                    ar: 'شواحن GaN بقدرة واضحة للموبايل والتابلت واللابتوب.',
                    en: 'Clear GaN power choices for phones, tablets, and laptops.',
                },
                action: { ar: 'تصفّح شواحن Anker', en: 'Browse Anker chargers' },
                signal: { ar: '20W–100W GaN', en: '20W–100W GaN' },
                alt: {
                    ar: 'شاحن Anker Nano أبيض بمنفذ USB-C',
                    en: 'White Anker Nano charger with a USB-C port',
                },
                imageBase: '/images/categories/anker/anker-wall-chargers-category-card-cairovolt-egypt',
                tone: 'indigo',
                visual: 'white',
            },
            '/anker/cables': {
                headline: { ar: 'كابل يعيش مع استخدامك', en: 'A cable built for daily use' },
                description: {
                    ar: 'USB-C وLightning بقدرات معروفة وخامات تتحمل الثني اليومي.',
                    en: 'USB-C and Lightning cables with clear wattage and durable materials.',
                },
                action: { ar: 'تصفّح كابلات Anker', en: 'Browse Anker cables' },
                signal: { ar: 'USB-C · Lightning', en: 'USB-C · Lightning' },
                alt: {
                    ar: 'كابل Anker USB-C أبيض مجدول',
                    en: 'White braided Anker USB-C cable',
                },
                imageBase: '/images/categories/anker/anker-cables-category-card-cairovolt-egypt',
                tone: 'sand',
                visual: 'white',
            },
            '/anker/car-chargers': {
                headline: { ar: 'ثبات وشحن في كل مشوار', en: 'Mount and charge in one move' },
                description: {
                    ar: 'شواحن وحوامل مغناطيسية تقلّل لخبطة الأسلاك على الطريق.',
                    en: 'Magnetic mounts and chargers that keep the drive cable-free.',
                },
                action: { ar: 'تصفّح شواحن سيارة Anker', en: 'Browse Anker car chargers' },
                signal: { ar: 'MagSafe · USB-C PD', en: 'MagSafe · USB-C PD' },
                alt: {
                    ar: 'حامل وشاحن سيارة Anker مغناطيسي مع ملحقاته',
                    en: 'Anker magnetic car mount and charger kit with accessories',
                },
                imageBase: '/images/categories/anker/anker-car-chargers-category-card-cairovolt-egypt',
                tone: 'mint',
                visual: 'wide',
            },
            '/soundcore': {
                headline: { ar: 'الصوت من عائلة Anker', en: 'Sound from the Anker family' },
                description: {
                    ar: 'ايربودز وهيدفون وسبيكرات Soundcore للتركيز والمواصلات والبيت.',
                    en: 'Soundcore earbuds, headphones, and speakers for focus, travel, and home.',
                },
                action: { ar: 'استكشف Soundcore', en: 'Explore Soundcore' },
                signal: { ar: 'موديلات مختارة · ANC وHi-Res', en: 'Select models · ANC + Hi-Res' },
                alt: {
                    ar: 'سماعات Soundcore R50i NC السوداء مع علبة الشحن',
                    en: 'Black Soundcore R50i NC earbuds with their charging case',
                },
                imageBase: '/images/categories/anker/anker-soundcore-category-card-cairovolt-egypt',
                tone: 'violet',
                visual: 'white',
            },
        },
    },
    joyroom: {
        accent: 'red',
        sourceBrand: 'JOYROOM',
        eyebrow: { ar: 'اختيار عملي لميزانيتك', en: 'Practical choices for your budget' },
        title: {
            ar: 'اختر قسم منتجات Joyroom الذي يحل احتياجك',
            en: 'Choose the Joyroom category that solves your need',
        },
        intro: {
            ar: 'ابدأ بالمشكلة التي تريد حلّها: صوت، طاقة، شحن، كابلات، ساعة أو تجهيز العربية—مع انتقال مباشر للقسم الصحيح.',
            en: 'Start with the problem: sound, power, charging, cables, a smartwatch, or car setup—then go directly to the right collection.',
        },
        items: {
            '/joyroom/audio': {
                headline: { ar: 'صوت يومي بسعر أذكى', en: 'Everyday sound at a smarter price' },
                description: {
                    ar: 'ايربودز للمكالمات والموسيقى والاستخدام الطويل بدون قفزة في السعر.',
                    en: 'Earbuds for calls, music, and long days without the premium jump.',
                },
                action: { ar: 'تصفّح سماعات Joyroom', en: 'Browse Joyroom earbuds' },
                signal: { ar: 'TWS · Calls · Music', en: 'TWS · Calls · Music' },
                alt: {
                    ar: 'سماعات Joyroom T03S Pro البيضاء مع علبة الشحن',
                    en: 'White Joyroom T03S Pro earbuds with their charging case',
                },
                imageBase: '/images/categories/joyroom/joyroom-audio-category-card-cairovolt-egypt',
                tone: 'violet',
                visual: 'balanced',
            },
            '/joyroom/power-banks': {
                headline: { ar: 'طاقة من غير ضغط على الميزانية', en: 'More power, less budget pressure' },
                description: {
                    ar: 'سعات يومية وخيارات مغناطيسية وكابلات مدمجة للاستخدام السريع.',
                    en: 'Daily capacity, magnetic options, and built-in cables for easy charging.',
                },
                action: { ar: 'تصفّح باور بانك Joyroom', en: 'Browse Joyroom power banks' },
                signal: { ar: '10K–20K mAh', en: '10K–20K mAh' },
                alt: {
                    ar: 'باور بانك Joyroom أسود بسعة 10000 ملّي أمبير',
                    en: 'Black Joyroom 10,000mAh power bank',
                },
                imageBase: '/images/categories/joyroom/joyroom-power-banks-category-card-cairovolt-egypt',
                tone: 'sky',
                visual: 'white',
            },
            '/joyroom/wall-chargers': {
                headline: { ar: 'الشحن الأساسي، بأمان واضح', en: 'Everyday charging, clearly protected' },
                description: {
                    ar: 'شواحن USB-C صغيرة للاستخدام اليومي مع حماية Smart IC.',
                    en: 'Compact USB-C chargers for daily use with Smart IC protection.',
                },
                action: { ar: 'تصفّح شواحن Joyroom', en: 'Browse Joyroom chargers' },
                signal: { ar: '20W–30W USB-C', en: '20W–30W USB-C' },
                alt: {
                    ar: 'شاحن Joyroom أبيض USB-C بقدرة 20 واط',
                    en: 'White Joyroom 20W USB-C charger',
                },
                imageBase: '/images/categories/joyroom/joyroom-wall-chargers-category-card-cairovolt-egypt',
                tone: 'peach',
                visual: 'white',
            },
            '/joyroom/cables': {
                headline: { ar: 'كابل يتحمّل الاستخدام اليومي', en: 'A cable made for the daily pull' },
                description: {
                    ar: 'USB-C وLightning مجدولة للشحن السريع وتقليل القطع عند الأطراف.',
                    en: 'Braided USB-C and Lightning options for fast charging and less fraying.',
                },
                action: { ar: 'تصفّح كابلات Joyroom', en: 'Browse Joyroom cables' },
                signal: { ar: 'Braided · Fast charge', en: 'Braided · Fast charge' },
                alt: {
                    ar: 'كابل Joyroom أبيض مجدول USB-C إلى Lightning',
                    en: 'White braided Joyroom USB-C to Lightning cable',
                },
                imageBase: '/images/categories/joyroom/joyroom-cables-category-card-cairovolt-egypt',
                tone: 'mint',
                visual: 'white',
            },
            '/joyroom/smart-watches': {
                headline: { ar: 'يومك وإشعاراتك على معصمك', en: 'Your day, right on your wrist' },
                description: {
                    ar: 'متابعة النشاط والإشعارات العربية وبطارية تكمل عدة أيام.',
                    en: 'Activity tracking, clear notifications, and multi-day battery life.',
                },
                action: { ar: 'تصفّح ساعات Joyroom', en: 'Browse Joyroom smartwatches' },
                signal: { ar: 'IP68 · بطارية 7 أيام', en: 'IP68 · 7-day battery' },
                alt: {
                    ar: 'ساعة Joyroom FT3 الذكية السوداء',
                    en: 'Black Joyroom FT3 smartwatch',
                },
                imageBase: '/images/categories/joyroom/joyroom-smart-watches-category-card-cairovolt-egypt',
                tone: 'rose',
                visual: 'white',
            },
            '/joyroom/car-holders': {
                headline: { ar: 'ثبّت موبايلك وركّز في الطريق', en: 'Keep the phone steady, eyes ahead' },
                description: {
                    ar: 'حوامل مغناطيسية للتابلوه وفتحات التكييف بثبات مناسب للمشاوير.',
                    en: 'Magnetic dashboard and vent mounts designed to stay put on the road.',
                },
                action: { ar: 'تصفّح حوامل Joyroom', en: 'Browse Joyroom car mounts' },
                signal: { ar: 'MagSafe · Vent · Dash', en: 'MagSafe · Vent · Dash' },
                alt: {
                    ar: 'حامل سيارة Joyroom ZS290 مغناطيسي أسود',
                    en: 'Black Joyroom ZS290 magnetic car mount',
                },
                imageBase: '/images/categories/joyroom/joyroom-car-holders-category-card-cairovolt-egypt',
                tone: 'cyan',
                visual: 'balanced',
            },
            '/joyroom/car-accessories': {
                headline: { ar: 'جهّز عربيتك للشحن والترتيب', en: 'Set up the car for power and order' },
                description: {
                    ar: 'شواحن سيارة وكابلات وحلول عملية للمشاوير الطويلة والاستخدام اليومي.',
                    en: 'Car chargers, cables, and practical gear for commutes and long drives.',
                },
                action: { ar: 'تصفّح إكسسوارات سيارة Joyroom', en: 'Browse Joyroom car accessories' },
                signal: { ar: 'USB-C PD · حتى 60W', en: 'USB-C PD · up to 60W' },
                alt: {
                    ar: 'شاحن سيارة Joyroom بقدرة 60 واط وكابلات مدمجة',
                    en: 'Joyroom 60W car charger with built-in cables',
                },
                imageBase: '/images/categories/joyroom/joyroom-car-accessories-category-card-cairovolt-egypt',
                tone: 'sand',
                visual: 'white',
            },
        },
    },
    soundcore: {
        accent: 'orange',
        sourceBrand: 'Soundcore',
        eyebrow: { ar: 'اختر طريقة الاستماع', en: 'Choose how you listen' },
        title: {
            ar: 'عائلتان من Soundcore لكل لحظة صوت',
            en: 'Two Soundcore families for every listening moment',
        },
        intro: {
            ar: 'اختر سماعاتك الشخصية للعزل والتركيز، أو سبيكر بلوتوث يملأ المكان—والانتقال يكون مباشرةً للمجموعة الصحيحة.',
            en: 'Choose personal audio for focus and noise control, or a Bluetooth speaker that fills the room—then go directly to that collection.',
        },
        items: {
            '/soundcore/audio': {
                headline: { ar: 'اعزل الدوشة واسمع التفاصيل', en: 'Mute the noise. Hear the detail.' },
                description: {
                    ar: 'ايربودز وهيدفون للمواصلات والمكالمات، مع ANC وHi-Res في موديلات مختارة.',
                    en: 'Earbuds and headphones for commutes and calls, with ANC and Hi-Res on select models.',
                },
                action: { ar: 'تصفّح سماعات Soundcore', en: 'Browse Soundcore audio' },
                signal: { ar: 'موديلات مختارة · ANC وLDAC', en: 'Select models · ANC + LDAC' },
                alt: {
                    ar: 'سماعات Soundcore Liberty 5 السوداء',
                    en: 'Black Soundcore Liberty 5 earbuds',
                },
                imageBase: '/images/categories/soundcore/soundcore-audio-category-card-cairovolt-egypt',
                tone: 'peach',
                visual: 'wide',
            },
            '/soundcore/speakers': {
                headline: { ar: 'حوّل أي مكان لمساحتك الصوتية', en: 'Make any place your sound space' },
                description: {
                    ar: 'سبيكرات بلوتوث للبيت والسفر، مع مقاومة ماء وPartyCast في موديلات مختارة.',
                    en: 'Bluetooth speakers for home and travel, with water resistance and PartyCast on select models.',
                },
                action: { ar: 'تصفّح سبيكرات Soundcore', en: 'Browse Soundcore speakers' },
                signal: { ar: 'موديلات مختارة · IP67 وPartyCast', en: 'Select models · IP67 + PartyCast' },
                alt: {
                    ar: 'سبيكر Soundcore Select 4 Go أسود محمول',
                    en: 'Black portable Soundcore Select 4 Go speaker',
                },
                imageBase: '/images/categories/soundcore/soundcore-speakers-category-card-cairovolt-egypt',
                tone: 'violet',
                visual: 'white',
            },
        },
    },
};

export function getDiscoveryPresentation(collection: DiscoveryCollectionKey, href: string) {
    return categoryDiscovery[collection].items[href];
}
