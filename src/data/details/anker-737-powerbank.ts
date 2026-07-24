// Details for: anker-737-powerbank (Anker 737 Power Bank / PowerCore 24K, model A1289/A1289011)
// GOLD v1.2 deepen — preserve EPR/Wh honesty from prior gold pass (74.2Wh usable · 136.8W peak · fixed 28V/5A).
// Recall: A1289 is NOT on Anker rc2506 / CPSC Sept 2025 set (A1257/A1263/A1647/A1652/A1681/A1689).
import type { ProductDetail } from './_types';

export const anker_737_powerbank_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker 737 Power Bank (PowerCore 24K, A1289/A1289011): 24,000mAh / 86.4Wh cell rating (24,000mAh × 3.6V ÷ 1000 = 86.4Wh — §8 Wh identity). CairoVolt measured 74.2Wh usable USB-C output → usable-energy ratio 74.2 ÷ 86.4 = 85.9% (USB output vs rated cell Wh; NOT AC wall-plug efficiency).',
            'CairoVolt measured 136.8W on the fixed 28V/5A PD 3.1 EPR rail (FNB58: 27.4V × 4.99A = 136.726W ≈ 136.8W; 136.8 ÷ 140 = 97.7% of printed max). Real laptop-class output, but full 140W behaviour still depends on the laptop and a 140W-rated USB-C cable. Rail type is fixed EPR PDO — not USB PD AVS.',
            'Current safety check, 2026-07-23: Anker rc2506 / CPSC Sept 2025 power-bank recall set covers A1257 / A1263 / A1647 / A1652 / A1681 / A1689 — NOT A1289. Still verify the printed model (A1289011) and serial on the received unit against anker.com/rc2506 + anker.com/product-recalls.',
            'At 86.4Wh it sits below the common IATA 100Wh carry-on threshold, but Emirates and flydubai (since ~1 Oct 2025) prohibit using the power bank, charging devices from it, or charging the pack from aircraft sockets in-flight — carry-on only under labelled ≤100Wh rules. Check the carrier DG page before travel.',
            'Physical device anchors: Galaxy A15 3.36 full-charge equivalents; MacBook Air M2 top-up 0→91%. iPhone 15 ~5.15 and MacBook Pro 14" ~0.94 are calculated from 74.2Wh (§8), not re-benched on those devices. Single retail unit; June raw sheet gaps disclosed below.',
        ],
        ar: [
            'باور بانك انكر 737 (PowerCore 24K، A1289/A1289011): سعة خلايا 24,000 مللي أمبير / 86.4Wh (24,000×3.6V÷1000 = 86.4Wh — هوية Wh وفق §8). قاست CairoVolt خرج USB-C فعليًا 74.2Wh → نسبة الطاقة القابلة للاستخدام 74.2÷86.4 = 85.9% (خرج USB مقابل Wh الخلايا الاسمية؛ وليست كفاءة فيشة الحائط AC).',
            'قِسنا 136.8 واط على مسار PD 3.1 EPR الثابت 28V/5A (FNB58: 27.4V×4.99A = 136.726 واط ≈ 136.8؛ 136.8÷140 = 97.7% من الحد المطبوع). خرج حقيقي لفئة اللابتوب، لكن سلوك 140 واط الكامل يظل مشروطًا باللابتوب وكابل USB-C مصنّف 140 واط. نوع المسار PDO EPR ثابت — وليس USB PD AVS.',
            'فحص السلامة الحالي 2026-07-23: مجموعة استدعاء باور بانك Anker rc2506 / CPSC سبتمبر 2025 تشمل A1257 / A1263 / A1647 / A1652 / A1681 / A1689 — ولا تشمل A1289. مع ذلك طابق الموديل المطبوع (A1289011) والرقم التسلسلي على الوحدة المستلمة مع anker.com/rc2506 + anker.com/product-recalls.',
            'سعته 86.4Wh أقل من حد IATA الشائع 100Wh لحقيبة المقصورة، لكن الإمارات وفلاي دبي (منذ نحو 1 أكتوبر 2025) تمنعان استخدام الباور بانك أو شحن الأجهزة منه أو شحنه من مقابس الطائرة أثناء الرحلة — حمل فقط وفق قواعد الجهاز واضح الملصق ≤100Wh. راجع صفحة البضائع الخطرة قبل السفر.',
            'مراسي أجهزة فعلية: Galaxy A15 = 3.36 شحنة مكافئة؛ تعبئة MacBook Air M2 من 0→91%. iPhone 15 نحو 5.15 وMacBook Pro 14 نحو 0.94 محسوبة من 74.2Wh (§8)، ولم تُعاد على تلك الأجهزة. وحدة تجزئة واحدة؛ نواقص خام يونيو مُفصح عنها أدناه.',
        ],
    },
    localContext: {
        en:
            'For an Egyptian buyer, the Anker 737 answers: "I need one USB-C pack that can push real laptop-class watts (fixed 28V/5A EPR) and still fly under 100Wh." ' +
            'Our useful-energy measurement was 74.2Wh from an 86.4Wh rated pack (85.9% usable-energy ratio), so it can realistically top up a MacBook Air-class laptop or run a ~10W router for about 7 hours (74.2 ÷ ~10W ≈ 7.4h). ' +
            'RIGHT FOR: (1) FREELANCE / CLIENT DAY with one MacBook Air or Pro 14" that needs a high single-port top-up — 136.8W measured on EPR beats dual-100W packs when only ONE laptop matters. ' +
            '(2) CAIRO→DUBAI / DXB CONNECTION: 86.4Wh labelled pack is under the common cabin threshold; Emirates and flydubai allow carriage of one clearly labelled ≤100Wh power bank in cabin baggage but ban using it, charging devices from it, or charging the pack from aircraft sockets during the flight — seat-pocket carry only. ' +
            '(3) LOAD-SHEDDING HOME OFFICE: ~10W router + phone trickle from 74.2Wh usable can cover a typical 30–60 min Cairo cut with headroom. ' +
            '(4) SOMEONE COMPARING TO A1336: pick 737 for max single-laptop EPR wattage + higher usable Wh (74.2 vs 61.8); pick A1336 when TWO USB-C loads must run near 100W each. ' +
            'WRONG FOR: casual phone-only top-ups where a lighter 10K/20K pack is enough; buyers who need dual simultaneous 100W laptop feeds; anyone who assumes "140W printed" without a 140W-rated cable and a laptop that asks for EPR. ' +
            'HEAT: June bench ambient was 27.9°C; Cairo summer highs leave less thermal headroom — keep the pack ventilated, out of parked cars, and away from pillows or closed bags while charging. ' +
            'SAFETY: rechecked 2026-07-23 — A1289 is outside Anker rc2506 (A1257/A1263/A1647/A1652/A1681/A1689). Match A1289011 + serial on delivery.',
        ar:
            'للمشتري المصري، انكر 737 يجيب: "أحتاج باور بانك USB-C واحد يدفع واطًا حقيقيًا لفئة اللابتوب (EPR ثابت 28V/5A) وما زال يطير تحت 100Wh." ' +
            'قياس الطاقة القابلة للاستخدام لدينا كان 74.2Wh من حزمة مصنّفة 86.4Wh (نسبة 85.9%)، لذلك يستطيع واقعيًا تعبئة لابتوب من فئة MacBook Air أو تشغيل راوتر ~10 واط لنحو 7 ساعات (74.2÷~10≈7.4 ساعة). ' +
            'مناسب لـ: (1) يوم عمل/عميل بلابتوب واحد MacBook Air أو Pro 14 يحتاج تعبئة عالية من منفذ واحد — 136.8 واط المقاسة على EPR تتفوّق على حزم 100+100 واط عندما يهم لابتوب واحد فقط. ' +
            '(2) رحلة القاهرة→دبي / ترانزيت DXB: حزمة بملصق 86.4Wh تحت حد المقصورة الشائع؛ الإمارات وفلاي دبي تسمحان بحمل باور بانك واحد واضح الملصق ≤100Wh في المقصورة، لكن تمنعان استخدامه أو شحن الأجهزة منه أو شحنه من مقابس الطائرة أثناء الرحلة — حمل في جيب المقعد فقط. ' +
            '(3) مكتب منزلي أثناء انقطاع الكهرباء: راوتر ~10 واط + تنقيط هاتف من 74.2Wh يكفي غالبًا لتجاوز قطع 30–60 دقيقة مع هامش. ' +
            '(4) من يقارن مع A1336: اختر 737 لأقصى واط EPR للابتوب الواحد + Wh قابلة للاستخدام أعلى (74.2 مقابل 61.8)؛ واختر A1336 عندما يجب تشغيل حملَين USB-C قرب 100 واط لكل منهما. ' +
            'غير مناسب لـ: تعبئة هاتف يومية فقط حيث تكفي حزمة 10K/20K أخف؛ من يحتاج تغذية لابتوبين 100 واط معًا؛ ومن يفترض "140 واط مطبوع" بلا كابل مصنّف 140 واط ولابتوب يطلب EPR. ' +
            'الحرارة: محيط يونيو 27.9°م؛ حر القاهرة صيفًا يترك هامشًا أقل — ضعه مهوّى، بعيدًا عن السيارات المتوقفة والوسائد والحقائب المغلقة أثناء الشحن. ' +
            'السلامة: أُعيد الفحص 2026-07-23 — A1289 خارج Anker rc2506 (A1257/A1263/A1647/A1652/A1681/A1689). طابق A1289011 + السيريال عند الاستلام.',
    },
    specifications: {
        'Model': {
            en: 'Anker 737 Power Bank (PowerCore 24K) — A1289 / A1289011',
            ar: 'انكر 737 باور بانك (PowerCore 24K) — A1289 / A1289011',
        },
        'Capacity': {
            en: '24,000mAh / 86.4Wh rated cell energy (24,000mAh × 3.6V ÷ 1000 = 86.4Wh)',
            ar: '24,000 مللي أمبير / 86.4Wh طاقة خلايا اسمية (24,000×3.6V÷1000 = 86.4Wh)',
        },
        'Usable Energy (CairoVolt measured)': {
            en: '74.2Wh USB-C output · usable-energy ratio 85.9% (74.2 ÷ 86.4) — not AC-input efficiency',
            ar: '74.2Wh خرج USB-C · نسبة طاقة قابلة للاستخدام 85.9% (74.2÷86.4) — ليست كفاءة دخل AC',
        },
        'Max Output': {
            en: '140W max total; each USB-C can advertise 140W in single-port mode (requires 140W-rated cable + EPR-capable sink)',
            ar: '140 واط كحد إجمالي؛ كل USB-C يمكن أن يعلن 140 واط عند استخدام منفذ واحد (يلزم كابل 140 واط + حمل يدعم EPR)',
        },
        'Measured Peak (CairoVolt)': {
            en: '136.8W on fixed 28V/5A PD 3.1 EPR (27.4V / 4.99A) — 97.7% of 140W label',
            ar: '136.8 واط على EPR ثابت 28V/5A ضمن PD 3.1 (27.4V / 4.99A) — 97.7% من ملصق 140 واط',
        },
        'Ports': {
            en: '2× USB-C + 1× USB-A',
            ar: '2× USB-C + 1× USB-A',
        },
        'USB-C Profiles': {
            en: '5V/3A · 9V/3A · 15V/3A · 20V/5A · 28V/5A fixed EPR; PPS support advertised by Anker PIQ 3.0 and observed in the bench handshake (full APDO sweep not run)',
            ar: '5V/3A · 9V/3A · 15V/3A · 20V/5A · 28V/5A EPR ثابت؛ دعم PPS مذكور ضمن Anker PIQ 3.0 وظهر في مصافحة الاختبار (لم يُنفَّذ مسح APDO كامل)',
        },
        'USB-A Output': {
            en: '5V/3A · 9V/2A · 12V/1.5A (18W max, manufacturer stated) — CairoVolt peak 16.7W',
            ar: '5V/3A · 9V/2A · 12V/1.5A (18 واط حد أقصى، حسب المصنّع) — ذروة CairoVolt 16.7 واط',
        },
        'Display': {
            en: 'Digital screen for live watts, estimates, and battery-status information (estimates, not a lab instrument)',
            ar: 'شاشة رقمية للواط اللحظي والتقديرات ومعلومات حالة البطارية (تقديرات، وليست أداة معمل)',
        },
        'Recharge Time': {
            en: 'Anker states about 1 hour with a 140W PD charger; CairoVolt legacy run recorded 52 min — exact source-charger model not preserved in the June raw sheet',
            ar: 'تذكر Anker نحو ساعة مع شاحن PD 140 واط؛ وسجّل اختبار CairoVolt القديم 52 دقيقة — موديل شاحن المصدر لم يُحفظ في ورقة خام يونيو',
        },
        'Cells (independent teardown)': {
            en: 'ChargerLAB teardown: 6× Lishen LR2170LA 21700 cells, plus Infineon CYPD3171 protocol chip',
            ar: 'تفكيك ChargerLAB: ست خلايا Lishen LR2170LA 21700، مع شريحة بروتوكول Infineon CYPD3171',
        },
        'Weight': {
            en: '632g manufacturer spec; CairoVolt measured 634g',
            ar: '632 جرام حسب المصنّع؛ CairoVolt قاست 634 جرام',
        },
        'Dimensions': {
            en: '155.8 × 54.6 × 49.65 mm manufacturer spec; CairoVolt measured 156.2 × 54.9 × 49.8 mm',
            ar: '155.8 × 54.6 × 49.65 ملم حسب المصنّع؛ CairoVolt قاست 156.2 × 54.9 × 49.8 ملم',
        },
        'Airline': {
            en: '86.4Wh < 100Wh cabin threshold — carry-on class on major carriers when labelled; Emirates & flydubai: no in-flight USE / no charging devices from the pack / no charging the pack from aircraft sockets (verify current DG pages)',
            ar: '86.4Wh < حد المقصورة 100Wh — فئة حمل مقصورة على الشركات الكبرى عند وضوح الملصق؛ الإمارات وفلاي دبي: ممنوع الاستخدام أثناء الرحلة / ممنوع شحن الأجهزة من الحزمة / ممنوع شحن الحزمة من مقابس الطائرة (تحقق من صفحات البضائع الخطرة الحالية)',
        },
        'How 737 differs from Prime A1336': {
            en: '737 = 86.4Wh / 74.2Wh usable, single-port 140W-class fixed 28V/5A EPR, PPS handshake observed. A1336 = 72Wh / 61.8Wh usable, dual ~100W C ports (200W combined), PPS to 11V. Pick 737 for one laptop at max watts; A1336 for two high-draw USB-C devices at once.',
            ar: '737 = 86.4Wh / 74.2Wh قابلة للاستخدام، منفذ واحد فئة 140 واط عبر EPR ثابت 28V/5A، مصافحة PPS مرصودة. A1336 = 72Wh / 61.8Wh قابلة للاستخدام، منفذان C نحو 100 واط (200 واط مشترك)، PPS حتى 11 فولت. اختر 737 للابتوب الواحد بأقصى واط؛ وA1336 لجهازين USB-C عاليي السحب معًا.',
        },
        'Recall Status': {
            en: 'A1289 NOT listed on Anker rc2506 / CPSC Sept 2025 power-bank recall set checked 2026-07-23 (set = A1257/A1263/A1647/A1652/A1681/A1689). Verify serial on delivery.',
            ar: 'A1289 غير مذكور في مجموعة استدعاء باور بانك Anker rc2506 / CPSC سبتمبر 2025 عند الفحص 2026-07-23 (المجموعة = A1257/A1263/A1647/A1652/A1681/A1689). تحقق من السيريال عند الاستلام.',
        },
    },
    benchTest: {
        sku: 'A1289',
        sampleId: 'CV-PB-A1289-001',
        testDate: '2026-06-27',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock A1289011 unit · CairoVolt lab, New Cairo · ambient 27.9°C recorded · humidity and wall-voltage were not preserved in the June raw sheet · 140W-capable USB-C cable required for 28V/5A EPR · protocol audit refreshed 2026-07-23 (v1.2 deepen; same measured Wh/peak)',
            ar: 'وحدة تجزئة واحدة A1289011 · مختبر كايرو فولت، القاهرة الجديدة · حرارة محيطة مسجلة 27.9°م · الرطوبة وجهد الحائط لم يُحفظا في ورقة خام يونيو · يلزم كابل USB-C مصنّف 140 واط لمسار 28V/5A EPR · تحديث تدقيق البروتوكول في 2026-07-23 (تعميق v1.2؛ نفس Wh/الذروة المقاسة)',
        },
        methodology: {
            en:
                'Per Bench Test Protocol §7.3 (power banks) + §8 physics gates: we charged one retail A1289 unit to 100%, rested it 30 minutes, then discharged it over USB-C into a JUWEI electronic load while a FNIRSI FNB58 logged cumulative V/A/W/Wh and captured the fixed 28V/5A PD 3.1 EPR contract. ' +
                '§8 math published before claims: (1) rated Wh identity 24,000mAh × 3.6V ÷ 1000 = 86.4Wh; (2) usable-energy ratio = 74.2 ÷ 86.4 = 85.9% (USB output vs cell Wh — NOT AC wall efficiency); (3) peak identity 27.4V × 4.99A = 136.726W ≈ 136.8W and 136.8 ÷ 140 = 97.7% of label; (4) phone/router counts that are calculated use 74.2Wh as the numerator and are labelled calculated. ' +
                'We physically checked a Samsung Galaxy A15 full charge-count run and a MacBook Air M2 top-up, then measured weight and dimensions. ' +
                'This 2026-07-23 v1.2 deepen did NOT invent missing raw data and did NOT re-measure Wh/peak: humidity, wall-voltage, exact source-charger model for the legacy 52-minute recharge note, GM320 surface temperature, OCP trip, and a full programmable PPS sweep were not preserved or not run — disclosed as limits. ' +
                'Independent corroboration for context: Anker service article for A1289 profiles/dimensions, ChargerLAB 2022 teardown for cell/BOM identity, Review-Hub/TechRadar usable-energy bands (~83–89%), Anker rc2506 + CPSC recall pages (A1289 absent), IATA lithium guidance, Emirates and flydubai power-bank carriage/use rules. Single unit; production batches may vary.',
            ar:
                'وفق §7.3 من بروتوكول الاختبار (باور بانك) + بوابات فيزياء §8: شحنّا وحدة تجزئة واحدة A1289 إلى 100%، ثم أرحناها 30 دقيقة، وفرّغناها عبر USB-C داخل حمل إلكتروني JUWEI بينما سجّل FNIRSI FNB58 قيم V/A/W/Wh المتراكمة والتقط عقد PD 3.1 EPR الثابت 28V/5A. ' +
                'رياضيات §8 المنشورة قبل الادعاءات: (1) هوية Wh الاسمية 24,000×3.6V÷1000 = 86.4Wh؛ (2) نسبة الطاقة القابلة للاستخدام = 74.2÷86.4 = 85.9% (خرج USB مقابل Wh الخلايا — ليست كفاءة حائط AC)؛ (3) هوية الذروة 27.4V×4.99A = 136.726 واط ≈ 136.8 و136.8÷140 = 97.7% من الملصق؛ (4) أعداد الهاتف/الراوتر الحسابية تستخدم 74.2Wh كبسط وتُوسم محسوبة. ' +
                'راجعنا فعليًا اختبار عدد شحنات Samsung Galaxy A15 وتعبئة MacBook Air M2، ثم قسنا الوزن والأبعاد. ' +
                'تعميق v1.2 في 2026-07-23 لم يخترع بيانات خام ناقصة ولم يُعد قياس Wh/الذروة: الرطوبة، جهد الحائط، موديل شاحن المصدر الدقيق لملاحظة إعادة الشحن القديمة 52 دقيقة، حرارة السطح بـ GM320، فصل OCP، ومسح PPS كامل بحمل مبرمج لم تُحفظ أو لم تُنفّذ — مُفصح عنها كحدود. ' +
                'للاسترجاع المستقل والسياق: مقال خدمة Anker لمواصفات A1289، تفكيك ChargerLAB 2022 لهوية الخلايا وBOM، نطاقات طاقة Review-Hub/TechRadar (~83–89%)، صفحات استدعاء Anker rc2506 وCPSC (A1289 غائب)، إرشاد بطاريات الليثيوم من IATA، وقواعد الإمارات وفلاي دبي لحمل/استخدام الباور بانك. وحدة واحدة؛ وقد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'USB-C cumulative V/A/W/Wh logging and PD 3.1 EPR/PPS handshake capture', ar: 'تسجيل USB-C التراكمي V/A/W/Wh والتقاط مصافحة PD 3.1 EPR/PPS' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Controlled discharge path for usable-energy logging', ar: 'مسار تفريغ مضبوط لتسجيل الطاقة القابلة للاستخدام' } },
            { name: 'Samsung Galaxy A15 (5000mAh)', use: { en: 'Physical phone charge-count verification', ar: 'تحقق فعلي من عدد شحنات الهاتف' } },
            { name: 'Apple MacBook Air M2 (52.6Wh)', use: { en: 'Real-device laptop top-up and high-power USB-C draw check', ar: 'تعبئة لابتوب حقيقي وفحص سحب USB-C عالي القدرة' } },
            { name: 'Kkmoon 0.01g scale + Mitutoyo caliper', use: { en: 'Weight and external dimensions', ar: 'الوزن والأبعاد الخارجية' } },
            { name: 'Legacy 140W USB-C PD source charger (model not preserved)', use: { en: 'Used only for the retained 52-minute recharge note; not treated as a fully protocol-complete instrument record', ar: 'استُخدم فقط لملاحظة إعادة الشحن 52 دقيقة المحتفظ بها؛ ولا يُعامل كسجل معدّة مكتمل للبروتوكول' } },
        ],
        results: [
            {
                param: { en: 'Rated cell capacity (§8 Wh identity)', ar: 'سعة الخلايا الاسمية (هوية Wh §8)' },
                rated: '24,000mAh / 86.4Wh',
                measured: '—',
                note: {
                    en: '24,000mAh × 3.6V ÷ 1000 = 86.4Wh; Anker service lists 24,000mAh; Japan page lists A1289011',
                    ar: '24,000×3.6V÷1000 = 86.4Wh؛ صفحة خدمة Anker تذكر 24,000mAh وصفحة اليابان تذكر A1289011',
                },
            },
            {
                param: { en: 'Usable energy — USB-C', ar: 'الطاقة القابلة للاستخدام — USB-C' },
                rated: { en: '86.4Wh cell energy', ar: '86.4Wh طاقة خلايا' },
                measured: '74.2 Wh',
                note: {
                    en: 'FNB58 cumulative discharge into JUWEI; primary CairoVolt capacity figure — not re-measured in v1.2 deepen',
                    ar: 'تفريغ تراكمي FNB58 داخل JUWEI؛ رقم السعة الأساسي من CairoVolt — لم يُعد قياسه في تعميق v1.2',
                },
            },
            {
                param: { en: 'Usable-energy ratio (§8)', ar: 'نسبة الطاقة القابلة للاستخدام (§8)' },
                measured: '85.9%',
                note: {
                    en: '74.2 ÷ 86.4 = 85.9%; USB output vs rated cell Wh, not AC-input efficiency; aligns with independent ~83–89% bands',
                    ar: '74.2÷86.4 = 85.9%؛ خرج USB مقابل Wh الخلايا الاسمية، وليست كفاءة دخل AC؛ متسق مع نطاقات مستقلة ~83–89%',
                },
            },
            {
                param: { en: 'Peak USB-C output (§8 W=V×A)', ar: 'ذروة خرج USB-C (§8 W=V×A)' },
                rated: '140W',
                measured: '136.8W (27.4V/4.99A)',
                note: {
                    en: '27.4 × 4.99 = 136.726 ≈ 136.8W; 136.8 ÷ 140 = 97.7% of printed max; fixed 28V/5A EPR contract',
                    ar: '27.4×4.99 = 136.726 ≈ 136.8 واط؛ 136.8÷140 = 97.7% من الحد المطبوع؛ عقد EPR ثابت 28V/5A',
                },
            },
            {
                param: { en: 'EPR rail type', ar: 'نوع مسار EPR' },
                rated: { en: 'Fixed 28V/5A PD 3.1 PDO', ar: 'PDO ثابت 28V/5A ضمن PD 3.1' },
                measured: { en: 'Fixed 28V class observed; not USB PD AVS', ar: 'ظهر كمسار 28V ثابت؛ وليس USB PD AVS' },
                note: {
                    en: 'Honesty gate: do not describe this sample as AVS programmable 28V',
                    ar: 'بوابة أمانة: لا تَصِف هذه العيّنة كـ AVS قابل للبرمجة عند 28V',
                },
            },
            {
                param: { en: 'Advertised USB-C profile set', ar: 'مجموعة بروفايلات USB-C المعلنة' },
                measured: {
                    en: '5V/3A · 9V/3A · 15V/3A · 20V/5A · 28V/5A + PPS handshake support',
                    ar: '5V/3A · 9V/3A · 15V/3A · 20V/5A · 28V/5A + دعم مصافحة PPS',
                },
                note: {
                    en: 'FNB58 PD screen + Anker PIQ 3.0 source; PPS was not swept across the full APDO window under programmable load',
                    ar: 'شاشة FNB58 PD + مصدر Anker PIQ 3.0؛ لم يُمسح PPS عبر كامل نافذة APDO بحمل مبرمج',
                },
            },
            {
                param: { en: 'Peak USB-A output', ar: 'ذروة خرج USB-A' },
                rated: '18W',
                measured: '16.7W',
                note: {
                    en: 'Close to Anker 5V/3A · 9V/2A · 12V/1.5A table',
                    ar: 'قريب من جدول Anker: 5V/3A · 9V/2A · 12V/1.5A',
                },
            },
            {
                param: { en: 'Self-recharge note', ar: 'ملاحظة إعادة الشحن الذاتي' },
                rated: { en: 'Anker: about 1 hour with 140W PD', ar: 'Anker: نحو ساعة مع 140W PD' },
                measured: { en: 'legacy CairoVolt note: 52 min to 100%', ar: 'ملاحظة CairoVolt القديمة: 52 دقيقة إلى 100%' },
                note: {
                    en: 'Exact source-charger model missing from raw sheet; retained as context, not a complete protocol-grade row',
                    ar: 'موديل شاحن المصدر الدقيق غير محفوظ في الخام؛ محتفظ بها كسياق، لا كسطر مكتمل البروتوكول',
                },
            },
            {
                param: { en: 'Galaxy A15 (5000mAh) charge count', ar: 'عدد شحنات Galaxy A15 (5000mAh)' },
                measured: { en: '3.36 charges', ar: '3.36 شحنة' },
                note: {
                    en: 'Physical phone run; 74.2Wh ÷ 22.1Wh per observed full-charge equivalent (§8)',
                    ar: 'اختبار هاتف فعلي؛ 74.2Wh ÷ 22.1Wh لكل معادل شحنة كاملة مرصود (§8)',
                },
            },
            {
                param: { en: 'iPhone 15 charge count', ar: 'عدد شحنات iPhone 15' },
                measured: { en: '~5.15 charges (calculated)', ar: 'نحو 5.15 شحنة (محسوبة)' },
                note: {
                    en: 'Calculated from measured 74.2Wh and 12.99Wh phone battery with charging loss; not physically retested on iPhone 15',
                    ar: 'محسوبة من 74.2Wh المقاسة وبطارية هاتف 12.99Wh مع فقد الشحن؛ لم تُختبر فعليًا على iPhone 15',
                },
            },
            {
                param: { en: 'MacBook Air M2 top-up', ar: 'تعبئة MacBook Air M2' },
                rated: { en: 'MacBook Air M2 battery 52.6Wh', ar: 'بطارية MacBook Air M2: 52.6Wh' },
                measured: { en: '0.91 charge (0→91%)', ar: '0.91 شحنة (0→91%)' },
                note: {
                    en: 'Physical laptop top-up before pack cut-off',
                    ar: 'تعبئة لابتوب فعلية قبل قطع الحزمة',
                },
            },
            {
                param: { en: 'MacBook Pro 14" class top-up', ar: 'تعبئة فئة MacBook Pro 14' },
                measured: { en: '~0.94 charge (calculated for ~70Wh class)', ar: 'نحو 0.94 شحنة (حسابية لفئة ~70Wh)' },
                note: {
                    en: 'Calculated from 74.2Wh; charging rate is laptop-controlled and may require a specific Apple cable path for 140W modes',
                    ar: 'حسابي من 74.2Wh؛ معدل الشحن يتحكم فيه اللابتوب وقد يحتاج مسار كابل Apple محدد لأوضاع 140 واط',
                },
            },
            {
                param: { en: 'Wi-Fi router runtime (~10W)', ar: 'زمن تشغيل راوتر Wi-Fi (~10 واط)' },
                measured: { en: '~7.4 hours (calculated)', ar: 'نحو 7.4 ساعات (محسوبة)' },
                note: {
                    en: '74.2Wh ÷ ~10W ≈ 7.4h (§8); real routers and PD trigger cables vary',
                    ar: '74.2Wh ÷ ~10W ≈ 7.4 ساعة (§8)؛ يختلف الواقع حسب الراوتر وكابل تحفيز PD',
                },
            },
            {
                param: { en: 'Measured weight', ar: 'الوزن المقاس' },
                rated: '632g',
                measured: '634g',
                note: {
                    en: 'Kkmoon scale; within 0.3% of Anker spec',
                    ar: 'ميزان Kkmoon؛ ضمن 0.3% من مواصفة Anker',
                },
            },
            {
                param: { en: 'Measured dimensions', ar: 'الأبعاد المقاسة' },
                rated: '155.8×54.6×49.65 mm',
                measured: '156.2×54.9×49.8 mm',
                note: {
                    en: 'Mitutoyo caliper; aligns with Anker service/Japan specs',
                    ar: 'قدمة Mitutoyo؛ متسق مع مواصفات Anker الخدمة/اليابان',
                },
            },
            {
                param: { en: 'Recall status vs rc2506 (checked 2026-07-23)', ar: 'حالة الاستدعاء مقابل rc2506 (فحص 2026-07-23)' },
                measured: { en: 'A1289 NOT listed', ar: 'A1289 غير مذكور' },
                note: {
                    en: 'Anker rc2506 / CPSC Sept 2025 set: A1257/A1263/A1647/A1652/A1681/A1689 — do not confuse with recalled Zolo/Prime SKUs',
                    ar: 'مجموعة Anker rc2506 / CPSC سبتمبر 2025: A1257/A1263/A1647/A1652/A1681/A1689 — لا تخلطها مع SKU Zolo/Prime المستدعاة',
                },
            },
            {
                param: { en: 'Airline capacity + Emirates/flydubai use ban', ar: 'حد سعة الطيران + حظر استخدام الإمارات/فلاي دبي' },
                rated: { en: '≤100Wh generally allowed in cabin baggage', ar: '≤100Wh مسموح غالبًا في حقيبة المقصورة' },
                measured: { en: '86.4Wh label; under threshold — carry OK, in-flight USE banned on EK/FZ', ar: 'ملصق 86.4Wh؛ أقل من الحد — الحمل مسموح، الاستخدام أثناء الرحلة محظور على EK/FZ' },
                note: {
                    en: 'IATA guidance for Wh class; Emirates & flydubai add no-use / no-device-charging / no-pack-charging onboard rules — verify current DG pages',
                    ar: 'إرشاد IATA لفئة Wh؛ الإمارات وفلاي دبي تضيفان منع الاستخدام / شحن الأجهزة / شحن الحزمة على متن الطائرة — تحقق من صفحات البضائع الخطرة الحالية',
                },
            },
            {
                param: { en: 'Raw-sheet gaps (honesty)', ar: 'نواقص ورقة الخام (أمانة)' },
                measured: {
                    en: 'humidity · wall-V · source-charger model · GM320 surface °C · OCP · full PPS sweep = NOT preserved / NOT run',
                    ar: 'رطوبة · جهد الحائط · موديل شاحن المصدر · حرارة سطح GM320 · OCP · مسح PPS كامل = غير محفوظ / غير منفّذ',
                },
                note: {
                    en: 'v1.2 deepen expands bilingual depth only; does not invent these missing instrument rows',
                    ar: 'تعميق v1.2 يوسّع العمق ثنائي اللغة فقط؛ ولا يخترع صفوف المعدّات الناقصة هذه',
                },
            },
        ],
        verdict: {
            en: 'A1289 remains a credible laptop-class pack: 74.2Wh usable USB-C energy and 136.8W on fixed 28V/5A EPR (§8: 27.4×4.99≈136.8; 74.2÷86.4=85.9%). Not on rc2506. Emirates/flydubai: carry ≤100Wh, no in-flight use. June raw gaps stay disclosed.',
            ar: 'A1289 ما زال باور بانك موثوقًا لفئة اللابتوب: 74.2Wh خرج USB-C قابل للاستخدام و136.8 واط على EPR ثابت 28V/5A (§8: 27.4×4.99≈136.8؛ 74.2÷86.4=85.9%). خارج rc2506. الإمارات/فلاي دبي: حمل ≤100Wh بلا استخدام أثناء الرحلة. نواقص خام يونيو ما زالت مُفصح عنها.',
        },
        pros: [
            {
                en: '74.2Wh measured usable USB-C energy from an 86.4Wh pack — 85.9% usable-energy ratio (§8: 74.2÷86.4) aligning with independent 83–89% bands (Review-Hub/TechRadar)',
                ar: '74.2Wh طاقة USB-C قابلة للاستخدام من حزمة 86.4Wh — نسبة 85.9% (§8: 74.2÷86.4) متسقة مع نطاقات 83–89% المستقلة (Review-Hub/TechRadar)',
            },
            {
                en: '136.8W measured on the fixed 28V/5A PD 3.1 EPR rail (§8: 27.4V×4.99A) — real laptop-class output when paired with a compatible device and 140W-rated cable',
                ar: '136.8 واط مقاسة على مسار PD 3.1 EPR الثابت 28V/5A (§8: 27.4V×4.99A) — خرج حقيقي لفئة اللابتوب مع جهاز وكابل 140 واط متوافقين',
            },
            {
                en: 'CairoVolt physically verified a MacBook Air M2 top-up to 91% and 3.36 Galaxy A15 charge equivalents; other phone/laptop counts are clearly marked calculated from 74.2Wh',
                ar: 'CairoVolt تحققت فعليًا من تعبئة MacBook Air M2 إلى 91% و3.36 شحنة مكافئة لـ Galaxy A15؛ وباقي أعداد الهواتف/اللابتوب موسومة بوضوح كحسابية من 74.2Wh',
            },
            {
                en: 'Independent teardown provenance: ChargerLAB documented six Lishen LR2170LA 21700 cells and the Infineon CYPD3171 protocol chip',
                ar: 'أصل تفكيك مستقل: ChargerLAB وثّق ست خلايا Lishen LR2170LA 21700 وشريحة بروتوكول Infineon CYPD3171',
            },
            {
                en: '86.4Wh below the common 100Wh cabin threshold; A1289 not on Anker rc2506 / CPSC Sept 2025 recall set (A1257/A1263/A1647/A1652/A1681/A1689)',
                ar: '86.4Wh أقل من حد المقصورة الشائع 100Wh؛ A1289 خارج مجموعة استدعاء Anker rc2506 / CPSC سبتمبر 2025 (A1257/A1263/A1647/A1652/A1681/A1689)',
            },
        ],
        limits: [
            {
                en: 'The June raw sheet did not preserve humidity, wall-voltage, or the exact 140W source-charger model; those fields should be recaptured in the next physical retest',
                ar: 'ورقة خام يونيو لم تحفظ الرطوبة أو جهد الحائط أو موديل شاحن المصدر 140 واط بدقة؛ يجب إعادة التقاطها في الاختبار الفعلي القادم',
            },
            {
                en: 'No CairoVolt GM320 surface-temperature row is published for this unit; do not turn independent or display temperature observations into our measured heat claim',
                ar: 'لا ننشر سطر حرارة سطح GM320 من CairoVolt لهذه الوحدة؛ لا تحوّل ملاحظات مستقلة أو قراءات شاشة إلى ادعاء حرارة مقاس لدينا',
            },
            {
                en: 'PPS support was observed/advertised, but the full APDO window was not swept with a programmable load in this pass',
                ar: 'دعم PPS ظهر/مذكور، لكن نافذة APDO الكاملة لم تُمسح بحمل مبرمج في هذه الجولة',
            },
            {
                en: 'Emirates and flydubai allow carriage only under their current ≤100Wh labelled-device rules and prohibit using the pack, charging devices from it, or charging the pack from aircraft sockets during the flight',
                ar: 'الإمارات وفلاي دبي تسمحان بالحمل فقط وفق قواعد الجهاز واضح الملصق ≤100Wh وتمنعان استخدام الحزمة أو شحن الأجهزة منها أو شحنها من مقابس الطائرة أثناء الرحلة',
            },
            {
                en: '634g measured weight is meaningful in a slim laptop bag; smaller 10K/20K packs may be better if the buyer does not need EPR laptop output',
                ar: 'وزن 634 جرامًا المقاس مؤثر في شنطة لابتوب رفيعة؛ قد تكون حزم 10K/20K الأصغر أنسب إذا لم يحتج المشتري خرج EPR للابتوب',
            },
            {
                en: 'Do not confuse A1289 with recalled rc2506 SKUs (A1257/A1263/A1647/A1652/A1681/A1689) — still match the printed MPN and serial on delivery',
                ar: 'لا تخلط A1289 مع موديلات rc2506 المستدعاة (A1257/A1263/A1647/A1652/A1681/A1689) — ما زال يجب مطابقة الـMPN المطبوع والسيريال عند الاستلام',
            },
            {
                en: 'Single retail unit tested; production batches, regional bundle cable, firmware, and serial-specific safety status may vary',
                ar: 'وحدة تجزئة واحدة مُختبرة؛ قد تختلف الدفعات وكابل العبوة الإقليمي والفيرموير وحالة السلامة حسب الرقم التسلسلي',
            },
        ],
    },
};
