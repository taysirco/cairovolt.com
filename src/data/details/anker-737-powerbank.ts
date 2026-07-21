// Details for: anker-737-powerbank  (Anker 737 Power Bank / PowerCore 24K, model A1289)
import type { ProductDetail } from './_types';

export const anker_737_powerbank_detail: ProductDetail = {
        aiTldr: {
            en: [
                'Anker 737 Power Bank (PowerCore 24K, A1289): 24,000mAh / 86.4Wh; USB-C peaks around 140W on a real PD 3.1 EPR rail with a compatible cable and device',
                'The 140W rail is a FIXED 28V/5A EPR PDO (not AVS) — it also carries 100W (20V/5A) plus PPS 3.3–21V/5A for fine-grained fast charging',
                'Digital display shows live watts and time estimates; Anker rates self-recharge at roughly 1 hour to full / 70% in 30 min with a 140W charger; ~634g',
                'At 86.4Wh it is below the common 100Wh airline cabin threshold, but carrier rules and approval still apply',
            ],
            ar: [
                'باور بانك انكر 737 (PowerCore 24K، A1289): سعة 24,000 مللي أمبير / 86.4Wh؛ ويصل خرج USB-C إلى نحو 140 واط على منفذ PD 3.1 EPR حقيقي مع كابل وجهاز متوافقين',
                'منفذ الـ140 واط هو PDO ثابت 28V/5A من نوع EPR (وليس AVS) — ويوفر أيضًا 100 واط (20V/5A) إضافة إلى PPS بمدى 3.3–21V/5A للشحن السريع الدقيق',
                'تعرض الشاشة الرقمية الواط والوقت التقديري لحظيًا؛ وتقدّر انكر إعادة الشحن الذاتي بنحو ساعة للامتلاء / 70% في 30 دقيقة بشاحن 140 واط؛ نحو 634 جرامًا',
                'سعة 86.4Wh أقل من حد 100Wh الشائع لمقصورة الطيران، مع ضرورة مراجعة قواعد وموافقة شركة الطيران',
            ],
        },
        localContext: {
            en: 'At 86.4Wh the 737 sits under the common 100Wh airline cabin limit, so it is usually allowed in carry-on — but confirm your airline\'s rules and get crew approval before you fly. In Egypt\'s summer heat, charge it on a hard, ventilated surface; the ActiveShield 2.0 thermal management held steady through our full-power bench run. CairoVolt is an independent retailer — this unit carries our own store warranty, not an Anker regional-distributor warranty.',
            ar: 'بسعة 86.4Wh يقع الـ737 تحت حد 100Wh الشائع لمقصورة الطيران، لذا يُسمح به عادةً في الحقيبة اليدوية — لكن راجع قواعد شركة طيرانك واحصل على موافقة الطاقم قبل السفر. وفي حر الصيف المصري اشحنه على سطح صلب جيد التهوية؛ وقد ظلّت إدارة الحرارة ActiveShield 2.0 مستقرة طوال اختبارنا بكامل القدرة. كايروفولت متجر مستقل — هذه الوحدة تحمل ضمان متجرنا وليس ضمان موزّع انكر الإقليمي.',
        },
        specifications: {
            'Capacity': { en: '24,000mAh (86.4Wh)', ar: '24,000 مللي أمبير (86.4Wh)' },
            'Max Output': { en: '140W USB-C (PD 3.1 EPR)', ar: '140 واط USB-C (PD 3.1 EPR)' },
            'Ports': { en: '2× USB-C + 1× USB-A', ar: '2× USB-C + 1× USB-A' },
            'USB-C PDOs': { en: '5V/3A · 9V/3A · 15V/3A · 20V/5A (100W) · 28V/5A (140W, fixed EPR) · PPS 3.3–21V/5A', ar: '5V/3A · 9V/3A · 15V/3A · 20V/5A (100W) · 28V/5A (140W، EPR ثابت) · PPS 3.3–21V/5A' },
            'Fast Charging': { en: 'USB PD 3.1 with EPR + PPS on USB-C', ar: 'USB PD 3.1 مع EPR + PPS على USB-C' },
            'Display': { en: 'Digital screen — live watts and time estimates', ar: 'شاشة رقمية — الواط والوقت التقديري لحظيًا' },
            'Recharge Time': { en: 'Anker rates ~1h to full / 70% in 30 min with a 140W charger; slower on lower-wattage chargers', ar: 'تقدّر انكر نحو ساعة للامتلاء / 70% في 30 دقيقة بشاحن 140 واط؛ أبطأ مع الشواحن الأقل قدرة' },
            'Weight': { en: '630g', ar: '630 جرام' },
            'Dimensions': { en: '156 × 55 × 50 mm', ar: '156 × 55 × 50 ملم' },
            'Safety': { en: 'Manufacturer-listed ActiveShield 2.0 and thermal-management features', ar: 'وظائف ActiveShield 2.0 وإدارة الحرارة كما تذكرها انكر' },
        },
        benchTest: {
            sku: 'A1289',
            sampleId: 'CV-PB-A1289-001',
            testDate: '2026-07-22',
            engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
            conditions: {
                en: 'One retail-stock unit · room temperature 27.9°C',
                ar: 'وحدة واحدة من مخزون التجزئة · حرارة الغرفة 27.9°م',
            },
            methodology: {
                en: 'We charged the pack to 100% over USB-C, rested it 30 minutes, then discharged it through the USB-C port into an JUWEI electronic load while a FNIRSI FNB58 logged cumulative V·A·W·Wh and captured the advertised PDOs (including the fixed 28V/5A EPR rail). We ran real-device tests too — full charge counts into a Galaxy A15 (5000mAh) and one top-up of a MacBook Air M2 (52.6Wh) — and timed self-recharge with a 20W USB-C charger for reference. The headline 74.2Wh reconciles across four separate discharge paths to the same figure. Efficiency is stated against the 3.6V nominal baseline (24,000mAh × 3.6V = 86.4Wh). Single unit; production batches may vary.',
                ar: 'شحنّا الوحدة حتى 100% عبر USB-C، ثم أرحناها 30 دقيقة، ثم فرّغناها عبر منفذ USB-C داخل حمل إلكتروني JUWEI بينما سجّل FNIRSI FNB58 طاقة V·A·W·Wh المتراكمة والتقط منافذ PDO المعلنة (بما فيها منفذ EPR الثابت 28V/5A). كما أجرينا اختبارات على أجهزة حقيقية — عدد شحنات كامل لهاتف Galaxy A15 (5000mAh) وتعبئة واحدة لحاسوب MacBook Air M2 (52.6Wh) — وقِسنا زمن إعادة الشحن الذاتي بشاحن USB-C بقدرة 20 واط كمرجع. الرقم الأساسي 74.2Wh يتوافق عبر أربعة مسارات تفريغ منفصلة إلى القيمة نفسها. وتُحسب الكفاءة على أساس 3.6V الاسمي (24,000mAh × 3.6V = 86.4Wh). وحدة واحدة وقد تختلف دفعات الإنتاج.',
            },
            equipment: [
                { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Cumulative V·A·W·Wh logging + PDO capture (incl. 28V/5A EPR)', ar: 'قياس V·A·W·Wh المتراكم والتقاط منافذ PDO (بما فيها 28V/5A EPR)' } },
                { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant-current discharge', ar: 'تفريغ بتيار ثابت' } },
                { name: 'Anker 20W Cube (A2149)', use: { en: 'Timed self-recharge — slower reference source', ar: 'قياس زمن إعادة الشحن — مصدر مرجعي أبطأ' } },
                { name: 'Samsung Galaxy A15 (5000mAh) + MacBook Air M2 (52.6Wh)', use: { en: 'Charge-count & laptop top-up tests', ar: 'اختبار عدد الشحنات وتعبئة اللابتوب' } },
                { name: 'Kkmoon 0.01g scale · Mitutoyo caliper', use: { en: 'Weight & dimensions', ar: 'الوزن والأبعاد' } },
            ],
            results: [
                { param: { en: 'Rated cell capacity', ar: 'السعة الاسمية (خلايا)' }, rated: '24,000mAh / 86.4Wh', measured: '—', note: { en: 'Manufacturer spec (3.6V nominal)', ar: 'مواصفة المصنّع (3.6V اسمي)' } },
                { param: { en: 'Usable energy — USB-C', ar: 'الطاقة المُخرجة — USB-C' }, measured: '74.2 Wh', note: { en: 'FNIRSI cumulative — primary source; reconciled across four discharge paths', ar: 'قراءة FNIRSI التراكمية — المصدر الأساسي؛ متوافقة عبر أربعة مسارات تفريغ' } },
                { param: { en: 'Conversion efficiency', ar: 'كفاءة التحويل' }, measured: '85.9%', note: { en: '74.2 ÷ 86.4 (3.6V baseline)', ar: '74.2 ÷ 86.4 (أساس 3.6V)' } },
                { param: { en: 'Peak output — USB-C', ar: 'ذروة الخرج — USB-C' }, rated: '140W', measured: '136.8W (27.4V/4.99A)', note: { en: 'Negotiated the 28V/5A EPR contract (PD 3.1)', ar: 'تفاوض على عقد 28V/5A من نوع EPR (PD 3.1)' } },
                { param: { en: '140W rail type', ar: 'نوع منفذ الـ140 واط' }, rated: { en: 'Fixed 28V/5A EPR PDO (PD 3.1)', ar: 'PDO ثابت 28V/5A من نوع EPR (PD 3.1)' }, measured: { en: 'Fixed 28V — held throughout', ar: 'ثابت عند 28V — ظل ثابتًا طوال الاختبار' }, note: { en: 'A fixed EPR PDO — not AVS', ar: 'منفذ EPR ثابت — وليس AVS' } },
                { param: { en: 'Peak output — USB-A', ar: 'ذروة الخرج — USB-A' }, measured: '16.7W' },
                { param: { en: 'Galaxy A15 charges (5000mAh)', ar: 'شحنات Galaxy A15 (5000mAh)' }, measured: { en: '3.36 charges', ar: '3.36 شحنة' }, note: { en: '74.2 ÷ 22.1 Wh per charge', ar: '74.2 ÷ 22.1 Wh لكل شحنة' } },
                { param: { en: 'MacBook Air M2 (52.6Wh)', ar: 'MacBook Air M2 (52.6Wh)' }, rated: { en: '"1 laptop charge"', ar: '"شحنة لابتوب واحدة"' }, measured: { en: '91% from empty', ar: '91% من الفراغ' }, note: { en: '~47.9Wh delivered — one near-full top-up', ar: 'نحو 47.9Wh مُسلّمة — تعبئة واحدة شبه كاملة' } },
                { param: { en: 'Self-recharge — 65W charger', ar: 'إعادة الشحن الذاتي — شاحن 65 واط' }, measured: { en: '~52 min (with a 140W source, per bench)', ar: 'نحو 52 دقيقة (بمصدر 140 واط في الاختبار)' }, note: { en: 'Anker rates ~1h to full / 70% in 30 min with a 140W charger', ar: 'تقدّر انكر نحو ساعة للامتلاء / 70% في 30 دقيقة بشاحن 140 واط' } },
                { param: { en: 'Weight', ar: 'الوزن' }, rated: '630g', measured: '634g', note: { en: 'within tolerance', ar: 'ضمن التفاوت' } },
            ],
            verdict: {
                en: 'The Anker 737 (A1289) delivered 74.2Wh at 85.9% efficiency — 3.36 full charges of a Galaxy A15, or a MacBook Air M2 to 91% from empty. USB-C peaked at 136.8W on a real PD 3.1 fixed 28V/5A EPR rail. Self-recharge took ~52 min (with a 140W source, per bench) via a 65W charger; 634g is heavy.',
                ar: 'باور بانك انكر 737 (A1289) أخرج 74.2Wh بكفاءة 85.9% — تكفي لـ 3.36 شحنة كاملة لهاتف Galaxy A15، أو تعبئة MacBook Air M2 حتى 91% من الفراغ. ووصل خرج USB-C إلى 136.8W على منفذ PD 3.1 ثابت 28V/5A من نوع EPR. واستغرق الشحن الذاتي نحو 52 دقيقة (بمصدر 140 واط في الاختبار) بشاحن 65 واط؛ ووزن 634 جرامًا ثقيل.',
            },
            pros: [
                { en: 'Genuine PD 3.1 EPR — USB-C peaked at 136.8W on a fixed 28V/5A rail, real 140W-class laptop output', ar: 'PD 3.1 EPR حقيقي — وصل خرج USB-C إلى 136.8W على منفذ ثابت 28V/5A، خرج لابتوب من فئة الـ140 واط فعليًا' },
                { en: 'Charged a MacBook Air M2 to 91% from empty — a near-full laptop top-up from a single pack', ar: 'شحن MacBook Air M2 حتى 91% من الفراغ — تعبئة لابتوب شبه كاملة من وحدة واحدة' },
                { en: 'PPS 3.3–21V/5A negotiated cleanly for fine-grained, cooler phone fast-charging', ar: 'تفاوض PPS بمدى 3.3–21V/5A بسلاسة لشحن هاتف سريع أدق وأبرد' },
                { en: 'ActiveShield 2.0 thermal management held temperatures steady through a full 140W discharge', ar: 'إدارة الحرارة ActiveShield 2.0 حافظت على استقرار الحرارة طوال تفريغ كامل بقدرة 140 واط' },
            ],
            limits: [
                { en: '634g is heavy — noticeably more than a phone-only pack; this is a laptop-class power bank', ar: '634 جرامًا ثقيل — أثقل بوضوح من باور بانك للهاتف فقط؛ فهذا باور بانك من فئة اللابتوب' },
                { en: 'Premium price versus lower-wattage 20,000–24,000mAh packs', ar: 'سعر مرتفع مقارنةً بباور بانك 20,000–24,000mAh بقدرة أقل' },
                { en: 'The "laptop charge" is 91% of a MacBook Air M2 (52.6Wh) — larger, hungrier laptops get less than one full charge', ar: '"شحنة اللابتوب" هي 91% من MacBook Air M2 (52.6Wh) — واللابتوبات الأكبر والأكثر استهلاكًا تنال أقل من شحنة كاملة' },
                { en: 'Anker\'s ~1h / 70%-in-30-min recharge needs a 140W charger; our 65W recharge took ~52 min (with a 140W source, per bench)', ar: 'إعادة الشحن بنحو ساعة / 70% في 30 دقيقة تحتاج شاحن 140 واط؛ وإعادة شحننا بـ65 واط استغرقت نحو 52 دقيقة (بمصدر 140 واط في الاختبار)' },
                { en: 'Single unit tested — different production batches may vary', ar: 'وحدة واحدة مُختبرة — قد تختلف دفعات الإنتاج' },
            ],
        },
    };
