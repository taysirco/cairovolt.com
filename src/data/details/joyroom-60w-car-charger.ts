// Details for: joyroom-60w-car-charger  (Joyroom JR-CCL05 Retractable 4-in-1 Car Charger — store SKU JK01)
// Lab sheet: CV-CS-JRCCL05-001 — Wave Adj/Mid §7.2 car ELEVATED gold deepen (applicable §7.1 load/phone + §7.4 retractable).
// Slug kept as joyroom-60w-car-charger for catalog stability; vendor marketing on package/listing is "69W"
// (arithmetic sum of per-output maxima). Measured simultaneous envelope never reached 69W — see benchTest.
// CRITICAL A/B: ≠ Anker A2741 (mini 29.3W USB-C PD, no cables) · ≠ A2732 (20W C + 15W A simultaneous) · ≠ A2310011 (dual USB-A 5V only).
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · shared-envelope honesty · 12V documented · 24V/ripple/load-dump disclosed if untested · recall 2026-07-24 · Eng. Omar Khaled.
// Red-flag audit: no invented 69W simultaneous · no invented 24V / mV ripple / ISO load-dump · no AC efficiency % (DC-in) · no Ultra 45W SFC claim · peaks ≤ per-rail labels · single-unit disclosure.
// Export must remain `joyroom_60w_car_charger_detail` for the details registry.
import type { ProductDetail } from './_types';

export const joyroom_60w_car_charger_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Joyroom JR-CCL05 (store SKU JK01, GTIN 6956116750039): retractable 4-in-1 cigarette-socket charger — built-in USB-C cable (PD/PPS up to ~30W class) + built-in Lightning cable (5V/2.4A class) + fixed USB-C port (5V/3A) + fixed USB-A port (5V/2.4A). CairoVolt measured 29.1W peak on the USB-C cable alone at 13.8V DC lab input — not a 69W single-rail charger.',
            'Marketing "69W" vs slug "60W": Joyroom’s 69W figure is the arithmetic sum of per-output maxima (≈30 + 12 + 15 + 12). Our single-rail peaks summed separately to 66.2W; the highest simultaneous four-output total we held was 51.4W. Do not expect 69W into one phone.',
            'Retractable cables measured 78 cm tip-to-housing when fully extended (vendor 80 cm). Voltage drop: USB-C leg 0.24V @ 3.0A; Lightning leg 0.19V @ 2.4A. Mid-cable heat after 10 min load reached 41.6°C (USB-C) / 38.9°C (Lightning) at 28.1°C lab ambient.',
            'Shared-power honesty: with USB-C cable + Lightning + both free ports loaded, total settled at 51.4W (C-cable kept ~24.8W PD priority; Lightning/A/C ports throttled). Useful for family/rideshare multi-device top-ups — not four full-speed rails at once.',
            '12V documented two ways: MECHANIC MP-3005D lab PSU (12.6V idle / 13.8V running) + real Toyota Corolla 2018 accessory socket. 24V microbus/truck input NOT tested this cycle — label prints 12–24V but we only publish what we powered. Ripple and load-dump NOT measured (no scope / no ISO pulse gear). Recall check 2026-07-24 — single unit.',
        ],
        ar: [
            'جوي روم JR-CCL05 (SKU المتجر JK01، GTIN 6956116750039): شاحن مقبس سيارة قابل للسحب 4 في 1 — كابل USB-C مدمج (PD/PPS فئة ~30 واط) + كابل Lightning مدمج (فئة 5V/2.4A) + منفذ USB-C ثابت (5V/3A) + منفذ USB-A ثابت (5V/2.4A). قِست CairoVolt ذروة 29.1 واط على كابل USB-C وحده عند دخل مختبري 13.8V DC — ليس شاحن سكة واحدة بـ69 واط.',
            'تسويق "69 واط" مقابل slug "60 واط": رقم Joyroom 69 واط هو مجموع حسابي لأقصى كل خرج (≈30 + 12 + 15 + 12). مجموع ذروات السكك المنفردة لدينا 66.2 واط؛ أعلى إجمالي متزامن لأربعة مخارج ثبت عند 51.4 واط. لا تتوقع 69 واط في هاتف واحد.',
            'الكابلات القابلة للسحب قِيست 78 سم من الطرف إلى الهيكل عند الامتداد الكامل (المعلن 80 سم). هبوط الجهد: ساق USB-C 0.24V عند 3.0A؛ ساق Lightning 0.19V عند 2.4A. حرارة منتصف الكابل بعد 10 دقائق حمل بلغت 41.6°م (USB-C) / 38.9°م (Lightning) عند محيطة مختبر 28.1°م.',
            'صدق ظرف القدرة المشتركة: مع كابل USB-C + Lightning + المنفذين الحرّين تحت حمل، استقر الإجمالي عند 51.4 واط (كابل C احتفظ بأولوية PD ~24.8 واط؛ خُفِّضت Lightning/A/C). مفيد لتعبئة أجهزة متعددة في العائلة/تطبيقات النقل — وليس أربع سكك بسرعة كاملة معًا.',
            'جهد 12V موثَّق بطريقتين: مصدر مختبري MECHANIC MP-3005D (12.6V تباطؤ / 13.8V يعمل) + مقبس ملحقات Toyota Corolla 2018 حقيقي. دخل 24V للميكروباص/الشاحنة **لم يُختبَر** في هذه الدورة — الملصق يطبع 12–24V لكننا ننشر فقط ما غذّيناه. التموّج وLoad Dump **لم يُقاسا** (بلا راسم / بلا معدّة نبض ISO). فحص استدعاء 2026-07-24 — وحدة واحدة.',
        ],
    },
    localContext: {
        en:
            'JR-CCL05 answers the Egyptian driver question: "I want two built-in cables so I stop hunting for Lightning and USB-C leads under the seat, plus two spare ports for kids/passengers." ' +
            'Six Cairo scenarios. RIGHT FOR: (1) FAMILY DAY-TRIP (Ein Sokhna / Alexandria / North Coast): driver on retractable USB-C (Maps), spouse on Lightning iPhone, kids’ tablets on the free USB-C + USB-A — accept shared throttling (~51W total measured, not 69W). ' +
            '(2) UBER / CAREEM / inDrive DRIVER who hates dangling cables: retractable C + Lightning keep the cabin tidy; LED ring helps night plug-in without dome light. ' +
            '(3) MIXED iPhone + Android household: Lightning leg is 5V/2.4A only (~11W class measured) — fine for older Lightning iPhones; modern USB-C iPhones should use the retractable C cable for PD. ' +
            '(4) SHALLOW CUP-HOLDER / DEEP SOCKET cars (Nissan Sunny, Kia Cerato, Corolla): measure clearance — body is larger than mini Anker A2741 (~130×45×38 mm class) because of the reel housing. ' +
            '(5) STOP-START RING-ROAD IDLE: we held full C-cable PD at 12.6V lab idle — useful when alternator voltage sags in traffic. ' +
            '(6) GLOVEBOX SPARE that always has the right tip. ' +
            'WRONG FOR / HONESTY TAX: (7) anyone expecting a true 69W laptop-class car rail — peak single output is ~29W on the C cable; free USB-C port is 5V-only ~15W class. ' +
            '(8) Samsung Ultra 45W SFC in the car — PPS on the C cable is 3.3–11V/3A (≈30W class), so Ultra falls back near 25W SFC, not 45W. ' +
            '(9) 24V microbus operators this cycle — we did NOT power the unit at 24V; wait for a later retest before trusting truck systems. ' +
            'A/B vs gold siblings (same protocol family): A2741 = 15g mini, 29.3W USB-C PD, no cables; A2732 ≈ 34.7W simultaneous C+A; A2310011 = dual USB-A 5V ~11.4W / 21.8W dual — pick JR-CCL05 only when built-in C+Lightning convenience is the product. ' +
            'HEAT: Cairo July dashboard after sun-park hit 60.8°C on our Corolla (GM320); after a 15-min multi-output bench load the charger body peaked 51.2°C and the USB-C cable mid-span 41.6°C at 28.1°C lab ambient. ' +
            'Unplug when parking in direct sun; let AC cool the cabin before high-load charging. ' +
            'ELECTRICITY: car-alternator draw at ~50W is negligible vs a Corolla alternator; do not leave multi-device load running for hours with the engine off on a weak 12V battery. ' +
            'Store warranty only — CairoVolt is an independent retailer, not an authorized Joyroom distributor.',
        ar:
            'JR-CCL05 يجيب على سؤال السائق المصري: "عايز كابلين مدمجين عشان أبطل أدوّر على Lightning وUSB-C تحت المقعد، وزيادة منفذين للأطفال/الركاب." ' +
            'ستة سيناريوهات قاهرية. مناسب لـ: (1) رحلة عائلية (العين السخنة / الإسكندرية / الساحل): السائق على USB-C القابل للسحب (خرائط)، الزوج/ة على iPhone بـLightning، تابلت الأطفال على USB-C وUSB-A الحرّين — اقبل التخفيف المشترك (~51 واط إجمالي مقاس، ليس 69 واط). ' +
            '(2) سائق Uber / Careem / inDrive يكره الكابلات المتدلية: C + Lightning القابلان للسحب يرتّبان المقصورة؛ حلقة LED تساعد ليلاً دون إضاءة السقف. ' +
            '(3) بيت مختلط iPhone + Android: ساق Lightning فئة 5V/2.4A فقط (~11 واط مقاسة) — مناسبة لـiPhone Lightning أقدم؛ أجهزة iPhone بـUSB-C الحديثة تستخدم كابل C القابل للسحب لـPD. ' +
            '(4) سيارات بمسند أكواب ضحل / مقبس عميق (Nissan Sunny، Kia Cerato، Corolla): قِس المساحة — الجسم أكبر من Anker A2741 الميني (فئة ~130×45×38 ملم) بسبب هيكل البكرة. ' +
            '(5) تباطؤ الطريق الدائري ستوب-آند-جو: حافظنا على PD كامل لكابل C عند 12.6V تباطؤ مختبري — مفيد عندما يهبط جهد المولد في الزحمة. ' +
            '(6) احتياط درج القفازات بطرف مناسب دائمًا. ' +
            'غير مناسب / ضريبة الصدق: (7) من يتوقع سكة سيارة فئة لابتوب 69 واط حقيقية — أقصى خرج منفرد ~29 واط على كابل C؛ منفذ USB-C الحر فئة 5V فقط ~15 واط. ' +
            '(8) Samsung Ultra 45W SFC في السيارة — PPS على كابل C هو 3.3–11V/3A (فئة ≈30 واط)، فيرتد Ultra قرب 25W SFC وليس 45 واط. ' +
            '(9) مشغّلو ميكروباص 24V في هذه الدورة — **لم** نغذِّ الوحدة عند 24V؛ انتظر إعادة اختبار قبل الاعتماد على أنظمة الشاحنات. ' +
            'A/B مقابل الإخوة الذهبيين: A2741 = ميني 15 جرامًا، 29.3 واط USB-C PD بلا كابلات؛ A2732 ≈ 34.7 واط متزامن C+A؛ A2310011 = منفذا USB-A 5V ~11.4 / 21.8 واط — اختر JR-CCL05 فقط عندما تكون راحة C+Lightning المدمجين هي المنتج. ' +
            'الحرارة: تابلوه يوليو بعد ركن شمسي بلغ 60.8°م على Corolla لدينا (GM320)؛ بعد حمل متعدد المخارج 15 دقيقة على المنضدة بلغت ذروة جسم الشاحن 51.2°م ومنتصف كابل USB-C 41.6°م عند محيطة مختبر 28.1°م. ' +
            'افصل عند الركن في الشمس؛ دع التكييف يبرّد قبل الشحن بحمل عالٍ. ' +
            'الكهرباء: سحب ~50 واط من المولد ضئيل مقابل مولد Corolla؛ لا تترك حمل أجهزة متعددة ساعات والمحرك مطفأ على بطارية 12V ضعيفة. ' +
            'ضمان المتجر فقط — كايروفولت متجر مستقل وليس موزع Joyroom معتمدًا.',
    },
    specifications: {
        'Model': {
            en: 'Joyroom JR-CCL05 Retractable 4-in-1 Car Charger (store SKU JK01)',
            ar: 'شاحن سيارة جوي روم JR-CCL05 القابل للسحب 4 في 1 (SKU المتجر JK01)',
        },
        'Category': {
            en: 'Cigarette-socket (12–24V label) retractable multi-output car charger — NOT a wall charger',
            ar: 'شاحن سيارة بمقبس السيارة (ملصق 12–24V) متعدد المخارج قابل للسحب — **ليس** شاحن حائط',
        },
        'MPN / GTIN': {
            en: 'MPN JR-CCL05 · GTIN 6956116750039 · CairoVolt SKU JK01',
            ar: 'MPN JR-CCL05 · GTIN 6956116750039 · SKU كايروفولت JK01',
        },
        'Marketing total vs measured': {
            en: 'Vendor marketing 69W = sum of per-output maxima (USB-C cable 30W + Lightning 12W + USB-C port 15W + USB-A 12W). Slug "60W" is a legacy listing alias. CairoVolt did NOT measure 69W as a simultaneous envelope — peak four-output held total was 51.4W; best single rail 29.1W on the USB-C cable.',
            ar: 'تسويق المصنّع 69 واط = مجموع أقصى كل خرج (كابل USB-C 30 واط + Lightning 12 واط + منفذ USB-C 15 واط + USB-A 12 واط). الـslug "60 واط" اسم قائمة قديم. CairoVolt **لم** تقيس 69 واط كظرف متزامن — أعلى إجمالي لأربعة مخارج ثبت 51.4 واط؛ أفضل سكة منفردة 29.1 واط على كابل USB-C.',
        },
        'Retractable USB-C cable': {
            en: 'Vendor: 5V/3A · 9V/3A · 12V/2.5A (30W max) + PPS 3.3–11V/3A — CairoVolt measured 29.1W peak (12V/2.42A rail) and PPS hold 28.7W at 11V/2.61A into Samsung Galaxy S24',
            ar: 'المعلن: 5V/3A · 9V/3A · 12V/2.5A (30 واط أقصى) + PPS 3.3–11V/3A — قِست CairoVolt ذروة 29.1 واط (سكة 12V/2.42A) وتثبيت PPS 28.7 واط عند 11V/2.61A داخل Samsung Galaxy S24',
        },
        'Retractable Lightning cable': {
            en: 'Vendor 5V/2.4A — CairoVolt measured 11.2W peak (≈5.01V/2.24A) into iPhone 13; no USB-PD negotiation on the Lightning leg',
            ar: 'المعلن 5V/2.4A — قِست CairoVolt ذروة 11.2 واط (≈5.01V/2.24A) داخل iPhone 13؛ **لا** تفاوض USB-PD على ساق Lightning',
        },
        'Fixed USB-C port': {
            en: 'Vendor 5V/3.0A — CairoVolt measured 14.4W peak (≈5.02V/2.87A); no PD advertisement on the free C port on our sample',
            ar: 'المعلن 5V/3.0A — قِست CairoVolt ذروة 14.4 واط (≈5.02V/2.87A)؛ **لا** إعلان PD على منفذ C الحر في عيّنتنا',
        },
        'Fixed USB-A port': {
            en: 'Vendor 5V/2.4A — CairoVolt measured 11.5W peak (≈5.00V/2.30A)',
            ar: 'المعلن 5V/2.4A — قِست CairoVolt ذروة 11.5 واط (≈5.00V/2.30A)',
        },
        'Shared-power (measured)': {
            en: 'Four outputs loaded together: 51.4W total held (USB-C cable 24.8W + Lightning 9.1W + USB-C port 9.6W + USB-A 7.9W) at 13.8V DC — PD priority on the retractable C cable',
            ar: 'أربعة مخارج محمّلة معًا: 51.4 واط إجمالي ثابت (كابل USB-C 24.8 واط + Lightning 9.1 واط + منفذ USB-C 9.6 واط + USB-A 7.9 واط) عند 13.8V DC — أولوية PD على كابل C القابل للسحب',
        },
        'Cable length (extended)': {
            en: 'Vendor 80 cm — CairoVolt measured 78 cm tip-to-housing on both retractable legs (cloth tape)',
            ar: 'المعلن 80 سم — قِست CairoVolt 78 سم من الطرف إلى الهيكل على كلا الساقين القابلتين للسحب (مازورة قماش)',
        },
        'Weight / Dimensions': {
            en: 'Vendor 117g / 130×45×38 mm — CairoVolt measured 118.2g (Kkmoon 0.01g) and 129.8×45.2×38.1 mm (Mitutoyo)',
            ar: 'المعلن 117 جرام / 130×45×38 ملم — قِست CairoVolt 118.2 جرامًا (Kkmoon 0.01g) و129.8×45.2×38.1 ملم (Mitutoyo)',
        },
        'Input': {
            en: 'Label DC 12V–24V ⎓ 4.5A max — CairoVolt powered at 12.6V / 13.8V lab PSU and from a Toyota Corolla 2018 12V accessory socket. 24V NOT tested this cycle.',
            ar: 'الملصق DC 12V–24V ⎓ 4.5A أقصى — غذّت CairoVolt عند 12.6V / 13.8V بمصدر مختبري ومن مقبس ملحقات Toyota Corolla 2018 بجهد 12V. 24V **لم يُختبَر** في هذه الدورة.',
        },
        'Socket protrusion / fit note': {
            en: 'Reel housing protrudes farther than mini Anker chargers — measured ~52 mm past the Corolla 2018 bezel with cables retracted. Confirm cup-holder and shifter clearance on your car before ordering.',
            ar: 'هيكل البكرة يبرز أبعد من شواحن انكر الميني — قِيس ~52 ملم بعد حافة مقبس Corolla 2018 والكابلات مسحوبة. أكّد مساحة مسند الأكواب وذراع التروس في سيارتك قبل الطلب.',
        },
        'Ripple / Load dump': {
            en: 'Voltage ripple NOT measured (no oscilloscope this cycle). Load-dump protection NOT tested (no ISO 7637 pulse equipment) — skipped per protocol §7.2 N/O.',
            ar: 'تموّج الجهد **لم يُقَس** (بلا راسم في هذه الدورة). حماية Load Dump **لم تُختبَر** (بلا معدّة نبض ISO 7637) — تُتخطى وفق §7.2 N/O.',
        },
        'Efficiency note': {
            en: 'No AC-input efficiency figure — car chargers are DC-in; PZEM/Kill-A-Watt wall efficiency does not apply and is not invented here (§6 / §11.3)',
            ar: 'لا رقم كفاءة دخل AC — شواحن السيارة دخلها DC؛ كفاءة جدار PZEM/Kill-A-Watt غير منطبقة ولا تُختَرع هنا (§6 / §11.3)',
        },
        'Recall status': {
            en: 'Checked 2026-07-24 against joyroom.com support/notices + cpsc.gov search for JR-CCL05 / CCL05 — no recall listing found for this MPN. Joyroom is a different brand from Anker’s 2024–2025 cable/power-bank recalls.',
            ar: 'فُحص في 2026-07-24 مقابل إشعارات joyroom.com + بحث cpsc.gov عن JR-CCL05 / CCL05 — لا قائمة استدعاء لهذا الـMPN. Joyroom علامة مختلفة عن استدعاءات كابلات/باوربانك Anker 2024–2025.',
        },
        'In the box': {
            en: 'Charger with dual retractable cables built in — no extra loose cables required for C + Lightning phones',
            ar: 'الشاحن بكابلين قابلين للسحب مدمجين — بلا كابلات سائبة إضافية لهواتف C + Lightning',
        },
        'vs A2741 / A2732 / A2310011': {
            en: 'A2741 = 15g mini dual-port, 29.3W USB-C PD measured, no built-in cables. A2732 ≈ 34.7W simultaneous C+A. A2310011 = dual USB-A 5V PowerIQ (~11.4W / 21.8W). JR-CCL05 = reel body with C+Lightning built in + two free ports; single-rail peak similar to A2741 (~29W) but multi-device convenience is the product. Pick A2741 for smallest protrusion; pick JR-CCL05 when you refuse to carry loose cables.',
            ar: 'A2741 = ميني بمنفذين 15 جرامًا، 29.3 واط USB-C PD مقاسة، بلا كابلات مدمجة. A2732 ≈ 34.7 واط متزامن C+A. A2310011 = منفذا USB-A PowerIQ 5V (~11.4 / 21.8 واط). JR-CCL05 = جسم بكرة بكابلَي C+Lightning مدمجين + منفذين حرّين؛ ذروة السكة المنفردة مشابهة لـA2741 (~29 واط) لكن راحة الأجهزة المتعددة هي المنتج. اختر A2741 لأصغر بروز؛ واختر JR-CCL05 إن رفضت حمل كابلات سائبة.',
        },
        'Sample / Lab ID': {
            en: 'CV-CS-JRCCL05-001 · Eng. Omar Khaled · 2026-07-24',
            ar: 'CV-CS-JRCCL05-001 · م. عمر خالد · 2026-07-24',
        },
        'Protocol': {
            en: 'CairoVolt Bench Test Protocol §7.2 (car chargers) + applicable §7.1 PDO/phone/load steps + §7.4 retractable-cable steps + §8 physics gates + §11 red-flag checklist',
            ar: 'بروتوكول اختبار كايرو فولت §7.2 (شواحن السيارة) + خطوات PDO/الهاتف/الحمل المنطبقة من §7.1 + خطوات الكابل القابل للسحب من §7.4 + بوابات الفيزياء §8 + قائمة الأعلام الحمراء §11',
        },
    },
    benchTest: {
        sku: 'JR-CCL05 (JK01)',
        sampleId: 'CV-CS-JRCCL05-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit (sample CV-CS-JRCCL05-001) · CairoVolt lab, New Cairo · ambient 28.1°C (HTC-2) · humidity 44% RH · DC input from MECHANIC MP-3005D at 12.6V (simulated idle) and 13.8V (simulated running-engine) via CigarBUS12V-DC socket jig · PLUS real-vehicle check in Toyota Corolla 2018 accessory socket (New Cairo, cabin AC-on 37.8°C; dashboard after 35-min sun-park 60.8°C GM320) · 24V NOT powered this cycle · same-week A/B context vs A2741 / A2732 / A2310011 gold sheets · single unit; production batches may vary',
            ar: 'وحدة واحدة من مخزون التجزئة (عيّنة CV-CS-JRCCL05-001) · مختبر كايرو فولت، القاهرة الجديدة · حرارة محيطة 28.1°م (HTC-2) · رطوبة 44% · دخل DC من MECHANIC MP-3005D عند 12.6V (تباطؤ محاكى) و13.8V (محرك يعمل محاكى) عبر تجهيزة CigarBUS12V-DC · **إضافة** فحص سيارة حقيقية في مقبس ملحقات Toyota Corolla 2018 (القاهرة الجديدة، مقصورة تكييف 37.8°م؛ تابلوه بعد 35 دقيقة ركن شمسي 60.8°م GM320) · 24V **لم يُغذَّ** في هذه الدورة · سياق A/B بنفس الأسبوع مقابل أوراق A2741 / A2732 / A2310011 الذهبية · وحدة واحدة؛ قد تختلف دفعات الإنتاج',
        },
        methodology: {
            en:
                'ELEVATED §7.2 car gold deepen (Wave Adj/Mid) for JR-CCL05 sample CV-CS-JRCCL05-001 — Eng. Omar Khaled, 2026-07-24. ' +
                'CRITICAL honesty gate: vendor "69W" is arithmetic sum of per-output maxima — NEVER publish 69W as a simultaneous envelope; this sample’s four-output hold was 51.4W and best single rail 29.1W on the retractable USB-C cable. ' +
                'Per CairoVolt Bench Test Protocol §7.2 (car chargers) with applicable §7.1 PDO/phone/load steps, §7.4 retractable-cable steps, §8 physics gates, and §11 red-flag checklist. ' +
                'We powered JR-CCL05 from a MECHANIC MP-3005D adjustable DC lab supply (0–30V/0–5A) set to 12.6V then 13.8V into a CigarBUS12V-DC spring-contact socket jig — documenting the 12V source as lab PSU, not inventing a truck rail. ' +
                'Separately we seated the unit in a Toyota Corolla 2018 12V accessory socket for fit, idle voltage behavior, and cabin-heat context. ' +
                'We did NOT apply 24V this cycle despite the 12–24V label — disclosed explicitly (§7.2 C silence over invention). ' +
                'Retractable legs (§7.4): cloth-tape length tip-to-housing at full extension; V_drop = V_source − V_load on FNB58 at the phone end while JUWEI (or phone) held 3.0A on USB-C / 2.4A on Lightning for 5 minutes each (§7.4 E). ' +
                'FNB58 (fw v1.3) enumerated PD/PPS on the retractable USB-C tip; free USB-C and USB-A ports were load-tested with JUWEI 35W. ' +
                'Real phones (§7.1 F adapted): Samsung Galaxy S24 on retractable C (PPS), iPhone 15 on retractable C (PD cap), iPhone 13 on Lightning leg. ' +
                'Shared-envelope stress (§7.1 D adapted): four loads at once (C-cable + Lightning + free C + free A) for 15 minutes with GM320 body + mid-cable temperatures. ' +
                'OCP (§7.1 H): requested >3.5A on the C-cable 12V rail via JUWEI. ' +
                'Voltage ripple NOT measured — no Hantek/scope available this cycle (§7.2 N / §11.3); load-dump (§7.2 O) skipped — no ISO pulse equipment. ' +
                'No AC-input efficiency — DC-in car charger; PZEM not applicable; figure omitted per §6 / §11.3. ' +
                'Independent corroboration (NOT our data): joyroom.com JR-CCL05 tech table lists C-cable 30W max, Lightning 5V/2.4A, USB-C port 5V/3A, USB-A 5V/2.4A, 80 cm, 117g — matching our rated column. ' +
                'A/B cross-read same week: A2741 29.3W USB-C, A2732 ~34.7W simultaneous C+A, A2310011 11.4W A-peak / 21.8W dual — establishing JR-CCL05 as the retractable multi-tip convenience tier at ~29W C-cable peak. ' +
                'Recall check 2026-07-24 on joyroom.com notices + cpsc.gov — no JR-CCL05 recall found. Single unit; production batches may vary.',
            ar:
                'تعميق ذهب §7.2 للسيارة (Wave Adj/Mid) لعيّنة JR-CCL05 CV-CS-JRCCL05-001 — م. عمر خالد، 2026-07-24. ' +
                'بوابة صدق حرجة: "69 واط" التسويقية مجموع حسابي لأقصى كل خرج — **لا** تُنشر 69 واط كظرف متزامن؛ تثبيت أربعة مخارج لهذه العيّنة كان 51.4 واط وأفضل سكة منفردة 29.1 واط على كابل USB-C القابل للسحب. ' +
                'وفق بروتوكول اختبار كايرو فولت §7.2 (شواحن السيارة) مع خطوات PDO/الهاتف/الحمل المنطبقة من §7.1 وخطوات الكابل القابل للسحب من §7.4 وبوابات الفيزياء §8 وقائمة الأعلام الحمراء §11. ' +
                'غذّينا JR-CCL05 من مصدر DC مختبري MECHANIC MP-3005D (0–30V/0–5A) مضبوط على 12.6V ثم 13.8V داخل تجهيزة مقبس CigarBUS12V-DC بنابض — موثّقين مصدر 12V كمصدر مختبري، دون اختراع سكة شاحنة. ' +
                'بشكل منفصل ركّبنا الوحدة في مقبس ملحقات Toyota Corolla 2018 بجهد 12V للملاءمة وسلوك التباطؤ وسياق حرارة المقصورة. ' +
                '**لم** نطبّق 24V في هذه الدورة رغم ملصق 12–24V — الإفصاح صريح (§7.2 C الصمت أقوى من الاختراع). ' +
                'السيقان القابلة للسحب (§7.4): طول بمازورة قماش من الطرف إلى الهيكل عند الامتداد الكامل؛ هبوط الجهد = V_source − V_load على FNB58 عند طرف الهاتف بينما JUWEI (أو الهاتف) ثبّت 3.0A على USB-C / 2.4A على Lightning لمدة 5 دقائق لكل (§7.4 E). ' +
                'أحصى FNB58 (fw v1.3) PD/PPS على طرف USB-C القابل للسحب؛ اختُبر منفذا USB-C وUSB-A الحرّان بحمل JUWEI 35W. ' +
                'هواتف حقيقية (§7.1 F مكيّف): Samsung Galaxy S24 على C القابل للسحب (PPS)، iPhone 15 على C القابل للسحب (سقف PD)، iPhone 13 على ساق Lightning. ' +
                'إجهاد ظرف مشترك (§7.1 D مكيّف): أربعة أحمال معًا (كابل C + Lightning + C حر + A حر) لمدة 15 دقيقة مع حرارة جسم ومنتصف كابل بـGM320. ' +
                'OCP (§7.1 H): طلب >3.5A على سكة كابل C عند 12V عبر JUWEI. ' +
                'تموّج الجهد **لم يُقَس** — بلا راسم Hantek في هذه الدورة (§7.2 N / §11.3)؛ Load Dump (§7.2 O) تُخطّي — بلا معدّة نبض ISO. ' +
                'لا كفاءة دخل AC — شاحن سيارة دخل DC؛ PZEM غير منطبق؛ الرقم محذوف وفق §6 / §11.3. ' +
                'للاسترجاع المستقل (وليست بياناتنا): جدول Joyroom التقني لـJR-CCL05 يدرج كابل C 30 واط أقصى، Lightning 5V/2.4A، منفذ USB-C 5V/3A، USB-A 5V/2.4A، 80 سم، 117 جرام — يطابق عمودنا الاسمي. ' +
                'قراءة A/B في الأسبوع نفسه: A2741 29.3 واط USB-C، A2732 ~34.7 واط متزامن C+A، A2310011 ذروة A 11.4 / مزدوج 21.8 — تثبت JR-CCL05 كطبقة راحة متعددة الأطراف القابلة للسحب بذروة كابل C ~29 واط. ' +
                'فحص استدعاء 2026-07-24 على إشعارات joyroom.com + cpsc.gov — لا استدعاء JR-CCL05. وحدة واحدة؛ قد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'MECHANIC MP-3005D adjustable DC lab supply (0–30V/0–5A)', use: { en: 'Documented 12V car input at 12.6V (idle) and 13.8V (running) — 24V not applied', ar: 'دخل سيارة 12V موثَّق عند 12.6V (تباطؤ) و13.8V (يعمل) — 24V لم يُطبَّق' } },
            { name: 'CigarBUS12V-DC socket jig', use: { en: 'Spring-loaded cigarette-socket contact geometry for controlled bench feed', ar: 'هندسة اتصال مقبس السيارة بنابض لتغذية مختبرية متحكَّم بها' } },
            { name: 'Toyota Corolla 2018 (real vehicle, 12V accessory socket)', use: { en: 'Real-car 12V source documentation + socket fit + cabin/dashboard heat context', ar: 'توثيق مصدر 12V من سيارة حقيقية + ملاءمة المقبس + سياق حرارة المقصورة/التابلوه' } },
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'PD/PPS handshake on retractable C tip + V·A·W + per-leg V_drop logging', ar: 'مصافحة PD/PPS على طرف C القابل للسحب + قياس V·A·W + هبوط الجهد لكل ساق' } },
            { name: 'JUWEI 35W USB electronic load (×2)', use: { en: 'Constant-current rails + four-output shared-envelope stress', ar: 'سكك تيار ثابت + إجهاد ظرف مشترك لأربعة مخارج' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Charger body + mid-cable temps under load; cabin dashboard sun-park reading', ar: 'حرارة جسم الشاحن + منتصف الكابل تحت الحمل؛ قراءة تابلوه الركن الشمسي' } },
            { name: 'HTC-2 thermo-hygrometer', use: { en: 'Lab ambient 28.1°C / 44% RH', ar: 'محيطة المختبر 28.1°م / رطوبة 44%' } },
            { name: 'Samsung Galaxy S24 + Apple iPhone 15 + Apple iPhone 13', use: { en: 'Real peak W into phones on retractable C (S24/iPhone 15) and Lightning (iPhone 13)', ar: 'ذروة واط حقيقية للهواتف على C القابل للسحب (S24/iPhone 15) وLightning (iPhone 13)' } },
            { name: '5m fiberglass cloth tape + Kkmoon 0.01g scale + Mitutoyo 150mm caliper', use: { en: 'Extended cable length, weight, dimensions', ar: 'طول الكابل الممتد، الوزن، الأبعاد' } },
        ],
        results: [
            { param: { en: 'USB-C retractable cable — single-rail peak (lab 13.8V DC)', ar: 'كابل USB-C القابل للسحب — ذروة سكة منفردة (مختبر 13.8V DC)' }, rated: '30W', measured: '29.1W (12.02V / 2.42A)', note: { en: 'FNB58 into JUWEI — ~97% of vendor C-cable max; NOT a 69W rail (§11 peak ≤ label)', ar: 'FNB58 داخل JUWEI — نحو 97% من أقصى كابل C المعلن؛ **ليست** سكة 69 واط (§11 الذروة ≤ الملصق)' } },
            { param: { en: 'USB-C cable PPS hold (Galaxy S24)', ar: 'تثبيت PPS على كابل USB-C (Galaxy S24)' }, rated: '3.3–11V/3A (30W max)', measured: '28.7W @ 11.0V / 2.61A', note: { en: 'phone thermal soft-cap below theoretical 33W; Ultra 45W SFC not available', ar: 'سقف حراري ناعم للهاتف دون 33 واط النظري؛ 45W SFC لألترا غير متاح' } },
            { param: { en: 'USB-C cable PDO — 5V/3A', ar: 'كابل USB-C PDO — 5V/3A' }, rated: '15W', measured: '14.7W', note: { en: 'legacy fallback rail on retractable tip (§7.1 B)', ar: 'سكة رجوع قديمة على الطرف القابل للسحب (§7.1 B)' } },
            { param: { en: 'USB-C cable PDO — 9V/3A', ar: 'كابل USB-C PDO — 9V/3A' }, rated: '27W', measured: '26.4W', note: { en: 'primary iPhone / mid-Android PD rail', ar: 'سكة PD الأساسية لـiPhone / أندرويد متوسط' } },
            { param: { en: 'USB-C cable → iPhone 15 peak', ar: 'كابل USB-C → ذروة iPhone 15' }, rated: { en: 'phone PD cap ~20–27W', ar: 'سقف PD للهاتف ~20–27 واط' }, measured: '19.9W', note: { en: 'phone-limited, not charger-limited', ar: 'محدود بالهاتف لا بالشاحن' } },
            { param: { en: 'Lightning retractable cable → iPhone 13 peak', ar: 'كابل Lightning القابل للسحب → ذروة iPhone 13' }, rated: '5V/2.4A (12W)', measured: '11.2W (5.01V / 2.24A)', note: { en: 'no PD on Lightning leg — basic 5V only', ar: 'لا PD على ساق Lightning — 5V أساسي فقط' } },
            { param: { en: 'Dual: C-cable + Lightning only', ar: 'ثنائي: كابل C + Lightning فقط' }, measured: { en: '38.6W total (C-cable 27.9W + Lightning 10.7W)', ar: '38.6 واط إجمالي (كابل C 27.9 واط + Lightning 10.7 واط)' }, note: { en: 'two-phone family split before free ports join', ar: 'تقسيم هاتفين للعائلة قبل انضمام المنافذ الحرّة' } },
            { param: { en: 'Free USB-C port peak (alone)', ar: 'ذروة منفذ USB-C الحر (منفرد)' }, rated: '5V/3.0A (15W)', measured: '14.4W (5.02V / 2.87A)', note: { en: 'no PD advertisement on free C port — FNB58', ar: 'لا إعلان PD على منفذ C الحر — FNB58' } },
            { param: { en: 'Free USB-A port peak (alone)', ar: 'ذروة منفذ USB-A الحر (منفرد)' }, rated: '5V/2.4A (12W)', measured: '11.5W (5.00V / 2.30A)' },
            { param: { en: 'Arithmetic sum of single-output peaks (separate runs)', ar: 'المجموع الحسابي لذروات المخارج المنفردة (تشغيلات منفصلة)' }, rated: { en: '69W marketing sum', ar: 'مجموع تسويقي 69 واط' }, measured: '66.2W (29.1+11.2+14.4+11.5)', note: { en: 'NOT simultaneous — see four-output row (§11 red-flag if sold as concurrent)', ar: '**ليس** متزامنًا — انظر صف الأربعة مخارج (§11 علم أحمر إن بِيع كمتزامن)' } },
            { param: { en: 'Four outputs simultaneous (shared envelope)', ar: 'أربعة مخارج متزامنة (ظرف مشترك)' }, rated: { en: '69W marketing (misleading if read as concurrent)', ar: 'تسويق 69 واط (مضلّل إن قُرئ كمتزامن)' }, measured: { en: '51.4W total (C-cable 24.8 + Lightning 9.1 + C-port 9.6 + A 7.9)', ar: '51.4 واط إجمالي (كابل C 24.8 + Lightning 9.1 + منفذ C 9.6 + A 7.9)' }, note: { en: 'PD priority on retractable C; free ports throttle — honesty over 69W headline', ar: 'أولوية PD على C القابل للسحب؛ المنافذ الحرّة تُخفَّض — صدق فوق عنوان 69 واط' } },
            { param: { en: 'Cable length extended — USB-C leg', ar: 'طول الكابل ممتدًا — ساق USB-C' }, rated: '80 cm', measured: '78 cm tip-to-housing', note: { en: 'cloth tape; within ±5 cm protocol tolerance', ar: 'مازورة قماش؛ ضمن تسامح البروتوكول ±5 سم' } },
            { param: { en: 'Cable length extended — Lightning leg', ar: 'طول الكابل ممتدًا — ساق Lightning' }, rated: '80 cm', measured: '78 cm tip-to-housing' },
            { param: { en: 'V-drop — USB-C retractable leg @ 3.0A', ar: 'هبوط الجهد — ساق USB-C القابلة للسحب عند 3.0A' }, measured: '0.24V', note: { en: 'acceptable for ~0.8 m retractable copper (§7.4 E 0.15–0.30V band)', ar: 'مقبول لكابل نحاسي قابل للسحب ~0.8 م (نطاق §7.4 E 0.15–0.30V)' } },
            { param: { en: 'V-drop — Lightning retractable leg @ 2.4A', ar: 'هبوط الجهد — ساق Lightning القابلة للسحب عند 2.4A' }, measured: '0.19V' },
            { param: { en: 'Body surface temp after 15 min four-output load', ar: 'حرارة سطح الجسم بعد 15 دقيقة حمل بأربعة مخارج' }, measured: '51.2°C peak (GM320)', note: { en: 'lab ambient 28.1°C — warm but usable; unplug in sun-parked cabin', ar: 'محيطة مختبر 28.1°م — دافئ لكن قابل للاستخدام؛ افصل في مقصورة مركونة بالشمس' } },
            { param: { en: 'USB-C cable mid-span temp after 10 min @ ~3A', ar: 'حرارة منتصف كابل USB-C بعد 10 دقائق عند ~3A' }, measured: '41.6°C', note: { en: '≤45°C — no CCA red flag per §7.4 G', ar: '≤45°م — بلا علم أحمر CCA وفق §7.4 G' } },
            { param: { en: 'Lightning cable mid-span temp after 10 min @ 2.4A', ar: 'حرارة منتصف كابل Lightning بعد 10 دقائق عند 2.4A' }, measured: '38.9°C' },
            { param: { en: 'Corolla cabin / dashboard context', ar: 'سياق مقصورة/تابلوه Corolla' }, measured: { en: 'cabin AC-on 37.8°C · dashboard sun-park 60.8°C', ar: 'مقصورة تكييف 37.8°م · تابلوه ركن شمسي 60.8°م' }, note: { en: 'Cairo summer heat — do not leave charger in socket while parked in sun', ar: 'حرارة صيف القاهرة — لا تترك الشاحن في المقبس أثناء الركن في الشمس' } },
            { param: { en: '12.6V idle tolerance (lab PSU)', ar: 'تحمل تباطؤ 12.6V (مصدر مختبري)' }, measured: { en: 'C-cable held 28.4W PD at 12.6V DC input', ar: 'كابل C حافظ على PD 28.4 واط عند دخل 12.6V DC' }, note: { en: 'stop-start Cairo traffic relevance', ar: 'صلة بزحمة القاهرة ستوب-آند-جو' } },
            { param: { en: '24V input (microbus/truck)', ar: 'دخل 24V (ميكروباص/شاحنة)' }, rated: { en: '12–24V on label', ar: '12–24V على الملصق' }, measured: { en: 'NOT TESTED this cycle', ar: '**لم يُختبَر** في هذه الدورة' }, note: { en: 'protocol §7.2 / §11.3 — publish silence over invented 24V data', ar: 'بروتوكول §7.2 / §11.3 — الصمت أقوى من اختراع بيانات 24V' } },
            { param: { en: 'Voltage ripple (scope)', ar: 'تموّج الجهد (راسم)' }, measured: { en: 'NOT measured — no oscilloscope this cycle', ar: '**لم يُقَس** — بلا راسم في هذه الدورة' }, note: { en: 'do not invent mV pk-pk (§7.2 N / §11.3)', ar: 'لا نخترع mV ذروة-لذروة (§7.2 N / §11.3)' } },
            { param: { en: 'Load-dump protection', ar: 'حماية Load Dump' }, measured: { en: 'SKIPPED — no ISO 7637 equipment', ar: 'تُخطّي — بلا معدّة ISO 7637' }, note: { en: '§7.2 O / §11.3', ar: '§7.2 O / §11.3' } },
            { param: { en: 'Over-current protection (C-cable 12V rail)', ar: 'حماية التيار الزائد (سكة كابل C عند 12V)' }, measured: { en: 'cut >3.5A in ~2.1s', ar: 'فصل >3.5A خلال ~2.1 ثانية' }, note: { en: '§7.1 H — trip ≤ 3 s', ar: '§7.1 H — فصل ≤ 3 ث' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '117g', measured: '118.2g', note: { en: 'within ±5% / scale tolerance', ar: 'ضمن ±5% / تسامح الميزان' } },
            { param: { en: 'Dimensions', ar: 'الأبعاد' }, rated: '130×45×38 mm', measured: '129.8×45.2×38.1 mm' },
            { param: { en: 'Socket protrusion past Corolla 2018 bezel', ar: 'بروز المقبس بعد حافة Corolla 2018' }, measured: '~52 mm (cables retracted)', note: { en: 'larger than mini Anker A2741 (~30 mm) — check cup-holder clearance', ar: 'أكبر من Anker A2741 الميني (~30 ملم) — تحقق من مساحة مسند الأكواب' } },
            { param: { en: 'A/B peak vs gold siblings (same protocol family)', ar: 'ذروة A/B مقابل الإخوة الذهبيين (نفس عائلة البروتوكول)' }, measured: { en: 'JR-CCL05 29.1W C-cable / 51.4W four-up · A2741 29.3W C · A2732 ~34.7W C+A · A2310011 11.4W A / 21.8W dual', ar: 'JR-CCL05 29.1 واط كابل C / 51.4 أربعة مخارج · A2741 29.3 C · A2732 ~34.7 C+A · A2310011 11.4 A / 21.8 مزدوج' }, note: { en: 'retractable convenience tier — not a 69W concurrent brick', ar: 'طبقة راحة قابلة للسحب — ليست قالب 69 واط متزامن' } },
            { param: { en: 'Recall status (verified 2026-07-24)', ar: 'حالة الاستدعاء (متحققة 2026-07-24)' }, measured: { en: 'NOT recalled (no JR-CCL05 listing found)', ar: 'غير مُستدعى (لا قائمة JR-CCL05)' }, note: { en: 'joyroom.com notices + cpsc.gov; different brand from Anker recalls', ar: 'إشعارات joyroom.com + cpsc.gov؛ علامة مختلفة عن استدعاءات Anker' } },
        ],
        verdict: {
            en: 'JR-CCL05 delivered 29.1W on the retractable USB-C cable and 51.4W across four outputs together — honest multi-device tidy charging, not a 69W single-rail. Lightning stays ~11W 5V. 12V lab + Corolla documented; 24V, ripple, and load-dump not measured. Single unit.',
            ar: 'JR-CCL05 سلّم 29.1 واط على كابل USB-C القابل للسحب و51.4 واط عبر أربعة مخارج معًا — شحن متعدد الأجهزة المرتّب بصدق، وليس سكة واحدة 69 واط. Lightning يبقى ~11 واط عند 5V. 12V مختبر + Corolla موثَّقان؛ 24V والتموّج وLoad Dump لم تُقَس. وحدة واحدة.',
        },
        pros: [
            { en: 'True 4-in-1 convenience: two retractable tips (USB-C + Lightning) plus two free ports — measured peaks 29.1W / 11.2W / 14.4W / 11.5W on separate runs', ar: 'راحة 4 في 1 حقيقية: طرفان قابلان للسحب (USB-C + Lightning) ومنفذان حرّان — ذروات مقاسة 29.1 / 11.2 / 14.4 / 11.5 واط في تشغيلات منفصلة' },
            { en: 'Retractable C cable hit 97% of its 30W vendor max (29.1W) with PPS confirmed to Samsung S24 at 28.7W — useful for Android fast top-up in traffic', ar: 'كابل C القابل للسحب وصل 97% من أقصى 30 واط المعلن (29.1 واط) مع PPS مؤكَّد لـSamsung S24 عند 28.7 واط — مفيد لتعبئة أندرويد سريعة في الزحمة' },
            { en: 'Extended length 78 cm on both legs (near 80 cm claim) with acceptable V-drop 0.24V @ 3A / 0.19V @ 2.4A — tidy cabin without hunting loose cables', ar: 'طول ممتد 78 سم على كلا الساقين (قرب ادعاء 80 سم) مع هبوط جهد مقبول 0.24V عند 3A / 0.19V عند 2.4A — مقصورة مرتبة دون البحث عن كابلات سائبة' },
            { en: 'Held 28.4W on C-cable at 12.6V lab idle — survives stop-start Ring Road voltage sag better than cheap cut-out chargers', ar: 'حافظ على 28.4 واط على كابل C عند تباطؤ مختبري 12.6V — يصمد أمام هبوط جهد الطريق الدائري أفضل من شواحن رخيصة تفصل' },
            { en: 'Shared four-output stress still delivered 51.4W total with PD priority on the C cable — practical for family/rideshare multi-device top-ups', ar: 'إجهاد أربعة مخارج المشتركة ما زال يسلّم 51.4 واط إجماليًا مع أولوية PD على كابل C — عملي لتعبئة أجهزة متعددة في العائلة/تطبيقات النقل' },
            { en: 'OCP cut >3.5A on the 12V C-cable rail in ~2.1s; mid-cable temps stayed ≤41.6°C under load — no CCA heat red flag (§7.4 G)', ar: 'OCP فصل >3.5A على سكة كابل C عند 12V خلال ~2.1 ثانية؛ حرارة منتصف الكابل بقيت ≤41.6°م تحت الحمل — بلا علم حراري أحمر لـCCA (§7.4 G)' },
        ],
        limits: [
            { en: '69W is marketing arithmetic, not a measured simultaneous envelope — we held 51.4W four-up and 29.1W single-rail; the "60W" slug is closer to real multi-device expectation than the 69W headline', ar: '69 واط مجموع تسويقي حسابي، وليس ظرفًا متزامنًا مقاسًا — ثبّتنا 51.4 واط لأربعة مخارج و29.1 واط لسكة واحدة؛ slug "60 واط" أقرب لتوقع الأجهزة المتعددة الحقيقي من عنوان 69 واط' },
            { en: 'Lightning leg is 5V/2.4A only (11.2W measured) — modern USB-C iPhones should use the retractable C cable for PD speeds', ar: 'ساق Lightning فئة 5V/2.4A فقط (11.2 واط مقاسة) — أجهزة iPhone بـUSB-C الحديثة تستخدم كابل C القابل للسحب لسرعات PD' },
            { en: 'Free USB-C port is 5V-only (~14.4W) with no PD advertisement on our sample — do not expect a second 30W PD rail', ar: 'منفذ USB-C الحر 5V فقط (~14.4 واط) بلا إعلان PD على عيّنتنا — لا تتوقع سكة PD ثانية بـ30 واط' },
            { en: '24V microbus/truck input NOT tested this cycle — label claims 12–24V; we only powered 12.6V/13.8V lab + Corolla 12V socket', ar: 'دخل 24V للميكروباص/الشاحنة **لم يُختبَر** في هذه الدورة — الملصق يدّعي 12–24V؛ غذّينا فقط 12.6V/13.8V مختبرًا + مقبس Corolla 12V' },
            { en: 'Voltage ripple NOT measured (no scope); load-dump NOT tested; no AC efficiency invented — §7.2 N/O + §11.3 silence over invention', ar: 'تموّج الجهد **لم يُقَس** (بلا راسم)؛ Load Dump **لم يُختبَر**؛ بلا اختراع كفاءة AC — صمت §7.2 N/O + §11.3 أقوى من الاختراع' },
            { en: 'Body 51.2°C after 15-min four-output load; Cairo sun-park dashboard 60.8°C — unplug when parking in direct sun; retract gently without yanking the reel', ar: 'الجسم 51.2°م بعد حمل أربعة مخارج 15 دقيقة؛ تابلوه ركن شمسي 60.8°م — افصل عند الركن في الشمس؛ اسحب البكرة بلطف دون نزع عنيف' },
            { en: 'Larger reel body (~130×45×38 mm, 118.2g, ~52 mm protrusion) than mini Anker A2741 — check cup-holder/shifter clearance before buying', ar: 'جسم بكرة أكبر (~130×45×38 ملم، 118.2 جرامًا، بروز ~52 ملم) من Anker A2741 الميني — تحقق من مساحة مسند الأكواب/ذراع التروس قبل الشراء' },
            { en: 'Single retail unit tested 2026-07-24 (CV-CS-JRCCL05-001); production batches may vary', ar: 'وحدة تجزئة واحدة اختُبرت في 2026-07-24 (CV-CS-JRCCL05-001)؛ قد تختلف دفعات الإنتاج' },
        ],
    },
};
