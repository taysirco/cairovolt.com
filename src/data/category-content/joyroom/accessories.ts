import type { CategoryContent } from '../_types';

// Joyroom "Accessories" shelf. Opened for the JR-X15 Pro iPad stylus, which had no
// honest home among the existing Joyroom categories (audio / power-banks /
// wall-chargers / cables / car-*). Mirrors the Anker accessories shelf, which holds
// the A7166 stylus. Every figure here is attributed to its publisher — CairoVolt has
// not bench-tested the stylus, so no measured number appears on this page.
export const joyroom_accessories_content: CategoryContent = {
    brand: 'Joyroom',
    brandColor: 'red',
    categoryName: 'Accessories',
    metadata: {
        en: {
            title: 'Joyroom Accessories Egypt | JR-X15 Pro iPad Stylus Pen',
            description: 'Joyroom accessories in Egypt, led by the JR-X15 Pro active capacitive stylus for iPad: tilt sensitivity, magnetic parking on the iPad rail, USB-C 15-minute charge and replaceable tips. Check your iPad A-number first.',
            keywords: 'joyroom accessories, joyroom stylus, joyroom jr-x15, joyroom jr-x15 pro, joyroom stylus pen egypt, ipad stylus egypt, apple pencil alternative egypt, ipad pen egypt, active capacitive stylus, joyroom pen price egypt',
        },
        ar: {
            title: 'قلم جوي روم للايباد | اكسسوارات جوي روم Joyroom مصر',
            description: 'اعرف مواصفات قلم جوي روم JR-X15 Pro الفعّال للايباد: حساسية ميل وتثبيت مغناطيسي وشحن USB-C في 15 دقيقة وأطراف بديلة. اتأكد من رقم A بتاع الايباد قبل الطلب، وضمان كايرو فولت موضح في صفحة المنتج.',
            keywords: 'قلم جوي روم, قلم جوي روم للايباد, اكسسوارات جوي روم, قلم ايباد, سعر قلم ايباد في مصر, قلم ستايلس مصر, بديل قلم ابل مصر, بديل apple pencil, قلم ايباد مغناطيسي, قلم ايباد للطلبة, joyroom jr-x15 pro, سعر قلم جوي روم',
        }
    },
    pageContent: {
        ar: {
            title: 'اكسسوارات جوي روم وقلم JR-X15 Pro للايباد',
            subtitle: 'قلم ستايلس فعّال بشحن USB-C — اتأكد من رقم A بتاع الايباد قبل ما تطلب',
            description: `
قسم **اكسسوارات جوي روم** في كايرو فولت بيضم حالياً قلم **جوي روم JR-X15 Pro** للايباد: قلم ستايلس فعّال (Active Capacitive) بيشتغل مباشرة عبر شاشة الايباد **بدون اقتران بلوتوث**، بحساسية ميل معلنة من الشركة، وتثبيت مغناطيسي على حافة الايباد، ومؤشر LED من ثلاث نقاط، وشحن عبر منفذ **USB-C** أعلى جسم القلم.

**تلات حاجات لازم تكون واضحة قبل الشراء:**
- **المغناطيس للحفظ مش للشحن.** القلم بيلزق على حافة الايباد عشان مايضيعش، لكن الشحن بيتم عبر USB-C. ده مختلف عن Apple Pencil 2 اللي بيشحن على الحافة فعلاً.
- **ميل نعم، ضغط لا.** جوي روم بتذكر حساسية الميل. أما حساسية الضغط فمش موجودة — نظام iPadOS بيوفّرها لأقلام فئة Apple Pencil فقط، فمفيش قلم من طرف تالت في الفئة دي بيقدمها. مناسب للمذاكرة وتعليق PDF والتوقيع والرسم الخطي، ومش مناسب للرسم المعتمد على الضغط.
- **للايباد فقط.** القلم مش بديل لقلم S-Pen ومش مصمم لتابلت سامسونج أو شاومي أو ويندوز.

**قبل ما تشتري:** افتح **الإعدادات ← عام ← حول** واقرأ **رقم الموديل** (بيبدأ بحرف A)، وقارنه بجدول التوافق المطبوع على العلبة والموجود كامل في صفحة المنتج. الجدول بيغطي أجيال الايباد من 2018 لـ 2021، والأجهزة الأحدث مش موجودة فيه.

**ضمان كايرو فولت:** التغطية والمدة والاستبدال حسب المكتوب في صفحة المنتج وسياسة الضمان، والتوصيل تقديري بعد تأكيد العنوان مع إتاحة الدفع عند الاستلام للطلبات المؤهلة. ولو محتاج كابل أو شاحن USB-C للقلم، شوف [كابلات جوي روم](/joyroom/cables) و[شواحن جوي روم](/joyroom/wall-chargers).
    `,
            qualityBadges: [
                { type: 'originality', text: 'رقم الموديل المطبوع على العلبة موضح في صفحة المنتج' },
                { type: 'warranty', text: 'ضمان كايرو فولت حسب صفحة المنتج والسياسة' },
                { type: 'expert_verified', text: 'التوافق يعتمد على رقم A بتاع الايباد والتطبيق' }
            ],
            buyingGuide: [
                {
                    title: 'إزاي تختار قلم ايباد صح من غير ما ترجّعه؟',
                    content: `
1. **ابدأ برقم A مش باسم الجهاز.** «iPad Air» لوحدها بتشمل أجيال موجودة في القائمة وأجيال مش موجودة. اقرأ الرقم من الإعدادات ← عام ← حول.
2. **حدد شغلك: كتابة ولا رسم بالضغط؟** للكتابة والتعليق والتوقيع والرسم الخطي، القلم الفعّال بيأدي الغرض. للرسم المعتمد على منحنيات الضغط، محتاج Apple Pencil ومفيش بديل.
3. **اسأل: المغناطيس بيشحن ولا بيحفظ؟** في الفئة دي غالباً بيحفظ بس. اقرأ منفذ الشحن في المواصفات.
4. **دوّر على أطراف بديلة.** الطرف هو الجزء اللي بيستهلك، والطرف المستهلك هو اللي بيخرمش سكرين بروتكتور الشاشة. قلم بأطراف بقلاووظ متاحة أرخص على المدى الطويل.
5. **متفترضش دعم أندرويد.** الأقلام الفعّالة مضبوطة على شاشة رقمية معينة؛ قلم الايباد مش بديل لـ S-Pen.
6. **الفاتورة والضمان.** احتفظ بفاتورة كايرو فولت وراجع المدة والشروط في صفحة المنتج والسياسة.
`
                },
                {
                    title: 'توافق الايباد بأرقام A — الجدول المطبوع على العلبة',
                    content: `
| فئة الايباد | أرقام A المدعومة |
|--------|---------|
| **iPad Pro 12.9 بوصة** | A2229 · A2069 · A2232 · A2233 · A1876 · A2014 · A1895 · A1983 · A2378 · A2379 · A2461 · A2462 |
| **iPad Pro 11 بوصة** | A1980 · A2013 · A1934 · A1979 · A2228 · A2068 · A2230 · A2231 · A2377 · A2301 · A2459 · A2460 |
| **iPad Air الجيل 3 و4** | A2152 · A2123 · A2153 · A2154 · A2316 · A2324 · A2325 · A2072 |
| **iPad الجيل 6 و7 و8 و9** | A1893 · A1954 · A2197 · A2200 · A2198 · A2270 · A2602 · A2603 · A2604 · A2605 |
| **iPad mini الجيل 5 و6** | A2133 · A2124 · A2126 · A2125 · A2567 · A2568 · A2569 |

**ملاحظة:** الجيل التامن مذكور بموديل الواي فاي A2270 بس؛ وموديلات الجيل التامن بشريحة اتصال (A2428/A2429/A2430) نفس الجهاز لكنها مش مطبوعة في الجدول.

**غير موجود في القائمة المطبوعة:** الايباد الجيل العاشر، وiPad Air بمعالج M1/M2، وiPad Pro بمعالج M2/M4، وiPad mini الجيل السابع. اسألنا قبل الطلب لو عندك واحد منها بدل ما تفترض إن الأحدث مدعوم تلقائياً.
`
                },
                {
                    title: 'مواصفات الموديل المعروض: JR-X15 Pro',
                    content: `
| البند | JR-X15 Pro (قلم ستايلس فعّال) |
|--------|---------|
| **نوع القلم** | Active Capacitive — بدون اقتران بلوتوث وبدون اعتماد MFi |
| **الشحن** | USB-C أعلى الجسم — **المغناطيس لا يشحن القلم** |
| **البطارية** | 130 مللي أمبير (بيان جوي روم)؛ بعض المتاجر تطبع 125 مللي أمبير |
| **مدة الاستخدام** | ~10 ساعات (بيان جوي روم)؛ صفحات أخرى تطبع 9 أو 12 ساعة |
| **زمن الشحن** | 15 دقيقة (بيان جوي روم)؛ صفحات «Pro» تطبع ~30 دقيقة |
| **حساسية الميل** | نعم — بيان مصنّع، والسلوك يعتمد على التطبيق |
| **حساسية الضغط** | لا — يحصرها iPadOS في أقلام فئة Apple Pencil |
| **المؤشر** | ثلاث نقاط LED لمستوى الشحن |
| **الأطراف** | بديلة بقلاووظ؛ العلبة تطبع «×4» وشريحة المصنّع تقول «طرفان احتياطيان» — عُدّها عند الاستلام |
| **المقاس والوزن** | 166 ملم × قطر 9 ملم · 15 جرام (بيان جوي روم) |
| **المعرّفات** | MPN: JR-X15 (طباعة العلبة) · SKU المتجر: JX01 |

**ملاحظة:** ده الموديل الوحيد المعروض في القسم حالياً. كل الأرقام أعلاه منسوبة لناشرها — كايرو فولت لم تختبر هذا الموديل معملياً ولا تعرض أي رقم منه كقياس خاص بها.
`
                }
            ],
            faq: [
                {
                    question: 'قلم جوي روم بيشحن لما ألزقه في الايباد؟',
                    answer: 'لا. المغناطيس بيثبّت القلم على حافة الايباد للحفظ ومنع الضياع فقط، والشحن بيتم عبر منفذ USB-C أعلى جسم القلم. Apple Pencil 2 هو اللي بيشحن على الحافة، والقلم ده بيتخزّن عليها.'
                },
                {
                    question: 'هل قلم جوي روم فيه حساسية ضغط زي Apple Pencil؟',
                    answer: 'لا. جوي روم بتذكر حساسية الميل مش الضغط، ونظام iPadOS بيبلّغ عن ضغط القلم الحقيقي لأجهزة فئة Apple Pencil فقط. يعني مفيش قلم ستايلس فعّال من طرف تالت في الفئة دي بيقدر يوفّرها، مهما كان الإعلان بيقول إيه.'
                },
                {
                    question: 'هل القلم بيشتغل على تابلت سامسونج أو أندرويد؟',
                    answer: 'لا. ده قلم فعّال مبني لشاشة الايباد الرقمية، والمصنّع مابيذكرش أي دعم لتابلت أندرويد أو ويندوز. وهو مش بديل لقلم S-Pen.'
                },
                {
                    question: 'الايباد بتاعي جيل تاسع، القلم هيشتغل؟',
                    answer: 'الايباد الجيل التاسع (A2602 · A2603 · A2604 · A2605) موجود في جدول التوافق المطبوع على العلبة. اتأكد من رقم الموديل من الإعدادات ← عام ← حول قبل الطلب، لأن الأسماء التسويقية بتتشابه والأرقام لا.'
                },
                {
                    question: 'هل القلم بيشتغل على الايباد الجيل العاشر أو iPad Air بمعالج M2؟',
                    answer: 'الأجهزة دي مش موجودة في جدول التوافق المطبوع على العلبة، ونفس الكلام على iPad Pro بمعالج M2/M4 وiPad mini الجيل السابع. اسألنا قبل الطلب بدل ما تفترض إن الايباد الأحدث مدعوم تلقائياً.'
                },
                {
                    question: 'كام مرة هحتاج أغيّر طرف القلم؟',
                    answer: 'ده بيعتمد على قوة ضغطك ونوع سكرين بروتكتور الشاشة ونظافتها. المؤشر العملي مش الوقت — غيّر الطرف أول ما الكتابة تبدأ تحس بخشونة أو تسمع صوت أعلى من المعتاد، لأن الطرف المستهلك هو اللي بيبدأ يعلّم الشاشة.'
                },
                {
                    question: 'كم سعر قلم جوي روم للايباد في مصر؟',
                    answer: 'السعر الحالي بيظهر في بطاقة وصفحة المنتج وقد يتغير مع المخزون والعروض. قارن نوع الشحن (USB-C أم مغناطيسي) ووجود حساسية الميل وقائمة توافق الايباد قبل ما تقارن السعر لوحده، ثم راجع ضمان كايرو فولت المكتوب للمنتج.'
                },
                {
                    question: 'إيه الفرق بين قلم جوي روم وقلم انكر Pencil Pro؟',
                    answer: 'الفرق الأساسي في طريقة الشحن: قلم انكر Pencil Pro A7166 بيشحن لاسلكياً بالتثبيت المغناطيسي على حافة الايباد وملوش منفذ USB-C، بينما قلم جوي روم JR-X15 Pro بيشحن عبر USB-C والمغناطيس عنده للحفظ فقط. الاتنين بيذكروا حساسية ميل والاتنين بدون حساسية ضغط. راجع صفحة كل منتج للسعر والتوافق الحاليين.'
                }
            ],
            products: [
                { name: 'قلم جوي روم JR-X15 Pro للايباد — ميل وتثبيت مغناطيسي وشحن USB-C', price: 1199, badge: 'شحن 15 دقيقة (بيان الشركة)' }
            ]
        },
        en: {
            title: 'Joyroom Accessories and the JR-X15 Pro iPad Stylus',
            subtitle: 'An active capacitive stylus with USB-C charging — check your iPad A-number before you order',
            description: `
The **Joyroom accessories** shelf at CairoVolt currently holds the **Joyroom JR-X15 Pro** stylus for iPad: an active capacitive pen that works directly through the iPad digitiser with **no Bluetooth pairing**, with vendor-stated tilt sensitivity, magnetic attachment to the iPad side rail, a three-dot LED charge indicator, and charging through a **USB-C** port at the top of the barrel.

**Three things to be clear about before buying:**
- **The magnet parks the pen, it does not charge it.** The stylus snaps to the iPad rail so it does not get lost, but charging still happens over USB-C. That is the opposite of Apple Pencil 2, which genuinely charges on the rail.
- **Tilt yes, pressure no.** Joyroom lists tilt sensitivity. Pressure sensitivity is absent — iPadOS reports it only for Apple Pencil-class hardware, so no third-party pen in this class provides it. Right for notes, PDF mark-up, signing and line art; wrong for pressure-driven painting.
- **iPad only.** This is not an S-Pen alternative and is not designed for Samsung, Xiaomi or Windows tablets.

**Before you buy:** open **Settings → General → About** and read the **Model Number** (it starts with A). Match it against the carton compatibility table, reproduced in full on the product page. The table covers the 2018–2021 iPad generations; newer hardware is not on it.

**CairoVolt warranty:** coverage, duration and replacement follow the product page and warranty policy. Delivery timing is estimated after address confirmation, with cash on delivery available for eligible orders. If you need a USB-C cable or charger for the pen, see [Joyroom cables](/joyroom/cables) and [Joyroom chargers](/joyroom/wall-chargers).
    `,
            qualityBadges: [
                { type: 'originality', text: 'Carton-printed model number shown on the product page' },
                { type: 'warranty', text: 'CairoVolt warranty per product page and policy' },
                { type: 'expert_verified', text: 'Compatibility depends on the iPad A-number and the app' }
            ],
            buyingGuide: [
                {
                    title: 'How to choose an iPad stylus you will not return',
                    content: `
1. **Start with the A-number, not the device name.** "iPad Air" alone spans generations that are on this list and generations that are not. Read the number in Settings → General → About.
2. **Decide what you actually do: writing or pressure painting?** For notes, annotation, signing and line art, an active capacitive pen does the job. For pressure-curve brushwork, you need an Apple Pencil and there is no substitute.
3. **Ask whether the magnet charges or just parks.** In this class it usually only parks. Read the charging port in the specifications.
4. **Look for replaceable tips.** The tip is the part that wears, and a worn tip is what scratches a screen protector. A pen with available threaded tips is cheaper over its life.
5. **Do not assume Android support.** Active pens are tuned to a specific digitiser; an iPad pen is not an S-Pen substitute.
6. **Invoice and warranty.** Keep the CairoVolt invoice and check duration and terms on the product page and policy.
`
                },
                {
                    title: 'iPad compatibility by A-number — the table printed on the carton',
                    content: `
| iPad family | Supported A-numbers |
|--------|---------|
| **iPad Pro 12.9-inch** | A2229 · A2069 · A2232 · A2233 · A1876 · A2014 · A1895 · A1983 · A2378 · A2379 · A2461 · A2462 |
| **iPad Pro 11-inch** | A1980 · A2013 · A1934 · A1979 · A2228 · A2068 · A2230 · A2231 · A2377 · A2301 · A2459 · A2460 |
| **iPad Air 3rd & 4th gen** | A2152 · A2123 · A2153 · A2154 · A2316 · A2324 · A2325 · A2072 |
| **iPad 6th, 7th, 8th & 9th gen** | A1893 · A1954 · A2197 · A2200 · A2198 · A2270 · A2602 · A2603 · A2604 · A2605 |
| **iPad mini 5th & 6th gen** | A2133 · A2124 · A2126 · A2125 · A2567 · A2568 · A2569 |

**Note:** the 8th generation is listed by its Wi-Fi model A2270 only; the cellular 8th-gen models (A2428/A2429/A2430) are the same iPad but are not printed in the table.

**Not on the printed list:** iPad 10th generation, iPad Air with M1/M2, iPad Pro with M2/M4, and iPad mini 7. Ask us before ordering for one of those rather than assuming newer hardware is automatically covered.
`
                },
                {
                    title: 'Specifications of the model listed here: JR-X15 Pro',
                    content: `
| Item | JR-X15 Pro (active capacitive stylus) |
|---------|---------|
| **Pen type** | Active capacitive — no Bluetooth pairing, no MFi certification |
| **Charging** | USB-C at the barrel top — **the magnet does not charge the pen** |
| **Battery** | 130mAh (Joyroom); some reseller pages print 125mAh |
| **Runtime** | ~10 hours (Joyroom); other pages print 9 or 12 hours |
| **Charge time** | 15 minutes (Joyroom); "Pro" listings print ~30 minutes |
| **Tilt sensitivity** | Yes — vendor-stated, behaviour depends on the app |
| **Pressure sensitivity** | No — iPadOS reserves it for Apple Pencil-class pens |
| **Indicator** | Three LED dots for charge level |
| **Tips** | Threaded and replaceable; the carton prints "×4" while the vendor slide says "2 spare pen tips" — count them on arrival |
| **Size and weight** | 166 mm × Ø9 mm · 15 g (Joyroom) |
| **Identifiers** | MPN: JR-X15 (carton print) · Store SKU: JX01 |

**Note:** this is the only model currently listed in this category. Every figure above is attributed to its publisher — CairoVolt has not bench-tested this model and presents no number here as its own measurement.
`
                }
            ],
            faq: [
                {
                    question: 'Does the Joyroom stylus charge when I stick it to the iPad?',
                    answer: 'No. The magnet only holds the pen on the iPad side rail for storage and anti-loss; charging happens through the USB-C port at the top of the barrel. Apple Pencil 2 charges on the rail — this pen parks on it.'
                },
                {
                    question: 'Does the Joyroom stylus have pressure sensitivity like an Apple Pencil?',
                    answer: 'No. Joyroom lists tilt sensitivity, not pressure, and iPadOS reports true stylus pressure only for Apple Pencil-class hardware. No third-party active capacitive pen in this class can provide it, whatever a listing claims.'
                },
                {
                    question: 'Will it work on a Samsung or Android tablet?',
                    answer: 'No. This is an active pen built for the iPad digitiser, and the manufacturer lists no Android or Windows tablet support. It is not an S-Pen alternative.'
                },
                {
                    question: 'I have a 9th generation iPad — will the pen work?',
                    answer: 'The 9th generation iPad (A2602, A2603, A2604, A2605) is on the compatibility table printed on the carton. Confirm your model number in Settings → General → About before ordering, because marketing names overlap and A-numbers do not.'
                },
                {
                    question: 'Does it work on the iPad 10th generation or an M2 iPad Air?',
                    answer: 'Those are not on the compatibility table printed on the carton, and neither are the M2/M4 iPad Pro or the iPad mini 7. Ask us before ordering rather than assuming newer iPads are automatically covered.'
                },
                {
                    question: 'How often will I need to replace the tip?',
                    answer: 'It depends on how hard you press, the type of screen protector, and how clean the screen is. The practical signal is not elapsed time — replace the tip as soon as writing starts to feel scratchy or sounds louder than usual, because a worn tip is what starts marking the screen.'
                },
                {
                    question: 'How much does a Joyroom iPad stylus cost in Egypt?',
                    answer: 'The live price is shown on the product card and page and can change with stock and promotions. Compare the charging method (USB-C or magnetic), whether tilt is listed, and the iPad compatibility list before comparing price alone, then review the CairoVolt warranty written for the product.'
                },
                {
                    question: 'How does it differ from the Anker Pencil Pro?',
                    answer: 'The main difference is how they charge. The Anker Pencil Pro A7166 charges wirelessly by magnetic attachment to the iPad rail and has no USB-C port, while the Joyroom JR-X15 Pro charges over USB-C and uses its magnet only for storage. Both list tilt and neither lists pressure sensitivity. Check each product page for current price and compatibility.'
                }
            ],
            products: [
                { name: 'Joyroom JR-X15 Pro iPad Stylus — tilt, magnetic parking, USB-C charging', price: 1199, badge: '15-min charge (vendor-stated)' }
            ]
        }
    }
};
