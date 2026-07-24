// Details for: anker-zolo-usb-c-braided-cable  (Anker Zolo USB-C to USB-C, MPN A8060, 1.5m braided, listed 240W PD 3.1)
// Elevated gold deepen — Wave Mid product 1/8 · protocol §7.4 cables · §8 · §11
// Honesty gate: E-marker LIVE / EPR-capable on FNB58; 240W ceiling NOT bench-verified (no 48V/5A source or 240W load).
// A/B: vs Joyroom JR-S-CC100 (markets 100W, NO E-marker → honest ~60W/3A) and JR-S-CC60 (honest 60W non-E-marked).
// Preserved measured truths: 152 cm · 43 g · 0.20 V @ 3A · 58.6 W · 36.8°C mid · sample CV-CB-A8060-001 · Eng. Omar Khaled.
import type { ProductDetail } from './_types';

export const anker_zolo_usb_c_braided_cable_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Safety (2026-07-24): A8060 is NOT on Anker cable recall lists. Recalled Anker cable SKUs are A8482 / A8483 / A8465 (CPSC #24-187 class); A8060 is a different MPN — verified anker.com/product-recalls on 2026-07-24. CairoVolt is an independent retailer; the cable carries our store warranty.',
            'Anker Zolo A8060 is a 1.5m braided USB-C to USB-C cable that Anker lists at up to 240W USB-PD 3.1 EPR (48V/5A) with an E-marker and 8-core copper construction. CairoVolt confirmed the E-marker is live: FNIRSI FNB58 PD Info enumerated the cable as EPR-capable during negotiation — the USB-IF-mandatory precondition above 3A/60W (presence ≠ full 240W proof).',
            'Bench numbers preserved (sample CV-CB-A8060-001): tip-to-tip 152 cm · 43 g · V-drop 0.20 V at controlled 3A/5V (≈67 mΩ VBUS+GND) · peak carry 58.6 W stable 5 min at 20V/3A from Anker A2688 into JUWEI · mid-span 36.8°C / strain-relief 35.1°C after 10 min at 3A/5V · USB 2.0 data only.',
            'Honest limit: we did NOT independently verify 100W / 140W / 240W. That needs a 48V/5A EPR source and a 240W-rated load — neither is on the current roster (A2688 is PD 3.0 100W max; JUWEI is ~35W nominal). Publish Anker\'s 240W figure as vendor spec, not a CairoVolt measurement.',
            'A/B honesty vs Joyroom C-to-C gold siblings: JR-S-CC100 markets "100W PD" but FNB58 found NO E-marker → honest class ~60W/3A (57.9 W / 0.21 V). JR-S-CC60 is the honest non-E-marked 60W phone cable (58.4 W / 0.22 V / 39.7°C). A8060 is the opposite honesty case — E-marker present — so it is the laptop-forward pick; do not overpay if you only charge an iPhone (~20–27 W Apple ceiling).',
        ],
        ar: [
            'السلامة (2026-07-24): A8060 ليس على قوائم استرجاع كابلات انكر. موديلات الكابلات المستدعاة A8482 / A8483 / A8465 (فئة CPSC #24-187)؛ وA8060 MPN مختلف — تحقق anker.com/product-recalls في 2026-07-24. CairoVolt متجر تجزئة مستقل؛ والكابل يحمل ضمان المتجر.',
            'انكر زولو A8060 كابل USB-C إلى USB-C مضفر بطول 1.5 م تُدرجه انكر حتى 240 واط USB-PD 3.1 EPR (48V/5A) مع شريحة E-marker وسلك نحاس 8 نوى. أكّدت CairoVolt أن الشريحة حية: FNIRSI FNB58 PD Info عرّف الكابل كـ EPR-capable خلال التفاوض — الشرط الإلزامي من USB-IF فوق 3A/60 واط (الوجود ≠ إثبات الممر الكامل 240 واط).',
            'أرقام المنضدة المحفوظة (عيّنة CV-CB-A8060-001): طول 152 سم · وزن 43 ج · هبوط جهد 0.20 فولت عند سحب مضبوط 3A/5V (≈67 مللي أوم VBUS+GND) · ذروة منقولة 58.6 واط مستقرة 5 د عند 20V/3A من Anker A2688 إلى JUWEI · منتصف 36.8°م / تخفيف إجهاد 35.1°م بعد 10 د عند 3A/5V · بيانات USB 2.0 فقط.',
            'حد أمين: **لم** نتحقق مستقلًا من 100 واط / 140 واط / 240 واط. ذلك يحتاج مصدر EPR 48V/5A وحمل مصنّف 240 واط — لا يوجد أي منهما في المنظومة الحالية (A2688 حد PD 3.0 100 واط؛ JUWEI ~35 واط اسمي). انشر رقم 240 واط من انكر كمواصفة بائع، لا قياس CairoVolt.',
            'صدق A/B مقابل أشقاء Joyroom C-to-C الذهبية: JR-S-CC100 يسوق "100W PD" لكن FNB58 بلا E-marker → فئة أمينة ~60 واط/3A (57.9 واط / 0.21 فولت). JR-S-CC60 كابل هاتف 60 واط أمين بلا E-marker (58.4 واط / 0.22 فولت / 39.7°م). A8060 الحالة المعاكسة — E-marker موجودة — فهو خيار اللابتوب؛ لا تدفع أكثر إن كنت تشحن iPhone فقط (~20–27 واط سقف Apple).',
        ],
    },
    localContext: {
        en: 'CairoVolt is an independent retailer, not an authorized distributor; this cable carries our store warranty. Zolo A8060 (~790 EGP) sits above Joyroom JR-S-CC60 (~123 EGP) and above the marketed-but-honest-60W JR-S-CC100 because it adds two measured differentiators: (1) a live E-marker that FNB58 enumerates as EPR-capable during USB-PD 3.1 negotiation, and (2) thicker 8-core construction that pulls V-drop to 0.20 V at 3A over 1.5 m — 0.02 V better absolute drop than JR-S-CC60 despite being ~25% longer, and cooler mid-span (36.8°C vs 39.7°C CC60 / 40.1°C CC100 at the same 3A/5V load). Six Egypt scenarios. RIGHT FOR: (1) MACBOOK PRO 14" (M4, ~96W optimal) or MACBOOK PRO 16" (M4, ~140W ideal) OWNER with a matching 100W/140W Apple or GaN brick — E-marker + 5A-rated construction is the correct path; CairoVolt has NOT verified the full 100–240W corridor on this sample, so confirm on your own PD meter. (2) UBER / CAREEM DRIVER carrying MacBook Air/Pro + iPhone 15 — one cable covers laptop and phone; measured 152 cm routes cigarette-lighter to front seat. (3) VIDEO EDITOR / DEVELOPER with Samsung Galaxy S24 Ultra (45W PPS SFC 2.0) — 45W sits inside the cable envelope; S24 pulled 22–24W steady on our 45W PPS brick (phone/brick capped, not the cable). (4) FREELANCER on a dual-port GaN brick (Anker A2688 100W) — MacBook Pro on A8060 + phone on a 60W-class Joyroom sibling on port 2. (5) HIGH-DRAW PORTABLE MONITOR (Xreal / ASUS ZenScreen, 60–90W USB-C) — rating clears the load on paper; confirm with your dock\'s PD meter. (6) AUC/GUC STUDENT with a newer MacBook — one cable for multi-year campus use. WRONG FOR: (7) IPHONE-ONLY BUYER — Apple caps iPhone 15/16/17 wired peak ~20–27W (MacRumors); JR-S-CC60 at ~123 EGP hits the same wall. (8) BUYER WHO TRUSTED JR-S-CC100\'S "100W" BOX PRINT — that sibling has NO E-marker on FNB58; marketing ≠ 5A path. A8060 is the honest E-marked alternative in this A/B set. (9) DISPLAYPORT / EXTERNAL MONITOR / DeX VIDEO — USB 2.0 data only; buy Thunderbolt 4 or USB 3.2 Gen 2 video-rated. (10) EXPECTATION OF AN INDEPENDENT 240W LAB FIGURE — not reached this cycle. HEAT: Cairo July–August mean high ~35°C (WeatherSpark). Mid-span 36.8°C in a 28.4°C lab room (ΔT ≈ 8.4°C) — shade the cable on a sun-baked dashboard, never coil tightly under load. AUTHENTICITY: printed "A8060" on housing, slim aluminium connectors (Anker-listed 10 × 5.8 mm), Zolo box seal / Anker Innovations origin mark; verify at anker.com/verify when a serial is supplied. ELECTRICITY: fully charging a MacBook Air M2 (52.6Wh) from a 60W PD brick via this cable uses ≈0.070 kWh — about 15 piastres on the EgyptERA September 2024 tariff.',
        ar: 'CairoVolt متجر تجزئة مستقل وليس موزعًا معتمدًا؛ والكابل يحمل ضمان المتجر. زولو A8060 (~790 جنيه) يقع فوق Joyroom JR-S-CC60 (~123 جنيه) وفوق JR-S-CC100 المسوَّق 100 واط لكن الأمين ~60 واط لأنه يضيف مميّزين مقاسَين: (1) شريحة E-marker حية يعرّفها FNB58 كـ EPR-capable خلال تفاوض USB-PD 3.1، و(2) بنية 8 نوى أثخن تخفض هبوط الجهد إلى 0.20 فولت عند 3A على 1.5 م — أفضل بـ 0.02 فولت مطلقًا من JR-S-CC60 رغم أنه أطول بنحو 25%، وأبرد في المنتصف (36.8°م مقابل 39.7°م لـ CC60 / 40.1°م لـ CC100 عند نفس حمل 3A/5V). ستة سيناريوهات مصرية. مناسب لـ: (1) مالك MacBook Pro 14" (M4، ~96 واط مثالية) أو MacBook Pro 16" (M4، ~140 واط مثالية) مع طوبة Apple/GaN مطابقة 100/140 واط — E-marker + بنية مصنّفة 5A هي المسار الصحيح؛ **لم** تتحقق CairoVolt من الممر الكامل 100–240 واط على هذه العيّنة، فتحقق بجهاز PD خاص بك. (2) سائق Uber / كريم يحمل MacBook Air/Pro + iPhone 15 — كابل واحد يغطي اللابتوب والهاتف؛ 152 سم مقاسة تصل من ولاعة السيارة إلى المقعد الأمامي. (3) محرر فيديو / مطوّر بـ Samsung Galaxy S24 Ultra (45 واط PPS SFC 2.0) — 45 واط ضمن النطاق؛ S24 سحب 22–24 واط ثابتة من طوبة 45W PPS (السقف من الهاتف/الطوبة، لا الكابل). (4) عامل حر على طوبة GaN ثنائية المنفذ (Anker A2688 100W) — MacBook Pro على A8060 والهاتف على شقيق Joyroom فئة 60 واط على المنفذ الثاني. (5) شاشة محمولة عالية الاستهلاك (Xreal / ASUS ZenScreen، 60–90 واط USB-C) — التصنيف يتجاوز الحمل على الورق؛ أكّد بجهاز PD للقاعدة. (6) طالب AUC/GUC مع MacBook أحدث — كابل واحد لسنوات الحرم. غير مناسب لـ: (7) مشتري iPhone فقط — Apple تحد ذروة السلكي ~20–27 واط (MacRumors)؛ JR-S-CC60 بـ ~123 جنيه يبلغ نفس الجدار. (8) مشترٍ وثق بطباعة علبة JR-S-CC100 "100W" — ذلك الشقيق بلا E-marker على FNB58؛ التسويق ≠ مسار 5A. A8060 هو البديل الأمين بـ E-marker في مجموعة A/B هذه. (9) DisplayPort / شاشة خارجية / فيديو DeX — بيانات USB 2.0 فقط؛ اشترِ Thunderbolt 4 أو USB 3.2 Gen 2 مصنّف للفيديو. (10) توقع رقم مختبر مستقل لـ 240 واط — لم يُبلغ في هذه الدورة. الحرارة: متوسط عظمى القاهرة يوليو–أغسطس ~35°م (WeatherSpark). منتصف الكابل 36.8°م في غرفة 28.4°م (ΔT ≈ 8.4°م) — ظلّل الكابل على تابلوه مشمس ولا تلفّه بإحكام تحت الحمل. الأصالة: "A8060" مطبوع على المبيت، موصلات ألومنيوم نحيفة (مدرجة 10 × 5.8 مم)، ختم علبة Zolo / مصدر Anker Innovations؛ تحقق عبر anker.com/verify عند توفر رقم تسلسلي. الكهرباء: شحن MacBook Air M2 (52.6Wh) كاملًا من طوبة PD 60 واط عبر هذا الكابل ≈0.070 كيلوواط·ساعة — نحو 15 قرشًا بتعريفة EgyptERA سبتمبر 2024.',
    },
    specifications: {
        'Model': {
            en: 'Anker Zolo USB-C to USB-C braided cable · MPN A8060 · store SKU AK05 · 1.5m · listed 240W USB-PD 3.1 EPR',
            ar: 'كابل انكر زولو USB-C إلى USB-C مضفر · MPN A8060 · رمز المتجر AK05 · 1.5 م · مدرج 240 واط USB-PD 3.1 EPR',
        },
        'Category': {
            en: 'E-marked USB-C to USB-C · manufacturer-listed 240W PD 3.1 EPR (48V/5A) · CairoVolt verified E-marker presence + behaviour up to the 60W PDO only',
            ar: 'كابل USB-C إلى USB-C بشريحة E-marker · مدرج 240 واط PD 3.1 EPR (48V/5A) · تحقّقت CairoVolt من وجود E-marker والسلوك حتى PDO 60 واط فقط',
        },
        'Max Power (Anker-listed)': {
            en: 'Up to 240W USB-PD 3.1 EPR (48V/5A) — manufacturer specification; requires EPR-capable source and device to reach that ceiling',
            ar: 'حتى 240 واط USB-PD 3.1 EPR (48V/5A) — مواصفة الشركة؛ يتطلب مصدرًا وجهازًا EPR-capable للوصول إلى ذلك السقف',
        },
        'Max Power (CairoVolt-verified this cycle)': {
            en: '58.6W measured stable 5 min at 20V/3A into JUWEI from Anker A2688 100W GaN — full 60W PDO carried cleanly; 100W / 140W / 240W ceilings NOT verified (source/load limitation)',
            ar: '58.6 واط مقاسة مستقرة 5 د عند 20V/3A في JUWEI من Anker A2688 100W GaN — PDO 60 واط الكامل نُقل بنظافة؛ سقوف 100 / 140 / 240 واط **لم** تُتحقق (قيد المصدر/الحمل)',
        },
        'E-marker': {
            en: 'Present — FNB58 PD Info identified EPR-capable during PD negotiation. USB-IF-mandatory for any cable claim above 3A/60W (§7.4 / §11.1)',
            ar: 'موجودة — FNB58 PD Info عرّف EPR-capable خلال تفاوض PD. إلزامية من USB-IF لأي ادعاء كابل فوق 3A/60 واط (§7.4 / §11.1)',
        },
        'Data Speed': {
            en: 'USB 2.0 (480Mbps) — charge and sync only; no DisplayPort/Alt-mode, no USB 3 or Thunderbolt video',
            ar: 'USB 2.0 (480 ميغابت/ث) — شحن ومزامنة فقط؛ بلا DisplayPort/Alt-mode، ولا فيديو USB 3 أو Thunderbolt',
        },
        'Connectors': {
            en: 'Dual USB-C · slim aluminium housings (Anker-listed 10 × 5.8 mm) · reinforced strain relief',
            ar: 'طرفان USB-C · مبيتات ألومنيوم نحيفة (مدرجة من انكر 10 × 5.8 مم) · تخفيف إجهاد معزّز',
        },
        'Length': {
            en: '1.5m listed — CairoVolt fiberglass tape 152 cm tip-to-tip (±5 cm band)',
            ar: '1.5 م في القائمة — مازورة زجاجية CairoVolt 152 سم من طرف إلى طرف (نطاق ±5 سم)',
        },
        'Weight': {
            en: '42g listed — CairoVolt 0.01g scale 43g',
            ar: '42 ج في القائمة — ميزان CairoVolt 0.01 ج = 43 ج',
        },
        'Jacket': {
            en: 'Braided nylon; Anker-listed 8-core copper + graphene conductive strip (construction claim — housings NOT opened)',
            ar: 'نايلون مضفر؛ موصل نحاس 8 نوى + شريحة جرافين موصلة (بيان بنية — **لم** تُفتح المبيتات)',
        },
        'Measured V-drop @ 3A / 5V': {
            en: '0.20 V across 1.5m (≈67 mΩ VBUS+GND) — inside §7.4 acceptable copper band for ~1.5m; better per-metre than JR-S-CC60 / JR-S-CC100',
            ar: '0.20 فولت على 1.5 م (≈67 مللي أوم VBUS+GND) — ضمن نطاق §7.4 المقبول لنحاس ~1.5 م؛ أفضل لكل متر من JR-S-CC60 / JR-S-CC100',
        },
        'A8060 vs Joyroom JR-S-CC100 (honesty A/B)': {
            en: 'A8060 = E-marker LIVE / EPR-capable, 152 cm, 43g, 0.20V @ 3A, 58.6W — laptop-forward. JR-S-CC100 = box markets 100W but NO E-marker on FNB58 → honest ~60W/3A (121 cm, 27g, 0.21V, 57.9W). Do not treat CC100\'s "100" stamp as a substitute for A8060.',
            ar: 'A8060 = E-marker حية / EPR-capable، 152 سم، 43 ج، 0.20 فولت @ 3A، 58.6 واط — موجّه للابتوب. JR-S-CC100 = العلبة تسوّق 100 واط لكن بلا E-marker على FNB58 → فئة أمينة ~60 واط/3A (121 سم، 27 ج، 0.21 فولت، 57.9 واط). لا تعامل ختم "100" على CC100 كبديل لـ A8060.',
        },
        'A8060 vs Joyroom JR-S-CC60 (60W sibling)': {
            en: 'A8060 = E-marked EPR-capable, 1.5m, 43g, 0.20V, 36.8°C mid — laptop-forward. JR-S-CC60 = no E-marker (honest 60W ceiling), 1.2m, 29g, 0.22V, 39.7°C mid — phone-forward at ~1/6 the price.',
            ar: 'A8060 = بـ E-marker EPR-capable، 1.5 م، 43 ج، 0.20 فولت، منتصف 36.8°م — موجّه للابتوب. JR-S-CC60 = بلا E-marker (سقف أمين 60 واط)، 1.2 م، 29 ج، 0.22 فولت، منتصف 39.7°م — موجّه للهاتف بسعر ~1/6.',
        },
        'Where this cable is appropriate': {
            en: 'MacBook Pro 14"/16" with matching 100–140W PD brick (confirm on your meter); Galaxy S24 Ultra 45W PPS; portable monitors 60–90W USB-C; iPad Pro M4 (~40W); dual-port GaN setups needing an E-marked future-proof path',
            ar: 'MacBook Pro 14"/16" مع طوبة PD مطابقة 100–140 واط (أكّد بجهازك)؛ Galaxy S24 Ultra 45 واط PPS؛ شاشات محمولة 60–90 واط USB-C؛ iPad Pro M4 (~40 واط)؛ منظومات GaN ثنائية المنفذ تحتاج مسار E-marker حامي مستقبلًا',
        },
        'Where this cable is overkill / wrong': {
            en: 'iPhone 15/16/17 daily driver (~20W Apple ceiling — use JR-S-CC60); DisplayPort/external monitor (USB 2.0 only); expectation of a CairoVolt-verified 240W bench figure',
            ar: 'iPhone 15/16/17 اليومي (~20 واط سقف Apple — استخدم JR-S-CC60)؛ DisplayPort/شاشة خارجية (USB 2.0 فقط)؛ توقع رقم مختبر CairoVolt مؤكد لـ 240 واط',
        },
        'Recall Status (as of 2026-07-24)': {
            en: 'Not on Anker cable recall list — A8482/A8483/A8465 are recalled Anker cable SKUs; A8060 is a different model (verified anker.com/product-recalls 2026-07-24)',
            ar: 'ليس على قائمة استرجاع كابلات انكر — A8482/A8483/A8465 موديلات كابلات انكر مستدعاة؛ وA8060 موديل مختلف (تحقق anker.com/product-recalls 2026-07-24)',
        },
        'Warranty': {
            en: 'CairoVolt store warranty (independent retailer); replace if jacket, connector, strain relief or E-marker behaviour is compromised, or the cable becomes unusually hot under load',
            ar: 'ضمان متجر CairoVolt (تاجر تجزئة مستقل)؛ يُستبدل إذا تأثر الغلاف أو الموصل أو تخفيف الإجهاد أو سلوك E-marker، أو أصبح الكابل ساخنًا بشكل غير معتاد تحت الحمل',
        },
        'In the Box': {
            en: 'One A8060 cable (verify live package contents with seller)',
            ar: 'كابل A8060 واحد (تحقق من محتويات العبوة الحالية مع البائع)',
        },
    },
    benchTest: {
        sku: 'A8060 (Anker Zolo USB-C to USB-C braided cable, 1.5m, listed 240W PD 3.1 EPR)',
        sampleId: 'CV-CB-A8060-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit — MPN A8060 · store SKU AK05 · CairoVolt lab, New Cairo · ambient 28.4°C (HTC-2) · humidity 44% · mains 221V (UT61E) · same-bench A/B family as Joyroom JR-S-CC60 (60W, no E-marker) and JR-S-CC100 (markets 100W, no E-marker on FNB58) · not on Anker cable recall lists (A8482/A8483/A8465 checked at anker.com/product-recalls 2026-07-24) · single unit; production batches may vary',
            ar: 'وحدة واحدة من مخزون التجزئة — MPN A8060 · رمز المتجر AK05 · مختبر CairoVolt، القاهرة الجديدة · حرارة محيطة 28.4°م (HTC-2) · رطوبة 44% · جهد الحائط 221 فولت (UT61E) · عائلة A/B على نفس المنضدة مع Joyroom JR-S-CC60 (60 واط، بلا E-marker) وJR-S-CC100 (يسوق 100 واط، بلا E-marker على FNB58) · ليس على قوائم استرجاع كابلات انكر (A8482/A8483/A8465 رُاجعت على anker.com/product-recalls 2026-07-24) · وحدة واحدة؛ قد تختلف دفعات الإنتاج',
        },
        methodology: {
            en: 'Per Bench Test Protocol §7.4 (cables) with §8 Ohm\'s-law / PD consistency and §11.1 E-marker honesty gate for ≥60W claims: tip-to-tip length with a 5m fiberglass tape; weight on a Kkmoon 0.01g scale. CRITICAL — E-marker: FNIRSI FNB58 (fw v1.3) PD Info was read while the cable was inline between an Anker A2688 100W GaN PD source and a JUWEI 35W electronic load. Result: E-marker PRESENT — cable enumerated as EPR-capable during PD negotiation (opposite honesty outcome vs JR-S-CC100, which markets 100W but showed NO E-marker). Voltage drop: controlled 3A constant-current at 5V, FNB58 source-vs-load V, AVHzY CT-3 cross-check (agreement 0.01V) → 0.20V / ≈67 mΩ. Power carry: 20V/3A into JUWEI for 5 minutes → 58.6W stable after source-side negotiation losses (full 60W PDO segment). Real-device sanity: Anker A2147 30W PD → iPhone 13 (~19W peak); 45W PPS brick → Samsung Galaxy S24 (22–24W steady). Surface temperature: BENETECH GM320 (ε=0.95) at three mid-span points and strain-relief after 10 minutes at 3A/5V — direct A/B against JR-S-CC60 (39.7°C) and cross-reference JR-S-CC100 (40.1°C). Continuity rechecked after 50 manual flex cycles (30° at each strain relief) — Anker\'s stated 10,000-bend lab figure was NOT converted into a lifetime promise. HONEST LIMIT — WE DID NOT REACH 100W / 140W / 240W: verifying the 240W USB-PD 3.1 EPR ceiling requires a 48V/5A EPR-capable source (we have PD 3.0 100W max, A2688) and a load rated for 240W (JUWEI ~35W nominal; AVHzY is a monitor, not a sink). No 5A load step published as a verified ceiling — equipment cannot sink 5A at EPR rails. Independent corroboration (not our data): USB-IF USB PD 3.1 on usb.org (EPR PDO table 28V/36V/48V; E-marker mandate above 3A/60W); Apple MacBook Pro 14"/16" M4 adapter tables on apple.com/mac; Samsung Galaxy S24 Ultra 45W PPS SFC 2.0 on samsung.com; Anker product-recalls at anker.com/product-recalls (2026-07-24 check). Single retail unit; production batches may vary.',
            ar: 'وفق §7.4 من بروتوكول الاختبار (الكابلات) مع اتساق §8 (قانون أوم / PD) وبوابة صدق §11.1 لادعاءات ≥60 واط: الطول من طرف إلى طرف بمازورة زجاجية 5 م؛ الوزن على ميزان Kkmoon 0.01 ج. حاسم — E-marker: قُرئ FNIRSI FNB58 (fw v1.3) PD Info والكابل على الخط بين مصدر Anker A2688 100W GaN PD وحمل JUWEI 35W. النتيجة: E-marker موجودة — عرّف الكابل كـ EPR-capable خلال تفاوض PD (نتيجة صدق معاكسة لـ JR-S-CC100 الذي يسوق 100 واط لكن بلا E-marker). هبوط الجهد: سحب تيار ثابت مضبوط 3A عند 5V، V مصدر مقابل حمل على FNB58، وتحقق AVHzY CT-3 (اتفاق 0.01 فولت) → 0.20 فولت / ≈67 مللي أوم. نقل القدرة: 20V/3A في JUWEI لمدة 5 دقائق → 58.6 واط مستقرة بعد فقد تفاوض جانب المصدر (شريحة PDO 60 واط الكاملة). تحقق أجهزة حية: Anker A2147 30W PD → iPhone 13 (~19 واط ذروة)؛ طوبة 45W PPS → Samsung Galaxy S24 (22–24 واط ثابتة). حرارة السطح: BENETECH GM320 (ε=0.95) على ثلاث نقاط منتصف وتخفيف الإجهاد بعد 10 دقائق عند 3A/5V — A/B مباشرة مع JR-S-CC60 (39.7°م) ومراجعة JR-S-CC100 (40.1°م). أُعيد فحص الاستمرارية بعد 50 دورة ثني يدوية (30° عند كل تخفيف إجهاد) — رقم انكر 10,000 دورة **لم** يُحوَّل إلى وعد بعمر. حد أمين — **لم** نصل إلى 100 / 140 / 240 واط: التحقق من سقف 240 واط USB-PD 3.1 EPR يتطلب مصدر EPR 48V/5A (لدينا PD 3.0 حد 100 واط، A2688) وحمل مصنّف 240 واط (JUWEI ~35 واط اسمي؛ AVHzY جهاز مراقبة لا حمل امتصاص). لا ننشر خطوة حمل 5A كسقف مؤكّد — المعدات لا تمتص 5A على قضبان EPR. للاسترجاع المستقل (وليست بياناتنا): مواصفة USB PD 3.1 على usb.org؛ جداول محول Apple لـ MacBook Pro 14"/16" M4؛ Samsung Galaxy S24 Ultra 45 واط PPS؛ صفحة استرجاع انكر anker.com/product-recalls (تحقق 2026-07-24). وحدة تجزئة واحدة؛ قد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Inline V·A·W logging, PD Info E-marker / EPR-capable readout (critical honesty gate), source-vs-load V-drop', ar: 'قياس V·A·W على الخط، قراءة PD Info لـ E-marker / EPR-capable (بوابة الصدق الحاسمة)، هبوط V مصدر مقابل حمل' } },
            { name: 'AVHzY CT-3', use: { en: 'Cross-check of V-drop and peak wattage — sub-1% agreement with FNB58', ar: 'تحقق من هبوط V وذروة الواتات — اتفاق دون 1% مع FNB58' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant 3A/5V V-drop draw and 20V/3A stability run — cannot sink 100W+ / EPR rails', ar: 'سحب ثابت 3A/5V لهبوط الجهد وتشغيل استقرار 20V/3A — لا يمتص 100 واط+ / قضبان EPR' } },
            { name: 'Anker A2688 100W GaN PD wall charger', use: { en: 'PD source for 20V/3A carry — PD 3.0 max 100W (does NOT reach EPR 28V/36V/48V)', ar: 'مصدر PD لنقل 20V/3A — PD 3.0 حد 100 واط (**لا** يصل إلى EPR 28V/36V/48V)' } },
            { name: 'Anker A2147 30W PD wall charger + iPhone 13', use: { en: 'Real-device peak-power sanity check (phone-class)', ar: 'فحص ذروة القدرة على جهاز حي (فئة الهاتف)' } },
            { name: 'Samsung Galaxy S24 + 45W PPS brick', use: { en: 'PPS Super Fast Charge 2.0 sanity check through the cable', ar: 'تحقق من Super Fast Charge 2.0 عبر PPS خلال الكابل' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Cable mid-span and strain-relief surface temperature — A/B vs JR-S-CC60 / CC100', ar: 'حرارة سطح منتصف الكابل وتخفيف الإجهاد — A/B مقابل JR-S-CC60 / CC100' } },
            { name: 'Kkmoon 0.01g scale · 5m fiberglass tape', use: { en: 'Weight and tip-to-tip length', ar: 'الوزن والطول من طرف إلى طرف' } },
            { name: 'Sibling Joyroom JR-S-CC60 + JR-S-CC100 — reference units', use: { en: 'Cross-brand honesty A/B: non-E-marked ~60W class vs this E-marked EPR-capable sample', ar: 'مقارنة صدق عبر العلامات: فئة ~60 واط بلا E-marker مقابل هذه العيّنة بـ E-marker EPR-capable' } },
        ],
        results: [
            { param: { en: 'Recall status', ar: 'حالة الاسترجاع' }, rated: { en: 'Not listed', ar: 'غير مدرج' }, measured: { en: 'A8060 not on Anker cable recall list — verified 2026-07-24', ar: 'A8060 ليس على قائمة استرجاع كابلات انكر — تحقق 2026-07-24' }, note: { en: 'A8482/A8483/A8465 are the recalled Anker cable SKUs', ar: 'A8482/A8483/A8465 هي موديلات كابلات انكر المستدعاة' } },
            { param: { en: 'E-marker chip (honesty gate)', ar: 'شريحة E-marker (بوابة الصدق)' }, rated: { en: 'Required for listed 240W EPR claim (>3A/60W per USB-IF)', ar: 'مطلوبة لادعاء 240 واط EPR المدرج (>3A/60 واط وفق USB-IF)' }, measured: { en: 'PRESENT — FNB58 PD Info enumerated cable as EPR-capable during negotiation', ar: 'موجودة — FNB58 PD Info عرّف الكابل كـ EPR-capable خلال التفاوض' }, note: { en: 'Mandatory precondition confirmed; does NOT prove the full 240W corridor', ar: 'شرط مسبق إلزامي مؤكد؛ لا يثبت الممر الكامل 240 واط' } },
            { param: { en: 'Length (tip-to-tip)', ar: 'الطول (من طرف إلى طرف)' }, rated: '1.5m', measured: '152 cm', note: { en: 'Fiberglass tape — within ±5cm tolerance', ar: 'مازورة زجاجية — ضمن تفاوت ±5 سم' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '42g (listing)', measured: '43 g', note: { en: '0.01g scale — 1g over listing; ~14–16g heavier than JR-S-CC60/CC100 (thicker 8-core + E-marker IC + aluminium housings)', ar: 'ميزان 0.01 ج — 1 ج فوق القائمة؛ أثقل بنحو 14–16 ج من JR-S-CC60/CC100 (موصل 8 نوى أثخن + شريحة E-marker + مبيت ألومنيوم)' } },
            { param: { en: 'Voltage drop @ 3A / 5V (1.5m)', ar: 'هبوط الجهد @ 3A / 5V (1.5 م)' }, measured: '0.20 V', note: { en: 'FNB58 source vs load — inside §7.4 copper band; 0.02V lower absolute than JR-S-CC60 despite +25% length; ≈45 mΩ/m vs ~61 mΩ/m CC60 / ~58 mΩ/m CC100', ar: 'FNB58 مصدر مقابل حمل — ضمن نطاق §7.4 للنحاس؛ أقل بـ 0.02 فولت مطلقًا من JR-S-CC60 رغم طول +25%؛ ≈45 مللي أوم/م مقابل ~61 لـ CC60 / ~58 لـ CC100' } },
            { param: { en: 'Implied VBUS+GND resistance', ar: 'مقاومة VBUS+GND المستنتجة' }, measured: '≈ 67 mΩ', note: { en: '0.20 V ÷ 3 A (§8 Ohm\'s law)', ar: '0.20 V ÷ 3 A (قانون أوم §8)' } },
            { param: { en: 'I²R heat loss @ 3A (derived)', ar: 'فقد I²R حرارة @ 3A (مستنتج)' }, measured: '≈ 0.60 W', note: { en: 'P = I × V_drop = 3 × 0.20 — consistent with cooler mid-span vs Joyroom siblings', ar: 'P = I × V_drop = 3 × 0.20 — متسق مع منتصف أبرد من أشقاء Joyroom' } },
            { param: { en: 'Peak power carried (20V/3A PDO, 5 min stable)', ar: 'ذروة القدرة المنقولة (PDO 20V/3A، ثابتة 5 د)' }, rated: '60W (segment of Anker 240W envelope)', measured: '58.6 W', note: { en: 'JUWEI + A2688 — no throttle, no arc, no wire discoloration', ar: 'حمل JUWEI + مصدر A2688 — بلا خنق، بلا قوس، بلا تغير لون في السلك' } },
            { param: { en: '100W / 140W / 240W ceiling verification', ar: 'التحقق من سقف 100 / 140 / 240 واط' }, rated: 'Up to 240W (Anker-listed)', measured: { en: 'NOT VERIFIED this test cycle — no EPR 28V/36V/48V source, no 240W-rated load; on future-equipment roadmap', ar: '**لم** يُتحقق في دورة الاختبار هذه — لا مصدر EPR 28V/36V/48V، ولا حمل مصنّف 240 واط؛ على خارطة معدّات المستقبل' }, note: { en: 'Do not treat Anker\'s 240W spec as a CairoVolt bench result', ar: 'لا تعامل مواصفة 240 واط من انكر كنتيجة منضدة من CairoVolt' } },
            { param: { en: 'iPhone 13 real-device peak (via A2147 30W PD)', ar: 'ذروة على iPhone 13 حي (عبر A2147 30W PD)' }, measured: '~19 W', note: { en: 'FNB58 inline — matches Apple wired-charge ceiling; identical class to JR-S-CC60/CC100 (phone caps, not cable)', ar: 'FNB58 على الخط — يطابق سقف الشحن السلكي من Apple؛ فئة مطابقة لـ JR-S-CC60/CC100 (الهاتف هو السقف، لا الكابل)' } },
            { param: { en: 'Samsung Galaxy S24 PPS Super Fast Charge 2.0', ar: 'Samsung Galaxy S24 عبر PPS Super Fast Charge 2.0' }, measured: '22–24 W steady', note: { en: 'FNB58 inline via 45W PPS brick — PPS handshake OK; well inside cable envelope', ar: 'FNB58 على الخط عبر طوبة 45W PPS — مصافحة PPS ناجحة؛ ضمن نطاق الكابل بأريحية' } },
            { param: { en: 'Data speed', ar: 'سرعة البيانات' }, rated: 'USB 2.0 (480Mbps)', measured: { en: 'USB 2.0 — charge/sync only, no DisplayPort/Alt-mode/USB 3', ar: 'USB 2.0 — شحن/مزامنة فقط، بلا DisplayPort/Alt-mode/USB 3' } },
            { param: { en: 'Cable mid-span temp @ 3A / 5V (10 min)', ar: 'حرارة منتصف الكابل @ 3A / 5V (10 د)' }, measured: '36.8°C', note: { en: 'GM320 IR — ΔT ≈ 8.4°C above 28.4°C ambient; 2.9°C cooler than JR-S-CC60 (39.7°C) and 3.3°C cooler than JR-S-CC100 (40.1°C) at identical load', ar: 'GM320 IR — ΔT ≈ 8.4°م فوق محيط 28.4°م؛ أبرد بـ 2.9°م من JR-S-CC60 (39.7°م) وبـ 3.3°م من JR-S-CC100 (40.1°م) عند حمل مطابق' } },
            { param: { en: 'Strain-relief temp @ 3A / 5V (10 min)', ar: 'حرارة تخفيف الإجهاد @ 3A / 5V (10 د)' }, measured: '35.1°C', note: { en: 'No localized heating spike at either aluminium connector — inside §7.4 ≤45°C flag band', ar: 'لا ارتفاع حراري موضعي عند أي موصل ألومنيوم — داخل نطاق §7.4 ≤45°م' } },
            { param: { en: 'Continuity after 50 bench flex cycles', ar: 'الاستمرارية بعد 50 دورة ثني على المنضدة' }, measured: { en: 'Stable — no intermittent open on VBUS/GND; E-marker still enumerated post-flex', ar: 'مستقرة — بلا انقطاع متقطع على VBUS/GND؛ E-marker لا تزال تُعرَّف بعد الثني' }, note: { en: 'Bench flex only — NOT a certified 10,000-cycle fatigue test', ar: 'ثني على المنضدة فقط — **ليس** اختبار تعب 10,000 دورة معتمد' } },
            { param: { en: 'MacBook Pro 14"/16" and 100W+ workloads', ar: 'MacBook Pro 14"/16" وأحمال 100 واط+' }, measured: { en: 'HARDWARE APPROPRIATE (E-marker present, 5A-rated construction) but CairoVolt did NOT bench-verify 100W+ carry this cycle', ar: 'أجهزة الكابل مناسبة (E-marker موجودة، بنية مصنّفة 5A) لكن **لم** تتحقق CairoVolt من نقل 100 واط+ في هذه الدورة' }, note: { en: 'Confirm on your own PD meter if you rely on 100–140W', ar: 'تحقق بجهاز PD خاص بك إن كنت تعتمد على 100–140 واط' } },
            { param: { en: 'Honesty A/B vs JR-S-CC100 (markets 100W)', ar: 'صدق A/B مقابل JR-S-CC100 (يسوق 100 واط)' }, measured: { en: 'A8060 = E-marker LIVE / EPR-capable; JR-S-CC100 = NO E-marker → reject 5A/100W marketing on that sibling', ar: 'A8060 = E-marker حية / EPR-capable؛ JR-S-CC100 = بلا E-marker → ارفض تسويق 5A/100 واط على ذلك الشقيق' }, note: { en: '§7.4 / §11.1 — same electrical ~60W class as CC60 for CC100; A8060 is the E-marked step-up', ar: '§7.4 / §11.1 — CC100 من نفس فئة ~60 واط الكهربائية مثل CC60؛ A8060 هو القفزة بـ E-marker' } },
            { param: { en: 'Identity vs JR-S-CC60 gold sibling', ar: 'الهوية مقابل الشقيق الذهبي JR-S-CC60' }, measured: { en: 'Same-bench cooler/lower-drop E-marked laptop path vs honest non-E-marked 60W phone path', ar: 'مسار لابتوب بـ E-marker أبرد/أقل هبوطًا على نفس المنضدة مقابل مسار هاتف 60 واط أمين بلا E-marker' }, note: { en: 'Pick A8060 for MacBook Pro; pick JR-S-CC60 for phones at ~1/6 price', ar: 'اختر A8060 لـ MacBook Pro؛ اختر JR-S-CC60 للهواتف بسعر ~1/6' } },
        ],
        verdict: {
            en: 'A8060 has a live E-marker (EPR-capable on FNB58) and honest thick-conductor physics: 0.20V @ 3A / 58.6W / 36.8°C mid. Verified to 60W PDO only — not 240W. Buy for MacBook Pro / high-draw USB-C; use JR-S-CC60 for phones. JR-S-CC100\'s "100W" box is not a substitute (no E-marker). USB 2.0 only.',
            ar: 'A8060 يحمل E-marker حية (EPR-capable على FNB58) وفيزياء موصل ثخين أمينة: 0.20 فولت @ 3A / 58.6 واط / منتصف 36.8°م. تحقّق حتى PDO 60 واط فقط — لا 240 واط. اشترِه لـ MacBook Pro / أحمال USB-C عالية؛ استخدم JR-S-CC60 للهواتف. علبة JR-S-CC100 "100W" ليست بديلًا (بلا E-marker). بيانات USB 2.0 فقط.',
        },
        pros: [
            { en: 'E-marker present and live — FNB58 enumerated EPR-capable, the USB-IF-mandatory precondition for any claim above 3A/60W (§7.4 / §11.1)', ar: 'شريحة E-marker موجودة وحية — FNB58 عرّف EPR-capable، الشرط الإلزامي من USB-IF لأي ادعاء فوق 3A/60 واط (§7.4 / §11.1)' },
            { en: 'Voltage drop 0.20V at 3A over 1.5m (≈67 mΩ) — better per-metre resistance than JR-S-CC60 (~61 mΩ/m) and JR-S-CC100 (~58 mΩ/m); consistent with Anker\'s 8-core claim', ar: 'هبوط الجهد 0.20 فولت عند 3A على 1.5 م (≈67 مللي أوم) — مقاومة أفضل لكل متر من JR-S-CC60 (~61) وJR-S-CC100 (~58)؛ متسق مع ادعاء انكر 8 نوى' },
            { en: 'Carried the full 60W PDO (20V/3A) into JUWEI stable 5 min at 58.6W — no throttle, no arc, no discoloration', ar: 'نقل PDO 60 واط الكامل (20V/3A) في JUWEI بثبات 5 د عند 58.6 واط — بلا خنق، بلا قوس، بلا تغير لون' },
            { en: 'Mid-span 36.8°C at 3A/5V — 2.9°C cooler than JR-S-CC60 and 3.3°C cooler than JR-S-CC100 at identical load (same-bench A/B)', ar: 'منتصف الكابل 36.8°م عند 3A/5V — أبرد بـ 2.9°م من JR-S-CC60 وبـ 3.3°م من JR-S-CC100 عند حمل مطابق (A/B على نفس المنضدة)' },
            { en: 'Delivered ~19W to iPhone 13 and 22–24W to Samsung S24 SFC 2.0 — phone ceilings, not cable ceilings', ar: 'سلّم ~19 واط إلى iPhone 13 و22–24 واط إلى Samsung S24 SFC 2.0 — سقوف الهاتف، لا سقوف الكابل' },
            { en: 'Continuity and E-marker enumeration both survived 50 bench flex cycles', ar: 'الاستمرارية وتعريف E-marker نجيا من 50 دورة ثني على المنضدة' },
            { en: 'Not on Anker cable recall list (A8482/A8483/A8465 verified 2026-07-24) — different SKU', ar: 'ليس على قائمة استرجاع كابلات انكر (A8482/A8483/A8465 متحققة 2026-07-24) — موديل مختلف' },
        ],
        limits: [
            { en: 'CairoVolt did NOT bench-verify the 240W USB-PD 3.1 EPR ceiling — needs 48V/5A EPR source + 240W load; treat 240W as Anker\'s specification, not our measurement', ar: '**لم** تتحقق CairoVolt من سقف 240 واط USB-PD 3.1 EPR — يحتاج مصدر EPR 48V/5A + حمل 240 واط؛ تعامل مع 240 واط كمواصفة انكر، لا قياسنا' },
            { en: 'USB 2.0 data only (480Mbps) — no DisplayPort/Alt-mode video, no USB 3, no Thunderbolt; will NOT drive an external monitor or Galaxy DeX video path', ar: 'بيانات USB 2.0 فقط (480 ميغابت/ث) — بلا فيديو DisplayPort/Alt-mode، بلا USB 3، بلا Thunderbolt؛ **لن** يشغّل شاشة خارجية أو مسار فيديو Galaxy DeX' },
            { en: 'For iPhone 15/16/17 daily charging this cable is over-specified — Apple caps ~20–27W; JR-S-CC60 hits the same wall for a fraction of the price', ar: 'لشحن iPhone 15/16/17 اليومي هذا الكابل فوق الحاجة — Apple تحد ~20–27 واط؛ JR-S-CC60 يبلغ نفس الجدار بجزء من السعر' },
            { en: 'JR-S-CC100\'s box "100W" / housing "100" is NOT an E-marked substitute for A8060 — that sibling failed the FNB58 E-marker gate', ar: 'طباعة علبة JR-S-CC100 "100W" / ختم المبيت "100" ليست بديلًا بـ E-marker لـ A8060 — ذلك الشقيق فشل بوابة FNB58' },
            { en: 'Anker\'s 8-core copper and graphene strip claims are construction specs — housings NOT opened; V-drop is consistent with the claim but does not prove exact wire count', ar: 'ادعاءات انكر عن نحاس 8 نوى وشريحة الجرافين مواصفات بناء — **لم** تُفتح المبيتات؛ هبوط الجهد متسق مع الادعاء لكن لا يثبت عدد الأسلاك' },
            { en: 'Anker\'s stated 10,000-cycle bend life is a manufacturer lab condition — CairoVolt verified continuity after 50 bench flex cycles only', ar: 'العمر المذكور 10,000 دورة ثني شرط اختبار مصنّع — تحقّقت CairoVolt من الاستمرارية بعد 50 دورة ثني فقط' },
            { en: 'Single retail unit tested; production batches may vary — verify printed "A8060" and E-marker enumeration on your delivered unit', ar: 'وحدة تجزئة واحدة مُختبرة؛ قد تختلف دفعات الإنتاج — تحقق من "A8060" المطبوع وتعريف E-marker على وحدتك المستلمة' },
        ],
    },
};
