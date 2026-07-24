// Details for: joyroom-power-bank-20000  (Joyroom JR-PBF14 Pro 20,000mAh Power Bank)
// Lab sheet: CV-PB-JRPBF14-001 — §7.3 ELEVATED gold deepen · testDate 2026-07-24 · Eng. Omar Khaled
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · 5+5 pros/limits · Wh/peaks + §11 red-flag · A/B Anker Zolo A110E
// Wh basis §7.3 / §8: 20,000mAh × 3.7V ÷ 1000 = 74Wh (label on sample CV-PB-JRPBF14-001 — VERIFY delivered unit).
// CRITICAL A/B: vs Anker Zolo A110E (CV-PB-A110E-001: 62.0Wh / 21.5W / built-in cable / 394g / 3h06) — sibling figures disclosure ONLY.
// Red-flag audit: Wh consistency · no 20V PDO · no invented silicon · no laptop-PD marketing · authenticity ≠ Anker recall immunity.
// Export must remain `joyroom_power_bank_20000_detail` for the details registry.
import type { ProductDetail } from './_types';

export const joyroom_power_bank_20000_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Joyroom JR-PBF14 Pro: 20,000mAh × 3.7V ÷ 1000 = 74Wh nominal (§7.3 / §8 — Wh label on sample CV-PB-JRPBF14-001). CairoVolt measured 60.8Wh usable on USB-C at 5V/2A (~82.2% of 74Wh) — inside the §7.3 80–90% band. 5V-referred ≈ 12,160mAh (60.8 ÷ 5). VERIFY the Wh rating printed on YOUR delivered unit (some Joyroom listings omit or round Wh; retail blurbs sometimes say 72Wh).',
            'Peaks (this sample): USB-C 21.3W PD/QC-class (rated 22.5W); USB-A ~18W into QC-compatible Galaxy A54. NO 20V PDO — phone-class only, NOT laptop PD. LED % display is an estimate, not a lab instrument. Ports: 1× USB-C + 2× USB-A.',
            'A/B vs Anker Zolo A110E (same lab week, disclosure only): Joyroom 60.8Wh / 21.3W / 418g / 3h22 / no built-in cable / ~997 EGP class vs A110E 62.0Wh / 21.5W / 394g / 3h06 / built-in USB-C cable / ActiveShield / ~1,730 EGP class. Joyroom wins price + dual USB-A; Anker wins cable convenience and +1.2Wh / +1.6 pp efficiency on our single units.',
            'Self-recharge at ~18–20W USB-C in: 3 h 22 min 0→100%. Surface 43.5°C at ~22W after 15 min (28.4°C ambient) — warmest of our A110D/A110E/JR-PBF14 trio; under the §7.3 45°C soft flag but needs airflow in Cairo summer.',
            'Red-flag / recall (2026-07-24): Wh consistency PASS (60.8 ≤ 74 × 0.90). No Joyroom JR-PBF14 hit on cpsc.gov; Anker recalls A1257/A1263/A1647/A1652/A1681/A1689 do NOT apply (different brand). Still verify CE/FCC/UN38.3 + packaging authenticity — grey-market clones exist. 74Wh < 100Wh cabin; Emirates/Flydubai no in-flight USE since 1 Oct 2025.',
        ],
        ar: [
            'جوي روم JR-PBF14 Pro: 20,000 مللي أمبير × 3.7 فولت ÷ 1000 = 74Wh اسميًا (§7.3 / §8 — ملصق Wh على العيّنة CV-PB-JRPBF14-001). قِست CairoVolt 60.8Wh قابلة للاستخدام على USB-C بتفريغ 5V/2A (نحو 82.2% من 74Wh) — ضمن نطاق §7.3 80–90%. مكافئ عند 5V ≈ 12,160 مللي أمبير (60.8 ÷ 5). **تحقق** من تصنيف Wh المطبوع على **وحدتك** المستلمة (بعض قوائم Joyroom تحذف أو تقرّب Wh؛ نصوص التجزئة أحيانًا تقول 72Wh).',
            'الذروات (هذه العيّنة): USB-C 21.3 واط فئة PD/QC (مدرج 22.5 واط)؛ USB-A نحو 18 واط داخل Galaxy A54 متوافق QC. **لا** PDO 20 فولت — فئة هاتف فقط، **وليس** PD للابتوب. شاشة LED % تقدير وليست أداة معمل. المنافذ: 1× USB-C + 2× USB-A.',
            'A/B مقابل Anker Zolo A110E (نفس أسبوع المختبر، إفصاح فقط): Joyroom 60.8Wh / 21.3 واط / 418 ج / 3س22 / بلا كابل مدمج / فئة ~997 جنيه مقابل A110E 62.0Wh / 21.5 واط / 394 ج / 3س06 / كابل USB-C مدمج / ActiveShield / فئة ~1,730 جنيه. Joyroom يفوز بالسعر وUSB-A المزدوج؛ Anker يفوز براحة الكابل و+1.2Wh / +1.6 نقطة كفاءة على وحداتنا المفردة.',
            'إعادة شحن ذاتي بدخل USB-C ~18–20 واط: 3 س 22 د 0→100%. السطح 43.5°م عند ~22 واط بعد 15 د (محيط 28.4°م) — الأكثر دفئًا بين ثلاثي A110D/A110E/JR-PBF14؛ تحت علامة §7.3 الناعمة عند 45°م لكنه يحتاج تهوية في صيف القاهرة.',
            'علم أحمر / استدعاء (2026-07-24): اتساق Wh ناجح (60.8 ≤ 74 × 0.90). لا إصابة Joyroom JR-PBF14 على cpsc.gov؛ استدعاءات Anker A1257/A1263/A1647/A1652/A1681/A1689 **لا** تنطبق (علامة مختلفة). ما زال تحقق CE/FCC/UN38.3 وأصالة العبوة — التقليد موجود. 74Wh < حد المقصورة 100Wh؛ الإمارات/فلاي دبي ممنوع الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025.',
        ],
    },
    localContext: {
        en:
            'JR-PBF14 Pro answers the Egyptian buyer question: "I need A110E-class phone energy at ~997 EGP, and I already carry my own cable." ' +
            'Eight scenarios from measured 60.8Wh / 21.3W peaks. RIGHT FOR: ' +
            '(1) BUDGET-CONSCIOUS STUDENT (Ain Shams / Helwan / Zagazig): est. ~4.2 iPhone 15 full charges (60.8 ÷ (12.99 × 1.10)) — similar phone-day count to A110E at roughly 40% lower street price; trade-off is no built-in cable and −1.2Wh vs A110E on our samples. ' +
            '(2) UBER / inDrive DRIVER on a tight equipment budget: 21.3W USB-C + ~18W USB-A QC handles your phone and a passenger\'s Android simultaneously; LED % ends the "how much left?" guess during a 6th-October ↔ Maadi shift. ' +
            '(3) SAHEL WEEKEND ON A BUDGET: 74Wh flies free under 100Wh; two USB-A ports mean phone + friend\'s phone + a third device on USB-C without paying Anker\'s built-in-cable premium — bring your own braided C-to-C / C-to-Lightning. ' +
            '(4) METRO DAILY COMMUTE with a cable already in the bag: 140×70×25 mm fits a backpack side pocket; 418g is heavy for a sling but acceptable in a laptop backpack. ' +
            '(5) BACKUP BRICK AT HOME during load-shedding: 60.8Wh usable at ~10W phone draw → est. ~6 h messaging — covers a typical summer cut if you started full. ' +
            'WRONG FOR: (6) LAPTOP / iPad Pro PD OWNER — FNB58 found NO 20V PDO; 22.5W trickle is not a work tool (pick A1336 / 737). ' +
            '(7) BUYER WHO FORGETS CABLES — A110E\'s built-in cable is worth the ~730 EGP premium if you lose cables monthly. ' +
            '(8) GALAXY ULTRA 45W SFC 2.0 CHASER — caps at 25W SFC class; this is a 22.5W phone pack. ' +
            '(9) ANYONE sold marketplace "laptop PD / 65W" text for JR-PBF14 — red-flag listing error; our sample never saw a 20V rail. ' +
            'HEAT: Cairo July–August daily high ~35°C (WeatherSpark). Our sample hit 43.5°C shell after 15 min at ~22W (28.4°C ambient) — warmest of A110D 39.8°C / A110E 41.2°C / JR-PBF14; give airflow, never a closed-car dashboard. ' +
            'AIRLINE: 74Wh < 100Wh — EgyptAir / Nile Air / Air Cairo / Emirates / Flydubai / Turkish / Qatar / Saudia carry-on OK with readable Wh label; never checked; Emirates/Flydubai no in-flight USE since 1 Oct 2025. ' +
            'AUTHENTICITY: Joyroom ≠ Anker recall list, but grey-market clones exist — check hologram / Golden Code if supplied, MPN JR-PBF14 Pro, CE/FCC/UN38.3, and the printed Wh (expect ~74Wh class; reject unlabeled). ' +
            'ELECTRICITY: recharging 74Wh at ~18W ≈ 0.086 kWh ≈ 6–16 piastres on EgyptERA Sept-2024 tiers — NOT an AC system-efficiency % (no PZEM; §6.7).',
        ar:
            'JR-PBF14 Pro يجيب على سؤال المشتري المصري: "أحتاج طاقة هاتف فئة A110E بـ ~997 جنيه، ولدي كابلي أصلًا." ' +
            'ثمانية سيناريوهات من 60.8Wh المقاسة / ذروات 21.3 واط. مناسب لـ: ' +
            '(1) طالب حساس للميزانية (عين شمس / حلوان / الزقازيق): تقديري ~4.2 شحنة iPhone 15 كاملة (60.8 ÷ (12.99 × 1.10)) — عدد أيام هاتف مشابه لـ A110E بنحو 40% سعر أقل؛ التنازل: لا كابل مدمج و−1.2Wh مقابل A110E على عيّناتنا. ' +
            '(2) سائق Uber / inDrive بميزانية معدات ضيقة: 21.3 واط USB-C + ~18 واط USB-A QC يخدم هاتفك وهاتف راكب أندرويد معًا؛ شاشة LED % تنهي تخمين "فاضي قد إيه؟" خلال وردية 6 أكتوبر ↔ المعادي. ' +
            '(3) عطلة ساحل بميزانية: 74Wh يسافر مجانًا تحت 100Wh؛ منفذا USB-A يعني هاتف + هاتف صديق + جهاز ثالث على USB-C بلا دفع علاوة كابل Anker المدمج — أحضر كابل braided C-to-C / C-to-Lightning خاصتك. ' +
            '(4) مترو يومي وكابل في الحقيبة: 140×70×25 ملم يناسب جيب حقيبة ظهر؛ 418 جرام ثقيل لحقيبة كروس لكن مقبول في حقيبة لابتوب. ' +
            '(5) حزمة احتياط في البيت أثناء انقطاع الكهرباء: 60.8Wh قابلة للاستخدام بسحب هاتف ~10 واط → تقديري ~6 ساعات رسائل — يكفي انقطاعًا صيفيًا معتادًا إن بدأت ممتلئًا. ' +
            'غير مناسب لـ: (6) مالك لابتوب / iPad Pro PD — FNB58 وجد **لا** PDO 20 فولت؛ تنقيط 22.5 واط ليس أداة عمل (اختر A1336 / 737). ' +
            '(7) مشتري ينسى الكابلات — كابل A110E المدمج يستحق علاوة ~730 جنيه إن فقدت كابلًا شهريًا. ' +
            '(8) طالب Galaxy Ultra 45W SFC 2.0 — يتوقف عند فئة 25W SFC؛ هذه حزمة هاتف 22.5 واط. ' +
            '(9) من اشتُري على نص سوق «PD لابتوب / 65 واط» لـ JR-PBF14 — خطأ قائمة علم أحمر؛ عيّنتنا لم ترَ رافد 20 فولت. ' +
            'الحرارة: متوسط العظمى في القاهرة يوليو–أغسطس ~35°م (WeatherSpark). عيّنتنا بلغت 43.5°م بعد 15 د عند ~22 واط (محيط 28.4°م) — الأكثر دفئًا بين A110D 39.8°م / A110E 41.2°م / JR-PBF14؛ تهوية، لا تابلوه سيارة مغلقة. ' +
            'الطيران: 74Wh < 100Wh — مقصورة OK على مصر للطيران / النيل / إير كايرو / الإمارات / فلاي دبي / التركية / القطرية / السعودية بملصق Wh مقروء؛ ليس في الأمتعة المسجّلة؛ الإمارات/فلاي دبي ممنوع الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025. ' +
            'الأصالة: Joyroom ≠ قائمة استدعاء Anker، لكن التقليد موجود — تحقق من الهولوغرام / Golden Code إن وُجد وMPN JR-PBF14 Pro وCE/FCC/UN38.3 وWh المطبوع (توقّع فئة ~74Wh؛ ارفض بلا ملصق). ' +
            'الكهرباء: إعادة شحن 74Wh بدخل ~18 واط ≈ 0.086 كيلوواط·ساعة ≈ 6–16 قرشًا على شرائح EgyptERA سبتمبر 2024 — **ليست** نسبة كفاءة منظومة AC (بلا PZEM؛ §6.7).',
    },
    specifications: {
        'Model': { en: 'Joyroom JR-PBF14 Pro 20,000mAh Power Bank (store SKU JP02 · GTIN 6956116750022)', ar: 'جوي روم JR-PBF14 Pro باور بانك 20,000 مللي أمبير (SKU المتجر JP02 · GTIN 6956116750022)' },
        'Cell Capacity (§8)': { en: '20,000mAh / 74Wh — 20,000mAh × 3.7V ÷ 1000 = 74Wh (label on sample + protocol §7.3). VERIFY Wh on delivered unit.', ar: '20,000 مللي أمبير / 74Wh — 20,000 × 3.7 ÷ 1000 = 74Wh (ملصق العيّنة + البروتوكول §7.3). **تحقق** من Wh على الوحدة المستلمة.' },
        'Usable Energy (CairoVolt measured)': { en: '60.8Wh on USB-C at 5V/2A constant discharge (~82.2% of 74Wh — §7.3 80–90% band)', ar: '60.8Wh على USB-C بتفريغ ثابت 5V/2A (نحو 82.2% من 74Wh — نطاق §7.3 80–90%)' },
        '5V-referred capacity (§8)': { en: '~12,160mAh at 5V (60.8Wh ÷ 5V) — explains why “20,000mAh” ≠ 20,000mAh at USB', ar: 'نحو 12,160 مللي أمبير عند 5V (60.8Wh ÷ 5V) — يوضح لماذا «20,000 مللي أمبير» ≠ 20,000 عند USB' },
        'USB-C Port (peak)': { en: 'Up to 22.5W PD/QC-class — CairoVolt measured 21.3W peak; NO 20V PDO on our sample', ar: 'حتى 22.5 واط PD/QC-class — قِسنا 21.3 واط ذروة؛ **لا** PDO 20 فولت على عيّنتنا' },
        'USB-A Ports (×2, peak)': { en: 'QC-class shared output — CairoVolt measured ~18W peak into compatible Android (Galaxy A54)', ar: 'خرج QC-class مشترك — قِسنا نحو 18 واط ذروة على أندرويد متوافق (Galaxy A54)' },
        'Display': { en: 'LED digital percentage — estimated battery level (estimates, not a lab instrument)', ar: 'LED رقمية للنسبة — مستوى بطارية تقديري (تقديرات، وليست أداة معمل)' },
        'How JR-PBF14 Pro differs from Anker Zolo A110E': {
            en: 'Joyroom = ~997 EGP class, no built-in cable, 60.8Wh / 21.3W measured, 418g, 2× USB-A. A110E = ~1,730 EGP class, built-in USB-C cable, 62.0Wh / 21.5W measured, 394g, ActiveShield 3.0. Same ~22.5W phone-class ceiling; Joyroom wins price + dual-A; Anker wins cable + slight Wh/efficiency edge on our samples.',
            ar: 'Joyroom = فئة ~997 جنيه، لا كابل مدمج، 60.8Wh / 21.3 واط مقاسة، 418 ج، 2× USB-A. A110E = فئة ~1,730 جنيه، كابل USB-C مدمج، 62.0Wh / 21.5 واط مقاسة، 394 ج، ActiveShield 3.0. نفس سقف ~22.5 واط فئة هاتف؛ Joyroom يفوز بالسعر وUSB-A المزدوج؛ Anker يفوز بالكابل وحافة Wh/كفاءة طفيفة على عيّناتنا.',
        },
        'Input / Self-recharge': { en: 'USB-C ~18–20W class; CairoVolt measured 3 h 22 min 0→100%', ar: 'USB-C فئة ~18–20 واط؛ قِسنا 3 س 22 د 0→100%' },
        'Weight': { en: 'Listing 420g; CairoVolt measured 418g on a 0.01g scale', ar: 'القائمة 420 جرام؛ قِست CairoVolt 418 جرامًا على ميزان 0.01 جرام' },
        'Dimensions': { en: 'Listing ~140 × 70 × 25 mm — CairoVolt caliper 140.2 × 70.1 × 25.3 mm', ar: 'القائمة ~140 × 70 × 25 ملم — قدمة CairoVolt 140.2 × 70.1 × 25.3 ملم' },
        'Airline': { en: '74Wh label on our sample < 100Wh cabin — EgyptAir / Nile Air / Air Cairo / Emirates / Flydubai / Turkish / Qatar / Saudia carry-on OK; Emirates/Flydubai no in-flight USE since 1 Oct 2025', ar: 'ملصق 74Wh على عيّنتنا < حد المقصورة 100Wh — مسموح مقصورة على مصر للطيران / النيل / إير كايرو / الإمارات / فلاي دبي / التركية / القطرية / السعودية؛ الإمارات/فلاي دبي ممنوع الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025' },
        'Safety / Recall (verified 2026-07-24)': { en: 'No Joyroom JR-PBF14 hit on cpsc.gov (2026-07-24). Anker recall set A1257/A1263/A1647/A1652/A1681/A1689 does NOT apply (different brand). Verify CE/FCC/UN38.3 + packaging authenticity on delivery.', ar: 'لا إصابة Joyroom JR-PBF14 على cpsc.gov (2026-07-24). مجموعة استدعاء Anker A1257/A1263/A1647/A1652/A1681/A1689 **لا** تنطبق (علامة مختلفة). تحقق من CE/FCC/UN38.3 وأصالة العبوة عند الاستلام.' },
        'Red-flag gates (§11)': { en: 'Reject: (a) unlabeled Wh / silent 72↔74Wh swap without checking the unit; (b) “laptop PD / 65W / 20V” marketing — NO 20V PDO on sample; (c) invented controller IC names — no teardown; (d) treating “not on Anker recall list” as a blank authenticity cheque.', ar: 'ارفض: (أ) Wh بلا ملصق / تبديل صامت 72↔74Wh بلا فحص الوحدة؛ (ب) تسويق «PD لابتوب / 65 واط / 20V» — **لا** PDO 20 فولت على العيّنة؛ (ج) أسماء رقائق مختلقة — بلا teardown؛ (د) معاملة «ليس على قائمة استدعاء Anker» كبراءة أصالة مطلقة.' },
        'Vs Joyroom JR-T012 (10K sibling)': {
            en: 'JR-PBF14 Pro = ~2× cell energy (74Wh / 60.8Wh measured), real 22.5W-class USB-C out, dual USB-A. JR-T012 = 37Wh / 30.8Wh measured, USB-A only ~10W shared, NO USB-C output. Different jobs — do not copy JR-T012 10.2W rows onto this SKU.',
            ar: 'JR-PBF14 Pro = نحو ضعف طاقة الخلايا (74Wh / 60.8Wh مقاسة)، خرج USB-C حقيقي فئة 22.5 واط، USB-A مزدوج. JR-T012 = 37Wh / 30.8Wh مقاسة، USB-A فقط ~10 واط مشترك، **لا** خرج USB-C. مهمتان مختلفتان — لا تنسخ صفوف JR-T012 عند 10.2 واط على هذا الـSKU.',
        },
        'Teardown / Silicon': { en: 'No independent ChargerLAB teardown available for JR-PBF14 Pro — CairoVolt did NOT open our sample; do not assume specific controller ICs', ar: 'لا يوجد teardown مستقل من ChargerLAB لـ JR-PBF14 Pro — CairoVolt **لم** تفتح عيّنتنا؛ لا تفترض رقائق تحكم محددة' },
        'In the Box': { en: 'Power bank + USB-C cable (verify live package contents with seller)', ar: 'الباور بانك + كابل USB-C (تحقق من محتويات العبوة الحالية مع البائع)' },
    },
    benchTest: {
        sku: 'JR-PBF14 Pro',
        sampleId: 'CV-PB-JRPBF14-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock JR-PBF14 Pro · CairoVolt lab, New Cairo · ambient 28.4°C (HTC-2) · humidity 46% RH · mains 221V (UT61E) · wall recharge via ~18–20W-class USB-C source · same-week A/B disclosure vs Anker Zolo A110E (CV-PB-A110E-001)',
            ar: 'وحدة تجزئة واحدة JR-PBF14 Pro · مختبر كايرو فولت، القاهرة الجديدة · محيط 28.4°م (HTC-2) · رطوبة 46% · جهد الحائط 221 فولت (UT61E) · إعادة شحن عبر مصدر USB-C فئة ~18–20 واط · إفصاح A/B في نفس الأسبوع مقابل Anker Zolo A110E (CV-PB-A110E-001)',
        },
        methodology: {
            en:
                'ELEVATED gold-depth power-bank bench per protocol §7.3 with §8 Wh physics + §11 red-flag gates on sample CV-PB-JRPBF14-001 (2026-07-24). ' +
                '(1) Photographed printed I/O + Wh label — 20,000mAh / 74Wh on this unit; noted marketplace blurbs that sometimes print 72Wh — VERIFY delivered label. ' +
                '(2) §8 nominal math: Wh_cell = 20,000mAh × 3.7V ÷ 1000 = 74Wh. ' +
                '(3) Full charge via USB-C from ~18–20W wall source, 30 min rest, discharge USB-C @ constant 5V/2A into JUWEI → FNB58 cumulative usable energy = 60.8Wh. Efficiency = 60.8 ÷ 74 = 82.2% (inside §7.3 80–90% band). 5V-referred mAh = 60.8 ÷ 5 = 12,160mAh. AVHzY CT-3 cross-check within 2%. ' +
                '(4) PEAKS: USB-C negotiated 21.3W (22.5W-class fixed rails); USB-A ~18W into Galaxy A54 QC path; PD enumeration — NO 20V PDO (MacBook Air M2 = 5V trickle only). ' +
                '(5) Wh consistency red-flag (§11): PASS because 60.8 ≤ 74 × 0.90 (= 66.6Wh). Reject marketing that implies >~66Wh USB-out or “guaranteed 5+ iPhone charges” from this pack. ' +
                '(6) Self-recharge timed 0→100% at ~18–20W = 3 h 22 min. Surface temp BENETECH GM320 (ε=0.95) after 15 min @~22W = 43.5°C. Weight/dims on Kkmoon 0.01g + Mitutoyo. ' +
                '(7) A/B disclosure (NOT copied as this SKU\'s numbers): Anker A110E same-week sheet = 62.0Wh / 21.5W / 3h06 / 41.2°C / 394g / built-in cable. ' +
                '(8) RECALL gate 2026-07-24: cpsc.gov search Joyroom / JR-PBF14 — no hit; anker.com/product-recalls set A1257/A1263/A1647/A1652/A1681/A1689 does NOT apply. ' +
                'HONEST GAPS: no PZEM AC-input (no system efficiency % per §6.7); no teardown / silicon IDs; single unit — batches and Wh labels may vary. Phone counts marked "est." use 60.8 ÷ (device Wh × 1.10 path loss).',
            ar:
                'قياس عمق ذهبي مرتفع لباور بانك وفق البروتوكول §7.3 مع فيزياء Wh §8 وبوابات العلم الأحمر §11 على العيّنة CV-PB-JRPBF14-001 (2026-07-24). ' +
                '(1) صوّرنا جدول I/O وملصق Wh — 20,000 مللي أمبير / 74Wh على هذه الوحدة؛ لاحظنا نصوص سوق تطبع أحيانًا 72Wh — **تحقق** من الملصق المستلم. ' +
                '(2) حساب §8 الاسمي: Wh_الخلية = 20,000 × 3.7 ÷ 1000 = 74Wh. ' +
                '(3) شحن كامل عبر USB-C من مصدر ~18–20 واط، راحة 30 د، تفريغ USB-C عند 5V/2A ثابت داخل JUWEI → Wh تراكمية FNB58 = 60.8Wh. الكفاءة = 60.8 ÷ 74 = 82.2% (ضمن نطاق §7.3 80–90%). مللي أمبير مكافئ عند 5V = 60.8 ÷ 5 = 12,160. تحقق AVHzY CT-3 بفارق أقل من 2%. ' +
                '(4) الذروات: USB-C تفاوض 21.3 واط (رافدات ثابتة فئة 22.5 واط)؛ USB-A نحو 18 واط داخل Galaxy A54 مسار QC؛ إحصاء PD — **لا** PDO 20 فولت (MacBook Air M2 = تنقيط 5V فقط). ' +
                '(5) علم أحمر اتساق Wh (§11): نجاح لأن 60.8 ≤ 74 × 0.90 (= 66.6Wh). ارفض تسويقًا يوحي بأكثر من ~66Wh خرج USB أو «5+ شحنات iPhone مضمونة» من هذه الحزمة. ' +
                '(6) إعادة شحن 0→100% عند ~18–20 واط = 3 س 22 د. حرارة السطح GM320 (ε=0.95) بعد 15 د عند ~22 واط = 43.5°م. الوزن/الأبعاد على Kkmoon 0.01 ج + Mitutoyo. ' +
                '(7) إفصاح A/B (**لا** تُنسخ كأرقام هذا الـSKU): صحيفة Anker A110E في نفس الأسبوع = 62.0Wh / 21.5 واط / 3س06 / 41.2°م / 394 ج / كابل مدمج. ' +
                '(8) بوابة الاستدعاء 2026-07-24: بحث cpsc.gov عن Joyroom / JR-PBF14 — بلا إصابة؛ مجموعة anker.com/product-recalls A1257/A1263/A1647/A1652/A1681/A1689 **لا** تنطبق. ' +
                'الفجوات الأمينة: لا PZEM لدخل AC (فلا كفاءة منظومة وفق §6.7)؛ لا teardown / معرفات رقائق؛ وحدة واحدة — قد تختلف الدفعات وملصقات Wh. أعداد الشحن "تقديري" من 60.8 ÷ (Wh الجهاز × 1.10 فقد المسار).',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Cumulative Wh logging + PD enumeration (no 20V PDO) + USB-C peaks', ar: 'تسجيل Wh تراكمي + إحصاء PD (بلا PDO 20 فولت) + ذروات USB-C' } },
            { name: 'AVHzY CT-3', use: { en: 'Cross-check of USB-C / USB-A peak wattage and usable Wh (±2%)', ar: 'تحقق من ذروة USB-C / USB-A وWh القابلة للاستخدام (±2%)' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant 5V/2A discharge for the 60.8Wh usable figure', ar: 'تفريغ ثابت 5V/2A لرقم 60.8Wh القابل للاستخدام' } },
            { name: 'Samsung Galaxy A54 (USB-A QC path) + Apple iPhone 15 (12.99Wh)', use: { en: 'Real-device USB-A peak ~18W + charge-cycle reference', ar: 'ذروة USB-A حقيقية ~18 واط + مرجع دورة شحن' } },
            { name: 'MacBook Air M2', use: { en: 'Negative laptop-PD check — 5V trickle only (no 20V PDO)', ar: 'فحص سلبي لـ PD اللابتوب — تنقيط 5V فقط (بلا PDO 20 فولت)' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temperature under ~22W load after 15 min', ar: 'حرارة السطح تحت حمل ~22 واط بعد 15 د' } },
            { name: 'HTC-2 · UT61E · Kkmoon 0.01g scale · Mitutoyo caliper', use: { en: 'Ambient/humidity, mains V, weight, dimensions', ar: 'المحيط/الرطوبة وجهد الحائط والوزن والأبعاد' } },
        ],
        results: [
            { param: { en: 'Rated cell capacity (§8)', ar: 'سعة الخلايا الاسمية (§8)' }, rated: '20,000mAh / 74Wh', measured: '—', note: { en: '20,000mAh × 3.7V ÷ 1000 = 74Wh — verify Wh label on delivered unit', ar: '20,000 × 3.7 ÷ 1000 = 74Wh — **تحقق** من ملصق Wh على الوحدة المستلمة' } },
            { param: { en: 'Usable energy — USB-C @5V/2A (PRIMARY)', ar: 'الطاقة المُخرَجة — USB-C @5V/2A (أساسي)' }, measured: '60.8 Wh', note: { en: 'FNB58 cumulative after full charge + 30 min rest; AVHzY within 2%', ar: 'FNB58 تراكمي بعد شحن كامل + راحة 30 د؛ AVHzY بفارق أقل من 2%' } },
            { param: { en: 'Cell → USB conversion ratio', ar: 'نسبة تحويل خلية → USB' }, measured: '82.2%', note: { en: '60.8 ÷ 74 — inside §7.3 80–90% band; NOT an AC system efficiency (§6.7)', ar: '60.8 ÷ 74 — ضمن نطاق §7.3 80–90%؛ **ليست** كفاءة منظومة AC (§6.7)' } },
            { param: { en: 'Wh consistency check (red-flag §11)', ar: 'فحص اتساق Wh (علم أحمر §11)' }, measured: { en: 'PASS — 60.8 ≤ 74 × 0.90 (= 66.6Wh)', ar: 'نجاح — 60.8 ≤ 74 × 0.90 (= 66.6Wh)' }, note: { en: 'Reject marketing that implies >~66Wh USB-out or unlabeled Wh swaps (72↔74) without checking the unit', ar: 'ارفض تسويقًا يوحي بأكثر من ~66Wh خرج USB أو تبديل Wh بلا ملصق (72↔74) بلا فحص الوحدة' } },
            { param: { en: '5V-referred capacity (§8)', ar: 'سعة مكافئة عند 5V (§8)' }, measured: { en: '~12,160 mAh at 5V', ar: 'نحو 12,160 مللي أمبير عند 5V' }, note: { en: '60.8Wh ÷ 5V — “20,000mAh” is cell rating, not USB-out mAh', ar: '60.8Wh ÷ 5V — «20,000 مللي أمبير» تصنيف خلايا وليس مللي أمبير خرج USB' } },
            { param: { en: 'USB-C port peak', ar: 'ذروة منفذ USB-C' }, rated: '22.5W class', measured: '21.3W', note: { en: 'FNB58 — phone-class PD/QC rails; not laptop PD', ar: 'FNB58 — رافدات PD/QC فئة هاتف؛ ليس PD للابتوب' } },
            { param: { en: 'USB-A port peak (QC-compatible Android)', ar: 'ذروة USB-A (أندرويد QC)' }, measured: '~18W', note: { en: 'Galaxy A54 via USB-A — QC-class, not USB-C PD', ar: 'Galaxy A54 عبر USB-A — فئة QC، ليس USB-C PD' } },
            { param: { en: '20V PDO / laptop-PD rail search (red-flag)', ar: 'بحث رافد PDO 20 فولت / PD لابتوب (علم أحمر)' }, measured: { en: 'ABSENT — MacBook Air M2 = 5V trickle only', ar: 'غائب — MacBook Air M2 = تنقيط 5V فقط' }, note: { en: 'Reject marketplace “laptop PD / 65W” claims for this SKU', ar: 'ارفض ادعاءات السوق «PD لابتوب / 65 واط» لهذا الـSKU' } },
            { param: { en: 'vs Anker A110E usable Wh (disclosure)', ar: 'مقابل Wh A110E القابلة للاستخدام (إفصاح)' }, measured: { en: '60.8Wh vs A110E 62.0Wh (−1.2Wh)', ar: '60.8Wh مقابل A110E 62.0Wh (−1.2Wh)' }, note: { en: 'Both inside §7.3 band; Anker +1.6 pp efficiency (83.8% vs 82.2%) on our single units', ar: 'كلاهما ضمن نطاق §7.3؛ Anker +1.6 نقطة كفاءة (83.8% مقابل 82.2%) على وحداتنا المفردة' } },
            { param: { en: 'vs Anker A110E USB-C peak (disclosure)', ar: 'مقابل ذروة USB-C لـ A110E (إفصاح)' }, measured: { en: '21.3W vs A110E 21.5W (~tied phone-class)', ar: '21.3 واط مقابل A110E 21.5 واط (~تعادل فئة هاتف)' }, note: { en: 'Same ~22.5W ceiling class — wattage is not the differentiator; cable + price are', ar: 'نفس فئة سقف ~22.5 واط — الواط ليس المفرّق؛ الكابل والسعر هما' } },
            { param: { en: 'iPhone 15 (12.99Wh) — est. from measured Wh', ar: 'iPhone 15 (12.99Wh) — تقديري من الـWh المقاسة' }, measured: { en: '~4.2 charges', ar: 'نحو 4.2 شحنة' }, note: { en: '60.8 ÷ (12.99 × 1.10) — needs your own C-to-C / C-to-Lightning cable', ar: '60.8 ÷ (12.99 × 1.10) — يحتاج كابل C-to-C / C-to-Lightning خاصتك' } },
            { param: { en: 'iPhone 15 Pro Max (17.11Wh) — est.', ar: 'iPhone 15 Pro Max (17.11Wh) — تقديري' }, measured: '~3.23', note: { en: '60.8 ÷ (17.11 × 1.10)', ar: '60.8 ÷ (17.11 × 1.10)' } },
            { param: { en: 'Galaxy A54 (19.05Wh) — est. charges', ar: 'Galaxy A54 (19.05Wh) — شحنات تقديرية' }, measured: '~2.90', note: { en: '60.8 ÷ (19.05 × 1.10); 45W Ultra SFC unavailable — phone-class ceiling', ar: '60.8 ÷ (19.05 × 1.10)؛ 45W Ultra SFC غير متاح — سقف فئة هاتف' } },
            { param: { en: 'Self-recharge 0→100% @ ~18–20W', ar: 'إعادة الشحن 0→100% عند ~18–20 واط' }, measured: { en: '3 h 22 min', ar: '3 س 22 د' }, note: { en: 'Slower than A110E 3 h 06 min at similar input — budget controller / input negotiation', ar: 'أبطأ من A110E 3 س 06 د بنفس فئة الدخل — متحكم اقتصادي / تفاوض دخل' } },
            { param: { en: 'Surface temp @~22W (15 min)', ar: 'حرارة السطح عند ~22 واط (15 د)' }, measured: { en: '43.5°C', ar: '43.5°م' }, note: { en: '28.4°C ambient — under §7.3 45°C soft flag; warmest of A110D 39.8°C / A110E 41.2°C / this sample', ar: 'محيط 28.4°م — تحت علامة §7.3 الناعمة عند 45°م؛ الأكثر دفئًا بين A110D 39.8°م / A110E 41.2°م / هذه العيّنة' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '420g (listing)', measured: '418g', note: { en: '0.01g scale — 2g under listing; +24g vs A110E 394g', ar: 'ميزان 0.01 جرام — 2 جرام تحت القائمة؛ +24 ج مقابل A110E 394 ج' } },
            { param: { en: 'Dimensions', ar: 'الأبعاد' }, rated: '~140×70×25 mm', measured: '140.2×70.1×25.3 mm', note: { en: 'Mitutoyo caliper — matches listing closely; thinner than A110E 27.8 mm', ar: 'قدمة Mitutoyo — مطابق للقائمة عن قرب؛ أنحف من A110E 27.8 ملم' } },
            { param: { en: 'Airline Wh rating', ar: 'تصنيف Wh للطيران' }, rated: '74Wh', measured: { en: '74Wh label legible — << 100Wh cabin limit', ar: 'ملصق 74Wh مقروء — << حد المقصورة 100Wh' }, note: { en: 'Carry-on OK; Emirates/Flydubai no in-flight USE since 1 Oct 2025', ar: 'مسموح مقصورة؛ الإمارات/فلاي دبي ممنوع الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025' } },
            { param: { en: 'Joyroom / CPSC recall check (2026-07-24)', ar: 'فحص استدعاء Joyroom / CPSC (2026-07-24)' }, measured: { en: 'No JR-PBF14 hit on cpsc.gov; Anker recall list N/A', ar: 'لا إصابة JR-PBF14 على cpsc.gov؛ قائمة استدعاء Anker غ/م' }, note: { en: 'Still verify packaging authenticity — different brand ≠ automatic clone immunity', ar: 'ما زال تحقق أصالة العبوة — علامة مختلفة ≠ حصانة تلقائية من التقليد' } },
            { param: { en: 'Protocol / engineer / date', ar: 'البروتوكول / المهندس / التاريخ' }, measured: { en: '§7.3 · Eng. Omar Khaled · 2026-07-24', ar: '§7.3 · م. عمر خالد · 2026-07-24' }, note: { en: 'ELEVATED gold deepen — Wh/peaks + §11 red-flag + A/B A110E disclosure', ar: 'تعميق ذهب مرتفع — Wh/الذروات + علم أحمر §11 + إفصاح A/B لـ A110E' } },
            { param: { en: 'Teardown / silicon IDs (red-flag)', ar: 'Teardown / معرفات الرقائق (علم أحمر)' }, measured: { en: 'NOT performed — no ChargerLAB report to cite', ar: '**لم** يُجرَ — لا تقرير ChargerLAB للاستشهاد' }, note: { en: 'CairoVolt did not open the sample — do not invent controller names', ar: 'CairoVolt لم تفتح العيّنة — لا تخترع أسماء متحكمات' } },
        ],
        verdict: {
            en: 'JR-PBF14 Pro delivered 60.8Wh usable (82.2% of 74Wh) at 21.3W USB-C peak — honest phone-class output at ~997 EGP. Slightly below A110E on Wh/efficiency/heat/recharge; wins on price and dual USB-A. No built-in cable. No 20V PDO. Wh consistency PASS. Verify Wh label + authenticity.',
            ar: 'JR-PBF14 Pro أخرج 60.8Wh قابلة للاستخدام (82.2% من 74Wh) بذروة 21.3 واط USB-C — خرج صادق لفئة الهاتف بسعر فئة ~997 جنيه. أقل قليلًا من A110E في Wh/الكفاءة/الحرارة/إعادة الشحن؛ يفوز بالسعر وUSB-A المزدوج. **لا** كابل مدمج. **لا** PDO 20 فولت. اتساق Wh ناجح. تحقق من ملصق Wh والأصالة.',
        },
        pros: [
            { en: '60.8Wh measured usable at 82.2% cell→USB (60.8 ÷ 74) — inside §7.3 80–90% band; est. ~4.2 iPhone 15 charges from measured Wh', ar: '60.8Wh قابلة للاستخدام بنسبة خلية→USB 82.2% (60.8 ÷ 74) — ضمن نطاق §7.3 80–90%؛ تقديري ~4.2 شحنة iPhone 15 من الـWh المقاسة' },
            { en: '~997 EGP street class vs ~1,730 EGP Anker A110E — meaningful savings if you already own a good USB-C cable', ar: 'فئة ~997 جنيه في السوق مقابل ~1,730 جنيه Anker A110E — توفير ملموس إن كنت تملك كابل USB-C جيدًا' },
            { en: 'Peaks match phone-class job: 21.3W USB-C + ~18W USB-A QC — handy for Uber driver serving Android passengers while your phone takes USB-C', ar: 'الذروات تطابق مهمة الهاتف: 21.3 واط USB-C + ~18 واط USB-A QC — مفيد لسائق Uber يخدم ركاب أندرويد بينما هاتفك يأخذ USB-C' },
            { en: 'LED percentage display + dual USB-A — clearer remaining-energy cue than basic LED-dot packs; three-device topology without Anker cable premium', ar: 'شاشة LED للنسبة + USB-A مزدوج — إشارة أوضح للطاقة المتبقية من حزم LED-dot؛ طوبولوجيا ثلاثة أجهزة بلا علاوة كابل Anker' },
            { en: '74Wh label on our sample — below 100Wh airline cabin limit; Wh consistency red-flag PASS (60.8 ≤ 66.6Wh ceiling)', ar: 'ملصق 74Wh على عيّنتنا — تحت حد المقصورة 100Wh؛ علم أحمر اتساق Wh ناجح (60.8 ≤ سقف 66.6Wh)' },
        ],
        limits: [
            { en: 'No built-in USB-C cable — A110E\'s integrated cable is the main reason to pay ~730 EGP more if you lose cables often', ar: '**لا** كابل USB-C مدمج — كابل A110E المدمج هو السبب الرئيسي لدفع ~730 جنيه إضافية إن فقدت كابلات كثيرًا' },
            { en: '60.8Wh vs A110E 62.0Wh (−1.2Wh) and 82.2% vs 83.8% — Anker edged higher on same-week samples; still both inside §7.3 band', ar: '60.8Wh مقابل A110E 62.0Wh (−1.2Wh) و82.2% مقابل 83.8% — Anker تفوّق على عيّنات نفس الأسبوع؛ ما زالا ضمن نطاق §7.3' },
            { en: '22.5W phone-class — NO 20V PDO (red-flag vs “laptop PD” listings); cannot charge MacBook usefully. Same wattage ceiling as A110E, not A1336', ar: '22.5 واط فئة هاتف — **لا** PDO 20 فولت (علم أحمر مقابل قوائم «PD لابتوب»)؛ لا شحن MacBook مفيد. نفس سقف A110E وليس A1336' },
            { en: 'Surface 43.5°C at ~22W — warmest of A110D/A110E/this trio; self-recharge 3 h 22 min slower than A110E 3 h 06 min — plan overnight + airflow', ar: 'السطح 43.5°م عند ~22 واط — الأكثر دفئًا بين ثلاثي A110D/A110E/هذه؛ إعادة شحن 3 س 22 د أبطأ من A110E 3 س 06 د — خطّط لليل + تهوية' },
            { en: 'No teardown / no PZEM — do not invent silicon IDs or wall efficiency %; single unit; verify Wh label + packaging authenticity (Joyroom ≠ Anker recall immunity)', ar: 'بلا teardown / بلا PZEM — لا تخترع معرفات رقائق أو كفاءة حائط %؛ وحدة واحدة؛ تحقق من ملصق Wh وأصالة العبوة (Joyroom ≠ حصانة استدعاء Anker)' },
        ],
    },
};
