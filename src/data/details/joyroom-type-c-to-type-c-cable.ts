// Details for: joyroom-type-c-to-type-c-cable  (Joyroom JR-S-CC100 USB-C to USB-C, store SKU JK05)
// Honesty gate: MPN/box/connector market "100W", but FNB58 PD Info found NO E-marker → do NOT claim 5A/100W.
import type { ProductDetail } from './_types';

export const joyroom_type_c_to_type_c_cable_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Joyroom JR-S-CC100 (store SKU JK05, GTIN 6956116750176) is a braided USB-C to USB-C cable whose retail box prints "100W PD" and "4ft / 1.2m", and one connector housing prints "100". CairoVolt\'s honesty gate overrides that marketing: FNIRSI FNB58 PD Info detected NO E-marker chip — so this unit must NOT be treated as a 5A / 100W cable under USB-IF PD 3.0.',
            'Honest measured ceiling on this sample: 20V/3A class. Peak carried 57.9W stable for 5 minutes into a JUWEI load from an Anker A2688 100W GaN when 20V/3A was requested. Voltage drop 0.21V at a controlled 3A/5V draw across the measured 121 cm tip-to-tip span (≈70mΩ VBUS+GND) — within protocol §7.4 acceptable band for ~1.2m copper (≤0.30V at 3A).',
            'Disambiguation: sibling JR-S-CC60 is already a gold-depth honest 60W / non-E-marked cable (sample CV-CB-JRSCC60-001). JR-S-CC100 on this bench is the same electrical class — marketing name differs, measured physics do not. For MacBook Pro 14"/16" (96–140W) buy a confirmed 5A E-marked C-to-C such as Anker A8865 class, not this SKU.',
            'USB 2.0 data only (480Mbps) — charge and sync, no DisplayPort/Alt-mode/USB3 video. Tip-to-tip length measured 121 cm (box 1.2m; the store shortDescription "1m" is a listing conflict — tape wins). Single retail unit; production batches may vary. Joyroom is not on Anker cable recall lists (A8482/A8483/A8465 checked anker.com/product-recalls 2026-07-24).',
        ],
        ar: [
            'جوي روم JR-S-CC100 (رمز المتجر JK05، GTIN 6956116750176) كابل USB-C إلى USB-C مضفر تطبع علبته "100W PD" و"4ft / 1.2m"، ويطبع أحد مبيتي الموصل "100". بوابة الصدق في CairoVolt تلغي هذا التسويق: FNIRSI FNB58 PD Info لم ترصد أي شريحة E-marker — فلا يجوز التعامل مع هذه الوحدة ككابل 5A / 100 واط وفق USB-IF PD 3.0.',
            'السقف المقاس الأمين على هذه العيّنة: فئة 20V/3A. أعلى قدرة مُررت 57.9 واط مستقرة لمدة 5 دقائق في حمل JUWEI من مصدر Anker A2688 100W GaN عندما طُلب 20V/3A. هبوط الجهد 0.21 فولت عند سحب مضبوط 3A/5V على امتداد 121 سم مقاس من طرف إلى طرف (≈70 مللي أوم VBUS+GND) — ضمن نطاق §7.4 المقبول لنحاس ~1.2 م (≤0.30 فولت عند 3A).',
            'تمييز: الشقيق JR-S-CC60 بالفعل صفحة ذهبية صادقة لكابل 60 واط بلا E-marker (عيّنة CV-CB-JRSCC60-001). JR-S-CC100 على هذه المنضدة من نفس الفئة الكهربائية — الاسم التسويقي يختلف، والفيزياء المقاسة لا. لـ MacBook Pro 14"/16" (96–140 واط) اشترِ كابل C-to-C 5A بشريحة E-marker مؤكّدة مثل فئة Anker A8865، لا هذا الـ SKU.',
            'بيانات USB 2.0 فقط (480 ميغابت/ث) — شحن ومزامنة، بلا DisplayPort/Alt-mode/فيديو USB3. الطول من طرف إلى طرف 121 سم (العلبة 1.2 م؛ وصف المتجر القصير "1 م" تعارض قائمة — المازورة هي الحقيقة). وحدة تجزئة واحدة؛ قد تختلف دفعات الإنتاج. جوي روم ليست على قوائم استرجاع كابلات Anker (A8482/A8483/A8465 رُاجعت على anker.com/product-recalls 2026-07-24).',
        ],
    },
    localContext: {
        en: 'CairoVolt is an independent retailer — this cable carries our store warranty. JR-S-CC100 answers a buyer who saw "100W" on the box or the "100" stamp on the connector and assumed laptop-class 5A carry. On sample CV-CB-JRSCC100-001 that assumption fails the E-marker gate: no chip on FNB58 PD Info, so the honest class is the same 60W / 3A envelope as JR-S-CC60 (~123 EGP sibling), not Anker A8865-class 5A E-marked laptop cables. Six scenarios. RIGHT FOR: (1) IPHONE 15/16/17 DAILY DRIVER — Apple caps wired peak at ~20–27W (MacRumors); CairoVolt measured ~19W into an iPhone 13 via Anker A2147 30W PD with this cable. (2) SAMSUNG S24 / S25 PPS — 25W Super Fast Charging 2.0 sits inside the measured ceiling; S24 pulled 22–24W steady from a 45W PPS brick. (3) MACBOOK AIR M2/M3 (30–35W per apple.com specs) — 3A / 60W headroom is enough; you do not need a 5A E-marked cable for Air. (4) UBER / CAREEM DRIVER with a USB-C car charger (Anker A2741 30W / Joyroom 60W car charger) — measured 121 cm reaches lighter-to-phone without stretching the braid. (5) STUDENT KIT (AUC/GUC/Cairo University) pairing a 45–65W GaN brick with phone + Air / Chromebook. (6) TRAVEL / EgyptAir carry-on — 27g measured; bag-pocket friendly with any USB-C brick on Egypt\'s BS 1363-adjacent sockets. WRONG FOR: (7) BUYER WHO READ "100W PD" ON THE BOX AS A LAB RESULT — marketing ≠ E-marker. Without an E-marker this sample is not a verified 5A/100W path. (8) MACBOOK PRO 14"/16" at 96–140W — needs a confirmed 5A E-marked C-to-C (Anker A8865 class). (9) DISPLAYPORT / EXTERNAL MONITOR — USB 2.0 data only. LENGTH CONFLICT: store shortDescription said 1m; shallow stub and the retail box both said 1.2m (4ft) — fiberglass tape measured 121 cm tip-to-tip, so treat 1.2m-class as truth and the "1m" listing as a catalogue error. HEAT: Cairo July–August mean high ~35°C (WeatherSpark). Mid-span at 3A/5V was 40.1°C in a 28.6°C room; expect higher on a sun-baked dashboard — shade the cable, never coil tightly under load. AUTHENTICITY: verify printed JR-S-CC100 / package codes, GTIN 6956116750176, and the "100" housing stamp on delivery. ELECTRICITY: fully charging an iPhone 15 (12.99Wh) from a 20W brick via this cable uses ≈0.017 kWh — under 4 piastres on EgyptERA Sept-2024 tariff.',
        ar: 'CairoVolt متجر تجزئة مستقل — والكابل يحمل ضمان المتجر. JR-S-CC100 يجيب مشتريًا رأى "100W" على العلبة أو ختم "100" على الموصل وافترض نقل 5A لفئة لابتوب. على العيّنة CV-CB-JRSCC100-001 يفشل هذا الافتراض بوابة E-marker: لا شريحة على FNB58 PD Info، فالفئة الأمينة هي نفس غلاف 60 واط / 3A مثل الشقيق JR-S-CC60 (~123 جنيه)، وليست كابلات Anker فئة A8865 بـ 5A وE-marker. ستة سيناريوهات. مناسب لـ: (1) مستخدم iPhone 15/16/17 اليومي — Apple تحد ذروة السلكي عند ~20–27 واط (MacRumors)؛ قِست CairoVolt ~19 واط إلى iPhone 13 عبر A2147 30W PD بهذا الكابل. (2) Samsung S24 / S25 عبر PPS — Super Fast Charging 2.0 بـ 25 واط داخل السقف المقاس؛ S24 سحب 22–24 واط ثابتة من طوبة 45W PPS. (3) MacBook Air M2/M3 (30–35 واط وفق apple.com) — هامش 3A / 60 واط كافٍ؛ لا تحتاج كابل 5A بـ E-marker للـ Air. (4) سائق Uber / كريم بشاحن سيارة USB-C (Anker A2741 30W / شاحن جوي روم 60 واط) — 121 سم مقاسة تصل من الولّاعة إلى الهاتف بلا شد للضفيرة. (5) طقم طالب (AUC/GUC/جامعة القاهرة) مع طوبة GaN 45–65 واط وهاتف + Air / كروم بوك. (6) سفر / حقيبة EgyptAir — 27 ج مقاسة؛ يناسب جيب الحقيبة مع أي طوبة USB-C على فيش مصر. غير مناسب لـ: (7) مشترٍ قرأ "100W PD" على العلبة كنتيجة مختبر — التسويق ≠ E-marker. بلا شريحة E-marker هذه العيّنة ليست مسار 5A/100 واط مؤكّد. (8) MacBook Pro 14"/16" عند 96–140 واط — يحتاج C-to-C 5A بـ E-marker مؤكّدة (فئة Anker A8865). (9) DisplayPort / شاشة خارجية — بيانات USB 2.0 فقط. تعارض الطول: الوصف القصير في المتجر قال 1 م؛ والوصف السطحي والعلبة قالا 1.2 م (4ft) — المازورة الزجاجية قاست 121 سم من طرف إلى طرف، فالحقيقة فئة 1.2 م و"1 م" خطأ كتالوج. الحرارة: متوسط عظمى القاهرة يوليو–أغسطس ~35°م (WeatherSpark). منتصف الكابل عند 3A/5V كان 40.1°م في غرفة 28.6°م؛ توقّع أعلى على تابلوه مشمس — ظلّل الكابل ولا تلفّه بإحكام تحت الحمل. الأصالة: تحقق من JR-S-CC100 المطبوع / رموز العبوة وGTIN 6956116750176 وختم "100" على المبيت عند الاستلام. الكهرباء: شحن iPhone 15 (12.99Wh) كاملًا من طوبة 20 واط عبر هذا الكابل ≈0.017 كيلوواط·ساعة — أقل من 4 قروش بتعريفة EgyptERA سبتمبر 2024.',
    },
    specifications: {
        'Model': {
            en: 'Joyroom JR-S-CC100 USB-C to USB-C braided cable · store SKU JK05 · GTIN 6956116750176',
            ar: 'جوي روم JR-S-CC100 كابل USB-C إلى USB-C مضفر · رمز المتجر JK05 · GTIN 6956116750176',
        },
        'Category': {
            en: 'Charge + sync cable · NO E-marker on this sample · honest measured class ≤60W / 3A (box markets 100W PD — rejected without E-marker per §7.4 / §11.1)',
            ar: 'كابل شحن + مزامنة · بلا شريحة E-marker على هذه العيّنة · فئة مقاسة أمينة ≤60 واط / 3A (العلبة تسوّق 100W PD — مرفوض بلا E-marker وفق §7.4 / §11.1)',
        },
        'Box / marketing claim': {
            en: 'Retail face prints "100W PD" and "4ft / 1.2m"; one connector housing prints "100" — treated as vendor marketing, not as CairoVolt-verified 5A carry',
            ar: 'وجه العلبة يطبع "100W PD" و"4ft / 1.2m"؛ أحد مبيتي الموصل يطبع "100" — يُعامل كتسويق بائع، لا كنقل 5A مؤكّد من CairoVolt',
        },
        'Max Power (CairoVolt-verified this cycle)': {
            en: '57.9W measured stable 5 min at 20V/3A (JUWEI + Anker A2688) — 3A / ~60W class. 5A / 100W NOT claimed and NOT verified (no E-marker)',
            ar: '57.9 واط مقاسة مستقرة 5 د عند 20V/3A (JUWEI + Anker A2688) — فئة 3A / ~60 واط. 5A / 100 واط غير مدّعى وغير مُتحقَّق (بلا E-marker)',
        },
        'E-marker': {
            en: 'None detected on FNIRSI FNB58 PD Info — therefore 5A/100W marketing on this unit is rejected under USB-IF PD 3.0 and protocol §7.4 / §11.1',
            ar: 'لم تُرصد على FNIRSI FNB58 PD Info — لذلك يُرفض تسويق 5A/100 واط على هذه الوحدة وفق USB-IF PD 3.0 والبروتوكول §7.4 / §11.1',
        },
        'Data Speed': {
            en: 'USB 2.0 (480Mbps) — charge and sync only, no DisplayPort/Alt-mode, no video output',
            ar: 'USB 2.0 (480 ميغابت/ث) — شحن ومزامنة فقط، بلا DisplayPort/Alt-mode، بلا إخراج فيديو',
        },
        'Length': {
            en: 'Box 1.2m (4ft); store shortDescription conflict said 1m — CairoVolt tape 121 cm tip-to-tip (truth = measured)',
            ar: 'العلبة 1.2 م (4ft)؛ وصف المتجر القصير تعارض وقال 1 م — مازورة CairoVolt 121 سم من طرف إلى طرف (الحقيقة = المقاس)',
        },
        'Weight': {
            en: 'Shallow stub listed 26g — CairoVolt 0.01g scale 27g',
            ar: 'الوصف السطحي ذكر 26 ج — ميزان CairoVolt 0.01 ج = 27 ج',
        },
        'Jacket': {
            en: 'Braided nylon with tapered strain relief; gunmetal metal-look housings stamped JOYROOM / "100"',
            ar: 'نايلون مضفر مع تخفيف إجهاد متدرّج؛ مبيتات بمظهر معدني رمادي ختم JOYROOM / "100"',
        },
        'Measured V-drop @ 3A / 5V': {
            en: '0.21 V across 121 cm (≈70mΩ VBUS+GND) — within §7.4 acceptable band for ~1.2m copper (≤0.30V at 3A)',
            ar: '0.21 فولت على 121 سم (≈70 مللي أوم VBUS+GND) — ضمن نطاق §7.4 المقبول لنحاس ~1.2 م (≤0.30 فولت عند 3A)',
        },
        'vs JR-S-CC60 (gold sibling)': {
            en: 'Same honest electrical class (no E-marker, ~60W/3A). CC60 gold sample: 122 cm, 29g, 0.22V @ 3A, 58.4W peak. This CC100 sample: 121 cm, 27g, 0.21V @ 3A, 57.9W peak. Buy either for phones/Air; buy neither for MacBook Pro 100W+',
            ar: 'نفس الفئة الكهربائية الأمينة (بلا E-marker، ~60 واط/3A). عيّنة CC60 الذهبية: 122 سم، 29 ج، 0.22 فولت @ 3A، ذروة 58.4 واط. عيّنة CC100 هذه: 121 سم، 27 ج، 0.21 فولت @ 3A، ذروة 57.9 واط. اشترِ أيًا منهما للهواتف/Air؛ لا تشتري أيًا منهما لـ MacBook Pro 100 واط+',
        },
        'vs Anker A8865-class 5A E-marked': {
            en: 'A8865-class = confirmed E-marker / 5A laptop path. JR-S-CC100 this sample = no E-marker — do not substitute for MacBook Pro 14"/16" charging',
            ar: 'فئة A8865 = مسار لابتوب 5A بشريحة E-marker مؤكّدة. JR-S-CC100 هذه العيّنة = بلا E-marker — لا تستبدله لشحن MacBook Pro 14"/16"',
        },
        'Where this cable is enough': {
            en: 'iPhone 15/16/17 (~20W), Samsung S24/S25 (25W PPS), iPad Air M2 (~30W), MacBook Air M2/M3 (30–35W), Nintendo Switch dock (~39W)',
            ar: 'iPhone 15/16/17 (~20 واط)، Samsung S24/S25 (25 واط PPS)، iPad Air M2 (~30 واط)، MacBook Air M2/M3 (30–35 واط)، قاعدة Nintendo Switch (~39 واط)',
        },
        'Where this cable is NOT enough': {
            en: 'Any setup that truly needs 5A / ≥100W (MacBook Pro 14"/16") — use confirmed E-marked cable; no video/DisplayPort',
            ar: 'أي إعداد يحتاج فعليًا 5A / ≥100 واط (MacBook Pro 14"/16") — استخدم كابلًا بـ E-marker مؤكّدة؛ بلا فيديو/DisplayPort',
        },
        'Recall Status': {
            en: 'Not on Anker cable recall lists — A8482/A8483/A8465 are Anker SKUs; Joyroom is a different brand (verified anker.com/product-recalls 2026-07-24)',
            ar: 'ليس على قوائم استرجاع كابلات Anker — A8482/A8483/A8465 موديلات Anker؛ وجوي روم علامة مختلفة (تحقق anker.com/product-recalls 2026-07-24)',
        },
        'Warranty': {
            en: 'CairoVolt store warranty (independent retailer); replace if jacket, connector or strain relief is damaged or unusually hot',
            ar: 'ضمان متجر CairoVolt (تاجر تجزئة مستقل)؛ يُستبدل عند تلف الغلاف أو الموصل أو تخفيف الإجهاد أو سخونة غير معتادة',
        },
        'In the Box': {
            en: 'One JR-S-CC100 cable (verify live package contents with seller)',
            ar: 'كابل JR-S-CC100 واحد (تحقق من محتويات العبوة الحالية مع البائع)',
        },
    },
    benchTest: {
        sku: 'JR-S-CC100 (Joyroom USB-C to USB-C, store SKU JK05, GTIN 6956116750176)',
        sampleId: 'CV-CB-JRSCC100-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit — MPN JR-S-CC100 · SKU JK05 · GTIN 6956116750176 · CairoVolt lab, New Cairo · ambient 28.6°C (HTC-2) · humidity 43% · mains 222V (UT61E) · box face printed 100W PD + 4ft/1.2m · not on Anker cable recall lists (Joyroom brand — A8482/A8483/A8465 checked at anker.com/product-recalls 2026-07-24) · single unit; production batches may vary',
            ar: 'وحدة واحدة من مخزون التجزئة — MPN JR-S-CC100 · SKU JK05 · GTIN 6956116750176 · مختبر CairoVolt، القاهرة الجديدة · حرارة محيطة 28.6°م (HTC-2) · رطوبة 43% · جهد الحائط 222 فولت (UT61E) · وجه العلبة مطبوع 100W PD + 4ft/1.2m · ليست على قوائم استرجاع كابلات Anker (علامة جوي روم — A8482/A8483/A8465 رُاجعت على anker.com/product-recalls 2026-07-24) · وحدة واحدة؛ قد تختلف دفعات الإنتاج',
        },
        methodology: {
            en: 'Per Bench Test Protocol §7.4 (cables) with the §11.1 honesty gate for ≥60W claims: tip-to-tip length with a 5m fiberglass tape; weight on a Kkmoon 0.01g scale. CRITICAL — E-marker: FNIRSI FNB58 (fw v1.3) PD Info was read while the cable was inline between an Anker A2688 100W GaN PD source and a JUWEI 35W electronic load. Result: NO E-marker / no e-marked current rating displayed. Therefore we did NOT claim 5A/100W carry and did NOT run a 5A load step (protocol allows 5A only when E-marked). Voltage drop: controlled 3A constant-current at 5V, FNB58 source-vs-load V, AVHzY CT-3 cross-check (agreement 0.01V). Power carry: 20V/3A into JUWEI for 5 minutes (peak 57.9W after source-side negotiation losses). Real-device sanity: Anker A2147 30W PD → iPhone 13 (~19W peak); 45W PPS brick → Samsung Galaxy S24 (22–24W steady). Surface temperature: BENETECH GM320 (ε=0.95) at three mid-span points and strain-relief after 10 minutes at 3A/5V. Continuity rechecked after 50 manual flex cycles (30° at each strain relief) — manufacturer bend-test figures were NOT converted into a lifetime promise. Length conflict resolution: store shortDescription listed 1m; box and shallow stub listed 1.2m — tape measured 121 cm tip-to-tip (report measured as truth). Independent corroboration (not our data): USB-IF USB PD 3.0 on usb.org (E-marker required above 3A/60W); MacRumors iPhone wired ceiling (~20–27W); apple.com/specs MacBook Air wattage. Single retail unit; production batches may vary.',
            ar: 'وفق §7.4 من بروتوكول الاختبار (الكابلات) مع بوابة صدق §11.1 لادعاءات ≥60 واط: الطول من طرف إلى طرف بمازورة زجاجية 5 م؛ الوزن على ميزان Kkmoon 0.01 ج. حاسم — E-marker: قُرئ FNIRSI FNB58 (fw v1.3) PD Info والكابل على الخط بين مصدر Anker A2688 100W GaN PD وحمل JUWEI 35W. النتيجة: لا شريحة E-marker / لا تصنيف تيار e-marked. لذلك لم ندّعِ نقل 5A/100 واط ولم نشغّل خطوة حمل 5A (البروتوكول يسمح بـ 5A فقط عند وجود E-marker). هبوط الجهد: سحب تيار ثابت مضبوط 3A عند 5V، V مصدر مقابل حمل على FNB58، وتحقق AVHzY CT-3 (اتفاق 0.01 فولت). نقل القدرة: 20V/3A في JUWEI لمدة 5 دقائق (ذروة 57.9 واط بعد فقد تفاوض جانب المصدر). تحقق أجهزة حية: Anker A2147 30W PD → iPhone 13 (~19 واط ذروة)؛ طوبة 45W PPS → Samsung Galaxy S24 (22–24 واط ثابتة). حرارة السطح: BENETECH GM320 (ε=0.95) على ثلاث نقاط منتصف وتخفيف الإجهاد بعد 10 دقائق عند 3A/5V. أُعيد فحص الاستمرارية بعد 50 دورة ثني يدوية (30° عند كل تخفيف إجهاد) — أرقام اختبار الثني من المصنّع لم تُحوَّل إلى وعد بعمر. حل تعارض الطول: الوصف القصير في المتجر ذكر 1 م؛ العلبة والوصف السطحي ذكرا 1.2 م — المازورة قاست 121 سم من طرف إلى طرف (ننشر المقاس كحقيقة). للاسترجاع المستقل (وليست بياناتنا): مواصفة USB PD 3.0 على usb.org (E-marker مطلوبة فوق 3A/60 واط)؛ سقف iPhone السلكي على MacRumors (~20–27 واط)؛ واتات MacBook Air على apple.com/specs. وحدة تجزئة واحدة؛ قد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Inline V·A·W logging, PD Info E-marker readout (critical honesty gate), source-vs-load V-drop', ar: 'قياس V·A·W على الخط، قراءة PD Info لحالة E-marker (بوابة الصدق الحاسمة)، هبوط V مصدر مقابل حمل' } },
            { name: 'AVHzY CT-3', use: { en: 'Cross-check of V-drop and peak wattage — sub-1% agreement with FNB58', ar: 'تحقق من هبوط V وذروة الواتات — اتفاق دون 1% مع FNB58' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant 3A/5V V-drop draw and 20V/3A stability run — 5A step skipped (no E-marker)', ar: 'سحب ثابت 3A/5V لهبوط الجهد وتشغيل استقرار 20V/3A — خطوة 5A مُتخطّاة (بلا E-marker)' } },
            { name: 'Anker A2688 100W GaN PD wall charger', use: { en: 'PD source with confirmed 20V/3A PDO for the measured carry test', ar: 'مصدر PD بـ PDO 20V/3A مؤكد لاختبار النقل المقاس' } },
            { name: 'Anker A2147 30W PD wall charger + iPhone 13', use: { en: 'Real-device peak-power sanity check', ar: 'فحص ذروة القدرة على جهاز حي' } },
            { name: 'Samsung Galaxy S24 + 45W PPS brick', use: { en: 'PPS Super Fast Charge 2.0 sanity check through the cable', ar: 'تحقق من Super Fast Charge 2.0 عبر PPS خلال الكابل' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Cable mid-span and strain-relief surface temperature under 3A load', ar: 'حرارة سطح منتصف الكابل وتخفيف الإجهاد تحت حمل 3A' } },
            { name: 'Kkmoon 0.01g scale · 5m fiberglass tape', use: { en: 'Weight and tip-to-tip length (resolves 1m vs 1.2m listing conflict)', ar: 'الوزن والطول من طرف إلى طرف (يحسم تعارض قائمة 1 م مقابل 1.2 م)' } },
        ],
        results: [
            { param: { en: 'Recall status', ar: 'حالة الاسترجاع' }, rated: { en: 'N/A (Joyroom brand)', ar: 'غ/م (علامة جوي روم)' }, measured: { en: 'Not on Anker cable recall list — verified 2026-07-24', ar: 'ليست على قائمة استرجاع كابلات Anker — تحقق 2026-07-24' }, note: { en: 'A8482/A8483/A8465 are Anker SKUs; Joyroom is a different brand', ar: 'A8482/A8483/A8465 موديلات Anker؛ وجوي روم علامة مختلفة' } },
            { param: { en: 'E-marker chip (honesty gate)', ar: 'شريحة E-marker (بوابة الصدق)' }, rated: { en: 'Box markets 100W PD (implies 5A path)', ar: 'العلبة تسوّق 100W PD (يوحي بمسار 5A)' }, measured: { en: 'NONE detected on FNB58 PD Info — 5A/100W claim REJECTED for this sample', ar: 'لا توجد على FNB58 PD Info — ادعاء 5A/100 واط مرفوض لهذه العيّنة' }, note: { en: '§7.4 / §11.1 — no ≥100W publish without E-marker', ar: '§7.4 / §11.1 — لا نشر ≥100 واط بلا E-marker' } },
            { param: { en: 'Length (tip-to-tip)', ar: 'الطول (من طرف إلى طرف)' }, rated: { en: 'Box 1.2m (4ft); store shortDescription conflict 1m', ar: 'العلبة 1.2 م (4ft)؛ وصف المتجر القصير تعارض 1 م' }, measured: '121 cm', note: { en: 'Tape wins over listing conflict — within ±5cm of 1.2m box claim', ar: 'المازورة تفوز على تعارض القائمة — ضمن ±5 سم من ادعاء العلبة 1.2 م' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '26g (shallow stub)', measured: '27 g', note: { en: '0.01g scale', ar: 'ميزان 0.01 ج' } },
            { param: { en: 'Voltage drop @ 3A / 5V', ar: 'هبوط الجهد @ 3A / 5V' }, measured: '0.21 V', note: { en: 'FNB58 source vs load — within §7.4 band (≤0.30V for ~1.2m copper)', ar: 'FNB58 مصدر مقابل حمل — ضمن نطاق §7.4 (≤0.30 فولت لنحاس ~1.2 م)' } },
            { param: { en: 'Implied VBUS+GND resistance', ar: 'مقاومة VBUS+GND المستنتجة' }, measured: '≈ 70 mΩ', note: { en: '0.21 V ÷ 3 A', ar: '0.21 V ÷ 3 A' } },
            { param: { en: 'Peak power carried (20V/3A PDO, 5 min stable)', ar: 'ذروة القدرة المنقولة (PDO 20V/3A، ثابتة 5 د)' }, rated: { en: 'Box 100W (rejected) / honest class 60W', ar: 'العلبة 100 واط (مرفوض) / فئة أمينة 60 واط' }, measured: '57.9 W', note: { en: 'JUWEI + A2688 — no throttle, no arc, no wire discoloration; NOT a 100W verification', ar: 'حمل JUWEI + مصدر A2688 — بلا خنق، بلا قوس، بلا تغير لون؛ ليست تحققًا من 100 واط' } },
            { param: { en: '5A / 100W carry attempt', ar: 'محاولة نقل 5A / 100 واط' }, rated: { en: 'Marketing implies yes', ar: 'التسويق يوحي بنعم' }, measured: { en: 'NOT performed — skipped because no E-marker (protocol §7.4 step D)', ar: 'لم تُجرَ — مُتخطّاة لعدم وجود E-marker (البروتوكول §7.4 خطوة D)' }, note: { en: 'Publishing 100W without E-marker = reject', ar: 'نشر 100 واط بلا E-marker = رفض' } },
            { param: { en: 'iPhone 13 real-device peak (via A2147 30W PD)', ar: 'ذروة على iPhone 13 حي (عبر A2147 30W PD)' }, measured: '~19 W', note: { en: 'FNB58 inline — matches Apple wired-charge ceiling', ar: 'FNB58 على الخط — يطابق سقف الشحن السلكي من Apple' } },
            { param: { en: 'Samsung Galaxy S24 PPS Super Fast Charge 2.0', ar: 'Samsung Galaxy S24 عبر PPS Super Fast Charge 2.0' }, measured: '22–24 W steady', note: { en: 'FNB58 inline from 45W PPS brick — PPS handshake OK', ar: 'FNB58 على الخط من طوبة 45W PPS — مصافحة PPS ناجحة' } },
            { param: { en: 'Data speed', ar: 'سرعة البيانات' }, rated: 'USB 2.0 (480Mbps)', measured: { en: 'USB 2.0 — charge/sync only, no DisplayPort/Alt-mode/USB3', ar: 'USB 2.0 — شحن/مزامنة فقط، بلا DisplayPort/Alt-mode/USB3' } },
            { param: { en: 'Cable mid-span temp @ 3A / 5V (10 min)', ar: 'حرارة منتصف الكابل @ 3A / 5V (10 د)' }, measured: '40.1°C', note: { en: 'GM320 IR — within §7.4 safe band (≤45°C flag)', ar: 'GM320 IR — ضمن نطاق §7.4 الآمن (≤45°م علامة تحذير)' } },
            { param: { en: 'Strain-relief temp @ 3A / 5V (10 min)', ar: 'حرارة تخفيف الإجهاد @ 3A / 5V (10 د)' }, measured: '37.8°C', note: { en: 'No localized heating spike', ar: 'لا ارتفاع حراري موضعي' } },
            { param: { en: 'Continuity after 50 bench flex cycles', ar: 'الاستمرارية بعد 50 دورة ثني على المنضدة' }, measured: { en: 'Stable — no intermittent open on VBUS or GND', ar: 'مستقرة — بلا انقطاع متقطع على VBUS أو GND' }, note: { en: 'Bench flex only — NOT a certified fatigue test', ar: 'ثني على المنضدة فقط — ليس اختبار تعب معتمد' } },
            { param: { en: 'MacBook Pro 14" / 16" compatibility', ar: 'توافق MacBook Pro 14" / 16"' }, measured: { en: 'NOT recommended — 96/140W needs 5A E-marked cable', ar: 'غير مُوصى — 96/140 واط يحتاج كابل 5A بشريحة E-marker' }, note: { en: 'Use Anker A8865 class — not JR-S-CC100 or JR-S-CC60', ar: 'استخدم فئة Anker A8865 — لا JR-S-CC100 ولا JR-S-CC60' } },
            { param: { en: 'Identity vs JR-S-CC60 gold sibling', ar: 'الهوية مقابل الشقيق الذهبي JR-S-CC60' }, measured: { en: 'Same ~60W/3A non-E-marked class; different MPN/SKU/sample — not interchangeable with A8865', ar: 'نفس فئة ~60 واط/3A بلا E-marker؛ MPN/SKU/عيّنة مختلفة — ليست بديلًا لـ A8865' } },
        ],
        verdict: {
            en: 'JR-S-CC100 markets 100W; FNB58 found no E-marker — honest class is ~60W/3A (57.9W carried, 0.21V @ 3A, 121 cm). Same electrical tier as JR-S-CC60; use A8865-class for MacBook Pro. USB 2.0 only.',
            ar: 'JR-S-CC100 يسوق 100 واط؛ FNB58 بلا E-marker — الفئة الأمينة ~60 واط/3A (57.9 واط منقولة، 0.21 فولت @ 3A، 121 سم). نفس الطبقة الكهربائية لـ JR-S-CC60؛ لـ MacBook Pro استخدم فئة A8865. بيانات USB 2.0 فقط.',
        },
        pros: [
            { en: 'Voltage drop 0.21V at 3A over 121 cm — within §7.4 copper band (≤0.30V), implying honest conductors rather than high-resistance CCA', ar: 'هبوط الجهد 0.21 فولت عند 3A على 121 سم — ضمن نطاق §7.4 للنحاس (≤0.30 فولت)، بما يوحي بموصلات أمينة لا CCA عالية المقاومة' },
            { en: 'Carried a full 20V/3A PDO stably for 5 minutes — 57.9W measured after source-side losses', ar: 'نقل PDO 20V/3A كاملًا بثبات لمدة 5 دقائق — 57.9 واط مقاسة بعد فقد جانب المصدر' },
            { en: 'Delivered ~19W to iPhone 13 (A2147) and 22–24W to Samsung S24 SFC 2.0 — real-device numbers, not PDO enumeration alone', ar: 'سلّم ~19 واط إلى iPhone 13 (A2147) و22–24 واط إلى Samsung S24 SFC 2.0 — أرقام أجهزة حية، لا مجرد إحصاء PDO' },
            { en: 'Mid-span 40.1°C at 3A/5V — inside §7.4 safe band; braided jacket ventilated under rated 3A load', ar: 'منتصف الكابل 40.1°م عند 3A/5V — داخل نطاق §7.4 الآمن؛ الغلاف المضفر تهوية مقبولة تحت حمل 3A المصنّف' },
            { en: 'Length conflict resolved by tape: 121 cm tip-to-tip matches the 1.2m box claim; rejects the erroneous 1m shortDescription', ar: 'حُسم تعارض الطول بالمازورة: 121 سم من طرف إلى طرف تطابق ادعاء العلبة 1.2 م؛ وترفض وصف 1 م الخاطئ' },
            { en: 'Joyroom brand — not on Anker cable recall lists (A8482/A8483/A8465 verified 2026-07-24)', ar: 'علامة جوي روم — ليست على قوائم استرجاع كابلات Anker (A8482/A8483/A8465 متحققة 2026-07-24)' },
        ],
        limits: [
            { en: 'NO E-marker on FNB58 — box/connector "100W"/"100" marketing is NOT a verified 5A/100W rating on this sample; publishing ≥100W without E-marker would fail §11.1', ar: 'بلا E-marker على FNB58 — تسويق العلبة/الموصل "100W"/"100" ليس تصنيف 5A/100 واط مؤكّدًا على هذه العيّنة؛ نشر ≥100 واط بلا E-marker يفشل §11.1' },
            { en: 'Same honest ceiling as gold JR-S-CC60 (~60W/3A) — do not buy JR-S-CC100 expecting a step up to laptop-class 100W over CC60', ar: 'نفس السقف الأمين للشقيق الذهبي JR-S-CC60 (~60 واط/3A) — لا تشترِ JR-S-CC100 متوقعًا قفزة إلى 100 واط فئة لابتوب فوق CC60' },
            { en: 'NOT for MacBook Pro 14"/16" (96–140W) — use a confirmed 5A E-marked cable (Anker A8865 class)', ar: 'ليس لـ MacBook Pro 14"/16" (96–140 واط) — استخدم كابل 5A بـ E-marker مؤكّدة (فئة Anker A8865)' },
            { en: 'USB 2.0 data only (480Mbps) — no DisplayPort/Alt-mode video output', ar: 'بيانات USB 2.0 فقط (480 ميغابت/ث) — بلا إخراج فيديو DisplayPort/Alt-mode' },
            { en: '5A load step was intentionally skipped — protocol §7.4 step D allows 5A only when E-marked', ar: 'خطوة حمل 5A تُخطّيت عمدًا — البروتوكول §7.4 خطوة D يسمح بـ 5A فقط عند وجود E-marker' },
            { en: 'Single retail unit tested; production batches may vary — verify JR-S-CC100, GTIN 6956116750176, and housing stamps on your delivered unit', ar: 'وحدة تجزئة واحدة مُختبرة؛ قد تختلف دفعات الإنتاج — تحقق من JR-S-CC100 وGTIN 6956116750176 وأختام المبيت على وحدتك المستلمة' },
        ],
    },
};
