/**
 * Egyptian Governorates Data
 * Complete list of all 27 governorates for regional coverage
 */

export interface Governorate {
    slug: string;
    nameEn: string;
    nameAr: string;
    region: 'cairo' | 'delta' | 'canal' | 'upper' | 'coastal' | 'desert';
    deliveryDays: number;
    population: number; // in millions
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
        meta: {
            titleEn: 'Mobile Accessories Delivery to Cairo | CairoVolt',
            titleAr: 'توصيل اكسسوارات موبايل إلى القاهرة | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom power banks, chargers, and earbuds with an address-based delivery estimate and written CairoVolt warranty terms.',
            descriptionAr: 'تسوق باور بانك وشواحن وسماعات انكر وجوي روم مع موعد توصيل تقديري حسب العنوان وشروط ضمان كايرو فولت المكتوبة.',
        },
    },
    {
        slug: 'giza',
        nameEn: 'Giza',
        nameAr: 'الجيزة',
        region: 'cairo',
        deliveryDays: 1,
        population: 9.1,
        meta: {
            titleEn: 'Mobile Accessories Giza | Fast Delivery | CairoVolt',
            titleAr: 'اكسسوارات موبايل الجيزة | توصيل سريع | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom accessories with delivery estimates for 6th October, Sheikh Zayed, and other Giza areas.',
            descriptionAr: 'تسوق اكسسوارات انكر وجوي روم مع مواعيد توصيل تقديرية لأكتوبر والشيخ زايد ومناطق الجيزة.',
        },
    },
    {
        slug: 'qalyubia',
        nameEn: 'Qalyubia',
        nameAr: 'القليوبية',
        region: 'cairo',
        deliveryDays: 2,
        population: 5.9,
        meta: {
            titleEn: 'Mobile Accessories Qalyubia | Fast Delivery | CairoVolt',
            titleAr: 'اكسسوارات موبايل القليوبية | توصيل سريع | كايرو فولت',
            descriptionEn: 'Shop mobile accessories in Qalyubia with fast delivery to Benha, Shubra El Kheima & all areas.',
            descriptionAr: 'تسوق اكسسوارات الموبايل في القليوبية مع توصيل سريع لبنها وشبرا الخيمة وكل المناطق.',
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
        meta: {
            titleEn: 'Mobile Accessories Alexandria | Anker & Joyroom | CairoVolt',
            titleAr: 'اكسسوارات موبايل الإسكندرية | انكر وجوي روم | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom power banks, chargers, and earbuds with an address-based delivery estimate for Alexandria.',
            descriptionAr: 'تسوق باور بانك وشواحن وسماعات انكر وجوي روم مع موعد توصيل تقديري حسب العنوان في الإسكندرية.',
        },
    },
    {
        slug: 'dakahlia',
        nameEn: 'Dakahlia',
        nameAr: 'الدقهلية',
        region: 'delta',
        deliveryDays: 2,
        population: 6.9,
        meta: {
            titleEn: 'Mobile Accessories Dakahlia | Mansoura Delivery | CairoVolt',
            titleAr: 'اكسسوارات موبايل الدقهلية | توصيل المنصورة | كايرو فولت',
            descriptionEn: 'Shop Anker & Joyroom in Dakahlia with delivery to Mansoura, Talkha & Mit Ghamr.',
            descriptionAr: 'تسوق انكر وجوي روم في الدقهلية مع توصيل للمنصورة وطلخا وميت غمر.',
        },
    },
    {
        slug: 'sharqia',
        nameEn: 'Sharqia',
        nameAr: 'الشرقية',
        region: 'delta',
        deliveryDays: 2,
        population: 7.5,
        meta: {
            titleEn: 'Mobile Accessories Sharqia | Zagazig Delivery | CairoVolt',
            titleAr: 'اكسسوارات موبايل الشرقية | توصيل الزقازيق | كايرو فولت',
            descriptionEn: 'Shop mobile accessories with delivery estimates for Zagazig, 10th of Ramadan, Belbeis, and other Sharqia areas.',
            descriptionAr: 'تسوق اكسسوارات موبايل مع مواعيد توصيل تقديرية للزقازيق والعاشر من رمضان وبلبيس ومناطق الشرقية.',
        },
    },
    {
        slug: 'gharbia',
        nameEn: 'Gharbia',
        nameAr: 'الغربية',
        region: 'delta',
        deliveryDays: 2,
        population: 5.3,
        meta: {
            titleEn: 'Mobile Accessories Gharbia | Tanta Delivery | CairoVolt',
            titleAr: 'اكسسوارات موبايل الغربية | توصيل طنطا | كايرو فولت',
            descriptionEn: 'Shop Anker & Joyroom in Gharbia with delivery to Tanta, El Mahalla & Kafr El-Zayat.',
            descriptionAr: 'تسوق انكر وجوي روم في الغربية مع توصيل لطنطا والمحلة وكفر الزيات.',
        },
    },
    {
        slug: 'monufia',
        nameEn: 'Monufia',
        nameAr: 'المنوفية',
        region: 'delta',
        deliveryDays: 2,
        population: 4.5,
        meta: {
            titleEn: 'Mobile Accessories Monufia | Shibin El Kom | CairoVolt',
            titleAr: 'اكسسوارات موبايل المنوفية | شبين الكوم | كايرو فولت',
            descriptionEn: 'Shop Anker accessories with delivery estimates for Shibin El Kom, Sadat City, and other Monufia areas.',
            descriptionAr: 'تسوق اكسسوارات انكر مع مواعيد توصيل تقديرية لشبين الكوم ومدينة السادات ومناطق المنوفية.',
        },
    },
    {
        slug: 'beheira',
        nameEn: 'Beheira',
        nameAr: 'البحيرة',
        region: 'delta',
        deliveryDays: 3,
        population: 6.7,
        meta: {
            titleEn: 'Mobile Accessories Beheira | Damanhour Delivery | CairoVolt',
            titleAr: 'اكسسوارات موبايل البحيرة | توصيل دمنهور | كايرو فولت',
            descriptionEn: 'Shop mobile accessories in Beheira with delivery to Damanhour, Kafr El-Dawwar & Rashid.',
            descriptionAr: 'تسوق اكسسوارات الموبايل في البحيرة مع توصيل لدمنهور وكفر الدوار ورشيد.',
        },
    },
    {
        slug: 'kafr-el-sheikh',
        nameEn: 'Kafr El Sheikh',
        nameAr: 'كفر الشيخ',
        region: 'delta',
        deliveryDays: 3,
        population: 3.5,
        meta: {
            titleEn: 'Mobile Accessories Kafr El Sheikh | CairoVolt',
            titleAr: 'اكسسوارات موبايل كفر الشيخ | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom products with an address-based delivery estimate across Kafr El Sheikh.',
            descriptionAr: 'تسوق منتجات انكر وجوي روم مع موعد توصيل تقديري حسب العنوان في كفر الشيخ.',
        },
    },
    {
        slug: 'damietta',
        nameEn: 'Damietta',
        nameAr: 'دمياط',
        region: 'delta',
        deliveryDays: 2,
        population: 1.5,
        meta: {
            titleEn: 'Mobile Accessories Damietta | New Damietta | CairoVolt',
            titleAr: 'اكسسوارات موبايل دمياط | دمياط الجديدة | كايرو فولت',
            descriptionEn: 'Shop Anker accessories in Damietta with delivery to Damietta & New Damietta.',
            descriptionAr: 'تسوق اكسسوارات انكر في دمياط مع توصيل لدمياط ودمياط الجديدة.',
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
        meta: {
            titleEn: 'Mobile Accessories Port Said | CairoVolt',
            titleAr: 'اكسسوارات موبايل بورسعيد | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom accessories with an address-based delivery estimate for Port Said.',
            descriptionAr: 'تسوق اكسسوارات انكر وجوي روم مع موعد توصيل تقديري حسب العنوان في بورسعيد.',
        },
    },
    {
        slug: 'ismailia',
        nameEn: 'Ismailia',
        nameAr: 'الإسماعيلية',
        region: 'canal',
        deliveryDays: 2,
        population: 1.4,
        meta: {
            titleEn: 'Mobile Accessories Ismailia | CairoVolt',
            titleAr: 'اكسسوارات موبايل الإسماعيلية | كايرو فولت',
            descriptionEn: 'Shop Anker & Joyroom in Ismailia with fast delivery.',
            descriptionAr: 'تسوق انكر وجوي روم في الإسماعيلية مع توصيل سريع.',
        },
    },
    {
        slug: 'suez',
        nameEn: 'Suez',
        nameAr: 'السويس',
        region: 'canal',
        deliveryDays: 2,
        population: 0.8,
        meta: {
            titleEn: 'Mobile Accessories Suez | CairoVolt',
            titleAr: 'اكسسوارات موبايل السويس | كايرو فولت',
            descriptionEn: 'Shop mobile accessories for delivery to Suez with written CairoVolt warranty terms shown per product.',
            descriptionAr: 'تسوق اكسسوارات موبايل للتوصيل إلى السويس مع شروط ضمان كايرو فولت المكتوبة لكل منتج.',
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
        meta: {
            titleEn: 'Mobile Accessories Fayoum | CairoVolt',
            titleAr: 'اكسسوارات موبايل الفيوم | كايرو فولت',
            descriptionEn: 'Shop Anker & Joyroom in Fayoum with delivery.',
            descriptionAr: 'تسوق انكر وجوي روم في الفيوم مع التوصيل.',
        },
    },
    {
        slug: 'beni-suef',
        nameEn: 'Beni Suef',
        nameAr: 'بني سويف',
        region: 'upper',
        deliveryDays: 3,
        population: 3.4,
        meta: {
            titleEn: 'Mobile Accessories Beni Suef | CairoVolt',
            titleAr: 'اكسسوارات موبايل بني سويف | كايرو فولت',
            descriptionEn: 'Shop Anker accessories for delivery to Beni Suef with CairoVolt warranty terms shown per product.',
            descriptionAr: 'تسوق اكسسوارات انكر للتوصيل إلى بني سويف مع شروط ضمان كايرو فولت لكل منتج.',
        },
    },
    {
        slug: 'minya',
        nameEn: 'Minya',
        nameAr: 'المنيا',
        region: 'upper',
        deliveryDays: 3,
        population: 5.9,
        meta: {
            titleEn: 'Mobile Accessories Minya | CairoVolt',
            titleAr: 'اكسسوارات موبايل المنيا | كايرو فولت',
            descriptionEn: 'Shop mobile accessories in Minya with delivery.',
            descriptionAr: 'تسوق اكسسوارات الموبايل في المنيا مع التوصيل.',
        },
    },
    {
        slug: 'asyut',
        nameEn: 'Asyut',
        nameAr: 'أسيوط',
        region: 'upper',
        deliveryDays: 3,
        population: 4.8,
        meta: {
            titleEn: 'Mobile Accessories Asyut | CairoVolt',
            titleAr: 'اكسسوارات موبايل أسيوط | كايرو فولت',
            descriptionEn: 'Shop Anker and Joyroom products for delivery to Asyut with written CairoVolt warranty terms shown per product.',
            descriptionAr: 'تسوق منتجات انكر وجوي روم للتوصيل إلى أسيوط مع شروط ضمان كايرو فولت المكتوبة لكل منتج.',
        },
    },
    {
        slug: 'sohag',
        nameEn: 'Sohag',
        nameAr: 'سوهاج',
        region: 'upper',
        deliveryDays: 4,
        population: 5.4,
        meta: {
            titleEn: 'Mobile Accessories Sohag | CairoVolt',
            titleAr: 'اكسسوارات موبايل سوهاج | كايرو فولت',
            descriptionEn: 'Shop Anker accessories in Sohag with delivery.',
            descriptionAr: 'تسوق اكسسوارات انكر في سوهاج مع التوصيل.',
        },
    },
    {
        slug: 'qena',
        nameEn: 'Qena',
        nameAr: 'قنا',
        region: 'upper',
        deliveryDays: 4,
        population: 3.4,
        meta: {
            titleEn: 'Mobile Accessories Qena | CairoVolt',
            titleAr: 'اكسسوارات موبايل قنا | كايرو فولت',
            descriptionEn: 'Shop mobile accessories with delivery estimates for Qena.',
            descriptionAr: 'تسوق اكسسوارات موبايل مع موعد توصيل تقديري إلى قنا.',
        },
    },
    {
        slug: 'luxor',
        nameEn: 'Luxor',
        nameAr: 'الأقصر',
        region: 'upper',
        deliveryDays: 4,
        population: 1.3,
        meta: {
            titleEn: 'Mobile Accessories Luxor | Egypt | CairoVolt',
            titleAr: 'اكسسوارات موبايل الأقصر | مصر | كايرو فولت',
            descriptionEn: 'Shop Anker & Joyroom in Luxor with delivery.',
            descriptionAr: 'تسوق انكر وجوي روم في الأقصر مع التوصيل.',
        },
    },
    {
        slug: 'aswan',
        nameEn: 'Aswan',
        nameAr: 'أسوان',
        region: 'upper',
        deliveryDays: 5,
        population: 1.6,
        meta: {
            titleEn: 'Mobile Accessories Aswan | Egypt | CairoVolt',
            titleAr: 'اكسسوارات موبايل أسوان | مصر | كايرو فولت',
            descriptionEn: 'Shop Anker accessories for delivery to Aswan with CairoVolt warranty terms shown per product.',
            descriptionAr: 'تسوق اكسسوارات انكر للتوصيل إلى أسوان مع شروط ضمان كايرو فولت لكل منتج.',
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
        meta: {
            titleEn: 'Mobile Accessories Hurghada Red Sea | CairoVolt',
            titleAr: 'اكسسوارات موبايل الغردقة البحر الأحمر | كايرو فولت',
            descriptionEn: 'Shop mobile accessories in Hurghada & Red Sea region.',
            descriptionAr: 'تسوق اكسسوارات الموبايل في الغردقة والبحر الأحمر.',
        },
    },
    {
        slug: 'north-sinai',
        nameEn: 'North Sinai',
        nameAr: 'شمال سيناء',
        region: 'desert',
        deliveryDays: 5,
        population: 0.5,
        meta: {
            titleEn: 'Mobile Accessories North Sinai El Arish | CairoVolt',
            titleAr: 'اكسسوارات موبايل شمال سيناء العريش | كايرو فولت',
            descriptionEn: 'Shop mobile accessories with delivery estimates for North Sinai and El Arish.',
            descriptionAr: 'تسوق اكسسوارات موبايل مع مواعيد توصيل تقديرية لشمال سيناء والعريش.',
        },
    },
    {
        slug: 'south-sinai',
        nameEn: 'South Sinai',
        nameAr: 'جنوب سيناء',
        region: 'desert',
        deliveryDays: 4,
        population: 0.2,
        meta: {
            titleEn: 'Mobile Accessories Sharm El Sheikh | CairoVolt',
            titleAr: 'اكسسوارات موبايل شرم الشيخ | كايرو فولت',
            descriptionEn: 'Shop Anker in Sharm El Sheikh & South Sinai.',
            descriptionAr: 'تسوق انكر في شرم الشيخ وجنوب سيناء.',
        },
    },
    {
        slug: 'matrouh',
        nameEn: 'Matrouh',
        nameAr: 'مطروح',
        region: 'coastal',
        deliveryDays: 4,
        population: 0.5,
        meta: {
            titleEn: 'Mobile Accessories Marsa Matrouh | CairoVolt',
            titleAr: 'اكسسوارات موبايل مرسى مطروح | كايرو فولت',
            descriptionEn: 'Shop mobile accessories with delivery estimates for Marsa Matrouh.',
            descriptionAr: 'تسوق اكسسوارات موبايل مع موعد توصيل تقديري إلى مرسى مطروح.',
        },
    },
    {
        slug: 'new-valley',
        nameEn: 'New Valley',
        nameAr: 'الوادي الجديد',
        region: 'desert',
        deliveryDays: 5,
        population: 0.3,
        meta: {
            titleEn: 'Mobile Accessories New Valley | CairoVolt',
            titleAr: 'اكسسوارات موبايل الوادي الجديد | كايرو فولت',
            descriptionEn: 'Shop accessories in New Valley & Kharga.',
            descriptionAr: 'تسوق اكسسوارات في الوادي الجديد والخارجة.',
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
