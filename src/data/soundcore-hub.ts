/**
 * Soundcore Hub — Content data for /soundcore landing page.
 * Soundcore is Anker's audio sub-brand (launched 2016). This hub aggregates
 * the two product lines: TWS/headphones (/soundcore/audio) and speakers (/soundcore/speakers).
 *
 * Why a dedicated hub?
 * The canonical Arabic keyword "ساوندكور" and its search spelling variants refer specifically
 * to the audio sub-brand — NOT to all Anker products. Funnelling them to /anker
 * (which also covers chargers, cables, power banks) dilutes topical relevance.
 * See SOUNDCORE-STRATEGY.md for full rationale.
 */

export interface LocalizedString {
    en: string;
    ar: string;
}

export interface SoundcoreCategoryCard {
    href: string;
    title: LocalizedString;
    description: LocalizedString;
    badge: LocalizedString;
    icon: string;
    productCount: number;
    priceRange: LocalizedString;
    keyModels: string[];
    searchVolume: LocalizedString;
}

export interface SoundcoreStat {
    icon: string;
    value: LocalizedString;
    label: LocalizedString;
}

export interface SoundcoreTechnology {
    name: string;
    icon: string;
    description: LocalizedString;
}

export interface SoundcoreFAQ {
    question: string;
    answer: string;
}

export const soundcoreHub = {
    hero: {
        badge: {
            en: "World's #1 Wireless Audio Brand",
            ar: 'العلامة الأولى عالمياً في السماعات اللاسلكية',
        },
        title: 'Soundcore by Anker',
        subtitle: {
            en: 'Hear It. Feel It.',
            ar: 'اسمعها. عيشها.',
        },
        description: {
            en: 'Soundcore is the dedicated audio sub-brand of Anker — over 100 million users worldwide, Hi-Res Audio certified, and engineered for premium sound at honest prices. Explore Soundcore earbuds, headphones, and Bluetooth speakers, with 18-month CairoVolt warranty and next-day Cairo delivery.',
            ar: 'ساوندكور هي العلامة الفرعية المتخصصة في الصوتيات من انكر — أكثر من 100 مليون مستخدم حول العالم، شهادة Hi-Res Audio، وهندسة صوتية بأسعار صادقة. تصفّح سماعات ساوندكور (ايربودز + هيدفون) ومكبرات الصوت البلوتوث، مع ضمان 18 شهر من كايرو فولت وتوصيل القاهرة خلال 24 ساعة.',
        },
    },

    /**
     * Two prominent category cards — the hub's primary navigation.
     * Search volumes pulled from Ahrefs / GSC data (May 2026).
     */
    categories: [
        {
            href: '/soundcore/audio',
            title: { en: 'Soundcore Earbuds & Headphones', ar: 'سماعات ساوندكور (ايربودز + هيدفون)' },
            description: {
                en: 'TWS earbuds, neckbands, and over-ear headphones; select models include ANC, Hi-Res, LDAC, or BassUp.',
                ar: 'سماعات TWS ونيكباند وهيدفون؛ تتوفر ANC وHi-Res وLDAC أو BassUp في موديلات مختارة.',
            },
            badge: { en: '26 Models', ar: '26 موديل' },
            icon: 'headphones',
            productCount: 26,
            priceRange: { en: 'EGP 699 – 5,830', ar: 'من 699 إلى 5,830 جنيه' },
            keyModels: ['R50i', 'R50i NC', 'P20i', 'Liberty 4 NC', 'Liberty 5', 'Space One', 'Q30'],
            searchVolume: { en: '~9,000 searches/mo', ar: '~9,000 بحث/شهر' },
        },
        {
            href: '/soundcore/speakers',
            title: { en: 'Soundcore Bluetooth Speakers', ar: 'مكبرات صوت ساوندكور (Speakers)' },
            description: {
                en: 'Portable Bluetooth speakers; select models include 360° audio, IPX7, PartyCast, or LED light shows.',
                ar: 'سبيكرات بلوتوث محمولة؛ تتوفر 360° وIPX7 وPartyCast أو إضاءة LED في موديلات مختارة.',
            },
            badge: { en: '4 Flagship Models', ar: '4 موديلات رائدة' },
            icon: 'speaker',
            productCount: 4,
            priceRange: { en: 'EGP 1,249 – 9,450', ar: 'من 1,249 إلى 9,450 جنيه' },
            keyModels: ['Motion+', 'Flare 2', 'Rave 3', 'Select 4 Go'],
            searchVolume: { en: '~500 searches/mo', ar: '~500 بحث/شهر' },
        },
    ] as SoundcoreCategoryCard[],

    stats: [
        { icon: 'headphones', value: { en: '100M+', ar: '+100 مليون' }, label: { en: 'Users Worldwide', ar: 'مستخدم حول العالم' } },
        { icon: 'star', value: { en: '4.8/5', ar: '4.8/5' }, label: { en: 'Average Rating', ar: 'متوسط التقييم' } },
        { icon: 'trophy', value: { en: '#1', ar: 'رقم 1' }, label: { en: 'Budget Audio Brand', ar: 'ماركة الصوتيات الاقتصادية' } },
        { icon: 'music', value: { en: '2016', ar: '2016' }, label: { en: 'Launched as Anker Sub-Brand', ar: 'إطلاق كعلامة فرعية لانكر' } },
        { icon: 'globe', value: { en: '50+', ar: '+50' }, label: { en: 'Countries', ar: 'دولة' } },
        { icon: 'phone', value: { en: '10M+', ar: '+10 مليون' }, label: { en: 'Soundcore App Users', ar: 'مستخدم لتطبيق ساوندكور' } },
    ] as SoundcoreStat[],

    history: {
        en: 'Soundcore was launched in 2016 as Anker\'s dedicated audio brand — applying the same engineering rigor that made Anker the #1 charging brand to the audio category. Today, Soundcore has shipped over 100 million units globally, won CES Innovation Awards (Liberty 4 NC, Space One), and is Hi-Res Audio certified by the Japan Audio Society. Soundcore products fall into two families: wearables (TWS earbuds, neckbands, over-ear headphones) and Bluetooth speakers. The brand operates with its own R&D team, its own iOS/Android app for EQ customization (HearID), and its own warranty channel — distinct from Anker\'s charging product lines.',
        ar: 'انطلقت ساوندكور في عام 2016 كعلامة الصوت المتخصصة من انكر — بنفس الانضباط الهندسي الذي جعل انكر الأولى عالمياً في الشحن، لكن مُطبَّق على الصوتيات. اليوم وزّعت ساوندكور أكثر من 100 مليون وحدة عالمياً، وفازت بجوائز CES للابتكار (Liberty 4 NC, Space One)، وحاصلة على شهادة Hi-Res Audio من جمعية الصوت اليابانية. منتجات ساوندكور تنقسم لعائلتين: السماعات الشخصية (ايربودز TWS، نيكباند، هيدفون فوق الأذن)، ومكبرات الصوت البلوتوث. العلامة عندها فريق أبحاث وتطوير مستقل، وتطبيق iOS/Android خاص لتخصيص الـ EQ (HearID)، وقناة ضمان منفصلة — كل ده مختلف عن خط شواحن انكر.',
    },

    /**
     * The 6 signature Soundcore technologies — used in marketing & product cards.
     */
    technologies: [
        {
            name: 'Hi-Res Audio',
            icon: 'music',
            description: {
                en: 'LDAC & aptX HD support delivering lossless audio up to 990kbps. Certified by the Japan Audio Society — the same gold standard used by Sony and Bose flagships.',
                ar: 'دعم LDAC و aptX HD لجودة صوت بدون فقدان حتى 990kbps. شهادة من جمعية الصوت اليابانية — نفس المعيار الذهبي اللي بتستخدمه Sony و Bose في فئاتها الرائدة.',
            },
        },
        {
            name: 'Active Noise Cancellation (ANC)',
            icon: 'mute',
            description: {
                en: 'Hybrid ANC blocks up to 98% of ambient noise (98.5% on Liberty 4 NC). Adaptive mode adjusts to your environment — Metro, café, office, or flight.',
                ar: 'عزل ضوضاء هجين بيحجب لحد 98% من الأصوات المحيطة (98.5% في Liberty 4 NC). الوضع التكيّفي بيظبط على بيئتك — مترو، قهوة، مكتب، أو طيارة.',
            },
        },
        {
            name: 'HearID AI',
            icon: 'brain',
            description: {
                en: 'AI-powered personalized audio. The Soundcore app analyzes your hearing across frequencies and builds a custom EQ profile unique to your ears.',
                ar: 'صوت شخصي بالذكاء الاصطناعي. تطبيق ساوندكور بيحلل سمعك عبر الترددات وبيبني ملف EQ مخصص لأذنيك بالذات.',
            },
        },
        {
            name: 'BassUp™',
            icon: 'speaker',
            description: {
                en: 'Proprietary bass-enhancement DSP algorithm. Boosts low frequencies in real-time without distortion — present across the earbuds, headphones, AND speakers ranges.',
                ar: 'خوارزمية DSP حصرية لتعزيز الباس. بترفع الترددات المنخفضة في الوقت الفعلي بدون تشوّش — موجودة في الايربودز، الهيدفون، والسبيكرات.',
            },
        },
        {
            name: 'PartyCast 2.0',
            icon: 'satellite',
            description: {
                en: 'Pair up to 100 Soundcore speakers wirelessly with zero latency. Turn any room or beach into a synchronized sound system.',
                ar: 'وصِّل لحد 100 سبيكر ساوندكور لاسلكياً بدون تأخير. حوّل أي غرفة أو شاطئ لنظام صوت متزامن.',
            },
        },
        {
            name: 'Game Mode (60ms Latency)',
            icon: 'target',
            description: {
                en: 'Bluetooth 5.3 + low-latency codec delivers 60ms audio sync — competitive-grade for PUBG, Free Fire, and Call of Duty Mobile.',
                ar: 'بلوتوث 5.3 + كودك تأخير منخفض بيقدّم مزامنة صوت 60 مللي ثانية — جودة تنافسية لـ PUBG و Free Fire و Call of Duty Mobile.',
            },
        },
    ] as SoundcoreTechnology[],

    /**
     * Trust signals shown as a 6-column badge bar.
     */
    trustBadges: [
        { icon: 'music', title: { en: 'Hi-Res Audio Certified', ar: 'شهادة Hi-Res Audio' }, description: { en: 'Japan Audio Society', ar: 'جمعية الصوت اليابانية' } },
        { icon: 'shield', title: { en: '18-Month Warranty', ar: 'ضمان 18 شهر' }, description: { en: 'CairoVolt store coverage', ar: 'تغطية متجر كايرو فولت' } },
        { icon: 'phone', title: { en: 'Soundcore App', ar: 'تطبيق ساوندكور' }, description: { en: 'Free EQ & Firmware Updates', ar: 'EQ مجاني وتحديثات' } },
        { icon: 'star', title: { en: '4.8/5 Global Rating', ar: 'تقييم 4.8/5 عالمياً' }, description: { en: '500K+ verified reviews', ar: '500 ألف+ مراجعة موثوقة' } },
        { icon: 'globe', title: { en: 'iOS & Android', ar: 'iOS و Android' }, description: { en: 'Full cross-platform compatibility', ar: 'توافق كامل عبر المنصات' } },
        { icon: 'trophy', title: { en: 'CES Innovation Award', ar: 'جائزة CES للابتكار' }, description: { en: 'Multiple winners since 2018', ar: 'فائز عدة مرات منذ 2018' } },
    ],

    /**
     * Buying-intent FAQ — semantic match to "ما الفرق بين..." searches.
     * NOTE: FAQPage JSON-LD was removed site-wide (Google deprecated FAQ rich results May 2026)
     * so this just renders as plain HTML content for users + LLMs.
     */
    faq: {
        ar: [
            {
                question: 'ما الفرق بين ساوندكور و انكر — هل هما نفس الشركة؟',
                answer: 'ساوندكور هي العلامة الفرعية المتخصصة في الصوتيات من انكر، أُطلقت سنة 2016. انكر الأم بتركّز على الشحن (باور بانك، شواحن، كابلات)، أما ساوندكور فمسؤولة عن السماعات والـ Bluetooth speakers. نفس الشركة، نفس معايير الجودة، نفس الضمان (18 شهر من CairoVolt) — لكن خط منتجات منفصل.',
            },
            {
                question: 'إيه الفرق بين سماعات ساوندكور ومكبرات صوت ساوندكور؟',
                answer: 'كل منتجات ساوندكور بتنقسم لعائلتين: (1) السماعات الشخصية (ايربودز TWS، نيكباند، هيدفون) في /soundcore/audio — بداية السعر 699 جنيه (P20i)، نهاية الفلاجشيب 5,830 جنيه (Liberty 4 Pro). (2) مكبرات الصوت البلوتوث (Speakers) في /soundcore/speakers — بداية 1,249 جنيه (Select 4 Go)، فلاجشيب 9,450 جنيه (Rave 3 بقوة 200W).',
            },
            {
                question: 'هل ساوندكور أفضل من JBL أو AirPods؟',
                answer: 'مقارنة سعر/أداء: ساوندكور بتفوق JBL في الـ Hi-Res Audio Certification (مفيش في JBL Flip)، وبتفوق AirPods في باس BassUp + LDAC + تطبيق EQ مفتوح. AirPods أفضل بس لو إنت داخل منظومة Apple بالكامل. للميزانية الذكية في مصر — ساوندكور بتكسب بفارق 30-50% أرخص بنفس الجودة.',
            },
            {
                question: 'هل لازم يكون عندي تطبيق ساوندكور؟',
                answer: 'مش لازم، لكن مُستحسن جداً. التطبيق المجاني (iOS + Android) بيكشف لو السماعة مقلّدة، بيخصّص EQ بالـ HearID، بيفعّل Game Mode، وبيعمل تحديثات Firmware. لو التطبيق مش متعرّف على السماعة = 99% المنتج مقلّد. اتأكد من المصداقية قبل الشراء.',
            },
            {
                question: 'منتجات ساوندكور كلها بضمان CairoVolt في مصر؟',
                answer: 'أيوه — منتجات ساوندكور المشمولة في كايرو فولت (سواء سماعات أو سبيكرات) تأتي بتغطية متجر لمدة 18 شهرًا، وتظهر شروط الاستبدال على صفحة المنتج. التوصيل يوم واحد للقاهرة والجيزة، و2-3 أيام لباقي المحافظات، مع خيار الدفع عند الاستلام.',
            },
            {
                question: 'إيه أفضل سماعة ساوندكور للمبتدئين؟',
                answer: 'لميزانية محدودة: **ساوندكور P20i** (699 جنيه) — أرخص TWS من ساوندكور وأفضل قيمة سعر/أداء في الفئة الاقتصادية. لو الميزانية أعلى شوية: **R50i** (880 جنيه) — مبيعات #1 في مصر، 30 ساعة بطارية، صوت BassUp قوي. لمن يريد عزل ضوضاء: **R50i NC** (1,199 جنيه) — أرخص ANC حقيقي في السوق.',
            },
            {
                question: 'إيه أفضل سبيكر ساوندكور للحفلات؟',
                answer: 'للحفلات الكبيرة: **ساوندكور Rave 3** (9,450 جنيه) — 200W، تأثيرات DJ، مايك كاريوكي. للحفلات المتوسطة بإضاءة LED: **Flare 2** (2,999 جنيه) — IPX7 مقاومة كاملة للماء و 360° إضاءة متفاعلة. للسفر والساحل: **Select 4 Go** (1,249 جنيه) — IP67 بتطفو على الميه.',
            },
        ],
        en: [
            {
                question: 'What\'s the difference between Soundcore and Anker — are they the same company?',
                answer: 'Soundcore is Anker\'s dedicated audio sub-brand, launched in 2016. Anker (parent) focuses on charging — power banks, wall chargers, cables. Soundcore handles audio — earbuds, headphones, and Bluetooth speakers. Same company, same quality standards, same CairoVolt 18-month warranty — but distinct product lines.',
            },
            {
                question: 'What\'s the difference between Soundcore earbuds and Soundcore speakers?',
                answer: 'Soundcore splits into two families: (1) Personal audio — TWS earbuds, neckbands, headphones at /soundcore/audio, priced EGP 699 (P20i) to 5,830 (Liberty 4 Pro). (2) Bluetooth speakers at /soundcore/speakers, priced EGP 1,249 (Select 4 Go) to 9,450 (Rave 3, 200W).',
            },
            {
                question: 'Is Soundcore better than JBL or AirPods?',
                answer: 'Price/performance: Soundcore beats JBL on Hi-Res Audio Certification (absent on JBL Flip) and beats AirPods on BassUp + LDAC + open EQ app. AirPods only win if you\'re fully inside the Apple ecosystem. For smart budgets in Egypt, Soundcore delivers comparable quality at 30-50% lower price.',
            },
            {
                question: 'Do I need the Soundcore app?',
                answer: 'Not required, but strongly recommended. The free iOS/Android app detects counterfeits, customizes EQ via HearID, enables Game Mode, and pushes firmware updates. If the app doesn\'t recognize your device, it\'s 99% likely a fake — verify before keeping the purchase.',
            },
            {
                question: 'Are all Soundcore products warranted by CairoVolt in Egypt?',
                answer: 'Yes — covered Soundcore earbuds and speakers sold by CairoVolt come with an 18-month store warranty; exchange terms are stated on the product page. Next-day delivery is available for Cairo and Giza, with 2-3 day delivery to other governorates and cash on delivery.',
            },
            {
                question: 'What\'s the best Soundcore earbud for beginners?',
                answer: 'Tight budget: **Soundcore P20i** (EGP 699) — Soundcore\'s cheapest TWS, best entry value. Slightly higher budget: **R50i** (EGP 880) — Egypt\'s #1 seller, 30h battery, powerful BassUp. For noise cancellation: **R50i NC** (EGP 1,199) — cheapest real ANC on the market.',
            },
            {
                question: 'What\'s the best Soundcore speaker for parties?',
                answer: 'Big parties: **Soundcore Rave 3** (EGP 9,450) — 200W, DJ effects, karaoke mic. Mid-size with LED: **Flare 2** (EGP 2,999) — IPX7 fully waterproof, 360° reactive lighting. Travel & beach: **Select 4 Go** (EGP 1,249) — IP67, floats on water.',
            },
        ],
    } as { ar: SoundcoreFAQ[]; en: SoundcoreFAQ[] },

    metadata: {
        en: {
            title: 'Soundcore by Anker Egypt | Earbuds, Headphones & Speakers',
            description: 'Soundcore by Anker in Egypt — official audio sub-brand. Shop Soundcore earbuds (R50i, P20i, Liberty 4 NC) & Bluetooth speakers (Motion+, Flare 2). Hi-Res Audio Certified. 18-month CairoVolt warranty + Cairo delivery.',
            keywords: 'soundcore, anker soundcore, soundcore egypt, soundcore earbuds, soundcore speakers, anker audio brand, hi-res audio egypt, soundcore r50i, soundcore liberty 4 nc, soundcore motion plus, soundcore flare 2',
        },
        ar: {
            title: 'ساوندكور من انكر مصر | ايربودز + سماعات بلوتوث + سبيكرات',
            description: 'ساوندكور — العلامة الفرعية للصوتيات من انكر في مصر. تسوّق ايربودز ساوندكور (R50i، P20i، Liberty 4 NC) ومكبرات الصوت البلوتوث (Motion+، Flare 2). شهادة Hi-Res Audio + ضمان 18 شهر من كايرو فولت.',
            keywords: 'ساوندكور, انكر ساوندكور, سماعات ساوندكور, سبيكر ساوندكور, ايربودز ساوندكور, ساوندكور مصر, ساوندكور r50i, ساوندكور Liberty 4 NC, سماعة بلوتوث انكر, مكبر صوت انكر, سعر ساوندكور',
        },
    },
};
