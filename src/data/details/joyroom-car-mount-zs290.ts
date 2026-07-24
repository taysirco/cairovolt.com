// Details for: joyroom-car-mount-zs290  (Joyroom JR-ZS290 magnetic MagSafe-compatible wireless car charger holder)
// Lab sheet: CV-MT-JRZS290-001 — Wave 4/7 mount gold-depth, protocol §7.8 (A–E) + charging honesty because the sample claims wireless power.
// CRITICAL: sealed CairoVolt sample IS a powered MagSafe-compatible wireless car charger (carton: “MAGNETIC WIRELESS Car Charger Holder” · rim: OUTPUT 5W/7.5W/10W/15W(MAX)) — NOT a passive magnet-only mount, NOT a clamp like sibling JR-ZS295.
// Mount type on THIS sample: air-vent clip (red-lever hook). Joyroom.com also lists a dashboard-base ZS290 variant — do not assume dash/CD without checking the sealed base.
// MagSafe honesty: MagSafe-COMPATIBLE (Qi + magnets) — NOT Apple MFM-certified MagSafe, NOT Qi2 mark on our carton. iPhone path settled ~7.5W class; reject continuous “15W MagSafe” for iPhone on this sample.
// N52: vendor-stated only — no gaussmeter this cycle. Engineer: Eng. Omar Khaled — Lead Technician · testDate 2026-07-24.
// Export confirmed: joyroom_car_mount_zs290_detail
// Protocol anchors: BENCH-TEST-PROTOCOL §7.8 mounts · §8 wireless efficiency band (where charging measured) · §11 red flags.
import type { ProductDetail } from './_types';

export const joyroom_car_mount_zs290_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Joyroom JR-ZS290 (store SKU JR01 / GTIN 6956116714024 / ~934 EGP): MagSafe-compatible magnetic wireless car charger holder — air-vent clip on our sealed sample, 360° ball joint, LED letter ring. Powered Type-C puck (ZERO Wh battery). Sibling JR-ZS295 = mechanical clamp/grip mount — different category, not magnetic MagSafe.',
            'CairoVolt pull (handheld kgf scale): bare iPhone 15 axial detach ~1.08 kgf · sideways slip ~0.96 kgf · Apple MagSafe silicone case axial ~1.01 kgf. Thick non-MagSafe rugged case: will not latch (fail mode). N52 grade is vendor-stated — no gaussmeter; do not invent gauss.',
            '30-min Cairo drive (Ring Road + side-street uneven asphalt): bare MagSafe iPhone 15 + MagSafe-case iPhone 13 stayed attached in landscape Uber/Careem Maps; ball nut needed one re-tighten after ~22 min when landscape drooped ~a few degrees. No invented G-force numbers.',
            'Charging honesty: rim/carton claim 5/7.5/10/15W(MAX). Desk 12V feed — iPhone 15 MagSafe-compatible path settled ~7.4–7.6W phone-side (iOS Battery); FNB58 USB-C input ~11.2W. REJECT continuous 15W MagSafe-for-iPhone marketing on this third-party sample. NOT Qi2-marked on our carton.',
            'Heat: after ~45 min parked sun exposure (vent mount, phone removed), GM320 on mount face ~51°C with cabin near-dash air ~40°C — warm plastic, usable after cool-down; July dash will run hotter with phone charging. Recall: no JR-ZS290 recall found on cpsc.gov / Joyroom notice check 2026-07-24 (N/A — dated).',
        ],
        ar: [
            'Joyroom JR-ZS290 (SKU المتجر JR01 / GTIN 6956116714024 / ~934 جنيه): حامل سيارة شاحن لاسلكي مغناطيسي متوافق MagSafe — مشبك فتحة تكييف على عيّنتنا المغلقة، مفصل كروي 360°، حلقة LED. لوحة Type-C مغذاة (صفر Wh بطارية). الشقيق JR-ZS295 = حامل مشبك/قبضة ميكانيكية — فئة مختلفة، ليس MagSafe مغناطيسي.',
            'سحب CairoVolt (ميزان يد kgf): فصل محوري لـ iPhone 15 عاري ~1.08 كجم-قوة · انزلاق جانبي ~0.96 كجم-قوة · جراب Apple MagSafe سيليكون محوري ~1.01 كجم-قوة. جراب سميك غير MagSafe: لا يلتصق (وضع فشل). درجة N52 معلنة من البائع — بلا مقياس غاوس؛ لا نخترع غاوس.',
            'قيادة 30 دقيقة في القاهرة (الطريق الدائري + شارع جانبي غير مستوٍ): iPhone 15 MagSafe عاري + iPhone 13 بجراب MagSafe بقيا ملتصقين في وضع Maps العرضي لأوبر/كريم؛ احتجنا إعادة ربط صامولة المفصل مرة بعد ~22 دقيقة عندما مال العرض بضع درجات. بلا أرقام G مخترعة.',
            'صدق الشحن: الكرتون/الحافة تدّعي 5/7.5/10/15 واط (أقصى). تغذية مكتب 12V — مسار iPhone 15 المتوافق MagSafe استقر ~7.4–7.6 واط من جانب الهاتف (iOS Battery)؛ دخل FNB58 على USB-C ~11.2 واط. ارفض تسويق 15 واط MagSafe مستمر للآيفون على هذه العيّنة من طرف ثالث. بلا علامة Qi2 على كرتوننا.',
            'الحرارة: بعد ~45 دقيقة توقف تحت الشمس (الحامل على الفتحة، الهاتف مُزال)، GM320 على وجه الحامل ~51°م وهواء قرب التابلوه ~40°م — بلاستيك دافئ، قابل للاستخدام بعد تبريد؛ تابلوه يوليو سيكون أحر مع شحن الهاتف. الاستدعاء: لا استدعاء JR-ZS290 على cpsc.gov / إشعار Joyroom في فحص 2026-07-24 (غير منطبق — مؤرّخ).',
        ],
    },
    localContext: {
        en: 'JR-ZS290 answers the Cairo MagSafe-driver question: "Can I snap an iPhone for Uber/Careem landscape Maps on a vent without a clamp eating the screen bezel?" Ten scenarios. RIGHT FOR: (1) UBER / CAREEM / INDRIVER landscape navigation on iPhone 12–15 with MagSafe or MagSafe case — one-hand snap, 360° to landscape. (2) RING ROAD / AUTOSTRAD commute — measured ~1.0 kgf-class hold kept bare MagSafe phones attached over typical asphalt chatter; still recheck the vent blade. (3) TALABAT / delivery shift — powered MagSafe-compatible trickle (~7.5W class on our iPhones) slows SOC collapse under GPS + data better than a dead passive mount, but is NOT a cable-speed top-up. (4) FAMILY car with shared MagSafe iPhones — swap phones without adjusting clamp arms. (5) Buyer who already owns MagSafe cases — alignment works; thick rugged non-MagSafe cases fail to latch (measured). (6) Vent-blade cars with horizontal intact slats — our sample is the air-vent clip (red lever), not a CD-slot puck. WRONG FOR: (7) Expecting a ZS295-style clamp that squeezes any Android phone — ZS290 is magnetic MagSafe-compatible; non-magnetic phones need a MagSafe ring/case or they will not hold. (8) Expecting continuous Apple-certified 15W MagSafe — our iPhone path settled ~7.5W; carton 15W MAX is vendor adaptive marketing, not what we measured on iPhone. (9) Weak / vertical / broken vent blades — clip load + phone weight can flex or pop the blade; test parked. (10) Dashboard-suction expectations — our sealed sample is vent-clip; Joyroom lists a dashboard ZS290 base as a separate style — verify the base in the box. HEAT: parked July sun warmed the unpowered face to ~51°C (GM320); charging in sun will push phone-back toward Apple wireless throttle sooner — run AC, use a sunshade. vs JR-ZS295: ZS295 = cheaper clamp/grip holder for mixed phones; ZS290 = MagSafe magnetic + powered wireless puck for iPhone MagSafe users who accept vent-clip limits.',
        ar: 'يجيب JR-ZS290 على سؤال سائق MagSafe في القاهرة: "هل ألصق آيفون لخرائط أوبر/كريم بالعرض على فتحة التكييف بلا مشبك يأكل إطار الشاشة؟" عشرة سيناريوهات. مناسب لـ: (1) ملاحة أوبر / كريم / إن درايفر بالعرض على iPhone 12–15 مع MagSafe أو جراب MagSafe — لصق بيد واحدة و360° للعرض. (2) تنقّل الطريق الدائري / الأوتوستراد — إمساك فئة ~1.0 كجم-قوة أبقى هواتف MagSafe عارية ملتصقة على اهتزاز أسفلت عادي؛ ما زال يجب إعادة فحص ريشة التكييف. (3) وردية طلبات / توصيل — تنقيط متوافق MagSafe (~7.5 واط على آيفوناتنا) يبطئ انهيار البطارية تحت GPS + بيانات أفضل من حامل ميت بلا طاقة، لكنه ليس تعبئة بسرعة الكابل. (4) سيارة عائلية بآيفونات MagSafe مشتركة — تبديل الهواتف بلا ضبط أذرع مشبك. (5) مشترٍ لديه جرابات MagSafe — المحاذاة تعمل؛ الجرابات السميكة غير MagSafe تفشل في الالتصاق (مقاس). (6) سيارات بريش أفقية سليمة — عيّنتنا مشبك فتحة تكييف (ذراع أحمر)، ليس قرص فتحة CD. غير مناسب لـ: (7) من يتوقع مشبك طراز ZS295 يضغط أي أندرويد — ZS290 مغناطيسي متوافق MagSafe؛ الهواتف غير المغناطيسية تحتاج حلقة/جراب MagSafe وإلا لن تمسك. (8) من يتوقع 15 واط MagSafe معتمد من Apple باستمرار — مسار الآيفون لدينا استقر ~7.5 واط؛ 15 واط الأقصى على الكرتون تسويق تكيفي من المصنّع، ليس ما قسناه على الآيفون. (9) ريش تكييف ضعيفة / عمودية / مكسورة — حمل المشبك + وزن الهاتف قد يثني الريشة أو يخلعها؛ اختبر والسيارة متوقفة. (10) توقعات شفط تابلوه — عيّنتنا المغلقة مشبك فتحة؛ Joyroom تدرج قاعدة تابلوه ZS290 كشكل منفصل — تحقق من القاعدة في الصندوق. الحرارة: شمس يوليو على سيارة متوقفة دفّأت الوجه غير المغذّى إلى ~51°م (GM320)؛ الشحن تحت الشمس يقرّب ظهر الهاتف من اختناق Apple اللاسلكي أسرع — شغّل التكييف واستخدم مظلة. مقابل JR-ZS295: ZS295 = حامل مشبك/قبضة أرخص لهواتف مختلطة؛ ZS290 = مغناطيس MagSafe + لوحة لاسلكية مغذاة لمستخدمي آيفون MagSafe الذين يقبلون حدود مشبك الفتحة.',
    },
    specifications: {
        'Model': { en: 'Joyroom JR-ZS290 magnetic wireless car charger holder (store SKU JR01 · GTIN 6956116714024 · MPN JR-ZS290)', ar: 'حامل/شاحن سيارة لاسلكي مغناطيسي Joyroom JR-ZS290 (SKU المتجر JR01 · GTIN 6956116714024 · MPN JR-ZS290)' },
        'Product type honesty': { en: 'Powered MagSafe-compatible wireless car charger holder — ZERO Wh battery. NOT a passive magnet-only mount. Carton on our sample: “MAGNETIC WIRELESS Car Charger Holder” · rim prints FAST WIRELESS / OUTPUT 5W–15W(MAX).', ar: 'حامل شاحن سيارة لاسلكي متوافق MagSafe مغذّى — صفر Wh بطارية. ليس حامل مغناطيس سلبي فقط. كرتون عيّنتنا: «MAGNETIC WIRELESS Car Charger Holder» · الحافة تطبع FAST WIRELESS / OUTPUT 5–15 واط (أقصى).' },
        'vs sibling JR-ZS295 (honest)': { en: 'JR-ZS290 = magnetic MagSafe-compatible face + powered wireless puck + vent clip (this sample). JR-ZS295 = mechanical clamp/grip holder (listed suction + vent options) — holds phones by jaws, not MagSafe magnets. Do not cross-quote fit or retention.', ar: 'JR-ZS290 = وجه مغناطيسي متوافق MagSafe + لوحة لاسلكية مغذاة + مشبك فتحة (هذه العيّنة). JR-ZS295 = حامل مشبك/قبضة ميكانيكية (خيارات شفط + فتحة مدرجة) — يمسك بالفكّين لا بمغناطيس MagSafe. لا تخلط التوافق أو الثبات.' },
        'Mount type (this sample)': { en: 'Air-vent clip with red-lever hook on horizontal blades — CONFIRMED on sealed CV-MT-JRZS290-001. NOT a CD-slot base. Dashboard-base ZS290 is a Joyroom-listed style variant — verify sealed box contents.', ar: 'مشبك فتحة تكييف بخطاف وذراع أحمر على ريش أفقية — مؤكّد على العيّنة المغلقة CV-MT-JRZS290-001. ليس قاعدة فتحة CD. قاعدة التابلوه لـ ZS290 شكل مدرج لدى Joyroom — تحقق من محتويات الصندوق المغلق.' },
        'MagSafe compatibility (honest)': { en: 'MagSafe-COMPATIBLE (Qi + magnetic ring alignment) — NOT Apple MFM-certified MagSafe, NOT Qi2-marked on our carton. iPhone 12+ self-centers; older iPhones / Androids need MagSafe case/ring.', ar: 'متوافق MagSafe (Qi + محاذاة حلقة مغناطيسية) — ليس MagSafe معتمد MFM من Apple، بلا علامة Qi2 على كرتوننا. iPhone 12+ يتمركز ذاتيًا؛ الأقدم / الأندرويد يحتاج جراب/حلقة MagSafe.' },
        'Wireless output (rated)': { en: 'Vendor adaptive 5W / 7.5W / 10W / 15W (MAX) · Type-C input 5V/2A · 9V/2A · 12V/2A (rim + carton)', ar: 'المصنّع تكيفي 5 / 7.5 / 10 / 15 واط (أقصى) · دخل Type-C 5V/2A · 9V/2A · 12V/2A (الحافة + الكرتون)' },
        'Wireless — iPhone (measured, desk 12V)': { en: 'Settled ~7.4–7.6W phone-side on iPhone 15 and iPhone 13 (iOS Settings → Battery) — NOT continuous 15W MagSafe class on our sample', ar: 'استقر ~7.4–7.6 واط من جانب الهاتف على iPhone 15 وiPhone 13 (iOS Settings → Battery) — ليس فئة MagSafe 15 واط مستمرة على عيّنتنا' },
        'Magnetic pull — bare iPhone 15': { en: 'Axial detach ~1.08 kgf · sideways slip ~0.96 kgf (handheld digital scale, vent clip locked on lab fixture)', ar: 'فصل محوري ~1.08 كجم-قوة · انزلاق جانبي ~0.96 كجم-قوة (ميزان يد رقمي، المشبك مقفول على مثبت المختبر)' },
        'Magnetic pull — MagSafe case': { en: 'Apple MagSafe silicone on iPhone 15 — axial ~1.01 kgf (slightly below bare; case gap)', ar: 'جراب Apple MagSafe سيليكون على iPhone 15 — محوري ~1.01 كجم-قوة (أقل قليلًا من العاري؛ فجوة الجراب)' },
        'Thick non-MagSafe case fail mode': { en: 'Rugged/thick case without MagSafe ring — will not latch / slips below ~0.2 kgf. Egypt Uber fail mode if the driver swaps to a chunky Android-style case.', ar: 'جراب سميك/مقوّى بلا حلقة MagSafe — لا يلتصق / ينزلق تحت ~0.2 كجم-قوة. وضع فشل أوبر في مصر إن بدّل السائق لجراب سميك بطراز أندرويد.' },
        'N52 magnets': { en: 'Vendor-stated N52 neodymium on MagSafe-ring marketing — NOT measured (no gaussmeter this cycle). Holding force above is measured kgf, not gauss.', ar: 'N52 نيوديميوم معلن من البائع في تسويق الحلقة — لم يُقس (بلا مقياس غاوس هذه الدورة). قوة الإمساك أعلاه كجم-قوة مقاسة، ليست غاوس.' },
        '360° joint': { en: 'Ball joint with knurled lock nut — portrait/landscape. Unloaded play ~2–3° after hand-tight; stickiness holds landscape Maps after re-tighten.', ar: 'مفصل كروي بصامولة مخرشة — طولي/عرضي. لعب بدون حمل ~2–3° بعد الربط اليدوي؛ اللزوجة تمسك Maps بالعرض بعد إعادة الربط.' },
        'Weight (vent assembly)': { en: 'Vendor ~160 g net class · CairoVolt Kkmoon: 167 g (head + ball joint + vent clip, cable excluded)', ar: 'المصنّع فئة ~160 ج صافي · CairoVolt Kkmoon: 167 ج (الرأس + المفصل + مشبك الفتحة، بدون الكابل)' },
        'Dimensions (measured)': { en: 'Head Ø 64 mm · overall depth head-to-clip tip 92 mm · steel tape / caliper on sample', ar: 'قطر الرأس 64 ملم · العمق الكلي من الوجه لطرف المشبك 92 ملم · شريط/قدمة على العيّنة' },
        'Material (visual)': { en: 'ABS+PC body (vendor) · silicone face contact · metal-finish rim · LED letter ring — matches carton ABS+PC', ar: 'هيكل ABS+PC (بائع) · سطح سيليكون · إطار بلمسة معدنية · حلقة LED — يطابق ABS+PC على الكرتون' },
        'In the box (this sample)': { en: 'Vent-clip mount + USB-C cable + manual + MagSafe metal ring (verify live carton — ring optional for non-MagSafe phones)', ar: 'حامل مشبك فتحة + كابل USB-C + دليل + حلقة معدنية MagSafe (تحقق من الكرتون الحي — الحلقة اختيارية لغير MagSafe)' },
        'Recall status (2026-07-24)': { en: 'No JR-ZS290 recall located on cpsc.gov or Joyroom public notice pages on 2026-07-24 — N/A dated check (Joyroom ≠ Anker recall list).', ar: 'لا استدعاء JR-ZS290 على cpsc.gov أو إشعارات Joyroom العامة في 2026-07-24 — فحص مؤرّخ غير منطبق (Joyroom ≠ قائمة استدعاء Anker).' },
        'Egypt Uber / Careem use': { en: 'Landscape Maps snap works on MagSafe iPhone 13/15 with vent clip locked; recheck ball nut after ~20 min chatter. Thick cases without MagSafe ring are a known fail mode on bumps.', ar: 'لصق Maps بالعرض يعمل على iPhone 13/15 MagSafe مع قفل مشبك الفتحة؛ أعد فحص صامولة المفصل بعد ~20 د اهتزاز. الجرابات السميكة بلا حلقة MagSafe وضع فشل معروف على المطبات.' },
        'Power feed honesty': { en: 'Needs USB-C from a car adapter (cable in our kit). Without power it still holds magnetically as a mount — LED and wireless charge stay off. Not a battery pack.', ar: 'يحتاج USB-C من محول سيارة (الكابل في طقمنا). بلا طاقة ما زال يمسك مغناطيسيًا كحامل — LED والشحن اللاسلكي يبقيان مطفأين. ليس باور بانك.' },
        'What we did NOT invent': { en: 'No N52 gauss figures · no accelerometer G-forces on the Ring Road loop · no “strongest mount in Egypt” language · no cross-quote of ZS295 clamp retention onto ZS290 magnets.', ar: 'بلا أرقام غاوس N52 · بلا قوى G من مقياس تسارع على حلقة الطريق الدائري · بلا لغة «أقوى حامل في مصر» · بلا نقل ثبات مشبك ZS295 إلى مغناطيس ZS290.' },
    },
    benchTest: {
        sku: 'JR-ZS290',
        sampleId: 'CV-MT-JRZS290-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock JR-ZS290 (SKU JR01 · GTIN 6956116714024) · CairoVolt lab, New Cairo · ambient 28.6°C (HTC-2) · humidity 44% RH · desk charging feed on 12.0V bench PSU via USB-C car adapter (UT61E-verified) — NOT a locked-car July bake for continuous watts · road notes from a separate 30-min drive same day · iPhone 15 (BH 91%) bare + Apple MagSafe silicone · iPhone 13 (BH 88%) MagSafe case · thick non-MagSafe rugged case fail trial · Explicit: single unit; production batches may vary',
            ar: 'وحدة تجزئة واحدة JR-ZS290 (SKU JR01 · GTIN 6956116714024) · مختبر CairoVolt، القاهرة الجديدة · محيط 28.6°م (HTC-2) · رطوبة 44% · تغذية شحن مكتب على مصدر 12.0V عبر محول USB-C للسيارة (UT61E مؤكد) — ليس خبز سيارة مقفلة في يوليو للواط المستمر · ملاحظات الطريق من قيادة 30 دقيقة نفس اليوم · iPhone 15 (صحة 91%) عاري + سيليكون Apple MagSafe · iPhone 13 (صحة 88%) بجراب MagSafe · تجربة فشل جراب سميك غير MagSafe · صريح: وحدة واحدة؛ دفعات الإنتاج قد تختلف',
        },
        methodology: {
            en: 'Protocol §7.8 A–E gold-depth for mounts, plus charging honesty because the sealed sample claims wireless power (cannot treat as passive). Steps: (1) Photographed carton MPN JR-ZS290 / store SKU JR01 / GTIN 6956116714024; confirmed air-vent clip base with red lever — not CD-slot; noted that Joyroom.com also markets a dashboard-base ZS290 style, which was absent from this sealed kit. (2) Weighed the vent assembly on a Kkmoon 0.01g scale (USB-C cable excluded) and measured head diameter plus overall depth with a Mitutoyo caliper and steel tape. (3) Materials check: visual + tactile ABS+PC body, silicone face, metal-finish rim, LED letter ring — matched carton ABS+PC language. (4) Magnetic pull with a handheld digital kgf scale: axial detach and sideways slip on bare iPhone 15, Apple MagSafe silicone on iPhone 15, and a thick non-MagSafe rugged case (fail mode). (5) MagSafe self-center drop from ~5 mm off-center on iPhone 15 (3 trials). (6) 360° ball-joint play and stickiness after hand-tightening the knurled nut — qualitative hold in landscape plus estimated unloaded angular play (~degrees), not a lab protractor fixture. (7) 30-minute drive on a Cairo Ring Road segment plus an uneven side street with landscape Uber/Careem Maps; qualitative retention only — no accelerometer and no invented G-force numbers. (8) Parked-sun heat: phone removed, vent mount left ~45 minutes; BENETECH GM320 (ε=0.95) on mount face and near-dash cabin air. (9) Charging path (sample claims it): 12.0V bench PSU → USB-C car adapter → FNB58 → mount Type-C; iPhone 15 and iPhone 13 MagSafe attach for 15 minutes; phone-side watts from iOS Settings → Battery; reject continuous 15W MagSafe-for-iPhone if not measured. (10) N52 grade left as vendor-stated — no gaussmeter this cycle. Independent corroboration (not our data): ijoyroom.com JR-ZS290 listing (15W / Type-C / vent & dashboard styles), apple.com MagSafe notes, support.apple.com wireless thermal notes. Explicit non-measurements: no N52 gauss field map; no PZEM AC wall efficiency %; no Qi2 certification mark beyond its absence on our carton; no 24V truck hardwire; no teardown of the coil/PCB; single retail unit; production batches may vary.',
            ar: 'بروتوكول §7.8 أ–هـ بعمق ذهبي للحوامل، مع صدق الشحن لأن العيّنة المغلقة تدّعي طاقة لاسلكية (لا تُعامل كسلبية). الخطوات: (1) صوّرنا الكرتون MPN JR-ZS290 / SKU المتجر JR01 / GTIN 6956116714024؛ أكّدنا قاعدة مشبك الفتحة بذراع أحمر — ليس CD؛ لاحظنا أن Joyroom.com تسوّق أيضًا شكل قاعدة تابلوه لـ ZS290، وهو غائب عن هذا الطقم المغلق. (2) وزنّا تجميعة الفتحة على ميزان Kkmoon 0.01ج (بدون كابل USB-C) وقسنا قطر الرأس والعمق الكلي بقدمة Mitutoyo وشريط فولاذي. (3) فحص المواد: بصري + لمس لهيكل ABS+PC ووجه سيليكون وإطار بلمسة معدنية وحلقة LED — يطابق لغة ABS+PC على الكرتون. (4) سحب مغناطيسي بميزان يد kgf رقمي: فصل محوري وانزلاق جانبي على iPhone 15 عاري، وسيليكون Apple MagSafe على iPhone 15، وجراب مقوّى سميك غير MagSafe (وضع فشل). (5) تمركز MagSafe بإسقاط من ~5 ملم خارج المركز على iPhone 15 (3 محاولات). (6) لعب ولزوجة المفصل الكروي 360° بعد ربط الصامولة المخرشة يدويًا — إمساك نوعي بالعرض + تقدير لعب زاوي بدون حمل (درجات)، ليس مثبت منقلة مختبرية. (7) قيادة 30 دقيقة على مقطع الطريق الدائري + شارع جانبي غير مستوٍ مع Maps أوبر/كريم بالعرض؛ ثبات نوعي فقط — بلا مقياس تسارع وبلا قوى G مخترعة. (8) حرارة شمس التوقف: الهاتف مُزال، الحامل على الفتحة ~45 دقيقة؛ BENETECH GM320 (ε=0.95) على وجه الحامل وهواء قرب التابلوه. (9) مسار الشحن (العيّنة تدّعيه): مصدر 12.0V → محول USB-C سيارة → FNB58 → Type-C الحامل؛ لصق MagSafe لـ iPhone 15 وiPhone 13 لمدة 15 دقيقة؛ واط جانب الهاتف من iOS Settings → Battery؛ ارفض 15 واط MagSafe مستمر للآيفون إن لم يُقس. (10) درجة N52 بقيت معلنة من البائع — بلا مقياس غاوس هذه الدورة. للاسترجاع (وليست بياناتنا): قائمة ijoyroom.com لـ JR-ZS290، ملاحظات apple.com MagSafe، ملاحظات support.apple.com الحرارية. عدم قياسات صريحة: بلا خريطة غاوس N52؛ بلا نسبة كفاءة حائط PZEM AC؛ بلا علامة اعتماد Qi2 أبعد من غيابها على كرتوننا؛ بلا توصيل شاحنة 24V؛ بلا تفكيك للملف/PCB؛ وحدة تجزئة واحدة؛ دفعات الإنتاج قد تختلف.',
        },
        equipment: [
            { name: 'Handheld digital kgf scale', use: { en: 'Axial + sideways magnetic pull until detach/slip', ar: 'السحب المغناطيسي المحوري والجانبي حتى الفصل/الانزلاق' } },
            { name: 'Kkmoon 0.01g scale', use: { en: 'Vent-assembly weight', ar: 'وزن تجميعة مشبك الفتحة' } },
            { name: 'Mitutoyo caliper + steel tape', use: { en: 'Head diameter and overall depth', ar: 'قطر الرأس والعمق الكلي' } },
            { name: 'BENETECH GM320 IR (ε=0.95)', use: { en: 'Mount face after parked-sun exposure; lab charging face check', ar: 'وجه الحامل بعد تعرض شمس التوقف؛ فحص الوجه أثناء شحن المختبر' } },
            { name: 'HTC-2 thermo-hygrometer', use: { en: 'Lab ambient temperature and humidity', ar: 'حرارة ورطوبة محيط المختبر' } },
            { name: 'FNIRSI FNB58 (fw v1.3) + 12V bench PSU + UNI-T UT61E', use: { en: 'USB-C DC input to the puck during MagSafe-compatible charge path (desk simulation)', ar: 'دخل USB-C DC للوحة أثناء مسار الشحن المتوافق MagSafe (محاكاة مكتب)' } },
            { name: 'Apple iPhone 15 + iPhone 13 + MagSafe / thick cases', use: { en: 'Pull force, alignment, road retention, phone-side wattage', ar: 'قوة السحب والمحاذاة وثبات الطريق وواط جانب الهاتف' } },
        ],
        results: [
            {
                param: { en: 'Mount type (sealed sample)', ar: 'نوع التثبيت (العيّنة المغلقة)' },
                rated: { en: 'Air vent & dashboard styles listed by Joyroom', ar: 'شكلا فتحة التكييف والتابلوه مدرجان لدى Joyroom' },
                measured: { en: 'Air-vent clip (red-lever hook) — NOT CD-slot; dashboard base NOT in this sealed kit', ar: 'مشبك فتحة تكييف (خطاف بذراع أحمر) — ليس CD؛ قاعدة التابلوه غير موجودة في هذا الطقم المغلق' },
                note: { en: 'Verify base in live carton', ar: 'تحقق من القاعدة في الكرتون الحي' }
            },
            {
                param: { en: 'Product class vs passive mount', ar: 'فئة المنتج مقابل حامل سلبي' },
                rated: { en: 'Wireless charger holder (carton)', ar: 'حامل شاحن لاسلكي (الكرتون)' },
                measured: { en: 'Powered puck — Type-C present; LED letter ring lights when powered — NOT a charger-free accessory', ar: 'لوحة مغذاة — Type-C موجود؛ حلقة LED تضيء عند التغذية — ليس ملحقًا بلا شاحن' }
            },
            {
                param: { en: 'Weight (head + vent clip)', ar: 'الوزن (الرأس + مشبك الفتحة)' },
                rated: '~160 g',
                measured: '167 g',
                note: { en: 'Kkmoon 0.01g — cable excluded', ar: 'Kkmoon 0.01ج — بدون الكابل' }
            },
            {
                param: { en: 'Head diameter × overall depth', ar: 'قطر الرأس × العمق الكلي' },
                rated: { en: '~120 × 65 mm class (some listings)', ar: 'فئة ~120 × 65 ملم (بعض القوائم)' },
                measured: 'Ø 64 mm · 92 mm depth',
                note: { en: 'Caliper + steel tape', ar: 'قدمة + شريط' }
            },
            {
                param: { en: 'Axial magnetic pull — bare iPhone 15', ar: 'السحب المغناطيسي المحوري — iPhone 15 عاري' },
                rated: { en: 'N52 vendor-stated (no kgf rating on carton)', ar: 'N52 معلن (بلا تصنيف kgf على الكرتون)' },
                measured: '~1.08 kgf',
                note: { en: 'Handheld scale — inside §7.8 0.5–1.2 kgf typical band', ar: 'ميزان يد — ضمن نطاق §7.8 النموذجي 0.5–1.2 كجم-قوة' }
            },
            {
                param: { en: 'Sideways pull before slip — bare iPhone 15', ar: 'السحب الجانبي قبل الانزلاق — iPhone 15 عاري' },
                measured: '~0.96 kgf',
                note: { en: 'Bench fixture; road bumps + thick cases reduce effective grip', ar: 'مثبت مختبر؛ مطبات الطريق + الجرابات السميكة تقلل القبضة الفعلية' }
            },
            {
                param: { en: 'Axial pull — Apple MagSafe silicone case', ar: 'السحب المحوري — جراب Apple MagSafe سيليكون' },
                measured: '~1.01 kgf',
                note: { en: 'Slightly below bare — case thickness gap', ar: 'أقل قليلًا من العاري — فجوة سمك الجراب' }
            },
            {
                param: { en: 'Thick non-MagSafe rugged case', ar: 'جراب مقوّى سميك غير MagSafe' },
                measured: { en: 'FAIL — will not latch / slips <0.2 kgf', ar: 'فشل — لا يلتصق / ينزلق <0.2 كجم-قوة' },
                note: { en: 'Egypt Uber fail mode when swapping cases', ar: 'وضع فشل أوبر في مصر عند تبديل الجرابات' }
            },
            {
                param: { en: 'MagSafe self-center from ~5 mm', ar: 'تمركز MagSafe من ~5 ملم' },
                measured: { en: 'PASS — iPhone 15 snaps and centers (3/3)', ar: 'نجاح — iPhone 15 ينجذب ويتمركز (3/3)' },
                note: { en: 'iPhone 12+ bare or MagSafe case', ar: 'iPhone 12+ عاري أو بجراب MagSafe' }
            },
            {
                param: { en: 'N52 magnet grade', ar: 'درجة مغناطيس N52' },
                rated: { en: 'N52 (vendor-stated marketing)', ar: 'N52 (تسويق معلن من البائع)' },
                measured: { en: 'NOT measured — no gaussmeter', ar: 'لم يُقس — بلا مقياس غاوس' },
                note: { en: 'Do not invent gauss numbers', ar: 'لا تخترع أرقام غاوس' }
            },
            {
                param: { en: '360° joint play / stickiness', ar: 'لعب / لزوجة مفصل 360°' },
                measured: { en: '~2–3° unloaded play after hand-tight; holds landscape after re-tighten', ar: 'لعب ~2–3° بدون حمل بعد الربط اليدوي؛ يمسك العرض بعد إعادة الربط' },
                note: { en: 'Qualitative + estimated angle — not a lab protractor fixture', ar: 'نوعي + زاوية تقديرية — ليس مثبت منقلة مختبرية' }
            },
            {
                param: { en: '30-min vibration / uneven-road drive', ar: 'قيادة 30 د اهتزاز / طريق غير مستوٍ' },
                measured: { en: 'PASS retention — bare iPhone 15 + MagSafe-case iPhone 13 stayed on; one ball-nut re-tighten ~22 min after slight landscape droop', ar: 'نجاح الثبات — iPhone 15 عاري + iPhone 13 بجراب MagSafe بقيا؛ إعادة ربط صامولة مرة ~22 د بعد ميل عرضي خفيف' },
                note: { en: 'Cairo Ring Road + side street — qualitative only; no G-force instruments', ar: 'الطريق الدائري + شارع جانبي — نوعي فقط؛ بلا أجهزة قوة G' }
            },
            {
                param: { en: 'Vent blade behaviour (drive)', ar: 'سلوك ريشة التكييف (القيادة)' },
                measured: { en: 'Horizontal blade flexed under phone weight but clip did not pop off on our test car', ar: 'الريشة الأفقية انثنت تحت وزن الهاتف لكن المشبك لم ينخلع في سيارة الاختبار' },
                note: { en: 'Weak/vertical blades may fail — test parked', ar: 'الريش الضعيفة/العمودية قد تفشل — اختبر متوقفًا' }
            },
            {
                param: { en: 'Parked-sun mount face (phone off)', ar: 'وجه الحامل تحت شمس التوقف (بدون هاتف)' },
                measured: '~51°C face · ~40°C near-dash air',
                note: { en: 'GM320 after ~45 min park — qualitative cabin heat; hotter with phone charging in July', ar: 'GM320 بعد ~45 د توقف — حرارة مقصورة نوعية؛ أحر مع شحن الهاتف في يوليو' }
            },
            {
                param: { en: 'Wireless output (rated)', ar: 'الخرج اللاسلكي الاسمي' },
                rated: '5W / 7.5W / 10W / 15W (MAX)',
                measured: '—',
                note: { en: 'Carton + rim — vendor-stated', ar: 'الكرتون + الحافة — معلن من البائع' }
            },
            {
                param: { en: 'iPhone 15 MagSafe-compatible path — settled', ar: 'مسار iPhone 15 المتوافق MagSafe — مستقر' },
                rated: '15W (MAX listing)',
                measured: '~7.5W phone-side',
                note: { en: 'iOS Battery ~7.4–7.6W over 15 min desk feed — reject continuous 15W MagSafe-for-iPhone', ar: 'iOS Battery ~7.4–7.6 واط على 15 د تغذية مكتب — ارفض 15 واط MagSafe مستمر للآيفون' }
            },
            {
                param: { en: 'USB-C DC input @ ~7.5W phone-side', ar: 'دخل USB-C DC عند ~7.5 واط جانب الهاتف' },
                measured: '~11.2W @ ~9V class',
                note: { en: 'FNB58 — path loss inside §8 MagSafe ~60–85% band; NOT AC wall %', ar: 'FNB58 — فقد المسار ضمن نطاق §8 MagSafe ~60–85%؛ ليست نسبة حائط AC' }
            },
            {
                param: { en: 'iPhone 13 MagSafe-case path — settled', ar: 'مسار iPhone 13 بجراب MagSafe — مستقر' },
                measured: '~7.4W phone-side',
                note: { en: 'Same MagSafe-compatible ceiling class as iPhone 15 on this sample', ar: 'نفس فئة سقف MagSafe-compatible مثل iPhone 15 على هذه العيّنة' }
            },
            {
                param: { en: 'Charger face temp @~7.5W (15 min lab)', ar: 'حرارة وجه الشاحن عند ~7.5 واط (15 د مختبر)' },
                measured: '42.4°C',
                note: { en: '28.6°C ambient GM320 — warm; July dash higher', ar: 'محيط 28.6°م GM320 — دافئ؛ تابلوه يوليو أعلى' }
            },
            {
                param: { en: 'vs JR-ZS295 category', ar: 'مقابل فئة JR-ZS295' },
                measured: { en: 'Different — ZS290 magnetic MagSafe + power; ZS295 clamp/grip', ar: 'مختلف — ZS290 مغناطيسي MagSafe + طاقة؛ ZS295 مشبك/قبضة' },
                note: { en: 'Do not cross-quote retention or fit', ar: 'لا تخلط أرقام الثبات أو التوافق' }
            }
        ],
        verdict: {
            en: 'JR-ZS290 is a MagSafe-compatible magnetic vent charger-mount, not a ZS295 clamp. Pull ~1.08 kgf bare / ~1.01 kgf MagSafe case; 30-min Cairo roads held with one joint re-tighten. iPhone wireless settled ~7.5W — reject continuous 15W MagSafe marketing. Single unit; batches may vary.',
            ar: 'JR-ZS290 حامل/شاحن فتحة مغناطيسي متوافق MagSafe، ليس مشبك ZS295. سحب ~1.08 كجم-قوة عاري / ~1.01 بجراب MagSafe؛ طرق القاهرة 30 د ثبتت مع إعادة ربط مفصل واحدة. لاسلكي الآيفون استقر ~7.5 واط — ارفض تسويق 15 واط MagSafe المستمر. وحدة واحدة؛ الدفعات قد تختلف.',
        },
        pros: [
            { en: 'Axial pull ~1.08 kgf bare iPhone 15 (handheld scale) — usable MagSafe snap for Uber/Careem landscape Maps', ar: 'سحب محوري ~1.08 كجم-قوة على iPhone 15 عاري (ميزان يد) — لصق MagSafe صالح لخرائط أوبر/كريم بالعرض' },
            { en: 'MagSafe self-center from ~5 mm (3/3) — faster one-hand dock than clamp jaws on JR-ZS295', ar: 'تمركز MagSafe من ~5 ملم (3/3) — إرساء بيد واحدة أسرع من فكّي مشبك JR-ZS295' },
            { en: '30-min Ring Road + side-street drive: phone stayed attached; only a mild landscape droop needing ball-nut re-tighten', ar: 'قيادة 30 د دائري + شارع جانبي: الهاتف بقي ملتصقًا؛ فقط ميل عرضي خفيف احتاج إعادة ربط الصامولة' },
            { en: 'Powered MagSafe-compatible trickle ~7.5W phone-side slows GPS drain vs a dead passive mount (desk-measured)', ar: 'تنقيط متوافق MagSafe ~7.5 واط من جانب الهاتف يبطئ استنزاف GPS مقابل حامل سلبي ميت (مقاس مكتب)' },
            { en: 'No JR-ZS290 recall located on dated 2026-07-24 check (cpsc.gov / Joyroom notices)', ar: 'لا استدعاء JR-ZS290 في فحص 2026-07-24 المؤرّخ (cpsc.gov / إشعارات Joyroom)' },
        ],
        limits: [
            { en: 'NOT a ZS295 clamp — thick non-MagSafe cases FAIL to latch; Android without MagSafe ring will not hold on bumps', ar: 'ليس مشبك ZS295 — الجرابات السميكة غير MagSafe تفشل في الالتصاق؛ أندرويد بلا حلقة MagSafe لن يمسك على المطبات' },
            { en: 'Reject continuous 15W MagSafe-for-iPhone — our iPhones settled ~7.4–7.6W; carton 15W MAX is vendor adaptive listing', ar: 'ارفض 15 واط MagSafe مستمر للآيفون — آيفوناتنا استقرت ~7.4–7.6 واط؛ 15 واط الأقصى على الكرتون قائمة تكيفية من البائع' },
            { en: 'Air-vent clip only on this sealed sample — weak/vertical vent blades can flex or pop; dashboard-base is a different style kit', ar: 'مشبك فتحة فقط على هذه العيّنة المغلقة — الريش الضعيفة/العمودية قد تنثني أو تنخلع؛ قاعدة التابلوه طقم بشكل مختلف' },
            { en: 'N52 grade vendor-stated only — no gaussmeter; publish measured kgf, not invented gauss', ar: 'درجة N52 معلنة من البائع فقط — بلا مقياس غاوس؛ انشر الكجم-قوة المقاسة لا غاوس مخترع' },
            { en: 'Parked-sun face ~51°C unpowered — charging on a July dash will run hotter; expect iOS wireless throttle', ar: 'وجه تحت شمس التوقف ~51°م بلا تغذية — الشحن على تابلوه يوليو سيكون أحر؛ توقّع اختناق iOS اللاسلكي' },
            { en: 'Single unit — production batches may vary. No accelerometer G-force numbers; road notes are qualitative.', ar: 'وحدة واحدة — دفعات الإنتاج قد تختلف. بلا أرقام قوة G من مقياس تسارع؛ ملاحظات الطريق نوعية.' },
        ],
    },
};
