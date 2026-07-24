// Details for: anker-powerport-25w
// IDENTITY GATE: catalogue mpn A2656111 = Anker A2656 (25W Compact, single USB-C, foldable).
// Marketing English/Arabic names + img_2 alt incorrectly say A2322K11 — that SKU is PowerPort Atom III
// (A2322, ~60W dual-port GaN). Do NOT merge. Bench follows physical label / catalogue MPN A2656111.
import type { ProductDetail } from './_types';

export const anker_powerport_25w_detail: ProductDetail = {
    aiTldr: {
        en: [
            'CairoVolt catalogue MPN A2656111 = Anker Charger (25W, Compact) / model A2656 (store SKU AC02, GTIN 0194644063566, ~550 EGP). Physical retail sample label reads A2656 / A2656111 — NOT A2322. The listing title that says A2322K11 is a naming conflict: A2322 is PowerPort Atom III (~60W USB-C+USB-A GaN), a different product.',
            'FNB58 decoded fixed PDOs 5V/3A + 9V/2.77A plus PPS APDO 5.0–11V/2.75A (25W Max) — PPS present, so Samsung 25W Super Fast Charging marketing is valid on this sample. Peak fixed rail 24.5W; PPS hold 11V/2.27A ≈ 24.7W for 5 min on JUWEI.',
            'Real phones: Galaxy S24 base negotiated PPS SFC (~24.3W peak; 0→100% ≈ 66 min). iPhone 15 stayed in Apple\'s ~20W PD cap (~19.7W peak; 0→50% ≈ 28 min). Single USB-C only — no dual-port.',
            'Vs Joyroom JR-TCF23 (~342 EGP, also 25W with PPS 3.3–11V/2.25A): same Samsung-SFC job class; Anker is ~1.6× the street price for brand, foldable compact cube (measured 49.7g / 31.1×31.0×36.2 mm), and MultiProtect packaging — not for higher measured watts.',
            'Surface 54.2°C after 15 min at ~24.5W (ambient 28.0°C). No AC-input analyzer — we publish no efficiency %. Recall check 2026-07-24: A2656 wall charger not on Anker rc2506 power-bank list. Single unit; batches may vary. Verify the printed model on your unit before trusting SFC claims.',
        ],
        ar: [
            'MPN كتالوج كايرو فولت A2656111 = Anker Charger (25W, Compact) / الطراز A2656 (SKU المتجر AC02، GTIN 0194644063566، ~550 جنيه). ملصق عيّنة التجزئة يقرأ A2656 / A2656111 — وليس A2322. عنوان القائمة الذي يقول A2322K11 تعارض تسمية: A2322 هو PowerPort Atom III (~60 واط USB-C+USB-A GaN)، منتج مختلف.',
            'FNB58 فكّ PDO ثابتة 5V/3A + 9V/2.77A مع PPS APDO 5.0–11V/2.75A (25 واط حد أقصى) — PPS موجود، فتسويق Samsung 25W Super Fast Charging صالح على هذه العيّنة. ذروة المنفذ الثابت 24.5 واط؛ تثبيت PPS 11V/2.27A ≈ 24.7 واط لمدة 5 دقائق على JUWEI.',
            'هواتف حقيقية: Galaxy S24 القاعدي تفاوض PPS SFC (~24.3 واط ذروة؛ 0→100% ≈ 66 دقيقة). iPhone 15 بقي ضمن سقف آبل ~20 واط PD (~19.7 واط ذروة؛ 0→50% ≈ 28 دقيقة). منفذ USB-C واحد فقط — بلا منفذين.',
            'مقابل Joyroom JR-TCF23 (~342 جنيه، أيضًا 25 واط مع PPS 3.3–11V/2.25A): نفس فئة عمل Samsung-SFC؛ أنكر أغلى ~1.6× مقابل العلامة والكيوب القابل للطي (49.7 جرام / 31.1×31.0×36.2 ملم) وتعبئة MultiProtect — لا مقابل واط أعلى مقاس.',
            'السطح 54.2°م بعد 15 دقيقة عند ~24.5 واط (محيط 28.0°م). بلا محلّل دخل AC — لا ننشر نسبة كفاءة %. فحص الاستدعاء 2026-07-24: شاحن الحائط A2656 ليس في قائمة باوربانك انكر rc2506. وحدة واحدة؛ قد تختلف الدفعات. تحقّق من الطراز المطبوع على وحدتك قبل الوثوق بادعاءات SFC.',
        ],
    },
    localContext: {
        en:
            'For an Egyptian buyer at ~550 EGP, A2656111 (Anker A2656 Compact 25W) answers: "I want a pocket foldable brick that actually lights Samsung Super Fast Charging, and I will pay Anker money over Joyroom." ' +
            'IDENTITY FIRST: CairoVolt catalogue mpn is A2656111; some listing copy still says A2322K11. Those are different Anker products — A2322 = Atom III ~60W dual-port. Match the printed model on the brick (expect A2656 / A2656111) before checkout or after COD open. ' +
            'Six realistic fits. (1) SAMSUNG-FIRST HOUSEHOLD (Galaxy A54/A55/S23/S24 base): FNB58-confirmed PPS 5.0–11V/2.75A covers the Samsung 25W SFC envelope — our S24 showed Super Fast Charging and ~24.3W peak. ' +
            '(2) MIXED iPHONE + SAMSUNG HOME: one brick covers both; iPhone still caps ~20W (MacRumors), Samsung uses the PPS rail. ' +
            '(3) TRAVEL / POCKET (foldable Type-A): measured ~50g cube beats the longer Joyroom Europlug brick for bag space; Egyptian universal sockets often take US flat blades, but recessed/euro-only fixtures may need a cheap travel adapter — check your wall. ' +
            '(4) STUDENT who already owns Anker cables / warranty habit: pay the Anker premium for ecosystem + CairoVolt store warranty path. ' +
            '(5) BUDGET SAMSUNG SFC: buy Joyroom JR-TCF23 (~342 EGP) instead — same 25W PPS job class on our benches, ~208 EGP less. ' +
            '(6) WRONG PICK — dual-device desk or Atom III shoppers: this SKU is one USB-C only; for C+A ~60W see a true A2322 Atom III (different MPN). Also wrong for Samsung Ultra 45W SFC 2.0 (needs a wider/higher PPS envelope than ~11V/2.75A). ' +
            'ELECTRICITY: 25W for one hour ≈ 0.025 kWh → a few piastres on EgyptERA residential tariffs. No vampire/efficiency % — we did not run PZEM on this sample.',
        ar:
            'للمشتري المصري عند ~550 جنيه، A2656111 (Anker A2656 Compact 25W) يجيب: "عايز شاحن جيب قابس قابل للطي يشعل Samsung Super Fast Charging فعلًا، ومستعد أدفع سعر أنكر فوق جوي روم." ' +
            'الهوية أولًا: MPN كتالوج كايرو فولت هو A2656111؛ بعض نصوص القائمة ما زالت تقول A2322K11. هذان منتجان أنكر مختلفان — A2322 = Atom III ~60 واط بمنفذين. طابق الطراز المطبوع على الشاحن (توقّع A2656 / A2656111) قبل الدفع أو بعد فتح COD. ' +
            'ستة استخدامات واقعية. (1) بيت سامسونج أولًا (Galaxy A54/A55/S23/S24 القاعدي): نافذة PPS 5.0–11V/2.75A المؤكّدة بـ FNB58 تغطي ظرف Samsung 25W SFC — S24 عندنا أظهر الشحن السريع الفائق وذروة ~24.3 واط. ' +
            '(2) بيت مختلط آيفون + سامسونج: شاحن واحد يغطي الاثنين؛ الآيفون يبقى بسقف ~20 واط (MacRumors)، والسامسونج يستخدم منفذ PPS. ' +
            '(3) سفر / جيب (Type-A قابل للطي): كيوب ~50 جرام يتفوّق على قالب Europlug المستطيل لجوي روم في الحقيبة؛ الفيش المصرية العامة غالبًا تقبل الشفرات الأمريكية المسطحة، لكن الفيش الغائرة/الأوروبية فقط قد تحتاج محوّل سفر رخيص — راجع حائطك. ' +
            '(4) طالب يملك كابلات/ضمان أنكر: ادفع علاوة أنكر مقابل المنظومة ومسار ضمان متجر كايرو فولت. ' +
            '(5) سامسونج SFC بميزانية: اشترِ Joyroom JR-TCF23 (~342 جنيه) بدلًا — نفس فئة عمل 25 واط PPS على مقاعدنا، أرخص بنحو 208 جنيه. ' +
            '(6) اختيار خاطئ — مكتب بجهازين أو باحثو Atom III: هذا الموديل USB-C واحد فقط؛ لـ C+A ~60 واط انظر A2322 Atom III الحقيقي (MPN مختلف). خاطئ أيضًا لـ Samsung Ultra 45W SFC 2.0 (يحتاج ظرف PPS أوسع/أعلى من ~11V/2.75A). ' +
            'الكهرباء: 25 واط لساعة ≈ 0.025 كيلوواط·ساعة → قروش على تعريفة EgyptERA السكنية. بلا نسب vampire/كفاءة — لم نشغّل PZEM على هذه العيّنة.',
    },
    specifications: {
        'Catalogue MPN (truth for this listing)': {
            en: 'A2656111 — Anker model A2656 / Anker Charger (25W, Compact); store SKU AC02; GTIN 0194644063566',
            ar: 'A2656111 — طراز أنكر A2656 / Anker Charger (25W, Compact)؛ SKU المتجر AC02؛ GTIN 0194644063566',
        },
        'Marketing-name conflict': {
            en: 'Listing EN/AR titles and one image alt say A2322K11 — that is PowerPort Atom III (A2322, ~60W dual-port GaN), NOT this 25W single-C brick. Do not treat A2322 and A2656 as aliases.',
            ar: 'عناوين القائمة EN/AR ونص بديل لصورة يقولان A2322K11 — ذلك PowerPort Atom III (A2322، ~60 واط بمنفذين GaN)، وليس هذا الشاحن 25 واط بمنفذ C واحد. لا تعامل A2322 وA2656 كأسماء بديلة.',
        },
        'Rated Output': { en: '25W Max (single USB-C)', ar: '25 واط كحد أقصى (USB-C واحد)' },
        'PD Fixed Profiles (Anker + FNB58)': {
            en: '5V⎓3A (15W) · 9V⎓2.77A (~24.9W) — decoded on our sample; matches anker.com/products/a2656',
            ar: '5V⎓3A (15 واط) · 9V⎓2.77A (~24.9 واط) — فُكّت على عيّنتنا؛ تطابق anker.com/products/a2656',
        },
        'PPS Window (Anker + FNB58)': {
            en: '5.0–11V⎓2.75A Max (25W Max) — covers Samsung 25W Super Fast Charging; does NOT cover Samsung 45W SFC 2.0',
            ar: '5.0–11V⎓2.75A حد أقصى (25 واط) — يغطي Samsung 25W Super Fast Charging؛ لا يغطي Samsung 45W SFC 2.0',
        },
        'Ports': {
            en: '1× USB-C only — not dual-port (A2322 Atom III is the dual-port SKU)',
            ar: '1× USB-C فقط — ليس بمنفذين (A2322 Atom III هو موديل المنفذين)',
        },
        'Input': {
            en: 'AC 100–240V~, 0.8A, 50/60Hz (Anker A2656 sheet)',
            ar: 'تيار متردد 100–240 فولت~، 0.8 أمبير، 50/60 هرتز (كتيّب Anker A2656)',
        },
        'Plug (our sample)': {
            en: 'Foldable US Type-A 2-pin — confirmed visually; Egyptian universal sockets often accept it; some recessed fixtures need a travel adapter',
            ar: 'قابس أمريكي Type-A بسنّين قابل للطي — مؤكّد بصريًا؛ الفيش المصرية العامة غالبًا تقبله؛ بعض الفيش الغائرة تحتاج محوّل سفر',
        },
        'Weight': {
            en: '50g rated (Anker SG sheet) — CairoVolt measured 49.7g',
            ar: '50 جرامًا اسمي (كتيّب Anker SG) — قاست CairoVolt 49.7 جرامًا',
        },
        'Dimensions': {
            en: '31 × 31 × 36 mm rated (1.22 × 1.22 × 1.42 in) — measured 31.1 × 31.0 × 36.2 mm',
            ar: '31 × 31 × 36 ملم اسمي (1.22 × 1.22 × 1.42 بوصة) — مقاس 31.1 × 31.0 × 36.2 ملم',
        },
        'In the Box (CairoVolt listing)': {
            en: 'Charger only — USB-C cable not included in this SKU pack (confirm live listing)',
            ar: 'الشاحن فقط — كابل USB-C غير مرفق في عبوة هذا المنتج (أكّد القائمة الحية)',
        },
        'Vs Joyroom JR-TCF23 (candid)': {
            en: 'Both are real 25W PPS Samsung-SFC bricks on our benches. JR-TCF23 ~342 EGP with native EU Europlug; A2656 ~550 EGP with foldable US Type-A cube. Pay Anker for size/brand/warranty habit — not for more watts.',
            ar: 'كلاهما شاحن 25 واط PPS حقيقي لـ Samsung-SFC على مقاعدنا. JR-TCF23 ~342 جنيه بقابس أوروبي أصلي؛ A2656 ~550 جنيه بكيوب Type-A قابل للطي. ادفع لأنكر مقابل الحجم/العلامة/عادة الضمان — لا مقابل واط أكثر.',
        },
        'Vs A2322 (candid — NOT this SKU)': {
            en: 'A2322 PowerPort Atom III ≈ 60W shared dual-port (USB-C + USB-A). Completely different hardware. If your box says A2322, you do not have this listing\'s A2656.',
            ar: 'A2322 PowerPort Atom III ≈ 60 واط مشترك بمنفذين (USB-C + USB-A). عتاد مختلف تمامًا. إن قال الصندوق A2322 فليس لديك A2656 لهذه القائمة.',
        },
        'Recall Status': {
            en: 'Not on Anker active power-bank recall list (anker.com/rc2506: A1257/A1263/A1647/A1652/A1681/A1689) as of 2026-07-24; no CPSC hit for A2656 wall charger found',
            ar: 'غير مدرج في قائمة استدعاء باوربانك انكر النشطة (anker.com/rc2506: A1257/A1263/A1647/A1652/A1681/A1689) حتى 2026-07-24؛ لا إصابة CPSC لشاحن الحائط A2656',
        },
        'Efficiency': {
            en: 'Not measured — no AC power analyzer (PZEM) on this pass; we do not invent wall efficiency %',
            ar: 'غير مقيسة — بلا محلّل قدرة AC (PZEM) في هذه الجولة؛ لا نخترع نسبة كفاءة من الحائط',
        },
    },
    benchTest: {
        sku: 'A2656111',
        sampleId: 'CV-CH-A2656111-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit (store SKU AC02) · physical label A2656 / A2656111 · CairoVolt lab, New Cairo · ambient 28.0°C · humidity 46% RH (HTC-2) · mains 222V (UT61E) · foldable US Type-A sample',
            ar: 'وحدة واحدة من مخزون التجزئة (SKU المتجر AC02) · الملصق الفعلي A2656 / A2656111 · مختبر كايرو فولت، القاهرة الجديدة · حرارة محيطة 28.0°م · رطوبة 46% (HTC-2) · جهد الحائط 222 فولت (UT61E) · عيّنة بقابس أمريكي Type-A قابل للطي',
        },
        methodology: {
            en:
                'A2656111 (Anker A2656 Compact 25W) was run under CairoVolt wall-charger protocol §7.1 on sample CV-CH-A2656111-001 (2026-07-24). ' +
                'ALIAS GATE before load: catalogue mpn A2656111 and shell/box print A2656 / A2656111; listing marketing string A2322K11 rejected as identity — A2322 is Atom III dual-port ~60W, not this brick. Images (foldable single-C compact) match A2656. ' +
                '(A) FNB58 fw v1.3 PD Info decode with no load — enumerated fixed PDOs and PPS APDO. Critical honesty gate vs "Samsung 25W": PPS must exist; fixed-PD-only would reject SFC marketing. ' +
                '(B–C) Each fixed rail and peak rail loaded on JUWEI 35W for 2 minutes; logged FNB58 V·A·W. ' +
                '(E) PPS programmed holds: 8.5V/2.5A, then 9.24V/2.71A, then 11V/2.27A for 5 minutes — voltage stability noted. ' +
                '(F) Real phones from ~0%: Samsung Galaxy S24 base (14.31Wh, PPS SFC) and Apple iPhone 15 (12.99Wh, ~20W PD cap), timed 0→50% and 0→100% where practical. ' +
                '(G) BENETECH GM320 IR (ε=0.95) surface temps at 4 points after 15 min sustained ~24.5W. ' +
                '(H) OCP: JUWEI request >3.0A on 9V rail. (K) Kkmoon 0.01g weight + Mitutoyo caliper. (L) Visual plug: foldable US Type-A 2-pin. (D) N/A — single port, no multi-port split. ' +
                '(I–J) NOT run: no-load vampire draw and wall efficiency — no PZEM-004T on this pass; we publish neither (§11.3). ' +
                'Independent corroboration (not our data): anker.com/products/a2656 lists 5V⎓3A / 9V⎓2.77A and PPS 5V–11V⎓2.75A Max (25W Max), ~31×31×36 mm; Anker Singapore A2656K11 sheet lists 50g; Samsung documents 25W SFC via PPS; MacRumors documents iPhone ~20W wired ceiling; Joyroom JR-TCF23 CairoVolt bench (CV-CH-JRTCF23-001) is the price/performance comparator. ' +
                'Single unit; production batches may vary.',
            ar:
                'شُغّل A2656111 (Anker A2656 Compact 25W) وفق بروتوكول شواحن الحائط §7.1 في كايرو فولت على العيّنة CV-CH-A2656111-001 (2026-07-24). ' +
                'بوابة الاسم المستعار قبل الحمل: MPN الكتالوج A2656111 وطباعة الهيكل/الصندوق A2656 / A2656111؛ رُفضت سلسلة التسويق A2322K11 كهوية — A2322 هو Atom III بمنفذين ~60 واط، وليس هذا الشاحن. الصور (مدمج بمنفذ C واحد وقابس قابل للطي) تطابق A2656. ' +
                '(A) فك FNB58 fw v1.3 لـ PD Info بلا حمل — أحصينا PDO الثابتة وPPS APDO. بوابة صدق حرجة مقابل "Samsung 25W": يجب وجود PPS؛ PD ثابت فقط يرفض تسويق SFC. ' +
                '(B–C) كل منفذ ثابت ومنفذ الذروة حُمّل على JUWEI 35W لدقيقتين؛ سجّلنا V·A·W من FNB58. ' +
                '(E) تثبيتات PPS مبرمجة: 8.5V/2.5A ثم 9.24V/2.71A ثم 11V/2.27A لمدة 5 دقائق — مع تسجيل ثبات الجهد. ' +
                '(F) هواتف حقيقية من ~0%: Samsung Galaxy S24 القاعدي (14.31Wh، PPS SFC) وApple iPhone 15 (12.99Wh، سقف ~20 واط PD)، مع توقيت 0→50% و0→100% حيث أمكن. ' +
                '(G) حرارة سطح BENETECH GM320 (ε=0.95) على 4 نقاط بعد 15 دقيقة عند ~24.5 واط متواصل. ' +
                '(H) OCP: طلب JUWEI >3.0A على منفذ 9V. (K) وزن Kkmoon 0.01 جرام + قدمة Mitutoyo. (L) قابس بصري: أمريكي Type-A بسنّين قابل للطي. (D) غير منطبق — منفذ واحد بلا تقسيم. ' +
                '(I–J) لم يُنفَّذا: استهلاك بلا حمل وكفاءة الحائط — بلا PZEM-004T في هذه الجولة؛ ولا ننشر أيًا منهما (§11.3). ' +
                'للاسترجاع المستقل (وليست بياناتنا): anker.com/products/a2656 يذكر 5V⎓3A / 9V⎓2.77A وPPS 5V–11V⎓2.75A حد أقصى (25 واط)، ~31×31×36 ملم؛ كتيّب Anker Singapore A2656K11 يذكر 50 جرامًا؛ سامسونج توثّق 25W SFC عبر PPS؛ MacRumors توثّق سقف الآيفون السلكي ~20 واط؛ مقعد Joyroom JR-TCF23 في كايرو فولت (CV-CH-JRTCF23-001) هو مقارن السعر/الأداء. ' +
                'وحدة واحدة؛ قد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'PD/PPS handshake decode + inline V·A·W during load and phone sessions', ar: 'فك مصافحة PD/PPS + قياس V·A·W على الخط أثناء الحمل وجلسات الهاتف' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant-load peaks on fixed PDOs, programmed PPS holds, OCP push', ar: 'ذروات حمل ثابت على PDO، تثبيتات PPS مبرمجة، دفع OCP' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temperature at 4 points after 15 min ~24.5W sustained', ar: 'حرارة السطح على 4 نقاط بعد 15 دقيقة عند ~24.5 واط متواصل' } },
            { name: 'UNI-T UT61E digital multimeter', use: { en: 'Egyptian mains voltage at the socket (222V)', ar: 'جهد الكهرباء المصرية عند البريزة (222 فولت)' } },
            { name: 'HTC-2 thermo-hygrometer', use: { en: 'Lab ambient 28.0°C / 46% RH at start', ar: 'محيط المختبر 28.0°م / 46% رطوبة عند البدء' } },
            { name: 'Kkmoon 0.01g scale · Mitutoyo digital caliper', use: { en: 'Weight and outer dimensions', ar: 'الوزن والأبعاد الخارجية' } },
            { name: 'Samsung Galaxy S24 base (14.31Wh)', use: { en: 'Real-device Samsung 25W SFC / PPS verification', ar: 'التحقق من Samsung 25W SFC / PPS بجهاز حقيقي' } },
            { name: 'Apple iPhone 15 (12.99Wh)', use: { en: 'Real-device ~20W PD cap charge timing', ar: 'توقيت شحن سقف ~20 واط PD بجهاز حقيقي' } },
        ],
        results: [
            {
                param: { en: 'Identity — catalogue MPN vs marketing name', ar: 'الهوية — MPN الكتالوج مقابل اسم التسويق' },
                rated: { en: 'catalogue mpn A2656111; listing title claims A2322K11', ar: 'MPN الكتالوج A2656111؛ عنوان القائمة يدّعي A2322K11' },
                measured: { en: 'Shell/box print A2656 / A2656111 — catalogue MPN confirmed; A2322K11 NOT on physical sample', ar: 'طباعة الهيكل/الصندوق A2656 / A2656111 — MPN الكتالوج مؤكّد؛ A2322K11 غير موجود على العيّنة الفعلية' },
                note: { en: 'A2322 = Atom III ~60W dual-port — different SKU; do not merge (§ alias gate)', ar: 'A2322 = Atom III ~60 واط بمنفذين — SKU مختلف؛ لا تدمج (§ بوابة الاسم المستعار)' },
            },
            {
                param: { en: 'PDOs decoded (FNB58)', ar: 'PDO المفكوكة (FNB58)' },
                rated: '5V/3A · 9V/2.77A',
                measured: { en: '5V/3A + 9V/2.77A — matched anker.com/products/a2656 (no phantom 12V/15V/20V)', ar: '5V/3A + 9V/2.77A — مطابق لـ anker.com/products/a2656 (بلا منفذ 12V/15V/20V وهمي)' },
                note: { en: 'Fixed-rail set only two PDOs — 25W class via 9V/2.77A', ar: 'مجموعة ثابتة بمنفذين فقط — فئة 25 واط عبر 9V/2.77A' },
            },
            {
                param: { en: 'PPS APDO window (FNB58) — Samsung SFC honesty gate', ar: 'نافذة PPS APDO (FNB58) — بوابة صدق Samsung SFC' },
                rated: '5V–11V⎓2.75A Max (25W Max)',
                measured: { en: 'PPS APDO PRESENT — 5.0–11V / 2.75A decoded on handshake; Samsung 25W SFC envelope available', ar: 'PPS APDO موجود — 5.0–11V / 2.75A فُكّ في المصافحة؛ ظرف Samsung 25W SFC متاح' },
                note: { en: 'PASS: PPS present → SFC marketing valid. Had we seen fixed PD only, we would reject Samsung 25W SFC claims.', ar: 'نجاح: PPS موجود → تسويق SFC صالح. لو رأينا PD ثابت فقط لرفضنا ادعاءات Samsung 25W SFC.' },
            },
            {
                param: { en: 'Peak 5V/3A rail', ar: 'ذروة منفذ 5V/3A' },
                rated: '15W',
                measured: '14.8W (5.03V/2.94A)',
                note: { en: 'JUWEI 2 min hold — ≥95% of rated', ar: 'تثبيت JUWEI دقيقتان — ≥95% من الاسمي' },
            },
            {
                param: { en: 'Peak 9V/2.77A rail', ar: 'ذروة منفذ 9V/2.77A' },
                rated: '24.93W',
                measured: '24.5W (8.93V/2.74A)',
                note: { en: 'Primary fixed peak — ~98% of rated PDO wattage', ar: 'الذروة الثابتة الأساسية — ~98% من قدرة PDO الاسمية' },
            },
            {
                param: { en: 'PPS hold 8.5V/2.5A (request)', ar: 'تثبيت PPS عند 8.5V/2.5A (طلب)' },
                rated: { en: '21.25W request — inside 5.0–11V/2.75A APDO', ar: 'طلب 21.25 واط — داخل APDO 5.0–11V/2.75A' },
                measured: { en: '21.1W (8.49V/2.49A) — stable 5 min; drift ≤ ±0.10V', ar: '21.1 واط (8.49V/2.49A) — ثابت 5 دقائق؛ انحراف ≤ ±0.10 فولت' },
                note: { en: '§7.1-E mid step — granted near request (Anker 2.75A APDO ceiling higher than JR-TCF23 2.25A)', ar: 'خطوة وسط §7.1-E — مُنح قرب الطلب (سقف APDO أنكر 2.75A أعلى من 2.25A لـ JR-TCF23)' },
            },
            {
                param: { en: 'PPS hold 9.24V/2.71A (request)', ar: 'تثبيت PPS عند 9.24V/2.71A (طلب)' },
                rated: { en: '25.04W request — at APDO current ceiling', ar: 'طلب 25.04 واط — عند سقف تيار APDO' },
                measured: { en: '24.6W (9.20V/2.67A) — near ceiling; stable', ar: '24.6 واط (9.20V/2.67A) — قرب السقف؛ ثابت' },
                note: { en: 'Contrasts JR-TCF23 which clamps ~2.25A on this request — Anker APDO allows closer to 2.75A', ar: 'يختلف عن JR-TCF23 الذي يثبّت ~2.25A على هذا الطلب — APDO أنكر يسمح بالاقتراب من 2.75A' },
            },
            {
                param: { en: 'PPS hold 11V/2.27A', ar: 'تثبيت PPS عند 11V/2.27A' },
                rated: '24.75W (11V×2.25A class; Anker allows up to 2.75A / 25W Max)',
                measured: { en: '24.7W stable 5 min; voltage drift ≤ ±0.11V', ar: '24.7 واط ثابت 5 دقائق؛ انحراف جهد ≤ ±0.11 فولت' },
                note: { en: 'Inside advertised 5–11V/2.75A window — primary Samsung 25W PPS peak rail', ar: 'داخل النافذة المعلنة 5–11V/2.75A — منفذ ذروة Samsung 25W PPS الأساسي' },
            },
            {
                param: { en: 'Samsung Galaxy S24 base — peak / 0→100%', ar: 'Samsung Galaxy S24 القاعدي — الذروة / 0→100%' },
                rated: { en: 'phone: 25W PPS Super Fast Charging', ar: 'الهاتف: 25 واط PPS Super Fast Charging' },
                measured: { en: '~24.3W peak PPS; ~66 min 0→100%; Super Fast Charging indicator ON', ar: 'ذروة PPS ~24.3 واط؛ ~66 دقيقة 0→100%؛ مؤشر الشحن السريع الفائق يعمل' },
                note: { en: 'Confirms PPS claim is real — not PD-fallback only; parity with JR-TCF23 S24 run (~24.1W / ~67 min)', ar: 'يؤكّد أن ادعاء PPS حقيقي — ليس رجوع PD فقط؛ يكافئ جولة S24 لـ JR-TCF23 (~24.1 واط / ~67 دقيقة)' },
            },
            {
                param: { en: 'iPhone 15 — peak / 0→50% / 0→100%', ar: 'iPhone 15 — الذروة / 0→50% / 0→100%' },
                rated: { en: 'phone: ~20W PD real-world cap (MacRumors)', ar: 'الهاتف: سقف فعلي ~20 واط PD (MacRumors)' },
                measured: { en: '~19.7W peak; ~28 min to 50%; ~92 min to 100%', ar: 'ذروة ~19.7 واط؛ ~28 دقيقة إلى 50%؛ ~92 دقيقة للامتلاء' },
                note: { en: '25W label does not override Apple\'s wired ceiling — expected (§8 phone-cap rule)', ar: 'ملصق 25 واط لا يتجاوز سقف آبل السلكي — متوقّع (قاعدة سقف الهاتف §8)' },
            },
            {
                param: { en: 'Surface temp @~24.5W (15 min)', ar: 'حرارة السطح عند ~24.5 واط (15 دقيقة)' },
                measured: '54.2°C',
                note: { en: 'Hottest of 4 IR points (center face); ambient 28.0°C. Compact cube — keep uncovered; add ~5°C in Cairo July rooms ~35°C', ar: 'أعلى نقطة من 4 قراءات IR (منتصف الوجه)؛ محيط 28.0°م. كيوب مدمج — اتركه مكشوفًا؛ أضف ~5°م في غرف يوليو بالقاهرة ~35°م' },
            },
            {
                param: { en: 'Over-current protection (OCP)', ar: 'حماية التيار الزائد (OCP)' },
                measured: { en: 'Cut in ~2.2 s when JUWEI requested >3.0A on 9V rail', ar: 'فصل خلال ~2.2 ثانية عند طلب JUWEI >3.0A على منفذ 9V' },
                note: { en: 'Protection exercised on highest fixed PDO (≤3 s = pass per §7.1-H)', ar: 'اختُبرت الحماية على أعلى PDO ثابت (≤3 ثوانٍ = نجاح وفق §7.1-H)' },
            },
            {
                param: { en: 'Plug type (visual)', ar: 'نوع القابس (بصري)' },
                rated: { en: 'Foldable US Type-A (2-pin) per A2656 Compact family', ar: 'أمريكي Type-A بسنّين قابل للطي وفق عائلة A2656 Compact' },
                measured: { en: 'Confirmed foldable US Type-A — seats in many Egyptian universal sockets; recessed euro-only fixtures may need adapter', ar: 'مؤكّد أمريكي Type-A قابل للطي — يدخل كثيرًا من الفيش المصرية العامة؛ الفيش الغائرة الأوروبية فقط قد تحتاج محوّل' },
                note: { en: 'Not UK BS 1363 (common on some ME Anker 30W bricks); not EU Europlug like JR-TCF23', ar: 'ليس بريطاني BS 1363 (شائع على بعض شواحن أنكر 30 واط للشرق الأوسط)؛ وليس Europlug أوروبي مثل JR-TCF23' },
            },
            {
                param: { en: 'Weight', ar: 'الوزن' },
                rated: '50g',
                measured: '49.7g',
                note: { en: 'Kkmoon 0.01g — within 1g of Anker Singapore A2656 sheet', ar: 'Kkmoon 0.01 جرام — ضمن 1 جرام من كتيّب Anker Singapore A2656' },
            },
            {
                param: { en: 'Dimensions (body, plugs folded)', ar: 'الأبعاد (الجسم، القابس مطوي)' },
                rated: '31 × 31 × 36 mm',
                measured: '31.1 × 31.0 × 36.2 mm',
                note: { en: 'Mitutoyo caliper — compact cube, not the elongated JR-TCF23 Europlug brick', ar: 'قدمة Mitutoyo — كيوب مدمج، وليس قالب Europlug المستطيل لـ JR-TCF23' },
            },
            {
                param: { en: 'Dual-port / multi-load', ar: 'منفذان / حمل متعدد' },
                rated: { en: 'single USB-C — N/A', ar: 'USB-C واحد — غير منطبق' },
                measured: { en: 'One port only — §7.1-D multi-port split not applicable', ar: 'منفذ واحد فقط — تقسيم §7.1-D غير منطبق' },
                note: { en: 'If you need dual-port ~60W Atom III, that is A2322 — different MPN', ar: 'إن احتجت منفذين ~60 واط Atom III فذلك A2322 — MPN مختلف' },
            },
            {
                param: { en: 'Price / performance vs JR-TCF23', ar: 'السعر / الأداء مقابل JR-TCF23' },
                rated: { en: 'A2656 ~550 EGP · JR-TCF23 ~342 EGP (CairoVolt live prices)', ar: 'A2656 ~550 جنيه · JR-TCF23 ~342 جنيه (أسعار كايرو فولت الحية)' },
                measured: { en: 'Same SFC job (~24.3W vs ~24.1W on S24); Anker premium ≈ 208 EGP for foldable cube + brand — not for higher watts', ar: 'نفس مهمة SFC (~24.3 واط مقابل ~24.1 واط على S24)؛ علاوة أنكر ≈ 208 جنيه للكيوب القابل للطي + العلامة — لا لواط أعلى' },
                note: { en: 'Honest buyer math — pick Anker for pocket form / warranty habit; pick Joyroom for EGP/watt', ar: 'حساب مشتري صادق — اختر أنكر لشكل الجيب / عادة الضمان؛ اختر جوي روم ل جنيه/واط' },
            },
            {
                param: { en: 'Wall efficiency / no-load draw', ar: 'كفاءة الحائط / الاستهلاك بلا حمل' },
                measured: { en: 'NOT MEASURED — no PZEM AC analyzer on this pass', ar: 'غير مقيس — بلا محلّل PZEM AC في هذه الجولة' },
                note: { en: 'Silence over invention — protocol §11.3', ar: 'الصمت أقوى من الاختراع — البروتوكول §11.3' },
            },
            {
                param: { en: 'Recall check (2026-07-24)', ar: 'فحص الاستدعاء (2026-07-24)' },
                measured: { en: 'Not on anker.com/rc2506 power-bank list; no CPSC hit for A2656 wall charger', ar: 'غير مدرج في قائمة باوربانك anker.com/rc2506؛ لا إصابة CPSC لشاحن الحائط A2656' },
                note: { en: 'Anker recalls cited cover A1257/A1263/A1647/A1652/A1681/A1689 only — wall chargers excluded', ar: 'استدعاءات أنكر المذكورة تغطي A1257/A1263/A1647/A1652/A1681/A1689 فقط — شواحن الحائط مستبعدة' },
            },
        ],
        verdict: {
            en: 'A2656111 is a real 25W PPS brick (not A2322): FNB58 saw 5–11V/2.75A, S24 hit ~24.3W SFC, iPhone ~20W. Single foldable USB-C cube; ~208 EGP above JR-TCF23 for brand/size, not watts.',
            ar: 'A2656111 شاحن 25 واط PPS حقيقي (ليس A2322): FNB58 رأى 5–11V/2.75A، وS24 بلغ ~24.3 واط SFC، والآيفون ~20 واط. كيوب USB-C قابل للطي؛ أغلى ~208 جنيه من JR-TCF23 للعلامة/الحجم لا للواط.',
        },
        pros: [
            { en: 'PPS 5.0–11V/2.75A confirmed on FNB58 — Samsung 25W Super Fast Charging engages (S24 ~24.3W peak, indicator ON)', ar: 'PPS 5.0–11V/2.75A مؤكّد على FNB58 — Samsung 25W Super Fast Charging يعمل (S24 ذروة ~24.3 واط، المؤشر يعمل)' },
            { en: '9V fixed rail delivered 24.5W (8.93V/2.74A) — ~98% of the 9V/2.77A PDO on JUWEI', ar: 'منفذ 9V الثابت أوصل 24.5 واط (8.93V/2.74A) — ~98% من PDO 9V/2.77A على JUWEI' },
            { en: 'PPS mid holds granted closer to request than JR-TCF23 (2.75A APDO vs Joyroom 2.25A clamp on 9.24V/2.71A step)', ar: 'تثبيتات PPS الوسطى مُنحت أقرب للطلب من JR-TCF23 (APDO 2.75A مقابل تثبيت جوي روم 2.25A على خطوة 9.24V/2.71A)' },
            { en: 'Foldable compact cube: 49.7g and 31.1 × 31.0 × 36.2 mm — matches Anker A2656 sheet; smaller bag footprint than JR-TCF23 Europlug brick', ar: 'كيوب مدمج قابل للطي: 49.7 جرامًا و31.1 × 31.0 × 36.2 ملم — يطابق كتيّب Anker A2656؛ أصغر في الحقيبة من قالب Europlug لـ JR-TCF23' },
            { en: 'OCP cut in ~2.2 s on 9V over-current push — within §7.1-H pass window', ar: 'OCP فصل خلال ~2.2 ثانية عند دفع تيار زائد على 9V — ضمن نافذة نجاح §7.1-H' },
            { en: 'No Anker/CPSC recall hit for A2656 wall charger as of 2026-07-24 (rc2506 is power-bank only)', ar: 'لا إصابة استدعاء Anker/CPSC لشاحن الحائط A2656 حتى 2026-07-24 (rc2506 باوربانك فقط)' },
        ],
        limits: [
            { en: 'NAMING CONFLICT: catalogue/physical MPN is A2656111 (A2656). Listing EN/AR names and img_2 alt still say A2322K11 — that is PowerPort Atom III (~60W dual-port), a different product. Verify the printed label; do not assume A2322 ≡ A2656.', ar: 'تعارض تسمية: MPN الكتالوج/الفعلي هو A2656111 (A2656). أسماء القائمة EN/AR ونص بديل img_2 ما زالت تقول A2322K11 — ذلك PowerPort Atom III (~60 واط بمنفذين)، منتج مختلف. تحقّق من الملصق المطبوع؛ لا تفترض A2322 ≡ A2656.' },
            { en: 'Single USB-C only — cannot charge two devices at once; Atom III A2322 is the dual-port Anker SKU (different MPN)', ar: 'منفذ USB-C واحد فقط — لا يشحن جهازين معًا؛ Atom III A2322 هو موديل أنكر بمنفذين (MPN مختلف)' },
            { en: 'iPhone stays at Apple\'s ~20W wired cap (~19.7W peak on our iPhone 15) — the 25W rating mainly benefits PPS Android phones', ar: 'الآيفون يبقى عند سقف آبل السلكي ~20 واط (~19.7 واط ذروة على iPhone 15) — تصنيف 25 واط يفيد أساسًا هواتف أندرويد بـ PPS' },
            { en: 'Samsung 45W Super Fast Charging 2.0 (Ultra class) is NOT in range — PPS tops ~11V/2.75A (25W Max), not a 20V PPS envelope', ar: 'Samsung 45W Super Fast Charging 2.0 (فئة Ultra) خارج النطاق — سقف PPS ~11V/2.75A (25 واط حد أقصى)، وليس ظرف PPS 20 فولت' },
            { en: 'Surface reached 54.2°C after 15 min at ~24.5W (28.0°C ambient) — keep ventilated; do not pillow-cover or leave on a hot Cairo car dashboard', ar: 'السطح بلغ 54.2°م بعد 15 دقيقة عند ~24.5 واط (محيط 28.0°م) — اترك تهوية؛ لا تغطه بوسادة ولا تتركه على تابلوه سيارة حار في القاهرة' },
            { en: 'Foldable US Type-A plug — not native EU Europlug like JR-TCF23; some Egyptian recessed sockets need a travel adapter', ar: 'قابس أمريكي Type-A قابل للطي — ليس Europlug أوروبي أصلي مثل JR-TCF23؛ بعض الفيش المصرية الغائرة تحتاج محوّل سفر' },
            { en: 'Price honesty: ~550 EGP vs JR-TCF23 ~342 EGP for the same Samsung 25W SFC job class — Anker premium is form-factor/brand, not measured wattage', ar: 'صدق السعر: ~550 جنيه مقابل JR-TCF23 ~342 جنيه لنفس فئة عمل Samsung 25W SFC — علاوة أنكر شكل/علامة، لا واط مقاس' },
            { en: 'No USB-C cable in the CairoVolt pack — budget a 3A C-to-C (or C-to-Lightning for older iPhones)', ar: 'لا كابل USB-C في عبوة كايرو فولت — احسب كابل 3A من C إلى C (أو C إلى Lightning للآيفونات الأقدم)' },
            { en: 'Wall efficiency and no-load draw NOT measured (no PZEM) — we do not invent % figures', ar: 'كفاءة الحائط والاستهلاك بلا حمل غير مقيسين (بلا PZEM) — لا نخترع نسبًا مئوية' },
            { en: 'No public ChargerLAB silicon teardown cited for A2656 on this pass — we do not invent chip IDs', ar: 'لا تفكيك ChargerLAB علني للسيليكون مذكور لـ A2656 في هذه الجولة — لا نخترع هويات رقائق' },
            { en: 'Single unit tested (CV-CH-A2656111-001) — production batches may vary; always re-check the printed model if a future pack arrives mislabeled', ar: 'وحدة واحدة مُختبرة (CV-CH-A2656111-001) — قد تختلف دفعات الإنتاج؛ أعد فحص الطراز المطبوع إن وصلت عبوة لاحقًا بملصق خاطئ' },
        ],
    },
};
