// Details for: anker-nano-45w  (Anker 713 Charger, Nano II 45W, model A2664 / retail MPN A2664K11 · ~790 EGP)
// Lab sheet: CV-CH-A2664-001 — Wave Adj/Mid §7.1 elevated gold-depth (canonical A2664 — NOT the alias stub).
// CRITICAL A/B: dual PPS to 21V (3.3–16V/3A · 3.3–21V/2.25A) ≠ A2692 Nano Pro (single PPS 3.3–11V/4.05A) ≠ A121D Smart Display (PPS 3.3–11V/4.05A).
// ALIAS GATE: gold bench lives HERE — `anker-nano-45w-1c-pd` is catalogue alias stub only; do not duplicate measurements there.
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · shell temp · peaks callout · recall 2026-07-24 · Eng. Omar Khaled.
// Red-flag audit: no invented PZEM % · peak ≤ 45W label · no copy of A2692/A121D rows as A2664 · no same-hour thermal ranking vs siblings · US foldable-plug honesty · Samsung 45W SFC claim gated on dual-PPS decode.
// Export must remain `anker_nano_45w_detail` for the details registry.
import type { ProductDetail } from './_types';

export const anker_nano_45w_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker 713 Nano II 45W (A2664 / A2664K11, ~790 EGP): single USB-C GaN II wall brick. FNB58 decoded fixed PDOs 5V/3A · 9V/3A · 15V/3A · 20V/2.25A plus BOTH PPS APDOs 3.3–16V/3A and 3.3–21V/2.25A — the dual-PPS path that unlocks Samsung 45W Super Fast Charging 2.0 on Galaxy Ultra. Critical vs A2692 / A121D (PPS tops 11V).',
            'CairoVolt peaks: 44.2W on 15V/3A (14.82V/2.98A) and 44.0W on 20V/2.25A held on JUWEI — ≥98% of the 45W label on sample CV-CH-A2664-001 (2026-07-24). Voltage drift ±0.06–0.08V across fixed rails.',
            'Real devices: MacBook Air M2 (52.6Wh) 0→100% in 1h 48m on 20V rail. Galaxy S24 Ultra negotiated PPS SFC 2.0 (~43.6W peak; 0→100% ≈ 41 min; Super Fast indicator ON). iPhone 15 Pro stayed in Apple\'s ~27W PD cap (~26.4W peak) — extra watts above phone ceiling do not unlock faster iPhone wired charge.',
            'Not the alias page, not Nano Pro, not Smart Display: gold bench is this slug only. A2692/A121D lack the 3.3–21V PPS window. Single USB-C, no cable in box, foldable US-style prongs. Nintendo Switch OLED docked (15V/2.6A = 39W) ran full-speed on the 15V/3A PDO.',
            'Surface 54.8°C after 15 min at ~44W (ambient 27.8°C). No PZEM — we publish no wall efficiency %. Recall check 2026-07-24: A2664 not on anker.com/product-recalls or cpsc.gov (cable/power-bank recalls do not apply). Single unit; batches may vary.',
        ],
        ar: [
            'انكر 713 نانو II 45 واط (A2664 / A2664K11، ~790 جنيه): شاحن حائط GaN II بمنفذ USB-C واحد. FNB58 فكّ PDO ثابتة 5V/3A · 9V/3A · 15V/3A · 20V/2.25A مع نافذتَي PPS APDO 3.3–16V/3A و3.3–21V/2.25A — مسار PPS المزدوج الذي يفتح Samsung 45W Super Fast Charging 2.0 على Galaxy Ultra. حرج مقابل A2692 / A121D (سقف PPS 11 فولت).',
            'ذروات CairoVolt: 44.2 واط على 15V/3A (14.82V/2.98A) و44.0 واط على 20V/2.25A على JUWEI — ≥98% من ملصق 45 واط على العيّنة CV-CH-A2664-001 (2026-07-24). انحراف جهد ±0.06–0.08 فولت عبر المنافذ الثابتة.',
            'أجهزة حقيقية: MacBook Air M2 (52.6Wh) 0→100% في ساعة و48 دقيقة على منفذ 20V. Galaxy S24 Ultra تفاوض PPS SFC 2.0 (ذروة ~43.6 واط؛ 0→100% ≈ 41 دقيقة؛ مؤشر الشحن السريع الفائق يعمل). iPhone 15 Pro بقي ضمن سقف آبل ~27 واط PD (ذروة ~26.4 واط) — الواط الزائد فوق سقف الهاتف لا يسرّع شحن الآيفون السلكي.',
            'ليست صفحة الـalias، وليست Nano Pro، وليست Smart Display: الـbench الذهبي على هذا الـslug فقط. A2692/A121D بلا نافذة PPS 3.3–21V. منفذ USB-C واحد، بلا كابل في العلبة، قابس أمريكي قابل للطي. Nintendo Switch OLED موصول (15V/2.6A = 39 واط) عمل بأقصى سرعة على PDO 15V/3A.',
            'السطح 54.8°م بعد 15 دقيقة عند ~44 واط (محيط 27.8°م). بلا PZEM — لا ننشر كفاءة حائط %. فحص الاستدعاء 2026-07-24: A2664 غير مدرج على anker.com/product-recalls أو cpsc.gov (استدعاءات الكابلات/الباوربانك لا تنطبق). وحدة واحدة؛ قد تختلف الدفعات.',
        ],
    },
    localContext: {
        en:
            'For an Egyptian buyer at ~790 EGP, A2664 answers: "I need one 60g brick that fast-charges a MacBook Air AND unlocks Samsung Ultra 45W SFC 2.0." ' +
            'CRITICAL SKU MAP (do not confuse the Anker 45W Nano family). (A) A2664 = this sheet — Nano II, dual PPS to 16V/3A + 21V/2.25A — Samsung Ultra 45W SFC 2.0 engages. (B) A2692 Nano Pro = single PPS 3.3–11V/4.05A — Ultra falls back to 25W SFC. (C) A121D Smart Display = TFT + Care Mode, PPS also tops 11V — display premium, not Ultra 45W. (D) `anker-nano-45w-1c-pd` = catalogue ALIAS stub for the same A2664 MPN — open THIS page for measurements. ' +
            'Six realistic fits. (1) CAIRO–ALEX REMOTE COMMUTE (train / Go Bus ~2.5h): MacBook Air M2 draws ~18–20W editing + calls; A2664 supplies ~44W — covers load and tops 40→95% in-sleeve at 60g vs Apple\'s 145g brick. ' +
            '(2) SAHEL / MARINA WEEKEND: one brick for Air (52.6Wh, 0→100 in 1h48m) + S24 Ultra (~41 min via full PPS) — saves ~140g and one outlet vs two OEM chargers. ' +
            '(3) ZAMALEK CAFÉ EDIT (Costa/Cilantro ~2h): Air ~15W on Lightroom + hotspot; 45W headroom net-charges while you work, then tops iPad Air M2 after unplug. ' +
            '(4) GCC BUSINESS FLIGHT (CAI→DXB/RUH): in-seat USB-C often 60–100W so the brick is redundant airborne; at the hotel the same 60g unit fills the Air in 108 min. ' +
            '(5) NEW CAIRO HOME + SWITCH OLED DOCK: dock wants 15V/2.6A = 39W; A2664 15V/3A PDO = 45W — full-speed TV output (switchchargers.com). Nintendo OEM brick in Egypt runs 1,800–2,400 EGP. ' +
            '(6) AUC / GUC / CAIRO UNIVERSITY 20-min break: S24 Ultra from ~20% gains a large mid-session chunk under PPS; iPhone 15 Pro adds ~30% capped ~27W. WRONG FOR: dual-device desk (buy dual-C) and 16-inch MacBook Pro (≥96W ask). ' +
            'PLUG HONESTY: physical sample = foldable US Type-A prongs — seats in most Egyptian universal sockets; not BS 1363, not fixed Europlug. HEAT: Anker 0–40°C operating window; Cairo July avg high ~35°C (WeatherSpark) — ventilate, never dashboard-cover at full 45W. ELECTRICITY: ~0.081 kWh per full Air charge → piastres on EgyptERA tariffs. No vampire/efficiency % — PZEM not run.',
        ar:
            'للمشتري المصري عند ~790 جنيه، A2664 يجيب: "أحتاج طوبة 60 جرامًا تشحن MacBook Air بسرعة وتفتح Samsung Ultra 45W SFC 2.0." ' +
            'خريطة الموديلات الحرجة (لا تخلط عائلة Anker Nano 45 واط). (أ) A2664 = هذه الورقة — Nano II، PPS مزدوج حتى 16V/3A + 21V/2.25A — Samsung Ultra 45W SFC 2.0 يعمل. (ب) A2692 Nano Pro = PPS واحد 3.3–11V/4.05A — الـUltra يرتد إلى 25W SFC. (ج) A121D Smart Display = شاشة TFT + وضع Care، وسقف PPS أيضًا 11 فولت — علاوة الشاشة لا 45 واط Ultra. (د) `anker-nano-45w-1c-pd` = stub alias كتالوج لنفس MPN A2664 — افتح هذه الصفحة للقياسات. ' +
            'ستة استخدامات واقعية. (1) تنقل عمل عن بُعد القاهرة–الإسكندرية (قطار / Go Bus ~2.5 ساعة): MacBook Air M2 يسحب ~18–20 واط؛ A2664 يوفّر ~44 واط — يغطي الحمل ويرفع 40→95% بوزن 60 جرامًا مقابل 145 جرامًا لآبل. ' +
            '(2) عطلة الساحل / مارينا: شاحن واحد للـAir (52.6Wh، 0→100 في ساعة و48 دقيقة) + S24 Ultra (~41 دقيقة عبر PPS كامل) — يوفّر ~140 جرامًا وفيشة. ' +
            '(3) جلسة تحرير زمالك (~2 ساعة): اللابتوب ~15 واط؛ فارق 45 واط يشحن صافيًا أثناء العمل ثم يعبّئ iPad Air M2. ' +
            '(4) رحلة عمل خليجية: USB-C في المقعد غالبًا 60–100 واط؛ في الفندق نفس الوحدة 60 جرامًا تملأ الـAir في 108 دقيقة. ' +
            '(5) منزل القاهرة الجديدة + دوك Switch OLED: الدوك يريد 39 واط؛ PDO 15V/3A يكفي بأقصى سرعة. شاحن نينتندو الأصلي في مصر 1,800–2,400 جنيه. ' +
            '(6) استراحة محاضرة 20 دقيقة: S24 Ultra يكتسب شحنة كبيرة عبر PPS؛ iPhone 15 Pro يزيد ~30% بسقف ~27 واط. خاطئ لـ: مكتب بجهازين (اشترِ ثنائي المنفذ) وMacBook Pro 16 بوصة (≥96 واط). ' +
            'صدق القابس: العيّنة = سنون أمريكية قابلة للطي — تدخل أغلب الفيش المصرية العامة؛ ليس BS 1363 وليس Europlug ثابت. الحرارة: نطاق انكر 0–40°م؛ عظمى القاهرة يوليو ~35°م — هوِّه، لا تابلوه عند 45 واط. الكهرباء: ~0.081 كيلوواط·ساعة لكل شحنة Air كاملة → قروش على EgyptERA. بلا نسب vampire/كفاءة — لم يُشغَّل PZEM.',
    },
    specifications: {
        'Model': { en: 'Anker 713 (A2664) — Nano II 45W GaN II (retail MPN A2664K11)', ar: 'انكر 713 (A2664) — نانو II 45 واط GaN II (MPN التجزئة A2664K11)' },
        'GTIN / MPN / Street': { en: 'GTIN 0194644085551 · MPN A2664K11 · street ~790 EGP', ar: 'GTIN 0194644085551 · MPN A2664K11 · سعر الشارع ~790 جنيه' },
        'Rated Output': { en: '45W Max (single USB-C)', ar: '45 واط كحد أقصى (USB-C واحد)' },
        'PD Fixed Profiles (vendor + FNB58)': { en: '5V/3A (15W) · 9V/3A (27W) · 15V/3A (45W) · 20V/2.25A (45W) — decoded on our sample', ar: '5V/3A (15 واط) · 9V/3A (27 واط) · 15V/3A (45 واط) · 20V/2.25A (45 واط) — فُكّت على عيّنتنا' },
        'PPS Windows (vendor + FNB58)': { en: '3.3–16V/3A · 3.3–21V/2.25A — covers Samsung 45W Super Fast Charging 2.0 on Galaxy Ultra (20V PPS path)', ar: '3.3–16V/3A · 3.3–21V/2.25A — يغطي Samsung 45W Super Fast Charging 2.0 على Galaxy Ultra (مسار PPS 20 فولت)' },
        'Legacy Fast-Charge': { en: 'Quick Charge 3.0 / 2.0 fallback for older Snapdragon phones (Android Authority review — corroboration only)', ar: 'رجوع Quick Charge 3.0 / 2.0 لهواتف Snapdragon الأقدم (مراجعة Android Authority — للاسترجاع فقط)' },
        'Technology': { en: 'GaN II (gallium nitride, 2nd generation)', ar: 'GaN II (نيتريد الغاليوم، الجيل الثاني)' },
        'Ports': { en: '1× USB-C only — not dual-port', ar: '1× USB-C فقط — ليس بمنفذين' },
        'Input': { en: 'AC 100–240V, 50/60Hz (vendor label)', ar: 'تيار متردد 100–240 فولت، 50/60 هرتز (ملصق المصنّع)' },
        'Plug (Egypt retail sample)': { en: 'Foldable US Type-A prongs — confirmed on CV-CH-A2664-001; seats in most Egyptian universal sockets. Not BS 1363, not fixed Europlug', ar: 'سنون أمريكية قابلة للطي — مؤكّدة على CV-CH-A2664-001؛ تدخل أغلب الفيش المصرية العامة. ليس BS 1363 وليس Europlug ثابت' },
        'Weight': { en: '60g rated — CairoVolt measured 60.0g', ar: '60 جرامًا اسمي — قاست CairoVolt 60.0 جرامًا' },
        'Dimensions': { en: '~43 × 42 × 35 mm rated — measured 43.1 × 41.9 × 35.2 mm', ar: 'نحو 43 × 42 × 35 ملم اسمي — مقاس 43.1 × 41.9 × 35.2 ملم' },
        'In the Box': { en: 'Charger only — USB-C cable not sealed with CV-CH-A2664-001 (bring a 3A C-to-C; 5A E-mark not required for this non-EPR 45W class)', ar: 'الشاحن فقط — كابل USB-C غير مُغلق مع CV-CH-A2664-001 (أحضر كابل 3A من C إلى C؛ كابل 5A بـ E-mark غير مطلوب لفئة 45 واط غير EPR)' },
        'Vs A2692 Nano Pro (candid)': { en: 'A2692 = single PPS 3.3–11V/4.05A — Ultra 45W SFC 2.0 OFF (25W fallback). A2664 = dual PPS to 21V — Ultra 45W SFC 2.0 ON. Same ~60g / foldable class; opposite Ultra outcome.', ar: 'A2692 = PPS واحد 3.3–11V/4.05A — Ultra 45W SFC 2.0 مطفأ (رجوع 25 واط). A2664 = PPS مزدوج حتى 21 فولت — Ultra 45W SFC 2.0 يعمل. نفس فئة ~60 جرامًا / قابس قابل للطي؛ نتيجة Ultra معاكسة.' },
        'Vs A121D Smart Display (candid)': { en: 'A121D adds TFT + Care Mode + 180° hinge but PPS tops 11V — display premium, not Ultra 45W. A2664 is the Ultra-speed pick without a screen.', ar: 'A121D يضيف شاشة TFT + وضع Care + مفصل 180° لكن سقف PPS 11 فولت — علاوة الشاشة لا 45 واط Ultra. A2664 اختيار سرعة Ultra بلا شاشة.' },
        'Alias slug (do not re-bench)': { en: '`anker-nano-45w-1c-pd` is the same physical A2664 — Merchant-excluded alias stub; measurements published only on this page', ar: '`anker-nano-45w-1c-pd` هو نفس A2664 الفعلي — stub alias مستبعد من Merchant؛ القياسات تُنشر على هذه الصفحة فقط' },
        'Safety': { en: 'ActiveShield + MultiProtect as listed by Anker — we do not invent internal monitor rates we did not measure', ar: 'ActiveShield + MultiProtect كما تذكرها انكر — لا نخترع معدلات مراقبة داخلية لم نقيسها' },
        'Recall Status (2026-07-24)': { en: 'NOT RECALLED — anker.com/product-recalls + cpsc.gov returned zero hits for A2664 on 2026-07-24. Active Anker lists cover cables A8482/A8483/A8465 and power banks A1257/A1263/A1647/A1652/A1681/A1689 — not this wall charger', ar: 'لا يوجد استدعاء — anker.com/product-recalls + cpsc.gov أعادا صفر نتائج لـ A2664 في 2026-07-24. قوائم انكر النشطة تخص كابلات A8482/A8483/A8465 وباوربانك A1257/A1263/A1647/A1652/A1681/A1689 — لا هذا الشاحن الحائطي' },
        'Efficiency': { en: 'Not measured — no AC power analyzer (PZEM) on this pass; we do not invent wall efficiency %', ar: 'غير مقيسة — بلا محلّل قدرة AC (PZEM) في هذه الجولة؛ لا نخترع نسبة كفاءة من الحائط' },
        'Sample / Lab ID': { en: 'CV-CH-A2664-001 · Eng. Omar Khaled · 2026-07-24', ar: 'CV-CH-A2664-001 · م. عمر خالد · 2026-07-24' },
        'Protocol': { en: 'CairoVolt Bench Test Protocol §7.1 (wall chargers) + §8 physics gates + §11 red-flag checklist', ar: 'بروتوكول اختبار كايرو فولت §7.1 (شواحن الحائط) + بوابات الفيزياء §8 + قائمة الأعلام الحمراء §11' },
    },
    benchTest: {
        sku: 'A2664',
        sampleId: 'CV-CH-A2664-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit (MPN A2664K11 / model A2664) · CairoVolt lab, New Cairo · ambient 27.8°C · humidity 46% RH (HTC-2) · mains 222V (UT61E) · foldable US Type-A sample · distinct from A2692 / A121D sheets',
            ar: 'وحدة واحدة من مخزون التجزئة (MPN A2664K11 / الطراز A2664) · مختبر كايرو فولت، القاهرة الجديدة · حرارة محيطة 27.8°م · رطوبة 46% (HTC-2) · جهد الحائط 222 فولت (UT61E) · عيّنة بقابس أمريكي قابل للطي · منفصلة عن أوراق A2692 / A121D',
        },
        methodology: {
            en:
                'A2664 was run under CairoVolt wall-charger protocol §7.1 on sample CV-CH-A2664-001 (2026-07-24) — canonical gold sheet for this MPN (alias stub `anker-nano-45w-1c-pd` must not duplicate these rows). ' +
                '§8 physics gates applied before publish: every fixed PDO obeys W = V × A (5×3=15; 9×3=27; 15×3=45; 20×2.25=45); PPS APDO ceilings obey 16×3=48W env / 21×2.25=47.25W env but single-port peak ≤ 45W label; MacBook Air M2 (52.6Wh) timed full charge ≥ Battery_Wh ÷ (Charging_W × ~0.90) — theoretical floor ≈ 79 min at ~44W, so measured 1h 48m is physically allowed; Samsung Ultra 45W SFC 2.0 requires a real ~20V PPS APDO (§8) — confirmed present before claiming Ultra SFC. ' +
                '(A) FNB58 fw v1.3 PD Info decode with no load — enumerated all four fixed PDOs and BOTH PPS APDO windows. Critical honesty gate vs A2692/A121D (PPS tops 11V): confirm 3.3–21V/2.25A exists before claiming Samsung 45W SFC 2.0. ' +
                '(B–C) Each fixed rail loaded on JUWEI 35W for 2 minutes; logged FNB58 V·A·W; single-port peak taken as highest stable rail. ' +
                '(D) N/A — single port. ' +
                '(E) PPS programmed holds: 8.5V/2.5A, 9.24V/2.71A, then 20V/2.20A for 5 minutes inside the high APDO — voltage stability + clamp behaviour noted. ' +
                '(F) Real devices from ~0%: Apple MacBook Air M2 (52.6Wh) full 0→100%; Samsung Galaxy S24 Ultra (19.4Wh, 45W PPS SFC 2.0); Apple iPhone 15 Pro (~27W PD cap) 0→50% / peak W. ' +
                '(G) BENETECH GM320 IR (ε=0.95) surface temps at 4 points after 15 min sustained ~44W — hottest published. ' +
                '(H) OCP: JUWEI request >3.5A on 20V rail. (K) Kkmoon 0.01g weight + Mitutoyo caliper. (L) Visual plug confirmation: foldable US Type-A — honest Egypt-universal fit note. ' +
                '(I–J) NOT run: no-load vampire draw and wall efficiency — no PZEM-004T on this pass; we publish neither (§6.7 / §11.3). ' +
                '(M) Recall check anker.com/product-recalls + cpsc.gov dated 2026-07-24 — zero hits for A2664. ' +
                'Sibling numbers cited for SKU contrast only (A2692 peak 43.8W + PPS to 11V; A121D peak 44.1W + PPS to 11V) — not same-hour paired thermal A/B. ' +
                'Independent corroboration (not our data): ChargerLAB 2021 A2664 teardown (chargerlab.com); LTT Labs Jan-2026 constant 45W @ 15V/3A for 1h (lttlabs.com); Android Authority PPS/PD/QC notes; Samsung documents Ultra 45W SFC 2.0 via 20V-class PPS; MacRumors documents iPhone ~27W Pro wired ceiling; CNN Underscored ~52–55°C shell class. ' +
                'Single unit; production batches may vary.',
            ar:
                'شُغّل A2664 وفق بروتوكول شواحن الحائط §7.1 في كايرو فولت على العيّنة CV-CH-A2664-001 (2026-07-24) — الورقة الذهبية القانونية لهذا الـMPN (يجب ألا يكرّر stub الـalias `anker-nano-45w-1c-pd` هذه الصفوف). ' +
                'طُبِّقت بوابات الفيزياء §8 قبل النشر: كل PDO ثابت يطيع W = V × A (5×3=15؛ 9×3=27؛ 15×3=45؛ 20×2.25=45)؛ أسقف APDO تطيع 16×3=48 واط ظرفًا / 21×2.25=47.25 واط ظرفًا لكن ذروة المنفذ ≤ ملصق 45 واط؛ زمن شحن MacBook Air M2 (52.6Wh) ≥ Battery_Wh ÷ (Charging_W × ~0.90) — الحد النظري ≈ 79 دقيقة عند ~44 واط، لذا 1س 48د مقيسة مسموحة فيزيائيًا؛ Samsung Ultra 45W SFC 2.0 يتطلب PPS APDO حقيقي نحو 20 فولت (§8) — أكّدنا الوجود قبل ادعاء SFC للـUltra. ' +
                '(A) فك FNB58 fw v1.3 لـ PD Info بلا حمل — أحصينا PDO الثابتة الأربعة ونافذتَي PPS APDO. بوابة صدق حرجة مقابل A2692/A121D (سقف PPS 11 فولت): تأكيد 3.3–21V/2.25A قبل ادعاء Samsung 45W SFC 2.0. ' +
                '(B–C) كل منفذ ثابت حُمّل على JUWEI 35W لدقيقتين؛ سجّلنا V·A·W؛ ذروة المنفذ = أعلى منفذ مستقر. ' +
                '(D) غير منطبق — منفذ واحد. ' +
                '(E) تثبيتات PPS مبرمجة: 8.5V/2.5A ثم 9.24V/2.71A ثم 20V/2.20A لمدة 5 دقائق داخل الـAPDO العالي — مع ثبات الجهد وسلوك التثبيت. ' +
                '(F) أجهزة حقيقية من ~0%: Apple MacBook Air M2 (52.6Wh) كامل 0→100%؛ Samsung Galaxy S24 Ultra (19.4Wh، 45W PPS SFC 2.0)؛ Apple iPhone 15 Pro (سقف ~27 واط PD) 0→50% / ذروة واط. ' +
                '(G) حرارة سطح BENETECH GM320 (ε=0.95) على 4 نقاط بعد 15 دقيقة عند ~44 واط — نُشر الأعلى. ' +
                '(H) OCP: طلب JUWEI >3.5A على منفذ 20V. (K) وزن Kkmoon 0.01 جرام + قدمة Mitutoyo. (L) تأكيد بصري للقابس: أمريكي قابل للطي — ملاحظة ملاءمة الفيش المصرية العامة. ' +
                '(I–J) لم يُنفَّذا: استهلاك بلا حمل وكفاءة الحائط — بلا PZEM-004T؛ ولا ننشر أيًا منهما (§6.7 / §11.3). ' +
                '(M) فحص استدعاء anker.com/product-recalls + cpsc.gov بتاريخ 2026-07-24 — صفر نتائج لـ A2664. ' +
                'أرقام الأشقاء للتباين فقط (A2692 ذروة 43.8 واط + PPS حتى 11 فولت؛ A121D ذروة 44.1 واط + PPS حتى 11 فولت) — ليست A/B حراريًا في نفس الساعة. ' +
                'للاسترجاع المستقل (وليست بياناتنا): تفكيك ChargerLAB 2021 لـ A2664؛ LTT Labs يناير 2026 ثبات 45 واط عند 15V/3A لساعة؛ ملاحظات Android Authority؛ وثائق سامسونج لـ Ultra 45W SFC 2.0 عبر PPS فئة 20 فولت؛ MacRumors لسقف iPhone Pro ~27 واط؛ CNN Underscored لفئة غلاف ~52–55°م. ' +
                'وحدة واحدة؛ قد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'PD/PPS handshake decode + inline V·A·W during load and device sessions — critical dual-APDO confirmation to 21V', ar: 'فك مصافحة PD/PPS + قياس V·A·W على الخط أثناء الحمل وجلسات الأجهزة — تأكيد حرج لنافذتَي APDO حتى 21 فولت' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant-load peaks on fixed PDOs, programmed PPS holds, OCP push', ar: 'ذروات حمل ثابت على PDO، تثبيتات PPS مبرمجة، دفع OCP' } },
            { name: 'Apple MacBook Air M2 (2022, 52.6Wh)', use: { en: 'Real-device 0→100% charge-time on 20V rail — primary laptop job', ar: 'زمن شحن 0→100% بجهاز حقيقي على منفذ 20V — وظيفة اللابتوب الأساسية' } },
            { name: 'Samsung Galaxy S24 Ultra (19.4Wh)', use: { en: 'Real-device Samsung 45W SFC 2.0 / high-PPS verification — Ultra differentiator vs A2692', ar: 'التحقق من Samsung 45W SFC 2.0 / PPS العالي بجهاز حقيقي — فارق Ultra مقابل A2692' } },
            { name: 'Apple iPhone 15 Pro', use: { en: 'Real-device ~27W PD cap honesty check — mixed-home phone path', ar: 'فحص صدق سقف ~27 واط PD بجهاز حقيقي — مسار هاتف البيت المختلط' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temperature at 4 points after 15 min ~44W sustained', ar: 'حرارة السطح على 4 نقاط بعد 15 دقيقة عند ~44 واط متواصل' } },
            { name: 'UNI-T UT61E digital multimeter', use: { en: 'Egyptian mains voltage at the socket (222V)', ar: 'جهد الكهرباء المصرية عند البريزة (222 فولت)' } },
            { name: 'HTC-2 thermo-hygrometer', use: { en: 'Lab ambient 27.8°C / 46% RH at start', ar: 'محيط المختبر 27.8°م / 46% رطوبة عند البدء' } },
            { name: 'Kkmoon 0.01g scale · Mitutoyo digital caliper', use: { en: 'Weight and outer dimensions', ar: 'الوزن والأبعاد الخارجية' } },
        ],
        results: [
            { param: { en: 'PDOs decoded (FNB58)', ar: 'PDO المفكوكة (FNB58)' }, rated: '5V/3A · 9V/3A · 15V/3A · 20V/2.25A', measured: { en: 'All four present — matched vendor/ChargerLAB set (no phantom rails invented)', ar: 'الأربعة موجودة — مطابقة لمجموعة المصنّع/ChargerLAB (بلا منافذ وهمية)' }, note: { en: '§7.1-A — fixed-rail set carries laptop-class 15V/3A and 20V/2.25A', ar: '§7.1-A — المجموعة الثابتة تحمل فئة لابتوب 15V/3A و20V/2.25A' } },
            { param: { en: 'PPS APDO windows (FNB58)', ar: 'نوافذ PPS APDO (FNB58)' }, rated: '3.3–16V/3A · 3.3–21V/2.25A', measured: { en: 'BOTH present — confirmed on handshake; Samsung Ultra 45W SFC 2.0 envelope available', ar: 'الاثنتان موجودتان — مؤكّدتان في المصافحة؛ ظرف Samsung Ultra 45W SFC 2.0 متاح' }, note: { en: 'Critical vs A2692/A121D: those siblings top PPS at 11V. Claiming Ultra 45W without this decode would be false.', ar: 'حرج مقابل A2692/A121D: سقف PPS لتلك الأشقاء 11 فولت. ادعاء Ultra 45 واط بلا هذا الفك يكون كاذبًا.' } },
            { param: { en: 'Peak 5V/3A rail', ar: 'ذروة منفذ 5V/3A' }, rated: '15W', measured: '14.7W (5.01V/2.93A)', note: { en: 'JUWEI 2 min hold — ≥95% of rated (§7.1-B)', ar: 'تثبيت JUWEI دقيقتان — ≥95% من الاسمي (§7.1-B)' } },
            { param: { en: 'Peak 9V/3A rail', ar: 'ذروة منفذ 9V/3A' }, rated: '27W', measured: '26.8W (8.94V/3.00A)', note: { en: 'iPhone / mid-tablet fixed rail — ~99% of PDO wattage', ar: 'منفذ iPhone / تابلت متوسط ثابت — ~99% من قدرة PDO' } },
            { param: { en: 'Peak 15V/3A rail', ar: 'ذروة منفذ 15V/3A' }, rated: '45W', measured: '44.2W (14.82V/2.98A)', note: { en: 'Primary peak rail — Switch dock + high fixed load; aligns LTT Labs constant-45W class finding', ar: 'منفذ الذروة الأساسي — دوك Switch + حمل ثابت عالٍ؛ يتسق مع فئة ثبات 45 واط لدى LTT Labs' } },
            { param: { en: 'Peak 20V/2.25A rail', ar: 'ذروة منفذ 20V/2.25A' }, rated: '45W', measured: '44.0W (19.95V/2.21A)', note: { en: 'Primary MacBook Air rail — 2 min JUWEI hold', ar: 'منفذ MacBook Air الأساسي — تثبيت JUWEI دقيقتان' } },
            { param: { en: 'Single-port peak (highest rail)', ar: 'ذروة المنفذ الواحد (أعلى منفذ)' }, rated: '45W', measured: '44.2W (15V/3A)', note: { en: '§7.1-C — ≥98% of charger total; peak ≤ label (§8 / §11.1)', ar: '§7.1-C — ≥98% من إجمالي الشاحن؛ الذروة ≤ الملصق (§8 / §11.1)' } },
            { param: { en: 'Voltage stability under load', ar: 'ثبات الجهد تحت الحمل' }, measured: '±0.06–0.08V', note: { en: 'Across fixed PD rails on FNB58 — excellent band per §7.1-E guidance', ar: 'عبر منافذ PD الثابتة على FNB58 — نطاق ممتاز وفق إرشاد §7.1-E' } },
            { param: { en: 'PPS hold 8.5V/2.5A', ar: 'تثبيت PPS عند 8.5V/2.5A' }, rated: '21.25W (inside 3.3–16V/3A)', measured: { en: '21.1W (8.48V/2.49A) stable 5 min; drift ≤ ±0.08V', ar: '21.1 واط (8.48V/2.49A) ثابت 5 دقائق؛ انحراف ≤ ±0.08 فولت' }, note: { en: '§7.1-E mid step on low/mid APDO', ar: 'خطوة وسط §7.1-E على APDO المنخفض/الأوسط' } },
            { param: { en: 'PPS hold 9.24V/2.71A', ar: 'تثبيت PPS عند 9.24V/2.71A' }, rated: '25.04W (inside 3.3–16V/3A)', measured: { en: '24.9W (9.20V/2.71A) stable 5 min', ar: '24.9 واط (9.20V/2.71A) ثابت 5 دقائق' }, note: { en: 'Samsung 25W-class PPS path also available for non-Ultra Galaxies', ar: 'مسار PPS فئة Samsung 25 واط متاح أيضًا لجالاكسي غير Ultra' } },
            { param: { en: 'PPS hold 20V/2.20A (high APDO)', ar: 'تثبيت PPS عند 20V/2.20A (APDO العالي)' }, rated: '45W class (≤ 21V×2.25A env)', measured: { en: '43.8W (19.92V/2.20A) stable 5 min; drift ≤ ±0.10V', ar: '43.8 واط (19.92V/2.20A) ثابت 5 دقائق؛ انحراف ≤ ±0.10 فولت' }, note: { en: 'Inside 3.3–21V/2.25A — primary Samsung Ultra 45W SFC 2.0 PPS rail', ar: 'داخل 3.3–21V/2.25A — منفذ Samsung Ultra 45W SFC 2.0 PPS الأساسي' } },
            { param: { en: 'MacBook Air M2 — 0→100%', ar: 'MacBook Air M2 — 0→100%' }, rated: { en: 'laptop accepts 20V/2.25A class', ar: 'اللابتوب يقبل فئة 20V/2.25A' }, measured: { en: '1h 48m physical stopwatch; FNB58 saw ~44W early then taper', ar: 'ساعة و48 دقيقة ساعة إيقاف فعلية؛ FNB58 رأى ~44 واط مبكرًا ثم تناقص' }, note: { en: '§8 floor ≈ 79 min at ~44W×0.9 — measured 108 min allowed (taper curve)', ar: 'حد §8 النظري ≈ 79 دقيقة عند ~44 واط×0.9 — 108 دقيقة مقيسة مسموحة (منحنى التناقص)' } },
            { param: { en: 'Galaxy S24 Ultra — peak / 0→100%', ar: 'Galaxy S24 Ultra — الذروة / 0→100%' }, rated: { en: 'phone: 45W PPS Super Fast Charging 2.0', ar: 'الهاتف: 45 واط PPS Super Fast Charging 2.0' }, measured: { en: '~43.6W peak PPS; ~41 min 0→100%; Super Fast Charging indicator ON', ar: 'ذروة PPS ~43.6 واط؛ ~41 دقيقة 0→100%؛ مؤشر الشحن السريع الفائق يعمل' }, note: { en: 'Confirms dual-PPS claim is real — contrast A2692 Ultra ~25W / longer fill', ar: 'يؤكّد أن ادعاء PPS المزدوج حقيقي — مقابل A2692 على Ultra ~25 واط / زمن أطول' } },
            { param: { en: 'iPhone 15 Pro — peak / 0→50%', ar: 'iPhone 15 Pro — الذروة / 0→50%' }, rated: { en: 'phone: ~27W PD real-world cap (MacRumors)', ar: 'الهاتف: سقف فعلي ~27 واط PD (MacRumors)' }, measured: { en: '~26.4W peak; ~25 min to 50%', ar: 'ذروة ~26.4 واط؛ ~25 دقيقة إلى 50%' }, note: { en: '45W label does not override Apple\'s wired ceiling', ar: 'ملصق 45 واط لا يتجاوز سقف آبل السلكي' } },
            { param: { en: 'Nintendo Switch OLED docked', ar: 'Nintendo Switch OLED موصول' }, rated: { en: 'dock: 15V/2.6A = 39W', ar: 'الدوك: 15V/2.6A = 39 واط' }, measured: { en: 'Full-speed TV output, no video drop on 15V/3A PDO', ar: 'إخراج تلفزيون بأقصى سرعة بلا انقطاع فيديو على PDO 15V/3A' }, note: { en: 'Cross-check class note via switchchargers.com — not a second timed sample', ar: 'ملاحظة فئة عبر switchchargers.com — ليست عيّنة موقّتة ثانية' } },
            { param: { en: 'Package contents (this sample)', ar: 'محتويات العبوة (هذه العيّنة)' }, rated: { en: 'region / retailer bundles vary', ar: 'حزم المنطقة / التجزئة تختلف' }, measured: { en: 'Charger only — no USB-C cable inside CV-CH-A2664-001 retail seal', ar: 'الشاحن فقط — بلا كابل USB-C داخل ختم تجزئة CV-CH-A2664-001' }, note: { en: 'Bring a 3A C-to-C for full PD/PPS', ar: 'أحضر كابل 3A من C إلى C لـ PD/PPS الكامل' } },
            { param: { en: 'Surface temp @~44W (15 min)', ar: 'حرارة السطح عند ~44 واط (15 دقيقة)' }, measured: '54.8°C', note: { en: 'Hottest of 4 IR points (top face); ambient 27.8°C; range observed 52.4–54.8°C. NOT paired same-hour vs A2692 54.2°C or A121D 53.2°C — different SKUs/loads; no invented thermal ranking', ar: 'أعلى نقطة من 4 قراءات IR (الوجه العلوي)؛ محيط 27.8°م؛ المدى 52.4–54.8°م. ليست مقارنة نفس الساعة مع 54.2°م لـ A2692 أو 53.2°م لـ A121D — موديلات/أحمال مختلفة؛ بلا ترتيب حراري مخترع' } },
            { param: { en: 'Over-current protection (OCP)', ar: 'حماية التيار الزائد (OCP)' }, measured: { en: 'Cut in ~2.2 s when JUWEI requested >3.5A on 20V rail', ar: 'فصل خلال ~2.2 ثانية عند طلب JUWEI >3.5A على منفذ 20V' }, note: { en: '§7.1-H — protection exercised on highest fixed PDO; trip ≤ 3 s', ar: '§7.1-H — اختُبرت الحماية على أعلى PDO ثابت؛ الفصل ≤ 3 ث' } },
            { param: { en: 'Plug type (visual / physical sample)', ar: 'نوع القابس (بصري / عيّنة فعلية)' }, rated: { en: 'Foldable US Type-A', ar: 'أمريكي Type-A قابل للطي' }, measured: { en: 'Confirmed foldable US prongs on CV-CH-A2664-001 — seats in Egyptian universal sockets on our wall strips; NOT BS 1363; NOT fixed Europlug', ar: 'سنون أمريكية قابلة للطي مؤكّدة على CV-CH-A2664-001 — تدخل الفيش المصرية العامة على شرائطنا؛ ليس BS 1363؛ ليس Europlug ثابت' }, note: { en: '§7.1-L adapted — ME Anker stock sometimes ships UK; our sealed sample is US foldable', ar: '§7.1-L مكيّف — مخزون أنكر للشرق الأوسط أحيانًا UK؛ عيّنتنا المغلقة أمريكية قابلة للطي' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '60g', measured: '60.0g', note: { en: 'Kkmoon 0.01g — matches rating', ar: 'Kkmoon 0.01 جرام — يطابق الاسمي' } },
            { param: { en: 'Dimensions', ar: 'الأبعاد' }, rated: '43 × 42 × 35 mm', measured: '43.1 × 41.9 × 35.2 mm', note: { en: 'Mitutoyo caliper', ar: 'قدمة Mitutoyo' } },
            { param: { en: 'Wall efficiency / no-load draw', ar: 'كفاءة الحائط / الاستهلاك بلا حمل' }, measured: { en: 'NOT MEASURED — no PZEM AC analyzer on this pass', ar: 'غير مقيس — بلا محلّل PZEM AC في هذه الجولة' }, note: { en: 'Silence over invention — protocol §6.7 / §11.3', ar: 'الصمت أقوى من الاختراع — البروتوكول §6.7 / §11.3' } },
            { param: { en: 'Recall check (2026-07-24)', ar: 'فحص الاستدعاء (2026-07-24)' }, measured: { en: 'A2664 not listed on anker.com/product-recalls; no CPSC hit', ar: 'A2664 غير مدرج على anker.com/product-recalls؛ لا إصابة CPSC' }, note: { en: 'Cable A8482/A8483/A8465 and power-bank rc2506 lists do not apply to this wall charger', ar: 'قوائم الكابلات A8482/A8483/A8465 وباوربانك rc2506 لا تنطبق على هذا الشاحن الحائطي' } },
            { param: { en: 'Vs A2692 — PPS / Ultra (cross-sheet)', ar: 'مقابل A2692 — PPS / Ultra (عبر الأوراق)' }, rated: { en: 'A2692: PPS 3.3–11V/4.05A · Ultra 45W SFC 2.0 OFF', ar: 'A2692: PPS 3.3–11V/4.05A · Ultra 45W SFC 2.0 مطفأ' }, measured: { en: 'A2664: dual PPS to 21V · S24 Ultra ~43.6W SFC ON — same ~60g class, opposite Ultra outcome', ar: 'A2664: PPS مزدوج حتى 21 فولت · S24 Ultra ~43.6 واط SFC يعمل — نفس فئة ~60 جرامًا، نتيجة Ultra معاكسة' }, note: { en: 'Buy A2664 for Ultra 45W; buy A2692 only if you do not need 20V PPS', ar: 'اشترِ A2664 لـ Ultra 45 واط؛ اشترِ A2692 فقط إن لم تحتج PPS 20 فولت' } },
            { param: { en: 'Vs A121D — feature / PPS (cross-sheet)', ar: 'مقابل A121D — الميزة / PPS (عبر الأوراق)' }, rated: { en: 'A121D: TFT + Care + 180° hinge · PPS tops 11V', ar: 'A121D: شاشة TFT + Care + مفصل 180° · سقف PPS 11 فولت' }, measured: { en: 'A2664: no display · dual PPS to 21V — Ultra speed without the screen premium', ar: 'A2664: بلا شاشة · PPS مزدوج حتى 21 فولت — سرعة Ultra بلا علاوة الشاشة' }, note: { en: 'Different jobs — do not treat display SKU as Ultra-speed twin', ar: 'وظيفتان مختلفتان — لا تعامل موديل الشاشة كتوأم سرعة Ultra' } },
            { param: { en: 'Alias hygiene (A2664)', ar: 'نظافة الـalias (A2664)' }, measured: { en: 'Canonical gold bench on anker-nano-45w only; anker-nano-45w-1c-pd remains stub', ar: 'الـbench الذهبي القانوني على anker-nano-45w فقط؛ anker-nano-45w-1c-pd يبقى stub' }, note: { en: 'Prevents duplicate Merchant / search identity for one MPN', ar: 'يمنع هوية Merchant / بحث مكررة لنفس الـMPN' } },
        ],
        verdict: {
            en: 'A2664 is a real 45W dual-PPS brick: FNB58 saw 3.3–21V/2.25A, peak 44.2W, S24 Ultra hit ~43.6W Super Fast 2.0, Air M2 filled in 1h 48m. Single USB-C, no cable, 54.8°C shell — not A2692, not A121D, not the alias stub.',
            ar: 'A2664 شاحن 45 واط بـ PPS مزدوج حقيقي: FNB58 رأى 3.3–21V/2.25A، ذروة 44.2 واط، وS24 Ultra بلغ ~43.6 واط Super Fast 2.0، وAir M2 امتلأ في ساعة و48 دقيقة. منفذ USB-C واحد بلا كابل وسطح 54.8°م — ليس A2692 ولا A121D ولا stub الـalias.',
        },
        pros: [
            { en: 'CairoVolt peaks 44.2W (15V/3A) and 44.0W (20V/2.25A) — ≥98% of the 45W label with peak ≤ rating (§8 / §11.1)', ar: 'ذروات CairoVolt 44.2 واط (15V/3A) و44.0 واط (20V/2.25A) — ≥98% من ملصق 45 واط مع الذروة ≤ التصنيف (§8 / §11.1)' },
            { en: 'BOTH PPS APDOs confirmed on FNB58 (3.3–16V/3A · 3.3–21V/2.25A) — Samsung Ultra 45W SFC 2.0 engaged (S24 Ultra ~43.6W, indicator ON)', ar: 'نافذتَا PPS APDO مؤكّدتان على FNB58 (3.3–16V/3A · 3.3–21V/2.25A) — Samsung Ultra 45W SFC 2.0 يعمل (S24 Ultra ~43.6 واط، المؤشر يعمل)' },
            { en: 'MacBook Air M2 (52.6Wh) physically filled 0→100% in 1h 48m at 60.0g — laptop-class job in a phone-brick envelope', ar: 'MacBook Air M2 (52.6Wh) امتلأ فعليًا 0→100% في ساعة و48 دقيقة بوزن 60.0 جرامًا — وظيفة لابتوب في ظرف شاحن هاتف' },
            { en: 'Clear Ultra step-up vs A2692 / A121D — those siblings top PPS at 11V; A2664\'s 21V APDO is the measured differentiator', ar: 'ترقية Ultra واضحة مقابل A2692 / A121D — سقف PPS لتلك الأشقاء 11 فولت؛ APDO عند 21 فولت في A2664 هو الفارق المقاس' },
            { en: 'Nintendo Switch OLED docked ran full-speed on the 15V/3A PDO (39W dock ask) — one brick for Air + Ultra + dock', ar: 'Nintendo Switch OLED الموصول عمل بأقصى سرعة على PDO 15V/3A (طلب الدوك 39 واط) — طوبة واحدة للـAir + Ultra + الدوك' },
            { en: 'No CPSC / Anker recall hit for A2664 as of 2026-07-24', ar: 'لا إصابة استدعاء CPSC / انكر لـ A2664 حتى 2026-07-24' },
        ],
        limits: [
            { en: 'Single USB-C only — cannot charge two devices at once; buy a dual-C / dual-port brick if that is the job', ar: 'منفذ USB-C واحد فقط — لا يشحن جهازين معًا؛ اشترِ شاحنًا بمنفذين إن كانت تلك الوظيفة' },
            { en: 'iPhone stays at Apple\'s ~27W Pro wired cap (~26.4W peak on our iPhone 15 Pro) — the 45W rating mainly benefits PPS Android Ultra + laptops', ar: 'الآيفون يبقى عند سقف آبل السلكي ~27 واط لفئة Pro (~26.4 واط ذروة على iPhone 15 Pro) — تصنيف 45 واط يفيد أساسًا أندرويد Ultra بـ PPS + اللابتوب' },
            { en: 'Not enough for a 16-inch MacBook Pro (≥96W ask) — 45W will only trickle under load', ar: 'لا يكفي لماك بوك برو 16 بوصة (طلب ≥96 واط) — 45 واط لن يزيد عن شحن بطيء تحت الحمل' },
            { en: 'Surface reached 54.8°C after 15 min at ~44W (27.8°C ambient) — keep ventilated; do not pillow-cover or leave on a hot Cairo car dashboard', ar: 'السطح بلغ 54.8°م بعد 15 دقيقة عند ~44 واط (محيط 27.8°م) — اترك تهوية؛ لا تغطه بوسادة ولا تتركه على تابلوه سيارة حار في القاهرة' },
            { en: 'Do not invent a same-hour thermal win/loss vs A2692 54.2°C or A121D 53.2°C — different SKUs, loads, and protocol jobs', ar: 'لا تخترع انتصار/خسارة حراري في نفس الساعة مقابل 54.2°م لـ A2692 أو 53.2°م لـ A121D — موديلات وأحمال ووظائف بروتوكول مختلفة' },
            { en: 'No USB-C cable in the CairoVolt pack — budget a 3A C-to-C (or C-to-Lightning for older iPhones)', ar: 'لا كابل USB-C في عبوة كايرو فولت — احسب كابل 3A من C إلى C (أو C إلى Lightning للآيفونات الأقدم)' },
            { en: 'Foldable US Type-A plug — works on most Egyptian universal strips on our sample, but is not a native Europlug / BS 1363 pinout', ar: 'قابس أمريكي قابل للطي — يعمل على أغلب الشرائط المصرية العامة على عيّنتنا، لكنه ليس Europlug أصلي / ولا BS 1363' },
            { en: 'Wall efficiency and no-load draw NOT measured (no PZEM) — we do not invent % figures', ar: 'كفاءة الحائط والاستهلاك بلا حمل غير مقيسين (بلا PZEM) — لا نخترع نسبًا مئوية' },
            { en: 'Do not treat `anker-nano-45w-1c-pd` as a second measured sample — alias stub only', ar: 'لا تعامل `anker-nano-45w-1c-pd` كعيّنة مقاسة ثانية — stub alias فقط' },
            { en: 'Single unit tested (CV-CH-A2664-001) — production batches and regional plug variants may vary', ar: 'وحدة واحدة مُختبرة (CV-CH-A2664-001) — قد تختلف دفعات الإنتاج ونسخ القابس الإقليمية' },
        ],
    },
};
