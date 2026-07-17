/**
 * Egyptian Governorates Data
 * Complete list of all 27 governorates for regional coverage
 *
 * `deliveryDays` is the published lower-bound estimate used by
 * src/lib/bosta.ts (displayed as deliveryDays–deliveryDays+1 business days,
 * always framed as an estimate confirmed after address review).
 * `cities` lists real major cities/districts of each governorate (public
 * administrative geography) used to differentiate the location pages; it is
 * NOT a service guarantee — copy that renders it must keep the
 * "eligible addresses" framing.
 * Shipping fee tiers per governorate live in src/lib/shipping.ts.
 */

export interface Governorate {
    slug: string;
    nameEn: string;
    nameAr: string;
    region: 'cairo' | 'delta' | 'canal' | 'upper' | 'coastal' | 'desert';
    deliveryDays: number;
    population: number; // in millions
    cities: {
        en: string[];
        ar: string[];
    };
    meta: {
        titleEn: string;
        titleAr: string;
        descriptionEn: string;
        descriptionAr: string;
    };
}

export const governorates: Governorate[] = [
    // Greater Cairo Region
    {
        slug: 'cairo',
        nameEn: 'Cairo',
        nameAr: 'القاهرة',
        region: 'cairo',
        deliveryDays: 1,
        population: 10.2,
        cities: {
            en: ['Nasr City', 'Maadi', 'Heliopolis', 'New Cairo'],
            ar: ['مدينة نصر', 'المعادي', 'مصر الجديدة', 'القاهرة الجديدة'],
        },
        meta: {
            titleEn: 'Power Banks in Cairo – Nasr City, Maadi & New Cairo | CairoVolt',
            titleAr: 'باور بانك في القاهرة – مدينة نصر والمعادي والقاهرة الجديدة | كايرو فولت',
            descriptionEn: 'Compare Anker and Joyroom power banks and chargers with address-based delivery estimates for Nasr City, Maadi, Heliopolis, New Cairo, and other Cairo districts.',
            descriptionAr: 'قارن باور بانك وشواحن انكر وجوي روم مع مواعيد توصيل تقديرية حسب العنوان لمدينة نصر والمعادي ومصر الجديدة والقاهرة الجديدة وباقي أحياء القاهرة.',
        },
    },
    {
        slug: 'giza',
        nameEn: 'Giza',
        nameAr: 'الجيزة',
        region: 'cairo',
        deliveryDays: 1,
        population: 9.1,
        cities: {
            en: ['6th of October', 'Sheikh Zayed', 'Dokki', 'Haram'],
            ar: ['السادس من أكتوبر', 'الشيخ زايد', 'الدقي', 'الهرم'],
        },
        meta: {
            titleEn: 'Power Banks in Giza – 6th of October, Sheikh Zayed & Dokki | CairoVolt',
            titleAr: 'باور بانك في الجيزة – أكتوبر والشيخ زايد والدقي | كايرو فولت',
            descriptionEn: 'Anker and Joyroom power banks, chargers, and earbuds with delivery estimates for 6th of October, Sheikh Zayed, Dokki, Haram, and the rest of Giza.',
            descriptionAr: 'باور بانك وشواحن وسماعات انكر وجوي روم مع مواعيد توصيل تقديرية لأكتوبر والشيخ زايد والدقي والهرم وباقي مناطق الجيزة.',
        },
    },
    {
        slug: 'qalyubia',
        nameEn: 'Qalyubia',
        nameAr: 'القليوبية',
        region: 'cairo',
        deliveryDays: 2,
        population: 5.9,
        cities: {
            en: ['Benha', 'Shubra El Kheima', 'Qalyub', 'El Obour'],
            ar: ['بنها', 'شبرا الخيمة', 'قليوب', 'العبور'],
        },
        meta: {
            titleEn: 'Power Banks in Qalyubia – Benha & Shubra El Kheima | CairoVolt',
            titleAr: 'باور بانك في القليوبية – بنها وشبرا الخيمة | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom charging gear with delivery estimates for Benha, Shubra El Kheima, Qalyub, and El Obour in Qalyubia.',
            descriptionAr: 'تسوق مستلزمات شحن انكر وجوي روم مع مواعيد توصيل تقديرية لبنها وشبرا الخيمة وقليوب والعبور في القليوبية.',
        },
    },
    // Delta Region
    {
        slug: 'alexandria',
        nameEn: 'Alexandria',
        nameAr: 'الإسكندرية',
        region: 'delta',
        deliveryDays: 2,
        population: 5.4,
        cities: {
            en: ['Smouha', 'Miami', 'Agami', 'Borg El Arab'],
            ar: ['سموحة', 'ميامي', 'العجمي', 'برج العرب'],
        },
        meta: {
            titleEn: 'Power Banks in Alexandria – Smouha, Miami & Agami | CairoVolt',
            titleAr: 'باور بانك في الإسكندرية – سموحة وميامي والعجمي | كايرو فولت',
            descriptionEn: 'Compare Anker and Joyroom power banks and chargers with address-based delivery estimates for Smouha, Miami, Agami, Borg El Arab, and greater Alexandria.',
            descriptionAr: 'قارن باور بانك وشواحن انكر وجوي روم مع مواعيد توصيل تقديرية حسب العنوان لسموحة وميامي والعجمي وبرج العرب وباقي الإسكندرية.',
        },
    },
    {
        slug: 'dakahlia',
        nameEn: 'Dakahlia',
        nameAr: 'الدقهلية',
        region: 'delta',
        deliveryDays: 2,
        population: 6.9,
        cities: {
            en: ['Mansoura', 'Talkha', 'Mit Ghamr'],
            ar: ['المنصورة', 'طلخا', 'ميت غمر'],
        },
        meta: {
            titleEn: 'Power Banks in Dakahlia – Mansoura, Talkha & Mit Ghamr | CairoVolt',
            titleAr: 'باور بانك في الدقهلية – المنصورة وطلخا وميت غمر | كايرو فولت',
            descriptionEn: 'Anker and Joyroom power banks and chargers with delivery estimates for Mansoura, Talkha, and Mit Ghamr in Dakahlia.',
            descriptionAr: 'باور بانك وشواحن انكر وجوي روم مع مواعيد توصيل تقديرية للمنصورة وطلخا وميت غمر في الدقهلية.',
        },
    },
    {
        slug: 'sharqia',
        nameEn: 'Sharqia',
        nameAr: 'الشرقية',
        region: 'delta',
        deliveryDays: 2,
        population: 7.5,
        cities: {
            en: ['Zagazig', '10th of Ramadan', 'Belbeis'],
            ar: ['الزقازيق', 'العاشر من رمضان', 'بلبيس'],
        },
        meta: {
            titleEn: 'Power Banks in Sharqia – Zagazig & 10th of Ramadan | CairoVolt',
            titleAr: 'باور بانك في الشرقية – الزقازيق والعاشر من رمضان | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom charging products with delivery estimates for Zagazig, 10th of Ramadan City, and Belbeis in Sharqia.',
            descriptionAr: 'تسوق منتجات شحن انكر وجوي روم مع مواعيد توصيل تقديرية للزقازيق والعاشر من رمضان وبلبيس في الشرقية.',
        },
    },
    {
        slug: 'gharbia',
        nameEn: 'Gharbia',
        nameAr: 'الغربية',
        region: 'delta',
        deliveryDays: 2,
        population: 5.3,
        cities: {
            en: ['Tanta', 'El Mahalla El Kubra', 'Kafr El-Zayat'],
            ar: ['طنطا', 'المحلة الكبرى', 'كفر الزيات'],
        },
        meta: {
            titleEn: 'Power Banks in Gharbia – Tanta & El Mahalla | CairoVolt',
            titleAr: 'باور بانك في الغربية – طنطا والمحلة الكبرى | كايرو فولت',
            descriptionEn: 'Anker and Joyroom power banks and chargers with delivery estimates for Tanta, El Mahalla El Kubra, and Kafr El-Zayat in Gharbia.',
            descriptionAr: 'باور بانك وشواحن انكر وجوي روم مع مواعيد توصيل تقديرية لطنطا والمحلة الكبرى وكفر الزيات في الغربية.',
        },
    },
    {
        slug: 'monufia',
        nameEn: 'Monufia',
        nameAr: 'المنوفية',
        region: 'delta',
        deliveryDays: 2,
        population: 4.5,
        cities: {
            en: ['Shibin El Kom', 'Sadat City', 'Menouf'],
            ar: ['شبين الكوم', 'مدينة السادات', 'منوف'],
        },
        meta: {
            titleEn: 'Power Banks in Monufia – Shibin El Kom & Sadat City | CairoVolt',
            titleAr: 'باور بانك في المنوفية – شبين الكوم ومدينة السادات | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom charging gear with delivery estimates for Shibin El Kom, Sadat City, and Menouf in Monufia.',
            descriptionAr: 'تسوق مستلزمات شحن انكر وجوي روم مع مواعيد توصيل تقديرية لشبين الكوم ومدينة السادات ومنوف في المنوفية.',
        },
    },
    {
        slug: 'beheira',
        nameEn: 'Beheira',
        nameAr: 'البحيرة',
        region: 'delta',
        deliveryDays: 3,
        population: 6.7,
        cities: {
            en: ['Damanhour', 'Kafr El-Dawwar', 'Rashid'],
            ar: ['دمنهور', 'كفر الدوار', 'رشيد'],
        },
        meta: {
            titleEn: 'Power Banks in Beheira – Damanhour & Kafr El-Dawwar | CairoVolt',
            titleAr: 'باور بانك في البحيرة – دمنهور وكفر الدوار | كايرو فولت',
            descriptionEn: 'Anker and Joyroom power banks and chargers with delivery estimates for Damanhour, Kafr El-Dawwar, and Rashid in Beheira.',
            descriptionAr: 'باور بانك وشواحن انكر وجوي روم مع مواعيد توصيل تقديرية لدمنهور وكفر الدوار ورشيد في البحيرة.',
        },
    },
    {
        slug: 'kafr-el-sheikh',
        nameEn: 'Kafr El Sheikh',
        nameAr: 'كفر الشيخ',
        region: 'delta',
        deliveryDays: 3,
        population: 3.5,
        cities: {
            en: ['Kafr El Sheikh City', 'Desouk', 'Baltim'],
            ar: ['مدينة كفر الشيخ', 'دسوق', 'بلطيم'],
        },
        meta: {
            titleEn: 'Power Banks in Kafr El Sheikh – Desouk & Baltim | CairoVolt',
            titleAr: 'باور بانك في كفر الشيخ – دسوق وبلطيم | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom charging products with delivery estimates for Kafr El Sheikh City, Desouk, and Baltim.',
            descriptionAr: 'تسوق منتجات شحن انكر وجوي روم مع مواعيد توصيل تقديرية لمدينة كفر الشيخ ودسوق وبلطيم.',
        },
    },
    {
        slug: 'damietta',
        nameEn: 'Damietta',
        nameAr: 'دمياط',
        region: 'delta',
        deliveryDays: 2,
        population: 1.5,
        cities: {
            en: ['Damietta City', 'New Damietta', 'Ras El Bar'],
            ar: ['مدينة دمياط', 'دمياط الجديدة', 'رأس البر'],
        },
        meta: {
            titleEn: 'Power Banks in Damietta – New Damietta & Ras El Bar | CairoVolt',
            titleAr: 'باور بانك في دمياط – دمياط الجديدة ورأس البر | كايرو فولت',
            descriptionEn: 'Anker and Joyroom power banks and chargers with delivery estimates for Damietta City, New Damietta, and Ras El Bar.',
            descriptionAr: 'باور بانك وشواحن انكر وجوي روم مع مواعيد توصيل تقديرية لمدينة دمياط ودمياط الجديدة ورأس البر.',
        },
    },
    // Canal Zone
    {
        slug: 'port-said',
        nameEn: 'Port Said',
        nameAr: 'بورسعيد',
        region: 'canal',
        deliveryDays: 2,
        population: 0.8,
        cities: {
            en: ['Port Said City', 'Port Fouad'],
            ar: ['مدينة بورسعيد', 'بورفؤاد'],
        },
        meta: {
            titleEn: 'Power Banks in Port Said & Port Fouad | CairoVolt',
            titleAr: 'باور بانك في بورسعيد وبورفؤاد | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom charging gear with delivery estimates for Port Said City and Port Fouad.',
            descriptionAr: 'تسوق مستلزمات شحن انكر وجوي روم مع مواعيد توصيل تقديرية لمدينة بورسعيد وبورفؤاد.',
        },
    },
    {
        slug: 'ismailia',
        nameEn: 'Ismailia',
        nameAr: 'الإسماعيلية',
        region: 'canal',
        deliveryDays: 2,
        population: 1.4,
        cities: {
            en: ['Ismailia City', 'Fayed', 'El Qantara'],
            ar: ['مدينة الإسماعيلية', 'فايد', 'القنطرة'],
        },
        meta: {
            titleEn: 'Power Banks in Ismailia – Fayed & El Qantara | CairoVolt',
            titleAr: 'باور بانك في الإسماعيلية – فايد والقنطرة | كايرو فولت',
            descriptionEn: 'Anker and Joyroom power banks and chargers with delivery estimates for Ismailia City, Fayed, and El Qantara.',
            descriptionAr: 'باور بانك وشواحن انكر وجوي روم مع مواعيد توصيل تقديرية لمدينة الإسماعيلية وفايد والقنطرة.',
        },
    },
    {
        slug: 'suez',
        nameEn: 'Suez',
        nameAr: 'السويس',
        region: 'canal',
        deliveryDays: 2,
        population: 0.8,
        cities: {
            en: ['Suez City', 'Ain Sokhna'],
            ar: ['مدينة السويس', 'العين السخنة'],
        },
        meta: {
            titleEn: 'Power Banks in Suez & Ain Sokhna | CairoVolt',
            titleAr: 'باور بانك في السويس والعين السخنة | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom charging products with delivery estimates for Suez City and Ain Sokhna.',
            descriptionAr: 'تسوق منتجات شحن انكر وجوي روم مع مواعيد توصيل تقديرية لمدينة السويس والعين السخنة.',
        },
    },
    // Upper Egypt
    {
        slug: 'fayoum',
        nameEn: 'Fayoum',
        nameAr: 'الفيوم',
        region: 'upper',
        deliveryDays: 3,
        population: 3.8,
        cities: {
            en: ['Fayoum City', 'Sinnuris', 'Tamiya'],
            ar: ['مدينة الفيوم', 'سنورس', 'طامية'],
        },
        meta: {
            titleEn: 'Power Banks in Fayoum – Sinnuris & Tamiya | CairoVolt',
            titleAr: 'باور بانك في الفيوم – سنورس وطامية | كايرو فولت',
            descriptionEn: 'Anker and Joyroom power banks and chargers with delivery estimates for Fayoum City, Sinnuris, and Tamiya.',
            descriptionAr: 'باور بانك وشواحن انكر وجوي روم مع مواعيد توصيل تقديرية لمدينة الفيوم وسنورس وطامية.',
        },
    },
    {
        slug: 'beni-suef',
        nameEn: 'Beni Suef',
        nameAr: 'بني سويف',
        region: 'upper',
        deliveryDays: 3,
        population: 3.4,
        cities: {
            en: ['Beni Suef City', 'New Beni Suef', 'El Wasta'],
            ar: ['مدينة بني سويف', 'بني سويف الجديدة', 'الواسطى'],
        },
        meta: {
            titleEn: 'Power Banks in Beni Suef – New Beni Suef & El Wasta | CairoVolt',
            titleAr: 'باور بانك في بني سويف – بني سويف الجديدة والواسطى | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom charging gear with delivery estimates for Beni Suef City, New Beni Suef, and El Wasta.',
            descriptionAr: 'تسوق مستلزمات شحن انكر وجوي روم مع مواعيد توصيل تقديرية لمدينة بني سويف وبني سويف الجديدة والواسطى.',
        },
    },
    {
        slug: 'minya',
        nameEn: 'Minya',
        nameAr: 'المنيا',
        region: 'upper',
        deliveryDays: 3,
        population: 5.9,
        cities: {
            en: ['Minya City', 'New Minya', 'Mallawi'],
            ar: ['مدينة المنيا', 'المنيا الجديدة', 'ملوي'],
        },
        meta: {
            titleEn: 'Power Banks in Minya – New Minya & Mallawi | CairoVolt',
            titleAr: 'باور بانك في المنيا – المنيا الجديدة وملوي | كايرو فولت',
            descriptionEn: 'Anker and Joyroom power banks and chargers with delivery estimates for Minya City, New Minya, and Mallawi.',
            descriptionAr: 'باور بانك وشواحن انكر وجوي روم مع مواعيد توصيل تقديرية لمدينة المنيا والمنيا الجديدة وملوي.',
        },
    },
    {
        slug: 'asyut',
        nameEn: 'Asyut',
        nameAr: 'أسيوط',
        region: 'upper',
        deliveryDays: 3,
        population: 4.8,
        cities: {
            en: ['Asyut City', 'New Asyut', 'Dayrout'],
            ar: ['مدينة أسيوط', 'أسيوط الجديدة', 'ديروط'],
        },
        meta: {
            titleEn: 'Power Banks in Asyut – New Asyut & Dayrout | CairoVolt',
            titleAr: 'باور بانك في أسيوط – أسيوط الجديدة وديروط | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom charging products with delivery estimates for Asyut City, New Asyut, and Dayrout.',
            descriptionAr: 'تسوق منتجات شحن انكر وجوي روم مع مواعيد توصيل تقديرية لمدينة أسيوط وأسيوط الجديدة وديروط.',
        },
    },
    {
        slug: 'sohag',
        nameEn: 'Sohag',
        nameAr: 'سوهاج',
        region: 'upper',
        deliveryDays: 4,
        population: 5.4,
        cities: {
            en: ['Sohag City', 'Akhmim', 'Girga'],
            ar: ['مدينة سوهاج', 'أخميم', 'جرجا'],
        },
        meta: {
            titleEn: 'Power Banks in Sohag – Akhmim & Girga | CairoVolt',
            titleAr: 'باور بانك في سوهاج – أخميم وجرجا | كايرو فولت',
            descriptionEn: 'Anker and Joyroom power banks and chargers with delivery estimates for Sohag City, Akhmim, and Girga.',
            descriptionAr: 'باور بانك وشواحن انكر وجوي روم مع مواعيد توصيل تقديرية لمدينة سوهاج وأخميم وجرجا.',
        },
    },
    {
        slug: 'qena',
        nameEn: 'Qena',
        nameAr: 'قنا',
        region: 'upper',
        deliveryDays: 4,
        population: 3.4,
        cities: {
            en: ['Qena City', 'Nag Hammadi', 'Qus'],
            ar: ['مدينة قنا', 'نجع حمادي', 'قوص'],
        },
        meta: {
            titleEn: 'Power Banks in Qena – Nag Hammadi & Qus | CairoVolt',
            titleAr: 'باور بانك في قنا – نجع حمادي وقوص | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom charging gear with delivery estimates for Qena City, Nag Hammadi, and Qus.',
            descriptionAr: 'تسوق مستلزمات شحن انكر وجوي روم مع مواعيد توصيل تقديرية لمدينة قنا ونجع حمادي وقوص.',
        },
    },
    {
        slug: 'luxor',
        nameEn: 'Luxor',
        nameAr: 'الأقصر',
        region: 'upper',
        deliveryDays: 4,
        population: 1.3,
        cities: {
            en: ['Luxor City', 'Armant', 'Esna'],
            ar: ['مدينة الأقصر', 'أرمنت', 'إسنا'],
        },
        meta: {
            titleEn: 'Power Banks in Luxor – Armant & Esna | CairoVolt',
            titleAr: 'باور بانك في الأقصر – أرمنت وإسنا | كايرو فولت',
            descriptionEn: 'Anker and Joyroom power banks and chargers with delivery estimates for Luxor City, Armant, and Esna.',
            descriptionAr: 'باور بانك وشواحن انكر وجوي روم مع مواعيد توصيل تقديرية لمدينة الأقصر وأرمنت وإسنا.',
        },
    },
    {
        slug: 'aswan',
        nameEn: 'Aswan',
        nameAr: 'أسوان',
        region: 'upper',
        deliveryDays: 5,
        population: 1.6,
        cities: {
            en: ['Aswan City', 'Kom Ombo', 'Edfu'],
            ar: ['مدينة أسوان', 'كوم أمبو', 'إدفو'],
        },
        meta: {
            titleEn: 'Power Banks in Aswan – Kom Ombo & Edfu | CairoVolt',
            titleAr: 'باور بانك في أسوان – كوم أمبو وإدفو | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom charging products with delivery estimates for Aswan City, Kom Ombo, and Edfu.',
            descriptionAr: 'تسوق منتجات شحن انكر وجوي روم مع مواعيد توصيل تقديرية لمدينة أسوان وكوم أمبو وإدفو.',
        },
    },
    // Coastal & Desert
    {
        slug: 'red-sea',
        nameEn: 'Red Sea',
        nameAr: 'البحر الأحمر',
        region: 'coastal',
        deliveryDays: 4,
        population: 0.4,
        cities: {
            en: ['Hurghada', 'El Gouna', 'Safaga'],
            ar: ['الغردقة', 'الجونة', 'سفاجا'],
        },
        meta: {
            titleEn: 'Power Banks in Hurghada & Red Sea – El Gouna & Safaga | CairoVolt',
            titleAr: 'باور بانك في الغردقة والبحر الأحمر – الجونة وسفاجا | كايرو فولت',
            descriptionEn: 'Anker and Joyroom power banks and chargers with delivery estimates for Hurghada, El Gouna, and Safaga on the Red Sea.',
            descriptionAr: 'باور بانك وشواحن انكر وجوي روم مع مواعيد توصيل تقديرية للغردقة والجونة وسفاجا بالبحر الأحمر.',
        },
    },
    {
        slug: 'north-sinai',
        nameEn: 'North Sinai',
        nameAr: 'شمال سيناء',
        region: 'desert',
        deliveryDays: 5,
        population: 0.5,
        cities: {
            en: ['El Arish', 'Bir El Abd'],
            ar: ['العريش', 'بئر العبد'],
        },
        meta: {
            titleEn: 'Power Banks in North Sinai – El Arish & Bir El Abd | CairoVolt',
            titleAr: 'باور بانك في شمال سيناء – العريش وبئر العبد | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom charging gear with delivery estimates for El Arish and Bir El Abd in North Sinai; availability is confirmed per address.',
            descriptionAr: 'تسوق مستلزمات شحن انكر وجوي روم مع مواعيد توصيل تقديرية للعريش وبئر العبد في شمال سيناء، ويُؤكد التوفر حسب العنوان.',
        },
    },
    {
        slug: 'south-sinai',
        nameEn: 'South Sinai',
        nameAr: 'جنوب سيناء',
        region: 'desert',
        deliveryDays: 4,
        population: 0.2,
        cities: {
            en: ['Sharm El Sheikh', 'Dahab', 'Ras Sudr'],
            ar: ['شرم الشيخ', 'دهب', 'رأس سدر'],
        },
        meta: {
            titleEn: 'Power Banks in Sharm El Sheikh – Dahab & Ras Sudr | CairoVolt',
            titleAr: 'باور بانك في شرم الشيخ – دهب ورأس سدر | كايرو فولت',
            descriptionEn: 'Anker and Joyroom power banks and chargers with delivery estimates for Sharm El Sheikh, Dahab, and Ras Sudr in South Sinai.',
            descriptionAr: 'باور بانك وشواحن انكر وجوي روم مع مواعيد توصيل تقديرية لشرم الشيخ ودهب ورأس سدر في جنوب سيناء.',
        },
    },
    {
        slug: 'matrouh',
        nameEn: 'Matrouh',
        nameAr: 'مطروح',
        region: 'coastal',
        deliveryDays: 4,
        population: 0.5,
        cities: {
            en: ['Marsa Matrouh', 'El Alamein', 'El Dabaa'],
            ar: ['مرسى مطروح', 'العلمين', 'الضبعة'],
        },
        meta: {
            titleEn: 'Power Banks in Marsa Matrouh – El Alamein & El Dabaa | CairoVolt',
            titleAr: 'باور بانك في مرسى مطروح – العلمين والضبعة | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom charging products with delivery estimates for Marsa Matrouh, El Alamein, and El Dabaa.',
            descriptionAr: 'تسوق منتجات شحن انكر وجوي روم مع مواعيد توصيل تقديرية لمرسى مطروح والعلمين والضبعة.',
        },
    },
    {
        slug: 'new-valley',
        nameEn: 'New Valley',
        nameAr: 'الوادي الجديد',
        region: 'desert',
        deliveryDays: 5,
        population: 0.3,
        cities: {
            en: ['Kharga', 'Dakhla'],
            ar: ['الخارجة', 'الداخلة'],
        },
        meta: {
            titleEn: 'Power Banks in New Valley – Kharga & Dakhla | CairoVolt',
            titleAr: 'باور بانك في الوادي الجديد – الخارجة والداخلة | كايرو فولت',
            descriptionEn: 'Anker and Joyroom power banks and chargers with delivery estimates for Kharga and Dakhla in New Valley; availability is confirmed per address.',
            descriptionAr: 'باور بانك وشواحن انكر وجوي روم مع مواعيد توصيل تقديرية للخارجة والداخلة في الوادي الجديد، ويُؤكد التوفر حسب العنوان.',
        },
    },
];

// Helper functions
export function getGovernorateBySlug(slug: string): Governorate | undefined {
    return governorates.find(g => g.slug === slug);
}

export function getGovernoratesByRegion(region: Governorate['region']): Governorate[] {
    return governorates.filter(g => g.region === region);
}

export function getAllGovernoratesSlugs(): string[] {
    return governorates.map(g => g.slug);
}
