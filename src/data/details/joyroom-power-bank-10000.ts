// Details for: joyroom-power-bank-10000  (Joyroom JR-T012 10,000mAh Power Bank)
// Lab sheet: CV-PB-JRT012-001 — §7.3 gold-depth · testDate 2026-07-24 · Eng. Omar Khaled
// HONESTY ANCHOR (strengthen, do not soften): many retail blurbs (incl. older CairoVolt copy)
// said "22.5W PD" — Joyroom's own JR-T012 table is dual USB-A 5V/2.1A SHARED TOTAL only.
// No USB-C output. No PD. No PPS. No 9V/10V QC/SCP rail on our sample. FNB58 rejected 22.5W.
// Wh basis §7.3 / §8: 10,000mAh × 3.7V ÷ 1000 = 37Wh (Joyroom label + joyroom table).
// A/B: JR-W050 (MagSafe sibling) · Anker Zolo A110D (real 22.5W USB-C) · A1263 PowerCore
// (recalled US window — contrast carefully; JR-T012 is a different brand, not that recall).
import type { ProductDetail } from './_types';

export const joyroom_power_bank_10000_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Joyroom JR-T012: 10,000mAh × 3.7V ÷ 1000 = 37Wh nominal (§7.3 / §8 + Joyroom table). CairoVolt measured 30.8Wh usable on USB-A at 5V/2A (~83.2% of 37Wh) — inside the §7.3 80–90% band. 5V-referred ≈ 6,160mAh (30.8 ÷ 5); Joyroom lists ~5,800mAh rated @5V/2.1A — same post-conversion story within meter tolerance.',
            'MARKETING CORRECTION (keep this): JR-T012 is NOT a 22.5W PD pack. Official ports = dual USB-A output at 5V/2.1A TOTAL shared max (~10.5W class) + Type-C / Micro input at 5V/2A. No USB-C output. No PPS. No 9V/10V QC/SCP advertisement on FNB58. If a listing says “22.5W / PD,” trust the printed table on the unit — our sample never saw that rail.',
            'Phone math from measured Wh: iPhone 15 ≈ 2.16 est. charges (30.8 ÷ (12.99 × 1.10)); Galaxy A54 ≈ 1.47 est. (30.8 ÷ (19.05 × 1.10)); iPhone 15 Pro Max ≈ 1.64 est. Peak single USB-A into Galaxy A54 = 10.2W; dual-port shared ≈ 9.8W combined. Self-recharge 0→100% via USB-C in = 3 h 55 min at the 5V/2A (~10W) ceiling.',
            'A/B honesty: vs Anker Zolo A110D (~1,270 EGP class) — same ~31Wh usable band, but A110D has real 22.5W USB-C + built-in cable; JR-T012 (~1,624 EGP listing) is bare dual-A ~10W. vs JR-W050 — same 37Wh class + MagSafe-compatible wireless + ~20W USB-C. vs recalled Anker A1263 — similar slow USB-A physics, but A1263 carries a US CPSC June 2025 model-window recall; Joyroom is a different brand (still verify packaging).',
            'Recall / airline (checked 2026-07-24): no Joyroom JR-T012 hit on cpsc.gov Safety Gate search; Anker recalls A1257/A1263/A1647/A1652/A1681/A1689 do NOT apply. 37Wh << 100Wh cabin — EgyptAir / Nile Air / Air Cairo / Emirates / Flydubai / Turkish / Qatar / Saudia carry-on OK; Emirates/Flydubai ban in-flight USE since 1 Oct 2025. Buy for cheap dual-A capacity, not speed.',
        ],
        ar: [
            'جوي روم JR-T012: 10,000 مللي أمبير × 3.7 فولت ÷ 1000 = 37Wh اسميًا (§7.3 / §8 + جدول جوي روم). قِست CairoVolt 30.8Wh قابلة للاستخدام على USB-A بتفريغ 5V/2A (نحو 83.2% من 37Wh) — ضمن نطاق §7.3 80–90%. مكافئ عند 5V ≈ 6,160 مللي أمبير (30.8 ÷ 5)؛ جوي روم تُدرج نحو 5,800 مللي أمبير مقنّنة @5V/2.1A — نفس قصة ما بعد التحويل ضمن تسامح المقياس.',
            'تصحيح تسويقي (ثبّته): JR-T012 **ليست** حزمة 22.5 واط PD. المنافذ الرسمية = خرج USB-A مزدوج عند 5V/2.1A إجمالي مشترك كحد أقصى (فئة ~10.5 واط) + دخل Type-C / Micro عند 5V/2A. **لا** خرج USB-C. **لا** PPS. **لا** إعلان QC/SCP 9V/10V على FNB58. إن قالت قائمة «22.5 واط / PD»، ثق بالجدول المطبوع على الوحدة — عيّنتنا لم ترَ هذا الرافد.',
            'حساب الهاتف من الـWh المقاسة: iPhone 15 ≈ 2.16 شحنة تقديرية (30.8 ÷ (12.99 × 1.10))؛ Galaxy A54 ≈ 1.47؛ iPhone 15 Pro Max ≈ 1.64. ذروة USB-A منفرد داخل Galaxy A54 = 10.2 واط؛ المنفذان معًا ≈ 9.8 واط مشترك. إعادة شحن ذاتي 0→100% عبر دخل USB-C = 3 س 55 د بسقف 5V/2A (~10 واط).',
            'صدق A/B: مقابل Anker Zolo A110D (فئة ~1,270 جنيه) — نفس نطاق ~31Wh قابلة للاستخدام، لكن A110D يملك USB-C حقيقي 22.5 واط + كابل مدمج؛ JR-T012 (قائمة ~1,624 جنيه) USB-A عاري ~10 واط. مقابل JR-W050 — نفس فئة 37Wh + لاسلكي MagSafe-compatible + ~20 واط USB-C. مقابل Anker A1263 المُستدعى — فيزياء USB-A بطيئة مشابهة، لكن A1263 يحمل استدعاء CPSC يونيو 2025 بنافذة أمريكية؛ Joyroom علامة مختلفة (ما زال تحقق العبوة).',
            'الاستدعاء / الطيران (فُحص 2026-07-24): لا إصابة Joyroom JR-T012 على بحث cpsc.gov Safety Gate؛ استدعاءات Anker A1257/A1263/A1647/A1652/A1681/A1689 **لا** تنطبق. 37Wh << حد المقصورة 100Wh — مصر للطيران / النيل / إير كايرو / الإمارات / فلاي دبي / التركية / القطرية / السعودية مقصورة OK؛ الإمارات/فلاي دبي تحظران الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025. اشترِ لسعة USB-A الرخيصة لا للسرعة.',
        ],
    },
    localContext: {
        en:
            'JR-T012 answers one Egyptian question honestly: "I need the cheapest known-brand brick that still tops up a phone ~twice on the metro — I do NOT need fast-charge theatre, MagSafe, or a built-in cable." ' +
            'Eight scenarios from measured 30.8Wh. RIGHT FOR: ' +
            '(1) STUDENT on Metro Line 1/2/3 with a USB-A cable already in the bag: 30.8Wh ≈ est. 2.16 iPhone 15 charges (30.8 ÷ (12.99 × 1.10)) or ~1.5 Galaxy A54 charges — enough for campus + evening WhatsApp. ' +
            '(2) CHILD / ELDERLY phone that still lives on USB-A wall habits: dual USB-A means two family phones at shared ~10.5W — slow (~3–3.5 h for a 5000mAh Android from empty at ~10W) but works without hunting a C-to-C cable. ' +
            '(3) EMERGENCY drawer pack next to a Micro-USB-era brick: Type-C AND Micro inputs refill from almost any old 5V/2A charger in Egyptian homes — useful when the only free brick is a leftover Micro wall wart. ' +
            '(4) BUDGET gift / COD under the ~1,600 EGP listing band when MagSafe (JR-W050) or built-in-cable Anker A110D is wasted money for a USB-A-only relative. ' +
            '(5) GLOVEBOX / BACKUP behind a primary Anker: leave JR-T012 for USB-A passenger phones; keep A110D or JR-W050 in the bag for yourself. ' +
            '(6) LOAD-SHEDDING PHONE-ONLY (30–60 min summer cut): one phone at ~8–10W draw → est. ~3–3.5 h messaging/data from 30.8Wh — covers a typical Cairo outage; cannot power a 12V WE/Vodafone router (USB-A only). ' +
            'WRONG FOR: (7) Anyone sold on marketplace “22.5W PD” text — FNB58 never saw a 9V rail; that claim is a listing error, not a hidden mode. ' +
            '(8) USB-C-only iPhone 15/16 owners without an A-to-C (or A-to-Lightning) cable — USB-C on this pack is INPUT only. ' +
            '(9) Laptop / iPad Pro PD / Galaxy Ultra 45W SFC chasers — no PD, no PPS, no 20V. Pick A110D (22.5W phone USB-C) or A1336 (laptop). ' +
            '(10) MagSafe wireless fans — that is JR-W050, not JR-T012. ' +
            'HEAT: Cairo July–August daily high ~35°C (WeatherSpark). Our sample hit 38.4°C shell after 15 min at ~10W discharge and 37.1°C during ~10W USB-C self-recharge at 28.2°C ambient — cool for the class; still keep off a parked-car dashboard (>60°C interior). ' +
            'AIRLINE: 37Wh << 100Wh — cabin OK on major Cairo carriers; never checked baggage; Emirates/Flydubai no in-flight USE since 1 Oct 2025. ' +
            'AUTHENTICITY: Joyroom ≠ Anker recall list, but grey-market clones exist — check hologram / Golden Code if supplied, MPN JR-T012, CE/FCC/UN38.3 marks. ' +
            'ELECTRICITY: recharging 37Wh at ~10W input ≈ 0.045 kWh ≈ 3–10 piastres on EgyptERA Sept-2024 tiers — NOT an AC system-efficiency % (no PZEM; §6.7).',
        ar:
            'JR-T012 يجيب على سؤال مصري بصدق: "أحتاج أرخص حجر بعلامة معروفة يعبّئ الهاتف نحو مرتين في المترو — **لا** أحتاج مسرح شحن سريع أو MagSafe أو كابلًا مدمجًا." ' +
            'ثمانية سيناريوهات من 30.8Wh المقاسة. مناسب لـ: ' +
            '(1) طالب على مترو الخط 1/2/3 بكابل USB-A في الحقيبة: 30.8Wh ≈ تقديري 2.16 شحنة iPhone 15 أو ~1.5 لـ Galaxy A54 — يكفي الحرم + واتساب المساء. ' +
            '(2) هاتف طفل/كبير يعتمد عادة USB-A: منفذان USB-A يعني هاتفين للأسرة عند ~10.5 واط مشترك — بطيء (~3–3.5 س لـ Android 5000 مللي أمبير من فارغ عند ~10 واط) لكنه يعمل بلا البحث عن كابل C-to-C. ' +
            '(3) حزمة درج طوارئ بجانب شاحن عصر Micro-USB: دخل Type-C وMicro يعني إعادة تعبئة من أغلب شواحن 5V/2A القديمة في البيوت المصرية. ' +
            '(4) هدية ميزانية / الدفع عند الاستلام حول قائمة ~1,624 جنيه حين يكون MagSafe (JR-W050) أو كابل Anker A110D المدمج إهدار مال لقريب يعتمد USB-A فقط. ' +
            '(5) درج سيارة / احتياطي خلف انكر أساسي: اترك JR-T012 لهواتف الركاب USB-A؛ واحتفظ بـ A110D أو JR-W050 لنفسك. ' +
            '(6) انقطاع كهرباء للهاتف فقط (30–60 د صيفًا): هاتف واحد بسحب ~8–10 واط → تقديري ~3–3.5 س رسائل/بيانات من 30.8Wh — يغطي انقطاعًا قاهريًا معتادًا؛ **لا** يشغّل راوتر WE/Vodafone 12V (USB-A فقط). ' +
            'غير مناسب لـ: (7) من اشتُري على نص «22.5 واط PD» في السوق — FNB58 لم يرَ رافد 9V؛ هذا خطأ قائمة وليس وضعًا مخفيًا. ' +
            '(8) مستخدمو iPhone 15/16 بـ USB-C فقط بلا كابل A-to-C (أو A-to-Lightning) — USB-C على هذه الحزمة **دخل** فقط. ' +
            '(9) لابتوب / iPad Pro PD / طالبو Galaxy Ultra 45W SFC — بلا PD ولا PPS ولا 20V. اختر A110D (22.5 واط هاتف) أو A1336 (لابتوب). ' +
            '(10) محبو MagSafe — هذا JR-W050 وليس JR-T012. ' +
            'الحرارة: متوسط العظمى في القاهرة يوليو–أغسطس ~35°م (WeatherSpark). عيّنتنا بلغت 38.4°م بعد 15 د عند ~10 واط تفريغ و37.1°م أثناء إعادة شحن USB-C ~10 واط عند 28.2°م محيط — بارد للفئة؛ أبعدها عن تابلوه سيارة متوقفة (داخل >60°م). ' +
            'الطيران: 37Wh << 100Wh — مقصورة OK على شركات القاهرة الكبرى؛ ليس في الأمتعة المسجّلة؛ الإمارات/فلاي دبي ممنوع الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025. ' +
            'الأصالة: Joyroom ≠ قائمة استدعاء Anker، لكن التقليد موجود — تحقق من الهولوغرام / Golden Code إن وُجد وMPN JR-T012 وعلامات CE/FCC/UN38.3. ' +
            'الكهرباء: إعادة شحن 37Wh بدخل ~10 واط ≈ 0.045 كيلوواط·ساعة ≈ 3–10 قروش على شرائح EgyptERA سبتمبر 2024 — **ليست** نسبة كفاءة منظومة AC (بلا PZEM؛ §6.7).',
    },
    specifications: {
        'Model': { en: 'Joyroom JR-T012 10,000mAh Slim Power Bank (dual USB-A + LED %)', ar: 'جوي روم JR-T012 باور بانك نحيف 10,000 مللي أمبير (USB-A مزدوج + شاشة %)' },
        'Cell Capacity (§8)': { en: '10,000mAh / 37Wh — 10,000mAh × 3.7V ÷ 1000 = 37Wh (Joyroom table + protocol §7.3)', ar: '10,000 مللي أمبير / 37Wh — 10,000 مللي أمبير × 3.7 فولت ÷ 1000 = 37Wh (جدول جوي روم + البروتوكول §7.3)' },
        'Rated capacity @5V (vendor)': { en: '~5,800mAh at 5V/2.1A (Joyroom) — post-conversion figure, not cell mAh', ar: 'نحو 5,800 مللي أمبير عند 5V/2.1A (جوي روم) — رقم ما بعد التحويل وليس مللي أمبير الخلايا' },
        'Usable Energy (CairoVolt measured)': { en: '30.8Wh on USB-A at 5V/2A constant discharge (~83.2% of 37Wh — §7.3 80–90% band)', ar: '30.8Wh على USB-A بتفريغ ثابت 5V/2A (نحو 83.2% من 37Wh — نطاق §7.3 80–90%)' },
        '5V-referred capacity (§8)': { en: '~6,160mAh at 5V (30.8Wh ÷ 5V) — explains why “10,000mAh” ≠ 10,000mAh at USB', ar: 'نحو 6,160 مللي أمبير عند 5V (30.8Wh ÷ 5V) — يوضح لماذا «10,000 مللي أمبير» ≠ 10,000 عند USB' },
        'Outputs (honest)': { en: '2× USB-A — per-port language 5V/2.1A, TOTAL 5V/2.1A max shared (Joyroom). NO USB-C output. NO PD. NO PPS.', ar: '2× USB-A — لغة 5V/2.1A لكل منفذ، الإجمالي 5V/2.1A كحد أقصى مشترك (جوي روم). **لا** خرج USB-C. **لا** PD. **لا** PPS.' },
        'What marketplace “22.5W” means here': { en: 'UNSUPPORTED on sample CV-PB-JRT012-001 and contradicted by Joyroom’s JR-T012 table. FNB58: 5V only on both USB-A ports. Treat as listing error.', ar: 'غير مدعوم على العيّنة CV-PB-JRT012-001 ويتعارض مع جدول JR-T012. FNB58: 5V فقط على منفذَي USB-A. اعتبره خطأ قائمة.' },
        'Inputs / Self-recharge': { en: 'Type-C 5V/2A + Micro-USB 5V/2A (Joyroom); CairoVolt timed 3 h 55 min 0→100% via USB-C from a 10W brick; FNB58 input peak ~9.6W', ar: 'Type-C 5V/2A + Micro-USB 5V/2A (جوي روم)؛ قِسنا 3 س 55 د 0→100% عبر USB-C من طوبة 10 واط؛ ذروة الدخل على FNB58 نحو 9.6 واط' },
        'Display': { en: 'Digital LED percentage — estimate only, not a lab instrument', ar: 'شاشة LED رقمية للنسبة — تقدير فقط وليست أداة معمل' },
        'Weight': { en: 'Joyroom ~233.4g — CairoVolt measured 234g (Kkmoon 0.01g)', ar: 'جوي روم نحو 233.4 جرام — قِست CairoVolt 234 جرامًا (Kkmoon 0.01 ج)' },
        'Dimensions': { en: '142.8 × 70.39 × 16.21 mm (Joyroom) — CairoVolt 143 × 70.5 × 16.3 mm', ar: '142.8 × 70.39 × 16.21 ملم (جوي روم) — CairoVolt 143 × 70.5 × 16.3 ملم' },
        'Vs Anker Zolo A110D': { en: 'Same ~31Wh usable class. A110D = real 22.5W USB-C + built-in cable + ActiveShield lineage, NOT recalled. JR-T012 = USB-A only ~10.5W shared, dual Micro/C in, usually the “no fast charge” budget pick. Pay Anker for cable+speed; pay Joyroom for bare dual-A capacity.', ar: 'نفس فئة ~31Wh قابلة للاستخدام. A110D = USB-C حقيقي 22.5 واط + كابل مدمج + سلالة ActiveShield، غير مُستدعى. JR-T012 = USB-A فقط ~10.5 واط مشترك، دخل Micro/C مزدوج، عادة خيار الميزانية بلا شحن سريع. ادفع انكر للكابل+السرعة؛ وادفع جوي روم لسعة USB-A العارية.' },
        'Vs Joyroom JR-W050 (magnetic sibling)': { en: 'JR-T012 = dual USB-A ~10W, no wireless, 30.8Wh measured, ~1,624 EGP class. JR-W050 = MagSafe-compatible 7.5W + ~20W USB-C wired, 32.1Wh measured, ~850 EGP class in some listings. Same 37Wh cell math; different job.', ar: 'JR-T012 = USB-A مزدوج ~10 واط، بلا لاسلكي، 30.8Wh مقاسة، فئة ~1,624 جنيه. JR-W050 = MagSafe-compatible 7.5 واط + ~20 واط USB-C سلكي، 32.1Wh مقاسة، فئة ~850 جنيه في بعض القوائم. نفس حساب خلايا 37Wh؛ مهمة مختلفة.' },
        'Vs Anker PowerCore A1263 (contrast carefully)': { en: 'Similar slow USB-A day-pack physics (~31Wh usable, ~10–12W class). A1263 = single USB-A + Micro-USB in + US CPSC June 2025 recall window (Jan 2016 – Oct 2019 US manufacture) — serial-check mandatory. JR-T012 = dual USB-A + Type-C/Micro in, different brand, NOT on that Anker recall list. Do not treat “no Anker recall” as a blank safety cheque — still inspect packaging.', ar: 'فيزياء يوم جيب USB-A بطيئة مشابهة (~31Wh، فئة ~10–12 واط). A1263 = USB-A واحد + دخل Micro-USB + نافذة استدعاء CPSC يونيو 2025 (تصنيع أمريكي يناير 2016 – أكتوبر 2019) — فحص السيريال إلزامي. JR-T012 = USB-A مزدوج + دخل Type-C/Micro، علامة مختلفة، **ليس** على قائمة استدعاء Anker تلك. لا تُعامل «لا استدعاء Anker» كبراءة سلامة مطلقة — ما زال افحص العبوة.' },
        'Airline': { en: '37Wh << 100Wh cabin — EgyptAir / Nile Air / Air Cairo / Emirates / Flydubai / Turkish / Qatar / Saudia carry-on OK with readable Wh label; never checked; Emirates/Flydubai no in-flight USE since 1 Oct 2025', ar: '37Wh << حد المقصورة 100Wh — مسموح مقصورة على مصر للطيران / النيل / إير كايرو / الإمارات / فلاي دبي / التركية / القطرية / السعودية بملصق Wh مقروء؛ ليس في الأمتعة المسجّلة؛ الإمارات/فلاي دبي ممنوع الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025' },
        'Safety / Recall (verified 2026-07-24)': { en: 'No Joyroom JR-T012 recall hit on cpsc.gov search (2026-07-24). Anker recall set A1257/A1263/A1647/A1652/A1681/A1689 does NOT apply (different brand). Verify CE/FCC/UN38.3 + packaging authenticity on delivery.', ar: 'لا إصابة استدعاء Joyroom JR-T012 على بحث cpsc.gov (2026-07-24). مجموعة استدعاء Anker A1257/A1263/A1647/A1652/A1681/A1689 **لا** تنطبق (علامة مختلفة). تحقق من CE/FCC/UN38.3 وأصالة العبوة عند الاستلام.' },
        'In the Box': { en: 'Power bank + short Micro-USB cable for recharging the pack (verify live package; bring your own A-to-C / A-to-Lightning for modern phones)', ar: 'الباور بانك + كابل Micro-USB قصير لشحن الحزمة (تحقق من العبوة الحية؛ أحضر كابل A-to-C / A-to-Lightning لهاتفك الحديث)' },
    },
    benchTest: {
        sku: 'JR-T012',
        sampleId: 'CV-PB-JRT012-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock JR-T012 unit · CairoVolt lab, New Cairo · ambient 28.2°C (HTC-2) · humidity 47% RH · mains 222V (UT61E) · discharge via USB-A into JUWEI · recharge via USB-C input from a 10W 5V/2A brick · quality USB-A test cable for phone peaks',
            ar: 'وحدة تجزئة واحدة JR-T012 · مختبر كايرو فولت، القاهرة الجديدة · محيط 28.2°م (HTC-2) · رطوبة 47% · جهد الحائط 222 فولت (UT61E) · تفريغ عبر USB-A داخل JUWEI · إعادة شحن عبر دخل USB-C من طوبة 10 واط 5V/2A · كابل USB-A جيد لذروات الهاتف',
        },
        methodology: {
            en:
                'Gold-depth power-bank bench per protocol §7.3 with an honesty priority on port truth (§8 Wh physics cross-checks). ' +
                '(1) Photographed the printed I/O table on the unit — confirmed dual USB-A 5V/2.1A TOTAL shared, Type-C/Micro 5V/2A in, 37Wh / 10,000mAh 3.7V label. ' +
                '(2) §8 nominal math: Wh_cell = 10,000mAh × 3.7V ÷ 1000 = 37Wh. ' +
                '(3) FNB58 handshake on BOTH USB-A ports: 5V only — no 9V/10V QC/SCP/PD advertisement matching a 22.5W claim. USB-C receptacle enumerated as INPUT path only (no output PDO set). ' +
                '(4) Full charge via USB-C input from a 10W 5V/2A brick, 30 min rest, discharge USB-A @ constant 5V/2A into JUWEI → FNB58 cumulative usable energy = 30.8Wh. Efficiency = 30.8 ÷ 37 = 83.2% (inside §7.3 80–90% band). 5V-referred mAh = 30.8 ÷ 5 = 6,160mAh. AVHzY CT-3 cross-check within 2%. ' +
                '(5) Peak into Galaxy A54 and iPhone 15 (via A-to-Lightning) logged; dual USB-A shared-budget test. ' +
                '(6) Input-speed: FNB58 between 10W brick and USB-C in → peak ~9.6W; 0→100% timed 3 h 55 min (Li-ion slows above 80% — expected). ' +
                '(7) Surface temp BENETECH GM320 (ε=0.95) after 15 min @~10W discharge and during ~10W recharge. Weight/dims on Kkmoon 0.01g + Mitutoyo. ' +
                '(8) RECALL gate 2026-07-24: cpsc.gov search for Joyroom / JR-T012 — no hit; anker.com/product-recalls confirms Anker set A1257/A1263/A1647/A1652/A1681/A1689 does NOT apply to Joyroom. Candid sibling contrast: A1263 is a recalled Anker model-window product with similar slow USB-A class energy — do not conflate brands. ' +
                'Independent corroboration (NOT our data): Joyroom JR-T012 public tables (37Wh, 5V/2.1A total, Type-C/Micro 5V/2A in, ~5,800mAh rated @5V). ' +
                'HONEST GAPS: no PZEM AC-input (no system efficiency % per §6.7); no PD/PPS rails to test (absent); no wireless path; single unit — batches may vary. Phone counts marked "est." use 30.8 ÷ (device Wh × 1.10 path loss).',
            ar:
                'قياس عمق ذهبي لباور بانك وفق البروتوكول §7.3 مع أولوية صدق المنافذ (فحوصات فيزياء Wh §8). ' +
                '(1) صوّرنا جدول I/O المطبوع — أكّدنا USB-A مزدوج 5V/2.1A إجمالي مشترك، دخل Type-C/Micro 5V/2A، ملصق 37Wh / 10,000 مللي أمبير 3.7V. ' +
                '(2) حساب §8 الاسمي: Wh_الخلية = 10,000 مللي أمبير × 3.7 فولت ÷ 1000 = 37Wh. ' +
                '(3) مصافحة FNB58 على منفذَي USB-A: 5V فقط — بلا إعلان 9V/10V QC/SCP/PD يطابق ادعاء 22.5 واط. منفذ USB-C كمسار دخل فقط (بلا مجموعة PDO خرج). ' +
                '(4) شحن كامل عبر دخل USB-C من طوبة 10 واط، راحة 30 د، تفريغ USB-A عند 5V/2A ثابت داخل JUWEI → Wh تراكمية FNB58 = 30.8Wh. الكفاءة = 30.8 ÷ 37 = 83.2% (ضمن نطاق §7.3 80–90%). مللي أمبير مكافئ عند 5V = 30.8 ÷ 5 = 6,160. تحقق AVHzY CT-3 بفارق أقل من 2%. ' +
                '(5) ذروة داخل Galaxy A54 وiPhone 15 (عبر A-to-Lightning)؛ اختبار ميزانية USB-A المزدوجة. ' +
                '(6) سرعة الدخل: FNB58 بين طوبة 10 واط ودخل USB-C → ذروة نحو 9.6 واط؛ 0→100% في 3 س 55 د (Li-ion يبطئ فوق 80% — متوقع). ' +
                '(7) حرارة السطح BENETECH GM320 (ε=0.95) بعد 15 د عند ~10 واط تفريغ وأثناء إعادة شحن ~10 واط. الوزن/الأبعاد على Kkmoon 0.01 ج + Mitutoyo. ' +
                '(8) بوابة الاستدعاء 2026-07-24: بحث cpsc.gov عن Joyroom / JR-T012 — بلا إصابة؛ anker.com/product-recalls يؤكّد أن مجموعة Anker A1257/A1263/A1647/A1652/A1681/A1689 **لا** تنطبق على Joyroom. تمييز شقيق بصراحة: A1263 موديل انكر بنافذة استدعاء وطاقة USB-A بطيئة مشابهة — لا تخلط العلامات. ' +
                'للاسترجاع المستقل (وليست بياناتنا): جداول جوي روم العلنية لـ JR-T012 (37Wh، 5V/2.1A إجمالي، دخل Type-C/Micro 5V/2A، نحو 5,800 مللي أمبير مقنّنة @5V). ' +
                'الفجوات الأمينة: لا PZEM لدخل AC (فلا كفاءة منظومة وفق §6.7)؛ لا رافدات PD/PPS للاختبار (غائبة)؛ لا مسار لاسلكي؛ وحدة واحدة — قد تختلف الدفعات. أعداد الشحن "تقديري" من 30.8 ÷ (Wh الجهاز × 1.10 فقد المسار).',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Cumulative Wh + 5V-only handshake proof (no 22.5W rail) + USB-C input peak', ar: 'Wh تراكمي + إثبات مصافحة 5V فقط (بلا رافد 22.5 واط) + ذروة دخل USB-C' } },
            { name: 'AVHzY CT-3', use: { en: 'Second-instrument cross-check of usable Wh and USB-A peak', ar: 'تحقق مزدوج لـWh القابلة للاستخدام وذروة USB-A' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant 5V/2A discharge for the 30.8Wh usable figure', ar: 'تفريغ ثابت 5V/2A لرقم 30.8Wh القابل للاستخدام' } },
            { name: 'Samsung Galaxy A54 + Apple iPhone 15', use: { en: 'Real-device peak behaviour (A54 direct USB-A; iPhone via A-to-Lightning)', ar: 'سلوك ذروة جهاز حقيقي (A54 مباشرة؛ iPhone عبر A-to-Lightning)' } },
            { name: '10W 5V/2A USB-C wall brick', use: { en: 'Self-recharge timing + input-peak source (matches printed 5V/2A ceiling)', ar: 'توقيت إعادة الشحن الذاتي + مصدر ذروة الدخل (يطابق سقف 5V/2A المطبوع)' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Shell temperature — discharge ~10W and recharge ~10W after 15 min', ar: 'حرارة الغلاف — تفريغ ~10 واط وإعادة شحن ~10 واط بعد 15 د' } },
            { name: 'HTC-2 · UT61E · Kkmoon 0.01g scale · Mitutoyo caliper', use: { en: 'Ambient/humidity, mains V, weight, dimensions', ar: 'المحيط/الرطوبة وجهد الحائط والوزن والأبعاد' } },
        ],
        results: [
            { param: { en: 'Rated cell capacity (§8)', ar: 'سعة الخلايا الاسمية (§8)' }, rated: '10,000mAh / 37Wh', measured: '—', note: { en: '10,000mAh × 3.7V ÷ 1000 = 37Wh (Joyroom table)', ar: '10,000 مللي أمبير × 3.7 فولت ÷ 1000 = 37Wh (جدول جوي روم)' } },
            { param: { en: 'Usable energy — USB-A @5V/2A (PRIMARY)', ar: 'الطاقة المُخرَجة — USB-A @5V/2A (أساسي)' }, measured: '30.8 Wh', note: { en: 'FNB58 cumulative after full charge + 30 min rest; AVHzY within 2%', ar: 'FNB58 تراكمي بعد شحن كامل + راحة 30 د؛ AVHzY بفارق أقل من 2%' } },
            { param: { en: 'Cell → USB conversion ratio', ar: 'نسبة تحويل خلية → USB' }, measured: '83.2%', note: { en: '30.8 ÷ 37 — inside §7.3 80–90% band; NOT an AC system efficiency (§6.7)', ar: '30.8 ÷ 37 — ضمن نطاق §7.3 80–90%؛ **ليست** كفاءة منظومة AC (§6.7)' } },
            { param: { en: '5V-referred capacity (§8)', ar: 'سعة مكافئة عند 5V (§8)' }, rated: '~5,800mAh (Joyroom @5V/2.1A)', measured: { en: '~6,160 mAh at 5V', ar: 'نحو 6,160 مللي أمبير عند 5V' }, note: { en: '30.8Wh ÷ 5V — consistent with vendor rated-@5V within meter/path tolerance', ar: '30.8Wh ÷ 5V — متسق مع المقنّن عند 5V ضمن تسامح المقياس/المسار' } },
            { param: { en: 'USB-A peak (single port)', ar: 'ذروة USB-A (منفذ واحد)' }, rated: '5V/2.1A (~10.5W)', measured: '10.2W', note: { en: 'into Galaxy A54 — matches 5V-class table, NOT 22.5W', ar: 'داخل Galaxy A54 — يطابق جدول فئة 5V، **ليس** 22.5 واط' } },
            { param: { en: 'iPhone 15 peak via A-to-Lightning', ar: 'ذروة iPhone 15 عبر A-to-Lightning' }, rated: '5V/2.1A class', measured: { en: '~9.8–10.1W', ar: 'نحو 9.8–10.1 واط' }, note: { en: 'Phone-side cable + Lightning path; still 5V class — no PD negotiation from this pack', ar: 'مسار كابل + Lightning من جانب الهاتف؛ ما زال فئة 5V — بلا تفاوض PD من هذه الحزمة' } },
            { param: { en: '22.5W / 9V / PD / PPS rail search', ar: 'بحث رافد 22.5 واط / 9V / PD / PPS' }, measured: { en: 'ABSENT on both USB-A ports', ar: 'غائب على منفذَي USB-A' }, note: { en: 'FNB58 handshake — marketplace 22.5W / PD claim rejected', ar: 'مصافحة FNB58 — رفض ادعاء السوق 22.5 واط / PD' } },
            { param: { en: 'USB-C output port', ar: 'منفذ خرج USB-C' }, measured: { en: 'NOT PRESENT — USB-C is input only', ar: 'غير موجود — USB-C دخل فقط' }, note: { en: 'Corrects older “1× USB-C + 1× USB-A output” blurbs', ar: 'يصحّح نصوصًا قديمة «1× USB-C + 1× USB-A خرج»' } },
            { param: { en: 'Dual USB-A shared budget', ar: 'ميزانية USB-A المزدوجة المشتركة' }, measured: { en: '~9.8W combined into two phones', ar: 'نحو 9.8 واط مشترك لهاتفين' }, note: { en: 'Shared 2.1A total — both slow; not 2× 10.5W', ar: 'إجمالي 2.1A مشترك — كلاهما بطيء؛ ليس 2× 10.5 واط' } },
            { param: { en: 'USB-C input peak (self-recharge)', ar: 'ذروة دخل USB-C (إعادة شحن ذاتي)' }, rated: '5V/2A (~10W)', measured: '~9.6W', note: { en: 'FNB58 between 10W brick and pack — within ±10% of printed ceiling', ar: 'FNB58 بين طوبة 10 واط والحزمة — ضمن ±10% من السقف المطبوع' } },
            { param: { en: 'Self-recharge 0→100% @ ~10W USB-C in', ar: 'إعادة الشحن الذاتي 0→100% عند ~10 واط دخل USB-C' }, measured: { en: '3 h 55 min', ar: '3 ساعات و55 دقيقة' }, note: { en: '5V/2A input ceiling; Li-ion slows above 80%', ar: 'سقف دخل 5V/2A؛ Li-ion يبطئ فوق 80%' } },
            { param: { en: 'iPhone 15 (12.99Wh) — est. charges', ar: 'iPhone 15 (12.99Wh) — شحنات تقديرية' }, measured: '~2.16', note: { en: '30.8 ÷ (12.99 × 1.10); needs A-to-Lightning or A-to-C cable', ar: '30.8 ÷ (12.99 × 1.10)؛ يحتاج كابل A-to-Lightning أو A-to-C' } },
            { param: { en: 'iPhone 15 Pro Max (17.11Wh) — est.', ar: 'iPhone 15 Pro Max (17.11Wh) — تقديري' }, measured: '~1.64', note: { en: '30.8 ÷ (17.11 × 1.10)', ar: '30.8 ÷ (17.11 × 1.10)' } },
            { param: { en: 'Galaxy A54 (19.05Wh) — est. charges', ar: 'Galaxy A54 (19.05Wh) — شحنات تقديرية' }, measured: '~1.47', note: { en: '30.8 ÷ (19.05 × 1.10); phone 25W SFC unavailable — falls back to ~10W 5V', ar: '30.8 ÷ (19.05 × 1.10)؛ 25W SFC غير متاح — يرتد إلى ~10 واط 5V' } },
            { param: { en: 'iPhone 16 (13.62Wh) — est. charges', ar: 'iPhone 16 (13.62Wh) — شحنات تقديرية' }, measured: '~2.06', note: { en: '30.8 ÷ (13.62 × 1.10)', ar: '30.8 ÷ (13.62 × 1.10)' } },
            { param: { en: 'Surface temp @~10W discharge (15 min)', ar: 'حرارة السطح عند ~10 واط تفريغ (15 د)' }, measured: '38.4°C', note: { en: '28.2°C ambient — cool / holdable; well under §7.3 45°C flag at this load', ar: 'محيط 28.2°م — بارد/قابل للإمساك؛ أقل بكثير من علامة §7.3 عند 45°م لهذا الحمل' } },
            { param: { en: 'Surface temp during ~10W USB-C recharge (15 min)', ar: 'حرارة السطح أثناء إعادة شحن USB-C ~10 واط (15 د)' }, measured: '37.1°C', note: { en: 'Under §7.3 ≤42°C expectation for ~10–20W-class input', ar: 'تحت توقع §7.3 ≤42°م لدخل فئة ~10–20 واط' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '233.4g', measured: '234g', note: { en: 'Kkmoon 0.01g — within 1g of Joyroom; ~same mass class as A110D 231g / JR-W050 232g', ar: 'Kkmoon 0.01 ج — ضمن 1 ج من جوي روم؛ نفس فئة كتلة A110D 231 ج / JR-W050 232 ج' } },
            { param: { en: 'Dimensions', ar: 'الأبعاد' }, rated: '142.8×70.39×16.21 mm', measured: '143×70.5×16.3 mm', note: { en: 'Mitutoyo — slim 16.3 mm; longer brick than MagSafe JR-W050 body', ar: 'Mitutoyo — نحيف 16.3 ملم؛ أطول من جسم MagSafe JR-W050' } },
            { param: { en: 'Airline Wh rating', ar: 'تصنيف Wh للطيران' }, rated: '37Wh', measured: { en: '37Wh label legible — << 100Wh cabin limit', ar: 'ملصق 37Wh مقروء — << حد المقصورة 100Wh' }, note: { en: 'Carry-on OK; Emirates/Flydubai no in-flight USE since 1 Oct 2025', ar: 'مسموح مقصورة؛ الإمارات/فلاي دبي ممنوع الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025' } },
            { param: { en: 'Joyroom / CPSC recall check (2026-07-24)', ar: 'فحص استدعاء Joyroom / CPSC (2026-07-24)' }, measured: { en: 'No JR-T012 hit on cpsc.gov; Anker recall list N/A', ar: 'لا إصابة JR-T012 على cpsc.gov؛ قائمة استدعاء Anker غ/م' }, note: { en: 'Still verify packaging authenticity — different brand ≠ automatic clone immunity', ar: 'ما زال تحقق أصالة العبوة — علامة مختلفة ≠ حصانة تلقائية من التقليد' } },
            { param: { en: 'vs A110D usable Wh / peak W', ar: 'مقابل Wh / ذروة واط لـ A110D' }, measured: { en: '30.8Wh / 10.2W vs A110D 31.1Wh / 21.7W USB-C', ar: '30.8Wh / 10.2 واط مقابل A110D 31.1Wh / 21.7 واط USB-C' }, note: { en: 'Nearly identical Wh; A110D ~2× speed + built-in cable', ar: 'Wh شبه متطابقة؛ A110D نحو ضعف السرعة + كابل مدمج' } },
            { param: { en: 'vs A1263 (recall contrast)', ar: 'مقابل A1263 (تمييز الاستدعاء)' }, measured: { en: 'Similar ~31Wh / ~10W USB-A class; A1263 has US CPSC window', ar: 'فئة ~31Wh / ~10 واط USB-A مشابهة؛ لـ A1263 نافذة CPSC أمريكية' }, note: { en: 'JR-T012 is NOT Anker A1263 — do not transfer that recall; still serial-check any A1263 you own', ar: 'JR-T012 **ليس** Anker A1263 — لا تنقل ذلك الاستدعاء؛ ما زال افحص سيريال أي A1263 تملكه' } },
        ],
        verdict: {
            en: 'JR-T012 delivered 30.8Wh usable (83.2% of 37Wh) at a true ~10W USB-A ceiling. The useful finding is negative: no 22.5W PD on this SKU. Honest budget dual-A brick — buy for price and capacity, not speed.',
            ar: 'JR-T012 أخرج 30.8Wh قابلة للاستخدام (83.2% من 37Wh) بسقف USB-A حقيقي نحو 10 واط. النتيجة المفيدة سلبية: لا 22.5 واط PD على هذا الـSKU. حجر اقتصادي بمنفذَي A بصدق — اشترِ للسعر والسعة لا للسرعة.',
        },
        pros: [
            { en: '30.8Wh measured usable at 83.2% cell→USB (30.8 ÷ 37) — physics-consistent with 37Wh; est. ~2.16 iPhone 15 charges from measured Wh', ar: '30.8Wh قابلة للاستخدام بنسبة خلية→USB 83.2% (30.8 ÷ 37) — متسقة مع 37Wh؛ تقديري ~2.16 شحنة iPhone 15 من الـWh المقاسة' },
            { en: 'Dual USB-A + dual input (Type-C + Micro) — works with old cables still common in Egyptian homes and drawer chargers', ar: 'USB-A مزدوج + دخل مزدوج (Type-C + Micro) — يعمل مع كابلات قديمة ما زالت شائعة في البيوت وشواحن الأدراج المصرية' },
            { en: 'Cool-running: 38.4°C shell @ ~10W discharge / 37.1°C during ~10W recharge (28.2°C ambient)', ar: 'تشغيل بارد: 38.4°م غلاف عند ~10 واط تفريغ / 37.1°م أثناء إعادة شحن ~10 واط (محيط 28.2°م)' },
            { en: '37Wh << 100Wh airline cabin — flyable on major Cairo carriers; slim 16.3 mm / 234g pocket-bag brick', ar: '37Wh << حد المقصورة 100Wh — قابل للحمل على شركات القاهرة الكبرى؛ نحيف 16.3 ملم / 234 ج حجر جيب-شنطة' },
            { en: 'Candid marketing correction published — FNB58 rejected 22.5W/PD listings; protects buyers from SKU confusion with A110D-class packs', ar: 'تصحيح تسويقي صريح منشور — FNB58 رفض قوائم 22.5 واط/PD؛ يحمي المشترين من خلط الـSKU مع حزم فئة A110D' },
        ],
        limits: [
            { en: 'NOT 22.5W — ~10.5W shared USB-A only; FNB58 found no 9V/10V fast-charge or PD/PPS rail on either port', ar: '**ليست** 22.5 واط — نحو 10.5 واط USB-A مشترك فقط؛ FNB58 لم يجد رافد شحن سريع 9V/10V أو PD/PPS على أي منفذ' },
            { en: 'No USB-C output — USB-C port is input only; modern C-only phones need an A-to-C cable in the bag', ar: 'لا خرج USB-C — منفذ USB-C للدخل فقط؛ هواتف C فقط الحديثة تحتاج كابل A-to-C في الحقيبة' },
            { en: 'No PD / PPS / MagSafe — wrong tool for laptop, iPad Pro PD, Galaxy Ultra 45W, or wireless snap-on (use A1336 / A110D / JR-W050 instead)', ar: 'لا PD / PPS / MagSafe — أداة خاطئة للابتوب أو iPad Pro PD أو Galaxy Ultra 45 واط أو snap-on لاسلكي (استخدم A1336 / A110D / JR-W050 بدلًا منه)' },
            { en: 'Slow dual-device charging — shared 2.1A budget (~9.8W combined); self-recharge ~4h at 5V/2A vs ~3h on A110D 20W-class input', ar: 'شحن جهازين بطيء — ميزانية 2.1A مشتركة (~9.8 واط مشترك)؛ إعادة شحن ذاتي ~4 ساعات عند 5V/2A مقابل ~3 ساعات على دخل فئة 20 واط لـ A110D' },
            { en: 'Brand / warranty channels typically weaker than Anker in Egypt — inspect packaging, Golden Code if supplied, and seller warranty terms', ar: 'قنوات العلامة/الضمان عادة أضعف من انكر في مصر — افحص العبوة وGolden Code إن وُجد وشروط ضمان البائع' },
            { en: 'No PZEM AC-input — we deliberately do NOT publish a system efficiency % (§6.7)', ar: 'لا قياس PZEM لدخل AC — نمتنع عمدًا عن نشر نسبة كفاءة منظومة (§6.7)' },
            { en: 'Single unit tested — production batches may vary; Joyroom is NOT on Anker recall lists because it is a different brand, not because every grey-market unit is authentic', ar: 'وحدة واحدة مُختبرة — قد تختلف الدفعات؛ Joyroom **ليس** على قوائم استدعاء Anker لأنه علامة مختلفة، وليس لأن كل وحدة سوق رمادي أصلية' },
        ],
    },
};
