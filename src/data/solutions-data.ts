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
                    en: 'No for USB-C PD. iPhone 15 needs a USB-C PD source. USB-A adapters typically stay near 5–12W and push more conversion heat into the phone path via adapters.',
                    ar: 'لا لشحن USB-C PD. الآيفون 15 يحتاج مصدر USB-C PD. محولات USB-A عادة تبقى حول 5–12 واط وتزيد حرارة التحويل عبر الوصلات.',
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
            en: 'Running GPS, 4G/5G data, and maximum screen brightness consumes circa 12W of power. Standard 10W chargers result in a net negative power draw (battery drain).',
            ar: 'تشغيل الـ GPS وبيانات الهاتف وأقصى سطوع للشاشة يستهلك حوالي 12 واط. استخدام شاحن تقليدي (10 واط) يؤدي إلى استنزاف مستمر للبطارية رغم توصيلها بالشاحن.'
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
            en: 'Many phones now expect USB-C Power Delivery. A legacy USB-A wall brick capped near 5–12W looks “stuck” at low charge rates even when the cable feels fine.',
            ar: 'معظم الهواتف الحديثة تتوقع USB-C Power Delivery. شاحن حائط USB-A قديم محدود بحوالي 5–12 واط يبدو «عالقًا» على شحن بطيء حتى لو بدا الكابل سليمًا.',
        },
        engineeringExplanation: {
            en: 'USB-A ports speak older BC1.2 / proprietary profiles. USB-C PD negotiates higher voltage steps (e.g. 9V) so the same watts arrive with lower current and less cable loss. Replacing only the cable rarely unlocks PD if the wall adapter has no USB-C PD controller.',
            ar: 'منافذ USB-A تتحدث بروفايلات قديمة مثل BC1.2. USB-C PD يتفاوض على خطوات جهد أعلى (مثل 9V) فيصل نفس الواط بتيار أقل وخسارة أقل في الكابل. استبدال الكابل وحده نادرًا يفعّل PD إن كان المحول بلا متحكم USB-C PD.',
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
            en: 'Airlines treat spare lithium batteries (including power banks) as cabin-only items within Wh limits printed on the pack. Capacity in mAh is not Wh: Wh ≈ (mAh × V) / 1000, usually using the pack’s labeled voltage (often ~3.6–3.7V for cells). Some carriers restrict in-flight use of power banks even when carriage is allowed — always follow your ticketed airline’s current page.',
            ar: 'شركات الطيران تعامل بطاريات الليثيوم الاحتياطية (ومنها الباور بانك) كعناصر مقصورة فقط ضمن حدود الـ Wh المطبوعة. المللي أمبير ليست واط-ساعة: Wh ≈ (mAh × V) / 1000 حسب جهد الملصق (غالبًا ~3.6–3.7V للخلايا). بعض الناقلات تمنع الاستخدام أثناء الرحلة حتى مع السماح بالحمل — اتبع صفحة شركتك الحالية.',
        },
        steps: {
            en: [
                'Read the Wh (or V + mAh) label on the bank before you fly.',
                'Pack power banks in carry-on only — never in checked baggage.',
                'Prefer ≤100Wh units for simplest acceptance; 100–160Wh often needs airline approval.',
                'Check your airline’s in-flight use policy (carriage ≠ permission to use mid-flight).',
                'Buy a current, non-recalled model from a trusted seller and keep the rating label visible.',
            ],
            ar: [
                'اقرأ ملصق Wh (أو V + mAh) قبل السفر.',
                'ضع الباور بانك في اليد فقط — لا في الشحن أبدًا.',
                'فضّل وحدات ≤100Wh لقبول أبسط؛ 100–160Wh غالبًا تحتاج موافقة الناقلة.',
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
                    en: 'Only if your airline allows it. Some Gulf carriers have restricted in-flight power-bank use even when carriage is fine — check before you rely on it.',
                    ar: 'فقط إن سمحت شركتك. بعض ناقلات الخليج قيّدت الاستخدام أثناء الرحلة مع بقاء الحمل مسموحًا — تحقق قبل الاعتماد عليه.',
                },
            },
        ],
        recommendedProductSlugs: [
            'anker-zolo-a110e-20000',
            'anker-zolo-a110d-10000',
            'anker-powercore-10000',
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
