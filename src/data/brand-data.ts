
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
    // NEW: About Section for SEO
    aboutSection?: {
        title: { en: string; ar: string };
        history: { en: string; ar: string };
        achievements: Array<{ icon: string; stat: { en: string; ar: string }; label: { en: string; ar: string } }>;
        technologies: Array<{ name: string; description: { en: string; ar: string } }>;
    };
    // NEW: Trust Badges for Social Proof
    trustBadges?: Array<{
        icon: string;
        title: { en: string; ar: string };
        description: { en: string; ar: string };
    }>;
    metadata: {
        en: { title: string; description: string; keywords: string; openGraph?: any };
        ar: { title: string; description: string; keywords: string; openGraph?: any };
    };
    seoArticle?: {
        en: { title: string; sections: Array<{ heading: string; content: string }> };
        ar: { title: string; sections: Array<{ heading: string; content: string }> };
    };
    faq?: {
        en: Array<{ question: string; answer: string }>;
        ar: Array<{ question: string; answer: string }>;
    };
    sgeSummary?: {
        en: string;
        ar: string;
    };
}


export const brandData: Record<string, BrandData> = {
    anker: {
        id: 'anker',
        hero: {
            bgGradient: 'from-blue-600 via-blue-700 to-blue-900',
            badge: { en: "World's #1 Charging Authority", ar: 'القوة المطلقة - رقم 1 عالمياً' },
            title: 'Anker Egypt',
            description: {
                en: 'Experience the future of charging with Anker GaNPrime™ and PowerIQ 4.0. The only brand fully optimized for iPhone 17 & Samsung S26 AI features. Official Warranty.',
                ar: 'اختبر مستقبل الشحن مع تقنيات Anker GaNPrime™ و PowerIQ 4.0. العلامة التجارية الوحيدة المجهزة بالكامل لذكاء هواتف 2026. ضمان الوكيل الرسمي.'
            },
            features: [
                { en: 'Official Agent Warranty (18 Months)', ar: 'ضمان الوكيل (18 شهر استبدال)' },
                { en: 'ActiveShield™ 2.0 Safety', ar: 'حماية نشطة ActiveShield™ 2.0' },
                { en: 'GaNPrime™ Technology', ar: 'تكنولوجيا GaNPrime™ المتطورة' }
            ]
        },
        categories: [
            { title: { en: 'Anker Power Banks', ar: 'باور بانك انكر' }, description: { en: 'PowerCore 10000 & 20000mAh', ar: 'شحن ذكي و سعات ضخمة' }, href: '/Anker/power-banks', icon: 'bolt', volume: { en: '2,900+ searches/mo', ar: '2,900+ بحث/شهر' } },
            { title: { en: 'Anker Chargers', ar: 'شواحن انكر (Wall)' }, description: { en: 'Nano 20W, 30W & 45W', ar: 'شواحن Nano وسرعات 45W' }, href: '/Anker/wall-chargers', icon: 'plug', volume: { en: '2,900+ searches/mo', ar: '2,900+ بحث/شهر' } },
            { title: { en: 'Soundcore Earbuds', ar: 'سماعات Soundcore' }, description: { en: 'Liberty 4, P40i, R50i', ar: 'عزل ضوضاء وصوت Hi-Res' }, href: '/Anker/audio', icon: 'headphones', volume: { en: '3,600+ searches/mo', ar: '3,600+ بحث/شهر' } },
            { title: { en: 'Soundcore Speakers', ar: 'مكبرات صوت (Speakers)' }, description: { en: 'Motion+, Flare 2, Boom 2', ar: 'صوت 360 درجة وحفلات' }, href: '/Anker/speakers', icon: 'speaker', volume: { en: 'Trending', ar: 'تريندينج' }, badge: { en: 'Best Audio', ar: 'صوت نقي' } },
            { title: { en: 'Anker Cables', ar: 'كابلات انكر (Strong)' }, description: { en: 'PowerLine III Flow & USB-C', ar: 'كابلات ضد القطع (Lifetime)' }, href: '/Anker/cables', icon: 'link', volume: { en: '320+ searches/mo', ar: '320+ بحث/شهر' } },
            { title: { en: 'Anker Car Chargers', ar: 'شواحن سيارة' }, description: { en: 'PowerDrive Alloy', ar: 'شحن سريع في الطريق' }, href: '/Anker/car-chargers', icon: 'car', volume: { en: '260+ searches/mo', ar: '260+ بحث/شهر' } },
        ],
        whySection: {
            title: { en: 'Why Anker is the G.O.A.T?', ar: 'لماذا Anker هي الأفضل عالمياً؟' },
            items: [
                { icon: 'globe', title: { en: '#1 Global Leader', ar: 'الأولى عالمياً بلا منازع' }, description: { en: 'Dominated the charging market since 2011', ar: 'تسيطر على سوق الشحن منذ 2011' } },
                { icon: 'brain', title: { en: 'AI PowerIQ 4.0', ar: 'ذكاء اصطناعي PowerIQ 4.0' }, description: { en: 'Adapts power to your device\'s needs', ar: 'يتكيف مع احتياج هاتفك لحظياً' } },
                { icon: 'shield', title: { en: 'ActiveShield™ 2.0', ar: 'درع الحماية النشط 2.0' }, description: { en: 'Checks temperature 3m times/day', ar: 'يراقب الحرارة 3 مليون مرة يومياً' } },
                { icon: 'handshake', title: { en: 'Local Warranty', ar: 'ضمان محلي حقيقي' }, description: { en: '18 Months Instant Exchange', ar: 'استبدال فوري لمدة 18 شهر' } },
            ]
        },
        // NEW: Comprehensive About Section for SEO
        aboutSection: {
            title: {
                en: 'About Anker: The World\'s #1 Mobile Charging Brand',
                ar: 'عن انكر: العلامة التجارية الأولى عالمياً في شحن الهواتف'
            },
            history: {
                en: 'Founded in 2011 by former Google engineer Steven Yang in Shenzhen, China, Anker Innovations began with a mission to make charging smarter, faster, and safer. What started as a small online battery replacement company quickly evolved into the world\'s leading mobile charging brand. Today, Anker powers over 200 million devices worldwide and operates in 100+ countries. The company\'s commitment to R&D excellence has resulted in groundbreaking technologies like GaNPrime™, PowerIQ, and ActiveShield™ that have redefined the charging industry.',
                ar: 'تأسست انكر عام 2011 على يد مهندس جوجل السابق ستيفن يانج في شنزن بالصين، وبدأت برسالة واضحة: جعل الشحن أذكى وأسرع وأكثر أماناً. ما بدأ كشركة صغيرة لبطاريات الاستبدال تحول بسرعة إلى العلامة التجارية الرائدة عالمياً في شحن الهواتف. اليوم، انكر تشحن أكثر من 200 مليون جهاز حول العالم وتعمل في أكثر من 100 دولة. التزام الشركة بالتميز البحثي أنتج تقنيات ثورية مثل GaNPrime™ و PowerIQ و ActiveShield™ التي أعادت تعريف صناعة الشحن.'
            },
            achievements: [
                { icon: 'trophy', stat: { en: '200M+', ar: '+200 مليون' }, label: { en: 'Devices Powered Globally', ar: 'جهاز يعمل بشحن انكر' } },
                { icon: 'globe', stat: { en: '100+', ar: '+100' }, label: { en: 'Countries & Markets', ar: 'دولة وسوق عالمي' } },
                { icon: 'star', stat: { en: '4.8/5', ar: '4.8/5' }, label: { en: 'Average Customer Rating', ar: 'متوسط تقييم العملاء' } },
                { icon: 'microscope', stat: { en: '1000+', ar: '+1000' }, label: { en: 'Patents & Innovations', ar: 'براءة اختراع وابتكار' } },
                { icon: 'calendar', stat: { en: '2011', ar: '2011' }, label: { en: 'Year Founded', ar: 'سنة التأسيس' } },
                { icon: 'medal', stat: { en: '#1', ar: 'رقم 1' }, label: { en: 'Amazon Charging Brand Since 2015', ar: 'ماركة الشحن الأولى على أمازون' } }
            ],
            technologies: [
                { name: 'GaNPrime™', description: { en: 'Gallium Nitride technology that makes chargers 50% smaller yet 3x more powerful. Charges laptops and phones simultaneously.', ar: 'تقنية نيتريد الجاليوم التي تجعل الشواحن أصغر بـ 50% مع قوة أكبر 3 مرات. تشحن اللابتوب والهاتف معاً.' } },
                { name: 'PowerIQ 4.0', description: { en: 'AI-powered intelligent charging that detects your device type and delivers optimal power (PD 3.1, QC 4+, PPS).', ar: 'شحن ذكي بالذكاء الاصطناعي يتعرف على نوع جهازك ويوصل الطاقة المثالية (PD 3.1, QC 4+, PPS).' } },
                { name: 'ActiveShield™ 2.0', description: { en: 'Monitors temperature 3 million times per day to prevent overheating and protect your device\'s battery health.', ar: 'يراقب درجة الحرارة 3 مليون مرة يومياً لمنع السخونة الزائدة وحماية صحة بطارية جهازك.' } },
                { name: 'PowerLine III Flow', description: { en: 'Ultra-durable cables with 25,000 bend lifespan and liquid silicone feel. No tangling, ever.', ar: 'كابلات فائقة المتانة تتحمل 25,000 ثني بملمس السيليكون السائل. لا تتشابك أبداً.' } },
                { name: 'MagSafe Compatible', description: { en: 'Full ecosystem of magnetic wireless chargers and power banks for iPhone 12-17 series.', ar: 'منظومة كاملة من الشواحن اللاسلكية المغناطيسية وباور بانك لسلسلة آيفون 12-17.' } }
            ]
        },
        // NEW: Trust Badges for Social Proof
        trustBadges: [
            { icon: 'check-circle', title: { en: '100% Original Products', ar: 'منتجات أصلية 100%' }, description: { en: 'Verified by Anker Egypt', ar: 'موثقة من انكر مصر' } },
            { icon: 'shield', title: { en: '18-Month Warranty', ar: 'ضمان 18 شهر' }, description: { en: 'Instant replacement', ar: 'استبدال فوري' } },
            { icon: 'coin', title: { en: 'Best Price Guarantee', ar: 'ضمان أقل سعر' }, description: { en: 'vs Amazon & Noon', ar: 'مقارنة بأمازون ونون' } },
            { icon: 'truck', title: { en: 'Fast Egypt Delivery', ar: 'توصيل سريع لمصر' }, description: { en: '24-48 hours', ar: '24-48 ساعة' } },
            { icon: 'star', title: { en: '5000+ Happy Customers', ar: '+5000 عميل سعيد' }, description: { en: 'Verified purchases', ar: 'مشتريات موثقة' } },
            { icon: 'call', title: { en: 'WhatsApp Support', ar: 'دعم واتساب' }, description: { en: '24/7 assistance', ar: 'مساعدة على مدار الساعة' } }
        ],
        metadata: {
            en: {
                title: 'Anker Egypt Official | #1 Charging Brand | Power Banks & Soundcore',
                description: 'The Official Anker Egypt Destination. Shop Anker GaNPrime Chargers, Prime Power Banks, and Soundcore Liberty 4. 100% Original with 18-Month Warranty.',
                keywords: 'anker egypt, anker power bank, anker ganprime, soundcore liberty 4, anker iphone 17 charger, anker samsung s26 charger, best power bank 2026',
            },
            ar: {
                title: 'Anker Egypt | انكر مصر - الوكيل الرسمي (باور بانك & Soundcore)',
                description: 'موقع انكر مصر الرسمي. تسوق منتجات Anker الأصلية: باور بانك Prime، شواحن Nano، وسماعات Soundcore. ضمان الوكيل 18 شهر استبدال فوري.',
                keywords: 'انكر مصر, توكيل انكر, صيانة انكر, باور بانك انكر 2026, سماعات ساوند كور, شاحن ايفون 17, شاحن سامسونج سريع',
            }
        },
        seoArticle: {
            ar: {
                title: 'أنكر مصر: عندما تجتمع القوة مع الذكاء الاصطناعي',
                sections: [
                    {
                        heading: 'لماذا تعتبر Anker الخيار الأول في مصر؟',
                        content: 'منذ دخولها السوق المصري، غيرت Anker مفهوم "الشحن" من مجرد ملحق إضافي إلى تقنية أساسية تعتمد عليها حياتك اليومية. بفضل تقنيات مثل **PowerIQ 4.0** التي تتعرف على نوع هاتفك (سواء كان iPhone 17 أو Samsung S26) وتعطيه الفولت المناسب بالضبط، أصبحت انكر "صديقة البطارية" الأولى.'
                    },
                    {
                        heading: 'ضمان الوكيل: استثمار آمن 100%',
                        content: 'شراء منتج Anker الأصلي يعني حصولك على ضمان استبدال فوري لمدة 18 شهراً. لا مزيد من القلق بشأن المنتجات المقلدة التي تضر بجهازك. نحن نضمن لك راحة البال، وجودة التصنيع، وتقنية **ActiveShield 2.0** التي تراقب حرارة الشاحن 3 مليون مرة يومياً.'
                    }
                ]
            },
            en: {
                title: 'Anker Egypt: Powering the AI Generation',
                sections: [
                    {
                        heading: 'Why Anker Leads the Egyptian Market?',
                        content: 'Anker isn’t just about cables and bricks; it’s about intelligent energy. With the launch of **GaNPrime™**, Anker chargers are now 50% smaller yet 3x faster, capable of charging laptops, phones, and earbuds simultaneously. It is the definitive choice for the modern tech enthusiast in Cairo and Alexandria.'
                    },
                    {
                        heading: 'Safety First: The ActiveShield™ Promise',
                        content: 'Your expensive devices need premium protection. Anker’s proprietary **ActiveShield™ 2.0** technology monitors temperature 3,000,000 times per day to prevent overheating. Combined with our 18-month official warranty, investing in Anker is investing in the longevity of your electronics.'
                    }
                ]
            }
        },
        faq: {
            ar: [
                { question: 'كيف أتأكد أن منتج انكر أصلي 100%؟', answer: 'ابحث دائماً عن "العلامة المائية الثلاثية" (Hologram) الخاصة بالوكيل على العلبة. يمكنك أيضاً مسح QR Code الموجود للتحقق عبر موقع انكر الرسمي. نحن في Cairo Volt نضمن لك منتجات أصلية 100% مع ضمان استبدال فوري.' },
                { question: 'ما الفرق بين ضمان أنكر في Cairo Volt وأمازون/نون؟', answer: 'في المتاجر العامة (Marketplaces)، الضمان يعتمد على البائع وقد يكون 14 يوماً فقط. أما في Cairo Volt، بصفتنا موزع معتمد، نقدم "ضمان الوكيل الرسمي" لمدة 18 شهراً. إذا حدث أي عيب صناعة، نستبدل المنتج بجديد فوراً، وليس صيانة.' },
                { question: 'ما هو الفرق بين تقنية PowerIQ و PD (Power Delivery)؟', answer: 'تقنية **PD** هي معيار عالمي للشحن السريع (للآيفون واللابتوب). أما **PowerIQ** فهي تقنية حصرية لـ Anker تتعرف بذكاء على نوع جهازك (سواء سامسونج، آيفون، أو سماعة) وتعطيه أقصى سرعة آمنة له. شواحن Anker الجديدة تدمج الاثنين معاً!' },
                { question: 'هل شواحن انكر تضر ببطارية الايفون (Battery Health)؟', answer: 'على العكس تماماً! شواحن انكر تأتي بتقنية **ActiveShield 2.0** التي تراقب الحرارة 3 مليون مرة يومياً لتمنع السخونة التي تضر البطارية. كما أنها حاصلة على شهادة MFi من آبل، مما يعني أنها آمنة تماماً مثل الشاحن الأصلي وأحياناً أفضل تبريداً.' },
                { question: 'أيهما أفضل: Anker أم Joyroom؟', answer: 'إذا كنت تبحث عن "أعلى أداء وتكنولوجيا في العالم" وتدفع مقابل الاستدامة، فـ **Anker** هي الأفضل (استثمار طويل الأمد). أما إذا كنت تريد "أفضل قيمة مقابل سعر" ومواصفات ممتازة بميزانية اقتصادية، فـ **Joyroom** هي الخيار الذكي. كلاهما أصلي ومضمون لدينا.' },
                { question: 'أين يوجد مركز صيانة انكر المعتمد في مصر؟', answer: 'لا داعي للبحث عن "مركز صيانة"! سياسة الضمان لدينا هي "الاستبدال الفوري". إذا واجهت مشكلة خلال 18 شهراً، تواصل معنا عبر واتساب وسنقوم باستبدال المنتج لك من خلال فروعنا أو الشحن.' }
            ],
            en: [
                { question: 'How can I be 100% sure the Anker product is original?', answer: 'Always look for the official distributor\'s Hologram sticker on the box. You can also scan the QR Code verification label. At Cairo Volt, we guarantee 100% authentic products with a direct replacement warranty.' },
                { question: 'What is the difference between warranty at Cairo Volt vs Amazon/Noon?', answer: 'On marketplaces, warranty depends on the individual seller and is often just 14 days return. At Cairo Volt, as an authorized distributor, we offer the official "18-Month Agent Warranty". If there is a defect, we replace it instantly with a new one—no repairs.' },
                { question: 'What is the difference between PowerIQ and PD (Power Delivery)?', answer: '**PD** is a universal fast-charging standard (common for iPhone/Laptops). **PowerIQ** is Anker\'s proprietary AI technology that intelligently identifies your device (Samsung, iPhone, or Earbuds) and delivers the safest max speed. New Anker chargers combine both!' },
                { question: 'Do Anker chargers damage iPhone Battery Health?', answer: 'Quite the opposite! Anker chargers feature **ActiveShield 2.0** technology which monitors temperature 3 million times/day to prevent heat that damages batteries. They are also MFi Certified, making them just as safe (often cooler running) than original Apple chargers.' },
                { question: 'Which is better: Anker or Joyroom?', answer: 'If you want "World Class Performance" and long-term durability, **Anker** is the G.O.A.T investment. If you want "Best Value for Money" and great features on a budget, **Joyroom** is the smart choice. Both are 100% original and guaranteed at Cairo Volt.' },
                { question: 'Where is the authorized Anker Service Center in Egypt?', answer: 'No need to search for a repair center! Our policy is "Instant Replacement". If you face any issue within 18 months, contact us via WhatsApp and we will replace the unit securely.' }
            ]
        },
        sgeSummary: {
            en: 'Anker is the world\'s #1 charging brand, available in Egypt via Cairo Volt with 18-month replacement warranty. Best sellers: PowerCore 20000mAh (EGP 1,054), 20W charger (EGP 379), Soundcore P40i earbuds (EGP 1,650). All products are 100% original with GaN technology.',
            ar: 'أنكر هي العلامة التجارية الأولى عالمياً في الشحن، متوفرة في مصر عبر كايرو فولت بضمان 18 شهر استبدال فوري. الأكثر مبيعاً: باور بانك 20000mAh (1,054 ج)، شاحن 20W (379 ج)، سماعات P40i (1,650 ج). كل المنتجات أصلية 100% بتقنية GaN.'
        }
    },
    joyroom: {
        id: 'joyroom',
        hero: {
            bgGradient: 'from-red-600 via-red-700 to-red-900',
            badge: { en: 'Joyroom: The Budget King 2026', ar: 'جوي روم: ملك التوفير 2026' },
            title: 'Joyroom Egypt',
            description: {
                en: 'Smart Tech at Student Prices. Home of the Legendary T03s and Safe-Charging Power Banks. 100% Original with Golden Code Verification.',
                ar: 'تكنولوجيا ذكية بأسعار طلابية. بيت أسطورة الـ T03s والباور بانك الآمن. منتجات أصلية 100% مع ضمان الكود الذهبي.'
            },
            features: [
                { en: 'Golden Code Verified', ar: 'موثقة بالكود الذهبي' },
                { en: 'Direct Replacement Warranty', ar: 'ضمان استبدال فوري' },
                { en: 'Best Value for Money', ar: 'أفضل قيمة مقابل سعر' }
            ],
            heroProduct: {
                label: { en: 'The Legend:', ar: 'الأسطورة:' },
                link: { href: '/Joyroom/audio', text: { en: 'Joyroom T03s - The AirPods Alternative', ar: 'Joyroom T03s - البديل الاستراتيجي للايربودز' } }
            }
        },
        categories: [
            { title: { en: 'T03s Earbuds', ar: 'سماعات T03s' }, description: { en: 'The Market Legend', ar: 'أسطورة السوق المصري' }, href: '/Joyroom/audio', icon: 'headphones', volume: { en: '15,000+ sold', ar: '15,000+ مباعة' }, badge: { en: 'Legend', ar: 'أسطورة' } },
            { title: { en: 'Joyroom Power Banks', ar: 'باور بانك جوي روم' }, description: { en: 'Grade A+ Cells (Safe)', ar: 'خلايا Grade A+ (آمنة)' }, href: '/Joyroom/power-banks', icon: 'bolt', volume: { en: 'High Demand', ar: 'طلب عالي' } },
            { title: { en: 'Joyroom Chargers', ar: 'شواحن جوي روم' }, description: { en: 'Smart IC Protection', ar: 'حماية Smart IC' }, href: '/Joyroom/wall-chargers', icon: 'plug', volume: { en: 'Essential', ar: 'أساسي' } },
            { title: { en: 'Joyroom Cables', ar: 'كابلات جوي روم' }, description: { en: 'Auto-Disconnect Tech', ar: 'تقنية الفصل التلقائي' }, href: '/Joyroom/cables', icon: 'link', volume: { en: 'Durable', ar: 'معمر' } },
            { title: { en: 'Joyroom Smart Watches', ar: 'ساعات جوي روم' }, description: { en: 'FT3 Pro & Fit-Life', ar: 'FT3 Pro و Fit-Life' }, href: '/Joyroom/smart-watches', icon: 'watch', volume: { en: 'Trending', ar: 'تريندينج' }, badge: { en: 'Hot', ar: 'رائج' } },
            { title: { en: 'Car Holders', ar: 'حوامل سيارة' }, description: { en: 'Strong Magnets', ar: 'مغناطيس قوي جداً' }, href: '/Joyroom/car-holders', icon: 'compass', volume: { en: 'New', ar: 'جديد' } },
        ],
        whySection: {
            title: { en: 'Why Choose Joyroom?', ar: 'لماذا تختار Joyroom؟' },
            items: [
                { icon: 'coin', title: { en: 'Budget King', ar: 'ملك التوفير' }, description: { en: 'Flagship features at 1/4 price', ar: 'مواصفات الفلاجشيب بربع الثمن' } },
                { icon: 'sparkles', title: { en: 'Premium Design', ar: 'تصميم بريميوم' }, description: { en: 'Looks and feels expensive', ar: 'شكل وملمس غالي' } },
                { icon: 'shield', title: { en: 'Golden Code', ar: 'الكود الذهبي' }, description: { en: 'Anti-Fake verification system', ar: 'نظام حماية من التقليد' } },
                { icon: 'headphones', title: { en: 'The T03s Legacy', ar: 'إرث T03s' }, description: { en: 'Most trusted earbuds in Egypt', ar: 'السماعة الأكثر ثقة في مصر' } },
            ]
        },
        // NEW: About Section for Joyroom SEO
        aboutSection: {
            title: {
                en: 'Joyroom: Smart Technology at Smart Prices Since 2009',
                ar: 'جوي روم: تكنولوجيا ذكية بأسعار ذكية منذ 2009'
            },
            history: {
                en: 'Founded in 2009 in Shenzhen, China, Joyroom has grown from a small electronics manufacturer to one of the world\'s most trusted consumer electronics brands. With a mission to make quality technology accessible to everyone, Joyroom designs products that deliver 90% of flagship features at 25% of the price. Today, Joyroom is sold in over 100 countries, with the legendary T03s earbuds becoming Egypt\'s best-selling AirPods alternative. From power banks with Grade A+ cells to braided cables with 10,000+ bend lifespan, every Joyroom product undergoes rigorous quality testing.',
                ar: 'تأسست جوي روم عام 2009 في شينزين بالصين، ونمت من مصنع إلكترونيات صغير لتصبح واحدة من أكثر العلامات التجارية موثوقية في العالم. مهمتها جعل التكنولوجيا الجيدة في متناول الجميع، فتصمم منتجات تقدم 90% من مواصفات الفلاجشيب بـ 25% من السعر. اليوم تُباع جوي روم في أكثر من 100 دولة، وأصبحت سماعات T03s الأسطورية البديل الأول للايربودز في مصر. من الباور بانك بخلايا Grade A+ للكابلات المجدولة بعمر 10,000+ ثنية، كل منتج يخضع لاختبارات صارمة.'
            },
            achievements: [
                { icon: 'globe', stat: { en: '100+', ar: '+100' }, label: { en: 'Countries', ar: 'دولة' } },
                { icon: 'star', stat: { en: '4.7/5', ar: '4.7/5' }, label: { en: 'Average Rating', ar: 'متوسط التقييم' } },
                { icon: 'package', stat: { en: '50M+', ar: '+50 مليون' }, label: { en: 'Units Sold', ar: 'وحدة مباعة' } },
                { icon: 'headphones', stat: { en: '#1', ar: 'رقم 1' }, label: { en: 'Budget Earbuds', ar: 'سماعات اقتصادية' } },
                { icon: 'factory', stat: { en: '2009', ar: '2009' }, label: { en: 'Year Founded', ar: 'سنة التأسيس' } },
                { icon: 'battery', stat: { en: 'Grade A+', ar: 'Grade A+' }, label: { en: 'Battery Cells', ar: 'خلايا بطارية' } }
            ],
            technologies: [
                { name: 'Golden Code Verification', description: { en: 'Every Joyroom product has a unique scratch-off QR code on the box. Scan it to verify authenticity instantly on the official website. No more worrying about fakes!', ar: 'كل منتج جوي روم له كود QR فريد على العلبة. امسحه للتحقق فوراً من الموقع الرسمي. لا مزيد من القلق بشأن المقلد!' } },
                { name: 'Smart IC Protection', description: { en: 'Intelligent charging circuit that prevents overcharging, overheating, and short circuits. Your expensive phone is always safe with Joyroom chargers.', ar: 'دائرة شحن ذكية تمنع الشحن الزائد والسخونة والماس الكهربائي. موبايلك الغالي دائماً آمن مع شواحن جوي روم.' } },
                { name: 'Grade A+ Li-Polymer Cells', description: { en: 'Power banks use premium lithium-polymer cells (not lithium-ion) for safer operation, longer lifespan, and zero swelling risk. Same cells used in premium brands.', ar: 'الباور بانك يستخدم خلايا ليثيوم بوليمر ممتازة (ليس ليثيوم أيون) لتشغيل أكثر أماناً وعمر أطول وصفر خطر انتفاخ. نفس الخلايا في الماركات الـ premium.' } },
                { name: 'Braided Durability Tech', description: { en: 'Cables feature double-braided nylon shielding and reinforced stress points. Tested to withstand 10,000+ bends without breaking. Outlasts regular cables 5x.', ar: 'الكابلات مغطاة بنايلون مجدول مزدوج ونقاط توتر معززة. مختبرة لتحمل 10,000+ ثنية بدون كسر. تعيش 5 أضعاف الكابل العادي.' } }
            ]
        },
        // NEW: Trust Badges for Joyroom
        trustBadges: [
            { icon: 'lock', title: { en: 'Golden Code', ar: 'الكود الذهبي' }, description: { en: 'Anti-fake verified', ar: 'ضد التقليد' } },
            { icon: 'shield', title: { en: '12-Month Warranty', ar: 'ضمان 12 شهر' }, description: { en: 'Direct replacement', ar: 'استبدال مباشر' } },
            { icon: 'battery', title: { en: 'Grade A+ Cells', ar: 'خلايا A+' }, description: { en: 'Safe batteries', ar: 'بطاريات آمنة' } },
            { icon: 'coin', title: { en: 'Best Value', ar: 'أفضل قيمة' }, description: { en: '90% features, 25% price', ar: '90% مواصفات، 25% سعر' } },
            { icon: 'phone', title: { en: 'Universal', ar: 'عالمي' }, description: { en: 'iOS + Android', ar: 'ايفون + اندرويد' } },
            { icon: 'call', title: { en: 'WhatsApp Support', ar: 'دعم واتساب' }, description: { en: '24/7 help', ar: 'مساعدة 24/7' } }
        ],
        metadata: {
            en: {
                title: 'Joyroom Egypt | The Budget King | T03s & Power Banks',
                description: 'The Official Joyroom Egypt Collection. Home of the Legendary T03s Earbuds and Safe Power Banks. 100% Original with Golden Code verification.',
                keywords: 'joyroom egypt, joyroom t03s original, buy joyroom t03s, joyroom power bank grade a, best budget earbuds 2026, cheap iphone charger',
            },
            ar: {
                title: 'Joyroom Egypt | جوي روم مصر - ملك التوفير (T03s الأصلية)',
                description: 'متجر جوي روم مصر المعتمد. احصل على سماعات T03s الأسطورية، وباور بانك آمن ببطاريات Grade A+. تأكد من أصالة المنتج بالكود الذهبي.',
                keywords: 'جوي روم الاصلي, سماعة t03s, سعر t03s في مصر, كيفية معرفة جوي روم الاصلي, باور بانك رخيص وامن, اكسسوارات موبايل 2026',
            }
        },
        seoArticle: {
            ar: {
                title: 'جوي روم مصر: معادلة الجودة والسعر المستحيلة',
                sections: [
                    {
                        heading: 'لماذا يلقبونها بـ "آبل الغلابة"؟',
                        content: 'استطاعت جوي روم (Joyroom) أن تكتسح السوق المصري بمنتج واحد أسطوري: **T03s**. هذه السماعة قدمت تجربة الايربودز (فتح العلبة، العزل، نقاء الصوت) ولكن بربع الثمن. هي ليست مجرد سماعة رخيصة، هي "استثمار ذكي" لكل طالب أو موظف يريد التكنولوجيا بدون دفع مبالغ طائلة.'
                    },
                    {
                        heading: 'خدعوك فقالوا: رخيص يعني سيء!',
                        content: 'في عالم الشواحن، السعر الرخيص قد يخيفك. لكن جوي روم كسرت هذه القاعدة باستخدام تقنيات الحماية الذكية (Smart IC) وبطاريات **Lithium-Polymer Grade A+** في الباور بانك. منتجاتنا آمنة تماماً على الهواتف الغالية (ايفون و سامسونج) وحاصلة على شهادات الجودة العالمية.'
                    }
                ]
            },
            en: {
                title: 'Joyroom Egypt: The Smartest Budget Choice',
                sections: [
                    {
                        heading: 'The Legend of T03s',
                        content: 'Joyroom dominated the Egyptian market with a simple promise: High-end features for a budget price. The **T03s** Series offers the full "AirPods Experience" (Pop-up pairing, ANC, spatial audio) at a fraction of the cost, making it the #1 choice for students and smart shoppers.'
                    },
                    {
                        heading: 'Safety Without the Price Tag',
                        content: 'Don\'t let the price fool you. Joyroom power banks utilize **Grade A+ Li-Polymer cells** that prevent overheating and swelling. Our chargers feature auto-disconnect technology to protect your battery health. It is "Budget" done right.'
                    }
                ]
            }
        },
        faq: {
            ar: [
                { question: 'ما هو الكود الذهبي وكيف أتأكد أن المنتج أصلي؟', answer: 'الكود الذهبي هو نظام تحقق حصري لجوي روم. كل علبة أصلية تحتوي على ستيكر فضي على الظهر. اكشط الطبقة الفضية → امسح الـ QR Code → سيأخذك للموقع الرسمي ويؤكد أصالة المنتج. إذا لم يظهر التأكيد = المنتج مقلد! اشترِ فقط من موزعين معتمدين.' },
                { question: 'هل سماعات T03s أفضل من AirPods؟', answer: 'تعتمد على احتياجك! T03s تقدم 90% من تجربة AirPods (اقتران فوري، صوت نقي، عزل ضوضاء) بـ 25% فقط من السعر. الفرق الأساسي: AirPods أفضل في التكامل مع آيفون وجودة المايك. لكن للصوت والموسيقى، T03s منافس قوي جداً وخيار ذكي ماديًا.' },
                { question: 'هل باور بانك جوي روم آمن على الموبايل؟', answer: 'نعم 100%! جوي روم تستخدم خلايا Lithium-Polymer Grade A+ (ليس Lithium-Ion العادية) وهي أكثر أماناً: لا انتفاخ، لا سخونة زائدة، عمر أطول. بالإضافة لتقنية Smart IC التي توقف الشحن تلقائياً عند الامتلاء. آمنة تماماً على ايفون وسامسونج الغاليين.' },
                { question: 'أيهما أفضل: جوي روم أم انكر؟', answer: 'انكر = الأفضل أداءً والأغلى (استثمار طويل المدى). جوي روم = أفضل قيمة مقابل سعر (ميزانية ذكية). إذا ميزانيتك مفتوحة اختر انكر. إذا تريد وفر واستفيد بمواصفات ممتازة اختر جوي روم. كلاهما أصلي ومضمون من Cairo Volt.' },
                { question: 'ما مدة ضمان جوي روم وماذا يشمل؟', answer: 'ضمان 12 شهر استبدال فوري (ليس صيانة!) ضد عيوب الصناعة. يشمل: تلف مفاجئ، خلل في الصوت/الشحن، مشاكل البطارية. لا يشمل: الكسر الفيزيائي، دخول الماء، سوء الاستخدام. تواصل واتساب وسنستبدل المنتج فوراً.' }
            ],
            en: [
                { question: 'What is the Golden Code and how do I verify authenticity?', answer: 'The Golden Code is Joyroom\'s exclusive verification system. Every original box has a silver sticker on the back. Scratch the silver layer → Scan the QR Code → It takes you to the official website confirming authenticity. If no confirmation = fake product! Buy only from authorized dealers.' },
                { question: 'Are T03s earbuds better than AirPods?', answer: 'Depends on your needs! T03s deliver 90% of the AirPods experience (instant pairing, clear sound, noise isolation) at only 25% of the price. Main difference: AirPods are better at iPhone integration and mic quality. But for music listening, T03s are a strong competitor and a financially smart choice.' },
                { question: 'Is Joyroom power bank safe for my phone?', answer: 'Yes, 100%! Joyroom uses Grade A+ Lithium-Polymer cells (not regular Lithium-Ion) which are safer: no swelling, no overheating, longer lifespan. Plus Smart IC technology that auto-stops charging when full. Completely safe for expensive iPhones and Samsung phones.' },
                { question: 'Which is better: Joyroom or Anker?', answer: 'Anker = Best performance, higher price (long-term investment). Joyroom = Best value for money (smart budget). If budget is not a concern, choose Anker. If you want savings with excellent specs, choose Joyroom. Both are genuine and warranted from Cairo Volt.' },
                { question: 'What does Joyroom warranty cover?', answer: '12-month instant replacement warranty (not repair!) against manufacturing defects. Covers: sudden failure, audio/charging issues, battery problems. Does not cover: physical damage, water damage, misuse. Contact WhatsApp and we\'ll replace the product immediately.' }
            ]
        },
        sgeSummary: {
            en: 'Joyroom is the #1 budget-friendly mobile accessories brand in Egypt. Best sellers: T03s earbuds (EGP 499), 10000mAh power bank (EGP 450), USB-C cable (EGP 149). All products verified with Golden Code authenticity. 12-month replacement warranty via Cairo Volt.',
            ar: 'جوي روم هي الماركة الأولى للإكسسوارات الاقتصادية في مصر. الأكثر مبيعاً: سماعات T03s (499 ج)، باور بانك 10000mAh (450 ج)، كابل USB-C (149 ج). كل المنتجات موثقة بنظام Golden Code. ضمان 12 شهر استبدال من كايرو فولت.'
        }
    }
};
