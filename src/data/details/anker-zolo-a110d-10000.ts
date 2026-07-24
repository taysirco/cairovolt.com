// Details for: anker-zolo-a110d-10000  (Anker Zolo 10,000mAh Power Bank with Built-in USB-C Cable, model A110D)
// Lab sheet: CV-PB-A110D-001 — §7.3 ELEVATED gold 100% · testDate 2026-07-24 · Eng. Omar Khaled
// HONESTY ANCHOR: A110D HAS real 22.5W USB-C (FNB58: 5V/3A · 9V/2.22A · 10V/2.25A; peaks 21.7W port / 21.4W cable).
// Do NOT conflate with Joyroom JR-T012 marketplace “22.5W PD” blurbs — JR-T012 is dual USB-A ~10W only (see that sheet).
// Wh basis §7.3 / §8: Anker 5,000mAh × 2 in series @ 7.4VDC → 37Wh (≡ 10,000mAh × 3.7V ÷ 1000).
// A/B: sibling A110E (62.0Wh / same 22.5W ceiling) · JR-T012 (30.8Wh / ~10W USB-A, no C-out).
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · Wh/peaks · §11 red-flag · recall 2026-07-24.
// Export must remain `anker_zolo_a110d_10000_detail` for the details registry.
import type { ProductDetail } from './_types';

export const anker_zolo_a110d_10000_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker Zolo A110D: 10,000mAh marketing / 37Wh cells (§7.3 / §8 — Anker: 5,000mAh × 2 in series at 7.4VDC ≡ 10,000mAh × 3.7V ÷ 1000). CairoVolt measured 31.1Wh usable on USB-C at 5V/2A (~84.1% of 37Wh) — inside the §7.3 80–90% band. 5V-referred ≈ 6,220mAh (31.1 ÷ 5).',
            'REAL 22.5W USB-C (not theatre): built-in bidirectional USB-C cable + separate USB-C + USB-A. Single-port rated 22.5W (5V/3A · 9V/2.22A · 10V/2.25A); multiport ceiling 15W shared. Peaks: 21.7W USB-C port · 21.4W built-in cable path (AVHzY within 1.4%). Phone-class only — NO 20V PDO on sample CV-PB-A110D-001.',
            'Phone math from measured Wh: iPhone 15 ≈ 2.18 est. charges (31.1 ÷ (12.99 × 1.10)); iPhone 16 ≈ 2.08; Galaxy A54 ≈ 1.48; iPhone 15 Pro Max ≈ 1.65. Self-recharge 0→100% = 2 h 58 min at ~20W USB-C in (Anker lists ~3 h).',
            'A/B honesty: vs sibling A110E — same 22.5W ceiling (A110E peak 21.5W) but A110E doubles energy (62.0Wh / 394g / 27.8 mm) vs A110D (31.1Wh / 231g / 15.5 mm). vs Joyroom JR-T012 — near-tied Wh (30.8Wh) but JR-T012 is dual USB-A ~10.2W with NO USB-C output; marketplace “22.5W PD” on JR-T012 is a red-flag listing error — A110D is the real 22.5W USB-C brick.',
            'Recall / airline (checked 2026-07-24): NOT recalled — anker.com/product-recalls + cpsc.gov; outside A1257/A1263/A1647/A1652/A1681/A1689. 37Wh << 100Wh cabin — EgyptAir / Nile Air / Air Cairo / Emirates / Flydubai / Turkish / Qatar / Saudia carry-on OK; Emirates/Flydubai ban in-flight USE since 1 Oct 2025. Buy for slim metro + built-in cable, not laptop PD.',
        ],
        ar: [
            'انكر Zolo A110D: 10,000 مللي أمبير تسويقي / خلايا 37Wh (§7.3 / §8 — انكر: 5,000 مللي أمبير × 2 على التوالي عند 7.4VDC ≡ 10,000 × 3.7 ÷ 1000). قِست CairoVolt 31.1Wh قابلة للاستخدام على USB-C بتفريغ 5V/2A (نحو 84.1% من 37Wh) — ضمن نطاق §7.3 80–90%. مكافئ عند 5V ≈ 6,220 مللي أمبير (31.1 ÷ 5).',
            'USB-C حقيقي 22.5 واط (وليس مسرحًا): كابل USB-C مدمج ثنائي الاتجاه + منفذ USB-C منفصل + USB-A. منفرد مُدرج 22.5 واط (5V/3A · 9V/2.22A · 10V/2.25A)؛ سقف متعدد المنافذ 15 واط مشترك. الذروات: 21.7 واط منفذ USB-C · 21.4 واط مسار الكابل (AVHzY بفارق <1.4%). فئة هاتف فقط — **لا** PDO 20 فولت على العيّنة CV-PB-A110D-001.',
            'حساب الهاتف من الـWh المقاسة: iPhone 15 ≈ 2.18 شحنة تقديرية (31.1 ÷ (12.99 × 1.10))؛ iPhone 16 ≈ 2.08؛ Galaxy A54 ≈ 1.48؛ iPhone 15 Pro Max ≈ 1.65. إعادة شحن ذاتي 0→100% = 2 س 58 د عند دخل USB-C ~20 واط (انكر تذكر ~3 س).',
            'صدق A/B: مقابل الشقيق A110E — نفس سقف 22.5 واط (ذروة A110E 21.5 واط) لكن A110E يضاعف الطاقة (62.0Wh / 394 ج / 27.8 ملم) مقابل A110D (31.1Wh / 231 ج / 15.5 ملم). مقابل Joyroom JR-T012 — Wh شبه متعادلة (30.8Wh) لكن JR-T012 USB-A مزدوج ~10.2 واط بلا خرج USB-C؛ «22.5 واط PD» في قوائم JR-T012 علم أحمر — A110D هو حجر USB-C 22.5 واط الحقيقي.',
            'الاستدعاء / الطيران (فُحص 2026-07-24): **غير** مُستدعى — anker.com/product-recalls + cpsc.gov؛ خارج A1257/A1263/A1647/A1652/A1681/A1689. 37Wh << حد المقصورة 100Wh — مصر للطيران / النيل / إير كايرو / الإمارات / فلاي دبي / التركية / القطرية / السعودية مقصورة OK؛ الإمارات/فلاي دبي تحظران الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025. اشترِ للمترو النحيف + الكابل المدمج، لا لـ PD لابتوب.',
        ],
    },
    localContext: {
        en:
            'A110D answers the Egyptian buyer question: "I want one slim brick with a built-in cable for metro, campus, and Sahel day trips — I do NOT need laptop charging, and I refuse marketplace 22.5W theatre on USB-A-only packs." ' +
            'Eight scenarios from measured 31.1Wh + real 22.5W USB-C. RIGHT FOR: ' +
            '(1) UNIVERSITY STUDENT (AUC / GUC / Cairo University) on Metro Line 3 or daily microbus: built-in USB-C means no forgotten cable at the gate; 31.1Wh ≈ est. 2.18 iPhone 15 charges (31.1 ÷ (12.99 × 1.10)) — long study day + overnight top-up. ' +
            '(2) UBER / CAREEM / inDrive DRIVER: 21.7W USB-C refills a depleted iPhone 15 or Galaxy A-series in ~90 min while waiting at Tahrir or New Cairo; USB-A handles a second passenger phone inside the 15W shared multiport ceiling. ' +
            '(3) SAHEL / MARINA DAY TRIP (not multi-day): 37Wh flies free under 100Wh; 15.5 mm fits a beach-bag side pocket; phone + earbuds + one friend via built-in cable + USB-C + USB-A. For Fri–Sun couple sharing without sockets, step up to A110E (62.0Wh). ' +
            '(4) LOAD-SHEDDING PHONE-ONLY (30–60 min summer cut): one phone at ~10W → est. ~3.1 h messaging/data from 31.1Wh — covers a typical Cairo outage. ' +
            '(5) BUYER ESCAPING JR-T012 “22.5W” LISTINGS: same ~31Wh class, but A110D delivers measured 21.7W USB-C + built-in cable; JR-T012 peaks ~10.2W USB-A only — pay Anker when you need the real rail. ' +
            '(6) SECOND CARRY behind a home A1336 / wall brick — pocketable leave-the-house unit. ' +
            'WRONG FOR: (7) MACBOOK / WINDOWS USB-C LAPTOP — no 20V PDO; 22.5W trickles unusably. Pick A1336 (100W) or ≥30W laptop-class. ' +
            '(8) GALAXY ULTRA 45W SFC 2.0 CHASER — PPS caps at 10V/2.25A; Ultra falls back to 25W SFC. ' +
            '(9) MULTI-DAY OFF-GRID without recharge — 31.1Wh is one heavy phone day; A110E doubles energy at the same wattage. ' +
            '(10) IN-FLIGHT USE ON EMIRATES / FLYDUBAI — banned since 1 Oct 2025; cabin carry only. ' +
            'HEAT: Cairo July–August daily high ~35°C (WeatherSpark). Sample hit 39.8°C surface at ~22W after 15 min at 28.4°C ambient — warm but holdable, under §7.3 45°C flag; never leave on a parked-car dashboard (>60°C interior). ' +
            'AIRLINE: 37Wh << 100Wh — major Cairo carriers cabin OK; never checked baggage. ' +
            'AUTHENTICITY / RECALL: A110D outside Anker 2024–2025 power-bank recalls; still verify UN38.3 / CE / FCC + MPN (A110D / A110D-P11 / A110DH11). ' +
            'ELECTRICITY: recharging 37Wh at ~20W ≈ 0.043 kWh ≈ 3–8 piastres on EgyptERA Sept-2024 tiers — NOT an AC system-efficiency % (no PZEM; §6.7).',
        ar:
            'A110D يجيب على سؤال المشتري المصري: "أريد حزمة نحيفة بكابل مدمج للمترو والجامعة ويوم الساحل — **لا** أحتاج شحن لابتوب، وأرفض مسرح 22.5 واط في قوائم USB-A فقط." ' +
            'ثمانية سيناريوهات من 31.1Wh المقاسة + USB-C حقيقي 22.5 واط. مناسب لـ: ' +
            '(1) طالب جامعي (AUC / GUC / جامعة القاهرة) على مترو الخط 3 أو ميكروباص: كابل USB-C المدمج يعني لا نسيان كابل عند البوابة؛ 31.1Wh ≈ تقديري 2.18 شحنة iPhone 15 — يوم دراسة طويل + تعبئة ليلية. ' +
            '(2) سائق Uber / Careem / inDrive: 21.7 واط USB-C يعيد iPhone 15 أو Galaxy A-series من فارغ في ~90 دقيقة أثناء الانتظار في التحرير أو التجمع؛ USB-A يخدم هاتف راكب ثانٍ ضمن سقف 15 واط مشترك. ' +
            '(3) يوم ساحل / مارينا (وليس عطلة متعددة الأيام): 37Wh يسافر مجانًا تحت 100Wh؛ 15.5 ملم يناسب جيب حقيبة الشاطئ. لجمعة–أحد بلا مقابس انتقل إلى A110E (62.0Wh). ' +
            '(4) انقطاع كهرباء للهاتف فقط (30–60 د صيفًا): هاتف ~10 واط → تقديري ~3.1 س رسائل/بيانات من 31.1Wh. ' +
            '(5) مشتري يهرب من قوائم JR-T012 «22.5 واط»: نفس فئة ~31Wh، لكن A110D يقدّم 21.7 واط USB-C مقاسة + كابل مدمج؛ JR-T012 ذروة ~10.2 واط USB-A فقط. ' +
            '(6) حمل ثانٍ خلف A1336 / شاحن حائط في البيت — وحدة الخروج الجيبية. ' +
            'غير مناسب لـ: (7) MacBook / لابتوب Windows USB-C — **لا** PDO 20 فولت. اختر A1336 (100 واط) أو حزمة لابتوب ≥30 واط. ' +
            '(8) طالب Galaxy Ultra 45W SFC 2.0 — PPS يتوقف عند 10V/2.25A؛ يرتد إلى 25W SFC. ' +
            '(9) تخييم متعدد الأيام بلا إعادة شحن — 31.1Wh يوم هاتف ثقيل؛ A110E يضاعف الطاقة بنفس الواط. ' +
            '(10) الاستخدام أثناء الرحلة على الإمارات / فلاي دبي — ممنوع منذ 1 أكتوبر 2025؛ حمل مقصورة فقط. ' +
            'الحرارة: متوسط العظمى في القاهرة يوليو–أغسطس ~35°م (WeatherSpark). العيّنة بلغت 39.8°م عند ~22 واط بعد 15 د عند 28.4°م محيط — دافئة لكن قابلة للإمساك، تحت علامة §7.3 عند 45°م؛ لا تتركها على تابلوه سيارة متوقفة (داخل >60°م). ' +
            'الطيران: 37Wh << 100Wh — مقصورة OK على شركات القاهرة الكبرى؛ ليس في الأمتعة المسجّلة. ' +
            'الأصالة / الاستدعاء: A110D خارج استدعاءات باوربانك انكر 2024–2025؛ ما زال تحقق UN38.3 / CE / FCC وMPN (A110D / A110D-P11 / A110DH11). ' +
            'الكهرباء: إعادة شحن 37Wh بدخل ~20 واط ≈ 0.043 كيلوواط·ساعة ≈ 3–8 قروش على شرائح EgyptERA سبتمبر 2024 — **ليست** نسبة كفاءة منظومة AC (بلا PZEM؛ §6.7).',
    },
    specifications: {
        'Model': { en: 'Anker Zolo 10,000mAh Power Bank with Built-in USB-C Cable (A110D; retail may print A110D-P11 / A110DH11)', ar: 'انكر Zolo باور بانك 10,000 مللي أمبير مع كابل USB-C مدمج (A110D؛ التجزئة قد تطبع A110D-P11 / A110DH11)' },
        'Cell Capacity (§8)': { en: '10,000mAh / 37Wh — 5,000mAh × 2 series @ 7.4VDC (Anker) ≡ 10,000mAh × 3.7V ÷ 1000 (§7.3 / §8)', ar: '10,000 مللي أمبير / 37Wh — 5,000 × 2 على التوالي @ 7.4VDC (انكر) ≡ 10,000 × 3.7 ÷ 1000 (§7.3 / §8)' },
        'Usable Energy (CairoVolt measured)': { en: '31.1Wh on USB-C at 5V/2A constant discharge (~84.1% of 37Wh — §7.3 80–90% band)', ar: '31.1Wh على USB-C بتفريغ ثابت 5V/2A (نحو 84.1% من 37Wh — نطاق §7.3 80–90%)' },
        '5V-referred capacity (§8)': { en: '~6,220mAh at 5V (31.1Wh ÷ 5V) — explains why “10,000mAh” ≠ 10,000mAh at USB', ar: 'نحو 6,220 مللي أمبير عند 5V (31.1Wh ÷ 5V) — يوضح لماذا «10,000 مللي أمبير» ≠ 10,000 عند USB' },
        'Built-in USB-C Cable': { en: 'Bidirectional — charges the pack and delivers power; CairoVolt measured 21.4W peak through cable path', ar: 'ثنائي الاتجاه — يشحن الحزمة ويغذّي الأجهزة؛ قِسنا 21.4 واط ذروة عبر مسار الكابل' },
        'USB-C Port (separate)': { en: 'Up to 22.5W single-port — 5V/3A · 9V/2.22A · 10V/2.25A; measured peak 21.7W; NO 20V PDO on our sample', ar: 'حتى 22.5 واط منفرد — 5V/3A · 9V/2.22A · 10V/2.25A؛ ذروة مقاسة 21.7 واط؛ **لا** PDO 20 فولت على عيّنتنا' },
        'USB-A Port': { en: 'Shared multiport output — 5V/3A (15W max combined with other ports per Anker)', ar: 'خرج متعدد المنافذ مشترك — 5V/3A (15 واط كحد أقصى مشترك مع المنافذ الأخرى وفق انكر)' },
        'Multiport Ceiling': { en: '15W max shared (5V/3A) when more than one output active', ar: '15 واط كحد أقصى مشترك (5V/3A) عند تفعيل أكثر من خرج' },
        'What “22.5W” means here (§11 red-flag)': { en: 'SUPPORTED and measured on CV-PB-A110D-001 (21.7W / 21.4W). Contrast: Joyroom JR-T012 marketplace “22.5W PD” is UNSUPPORTED — that SKU is dual USB-A ~10W only. Do not transfer JR-T012 listing errors onto A110D, or A110D wattage onto JR-T012.', ar: 'مدعوم ومقاس على CV-PB-A110D-001 (21.7 / 21.4 واط). التباين: «22.5 واط PD» في قوائم Joyroom JR-T012 غير مدعوم — ذلك الـSKU USB-A مزدوج ~10 واط فقط. لا تنقل أخطاء قوائم JR-T012 إلى A110D ولا واط A110D إلى JR-T012.' },
        'How A110D differs from sibling A110E': { en: 'A110D = 37Wh / 31.1Wh measured, 231g, 15.5 mm, metro pocket. A110E = 74Wh / 62.0Wh measured, 394g, 27.8 mm, same 22.5W ceiling (peak 21.5W). Energy doubles; wattage does not. Pick A110D for daily slim carry; A110E for Sahel / multi-device weekends.', ar: 'A110D = 37Wh / 31.1Wh مقاسة، 231 ج، 15.5 ملم، جيب مترو. A110E = 74Wh / 62.0Wh مقاسة، 394 ج، 27.8 ملم، نفس سقف 22.5 واط (ذروة 21.5 واط). الطاقة تتضاعف؛ الواط لا. اختر A110D للحمل النحيف اليومي؛ A110E لعطل الساحل / أجهزة متعددة.' },
        'How A110D differs from Joyroom JR-T012': { en: 'Near-tied usable Wh (31.1 vs 30.8). A110D = real 22.5W USB-C + built-in cable + ActiveShield lineage, NOT recalled. JR-T012 = dual USB-A ~10.5W shared, USB-C input only, no PD/PPS. Pay Anker for cable + real speed; pay Joyroom for bare dual-A capacity.', ar: 'Wh قابلة للاستخدام شبه متعادلة (31.1 مقابل 30.8). A110D = USB-C حقيقي 22.5 واط + كابل مدمج + سلالة ActiveShield، غير مُستدعى. JR-T012 = USB-A مزدوج ~10.5 واط مشترك، USB-C دخل فقط، بلا PD/PPS. ادفع انكر للكابل + السرعة الحقيقية؛ وادفع جوي روم لسعة USB-A العارية.' },
        'How A110D differs from Anker Prime A1336': { en: 'A110D = 37Wh, 22.5W phone-class, built-in cable, slim Zolo. A1336 = 72Wh, dual 100W USB-C (200W combined), smart LCD, laptop-capable. Pick A110D for daily phone carry; A1336 for MacBook / dual-device 100W workflows.', ar: 'A110D = 37Wh، 22.5 واط فئة هاتف، كابل مدمج، Zolo نحيف. A1336 = 72Wh، USB-C مزدوج 100 واط (200 واط مشترك)، شاشة LCD، قادر على اللابتوب. اختر A110D للحمل اليومي للهاتف؛ وA1336 لـ MacBook / سير عمل 100 واط لجهازين.' },
        'Input / Self-recharge': { en: 'USB-C up to 20W; Anker lists ~3 h; CairoVolt measured 2 h 58 min 0→100% at ~20W', ar: 'USB-C حتى 20 واط؛ انكر تذكر ~3 ساعات؛ قِسنا 2 س 58 د 0→100% عند ~20 واط' },
        'Display': { en: 'Digital LED — estimated battery % (estimates, not a lab instrument)', ar: 'LED رقمية — نسبة بطارية تقديرية (تقديرات، وليست أداة معمل)' },
        'Weight': { en: 'Anker lists 229g; CairoVolt measured 231g on a 0.01g scale', ar: 'انكر تُدرج 229 جرامًا؛ قِست CairoVolt 231 جرامًا على ميزان 0.01 جرام' },
        'Dimensions': { en: '140.7 × 71.7 × 15.4 mm (Anker) — CairoVolt caliper 140.8 × 71.8 × 15.5 mm', ar: '140.7 × 71.7 × 15.4 ملم (انكر) — قدمة CairoVolt 140.8 × 71.8 × 15.5 ملم' },
        'Airline': { en: '37Wh << 100Wh cabin — EgyptAir / Nile Air / Air Cairo / Emirates / Flydubai / Turkish / Qatar / Saudia carry-on OK; Emirates/Flydubai no in-flight USE since 1 Oct 2025', ar: '37Wh << حد المقصورة 100Wh — مسموح مقصورة على مصر للطيران / النيل / إير كايرو / الإمارات / فلاي دبي / التركية / القطرية / السعودية؛ الإمارات/فلاي دبي ممنوع الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025' },
        'Safety / Recall (verified 2026-07-24)': { en: 'ActiveShield 3.0 (Anker-listed). NOT RECALLED — anker.com/product-recalls + cpsc.gov 2026-07-24. Anker 2024–2025 recalls A1257/A1263/A1647/A1652/A1681/A1689 do NOT include A110D. Verify UN38.3 / CE / FCC on the delivered unit.', ar: 'ActiveShield 3.0 (مدرج من انكر). لا يوجد استدعاء — anker.com/product-recalls + cpsc.gov 2026-07-24. استدعاءات انكر 2024–2025 A1257/A1263/A1647/A1652/A1681/A1689 **لا** تشمل A110D. تحقق من UN38.3 / CE / FCC على الوحدة المستلمة.' },
        'In the Box': { en: 'Power bank with integrated cable + quick-start (verify live package contents)', ar: 'الباور بانك مع الكابل المدمج + دليل سريع (تحقق من محتويات العبوة الحالية)' },
        'Protocol': { en: 'CairoVolt Bench Test Protocol §7.3 (power banks) + §8 Wh physics gates + §11 red-flag checklist', ar: 'بروتوكول اختبار كايرو فولت §7.3 (باور بانك) + بوابات فيزياء Wh §8 + قائمة الأعلام الحمراء §11' },
    },
    benchTest: {
        sku: 'A110D',
        sampleId: 'CV-PB-A110D-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'ELEVATED §7.3 gold deepen — one retail-stock unit · CairoVolt lab, New Cairo · ambient 28.4°C (HTC-2) · humidity 46% RH · mains 221V (UT61E) · wall recharge via Anker Nano II A2664 30W (~20W-class negotiated) · same-lab A/B anchors vs A110E (CV-PB-A110E-001) and JR-T012 (CV-PB-JRT012-001) as disclosure only',
            ar: 'تعميق ذهب §7.3 — وحدة تجزئة واحدة · مختبر كايرو فولت، القاهرة الجديدة · محيط 28.4°م (HTC-2) · رطوبة 46% · جهد الحائط 221 فولت (UT61E) · إعادة شحن عبر Anker Nano II A2664 30W (تفاوض فئة ~20 واط) · مراسي A/B من نفس المختبر مقابل A110E وJR-T012 كإفصاح فقط',
        },
        methodology: {
            en:
                'ELEVATED gold-depth power-bank bench per protocol §7.3 with §8 Wh physics and §11 red-flag gates. CRITICAL: instrument THIS sealed A110D sample CV-PB-A110D-001 — do NOT copy A110E 62.0Wh / 21.5W or JR-T012 30.8Wh / 10.2W rows as this product\'s numbers. Sibling figures appear only as A/B disclosure. ' +
                'Preserved measured truths from the first protocol-grade pass (31.1Wh, 21.7W / 21.4W peaks, 2 h 58 min recharge, 39.8°C, 231g). ' +
                '(1) Photographed printed I/O + Wh label — 37Wh / 10,000mAh class, 22.5W USB-C table, ActiveShield marks. ' +
                '(2) §8 nominal math: Wh_cell = 5,000mAh × 2 × 7.4V ÷ 1000 = 37Wh (≡ 10,000mAh × 3.7V ÷ 1000). ' +
                '(3) FNB58 PD enumeration on separate USB-C port AND built-in cable path: fixed rails to 10V/2.25A (22.5W class) — NO 20V PDO. This is the §11 honesty gate vs JR-T012 marketplace “22.5W PD” claims (that SKU has no such rail). ' +
                '(4) Full charge via USB-C from ~20W wall source, 30 min rest, discharge separate USB-C @ constant 5V/2A into JUWEI → FNB58 cumulative usable = 31.1Wh. Efficiency = 31.1 ÷ 37 = 84.1% (inside §7.3 80–90% band). 5V-referred mAh = 31.1 ÷ 5 = 6,220mAh. AVHzY CT-3 cross-check within 1.4% on peaks / Wh. ' +
                '(5) Peak wattage: USB-C port 21.7W; built-in cable path 21.4W (cable IR drop, not a fault). Multiport shared ceiling ~14.8W combined. ' +
                '(6) Real-device: iPhone 15 full cycles until cut-out; Galaxy A54 25W SFC via 9V PPS; MacBook Air M2 plug-in → 5V/1.5A trickle only (not useful). ' +
                '(7) Self-recharge 0→100% timed at ~20W = 2 h 58 min. Surface temp BENETECH GM320 (ε=0.95) after 15 min @~22W = 39.8°C. Weight/dims on Kkmoon 0.01g + Mitutoyo. ' +
                '(8) RECALL gate 2026-07-24: anker.com/product-recalls + cpsc.gov — A110D outside A1257/A1263/A1647/A1652/A1681/A1689. ' +
                'A/B Wh/peak anchors from separate CairoVolt sheets: A110E 62.0Wh / 21.5W · JR-T012 30.8Wh / 10.2W. ' +
                'HONEST GAPS: no PZEM AC-input (no system efficiency % per §6.7); no 20V/45W Ultra rails to test (absent by design); single unit — batches / A110D-P11 / A110DH11 may vary. Phone counts marked "est." use 31.1 ÷ (device Wh × 1.10 path loss).',
            ar:
                'قياس عمق ذهبي مرتفع لباور بانك وفق البروتوكول §7.3 مع بوابات فيزياء Wh §8 والأعلام الحمراء §11. حرج: قِس عيّنة A110D المغلقة CV-PB-A110D-001 — **لا** تنسخ صفوف A110E 62.0Wh / 21.5 واط أو JR-T012 30.8Wh / 10.2 واط كأرقام هذا المنتج. أرقام الأشقاء تظهر فقط كإفصاح A/B. ' +
                'الحقائق المقاسة من المرور البروتوكولي الأول محفوظة (31.1Wh، ذروات 21.7 / 21.4 واط، إعادة شحن 2 س 58 د، 39.8°م، 231 ج). ' +
                '(1) صوّرنا جدول I/O وملصق Wh — فئة 37Wh / 10,000 مللي أمبير، جدول USB-C 22.5 واط، علامات ActiveShield. ' +
                '(2) حساب §8 الاسمي: Wh_الخلية = 5,000 × 2 × 7.4 ÷ 1000 = 37Wh (≡ 10,000 × 3.7 ÷ 1000). ' +
                '(3) إحصاء PD بـ FNB58 على منفذ USB-C ومسار الكابل المدمج: بروتوكولات ثابتة حتى 10V/2.25A (فئة 22.5 واط) — **لا** PDO 20 فولت. هذه بوابة صدق §11 مقابل ادعاءات «22.5 واط PD» في قوائم JR-T012 (ذلك الـSKU بلا هذا الرافد). ' +
                '(4) شحن كامل عبر USB-C من مصدر ~20 واط، راحة 30 د، تفريغ USB-C المنفصل عند 5V/2A ثابت داخل JUWEI → Wh تراكمية = 31.1Wh. الكفاءة = 31.1 ÷ 37 = 84.1% (ضمن نطاق §7.3 80–90%). مللي أمبير مكافئ عند 5V = 31.1 ÷ 5 = 6,220. تحقق AVHzY CT-3 بفارق <1.4% على الذروات / Wh. ' +
                '(5) ذروة الواط: منفذ USB-C 21.7 واط؛ مسار الكابل 21.4 واط (فقد IR وليس عيبًا). سقف متعدد المنافذ ~14.8 واط مشترك. ' +
                '(6) أجهزة حقيقية: دورات iPhone 15؛ Galaxy A54 25W SFC عبر PPS 9 فولت؛ MacBook Air M2 → تنقيط 5V/1.5A فقط (غير مفيد). ' +
                '(7) إعادة شحن ذاتي 0→100% عند ~20 واط = 2 س 58 د. حرارة السطح GM320 بعد 15 د عند ~22 واط = 39.8°م. الوزن/الأبعاد على Kkmoon + Mitutoyo. ' +
                '(8) بوابة الاستدعاء 2026-07-24: anker.com/product-recalls + cpsc.gov — A110D خارج A1257/A1263/A1647/A1652/A1681/A1689. ' +
                'مراسي A/B Wh/ذروة من صحائف منفصلة: A110E 62.0Wh / 21.5 واط · JR-T012 30.8Wh / 10.2 واط. ' +
                'الفجوات الأمينة: لا PZEM لدخل AC (فلا كفاءة منظومة وفق §6.7)؛ لا رافدات 20V/45W Ultra للاختبار (غائبة بالتصميم)؛ وحدة واحدة — قد تختلف الدفعات / A110D-P11 / A110DH11. أعداد الشحن "تقديري" من 31.1 ÷ (Wh الجهاز × 1.10 فقد المسار).',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Cumulative Wh logging + PD enumeration proving real 22.5W-class rails (no 20V) on port and built-in cable', ar: 'تسجيل Wh تراكمي + إحصاء PD يثبت رافدات فئة 22.5 واط الحقيقية (بلا 20V) على المنفذ والكابل المدمج' } },
            { name: 'AVHzY CT-3', use: { en: 'Second-instrument cross-check of usable Wh and 22.5W-class peaks (within 1.4%)', ar: 'تحقق مزدوج لـWh القابلة للاستخدام وذروات فئة 22.5 واط (بفارق <1.4%)' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant 5V/2A discharge for the 31.1Wh usable figure', ar: 'تفريغ ثابت 5V/2A لرقم 31.1Wh القابل للاستخدام' } },
            { name: 'Anker Nano II A2664 30W wall charger', use: { en: '~20W-class self-recharge source (matches Anker 20W input table)', ar: 'مصدر إعادة شحن ذاتي فئة ~20 واط (يطابق جدول دخل انكر 20 واط)' } },
            { name: 'Apple iPhone 15 (12.99Wh) + Samsung Galaxy A54', use: { en: 'Real-device phone charge cycles + PPS / SFC handshake', ar: 'دورات شحن هاتف حقيقية + مصافحة PPS / SFC' } },
            { name: 'Apple MacBook Air M2 (52.6Wh)', use: { en: 'Laptop plug-in attempt — confirms no useful 20V PD (§11 red-flag vs laptop marketing)', ar: 'محاولة توصيل لابتوب — تؤكد عدم وجود PD 20 فولت مفيد (علم أحمر §11 مقابل تسويق لابتوب)' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temperature under ~22W load after 15 min', ar: 'حرارة السطح تحت حمل ~22 واط بعد 15 د' } },
            { name: 'HTC-2 · UT61E · Kkmoon 0.01g scale · Mitutoyo caliper', use: { en: 'Ambient/humidity, mains V, weight, dimensions', ar: 'المحيط/الرطوبة وجهد الحائط والوزن والأبعاد' } },
        ],
        results: [
            { param: { en: 'Rated cell capacity (§8)', ar: 'سعة الخلايا الاسمية (§8)' }, rated: '10,000mAh / 37Wh', measured: '—', note: { en: '5,000mAh × 2 series @ 7.4VDC = 37Wh (Anker + §7.3 / §8)', ar: '5,000 × 2 على التوالي @ 7.4VDC = 37Wh (انكر + §7.3 / §8)' } },
            { param: { en: 'Usable energy — USB-C @5V/2A (PRIMARY)', ar: 'الطاقة المُخرَجة — USB-C @5V/2A (أساسي)' }, measured: '31.1 Wh', note: { en: 'FNB58 cumulative after full charge + 30 min rest; AVHzY within 1.4%', ar: 'FNB58 تراكمي بعد شحن كامل + راحة 30 د؛ AVHzY بفارق <1.4%' } },
            { param: { en: 'Cell → USB conversion ratio', ar: 'نسبة تحويل خلية → USB' }, measured: '84.1%', note: { en: '31.1 ÷ 37 — inside §7.3 80–90% band; NOT an AC system efficiency (§6.7)', ar: '31.1 ÷ 37 — ضمن نطاق §7.3 80–90%؛ **ليست** كفاءة منظومة AC (§6.7)' } },
            { param: { en: '5V-referred capacity (§8)', ar: 'سعة مكافئة عند 5V (§8)' }, measured: { en: '~6,220 mAh at 5V', ar: 'نحو 6,220 مللي أمبير عند 5V' }, note: { en: '31.1Wh ÷ 5V — post-conversion figure, not cell mAh', ar: '31.1Wh ÷ 5V — رقم ما بعد التحويل وليس مللي أمبير الخلايا' } },
            { param: { en: 'USB-C port peak (10V/2.25A class)', ar: 'ذروة منفذ USB-C (فئة 10V/2.25A)' }, rated: '22.5W', measured: '21.7W', note: { en: 'FNB58; AVHzY CT-3 within 1.4% — REAL 22.5W class (≥96% of label)', ar: 'FNB58؛ AVHzY CT-3 بفارق <1.4% — فئة 22.5 واط حقيقية (≥96% من الملصق)' } },
            { param: { en: 'Built-in cable path peak', ar: 'ذروة مسار الكابل المدمج' }, rated: '22.5W class', measured: '21.4W', note: { en: 'Slightly lower than separate port — cable IR drop, not a fault', ar: 'أقل قليلًا من المنفذ المنفصل — فقد IR في الكابل وليس عيبًا' } },
            { param: { en: '20V PDO presence (§11 red-flag)', ar: 'وجود PDO 20 فولت (علم أحمر §11)' }, measured: { en: 'NOT present — no laptop PD', ar: '**غير** موجود — لا PD للابتوب' }, note: { en: 'MacBook Air M2 fell back to 5V/1.5A trickle; reject any “laptop power bank” framing for A110D', ar: 'MacBook Air M2 ارتد إلى تنقيط 5V/1.5A؛ ارفض أي تأطير «باور بانك لابتوب» لـ A110D' } },
            { param: { en: 'PD / PPS advertisement (honest)', ar: 'إعلان PD / PPS (أمين)' }, measured: { en: 'Fixed rails to 10V/2.25A + 9V PPS class for 25W SFC phones', ar: 'بروتوكولات ثابتة حتى 10V/2.25A + فئة PPS 9V لهواتف 25W SFC' }, note: { en: 'Confirms real 22.5W envelope — contrast JR-T012 5V-only USB-A', ar: 'يؤكّد ظرف 22.5 واط الحقيقي — تباين مع JR-T012 USB-A 5V فقط' } },
            { param: { en: 'Multiport shared ceiling', ar: 'السقف المشترك متعدد المنافذ' }, rated: '15W (5V/3A)', measured: { en: '~14.8W combined (built-in + USB-A)', ar: 'نحو 14.8 واط مشترك (مدمج + USB-A)' }, note: { en: 'Anker multiport table — phone-class only; not 3× 22.5W', ar: 'جدول انكر متعدد المنافذ — فئة هاتف فقط؛ ليس 3× 22.5 واط' } },
            { param: { en: 'Galaxy A54 (25W SFC) — measured handshake', ar: 'Galaxy A54 (25W SFC) — مصافحة مقاسة' }, measured: { en: '25W-class PPS via 9V', ar: 'فئة 25 واط PPS عبر 9 فولت' }, note: { en: '10V PPS ceiling sufficient for base/mid Samsung; Ultra 45W will NOT engage', ar: 'سقف PPS 10 فولت كافٍ لسامسونج القاعدي/المتوسط؛ Ultra 45 واط **لن** يشتغل' } },
            { param: { en: 'Self-recharge 0→100% @ ~20W', ar: 'إعادة الشحن الذاتي 0→100% عند ~20 واط' }, rated: { en: 'Anker: ~3 h at 20W', ar: 'انكر: ~3 ساعات عند 20 واط' }, measured: { en: '2 h 58 min', ar: '2 س 58 د' }, note: { en: 'Matches Anker claim; faster than JR-T012 3 h 55 min @ ~10W input', ar: 'يطابق ادعاء انكر؛ أسرع من JR-T012 3 س 55 د بدخل ~10 واط' } },
            { param: { en: 'iPhone 15 (12.99Wh) — est. charges', ar: 'iPhone 15 (12.99Wh) — شحنات تقديرية' }, measured: '~2.18', note: { en: '31.1 ÷ (12.99 × 1.10); phone caps ~20W wired — MacRumors 2023', ar: '31.1 ÷ (12.99 × 1.10)؛ الهاتف يتوقف عند نحو 20 واط سلكي — MacRumors 2023' } },
            { param: { en: 'iPhone 15 Pro Max (17.11Wh) — est.', ar: 'iPhone 15 Pro Max (17.11Wh) — تقديري' }, measured: '~1.65', note: { en: '31.1 ÷ (17.11 × 1.10)', ar: '31.1 ÷ (17.11 × 1.10)' } },
            { param: { en: 'Galaxy A54 (19.05Wh) — est. charges', ar: 'Galaxy A54 (19.05Wh) — شحنات تقديرية' }, measured: '~1.48', note: { en: '31.1 ÷ (19.05 × 1.10)', ar: '31.1 ÷ (19.05 × 1.10)' } },
            { param: { en: 'iPhone 16 (13.62Wh) — est. charges', ar: 'iPhone 16 (13.62Wh) — شحنات تقديرية' }, measured: '~2.08', note: { en: '31.1 ÷ (13.62 × 1.10)', ar: '31.1 ÷ (13.62 × 1.10)' } },
            { param: { en: 'Surface temp @~22W discharge (15 min)', ar: 'حرارة السطح عند ~22 واط تفريغ (15 د)' }, measured: '39.8°C', note: { en: '28.4°C ambient — warm/holdable; under §7.3 45°C flag; cooler than A110E 41.2°C', ar: 'محيط 28.4°م — دافئ/قابل للإمساك؛ تحت علامة §7.3 عند 45°م؛ أبرد من A110E 41.2°م' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '229g (Anker)', measured: '231g', note: { en: 'Kkmoon 0.01g — within 2g of Anker; ~163g lighter than A110E 394g', ar: 'Kkmoon 0.01 ج — ضمن 2 ج من انكر؛ أخف بنحو 163 ج من A110E 394 ج' } },
            { param: { en: 'Dimensions', ar: 'الأبعاد' }, rated: '140.7×71.7×15.4 mm', measured: '140.8×71.8×15.5 mm', note: { en: 'Mitutoyo — slim metro profile vs A110E 27.8 mm / JR-T012 16.3 mm', ar: 'Mitutoyo — مقطع مترو نحيف مقابل A110E 27.8 ملم / JR-T012 16.3 ملم' } },
            { param: { en: 'Airline Wh rating', ar: 'تصنيف Wh للطيران' }, rated: '37Wh', measured: { en: '37Wh label legible — << 100Wh cabin limit', ar: 'ملصق 37Wh مقروء — << حد المقصورة 100Wh' }, note: { en: 'Carry-on OK; Emirates/Flydubai no in-flight USE since 1 Oct 2025', ar: 'مسموح مقصورة؛ الإمارات/فلاي دبي ممنوع الاستخدام أثناء الرحلة منذ 1 أكتوبر 2025' } },
            { param: { en: 'Recall status (verified 2026-07-24)', ar: 'حالة الاستدعاء (متحققة 2026-07-24)' }, measured: { en: 'NOT recalled', ar: 'غير مُستدعى' }, note: { en: 'A110D outside Anker power-bank recalls A1257/A1263/A1647/A1652/A1681/A1689', ar: 'A110D خارج استدعاءات باوربانك انكر A1257/A1263/A1647/A1652/A1681/A1689' } },
            { param: { en: 'vs A110E usable Wh / peak W', ar: 'مقابل Wh / ذروة واط لـ A110E' }, measured: { en: '31.1Wh / 21.7W vs A110E 62.0Wh / 21.5W', ar: '31.1Wh / 21.7 واط مقابل A110E 62.0Wh / 21.5 واط' }, note: { en: 'Same 22.5W ceiling — A110E ≈2× energy, not a wattage upgrade', ar: 'نفس سقف 22.5 واط — A110E ≈ ضعف الطاقة وليس ترقية واط' } },
            { param: { en: 'vs JR-T012 usable Wh / peak W (§11)', ar: 'مقابل Wh / ذروة واط لـ JR-T012 (§11)' }, measured: { en: '31.1Wh / 21.7W vs JR-T012 30.8Wh / 10.2W', ar: '31.1Wh / 21.7 واط مقابل JR-T012 30.8Wh / 10.2 واط' }, note: { en: 'Near-tied Wh; A110D ~2× speed + built-in cable — JR-T012 “22.5W PD” listings are the red-flag trap', ar: 'Wh شبه متعادلة؛ A110D نحو ضعف السرعة + كابل مدمج — قوائم JR-T012 «22.5 واط PD» هي فخ العلم الأحمر' } },
        ],
        verdict: {
            en: 'A110D delivered 31.1Wh usable (84.1% of 37Wh) with real 22.5W-class peaks — 21.7W USB-C / 21.4W built-in cable. Honest slim metro brick: buy for measured speed + cable you cannot forget. Not a laptop tool (no 20V). vs A110E: half the energy, same wattage. vs JR-T012: same Wh class, ~2× watts. 37Wh flies free; not recalled.',
            ar: 'A110D أخرج 31.1Wh قابلة للاستخدام (84.1% من 37Wh) بذروات فئة 22.5 واط حقيقية — 21.7 واط USB-C / 21.4 واط كابل مدمج. حجر مترو نحيف بصدق: اشترِ للسرعة المقاسة + كابل لا يُنسى. ليس أداة لابتوب (بلا 20V). مقابل A110E: نصف الطاقة، نفس الواط. مقابل JR-T012: نفس فئة Wh، نحو ضعف الواط. 37Wh يسافر مجانًا؛ غير مُستدعى.',
        },
        pros: [
            { en: '31.1Wh measured usable at 84.1% cell→USB (31.1 ÷ 37) — physics-consistent with 37Wh; est. ~2.18 iPhone 15 charges from measured Wh', ar: '31.1Wh قابلة للاستخدام بنسبة خلية→USB 84.1% (31.1 ÷ 37) — متسقة مع 37Wh؛ تقديري ~2.18 شحنة iPhone 15 من الـWh المقاسة' },
            { en: 'REAL 22.5W USB-C confirmed — 21.7W port / 21.4W built-in cable; FNB58 saw 9V/10V rails (unlike JR-T012 5V-only theatre)', ar: 'USB-C حقيقي 22.5 واط مؤكّد — 21.7 واط منفذ / 21.4 واط كابل مدمج؛ FNB58 رأى رافدات 9V/10V (بخلاف مسرح JR-T012 5V فقط)' },
            { en: 'Built-in bidirectional USB-C cable — one less cable to lose on Metro Line 3 or campus; metro-slim 15.5 mm / 231g', ar: 'كابل USB-C مدمج ثنائي الاتجاه — كابل أقل يُفقد على مترو الخط 3 أو الجامعة؛ نحيف مترو 15.5 ملم / 231 ج' },
            { en: 'Self-recharge 0→100% in 2 h 58 min at ~20W — matches Anker ~3 h; practical overnight desk refill vs JR-T012 ~4 h @10W', ar: 'إعادة شحن ذاتي 0→100% في 2 س 58 د عند ~20 واط — يطابق ~3 س انكر؛ تعبئة ليلية عملية مقابل JR-T012 ~4 س عند 10 واط' },
            { en: '37Wh airline-friendly + NOT recalled (verified 2026-07-24) — outside A1257/A1263/A1647/A1652/A1681/A1689; Wh label legible', ar: '37Wh ودّي للطيران + غير مُستدعى (متحقق 2026-07-24) — خارج A1257/A1263/A1647/A1652/A1681/A1689؛ ملصق Wh مقروء' },
        ],
        limits: [
            { en: 'NO 20V PDO — cannot charge MacBook or Windows USB-C laptop usefully; 22.5W is phone-class only. Pick Anker Prime A1336 (100W) if laptop charging matters', ar: '**لا** PDO 20 فولت — لا يمكن شحن MacBook أو لابتوب Windows USB-C بفائدة؛ 22.5 واط فئة هاتف فقط. اختر Anker Prime A1336 (100 واط) إن كان شحن اللابتوب مهمًا' },
            { en: 'Multiport ceiling 15W shared — running built-in cable + USB-A + USB-C together throttles each port; fine for two phones, not three fast-charging devices', ar: 'سقف 15 واط مشترك متعدد المنافذ — تشغيل الكابل المدمج + USB-A + USB-C معًا يخفّض كل منفذ؛ مناسب لهاتفين وليس ثلاثة أجهزة بشحن سريع' },
            { en: '31.1Wh usable is one heavy phone day — not a multi-day Sahel trip without nightly recharge; sibling A110E doubles energy (62.0Wh) at the same 22.5W ceiling', ar: '31.1Wh قابلة للاستخدام = يوم هاتف ثقيل واحد — وليس رحلة ساحل متعددة الأيام بلا شحن ليلي؛ الشقيق A110E يضاعف الطاقة (62.0Wh) بنفس سقف 22.5 واط' },
            { en: 'Galaxy Ultra 45W SFC 2.0 will NOT activate — PPS caps at 10V; Ultra falls back to 25W SFC', ar: 'Galaxy Ultra 45W SFC 2.0 **لن** يُفعَّل — PPS يتوقف عند 10 فولت؛ الـUltra يرتد إلى 25W SFC' },
            { en: 'Emirates/Flydubai ban in-flight USE of power banks since 1 Oct 2025 — cabin carry only, no charging onboard those carriers', ar: 'الإمارات/فلاي دبي تحظران **استخدام** الباور بانك أثناء الرحلة منذ 1 أكتوبر 2025 — حمل مقصورة فقط، بلا شحن على متن تلك الشركات' },
            { en: 'ActiveShield 3.0 is an Anker vendor claim — CairoVolt confirmed 39.8°C surface behavior but did not independently verify firmware thresholds', ar: 'ActiveShield 3.0 ادعاء انكر — CairoVolt أكّدت سلوك السطح عند 39.8°م لكن لم تتحقق مستقلة من عتبات البرمجيات' },
            { en: 'Single unit tested — production batches and retail MPN variants (A110D-P11 / A110DH11) may vary marginally; no PZEM AC system % (§6.7)', ar: 'وحدة واحدة مُختبرة — قد تختلف دفعات الإنتاج ونسخ MPN التجزئة (A110D-P11 / A110DH11) بشكل هامشي؛ بلا نسبة منظومة AC عبر PZEM (§6.7)' },
        ],
    },
};
