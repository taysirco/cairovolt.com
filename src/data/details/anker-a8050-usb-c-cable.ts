import type { ProductDetail } from './_types';

export const anker_a8050_usb_c_cable_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker A8050 is a USB-A to USB-C cable (not C-to-C) — 1.8m braided nylon for linking older USB-A car chargers, wall bricks and power banks to USB-C Android phones and accessories.',
            'Charging power depends on the source and device; on QC/AFC-capable paths CairoVolt measured up to ~17.6W into a Galaxy A54 from an Anker A2741 car charger — the cable carried it with only 0.18V drop at 5V/2A.',
            'USB 2.0 data is listed at 480Mbps. Anker publishes a 35,000-bend lab figure; CairoVolt did not convert that into a lifetime promise — we measured resistance, voltage drop and continuity after 50 bench flex cycles instead.',
            'Not for 60W+ laptop USB-C PD — a USB-A source cannot negotiate 20V PD. For MacBook-class charging use a USB-C to USB-C E-marked cable (A8865 class). CairoVolt is an independent retailer; the cable carries our store warranty.',
        ],
        ar: [
            'انكر A8050 كابل USB-A إلى USB-C (ليس C-to-C) — نايلون مضفر بطول 1.8 متر لربط شواحن السيارة USB-A القديمة والطوبات الحائطية والباور بانك بأجهزة أندرويد USB-C والملحقات.',
            'قدرة الشحن تعتمد على المصدر والجهاز؛ على مسارات QC/AFC قِست CairoVolt حتى ~17.6 واط إلى Galaxy A54 من شاحن سيارة انكر A2741 — والكابل نقلها بهبوط 0.18 فولت فقط عند 5V/2A.',
            'بيانات USB 2.0 مدونة بـ 480 ميغابت/ث. تنشر انكر رقم 35,000 ثنية في المختبر؛ لم تحوّل CairoVolt ذلك إلى وعد بعمر — بل قِست المقاومة وهبوط الجهد والاستمرارية بعد 50 دورة ثني على المنضدة.',
            'ليس لشحن لابتوب USB-C PD بقدرة 60 واط فأكثر — مصدر USB-A لا يتفاوض على 20V PD. لشحن MacBook استخدم كابل USB-C إلى USB-C E-marked (فئة A8865). CairoVolt متجر تجزئة مستقل؛ والكابل يحمل ضمان المتجر.',
        ],
    },
    localContext: {
        en: 'CairoVolt is an independent retailer, not an authorized distributor; this cable carries our store warranty. In Egypt many drivers still rely on USB-A car chargers (such as the Anker A2741) and older wall bricks — A8050 is the practical link to a USB-C phone in the car or at home. It is not recalled: Anker recall SKUs A8482, A8483 and A8465 do not include A8050 (verified anker.com/product-recalls 2026-07-23). Inspect the braided jacket and connectors regularly and replace the cable if damaged.',
        ar: 'CairoVolt متجر تجزئة مستقل وليس موزعًا معتمدًا؛ والكابل يحمل ضمان المتجر. في مصر ما زال كثيرون يعتمدون على شواحن سيارة USB-A (مثل انكر A2741) وطوبات حائطية قديمة — A8050 هو الرابط العملي لهاتف USB-C في السيارة أو المنزل. غير مسترجَع: رموز استرجاع انكر A8482 وA8483 وA8465 لا تشمل A8050 (تحقق anker.com/product-recalls 2026-07-23). افحص الغلاف المضفر والموصلات بانتظام، واستبدل الكابل إذا تلف.',
    },
    specifications: {
        'Product Type': {
            en: 'USB-A to USB-C cable · braided nylon · listed model A8050',
            ar: 'كابل USB-A إلى USB-C · نايلون مضفر · الموديل المدرج A8050',
        },
        'Max Power': {
            en: 'Depends on the USB-A source, protocol and device — typically up to ~3A / ~15–18W class on QC/AFC paths when the charger supports it; not USB-C PD laptop power',
            ar: 'تعتمد على مصدر USB-A والبروتوكول والجهاز — عادةً حتى ~3A / ~15–18 واط على مسارات QC/AFC عندما يدعمها الشاحن؛ ليست قدرة شحن لابتوب USB-C PD',
        },
        'Data Speed': {
            en: 'USB 2.0 (480Mbps) — charge and sync only, no video output',
            ar: 'USB 2.0 (480 ميغابت/ث) — للشحن والمزامنة فقط، بلا إخراج فيديو',
        },
        'Connectors': {
            en: 'USB-A ↔ USB-C',
            ar: 'USB-A ↔ USB-C',
        },
        'Length': {
            en: '1.8m (6ft)',
            ar: '1.8 متر (6 قدم)',
        },
        'Jacket': {
            en: 'Braided nylon with reinforced strain relief',
            ar: 'نايلون مضفر مع تخفيف إجهاد معزّز',
        },
        'Weight': {
            en: '~28g (manufacturer listed)',
            ar: 'نحو 28 جرامًا (مدون من الشركة)',
        },
        'Durability Claim': {
            en: '35,000-bend test stated by Anker under lab conditions — not a promised service life; inspect and replace if damaged',
            ar: 'اختبار 35,000 ثنية تذكره انكر في ظروف مختبرية — ليس عمر خدمة مضمونًا؛ افحص الكابل واستبدله إذا تلف',
        },
        'Warranty': {
            en: 'CairoVolt store warranty (independent retailer); replace the cable if it is damaged',
            ar: 'ضمان متجر CairoVolt (تاجر تجزئة مستقل)؛ ويُستبدل الكابل إذا تلف',
        },
    },
    benchTest: {
        sku: 'A8050 (Anker USB-A to USB-C braided cable, 1.8m)',
        sampleId: 'CV-CB-A8050-001',
        testDate: '2026-07-23',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit — MPN A8050 · room temperature 28.4°C · not on Anker recall list (A8482/A8483/A8465 checked at anker.com/product-recalls 2026-07-23)',
            ar: 'وحدة واحدة من مخزون التجزئة — MPN A8050 · حرارة الغرفة 28.4°م · غير مدرج في استرجاع انكر (A8482/A8483/A8465 رُاجعت على anker.com/product-recalls 2026-07-23)',
        },
        methodology: {
            en: 'We measured length and weight, then ran the FNIRSI FNB58 inline to log source vs load voltage at a controlled 2A draw (5V path) over the full 1.8m span. We charged a Samsung Galaxy A54 from a drained state with an Anker A2741 USB-A car charger and logged peak negotiated power. We checked E-marker status (N/A for USB-A source cables), ran 50 manual flex cycles at the USB-C strain relief while monitoring continuity, and stopped — we did not treat Anker\'s 35,000-bend lab figure as a lifetime estimate. Single unit; production batches may vary.',
            ar: 'قِسنا الطول والوزن، ثم وصّلنا FNIRSI FNB58 على التوالي لتسجيل جهد المصدر مقابل الحمل عند سحب 2A مضبوط (مسار 5V) على امتداد 1.8 متر كامل. وشحنّا Samsung Galaxy A54 من حالة فارغة بشاحن سيارة انكر A2741 USB-A وسجّلنا ذروة القدرة المتفاوَض عليها. تحقّقنا من شريحة E-marker (غير مطبّق على كابلات USB-A)، وأجرينا 50 دورة ثني يدوية عند تخفيف إجهاد USB-C مع مراقبة الاستمرارية — دون تحويل رقم 35,000 ثنية من انكر إلى تقدير عمر. وحدة واحدة وقد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Inline V·A·W logging and source-vs-load voltage drop at 5V/2A', ar: 'قياس V·A·W على التوالي وهبوط الجهد بين المصدر والحمل عند 5V/2A' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Controlled 2A constant-current draw for voltage-drop measurement', ar: 'سحب تيار ثابت مضبوط 2A لقياس هبوط الجهد' } },
            { name: 'Anker A2741 USB-A car charger', use: { en: 'Real-world QC-class charge into Galaxy A54', ar: 'شحن QC-class واقعي إلى Galaxy A54' } },
            { name: 'Samsung Galaxy A54', use: { en: 'Peak-power negotiation test device', ar: 'جهاز اختبار تفاوض ذروة القدرة' } },
            { name: 'Kkmoon 0.01g scale · Mitutoyo 150mm caliper', use: { en: 'Weight & length (connector tip to connector tip)', ar: 'الوزن والطول (من طرف الموصل إلى طرف الموصل)' } },
            { name: 'GM320 IR thermometer', use: { en: 'Cable surface temperature spot-check under 2A load', ar: 'فحص حرارة سطح الكابل تحت حمل 2A' } },
        ],
        results: [
            { param: { en: 'Recall status', ar: 'حالة الاسترجاع' }, rated: { en: 'Not listed', ar: 'غير مدرج' }, measured: { en: 'Not A8482/A8483/A8465 — verified 2026-07-23', ar: 'ليس A8482/A8483/A8465 — تحقق 2026-07-23' }, note: { en: 'anker.com/product-recalls', ar: 'anker.com/product-recalls' } },
            { param: { en: 'E-marker chip', ar: 'شريحة E-marker' }, measured: { en: 'None — USB-A source cable (expected)', ar: 'لا توجد — كابل مصدر USB-A (متوقع)' }, note: { en: 'FNB58 PD Info', ar: 'FNB58 PD Info' } },
            { param: { en: 'Voltage drop @ 5V/2A (1.8m)', ar: 'هبوط الجهد @ 5V/2A (1.8 م)' }, measured: '0.18 V', note: { en: 'FNB58 source vs load — acceptable for 1.8m copper-class cable', ar: 'FNB58 مصدر مقابل حمل — مقبول لكابل 1.8 م من فئة النحاس' } },
            { param: { en: 'Implied VBUS+GND resistance', ar: 'مقاومة VBUS+GND المستنتجة' }, measured: '90 mΩ', note: { en: '0.18V ÷ 2A', ar: '0.18V ÷ 2A' } },
            { param: { en: 'Peak power (Galaxy A54 + A2741 car charger)', ar: 'ذروة القدرة (Galaxy A54 + شاحن سيارة A2741)' }, measured: { en: '~17.6W QC-class', ar: '~17.6 واط QC-class' }, note: { en: 'FNB58 inline — limited by USB-A source, not cable ceiling', ar: 'FNB58 على التوالي — محدود بمصدر USB-A لا بسقف الكابل' } },
            { param: { en: 'Data speed', ar: 'سرعة البيانات' }, rated: 'USB 2.0 (480Mbps)', measured: { en: 'USB 2.0 — charge/sync only', ar: 'USB 2.0 — شحن/مزامنة فقط' } },
            { param: { en: 'Continuity after 50 flex cycles', ar: 'الاستمرارية بعد 50 دورة ثني' }, measured: { en: 'Stable — no intermittent contact at strain relief', ar: 'مستقرة — بلا انقطاع متقطع عند تخفيف الإجهاد' }, note: { en: 'Bench flex only — not a 35,000-cycle fatigue test', ar: 'ثني على المنضدة فقط — ليس اختبار تعب 35,000 دورة' } },
            { param: { en: 'Cable surface temp @ 2A (10 min)', ar: 'حرارة سطح الكابل @ 2A (10 د)' }, measured: { en: '34.2°C mid-span', ar: '34.2°م منتصف الكابل' }, note: { en: 'GM320 IR — within safe range', ar: 'GM320 IR — ضمن النطاق الآمن' } },
            { param: { en: 'Length', ar: 'الطول' }, rated: '1.8m (6ft)', measured: '182.4 cm', note: { en: 'within ±5cm tolerance', ar: 'ضمن تفاوت ±5 سم' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '~28g', measured: '29.0 g' },
            { param: { en: 'Connector type', ar: 'نوع الموصل' }, rated: { en: 'USB-A to USB-C', ar: 'USB-A إلى USB-C' }, measured: { en: 'Confirmed USB-A ↔ USB-C — not C-to-C', ar: 'مؤكَّد USB-A ↔ USB-C — ليس C-to-C' } },
        ],
        verdict: {
            en: 'A8050 is a solid USB-A bridge for Egyptian car-charger and old-brick setups: 0.18V drop at 2A over 1.8m and ~17.6W into a Galaxy A54 from an A2741. Buy USB-C to USB-C E-marked (A8865 class) instead if you need 60–100W laptop PD — USB-A cannot do 20V PD.',
            ar: 'A8050 جسر USB-A عملي لمنظومات شاحن السيارة والطوبات القديمة في مصر: هبوط 0.18 فولت عند 2A على 1.8 م و~17.6 واط إلى Galaxy A54 من A2741. اشتَر USB-C إلى USB-C E-marked (فئة A8865) إن احتجت 60–100 واط PD للابتوب — USB-A لا يقدّم 20V PD.',
        },
        pros: [
            { en: 'Low voltage drop for a 1.8m USB-A cable — 0.18V at 5V/2A (90mΩ implied)', ar: 'هبوط جهد منخفض لكابل USB-A بطول 1.8 م — 0.18 فولت عند 5V/2A (90 mΩ مستنتجة)' },
            { en: 'Carried ~17.6W QC-class to a Galaxy A54 from an Anker A2741 USB-A car charger without instability', ar: 'نقل ~17.6 واط QC-class إلى Galaxy A54 من شاحن سيارة انكر A2741 USB-A دون عدم استقرار' },
            { en: '1.8m braided nylon reach — useful in cars and for couch/desk routing with older USB-A sources', ar: 'مدى 1.8 م بنايلون مضفر — مفيد في السيارة ولتمرير الكابل مع مصادر USB-A القديمة' },
            { en: 'Not on Anker recall list (A8482/A8483/A8465) as of 2026-07-23', ar: 'غير مدرج في استرجاع انكر (A8482/A8483/A8465) حتى 2026-07-23' },
        ],
        limits: [
            { en: 'USB-A source only — cannot deliver USB-C PD 20V for 60W+ laptop charging; use C-to-C E-marked instead', ar: 'مصدر USB-A فقط — لا يقدّم USB-C PD 20V لشحن لابتوب 60 واط+؛ استخدم C-to-C E-marked بدلاً منه' },
            { en: 'Charging speed is capped by the USB-A charger and phone protocol — not a universal fast-charge cable', ar: 'سرعة الشحن محدودة بشاحن USB-A وبروتوكول الهاتف — ليس كابل شحن سريع شاملًا' },
            { en: 'USB 2.0 data only (480Mbps) — no video/DisplayPort output', ar: 'بيانات USB 2.0 فقط (480 ميغابت/ث) — بلا إخراج فيديو/DisplayPort' },
            { en: 'Anker\'s 35,000-bend figure is a lab test condition — CairoVolt verified only 50 bench flex cycles, not lifetime', ar: 'رقم 35,000 ثنية من انكر شرط اختبار مختبري — CairoVolt تحققت من 50 دورة ثني على المنضدة فقط، لا من العمر' },
            { en: 'Single unit tested — production batches may vary', ar: 'وحدة واحدة مُختبَرة — قد تختلف دفعات الإنتاج' },
        ],
    },
};
