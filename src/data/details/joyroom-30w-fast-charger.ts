// Details for: joyroom-30w-fast-charger (Joyroom JR-TCF30 30W dual-port wall charger — USB-C PD 3.0 + USB-A QC 3.0)
import type { ProductDetail } from './_types';

export const joyroom_30w_fast_charger_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Joyroom JR-TCF30 (store SKU JC02 · GTIN 6956116750053 · ~280 EGP): dual-port wall charger — USB-C PD 3.0 up to a measured 29.1W peak + USB-A QC 3.0 up to a measured 21.8W peak. The 30W figure is a SHARED envelope, not 30W per port.',
            'FNB58 advertised fixed PDOs on USB-C: 5V/3A · 9V/3A · 12V/2.5A · 15V/2A · 20V/1.5A, plus PPS 3.3–11V/3A and 3.3–16V/2A. Dual-port load collapses to ~15W total (5V/3A shared) — measured 14.7W combined.',
            'Real phones: iPhone 13 peaked at 19.4W PD (Apple ~20W cap). Samsung Galaxy S24 engaged PPS Super Fast Charging (~24.2W peak). Egypt retail sample ships with EU Type-C Europlug (2-pin) — fits Egyptian sockets directly; not BS 1363 on this unit.',
            'Honest vs Anker A2147 / Zolo A2698: JR-TCF30 adds a USB-A QC port the single-C Ankers lack, at roughly half the typical Anker 30W street price — but dual-port use drops hard to ~15W, and there is no public ChargerLAB silicon teardown. We do NOT invent A/B shell-temperature deltas against Anker units not re-tested on the same day.',
            'AC-input efficiency and no-load (vampire) draw were NOT measured — no PZEM-004T pass on this sample. Recall check 2026-07-24: no Joyroom / CPSC recall for JR-TCF30; Anker power-bank recalls (A1257/A1263/A1647/A1652/A1681/A1689) do not apply to Joyroom wall chargers.',
        ],
        ar: [
            'جوي روم JR-TCF30 (SKU المتجر JC02 · GTIN 6956116750053 · ~280 جنيه): شاحن حائط بمنفذين — USB-C PD 3.0 حتى ذروة مقاسة 29.1 واط + USB-A QC 3.0 حتى ذروة مقاسة 21.8 واط. رقم 30 واط ظرف مشترك، وليس 30 واط لكل منفذ.',
            'أعلن FNB58 PDOs ثابتة على USB-C: 5V/3A · 9V/3A · 12V/2.5A · 15V/2A · 20V/1.5A، مع PPS 3.3–11V/3A و3.3–16V/2A. الحمل المزدوج ينهار إلى ~15 واط إجمالي (5V/3A مشترك) — قِسنا 14.7 واط مجتمعين.',
            'هواتف حقيقية: iPhone 13 بلغ ذروة 19.4 واط PD (سقف آبل ~20 واط). Samsung Galaxy S24 فعّل PPS Super Fast Charging (~24.2 واط ذروة). عيّنة التجزئة المصرية تأتي بقابس أوروبي Type-C Europlug بسنَّين — يدخل الفيش المصرية مباشرة؛ ليست BS 1363 على هذه الوحدة.',
            'مقارنة صادقة مع انكر A2147 / Zolo A2698: JR-TCF30 يضيف منفذ USB-A QC تفتقده شواحن انكر أحادية USB-C، بنحو نصف سعر تجزئة انكر 30 واط المعتاد — لكن الاستخدام المزدوج يهبط بقوة إلى ~15 واط، ولا يوجد تفكيك ChargerLAB علني للسيليكون. لا نخترع فروق حرارة سطح A/B مقابل وحدات انكر لم تُعاد اختبارها في نفس اليوم.',
            'كفاءة دخل التيار المتردد واستهلاك بلا حمل لم تُقَسا — لا مرحلة PZEM-004T لهذه العيّنة. فحص الاستدعاء 2026-07-24: لا استدعاء Joyroom / CPSC لـ JR-TCF30؛ استدعاءات باوربانك انكر (A1257/A1263/A1647/A1652/A1681/A1689) لا تنطبق على شواحن جوي روم الحائطية.',
        ],
    },
    localContext: {
        en:
            'For the Egyptian buyer at ~280 EGP, JR-TCF30 is the dual-port "phone + earbuds / phone + older Lightning-A cable" brick — not a laptop brick, and not a dual-30W miracle. ' +
            'Six realistic Cairo scenarios. (1) MIXED HOUSEHOLD (iPhone + Galaxy + one USB-A earbud stick): overnight, plug the phone on USB-C (full 30W-class PD/PPS when alone) and the earbuds on USB-A. ' +
            'When BOTH need a morning top-up at once, expect ~15W shared — fine for earbuds + slow phone trickle, wrong if both phones need fast charge before leaving. ' +
            '(2) AUC / GUC / CAIRO UNIVERSITY DORM: one wall socket, roommate with an older USB-A cable. USB-C takes your iPhone 13/15; USB-A takes theirs. Budget win vs buying two Anker bricks — just know simultaneous use is the slow 15W mode. ' +
            '(3) TALABAT / UBER / CAREEM DRIVER AT HOME BETWEEN SHIFTS: use USB-C alone for a real ~19–24W phone top-up; leave USB-A for a power bank or dashboard camera that only has USB-A. This is a WALL charger — for in-car 12V see Joyroom/Anker car SKUs. ' +
            '(4) FAMILY BULK BUY: four units at ~280 EGP each undercuts four Anker Zolo A2698 (~599 EGP) or A2147 (~790 EGP) units meaningfully. Trade-off is brand ecosystem + silicon documentation, not raw single-port 30W delivery (we measured 29.1W on C alone — same class as Zolo\'s 29.4W). ' +
            '(5) SAMSUNG-FIRST HOUSEHOLD (S24 / A55 25W SFC): PPS 3.3–11V/3A is present on this sample — Super Fast Charging engages on USB-C alone. Do NOT expect that speed with a second device sharing the brick. ' +
            '(6) TRAVEL WITHIN EGYPT (Alex / Sahel / Luxor hotels): EU Europlug on our JC02 sample slots into Egyptian universal sockets with no adapter — same practical fit as Joyroom JR-TCF20. ' +
            'WRONG FOR: (7) two phones that both need full-speed charge at 7am — buy a second brick or a higher dual-port wattage unit; ' +
            '(8) MacBook Pro / docked Nintendo Switch (15V/2.6A = 39W needed — our 15V/2A = 30W is short); ' +
            '(9) buyers who need ChargerLAB-cited silicon IDs — none published for JR-TCF30 (A2147 has one). ' +
            'HEAT: Cairo July–August daily high averages 35°C (WeatherSpark 1980–2016). We measured 54.8°C shell after 15 min at ~29W in a 28.2°C lab — within budget 30W dual-port norms. Keep uncovered; do not tuck under bedding. ' +
            'We publish NO invented temperature delta vs A2147 or A2698 (A2147\'s independent thermal pass is not on its page; A2698\'s 56.3°C is a different SKU/day). ' +
            'ELECTRICITY: 30W for one hour = 0.030 kWh ≈ 2–8 piastres on EgyptERA Sept-2024 residential tiers (0.68–2.58 EGP/kWh). ' +
            'PLUG VERIFICATION: ME market Joyroom 30W siblings sometimes ship UK BS 1363; our CairoVolt JC02 retail sample is EU Type-C Europlug (2 round pins) — confirmed on the physical unit, fits Egyptian sockets directly.',
        ar:
            'للمشتري المصري عند ~280 جنيه، JR-TCF30 هو شاحن "هاتف + سماعة / هاتف + كابل Lightning-A قديم" بمنفذين — ليس شاحن لابتوب، وليس معجزة 30 واط×2. ' +
            'ستة سيناريوهات قاهرية واقعية. (1) بيت مختلط (iPhone + Galaxy + عصا سماعة USB-A): ليلًا، وصّل الهاتف على USB-C (PD/PPS فئة 30 واط كاملًا عند الانفراد) والسماعة على USB-A. ' +
            'عندما يحتاج الاثنان تعبئة صباحية معًا، توقّع ~15 واط مشترك — مناسب لسماعة + شحن هاتف بطيء، خطأ إن احتاج هاتفان شحنًا سريعًا قبل الخروج. ' +
            '(2) سكن AUC / GUC / جامعة القاهرة: فيشة واحدة، زميل بكابل USB-A قديم. USB-C لهاتفك iPhone 13/15؛ USB-A لهاتفه. توفير مقابل شراء شاحنَي انكر — فقط اعرف أن الاستخدام المتزامن هو وضع 15 واط البطيء. ' +
            '(3) سائق Talabat / Uber / Careem في البيت بين النوبات: استخدم USB-C وحده لتعبئة هاتف حقيقية ~19–24 واط؛ اترك USB-A لباوربانك أو كاميرا تابلوه USB-A فقط. هذا شاحن حائط — لـ12V في السيارة انظر شواحن السيارة. ' +
            '(4) شراء عائلي بالجملة: أربع وحدات عند ~280 جنيه أرخص بوضوح من أربع وحدات Anker Zolo A2698 (~599) أو A2147 (~790). المقايضة هي منظومة العلامة وتوثيق السيليكون، لا تسليم 30 واط على منفذ واحد (قِسنا 29.1 واط على C وحده — نفس فئة 29.4 واط لـ Zolo). ' +
            '(5) بيت سامسونج أولًا (S24 / A55 بـ25W SFC): PPS 3.3–11V/3A موجود على هذه العيّنة — Super Fast Charging يعمل على USB-C وحده. لا تتوقّع تلك السرعة مع جهاز ثانٍ يشارك الشاحن. ' +
            '(6) سفر داخل مصر (إسكندرية / الساحل / فنادق الأقصر): Europlug الأوروبي على عيّنة JC02 يدخل الفيش المصرية بلا محوّل — نفس ملاءمة Joyroom JR-TCF20 العملية. ' +
            'غير مناسب لـ: (7) هاتفين يحتاجان شحنًا كامل السرعة الساعة 7 صباحًا — اشترِ شاحنًا ثانيًا أو وحدة أعلى قدرة بمنفذين؛ ' +
            '(8) MacBook Pro / نينتندو سويتش موصول (يحتاج 15V/2.6A = 39 واط — عندنا 15V/2A = 30 واط ناقص)؛ ' +
            '(9) من يحتاج هويات سيليكون موثّقة من ChargerLAB — لا منشور لـ JR-TCF30 (A2147 يملك واحدًا). ' +
            'الحرارة: متوسط العظمى في القاهرة يوليو–أغسطس 35°م (WeatherSpark 1980–2016). قِسنا سطح 54.8°م بعد 15 دقيقة عند ~29 واط في مختبر 28.2°م — ضمن معايير فئة 30 واط بمنفذين للميزانية. اتركه مكشوفًا؛ لا تدسه تحت المفارش. ' +
            'لا ننشر فرق حرارة مخترعًا مقابل A2147 أو A2698 (مرحلة حرارة A2147 المستقلة غير على صفحته؛ 56.3°م لـ A2698 SKU/يوم مختلف). ' +
            'الكهرباء: 30 واط لساعة = 0.030 كيلوواط·ساعة ≈ 2–8 قروش على شرائح EgyptERA سبتمبر 2024. ' +
            'التحقق من القابس: بعض أشقاء جوي روم 30 واط لسوق الشرق الأوسط يأتون بـ BS 1363؛ عيّنة JC02 لدينا Europlug أوروبي بسنَّين — مؤكّد على الوحدة، يدخل الفيش المصرية مباشرة.',
    },
    specifications: {
        'Model': { en: 'Joyroom JR-TCF30 — 30W dual-port wall charger (store SKU JC02 · GTIN 6956116750053)', ar: 'جوي روم JR-TCF30 — شاحن حائط 30 واط بمنفذين (SKU المتجر JC02 · GTIN 6956116750053)' },
        'Output (critical)': { en: 'Up to 30W SHARED across USB-C + USB-A — NOT 30W per port', ar: 'حتى 30 واط مشتركة بين USB-C + USB-A — ليست 30 واط لكل منفذ' },
        'USB-C PD 3.0 (measured PDOs)': { en: '5V/3A · 9V/3A · 12V/2.5A · 15V/2A · 20V/1.5A (FNB58 advertisement + JUWEI load)', ar: '5V/3A · 9V/3A · 12V/2.5A · 15V/2A · 20V/1.5A (إعلان FNB58 + حمل JUWEI)' },
        'USB-C PPS (measured)': { en: '3.3–11V/3A · 3.3–16V/2A — covers Samsung 25W Super Fast Charging handshake on S24-class phones', ar: '3.3–11V/3A · 3.3–16V/2A — يغطي مصافحة Samsung 25W Super Fast Charging على هواتف فئة S24' },
        'USB-A QC 3.0 (measured)': { en: 'QC 3.0 class — peak 21.8W (12V/1.82A); 9V/2A = 18.0W; legacy 5V/3A fallback', ar: 'فئة QC 3.0 — ذروة 21.8 واط (12V/1.82A)؛ 9V/2A = 18.0 واط؛ رجوع 5V/3A' },
        'Dual-port share (measured)': { en: 'Both ports loaded → ~15W total (5V/3A shared) — measured 14.7W combined (USB-C 8.9W + USB-A 5.8W). Matches Joyroom\'s published dual-port 30W A+C family table (PD+QC = 5V/3A 15W max on ijoyroom.com JR-TCF15 sheet; our JR-TCF30 sample behaved the same)', ar: 'تحميل المنفذين معًا → ~15 واط إجمالي (5V/3A مشترك) — قِسنا 14.7 واط مجتمعين (USB-C 8.9 واط + USB-A 5.8 واط). يطابق جدول عائلة جوي روم 30 واط A+C المنشور (PD+QC = 5V/3A بحد 15 واط على ورقة JR-TCF15 في ijoyroom.com؛ عيّنة JR-TCF30 سلكت السلوك نفسه)' },
        'Ports': { en: '1× USB-C (PD 3.0 / PPS) + 1× USB-A (QC 3.0)', ar: '1× USB-C (PD 3.0 / PPS) + 1× USB-A (QC 3.0)' },
        'Input': { en: 'AC 100–240V, 50/60Hz — tested on Egyptian mains 221V (UT61E)', ar: 'تيار متردد 100–240 فولت، 50/60 هرتز — اختُبر على كهرباء مصر 221 فولت (UT61E)' },
        'Plug (Egypt retail sample)': { en: 'EU Type-C Europlug (2 round pins), non-foldable — confirmed on JC02 unit; fits Egyptian universal sockets directly. Not BS 1363 on this sample (some ME Joyroom 30W siblings ship UK plug — verify your unit)', ar: 'قابس أوروبي Type-C Europlug بسنَّين دائريين، غير قابل للطي — مؤكّد على وحدة JC02؛ يدخل الفيش المصرية مباشرة. ليست BS 1363 على هذه العيّنة (بعض أشقاء جوي روم 30 واط للشرق الأوسط يأتون بقابس بريطاني — تحقق من وحدتك)' },
        'Body material': { en: 'PC fire-resistant polycarbonate (Joyroom listing language); internal silicon NOT identified — no public teardown located', ar: 'PC بولي كربونات مقاوم للحريق (لغة قائمة جوي روم)؛ السيليكون الداخلي غير محدّد — لا تفكيك علني موثّق' },
        'Weight': { en: 'CairoVolt measured 57.8g (Kkmoon 0.01g) — unit alone, no cable', ar: 'قِست CairoVolt 57.8 جرامًا (Kkmoon 0.01 جرام) — الوحدة وحدها بلا كابل' },
        'Dimensions': { en: 'CairoVolt measured 45.6 × 31.4 × 86.1 mm (Mitutoyo; body including plug face)', ar: 'قِست CairoVolt 45.6 × 31.4 × 86.1 ملم (Mitutoyo؛ الجسم شامل وجه القابس)' },
        'AC efficiency / no-load': { en: 'NOT MEASURED — no PZEM-004T AC-input pass on this sample; we do not invent efficiency %', ar: 'غير مقاس — لا مرحلة PZEM-004T لدخل التيار المتردد لهذه العيّنة؛ لا نخترع نسبة كفاءة' },
        'Safety (vendor)': { en: 'Joyroom lists multi-point protection (OCP/OVP/OTP/SCP class language) — vendor claim; CairoVolt verified OCP cut on the 15V rail in ~2.5s at >3.5A request', ar: 'جوي روم تذكر حماية متعددة النقاط (لغة OCP/OVP/OTP/SCP) — ادعاء المصنّع؛ CairoVolt تحقّقت من فصل OCP على بروتوكول 15V خلال ~2.5 ثانية عند طلب >3.5A' },
        'Recall status (2026-07-24)': { en: 'NOT RECALLED — cpsc.gov + Joyroom public notices returned zero hits for JR-TCF30 / JC02 on 2026-07-24. Anker\'s active power-bank recalls (anker.com/rc2506: A1257/A1263/A1647/A1652/A1681/A1689) are Anker-only and do not apply to Joyroom wall chargers', ar: 'لا يوجد استدعاء — cpsc.gov + إشعارات جوي روم العلنية أعادت صفر نتائج لـ JR-TCF30 / JC02 في 2026-07-24. استدعاءات باوربانك انكر النشطة (anker.com/rc2506) خاصة بانكر ولا تنطبق على شواحن جوي روم الحائطية' },
        'Vs Anker A2147 / Zolo A2698 (candid)': { en: 'Same phone-class ~30W USB-C peak class (JR-TCF30 29.1W · Zolo 29.4W measured). JR-TCF30 wins on dual-port + price (~280 vs ~599/790 EGP). Ankers win on single-port focus, brand documentation (A2147 DoC + ChargerLAB silicon), and no dual-port 15W collapse. A2147 independent thermal pass not published — no invented heat A/B', ar: 'نفس فئة ذروة USB-C ~30 واط للهواتف (JR-TCF30 29.1 واط · Zolo 29.4 واط مقاس). JR-TCF30 يفوز بالمنفذين + السعر (~280 مقابل ~599/790 جنيه). انكر تفوز بتركيز المنفذ الواحد وتوثيق العلامة (شهادة A2147 + سيليكون ChargerLAB) وبلا انهيار 15 واط عند المنفذين. مرحلة حرارة A2147 المستقلة غير منشورة — لا فرق حرارة A/B مخترع' },
        'In the Box': { en: 'Charger only on this listing unless package-contents state otherwise — supply a 3A-rated USB-C cable for full PD', ar: 'الشاحن فقط في هذه القائمة ما لم تذكر محتويات العبوة غير ذلك — أحضر كابل USB-C بتصنيف 3A لـ PD الكامل' },
    },
    benchTest: {
        sku: 'JR-TCF30',
        sampleId: 'CV-CH-JRTCF30-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit (store SKU JC02 · GTIN 6956116750053) · CairoVolt lab, New Cairo · ambient 28.2°C (HTC-2) · humidity 44% · mains 221V (UT61E) · USB-C test cable 3A e-marked',
            ar: 'وحدة واحدة من مخزون التجزئة (SKU المتجر JC02 · GTIN 6956116750053) · مختبر كايرو فولت، القاهرة الجديدة · حرارة محيطة 28.2°م (HTC-2) · رطوبة 44% · جهد الحائط 221 فولت (UT61E) · كابل اختبار USB-C 3A بـ e-marker',
        },
        methodology: {
            en:
                'Per CairoVolt Bench Test Protocol §7.1 wall chargers on sample CV-CH-JRTCF30-001 (2026-07-24). ' +
                '(A) FNB58 (fw v1.3) PD Info no-load enumeration on USB-C — recorded fixed PDOs 5V/3A · 9V/3A · 12V/2.5A · 15V/2A · 20V/1.5A and PPS envelopes 3.3–11V/3A · 3.3–16V/2A. ' +
                'Advertisement matches the published Joyroom dual-port 30W A+C family table on ijoyroom.com (JR-TCF15 sheet used as cross-reference only; our unit label / GTIN identify JR-TCF30 / JC02). ' +
                '(B–C) Each fixed PDO held 2 minutes into JUWEI 35W electronic load; peak W and voltage stability logged. Single-port USB-C peak = 29.1W on 15V/2A (~97% of 30W). ' +
                '(D) Dual-port share: JUWEI on USB-C + second JUWEI/QC sink on USB-A simultaneously — total collapsed to 14.7W (C 8.9W + A 5.8W), consistent with the 5V/3A (15W max) dual-port rating. ' +
                '(E) PPS held at 11V/2.7A ≈ 29.7W for 5 minutes; second envelope 3.3–16V/2A advertised and spot-checked. ' +
                '(F) Real phones: iPhone 13 (12.41Wh) USB-C PD peak 19.4W; Samsung Galaxy S24 base (14.31Wh) USB-C PPS peak 24.2W with Super Fast Charging indicator on. ' +
                '(G) BENETECH GM320 (ε=0.95) surface temp at 4 points after 15 min sustained ~29W USB-C-only load — max 54.8°C (center face). ' +
                '(H) OCP: >3.5A request on 15V rail cut in ~2.5s. ' +
                '(I–J) AC efficiency and no-load vampire draw NOT measured — PZEM-004T not on this pass; we refuse invented efficiency %. ' +
                '(K) Weight 57.8g (Kkmoon 0.01g); dimensions 45.6 × 31.4 × 86.1 mm (Mitutoyo). ' +
                '(L) Plug: EU Type-C Europlug 2-pin confirmed on physical unit — not BS 1363 on this Egypt JC02 sample. ' +
                '(M) Recall check 2026-07-24 on cpsc.gov + Joyroom notices — zero hits for JR-TCF30; Anker rc2506 power-bank list explicitly does not apply. ' +
                'No public ChargerLAB / Notebookcheck teardown of JR-TCF30 — silicon IDs not published. ' +
                'Independent cross-refs (not our data): ijoyroom.com JR-TCF15 dual-port PDO/QC/15W-share table; MacRumors iPhone ~20W wired cap; Samsung 25W SFC via PPS. ' +
                'Single unit; production batches may vary.',
            ar:
                'وفق بروتوكول اختبار كايرو فولت §7.1 لشواحن الحائط على العيّنة CV-CH-JRTCF30-001 (2026-07-24). ' +
                '(A) إحصاء PD Info بلا حمل بـ FNB58 (fw v1.3) على USB-C — سجّلنا PDOs ثابتة 5V/3A · 9V/3A · 12V/2.5A · 15V/2A · 20V/1.5A وظرفي PPS 3.3–11V/3A · 3.3–16V/2A. ' +
                'الإعلان يطابق جدول عائلة جوي روم 30 واط A+C المنشور على ijoyroom.com (ورقة JR-TCF15 للمقارنة فقط؛ ملصق وحدتنا / GTIN يعرّفان JR-TCF30 / JC02). ' +
                '(B–C) كل PDO ثابت لمدة دقيقتين على حمل JUWEI 35W؛ سُجِّلت ذروة W وثبات الجهد. ذروة USB-C بمنفذ واحد = 29.1 واط على 15V/2A (~97% من 30 واط). ' +
                '(D) تقاسم المنفذين: JUWEI على USB-C + حمل/مستهلك QC ثانٍ على USB-A معًا — الإجمالي انهار إلى 14.7 واط (C 8.9 + A 5.8)، متسق مع تصنيف المنفذين 5V/3A (حد 15 واط). ' +
                '(E) تثبيت PPS عند 11V/2.7A ≈ 29.7 واط لـ5 دقائق؛ الظرف الثاني 3.3–16V/2A معلَن وفُحص نقطيًا. ' +
                '(F) هواتف حقيقية: iPhone 13 (12.41Wh) ذروة PD 19.4 واط؛ Samsung Galaxy S24 القاعدي (14.31Wh) ذروة PPS 24.2 واط مع مؤشر Super Fast Charging. ' +
                '(G) حرارة سطح BENETECH GM320 (ε=0.95) على 4 نقاط بعد 15 دقيقة حمل ~29 واط على USB-C وحده — أعلى 54.8°م (منتصف الوجه). ' +
                '(H) OCP: طلب >3.5A على 15V فصل خلال ~2.5 ثانية. ' +
                '(I–J) كفاءة التيار المتردد واستهلاك بلا حمل لم تُقَسا — لا PZEM-004T في هذه المرحلة؛ نرفض اختراع نسبة كفاءة. ' +
                '(K) الوزن 57.8 جرامًا؛ الأبعاد 45.6 × 31.4 × 86.1 ملم. ' +
                '(L) القابس: Europlug أوروبي بسنَّين مؤكّد على الوحدة — ليست BS 1363 على عيّنة JC02 المصرية. ' +
                '(M) فحص استدعاء 2026-07-24 على cpsc.gov + إشعارات جوي روم — صفر لـ JR-TCF30؛ قائمة rc2506 لانكر لا تنطبق. ' +
                'لا تفكيك ChargerLAB / Notebookcheck علني لـ JR-TCF30 — لا هويات سيليكون. ' +
                'مراجع مستقلة (ليست بياناتنا): جدول JR-TCF15 على ijoyroom.com؛ سقف iPhone ~20 واط MacRumors؛ Samsung 25W SFC عبر PPS. ' +
                'وحدة واحدة؛ قد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'USB-C PD/PPS advertisement + inline V·A·W on C; inline on A during QC/dual tests', ar: 'إعلان PD/PPS على USB-C + قياس V·A·W على الخط لـ C؛ وعلى A أثناء اختبارات QC/المزدوج' } },
            { name: 'JUWEI 35W USB electronic load (×2)', use: { en: 'Per-PDO constant-power holds + dual-port shared-envelope test', ar: 'تثبيت قدرة ثابت لكل PDO + اختبار ظرف المنفذين المشترك' } },
            { name: 'Qualcomm QC 3.0 trigger cable', use: { en: 'USB-A QC 3.0 voltage negotiation (9V / 12V class)', ar: 'تفاوض جهد QC 3.0 على USB-A (فئة 9V / 12V)' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temperature at 4 points after 15 min ~29W USB-C load', ar: 'حرارة السطح على 4 نقاط بعد 15 دقيقة حمل ~29 واط على USB-C' } },
            { name: 'UNI-T UT61E digital multimeter', use: { en: 'Egyptian mains voltage at the socket (221V)', ar: 'جهد الكهرباء المصرية عند البريزة (221 فولت)' } },
            { name: 'HTC-2 ambient temperature / humidity meter', use: { en: 'Lab ambient 28.2°C / 44% RH at start of pass', ar: 'حرارة/رطوبة المختبر 28.2°م / 44% عند بدء المرحلة' } },
            { name: 'Kkmoon 0.01g scale', use: { en: 'Unit weight (57.8g, no cable)', ar: 'وزن الوحدة (57.8 جرامًا بلا كابل)' } },
            { name: 'Mitutoyo digital caliper', use: { en: 'Outer dimensions including plug face', ar: 'الأبعاد الخارجية شامل وجه القابس' } },
            { name: 'Apple iPhone 13 (12.41Wh)', use: { en: 'Real-device USB-C PD peak-watt capture', ar: 'التقاط ذروة واط PD عبر USB-C بجهاز حقيقي' } },
            { name: 'Samsung Galaxy S24 base (14.31Wh)', use: { en: 'Real-device PPS / Super Fast Charging verification on USB-C', ar: 'التحقق من PPS / Super Fast Charging على USB-C بجهاز حقيقي' } },
        ],
        results: [
            { param: { en: 'Rated max output (shared envelope)', ar: 'أقصى خرج اسمي (ظرف مشترك)' }, rated: '30W', measured: { en: '29.1W USB-C alone · 21.8W USB-A alone · 14.7W both ports', ar: '29.1 واط USB-C وحده · 21.8 واط USB-A وحده · 14.7 واط المنفذين معًا' }, note: { en: '30W is NOT available on each port at once', ar: '30 واط غير متاحة على كل منفذ في آن واحد' } },
            { param: { en: 'USB-C PDO — 5V/3A', ar: 'USB-C PDO — 5V/3A' }, rated: '15W', measured: '14.7W', note: { en: 'FNB58 + JUWEI — legacy / dual-port fallback rail', ar: 'FNB58 + JUWEI — منفذ الرجوع القديم / وضع المنفذين' } },
            { param: { en: 'USB-C PDO — 9V/3A', ar: 'USB-C PDO — 9V/3A' }, rated: '27W', measured: '26.8W', note: { en: 'primary iPhone / iPad fixed PD rail', ar: 'منفذ PD الثابت الأساسي لـ iPhone / iPad' } },
            { param: { en: 'USB-C PDO — 12V/2.5A', ar: 'USB-C PDO — 12V/2.5A' }, rated: '30W', measured: '29.0W', note: { en: 'near-peak fixed rail', ar: 'منفذ ثابت قريب من الذروة' } },
            { param: { en: 'USB-C PDO — 15V/2A', ar: 'USB-C PDO — 15V/2A' }, rated: '30W', measured: '29.1W', note: { en: 'single-port peak on this sample; below Switch dock 15V/2.6A', ar: 'ذروة المنفذ الواحد على هذه العيّنة؛ أقل من دوك السويتش 15V/2.6A' } },
            { param: { en: 'USB-C PDO — 20V/1.5A', ar: 'USB-C PDO — 20V/1.5A' }, rated: '30W', measured: '28.9W', note: { en: 'laptop-voltage PDO — slow-charge small ultrabooks only', ar: 'PDO بجهد اللابتوب — شحن بطيء للألترابوك الصغيرة فقط' } },
            { param: { en: 'USB-C PPS — 3.3–11V/3A', ar: 'USB-C PPS — 3.3–11V/3A' }, rated: '3.3–11V/3A', measured: { en: 'confirmed — held 11V/2.7A ≈ 29.7W for 5 min', ar: 'مؤكّد — ثبت 11V/2.7A ≈ 29.7 واط لـ5 دقائق' }, note: { en: 'Samsung 25W SFC handshake window', ar: 'نافذة مصافحة Samsung 25W SFC' } },
            { param: { en: 'USB-C PPS — 3.3–16V/2A', ar: 'USB-C PPS — 3.3–16V/2A' }, rated: '3.3–16V/2A', measured: { en: 'advertised on FNB58; spot-checked under load', ar: 'معلَن على FNB58؛ فحص نقطي تحت الحمل' }, note: { en: 'second PPS envelope on this sample', ar: 'ظرف PPS الثاني على هذه العيّنة' } },
            { param: { en: 'USB-A QC 3.0 — 9V/2A', ar: 'USB-A QC 3.0 — 9V/2A' }, rated: '18W', measured: '18.0W', note: { en: 'QC 3.0 trigger cable + JUWEI', ar: 'كابل تفعيل QC 3.0 + JUWEI' } },
            { param: { en: 'USB-A QC 3.0 peak', ar: 'ذروة USB-A QC 3.0' }, rated: '22.5W class', measured: '21.8W (12V/1.82A)', note: { en: 'highest sustained A-port negotiation on this sample', ar: 'أعلى تفاوض مستدام على منفذ A لهذه العيّنة' } },
            { param: { en: 'Dual-port shared output (C+A)', ar: 'خرج المنفذين المشترك (C+A)' }, rated: '5V/3A (15W max)', measured: { en: '14.7W total (USB-C 8.9W + USB-A 5.8W)', ar: '14.7 واط إجمالي (USB-C 8.9 واط + USB-A 5.8 واط)' }, note: { en: 'CRITICAL: plugging two devices abandons the 30W single-port profile', ar: 'حاسم: توصيل جهازين يتخلى عن بروفايل 30 واط للمنفذ الواحد' } },
            { param: { en: 'Voltage stability under load (USB-C fixed rails)', ar: 'ثبات الجهد تحت الحمل (بروتوكولات USB-C الثابتة)' }, measured: '±0.12V', note: { en: 'within USB-PD ±5% on fixed rails during 2-min holds', ar: 'ضمن USB-PD ±5% على البروتوكولات الثابتة أثناء تثبيت دقيقتين' } },
            { param: { en: 'iPhone 13 PD peak (USB-C)', ar: 'ذروة PD لـ iPhone 13 (USB-C)' }, rated: { en: 'phone ~20W PD cap', ar: 'سقف الهاتف ~20 واط PD' }, measured: '19.4W', note: { en: 'phone-limited — MacRumors / Apple wired PD ceiling, not charger headroom', ar: 'محدود بالهاتف — سقف PD السلكي لآبل / MacRumors، لا فائض الشاحن' } },
            { param: { en: 'Samsung Galaxy S24 PPS (USB-C)', ar: 'Samsung Galaxy S24 PPS (USB-C)' }, rated: { en: 'phone 25W SFC via PPS', ar: 'الهاتف 25 واط SFC عبر PPS' }, measured: { en: '24.2W peak · Super Fast Charging indicator ON · ~68 min 0→100%', ar: 'ذروة 24.2 واط · مؤشر Super Fast Charging يعمل · ~68 دقيقة 0→100%' }, note: { en: 'PPS present on this sample — unlike Joyroom JR-TCF20 which has no PPS rail', ar: 'PPS موجود على هذه العيّنة — بخلاف Joyroom JR-TCF20 بلا نطاق PPS' } },
            { param: { en: 'Surface temp @~29W (15 min)', ar: 'حرارة السطح عند ~29 واط (15 دقيقة)' }, measured: { en: '54.8°C max (center face); sides 52.1 / 51.6°C; plug area 49.4°C', ar: 'أعلى 54.8°م (منتصف الوجه)؛ الجانبان 52.1 / 51.6°م؛ منطقة القابس 49.4°م' }, note: { en: '28.2°C ambient, GM320 ε=0.95 — JR-TCF30-only; no invented A/B delta vs A2147 or A2698', ar: 'محيطة 28.2°م، GM320 ε=0.95 — أرقام JR-TCF30 وحدها؛ لا فرق A/B مخترع مقابل A2147 أو A2698' } },
            { param: { en: 'Over-current protection', ar: 'حماية التيار الزائد' }, measured: { en: 'cut >3.5A @ 15V in ~2.5s', ar: 'فصل >3.5A على 15V خلال ~2.5 ثانية' }, note: { en: 'JUWEI request on highest sustained fixed rail', ar: 'طلب JUWEI على أعلى بروتوكول ثابت مستدام' } },
            { param: { en: 'AC efficiency / no-load draw', ar: 'كفاءة التيار المتردد / سحب بلا حمل' }, measured: { en: 'not measured — no PZEM-004T on this pass', ar: 'غير مقاس — لا PZEM-004T في هذه المرحلة' }, note: { en: '§11.3 — we do not invent efficiency %', ar: '§11.3 — لا نخترع نسبة كفاءة' } },
            { param: { en: 'Weight', ar: 'الوزن' }, measured: '57.8g', note: { en: 'Kkmoon 0.01g — charger only', ar: 'Kkmoon 0.01 جرام — الشاحن فقط' } },
            { param: { en: 'Dimensions', ar: 'الأبعاد' }, measured: '45.6 × 31.4 × 86.1 mm', note: { en: 'Mitutoyo caliper — body including plug face', ar: 'قدمة Mitutoyo — الجسم شامل وجه القابس' } },
            { param: { en: 'Plug type (Egypt JC02 sample)', ar: 'نوع القابس (عيّنة JC02 مصر)' }, rated: { en: 'ME market varies (EU or UK)', ar: 'سوق الشرق الأوسط يتفاوت (EU أو UK)' }, measured: { en: 'EU Type-C Europlug (2-pin) — fits Egyptian sockets directly', ar: 'Europlug أوروبي Type-C بسنَّين — يدخل الفيش المصرية مباشرة' }, note: { en: 'NOT BS 1363 on this sample — verify your shipment', ar: 'ليست BS 1363 على هذه العيّنة — تحقق من شحنتك' } },
            { param: { en: 'Recall status (verified 2026-07-24)', ar: 'حالة الاستدعاء (متحققة 2026-07-24)' }, measured: { en: 'NOT recalled', ar: 'غير مُستدعى' }, note: { en: 'cpsc.gov + Joyroom notices: zero hits for JR-TCF30; Anker A1257/A1263/A1647/A1652/A1681/A1689 recalls are unrelated', ar: 'cpsc.gov + إشعارات جوي روم: صفر لـ JR-TCF30؛ استدعاءات انكر A1257/A1263/A1647/A1652/A1681/A1689 غير ذات صلة' } },
        ],
        verdict: {
            en: 'JR-TCF30 delivered 29.1W on USB-C alone, 21.8W QC on USB-A alone, and collapsed to 14.7W with both ports loaded. PPS present — S24 Super Fast Charging engaged; iPhone 13 peaked 19.4W. Shell 54.8°C after 15 min. EU Europlug. Efficiency not measured. Best as a cheap dual-port phone brick — not 30W×2.',
            ar: 'JR-TCF30 سلّم 29.1 واط على USB-C وحده، و21.8 واط QC على USB-A وحده، وانهار إلى 14.7 واط بتحميل المنفذين. PPS موجود — S24 فعّل Super Fast Charging؛ iPhone 13 بلغ 19.4 واط. السطح 54.8°م بعد 15 دقيقة. Europlug أوروبي. الكفاءة غير مقاسة. الأفضل كشاحن هاتف رخيص بمنفذين — ليس 30 واط×2.',
        },
        pros: [
            { en: 'Genuine ~30W USB-C single-port delivery — 29.1W measured peak on 15V/2A (~97% of rating) with full fixed PDO set through 20V/1.5A plus two PPS envelopes', ar: 'تسليم USB-C حقيقي ~30 واط على منفذ واحد — ذروة مقاسة 29.1 واط على 15V/2A (~97% من التصنيف) مع مجموعة PDO ثابتة حتى 20V/1.5A وظرفي PPS' },
            { en: 'USB-A QC 3.0 measured 21.8W peak — real second-port utility for older cables / earbuds that Anker A2147 and Zolo A2698 (single USB-C) cannot serve', ar: 'USB-A QC 3.0 قاس ذروة 21.8 واط — منفعة حقيقية للمنفذ الثاني للكابلات/السماعات الأقدم التي لا يخدمها A2147 وZolo A2698 (USB-C واحد)' },
            { en: 'Samsung Galaxy S24 engaged PPS Super Fast Charging (24.2W peak) — unlike Joyroom JR-TCF20 which has no PPS rail', ar: 'Samsung Galaxy S24 فعّل PPS Super Fast Charging (ذروة 24.2 واط) — بخلاف Joyroom JR-TCF20 بلا نطاق PPS' },
            { en: 'iPhone 13 peaked at 19.4W PD — lands on Apple\'s ~20W wired ceiling; phone-limited, not charger-limited', ar: 'iPhone 13 بلغ ذروة 19.4 واط PD — يقع على سقف آبل السلكي ~20 واط؛ محدود بالهاتف لا بالشاحن' },
            { en: 'Egypt-ready EU Europlug on JC02 sample — no US-to-EU adapter; street price ~280 EGP undercuts typical Anker 30W bricks', ar: 'Europlug أوروبي جاهز لمصر على عيّنة JC02 — بلا محوّل أمريكي؛ سعر الشارع ~280 جنيه أقل من شواحن انكر 30 واط المعتادة' },
            { en: 'NOT recalled as of 2026-07-24 (cpsc.gov + Joyroom) — Anker power-bank recalls do not apply to this Joyroom wall charger', ar: 'غير مُستدعى حتى 2026-07-24 (cpsc.gov + جوي روم) — استدعاءات باوربانك انكر لا تنطبق على شاحن جوي روم الحائطي هذا' },
        ],
        limits: [
            { en: 'Dual-port share is ~15W total (measured 14.7W) — NOT 30W+22.5W simultaneously. Two phones at once both get slow charge', ar: 'تقاسم المنفذين ~15 واط إجمالي (قِسنا 14.7 واط) — ليس 30+22.5 واط معًا. هاتفان معًا يحصلان على شحن بطيء' },
            { en: 'AC-input efficiency and no-load vampire draw were NOT measured (no PZEM) — we publish no invented efficiency %', ar: 'كفاءة دخل التيار المتردد وسحب بلا حمل لم تُقَسا (لا PZEM) — لا ننشر نسبة كفاءة مخترعة' },
            { en: 'No public silicon teardown for JR-TCF30 — we do not invent chip IDs. Choose Anker A2147 if ChargerLAB-cited silicon matters', ar: 'لا تفكيك سيليكون علني لـ JR-TCF30 — لا نخترع معرّفات رقائق. اختر Anker A2147 إن كانت رقائق ChargerLAB تهمّك' },
            { en: 'Shell 54.8°C after 15 min at ~29W (28.2°C ambient) — keep ventilated. No invented heat A/B vs A2147 (thermal pass unpublished there) or same-day A2698 retest', ar: 'السطح 54.8°م بعد 15 دقيقة عند ~29 واط (محيطة 28.2°م) — اترك تهوية. لا فرق حرارة A/B مخترع مقابل A2147 (مرحلة الحرارة غير منشورة هناك) أو إعادة اختبار A2698 في نفس اليوم' },
            { en: 'Cannot run Nintendo Switch OLED docked (needs 15V/2.6A = 39W; we top out at 15V/2A = 30W) or fast-charge a MacBook Pro', ar: 'لا يشغّل نينتندو سويتش OLED موصولًا (يحتاج 15V/2.6A = 39 واط؛ سقفنا 15V/2A = 30 واط) ولا يشحن MacBook Pro سريعًا' },
            { en: 'Xiaomi / Infinix / Tecno / Realme proprietary 33–120W protocols are NOT unlocked — those phones fall back to standard PD/PPS only', ar: 'بروتوكولات شاومي / إنفينكس / تكنو / ريلمي الملكية 33–120 واط لا تُفتح — تلك الهواتف ترجع إلى PD/PPS القياسي فقط' },
            { en: 'Plug on this Egypt sample is EU Europlug, not BS 1363 — confirm your unit if you expected a UK 3-pin ME variant', ar: 'القابس على عيّنة مصر هذه Europlug أوروبي وليس BS 1363 — أكّد وحدتك إن توقّعت نسخة شرق أوسطية بريطانية 3 دبابيس' },
            { en: 'Cable typically not included — use a 3A-rated USB-C cable for full PD/PPS', ar: 'الكابل عادة غير مرفق — استخدم كابل USB-C بتصنيف 3A لـ PD/PPS الكامل' },
            { en: 'Single unit tested (CV-CH-JRTCF30-001); production batches may vary', ar: 'وحدة واحدة مُختبرة (CV-CH-JRTCF30-001)؛ قد تختلف دفعات الإنتاج' },
        ],
    },
};
