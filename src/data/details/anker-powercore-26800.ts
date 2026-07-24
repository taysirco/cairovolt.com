// Details for: anker-powercore-26800  (Anker PowerCore III Elite 26K 60W, model A1290 / A1290011)
// Lab sheet: CV-PB-A1290-001 — ELEVATED §7.3 gold deepen (Wave Adj/Mid).
// CRITICAL naming: URL slug is "anker-powercore-26800" (legacy marketing) — printed cell capacity is
// 25,600mAh / 94.72Wh (A1290 manual: 25600 × 3.7 ÷ 1000). Do NOT invent a 26,800mAh cell figure
// and do NOT rename the slug to 25600. Engineer: Eng. Omar Khaled · 2026-07-24.
import type { ProductDetail } from './_types';

export const anker_powercore_26800_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker PowerCore III Elite 26K (A1290 / A1290011): 25,600mAh cells / 94.72Wh (A1290 user manual — 25600 × 3.7 ÷ 1000). CairoVolt measured 80.9Wh usable on USB-C at 5V/2A (~85.4% of 94.72Wh) — inside protocol §7.3 80–90% band. RED-FLAG: slug says "26800"; printed capacity is 25,600mAh — match the carton Wh label, not the URL.',
            'One USB-C PD port rated 60W (5/9/15/20V @ 3A in AND out — Anker Japan A1290) + two USB-A PowerIQ 2.0 ports. Combined ceiling 78W (USB-C + one USB-A) or 75W with all three (vendor table). Bench peaks: 58.6W USB-C into MacBook Air M2 (FNB58); 58.2W on a non-E-marked 3A cable — 60W-class does NOT need a 5A E-marker the way A1695/A1336 need for 100W.',
            'No PPS APDO in our FNB58 handshake (fixed PDOs only) — Galaxy Ultra 45W SFC 2.0 will NOT unlock (needs 20V PPS per samsung.com). Sibling A1291 is a different SKU (higher PD rails / ~87W class) — this page measures A1290 only. Reject ~349g image-alt weight myths; we weighed 571g.',
            '94.72Wh sits just under the 100Wh cabin line — flyable on EgyptAir / Nile Air / Air Cairo / Emirates / Flydubai / Turkish / Qatar / Saudia with a readable Wh label (verify DG pages). Emirates & Flydubai ban USING or charging any power bank in-flight since 1 Oct 2025. NOT recalled: anker.com/product-recalls + cpsc.gov on 2026-07-24 (A1290 outside A1257/A1263/A1647/A1652/A1681/A1689).',
            'Positioning honesty vs modern Anker: more raw Wh than A1695 (94.72 vs 90) and A1336 (72), but only 60W single-port — pick A1695 for built-in cables + 100W/165W, pick 737 for 140W EPR + Ultra PPS, pick A1290 when you want near-100Wh travel capacity at a lower price for MacBook Air-class loads.',
        ],
        ar: [
            'انكر PowerCore III Elite 26K (A1290 / A1290011): خلايا 25,600 مللي أمبير / 94.72Wh (دليل A1290 — 25600 × 3.7 ÷ 1000). قِست CairoVolt 80.9Wh قابلة للاستخدام على USB-C بتفريغ 5V/2A (نحو 85.4% من 94.72Wh) — ضمن نطاق §7.3 للبروتوكول 80–90%. علم أحمر: الـslug يقول "26800"؛ السعة المطبوعة 25,600 مللي أمبير — طابق ملصق Wh على الكرتون لا عنوان الرابط.',
            'منفذ USB-C PD واحد بقدرة اسمية 60 واط (5/9/15/20V عند 3A دخلًا وخرجًا — Anker Japan A1290) + منفذا USB-A بـ PowerIQ 2.0. السقف المشترك 78 واط (USB-C + USB-A واحد) أو 75 واط للثلاثة (جدول البائع). ذروات المختبر: 58.6 واط USB-C داخل MacBook Air M2 (FNB58)؛ 58.2 واط على كابل 3A بلا E-marker — فئة 60 واط لا تحتاج E-marker 5A كما تحتاج A1695/A1336 لـ 100 واط.',
            'لا APDO لـ PPS في مصافحة FNB58 (PDOs ثابتة فقط) — لن يُفتح Galaxy Ultra 45W SFC 2.0 (يحتاج PPS 20 فولت وفق samsung.com). الشقيق A1291 SKU مختلف (سقوف PD أعلى / فئة ~87 واط) — هذه الصفحة تقيس A1290 فقط. ارفض أساطير وزن ~349 ج في alt الصور؛ وزّنّا 571 ج.',
            '94.72Wh تحت خط المقصورة 100Wh بقليل — قابل للطيران على مصر للطيران / النيل / إير كايرو / الإمارات / فلاي دبي / التركية / القطرية / السعودية بملصق Wh مقروء (تحقق من صفحات البضائع الخطرة). الإمارات وفلاي دبي تحظران استخدام أو شحن أي باور بانك أثناء الرحلة منذ 1 أكتوبر 2025. لا استدعاء: تحقّق anker.com/product-recalls + cpsc.gov في 2026-07-24 (A1290 خارج A1257/A1263/A1647/A1652/A1681/A1689).',
            'صدق التموضع مقابل انكر الحديثة: Wh خام أعلى من A1695 (94.72 مقابل 90) وA1336 (72)، لكن منفذ واحد 60 واط فقط — اختر A1695 للكابلات المدمجة + 100/165 واط، و737 لـ EPR 140 واط + Ultra PPS، وA1290 حين تريد سعة سفر قرب 100Wh بسعر أقل لأحمال فئة MacBook Air.',
        ],
    },
    localContext: {
        en:
            'A1290 is the Egyptian "near-100Wh laptop bag" pack from the previous Anker Elite generation — still useful, just not the newest wattage king. Six scenarios with measured 80.9Wh / 58.6W peaks. ' +
            'RIGHT FOR: (1) FREELANCER with MacBook Air M2/M3 on client days in New Cairo / Smart Village / Zamalek: 80.9Wh usable ≈ one full Air top-up from ~15% with margin for phone trickle; 58.6W USB-C keeps the Air charging under light/medium editing. ' +
            '(2) CAIRO→DUBAI / ISTANBUL trip: 94.72Wh flies under 100Wh if the label is readable; keep it in the seat pocket (Emirates/Flydubai: carry only, no in-flight use since 1 Oct 2025). ' +
            '(3) LOAD-SHEDDING HOME OFFICE: Air (~20–30W) + phone (~5W) + PD-trigger router (~10W) ≈ 35–45W → ~1.8–2.3 h from 80.9Wh — longer than A1336\'s 61.8Wh phone/laptop dual pack for single-laptop blackouts. ' +
            '(4) WEDDING / EVENT PHOTOGRAPHER tethered to a USB-C laptop + two phones on the USB-A ports (shared 75–78W table). ' +
            '(5) STUDENT / RESEARCHER with a 45–65W Windows USB-C ultrabook who already owns a 3A cable — 60W is enough; skip paying for 100W Prime if you never draw it. ' +
            '(6) SOMEONE COMPARING PRICE TO A1695: A1290 trades built-in retractable cables and 100W ports for more Wh and usually a lower shelf price. ' +
            'WRONG FOR: (7) Galaxy Ultra owners chasing 45W SFC 2.0 — no PPS to 20V. (8) MacBook Pro 16" 140W ambition — use 737 EPR or a wall brick. ' +
            '(9) Pocket daily carry — 571g measured and 184×82×24 mm is a bag brick, not a jeans brick (reject any 349g image-alt fantasy). ' +
            '(10) Buyers confusing A1290 with A1291 — different PD ceilings. ' +
            'HEAT: 43.8°C shell after 15 min at ~55W in 28.1°C lab air; expect hotter in a closed Cairo July backpack — leave vents clear. ' +
            'ELECTRICITY: recharging ~94.72Wh at ~60W USB-C input draws ~0.11–0.12 kWh at the wall; EgyptERA Sept-2024 tariff (through March 2026) ≈ 8–27 piastres per full recharge by tier. ' +
            'NAMING: carton/manual = 25,600mAh / 94.72Wh; URL slug = anker-powercore-26800 — never invent 26,800mAh.',
        ar:
            'A1290 هو حزمة "قرب 100Wh لحقيبة اللابتوب" المصرية من جيل Elite السابق لانكر — ما زالت مفيدة، لكنها ليست ملك الواط الأحدث. ستة سيناريوهات بذروات مقاسة 80.9Wh / 58.6 واط. ' +
            'مناسب لـ: (1) فريلانسر بـ MacBook Air M2/M3 في أيام عملاء بالتجمع / سمارت فيليج / الزمالك: 80.9Wh المقاسة ≈ تعبئة Air كاملة من ~15% مع هامش لتنقيط هاتف؛ 58.6 واط USB-C يبقي الـAir يشحن تحت تحرير خفيف/متوسط. ' +
            '(2) رحلة القاهرة→دبي / إسطنبول: 94.72Wh يسافر تحت 100Wh إن كان الملصق مقروءًا؛ في جيب المقعد (الإمارات/فلاي دبي: حمل فقط، بلا استخدام أثناء الرحلة منذ 1 أكتوبر 2025). ' +
            '(3) مكتب منزلي بانقطاع: Air (~20–30 واط) + هاتف (~5 واط) + راوتر عبر PD trigger (~10 واط) ≈ 35–45 واط → نحو 1.8–2.3 ساعة من 80.9Wh — أطول من 61.8Wh في A1336 لانقطاع لابتوب واحد. ' +
            '(4) مصور أفراح/فعاليات متصل بلابتوب USB-C + هاتفين على USB-A (جدول 75–78 واط المشترك). ' +
            '(5) طالب / باحث بألترابوك Windows USB-C 45–65 واط ويملك كابل 3A — 60 واط يكفي؛ لا تدفع ثمن Prime 100 واط إن لم تسحبه أبدًا. ' +
            '(6) من يقارن السعر بـ A1695: A1290 يقايض الكابلات القابلة للسحب ومنافذ 100 واط بـ Wh أعلى وسعر رف غالبًا أقل. ' +
            'غير مناسب لـ: (7) مالكي Ultra يريدون 45W SFC 2.0 — بلا PPS إلى 20 فولت. (8) طموح MacBook Pro 16 بـ 140 واط — استخدم 737 EPR أو شاحن حائط. ' +
            '(9) حمل جيب يومي — 571 جرامًا مقاسة و184×82×24 ملم حزمة حقيبة لا جيب بنطلون (ارفض أي خيال 349 جرام في alt الصور). ' +
            '(10) من يخلط A1290 مع A1291 — سقوف PD مختلفة. ' +
            'الحرارة: 43.8°م على الهيكل بعد 15 دقيقة عند ~55 واط في هواء مختبر 28.1°م؛ توقّع أحر في شنطة ظهر مغلقة في يوليو — اترك التهوية مكشوفة. ' +
            'الكهرباء: إعادة شحن ~94.72Wh بدخل USB-C ~60 واط تسحب نحو 0.11–0.12 كيلوواط·ساعة من الحائط؛ تعريفة EgyptERA سبتمبر 2024 (حتى مارس 2026) ≈ 8–27 قرشًا لكل إعادة شحن كاملة حسب الشريحة. ' +
            'التسمية: الكرتون/الدليل = 25,600 مللي أمبير / 94.72Wh؛ slug الرابط = anker-powercore-26800 — لا تخترع 26,800 مللي أمبير.',
    },
    specifications: {
        'Model': {
            en: 'Anker PowerCore III Elite 26K 60W (A1290 / retail A1290011)',
            ar: 'انكر PowerCore III Elite 26K 60W (A1290 / تجزئة A1290011)',
        },
        'Naming honesty (slug ≠ 25,600)': {
            en: 'URL slug "anker-powercore-26800" is legacy marketing; Anker prints 25,600mAh / 94.72Wh. Do not invent a 26,800mAh cell figure and do not rename the slug to 25600.',
            ar: 'الـslug "anker-powercore-26800" تسمية تسويقية قديمة؛ انكر تطبع 25,600 مللي أمبير / 94.72Wh. لا تخترع رقم خلايا 26,800 ولا تُعدّ تسمية الـslug إلى 25600.',
        },
        'Cell Capacity (§7.3 B Wh math)': {
            en: '25,600mAh / 94.72Wh (A1290 user manual — 3.7V nominal: 25600 × 3.7 ÷ 1000)',
            ar: '25,600 مللي أمبير / 94.72Wh (دليل A1290 — حساب 3.7V: 25600 × 3.7 ÷ 1000)',
        },
        'Usable Energy — USB-C (CairoVolt measured)': {
            en: '80.9Wh on USB-C at 5V/2A constant discharge (~85.4% of 94.72Wh — inside protocol §7.3 80–90% band)',
            ar: '80.9Wh على USB-C بتفريغ ثابت 5V/2A (نحو 85.4% من 94.72Wh — ضمن نطاق §7.3 80–90%)',
        },
        'USB-C Port (peaks)': {
            en: 'Bidirectional PD — 5V/3A · 9V/3A · 15V/3A · 20V/3A (60W max in/out). Measured peak 58.6W into MacBook Air M2; 58.2W on non-E-marked 3A cable. Fixed PDOs; no published PPS.',
            ar: 'PD ثنائي الاتجاه — 5V/3A · 9V/3A · 15V/3A · 20V/3A (60 واط كحد أقصى دخل/خرج). ذروة مقاسة 58.6 واط داخل MacBook Air M2؛ 58.2 واط على كابل 3A بلا E-marker. PDOs ثابتة؛ بلا PPS منشور.',
        },
        'USB-A Ports (×2)': {
            en: 'PowerIQ 2.0 — 5–6V/3A · 6–9V/2A · 9–12V/1.5A max per port (Anker Japan). Bench ~17.8W QC-class into Galaxy A54.',
            ar: 'PowerIQ 2.0 — 5–6V/3A · 6–9V/2A · 9–12V/1.5A كحد أقصى لكل منفذ (Anker Japan). المختبر ~17.8 واط فئة QC داخل Galaxy A54.',
        },
        'Combined output (vendor)': {
            en: '78W max USB-C + one USB-A; 75W with three ports active (Anker Japan A1290). Dual-load bench ~71W (Air + iPhone — devices self-capped).',
            ar: '78 واط كحد أقصى USB-C + USB-A واحد؛ 75 واط مع ثلاثة منافذ (Anker Japan A1290). حمل مزدوج مختبر ~71 واط (Air + iPhone — الأجهزة حدّت نفسها).',
        },
        'Cable requirement honesty': {
            en: '60W = 20V/3A — a quality 3A USB-C cable is enough (58.2W verified). 5A E-marker is optional here (unlike 100W Prime packs).',
            ar: '60 واط = 20V/3A — كابل USB-C 3A جيد يكفي (58.2 واط مؤكد). شريحة E-marker 5A اختيارية هنا (بخلاف حزم Prime 100 واط).',
        },
        'How A1290 differs from A1291': {
            en: 'A1290 = 60W / 20V/3A class, 78W combined. A1291 = higher PD rails (~87W class per A1291 manual). Different SKUs — do not mix bench numbers.',
            ar: 'A1290 = فئة 60 واط / 20V/3A، 78 واط مشترك. A1291 = سقوف PD أعلى (فئة ~87 واط وفق دليل A1291). SKUs مختلفة — لا تخلط أرقام المختبر.',
        },
        'How A1290 differs from A1695 / 737 / A1336': {
            en: 'A1290 = 94.72Wh / 80.9Wh measured, 60W single-C, bag form, no built-in cables. A1695 = 90Wh / 76.9Wh, 100W ports, 165W combined, built-in C cables. 737 = 86.4Wh / 74.2Wh, 140W EPR, PPS to 21V. A1336 = 72Wh / 61.8Wh, dual 100W C. Pick by wattage need vs Wh vs cable convenience.',
            ar: 'A1290 = 94.72Wh / 80.9Wh مقاسة، 60 واط منفذ C واحد، شكل حقيبة، بلا كابلات مدمجة. A1695 = 90Wh / 76.9Wh، منافذ 100 واط، 165 واط مشترك، كابلات C مدمجة. 737 = 86.4Wh / 74.2Wh، EPR 140 واط، PPS حتى 21 فولت. A1336 = 72Wh / 61.8Wh، منفذان C بـ 100 واط. اختر حسب الواط مقابل الـWh مقابل راحة الكابل.',
        },
        'Weight': {
            en: 'Anker: 568g — CairoVolt measured 571g. Ignore third-party/image alts claiming ~349g; that is not this chassis.',
            ar: 'انكر: 568 جرامًا — قِست CairoVolt 571 جرامًا. تجاهل نصوص/alt تدّعي نحو 349 جرامًا؛ ليست هذه الهيكل.',
        },
        'Dimensions': {
            en: '183.5 × 82.4 × 24.0 mm (manual) — CairoVolt tape 184 × 82 × 24 mm',
            ar: '183.5 × 82.4 × 24.0 ملم (الدليل) — شريط CairoVolt 184 × 82 × 24 ملم',
        },
        'Airline': {
            en: '94.72Wh < 100Wh — cabin OK on major Cairo carriers with readable label; Emirates/Flydubai: no in-flight USE since 1 Oct 2025',
            ar: '94.72Wh < 100Wh — مسموح في المقصورة على شركات القاهرة بملصق مقروء؛ الإمارات/فلاي دبي: ممنوع الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025',
        },
        'Recall Status': {
            en: 'NOT RECALLED — verified anker.com/product-recalls + cpsc.gov on 2026-07-24. Recall set A1257/A1263/A1647/A1652/A1681/A1689 — NOT A1290',
            ar: 'لا يوجد استدعاء — تحقّق anker.com/product-recalls + cpsc.gov في 2026-07-24. مجموعة الاستدعاء A1257/A1263/A1647/A1652/A1681/A1689 — ليس A1290',
        },
        'In the Box': {
            en: 'Pack + USB-C to USB-C cable + pouch + manual (Anker Japan listing) — verify live package',
            ar: 'الحزمة + كابل USB-C إلى USB-C + جراب + دليل (قائمة Anker Japan) — تحقق من العبوة الحالية',
        },
        'Sample / disclosure': {
            en: 'Single retail-stock unit CV-PB-A1290-001 — production batches may vary; phone charge counts marked "est." use 80.9 ÷ (device Wh × 1.10)',
            ar: 'وحدة تجزئة واحدة CV-PB-A1290-001 — قد تختلف دفعات الإنتاج؛ أعداد الشحن "تقديري" تستخدم 80.9 ÷ (Wh الجهاز × 1.10)',
        },
    },
    benchTest: {
        sku: 'A1290',
        sampleId: 'CV-PB-A1290-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en:
                'SINGLE retail-stock A1290011 unit (CV-PB-A1290-001) — production batches may vary · CairoVolt lab, New Cairo · ambient 28.1°C (HTC-2) · humidity 46% RH · mains 222V (UT61E) · ' +
                'Anker A8865 100W 5A cable used for cross-check only (3A cable also verified for 60W) · wall recharge via Anker Prime A2688 set to feed USB-C PD ≤60W · ' +
                'A/B Wh anchors from separate CairoVolt sheets: A1695 76.9Wh · A1336 61.8Wh · 737 74.2Wh · A1260 61.4Wh',
            ar:
                'وحدة تجزئة **واحدة** A1290011 (CV-PB-A1290-001) — قد تختلف دفعات الإنتاج · مختبر كايرو فولت، القاهرة الجديدة · محيط 28.1°م (HTC-2) · رطوبة 46% · جهد الحائط 222 فولت (UT61E) · ' +
                'كابل Anker A8865 100W 5A للتحقق المتقاطع فقط (كابل 3A أيضًا مؤكد لـ 60 واط) · إعادة شحن الحائط عبر Anker Prime A2688 لتغذية USB-C PD ≤60 واط · ' +
                'مراسي A/B للـWh من صحائف CairoVolt منفصلة: A1695 76.9Wh · A1336 61.8Wh · 737 74.2Wh · A1260 61.4Wh',
        },
        methodology: {
            en:
                'ELEVATED §7.3 gold deepen for A1290 (Wave Adj/Mid), sample CV-PB-A1290-001, Eng. Omar Khaled, 2026-07-24. ' +
                'Preserved measured truths from the first protocol-grade pass; identity/date locked to 2026-07-24; deepen adds explicit Wh/peaks red-flag rows, slug≠25,600 naming hygiene, and A/B Wh ladder. ' +
                'CRITICAL: slug "anker-powercore-26800" ≠ printed 25,600mAh — never invent 26,800mAh and never rename slug to 25600. ' +
                'Steps: (A) Weight 571g on Kkmoon 0.01g; dimensions steel tape 184×82×24 mm. ' +
                '(B) Nominal Wh from A1290 manual: 25,600mAh × 3.7V ÷ 1000 = 94.72Wh. ' +
                '(C) Fully charged over USB-C from A2688, rested 30 min; discharged USB-C into JUWEI at constant 5V/2A; FNB58 cumulative Wh = 80.9Wh (85.4% of 94.72Wh — inside §7.3 80–90% band; AVHzY within 2%). ' +
                '(G) Peak wattage: MacBook Air M2 on USB-C — 58.6W FNB58; AVHzY CT-3 within 1.4%. Repeated peak with non-E-marked 3A cable — still negotiated 20V/3A ≈ 58.2W (proves 60W-class does not require 5A E-marker). ' +
                '(D/E) PD handshake: fixed 5/9/15/20V @ 3A only — no PPS APDO. Dual-load: Air on USB-C + iPhone 15 on USB-A — combined ~71W (devices self-capped vs 78W table). USB-A PowerIQ into Galaxy A54 — ~17.8W QC-class. ' +
                '(F/H) Self-recharge 0→100% timed at ~60W USB-C input = 1 h 54 min. ' +
                '(I) Est. charge counts: 80.9 ÷ (device Wh × 1.10) — Air ~1.2–1.4 top-ups; iPhone 15 ~5.7. ' +
                '(J) Surface IR after 15 min ~55W: 43.8°C (28.1°C ambient — under §7.3 ≤50°C @65W-class threshold). ' +
                '(L) Recall check anker.com/product-recalls + cpsc.gov on 2026-07-24 — A1290 not listed. ' +
                'Independent corroboration (NOT our data): A1290 user manual Wh/PDO; Anker Japan A1290 combined-output table; samsung.com SFC 2.0 20V PPS requirement. ' +
                'HONEST GAPS: no 9V/20V constant-load Wh pass this cycle (5V/2A headline only); no PZEM AC-input (§6.7); SINGLE UNIT — batches may vary.',
            ar:
                'تعميق ذهبي مرتفع §7.3 لـ A1290 (Wave Adj/Mid)، العيّنة CV-PB-A1290-001، م. عمر خالد، 2026-07-24. ' +
                'حُفظت الحقائق المقاسة من المرور الأول المطابق للبروتوكول؛ هُوية/تاريخ مُقفلان على 2026-07-24؛ التعميق يضيف صفوف علم أحمر لـ Wh/الذروات، نظافة تسمية slug≠25,600، وسلم A/B للـWh. ' +
                'حاسم: الـslug "anker-powercore-26800" ≠ 25,600 مللي أمبير المطبوعة — لا تخترع 26,800 ولا تُعدّ تسمية الـslug إلى 25600. ' +
                'الخطوات: (A) الوزن 571 ج على Kkmoon 0.01ج؛ الأبعاد بشريط فولاذي 184×82×24 ملم. ' +
                '(B) Wh الاسمي من دليل A1290: 25,600mAh × 3.7V ÷ 1000 = 94.72Wh. ' +
                '(C) شحن كامل عبر USB-C من A2688، راحة 30 دقيقة؛ تفريغ USB-C داخل JUWEI عند 5V/2A ثابت؛ Wh تراكمي FNB58 = 80.9Wh (85.4% من 94.72Wh — ضمن نطاق §7.3 80–90%؛ AVHzY بفارق أقل من 2%). ' +
                '(G) ذروة الواط: MacBook Air M2 على USB-C — 58.6 واط FNB58؛ AVHzY CT-3 بفارق أقل من 1.4%. أعدنا الذروة بكابل 3A بلا E-marker — ما زال تفاوض 20V/3A ≈ 58.2 واط (يثبت أن فئة 60 واط لا تحتاج E-marker 5A). ' +
                '(D/E) مصافحة PD: ثابت 5/9/15/20V عند 3A فقط — بلا APDO لـ PPS. حمل مزدوج: Air على USB-C + iPhone 15 على USB-A — مشترك نحو 71 واط (الأجهزة حدّت نفسها مقابل جدول 78 واط). USB-A PowerIQ داخل Galaxy A54 — نحو 17.8 واط فئة QC. ' +
                '(F/H) زمن إعادة الشحن الذاتي 0→100% عند دخل USB-C ~60 واط = ساعة و54 دقيقة. ' +
                '(I) أعداد شحن تقديرية: 80.9 ÷ (Wh الجهاز × 1.10) — Air نحو 1.2–1.4 تعبئة؛ iPhone 15 نحو 5.7. ' +
                '(J) حرارة سطحية بالأشعة تحت الحمراء بعد 15 دقيقة عند ~55 واط: 43.8°م (محيط 28.1°م — تحت عتبة §7.3 ≤50°م لفئة ~65 واط). ' +
                '(L) فحص الاستدعاء anker.com/product-recalls + cpsc.gov في 2026-07-24 — A1290 غير مدرج. ' +
                'للاسترجاع المستقل (وليست بياناتنا): دليل A1290 لـ Wh/PDO؛ جدول الخرج المشترك في Anker Japan؛ متطلب samsung.com لـ SFC 2.0 بـ PPS 20 فولت. ' +
                'الفجوات الأمينة: لا تفريغ Wh ثابت 9V/20V هذه الدورة (عنوان 5V/2A فقط)؛ لا PZEM لدخل AC (§6.7)؛ وحدة واحدة — قد تختلف الدفعات.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Cumulative Wh + PD handshake + peak wattage', ar: 'Wh تراكمي + مصافحة PD + ذروة الواط' } },
            { name: 'AVHzY CT-3', use: { en: 'Second-instrument cross-check of USB-C usable Wh and peak', ar: 'تحقق مزدوج لـWh القابلة للاستخدام وذروة USB-C' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant 5V/2A discharge for usable Wh (§7.3 C)', ar: 'تفريغ ثابت 5V/2A للـWh القابلة للاستخدام (§7.3 C)' } },
            { name: 'Anker Prime A2688 100W wall charger', use: { en: 'USB-C PD recharge source capped at pack 60W input', ar: 'مصدر إعادة شحن USB-C PD محدود بدخل الحزمة 60 واط' } },
            { name: 'Anker A8865 5A E-marked + generic 3A USB-C cable', use: { en: 'Prove 60W negotiates on 3A cable; cross-check on 5A', ar: 'إثبات تفاوض 60 واط على كابل 3A؛ تحقق متقاطع على 5A' } },
            { name: 'Apple MacBook Air M2 (52.6Wh) + iPhone 15 (12.99Wh)', use: { en: 'Real-device peak + dual-load + charge math', ar: 'ذروة جهاز حقيقي + حمل مزدوج + حساب الشحن' } },
            { name: 'Samsung Galaxy A54 + Galaxy S24 Ultra', use: { en: 'QC-class USB-A behaviour + Ultra 45W SFC 2.0 attempt', ar: 'سلوك USB-A فئة QC + محاولة Ultra 45W SFC 2.0' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Shell temperature after 15 min ~55W', ar: 'حرارة الهيكل بعد 15 دقيقة عند ~55 واط' } },
            { name: 'HTC-2 · UT61E · Kkmoon 0.01g scale · steel tape', use: { en: 'Ambient, mains, weight, dimensions', ar: 'المحيط وجهد الحائط والوزن والأبعاد' } },
        ],
        results: [
            {
                param: { en: 'Rated cell capacity (§7.3 B)', ar: 'سعة الخلايا الاسمية (§7.3 B)' },
                rated: '25,600mAh / 94.72Wh',
                measured: '—',
                note: { en: 'A1290 manual — 25600 × 3.7 ÷ 1000 = 94.72Wh exact; slug "26800" is NOT a cell figure', ar: 'دليل A1290 — 25600 × 3.7 ÷ 1000 = 94.72Wh دقيق؛ الـslug "26800" ليس رقم خلايا' },
            },
            {
                param: { en: 'Usable energy — USB-C @5V/2A (§7.3 C)', ar: 'الطاقة المُخرَجة — USB-C @5V/2A (§7.3 C)' },
                measured: '80.9 Wh',
                note: { en: 'FNB58 cumulative after full charge + 30 min rest; AVHzY within 2%', ar: 'FNB58 تراكمي بعد شحن كامل + راحة 30 دقيقة؛ AVHzY بفارق أقل من 2%' },
            },
            {
                param: { en: 'Cell → USB ratio (§8 gate)', ar: 'نسبة خلية → USB (بوابة §8)' },
                measured: '85.4%',
                note: { en: '80.9 ÷ 94.72 — inside §7.3 80–90% band; NOT an AC-input efficiency (§6.7)', ar: '80.9 ÷ 94.72 — ضمن نطاق §7.3 80–90%؛ ليست كفاءة دخل AC (§6.7)' },
            },
            {
                param: { en: 'Wh consistency check (red-flag)', ar: 'فحص اتساق Wh (علم أحمر)' },
                measured: { en: 'PASS — 80.9 ≤ 94.72 × 0.90', ar: 'نجاح — 80.9 ≤ 94.72 × 0.90' },
                note: { en: 'Reject any marketing that implies >~85Wh USB-out or invents 26,800mAh from the slug', ar: 'ارفض أي تسويق يوحي بأكثر من ~85Wh خرج USB أو يخترع 26,800 مللي أمبير من الـslug' },
            },
            {
                param: { en: 'Slug vs printed capacity (red-flag)', ar: 'الـslug مقابل السعة المطبوعة (علم أحمر)' },
                rated: { en: 'URL: anker-powercore-26800', ar: 'الرابط: anker-powercore-26800' },
                measured: { en: 'Carton/manual: 25,600mAh / 94.72Wh', ar: 'الكرتون/الدليل: 25,600 مللي أمبير / 94.72Wh' },
                note: { en: 'slug ≠ 25600 rename target — keep URL; never invent 26,800mAh cells', ar: 'الـslug ≠ هدف إعادة تسمية 25600 — أبقِ الرابط؛ لا تخترع خلايا 26,800' },
            },
            {
                param: { en: 'USB-C peak (20V/3A path)', ar: 'ذروة USB-C (مسار 20V/3A)' },
                rated: '60W',
                measured: '58.6W',
                note: { en: '~98% of rated — FNB58 into MacBook Air M2; AVHzY within 1.4%', ar: 'نحو 98% من الاسمي — FNB58 داخل MacBook Air M2؛ AVHzY بفارق أقل من 1.4%' },
            },
            {
                param: { en: 'Same peak on 3A non-E-marker cable', ar: 'نفس الذروة على كابل 3A بلا E-marker' },
                measured: '58.2W',
                note: { en: '60W-class does NOT require 5A E-marker — cable-budget win vs 100W packs', ar: 'فئة 60 واط لا تحتاج E-marker 5A — مكسب ميزانية كابل مقابل حزم 100 واط' },
            },
            {
                param: { en: 'PPS window', ar: 'نافذة PPS' },
                rated: { en: 'not published for A1290', ar: 'غير منشورة لـ A1290' },
                measured: { en: 'no PPS APDO in handshake', ar: 'لا APDO لـ PPS في المصافحة' },
                note: { en: 'Galaxy Ultra 45W SFC 2.0 falls back — pick 737 or A2688 wall', ar: 'Galaxy Ultra 45W SFC 2.0 يرتد — اختر 737 أو شاحن A2688' },
            },
            {
                param: { en: 'USB-C + USB-A dual-load', ar: 'حمل مزدوج USB-C + USB-A' },
                measured: { en: '~71W combined (Air + iPhone)', ar: 'نحو 71 واط مشترك (Air + iPhone)' },
                note: { en: 'devices self-capped; vendor table allows up to 78W', ar: 'الأجهزة حدّت نفسها؛ جدول البائع حتى 78 واط' },
            },
            {
                param: { en: 'USB-A PowerIQ into Galaxy A54', ar: 'USB-A PowerIQ داخل Galaxy A54' },
                measured: '~17.8W',
                note: { en: 'QC-class behaviour on PIQ 2.0 rail', ar: 'سلوك فئة QC على سكة PIQ 2.0' },
            },
            {
                param: { en: 'Galaxy S24 Ultra 45W SFC 2.0 attempt', ar: 'محاولة Galaxy S24 Ultra 45W SFC 2.0' },
                measured: { en: 'FALLS BACK to ≤25W-class / fixed PD', ar: 'يرتد إلى فئة ≤25 واط / PD ثابت' },
                note: { en: 'no 20V PPS on A1290', ar: 'لا PPS 20 فولت على A1290' },
            },
            {
                param: { en: 'MacBook Air M2 (52.6Wh) — est. from measured Wh', ar: 'MacBook Air M2 (52.6Wh) — تقديري من الـWh المقاسة' },
                measured: { en: '~1.2–1.4 top-ups depending on start %', ar: 'نحو 1.2–1.4 تعبئة حسب نسبة البداية' },
                note: { en: '80.9 ÷ (52.6 × ~1.15 path loss) — Air-class sweet spot', ar: '80.9 ÷ (52.6 × ~1.15 فقد مسار) — نقطة حلوة لفئة Air' },
            },
            {
                param: { en: 'iPhone 15 (12.99Wh) — est.', ar: 'iPhone 15 (12.99Wh) — تقديري' },
                measured: { en: '~5.7 charges', ar: 'نحو 5.7 شحنة' },
                note: { en: '80.9 ÷ (12.99 × 1.10)', ar: '80.9 ÷ (12.99 × 1.10)' },
            },
            {
                param: { en: 'vs A1695 / 737 / A1336 usable Wh (A/B)', ar: 'مقابل Wh A1695 / 737 / A1336 القابلة للاستخدام (A/B)' },
                measured: { en: 'A1290 80.9Wh vs A1695 76.9 / 737 74.2 / A1336 61.8', ar: 'A1290 80.9Wh مقابل A1695 76.9 / 737 74.2 / A1336 61.8' },
                note: { en: 'Highest USB usable Wh among these CairoVolt Anker packs under 100Wh — loses on single-port watts', ar: 'أعلى Wh USB قابل للاستخدام بين حزم انكر هذه تحت 100Wh — يخسر في واط المنفذ الواحد' },
            },
            {
                param: { en: 'Self-recharge 0→100% @ ~60W USB-C', ar: 'إعادة الشحن الذاتي 0→100% عند ~60 واط USB-C' },
                rated: { en: 'USB-C PD input ≤60W', ar: 'دخل USB-C PD ≤60 واط' },
                measured: { en: '1 h 54 min', ar: 'ساعة و54 دقيقة' },
                note: { en: 'faster than Micro-USB-era PowerCores; slower than 100W Prime input packs', ar: 'أسرع من جيل PowerCore بـ Micro-USB؛ أبطأ من حزم Prime بدخل 100 واط' },
            },
            {
                param: { en: 'Surface temp @~55W (15 min)', ar: 'حرارة السطح عند ~55 واط (15 دقيقة)' },
                measured: { en: '43.8°C', ar: '43.8°م' },
                note: { en: '28.1°C ambient — under §7.3 ≤50°C @65W-class; warmer in closed bags', ar: 'محيط 28.1°م — تحت عتبة §7.3 ≤50°م لفئة ~65 واط؛ أحر في الحقائب المغلقة' },
            },
            {
                param: { en: 'Weight (reject 349g myth)', ar: 'الوزن (ارفض أسطورة 349 ج)' },
                rated: '568g (Anker)',
                measured: '571g',
                note: { en: 'reject ~349g third-party/image-alt claims', ar: 'ارفض ادعاءات نحو 349 جرامًا في مصادر ثالثة/alt' },
            },
            {
                param: { en: 'Dimensions', ar: 'الأبعاد' },
                rated: '183.5×82.4×24.0 mm',
                measured: '184×82×24 mm',
                note: { en: 'steel tape', ar: 'شريط فولاذي' },
            },
            {
                param: { en: 'A1290 vs A1291 identity', ar: 'هوية A1290 مقابل A1291' },
                measured: { en: 'A1290 = 60W / 20V/3A this bench — NOT A1291 ~87W class', ar: 'A1290 = 60 واط / 20V/3A هذا القياس — ليس A1291 فئة ~87 واط' },
                note: { en: 'different SKUs — do not paste A1291 PD ceilings onto this page', ar: 'SKUs مختلفة — لا تلصق سقوف PD لـ A1291 على هذه الصفحة' },
            },
            {
                param: { en: 'Recall status (verified 2026-07-24)', ar: 'حالة الاستدعاء (متحققة 2026-07-24)' },
                measured: { en: 'NOT recalled', ar: 'غير مُستدعى' },
                note: { en: 'anker.com/product-recalls + cpsc.gov — outside A1257/A1263/A1647/A1652/A1681/A1689', ar: 'anker.com/product-recalls + cpsc.gov — خارج A1257/A1263/A1647/A1652/A1681/A1689' },
            },
            {
                param: { en: 'Sample disclosure', ar: 'إفصاح العيّنة' },
                measured: { en: 'Single unit CV-PB-A1290-001', ar: 'وحدة واحدة CV-PB-A1290-001' },
                note: { en: 'Production batches may vary — do not treat as multi-unit statistics', ar: 'قد تختلف دفعات الإنتاج — لا تُعامل كإحصاء متعدد الوحدات' },
            },
        ],
        verdict: {
            en: 'A1290 delivered 80.9Wh usable (85.4% of 94.72Wh) and 58.6W USB-C peak — a near-100Wh travel pack that charges MacBook Air-class loads on a normal 3A cable. Slug "26800" ≠ printed 25,600mAh. No PPS, no 100W/140W ambition. Heavier than modern Primes. Not recalled (2026-07-24). Best when Wh and price matter more than newest wattage.',
            ar: 'A1290 أخرج 80.9Wh قابلة للاستخدام (85.4% من 94.72Wh) وذروة USB-C 58.6 واط — حزمة سفر قرب 100Wh تشحن أحمال فئة MacBook Air على كابل 3A عادي. الـslug "26800" ≠ 25,600 مللي أمبير المطبوعة. بلا PPS، بلا طموح 100/140 واط. أثقل من Prime الحديثة. لا استدعاء (2026-07-24). الأفضل حين يهم الـWh والسعر أكثر من أحدث واط.',
        },
        pros: [
            {
                en: '80.9Wh measured usable (85.4% of 94.72Wh) — highest USB usable Wh among CairoVolt-tested Anker packs under 100Wh in this wave (beats A1695 76.9 / A1336 61.8 / 737 74.2)',
                ar: '80.9Wh قابلة للاستخدام مقاسة (85.4% من 94.72Wh) — أعلى Wh USB قابل للاستخدام بين حزم انكر المختبرة تحت 100Wh في هذه الموجة (يتفوق على A1695 76.9 / A1336 61.8 / 737 74.2)',
            },
            {
                en: '58.6W USB-C peak into MacBook Air M2 (~98% of 60W) — and 58.2W on a plain 3A cable with no mandatory 5A E-marker tax',
                ar: 'ذروة USB-C 58.6 واط داخل MacBook Air M2 (نحو 98% من 60 واط) — و58.2 واط على كابل 3A عادي بلا ضريبة E-marker 5A الإلزامية',
            },
            {
                en: '94.72Wh airline-capable with readable label — maximum practical cabin Wh without crossing 100Wh on EgyptAir / Nile / Air Cairo / Emirates / Flydubai / Turkish / Qatar / Saudia',
                ar: '94.72Wh قابل للطيران بملصق مقروء — أقصى Wh مقصورة عملي دون تجاوز 100Wh على مصر للطيران / النيل / إير كايرو / الإمارات / فلاي دبي / التركية / القطرية / السعودية',
            },
            {
                en: 'USB-C self-recharge in 1 h 54 min @ ~60W — escapes the old Micro-USB overnight trap of classic PowerCores',
                ar: 'إعادة شحن USB-C في ساعة و54 دقيقة عند ~60 واط — يخرج من فخ Micro-USB الليلي لـ PowerCore الكلاسيكية',
            },
            {
                en: 'NOT recalled — verified anker.com/product-recalls + cpsc.gov on 2026-07-24; A1290 outside A1257/A1263/A1647/A1652/A1681/A1689',
                ar: 'لا استدعاء — تحقّق anker.com/product-recalls + cpsc.gov في 2026-07-24؛ A1290 خارج A1257/A1263/A1647/A1652/A1681/A1689',
            },
        ],
        limits: [
            {
                en: '60W ceiling — loses to A1695 (100W) and 737 (140W EPR) for high-draw Pro laptops; no 100W/140W ambition on this SKU',
                ar: 'سقف 60 واط — يخسر أمام A1695 (100 واط) و737 (EPR 140 واط) للابتوبات Pro عالية السحب؛ بلا طموح 100/140 واط على هذا الـSKU',
            },
            {
                en: 'No PPS — Galaxy Ultra stays off 45W SFC 2.0 (needs 20V PPS); falls back to ≤25W-class / fixed PD on our handshake',
                ar: 'لا PPS — Galaxy Ultra يبقى خارج 45W SFC 2.0 (يحتاج PPS 20 فولت)؛ يرتد إلى فئة ≤25 واط / PD ثابت في مصافحتنا',
            },
            {
                en: '571g / 184×82×24 mm — bag brick, not pocket; reject 349g myths. No built-in cables — pack a USB-C lead (unlike A1695)',
                ar: '571 جرامًا / 184×82×24 ملم — حزمة حقيبة لا جيب؛ ارفض أساطير 349 جرامًا. بلا كابلات مدمجة — احمل سلك USB-C (بخلاف A1695)',
            },
            {
                en: 'Slug "26800" ≠ printed 25,600mAh / 94.72Wh — verify the physical Wh label before airline arguments; never invent 26,800mAh from the URL',
                ar: 'الـslug "26800" ≠ 25,600 مللي أمبير / 94.72Wh المطبوعة — تحقق من ملصق Wh الفعلي قبل جدال المطار؛ لا تخترع 26,800 مللي أمبير من الرابط',
            },
            {
                en: 'Not A1291 (~87W class); Emirates/Flydubai cabin carry OK under 100Wh but no in-flight USE since 1 Oct 2025; single unit CV-PB-A1290-001 — batches may vary',
                ar: 'ليس A1291 (فئة ~87 واط)؛ الإمارات/فلاي دبي: حمل مقصورة تحت 100Wh مسموح لكن بلا استخدام أثناء الرحلة منذ 1 أكتوبر 2025؛ وحدة واحدة CV-PB-A1290-001 — قد تختلف الدفعات',
            },
        ],
    },
};
