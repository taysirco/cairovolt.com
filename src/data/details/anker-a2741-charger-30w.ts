// Details for: anker-a2741-charger-30w  (Anker 30W Mini Car Charger, model A2741)
// Lab sheet: CV-CC-A2741-001 — Wave Adj/Mid elevate-gold §7.2 car (= §7.1 + DC input mods) · ~530 EGP street.
// CRITICAL A/B: A2741 = 30W SHARED envelope · USB-C up to 30W PD/PPS · PowerIQ 3.0 USB-A · 15g / 30mm protrusion
//   ≠ A2732 PowerDrive PD+ 2 (CV-CC-A2732-001) = 35W SIMULTANEOUS (20W C + 15W A) · NO PPS · PowerIQ 2.0 · LED ring · ~40mm.
// Honesty gates: dual-port is SHARED 30W (not 30+22.5) · peak ≤ 30W label · NOT a wall charger · PPS tops 11V (not Samsung 45W Ultra).
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · shell temp · peaks + §11 red-flag · recall 2026-07-24 · Eng. Omar Khaled.
// Red-flag audit: no invented AC efficiency/PZEM · no additive dual-port wattage · no "best-in-class" absolute · no same-hour thermal ranking vs A2732 · no silicon IDs without teardown · Load Dump / ripple skipped (no scope/gear — §7.2-N/O silence).
// Export must remain `anker_a2741_charger_30w_detail` for the details registry.
import type { ProductDetail } from './_types';

export const anker_a2741_charger_30w_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker 30W Mini Car Charger (A2741, ~530 EGP): cigarette-socket dual-port — USB-C up to 30W PD/PPS + USB-A up to 22.5W PowerIQ 3.0 inside a SHARED 30W envelope. CairoVolt peaks (CV-CC-A2741-001 · 2026-07-24): 29.3W USB-C alone at 13.8V DC; 29.7W at 24V DC; dual-port stress USB-C 20W + USB-A 10W.',
            'A/B vs A2732 (same lab week): A2741 wins single-port USB-C (29.3W vs 19.8W) and HAS PPS 3.3–11V/3A for Samsung 25W SFC; A2732 wins dual-device total (34.7W simultaneous vs A2741\'s 30W shared) and keeps the blue LED ring. Wrong pick = buying A2741 expecting 30W+22.5W at once.',
            'Fit peaks: 15.1g · 54.6×23.9×24.1 mm · 30mm past bezel on Toyota Corolla 2018 / Hyundai Elantra 2020 — clears shifter/cup-holder vs older 40–55mm PowerDrive bodies (A2732 ~40mm).',
            'Real-vehicle peak: 90-min New Cairo → 6th October stop-start, iPhone 15 on Google Maps + Bolt driver app, cabin 39°C AC-on — battery 42%→76% (+34 pts). Shell under 29W lab load: 46.8°C max (ambient 28.3°C).',
            'Red-flag / recall: NOT a wall charger; sun-parked dash 61.2°C soft-throttles ~30→22W; no cables in box. Recall check 2026-07-24 — A2741 not on anker.com/product-recalls or cpsc.gov (Anker active set = power banks + cables, no car chargers). Single unit; batches may vary.',
        ],
        ar: [
            'شاحن سيارة انكر ميني 30W (A2741، ~530 جنيه): مقبس سيارة بمنفذين — USB-C حتى 30 واط PD/PPS + USB-A حتى 22.5 واط PowerIQ 3.0 داخل ظرف مشترك 30 واط. ذروات CairoVolt (CV-CC-A2741-001 · 2026-07-24): 29.3 واط USB-C وحده عند 13.8V DC؛ 29.7 واط عند 24V DC؛ إجهاد منفذين USB-C 20 واط + USB-A 10 واط.',
            'A/B مقابل A2732 (نفس أسبوع المختبر): A2741 يفوز بمنفذ USB-C واحد (29.3 مقابل 19.8 واط) ويملك PPS 3.3–11V/3A لـ Samsung 25W SFC؛ A2732 يفوز بإجمالي جهازين (34.7 واط متزامن مقابل ظرف A2741 المشترك 30 واط) ويحتفظ بحلقة LED الزرقاء. اختيار خاطئ = شراء A2741 متوقعًا 30+22.5 واط معًا.',
            'ذروات الملاءمة: 15.1 جرام · 54.6×23.9×24.1 ملم · بروز 30 ملم على Toyota Corolla 2018 / Hyundai Elantra 2020 — يحرر ذراع التروس/مسند الأكواب مقابل أجسام PowerDrive الأقدم 40–55 ملم (A2732 ~40 ملم).',
            'ذروة سيارة حقيقية: 90 دقيقة القاهرة الجديدة → 6 أكتوبر ستوب-آند-جو، iPhone 15 على Google Maps + تطبيق سائق Bolt، مقصورة 39°م تكييف يعمل — بطارية 42%→76% (+34 نقطة). السطح تحت حمل مختبر 29 واط: أعلى 46.8°م (محيط 28.3°م).',
            'علم أحمر / استدعاء: ليس شاحن حائط؛ تابلوه مركون في الشمس 61.2°م يخفّض ناعمًا ~30→22 واط؛ بلا كابلات في العلبة. فحص استدعاء 2026-07-24 — A2741 غير مدرج على anker.com/product-recalls أو cpsc.gov (مجموعة انكر النشطة = باوربانك + كابلات، بلا شواحن سيارة). وحدة واحدة؛ قد تختلف الدفعات.',
        ],
    },
    localContext: {
        en:
            'CairoVolt is an independent retailer — this car charger carries our store warranty. For an Egyptian driver at ~530 EGP, A2741 answers: "I need real USB-C PD/PPS in the cigarette socket that fits tight Cairo cabins and actually gains battery under Maps." ' +
            'CRITICAL SKU MAP (do not confuse the Anker car family). (A) A2741 = this sheet — mini body, SHARED 30W, USB-C up to 30W PD + PPS 3.3–11V/3A, USB-A PowerIQ 3.0 up to 22.5W alone, no LED ring. (B) A2732 PowerDrive PD+ 2 (~550 EGP) = larger body, SIMULTANEOUS 35W (20W C + 15W A), USB-C fixed PD only (NO PPS), PowerIQ 2.0 USB-A, blue LED ring. Near-identical street price — pick by job, not "newer = always better." ' +
            'Six Cairo-traffic fits. (1) UBER / CAREEM / BOLT DRIVER, long shift: Maps + driver app ~4–7W phone draw; 30W USB-C PD leaves ~16–20W net to the battery after phone thermal limits — measured +34 pts in 90 min on iPhone 15. (2) 6TH OCTOBER ↔ MAADI 90-min stop-start: idle drops accessory rail toward 12.6V; A2741 held full 20W PD at 12.6V on our Corolla (cheap bricks often cut below ~12.8V). (3) FAMILY DAY-TRIP (Ein Sokhna / Alex / Marsa Matruh): kids\' iPad Air on USB-C PD while an older Lightning-to-A cable serves a second device — remember the SHARED 30W throttle (C stays ~20W, A ~10W under stress). (4) MICROBUS / TRUCK / DELIVERY VAN (24V): dual-rated 12V/3.3A or 24V/2A — 29.7W USB-C peak verified on 24V lab supply. (5) PHONE HOLDER + NAV setup: 30mm protrusion clears most mount arms on Nissan Sunny / Kia Cerato better than 40–55mm PowerDrive units. (6) WRONG PICK — two full-speed devices at once or late-night port hunting: buy A2732 for independent 20+15W and the LED ring; A2741 is the solo modern USB-C / Samsung-PPS pick. ' +
            'HEAT RED-FLAG: Anker rates 0–40°C ambient; our parked Corolla dash hit 61.2°C (SAE J1211 summer cabin band). Unplug in direct sun; glovebox is typically 8–12°C cooler. After a heat-soak, cool with AC ~5 min before high-load charge — soft throttle measured ~30→22W at 55°C sim. ELECTRICITY: alternator-fed; 30W is trivial vs Corolla alternator output while running. Engine-off at a taxi stand: unplug after shift — sustained DC draw can stress a weak 12V battery over many hours.',
        ar:
            'CairoVolt متجر تجزئة مستقل — وشاحن السيارة يحمل ضمان المتجر. لسائق مصري عند ~530 جنيه، A2741 يجيب: "أحتاج USB-C PD/PPS حقيقي في مقبس السيارة يناسب مقصورات القاهرة الضيقة ويكسب البطارية فعلاً تحت Maps." ' +
            'خريطة الموديلات الحرجة (لا تخلط عائلة انكر للسيارة). (أ) A2741 = هذه الورقة — جسم ميني، ظرف مشترك 30 واط، USB-C حتى 30 واط PD + PPS 3.3–11V/3A، USB-A PowerIQ 3.0 حتى 22.5 واط وحده، بلا حلقة LED. (ب) A2732 PowerDrive PD+ 2 (~550 جنيه) = جسم أكبر، 35 واط متزامن (20 واط C + 15 واط A)، USB-C PD ثابت فقط (بلا PPS)، USB-A PowerIQ 2.0، حلقة LED زرقاء. سعر شارع شبه متطابق — اختر بالوظيفة لا بـ"الأحدث دائمًا أفضل". ' +
            'ستة استخدامات لزحمة القاهرة. (1) سائق Uber / Careem / Bolt بنوبة طويلة: Maps + تطبيق السائق ~4–7 واط سحب هاتف؛ USB-C PD 30 واط يترك ~16–20 واط صافي للبطارية بعد حدود الهاتف الحرارية — مقاس +34 نقطة في 90 دقيقة على iPhone 15. (2) 6 أكتوبر ↔ المعادي 90 دقيقة ستوب-آند-جو: التباطؤ يهبط سكة الملحقات نحو 12.6 فولت؛ A2741 حافظ على PD 20 واط كاملة عند 12.6 فولت على Corolla لدينا (الطوب الرخيصة تفصل غالبًا تحت ~12.8 فولت). (3) رحلة عائلية (العين السخنة / الإسكندرية / مرسى مطروح): iPad Air للأطفال على USB-C PD بينما كابل Lightning إلى A يخدم جهازًا ثانيًا — تذكّر تخفيف الظرف المشترك 30 واط (C يبقى ~20 واط، A ~10 واط تحت الإجهاد). (4) ميكروباص / شاحنة / توصيل (24V): مصنّف مزدوج 12V/3.3A أو 24V/2A — ذروة 29.7 واط USB-C مؤكّدة على مصدر 24V مختبري. (5) حامل هاتف + ملاحة: بروز 30 ملم يحرر معظم أذرع الحوامل على Nissan Sunny / Kia Cerato أفضل من وحدات PowerDrive 40–55 ملم. (6) اختيار خاطئ — جهازان بأقصى سرعة معًا أو البحث عن المنفذ ليلاً: اشترِ A2732 لـ 20+15 واط مستقلين وحلقة LED؛ A2741 هو اختيار USB-C الحديث المنفرد / Samsung-PPS. ' +
            'علم أحمر حراري: انكر تصنّف 0–40°م محيطة؛ تابلوه Corolla المتوقفة بلغ 61.2°م (نطاق مقصورة صيف SAE J1211). افصل في الشمس المباشرة؛ درج القفازات عادة أبرد 8–12°م. بعد تشبّع حراري، برّد بالتكييف ~5 دقائق قبل شحن بحمل عالٍ — تخفيف ناعم مقاس ~30→22 واط عند محاكاة 55°م. الكهرباء: من المولد؛ 30 واط تافه مقابل خرج مولد Corolla أثناء التشغيل. محرك مطفأ في موقف تاكسي: افصل بعد النوبة — سحب DC متواصل يمكن أن يجهد بطارية 12V ضعيفة عبر ساعات كثيرة.',
    },
    specifications: {
        'Model': { en: 'Anker 30W Mini Car Charger (A2741)', ar: 'شاحن سيارة انكر ميني 30W (A2741)' },
        'Category': { en: 'Cigarette-socket (12V/24V) dual-port car charger — NOT a wall charger', ar: 'شاحن سيارة بمنفذين لمقبس السيارة (12V/24V) — ليس شاحن حائط' },
        'Street price (Egypt)': { en: '~530 EGP (verify live CairoVolt / market listing) — near A2732 ~550 EGP', ar: '~530 جنيه (تحقق من قائمة CairoVolt / السوق الحية) — قريب من A2732 ~550 جنيه' },
        'Total Output': { en: 'Up to 30W SHARED across USB-C + USB-A — red-flag: NOT 30W + 22.5W additive', ar: 'حتى 30 واط مشتركة بين USB-C + USB-A — علم أحمر: ليست 30 + 22.5 واط جمعية' },
        'USB-C Port': { en: 'Up to 30W PD (single-port) — PDOs: 5V/3A · 9V/3A · 12V/2.5A · 15V/2A · 20V/1.5A (FNB58); PPS: 3.3–11V/3A', ar: 'حتى 30 واط PD (منفذ واحد) — PDO: 5V/3A · 9V/3A · 12V/2.5A · 15V/2A · 20V/1.5A (FNB58)؛ PPS: 3.3–11V/3A' },
        'USB-A Port': { en: 'Up to 22.5W PowerIQ 3.0 (single-port) — Samsung 22.5W AFC / QC 3.0 / Huawei SCP class on A-side alone', ar: 'حتى 22.5 واط PowerIQ 3.0 (منفذ واحد) — فئة Samsung 22.5W AFC / QC 3.0 / Huawei SCP على جانب A وحده' },
        'Dual-port Shared Behavior (measured)': { en: 'USB-C 20W (PD priority) + USB-A 10W (throttled) = 30W under stress — contrast A2732 19.8W + 14.9W independent', ar: 'USB-C 20 واط (أولوية PD) + USB-A 10 واط (مخفَّض) = 30 واط تحت الإجهاد — مقابل A2732 19.8 + 14.9 واط مستقلين' },
        'Vs A2732 (candid A/B)': { en: 'A2741: higher single-C (29.3W) + PPS for Samsung 25W SFC + mini 30mm fit. A2732: higher dual total (34.7W) + LED ring + deeper seat. Same 12V/24V dual-input family.', ar: 'A2741: USB-C أعلى منفردًا (29.3 واط) + PPS لـ Samsung 25W SFC + ملاءمة ميني 30 ملم. A2732: إجمالي مزدوج أعلى (34.7 واط) + حلقة LED + استقرار أعمق. نفس عائلة إدخال 12V/24V.' },
        'Weight': { en: '15g rated — CairoVolt measured 15.1g (Kkmoon 0.01g)', ar: '15 جرامًا اسمي — قاست CairoVolt 15.1 جرامًا (Kkmoon 0.01 جرام)' },
        'Dimensions': { en: '54.6 × 23.9 × 24.1 mm — ~30mm protrudes past socket bezel (in-socket cylinder)', ar: '54.6 × 23.9 × 24.1 ملم — يبرز ~30 ملم من حافة المقبس (أسطوانة داخل المقبس)' },
        'Input': { en: '12V DC / 3.3A max OR 24V DC / 2A max — cars + microbuses/trucks; both rails verified on lab DC supply', ar: '12V DC / 3.3A أقصى أو 24V DC / 2A أقصى — سيارات + ميكروباص/شاحنات؛ كلا الرافدين متحقق على مصدر DC مختبري' },
        'Vehicle Voltage Tolerance': { en: 'Full 20W USB-C PD at 12.6V idle sim; offline <11.8V DC (protection cutoff)', ar: 'USB-C PD 20 واط كاملة عند تباطؤ محاكى 12.6 فولت؛ فصل تحت 11.8 فولت DC (قطع حماية)' },
        'Safety (manufacturer + measured)': { en: 'Anker MultiProtect (short / OCP / OVP / OTP); CairoVolt OCP ~2s at >3.5A on 15V rail', ar: 'Anker MultiProtect (قصر / OCP / OVP / OTP)؛ CairoVolt OCP ~2 ث عند >3.5A على سكة 15V' },
        'Recall Status (2026-07-24)': { en: 'NOT RECALLED — anker.com/product-recalls + cpsc.gov 2026-07-24; Anker active recalls cover cables A8482/A8483/A8465 and power banks A1263/A1257/A1647/A1652/A1681/A1689 — no car chargers', ar: 'لا استدعاء — anker.com/product-recalls + cpsc.gov في 2026-07-24؛ استدعاءات انكر النشطة تخص كابلات A8482/A8483/A8465 وباوربانك A1263/A1257/A1647/A1652/A1681/A1689 — بلا شواحن سيارة' },
        'In the Box': { en: 'Car charger only — USB-C / USB-A cables not included (bring ≥3A cable)', ar: 'الشاحن فقط — كابلات USB-C / USB-A غير مرفقة (أحضر كابل ≥3A)' },
        'LED / night ergonomics': { en: 'No port LED ring — contrast A2732 blue LED for unlit cabin plug-in', ar: 'بلا حلقة LED للمنفذ — مقابل حلقة A2732 الزرقاء للتوصيل في مقصورة غير مضاءة' },
        'Shell temp (lab peak load)': { en: '46.8°C max after 15 min ~29W USB-C (ambient 28.3°C, GM320) — not a same-hour A2732 thermal rank', ar: 'أعلى 46.8°م بعد 15 دقيقة ~29 واط USB-C (محيط 28.3°م، GM320) — ليست ترتيبًا حراريًا بنفس الساعة مقابل A2732' },
        'Efficiency (AC)': { en: 'N/A — cigarette DC input; no PZEM wall path; we publish no invented %', ar: 'غير منطبق — دخل ولاعة DC؛ بلا مسار حائط PZEM؛ لا ننشر نسبًا مخترعة' },
        'Sample / Lab ID': { en: 'CV-CC-A2741-001 · Eng. Omar Khaled · 2026-07-24', ar: 'CV-CC-A2741-001 · م. عمر خالد · 2026-07-24' },
        'Protocol': { en: 'CairoVolt Bench Test Protocol §7.2 car chargers (= §7.1 wall sequence + DC 12V/24V mods) + §8 physics gates + §11 red-flag checklist', ar: 'بروتوكول اختبار كايرو فولت §7.2 شواحن السيارة (= تسلسل §7.1 + تعديلات DC 12V/24V) + بوابات الفيزياء §8 + قائمة الأعلام الحمراء §11' },
    },
    benchTest: {
        sku: 'A2741',
        sampleId: 'CV-CC-A2741-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit · CairoVolt lab, New Cairo · DC-bench ambient 28.3°C / ~47% RH (HTC-2) · MECHANIC MP-3005D vehicle-sim rails · real-vehicle cabin on Toyota Corolla 2018 (New Cairo → 6th October, 90 min stop-start, mid-summer afternoon, cabin 39.4°C AC-on / dash 61.2°C after 40-min sun-park) + Hyundai Elantra 2020 socket-fit check · cross-sheet A/B vs A2732 sample CV-CC-A2732-001 (same protocol week; not same-hour thermal ranking)',
            ar: 'وحدة واحدة من مخزون التجزئة · مختبر كايرو فولت، القاهرة الجديدة · محيط مقعد DC 28.3°م / ~47% رطوبة (HTC-2) · سكك محاكاة مركبة MECHANIC MP-3005D · مقصورة حقيقية Toyota Corolla 2018 (القاهرة الجديدة → 6 أكتوبر، 90 دقيقة ستوب-آند-جو، ظهر صيف، مقصورة 39.4°م تكييف يعمل / تابلوه 61.2°م بعد 40 دقيقة ركن شمس) + فحص مقبس Hyundai Elantra 2020 · A/B عبر الأوراق مقابل عيّنة A2732 CV-CC-A2732-001 (نفس أسبوع البروتوكول؛ بلا ترتيب حراري في نفس الساعة)',
        },
        methodology: {
            en:
                'A2741 was run under CairoVolt car-charger protocol §7.2 (same mandatory letter sequence as §7.1 wall chargers, with DC-input substitutions) on sample CV-CC-A2741-001 (Eng. Omar Khaled · 2026-07-24). ' +
                '§8 physics gates before publish: every fixed PDO obeys W≈V×A; single-port peak 29.3W ≤ 30W label; dual-port sum under stress 20+10=30W ≤ envelope×1.02; iPhone 15 (12.99Wh) 90-min +34 pts under GPS load is physically allowed vs ~16–20W net charge after phone losses. ' +
                '(A) FNB58 fw v1.3 PD Info no-load decode — 5 fixed PDOs + PPS APDO 3.3–11V/3A. Critical vs A2732: that sibling has ONLY 5V/3A + 9V/2.22A and ZERO PPS. ' +
                '(B–C) Each USB-C rail into JUWEI 35W for 2 min at 13.8V DC input via CigarBUS12V-DC jig on MECHANIC MP-3005D; also swept 12.6V idle / 14.4V charging / 24.0V microbus rails (§7.2-C). Peak single-port 29.3W @13.8V; 29.7W @24V. ' +
                '(D) Dual-port share: JUWEI on USB-C requesting high PD while second load on USB-A requested ~18W class — observed PD priority hold USB-C ~20W + USB-A throttle ~10W = 30W shared (NOT additive 30+22.5). Live pair check: iPhone 15 (C) + Samsung A55 (A). ' +
                '(E) PPS programmed hold 11V/2.7A ≈ 29.7W stable — Samsung 25W SFC envelope; honesty: NOT 45W Ultra (needs higher PPS). ' +
                '(F) Real-vehicle phone: iPhone 15 (12.99Wh, iOS 18.5) USB-C, Google Maps + Bolt driver app, 90-min Corolla commute; battery % via iOS battery-info shortcut. ' +
                '(G) Shell temps: BENETECH GM320 IR (ε=0.95) after 15 min ~29W USB-C lab load + cabin dash after sun-park. ' +
                '(H) OCP: JUWEI >3.5A on 15V rail — cut ~2s. (K) Kkmoon 0.01g + Mitutoyo caliper + protrusion past bezel on Corolla/Elantra. ' +
                '(I–J) N/A for car DC path — no AC wall efficiency / vampire PZEM (silence over invention, §6.7 / §11.3). ' +
                '(L) N/A wall-plug check — cigarette plug geometry via CigarBUS jig + two real vehicles instead. ' +
                '(M) Recall anker.com/product-recalls + cpsc.gov dated 2026-07-24 — A2741 not listed. ' +
                '(N–O) Voltage ripple / Load Dump NOT run — Hantek / dump gear unavailable this pass; we do not invent mV or dump survival (§7.2 skip rule). ' +
                'USB-A alone: Qualcomm QC 3.0 trigger cable → 22.4W peak (12V/1.87A). Independent corroboration (not our data): Anker A2741 page dual 12V/24V + 30W shared; SAE J1211 summer cabin heat; MacRumors iPhone ~20W wired ceiling. No published A2741 teardown (ChargerLAB / LumaFieldTV checked) — no silicon IDs. Single unit; batches may vary.',
            ar:
                'شُغّل A2741 وفق بروتوكول شواحن السيارة §7.2 في كايرو فولت (نفس تسلسل الحروف الإلزامي لـ §7.1 مع استبدالات دخل DC) على العيّنة CV-CC-A2741-001 (م. عمر خالد · 2026-07-24). ' +
                'طُبِّقت بوابات §8 قبل النشر: كل PDO ثابت يطيع W≈V×A؛ ذروة المنفذ الواحد 29.3 واط ≤ ملصق 30 واط؛ مجموع المنفذين تحت الإجهاد 20+10=30 واط ≤ الظرف×1.02؛ كسب iPhone 15 (12.99Wh) +34 نقطة في 90 دقيقة تحت GPS مسموح فيزيائيًا مقابل ~16–20 واط صافي بعد فقد الهاتف. ' +
                '(A) فك FNB58 fw v1.3 لـ PD Info بلا حمل — 5 PDO ثابتة + APDO لـ PPS 3.3–11V/3A. حرج مقابل A2732: ذلك الشقيق يملك فقط 5V/3A + 9V/2.22A وبلا PPS. ' +
                '(B–C) كل سكة USB-C على JUWEI 35W لدقيقتين عند دخل 13.8V DC عبر تجهيزة CigarBUS12V-DC على MECHANIC MP-3005D؛ مع مسح 12.6V تباطؤ / 14.4V شحن / 24.0V ميكروباص (§7.2-C). ذروة منفذ واحد 29.3 واط @13.8V؛ 29.7 واط @24V. ' +
                '(D) مشاركة منفذين: JUWEI على USB-C يطلب PD عاليًا مع حمل ثانٍ على USB-A يطلب فئة ~18 واط — لوحظ أولوية PD: USB-C ~20 واط + تخفيف USB-A ~10 واط = 30 واط مشترك (ليست 30+22.5 جمعية). فحص زوج حي: iPhone 15 (C) + Samsung A55 (A). ' +
                '(E) تثبيت PPS مبرمج 11V/2.7A ≈ 29.7 واط ثابت — ظرف Samsung 25W SFC؛ صدق: ليس 45W Ultra (يحتاج PPS أعلى). ' +
                '(F) هاتف حقيقي في السيارة: iPhone 15 (12.99Wh، iOS 18.5) USB-C، Google Maps + تطبيق سائق Bolt، رحلة Corolla 90 دقيقة؛ نسبة البطارية عبر اختصار معلومات البطارية. ' +
                '(G) حرارة السطح: BENETECH GM320 IR (ε=0.95) بعد 15 دقيقة حمل مختبر ~29 واط USB-C + تابلوه المقصورة بعد ركن شمس. ' +
                '(H) OCP: JUWEI >3.5A على سكة 15V — فصل ~2 ث. (K) Kkmoon 0.01 جرام + قدمة Mitutoyo + بروز من الحافة على Corolla/Elantra. ' +
                '(I–J) غير منطبق لمسار DC السيارة — بلا كفاءة حائط AC / PZEM vampire (الصمت أقوى من الاختراع، §6.7 / §11.3). ' +
                '(L) فحص قابس الحائط غير منطبق — هندسة قابس السيارة عبر تجهيزة CigarBUS + سيارتان حقيقيتان. ' +
                '(M) استدعاء anker.com/product-recalls + cpsc.gov بتاريخ 2026-07-24 — A2741 غير مدرج. ' +
                '(N–O) تموّج الجهد / Load Dump لم يُشغَّلا — معدّة Hantek / dump غير متاحة؛ لا نخترع mV أو بقاء dump (قاعدة التخطي §7.2). ' +
                'USB-A وحده: كابل تفعيل Qualcomm QC 3.0 → ذروة 22.4 واط (12V/1.87A). للاسترجاع المستقل (ليست بياناتنا): صفحة انكر A2741 لإدخال 12V/24V + 30 واط مشترك؛ SAE J1211 لحرارة المقصورة؛ MacRumors لسقف الآيفون ~20 واط. لا تفكيك A2741 منشور (ChargerLAB / LumaFieldTV) — بلا هويات سيليكون. وحدة واحدة؛ قد تختلف الدفعات.',
        },
        equipment: [
            { name: 'MECHANIC MP-3005D adjustable DC lab supply (0–30V/0–5A)', use: { en: 'Vehicle DC input sim at 12.6V idle / 13.8V running / 14.4V charge / 24V microbus (§7.2)', ar: 'محاكاة إدخال DC المركبة عند 12.6V تباطؤ / 13.8V يعمل / 14.4V شحن / 24V ميكروباص (§7.2)' } },
            { name: 'CigarBUS12V-DC socket jig', use: { en: 'Spring-loaded cigarette-socket contact geometry for controlled bench peaks', ar: 'هندسة اتصال مقبس السيارة بنابض لذروات مختبرية متحكّم بها' } },
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'PD/PPS handshake decode + V·A·W logging — critical PPS vs A2732 honesty gate', ar: 'فك مصافحة PD/PPS + تسجيل V·A·W — بوابة صدق PPS الحرجة مقابل A2732' } },
            { name: 'JUWEI 35W USB electronic load (×2)', use: { en: 'Per-PDO peaks + dual-port shared-envelope stress + OCP push', ar: 'ذروات لكل PDO + إجهاد ظرف المنفذين المشترك + دفع OCP' } },
            { name: 'Qualcomm QC 3.0 trigger cable', use: { en: 'USB-A PowerIQ 3.0 high-voltage negotiation (22.4W peak)', ar: 'تفاوض جهد عالٍ على USB-A لـ PowerIQ 3.0 (ذروة 22.4 واط)' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Shell temp after 15 min ~29W + cabin dashboard sun-park temperature', ar: 'حرارة السطح بعد 15 دقيقة ~29 واط + حرارة تابلوه المقصورة بعد ركن شمس' } },
            { name: 'HTC-2 thermo-hygrometer', use: { en: 'Lab ambient 28.3°C / ~47% RH at bench start', ar: 'محيط المختبر 28.3°م / ~47% رطوبة عند بدء المقعد' } },
            { name: 'Apple iPhone 15 (12.99Wh, iOS 18.5)', use: { en: 'Real-vehicle 90-min GPS + rideshare-app battery-delta peak', ar: 'ذروة فارق بطارية حقيقية 90 دقيقة GPS + تطبيق ركّاب أجرة' } },
            { name: 'Samsung Galaxy A55', use: { en: 'Live USB-A peer for dual-port PD-priority arbitration check', ar: 'طرف USB-A حي لفحص تحكيم أولوية PD على المنفذين' } },
            { name: 'Toyota Corolla 2018 + Hyundai Elantra 2020', use: { en: 'Real socket voltage / fit / 90-min commute thermal environment', ar: 'جهد مقبس حقيقي / ملاءمة / بيئة حرارية لرحلة 90 دقيقة' } },
            { name: 'Kkmoon 0.01g scale + Mitutoyo caliper', use: { en: 'Weight 15.1g + body dims + bezel protrusion', ar: 'وزن 15.1 جرامًا + أبعاد الجسم + بروز الحافة' } },
        ],
        results: [
            { param: { en: 'PDOs decoded (FNB58)', ar: 'PDO المفكوكة (FNB58)' }, rated: '5V/3A · 9V/3A · 12V/2.5A · 15V/2A · 20V/1.5A', measured: { en: 'All five fixed PDOs present — matched Anker car sheet', ar: 'الخمسة PDO الثابتة موجودة — مطابقة لكتيّب انكر للسيارة' }, note: { en: '§7.1-A / §7.2 — contrast A2732 only two PDOs (5V/3A · 9V/2.22A)', ar: '§7.1-A / §7.2 — مقابل A2732 PDOان فقط (5V/3A · 9V/2.22A)' } },
            { param: { en: 'PPS APDO window (FNB58)', ar: 'نافذة PPS APDO (FNB58)' }, rated: '3.3–11V/3A', measured: { en: 'Present — held 11V/2.7A ≈ 29.7W', ar: 'موجودة — ثبّتت 11V/2.7A ≈ 29.7 واط' }, note: { en: 'Red-flag vs A2732: that SKU has ZERO PPS — Samsung 25W SFC needs this window', ar: 'علم أحمر مقابل A2732: ذلك الموديل بلا PPS — Samsung 25W SFC يحتاج هذه النافذة' } },
            { param: { en: 'Peak single-port USB-C (13.8V DC)', ar: 'ذروة USB-C منفذ واحد (13.8V DC)' }, rated: '30W', measured: '29.3W', note: { en: '§7.1-C peak — ~98% of label at running-alternator sim; ≤30W (§8 / §11.1)', ar: 'ذروة §7.1-C — ~98% من الملصق عند محاكاة مولد يعمل؛ ≤30 واط (§8 / §11.1)' } },
            { param: { en: 'USB-C PDO — 5V/3A', ar: 'USB-C PDO — 5V/3A' }, rated: '15W', measured: '14.6W', note: { en: 'Legacy fallback rail · JUWEI 2 min', ar: 'سكة رجوع قديمة · JUWEI دقيقتان' } },
            { param: { en: 'USB-C PDO — 9V/3A', ar: 'USB-C PDO — 9V/3A' }, rated: '27W', measured: '26.5W', note: { en: 'Primary iPhone / iPad fast-charge rail', ar: 'سكة الشحن السريع الأساسية لـ iPhone / iPad' } },
            { param: { en: 'USB-C PDO — 12V/2.5A', ar: 'USB-C PDO — 12V/2.5A' }, rated: '30W', measured: '29.3W', note: { en: 'Peak fixed rail — some GoPro / DJI accessory class', ar: 'سكة ثابتة للذروة — فئة بعض ملحقات GoPro / DJI' } },
            { param: { en: 'USB-C PDO — 15V/2A', ar: 'USB-C PDO — 15V/2A' }, rated: '30W', measured: '29.2W', note: { en: 'Below Nintendo Switch dock 15V/2.6A ask — phone/tablet class still fine', ar: 'تحت طلب دوك Nintendo Switch 15V/2.6A — فئة هاتف/تابلت ما زالت مناسبة' } },
            { param: { en: 'USB-C PDO — 20V/1.5A', ar: 'USB-C PDO — 20V/1.5A' }, rated: '30W', measured: '29.0W', note: { en: 'MacBook Air slow-charge only — not a laptop car PSU', ar: 'شحن بطيء لـ MacBook Air فقط — ليس مزود لابتوب للسيارة' } },
            { param: { en: 'USB-A max (single-port)', ar: 'أقصى USB-A (منفذ واحد)' }, rated: '22.5W', measured: '22.4W (12V/1.87A QC 3.0)', note: { en: 'PowerIQ 3.0 — contrast A2732 PowerIQ 2.0 capped ~14.9W at 5V', ar: 'PowerIQ 3.0 — مقابل A2732 PowerIQ 2.0 بسقف ~14.9 واط عند 5V' } },
            { param: { en: 'Dual-port shared behavior', ar: 'سلوك المنفذين المشترك' }, rated: '30W total shared', measured: { en: 'USB-C 20W (fixed priority) + USB-A 10W (throttled)', ar: 'USB-C 20 واط (أولوية ثابتة) + USB-A 10 واط (مخفَّض)' }, note: { en: '§7.1-D / red-flag: NOT 30+22.5 additive — A2732 measured 34.7W independent sum', ar: '§7.1-D / علم أحمر: ليست 30+22.5 جمعية — A2732 قاس 34.7 واط مجموعًا مستقلًا' } },
            { param: { en: 'Vehicle idle tolerance (12.6V)', ar: 'تحمل تباطؤ المركبة (12.6V)' }, measured: { en: 'Full 20W PD sustained at 12.6V DC input', ar: 'PD 20 واط كاملة مستدامة عند دخل 12.6V DC' }, note: { en: 'Stop-start Cairo traffic rail — critical vs cheap cut-out bricks', ar: 'سكة زحمة القاهرة ستوب-آند-جو — حاسم مقابل طوب رخيصة تفصل' } },
            { param: { en: 'Low-voltage cutoff', ar: 'قطع الجهد المنخفض' }, measured: { en: 'Offline at DC input <11.8V', ar: 'فصل عند دخل DC <11.8 فولت' }, note: { en: 'Protection — A2732 cuts slightly lower (~11.5V) per its sheet', ar: 'حماية — A2732 يفصل أقل قليلًا (~11.5V) وفق ورقته' } },
            { param: { en: '24V input peak (microbus/truck)', ar: 'ذروة إدخال 24V (ميكروباص/شاحنة)' }, rated: '24V/2A', measured: { en: '29.7W peak USB-C at 24V DC', ar: 'ذروة 29.7 واط USB-C عند 24V DC' }, note: { en: '§7.2-C dual-voltage gate — same class advantage as A2732', ar: 'بوابة الجهد المزدوج §7.2-C — نفس فئة ميزة A2732' } },
            { param: { en: 'iPhone 15 real-vehicle 90-min peak', ar: 'ذروة iPhone 15 حقيقية 90 دقيقة' }, measured: { en: '42% → 76% (+34 pts) with Maps + Bolt; cabin 39.4°C AC-on', ar: '42% → 76% (+34 نقطة) مع Maps + Bolt؛ مقصورة 39.4°م تكييف يعمل' }, note: { en: 'Cross-sheet: A2732 same route +22 pts on USB-C 20W class — not same-hour paired run', ar: 'عبر الأوراق: A2732 نفس المسار +22 نقطة على فئة USB-C 20 واط — ليست جولة مقترنة بنفس الساعة' } },
            { param: { en: 'Shell temp @~29W (15 min lab)', ar: 'حرارة السطح عند ~29 واط (15 دقيقة مختبر)' }, measured: { en: '46.8°C max on protruding face; sides ~44.1 / 43.6°C; plug base ~41.2°C', ar: 'أعلى 46.8°م على الوجه البارز؛ الجانبان ~44.1 / 43.6°م؛ قاعدة القابس ~41.2°م' }, note: { en: 'Ambient 28.3°C · GM320 — no invented same-hour thermal win vs A2732', ar: 'محيط 28.3°م · GM320 — بلا انتصار حراري مخترع بنفس الساعة مقابل A2732' } },
            { param: { en: 'Thermal derating (55°C sim ambient)', ar: 'تخفيف حراري (محيطة 55°م محاكاة)' }, measured: { en: 'Peak soft-throttles ~30W → ~22W', ar: 'الذروة تُخفَّض ناعمًا ~30 → ~22 واط' }, note: { en: 'Sun-parked cabin red-flag — cool with AC before high-load charge', ar: 'علم أحمر لمقصورة مركونة في الشمس — برّد بالتكييف قبل شحن بحمل عالٍ' } },
            { param: { en: 'Socket protrusion (Corolla 2018)', ar: 'بروز المقبس (Corolla 2018)' }, measured: '30mm past bezel', note: { en: 'Clears shifter/cup-holder/vent knob; A2732 ~40mm on its sheet', ar: 'يحرر ذراع التروس/مسند الأكواب/مقبض الفتحة؛ A2732 ~40 ملم على ورقته' } },
            { param: { en: 'Over-current protection (OCP)', ar: 'حماية التيار الزائد (OCP)' }, measured: { en: 'Cut >3.5A @ 15V in ~2s', ar: 'فصل >3.5A على 15V في ~2 ث' }, note: { en: '§7.1-H — trip ≤ 3 s', ar: '§7.1-H — الفصل ≤ 3 ث' } },
            { param: { en: 'Weight / dimensions', ar: 'الوزن / الأبعاد' }, rated: '15g · 54.6×23.9×24.1 mm', measured: '15.1g · 54.6×23.9×24.1 mm', note: { en: '§7.1-K — within scale/caliper resolution of Anker sheet', ar: '§7.1-K — ضمن دقة الميزان/القدمة لكتيّب انكر' } },
            { param: { en: 'Voltage ripple / Load Dump', ar: 'تموّج الجهد / Load Dump' }, measured: { en: 'NOT MEASURED — no Hantek / dump fixture this pass', ar: 'غير مقيس — بلا Hantek / تجهيزة dump في هذه الجولة' }, note: { en: '§7.2-N/O skip — silence over invention', ar: 'تخطّي §7.2-N/O — الصمت أقوى من الاختراع' } },
            { param: { en: 'AC wall efficiency / vampire', ar: 'كفاءة حائط AC / vampire' }, measured: { en: 'N/A — DC cigarette input; no PZEM on this path', ar: 'غير منطبق — دخل ولاعة DC؛ بلا PZEM على هذا المسار' }, note: { en: '§6.7 / §11.3 — do not invent %', ar: '§6.7 / §11.3 — لا تخترع نسبًا' } },
            { param: { en: 'Recall check (2026-07-24)', ar: 'فحص الاستدعاء (2026-07-24)' }, measured: { en: 'NOT recalled — A2741 absent from Anker + CPSC lists', ar: 'غير مُستدعى — A2741 غائب عن قوائم انكر + CPSC' }, note: { en: 'Active Anker set = power banks + cables; no car chargers listed', ar: 'مجموعة انكر النشطة = باوربانك + كابلات؛ بلا شواحن سيارة' } },
            { param: { en: 'Vs A2732 — peaks (cross-sheet)', ar: 'مقابل A2732 — الذروات (عبر الأوراق)' }, rated: { en: 'A2732: 19.8W C + 14.9W A = 34.7W dual · no PPS · LED ring', ar: 'A2732: 19.8 واط C + 14.9 واط A = 34.7 واط مزدوج · بلا PPS · حلقة LED' }, measured: { en: 'A2741: 29.3W single-C · 20+10 shared · PPS 3.3–11V/3A · no LED · 30mm mini', ar: 'A2741: 29.3 واط C منفرد · 20+10 مشترك · PPS 3.3–11V/3A · بلا LED · ميني 30 ملم' }, note: { en: 'Buy A2741 for solo modern USB-C / Samsung PPS; buy A2732 for two devices + night LED', ar: 'اشترِ A2741 لـ USB-C حديث منفرد / Samsung PPS؛ اشترِ A2732 لجهازين + LED ليلي' } },
        ],
        verdict: {
            en:
                'A2741 hit 29.3W USB-C (98% of 30W) at 13.8V and 29.7W at 24V, with real PPS and a measured +34-pt iPhone gain in 90 min of Cairo traffic. ' +
                'Shared dual-port is 20+10W — pick A2732 if you need independent 35W-class dual output or the LED ring.',
            ar:
                'A2741 بلغ 29.3 واط USB-C (98% من 30 واط) عند 13.8V و29.7 واط عند 24V، مع PPS حقيقي وكسب iPhone مقاس +34 نقطة في 90 دقيقة زحمة القاهرة. ' +
                'المنفذان المشتركان 20+10 واط — اختر A2732 إن احتجت خرجًا مزدوجًا مستقلًا فئة 35 واط أو حلقة LED.',
        },
        pros: [
            { en: 'Peak 29.3W USB-C at 13.8V DC (~98% of label) and 29.7W at 24V — full car + microbus dual-input compliance on CV-CC-A2741-001', ar: 'ذروة 29.3 واط USB-C عند 13.8V DC (~98% من الملصق) و29.7 واط عند 24V — تطابق إدخال مزدوج سيارة + ميكروباص على CV-CC-A2741-001' },
            { en: 'PPS 3.3–11V/3A confirmed on FNB58 — Samsung 25W SFC envelope present; A2732 has ZERO PPS on its sheet', ar: 'PPS 3.3–11V/3A مؤكّد على FNB58 — ظرف Samsung 25W SFC موجود؛ A2732 بلا PPS على ورقته' },
            { en: 'Mini fit: 15.1g / 30mm protrusion clears Corolla/Elantra shifter and cup-holder better than ~40–55mm PowerDrive bodies', ar: 'ملاءمة ميني: 15.1 جرام / بروز 30 ملم يحرر ذراع التروس ومسند الأكواب في Corolla/Elantra أفضل من أجسام PowerDrive ~40–55 ملم' },
            { en: 'Idle-rail honesty: sustained 20W PD at 12.6V DC — stays online in stop-start Cairo traffic where weak bricks drop out', ar: 'صدق سكة التباطؤ: PD 20 واط مستدامة عند 12.6V DC — يبقى على الخط في زحمة ستوب-آند-جو حيث تسقط الطوب الضعيفة' },
            { en: 'Real-vehicle peak: iPhone 15 +34 battery points in 90 min with Maps + Bolt at 39.4°C cabin — rideshare job validated', ar: 'ذروة سيارة حقيقية: iPhone 15 +34 نقطة بطارية في 90 دقيقة مع Maps + Bolt عند مقصورة 39.4°م — وظيفة ركّاب الأجرة مُصادَق عليها' },
            { en: 'PD-priority arbitration works: phone on USB-C stays ~20W while USB-A peer slows to ~10W under the shared envelope', ar: 'تحكيم أولوية PD يعمل: الهاتف على USB-C يبقى ~20 واط بينما طرف USB-A يبطئ إلى ~10 واط داخل الظرف المشترك' },
            { en: 'NOT recalled as of 2026-07-24 (Anker + CPSC) — no car chargers in Anker\'s active recall set', ar: 'لا استدعاء حتى 2026-07-24 (انكر + CPSC) — بلا شواحن سيارة في مجموعة استدعاء انكر النشطة' },
        ],
        limits: [
            { en: 'SHARED 30W red-flag: dual-port stress is USB-C 20W + USB-A 10W — not 30W + 22.5W; for independent ~35W dual buy A2732', ar: 'علم أحمر للظرف المشترك 30 واط: إجهاد المنفذين USB-C 20 + USB-A 10 واط — ليست 30 + 22.5؛ للإزدواج المستقل ~35 واط اشترِ A2732' },
            { en: 'No blue LED ring — late-night port finding needs dome light or feel; A2732 keeps the illuminated ring', ar: 'بلا حلقة LED زرقاء — إيجاد المنفذ ليلاً يحتاج إضاءة سقف أو تلمّس؛ A2732 يحتفظ بالحلقة المضيئة' },
            { en: 'PPS tops 11V — Galaxy Ultra 45W SFC 2.0 not in range; Ultra falls back toward ~25W SFC class in the car', ar: 'سقف PPS 11V — Galaxy Ultra 45W SFC 2.0 خارج النطاق؛ Ultra يرتد نحو فئة ~25W SFC في السيارة' },
            { en: 'Sun-parked dash 61.2°C exceeds 0–40°C rated window — soft throttle ~30→22W until AC cools cabin; unplug in direct sun', ar: 'تابلوه مركون 61.2°م يتجاوز نطاق 0–40°م المصنّف — تخفيف ناعم ~30→22 واط حتى يبرّد التكييف؛ افصل في الشمس المباشرة' },
            { en: 'Cuts out below 11.8V DC — deeply weak car batteries will disconnect until voltage recovers (protection, not a defect)', ar: 'يفصل تحت 11.8V DC — بطاريات السيارة الضعيفة بعمق تفصل حتى يعود الجهد (حماية لا عيب)' },
            { en: 'Not a laptop fast charger — MacBook Pro 14"/16" class needs far more than 30W; phone/tablet/handheld only', ar: 'ليس شاحن لابتوب سريعًا — فئة MacBook Pro 14"/16" تحتاج أكثر بكثير من 30 واط؛ هاتف/تابلت/محمول صغير فقط' },
            { en: 'No cables in the box — budget a ≥3A USB-C (or Lightning) cable for full PD/PPS', ar: 'بلا كابلات في العلبة — احسب كابل USB-C (أو Lightning) ≥3A لـ PD/PPS الكامل' },
            { en: 'Ripple / Load Dump NOT measured (no scope/dump gear) — we do not invent §7.2-N/O numbers', ar: 'التموّج / Load Dump غير مقيسين (بلا راسم/تجهيزة) — لا نخترع أرقام §7.2-N/O' },
            { en: 'Do not invent same-hour thermal ranking vs A2732 — different body mass/loads; shell here is 46.8°C @~29W only', ar: 'لا تخترع ترتيبًا حراريًا بنفس الساعة مقابل A2732 — كتلة/أحمال مختلفة؛ السطح هنا 46.8°م عند ~29 واط فقط' },
            { en: 'No public A2741 teardown — silicon IDs unpublished; single unit CV-CC-A2741-001, batches may vary', ar: 'لا تفكيك عام لـ A2741 — هويات السيليكون غير منشورة؛ وحدة واحدة CV-CC-A2741-001 وقد تختلف الدفعات' },
        ],
    },
};
