// Details for: joyroom-25w-fast-charger
// Lab sheet: CV-CH-JRTCF23-001 — Wave Adj/Mid EXTRA 7/8 §7.1 elevated gold-depth (Joyroom JR-TCF23 / store JC01 · ~342 EGP).
// CRITICAL A/B: HAS PPS (3.3–5.9V/3A · 3.3–11V/2.25A) ≠ joyroom-20w-usb-c-charger (JR-TCF20 ZERO PPS) · ≠ joyroom-30w-fast-charger (JR-TCF30 dual C+A shared 30W).
// Honesty gate: FNB58 confirmed BOTH PPS APDOs before Samsung 25W SFC claim; full fixed PDO + APDO table; no invented PZEM %.
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · shell temp · Egypt Europlug · recall 2026-07-24 · Eng. Omar Khaled.
// Red-flag audit: no invented efficiency · no phantom 12V/15V/20V fixed PDOs · no 45W Ultra SFC claim · no same-hour thermal ranking vs siblings · APDO current clamps published honestly.
// Export must remain `joyroom_25w_fast_charger_detail` for the details registry.
import type { ProductDetail } from './_types';

export const joyroom_25w_fast_charger_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Joyroom JR-TCF23 (store SKU JC01, GTIN 6956116750046, ~342 EGP): single USB-C 25W wall brick. FNB58 decoded fixed PDOs 5V/3A + 9V/2.77A plus PPS APDOs 3.3–5.9V/3A and 3.3–11V/2.25A — Samsung 25W Super Fast Charging envelope. Critical vs JR-TCF20 (PD-only, ZERO PPS).',
            'CairoVolt peaks: 24.4W on 9V fixed (8.91V/2.74A) and 24.4W on PPS 11V/2.22A held 5 min on JUWEI — ≥97% of the 25W label on sample CV-CH-JRTCF23-001 (2026-07-24).',
            'Real phones: Galaxy S24 base negotiated PPS Super Fast Charging (~24.1W peak; 0→100% ≈ 67 min; indicator ON). iPhone 15 stayed in Apple\'s ~20W PD cap (~19.6W peak; 0→50% ≈ 28 min) — extra watts above 20W do not unlock faster iPhone wired charge.',
            'Not JR-TCF30: that SKU is dual-port USB-C + USB-A shared 30W WITH wider PPS (3.3–11V/3A · 3.3–16V/2A). JR-TCF23 is one USB-C only. Cable not in the CairoVolt retail pack — bring a 3A USB-C cable.',
            'Surface 58.7°C after 15 min at ~24W (ambient 28.1°C). No PZEM — we publish no wall efficiency %. Recall check 2026-07-24: no CPSC/Joyroom hit for JR-TCF23. Single unit; batches may vary.',
        ],
        ar: [
            'جوي روم JR-TCF23 (SKU المتجر JC01، GTIN 6956116750046، ~342 جنيه): شاحن حائط بمنفذ USB-C واحد 25 واط. FNB58 فكّ PDO ثابتة 5V/3A + 9V/2.77A مع APDO لـ PPS 3.3–5.9V/3A و3.3–11V/2.25A — ظرف Samsung 25W Super Fast Charging. حرج مقابل JR-TCF20 (PD فقط، صفر PPS).',
            'ذروات CairoVolt: 24.4 واط على 9V الثابت (8.91V/2.74A) و24.4 واط على PPS 11V/2.22A لمدة 5 دقائق على JUWEI — ≥97% من ملصق 25 واط على العيّنة CV-CH-JRTCF23-001 (2026-07-24).',
            'هواتف حقيقية: Galaxy S24 القاعدي تفاوض PPS Super Fast Charging (ذروة ~24.1 واط؛ 0→100% ≈ 67 دقيقة؛ المؤشر يعمل). iPhone 15 بقي ضمن سقف آبل ~20 واط PD (ذروة ~19.6 واط؛ 0→50% ≈ 28 دقيقة) — الواط الزائد فوق 20 لا يسرّع شحن الآيفون السلكي.',
            'ليس JR-TCF30: ذلك الموديل منفذان USB-C + USB-A بقدرة مشتركة 30 واط مع PPS أوسع (3.3–11V/3A · 3.3–16V/2A). JR-TCF23 منفذ USB-C واحد فقط. الكابل غير مرفق في عبوة كايرو فولت — أحضر كابل USB-C 3A.',
            'السطح 58.7°م بعد 15 دقيقة عند ~24 واط (محيط 28.1°م). بلا PZEM — لا ننشر كفاءة حائط %. فحص الاستدعاء 2026-07-24: لا إصابة CPSC/Joyroom لـ JR-TCF23. وحدة واحدة؛ قد تختلف الدفعات.',
        ],
    },
    localContext: {
        en:
            'For an Egyptian buyer at ~342 EGP, JR-TCF23 answers: "I need Samsung 25W Super Fast Charging without paying Anker/Apple money, and a Europlug that fits Cairo sockets." ' +
            'CRITICAL SKU MAP (do not confuse the Joyroom wall family). (A) JR-TCF23 = this sheet — single USB-C, 25W WITH PPS 3.3–11V/2.25A — Samsung 25W SFC engages on our S24. (B) JR-TCF20 (JC03, ~236 EGP) = single USB-C 20W fixed PD, ZERO PPS — Super Fast stays OFF (~14.9W PD fallback on our S24). (C) JR-TCF30 (JC02, ~280 EGP) = dual USB-C + USB-A, shared 30W envelope WITH wider PPS (3.3–11V/3A · 3.3–16V/2A) — different job (phone + earbuds). ' +
            'Six realistic fits. (1) SAMSUNG-FIRST HOUSEHOLD (Galaxy A54/A55/S23/S24 base): the FNB58-confirmed PPS 3.3–11V/2.25A window is exactly what Samsung 25W SFC needs — our S24 showed the Super Fast Charging indicator and ~24.1W peak. ' +
            '(2) MIXED iPHONE + SAMSUNG HOME: one brick covers both; iPhone still caps ~20W (MacRumors), Samsung uses the PPS rails. ' +
            '(3) STUDENT DORM (AUC/GUC/Cairo University): single-port, light (~55g EU class), EU 2-pin — no US adapter drama. ' +
            '(4) TALABAT / CAREEM DRIVER bedside top-up between shifts: 25W is enough for a Galaxy mid-range overnight; do not leave it on a midday dashboard (Cairo July avg high ~35°C, WeatherSpark). ' +
            '(5) BUDGET UPGRADE FROM JR-TCF20: if you already own the 20W sibling and bought a Samsung phone later, TCF23 is the PPS step-up; TCF20 will not light Super Fast Charging. ' +
            '(6) WRONG PICK — dual-device desk: buy JR-TCF30 (C+A 30W shared) or a dual-C Anker if you charge phone + earbuds together. Also wrong for Samsung Ultra 45W SFC 2.0 (needs a wider/higher PPS envelope than 3.3–11V/2.25A). ' +
            'PLUG HONESTY: physical sample = fixed EU Type-C Europlug (2 round pins), not BS 1363, not foldable US Type-A. ELECTRICITY: 25W for one hour ≈ 0.025 kWh → a few piastres on EgyptERA residential tariffs. No vampire/efficiency % — PZEM not run.',
        ar:
            'للمشتري المصري عند ~342 جنيه، JR-TCF23 يجيب: "أحتاج Samsung 25W Super Fast Charging من غير دفع سعر أنكر/آبل، وقابس أوروبي يدخل فيش القاهرة." ' +
            'خريطة الموديلات الحرجة (لا تخلط عائلة جوي روم الحائطية). (أ) JR-TCF23 = هذه الورقة — منفذ USB-C واحد، 25 واط مع PPS 3.3–11V/2.25A — Samsung 25W SFC يعمل على S24 لدينا. (ب) JR-TCF20 (JC03، ~236 جنيه) = USB-C واحد 20 واط PD ثابت، صفر PPS — Super Fast يبقى مطفأ (~14.9 واط رجوع PD على S24). (ج) JR-TCF30 (JC02، ~280 جنيه) = منفذا USB-C + USB-A بظرف مشترك 30 واط مع PPS أوسع (3.3–11V/3A · 3.3–16V/2A) — وظيفة مختلفة (هاتف + سماعة). ' +
            'ستة استخدامات واقعية. (1) بيت سامسونج أولاً (Galaxy A54/A55/S23/S24 القاعدي): نافذة PPS 3.3–11V/2.25A المؤكّدة بـ FNB58 هي بالضبط ما يحتاجه Samsung 25W SFC — S24 عندنا أظهر مؤشر الشحن السريع الفائق وذروة ~24.1 واط. ' +
            '(2) بيت مختلط آيفون + سامسونج: شاحن واحد يغطي الاثنين؛ الآيفون يبقى بسقف ~20 واط (MacRumors)، والسامسونج يستخدم منافذ PPS. ' +
            '(3) سكن طلاب (AUC/GUC/جامعة القاهرة): منفذ واحد، خفيف (~55 جرام فئة EU)، قابس أوروبي بسنّين — بلا دراما محوّل أمريكي. ' +
            '(4) سائق طلبات / كريم تعبئة بجانب السرير بين النوبات: 25 واط تكفي لجالكسي متوسط ليلاً؛ لا تتركه على تابلوه منتصف النهار (متوسط عظمى القاهرة يوليو ~35°م، WeatherSpark). ' +
            '(5) ترقية من JR-TCF20: إن كنت تملك الشقيق 20 واط واشتريت سامسونج لاحقاً، TCF23 هو خطوة PPS؛ TCF20 لن يشعل الشحن السريع الفائق. ' +
            '(6) اختيار خاطئ — مكتب بجهازين: اشترِ JR-TCF30 (C+A 30 واط مشترك) أو أنكر بمنفذين إن كنت تشحن هاتف + سماعة معاً. خاطئ أيضاً لـ Samsung Ultra 45W SFC 2.0 (يحتاج ظرف PPS أوسع/أعلى من 3.3–11V/2.25A). ' +
            'صدق القابس: العيّنة الفعلية = Europlug أوروبي ثابت بسنّين دائريين، ليس BS 1363 وليس US Type-A قابل للطي. الكهرباء: 25 واط لساعة ≈ 0.025 كيلوواط·ساعة → قروش على تعريفة EgyptERA. بلا نسب vampire/كفاءة — لم يُشغَّل PZEM.',
    },
    specifications: {
        'Model': { en: 'Joyroom JR-TCF23 — 25W USB-C PD + PPS wall charger (store SKU JC01)', ar: 'Joyroom JR-TCF23 — شاحن حائط USB-C PD + PPS بقدرة 25 واط (SKU المتجر JC01)' },
        'GTIN / MPN': { en: 'GTIN 6956116750046 · MPN JR-TCF23 · street ~342 EGP', ar: 'GTIN 6956116750046 · MPN JR-TCF23 · سعر الشارع ~342 جنيه' },
        'Rated Output': { en: '25W Max (single USB-C)', ar: '25 واط كحد أقصى (USB-C واحد)' },
        'PD Fixed Profiles (vendor + FNB58)': { en: '5V/3A (15W) · 9V/2.77A (~24.93W) — decoded on our sample; NO phantom 12V/15V/20V fixed PDOs', ar: '5V/3A (15 واط) · 9V/2.77A (~24.93 واط) — فُكّت على عيّنتنا؛ بلا PDO ثابتة وهمية 12V/15V/20V' },
        'PPS Windows (vendor + FNB58)': { en: '3.3–5.9V/3A · 3.3–11V/2.25A — covers Samsung 25W Super Fast Charging; does NOT cover Samsung 45W SFC 2.0', ar: '3.3–5.9V/3A · 3.3–11V/2.25A — يغطي Samsung 25W Super Fast Charging؛ لا يغطي Samsung 45W SFC 2.0' },
        'Ports': { en: '1× USB-C only — not dual-port (that is JR-TCF30)', ar: '1× USB-C فقط — ليس بمنفذين (ذلك JR-TCF30)' },
        'Input': { en: 'AC 100–240V, 50/60Hz, 0.7A Max (vendor sheet / retail label)', ar: 'تيار متردد 100–240 فولت، 50/60 هرتز، 0.7 أمبير حد أقصى (كتيّب المصنّع / ملصق التجزئة)' },
        'Plug (Egypt retail sample)': { en: 'EU Type-C Europlug (2 round pins), non-foldable — confirmed on JC01 unit; fits Egyptian universal sockets directly. Not BS 1363, not US Type-A', ar: 'قابس أوروبي Type-C Europlug بسنّين دائريين، غير قابل للطي — مؤكّد على وحدة JC01؛ يدخل الفيش المصرية مباشرة. ليس BS 1363 وليس US Type-A' },
        'Body Material': { en: 'PC (fire-resistant polycarbonate) per joyroom.com', ar: 'PC (بولي كربونات مقاوم للحريق) وفق joyroom.com' },
        'Weight (EU)': { en: '55g rated (joyroom.com EU) — CairoVolt measured 54.8g', ar: '55 جرامًا اسمي (joyroom.com EU) — قاست CairoVolt 54.8 جرامًا' },
        'Dimensions (EU)': { en: '85.2 × 28 × 40 mm rated (joyroom.com EU) — measured 85.0 × 28.1 × 40.2 mm', ar: '85.2 × 28 × 40 ملم اسمي (joyroom.com EU) — مقاس 85.0 × 28.1 × 40.2 ملم' },
        'In the Box (CairoVolt listing)': { en: 'Charger only — USB-C cable not sealed with CV-CH-JRTCF23-001 (bring a 3A C-to-C)', ar: 'الشاحن فقط — كابل USB-C غير مُغلق مع CV-CH-JRTCF23-001 (أحضر كابل 3A من C إلى C)' },
        'Vs JR-TCF20 (candid)': { en: 'JR-TCF20 = 20W PD + QC3.0, NO PPS — Samsung SFC will not engage (~14.9W PD fallback on our S24). JR-TCF23 = 25W with PPS 3.3–11V/2.25A — Samsung 25W SFC engages (~24.1W, indicator ON). Same Europlug family; opposite Samsung outcome.', ar: 'JR-TCF20 = 20 واط PD + QC3.0 بلا PPS — Samsung SFC لن يعمل (~14.9 واط رجوع PD على S24). JR-TCF23 = 25 واط مع PPS 3.3–11V/2.25A — Samsung 25W SFC يعمل (~24.1 واط، المؤشر يعمل). نفس عائلة Europlug؛ نتيجة سامسونج معاكسة.' },
        'Vs JR-TCF30 (candid)': { en: 'JR-TCF30 = dual USB-C + USB-A, shared 30W class WITH wider PPS (3.3–11V/3A · 3.3–16V/2A). JR-TCF23 = single USB-C 25W PPS phone brick (PPS tops 11V/2.25A). Different jobs — do not buy TCF23 expecting dual-port.', ar: 'JR-TCF30 = منفذا USB-C + USB-A بقدرة مشتركة فئة 30 واط مع PPS أوسع (3.3–11V/3A · 3.3–16V/2A). JR-TCF23 = منفذ USB-C واحد 25 واط PPS لهاتف (سقف PPS 11V/2.25A). وظيفتان مختلفتان — لا تشترِ TCF23 متوقعًا منفذين.' },
        'Certifications shown': { en: 'CE and FCC logos on joyroom.com. RoHS, UL, and SASO are NOT stated on the official product page — we do not claim them', ar: 'شعارا CE وFCC على joyroom.com. RoHS وUL وSASO غير مذكورة على الصفحة الرسمية — لا ندّعيها' },
        'Recall Status (2026-07-24)': { en: 'NOT RECALLED — cpsc.gov + Joyroom public notices returned zero hits for JR-TCF23 / JC01 on 2026-07-24. Anker power-bank recalls do not apply to Joyroom wall chargers', ar: 'لا يوجد استدعاء — cpsc.gov + إشعارات جوي روم أعادت صفر نتائج لـ JR-TCF23 / JC01 في 2026-07-24. استدعاءات باوربانك انكر لا تنطبق على شواحن جوي روم الحائطية' },
        'Efficiency': { en: 'Not measured — no AC power analyzer (PZEM) on this pass; we do not invent wall efficiency %', ar: 'غير مقيسة — بلا محلّل قدرة AC (PZEM) في هذه الجولة؛ لا نخترع نسبة كفاءة من الحائط' },
        'Sample / Lab ID': { en: 'CV-CH-JRTCF23-001 · Eng. Omar Khaled · 2026-07-24', ar: 'CV-CH-JRTCF23-001 · م. عمر خالد · 2026-07-24' },
        'Protocol': { en: 'CairoVolt Bench Test Protocol §7.1 (wall chargers) + §8 physics gates + §11 red-flag checklist', ar: 'بروتوكول اختبار كايرو فولت §7.1 (شواحن الحائط) + بوابات الفيزياء §8 + قائمة الأعلام الحمراء §11' },
    },
    benchTest: {
        sku: 'JR-TCF23',
        sampleId: 'CV-CH-JRTCF23-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit (store SKU JC01 / MPN JR-TCF23) · CairoVolt lab, New Cairo · ambient 28.1°C · humidity 47% RH (HTC-2) · mains 222V (UT61E) · EU Europlug sample',
            ar: 'وحدة واحدة من مخزون التجزئة (SKU المتجر JC01 / MPN JR-TCF23) · مختبر كايرو فولت، القاهرة الجديدة · حرارة محيطة 28.1°م · رطوبة 47% (HTC-2) · جهد الحائط 222 فولت (UT61E) · عيّنة بقابس أوروبي',
        },
        methodology: {
            en:
                'JR-TCF23 was run under CairoVolt wall-charger protocol §7.1 on sample CV-CH-JRTCF23-001 (2026-07-24). ' +
                '§8 physics gates applied before publish: every fixed PDO obeys W = V × A (5×3 = 15W; 9×2.77 = 24.93W); PPS APDO ceilings obey 5.9×3 = 17.7W and 11×2.25 = 24.75W; single-port peak ≤ 25W label; iPhone 15 (12.99Wh) timed charge ≥ Battery_Wh ÷ (Charging_W × ~0.90) — 0→50% theoretical floor ≈ 22 min at 20W, so a ~28 min measured half-charge is physically allowed; Samsung 25W SFC requires a real PPS APDO (§8 PPS negotiation) — confirmed present before claiming SFC. ' +
                '(A) FNB58 fw v1.3 PD Info decode with no load — enumerated fixed PDOs and BOTH PPS APDO windows. Critical honesty gate vs marketing and vs sibling JR-TCF20 (ZERO PPS): confirm PPS rails exist before claiming Samsung 25W SFC. ' +
                '(B–C) Each fixed rail and peak rail loaded on JUWEI 35W for 2 minutes; logged FNB58 V·A·W. ' +
                '(D) N/A — single port (dual-port share belongs to JR-TCF30, not this SKU). ' +
                '(E) PPS programmed holds: 8.5V/2.5A, then 9.24V/2.71A, then 11V/2.22A for 5 minutes — voltage stability + APDO current clamp behaviour noted (requests above 2.25A on the 11V window are refused). ' +
                '(F) Real phones from ~0%: Samsung Galaxy S24 base (14.31Wh, PPS SFC) and Apple iPhone 15 (12.99Wh, ~20W PD cap), timed 0→50% and 0→100% where practical. ' +
                '(G) BENETECH GM320 IR (ε=0.95) surface temps at 4 points after 15 min sustained ~24W. ' +
                '(H) OCP: JUWEI request >3.0A on 9V rail. (K) Kkmoon 0.01g weight + Mitutoyo caliper. (L) Visual plug confirmation: EU Europlug 2-pin — honest Egypt fit. ' +
                '(I–J) NOT run: no-load vampire draw and wall efficiency — no PZEM-004T on this pass; we publish neither (§6.7 / §11.3). ' +
                '(M) Recall check cpsc.gov + Joyroom notices dated 2026-07-24 — zero hits for JR-TCF23 / JC01. ' +
                'Sibling numbers cited for SKU contrast only (JR-TCF20 peak 19.58W + zero PPS; JR-TCF30 dual-port 29.1W + wider PPS) — not same-hour paired thermal A/B. ' +
                'Independent corroboration (not our data): joyroom.com JR-TCF23 page lists 25W Max + PPS/PD; distributor sheets (Blue Pirate / Joyroom.pk) itemise 5V=3A, 9V=2.77A, PPS 3.3–5.9V/3A and 3.3–11V/2.25A; Samsung documents 25W SFC via PPS on S23/S24 base; MacRumors documents iPhone ~20W wired ceiling. ' +
                'Single unit; production batches may vary.',
            ar:
                'شُغّل JR-TCF23 وفق بروتوكول شواحن الحائط §7.1 في كايرو فولت على العيّنة CV-CH-JRTCF23-001 (2026-07-24). ' +
                'طُبِّقت بوابات الفيزياء §8 قبل النشر: كل PDO ثابت يطيع W = V × A (5×3 = 15 واط؛ 9×2.77 = 24.93 واط)؛ أسقف APDO لـ PPS تطيع 5.9×3 = 17.7 واط و11×2.25 = 24.75 واط؛ ذروة المنفذ الواحد ≤ ملصق 25 واط؛ زمن شحن iPhone 15 (12.99Wh) ≥ Battery_Wh ÷ (Charging_W × ~0.90) — الحد النظري لـ 0→50% ≈ 22 دقيقة عند 20 واط، لذا نصف شحنة مقيسة ~28 دقيقة مسموح فيزيائيًا؛ Samsung 25W SFC يتطلب PPS APDO حقيقي (§8 تفاوض PPS) — أكّدنا الوجود قبل ادعاء SFC. ' +
                '(A) فك FNB58 fw v1.3 لـ PD Info بلا حمل — أحصينا PDO الثابتة ونافذتَي PPS APDO. بوابة صدق حرجة مقابل التسويق ومقابل الشقيق JR-TCF20 (صفر PPS): تأكيد وجود منافذ PPS قبل ادعاء Samsung 25W SFC. ' +
                '(B–C) كل منفذ ثابت ومنفذ الذروة حُمّل على JUWEI 35W لدقيقتين؛ سجّلنا V·A·W من FNB58. ' +
                '(D) غير منطبق — منفذ واحد (المشاركة المزدوجة تخص JR-TCF30 لا هذا الموديل). ' +
                '(E) تثبيتات PPS مبرمجة: 8.5V/2.5A ثم 9.24V/2.71A ثم 11V/2.22A لمدة 5 دقائق — مع تسجيل ثبات الجهد وسلوك تثبيت تيار APDO (طلبات فوق 2.25A على نافذة 11V تُرفض). ' +
                '(F) هواتف حقيقية من ~0%: Samsung Galaxy S24 القاعدي (14.31Wh، PPS SFC) وApple iPhone 15 (12.99Wh، سقف ~20 واط PD)، مع توقيت 0→50% و0→100% حيث أمكن. ' +
                '(G) حرارة سطح BENETECH GM320 (ε=0.95) على 4 نقاط بعد 15 دقيقة عند ~24 واط متواصل. ' +
                '(H) OCP: طلب JUWEI >3.0A على منفذ 9V. (K) وزن Kkmoon 0.01 جرام + قدمة Mitutoyo. (L) تأكيد بصري للقابس: أوروبي Europlug بسنّين — ملاءمة مصرية صادقة. ' +
                '(I–J) لم يُنفَّذا: استهلاك بلا حمل وكفاءة الحائط — بلا PZEM-004T في هذه الجولة؛ ولا ننشر أيًا منهما (§6.7 / §11.3). ' +
                '(M) فحص استدعاء cpsc.gov + إشعارات جوي روم بتاريخ 2026-07-24 — صفر نتائج لـ JR-TCF23 / JC01. ' +
                'أرقام الأشقاء للاستشهاد بالتباين فقط (JR-TCF20 ذروة 19.58 واط + صفر PPS؛ JR-TCF30 بمنفذين 29.1 واط + PPS أوسع) — ليست A/B حراريًا في نفس الساعة. ' +
                'للاسترجاع المستقل (وليست بياناتنا): صفحة joyroom.com لـ JR-TCF23 تذكر 25W Max + PPS/PD؛ كتيّبات الموزعين (Blue Pirate / Joyroom.pk) تفصّل 5V=3A و9V=2.77A وPPS 3.3–5.9V/3A و3.3–11V/2.25A؛ سامسونج توثّق 25W SFC عبر PPS على S23/S24 القاعدي؛ MacRumors توثّق سقف الآيفون السلكي ~20 واط. ' +
                'وحدة واحدة؛ قد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'PD/PPS handshake decode + inline V·A·W during load and phone sessions — critical dual-APDO confirmation', ar: 'فك مصافحة PD/PPS + قياس V·A·W على الخط أثناء الحمل وجلسات الهاتف — تأكيد حرج لنافذتَي APDO' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant-load peaks on fixed PDOs, programmed PPS holds, OCP push', ar: 'ذروات حمل ثابت على PDO، تثبيتات PPS مبرمجة، دفع OCP' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temperature at 4 points after 15 min ~24W sustained', ar: 'حرارة السطح على 4 نقاط بعد 15 دقيقة عند ~24 واط متواصل' } },
            { name: 'UNI-T UT61E digital multimeter', use: { en: 'Egyptian mains voltage at the socket (222V)', ar: 'جهد الكهرباء المصرية عند البريزة (222 فولت)' } },
            { name: 'HTC-2 thermo-hygrometer', use: { en: 'Lab ambient 28.1°C / 47% RH at start', ar: 'محيط المختبر 28.1°م / 47% رطوبة عند البدء' } },
            { name: 'Kkmoon 0.01g scale · Mitutoyo digital caliper', use: { en: 'Weight and outer dimensions', ar: 'الوزن والأبعاد الخارجية' } },
            { name: 'Samsung Galaxy S24 base (14.31Wh)', use: { en: 'Real-device Samsung 25W SFC / PPS verification — primary job of this SKU', ar: 'التحقق من Samsung 25W SFC / PPS بجهاز حقيقي — الوظيفة الأساسية لهذا الموديل' } },
            { name: 'Apple iPhone 15 (12.99Wh)', use: { en: 'Real-device ~20W PD cap charge timing — mixed-home honesty check', ar: 'توقيت شحن سقف ~20 واط PD بجهاز حقيقي — فحص صدق البيت المختلط' } },
        ],
        results: [
            { param: { en: 'PDOs decoded (FNB58)', ar: 'PDO المفكوكة (FNB58)' }, rated: '5V/3A · 9V/2.77A', measured: { en: '5V/3A + 9V/2.77A — matched vendor sheets (no phantom 12V/15V/20V)', ar: '5V/3A + 9V/2.77A — مطابق لكتيّبات الموزعين (بلا منفذ 12V/15V/20V وهمي)' }, note: { en: 'Fixed-rail set only two PDOs — 25W class via 9V/2.77A; contrast JR-TCF20 three-PDO set including 12V/1.67A', ar: 'مجموعة ثابتة بمنفذين فقط — فئة 25 واط عبر 9V/2.77A؛ مقابل مجموعة JR-TCF20 بثلاثة PDO تشمل 12V/1.67A' } },
            { param: { en: 'PPS APDO windows (FNB58)', ar: 'نوافذ PPS APDO (FNB58)' }, rated: '3.3–5.9V/3A · 3.3–11V/2.25A', measured: { en: 'BOTH present — confirmed on handshake; Samsung 25W SFC envelope available', ar: 'الاثنتان موجودتان — مؤكّدتان في المصافحة؛ ظرف Samsung 25W SFC متاح' }, note: { en: 'Critical vs JR-TCF20: that sibling has ZERO PPS. Claiming SFC without this decode would be false.', ar: 'حرج مقابل JR-TCF20: ذلك الشقيق بلا PPS. ادعاء SFC بلا هذا الفك يكون كاذبًا.' } },
            { param: { en: 'Peak 5V/3A rail', ar: 'ذروة منفذ 5V/3A' }, rated: '15W', measured: '14.7W (5.02V/2.93A)', note: { en: 'JUWEI 2 min hold — ≥95% of rated (§7.1-B)', ar: 'تثبيت JUWEI دقيقتان — ≥95% من الاسمي (§7.1-B)' } },
            { param: { en: 'Peak 9V/2.77A rail', ar: 'ذروة منفذ 9V/2.77A' }, rated: '24.93W', measured: '24.4W (8.91V/2.74A)', note: { en: 'Primary fixed peak — ~98% of rated PDO wattage', ar: 'الذروة الثابتة الأساسية — ~98% من قدرة PDO الاسمية' } },
            { param: { en: 'Single-port peak (highest rail)', ar: 'ذروة المنفذ الواحد (أعلى منفذ)' }, rated: '25W', measured: '24.4W (9V fixed = PPS 11V hold)', note: { en: '§7.1-C — ≥97% of charger total; peak ≤ label (§8 / §11.1)', ar: '§7.1-C — ≥97% من إجمالي الشاحن؛ الذروة ≤ الملصق (§8 / §11.1)' } },
            { param: { en: 'PPS hold 8.5V/2.5A (request)', ar: 'تثبيت PPS عند 8.5V/2.5A (طلب)' }, rated: { en: '21.25W request — outside 3.3–5.9V/3A APDO; uses 3.3–11V/2.25A', ar: 'طلب 21.25 واط — خارج APDO 3.3–5.9V/3A؛ يستخدم 3.3–11V/2.25A' }, measured: { en: '19.0W (8.48V/2.24A) — current clamped at ~2.25A APDO ceiling', ar: '19.0 واط (8.48V/2.24A) — التيار مُثبَّت عند سقف APDO ~2.25A' }, note: { en: '§7.1-E mid step; 2.5A request not granted above 2.25A APDO', ar: 'خطوة وسط §7.1-E؛ طلب 2.5A لا يُمنَح فوق سقف APDO 2.25A' } },
            { param: { en: 'PPS hold 9.24V/2.71A (request)', ar: 'تثبيت PPS عند 9.24V/2.71A (طلب)' }, rated: { en: '25.04W request — above 2.25A APDO max', ar: 'طلب 25.04 واط — فوق سقف APDO 2.25A' }, measured: { en: '20.5W (9.18V/2.23A) — clamped; 2.71A not granted', ar: '20.5 واط (9.18V/2.23A) — مُثبَّت؛ 2.71A غير ممنوح' }, note: { en: 'Honest APDO ceiling behaviour — peak 25W still via 11V×2.25A or 9V/2.77A fixed', ar: 'سلوك سقف APDO الصادق — ذروة 25 واط تبقى عبر 11V×2.25A أو 9V/2.77A الثابت' } },
            { param: { en: 'PPS hold 11V/2.22A', ar: 'تثبيت PPS عند 11V/2.22A' }, rated: '24.75W (11V×2.25A max)', measured: { en: '24.4W stable 5 min; voltage drift ≤ ±0.12V', ar: '24.4 واط ثابت 5 دقائق؛ انحراف جهد ≤ ±0.12 فولت' }, note: { en: 'Inside advertised 3.3–11V/2.25A window — primary Samsung 25W PPS peak rail', ar: 'داخل النافذة المعلنة 3.3–11V/2.25A — منفذ ذروة Samsung 25W PPS الأساسي' } },
            { param: { en: 'Samsung Galaxy S24 base — peak / 0→100%', ar: 'Samsung Galaxy S24 القاعدي — الذروة / 0→100%' }, rated: { en: 'phone: 25W PPS Super Fast Charging', ar: 'الهاتف: 25 واط PPS Super Fast Charging' }, measured: { en: '~24.1W peak PPS; ~67 min 0→100%; Super Fast Charging indicator ON', ar: 'ذروة PPS ~24.1 واط؛ ~67 دقيقة 0→100%؛ مؤشر الشحن السريع الفائق يعمل' }, note: { en: 'Confirms PPS claim is real on this sample — contrast JR-TCF20 S24 ~14.9W / indicator OFF', ar: 'يؤكّد أن ادعاء PPS حقيقي على هذه العيّنة — مقابل JR-TCF20 على S24 ~14.9 واط / المؤشر مطفأ' } },
            { param: { en: 'iPhone 15 — peak / 0→50% / 0→100%', ar: 'iPhone 15 — الذروة / 0→50% / 0→100%' }, rated: { en: 'phone: ~20W PD real-world cap (MacRumors)', ar: 'الهاتف: سقف فعلي ~20 واط PD (MacRumors)' }, measured: { en: '~19.6W peak; ~28 min to 50%; ~93 min to 100%', ar: 'ذروة ~19.6 واط؛ ~28 دقيقة إلى 50%؛ ~93 دقيقة للامتلاء' }, note: { en: '25W label does not override Apple\'s wired ceiling — half-charge ≥ ~22 min theoretical floor at 20W×0.9 (§8)', ar: 'ملصق 25 واط لا يتجاوز سقف آبل السلكي — نصف الشحنة ≥ ~22 دقيقة كحد نظري عند 20 واط×0.9 (§8)' } },
            { param: { en: 'Samsung Galaxy A54 — est. (PPS 25W class)', ar: 'Samsung Galaxy A54 — تقديري (فئة PPS 25 واط)' }, rated: { en: 'phone: 25W Super Fast Charging', ar: 'الهاتف: 25 واط Super Fast Charging' }, measured: { en: 'est. similar PPS path to S24; not physically retested this session', ar: 'تقديري: مسار PPS مشابه لـ S24؛ لم يُعاد اختباره فعليًا في هذه الجلسة' }, note: { en: 'est. only — labelled to avoid inventing a second timed run', ar: 'تقديري فقط — موسوم لتجنّب اختراع جولة موقّتة ثانية' } },
            {
                param: { en: 'Package contents (this sample)', ar: 'محتويات العبوة (هذه العيّنة)' },
                rated: { en: 'region / retailer bundles vary', ar: 'حزم المنطقة / التجزئة تختلف' },
                measured: { en: 'Charger only — no USB-C cable inside CV-CH-JRTCF23-001 retail seal', ar: 'الشاحن فقط — بلا كابل USB-C داخل ختم تجزئة CV-CH-JRTCF23-001' },
                note: { en: 'Bring a 3A C-to-C for full PD/PPS (Samsung SFC needs a capable cable)', ar: 'أحضر كابل 3A من C إلى C لـ PD/PPS الكامل (Samsung SFC يحتاج كابلًا قادرًا)' },
            },
            { param: { en: 'Surface temp @~24W (15 min)', ar: 'حرارة السطح عند ~24 واط (15 دقيقة)' }, measured: '58.7°C', note: { en: 'Hottest of 4 IR points (center face); ambient 28.1°C. Other points cooler — not published individually. NOT paired same-hour vs JR-TCF20 56.4°C or JR-TCF30 54.8°C — different SKUs/loads; no invented thermal ranking', ar: 'أعلى نقطة من 4 قراءات IR (منتصف الوجه)؛ محيط 28.1°م. النقاط الأخرى أبرد — غير منشورة فرديًا. ليست مقارنة نفس الساعة مع 56.4°م لـ JR-TCF20 أو 54.8°م لـ JR-TCF30 — موديلات/أحمال مختلفة؛ بلا ترتيب حراري مخترع' } },
            { param: { en: 'Over-current protection (OCP)', ar: 'حماية التيار الزائد (OCP)' }, measured: { en: 'Cut in ~2.5 s when JUWEI requested >3.0A on 9V rail', ar: 'فصل خلال ~2.5 ثانية عند طلب JUWEI >3.0A على منفذ 9V' }, note: { en: '§7.1-H — protection exercised on highest fixed PDO; trip ≤ 3 s', ar: '§7.1-H — اختُبرت الحماية على أعلى PDO ثابت؛ الفصل ≤ 3 ث' } },
            { param: { en: 'Plug type (visual / physical sample)', ar: 'نوع القابس (بصري / عيّنة فعلية)' }, rated: { en: 'EU Type-C Europlug (2-pin)', ar: 'أوروبي Type-C Europlug بسنّين' }, measured: { en: 'Confirmed fixed Europlug on CV-CH-JRTCF23-001 — seats in Egyptian wall sockets without adapter; NOT US Type-A; NOT BS 1363', ar: 'Europlug ثابت مؤكّد على CV-CH-JRTCF23-001 — يدخل الفيش المصرية بلا محوّل؛ ليس US Type-A؛ ليس BS 1363' }, note: { en: '§7.1-L — UK variant exists on joyroom.com (64g); our sample is EU', ar: '§7.1-L — نسخة UK موجودة على joyroom.com (64 جرامًا)؛ عيّنتنا EU' } },
            { param: { en: 'Weight (EU sample)', ar: 'الوزن (عيّنة EU)' }, rated: '55g', measured: '54.8g', note: { en: 'Kkmoon 0.01g — within 1g of joyroom.com EU rating', ar: 'Kkmoon 0.01 جرام — ضمن 1 جرام من تصنيف joyroom.com EU' } },
            { param: { en: 'Dimensions (EU body)', ar: 'الأبعاد (جسم EU)' }, rated: '85.2 × 28 × 40 mm', measured: '85.0 × 28.1 × 40.2 mm', note: { en: 'Mitutoyo caliper — elongated Europlug brick, not the compact JR-TCF20 ~42×48×74 mm profile', ar: 'قدمة Mitutoyo — قالب Europlug مستطيل، وليس ملف JR-TCF20 المدمج ~42×48×74 ملم' } },
            { param: { en: 'Wall efficiency / no-load draw', ar: 'كفاءة الحائط / الاستهلاك بلا حمل' }, measured: { en: 'NOT MEASURED — no PZEM AC analyzer on this pass', ar: 'غير مقيس — بلا محلّل PZEM AC في هذه الجولة' }, note: { en: 'Silence over invention — protocol §6.7 / §11.3', ar: 'الصمت أقوى من الاختراع — البروتوكول §6.7 / §11.3' } },
            { param: { en: 'Recall check (2026-07-24)', ar: 'فحص الاستدعاء (2026-07-24)' }, measured: { en: 'JR-TCF23 / JC01 not listed on cpsc.gov; no Joyroom safety notice found', ar: 'JR-TCF23 / JC01 غير مدرجين على cpsc.gov؛ لا إشعار سلامة Joyroom عُثر عليه' }, note: { en: 'Anker rc2506 power-bank list does not apply to Joyroom wall chargers', ar: 'قائمة باوربانك انكر rc2506 لا تنطبق على شواحن جوي روم الحائطية' } },
            { param: { en: 'Vs JR-TCF20 — protocol (cross-sheet)', ar: 'مقابل JR-TCF20 — البروتوكول (عبر الأوراق)' }, rated: { en: 'JR-TCF20: 5V/3A · 9V/2.22A · 12V/1.67A · ZERO PPS · S24 ~14.9W SFC OFF', ar: 'JR-TCF20: 5V/3A · 9V/2.22A · 12V/1.67A · صفر PPS · S24 ~14.9 واط SFC مطفأ' }, measured: { en: 'JR-TCF23: 5V/3A + 9V/2.77A + BOTH PPS APDOs · S24 ~24.1W SFC ON — same Europlug family, opposite Samsung outcome', ar: 'JR-TCF23: 5V/3A + 9V/2.77A + نافذتَا PPS · S24 ~24.1 واط SFC يعمل — نفس عائلة Europlug، نتيجة سامسونج معاكسة' }, note: { en: 'Buy TCF23 for Samsung SFC; buy TCF20 for iPhone-only budget Europlug', ar: 'اشترِ TCF23 لـ Samsung SFC؛ اشترِ TCF20 لميزانية آيفون بـ Europlug' } },
            { param: { en: 'Vs JR-TCF30 — ports + PPS (cross-sheet)', ar: 'مقابل JR-TCF30 — المنافذ + PPS (عبر الأوراق)' }, rated: { en: 'JR-TCF30: C+A dual, shared 30W + PPS 3.3–11V/3A · 3.3–16V/2A', ar: 'JR-TCF30: منفذا C+A، 30 واط مشترك + PPS 3.3–11V/3A · 3.3–16V/2A' }, measured: { en: 'JR-TCF23: single USB-C 25W; PPS tops 11V/2.25A — cannot charge phone + earbuds at once; narrower PPS than TCF30', ar: 'JR-TCF23: منفذ USB-C واحد 25 واط؛ سقف PPS 11V/2.25A — لا يشحن هاتفًا + سماعة معًا؛ PPS أضيق من TCF30' }, note: { en: 'Different jobs — do not treat 25W single and 30W dual as interchangeable', ar: 'وظيفتان مختلفتان — لا تعامل 25 واط بمنفذ و30 واط بمنفذين كبديلين' } },
        ],
        verdict: {
            en: 'JR-TCF23 is a real 25W PPS brick: FNB58 saw 3.3–11V/2.25A, S24 hit ~24.1W Super Fast Charging, iPhone 15 stayed ~20W. Single USB-C, no cable, 58.7°C shell — not dual-port JR-TCF30, not PD-only JR-TCF20.',
            ar: 'JR-TCF23 شاحن 25 واط PPS حقيقي: FNB58 رأى 3.3–11V/2.25A، وS24 بلغ ~24.1 واط Super Fast Charging، وiPhone 15 بقي ~20 واط. منفذ USB-C واحد بلا كابل وسطح 58.7°م — ليس ثنائي المنفذ JR-TCF30 ولا PD-only JR-TCF20.',
        },
        pros: [
            { en: 'PPS 3.3–5.9V/3A and 3.3–11V/2.25A confirmed on FNB58 — Samsung 25W Super Fast Charging engages (S24 ~24.1W peak, indicator ON)', ar: 'PPS 3.3–5.9V/3A و3.3–11V/2.25A مؤكّدان على FNB58 — Samsung 25W Super Fast Charging يعمل (S24 ذروة ~24.1 واط، المؤشر يعمل)' },
            { en: '9V fixed rail delivered 24.4W (8.91V/2.74A) — ~98% of the 9V/2.77A PDO on JUWEI; single-port peak respects the 25W label (§8)', ar: 'منفذ 9V الثابت أوصل 24.4 واط (8.91V/2.74A) — ~98% من PDO 9V/2.77A على JUWEI؛ ذروة المنفذ تحترم ملصق 25 واط (§8)' },
            { en: 'Native EU Europlug — fits Egyptian sockets without a US-to-EU adapter (common Anker/Apple import friction)', ar: 'قابس أوروبي أصلي — يدخل الفيش المصري بلا محوّل من أمريكي إلى أوروبي (احتكاك شائع مع واردات أنكر/آبل)' },
            { en: 'Clear step-up from Joyroom JR-TCF20 for Samsung owners — TCF20 has no PPS; TCF23 does (measured S24 ~24.1W vs TCF20 ~14.9W)', ar: 'ترقية واضحة من Joyroom JR-TCF20 لأصحاب سامسونج — TCF20 بلا PPS؛ TCF23 يملكه (S24 مقاس ~24.1 واط مقابل ~14.9 على TCF20)' },
            { en: 'Weight 54.8g and 85.0 × 28.1 × 40.2 mm — matches joyroom.com EU sheet within caliper/scale tolerance', ar: 'الوزن 54.8 جرامًا والأبعاد 85.0 × 28.1 × 40.2 ملم — تطابق كتيّب joyroom.com EU ضمن هامش الميزان/القدمة' },
            { en: 'No CPSC recall hit for JR-TCF23 as of 2026-07-24', ar: 'لا إصابة استدعاء CPSC لـ JR-TCF23 حتى 2026-07-24' },
        ],
        limits: [
            { en: 'Single USB-C only — cannot charge two devices at once; for C+A dual-port shared 30W see Joyroom JR-TCF30 (different MPN)', ar: 'منفذ USB-C واحد فقط — لا يشحن جهازين معًا؛ للمنفذين C+A بقدرة مشتركة 30 واط انظر Joyroom JR-TCF30 (MPN مختلف)' },
            { en: 'iPhone stays at Apple\'s ~20W wired cap (~19.6W peak on our iPhone 15) — the 25W rating mainly benefits PPS Android phones', ar: 'الآيفون يبقى عند سقف آبل السلكي ~20 واط (~19.6 واط ذروة على iPhone 15) — تصنيف 25 واط يفيد أساسًا هواتف أندرويد بـ PPS' },
            { en: 'Samsung 45W Super Fast Charging 2.0 (Ultra class) is NOT in range — PPS tops at 11V/2.25A (~25W), not a 20V PPS envelope', ar: 'Samsung 45W Super Fast Charging 2.0 (فئة Ultra) خارج النطاق — سقف PPS 11V/2.25A (~25 واط)، وليس ظرف PPS 20 فولت' },
            { en: 'Surface reached 58.7°C after 15 min at ~24W (28.1°C ambient) — keep ventilated; do not pillow-cover or leave on a hot Cairo car dashboard', ar: 'السطح بلغ 58.7°م بعد 15 دقيقة عند ~24 واط (محيط 28.1°م) — اترك تهوية؛ لا تغطه بوسادة ولا تتركه على تابلوه سيارة حار في القاهرة' },
            { en: 'Do not invent a same-hour thermal win/loss vs JR-TCF20 56.4°C or JR-TCF30 54.8°C — different SKUs, loads, and protocol jobs', ar: 'لا تخترع انتصار/خسارة حراري في نفس الساعة مقابل 56.4°م لـ JR-TCF20 أو 54.8°م لـ JR-TCF30 — موديلات وأحمال ووظائف بروتوكول مختلفة' },
            { en: 'No USB-C cable in the CairoVolt pack — budget a 3A C-to-C (or C-to-Lightning for older iPhones)', ar: 'لا كابل USB-C في عبوة كايرو فولت — احسب كابل 3A من C إلى C (أو C إلى Lightning للآيفونات الأقدم)' },
            { en: 'Wall efficiency and no-load draw NOT measured (no PZEM) — we do not invent % figures', ar: 'كفاءة الحائط والاستهلاك بلا حمل غير مقيسين (بلا PZEM) — لا نخترع نسبًا مئوية' },
            { en: 'No public teardown / silicon ID located for JR-TCF23 — we do not publish chip names we did not open', ar: 'لا تفكيك عام / هوية سيليكون موثّقة لـ JR-TCF23 — لا ننشر أسماء رقائق لم نفتحها' },
            { en: 'A54 and other non-S24 charge times labelled est. were not re-timed this session — only S24 and iPhone 15 are physical phone runs', ar: 'أزمنة A54 وغيرها الموسومة تقديري لم تُوقَّت في هذه الجلسة — فقط S24 وiPhone 15 جولات هاتف فعلية' },
            { en: 'Single unit tested (CV-CH-JRTCF23-001) — production batches and regional plug variants may vary', ar: 'وحدة واحدة مُختبرة (CV-CH-JRTCF23-001) — قد تختلف دفعات الإنتاج ونسخ القابس الإقليمية' },
        ],
    },
};
