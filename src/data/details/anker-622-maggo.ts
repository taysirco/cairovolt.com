// Details for: anker-622-maggo  (Anker 622 MagGo Magnetic Battery, model A1611)
// Lab sheet: CV-PB-A622-001 — elevated gold deepen, protocol §7.3 power banks + §7.6 MagSafe/Qi honesty.
// Wh basis: 5,000mAh × 3.7V = 18.5Wh nominal per BENCH-TEST-PROTOCOL §7.3 —
// NOT Anker's marketing 3.85V/19.25Wh LiPo basis. MagSafe-COMPATIBLE third-party honesty:
// measured wireless 7.3–7.5W on iPhone — reject inherited 15W Apple MagSafe marketing (that is 633 MagGo / Qi2-class).
// A/B sibling: Joyroom JR-W050 (37Wh / ~7.5W MagSafe-compatible / 232g). Engineer: Eng. Omar Khaled · 2026-07-24.
import type { ProductDetail } from './_types';

export const anker_622_maggo_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker 622 MagGo (A1611 / regional A1611011 / A1611012 / A1611031): 5,000mAh × 3.7V = 18.5Wh nominal — MagSafe-COMPATIBLE (Qi + magnets, NOT Apple MFM-certified, NOT Qi2). Wireless caps at 7.5W on iPhone and 5W on Qi Android per anker.com — reject any inherited 15W MagSafe claim; that is the newer 633 MagGo.',
            'CairoVolt elevated bench CV-PB-A622-001 (2026-07-24): 15.6Wh usable over USB-C at 5V/2A (~84.3% of 18.5Wh — inside protocol §7.3 80–90% band) and ~12.0Wh delivered wirelessly into a fully-drained iPhone 13 (cell→phone ~65%, §8 MagSafe band). Wired ≈1.1 iPhone 15 top-ups; wireless ≈0.8 — NOT a full wireless charge.',
            'USB-C bidirectional: rated 12W out (5V/2.4A), measured peak 11.8W; ~20W PD in — pack tops up in ~1 h 45 min from a 20W PD brick. Any quality 3A USB-C cable works; 5A E-marker NOT required. Wired peaks are SEPARATE from wireless 7.5W — do not conflate.',
            'vs Joyroom JR-W050: same MagSafe-compatible ~7.5W iPhone ceiling; JR-W050 ≈2× Wh (37 vs 18.5; 32.1Wh / ~24.0Wh measured vs 15.6 / ~12.0) but heavier (232g vs 143g) and thicker. Pick 622 for slim kickstand pocket carry; pick JR-W050 for day-long snap-on capacity.',
            'Airline 18.5Wh << 100Wh cabin — EgyptAir / Air Cairo / Nile / Emirates / Flydubai / Turkish / Qatar / Saudia with readable Wh label. Emirates + Flydubai ban USING power banks in-flight since 1 Oct 2025. NOT recalled — anker.com/product-recalls + cpsc.gov verified 2026-07-24 (A1611 outside A1257/A1263/A1647/A1652/A1681/A1689). Single retail unit tested.',
        ],
        ar: [
            'أنكر 622 MagGo (A1611 / الإقليمية A1611011 / A1611012 / A1611031): 5,000 مللي أمبير × 3.7 فولت = 18.5Wh اسميًا — **متوافق مع MagSafe** (Qi + مغناطيس، **ليس MFM معتمد من Apple**، **ليس Qi2**). الخرج اللاسلكي محصور بـ 7.5 واط على الآيفون و5 واط على Qi للأندرويد وفق anker.com — ارفض أي ادعاء 15 واط MagSafe موروث؛ فذلك هو 633 MagGo الأحدث.',
            'مختبر كايرو فولت المرتفع CV-PB-A622-001 (2026-07-24): 15.6Wh قابلة للاستخدام على USB-C عند 5V/2A (نحو 84.3% من 18.5Wh — ضمن نطاق §7.3 بين 80–90%) ونحو 12.0Wh مُسلَّمة لاسلكيًا داخل iPhone 13 مُفرَّغ تمامًا (خلية→هاتف ~65%، نطاق §8 MagSafe). السلكي ≈1.1 تعبئة iPhone 15؛ اللاسلكي ≈0.8 — **ليست** شحنة لاسلكية كاملة.',
            'USB-C ثنائي الاتجاه: خرج اسمي 12 واط (5V/2.4A)، ذروة مقاسة 11.8 واط؛ ~20 واط دخل PD — الحزمة تمتلئ في نحو 1 س و45 د من شاحن PD 20 واط. أي كابل USB-C 3A جيد يكفي؛ **لا** حاجة لـ 5A E-marker. ذروات السلكي **منفصلة** عن اللاسلكي 7.5 واط — لا تخلطهما.',
            'مقابل Joyroom JR-W050: نفس سقف MagSafe-compatible ~7.5 واط على الآيفون؛ JR-W050 ≈ ضعف الـWh (37 مقابل 18.5؛ 32.1Wh / ~24.0Wh مقاسة مقابل 15.6 / ~12.0) لكنه أثقل (232 ج مقابل 143 ج) وأسمن. اختر 622 لحمل جيب نحيف بحامل؛ واختر JR-W050 لسعة يوم كامل snap-on.',
            'الطيران 18.5Wh << حد المقصورة 100Wh — مصر للطيران / إير كايرو / النيل / الإمارات / فلاي دبي / التركية / القطرية / السعودية بملصق Wh مقروء. الإمارات + فلاي دبي تحظران **استخدام** الباور بانك أثناء الرحلة منذ 1 أكتوبر 2025. **لا استدعاء** — anker.com/product-recalls + cpsc.gov في 2026-07-24 (A1611 خارج A1257/A1263/A1647/A1652/A1681/A1689). وحدة تجزئة واحدة مُختبرة.',
        ],
    },
    localContext: {
        en:
            'The A1611 answers one narrow Egyptian question that classic wired packs cannot: "how do I top-up my iPhone WITHOUT a cable in my hand — and stay under 150g?" Eleven scenarios. ' +
            'RIGHT FOR: (1) BUSINESS MEETING in New Cairo / Nasr City / Zamalek — phone face-down on the table (etiquette-correct), MagGo sandwiched behind it, silent 7.5W trickle while you present; nothing wired does this cleanly. ' +
            '(2) UBER / CAREEM passenger-side iPhone on a magnetic dash mount — wireless CarPlay over Wi-Fi with no cable in the cupholder (fallback only; a dedicated MagSafe car charger like A2216 is still the right tool for drivers). ' +
            '(3) CAIRO METRO / TRAM — one hand on the phone, one on the ful/coffee, kickstand flipped on the seat tray for a 15-min video; 143g is bag-invisible. ' +
            '(4) FREELANCER at Smart Village / GrEEK Campus wanting ONE slim device for emergency wireless AND USB-C 12W out — enough for an earbud case, AirTag-adjacent gadget, or smartwatch drip. ' +
            '(5) TRAVELLER CAI→DXB / CAI→IST — 18.5Wh clears every cabin limit; seat-pocket carry; do NOT use in-flight on Emirates / Flydubai (ban since 1 Oct 2025). ' +
            '(6) BUYER WHO REJECTS 10K magnetic weight — vs Joyroom JR-W050 (232g / 37Wh), the 622 trades ~2× Wh for ~89g less mass and a true jeans-pocket profile. ' +
            'WRONG FOR: (7) GALAXY S24 ULTRA / S25 chasing 45W SFC 2.0 — no Samsung Fast Wireless profile; Galaxy falls back to plain Qi ~5W. ' +
            '(8) MACBOOK AIR / iPad Pro — USB-C out is 12W only; useless as a laptop feed. ' +
            '(9) ANYONE EXPECTING A FULL WIRELESS CHARGE for iPhone 15 / 16 Pro Max — wireless ≈0.8 / ≈0.6 of a full charge; use USB-C for honest full cycles. ' +
            '(10) 15W MagSafe expectation — that is 633 MagGo / Qi2-class, NOT the 622. ' +
            '(11) iPhone 11 / SE 2020 / SE 2022 — no magnet ring; MagGo slides; buy a wired A110D / A1263-class pack instead. ' +
            '(12) DAY-LONG SNAP-ON CAPACITY — pick JR-W050 (32.1Wh wired / ~24.0Wh wireless measured) when Wh beats slimness. ' +
            'HEAT: Cairo July shoulder-bag ambient 32–35°C pushes iPhone toward Apple\'s iOS thermal-throttle line at 35°C ambient (support.apple.com/118431) — pack finishes, but iOS may post "Charging On Hold." ' +
            'Bench at 28.1°C ambient: 44.5°C pack top / 41.6°C iPhone back after 15 min MagSafe 7.5W — under 50°C protocol hard flag, near phone-throttle envelope. Do NOT use on Sahel / Marina / Ras Sudr beach days, parked cars, or direct summer sun. ' +
            'ELECTRICITY: recharging 18.5Wh at ~20W PD pulls ~0.021 kWh at the wall; EgyptERA Sept-2024 tariff (through March 2026) ≈ 1.4–5.4 piastres per full recharge by tier — coffee-shop change. ' +
            'AUTHENTICITY: match carton A1611; do not confuse with recalled MagGo-family SKUs A1642/A1647/A1652.',
        ar:
            'يجيب A1611 على سؤال مصري ضيق لا تجيبه الباور بانك السلكية: "كيف أعبّئ آيفوني **بدون كابل في يدي** — وأبقى تحت 150 ج؟" أحد عشر سيناريو. ' +
            'مناسب لـ: (1) اجتماع عمل في التجمع / مدينة نصر / الزمالك — الهاتف قلبه لأسفل على الطاولة (آداب الاجتماع)، الـMagGo ملتصق خلفه، تعبئة صامتة 7.5 واط أثناء عرضك؛ لا شيء سلكي يفعل هذا بأناقة. ' +
            '(2) آيفون راكب أوبر / كريم على حامل تابلوه مغناطيسي — CarPlay لاسلكي عبر Wi-Fi بلا كابل في حامل الأكواب (احتياطي فقط؛ شاحن سيارة MagSafe مخصص مثل A2216 أفضل للسائقين). ' +
            '(3) مترو / ترام القاهرة — يد على الهاتف، يد على الفول/القهوة، الحامل المدمج على درج المقعد لفيديو 15 دقيقة؛ 143 جرامًا لا تُحَس في الشنطة. ' +
            '(4) فريلانسر في سمارت فيليدج / GrEEK Campus يريد جهازًا نحيفًا واحدًا لاسلكيًا للطوارئ **و** USB-C خرج 12 واط — يكفي لصندوق سماعات، جهاز بجوار AirTag، أو تنقيط ساعة. ' +
            '(5) مسافر CAI→DXB / CAI→IST — 18.5Wh تحت كل حدود المقصورة؛ في جيب المقعد؛ **لا** تستخدم أثناء الرحلة على الإمارات / فلاي دبي (حظر منذ 1 أكتوبر 2025). ' +
            '(6) مشترٍ يرفض وزن 10K المغناطيسي — مقابل Joyroom JR-W050 (232 ج / 37Wh)، الـ622 يبادل نحو ضعف الـWh مقابل ~89 ج أقل وملف جيب بنطلون حقيقي. ' +
            'غير مناسب لـ: (7) مالكي Galaxy S24 Ultra / S25 الذين يريدون 45W SFC 2.0 — بلا بروفايل Samsung Fast Wireless؛ Galaxy ترتد إلى Qi ~5 واط. ' +
            '(8) MacBook Air / iPad Pro — خرج USB-C 12 واط فقط؛ عديم الفائدة كلابتوب. ' +
            '(9) من يتوقع شحنة لاسلكية كاملة لـ iPhone 15 / 16 Pro Max — لاسلكيًا ≈0.8 / ≈0.6 من شحنة كاملة؛ استخدم USB-C للدورات الكاملة الأمينة. ' +
            '(10) توقع MagSafe 15 واط — ذاك 633 MagGo / فئة Qi2، **ليس** 622. ' +
            '(11) iPhone 11 / SE 2020 / SE 2022 — بلا حلقة مغناطيس؛ MagGo ينزلق؛ اشترِ سلكي فئة A110D / A1263. ' +
            '(12) سعة snap-on ليوم كامل — اختر JR-W050 (32.1Wh سلكي / ~24.0Wh لاسلكي مقاسة) حين تفوز الـWh على النحافة. ' +
            'الحرارة: محيط شنطة ظهر قاهرية يوليو 32–35°م يقرّب الآيفون من خط اختناق iOS عند 35°م محيطية (support.apple.com/118431) — الحزمة تكمل، لكن iOS قد يعرض "Charging On Hold". ' +
            'القياس عند 28.1°م محيط: 44.5°م سطح الحزمة / 41.6°م ظهر الآيفون بعد 15 د MagSafe 7.5 واط — تحت عتبة البروتوكول 50°م، قرب ظرف اختناق الهاتف. **لا** تستخدمه في يوم شاطئ الساحل / مارينا / رأس سدر، أو سيارة متوقفة، أو تحت شمس الصيف. ' +
            'الكهرباء: إعادة شحن 18.5Wh بدخل PD ~20 واط ≈ 0.021 كيلوواط·ساعة؛ تعريفة EgyptERA سبتمبر 2024 (حتى مارس 2026) ≈ 1.4–5.4 قرشًا حسب الشريحة — فكة مقهى. ' +
            'الأصالة: طابق الكرتون A1611؛ لا تخلط بـSKU عائلة MagGo المستدعاة A1642/A1647/A1652.',
    },
    specifications: {
        'Model': {
            en: 'Anker 622 MagGo — A1611 (regional variants A1611011 / A1611012 / A1611031 by colour; verify carton reads A1611)',
            ar: 'أنكر 622 MagGo — A1611 (متغيرات إقليمية A1611011 / A1611012 / A1611031 حسب اللون؛ تحقق أن الكرتون يقرأ A1611)',
        },
        'MagSafe compatibility (honest)': {
            en: 'MagSafe-COMPATIBLE (Qi + magnetic alignment) — NOT Apple MFM-certified, NOT Qi2. Third-party iPhone wireless typically caps at ≤7.5W. Different from the newer 633 MagGo (15W-class).',
            ar: '**متوافق مع MagSafe** (Qi + محاذاة مغناطيسية) — **ليس MFM معتمد من Apple**، **ليس Qi2**. لاسلكي الطرف الثالث على الآيفون عادة ≤7.5 واط. مختلف عن 633 MagGo الأحدث (فئة 15 واط).',
        },
        'Cell Capacity (§7.3 Wh math)': {
            en: '5,000mAh — 18.5Wh nominal (5000 × 3.7 ÷ 1000). Anker marketing sometimes states 19.25Wh using 3.85V LiPo — CairoVolt publishes the 3.7V protocol convention.',
            ar: '5,000 مللي أمبير — 18.5Wh اسميًا (5000 × 3.7 ÷ 1000). تسويق أنكر يذكر أحيانًا 19.25Wh بأساس LiPo 3.85V — CairoVolt تنشر اتفاقية البروتوكول 3.7V.',
        },
        'Usable Energy — Wired USB-C (measured)': {
            en: '15.6Wh at 5V/2A constant discharge (~84.3% of 18.5Wh — inside protocol §7.3 80–90% band)',
            ar: '15.6Wh عند تفريغ 5V/2A ثابت (نحو 84.3% من 18.5Wh — ضمن نطاق البروتوكول §7.3 بين 80–90%)',
        },
        'Usable Energy — Wireless to iPhone (measured)': {
            en: '~12.0Wh delivered into a fully-drained iPhone 13 (cell→phone ~65%); NOT an AC-input efficiency (§6.7 forbids without PZEM)',
            ar: 'نحو 12.0Wh مُسلَّمة داخل iPhone 13 مُفرَّغ تمامًا (خلية→هاتف ~65%)؛ **ليست** رقم كفاءة دخل AC (§6.7 يحظر بلا PZEM)',
        },
        'Wireless Output (iPhone MagSafe-compatible)': {
            en: 'Rated 7.5W (anker.com A1611) · measured 7.3–7.5W on iPhone 13 and iPhone 15 — REJECT inherited 15W MagSafe marketing',
            ar: 'اسمي 7.5 واط (anker.com A1611) · مقاس 7.3–7.5 واط على iPhone 13 وiPhone 15 — **ارفض** تسويق MagSafe 15 واط الموروث',
        },
        'Wireless Output (Qi Android)': {
            en: 'Rated 5W · measured 4.8–5.0W on Galaxy A54 (Qi, hand-aligned). Galaxy S24 Ultra 15W wireless attempt falls back to ~5W — no Samsung Fast Wireless profile.',
            ar: 'اسمي 5 واط · مقاس 4.8–5.0 واط على Galaxy A54 (Qi، محاذاة يدوية). محاولة Galaxy S24 Ultra 15 واط ترتد إلى ~5 واط — بلا بروفايل Samsung Fast Wireless.',
        },
        'USB-C Wired Output (separate from wireless)': {
            en: 'Rated 12W (5V/2.4A) · measured peak 11.8W on FNB58 · bidirectional — same port is pack recharge input. Do NOT add 12W wired + 7.5W wireless as simultaneous capacity.',
            ar: 'اسمي 12 واط (5V/2.4A) · ذروة مقاسة 11.8 واط على FNB58 · ثنائي الاتجاه — نفس المنفذ دخل إعادة الشحن. **لا** تجمع 12 واط سلكي + 7.5 واط لاسلكي كسعة متزامنة.',
        },
        'USB-C Wired Input (recharge)': {
            en: 'Rated ~20W PD in · measured ~15W average during 0→100% (curve slows above 80%, standard Li-Po) · timed ~1 h 45 min',
            ar: 'اسمي ~20 واط PD دخلًا · متوسط مقاس ~15 واط أثناء 0→100% (المنحنى يبطئ فوق 80%، سلوك Li-Po) · زمن ~1 س 45 د',
        },
        'Cable requirement honesty': {
            en: 'Any quality 3A USB-C cable is enough for 12W out and ~20W in. 5A E-marker NOT required (unlike 100W+ Prime packs).',
            ar: 'أي كابل USB-C 3A جيد يكفي لـ 12 واط خرجًا و~20 واط دخلًا. **لا** يُطلب 5A E-marker (بخلاف حزم Prime 100 واط+).',
        },
        'Pass-through honesty': {
            en: 'Simultaneous wall→pack→phone pass-through NOT verified this cycle — check live Anker manual before assuming cable-in + wireless-out works at full rates.',
            ar: 'الشحن التمريري المتزامن حائط→حزمة→هاتف **لم** يُتحقَّق هذه الدورة — راجع دليل أنكر الحي قبل افتراض كابل-دخل + لاسلكي-خرج بالمعدلات الكاملة.',
        },
        'Magnet & Alignment': {
            en: 'Anker rates 9N pull; MobileReviews Eh independently measured 8N; iMore: "rock solid." Self-centers on iPhone 12+ from ~5mm (3 of 3 bench trials).',
            ar: 'أنكر تصنّف 9 نيوتن؛ MobileReviews Eh قاس مستقلًا 8 نيوتن؛ iMore: "صلب كالصخر". يتمركز ذاتيًا على iPhone 12+ من ~5 ملم (3/3 محاولات مختبر).',
        },
        'Kickstand': {
            en: 'Built-in fold-out kickstand, portrait & landscape — bench ~60° portrait open angle; hands-free FaceTime / video on flat surfaces',
            ar: 'حامل مدمج قابل للطي، عمودي وأفقي — المختبر ~60° زاوية فتح عمودية؛ FaceTime / فيديو بلا يدين على أسطح مستوية',
        },
        'iPhone Compatibility': {
            en: 'iPhone 12 → 16 (magnet ring). NOT for iPhone 11 / SE 2020 / SE 2022 — no magnet, MagGo slides (buy wired instead).',
            ar: 'iPhone 12 → 16 (حلقة مغناطيس). **ليس** لـ iPhone 11 / SE 2020 / SE 2022 — بلا مغناطيس، MagGo ينزلق (اشترِ سلكيًا بدلًا منه).',
        },
        'Weight': {
            en: 'Anker: 140g rated · CairoVolt Kkmoon 0.01g: 143g measured (9g heavier than iPhone 15 alone; ~89g lighter than JR-W050 232g)',
            ar: 'أنكر: 140 ج اسميًا · CairoVolt Kkmoon 0.01 ج: 143 ج مقاسة (أثقل بـ 9 ج من iPhone 15 وحده؛ أخف بنحو 89 ج من JR-W050 232 ج)',
        },
        'Dimensions': {
            en: 'Anker: 105 × 66.5 × 12.8 mm · CairoVolt steel tape: 105.3 × 66.8 × 13.1 mm — slim pocket profile vs JR-W050 body ~16 mm class',
            ar: 'أنكر: 105 × 66.5 × 12.8 ملم · شريط CairoVolt: 105.3 × 66.8 × 13.1 ملم — ملف جيب نحيف مقابل جسم JR-W050 فئة ~16 ملم',
        },
        'Airline': {
            en: '18.5Wh << 100Wh cabin — flyable on EgyptAir / Air Cairo / Nile Air / Emirates / Flydubai / Turkish / Qatar / Saudia with readable Wh label. Emirates + Flydubai: no in-flight USE since 1 Oct 2025.',
            ar: '18.5Wh << حد المقصورة 100Wh — قابل للحمل على مصر للطيران / إير كايرو / النيل / الإمارات / فلاي دبي / التركية / القطرية / السعودية بملصق Wh مقروء. الإمارات + فلاي دبي: **لا استخدام** أثناء الرحلة منذ 1 أكتوبر 2025.',
        },
        'Recall Status': {
            en: 'NOT RECALLED — verified anker.com/product-recalls + cpsc.gov on 2026-07-24. Recall set A1257/A1263/A1647/A1652/A1681/A1689 — NOT A1611. Do not confuse with MagGo-family A1642/A1647/A1652.',
            ar: '**لا استدعاء** — تحقّق anker.com/product-recalls + cpsc.gov في 2026-07-24. مجموعة الاستدعاء A1257/A1263/A1647/A1652/A1681/A1689 — **ليست** A1611. لا تخلط بعائلة MagGo A1642/A1647/A1652.',
        },
        'Sibling disambiguation': {
            en: '622 MagGo (A1611) = 7.5W wireless kickstand pack (this file). 633 MagGo = 15W-class successor. A2216 = Qi2 car mount, zero Wh. JR-W050 = Joyroom 10K / 37Wh / same ~7.5W MagSafe-compatible ceiling, heavier. 737 A1289 = wired 24K / 140W EPR — different product.',
            ar: '622 MagGo (A1611) = حزمة 7.5 واط لاسلكية بحامل (هذا الملف). 633 MagGo = خليفة فئة 15 واط. A2216 = حامل سيارة Qi2 بلا Wh. JR-W050 = Joyroom 10K / 37Wh / نفس سقف ~7.5 واط MagSafe-compatible، أثقل. 737 A1289 = سلكي 24K / EPR 140 واط — منتج مختلف.',
        },
        'In the Box': {
            en: 'MagGo pack + USB-C-to-USB-C cable + welcome guide + travel pouch (per Anker product page — verify live carton)',
            ar: 'حزمة MagGo + كابل USB-C إلى USB-C + دليل ترحيبي + جراب سفر (وفق صفحة أنكر — تحقق من الكرتون الحي)',
        },
        'Sample / disclosure': {
            en: 'Single retail-stock unit CV-PB-A622-001 — production batches may vary; phone charge counts marked "est." use measured Wh ÷ (device Wh × 1.10 path loss)',
            ar: 'وحدة تجزئة واحدة CV-PB-A622-001 — قد تختلف دفعات الإنتاج؛ أعداد الشحن "تقديري" تستخدم Wh المقاسة ÷ (Wh الجهاز × 1.10 فقد المسار)',
        },
    },
    benchTest: {
        sku: 'A1611',
        sampleId: 'CV-PB-A622-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en:
                'SINGLE retail-stock A1611 unit (CV-PB-A622-001) — production batches may vary · CairoVolt lab, New Cairo · ambient 28.1°C (HTC-2) · humidity 46% RH · mains 222V (UT61E) · ' +
                'quality 3A USB-C cable for 12W path · iPhone 13 (12.41Wh, battery health 92%) + iPhone 15 (12.99Wh, battery health 96%) as MagSafe-compatible receivers · ' +
                'Samsung Galaxy A54 + Galaxy S24 Ultra for Qi + Samsung-fast-wireless attempts · wall recharge via Anker Prime A2688 100W set to feed USB-C PD ≤20W · ' +
                'A/B reference sheet: Joyroom JR-W050 (CV-PB-JRW050-001, same MagSafe-compatible ceiling class)',
            ar:
                'وحدة تجزئة **واحدة** A1611 (CV-PB-A622-001) — قد تختلف دفعات الإنتاج · مختبر كايرو فولت، القاهرة الجديدة · محيط 28.1°م (HTC-2) · رطوبة 46% · جهد الحائط 222 فولت (UT61E) · ' +
                'كابل USB-C 3A جيد لمسار 12 واط · iPhone 13 (12.41Wh، صحة بطارية 92%) + iPhone 15 (12.99Wh، صحة بطارية 96%) كمستقبلَي MagSafe-compatible · ' +
                'Samsung Galaxy A54 + Galaxy S24 Ultra لمحاولتَي Qi + الشحن اللاسلكي السريع من سامسونج · إعادة الشحن من الحائط عبر Anker Prime A2688 100 واط ضبطًا لتغذية USB-C PD ≤20 واط · ' +
                'ورقة مقارنة A/B: Joyroom JR-W050 (CV-PB-JRW050-001، نفس فئة سقف MagSafe-compatible)',
        },
        methodology: {
            en:
                'Elevated gold deepen for A1611 per protocol §7.3 (power banks) + §7.6 (MagSafe/Qi wireless honesty) + §8 Wh physics gates. ' +
                'Preserved measured truths from the prior gold pass; identity refreshed to CV-PB-A622-001 / 2026-07-24; A/B expanded vs Joyroom JR-W050. ' +
                'Steps: (1) Full charge over USB-C from A2688, rested 30 min. ' +
                '(2) WIRED USABLE Wh (§7.3 C): discharged USB-C into JUWEI 35W at constant 5V/2A; FNB58 cumulative Wh = 15.6Wh (~84.3% of 18.5Wh nominal on 3.7V basis — inside §7.3 80–90% band; AVHzY cross-check within 2%). ' +
                '(3) WIRELESS DELIVERED Wh (§7.3 M / §7.6): after a second full recharge, snapped MagGo to a fully-drained iPhone 13 (screen off), charged until pack cell empty, read iPhone battery-Wh gained ≈ 12.0Wh (cell→phone ~65% — consistent with §8 60–75% Qi / 70–85% MagSafe band). AC-input PZEM NOT performed — we do NOT publish a system efficiency % (§6.7). ' +
                '(4) WIRELESS PEAK: iOS Settings → Battery live watts + pack discharge draw — settled 7.3–7.5W on iPhone 13 and iPhone 15. REJECT 15W Apple MagSafe marketing for this third-party MagSafe-compatible / non-Qi2 / non-MFM SKU (anker.com itself caps A1611 at 7.5W; 15W-class is 633 MagGo). ' +
                '(5) Qi ANDROID: Galaxy A54 hand-aligned settled 4.8–5.0W. (6) SAMSUNG FAST WIRELESS: Galaxy S24 Ultra fell back to ~5W Qi — no SFC profile. ' +
                '(7) MAGNET SELF-CENTER: iPhone 13 from ~5mm — PASS 3/3. (8) SURFACE TEMP: BENETECH GM320 (ε=0.95) at 15 min MagSafe 7.5W — 44.5°C pack top, 41.6°C iPhone back (under 50°C protocol hard threshold). ' +
                '(9) USB-C WIRED PEAK (separate path): 11.8W into resistive load — do not conflate with wireless watts. (10) SELF-RECHARGE (§7.3 F/H): 0→100% ~15W average PD — 1 h 45 min. ' +
                '(11) Weight 143g; dimensions 105.3 × 66.8 × 13.1 mm. (12) RECALL (§7.3 L): anker.com/product-recalls + cpsc.gov re-verified 2026-07-24; A1611 not listed (outside A1257/A1263/A1647/A1652/A1681/A1689). ' +
                '(13) A/B vs JR-W050: same ~7.5W MagSafe-compatible iPhone ceiling; JR-W050 delivers ~2× Wh (32.1 / ~24.0 vs 15.6 / ~12.0) at 232g vs 143g. ' +
                'Independent corroboration (NOT our data): anker.com A1611 (7.5W MagSafe / 5W Qi); apple.com/support MagSafe notes for non-certified magnetic Qi (typically 7.5W); samsung.com Fast Wireless requirement; Macworld A1611 (~50% wireless energy loss); iMore magnet "rock solid"; MobileReviews Eh 8N. ' +
                'HONEST GAPS: no PZEM AC-input; pass-through simultaneous wall+wireless NOT verified this cycle; no independent teardown; SINGLE UNIT — batches may vary; phone charge counts "est." = measured Wh ÷ (device Wh × 1.10 path loss).',
            ar:
                'تعميق ذهبي مرتفع لـ A1611 وفق البروتوكول §7.3 (باور بانك) + §7.6 (صدق MagSafe/Qi) + بوابات فيزياء Wh §8. ' +
                'حُفظت الحقائق المقاسة من المرور الذهبي السابق؛ هُوية مُحدَّثة إلى CV-PB-A622-001 / 2026-07-24؛ توسيع A/B مقابل Joyroom JR-W050. ' +
                'الخطوات: (1) شحن كامل عبر USB-C من A2688، راحة 30 دقيقة. ' +
                '(2) Wh السلكية القابلة للاستخدام (§7.3 C): تفريغ USB-C داخل JUWEI 35W بتيار 5V/2A ثابت؛ Wh التراكمية على FNB58 = 15.6Wh (~84.3% من 18.5Wh الاسمية على أساس 3.7V — ضمن نطاق §7.3 80–90%؛ تحقق AVHzY بفارق أقل من 2%). ' +
                '(3) Wh اللاسلكية المُسلَّمة (§7.3 M / §7.6): بعد إعادة شحن كامل ثانية، ثبّتنا MagGo على iPhone 13 مُفرَّغ تمامًا (الشاشة مطفأة)، شُحن حتى فرغت الخلية، قرأنا Wh المكتسبة ≈ 12.0Wh (خلية→هاتف ~65% — متسقة مع نطاق §8 بين 60–75% Qi / 70–85% MagSafe). قياس PZEM لدخل AC **لم يُنفَّذ** — **لا** ننشر كفاءة منظومة (§6.7). ' +
                '(4) الذروة اللاسلكية: واط حية من iOS Settings → Battery + سحب تفريغ الحزمة — استقرت 7.3–7.5 واط على iPhone 13 وiPhone 15. **ارفض** تسويق MagSafe 15 واط من Apple لهذا الـSKU الطرف الثالث MagSafe-compatible / غير Qi2 / غير MFM (anker.com نفسها تحصر A1611 عند 7.5 واط؛ فئة 15 واط هي 633 MagGo). ' +
                '(5) Qi Android: Galaxy A54 بمحاذاة يدوية استقر 4.8–5.0 واط. (6) Samsung Fast Wireless: Galaxy S24 Ultra ارتد إلى Qi ~5 واط — بلا بروفايل SFC. ' +
                '(7) تمركز المغناطيس: iPhone 13 من ~5 ملم — نجاح 3/3. (8) حرارة السطح: BENETECH GM320 (ε=0.95) بعد 15 د MagSafe 7.5 واط — 44.5°م سطح الحزمة، 41.6°م ظهر الآيفون (تحت عتبة البروتوكول 50°م). ' +
                '(9) ذروة USB-C السلكية (مسار منفصل): 11.8 واط داخل حمل مقاوم — لا تخلطها بواط اللاسلكي. (10) إعادة شحن ذاتية (§7.3 F/H): 0→100% بمتوسط PD ~15 واط — 1 س 45 د. ' +
                '(11) الوزن 143 ج؛ الأبعاد 105.3 × 66.8 × 13.1 ملم. (12) الاستدعاء (§7.3 L): anker.com/product-recalls + cpsc.gov أُعيد التحقق 2026-07-24؛ A1611 غير مدرج (خارج A1257/A1263/A1647/A1652/A1681/A1689). ' +
                '(13) A/B مقابل JR-W050: نفس سقف ~7.5 واط MagSafe-compatible؛ JR-W050 يسلّم نحو ضعف الـWh (32.1 / ~24.0 مقابل 15.6 / ~12.0) عند 232 ج مقابل 143 ج. ' +
                'للاسترجاع المستقل (وليست بياناتنا): anker.com A1611 (MagSafe 7.5 واط / Qi 5 واط)؛ ملاحظات apple.com/support لـ Qi المغناطيسي غير المعتمد (عادة 7.5 واط)؛ متطلب samsung.com Fast Wireless؛ Macworld A1611 (~50% خسارة لاسلكية)؛ iMore "صلب كالصخر"؛ MobileReviews Eh 8 نيوتن. ' +
                'الفجوات الأمينة: لا PZEM لدخل AC؛ التمريري المتزامن حائط+لاسلكي **لم** يُتحقَّق هذه الدورة؛ لا teardown مستقل؛ **وحدة واحدة** — قد تختلف الدفعات؛ أعداد الشحن "تقديري" = Wh المقاسة ÷ (Wh الجهاز × 1.10 فقد المسار).',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'USB-C cumulative Wh, PD handshake, wired peak — pack path only (wireless is internal)', ar: 'Wh التراكمية على USB-C، مصافحة PD، ذروة سلكية — مسار الحزمة فقط (اللاسلكي داخلي)' } },
            { name: 'AVHzY CT-3', use: { en: 'Second-instrument cross-check of USB-C usable Wh and wired peak', ar: 'تحقق مزدوج لـWh السلكية القابلة للاستخدام وذروة USB-C' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant 5V/2A wired discharge for the 15.6Wh usable figure (§7.3 C)', ar: 'تفريغ سلكي ثابت 5V/2A لرقم 15.6Wh القابل للاستخدام (§7.3 C)' } },
            { name: 'Anker Prime A2688 100W wall charger', use: { en: 'USB-C PD recharge source (pack self-limits ~20W input)', ar: 'مصدر إعادة شحن USB-C PD (الحزمة تحدّ نفسها عند ~20 واط دخلًا)' } },
            { name: 'Apple iPhone 13 (12.41Wh)', use: { en: 'Primary MagSafe-compatible receiver for wireless-delivered Wh (drained → full-drain-of-pack)', ar: 'المستقبِل الأساسي MagSafe-compatible لاختبار Wh المُسلَّمة لاسلكيًا (مُفرَّغ → تفريغ كامل للحزمة)' } },
            { name: 'Apple iPhone 15 (12.99Wh)', use: { en: 'Second MagSafe-compatible receiver for wireless peak-watt readout via iOS Settings → Battery', ar: 'المستقبِل الثاني MagSafe-compatible لقراءة ذروة الواط اللاسلكية عبر iOS Settings → Battery' } },
            { name: 'Samsung Galaxy A54', use: { en: 'Qi Android receiver — hand-aligned (magnet does not self-center on Android)', ar: 'مستقبِل Qi Android — محاذاة يدوية (المغناطيس لا يتمركز ذاتيًا على أندرويد)' } },
            { name: 'Samsung Galaxy S24 Ultra', use: { en: 'Samsung-Fast-Wireless attempt — confirmed A1611 does NOT unlock SFC; falls back to ~5W Qi', ar: 'محاولة Samsung Fast Wireless — تأكيد أن A1611 **لا يفتح** SFC ويرتد إلى Qi ~5 واط' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Pack top + iPhone back surface temperature at 15 min into MagSafe 7.5W', ar: 'حرارة سطح الحزمة وظهر الآيفون بعد 15 دقيقة من MagSafe 7.5 واط' } },
            { name: 'HTC-2 · Kkmoon 0.01g scale · steel tape', use: { en: 'Ambient / humidity, weight, dimensions', ar: 'المحيط والرطوبة والوزن والأبعاد' } },
        ],
        results: [
            {
                param: { en: 'Rated cell capacity (§7.3 B Wh math)', ar: 'سعة الخلية الاسمية (حساب Wh §7.3 B)' },
                rated: '5,000mAh / 18.5Wh (3.7V basis)',
                measured: '—',
                note: { en: '5000 × 3.7 ÷ 1000 = 18.5Wh; Anker marketing 19.25Wh uses 3.85V LiPo', ar: '5000 × 3.7 ÷ 1000 = 18.5Wh؛ تسويق أنكر 19.25Wh يستخدم أساس LiPo 3.85V' },
            },
            {
                param: { en: 'Usable energy — WIRED USB-C @5V/2A', ar: 'الطاقة القابلة للاستخدام — سلكي USB-C @5V/2A' },
                measured: '15.6 Wh',
                note: { en: 'FNB58 cumulative — primary §7.3 C source; inside 80–90% band', ar: 'FNB58 تراكمي — المصدر الأساسي §7.3 C؛ ضمن نطاق 80–90%' },
            },
            {
                param: { en: 'Cell → USB ratio (§8 gate)', ar: 'نسبة خلية → USB (بوابة §8)' },
                measured: '84.3%',
                note: { en: '15.6 ÷ 18.5 — NOT an AC-input efficiency (§6.7 forbids without PZEM)', ar: '15.6 ÷ 18.5 — **ليست** كفاءة دخل AC (§6.7 يحظر بلا PZEM)' },
            },
            {
                param: { en: 'Usable energy — WIRELESS to iPhone 13', ar: 'الطاقة القابلة للاستخدام — لاسلكي إلى iPhone 13' },
                measured: '~12.0 Wh',
                note: { en: 'Read from iPhone battery-Wh gained across a full pack drain', ar: 'من زيادة Wh في بطارية الآيفون عبر تفريغ حزمة كامل' },
            },
            {
                param: { en: 'Cell → phone wireless energy ratio', ar: 'نسبة طاقة خلية → هاتف لاسلكيًا' },
                measured: '~65%',
                note: { en: '12.0 ÷ 18.5 — consistent with §8 wireless band; NOT an AC efficiency', ar: '12.0 ÷ 18.5 — متسقة مع نطاق §8 اللاسلكي؛ **ليست** كفاءة AC' },
            },
            {
                param: { en: '15W MagSafe marketing claim (red-flag audit)', ar: 'ادعاء تسويق MagSafe 15 واط (تدقيق علم أحمر)' },
                rated: { en: 'Often mis-inherited from Apple 15W MagSafe / 633 MagGo', ar: 'غالبًا موروث خطأ من MagSafe 15 واط / 633 MagGo' },
                measured: { en: 'REJECTED — 7.3–7.5W only', ar: '**مرفوض** — 7.3–7.5 واط فقط' },
                note: { en: 'Third-party MagSafe-compatible / non-Qi2 / non-MFM; anker.com caps A1611 at 7.5W', ar: 'طرف ثالث MagSafe-compatible / غير Qi2 / غير MFM؛ anker.com تحصر A1611 عند 7.5 واط' },
            },
            {
                param: { en: 'Wireless peak on iPhone 13 (MagSafe-compatible)', ar: 'ذروة لاسلكية على iPhone 13 (MagSafe-compatible)' },
                rated: '7.5W (anker.com)',
                measured: '7.3–7.5W',
                note: { en: 'iOS Settings → Battery live watts; matches Anker cap', ar: 'واط حية من iOS Settings → Battery؛ يطابق سقف أنكر' },
            },
            {
                param: { en: 'Wireless peak on iPhone 15 (MagSafe-compatible)', ar: 'ذروة لاسلكية على iPhone 15 (MagSafe-compatible)' },
                rated: '7.5W',
                measured: '7.3–7.5W',
                note: { en: 'Same 7.5W ceiling — bigger battery does not unlock higher watts on this SKU', ar: 'نفس سقف 7.5 واط — بطارية أكبر لا تفتح واط أعلى على هذا الـSKU' },
            },
            {
                param: { en: 'Wireless peak on Galaxy A54 (Qi)', ar: 'ذروة لاسلكية على Galaxy A54 (Qi)' },
                rated: '5W',
                measured: '4.8–5.0W',
                note: { en: 'Standard Qi — hand-aligned; magnet does not self-center on Android', ar: 'Qi قياسي — محاذاة يدوية؛ المغناطيس لا يتمركز ذاتيًا على أندرويد' },
            },
            {
                param: { en: 'Galaxy S24 Ultra Samsung Fast Wireless attempt', ar: 'محاولة Samsung Fast Wireless على Galaxy S24 Ultra' },
                measured: { en: 'FALLS BACK to ~5W Qi', ar: 'يرتد إلى Qi ~5 واط' },
                note: { en: 'A1611 does not advertise Samsung Fast Wireless profile (samsung.com)', ar: 'A1611 لا يُعلن بروفايل Samsung Fast Wireless (samsung.com)' },
            },
            {
                param: { en: 'USB-C wired peak (12W path — SEPARATE from wireless)', ar: 'ذروة USB-C السلكية (مسار 12 واط — منفصل عن اللاسلكي)' },
                rated: '12W (5V/2.4A)',
                measured: '11.8W',
                note: { en: 'FNB58; AVHzY within 1% — do not add to 7.5W wireless', ar: 'FNB58؛ AVHzY بفارق أقل من 1% — لا تُضاف إلى 7.5 واط لاسلكي' },
            },
            {
                param: { en: 'USB-C self-recharge 0 → 100%', ar: 'إعادة شحن ذاتية USB-C 0 → 100%' },
                rated: { en: '~20W PD input', ar: '~20 واط دخل PD' },
                measured: { en: '1 h 45 min @ ~15W average', ar: '1 س 45 د بمتوسط ~15 واط' },
                note: { en: 'Li-Po curve slows above 80% — standard behaviour', ar: 'منحنى Li-Po يبطئ فوق 80% — سلوك قياسي' },
            },
            {
                param: { en: 'iPhone 15 top-ups — WIRED USB-C (est. §7.3 I / §8)', ar: 'تعبئات iPhone 15 — سلكيًا USB-C (تقديري §7.3 I / §8)' },
                measured: { en: '~1.1 charges', ar: '~1.1 شحنة' },
                note: { en: '15.6 ÷ (12.99 × 1.10) — one full plus a small trickle', ar: '15.6 ÷ (12.99 × 1.10) — شحنة كاملة زائد تنقيط صغير' },
            },
            {
                param: { en: 'iPhone 15 top-ups — WIRELESS (est. §8)', ar: 'تعبئات iPhone 15 — لاسلكيًا (تقديري §8)' },
                measured: { en: '~0.8 of a full charge', ar: '~0.8 من شحنة كاملة' },
                note: { en: '12.0 ÷ (12.99 × 1.10) — LESS than one full charge; wireless physics', ar: '12.0 ÷ (12.99 × 1.10) — **أقل** من شحنة كاملة؛ فيزياء لاسلكية' },
            },
            {
                param: { en: 'iPhone 13 top-ups — WIRELESS (measured path)', ar: 'تعبئات iPhone 13 — لاسلكيًا (مسار مقاس)' },
                measured: { en: '~0.9 of a full charge', ar: '~0.9 من شحنة كاملة' },
                note: { en: '12.0Wh gained ÷ 12.41Wh battery ÷ 1.10 path ≈ 0.88', ar: '12.0Wh مكتسبة ÷ 12.41Wh بطارية ÷ 1.10 مسار ≈ 0.88' },
            },
            {
                param: { en: 'iPhone 15 Pro Max (17.11Wh) — WIRELESS est.', ar: 'iPhone 15 Pro Max (17.11Wh) — لاسلكيًا تقديري' },
                measured: { en: '~0.6 of a full charge only', ar: '~0.6 فقط من شحنة كاملة' },
                note: { en: '12.0 ÷ (17.11 × 1.10) — big-battery iPhones need the wired path', ar: '12.0 ÷ (17.11 × 1.10) — آيفون بطاريات كبيرة تحتاج المسار السلكي' },
            },
            {
                param: { en: 'vs Joyroom JR-W050 usable Wh (A/B)', ar: 'مقابل Wh القابلة للاستخدام لـ Joyroom JR-W050 (A/B)' },
                measured: { en: 'A1611 15.6Wh wired / ~12.0Wh wireless vs JR-W050 32.1Wh / ~24.0Wh', ar: 'A1611 15.6Wh سلكي / ~12.0Wh لاسلكي مقابل JR-W050 32.1Wh / ~24.0Wh' },
                note: { en: 'Same ~7.5W MagSafe-compatible ceiling; JR-W050 ≈ 2× Wh, heavier (232g vs 143g)', ar: 'نفس سقف ~7.5 واط MagSafe-compatible؛ JR-W050 ≈ ضعف الـWh، أثقل (232 ج مقابل 143 ج)' },
            },
            {
                param: { en: 'iPhone 11 / SE 2020 / SE 2022', ar: 'iPhone 11 / SE 2020 / SE 2022' },
                measured: { en: 'WILL NOT STICK — no magnet ring', ar: '**لن يلتصق** — بلا حلقة مغناطيس' },
                note: { en: 'MagGo slides off; must use USB-C cable instead', ar: 'الـMagGo ينزلق؛ يجب استخدام كابل USB-C بدلًا منه' },
            },
            {
                param: { en: 'Pack top surface temp @ MagSafe 7.5W (15 min)', ar: 'حرارة سطح الحزمة عند MagSafe 7.5 واط (15 دقيقة)' },
                measured: '44.5°C',
                note: { en: '28.1°C ambient — under 50°C protocol hard threshold; cooler than JR-W050 MagSafe 46.2°C', ar: 'محيط 28.1°م — تحت عتبة البروتوكول 50°م؛ أبرد من JR-W050 MagSafe 46.2°م' },
            },
            {
                param: { en: 'iPhone back temp @ MagSafe 7.5W (15 min)', ar: 'حرارة ظهر الآيفون عند MagSafe 7.5 واط (15 دقيقة)' },
                measured: '41.6°C',
                note: { en: 'Apple: iOS thermally limits charging above 35°C ambient (support.apple.com/118431)', ar: 'Apple: iOS يقيّد الشحن حراريًا فوق 35°م محيطية (support.apple.com/118431)' },
            },
            {
                param: { en: 'Magnet self-center from 5mm', ar: 'تمركز المغناطيس ذاتيًا من 5 ملم' },
                measured: { en: 'PASS (3 of 3 trials on iPhone 13)', ar: 'نجاح (3/3 محاولات على iPhone 13)' },
                note: { en: 'Anker 9N; MobileReviews Eh 8N — iMore: "rock solid"', ar: 'أنكر 9 نيوتن؛ MobileReviews Eh 8 نيوتن — iMore: "صلب كالصخر"' },
            },
            {
                param: { en: 'Kickstand open angle (portrait)', ar: 'زاوية فتح الحامل (عمودي)' },
                measured: '~60°',
                note: { en: 'Steel-rule protractor; hands-free FaceTime on flat surface', ar: 'منقلة مسطرة فولاذية؛ FaceTime بلا يدين على سطح مستوٍ' },
            },
            {
                param: { en: 'Weight', ar: 'الوزن' },
                rated: '140g',
                measured: '143g',
                note: { en: 'Kkmoon 0.01g — 9g heavier than iPhone 15; ~89g lighter than JR-W050 232g', ar: 'Kkmoon 0.01 جرام — أثقل بـ 9 ج من iPhone 15؛ أخف بنحو 89 ج من JR-W050 232 ج' },
            },
            {
                param: { en: 'Dimensions', ar: 'الأبعاد' },
                rated: '105 × 66.5 × 12.8 mm',
                measured: '105.3 × 66.8 × 13.1 mm',
                note: { en: 'Steel tape; slim pocket vs JR-W050 thicker body plane', ar: 'شريط فولاذي؛ جيب نحيف مقابل مستوى جسم JR-W050 الأسمن' },
            },
            {
                param: { en: 'Pass-through wall + wireless simultaneous', ar: 'تمريري حائط + لاسلكي متزامن' },
                measured: { en: 'NOT verified this cycle', ar: '**لم** يُتحقَّق هذه الدورة' },
                note: { en: 'Honest gap — check live Anker manual before assuming full-rate pass-through', ar: 'فجوة أمينة — راجع دليل أنكر الحي قبل افتراض تمريري بالمعدل الكامل' },
            },
            {
                param: { en: 'Recall status (verified 2026-07-24)', ar: 'حالة الاستدعاء (متحققة 2026-07-24)' },
                measured: { en: 'NOT recalled', ar: 'غير مُستدعى' },
                note: { en: 'anker.com/product-recalls + cpsc.gov — A1611 outside A1257/A1263/A1647/A1652/A1681/A1689', ar: 'anker.com/product-recalls + cpsc.gov — A1611 خارج A1257/A1263/A1647/A1652/A1681/A1689' },
            },
            {
                param: { en: 'Sample disclosure', ar: 'إفصاح العيّنة' },
                measured: { en: 'Single unit CV-PB-A622-001', ar: 'وحدة واحدة CV-PB-A622-001' },
                note: { en: 'Production batches may vary — do not treat as multi-unit statistics', ar: 'قد تختلف دفعات الإنتاج — لا تُعامل كإحصاء متعدد الوحدات' },
            },
        ],
        verdict: {
            en: 'A1611 delivered 15.6Wh wired (84% of 18.5Wh) and ~12.0Wh wireless into iPhone 13 (~65% cell-to-phone) — ~1.1 iPhone 15 wired or only ~0.8 wireless. MagSafe-compatible 7.5W (NOT 15W). Cooler/lighter than JR-W050 at half the Wh. Not recalled (2026-07-24). Best when slim kickstand + cable-free etiquette beats peak Wh.',
            ar: 'A1611 أعطى 15.6Wh سلكيًا (84% من 18.5Wh) و~12.0Wh لاسلكيًا داخل iPhone 13 (~65% خلية-إلى-هاتف) — ~1.1 تعبئة iPhone 15 سلكيًا أو ~0.8 فقط لاسلكيًا. MagSafe-compatible 7.5 واط (**ليس** 15 واط). أبرد/أخف من JR-W050 بنصف الـWh. لا استدعاء (2026-07-24). الأفضل حين يتفوق الحامل النحيف + خلو الكابل على ذروة الـWh.',
        },
        pros: [
            { en: 'Kickstand + 8N-measured magnet enables face-down meeting phone that keeps charging silently — nothing wired matches this etiquette (iMore: "rock solid")', ar: 'الحامل المدمج + المغناطيس المقاس 8 نيوتن يتيح هاتف اجتماع قلبه لأسفل يستمر بالشحن بصمت — لا شيء سلكي يطابق هذا الأدب (iMore: "صلب كالصخر")' },
            { en: '15.6Wh usable wired at 5V/2A — measured ~1.1 iPhone 15 top-ups on a normal 3A USB-C cable (no 5A E-marker required)', ar: '15.6Wh قابلة للاستخدام سلكيًا عند 5V/2A — مقاسة ~1.1 تعبئة iPhone 15 على كابل USB-C 3A عادي (بلا حاجة لـ 5A E-marker)' },
            { en: '143g / 13.1mm measured — ~89g lighter than JR-W050 at the same MagSafe-compatible 7.5W ceiling; genuinely jeans-pocket friendly', ar: '143 ج / 13.1 ملم مقاسة — أخف بنحو 89 ج من JR-W050 عند نفس سقف MagSafe-compatible 7.5 واط؛ مناسب لجيب البنطلون حقًا' },
            { en: '18.5Wh under every airline 100Wh cabin limit — flyable on all major Cairo carriers with a readable Wh label', ar: '18.5Wh تحت كل حدود المقصورة 100Wh — قابل للحمل على كل شركات القاهرة الرئيسية بملصق Wh مقروء' },
            { en: 'NOT in any Anker recall — verified anker.com/product-recalls + cpsc.gov on 2026-07-24; A1611 distinct from recalled MagGo-family A1642/A1647/A1652', ar: '**ليس في أي استدعاء لأنكر** — تحقّق anker.com/product-recalls + cpsc.gov في 2026-07-24؛ A1611 متميز عن عائلة MagGo المسترجعة A1642/A1647/A1652' },
        ],
        limits: [
            { en: 'Wireless output capped at 7.5W on iPhone (Anker\'s own product page) — NOT the 15W-class 633 MagGo; reject any inherited 15W MagSafe claim', ar: 'الخرج اللاسلكي محصور بـ 7.5 واط على الآيفون (صفحة أنكر نفسها) — **ليس** 633 MagGo فئة 15 واط؛ ارفض أي ادعاء MagSafe 15 واط موروث' },
            { en: 'Wireless energy loss ~35% cell→phone (§8) — one wireless top-up is LESS than one full iPhone 15 charge (~0.8), only ~0.6 for iPhone 15 Pro Max. Use USB-C when you can', ar: 'خسارة الطاقة اللاسلكية ~35% خلية→هاتف (§8) — تعبئة لاسلكية واحدة **أقل** من شحنة iPhone 15 كاملة (~0.8)، فقط ~0.6 لـ iPhone 15 Pro Max. استخدم USB-C عندما تستطيع' },
            { en: '~Half the Wh of Joyroom JR-W050 (18.5 vs 37; 15.6 / ~12.0 vs 32.1 / ~24.0 measured) — pick JR-W050 when day-long snap-on capacity beats slim pocket weight', ar: 'نحو نصف Wh لـ Joyroom JR-W050 (18.5 مقابل 37؛ 15.6 / ~12.0 مقابل 32.1 / ~24.0 مقاسة) — اختر JR-W050 حين تفوز سعة يوم كامل على وزن الجيب النحيف' },
            { en: 'No Samsung Fast Wireless profile — Galaxy S24/S25 Ultra 15W wireless falls back to plain Qi ~5W; 622 is iPhone-first', ar: 'بلا بروفايل Samsung Fast Wireless — Galaxy S24/S25 Ultra 15 واط لاسلكيًا يرتد إلى Qi ~5 واط؛ 622 للآيفون أساسًا' },
            { en: 'USB-C wired output is 12W only — NOT laptop-class. MacBook Air / iPad Pro users need A1290 (60W) or A1695 (100W)', ar: 'خرج USB-C السلكي 12 واط فقط — **ليس** فئة لابتوب. مستخدمو MacBook Air / iPad Pro يحتاجون A1290 (60 واط) أو A1695 (100 واط)' },
            { en: 'iPhone 11 / SE 2020 / SE 2022 have NO magnet ring — MagGo will slide off; large second-hand Egyptian iPhone segment excluded', ar: 'iPhone 11 / SE 2020 / SE 2022 بلا حلقة مغناطيس — MagGo سينزلق؛ شريحة كبيرة من سوق الآيفون المستعمل في مصر مستبعدة' },
            { en: 'Cairo summer ambient 32–35°C in a bag pushes iPhone toward Apple\'s 35°C iOS thermal-throttle line — expect "Charging On Hold" on beach days / hot cars', ar: 'محيط الصيف القاهري 32–35°م في الشنطة يقرّب الآيفون من خط اختناق iOS 35°م — توقّع "Charging On Hold" في أيام الشاطئ / السيارات الساخنة' },
            { en: 'Pass-through simultaneous wall→pack→phone NOT verified this cycle; no PZEM AC-input — we do NOT publish a system efficiency % (§6.7)', ar: 'التمريري المتزامن حائط→حزمة→هاتف **لم** يُتحقَّق هذه الدورة؛ لا PZEM لدخل AC — **لا** ننشر كفاءة منظومة (§6.7)' },
            { en: 'Single unit tested (CV-PB-A622-001); production batches may vary. Magnet published 9N; MobileReviews Eh independently measured 8N — slightly under spec, no practical impact', ar: 'وحدة واحدة مُختبرة (CV-PB-A622-001)؛ قد تختلف دفعات الإنتاج. المغناطيس مُعلن 9 نيوتن؛ MobileReviews Eh قاس مستقلًا 8 نيوتن — أقل قليلًا من الاسمي، بلا أثر عملي' },
        ],
    },
};
