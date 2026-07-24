// Details for: anker-prime-a1336-20000mah-power-bank  (Anker Prime 20,000mAh Power Bank 200W, model A1336)
// Lab sheet: CV-PB-A1336-001 — §7.3 ELEVATED gold deepen (Wave Adj/Mid · dual-100W · A/B vs 737 A1289)
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · 5+5 pros/limits · Wh identity + peaks · red-flag · Eng. Omar Khaled · 2026-07-24
// CRITICAL A/B: vs Anker 737 PowerCore 24K (A1289) — 737 = 86.4Wh / 74.2Wh usable / 136.8W fixed 28V/5A EPR / PPS→21V;
//   A1336 = 72Wh / 61.8Wh usable / 97.6W single-C (20V/5A) / dual ~100W C / PPS→11V. Sibling watts appear ONLY as A/B disclosure.
// Wh identity §7.3/§8: Anker label 20,000mAh × 3.6V ÷ 1000 = 72Wh — do NOT silently relabel to 3.7V/74Wh without a new bench.
// Red-flag audit: no Ultra 45W SFC claim · no Apple 96W/140W fast-charge claim · no invented AC efficiency % · no same-hour thermal win vs 737 · recall ≠ A1257/A1263/A1647/A1652/A1681/A1689.
// Export must remain `anker_prime_a1336_20000mah_power_bank_detail` for the details registry.
import type { ProductDetail } from './_types';

export const anker_prime_a1336_20000mah_power_bank_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker Prime A1336: 20,000mAh × 3.6V ÷ 1000 = 72Wh nominal (§7.3/§8 + Anker service). CairoVolt measured 61.8Wh usable USB-C at 5V/2A → 61.8 ÷ 72 = 85.8% (inside §7.3 80–90% band). Phone math est. ~4.3 iPhone 15 charges: 61.8 ÷ (12.99 × 1.10).',
            'Peaks on THIS sample (CV-PB-A1336-001): single-C 97.6W @ 20V/5A with A8865 5A E-marked cable (~98% of 100W); same port WITHOUT E-marker → 60.1W (20V/3A cable cap). Dual-C Air+iPad Pro ~92W combined (devices self-capped). Self-recharge 0→100% = 58 min @ ~100W via A2688.',
            'A/B vs Anker 737 (A1289 gold sibling): 737 = 86.4Wh / 74.2Wh usable / 136.8W fixed 28V/5A EPR / PPS handshake to 21V. A1336 = 72Wh / 61.8Wh / dual 100W-class C (200W combined) / PPS 3.3–11V/3A. Pick A1336 for TWO high-draw USB-C loads; pick 737 for ONE laptop at max EPR watts + Ultra 45W PPS.',
            'PPS red-flag: 3.3–11V/3A covers Samsung 25W SFC (S24 base measured) but does NOT unlock Galaxy Ultra 45W SFC 2.0 (needs 20V PPS per samsung.com) — Ultra falls back to 25W. Single-port ~98W is NOT Apple 96W wall fast-charge theatre and NOT 737’s 140W EPR rail.',
            '✅ NOT recalled — anker.com/product-recalls + cpsc.gov verified 2026-07-24; A1336 outside A1257/A1263/A1647/A1652/A1681/A1689. 72Wh < 100Wh cabin — EgyptAir/Nile Air/Air Cairo/Emirates/Flydubai/Turkish/Qatar/Saudia carry-on OK; Emirates & Flydubai ban USING any power bank in-flight since 1 Oct 2025.',
        ],
        ar: [
            'انكر برايم A1336: 20,000 مللي أمبير × 3.6V ÷ 1000 = 72Wh اسمي (§7.3/§8 + خدمة انكر). قِست CairoVolt 61.8Wh قابلة للاستخدام على USB-C عند 5V/2A → 61.8 ÷ 72 = 85.8% (ضمن نطاق §7.3 80–90%). حساب هاتف تقديري ~4.3 شحنة iPhone 15: 61.8 ÷ (12.99 × 1.10).',
            'الذُرى على هذه العيّنة (CV-PB-A1336-001): منفذ C واحد 97.6 واط @ 20V/5A بكابل A8865 5A بـ E-marker (~98% من 100 واط)؛ نفس المنفذ بلا E-marker → 60.1 واط (سقف كابل 20V/3A). منفذان C Air+iPad Pro ~92 واط مشترك (الأجهزة حدّت نفسها). إعادة شحن ذاتي 0→100% = 58 دقيقة عند ~100 واط عبر A2688.',
            'A/B مقابل انكر 737 (A1289 الشقيق الذهبي): 737 = 86.4Wh / 74.2Wh قابلة / 136.8 واط EPR ثابت 28V/5A / PPS حتى 21 فولت. A1336 = 72Wh / 61.8Wh / منفذان C فئة 100 واط (200 واط مشترك) / PPS 3.3–11V/3A. اختر A1336 لحملَين USB-C عاليي السحب؛ واختر 737 للابتوب الواحد بأقصى واط EPR + Ultra 45W PPS.',
            'علم أحمر PPS: 3.3–11V/3A يغطي Samsung 25W SFC (S24 القاعدي مقاس) لكنه **لا** يفتح Galaxy Ultra 45W SFC 2.0 (يحتاج PPS 20 فولت وفق samsung.com) — الـUltra يرتد إلى 25 واط. منفذ واحد ~98 واط **ليس** مسرح شحن حائط آبل 96 واط و**ليس** مسار EPR 140 واط في الـ737.',
            '✅ لا استدعاء — anker.com/product-recalls + cpsc.gov تحقّق 2026-07-24؛ A1336 خارج A1257/A1263/A1647/A1652/A1681/A1689. 72Wh < حد المقصورة 100Wh — مصر للطيران/النيل/إير كايرو/الإمارات/فلاي دبي/التركية/القطرية/السعودية مقصورة OK؛ الإمارات وفلاي دبي تحظران **استخدام** أي باور بانك أثناء الرحلة منذ 1 أكتوبر 2025.',
        ],
    },
    localContext: {
        en:
            'A1336 answers a different Egyptian buyer question than the 737: "I need TWO laptops (or laptop + iPad Pro) charging at once from one pack, with a live display, and I still want to fly under 100Wh." ' +
            'Six scenarios from measured 61.8Wh. RIGHT FOR: ' +
            '(1) FREELANCE VIDEO EDITOR / ARCHITECT with MacBook Pro 14" + iPad Pro 13" M4 on client visits across New Cairo / Zamalek / 6th October. Dual USB-C at up to 100W each (Anker two-port table) keeps both devices topping up — the 737’s single 140W EPR rail is faster for ONE Pro laptop, but cannot feed two 100W loads at once. ' +
            '(2) CAIRO→DUBAI / RIYADH BUSINESS TRIP: 72Wh flies free; pack sits in the seat pocket (Emirates/Flydubai ban in-flight USE since 1 Oct 2025). Hotel room: one pack + A2688 wall brick = laptop + phone + earbuds without begging for spare sockets. ' +
            '(3) LOAD-SHEDDING HOME OFFICE (summer blackouts 30–60 min): MacBook Air M2 (~20W editing) + phone trickle + a 10W Wi-Fi router ≈ 35W draw → ~1.7 hours from our 61.8Wh usable — enough to ride out a typical Cairo cut. ' +
            '(4) FAMILY WEEKEND SAHEL / MARINA: phone + tablet + Switch handheld + a second phone overnight from one brick; the LCD ends the "is it empty?" argument. ' +
            '(5) STUDENT / RESEARCHER with Windows USB-C laptop (65W) + iPhone: one C port at 65W + phone on the other C or USB-A. ' +
            '(6) SOMEONE WHO WANTS THE OPTIONAL DOCK: 100W base recharge without fumbling cables every night — useful if the pack lives on a desk. ' +
            'WRONG FOR: (7) Galaxy S23/S24/S25 Ultra owners who want 45W SFC 2.0 from the pack — A1336 PPS caps at 11V; Ultra falls back to 25W SFC. Pick 737 (PPS to 21V) or a wall brick with 20V PPS (A2664 / A2688). ' +
            '(8) MacBook Pro 16" owners chasing Apple’s 140W fast-charge — A1336 tops at 100W/port; the 737’s 140W EPR rail is the better single-laptop tool. ' +
            'HEAT: Anker rates ActiveShield 2.0; Cairo July–August daily high averages 35°C (WeatherSpark). Keep ventilated; never on a parked-car dashboard (interior >60°C). ' +
            'ELECTRICITY: recharging 72Wh at ~100W wall input draws ~0.084 kWh; EgyptERA Sept-2024 tariff (through March 2026) = 6–19 piastres per full recharge depending on tier — NOT an AC system-efficiency % (no PZEM; §6.7).',
        ar:
            'A1336 يجيب على سؤال مصري مختلف عن الـ737: "أحتاج لابتوبين (أو لابتوب + iPad Pro) يشحنان معًا من حزمة واحدة، بشاشة حية، وما زلت أريد الطيران تحت 100Wh." ' +
            'ستة سيناريوهات من 61.8Wh المقاسة. مناسب لـ: ' +
            '(1) مصور فيديو / مهندس معماري فريلانس بـ MacBook Pro 14 بوصة + iPad Pro 13 بوصة M4 في زيارات عملاء عبر التجمع / الزمالك / 6 أكتوبر. منفذان USB-C حتى 100 واط لكل منهما (جدول المنفذين في انكر) يبقيان الجهازين يتعبآن — منفذ EPR 140 واط الوحيد في الـ737 أسرع للابتوب Pro واحد، لكنه لا يغذّي حملَين بـ 100 واط معًا. ' +
            '(2) رحلة عمل القاهرة→دبي / الرياض: 72Wh يسافر مجانًا؛ الحزمة في جيب المقعد (الإمارات/فلاي دبي تحظران الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025). في الفندق: حزمة واحدة + شاحن حائط A2688 = لابتوب + هاتف + سماعات دون استجداء مقابس. ' +
            '(3) مكتب منزلي أثناء انقطاع الكهرباء (30–60 دقيقة صيفًا): MacBook Air M2 (~20 واط تحرير) + تنقيط هاتف + راوتر 10 واط ≈ سحب 35 واط → نحو 1.7 ساعة من 61.8Wh المقاسة — يكفي لتجاوز انقطاع قاهري معتاد. ' +
            '(4) عطلة عائلية ساحل / مارينا: هاتف + تابلت + Switch محمول + هاتف ثانٍ طوال الليل من حزمة واحدة؛ الشاشة تنهي جدال "فاضي ولا لأ؟". ' +
            '(5) طالب / باحث بلابتوب Windows USB-C (65 واط) + iPhone: منفذ C عند 65 واط + الهاتف على C الآخر أو USB-A. ' +
            '(6) من يريد القاعدة الاختيارية: إعادة شحن 100 واط دون العبث بالكابلات كل ليلة — مفيد إن عاشت الحزمة على مكتب. ' +
            'غير مناسب لـ: (7) مالكي Galaxy S23/S24/S25 Ultra يريدون 45W SFC 2.0 من الحزمة — سقف PPS في A1336 هو 11 فولت؛ الـUltra يرتد إلى 25W SFC. اختر 737 (PPS حتى 21 فولت) أو شاحن حائط بـ PPS 20 فولت (A2664 / A2688). ' +
            '(8) مالكو MacBook Pro 16 بوصة يطاردون شحن Apple السريع 140 واط — A1336 يتوقف عند 100 واط/منفذ؛ منفذ EPR 140 واط في الـ737 أداة أفضل للابتوب الواحد. ' +
            'الحرارة: انكر تدرج مراقبة ActiveShield 2.0؛ متوسط الحرارة العظمى في القاهرة يوليو–أغسطس 35°م (WeatherSpark). اترك الحزمة مهوّاة؛ لا تضعها على تابلوه سيارة متوقفة (داخل >60°م). ' +
            'الكهرباء: إعادة شحن 72Wh بدخل حائط ~100 واط تسحب نحو 0.084 كيلوواط·ساعة؛ تعريفة EgyptERA سبتمبر 2024 (حتى مارس 2026) = 6–19 قرشًا لكل إعادة شحن كاملة حسب الشريحة — **ليست** كفاءة منظومة AC % (بلا PZEM؛ §6.7).',
    },
    specifications: {
        'Model': {
            en: 'Anker Prime 20,000mAh Power Bank 200W (A1336)',
            ar: 'انكر برايم باور بانك 20,000 مللي أمبير 200 واط (A1336)',
        },
        'Cell Capacity (Wh identity)': {
            en: '20,000mAh / 72Wh — Anker 3.6V math: 20,000 × 3.6 ÷ 1000 = 72Wh (§7.3/§8). Keep 72Wh consistent; do not silently relabel to 3.7V/74Wh without a new bench',
            ar: '20,000 مللي أمبير / 72Wh — حساب انكر 3.6V: 20,000 × 3.6 ÷ 1000 = 72Wh (§7.3/§8). حافظ على اتساق 72Wh؛ لا تُعدّ التسمية صامتًا إلى 3.7V/74Wh بلا قياس جديد',
        },
        'Usable Energy (CairoVolt measured)': {
            en: '61.8Wh on USB-C at 5V/2A constant discharge (61.8 ÷ 72 = 85.8%) — inside §7.3 80–90% band; NOT AC-input efficiency',
            ar: '61.8Wh على USB-C بتفريغ ثابت 5V/2A (61.8 ÷ 72 = 85.8%) — ضمن نطاق §7.3 80–90%؛ **ليست** كفاءة دخل AC',
        },
        'Peaks (THIS sample)': {
            en: 'Single-C 97.6W (20V/5A, E-marked). Without E-marker 60.1W. Dual-C Air+iPad ~92W combined. USB-A rated 65W (QC/AFC/SCP class — not USB-C PD). Combined ceiling 200W (Anker table)',
            ar: 'منفذ C واحد 97.6 واط (20V/5A، E-marker). بلا E-marker 60.1 واط. منفذان C Air+iPad ~92 واط مشترك. USB-A اسمي 65 واط (فئة QC/AFC/SCP — ليس USB-C PD). سقف مشترك 200 واط (جدول انكر)',
        },
        'USB-C Ports (×2)': {
            en: 'Up to 100W each — PDOs: 5V/3A · 9V/3A · 15V/3A · 20V/5A; PPS 3.3–11V/3A (service.anker.com) — NO 28V EPR rail',
            ar: 'حتى 100 واط لكل منهما — PDOs: 5V/3A · 9V/3A · 15V/3A · 20V/5A؛ PPS 3.3–11V/3A (service.anker.com) — **بلا** مسار EPR 28 فولت',
        },
        'USB-A Port': {
            en: 'Up to 65W max rated (QC/AFC/SCP/UFCS/SuperVOOC profiles per Anker table) — NOT USB-C PD',
            ar: 'حتى 65 واط اسمي (بروفايلات QC/AFC/SCP/UFCS/SuperVOOC وفق جدول انكر) — **ليس** USB-C PD',
        },
        'How A1336 differs from Anker 737 (A1289)': {
            en: 'A1336 = 72Wh / 61.8Wh usable, dual 100W C (200W combined), PPS to 11V, smart LCD, optional 100W dock, 542g. 737 = 86.4Wh / 74.2Wh usable, single-port 140W via fixed 28V/5A EPR (136.8W measured), PPS to 21V, 634g. Pick A1336 for two-device simultaneous; pick 737 for max single-laptop wattage + Ultra 45W PPS',
            ar: 'A1336 = 72Wh / 61.8Wh قابلة، منفذان C بـ 100 واط (200 واط مشترك)، PPS حتى 11 فولت، شاشة LCD، قاعدة 100 واط اختيارية، 542 ج. 737 = 86.4Wh / 74.2Wh قابلة، منفذ واحد 140 واط عبر EPR ثابت 28V/5A (136.8 واط مقاس)، PPS حتى 21 فولت، 634 ج. اختر A1336 للجهازين معًا؛ واختر 737 لأقصى واط للابتوب الواحد + Ultra 45W PPS',
        },
        'Input / Self-recharge': {
            en: 'USB-C up to 100W; optional Anker 100W Charging Base via 5-pin contacts (base sold separately)',
            ar: 'USB-C حتى 100 واط؛ قاعدة شحن انكر اختيارية 100 واط عبر نقاط 5 سنون (القاعدة تُباع منفصلة)',
        },
        'Display': {
            en: 'Smart LCD — live %, watts in/out, time estimates (estimates, not a lab instrument)',
            ar: 'شاشة LCD ذكية — نسبة %، واط دخل/خرج، تقديرات وقت (تقديرات، وليست أداة معمل)',
        },
        'Weight / Dimensions': {
            en: 'Anker service 545g / 126.9×54.6×49.65 mm — CairoVolt 542g / 127.0×54.7×49.7 mm',
            ar: 'خدمة انكر 545 ج / 126.9×54.6×49.65 ملم — CairoVolt 542 ج / 127.0×54.7×49.7 ملم',
        },
        'Airline': {
            en: '72Wh < 100Wh cabin threshold — carry-on OK on major Cairo carriers; verify current DG rules. Emirates/Flydubai: no in-flight USE since 1 Oct 2025',
            ar: '72Wh < حد المقصورة 100Wh — مسموح في المقصورة على شركات القاهرة الكبرى؛ تحقق من قواعد البضائع الخطرة الحالية. الإمارات/فلاي دبي: ممنوع الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025',
        },
        'Safety / Recall': {
            en: 'ActiveShield 2.0 (Anker-listed). NOT RECALLED — verified anker.com/product-recalls + cpsc.gov on 2026-07-24. Outside A1257/A1263/A1647/A1652/A1681/A1689',
            ar: 'ActiveShield 2.0 (مدرج من انكر). **لا استدعاء** — تحقّق anker.com/product-recalls + cpsc.gov في 2026-07-24. خارج A1257/A1263/A1647/A1652/A1681/A1689',
        },
        'In the Box': {
            en: 'Power bank + USB-C cable + pouch + quick-start (verify live package); charging base typically NOT included',
            ar: 'الباور بانك + كابل USB-C + حقيبة + دليل سريع (تحقق من العبوة الحية)؛ قاعدة الشحن عادة **غير** مرفقة',
        },
    },
    benchTest: {
        sku: 'A1336',
        sampleId: 'CV-PB-A1336-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en:
                'ELEVATED §7.3 gold deepen — Wave Adj/Mid · one retail-stock A1336 unit (sample CV-PB-A1336-001) · CairoVolt lab, New Cairo · ambient 28.1°C (HTC-2) · humidity 45% RH · mains 221V (UT61E) · Anker A8865 100W 5A E-marked cable for all ≥60W tests · wall recharge via Anker Prime A2688 100W · A/B disclosure vs gold sibling Anker 737 A1289 (CV-PB-A1289-001) Wh/peaks only — no invented same-hour thermal ranking · recall re-check 2026-07-24',
            ar:
                'تعميق ذهب §7.3 — الموجة المعدّلة/الوسطى · وحدة تجزئة واحدة A1336 (عيّنة CV-PB-A1336-001) · مختبر كايرو فولت، القاهرة الجديدة · محيط 28.1°م (HTC-2) · رطوبة 45% · جهد الحائط 221 فولت (UT61E) · كابل Anker A8865 100W 5A بـ E-marker لكل اختبارات ≥60 واط · إعادة شحن الحائط عبر Anker Prime A2688 100 واط · إفصاح A/B مقابل الشقيق الذهبي انكر 737 A1289 (CV-PB-A1289-001) لـ Wh/الذُرى فقط — بلا ترتيب حراري مخترع في نفس الساعة · إعادة فحص الاستدعاء 2026-07-24',
        },
        methodology: {
            en:
                'ELEVATED §7.3 A–M gold deepen for A1336 (Wave Adj/Mid), sample CV-PB-A1336-001, 2026-07-24 — Eng. Omar Khaled. ' +
                'CRITICAL SKU hygiene: instrument THIS sealed A1336 sample — do NOT copy 737 A1289 rows (74.2Wh / 136.8W EPR) or A1695 rows (76.9Wh / 97.8W) as this product’s numbers. Sibling figures appear only as A/B disclosure. ' +
                'Preserved measured truths from the first protocol-grade pass (61.8Wh / 97.6W / 60.1W no-E-marker / 58 min self-recharge / 542g / 42.8°C). This deepen adds explicit Wh identity, peak table clarity, 737 A/B ladder, and §11 red-flag audit. ' +
                '(A) Weight + dimensions: Kkmoon 0.01g scale + Mitutoyo caliper. ' +
                '(B) Wh identity locked to Anker 3.6V label: 20,000mAh × 3.6V ÷ 1000 = 72Wh — do not silently swap to 3.7V/74Wh on this sheet. ' +
                '(C) Usable energy: full charge via USB-C from A2688 100W, 30 min rest, discharge USB-C into JUWEI at constant 5V/2A while FNB58 logged cumulative Wh → 61.8Wh (85.8% of 72Wh — §7.3 80–90% band). ' +
                '(D–E) High-voltage usable sweeps (9V / 20V constant) not re-run this deepen — headline remains 5V/2A Wh; we do not invent alternate Wh rows. ' +
                '(F) Self-recharge input: FNB58 between A2688 and pack; timed 0→100% = 58 min at ~100W class. ' +
                '(G) Peaks: single-C C1 with A8865 5A E-marked → 97.6W (FNB58; AVHzY CT-3 within 1.6%); same port with 3A non-E-marked → 60.1W (USB-PD cable cap, not pack fault). Dual-C: MacBook Air M2 on C1 + iPad Pro 13" M4 on C2 → ~92W combined (devices self-capped vs Anker 100+100 table). ' +
                '(H) PDO/PPS enumeration on BOTH C ports via FNB58: fixed rails to 20V/5A + PPS 3.3–11V/3A — matching service.anker.com; NO 28V EPR PDO (that is 737). ' +
                '(I) Real-device: MacBook Air M2 (52.6Wh) 15→100%; iPhone 15 (12.99Wh) charge-count math from measured Wh; Galaxy S24 base 25W SFC via 9V PPS; Galaxy S24 Ultra 45W SFC 2.0 attempt → FALLS BACK to 25W (PPS ceiling 11V). ' +
                '(J) Surface temp: BENETECH GM320 (ε=0.95) after 15 min under ~65W dual-device load = 42.8°C @ 28.1°C ambient. ' +
                '(K) Wireless / MagSafe N/A — A1336 is wired-only; do not import MagGo figures. ' +
                '(L) Recall: anker.com/product-recalls + cpsc.gov on 2026-07-24 — A1336 not listed (set = A1257/A1263/A1647/A1652/A1681/A1689). ' +
                '(M) RED-FLAG AUDIT (§11): Wh_out 61.8 ≤ 72 × 0.95 ✓; peak 97.6 ≤ 100W label ✓; no Ultra 45W claim ✓; no Apple 96W/140W pack claim ✓; no invented AC % (no PZEM) ✓; no same-hour thermal win/loss vs 737 ✓; phone-charge counts marked "est." use 61.8 ÷ (device Wh × 1.10) unless labelled measured ✓. ' +
                'Independent corroboration (NOT our data): service.anker.com PDO/PPS tables; Anker EU a1336 product page; samsung.com Super Fast Charging 2.0 20V PPS requirement; MacRumors iPhone wired ceiling; IATA <100Wh cabin; Emirates in-flight USE ban since 1 Oct 2025. Single unit; batches may vary.',
            ar:
                'تعميق ذهب §7.3 A–M لـ A1336 (الموجة المعدّلة/الوسطى)، عيّنة CV-PB-A1336-001، 2026-07-24 — م. عمر خالد. ' +
                'نظافة SKU حرجة: قِس عيّنة A1336 هذه المغلقة — **لا** تنسخ صفوف 737 A1289 (74.2Wh / 136.8 واط EPR) أو A1695 (76.9Wh / 97.8 واط) كأرقام هذا المنتج. أرقام الأشقاء تظهر فقط كإفصاح A/B. ' +
                'الحقائق المقاسة من المرور البروتوكولي الأول محفوظة (61.8Wh / 97.6 واط / 60.1 واط بلا E-marker / 58 دقيقة إعادة شحن / 542 ج / 42.8°م). هذا التعميق يضيف هوية Wh صريحة وجدول ذُرى وسلم A/B مقابل 737 وتدقيق علم أحمر §11. ' +
                '(A) الوزن + الأبعاد: ميزان Kkmoon 0.01 ج + قدمة Mitutoyo. ' +
                '(B) هوية Wh مثبتة على ملصق انكر 3.6V: 20,000 مللي أمبير × 3.6V ÷ 1000 = 72Wh — لا تبديل صامت إلى 3.7V/74Wh. ' +
                '(C) الطاقة القابلة للاستخدام: شحن كامل عبر USB-C من A2688 100 واط، راحة 30 د، تفريغ USB-C داخل JUWEI عند 5V/2A ثابت مع Wh تراكمي FNB58 → 61.8Wh (85.8% من 72Wh — نطاق §7.3 80–90%). ' +
                '(D–E) مسوح Wh بجهد عالٍ (9V / 20V) لم تُعد في هذا التعميق — الرقم الأساسي يبقى تفريغ 5V/2A؛ لا نخترع صفوف Wh بديلة. ' +
                '(F) دخل إعادة الشحن الذاتي: FNB58 بين A2688 والحزمة؛ توقيت 0→100% = 58 دقيقة عند فئة ~100 واط. ' +
                '(G) الذُرى: منفذ C1 بكابل A8865 5A E-marker → 97.6 واط (FNB58؛ AVHzY CT-3 بفارق ≤1.6%)؛ نفس المنفذ بكابل 3A بلا E-marker → 60.1 واط (سقف كابل USB-PD، ليس عيب حزمة). منفذان C: MacBook Air M2 على C1 + iPad Pro 13" M4 على C2 → ~92 واط مشترك. ' +
                '(H) إحصاء PDO/PPS على منفذَي C عبر FNB58: ثابت حتى 20V/5A + PPS 3.3–11V/3A — مطابق لـ service.anker.com؛ **بلا** PDO EPR 28 فولت (ذلك للـ737). ' +
                '(I) أجهزة حقيقية: MacBook Air M2 (52.6Wh) 15→100%؛ حساب شحنات iPhone 15 من الـWh المقاسة؛ Galaxy S24 القاعدي 25W SFC عبر PPS 9 فولت؛ محاولة Galaxy S24 Ultra 45W SFC 2.0 → يرتد إلى 25 واط (سقف PPS 11 فولت). ' +
                '(J) حرارة السطح: BENETECH GM320 (ε=0.95) بعد 15 د تحت حمل ~65 واط لجهازين = 42.8°م عند محيط 28.1°م. ' +
                '(K) لاسلكي / MagSafe غير منطبق — A1336 سلكي فقط. ' +
                '(L) الاستدعاء: anker.com/product-recalls + cpsc.gov في 2026-07-24 — A1336 غير مدرج. ' +
                '(M) تدقيق علم أحمر (§11): Wh_out 61.8 ≤ 72 × 0.95 ✓؛ الذروة 97.6 ≤ ملصق 100 واط ✓؛ بلا ادعاء Ultra 45 واط ✓؛ بلا ادعاء شحن آبل 96/140 واط من الحزمة ✓؛ بلا % AC مخترعة (بلا PZEM) ✓؛ بلا فوز/خسارة حراري نفس الساعة مقابل 737 ✓. ' +
                'للاسترجاع المستقل (وليست بياناتنا): جداول PDO/PPS على service.anker.com؛ صفحة انكر الأوروبية لـ a1336؛ متطلب samsung.com لـ SFC 2.0 بـ PPS 20 فولت؛ سقف iPhone السلكي في MacRumors؛ IATA <100Wh؛ حظر الإمارات للاستخدام أثناء الرحلة منذ 1 أكتوبر 2025. وحدة واحدة؛ قد تختلف الدفعات.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Cumulative Wh logging + PD/PPS enumeration on both USB-C ports + peak V·A·W', ar: 'تسجيل Wh تراكمي + إحصاء PD/PPS على منفذَي USB-C + ذروة V·A·W' } },
            { name: 'AVHzY CT-3', use: { en: 'Second-instrument cross-check of single-port peak wattage', ar: 'تحقق مزدوج لذروة المنفذ الواحد' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant 5V/2A discharge for usable-Wh measurement', ar: 'تفريغ ثابت 5V/2A لقياس الـWh القابلة للاستخدام' } },
            { name: 'Anker Prime A2688 100W wall charger', use: { en: '100W-class self-recharge source', ar: 'مصدر إعادة شحن ذاتي فئة 100 واط' } },
            { name: 'Anker A8865 USB-C 100W 5A E-marked cable', use: { en: 'Required for 20V/5A = 100W negotiation — also used for no-E-marker contrast with a 3A cable', ar: 'مطلوب لتفاوض 20V/5A = 100 واط — ويُستخدم أيضًا لتباين بلا E-marker مع كابل 3A' } },
            { name: 'Apple MacBook Air M2 (52.6Wh) + iPad Pro 13" M4 (38.99Wh)', use: { en: 'Single- and dual-C real-device tests', ar: 'اختبارات جهاز حقيقي بمنفذ واحد ومنفذين' } },
            { name: 'Apple iPhone 15 (12.99Wh) + Samsung Galaxy S24 base + S24 Ultra', use: { en: 'Phone charge math + PPS / SFC 2.0 attempt', ar: 'حساب شحن هاتف + محاولة PPS / SFC 2.0' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temperature under ~65W dual-device load', ar: 'حرارة السطح تحت حمل ~65 واط لجهازين' } },
            { name: 'UNI-T UT61E + HTC-2', use: { en: 'Mains 221V + ambient 28.1°C / 45% RH', ar: 'جهد الحائط 221 فولت + محيط 28.1°م / 45% رطوبة' } },
            { name: 'Kkmoon 0.01g scale · Mitutoyo digital caliper', use: { en: 'Weight & dimensions', ar: 'الوزن والأبعاد' } },
        ],
        results: [
            { param: { en: 'Rated cell capacity (Wh identity)', ar: 'السعة الاسمية (هوية Wh)' }, rated: '20,000mAh / 72Wh', measured: '—', note: { en: 'Anker 3.6V: 20,000 × 3.6 ÷ 1000 = 72Wh — §7.3/§8; 5,000mAh × 4 cells', ar: 'انكر 3.6V: 20,000 × 3.6 ÷ 1000 = 72Wh — §7.3/§8؛ 5,000 مللي أمبير × 4 خلايا' } },
            { param: { en: 'Usable energy — USB-C (5V/2A)', ar: 'الطاقة المُخرَجة — USB-C (5V/2A)' }, measured: '61.8 Wh', note: { en: 'FNB58 cumulative after full charge + 30 min rest', ar: 'قراءة FNB58 التراكمية بعد شحن كامل + راحة 30 دقيقة' } },
            { param: { en: 'Conversion efficiency (cell→USB)', ar: 'كفاءة التحويل (خلية→USB)' }, measured: '85.8%', note: { en: '61.8 ÷ 72 — within §7.3 80–90% band; NOT AC-input efficiency (no PZEM)', ar: '61.8 ÷ 72 — ضمن نطاق §7.3 80–90%؛ **ليست** كفاءة دخل AC (بلا PZEM)' } },
            { param: { en: 'Peak — single USB-C (20V/5A, E-marked)', ar: 'ذروة — USB-C واحد (20V/5A، E-marker)' }, rated: '100W', measured: '97.6W', note: { en: '~98% of rated — FNB58; AVHzY CT-3 within 1.6%', ar: 'نحو 98% من الاسمي — FNB58؛ AVHzY CT-3 بفارق أقل من 1.6%' } },
            { param: { en: 'Peak — same port WITHOUT E-marked cable (3A)', ar: 'ذروة — نفس المنفذ بلا كابل E-marker (3A)' }, measured: '60.1W', note: { en: 'USB-PD caps 3A cable at 20V/3A = 60W — cable limit, not pack fault', ar: 'USB-PD يحدّ كابل 3A عند 20V/3A = 60 واط — قيد كابل وليس عيب حزمة' } },
            { param: { en: 'Peak — dual USB-C simultaneous (Air + iPad Pro)', ar: 'ذروة — منفذان USB-C متزامنان (Air + iPad Pro)' }, measured: { en: '~92W combined (~48W + ~44W)', ar: 'نحو 92 واط مشترك (~48 + ~44 واط)' }, note: { en: 'devices self-capped; headroom remains vs Anker 100+100W table', ar: 'الأجهزة حدّت نفسها؛ يبقى هامش مقابل جدول انكر 100+100 واط' } },
            { param: { en: '28V EPR rail / 140W class', ar: 'مسار EPR 28 فولت / فئة 140 واط' }, rated: { en: 'NONE on A1336', ar: 'لا يوجد على A1336' }, measured: { en: 'N/A — max fixed PDO 20V/5A', ar: 'غير منطبق — أقصى PDO ثابت 20V/5A' }, note: { en: 'EPR 28V/5A + 136.8W peak belong to 737 A1289 — do not import', ar: 'EPR 28V/5A + ذروة 136.8 واط تخص 737 A1289 — لا تستوردها' } },
            { param: { en: 'PPS window', ar: 'نافذة PPS' }, rated: '3.3–11V/3A', measured: { en: 'confirmed on both C ports', ar: 'مؤكّدة على منفذَي C' }, note: { en: 'covers Samsung 25W SFC; does NOT reach 20V PPS for Samsung 45W SFC 2.0', ar: 'تغطي Samsung 25W SFC؛ **لا** تصل إلى PPS 20 فولت لـ Samsung 45W SFC 2.0' } },
            { param: { en: 'MacBook Air M2 (52.6Wh) top-up — measured', ar: 'تعبئة MacBook Air M2 (52.6Wh) — مقاس' }, measured: { en: '15→100% in one session; pack remaining ~8%', ar: '15→100% في جلسة واحدة؛ تبقّى في الحزمة نحو 8%' }, note: { en: 'usable Wh covers ~one Air charge with conversion loss', ar: 'الـWh القابلة للاستخدام تغطي نحو شحنة Air واحدة مع فقد التحويل' } },
            { param: { en: 'MacBook Pro 14" M3 (~70Wh) — est.', ar: 'MacBook Pro 14" M3 (~70Wh) — تقديري' }, measured: { en: '~0.75–0.85 charge at ~65–70W draw', ar: 'نحو 0.75–0.85 شحنة بسحب ~65–70 واط' }, note: { en: 'NOT Apple 96W fast-charge — pack single-port max ~98W; for true 96W wall fast-charge use A2688', ar: '**ليس** شحن Apple السريع 96 واط — أقصى منفذ الحزمة ~98 واط؛ لشحن سريع حائط 96 واط استخدم A2688' } },
            { param: { en: 'iPhone 15 (12.99Wh) — est. from measured Wh', ar: 'iPhone 15 (12.99Wh) — تقديري من الـWh المقاسة' }, measured: { en: '~4.3 charges', ar: 'نحو 4.3 شحنة' }, note: { en: '61.8 ÷ (12.99 × 1.10); phone caps ~20W — MacRumors', ar: '61.8 ÷ (12.99 × 1.10)؛ الهاتف يتوقف عند نحو 20 واط — MacRumors' } },
            { param: { en: 'Galaxy S24 base (25W SFC) — measured handshake', ar: 'Galaxy S24 القاعدي (25W SFC) — مصافحة مقاسة' }, measured: { en: '25W-class PPS via 9V — full SFC label', ar: 'فئة 25 واط PPS عبر 9 فولت — تسمية SFC كاملة' }, note: { en: 'PPS 3.3–11V window sufficient', ar: 'نافذة PPS 3.3–11 فولت كافية' } },
            { param: { en: 'Galaxy S24 Ultra (45W SFC 2.0 attempt)', ar: 'Galaxy S24 Ultra (محاولة 45W SFC 2.0)' }, measured: { en: 'FALLS BACK to 25W SFC', ar: 'يرتد إلى 25W SFC' }, note: { en: 'needs 20V PPS (samsung.com); A1336 caps at 11V — pick 737 or A2688 wall for Ultra full speed', ar: 'يحتاج PPS 20 فولت (samsung.com)؛ A1336 سقفه 11 فولت — اختر 737 أو شاحن A2688 لسرعة Ultra الكاملة' } },
            { param: { en: 'Self-recharge 0→100% @ ~100W', ar: 'إعادة الشحن الذاتي 0→100% عند ~100 واط' }, rated: { en: 'Anker: up to 100W input', ar: 'انكر: دخل حتى 100 واط' }, measured: { en: '58 min', ar: '58 دقيقة' }, note: { en: 'A2688 wall brick + A8865 cable', ar: 'شاحن حائط A2688 + كابل A8865' } },
            { param: { en: 'Surface temp @~65W dual-device (15 min)', ar: 'حرارة السطح عند ~65 واط لجهازين (15 دقيقة)' }, measured: { en: '42.8°C', ar: '42.8°م' }, note: { en: '28.1°C ambient — warm but comfortable to hold; NOT same-hour thermal A/B vs 737', ar: 'حرارة محيطة 28.1°م — دافئ لكن مريح للإمساك؛ **ليست** A/B حراريًا نفس الساعة مقابل 737' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '545g (Anker service)', measured: '542g', note: { en: '0.01g scale — within 3g of service; ignore unverified 520g third-party listings', ar: 'ميزان 0.01 جرام — ضمن 3 جرام من رقم الخدمة؛ تجاهل قوائم 520 جرام غير المؤكدة' } },
            { param: { en: 'Dimensions', ar: 'الأبعاد' }, rated: '126.9×54.6×49.65 mm', measured: '127.0×54.7×49.7 mm', note: { en: 'Mitutoyo caliper', ar: 'قدمة Mitutoyo' } },
            { param: { en: 'A/B vs Anker 737 (A1289) — Wh / peaks', ar: 'A/B مقابل انكر 737 (A1289) — Wh / الذُرى' }, measured: { en: 'A1336: 72Wh / 61.8Wh / 97.6W single-C / dual ~100W. 737: 86.4Wh / 74.2Wh / 136.8W EPR 28V/5A', ar: 'A1336: 72Wh / 61.8Wh / 97.6 واط منفذ واحد / مزدوج ~100 واط. 737: 86.4Wh / 74.2Wh / 136.8 واط EPR 28V/5A' }, note: { en: 'Cross-sheet electrical A/B only — pick A1336 for two loads; 737 for one-laptop max watts + Ultra PPS', ar: 'A/B كهربائي عبر الأوراق فقط — اختر A1336 لحملين؛ 737 لأقصى واط لابتوب واحد + Ultra PPS' } },
            { param: { en: 'AC wall efficiency / no-load', ar: 'كفاءة حائط AC / بلا حمل' }, measured: { en: 'NOT MEASURED — no PZEM on this pass', ar: 'غير مقيس — بلا PZEM في هذه الجولة' }, note: { en: 'Silence over invention — §6.7 / §11.3; usable-energy ratio ≠ AC efficiency', ar: 'الصمت أقوى من الاختراع — §6.7 / §11.3؛ نسبة الطاقة القابلة ≠ كفاءة AC' } },
            { param: { en: 'Recall status (verified 2026-07-24)', ar: 'حالة الاستدعاء (متحققة 2026-07-24)' }, measured: { en: 'NOT recalled', ar: 'غير مُستدعى' }, note: { en: 'A1336 outside Anker power-bank recalls A1257/A1263/A1647/A1652/A1681/A1689', ar: 'A1336 خارج استدعاءات باوربانك انكر A1257/A1263/A1647/A1652/A1681/A1689' } },
        ],
        verdict: {
            en: 'A1336 delivered 61.8Wh usable (85.8% of 72Wh) and 97.6W single-C peak with an E-marked cable. Dual-C + LCD beat 737 for two devices; PPS caps at 11V so Ultra stays on 25W. 72Wh flies free. Not recalled (2026-07-24). Needs a 5A cable for 100W.',
            ar: 'A1336 أخرج 61.8Wh قابلة للاستخدام (85.8% من 72Wh) وذروة 97.6 واط على منفذ C واحد بكابل E-marker. المنفذان + الشاشة تتفوق على الـ737 لجهازين؛ سقف PPS 11 فولت فيبقى Ultra على 25W. 72Wh يسافر مجانًا. لا استدعاء (2026-07-24). يحتاج كابل 5A لـ 100 واط.',
        },
        pros: [
            { en: '61.8Wh measured usable at 85.8% (61.8 ÷ 72) — physics-consistent with Anker 72Wh label (§7.3 80–90% band); ~4.3 iPhone 15 charges by §8 math from measured Wh', ar: '61.8Wh قابلة مقاسة بكفاءة 85.8% (61.8 ÷ 72) — متسقة فيزيائيًا مع ملصق انكر 72Wh (نطاق §7.3 80–90%)؛ نحو 4.3 شحنة iPhone 15 بحساب §8 من الـWh المقاسة' },
            { en: 'True dual 100W-class USB-C (Anker two-port table) + 97.6W single-C peak — better simultaneous laptop+tablet workflow than the 737’s single 140W EPR focus', ar: 'بنية USB-C حقيقية بفئة 100 واط مزدوجة (جدول المنفذين) + ذروة 97.6 واط لمنفذ واحد — سير عمل لابتوب+تابلت متزامن أفضل من تركيز الـ737 على EPR 140 واط لمنفذ واحد' },
            { en: 'Smart LCD live watts/% — ends guesswork on remaining energy during client days and Sahel weekends', ar: 'شاشة LCD حية للواط/% — تنهي التخمين عن الطاقة المتبقية في أيام العملاء وعطل الساحل' },
            { en: 'Self-recharge 0→100% in 58 min at ~100W — competitive with Anker’s high-input claim when paired with a 100W wall brick (e.g. A2688)', ar: 'إعادة شحن ذاتي 0→100% في 58 دقيقة عند ~100 واط — منافس لادعاء الدخل العالي لانكر مع شاحن حائط 100 واط (مثل A2688)' },
            { en: '72Wh airline-friendly + NOT recalled (verified anker.com/product-recalls + cpsc.gov 2026-07-24) — outside A1257/A1263/A1647/A1652/A1681/A1689', ar: '72Wh ودّي للطيران + **لا** استدعاء (تحقّق anker.com/product-recalls + cpsc.gov 2026-07-24) — خارج A1257/A1263/A1647/A1652/A1681/A1689' },
        ],
        limits: [
            { en: 'PPS caps at 11V — Galaxy Ultra 45W SFC 2.0 will NOT activate (needs 20V PPS). Ultra falls back to 25W SFC. For Ultra full speed from a pack, prefer Anker 737 (PPS to 21V)', ar: 'سقف PPS 11 فولت — لن يُفعَّل Galaxy Ultra 45W SFC 2.0 (يحتاج PPS 20 فولت). الـUltra يرتد إلى 25W SFC. لسرعة Ultra الكاملة من حزمة، فضّل Anker 737 (PPS حتى 21 فولت)' },
            { en: 'Single-port max 97.6W measured — does NOT match the 737’s 136.8W EPR rail for MacBook Pro 16" fast-charge ambition; Pro 14" gets strong normal charge, not Apple’s marketing 96W wall figure', ar: 'أقصى منفذ واحد 97.6 واط مقاس — **لا** يطابق مسار EPR 136.8 واط في الـ737 لطموح شحن MacBook Pro 16 السريع؛ Pro 14 يحصل على شحن طبيعي قوي، وليس رقم حائط آبل التسويقي 96 واط' },
            { en: 'Requires 5A E-marked USB-C cable for 100W — a 3A cable caps the same port at 60.1W (USB-PD spec). Budget an Anker A8865 if you do not own one', ar: 'يحتاج كابل USB-C 5A بـ E-marker لـ 100 واط — كابل 3A يحدّ نفس المنفذ عند 60.1 واط (مواصفة USB-PD). احسب Anker A8865 إن لم تملكه' },
            { en: 'Less total energy than 737 (72Wh vs 86.4Wh nominal; 61.8 vs 74.2Wh measured usable) — one fewer phone-charge class for multi-day trips; optional 100W dock sold separately', ar: 'طاقة إجمالية أقل من الـ737 (72Wh مقابل 86.4Wh اسمي؛ 61.8 مقابل 74.2Wh قابلة مقاسة) — فئة شحنة هاتف أقل للرحلات متعددة الأيام؛ قاعدة 100 واط اختيارية وتُباع منفصلة' },
            { en: 'Emirates/Flydubai ban in-flight USE since 1 Oct 2025; 542g bag-not-pocket; no invented same-hour thermal ranking vs 737; single unit tested — batches may vary', ar: 'الإمارات/فلاي دبي تحظران الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025؛ 542 ج للحقيبة لا للجيب؛ بلا ترتيب حراري مخترع نفس الساعة مقابل 737؛ وحدة واحدة مُختبرة — قد تختلف الدفعات' },
        ],
    },
};
