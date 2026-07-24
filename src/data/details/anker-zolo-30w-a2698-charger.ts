// Details for: anker-zolo-30w-a2698-charger  (Anker Zolo 30W USB-C Wall Charger, model A2698)
// Lab sheet: CV-CH-A2698-001 — Wave Adj/Mid §7.1 ELEVATED gold-depth (Anker Zolo A2698 · ~599 EGP).
// CRITICAL PDO truth: fixed rails 5V/3A · 9V/3A · 15V/2A ONLY — NO 20V PDO (unlike A2147 Nano 3 DoC 20V/1.5A).
// Honesty gate: FNB58 confirmed three fixed PDOs + PPS 3.3–11V/3A; peak 29.4W on 15V/2A; no invented silicon IDs.
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · shell temp · Egypt plug honesty · recall 2026-07-24 · Eng. Omar Khaled.
// Peaks publish: 14.7W @5V · 26.6W @9V · 29.4W @15V · PPS ≈29.7W @11V/2.7A — all ≤ 30W label.
// Red-flag audit: no phantom 20V PDO · no invented efficiency % · no ChargerLAB chip names without teardown · no same-hour thermal A/B vs A2147 · peaks ≤ 30W label (§8 / §11.1).
// Export must remain `anker_zolo_30w_a2698_charger_detail` for the details registry.
import type { ProductDetail } from './_types';

export const anker_zolo_30w_a2698_charger_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker Zolo 30W (A2698, ~599 EGP): entry-tier single USB-C GaN. FNB58 decoded fixed PDOs 5V/3A · 9V/3A · 15V/2A only — NO 20V PDO (A2147 Nano 3 DoC lists 20V/1.5A). PPS 3.3–11V/3A covers Samsung 25W SFC on S23/S24 base and A54/A55.',
            'CairoVolt peaks: 29.4W on 15V/2A (JUWEI) and PPS hold 11V/2.7A ≈ 29.7W for 5 min — ~98% of the 30W label on sample CV-CH-A2698-001 (2026-07-24). Also 14.7W @5V and 26.6W @9V.',
            'Real phones: Galaxy S24 base 0→100% ≈ 65 min via 9V PPS; iPhone 15 ~26 min to 50% / ~91 min to 100% at Apple\'s ~20W wired cap — extra watts above ~20W do not unlock faster iPhone charge.',
            'Candid vs A2147: ~98% of published phone-class PD/PPS for ~75% of street price. Measurable Zolo costs on our sample: no 20V PDO, shell 56.3°C @29W, ±0.15V stability, no public ChargerLAB teardown. A2147 load/thermal pass not yet on its page — no invented A/B delta.',
            'Foldable prongs; weight 46g exact. No PZEM — we publish no wall efficiency %. Recall check 2026-07-24: A2698 not on anker.com/product-recalls or cpsc.gov. Single unit; batches may vary.',
        ],
        ar: [
            'Anker Zolo 30W (A2698، ~599 جنيه): شاحن GaN اقتصادي بمنفذ USB-C واحد. FNB58 فكّ PDO ثابتة 5V/3A · 9V/3A · 15V/2A فقط — بلا PDO 20V (شهادة A2147 Nano 3 تُدرج 20V/1.5A). PPS 3.3–11V/3A يغطي Samsung 25W SFC على S23/S24 القاعدي وA54/A55.',
            'ذروات CairoVolt: 29.4 واط على 15V/2A (JUWEI) وتثبيت PPS 11V/2.7A ≈ 29.7 واط لمدة 5 دقائق — نحو 98% من ملصق 30 واط على العيّنة CV-CH-A2698-001 (2026-07-24). كذلك 14.7 واط عند 5V و26.6 واط عند 9V.',
            'هواتف حقيقية: Galaxy S24 القاعدي 0→100% ≈ 65 دقيقة عبر PPS 9 فولت؛ iPhone 15 نحو 26 دقيقة إلى 50% / نحو 91 دقيقة للامتلاء ضمن سقف آبل ~20 واط — الواط الزائد فوق ~20 لا يسرّع شحن الآيفون السلكي.',
            'صراحة مقابل A2147: نحو 98% من قدرة PD/PPS المنشورة لفئة الهواتف بنحو 75% من سعر الشارع. تكاليف Zolo المقاسة: بلا PDO 20V، سطح 56.3°م عند 29 واط، ثبات ±0.15V، بلا تفكيك ChargerLAB عام. مرحلة تحميل/حرارة A2147 غير منشورة بعد — لا فرق A/B مخترع.',
            'سنون قابلة للطي؛ الوزن 46 جرامًا تطابق تام. بلا PZEM — لا ننشر كفاءة حائط %. فحص الاستدعاء 2026-07-24: A2698 غير مدرج في anker.com/product-recalls أو cpsc.gov. وحدة واحدة؛ قد تختلف الدفعات.',
        ],
    },
    localContext: {
        en:
            'For an Egyptian buyer at ~599 EGP, A2698 Zolo answers: "I need a real 30W USB-C GaN brick without paying Nano 3 money." ' +
            'CRITICAL SKU MAP. (A) A2698 = this sheet — single USB-C, 30W, fixed PDOs stop at 15V/2A, PPS 3.3–11V/3A, foldable prongs, ~46g. (B) A2147 Nano 3 (~790 EGP typical) = same phone-class PPS envelope PLUS published 20V/1.5A + ChargerLAB silicon — pick when 20V or chip transparency matters. (C) A2741/A2732 = car chargers, not wall. ' +
            'Six realistic fits. (1) STUDENT (AUC/GUC/Cairo University): iPhone 15 or Galaxy A55 + maybe a tablet — 30W covers phone caps (iPhone ~20W, A55 25W, iPad Air ~20W); save ~200 EGP vs A2147 for a 100W-rated cable. ' +
            '(2) UBER / CAREEM driver home top-up: wall brick only — not a 12V car socket unit; GaN heat still matters in a 45°C parked car if you ever misuse it there. ' +
            '(3) First-job graduate leaving MicroUSB: enter PD/PPS under 600 EGP. (4) Family bulk-buy: 200 EGP/unit vs A2147 scales across 3–4 bricks. ' +
            '(5) Expat visiting from Dubai/Riyadh needing a temporary Egyptian-socket charger for two weeks. (6) WRONG — silicon hobbyists (no ChargerLAB teardown) and anyone who needs a confirmed 20V PDO for occasional MacBook Air trickle (choose A2147 or A2664). ' +
            'HEAT: Cairo July–Aug avg high ~35°C (WeatherSpark). We measured 56.3°C shell after 15 min @29W in 28.4°C lab air — expect ~60–62°C in a hotter apartment; keep uncovered. ' +
            'ELECTRICITY: 30W × 1 h ≈ 0.030 kWh → a few piastres on EgyptERA tariffs. No vampire/efficiency % — PZEM not run. PLUG: sample may be UK BS 1363 or EU2 — verify the unit in hand.',
        ar:
            'للمشتري المصري عند ~599 جنيه، A2698 Zolo يجيب: "أحتاج شاحن USB-C GaN 30 واط حقيقيًا بلا دفع سعر Nano 3." ' +
            'خريطة الموديلات الحرجة. (أ) A2698 = هذه الورقة — USB-C واحد، 30 واط، PDO الثابتة تقف عند 15V/2A، PPS 3.3–11V/3A، سنون قابلة للطي، ~46 جرامًا. (ب) A2147 Nano 3 (~790 جنيه معتاد) = نفس ظرف PPS لفئة الهواتف مع 20V/1.5A منشور + سيليكون ChargerLAB — اختره عند الحاجة لـ 20V أو شفافية الرقائق. (ج) A2741/A2732 = شواحن سيارة لا حائط. ' +
            'ستة استخدامات واقعية. (1) طالب (AUC/GUC/جامعة القاهرة): iPhone 15 أو Galaxy A55 وربما تابلت — 30 واط يغطي أسقف الهاتف؛ وفّر ~200 جنيه مقابل A2147 لكابل بتصنيف 100 واط. ' +
            '(2) سائق أوبر/كريم تعبئة منزلية: شاحن حائط فقط — ليس مقبس 12V؛ حرارة GaN تهم إن أُسيء استخدامه في سيارة متوقفة. ' +
            '(3) خريج يغادر MicroUSB: دخول PD/PPS بأقل من 600 جنيه. (4) شراء عائلي: توفير 200 جنيه/وحدة مقابل A2147 عبر 3–4 شواحن. ' +
            '(5) مغترب زائر يحتاج شاحنًا مؤقتًا بفيشة مصرية. (6) خاطئ — هواة السيليكون (بلا تفكيك ChargerLAB) ومن يحتاج PDO 20V مؤكّدًا لشحن MacBook Air بطيء أحيانًا (اختر A2147 أو A2664). ' +
            'الحرارة: متوسط عظمى القاهرة يوليو–أغسطس ~35°م. قِسنا 56.3°م سطح بعد 15 دقيقة عند 29 واط في هواء مختبر 28.4°م — توقّع ~60–62°م في شقة أحر؛ اتركه مكشوفًا. ' +
            'الكهرباء: 30 واط × ساعة ≈ 0.030 كيلوواط·ساعة → قروش على تعريفة EgyptERA. بلا نسب vampire/كفاءة — لم يُشغَّل PZEM. القابس: العيّنة قد تكون BS 1363 أو EU2 — تحقق من الوحدة في يدك.',
    },
    specifications: {
        'Model': { en: 'Anker Zolo 30W USB-C Wall Charger (A2698)', ar: 'Anker Zolo 30W شاحن حائط USB-C (A2698)' },
        'Positioning (candid)': { en: 'Anker BUDGET / entry-tier 30W GaN — Zolo is Anker\'s own value sub-brand (NOT a counterfeit); sits below 511 Nano 3 (A2147) in Anker\'s hierarchy', ar: 'شاحن GaN 30 واط اقتصادي / أول درجة من انكر — Zolo علامة فرعية لانكر نفسها (ليست تقليدًا)؛ تحت 511 Nano 3 (A2147) في تسلسل انكر' },
        'Street price (Egypt)': { en: '~599 EGP typical CairoVolt retail', ar: '~599 جنيه سعر تجزئة معتاد في كايرو فولت' },
        'Rated Output': { en: '30W Max (single USB-C PD 3.0)', ar: '30 واط كحد أقصى (USB-C واحد PD 3.0)' },
        'PD Fixed Profiles (FNB58)': { en: '5V/3A · 9V/3A · 15V/2A — three fixed rails ONLY; does NOT expose 20V PDO (A2147 DoC lists 20V/1.5A)', ar: '5V/3A · 9V/3A · 15V/2A — ثلاثة بروتوكولات ثابتة فقط؛ لا يعرض PDO 20V (شهادة A2147 تُدرج 20V/1.5A)' },
        'PPS Window (FNB58)': { en: '3.3–11V/3A — covers Samsung 25W SFC; does NOT reach 20V PPS for Samsung 45W SFC 2.0 Ultra class', ar: '3.3–11V/3A — يغطي Samsung 25W SFC؛ لا يصل إلى PPS 20 فولت لفئة Samsung 45W SFC 2.0 Ultra' },
        'Technology': { en: 'GaN + Anker PowerIQ 3.0 + ActiveShield (generation NOT published for Zolo — marketing says ActiveShield without a version number)', ar: 'GaN + Anker PowerIQ 3.0 + ActiveShield (الجيل غير منشور لـ Zolo — التسويق يذكر ActiveShield بلا رقم إصدار)' },
        'Silicon (candid)': { en: 'NO independent teardown of A2698 as of July 2026 — we do NOT invent chip IDs. For ChargerLAB-cited silicon choose A2147 (SC3056 + CYPD3174 + VS3506AE + SC3503 + Z4RGP30MP)', ar: 'لا تفكيك مستقل لـ A2698 حتى يوليو 2026 — لا نخترع هويات رقائق. لسيليكون موثّق من ChargerLAB اختر A2147' },
        'Ports': { en: '1× USB-C only', ar: '1× USB-C فقط' },
        'Weight': { en: '46g rated — CairoVolt measured 46g (Kkmoon 0.01g exact match)', ar: '46 جرامًا اسمي — قاست CairoVolt 46 جرامًا (تطابق تام على Kkmoon 0.01 جرام)' },
        'Dimensions (folded)': { en: 'Approx. 34 × 33 × 30 mm — measured 34.2 × 33.1 × 30.0 mm (Mitutoyo)', ar: 'نحو 34 × 33 × 30 ملم — مقاس 34.2 × 33.1 × 30.0 ملم (Mitutoyo)' },
        'Input': { en: '100–240V ~ 50/60Hz — tested at 221V Egyptian mains', ar: '100–240 فولت ~ 50/60 هرتز — اختُبر على 221 فولت كهرباء مصر' },
        'Plug (ME sample honesty)': { en: 'UK BS 1363 OR EU2 depending on shipment — verify on the physical unit before assuming socket fit', ar: 'بريطاني BS 1363 أو EU2 حسب الشحنة — تحقق على الوحدة الفعلية قبل افتراض ملاءمة الفيشة' },
        'Safety': { en: 'Anker ActiveShield thermal monitoring + MultiProtect; OCP cut ~2s at >3.5A on 15V (CairoVolt)', ar: 'مراقبة ActiveShield + MultiProtect؛ OCP فصل ~2 ث عند >3.5A على 15V (CairoVolt)' },
        'In the Box': { en: 'Charger only — USB-C cable not included (3A cable carries full 30W)', ar: 'الشاحن فقط — كابل USB-C غير مرفق (كابل 3A يمرّر 30 واط كاملة)' },
        'Vs A2147 (candid)': { en: 'Phone-class PD/PPS ≈ A2147 for ~75% price. Zolo costs on our sample: (a) no 20V PDO (b) 56.3°C @29W (c) ±0.15V (d) no teardown (e) unspecified ActiveShield gen. A2147 load/thermal not yet published — no invented delta.', ar: 'قدرة هاتف PD/PPS ≈ A2147 بنحو 75% من السعر. تكاليف Zolo: (أ) بلا 20V (ب) 56.3°م عند 29 واط (ج) ±0.15V (د) بلا تفكيك (هـ) جيل ActiveShield غير محدد. مرحلة A2147 غير منشورة — بلا فرق مخترع.' },
        'Efficiency': { en: 'Not measured — no PZEM AC analyzer on this pass; we do not invent wall efficiency %', ar: 'غير مقيسة — بلا محلّل PZEM AC؛ لا نخترع نسبة كفاءة من الحائط' },
        'Recall Status (2026-07-24)': { en: 'NOT RECALLED — anker.com/product-recalls + cpsc.gov; Anker 2024–2025 recalls cover cables A8482/A8483/A8465 and power banks A1263/A1257/A1647/A1652/A1681/A1689 — no Zolo wall chargers', ar: 'لا استدعاء — anker.com/product-recalls + cpsc.gov؛ استدعاءات 2024–2025 تخص كابلات وباوربانك — لا شواحن Zolo حائط' },
        'Sample / Lab ID': { en: 'CV-CH-A2698-001 · Eng. Omar Khaled · 2026-07-24', ar: 'CV-CH-A2698-001 · م. عمر خالد · 2026-07-24' },
        'Protocol': { en: 'CairoVolt Bench Test Protocol §7.1 (wall chargers) + §8 physics gates + §11 red-flag checklist', ar: 'بروتوكول اختبار كايرو فولت §7.1 (شواحن الحائط) + بوابات الفيزياء §8 + قائمة الأعلام الحمراء §11' },
    },
    benchTest: {
        sku: 'A2698',
        sampleId: 'CV-CH-A2698-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit · CairoVolt lab, New Cairo · ambient 28.4°C · humidity 46% RH (HTC-2) · mains 221V (UT61E) · foldable-prong sample',
            ar: 'وحدة واحدة من مخزون التجزئة · مختبر كايرو فولت، القاهرة الجديدة · محيط 28.4°م · رطوبة 46% (HTC-2) · جهد الحائط 221 فولت (UT61E) · عيّنة بسنون قابلة للطي',
        },
        methodology: {
            en:
                'A2698 (Zolo) was run under CairoVolt wall-charger protocol §7.1 on sample CV-CH-A2698-001 (Eng. Omar Khaled, 2026-07-24). ' +
                '§8 physics gates before publish: fixed PDOs obey W = V × A (5×3 = 15W; 9×3 = 27W; 15×2 = 30W); PPS ceiling 11×3 = 33W env / 30W label; single-port peak ≤ 30W label; measured peaks 14.7 / 26.6 / 29.4W all ≤ rated rails; iPhone 15 (12.99Wh) half-charge ≥ Battery_Wh ÷ (Charging_W × ~0.90) — ~22 min theoretical floor at 20W, so ~26 min measured is allowed; Samsung 25W SFC requires a real PPS APDO — confirmed 3.3–11V/3A before claiming SFC. ' +
                '(A) FNB58 fw v1.3 PD Info decode with no load — enumerated three fixed PDOs only + PPS 3.3–11V/3A. Critical red-flag gate: confirm ABSENCE of 20V PDO (do not copy A2147\'s four-rail DoC onto Zolo). ' +
                '(B–C) Each fixed rail loaded on JUWEI 35W for 2 minutes; logged FNB58 V·A·W; single-port peak on highest available rail (15V/2A = 29.4W). ' +
                '(D) N/A — single port. ' +
                '(E) PPS programmed hold at 11V/2.7A ≈ 29.7W for 5 minutes — voltage stability ±0.15V on fixed rails under load. ' +
                '(F) Real phones from ~0%: Samsung Galaxy S24 base (14.31Wh, PPS SFC) timed 0→100%; Apple iPhone 15 (12.99Wh, ~20W PD cap) timed 0→50% and 0→100%. ' +
                '(G) BENETECH GM320 IR (ε=0.95) surface temps at 4 points after 15 min sustained ~29W — A2698-only; A2147 independent thermal not published — no invented A/B ranking. ' +
                '(H) OCP: JUWEI request >3.5A on 15V rail (highest available — there is no 20V rail). (K) Kkmoon 0.01g weight + Mitutoyo caliper. (L) Visual plug check: UK BS 1363 OR EU2 batch variance — honesty over assumption. ' +
                '(I–J) NOT run: no-load vampire and wall efficiency — no PZEM-004T; we publish neither (§6.7 / §11.3). ' +
                '(M) Recall check anker.com/product-recalls + cpsc.gov dated 2026-07-24 — A2698 / Zolo wall not listed. ' +
                'Silicon: no ChargerLAB / LumaFieldTV / Notebookcheck teardown for Zolo — chip IDs refused. Sibling A2147 cited for SKU/DoC contrast only (20V/1.5A + silicon), not same-hour paired load. ' +
                'Independent corroboration (not our data): Anker A2698 marketing enumerates 30W USB-C; Samsung documents 25W SFC via PPS on S23/S24 base; MacRumors documents iPhone ~20W wired ceiling; A2147 DoC lists 20V/1.5A (vendor contrast). ' +
                'Peaks-first publish rule: every wattage claim on this page traces to FNB58+JUWEI or a timed phone session on CV-CH-A2698-001 — no brochure-only peaks. Single unit; batches may vary.',
            ar:
                'شُغّل A2698 (Zolo) وفق بروتوكول شواحن الحائط §7.1 على العيّنة CV-CH-A2698-001 (م. عمر خالد، 2026-07-24). ' +
                'بوابات §8 قبل النشر: PDO الثابتة تطيع W = V × A؛ سقف PPS 11×3؛ ذروة المنفذ ≤ ملصق 30 واط؛ الذروات المقاسة 14.7 / 26.6 / 29.4 واط كلها ≤ الأسقف؛ نصف شحنة iPhone 15 ≥ الحد النظري ~22 دقيقة عند 20 واط لذا ~26 دقيقة مسموحة؛ Samsung 25W SFC يتطلب PPS APDO حقيقي — أكّدنا 3.3–11V/3A. ' +
                '(A) فك FNB58 لـ PD Info بلا حمل — ثلاثة PDO ثابتة فقط + PPS 3.3–11V/3A. بوابة علم أحمر: تأكيد غياب PDO 20V (لا تنسخ مجموعة A2147 الرباعية على Zolo). ' +
                '(B–C) كل منفذ ثابت على JUWEI دقيقتين؛ ذروة المنفذ على أعلى متاح (15V/2A = 29.4 واط). (D) غير منطبق — منفذ واحد. ' +
                '(E) تثبيت PPS 11V/2.7A ≈ 29.7 واط 5 دقائق — ثبات جهد ±0.15V على الثابتة. ' +
                '(F) هواتف: S24 0→100%؛ iPhone 15 0→50% و0→100%. (G) حرارة سطح GM320 بعد 15 دقيقة عند ~29 واط — أرقام A2698 فقط بلا ترتيب حراري مخترع مقابل A2147. ' +
                '(H) OCP على 15V. (K) وزن + أبعاد. (L) قابس UK أو EU2 حسب الدفعة. (I–J) بلا PZEM. (M) استدعاء 2026-07-24 — غير مدرج. ' +
                'سيليكون: لا تفكيك عام — نرفض أسماء الرقائق. A2147 للاستشهاد بالتباين فقط. ' +
                'قاعدة الذروات أولًا: كل ادعاء واط على هذه الصفحة يعود إلى FNB58+JUWEI أو جلسة هاتف موقّتة على CV-CH-A2698-001 — بلا ذروات كتيّب فقط. وحدة واحدة؛ قد تختلف الدفعات.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'PD/PPS handshake decode + inline V·A·W — critical three-PDO + no-20V confirmation', ar: 'فك مصافحة PD/PPS + قياس V·A·W — تأكيد ثلاثة PDO وغياب 20V' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant-load peaks on fixed PDOs, PPS hold, OCP push on 15V', ar: 'ذروات حمل ثابت على PDO، تثبيت PPS، دفع OCP على 15V' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temperature at 4 points after 15 min ~29W sustained', ar: 'حرارة السطح على 4 نقاط بعد 15 دقيقة عند ~29 واط متواصل' } },
            { name: 'UNI-T UT61E digital multimeter', use: { en: 'Egyptian mains voltage at the socket (221V)', ar: 'جهد الكهرباء المصرية عند البريزة (221 فولت)' } },
            { name: 'HTC-2 thermo-hygrometer', use: { en: 'Lab ambient 28.4°C / 46% RH at start', ar: 'محيط المختبر 28.4°م / 46% رطوبة عند البدء' } },
            { name: 'Kkmoon 0.01g scale · Mitutoyo digital caliper', use: { en: 'Weight and outer dimensions (folded)', ar: 'الوزن والأبعاد الخارجية (مطوي)' } },
            { name: 'Samsung Galaxy S24 base (14.31Wh)', use: { en: 'Real-device Samsung 25W SFC / PPS verification', ar: 'التحقق من Samsung 25W SFC / PPS بجهاز حقيقي' } },
            { name: 'Apple iPhone 15 (12.99Wh)', use: { en: 'Real-device ~20W PD cap charge timing', ar: 'توقيت شحن سقف ~20 واط PD بجهاز حقيقي' } },
        ],
        results: [
            { param: { en: 'PDOs decoded (FNB58)', ar: 'PDO المفكوكة (FNB58)' }, rated: '5V/3A · 9V/3A · 15V/2A', measured: { en: 'Three fixed rails ONLY — matched Anker Zolo class; NO 20V PDO advertised', ar: 'ثلاثة بروتوكولات ثابتة فقط — مطابق لفئة Zolo؛ بلا PDO 20V معلن' }, note: { en: '§7.1-A / §11 red-flag — copying A2147\'s 20V/1.5A onto A2698 would be false', ar: '§7.1-A / علم أحمر §11 — نسخ 20V/1.5A من A2147 على A2698 يكون كاذبًا' } },
            { param: { en: 'PPS APDO window (FNB58)', ar: 'نافذة PPS APDO (FNB58)' }, rated: '3.3–11V/3A', measured: { en: 'Present — Samsung 25W SFC envelope available', ar: 'موجودة — ظرف Samsung 25W SFC متاح' }, note: { en: 'Matches A2147\'s primary phone-class PPS window (vendor DoC contrast on secondary 3.3–16V/2A not claimed for Zolo)', ar: 'يطابق ظرف PPS الأساسي لفئة الهواتف في A2147 (ظرف 3.3–16V/2A الثانوي غير مُدّعى لـ Zolo)' } },
            { param: { en: 'Peak 5V/3A rail', ar: 'ذروة منفذ 5V/3A' }, rated: '15W', measured: '14.7W', note: { en: 'JUWEI 2 min hold — ≥95% of rated (§7.1-B); voltage stable 4.98–5.02V', ar: 'تثبيت JUWEI دقيقتان — ≥95% من الاسمي (§7.1-B)؛ جهد ثابت 4.98–5.02 فولت' } },
            { param: { en: 'Peak 9V/3A rail', ar: 'ذروة منفذ 9V/3A' }, rated: '27W', measured: '26.6W', note: { en: 'iPhone / iPad / Samsung fixed-rail path — ~98.5% of rated PDO', ar: 'مسار iPhone / iPad / سامسونج الثابت — ~98.5% من PDO الاسمي' } },
            { param: { en: 'Peak 15V/2A rail (highest fixed)', ar: 'ذروة منفذ 15V/2A (أعلى ثابت)' }, rated: '30W', measured: '29.4W', note: { en: '§7.1-C single-port peak — ~98% of 30W label; THIS is Zolo\'s highest fixed PDO (no 20V)', ar: '§7.1-C ذروة المنفذ — ~98% من ملصق 30 واط؛ هذا أعلى PDO ثابت في Zolo (بلا 20V)' } },
            {
                param: { en: 'Profile 20V/1.5A', ar: 'البروتوكول 20V/1.5A' },
                rated: { en: 'NOT PRESENT on A2698', ar: 'غير موجود في A2698' },
                measured: { en: 'not advertised in PD handshake — confirmed absent via FNB58', ar: 'غير معلن في مصافحة PD — أُكّد غيابه عبر FNB58' },
                note: { en: 'Prior truth preserved — A2147 HAS this rail; A2698 does NOT — the measurable PD-set difference for phone buyers who occasionally need laptop-voltage trickle', ar: 'حقيقة سابقة محفوظة — A2147 يملك هذا الرافد؛ A2698 لا — الفرق القابل للقياس في مجموعة PD لمن يحتاج أحيانًا شحن لابتوب بطيئًا بجهد 20V' },
            },
            { param: { en: 'Single-port peak (charger total)', ar: 'ذروة المنفذ الواحد (إجمالي الشاحن)' }, rated: '30W', measured: '29.4W (15V fixed) / 29.7W (PPS hold)', note: { en: '§7.1-C / §8 / §11.1 — peak ≤ label; ≥97% of charger total; peaks published above marketing fiction', ar: '§7.1-C / §8 / §11.1 — الذروة ≤ الملصق؛ ≥97% من إجمالي الشاحن؛ الذروات منشورة فوق خيال التسويق' } },
            { param: { en: 'Multi-port split', ar: 'تقسيم متعدد المنافذ' }, rated: { en: 'N/A — single USB-C', ar: 'غير منطبق — USB-C واحد' }, measured: { en: 'One port only — §7.1-D multi-port share not applicable', ar: 'منفذ واحد فقط — مشاركة §7.1-D غير منطبقة' }, note: { en: 'For dual-port Anker wall jobs see A2669 / dual-C SKUs — not this Zolo brick', ar: 'لمهام أنكر الحائط بمنفذين انظر A2669 / موديلات ثنائية C — ليس هذا الطوب Zolo' } },
            { param: { en: 'PPS hold 11V/2.7A', ar: 'تثبيت PPS عند 11V/2.7A' }, rated: '33W env / 30W max', measured: { en: '≈29.7W stable 5 min', ar: '≈29.7 واط ثابت 5 دقائق' }, note: { en: '§7.1-E inside 3.3–11V/3A window — primary Samsung 25W PPS path', ar: '§7.1-E داخل نافذة 3.3–11V/3A — مسار Samsung 25W PPS الأساسي' } },
            { param: { en: 'Voltage stability under load', ar: 'ثبات الجهد تحت الحمل' }, measured: '±0.15V', note: { en: 'Within USB-PD ±5% on fixed rails (§7.1-E band ≤ ±0.2V = acceptable)', ar: 'ضمن USB-PD ±5% على الثابتة (§7.1-E ≤ ±0.2V = مقبول)' } },
            { param: { en: 'Samsung Galaxy S24 base — 0→100%', ar: 'Samsung Galaxy S24 القاعدي — 0→100%' }, rated: { en: 'phone: 25W PPS Super Fast Charging', ar: 'الهاتف: 25 واط PPS Super Fast Charging' }, measured: { en: '~65 min to full (0→100%) via 9V PPS', ar: 'نحو 65 دقيقة للامتلاء (0→100%) عبر PPS 9 فولت' }, note: { en: 'Confirms PPS claim is real — same published envelope class as A2147 DoC phone window', ar: 'يؤكّد أن ادعاء PPS حقيقي — نفس فئة ظرف الهاتف المنشور في شهادة A2147' } },
            { param: { en: 'iPhone 15 — 0→50% / 0→100%', ar: 'iPhone 15 — 0→50% / 0→100%' }, rated: { en: 'phone: ~20W PD real-world cap (MacRumors)', ar: 'الهاتف: سقف فعلي ~20 واط PD (MacRumors)' }, measured: { en: '~26 min to 50%; ~91 min to 100% via 9V/2.2A', ar: 'نحو 26 دقيقة إلى 50%؛ نحو 91 دقيقة للامتلاء عبر 9V/2.2A' }, note: { en: '30W label does not override Apple\'s wired ceiling — half-charge ≥ ~22 min theoretical floor (§8)', ar: 'ملصق 30 واط لا يتجاوز سقف آبل — نصف الشحنة ≥ ~22 دقيقة نظريًا (§8)' } },
            { param: { en: 'Package contents (this sample)', ar: 'محتويات العبوة (هذه العيّنة)' }, rated: { en: 'region / retailer bundles vary', ar: 'حزم المنطقة / التجزئة تختلف' }, measured: { en: 'Charger only — no USB-C cable inside CV-CH-A2698-001 retail seal', ar: 'الشاحن فقط — بلا كابل USB-C داخل ختم تجزئة CV-CH-A2698-001' }, note: { en: 'Bring a 3A C-to-C for full PD/PPS', ar: 'أحضر كابل 3A من C إلى C لـ PD/PPS الكامل' } },
            { param: { en: 'Surface temp @29W (15 min)', ar: 'حرارة السطح عند 29 واط (15 دقيقة)' }, measured: { en: '56.3°C max (center face among 4 IR points)', ar: 'أعلى 56.3°م (منتصف الوجه من 4 نقاط IR)' }, note: { en: 'Ambient 28.4°C. A2147 independent thermal pass not published — NO invented same-hour A/B ranking (§11)', ar: 'محيط 28.4°م. مرحلة حرارة A2147 غير منشورة — بلا ترتيب A/B مخترع في نفس الساعة (§11)' } },
            { param: { en: 'Over-current protection (OCP)', ar: 'حماية التيار الزائد (OCP)' }, measured: { en: 'Cut in ~2 s when JUWEI requested >3.5A on 15V rail', ar: 'فصل خلال ~2 ثانية عند طلب JUWEI >3.5A على منفذ 15V' }, note: { en: '§7.1-H — trip ≤ 3 s; exercised on highest available rail (15V, not 20V)', ar: '§7.1-H — فصل ≤ 3 ث؛ على أعلى بروتوكول متاح (15V وليس 20V)' } },
            { param: { en: 'Plug type (visual / physical sample)', ar: 'نوع القابس (بصري / عيّنة فعلية)' }, rated: { en: 'UK BS 1363 OR EU2 (shipment-dependent)', ar: 'بريطاني BS 1363 أو EU2 (حسب الشحنة)' }, measured: { en: 'Foldable-prong ME retail unit — verify variant on your brick before socket assumptions', ar: 'وحدة تجزئة ME بسنون قابلة للطي — تحقق من النوع على شاحنك قبل افتراض الفيشة' }, note: { en: '§7.1-L honesty — both can work with Egyptian universal sockets; do not invent a single plug SKU', ar: 'صدق §7.1-L — كلاهما قد يعمل مع الفيش المصرية العامة؛ لا نخترع SKU قابس واحد' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '46g', measured: '46g', note: { en: 'Kkmoon 0.01g — exact match to Anker spec (§7.1-K)', ar: 'Kkmoon 0.01 جرام — تطابق تام مع مواصفة انكر (§7.1-K)' } },
            { param: { en: 'Dimensions (folded)', ar: 'الأبعاد (مطوي)' }, rated: '34×33×30 mm', measured: '34.2×33.1×30.0 mm', note: { en: 'Mitutoyo caliper — within 0.2 mm of spec', ar: 'قدمة Mitutoyo — ضمن 0.2 ملم من المواصفة' } },
            { param: { en: 'Wall efficiency / no-load draw', ar: 'كفاءة الحائط / الاستهلاك بلا حمل' }, measured: { en: 'NOT MEASURED — no PZEM AC analyzer on this pass', ar: 'غير مقيس — بلا محلّل PZEM AC في هذه الجولة' }, note: { en: 'Silence over invention — protocol §6.7 / §11.3', ar: 'الصمت أقوى من الاختراع — البروتوكول §6.7 / §11.3' } },
            { param: { en: 'Silicon identity', ar: 'هوية السيليكون' }, measured: { en: 'NOT DOCUMENTED — no independent A2698 teardown (ChargerLAB / LumaFieldTV / Notebookcheck as of 2026-07-24)', ar: 'غير موثّقة — لا تفكيك مستقل لـ A2698 حتى 2026-07-24' }, note: { en: 'Red-flag: inventing SC3056/CYPD3174-class IDs from A2147 teardown onto Zolo is forbidden', ar: 'علم أحمر: اختراع هويات فئة SC3056/CYPD3174 من تفكيك A2147 على Zolo ممنوع' } },
            { param: { en: 'Recall check (2026-07-24)', ar: 'فحص الاستدعاء (2026-07-24)' }, measured: { en: 'A2698 / Zolo wall not listed on anker.com/product-recalls or cpsc.gov', ar: 'A2698 / Zolo الحائط غير مدرجين على anker.com/product-recalls أو cpsc.gov' }, note: { en: 'Cable/power-bank recall lists do not apply to this wall SKU', ar: 'قوائم استدعاء الكابلات/الباوربانك لا تنطبق على هذا الموديل الحائطي' } },
            { param: { en: 'Vs A2147 — PDO / transparency (cross-sheet)', ar: 'مقابل A2147 — PDO / الشفافية (عبر الأوراق)' }, rated: { en: 'A2147 DoC: 5V/3A · 9V/3A · 15V/2A · 20V/1.5A + PPS 3.3–11V/3A · 3.3–16V/2A + ChargerLAB silicon', ar: 'شهادة A2147: أربعة PDO ثابتة تشمل 20V/1.5A + ظرفَي PPS + سيليكون ChargerLAB' }, measured: { en: 'A2698 measured: three fixed PDOs (no 20V) + PPS 3.3–11V/3A + 29.4W peak — pay ~200 EGP less for phone-only use', ar: 'A2698 مقاس: ثلاثة PDO ثابتة (بلا 20V) + PPS 3.3–11V/3A + ذروة 29.4 واط — أدفع ~200 جنيه أقل لاستخدام هاتف فقط' }, note: { en: 'Buy A2698 for value phone/tablet; buy A2147 for 20V rail + cited chips — not same-hour thermal ranking', ar: 'اشترِ A2698 لقيمة الهاتف/التابلت؛ اشترِ A2147 لرافد 20V + رقائق موثّقة — بلا ترتيب حراري نفس الساعة' } },
        ],
        verdict: {
            en: 'A2698 Zolo is a real 30W GaN phone brick: 29.4W peak, PPS 3.3–11V/3A, S24 ~65 min full, iPhone ~26 min to 50%. No 20V PDO, 56.3°C shell, no teardown — choose A2147 only if you need 20V or cited silicon.',
            ar: 'A2698 Zolo شاحن GaN 30 واط حقيقي للهاتف: ذروة 29.4 واط، PPS 3.3–11V/3A، S24 نحو 65 دقيقة امتلاء، آيفون نحو 26 دقيقة إلى 50%. بلا PDO 20V وسطح 56.3°م وبلا تفكيك — اختر A2147 فقط إن احتجت 20V أو سيليكون موثّق.',
        },
        pros: [
            { en: '29.4W measured peak on 15V/2A = ~98% of 30W label; PPS hold ≈29.7W at 11V/2.7A for 5 min — genuine spec-compliant delivery (§7.1-C)', ar: 'ذروة 29.4 واط على 15V/2A = ~98% من ملصق 30 واط؛ تثبيت PPS ≈29.7 واط عند 11V/2.7A لمدة 5 دقائق — تسليم مطابق للمواصفة (§7.1-C)' },
            { en: 'PPS 3.3–11V/3A confirmed on FNB58 — Samsung 25W Super Fast Charging path works (S24 ~65 min 0→100%)', ar: 'PPS 3.3–11V/3A مؤكّد على FNB58 — مسار Samsung 25W Super Fast Charging يعمل (S24 نحو 65 دقيقة 0→100%)' },
            { en: 'iPhone 15 reached 50% in ~26 min within Apple\'s ~20W wired ceiling — honest phone-cap behaviour, not charger magic', ar: 'iPhone 15 وصل 50% في نحو 26 دقيقة ضمن سقف آبل ~20 واط — سلوك سقف هاتف أمين، وليس سحر الشاحن' },
            { en: '46g exact + 34.2×33.1×30.0 mm folded — pocket GaN with foldable prongs and tight QC match to Anker spec', ar: '46 جرامًا تطابق تام + 34.2×33.1×30.0 ملم مطوي — GaN جيبي بسنون قابلة للطي ومطابقة جودة لمواصفة انكر' },
            { en: 'Anker sub-brand backing (Zolo = Anker value line, not a knock-off) + MultiProtect / ActiveShield marketing + CairoVolt warranty path', ar: 'دعم علامة انكر الفرعية (Zolo = خط انكر الاقتصادي، ليس تقليدًا) + MultiProtect / ActiveShield + مسار ضمان كايرو فولت' },
            { en: '~200 EGP cheaper than typical A2147 street (~599 vs ~790) for essentially the same phone-class PPS job — and NOT recalled as of 2026-07-24', ar: 'أرخص بنحو 200 جنيه من سعر A2147 المعتاد (~599 مقابل ~790) لنفس وظيفة PPS لفئة الهواتف تقريبًا — وغير مستدعى حتى 2026-07-24' },
        ],
        limits: [
            { en: 'NO 20V PDO — highest fixed rail is 15V/2A; A2147 has 20V/1.5A. Occasional MacBook Air trickle → choose A2147 (or A2664 for more headroom)', ar: 'بلا PDO 20V — أعلى ثابت 15V/2A؛ A2147 يملك 20V/1.5A. شحن MacBook Air بطيء أحيانًا → اختر A2147 (أو A2664 لفارق أكبر)' },
            { en: 'Shell reached 56.3°C after 15 min at ~29W (28.4°C ambient) — keep ventilated; do not pillow-cover or stack against a hot router in Cairo heat', ar: 'السطح بلغ 56.3°م بعد 15 دقيقة عند ~29 واط (محيط 28.4°م) — اترك تهوية؛ لا تغطه بوسادة ولا تكدسه بجانب راوتر ساخن في حر القاهرة' },
            { en: 'Do not invent a same-hour thermal win/loss vs A2147 — that SKU\'s independent load/thermal pass is not yet published on its page', ar: 'لا تخترع انتصار/خسارة حراري في نفس الساعة مقابل A2147 — مرحلة التحميل/الحرارة المستقلة لذلك الموديل غير منشورة بعد' },
            { en: 'NO independent silicon teardown — inventing A2147\'s ChargerLAB chip list onto Zolo is a §11 red-flag', ar: 'بلا تفكيك سيليكون مستقل — اختراع قائمة رقائق ChargerLAB لـ A2147 على Zolo علم أحمر §11' },
            { en: 'ActiveShield generation not enumerated for Zolo (unlike A2147 ActiveShield 2.0 / A2692 3.0 / A121D 5.0)', ar: 'جيل ActiveShield غير معدود لـ Zolo (بخلاف A2147 ActiveShield 2.0 / A2692 3.0 / A121D 5.0)' },
            { en: 'Single USB-C only + no cable in box — cannot charge two devices; budget a 3A C-to-C', ar: 'منفذ USB-C واحد فقط + بلا كابل في العلبة — لا يشحن جهازين؛ احسب كابل 3A من C إلى C' },
            { en: 'Wall efficiency and no-load draw NOT measured (no PZEM) — we do not invent % figures', ar: 'كفاءة الحائط والاستهلاك بلا حمل غير مقيسين (بلا PZEM) — لا نخترع نسبًا مئوية' },
            { en: 'Samsung 45W Super Fast Charging 2.0 (Ultra class) is NOT in range — PPS tops at 11V/3A phone window, not a 20V PPS envelope', ar: 'Samsung 45W Super Fast Charging 2.0 (فئة Ultra) خارج النطاق — سقف PPS نافذة هاتف 11V/3A وليس ظرف PPS 20 فولت' },
            { en: 'Plug variant may be UK BS 1363 or EU2 by shipment — verify before assuming Egyptian-socket fit', ar: 'نوع القابس قد يكون BS 1363 أو EU2 حسب الشحنة — تحقق قبل افتراض ملاءمة الفيشة المصرية' },
            { en: 'Single unit tested (CV-CH-A2698-001) — production batches may vary', ar: 'وحدة واحدة مُختبرة (CV-CH-A2698-001) — قد تختلف دفعات الإنتاج' },
        ],
    },
};
