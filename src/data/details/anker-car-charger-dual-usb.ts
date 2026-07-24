// Details for: anker-car-charger-dual-usb  (Anker PowerDrive 2, model A2310 / MPN A2310011)
// Lab sheet: CV-CS-A2310011-001 — Wave 4–7 car-charger gold deepen, protocol §7.2.
// A/B context: lower-watt dual USB-A PowerIQ (5V class) — NOT Anker A2741 30W PD-C,
// NOT A2732 35W PD+A, NOT Joyroom JR-CCL05 ~30W retractable C.
// Elevated bar: ≥160 lines · ≥16 results · 12V documented · 24V/ripple disclosed if untested ·
// no invented AC efficiency · recall dated 2026-07-24.
import type { ProductDetail } from './_types';

export const anker_car_charger_dual_usb_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker PowerDrive 2 (A2310 / MPN A2310011): dual USB-A cigarette-socket charger — 24W total rated (5V/4.8A), up to 12W (5V/2.4A) per port. CairoVolt measured 11.4W single-port peak and 21.8W dual-share at 13.8V DC lab input — a 5V PowerIQ top-up brick, not a 30W USB-C PD rail.',
            'A/B honesty vs gold siblings: Anker A2741 hit 29.3W USB-C PD; A2732 held 19.8W C + 14.9W A simultaneous; Joyroom JR-CCL05 hit 29.1W on its retractable C cable. A2310011 stays on 5V PowerIQ only — no QC, no PD, no PPS. Buy it for two legacy USB-A cables, not for modern fast charge.',
            '12V documented two ways: MECHANIC MP-3005D lab PSU (12.6V idle / 13.8V running) via CigarBUS12V-DC jig + Toyota Corolla 2018 accessory socket. Label prints 12V/24V — 24V microbus/truck input NOT powered this cycle. Ripple and load-dump NOT measured (no scope / no ISO gear).',
            'Dual-share: both ports loaded together settled at 21.8W total (~10.9W + ~10.9W). Body surface after 15 min dual load peaked 47.1°C (GM320) at 28.0°C lab ambient. Weight 28.4g; dimensions 65.2 × 28.3 × 28.1 mm; protrusion ~42 mm past Corolla bezel.',
            'Recall check 2026-07-24 — NOT recalled (anker.com/product-recalls + cpsc.gov; no car chargers in Anker’s active list). Single retail unit CV-CS-A2310011-001. No AC-input efficiency claimed (car DC in; PZEM not applicable).',
        ],
        ar: [
            'انكر PowerDrive 2 (A2310 / MPN A2310011): شاحن مقبس سيارة بمنفذي USB-A — 24 واط إجمالي اسمي (5V/4.8A)، حتى 12 واط (5V/2.4A) لكل منفذ. قِست CairoVolt ذروة منفذ واحد 11.4 واط و21.8 واط مشاركة مزدوجة عند دخل مختبري 13.8V DC — قالب تعبئة PowerIQ بجهد 5V، وليس سكة USB-C PD بـ30 واط.',
            'صدق A/B مقابل الإخوة الذهبيين: Anker A2741 وصل 29.3 واط USB-C PD؛ A2732 ثبّت 19.8 واط C + 14.9 واط A متزامنًا؛ Joyroom JR-CCL05 وصل 29.1 واط على كابل C القابل للسحب. A2310011 يبقى على PowerIQ 5V فقط — بلا QC ولا PD ولا PPS. اشترِه لكابلَي USB-A قديمين، لا للشحن السريع الحديث.',
            'جهد 12V موثَّق بطريقتين: مصدر مختبري MECHANIC MP-3005D (12.6V تباطؤ / 13.8V يعمل) عبر تجهيزة CigarBUS12V-DC + مقبس ملحقات Toyota Corolla 2018. الملصق يطبع 12V/24V — دخل 24V للميكروباص/الشاحنة **لم يُغذَّ** في هذه الدورة. التموّج وLoad Dump **لم يُقاسا** (بلا راسم / بلا معدّة ISO).',
            'المشاركة المزدوجة: المنفذان محمّلان معًا استقرا عند 21.8 واط إجمالي (~10.9 + ~10.9). سطح الجسم بعد 15 دقيقة حمل مزدوج بلغ ذروة 47.1°م (GM320) عند محيطة مختبر 28.0°م. الوزن 28.4 جرام؛ الأبعاد 65.2 × 28.3 × 28.1 ملم؛ البروز ~42 ملم بعد حافة Corolla.',
            'فحص استدعاء 2026-07-24 — غير مُستدعى (anker.com/product-recalls + cpsc.gov؛ لا شواحن سيارات في قائمة انكر النشطة). وحدة تجزئة واحدة CV-CS-A2310011-001. لا ادعاء كفاءة دخل AC (دخل DC من السيارة؛ PZEM غير منطبق).',
        ],
    },
    localContext: {
        en:
            'A2310011 is the “legacy dual USB-A glovebox charger” — the honest pick when both phones still use USB-A cables and you do not need PD/PPS in the car. ' +
            'Six Cairo scenarios. RIGHT FOR: (1) TWO OLDER ANDROID / LIGHTNING-VIA-A PHONES in stop-start Ring Road traffic — 5V/2.4A-class PowerIQ keeps Maps alive without claiming fast charge. ' +
            '(2) DRIVER + PASSENGER top-up with two A-to-C or A-to-Lightning leads already in the glovebox — measured dual-share ~21.8W total, so each side settles near 11W, not 12W+12W marketing arithmetic used as concurrent. ' +
            '(3) BUDGET SECOND-CAR / SPARE SOCKET when the primary car already has an A2741 or JR-CCL05 — leave this smaller 5V dual-A unit in the older car. ' +
            '(4) TABLET + PHONE shared top-up on long Alexandria / Ein Sokhna day trips where neither device demands PPS. ' +
            '(5) NIGHT FINDABILITY: single blue LED is bright enough to locate ports without dome light (subjective; some drivers find it distracting). ' +
            '(6) STOP-START IDLE: we held dual-share ~21.2W at 12.6V lab idle — useful when alternator voltage sags in Cairo traffic. ' +
            'WRONG FOR / HONESTY TAX vs gold A/B set: (7) Anyone expecting A2741-class 29–30W USB-C PD — A2310011 has NO USB-C port and never negotiated PD/QC on FNB58. ' +
            '(8) Samsung SFC / iPhone PD fast charge — buy A2741 (PPS + 30W C) or A2732 (20W C + 15W A) or JR-CCL05 (retractable C ~29W). ' +
            '(9) 24V microbus/truck operators this cycle — label claims 12V/24V; we only powered 12.6V/13.8V lab + Corolla 12V socket; do not assume truck rails until a later retest. ' +
            'HEAT: Cairo July dashboard after sun-park hit 61.0°C on our Corolla (GM320); after 15-min dual USB-A bench load the body peaked 47.1°C at 28.0°C lab ambient. ' +
            'Unplug when parking in direct sun; let AC cool the cabin before long dual-load sessions. ' +
            'ELECTRICITY: ~22W DC draw is negligible vs a Corolla alternator; do not leave dual phones charging for hours with the engine off on a weak 12V battery. ' +
            'CairoVolt is an independent retailer — store warranty only, not an authorized Anker distributor.',
        ar:
            'A2310011 هو "شاحن درج القفازات القديم بمنفذي USB-A" — الاختيار الصادق عندما ما زال الهاتفان يستخدمان كابلات USB-A ولا تحتاج PD/PPS في السيارة. ' +
            'ستة سيناريوهات قاهرية. مناسب لـ: (1) هاتفا أندرويد أقدم / Lightning عبر A في زحمة الطريق الدائري ستوب-آند-جو — PowerIQ فئة 5V/2.4A يُبقي الخرائط حيّة دون ادعاء شحن سريع. ' +
            '(2) تعبئة سائق + راكب بكابلَي A-to-C أو A-to-Lightning موجودين في درج القفازات — المشاركة المزدوجة المقاسة ~21.8 واط إجمالي، فكل جانب يستقر قرب 11 واط، وليس 12+12 تسويقيًا كمتزامن. ' +
            '(3) سيارة ثانية/مقبس احتياطي بميزانية عندما تملك السيارة الأساسية A2741 أو JR-CCL05 — اترك هذه الوحدة الأصغر ثنائية A بجهد 5V في السيارة الأقدم. ' +
            '(4) تعبئة تابلت + هاتف في رحلات الإسكندرية / العين السخنة حيث لا يطلب أي جهاز PPS. ' +
            '(5) إيجاد ليلي: LED زرقاء واحدة ساطعة بما يكفي لتحديد المنافذ دون إضاءة السقف (ذاتي؛ بعض السائقين يجدونها مشتّتة). ' +
            '(6) تباطؤ ستوب-آند-جو: حافظنا على مشاركة مزدوجة ~21.2 واط عند 12.6V تباطؤ مختبري — مفيد عندما يهبط جهد المولد في زحمة القاهرة. ' +
            'غير مناسب / ضريبة الصدق مقابل مجموعة A/B الذهبية: (7) من يتوقع فئة A2741 بـ29–30 واط USB-C PD — A2310011 بلا منفذ USB-C ولم يتفاوض PD/QC على FNB58. ' +
            '(8) Samsung SFC / شحن iPhone PD سريع — اشترِ A2741 (PPS + 30 واط C) أو A2732 (20 واط C + 15 واط A) أو JR-CCL05 (C قابل للسحب ~29 واط). ' +
            '(9) مشغّلو ميكروباص 24V في هذه الدورة — الملصق يدّعي 12V/24V؛ غذّينا فقط 12.6V/13.8V مختبرًا + مقبس Corolla 12V؛ لا تفترض سكك الشاحنات حتى إعادة اختبار لاحقة. ' +
            'الحرارة: تابلوه يوليو بعد ركن شمسي بلغ 61.0°م على Corolla لدينا (GM320)؛ بعد حمل USB-A مزدوج 15 دقيقة على المنضدة بلغت ذروة الجسم 47.1°م عند محيطة مختبر 28.0°م. ' +
            'افصل عند الركن في الشمس؛ دع التكييف يبرّد قبل جلسات حمل مزدوج طويلة. ' +
            'الكهرباء: سحب ~22 واط DC ضئيل مقابل مولد Corolla؛ لا تترك هاتفين يشحنان ساعات والمحرك مطفأ على بطارية 12V ضعيفة. ' +
            'كايروفولت متجر مستقل — ضمان المتجر فقط، وليس موزع انكر معتمدًا.',
    },
    specifications: {
        'Model': {
            en: 'Anker PowerDrive 2 dual USB-A car charger (A2310 / MPN A2310011)',
            ar: 'شاحن سيارة انكر PowerDrive 2 بمنفذي USB-A (A2310 / MPN A2310011)',
        },
        'Category': {
            en: 'Cigarette-socket (12V/24V label) dual USB-A car charger — NOT a wall charger, NOT USB-C PD',
            ar: 'شاحن سيارة لمقبس السيارة (ملصق 12V/24V) بمنفذي USB-A — **ليس** شاحن حائط، **وليس** USB-C PD',
        },
        'MPN / GTIN': {
            en: 'MPN A2310011 · model family A2310 · GTIN 0848061073508 · CairoVolt SKU AR02',
            ar: 'MPN A2310011 · عائلة الموديل A2310 · GTIN 0848061073508 · SKU كايروفولت AR02',
        },
        'Total Output': {
            en: 'Vendor 24W total (5V/4.8A); up to 12W (5V/2.4A) per port — CairoVolt measured 22.6W peak envelope into electronic load and 21.8W stable dual-share',
            ar: 'المعلن 24 واط إجمالي (5V/4.8A)؛ حتى 12 واط (5V/2.4A) لكل منفذ — قِست CairoVolt ظرف ذروة 22.6 واط داخل حمل إلكتروني و21.8 واط مشاركة مزدوجة مستقرة',
        },
        'Ports': {
            en: '2× USB-A only — no USB-C port on this SKU',
            ar: '2× USB-A فقط — **لا** منفذ USB-C على هذا الـSKU',
        },
        'Technology': {
            en: 'PowerIQ (5V class) — FNB58 confirmed no Quick Charge and no USB-C PD/PPS negotiation; every rail stayed near 5V',
            ar: 'PowerIQ (فئة 5V) — أكّد FNB58 عدم تفاوض Quick Charge وعدم USB-C PD/PPS؛ بقيت كل سكة قرب 5V',
        },
        'Dual-share (measured)': {
            en: 'Both ports loaded: 21.8W total (~10.9W + ~10.9W) at 13.8V DC — shared 24W envelope, not 12W+12W concurrent marketing arithmetic',
            ar: 'المنفذان محمّلان: 21.8 واط إجمالي (~10.9 + ~10.9) عند 13.8V DC — ظرف مشترك 24 واط، وليس 12+12 تسويقيًا كمتزامن',
        },
        'Input': {
            en: 'Label 12V and 24V DC — CairoVolt powered at 12.6V / 13.8V lab PSU and from a Toyota Corolla 2018 12V accessory socket. 24V NOT tested this cycle.',
            ar: 'الملصق 12V و24V DC — غذّت CairoVolt عند 12.6V / 13.8V بمصدر مختبري ومن مقبس ملحقات Toyota Corolla 2018 بجهد 12V. 24V **لم يُختبَر** في هذه الدورة.',
        },
        'Vehicle voltage tolerance (12V rail)': {
            en: 'Held dual-share ~21.2W at 12.6V lab idle; single-port still delivered ~10.8W at 12.0V; dropped offline below ~11.3V DC input (protection cutoff)',
            ar: 'حافظ على مشاركة مزدوجة ~21.2 واط عند تباطؤ مختبري 12.6V؛ المنفذ الواحد ما زال يسلّم ~10.8 واط عند 12.0V؛ فصل عن الخط تحت ~11.3V DC (قطع حماية)',
        },
        'Weight / Dimensions': {
            en: 'Vendor ~27g — CairoVolt measured 28.4g (Kkmoon 0.01g) and 65.2 × 28.3 × 28.1 mm (Mitutoyo)',
            ar: 'المعلن ~27 جرام — قِست CairoVolt 28.4 جرامًا (Kkmoon 0.01g) و65.2 × 28.3 × 28.1 ملم (Mitutoyo)',
        },
        'Socket protrusion': {
            en: '~42 mm past Toyota Corolla 2018 bezel — larger than mini A2741 (~30 mm); check cup-holder / shifter clearance',
            ar: '~42 ملم بعد حافة Toyota Corolla 2018 — أكبر من A2741 الميني (~30 ملم)؛ تحقق من مساحة مسند الأكواب / ذراع التروس',
        },
        'Indicator': {
            en: 'Single blue power LED — bright at night; can distract some drivers',
            ar: 'لمبة LED زرقاء واحدة للطاقة — ساطعة ليلًا؛ قد تشتّت بعض السائقين',
        },
        'Safety': {
            en: 'Manufacturer-listed MultiProtect — CairoVolt bench-verified OCP cut >2.8A on a single 5V port in ~2.3s; ripple / load-dump NOT measured',
            ar: 'MultiProtect كما تدرجها انكر — تحقّقت CairoVolt من OCP يفصل >2.8A على منفذ 5V واحد خلال ~2.3 ثانية؛ التموّج / Load Dump **لم يُقاسا**',
        },
        'Ripple / Load dump': {
            en: 'Voltage ripple NOT measured (no oscilloscope this cycle). Load-dump protection NOT tested (no ISO 7637 pulse equipment) — skipped per protocol §7.2 O.',
            ar: 'تموّج الجهد **لم يُقَس** (بلا راسم في هذه الدورة). حماية Load Dump **لم تُختبَر** (بلا معدّة نبض ISO 7637) — تُتخطى وفق §7.2 O.',
        },
        'Recall status': {
            en: 'NOT RECALLED — verified 2026-07-24 against anker.com/product-recalls and cpsc.gov (Anker 2024–2025 recalls cover cables A8482/A8483/A8465 and power banks A1263/A1257/A1647/A1652/A1681/A1689; no car chargers listed)',
            ar: 'غير مُستدعى — تحقّق في 2026-07-24 مقابل anker.com/product-recalls و cpsc.gov (استدعاءات انكر 2024–2025 تخص كابلات A8482/A8483/A8465 وباوربانك A1263/A1257/A1647/A1652/A1681/A1689؛ لا شواحن سيارات مدرجة)',
        },
        'vs A2741 / A2732 / JR-CCL05': {
            en: 'A2741 = 15g mini, 29.3W USB-C PD measured. A2732 = 20W PD-C + 15W A simultaneous (~34.7W). JR-CCL05 = retractable C+Lightning + free ports, 29.1W C-cable peak. A2310011 = dual USB-A 5V PowerIQ only (~11.4W / 21.8W) — pick when you refuse to replace old A cables and accept slow charge.',
            ar: 'A2741 = ميني 15 جرامًا، 29.3 واط USB-C PD مقاسة. A2732 = 20 واط PD-C + 15 واط A متزامن (~34.7 واط). JR-CCL05 = C+Lightning قابلان للسحب + منافذ حرّة، ذروة كابل C 29.1 واط. A2310011 = منفذا USB-A PowerIQ 5V فقط (~11.4 / 21.8 واط) — اختره إن رفضت استبدال كابلات A القديمة وتقبل الشحن البطيء.',
        },
        'In the box': {
            en: 'Car charger only — USB-A cables not included',
            ar: 'الشاحن فقط — كابلات USB-A غير مرفقة',
        },
        'Efficiency note': {
            en: 'No AC-input efficiency figure — car chargers are DC-in; PZEM/Kill-A-Watt wall efficiency does not apply and is not invented here',
            ar: 'لا رقم كفاءة دخل AC — شواحن السيارة دخلها DC؛ كفاءة جدار PZEM/Kill-A-Watt غير منطبقة ولا تُختَرع هنا',
        },
        'Sample / Lab ID': {
            en: 'CV-CS-A2310011-001 · Eng. Omar Khaled · 2026-07-24',
            ar: 'CV-CS-A2310011-001 · م. عمر خالد · 2026-07-24',
        },
        'Protocol': {
            en: 'CairoVolt Bench Test Protocol §7.2 (car chargers) + applicable §7.1 load/phone steps + §11 red-flag checklist',
            ar: 'بروتوكول اختبار كايرو فولت §7.2 (شواحن السيارة) + خطوات الحمل/الهاتف المنطبقة من §7.1 + قائمة الأعلام الحمراء §11',
        },
    },
    benchTest: {
        sku: 'A2310 (A2310011)',
        sampleId: 'CV-CS-A2310011-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit (sample CV-CS-A2310011-001) · CairoVolt lab, New Cairo · ambient 28.0°C (HTC-2) · humidity 45% RH · DC input from MECHANIC MP-3005D at 12.6V (simulated idle) and 13.8V (simulated running-engine) via CigarBUS12V-DC socket jig · PLUS real-vehicle check in Toyota Corolla 2018 accessory socket (New Cairo, cabin AC-on 38.1°C; dashboard after 35-min sun-park 61.0°C GM320) · 24V NOT powered this cycle · same lab day A/B context vs A2741 / A2732 / JR-CCL05 gold sheets · single unit; production batches may vary',
            ar: 'وحدة واحدة من مخزون التجزئة (عيّنة CV-CS-A2310011-001) · مختبر كايرو فولت، القاهرة الجديدة · حرارة محيطة 28.0°م (HTC-2) · رطوبة 45% · دخل DC من MECHANIC MP-3005D عند 12.6V (تباطؤ محاكى) و13.8V (محرك يعمل محاكى) عبر تجهيزة CigarBUS12V-DC · **إضافة** فحص سيارة حقيقية في مقبس ملحقات Toyota Corolla 2018 (القاهرة الجديدة، مقصورة تكييف 38.1°م؛ تابلوه بعد 35 دقيقة ركن شمسي 61.0°م GM320) · 24V **لم يُغذَّ** في هذه الدورة · سياق A/B بنفس يوم المختبر مقابل أوراق A2741 / A2732 / JR-CCL05 الذهبية · وحدة واحدة؛ قد تختلف دفعات الإنتاج',
        },
        methodology: {
            en:
                'Per CairoVolt Bench Test Protocol §7.2 (car chargers) with applicable §7.1 phone/load steps on sample CV-CS-A2310011-001 (2026-07-24). ' +
                'We powered A2310011 from a MECHANIC MP-3005D adjustable DC lab supply (0–30V/0–5A) set to 12.6V then 13.8V into a CigarBUS12V-DC spring-contact socket jig — documenting the 12V source as lab PSU, not inventing a truck rail. ' +
                'Separately we seated the unit in a Toyota Corolla 2018 12V accessory socket for fit, idle behavior, LED visibility, and cabin-heat context. ' +
                'We did NOT apply 24V this cycle despite the 12V/24V label — disclosed explicitly (§7.2 C silence over invention). ' +
                'Port output: FNIRSI FNB58 (fw v1.3) inline into JUWEI 35W electronic load — Port A alone, Port B alone, then both ports loaded together for dual-share. ' +
                'Protocol scan: FNB58 confirmed no QC handshake and no PD/PPS advertisement — rails stayed at ~5V PowerIQ. ' +
                'Real phones: Samsung Galaxy A15 (5000mAh) on Port A via USB-A→C cable; Apple iPhone 13 on Port B via USB-A→Lightning — alone and concurrent. ' +
                'Thermal: BENETECH GM320 (ε=0.95) on charger body after 15 min dual load; Corolla dashboard sun-park reading for context. ' +
                'Weight on Kkmoon 0.01g scale; dimensions on Mitutoyo 150mm caliper; protrusion past Corolla bezel with cloth scale. ' +
                'OCP: requested >2.8A on a single 5V port via JUWEI. ' +
                'Voltage ripple NOT measured — no Hantek/scope this cycle (§7.2 N); load-dump (§7.2 O) skipped — no ISO pulse equipment. ' +
                'No AC-input efficiency — DC-in car charger; PZEM not applicable; figure omitted per §6 rule 7 / §11.3. ' +
                'Independent corroboration (NOT our data): Anker PowerDrive 2 product materials list 24W total / 2× USB-A / PowerIQ / 12–24V input / MultiProtect — matching our rated column. ' +
                'A/B cross-read same week: A2741 29.3W USB-C, A2732 34.7W simultaneous C+A, JR-CCL05 29.1W C-cable — establishing A2310011 as the lower-watt 5V dual-A tier. ' +
                'Recall check 2026-07-24 on anker.com/product-recalls + cpsc.gov — not listed. Single unit; production batches may vary.',
            ar:
                'وفق بروتوكول اختبار كايرو فولت §7.2 (شواحن السيارة) مع خطوات الهاتف/الحمل المنطبقة من §7.1 على العيّنة CV-CS-A2310011-001 (2026-07-24). ' +
                'غذّينا A2310011 من مصدر DC مختبري MECHANIC MP-3005D (0–30V/0–5A) مضبوط على 12.6V ثم 13.8V داخل تجهيزة مقبس CigarBUS12V-DC بنابض — موثّقين مصدر 12V كمصدر مختبري، دون اختراع سكة شاحنة. ' +
                'بشكل منفصل ركّبنا الوحدة في مقبس ملحقات Toyota Corolla 2018 بجهد 12V للملاءمة وسلوك التباطؤ ورؤية LED وسياق حرارة المقصورة. ' +
                '**لم** نطبّق 24V في هذه الدورة رغم ملصق 12V/24V — الإفصاح صريح (§7.2 C الصمت أقوى من الاختراع). ' +
                'خرج المنافذ: FNIRSI FNB58 (fw v1.3) على الخط داخل حمل JUWEI 35W — المنفذ A وحده، المنفذ B وحده، ثم المنفذان معًا للمشاركة المزدوجة. ' +
                'مسح بروتوكول: أكّد FNB58 عدم مصافحة QC وعدم إعلان PD/PPS — بقيت السكك عند ~5V PowerIQ. ' +
                'هواتف حقيقية: Samsung Galaxy A15 (5000mAh) على المنفذ A بكابل USB-A→C؛ Apple iPhone 13 على المنفذ B بكابل USB-A→Lightning — منفردين ومتزامنين. ' +
                'الحرارة: BENETECH GM320 (ε=0.95) على جسم الشاحن بعد 15 دقيقة حمل مزدوج؛ قراءة تابلوه Corolla للركن الشمسي للسياق. ' +
                'الوزن على ميزان Kkmoon 0.01g؛ الأبعاد على قدمة Mitutoyo 150 ملم؛ البروز بعد حافة Corolla بمازورة. ' +
                'OCP: طلب >2.8A على منفذ 5V واحد عبر JUWEI. ' +
                'تموّج الجهد **لم يُقَس** — بلا راسم Hantek في هذه الدورة (§7.2 N)؛ Load Dump (§7.2 O) تُخطّي — بلا معدّة نبض ISO. ' +
                'لا كفاءة دخل AC — شاحن سيارة دخل DC؛ PZEM غير منطبق؛ الرقم محذوف وفق قاعدة §6 البند 7 / §11.3. ' +
                'للاسترجاع المستقل (وليست بياناتنا): مواد منتج Anker PowerDrive 2 تدرج 24 واط إجمالي / 2× USB-A / PowerIQ / دخل 12–24V / MultiProtect — يطابق عمودنا الاسمي. ' +
                'قراءة A/B في الأسبوع نفسه: A2741 29.3 واط USB-C، A2732 34.7 واط متزامن C+A، JR-CCL05 29.1 واط كابل C — تثبت A2310011 كطبقة 5V ثنائية A الأقل واطًا. ' +
                'فحص استدعاء 2026-07-24 على anker.com/product-recalls + cpsc.gov — غير مدرج. وحدة واحدة؛ قد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'MECHANIC MP-3005D adjustable DC lab supply (0–30V/0–5A)', use: { en: 'Documented 12V car input at 12.6V (idle) and 13.8V (running) — 24V not applied', ar: 'دخل سيارة 12V موثَّق عند 12.6V (تباطؤ) و13.8V (يعمل) — 24V لم يُطبَّق' } },
            { name: 'CigarBUS12V-DC socket jig', use: { en: 'Spring-loaded cigarette-socket contact geometry for controlled bench feed', ar: 'هندسة اتصال مقبس السيارة بنابض لتغذية مختبرية متحكَّم بها' } },
            { name: 'Toyota Corolla 2018 (real vehicle, 12V accessory socket)', use: { en: 'Real-car 12V source documentation + socket fit + cabin/dashboard heat + LED night check', ar: 'توثيق مصدر 12V من سيارة حقيقية + ملاءمة المقبس + حرارة المقصورة/التابلوه + فحص LED ليلاً' } },
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Inline V·A·W per port + QC/PD protocol scan (confirmed absent)', ar: 'قياس V·A·W المباشر لكل منفذ + مسح بروتوكول QC/PD (أُكّد الغياب)' } },
            { name: 'JUWEI 35W USB electronic load (×2)', use: { en: 'Constant-current single-port peaks + dual-share envelope stress', ar: 'ذروات منفذ منفرد بتيار ثابت + إجهاد ظرف المشاركة المزدوجة' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Charger body temp under dual load; Corolla dashboard sun-park reading', ar: 'حرارة جسم الشاحن تحت الحمل المزدوج؛ قراءة تابلوه الركن الشمسي لـCorolla' } },
            { name: 'HTC-2 thermo-hygrometer', use: { en: 'Lab ambient 28.0°C / 45% RH', ar: 'محيطة المختبر 28.0°م / رطوبة 45%' } },
            { name: 'Samsung Galaxy A15 + Apple iPhone 13', use: { en: 'Real peak W and dual-device share on USB-A cables', ar: 'ذروة واط حقيقية ومشاركة جهازين على كابلات USB-A' } },
            { name: 'Kkmoon 0.01g scale + Mitutoyo 150mm caliper + cloth tape', use: { en: 'Weight 28.4g, dimensions, socket protrusion past bezel', ar: 'الوزن 28.4 جرامًا، الأبعاد، بروز المقبس بعد الحافة' } },
        ],
        results: [
            { param: { en: 'Port A single-rail peak (lab 13.8V DC)', ar: 'ذروة سكة المنفذ A المنفردة (مختبر 13.8V DC)' }, rated: '12W (5V/2.4A)', measured: '11.4W (5.01V / 2.27A)', note: { en: 'FNB58 into JUWEI — ~95% of per-port rating; 5V PowerIQ only', ar: 'FNB58 داخل JUWEI — نحو 95% من تصنيف المنفذ؛ PowerIQ 5V فقط' } },
            { param: { en: 'Port B single-rail peak (lab 13.8V DC)', ar: 'ذروة سكة المنفذ B المنفردة (مختبر 13.8V DC)' }, rated: '12W (5V/2.4A)', measured: '11.3W (5.00V / 2.26A)', note: { en: 'matched Port A within meter tolerance', ar: 'يطابق المنفذ A ضمن تسامح المقياس' } },
            { param: { en: 'Total envelope peak (electronic load)', ar: 'ذروة الظرف الإجمالي (حمل إلكتروني)' }, rated: '24W (5V/4.8A)', measured: '22.6W', note: { en: 'primary FNB58 sum under dual stress — a little under label', ar: 'مجموع FNB58 الأساسي تحت إجهاد مزدوج — أقل قليلًا من الملصق' } },
            { param: { en: 'Dual-share both ports loaded', ar: 'المشاركة المزدوجة — المنفذان محمّلان' }, rated: '24W shared', measured: { en: '21.8W total (~10.9W + ~10.9W)', ar: '21.8 واط إجمالي (~10.9 + ~10.9)' }, note: { en: 'stable 10 min — not 12W+12W concurrent marketing arithmetic', ar: 'مستقر 10 دقائق — ليس 12+12 تسويقيًا كمتزامن' } },
            { param: { en: 'Fast-charge negotiation (QC / PD / PPS)', ar: 'تفاوض الشحن السريع (QC / PD / PPS)' }, rated: { en: 'PowerIQ 5V only', ar: 'PowerIQ 5V فقط' }, measured: { en: 'no QC / no PD / no PPS — every rail stayed ~5V', ar: 'لا QC ولا PD ولا PPS — بقيت كل سكة ~5V' }, note: { en: 'A/B: A2741/A2732/JR-CCL05 C-legs DO negotiate PD', ar: 'A/B: سيقان C في A2741/A2732/JR-CCL05 **تتفاوض** PD' } },
            { param: { en: 'Galaxy A15 peak (USB-A→C, single port)', ar: 'ذروة Galaxy A15 (USB-A→C، منفذ واحد)' }, measured: '10.8W', note: { en: 'phone/cable limited below bench 11.4W JUWEI peak', ar: 'محدود بالهاتف/الكابل دون ذروة JUWEI 11.4 واط' } },
            { param: { en: 'Galaxy A15 0→50% (bench + car socket)', ar: 'Galaxy A15 من 0 إلى 50% (منضدة + مقبس سيارة)' }, measured: { en: '31 minutes', ar: '31 دقيقة' }, note: { en: '5V PowerIQ top-up speed — not PD fast charge', ar: 'سرعة تعبئة PowerIQ 5V — ليس شحن PD سريع' } },
            { param: { en: 'Galaxy A15 0→100% (in car)', ar: 'Galaxy A15 من 0 إلى 100% (في السيارة)' }, measured: { en: '2h 24m', ar: 'ساعتان و24 دقيقة' }, note: { en: 'fine for commute top-up; slow for a full empty pack', ar: 'جيد لتعبئة المشوار؛ بطيء لعبوة فارغة كاملة' } },
            { param: { en: 'iPhone 13 peak (USB-A→Lightning, single port)', ar: 'ذروة iPhone 13 (USB-A→Lightning، منفذ واحد)' }, measured: '7.6W (≈5.02V / 1.51A)', note: { en: 'Apple USB-A path — far below A2741 USB-C PD ~20W class', ar: 'مسار Apple USB-A — أبعد بكثير عن فئة A2741 USB-C PD ~20 واط' } },
            { param: { en: 'Galaxy A15 alongside iPhone 13 (dual)', ar: 'Galaxy A15 بجانب iPhone 13 (مزدوج)' }, measured: { en: '9.2W to A15 + 7.1W to iPhone ≈ 16.3W phone total', ar: '9.2 واط لـA15 + 7.1 واط لـiPhone ≈ 16.3 واط إجمالي هواتف' }, note: { en: 'phones draw less than JUWEI dual-share 21.8W envelope', ar: 'الهواتف تسحب أقل من ظرف JUWEI المزدوج 21.8 واط' } },
            { param: { en: '12.6V idle tolerance (lab PSU)', ar: 'تحمل تباطؤ 12.6V (مصدر مختبري)' }, measured: { en: 'dual-share held 21.2W; single-port 11.1W', ar: 'المشاركة المزدوجة حافظت على 21.2 واط؛ المنفذ الواحد 11.1 واط' }, note: { en: 'stop-start Cairo traffic relevance', ar: 'صلة بزحمة القاهرة ستوب-آند-جو' } },
            { param: { en: 'Low-voltage sag / cutoff (12V rail)', ar: 'هبوط الجهد / القطع (سكة 12V)' }, measured: { en: 'single-port ~10.8W at 12.0V; offline below ~11.3V DC', ar: 'منفذ واحد ~10.8 واط عند 12.0V؛ فصل تحت ~11.3V DC' }, note: { en: 'protection cutoff — weak battery / deep idle', ar: 'قطع حماية — بطارية ضعيفة / تباطؤ عميق' } },
            { param: { en: '24V input (microbus/truck)', ar: 'دخل 24V (ميكروباص/شاحنة)' }, rated: { en: '12V and 24V on label', ar: '12V و24V على الملصق' }, measured: { en: 'NOT TESTED this cycle', ar: '**لم يُختبَر** في هذه الدورة' }, note: { en: 'protocol §7.2 — publish silence over invented 24V data', ar: 'بروتوكول §7.2 — الصمت أقوى من اختراع بيانات 24V' } },
            { param: { en: 'Voltage ripple (scope)', ar: 'تموّج الجهد (راسم)' }, measured: { en: 'NOT measured — no oscilloscope this cycle', ar: '**لم يُقَس** — بلا راسم في هذه الدورة' }, note: { en: 'do not invent mV pk-pk (§7.2 N)', ar: 'لا نخترع mV ذروة-لذروة (§7.2 N)' } },
            { param: { en: 'Load-dump protection', ar: 'حماية Load Dump' }, measured: { en: 'SKIPPED — no ISO 7637 equipment', ar: 'تُخطّي — بلا معدّة ISO 7637' }, note: { en: '§7.2 O', ar: '§7.2 O' } },
            { param: { en: 'Body surface temp after 15 min dual load', ar: 'حرارة سطح الجسم بعد 15 دقيقة حمل مزدوج' }, measured: '47.1°C peak (GM320)', note: { en: 'lab ambient 28.0°C — warm; unplug in sun-parked cabin', ar: 'محيطة مختبر 28.0°م — دافئ؛ افصل في مقصورة مركونة بالشمس' } },
            { param: { en: 'Corolla cabin / dashboard context', ar: 'سياق مقصورة/تابلوه Corolla' }, measured: { en: 'cabin AC-on 38.1°C · dashboard sun-park 61.0°C', ar: 'مقصورة تكييف 38.1°م · تابلوه ركن شمسي 61.0°م' }, note: { en: 'Cairo summer heat — do not leave charger socketted in sun', ar: 'حرارة صيف القاهرة — لا تترك الشاحن في المقبس تحت الشمس' } },
            { param: { en: 'Over-current protection (single 5V port)', ar: 'حماية التيار الزائد (منفذ 5V واحد)' }, measured: { en: 'cut >2.8A in ~2.3s', ar: 'فصل >2.8A خلال ~2.3 ثانية' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '27g', measured: '28.4g', note: { en: 'within ±5% / scale tolerance', ar: 'ضمن ±5% / تسامح الميزان' } },
            { param: { en: 'Dimensions', ar: 'الأبعاد' }, measured: '65.2 × 28.3 × 28.1 mm', note: { en: 'Mitutoyo — CairoVolt-measured', ar: 'Mitutoyo — بقياس كايروفولت' } },
            { param: { en: 'Socket protrusion past Corolla 2018 bezel', ar: 'بروز المقبس بعد حافة Corolla 2018' }, measured: '~42 mm', note: { en: 'vs A2741 ~30 mm / JR-CCL05 ~52 mm — mid-size PowerDrive body', ar: 'مقابل A2741 ~30 ملم / JR-CCL05 ~52 ملم — جسم PowerDrive متوسط' } },
            { param: { en: 'LED indicator (night cabin)', ar: 'مؤشر LED (مقصورة ليلية)' }, measured: { en: 'blue LED clearly visible ~50 cm in unlit Corolla cabin', ar: 'LED زرقاء مرئية بوضوح من ~50 سم في مقصورة Corolla غير مضاءة' }, note: { en: 'subjective ergonomic check', ar: 'فحص إرغونومي ذاتي' } },
            { param: { en: 'A/B peak vs gold siblings (same protocol family)', ar: 'ذروة A/B مقابل الإخوة الذهبيين (نفس عائلة البروتوكول)' }, measured: { en: 'A2310011 11.4W A-peak / 21.8W dual · A2741 29.3W C · A2732 34.7W C+A · JR-CCL05 29.1W C-cable', ar: 'A2310011 ذروة A 11.4 واط / مزدوج 21.8 · A2741 29.3 C · A2732 34.7 C+A · JR-CCL05 29.1 كابل C' }, note: { en: 'establishes lower-watt USB-A tier — not 30W PD-C', ar: 'يثبت طبقة USB-A الأقل واطًا — ليست 30W PD-C' } },
            { param: { en: 'Recall status (verified 2026-07-24)', ar: 'حالة الاستدعاء (متحققة 2026-07-24)' }, measured: { en: 'NOT recalled', ar: 'غير مُستدعى' }, note: { en: 'anker.com/product-recalls + cpsc.gov; no car chargers in active Anker list', ar: 'anker.com/product-recalls + cpsc.gov؛ لا شواحن سيارات في قائمة انكر النشطة' } },
        ],
        verdict: {
            en: 'A2310011 delivered 11.4W per-port peak and 21.8W dual-share on documented 12V — honest 5V PowerIQ dual USB-A, not 30W PD-C. 24V, ripple, and load-dump not measured. Not recalled. Single unit.',
            ar: 'A2310011 سلّم ذروة 11.4 واط لكل منفذ و21.8 واط مشاركة مزدوجة على 12V موثَّق — PowerIQ 5V ثنائي USB-A بصدق، وليس 30W PD-C. 24V والتموّج وLoad Dump لم تُقَس. غير مُستدعى. وحدة واحدة.',
        },
        pros: [
            { en: 'Matched dual USB-A peaks (11.4W / 11.3W) and held 21.8W dual-share for 10 minutes at 13.8V lab — reliable shared top-up for two USB-A cables', ar: 'ذروات USB-A متطابقة (11.4 / 11.3 واط) وحافظ على 21.8 واط مشاركة مزدوجة 10 دقائق عند 13.8V مختبر — تعبئة مشتركة موثوقة لكابلَي USB-A' },
            { en: 'Held dual-share 21.2W at 12.6V lab idle — survives stop-start Ring Road sag better than cheap cut-out chargers', ar: 'حافظ على مشاركة مزدوجة 21.2 واط عند تباطؤ مختبري 12.6V — يصمد أمام هبوط الطريق الدائري أفضل من شواحن رخيصة تفصل' },
            { en: 'Compact 28.4g / ~42 mm protrusion with a night-visible blue LED — smaller reel than JR-CCL05, usable spare-socket fit on Corolla 2018', ar: 'مدمج 28.4 جرامًا / بروز ~42 ملم مع LED زرقاء مرئية ليلًا — أصغر من بكرة JR-CCL05، ملاءمة مقبس احتياطي قابلة للاستخدام على Corolla 2018' },
            { en: 'OCP cut >2.8A on a single 5V port in ~2.3s; body 47.1°C after 15-min dual load at 28.0°C ambient — warm but usable under protocol thermal note', ar: 'OCP فصل >2.8A على منفذ 5V واحد خلال ~2.3 ثانية؛ الجسم 47.1°م بعد حمل مزدوج 15 دقيقة عند محيطة 28.0°م — دافئ لكن قابل للاستخدام وفق ملاحظة الحرارة' },
            { en: 'NOT recalled — verified 2026-07-24 against anker.com/product-recalls and cpsc.gov; no car chargers in Anker’s active recall list', ar: 'غير مُستدعى — تحقّق في 2026-07-24 مقابل anker.com/product-recalls و cpsc.gov؛ لا شواحن سيارات في قائمة انكر النشطة' },
            { en: 'Honest A/B placement: when you only need two 5V USB-A ports, you avoid paying for A2741/A2732/JR-CCL05 PD hardware you will not use', ar: 'موضع A/B صادق: عندما تحتاج منفذي USB-A بجهد 5V فقط، تتجنب دفع عتاد PD في A2741/A2732/JR-CCL05 الذي لن تستخدمه' },
        ],
        limits: [
            { en: 'PowerIQ 5V only — no QC, no USB-C PD, no PPS; modern phones charge at basic speed (Galaxy A15 ~10.8W; iPhone 13 USB-A ~7.6W) vs A2741 29.3W / JR-CCL05 29.1W C-rail class', ar: 'PowerIQ 5V فقط — بلا QC ولا USB-C PD ولا PPS؛ الهواتف الحديثة تشحن بسرعة أساسية (Galaxy A15 ~10.8 واط؛ iPhone 13 USB-A ~7.6 واط) مقابل فئة A2741 29.3 / JR-CCL05 29.1 سكة C' },
            { en: 'USB-A ports only — no USB-C receptacle; every modern C-port phone needs an A-to-C cable in the glovebox', ar: 'منافذ USB-A فقط — بلا مقبس USB-C؛ كل هاتف حديث بمنفذ C يحتاج كابل A-to-C في درج القفازات' },
            { en: 'Dual-share is a shared ~24W envelope — measured 21.8W total (~10.9W each), not 12W+12W concurrent; A15 dropped to 9.2W beside an iPhone', ar: 'المشاركة المزدوجة ظرف مشترك ~24 واط — قِيس 21.8 واط إجمالي (~10.9 لكل)؛ هبط A15 إلى 9.2 واط بجانب iPhone' },
            { en: '22.6W measured total peak — a little below the 24W label; Galaxy A15 full charge took 2h 24m in the car', ar: 'ذروة إجمالية مقاسة 22.6 واط — أقل قليلًا من ملصق 24 واط؛ شحن Galaxy A15 الكامل استغرق ساعتين و24 دقيقة في السيارة' },
            { en: '24V microbus/truck input NOT tested this cycle — label claims 12V/24V; we only powered 12.6V/13.8V lab + Corolla 12V socket', ar: 'دخل 24V للميكروباص/الشاحنة **لم يُختبَر** في هذه الدورة — الملصق يدّعي 12V/24V؛ غذّينا فقط 12.6V/13.8V مختبرًا + مقبس Corolla 12V' },
            { en: 'Voltage ripple NOT measured (no scope); load-dump NOT tested — no invented mV or ISO claims', ar: 'تموّج الجهد **لم يُقَس** (بلا راسم)؛ Load Dump **لم يُختبَر** — بلا اختراع mV أو ادعاءات ISO' },
            { en: 'No AC-input efficiency figure published — DC-in car charger; PZEM wall efficiency does not apply', ar: 'لا رقم كفاءة دخل AC منشور — شاحن سيارة دخل DC؛ كفاءة جدار PZEM غير منطبقة' },
            { en: '~42 mm protrusion and bright blue LED — can crowd shallow cup-holders and distract some night drivers vs mini A2741’s ~30 mm / no ring LED', ar: 'بروز ~42 ملم وLED زرقاء ساطعة — قد تزاحم مساند أكواب ضحلة وتشتّت بعض سائقي الليل مقابل A2741 الميني ~30 ملم / بلا حلقة LED' },
            { en: 'Not a laptop car charger and not a PD phone fast charger — wrong tool if your primary device is a modern USB-C iPhone/Samsung flagship', ar: 'ليس شاحن لابتوب للسيارة وليس شاحن هاتف PD سريع — أداة خاطئة إن كان جهازك الأساسي iPhone/Samsung أعلام حديث بـUSB-C' },
            { en: 'Single retail unit tested 2026-07-24 (CV-CS-A2310011-001); production batches may vary', ar: 'وحدة تجزئة واحدة اختُبرت في 2026-07-24 (CV-CS-A2310011-001)؛ قد تختلف دفعات الإنتاج' },
        ],
    },
};
