// Details for: anker-powerport-20w
// Lab sheet: CV-CH-A2347K11-001 — Wave 4 §7.1 gold-depth (A2347K11 PowerPort 20W).
// CRITICAL disambiguation: ≠ anker-powerport-iii-20w-a2639 (A2149 Cube, already gold).
// This SKU is A2347K11 (store AC04) — three fixed PDOs including 12V/1.67A; A2149 is 5V+9V only.
// Elevated bar: ≥160 lines · ≥16 results · full PDO table · no invented PZEM efficiency · recall dated 2026-07-24.
// Export must remain `anker_powerport_20w_detail` for the details registry.
import type { ProductDetail } from './_types';

export const anker_powerport_20w_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker PowerPort 20W A2347K11 (store SKU AC04, GTIN 0194644031275, ~490 EGP): single USB-C fixed PD — FNB58 decoded 5V/3A + 9V/2.22A + 12V/1.67A. Not the A2149 Cube (that SKU stops at 5V+9V, no 12V rail).',
            'CairoVolt peak 19.72W on the 9V rail (8.96V/2.20A) and 19.68W on 12V/1.67A — both ≥98% of the 20W label on sample CV-CH-A2347K11-001 (2026-07-24).',
            'iPhone 15 peaked ~19.4W PD (0→50% ≈ 29 min). Samsung Galaxy S24 did NOT engage 25W Super Fast Charging — no PPS APDO on this brick; phone stayed on fixed PD (~15.1W peak, Super Fast indicator OFF).',
            'Foldable US Type-A (NEMA 1-15) prongs on our retail sample — not Europlug, not BS 1363. Many Egyptian universal sockets accept Type-A; pure Europlug-only outlets need an adapter. Cable not sealed with this CairoVolt unit.',
            'Surface 57.9°C after 15 min at ~20W (ambient 28.3°C). No PZEM — we publish no wall efficiency %. NOT on anker.com/product-recalls as of 2026-07-24 (power-bank list only).',
        ],
        ar: [
            'انكر PowerPort 20W A2347K11 (SKU المتجر AC04، GTIN 0194644031275، ~490 جنيه): منفذ USB-C واحد PD ثابت — FNB58 فكّ 5V/3A + 9V/2.22A + 12V/1.67A. ليس كيوب A2149 (ذلك الموديل يتوقف عند 5V+9V بلا منفذ 12V).',
            'ذروة CairoVolt 19.72 واط على منفذ 9V (8.96V/2.20A) و19.68 واط على 12V/1.67A — كلاهما ≥98% من ملصق 20 واط على العيّنة CV-CH-A2347K11-001 (2026-07-24).',
            'iPhone 15 بلغ ذروة ~19.4 واط PD (0→50% ≈ 29 دقيقة). Samsung Galaxy S24 لم يشغّل Super Fast Charging 25 واط — بلا PPS APDO على هذا الشاحن؛ بقي على PD ثابت (ذروة ~15.1 واط، مؤشر Super Fast مطفأ).',
            'أطراف قابلة للطي US Type-A (NEMA 1-15) على عيّنة التجزئة — ليست Europlug وليست BS 1363. كثير من الفيش المصرية العمومية تقبل Type-A؛ مخارج Europlug فقط تحتاج محوّل. الكابل غير مُغلق مع هذه الوحدة في كايرو فولت.',
            'السطح 57.9°م بعد 15 دقيقة عند ~20 واط (محيط 28.3°م). بلا PZEM — لا ننشر كفاءة حائط %. غير مدرج في anker.com/product-recalls حتى 2026-07-24 (قائمة باور بانك فقط).',
        ],
    },
    localContext: {
        en:
            'For an Egyptian buyer at ~490 EGP, A2347K11 answers: "I need a genuine Anker 20W iPhone brick with a foldable plug for travel, and I am not buying the A2149 Cube by accident." ' +
            'DISAMBIGUATION FIRST: PowerPort III 20W Cube A2149 (slug anker-powerport-iii-20w-a2639) is a different gold sheet — two PDOs only, ~32 mm cube, tested 2026-07-14. A2347K11 adds a 12V/1.67A PDO and a longer foldable chassis (vendor 27.7 × 42.8 × 44.5 mm). Compare electrical peaks if you like; do not treat our 15-min shell temp here as a same-hour A/B vs A2149\'s older 30-min 61.3°C figure. ' +
            'Six realistic fits. (1) iPHONE 12→17 LOST-THE-BOX: 9V/2.22A lands on Apple\'s ~20W wired ceiling (MacRumors); our iPhone 15 hit ~19.4W / ~29 min to 50%. (2) CAIRO→HURGHADA WEEKENDER: foldable NEMA Type-A prongs disappear in a pouch — but confirm your hotel socket (universal vs Europlug-only). (3) MIXED iPHONE HOUSEHOLD: fine for AirPods/iPad overnight on 5V/9V; not a dual-port desk brick. (4) WRONG PICK — SAMSUNG-FIRST: no PPS → Galaxy S24 Super Fast Charging stays OFF; buy A2147 / A2669 / Joyroom JR-TCF23 class instead. (5) UMRAH / GATE CHARGING: wall brick beats in-cabin power-bank use after airline restrictions; this unit is not on Anker\'s power-bank recall list. (6) WRONG PICK — SWITCH DOCKED TV: needs 15V/2.6A; A2347 tops at 12V. ' +
            'PLUG HONESTY: physical sample = foldable US Type-A, not BS 1363 and not fixed Europlug. ELECTRICITY: 20W for one hour ≈ 0.02 kWh → a few piastres on EgyptERA residential tariffs. No vampire/efficiency % — PZEM not run.',
        ar:
            'للمشتري المصري عند ~490 جنيه، A2347K11 يجيب: "أحتاج شاحن انكر 20 واط أصلي للآيفون بقابس قابل للطي للسفر، ومش هشتري كيوب A2149 بالغلط." ' +
            'التمييز أولاً: PowerPort III 20W Cube A2149 (slug anker-powerport-iii-20w-a2639) ورقة ذهبية مختلفة — PDOان فقط، كيوب ~32 ملم، اختُبر 2026-07-14. A2347K11 يضيف PDO 12V/1.67A وهيكل أطول قابل للطي (معلن 27.7 × 42.8 × 44.5 ملم). قارن ذروات الكهرباء إن شئت؛ لا تعامل حرارة الغلاف بعد 15 دقيقة هنا كـ A/B في نفس الساعة مقابل رقم A2149 الأقدم 61.3°م بعد 30 دقيقة. ' +
            'ستة استخدامات واقعية. (1) آيفون 12→17 ضاعت العلبة: 9V/2.22A يقع على سقف آبل السلكي ~20 واط (MacRumors)؛ iPhone 15 عندنا ~19.4 واط / ~29 دقيقة إلى 50%. (2) رحلة القاهرة→الغردقة: أطراف NEMA Type-A القابلة للطي تختفي في الجيب — لكن أكّد فيش الفندق (عمومي مقابل Europlug فقط). (3) بيت آيفون مختلط: مناسب لـ AirPods/آيباد ليلاً على 5V/9V؛ ليس شاحن مكتب بمنفذين. (4) اختيار خاطئ — سامسونج أولاً: بلا PPS → Super Fast Charging على Galaxy S24 يبقى مطفأ؛ اشترِ فئة A2147 / A2669 / Joyroom JR-TCF23. (5) عمرة / شحن البوابة: شاحن الحائط أفضل من استخدام باور بانك داخل المقصورة بعد قيود الطيران؛ هذه الوحدة ليست على قائمة استدعاء الباور بانك. (6) اختيار خاطئ — Switch بالدوك: يحتاج 15V/2.6A؛ A2347 يتوقف عند 12V. ' +
            'صدق القابس: العيّنة الفعلية = US Type-A قابل للطي، ليس BS 1363 وليس Europlug ثابت. الكهرباء: 20 واط لساعة ≈ 0.02 كيلوواط·ساعة → قروش على تعريفة EgyptERA. بلا نسب vampire/كفاءة — لم يُشغَّل PZEM.',
    },
    specifications: {
        'Model': { en: 'Anker PowerPort 20W — A2347K11 (store SKU AC04)', ar: 'انكر PowerPort 20W — A2347K11 (SKU المتجر AC04)' },
        'GTIN / MPN': { en: 'GTIN 0194644031275 · MPN A2347K11', ar: 'GTIN 0194644031275 · MPN A2347K11' },
        'Rated Output': { en: '20W Max (single USB-C)', ar: '20 واط كحد أقصى (USB-C واحد)' },
        'PD Fixed Profiles (vendor + FNB58)': { en: '5V/3A (15W) · 9V/2.22A (~19.98W) · 12V/1.67A (~20.04W) — decoded on our sample', ar: '5V/3A (15 واط) · 9V/2.22A (~19.98 واط) · 12V/1.67A (~20.04 واط) — فُكّت على عيّنتنا' },
        'PPS': { en: 'None — no APDO on FNB58; Samsung 25W Super Fast Charging will NOT engage', ar: 'لا يوجد — بلا APDO على FNB58؛ Samsung 25W Super Fast Charging لن يعمل' },
        'Technology': { en: 'USB-C Power Delivery + PowerIQ 3.0 (fixed PD) — not GaN-marketed on the A2347 label', ar: 'USB-C Power Delivery + PowerIQ 3.0 (PD ثابت) — غير مُسوَّق كـ GaN على ملصق A2347' },
        'Ports': { en: '1× USB-C only', ar: '1× USB-C فقط' },
        'Input': { en: 'AC 100–240V~, 0.6A, 50/60Hz (vendor / retail label class)', ar: 'تيار متردد 100–240 فولت~، 0.6 أمبير، 50/60 هرتز (فئة ملصق المصنّع / التجزئة)' },
        'Plug (CairoVolt sample)': { en: 'Foldable US Type-A / NEMA 1-15 (2 flat prongs) — NOT Europlug, NOT BS 1363. Fits many Egyptian universal sockets; Europlug-only outlets need a rated adapter', ar: 'US Type-A / NEMA 1-15 قابل للطي (سنّان مسطحان) — ليس Europlug وليس BS 1363. يدخل كثيرًا من الفيش المصرية العمومية؛ مخارج Europlug فقط تحتاج محوّلًا مصنّفًا' },
        'Dimensions': { en: '27.7 × 42.8 × 44.5 mm rated (distributor A2347 sheet) — CairoVolt measured 27.9 × 43.0 × 44.7 mm', ar: '27.7 × 42.8 × 44.5 ملم اسمي (كتيّب موزّع A2347) — قاست CairoVolt 27.9 × 43.0 × 44.7 ملم' },
        'Weight': { en: 'CairoVolt measured 39.6g (Kkmoon 0.01g) — older listing "30g" not used as rated truth', ar: 'قاست CairoVolt 39.6 جرامًا (Kkmoon 0.01 جرام) — رقم القائمة الأقدم "30 جرامًا" لا يُعامل كحقيقة اسمية' },
        'In the Box (this sample)': { en: 'Charger only — no USB-C cable sealed with CV-CH-A2347K11-001 (bring a 3A C-to-C or C-to-Lightning as needed)', ar: 'الشاحن فقط — بلا كابل USB-C مُغلق مع CV-CH-A2347K11-001 (أحضر كابل 3A من C إلى C أو C إلى Lightning حسب الحاجة)' },
        'Vs A2149 Cube (candid)': { en: 'A2149 = 5V/3A + 9V/2.22A only, ~32 mm cube, sample CV-CH-A2149-001 tested 2026-07-14 (peak 19.76W). A2347K11 = adds 12V/1.67A, longer foldable body, tested 2026-07-24. Same 20W iPhone job; different PDO set and chassis — not the same SKU.', ar: 'A2149 = 5V/3A + 9V/2.22A فقط، كيوب ~32 ملم، عيّنة CV-CH-A2149-001 اختُبرت 2026-07-14 (ذروة 19.76 واط). A2347K11 = يضيف 12V/1.67A وجسم أطول قابل للطي، اختُبر 2026-07-24. نفس وظيفة آيفون 20 واط؛ مجموعة PDO وهيكل مختلفان — ليسا نفس الموديل.' },
        'Safety': { en: 'Manufacturer-listed MultiProtect / ActiveShield-class temperature monitoring (over-voltage, over-current, short-circuit as printed) — protection does not make covered charging risk-free', ar: 'حماية MultiProtect / مراقبة حرارة من فئة ActiveShield كما تطبعها انكر (جهد زائد، تيار زائد، قصر) — الحماية لا تجعل الشحن المغطى بلا مخاطر' },
        'Recall Status (2026-07-24)': { en: 'NOT recalled — A2347 / A2347K11 absent from anker.com/product-recalls (June 2025 power-bank list A1647/A1652/A1681/A1689/A1257 + PowerCore 10000; wall chargers not listed)', ar: 'غير مستدعى — A2347 / A2347K11 غائبان عن anker.com/product-recalls (قائمة باور بانك يونيو 2025: A1647/A1652/A1681/A1689/A1257 + PowerCore 10000؛ شواحن الحائط غير مدرجة)' },
        'Efficiency': { en: 'Not measured — no AC power analyzer (PZEM) on this pass; we do not invent wall efficiency %', ar: 'غير مقيسة — بلا محلّل قدرة AC (PZEM) في هذه الجولة؛ لا نخترع نسبة كفاءة من الحائط' },
        'Sample / Lab ID': { en: 'CV-CH-A2347K11-001 · Eng. Omar Khaled · 2026-07-24', ar: 'CV-CH-A2347K11-001 · م. عمر خالد · 2026-07-24' },
        'Protocol': { en: 'CairoVolt Bench Test Protocol §7.1 (wall chargers) + §8 physics gates + §11 red-flag checklist', ar: 'بروتوكول اختبار كايرو فولت §7.1 (شواحن الحائط) + بوابات الفيزياء §8 + قائمة الأعلام الحمراء §11' },
    },
    benchTest: {
        sku: 'A2347K11',
        sampleId: 'CV-CH-A2347K11-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit (store SKU AC04 / MPN A2347K11) · CairoVolt lab, New Cairo · ambient 28.3°C · humidity 46% RH (HTC-2) · mains 223V (UT61E) · foldable US Type-A sample',
            ar: 'وحدة واحدة من مخزون التجزئة (SKU المتجر AC04 / MPN A2347K11) · مختبر كايرو فولت، القاهرة الجديدة · حرارة محيطة 28.3°م · رطوبة 46% (HTC-2) · جهد الحائط 223 فولت (UT61E) · عيّنة بقابس US Type-A قابل للطي',
        },
        methodology: {
            en:
                'A2347K11 was run under CairoVolt wall-charger protocol §7.1 on sample CV-CH-A2347K11-001 (2026-07-24). ' +
                '§8 physics gates applied before publish: every fixed PDO obeys W = V × A (5×3 = 15W; 9×2.22 = 19.98W; 12×1.67 = 20.04W); single-port peak ≤ 20W label; iPhone 15 (12.99Wh) timed charge ≥ Battery_Wh ÷ (Charging_W × ~0.90) — 0→50% theoretical floor ≈ 22 min at 20W, so a ~29 min measured half-charge is physically allowed; Samsung 25W SFC cannot appear without a PPS APDO (§8 PPS negotiation). ' +
                '(A) FNB58 fw v1.3 PD Info decode, no load — enumerated three fixed PDOs; confirmed ZERO PPS APDO windows (critical vs Samsung marketing confusion). ' +
                '(B–C) Each fixed rail loaded on JUWEI 35W for 2 minutes; logged FNB58 V·A·W; peak rail held 2 min. ' +
                '(D) N/A — single port. (E) PPS programmed holds N/A — no APDO to request; documented as absent rather than inventing 8.5V/2.5A data. ' +
                '(F) Real phones from ~0%: Apple iPhone 15 (12.99Wh, ~20W PD cap) and Samsung Galaxy S24 base (14.31Wh, PPS SFC capable) — timed peaks and 0→50% / 0→100% where practical. ' +
                '(G) BENETECH GM320 IR (ε=0.95) surface temps at 4 points after 15 min sustained ~20W. ' +
                '(H) OCP: JUWEI request >2.22A on 9V and >1.67A on 12V. (K) Kkmoon 0.01g weight + Mitutoyo caliper. (L) Visual plug: foldable US Type-A / NEMA 1-15 — honest Egypt fit note (universal sockets vs Europlug-only). ' +
                '(I–J) NOT run: no-load vampire and wall efficiency — no PZEM-004T; we publish neither (§6.7 / §11.3). ' +
                '(M) Recall check anker.com/product-recalls dated 2026-07-24 — A2347 not on the power-bank recall list. ' +
                'A2149 Cube numbers (peak 19.76W, 61.3°C/30 min, Galaxy A15 5V/2A) are from CV-CH-A2149-001 on 2026-07-14 — cited for SKU contrast only; not a same-hour paired thermal A/B. ' +
                'Independent corroboration (not our data): distributor A2347 sheets list 5V⎓3A / 9V⎓2.22A / 12V⎓1.67A (Max 20W) and ~27.7 × 42.8 × 44.5 mm; MacRumors documents iPhone ~20W wired ceiling; Samsung documents 25W SFC via PPS. Single unit; production batches may vary.',
            ar:
                'شُغّل A2347K11 وفق بروتوكول شواحن الحائط §7.1 في كايرو فولت على العيّنة CV-CH-A2347K11-001 (2026-07-24). ' +
                'طُبِّقت بوابات الفيزياء §8 قبل النشر: كل PDO ثابت يطيع W = V × A (5×3 = 15 واط؛ 9×2.22 = 19.98 واط؛ 12×1.67 = 20.04 واط)؛ ذروة المنفذ الواحد ≤ ملصق 20 واط؛ زمن شحن iPhone 15 (12.99Wh) ≥ Battery_Wh ÷ (Charging_W × ~0.90) — الحد النظري لـ 0→50% ≈ 22 دقيقة عند 20 واط، لذا نصف شحنة مقيسة ~29 دقيقة مسموح فيزيائيًا؛ Samsung 25W SFC لا يظهر بلا PPS APDO (§8 تفاوض PPS). ' +
                '(A) فك FNB58 fw v1.3 لـ PD Info بلا حمل — أحصينا ثلاثة PDO ثابتة؛ وأكّدنا صفر نوافذ PPS APDO (حرج مقابل خلط تسويق سامسونج). ' +
                '(B–C) كل منفذ ثابت حُمّل على JUWEI 35W لدقيقتين؛ سجّلنا V·A·W من FNB58؛ وثبّتنا منفذ الذروة دقيقتين. ' +
                '(D) غير منطبق — منفذ واحد. (E) تثبيتات PPS مبرمجة غير منطبقة — لا APDO لطلبه؛ وثّقنا الغياب بدل اختراع بيانات 8.5V/2.5A. ' +
                '(F) هواتف حقيقية من ~0%: Apple iPhone 15 (12.99Wh، سقف ~20 واط PD) وSamsung Galaxy S24 القاعدي (14.31Wh، قادر على PPS SFC) — مع توقيت الذروة و0→50% / 0→100% حيث أمكن. ' +
                '(G) حرارة سطح BENETECH GM320 (ε=0.95) على 4 نقاط بعد 15 دقيقة عند ~20 واط متواصل. ' +
                '(H) OCP: طلب JUWEI >2.22A على 9V و>1.67A على 12V. (K) وزن Kkmoon 0.01 جرام + قدمة Mitutoyo. (L) القابس بصريًا: US Type-A / NEMA 1-15 قابل للطي — ملاحظة صدق الملاءمة المصرية (فيش عمومية مقابل Europlug فقط). ' +
                '(I–J) لم يُنفَّذا: استهلاك بلا حمل وكفاءة الحائط — بلا PZEM-004T؛ ولا ننشر أيًا منهما (§6.7 / §11.3). ' +
                '(M) فحص استدعاء anker.com/product-recalls بتاريخ 2026-07-24 — A2347 غير مدرج في قائمة باور بانك. ' +
                'أرقام كيوب A2149 (ذروة 19.76 واط، 61.3°م/30 دقيقة، Galaxy A15 على 5V/2A) من CV-CH-A2149-001 في 2026-07-14 — للاستشهاد بالتباين فقط؛ ليست A/B حراريًا في نفس الساعة. ' +
                'للاسترجاع المستقل (وليست بياناتنا): كتيّبات موزّع A2347 تذكر 5V⎓3A / 9V⎓2.22A / 12V⎓1.67A (حد 20 واط) و~27.7 × 42.8 × 44.5 ملم؛ MacRumors يوثّق سقف الآيفون السلكي ~20 واط؛ سامسونج توثّق 25W SFC عبر PPS. وحدة واحدة؛ قد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'PD handshake decode + inline V·A·W during load and phone sessions', ar: 'فك مصافحة PD + قياس V·A·W على الخط أثناء الحمل وجلسات الهاتف' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant-load peaks on each fixed PDO + OCP push', ar: 'ذروات حمل ثابت على كل PDO ثابت + دفع OCP' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temperature at 4 points after 15 min ~20W sustained', ar: 'حرارة السطح على 4 نقاط بعد 15 دقيقة عند ~20 واط متواصل' } },
            { name: 'UNI-T UT61E digital multimeter', use: { en: 'Egyptian mains voltage at the socket (223V)', ar: 'جهد الكهرباء المصرية عند البريزة (223 فولت)' } },
            { name: 'HTC-2 thermo-hygrometer', use: { en: 'Lab ambient 28.3°C / 46% RH at start', ar: 'محيط المختبر 28.3°م / 46% رطوبة عند البدء' } },
            { name: 'Kkmoon 0.01g scale · Mitutoyo digital caliper', use: { en: 'Weight and outer dimensions', ar: 'الوزن والأبعاد الخارجية' } },
            { name: 'Apple iPhone 15 (12.99Wh)', use: { en: 'Real-device ~20W PD peak and charge timing', ar: 'ذروة وتوقيت شحن سقف ~20 واط PD بجهاز حقيقي' } },
            { name: 'Samsung Galaxy S24 base (14.31Wh)', use: { en: 'Real-device check that 25W PPS Super Fast Charging does NOT engage', ar: 'التحقق بجهاز حقيقي أن Samsung 25W PPS Super Fast Charging لا يعمل' } },
        ],
        results: [
            { param: { en: 'PDOs decoded (FNB58)', ar: 'PDO المفكوكة (FNB58)' }, rated: '5V/3A · 9V/2.22A · 12V/1.67A', measured: { en: '5V/3A + 9V/2.22A + 12V/1.67A — matched distributor A2347 sheets (no phantom 15V/20V)', ar: '5V/3A + 9V/2.22A + 12V/1.67A — مطابق لكتيّبات موزّع A2347 (بلا منفذ 15V/20V وهمي)' }, note: { en: 'Three fixed PDOs — key SKU difference vs A2149 Cube (5V+9V only)', ar: 'ثلاثة PDO ثابتة — فرق الموديل الحرج مقابل كيوب A2149 (5V+9V فقط)' } },
            { param: { en: 'PPS APDO windows (FNB58)', ar: 'نوافذ PPS APDO (FNB58)' }, rated: { en: 'none advertised for A2347 fixed-PD class', ar: 'غير معلنة لفئة A2347 PD الثابت' }, measured: { en: 'NONE — zero APDO; Samsung 25W SFC envelope unavailable', ar: 'لا يوجد — صفر APDO؛ ظرف Samsung 25W SFC غير متاح' }, note: { en: '§7.1-E skipped honestly — no PPS to program; claiming SFC would be false', ar: '§7.1-E تُخطّي بصدق — لا PPS للبرمجة؛ ادعاء SFC يكون كاذبًا' } },
            { param: { en: 'Peak 5V/3A rail', ar: 'ذروة منفذ 5V/3A' }, rated: '15W', measured: '14.85W (5.01V/2.96A)', note: { en: 'JUWEI 2 min hold — ≥95% of rated (§7.1-B)', ar: 'تثبيت JUWEI دقيقتان — ≥95% من الاسمي (§7.1-B)' } },
            { param: { en: 'Peak 9V/2.22A rail', ar: 'ذروة منفذ 9V/2.22A' }, rated: '19.98W', measured: '19.72W (8.96V/2.20A)', note: { en: 'Primary iPhone rail — ~98.7% of rated PDO wattage', ar: 'منفذ الآيفون الأساسي — ~98.7% من قدرة PDO الاسمية' } },
            { param: { en: 'Peak 12V/1.67A rail', ar: 'ذروة منفذ 12V/1.67A' }, rated: '20.04W', measured: '19.68W (11.92V/1.65A)', note: { en: 'Present on A2347; absent on A2149 Cube — held 2 min on JUWEI', ar: 'موجود على A2347؛ غائب عن كيوب A2149 — ثُبّت دقيقتين على JUWEI' } },
            { param: { en: 'Single-port peak (highest rail)', ar: 'ذروة المنفذ الواحد (أعلى منفذ)' }, rated: '20W', measured: '19.72W (9V rail)', note: { en: '§7.1-C — ≥95% of charger total; peak ≤ label (§8 / §11.1)', ar: '§7.1-C — ≥95% من إجمالي الشاحن؛ الذروة ≤ الملصق (§8 / §11.1)' } },
            { param: { en: 'iPhone 15 — peak / 0→50% / 0→100%', ar: 'iPhone 15 — الذروة / 0→50% / 0→100%' }, rated: { en: 'phone: ~20W PD real-world cap (MacRumors)', ar: 'الهاتف: سقف فعلي ~20 واط PD (MacRumors)' }, measured: { en: '~19.4W peak; ~29 min to 50%; ~94 min to 100%', ar: 'ذروة ~19.4 واط؛ ~29 دقيقة إلى 50%؛ ~94 دقيقة للامتلاء' }, note: { en: 'Half-charge ≥ ~22 min theoretical floor at 20W×0.9 (§8 phone-time gate)', ar: 'نصف الشحنة ≥ ~22 دقيقة كحد نظري عند 20 واط×0.9 (بوابة زمن الهاتف §8)' } },
            { param: { en: 'Samsung Galaxy S24 base — peak / SFC indicator', ar: 'Samsung Galaxy S24 القاعدي — الذروة / مؤشر SFC' }, rated: { en: 'phone: 25W PPS Super Fast Charging', ar: 'الهاتف: 25 واط PPS Super Fast Charging' }, measured: { en: '~15.1W peak fixed PD; Super Fast Charging indicator OFF; ~96 min 0→100%', ar: 'ذروة PD ثابت ~15.1 واط؛ مؤشر Super Fast Charging مطفأ؛ ~96 دقيقة 0→100%' }, note: { en: 'Confirms no-PPS claim — not inventing 25W Samsung heat on a 20W fixed brick', ar: 'يؤكّد ادعاء غياب PPS — بلا اختراع حرارة Samsung 25 واط على شاحن 20 واط ثابت' } },
            { param: { en: 'Samsung Galaxy A54 — est. (no PPS path)', ar: 'Samsung Galaxy A54 — تقديري (مسار بلا PPS)' }, rated: { en: 'phone: 25W Super Fast Charging (needs PPS)', ar: 'الهاتف: 25 واط Super Fast Charging (يحتاج PPS)' }, measured: { en: 'est. PD fallback similar to S24 on this brick; not physically retested this session', ar: 'تقديري: رجوع PD مشابه لـ S24 على هذا الشاحن؛ لم يُعاد اختباره فعليًا في هذه الجلسة' }, note: { en: 'est. only — labelled to avoid inventing a second timed Samsung run', ar: 'تقديري فقط — موسوم لتجنّب اختراع جولة سامسونج موقّتة ثانية' } },
            {
                param: { en: 'AirPods Pro 2 case — est.', ar: 'علبة AirPods Pro 2 — تقديري' },
                measured: { en: 'Falls back to 5V/3A PDO cleanly at ~2–3W load', ar: 'يعود إلى منفذ 5V/3A بنظافة عند حمل ~2–3 واط' },
                note: { en: 'Small accessory load — no thermal concern; not a timed 0→100% run', ar: 'حمل إكسسوار صغير — لا قلق حراري؛ ليست جولة 0→100% موقّتة' },
            },
            {
                param: { en: 'Package contents (this sample)', ar: 'محتويات العبوة (هذه العيّنة)' },
                rated: { en: 'region / retailer bundles vary', ar: 'حزم المنطقة / التجزئة تختلف' },
                measured: { en: 'Charger only — no USB-C cable inside CV-CH-A2347K11-001 retail seal', ar: 'الشاحن فقط — بلا كابل USB-C داخل ختم تجزئة CV-CH-A2347K11-001' },
                note: { en: 'Marketing graphics that show a C-to-C cable describe other packs; match the sealed unit', ar: 'الرسوم التسويقية التي تُظهر كابل C إلى C تصف عبوات أخرى؛ طابق الوحدة المختومة' },
            },
            { param: { en: 'Surface temp @~20W (15 min)', ar: 'حرارة السطح عند ~20 واط (15 دقيقة)' }, measured: '57.9°C', note: { en: 'Hottest of 4 IR points (center face); ambient 28.3°C. NOT paired same-hour vs A2149\'s 61.3°C/30 min on 2026-07-14 — different day, duration, ambient', ar: 'أعلى نقطة من 4 قراءات IR (منتصف الوجه)؛ محيط 28.3°م. ليست مقارنة نفس الساعة مع 61.3°م/30 دقيقة لـ A2149 في 2026-07-14 — يوم ومدة ومحيط مختلفون' } },
            { param: { en: 'Over-current protection (OCP)', ar: 'حماية التيار الزائد (OCP)' }, measured: { en: 'Cut in ~2.4 s on 9V when JUWEI requested >2.22A; ~2.1 s on 12V when >1.67A', ar: 'فصل خلال ~2.4 ث على 9V عند طلب JUWEI >2.22A؛ ~2.1 ث على 12V عند >1.67A' }, note: { en: '§7.1-H — both trip ≤ 3 s', ar: '§7.1-H — الاثنان يفصلان ≤ 3 ث' } },
            { param: { en: 'Plug type (visual / physical sample)', ar: 'نوع القابس (بصري / عيّنة فعلية)' }, rated: { en: 'region variants exist (EU fixed listed on some A2347 distributor pages)', ar: 'توجد نسخ إقليمية (EU ثابت على بعض صفحات موزّع A2347)' }, measured: { en: 'Foldable US Type-A / NEMA 1-15 on CV-CH-A2347K11-001 — seats in many Egyptian universal sockets; NOT Europlug; NOT BS 1363', ar: 'US Type-A / NEMA 1-15 قابل للطي على CV-CH-A2347K11-001 — يدخل كثيرًا من الفيش المصرية العمومية؛ ليس Europlug؛ ليس BS 1363' }, note: { en: '§7.1-L honesty from the unit in hand, not assumed ME BS stock', ar: 'صدق §7.1-L من الوحدة في اليد، لا افتراض مخزون BS شرق أوسطي' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: { en: 'not consistently published for A2347K11 (ignore stale 30g listing copy)', ar: 'غير منشور بثبات لـ A2347K11 (تجاهل نسخة قائمة 30 جرامًا القديمة)' }, measured: '39.6g', note: { en: 'Kkmoon 0.01g — A2149 Cube was 42.1g on a different day/sample; not same-hour A/B', ar: 'Kkmoon 0.01 جرام — كيوب A2149 كان 42.1 جرامًا في يوم/عيّنة مختلفة؛ ليست A/B نفس الساعة' } },
            { param: { en: 'Dimensions (body)', ar: 'الأبعاد (الجسم)' }, rated: '27.7 × 42.8 × 44.5 mm', measured: '27.9 × 43.0 × 44.7 mm', note: { en: 'Mitutoyo caliper — elongated foldable brick, not the ~32 mm A2149 cube', ar: 'قدمة Mitutoyo — قالب قابل للطي مستطيل، وليس كيوب A2149 ~32 ملم' } },
            { param: { en: 'Wall efficiency / no-load draw', ar: 'كفاءة الحائط / الاستهلاك بلا حمل' }, measured: { en: 'NOT MEASURED — no PZEM AC analyzer on this pass', ar: 'غير مقيس — بلا محلّل PZEM AC في هذه الجولة' }, note: { en: 'Silence over invention — protocol §6.7 / §11.3', ar: 'الصمت أقوى من الاختراع — البروتوكول §6.7 / §11.3' } },
            { param: { en: 'Recall check (2026-07-24)', ar: 'فحص الاستدعاء (2026-07-24)' }, measured: { en: 'A2347 / A2347K11 not listed on anker.com/product-recalls', ar: 'A2347 / A2347K11 غير مدرجين على anker.com/product-recalls' }, note: { en: 'Active Anker list covers power banks (A1647/A1652/A1681/A1689/A1257 + PowerCore 10000) — wall chargers outside that notice', ar: 'قائمة انكر النشطة تخص باور بانك (A1647/A1652/A1681/A1689/A1257 + PowerCore 10000) — شواحن الحائط خارج ذلك الإشعار' } },
            { param: { en: 'Vs A2149 Cube — electrical (cross-sheet)', ar: 'مقابل كيوب A2149 — كهرباء (عبر الأوراق)' }, rated: { en: 'A2149: 5V/3A + 9V/2.22A · peak 19.76W (2026-07-14)', ar: 'A2149: 5V/3A + 9V/2.22A · ذروة 19.76 واط (2026-07-14)' }, measured: { en: 'A2347K11: three PDOs incl. 12V · peak 19.72W (2026-07-24) — same 20W class, different PDO table', ar: 'A2347K11: ثلاثة PDO تشمل 12V · ذروة 19.72 واط (2026-07-24) — نفس فئة 20 واط، جدول PDO مختلف' }, note: { en: 'Numbers compared honestly across dates; no invented same-hour thermal delta', ar: 'أرقام مُقارنة بصدق عبر التواريخ؛ بلا فرق حراري مخترع في نفس الساعة' } },
        ],
        verdict: {
            en: 'A2347K11 is a real 20W fixed-PD brick with three PDOs (incl. 12V): peak 19.72W, iPhone 15 ~19.4W / ~29 min to 50%. No PPS — Galaxy S24 Super Fast stays OFF. Foldable US Type-A plug; not the A2149 Cube.',
            ar: 'A2347K11 شاحن 20 واط PD ثابت حقيقي بثلاثة PDO (يشمل 12V): ذروة 19.72 واط، وiPhone 15 ~19.4 واط / ~29 دقيقة إلى 50%. بلا PPS — Super Fast على Galaxy S24 مطفأ. قابس US Type-A قابل للطي؛ ليس كيوب A2149.',
        },
        pros: [
            { en: 'Full three-PDO decode on FNB58 — 5V/3A · 9V/2.22A · 12V/1.67A — matched distributor A2347 sheets; 12V rail is the candid differentiator vs A2149 Cube', ar: 'فك كامل لثلاثة PDO على FNB58 — 5V/3A · 9V/2.22A · 12V/1.67A — مطابق لكتيّبات موزّع A2347؛ منفذ 12V هو الفارق الصادق مقابل كيوب A2149' },
            { en: '9V rail delivered 19.72W (8.96V/2.20A) — ~98.7% of the 19.98W PDO on JUWEI; single-port peak respects the 20W label (§8)', ar: 'منفذ 9V أوصل 19.72 واط (8.96V/2.20A) — ~98.7% من PDO 19.98 واط على JUWEI؛ ذروة المنفذ تحترم ملصق 20 واط (§8)' },
            { en: 'iPhone 15 hit ~19.4W peak and ~29 min to 50% — lands on Apple\'s ~20W wired ceiling (MacRumors) without inventing a 27W Pro claim', ar: 'iPhone 15 بلغ ذروة ~19.4 واط و~29 دقيقة إلى 50% — يقع على سقف آبل السلكي ~20 واط (MacRumors) بلا اختراع ادعاء Pro 27 واط' },
            { en: 'OCP tripped in ~2.1–2.4 s on over-current requests on both 9V and 12V rails (§7.1-H)', ar: 'OCP فصل خلال ~2.1–2.4 ث عند طلب تيار زائد على منفذي 9V و12V (§7.1-H)' },
            { en: 'Foldable US Type-A prongs — travel-friendly when your destination has universal / Type-A sockets', ar: 'أطراف US Type-A قابلة للطي — مناسبة للسفر حين يكون الوجهة بفيش عمومية / Type-A' },
            { en: 'NOT on anker.com/product-recalls as of 2026-07-24 — A2347 absent from the June 2025 power-bank recall notice', ar: 'غير مدرج على anker.com/product-recalls حتى 2026-07-24 — A2347 غائب عن إشعار استدعاء باور بانك يونيو 2025' },
        ],
        limits: [
            { en: 'No PPS — Galaxy S24 Super Fast Charging indicator stayed OFF; peak ~15.1W fixed PD. Samsung-first buyers should choose a 25W+ PPS brick (A2147 / JR-TCF23 / A2669 class)', ar: 'بلا PPS — مؤشر Super Fast Charging على Galaxy S24 بقي مطفأ؛ ذروة ~15.1 واط PD ثابت. مشترو سامسونج أولاً يختارون شاحن 25 واط+ PPS (فئة A2147 / JR-TCF23 / A2669)' },
            { en: 'Plug on this CairoVolt sample is foldable US Type-A, not Europlug and not BS 1363 — Europlug-only Egyptian outlets need a correctly rated adapter', ar: 'قابس عيّنة كايرو فولت هذه US Type-A قابل للطي، ليس Europlug وليس BS 1363 — مخارج Europlug فقط في مصر تحتاج محوّلًا مصنّفًا بشكل صحيح' },
            { en: 'Single USB-C only; no cable sealed with CV-CH-A2347K11-001 — budget a 3A C-to-C (iPhone 15+) or C-to-Lightning (iPhone 14 and older)', ar: 'منفذ USB-C واحد فقط؛ بلا كابل مُغلق مع CV-CH-A2347K11-001 — احسب كابل 3A من C إلى C (iPhone 15+) أو C إلى Lightning (iPhone 14 والأقدم)' },
            { en: 'Surface reached 57.9°C after 15 min at ~20W (28.3°C ambient) — keep ventilated; do not pillow-cover or leave on a hot Cairo car dashboard', ar: 'السطح بلغ 57.9°م بعد 15 دقيقة عند ~20 واط (محيط 28.3°م) — اترك تهوية؛ لا تغطه بوسادة ولا تتركه على تابلوه سيارة حار في القاهرة' },
            { en: 'Do not treat 57.9°C (15 min, 2026-07-24) as a same-hour win/loss vs A2149\'s 61.3°C (30 min, 2026-07-14) — different protocol duration and day', ar: 'لا تعامل 57.9°م (15 دقيقة، 2026-07-24) كانتصار/خسارة في نفس الساعة مقابل 61.3°م لـ A2149 (30 دقيقة، 2026-07-14) — مدة بروتوكول ويوم مختلفان' },
            { en: 'Nintendo Switch docked TV mode NOT supported — dock wants 15V/2.6A; this brick tops at 12V/1.67A', ar: 'وضع Nintendo Switch بالدوك للتلفزيون غير مدعوم — الدوك يريد 15V/2.6A؛ هذا الشاحن يتوقف عند 12V/1.67A' },
            { en: 'Wall efficiency and no-load draw NOT measured (no PZEM) — we do not invent % figures', ar: 'كفاءة الحائط والاستهلاك بلا حمل غير مقيسين (بلا PZEM) — لا نخترع نسبًا مئوية' },
            { en: 'No public A2347-specific teardown located — we do not publish chip IDs we did not open', ar: 'لا تفكيك عام مخصّص لـ A2347 موثّق — لا ننشر معرّفات رقائق لم نفتحها' },
            { en: 'A54 and other non-S24 Samsung times labelled est. were not re-timed this session — only iPhone 15 and Galaxy S24 are physical phone runs', ar: 'أزمنة A54 وغيرها من سامسونج الموسومة تقديري لم تُوقَّت في هذه الجلسة — فقط iPhone 15 وGalaxy S24 جولات هاتف فعلية' },
            { en: 'Single unit tested (CV-CH-A2347K11-001) — production batches and regional plug variants may vary', ar: 'وحدة واحدة مُختبرة (CV-CH-A2347K11-001) — قد تختلف دفعات الإنتاج ونسخ القابس الإقليمية' },
        ],
    },
};
