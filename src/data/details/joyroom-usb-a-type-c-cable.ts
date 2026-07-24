// Details for: joyroom-usb-a-type-c-cable  (Joyroom JR-S-AC30 USB-A to USB-C cable, ~1m)
// Distinct from sibling slug joyroom-usb-a-type-c-1.2m (JR-S-AC12) — different MPN; do not merge.
import type { ProductDetail } from './_types';

export const joyroom_usb_a_type_c_cable_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Joyroom JR-S-AC30 is a ~1m USB-A to USB-C bridge cable listed up to 3A — it connects older USB-A wall bricks, car ports and laptop USB-A ports to modern USB-C phones. It does NOT turn a USB-A port into USB-C Power Delivery; PD needs a USB-C PD source and a suitable C-to-C cable.',
            'CairoVolt measured 0.11V drop at a controlled 2A/5V draw across the full ~1m span (≈55mΩ VBUS+GND) — within protocol §7.4 for 1m copper. Max stable constant-current draw on our USB-A path was 2.8A for 5 minutes with no open; peak into a live Samsung S24 from a QC/AFC USB-A brick was 16.8W (not 25W PPS).',
            'USB 2.0 data confirmed (≈38 MB/s on a 1GB file copy) — charge + sync, no DisplayPort/Alt-mode. TPE jacket with reinforced strain relief; continuity held after 50 bench flex cycles only — not a lifetime bend promise.',
            'Wrong tool for 20–60W USB-PD phone peaks or laptop charging. For Careem/Uber QC car chargers and older USB-A bricks in Egypt student kits this is the honest bridge. Not the 1.2m sibling JR-S-AC12. Joyroom is not on Anker cable recall lists (A8482/A8483/A8465 are Anker SKUs; verified anker.com/product-recalls 2026-07-24).',
        ],
        ar: [
            'جوي روم JR-S-AC30 كابل جسر ~1 م من USB-A إلى USB-C مُعلَن حتى 3A — يصل طوب USB-A القديمة ومنافذ السيارة ومنفذ لابتوب USB-A بهواتف USB-C الحديثة. **لا** يحوّل منفذ USB-A إلى USB-C Power Delivery؛ PD يحتاج مصدر PD وكابل C-to-C مناسب.',
            'قِست CairoVolt هبوط 0.11 فولت عند سحب مضبوط 2A/5V على امتداد ~1 م (≈55 مللي أوم VBUS+GND) — ضمن §7.4 لنحاس 1 م. أقصى سحب تيار ثابت مستقر على مسار USB-A كان 2.8A لمدة 5 دقائق بلا انقطاع؛ ذروة إلى Samsung S24 حي من طوبة QC/AFC USB-A كانت 16.8 واط (وليس 25 واط PPS).',
            'بيانات USB 2.0 مؤكدة (≈38 ميغابايت/ث لنسخ ملف 1 جيجا) — شحن + مزامنة، بلا DisplayPort/Alt-mode. غلاف TPE بتخفيف إجهاد معزّز؛ الاستمرارية ثبتت بعد 50 دورة ثني على المنضدة فقط — ليس وعد عمر للثني.',
            'أداة خاطئة لذروات USB-PD 20–60 واط أو شحن لابتوب. لشواحن سيارة Careem/Uber بـ QC وطوب USB-A القديمة في أطقم الطلاب بمصر هذا الجسر الأمين. **ليس** الشقيق 1.2 م JR-S-AC12. جوي روم **ليست** على قوائم استرجاع كابلات Anker (A8482/A8483/A8465 موديلات Anker؛ تحقق anker.com/product-recalls 2026-07-24).',
        ],
    },
    localContext: {
        en: 'CairoVolt is an independent retailer — this cable carries our store warranty. JR-S-AC30 (store SKU JK11, GTIN 6956116750190, listed ~86 EGP) is the short USB-A→C bridge for Egyptian bags that still carry older USB-A bricks: Careem/Uber drivers with QC USB-A car chargers, student kits (AUC/GUC/Cairo University) reusing a 5V/2.4A or QC wall wart, and desk PCs with USB-A only. Six scenarios. RIGHT FOR: (1) OLDER USB-A WALL BRICK → USB-C PHONE — Samsung A-series / S24 on AFC or QC from a USB-A brick; CairoVolt measured 16.8W peak into S24 (9V-class QC/AFC path), not 25W PPS which needs C-to-C PD/PPS. (2) CAREEM / UBER QC CAR CHARGER — many cigarette-lighter docks in Cairo/Alexandria/Hurghada still expose USB-A QC ports; 1m reaches phone-to-console without stretching. (3) STUDENT BACKUP CABLE — pairs with any leftover Anker/Baseus/generic USB-A brick in a dorm kit when the PD brick is forgotten. (4) LAPTOP USB-A SYNC — USB 2.0 data ~38 MB/s measured; fine for photos/APKs, not SSD cloning. (5) iPHONE 15/16 VIA USB-A — honest ~9W class from a USB-A brick (FNB58); do not expect Apple 20–27W PD without a USB-C PD source + C-to-C cable. (6) TRAVEL / EGYPTAIR CARRY-ON — 21g measured; pocketable spare. WRONG FOR: (7) USB-C PD FAST CHARGE (20–60W) — USB-A cannot negotiate USB-PD the same way; buy a C-to-C cable (e.g. Joyroom JR-S-CC60 class) with a PD brick. (8) MACBOOK / LAPTOP POWER — not a PD power cable. (9) BUYER CONFUSING THIS WITH JR-S-AC12 — that sibling is 1.2m (different MPN); this page is JR-S-AC30 ~1m only. HEAT: Cairo July–August mean high 35°C (WeatherSpark). Mid-span at 2A/5V was 36.8°C in a 28.2°C room; expect warmer on a sunlit dashboard — do not coil tightly under load. AUTHENTICITY: verify printed "JR-S-AC30" and GTIN 6956116750190; Joyroom ≠ Anker. ELECTRICITY: topping an iPhone 15 (12.99Wh) via ~9W USB-A path uses on the order of ~0.02 kWh — a few piastres on EgyptERA Sept-2024 tariff.',
        ar: 'CairoVolt متجر تجزئة مستقل — والكابل يحمل ضمان المتجر. JR-S-AC30 (SKU المتجر JK11، GTIN 6956116750190، مدرج ~86 ج) هو جسر USB-A→C القصير لحقائب مصرية ما زالت تحمل طوب USB-A قديمة: سائقو Careem/Uber بشواحن سيارة QC USB-A، أطقم طلاب (AUC/GUC/جامعة القاهرة) يعيدون استخدام طوبة 5V/2.4A أو QC، وأجهزة مكتب بمنفذ USB-A فقط. ستة سيناريوهات. مناسب لـ: (1) طوبة USB-A قديمة → هاتف USB-C — سامسونج فئة A / S24 على AFC أو QC من طوبة USB-A؛ قِست CairoVolt ذروة 16.8 واط إلى S24 (مسار QC/AFC فئة 9V)، وليس 25 واط PPS الذي يحتاج C-to-C PD/PPS. (2) شاحن سيارة Careem / Uber بـ QC — كثير من ولاعات القاهرة/الإسكندرية/الغردقة ما زالت تُظهر منافذ USB-A QC؛ متر واحد يصل من الكونسول للهاتف بلا شد. (3) كابل احتياطي للطالب — يقترن بأي طوبة USB-A متبقية في طقم السكن حين تُنسى طوبة PD. (4) مزامنة لابتوب USB-A — بيانات USB 2.0 ~38 ميغابايت/ث مقاسة؛ مناسبة للصور/APK لا لنسخ SSD. (5) iPhone 15/16 عبر USB-A — ~9 واط أمينة من طوبة USB-A (FNB58)؛ لا تتوقع PD 20–27 واط من Apple بلا مصدر PD + كابل C-to-C. (6) سفر / حقيبة EgyptAir — 21 ج مقاسة؛ احتياطي للجيب. غير مناسب لـ: (7) شحن USB-C PD السريع (20–60 واط) — USB-A لا يتفاوض USB-PD بنفس الطريقة؛ اشترِ كابل C-to-C (فئة Joyroom JR-S-CC60) مع طوبة PD. (8) تغذية MacBook / لابتوب — ليس كابل قدرة PD. (9) مشترٍ يخلطه مع JR-S-AC12 — ذلك الشقيق 1.2 م (MPN مختلف)؛ هذه الصفحة JR-S-AC30 ~1 م فقط. الحرارة: متوسط العظمى للقاهرة يوليو–أغسطس 35°م (WeatherSpark). منتصف الكابل عند 2A/5V كان 36.8°م في غرفة 28.2°م؛ توقّع أدفأ على تابلوه مشمس — لا تلفّه بإحكام تحت الحمل. الأصالة: تحقق من "JR-S-AC30" المطبوع وGTIN 6956116750190؛ جوي روم ≠ Anker. الكهرباء: إكمال شحن iPhone 15 (12.99Wh) عبر مسار USB-A ~9 واط ≈0.02 كيلوواط·ساعة — قروش قليلة بتعريفة EgyptERA سبتمبر 2024.',
    },
    specifications: {
        'Model': {
            en: 'Joyroom JR-S-AC30 USB-A to USB-C cable (~1m) — store SKU JK11 · GTIN 6956116750190 · distinct from JR-S-AC12 (1.2m sibling)',
            ar: 'جوي روم JR-S-AC30 كابل USB-A إلى USB-C (~1 م) — SKU المتجر JK11 · GTIN 6956116750190 · مختلف عن الشقيق JR-S-AC12 (1.2 م)',
        },
        'Category': {
            en: 'USB-A→USB-C charge + sync bridge · not a USB-C PD cable',
            ar: 'جسر شحن + مزامنة USB-A→USB-C · ليس كابل USB-C PD',
        },
        'Max Current (listed)': {
            en: 'Up to 3A manufacturer-listed ceiling — actual amps negotiated by USB-A source + device (QC/AFC/DCP/5V); cable does not force the rate',
            ar: 'حتى 3A سقف معلن من المصنّع — الأمبير الفعلي يتفاوض عليه مصدر USB-A + الجهاز (QC/AFC/DCP/5V)؛ الكابل لا يفرض التيار',
        },
        'USB-C Power Delivery': {
            en: 'Not available from a standard USB-A host — this cable cannot negotiate USB-PD / PPS the way a C-to-C path does; do NOT expect 20–60W PD',
            ar: 'غير متاح من مضيف USB-A قياسي — هذا الكابل لا يتفاوض USB-PD / PPS كما يفعل مسار C-to-C؛ **لا** تتوقع PD 20–60 واط',
        },
        'Data Speed': {
            en: 'USB 2.0 (480Mbps listed) — CairoVolt ~38 MB/s on 1GB file copy; no DisplayPort/Alt-mode',
            ar: 'USB 2.0 (480 ميغابت/ث معلن) — CairoVolt ~38 ميغابايت/ث لنسخ 1 جيجا؛ بلا DisplayPort/Alt-mode',
        },
        'Length': {
            en: '1m listed — CairoVolt tape 101 cm (USB-A tip to USB-C tip)',
            ar: '1 م في القائمة — مازورة CairoVolt 101 سم (من طرف USB-A إلى طرف USB-C)',
        },
        'Weight': {
            en: '20g listed — CairoVolt 0.01g scale 21g',
            ar: '20 ج في القائمة — ميزان CairoVolt 0.01 ج 21 ج',
        },
        'Jacket': {
            en: 'TPE jacket with reinforced strain relief at both housings',
            ar: 'غلاف TPE مع تخفيف إجهاد معزّز على المبيتين',
        },
        'Measured V-drop @ 2A / 5V': {
            en: '0.11 V across ~1m span (≈55mΩ VBUS+GND) — within protocol §7.4 copper band for 1m',
            ar: '0.11 فولت على امتداد ~1 م (≈55 مللي أوم VBUS+GND) — ضمن نطاق §7.4 للنحاس بطول 1 م',
        },
        'Measured peak (USB-A host path)': {
            en: '16.8W into Samsung S24 from QC/AFC USB-A brick; ~9.1W into iPhone 15 from same USB-A class path — not PD',
            ar: '16.8 واط إلى Samsung S24 من طوبة QC/AFC USB-A؛ ~9.1 واط إلى iPhone 15 من نفس فئة مسار USB-A — ليس PD',
        },
        'Where this cable is enough': {
            en: 'Legacy USB-A bricks, QC/AFC car chargers, laptop USB-A sync, Samsung AFC ~15–18W class, iPhone USB-A trickle ~7–12W class',
            ar: 'طوب USB-A القديمة، شواحن سيارة QC/AFC، مزامنة لابتوب USB-A، سامسونج AFC فئة ~15–18 واط، iPhone عبر USB-A فئة ~7–12 واط',
        },
        'Where this cable is NOT enough': {
            en: 'USB-C PD 20–60W phone peaks, Samsung 25W/45W PPS Super Fast Charging, MacBook power — use C-to-C + PD source instead',
            ar: 'ذروات USB-C PD 20–60 واط، Samsung Super Fast Charging 25/45 واط PPS، تغذية MacBook — استخدم C-to-C + مصدر PD بدلًا',
        },
        'Recall Status': {
            en: 'Not on any Anker cable recall list — A8482/A8483/A8465 are Anker SKUs; Joyroom is a different brand (verified anker.com/product-recalls 2026-07-24)',
            ar: 'ليس على أي قائمة استرجاع لكابلات Anker — A8482/A8483/A8465 موديلات Anker؛ وجوي روم علامة مختلفة (تحقق anker.com/product-recalls 2026-07-24)',
        },
        'Warranty': {
            en: 'CairoVolt store warranty (independent retailer); replace if jacket, connector or strain relief is damaged or unusually hot',
            ar: 'ضمان متجر CairoVolt (تاجر تجزئة مستقل)؛ ويُستبدل إذا تلف الغلاف أو الموصل أو تخفيف الإجهاد أو أصبح ساخنًا بشكل غير معتاد',
        },
        'In the Box': {
            en: 'One JR-S-AC30 cable (verify live package contents with seller)',
            ar: 'كابل JR-S-AC30 واحد (تحقق من محتويات العبوة الحالية مع البائع)',
        },
    },
    benchTest: {
        sku: 'JR-S-AC30 (Joyroom USB-A to USB-C, ~1m) · store SKU JK11 · GTIN 6956116750190',
        sampleId: 'CV-CB-JRSAC30-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit — MPN JR-S-AC30 (not JR-S-AC12) · CairoVolt lab, New Cairo · ambient 28.2°C (HTC-2) · humidity 45% · mains 220V (UT61E) · not on Anker cable recall lists (Joyroom brand — A8482/A8483/A8465 checked at anker.com/product-recalls 2026-07-24)',
            ar: 'وحدة واحدة من مخزون التجزئة — MPN JR-S-AC30 (وليس JR-S-AC12) · مختبر CairoVolt، القاهرة الجديدة · حرارة محيطة 28.2°م (HTC-2) · رطوبة 45% · جهد الحائط 220 فولت (UT61E) · ليست على قوائم استرجاع كابلات Anker (علامة جوي روم — A8482/A8483/A8465 رُاجعت على anker.com/product-recalls 2026-07-24)',
        },
        methodology: {
            en: 'Per Bench Test Protocol §7.4 (cables), adapted for a USB-A host path: tip-to-tip length with a 5m fiberglass tape; weight on a 0.01g scale. We did NOT expect USB-PD E-marker behavior from USB-A — FNB58 PD Info was used to confirm the absence of a USB-PD contract on the A-port path and to log V·A·W under QC/AFC/DCP-class sources. Voltage drop: controlled 2A constant-current at 5V through a JUWEI 35W load fed from a capable USB-A brick, logging source-side vs load-side V on FNIRSI FNB58 and cross-checking with AVHzY CT-3 (agreement 0.01V). Max stable current: stepped 1A → 2A → 2.8A for 5 minutes each; 3A was attempted but the USB-A source path throttled before a clean 5-minute hold, so we publish 2.8A as max stable — not a claim of guaranteed 3A into every phone. Real-device peaks: Samsung Galaxy S24 on a QC/AFC USB-A wall brick (16.8W peak) and iPhone 15 on the same USB-A class path (~9.1W peak) — honest phone caps for A-host charging, not PPS/PD. Data: timed 1GB file copy laptop USB-A → phone (USB 2.0 class ≈38 MB/s). Cable surface temperature: BENETECH GM320 (ε=0.95) mid-span and strain-relief after 10 minutes at 2A/5V. Continuity after 50 manual flex cycles (30° at each strain relief) — we did NOT treat any Joyroom bend-count marketing figure as a lifetime warranty. Independent corroboration (not our data): USB-IF / USB PD 3.0 docs on usb.org (PD negotiation is a USB-C CC-wire protocol); Samsung Adaptive Fast Charging / QC class USB-A behavior is source+device limited. Single retail unit; production batches may vary.',
            ar: 'وفق §7.4 من بروتوكول الاختبار (الكابلات)، مع تكييف لمسار مضيف USB-A: الطول من طرف إلى طرف بمازورة زجاجية 5 م؛ الوزن على ميزان 0.01 ج. **لم** نتوقع سلوك E-marker لـ USB-PD من USB-A — استُخدم FNB58 PD Info لتأكيد غياب عقد USB-PD على مسار منفذ A وتسجيل V·A·W تحت مصادر فئة QC/AFC/DCP. هبوط الجهد: سحب تيار ثابت مضبوط 2A عند 5V عبر حمل JUWEI 35W من طوبة USB-A قادرة، مع تسجيل V جانب المصدر مقابل الحمل على FNIRSI FNB58 والتحقق بـ AVHzY CT-3 (اتفاق 0.01 فولت). أقصى تيار مستقر: درجات 1A → 2A → 2.8A لمدة 5 دقائق لكل مستوى؛ جُرّب 3A لكن مسار مصدر USB-A خُنق قبل ثبات نظيف 5 دقائق، فننشر 2.8A كأقصى مستقر — لا ادعاء 3A مضمون لكل هاتف. ذروات أجهزة حية: Samsung Galaxy S24 على طوبة حائط QC/AFC USB-A (ذروة 16.8 واط) وiPhone 15 على نفس فئة مسار USB-A (ذروة ~9.1 واط) — سقوف هاتف أمينة لشحن مضيف A، وليست PPS/PD. البيانات: توقيت نسخ ملف 1 جيجا من لابتوب USB-A → هاتف (فئة USB 2.0 ≈38 ميغابايت/ث). حرارة السطح: BENETECH GM320 (ε=0.95) منتصف الكابل وتخفيف الإجهاد بعد 10 دقائق عند 2A/5V. الاستمرارية بعد 50 دورة ثني يدوية (30° عند كل تخفيف إجهاد) — **لم** نعامل أي رقم ثني تسويقي من جوي روم كضمان عمر. للاسترجاع المستقل (وليست بياناتنا): وثائق USB-IF / USB PD 3.0 على usb.org (تفاوض PD بروتوكول أسلاك CC على USB-C)؛ سلوك Samsung Adaptive Fast Charging / QC على USB-A محدود بالمصدر والجهاز. وحدة تجزئة واحدة؛ وقد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Inline V·A·W logging on USB-A→C path; confirm no USB-PD contract from A-host; V-drop capture', ar: 'قياس V·A·W على مسار USB-A→C؛ تأكيد غياب عقد USB-PD من مضيف A؛ التقاط هبوط V' } },
            { name: 'AVHzY CT-3', use: { en: 'Cross-check of V-drop and real-device wattage — sub-1% agreement with FNB58', ar: 'تحقق من هبوط V وواتات الجهاز الحي — اتفاق دون 1% مع FNB58' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant 2A / 5V V-drop draw and stepped max-stable current holds', ar: 'سحب ثابت 2A / 5V لهبوط الجهد ودرجات ثبات أقصى تيار مستقر' } },
            { name: 'QC/AFC-capable USB-A wall brick', use: { en: 'USB-A host source for load steps and Samsung real-device peak (not a PD source)', ar: 'مصدر مضيف USB-A لدرجات الحمل وذروة سامسونج الحية (ليس مصدر PD)' } },
            { name: 'Samsung Galaxy S24 (14.31Wh)', use: { en: 'Live QC/AFC peak through USB-A→C — honesty check vs 25W PPS C-to-C', ar: 'ذروة QC/AFC حية عبر USB-A→C — تحقق أمانة مقابل 25W PPS عبر C-to-C' } },
            { name: 'iPhone 15', use: { en: 'Live USB-A-class peak via A-to-C — honesty check vs 20W+ PD', ar: 'ذروة فئة USB-A حية عبر A-to-C — تحقق أمانة مقابل PD 20 واط+' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Cable mid-span and strain-relief surface temperature under 2A load', ar: 'حرارة سطح منتصف الكابل وتخفيف الإجهاد تحت حمل 2A' } },
            { name: 'Kkmoon 0.01g scale · 5m fiberglass tape', use: { en: 'Weight and tip-to-tip length', ar: 'الوزن والطول من طرف إلى طرف' } },
            { name: 'Laptop USB-A port (1GB file copy timer)', use: { en: 'USB 2.0 data sanity check', ar: 'تحقق من بيانات USB 2.0' } },
        ],
        results: [
            { param: { en: 'Recall status', ar: 'حالة الاسترجاع' }, rated: { en: 'N/A (Joyroom brand)', ar: 'غ/م (علامة جوي روم)' }, measured: { en: 'Not on Anker cable recall list — verified 2026-07-24', ar: 'ليست على قائمة استرجاع كابلات Anker — تحقق 2026-07-24' }, note: { en: 'A8482/A8483/A8465 are Anker SKUs; Joyroom is a different brand', ar: 'A8482/A8483/A8465 موديلات Anker؛ وجوي روم علامة مختلفة' } },
            { param: { en: 'Identity / sibling check', ar: 'الهوية / فحص الشقيق' }, rated: 'JR-S-AC30', measured: { en: 'Printed JR-S-AC30 · GTIN 6956116750190 — not JR-S-AC12', ar: 'مطبوع JR-S-AC30 · GTIN 6956116750190 — ليس JR-S-AC12' }, note: { en: '1.2m sibling is a different MPN/SKU', ar: 'الشقيق 1.2 م MPN/SKU مختلف' } },
            { param: { en: 'USB-PD negotiation from USB-A host', ar: 'تفاوض USB-PD من مضيف USB-A' }, rated: { en: 'Not expected', ar: 'غير متوقع' }, measured: { en: 'No USB-PD contract on FNB58 — QC/AFC/DCP-class only', ar: 'لا عقد USB-PD على FNB58 — فئة QC/AFC/DCP فقط' }, note: { en: 'Do not claim 60W PD through USB-A', ar: 'لا تَدَّعِ PD 60 واط عبر USB-A' } },
            { param: { en: 'Length (tip-to-tip)', ar: 'الطول (من طرف إلى طرف)' }, rated: '1m', measured: '101 cm', note: { en: 'Within ±5cm tolerance', ar: 'ضمن تفاوت ±5 سم' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '20g (listing)', measured: '21 g', note: { en: '0.01g scale — within ±10%', ar: 'ميزان 0.01 ج — ضمن ±10%' } },
            { param: { en: 'Voltage drop @ 2A / 5V (~1m)', ar: 'هبوط الجهد @ 2A / 5V (~1 م)' }, measured: '0.11 V', note: { en: 'FNB58 source vs load — Ohm-consistent with ~55mΩ copper-class conductors', ar: 'FNB58 مصدر مقابل حمل — متسق مع قانون أوم ≈55 مللي أوم فئة نحاس' } },
            { param: { en: 'Implied VBUS+GND resistance', ar: 'مقاومة VBUS+GND المستنتجة' }, measured: '≈ 55 mΩ', note: { en: '0.11 V ÷ 2 A', ar: '0.11 V ÷ 2 A' } },
            { param: { en: 'Max stable constant-current (USB-A path, 5 min)', ar: 'أقصى تيار ثابت مستقر (مسار USB-A، 5 د)' }, rated: '3A (listing ceiling)', measured: '2.8 A', note: { en: '3A attempt source-throttled before clean 5-min hold — publish max stable, not listing as guaranteed', ar: 'محاولة 3A خُنقت من المصدر قبل ثبات 5 د نظيف — ننشر أقصى مستقر لا القائمة كمضمونة' } },
            { param: { en: 'Samsung Galaxy S24 peak (QC/AFC USB-A brick)', ar: 'ذروة Samsung Galaxy S24 (طوبة QC/AFC USB-A)' }, measured: '16.8 W', note: { en: 'FNB58 inline — not 25W PPS (PPS needs C-to-C PD path)', ar: 'FNB58 على الخط — ليس 25 واط PPS (PPS يحتاج مسار C-to-C PD)' } },
            { param: { en: 'iPhone 15 peak (USB-A class path via A-to-C)', ar: 'ذروة iPhone 15 (مسار فئة USB-A عبر A-to-C)' }, measured: '~9.1 W', note: { en: 'Honest A-host result — not Apple 20–27W PD', ar: 'نتيجة مضيف A أمينة — ليست PD 20–27 واط من Apple' } },
            { param: { en: 'Data speed (1GB file copy)', ar: 'سرعة البيانات (نسخ ملف 1 جيجا)' }, rated: 'USB 2.0 (480Mbps)', measured: '≈ 38 MB/s', note: { en: 'USB 2.0 class — charge/sync; no DisplayPort/Alt-mode/USB3', ar: 'فئة USB 2.0 — شحن/مزامنة؛ بلا DisplayPort/Alt-mode/USB3' } },
            { param: { en: 'Cable mid-span temp @ 2A / 5V (10 min)', ar: 'حرارة منتصف الكابل @ 2A / 5V (10 د)' }, measured: '36.8°C', note: { en: 'GM320 IR — within §7.4 safe range (≤45°C flag)', ar: 'GM320 IR — ضمن نطاق §7.4 الآمن (≤45°م علامة تحذير)' } },
            { param: { en: 'Strain-relief temp @ 2A / 5V (10 min)', ar: 'حرارة تخفيف الإجهاد @ 2A / 5V (10 د)' }, measured: '35.1°C', note: { en: 'no localized heating spike', ar: 'لا ارتفاع حراري موضعي' } },
            { param: { en: 'Continuity after 50 bench flex cycles', ar: 'الاستمرارية بعد 50 دورة ثني على المنضدة' }, measured: { en: 'Stable — no intermittent open on VBUS or GND', ar: 'مستقرة — بلا انقطاع متقطع على VBUS أو GND' }, note: { en: 'Bench flex only — NOT a certified fatigue test', ar: 'ثني على المنضدة فقط — **ليس** اختبار تعب معتمد' } },
        ],
        verdict: {
            en: 'JR-S-AC30 is a physics-clean ~1m USB-A→C bridge: 0.11V drop at 2A, 2.8A max stable, 16.8W Samsung QC/AFC and ~9.1W iPhone on A-host paths. Not USB-PD; not the 1.2m JR-S-AC12 sibling. USB 2.0 data only.',
            ar: 'JR-S-AC30 جسر USB-A→C ~1 م نظيف فيزيائيًا: هبوط 0.11 فولت عند 2A، أقصى مستقر 2.8A، 16.8 واط سامسونج QC/AFC و~9.1 واط iPhone على مسارات مضيف A. ليس USB-PD؛ ليس الشقيق 1.2 م JR-S-AC12. بيانات USB 2.0 فقط.',
        },
        pros: [
            { en: 'Voltage drop 0.11V at 2A over ~1m — Ohm-consistent ≈55mΩ, copper-class per §7.4 (not CCA-hot)', ar: 'هبوط الجهد 0.11 فولت عند 2A على ~1 م — متسق مع قانون أوم ≈55 مللي أوم، فئة نحاس وفق §7.4 (ليس CCA ساخنًا)' },
            { en: 'Honest real-device peaks on USB-A hosts: 16.8W Samsung S24 QC/AFC and ~9.1W iPhone 15 — no fake 60W PD claim', ar: 'ذروات أجهزة حية أمينة على مضيف USB-A: 16.8 واط Samsung S24 QC/AFC و~9.1 واط iPhone 15 — بلا ادعاء PD 60 واط زائف' },
            { en: 'USB 2.0 data verified ≈38 MB/s on 1GB copy — usable sync, not charge-only mystery wire', ar: 'بيانات USB 2.0 مؤكدة ≈38 ميغابايت/ث لنسخ 1 جيجا — مزامنة قابلة للاستخدام، ليس سلك شحن غامض' },
            { en: 'Mid-span 36.8°C at 2A/5V — cool under §7.4 ≤45°C flag; 21g / 101cm pocketable for Egypt student and Careem kits', ar: 'منتصف الكابل 36.8°م عند 2A/5V — بارد تحت علامة §7.4 ≤45°م؛ 21 ج / 101 سم مناسب لطقم طالب وCareem في مصر' },
            { en: 'Joyroom brand — not on Anker cable recall lists (A8482/A8483/A8465 verified 2026-07-24)', ar: 'علامة جوي روم — ليست على قوائم استرجاع كابلات Anker (A8482/A8483/A8465 متحققة 2026-07-24)' },
        ],
        limits: [
            { en: 'USB-A host cannot negotiate USB-PD/PPS — do NOT expect 20–60W PD or Samsung 25W/45W Super Fast Charging; use C-to-C + PD brick for that', ar: 'مضيف USB-A لا يتفاوض USB-PD/PPS — **لا** تتوقع PD 20–60 واط أو Super Fast Charging 25/45 واط؛ استخدم C-to-C + طوبة PD لذلك' },
            { en: 'Listed 3A is a ceiling — CairoVolt max stable constant-current on this USB-A path was 2.8A for 5 minutes; phone draw is still source+device limited', ar: '3A المعلن سقف — أقصى تيار ثابت مستقر لـ CairoVolt على مسار USB-A هذا كان 2.8A لمدة 5 دقائق؛ سحب الهاتف ما زال محدودًا بالمصدر والجهاز' },
            { en: 'Not the 1.2m sibling JR-S-AC12 — different MPN; do not merge specs or bench numbers across those SKUs', ar: '**ليس** الشقيق 1.2 م JR-S-AC12 — MPN مختلف؛ لا تدمج المواصفات أو أرقام المنضدة بين هذين الـ SKU' },
            { en: 'USB 2.0 data only — no DisplayPort/Alt-mode video; will NOT drive an external monitor', ar: 'بيانات USB 2.0 فقط — بلا فيديو DisplayPort/Alt-mode؛ **لن** يشغّل شاشة خارجية' },
            { en: 'No independent lab teardown of JR-S-AC30 published — CairoVolt did NOT open the housings; bend marketing figures are not a lifetime warranty (50 bench flex cycles only)', ar: '**لا** تفكيك مختبر مستقل منشور لـ JR-S-AC30 — **لم** تفتح CairoVolt المبيت؛ أرقام الثني التسويقية ليست ضمان عمر (50 دورة ثني على المنضدة فقط)' },
            { en: 'Single retail unit tested; production batches may vary — verify printed "JR-S-AC30" and GTIN 6956116750190 on your unit', ar: 'وحدة تجزئة واحدة مُختبرة؛ قد تختلف دفعات الإنتاج — تحقق من "JR-S-AC30" المطبوع وGTIN 6956116750190 على وحدتك' },
        ],
    },
};
