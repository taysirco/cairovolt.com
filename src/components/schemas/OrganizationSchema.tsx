type Props = {
    locale: string;
};

export const OrganizationSchema = ({ locale }: Props) => {
    const isArabic = locale === 'ar';
    const name = isArabic ? 'كايرو فولت' : 'Cairo Volt';
    const description = isArabic
        ? 'كايرو فولت هو الوكيل المعتمد لمنتجات Anker و Joyroom في مصر. نبيع إكسسوارات الموبايل الأصلية مثل الباور بانك، السماعات، والكابلات بضمان رسمي.'
        : 'Cairo Volt is the authorized distributor for Anker & Joyroom in Egypt. We sell original mobile accessories like power banks, earbuds, and cables with official warranty.';

    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': 'https://cairovolt.com/#organization',
                name: name,
                legalName: 'شركة كايرو فولت ذات مسئولية محدودة',
                url: 'https://cairovolt.com',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://cairovolt.com/logo.png',
                    width: 512,
                    height: 512,
                    caption: name,
                },
                description: description,
                // Brand Affiliation: Linking to official brand data
                brand: [
                    {
                        '@type': 'Brand',
                        name: 'Anker',
                        sameAs: [
                            'https://en.wikipedia.org/wiki/Anker_(brand)',
                            'https://www.wikidata.org/wiki/Q28452620'
                        ]
                    },
                    {
                        '@type': 'Brand',
                        name: 'Joyroom',
                        sameAs: 'https://www.joyroom.com/'
                    }
                ],

                email: 'support@cairovolt.com',
                taxID: '777-471-566',
                vatID: '777-471-566',
                iso6523Code: '0188:8446',
                // Corporate Identifiers from Official Documents
                identifier: [
                    {
                        '@type': 'PropertyValue',
                        name: isArabic ? 'رقم التسجيل الضريبي' : 'Tax Registration Number',
                        value: '777-471-566' // المطابق للبطاقة الضريبية
                    },
                    {
                        '@type': 'PropertyValue',
                        name: isArabic ? 'رقم السجل التجاري' : 'Commercial Registration Number',
                        value: '8446' // المستخرج الخاص بالمركز العام
                    }
                ],
                // Distributorship Declaration
                award: [
                    isArabic ? 'موزع معتمد لمنتجات Anker في مصر' : 'Authorized Distributor for Anker in Egypt',
                    isArabic ? 'موزع معتمد لمنتجات Joyroom في مصر' : 'Authorized Distributor for Joyroom in Egypt'
                ],
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: isArabic ? 'القاهرة' : 'Cairo',
                    addressCountry: 'EG',
                },
                foundingDate: '2021',
                foundingLocation: {
                    '@type': 'Place',
                    name: 'New Damietta City, Egypt',
                    address: {
                        '@type': 'PostalAddress',
                        addressLocality: 'New Damietta City',
                        addressCountry: 'EG',
                    },
                },
                numberOfEmployees: {
                    '@type': 'QuantitativeValue',
                    minValue: 5,
                    maxValue: 25,
                },
                sameAs: [
                    'https://www.facebook.com/cairovolt',
                    'https://www.instagram.com/cairovolt',
                    'https://www.tiktok.com/@cairovolt',
                ],
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+201558245974',
                    contactType: 'customer service',
                    areaServed: 'EG',
                    availableLanguage: ['en', 'ar'],
                },
                department: [
                    {
                        '@type': 'Organization',
                        name: isArabic ? 'مختبرات كايرو فولت للفحص التقني' : 'CairoVolt Tech & QA Labs',
                        description: isArabic ? 'مركز الفحص التقني وإدارة الخوادم' : 'Technical testing center and server management',
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: 'New Damietta City',
                            addressCountry: 'EG',
                        },
                    },
                    {
                        '@type': 'Organization',
                        name: isArabic ? 'مستودعات كايرو فولت للشحن' : 'CairoVolt Fulfillment Hub',
                        description: isArabic ? 'مستودعات الشحن اللوجستي' : 'Logistics fulfillment warehouses',
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: 'New Cairo 3',
                            addressCountry: 'EG',
                        },
                    },
                ],
            },
            {
                '@type': 'ElectronicsStore',
                '@id': 'https://cairovolt.com/#store',
                parentOrganization: { '@id': 'https://cairovolt.com/#organization' },
                name: isArabic ? 'كايرو فولت - متجر الإلكترونيات' : 'Cairo Volt - Electronics Store',
                paymentAccepted: 'Cash on Delivery',
                currenciesAccepted: 'EGP',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Bosta Fulfillment Center, Industrial Area, New Cairo 3',
                    addressLocality: isArabic ? 'محافظة القاهرة' : 'Cairo Governorate',
                    postalCode: '4716140',
                    addressCountry: 'EG',
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 30.6997469,
                    longitude: 31.2088556,
                },
                potentialAction: [
                    {
                        '@type': 'SearchAction',
                        target: {
                            '@type': 'EntryPoint',
                            urlTemplate: `https://cairovolt.com/${locale}/search?q={search_term_string}`,
                        },
                        'query-input': 'required name=search_term_string',
                    },
                    {
                        '@type': 'OrderAction',
                        target: {
                            '@type': 'EntryPoint',
                            urlTemplate: `https://cairovolt.com/${locale}/checkout?add_sku={sku}`,
                            actionPlatform: [
                                'https://schema.org/DesktopWebPlatform',
                                'https://schema.org/MobileWebPlatform',
                            ],
                        },
                        deliveryMethod: 'https://schema.org/ParcelService',
                        paymentAccepted: 'Cash on Delivery',
                    },
                ],
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: isArabic ? 'كتالوج منتجات كايرو فولت' : 'CairoVolt Product Catalog',
                    url: `https://cairovolt.com/${locale}`,
                    numberOfItems: 50,
                },
                areaServed: isArabic
                    ? ['القاهرة', 'الجيزة', 'الإسكندرية', 'المنوفية', 'الشرقية', 'القليوبية', 'الغربية', 'بني سويف', 'أسيوط', 'سوهاج', 'قنا', 'الفيوم', 'المنيا', 'أسوان', 'الأقصر', 'الدقهلية', 'كفر الشيخ', 'البحيرة', 'دمياط', 'بور سعيد', 'السويس', 'الإسماعيلية', 'البحر الأحمر', 'مطروح', 'سيناء الشمالية', 'جنوب سيناء', 'الوادي الجديد']
                    : ['Cairo', 'Giza', 'Alexandria', 'Monufia', 'Sharqia', 'Qalyubia', 'Gharbia', 'Beni Suef', 'Asyut', 'Sohag', 'Qena', 'Faiyum', 'Minya', 'Aswan', 'Luxor', 'Dakahlia', 'Kafr el-Sheikh', 'Beheira', 'Damietta', 'Port Said', 'Suez', 'Ismailia', 'Red Sea', 'Matruh', 'North Sinai', 'South Sinai', 'New Valley'],
                knowsAbout: [
                    isArabic ? 'شواحن USB-C GaN' : 'USB-C GaN chargers',
                    isArabic ? 'باور بانك لانقطاع الكهرباء' : 'Power banks for Egyptian power outages',
                    isArabic ? 'سماعات ANC لاسلكية' : 'ANC wireless earbuds',
                    isArabic ? 'كابلات مجدولة عالية الجودة' : 'High-durability braided cables',
                    isArabic ? 'شواحن سيارات للطرق السريعة المصرية' : 'Car chargers for Egyptian highways',
                    isArabic ? 'تتذبذب الجهد الكهربائي في مصر (190-240V)' : 'Egyptian power grid voltage fluctuation (190-240V)',
                    isArabic ? 'فحص أصالة المنتجات Anker وJoyroom' : 'Authentication of original Anker and Joyroom products',
                    isArabic ? 'USB Power Delivery وGaN وQuick Charge' : 'USB Power Delivery, GaN technology, Quick Charge protocols',
                    isArabic ? 'تشغيل راوتر WE VDSL بالباور بانك' : 'WE VDSL router backup power during load shedding',
                    isArabic ? 'LiFePO4 مقابل Li-Ion لمقاومة الحرارة' : 'LiFePO4 vs Li-Ion battery chemistry for heat resistance',
                ],
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
