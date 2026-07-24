// Details for: anker-a8050-usb-c-cable  (Anker A8050 USB-A to USB-C braided nylon, 1.8m)
// Wave Adj/Mid elevate-gold · sample CV-CB-A8050-001 · testDate 2026-07-24 · Eng. Omar Khaled · §7.4 cables
// ≠ A8865 / Zolo A8060 (C-to-C PD E-marked) · ≠ A8652H21 (USB-C→Lightning) · ≠ recalled A8482/A8483/A8465
// Prior lab truth kept: 0.18 V @ 2A · ≈90 mΩ · ~17.6 W A54 · 182.4 cm · 29.0 g · mid 34.2°C · no E-marker (USB-A expected).
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · 5+5 pros/limits · recall 2026-07-24 · Eng. Omar Khaled.
// Protocol anchors: BENCH-TEST-PROTOCOL §7.4 cables · §8 physics · §11 red flags.
import type { ProductDetail } from './_types';

export const anker_a8050_usb_c_cable_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker A8050 (store SKU AK04, GTIN 6940268896820, ~570 EGP) is a 1.8m braided-nylon USB-A to USB-C bridge — not C-to-C. It links older USB-A car chargers, wall bricks and power banks to USB-C Android phones. CRITICAL: a USB-A host path does NOT become USB-C Power Delivery; PD needs a USB-C PD source + a suitable C-to-C cable (A8865 / Zolo A8060 class).',
            'CairoVolt sample CV-CB-A8050-001 (Eng. Omar Khaled · 2026-07-24, §7.4): tip-to-tip 182.4 cm · 29.0 g · V-drop 0.18 V at controlled 5V/2A (≈90 mΩ VBUS+GND; ≈49 mΩ/m) — within §7.4 copper band for 1.8m. Peak into a live Galaxy A54 from Anker A2741 USB-A car charger: ~17.6 W QC/AFC-class (FNB58). iPhone 15 same A-host class ~9.0 W — not Apple 20–27 W PD.',
            'E-marker honesty (§7.4 / §11): FNB58 PD Info showed NO USB-PD contract and no E-marker — expected and correct for a USB-A source cable. We did NOT claim 60–100 W laptop PD and did NOT run a 5A step. Contrast A8865 / Zolo A8060 (C-to-C, E-marked when rated ≥5A/100W).',
            'A/B same lab week vs Joyroom JR-S-AC30 (~1m A→C): A8050 = 182.4 cm / 0.18 V @ 2A / ≈90 mΩ / 29 g braid / ~17.6 W A54 / mid 34.2°C / ~570 EGP — AC30 = 101 cm / 0.11 V @ 2A / ≈55 mΩ / 21 g TPE / 16.8 W S24 / mid 36.8°C / ~86 EGP. Pay A8050 for Anker braid + 1.8m car reach, not a higher QC wattage class. Ohm’s law length-scales (+0.07 V for +~81 cm).',
            'USB 2.0 data confirmed (≈36 MB/s on a 1GB file copy) — charge + sync, no DisplayPort. Anker’s 35,000-bend lab figure is NOT a lifetime promise — CairoVolt verified continuity after 50 bench flex cycles only. NOT on Anker cable recall lists (A8482/A8483/A8465 checked anker.com/product-recalls 2026-07-24). Wrong tool for MacBook 60W+ PD.',
        ],
        ar: [
            'انكر A8050 (SKU المتجر AK04، GTIN 6940268896820، ~570 ج) جسر نايلون مضفر 1.8 م من USB-A إلى USB-C — ليس C-to-C. يصل شواحن السيارة والطوبات والباور بانك USB-A القديمة بهواتف أندرويد USB-C. حرج: مسار مضيف USB-A **لا** يتحوّل إلى USB-C Power Delivery؛ PD يحتاج مصدر PD + كابل C-to-C مناسب (فئة A8865 / Zolo A8060).',
            'عينة CairoVolt CV-CB-A8050-001 (م. عمر خالد · 2026-07-24، §7.4): طول 182.4 سم · وزن 29.0 ج · هبوط 0.18 فولت عند سحب مضبوط 5V/2A (≈90 مللي أوم VBUS+GND؛ ≈49 مللي أوم/م) — ضمن نطاق §7.4 للنحاس بطول 1.8 م. ذروة إلى Galaxy A54 حي من شاحن سيارة انكر A2741 USB-A: ~17.6 واط فئة QC/AFC (FNB58). iPhone 15 نفس فئة مضيف A ~9.0 واط — ليست PD 20–27 واط من Apple.',
            'أمانة E-marker (§7.4 / §11): FNB58 PD Info لم يُظهر عقد USB-PD ولا شريحة E-marker — متوقع وصحيح لكابل مصدر USB-A. **لم** ندّعِ PD لابتوب 60–100 واط و**لم** نشغّل خطوة 5A. قارن A8865 / Zolo A8060 (C-to-C، E-marker عند تصنيف ≥5A/100 واط).',
            'A/B نفس أسبوع المختبر مقابل Joyroom JR-S-AC30 (~1 م A→C): A8050 = 182.4 سم / 0.18 فولت @ 2A / ≈90 مللي أوم / 29 ج مضفر / ~17.6 واط A54 / منتصف 34.2°م / ~570 ج — AC30 = 101 سم / 0.11 فولت @ 2A / ≈55 مللي أوم / 21 ج TPE / 16.8 واط S24 / منتصف 36.8°م / ~86 ج. تدفع لـ A8050 لمضفر انكر + وصول سيارة 1.8 م، لا لفئة واتات QC أعلى. قانون أوم يتناسب مع الطول (+0.07 فولت لـ +~81 سم).',
            'بيانات USB 2.0 مؤكدة (≈36 ميغابايت/ث لنسخ ملف 1 جيجا) — شحن + مزامنة، بلا DisplayPort. رقم 35,000 ثنية من انكر **ليس** وعد عمر — تحقّقت CairoVolt من الاستمرارية بعد 50 دورة ثني على المنضدة فقط. **ليس** على قوائم استرجاع كابلات انكر (A8482/A8483/A8465 رُاجعت anker.com/product-recalls 2026-07-24). أداة خاطئة لـ MacBook PD 60 واط+.',
        ],
    },
    localContext: {
        en: 'CairoVolt is an independent retailer, not an authorized distributor; this cable carries our store warranty. A8050 (AK04 / GTIN 6940268896820 / ~570 EGP) is the long-reach Anker USB-A→C bridge for Egypt bags that still carry USB-A car docks and older wall bricks — Careem/Uber drivers with Anker A2741 USB-A ports, student kits reusing a QC wall wart, and desk PCs with USB-A only. Six scenarios. RIGHT FOR: (1) CAREEM / UBER QC CAR CHARGER — 1.8m reaches phone-to-console / rear seat without stretching; we measured ~17.6W into Galaxy A54 from A2741 USB-A (FNB58), QC/AFC-class not 25W PPS. (2) OLDER USB-A WALL BRICK → USB-C ANDROID — Samsung A-series / mid-range on AFC or QC from a USB-A brick. (3) LAPTOP USB-A SYNC — USB 2.0 ≈36 MB/s measured; fine for photos/APKs, not SSD cloning. (4) iPHONE 15/16 VIA USB-A — honest ~9W class from a USB-A brick; do not expect Apple 20–27W PD without C-to-C + PD brick. (5) TRAVEL / EgyptAir carry-on spare — 29.0 g measured braided spare when you already own USB-A sources. (6) BUYER WHO WANTS ANKER BRAID + 1.8m vs budget 1m Joyroom AC30 (~86 EGP). WRONG FOR: (7) USB-C PD FAST CHARGE (20–60W+) — USB-A cannot negotiate USB-PD the same way; buy A8865 / Zolo A8060 + PD brick. (8) MACBOOK / LAPTOP POWER — not a PD power cable; no E-marker role on USB-A. (9) BUYER CONFUSING WITH RECALLED ANKER CABLES — A8482/A8483/A8465 are different USB-C SKUs; A8050 is not on that list (anker.com/product-recalls 2026-07-24). HEAT: Cairo July–August mean high 35°C (WeatherSpark). Mid-span at 2A/5V was 34.2°C in a 28.4°C room; expect warmer on a sunlit dashboard — do not coil tightly under load. AUTHENTICITY: verify printed “A8050” and GTIN 6940268896820; do not confuse packaging photos with C-to-C A8865. ELECTRICITY: topping a Galaxy A54 (~19 Wh class) via ~17.6W USB-A path uses on the order of ~0.02–0.03 kWh — a few piastres on EgyptERA Sept-2024 tariff. A/B SUMMARY: A8050 wins Anker braid + 1.8m car reach; JR-S-AC30 wins price/pocket length — neither is USB-PD.',
        ar: 'CairoVolt متجر تجزئة مستقل وليس موزعًا معتمدًا؛ والكابل يحمل ضمان المتجر. A8050 (AK04 / GTIN 6940268896820 / ~570 ج) هو جسر انكر الطويل USB-A→C لحقائب مصرية ما زالت تحمل منافذ سيارة USB-A وطوبات قديمة — سائقو Careem/Uber بمنافذ USB-A على Anker A2741، أطقم طلاب يعيدون استخدام طوبة QC، وأجهزة مكتب بمنفذ USB-A فقط. ستة سيناريوهات. مناسب لـ: (1) شاحن سيارة Careem / Uber بـ QC — 1.8 م يصل من الكونسول/المقعد الخلفي بلا شد؛ قِسنا ~17.6 واط إلى Galaxy A54 من USB-A على A2741 (FNB58)، فئة QC/AFC وليس 25 واط PPS. (2) طوبة USB-A قديمة → أندرويد USB-C — سامسونج فئة A / متوسطة على AFC أو QC من طوبة USB-A. (3) مزامنة لابتوب USB-A — بيانات USB 2.0 ≈36 ميغابايت/ث مقاسة؛ مناسبة للصور/APK لا لنسخ SSD. (4) iPhone 15/16 عبر USB-A — ~9 واط أمينة من طوبة USB-A؛ لا تتوقع PD 20–27 واط من Apple بلا C-to-C + طوبة PD. (5) سفر / حقيبة EgyptAir — 29.0 ج مقاسة مضفرة حين تملك مصادر USB-A. (6) مشترٍ يريد مضفر انكر + 1.8 م مقابل Joyroom AC30 الاقتصادي ~1 م (~86 ج). غير مناسب لـ: (7) شحن USB-C PD السريع (20–60 واط+) — USB-A لا يتفاوض USB-PD بنفس الطريقة؛ اشترِ A8865 / Zolo A8060 + طوبة PD. (8) تغذية MacBook / لابتوب — ليس كابل قدرة PD؛ بلا دور E-marker على USB-A. (9) مشترٍ يخلطه مع كابلات انكر المستدعاة — A8482/A8483/A8465 موديلات USB-C مختلفة؛ A8050 ليس على تلك القائمة (anker.com/product-recalls 2026-07-24). الحرارة: متوسط العظمى للقاهرة يوليو–أغسطس 35°م (WeatherSpark). منتصف الكابل عند 2A/5V كان 34.2°م في غرفة 28.4°م؛ توقّع أدفأ على تابلوه مشمس — لا تلفّه بإحكام تحت الحمل. الأصالة: تحقق من “A8050” المطبوع وGTIN 6940268896820؛ لا تخلط صور العبوة مع C-to-C A8865. الكهرباء: إكمال شحن Galaxy A54 (فئة ~19 Wh) عبر مسار USB-A ~17.6 واط ≈0.02–0.03 كيلوواط·ساعة — قروش قليلة بتعريفة EgyptERA سبتمبر 2024. ملخص A/B: A8050 يفوز بمضفر انكر + وصول سيارة 1.8 م؛ JR-S-AC30 يفوز بالسعر/طول الجيب — ولا أحدهما USB-PD.',
    },
    specifications: {
        'Model': {
            en: 'Anker A8050 USB-A to USB-C braided nylon cable · 1.8m (6ft) — store SKU AK04 · GTIN 6940268896820',
            ar: 'انكر A8050 كابل USB-A إلى USB-C نايلون مضفر · 1.8 م (6 قدم) — SKU المتجر AK04 · GTIN 6940268896820',
        },
        'Category': {
            en: 'USB-A→USB-C charge + sync bridge · not a USB-C PD / E-marked laptop cable',
            ar: 'جسر شحن + مزامنة USB-A→USB-C · ليس كابل لابتوب USB-C PD / بشريحة E-marker',
        },
        'Max Current / Power (honest)': {
            en: 'Depends on USB-A source + device (QC/AFC/DCP/5V) — typically ~15–18W phone class when the charger supports it; CairoVolt ~17.6W into Galaxy A54 from A2741. Not USB-C PD 20–100W.',
            ar: 'تعتمد على مصدر USB-A + الجهاز (QC/AFC/DCP/5V) — عادةً فئة هاتف ~15–18 واط عندما يدعمها الشاحن؛ CairoVolt ~17.6 واط إلى Galaxy A54 من A2741. ليس USB-C PD 20–100 واط.',
        },
        'USB-C Power Delivery / E-marker': {
            en: 'Not available from a standard USB-A host — no PD contract / no E-marker role; do NOT expect 20–100W PD or 5A EPR. Use A8865 / Zolo A8060 C-to-C for laptop PD.',
            ar: 'غير متاح من مضيف USB-A قياسي — بلا عقد PD / بلا دور E-marker؛ **لا** تتوقع PD 20–100 واط أو EPR 5A. استخدم A8865 / Zolo A8060 C-to-C لـ PD اللابتوب.',
        },
        'Data Speed': {
            en: 'USB 2.0 (480Mbps listed) — CairoVolt ≈36 MB/s on 1GB file copy; no DisplayPort/Alt-mode',
            ar: 'USB 2.0 (480 ميغابت/ث معلن) — CairoVolt ≈36 ميغابايت/ث لنسخ 1 جيجا؛ بلا DisplayPort/Alt-mode',
        },
        'Connectors': {
            en: 'USB-A ↔ USB-C — confirmed not C-to-C',
            ar: 'USB-A ↔ USB-C — مؤكَّد ليس C-to-C',
        },
        'Length': {
            en: '1.8m (6ft) listed — CairoVolt 5m fiberglass tape 182.4 cm (USB-A tip to USB-C tip)',
            ar: '1.8 م (6 قدم) في القائمة — مازورة CairoVolt الزجاجية 5 م: 182.4 سم (من طرف USB-A إلى طرف USB-C)',
        },
        'Weight': {
            en: '~28g manufacturer-listed — CairoVolt Kkmoon 0.01g scale 29.0 g',
            ar: '~28 ج مدون من الشركة — ميزان CairoVolt Kkmoon 0.01 ج: 29.0 ج',
        },
        'Jacket / Durability claim': {
            en: 'Braided nylon with reinforced strain relief · Anker states 35,000-bend lab figure — not a promised service life; CairoVolt 50 bench flex cycles only',
            ar: 'نايلون مضفر مع تخفيف إجهاد معزّز · انكر تذكر رقم 35,000 ثنية مختبري — ليس عمر خدمة مضمونًا؛ CairoVolt 50 دورة ثني على المنضدة فقط',
        },
        'Measured V-drop @ 5V / 2A': {
            en: '0.18 V across 182.4 cm (≈90 mΩ VBUS+GND; ≈49 mΩ/m) — FNB58 source vs load; AVHzY CT-3 ±0.01 V; within §7.4 copper band for 1.8m',
            ar: '0.18 فولت على 182.4 سم (≈90 مللي أوم VBUS+GND؛ ≈49 مللي أوم/م) — FNB58 مصدر مقابل حمل؛ AVHzY CT-3 ±0.01 فولت؛ ضمن نطاق §7.4 للنحاس بطول 1.8 م',
        },
        'Measured peak (USB-A host path)': {
            en: '~17.6W into Samsung Galaxy A54 from Anker A2741 USB-A car charger; ~9.0W into iPhone 15 same A-host class — not PD',
            ar: '~17.6 واط إلى Samsung Galaxy A54 من شاحن سيارة انكر A2741 USB-A؛ ~9.0 واط إلى iPhone 15 نفس فئة مضيف A — ليس PD',
        },
        'A/B vs JR-S-AC30 (~1m)': {
            en: 'A8050: 182.4 cm · 0.18 V @ 2A · 29 g braid · ~570 EGP · ~17.6W A54 — AC30: 101 cm · 0.11 V @ 2A · 21 g TPE · ~86 EGP · 16.8W S24 — pay for length/brand braid, not wattage class',
            ar: 'A8050: 182.4 سم · 0.18 فولت @ 2A · 29 ج مضفر · ~570 ج · ~17.6 واط A54 — AC30: 101 سم · 0.11 فولت @ 2A · 21 ج TPE · ~86 ج · 16.8 واط S24 — تدفع للطول/مضفر العلامة، لا لفئة الواتات',
        },
        'Where this cable is enough': {
            en: 'Legacy USB-A bricks, QC/AFC car chargers needing ~1.8m reach, laptop USB-A sync, Samsung AFC ~15–18W class, iPhone USB-A trickle ~7–12W class',
            ar: 'طوب USB-A القديمة، شواحن سيارة QC/AFC تحتاج وصول ~1.8 م، مزامنة لابتوب USB-A، سامسونج AFC فئة ~15–18 واط، iPhone عبر USB-A فئة ~7–12 واط',
        },
        'Where this cable is NOT enough': {
            en: 'USB-C PD 20–100W phone/laptop peaks, Samsung 25W/45W PPS Super Fast Charging, MacBook power — use C-to-C E-marked (A8865 / Zolo A8060 class)',
            ar: 'ذروات USB-C PD 20–100 واط للهاتف/اللابتوب، Samsung Super Fast Charging 25/45 واط PPS، تغذية MacBook — استخدم C-to-C بـ E-marker (فئة A8865 / Zolo A8060)',
        },
        'Recall Status': {
            en: 'Not on Anker cable recall list — A8482/A8483/A8465 are different USB-C SKUs; A8050 verified clear at anker.com/product-recalls 2026-07-24',
            ar: 'ليس على قائمة استرجاع كابلات انكر — A8482/A8483/A8465 موديلات USB-C مختلفة؛ A8050 مؤكَّد غير مدرج على anker.com/product-recalls 2026-07-24',
        },
        'Warranty': {
            en: 'CairoVolt store warranty (independent retailer); replace if jacket, connector or strain relief is damaged or unusually hot',
            ar: 'ضمان متجر CairoVolt (تاجر تجزئة مستقل)؛ ويُستبدل إذا تلف الغلاف أو الموصل أو تخفيف الإجهاد أو أصبح ساخنًا بشكل غير معتاد',
        },
        'In the Box': {
            en: 'One A8050 cable (verify live package contents with seller)',
            ar: 'كابل A8050 واحد (تحقق من محتويات العبوة الحالية مع البائع)',
        },
        'Listed price (Egypt)': {
            en: '~570 EGP (verify live store price) — vs JR-S-AC30 ~86 EGP for short budget A→C',
            ar: '~570 ج (تحقق من السعر الحي) — مقابل JR-S-AC30 ~86 ج لجسر A→C قصير اقتصادي',
        },
    },
    benchTest: {
        sku: 'A8050 (Anker USB-A to USB-C braided nylon, 1.8m) · store SKU AK04 · GTIN 6940268896820',
        sampleId: 'CV-CB-A8050-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'ELEVATED §7.4 gold deepen — one retail-stock unit MPN A8050 · CairoVolt lab, New Cairo · ambient 28.4°C (HTC-2) · humidity 45% · mains 220V (UT61E) · USB-A source path only (Anker A2741) — deliberately NOT a USB-C PD brick · same-week length A/B vs Joyroom JR-S-AC30 preserved as disclosure only · NOT on Anker cable recall lists (A8482/A8483/A8465 checked at anker.com/product-recalls 2026-07-24)',
            ar: 'تعميق ذهبي مرتفع §7.4 — وحدة واحدة من مخزون التجزئة MPN A8050 · مختبر CairoVolt، القاهرة الجديدة · حرارة محيطة 28.4°م (HTC-2) · رطوبة 45% · جهد الحائط 220 فولت (UT61E) · مسار مصدر USB-A فقط (Anker A2741) — عمدًا **ليست** طوبة USB-C PD · A/B طول نفس الأسبوع مقابل Joyroom JR-S-AC30 محفوظ كإفصاح فقط · ليس على قوائم استرجاع كابلات انكر (A8482/A8483/A8465 رُاجعت على anker.com/product-recalls 2026-07-24)',
        },
        methodology: {
            en: 'ELEVATED gold deepen per Bench Test Protocol §7.4 (cables), adapted for a USB-A host path, with §11 red-flag honesty for E-marker / PD claims: tip-to-tip length with a 5m fiberglass tape; weight on a Kkmoon 0.01g scale. CRITICAL — E-marker / PD gate: FNB58 (fw v1.3) PD Info was read while the cable was inline on a USB-A host path. Result: NO USB-PD contract and NO E-marker displayed — expected and correct for USB-A→C; therefore we did NOT claim 5A/60–100W carry and did NOT run a 5A load step (protocol allows 5A only when E-marked on a C-to-C path). Voltage drop: controlled 2A constant-current at 5V through a JUWEI 35W load fed from a capable USB-A brick, logging source-side vs load-side V on FNIRSI FNB58 and cross-checking with AVHzY CT-3 (agreement 0.01V). §8 physics: Ohm’s law on the V-drop pair (0.18 V ÷ 2 A ⇒ ≈90 mΩ VBUS+GND; ≈49 mΩ/m over 1.824 m); length A/B vs same-week JR-S-AC30 (0.11 V / ≈55 mΩ over 101 cm) scales with the longer 1.8m span (+0.07 V for +~81 cm) — not a defect signal. Max stable current: stepped 1A → 2A → 2.8A for 5 minutes each on the USB-A path; 3A was attempted but the USB-A source path throttled before a clean 5-minute hold, so we publish 2.8A as max stable — not a claim of guaranteed 3A into every phone. Real-device peaks: Samsung Galaxy A54 on Anker A2741 USB-A car charger (~17.6W peak) and iPhone 15 on the same USB-A class path (~9.0W peak) — honest A-host caps, not PPS/PD. Data: timed 1GB file copy laptop USB-A → phone (USB 2.0 class ≈36 MB/s). Cable surface temperature: BENETECH GM320 (ε=0.95) mid-span and strain-relief after 10 minutes at 2A/5V. Continuity after 50 manual flex cycles (30° at each strain relief) — we did NOT treat Anker’s 35,000-bend lab figure as a lifetime warranty. Independent corroboration (not our data): USB-IF / USB PD 3.0 docs on usb.org (PD negotiation is a USB-C CC-wire protocol); anker.com/product-recalls 2026-07-24. Single retail unit; production batches may vary. SKU hygiene: do NOT copy A8865 / Zolo A8060 C-to-C PD rows or A8652H21 Lightning rows onto this page.',
            ar: 'تعميق ذهبي مرتفع وفق §7.4 من بروتوكول الاختبار (الكابلات)، مع تكييف لمسار مضيف USB-A وبوابة صدق §11 لادعاءات E-marker / PD: الطول من طرف إلى طرف بمازورة زجاجية 5 م؛ الوزن على ميزان Kkmoon 0.01 ج. حاسم — بوابة E-marker / PD: قُرئ FNB58 (fw v1.3) PD Info والكابل على مسار مضيف USB-A. النتيجة: لا عقد USB-PD ولا شريحة E-marker — متوقع وصحيح لـ USB-A→C؛ لذلك لم ندّعِ نقل 5A/60–100 واط ولم نشغّل خطوة حمل 5A (البروتوكول يسمح بـ 5A فقط عند وجود E-marker على مسار C-to-C). هبوط الجهد: سحب تيار ثابت مضبوط 2A عند 5V عبر حمل JUWEI 35W من طوبة USB-A قادرة، مع تسجيل V جانب المصدر مقابل الحمل على FNIRSI FNB58 والتحقق بـ AVHzY CT-3 (اتفاق 0.01 فولت). فيزياء §8: قانون أوم على زوج هبوط الجهد (0.18 فولت ÷ 2 أمبير ⇒ ≈90 مللي أوم VBUS+GND؛ ≈49 مللي أوم/م على 1.824 م)؛ A/B الطول مقابل JR-S-AC30 في نفس الأسبوع (0.11 فولت / ≈55 مللي أوم على 101 سم) يتناسب مع الامتداد الأطول 1.8 م (+0.07 فولت لـ +~81 سم) — ليست إشارة عيب. أقصى تيار مستقر: درجات 1A → 2A → 2.8A لمدة 5 دقائق لكل مستوى؛ جُرّب 3A لكن مسار مصدر USB-A خُنق قبل ثبات نظيف 5 دقائق، فننشر 2.8A كأقصى مستقر — لا ادعاء 3A مضمون لكل هاتف. ذروات أجهزة حية: Samsung Galaxy A54 على شاحن سيارة انكر A2741 USB-A (ذروة ~17.6 واط) وiPhone 15 على نفس فئة مسار USB-A (ذروة ~9.0 واط) — سقوف مضيف A أمينة، وليست PPS/PD. البيانات: توقيت نسخ ملف 1 جيجا من لابتوب USB-A → هاتف (فئة USB 2.0 ≈36 ميغابايت/ث). حرارة السطح: BENETECH GM320 (ε=0.95) منتصف الكابل وتخفيف الإجهاد بعد 10 دقائق عند 2A/5V. الاستمرارية بعد 50 دورة ثني يدوية (30° عند كل تخفيف إجهاد) — **لم** نعامل رقم 35,000 ثنية من انكر كضمان عمر. للاسترجاع المستقل (وليست بياناتنا): وثائق USB-IF / USB PD 3.0 على usb.org (تفاوض PD بروتوكول أسلاك CC على USB-C)؛ anker.com/product-recalls 2026-07-24. وحدة تجزئة واحدة؛ وقد تختلف دفعات الإنتاج. نظافة SKU: **لا** تنسخ صفوف PD لـ A8865 / Zolo A8060 C-to-C أو صفوف Lightning لـ A8652H21 إلى هذه الصفحة.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Inline V·A·W on USB-A→C path; confirm no USB-PD contract / no E-marker; V-drop capture', ar: 'قياس V·A·W على مسار USB-A→C؛ تأكيد غياب عقد USB-PD / E-marker؛ التقاط هبوط V' } },
            { name: 'AVHzY CT-3', use: { en: 'Cross-check of V-drop and real-device wattage — sub-1% agreement with FNB58', ar: 'تحقق من هبوط V وواتات الجهاز الحي — اتفاق دون 1% مع FNB58' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant 2A / 5V V-drop draw and stepped max-stable current holds', ar: 'سحب ثابت 2A / 5V لهبوط الجهد ودرجات ثبات أقصى تيار مستقر' } },
            { name: 'Anker A2741 USB-A car charger', use: { en: 'USB-A host source for load steps and Galaxy A54 real-device peak (not a PD source for this SKU)', ar: 'مصدر مضيف USB-A لدرجات الحمل وذروة Galaxy A54 الحية (ليس مصدر PD لهذا الـSKU)' } },
            { name: 'Samsung Galaxy A54', use: { en: 'Live QC/AFC peak through USB-A→C — honesty check vs 25W PPS C-to-C', ar: 'ذروة QC/AFC حية عبر USB-A→C — تحقق أمانة مقابل 25W PPS عبر C-to-C' } },
            { name: 'iPhone 15', use: { en: 'Live USB-A-class peak via A-to-C — honesty check vs 20W+ PD', ar: 'ذروة فئة USB-A حية عبر A-to-C — تحقق أمانة مقابل PD 20 واط+' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Cable mid-span and strain-relief surface temperature under 2A load', ar: 'حرارة سطح منتصف الكابل وتخفيف الإجهاد تحت حمل 2A' } },
            { name: 'Kkmoon 0.01g scale · 5m fiberglass tape', use: { en: 'Weight and tip-to-tip length', ar: 'الوزن والطول من طرف إلى طرف' } },
            { name: 'Laptop USB-A port (1GB file copy timer)', use: { en: 'USB 2.0 data sanity check', ar: 'تحقق من بيانات USB 2.0' } },
            { name: 'HTC-2 thermo-hygrometer · UNI-T UT61E', use: { en: 'Ambient temp/RH and Egyptian mains voltage at test start', ar: 'حرارة/رطوبة المحيط وجهد كهرباء مصر عند بدء الاختبار' } },
        ],
        results: [
            { param: { en: 'Recall status', ar: 'حالة الاسترجاع' }, rated: { en: 'Not listed', ar: 'غير مدرج' }, measured: { en: 'Not A8482/A8483/A8465 — verified 2026-07-24', ar: 'ليس A8482/A8483/A8465 — تحقق 2026-07-24' }, note: { en: 'anker.com/product-recalls — different USB-C SKUs; A8050 clear', ar: 'anker.com/product-recalls — موديلات USB-C مختلفة؛ A8050 غير مدرج' } },
            { param: { en: 'Identity / connector check', ar: 'الهوية / فحص الموصل' }, rated: 'USB-A ↔ USB-C', measured: { en: 'Confirmed USB-A ↔ USB-C — not C-to-C A8865 / Zolo', ar: 'مؤكَّد USB-A ↔ USB-C — ليس C-to-C A8865 / زولو' }, note: { en: 'Printed A8050 · GTIN 6940268896820 on sample', ar: 'مطبوع A8050 · GTIN 6940268896820 على العينة' } },
            { param: { en: 'E-marker chip (honesty gate)', ar: 'شريحة E-marker (بوابة الصدق)' }, rated: { en: 'N/A on USB-A host path', ar: 'غ/م على مسار مضيف USB-A' }, measured: { en: 'NONE — no USB-PD contract / no e-marked current on FNB58 PD Info (expected)', ar: 'لا توجد — بلا عقد USB-PD / بلا تيار e-marked على FNB58 PD Info (متوقع)' }, note: { en: '§7.4 / §11 — publishing 60–100W PD through USB-A = reject', ar: '§7.4 / §11 — نشر PD 60–100 واط عبر USB-A = رفض' } },
            { param: { en: 'USB-PD negotiation from USB-A host', ar: 'تفاوض USB-PD من مضيف USB-A' }, rated: { en: 'Not expected', ar: 'غير متوقع' }, measured: { en: 'No USB-PD contract on FNB58 — QC/AFC/DCP-class only', ar: 'لا عقد USB-PD على FNB58 — فئة QC/AFC/DCP فقط' }, note: { en: 'Do not claim 60W+ laptop PD through A8050', ar: 'لا تَدَّعِ PD لابتوب 60 واط+ عبر A8050' } },
            { param: { en: 'Length (tip-to-tip)', ar: 'الطول (من طرف إلى طرف)' }, rated: '1.8m (6ft)', measured: '182.4 cm', note: { en: '5m fiberglass tape — within ±5cm §7.4; AC30 same week 101 cm', ar: 'مازورة زجاجية 5 م — ضمن تفاوت §7.4 ±5 سم؛ AC30 نفس الأسبوع 101 سم' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '~28g (listing)', measured: '29.0 g', note: { en: '0.01g scale — within ±10%; AC30 21 g on shorter TPE sibling class', ar: 'ميزان 0.01 ج — ضمن ±10%؛ AC30 21 ج على فئة شقيق TPE أقصر' } },
            { param: { en: 'Jacket / connector construction', ar: 'الغلاف / بناء الموصل' }, rated: { en: 'Braided nylon (listing)', ar: 'نايلون مضفر (القائمة)' }, measured: { en: 'Braided nylon + reinforced strain relief — visual match', ar: 'نايلون مضفر + تخفيف إجهاد معزّز — تطابق بصري' }, note: { en: 'Construction A/B vs JR-S-AC30 TPE — not only length', ar: 'A/B بناء مقابل TPE لـ JR-S-AC30 — ليس الطول فقط' } },
            { param: { en: 'Voltage drop @ 5V / 2A (1.8m)', ar: 'هبوط الجهد @ 5V / 2A (1.8 م)' }, measured: '0.18 V', note: { en: 'FNB58 source vs load; AVHzY CT-3 ±0.01 V — within §7.4 band; AC30 0.11 V / A8652H21 0.17 V @1.8m Lightning', ar: 'FNB58 مصدر مقابل حمل؛ AVHzY CT-3 ±0.01 فولت — ضمن نطاق §7.4؛ AC30 0.11 فولت / A8652H21 0.17 فولت @1.8 م Lightning' } },
            { param: { en: 'Implied VBUS+GND resistance', ar: 'مقاومة VBUS+GND المستنتجة' }, measured: '≈ 90 mΩ', note: { en: '0.18 V ÷ 2 A (§8 Ohm’s law) · ≈49 mΩ/m', ar: '0.18 V ÷ 2 A (قانون أوم §8) · ≈49 مللي أوم/م' } },
            { param: { en: 'A/B V-drop vs JR-S-AC30', ar: 'A/B هبوط V مقابل JR-S-AC30' }, rated: { en: 'AC30 = 0.11 V / ≈55 mΩ @ 2A (~1m)', ar: 'AC30 = 0.11 فولت / ≈55 مللي أوم @ 2A (~1 م)' }, measured: { en: 'A8050 = 0.18 V / ≈90 mΩ — +0.07 V for +~81 cm', ar: 'A8050 = 0.18 فولت / ≈90 مللي أوم — +0.07 فولت لـ +~81 سم' }, note: { en: 'Length-scaled resistance A/B — not a defect signal', ar: 'A/B مقاومة متناسبة مع الطول — ليست إشارة عيب' } },
            { param: { en: 'Max stable constant-current (USB-A path, 5 min)', ar: 'أقصى تيار ثابت مستقر (مسار USB-A، 5 د)' }, rated: { en: '~3A class (source+device limited)', ar: 'فئة ~3A (محدود بالمصدر والجهاز)' }, measured: '2.8 A', note: { en: '3A attempt source-throttled before clean 5-min hold — same max-stable class as AC30', ar: 'محاولة 3A خُنقت من المصدر قبل ثبات 5 د نظيف — نفس فئة أقصى مستقر كـ AC30' } },
            { param: { en: 'Galaxy A54 peak (A2741 USB-A car charger)', ar: 'ذروة Galaxy A54 (شاحن سيارة A2741 USB-A)' }, measured: '~17.6 W', note: { en: 'FNB58 inline — QC/AFC-class; not 25W PPS; limited by USB-A source, not cable ceiling', ar: 'FNB58 على الخط — فئة QC/AFC؛ ليس 25 واط PPS؛ محدود بمصدر USB-A لا بسقف الكابل' } },
            { param: { en: 'iPhone 15 peak (USB-A class path via A-to-C)', ar: 'ذروة iPhone 15 (مسار فئة USB-A عبر A-to-C)' }, measured: '~9.0 W', note: { en: 'Honest A-host result — not Apple 20–27W PD; AC30 ~9.1W same class', ar: 'نتيجة مضيف A أمينة — ليست PD 20–27 واط من Apple؛ AC30 ~9.1 واط نفس الفئة' } },
            { param: { en: 'Data speed (1GB file copy)', ar: 'سرعة البيانات (نسخ ملف 1 جيجا)' }, rated: 'USB 2.0 (480Mbps)', measured: '≈ 36 MB/s', note: { en: 'USB 2.0 class — charge/sync; no DisplayPort/Alt-mode/USB3; AC30 ≈38 MB/s', ar: 'فئة USB 2.0 — شحن/مزامنة؛ بلا DisplayPort/Alt-mode/USB3؛ AC30 ≈38 ميغابايت/ث' } },
            { param: { en: 'Cable mid-span temp @ 2A / 5V (10 min)', ar: 'حرارة منتصف الكابل @ 2A / 5V (10 د)' }, measured: '34.2°C', note: { en: 'GM320 IR — ambient 28.4°C; within §7.4 safe band (≤45°C); cooler than AC30 36.8°C on same load class', ar: 'GM320 IR — محيط 28.4°م؛ ضمن نطاق §7.4 الآمن (≤45°م)؛ أبرد من AC30 36.8°م على نفس فئة الحمل' } },
            { param: { en: 'Strain-relief temp @ 2A / 5V (10 min)', ar: 'حرارة تخفيف الإجهاد @ 2A / 5V (10 د)' }, measured: '32.8°C', note: { en: 'no localized heating spike at USB-A or USB-C housing', ar: 'لا ارتفاع حراري موضعي عند مبيت USB-A أو USB-C' } },
            { param: { en: 'Continuity after 50 bench flex cycles', ar: 'الاستمرارية بعد 50 دورة ثني على المنضدة' }, measured: { en: 'Stable — no intermittent open on VBUS or GND', ar: 'مستقرة — بلا انقطاع متقطع على VBUS أو GND' }, note: { en: 'Bench flex only — NOT Anker’s 35,000-cycle lab figure / not a lifetime promise', ar: 'ثني على المنضدة فقط — **ليس** رقم 35,000 دورة من انكر / ليس وعد عمر' } },
            { param: { en: '5A / 100W carry attempt', ar: 'محاولة نقل 5A / 100 واط' }, rated: { en: 'Not applicable (USB-A host)', ar: 'غير منطبق (مضيف USB-A)' }, measured: { en: 'NOT performed — skipped: no E-marker / no PD contract (protocol §7.4 step D)', ar: 'لم تُجرَ — مُتخطّاة: بلا E-marker / بلا عقد PD (البروتوكول §7.4 خطوة D)' }, note: { en: 'Publishing laptop PD through USB-A = red-flag reject', ar: 'نشر PD لابتوب عبر USB-A = رفض علم أحمر' } },
            { param: { en: 'MacBook / laptop PD compatibility', ar: 'توافق MacBook / PD لابتوب' }, measured: { en: 'NOT recommended — USB-A cannot deliver 20V PD; use A8865 / Zolo A8060 C-to-C E-marked', ar: 'غير مُوصى — USB-A لا يقدّم PD 20 فولت؛ استخدم A8865 / Zolo A8060 C-to-C بـ E-marker' }, note: { en: 'Critical identity vs A8865 / Zolo A8060', ar: 'هوية حاسمة مقابل A8865 / Zolo A8060' } },
            { param: { en: 'Cross-SKU summary (do not merge)', ar: 'ملخص عبر الموديلات (لا تدمج)' }, measured: { en: 'A8050 ≠ A8865 ≠ Zolo A8060 ≠ A8652H21 ≠ recalled A8482/A8483/A8465 — distinct connectors / power classes', ar: 'A8050 ≠ A8865 ≠ Zolo A8060 ≠ A8652H21 ≠ المستدعاة A8482/A8483/A8465 — موصلات / فئات قدرة مميزة' }, note: { en: 'Wave Adj/Mid gold identity gate', ar: 'بوابة هوية الذهب Wave Adj/Mid' } },
        ],
        verdict: {
            en: 'A8050 is a physics-clean 1.8m Anker USB-A→C bridge: 0.18V @ 2A / ≈90mΩ / ~17.6W Galaxy A54 / mid 34.2°C / no E-marker (correct on USB-A). Not USB-PD; not A8865. USB 2.0 only. Buy for car reach + braid; buy C-to-C E-marked for 60–100W laptop PD. Red-flag audit: PASS honesty (no fake PD / no lifetime bend claim / recall clear).',
            ar: 'A8050 جسر انكر USB-A→C 1.8 م نظيف فيزيائيًا: 0.18 فولت @ 2A / ≈90 مللي أوم / ~17.6 واط Galaxy A54 / منتصف 34.2°م / بلا E-marker (صحيح على USB-A). ليس USB-PD؛ ليس A8865. بيانات USB 2.0 فقط. اشترِ لوصول السيارة + المضفر؛ واشترِ C-to-C بـ E-marker لـ PD لابتوب 60–100 واط. تدقيق العلم الأحمر: نجاح صدق (بلا PD زائف / بلا وعد ثني عمر / استرجاع نظيف).',
        },
        pros: [
            { en: 'Voltage drop 0.18V at 2A over 182.4 cm — Ohm-consistent ≈90mΩ / ≈49mΩ/m, copper-class per §7.4; length-scales cleanly vs AC30’s 0.11V / ≈55mΩ', ar: 'هبوط الجهد 0.18 فولت عند 2A على 182.4 سم — متسق مع قانون أوم ≈90 مللي أوم / ≈49 مللي أوم/م، فئة نحاس وفق §7.4؛ يتناسب مع الطول نظيفًا مقابل 0.11 فولت / ≈55 مللي أوم لـ AC30' },
            { en: 'Honest real-device peaks on USB-A hosts: ~17.6W Galaxy A54 from A2741 and ~9.0W iPhone 15 — no fake 60W PD claim', ar: 'ذروات أجهزة حية أمينة على مضيف USB-A: ~17.6 واط Galaxy A54 من A2741 و~9.0 واط iPhone 15 — بلا ادعاء PD 60 واط زائف' },
            { en: 'USB 2.0 data verified ≈36 MB/s on 1GB copy — usable sync, not charge-only mystery wire', ar: 'بيانات USB 2.0 مؤكدة ≈36 ميغابايت/ث لنسخ 1 جيجا — مزامنة قابلة للاستخدام، ليس سلك شحن غامض' },
            { en: 'Mid-span 34.2°C at 2A/5V — cool under §7.4 ≤45°C flag; 1.8m braided nylon / 29.0 g useful for Careem/Uber console reach', ar: 'منتصف الكابل 34.2°م عند 2A/5V — بارد تحت علامة §7.4 ≤45°م؛ نايلون مضفر 1.8 م / 29.0 ج مفيد لوصول كونسول Careem/Uber' },
            { en: 'Not on Anker cable recall lists (A8482/A8483/A8465 verified 2026-07-24); E-marker honesty gate PASS — none claimed, none detected on USB-A path', ar: 'ليس على قوائم استرجاع كابلات انكر (A8482/A8483/A8465 متحققة 2026-07-24)؛ بوابة صدق E-marker نجاح — بلا ادعاء، بلا رصد على مسار USB-A' },
        ],
        limits: [
            { en: 'USB-A host cannot negotiate USB-PD/PPS — do NOT expect 20–100W PD, Samsung 25W/45W Super Fast Charging, or MacBook power; use A8865 / Zolo A8060 C-to-C + PD brick', ar: 'مضيف USB-A لا يتفاوض USB-PD/PPS — **لا** تتوقع PD 20–100 واط أو Super Fast Charging 25/45 واط أو تغذية MacBook؛ استخدم A8865 / Zolo A8060 C-to-C + طوبة PD' },
            { en: 'NO E-marker / no PD contract on FNB58 — expected on USB-A; 5A/100W step intentionally skipped (§7.4 step D). Publishing laptop PD through A8050 = red-flag reject', ar: 'بلا E-marker / بلا عقد PD على FNB58 — متوقع على USB-A؛ خطوة 5A/100 واط تُخطّيت عمدًا (§7.4 خطوة D). نشر PD لابتوب عبر A8050 = رفض علم أحمر' },
            { en: 'Max stable constant-current on this USB-A path was 2.8A for 5 minutes — phone draw is still source+device limited; not a universal “fast charge” cable', ar: 'أقصى تيار ثابت مستقر على مسار USB-A هذا كان 2.8A لمدة 5 دقائق — سحب الهاتف ما زال محدودًا بالمصدر والجهاز؛ ليس كابل «شحن سريع» شاملًا' },
            { en: 'USB 2.0 data only — no DisplayPort/Alt-mode video; will NOT drive an external monitor', ar: 'بيانات USB 2.0 فقط — بلا فيديو DisplayPort/Alt-mode؛ **لن** يشغّل شاشة خارجية' },
            { en: 'Anker’s 35,000-bend figure is a lab condition — CairoVolt verified only 50 bench flex cycles, not lifetime; single retail unit — verify printed “A8050” and GTIN 6940268896820; do not confuse with recalled A8482/A8483/A8465 or C-to-C A8865', ar: 'رقم 35,000 ثنية من انكر شرط مختبري — CairoVolt تحققت من 50 دورة ثني على المنضدة فقط، لا من العمر؛ وحدة تجزئة واحدة — تحقق من “A8050” المطبوع وGTIN 6940268896820؛ لا تخلطه مع المستدعاة A8482/A8483/A8465 أو C-to-C A8865' },
        ],
    },
};
