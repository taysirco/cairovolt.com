
export interface FAQItem {
    question: string;
    answer: string;
}

export interface BuyingGuideSection {
    title: string;
    content: string; // Markdown supported
}

export interface TrustSignal {
    type: 'originality' | 'warranty' | 'expert_verified';
    text: string;
    icon?: string;
}

// NEW: Soundcore-specific data for audio category SEO targeting "ankersoundcore" keyword
export interface SoundcoreData {
    title: { en: string; ar: string };
    tagline: { en: string; ar: string };
    history: { en: string; ar: string };
    achievements: Array<{ icon: string; stat: { en: string; ar: string }; label: { en: string; ar: string } }>;
    technologies: Array<{ name: string; icon: string; description: { en: string; ar: string } }>;
    useCases: Array<{ icon: string; title: { en: string; ar: string }; description: { en: string; ar: string } }>;
    trustBadges: Array<{ icon: string; title: { en: string; ar: string }; description: { en: string; ar: string } }>;
    faq: {
        en: Array<{ question: string; answer: string }>;
        ar: Array<{ question: string; answer: string }>;
    };
}

// NEW: PowerBank-specific data for power-banks category SEO targeting "باور بانك انكر" keyword
export type PowerBankData = SoundcoreData; // Same structure, different content

export interface CategorySeoData {
    brand: 'Anker' | 'Joyroom';
    brandColor: 'blue' | 'red';
    categoryName: string;
    // NEW: Optional Soundcore data for audio category
    soundcoreData?: SoundcoreData;
    // NEW: Optional PowerBank data for power-banks category
    powerBankData?: PowerBankData;
    metadata: {
        en: { title: string; description: string; keywords: string; openGraph?: any };
        ar: { title: string; description: string; keywords: string; openGraph?: any };
    };
    seoContent: {
        ar: {
            title: string;
            subtitle: string;
            description: string;
            buyingGuide?: BuyingGuideSection[];
            faq?: FAQItem[];
            trustSignals?: TrustSignal[];
            products: Array<{ name: string; price: number; badge?: string }>;
        };
        en: {
            title: string;
            subtitle: string;
            description: string;
            buyingGuide?: BuyingGuideSection[];
            faq?: FAQItem[];
            trustSignals?: TrustSignal[];
            products: Array<{ name: string; price: number; badge?: string }>;
        };
    };
}

export const categoryData: Record<string, Record<string, CategorySeoData>> = {
    anker: {
        'power-banks': {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Power Banks',
            // NEW: PowerBank data for "باور بانك انكر" keyword SEO
            powerBankData: {
                title: {
                    en: 'Anker PowerCore: The World\'s #1 Charging Brand Since 2011',
                    ar: 'انكر باور كور: العلامة الأولى عالمياً في الشحن منذ 2011'
                },
                tagline: {
                    en: 'Power for Life',
                    ar: 'طاقة للحياة'
                },
                history: {
                    en: 'Anker was founded in 2011 in California by a team of former Google engineers with a mission to make charging smarter and faster. Today, Anker is the world\'s #1 charging brand with over 200 million users globally and a 40%+ market share in the US and Europe. From the compact Nano series to the powerful Prime lineup that can charge laptops, every Anker PowerCore is built with Grade-A battery cells (the same used in electric vehicles) and backed by our legendary 18-month warranty.',
                    ar: 'تأسست انكر عام 2011 في كاليفورنيا على يد فريق من مهندسي جوجل السابقين بهدف جعل الشحن أذكى وأسرع. اليوم، انكر هي العلامة الأولى عالمياً في الشحن مع أكثر من 200 مليون مستخدم وحصة سوقية تتجاوز 40% في أمريكا وأوروبا. من سلسلة Nano الصغيرة إلى سلسلة Prime القوية التي تشحن اللابتوب، كل باور بانك انكر مصنوع من خلايا بطارية Grade-A (نفس المستخدمة في السيارات الكهربائية) ومدعوم بضمان 18 شهر الأسطوري.'
                },
                achievements: [
                    { icon: 'battery', stat: { en: '200M+', ar: '+200 مليون' }, label: { en: 'Users Worldwide', ar: 'مستخدم حول العالم' } },
                    { icon: 'star', stat: { en: '4.9/5', ar: '4.9/5' }, label: { en: 'Amazon Rating', ar: 'تقييم أمازون' } },
                    { icon: 'trophy', stat: { en: '#1', ar: 'رقم 1' }, label: { en: 'Charging Brand', ar: 'براند شحن' } },
                    { icon: 'shield', stat: { en: '18 mo', ar: '18 شهر' }, label: { en: 'Warranty', ar: 'ضمان' } },
                    { icon: 'bolt', stat: { en: '250W', ar: '250 واط' }, label: { en: 'Max Power', ar: 'أقصى قوة' } },
                    { icon: 'globe', stat: { en: '2011', ar: '2011' }, label: { en: 'Year Founded', ar: 'سنة التأسيس' } }
                ],
                technologies: [
                    { name: 'PowerIQ 4.0', icon: 'brain', description: { en: 'Smart device recognition technology. PowerIQ automatically detects your device (iPhone, Samsung, laptop) and delivers the optimal charging speed safely. No more slow charging or compatibility issues.', ar: 'تقنية تعرف ذكية على الجهاز. PowerIQ يكتشف جهازك تلقائياً (ايفون، سامسونج، لابتوب) ويعطيه أقصى سرعة شحن بأمان. لا مزيد من الشحن البطيء أو مشاكل التوافق.' } },
                    { name: 'GaN II (Gallium Nitride)', icon: 'bolt', description: { en: 'Next-generation semiconductor technology. GaN chargers are 50% smaller than traditional chargers while delivering the same or higher power output. Cooler operation and higher efficiency.', ar: 'تقنية أشباه موصلات الجيل الجديد. شواحن GaN أصغر 50% من الشواحن التقليدية مع نفس القوة أو أعلى. تشغيل أبرد وكفاءة أعلى.' } },
                    { name: 'MultiProtect', icon: 'shield', description: { en: '11-point safety system protecting against: short circuit, over-current, over-voltage, over-temperature, over-charge, over-discharge, and more. Your devices are always safe.', ar: 'نظام أمان من 11 نقطة يحمي من: الماس الكهربائي، التيار الزائد، الفولت الزائد، الحرارة الزائدة، الشحن الزائد، التفريغ الزائد، والمزيد. أجهزتك دائماً آمنة.' } },
                    { name: 'ActiveShield 2.0', icon: 'thermometer', description: { en: 'Intelligent temperature monitoring system. Checks device temperature 3 million times daily and adjusts power delivery to prevent overheating. Safe even during intensive use.', ar: 'نظام مراقبة حرارة ذكي. يفحص حرارة الجهاز 3 مليون مرة يومياً ويعدل الطاقة لمنع السخونة الزائدة. آمن حتى أثناء الاستخدام المكثف.' } },
                    { name: 'Grade-A Battery Cells', icon: 'battery', description: { en: 'The same premium lithium cells used in Tesla and other electric vehicles. 500+ charge cycles (2x the industry average) with minimal capacity degradation.', ar: 'نفس خلايا الليثيوم المميزة المستخدمة في تسلا والسيارات الكهربائية. 500+ دورة شحن (ضعف المتوسط) مع أدنى انخفاض في السعة.' } }
                ],
                useCases: [
                    { icon: 'suitcase', title: { en: 'Travel & Flights', ar: 'سفر ورحلات' }, description: { en: 'Prime 27,650mAh charges your MacBook Pro + iPhone + iPad on long flights. Flight-approved capacity.', ar: 'Prime 27,650mAh يشحن ماك بوك + ايفون + ايباد في الرحلات الطويلة. سعة مصرح بها للطيران.' } },
                    { icon: 'briefcase', title: { en: 'Daily Work', ar: 'عمل يومي' }, description: { en: '10,000mAh pocket-sized power bank. Fits in your pocket, charges your phone 2-3 times. Perfect for busy professionals.', ar: 'باور بانك 10,000 بحجم الجيب. يدخل الجيب ويشحن موبايلك 2-3 مرات. مثالي للمحترفين المشغولين.' } },
                    { icon: 'tent', title: { en: 'Camping & Emergency', ar: 'تخييم وطوارئ' }, description: { en: '60,000mAh PowerCore Reserve for week-long trips or power outages. Can charge phones 10+ times.', ar: 'PowerCore Reserve 60,000 للرحلات الطويلة أو انقطاع الكهرباء. يشحن الموبايل 10+ مرات.' } },
                    { icon: 'phone', title: { en: 'Light Use & Backup', ar: 'استخدام خفيف' }, description: { en: 'Nano 5,000mAh ultra-compact with built-in connector. Emergency backup that\'s always with you.', ar: 'Nano 5,000 صغير جداً بموصل مدمج. شحن طوارئ دائماً معك.' } }
                ],
                trustBadges: [
                    { icon: 'check-circle', title: { en: 'Authorized Dealer', ar: 'وكيل معتمد' }, description: { en: 'Verifiable serial', ar: 'سيريال قابل للتحقق' } },
                    { icon: 'shield', title: { en: '18-Month Warranty', ar: 'ضمان 18 شهر' }, description: { en: 'Instant replacement', ar: 'استبدال فوري' } },
                    { icon: 'battery', title: { en: 'Grade-A Cells', ar: 'خلايا Grade-A' }, description: { en: 'EV-grade batteries', ar: 'بطاريات السيارات الكهربائية' } },
                    { icon: 'shield', title: { en: 'MultiProtect', ar: 'حماية متعددة' }, description: { en: '11 safety points', ar: '11 نقطة أمان' } },
                    { icon: 'star', title: { en: '5000+ Customers', ar: '+5000 عميل' }, description: { en: 'Happy in Egypt', ar: 'سعيد في مصر' } },
                    { icon: 'call', title: { en: 'WhatsApp Support', ar: 'دعم واتساب' }, description: { en: '24/7 assistance', ar: 'مساعدة 24/7' } }
                ],
                faq: {
                    ar: [
                        { question: 'ما الفرق بين باور بانك انكر 10000 و 20000 مللي أمبير؟', answer: '10,000mAh: مثالي للاستخدام اليومي الخفيف. يشحن iPhone 17 Pro مرتين تقريباً، حجم صغير يدخل الجيب. 20,000mAh: الخيار الأفضل للسفر والاستخدام المكثف. يشحن iPhone 17 Pro حوالي 4 مرات، أو يشحن ايباد مرة كاملة. القاعدة: كل 5000mAh = شحنة كاملة تقريباً للموبايل.' },
                        { question: 'هل باور بانك انكر Prime يشحن لابتوب MacBook؟', answer: 'نعم! سلسلة Prime مصممة خصيصاً للابتوب. Prime 27,650mAh بقوة 250W يشحن MacBook Pro 16" من 0 لـ 50% في 30 دقيقة فقط. يمكنه شحن اللابتوب + الموبايل + الايباد في نفس الوقت. تأكد من اختيار Prime وليس PowerCore العادي.' },
                        { question: 'كيف أتأكد أن باور بانك انكر أصلي وليس تقليد؟', answer: 'الطريقة الأضمن: ١) اشترِ من وكيل معتمد (مثلنا). ٢) تحقق من السيريال على موقع anker.com/verify. ٣) المنتج الأصلي يأتي بضمان 18 شهر. ٤) الوزن: المقلد أخف بشكل ملحوظ لأنه يستخدم خلايا رديئة. ٥) جودة البلاستيك والطباعة.' },
                        { question: 'أيهما أفضل باور بانك انكر أم شاومي (Xiaomi)؟', answer: 'انكر تتفوق في: ١) جودة الخلايا (Grade-A vs عادية). ٢) نظام الأمان (MultiProtect 11 نقطة vs أقل). ٣) العمر الافتراضي (500+ دورة vs 300). ٤) الضمان (18 شهر vs 6 أشهر). ٥) تقنية PowerIQ للشحن الذكي. شاومي اقتصادية لكن انكر استثمار طويل المدى.' },
                        { question: 'كم مرة يشحن باور بانك انكر iPhone 17 Pro؟', answer: 'يعتمد على سعة الباور بانك! iPhone 17 Pro بطاريته ~3500mAh. 5,000mAh = 1.2 شحنة. 10,000mAh = 2.5 شحنة. 20,000mAh = 4.5 شحنة. 27,650mAh Prime = 6+ شحنات. ملاحظة: هناك فقدان ~15% أثناء التحويل، لذلك النتيجة الفعلية أقل قليلاً من النظرية.' }
                    ],
                    en: [
                        { question: 'What is the difference between Anker 10000mAh and 20000mAh power bank?', answer: '10,000mAh: Perfect for light daily use. Charges iPhone 17 Pro about 2 times, pocket-sized. 20,000mAh: Best choice for travel and heavy use. Charges iPhone 17 Pro about 4 times, or a full iPad charge. Rule of thumb: every 5000mAh = roughly one full phone charge.' },
                        { question: 'Can Anker Prime power bank charge a MacBook laptop?', answer: 'Yes! The Prime series is specifically designed for laptops. Prime 27,650mAh with 250W output charges MacBook Pro 16" from 0 to 50% in just 30 minutes. It can charge laptop + phone + iPad simultaneously. Make sure to choose Prime, not regular PowerCore.' },
                        { question: 'How can I verify if my Anker power bank is genuine?', answer: 'The safest method: 1) Buy from authorized dealers (like us). 2) Verify serial number at anker.com/verify. 3) Genuine products come with 18-month warranty. 4) Weight: Fakes are noticeably lighter due to inferior cells. 5) Check plastic quality and printing.' },
                        { question: 'Which is better: Anker or Xiaomi power bank?', answer: 'Anker excels in: 1) Cell quality (Grade-A vs standard). 2) Safety system (MultiProtect 11 points vs fewer). 3) Lifespan (500+ cycles vs 300). 4) Warranty (18 months vs 6 months). 5) PowerIQ smart charging technology. Xiaomi is budget-friendly, but Anker is a long-term investment.' },
                        { question: 'How many times can an Anker power bank charge iPhone 17 Pro?', answer: 'Depends on capacity! iPhone 17 Pro battery is ~3500mAh. 5,000mAh = 1.2 charges. 10,000mAh = 2.5 charges. 20,000mAh = 4.5 charges. 27,650mAh Prime = 6+ charges. Note: There\'s ~15% conversion loss, so actual results are slightly lower than theoretical.' }
                    ]
                }
            },
            metadata: {
                en: {
                    title: 'Anker Power Bank Egypt | PowerCore 20000mAh, 10000mAh',
                    description: 'Shop original Anker Power Bank in Egypt. Anker PowerCore 20000mAh, 10000mAh, Prime & 737. Fast charging with official warranty. Best prices.',
                    keywords: 'anker power bank, anker power bank 20000mah, anker powercore, anker prime power bank, anker 737 power bank, power bank egypt',
                },
                ar: {
                    title: 'باور بانك انكر | Anker Power Bank Egypt - أفضل أسعار 2026',
                    description: 'تسوق باور بانك انكر الأصلي في مصر. باور بانك انكر 20000 و 10000 مللي أمبير بأفضل الأسعار. شحن سريع وضمان أصلي.',
                    keywords: 'باور بانك انكر, باور بانك انكر 20000, باور بانك انكر 10000, سعر باور بانك انكر, انكر باور بانك, باور بانك, افضل باور بانك',
                }
            },
            seoContent: {
                ar: {
                    title: 'باور بانك انكر الأصلي في مصر',
                    subtitle: 'Anker Power Bank - الأعلى جودة والأكثر مبيعاً',
                    description: `
      تعتبر **انكر (Anker)** الشركة الرائدة عالمياً في تقنيات الشحن (Charging Tech)، بحصة سوقية تتجاوز 40% في أمريكا وأوروبا. في مصر، تعتبر انكر الخيار الأول للمحترفين بفضل:
      1. **تقنية PowerIQ 4.0:** تتعرف على جهازك (سواء كان ايفون، سامسونج، أو لابتوب) وتعطيه أقصى سرعة يدعمها بأمان.
      2. **خلايا بطارية Grade-A:** نستخدم نفس خلايا البطاريات الموجودة في السيارات الكهربائية لضمان عمر افتراضي يتجاوز 500 دورة شحن (ضعف المتوسط).
      3. **الأمان المطلق:** نظام MultiProtect بـ 11 نقطة أمان يحمي من الماس الكهربائي، السخونة، والشحن الزائد.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'منتجات أصلية 100% (يمكن التحقق من السيريال)' },
                        { type: 'warranty', text: 'ضمان استبدال فوري لمدة 18 شهر' },
                        { type: 'expert_verified', text: 'تم اختباره بواسطة فريقنا الفني' }
                    ],
                    buyingGuide: [
                        {
                            title: 'كيف تختار سعة الباور بانك المناسبة؟',
                            content: `
- **10,000 مللي أمبير:** مثالي للاستخدام اليومي الخفيف. يشحن iPhone 17 Pro مرة ونصف تقريباً. (وزن خفيف، حجم صغير)
- **20,000 مللي أمبير:** الخيار الأفضل للسفر والاستخدام المكثف. يشحن iPhone 17 حوالي 3-4 مرات.
- **27,650 مللي أمبير (سلسلة Prime):** لشحن اللابتوب (MacBook Air/Pro) والايباد (M4/M5) والهواتف معاً بسرعات عالية جداً (250W).
`
                        },
                        {
                            title: 'الفرق بين الإصدارات (Series)',
                            content: `
- **سلسلة 3 (Essential):** جودة ممتازة وسعر اقتصادي.
- **سلسلة 5 (Nano/PowerCore):** سرعات أعلى وتصميمات أنحف، تدعم الشحن السريع للايفون 17.
- **سلسلة Prime (الجيل الجديد):** أحدث تكنولوجيا، شاشات رقمية، وسرعات تصل لـ 250 وات لشحن كل أجهزتك.
`
                        },
                        {
                            title: 'تحذير: كيف تكتشف انكر المقلد؟',
                            content: `
1. **كود التحقق (QR Security):** افحص كود QR الموجود على العلبة عبر موقع anker.com/verify. إذا أعطاك "Authentic"، فهو أصلي.
2. **الوزن وكثافة البطارية:** بطاريات انكر الأصلية تستخدم خلايا LG/Panasonic عالية الكثافة. المقلد غالباً يكون خفيفاً بشكل مريب.
3. **تقنية PowerIQ:** المقلد لا يدعم الشحن الذكي، ستلاحظ بطء شديد في الشحن أو سخونة غير طبيعية.
**نحن في CairoVolt موزع معتمد، ونقدم ضمان استبدال فوري 18 شهر ضد عيوب الصناعة.**
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل باور بانك انكر آمن على بطارية ايفون 17 الجديد؟',
                            answer: 'نعم، وبشكل مطلق. منتجات انكر 2026 تدعم تقنية ActiveShield™ 2.0 و 3.0 التي تراقب درجة حرارة البطارية أكثر من 3 مليون مرة يومياً. بالإضافة لذلك، هي تدعم بروتوكول الشحن المقتصد (Trickle Charging) وسحب الطاقة الذكي الذي يمنع الشحن الزائد، مما يحافظ على صحة البطارية (Health) عند 100% لفترة أطول.'
                        },
                        {
                            question: 'كم مرة يشحن باور بانك 10000 الموبايل؟',
                            answer: 'يعتمد على حجم بطارية هاتفك، ولكن في المتوسط يشحن الايفون العادي (مثل iPhone 16/17) حوالي مرتين، ويشحن هواتف البرو ماكس والألترا مرة ونصف.'
                        },
                        {
                            question: 'ما هو الفرق بين ضمان الوكيل والضمان الدولي؟',
                            answer: 'ضمان الوكيل (الذي نوفره) يضمن لك حق الاستبدال الفوري من داخل مصر في حالة وجود عيب صناعة، بينما الضمان الدولي يتطلب شحن المنتج للخارج.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerCore 20000mAh (iPhone 17 Ready)', price: 1054, badge: 'الأكثر طلباً' },
                        { name: 'Anker Nano 10000mAh', price: 1358, badge: 'حجم صغير' },
                        { name: 'Anker Prime 27650mAh (250W)', price: 3799, badge: 'لأجهزة M5' },
                        { name: 'Anker 737 Power Bank', price: 4274, badge: 'Premium' },
                    ]
                },
                en: {
                    title: 'Anker Power Bank Original in Egypt',
                    subtitle: 'Best Quality & Best Selling',
                    description: `
      Discover the original **Anker Power Bank** collection in Egypt. We offer the best Anker PowerCore models at competitive prices with official warranty.
      
      **Why Choose Anker Power Bank?**
      Anker is the global leader in charging technology, offering solutions that combine speed and safety. With technologies like PowerIQ and GaNPrime, Anker ensures safe charging that preserves your phone's battery life.
    `,
                    trustSignals: [
                        { type: 'originality', text: '100% Original (Verify via Serial)' },
                        { type: 'warranty', text: '18-Month Immediate Replacement Warranty' },
                        { type: 'expert_verified', text: 'Tested by our Technical Team' }
                    ],
                    buyingGuide: [
                        {
                            title: 'How to Choose the Right Capacity?',
                            content: `
- **10,000mAh:** Perfect for daily light use. Charges iPhone 17 approx 1.5 times. (Lightweight, Compact)
- **20,000mAh:** Best choice for travel. Charges iPhone 17 (3-4 times).
- **27,650mAh (Prime Series):** For charging Laptops (MacBook M5), iPads, and Phones together at ultra-high speeds (250W).
`
                        },
                        {
                            title: 'Understanding the Series',
                            content: `
- **Series 3 (Essential / Core):** الجودة المعتادة بسعر اقتصادي. سعة حقيقية وتصميم عملي. (مثال: PowerCore 10000).
- **Series 5 (Nano / MagGo):** تركيز على التصميم النحيف وتقنية المغناطيس (MagSafe). مثالية لمستخدمي iPhone 17/16.
- **Series 7 (Super Fast):** سرعات شحن عالية للابتوب والتابلت. (مثال: Anker 737 بقوة 140 واط).
- **Series Prime (The Flagship):** قمة التكنولوجيا (GaNPrime). شاشات ذكية، تطبيق تحكم عبر البلوتوث، وسرعات تصل لـ 250 واط.
`
                        },
                        {
                            title: 'WARNING: How to Sport Fake Anker?',
                            content: `
1. **Verification Code:** Every original box has a QR code to verify on Anker's official website.
2. **Build Quality:** Originals feel premium and dense; fakes often feel light and cheap.
3. **Ports:** Original ports are precise; fake ones might be loose.
**At CairoVolt, we guarantee 100% original products with official warranty.**
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Is Anker Power Bank safe for iPhone 17?',
                            answer: 'Yes, Anker has updated its ActiveShield™ technology to perfectly match iPhone 17 and Samsung S26 charging protocols ensuring 100% safety.'
                        },
                        {
                            question: 'How many times does a 10000mAh bank charge my phone?',
                            answer: 'On average, it charges a standard iPhone (16/17) about 2 times, and Pro Max/Ultra models about 1.5 times.'
                        },
                        {
                            question: 'Difference between Local Warranty and International?',
                            answer: 'Local Warranty (which we provide) guarantees immediate replacement within Egypt for manufacturing defects, whereas International requires shipping abroad.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerCore 20000mAh (iPhone 17)', price: 1054, badge: 'Best Seller' },
                        { name: 'Anker Nano 10000mAh', price: 1358, badge: 'Compact' },
                        { name: 'Anker Prime 27650mAh (250W)', price: 3799, badge: 'For M5 Chips' },
                        { name: 'Anker 737 Power Bank', price: 4274, badge: 'Flagship' },
                    ]
                }
            }
        },
        'wall-chargers': {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Wall Chargers',
            metadata: {
                en: {
                    title: 'Anker Charger Egypt | From EGP 379 | iPhone 17 & Samsung S26 Fast Charging 2026',
                    description: 'Shop original Anker chargers in Egypt. 20W for iPhone from EGP 379, 25W for Samsung S26, 45W GaN for laptops. ✓ 18-month warranty ✓ Next-day Cairo delivery',
                    keywords: 'anker charger egypt, anker wall charger, anker 20w charger, anker nano charger, anker 25w charger, anker 45w charger, best anker charger iphone 17, anker charger samsung s26, anker gan charger, anker ganprime',
                },
                ar: {
                    title: 'شاحن انكر | من 379 جنيه | شحن سريع ايفون 17 وسامسونج S26 مصر 2026',
                    description: 'تسوق شاحن انكر الأصلي في مصر. 20W للايفون من 379 ج، 25W لسامسونج S26، 45W GaN للابتوب. ✓ ضمان 18 شهر ✓ توصيل القاهرة يوم واحد ✓ دفع عند الاستلام',
                    keywords: 'شاحن انكر, شواحن انكر, راس شاحن انكر, شاحن انكر ايفون, شاحن انكر 20 وات, شاحن انكر 25 واط, شاحن انكر تايب سي, شاحن انكر سريع, افضل شاحن انكر, شاحن انكر الاصلي, سعر شاحن انكر, شاحن انكر نانو, شاحن انكر 45 واط, فيش شاحن انكر, ادابتر انكر',
                }
            },
            seoContent: {
                ar: {
                    title: 'شاحن انكر - من 379 جنيه',
                    subtitle: 'شحن سريع ايفون 17 وسامسونج S26 | ضمان 18 شهر',
                    description: `
شاحن انكر هو شاحن حائط من العلامة الأولى عالمياً في الشحن السريع. يتوفر بقوات من 20 إلى 100 واط لتناسب كل الأجهزة. شاحن انكر 30 واط مثالي للايفون 17، وشاحن 45 واط لسامسونج S26. متوفر في مصر من 379 جنيه مع ضمان 18 شهر.

**اختر شاحنك حسب جهازك:**
| جهازك | الشاحن الموصى به | السعر |
|-------|-----------------|-------|
| **iPhone 17/17 Pro** | Anker Nano 30W | 549 ج |
| **Samsung S26** | Anker 25W PPS | 512 ج |
| **Samsung S26 Ultra** | Anker 45W PPS | 759 ج |
| **MacBook Air** | Anker 65W GaN | 999 ج |
    `,
                    trustSignals: [
                        { type: 'originality', text: 'الموزع المعتمد لـ Anker في مصر' },
                        { type: 'warranty', text: 'ضمان 18 شهر استبدال فوري - أطول من ضمان أبل' },
                        { type: 'expert_verified', text: 'تقنية GaN + ActiveShield 3.0 للحماية' }
                    ],
                    buyingGuide: [
                        {
                            title: 'دليل الواطية: أي شاحن يناسب جهازك؟',
                            content: `
| الواطية | السعر | الأفضل لـ | سرعة الشحن |
|---------|-------|----------|-----------|
| **20W** | 379 ج | iPhone 15/16 (قديمة) | 0→50% في 30 دقيقة |
| **25W PPS** | 512 ج | Samsung S26 Super Fast | 0→50% في 26 دقيقة |
| **30W** | 549 ج | iPhone 17  الأفضل | 0→50% في 25 دقيقة |
| **45W** | 759 ج | S26 Ultra / iPad | 0→50% في 20 دقيقة |
| **65W GaN** | 999 ج | MacBook Air + iPhone | شحن جهازين معاً |
| **100W** | 1299 ج | MacBook Pro 16" | للمحترفين |
`
                        },
                        {
                            title: 'جدول الفائدة: ماذا تعني كل تقنية لك؟',
                            content: `
| الميزة التقنية | ماذا تعني لك؟ |
|----------------|---------------|
| **GaNPrime™** | شاحن أصغر 50% من الأصلي مع نفس القوة |
| **Power Delivery 3.0** | شحن سريع لـ iPhone 17 و MacBook |
| **PPS 2.0** | يفتح Samsung Super Fast Charging 2.0 |
| **ActiveShield™ 3.0** | مراقبة الحرارة 3 مليون مرة/يوم |
| **Multi-Port** | شحن لابتوب + موبايل من نفس الشاحن |
`
                        },
                        {
                            title: 'للسرعة الكاملة: الكابل المناسب',
                            content: `
** نصيحة مهمة:** للحصول على أقصى سرعة، استخدم كابل USB-C to Lightning من انكر مع الشاحن.
[تسوق كابل انكر USB-C](/Anker/cables) - **خصم 15% عند الشراء مع الشاحن!**
`
                        }
                    ],
                    faq: [
                        { question: 'ما أفضل شاحن انكر للايفون 17؟', answer: 'شاحن انكر نانو 30 واط. ايفون 17 يدعم شحن يصل لـ 27 واط، لذا 30 واط يعطيك أقصى سرعة. 20 واط أصبح بطيئاً للموديلات الجديدة.' },
                        { question: 'ما أفضل شاحن انكر لسامسونج S26؟', answer: 'شاحن انكر 25 واط PPS لـ S26 العادي. شاحن 45 واط PPS لـ S26 Ultra. تقنية PPS ضرورية لفتح Super Fast Charging.' },
                        { question: 'كم سعر شاحن انكر في مصر؟', answer: 'من 379 جنيه (20W) إلى 1299 جنيه (100W). الأكثر مبيعاً: 30W بـ 549 جنيه للايفون، 25W بـ 512 جنيه لسامسونج.' },
                        { question: 'ما الفرق بين شاحن 20 وات و 30 وات؟', answer: '20W يشحن ايفون 17 من 0→50% في 30 دقيقة. 30W يفعلها في 25 دقيقة. توفير 5 دقائق يومياً = ساعتين شهرياً!' },
                        { question: 'هل شاحن انكر آمن على البطارية؟', answer: 'نعم! تقنية ActiveShield 3.0 تراقب الحرارة 3 مليون مرة/يوم. نظام MultiProtect بـ 11 نقطة أمان يحمي من الشحن الزائد.' },
                        { question: 'ما هي تقنية GaN في شاحن انكر؟', answer: 'GaN (Gallium Nitride) = شاحن أصغر 50% من الأصلي مع نفس القوة أو أعلى. كفاءة 95% وحرارة أقل بكثير.' },
                        { question: 'هل شاحن انكر يشحن لابتوب MacBook؟', answer: 'نعم! 65W GaN للـ MacBook Air، 100W للـ MacBook Pro 16". يمكن شحن لابتوب + موبايل من نفس الشاحن.' },
                        { question: 'كيف أتأكد أن شاحن انكر أصلي؟', answer: 'امسح كود QR على العلبة في موقع anker.com/verify. أو اشترِ من موزع معتمد مثل Cairo Volt بضمان 18 شهر.' },
                        { question: 'ما ضمان شاحن انكر في مصر؟', answer: 'ضمان 18 شهر من Cairo Volt - أطول من ضمان أبل وسامسونج الأصلي. استبدال فوري لعيوب الصناعة.' },
                        { question: 'أين أشتري شاحن انكر أصلي في مصر؟', answer: 'من Cairo Volt - الموزع المعتمد. ضمان 18 شهر، توصيل القاهرة يوم واحد، دفع عند الاستلام، كود QR للتحقق.' }
                    ],
                    products: [
                        { name: 'شاحن انكر 20 واط', price: 379, badge: 'الأرخص' },
                        { name: 'شاحن انكر 25W PPS', price: 512, badge: 'Samsung S26' },
                        { name: 'شاحن انكر نانو 30W', price: 549, badge: ' iPhone 17' },
                        { name: 'شاحن انكر 45W', price: 759, badge: 'S26 Ultra' },
                        { name: 'شاحن انكر GaN 65W', price: 999, badge: 'MacBook' },
                        { name: 'شاحن انكر 100W', price: 1299, badge: 'Pro Max' },
                    ]
                },
                en: {
                    title: 'Anker Charger - From EGP 379',
                    subtitle: 'iPhone 17 & Samsung S26 Fast Charging | 18-Month Warranty',
                    description: `
Anker chargers are the world's #1 fast charging solution, available from 20W to 100W. The 30W Nano is perfect for iPhone 17, while 45W unlocks Samsung S26 Super Fast Charging. Available in Egypt from EGP 379 with 18-month warranty and next-day Cairo delivery.

**Choose by Device:**
| Device | Recommended Charger | Price |
|--------|---------------------|-------|
| **iPhone 17/17 Pro** | Anker Nano 30W | EGP 549 |
| **Samsung S26** | Anker 25W PPS | EGP 512 |
| **Samsung S26 Ultra** | Anker 45W PPS | EGP 759 |
| **MacBook Air** | Anker 65W GaN | EGP 999 |
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Official Anker Distributor in Egypt' },
                        { type: 'warranty', text: '18-Month Replacement Warranty — longer than Apple' },
                        { type: 'expert_verified', text: 'GaN + ActiveShield 3.0 Protection' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Wattage Guide: Which Charger for Your Device?',
                            content: `
| Wattage | Price | Best For | Charging Speed |
|---------|-------|----------|----------------|
| **20W** | EGP 379 | iPhone 15/16 (older) | 0→50% in 30 min |
| **25W PPS** | EGP 512 | Samsung S26 Super Fast | 0→50% in 26 min |
| **30W** | EGP 549 | iPhone 17  Best Choice | 0→50% in 25 min |
| **45W** | EGP 759 | S26 Ultra / iPad | 0→50% in 20 min |
| **65W GaN** | EGP 999 | MacBook Air + iPhone | Charge 2 devices |
| **100W** | EGP 1299 | MacBook Pro 16" | For Professionals |
`
                        },
                        {
                            title: 'Feature Benefits: What Each Tech Means for You',
                            content: `
| Technical Feature | What It Means for You |
|-------------------|----------------------|
| **GaNPrime™** | 50% smaller than original with same power |
| **Power Delivery 3.0** | Fast charging for iPhone 17 & MacBook |
| **PPS 2.0** | Unlocks Samsung Super Fast Charging 2.0 |
| **ActiveShield™ 3.0** | Heat monitoring 3M times/day |
| **Multi-Port** | Charge laptop + phone from one brick |
`
                        },
                        {
                            title: 'For Full Speed: The Right Cable',
                            content: `
** Pro Tip:** For maximum speed, use an Anker USB-C to Lightning cable with your charger.
[Shop Anker Cables](/en/Anker/cables) — **15% off when bundled with charger!**
`
                        }
                    ],
                    faq: [
                        { question: 'What is the best Anker charger for iPhone 17?', answer: 'Anker Nano 30W. iPhone 17 supports up to 27W, so 30W gives you maximum speed. 20W is now slow for new models.' },
                        { question: 'What is the best Anker charger for Samsung S26?', answer: 'Anker 25W PPS for S26 standard. Anker 45W PPS for S26 Ultra. PPS technology is essential for Super Fast Charging.' },
                        { question: 'How much does an Anker charger cost in Egypt?', answer: 'From EGP 379 (20W) to EGP 1299 (100W). Bestsellers: 30W at EGP 549 for iPhone, 25W at EGP 512 for Samsung.' },
                        { question: 'What is the difference between 20W and 30W chargers?', answer: '20W charges iPhone 17 from 0→50% in 30 min. 30W does it in 25 min. Save 5 min daily = 2 hours monthly!' },
                        { question: 'Is Anker charger safe for battery health?', answer: 'Yes! ActiveShield 3.0 monitors heat 3M times/day. MultiProtect with 11 safety features prevents overcharging.' },
                        { question: 'What is GaN technology in Anker chargers?', answer: 'GaN (Gallium Nitride) = 50% smaller than original with same or higher power. 95% efficiency and much less heat.' },
                        { question: 'Can Anker charger charge MacBook?', answer: 'Yes! 65W GaN for MacBook Air, 100W for MacBook Pro 16". Can charge laptop + phone from same charger.' },
                        { question: 'How to verify Anker charger is original?', answer: 'Scan QR code on box at anker.com/verify. Or buy from authorized dealer like Cairo Volt with 18-month warranty.' },
                        { question: 'What is the warranty for Anker charger in Egypt?', answer: '18-month warranty from Cairo Volt — longer than Apple and Samsung official warranty. Instant replacement for defects.' },
                        { question: 'Where to buy original Anker charger in Egypt?', answer: 'From Cairo Volt — authorized dealer. 18-month warranty, next-day Cairo delivery, cash on delivery, QR verification.' }
                    ],
                    products: [
                        { name: 'Anker 20W Charger', price: 379, badge: 'Budget' },
                        { name: 'Anker 25W PPS', price: 512, badge: 'Samsung S26' },
                        { name: 'Anker Nano 30W', price: 549, badge: ' iPhone 17' },
                        { name: 'Anker 45W', price: 759, badge: 'S26 Ultra' },
                        { name: 'Anker GaN 65W', price: 999, badge: 'MacBook' },
                        { name: 'Anker 100W', price: 1299, badge: 'Pro Max' },
                    ]
                }
            }
        },
        'audio': {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Audio & Earbuds',
            // NEW: Soundcore data for "ankersoundcore" keyword SEO
            soundcoreData: {
                title: {
                    en: 'Soundcore by Anker: World\'s Leading Wireless Audio Brand',
                    ar: 'ساوند كور من انكر: العلامة الأولى عالمياً في السماعات اللاسلكية'
                },
                tagline: {
                    en: 'Hear It. Feel It.',
                    ar: 'اسمعها. عيشها.'
                },
                history: {
                    en: 'Soundcore was launched in 2016 as Anker\'s dedicated audio brand, bringing the same commitment to quality and innovation that made Anker #1 in charging. Today, Soundcore has served over 100 million users worldwide with award-winning earbuds and speakers. The brand\'s philosophy is simple: deliver premium audio experiences at accessible prices. From the budget-friendly R50i to the flagship Liberty 4, every Soundcore product is engineered with precision and backed by the Anker quality guarantee.',
                    ar: 'أُطلقت ساوند كور في عام 2016 كعلامة الصوت المتخصصة من انكر، حاملةً نفس الالتزام بالجودة والابتكار الذي جعل انكر الأولى في الشحن. اليوم، خدمت ساوند كور أكثر من 100 مليون مستخدم حول العالم بسماعات ومكبرات صوت حائزة على جوائز. فلسفة العلامة بسيطة: تقديم تجارب صوتية ممتازة بأسعار معقولة. من R50i الاقتصادية إلى Liberty 4 الرائدة، كل منتج ساوند كور مُصمم بدقة ومدعوم بضمان جودة انكر.'
                },
                achievements: [
                    { icon: 'headphones', stat: { en: '100M+', ar: '+100 مليون' }, label: { en: 'Users Worldwide', ar: 'مستخدم حول العالم' } },
                    { icon: 'star', stat: { en: '4.8/5', ar: '4.8/5' }, label: { en: 'Average Rating', ar: 'متوسط التقييم' } },
                    { icon: 'trophy', stat: { en: '#1', ar: 'رقم 1' }, label: { en: 'Budget Earbuds Brand', ar: 'ماركة سماعات اقتصادية' } },
                    { icon: 'phone', stat: { en: '10M+', ar: '+10 مليون' }, label: { en: 'App Downloads', ar: 'تحميل للتطبيق' } },
                    { icon: 'music', stat: { en: '2016', ar: '2016' }, label: { en: 'Year Launched', ar: 'سنة الإطلاق' } },
                    { icon: 'globe', stat: { en: '50+', ar: '+50' }, label: { en: 'Countries', ar: 'دولة' } }
                ],
                technologies: [
                    { name: 'Hi-Res Audio', icon: 'music', description: { en: 'LDAC & aptX HD support for lossless audio quality up to 990kbps. Certified by Japan Audio Society for true audiophile experience.', ar: 'دعم LDAC و aptX HD لجودة صوت بدون فقدان حتى 990kbps. معتمدة من جمعية الصوت اليابانية لتجربة صوتية حقيقية.' } },
                    { name: 'ANC (Active Noise Cancelling)', icon: 'mute', description: { en: 'Advanced noise cancellation that blocks up to 98% of ambient noise. Perfect for commutes, flights, and focused work.', ar: 'عزل ضوضاء متقدم يحجب حتى 98% من الأصوات المحيطة. مثالي للمواصلات والسفر والتركيز.' } },
                    { name: 'HearID', icon: 'brain', description: { en: 'AI-powered personalized audio profile. The Soundcore app analyzes your hearing and creates a custom EQ just for your ears.', ar: 'ملف صوتي شخصي بالذكاء الاصطناعي. تطبيق ساوند كور يحلل سمعك وينشئ EQ مخصص لأذنيك.' } },
                    { name: '360° BassUp', icon: 'speaker', description: { en: 'Proprietary bass enhancement technology for speakers. Delivers powerful, room-filling sound in all directions.', ar: 'تقنية تعزيز الباس الحصرية للسبيكرات. تقدم صوتاً قوياً يملأ الغرفة من كل الاتجاهات.' } },
                    { name: 'LDAC Codec', icon: 'satellite', description: { en: 'Sony\'s premium wireless audio codec supported by Soundcore. Transmits 3x more data than standard Bluetooth for studio-quality sound.', ar: 'كودك الصوت اللاسلكي المتميز من سوني مدعوم في ساوند كور. ينقل 3 أضعاف البيانات لجودة صوت الاستوديو.' } }
                ],
                useCases: [
                    { icon: 'running', title: { en: 'Sports & Fitness', ar: 'رياضة ولياقة' }, description: { en: 'Sweat-proof IPX5 earbuds with secure fit. Beat your workout with bass that moves you.', ar: 'سماعات مقاومة للعرق IPX5 بتثبيت آمن. تغلب على تمرينك بباس يحركك.' } },
                    { icon: 'plane', title: { en: 'Commute & Travel', ar: 'مواصلات وسفر' }, description: { en: 'ANC earbuds that turn chaos into calm. Block out the world and enjoy your music.', ar: 'سماعات ANC تحول الفوضى لهدوء. احجب العالم واستمتع بموسيقاك.' } },
                    { icon: 'home', title: { en: 'Home & Living', ar: 'منزل ومعيشة' }, description: { en: 'Speakers that fill every corner. From Motion+ Hi-Res to Flare 2 party lights.', ar: 'سبيكرات تملأ كل ركن. من Motion+ عالي الدقة لـ Flare 2 بإضاءة الحفلات.' } },
                    { icon: 'party', title: { en: 'Outdoor & Party', ar: 'حفلات ورحلات' }, description: { en: 'Waterproof speakers with 360° sound. IPX7 rated for pool parties and beach days.', ar: 'سبيكرات مقاومة للماء بصوت 360 درجة. تصنيف IPX7 لحفلات المسبح والشاطئ.' } }
                ],
                trustBadges: [
                    { icon: 'music', title: { en: 'Hi-Res Certified', ar: 'صوت Hi-Res معتمد' }, description: { en: 'Japan Audio Society', ar: 'جمعية الصوت اليابانية' } },
                    { icon: 'shield', title: { en: '12-Month Warranty', ar: 'ضمان 12 شهر' }, description: { en: 'Instant replacement', ar: 'استبدال فوري' } },
                    { icon: 'phone', title: { en: 'Soundcore App', ar: 'تطبيق Soundcore' }, description: { en: 'Free EQ & Updates', ar: 'EQ مجاني وتحديثات' } },
                    { icon: 'phone', title: { en: 'iOS/Android', ar: 'iOS/Android' }, description: { en: 'Full compatibility', ar: 'توافق كامل' } },
                    { icon: 'star', title: { en: '4.8/5 Rating', ar: 'تقييم 4.8/5' }, description: { en: 'Global average', ar: 'متوسط عالمي' } },
                    { icon: 'globe', title: { en: 'World\'s Leading', ar: 'الأولى عالمياً' }, description: { en: 'Wireless audio brand', ar: 'في السماعات اللاسلكية' } }
                ],
                faq: {
                    ar: [
                        { question: 'ما الفرق بين سماعات Soundcore R50i و P20i و Liberty 4؟', answer: 'R50i (868 ج.م): الخيار الاقتصادي مع جودة صوت ممتازة وبطارية 10 ساعات. P20i (868 ج.م): نفس السعر لكن بتصميم مختلف وألوان أكثر. Liberty 4 (الأعلى): تأتي بـ ANC، Hi-Res Audio، وHearID للصوت الشخصي. اختر R50i للميزانية، Liberty 4 للتجربة الكاملة.' },
                        { question: 'هل سماعات Soundcore تدعم عزل الضوضاء ANC؟', answer: 'ليس كل الموديلات! R50i و P20i لا تحتوي ANC (لكن تعزل الضوضاء بشكل سلبي). أما Liberty 4 و P40i فتأتي بـ ANC نشط يحجب 98% من الضوضاء. إذا كنت تستخدم المواصلات كثيراً، ANC يستحق الفرق.' },
                        { question: 'كيف أعرف أن سماعة Soundcore أصلية وليست تقليد؟', answer: 'الطريقة الأضمن: حمّل تطبيق Soundcore من App Store أو Google Play وحاول ربط السماعة. إذا لم يتعرف التطبيق عليها = مقلدة 100%. المنتجات الأصلية تظهر فوراً وتتيح لك تحديث firmware وتخصيص EQ.' },
                        { question: 'أيهما أفضل: سماعات Soundcore أم AirPods؟', answer: 'يعتمد على احتياجك! AirPods ممتازة لمستخدمي آيفون وتكامل مع Apple. Soundcore تقدم نفس الجودة (أحياناً أفضل في الباس) بنصف السعر أو أقل، مع Hi-Res Audio وتطبيق تخصيص قوي. للميزانية الذكية، Soundcore هي الخيار.' },
                        { question: 'هل تطبيق Soundcore متاح بالعربي؟', answer: 'التطبيق حالياً بالإنجليزية فقط، لكنه سهل الاستخدام جداً. يتيح لك: تخصيص EQ (الصوت)، تفعيل HearID (ملف صوتي شخصي)، تحديث firmware السماعة، وتتبع السماعة إذا ضاعت. متاح مجاناً على iOS و Android.' }
                    ],
                    en: [
                        { question: 'What is the difference between Soundcore R50i, P20i, and Liberty 4?', answer: 'R50i (EGP 868): Budget-friendly with excellent sound and 10-hour battery. P20i (EGP 868): Same price, different design with more colors. Liberty 4 (Flagship): Features ANC, Hi-Res Audio, and personalized HearID. Choose R50i for budget, Liberty 4 for the full experience.' },
                        { question: 'Do Soundcore earbuds support ANC (Active Noise Cancelling)?', answer: 'Not all models! R50i & P20i don\'t have ANC (but provide passive isolation). Liberty 4 & P40i come with active ANC that blocks 98% of noise. If you commute frequently, ANC is worth the upgrade.' },
                        { question: 'How can I verify if my Soundcore earbuds are genuine?', answer: 'The safest method: Download the Soundcore App from App Store or Google Play and try to pair your earbuds. If the app doesn\'t recognize them = 100% fake. Genuine products appear instantly and allow firmware updates and EQ customization.' },
                        { question: 'Which is better: Soundcore or AirPods?', answer: 'Depends on your needs! AirPods are excellent for iPhone users and Apple ecosystem. Soundcore offers the same quality (sometimes better bass) at half the price or less, with Hi-Res Audio and a powerful customization app. For smart budgets, Soundcore wins.' },
                        { question: 'Is the Soundcore app available in Arabic?', answer: 'The app is currently English-only but very user-friendly. It lets you: customize EQ (sound), activate HearID (personal audio profile), update earbuds firmware, and track lost earbuds. Available free on iOS & Android.' }
                    ]
                }
            },
            metadata: {
                en: {
                    title: 'Anker Soundcore Earbuds Egypt | R50i, P20i, Liberty',
                    description: 'Shop Anker Soundcore earbuds in Egypt. Anker R50i, P20i, Liberty. Premium audio quality with official warranty. Best prices.',
                    keywords: 'anker soundcore, anker earbuds, anker r50i, soundcore r50i, anker p20i, anker liberty',
                },
                ar: {
                    title: 'سماعات انكر Soundcore | Anker Earbuds Egypt - R50i, P20i',
                    description: 'تسوق سماعات انكر Soundcore الأصلية في مصر. anker soundcore, سماعة انكر, anker r50i, soundcore r50i, anker p20i. سماعة انكر بلوتوث بأفضل سعر.',
                    keywords: 'anker soundcore, سماعة انكر, سماعات انكر, anker r50i, soundcore r50i, anker p20i, سماعة انكر بلوتوث',
                }
            },
            seoContent: {
                ar: {
                    title: 'سماعات انكر Soundcore',
                    subtitle: 'Anker Soundcore - جودة صوت استثنائية',
                    description: `
      اكتشف عالم **Anker Soundcore** في مصر، حيث تلتقي التكنولوجيا بالصوت النقي.
      سماعات انكر ليست مجرد سماعات، بل هي تجربة سمعية متكاملة مدعومة بالذكاء الاصطناعي (AI Audio) وتطبيق Soundcore الحائز على جوائز.
      
      **لماذا تختار Soundcore في 2026؟**
      - **تقنية HearID 2.0:** تقوم السماعة بتحليل سمعك وإنشاء بروفايل صوتي مخصص لك وحدك.
      - **عزل الضوضاء التكيفي (Adaptive ANC 3.0):** يكتشف الضوضاء المحيطة ويعدل العزل تلقائياً (في المواصلات، المكتب، الشارع).
      - **صوت LDAC عالي الدقة:** نقل بيانات أكثر بـ 3 أضعاف من البلوتوث العادي لتسمع كل تفصيلة.
      - **بطاريات تدوم طويلاً:** تصل إلى 50 ساعة مع العلبة في بعض الموديلات.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'وكيل معتمد (سيريال أصلي)' },
                        { type: 'warranty', text: 'ضمان 18 شهر استبدال' },
                        { type: 'expert_verified', text: 'جودة صوت Hi-Res' }
                    ],
                    buyingGuide: [
                        {
                            title: 'دليل اختيار سماعة انكر المناسبة',
                            content: `
- **الفئة الاقتصادية (R50i / P20i):** أفضل قيمة مقابل سعر. صوت قوي (BassUp)، بطارية ممتازة، وتصميم مريح. (بدون عزل ضوضاء)
- **الفئة المتوسطة (P40i / P3):** تدعم عزل الضوضاء (ANC)، علبة شحن لاسلكي، ووضع الألعاب (Game Mode).
- **فئة الفلاجشيب (Liberty 4 / 4 NC):** قمة الصوتيات. دعم LDAC، تتبع ضربات القلب (في Liberty 4)، وأفضل ميكروفونات للمكالمات في السوق.
`
                        },
                        {
                            title: 'تطبيق Soundcore App',
                            content: `
تأكد دائماً من تحميل تطبيق Soundcore. إذا لم تتعرف السماعة على التطبيق، فهذا يعني أنها **غير أصلية**.
التطبيق يتيح لك: تعديل الـ EQ، تفعيل وضع الألعاب، تحديث السوفتوير، والبحث عن السماعة المفقودة.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'ما هو الفرق بين R50i و P20i؟',
                            answer: 'الفرق الرئيسي في التصميم. R50i بتصميم "عصا" أطول قليلاً وجودة مايك أفضل قليلاً، بينما P20i أصغر وأخف. الصوت والبطارية متطابقان تقريباً.'
                        },
                        {
                            question: 'هل يوجد تأخير في الصوت (Delay) مع الألعاب؟',
                            answer: 'معظم سماعات انكر الحديثة تدعم "وضع الألعاب" (Game Mode) عبر التطبيق، الذي يقلل التأخير لأقل من 70ms لتجربة لعب سلسة.'
                        }
                    ],
                    products: [
                        { name: 'Anker Soundcore R50i', price: 868, badge: 'اقتصادي ناجح' },
                        { name: 'Anker Soundcore P20i', price: 868, badge: 'Best Value' },
                        { name: 'Anker Liberty 4', price: 868, badge: 'Premium ANC' },
                    ]
                },
                en: {
                    title: 'Anker Soundcore Earbuds',
                    subtitle: 'Exceptional Audio Quality',
                    description: `
      Discover the world of **Anker Soundcore** in Egypt, where technology meets pure sound.
      Soundcore earphones are not just earbuds; they are a complete audio experience powered by **AI Audio** and the award-winning Soundcore App.
      
      **Why Choose Soundcore in 2026?**
      - **HearID 2.0:** Analyzes your hearing and creates a personalized sound profile just for you.
      - **Adaptive ANC 3.0:** Detects environmental noise and adjusts cancellation automatically (Transport, Office, Outdoors).
      - **LDAC Hi-Res Audio:** Transmits 3x more data than standard Bluetooth for studio-quality details.
      - **Long Listing Battery:** Up to 50 hours of playtime with the case on select models.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Authorized Dealer (Original Serial)' },
                        { type: 'warranty', text: '18-Month Exchange Warranty' },
                        { type: 'expert_verified', text: 'Hi-Res Audio Certified' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Which Anker Earbud Should You Buy?',
                            content: `
- **Budget Series (R50i / P20i):** Best value for money. Powerful sound (BassUp), excellent battery, comfortable fit. (No ANC).
- **Mid-Range Series (P40i / Life Note 3):** Supports Active Noise Cancellation (ANC), Wireless Charging Case, and Game Mode.
- **Flagship Series (Liberty 4 / 4 NC):** The pinnacle of audio. Supports LDAC, Heart Rate Tracking (Liberty 4), and best-in-class Microphones.
`
                        },
                        {
                            title: 'The Soundcore App Advantage',
                            content: `
Always ensure you download the Soundcore App. If the app doesn't recognize your earbuds, **they are likely fake**.
The App allows you to: Customize EQ, Enable Game Mode, Update Firmware, and Find My Earbuds.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'What is the difference between R50i and P20i?',
                            answer: 'The main difference is the design. R50i has a slightly longer "stem" design (better mic), while P20i is more compact. Sound and battery are nearly identical.'
                        },
                        {
                            question: 'Is there audio lag when gaming?',
                            answer: 'Most modern Anker earbuds support "Game Mode" via the app, which reduces latency to under 70ms for a smooth gaming experience.'
                        }
                    ],
                    products: [
                        { name: 'Anker Soundcore R50i', price: 868, badge: 'Budget King' },
                        { name: 'Anker Soundcore P20i', price: 868, badge: 'Best Value' },
                        { name: 'Anker Liberty 4', price: 868, badge: 'Premium ANC' },
                    ]
                }
            }
        },
        'cables': {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Cables',
            metadata: {
                en: {
                    title: 'Anker Cable Egypt | Lightning, USB-C, PowerLine',
                    description: 'Shop original Anker cables in Egypt. Anker PowerLine Lightning, USB-C cables. Lifetime warranty. Best prices.',
                    keywords: 'anker cable, anker lightning cable, anker type c cable, anker powerline, cable egypt',
                },
                ar: {
                    title: 'كابل انكر | Anker Cable Egypt - وصلة انكر للايفون',
                    description: 'تسوق كابل انكر الأصلي في مصر. وصلة انكر للايفون, كابل شاحن انكر, anker type c cable, وصلة شاحن انكر بأفضل سعر.',
                    keywords: 'وصلة انكر للايفون, وصلة شاحن انكر, كابل شاحن انكر, anker type c cable, كابل انكر ايفون, وصلة شاحن, وصلة ايفون',
                }
            },
            seoContent: {
                ar: {
                    title: 'كابلات انكر (الأكثر متانة في العالم)',
                    subtitle: 'Anker PowerLine - كابل العمر الطويل',
                    description: `
      هل تعبت من شراء كابلات الآيفون التي تتقطع من عند الرأس؟
      كابلات **Anker PowerLine** ليست مجرد كابلات، بل هي استثمار. مصنوعة من ألياف **Kevlar** (المستخدمة في الستر الواقية من الرصاص)، وتتحمل أكثر من 12,000 ثنية.
      
      **لماذا كابل انكر هو الرقم 1؟**
      - **سرعة شحن خرافية:** يدعم توصيل الطاقة (Power Delivery) لشحن الايفون 50% في 30 دقيقة.
      - **معتمد من أبل (MFi):** يحتوي على شريحة C94 الأصلية من أبل، مما يضمن توافق تام وعدم ظهور رسالة "ملحق غير مدعوم".
      - **ضمان حقيقي:** ضمان استبدال فوري لمدة 18 شهر من الوكيل.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'شريحة Apple C94 أصلية' },
                        { type: 'warranty', text: 'ضمان 18 شهر' },
                        { type: 'expert_verified', text: 'يتحمل 80 كجم شد' }
                    ],
                    buyingGuide: [
                        {
                            title: 'الفرق بين إصدارات PowerLine',
                            content: `
- **PowerLine II:** الإصدار الكلاسيكي القوي. يتحمل 12,000 ثنية. (الأكثر مبيعاً)
- **PowerLine III:** أنحف وأقوى. يتحمل 25,000 ثنية.
- **PowerLine+ III:** مغلف بالنايلون المضفر (Braided) وغير قابل للتشابك. يتحمل 35,000 ثنية.
`
                        },
                        {
                            title: 'هل يدعم الشحن السريع؟',
                            content: `
طبعاً. كابلات USB-C to Lightning و USB-C to USB-C تدعم بروتوكول PD لشحن الايفون والسامسونج واللابتوب بأقصى سرعة.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'لماذا سعر كابل انكر أغلى من الكابلات العادية؟',
                            answer: 'لأنك تشتري كابل يعيش 5 أضعاف عمر الكابل العادي، ومعتمد رسمياً من أبل (MFi) ليحمي دائرة شحن هاتفك من التلف.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerLine Select+ (Braided)', price: 508, badge: 'الأقوى' },
                        { name: 'Anker PowerLine II (USB-C to Lightning)', price: 508, badge: 'شحن سريع' },
                        { name: 'Anker 322 Cable (USB-C to USB-C)', price: 309, badge: 'اقتصادي' },
                    ]
                },
                en: {
                    title: 'Anker Cables (World\'s Strongest)',
                    subtitle: 'Anker PowerLine - The Last Cable You\'ll Buy',
                    description: `
      Tired of iPhone cables snapping at the connector?
      **Anker PowerLine** cables are built with **Kevlar fiber** (used in bulletproof vests), engineered to withstand over 12,000 bends.
      
      **Why is Anker #1?**
      - **Blazing Speeds:** Supports Power Delivery (PD) to charge iPhone to 50% in 30 mins.
      - **MFi Certified:** Contains Apple's original C94 chip, ensuring 100% compatibility and zero error messages.
      - **Real Warranty:** 18-month immediate replacement warranty.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Original Apple C94 Chip' },
                        { type: 'warranty', text: '18-Month Warranty' },
                        { type: 'expert_verified', text: 'Withstands 80kg Pull' }
                    ],
                    buyingGuide: [
                        {
                            title: 'PowerLine Generations Explained',
                            content: `
- **PowerLine II:** The classic Durability King. 12,000 bend lifespan. (Best Seller)
- **PowerLine III:** Slimmer yet stronger. 25,000 bend lifespan.
- **PowerLine+ III:** Premium Braided Nylon, tangle-free. 35,000 bend lifespan.
`
                        },
                        {
                            title: 'Does it support Fast Charging?',
                            content: `
Absolutely. Our USB-C to Lightning and USB-C to USB-C cables fully support PD protocols for iPhone, Samsung, and MacBooks.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Why is Anker more expensive than generic cables?',
                            answer: 'You are paying for a cable that lasts 5x longer and is officially MFi certified to protect your phone\'s charging IC from voltage spikes.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerLine Select+ (Braided)', price: 508, badge: 'Durable' },
                        { name: 'Anker PowerLine II (USB-C to Lightning)', price: 508, badge: 'Fast Charge' },
                        { name: 'Anker 322 Cable (USB-C to USB-C)', price: 309, badge: 'Value' },
                    ]
                }
            }
        },
        'car-chargers': {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Car Chargers',
            metadata: {
                en: {
                    title: 'Anker Car Charger Egypt | Fast Charging 48W',
                    description: 'Shop original Anker Car Charger in Egypt. Fast charging 48W, dual ports. Official warranty.',
                    keywords: 'anker car charger, car charger egypt, fast car charger, anker powerdrive',
                },
                ar: {
                    title: 'شاحن سيارة انكر | Anker Car Charger Egypt - شحن سريع',
                    description: 'تسوق شاحن سيارة انكر الأصلي في مصر. شاحن سيارة انكر سريع، Anker Car Charger بأفضل سعر. شاحن سيارة سريع.',
                    keywords: 'شاحن سيارة انكر, شاحن سيارة سريع, anker car charger, شاحن سيارة',
                }
            },
            seoContent: {
                ar: {
                    title: 'شاحن سيارة انكر (شحن سريع وآمن)',
                    subtitle: 'Anker Car Charger - حول سيارتك لمحطة شحن',
                    description: `
      لا تضحي ببطارية هاتفك باستخدام شواحن سيارة رديئة تسبب سخونة زائدة.
      شواحن **Anker Car Chargers** مصممة لتعمل بكفاءة تحت أشعة الشمس المصرية الحارقة بفضل جسمها المعدني (Alloy Body) الذي يشتت الحرارة، وتقنية PowerIQ التي تضمن شحن آمن وسريع.
      
      **لماذا هو الشاحن المثالي لطرق مصر؟**
      - **ثبات في الولاعة:** تصميم محكم لا يهتز أو يفصل مع المطبات.
      - **شحن جهازين معاً:** اشحن هاتفك وهاتف الراكب بجانبك بنفس السرعة القصوى.
      - **حماية من السخونة:** نظام MultiProtect يفصل الشحن فوراً عند ارتفاع الحرارة بشكل خطر.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'جسم معدني لتشتيت الحرارة' },
                        { type: 'warranty', text: 'ضمان 18 شهر استبدال' },
                        { type: 'expert_verified', text: 'شحن سريع 48W' }
                    ],
                    buyingGuide: [
                        {
                            title: 'كيف تختار القوة المناسبة؟',
                            content: `
- **للاستخدام العادي (24W):** يشحن جهازين بسرعة عادية (12W لكل جهاز). مناسب لهواتف الاندرويد القديمة والايفون العادي.
- **للسرعة القصوى (48W+):** ضروري للايفون الحديث (14/15/16) وسامسونج. يدعم شحن PD سريع (50% في 30 دقيقة).
`
                        },
                        {
                            title: 'هل يؤثر على بطارية السيارة؟',
                            content: `
لا. شواحن انكر تستهلك طاقة لا تذكر (Micro-Amps) عندما تكون السيارة مطفأة، ولا تسبب أي تفريغ لبطارية السيارة.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل يمكنني شحن اللابتوب في السيارة؟',
                            answer: 'نعم، ولكن تحتاج لشاحن سيارة بقوة 65 واط أو أكثر (موديلات Anker Prime Car Charger) لضمان شحن اللابتوب أثناء الاستخدام.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerDrive Speed+ 2', price: 656, badge: 'PD سريع' },
                        { name: 'Anker 323 Car Charger (52W)', price: 656, badge: 'الأقوى' },
                        { name: 'Anker Mini Alloys', price: 656, badge: 'معدني' },
                    ]
                },
                en: {
                    title: 'Anker Car Charger (Fast & Safe)',
                    subtitle: 'Turn Your Car Into a Power Station',
                    description: `
      Don't risk your phone battery with cheap plastic car chargers that melt or overheat.
      **Anker Car Chargers** are built with a premium **Alloy Body** to dissipate heat efficiently, making them perfect for hot local summers.
      
      **Why matches Egyptian Roads?**
      - **Secure Fit:** Engineered snugs fit that won't disconnect on speed bumps.
      - **Dual Fast Charging:** Charge pilot and co-pilot devices at full speed simultaneously.
      - **Heat Protection:** MultiProtect system cuts power instantly if dangerous temperatures are detected.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Alloy Heat Dissipation' },
                        { type: 'warranty', text: '18-Month Warranty' },
                        { type: 'expert_verified', text: '48W Fast Charging' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Choosing the Right Wattage',
                            content: `
- **Standard Use (24W):** Charges two devices at standard speed. Good for older phones or maintaining battery while using GPS.
- **Max Speed (48W+):** Essential for iPhone 14/15/16 and Samsung S-Series. Supports PD Fast Charging (0-50% in 30 mins).
`
                        },
                        {
                            title: 'Will it drain my car battery?',
                            content: `
No. Anker chargers draw negligible power when the car is off, ensuring your car battery stays safe even if you leave the charger plugged in.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Can I charge my MacBook in the car?',
                            answer: 'Yes, but you need a high-wattage model (65W+) like the Anker Prime Car Charger to charge a laptop effectively while running.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerDrive Speed+ 2', price: 656, badge: 'PD Fast' },
                        { name: 'Anker 323 Car Charger (52W)', price: 656, badge: 'Powerful' },
                        { name: 'Anker Mini Alloys', price: 656, badge: 'Metallic' },
                    ]
                }
            }
        },
        'speakers': {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Bluetooth Speakers',
            metadata: {
                en: {
                    title: 'Anker Soundcore Speakers Egypt | Motion+, Flare 2, Boom',
                    description: 'Shop Anker Soundcore Bluetooth speakers in Egypt. Motion+, Flare 2, Boom 2. Hi-Res audio, 360° sound, waterproof IPX7. Best prices with official warranty.',
                    keywords: 'anker speaker, soundcore speaker, anker motion plus, soundcore flare 2, bluetooth speaker egypt, anker bluetooth speaker',
                },
                ar: {
                    title: 'مكبرات صوت انكر Soundcore | سماعات بلوتوث Motion+, Flare 2 مصر',
                    description: 'تسوق مكبرات صوت انكر Soundcore الأصلية في مصر. Motion+, Flare 2, Boom 2. صوت Hi-Res عالي الدقة، صوت 360 درجة، مقاومة للماء IPX7. أفضل سعر مع ضمان رسمي.',
                    keywords: 'سماعة انكر, مكبر صوت انكر, soundcore motion plus, soundcore flare 2, سماعة بلوتوث, مكبر صوت بلوتوث',
                }
            },
            seoContent: {
                ar: {
                    title: 'مكبرات صوت انكر Soundcore',
                    subtitle: 'Anker Soundcore Speakers - صوت Hi-Res عالي الدقة',
                    description: `
كتشف **مكبرات صوت انكر Soundcore** الأصلية في مصر - صوت استثنائي بتقنيات متقدمة.

**لماذا تختار Anker Soundcore Speakers؟**
- **صوت Hi-Res عالي الدقة** - شهادة الصوت عالي الدقة مع 30 واط
- **تقنية BassUp** - باس عميق وقوي يهز المكان
- **صوت 360 درجة** - تجربة صوتية محيطية من كل الاتجاهات
- **مقاومة للماء IPX7** - مثالية للحفلات والمسابح
- **بطارية طويلة** - حتى 24 ساعة من التشغيل المتواصل
- **ربط السماعات** - اربط 100+ سماعة معاً بتقنية PartyCast
- **ضمان انكر الرسمي** - جودة موثوقة وخدمة ما بعد البيع

**أشهر الموديلات:**
- **Soundcore Motion+** - الخيار الأفضل لعشاق الصوت عالي الدقة
- **Soundcore Flare 2** - سماعة الحفلات مع إضاءة LED متفاعلة
    `,
                    products: [
                        { name: 'Soundcore Motion+', price: 2849, badge: 'صوت Hi-Res' },
                        { name: 'Soundcore Flare 2', price: 3419, badge: 'إضاءة LED' },
                    ]
                },
                en: {
                    title: 'Anker Soundcore Speakers',
                    subtitle: 'Hi-Res Audio Quality',
                    description: `
Discover the original **Anker Soundcore Speakers** in Egypt - exceptional audio with advanced technology.

**Why Choose Anker Soundcore Speakers?**
- **Hi-Res Audio Certified** - High-resolution sound with 30W power
- **BassUp Technology** - Deep, powerful bass that fills the room
- **360° Sound** - Immersive audio experience from all directions
- **IPX7 Waterproof** - Perfect for pool parties and outdoor use
- **Long Battery Life** - Up to 24 hours of continuous playback
- **Speaker Pairing** - Connect 100+ speakers with PartyCast
- **Official Anker Warranty** - Reliable quality and after-sales service

**Popular Models:**
- **Soundcore Motion+** - Best choice for Hi-Res audio enthusiasts
- **Soundcore Flare 2** - Party speaker with reactive LED lights
    `,
                    products: [
                        { name: 'Soundcore Motion+', price: 2849, badge: 'Hi-Res Audio' },
                        { name: 'Soundcore Flare 2', price: 3419, badge: 'LED Lights' },
                    ]
                }
            }
        }
    },
    joyroom: {
        'audio': {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Audio & Earbuds',
            metadata: {
                en: {
                    title: 'Joyroom Earbuds Egypt | From EGP 499 | Best AirPods Alternative 2026',
                    description: 'Shop original Joyroom earbuds in Egypt. T03s Pro with ANC and Spatial Audio from EGP 699. ✓ Golden Code verified ✓ 12-month warranty ✓ Next-day Cairo delivery',
                    keywords: 'joyroom earbuds egypt, joyroom t03s pro egypt, joyroom wireless earbuds, joyroom bluetooth earbuds, best airpods alternative egypt 2026, cheap wireless earbuds egypt, joyroom vs airpods, joyroom anc earbuds, joyroom t03s pro max, joyroom golden code verification',
                },
                ar: {
                    title: 'سماعات جوي روم | أسعار من 499 جنيه | بديل الايربودز مصر 2026',
                    description: 'تسوق سماعات جوي روم الأصلية في مصر. T03s Pro بـ ANC وSpatial Audio من 699 جنيه. ✓ الكود الذهبي ✓ ضمان 12 شهر ✓ توصيل القاهرة يوم واحد',
                    keywords: 'سماعات جوي روم, سماعة joyroom, سماعات joyroom الاصلية, سعر السماعة joyroom, جوي روم ايربودز, سعر ايربودز joyroom, سعر ايربودز جوي روم, سعر سماعة joyroom jr t03s, سماعات بلوتوث joyroom, أفضل سماعات joyroom, سماعات ايربودز joyroom, سماعات بلوتوث جوي روم, سماعات joyroom t03s pro, ايربودز جوي روم t03s, مميزات وعيوب سماعة joyroom jr t03s',
                }
            },
            seoContent: {
                ar: {
                    title: 'سماعات جوي روم - بديل الايربودز الأذكى',
                    subtitle: 'من 499 جنيه | ANC + Spatial Audio | الكود الذهبي',
                    description: `
سماعات جوي روم هي علامة صينية متخصصة في سماعات البلوتوث اللاسلكية بأسعار اقتصادية. سلسلة T03s هي الأكثر مبيعاً في مصر، توفر ميزات الايربودز (Pop-up pairing, ANC, Spatial Audio) بنصف السعر. تأتي بضمان الكود الذهبي وتوصيل سريع للقاهرة.

**لماذا جوي روم بدلاً من الايربودز؟**
- ✓ AirPods Pro 2 = 12,000+ جنيه | T03s Pro = **699 جنيه فقط**
- ✓ نفس الميزات: ANC, Spatial Audio, Pop-up Pairing
- ✓ ضمان الكود الذهبي: تأكد من الأصالة برسالة SMS
- ✓ أكثر من 15,000 قطعة مباعة في مصر
    `,
                    trustSignals: [
                        { type: 'originality', text: 'الكود الذهبي - تأكيد الأصالة بـ SMS' },
                        { type: 'warranty', text: 'ضمان استبدال فوري 12 شهر (ليس إصلاح!)' },
                        { type: 'expert_verified', text: '15,000+ قطعة مباعة في مصر' }
                    ],
                    buyingGuide: [
                        {
                            title: 'مقارنة الموديلات: أي T03s يناسبك؟',
                            content: `
| الموديل | السعر | ANC | عمر البطارية | الأفضل لـ |
|---------|-------|-----|-------------|-----------|
| **T03s** | 499 ج | ✗ | 5h + 20h | الميزانية المحدودة |
| **T03s Pro** | 699 ج | ✓ | 6h + 24h | الاستخدام اليومي  |
| **T03s Pro Max** | 1025 ج | ✓ الأقوى | 8h + 32h | السفر والمحترفين |
`
                        },
                        {
                            title: 'جدول الفائدة: ماذا تعني كل ميزة لك؟',
                            content: `
| الميزة التقنية | ماذا تعني لك؟ |
|----------------|---------------|
| **ANC (إلغاء الضوضاء)** | لا تسمع ضوضاء الميكروباص أو زملاء المكتب |
| **Pop-up Pairing** | اتصال تلقائي بالايفون مثل الايربودز بالظبط |
| **Spatial Audio** | صوت ثلاثي الأبعاد للأفلام والألعاب |
| **Bluetooth 5.3** | اتصال أقوى وبدون تقطيع حتى 15 متر |
| **IPX5 مقاومة للماء** | تحميك من المطر والعرق أثناء الرياضة |
`
                        },
                        {
                            title: 'كيف تتأكد أن السماعة أصلية؟ (الكود الذهبي)',
                            content: `
1. ابحث عن **الستيكر الذهبي** على العلبة
2. اكشط الطبقة للكشف عن الكود السري
3. أرسل الكود بـ SMS للرقم الموجود
4. ستصلك رسالة تأكيد الأصالة فوراً
**نحن في CairoVolt موزع معتمد بالكود الذهبي + ضمان 12 شهر استبدال فوري.**
`
                        }
                    ],
                    faq: [
                        { question: 'ما هي أفضل سماعات جوي روم في مصر؟', answer: 'T03s Pro هي الأكثر مبيعاً بسعر 699 جنيه. توفر ANC وSpatial Audio وPop-up Pairing مثل الايربودز بنصف السعر.' },
                        { question: 'كم سعر سماعات جوي روم T03s في مصر؟', answer: 'T03s العادية: 499 جنيه. T03s Pro: 699 جنيه. T03s Pro Max: 1025 جنيه. جميعها بضمان الكود الذهبي.' },
                        { question: 'ما الفرق بين T03s و T03s Pro؟', answer: 'T03s Pro يضيف: ANC (إلغاء الضوضاء)، Spatial Audio، بطارية أطول (6h vs 5h)، وجودة صوت أعلى. الفرق 200 جنيه يستاهل.' },
                        { question: 'هل سماعات جوي روم تعمل مع ايفون 17؟', answer: 'نعم 100%! تدعم Pop-up Pairing مثل الايربودز، Siri، وجميع ميزات iOS 19. أفضل بديل اقتصادي للايربودز.' },
                        { question: 'هل سماعات جوي روم تعمل مع سامسونج S26؟', answer: 'نعم! متوافقة مع جميع أجهزة أندرويد. تدعم Google Assistant وSamsung SmartThings. اتصال Bluetooth 5.3 قوي ومستقر.' },
                        { question: 'كيف أتأكد أن سماعات جوي روم أصلية؟', answer: 'بالكود الذهبي! اكشط الملصق على العلبة وأرسل الكود بـ SMS. ستصلك رسالة تأكيد الأصالة فوراً. نحن موزع معتمد.' },
                        { question: 'ما الفرق بين جوي روم والايربودز الأصلية؟', answer: 'نفس الميزات (ANC, Spatial Audio, Pop-up Pairing) لكن بسعر أقل 90%. جوي روم T03s Pro بـ 699 ج vs ايربودز Pro بـ 12,000+ ج.' },
                        { question: 'كم عمر بطارية سماعات جوي روم؟', answer: 'T03s Pro: 6 ساعات للسماعة + 24 ساعة مع علبة الشحن. T03s Pro Max: 8 + 32 ساعة. يكفي يوم كامل بسهولة.' },
                        { question: 'ما ضمان سماعات جوي روم في مصر؟', answer: 'ضمان الكود الذهبي 12 شهر من Cairo Volt. استبدال فوري (ليس إصلاح!) لعيوب الصناعة.' },
                        { question: 'أين أشتري سماعات جوي روم الأصلية في مصر؟', answer: 'من Cairo Volt - موزع معتمد. الكود الذهبي، ضمان 12 شهر، توصيل القاهرة يوم واحد، دفع عند الاستلام.' }
                    ],
                    products: [
                        { name: 'Joyroom T03s Pro', price: 699, badge: ' الأكثر مبيعاً' },
                        { name: 'Joyroom T03s Pro Max', price: 1025, badge: 'ANC Pro' },
                        { name: 'Joyroom T03s', price: 499, badge: 'الخيار الاقتصادي' },
                    ]
                },
                en: {
                    title: 'Joyroom Earbuds - The Smart AirPods Alternative',
                    subtitle: 'From EGP 499 | ANC + Spatial Audio | Golden Code Verified',
                    description: `
Joyroom earbuds offer premium AirPods-like features at budget-friendly prices. The T03s Series is Egypt's bestseller with pop-up pairing, ANC, and spatial audio at half the AirPods price. Available with Golden Code verification and next-day Cairo delivery.

**Why Joyroom over AirPods?**
- ✓ AirPods Pro 2 = 12,000+ EGP | T03s Pro = **EGP 699 only**
- ✓ Same features: ANC, Spatial Audio, Pop-up Pairing
- ✓ Golden Code: Verify authenticity via SMS
- ✓ 15,000+ units sold in Egypt
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Golden Code - SMS Authenticity Verification' },
                        { type: 'warranty', text: '12-Month Replacement Warranty (Not Repair!)' },
                        { type: 'expert_verified', text: '15,000+ Units Sold in Egypt' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Model Comparison: Which T03s is Right for You?',
                            content: `
| Model | Price | ANC | Battery Life | Best For |
|-------|-------|-----|--------------|----------|
| **T03s** | EGP 499 | ✗ | 5h + 20h | Budget Buyers |
| **T03s Pro** | EGP 699 | ✓ | 6h + 24h | Daily Use  |
| **T03s Pro Max** | EGP 1025 | ✓ Strong | 8h + 32h | Travel & Pros |
`
                        },
                        {
                            title: 'Feature Benefits: What Each Spec Means for You',
                            content: `
| Technical Feature | What It Means for You |
|-------------------|----------------------|
| **ANC (Noise Cancellation)** | Block out traffic and office noise |
| **Pop-up Pairing** | Instant iPhone connection like AirPods |
| **Spatial Audio** | 3D sound for movies and gaming |
| **Bluetooth 5.3** | Stronger connection, no dropouts up to 15m |
| **IPX5 Water Resistant** | Protected from rain and workout sweat |
`
                        },
                        {
                            title: 'How to Verify Authenticity (Golden Code)',
                            content: `
1. Find the **Golden Sticker** on the box
2. Scratch off the coating to reveal the secret code
3. Send the code via SMS to the number shown
4. Receive instant authenticity confirmation
**CairoVolt is an authorized dealer with Golden Code + 12-month replacement warranty.**
`
                        }
                    ],
                    faq: [
                        { question: 'What are the best Joyroom earbuds in Egypt?', answer: 'T03s Pro is the bestseller at EGP 699. Offers ANC, Spatial Audio, and Pop-up Pairing like AirPods at half the price.' },
                        { question: 'How much do Joyroom T03s earbuds cost in Egypt?', answer: 'T03s Standard: EGP 499. T03s Pro: EGP 699. T03s Pro Max: EGP 1025. All with Golden Code warranty.' },
                        { question: 'What is the difference between T03s and T03s Pro?', answer: 'T03s Pro adds: ANC (noise cancellation), Spatial Audio, longer battery (6h vs 5h), and better sound quality. Worth the EGP 200 difference.' },
                        { question: 'Do Joyroom earbuds work with iPhone 17?', answer: 'Yes 100%! Supports Pop-up Pairing like AirPods, Siri, and all iOS 19 features. Best budget AirPods alternative.' },
                        { question: 'Do Joyroom earbuds work with Samsung S26?', answer: 'Yes! Compatible with all Android devices. Supports Google Assistant and Samsung SmartThings. Strong Bluetooth 5.3 connection.' },
                        { question: 'How do I verify Joyroom earbuds are authentic?', answer: 'Golden Code! Scratch the sticker on the box and send the code via SMS. You will receive instant authenticity confirmation. We are authorized dealers.' },
                        { question: 'How do Joyroom compare to original AirPods?', answer: 'Same features (ANC, Spatial Audio, Pop-up Pairing) but 90% cheaper. Joyroom T03s Pro at EGP 699 vs AirPods Pro at 12,000+ EGP.' },
                        { question: 'What is the battery life of Joyroom earbuds?', answer: 'T03s Pro: 6 hours per bud + 24 hours with charging case. T03s Pro Max: 8 + 32 hours. Easily lasts a full day.' },
                        { question: 'What is the warranty for Joyroom earbuds in Egypt?', answer: 'Golden Code warranty 12 months from Cairo Volt. Instant replacement (not repair!) for manufacturing defects.' },
                        { question: 'Where to buy original Joyroom earbuds in Egypt?', answer: 'From Cairo Volt—authorized dealer. Golden Code, 12-month warranty, next-day Cairo delivery, cash on delivery available.' }
                    ],
                    products: [
                        { name: 'Joyroom T03s Pro', price: 699, badge: ' Bestseller' },
                        { name: 'Joyroom T03s Pro Max', price: 1025, badge: 'ANC Pro' },
                        { name: 'Joyroom T03s', price: 499, badge: 'Budget Choice' },
                    ]
                }
            }
        },
        'power-banks': {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Power Banks',
            metadata: {
                en: {
                    title: 'Joyroom Power Bank Egypt | 20000mAh, 10000mAh',
                    description: 'Shop original Joyroom Power Bank in Egypt. Joyroom 20000mAh, 10000mAh power banks. Affordable quality with warranty. Best prices.',
                    keywords: 'joyroom power bank, joyroom power bank 10000, joyroom power bank 20000, power bank egypt',
                },
                ar: {
                    title: 'باور بانك جوي روم | Joyroom Power Bank Egypt - أسعار 2026',
                    description: 'تسوق باور بانك جوي روم الأصلي في مصر. باور بانك جوي روم 20000 و 10000 مللي أمبير بأفضل الأسعار. باور بانك جيروم.',
                    keywords: 'باور بانك جوي روم 10000, باور بانك جوي روم 20000, باور بانك جيروم, سعر باور بانك joyroom, joyroom power bank',
                }
            },
            seoContent: {
                ar: {
                    title: 'باور بانك جوي روم (The Budget BEAST)',
                    subtitle: 'Joyroom Power Bank - تكنولوجيا الحماية الفائقة',
                    description: `
      نحن نعلم أنك تريد جودة "انكر" ولكن بسعر "جوي روم". باور بانك جوي روم هو المعادلة الصعبة.
      يتميز بخلايا بطارية ليثيوم-بوليمر من الدرجة الأولى (Grade A+)، نفس المستخدمة في الهواتف الرائدة، لضمان عمر أطول ووزن أخف.
      
      **لماذا يثق 3 مليون مصري في باور بانك جوي روم؟**
      - **شحن صاروخي 22.5W:** يشحن ايفون 15/16 حتى 60% في 30 دقيقة.
      - **حماية 9 نقاط:** حماية من الماس الكهربائي، السخونة الزائدة، والتفريغ المفاجئ.
      - **شاشة رقمية (في بعض الموديلات):** لتعرف النسبة بالضبط وليس مجرد لمبات.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'منتج أصلي 100% (باركود)' },
                        { type: 'warranty', text: 'ضمان استبدال فوري' },
                        { type: 'expert_verified', text: 'خلايا بطارية Grade A+' }
                    ],
                    buyingGuide: [
                        {
                            title: 'دليل السعات: 10,000 ولا 20,000؟',
                            content: `
- **موديل 10,000mAh (Slim):** مثالي للجيب. يشحن الايفون مرتين تقريباً. وزنه خفيف جداً.
- **موديل 20,000mAh (Pro):** وحش الطاقة. يشحن الايفون 4-5 مرات. مثالي للسفر أو لو معاك أجهزة كتير.
`
                        },
                        {
                            title: 'تحذير هام: المضروب كتير!',
                            content: `
للأسف، باور بانك جوي روم له تقليد كتير في السوق ببطاريات رديئة (رمل!).
**كيف تعرف الأصلي؟**
1. العلبة الأصلية عليها "خربوش" الكود الذهبي.
2. ملمس الباور بانك الأصلي "مطفى" (Matte) وليس لامع رخيص.
3. الوزن: الأصلي 10,000 وزنه حوالي 230 جرام. المقلد خفيف جداً.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل يؤثر الشحن السريع 22.5W على بطارية الايفون؟',
                            answer: 'لا، لأن جوي روم تستخدم شريحة Smart IC التي تتعرف على الجهاز وتعطيه الفولت المناسب تماماً (مثل الشاحن الأصلي) وتفصل الشحن عند الامتلاء.'
                        },
                        {
                            question: 'هل مسموح به في الطائرة؟',
                            answer: 'نعم، جميع موديلات جوي روم (حتى 20,000) مسموح بها في حقيبة اليد (Handbag) في الطائرات لأنها أقل من 100Wh.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom 10000mAh Slim 22.5W', price: 1624, badge: 'الأكثر مبيعاً' },
                        { name: 'Joyroom 20000mAh Pro 22.5W', price: 997, badge: 'وحش الطاقة' },
                        { name: 'Joyroom MagSafe 10000mAh', price: 850, badge: 'لاسلكي' },
                    ]
                },
                en: {
                    title: 'Joyroom Power Bank - The Budget King',
                    subtitle: 'Premium Safety, Affordable Price',
                    description: `
      We know you want "Anker" quality at a "Joyroom" price. Joyroom Power Banks are the answer.
      Featuring **Grade A+ Li-Polymer cells** (standard in flagship phones), they offer safer charging, lighter weight, and longer lifespan than generic competitors.
      
      **Why Trust Joyroom Power Banks?**
      - **22.5W Rocket Charging:** Charges iPhone 15/16 to 60% in just 30 mins.
      - **9-Point Justice Protection:** Shields against short-circuit, overheating, and over-voltage.
      - **Digital Display:** Know your exact battery percentage (on select models).
    `,
                    trustSignals: [
                        { type: 'originality', text: '100% Original (QR Code)' },
                        { type: 'warranty', text: 'Direct Replacement Warranty' },
                        { type: 'expert_verified', text: 'Grade A+ Battery Cells' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Capacity Guide: 10,000 vs 20,000?',
                            content: `
- **10,000mAh (Slim):** Pocket-friendly. Charges iPhone ~2 times. Ultra-lightweight.
- **20,000mAh (Pro):** The Beast. Charges iPhone 4-5 times. Perfect for travel or multiple devices.
`
                        },
                        {
                            title: 'Safety Warning: Avoid Fakes!',
                            content: `
Fake Joyroom banks are common (often filled with sand!).
**How to Spot Originals?**
1. Check for the **Golden Scratch Code** on the box.
2. Texture: Original is premium Matte, fakes are often cheap glossy plastic.
3. Weight: Original 10k is ~230g. Fakes feel suspiciously light.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Does the 22.5W fast charging hurt my iPhone battery health?',
                            answer: 'No. Joyroom uses a **Smart IC chip** that communicates with your phone to regulate voltage, preventing heat buildup and overcharging.'
                        },
                        {
                            question: 'Is it TSA/Airline Safe?',
                            answer: 'Yes, all Joyroom models (up to 20,000mAh) are fully approved for carry-on luggage on all airlines (under 100Wh).'
                        }
                    ],
                    products: [
                        { name: 'Joyroom 10000mAh Slim 22.5W', price: 1624, badge: 'Best Seller' },
                        { name: 'Joyroom 20000mAh Pro 22.5W', price: 997, badge: 'Power Beast' },
                        { name: 'Joyroom MagSafe 10000mAh', price: 850, badge: 'Wireless' },
                    ]
                }
            }
        },
        'wall-chargers': {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Wall Chargers',
            metadata: {
                en: {
                    title: 'Joyroom Charger Egypt | Fast Charging 20W',
                    description: 'Shop original Joyroom Charger in Egypt. Fast charging 20W, affordable prices. Official warranty.',
                    keywords: 'joyroom charger, joyroom 20w, charger egypt, fast charger',
                },
                ar: {
                    title: 'شاحن جوي روم | Joyroom Charger Egypt - شاحن جيروم سريع',
                    description: 'تسوق شاحن جوي روم الأصلي في مصر. شاحن joyroom, شاحن جيروم سريع, joyroom charger بأفضل الأسعار.',
                    keywords: 'شاحن joyroom, شاحن جوي روم, شاحن جيروم, joyroom charger, شاحن سريع',
                }
            },
            seoContent: {
                ar: {
                    title: 'شواحن جوي روم (The Safe Choice)',
                    subtitle: 'Joyroom Chargers - تكنولوجيا تبريد ذكية',
                    description: `
      شاحن جوي روم هو "الجندي المجهول". يقدم لك نفس أداء الشواحن الباهظة (20W-65W) ولكن بسعر في المتناول.
      يتميز بشريحة **Smart IC** التي توقف الشحن تلقائياً عند امتلاء البطارية، مما يحافظ على صحة بطارية (Battery Health) ايفونك الثمين.
      
      **لماذا يفضل المحترفون شواحن جيروم؟**
      - **تقنية GaN (في موديلات Pro):** حجم أصغر 50% وقوة مضاعفة.
      - **خامات مضادة للحريق:** مصنوع من مادة PC V0 التي تمنع الاشتعال حتى في درجات الحرارة العالية.
      - **متعدد المنافذ:** اشحن اللابتوب والموبايل في نفس الوقت.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'ضمان الوكيل الرسمي' },
                        { type: 'warranty', text: 'آمن على صحة البطارية' },
                        { type: 'expert_verified', text: 'مواد مقاومة للحريق' }
                    ],
                    buyingGuide: [
                        {
                            title: 'اشتري 20W ولا 35W؟',
                            content: `
- **للايفون العادي (11-16):** شاحن 20W أو 25W كافٍ جداً (يشحن 50% في نصف ساعة).
- **للايفون برو ماكس / ايباد:** ننصح بشاحن 30W أو 35W للاستفادة من أقصى سرعة شحن ممكنة (PD 3.0).
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل يسخن الشاحن أثناء الشحن السريع؟',
                            answer: 'من الطبيعي أن يصبح دافئاً، ولكن شواحن جوي روم مزودة بحساس حرارة يفصل الشحن فوراً إذا تجاوزت الحرارة الحد المسموح.'
                        },
                        {
                            question: 'هل يدعم Super Fast Charging لسامسونج؟',
                            answer: 'نعم، الموديلات التي تدعم تقنية PPS (تأكد من المواصفات) تدعم الشحن الخارق لسامسونج.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom 20W PD Charger', price: 236, badge: 'اقتصادي' },
                        { name: 'Joyroom 35W GaN Dual', price: 342, badge: 'الأسرع' },
                        { name: 'Joyroom 65W Laptop Charger', price: 280, badge: 'للابتوب' },
                    ]
                },
                en: {
                    title: 'Joyroom Chargers - Safe & Smart',
                    subtitle: 'Original Performance at Half Price',
                    description: `
      Joyroom Chargers are the "Hidden Gem" of accessories. Get flagship-level charging speeds (20W-65W) without the flagship price tag.
      Equipped with **Smart IC Chips**, they auto-stop charging when full, protecting your precious iPhone Battery Health.
      
      **Why Professionals Choose Joyroom?**
      - **GaN Technology (Pro Models):** 50% smaller size, 3x faster cooling.
      - **Fire-Retardant:** Made from PC V0 materials that resist combustion.
      - **Multi-Port Power:** Charge your MacBook and iPhone simultaneously.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Official Agent Warranty' },
                        { type: 'warranty', text: 'Battery Health Safe' },
                        { type: 'expert_verified', text: 'Fire-Proof Material' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Should I buy 20W or 35W?',
                            content: `
- **For Standard iPhone (11-16):** A 20W or 25W charger is perfect (0-50% in 30 mins).
- **For Pro Max / IPad:** We recommend 30W or 35W to unlock maximum charging potential (PD 3.0).
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Does it get hot?',
                            answer: 'Slight warmth is normal during fast charging. However, Joyroom\'s thermal sensors cut off power instantly if limits are exceeded.'
                        },
                        {
                            question: 'Does it support Samsung Super Fast Charging?',
                            answer: 'Yes, models with PPS support (check specs) fully activate Samsung\'s Super Fast Charging mode.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom 20W PD Charger', price: 236, badge: 'Value' },
                        { name: 'Joyroom 35W GaN Dual', price: 342, badge: 'Fastest' },
                        { name: 'Joyroom 65W Laptop Charger', price: 280, badge: 'Laptop-Ready' },
                    ]
                }
            }
        },
        'cables': {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Cables',
            metadata: {
                en: {
                    title: 'Joyroom Cable Egypt | Lightning, USB-C',
                    description: 'Shop original Joyroom cables in Egypt. Lightning, USB-C cables at affordable prices.',
                    keywords: 'joyroom cable, joyroom lightning cable, joyroom type c cable, cable egypt',
                },
                ar: {
                    title: 'كابل جوي روم | Joyroom Cable Egypt - وصلة جيروم',
                    description: 'تسوق كابل جوي روم الأصلي في مصر. وصلة جيروم للآيفون وتايب سي بأفضل سعر.',
                    keywords: 'كابل جوي روم, وصلة جيروم, وصلة شاحن, كابل شحن',
                }
            },
            seoContent: {
                ar: {
                    title: 'كابلات جوي روم (تكنولوجيا الفصل التلقائي)',
                    subtitle: 'Joyroom Cables - الكابل الوحيد اللي بيخاف على بطاريتك',
                    description: `
      توقف عن شراء وكابلات "شعبية" تتقطع بعد أسبوع. كابلات جوي روم مصممة لتعيش معك وتحمي هاتفك.
      
      **الميزة الحصرية: الفصل التلقائي (Auto-Disconnect):**
      كابلاتنا الذكية (موديلات S-M411) مزودة بشريحة تفصل الكهرباء تماماً عن الهاتف بمجرد وصول الشحن لـ 100%. هذا يعني أنك تقدر تنام وتسيب موبايلك في الشاحن وأنت مطمئن على صحة البطارية (Battery Health).
      
      **المتانة:**
      تصميم **مضفر (Braided)** يتحمل أكثر من 10,000 ثنية، ورؤوس مدعمة بالمعدن لمنع الكسر من المنطقة الحساسة.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'يفصل الشحن تلقائياً' },
                        { type: 'warranty', text: 'ضمان سنة كاملة' },
                        { type: 'expert_verified', text: 'نقل بيانات سريع' }
                    ],
                    buyingGuide: [
                        {
                            title: 'كيف تختار الكابل المناسب؟',
                            content: `
- **S-M411 (للايفون القديم):** كابل قماشي، يدعم الفصل التلقائي، ولمبة LED بتنور لما يشحن وتطفي لما يفصل.
- **Type-C 60W:** مثالي لشحن سامسونج S23/S24 وشحن الايفون 15/16.
- **Type-C 100W:** ضروري جداً لو بتشحن لابتوب (MacBook) أو ايباد برو، عشان تستفيد من السرعة القصوى.
`
                        },
                        {
                            title: 'هل يدعم نقل البيانات؟',
                            content: `
نعم، جميع كابلاتنا تدعم نقل البيانات بسرعة 480Mbps، يعني تقدر تنقل صور وفيديوهات من الايفون للكمبيوتر بسهولة.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'كيف أعرف أن خاصية الفصل التلقائي تعمل؟',
                            answer: 'في الموديلات التي تدعمها، يوجد مؤشر LED. عندما يكتمل الشحن، سينطفئ المؤشر وتتوقف عملية الشحن تماماً.'
                        },
                        {
                            question: 'هل الكابل معتمد من أبل (MFi)؟',
                            answer: 'كابلات جوي روم متوافقة 100% مع أجهزة أبل ولا تظهر رسالة الخطأ (Accessory not supported) بفضل شريحة Smart IC.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom Light Speed (Auto-Stop)', price: 118, badge: 'يحمي البطارية' },
                        { name: 'Joyroom 100W Type-C', price: 123, badge: 'للابتوب' },
                        { name: 'Joyroom 3-in-1 Braided', price: 237, badge: 'عملي' },
                    ]
                },
                en: {
                    title: 'Joyroom Cables (Auto-Disconnect Tech)',
                    subtitle: 'The Only Cable That Protects Your Battery',
                    description: `
      Stop buying cheap cables that destroy your battery health. Joyroom cables are engineered for safety and longevity.
      
      **Exclusive Feature: Auto-Disconnect:**
      Our smart cables (S-M411 Series) contain a chip that completely cuts off power once your phone hits 100%. You can finally sleep while charging without worrying about overcharging or battery degradation.
      
      **Durability:**
      Heavy-duty **Braided Nylon** tested for 10,000+ bends, with reinforced metal heads to prevent fraying.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Auto-Stop Charging' },
                        { type: 'warranty', text: '1 Year Warranty' },
                        { type: 'expert_verified', text: '480Mbps Data Sync' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Choosing the Right Cable',
                            content: `
- **S-M411 (Listing):** Fabric braided, Auto-Disconnect tech, LED indicator (breathing light). Best for iPhone 14 and below.
- **Type-C 60W:** Perfect for Samsung S24 Ultra and iPhone 15/16 Series.
- **Type-C 100W:** Essential for charging MacBooks, iPads, and high-end laptops at full speed.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'How do I know Auto-Disconnect is working?',
                            answer: 'The LED indicator on the connector will turn off specifically when the battery is full and power is cut.'
                        },
                        {
                            question: 'Does it support Data Transfer?',
                            answer: 'Yes, all cables support 480Mbps data transfer, perfect for backing up iPhones to your PC/Mac.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom Light Speed (Auto-Stop)', price: 118, badge: 'Battery Saver' },
                        { name: 'Joyroom 100W Type-C', price: 123, badge: 'Laptop Ready' },
                        { name: 'Joyroom 3-in-1 Braided', price: 237, badge: 'Multi-Use' },
                    ]
                }
            }
        },
        'car-accessories': {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Car Accessories',
            metadata: {
                en: {
                    title: 'Joyroom Car Accessories Egypt | Car Charger, Holder',
                    description: 'Shop Joyroom car accessories in Egypt. Car charger, phone holder. Affordable prices.',
                    keywords: 'joyroom car charger, joyroom car holder, car accessories egypt',
                },
                ar: {
                    title: 'اكسسوارات سيارة جوي روم | Joyroom Car Accessories Egypt',
                    description: 'تسوق اكسسوارات سيارة جوي روم في مصر. شاحن سيارة joyroom, joyroom car holder حامل موبايل للسيارة.',
                    keywords: 'شاحن سيارة joyroom, joyroom car holder, اكسسوارات سيارة, حامل موبايل سيارة',
                }
            },
            seoContent: {
                ar: {
                    title: 'اكسسوارات سيارة جوي روم',
                    subtitle: 'Joyroom Car Accessories - كل ما تحتاجه للسيارة',
                    description: `
      اكتشف **اكسسوارات سيارة جوي روم** في مصر!
      
      **المنتجات المتوفرة:**
      - **شاحن سيارة Joyroom** - شحن سريع
      - **حامل موبايل للسيارة** - Car Holder
    `,
                    products: [
                        { name: 'Joyroom Car Charger', price: 513, badge: 'شحن سريع' },
                        { name: 'Joyroom Car Holder', price: 169, badge: 'مغناطيسي' },
                        { name: 'Joyroom Dashboard Mount', price: 169, badge: 'مثبت' },
                    ]
                },
                en: {
                    title: 'Joyroom Car Accessories',
                    subtitle: 'Everything You Need for Your Car',
                    description: `
      Discover **Joyroom Car Accessories** in Egypt!
      
      **Available Products:**
      - **Joyroom Car Charger** - Fast charging
      - **Car Phone Holder** - Magnetic mount
    `,
                    products: [
                        { name: 'Joyroom Car Charger', price: 513, badge: 'Fast Charge' },
                        { name: 'Joyroom Car Holder', price: 169, badge: 'Magnetic' },
                        { name: 'Joyroom Dashboard Mount', price: 169, badge: 'Dashboard' },
                    ]
                }
            }
        },
        'car-holders': {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Car Holders',
            metadata: {
                en: {
                    title: 'Joyroom Car Phone Holders Egypt | Magnetic Mounts, Air Vent',
                    description: 'Shop Joyroom car phone holders in Egypt. Magnetic mounts, air vent holders, dashboard mounts. Strong grip, 360° rotation. Best prices with warranty.',
                    keywords: 'joyroom car holder, car phone mount, magnetic car holder, air vent mount, حامل جوال سيارة, car mount egypt',
                },
                ar: {
                    title: 'حوامل جوال للسيارة جوي روم | حامل مغناطيسي، حامل تكييف مصر',
                    description: 'تسوق حوامل جوال للسيارة جوي روم في مصر. حوامل مغناطيسية، حوامل فتحة التكييف، حوامل الدتابورد. قبضة قوية، دوران 360 درجة. أفضل سعر مع ضمان.',
                    keywords: 'حامل جوال سيارة, حامل موبايل للسيارة, حامل جوي روم, حامل مغناطيسي, joyroom car holder, car phone mount',
                }
            },
            seoContent: {
                ar: {
                    title: 'حوامل جوال للسيارة جوي روم (مغناطيس N52)',
                    subtitle: 'Joyroom Car Holders - ثبات لا يهتز مع المطبات',
                    description: `
اكتشف **حوامل جوي روم للسيارة** في مصر، الحل الأمثل لتثبيت هاتفك بأمان تام وتجنب مخالفات المرور.
نحن نستخدم مغناطيس **Neodymium N52** (الأقوى عالمياً) لضمان ثبات الهاتف حتى مع أصعب المطبات والطرق غير الممهدة.

**لماذا يختار السائقون حوامل Joyroom؟**
- **قوة تثبيت خرافية:** يتحمل وزن حتى 5 هواتف ايفون 15 برو ماكس.
- **لا يترك أثر:** اللاصق 3M الأصلي يثبت بقوة ولا يترك أي بقايا صمغ على تابلوه سيارتك عند إزالته.
- **دوران 360 درجة:** تحكم كامل في زاوية الرؤية (بالطول أو بالعرض) لسهولة متابعة الـ GPS.
`,
                    trustSignals: [
                        { type: 'originality', text: 'مغناطيس N52 أصلي' },
                        { type: 'warranty', text: 'ضمان استبدال فوري' },
                        { type: 'expert_verified', text: 'ثبات "طرق مصر"' }
                    ],
                    buyingGuide: [
                        {
                            title: 'ايهما تفضل: فتحة التكييف أم التابلوه؟',
                            content: `
- **حامل التكييف (Vent Mount):** الميزة: لا يحجب الرؤية ويحافظ على برودة الهاتف في الصيف. العيب: قد لا يناسب بعض أشكال فتحات التكييف الدائرية الغريبة.
- **حامل التابلوه (Dashboard):** الميزة: حرية وضعه في أي مكان وقرب الهاتف من يدك. نستخدم لاصق Nano Gel قابل للغسل وإعادة الاستخدام.
`
                        },
                        {
                            title: 'هل المغناطيس يضر الهاتف؟',
                            content: `
قطعاً لا. مغناطيسات N52 المستخدمة معزولة ومصممة بحيث تؤثر فقط على القطعة المعدنية ولا تتداخل مع شبكة الهاتف أو الـ GPS أو البطارية.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل يثبت على التابلوه المنحني؟',
                            answer: 'نعم، حامل التابلوه من جوي روم يأتي بقاعدة مرنة (Flex Base) تتشكل حسب انحناءات التابلوه لضمان ثبات كامل.'
                        },
                        {
                            question: 'هل هو متوافق مع جراب MagSafe؟',
                            answer: 'نعم، موديلاتنا الحديثة (السلسلة المغناطيسية) تلصق مباشرة على جرابات MagSafe للايفون 12/13/14/15/16 بدون الحاجة لأي قطعة معدنية إضافية.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom JR-ZS290 (Magnetic)', price: 2550, badge: 'الأكثر مبيعاً' },
                        { name: 'Joyroom Auto-Clamping (Solar)', price: 2550, badge: 'يعمل بالطاقة الشمسية' },
                        { name: 'Joyroom Dashboard 360', price: 169, badge: 'للتابلوه' },
                    ]
                },
                en: {
                    title: 'Joyroom Car Phone Holders (N52 Magnet)',
                    subtitle: 'Unshakable Grip for Rough Roads',
                    description: `
Discover **Joyroom Car Phone Holders** in Egypt, the secure way to mount your phone and drive hands-free.
We use industrial-grade **Neodymium N52 Magnets**, ensuring your phone stays locked in place even on the bumpiest Egyptian roads.

**Why Drivers Choose Joyroom Mounts?**
- **Extreme Hold:** Tested to hold 5x the weight of an iPhone 15 Pro Max.
- **Damage-Free 3M Adhesive:** Strong grip on your dashboard that peels off clean without leaving sticky residue.
- **360° Freedom:** Rotate your phone to portrait or landscape instantly for the perfect GPS view.
`,
                    trustSignals: [
                        { type: 'originality', text: 'Genuine N52 Magnets' },
                        { type: 'warranty', text: 'Instant Replacement Warranty' },
                        { type: 'expert_verified', text: 'Rough Road Tested' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Vent vs. Dashboard: Which to choose?',
                            content: `
- **Air Vent Mount:** Pro: Keeps phone cool with AC and doesn't block windshield view. Con: Might block airflow slightly.
- **Dashboard Mount:** Pro: Flexible positioning closer to your hand. Uses washable/reusable Nano Gel suction cups.
`
                        },
                        {
                            title: 'Does the magnet harm my phone?',
                            content: `
Absolutely not. The N52 magnetic field is closed and shielded, specifically designed to interact with the metal plate without affecting signal, GPS, or battery component.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Will it stick to a curved dashboard?',
                            answer: 'Yes, our Dashboard mounts feature a flexible base pad that molds to the curves of your car interior for maximum vacuum seal.'
                        },
                        {
                            question: 'Does it work with MagSafe cases?',
                            answer: 'Yes! Our magnetic series works native with MagSafe iPhones (12+) and cases without needing to stick the metal plate.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom JR-ZS290 (Magnetic)', price: 2550, badge: 'Best Seller' },
                        { name: 'Joyroom Auto-Clamping (Solar)', price: 2550, badge: 'Solar Powered' },
                        { name: 'Joyroom Dashboard 360', price: 169, badge: 'Dashboard' },
                    ]
                }
            }
        },
        'smart-watches': {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Smart Watches',
            metadata: {
                en: {
                    title: 'Joyroom Smart Watch Egypt | Fitness Tracker',
                    description: 'Shop Joyroom Smart Watch in Egypt. Fitness tracker, health monitoring. Affordable prices.',
                    keywords: 'joyroom smart watch, joyroom watch, fitness tracker, smart watch egypt',
                },
                ar: {
                    title: 'ساعات جوي روم الذكية | Joyroom Smart Watch Egypt',
                    description: 'تسوقاعات جوي روم الذكية في مصر. ساعة ذكية Joyroom بمميزات رائعة وسعر اقتصادي.',
                    keywords: 'ساعة جوي روم, ساعة ذكية, joyroom smart watch, fitness tracker',
                }
            },
            seoContent: {
                ar: {
                    title: 'ساعات جوي روم الذكية (ساعات الاتصال)',
                    subtitle: 'Joyroom Smart Watch - ذكاء وأناقة في معصمك',
                    description: `
      اكتشف **ساعات جوي روم الذكية** في مصر، البديل الاقتصادي الأقوى لساعات ابل وسامسونج.
      
      **لماذا ساعات Joyroom هي الأكثر طلباً؟**
      - **إجراء المكالمات (Bluetooth Calling):** جميع موديلاتنا الحديثة (مثل FT3 Pro و JR-FT5) مزودة بمايك وسبيكر لإجراء المكالمات بوضوح تام من الساعة مباشرة.
      - **دعم اللغة العربية:** قراءة الإشعارات والرسائل والأسماء باللغة العربية السليمة (بدون حروف مقطعة).
      - **بطارية تدوم أيام:** انسى الشحن اليومي. بطارياتنا تدوم من 5 لـ 10 أيام استخدام متواصل.
      - **مقاومة الماء IP68:** آمنة للوضوء، غسل اليدين، والتعرق أثناء الرياضة.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'نسخة جلوبال (Global Version)' },
                        { type: 'warranty', text: 'ضمان سنة ضد عيوب الصناعة' },
                        { type: 'expert_verified', text: 'تدعم العربية 100%' }
                    ],
                    buyingGuide: [
                        {
                            title: 'مقارنة الموديلات: FT3 vs FT5',
                            content: `
- **JR-FT3 Pro (التصميم الدائري):** لمحبي الكلاسيكية. شاشة AMOLED واضحة تحت الشمس، وتصميم معدني قوي.
- **JR-FT5 (التصميم المربع):** شاشة كبيرة جداً (1.83 بوصة) وتصميم يشبه ساعة ابل. مثالية لقراءة الرسائل والتحكم في الموسيقى.
`
                        },
                        {
                            title: 'هل قياسات الصحة دقيقة؟',
                            content: `
ساعات جوي روم توفر قياسات تقريبية ممتازة للرياضة (خطوات، حرق سعرات، نبض) وتساعدك في متابعة نشاطك اليومي، لكنها ليست بديلاً عن الأجهزة الطبية المتخصصة لمرضى القلب والضغط.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل يمكنني تغيير خلفية الساعة بصورتي؟؟',
                            answer: 'نعم، عبر تطبيق الساعة (MoFit أو غيره حسب الموديل) يمكنك اختيار صورة من الجاليري ووضعها كخلفية (Watch Face).'
                        },
                        {
                            question: 'هل الساعة متوافقة مع الايفون؟',
                            answer: 'نعم، تعمل بكفاءة تامة مع الايفون (iOS) والاندرويد. تطبيق الساعة متاح على App Store و Play Store.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom FT3 Pro (Calling)', price: 1092, badge: 'الأكثر مبيعاً' },
                        { name: 'Joyroom FT5 Smart Watch', price: 1092, badge: 'شاشة كبيرة' },
                        { name: 'Joyroom FC2 Classic', price: 1092, badge: 'كلاسيك' },
                    ]
                },
                en: {
                    title: 'Joyroom Smart Watches (Calling Series)',
                    subtitle: 'Style, Intelligence, and Battery Life',
                    description: `
      Discover **Joyroom Smart Watches** in Egypt, the ultimate budget-friendly alternative to premium smartwatches.
      
      **Why Joyroom Watches stand out:**
      - **Bluetooth Calling:** Make and answer calls directly from your wrist with built-in HD mic and speaker (Available on FT3 Pro, FT5).
      - **Full Arabic Support:** Read notifications, messages, and contacts in perfect Arabic.
      - **Long Battery Life:** Say goodbye to daily charging. Enjoy 5-10 days of battery life on a single charge.
      - **IP68 Water Resistance:** Splash-proof design safe for hand washing and workouts.
    `,
                    trustSignals: [
                        { type: 'originality', text: 'Global Version' },
                        { type: 'warranty', text: '1 Year Warranty' },
                        { type: 'expert_verified', text: 'Full Arabic Support' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Model Comparison: FT3 vs FT5',
                            content: `
- **JR-FT3 Pro (Round):** Classic aesthetic with tough metal bezel. better for rugged use.
- **JR-FT5 (Square):** Huge 1.83" display, Apple Watch style. Better for reading texts and controlling media.
`
                        },
                        {
                            title: 'Are health metrics accurate?',
                            content: `
Joyroom watches provide excellent estimation for fitness tracking (Steps, Calories, Heart Rate) perfect for daily motivation. Note: They are not medical-grade devices for patients.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Can I set my photo as a wallpaper?',
                            answer: 'Yes! Through the companion app, you can upload any photo from your gallery to set as a custom Watch Face.'
                        },
                        {
                            question: 'Is it compatible with iPhone?',
                            answer: 'Absolutely. It syncs perfectly with both iPhones (iOS) and Android phones via the official app.'
                        }
                    ],
                    products: [
                        { name: 'Joyroom FT3 Pro (Calling)', price: 1092, badge: 'Best Seller' },
                        { name: 'Joyroom FT5 Smart Watch', price: 1092, badge: 'Big Screen' },
                        { name: 'Joyroom FC2 Classic', price: 1092, badge: 'Classic' },
                    ]
                }
            }
        },
    }
};
