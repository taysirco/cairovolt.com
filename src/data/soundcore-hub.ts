/**
 * Category data for the Soundcore landing page.
 * Product prices, stock, specifications, and CairoVolt warranty terms belong to
 * the individual product records so this navigation data does not duplicate or
 * overstate information that can change.
 */

export interface LocalizedString {
    en: string;
    ar: string;
}

export interface SoundcoreCategoryCard {
    href: string;
    title: LocalizedString;
    description: LocalizedString;
    icon: string;
}

export interface SoundcoreTechnologyGlossaryItem {
    id: string;
    name: LocalizedString;
    description: LocalizedString;
    modelExamples: LocalizedString;
    icon: string;
    href: '/soundcore/audio' | '/soundcore/speakers';
}

export const soundcoreHub = {
    categories: [
        {
            href: '/soundcore/audio',
            title: {
                en: 'Soundcore Earbuds & Headphones',
                ar: 'سماعات ساوندكور: ايربودز وهيدفون',
            },
            description: {
                en: 'Compare Soundcore earbuds, neckbands, and over-ear headphones by fit, ANC or transparency modes, app/EQ support, codecs, battery, and water rating. Features vary by model.',
                ar: 'قارن ايربودز ونيكباند وهيدفون ساوندكور حسب التصميم وANC أو وضع الشفافية ودعم التطبيق وEQ والكودك والبطارية ومقاومة المياه؛ المزايا تختلف حسب الموديل.',
            },
            icon: 'headphones',
        },
        {
            href: '/soundcore/speakers',
            title: {
                en: 'Soundcore Bluetooth Speakers',
                ar: 'مكبرات صوت ساوندكور',
            },
            description: {
                en: 'Compare portable Soundcore speakers by output, size, battery, app controls, linking protocol, and IP rating. PartyCast, TWS, Auracast, and water protection are model-specific.',
                ar: 'قارن مكبرات صوت ساوندكور المحمولة حسب القدرة والحجم والبطارية وتحكم التطبيق وبروتوكول الربط وتصنيف IP؛ PartyCast وTWS وAuracast ومقاومة المياه تختلف حسب الموديل.',
            },
            icon: 'speaker',
        },
    ] as SoundcoreCategoryCard[],
    technologyNote: {
        en: 'Soundcore feature names describe capabilities on selected products, not the entire range. Confirm the exact model, compatible phone or source device, app support, codec, firmware, and IP rating on the product page before buying.',
        ar: 'أسماء تقنيات ساوندكور تصف مزايا في منتجات محددة وليست مواصفات موحّدة لكل السلسلة. تأكد من الموديل والهاتف أو مصدر الصوت المتوافق ودعم التطبيق والكودك والبرنامج وتصنيف IP في صفحة المنتج قبل الشراء.',
    } as LocalizedString,
    technologyGlossary: [
        {
            id: 'anc-transparency',
            name: { en: 'ANC & Transparency Mode', ar: 'ANC ووضع الشفافية' },
            description: {
                en: 'Active noise cancellation uses microphones and processing to reduce parts of surrounding noise; transparency mode intentionally passes ambient sound. Results depend on fit, ear shape, noise type, and the controls offered by the model.',
                ar: 'يستخدم العزل النشط ميكروفونات ومعالجة لتقليل أجزاء من الضوضاء المحيطة، بينما يمرر وضع الشفافية الصوت الخارجي عمدًا. النتيجة تتأثر بإحكام السماعة وشكل الأذن ونوع الضوضاء وأوضاع الموديل.',
            },
            modelExamples: {
                en: 'Catalogue examples: R50i NC and Liberty 4 NC earbuds, plus Space One and Q45 headphones. ANC strength and available modes are not identical.',
                ar: 'أمثلة من الكتالوج: ايربودز R50i NC وLiberty 4 NC، وهيدفون Space One وQ45. قوة العزل والأوضاع المتاحة ليست متطابقة.',
            },
            icon: 'mute',
            href: '/soundcore/audio',
        },
        {
            id: 'app-eq',
            name: { en: 'Soundcore App, EQ & HearID', ar: 'تطبيق ساوندكور وEQ وHearID' },
            description: {
                en: 'Selected models use the Soundcore app for equalizer presets or custom EQ, control mapping, firmware updates, and sometimes HearID. The available controls depend on the exact model and app version; app recognition is not an authenticity certificate.',
                ar: 'تستخدم موديلات مختارة تطبيق ساوندكور لإعدادات EQ أو التخصيص والتحكم وتحديث البرنامج، وأحيانًا HearID. الأدوات المتاحة تعتمد على الموديل وإصدار التطبيق، وظهور المنتج في التطبيق ليس شهادة مستقلة للأصالة.',
            },
            modelExamples: {
                en: 'Catalogue examples include P20i, Liberty 4 NC, Space One, Q45, Flare 2, and Select 4 Go, with different app controls on each.',
                ar: 'من أمثلة الكتالوج P20i وLiberty 4 NC وSpace One وQ45 وFlare 2 وSelect 4 Go، مع اختلاف أدوات التطبيق بين الموديلات.',
            },
            icon: 'phone',
            href: '/soundcore/audio',
        },
        {
            id: 'hi-res-ldac',
            name: { en: 'Hi-Res Audio & LDAC', ar: 'Hi-Res Audio وكودك LDAC' },
            description: {
                en: 'Hi-Res identifies an audio capability or certification stated for supported hardware; LDAC is a Bluetooth codec that also requires a compatible source device and the correct settings. iPhone does not transmit LDAC, so supported Soundcore models use another available codec with iOS.',
                ar: 'يشير Hi-Res إلى قدرة أو اعتماد صوتي مذكور للأجهزة الداعمة، بينما LDAC كودك بلوتوث يحتاج أيضًا إلى مصدر صوت متوافق وإعدادات صحيحة. ايفون لا يرسل LDAC، لذلك تستخدم موديلات ساوندكور الداعمة كودك آخر متاحًا مع iOS.',
            },
            modelExamples: {
                en: 'Catalogue examples that list LDAC include Liberty 4 NC, Liberty 5, Space One, and Q45. Entry models do not automatically include it.',
                ar: 'من أمثلة الكتالوج التي تذكر LDAC: Liberty 4 NC وLiberty 5 وSpace One وQ45. وجوده ليس تلقائيًا في الموديلات الاقتصادية.',
            },
            icon: 'music',
            href: '/soundcore/audio',
        },
        {
            id: 'bassup',
            name: { en: 'BassUp', ar: 'تقنية BassUp' },
            description: {
                en: 'BassUp is Soundcore bass-processing or tuning used on selected earbuds, headphones, and speakers. Driver size, enclosure, EQ controls, and the audible effect differ by product, so it is not one fixed sound profile across the range.',
                ar: 'BassUp اسم لمعالجة أو ضبط الباس في موديلات مختارة من السماعات ومكبرات الصوت. يختلف حجم الدرايفر وتصميم الجسم وأدوات EQ والنتيجة المسموعة من منتج لآخر، وليست ملفًا صوتيًا ثابتًا لكل السلسلة.',
            },
            modelExamples: {
                en: 'Catalogue examples include P20i and R50i-family earbuds, Flare 2, and Rave 3; review each model’s driver and controls.',
                ar: 'من أمثلة الكتالوج ايربودز P20i وعائلة R50i، إضافة إلى Flare 2 وRave 3؛ راجع الدرايفر والتحكم في كل موديل.',
            },
            icon: 'speaker',
            href: '/soundcore/audio',
        },
        {
            id: 'speaker-linking',
            name: { en: 'PartyCast, TWS & Auracast', ar: 'PartyCast وTWS وAuracast' },
            description: {
                en: 'These names refer to different speaker-linking methods. Compatibility depends on the protocol and generation, so two Soundcore speakers should not be assumed to link merely because both support multi-speaker audio.',
                ar: 'تشير هذه الأسماء إلى طرق مختلفة لربط مكبرات الصوت. يعتمد التوافق على البروتوكول والجيل، لذلك لا يُفترض أن سبيكرين من ساوندكور سيتصلان لمجرد أن كليهما يدعم صوتًا متعدد السماعات.',
            },
            modelExamples: {
                en: 'Flare 2 lists PartyCast, Select 4 Go lists TWS pairing, and Rave 3 lists Auracast/TWS. Check the product page before planning a linked setup.',
                ar: 'يذكر Flare 2 تقنية PartyCast، ويذكر Select 4 Go ربط TWS، بينما يذكر Rave 3 تقنيات Auracast وTWS. راجع صفحة المنتج قبل إعداد مجموعة مترابطة.',
            },
            icon: 'link',
            href: '/soundcore/speakers',
        },
        {
            id: 'water-ratings',
            name: { en: 'IP Water & Dust Ratings', ar: 'تصنيفات IP للماء والغبار' },
            description: {
                en: 'An IP or IPX rating belongs to the exact model and test conditions. It does not make every Soundcore product waterproof or permit every type of exposure; follow the manufacturer limits and dry the charging area before use.',
                ar: 'تصنيف IP أو IPX يخص الموديل وشروط الاختبار المحددة، ولا يعني أن كل منتجات ساوندكور ضد الماء أو أن كل أنواع التعرض مسموحة. اتبع حدود الشركة وجفف منطقة الشحن قبل الاستخدام.',
            },
            modelExamples: {
                en: 'Examples: Select 4 Go lists IP67, Flare 2 lists IPX7, and Rave 3 lists IPX4 splash resistance. These levels are not interchangeable.',
                ar: 'أمثلة: Select 4 Go بتصنيف IP67، وFlare 2 بتصنيف IPX7، وRave 3 بتصنيف IPX4 للرذاذ. هذه المستويات ليست متساوية.',
            },
            icon: 'shield',
            href: '/soundcore/speakers',
        },
    ] as SoundcoreTechnologyGlossaryItem[],
};
