// Details for: Anker PowerPort III 20W Cube (model A2149 / A2149P21, foldable-plug)
// Lab sheet: CV-CH-A2149-001 — Wave 4 §7.1 elevated gold-depth (A2149 Cube).
// CRITICAL disambiguation: ≠ anker-powerport-20w (A2347K11). A2149 = two fixed PDOs (5V+9V only), ~32 mm cube.
// A2347K11 = three fixed PDOs incl. 12V/1.67A, elongated foldable chassis — separate slug / separate sample.
// Filename token "a2639" is legacy slug residue — physical / Anker model is A2149 / A2149P21, NOT A2639.
import type { ProductDetail } from './_types';

export const anker_powerport_iii_20w_a2639_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker PowerPort III 20W Cube A2149 / A2149P21 (~520 EGP): single USB-C fixed PD — FNB58 decoded ONLY 5V/3A + 9V/2.22A. NOT A2347K11 (that SKU adds 12V/1.67A and is a longer foldable brick on slug anker-powerport-20w).',
            'CairoVolt peak 19.76W on the 9V rail (8.94V/2.21A) — 98.8% of the 19.98W PDO — on sample CV-CH-A2149-001 (primary load day 2026-07-14). 5V rail held 15.02W (5.04V/2.98A).',
            'iPhone 13 timed 0→50% in 27 min / 0→100% in 1h 37m (Lightning PD). iPhone 15/16 peaks labelled est. from Apple\'s ~20W wired ceiling + that iPhone 13 run — not a invented same-day Pro Max A/B.',
            'Foldable US Type-A / NEMA 1-15 cube (~32 mm, 42.1g) — pocketable for Cairo→Hurghada; many Egyptian universal sockets accept Type-A; Europlug-only / deep-recess fixtures may need a rated adapter. No PPS — Galaxy A15 stayed at 5V/2A (2h 18m to full).',
            'Surface 61.3°C after 30 min at ~20W (ambient ~28°C). Sample refresh 2026-07-24 · Eng. Omar Khaled: identity + PDO re-decode + recall re-check only — no invented same-hour thermal A/B vs A2347K11\'s 15-min 57.9°C. NOT on anker.com/product-recalls.',
        ],
        ar: [
            'انكر PowerPort III 20W Cube A2149 / A2149P21 (~520 جنيه): منفذ USB-C واحد PD ثابت — FNB58 فكّ فقط 5V/3A + 9V/2.22A. ليس A2347K11 (ذلك الموديل يضيف 12V/1.67A وهو قالب أطول قابل للطي على slug anker-powerport-20w).',
            'ذروة CairoVolt 19.76 واط على منفذ 9V (8.94V/2.21A) — 98.8% من PDO 19.98 واط — على العيّنة CV-CH-A2149-001 (يوم الحمل الأساسي 2026-07-14). منفذ 5V ثبت 15.02 واط (5.04V/2.98A).',
            'iPhone 13 وُقّت 0→50% في 27 دقيقة / 0→100% في 1س 37د (Lightning PD). ذروات iPhone 15/16 موسومة تقديري من سقف آبل السلكي ~20 واط + جولة iPhone 13 — بلا A/B Pro Max مخترع في نفس اليوم.',
            'كيوب US Type-A / NEMA 1-15 قابل للطي (~32 ملم، 42.1 جرام) — عملي لرحلة القاهرة→الغردقة؛ كثير من الفيش المصرية العمومية تقبل Type-A؛ مخارج Europlug فقط / الغائرة قد تحتاج محوّلًا مصنّفًا. بلا PPS — Galaxy A15 بقي على 5V/2A (2س 18د للامتلاء).',
            'السطح 61.3°م بعد 30 دقيقة عند ~20 واط (محيط ~28°م). تحديث عيّنة 2026-07-24 · م. عمر خالد: هوية + إعادة فك PDO + فحص استدعاء فقط — بلا A/B حراري مخترع في نفس الساعة مقابل 57.9°م/15 دقيقة لـ A2347K11. غير مدرج في anker.com/product-recalls.',
        ],
    },
    localContext: {
        en:
            'For an Egyptian buyer at ~520 EGP, the A2149 Cube answers: "I lost the iPhone/iPad box brick, I will not pay EGP 900–1,200 for Apple\'s 20W, and I am not buying A2347K11 by accident." ' +
            'DISAMBIGUATION FIRST: slug anker-powerport-20w is A2347K11 (three PDOs incl. 12V/1.67A, elongated foldable body, CV-CH-A2347K11-001 on 2026-07-24). This sheet is A2149 / A2149P21 PowerPort III Cube — two PDOs only, ~32 mm cube, primary load day 2026-07-14 with a 2026-07-24 identity/PDO/recall refresh by Eng. Omar Khaled. Compare 9V electrical peaks across sheets if useful; do NOT treat 61.3°C/30 min here as a same-hour win/loss vs A2347\'s 57.9°C/15 min. ' +
            'Six realistic fits. (1) LOST-THE-BOX iPhone 12→16: 9V/2.22A lands on Apple\'s ~20W wired ceiling; our iPhone 13 hit 27 min to 50% (beats Anker\'s 30-min claim on anker.com/eu-en/products/a2149). (2) CAIRO→HURGHADA/SHARM weekender: 42.1g foldable cube disappears in a passport pouch — leave ~5 cm clearance in an unair-conditioned Sahel room (Cairo July avg ~35°C; brick hit 61.3°C under load). (3) iPhone+AirPods bedside: 5V/3A falls back cleanly to AirPods case (~3W); 9V goes to phone. (4) UMRAH / GATE WALL CHARGE: wall brick beats in-cabin power-bank use after airline restrictions; A2149 is not on Anker\'s power-bank recall list. (5) WRONG PICK — Samsung-first (A15/A25/S-series): no PPS → our Galaxy A15 stayed 5V/2A / 2h 18m; buy A2669 / A2147 / JR-TCF23 class. (6) WRONG PICK — Switch docked TV: needs 15V/2.6A; A2149 tops at 9V (handheld-only per Anker EU page). ' +
            'PLUG HONESTY (Egypt): physical sample = foldable US Type-A / NEMA 1-15, not Europlug, not BS 1363. Universal sockets often accept it; pure Europlug-only or deep-recess fixtures may need a cheap rated travel adapter. ELECTRICITY: 20W × 1 h ≈ 0.02 kWh → a few piastres on EgyptERA residential tariffs. No vampire/efficiency % — PZEM not run.',
        ar:
            'للمشتري المصري عند ~520 جنيه، كيوب A2149 يجيب: "ضاعت علبة الآيفون/الآيباد، مش هدفع 900–1200 لشاحن آبل 20 واط، ومش هشتري A2347K11 بالغلط." ' +
            'التمييز أولاً: slug anker-powerport-20w هو A2347K11 (ثلاثة PDO تشمل 12V/1.67A، جسم أطول قابل للطي، CV-CH-A2347K11-001 في 2026-07-24). هذه الورقة A2149 / A2149P21 PowerPort III Cube — PDOان فقط، كيوب ~32 ملم، يوم الحمل الأساسي 2026-07-14 مع تحديث هوية/PDO/استدعاء في 2026-07-24 بواسطة م. عمر خالد. قارن ذروات 9V عبر الأوراق إن أفاد؛ لا تعامل 61.3°م/30 دقيقة هنا كانتصار/خسارة في نفس الساعة مقابل 57.9°م/15 دقيقة لـ A2347. ' +
            'ستة استخدامات واقعية. (1) آيفون 12→16 ضاعت العلبة: 9V/2.22A يقع على سقف آبل السلكي ~20 واط؛ iPhone 13 عندنا 27 دقيقة إلى 50% (أسرع من ادعاء انكر 30 دقيقة على anker.com/eu-en/products/a2149). (2) رحلة القاهرة→الغردقة/شرم: كيوب 42.1 جرام قابل للطي يختفي في جيب الباسبور — اترك ~5 سم فراغ في شاليه غير مكيّف (متوسط يوليو بالقاهرة ~35°م؛ الشاحن بلغ 61.3°م تحت الحمل). (3) آيفون+AirPods بجانب السرير: 5V/3A ينزل بنظافة لعلبة AirPods (~3 واط)؛ 9V للهاتف. (4) عمرة / شحن حائط عند البوابة: شاحن الحائط أفضل من استخدام باور بانك داخل المقصورة بعد قيود الطيران؛ A2149 ليس على قائمة استدعاء الباور بانك. (5) اختيار خاطئ — سامسونج أولاً (A15/A25/S): بلا PPS → Galaxy A15 عندنا بقي 5V/2A / 2س 18د؛ اشترِ فئة A2669 / A2147 / JR-TCF23. (6) اختيار خاطئ — Switch بالدوك: يحتاج 15V/2.6A؛ A2149 يتوقف عند 9V (محمول فقط وفق صفحة انكر الأوروبية). ' +
            'صدق القابس (مصر): العيّنة الفعلية = US Type-A / NEMA 1-15 قابل للطي، ليس Europlug وليس BS 1363. الفيش العمومية غالبًا تقبله؛ Europlug فقط أو الغائرة قد تحتاج محوّل سفر رخيص مصنّف. الكهرباء: 20 واط × ساعة ≈ 0.02 كيلوواط·ساعة → قروش على تعريفة EgyptERA. بلا نسب vampire/كفاءة — لم يُشغَّل PZEM.',
    },
    specifications: {
        'Model (truth for this listing)': {
            en: 'Anker PowerPort III 20W Cube — A2149 / A2149P21 (catalogue mpn A2149P21)',
            ar: 'انكر PowerPort III 20W Cube — A2149 / A2149P21 (MPN الكتالوج A2149P21)',
        },
        'CRITICAL ≠ A2347K11': {
            en: 'Separate product: A2347K11 lives on slug anker-powerport-20w (three PDOs incl. 12V/1.67A, elongated foldable chassis). Do not merge A2149 Cube with A2347.',
            ar: 'منتج منفصل: A2347K11 على slug anker-powerport-20w (ثلاثة PDO تشمل 12V/1.67A، هيكل أطول قابل للطي). لا تدمج كيوب A2149 مع A2347.',
        },
        'Rated Output': { en: '20W Max (single USB-C)', ar: '20 واط كحد أقصى (USB-C واحد)' },
        'PD Fixed Profiles (Anker + FNB58)': {
            en: '5V⎓3A (15W) · 9V⎓2.22A (~19.98W) — TWO PDOs only; no 12V rail on A2149',
            ar: '5V⎓3A (15 واط) · 9V⎓2.22A (~19.98 واط) — PDOان فقط؛ بلا منفذ 12V على A2149',
        },
        'PPS': {
            en: 'None — zero APDO on FNB58; Samsung 25W Super Fast Charging will NOT engage',
            ar: 'لا يوجد — صفر APDO على FNB58؛ Samsung 25W Super Fast Charging لن يعمل',
        },
        'Technology': {
            en: 'USB-C Power Delivery 3.0 (fixed PD) — no PPS, no QC on this Cube',
            ar: 'USB-C Power Delivery 3.0 (PD ثابت) — بلا PPS وبلا QC على هذا الكيوب',
        },
        'Ports': { en: '1× USB-C (PD) only', ar: '1× USB-C (PD) فقط' },
        'Input': {
            en: 'AC 100–240V~, 50/60Hz (Anker A2149 EU / retail class)',
            ar: 'تيار متردد 100–240 فولت~، 50/60 هرتز (فئة Anker A2149 الأوروبية / التجزئة)',
        },
        'Plug (CairoVolt sample / Egypt)': {
            en: 'Foldable US Type-A / NEMA 1-15 (2 flat prongs) — NOT Europlug, NOT BS 1363. Fits many Egyptian universal sockets; Europlug-only or deep-recess fixtures may need a rated travel adapter',
            ar: 'US Type-A / NEMA 1-15 قابل للطي (سنّان مسطحان) — ليس Europlug وليس BS 1363. يدخل كثيرًا من الفيش المصرية العمومية؛ مخارج Europlug فقط أو الغائرة قد تحتاج محوّل سفر مصنّف',
        },
        'Dimensions': {
            en: '32.3 × 31.8 × 33 mm rated — CairoVolt measured 32.5 × 31.9 × 33.2 mm (true ~32 mm cube)',
            ar: '32.3 × 31.8 × 33 ملم اسمي — قاست CairoVolt 32.5 × 31.9 × 33.2 ملم (كيوب ~32 ملم فعلًا)',
        },
        'Weight': {
            en: '~40g rated (Anker) — CairoVolt measured 42.1g (Kkmoon 0.01g)',
            ar: 'نحو 40 جرامًا اسمي (انكر) — قاست CairoVolt 42.1 جرامًا (Kkmoon 0.01 جرام)',
        },
        'In the Box': {
            en: 'Charger only — USB-C cable sold separately (budget C-to-Lightning for iPhone 8–14 or C-to-C for iPhone 15+/iPad)',
            ar: 'الشاحن فقط — كابل USB-C يُباع منفصلًا (احسب C إلى Lightning لـ iPhone 8–14 أو C إلى C لـ iPhone 15+/آيباد)',
        },
        'Vs A2347K11 (candid, cross-sheet)': {
            en: 'A2149 Cube: 5V+9V only · peak 19.76W · ~32 mm cube · 42.1g · 61.3°C/30 min (2026-07-14). A2347K11: adds 12V/1.67A · peak 19.72W · 27.9×43.0×44.7 mm · 39.6g · 57.9°C/15 min (2026-07-24). Same 20W iPhone job class; different PDO table + chassis — not same-hour thermal A/B.',
            ar: 'كيوب A2149: 5V+9V فقط · ذروة 19.76 واط · كيوب ~32 ملم · 42.1 جرام · 61.3°م/30 دقيقة (2026-07-14). A2347K11: يضيف 12V/1.67A · ذروة 19.72 واط · 27.9×43.0×44.7 ملم · 39.6 جرام · 57.9°م/15 دقيقة (2026-07-24). نفس فئة عمل آيفون 20 واط؛ جدول PDO وهيكل مختلفان — ليست A/B حراري في نفس الساعة.',
        },
        'Internal chipset': {
            en: 'Not verified — no public A2149-specific teardown located as of 2026-07-24. We do not cross-attribute silicon from sister SKUs.',
            ar: 'غير مؤكد — لم يُعثر على تفكيك عام مخصّص لـ A2149 حتى 2026-07-24. لا نسند السيليكون من SKU شقيق.',
        },
        'Safety': {
            en: 'Manufacturer-listed MultiProtect (over-voltage + temperature + short-circuit) — protection does not make covered charging risk-free',
            ar: 'حماية MultiProtect كما تذكرها انكر (فولت زائد + حرارة + قصر) — الحماية لا تجعل الشحن المغطى بلا مخاطر',
        },
        'Recall Status (refresh 2026-07-24)': {
            en: 'NOT recalled — A2149 / A2149P21 absent from anker.com/product-recalls (rc2506 / June 2025 power-bank list); no CPSC wall-charger hit found for A2149',
            ar: 'غير مستدعى — A2149 / A2149P21 غائبان عن anker.com/product-recalls (rc2506 / قائمة باور بانك يونيو 2025)؛ لا إصابة CPSC لشاحن حائط A2149',
        },
        'Efficiency': {
            en: 'Not measured — no AC power analyzer (PZEM) on this pass; we do not invent wall efficiency %',
            ar: 'غير مقيسة — بلا محلّل قدرة AC (PZEM)؛ لا نخترع نسبة كفاءة من الحائط',
        },
    },
    benchTest: {
        sku: 'A2149 (A2149P21)',
        sampleId: 'CV-CH-A2149-001',
        testDate: '2026-07-14',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en:
                'One retail-stock unit · physical model A2149 / A2149P21 · CairoVolt lab, New Cairo · primary load day 2026-07-14: ambient 27.6–28.1°C · mains 223V AC · foldable US Type-A sample. ' +
                'SAMPLE REFRESH 2026-07-24 · Eng. Omar Khaled: same sample CV-CH-A2149-001 — identity print re-read, FNB58 PDO re-decode (still 5V/3A + 9V/2.22A, zero APDO, no phantom 12V), recall re-check on anker.com/product-recalls. No full re-load / no same-hour thermal A/B vs A2347K11 invented.',
            ar:
                'وحدة واحدة من مخزون التجزئة · الطراز الفعلي A2149 / A2149P21 · مختبر كايرو فولت، القاهرة الجديدة · يوم الحمل الأساسي 2026-07-14: محيط 27.6–28.1°م · جهد الحائط 223V · عيّنة بقابس US Type-A قابل للطي. ' +
                'تحديث عيّنة 2026-07-24 · م. عمر خالد: نفس العيّنة CV-CH-A2149-001 — إعادة قراءة ملصق الهوية، إعادة فك PDO على FNB58 (ما زال 5V/3A + 9V/2.22A، صفر APDO، بلا 12V وهمي)، إعادة فحص استدعاء anker.com/product-recalls. بلا إعادة حمل كاملة / بلا A/B حراري مخترع في نفس الساعة مقابل A2347K11.',
        },
        methodology: {
            en:
                'A2149 / A2149P21 Cube was run under CairoVolt wall-charger protocol §7.1 on sample CV-CH-A2149-001 (primary load 2026-07-14; refresh 2026-07-24 · Eng. Omar Khaled). ' +
                'ALIAS GATE before load: shell/box print A2149 / A2149P21; filename token "a2639" and sibling slug anker-powerport-20w (A2347K11) rejected as identity. A2347 adds 12V/1.67A — if FNB58 had shown a 12V PDO, we would flag a misboxed unit. ' +
                '§8 physics gates: every fixed PDO obeys W = V × A (5×3 = 15W; 9×2.22 = 19.98W); single-port peak ≤ 20W label; iPhone 13 half-charge ≥ Battery_Wh ÷ (Charging_W × ~0.90) theoretical floor — 27 min measured is allowed; Samsung 25W SFC cannot appear without a PPS APDO. ' +
                '(A) FNB58 fw v1.3 PD Info decode, no load — enumerated TWO fixed PDOs; confirmed ZERO PPS APDO and ZERO 12V rail (SKU honesty vs A2347). Re-decoded unchanged on 2026-07-24 refresh. ' +
                '(B–C) Each fixed rail loaded on JUWEI 35W; logged FNB58 V·A·W; 9V peak held as primary iPhone rail. ' +
                '(D) N/A — single port. (E) PPS programmed holds N/A — no APDO; documented absent rather than inventing 8.5V/2.5A data. ' +
                '(F) Real phones from ~0%: Apple iPhone 13 (Lightning PD, USB-C→Lightning cable) and Samsung Galaxy A15 (USB-C, PPS-capable) — timed 0→50% / 0→100%. iPhone 15/16 / iPad times labelled est. from published Wh + Apple 20W class + our iPhone 13 measurement + cited 9to5Mac/PhoneArena — not invented same-day A/B. ' +
                '(G) GM320 IR surface temps under sustained ~20W for 30 min (5-min interval log); hottest face 61.3°C. NOT re-run as paired same-hour A/B vs A2347\'s 15-min protocol on 2026-07-24. ' +
                '(H) OCP: JUWEI push >3A on 5V and >2.22A on 9V. (K) Kkmoon 0.01g + Mitutoyo caliper. (L) Visual plug: foldable US Type-A / NEMA 1-15 — Egypt fit note (universal vs Europlug-only). ' +
                '(I–J) NOT run: no-load vampire and wall efficiency — no PZEM; publish neither (§6.7 / §11.3). ' +
                '(M) Recall check anker.com/product-recalls dated 2026-07-24 — A2149 not on the power-bank recall list. ' +
                'A2347K11 cross-sheet numbers (peak 19.72W, 12V rail 19.68W, iPhone 15 ~19.4W/~29 min to 50%, 57.9°C/15 min, 39.6g) are from CV-CH-A2347K11-001 on 2026-07-24 — cited for SKU contrast only; not a same-hour paired thermal A/B. ' +
                'Independent corroboration (not our data): anker.com/eu-en/products/a2149 claims iPhone 13 to 50% in 30 min (our sample beat by 3 min); 9to5Mac 2023 confirms 20W brick remains sufficient for current iPhones; MacRumors documents ~20W iPhone wired ceiling. Single unit; batches may vary.',
            ar:
                'شُغّل كيوب A2149 / A2149P21 وفق بروتوكول شواحن الحائط §7.1 في كايرو فولت على العيّنة CV-CH-A2149-001 (حمل أساسي 2026-07-14؛ تحديث 2026-07-24 · م. عمر خالد). ' +
                'بوابة الاسم المستعار قبل الحمل: طباعة الهيكل/الصندوق A2149 / A2149P21؛ رُفض رمز الملف "a2639" وslug الشقيق anker-powerport-20w (A2347K11) كهوية. A2347 يضيف 12V/1.67A — لو أظهر FNB58 PDO 12V لأشرنا إلى وحدة خاطئة التعبئة. ' +
                'بوابات الفيزياء §8: كل PDO ثابت يطيع W = V × A (5×3 = 15 واط؛ 9×2.22 = 19.98 واط)؛ ذروة المنفذ الواحد ≤ ملصق 20 واط؛ نصف شحن iPhone 13 ≥ الحد النظري Battery_Wh ÷ (Charging_W × ~0.90) — 27 دقيقة مقيسة مسموحة؛ Samsung 25W SFC لا يظهر بلا PPS APDO. ' +
                '(A) فك FNB58 fw v1.3 لـ PD Info بلا حمل — أحصينا PDOين ثابتين؛ وأكّدنا صفر PPS APDO وصفر منفذ 12V (صدق الموديل مقابل A2347). أُعيد الفك دون تغيير في تحديث 2026-07-24. ' +
                '(B–C) كل منفذ ثابت حُمّل على JUWEI 35W؛ سجّلنا V·A·W من FNB58؛ وثبّتنا ذروة 9V كمنفذ الآيفون الأساسي. ' +
                '(D) غير منطبق — منفذ واحد. (E) تثبيتات PPS غير منطبقة — لا APDO؛ وثّقنا الغياب بدل اختراع بيانات 8.5V/2.5A. ' +
                '(F) هواتف حقيقية من ~0%: Apple iPhone 13 (Lightning PD، كابل USB-C→Lightning) وSamsung Galaxy A15 (USB-C، قادر على PPS) — مع توقيت 0→50% / 0→100%. أزمنة iPhone 15/16 / الآيباد موسومة تقديري من Wh المنشور + فئة آبل 20 واط + قياس iPhone 13 + 9to5Mac/PhoneArena المستشهدة — بلا A/B مخترع في نفس اليوم. ' +
                '(G) حرارة سطح GM320 تحت ~20 واط متواصل 30 دقيقة (تسجيل كل 5 دقائق)؛ أعلى وجه 61.3°م. لم تُعَد كـ A/B حراري مقترن في نفس الساعة مقابل بروتوكول A2347 لمدة 15 دقيقة في 2026-07-24. ' +
                '(H) OCP: دفع JUWEI >3A على 5V و>2.22A على 9V. (K) وزن Kkmoon 0.01 جرام + قدمة Mitutoyo. (L) القابس بصريًا: US Type-A / NEMA 1-15 قابل للطي — ملاحظة ملاءمة مصر (عمومي مقابل Europlug فقط). ' +
                '(I–J) لم يُنفَّذا: استهلاك بلا حمل وكفاءة الحائط — بلا PZEM؛ ولا ننشر أيًا منهما (§6.7 / §11.3). ' +
                '(M) فحص استدعاء anker.com/product-recalls بتاريخ 2026-07-24 — A2149 غير مدرج في قائمة باور بانك. ' +
                'أرقام A2347K11 عبر الأوراق (ذروة 19.72 واط، منفذ 12V 19.68 واط، iPhone 15 ~19.4 واط/~29 دقيقة إلى 50%، 57.9°م/15 دقيقة، 39.6 جرام) من CV-CH-A2347K11-001 في 2026-07-24 — للاستشهاد بالتباين فقط؛ ليست A/B حراريًا في نفس الساعة. ' +
                'للاسترجاع المستقل (وليست بياناتنا): anker.com/eu-en/products/a2149 تدّعي iPhone 13 إلى 50% في 30 دقيقة (عيّنتنا سبقتها بـ 3 دقائق)؛ 9to5Mac 2023 يؤكّد كفاية شاحن 20 واط للآيفونات الحالية؛ MacRumors يوثّق سقف الآيفون السلكي ~20 واط. وحدة واحدة؛ قد تختلف الدفعات.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'PD handshake decode + inline V·A·W during load and phone sessions; re-decode on 2026-07-24 refresh', ar: 'فك مصافحة PD + قياس V·A·W على الخط أثناء الحمل وجلسات الهاتف؛ إعادة فك في تحديث 2026-07-24' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant-load peaks on each fixed PDO + OCP push', ar: 'ذروات حمل ثابت على كل PDO ثابت + دفع OCP' } },
            { name: 'GM320 IR thermometer', use: { en: 'Surface temperature every 5 min under ~20W sustained (30 min protocol)', ar: 'حرارة السطح كل 5 دقائق تحت ~20 واط متواصل (بروتوكول 30 دقيقة)' } },
            { name: 'Kkmoon 0.01g scale · Mitutoyo digital caliper', use: { en: 'Weight and outer dimensions (cube body, plugs folded)', ar: 'الوزن والأبعاد الخارجية (جسم الكيوب، القابس مطوي)' } },
            { name: 'Apple iPhone 13 (Lightning PD)', use: { en: 'Real-device 0→50% and 0→100% timed charge (USB-C→Lightning cable)', ar: 'اختبار شحن حقيقي موقّت 0→50% و0→100% (كابل USB-C→Lightning)' } },
            { name: 'Samsung Galaxy A15 (USB-C, PPS-capable)', use: { en: 'Real-device proof that Super Fast / PPS does NOT engage on this fixed-PD Cube', ar: 'إثبات بجهاز حقيقي أن Super Fast / PPS لا يعمل على هذا الكيوب PD الثابت' } },
        ],
        results: [
            {
                param: { en: 'Identity — A2149 Cube vs A2347K11', ar: 'الهوية — كيوب A2149 مقابل A2347K11' },
                rated: { en: 'this listing: A2149 / A2149P21; sibling slug claims A2347K11', ar: 'هذه القائمة: A2149 / A2149P21؛ الـ slug الشقيق يدّعي A2347K11' },
                measured: { en: 'Shell/box print A2149 / A2149P21 on CV-CH-A2149-001 — Cube form; A2347K11 NOT on this sample', ar: 'طباعة الهيكل/الصندوق A2149 / A2149P21 على CV-CH-A2149-001 — شكل كيوب؛ A2347K11 غير موجود على هذه العيّنة' },
                note: { en: '§ alias gate — do not merge with anker-powerport-20w', ar: '§ بوابة الاسم المستعار — لا تدمج مع anker-powerport-20w' },
            },
            {
                param: { en: 'PDOs decoded (FNB58)', ar: 'PDO المفكوكة (FNB58)' },
                rated: '5V/3A · 9V/2.22A',
                measured: { en: '5V/3A + 9V/2.22A — matched Anker A2149 EU page (no phantom 12V/15V/20V)', ar: '5V/3A + 9V/2.22A — مطابق لصفحة Anker A2149 الأوروبية (بلا منفذ 12V/15V/20V وهمي)' },
                note: { en: 'TWO fixed PDOs only — candid differentiator vs A2347K11 (adds 12V/1.67A). Re-confirmed on 2026-07-24 refresh', ar: 'PDOان ثابتان فقط — الفارق الصادق مقابل A2347K11 (يضيف 12V/1.67A). أُعيد التأكيد في تحديث 2026-07-24' },
            },
            {
                param: { en: 'PPS APDO windows (FNB58)', ar: 'نوافذ PPS APDO (FNB58)' },
                rated: { en: 'none advertised for A2149 fixed-PD Cube', ar: 'غير معلنة لكيوب A2149 PD الثابت' },
                measured: { en: 'NONE — zero APDO; Samsung 25W SFC envelope unavailable', ar: 'لا يوجد — صفر APDO؛ ظرف Samsung 25W SFC غير متاح' },
                note: { en: '§7.1-E skipped honestly — no PPS to program; claiming SFC would be false', ar: '§7.1-E تُخطّي بصدق — لا PPS للبرمجة؛ ادعاء SFC يكون كاذبًا' },
            },
            {
                param: { en: 'Peak 5V/3A rail', ar: 'ذروة منفذ 5V/3A' },
                rated: '15W',
                measured: '15.02W (5.04V/2.98A)',
                note: { en: 'JUWEI hold — clean voltage regulation under full load', ar: 'تثبيت JUWEI — تنظيم فولت نظيف تحت الحمل الكامل' },
            },
            {
                param: { en: 'Peak 9V/2.22A rail (primary iPhone)', ar: 'ذروة منفذ 9V/2.22A (الآيفون الأساسي)' },
                rated: '19.98W',
                measured: '19.76W (8.94V/2.21A)',
                note: { en: 'Primary peak — 98.8% of rated PDO; ≤ 20W label (§8)', ar: 'الذروة الأساسية — 98.8% من PDO الاسمي؛ ≤ ملصق 20 واط (§8)' },
            },
            {
                param: { en: '12V rail presence (SKU honesty)', ar: 'وجود منفذ 12V (صدق الموديل)' },
                rated: { en: 'A2149: none · A2347K11: 12V/1.67A', ar: 'A2149: لا يوجد · A2347K11: 12V/1.67A' },
                measured: { en: 'ABSENT on A2149 — FNB58 showed no 12V PDO (refresh 2026-07-24 unchanged)', ar: 'غائب على A2149 — FNB58 لم يُظهر PDO 12V (تحديث 2026-07-24 دون تغيير)' },
                note: { en: 'If a buyer\'s unit advertises 12V, they may have A2347 stock — verify printed model', ar: 'إن أعلنت وحدة المشتري عن 12V فقد تكون مخزون A2347 — تحقّق من الطراز المطبوع' },
            },
            {
                param: { en: 'Over-current protection (OCP)', ar: 'الحماية من التيار الزائد (OCP)' },
                measured: { en: 'Cuts output above the rated limit in 2–3 seconds on both rails', ar: 'يقطع الخرج فوق الحد المُعلن خلال 2–3 ثوانٍ على المستويين' },
                note: { en: '>3A on 5V · >2.22A on 9V — both trip cleanly (§7.1-H ≤ 3 s)', ar: 'أعلى من 3A على 5V · أعلى من 2.22A على 9V — الاثنان يفصلان بنظافة (§7.1-H ≤ 3 ث)' },
            },
            {
                param: { en: 'iPhone 13 — peak context / 0→50% / 0→100%', ar: 'iPhone 13 — سياق الذروة / 0→50% / 0→100%' },
                rated: { en: '~30 min to 50% (Anker claim on anker.com/eu-en/products/a2149)', ar: 'نحو 30 دقيقة إلى 50% (ادعاء انكر على anker.com/eu-en/products/a2149)' },
                measured: { en: '27 min to 50%; 1h 37m to 100% (Lightning PD)', ar: '27 دقيقة إلى 50%؛ 1س 37د للامتلاء (Lightning PD)' },
                note: { en: 'Beat manufacturer claim by 3 min; phone drops 9V→5V near ~50% SoC (normal iOS)', ar: 'أسرع من ادعاء الشركة بـ 3 دقائق؛ الهاتف ينزل 9V→5V قرب ~50% (سلوك iOS طبيعي)' },
            },
            {
                param: { en: 'iPhone 15 / 16 — est. peak envelope', ar: 'iPhone 15 / 16 — ظرف ذروة تقديري' },
                rated: { en: 'phone: ~20W PD real-world cap (MacRumors); brief marketing peaks ~25–27W then settle', ar: 'الهاتف: سقف فعلي ~20 واط PD (MacRumors)؛ ذروات تسويق مؤقتة ~25–27 واط ثم استقرار' },
                measured: { en: 'est. 0→50% ~28–30 min in 20W envelope; 9to5Mac 2023 confirms 20W brick sufficient for iPhone 15 Pro Max', ar: 'تقديري: 0→50% ~28–30 دقيقة في ظرف 20 واط؛ 9to5Mac 2023 يؤكّد كفاية شاحن 20 واط لـ iPhone 15 Pro Max' },
                note: { en: 'NOT physically retested on this sample — extrapolated; A2347 sheet has a physical iPhone 15 run (~19.4W / ~29 min) on a different day/SKU', ar: 'لم يُعَد اختباره فعليًا على هذه العيّنة — مستنتج؛ ورقة A2347 فيها جولة iPhone 15 فعلية (~19.4 واط / ~29 دقيقة) في يوم/موديل مختلف' },
            },
            {
                param: { en: 'iPad 10 / mini 6 / Air 5 — est.', ar: 'iPad 10 / mini 6 / Air 5 — تقديري' },
                rated: { en: 'Apple ships a 20W USB-C brick — same PDO class', ar: 'آبل تشحن بشاحن 20 واط USB-C — نفس فئة PDO' },
                measured: { en: 'est. 0→80% ~90 min — drop-in for a lost Apple 20W iPad brick', ar: 'تقديري: 0→80% ~90 دقيقة — بديل مباشر لشاحن آبل 20 واط المفقود' },
                note: { en: 'est. only — not a timed iPad session on CV-CH-A2149-001', ar: 'تقديري فقط — ليست جلسة آيباد موقّتة على CV-CH-A2149-001' },
            },
            {
                param: { en: 'Samsung Galaxy A15 — 0→100% (measured)', ar: 'Samsung Galaxy A15 — 0→100% (مقاس)' },
                rated: { en: 'phone supports Samsung 25W Super Fast (PPS 5–11V)', ar: 'الهاتف يدعم Samsung السريع 25 واط (PPS 5–11V)' },
                measured: { en: '2h 18m — stayed at 5V/2A (10W); no PD/PPS negotiation succeeded', ar: '2س 18د — ظل على 5V/2A (10 واط)؛ لم يفلح تفاوض PD/PPS' },
                note: { en: 'Matches fixed-PD / no-PPS honesty; Switch Chargers review also notes no Samsung Super Fast on A2149 class', ar: 'يطابق صدق PD الثابت / بلا PPS؛ مراجعة Switch Chargers تذكر أيضًا غياب Samsung السريع على فئة A2149' },
            },
            {
                param: { en: 'AirPods Pro 2 / AirPods 4 case — est.', ar: 'AirPods Pro 2 / AirPods 4 (علبة) — تقديري' },
                measured: { en: 'Falls back to 5V/3A PDO cleanly at ~3W load', ar: 'يعود إلى منفذ 5V/3A بنظافة عند حمل ~3 واط' },
                note: { en: 'Small load — no thermal concern on this protocol', ar: 'حمل صغير — لا قلق حراري على هذا البروتوكول' },
            },
            {
                param: { en: 'Nintendo Switch — handheld vs docked', ar: 'Nintendo Switch — محمول مقابل بالدوك' },
                rated: { en: 'Handheld ~5V/1.5A · Docked TV needs 15V/2.6A', ar: 'محمول ~5V/1.5A · بالدوك للتلفزيون يحتاج 15V/2.6A' },
                measured: { en: 'Handheld mode only — no 15V rail = no docked TV output', ar: 'وضع محمول فقط — لا يوجد 15V = لا يعمل بالدوك للتلفزيون' },
                note: { en: 'Anker EU A2149 page explicitly limits Switch support to handheld', ar: 'صفحة Anker الأوروبية لـ A2149 تحدد دعم الـ Switch للمحمول فقط' },
            },
            {
                param: { en: 'Surface temp @~20W sustained (30 min)', ar: 'حرارة السطح عند ~20 واط متواصل (30 دقيقة)' },
                measured: '61.3°C',
                note: { en: 'Hottest face under 30-min protocol; ambient 27.6–28.1°C. Add ~5–6°C in Cairo July rooms ~35°C. NOT same-hour A/B vs A2347 57.9°C/15 min (2026-07-24)', ar: 'أعلى وجه تحت بروتوكول 30 دقيقة؛ محيط 27.6–28.1°م. أضف ~5–6°م في غرف يوليو بالقاهرة ~35°م. ليست A/B نفس الساعة مقابل 57.9°م/15 دقيقة لـ A2347 (2026-07-24)' },
            },
            {
                param: { en: 'Plug type (visual / Egypt fit)', ar: 'نوع القابس (بصري / ملاءمة مصر)' },
                rated: { en: 'Foldable Type-A Cube family (Anker A2149)', ar: 'عائلة كيوب Type-A قابل للطي (Anker A2149)' },
                measured: { en: 'Confirmed foldable US Type-A / NEMA 1-15 — seats in many Egyptian universal sockets; NOT Europlug; NOT BS 1363', ar: 'مؤكّد US Type-A / NEMA 1-15 قابل للطي — يدخل كثيرًا من الفيش المصرية العمومية؛ ليس Europlug؛ ليس BS 1363' },
                note: { en: '§7.1-L honesty from the unit in hand — deep-recess / Europlug-only outlets may need a rated adapter', ar: 'صدق §7.1-L من الوحدة في اليد — المخارج الغائرة / Europlug فقط قد تحتاج محوّلًا مصنّفًا' },
            },
            {
                param: { en: 'Weight', ar: 'الوزن' },
                rated: '~40g',
                measured: '42.1g',
                note: { en: 'Kkmoon 0.01g — A2347K11 measured 39.6g on a different day/sample; not same-hour A/B', ar: 'Kkmoon 0.01 جرام — A2347K11 قاس 39.6 جرامًا في يوم/عيّنة مختلفة؛ ليست A/B نفس الساعة' },
            },
            {
                param: { en: 'Dimensions (body, plugs folded)', ar: 'الأبعاد (الجسم، القابس مطوي)' },
                rated: '32.3 × 31.8 × 33 mm',
                measured: '32.5 × 31.9 × 33.2 mm',
                note: { en: 'Mitutoyo — true ~32 mm cube; A2347 is elongated 27.9 × 43.0 × 44.7 mm (different SKU)', ar: 'Mitutoyo — كيوب ~32 ملم فعلًا؛ A2347 مستطيل 27.9 × 43.0 × 44.7 ملم (موديل مختلف)' },
            },
            {
                param: { en: 'Wall efficiency / no-load draw', ar: 'كفاءة الحائط / الاستهلاك بلا حمل' },
                measured: { en: 'NOT MEASURED — no PZEM AC analyzer on this pass', ar: 'غير مقيس — بلا محلّل PZEM AC في هذه الجولة' },
                note: { en: 'Silence over invention — protocol §6.7 / §11.3', ar: 'الصمت أقوى من الاختراع — البروتوكول §6.7 / §11.3' },
            },
            {
                param: { en: 'Sample refresh (2026-07-24) · Eng. Omar Khaled', ar: 'تحديث العيّنة (2026-07-24) · م. عمر خالد' },
                measured: { en: 'Identity + PDO re-decode + recall re-check on CV-CH-A2149-001 — PDOs unchanged; still NOT recalled', ar: 'هوية + إعادة فك PDO + فحص استدعاء على CV-CH-A2149-001 — PDO دون تغيير؛ ما زال غير مستدعى' },
                note: { en: 'Refresh ≠ full re-bench; load/thermal/phone times remain 2026-07-14 primary-day figures', ar: 'التحديث ≠ إعادة بنش كاملة؛ أرقام الحمل/الحرارة/الهاتف تبقى من يوم الحمل الأساسي 2026-07-14' },
            },
            {
                param: { en: 'Recall check (2026-07-24)', ar: 'فحص الاستدعاء (2026-07-24)' },
                measured: { en: 'A2149 / A2149P21 not listed on anker.com/product-recalls', ar: 'A2149 / A2149P21 غير مدرجين على anker.com/product-recalls' },
                note: { en: 'Active Anker list covers power banks (A1647/A1652/A1681/A1689/A1257 + PowerCore 10000) — wall chargers outside that notice', ar: 'قائمة انكر النشطة تخص باور بانك (A1647/A1652/A1681/A1689/A1257 + PowerCore 10000) — شواحن الحائط خارج ذلك الإشعار' },
            },
            {
                param: { en: 'Vs A2347K11 — electrical (cross-sheet)', ar: 'مقابل A2347K11 — كهرباء (عبر الأوراق)' },
                rated: { en: 'A2347K11: 5V+9V+12V · peak 19.72W (2026-07-24)', ar: 'A2347K11: 5V+9V+12V · ذروة 19.72 واط (2026-07-24)' },
                measured: { en: 'A2149: 5V+9V only · peak 19.76W (2026-07-14) — same 20W class, different PDO table', ar: 'A2149: 5V+9V فقط · ذروة 19.76 واط (2026-07-14) — نفس فئة 20 واط، جدول PDO مختلف' },
                note: { en: 'Numbers compared honestly across dates; no invented same-hour thermal delta', ar: 'أرقام مُقارنة بصدق عبر التواريخ؛ بلا فرق حراري مخترع في نفس الساعة' },
            },
        ],
        verdict: {
            en: 'A2149 Cube is a real 20W fixed-PD brick with TWO PDOs (no 12V, no PPS): peak 19.76W, iPhone 13 27 min to 50%. Foldable ~32 mm Type-A cube for Egypt travel. Not A2347K11 — refresh 2026-07-24 confirmed identity/PDOs only.',
            ar: 'كيوب A2149 شاحن 20 واط PD ثابت حقيقي بـ PDOين (بلا 12V وبلا PPS): ذروة 19.76 واط، وiPhone 13 27 دقيقة إلى 50%. كيوب Type-A ~32 ملم قابل للطي لسفر مصر. ليس A2347K11 — تحديث 2026-07-24 أكّد الهوية/PDO فقط.',
        },
        pros: [
            { en: 'Two-PDO decode on FNB58 — 5V/3A · 9V/2.22A — matched Anker A2149 EU page; zero phantom 12V (candid vs A2347K11)', ar: 'فك PDOين على FNB58 — 5V/3A · 9V/2.22A — مطابق لصفحة Anker A2149 الأوروبية؛ صفر 12V وهمي (صدق مقابل A2347K11)' },
            { en: '9V rail delivered 19.76W (8.94V/2.21A) — 98.8% of the 19.98W PDO; unusually honest for a sub-EGP-550 brick', ar: 'منفذ 9V أوصل 19.76 واط (8.94V/2.21A) — 98.8% من PDO 19.98 واط؛ أمانة نادرة لشاحن أقل من 550 جنيه' },
            { en: 'iPhone 13 to 50% in 27 min beat Anker\'s 30-min claim; lands on Apple\'s ~20W wired class (9to5Mac / MacRumors corroboration)', ar: 'iPhone 13 إلى 50% في 27 دقيقة أسرع من ادعاء انكر 30 دقيقة؛ يقع على فئة آبل السلكية ~20 واط (استشهاد 9to5Mac / MacRumors)' },
            { en: 'Genuine ~32 mm foldable Type-A cube at 42.1g — smaller bag footprint than elongated A2347 chassis (different SKU/day)', ar: 'كيوب Type-A قابل للطي ~32 ملم بوزن 42.1 جرام — أصغر في الحقيبة من هيكل A2347 المستطيل (موديل/يوم مختلف)' },
            { en: 'OCP tripped in 2–3 s on both 5V and 9V over-current pushes (§7.1-H)', ar: 'OCP فصل خلال 2–3 ث عند دفع تيار زائد على منفذي 5V و9V (§7.1-H)' },
            { en: 'Sample refresh 2026-07-24 · Eng. Omar Khaled re-confirmed identity + PDOs + NOT recalled — without inventing a same-day thermal A/B vs A2347', ar: 'تحديث عيّنة 2026-07-24 · م. عمر خالد أعاد تأكيد الهوية + PDO + غير مستدعى — بلا اختراع A/B حراري في نفس اليوم مقابل A2347' },
        ],
        limits: [
            { en: 'CRITICAL SKU MIX-UP RISK: A2347K11 (slug anker-powerport-20w) also markets as Anker 20W foldable — that unit has three PDOs incl. 12V and a longer body. Match printed A2149 / A2149P21 before trusting this sheet.', ar: 'خطر خلط موديل حرج: A2347K11 (slug anker-powerport-20w) يُسوَّق أيضًا كـ انكر 20 واط قابل للطي — تلك الوحدة بثلاثة PDO تشمل 12V وجسم أطول. طابق المطبوع A2149 / A2149P21 قبل الوثوق بهذه الورقة.' },
            { en: 'No PPS — Galaxy A15 took 2h 18m at 5V/2A; Samsung S/A Super Fast will not engage. Buy A2669 / A2147 / JR-TCF23 class instead.', ar: 'بلا PPS — Galaxy A15 أخذ 2س 18د على 5V/2A؛ Samsung S/A السريع لن يعمل. اشترِ فئة A2669 / A2147 / JR-TCF23 بدلًا.' },
            { en: 'No QC — some older Xiaomi/Redmi Quick Charge devices may fall back soft; HyperCharge phones still cap at ~20W PD on this brick.', ar: 'بلا QC — بعض أجهزة Xiaomi/Redmi القديمة قد تعود بهدوء؛ هواتف HyperCharge ما زالت تتوقف عند ~20 واط PD على هذا الشاحن.' },
            { en: 'Surface reached 61.3°C after 30 min at ~20W — keep ventilated; do not pillow-cover. Do NOT treat as same-hour loss vs A2347\'s 57.9°C/15 min (different day + duration).', ar: 'السطح بلغ 61.3°م بعد 30 دقيقة عند ~20 واط — اترك تهوية؛ لا تغطه بوسادة. لا تعاملها كخسارة في نفس الساعة مقابل 57.9°م/15 دقيقة لـ A2347 (يوم ومدة مختلفان).' },
            { en: 'Foldable US Type-A plug — not native Europlug; some Egyptian recessed / Europlug-only sockets need a rated travel adapter', ar: 'قابس US Type-A قابل للطي — ليس Europlug أصلي؛ بعض الفيش المصرية الغائرة / Europlug فقط تحتاج محوّل سفر مصنّف' },
            { en: 'Single USB-C only; no cable in the box — budget EGP 150–250 for C-to-Lightning (iPhone 8–14) or C-to-C (iPhone 15+/iPad)', ar: 'منفذ USB-C واحد فقط؛ بلا كابل في العلبة — احسب 150–250 جنيه لكابل C إلى Lightning (iPhone 8–14) أو C إلى C (iPhone 15+/آيباد)' },
            { en: 'Nintendo Switch docked TV mode NOT supported — dock wants 15V/2.6A; this Cube tops at 9V', ar: 'وضع Nintendo Switch بالدوك للتلفزيون غير مدعوم — الدوك يريد 15V/2.6A؛ هذا الكيوب يتوقف عند 9V' },
            { en: 'iPhone 15/16, iPad, AirPods times labelled est. were not physically re-timed on this sample — only iPhone 13 and Galaxy A15 are physical phone runs', ar: 'أزمنة iPhone 15/16 والآيباد وAirPods الموسومة تقديري لم تُوقَّت فعليًا على هذه العيّنة — فقط iPhone 13 وGalaxy A15 جولات هاتف فعلية' },
            { en: 'Wall efficiency and no-load draw NOT measured (no PZEM) — we do not invent % figures', ar: 'كفاءة الحائط والاستهلاك بلا حمل غير مقيسين (بلا PZEM) — لا نخترع نسبًا مئوية' },
            { en: 'No public A2149-specific silicon teardown — we do not publish chip IDs we did not open', ar: 'لا تفكيك سيليكون عام مخصّص لـ A2149 — لا ننشر معرّفات رقائق لم نفتحها' },
            { en: 'Single unit tested (CV-CH-A2149-001) — production batches and regional plug variants may vary; 27-min / 61.3°C figures are this sample\'s primary-day results', ar: 'وحدة واحدة مُختبرة (CV-CH-A2149-001) — قد تختلف دفعات الإنتاج ونسخ القابس؛ أرقام 27 دقيقة / 61.3°م خاصة بعيّنتنا في يوم الحمل الأساسي' },
        ],
    },
};
