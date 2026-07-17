
export interface BrandData {
    id: string;
    hero: {
        bgGradient: string;
        badge: { en: string; ar: string };
        title: string;
        description: { en: string; ar: string };
        features: Array<{ en: string; ar: string }>;
        heroProduct?: {
            label: { en: string; ar: string };
            link: { href: string; text: { en: string; ar: string } };
        };
    };
    categories: Array<{
        title: { en: string; ar: string };
        description: { en: string; ar: string };
        href: string; // e.g. /anker/power-banks
        icon: string;
        volume: { en: string; ar: string };
        badge?: { en: string; ar: string };
    }>;
    whySection: {
        title: { en: string; ar: string };
        items: Array<{
            icon: string;
            title: { en: string; ar: string };
            description: { en: string; ar: string };
        }>;
    };
    // About section
    aboutSection?: {
        title: { en: string; ar: string };
        history: { en: string; ar: string };
        achievements: Array<{ icon: string; stat: { en: string; ar: string }; label: { en: string; ar: string } }>;
        technologies: Array<{ name: string; description: { en: string; ar: string } }>;
    };
    // Optional trust indicators shown on brand pages
    trustBadges?: Array<{
        icon: string;
        title: { en: string; ar: string };
        description: { en: string; ar: string };
    }>;
    metadata: {
        en: { title: string; description: string; keywords: string; openGraph?: { title?: string; description?: string; url?: string } };
        ar: { title: string; description: string; keywords: string; openGraph?: { title?: string; description?: string; url?: string } };
    };
    article?: {
        en: { title: string; sections: Array<{ heading: string; content: string }> };
        ar: { title: string; sections: Array<{ heading: string; content: string }> };
    };
    faq?: {
        en: Array<{ question: string; answer: string }>;
        ar: Array<{ question: string; answer: string }>;
    };
    quickAnswer?: {
        en: string;
        ar: string;
    };
}


export const brandData: Record<string, BrandData> = {
    anker: {
        id: 'anker',
        hero: {
            bgGradient: 'from-blue-600 via-blue-700 to-blue-900',
            badge: { en: 'Charging accessories for everyday devices', ar: 'ملحقات شحن للأجهزة اليومية' },
            title: 'Anker Egypt',
            description: {
                en: 'Explore Anker chargers, power banks, and cables for compatible phones, tablets, and laptops. Warranty coverage and supported charging standards are stated on each product page.',
                ar: 'اكتشف شواحن انكر والباور بانك والكابلات للهواتف والتابلت واللابتوب المتوافقة. توضح كل صفحة منتج معايير الشحن المدعومة ومدة ضمان كايرو فولت وشروطه.'
            },
            features: [
                { en: 'CairoVolt Warranty Terms by Product', ar: 'شروط ضمان كايرو فولت حسب المنتج' },
                { en: 'Safety Features Listed by Model', ar: 'خصائص حماية موضحة لكل موديل' },
                { en: 'Charging Standards Listed by Model', ar: 'معايير الشحن موضحة لكل موديل' }
            ]
        },
        categories: [
            { title: { en: 'Anker Power Banks', ar: 'باور بانك انكر' }, description: { en: 'PowerCore models and listed capacities', ar: 'موديلات PowerCore بسعات موضحة لكل منتج' }, href: '/anker/power-banks', icon: 'bolt', volume: { en: 'Browse available models', ar: 'تصفّح الموديلات المتاحة' } },
            { title: { en: 'Anker Chargers', ar: 'شواحن انكر (Wall)' }, description: { en: 'Nano and GaN models with listed outputs', ar: 'موديلات Nano وGaN بقدرات موضحة' }, href: '/anker/wall-chargers', icon: 'plug', volume: { en: 'Compare charging outputs', ar: 'قارن قدرات الشحن' } },
            { title: { en: 'Anker Cables', ar: 'كابلات انكر' }, description: { en: 'PowerLine and USB-C cable options', ar: 'خيارات PowerLine وUSB-C' }, href: '/anker/cables', icon: 'link', volume: { en: 'Check connector compatibility', ar: 'تحقق من توافق الموصلات' } },
            { title: { en: 'Anker Car Chargers', ar: 'شواحن سيارة انكر' }, description: { en: 'PowerDrive models for compatible vehicles and devices', ar: 'موديلات PowerDrive للسيارات والأجهزة المتوافقة' }, href: '/anker/car-chargers', icon: 'car', volume: { en: 'Browse car charging options', ar: 'تصفّح خيارات شحن السيارة' } },
            // Soundcore audio sub-brand cross-link
            { title: { en: '→ Soundcore Audio (Sub-brand)', ar: '← ساوندكور (للصوتيات)' }, description: { en: 'Earbuds and speakers under Anker\'s dedicated audio brand', ar: 'ايربودز وسبيكرات تحت العلامة الصوتية الفرعية من انكر' }, href: '/soundcore', icon: 'headphones', volume: { en: 'Browse Soundcore audio', ar: 'تصفّح صوتيات ساوندكور' }, badge: { en: 'Sub-brand', ar: 'علامة فرعية' } },
        ],
        whySection: {
            title: { en: 'Why consider Anker?', ar: 'لماذا قد تختار انكر؟' },
            items: [
                { icon: 'globe', title: { en: 'Established Product Range', ar: 'تشكيلة منتجات متنوعة' }, description: { en: 'Charging accessories across several device categories', ar: 'ملحقات شحن لعدة فئات من الأجهزة' } },
                { icon: 'brain', title: { en: 'PowerIQ Options', ar: 'خيارات PowerIQ' }, description: { en: 'PowerIQ support is identified in each compatible model\'s specifications', ar: 'يظهر دعم PowerIQ في مواصفات كل موديل متوافق' } },
                { icon: 'shield', title: { en: 'Model-Specific Protection', ar: 'حماية حسب الموديل' }, description: { en: 'Check the product page for the protection features included with that model', ar: 'راجع صفحة المنتج لمعرفة خصائص الحماية المتاحة في الموديل' } },
                { icon: 'handshake', title: { en: 'CairoVolt Warranty', ar: 'ضمان كايرو فولت' }, description: { en: 'Coverage period and conditions are stated on each product page', ar: 'مدة التغطية وشروطها موضحة في صفحة كل منتج' } },
            ]
        },
        // About section
        aboutSection: {
            title: {
                en: 'About Anker Charging Accessories',
                ar: 'عن ملحقات الشحن من انكر'
            },
            history: {
                en: 'Anker was founded in 2011 and offers charging accessories across several categories, including wall chargers, power banks, cables, and car chargers. Technologies and charging standards differ by model, so CairoVolt lists the relevant output, port, protocol, and compatibility information on each product page.',
                ar: 'تأسست انكر عام 2011، وتقدم ملحقات شحن ضمن فئات تشمل شواحن الحائط والباور بانك والكابلات وشواحن السيارة. تختلف التقنيات ومعايير الشحن حسب الموديل، لذلك تعرض كايرو فولت في صفحة كل منتج القدرة والمنافذ والبروتوكولات ومعلومات التوافق ذات الصلة.'
            },
            achievements: [
                { icon: 'trophy', stat: { en: 'Charging', ar: 'الشحن' }, label: { en: 'Wall and portable charging categories', ar: 'فئات شحن حائط ومحمولة' } },
                { icon: 'globe', stat: { en: 'Multi-device', ar: 'أجهزة متعددة' }, label: { en: 'Options for compatible phones, tablets, and laptops', ar: 'خيارات لهواتف وتابلت ولابتوب متوافقة' } },
                { icon: 'star', stat: { en: 'By model', ar: 'حسب الموديل' }, label: { en: 'Customer reviews shown only where available', ar: 'تظهر تقييمات العملاء عند توفرها' } },
                { icon: 'microscope', stat: { en: 'Specifications', ar: 'المواصفات' }, label: { en: 'Protocols and outputs listed per product', ar: 'البروتوكولات والقدرات موضحة لكل منتج' } },
                { icon: 'calendar', stat: { en: '2011', ar: '2011' }, label: { en: 'Year Founded', ar: 'سنة التأسيس' } },
                { icon: 'medal', stat: { en: 'Support', ar: 'الدعم' }, label: { en: 'CairoVolt order and warranty assistance', ar: 'مساعدة كايرو فولت للطلبات والضمان' } }
            ],
            technologies: [
                { name: 'GaN and GaNPrime™', description: { en: 'Some listed charger models use gallium nitride technology. Check the product page for its ports, total output, per-port limits, and compatible devices.', ar: 'تستخدم بعض موديلات الشواحن المعروضة تقنية نيتريد الجاليوم. راجع صفحة المنتج لمعرفة المنافذ والقدرة الإجمالية وحدود كل منفذ والأجهزة المتوافقة.' } },
                { name: 'PowerIQ', description: { en: 'PowerIQ support and the associated charging protocols vary by model. The applicable PD, PPS, or other standards are stated in the product specifications when documented.', ar: 'يختلف دعم PowerIQ وبروتوكولات الشحن المرتبطة به حسب الموديل. تظهر معايير PD أوPPS أو غيرها في مواصفات المنتج عند توثيقها.' } },
                { name: 'ActiveShield™', description: { en: 'Some Anker models list ActiveShield temperature-management features. Refer to the selected model\'s specifications and operating instructions.', ar: 'تذكر مواصفات بعض موديلات انكر خصائص إدارة الحرارة ActiveShield. ارجع إلى مواصفات الموديل المختار وتعليمات تشغيله.' } },
                { name: 'PowerLine III Flow', description: { en: 'Cable construction, connector type, supported power, and device compatibility are listed for each PowerLine model.', ar: 'توضح صفحة كل موديل PowerLine خامة الكابل ونوع الموصل والقدرة المدعومة وتوافق الأجهزة.' } },
                { name: 'Magnetic Charging Compatibility', description: { en: 'Magnetic alignment, wireless-charging standard, and device compatibility vary by product. Confirm the exact phone and case requirements on the product page.', ar: 'تختلف المحاذاة المغناطيسية ومعيار الشحن اللاسلكي وتوافق الأجهزة حسب المنتج. تحقق من متطلبات الهاتف والغطاء في صفحة المنتج.' } }
            ]
        },
        // Optional trust indicators
        trustBadges: [
            { icon: 'check-circle', title: { en: 'Product Verification', ar: 'التحقق من المنتج' }, description: { en: 'Follow the manufacturer instructions printed on eligible packaging', ar: 'اتبع تعليمات الشركة المطبوعة على العبوة المؤهلة' } },
            { icon: 'shield', title: { en: 'CairoVolt Warranty', ar: 'ضمان كايرو فولت' }, description: { en: 'Duration and conditions are listed by product', ar: 'المدة والشروط موضحة حسب المنتج' } },
            { icon: 'coin', title: { en: 'Current Product Price', ar: 'سعر المنتج الحالي' }, description: { en: 'The current listed price is shown on the product page and at checkout', ar: 'السعر الحالي يظهر في صفحة المنتج وعند الدفع' } },
            { icon: 'truck', title: { en: 'Delivery Across Egypt', ar: 'توصيل داخل مصر' }, description: { en: 'Estimated timing and fees depend on the destination and order', ar: 'المدة والتكلفة تقديريتان حسب العنوان والطلب' } },
            { icon: 'star', title: { en: 'Customer Feedback', ar: 'آراء العملاء' }, description: { en: 'Published reviews are shown where available', ar: 'تظهر المراجعات المنشورة عند توفرها' } },
            { icon: 'call', title: { en: 'WhatsApp Support', ar: 'دعم واتساب' }, description: { en: 'See the contact page for current support hours', ar: 'راجع صفحة التواصل لمعرفة مواعيد الدعم' } }
        ],
        metadata: {
            en: {
                title: 'Anker Products in Egypt | GaN Chargers, Power Banks & Cables',
                description: 'Browse Anker chargers, PowerCore power banks, PowerLine cables, and car chargers at CairoVolt. Check each product page for current listed price, availability, compatibility, and CairoVolt warranty terms. For Soundcore audio, visit /soundcore.',
                keywords: 'anker egypt, anker, anker power bank, anker charger, anker cable, anker car charger, anker verify, anker gan, anker powercore, anker powerline, anker prime, anker nano, anker wholesale egypt',
            },
            ar: {
                title: 'منتجات انكر في مصر | شواحن GaN وباور بانك وكابلات',
                description: 'تصفّح شواحن انكر وباور بانك PowerCore وكابلات PowerLine وشواحن السيارة من كايرو فولت. راجع صفحة المنتج للسعر والمخزون والتوافق وشروط ضمان كايرو فولت. للصوتيات تصفّح /soundcore.',
                keywords: 'انكر مصر, انكر, منتجات انكر, التحقق من انكر, باور بانك انكر, شاحن انكر, وصلة انكر, كابل انكر, شاحن انكر للسياره, انكر باور هاوس',
            }
        },
        article: {
            ar: {
                title: 'انكر مصر: اختيار الشاحن والباور بانك المناسب',
                sections: [
                    {
                        heading: 'كيف تختار منتج انكر المناسب؟',
                        content: 'ابدأ بتحديد الجهاز والقدرة التي يدعمها ونوع المنفذ والكابل المطلوب. تختلف تقنيات **PowerIQ** ومعايير PD وPPS والقدرة المتاحة حسب موديل انكر، لذلك راجع مواصفات المنتج وتوافقه قبل الشراء ولا تعتمد على اسم التقنية وحده.'
                    },
                    {
                        heading: 'ضمان كايرو فولت: حماية أوضح للشراء',
                        content: 'توضح صفحة كل منتج مدة ضمان كايرو فولت ونطاق التغطية والاستثناءات. وللتحقق من المنتج، اتبع تعليمات الشركة وعنوان التحقق المطبوعين على العبوة المؤهلة، واحتفظ ببيانات طلب كايرو فولت لطلب الدعم.'
                    }
                ]
            },
            en: {
                title: 'Anker Egypt: Choosing the Right Charging Accessory',
                sections: [
                    {
                        heading: 'How to Choose an Anker Product',
                        content: 'Start with the device’s supported charging standard, required output, port type, and cable. **GaNPrime™**, PowerIQ, PD, PPS, and multi-device charging support differ by Anker model, so use the selected product page to confirm the relevant specifications before ordering.'
                    },
                    {
                        heading: 'Specifications, Instructions, and Warranty',
                        content: 'Where a model includes **ActiveShield™** or another protection feature, it is identified in that product’s specifications. Follow the manufacturer’s operating instructions and check the product page for CairoVolt’s applicable warranty period, coverage, and exclusions.'
                    }
                ]
            }
        },
        faq: {
            ar: [
                { question: 'كيف أتحقق من منتج انكر؟', answer: 'افحص بيانات الموديل والرقم التسلسلي والعبوة، واتبع تعليمات الشركة وعنوان التحقق المطبوعين على العبوة المؤهلة؛ فقد تختلف وسيلة التحقق حسب المنتج والسوق. احتفظ بفاتورة وبيانات طلب كايرو فولت عند التواصل بشأن المنتج.' },
                { question: 'ما الفرق بين ضمان انكر في كايرو فولت والمتاجر الأخرى؟', answer: 'تختلف شروط الضمان حسب البائع والمنتج. توضح كايرو فولت مدة ضمان المتجر وتغطيته واستثناءاته في صفحة كل منتج. تواصل معنا عبر واتساب لطلب الدعم أو التحقق من حالة تغطية طلبك.' },
                { question: 'ما هو الفرق بين PowerIQ وPD (Power Delivery)؟', answer: '**PD** معيار شحن تستخدمه أجهزة ومنتجات متوافقة، بينما **PowerIQ** اسم تستخدمه انكر لبعض تقنيات إدارة الشحن لديها. يختلف دعم PD أوPPS أو غيرهما حسب الموديل والجهاز والكابل، وتوضح صفحة المنتج المعايير الموثقة.' },
                { question: 'كيف أختار شاحن انكر مناسبًا للآيفون؟', answer: 'تحقق من القدرة ومعيار الشحن ونوع الكابل اللذين يدعمهما موديل الآيفون، ثم طابقهما مع مواصفات الشاحن. لا تنطبق شهادات الكابلات أو خصائص الحماية تلقائيًا على كل منتج، لذا راجع مواصفات الموديل وتعليماته.' },
                { question: 'لماذا قد أختار منتجات انكر؟', answer: 'تضم انكر شواحن وباور بانك وكابلات بمواصفات متعددة. قارن القدرة والمنافذ والبروتوكولات والحجم والتوافق والسعر الحالي والضمان الموضح لكل منتج لاختيار ما يناسب استخدامك.' },
                { question: 'كيف أحصل على دعم لمنتج انكر اشتريته من كايرو فولت؟', answer: 'كايرو فولت متجر إلكتروني ويقدم ضمان متجر وفق مدة وشروط صفحة المنتج، وليس مركز خدمة معتمدًا من الشركة ما لم يُذكر ذلك بوثيقة صريحة. تواصل عبر صفحة الدعم أو واتساب مع رقم الطلب ووصف المشكلة لتقييم الطلب وفق الشروط.' }
            ],
            en: [
                { question: 'How can I verify an Anker product?', answer: 'Check the model details, serial information, and packaging, then follow the manufacturer instructions and verification address printed on eligible packaging. The available method can vary by product and market. Keep your CairoVolt invoice and order details when requesting support.' },
                { question: 'How does CairoVolt warranty compare with other stores?', answer: 'Warranty terms vary by seller and product. CairoVolt states its store-warranty period, coverage, and exclusions on each product page. Contact us on WhatsApp to request support or confirm the coverage for your order.' },
                { question: 'What is the difference between PowerIQ and PD (Power Delivery)?', answer: '**PD** is a charging standard used by compatible devices and products, while **PowerIQ** is Anker’s name for charging-management technologies included in selected models. PD, PPS, and other protocol support varies by model, device, and cable; check the documented specifications.' },
                { question: 'How do I choose an Anker charger for an iPhone?', answer: 'Check the charging output, protocol, and cable type supported by your specific iPhone model, then match them to the charger specifications. Cable certifications and protection features do not automatically apply to every product, so review the selected model’s documentation.' },
                { question: 'Why might I choose Anker products?', answer: 'Anker offers chargers, power banks, and cables across several specifications. Compare output, ports, protocols, size, compatibility, current price, and the stated warranty terms to choose a product that fits your use.' },
                { question: 'How do I get support for an Anker product bought from CairoVolt?', answer: 'CairoVolt is an online retailer and provides a store warranty under the period and conditions stated on the product page; it is not presented as an authorized manufacturer service center unless expressly documented. Contact support or WhatsApp with your order number and issue details for assessment under those terms.' }
            ]
        },
        quickAnswer: {
            en: 'CairoVolt lists Anker power banks, chargers, cables, and car chargers in Egypt. Availability and price are live on each product page; compatibility, specifications, and CairoVolt warranty terms vary by model. For Anker’s Soundcore audio sub-brand, visit /soundcore.',
            ar: 'تعرض كايرو فولت باور بانك وشواحن وكابلات وشواحن سيارة من انكر في مصر. يظهر السعر والمخزون الحاليان في صفحة كل منتج، وتختلف المواصفات والتوافق وشروط ضمان كايرو فولت حسب الموديل. لصوتيات ساوندكور، العلامة الفرعية من انكر، تصفّح /soundcore.'
        }
    },
    joyroom: {
        id: 'joyroom',
        hero: {
            bgGradient: 'from-red-600 via-red-700 to-red-900',
            badge: { en: 'Joyroom: Value-focused accessories', ar: 'جوي روم: ملحقات بخيارات متنوعة' },
            title: 'Joyroom Egypt',
            description: {
                en: 'Browse Joyroom earbuds, power banks, chargers, cables, watches, and car accessories. Check each product page for current listed price, availability, specifications, compatibility, and CairoVolt warranty terms.',
                ar: 'تصفّح سماعات جوي روم والباور بانك والشواحن والكابلات والساعات وإكسسوارات السيارة. راجع صفحة كل منتج للسعر والمخزون والمواصفات والتوافق وشروط ضمان كايرو فولت.'
            },
            features: [
                { en: 'Packaging Verification Where Available', ar: 'التحقق عبر العبوة عند توفره' },
                { en: 'CairoVolt Warranty Terms by Product', ar: 'شروط ضمان كايرو فولت حسب المنتج' },
                { en: 'Specifications and Prices by Model', ar: 'المواصفات والأسعار حسب الموديل' }
            ],
            heroProduct: {
                label: { en: 'Featured audio:', ar: 'صوتيات مختارة:' },
                link: { href: '/joyroom/audio', text: { en: 'Browse Joyroom T03s earbuds', ar: 'تصفّح سماعات جوي روم T03s' } }
            }
        },
        categories: [
            { title: { en: 'T03s Earbuds', ar: 'سماعات جوي روم T03s' }, description: { en: 'T03s models and listed audio features', ar: 'موديلات T03s وخصائص الصوت الموضحة' }, href: '/joyroom/audio', icon: 'headphones', volume: { en: 'Browse available models', ar: 'تصفّح الموديلات المتاحة' }, badge: { en: 'Audio', ar: 'صوتيات' } },
            { title: { en: 'Joyroom Power Banks', ar: 'باور بانك جوي روم' }, description: { en: 'Capacities and ports listed by model', ar: 'السعات والمنافذ موضحة حسب الموديل' }, href: '/joyroom/power-banks', icon: 'bolt', volume: { en: 'Compare capacities', ar: 'قارن السعات' } },
            { title: { en: 'Joyroom Chargers', ar: 'شواحن جوي روم' }, description: { en: 'Outputs and protocols listed by model', ar: 'القدرات والبروتوكولات حسب الموديل' }, href: '/joyroom/wall-chargers', icon: 'plug', volume: { en: 'Compare charging options', ar: 'قارن خيارات الشحن' } },
            { title: { en: 'Joyroom Cables', ar: 'كابلات جوي روم' }, description: { en: 'Connector and power options by model', ar: 'خيارات الموصل والقدرة حسب الموديل' }, href: '/joyroom/cables', icon: 'link', volume: { en: 'Check compatibility', ar: 'تحقق من التوافق' } },
            { title: { en: 'Joyroom Smart Watches', ar: 'ساعات جوي روم' }, description: { en: 'FT3 Pro and other listed models', ar: 'FT3 Pro وموديلات أخرى معروضة' }, href: '/joyroom/smart-watches', icon: 'watch', volume: { en: 'Browse watch models', ar: 'تصفّح موديلات الساعات' }, badge: { en: 'Watches', ar: 'ساعات' } },
            { title: { en: 'Car Holders', ar: 'حوامل سيارة جوي روم' }, description: { en: 'Mounting type and fit vary by model', ar: 'نوع التثبيت والتوافق حسب الموديل' }, href: '/joyroom/car-holders', icon: 'compass', volume: { en: 'Browse holder options', ar: 'تصفّح خيارات الحوامل' } },
            { title: { en: 'Car Accessories', ar: 'إكسسوارات سيارة جوي روم' }, description: { en: 'Chargers, mounts, and related accessories', ar: 'شواحن وحوامل وملحقات مرتبطة' }, href: '/joyroom/car-accessories', icon: 'car', volume: { en: 'Browse car accessories', ar: 'تصفّح إكسسوارات السيارة' } },
        ],
        whySection: {
            title: { en: 'Why Choose Joyroom?', ar: 'لماذا تختار جوي روم؟' },
            items: [
                { icon: 'coin', title: { en: 'Price Options', ar: 'خيارات سعرية' }, description: { en: 'Compare the current listed price and specifications of each model', ar: 'قارن السعر الحالي ومواصفات كل موديل' } },
                { icon: 'sparkles', title: { en: 'Design Variety', ar: 'تنوع التصميم' }, description: { en: 'Different form factors are available across the range', ar: 'تتوفر أشكال وتصميمات مختلفة ضمن المجموعة' } },
                { icon: 'shield', title: { en: 'Packaging Verification', ar: 'التحقق عبر العبوة' }, description: { en: 'Follow the manufacturer instructions printed on eligible packaging', ar: 'اتبع تعليمات الشركة المطبوعة على العبوة المؤهلة' } },
                { icon: 'headphones', title: { en: 'T03s Range', ar: 'مجموعة T03s' }, description: { en: 'Compare the documented features of available T03s models', ar: 'قارن الخصائص الموثقة لموديلات T03s المتاحة' } },
            ]
        },
        // About section
        aboutSection: {
            title: {
                en: 'About Joyroom Accessories',
                ar: 'عن إكسسوارات جوي روم'
            },
            history: {
                en: 'Joyroom was founded in 2009 and offers consumer-electronics accessories across audio, charging, cables, watches, and in-car categories. Materials, battery type, protection features, charging standards, and included accessories differ by model, so CairoVolt presents the documented details on each product page.',
                ar: 'تأسست جوي روم عام 2009، وتقدم إكسسوارات إلكترونية ضمن فئات الصوتيات والشحن والكابلات والساعات وملحقات السيارة. تختلف الخامات ونوع البطارية وخصائص الحماية ومعايير الشحن والملحقات المرفقة حسب الموديل، لذلك تعرض كايرو فولت التفاصيل الموثقة في صفحة كل منتج.'
            },
            achievements: [
                { icon: 'globe', stat: { en: 'Accessories', ar: 'إكسسوارات' }, label: { en: 'Audio, charging, and car categories', ar: 'فئات صوتيات وشحن وسيارة' } },
                { icon: 'star', stat: { en: 'By model', ar: 'حسب الموديل' }, label: { en: 'Customer reviews shown only where available', ar: 'تظهر تقييمات العملاء عند توفرها' } },
                { icon: 'package', stat: { en: 'Live stock', ar: 'مخزون مباشر' }, label: { en: 'Availability shown on each product page', ar: 'التوفر موضح في صفحة كل منتج' } },
                { icon: 'headphones', stat: { en: 'T03s', ar: 'T03s' }, label: { en: 'Earbud models in the audio range', ar: 'موديلات سماعات ضمن قسم الصوتيات' } },
                { icon: 'factory', stat: { en: '2009', ar: '2009' }, label: { en: 'Year Founded', ar: 'سنة التأسيس' } },
                { icon: 'battery', stat: { en: 'Specifications', ar: 'المواصفات' }, label: { en: 'Battery and charging details listed by model', ar: 'تفاصيل البطارية والشحن حسب الموديل' } }
            ],
            technologies: [
                { name: 'Packaging Verification', description: { en: 'Some eligible packages may include a manufacturer verification label. Follow the exact instructions and web address printed on that package; availability and method can vary by model and market.', ar: 'قد تتضمن بعض العبوات المؤهلة ملصق تحقق من الشركة. اتبع التعليمات وعنوان الموقع المطبوعين على العبوة نفسها؛ فقد يختلف توفر الطريقة وشكلها حسب الموديل والسوق.' } },
                { name: 'Smart IC Protection', description: { en: 'Selected models list Smart IC or related protection features. Confirm the documented protections, supported output, and operating instructions on the chosen product page.', ar: 'تذكر مواصفات بعض الموديلات Smart IC أو خصائص حماية مرتبطة. تحقق من خصائص الحماية والقدرة المدعومة وتعليمات التشغيل في صفحة المنتج المختار.' } },
                { name: 'Battery Specifications', description: { en: 'Cell chemistry, capacity, rated capacity, input, and output vary between power-bank models. Use the product specifications rather than assuming one cell grade across the range.', ar: 'تختلف كيمياء الخلايا والسعة والسعة المقننة وقدرات الإدخال والإخراج بين موديلات الباور بانك. اعتمد على مواصفات المنتج بدل افتراض درجة خلايا واحدة لكل المجموعة.' } },
                { name: 'Cable Construction', description: { en: 'Selected cable models use braided outer materials or reinforced connector areas. Check the selected model for its construction, connector type, supported power, and warranty terms.', ar: 'تستخدم بعض موديلات الكابلات خامة خارجية مجدولة أو تدعيمًا عند الموصل. راجع الموديل المختار لمعرفة الخامة ونوع الموصل والقدرة المدعومة وشروط الضمان.' } }
            ]
        },
        // Optional trust indicators for Joyroom
        trustBadges: [
            { icon: 'lock', title: { en: 'Packaging Verification', ar: 'التحقق عبر العبوة' }, description: { en: 'Follow printed manufacturer instructions where provided', ar: 'اتبع تعليمات الشركة المطبوعة عند توفرها' } },
            { icon: 'shield', title: { en: 'CairoVolt Warranty', ar: 'ضمان كايرو فولت' }, description: { en: 'Duration and conditions are listed by product', ar: 'المدة والشروط موضحة حسب المنتج' } },
            { icon: 'battery', title: { en: 'Battery Details', ar: 'تفاصيل البطارية' }, description: { en: 'Capacity and cell information are model-specific', ar: 'السعة وبيانات الخلايا حسب الموديل' } },
            { icon: 'coin', title: { en: 'Current Product Price', ar: 'سعر المنتج الحالي' }, description: { en: 'The current listed price is shown on the product page and at checkout', ar: 'السعر الحالي يظهر في صفحة المنتج وعند الدفع' } },
            { icon: 'phone', title: { en: 'Device Compatibility', ar: 'توافق الأجهزة' }, description: { en: 'Confirm your device and operating-system requirements by model', ar: 'تحقق من متطلبات جهازك ونظامه حسب الموديل' } },
            { icon: 'call', title: { en: 'WhatsApp Support', ar: 'دعم واتساب' }, description: { en: 'See the contact page for current support hours', ar: 'راجع صفحة التواصل لمعرفة مواعيد الدعم' } }
        ],
        metadata: {
            en: {
                title: 'Joyroom Egypt | T03s, Power Banks & Accessories',
                description: 'Browse CairoVolt’s Joyroom collection in Egypt, including T03s earbuds, power banks, chargers, cables, watches, and car accessories. Follow the manufacturer verification instructions printed on eligible packaging.',
                keywords: 'joyroom egypt, joyroom t03s, joyroom t03s pro, joyroom power bank, joyroom charger, joyroom cable, joyroom verification, joyroom earbuds egypt',
            },
            ar: {
                title: 'جوي روم مصر | سماعات T03s وباور بانك وإكسسوارات',
                description: 'تصفّح مجموعة جوي روم من كايرو فولت في مصر: سماعات T03s، باور بانك، شواحن، كابلات، ساعات وإكسسوارات سيارة. اتبع تعليمات التحقق المطبوعة على العبوات المؤهلة.',
                keywords: 'جوي روم, منتجات جوي روم, التحقق من جوي روم, سماعة جوي روم, سعر t03s في مصر, سعر سماعة جوي روم, جوي روم t03s, سعر جوي روم t03s, جويروم, باور بانك جوي روم, شاحن جوي روم',
            }
        },
        article: {
            ar: {
                title: 'جوي روم مصر: مقارنة المواصفات والسعر حسب الموديل',
                sections: [
                    {
                        heading: 'كيف تقارن موديلات سماعات جوي روم؟',
                        content: 'تضم مجموعة **T03s** موديلات بمواصفات قد تختلف في أسلوب الاقتران والميكروفون والتحكم والبطارية والخصائص الصوتية. قارن المواصفات الموثقة والسعر الحالي والتوافق والملحقات المرفقة في صفحة كل منتج قبل الاختيار.'
                    },
                    {
                        heading: 'السلامة تبدأ بالتوافق الصحيح',
                        content: 'تختلف خصائص Smart IC ونوع الخلايا ومعايير الشحن بين موديلات جوي روم. راجع قدرة الجهاز والكابل والشاحن، واتبع تعليمات التشغيل، واعتمد على الشهادات أو خصائص الحماية المذكورة صراحة للموديل بدل تعميمها على المجموعة كلها.'
                    }
                ]
            },
            en: {
                title: 'Joyroom Egypt: Comparing Features and Price by Model',
                sections: [
                    {
                        heading: 'Comparing Joyroom T03s Models',
                        content: 'The **T03s** range includes models whose pairing, microphone, controls, battery, and audio features can differ. Compare the documented specifications, current listed price, compatibility, and included accessories on each product page before choosing.'
                    },
                    {
                        heading: 'Compatibility and Operating Instructions',
                        content: 'Smart IC features, cell chemistry, and supported charging standards vary between Joyroom models. Match the device, cable, and charger requirements, follow the operating instructions, and rely only on certifications or protection features documented for the selected model.'
                    }
                ]
            }
        },
        faq: {
            ar: [
                { question: 'كيف أستخدم وسيلة التحقق الموجودة على عبوة جوي روم؟', answer: 'إذا كانت العبوة المؤهلة تحمل ملصقًا أو رمز تحقق، فاتبع الخطوات وعنوان الموقع المطبوعين عليها حرفيًا. قد تختلف وسيلة التحقق حسب الموديل والسوق، ولا يكفي شكل الملصق وحده للحكم على المنتج. احتفظ بفاتورة كايرو فولت وبيانات الطلب للدعم.' },
                { question: 'كيف أقارن سماعات T03s بسماعات أخرى؟', answer: 'قارن الموديل المحدد من حيث التوافق والميكروفون وأسلوب التحكم والبطارية والخصائص الصوتية والملحقات والسعر الحالي. لا تتوفر كل خاصية في جميع موديلات T03s، لذلك اعتمد على مواصفات صفحة المنتج بدل نسبة مقارنة عامة.' },
                { question: 'كيف أستخدم باور بانك جوي روم بصورة مناسبة؟', answer: 'طابق قدرة الإدخال والإخراج والبروتوكول والكابل مع جهازك، واتبع تعليمات التشغيل والتخزين. يختلف نوع الخلايا وخصائص Smart IC والحماية حسب الموديل؛ راجع المواصفات الموثقة ولا تفترض انعدام السخونة أو الانتفاخ في أي بطارية.' },
                { question: 'كيف أختار بين جوي روم وانكر؟', answer: 'قارن الموديلات المتاحة وفق القدرة والمنافذ والبروتوكولات والتوافق والحجم والسعر الحالي ومدة ضمان كايرو فولت وشروطه. يختلف الاختيار الأنسب حسب الجهاز والاستخدام والميزانية، ولا توجد إجابة واحدة مناسبة للجميع.' },
                { question: 'ما مدة ضمان جوي روم وماذا يشمل؟', answer: 'توضح صفحة كل منتج مدة ضمان كايرو فولت وتغطيته والاستثناءات؛ ولا تنطبق مدة أو وسيلة معالجة واحدة على جميع الموديلات. تواصل عبر واتساب مع رقم الطلب ووصف المشكلة لتقييم الحالة وفق الشروط المنشورة.' }
            ],
            en: [
                { question: 'How do I use a verification method shown on Joyroom packaging?', answer: 'If eligible packaging includes a verification label or code, follow the exact steps and website address printed on it. The available method can vary by model and market, and the appearance of a label alone is not conclusive. Keep your CairoVolt invoice and order details for support.' },
                { question: 'How should I compare T03s earbuds with other earbuds?', answer: 'Compare the specific model’s compatibility, microphone, controls, battery, documented audio features, included accessories, and current listed price. Features are not identical across all T03s models, so use the product specifications instead of a general percentage comparison.' },
                { question: 'How should I use a Joyroom power bank with my phone?', answer: 'Match the input, output, protocol, and cable to your device, and follow the operating and storage instructions. Cell chemistry, Smart IC functions, and protection features vary by model; check the documented specifications and do not assume any battery has zero heat or swelling risk.' },
                { question: 'How do I choose between Joyroom and Anker?', answer: 'Compare available models by output, ports, protocols, compatibility, size, current listed price, and the stated CairoVolt warranty period and conditions. The suitable choice depends on your device, use, and budget rather than one brand being universally better.' },
                { question: 'What does the Joyroom warranty cover?', answer: 'Each product page states the applicable CairoVolt store-warranty period, coverage, and exclusions; one duration or remedy does not apply to every model. Contact WhatsApp with your order number and issue details for assessment under the published terms.' }
            ]
        },
        quickAnswer: {
            en: 'CairoVolt lists Joyroom earbuds, power banks, chargers, cables, watches, and car accessories in Egypt. Price and stock are live on each product page; specifications, packaging verification options, compatibility, and CairoVolt warranty terms vary by model.',
            ar: 'تعرض كايرو فولت سماعات وباور بانك وشواحن وكابلات وساعات وإكسسوارات سيارة من جوي روم في مصر. يظهر السعر والمخزون الحاليان في صفحة كل منتج، وتختلف المواصفات ووسائل التحقق عبر العبوة والتوافق وشروط ضمان كايرو فولت حسب الموديل.'
        }
    }
};
