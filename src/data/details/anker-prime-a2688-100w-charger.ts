// Lab sheet: CV-CH-A2688-001 — Wave Batch-B §7.1 elevated gold-depth (Anker Prime 100W GaN, 3-port, A2688).
// CRITICAL: 100W is a SHARED envelope — not 100W×3. Full FNB58 PDO tables per port; port-collapse honesty; no invented PZEM efficiency %.
// A/B peer in details/: anker-prime-a2669-67w-gan-charger (67W Prime). Anker 737 GaNPrime in catalog is a power bank — not a wall-charger peer.
// Elevated bar: ≥160 lines · ≥18 results · 5+5 aiTldr · heat · Egypt plug · recall 2026-07-24.
import type { ProductDetail } from './_types';

export const anker_prime_a2688_100w_charger_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker Prime 100W GaN (A2688 · sample CV-CH-A2688-001): 2× USB-C + 1× USB-A with a SHARED 100W ceiling — not 100W per port. Single top USB-C (C1) peak 98.4W on 20V/5A with a 5A E-marked cable (~98% of label).',
            'Port collapse (bench): C1 alone 98.4W · C1+C2 combined 94.2W (~65W/29W split) · all three ports 89.6W. Vendor table also warns C2+A collapses to ~24W — multi-port is NOT three simultaneous 100W rails.',
            'FNB58 (fw v1.3) on C1 and C2 alone: fixed PDOs 5V/3A · 9V/3A · 12V/3A · 15V/3A · 20V/5A + PPS APDO 3.3–21V/5A on top C. Real devices: MacBook Pro 14" M3 96.2W (Apple 96W fast-charge threshold) · Galaxy S24 Ultra 44.8W PPS · USB-A QC peak 21.8W (NOT USB-C PD).',
            'Heat / Egypt: case 58.4°C at sustained ~97W single-C and 63.2°C under full triple load (30 min, ambient 28.3°C). Sample has foldable US Type-A prongs — seats many Egyptian universal sockets; NOT Europlug / NOT BS 1363 on this unit. AC efficiency NOT measured (no PZEM).',
            'Vs A2669 67W Prime sibling: A2688 unlocks MacBook Pro 14" Apple 96W fast-charge + measured Ultra 45W-class PPS; A2669 caps 65.8W (normal Pro charge only). 737 GaNPrime in catalog is a power bank — not a wall A/B. Recall re-check 2026-07-24: NOT listed (anker.com/product-recalls + cpsc.gov).',
        ],
        ar: [
            'انكر Prime 100W GaN (A2688 · عيّنة CV-CH-A2688-001): منفذان USB-C + USB-A بسقف مشترك 100 واط — ليس 100 واط لكل منفذ. ذروة USB-C العلوي (C1) 98.4 واط على 20V/5A بكابل E-marker 5A (~98% من الملصق).',
            'انهيار المنافذ (مختبر): C1 وحده 98.4 واط · C1+C2 معًا 94.2 واط (تقسيم ~65/29) · الثلاثة 89.6 واط. جدول المصنّع يحذّر أيضًا أن C2+A ينهار إلى ~24 واط — الاستخدام المتعدد ليس ثلاث سكك 100 واط معًا.',
            'FNB58 (fw v1.3) على C1 وC2 منفردين: PDO ثابتة 5V/3A · 9V/3A · 12V/3A · 15V/3A · 20V/5A + APDO لـ PPS 3.3–21V/5A على C العلوي. أجهزة حقيقية: MacBook Pro 14" M3 96.2 واط (عتبة Apple 96 واط) · Galaxy S24 Ultra 44.8 واط PPS · ذروة USB-A QC 21.8 واط (ليس USB-C PD).',
            'حرارة / مصر: السطح 58.4°م عند ~97 واط على C واحد و63.2°م تحت الحمل الثلاثي (30 دقيقة، محيط 28.3°م). العيّنة بسنون US Type-A قابلة للطي — تدخل كثيرًا من الفيش المصرية العمومية؛ ليست Europlug / ليست BS 1363 على هذه الوحدة. كفاءة AC غير مقاسة (لا PZEM).',
            'مقابل الشقيق A2669 67 واط: A2688 يفتح شحن Apple السريع 96 واط لـ MacBook Pro 14 + PPS فئة 45 واط مقاس على Ultra؛ A2669 يتوقف عند 65.8 واط (شحن Pro طبيعي فقط). 737 GaNPrime في الكتالوج باور بانك — ليس A/B حائط. إعادة فحص استدعاء 2026-07-24: غير مدرج (anker.com/product-recalls + cpsc.gov).',
        ],
    },
    localContext: {
        en:
            'A2688 answers the Egyptian buyer question its 67W sibling A2669 cannot: "I own a MacBook Pro 14" and want Apple\'s advertised fast-charge (0→50% in ~30 min) from one wall socket that also handles a phone and tablet." ' +
            'Five RIGHT scenarios and one WRONG. (1) CAIRO/GIZA/6TH-OCTOBER VIDEO EDITOR with MacBook Pro 14" M3/M4 — Apple fast-charge needs 96W+ (apple.com/support); we measured 96.2W on C1, so a lunch-break plug-in restores ~50% in ~32 min. A2669 (65.8W) stays at normal Pro charge. ' +
            '(2) GALAXY S24/S25 ULTRA + MACBOOK OWNER — C1 PPS APDO reaches the high-voltage window our S24 Ultra used for 44.8W (20V/2.24A); Nano-class 11V PPS bricks (A2692/A121D) do not match that Ultra pull on this lab set. ' +
            '(3) MULTI-DEVICE HOME OFFICE — MacBook on C1 + iPad on C2 + phone on A: vendor three-port ceiling 89W; we measured 89.6W combined — usable, not three full-speed fast-charges. ' +
            '(4) CAIRO–ALEX / SAHEL laptop commute (Blue Bus / GO Bus seat sockets) — 0→50% in ~30 min on A2688 vs slower normal charge on A2669 over a 3-hour trip. ' +
            '(5) TWO-LAPTOP DEVELOPER — C1+C2 shared ~94.2W (~65/29) keeps work + personal machines alive from one brick. ' +
            'WRONG FOR: (6) single iPhone or single Samsung-base owner — phone caps ~20–27W / 25W; Nano II A2664 (~790 EGP) covers that job at a fraction of ~1,999 EGP. MacBook Pro 16" still wants Apple\'s 140W class for full fast-charge — A2688 gives normal-charge class only. ' +
            'HEAT: Anker lists 0–25°C operating range (Macworld: "a little restrictive"); Cairo Jul–Aug daily high ~35°C (WeatherSpark). Bench 63.2°C triple-load at 28.3°C ambient → expect hotter in a closed 35°C apartment — 20 cm airflow, never buried. ' +
            'PLUG: CV-CH-A2688-001 has foldable US Type-A / NEMA 1-15 — fits many Egyptian universal wall plates; deep-recess Europlug-only outlets may need a rated adapter. Confirm your shipment (ME variants can differ). ' +
            'ELECTRICITY: ~96W × 1 h ≈ 0.10 kWh ≈ 7–23 piastres on EgyptERA Sept-2024 tiers — under ~85 EGP/year for daily full Pro fast-charge even at top tier. ' +
            'No Anker 737 GaNPrime wall charger exists in details/ — catalog 737 is PowerCore 24K power bank; wall A/B peer is A2669.',
        ar:
            'يجيب A2688 على سؤال مصري لا يستطيعه الشقيق A2669 (67 واط): "أملك MacBook Pro 14 بوصة وأريد شحن Apple السريع المعلن (0→50% في ~30 دقيقة) من مقبس واحد يخدم هاتفًا وتابلتًا." ' +
            'خمسة سيناريوهات صحيحة وواحد خاطئ. (1) محرر فيديو القاهرة/الجيزة/أكتوبر بـ MacBook Pro 14" M3/M4 — شحن Apple السريع يحتاج 96 واط+؛ قِسنا 96.2 واط على C1 فيُعيد ~50% في ~32 دقيقة. A2669 (65.8 واط) يبقى عند الشحن الطبيعي. ' +
            '(2) مالك Galaxy Ultra + MacBook — نافذة PPS على C1 سمحت بسحب 44.8 واط على S24 Ultra (20V/2.24A)؛ شواحن Nano بسقف PPS 11V لا تطابق ذلك السحب على مجموعتنا. ' +
            '(3) مكتب منزلي متعدد الأجهزة — لابتوب على C1 + iPad على C2 + هاتف على A: سقف المصنّع الثلاثي 89 واط؛ قِسنا 89.6 واط — مفيد، وليس ثلاث شحنات سريعة كاملة. ' +
            '(4) رحلة القاهرة–إسكندرية/الساحل باللابتوب — 0→50% في ~30 دقيقة على A2688 مقابل شحن طبيعي أبطأ على A2669 خلال 3 ساعات. ' +
            '(5) مطوّر بلابتوبين — تقاسم C1+C2 ~94.2 واط (~65/29) يُبقي الجهازين من شاحن واحد. ' +
            'غير مناسب لـ: (6) مالك iPhone وحيد أو Samsung قاعدي — الهاتف يتوقف عند ~20–27 / 25 واط؛ Nano II A2664 يكفي بجزء من ~1,999 جنيه. MacBook Pro 16 بوصة ما زال يفضّل فئة 140 واط للشحن السريع الكامل. ' +
            'الحرارة: انكر تعلن 0–25°م؛ متوسط عظمى القاهرة يوليو–أغسطس ~35°م. قِسنا 63.2°م ثلاثيًا عند 28.3°م → أتوقع أسخن في شقة 35°م — 20 سم تهوية. ' +
            'القابس: العيّنة بسنون US Type-A قابلة للطي — تدخل كثيرًا من الفيش العمومية المصرية؛ المخارج الغائرة Europlug فقط قد تحتاج محوّلًا. أكّد شحنتك. ' +
            'الكهرباء: ~96 واط × ساعة ≈ 0.10 كيلوواط·ساعة ≈ 7–23 قرشًا. ' +
            'لا يوجد شاحن حائط 737 GaNPrime في details/ — 737 في الكتالوج باور بانك؛ نظير الحائط هو A2669.',
    },
    specifications: {
        'Model': {
            en: 'Anker Prime 100W GaN Wall Charger (A2688) — 3-port (2× USB-C + 1× USB-A)',
            ar: 'شاحن حائط انكر Prime 100W GaN (A2688) — 3 منافذ (منفذان USB-C + USB-A)',
        },
        'Output (critical — shared envelope)': {
            en: '100W MAX TOTAL shared — NOT 100W×3. Bench: C1 alone 98.4W · C1+C2 94.2W · C1+C2+A 89.6W. Vendor (anker.com/support): C1+C2 65W+35W · C1+A 65W+22.5W · C2+A 12W+12W (24W) · three-port 89W max',
            ar: '100 واط كحد أقصى إجمالي مشترك — ليس 100×3. مختبر: C1 وحده 98.4 · C1+C2 94.2 · الثلاثة 89.6. مصنّع: C1+C2 65+35 · C1+A 65+22.5 · C2+A 12+12 (24) · ثلاثي 89 واط',
        },
        'USB-C1 (top) PDOs — FNB58': {
            en: '5V/3A · 9V/3A · 12V/3A · 15V/3A · 20V/5A (100W — 5A E-marked cable required) · PPS APDO 3.3–21V/5A',
            ar: '5V/3A · 9V/3A · 12V/3A · 15V/3A · 20V/5A (100 واط — كابل E-marker 5A مطلوب) · PPS APDO 3.3–21V/5A',
        },
        'USB-C2 PDOs — FNB58': {
            en: 'Same fixed set when alone (5/9/12/15V·3A · 20V/5A). Single-port 100W-class peak instrumented on C1 this pass; C2 confirmed same advertisement. With C1 loaded, C2 collapses toward ~35W class (vendor 65+35 table; bench split ~65/29)',
            ar: 'نفس المجموعة الثابتة عند الانفراد. ذروة فئة 100 واط قِيست على C1 هذه المرحلة؛ C2 أكّد نفس الإعلان. مع تحميل C1 ينهار C2 نحو فئة ~35 واط (جدول 65+35؛ تقسيم مختبر ~65/29)',
        },
        'USB-A Output': {
            en: '22.5W max rated (5V/3A · 9V/2A · 10V/2.25A · 12V/1.5A) — Quick Charge / PowerIQ class, NOT USB-C PD; CairoVolt peak 21.8W',
            ar: '22.5 واط اسمي (5V/3A · 9V/2A · 10V/2.25A · 12V/1.5A) — فئة Quick Charge / PowerIQ وليس USB-C PD؛ ذروة CairoVolt 21.8 واط',
        },
        'Cable requirement': {
            en: '5A E-marked USB-C (e.g. Anker A8865) required for 20V/5A = 100W; standard 3A cable caps same port at 20V/3A = 60W (USB-PD cable limit — measured 60.2W)',
            ar: 'كابل USB-C بـ 5A وE-marker مطلوب لـ 20V/5A = 100 واط؛ كابل 3A يحدّ نفس المنفذ عند 20V/3A = 60 واط (قِسنا 60.2 واط)',
        },
        'How A2688 differs from A2669 (67W Prime)': {
            en: 'A2688: single-C 98.4W → Apple 96W fast-charge on MacBook Pro 14" + measured 44.8W Ultra PPS. A2669: single-C 65.8W → Pro normal charge only; S24 base 25.1W PPS. Same 2C+A layout; different wattage class. No 737 GaNPrime wall SKU in details/ to A/B.',
            ar: 'A2688: منفذ C 98.4 واط → شحن Apple 96 واط لـ Pro 14 + 44.8 واط PPS على Ultra. A2669: 65.8 واط → شحن Pro طبيعي فقط؛ S24 قاعدي 25.1 واط PPS. نفس تخطيط 2C+A؛ فئة قدرة مختلفة. لا SKU حائط 737 GaNPrime في details/ للمقارنة.',
        },
        'Technology': {
            en: 'GaN + Anker GaNPrime + PowerIQ 4.0 + ActiveShield 2.0 (temperature-monitoring rate = manufacturer claim; CairoVolt verified OCP trip only)',
            ar: 'GaN + Anker GaNPrime + PowerIQ 4.0 + ActiveShield 2.0 (معدل رصد الحرارة ادعاء مصنّع؛ CairoVolt تحقّقت من فصل OCP فقط)',
        },
        'Dimensions': {
            en: 'Anker lists ~43.5–44.5 × 29 × 67.8 mm — CairoVolt caliper 44.6 × 29.1 × 68.0 mm; larger than A2669 ~40 mm cube',
            ar: 'انكر ~43.5–44.5 × 29 × 67.8 ملم — قدمة CairoVolt 44.6 × 29.1 × 68.0 ملم؛ أكبر من مكعّب A2669 ~40 ملم',
        },
        'Weight': {
            en: '170g rated — CairoVolt 168g (Kkmoon 0.01g); regional prong variants may shift 5–15g',
            ar: '170 جرام اسمي — CairoVolt 168 جرامًا؛ نسخ السنون الإقليمية قد تختلف 5–15 جرامًا',
        },
        'Input / Egypt plug (sample)': {
            en: '100–240V AC 50/60Hz — tested 220V wall (UT61E). CV-CH-A2688-001: foldable US Type-A / NEMA 1-15 — many Egyptian universal sockets accept it; NOT Europlug; NOT BS 1363 on this unit',
            ar: '100–240V AC 50/60Hz — اختُبر على 220V. العيّنة: US Type-A قابل للطي — كثير من الفيش المصرية العمومية تقبله؛ ليست Europlug؛ ليست BS 1363 على هذه الوحدة',
        },
        'AC efficiency / no-load': {
            en: 'NOT MEASURED — no PZEM-004T AC-input pass; we refuse invented efficiency % (§7.1-I/J · §11.3)',
            ar: 'غير مقاس — لا مرحلة PZEM-004T؛ نرفض اختراع نسبة كفاءة (§7.1-I/J · §11.3)',
        },
        'Manufacturer operating range': {
            en: 'Anker states 0–25°C — flagged restrictive for hot climates; give 20 cm airflow in Cairo summer',
            ar: 'انكر تعلن 0–25°م — مقيد للمناخات الحارة؛ امنح 20 سم تهوية في صيف القاهرة',
        },
        'Safety / recall (2026-07-24)': {
            en: 'OCP cut >5.5A @ 20V in ~2s. NOT under recall — anker.com/product-recalls + cpsc.gov re-checked 2026-07-24 (2024–25 Anker recalls = power banks + cables only, no wall chargers). 24-month manufacturer warranty',
            ar: 'OCP فصل >5.5A على 20V خلال ~2ث. ليس تحت استدعاء — أُعيد الفحص 2026-07-24. ضمان مصنّع 24 شهرًا',
        },
        'In the Box': {
            en: 'Charger only — supply a 5A E-marked USB-C cable to unlock 100W',
            ar: 'الشاحن فقط — أحضر كابل USB-C بـ E-marker 5A لفتح 100 واط',
        },
        'Protocol': {
            en: 'CairoVolt Bench Test Protocol §7.1 (multi-port wall) + §8 physics gates + §11 red-flag checklist',
            ar: 'بروتوكول اختبار كايرو فولت §7.1 (حائط متعدد المنافذ) + بوابات §8 + قائمة أعلام §11',
        },
    },
    benchTest: {
        sku: 'A2688',
        sampleId: 'CV-CH-A2688-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit · CairoVolt lab, New Cairo · ambient 28.3°C (HTC-2) · humidity 44% · mains 220V (UT61E) · Anker A8865 USB-C 100W 5A E-marked cable for all ≥60W / 20V·5A work · primary electrical day retained; identity + PDO re-decode + recall refresh 2026-07-24',
            ar: 'وحدة واحدة من مخزون التجزئة · مختبر كايرو فولت، القاهرة الجديدة · محيط 28.3°م (HTC-2) · رطوبة 44% · جهد 220V (UT61E) · كابل Anker A8865 100W 5A لكل أعمال ≥60 واط / 20V·5A · يوم الحمل الأساسي محفوظ؛ تحديث هوية + إعادة فك PDO + استدعاء 2026-07-24',
        },
        methodology: {
            en:
                'A2688 was run under CairoVolt wall-charger protocol §7.1 (multi-port) on sample CV-CH-A2688-001 (Eng. Omar Khaled). Primary load data retained from the instrumented pass; 2026-07-24 refresh = identity re-read, FNB58 PDO re-decode on C1/C2/A, recall re-check — no invented same-hour thermal re-A/B vs A2669. ' +
                '§8 gates: every fixed PDO obeys W=V×A; single-port peak ≤ 100W label; multi-port sum must not be marketed as 100W×N; phone times ≥ Battery_Wh÷(W×~0.90) floor. ' +
                '(A) FNB58 fw v1.3 PD Info no-load on C1 then C2 — enumerated fixed PDOs 5V/3A · 9V/3A · 12V/3A · 15V/3A · 20V/5A on both C ports when alone; PPS APDO 3.3–21V/5A on top C (C1). USB-A is QC/PowerIQ — not a PD PDO table. Re-decoded unchanged 2026-07-24. ' +
                '(B–C) Fixed rails ≤35W held 2 min into JUWEI 35W. Rails above JUWEI ceiling (15V/3A=45W, 20V/5A=100W) logged with FNB58 + AVHzY CT-3 inline into MacBook Pro 14" M3 (or dual-instrument agreement ≤1.5%) — we do NOT claim JUWEI held 100W. Single-port peak = 98.4W on C1 20V/5A with A8865. Same C1 with 3A non-E-marked cable = 60.2W (cable limit). ' +
                '(D) Shared envelope / port collapse: C1+C2 both requesting high PD → 94.2W total (~65/29). C1+C2+A → 89.6W total. Vendor C2+A 12+12W collapse noted as rating honesty (not re-invented as a third simultaneous 100W). ' +
                '(E) PPS programmed holds on C1 APDO — Samsung SFC 2.0 path verified on Galaxy S24 Ultra at 20V/2.24A = 44.8W. Mid holds 8.5V/2.5A and 9.24V/2.71A class also exercised inside the APDO. ' +
                '(F) Real devices: MacBook Pro 14" M3 (70Wh) 96.2W / ~32 min to 50%; MacBook Air M2 ~44W; S24 Ultra 44.8W PPS; iPad Pro 13" M4 ~40W; iPhone 15 Pro Max phone-capped ~27W; Switch OLED docked on 15V/3A PDO. ' +
                '(G) BENETECH GM320 (ε=0.95) after 30 min: 58.4°C @ ~97W single-C; 63.2°C full triple — within §7.1 GaN 100W ≤65°C @ ~28°C ambient guidance. Cross-sheet A2669 56.8°C triple is a different SKU/day — no invented same-hour delta. ' +
                '(H) OCP: >5.5A request on 20V cut in ~2s. ' +
                '(I–J) Vampire / AC efficiency NOT measured — no PZEM-004T; refuse invented %. ' +
                '(K) Weight 168g; dims 44.6×29.1×68.0 mm. ' +
                '(L) Plug on this sample: foldable US Type-A / NEMA 1-15 — not assumed ME BS 1363. ' +
                '(M) Recall 2026-07-24: anker.com/product-recalls + cpsc.gov — A2688 not listed. ' +
                'Independent cross-refs (not our data): anker.com A2688 allocation table; apple.com/support 96W Pro 14 fast-charge; samsung.com Ultra SFC docs; MacRumors iPhone wired cap; Macworld Prime 0–25°C note. Single unit; batches/prong variants may vary.',
            ar:
                'شُغّل A2688 وفق بروتوكول شواحن الحائط §7.1 (متعدد المنافذ) على العيّنة CV-CH-A2688-001 (م. عمر خالد). بيانات الحمل الأساسية محفوظة؛ تحديث 2026-07-24 = إعادة هوية + إعادة فك PDO + فحص استدعاء — بلا A/B حراري مخترع في نفس الساعة مقابل A2669. ' +
                'بوابات §8: كل PDO ثابت يطيع W=V×A؛ ذروة المنفذ الواحد ≤ ملصق 100 واط؛ مجموع المنافذ لا يُسوَّق كـ 100×N. ' +
                '(A) FNB58 fw v1.3 بلا حمل على C1 ثم C2 — PDO ثابتة 5V/3A · 9V/3A · 12V/3A · 15V/3A · 20V/5A على منفذَي C عند الانفراد؛ APDO لـ PPS 3.3–21V/5A على C العلوي. USB-A فئة QC وليس جدول PD. أُعيد الفك دون تغيير 2026-07-24. ' +
                '(B–C) السكك ≤35 واط على JUWEI 35W لدقيقتين. فوق سقف JUWEI (15V/3A و20V/5A) عبر FNB58 + AVHzY CT-3 إلى MacBook Pro 14" — لا ندّعي أن JUWEI حمل 100 واط. ذروة المنفذ الواحد 98.4 واط على C1. بنفس المنفذ وكابل 3A = 60.2 واط. ' +
                '(D) ظرف مشترك / انهيار منافذ: C1+C2 → 94.2 واط (~65/29). الثلاثة → 89.6 واط. انهيار C2+A 12+12 واط من جدول المصنّع موثّق بصدق. ' +
                '(E) تثبيتات PPS على APDO لـ C1 — S24 Ultra 44.8 واط عند 20V/2.24A. ' +
                '(F) أجهزة حقيقية: MacBook Pro 14" 96.2 واط؛ Air ~44؛ Ultra 44.8؛ iPad Pro ~40؛ iPhone 15 PM ~27؛ Switch OLED على 15V/3A. ' +
                '(G) GM320 بعد 30 دقيقة: 58.4°م منفرد؛ 63.2°م ثلاثي. أرقام A2669 يوم/SKU مختلف — بلا فرق مخترع. ' +
                '(H) OCP: >5.5A على 20V فصل ~2ث. ' +
                '(I–J) كفاءة AC / بلا حمل غير مقاسة — لا PZEM. ' +
                '(K) 168 جرامًا؛ 44.6×29.1×68.0 ملم. ' +
                '(L) قابس العيّنة: US Type-A قابل للطي. ' +
                '(M) استدعاء 2026-07-24: غير مدرج. وحدة واحدة؛ قد تختلف الدفعات.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Per-port PD/PPS advertisement (C1, C2) + inline V·A·W on high-power rails', ar: 'إعلان PD/PPS لكل منفذ (C1، C2) + قياس V·A·W على السكك عالية القدرة' } },
            { name: 'AVHzY CT-3', use: { en: 'Second-instrument cross-check of ≥60W / 100W-class peaks (agreement ≤1.5%)', ar: 'تحقق ثانٍ لذروات ≥60 واط / فئة 100 واط (تطابق ≤1.5%)' } },
            { name: 'JUWEI 35W USB electronic load (×2)', use: { en: 'Constant-load holds on fixed PDOs ≤35W + dual-port share tests; NOT used as a 100W sink', ar: 'تكلفة ثابتة على PDO ≤35 واط + اختبارات التقاسم؛ ليس حوض 100 واط' } },
            { name: 'Anker A8865 USB-C 100W 5A E-marked cable', use: { en: 'Required to unlock 20V/5A = 100W PDO on C1', ar: 'مطلوب لفتح PDO 20V/5A = 100 واط على C1' } },
            { name: 'Apple MacBook Pro 14" M3 (70Wh)', use: { en: 'Real-device 20V/5A peak + Apple 96W fast-charge activation', ar: 'ذروة 20V/5A بجهاز حي + تفعيل شحن Apple 96 واط' } },
            { name: 'Apple MacBook Air M2 (52.6Wh)', use: { en: 'Laptop self-cap check on 20V rail', ar: 'فحص سقف اللابتوب الذاتي على سكة 20V' } },
            { name: 'Samsung Galaxy S24 Ultra (19.4Wh)', use: { en: 'PPS / 45W-class SFC 2.0 path on C1 APDO', ar: 'مسار PPS / SFC 2.0 فئة 45 واط على APDO لـ C1' } },
            { name: 'Apple iPhone 15 Pro Max (17.11Wh) · iPad Pro 13" M4 (38.99Wh)', use: { en: 'Phone/tablet real-device PD pulls', ar: 'سحب PD حقيقي لهاتف/تابلت' } },
            { name: 'Nintendo Switch OLED (docked)', use: { en: '15V/3A PDO docked-mode sanity check (~39W dock draw)', ar: 'فحص وضع الدوك على PDO 15V/3A (~39 واط)' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temp at 4 points after 30 min single-C and triple load', ar: 'حرارة السطح على 4 نقاط بعد 30 دقيقة حمل منفرد وثلاثي' } },
            { name: 'UNI-T UT61E · HTC-2 · Kkmoon 0.01g · Mitutoyo caliper', use: { en: 'Mains V · ambient · weight · dimensions', ar: 'جهد الحائط · المحيط · الوزن · الأبعاد' } },
        ],
        results: [
            {
                param: { en: 'Rated total output (shared envelope)', ar: 'الخرج الإجمالي الاسمي (ظرف مشترك)' },
                rated: '100W',
                measured: { en: 'C1 alone 98.4W · C1+C2 94.2W · C1+C2+A 89.6W', ar: 'C1 وحده 98.4 · C1+C2 94.2 · الثلاثة 89.6' },
                note: { en: 'CRITICAL: 100W is NOT available on each port at once', ar: 'حاسم: 100 واط غير متاحة على كل منفذ في آن واحد' },
            },
            {
                param: { en: 'C1 (top) PDO — 5V/3A', ar: 'C1 (علوي) PDO — 5V/3A' },
                rated: '15W',
                measured: '14.8W (5.02V/2.95A)',
                note: { en: 'JUWEI 2 min — ≥95% of rated (§7.1-B)', ar: 'JUWEI دقيقتان — ≥95% من الاسمي (§7.1-B)' },
            },
            {
                param: { en: 'C1 (top) PDO — 9V/3A', ar: 'C1 (علوي) PDO — 9V/3A' },
                rated: '27W',
                measured: '26.7W (8.96V/2.98A)',
                note: { en: 'Primary iPhone / iPad fixed PD rail', ar: 'سكة PD الثابتة الأساسية لـ iPhone / iPad' },
            },
            {
                param: { en: 'C1 (top) PDO — 12V/3A', ar: 'C1 (علوي) PDO — 12V/3A' },
                rated: '36W',
                measured: '34.9W (11.92V/2.93A)',
                note: { en: 'FNB58 enumerated 12V even though some Anker marketing tables omit it — published as measured advertisement', ar: 'FNB58 أحصى 12V رغم حذف بعض جداول تسويق انكر له — منشور كإعلان مقاس' },
            },
            {
                param: { en: 'C1 (top) PDO — 15V/3A', ar: 'C1 (علوي) PDO — 15V/3A' },
                rated: '45W',
                measured: '44.2W (14.95V/2.96A)',
                note: { en: 'Above JUWEI 35W — FNB58+CT-3 into live/high load; Switch dock rail class', ar: 'فوق JUWEI 35W — FNB58+CT-3 على حمل عالٍ؛ فئة سكة دوك السويتش' },
            },
            {
                param: { en: 'C1 (top) PDO — 20V/5A (E-marked)', ar: 'C1 (علوي) PDO — 20V/5A (E-marker)' },
                rated: '100W',
                measured: '98.4W (19.92V/4.94A)',
                note: { en: '§7.1-C single-port peak — A8865 5A cable; CT-3 cross-check', ar: '§7.1-C ذروة المنفذ الواحد — كابل A8865 5A؛ تحقق CT-3' },
            },
            {
                param: { en: 'C1 same rail WITHOUT E-marked cable (3A)', ar: 'C1 نفس السكة بلا كابل E-marker (3A)' },
                rated: '60W (USB-PD cable cap)',
                measured: '60.2W',
                note: { en: 'Cable limit, not charger fault', ar: 'قيد كابل وليس عيب شاحن' },
            },
            {
                param: { en: 'C1 PPS APDO (FNB58)', ar: 'C1 PPS APDO (FNB58)' },
                rated: '3.3–21V/5A',
                measured: { en: 'confirmed — S24 Ultra held 20V/2.24A = 44.8W; mid holds inside APDO stable ±0.1V class', ar: 'مؤكّد — S24 Ultra ثبّت 20V/2.24A = 44.8 واط؛ تثبيتات وسط APDO ثابتة فئة ±0.1V' },
                note: { en: 'Differentiator vs Nano 11V PPS ceiling (A2692/A121D)', ar: 'الفارق مقابل سقف Nano PPS 11V (A2692/A121D)' },
            },
            {
                param: { en: 'C2 PDO table (alone, FNB58)', ar: 'جدول PDO لـ C2 (منفرد، FNB58)' },
                rated: { en: 'same as C1 when alone (vendor + FNB58)', ar: 'نفس C1 عند الانفراد (مصنّع + FNB58)' },
                measured: { en: '5V/3A · 9V/3A · 12V/3A · 15V/3A · 20V/5A re-confirmed; 100W-class peak logged on C1 this pass', ar: 'أُعيد تأكيد 5/9/12/15V·3A · 20V/5A؛ ذروة فئة 100 واط سُجِّلت على C1 هذه المرحلة' },
                note: { en: 'Full per-port advertisement published; do not assume C2 stays at 100W once C1 is loaded', ar: 'إعلان كامل لكل منفذ منشور؛ لا تفترض بقاء C2 عند 100 واط بعد تحميل C1' },
            },
            {
                param: { en: 'Simultaneous C1+C2 (port collapse)', ar: 'متزامن C1+C2 (انهيار المنافذ)' },
                rated: { en: 'vendor 65W+35W = 100W', ar: 'مصنّع 65+35 = 100 واط' },
                measured: { en: '94.2W total (~65W C1 / ~29W C2)', ar: '94.2 واط إجمالي (~65 C1 / ~29 C2)' },
                note: { en: 'Honest simultaneous vs single: 94.2W combined << 98.4W+98.4W', ar: 'صدق المتزامن مقابل المنفرد: 94.2 مجتمعين << 98.4+98.4' },
            },
            {
                param: { en: 'Simultaneous C1+C2+A (triple collapse)', ar: 'متزامن C1+C2+A (انهيار ثلاثي)' },
                rated: { en: 'vendor 89W max three-port', ar: 'مصنّع 89 واط أقصى لثلاثة' },
                measured: '89.6W',
                note: { en: 'Matches vendor three-port ceiling class — still not three full-speed fast-charges', ar: 'يطابق فئة سقف الثلاثة لدى المصنّع — ما زال ليس ثلاث شحنات سريعة كاملة' },
            },
            {
                param: { en: 'USB-A peak (QC / PowerIQ)', ar: 'ذروة USB-A (QC / PowerIQ)' },
                rated: '22.5W',
                measured: '21.8W',
                note: { en: 'NOT USB-C PD — Lightning-A users get QC-class, not PD', ar: 'ليس USB-C PD — مستخدمو Lightning-A يحصلون على فئة QC لا PD' },
            },
            {
                param: { en: 'Voltage stability (fixed PD rails)', ar: 'ثبات الجهد (سكك PD الثابتة)' },
                measured: '±0.08–0.12V',
                note: { en: '2-min holds; slightly wider than 45W Nano siblings at higher current', ar: 'تثبيت دقيقتين؛ أوسع قليلًا من أشقاء Nano 45 واط عند تيار أعلى' },
            },
            {
                param: { en: 'MacBook Pro 14" M3 — Apple 96W fast-charge', ar: 'MacBook Pro 14" M3 — شحن Apple السريع 96 واط' },
                rated: { en: 'Apple 96W+ threshold', ar: 'عتبة Apple 96 واط+' },
                measured: { en: '96.2W peak · 0→50% ~32 min', ar: 'ذروة 96.2 واط · 0→50% ~32 دقيقة' },
                note: { en: 'KEY win vs A2669 (65.8W = normal Pro charge only)', ar: 'الفوز الحاسم مقابل A2669 (65.8 واط = شحن Pro طبيعي فقط)' },
            },
            {
                param: { en: 'Galaxy S24 Ultra PPS (C1)', ar: 'Galaxy S24 Ultra PPS (C1)' },
                rated: { en: 'phone 45W-class SFC 2.0', ar: 'الهاتف فئة 45 واط SFC 2.0' },
                measured: { en: '44.8W (20V/2.24A) · 0→65% ~30 min', ar: '44.8 واط (20V/2.24A) · 0→65% ~30 دقيقة' },
                note: { en: 'Measured on this sample\'s C1 APDO — not an 11V Nano fallback', ar: 'مقاس على APDO لـ C1 لهذه العيّنة — ليس ارتداد Nano 11V' },
            },
            {
                param: { en: 'MacBook Air M2 · iPad Pro 13" M4 · iPhone 15 Pro Max', ar: 'MacBook Air M2 · iPad Pro 13" M4 · iPhone 15 Pro Max' },
                measured: { en: 'Air ~44W / 1h 48m 0→100% · iPad ~40W / ~75 min · iPhone ~27W phone-capped', ar: 'Air ~44 واط / 1س 48د · iPad ~40 واط / ~75 د · iPhone ~27 واط سقف الهاتف' },
                note: { en: 'Air/iPhone do not need 100W headroom — A2669 or Nano often enough', ar: 'Air/iPhone لا يحتاجان فائض 100 واط — A2669 أو Nano غالبًا يكفيان' },
            },
            {
                param: { en: 'Case temp — single-C ~97W (30 min)', ar: 'حرارة السطح — C واحد ~97 واط (30 دقيقة)' },
                measured: '58.4°C',
                note: { en: '28.3°C ambient, GM320 ε=0.95 — hotter than A2669 single 48.6°C (different wattage/day; not same-hour A/B)', ar: 'محيط 28.3°م — أسخن من A2669 منفرد 48.6°م (قدرة/يوم مختلف؛ ليس A/B نفس الساعة)' },
            },
            {
                param: { en: 'Case temp — full triple load (30 min)', ar: 'حرارة السطح — حمل ثلاثي كامل (30 دقيقة)' },
                measured: '63.2°C',
                note: { en: 'Within §7.1 GaN 100W ≤65°C @ ~28°C ambient; expect higher in 35°C Cairo apartment', ar: 'ضمن §7.1 GaN 100W ≤65°م عند ~28°م؛ أتوقع أعلى في شقة 35°م' },
            },
            {
                param: { en: 'Over-current protection (OCP)', ar: 'حماية التيار الزائد (OCP)' },
                measured: { en: 'Cuts >5.5A @ 20V in ~2s', ar: 'يفصل >5.5A على 20V خلال ~2ث' },
                note: { en: '§7.1-H — trip ≤ 3 s', ar: '§7.1-H — فصل ≤ 3 ث' },
            },
            {
                param: { en: 'AC efficiency / no-load draw', ar: 'كفاءة AC / سحب بلا حمل' },
                measured: { en: 'not measured — no PZEM-004T on this pass', ar: 'غير مقاس — لا PZEM-004T في هذه المرحلة' },
                note: { en: '§11.3 — we do not invent efficiency %', ar: '§11.3 — لا نخترع نسبة كفاءة' },
            },
            {
                param: { en: 'Plug type (Egypt sample)', ar: 'نوع القابس (عيّنة مصر)' },
                rated: { en: 'regional variants exist', ar: 'توجد نسخ إقليمية' },
                measured: { en: 'Foldable US Type-A / NEMA 1-15 on CV-CH-A2688-001 — many Egyptian universal sockets; NOT Europlug; NOT BS 1363', ar: 'US Type-A قابل للطي على العيّنة — كثير من الفيش العمومية المصرية؛ ليست Europlug؛ ليست BS 1363' },
                note: { en: '§7.1-L honesty from the unit in hand', ar: 'صدق §7.1-L من الوحدة في اليد' },
            },
            {
                param: { en: 'Weight · dimensions', ar: 'الوزن · الأبعاد' },
                rated: '170g · ~44.5×29×67.8 mm',
                measured: '168g · 44.6×29.1×68.0 mm',
                note: { en: 'Kkmoon 0.01g + Mitutoyo — larger/heavier class than A2669 143g cube', ar: 'أكبر/أثقل فئة من مكعّب A2669 143 جرامًا' },
            },
            {
                param: { en: 'Vs A2669 67W Prime (cross-sheet)', ar: 'مقابل A2669 67 واط Prime (عبر الأوراق)' },
                rated: { en: 'A2669: single-C 65.8W · 2C 63.7W · 3-port 62.1W · S24 25.1W PPS', ar: 'A2669: C واحد 65.8 · 2C 63.7 · ثلاثي 62.1 · S24 25.1 PPS' },
                measured: { en: 'A2688: single-C 98.4W · 2C 94.2W · 3-port 89.6W · Ultra 44.8W PPS · Pro14 96.2W', ar: 'A2688: C واحد 98.4 · 2C 94.2 · ثلاثي 89.6 · Ultra 44.8 PPS · Pro14 96.2' },
                note: { en: 'Electrical A/B across sheets; no invented same-hour thermal win/loss. 737 in catalog = power bank, not wall peer', ar: 'A/B كهربائي عبر الأوراق؛ بلا فوز/خسارة حراري مخترع. 737 في الكتالوج = باور بانك وليس نظير حائط' },
            },
            {
                param: { en: 'Recall status (verified 2026-07-24)', ar: 'حالة الاستدعاء (متحققة 2026-07-24)' },
                measured: { en: 'NOT under recall', ar: 'ليس تحت استدعاء' },
                note: { en: 'anker.com/product-recalls + cpsc.gov — A2688 absent; 2024–25 recalls = banks/cables only', ar: 'anker.com/product-recalls + cpsc.gov — A2688 غائب؛ استدعاءات 2024–25 = باوربانك/كابلات فقط' },
            },
        ],
        verdict: {
            en: 'A2688 hit 98.4W on C1 alone, collapsed to 94.2W (2C) and 89.6W (3-port). Pro 14" 96.2W fast-charge and Ultra 44.8W PPS confirmed. Shell 63.2°C triple. Efficiency unmeasured. NOT recalled. Buy for Pro laptop / Ultra multi-device — not for a single phone.',
            ar: 'A2688 بلغ 98.4 واط على C1 وحده، وانهار إلى 94.2 (منفذا C) و89.6 (ثلاثة). شحن Pro 14 السريع 96.2 وUltra 44.8 PPS مؤكدان. السطح 63.2°م ثلاثيًا. الكفاءة غير مقاسة. غير مستدعى. للمتعدد/Pro/Ultra — لا لهاتف واحد.',
        },
        pros: [
            {
                en: 'Single-port honesty: 98.4W on C1 20V/5A with E-marked cable (~98% of 100W) — enough for Apple\'s 96W MacBook Pro 14" fast-charge (measured 96.2W / ~32 min to 50%)',
                ar: 'صدق المنفذ الواحد: 98.4 واط على C1 20V/5A بكابل E-marker (~98% من 100) — يكفي لشحن Apple السريع 96 واط لـ MacBook Pro 14 (96.2 واط / ~32 د إلى 50%)',
            },
            {
                en: 'Shared-envelope transparency published: 94.2W (C1+C2) and 89.6W (three-port) — matches vendor 65+35 / 89W class instead of pretending 100W×3',
                ar: 'شفافية الظرف المشترك منشورة: 94.2 (C1+C2) و89.6 (ثلاثة) — تطابق فئة المصنّع 65+35 / 89 بدل ادّعاء 100×3',
            },
            {
                en: 'Full per-port FNB58 PDO tables (C1 + C2 alone) including 12V rail present on the meter even when some marketing sheets omit it',
                ar: 'جداول PDO كاملة لكل منفذ من FNB58 (C1 + C2 منفردين) بما فيها سكة 12V الظاهرة على المقياس حتى إن حذفتها بعض أوراق التسويق',
            },
            {
                en: 'Galaxy S24 Ultra pulled 44.8W PPS on C1 APDO — the concrete reason to pick A2688 over A2669 / 11V Nano bricks when Ultra full-speed matters',
                ar: 'Galaxy S24 Ultra سحب 44.8 واط PPS على APDO لـ C1 — السبب العملي لاختيار A2688 على A2669 / Nano 11V عندما تهم سرعة Ultra',
            },
            {
                en: 'OCP tripped in ~2s at >5.5A/20V; universal 100–240V input verified at 220V Egyptian wall; NOT under recall as of 2026-07-24',
                ar: 'OCP فصل خلال ~2ث عند >5.5A/20V؛ دخل 100–240V تحقّق على حائط مصر 220V؛ ليس تحت استدعاء حتى 2026-07-24',
            },
            {
                en: 'Compact for 100W class — 168g measured, 44.6×29.1×68.0 mm; foldable US Type-A on this sample fits many Egyptian universal sockets',
                ar: 'مدمج لفئة 100 واط — 168 جرامًا، 44.6×29.1×68.0 ملم؛ سنون US قابلة للطي على هذه العيّنة تدخل كثيرًا من الفيش المصرية العمومية',
            },
        ],
        limits: [
            {
                en: 'Port collapse is real: simultaneous peaks (94.2W / 89.6W) are below single-C 98.4W — and vendor C2+A rating is only ~24W. Do not expect three full-speed laptop/phone fast-charges',
                ar: 'انهيار المنافذ حقيقي: الذروات المتزامنة (94.2 / 89.6) أقل من C الواحد 98.4 — وتصنيف المصنّع لـ C2+A نحو 24 واط فقط. لا تتوقع ثلاث شحنات سريعة كاملة',
            },
            {
                en: 'REQUIRES 5A E-marked cable for 100W — 3A cable measured 60.2W on the same C1 rail (USB-PD cable rule)',
                ar: 'يحتاج كابل E-marker 5A لـ 100 واط — كابل 3A قاس 60.2 واط على نفس سكة C1',
            },
            {
                en: 'AC efficiency and vampire draw NOT measured (no PZEM) — we publish no invented efficiency %',
                ar: 'كفاءة AC وسحب بلا حمل غير مقاسين (لا PZEM) — لا ننشر نسبة كفاءة مخترعة',
            },
            {
                en: 'Hotter than 67W A2669 under comparable multi-load stories — 63.2°C triple at 28.3°C ambient; give airflow in Cairo summer. Not a same-hour thermal contest',
                ar: 'أسخن من A2669 67 واط تحت قصص الحمل المتعدد — 63.2°م ثلاثيًا عند 28.3°م؛ امنح تهوية في صيف القاهرة. ليست مباراة حرارية في نفس الساعة',
            },
            {
                en: 'MacBook Pro 16" Apple 140W fast-charge is out of class — A2688 gives ~100W normal-charge behavior only',
                ar: 'شحن Apple السريع 140 واط لـ MacBook Pro 16 خارج الفئة — A2688 يعطي سلوك شحن طبيعي ~100 واط فقط',
            },
            {
                en: 'Over-specced for single-phone buyers — iPhone/Samsung-base caps leave most of the 100W unused; buy A2669 or Nano instead',
                ar: 'فوق المواصفة لمشتري هاتف واحد — أسقف iPhone/Samsung القاعدي تترك معظم الـ100 واط بلا استخدام؛ اشترِ A2669 أو Nano',
            },
            {
                en: 'USB-A is QC/PowerIQ only (21.8W) — not USB-C PD. Plug on this Egypt sample is foldable US Type-A, not BS 1363 — verify your unit',
                ar: 'USB-A فئة QC/PowerIQ فقط (21.8 واط) — ليس USB-C PD. قابس عيّنة مصر هذه US قابل للطي وليس BS 1363 — أكّد وحدتك',
            },
            {
                en: 'Single unit CV-CH-A2688-001 — production batches and regional prong variants may shift weight/size 5–15g; C2 alone 100W-class peak not separately re-logged beyond FNB58 advertisement match',
                ar: 'وحدة واحدة CV-CH-A2688-001 — قد تختلف الدفعات ونسخ السنون 5–15 جرامًا؛ ذروة فئة 100 واط لـ C2 منفردًا لم تُسجَّل منفصلة بما يتجاوز مطابقة إعلان FNB58',
            },
        ],
    },
};
