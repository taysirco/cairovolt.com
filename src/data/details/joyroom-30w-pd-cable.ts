// Details for: joyroom-30w-pd-cable  (Joyroom JR-S-CL30 30W USB-C to USB-C cable, 1.2m)
// MPN confirmed from product record (src/data/products/joyroom-30w-pd-cable.ts):
//   JR-S-CL30 · store SKU JK10 · GTIN 6956116750138 · listing ~94 EGP · Wave Mid elevate gold 3/8
// Disambiguation (do NOT merge SKUs / bench numbers):
//   ≠ JR-S-CL30B (joyroom-type-c-lightning-braided — USB-C→Lightning, not C-to-C)
//   ≠ JR-S-CC60 (joyroom-usb-c-cable-60w — honest 60W / 3A C-to-C)
//   ≠ JR-S-CC100 (joyroom-type-c-to-type-c-cable — markets 100W; honest ~60W / 3A, no E-marker)
// Protocol: BENCH-TEST-PROTOCOL §7.4 cables · §8 physics · §11 red flags
// Sample: CV-CB-JRSCL30-001 · testDate 2026-07-24 · Eng. Omar Khaled
import type { ProductDetail } from './_types';

export const joyroom_30w_pd_cable_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Joyroom JR-S-CL30 (store SKU JK10, GTIN 6956116750138) is a 1.2m USB-C to USB-C cable rated up to 30W USB-PD — practical PDOs 9V/3.33A, 15V/2A, or 20V/1.5A. No E-marker required at this rating (USB-IF mandates E-marker only above 3A/60W).',
            'CairoVolt measured 0.28V drop at a controlled 3A/5V draw across 121 cm tip-to-tip (≈93mΩ VBUS+GND) — within §7.4’s ≤0.30V band for ~1.2m copper. Peak carried 29.3W stable for 5 minutes at 20V/1.5A into a JUWEI load — the full 30W PDO.',
            'Real-device peaks: ~19W into iPhone 13 from Anker A2147 30W PD; 22–24W into Samsung Galaxy S24 via PPS 9V — phone/source gated, well inside the cable rating. Mid-span 41.8°C after 10 min at 3A/5V (28.5°C room).',
            'A/B (do not merge): vs JR-S-CC60 — 0.22V / 58.4W / 29g (60W class); vs JR-S-CC100 — 0.21V / 57.9W / 27g (markets 100W, honest ~60W, no E-marker); vs JR-S-CL30B — USB-C→Lightning double-braid (different connector family). CL30 is the phone-class entry rung.',
            'USB 2.0 data only (480Mbps) — charge/sync, no DisplayPort/Alt-mode/USB3. Not on Anker cable recall lists (A8482/A8483/A8465 are Anker SKUs; Joyroom ≠ Anker — verified anker.com/product-recalls 2026-07-24). CairoVolt store warranty.',
        ],
        ar: [
            'جوي روم JR-S-CL30 (SKU المتجر JK10، GTIN 6956116750138) كابل USB-C إلى USB-C بطول 1.2 م مصنّف حتى 30 واط USB-PD — بروتوكولات عملية 9V/3.33A أو 15V/2A أو 20V/1.5A. لا حاجة لشريحة E-marker عند هذا التصنيف (USB-IF يشترطها فقط فوق 3A/60 واط).',
            'قِست CairoVolt هبوط 0.28 فولت عند سحب مضبوط 3A/5V على 121 سم من طرف إلى طرف (≈93 مللي أوم VBUS+GND) — ضمن نطاق §7.4 ≤0.30 فولت لنحاس ~1.2 م. ذروة منقولة 29.3 واط مستقرة 5 دقائق عند 20V/1.5A في حمل JUWEI — PDO الـ 30 واط الكامل.',
            'ذروات أجهزة حية: ~19 واط إلى iPhone 13 من Anker A2147 30W PD؛ و22–24 واط إلى Samsung Galaxy S24 عبر PPS 9V — بوابة الهاتف/المصدر، ضمن تصنيف الكابل. منتصف الكابل 41.8°م بعد 10 دقائق عند 3A/5V (غرفة 28.5°م).',
            'A/B (لا تدمج): مقابل JR-S-CC60 — 0.22 فولت / 58.4 واط / 29 ج (فئة 60 واط)؛ مقابل JR-S-CC100 — 0.21 فولت / 57.9 واط / 27 ج (يسوّق 100 واط، أمين ~60 واط، بلا E-marker)؛ مقابل JR-S-CL30B — USB-C→Lightning مضفر مزدوج (عائلة موصل مختلفة). CL30 هو درجة الدخول لفئة الهاتف.',
            'بيانات USB 2.0 فقط (480 ميغابت/ث) — شحن/مزامنة، بلا DisplayPort/Alt-mode/USB3. ليس على قوائم استرجاع كابلات Anker (A8482/A8483/A8465 موديلات Anker؛ جوي روم ≠ Anker — تحقق anker.com/product-recalls 2026-07-24). ضمان متجر CairoVolt.',
        ],
    },
    localContext: {
        en: 'CairoVolt is an independent retailer — this cable carries our store warranty. JR-S-CL30 (JK10, GTIN 6956116750138, ~94 EGP) is the entry-price Joyroom C-to-C for phone-class fast charging in Egypt. Do not confuse the MPN string with JR-S-CL30B (USB-C→Lightning braided on joyroom-type-c-lightning-braided) — different connector family, different use case. Six scenarios. RIGHT FOR: (1) IPHONE 15/16/17 DAILY DRIVER — Apple caps wired peak at ~20–27W (MacRumors); we measured ~19W to iPhone 13 through this cable from an A2147 30W brick, identical class to CC60/CC100 on phone loads because the phone is the ceiling. (2) SAMSUNG S24 / A54 / A55 25W SFC — 25W PPS fits inside 30W; CairoVolt measured 22–24W steady on S24. (3) NINTENDO SWITCH HANDHELD (15W max) — dock 39W path is dock-only; handheld charging is enough. (4) BUDGET CHARGE BAG / student drawer at ~94 EGP — replaceable if lost. (5) UBER / CAREEM DRIVER with a 30W USB-C car charger (Anker A2741 / Joyroom 30W car charger) — cable rating matches source. (6) TRAVEL SPARE — 26g measured; EgyptAir / Nile Air bag-pocket friendly. WRONG FOR: (7) MACBOOK AIR M2/M3 — apple.com optimal 30–35W sits AT this ceiling; buy JR-S-CC60 (~123 EGP) for ~30 EGP more headroom. (8) MACBOOK PRO 14"/16" — 96/140W needs 5A E-marked (Anker A8865 class); neither CL30 nor CC100 (no E-marker) qualifies. (9) GALAXY S24/S25 ULTRA 45W PPS SFC 2.0 — exceeds 30W; use CC60/CC100-class 60W. CROSS-SKU A/B (same lab week, concrete numbers): CL30 = 0.28V@3A / 29.3W / 121cm / 26g / ~94 EGP; CC60 = 0.22V / 58.4W / 122cm / 29g / ~123 EGP; CC100 = 0.21V / 57.9W / 121cm / 27g / ~130 EGP (box “100W” rejected — no E-marker); CL30B = Lightning path 19.1W / 0.14V@2A — not interchangeable. HEAT: Cairo July–August mean high ~35°C (WeatherSpark). Mid-span at 3A/5V was 41.8°C in a 28.5°C room — ~2°C warmer than CC60 under the same load (thinner conductors). Shade on a sun-baked dashboard; never coil tightly under load. AUTHENTICITY: printed “JR-S-CL30” on housing + GTIN 6956116750138 — not “CL30B”, not “CC100”, not “CC60”. ELECTRICITY: fully charging an iPhone 15 (12.99Wh) from a 20W brick via this cable ≈0.017 kWh — under 4 piastres on EgyptERA Sept-2024 tariff.',
        ar: 'CairoVolt متجر تجزئة مستقل — والكابل يحمل ضمان المتجر. JR-S-CL30 (JK10، GTIN 6956116750138، ~94 جنيه) هو كابل جوي روم C-to-C بسعر الدخول للشحن السريع فئة الهاتف في مصر. لا تخلط سلسلة MPN مع JR-S-CL30B (USB-C→Lightning مضفر على joyroom-type-c-lightning-braided) — عائلة موصل مختلفة واستخدام مختلف. ستة سيناريوهات. مناسب لـ: (1) مستخدم iPhone 15/16/17 اليومي — Apple تحد ذروة السلكي عند ~20–27 واط (MacRumors)؛ قِسنا ~19 واط إلى iPhone 13 عبر هذا الكابل من طوبة A2147 30W، نفس فئة CC60/CC100 على أحمال الهاتف لأن الهاتف هو السقف. (2) Samsung S24 / A54 / A55 عند 25 واط SFC — PPS 25 واط داخل 30 واط؛ قِست CairoVolt 22–24 واط ثابتة على S24. (3) Nintendo Switch يدوي (15 واط أقصى) — مسار القاعدة 39 واط للقاعدة فقط؛ للشحن اليدوي كافٍ. (4) حقيبة شحن اقتصادية / درج طالب بسعر ~94 جنيه — قابل للاستبدال إن فُقد. (5) سائق Uber / كريم بشاحن سيارة USB-C 30 واط (Anker A2741 / شاحن جوي روم 30 واط) — تصنيف الكابل يطابق المصدر. (6) قطعة سفر احتياطية — 26 ج مقاسة؛ تناسب جيب EgyptAir / Nile Air. غير مناسب لـ: (7) MacBook Air M2/M3 — الواتات المثلى 30–35 واط (apple.com) **عند** هذا السقف؛ اشتر JR-S-CC60 (~123 جنيه) لهامش ~30 جنيه. (8) MacBook Pro 14"/16" — 96/140 واط يحتاج 5A بـ E-marker (فئة Anker A8865)؛ لا CL30 ولا CC100 (بلا E-marker) يؤهّلان. (9) Galaxy S24/S25 Ultra 45 واط PPS SFC 2.0 — يتجاوز 30 واط؛ استخدم فئة CC60/CC100 بـ 60 واط. A/B عبر الموديلات (نفس أسبوع المختبر، أرقام ملموسة): CL30 = 0.28 فولت@3A / 29.3 واط / 121 سم / 26 ج / ~94 جنيه؛ CC60 = 0.22 فولت / 58.4 واط / 122 سم / 29 ج / ~123 جنيه؛ CC100 = 0.21 فولت / 57.9 واط / 121 سم / 27 ج / ~130 جنيه (علبة “100W” مرفوضة — بلا E-marker)؛ CL30B = مسار Lightning 19.1 واط / 0.14 فولت@2A — غير قابل للاستبدال. الحرارة: متوسط عظمى القاهرة يوليو–أغسطس ~35°م (WeatherSpark). منتصف الكابل عند 3A/5V كان 41.8°م في غرفة 28.5°م — أدفأ بـ ~2°م من CC60 تحت نفس الحمل (موصلات أرفع). ظلّل على تابلوه مشمس؛ لا تلفّ بإحكام تحت الحمل. الأصالة: “JR-S-CL30” مطبوع على المبيت + GTIN 6956116750138 — ليس “CL30B” ولا “CC100” ولا “CC60”. الكهرباء: شحن iPhone 15 (12.99Wh) كاملًا من طوبة 20 واط عبر هذا الكابل ≈0.017 كيلوواط·ساعة — أقل من 4 قروش بتعريفة EgyptERA سبتمبر 2024.',
    },
    specifications: {
        'Model': {
            en: 'Joyroom JR-S-CL30 USB-C to USB-C PD cable (1.2m) · store SKU JK10 · GTIN 6956116750138',
            ar: 'جوي روم JR-S-CL30 كابل USB-C إلى USB-C PD (1.2 م) · SKU المتجر JK10 · GTIN 6956116750138',
        },
        'Category': {
            en: 'Charge + sync cable · non-E-marked (rated ≤30W PD) · USB-C↔USB-C only',
            ar: 'كابل شحن + مزامنة · بدون شريحة E-marker (مصنّف ≤30 واط PD) · USB-C↔USB-C فقط',
        },
        'Max Power': {
            en: 'Up to 30W USB-PD — practical PDOs: 9V/3.33A or 15V/2A or 20V/1.5A; actual watts negotiated by charger + device',
            ar: 'حتى 30 واط USB-PD — بروتوكولات PDO عملية: 9V/3.33A أو 15V/2A أو 20V/1.5A؛ الواتات الفعلية يتفاوض عليها الشاحن + الجهاز',
        },
        'E-marker': {
            en: 'None — not required below 3A/60W per USB-IF PD 3.0; not a 5A/100W cable',
            ar: 'لا توجد — غير مطلوبة تحت 3A/60 واط وفق مواصفة USB-IF PD 3.0؛ ليس كابل 5A/100 واط',
        },
        'Data Speed': {
            en: 'USB 2.0 (480Mbps) — charge and sync only, no DisplayPort/Alt-mode, no video output',
            ar: 'USB 2.0 (480 ميغابت/ث) — شحن ومزامنة فقط، بلا DisplayPort/Alt-mode، بلا إخراج فيديو',
        },
        'Length': {
            en: '1.2m listed — CairoVolt tape 121 cm (connector tip to connector tip)',
            ar: '1.2 م في القائمة — مازورة CairoVolt 121 سم (من طرف الموصل إلى طرف الموصل)',
        },
        'Weight': {
            en: '25g listed — CairoVolt 0.01g scale 26g',
            ar: '25 ج في القائمة — ميزان CairoVolt 0.01 ج 26 ج',
        },
        'Jacket': {
            en: 'Braided nylon with reinforced strain relief on both housings',
            ar: 'نايلون مضفر مع تخفيف إجهاد معزّز على المبيتين',
        },
        'Measured V-drop @ 3A / 5V': {
            en: '0.28 V across 121 cm (≈93mΩ VBUS+GND) — within §7.4 acceptable band for ~1.2m copper (≤0.30V at 3A)',
            ar: '0.28 فولت على 121 سم (≈93 مللي أوم VBUS+GND) — ضمن نطاق §7.4 المقبول لنحاس ~1.2 م (≤0.30 فولت عند 3A)',
        },
        'Measured peak power @ 20V/1.5A': {
            en: '29.3W stable for 5 minutes into JUWEI load — full 30W PDO carried',
            ar: '29.3 واط مستقرة لمدة 5 دقائق في حمل JUWEI — PDO 30 واط الكامل مُمرَّر',
        },
        'vs JR-S-CC60 / JR-S-CC100 (C-to-C siblings)': {
            en: 'CL30 = phone-class 30W (~94 EGP, 0.28V@3A, 29.3W). CC60 = honest 60W (~123 EGP, 0.22V, 58.4W). CC100 = markets 100W but measured ~60W/3A no E-marker (~130 EGP, 0.21V, 57.9W). Pick CL30 only if you never exceed phone/tablet/Switch.',
            ar: 'CL30 = فئة هاتف 30 واط (~94 جنيه، 0.28 فولت@3A، 29.3 واط). CC60 = 60 واط أمين (~123 جنيه، 0.22 فولت، 58.4 واط). CC100 = يسوّق 100 واط لكن المقاس ~60 واط/3A بلا E-marker (~130 جنيه، 0.21 فولت، 57.9 واط). اختر CL30 فقط إن لم تتجاوز هاتف/تابلت/سويتش.',
        },
        'vs JR-S-CL30B (name trap)': {
            en: 'CL30B is USB-C→Lightning (joyroom-type-c-lightning-braided) — NOT this SKU. Different MPN suffix, connector, and bench sample (CV-CB-JRSCL30B-001). Do not substitute.',
            ar: 'CL30B هو USB-C→Lightning (joyroom-type-c-lightning-braided) — **ليس** هذا الـSKU. لاحقة MPN وموصل وعيّنة منضدة مختلفة (CV-CB-JRSCL30B-001). لا تستبدل.',
        },
        'Where this cable is enough': {
            en: 'iPhone 15/16/17 (~20W actual), Samsung S24 base / A54 / A55 (25W PPS), Nintendo Switch handheld (15W), Google Pixel 8/9 (27W borderline)',
            ar: 'iPhone 15/16/17 (~20 واط فعلي)، Samsung S24 القاعدي / A54 / A55 (25 واط PPS)، Nintendo Switch يدوي (15 واط)، Google Pixel 8/9 (27 واط على الحد)',
        },
        'Where this cable is NOT enough': {
            en: 'MacBook Air M2/M3 (30–35W AT ceiling — buy 60W cable), MacBook Pro 14"/16" (needs 5A E-marker), Galaxy S24 Ultra / S25 Ultra 45W SFC 2.0',
            ar: 'MacBook Air M2/M3 (30–35 واط **عند** السقف — اشتر كابل 60 واط)، MacBook Pro 14"/16" (يحتاج شريحة E-marker 5A)، Galaxy S24 Ultra / S25 Ultra 45 واط SFC 2.0',
        },
        'Recall Status': {
            en: 'Not on any Anker cable recall list — A8482/A8483/A8465 are Anker SKUs; Joyroom is a different brand (verified anker.com/product-recalls 2026-07-24)',
            ar: 'ليس على أي قائمة استرجاع لكابلات Anker — A8482/A8483/A8465 موديلات Anker؛ وجوي روم علامة مختلفة (تحقق anker.com/product-recalls 2026-07-24)',
        },
        'Warranty': {
            en: 'CairoVolt store warranty (independent retailer); replace the cable if the jacket, connector or strain relief is damaged or unusually hot',
            ar: 'ضمان متجر CairoVolt (تاجر تجزئة مستقل)؛ ويُستبدل الكابل إذا تلف الغلاف أو الموصل أو نقطة تخفيف الإجهاد أو أصبح ساخنًا بشكل غير معتاد',
        },
        'In the Box': {
            en: 'One JR-S-CL30 cable (verify live package contents with seller)',
            ar: 'كابل JR-S-CL30 واحد (تحقق من محتويات العبوة الحالية مع البائع)',
        },
    },
    benchTest: {
        sku: 'JR-S-CL30 (Joyroom 30W USB-C to USB-C PD, 1.2m · store SKU JK10 · GTIN 6956116750138)',
        sampleId: 'CV-CB-JRSCL30-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit — MPN JR-S-CL30 · SKU JK10 · GTIN 6956116750138 · CairoVolt lab, New Cairo · ambient 28.5°C (HTC-2) · humidity 44% · mains 221V (UT61E) · same-lab-week A/B notes vs JR-S-CC60 (CV-CB-JRSCC60-001), JR-S-CC100 (CV-CB-JRSCC100-001), and identity check vs JR-S-CL30B Lightning sibling (different SKU — not electrically merged) · not on Anker cable recall lists (Joyroom brand — A8482/A8483/A8465 checked at anker.com/product-recalls 2026-07-24)',
            ar: 'وحدة واحدة من مخزون التجزئة — MPN JR-S-CL30 · SKU JK10 · GTIN 6956116750138 · مختبر CairoVolt، القاهرة الجديدة · حرارة محيطة 28.5°م (HTC-2) · رطوبة 44% · جهد الحائط 221 فولت (UT61E) · ملاحظات A/B في نفس أسبوع المختبر مقابل JR-S-CC60 (CV-CB-JRSCC60-001) وJR-S-CC100 (CV-CB-JRSCC100-001) وفحص هوية مقابل شقيق Lightning JR-S-CL30B (SKU مختلف — لم تُدمَج الأرقام الكهربائية) · ليست على قوائم استرجاع كابلات Anker (علامة جوي روم — A8482/A8483/A8465 رُاجعت على anker.com/product-recalls 2026-07-24)',
        },
        methodology: {
            en: 'Per Bench Test Protocol §7.4 (cables) with §8 physics cross-checks and §11 red-flag gate: tip-to-tip length with a 5m fiberglass tape; weight on a Kkmoon 0.01g scale. E-marker status read from FNIRSI FNB58 (fw v1.3) PD Info while the cable was inline between an Anker A2688 100W GaN PD source and a JUWEI 35W electronic load — none detected (expected at ≤30W). Voltage drop: controlled 3A constant-current at 5V, FNB58 source-vs-load V, AVHzY CT-3 cross-check (agreement 0.01V); Ohm’s law §8 → 0.28V ÷ 3A ≈ 93mΩ VBUS+GND. Rated-ceiling carry: 20V/1.5A into JUWEI for 5 minutes (peak 29.3W; W≈V×A after source negotiation). Real-device pass: Anker A2147 30W PD → iPhone 13 (~19W peak); 45W PPS brick → Samsung Galaxy S24 (22–24W steady). Surface temperature: BENETECH GM320 (ε=0.95) at three mid-span points and strain-relief after 10 minutes at 3A/5V. Continuity rechecked after 50 manual flex cycles (30° at each strain relief) — manufacturer bend-test figures were NOT converted into a lifetime promise. Identity gate: printed JR-S-CL30 / GTIN 6956116750138 verified against product record — not JR-S-CL30B, not JR-S-CC60, not JR-S-CC100. Independent corroboration (not our data): USB-IF USB PD 3.0 on usb.org (E-marker above 3A/60W); MacRumors iPhone wired ceiling (~20–27W); apple.com/specs MacBook Air 30–35W. Single retail unit; production batches may vary.',
            ar: 'وفق §7.4 من بروتوكول الاختبار (الكابلات) مع فحوصات فيزياء §8 وبوابة أعلام حمراء §11: الطول من طرف إلى طرف بمازورة زجاجية 5 م؛ الوزن على ميزان Kkmoon 0.01 ج. حالة E-marker قُرئت من FNIRSI FNB58 (fw v1.3) PD Info والكابل على الخط بين مصدر Anker A2688 100W GaN PD وحمل JUWEI 35W — لا توجد (متوقع عند ≤30 واط). هبوط الجهد: سحب تيار ثابت مضبوط 3A عند 5V، V مصدر مقابل حمل على FNB58، وتحقق AVHzY CT-3 (اتفاق 0.01 فولت)؛ قانون أوم §8 → 0.28 فولت ÷ 3A ≈ 93 مللي أوم VBUS+GND. نقل عند السقف المصنّف: 20V/1.5A في JUWEI لمدة 5 دقائق (ذروة 29.3 واط؛ W≈V×A بعد تفاوض المصدر). اختبار أجهزة حية: Anker A2147 30W PD → iPhone 13 (~19 واط ذروة)؛ طوبة 45W PPS → Samsung Galaxy S24 (22–24 واط ثابتة). حرارة السطح: BENETECH GM320 (ε=0.95) على ثلاث نقاط منتصف وتخفيف الإجهاد بعد 10 دقائق عند 3A/5V. أُعيد فحص الاستمرارية بعد 50 دورة ثني يدوية (30° عند كل تخفيف إجهاد) — أرقام اختبار الثني من المصنّع لم تُحوَّل إلى وعد بعمر. بوابة الهوية: تحقق من JR-S-CL30 المطبوع / GTIN 6956116750138 مقابل سجل المنتج — ليس JR-S-CL30B ولا JR-S-CC60 ولا JR-S-CC100. للاسترجاع المستقل (وليست بياناتنا): مواصفة USB PD 3.0 على usb.org (E-marker فوق 3A/60 واط)؛ سقف iPhone السلكي على MacRumors (~20–27 واط)؛ واتات MacBook Air على apple.com/specs 30–35 واط. وحدة تجزئة واحدة؛ قد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Inline V·A·W logging, PD Info readout (E-marker status), source-vs-load V-drop capture', ar: 'قياس V·A·W على الخط، قراءة PD Info (حالة E-marker)، التقاط هبوط V بين المصدر والحمل' } },
            { name: 'AVHzY CT-3', use: { en: 'Cross-check of V-drop and peak wattage — sub-1% agreement with FNB58', ar: 'تحقق من هبوط V وذروة الواتات — اتفاق دون 1% مع FNB58' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant 3A / 5V draw and 20V/1.5A rated-ceiling run for the 30W PDO test', ar: 'سحب ثابت 3A / 5V وتشغيل عند سقف التصنيف 20V/1.5A لاختبار PDO 30 واط' } },
            { name: 'Anker A2688 100W GaN PD wall charger', use: { en: 'PD source with confirmed rails including 20V/1.5A for the rated-ceiling carry test', ar: 'مصدر PD ببروتوكولات مؤكدة تشمل 20V/1.5A لاختبار نقل عند السقف المصنّف' } },
            { name: 'Anker A2147 30W PD wall charger + iPhone 13', use: { en: 'Real-device peak-power check', ar: 'فحص ذروة القدرة على جهاز حي' } },
            { name: 'Samsung Galaxy S24 (14.31Wh) + 45W PPS brick', use: { en: 'PPS Super Fast Charge 2.0 sanity check through the cable', ar: 'تحقق من Super Fast Charge 2.0 عبر PPS خلال الكابل' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Cable mid-span and strain-relief surface temperature — A/B vs CC60/CC100', ar: 'حرارة سطح منتصف الكابل ومنطقة تخفيف الإجهاد — مقارنة A/B مع CC60/CC100' } },
            { name: 'Kkmoon 0.01g scale · 5m fiberglass tape', use: { en: 'Weight and tip-to-tip length', ar: 'الوزن والطول من طرف إلى طرف' } },
            { name: 'Sibling refs: JR-S-CC60 · JR-S-CC100 · JR-S-CL30B (identity only)', use: { en: 'Same-lab-week A/B for V-drop/power class; CL30B identity gate only (Lightning — not merged)', ar: 'مقارنة A/B نفس الأسبوع لهبوط V/فئة القدرة؛ بوابة هوية CL30B فقط (Lightning — غير مدمجة)' } },
        ],
        results: [
            { param: { en: 'Recall status', ar: 'حالة الاسترجاع' }, rated: { en: 'N/A (Joyroom brand)', ar: 'غ/م (علامة جوي روم)' }, measured: { en: 'Not on Anker cable recall list — verified 2026-07-24', ar: 'ليست على قائمة استرجاع كابلات Anker — تحقق 2026-07-24' }, note: { en: 'A8482/A8483/A8465 are Anker SKUs; Joyroom is a different brand', ar: 'A8482/A8483/A8465 موديلات Anker؛ وجوي روم علامة مختلفة' } },
            { param: { en: 'Identity / MPN gate', ar: 'بوابة الهوية / MPN' }, rated: 'JR-S-CL30', measured: { en: 'Printed JR-S-CL30 · SKU JK10 · GTIN 6956116750138 — not CL30B / not CC60 / not CC100', ar: 'مطبوع JR-S-CL30 · SKU JK10 · GTIN 6956116750138 — ليس CL30B / ليس CC60 / ليس CC100' }, note: { en: 'Product record match; do not merge SKUs', ar: 'يطابق سجل المنتج؛ لا تدمج الموديلات' } },
            { param: { en: 'E-marker chip', ar: 'شريحة E-marker' }, rated: { en: 'Not required (≤30W)', ar: 'غير مطلوبة (≤30 واط)' }, measured: { en: 'None detected on FNB58 PD Info — as expected for 30W-rated cable', ar: 'لا توجد على FNB58 PD Info — كما هو متوقع لكابل 30 واط' } },
            { param: { en: 'Length (tip-to-tip)', ar: 'الطول (من طرف إلى طرف)' }, rated: '1.2m', measured: '121 cm', note: { en: 'Within ±5cm §7.4 tolerance', ar: 'ضمن تفاوت §7.4 ±5 سم' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '25g (listing)', measured: '26 g', note: { en: '0.01g scale — 1g over listing; 3g lighter than CC60 (29g); ~1g lighter than CC100 (27g)', ar: 'ميزان 0.01 ج — 1 ج فوق القائمة؛ أخف بـ 3 ج من CC60 (29 ج)؛ أخف بـ ~1 ج من CC100 (27 ج)' } },
            { param: { en: 'Voltage drop @ 3A / 5V (1.2m)', ar: 'هبوط الجهد @ 3A / 5V (1.2 م)' }, measured: '0.28 V', note: { en: 'FNB58 source vs load — within §7.4 band (≤0.30V); +0.06V vs CC60 (0.22V); +0.07V vs CC100 (0.21V)', ar: 'FNB58 مصدر مقابل حمل — ضمن نطاق §7.4 (≤0.30 فولت)؛ +0.06 فولت مقابل CC60 (0.22 فولت)؛ +0.07 فولت مقابل CC100 (0.21 فولت)' } },
            { param: { en: 'Implied VBUS+GND resistance', ar: 'مقاومة VBUS+GND المستنتجة' }, measured: '≈ 93 mΩ', note: { en: '0.28 V ÷ 3 A (Ohm’s law §8) — higher than CC60 ≈73mΩ / CC100 ≈70mΩ (thinner gauge class)', ar: '0.28 V ÷ 3 A (قانون أوم §8) — أعلى من CC60 ≈73 مللي أوم / CC100 ≈70 مللي أوم (فئة مقاس أرفع)' } },
            { param: { en: 'Peak power carried (20V/1.5A rated PDO, 5 min stable)', ar: 'ذروة القدرة المنقولة (PDO 20V/1.5A المصنّف، ثابتة 5 د)' }, rated: '30W', measured: '29.3 W', note: { en: 'JUWEI + A2688 — no throttle, no arc, no wire discoloration; ≠ CC60/CC100 20V/3A ~58W class', ar: 'حمل JUWEI + مصدر A2688 — بلا خنق، بلا قوس، بلا تغير لون؛ ≠ فئة CC60/CC100 20V/3A ~58 واط' } },
            { param: { en: 'iPhone 13 real-device peak (via A2147 30W PD)', ar: 'ذروة على iPhone 13 حي (عبر A2147 30W PD)' }, measured: '~19 W', note: { en: 'FNB58 inline — matches Apple wired ceiling; same class as CC60/CC100 phone result (phone is the cap)', ar: 'FNB58 على الخط — يطابق سقف Apple السلكي؛ نفس فئة نتيجة هاتف CC60/CC100 (الهاتف هو السقف)' } },
            { param: { en: 'Samsung Galaxy S24 PPS Super Fast Charge 2.0', ar: 'Samsung Galaxy S24 عبر PPS Super Fast Charge 2.0' }, measured: '22–24 W steady', note: { en: 'FNB58 inline via 45W PPS brick — PPS 9V range, well inside 30W ceiling', ar: 'FNB58 على الخط عبر طوبة 45W PPS — نطاق PPS 9V، ضمن سقف 30 واط بأريحية' } },
            { param: { en: 'Data speed', ar: 'سرعة البيانات' }, rated: 'USB 2.0 (480Mbps)', measured: { en: 'USB 2.0 — charge/sync only, no DisplayPort/Alt-mode/USB3', ar: 'USB 2.0 — شحن/مزامنة فقط، بلا DisplayPort/Alt-mode/USB3' } },
            { param: { en: 'Cable mid-span temp @ 3A / 5V (10 min)', ar: 'حرارة منتصف الكابل @ 3A / 5V (10 د)' }, measured: '41.8°C', note: { en: 'GM320 IR — 2.1°C warmer than CC60 (39.7°C); ~1.7°C warmer than CC100 (40.1°C) at identical 3A load', ar: 'GM320 IR — أدفأ بـ 2.1°م من CC60 (39.7°م)؛ أدفأ بـ ~1.7°م من CC100 (40.1°م) عند حمل 3A مطابق' } },
            { param: { en: 'Strain-relief temp @ 3A / 5V (10 min)', ar: 'حرارة تخفيف الإجهاد @ 3A / 5V (10 د)' }, measured: '38.4°C', note: { en: 'No localized heating spike; within §7.4 safe band (≤45°C flag)', ar: 'لا ارتفاع حراري موضعي؛ ضمن نطاق §7.4 الآمن (≤45°م علامة تحذير)' } },
            { param: { en: 'Continuity after 50 bench flex cycles', ar: 'الاستمرارية بعد 50 دورة ثني على المنضدة' }, measured: { en: 'Stable — no intermittent open on VBUS or GND', ar: 'مستقرة — بلا انقطاع متقطع على VBUS أو GND' }, note: { en: 'Bench flex only — NOT a certified fatigue test', ar: 'ثني على المنضدة فقط — **ليس** اختبار تعب معتمد' } },
            { param: { en: 'MacBook Pro 14" / 16" compatibility', ar: 'توافق MacBook Pro 14" / 16"' }, measured: { en: 'NOT recommended — 96/140W needs 5A E-marked cable; JR-S-CL30 rating is 30W', ar: '**غير** مُوصى — 96/140 واط يحتاج كابل 5A بشريحة E-marker؛ تصنيف JR-S-CL30 هو 30 واط' }, note: { en: 'Use Anker A8865 class — not CL30, CC60, or CC100', ar: 'استخدم فئة Anker A8865 — لا CL30 ولا CC60 ولا CC100' } },
            { param: { en: 'MacBook Air M2/M3 compatibility', ar: 'توافق MacBook Air M2/M3' }, measured: { en: 'AT ceiling (30–35W optimal) — will charge, but no headroom; JR-S-CC60 is the better choice', ar: '**عند** السقف (30–35 واط مثالية) — سيشحن، لكن بلا هامش؛ JR-S-CC60 خيار أفضل' } },
            { param: { en: 'Galaxy S24 Ultra 45W SFC 2.0', ar: 'Galaxy S24 Ultra 45W SFC 2.0' }, measured: { en: 'NOT recommended — needs 20V PPS at 2.25A = 45W above cable rating', ar: '**غير** مُوصى — يحتاج PPS 20V عند 2.25A = 45 واط فوق تصنيف الكابل' } },
            { param: { en: 'Cross-SKU summary (do not merge)', ar: 'ملخص عبر الموديلات (لا تدمج)' }, measured: { en: 'CL30 = 30W C-to-C / 0.28V@3A / 29.3W. CC60 = 60W / 0.22V / 58.4W. CC100 = markets 100W, honest ~60W / 0.21V / 57.9W (no E-marker). CL30B = Lightning, not this cable.', ar: 'CL30 = 30 واط C-to-C / 0.28 فولت@3A / 29.3 واط. CC60 = 60 واط / 0.22 فولت / 58.4 واط. CC100 = يسوّق 100 واط، أمين ~60 واط / 0.21 فولت / 57.9 واط (بلا E-marker). CL30B = Lightning، ليس هذا الكابل.' } },
            { param: { en: 'Egypt price / use band', ar: 'نطاق السعر / الاستخدام في مصر' }, rated: { en: '~94 EGP listing', ar: '~94 جنيه مدرج' }, measured: { en: 'Phone-class drawer spare — Cairo / Alexandria / AUC-GUC student kit; not a laptop cable', ar: 'قطعة درج فئة هاتف — القاهرة / الإسكندرية / طقم طالب AUC-GUC؛ ليس كابل لابتوب' }, note: { en: 'EgyptERA Sept-2024: ~0.017 kWh ≈ under 4 piastres for a full iPhone 15 top-up via 20W brick', ar: 'EgyptERA سبتمبر 2024: ~0.017 كيلوواط·ساعة ≈ أقل من 4 قروش لشحن iPhone 15 كامل عبر طوبة 20 واط' } },
        ],
        verdict: {
            en: 'JR-S-CL30 is an honest 30W phone-class C-to-C at ~94 EGP: 0.28V @ 3A over 121 cm, 29.3W on 20V/1.5A for 5 min, ~19W to iPhone 13 / 22–24W to S24. Runs ~2°C warmer than CC60 under the same 3A load. Pick only for phone-class charging; step to CC60/CC100 for Air/Ultra headroom; never confuse with CL30B Lightning. Not on Anker recall lists (verified 2026-07-24).',
            ar: 'JR-S-CL30 كابل C-to-C فئة هاتف 30 واط أمين بسعر ~94 جنيه: 0.28 فولت @ 3A على 121 سم، 29.3 واط على 20V/1.5A لمدة 5 د، ~19 واط إلى iPhone 13 / 22–24 واط إلى S24. يعمل أدفأ بـ ~2°م من CC60 تحت نفس حمل 3A. اختره فقط للشحن فئة الهاتف؛ اصعد إلى CC60/CC100 لهامش Air/Ultra؛ لا تخلطه مع CL30B Lightning. ليس على قوائم استرجاع Anker (تحقق 2026-07-24).',
        },
        pros: [
            { en: 'Voltage drop 0.28V at 3A over 121 cm — within §7.4 copper band (≤0.30V); consistent with honest copper at the 30W wire-gauge class', ar: 'هبوط الجهد 0.28 فولت عند 3A على 121 سم — ضمن نطاق §7.4 للنحاس (≤0.30 فولت)؛ متسق مع موصلات نحاس أمينة في فئة سلك 30 واط' },
            { en: 'Carried the rated 20V/1.5A PDO at 29.3W stable for 5 minutes — the full 30W ceiling', ar: 'نقل PDO المصنّف 20V/1.5A عند 29.3 واط مستقرة لمدة 5 دقائق — السقف الكامل 30 واط' },
            { en: 'Delivered ~19W to iPhone 13 and 22–24W to Samsung S24 SFC 2.0 — phone-gated, same class as higher-watt Joyroom C-to-C siblings on phone loads', ar: 'سلّم ~19 واط إلى iPhone 13 و22–24 واط إلى Samsung S24 SFC 2.0 — بوابة الهاتف، نفس فئة أشقاء جوي روم C-to-C الأعلى واتًا على أحمال الهاتف' },
            { en: 'Entry-price ~94 EGP — ~30 EGP under JR-S-CC60; sensible spare-drawer or student-kit choice when 30W is enough', ar: 'فئة سعر دخول ~94 جنيه — أرخص بـ ~30 جنيه من JR-S-CC60؛ خيار منطقي لدرج احتياطي أو طقم طالب حين يكفي 30 واط' },
            { en: 'Mid-span 41.8°C at 3A/5V — within §7.4 safe band; braided jacket does not choke on heat at this load', ar: 'حرارة المنتصف 41.8°م عند 3A/5V — ضمن نطاق §7.4 الآمن؛ الغلاف المضفر لا يختنق حراريًا عند هذا الحمل' },
            { en: 'Joyroom ≠ Anker — not on Anker cable recall lists (A8482/A8483/A8465 verified 2026-07-24)', ar: 'جوي روم ≠ Anker — ليست على قوائم استرجاع كابلات Anker (A8482/A8483/A8465 متحققة 2026-07-24)' },
        ],
        limits: [
            { en: '30W is a HARD ceiling — will not carry Galaxy Ultra 45W SFC 2.0 or MacBook Pro 96–140W. Buy JR-S-CC60 / honest-class CC100 for 60W, or Anker A8865-class 5A E-marked for laptop 100W+', ar: '30 واط سقف صارم — لن ينقل Galaxy Ultra 45W SFC 2.0 أو MacBook Pro 96–140 واط. اشتر JR-S-CC60 / CC100 فئة أمينة لـ 60 واط، أو فئة Anker A8865 بـ 5A E-marker للابتوب 100 واط+' },
            { en: 'MacBook Air M2/M3 is at this cable’s ceiling (30–35W optimal) — will charge with zero headroom; CC60 is the smarter ~30 EGP upgrade', ar: 'MacBook Air M2/M3 **عند** سقف هذا الكابل (30–35 واط مثالية) — سيشحن بلا هامش؛ CC60 ترقية أذكى بـ ~30 جنيه' },
            { en: 'Runs 2.1°C warmer than CC60 at 3A/5V (41.8°C vs 39.7°C) — thinner conductors, higher I²R; ventilate in Cairo summer', ar: 'يعمل أدفأ بـ 2.1°م من CC60 عند 3A/5V (41.8°م مقابل 39.7°م) — موصلات أرفع، I²R أعلى؛ هوِّ في صيف القاهرة' },
            { en: 'NOT E-marked — expected below 3A/60W, but noteworthy: no 5A/100W path (same honesty bar that rejected CC100’s box claim)', ar: '**بدون** E-marker — متوقع تحت 3A/60 واط، لكن جدير بالذكر: لا مسار 5A/100 واط (نفس معيار الصدق الذي رفض ادعاء علبة CC100)' },
            { en: 'USB 2.0 data only (480Mbps) — no DisplayPort/Alt-mode video; will NOT drive an external monitor', ar: 'بيانات USB 2.0 فقط (480 ميغابت/ث) — بلا فيديو DisplayPort/Alt-mode؛ **لن** يشغّل شاشة خارجية' },
            { en: 'Name trap: JR-S-CL30 ≠ JR-S-CL30B (Lightning). Different MPN, connector, and gold sample — do not merge listings or bench numbers', ar: 'فخ الاسم: JR-S-CL30 ≠ JR-S-CL30B (Lightning). MPN وموصل وعيّنة ذهبية مختلفة — لا تدمج القوائم أو أرقام المنضدة' },
            { en: 'Single retail unit tested; production batches may vary — verify printed “JR-S-CL30” and GTIN 6956116750138 on your delivered unit', ar: 'وحدة تجزئة واحدة مُختبرة؛ قد تختلف دفعات الإنتاج — تحقق من “JR-S-CL30” المطبوع وGTIN 6956116750138 على وحدتك المستلمة' },
        ],
    },
};
