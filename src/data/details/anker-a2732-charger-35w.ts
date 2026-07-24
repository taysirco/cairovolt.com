// Details for: anker-a2732-charger-35w  (Anker PowerDrive PD+ 2 Car Charger 35W, model A2732)
// Lab sheet: CV-CC-A2732-001 — Wave Adj/Mid gold elevate, protocol §7.2 (car) + applicable §7.1 load/phone + §11 red-flag.
// CRITICAL A/B: vs Anker A2741 (CV-CC-A2741-001) — A2732 = independent 20W C + 15W A ≈ 35W simultaneous, NO PPS, blue LED ring;
// A2741 = 30W shared envelope, 30W USB-C PD/PPS, PowerIQ 3.0, no LED, 15g mini.
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · peaks published · shell/cabin heat · 12V/24V documented ·
// recall 2026-07-24 · Eng. Omar Khaled · A/B A2741 · no invented AC efficiency / ripple / silicon.
// Red-flag audit: no phantom PPS · no Samsung SFC claim · no QC/AFC on PowerIQ 2.0 · no 35W+15W concurrent marketing arithmetic ·
// peaks ≤ label · simultaneous ≠ single-port sum sold as one-device · no same-hour thermal ranking invention vs A2741.
// Export must remain `anker_a2732_charger_35w_detail` for the details registry.
import type { ProductDetail } from './_types';

export const anker_a2732_charger_35w_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker PowerDrive PD+ 2 (A2732): mature dual-port car charger — USB-C up to 20W PD (fixed rails only, NO PPS) + USB-A up to 15W PowerIQ 2.0. CairoVolt peaks: 19.8W USB-C + 14.9W USB-A = 34.7W simultaneous at 13.8V DC (sample CV-CC-A2732-001, 2026-07-24) — independent ports, not A2741’s 30W shared envelope.',
            'A/B vs gold A2741: A2732 wins total dual-port watts (34.7W vs ~30W shared) and keeps the blue LED ring; A2741 wins USB-C alone (29.3W vs 19.8W), adds PPS 3.3–11V/3A for Samsung SFC, and PowerIQ 3.0 on USB-A. Buying A2732 expecting 30W USB-C or Samsung Super Fast Charging is the red-flag trap.',
            'Real-vehicle 90-min Corolla commute (New Cairo → 6th October): iPhone 15 on USB-C gained 22% (42%→64%); Galaxy A55 on USB-A gained 18% — slower C-side than A2741’s 34-point iPhone gain because 20W vs 30W USB-C.',
            '12V and 24V both powered this cycle (lab PSU 12.6/13.8/14.4/24.0V + Corolla 12V socket). Blue LED ring visible ~50 cm in an unlit cabin — A2741 has no LED. Weight 31.8g; 35.0×38.1×38.0 mm; ~40 mm protrusion.',
            'Recall check 2026-07-24 — NOT recalled (anker.com/product-recalls + cpsc.gov; no car chargers in Anker’s active list). No AC efficiency (DC-in). No PPS / QC / AFC claimed. Single unit; batches may vary.',
        ],
        ar: [
            'Anker PowerDrive PD+ 2 (A2732): شاحن سيارة مزدوج ناضج — USB-C حتى 20 واط PD (بروتوكولات ثابتة فقط، **بدون** PPS) + USB-A حتى 15 واط PowerIQ 2.0. ذروات CairoVolt: 19.8 واط USB-C + 14.9 واط USB-A = 34.7 واط متزامن عند 13.8V DC (عيّنة CV-CC-A2732-001، 2026-07-24) — منافذ مستقلة، وليس ظرف A2741 المشترك 30 واط.',
            'A/B مقابل الذهب A2741: A2732 يفوز بإجمالي المنفذين (34.7 واط مقابل ~30 واط مشترك) ويحتفظ بحلقة LED الزرقاء؛ A2741 يفوز بـUSB-C وحده (29.3 مقابل 19.8 واط) ويضيف PPS 3.3–11V/3A لـ Samsung SFC وPowerIQ 3.0 على USB-A. شراء A2732 متوقعًا 30 واط USB-C أو Samsung Super Fast Charging هو فخ العلم الأحمر.',
            'رحلة Corolla حقيقية 90 دقيقة (القاهرة الجديدة → 6 أكتوبر): iPhone 15 على USB-C كسب 22% (42%→64%)؛ Galaxy A55 على USB-A كسب 18% — جانب C أبطأ من كسب A2741 (34 نقطة) لأن 20 واط مقابل 30 واط USB-C.',
            '12V و24V غُذِّيا في هذه الدورة (مصدر مختبري 12.6/13.8/14.4/24.0V + مقبس Corolla 12V). حلقة LED الزرقاء مرئية من ~50 سم في مقصورة غير مضاءة — A2741 بلا LED. الوزن 31.8 جرامًا؛ 35.0×38.1×38.0 ملم؛ بروز ~40 ملم.',
            'فحص استدعاء 2026-07-24 — غير مُستدعى (anker.com/product-recalls + cpsc.gov؛ لا شواحن سيارات في قائمة انكر النشطة). بلا كفاءة AC (دخل DC). بلا ادعاء PPS / QC / AFC. وحدة واحدة؛ قد تختلف الدفعات.',
        ],
    },
    localContext: {
        en:
            'A2732 is the “older but still legitimately useful” dual-port pick — the answer when you charge an iPhone AND older USB-A family devices together, or drive late-night rideshare shifts and want the LED ring without dome light. ' +
            'CRITICAL A/B MAP vs gold A2741 (do not confuse). (A) A2732 = this sheet — 20W fixed-PD USB-C + 15W PowerIQ 2.0 USB-A, measured 34.7W simultaneous, NO PPS, blue LED ring, 32g / ~40 mm protrusion. ' +
            '(B) A2741 = mini 15g / ~30 mm — 30W USB-C PD/PPS peak 29.3W, USB-A PowerIQ 3.0 up to ~22.4W alone, but dual-share throttles to USB-C 20W + USB-A 10W inside a 30W envelope; no LED. ' +
            'Six Egyptian fits. RIGHT FOR: (1) FAMILY OF FOUR, MIXED-GENERATION DEVICES — iPhone 15 on C + Samsung A32 / JBL Flip 5 on A; A2732 keeps near-full A while C is loaded (A2741 throttles A to ~10W). ' +
            '(2) LATE-NIGHT RIDESHARE / TAXI (11pm–3am) — blue LED ring finds ports without cabin dome light; A2741 needs light or blind feel. ' +
            '(3) TALABAT / INSTASHOP / ELMENUS courier — company USB-A Android + personal USB-C phone on one socket without cable ping-pong. ' +
            '(4) VW GOLF / SKODA OCTAVIA deep sockets — 32g / 38 mm body seats deeper and jiggles less on Ring Road / Faisal potholes than ultralight 15g A2741. ' +
            '(5) MICROBUS / TRUCK 24V — both SKUs dual-rated; we verified A2732 at 24V lab DC (19.8W C + 14.9W A). ' +
            '(6) SECOND-CAR / glovebox spare when price is ~550 EGP vs A2741 ~530 EGP — nearly identical street money; pick on features, not “budget.” ' +
            'WRONG FOR / RED-FLAG: (7) Samsung S23/S24/S25 Ultra owners wanting Super Fast Charging in-car — A2732 has NO PPS; SFC falls back to ~15W PD. Buy A2741. ' +
            '(8) Solo modern USB-C phone (iPhone / Pixel / Samsung) — A2741’s 29.3W C peak beats A2732’s 19.8W C. ' +
            'HEAT: Cairo July sun-park dashboard hit 61.5°C on our Corolla (GM320; SAE J1211 summer class). Anker rates 0–40°C operating window — unplug in direct sun; glovebox; let AC cool ≥5 min before high-load charge. ' +
            'ELECTRICITY: ~35W DC for 10 h engine-off ≈ 350Wh vs a healthy 45Ah 12V pack ~540Wh — one night will not flatten a healthy battery, but multi-day stand drains cranking margin. ' +
            'CairoVolt is an independent retailer — store warranty only, not an authorized Anker distributor.',
        ar:
            'A2732 هو اختيار المنفذين "الأقدم لكن ما زال مفيدًا مشروعًا" — الإجابة عندما تشحن iPhone وأجهزة USB-A عائلية أقدم معًا، أو تقود نوبات ركّاب أجرة متأخرة وتريد حلقة LED دون إضاءة السقف. ' +
            'خريطة A/B الحرجة مقابل الذهب A2741 (لا تخلط). (أ) A2732 = هذه الورقة — USB-C 20 واط PD ثابت + USB-A 15 واط PowerIQ 2.0، متزامن مقاس 34.7 واط، **بدون** PPS، حلقة LED زرقاء، 32 جرامًا / بروز ~40 ملم. ' +
            '(ب) A2741 = ميني 15 جرامًا / ~30 ملم — ذروة USB-C PD/PPS 29.3 واط، USB-A PowerIQ 3.0 حتى ~22.4 واط وحده، لكن المشاركة تخفض إلى USB-C 20 + USB-A 10 داخل ظرف 30 واط؛ بلا LED. ' +
            'ستة استخدامات مصرية. مناسب لـ: (1) عائلة من أربعة بأجهزة أجيال مختلطة — iPhone 15 على C + Samsung A32 / JBL Flip 5 على A؛ A2732 يبقي A قرب الكامل بينما C محمّل (A2741 يخفض A إلى ~10 واط). ' +
            '(2) ركّاب أجرة / تاكسي ليلاً (11–3) — حلقة LED تجد المنافذ دون إضاءة سقف؛ A2741 يحتاج ضوءًا أو تلمّسًا. ' +
            '(3) مندوب طلبات / إنستا شوب / الميناس — أندرويد شركة USB-A + هاتف شخصي USB-C على مقبس واحد دون تبادل كابلات. ' +
            '(4) VW Golf / Skoda Octavia بمقابس عميقة — جسم 32 جرامًا / 38 ملم يستقر أعمق ويهتز أقل على مطبّات الدائري / فيصل من A2741 خفيف 15 جرامًا. ' +
            '(5) ميكروباص / شاحنة 24V — كلا الموديلين مصنّف مزدوجًا؛ تحقّقنا من A2732 عند 24V مختبري (19.8 واط C + 14.9 واط A). ' +
            '(6) سيارة ثانية / احتياطي درج عندما السعر ~550 جنيه مقابل A2741 ~530 — مال شارع متقارب؛ اختر بالميزات لا بـ"الميزانية". ' +
            'غير مناسب / علم أحمر: (7) أصحاب Samsung S23/S24/S25 Ultra يريدون Super Fast Charging في السيارة — A2732 **بلا** PPS؛ SFC يرتد إلى ~15 واط PD. اشترِ A2741. ' +
            '(8) هاتف USB-C حديث منفرد — ذروة A2741 على C بـ29.3 واط تتفوق على 19.8 واط في A2732. ' +
            'الحرارة: تابلوه يوليو بعد ركن شمسي بلغ 61.5°م على Corolla (GM320؛ فئة SAE J1211 الصيفية). انكر تدرج نطاق تشغيل 0–40°م — افصل في الشمس المباشرة؛ درج القفازات؛ دع التكييف يبرّد ≥5 دقائق قبل شحن بحمل عالٍ. ' +
            'الكهرباء: ~35 واط DC لـ10 ساعات محرك مطفأ ≈ 350 واط·ساعة مقابل عبوة 45Ah 12V سليمة ~540 واط·ساعة — ليلة واحدة لا تفرغ بطارية سليمة، لكن أيامًا متعددة تضعف هامش التشغيل. ' +
            'كايروفولت متجر مستقل — ضمان المتجر فقط، وليس موزع انكر معتمدًا.',
    },
    specifications: {
        'Model': {
            en: 'Anker PowerDrive PD+ 2 Car Charger 35W (A2732)',
            ar: 'شاحن سيارة Anker PowerDrive PD+ 2 بقوة 35W (A2732)',
        },
        'Category': {
            en: 'Cigarette-socket (12V/24V) dual-port car charger — mature 2020-generation PowerDrive; NOT a wall charger',
            ar: 'شاحن سيارة بمنفذين لمقبس السيارة (12V/24V) — جيل PowerDrive 2020 الناضج؛ **ليس** شاحن حائط',
        },
        'Total Output': {
            en: 'Up to 35W simultaneous (20W USB-C + 15W USB-A — independent rails, NOT a shared/throttled 35W marketing sum into one device)',
            ar: 'حتى 35 واط بالتوازي (20 واط USB-C + 15 واط USB-A — سكك مستقلة، **ليست** مجموعًا تسويقيًا مشتركًا/مخفَّضًا في جهاز واحد)',
        },
        'USB-C Port': {
            en: 'Up to 20W PD (fixed rails only) — PDOs: 5V/3A · 9V/2.22A (FNB58); NO 12V/15V/20V fixed PDOs; NO PPS APDO',
            ar: 'حتى 20 واط PD (بروتوكولات ثابتة فقط) — PDOs: 5V/3A · 9V/2.22A (FNB58)؛ **بلا** PDO ثابتة 12V/15V/20V؛ **بلا** PPS APDO',
        },
        'USB-A Port': {
            en: 'Up to 15W PowerIQ 2.0 (5V/3A) — legacy pre-PowerIQ 3.0; does NOT hit Qualcomm QC 3.0 12V or Samsung 22.5W AFC',
            ar: 'حتى 15 واط PowerIQ 2.0 (5V/3A) — جيل قديم قبل PowerIQ 3.0؛ **لا** يصل إلى Qualcomm QC 3.0 عند 12V أو Samsung 22.5W AFC',
        },
        'Simultaneous Behavior (measured)': {
            en: 'USB-C 19.8W + USB-A 14.9W = 34.7W TOTAL at 13.8V DC — A2732 advantage vs A2741’s 30W shared envelope (A2741 dual ≈ C 20W + A 10W)',
            ar: 'USB-C 19.8 واط + USB-A 14.9 واط = 34.7 واط **إجمالي** عند 13.8V DC — ميزة A2732 مقابل ظرف A2741 المشترك 30 واط (مزدوج A2741 ≈ C 20 + A 10)',
        },
        'Unique Feature — Blue LED Ring': {
            en: 'Blue LED ring around USB ports illuminates the socket area at night — A2741 has NO LED ring',
            ar: 'حلقة LED زرقاء حول منفذَي USB تُنير منطقة المقبس ليلاً — A2741 **بلا** حلقة LED',
        },
        'Weight / Dimensions': {
            en: '32g rated — CairoVolt 31.8g (Kkmoon 0.01g); 35 × 38 × 38 mm rated — measured 35.0 × 38.1 × 38.0 mm (Mitutoyo)',
            ar: '32 جرامًا اسمي — CairoVolt 31.8 جرامًا (Kkmoon 0.01g)؛ 35 × 38 × 38 ملم اسمي — مقاس 35.0 × 38.1 × 38.0 ملم (Mitutoyo)',
        },
        'Input': {
            en: '12V DC OR 24V DC dual-rated — verified on lab PSU at 12.6/13.8/14.4/24.0V and Toyota Corolla 2018 12V accessory socket',
            ar: '12V DC أو 24V DC تصنيف مزدوج — متحقق على مصدر مختبري عند 12.6/13.8/14.4/24.0V ومقبس ملحقات Toyota Corolla 2018 بجهد 12V',
        },
        'Vehicle Voltage Tolerance': {
            en: 'Sustained USB-C 20W at 12.6V idle sim; offline at DC input <11.5V (slightly wider than A2741’s 11.8V cutoff)',
            ar: 'استمر في USB-C 20 واط عند تباطؤ محاكى 12.6V؛ فصل عند دخل DC <11.5V (أوسع قليلًا من قطع A2741 عند 11.8V)',
        },
        'Safety': {
            en: 'Anker ActiveShield 2.0 (2020) + MultiProtect; CairoVolt OCP cut >3.5A on 9V USB-C in ~2s. Ripple / load-dump NOT measured',
            ar: 'ActiveShield 2.0 (2020) + MultiProtect من انكر؛ OCP CairoVolt فصل >3.5A على USB-C 9V خلال ~2 ث. التموّج / Load Dump **لم يُقاسا**',
        },
        'Ripple / Load dump': {
            en: 'Voltage ripple NOT measured (no scope). Load-dump NOT tested (no ISO 7637 gear) — skipped per §7.2 N/O; silence over invention',
            ar: 'تموّج الجهد **لم يُقَس** (بلا راسم). Load Dump **لم يُختبَر** (بلا معدّة ISO 7637) — تُخطّى وفق §7.2 N/O؛ الصمت أقوى من الاختراع',
        },
        'vs A2741 (candid A/B)': {
            en: 'A2732 peaks: 19.8W C / 14.9W A / 34.7W simultaneous · NO PPS · LED ring · 31.8g / ~40 mm. A2741 peaks: 29.3W C / ~22.4W A alone / dual C20+A10 inside 30W · HAS PPS · no LED · 15.1g / ~30 mm. Pick A2732 for mixed C+A households; A2741 for solo modern C / Samsung SFC.',
            ar: 'ذروات A2732: 19.8 واط C / 14.9 واط A / 34.7 واط متزامن · بلا PPS · حلقة LED · 31.8 جرامًا / ~40 ملم. ذروات A2741: 29.3 واط C / ~22.4 واط A وحده / مزدوج C20+A10 داخل 30 واط · يملك PPS · بلا LED · 15.1 جرامًا / ~30 ملم. اختر A2732 لأسر C+A مختلطة؛ A2741 لـC حديث منفرد / Samsung SFC.',
        },
        'Recall Status (2026-07-24)': {
            en: 'NOT RECALLED — verified 2026-07-24 against anker.com/product-recalls and cpsc.gov (Anker 2024–2025 recalls cover cables A8482/A8483/A8465 and power banks A1263/A1257/A1647/A1652/A1681/A1689; no car chargers listed)',
            ar: 'غير مُستدعى — تحقّق في 2026-07-24 مقابل anker.com/product-recalls و cpsc.gov (استدعاءات انكر 2024–2025 تخص كابلات A8482/A8483/A8465 وباوربانك A1263/A1257/A1647/A1652/A1681/A1689؛ لا شواحن سيارات مدرجة)',
        },
        'Product Generation': {
            en: '2020-era Anker car charger; PowerIQ 2.0 (superseded by PowerIQ 3.0 on A2741); ActiveShield 2.0',
            ar: 'شاحن سيارة انكر من جيل 2020؛ PowerIQ 2.0 (استُبدل بـ PowerIQ 3.0 في A2741)؛ ActiveShield 2.0',
        },
        'In the Box': {
            en: 'Car charger only — USB-C and USB-A cables not included',
            ar: 'الشاحن فقط — كابلات USB-C و USB-A غير مرفقة',
        },
        'Efficiency note': {
            en: 'No AC-input efficiency figure — car chargers are DC-in; PZEM/Kill-A-Watt wall % does not apply and is not invented (§6 / §11.3)',
            ar: 'لا رقم كفاءة دخل AC — شواحن السيارة دخلها DC؛ نسبة جدار PZEM/Kill-A-Watt غير منطبقة ولا تُختَرع (§6 / §11.3)',
        },
        'Sample / Lab ID': {
            en: 'CV-CC-A2732-001 · Eng. Omar Khaled · 2026-07-24',
            ar: 'CV-CC-A2732-001 · م. عمر خالد · 2026-07-24',
        },
        'Protocol': {
            en: 'CairoVolt Bench Test Protocol §7.2 (car chargers) + applicable §7.1 load/phone steps + §8 physics gates + §11 red-flag checklist',
            ar: 'بروتوكول اختبار كايرو فولت §7.2 (شواحن السيارة) + خطوات الحمل/الهاتف المنطبقة من §7.1 + بوابات §8 + قائمة الأعلام الحمراء §11',
        },
    },
    benchTest: {
        sku: 'A2732',
        sampleId: 'CV-CC-A2732-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit (CV-CC-A2732-001) · CairoVolt lab, New Cairo · ambient 28.3°C · DC from MECHANIC MP-3005D at 12.6V (idle) / 13.8V (running) / 14.4V (alternator peak) / 24.0V (microbus/truck) via CigarBUS12V-DC jig · PLUS real-vehicle Toyota Corolla 2018 accessory socket (New Cairo → 6th October, 90 min stop-start, cabin AC-on 39°C / sun-park dashboard 61.5°C GM320) · same protocol family A/B vs A2741 (CV-CC-A2741-001) · single unit; batches may vary',
            ar: 'وحدة واحدة من مخزون التجزئة (CV-CC-A2732-001) · مختبر كايرو فولت، القاهرة الجديدة · محيطة 28.3°م · دخل DC من MECHANIC MP-3005D عند 12.6V (تباطؤ) / 13.8V (يعمل) / 14.4V (ذروة مولد) / 24.0V (ميكروباص/شاحنة) عبر CigarBUS12V-DC · **إضافة** مقبس Toyota Corolla 2018 (القاهرة الجديدة → 6 أكتوبر، 90 دقيقة ستوب-آند-جو، مقصورة تكييف 39°م / تابلوه ركن شمسي 61.5°م GM320) · A/B بنفس عائلة البروتوكول مقابل A2741 (CV-CC-A2741-001) · وحدة واحدة؛ قد تختلف الدفعات',
        },
        methodology: {
            en:
                'Per CairoVolt Bench Test Protocol §7.2 (car chargers) with applicable §7.1 phone/load steps and §11 red-flag gates on sample CV-CC-A2732-001 (2026-07-24, Eng. Omar Khaled). ' +
                '§8 physics before publish: fixed PDOs obey W=V×A (5×3=15W; 9×2.22=19.98W); single-port C peak ≤ 20W label; simultaneous 19.8+14.9=34.7W ≤ 35W label; no PPS claim without FNB58 APDO; PowerIQ 2.0 A-side must not be sold as QC/AFC. ' +
                'Powered A2732 from MECHANIC MP-3005D (0–30V/0–5A) at 12.6 / 13.8 / 14.4 / 24.0V into CigarBUS12V-DC spring jig — documenting both 12V and 24V lab rails (not inventing truck data). ' +
                'Separately seated in Toyota Corolla 2018 12V accessory socket for fit, commute charge deltas, LED night visibility, and cabin-heat context. ' +
                '(A) FNB58 fw v1.3 PD Info: ONLY two fixed PDOs (5V/3A, 9V/2.22A) and NO PPS envelope — critical honesty vs A2741 (5 PDOs + PPS 3.3–11V/3A). Claiming Samsung SFC on A2732 would be a §11 red-flag fail. ' +
                '(B–C) Each USB-C rail into JUWEI 35W for 2 min; USB-A into second JUWEI at 5V sink (PowerIQ 2.0 ignored QC/AFC triggers — stayed 5V). ' +
                '(D) Simultaneous dual-port: JUWEI C @ 9V/2.22A + JUWEI A @ 5V/3A — held 19.8W + 14.9W = 34.7W (A2732 dual-port advantage vs A2741 shared 30W). ' +
                '(F) Real phones on Corolla route: iPhone 15 (12.99Wh) on USB-C + Galaxy A55 (16.4Wh) on USB-A concurrent; battery % deltas logged. ' +
                '(G) BENETECH GM320 (ε=0.95): dashboard 61.5°C after 40-min sun-park; LED ring photographed at night (~50 cm visibility, subjective). ' +
                '(H) OCP: JUWEI >3.5A on 9V C rail — cut ~2s. (K) Kkmoon 0.01g weight 31.8g; Mitutoyo 35.0×38.1×38.0 mm; protrusion ~40 mm past Corolla bezel. ' +
                '(N–O) Ripple NOT measured (no scope); load-dump skipped (no ISO 7637) — silence over invention. ' +
                'No AC efficiency — DC-in; PZEM not applicable (§6 / §11.3). No silicon IDs — no published teardown as of 2026-07-24 (ChargerLAB / LumaFieldTV / Notebookcheck archives). ' +
                'A/B cross-read: A2741 sheet peaks 29.3W C / dual C20+A10 / 34-point iPhone gain — cited for SKU contrast, not invented same-hour thermal ranking. ' +
                'Independent corroboration (NOT our data): Anker A2732 page lists 20W PD-C + 15W PowerIQ 2.0 + 12V/24V; MacRumors documents iPhone ~20W wired ceiling. ' +
                'Recall check 2026-07-24 on anker.com/product-recalls + cpsc.gov — not listed. Single unit; production batches may vary.',
            ar:
                'وفق بروتوكول اختبار كايرو فولت §7.2 (شواحن السيارة) مع خطوات الهاتف/الحمل المنطبقة من §7.1 وبوابات الأعلام الحمراء §11 على العيّنة CV-CC-A2732-001 (2026-07-24، م. عمر خالد). ' +
                'بوابات §8 قبل النشر: PDO الثابتة تطيع W=V×A (5×3=15 واط؛ 9×2.22=19.98 واط)؛ ذروة C منفرد ≤ ملصق 20 واط؛ المتزامن 19.8+14.9=34.7 ≤ ملصق 35 واط؛ لا ادعاء PPS بلا APDO من FNB58؛ جانب PowerIQ 2.0 لا يُباع كـ QC/AFC. ' +
                'غذّينا A2732 من MECHANIC MP-3005D (0–30V/0–5A) عند 12.6 / 13.8 / 14.4 / 24.0V داخل CigarBUS12V-DC — موثّقين سكتي 12V و24V مختبريًا (دون اختراع بيانات شاحنة). ' +
                'بشكل منفصل ركّبنا في مقبس Toyota Corolla 2018 بجهد 12V للملاءمة وفوارق شحن المشوار ورؤية LED وسياق حرارة المقصورة. ' +
                '(A) FNB58 fw v1.3 PD Info: **فقط** بروتوكولان ثابتان (5V/3A، 9V/2.22A) و**بدون** ظرف PPS — صدق حرج مقابل A2741 (5 PDOs + PPS 3.3–11V/3A). ادعاء Samsung SFC على A2732 فشل علم أحمر §11. ' +
                '(B–C) كل سكة USB-C على JUWEI 35W لدقيقتين؛ USB-A على JUWEI ثانٍ بمستقبل 5V (PowerIQ 2.0 تجاهل تفعيلات QC/AFC — بقي 5V). ' +
                '(D) منفذان متزامنان: JUWEI C @ 9V/2.22A + JUWEI A @ 5V/3A — حافظ على 19.8 + 14.9 = 34.7 واط (ميزة A2732 المزدوجة مقابل ظرف A2741 المشترك 30 واط). ' +
                '(F) هواتف حقيقية على مسار Corolla: iPhone 15 (12.99Wh) على USB-C + Galaxy A55 (16.4Wh) على USB-A متزامنًا؛ سُجّلت فوارق %. ' +
                '(G) BENETECH GM320 (ε=0.95): تابلوه 61.5°م بعد 40 دقيقة ركن شمسي؛ صُوّرت حلقة LED ليلاً (رؤية ~50 سم، ذاتي). ' +
                '(H) OCP: JUWEI >3.5A على سكة C 9V — فصل ~2 ث. (K) وزن Kkmoon 31.8 جرامًا؛ Mitutoyo 35.0×38.1×38.0 ملم؛ بروز ~40 ملم بعد حافة Corolla. ' +
                '(N–O) التموّج **لم يُقَس** (بلا راسم)؛ Load Dump تُخطّي (بلا ISO 7637) — الصمت أقوى من الاختراع. ' +
                'لا كفاءة AC — دخل DC؛ PZEM غير منطبق (§6 / §11.3). لا هويات سيليكون — لا تفكيك منشور حتى 2026-07-24. ' +
                'قراءة A/B: ورقة A2741 ذروات 29.3 واط C / مزدوج C20+A10 / كسب iPhone 34 نقطة — للتباين لا لترتيب حراري مخترع في نفس الساعة. ' +
                'استرجاع مستقل (ليست بياناتنا): صفحة Anker A2732 تدرج 20 واط PD-C + 15 واط PowerIQ 2.0 + 12V/24V؛ MacRumors تسقف iPhone ~20 واط سلكيًا. ' +
                'فحص استدعاء 2026-07-24 على anker.com/product-recalls + cpsc.gov — غير مدرج. وحدة واحدة؛ قد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'MECHANIC MP-3005D adjustable DC lab supply (0–30V/0–5A)', use: { en: 'Documented vehicle DC at 12.6/13.8/14.4/24.0V — same protocol family as A2741', ar: 'دخل مركبة موثَّق عند 12.6/13.8/14.4/24.0V — نفس عائلة بروتوكول A2741' } },
            { name: 'CigarBUS12V-DC socket jig', use: { en: 'Spring-loaded cigarette-socket contact geometry for controlled bench feed', ar: 'هندسة اتصال مقبس السيارة بنابض لتغذية مختبرية متحكَّم بها' } },
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'USB-C PD/PPS handshake enumeration + V·A·W peaks; confirmed NO PPS', ar: 'إحصاء مصافحة PD/PPS على USB-C + ذروات V·A·W؛ أكّد **غياب** PPS' } },
            { name: 'JUWEI 35W USB electronic load (×2)', use: { en: 'Single-port peaks + simultaneous C+A envelope — A2732 dual-port advantage test', ar: 'ذروات منفذ منفرد + ظرف C+A متزامن — اختبار ميزة A2732 المزدوجة' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Cabin dashboard sun-park temp + charger/cabin thermal context', ar: 'حرارة تابلوه الركن الشمسي + سياق حرارة الشاحن/المقصورة' } },
            { name: 'Apple iPhone 15 (12.99Wh, iOS 18.5)', use: { en: 'Real-vehicle USB-C charge-delta vs A2741 90-min route', ar: 'فارق شحن USB-C حقيقي مقابل مسار A2741 لـ90 دقيقة' } },
            { name: 'Samsung Galaxy A55 (16.4Wh)', use: { en: 'Real-vehicle USB-A concurrent charge (PowerIQ 2.0 fallback)', ar: 'شحن USB-A متزامن حقيقي (رجوع PowerIQ 2.0)' } },
            { name: 'Toyota Corolla 2018 (real vehicle)', use: { en: 'Same 90-min New Cairo → 6th October route family as A2741 A/B', ar: 'نفس عائلة مسار 90 دقيقة القاهرة الجديدة → 6 أكتوبر كـ A/B مع A2741' } },
            { name: 'Kkmoon 0.01g scale + Mitutoyo caliper', use: { en: 'Weight 31.8g + dimensions 35.0 × 38.1 × 38.0 mm + ~40 mm protrusion', ar: 'الوزن 31.8 جرامًا + الأبعاد 35.0 × 38.1 × 38.0 ملم + بروز ~40 ملم' } },
        ],
        results: [
            { param: { en: 'USB-C single-port peak (lab 13.8V DC)', ar: 'ذروة USB-C منفذ واحد (مختبر 13.8V DC)' }, rated: '20W', measured: '19.8W', note: { en: '99% of label — FNB58 peak; identical class at 24V DC input', ar: '99% من الملصق — ذروة FNB58؛ نفس الفئة عند دخل 24V DC' } },
            { param: { en: 'USB-C PDO — 5V/3A', ar: 'USB-C PDO — 5V/3A' }, rated: '15W', measured: '14.7W', note: { en: 'legacy fallback rail · W=V×A gate OK', ar: 'سكة رجوع قديمة · بوابة W=V×A سليمة' } },
            { param: { en: 'USB-C PDO — 9V/2.22A (peak fixed rail)', ar: 'USB-C PDO — 9V/2.22A (ذروة السكة الثابتة)' }, rated: '20W', measured: '19.8W', note: { en: '§7.1-C class peak — iPhone/iPad ~20W wired ceiling', ar: 'ذروة فئة §7.1-C — سقف iPhone/iPad السلكي ~20 واط' } },
            { param: { en: 'USB-C PPS envelope', ar: 'ظرف USB-C PPS' }, rated: { en: 'NOT SUPPORTED on A2732', ar: '**غير مدعوم** في A2732' }, measured: { en: 'no PPS / zero APDO in FNB58 handshake', ar: 'لا PPS / صفر APDO في مصافحة FNB58' }, note: { en: 'RED-FLAG gate: do not claim Samsung SFC — A2741 HAS PPS 3.3–11V/3A', ar: 'بوابة علم أحمر: لا تدّعِ Samsung SFC — A2741 **يملك** PPS 3.3–11V/3A' } },
            { param: { en: 'USB-A single-port peak', ar: 'ذروة USB-A منفذ واحد' }, rated: '15W', measured: '14.9W (5V/2.98A)', note: { en: 'PowerIQ 2.0 stayed at 5V — no QC 3.0 / AFC trigger response', ar: 'PowerIQ 2.0 بقي عند 5V — بلا استجابة تفعيل QC 3.0 / AFC' } },
            { param: { en: 'Simultaneous dual-port peak (C+A)', ar: 'ذروة المنفذين المتزامنة (C+A)' }, rated: '35W total (20+15)', measured: '34.7W total (19.8 + 14.9)', note: { en: 'A2732 headline peak — independent rails; ≠ A2741 30W shared', ar: 'ذروة عنوان A2732 — سكك مستقلة؛ ≠ ظرف A2741 المشترك 30 واط' } },
            { param: { en: 'A/B dual-port vs A2741 (cross-sheet)', ar: 'A/B المنفذين مقابل A2741 (عبر الأوراق)' }, rated: { en: 'A2741 shared 30W', ar: 'A2741 مشترك 30 واط' }, measured: { en: 'A2732 34.7W indep. vs A2741 ≈ C20W + A10W shared', ar: 'A2732 34.7 واط مستقل مقابل A2741 ≈ C20 + A10 مشترك' }, note: { en: 'A2732 wins two-device total; A2741 wins single modern C', ar: 'A2732 يفوز بإجمالي جهازين؛ A2741 يفوز بـC حديث منفرد' } },
            { param: { en: 'A/B USB-C peak vs A2741', ar: 'A/B ذروة USB-C مقابل A2741' }, measured: { en: 'A2732 19.8W vs A2741 29.3W', ar: 'A2732 19.8 واط مقابل A2741 29.3 واط' }, note: { en: 'red-flag if sold as “same 30W C class as A2741”', ar: 'علم أحمر إن بِيع كـ"نفس فئة 30 واط C مثل A2741"' } },
            { param: { en: 'Vehicle voltage tolerance (idle 12.6V)', ar: 'تحمل جهد السيارة (تباطؤ 12.6V)' }, measured: { en: 'sustained USB-C 20W at 12.6V DC input', ar: 'استمر في USB-C 20 واط عند دخل DC 12.6V' }, note: { en: 'stop-start Cairo traffic relevance', ar: 'صلة بزحمة القاهرة ستوب-آند-جو' } },
            { param: { en: 'Vehicle voltage tolerance (cutoff)', ar: 'تحمل جهد السيارة (قطع)' }, measured: { en: 'offline at DC input <11.5V', ar: 'فصل عند دخل DC <11.5V' }, note: { en: 'slightly wider than A2741 (11.8V) — plus for weak used batteries', ar: 'أوسع قليلًا من A2741 (11.8V) — إضافة لبطاريات مستعملة ضعيفة' } },
            { param: { en: '24V input operation (microbus/truck)', ar: 'تشغيل إدخال 24V (ميكروباص/شاحنة)' }, rated: '24V DC', measured: { en: 'full 19.8W USB-C + 14.9W USB-A at 24V DC lab', ar: 'USB-C 19.8 واط + USB-A 14.9 واط كاملة عند 24V DC مختبري' }, note: { en: 'documented this cycle — not silence', ar: 'موثَّق في هذه الدورة — ليس صمتًا' } },
            { param: { en: 'iPhone 15 real-vehicle 90-min (USB-C)', ar: 'iPhone 15 حقيقي 90 دقيقة (USB-C)' }, measured: { en: '42% → 64% (22-point net gain)', ar: '42% → 64% (كسب صافي 22 نقطة)' }, note: { en: 'A/B: A2741 same-route class gained 34 points (30W C vs 20W C)', ar: 'A/B: فئة A2741 على نفس المسار كسبت 34 نقطة (30 واط C مقابل 20 واط C)' } },
            { param: { en: 'Galaxy A55 concurrent USB-A charge', ar: 'شحن Galaxy A55 المتزامن على USB-A' }, measured: { en: 'gained 18% in 90 min (WhatsApp + Maps)', ar: 'كسب 18% في 90 دقيقة (WhatsApp + Maps)' }, note: { en: 'PowerIQ 2.0 ~5V/2.5A ≈ 12.5W class — not 22.5W AFC', ar: 'PowerIQ 2.0 فئة ~5V/2.5A ≈ 12.5 واط — ليس 22.5W AFC' } },
            { param: { en: 'Blue LED ring visibility (night cabin)', ar: 'رؤية حلقة LED الزرقاء (مقصورة ليلية)' }, measured: { en: 'clearly visible ~50 cm in unlit Corolla cabin', ar: 'مرئية بوضوح من ~50 سم في مقصورة Corolla غير مضاءة' }, note: { en: 'subjective ergonomic; A2741 has no LED', ar: 'إرغونومي ذاتي؛ A2741 بلا LED' } },
            { param: { en: 'Corolla cabin / dashboard heat context', ar: 'سياق حرارة مقصورة/تابلوه Corolla' }, measured: { en: 'cabin AC-on 39°C · dashboard sun-park 61.5°C', ar: 'مقصورة تكييف 39°م · تابلوه ركن شمسي 61.5°م' }, note: { en: 'exceeds 0–40°C Anker window — unplug in sun', ar: 'يتجاوز نطاق انكر 0–40°م — افصل في الشمس' } },
            { param: { en: 'Over-current protection (9V USB-C)', ar: 'حماية التيار الزائد (USB-C 9V)' }, measured: { en: 'cut >3.5A in ~2s', ar: 'فصل >3.5A خلال ~2 ث' }, note: { en: '§7.1-H class — trip ≤ 3 s', ar: 'فئة §7.1-H — فصل ≤ 3 ث' } },
            { param: { en: 'Voltage ripple (scope)', ar: 'تموّج الجهد (راسم)' }, measured: { en: 'NOT measured — no oscilloscope this cycle', ar: '**لم يُقَس** — بلا راسم في هذه الدورة' }, note: { en: '§7.2 N — no invented mV pk-pk', ar: '§7.2 N — بلا اختراع mV ذروة-لذروة' } },
            { param: { en: 'Load-dump protection', ar: 'حماية Load Dump' }, measured: { en: 'SKIPPED — no ISO 7637 equipment', ar: 'تُخطّي — بلا معدّة ISO 7637' }, note: { en: '§7.2 O', ar: '§7.2 O' } },
            { param: { en: 'Socket protrusion past Corolla bezel', ar: 'بروز المقبس بعد حافة Corolla' }, measured: '~40 mm', note: { en: '~10 mm more than A2741 (~30 mm) — check shallow cup-holders', ar: '~10 ملم أكثر من A2741 (~30 ملم) — تحقق من مساند أكواب ضحلة' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '32g', measured: '31.8g', note: { en: 'Kkmoon 0.01g — within scale resolution', ar: 'Kkmoon 0.01g — ضمن دقة الميزان' } },
            { param: { en: 'Dimensions', ar: 'الأبعاد' }, rated: '35×38×38 mm', measured: '35.0×38.1×38.0 mm', note: { en: 'Mitutoyo — within 0.1 mm of spec', ar: 'Mitutoyo — ضمن 0.1 ملم من المواصفة' } },
            { param: { en: 'AC wall efficiency / PZEM', ar: 'كفاءة جدار AC / PZEM' }, measured: { en: 'NOT APPLICABLE — DC-in car charger; no invented %', ar: 'غير منطبق — شاحن سيارة دخل DC؛ بلا اختراع %' }, note: { en: '§6 / §11.3 red-flag silence', ar: 'صمت علم أحمر §6 / §11.3' } },
            { param: { en: 'Recall status (verified 2026-07-24)', ar: 'حالة الاستدعاء (متحققة 2026-07-24)' }, measured: { en: 'NOT recalled', ar: 'غير مُستدعى' }, note: { en: 'anker.com/product-recalls + cpsc.gov; no car chargers in active Anker list', ar: 'anker.com/product-recalls + cpsc.gov؛ لا شواحن سيارات في قائمة انكر النشطة' } },
        ],
        verdict: {
            en: 'A2732 hit its peaks: 19.8W USB-C + 14.9W USB-A = 34.7W simultaneous, no PPS. Beats A2741 on dual-port total and LED; loses on solo USB-C speed and Samsung SFC. Not recalled. Single unit.',
            ar: 'A2732 بلغ ذرواته: 19.8 واط USB-C + 14.9 واط USB-A = 34.7 واط متزامن، بلا PPS. يتفوق على A2741 في إجمالي المنفذين وLED؛ يتأخر في سرعة USB-C المنفرد وSamsung SFC. غير مُستدعى. وحدة واحدة.',
        },
        pros: [
            { en: '34.7W measured simultaneous (19.8W C + 14.9W A) — genuine dual-port advantage over A2741’s 30W shared envelope that throttles USB-A to ~10W when C is loaded', ar: '34.7 واط متزامن مقاس (19.8 واط C + 14.9 واط A) — ميزة منفذين حقيقية على ظرف A2741 المشترك 30 واط الذي يخفض USB-A إلى ~10 واط عندما يُحمَّل C' },
            { en: 'Blue LED ring verified visible ~50 cm in an unlit Corolla cabin — real night ergonomics A2741 lacks', ar: 'حلقة LED الزرقاء متحقق من رؤيتها من ~50 سم في مقصورة Corolla غير مضاءة — إرغونومية ليلية حقيقية يفتقدها A2741' },
            { en: 'Wider low-voltage cutoff (<11.5V vs A2741 11.8V) + deeper 32g / 38 mm body seats better in deep European sockets on Cairo potholes', ar: 'قطع جهد أدنى أوسع (<11.5V مقابل 11.8V في A2741) + جسم أعمق 32 جرامًا / 38 ملم يستقر أفضل في مقابس أوروبية عميقة على مطبّات القاهرة' },
            { en: 'Dual-rated 12V/24V verified this cycle — full 19.8W C + 14.9W A at 24V lab DC for microbus/truck operators', ar: 'تصنيف مزدوج 12V/24V متحقق في هذه الدورة — 19.8 واط C + 14.9 واط A كاملة عند 24V مختبري لمشغّلي الميكروباص/الشاحنة' },
            { en: 'NOT recalled — verified 2026-07-24 against anker.com/product-recalls and cpsc.gov; no car chargers in Anker’s active list', ar: 'غير مُستدعى — تحقّق في 2026-07-24 مقابل anker.com/product-recalls و cpsc.gov؛ لا شواحن سيارات في قائمة انكر النشطة' },
        ],
        limits: [
            { en: 'USB-C caps at 19.8W measured (2 PDOs only) — A2741 delivers 29.3W on USB-C alone; solo modern-phone users should buy A2741', ar: 'USB-C سقفه 19.8 واط مقاس (PDOان فقط) — A2741 يسلّم 29.3 واط على USB-C وحده؛ مستخدمو الهاتف الحديث المنفرد يشترون A2741' },
            { en: 'NO PPS — Samsung Super Fast Charging will not engage; Galaxy falls back to ~15W PD. Red-flag if marketed as SFC-capable like A2741', ar: '**بلا** PPS — Samsung Super Fast Charging لن يعمل؛ الجالكسي يرتد إلى ~15 واط PD. علم أحمر إن سُوِّق كقادر على SFC مثل A2741' },
            { en: 'USB-A is PowerIQ 2.0 legacy — stays ~5V; no Qualcomm QC 3.0, Samsung 22.5W AFC, or Huawei SCP (A2741 PowerIQ 3.0 can hit ~22.4W A alone)', ar: 'USB-A تقنية PowerIQ 2.0 قديمة — يبقى ~5V؛ بلا Qualcomm QC 3.0 أو Samsung 22.5W AFC أو Huawei SCP (A2741 PowerIQ 3.0 يصل ~22.4 واط A وحده)' },
            { en: 'Sun-parked Corolla dashboard 61.5°C exceeds Anker 0–40°C window — unplug in direct sun; let AC cool ≥5 min before high-load charging', ar: 'تابلوه Corolla المركون بالشمس 61.5°م يتجاوز نطاق انكر 0–40°م — افصل في الشمس المباشرة؛ دع التكييف يبرّد ≥5 دقائق قبل شحن بحمل عالٍ' },
            { en: '~40 mm protrusion (~10 mm > A2741), no cables in box, no teardown/silicon IDs, ripple/load-dump unmeasured, single unit CV-CC-A2732-001 — batches may vary', ar: 'بروز ~40 ملم (~10 ملم > A2741)، بلا كابلات في العلبة، بلا تفكيك/هويات سيليكون، التموّج/Load Dump غير مقاسين، وحدة واحدة CV-CC-A2732-001 — قد تختلف الدفعات' },
        ],
    },
};
