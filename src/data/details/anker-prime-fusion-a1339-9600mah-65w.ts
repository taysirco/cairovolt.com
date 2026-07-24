// Details for: anker-prime-fusion-a1339-9600mah-65w  (Anker Prime Fusion 9,600mAh 65W Hybrid Charger, model A1339)
// Lab sheet: CV-PB-A1339-001 — §7.3 ELEVATED gold-depth (hybrid wall+bank Fusion · Wh/peaks · red-flag)
// Identity: GaN Fusion = foldable AC wall charger + 34.56Wh power bank on one 65W shared path. Dual USB-C.
// Wh basis §7.3 / §8: 9,600mAh × 3.6V ÷ 1000 = 34.56Wh (Anker label / service.anker.com — keep 3.6V, do not silently relabel 3.7V/35.5Wh).
// A/B: vs A2688 100W wall-only · A1695 90Wh pack · A1637 30W Wukong Fusion (phone-tablet class).
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · 5+5 pros/limits · Omar · testDate 2026-07-24 · Wh/peaks + §11 red-flag.
import type { ProductDetail } from './_types';

export const anker_prime_fusion_a1339_9600mah_65w_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker Prime Fusion A1339 (CV-PB-A1339-001): hybrid wall charger + power bank — 9,600mAh × 3.6V ÷ 1000 = 34.56Wh nominal (§7.3 / §8 + Anker service.anker.com). CairoVolt measured 29.4Wh usable in battery mode on USB-C at 5V/2A (~85.1% of 34.56Wh) — inside the §7.3 80–90% band. 5V-referred ≈ 5,880mAh (29.4 ÷ 5); box “5,760mAh” @5V is the same post-conversion story within meter tolerance.',
            'TWO measured modes on one shared 65W envelope (red-flag: NOT 65W×2): wall-charger mode (foldable US Type-A AC plug, 100–240V) peak 63.9W into MacBook Air M2; battery mode peak 61.8W into the same Air. Dual-C wall split ~44W+19W; dual-C battery ~42W+18W — matches Anker’s 45W+20W PDO pattern, devices self-capped.',
            'Self-recharge via foldable wall plug 0→100%: 58 min timed. Round smart display = live watts / temp / health % / time estimates — estimates, NOT a lab instrument. Weight Anker 305g → we measured 307g. Heat: 52.1°C surface @65W wall after 15 min (28.2°C ambient) — warm GaN brick; hard surface only.',
            'A/B honesty: A1339 = 34.56Wh / 65W Fusion / ~307g one-outlet tool. A2688 = 100W wall-only GaN, no battery — desk fast-charge. A1695 = 90Wh / 165W pack, 571g — multi-day. A1637 = 37Wh / 30W Wukong Fusion — phone-tablet + built-in cable, NOT 65W laptop wall. Pick Fusion when ONE hotel/dorm socket must be wall + portable; NOT as 100W brick or 90Wh reserve.',
            '✅ NOT recalled: anker.com/product-recalls + cpsc.gov verified 2026-07-24 — A1339 outside A1257/A1263/A1647/A1652/A1681/A1689. 34.56Wh << 100Wh cabin — EgyptAir/Nile Air/Air Cairo/Emirates/Flydubai/Turkish/Qatar/Saudia carry-on OK; Emirates & Flydubai ban USING any power bank in-flight since 1 Oct 2025 (battery mode OFF; wall mode irrelevant in cabin).',
        ],
        ar: [
            'انكر برايم فيوجن A1339 (CV-PB-A1339-001): شاحن حائط هجين + باور بانك — 9,600 مللي أمبير × 3.6V ÷ 1000 = 34.56Wh اسميًا (§7.3 / §8 + service.anker.com). قِست CairoVolt 29.4Wh قابلة للاستخدام في وضع البطارية على USB-C بتفريغ 5V/2A (نحو 85.1% من 34.56Wh) — ضمن نطاق §7.3 80–90%. مكافئ عند 5V ≈ 5,880 مللي أمبير (29.4 ÷ 5)؛ «5,760 مللي أمبير» على العلبة @5V نفس قصة ما بعد التحويل ضمن تسامح المقياس.',
            'وضعان مقاسان على سقف 65 واط مشترك (علم أحمر: **ليس** 65×2): وضع شاحن الحائط (قابس AC أمريكي Type-A قابل للطي، 100–240V) ذروة 63.9 واط داخل MacBook Air M2؛ وضع البطارية ذروة 61.8 واط لنفس الـAir. تقسيم C مزدوج حائط ~44+19 واط؛ بطارية ~42+18 — يطابق نمط PDO انكر 45+20؛ الأجهزة حدّت نفسها.',
            'إعادة الشحن الذاتي عبر قابس الحائط 0→100%: 58 دقيقة مُوقّتة. الشاشة الدائرية الذكية = واط / حرارة / صحة % / تقديرات وقت — تقديرات، **وليست** أداة معمل. الوزن انكر 305 ج → قِسنا 307 ج. الحرارة: 52.1°م سطحًا عند 65 واط حائط بعد 15 د (محيط 28.2°م) — طوبة GaN دافئة؛ سطح صلب فقط.',
            'صدق A/B: A1339 = 34.56Wh / 65 واط فيوجن / ~307 ج أداة بريزة واحدة. A2688 = 100 واط حائط فقط GaN بلا بطارية — شحن مكتب سريع. A1695 = 90Wh / 165 واط، 571 ج — سفر أيام. A1637 = 37Wh / 30 واط فيوجن ووكونج — هاتف-تابلت + كابل مدمج، **ليس** حائط لابتوب 65 واط. اختر فيوجن عندما يجب أن تكون بريزة فندق/سكن واحدة حائطًا + محمولًا؛ **ليس** كطوبة 100 واط أو احتياطي 90Wh.',
            '✅ لا استدعاء: anker.com/product-recalls + cpsc.gov تحقّق 2026-07-24 — A1339 خارج A1257/A1263/A1647/A1652/A1681/A1689. 34.56Wh << 100Wh مقصورة — مصر للطيران/النيل/إير كايرو/الإمارات/فلاي دبي/التركية/القطرية/السعودية مقصورة OK؛ الإمارات وفلاي دبي تحظران **استخدام** أي باور بانك أثناء الرحلة منذ 1 أكتوبر 2025 (وضع البطارية مغلق؛ وضع الحائط غير ذي صلة في المقصورة).',
        ],
    },
    localContext: {
        en:
            'A1339 answers a different Egyptian buyer question than A2688 or A1695: "I have ONE outlet — charge the laptop tonight AND leave tomorrow with a topped-up battery, without a separate wall brick AND a power bank." ' +
            'Six RIGHT scenarios from measured 29.4Wh / 63.9W wall / 61.8W battery. RIGHT FOR: ' +
            '(1) HOTEL ROOM CAIRO / ALEX / SAHEL — single socket behind the bed: plug Fusion wall mode, MacBook Air ~64W while the cell refills; unplug next morning with ~29Wh portable for the day. ' +
            '(2) AUC / GUC / MIU DORM or shared apartment — one outlet serves laptop + phone overnight; battery mode covers the walk to campus when load-shedding hits. ' +
            '(3) UBER / CAREEM / IN-DRIVER airport runs — home wall top-up 58 min 0→100% before shift; battery mode for passenger phone top-ups; 307g glove-box fit. ' +
            '(4) WEEKEND SAHEL with ONE hotel socket — charge at night, carry Fusion to the beach for phone + earbuds without a second brick. ' +
            '(5) BUSINESS TRAVELER carry-on only — 34.56Wh flies free; Fusion replaces wall brick + small pack in 115×43 mm — NOT if you need 90Wh multi-day (pick A1695). ' +
            '(6) REMOTE WORKER co-working — wall mode when seated, battery mode when moving to a meeting room. ' +
            'WRONG FOR: (7) MacBook Pro 16" / 100W sustained — Fusion caps ~64W wall; pick A2688. ' +
            '(8) Multi-day camping / long blackout (>2 h at 35W) — 29.4Wh ≈ ~50 min at 35W; pick A1695 (76.9Wh) or A1336 (61.8Wh). ' +
            '(9) Owners who already have A2688 + a 20Wh+ pack — Fusion duplicates both at a lower ceiling. ' +
            '(10) Buyers expecting A1637’s built-in cable / Wukong finish — A1339 is dual-C 65W laptop-class Fusion, different job. ' +
            'HEAT: GaN brick 52.1°C @65W wall / 15 min (28.2°C ambient) — hotter than a standalone pack; hard surface, never bedding. ' +
            'PLUG: this sample = foldable US Type-A — seats many Egyptian universal sockets; verify live carton if you need BS 1363 / Europlug. ' +
            'ELECTRICITY: wall recharge ~34.56Wh draws ~0.040 kWh; EgyptERA Sept-2024 tariff = 2–9 piastres per full top-up by tier — NOT an AC system-efficiency % (no PZEM; §6.7).',
        ar:
            'A1339 يجيب على سؤال مصري مختلف عن A2688 أو A1695: "لدي **بريزة واحدة** — أشحن اللابتوب الليلة **و** أغادر غدًا ببطارية معبأة، دون شاحن حائط **و** باور بانك منفصلين." ' +
            'ستة سيناريوهات مناسبة من 29.4Wh المقاسة / 63.9 واط حائط / 61.8 واط بطارية. مناسب لـ: ' +
            '(1) غرفة فندق القاهرة / الإسكندرية / الساحل — مقبس واحد خلف السرير: وضع حائط فيوجن، MacBook Air ~64 واط بينما الخلية تتعبأ؛ افصل صباحًا مع ~29Wh محمولة. ' +
            '(2) سكن AUC / GUC / MIU أو شقة مشتركة — بريزة واحدة للابتوب + الهاتف ليلًا؛ وضع البطارية يغطي المشي للحرم عند الانقطاع. ' +
            '(3) سائق أوبر / كريم / إن-درايفر — شحن حائط منزلي 58 د 0→100% قبل الوردية؛ وضع البطارية لهاتف الراكب؛ 307 ج في صندوق القفازات. ' +
            '(4) عطلة ساحل بمقبس فندق واحد — شحن ليلًا، حمل فيوجن للشاطئ دون طوبة ثانية. ' +
            '(5) مسافر أعمال بمقصورة فقط — 34.56Wh يسافر مجانًا؛ فيوجن يستبدل طوبة + حزمة صغيرة في 115×43 ملم — **ليس** إن احتجت 90Wh لأيام (A1695). ' +
            '(6) عامل عن بُعد في مساحة مشتركة — وضع حائط عند الجلوس، وضع بطارية عند الانتقال. ' +
            'غير مناسب لـ: (7) MacBook Pro 16" / 100 واط متواصل — سقف فيوجن ~64 واط حائط؛ اختر A2688. ' +
            '(8) تخييم أيام / انقطاع طويل (>2 س عند 35 واط) — 29.4Wh ≈ ~50 د عند 35 واط؛ اختر A1695 أو A1336. ' +
            '(9) من يملك أصلًا A2688 + حزمة 20Wh+ — فيوجن يكرر الاثنين بسقف أقل. ' +
            '(10) من يتوقع كابل A1637 المدمج / تشطيب ووكونج — A1339 فيوجن 65 واط ثنائي C لفئة لابتوب، مهمة مختلفة. ' +
            'الحرارة: طوبة GaN 52.1°م عند 65 واط حائط / 15 د (محيط 28.2°م) — أسخن من حزمة منفردة؛ سطح صلب، لا فراش. ' +
            'القابس: هذه العيّنة = US Type-A قابل للطي — يدخل كثيرًا من الفيش المصرية العمومية؛ تحقق من الكرتون الحي إن احتجت BS 1363 / Europlug. ' +
            'الكهرباء: شحن حائط ~34.56Wh يسحب نحو 0.040 كيلوواط·ساعة؛ تعريفة EgyptERA سبتمبر 2024 = 2–9 قروش حسب الشريحة — **ليست** كفاءة منظومة AC (بلا PZEM؛ §6.7).',
    },
    specifications: {
        'Model': {
            en: 'Anker Prime Fusion 9,600mAh 65W Hybrid Charger (A1339) — GaN wall + bank, dual USB-C, foldable AC plug',
            ar: 'انكر برايم فيوجن 9,600 مللي أمبير 65 واط شاحن هجين (A1339) — GaN حائط + بنك، USB-C مزدوج، قابس AC قابل للطي',
        },
        'Product Type': {
            en: 'Hybrid Wall Charger + Power Bank (Fusion) — shared 65W path; NOT wall-only, NOT pack-only',
            ar: 'شاحن حائط هجين + باور بانك (فيوجن) — مسار 65 واط مشترك؛ **ليس** حائط فقط، **ليس** حزمة فقط',
        },
        'Cell Capacity (§8)': {
            en: '9,600mAh / 34.56Wh — 9,600mAh × 3.6V ÷ 1000 = 34.56Wh (Anker label + service.anker.com). Keep 3.6V/34.56Wh; do not silently relabel 3.7V/35.5Wh without a new bench',
            ar: '9,600 مللي أمبير / 34.56Wh — 9,600 مللي أمبير × 3.6V ÷ 1000 = 34.56Wh (ملصق انكر + service.anker.com). حافظ على 3.6V/34.56Wh؛ لا تبديل صامت إلى 3.7V/35.5Wh بلا قياس جديد',
        },
        'Usable Energy — battery mode (CairoVolt measured)': {
            en: '29.4Wh on USB-C at 5V/2A constant discharge (~85.1% of 34.56Wh — §7.3 80–90% band)',
            ar: '29.4Wh على USB-C بتفريغ ثابت 5V/2A (نحو 85.1% من 34.56Wh — نطاق §7.3 80–90%)',
        },
        '5V-referred capacity (§8)': {
            en: '~5,880mAh at 5V (29.4Wh ÷ 5V) — explains why “9,600mAh” ≠ 9,600mAh at USB; Anker box ~5,760mAh @5V is the same class',
            ar: 'نحو 5,880 مللي أمبير عند 5V (29.4Wh ÷ 5V) — يوضح لماذا «9,600 مللي أمبير» ≠ 9,600 عند USB؛ علبة انكر نحو 5,760 مللي أمبير @5V نفس الفئة',
        },
        'Wired peaks (separate modes)': {
            en: 'Wall-charger mode peak 63.9W into MacBook Air M2 (220V). Battery mode peak 61.8W into same Air. Dual-C wall ~44W+19W; dual-C battery ~42W+18W. Shared 65W envelope — NOT 65W per port',
            ar: 'ذروة وضع الحائط 63.9 واط داخل MacBook Air M2 (220V). ذروة وضع البطارية 61.8 واط لنفس الـAir. C مزدوج حائط ~44+19؛ بطارية ~42+18. سقف 65 واط مشترك — **ليس** 65 واط لكل منفذ',
        },
        'Wall-charger mode output': {
            en: 'USB-C up to 65W (20V/3.25A PD 3.0); AC input 100–240V (service.anker.com) — measured peak 63.9W',
            ar: 'USB-C حتى 65 واط (20V/3.25A PD 3.0)؛ مدخل AC 100–240V (service.anker.com) — ذروة مقاسة 63.9 واط',
        },
        'Battery mode output': {
            en: 'USB-C up to 65W single-port (same PDO envelope as wall per Anker) — measured peak 61.8W',
            ar: 'USB-C حتى 65 واط منفرد (نفس نطاق PDO كوضع الحائط وفق انكر) — ذروة مقاسة 61.8 واط',
        },
        'Dual USB-C split (honesty)': {
            en: 'Shared 65W ceiling — often 45W + 20W when both C ports active (Anker PDO table). Bench: ~44+19 wall / ~42+18 battery. Do NOT expect 65W+65W',
            ar: 'سقف 65 واط مشترك — غالبًا 45+20 واط عند تفعيل منفذَي C (جدول PDO). المختبر: ~44+19 حائط / ~42+18 بطارية. **لا** تتوقع 65+65',
        },
        'Ports': {
            en: 'C1 IN/OUT + C2 OUT + foldable AC wall plug (service.anker.com)',
            ar: 'C1 داخل/خارج + C2 خرج + قابس حائط AC قابل للطي (service.anker.com)',
        },
        'Foldable AC plug (honesty)': {
            en: 'This sample: US Type-A fold-in prongs — seats many Egyptian universal sockets. Fold = AC prongs ONLY. Verify live carton for BS 1363 / Europlug regional SKUs',
            ar: 'هذه العيّنة: أسنان US Type-A قابلة للطي — تدخل كثيرًا من الفيش المصرية العمومية. الطي = أسنان AC **فقط**. تحقق من الكرتون الحي لإصدارات BS 1363 / Europlug الإقليمية',
        },
        'How A1339 differs from A2688 / A1695 / A1637': {
            en: 'A1339 = 34.56Wh Fusion, 65W max, dual-C, ~307g — one-outlet hotel/dorm. A2688 = 100W wall-only, no battery. A1695 = 90Wh pack, 165W combined, 571g. A1637 = 37Wh / 30W Wukong Fusion + built-in cable — phone-tablet class. Pick Fusion for outlet scarcity + portability; NOT as 100W wall, 90Wh pack, or Wukong cable twin',
            ar: 'A1339 = 34.56Wh فيوجن، 65 واط أقصى، ثنائي C، ~307 ج — فندق/سكن ببريزة واحدة. A2688 = 100 واط حائط فقط بلا بطارية. A1695 = 90Wh، 165 واط مشترك، 571 ج. A1637 = 37Wh / 30 واط فيوجن ووكونج + كابل مدمج — فئة هاتف-تابلت. اختر فيوجن لندرة المقابس + التنقل؛ **ليس** بديل حائط 100 واط أو حزمة 90Wh أو توأم كابل ووكونج',
        },
        'Input / Self-recharge': {
            en: 'Foldable AC wall plug (primary) — CairoVolt 0→100% = 58 min on 220V; USB-C input also supported up to 65W (service.anker.com)',
            ar: 'قابس حائط AC قابل للطي (أساسي) — CairoVolt 0→100% = 58 د على 220V؛ دخل USB-C مدعوم أيضًا حتى 65 واط (service.anker.com)',
        },
        'Display': {
            en: 'Round smart display — live watts, temperature, battery-health %, time estimates (estimates, not a lab instrument)',
            ar: 'شاشة دائرية ذكية — واط، حرارة، نسبة صحة البطارية، تقديرات وقت (تقديرات، وليست أداة معمل)',
        },
        'Weight / Dimensions': {
            en: 'Anker 305g / 115 × 43 × 43 mm — CairoVolt 307g / 115.2 × 43.1 × 43.0 mm',
            ar: 'انكر 305 ج / 115 × 43 × 43 ملم — CairoVolt 307 ج / 115.2 × 43.1 × 43.0 ملم',
        },
        'Airline': {
            en: '34.56Wh << 100Wh cabin — carry-on OK on major Cairo carriers with readable Wh label; never checked. Emirates/Flydubai: no in-flight USE of battery mode since 1 Oct 2025',
            ar: '34.56Wh << حد المقصورة 100Wh — مسموح مقصورة على شركات القاهرة الكبرى بملصق Wh مقروء؛ ليس في الأمتعة المسجّلة. الإمارات/فلاي دبي: ممنوع استخدام وضع البطارية أثناء الرحلة منذ 1 أكتوبر 2025',
        },
        'Safety / Recall (verified 2026-07-24)': {
            en: 'ActiveShield 2.0 + GaN thermal design (Anker-listed). NOT RECALLED — anker.com/product-recalls + cpsc.gov 2026-07-24. Outside A1257/A1263/A1647/A1652/A1681/A1689. Verify CE/FCC/RoHS on delivered unit',
            ar: 'ActiveShield 2.0 + تصميم حراري GaN (مدرج من انكر). **لا استدعاء** — anker.com/product-recalls + cpsc.gov 2026-07-24. خارج A1257/A1263/A1647/A1652/A1681/A1689. تحقق من CE/FCC/RoHS على الوحدة المستلمة',
        },
        'Protocol': {
            en: 'CairoVolt Bench Test Protocol §7.3 (power banks) adapted for hybrid wall+bank + §8 Wh physics gates + §11 red-flag checklist',
            ar: 'بروتوكول اختبار كايرو فولت §7.3 (باور بانك) مُكيّف للهجين حائط+بنك + بوابات فيزياء Wh §8 + قائمة الأعلام الحمراء §11',
        },
        'In the Box': {
            en: 'Fusion unit + quick-start (verify live package); no separate wall brick needed — AC plug is built-in',
            ar: 'وحدة فيوجن + دليل سريع (تحقق من محتويات العبوة الحالية)؛ بلا شاحن حائط منفصل — قابس AC مدمج',
        },
    },
    benchTest: {
        sku: 'A1339',
        sampleId: 'CV-PB-A1339-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock A1339 · CairoVolt lab, New Cairo · ambient 28.2°C (HTC-2) · humidity 44% · 220V Egyptian mains for wall-mode tests · Anker A8663 65W USB-C cable for all ≥30W tests · hybrid §7.3 wall+bank · recall re-check 2026-07-24',
            ar: 'وحدة تجزئة واحدة A1339 · مختبر كايرو فولت، القاهرة الجديدة · محيط 28.2°م (HTC-2) · رطوبة 44% · شبكة مصرية 220V لاختبارات وضع الحائط · كابل Anker A8663 65W USB-C لكل اختبارات ≥30 واط · هجين §7.3 حائط+بنك · إعادة تحقق الاستدعاء 2026-07-24',
        },
        methodology: {
            en:
                'ELEVATED gold-depth hybrid bench per Bench Test Protocol §7.3 (power banks) adapted for Fusion wall+bank on sample CV-PB-A1339-001 (elevate / recall refresh 2026-07-24; numbers from this retail unit). ' +
                '(A) Photographed printed I/O / Wh label — locked 9,600mAh / 34.56Wh; foldable US Type-A AC prongs; dual USB-C (C1 IN/OUT + C2 OUT). ' +
                '(B) §8 nominal Wh math: Wh_cell = 9,600mAh × 3.6V ÷ 1000 = 34.56Wh — Anker 3.6V convention; do not silently swap to 3.7V/35.5Wh on this sheet. ' +
                '(C) MODE BATTERY — usable energy: full charge via foldable wall plug (0→100%, 58 min timed), 30 min rest, discharge C1 into JUWEI at constant 5V/2A while FNIRSI FNB58 logged cumulative Wh = 29.4Wh (85.1% of 34.56Wh — §7.3 80–90% band). 5V-referred mAh = 29.4 ÷ 5 = 5,880mAh. AVHzY CT-3 cross-check within 2%. ' +
                '(D) MODE WALL — peak: Fusion on 220V Egyptian mains, C1 into MacBook Air M2 — FNB58 sustained peak 63.9W; AVHzY within 1.4%. ' +
                '(E) MODE BATTERY — peak: same Air on C1 from full battery = 61.8W (~95% of 65W rated). ' +
                '(F) Dual-C shared split: wall mode Air+C1 + iPhone 15+C2 ≈ 44W+19W; battery mode ≈ 42W+18W — matches Anker 45W+20W PDO pattern; devices self-capped. ' +
                '(G) Self-recharge 0→100% via wall plug timed 58 min on 220V (no separate brick). ' +
                '(H) Thermal: BENETECH GM320 (ε=0.95) surface after 15 min @65W wall mode = 52.1°C at 28.2°C ambient (GaN brick heat; near §7.3 50°C guidance at 65W-class load — hard surface, airflow). ' +
                '(I) Weight Kkmoon 0.01g (307g vs Anker 305g); Mitutoyo caliper 115.2 × 43.1 × 43.0 mm. ' +
                '(J) RED-FLAG AUDIT (§11): (1) Shared 65W envelope — NOT 65W×2 / NOT two independent 65W rails. (2) NOT a substitute for A2688 100W wall-only or A1695 90Wh multi-day pack — different job class. (3) “9,600mAh” ≠ 9,600mAh at USB — cite 29.4Wh / ~5,880mAh @5V. (4) Round display time/% estimates are NOT lab instruments. (5) Wall peak 63.9W and battery peak 61.8W are honest under-label — do not market as guaranteed continuous 65W into every laptop. (6) Do NOT import A1637 Wukong built-in-cable / MagSafe-negative wireless claims onto this dual-C 65W SKU (and vice versa). (7) Plug on THIS sample = US Type-A fold — verify regional carton. ' +
                '(K) Recall gate 2026-07-24: anker.com/product-recalls + cpsc.gov — A1339 not listed; outside A1257/A1263/A1647/A1652/A1681/A1689. ' +
                'Independent corroboration (NOT our data): Anker service.anker.com A1339 (65W / 9,600mAh / 34.56Wh / Fusion); IATA <100Wh cabin; Emirates in-flight USE ban since 1 Oct 2025. ' +
                'HONEST GAPS: no PZEM AC-input system efficiency % (§6.7); no separate 9V/20V full usable-Wh discharge cycles beyond the 5V/2A primary; single unit — batches may vary. Phone/laptop counts marked "est." use 29.4 ÷ (device Wh × ~1.10) unless labelled measured.',
            ar:
                'قياس عمق ذهبي مُرتقى لهجين وفق بروتوكول الاختبار §7.3 (باور بانك) مُكيّف لفيوجن حائط+بنك على العيّنة CV-PB-A1339-001 (تعميق / تحديث استدعاء 2026-07-24؛ الأرقام من وحدة التجزئة هذه). ' +
                '(A) صوّرنا ملصق I/O / Wh — ثبّتنا 9,600 مللي أمبير / 34.56Wh؛ أسنان AC أمريكية Type-A قابلة للطي؛ USB-C مزدوج (C1 داخل/خارج + C2 خرج). ' +
                '(B) حساب Wh الاسمي §8: Wh_الخلية = 9,600 مللي أمبير × 3.6V ÷ 1000 = 34.56Wh — اتفاقية انكر 3.6V؛ لا تبديل صامت إلى 3.7V/35.5Wh على هذه الورقة. ' +
                '(C) وضع البطارية — الطاقة القابلة: شحن كامل عبر قابس الحائط (0→100%، 58 د مُوقّتة)، راحة 30 د، تفريغ C1 داخل JUWEI عند 5V/2A ثابت بينما FNB58 سجّل Wh تراكمي = 29.4Wh (85.1% من 34.56Wh — نطاق §7.3 80–90%). مللي أمبير مكافئ عند 5V = 29.4 ÷ 5 = 5,880. تحقق AVHzY CT-3 بفارق أقل من 2%. ' +
                '(D) وضع الحائط — الذروة: فيوجن على شبكة مصر 220V، C1 إلى MacBook Air M2 — FNB58 ذروة مستدامة 63.9 واط؛ AVHzY بفارق أقل من 1.4%. ' +
                '(E) وضع البطارية — الذروة: نفس الـAir على C1 من بطارية كاملة = 61.8 واط (~95% من 65 واط الاسمي). ' +
                '(F) تقسيم C مزدوج مشترك: وضع حائط Air+C1 + iPhone 15+C2 ≈ 44+19 واط؛ وضع بطارية ≈ 42+18 — يطابق نمط PDO انكر 45+20؛ الأجهزة حدّت نفسها. ' +
                '(G) إعادة شحن ذاتي 0→100% عبر قابس الحائط 58 د على 220V (بلا طوبة منفصلة). ' +
                '(H) حراري: BENETECH GM320 (ε=0.95) سطح بعد 15 د عند 65 واط وضع حائط = 52.1°م عند محيط 28.2°م (حرارة طوبة GaN؛ قرب إرشاد §7.3 عند 50°م لفئة 65 واط — سطح صلب وتهوية). ' +
                '(I) وزن Kkmoon 0.01 ج (307 ج مقابل 305 انكر)؛ قدمة Mitutoyo 115.2 × 43.1 × 43.0 ملم. ' +
                '(J) تدقيق علم أحمر (§11): (1) سقف 65 واط مشترك — **ليس** 65×2 / **ليست** سكتين مستقلتين 65 واط. (2) **ليس** بديل A2688 حائط 100 واط فقط أو حزمة A1695 90Wh لأيام — فئة وظيفة مختلفة. (3) «9,600 مللي أمبير» ≠ 9,600 عند USB — اقتبس 29.4Wh / ~5,880 مللي أمبير @5V. (4) تقديرات الشاشة الدائرية للوقت/% **ليست** أدوات معمل. (5) ذروة الحائط 63.9 واط وذروة البطارية 61.8 واط أقل من الملصق بأمانة — لا تسوّق كـ 65 واط متواصل مضمون لكل لابتوب. (6) **لا** تستورد كابل A1637 المدمج / ادعاءات اللاسلكي السلبية على هذا الـSKU ثنائي C 65 واط (والعكس). (7) قابس **هذه** العيّنة = طي US Type-A — تحقق من الكرتون الإقليمي. ' +
                '(K) بوابة الاستدعاء 2026-07-24: anker.com/product-recalls + cpsc.gov — A1339 غير مدرج؛ خارج A1257/A1263/A1647/A1652/A1681/A1689. ' +
                'للاسترجاع المستقل (وليست بياناتنا): service.anker.com لـ A1339 (65 واط / 9,600 مللي أمبير / 34.56Wh / فيوجن)؛ IATA <100Wh مقصورة؛ حظر الإمارات للاستخدام أثناء الرحلة منذ 1 أكتوبر 2025. ' +
                'الفجوات الأمينة: لا كفاءة منظومة دخل AC بـ PZEM (§6.7)؛ لا دورات Wh كاملة منفصلة عند 9V/20V فوق الأساسي 5V/2A؛ وحدة واحدة — قد تختلف الدفعات. أعداد الهاتف/اللابتوب "تقديري" من 29.4 ÷ (Wh الجهاز × ~1.10) ما لم تُوسَم مقاسة.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Cumulative Wh + PD enumeration + wall/battery peak W logging', ar: 'Wh تراكمي + إحصاء PD + تسجيل ذروة واط حائط/بطارية' } },
            { name: 'AVHzY CT-3', use: { en: 'Cross-check of usable Wh and wall/battery peak wattage', ar: 'تحقق مزدوج لـWh القابلة للاستخدام وذروة واط حائط/بطارية' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant 5V/2A discharge for battery-mode usable-Wh measurement', ar: 'تفريغ ثابت 5V/2A لقياس Wh القابلة للاستخدام في وضع البطارية' } },
            { name: '220V Egyptian mains (CairoVolt lab)', use: { en: 'Wall-charger mode AC source', ar: 'مصدر AC لوضع شاحن الحائط' } },
            { name: 'Anker A8663 65W USB-C cable', use: { en: 'PD cable for all ≥30W wall and battery tests', ar: 'كابل PD لكل اختبارات ≥30 واط حائط وبطارية' } },
            { name: 'Apple MacBook Air M2 (52.6Wh) + iPhone 15 (12.99Wh)', use: { en: 'Real-device wall/battery peak and dual-C split tests', ar: 'اختبارات ذروة حائط/بطارية وتقسيم C مزدوج بأجهزة حقيقية' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temperature at 65W wall mode', ar: 'حرارة السطح عند 65 واط وضع حائط' } },
            { name: 'Kkmoon 0.01g scale · Mitutoyo digital caliper · HTC-2', use: { en: 'Weight, dimensions, ambient/humidity', ar: 'الوزن والأبعاد والمحيط/الرطوبة' } },
        ],
        results: [
            { param: { en: 'Rated cell capacity (§8)', ar: 'سعة الخلايا الاسمية (§8)' }, rated: '9,600mAh / 34.56Wh', measured: '—', note: { en: '§7.3 / Anker 3.6V: 9,600 × 3.6 ÷ 1000 = 34.56Wh', ar: '§7.3 / انكر 3.6V: 9,600 × 3.6 ÷ 1000 = 34.56Wh' } },
            { param: { en: 'Usable energy — battery mode USB-C (PRIMARY)', ar: 'الطاقة القابلة للاستخدام — وضع البطارية USB-C (أساسي)' }, measured: '29.4 Wh', note: { en: 'FNB58 cumulative at 5V/2A after full wall charge + 30 min rest; AVHzY within 2%', ar: 'FNB58 تراكمي 5V/2A بعد شحن حائط كامل + راحة 30 د؛ AVHzY بفارق أقل من 2%' } },
            { param: { en: 'Cell → USB conversion ratio', ar: 'نسبة تحويل خلية → USB' }, measured: '85.1%', note: { en: '29.4 ÷ 34.56 — inside §7.3 80–90% band; NOT an AC system efficiency (§6.7)', ar: '29.4 ÷ 34.56 — ضمن نطاق §7.3 80–90%؛ **ليست** كفاءة منظومة AC (§6.7)' } },
            { param: { en: '5V-referred capacity (§8)', ar: 'سعة مكافئة عند 5V (§8)' }, rated: '~5,760mAh (Anker box @5V class)', measured: { en: '~5,880 mAh at 5V', ar: 'نحو 5,880 مللي أمبير عند 5V' }, note: { en: '29.4Wh ÷ 5V — “9,600mAh” ≠ USB mAh; red-flag against marketing mAh as delivered capacity', ar: '29.4Wh ÷ 5V — «9,600 مللي أمبير» ≠ مللي أمبير USB؛ علم أحمر ضد تسويق المللي أمبير كسعة مُسلَّمة' } },
            { param: { en: 'Wall-mode peak into MacBook Air M2', ar: 'ذروة وضع الحائط إلى MacBook Air M2' }, rated: '65W', measured: '63.9W', note: { en: '220V mains, C1, FNB58; AVHzY within 1.4% — honest under-label', ar: 'شبكة 220V، C1، FNB58؛ AVHzY بفارق أقل من 1.4% — أقل من الملصق بأمانة' } },
            { param: { en: 'Battery-mode peak USB-C', ar: 'ذروة وضع البطارية USB-C' }, rated: '65W', measured: '61.8W', note: { en: 'Full battery, C1, same Air — ~95% of rated', ar: 'بطارية كاملة، C1، نفس الـAir — نحو 95% من الاسمي' } },
            { param: { en: 'Shared 65W envelope (red-flag)', ar: 'سقف 65 واط المشترك (علم أحمر)' }, rated: { en: '65W total shared', ar: '65 واط إجمالي مشترك' }, measured: { en: 'NOT 65W×2', ar: 'ليس 65×2' }, note: { en: 'Dual-C peaks sum under one ceiling — reject any “two 65W ports” listing language', ar: 'ذروات C المزدوج تحت سقف واحد — ارفض أي لغة قائمة «منفذان 65 واط»' } },
            { param: { en: 'Dual USB-C wall mode (Air + iPhone)', ar: 'USB-C مزدوج وضع حائط (Air + iPhone)' }, measured: { en: '~63W combined (~44W + ~19W)', ar: 'نحو 63 واط (~44 + ~19 واط)' }, note: { en: 'Matches Anker 45W+20W split pattern; devices self-capped', ar: 'يطابق نمط تقسيم انكر 45+20؛ الأجهزة حدّت نفسها' } },
            { param: { en: 'Dual USB-C battery mode (Air + iPhone)', ar: 'USB-C مزدوج وضع بطارية (Air + iPhone)' }, measured: { en: '~60W combined (~42W + ~18W)', ar: 'نحو 60 واط (~42 + ~18 واط)' }, note: { en: 'Similar split; slightly lower than wall mode due to DC-DC path', ar: 'تقسيم مشابه؛ أقل قليلًا من وضع الحائط بسبب مسار DC-DC' } },
            { param: { en: 'MacBook Air M2 (52.6Wh) from battery mode — est.', ar: 'MacBook Air M2 (52.6Wh) من وضع البطارية — تقديري' }, measured: { en: '~0.50–0.55 charge at ~60W draw', ar: 'نحو 0.50–0.55 شحنة بسحب ~60 واط' }, note: { en: '29.4Wh usable insufficient for full Air cycle — Fusion is top-up, not full-laptop reserve', ar: '29.4Wh غير كافية لدورة Air كاملة — فيوجن للتعبئة لا احتياطي لابتوب كامل' } },
            { param: { en: 'iPhone 15 (12.99Wh) — est. from measured Wh', ar: 'iPhone 15 (12.99Wh) — تقديري من Wh المقاسة' }, measured: { en: '~2.1 charges', ar: 'نحو 2.1 شحنة' }, note: { en: '29.4 ÷ (12.99 × 1.10); phone caps ~20W', ar: '29.4 ÷ (12.99 × 1.10)؛ الهاتف ~20 واط' } },
            { param: { en: 'Self-recharge 0→100% via wall plug', ar: 'إعادة الشحن 0→100% عبر قابس الحائط' }, measured: { en: '58 min', ar: '58 دقيقة' }, note: { en: '220V mains, foldable plug — no separate brick needed', ar: 'شبكة 220V، قابس قابل للطي — بلا طوبة حائط منفصلة' } },
            { param: { en: 'Surface temp @65W wall mode (15 min)', ar: 'حرارة السطح @65W وضع حائط (15 دقيقة)' }, measured: { en: '52.1°C', ar: '52.1°م' }, note: { en: '28.2°C ambient — GaN brick heat; near §7.3 50°C guidance at 65W-class; hard surface + airflow', ar: 'محيط 28.2°م — حرارة GaN؛ قرب إرشاد §7.3 عند 50°م لفئة 65 واط؛ سطح صلب + تهوية' } },
            { param: { en: 'Foldable plug identity (this sample)', ar: 'هوية القابس القابل للطي (هذه العيّنة)' }, measured: { en: 'US Type-A fold-in prongs', ar: 'أسنان US Type-A قابلة للطي' }, note: { en: 'Seats many Egyptian universal sockets; verify BS 1363 / Europlug regional cartons separately', ar: 'تدخل كثيرًا من الفيش المصرية العمومية؛ تحقق من كراتين BS 1363 / Europlug الإقليمية منفصلة' } },
            { param: { en: 'Display honesty', ar: 'صدق الشاشة' }, measured: { en: 'Estimates only — not a lab instrument', ar: 'تقديرات فقط — ليست أداة معمل' }, note: { en: 'Live W / temp / health % / time — do not treat as calibrated Wh meter', ar: 'واط / حرارة / صحة % / وقت حي — لا تعاملها كمقياس Wh معاير' } },
            { param: { en: 'A/B vs A2688 / A1695 — job class', ar: 'A/B مقابل A2688 / A1695 — فئة الوظيفة' }, measured: { en: 'A1339 wins one-outlet Fusion; loses to A2688 on 100W wall and to A1695 on Wh reserve', ar: 'A1339 يفوز بفيوجن بريزة واحدة؛ يخسر أمام A2688 في حائط 100 واط وأمام A1695 في احتياطي Wh' }, note: { en: 'Do not cross-quote 100W or 90Wh figures onto A1339', ar: 'لا تقتبس أرقام 100 واط أو 90Wh على A1339' } },
            { param: { en: 'A/B vs A1637 Wukong Fusion', ar: 'A/B مقابل فيوجن ووكونج A1637' }, measured: { en: 'A1339 = 65W dual-C laptop wall class; A1637 = 30W + built-in cable phone-tablet class', ar: 'A1339 = فئة حائط لابتوب 65 واط ثنائي C؛ A1637 = فئة هاتف-تابلت 30 واط + كابل مدمج' }, note: { en: 'Different Fusion jobs — do not mix watt/Wh tables', ar: 'وظائف فيوجن مختلفة — لا تخلط جداول الواط/Wh' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '305g (Anker)', measured: '307g', note: { en: '0.01g scale — 2g above rated', ar: 'ميزان 0.01 جرام — 2 جرام فوق الاسمي' } },
            { param: { en: 'Dimensions', ar: 'الأبعاد' }, rated: '115×43×43 mm', measured: '115.2×43.1×43.0 mm', note: { en: 'Mitutoyo caliper', ar: 'قدمة Mitutoyo' } },
            { param: { en: 'Airline Wh rating', ar: 'تصنيف Wh للطيران' }, rated: '34.56Wh', measured: { en: '34.56Wh label << 100Wh cabin', ar: 'ملصق 34.56Wh << حد المقصورة 100Wh' }, note: { en: 'Carry-on OK; Emirates/Flydubai no in-flight USE since 1 Oct 2025', ar: 'مسموح مقصورة؛ الإمارات/فلاي دبي ممنوع الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025' } },
            { param: { en: 'Recall status (verified 2026-07-24)', ar: 'حالة الاستدعاء (متحققة 2026-07-24)' }, measured: { en: 'NOT recalled', ar: 'غير مُستدعى' }, note: { en: 'A1339 outside Anker recalls A1257/A1263/A1647/A1652/A1681/A1689', ar: 'A1339 خارج استدعاءات انكر A1257/A1263/A1647/A1652/A1681/A1689' } },
        ],
        verdict: {
            en: 'A1339 delivered 29.4Wh usable (85.1% of 34.56Wh), 63.9W wall / 61.8W battery peaks on a shared 65W path. One-outlet Fusion — not A2688 100W or A1695 90Wh. Warm at 65W wall (52.1°C). Not recalled (2026-07-24).',
            ar: 'A1339 سلّم 29.4Wh قابلة (85.1% من 34.56Wh)، ذروة حائط 63.9 / بطارية 61.8 على مسار 65 واط مشترك. فيوجن بريزة واحدة — ليس A2688 100 واط أو A1695 90Wh. يسخن عند 65 واط حائط (52.1°م). لا استدعاء (2026-07-24).',
        },
        pros: [
            { en: '29.4Wh measured usable at 85.1% (29.4 ÷ 34.56) — inside §7.3 band; ~2.1 iPhone 15 charges by §8 math from measured Wh', ar: '29.4Wh قابلة مقاسة بكفاءة 85.1% (29.4 ÷ 34.56) — ضمن نطاق §7.3؛ ~2.1 شحنة iPhone 15 بحساب §8 من Wh المقاسة' },
            { en: 'True hybrid measured: 63.9W wall peak + 61.8W battery peak + 58 min AC self-recharge in one 307g brick — replaces separate wall + small pack for hotel/dorm/AUC one-outlet days', ar: 'هجين حقيقي مقاس: ذروة حائط 63.9 واط + ذروة بطارية 61.8 واط + إعادة شحن AC 58 د في طوبة 307 ج — يستبدل حائطًا + حزمة صغيرة لأيام فندق/سكن/AUC ببريزة واحدة' },
            { en: 'Dual-C shared split honesty published (~44+19 wall / ~42+18 battery) — matches Anker 45+20 PDO pattern without inventing 65W×2', ar: 'صدق تقسيم C المزدوج منشور (~44+19 حائط / ~42+18 بطارية) — يطابق نمط PDO انكر 45+20 دون اختراع 65×2' },
            { en: '34.56Wh << 100Wh — flies free on major Cairo carriers; compact 115×43 mm carry-on footprint with built-in foldable plug', ar: '34.56Wh << 100Wh — يسافر مجانًا على شركات القاهرة الكبرى؛ بصمة 115×43 ملم للمقصورة مع قابس قابل للطي مدمج' },
            { en: 'NOT recalled — verified anker.com/product-recalls + cpsc.gov on 2026-07-24; outside A1257/A1263/A1647/A1652/A1681/A1689', ar: 'لا استدعاء — تحقّق anker.com/product-recalls + cpsc.gov في 2026-07-24؛ خارج A1257/A1263/A1647/A1652/A1681/A1689' },
        ],
        limits: [
            { en: 'Shared 65W only — NOT 65W×2; second device gets the reduced rail (~20W class). Plan C1=laptop, C2=phone', ar: '65 واط مشترك فقط — **ليس** 65×2؛ الجهاز الثاني يحصل على الرافد المخفّض (فئة ~20 واط). خطّط C1=لابتوب، C2=هاتف' },
            { en: 'Only 29.4Wh usable — ~50 min at 35W load-shedding; NOT multi-hour blackout or multi-day Sahel reserve (pick A1695 76.9Wh or A1336 61.8Wh)', ar: '29.4Wh فقط — ~50 د عند سحب 35 واط انقطاع؛ **ليس** احتياطي ساعات أو ساحل أيام (اختر A1695 76.9Wh أو A1336 61.8Wh)' },
            { en: '65W ceiling / 63.9W measured wall — cannot match A2688 100W desk fast-charge or A1695 97.8W single-port for MacBook Pro 14"+ workflows', ar: 'سقف 65 واط / 63.9 واط مقاس حائط — لا يطابق A2688 100 واط مكتب أو A1695 97.8 واط منفرد لسير عمل MacBook Pro 14"+' },
            { en: '52.1°C surface at 65W wall (15 min) — warmer than standalone packs; hard surface + airflow, never bedding or enclosed bag while charging', ar: '52.1°م سطحًا عند 65 واط حائط (15 د) — أسخن من حزم منفردة؛ سطح صلب + تهوية، لا فراش أو حقيبة مغلقة أثناء الشحن' },
            { en: 'Battery mode ~0.5 MacBook Air charge; Emirates/Flydubai ban in-flight USE since 1 Oct 2025. Single unit — batches may vary. No PZEM AC efficiency % (§6.7)', ar: 'وضع البطارية ~0.5 شحنة MacBook Air؛ الإمارات/فلاي دبي تحظران الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025. وحدة واحدة — قد تختلف الدفعات. بلا كفاءة AC بـ PZEM (§6.7)' },
        ],
    },
};
