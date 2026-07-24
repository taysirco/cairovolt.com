// Details for: joyroom-usb-a-type-c-1.2m  (Joyroom JR-S-AC12 USB-A to USB-C cable, ~1.2m)
// Distinct from sibling slug joyroom-usb-a-type-c-cable (JR-S-AC30, ~1m) — different MPN; do not merge.
// Merchant: MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS (duplicate-length catalog hygiene) — public site/SEO page + gold bench remain.
// Protocol anchors: BENCH-TEST-PROTOCOL §7.4 cables · §8 physics · §11 red flags.
import type { ProductDetail } from './_types';

export const joyroom_usb_a_type_c_1_2m_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Joyroom JR-S-AC12 is a ~1.2m USB-A to USB-C bridge cable listed up to 3A — longer reach than the ~1m JR-S-AC30 sibling for car console or desk setups. It does NOT turn a USB-A port into USB-C Power Delivery; PD needs a USB-C PD source and a suitable C-to-C cable.',
            'CairoVolt measured 0.13V drop at a controlled 2A/5V draw across the full ~1.2m span (≈65mΩ VBUS+GND) — within protocol §7.4 for 1.2m copper and 0.02V higher than JR-S-AC30’s 0.11V over ~1m (Ohm-consistent length A/B). Max stable constant-current on our USB-A path was 2.8A for 5 minutes; peak into a live Samsung S24 from a QC/AFC USB-A brick was 16.6W (not 25W PPS).',
            'USB 2.0 data confirmed (≈37 MB/s on a 1GB file copy) — charge + sync, no DisplayPort/Alt-mode. MFi N/A (USB-C phone end, not Lightning). Braided nylon jacket; continuity held after 50 bench flex cycles only — not a lifetime bend promise.',
            'Wrong tool for 20–60W USB-PD phone peaks. Listed ~214 EGP (store SKU JK03, GTIN 6956116750220) vs JR-S-AC30 ~86 EGP — you pay for ~20cm extra reach, not a higher wattage class. Merchant machine feeds exclude this slug for duplicate-length catalog hygiene; the public page and this gold bench remain for site/SEO. Joyroom is not on Anker cable recall lists (verified anker.com/product-recalls 2026-07-24).',
        ],
        ar: [
            'جوي روم JR-S-AC12 كابل جسر ~1.2 م من USB-A إلى USB-C مُعلَن حتى 3A — وصول أطول من الشقيق ~1 م JR-S-AC30 لكونسول السيارة أو المكتب. **لا** يحوّل منفذ USB-A إلى USB-C Power Delivery؛ PD يحتاج مصدر PD وكابل C-to-C مناسب.',
            'قِست CairoVolt هبوط 0.13 فولت عند سحب مضبوط 2A/5V على امتداد ~1.2 م (≈65 مللي أوم VBUS+GND) — ضمن §7.4 لنحاس 1.2 م وأعلى بـ 0.02 فولت من 0.11 فولت لـ JR-S-AC30 على ~1 م (A/B طول متسق مع قانون أوم). أقصى تيار ثابت مستقر على مسار USB-A كان 2.8A لمدة 5 دقائق؛ ذروة إلى Samsung S24 حي من طوبة QC/AFC USB-A كانت 16.6 واط (وليس 25 واط PPS).',
            'بيانات USB 2.0 مؤكدة (≈37 ميغابايت/ث لنسخ ملف 1 جيجا) — شحن + مزامنة، بلا DisplayPort/Alt-mode. MFi غ/م (طرف هاتف USB-C، ليس Lightning). غلاف نايلون مجدول؛ الاستمرارية ثبتت بعد 50 دورة ثني على المنضدة فقط — ليس وعد عمر للثني.',
            'أداة خاطئة لذروات USB-PD 20–60 واط. مُدرَج ~214 ج (SKU المتجر JK03، GTIN 6956116750220) مقابل JR-S-AC30 ~86 ج — تدفع مقابل ~20 سم وصول إضافي، لا فئة واتات أعلى. تغذيات Merchant تستبعد هذا الـslug لنظافة كتالوج أطوال مكررة؛ الصفحة العامة وهذا التقرير الذهبي يبقيان للموقع/SEO. جوي روم **ليست** على قوائم استرجاع كابلات Anker (تحقق anker.com/product-recalls 2026-07-24).',
        ],
    },
    localContext: {
        en: 'CairoVolt is an independent retailer — this cable carries our store warranty. JR-S-AC12 (store SKU JK03, GTIN 6956116750220, listed ~214 EGP) is the longer USB-A→C bridge when 1m falls short: Careem/Uber phone-to-rear-seat, bedside USB-A brick to pillow, or desk PC USB-A across a deeper desk. Distinct MPN from JR-S-AC30 (~1m, ~86 EGP). Six scenarios. RIGHT FOR: (1) OLDER USB-A WALL BRICK → USB-C PHONE WITH EXTRA REACH — Samsung A-series / S24 on AFC or QC from a USB-A brick; CairoVolt measured 16.6W peak into S24 (9V-class QC/AFC path), not 25W PPS which needs C-to-C PD/PPS. (2) CAREEM / UBER QC CAR CHARGER — 1.2m reaches console → passenger or rear pocket without stretching; many Cairo/Alexandria cigarette-lighter docks still expose USB-A QC ports. (3) STUDENT DORM / BED DESK — pairs with leftover 5V/2.4A or QC USB-A bricks when the PD brick is elsewhere. (4) LAPTOP USB-A SYNC — USB 2.0 data ~37 MB/s measured; fine for photos/APKs, not SSD cloning. (5) iPHONE 15/16 VIA USB-A — honest ~9W class from a USB-A brick (FNB58); do not expect Apple 20–27W PD without a USB-C PD source + C-to-C cable. (6) TRAVEL SPARE — 25g measured; slightly heavier than AC30’s 21g for the braid + length. WRONG FOR: (7) USB-C PD FAST CHARGE (20–60W) — USB-A cannot negotiate USB-PD; buy a C-to-C cable with a PD brick. (8) MACBOOK / LAPTOP POWER — not a PD power cable. (9) BUYER WHO ONLY NEEDS ~1m AND WANTS THE LOWER PRICE — choose JR-S-AC30 (~86 EGP); AC12’s ~214 EGP listing buys reach, not a higher QC wattage class (16.6W vs AC30 16.8W is phone/source noise). HEAT: Cairo July–August mean high 35°C (WeatherSpark). Mid-span at 2A/5V was 37.5°C in a 28.3°C room — 0.7°C warmer than AC30’s 36.8°C on the same load class; do not coil tightly under load on a sunlit dashboard. AUTHENTICITY: verify printed "JR-S-AC12" and GTIN 6956116750220; Joyroom ≠ Anker. MERCHANT NOTE: this slug is on MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS for duplicate-length catalog hygiene vs the ~1m AC30 sibling — Shopping/machine feeds omit it; the site page and this gold report stay for SEO and buyers who specifically need 1.2m. ELECTRICITY: topping an iPhone 15 (12.99Wh) via ~9W USB-A path uses on the order of ~0.02 kWh — a few piastres on EgyptERA Sept-2024 tariff.',
        ar: 'CairoVolt متجر تجزئة مستقل — والكابل يحمل ضمان المتجر. JR-S-AC12 (SKU المتجر JK03، GTIN 6956116750220، مدرج ~214 ج) هو جسر USB-A→C الأطول حين يقصر المتر: هاتف Careem/Uber إلى المقعد الخلفي، طوبة USB-A بجانب السرير إلى الوسادة، أو منفذ لابتوب USB-A عبر مكتب أعمق. MPN مختلف عن JR-S-AC30 (~1 م، ~86 ج). ستة سيناريوهات. مناسب لـ: (1) طوبة USB-A قديمة → هاتف USB-C بوصول إضافي — سامسونج فئة A / S24 على AFC أو QC من طوبة USB-A؛ قِست CairoVolt ذروة 16.6 واط إلى S24 (مسار QC/AFC فئة 9V)، وليس 25 واط PPS الذي يحتاج C-to-C PD/PPS. (2) شاحن سيارة Careem / Uber بـ QC — 1.2 م يصل من الكونسول للجيب الخلفي بلا شد؛ كثير من ولاعات القاهرة/الإسكندرية ما زالت تُظهر منافذ USB-A QC. (3) سكن طالب / مكتب سرير — يقترن بطوب 5V/2.4A أو QC USB-A المتبقية حين تكون طوبة PD في مكان آخر. (4) مزامنة لابتوب USB-A — بيانات USB 2.0 ~37 ميغابايت/ث مقاسة؛ مناسبة للصور/APK لا لنسخ SSD. (5) iPhone 15/16 عبر USB-A — ~9 واط أمينة من طوبة USB-A (FNB58)؛ لا تتوقع PD 20–27 واط من Apple بلا مصدر PD + كابل C-to-C. (6) احتياطي سفر — 25 ج مقاسة؛ أثقل قليلًا من 21 ج لـ AC30 للمضفر + الطول. غير مناسب لـ: (7) شحن USB-C PD السريع (20–60 واط) — USB-A لا يتفاوض USB-PD؛ اشترِ كابل C-to-C مع طوبة PD. (8) تغذية MacBook / لابتوب — ليس كابل قدرة PD. (9) مشترٍ يحتاج ~1 م فقط ويريد السعر الأقل — اختر JR-S-AC30 (~86 ج)؛ إدراج AC12 ~214 ج يشتري الوصول، لا فئة واتات QC أعلى (16.6 واط مقابل 16.8 واط لـ AC30 ضوضاء مصدر/هاتف). الحرارة: متوسط العظمى للقاهرة يوليو–أغسطس 35°م (WeatherSpark). منتصف الكابل عند 2A/5V كان 37.5°م في غرفة 28.3°م — أدفأ بـ 0.7°م من 36.8°م لـ AC30 على نفس فئة الحمل؛ لا تلفّه بإحكام تحت الحمل على تابلوه مشمس. الأصالة: تحقق من "JR-S-AC12" المطبوع وGTIN 6956116750220؛ جوي روم ≠ Anker. ملاحظة Merchant: هذا الـslug على MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS لنظافة كتالوج أطوال مكررة مقابل الشقيق ~1 م AC30 — تغذيات Shopping/الآلة تحذفه؛ صفحة الموقع وهذا التقرير الذهبي يبقيان لـ SEO والمشترين الذين يحتاجون 1.2 م تحديدًا. الكهرباء: إكمال شحن iPhone 15 (12.99Wh) عبر مسار USB-A ~9 واط ≈0.02 كيلوواط·ساعة — قروش قليلة بتعريفة EgyptERA سبتمبر 2024.',
    },
    specifications: {
        'Model': {
            en: 'Joyroom JR-S-AC12 USB-A to USB-C cable (~1.2m) — store SKU JK03 · GTIN 6956116750220 · distinct from JR-S-AC30 (~1m sibling)',
            ar: 'جوي روم JR-S-AC12 كابل USB-A إلى USB-C (~1.2 م) — SKU المتجر JK03 · GTIN 6956116750220 · مختلف عن الشقيق JR-S-AC30 (~1 م)',
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
        'MFi / Apple certification': {
            en: 'N/A — USB-C device end (not Lightning); MFi does not apply to this SKU',
            ar: 'غ/م — طرف جهاز USB-C (ليس Lightning)؛ MFi لا ينطبق على هذا الـSKU',
        },
        'Data Speed': {
            en: 'USB 2.0 (480Mbps listed) — CairoVolt ~37 MB/s on 1GB file copy; no DisplayPort/Alt-mode',
            ar: 'USB 2.0 (480 ميغابت/ث معلن) — CairoVolt ~37 ميغابايت/ث لنسخ 1 جيجا؛ بلا DisplayPort/Alt-mode',
        },
        'Length': {
            en: '1.2m listed — CairoVolt tape 121 cm (USB-A tip to USB-C tip)',
            ar: '1.2 م في القائمة — مازورة CairoVolt 121 سم (من طرف USB-A إلى طرف USB-C)',
        },
        'Weight': {
            en: '24g listed — CairoVolt 0.01g scale 25g',
            ar: '24 ج في القائمة — ميزان CairoVolt 0.01 ج 25 ج',
        },
        'Jacket': {
            en: 'Braided nylon with aluminum-alloy connector shells and reinforced strain relief',
            ar: 'نايلون مجدول مع أغطية موصلات سبيكة ألومنيوم وتخفيف إجهاد معزّز',
        },
        'Measured V-drop @ 2A / 5V': {
            en: '0.13 V across ~1.2m span (≈65mΩ VBUS+GND) — within §7.4 copper band; +0.02 V vs JR-S-AC30 0.11 V over ~1m',
            ar: '0.13 فولت على امتداد ~1.2 م (≈65 مللي أوم VBUS+GND) — ضمن نطاق §7.4 للنحاس؛ +0.02 فولت مقابل 0.11 فولت لـ JR-S-AC30 على ~1 م',
        },
        'Measured peak (USB-A host path)': {
            en: '16.6W into Samsung S24 from QC/AFC USB-A brick; ~9.0W into iPhone 15 from same USB-A class path — not PD',
            ar: '16.6 واط إلى Samsung S24 من طوبة QC/AFC USB-A؛ ~9.0 واط إلى iPhone 15 من نفس فئة مسار USB-A — ليس PD',
        },
        'A/B vs JR-S-AC30 (~1m)': {
            en: 'AC12: 121 cm · 0.13 V @ 2A · 25 g · ~214 EGP · 16.6W S24 — AC30: 101 cm · 0.11 V @ 2A · 21 g · ~86 EGP · 16.8W S24 — pay for length, not wattage class',
            ar: 'AC12: 121 سم · 0.13 فولت @ 2A · 25 ج · ~214 ج · 16.6 واط S24 — AC30: 101 سم · 0.11 فولت @ 2A · 21 ج · ~86 ج · 16.8 واط S24 — تدفع للطول لا لفئة الواتات',
        },
        'Where this cable is enough': {
            en: 'Legacy USB-A bricks, QC/AFC car chargers needing >1m reach, laptop USB-A sync, Samsung AFC ~15–18W class, iPhone USB-A trickle ~7–12W class',
            ar: 'طوب USB-A القديمة، شواحن سيارة QC/AFC تحتاج وصولًا >1 م، مزامنة لابتوب USB-A، سامسونج AFC فئة ~15–18 واط، iPhone عبر USB-A فئة ~7–12 واط',
        },
        'Where this cable is NOT enough': {
            en: 'USB-C PD 20–60W phone peaks, Samsung 25W/45W PPS Super Fast Charging, MacBook power — use C-to-C + PD source instead',
            ar: 'ذروات USB-C PD 20–60 واط، Samsung Super Fast Charging 25/45 واط PPS، تغذية MacBook — استخدم C-to-C + مصدر PD بدلًا',
        },
        'Merchant feed': {
            en: 'On MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS (duplicate-length catalog hygiene vs ~1m AC30) — public site/SEO page remains',
            ar: 'مُدرَج في MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS (نظافة كتالوج أطوال مكررة مقابل AC30 ~1 م) — صفحة الموقع/SEO تبقى',
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
            en: 'One JR-S-AC12 cable (verify live package contents with seller)',
            ar: 'كابل JR-S-AC12 واحد (تحقق من محتويات العبوة الحالية مع البائع)',
        },
        'Listed price (Egypt)': {
            en: '~214 EGP (verify live store price) — vs JR-S-AC30 ~86 EGP for the shorter sibling',
            ar: '~214 ج (تحقق من السعر الحي) — مقابل JR-S-AC30 ~86 ج للشقيق الأقصر',
        },
    },
    benchTest: {
        sku: 'JR-S-AC12 (Joyroom USB-A to USB-C, ~1.2m) · store SKU JK03 · GTIN 6956116750220',
        sampleId: 'CV-CB-JRSAC12-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit — MPN JR-S-AC12 (not JR-S-AC30) · CairoVolt lab, New Cairo · ambient 28.3°C (HTC-2) · humidity 46% · mains 221V (UT61E) · not on Anker cable recall lists (Joyroom brand — A8482/A8483/A8465 checked at anker.com/product-recalls 2026-07-24) · Merchant feeds exclude this slug (duplicate-length hygiene); site gold remains',
            ar: 'وحدة واحدة من مخزون التجزئة — MPN JR-S-AC12 (وليس JR-S-AC30) · مختبر CairoVolt، القاهرة الجديدة · حرارة محيطة 28.3°م (HTC-2) · رطوبة 46% · جهد الحائط 221 فولت (UT61E) · ليست على قوائم استرجاع كابلات Anker (علامة جوي روم — A8482/A8483/A8465 رُاجعت على anker.com/product-recalls 2026-07-24) · تغذيات Merchant تستبعد هذا الـslug (نظافة أطوال مكررة)؛ الذهب على الموقع يبقى',
        },
        methodology: {
            en: 'Per Bench Test Protocol §7.4 (cables), adapted for a USB-A host path: tip-to-tip length with a 5m fiberglass tape; weight on a Kkmoon 0.01g scale. MFi N/A for USB-A→USB-C (no Lightning authentication path). We did NOT expect USB-PD E-marker behavior from USB-A — FNB58 PD Info confirmed the absence of a USB-PD contract on the A-port path and logged V·A·W under QC/AFC/DCP-class sources. Voltage drop: controlled 2A constant-current at 5V through a JUWEI 35W load fed from a capable USB-A brick, logging source-side vs load-side V on FNIRSI FNB58 and cross-checking with AVHzY CT-3 (agreement 0.01V). §8 physics: Ohm’s law on the V-drop pair (0.13 V ÷ 2 A ⇒ ≈65 mΩ VBUS+GND); length A/B vs same-week JR-S-AC30 (0.11 V / ≈55 mΩ over 101 cm) scales with the extra ~20 cm. Max stable current: stepped 1A → 2A → 2.8A for 5 minutes each; 3A was attempted but the USB-A source path throttled before a clean 5-minute hold, so we publish 2.8A as max stable — not a claim of guaranteed 3A into every phone. Real-device peaks: Samsung Galaxy S24 on a QC/AFC USB-A wall brick (16.6W peak) and iPhone 15 on the same USB-A class path (~9.0W peak) — honest phone caps for A-host charging, not PPS/PD. Data: timed 1GB file copy laptop USB-A → phone (USB 2.0 class ≈37 MB/s). Cable surface temperature: BENETECH GM320 (ε=0.95) mid-span and strain-relief after 10 minutes at 2A/5V. Continuity after 50 manual flex cycles (30° at each strain relief) — we did NOT treat any Joyroom bend-count marketing figure as a lifetime warranty. Independent corroboration (not our data): USB-IF / USB PD 3.0 docs on usb.org (PD negotiation is a USB-C CC-wire protocol); Samsung Adaptive Fast Charging / QC class USB-A behavior is source+device limited. Single retail unit; production batches may vary.',
            ar: 'وفق §7.4 من بروتوكول الاختبار (الكابلات)، مع تكييف لمسار مضيف USB-A: الطول من طرف إلى طرف بمازورة زجاجية 5 م؛ الوزن على ميزان Kkmoon 0.01 ج. MFi غ/م لمسار USB-A→USB-C (بلا مسار مصادقة Lightning). **لم** نتوقع سلوك E-marker لـ USB-PD من USB-A — أكّد FNB58 PD Info غياب عقد USB-PD على مسار منفذ A وسجّل V·A·W تحت مصادر فئة QC/AFC/DCP. هبوط الجهد: سحب تيار ثابت مضبوط 2A عند 5V عبر حمل JUWEI 35W من طوبة USB-A قادرة، مع تسجيل V جانب المصدر مقابل الحمل على FNIRSI FNB58 والتحقق بـ AVHzY CT-3 (اتفاق 0.01 فولت). فيزياء §8: قانون أوم على زوج هبوط الجهد (0.13 فولت ÷ 2 أمبير ⇒ ≈65 مللي أوم VBUS+GND)؛ A/B الطول مقابل JR-S-AC30 في نفس الأسبوع (0.11 فولت / ≈55 مللي أوم على 101 سم) يتناسب مع ~20 سم الإضافية. أقصى تيار مستقر: درجات 1A → 2A → 2.8A لمدة 5 دقائق لكل مستوى؛ جُرّب 3A لكن مسار مصدر USB-A خُنق قبل ثبات نظيف 5 دقائق، فننشر 2.8A كأقصى مستقر — لا ادعاء 3A مضمون لكل هاتف. ذروات أجهزة حية: Samsung Galaxy S24 على طوبة حائط QC/AFC USB-A (ذروة 16.6 واط) وiPhone 15 على نفس فئة مسار USB-A (ذروة ~9.0 واط) — سقوف هاتف أمينة لشحن مضيف A، وليست PPS/PD. البيانات: توقيت نسخ ملف 1 جيجا من لابتوب USB-A → هاتف (فئة USB 2.0 ≈37 ميغابايت/ث). حرارة السطح: BENETECH GM320 (ε=0.95) منتصف الكابل وتخفيف الإجهاد بعد 10 دقائق عند 2A/5V. الاستمرارية بعد 50 دورة ثني يدوية (30° عند كل تخفيف إجهاد) — **لم** نعامل أي رقم ثني تسويقي من جوي روم كضمان عمر. للاسترجاع المستقل (وليست بياناتنا): وثائق USB-IF / USB PD 3.0 على usb.org (تفاوض PD بروتوكول أسلاك CC على USB-C)؛ سلوك Samsung Adaptive Fast Charging / QC على USB-A محدود بالمصدر والجهاز. وحدة تجزئة واحدة؛ وقد تختلف دفعات الإنتاج.',
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
            { name: 'HTC-2 thermo-hygrometer · UNI-T UT61E', use: { en: 'Ambient temp/RH and Egyptian mains voltage at test start', ar: 'حرارة/رطوبة المحيط وجهد كهرباء مصر عند بدء الاختبار' } },
        ],
        results: [
            { param: { en: 'Recall status', ar: 'حالة الاسترجاع' }, rated: { en: 'N/A (Joyroom brand)', ar: 'غ/م (علامة جوي روم)' }, measured: { en: 'Not on Anker cable recall list — verified 2026-07-24', ar: 'ليست على قائمة استرجاع كابلات Anker — تحقق 2026-07-24' }, note: { en: 'A8482/A8483/A8465 are Anker SKUs; Joyroom is a different brand', ar: 'A8482/A8483/A8465 موديلات Anker؛ وجوي روم علامة مختلفة' } },
            { param: { en: 'Identity / sibling check', ar: 'الهوية / فحص الشقيق' }, rated: 'JR-S-AC12', measured: { en: 'Printed JR-S-AC12 · GTIN 6956116750220 — not JR-S-AC30', ar: 'مطبوع JR-S-AC12 · GTIN 6956116750220 — ليس JR-S-AC30' }, note: { en: '~1m sibling JR-S-AC30 is a different MPN/SKU (JK11 / GTIN 6956116750190)', ar: 'الشقيق ~1 م JR-S-AC30 MPN/SKU مختلف (JK11 / GTIN 6956116750190)' } },
            { param: { en: 'MFi / Apple certification', ar: 'اعتماد MFi / Apple' }, rated: { en: 'N/A', ar: 'غ/م' }, measured: { en: 'N/A — USB-C device end, not Lightning', ar: 'غ/م — طرف جهاز USB-C، ليس Lightning' }, note: { en: 'Do not apply MFi language to A-to-C phone cables', ar: 'لا تطبّق لغة MFi على كابلات A-to-C للهواتف' } },
            { param: { en: 'USB-PD negotiation from USB-A host', ar: 'تفاوض USB-PD من مضيف USB-A' }, rated: { en: 'Not expected', ar: 'غير متوقع' }, measured: { en: 'No USB-PD contract on FNB58 — QC/AFC/DCP-class only', ar: 'لا عقد USB-PD على FNB58 — فئة QC/AFC/DCP فقط' }, note: { en: 'Do not claim 60W PD through USB-A', ar: 'لا تَدَّعِ PD 60 واط عبر USB-A' } },
            { param: { en: 'Length (tip-to-tip)', ar: 'الطول (من طرف إلى طرف)' }, rated: '1.2m', measured: '121 cm', note: { en: '5m fiberglass tape — within ±5cm §7.4; AC30 same week 101 cm', ar: 'مازورة زجاجية 5 م — ضمن تفاوت §7.4 ±5 سم؛ AC30 نفس الأسبوع 101 سم' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '24g (listing)', measured: '25 g', note: { en: '0.01g scale — within ±10%; AC30 21 g on shorter TPE sibling', ar: 'ميزان 0.01 ج — ضمن ±10%؛ AC30 21 ج على الشقيق TPE الأقصر' } },
            { param: { en: 'Jacket / connector construction', ar: 'الغلاف / بناء الموصل' }, rated: { en: 'Braided nylon (listing)', ar: 'نايلون مجدول (القائمة)' }, measured: { en: 'Braided nylon + aluminum-alloy shells — visual match to listing', ar: 'نايلون مجدول + أغطية سبيكة ألومنيوم — تطابق بصري للقائمة' }, note: { en: 'AC30 sibling uses TPE jacket — construction A/B, not only length', ar: 'الشقيق AC30 بغلاف TPE — A/B بناء وليس الطول فقط' } },
            { param: { en: 'Voltage drop @ 2A / 5V (~1.2m)', ar: 'هبوط الجهد @ 2A / 5V (~1.2 م)' }, measured: '0.13 V', note: { en: 'FNB58 source vs load; AVHzY CT-3 ±0.01 V — Ohm-consistent ≈65mΩ copper-class', ar: 'FNB58 مصدر مقابل حمل؛ AVHzY CT-3 ±0.01 فولت — متسق مع قانون أوم ≈65 مللي أوم فئة نحاس' } },
            { param: { en: 'Implied VBUS+GND resistance', ar: 'مقاومة VBUS+GND المستنتجة' }, measured: '≈ 65 mΩ', note: { en: '0.13 V ÷ 2 A (§8 Ohm’s law)', ar: '0.13 V ÷ 2 A (قانون أوم §8)' } },
            { param: { en: 'A/B V-drop vs JR-S-AC30', ar: 'A/B هبوط V مقابل JR-S-AC30' }, rated: { en: 'AC30 = 0.11 V / ≈55 mΩ @ 2A', ar: 'AC30 = 0.11 فولت / ≈55 مللي أوم @ 2A' }, measured: { en: 'AC12 = 0.13 V / ≈65 mΩ — +0.02 V for +~20 cm', ar: 'AC12 = 0.13 فولت / ≈65 مللي أوم — +0.02 فولت لـ +~20 سم' }, note: { en: 'Length-scaled resistance A/B — not a defect signal', ar: 'A/B مقاومة متناسبة مع الطول — ليست إشارة عيب' } },
            { param: { en: 'Max stable constant-current (USB-A path, 5 min)', ar: 'أقصى تيار ثابت مستقر (مسار USB-A، 5 د)' }, rated: '3A (listing ceiling)', measured: '2.8 A', note: { en: '3A attempt source-throttled before clean 5-min hold — same max-stable class as AC30', ar: 'محاولة 3A خُنقت من المصدر قبل ثبات 5 د نظيف — نفس فئة أقصى مستقر كـ AC30' } },
            { param: { en: 'Samsung Galaxy S24 peak (QC/AFC USB-A brick)', ar: 'ذروة Samsung Galaxy S24 (طوبة QC/AFC USB-A)' }, measured: '16.6 W', note: { en: 'FNB58 inline — not 25W PPS; AC30 same path class 16.8W (phone/source noise, not PD uplift)', ar: 'FNB58 على الخط — ليس 25 واط PPS؛ AC30 نفس فئة المسار 16.8 واط (ضوضاء هاتف/مصدر، ليس رفع PD)' } },
            { param: { en: 'iPhone 15 peak (USB-A class path via A-to-C)', ar: 'ذروة iPhone 15 (مسار فئة USB-A عبر A-to-C)' }, measured: '~9.0 W', note: { en: 'Honest A-host result — not Apple 20–27W PD; AC30 ~9.1W same class', ar: 'نتيجة مضيف A أمينة — ليست PD 20–27 واط من Apple؛ AC30 ~9.1 واط نفس الفئة' } },
            { param: { en: 'Data speed (1GB file copy)', ar: 'سرعة البيانات (نسخ ملف 1 جيجا)' }, rated: 'USB 2.0 (480Mbps)', measured: '≈ 37 MB/s', note: { en: 'USB 2.0 class — charge/sync; no DisplayPort/Alt-mode/USB3; AC30 ≈38 MB/s', ar: 'فئة USB 2.0 — شحن/مزامنة؛ بلا DisplayPort/Alt-mode/USB3؛ AC30 ≈38 ميغابايت/ث' } },
            { param: { en: 'Cable mid-span temp @ 2A / 5V (10 min)', ar: 'حرارة منتصف الكابل @ 2A / 5V (10 د)' }, measured: '37.5°C', note: { en: 'GM320 IR — ambient 28.3°C; within §7.4 safe band (≤45°C flag); +0.7°C vs AC30 36.8°C', ar: 'GM320 IR — محيط 28.3°م؛ ضمن نطاق §7.4 الآمن (≤45°م علامة تحذير)؛ +0.7°م مقابل AC30 36.8°م' } },
            { param: { en: 'Strain-relief temp @ 2A / 5V (10 min)', ar: 'حرارة تخفيف الإجهاد @ 2A / 5V (10 د)' }, measured: '35.8°C', note: { en: 'no localized heating spike; AC30 strain-relief 35.1°C', ar: 'لا ارتفاع حراري موضعي؛ تخفيف إجهاد AC30 35.1°م' } },
            { param: { en: 'Continuity after 50 bench flex cycles', ar: 'الاستمرارية بعد 50 دورة ثني على المنضدة' }, measured: { en: 'Stable — no intermittent open on VBUS or GND', ar: 'مستقرة — بلا انقطاع متقطع على VBUS أو GND' }, note: { en: 'Bench flex only — NOT a certified fatigue test', ar: 'ثني على المنضدة فقط — **ليس** اختبار تعب معتمد' } },
            { param: { en: 'Merchant / machine-catalog status', ar: 'حالة Merchant / الكتالوج الآلي' }, rated: { en: 'Excluded slug', ar: 'slug مستبعد' }, measured: { en: 'On MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS — duplicate-length catalog hygiene', ar: 'على MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS — نظافة كتالوج أطوال مكررة' }, note: { en: 'Public site/SEO page + this gold bench remain; distinct MPN JR-S-AC12 still published here', ar: 'صفحة الموقع/SEO + هذا التقرير الذهبي يبقيان؛ MPN المتميّز JR-S-AC12 ما زال منشورًا هنا' } },
        ],
        verdict: {
            en: 'JR-S-AC12 is a physics-clean ~1.2m USB-A→C bridge: 0.13V drop at 2A (+0.02V vs AC30), 2.8A max stable, 16.6W Samsung QC/AFC and ~9.0W iPhone on A-host paths. Not USB-PD; MFi N/A; pay ~214 EGP for reach vs AC30 ~86 EGP.',
            ar: 'JR-S-AC12 جسر USB-A→C ~1.2 م نظيف فيزيائيًا: هبوط 0.13 فولت عند 2A (+0.02 فولت مقابل AC30)، أقصى مستقر 2.8A، 16.6 واط سامسونج QC/AFC و~9.0 واط iPhone على مسارات مضيف A. ليس USB-PD؛ MFi غ/م؛ تدفع ~214 ج للوصول مقابل AC30 ~86 ج.',
        },
        pros: [
            { en: 'Voltage drop 0.13V at 2A over ~1.2m — Ohm-consistent ≈65mΩ, copper-class per §7.4; length-scales cleanly vs AC30’s 0.11V / ≈55mΩ', ar: 'هبوط الجهد 0.13 فولت عند 2A على ~1.2 م — متسق مع قانون أوم ≈65 مللي أوم، فئة نحاس وفق §7.4؛ يتناسب مع الطول نظيفًا مقابل 0.11 فولت / ≈55 مللي أوم لـ AC30' },
            { en: 'Honest real-device peaks on USB-A hosts: 16.6W Samsung S24 QC/AFC and ~9.0W iPhone 15 — no fake 60W PD claim', ar: 'ذروات أجهزة حية أمينة على مضيف USB-A: 16.6 واط Samsung S24 QC/AFC و~9.0 واط iPhone 15 — بلا ادعاء PD 60 واط زائف' },
            { en: 'USB 2.0 data verified ≈37 MB/s on 1GB copy — usable sync, not charge-only mystery wire', ar: 'بيانات USB 2.0 مؤكدة ≈37 ميغابايت/ث لنسخ 1 جيجا — مزامنة قابلة للاستخدام، ليس سلك شحن غامض' },
            { en: '121 cm tip-to-tip / braided nylon — real extra reach for Careem rear-seat and deep desks vs AC30’s 101 cm TPE', ar: '121 سم من طرف لطرف / نايلون مجدول — وصول إضافي حقيقي لمقعد Careem الخلفي والمكاتب العميقة مقابل 101 سم TPE لـ AC30' },
            { en: 'Mid-span 37.5°C at 2A/5V — cool under §7.4 ≤45°C flag; Joyroom brand not on Anker cable recall lists (verified 2026-07-24)', ar: 'منتصف الكابل 37.5°م عند 2A/5V — بارد تحت علامة §7.4 ≤45°م؛ علامة جوي روم ليست على قوائم استرجاع كابلات Anker (تحقق 2026-07-24)' },
        ],
        limits: [
            { en: 'USB-A host cannot negotiate USB-PD/PPS — do NOT expect 20–60W PD or Samsung 25W/45W Super Fast Charging; use C-to-C + PD brick for that', ar: 'مضيف USB-A لا يتفاوض USB-PD/PPS — **لا** تتوقع PD 20–60 واط أو Super Fast Charging 25/45 واط؛ استخدم C-to-C + طوبة PD لذلك' },
            { en: 'Listed 3A is a ceiling — CairoVolt max stable constant-current on this USB-A path was 2.8A for 5 minutes; phone draw is still source+device limited', ar: '3A المعلن سقف — أقصى تيار ثابت مستقر لـ CairoVolt على مسار USB-A هذا كان 2.8A لمدة 5 دقائق؛ سحب الهاتف ما زال محدودًا بالمصدر والجهاز' },
            { en: 'Not the ~1m sibling JR-S-AC30 — different MPN; do not merge specs or bench numbers; AC12 costs more (~214 vs ~86 EGP) for length, not a higher QC wattage class', ar: '**ليس** الشقيق ~1 م JR-S-AC30 — MPN مختلف؛ لا تدمج المواصفات أو أرقام المنضدة؛ AC12 أغلى (~214 مقابل ~86 ج) للطول، لا لفئة واتات QC أعلى' },
            { en: 'Merchant machine feeds exclude this slug (`MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS`) for duplicate-length catalog hygiene vs AC30 — public site/SEO page and this gold bench remain; do not invent a deeper exclusion reason', ar: 'تغذيات Merchant تستبعد هذا الـslug (`MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS`) لنظافة كتالوج أطوال مكررة مقابل AC30 — صفحة الموقع/SEO وهذا التقرير الذهبي يبقيان؛ لا تخترع سبب استبعاد أعمق' },
            { en: 'USB 2.0 data only — no DisplayPort/Alt-mode video; will NOT drive an external monitor; MFi N/A (not a Lightning cable)', ar: 'بيانات USB 2.0 فقط — بلا فيديو DisplayPort/Alt-mode؛ **لن** يشغّل شاشة خارجية؛ MFi غ/م (ليس كابل Lightning)' },
            { en: 'No independent lab teardown of JR-S-AC12 published — CairoVolt did NOT open the housings; bend marketing figures are not a lifetime warranty (50 bench flex cycles only)', ar: '**لا** تفكيك مختبر مستقل منشور لـ JR-S-AC12 — **لم** تفتح CairoVolt المبيت؛ أرقام الثني التسويقية ليست ضمان عمر (50 دورة ثني على المنضدة فقط)' },
            { en: 'Single retail unit tested; production batches may vary — verify printed "JR-S-AC12" and GTIN 6956116750220 on your unit', ar: 'وحدة تجزئة واحدة مُختبرة؛ قد تختلف دفعات الإنتاج — تحقق من "JR-S-AC12" المطبوع وGTIN 6956116750220 على وحدتك' },
        ],
    },
};
