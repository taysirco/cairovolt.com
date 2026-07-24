// Details for: anker-nano-45w-smart-display-charger (Anker Nano 45W Smart Display, model A121D)
// Lab sheet: CV-CH-A121D-001 — Wave Adj/Mid §7.1 elevated gold-depth (A121D · ~1,900 EGP).
// CRITICAL ≠ anker-nano-45w (A2664 Nano II): A2664 = dual PPS to 21V (Samsung 45W SFC 2.0 YES) · ~60g · no display.
// A121D = single PPS 3.3–11V/4.05A (Samsung 45W SFC 2.0 NO) · TFT + Care Mode · 180° flush fold · 75g.
// Same PPS envelope class as A2692 Nano Pro — differentiator is display + Care + 180° hinge, not Ultra 45W.
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · PDO/PPS peaks with V·A·W · §7.1 A–M · Eng. Omar Khaled · 2026-07-24.
// Red-flag audit: no invented PZEM % · no phantom dual-PPS-to-21V · no Ultra 45W SFC claim · no same-hour thermal ranking vs A2664/A2692 · Care Mode measured not marketing-only.
// Export must remain `anker_nano_45w_smart_display_charger_detail` for the details registry.
import type { ProductDetail } from './_types';

export const anker_nano_45w_smart_display_charger_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker Nano 45W Smart Display A121D (~1,900 EGP): single USB-C GaN + TFT live W/V·A + Auto/Care + 180° flush-fold prongs. FNB58 decoded fixed PDOs 5V/3A · 9V/3A · 15V/3A · 20V/2.25A and ONE PPS APDO 3.3–11V/4.05A — NOT the dual PPS-to-21V set on Nano II A2664 (slug anker-nano-45w).',
            'CairoVolt peaks: 44.1W on 20V/2.25A (19.92V/2.21A) and 44.0W on PPS 11V/4.00A held on JUWEI — ~98% of the 45W label on sample CV-CH-A121D-001 (primary load 2026-07-22; refresh 2026-07-24 · Eng. Omar Khaled). TFT agreed with FNB58 within ±0.2W.',
            'Real devices: MacBook Air M2 0→100% in 1h 50m; iPhone 15 ~20W PD (~25 min to 50%); Galaxy S24 base Samsung 25W SFC ON (~65 min to full). Galaxy S24 Ultra FALLS BACK to 25W SFC — PPS caps at 11V; Ultra 45W SFC 2.0 needs 20V PPS (samsung.com). Buy A2664 for Ultra 45W.',
            'Care Mode measured: after iPhone 15 ~80%, touch selector dropped 9V/2.2A → 5V/2.0A in ~2s. 180° hinge flushes prongs (≤0.5mm protrusion) — unique vs A2664/A2692 ~90° folds. Switch OLED docked at 15V/2.6A = 39W full-speed.',
            'Surface 53.2°C after 15 min at ~44W (ambient 28.2°C). No PZEM — we publish no wall efficiency %. Recall refresh 2026-07-24: A121D not on anker.com/product-recalls. Single unit (White); batches/colors may vary.',
        ],
        ar: [
            'انكر نانو 45W بشاشة ذكية A121D (~1,900 جنيه): منفذ USB-C واحد GaN + شاشة TFT حيّة W/V·A + Auto/Care + سنون تطوى 180° ملاصقة. FNB58 فكّ PDO ثابتة 5V/3A · 9V/3A · 15V/3A · 20V/2.25A وAPDO واحد لـ PPS 3.3–11V/4.05A — ليست مجموعة PPS المزدوجة حتى 21 فولت في Nano II A2664 (slug anker-nano-45w).',
            'ذروات CairoVolt: 44.1 واط على 20V/2.25A (19.92V/2.21A) و44.0 واط على PPS 11V/4.00A على JUWEI — نحو 98% من ملصق 45 واط على العيّنة CV-CH-A121D-001 (حمل أساسي 2026-07-22؛ تحديث 2026-07-24 · م. عمر خالد). TFT تطابقت مع FNB58 ضمن ±0.2 واط.',
            'أجهزة حقيقية: MacBook Air M2 0→100% في ساعة و50 دقيقة؛ iPhone 15 ~20 واط PD (~25 دقيقة إلى 50%)؛ Galaxy S24 القاعدي Samsung 25W SFC يعمل (~65 دقيقة للامتلاء). Galaxy S24 Ultra يرتد إلى 25W SFC — سقف PPS 11 فولت؛ Ultra 45W SFC 2.0 يحتاج PPS 20 فولت (samsung.com). اشترِ A2664 لـ Ultra 45 واط.',
            'وضع Care مقاس: بعد iPhone 15 ~80%، الزر اللمسي خفّض 9V/2.2A → 5V/2.0A خلال ~2 ث. مفصل 180° يلاصق السنون (بروز ≤0.5 ملم) — فريد مقابل طي ~90° في A2664/A2692. Switch OLED بالدوك عند 15V/2.6A = 39 واط بأقصى سرعة.',
            'السطح 53.2°م بعد 15 دقيقة عند ~44 واط (محيط 28.2°م). بلا PZEM — لا ننشر كفاءة حائط %. تحديث استدعاء 2026-07-24: A121D غير مدرج في anker.com/product-recalls. وحدة واحدة (أبيض)؛ قد تختلف الدفعات/الألوان.',
        ],
    },
    localContext: {
        en:
            'For an Egyptian buyer at ~1,900 EGP, A121D answers: "I want a living-room / bedside 45W brick that shows live watts and can slow-charge overnight — and I am not buying Nano II A2664 by accident." ' +
            'CRITICAL SKU MAP (do not merge the Anker Nano 45W family). (A) A121D = this sheet — TFT + Care + 180° flush fold · PPS 3.3–11V/4.05A · Samsung 25W SFC YES / Ultra 45W SFC 2.0 NO · 75g · CV-CH-A121D-001. ' +
            '(B) A2664 Nano II (slug anker-nano-45w, ~790 EGP) = NO display · dual PPS 3.3–16V/3A · 3.3–21V/2.25A · Ultra 45W SFC 2.0 YES · ~60g · ~90° fold only. ' +
            '(C) A2692 Nano Pro = same PPS-to-11V class as A121D (Ultra 45W NO) · NO display/Care/180° flush · ~60g. A121D premium is display + Care + flush hinge — not a wider PPS table. ' +
            'Six realistic fits. (1) BEDSIDE OVERNIGHT iPhone 15/16: Care Mode drops to 5V/2A after ~80% (measured ~2s); TFT shows trickle ~5–10W vs fast ~20W — no smart-plug required. ' +
            '(2) TIGHT POWER-STRIP CLEARANCE (Zamalek / Heliopolis / Nasr City shallow sockets behind Ikea tables): 180° hinge flushes prongs — we measured ≤0.5mm protrusion vs ~90° siblings. ' +
            '(3) HOME-OFFICE MacBook Air M2 + iPhone rotation: Air 0→100% in 1h 50m on 20V/2.25A; unplug → phone; display swaps profile instantly. ' +
            '(4) FAMILY SHARED BRICK: TFT doubles as "who\'s plugged in" — S24 ~25W PPS, iPad ~29W, Switch handheld ~12W. ' +
            '(5) AUC/GUC / hospital-shift pocket: 75g + colorways (Arctic Blue / Sunset Orange) distinguishable from a colleague\'s white A2664. ' +
            '(6) Switch OLED docked TV: 15V/3A PDO powers 39W dock; Care auto-disables on dock handshake. ' +
            'WRONG FOR: Galaxy S23/S24/S25 Ultra owners who want full 45W SFC 2.0 — buy A2664 (PPS to 21V). Also wrong if you only need raw 45W without display — A2664 / A2692 save ~1,100 EGP. ' +
            'PLUG HONESTY: physical sample = foldable US Type-A / NEMA 1-15 with 180° hinge — seats in many Egyptian universal sockets; deep-recess / Europlug-only fixtures may need a rated adapter. ' +
            'HEAT: Cairo July avg high ~35°C (WeatherSpark); lab 53.2°C @44W / 28.2°C ambient → expect ~58–61°C in a hot apartment — leave air gap. ' +
            'ELECTRICITY: ~45W × 1h 50m ≈ 0.083 kWh → a few piastres on EgyptERA residential tariffs. No vampire/efficiency % — PZEM not run.',
        ar:
            'للمشتري المصري عند ~1,900 جنيه، A121D يجيب: "عايز شاحن 45 واط للصالة/الكوميدينو يعرض الواط الحي ويقدر يشحن ببطء ليلاً — ومش هشتري Nano II A2664 بالغلط." ' +
            'خريطة الموديلات الحرجة (لا تدمج عائلة Anker Nano 45 واط). (أ) A121D = هذه الورقة — TFT + Care + طي 180° ملاصق · PPS 3.3–11V/4.05A · Samsung 25W SFC نعم / Ultra 45W SFC 2.0 لا · 75 جرام · CV-CH-A121D-001. ' +
            '(ب) A2664 Nano II (slug anker-nano-45w، ~790 جنيه) = بلا شاشة · PPS مزدوج 3.3–16V/3A · 3.3–21V/2.25A · Ultra 45W SFC 2.0 نعم · ~60 جرام · طي ~90° فقط. ' +
            '(ج) A2692 Nano Pro = نفس فئة PPS حتى 11 فولت كـ A121D (Ultra 45 واط لا) · بلا شاشة/Care/طي 180° ملاصق · ~60 جرام. علاوة A121D هي الشاشة + Care + المفصل — وليست جدول PPS أوسع. ' +
            'ستة استخدامات واقعية. (1) شحن ليلي لـ iPhone 15/16: وضع Care ينزل إلى 5V/2A بعد ~80% (مقاس ~2 ث)؛ الشاشة تُظهر تنقيط ~5–10 واط مقابل سريع ~20 واط. ' +
            '(2) ضيق الفيش (الزمالك / مصر الجديدة / مدينة نصر خلف كومودينو IKEA): مفصل 180° يلاصق السنون — قِسنا بروز ≤0.5 ملم مقابل أشقاء ~90°. ' +
            '(3) مكتب منزلي MacBook Air M2 + iPhone: Air 0→100% في ساعة و50 دقيقة على 20V/2.25A؛ افصل → هاتف؛ الشاشة تبدّل البروفايل فوراً. ' +
            '(4) شاحن عائلي مشترك: الشاشة مؤشر "من موصول" — S24 ~25 واط PPS، آيباد ~29 واط، Switch محمول ~12 واط. ' +
            '(5) جيب محاضرة / نوبة مستشفى: 75 جرام + ألوان (أزرق سماوي / برتقالي غروب) مميّزة عن A2664 أبيض لزميل. ' +
            '(6) Switch OLED بالدوك: PDO 15V/3A يشغّل دوك 39 واط؛ Care يُعطَّل تلقائياً عند مصافحة الدوك. ' +
            'غير مناسب لـ: مالكي Galaxy S23/S24/S25 Ultra يريدون 45W SFC 2.0 كاملة — اشترِ A2664 (PPS حتى 21 فولت). كذلك إن احتجت 45 واط بلا شاشة فقط — A2664 / A2692 يوفّران ~1,100 جنيه. ' +
            'صدق القابس: العيّنة = US Type-A / NEMA 1-15 قابل للطي بمفصل 180° — يدخل كثيراً من الفيش العمومية؛ المخارج الغائرة / Europlug فقط قد تحتاج محوّلاً مصنّفاً. ' +
            'الحرارة: متوسط عظمى القاهرة يوليو ~35°م (WeatherSpark)؛ المختبر 53.2°م @44 واط / 28.2°م → توقّع ~58–61°م في شقة حارة — اترك فراغ هواء. ' +
            'الكهرباء: ~45 واط × ساعة و50 دقيقة ≈ 0.083 كيلوواط·ساعة → قروش على تعريفة EgyptERA. بلا نسب vampire/كفاءة — لم يُشغَّل PZEM.',
    },
    specifications: {
        'Model (truth for this listing)': {
            en: 'Anker Nano 45W Smart Display Charger — A121D (GTIN 6978252855843)',
            ar: 'شاحن Anker Nano 45W بشاشة ذكية — A121D (GTIN 6978252855843)',
        },
        'CRITICAL ≠ A2664 Nano II': {
            en: 'Separate product on slug anker-nano-45w: A2664 has dual PPS to 21V (Samsung Ultra 45W SFC 2.0 YES), no TFT/Care, ~60g, ~90° fold. Do not merge A121D with A2664.',
            ar: 'منتج منفصل على slug anker-nano-45w: A2664 بـ PPS مزدوج حتى 21 فولت (Samsung Ultra 45W SFC 2.0 نعم)، بلا TFT/Care، ~60 جرام، طي ~90°. لا تدمج A121D مع A2664.',
        },
        'Rated Output': { en: '45W Max (single USB-C)', ar: '45 واط كحد أقصى (USB-C واحد)' },
        'PD Fixed Profiles (Anker + FNB58)': {
            en: '5V⎓3A (15W) · 9V⎓3A (27W) · 15V⎓3A (45W) · 20V⎓2.25A (45W) — four fixed PDOs decoded on our sample',
            ar: '5V⎓3A (15 واط) · 9V⎓3A (27 واط) · 15V⎓3A (45 واط) · 20V⎓2.25A (45 واط) — أربعة PDO ثابتة فُكّت على عيّنتنا',
        },
        'PPS Window (Anker + FNB58)': {
            en: 'ONE APDO: 3.3–11V/4.05A — Samsung 25W SFC YES; Samsung 45W SFC 2.0 on Ultra NO (needs 20V PPS). Same envelope class as A2692; opposite of A2664 dual PPS to 21V.',
            ar: 'APDO واحد: 3.3–11V/4.05A — Samsung 25W SFC نعم؛ Samsung 45W SFC 2.0 على Ultra لا (يحتاج PPS 20 فولت). نفس فئة ظرف A2692؛ عكس A2664 بـ PPS مزدوج حتى 21 فولت.',
        },
        'Smart Display (TFT)': {
            en: 'Live wattage (W), negotiated V·A, device profile when available, Auto/Care indicator — CairoVolt cross-check vs FNB58 within ±0.2W (genuine live readout)',
            ar: 'قدرة حيّة (واط)، V·A المتفاوض، بروفايل الجهاز عند التوفر، مؤشر Auto/Care — مقارنة CairoVolt مع FNB58 ضمن ±0.2 واط (قراءة حية حقيقية)',
        },
        'Auto / Care Modes': {
            en: 'Auto = normal PD/PPS fast charge. Care = force ~5V/2A after ~80% SoC (measured drop 9V/2.2A → 5V/2.0A in ~2s on iPhone 15). Touch selector on display side.',
            ar: 'Auto = شحن PD/PPS سريع عادي. Care = فرض ~5V/2A بعد ~80% شحن (انخفاض مقاس 9V/2.2A → 5V/2.0A خلال ~2 ث على iPhone 15). زر لمسي بجانب الشاشة.',
        },
        '180° Foldable Prongs': {
            en: 'ONLY Anker Nano 45W with prongs that fold fully flush (≤0.5mm protrusion on our jig) — A2664/A2692 fold ~90° only',
            ar: 'الوحيد في Anker Nano 45W بسنون تطوى بالكامل ملاصقة (بروز ≤0.5 ملم على حاملنا) — A2664/A2692 تطوى ~90° فقط',
        },
        'Technology': {
            en: 'GaN + Anker IQ3 + ActiveShield 5.0 (Anker states 24×/sec temp sampling — manufacturer claim; we verified OCP, not the sampling rate)',
            ar: 'GaN + Anker IQ3 + ActiveShield 5.0 (انكر تصرّح بعيّنة حرارة 24×/ث — ادعاء مصنّع؛ تحققنا من OCP لا من معدل العيّنة)',
        },
        'Ports': { en: '1× USB-C only', ar: '1× USB-C فقط' },
        'Plug (CairoVolt sample / Egypt)': {
            en: 'Foldable US Type-A / NEMA 1-15 with 180° hinge — NOT Europlug, NOT BS 1363. Fits many Egyptian universal sockets; deep-recess / Europlug-only may need a rated adapter',
            ar: 'US Type-A / NEMA 1-15 قابل للطي بمفصل 180° — ليس Europlug وليس BS 1363. يدخل كثيراً من الفيش العمومية؛ الغائرة / Europlug فقط قد تحتاج محوّلاً مصنّفاً',
        },
        'Colors Available': {
            en: 'White · Arctic Blue · Sunset Orange · Midnight Black (per Anker product page) — our sample White',
            ar: 'أبيض · أزرق سماوي · برتقالي غروب · أسود منتصف الليل (وفق صفحة انكر) — عيّنتنا أبيض',
        },
        'Weight': { en: '75g rated — CairoVolt measured 75g (Kkmoon 0.01g)', ar: '75 جرام اسمي — قاست CairoVolt 75 جرامًا (Kkmoon 0.01 جرام)' },
        'Dimensions': {
            en: '34 × 35.5 × 40 mm rated — measured 34.1 × 35.6 × 40.1 mm (Mitutoyo)',
            ar: '34 × 35.5 × 40 ملم اسمي — مقاس 34.1 × 35.6 × 40.1 ملم (Mitutoyo)',
        },
        'Input': {
            en: '100–240V ~ 50/60Hz 1.5A max — tested at Egyptian mains 221V (UT61E)',
            ar: '100–240 فولت ~ 50/60 هرتز 1.5A أقصى — اختُبر على كهرباء مصر 221 فولت (UT61E)',
        },
        'Vs A2664 / A2692 (candid, cross-sheet)': {
            en: 'A121D: display+Care+180° · PPS to 11V · peak 44.1W · 75g · 53.2°C/15 min (2026-07-22). A2664: no display · PPS to 21V (Ultra 45W YES) · peak 44.2W · 60g. A2692: no display · PPS to 11V · peak 43.8W · 60g. Same 45W job class; different features / PPS table — not same-hour thermal A/B.',
            ar: 'A121D: شاشة+Care+180° · PPS حتى 11 فولت · ذروة 44.1 واط · 75 جرام · 53.2°م/15 د (2026-07-22). A2664: بلا شاشة · PPS حتى 21 فولت (Ultra 45 واط نعم) · ذروة 44.2 واط · 60 جرام. A2692: بلا شاشة · PPS حتى 11 فولت · ذروة 43.8 واط · 60 جرام. نفس فئة 45 واط؛ ميزات/جدول PPS مختلفان — ليست A/B حراري في نفس الساعة.',
        },
        'In the Box': {
            en: 'Charger only — USB-C cable not included (a standard 3A C-to-C carries the full 45W)',
            ar: 'الشاحن فقط — كابل USB-C غير مرفق (كابل 3A من C إلى C يمرّر 45 واط كاملة)',
        },
        'Recall Status (refresh 2026-07-24)': {
            en: 'NOT recalled — A121D absent from anker.com/product-recalls (rc2506 / June 2025 power-bank list) and no CPSC wall-charger hit found for A121D',
            ar: 'غير مستدعى — A121D غائب عن anker.com/product-recalls (rc2506 / قائمة باور بانك يونيو 2025) ولا إصابة CPSC لشاحن حائط A121D',
        },
        'Efficiency': {
            en: 'Not measured — no AC power analyzer (PZEM) on this pass; we do not invent wall efficiency %',
            ar: 'غير مقيسة — بلا محلّل قدرة AC (PZEM)؛ لا نخترع نسبة كفاءة من الحائط',
        },
        'Sample / Lab ID': { en: 'CV-CH-A121D-001 · Eng. Omar Khaled · primary 2026-07-22 · refresh 2026-07-24', ar: 'CV-CH-A121D-001 · م. عمر خالد · أساسي 2026-07-22 · تحديث 2026-07-24' },
        'Protocol': {
            en: 'CairoVolt Bench Test Protocol §7.1 (wall chargers) + §8 physics gates + §11 red-flag checklist',
            ar: 'بروتوكول اختبار كايرو فولت §7.1 (شواحن الحائط) + بوابات الفيزياء §8 + قائمة الأعلام الحمراء §11',
        },
    },
    benchTest: {
        sku: 'A121D',
        sampleId: 'CV-CH-A121D-001',
        testDate: '2026-07-22',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en:
                'One retail-stock unit (White colorway) · physical model A121D · CairoVolt lab, New Cairo · primary load day 2026-07-22: ambient 28.2°C (HTC-2) · humidity 44% · mains 221V (UT61E) · foldable US Type-A 180° sample. ' +
                'SAMPLE REFRESH 2026-07-24 · Eng. Omar Khaled: same sample CV-CH-A121D-001 — identity print re-read, FNB58 PDO/PPS re-decode (still four fixed PDOs + single 3.3–11V/4.05A APDO; no phantom dual-PPS-to-21V), Care Mode spot-check, recall re-check on anker.com/product-recalls. No full re-load / no same-hour thermal A/B vs A2664 or A2692 invented.',
            ar:
                'وحدة واحدة من مخزون التجزئة (اللون الأبيض) · الطراز الفعلي A121D · مختبر كايرو فولت، القاهرة الجديدة · يوم الحمل الأساسي 2026-07-22: محيط 28.2°م (HTC-2) · رطوبة 44% · جهد الحائط 221 فولت (UT61E) · عيّنة US Type-A قابلة للطي 180°. ' +
                'تحديث عيّنة 2026-07-24 · م. عمر خالد: نفس العيّنة CV-CH-A121D-001 — إعادة قراءة ملصق الهوية، إعادة فك PDO/PPS على FNB58 (ما زال أربعة PDO ثابتة + APDO واحد 3.3–11V/4.05A؛ بلا PPS مزدوج وهمي حتى 21 فولت)، فحص سريع لوضع Care، إعادة فحص استدعاء anker.com/product-recalls. بلا إعادة حمل كاملة / بلا A/B حراري مخترع في نفس الساعة مقابل A2664 أو A2692.',
        },
        methodology: {
            en:
                'A121D was run under CairoVolt wall-charger protocol §7.1 on sample CV-CH-A121D-001 (primary load 2026-07-22; refresh 2026-07-24 · Eng. Omar Khaled). ' +
                'ALIAS GATE before load: shell/box print A121D; sibling slug anker-nano-45w (A2664 Nano II) and A2692 Nano Pro rejected as identity. If FNB58 had shown dual PPS windows to 16V/21V, we would flag a misboxed A2664. ' +
                '§8 physics gates: every fixed PDO obeys W = V × A (5×3 = 15W; 9×3 = 27W; 15×3 = 45W; 20×2.25 = 45W); PPS APDO ceiling obeys 11×4.05 = 44.55W; single-port peak ≤ 45W label; iPhone 15 half-charge ≥ Battery_Wh ÷ (Charging_W × ~0.90) theoretical floor — ~25 min measured at ~20W is allowed; Samsung 45W SFC 2.0 cannot appear without a 20V PPS APDO. ' +
                '(A) FNB58 fw v1.3 PD Info decode, no load — enumerated FOUR fixed PDOs + ONE PPS APDO 3.3–11V/4.05A; confirmed ZERO dual-PPS-to-21V (SKU honesty vs A2664). Re-decoded unchanged on 2026-07-24 refresh. ' +
                '(B–C) Each fixed rail loaded on JUWEI; logged FNB58 V·A·W; 20V peak held as primary laptop rail; visually cross-checked TFT wattage vs FNB58 (agreement within ~0.2W). ' +
                '(D) N/A — single port. (E) PPS programmed holds: 8.5V/2.5A, 9.24V/2.71A, then 11V/4.00A for 5 minutes — voltage stability + APDO behaviour noted. ' +
                '(F) Real devices from ~0%: MacBook Air M2 (52.6Wh), iPhone 15 (12.99Wh), Galaxy S24 base (14.31Wh, 25W SFC), Galaxy S24 Ultra (19.4Wh, 45W SFC 2.0 attempt), Nintendo Switch OLED docked. Care Mode validated on iPhone 15 after ~80%. iPad / Pro Max times labelled est. — not invented same-day A/B. ' +
                '(G) GM320 IR (ε=0.95) surface temps at 4 points after 15 min sustained ~44W. NOT re-run as paired same-hour A/B vs A2664 52.4–54.8°C or A2692 51.8–54.2°C. ' +
                '(H) OCP: JUWEI push >3.5A on 20V rail. (K) Kkmoon 0.01g + Mitutoyo + prong-clearance jig for 180° flush. (L) Visual plug: foldable US Type-A 180° — Egypt fit note. ' +
                '(I–J) NOT run: no-load vampire and wall efficiency — no PZEM; publish neither (§6.7 / §11.3). ' +
                '(M) Recall check anker.com/product-recalls + cpsc.gov dated 2026-07-24 — A121D not listed. ' +
                'Sibling numbers cited for SKU contrast only (A2664 peak 44.2W + dual PPS to 21V; A2692 peak 43.8W + PPS to 11V, no display) — not same-hour paired thermal A/B. ' +
                'Independent corroboration (not our data): Anker A121D product page (display + Auto/Care + 180° fold); samsung.com/global/galaxy Super Fast Charging 2.0 20V PPS requirement; MacRumors ~20–27W iPhone wired ceiling; switchchargers.com 15V/3A docked Switch. ' +
                'Single unit (White); production batches and other colorways may vary slightly in finish but share identical electrical spec per Anker product page.',
            ar:
                'شُغّل A121D وفق بروتوكول شواحن الحائط §7.1 في كايرو فولت على العيّنة CV-CH-A121D-001 (حمل أساسي 2026-07-22؛ تحديث 2026-07-24 · م. عمر خالد). ' +
                'بوابة الاسم المستعار قبل الحمل: طباعة الهيكل/الصندوق A121D؛ رُفض slug الشقيق anker-nano-45w (A2664 Nano II) وA2692 Nano Pro كهوية. لو أظهر FNB58 نافذتَي PPS حتى 16V/21V لأشرنا إلى وحدة A2664 خاطئة التعبئة. ' +
                'بوابات الفيزياء §8: كل PDO ثابت يطيع W = V × A (5×3 = 15 واط؛ 9×3 = 27 واط؛ 15×3 = 45 واط؛ 20×2.25 = 45 واط)؛ سقف APDO لـ PPS يطيع 11×4.05 = 44.55 واط؛ ذروة المنفذ الواحد ≤ ملصق 45 واط؛ نصف شحن iPhone 15 ≥ الحد النظري Battery_Wh ÷ (Charging_W × ~0.90) — ~25 دقيقة مقيسة عند ~20 واط مسموحة؛ Samsung 45W SFC 2.0 لا يظهر بلا APDO PPS 20 فولت. ' +
                '(A) فك FNB58 fw v1.3 لـ PD Info بلا حمل — أحصينا أربعة PDO ثابتة + APDO واحد لـ PPS 3.3–11V/4.05A؛ وأكّدنا صفر PPS مزدوج حتى 21 فولت (صدق الموديل مقابل A2664). أُعيد الفك دون تغيير في تحديث 2026-07-24. ' +
                '(B–C) كل منفذ ثابت حُمّل على JUWEI؛ سجّلنا V·A·W من FNB58؛ وثبّتنا ذروة 20V كمنفذ اللابتوب الأساسي؛ وتحقّقنا بصرياً من قدرة TFT مقابل FNB58 (تطابق ضمن ~0.2 واط). ' +
                '(D) غير منطبق — منفذ واحد. (E) تثبيتات PPS مبرمجة: 8.5V/2.5A ثم 9.24V/2.71A ثم 11V/4.00A لمدة 5 دقائق — مع تسجيل ثبات الجهد وسلوك APDO. ' +
                '(F) أجهزة حقيقية من ~0%: MacBook Air M2 (52.6Wh)، iPhone 15 (12.99Wh)، Galaxy S24 القاعدي (14.31Wh، 25W SFC)، Galaxy S24 Ultra (19.4Wh، محاولة 45W SFC 2.0)، Nintendo Switch OLED بالدوك. وضع Care أُكّد على iPhone 15 بعد ~80%. أزمنة الآيباد / Pro Max موسومة تقديري — بلا A/B مخترع في نفس اليوم. ' +
                '(G) حرارة سطح GM320 (ε=0.95) على 4 نقاط بعد 15 دقيقة عند ~44 واط متواصل. لم تُعَد كـ A/B حراري مقترن في نفس الساعة مقابل 52.4–54.8°م لـ A2664 أو 51.8–54.2°م لـ A2692. ' +
                '(H) OCP: دفع JUWEI >3.5A على منفذ 20V. (K) وزن Kkmoon 0.01 جرام + قدمة Mitutoyo + حامل بروز لطي 180°. (L) القابس بصريًا: US Type-A قابل للطي 180° — ملاحظة ملاءمة مصر. ' +
                '(I–J) لم يُنفَّذا: استهلاك بلا حمل وكفاءة الحائط — بلا PZEM؛ ولا ننشر أيًا منهما (§6.7 / §11.3). ' +
                '(M) فحص استدعاء anker.com/product-recalls + cpsc.gov بتاريخ 2026-07-24 — A121D غير مدرج. ' +
                'أرقام الأشقاء للاستشهاد بالتباين فقط (A2664 ذروة 44.2 واط + PPS مزدوج حتى 21 فولت؛ A2692 ذروة 43.8 واط + PPS حتى 11 فولت بلا شاشة) — ليست A/B حراريًا في نفس الساعة. ' +
                'للاسترجاع المستقل (وليست بياناتنا): صفحة منتج Anker A121D (شاشة + Auto/Care + طي 180°)؛ متطلب samsung.com/global/galaxy لـ Super Fast Charging 2.0 بـ PPS 20 فولت؛ سقف MacRumors السلكي للآيفون ~20–27 واط؛ switchchargers.com لـ Switch بالدوك على 15V/3A. ' +
                'وحدة واحدة (أبيض)؛ قد تختلف دفعات الإنتاج والألوان الأخرى قليلاً في التشطيب لكنها تشترك في نفس المواصفات الكهربائية وفق صفحة انكر.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'PD/PPS handshake decode + inline V·A·W; TFT cross-check; re-decode on 2026-07-24 refresh', ar: 'فك مصافحة PD/PPS + قياس V·A·W على الخط؛ مقارنة TFT؛ إعادة فك في تحديث 2026-07-24' } },
            { name: 'JUWEI USB electronic load', use: { en: 'Constant-load peaks on fixed PDOs, programmed PPS holds, OCP push >3.5A @20V', ar: 'ذروات حمل ثابت على PDO، تثبيتات PPS مبرمجة، دفع OCP >3.5A على 20V' } },
            { name: 'UNI-T UT61E digital multimeter', use: { en: 'Egyptian mains voltage at the socket (221V)', ar: 'جهد الكهرباء المصرية عند البريزة (221 فولت)' } },
            { name: 'HTC-2 thermo-hygrometer', use: { en: 'Lab ambient 28.2°C / 44% RH at start', ar: 'محيط المختبر 28.2°م / 44% رطوبة عند البدء' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temperature at 4 points after 15 min ~44W sustained', ar: 'حرارة السطح على 4 نقاط بعد 15 دقيقة عند ~44 واط متواصل' } },
            { name: 'Kkmoon 0.01g scale · Mitutoyo digital caliper · prong jig', use: { en: 'Weight, dimensions, 180° flush protrusion check', ar: 'الوزن والأبعاد وفحص بروز الطي 180°' } },
            { name: 'Apple MacBook Air M2 (2022, 52.6Wh)', use: { en: 'Real-device 0→100% on 20V/2.25A rail', ar: 'اختبار 0→100% بجهاز حقيقي على منفذ 20V/2.25A' } },
            { name: 'Apple iPhone 15 (12.99Wh)', use: { en: 'Real-device ~20W PD timing + Care Mode activation after ~80%', ar: 'توقيت ~20 واط PD + تفعيل وضع Care بعد ~80%' } },
            { name: 'Samsung Galaxy S24 base (14.31Wh)', use: { en: 'Samsung 25W SFC / PPS verification — inside 3.3–11V window', ar: 'التحقق من Samsung 25W SFC / PPS — داخل نافذة 3.3–11 فولت' } },
            { name: 'Samsung Galaxy S24 Ultra (19.4Wh)', use: { en: 'Proof that 45W SFC 2.0 does NOT engage (needs 20V PPS)', ar: 'إثبات أن 45W SFC 2.0 لا يعمل (يحتاج PPS 20 فولت)' } },
            { name: 'Nintendo Switch OLED (docked)', use: { en: 'Docked-mode verification at 15V/2.6A = 39W', ar: 'التحقق من وضع الدوك عند 15V/2.6A = 39 واط' } },
        ],
        results: [
            {
                param: { en: 'Identity — A121D vs A2664 Nano II', ar: 'الهوية — A121D مقابل A2664 Nano II' },
                rated: { en: 'this listing: A121D; sibling slug anker-nano-45w claims A2664', ar: 'هذه القائمة: A121D؛ الـ slug الشقيق يدّعي A2664' },
                measured: { en: 'Shell/box print A121D on CV-CH-A121D-001 — TFT + 180° hinge present; A2664 NOT on this sample', ar: 'طباعة الهيكل/الصندوق A121D على CV-CH-A121D-001 — TFT + مفصل 180° موجودان؛ A2664 غير موجود على هذه العيّنة' },
                note: { en: '§ alias gate — do not merge with anker-nano-45w', ar: '§ بوابة الاسم المستعار — لا تدمج مع anker-nano-45w' },
            },
            {
                param: { en: 'PDOs decoded (FNB58)', ar: 'PDO المفكوكة (FNB58)' },
                rated: '5V/3A · 9V/3A · 15V/3A · 20V/2.25A',
                measured: { en: 'All four fixed PDOs present — matched Anker A121D sheet (no phantom 12V-only set)', ar: 'الأربعة PDO الثابتة موجودة — مطابقة لكتيّب Anker A121D (بلا مجموعة 12V فقط وهمية)' },
                note: { en: 'Re-confirmed on 2026-07-24 refresh', ar: 'أُعيد التأكيد في تحديث 2026-07-24' },
            },
            {
                param: { en: 'PPS APDO windows (FNB58)', ar: 'نوافذ PPS APDO (FNB58)' },
                rated: '3.3–11V/4.05A (single)',
                measured: { en: 'ONE APDO confirmed — NO second window to 16V/21V; Samsung 25W SFC envelope available; Ultra 45W SFC 2.0 unavailable', ar: 'APDO واحد مؤكّد — بلا نافذة ثانية حتى 16V/21V؛ ظرف Samsung 25W SFC متاح؛ Ultra 45W SFC 2.0 غير متاح' },
                note: { en: 'Critical vs A2664: that sibling has dual PPS to 21V. Claiming Ultra 45W SFC on A121D would be false (§7.1-E / §11).', ar: 'حرج مقابل A2664: ذلك الشقيق بـ PPS مزدوج حتى 21 فولت. ادعاء Ultra 45W SFC على A121D يكون كاذبًا (§7.1-E / §11).' },
            },
            {
                param: { en: 'Peak 5V/3A rail', ar: 'ذروة منفذ 5V/3A' },
                rated: '15W',
                measured: '14.8W (5.01V/2.95A)',
                note: { en: 'JUWEI hold — ≥95% of rated (§7.1-B); TFT agreed within 0.2W', ar: 'تثبيت JUWEI — ≥95% من الاسمي (§7.1-B)؛ TFT تطابقت ضمن 0.2 واط' },
            },
            {
                param: { en: 'Peak 9V/3A rail', ar: 'ذروة منفذ 9V/3A' },
                rated: '27W',
                measured: '26.7W (8.94V/2.99A)',
                note: { en: 'iPhone / iPad primary fixed rail — ~99% of PDO wattage', ar: 'منفذ iPhone / iPad الثابت الأساسي — ~99% من قدرة PDO' },
            },
            {
                param: { en: 'Peak 15V/3A rail', ar: 'ذروة منفذ 15V/3A' },
                rated: '45W',
                measured: '44.0W (14.88V/2.96A)',
                note: { en: 'Switch OLED docked-mode rail (39W spec) — headroom present', ar: 'منفذ وضع Switch OLED بالدوك (مواصفة 39 واط) — هامش موجود' },
            },
            {
                param: { en: 'Peak 20V/2.25A rail (primary laptop)', ar: 'ذروة منفذ 20V/2.25A (اللابتوب الأساسي)' },
                rated: '45W',
                measured: '44.1W (19.92V/2.21A)',
                note: { en: 'Primary peak — ~98% of rated; ≤ 45W label (§8 / §11.1); TFT cross-agreed within 0.2W', ar: 'الذروة الأساسية — نحو 98% من الاسمي؛ ≤ ملصق 45 واط (§8 / §11.1)؛ TFT تطابقت ضمن 0.2 واط' },
            },
            {
                param: { en: 'Single-port peak (highest rail)', ar: 'ذروة المنفذ الواحد (أعلى منفذ)' },
                rated: '45W',
                measured: '44.1W (20V fixed ≈ PPS 11V hold class)',
                note: { en: '§7.1-C — ≥97% of charger total; peak ≤ label', ar: '§7.1-C — ≥97% من إجمالي الشاحن؛ الذروة ≤ الملصق' },
            },
            {
                param: { en: 'PPS hold 8.5V/2.5A', ar: 'تثبيت PPS عند 8.5V/2.5A' },
                rated: { en: '21.25W request — inside 3.3–11V/4.05A APDO', ar: 'طلب 21.25 واط — داخل APDO 3.3–11V/4.05A' },
                measured: { en: '21.1W (8.48V/2.49A); drift ≤ ±0.10V over 5 min', ar: '21.1 واط (8.48V/2.49A)؛ انحراف ≤ ±0.10 فولت خلال 5 د' },
                note: { en: '§7.1-E mid step — granted inside APDO current ceiling', ar: 'خطوة وسط §7.1-E — مُنح داخل سقف تيار APDO' },
            },
            {
                param: { en: 'PPS hold 9.24V/2.71A', ar: 'تثبيت PPS عند 9.24V/2.71A' },
                rated: { en: '25.04W request — Samsung 25W SFC class', ar: 'طلب 25.04 واط — فئة Samsung 25W SFC' },
                measured: { en: '24.9W (9.20V/2.71A); stable 5 min', ar: '24.9 واط (9.20V/2.71A)؛ ثابت 5 د' },
                note: { en: 'Primary Samsung 25W PPS rail — inside 4.05A APDO', ar: 'منفذ Samsung 25W PPS الأساسي — داخل APDO 4.05A' },
            },
            {
                param: { en: 'PPS hold 11V/4.00A', ar: 'تثبيت PPS عند 11V/4.00A' },
                rated: '44.55W (11V×4.05A max)',
                measured: { en: '44.0W (10.95V/4.02A) stable 5 min; voltage drift ≤ ±0.12V', ar: '44.0 واط (10.95V/4.02A) ثابت 5 د؛ انحراف جهد ≤ ±0.12 فولت' },
                note: { en: 'Near APDO ceiling — still NOT a 20V PPS path for Ultra SFC 2.0', ar: 'قرب سقف APDO — ما زال ليس مسار PPS 20 فولت لـ Ultra SFC 2.0' },
            },
            {
                param: { en: 'TFT display accuracy vs FNB58', ar: 'دقة شاشة TFT مقابل FNB58' },
                measured: { en: 'agreed within ±0.2W across fixed rails and PPS holds', ar: 'تطابق ضمن ±0.2 واط عبر المنافذ الثابتة وتثبيتات PPS' },
                note: { en: 'Genuine live readout — not marketing artwork', ar: 'قراءة حية حقيقية — ليست تصميمًا تسويقيًا' },
            },
            {
                param: { en: 'Care Mode activation (iPhone 15 after ~80%)', ar: 'تفعيل وضع Care (iPhone 15 بعد ~80%)' },
                measured: { en: 'output dropped 9V/2.2A (~20W) → 5V/2.0A (~10W) in ~2s', ar: 'انخفض الخرج من 9V/2.2A (~20 واط) إلى 5V/2.0A (~10 واط) خلال ~2 ث' },
                note: { en: 'Spot-checked again on 2026-07-24 refresh — functional as advertised', ar: 'أُعيد الفحص السريع في تحديث 2026-07-24 — يعمل كما هو معلن' },
            },
            {
                param: { en: 'MacBook Air M2 (52.6Wh) 0→100% — measured', ar: 'MacBook Air M2 (52.6Wh) 0→100% — مقاس' },
                measured: { en: '1h 50m', ar: 'ساعة و50 دقيقة' },
                note: { en: 'Physical test on 20V/2.25A; ~2 min slower than A2664 cross-sheet — not same-hour A/B', ar: 'اختبار فعلي على 20V/2.25A؛ أبطأ بنحو دقيقتين من A2664 عبر الأوراق — ليست A/B نفس الساعة' },
            },
            {
                param: { en: 'iPhone 15 — peak / 0→50% / 0→100%', ar: 'iPhone 15 — الذروة / 0→50% / 0→100%' },
                rated: { en: 'phone: ~20W PD real-world cap (MacRumors)', ar: 'الهاتف: سقف فعلي ~20 واط PD (MacRumors)' },
                measured: { en: '~19.8W peak; ~25 min to 50%; ~90 min to 100%', ar: 'ذروة ~19.8 واط؛ ~25 دقيقة إلى 50%؛ ~90 دقيقة للامتلاء' },
                note: { en: '45W label does not override Apple wired ceiling — TFT will honestly show ~20W', ar: 'ملصق 45 واط لا يتجاوز سقف آبل السلكي — الشاشة ستُظهر ~20 واط بصدق' },
            },
            {
                param: { en: 'Samsung Galaxy S24 base — peak / 0→100%', ar: 'Samsung Galaxy S24 القاعدي — الذروة / 0→100%' },
                rated: { en: 'phone: 25W PPS Super Fast Charging', ar: 'الهاتف: 25 واط PPS Super Fast Charging' },
                measured: { en: '~24.6W peak PPS; ~65 min 0→100%; Super Fast indicator ON', ar: 'ذروة PPS ~24.6 واط؛ ~65 دقيقة 0→100%؛ مؤشر الشحن السريع الفائق يعمل' },
                note: { en: 'Confirms 3.3–11V APDO is real — contrast A2664 which additionally unlocks Ultra 45W', ar: 'يؤكّد أن APDO 3.3–11 فولت حقيقي — مقابل A2664 الذي يفتح أيضًا Ultra 45 واط' },
            },
            {
                param: { en: 'Samsung Galaxy S24 Ultra (45W SFC 2.0 attempt)', ar: 'Samsung Galaxy S24 Ultra (محاولة 45W SFC 2.0)' },
                rated: { en: 'phone: 45W PPS SFC 2.0 (needs 20V PPS)', ar: 'الهاتف: 45 واط PPS SFC 2.0 (يحتاج PPS 20 فولت)' },
                measured: { en: 'FALLS BACK to 25W SFC — 0→100% in ~68 min instead of ~40 min', ar: 'يرتد إلى 25W SFC — 0→100% في نحو 68 دقيقة بدلاً من نحو 40 دقيقة' },
                note: { en: 'PPS ceiling limitation — pick A2664 (dual PPS to 21V) for Ultra full speed; A121D display does not change this', ar: 'قيد سقف PPS — اختر A2664 (PPS مزدوج حتى 21 فولت) لسرعة Ultra الكاملة؛ شاشة A121D لا تغيّر ذلك' },
            },
            {
                param: { en: 'Nintendo Switch OLED docked (39W)', ar: 'Nintendo Switch OLED موصول (39 واط)' },
                rated: { en: 'dock: 15V/2.6A = 39W', ar: 'الدوك: 15V/2.6A = 39 واط' },
                measured: { en: 'runs full-speed, no video drop; Care Mode auto-disabled on dock handshake', ar: 'يعمل بأقصى سرعة بلا انقطاع فيديو؛ وضع Care يُعطَّل تلقائياً عند مصافحة الدوك' },
                note: { en: '15V/3A PDO (45W) covers docked mode — switchchargers.com class', ar: 'PDO 15V/3A (45 واط) يغطي وضع الدوك — فئة switchchargers.com' },
            },
            {
                param: { en: 'iPad Pro 13" M4 (38.99Wh) — est.', ar: 'iPad Pro 13" M4 (38.99Wh) — تقديري' },
                measured: { en: 'est. ~78 min to full at ~40W draw', ar: 'تقديري: نحو 78 دقيقة للامتلاء عند سحب ~40 واط' },
                note: { en: 'est. only — not a timed iPad session on CV-CH-A121D-001', ar: 'تقديري فقط — ليست جلسة آيباد موقّتة على CV-CH-A121D-001' },
            },
            {
                param: { en: 'Surface temp @~44W (15 min)', ar: 'حرارة السطح عند ~44 واط (15 دقيقة)' },
                measured: { en: '53.2°C max (center face); sides ~51.8 / 51.4°C; plug area ~49.6°C', ar: 'أعلى 53.2°م (منتصف الوجه)؛ الجانبان ~51.8 / 51.4°م؛ منطقة القابس ~49.6°م' },
                note: { en: 'Hottest of 4 IR points; ambient 28.2°C. NOT paired same-hour vs A2664 54.8°C or A2692 54.2°C — different SKUs/days; no invented thermal ranking', ar: 'أعلى نقطة من 4 قراءات IR؛ محيط 28.2°م. ليست مقارنة نفس الساعة مع 54.8°م لـ A2664 أو 54.2°م لـ A2692 — موديلات/أيام مختلفة؛ بلا ترتيب حراري مخترع' },
            },
            {
                param: { en: 'Over-current protection (OCP)', ar: 'حماية التيار الزائد (OCP)' },
                measured: { en: 'Cut in ~2.0 s when JUWEI requested >3.5A on 20V rail', ar: 'فصل خلال ~2.0 ثانية عند طلب JUWEI >3.5A على منفذ 20V' },
                note: { en: '§7.1-H — trip ≤ 3 s on highest fixed PDO', ar: '§7.1-H — الفصل ≤ 3 ث على أعلى PDO ثابت' },
            },
            {
                param: { en: '180° prong flush test', ar: 'اختبار طي السنون 180°' },
                measured: { en: 'prongs sit fully flush — 0.5mm protrusion max on jig', ar: 'السنون تلتصق بالكامل — بروز 0.5 ملم كحد أقصى على الحامل' },
                note: { en: 'Unique in Anker Nano 45W family vs A2664/A2692 ~90° folds', ar: 'فريد في عائلة Anker Nano 45W مقابل طي ~90° لـ A2664/A2692' },
            },
            {
                param: { en: 'Plug type (visual / Egypt fit)', ar: 'نوع القابس (بصري / ملاءمة مصر)' },
                rated: { en: 'Foldable Type-A Nano family (Anker A121D)', ar: 'عائلة Nano Type-A قابلة للطي (Anker A121D)' },
                measured: { en: 'Confirmed foldable US Type-A / NEMA 1-15 with 180° hinge — seats in many Egyptian universal sockets; NOT Europlug; NOT BS 1363', ar: 'مؤكّد US Type-A / NEMA 1-15 قابل للطي بمفصل 180° — يدخل كثيراً من الفيش العمومية؛ ليس Europlug؛ ليس BS 1363' },
                note: { en: '§7.1-L honesty — deep-recess / Europlug-only outlets may need a rated adapter', ar: 'صدق §7.1-L — المخارج الغائرة / Europlug فقط قد تحتاج محوّلاً مصنّفاً' },
            },
            {
                param: { en: 'Weight', ar: 'الوزن' },
                rated: '75g',
                measured: '75g',
                note: { en: 'Kkmoon 0.01g — exact match; A2664/A2692 are ~60g class (different SKUs)', ar: 'Kkmoon 0.01 جرام — تطابق تام؛ A2664/A2692 فئة ~60 جرام (موديلات مختلفة)' },
            },
            {
                param: { en: 'Dimensions', ar: 'الأبعاد' },
                rated: '34×35.5×40 mm',
                measured: '34.1×35.6×40.1 mm',
                note: { en: 'Mitutoyo — within 0.1mm of Anker spec', ar: 'Mitutoyo — ضمن 0.1 ملم من مواصفة انكر' },
            },
            {
                param: { en: 'Wall efficiency / no-load draw', ar: 'كفاءة الحائط / الاستهلاك بلا حمل' },
                measured: { en: 'NOT MEASURED — no PZEM AC analyzer on this pass', ar: 'غير مقيس — بلا محلّل PZEM AC في هذه الجولة' },
                note: { en: 'Silence over invention — protocol §6.7 / §11.3', ar: 'الصمت أقوى من الاختراع — البروتوكول §6.7 / §11.3' },
            },
            {
                param: { en: 'Sample refresh (2026-07-24) · Eng. Omar Khaled', ar: 'تحديث العيّنة (2026-07-24) · م. عمر خالد' },
                measured: { en: 'Identity + PDO/PPS re-decode + Care spot-check + recall re-check on CV-CH-A121D-001 — PDOs unchanged; still NOT recalled', ar: 'هوية + إعادة فك PDO/PPS + فحص Care + فحص استدعاء على CV-CH-A121D-001 — PDO دون تغيير؛ ما زال غير مستدعى' },
                note: { en: 'Refresh ≠ full re-bench; load/thermal/phone times remain 2026-07-22 primary-day figures', ar: 'التحديث ≠ إعادة بنش كاملة؛ أرقام الحمل/الحرارة/الهاتف تبقى من يوم الحمل الأساسي 2026-07-22' },
            },
            {
                param: { en: 'Recall check (2026-07-24)', ar: 'فحص الاستدعاء (2026-07-24)' },
                measured: { en: 'A121D not listed on anker.com/product-recalls; no CPSC wall-charger hit', ar: 'A121D غير مدرج على anker.com/product-recalls؛ لا إصابة CPSC لشاحن حائط' },
                note: { en: 'Active Anker list covers power banks / cables — wall chargers outside that notice', ar: 'قائمة انكر النشطة تخص باور بانك / كابلات — شواحن الحائط خارج ذلك الإشعار' },
            },
            {
                param: { en: 'Vs A2664 Nano II — PPS / Ultra (cross-sheet)', ar: 'مقابل A2664 Nano II — PPS / Ultra (عبر الأوراق)' },
                rated: { en: 'A2664: dual PPS to 21V · Ultra 45W SFC 2.0 YES · peak 44.2W · no display', ar: 'A2664: PPS مزدوج حتى 21 فولت · Ultra 45W SFC 2.0 نعم · ذروة 44.2 واط · بلا شاشة' },
                measured: { en: 'A121D: single PPS to 11V · Ultra 45W NO · peak 44.1W · TFT+Care+180° — same 45W class, opposite Ultra outcome', ar: 'A121D: PPS واحد حتى 11 فولت · Ultra 45 واط لا · ذروة 44.1 واط · TFT+Care+180° — نفس فئة 45 واط، نتيجة Ultra معاكسة' },
                note: { en: 'Buy A121D for display/Care/flush fold; buy A2664 for Ultra 45W SFC 2.0 at ~1/3 the price', ar: 'اشترِ A121D للشاشة/Care/الطي الملاصق؛ اشترِ A2664 لـ Ultra 45W SFC 2.0 بنحو ثلث السعر' },
            },
            {
                param: { en: 'Vs A2692 Nano Pro — features (cross-sheet)', ar: 'مقابل A2692 Nano Pro — الميزات (عبر الأوراق)' },
                rated: { en: 'A2692: PPS to 11V · peak 43.8W · ~60g · no TFT/Care/180° flush', ar: 'A2692: PPS حتى 11 فولت · ذروة 43.8 واط · ~60 جرام · بلا TFT/Care/طي 180° ملاصق' },
                measured: { en: 'A121D: same PPS-to-11V Ultra limitation · peak 44.1W · 75g · display+Care+180° are the paid differentiators', ar: 'A121D: نفس قيد Ultra لـ PPS حتى 11 فولت · ذروة 44.1 واط · 75 جرام · الشاشة+Care+180° هي الفوارق المدفوعة' },
                note: { en: 'Do not pay A121D premium expecting wider PPS than A2692 — envelopes match', ar: 'لا تدفع علاوة A121D متوقعًا PPS أوسع من A2692 — الظرفان متطابقان' },
            },
        ],
        verdict: {
            en: 'A121D is a real 45W brick with TFT (±0.2W), Care Mode, and 180° flush fold: peak 44.1W, Air M2 in 1h 50m, S24 25W SFC ON. PPS stops at 11V — Ultra 45W SFC 2.0 falls back. Not A2664. Not recalled.',
            ar: 'A121D شاحن 45 واط حقيقي بشاشة TFT (±0.2 واط) ووضع Care وطي 180° ملاصق: ذروة 44.1 واط، Air M2 في ساعة و50 دقيقة، وS24 بـ 25W SFC يعمل. PPS يتوقف عند 11 فولت — Ultra 45W SFC 2.0 يرتد. ليس A2664. لا استدعاء.',
        },
        pros: [
            { en: 'TFT live readout accurate to ±0.2W vs FNB58 across fixed rails and PPS holds — ends "am I fast-charging?" guesswork', ar: 'قراءة TFT حيّة بدقة ±0.2 واط مقابل FNB58 عبر المنافذ الثابتة وتثبيتات PPS — تنهي تخمين "هل أشحن سريعاً؟"' },
            { en: 'Care Mode measured: 9V/2.2A → 5V/2.0A in ~2s after ~80% on iPhone 15 — useful overnight thermal management', ar: 'وضع Care مقاس: 9V/2.2A → 5V/2.0A خلال ~2 ث بعد ~80% على iPhone 15 — مفيد لإدارة حرارة الشحن الليلي' },
            { en: 'Unique 180° flush fold (≤0.5mm protrusion) vs A2664/A2692 ~90° — measurable win for tight Egyptian apartment sockets', ar: 'طي 180° ملاصق فريد (بروز ≤0.5 ملم) مقابل ~90° لـ A2664/A2692 — مكسب قابل للقياس لضيق فيش الشقق المصرية' },
            { en: '20V rail delivered 44.1W (19.92V/2.21A) — ~98% of 45W label; PPS 11V/4.00A held 44.0W; OCP cut >3.5A @20V in ~2s (§7.1-H)', ar: 'منفذ 20V أوصل 44.1 واط (19.92V/2.21A) — نحو 98% من ملصق 45 واط؛ PPS 11V/4.00A ثبّت 44.0 واط؛ OCP فصل >3.5A على 20V خلال ~2 ث (§7.1-H)' },
            { en: 'Samsung 25W SFC engages on S24 base (~24.6W, indicator ON); MacBook Air M2 full in 1h 50m; Switch OLED docked at 39W full-speed', ar: 'Samsung 25W SFC يعمل على S24 القاعدي (~24.6 واط، المؤشر يعمل)؛ MacBook Air M2 يمتلئ في ساعة و50 دقيقة؛ Switch OLED بالدوك عند 39 واط بأقصى سرعة' },
            { en: 'Sample refresh 2026-07-24 · Eng. Omar Khaled re-confirmed identity + single PPS APDO + NOT recalled — without inventing same-hour thermal A/B vs A2664/A2692', ar: 'تحديث عيّنة 2026-07-24 · م. عمر خالد أعاد تأكيد الهوية + APDO PPS واحد + غير مستدعى — بلا اختراع A/B حراري في نفس الساعة مقابل A2664/A2692' },
        ],
        limits: [
            { en: 'CRITICAL SKU MIX-UP RISK: A2664 Nano II (slug anker-nano-45w, ~790 EGP) also markets as Anker Nano 45W — that unit has dual PPS to 21V and NO display. Match printed A121D before trusting this sheet.', ar: 'خطر خلط موديل حرج: A2664 Nano II (slug anker-nano-45w، ~790 جنيه) يُسوَّق أيضًا كـ Anker Nano 45 واط — تلك الوحدة بـ PPS مزدوج حتى 21 فولت وبلا شاشة. طابق المطبوع A121D قبل الوثوق بهذه الورقة.' },
            { en: 'Does NOT deliver Samsung 45W Super Fast Charging 2.0 on Galaxy Ultra — PPS ceiling 11V; SFC 2.0 needs 20V PPS (samsung.com). Ultra falls back to 25W SFC (~28 min slower). Buy A2664 for Ultra full speed.', ar: 'لا يقدّم Samsung 45W Super Fast Charging 2.0 على Galaxy Ultra — سقف PPS 11 فولت؛ SFC 2.0 يحتاج PPS 20 فولت (samsung.com). الـUltra يرتد إلى 25W SFC (~28 دقيقة أبطأ). اشترِ A2664 لسرعة Ultra الكاملة.' },
            { en: 'Same PPS-to-11V Ultra limitation as A2692 — A121D premium buys display + Care + 180° flush, not a wider PPS table', ar: 'نفس قيد Ultra لـ PPS حتى 11 فولت كـ A2692 — علاوة A121D تشتري الشاشة + Care + طي 180° ملاصق، لا جدول PPS أوسع' },
            { en: 'Single USB-C only; no cable in the box — budget a 3A C-to-C (or C-to-Lightning for older iPhones)', ar: 'منفذ USB-C واحد فقط؛ بلا كابل في العلبة — احسب كابل 3A من C إلى C (أو C إلى Lightning للآيفونات الأقدم)' },
            { en: 'Not enough for MacBook Pro 16" fast-charge (needs 96W+); 20V/2.25A only trickle-charges during active use', ar: 'لا يكفي لشحن ماك بوك برو 16 بوصة سريعًا (يحتاج 96 واط+)؛ 20V/2.25A يشحنه ببطء أثناء الاستخدام النشط' },
            { en: 'Surface reached 53.2°C after 15 min at ~44W — keep ventilated; do NOT invent same-hour win/loss vs A2664 54.8°C or A2692 54.2°C', ar: 'السطح بلغ 53.2°م بعد 15 دقيقة عند ~44 واط — اترك تهوية؛ لا تخترع انتصار/خسارة في نفس الساعة مقابل 54.8°م لـ A2664 أو 54.2°م لـ A2692' },
            { en: 'ActiveShield 5.0 "24 samples/sec" is Anker-stated — we verified OCP (~2s cut), not the sampling rate itself', ar: 'ادعاء ActiveShield 5.0 بـ "24 عيّنة/ث" من انكر — تحققنا من OCP (فصل ~2 ث) لا من معدل العيّنة نفسه' },
            { en: 'iPhone stays at Apple\'s ~20W wired cap — TFT will show ~20W honestly; some buyers mistake that for a charger fault', ar: 'الآيفون يبقى عند سقف آبل السلكي ~20 واط — الشاشة ستُظهر ~20 واط بصدق؛ بعض المشترين يظنون ذلك عيب شاحن' },
            { en: '~1,900 EGP vs A2664 ~790 EGP — ~1,100 EGP premium for display + Care + 180° hinge; identical raw 45W charging without those features costs less', ar: '~1,900 جنيه مقابل A2664 ~790 جنيه — علاوة ~1,100 جنيه للشاشة + Care + مفصل 180°؛ شحن 45 واط الخام بلا هذه الميزات أرخص' },
            { en: 'Foldable US Type-A plug — not native Europlug; some recessed / Europlug-only Egyptian sockets need a rated travel adapter', ar: 'قابس US Type-A قابل للطي — ليس Europlug أصلي؛ بعض الفيش الغائرة / Europlug فقط تحتاج محوّل سفر مصنّف' },
            { en: 'Wall efficiency and no-load draw NOT measured (no PZEM) — we do not invent % figures', ar: 'كفاءة الحائط والاستهلاك بلا حمل غير مقيسين (بلا PZEM) — لا نخترع نسبًا مئوية' },
            { en: 'iPad / Pro Max times labelled est. were not physically re-timed on this sample — only Air M2, iPhone 15, S24 base, S24 Ultra, and Switch docked are physical runs', ar: 'أزمنة الآيباد / Pro Max الموسومة تقديري لم تُوقَّت فعليًا على هذه العيّنة — فقط Air M2 وiPhone 15 وS24 القاعدي وS24 Ultra وSwitch بالدوك جولات فعلية' },
            { en: 'Single unit tested (White, CV-CH-A121D-001) — production batches and other colorways may vary cosmetically; electrical figures are this sample\'s primary-day results', ar: 'وحدة واحدة مُختبرة (أبيض، CV-CH-A121D-001) — قد تختلف الدفعات والألوان تجميليًا؛ الأرقام الكهربائية خاصة بعيّنتنا في يوم الحمل الأساسي' },
        ],
    },
};
