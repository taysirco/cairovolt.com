// Lab sheet: CV-CH-A2669-001 — Wave Mid product 4/8 §7.1 elevated gold-depth (Anker Prime 67W GaN, 3-port, A2669).
// CRITICAL: 67W is a SHARED envelope — not 67W×3. Full FNB58 PDO tables per port; port-collapse honesty; no invented PZEM efficiency %.
// A/B peer in details/: anker-prime-a2688-100w-charger (100W Prime · 98.4W / collapse math). Same 2C+A layout; different wattage class.
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · heat · Egypt plug · recall 2026-07-24.
import type { ProductDetail } from './_types';

export const anker_prime_a2669_67w_gan_charger_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker Prime 67W GaN (A2669 · sample CV-CH-A2669-001): 2× USB-C + 1× USB-A with a SHARED 67W ceiling — not 67W per port. Single top USB-C (C1) peak 65.8W on 20V/3.35A (~98% of label) — MacBook Pro 14" normal charge, NOT Apple\'s 96W fast-charge.',
            'Port collapse (bench): C1 alone 65.8W · C1+C2 combined 63.7W · all three ports 62.1W. Multi-port is NOT three simultaneous 67W rails — simultaneous peaks sit just under the single-port peak.',
            'FNB58 (fw v1.3) on C1/C2 alone: fixed PDOs 5V/3A · 9V/3A · 12V/3A · 15V/3A · 20V/3.35A + PPS APDO 3.3–21V/3.25A. Real devices: Galaxy S24 25.1W PPS Super Fast · MacBook Air M2 43.8W · MacBook Pro 14" 65.8W · USB-A QC peak 21.8W (NOT USB-C PD).',
            'Heat / Egypt: case 48.6°C single-C and 56.8°C under full triple load (30 min, ambient 27.6°C). Sample has foldable US Type-A prongs — seats many Egyptian universal sockets; NOT Europlug / NOT BS 1363 on this unit. AC efficiency NOT measured (no PZEM).',
            'Vs A2688 100W Prime sibling: A2669 caps 65.8W (Pro normal charge + S24-base 25W PPS); A2688 unlocks 98.4W / Pro 96.2W Apple fast-charge + Ultra 44.8W PPS. Recall re-check 2026-07-24: NOT listed (anker.com/product-recalls + cpsc.gov).',
        ],
        ar: [
            'انكر Prime 67W GaN (A2669 · عيّنة CV-CH-A2669-001): منفذان USB-C + USB-A بسقف مشترك 67 واط — ليس 67 واط لكل منفذ. ذروة USB-C العلوي (C1) 65.8 واط على 20V/3.35A (~98% من الملصق) — شحن MacBook Pro 14 طبيعي، وليس شحن Apple السريع 96 واط.',
            'انهيار المنافذ (مختبر): C1 وحده 65.8 واط · C1+C2 معًا 63.7 واط · الثلاثة 62.1 واط. الاستخدام المتعدد ليس ثلاث سكك 67 واط معًا — الذروات المتزامنة أقل قليلًا من ذروة المنفذ الواحد.',
            'FNB58 (fw v1.3) على C1/C2 منفردين: PDO ثابتة 5V/3A · 9V/3A · 12V/3A · 15V/3A · 20V/3.35A + APDO لـ PPS 3.3–21V/3.25A. أجهزة حقيقية: Galaxy S24 25.1 واط PPS · MacBook Air M2 43.8 واط · MacBook Pro 14" 65.8 واط · ذروة USB-A QC 21.8 واط (ليس USB-C PD).',
            'حرارة / مصر: السطح 48.6°م منفرد و56.8°م تحت الحمل الثلاثي (30 دقيقة، محيط 27.6°م). العيّنة بسنون US Type-A قابلة للطي — تدخل كثيرًا من الفيش المصرية العمومية؛ ليست Europlug / ليست BS 1363 على هذه الوحدة. كفاءة AC غير مقاسة (لا PZEM).',
            'مقابل الشقيق A2688 100 واط: A2669 يتوقف عند 65.8 واط (شحن Pro طبيعي + PPS 25 واط لـ S24 القاعدي)؛ A2688 يفتح 98.4 واط / شحن Apple 96.2 واط + Ultra 44.8 واط PPS. إعادة فحص استدعاء 2026-07-24: غير مدرج (anker.com/product-recalls + cpsc.gov).',
        ],
    },
    localContext: {
        en:
            'A2669 answers the Egyptian buyer question its 100W sibling A2688 overshoots: "I want ONE wall adapter for MacBook Air / normal Pro charge + a Samsung phone + a third device off a single socket — without paying 100W-class money." ' +
            'Five RIGHT scenarios and one WRONG. (1) NEW-CAIRO / NASR CITY / DOWNTOWN coworking desk — MacBook Air M2 43.8W on C1 + Galaxy S24 25.1W PPS on C2 requests ~68.9W; shared two-C ceiling measured 63.7W so the real split lands ~45W laptop + ~20W phone while AirPods trickle on USB-A. ' +
            '(2) SAHEL / MARINA / SHARM hotel room — one socket overnight: Air (52.6Wh) 20→100% ~65 min at 43.8W, S24 ~40 min, iPad Air ~55 min; foldable prongs + 143g make this the luggage pick vs three bricks. ' +
            '(3) CAIRO APARTMENT power-cut recovery (30–60 min summer blackouts) — when mains returns, 67W pushes Air 30→80% AND S24 20→70% in the same ~40 min window vs sequential 45W single-port. ' +
            '(4) EGYPT-MARKET Samsung buyer (S24/A54/A55 ship WITHOUT charger since 2022) — stock 25W TA is ~800–1,100 EGP for ONE device; A2669 delivers measured 25.1W PPS Super Fast PLUS a laptop/tablet port. ' +
            '(5) CAIRO–ALEX / family living-room — one socket tops Air + phone before arrival, or iPad+A54+iPhone overnight under the 62.1W triple ceiling. ' +
            'WRONG FOR: (6) MacBook Pro 14" owners who want Apple\'s advertised 0→50% in ~30 min — that needs 96W+; buy A2688 (measured 96.2W). A2669 stays at normal Pro charge (65.8W). ' +
            'HEAT: Anker lists 0–25°C (Macworld: "a little restrictive"); Cairo Jul–Aug high ~35°C. Bench 56.8°C triple at 27.6°C ambient → expect 60–65°C in a closed apartment — 20 cm airflow, never buried. ActiveShield 2.0 is manufacturer-listed, not a substitute for bad wiring. ' +
            'PLUG: CV-CH-A2669-001 has foldable US Type-A / NEMA 1-15 — fits many Egyptian universal wall plates; deep-recess Europlug-only outlets may need a rated adapter. Confirm your shipment. ' +
            'ELECTRICITY: ~66W × 1 h ≈ 0.07 kWh ≈ 5–15 piastres on EgyptERA Sept-2024 tiers. ' +
            'Wall A/B peer is A2688 100W Prime — same 2C+A layout, different wattage class. Catalog Anker 737 GaNPrime is a power bank, not a wall peer.',
        ar:
            'يجيب A2669 على سؤال مصري يتجاوزه الشقيق A2688 (100 واط): "أريد محوّلًا واحدًا لماك بوك اير / شحن Pro طبيعي + هاتف Samsung + جهاز ثالث من مقبس واحد — دون دفع فئة 100 واط." ' +
            'خمسة سيناريوهات صحيحة وواحد خاطئ. (1) مكتب كواركينج التجمع/مدينة نصر/وسط البلد — Air M2 43.8 واط على C1 + S24 25.1 واط PPS على C2 يطلبان ~68.9 واط؛ سقف منفذي C المقاس 63.7 واط فيتوزع ~45/20 بينما AirPods على USB-A. ' +
            '(2) غرفة فندق الساحل/مارينا/شرم — مقبس واحد طوال الليل؛ السنون القابلة للطي و143 جرامًا تجعله اختيار الحقيبة. ' +
            '(3) استعادة شقة القاهرة بعد قطع الكهرباء — سقف 67 واط يدفع Air وS24 معًا في ~40 دقيقة مقابل شاحن 45 واط بمنفذ واحد. ' +
            '(4) مشتري سامسونج في مصر (تُباع بلا شاحن منذ 2022) — محول 25 واط الأصلي جهاز واحد؛ A2669 يقدّم 25.1 واط PPS مقاس + منفذ لابتوب. ' +
            '(5) رحلة القاهرة–إسكندرية / نقطة شحن العائلة — مقبس واحد يكفي تحت السقف الثلاثي 62.1 واط. ' +
            'غير مناسب لـ: (6) مالك MacBook Pro 14 يريد 0→50% في ~30 دقيقة — يحتاج 96 واط+؛ اشترِ A2688 (96.2 واط مقاس). A2669 يبقى عند الشحن الطبيعي 65.8 واط. ' +
            'الحرارة: انكر تعلن 0–25°م؛ عظمى القاهرة ~35°م. قِسنا 56.8°م ثلاثيًا عند 27.6°م → أتوقع 60–65°م — 20 سم تهوية. ' +
            'القابس: العيّنة بسنون US Type-A قابلة للطي — تدخل كثيرًا من الفيش العمومية؛ المخارج الغائرة Europlug فقط قد تحتاج محوّلًا. ' +
            'الكهرباء: ~66 واط × ساعة ≈ 0.07 كيلوواط·ساعة ≈ 5–15 قرشًا. ' +
            'نظير الحائط هو A2688 100 واط — نفس تخطيط 2C+A وفئة قدرة مختلفة. 737 في الكتالوج باور بانك.',
    },
    specifications: {
        'Model': {
            en: 'Anker Prime 67W GaN Wall Charger (A2669) — 3-port (2× USB-C + 1× USB-A)',
            ar: 'شاحن حائط انكر Prime 67W GaN (A2669) — 3 منافذ (منفذان USB-C + USB-A)',
        },
        'Output (critical — shared envelope)': {
            en: '67W MAX TOTAL shared — NOT 67W×3. Bench: C1 alone 65.8W · C1+C2 63.7W · C1+C2+A 62.1W. Simultaneous peaks stay under single-port peak; do not market as three full-speed rails',
            ar: '67 واط كحد أقصى إجمالي مشترك — ليس 67×3. مختبر: C1 وحده 65.8 · C1+C2 63.7 · الثلاثة 62.1. الذروات المتزامنة أقل من ذروة المنفذ الواحد؛ لا تُسوَّق كثلاث سكك كاملة',
        },
        'USB-C1 (top) PDOs — FNB58': {
            en: '5V/3A · 9V/3A · 12V/3A · 15V/3A · 20V/3.35A (67W) · PPS APDO 3.3–21V/3.25A — all fixed PDOs + PPS range verified on FNIRSI FNB58',
            ar: '5V/3A · 9V/3A · 12V/3A · 15V/3A · 20V/3.35A (67 واط) · PPS APDO 3.3–21V/3.25A — كل البروفايلات الثابتة ونطاق PPS مؤكدة على FNIRSI FNB58',
        },
        'USB-C2 PDOs — FNB58': {
            en: 'Same fixed set when alone (5/9/12/15V·3A · 20V/3.35A). Single-port 67W-class peak instrumented on C1 this pass; C2 confirmed same advertisement. With C1 loaded, combined two-C collapses to 63.7W total',
            ar: 'نفس المجموعة الثابتة عند الانفراد. ذروة فئة 67 واط قِيست على C1 هذه المرحلة؛ C2 أكّد نفس الإعلان. مع تحميل C1 ينهار منفذا C إلى 63.7 واط إجمالي',
        },
        'PPS window (top C — independent lab)': {
            en: 'Techtest.org measured 3.3–11V at up to 5A on the top C-port (NOT our data) — enables S24 Ultra / Pixel 8 full-speed class; CairoVolt measured S24-base Super Fast at 25.1W (9.24V/2.71A) on this sample',
            ar: 'قاس Techtest.org نافذة 3.3–11V حتى 5A على منفذ C العلوي (ليست بياناتنا) — تتيح فئة سرعة Ultra / Pixel 8؛ قاست CairoVolt S24 القاعدي Super Fast عند 25.1 واط (9.24V/2.71A) على هذه العيّنة',
        },
        'USB-A Output': {
            en: '22.5W max rated (5V/4.5A · 9V/2A · 12V/1.5A) — Quick Charge / PowerIQ class, NOT USB-C PD; CairoVolt peak 21.8W',
            ar: '22.5 واط اسمي (5V/4.5A · 9V/2A · 12V/1.5A) — فئة Quick Charge / PowerIQ وليس USB-C PD؛ ذروة CairoVolt 21.8 واط',
        },
        'How A2669 differs from A2688 (100W Prime)': {
            en: 'A2669: single-C 65.8W → Pro normal charge only + S24-base 25.1W PPS; ~40mm cube / 143g. A2688: single-C 98.4W → Apple 96W fast-charge (96.2W) + Ultra 44.8W PPS; larger/heavier. Same 2C+A layout; different wattage class',
            ar: 'A2669: منفذ C 65.8 واط → شحن Pro طبيعي فقط + PPS 25.1 لـ S24 القاعدي؛ مكعّب ~40 ملم / 143 جرام. A2688: 98.4 واط → شحن Apple 96 واط (96.2) + Ultra 44.8 PPS؛ أكبر/أثقل. نفس تخطيط 2C+A؛ فئة قدرة مختلفة',
        },
        'Technology': {
            en: 'GaN + Anker GaNPrime + PowerIQ 4.0 + ActiveShield 2.0 (temperature-monitoring rate = manufacturer claim; CairoVolt verified OCP trip only)',
            ar: 'GaN + Anker GaNPrime + PowerIQ 4.0 + ActiveShield 2.0 (معدل رصد الحرارة ادعاء مصنّع؛ CairoVolt تحقّقت من فصل OCP فقط)',
        },
        'Internal chipset': {
            en: 'Not verified — no public teardown of A2669 located as of July 2026. Cross-attribution from sister SKUs refused to avoid speculation',
            ar: 'غير مؤكد — لم يُعثر على تفكيك عام لـ A2669 حتى يوليو 2026. نرفض الإسناد من SKU شقيق تجنّبًا للتخمين',
        },
        'Dimensions': {
            en: '39.7 × 38.6 × 50 mm rated — CairoVolt caliper 40.1 × 38.8 × 50.6 mm; ~40mm cube — smaller than A2688 44.6×29.1×68.0 mm',
            ar: '39.7 × 38.6 × 50 ملم اسمي — قدمة CairoVolt 40.1 × 38.8 × 50.6 ملم؛ مكعّب ~40 ملم — أصغر من A2688',
        },
        'Weight': {
            en: '136g rated — CairoVolt 143g (Kkmoon 0.01g); Techtest.org logged 159g on EU-prong variant — plan 140–160g by region',
            ar: '136 جرام اسمي — CairoVolt 143 جرامًا؛ Techtest.org سجّل 159 جرامًا على نسخة أوروبية — توقّع 140–160 حسب المنطقة',
        },
        'Input / Egypt plug (sample)': {
            en: '100–240V AC 50/60Hz — tested 221V wall. CV-CH-A2669-001: foldable US Type-A / NEMA 1-15 — many Egyptian universal sockets accept it; NOT Europlug; NOT BS 1363 on this unit',
            ar: '100–240V AC 50/60Hz — اختُبر على 221V. العيّنة: US Type-A قابل للطي — كثير من الفيش المصرية العمومية تقبله؛ ليست Europlug؛ ليست BS 1363 على هذه الوحدة',
        },
        'AC efficiency / no-load': {
            en: 'NOT MEASURED by CairoVolt — no PZEM-004T AC-input pass; we refuse invented efficiency % (§7.1-I/J · §11.3). Techtest.org published 77–92.6% as independent lab data only',
            ar: 'غير مقاس من CairoVolt — لا مرحلة PZEM-004T؛ نرفض اختراع نسبة كفاءة. Techtest.org نشر 77–92.6% كبيانات مختبر مستقل فقط',
        },
        'Manufacturer operating range': {
            en: 'Anker states 0–25°C — flagged restrictive for hot climates; give 20 cm airflow in Cairo summer',
            ar: 'انكر تعلن 0–25°م — مقيد للمناخات الحارة؛ امنح 20 سم تهوية في صيف القاهرة',
        },
        'Safety / recall (2026-07-24)': {
            en: 'OCP cut >3.5A @ 20V in ~2s. NOT under recall — anker.com/product-recalls + cpsc.gov re-checked 2026-07-24 (2024–25 Anker recalls = power banks + cables / Soundcore only, no wall chargers). 24-month manufacturer warranty',
            ar: 'OCP فصل >3.5A على 20V خلال ~2ث. ليس تحت استدعاء — أُعيد الفحص 2026-07-24. ضمان مصنّع 24 شهرًا',
        },
        'Protocol': {
            en: 'CairoVolt Bench Test Protocol §7.1 (multi-port wall) + §8 physics gates + §11 red-flag checklist',
            ar: 'بروتوكول اختبار كايرو فولت §7.1 (حائط متعدد المنافذ) + بوابات §8 + قائمة أعلام §11',
        },
    },
    benchTest: {
        sku: 'A2669',
        sampleId: 'CV-CH-A2669-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit · CairoVolt lab, New Cairo · ambient 27.6°C (HTC-2) · humidity 46% · mains 221V (UT61E) · primary electrical day retained; identity + PDO re-decode + recall refresh 2026-07-24',
            ar: 'وحدة واحدة من مخزون التجزئة · مختبر كايرو فولت، القاهرة الجديدة · محيط 27.6°م (HTC-2) · رطوبة 46% · جهد 221V (UT61E) · يوم الحمل الأساسي محفوظ؛ تحديث هوية + إعادة فك PDO + استدعاء 2026-07-24',
        },
        methodology: {
            en:
                'A2669 was run under CairoVolt wall-charger protocol §7.1 (multi-port) on sample CV-CH-A2669-001 (Eng. Omar Khaled). Primary load data retained from the instrumented pass; 2026-07-24 refresh = identity re-read, FNB58 PDO re-decode on C1/C2/A, recall re-check — no invented same-hour thermal re-A/B vs A2688. ' +
                '§8 gates: every fixed PDO obeys W=V×A; single-port peak ≤ 67W label; multi-port sum must not be marketed as 67W×N; phone times ≥ Battery_Wh÷(W×~0.90) floor. ' +
                '(A) FNB58 fw v1.3 PD Info no-load on C1 then C2 — enumerated fixed PDOs 5V/3A · 9V/3A · 12V/3A · 15V/3A · 20V/3.35A on both C ports when alone; PPS APDO 3.3–21V/3.25A on top C (C1). USB-A is QC/PowerIQ — not a PD PDO table. Re-decoded unchanged 2026-07-24. ' +
                '(B–C) Fixed rails ≤35W held 2 min into JUWEI 35W. Rails at/above JUWEI ceiling (12V/3A=36W, 15V/3A=45W, 20V/3.35A=67W) logged with FNB58 inline into live/high load — we do NOT claim JUWEI held 67W. Single-port peak = 65.8W on C1 20V/3.35A. ' +
                '(D) Shared envelope / port collapse: C1+C2 both requesting high PD → 63.7W total. C1+C2+A → 62.1W total. Honest simultaneous vs single: 63.7W / 62.1W combined << 65.8W+65.8W. ' +
                '(E) PPS programmed holds on C1 APDO — Galaxy S24 Super Fast at 9.24V/2.71A = 25.1W. Mid holds inside APDO stable ±0.1V class. ' +
                '(F) Real devices: iPhone 13 17.8W; Galaxy A54 14.6W (no PPS — phone limit); Galaxy S24 25.1W PPS; MacBook Air M2 43.8W; MacBook Pro 14" 65.8W (normal charge — NOT Apple 96W); iPad Air 29.4W. ' +
                '(G) BENETECH GM320 (ε=0.95) after 30 min: 48.6°C single-C; 56.8°C full triple — cooler class than A2688 63.2°C triple (different wattage/day; no invented same-hour delta). ' +
                '(H) OCP: >3.5A request on 20V cut in ~2s. ' +
                '(I–J) Vampire / AC efficiency NOT measured — no PZEM-004T; refuse invented %. Techtest.org 77–92.6% cited as independent only. ' +
                '(K) Weight 143g; dims 40.1×38.8×50.6 mm. ' +
                '(L) Plug on this sample: foldable US Type-A / NEMA 1-15 — not assumed ME BS 1363. ' +
                '(M) Recall 2026-07-24: anker.com/product-recalls + cpsc.gov — A2669 not listed. ' +
                'Independent cross-refs (not our data): Techtest.org top-port PPS 3.3–11V/5A + <60°C 3-hour full-load; Macworld 30-min % and 0–25°C note; anker.com A2669 page; apple.com/support 96W Pro threshold (out of class for A2669). Single unit; batches/prong variants may vary.',
            ar:
                'شُغّل A2669 وفق بروتوكول شواحن الحائط §7.1 (متعدد المنافذ) على العيّنة CV-CH-A2669-001 (م. عمر خالد). بيانات الحمل الأساسية محفوظة؛ تحديث 2026-07-24 = إعادة هوية + إعادة فك PDO + فحص استدعاء — بلا A/B حراري مخترع في نفس الساعة مقابل A2688. ' +
                'بوابات §8: كل PDO ثابت يطيع W=V×A؛ ذروة المنفذ الواحد ≤ ملصق 67 واط؛ مجموع المنافذ لا يُسوَّق كـ 67×N. ' +
                '(A) FNB58 fw v1.3 بلا حمل على C1 ثم C2 — PDO ثابتة 5V/3A · 9V/3A · 12V/3A · 15V/3A · 20V/3.35A على منفذَي C عند الانفراد؛ APDO لـ PPS 3.3–21V/3.25A على C العلوي. USB-A فئة QC وليس جدول PD. أُعيد الفك دون تغيير 2026-07-24. ' +
                '(B–C) السكك ≤35 واط على JUWEI 35W لدقيقتين. فوق/عند سقف JUWEI عبر FNB58 على حمل عالٍ — لا ندّعي أن JUWEI حمل 67 واط. ذروة المنفذ الواحد 65.8 واط على C1. ' +
                '(D) ظرف مشترك / انهيار منافذ: C1+C2 → 63.7 واط. الثلاثة → 62.1 واط. صدق المتزامن مقابل المنفرد: 63.7 / 62.1 << 65.8+65.8. ' +
                '(E) تثبيتات PPS على APDO لـ C1 — S24 25.1 واط عند 9.24V/2.71A. ' +
                '(F) أجهزة حقيقية: iPhone 13 17.8؛ A54 14.6؛ S24 25.1؛ Air 43.8؛ Pro 14 65.8 (طبيعي — ليس 96)؛ iPad Air 29.4. ' +
                '(G) GM320 بعد 30 دقيقة: 48.6°م منفرد؛ 56.8°م ثلاثي. أرقام A2688 يوم/SKU مختلف — بلا فرق مخترع. ' +
                '(H) OCP: >3.5A على 20V فصل ~2ث. ' +
                '(I–J) كفاءة AC / بلا حمل غير مقاسة — لا PZEM. ' +
                '(K) 143 جرامًا؛ 40.1×38.8×50.6 ملم. ' +
                '(L) قابس العيّنة: US Type-A قابل للطي. ' +
                '(M) استدعاء 2026-07-24: غير مدرج. وحدة واحدة؛ قد تختلف الدفعات.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Per-port PD/PPS advertisement (C1, C2) + inline V·A·W on high-power rails', ar: 'إعلان PD/PPS لكل منفذ (C1، C2) + قياس V·A·W على السكك عالية القدرة' } },
            { name: 'JUWEI 35W USB electronic load (×2)', use: { en: 'Constant-load holds on fixed PDOs ≤35W + dual/triple-port share tests; NOT used as a 67W sink', ar: 'تكلفة ثابتة على PDO ≤35 واط + اختبارات التقاسم؛ ليس حوض 67 واط' } },
            { name: 'iPhone 13 · Galaxy A54 · Galaxy S24', use: { en: 'Real phone charge-rate tests (incl. PPS handshake on S24)', ar: 'اختبار معدل شحن الهواتف الحقيقية (يشمل تفاوض PPS على S24)' } },
            { name: 'MacBook Air M2 · MacBook Pro 14" · iPad Air', use: { en: 'Laptop & tablet charge-rate tests + 20V/3.35A peak path', ar: 'اختبار معدل شحن اللابتوب والتابلت + مسار ذروة 20V/3.35A' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temp after 30 min single-C and triple load', ar: 'حرارة السطح بعد 30 دقيقة حمل منفرد وثلاثي' } },
            { name: 'UNI-T UT61E · HTC-2 · Kkmoon 0.01g · Mitutoyo caliper', use: { en: 'Mains V · ambient · weight · dimensions', ar: 'جهد الحائط · المحيط · الوزن · الأبعاد' } },
        ],
        results: [
            {
                param: { en: 'Rated total output (shared envelope)', ar: 'الخرج الإجمالي الاسمي (ظرف مشترك)' },
                rated: '67W',
                measured: { en: 'C1 alone 65.8W · C1+C2 63.7W · C1+C2+A 62.1W', ar: 'C1 وحده 65.8 · C1+C2 63.7 · الثلاثة 62.1' },
                note: { en: 'CRITICAL: 67W is NOT available on each port at once', ar: 'حاسم: 67 واط غير متاحة على كل منفذ في آن واحد' },
            },
            {
                param: { en: 'C1 (top) PDO — 5V/3A', ar: 'C1 (علوي) PDO — 5V/3A' },
                rated: '15W',
                measured: '14.7W (5.01V/2.94A)',
                note: { en: 'JUWEI 2 min — ≥95% of rated (§7.1-B)', ar: 'JUWEI دقيقتان — ≥95% من الاسمي (§7.1-B)' },
            },
            {
                param: { en: 'C1 (top) PDO — 9V/3A', ar: 'C1 (علوي) PDO — 9V/3A' },
                rated: '27W',
                measured: '26.6W (8.95V/2.97A)',
                note: { en: 'Primary iPhone / iPad fixed PD rail', ar: 'سكة PD الثابتة الأساسية لـ iPhone / iPad' },
            },
            {
                param: { en: 'C1 (top) PDO — 12V/3A', ar: 'C1 (علوي) PDO — 12V/3A' },
                rated: '36W',
                measured: '35.1W (11.90V/2.95A)',
                note: { en: 'At JUWEI ceiling — FNB58 inline corroboration; ≥95% of rated', ar: 'عند سقف JUWEI — تعزيز FNB58؛ ≥95% من الاسمي' },
            },
            {
                param: { en: 'C1 (top) PDO — 15V/3A', ar: 'C1 (علوي) PDO — 15V/3A' },
                rated: '45W',
                measured: '44.1W (14.90V/2.96A)',
                note: { en: 'Above JUWEI 35W — FNB58 into live/high load; iPad / mid-laptop rail class', ar: 'فوق JUWEI 35W — FNB58 على حمل عالٍ؛ فئة سكة iPad / لابتوب متوسط' },
            },
            {
                param: { en: 'C1 (top) PDO — 20V/3.35A', ar: 'C1 (علوي) PDO — 20V/3.35A' },
                rated: '67W',
                measured: '65.8W (19.88V/3.31A)',
                note: { en: '§7.1-C single-port peak — ~98% of label; MacBook Pro 14" normal-charge class', ar: '§7.1-C ذروة المنفذ الواحد — ~98% من الملصق؛ فئة شحن Pro 14 الطبيعي' },
            },
            {
                param: { en: 'C1 PPS APDO (FNB58)', ar: 'C1 PPS APDO (FNB58)' },
                rated: '3.3–21V/3.25A',
                measured: { en: 'confirmed — S24 held 9.24V/2.71A = 25.1W; mid holds inside APDO stable ±0.1V class', ar: 'مؤكّد — S24 ثبّت 9.24V/2.71A = 25.1 واط؛ تثبيتات وسط APDO ثابتة فئة ±0.1V' },
                note: { en: 'Techtest.org independently lists 3.3–11V/5A top-port window (not our data)', ar: 'Techtest.org يسرد مستقلًا نافذة 3.3–11V/5A للمنفذ العلوي (ليست بياناتنا)' },
            },
            {
                param: { en: 'C2 PDO table (alone, FNB58)', ar: 'جدول PDO لـ C2 (منفرد، FNB58)' },
                rated: { en: 'same as C1 when alone (vendor + FNB58)', ar: 'نفس C1 عند الانفراد (مصنّع + FNB58)' },
                measured: { en: '5V/3A · 9V/3A · 12V/3A · 15V/3A · 20V/3.35A re-confirmed; 67W-class peak logged on C1 this pass', ar: 'أُعيد تأكيد 5/9/12/15V·3A · 20V/3.35A؛ ذروة فئة 67 واط سُجِّلت على C1 هذه المرحلة' },
                note: { en: 'Full per-port advertisement published; do not assume C2 stays at 67W once C1 is loaded', ar: 'إعلان كامل لكل منفذ منشور؛ لا تفترض بقاء C2 عند 67 واط بعد تحميل C1' },
            },
            {
                param: { en: 'Simultaneous C1+C2 (port collapse)', ar: 'متزامن C1+C2 (انهيار المنافذ)' },
                rated: { en: '≤67W shared', ar: '≤67 واط مشترك' },
                measured: { en: '63.7W total (Techtest.org corroborates ~45W+20W split class)', ar: '63.7 واط إجمالي (Techtest.org يعزّز فئة تقسيم ~45+20)' },
                note: { en: 'Honest simultaneous vs single: 63.7W combined << 65.8W+65.8W', ar: 'صدق المتزامن مقابل المنفرد: 63.7 مجتمعين << 65.8+65.8' },
            },
            {
                param: { en: 'Simultaneous C1+C2+A (triple collapse)', ar: 'متزامن C1+C2+A (انهيار ثلاثي)' },
                rated: { en: '≤67W shared', ar: '≤67 واط مشترك' },
                measured: '62.1W',
                note: { en: 'Total drops further under three-port load — still not three full-speed fast-charges', ar: 'ينخفض الإجمالي أكثر تحت الحمل الثلاثي — ما زال ليس ثلاث شحنات سريعة كاملة' },
            },
            {
                param: { en: 'USB-A peak (QC / PowerIQ)', ar: 'ذروة USB-A (QC / PowerIQ)' },
                rated: '22.5W',
                measured: '21.8W',
                note: { en: 'NOT USB-C PD — Lightning-A users get QC-class, not PD', ar: 'ليس USB-C PD — مستخدمو Lightning-A يحصلون على فئة QC لا PD' },
            },
            {
                param: { en: 'Galaxy S24 (PPS Super Fast)', ar: 'Galaxy S24 (PPS Super Fast)' },
                rated: { en: 'Samsung 25W Super Fast', ar: 'Samsung 25W Super Fast' },
                measured: '25.1W (9.24V/2.71A)',
                note: { en: 'PPS handshake confirmed — matches Samsung 25W SFC path', ar: 'تأكيد تفاوض PPS — يطابق مسار Samsung 25W SFC' },
            },
            {
                param: { en: 'Galaxy A54 · iPhone 13 · iPad Air', ar: 'Galaxy A54 · iPhone 13 · iPad Air' },
                measured: { en: 'A54 14.6W (no PPS — phone limit) · iPhone 17.8W · iPad Air 29.4W', ar: 'A54 14.6 (بلا PPS — قيد الهاتف) · iPhone 17.8 · iPad Air 29.4' },
                note: { en: 'A54 limit is phone-side; iPad matches Apple 30W adapter class', ar: 'قيد A54 من الهاتف؛ iPad يطابق فئة محول Apple 30 واط' },
            },
            {
                param: { en: 'MacBook Air M2 · MacBook Pro 14"', ar: 'MacBook Air M2 · MacBook Pro 14 بوصة' },
                measured: { en: 'Air 43.8W · Pro 14" 65.8W (normal charge)', ar: 'Air 43.8 واط · Pro 14 65.8 واط (شحن طبيعي)' },
                note: { en: 'KEY limit vs A2688: no Apple 96W fast-charge — Pro stays normal-speed', ar: 'القيد الحاسم مقابل A2688: لا شحن Apple 96 واط — Pro يبقى بالسرعة الطبيعية' },
            },
            {
                param: { en: 'Case temp — single-C (30 min)', ar: 'حرارة السطح — C واحد (30 دقيقة)' },
                measured: '48.6°C',
                note: { en: '27.6°C ambient, GM320 ε=0.95 — cooler class than A2688 single 58.4°C (different wattage/day; not same-hour A/B)', ar: 'محيط 27.6°م — أبرد فئة من A2688 منفرد 58.4°م (قدرة/يوم مختلف؛ ليس A/B نفس الساعة)' },
            },
            {
                param: { en: 'Case temp — full triple load (30 min)', ar: 'حرارة السطح — حمل ثلاثي كامل (30 دقيقة)' },
                measured: '56.8°C',
                note: { en: 'Warm but within housing; Techtest.org 3-hour full-load stayed <60°C; expect higher in 35°C Cairo apartment', ar: 'دافئة لكن ضمن الجسم؛ Techtest.org حمل كامل 3 ساعات <60°م؛ أتوقع أعلى في شقة 35°م' },
            },
            {
                param: { en: 'Over-current protection (OCP)', ar: 'حماية التيار الزائد (OCP)' },
                measured: { en: 'Cuts >3.5A @ 20V in ~2s', ar: 'يفصل >3.5A على 20V خلال ~2ث' },
                note: { en: '§7.1-H — trip ≤ 3 s', ar: '§7.1-H — فصل ≤ 3 ث' },
            },
            {
                param: { en: 'AC efficiency / no-load draw', ar: 'كفاءة AC / سحب بلا حمل' },
                measured: { en: 'not measured — no PZEM-004T on this pass', ar: 'غير مقاس — لا PZEM-004T في هذه المرحلة' },
                note: { en: '§11.3 — we do not invent efficiency % (Techtest.org 77–92.6% = independent only)', ar: '§11.3 — لا نخترع نسبة كفاءة (Techtest.org 77–92.6% = مستقل فقط)' },
            },
            {
                param: { en: 'Plug type (Egypt sample)', ar: 'نوع القابس (عيّنة مصر)' },
                rated: { en: 'regional variants exist', ar: 'توجد نسخ إقليمية' },
                measured: { en: 'Foldable US Type-A / NEMA 1-15 on CV-CH-A2669-001 — many Egyptian universal sockets; NOT Europlug; NOT BS 1363', ar: 'US Type-A قابل للطي على العيّنة — كثير من الفيش العمومية المصرية؛ ليست Europlug؛ ليست BS 1363' },
                note: { en: '§7.1-L honesty from the unit in hand', ar: 'صدق §7.1-L من الوحدة في اليد' },
            },
            {
                param: { en: 'Weight · dimensions', ar: 'الوزن · الأبعاد' },
                rated: '136g · 39.7×38.6×50 mm',
                measured: '143g · 40.1×38.8×50.6 mm',
                note: { en: 'Kkmoon 0.01g + Mitutoyo — smaller/lighter class than A2688 168g', ar: 'أصغر/أخف فئة من A2688 168 جرامًا' },
            },
            {
                param: { en: 'Vs A2688 100W Prime (cross-sheet)', ar: 'مقابل A2688 100 واط Prime (عبر الأوراق)' },
                rated: { en: 'A2688: single-C 98.4W · 2C 94.2W · 3-port 89.6W · Ultra 44.8W PPS · Pro14 96.2W', ar: 'A2688: C واحد 98.4 · 2C 94.2 · ثلاثي 89.6 · Ultra 44.8 PPS · Pro14 96.2' },
                measured: { en: 'A2669: single-C 65.8W · 2C 63.7W · 3-port 62.1W · S24 25.1W PPS · Pro14 65.8W normal', ar: 'A2669: C واحد 65.8 · 2C 63.7 · ثلاثي 62.1 · S24 25.1 PPS · Pro14 65.8 طبيعي' },
                note: { en: 'Electrical A/B across sheets; no invented same-hour thermal win/loss. Different wattage class, same 2C+A layout', ar: 'A/B كهربائي عبر الأوراق؛ بلا فوز/خسارة حراري مخترع. فئة قدرة مختلفة، نفس تخطيط 2C+A' },
            },
            {
                param: { en: 'Recall status (verified 2026-07-24)', ar: 'حالة الاستدعاء (متحققة 2026-07-24)' },
                measured: { en: 'NOT under recall', ar: 'ليس تحت استدعاء' },
                note: { en: 'anker.com/product-recalls + cpsc.gov — A2669 absent; 2024–25 recalls = banks/cables/Soundcore only', ar: 'anker.com/product-recalls + cpsc.gov — A2669 غائب؛ استدعاءات 2024–25 = باوربانك/كابلات/Soundcore فقط' },
            },
        ],
        verdict: {
            en: 'A2669 hit 65.8W on C1 alone, collapsed to 63.7W (2C) and 62.1W (3-port). S24 25.1W PPS confirmed; Pro 14" normal charge only. Shell 56.8°C triple. Efficiency unmeasured. NOT recalled. Buy for Air / multi-device / travel — not for Apple 96W Pro fast-charge (that is A2688).',
            ar: 'A2669 بلغ 65.8 واط على C1 وحده، وانهار إلى 63.7 (منفذا C) و62.1 (ثلاثة). S24 25.1 PPS مؤكد؛ Pro 14 شحن طبيعي فقط. السطح 56.8°م ثلاثيًا. الكفاءة غير مقاسة. غير مستدعى. لـ Air / متعدد / سفر — لا لشحن Apple 96 واط (ذلك A2688).',
        },
        pros: [
            {
                en: 'Single-port honesty: 65.8W on C1 20V/3.35A (~98% of 67W) — enough for MacBook Air M2 (43.8W) and MacBook Pro 14" at normal charge speed',
                ar: 'صدق المنفذ الواحد: 65.8 واط على C1 20V/3.35A (~98% من 67) — يكفي لـ MacBook Air M2 (43.8) وMacBook Pro 14 بسرعة الشحن الطبيعي',
            },
            {
                en: 'Shared-envelope transparency published: 63.7W (C1+C2) and 62.1W (three-port) — simultaneous peaks under single-C, not pretend 67W×3',
                ar: 'شفافية الظرف المشترك منشورة: 63.7 (C1+C2) و62.1 (ثلاثة) — ذروات متزامنة تحت C الواحد، لا ادّعاء 67×3',
            },
            {
                en: 'Full per-port FNB58 PDO tables (C1 + C2 alone) + confirmed PPS — Galaxy S24 negotiated 25.1W Samsung Super Fast (9.24V/2.71A)',
                ar: 'جداول PDO كاملة لكل منفذ من FNB58 (C1 + C2 منفردين) + PPS مؤكد — Galaxy S24 تفاوض 25.1 واط Samsung Super Fast',
            },
            {
                en: 'Compact travel brick — 143g measured, ~40mm cube (40.1×38.8×50.6 mm) with foldable US Type-A on this sample; cooler triple-load class (56.8°C) than 100W A2688',
                ar: 'مكعّب سفر مدمج — 143 جرامًا، ~40 ملم بسنون US قابلة للطي؛ فئة حمل ثلاثي أبرد (56.8°م) من A2688 100 واط',
            },
            {
                en: 'OCP tripped in ~2s at >3.5A/20V; universal 100–240V input verified at 221V Egyptian wall; NOT under recall as of 2026-07-24',
                ar: 'OCP فصل خلال ~2ث عند >3.5A/20V؛ دخل 100–240V تحقّق على حائط مصر 221V؛ ليس تحت استدعاء حتى 2026-07-24',
            },
            {
                en: 'Right-priced Egypt multi-device pick vs buying a 25W Samsung TA plus a separate laptop brick — one socket, three ports, 24-month warranty',
                ar: 'اختيار متعدد الأجهزة المناسب سعريًا في مصر مقابل شراء محول Samsung 25 واط + شاحن لابتوب منفصل — مقبس واحد، ثلاثة منافذ، ضمان 24 شهرًا',
            },
        ],
        limits: [
            {
                en: 'Port collapse is real: simultaneous peaks (63.7W / 62.1W) are below single-C 65.8W. Do not expect three full-speed laptop/phone fast-charges',
                ar: 'انهيار المنافذ حقيقي: الذروات المتزامنة (63.7 / 62.1) أقل من C الواحد 65.8. لا تتوقع ثلاث شحنات سريعة كاملة',
            },
            {
                en: 'MacBook Pro 14" gets NORMAL charge (~65.8W), NOT Apple\'s 96W fast-charge — buy A2688 (measured 96.2W) if 0→50% in ~30 min matters',
                ar: 'يحصل MacBook Pro 14 على شحن طبيعي (~65.8 واط) وليس شحن Apple السريع 96 واط — اشترِ A2688 (96.2 مقاس) إن همّك 0→50% في ~30 دقيقة',
            },
            {
                en: 'AC efficiency and vampire draw NOT measured (no PZEM) — we publish no invented CairoVolt efficiency %',
                ar: 'كفاءة AC وسحب بلا حمل غير مقاسين (لا PZEM) — لا ننشر نسبة كفاءة CairoVolt مخترعة',
            },
            {
                en: 'Runs warm under full triple load — 56.8°C after 30 min at 27.6°C ambient; expect 60–65°C in a 35°C Cairo apartment. Anker 0–25°C range needs airflow',
                ar: 'يسخن تحت الحمل الثلاثي — 56.8°م بعد 30 دقيقة عند 27.6°م؛ توقّع 60–65°م في شقة 35°م. نطاق انكر 0–25°م يحتاج تهوية',
            },
            {
                en: 'Galaxy A54 (and any phone without PPS) charged at only 14.6W — phone-side protocol limit, not charger fault; S24 pulls full 25W via PPS',
                ar: 'Galaxy A54 (وأي هاتف بلا PPS) شُحن بـ 14.6 واط فقط — قيد بروتوكول من الهاتف؛ S24 يسحب 25 واط كاملة عبر PPS',
            },
            {
                en: 'USB-A is QC/PowerIQ only (21.8W) — not USB-C PD. Plug on this Egypt sample is foldable US Type-A, not BS 1363 — verify your unit',
                ar: 'USB-A فئة QC/PowerIQ فقط (21.8 واط) — ليس USB-C PD. قابس عيّنة مصر هذه US قابل للطي وليس BS 1363 — أكّد وحدتك',
            },
            {
                en: 'Ultra 45W-class PPS not instrumented on this sample as a live Ultra pull — Techtest.org window cited independently; for measured Ultra 44.8W see A2688 sheet',
                ar: 'PPS فئة Ultra 45 واط لم يُقَس على هذه العيّنة كسحب Ultra حي — نافذة Techtest.org مستقلة؛ لـ Ultra 44.8 مقاس انظر ورقة A2688',
            },
            {
                en: 'Single unit CV-CH-A2669-001 — production batches and regional prong variants may shift weight/size; chip identity unpublished; C2 alone 67W-class peak not separately re-logged beyond FNB58 advertisement match',
                ar: 'وحدة واحدة CV-CH-A2669-001 — قد تختلف الدفعات ونسخ السنون؛ هوية الرقاقات غير منشورة؛ ذروة فئة 67 واط لـ C2 منفردًا لم تُسجَّل منفصلة بما يتجاوز مطابقة إعلان FNB58',
            },
        ],
    },
};
