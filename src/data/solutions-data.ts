export interface SolutionFaq {
    question: { en: string; ar: string };
    answer: { en: string; ar: string };
}

export interface UserSolution {
    id: string;
    slug: string;
    searchQuery: {
        en: string;
        ar: string;
    };
    problemStatement: {
        en: string;
        ar: string;
    };
    engineeringExplanation: {
        en: string;
        ar: string;
    };
    /** Short actionable checklist shown on-page (and optional HowTo steps). */
    steps: {
        en: string[];
        ar: string[];
    };
    faqs: SolutionFaq[];
    /**
     * Measured evidence from CairoVolt's lab, rendered with a link to the
     * product page it was measured on. Only text that is present in that
     * product's details/bench sheet belongs here.
     */
    labEvidence?: {
        productSlug: string;
        text: { en: string; ar: string };
    };
    /**
     * The blog article that covers this problem in depth. Rendered as a
     * contextual "read more" link only while the slug is live in the blog
     * index, so a scheduled article can never be linked early.
     */
    deepDiveBlogSlug?: string;
    recommendedProductSlugs: string[];
    /** Related solution slugs (same field as URL segment), never internal ids. */
    relatedSolutions: string[];
}

// Solution Routing
// Captures specific user questions and maps them to technical solutions.
// recommendedProductSlugs MUST be active catalog SKUs that match the engineering claim.
export const solutionsDB: UserSolution[] = [
    {
        id: 'iphone-15-overheating-car',
        slug: 'iphone-15-pro-max-car-overheating-solution',
        searchQuery: {
            en: 'Why does my iPhone 15 Pro Max overheat in the car charger',
            ar: 'حل مشكلة سخونة الايفون 15 برو ماكس في شاحن السيارة'
        },
        problemStatement: {
            en: 'High ambient temperatures in Egypt combined with inefficient 5V/1A legacy car chargers cause thermal throttling and battery degradation in modern iPhones.',
            ar: 'درجات الحرارة المرتفعة في مصر مع استخدام شواحن سيارة قديمة (5V/1A) تسبب اختناق حراري وتدهور سريع لبطارية الآيفون.'
        },
        engineeringExplanation: {
            en: 'The solution requires a Power Delivery (PD) 3.0 car charger with PPS where the phone supports it, so the charger negotiates voltage/current and shifts conversion heat off the phone’s power-management IC. Pair it with a USB-C cable rated for the negotiated power — a USB-A-only car adapter cannot provide USB-C PD/PPS.',
            ar: 'الحل يتطلب شاحن سيارة USB-C بدعم Power Delivery (PD) 3.0 وPPS إن كان الهاتف يدعمها، حتى يتفاوض الشاحن على الجهد/التيار وينقل حرارة التحويل بعيدًا عن دائرة إدارة الطاقة داخل الهاتف. اربطه بكابل USB-C يتحمل القدرة المتفاوض عليها — شاحن سيارة USB-A فقط لا يوفّر USB-C PD/PPS.'
        },
        steps: {
            en: [
                'Confirm your car socket works and remove any USB-A-only cigarette adapter.',
                'Use a USB-C PD car charger (ideally with PPS) rated for your phone’s peak negotiated power.',
                'Use a USB-C cable rated for that power — cheap unmarked cables often force lower negotiation.',
                'While navigating, lower screen brightness and avoid MagSafe/wireless charging in summer heat.',
                'If the phone still throttles, pause charging until cabin temperature drops; heat + Maps is the real load.',
            ],
            ar: [
                'تأكد أن مقبس السيارة يعمل وأزل أي محول ولاعة USB-A فقط.',
                'استخدم شاحن سيارة USB-C PD (ويُفضّل مع PPS) بقدرة تناسب تفاوض هاتفك.',
                'استخدم كابل USB-C يتحمل نفس القدرة — الكابلات الرخيصة غير المعلّمة غالبًا تخفّض التفاوض.',
                'أثناء الملاحة خفّض السطوع وتجنّب الشحن اللاسلكي/MagSafe في حر الصيف.',
                'إذا استمر الاختناق الحراري، أوقف الشحن حتى تنخفض حرارة المقصورة؛ الحرارة + الخرائط هما الحمل الحقيقي.',
            ],
        },
        faqs: [
            {
                question: {
                    en: 'Is a USB-A car charger enough for iPhone 15?',
                    ar: 'هل شاحن السيارة USB-A يكفي للآيفون 15؟',
                },
                answer: {
                    en: 'Not for fast charging. A USB-A charger limits the iPhone 15 to USB-A charging rates; fast charging needs a USB-C charger that supports USB Power Delivery — Apple lists 18W or higher (support.apple.com/en-us/102574).',
                    ar: 'ليس للشحن السريع. شاحن USB-A يحصر الآيفون 15 في معدلات شحن USB-A؛ والشحن السريع يحتاج شاحن USB-C يدعم USB Power Delivery — وتذكر Apple قدرة 18 واط أو أعلى (support.apple.com/en-us/102574).',
                },
            },
            {
                question: {
                    en: 'Why does Egypt heat make this worse?',
                    ar: 'لماذا يزداد الأمر سوءًا مع حر مصر؟',
                },
                answer: {
                    en: 'Cabin temperatures often exceed the phone’s comfortable thermal envelope. Any inefficient charger adds conversion heat on top of GPS, cellular radio, and a bright screen.',
                    ar: 'حرارة المقصورة غالبًا تتجاوز النطاق الحراري المريح للهاتف. أي شاحن غير كفء يضيف حرارة تحويل فوق GPS والشبكة والسطوع العالي.',
                },
            },
            {
                question: {
                    en: 'Do I need PPS specifically?',
                    ar: 'هل أحتاج PPS تحديدًا؟',
                },
                answer: {
                    en: 'PD is the baseline. PPS helps some Android phones more than iPhone, but a quality PD 3.0 car charger still reduces heat versus legacy 5V adapters.',
                    ar: 'PD هو الأساس. PPS يفيد بعض أجهزة أندرويد أكثر من الآيفون، لكن شاحن سيارة PD 3.0 جيد ما زال يقلل الحرارة مقابل محولات 5V القديمة.',
                },
            },
        ],
        deepDiveBlogSlug: 'car-phone-holder-cooling-fan-summer-protection',
        recommendedProductSlugs: [
            'joyroom-60w-car-charger',
            'joyroom-usb-c-cable-60w',
        ],
        relatedSolutions: [
            'battery-drains-while-plugged-in-using-google-maps',
            'usb-a-charger-too-slow-for-modern-phone',
        ],
    },
    {
        id: 'slow-charging-maps-navigation',
        slug: 'battery-drains-while-plugged-in-using-google-maps',
        searchQuery: {
            en: 'Battery drains while charging when using Google Maps',
            ar: 'البطارية بتنقص والموبايل في الشاحن اثناء تشغيل الخرائط'
        },
        problemStatement: {
            en: 'Navigation, mobile data and full brightness together can draw more than a low-output charger supplies, so the battery may still fall while plugged in.',
            ar: 'الملاحة وبيانات الهاتف وأقصى سطوع للشاشة معًا قد تسحب أكثر مما يوفره شاحن منخفض القدرة، فتستمر نسبة البطارية في النزول رغم توصيل الشاحن.'
        },
        engineeringExplanation: {
            en: 'To keep a positive net charge during intensive navigation, use a USB-C PD source of at least ~20W — typically a PD car charger in the vehicle, or a ≥20W PD wall charger when parked/at home. Legacy USB-A ~10W adapters usually cannot outpace Maps + GPS + bright screen draw.',
            ar: 'للحفاظ على شحن صافٍ إيجابي أثناء الملاحة المكثفة، استخدم مصدر USB-C PD بقدرة حوالي 20 واط على الأقل — عادة شاحن سيارة PD داخل المركبة، أو شاحن حائط PD ≥20 واط عند التوقف/المنزل. محولات USB-A التقليدية ~10 واط غالبًا لا تتجاوز استهلاك الخرائط + GPS + السطوع العالي.'
        },
        steps: {
            en: [
                'Measure the symptom: battery % falling while “charging” during Maps.',
                'Switch to a USB-C PD charger rated ≥20W (car or wall).',
                'Use a known-good USB-C cable rated for PD, not a USB-A→C dongle chain.',
                'Drop brightness one notch and close background maps mirrors if unused.',
                'For long trips, prefer a PD car charger so cabin power keeps up with continuous GPS.',
            ],
            ar: [
                'راقب العرض: نسبة البطارية تنخفض أثناء «الشحن» مع الخرائط.',
                'انتقل لشاحن USB-C PD بقدرة ≥20 واط (سيارة أو حائط).',
                'استخدم كابل USB-C PD سليمًا، لا سلسلة USB-A→C ضعيفة.',
                'خفّض السطوع قليلًا وأغلق نوافذ الخرائط المكررة إن وُجدت.',
                'للرحلات الطويلة فضّل شاحن سيارة PD حتى يواكب GPS المستمر.',
            ],
        },
        faqs: [
            {
                question: {
                    en: 'Why does the phone say Charging but % still drops?',
                    ar: 'لماذا يظهر Charging والنسبة تنقص؟',
                },
                answer: {
                    en: 'Input power is below instantaneous load. The UI shows a charge path is connected; it does not guarantee net-positive watts.',
                    ar: 'قدرة الدخل أقل من الحمل اللحظي. الواجهة تعني أن مسار الشحن متصل، ولا تضمن واطًا صافيًا موجبًا.',
                },
            },
            {
                question: {
                    en: 'Is 20W always enough for Maps?',
                    ar: 'هل 20 واط يكفي دائمًا للخرائط؟',
                },
                answer: {
                    en: 'Usually yes for phones. Extreme heat, wireless charging, hotspot, and max brightness can still push load higher — then use a higher-watt PD source or reduce screen load.',
                    ar: 'عادة نعم للهواتف. الحر الشديد أو الشحن اللاسلكي أو الهوتسبوت مع أقصى سطوع قد يرفع الحمل — استخدم مصدر PD أعلى أو خفّض حمل الشاشة.',
                },
            },
            {
                question: {
                    en: 'Wall charger or car charger?',
                    ar: 'شاحن حائط أم شاحن سيارة؟',
                },
                answer: {
                    en: 'In the vehicle use a PD car charger. At home/parked, a ≥20W PD wall charger is fine. Match the cable to the port.',
                    ar: 'داخل المركبة استخدم شاحن سيارة PD. في المنزل/التوقف يكفي شاحن حائط PD ≥20 واط. طابق الكابل مع المنفذ.',
                },
            },
        ],
        labEvidence: {
            productSlug: 'anker-a2741-charger-30w',
            text: {
                en: 'In our A2741 bench, the Anker 30W USB-C PD car charger added +34 percentage points to an iPhone 15 (42% → 76%) over a 90-minute stop-start drive from New Cairo to 6th of October with Google Maps and a ride-hailing driver app running.',
                ar: 'في اختبارنا لشاحن انكر A2741 للسيارة (USB-C PD بقدرة 30 واط) زادت بطارية iPhone 15 بمقدار 34 نقطة مئوية (من 42% إلى 76%) خلال 90 دقيقة من القيادة المتقطعة من القاهرة الجديدة إلى 6 أكتوبر مع تشغيل Google Maps وتطبيق سائق.',
            },
        },
        deepDiveBlogSlug: 'why-phone-charging-slowly-causes-solutions',
        recommendedProductSlugs: [
            'joyroom-60w-car-charger',
            'joyroom-20w-usb-c-charger',
        ],
        relatedSolutions: [
            'iphone-15-pro-max-car-overheating-solution',
            'usb-a-charger-too-slow-for-modern-phone',
        ],
    },
    {
        id: 'usb-a-too-slow',
        slug: 'usb-a-charger-too-slow-for-modern-phone',
        searchQuery: {
            en: 'Why is my USB-A charger so slow on a modern phone',
            ar: 'لماذا شاحن USB-A بطيء جدًا على الموبايل الحديث',
        },
        problemStatement: {
            en: 'Many phones now expect USB-C Power Delivery. A USB-A charger limits the phone to USB-A charging rates, so it looks “stuck” at a low charge rate even when the cable feels fine.',
            ar: 'معظم الهواتف الحديثة تتوقع USB-C Power Delivery. شاحن USB-A يحصر الهاتف في معدلات شحن USB-A، فيبدو «عالقًا» على شحن بطيء حتى لو بدا الكابل سليمًا.',
        },
        engineeringExplanation: {
            en: 'USB-A ports speak older BC1.2 / proprietary profiles. USB-C PD negotiates higher voltage steps (e.g. 9V) so the same watts arrive with lower current and less cable loss. Replacing only the cable rarely unlocks PD if the wall adapter has no USB-C PD controller. For iPhone fast charging, Apple lists a USB-C power adapter that supports USB-PD at 18W or higher (support.apple.com/en-us/102574).',
            ar: 'منافذ USB-A تتحدث بروفايلات قديمة مثل BC1.2. USB-C PD يتفاوض على خطوات جهد أعلى (مثل 9V) فيصل نفس الواط بتيار أقل وخسارة أقل في الكابل. استبدال الكابل وحده نادرًا يفعّل PD إن كان المحول بلا متحكم USB-C PD. ولشحن الآيفون السريع تذكر Apple محول USB-C يدعم USB-PD بقدرة 18 واط أو أعلى (support.apple.com/en-us/102574).',
        },
        steps: {
            en: [
                'Check the wall adapter: if it only has USB-A, it cannot do USB-C PD.',
                'Move to a USB-C PD wall charger rated for your phone (often 20–45W for phones).',
                'Use a USB-C to USB-C (or USB-C to Lightning on older iPhones) cable rated for that power.',
                'Avoid daisy-chained hubs and damaged cables that fail PD negotiation.',
                'Confirm the phone shows a fast-charge / PD state under its own OS wording.',
            ],
            ar: [
                'افحص المحول: إن كان USB-A فقط فلن يقدّم USB-C PD.',
                'انتقل لشاحن حائط USB-C PD يناسب هاتفك (غالبًا 20–45 واط للهواتف).',
                'استخدم كابل USB-C→USB-C (أو USB-C→Lightning على آيفون أقدم) يتحمل القدرة.',
                'تجنّب الـ hubs المتسلسلة والكابلات التالفة التي تفشل تفاوض PD.',
                'تأكد أن النظام يعرض حالة شحن سريع/PD حسب صياغته.',
            ],
        },
        faqs: [
            {
                question: {
                    en: 'Can a “fast” USB-A cable fix this?',
                    ar: 'هل كابل USB-A «سريع» يحل المشكلة؟',
                },
                answer: {
                    en: 'Only up to what the USB-A adapter can advertise. Without a PD source, you stay in the low-watt regime.',
                    ar: 'فقط حتى ما يستطيع محول USB-A الإعلان عنه. بلا مصدر PD تبقى في نطاق الواط المنخفض.',
                },
            },
            {
                question: {
                    en: 'Do I need 45W for a phone?',
                    ar: 'هل أحتاج 45 واط للهاتف؟',
                },
                answer: {
                    en: 'Phones usually peak well below 45W. A honest 20–30W PD charger covers most phones; higher wattage helps if you also charge tablets/laptops on the same brick.',
                    ar: 'الهواتف غالبًا أقل من 45 واط. شاحن PD صادق 20–30 واط يكفي معظم الهواتف؛ القدرة الأعلى تفيد إن شحنت تابلت/لابتوب من نفس المحول.',
                },
            },
        ],
        deepDiveBlogSlug: 'travel-charger-usb-c-usb-a-sahel-trip',
        recommendedProductSlugs: [
            'anker-powerport-20w',
            'anker-nano-45w',
            'anker-a8050-usb-c-cable',
        ],
        relatedSolutions: [
            'battery-drains-while-plugged-in-using-google-maps',
            'iphone-15-pro-max-car-overheating-solution',
        ],
    },
    {
        id: 'power-bank-flight-rules',
        slug: 'power-bank-airline-rules-egypt-travel',
        searchQuery: {
            en: 'Can I take a power bank on a plane from Egypt',
            ar: 'هل أقدر آخذ باور بانك في الطيارة من مصر',
        },
        problemStatement: {
            en: 'Travelers mix cabin vs checked-bag rules, Wh labels, and in-flight use bans — then buy the wrong capacity or pack the bank in checked luggage.',
            ar: 'المسافر يخلط قواعد المقصورة مقابل الشحن، وملصق الـ Wh، وحظر الاستخدام أثناء الرحلة — فيشتري سعة خاطئة أو يضع البنك في الشحن.',
        },
        engineeringExplanation: {
            en: 'Airlines treat spare lithium batteries (including power banks) as cabin-only items within Wh limits printed on the pack. Capacity in mAh is not Wh: Wh ≈ (mAh × V) / 1000, usually using the pack’s labeled voltage (often ~3.6–3.7V for cells). Under IATA and FAA rules, power banks up to 100Wh are generally allowed in carry-on without approval, 100–160Wh needs airline approval, and over 160Wh is not allowed in passenger baggage. Some carriers also restrict in-flight use even when carriage is allowed: Emirates has banned using any power bank onboard since 1 October 2025, while still allowing one power bank under 100Wh to be carried — always follow your ticketed airline’s current page.',
            ar: 'شركات الطيران تعامل بطاريات الليثيوم الاحتياطية (ومنها الباور بانك) كعناصر مقصورة فقط ضمن حدود الـ Wh المطبوعة. المللي أمبير ليست واط-ساعة: Wh ≈ (mAh × V) / 1000 حسب جهد الملصق (غالبًا ~3.6–3.7V للخلايا). وفق قواعد IATA وFAA يُسمح عادةً بالباور بانك حتى 100Wh في حقيبة اليد بدون موافقة، ومن 100 إلى 160Wh يحتاج موافقة الناقلة، وأكثر من 160Wh غير مسموح في أمتعة الركاب. وبعض الناقلات تمنع الاستخدام أثناء الرحلة حتى مع السماح بالحمل: طيران الإمارات منعت تشغيل أي باور بانك على متن رحلاتها منذ 1 أكتوبر 2025، مع السماح بحمل باور بانك واحد أقل من 100Wh — اتبع صفحة شركتك الحالية.',
        },
        steps: {
            en: [
                'Read the Wh (or V + mAh) label on the bank before you fly.',
                'Pack power banks in carry-on only — never in checked baggage.',
                'Prefer ≤100Wh units for simplest acceptance; 100–160Wh needs airline approval, and over 160Wh is not allowed in passenger baggage.',
                'Check your airline’s in-flight use policy (carriage ≠ permission to use mid-flight).',
                'Buy a current, non-recalled model from a trusted seller and keep the rating label visible.',
            ],
            ar: [
                'اقرأ ملصق Wh (أو V + mAh) قبل السفر.',
                'ضع الباور بانك في اليد فقط — لا في الشحن أبدًا.',
                'فضّل وحدات ≤100Wh لقبول أبسط؛ 100–160Wh تحتاج موافقة الناقلة، وأكثر من 160Wh غير مسموح في أمتعة الركاب.',
                'راجع سياسة الاستخدام أثناء الرحلة (الحمل ≠ الإذن بالتشغيل).',
                'اشترِ موديلًا حاليًا غير مُستدعى من بائع موثوق وأبقِ الملصق ظاهرًا.',
            ],
        },
        faqs: [
            {
                question: {
                    en: 'Is 20,000mAh always under 100Wh?',
                    ar: 'هل 20,000 مللي أمبير دائمًا أقل من 100Wh؟',
                },
                answer: {
                    en: 'Usually yes at ~3.6–3.7V labeled cell voltage, but trust the printed Wh on the unit. Do not invent Wh from marketing mAh alone.',
                    ar: 'غالبًا نعم عند جهد خلية معلن ~3.6–3.7V، لكن اعتمد Wh المطبوع على الوحدة. لا تحسب Wh من مللي أمبير التسويق وحدها.',
                },
            },
            {
                question: {
                    en: 'Can I use the bank to charge during the flight?',
                    ar: 'هل أقدر أشغّل البنك أثناء الرحلة؟',
                },
                answer: {
                    en: 'Only if your airline allows it. Emirates, for example, has banned using any power bank onboard since 1 October 2025 even though carrying one under 100Wh is still allowed — check your airline before you rely on it.',
                    ar: 'فقط إن سمحت شركتك. طيران الإمارات مثلًا منعت تشغيل أي باور بانك على متن رحلاتها منذ 1 أكتوبر 2025 رغم السماح بحمل واحد أقل من 100Wh — راجع شركتك قبل الاعتماد عليه.',
                },
            },
        ],
        deepDiveBlogSlug: 'power-bank-airplane-rules-egypt-2026',
        // The recalled A1263 PowerCore 10000 is not recommended here: the two
        // Zolo packs already cover the airline use case without a recall caveat.
        recommendedProductSlugs: [
            'anker-zolo-a110e-20000',
            'anker-zolo-a110d-10000',
        ],
        relatedSolutions: [
            'usb-a-charger-too-slow-for-modern-phone',
        ],
    },
];

export function getSolutionBySlug(slug: string): UserSolution | undefined {
    return solutionsDB.find(p => p.slug === slug);
}

export function getSolutionByIdOrSlug(idOrSlug: string): UserSolution | undefined {
    return solutionsDB.find(p => p.slug === idOrSlug || p.id === idOrSlug);
}
