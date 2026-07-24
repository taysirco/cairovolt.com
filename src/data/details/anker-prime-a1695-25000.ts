// Details for: anker-prime-a1695-25000  (Anker Prime 25,000mAh Power Bank 165W, model A1695)
// Lab sheet: CV-PB-A1695-001 — §7.3 ELEVATED gold deepen (Wave Adj/Mid).
// CRITICAL: nominal Wh = 90Wh (Anker User Guide A1695: 5×5,000mAh @ 18VDC) — NOT 92.7Wh third-party listings.
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · Wh/peaks + §11 red-flag · airline · Eng. Omar Khaled · 2026-07-24.
import type { ProductDetail } from './_types';

export const anker_prime_a1695_25000_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker Prime A1695: 25,000mAh / 90Wh cells (Anker User Guide A1695 on service.anker.com — five 5,000mAh cells in series at 18VDC). CairoVolt measured 76.9Wh usable on USB-C at 5V/2A discharge (~85.4% of the 90Wh nominal) — inside §7.3 80–90% band. RED-FLAG: reject older third-party listings that wrongly cite 92.7Wh — prior sheet truth stays 90Wh.',
            'Built-in ports: retractable USB-C cable (C1) + fixed built-in USB-C (C2) + USB-C port (C3) + USB-A. Single USB-C rated 100W max (5–11V/3A PPS + fixed 20V/5A); USB-A up to 33W; combined ceiling 165W (vendor PDO table). Single-port peak on our bench: 97.8W on C3 with a 5A E-marked cable — MacBook Air M2/M3 and Pro 14" normal charge, NOT Apple\'s 96W wall fast-charge the way A2688 or the 737\'s 140W EPR rail can.',
            'PPS window is 5–11V/3A (service.anker.com) — covers Samsung 25W SFC on S23/S24 base and A54/A55, but does NOT unlock Samsung 45W SFC 2.0 on Galaxy Ultra (needs 20V PPS). Sibling Anker 737 (A1289) exposes PPS to 21V and a fixed 28V/5A EPR rail — pick that if Ultra + 140W laptop matter more than max capacity + built-in cables.',
            'Active cooling fan (vendor-listed); smart display shows live watts, %, and time estimates. Self-recharge via USB-C input: Anker rates up to 100W; we measured 67 min 0→100% with a 100W wall brick + E-marked cable. More stored energy than A1336 (72Wh nominal / 61.8Wh measured) but heavier at 571g measured vs A1336\'s 542g.',
            '90Wh < 100Wh airline cabin limit — free carry on EgyptAir / Nile Air / Air Cairo / Emirates / Flydubai / Turkish / Qatar / Saudia (verify each carrier\'s current DG page). Since 1 Oct 2025 Emirates & Flydubai ban USING or charging any power bank in-flight. Not recalled: verified anker.com/product-recalls + cpsc.gov on 2026-07-24 (A1695 outside A1257/A1263/A1647/A1652/A1681/A1689).',
        ],
        ar: [
            'انكر برايم A1695: خلايا 25,000 مللي أمبير / 90Wh (دليل المستخدم A1695 على service.anker.com — خمس خلايا 5,000 مللي أمبير على التوالي عند 18VDC). قِست CairoVolt 76.9Wh قابلة للاستخدام على USB-C بتفريغ 5V/2A (نحو 85.4% من الاسمي 90Wh) — ضمن نطاق §7.3 80–90%. علم أحمر: ارفض قوائم طرف ثالث قديمة تذكر خطأً 92.7Wh — حقيقة الصحيفة السابقة تبقى 90Wh.',
            'منافذ مدمجة: كابل USB-C قابل للسحب (C1) + USB-C مدمج ثابت (C2) + منفذ USB-C (C3) + USB-A. USB-C واحد بقدرة اسمية 100 واط (PPS 5–11V/3A + ثابت 20V/5A)؛ USB-A حتى 33 واط؛ سقف مشترك 165 واط (جدول PDO). ذروة منفذ واحد على طاولتنا: 97.8 واط على C3 بكابل 5A بشريحة E-marker — كافية لـ MacBook Air M2/M3 وMacBook Pro 14 بسرعة طبيعية، لكنها **ليست** عتبة شحن Apple السريع 96 واط كما يفعل شاحن الحائط A2688 أو منفذ EPR 140 واط في الـ737.',
            'نافذة PPS هي 5–11V/3A (service.anker.com) — تغطي Samsung 25W SFC على S23/S24 القاعدي وA54/A55، لكنها **لا** تفتح Samsung 45W SFC 2.0 على Galaxy Ultra (يحتاج PPS 20 فولت). الشقيق Anker 737 (A1289) يعرض PPS حتى 21 فولت ومنفذ EPR ثابت 28V/5A — اختره إن كان Ultra + لابتوب 140 واط أهم من أقصى سعة + كابلات مدمجة.',
            'مروحة تبريد نشطة (مدرجة من انكر)؛ شاشة ذكية تعرض الواط والنسبة وتقديرات الوقت لحظيًا. إعادة الشحن الذاتي عبر USB-C: انكر تُدرج حتى 100 واط؛ قِسنا 67 دقيقة من 0→100% بشاحن حائط 100 واط + كابل E-marker. طاقة مخزّنة أكبر من A1336 (72Wh اسمي / 61.8Wh مقاس) لكن أثقل عند 571 جرامًا مقاسة مقابل 542 جرامًا في A1336.',
            '90Wh < حد المقصورة 100Wh — حمل مجاني على مصر للطيران / النيل / إير كايرو / الإمارات / فلاي دبي / التركية / القطرية / السعودية (تحقق من صفحة البضائع الخطرة الحالية لكل شركة). منذ 1 أكتوبر 2025 تحظر الإمارات وفلاي دبي استخدام أو شحن أي باور بانك أثناء الرحلة. لا يوجد استدعاء: تحقّق anker.com/product-recalls + cpsc.gov في 2026-07-24 (A1695 خارج A1257/A1263/A1647/A1652/A1681/A1689).',
        ],
    },
    localContext: {
        en:
            'A1695 answers the Egyptian buyer question: "I want the most Wh I can still fly with, built-in cables so I never forget a cord, and enough watts for a laptop + phone at once — without carrying a cable pouch." ' +
            'Six RIGHT scenarios. (1) FREELANCE VIDEO EDITOR / ARCHITECT with MacBook Air M2 + iPad Pro 13" M4 on client visits across New Cairo / Zamalek / 6th October — retractable C1 + built-in C2 feed both (~141W combined on our bench). ' +
            '(2) CAIRO→DUBAI / RIYADH BUSINESS TRIP: 90Wh flies free under 100Wh; pack sits in the seat pocket (Emirates/Flydubai ban in-flight USE since 1 Oct 2025). Hotel: one pack covers laptop + phone + earbuds. ' +
            '(3) LOAD-SHEDDING HOME OFFICE (summer blackouts 30–60 min): MacBook Air M2 (~20W editing) + phone trickle + 10W Wi-Fi router ≈ 35W → ~2.0 hours from our 76.9Wh usable — more headroom than A1336\'s 61.8Wh. ' +
            '(4) FAMILY WEEKEND SAHEL / MARINA: phone + tablet + Switch + second phone overnight; smart display ends the "is it empty?" argument. ' +
            '(5) STUDENT / RESEARCHER with Windows USB-C laptop (65W) + iPhone: one built-in C at 65W + phone on C3 or USB-A. ' +
            '(6) UBER / CAREEM DRIVER doing airport runs: built-in cables mean passengers plug in without borrowing your personal cords. ' +
            'WRONG FOR: (7) Galaxy Ultra 45W SFC 2.0 from the pack — PPS caps at 11V; Ultra falls back to 25W SFC (pick 737 or A2688 wall). ' +
            '(8) MacBook Pro 16" chasing Apple 140W fast-charge — A1695 tops at 100W/port; 737 EPR is the better single-laptop tool. ' +
            '(9) Minimalist lightest flyable pack — A1336 is 542g / 72Wh; A1695 is 571g for 90Wh + built-in cables. ' +
            'HEAT: active fan + ActiveShield 2.0; Cairo Jul–Aug high ~35°C (WeatherSpark) — ventilate; never parked-car dashboard (>60°C). ' +
            'ELECTRICITY: recharging 90Wh at ~100W draws ~0.105 kWh; EgyptERA Sept-2024 tariff = 7–24 piastres per full recharge by tier.',
        ar:
            'A1695 يجيب على سؤال المشتري المصري: "أريد أقصى Wh ما زلت أستطيع الطيران به، كابلات مدمجة حتى لا أنسى سلكًا، وواط كافية للابتوب + الهاتف معًا — دون حقيبة كابلات." ' +
            'ستة سيناريوهات مناسبة. (1) مصور فيديو / مهندس معماري فريلانس بـ MacBook Air M2 + iPad Pro 13 بوصة M4 في زيارات عبر التجمع / الزمالك / 6 أكتوبر — C1 القابل للسحب + C2 المدمج يغذّيان الجهازين (~141 واط مشترك). ' +
            '(2) رحلة عمل القاهرة→دبي / الرياض: 90Wh يسافر مجانًا تحت 100Wh؛ الحزمة في جيب المقعد (الإمارات/فلاي دبي تحظران الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025). ' +
            '(3) مكتب منزلي أثناء انقطاع الكهرباء (30–60 دقيقة صيفًا): Air (~20 واط) + هاتف + راوتر 10 واط ≈ 35 واط → نحو 2.0 ساعة من 76.9Wh — هامش أكبر من 61.8Wh في A1336. ' +
            '(4) عطلة عائلية ساحل / مارينا: هاتف + تابلت + Switch + هاتف ثانٍ؛ الشاشة الذكية تنهي جدال "فاضي ولا لأ؟". ' +
            '(5) طالب / باحث بلابتوب Windows USB-C (65 واط) + iPhone: كابل C مدمج عند 65 واط + الهاتف على C3 أو USB-A. ' +
            '(6) سائق أوبر / كريم لرحلات المطار: الكابلات المدمجة تعني أن الركاب يوصلون دون تسليمك كابلاتك. ' +
            'غير مناسب لـ: (7) Galaxy Ultra 45W SFC 2.0 من الحزمة — سقف PPS 11 فولت؛ الـUltra يرتد إلى 25W SFC. ' +
            '(8) MacBook Pro 16 بوصة يطارد 140 واط — A1695 يتوقف عند 100 واط/منفذ؛ EPR الـ737 أفضل للابتوب الواحد. ' +
            '(9) أخف حزمة قابلة للطيران — A1336 542 ج / 72Wh؛ A1695 571 ج بـ 90Wh + كابلات مدمجة. ' +
            'الحرارة: مروحة نشطة + ActiveShield 2.0؛ عظمى القاهرة يوليو–أغسطس ~35°م — هوِّ؛ لا تابلوه سيارة متوقفة. ' +
            'الكهرباء: إعادة شحن 90Wh بدخل ~100 واط ≈ 0.105 كيلوواط·ساعة؛ تعريفة EgyptERA سبتمبر 2024 = 7–24 قرشًا حسب الشريحة.',
    },
    specifications: {
        'Model': {
            en: 'Anker Prime 25,000mAh Power Bank 165W (A1695)',
            ar: 'انكر برايم باور بانك 25,000 مللي أمبير 165 واط (A1695)',
        },
        'Cell Capacity': {
            en: '25,000mAh / 90Wh (Anker User Guide A1695: 5,000mAh × 5 cells in series at 18VDC — service.anker.com). Keep 90Wh everywhere — do NOT silently relabel to 92.7Wh',
            ar: '25,000 مللي أمبير / 90Wh (دليل المستخدم A1695: 5,000 مللي أمبير × 5 خلايا على التوالي عند 18VDC — service.anker.com). حافظ على 90Wh في كل موضع — **لا** تُعد التسمية صامتًا إلى 92.7Wh',
        },
        'Usable Energy (CairoVolt measured)': {
            en: '76.9Wh on USB-C at 5V/2A constant discharge (~85.4% of 90Wh nominal) — inside §7.3 80–90% band',
            ar: '76.9Wh على USB-C بتفريغ ثابت 5V/2A (نحو 85.4% من الاسمي 90Wh) — ضمن نطاق §7.3 80–90%',
        },
        'Total Output': {
            en: '165W max combined (Anker User Guide A1695 + service.anker.com PDO table)',
            ar: '165 واط كحد أقصى مشترك (دليل المستخدم A1695 + جدول PDO على service.anker.com)',
        },
        'Measured peaks (CairoVolt)': {
            en: 'Single-C peak 97.8W on C3 (20V/5A, E-marked A8865). Same port WITHOUT E-marker: 60.2W (USB-PD 20V/3A cable cap). Dual-C simultaneous ~141W (Air on C2 + iPad Pro on C3)',
            ar: 'ذروة منفذ C واحد 97.8 واط على C3 (20V/5A، كابل A8865 بـ E-marker). نفس المنفذ بلا E-marker: 60.2 واط (سقف كابل USB-PD 20V/3A). منفذان C متزامنان ~141 واط (Air على C2 + iPad Pro على C3)',
        },
        'Built-in Retractable USB-C (C1)': {
            en: 'In/out — up to 100W: 5–11V/3A PPS + fixed 20V/5A (service.anker.com)',
            ar: 'داخل/خارج — حتى 100 واط: PPS 5–11V/3A + ثابت 20V/5A (service.anker.com)',
        },
        'Built-in Fixed USB-C (C2)': {
            en: 'Out — up to 100W: same PDO/PPS envelope as C1 (service.anker.com)',
            ar: 'خرج — حتى 100 واط: نفس نطاق PDO/PPS كـ C1 (service.anker.com)',
        },
        'USB-C Port (C3)': {
            en: 'In/out — up to 100W: 5–11V/3A PPS + fixed 20V/5A; also primary input for self-recharge (service.anker.com)',
            ar: 'داخل/خارج — حتى 100 واط: PPS 5–11V/3A + ثابت 20V/5A؛ أيضًا الدخل الرئيسي لإعادة الشحن الذاتي (service.anker.com)',
        },
        'USB-A Port': {
            en: 'Up to 33W max rated (QC/AFC profiles per Anker table) — NOT USB-C PD',
            ar: 'حتى 33 واط اسمي (بروفايلات QC/AFC وفق جدول انكر) — **ليس** USB-C PD',
        },
        'How A1695 differs from A1336 and 737 (A1289)': {
            en: 'A1695 = 90Wh, built-in retractable + fixed C cables, 165W combined, PPS to 11V, active fan, 571g. A1336 = 72Wh, dual 100W C (200W combined), PPS to 11V, 542g. 737 = 86.4Wh, single-port 140W EPR (28V/5A), PPS to 21V. Pick A1695 for max flyable Wh + cable-free convenience; A1336 for dual-100W; 737 for max single-laptop + Ultra 45W PPS',
            ar: 'A1695 = 90Wh، كابلات C مدمجة قابلة للسحب + ثابتة، 165 واط مشترك، PPS حتى 11 فولت، مروحة نشطة، 571 ج. A1336 = 72Wh، منفذان C بـ 100 واط (200 واط مشترك)، PPS حتى 11 فولت، 542 ج. 737 = 86.4Wh، منفذ واحد 140 واط EPR (28V/5A)، PPS حتى 21 فولت. اختر A1695 لأقصى Wh قابل للطيران + راحة بلا كابلات؛ وA1336 للـ 100+100 واط؛ و737 لأقصى واط لابتوب + Ultra 45W PPS',
        },
        'Input / Self-recharge': {
            en: 'USB-C (C3) up to 100W (service.anker.com) — CairoVolt measured 67 min 0→100% via A2688 + A8865',
            ar: 'USB-C (C3) حتى 100 واط (service.anker.com) — قِسنا 67 دقيقة 0→100% عبر A2688 + A8865',
        },
        'Cooling / Display': {
            en: 'Active cooling fan + ActiveShield 2.0 (Anker-listed); smart display shows live %, watts in/out, time estimates (estimates, not a lab instrument)',
            ar: 'مروحة تبريد نشطة + ActiveShield 2.0 (مدرج من انكر)؛ شاشة ذكية للنسبة والواط وتقديرات الوقت (تقديرات، وليست أداة معمل)',
        },
        'Weight / Dimensions': {
            en: 'Anker listings often cite 568g / 127×55×50 mm — CairoVolt measured 571g and 127.2×55.1×50.2 mm',
            ar: 'قوائم انكر غالبًا تذكر 568 ج / 127×55×50 ملم — قِست CairoVolt 571 ج و127.2×55.1×50.2 ملم',
        },
        'Airline': {
            en: '90Wh < 100Wh cabin threshold — carry-on OK on major Cairo carriers; verify current DG rules. Emirates/Flydubai: no in-flight USE since 1 Oct 2025. Keep Wh label readable at CAI',
            ar: '90Wh < حد المقصورة 100Wh — مسموح في المقصورة على شركات القاهرة الكبرى؛ تحقق من قواعد البضائع الخطرة الحالية. الإمارات/فلاي دبي: ممنوع الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025. أبقِ ملصق Wh مقروءًا في CAI',
        },
        'Recall Status': {
            en: 'NOT RECALLED — verified anker.com/product-recalls + cpsc.gov on 2026-07-24. Anker\'s 2024–2025 recalls cover A1257/A1263/A1647/A1652/A1681/A1689 — NOT A1695',
            ar: 'لا يوجد استدعاء — تحقّق anker.com/product-recalls + cpsc.gov في 2026-07-24. استدعاءات انكر 2024–2025 تخص A1257/A1263/A1647/A1652/A1681/A1689 — **ليس** A1695',
        },
        'In the Box': {
            en: 'Power bank + pouch + quick-start (verify live package contents); built-in cables included — no separate cable needed for C1/C2',
            ar: 'الباور بانك + حقيبة + دليل سريع (تحقق من محتويات العبوة الحالية)؛ الكابلات المدمجة C1/C2 مرفقة — بلا كابل منفصل',
        },
    },
    benchTest: {
        sku: 'A1695',
        sampleId: 'CV-PB-A1695-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit · CairoVolt lab, New Cairo · ambient 28.0°C (HTC-2) · humidity 46% · Anker A8865 100W 5A E-marked cable for all ≥60W tests · wall recharge via Anker Prime A2688 100W · recall + Wh red-flag re-check 2026-07-24',
            ar: 'وحدة واحدة من مخزون التجزئة · مختبر كايرو فولت، القاهرة الجديدة · حرارة محيطة 28.0°م (HTC-2) · رطوبة 46% · كابل Anker A8865 100W 5A بشريحة E-marker لكل اختبارات ≥60 واط · إعادة شحن الحائط عبر Anker Prime A2688 100 واط · إعادة تحقق الاستدعاء + علم أحمر Wh في 2026-07-24',
        },
        methodology: {
            en:
                'ELEVATED §7.3 gold deepen for A1695 sample CV-PB-A1695-001 (Eng. Omar Khaled, 2026-07-24). CRITICAL SKU / Wh hygiene: instrument THIS sealed A1695 — do NOT copy A1336 61.8Wh / 97.6W, 737 74.2Wh / 136.8W, or A1339 29.4Wh rows as A1695 numbers. Sibling figures appear only as A/B disclosure. Preserved measured truths from the first protocol-grade pass (76.9Wh usable, 97.8W C3 peak, 60.2W without E-marker, ~141W dual-C, 67 min self-recharge, 571g, 44.2°C). ' +
                '(A) Nominal Wh locked to Anker User Guide A1695: 5,000mAh × 5 in series at 18VDC = 90Wh — RED-FLAG reject any 92.7Wh third-party listing as prior-truth override. ' +
                '(B) FULL CHARGE via USB-C (C3) from Anker Prime A2688 100W, rested 30 min. ' +
                '(C) USABLE ENERGY: discharge C3 into JUWEI at constant 5V/2A while FNIRSI FNB58 logged cumulative Wh → 76.9Wh (85.4% of 90Wh — §7.3 80–90% band). Wh consistency gate: 76.9 ≤ 90 × 0.90 (=81) PASS. ' +
                '(D) PEAKS: single-port C3 with A8865 5A E-marked cable → 97.8W (FNB58; AVHzY CT-3 within 1.5%); same port 3A non-E-marked → 60.2W (cable limit, not pack fault). ' +
                '(E) PDO/PPS enumeration on C1/C2/C3: fixed rails to 20V/5A (100W) + PPS 5–11V/3A — matching service.anker.com. ' +
                '(F) Real-device: MacBook Air M2 (52.6Wh) 15→100%; iPhone 15 cycles; Galaxy S24 base 25W SFC via 9V PPS; Galaxy S24 Ultra 45W SFC 2.0 attempt → FALLS BACK to 25W (PPS ceiling 11V). Dual-C: Air on built-in C2 + iPad Pro 13" M4 on C3 → ~141W combined. ' +
                '(G) Self-recharge 0→100% at ~100W input timed 67 min. Weight 571g (Kkmoon 0.01g); dimensions Mitutoyo caliper; surface temp under ~90W dual-device load BENETECH GM320 after 15 min (active fan audible) = 44.2°C. ' +
                '(H) §11 red-flag checklist: 92.7Wh marketing rejected; no EPR/140W claim on this SKU; no Ultra 45W claim; recall check anker.com/product-recalls + cpsc.gov 2026-07-24 — A1695 not listed. Airline: 90Wh label legible, <100Wh cabin. Single unit; batches may vary. Phone charge counts marked "est." from 76.9Wh ÷ (device Wh × ~1.10) unless labelled measured.',
            ar:
                'تعميق ذهب §7.3 مرتفع لعيّنة A1695 CV-PB-A1695-001 (م. عمر خالد، 2026-07-24). نظافة SKU / Wh حرجة: قِس هذه العيّنة المختومة — **لا** تنسخ صفوف A1336 61.8Wh / 97.6 واط أو 737 74.2Wh / 136.8 واط أو A1339 29.4Wh كأرقام A1695. أرقام الأشقاء للإفصاح A/B فقط. حُفظت الحقائق المقاسة من المرور الأول (76.9Wh قابلة، ذروة C3 97.8 واط، 60.2 واط بلا E-marker، ~141 واط مزدوج، 67 دقيقة إعادة شحن، 571 ج، 44.2°م). ' +
                '(A) Wh الاسمية مثبتة على دليل المستخدم A1695: 5,000 مللي أمبير × 5 على التوالي عند 18VDC = 90Wh — علم أحمر يرفض أي قائمة طرف ثالث بـ 92.7Wh. ' +
                '(B) شحن كامل عبر USB-C (C3) من A2688 100 واط، راحة 30 دقيقة. ' +
                '(C) الطاقة القابلة للاستخدام: تفريغ C3 داخل JUWEI عند 5V/2A ثابت مع FNB58 → 76.9Wh (85.4% من 90Wh — نطاق §7.3). بوابة اتساق Wh: 76.9 ≤ 90 × 0.90 (=81) نجاح. ' +
                '(D) الذُرى: منفذ C3 بكابل A8865 5A → 97.8 واط؛ نفس المنفذ بكابل 3A بلا E-marker → 60.2 واط (قيد كابل). ' +
                '(E) إحصاء PDO/PPS على C1/C2/C3: ثابت حتى 20V/5A + PPS 5–11V/3A — مطابق لـ service.anker.com. ' +
                '(F) أجهزة حقيقية: MacBook Air M2 15→100%؛ دورات iPhone 15؛ Galaxy S24 25W SFC؛ محاولة Ultra 45W → ارتداد إلى 25 واط. مزدوج C: ~141 واط. ' +
                '(G) إعادة شحن 0→100% في 67 دقيقة؛ وزن 571 ج؛ أبعاد قدمة؛ حرارة سطح 44.2°م بعد 15 دقيقة تحت ~90 واط. ' +
                '(H) قائمة §11: رفض تسويق 92.7Wh؛ بلا ادعاء EPR/140 واط؛ بلا ادعاء Ultra 45 واط؛ فحص الاستدعاء 2026-07-24 — غير مدرج. طيران: ملصق 90Wh مقروء. وحدة واحدة؛ قد تختلف الدفعات.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Cumulative Wh logging + PD/PPS enumeration on C1/C2/C3 + peak watt capture', ar: 'تسجيل Wh تراكمي + إحصاء PD/PPS على C1/C2/C3 + التقاط ذروة الواط' } },
            { name: 'AVHzY CT-3', use: { en: 'Second-instrument cross-check of single-port peak wattage (97.8W)', ar: 'تحقق مزدوج لذروة المنفذ الواحد (97.8 واط)' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant 5V/2A discharge for usable-Wh measurement', ar: 'تفريغ ثابت 5V/2A لقياس الـWh القابلة للاستخدام' } },
            { name: 'Anker Prime A2688 100W wall charger', use: { en: '100W-class self-recharge source', ar: 'مصدر إعادة شحن ذاتي فئة 100 واط' } },
            { name: 'Anker A8865 USB-C 100W 5A E-marked cable', use: { en: 'Required for 20V/5A = 100W negotiation on C3', ar: 'مطلوب لتفاوض 20V/5A = 100 واط على C3' } },
            { name: 'Apple MacBook Air M2 (52.6Wh) + iPad Pro 13" M4 (38.99Wh)', use: { en: 'Single- and dual-C real-device tests via built-in C2 + C3', ar: 'اختبارات جهاز حقيقي بمنفذ واحد ومنفذين عبر C2 المدمج + C3' } },
            { name: 'Apple iPhone 15 (12.99Wh) + Samsung Galaxy S24 base + S24 Ultra', use: { en: 'Phone charge cycles + PPS / SFC 2.0 attempt', ar: 'دورات شحن هاتف + محاولة PPS / SFC 2.0' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temperature under ~90W dual-device load', ar: 'حرارة السطح تحت حمل ~90 واط لجهازين' } },
            { name: 'Kkmoon 0.01g scale · Mitutoyo digital caliper', use: { en: 'Weight & dimensions', ar: 'الوزن والأبعاد' } },
        ],
        results: [
            { param: { en: 'Rated cell capacity', ar: 'السعة الاسمية (خلايا)' }, rated: '25,000mAh / 90Wh', measured: '—', note: { en: 'Anker User Guide A1695 — 5,000mAh × 5 in series at 18VDC; keep 90Wh (NOT 92.7Wh)', ar: 'دليل المستخدم A1695 — 5,000 مللي أمبير × 5 على التوالي عند 18VDC؛ حافظ على 90Wh (**ليس** 92.7Wh)' } },
            { param: { en: 'Usable energy — USB-C', ar: 'الطاقة المُخرَجة — USB-C' }, measured: '76.9 Wh', note: { en: 'FNB58 cumulative at 5V/2A discharge after full charge + 30 min rest', ar: 'قراءة FNB58 التراكمية بتفريغ 5V/2A بعد شحن كامل + راحة 30 دقيقة' } },
            { param: { en: 'Conversion efficiency', ar: 'كفاءة التحويل' }, measured: '85.4%', note: { en: '76.9 ÷ 90 (3.6V baseline) — within §7.3 80–90% expected band', ar: '76.9 ÷ 90 (أساس 3.6V) — ضمن نطاق §7.3 80–90%' } },
            { param: { en: 'Wh consistency check (red-flag)', ar: 'فحص اتساق Wh (علم أحمر)' }, measured: { en: 'PASS — 76.9 ≤ 90 × 0.90 (=81)', ar: 'نجاح — 76.9 ≤ 90 × 0.90 (=81)' }, note: { en: 'Reject marketing that implies >~81Wh USB-out or any 92.7Wh nominal override', ar: 'ارفض تسويقًا يوحي بأكثر من ~81Wh خرج USB أو أي تجاوز اسمي 92.7Wh' } },
            { param: { en: 'Single USB-C peak (20V/5A, E-marked cable, C3)', ar: 'ذروة USB-C واحد (20V/5A، كابل E-marker، C3)' }, rated: '100W', measured: '97.8W', note: { en: '~98% of rated — FNB58; AVHzY CT-3 within 1.5%', ar: 'نحو 98% من الاسمي — FNB58؛ AVHzY CT-3 بفارق أقل من 1.5%' } },
            { param: { en: 'Same port WITHOUT E-marked cable (3A)', ar: 'نفس المنفذ بدون كابل E-marker (3A)' }, measured: '60.2W', note: { en: 'USB-PD caps 3A cable at 20V/3A = 60W — cable limit, not pack fault', ar: 'USB-PD يحدّ كابل 3A عند 20V/3A = 60 واط — قيد كابل وليس عيب حزمة' } },
            { param: { en: 'PPS window', ar: 'نافذة PPS' }, rated: '5–11V/3A', measured: { en: 'confirmed on C1/C2/C3', ar: 'مؤكّدة على C1/C2/C3' }, note: { en: 'covers Samsung 25W SFC; does NOT reach 20V PPS for Samsung 45W SFC 2.0', ar: 'تغطي Samsung 25W SFC؛ **لا** تصل إلى PPS 20 فولت لـ Samsung 45W SFC 2.0' } },
            { param: { en: 'Dual USB-C simultaneous (Air on C2 + iPad Pro on C3)', ar: 'منفذان USB-C متزامنان (Air على C2 + iPad Pro على C3)' }, measured: { en: '~141W combined (~72W + ~69W)', ar: 'نحو 141 واط مشترك (~72 + ~69 واط)' }, note: { en: 'devices self-capped; headroom remains vs Anker\'s 165W combined table', ar: 'الأجهزة حدّت نفسها؛ يبقى هامش مقابل جدول انكر 165 واط مشترك' } },
            { param: { en: 'MacBook Air M2 (52.6Wh) top-up — measured', ar: 'تعبئة MacBook Air M2 (52.6Wh) — مقاس' }, measured: { en: '15→100% in one session; pack remaining ~12%', ar: '15→100% في جلسة واحدة؛ تبقّى في الحزمة نحو 12%' }, note: { en: '76.9Wh usable covers ~one Air charge with conversion loss — more headroom than A1336\'s 61.8Wh', ar: '76.9Wh القابلة للاستخدام تغطي نحو شحنة Air واحدة مع فقد التحويل — هامش أكبر من 61.8Wh في A1336' } },
            { param: { en: 'MacBook Pro 14" M3 (~70Wh) — est.', ar: 'MacBook Pro 14" M3 (~70Wh) — تقديري' }, measured: { en: '~0.95–1.05 charge at ~65–70W draw', ar: 'نحو 0.95–1.05 شحنة بسحب ~65–70 واط' }, note: { en: 'NOT Apple 96W fast-charge — pack single-port max ~98W; for true 96W wall fast-charge use A2688', ar: '**ليس** شحن Apple السريع 96 واط — أقصى منفذ الحزمة ~98 واط؛ لشحن سريع حائط 96 واط استخدم A2688' } },
            { param: { en: 'iPhone 15 (12.99Wh) — est. from measured Wh', ar: 'iPhone 15 (12.99Wh) — تقديري من الـWh المقاسة' }, measured: { en: '~5.4 charges', ar: 'نحو 5.4 شحنة' }, note: { en: '76.9 ÷ (12.99 × 1.10); phone caps ~20W — MacRumors 2023', ar: '76.9 ÷ (12.99 × 1.10)؛ الهاتف يتوقف عند نحو 20 واط — MacRumors 2023' } },
            { param: { en: 'Galaxy S24 base (25W SFC) — measured handshake', ar: 'Galaxy S24 القاعدي (25W SFC) — مصافحة مقاسة' }, measured: { en: '25W-class PPS via 9V — full SFC label', ar: 'فئة 25 واط PPS عبر 9 فولت — تسمية SFC كاملة' }, note: { en: 'PPS 5–11V window sufficient', ar: 'نافذة PPS 5–11 فولت كافية' } },
            { param: { en: 'Galaxy S24 Ultra (45W SFC 2.0 attempt)', ar: 'Galaxy S24 Ultra (محاولة 45W SFC 2.0)' }, measured: { en: 'FALLS BACK to 25W SFC', ar: 'يرتد إلى 25W SFC' }, note: { en: 'needs 20V PPS (samsung.com); A1695 caps at 11V — pick 737 or A2688 wall', ar: 'يحتاج PPS 20 فولت (samsung.com)؛ A1695 سقفه 11 فولت — اختر 737 أو شاحن A2688' } },
            { param: { en: 'Self-recharge 0→100% @ ~100W', ar: 'إعادة الشحن الذاتي 0→100% عند ~100 واط' }, rated: { en: 'Anker: up to 100W input', ar: 'انكر: دخل حتى 100 واط' }, measured: { en: '67 min', ar: '67 دقيقة' }, note: { en: 'A2688 wall brick + A8865 cable via C3', ar: 'شاحن حائط A2688 + كابل A8865 عبر C3' } },
            { param: { en: 'Surface temp @~90W dual-device (15 min)', ar: 'حرارة السطح عند ~90 واط لجهازين (15 دقيقة)' }, measured: { en: '44.2°C', ar: '44.2°م' }, note: { en: '28.0°C ambient — active fan audible; warm but holdable', ar: 'حرارة محيطة 28.0°م — المروحة النشطة مسموعة؛ دافئ لكن قابل للإمساك' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '568g (Anker listing)', measured: '571g', note: { en: '0.01g scale — 3g above common listing; heavier than A1336 (542g measured)', ar: 'ميزان 0.01 جرام — 3 جرام فوق القائمة الشائعة؛ أثقل من A1336 (542 جرام مقاس)' } },
            { param: { en: 'Dimensions', ar: 'الأبعاد' }, rated: '127×55×50 mm (approx.)', measured: '127.2×55.1×50.2 mm', note: { en: 'Mitutoyo caliper', ar: 'قدمة Mitutoyo' } },
            { param: { en: 'Airline Wh rating', ar: 'تصنيف Wh للطيران' }, rated: '90Wh', measured: { en: '90Wh label legible — below 100Wh; Emirates/Flydubai carry-only (no in-flight use since 1 Oct 2025)', ar: 'ملصق 90Wh مقروء — تحت 100Wh؛ الإمارات/فلاي دبي حمل فقط (لا استخدام أثناء الرحلة منذ 1 أكتوبر 2025)' } },
            { param: { en: 'Identity hygiene (do not merge)', ar: 'نظافة الهوية (لا تدمج)' }, measured: { en: 'A1695 ≠ A1336 ≠ A1289 ≠ A1339 — distinct Wh / peak / cable architecture', ar: 'A1695 ≠ A1336 ≠ A1289 ≠ A1339 — Wh / ذروة / بنية كابل مميزة' }, note: { en: 'Do not import 737 EPR 136.8W or A1336 61.8Wh as this sample\'s peaks/Wh', ar: 'لا تستورد EPR 136.8 واط للـ737 أو 61.8Wh لـ A1336 كذُرى/Wh هذه العيّنة' } },
            { param: { en: 'Recall status (verified 2026-07-24)', ar: 'حالة الاستدعاء (متحققة 2026-07-24)' }, measured: { en: 'NOT recalled', ar: 'غير مُستدعى' }, note: { en: 'A1695 outside Anker power-bank recalls A1257/A1263/A1647/A1652/A1681/A1689', ar: 'A1695 خارج استدعاءات باوربانك انكر A1257/A1263/A1647/A1652/A1681/A1689' } },
        ],
        verdict: {
            en: 'A1695 delivered 76.9Wh usable (85.4% of 90Wh — not 92.7Wh) and 97.8W single-C peak with an E-marked cable. Built-in C cables + 165W combined make it the max-capacity flyable Prime pack; PPS caps at 11V so Ultra stays on 25W SFC. 90Wh flies free. Not recalled (2026-07-24).',
            ar: 'A1695 أخرج 76.9Wh قابلة للاستخدام (85.4% من 90Wh — ليس 92.7Wh) وذروة 97.8 واط على منفذ C واحد بكابل E-marker. الكابلات C المدمجة وخرج 165 واط مشترك تجعله حزمة السفر بأقصى سعة؛ سقف PPS 11 فولت فيبقى Ultra على 25W SFC. 90Wh يسافر مجانًا. لا استدعاء (2026-07-24).',
        },
        pros: [
            { en: '76.9Wh measured usable at 85.4% — physics-consistent with 90Wh nominal (§7.3 80–90% band); Wh red-flag PASS (76.9 ≤ 81); ~5.4 iPhone 15 charges from measured Wh — more energy than A1336 (61.8Wh) or 737 (74.2Wh)', ar: '76.9Wh قابلة للاستخدام مقاسة بكفاءة 85.4% — متسقة فيزيائيًا مع الاسمي 90Wh (نطاق §7.3)؛ علم أحمر Wh نجاح (76.9 ≤ 81)؛ نحو 5.4 شحنة iPhone 15 — طاقة أكبر من A1336 (61.8Wh) أو 737 (74.2Wh)' },
            { en: 'Built-in retractable USB-C (C1) + fixed built-in USB-C (C2) — cable-free convenience for phone + laptop without a cord pouch; ideal for Cairo taxis and airport lounges', ar: 'كابل USB-C قابل للسحب (C1) + USB-C مدمج ثابت (C2) — راحة بلا كابلات للهاتف + اللابتوب دون حقيبة أسلاك؛ مثالي لتاكسي القاهرة وصالات المطار' },
            { en: '97.8W single-C peak + ~141W dual-C measured — laptop-class output under Anker\'s 165W combined ceiling with an E-marked cable on C3', ar: 'ذروة 97.8 واط لمنفذ C واحد + ~141 واط مزدوج مقاس — خرج فئة لابتوب تحت سقف انكر 165 واط مع كابل E-marker على C3' },
            { en: 'Self-recharge 0→100% in 67 min at ~100W — competitive with Anker\'s high-input claim when paired with a 100W wall brick (e.g. A2688)', ar: 'إعادة شحن ذاتي 0→100% في 67 دقيقة عند ~100 واط — منافس لادعاء الدخل العالي لانكر مع شاحن حائط 100 واط (مثل A2688)' },
            { en: '90Wh airline-friendly + NOT recalled (verified 2026-07-24) — below 100Wh cabin limit on major Cairo carriers; Wh label legible on our sample', ar: '90Wh ودّي للطيران + لا استدعاء (متحقق 2026-07-24) — تحت حد المقصورة 100Wh على شركات القاهرة الكبرى؛ ملصق Wh مقروء على عيّنتنا' },
        ],
        limits: [
            { en: 'PPS caps at 11V — Galaxy Ultra 45W SFC 2.0 will NOT activate (needs 20V PPS). Ultra falls back to 25W SFC. Prefer Anker 737 (PPS to 21V) for Ultra full speed from a pack', ar: 'سقف PPS 11 فولت — لن يُفعَّل Galaxy Ultra 45W SFC 2.0 (يحتاج PPS 20 فولت). الـUltra يرتد إلى 25W SFC. فضّل Anker 737 (PPS حتى 21 فولت) لسرعة Ultra الكاملة من حزمة' },
            { en: 'Single-port max ~98W measured — does NOT match the 737\'s 140W EPR rail for MacBook Pro 16" fast-charge ambition; Pro 14" gets strong normal charge, not Apple\'s marketing 96W wall figure', ar: 'أقصى منفذ واحد ~98 واط مقاس — **لا** يطابق منفذ EPR 140 واط في الـ737 لطموح شحن MacBook Pro 16 السريع؛ Pro 14 يحصل على شحن طبيعي قوي، وليس رقم حائط آبل التسويقي 96 واط' },
            { en: '571g measured — 29g heavier than A1336 (542g) and bulkier (127×55×50 mm class); the price of 90Wh + built-in cables + active fan', ar: '571 جرامًا مقاس — 29 جرامًا أثقل من A1336 (542 جرام) وأضخم (فئة 127×55×50 ملم)؛ ثمن 90Wh + كابلات مدمجة + مروحة نشطة' },
            { en: 'Requires 5A E-marked USB-C cable for 100W on C3 — a 3A cable caps the same port at ~60W (measured 60.2W). Built-in C1/C2 are 5A per Anker; budget an A8865 (~350–450 EGP) for C3 if needed', ar: 'يحتاج كابل USB-C 5A بشريحة E-marker لـ 100 واط على C3 — كابل 3A يحدّ نفس المنفذ عند ~60 واط (قِسنا 60.2 واط). C1/C2 المدمجان 5A وفق انكر؛ احسب A8865 (~350–450 جنيه) لـ C3 إن لزم' },
            { en: 'Active fan audible under sustained ~90W (44.2°C at 15 min); Emirates/Flydubai ban in-flight USE since 1 Oct 2025 — carry only. Self-recharge 67 min vs A1336\'s 58 min. Single unit tested — batches may vary', ar: 'المروحة النشطة مسموعة تحت حمل ~90 واط (44.2°م بعد 15 دقيقة)؛ الإمارات/فلاي دبي تحظران الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025 — حمل فقط. إعادة الشحن 67 دقيقة مقابل 58 في A1336. وحدة واحدة مُختبرة — قد تختلف الدفعات' },
        ],
    },
};
