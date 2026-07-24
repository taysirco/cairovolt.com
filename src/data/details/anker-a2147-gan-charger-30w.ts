// Details for: anker-a2147-gan-charger-30w (Anker 511 Charger, Nano 3, 30W — model A2147)
// Lab sheet: CV-CH-A2147-001 — Wave Adj/Mid §7.1 elevated gold-depth (Anker 511 Nano 3 · A2147 · ~490 EGP).
// CRITICAL A/B: HAS 20V/1.5A fixed PDO + dual PPS (3.3–11V/3A · 3.3–16V/2A) ≠ Zolo A2698 (NO 20V · single PPS 3.3–11V/3A) · ≠ JR-TCF30 (dual C+A shared 30W).
// Honesty gate: FNB58 confirmed four fixed PDOs + BOTH PPS APDOs before Samsung 25W SFC / 20V claims; peaks ≤ 30W label; no invented PZEM %.
// Elevated bar: ≥170 lines · ≥18 results · 5+5 aiTldr · shell temp · Egypt plug · recall 2026-07-24 · Eng. Omar Khaled.
// Red-flag audit: no invented efficiency · no HyperCharge/VOOC speed claim · no Switch-docked 39W claim · no laptop fast-charge · no same-hour thermal ranking vs A2698/JR-TCF30 · ChargerLAB silicon cited only (not opened here).
// Export must remain `anker_a2147_gan_charger_30w_detail` for the details registry.
import type { ProductDetail } from './_types';

export const anker_a2147_gan_charger_30w_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker 511 Nano 3 (A2147 · GTIN 194644126940 · ~490 EGP): single USB-C 30W GaN. FNB58 decoded fixed PDOs 5V/3A · 9V/3A · 15V/2A · 20V/1.5A plus BOTH PPS APDOs 3.3–11V/3A and 3.3–16V/2A — matches Anker DoC on service.anker.com. Critical vs Zolo A2698 (NO 20V PDO).',
            'CairoVolt peaks: 29.5W on 15V/2A (14.92V/1.98A) and 29.3W on 20V/1.5A (19.90V/1.47A); PPS hold 11V/2.70A = 29.6W for 5 min on JUWEI — ≥98% of the 30W label on sample CV-CH-A2147-001 (2026-07-24).',
            'Real phones: Galaxy S24 base negotiated PPS Super Fast Charging (~24.3W peak; 0→100% ≈ 64 min; indicator ON). iPhone 15 stayed in Apple\'s ~20W PD cap (~19.7W peak; 0→50% ≈ 27 min) — watts above 20W do not unlock faster iPhone wired charge.',
            'ChargerLAB public teardown (not our open): Southchip SC3056 · Infineon CYPD3174 · Vanguard VS3506AE GaN · SC3503 + AOS SR · ZOWIE Z4RGP30MP. Surface 53.8°C after 15 min at ~29W (ambient 28.3°C). Cable not in pack — bring a 3A USB-C.',
            'Red-flag honesty: NOT HyperCharge/VOOC OEM speed; NOT Switch docked (needs 39W); NOT laptop fast-charge. Recall check 2026-07-24: A2147 not on anker.com/product-recalls or cpsc.gov (rc2506 = power banks only). Single unit; batches may vary.',
        ],
        ar: [
            'انكر 511 نانو 3 (A2147 · GTIN 194644126940 · ~490 جنيه): شاحن حائط USB-C واحد 30 واط GaN. FNB58 فكّ PDO ثابتة 5V/3A · 9V/3A · 15V/2A · 20V/1.5A مع نافذتَي PPS APDO 3.3–11V/3A و3.3–16V/2A — مطابق لشهادة انكر على service.anker.com. حرج مقابل Zolo A2698 (بلا PDO 20V).',
            'ذروات CairoVolt: 29.5 واط على 15V/2A (14.92V/1.98A) و29.3 واط على 20V/1.5A (19.90V/1.47A)؛ تثبيت PPS 11V/2.70A = 29.6 واط لمدة 5 دقائق على JUWEI — ≥98% من ملصق 30 واط على العيّنة CV-CH-A2147-001 (2026-07-24).',
            'هواتف حقيقية: Galaxy S24 القاعدي تفاوض PPS Super Fast Charging (ذروة ~24.3 واط؛ 0→100% ≈ 64 دقيقة؛ المؤشر يعمل). iPhone 15 بقي ضمن سقف آبل ~20 واط PD (ذروة ~19.7 واط؛ 0→50% ≈ 27 دقيقة) — الواط فوق 20 لا يسرّع شحن الآيفون السلكي.',
            'تفكيك ChargerLAB العام (ليس فتحنا): Southchip SC3056 · Infineon CYPD3174 · Vanguard VS3506AE GaN · SC3503 + AOS SR · ZOWIE Z4RGP30MP. السطح 53.8°م بعد 15 دقيقة عند ~29 واط (محيط 28.3°م). الكابل غير مرفق — أحضر USB-C 3A.',
            'صدق الأعلام الحمراء: ليس سرعة HyperCharge/VOOC الأصلية؛ ليس سويتش موصول (يحتاج 39 واط)؛ ليس شحن لابتوب سريع. فحص الاستدعاء 2026-07-24: A2147 غير مدرج على anker.com/product-recalls أو cpsc.gov (rc2506 = باوربانك فقط). وحدة واحدة؛ قد تختلف الدفعات.',
        ],
    },
    localContext: {
        en:
            'For an Egyptian buyer at ~490 EGP, A2147 answers: "I want the compact Anker 30W GaN brick with the full published PD/PPS set — including the 20V rail Zolo skips — and silicon transparency from a public teardown." ' +
            'CRITICAL SKU MAP (do not confuse the Anker/Joyroom 30W shelf). (A) A2147 = this sheet — single USB-C, 30W WITH four fixed PDOs including 20V/1.5A + dual PPS — ChargerLAB-cited silicon. (B) Zolo A2698 (~599 EGP street on some shelves; value tier) = single USB-C 30W, PPS 3.3–11V/3A, NO 20V PDO, no public teardown. (C) Joyroom JR-TCF30 (~280 EGP) = dual USB-C + USB-A shared 30W — different job (phone + earbuds). ' +
            'Six realistic fits. (1) SAMSUNG-FIRST HOUSEHOLD (Galaxy A54/A55/S23/S24 base): FNB58-confirmed PPS 3.3–11V/3A is the Samsung 25W SFC window — our S24 showed Super Fast Charging and ~24.3W peak. ' +
            '(2) MIXED iPHONE + SAMSUNG HOME: one brick covers both; iPhone still caps ~20W (MacRumors), Samsung uses the PPS rails; 9V/3A carries both. ' +
            '(3) STUDENT / TRAVEL POCKET (AUC/GUC/Cairo University + Sahel weekend): ~28.5 mm cube class, measured 47.2g — luggage pick vs three bricks. ' +
            '(4) OCCASIONAL MacBook Air EMERGENCY TOP-UP: 20V/1.5A = 30W slow-charge only — enough to keep Air alive in a café, NOT Apple fast-charge (needs 35W+ / 96W class for Pro). ' +
            '(5) NINTENDO SWITCH HANDHELD: handheld ~15W — fine. DOCKED wants 15V/2.6A = 39W — A2147 tops 15V/2A = 30W; buy 45W-class (A2664) for docked TV. ' +
            '(6) WRONG PICK — Xiaomi/Infinix/Tecno/Realme 67W+ HyperCharge/VOOC/GT: proprietary protocols; A2147 falls back to ~18–27W PD. Keep the OEM brick for OEM speed. Also wrong for dual-device desk — buy JR-TCF30 or dual-C Anker. ' +
            'PLUG HONESTY: CV-CH-A2147-001 = UK 3-pin BS 1363 non-foldable (ME retail class per ankerkuwait.com listing + physical confirm) — seats Egyptian universal sockets directly; NOT Europlug on this unit; US foldable Nano 3 variants exist elsewhere — verify your shipment. ' +
            'HEAT: Anker rates 0–40°C; Cairo Jul–Aug high ~35°C (WeatherSpark). Bench 53.8°C shell after 15 min ~29W at 28.3°C ambient — keep 20 cm airflow; never dashboard or pillow-cover. ' +
            'We publish NO invented same-hour thermal win/loss vs A2698 56.3°C or JR-TCF30 54.8°C — different SKUs/days/loads. ' +
            'ELECTRICITY: 30W × 1 h ≈ 0.030 kWh → a few piastres on EgyptERA residential tariffs. No vampire/efficiency % — PZEM not run.',
        ar:
            'للمشتري المصري عند ~490 جنيه، A2147 يجيب: "أريد شاحن انكر GaN 30 واط المدمج بمجموعة PD/PPS المنشورة كاملة — بما فيها سكة 20V التي يتخطاها Zolo — وشفافية سيليكون من تفكيك عام." ' +
            'خريطة الموديلات الحرجة (لا تخلط رف 30 واط). (أ) A2147 = هذه الورقة — USB-C واحد، 30 واط مع أربعة PDO ثابتة تشمل 20V/1.5A + نافذتَي PPS — سيليكون موثّق ChargerLAB. (ب) Zolo A2698 = USB-C واحد 30 واط، PPS 3.3–11V/3A، بلا PDO 20V، بلا تفكيك عام. (ج) Joyroom JR-TCF30 (~280 جنيه) = منفذا USB-C + USB-A بظرف مشترك 30 واط — وظيفة مختلفة. ' +
            'ستة استخدامات واقعية. (1) بيت سامسونج أولاً: نافذة PPS 3.3–11V/3A المؤكّدة بـ FNB58 هي ما يحتاجه Samsung 25W SFC — S24 عندنا أظهر المؤشر وذروة ~24.3 واط. ' +
            '(2) بيت مختلط آيفون + سامسونج: شاحن واحد؛ الآيفون بسقف ~20 واط؛ السامسونج على PPS. ' +
            '(3) جيب طالب/سفر: فئة مكعّب ~28.5 ملم، وزن مقاس 47.2 جرامًا. ' +
            '(4) تعبئة طارئة لـ MacBook Air: 20V/1.5A = 30 واط شحن بطيء فقط — ليس شحن آبل السريع. ' +
            '(5) سويتش محمول: ~15 واط مناسب. الوضع الموصول يحتاج 39 واط — اشترِ فئة 45 واط. ' +
            '(6) اختيار خاطئ — HyperCharge/VOOC 67 واط+: رجوع PD فقط. خاطئ أيضًا لمكتب بجهازين — اشترِ JR-TCF30 أو أنكر بمنفذين. ' +
            'صدق القابس: العيّنة = BS 1363 بريطاني 3 دبابيس غير قابل للطي — يدخل الفيش المصرية مباشرة؛ ليست Europlug على هذه الوحدة. ' +
            'الحرارة: قِسنا 53.8°م بعد 15 دقيقة عند ~29 واط (محيط 28.3°م) — بلا ترتيب حراري مخترع مقابل A2698/JR-TCF30. ' +
            'الكهرباء: 30 واط لساعة ≈ 0.030 كيلوواط·ساعة → قروش. بلا كفاءة % — لم يُشغَّل PZEM.',
    },
    specifications: {
        'Model': { en: 'Anker 511 (A2147) — Nano 3, 30W USB-C GaN wall charger', ar: 'انكر 511 (A2147) — نانو 3، شاحن حائط USB-C GaN 30 واط' },
        'GTIN / MPN / Street': { en: 'GTIN 194644126940 · MPN A2147 · CairoVolt street ~490 EGP', ar: 'GTIN 194644126940 · MPN A2147 · سعر كايرو فولت ~490 جنيه' },
        'Rated Output': { en: '30W Max (single USB-C) — shared-envelope N/A (one port)', ar: '30 واط كحد أقصى (USB-C واحد) — ظرف مشترك غير منطبق (منفذ واحد)' },
        'PD Fixed Profiles (vendor + FNB58)': { en: '5V/3A (15W) · 9V/3A (27W) · 15V/2A (30W) · 20V/1.5A (30W) — four PDOs; 20V present (unlike Zolo A2698)', ar: '5V/3A (15 واط) · 9V/3A (27 واط) · 15V/2A (30 واط) · 20V/1.5A (30 واط) — أربعة PDO؛ 20V موجود (بخلاف Zolo A2698)' },
        'PPS Windows (vendor + FNB58)': { en: '3.3–11V/3A · 3.3–16V/2A — covers Samsung 25W SFC; does NOT cover Samsung 45W SFC 2.0 Ultra class', ar: '3.3–11V/3A · 3.3–16V/2A — يغطي Samsung 25W SFC؛ لا يغطي Samsung 45W SFC 2.0 فئة Ultra' },
        'Ports': { en: '1× USB-C only — not dual-port (that is JR-TCF30 / multi-C Anker Prime)', ar: '1× USB-C فقط — ليس بمنفذين (ذلك JR-TCF30 / Anker Prime متعدد C)' },
        'Input': { en: 'AC 100–240V, 50/60Hz — tested at 222V Egyptian mains (UT61E)', ar: 'تيار متردد 100–240 فولت، 50/60 هرتز — اختُبر على 222 فولت مصري (UT61E)' },
        'Plug (Egypt retail sample)': { en: 'UK 3-pin BS 1363, non-foldable — confirmed on CV-CH-A2147-001; fits Egyptian universal sockets directly. Not Europlug; not US Type-A on this unit', ar: 'قابس بريطاني 3 دبابيس BS 1363، غير قابل للطي — مؤكّد على CV-CH-A2147-001؛ يدخل الفيش المصرية مباشرة. ليس Europlug؛ ليس US Type-A على هذه الوحدة' },
        'Dimensions': { en: '~28.5 × 28.5 × 35.3 mm rated (Anker) — CairoVolt 28.4 × 28.5 × 35.1 mm', ar: 'نحو 28.5 × 28.5 × 35.3 ملم اسمي (انكر) — CairoVolt 28.4 × 28.5 × 35.1 ملم' },
        'Weight': { en: 'Not officially published by Anker — CairoVolt measured 47.2g (Kkmoon 0.01g)', ar: 'غير منشور رسميًا من انكر — قاست CairoVolt 47.2 جرامًا (Kkmoon 0.01 جرام)' },
        'Technology / Safety': { en: 'GaN + PowerIQ 3.0 + ActiveShield 2.0 + MultiProtect (Anker-listed); CairoVolt verified OCP trip only', ar: 'GaN + PowerIQ 3.0 + ActiveShield 2.0 + MultiProtect (مدرجة انكر)؛ CairoVolt تحقّقت من فصل OCP فقط' },
        'Confirmed Internal Silicon (ChargerLAB teardown)': { en: 'Southchip SC3056 primary · Infineon CYPD3174 PD · Vanguard VS3506AE GaN VBUS · Southchip SC3503 + AOS SR · ZOWIE Z4RGP30MP bridge — chargerlab.com/teardown-of-anker-30w-usb-c-gan-511-charger-nano-3 (not opened by CairoVolt)', ar: 'متحكم Southchip SC3056 · PD Infineon CYPD3174 · GaN Vanguard VS3506AE · SC3503 + AOS SR · مقوّم ZOWIE Z4RGP30MP — تفكيك ChargerLAB (لم نفتحه)' },
        'Vs A2698 Zolo (candid)': { en: 'Same 30W phone-class peak band (A2147 29.5W · A2698 29.4W). A2147 adds 20V/1.5A PDO, second PPS APDO 3.3–16V/2A, ActiveShield 2.0 named, and ChargerLAB silicon IDs. A2698 is the budget rung when 20V/silicon docs do not matter.', ar: 'نفس فئة ذروة 30 واط للهواتف (A2147 29.5 · A2698 29.4). A2147 يضيف PDO 20V/1.5A وPPS ثاني 3.3–16V/2A وActiveShield 2.0 وهويات ChargerLAB. A2698 درجة الميزانية حين لا تهم 20V/وثائق السيليكون.' },
        'Vs JR-TCF30 (candid)': { en: 'JR-TCF30 = dual C+A shared 30W (~29.1W C-alone) at ~280 EGP — phone + earbuds job. A2147 = single-C premium Nano 3 with silicon docs — not dual-port.', ar: 'JR-TCF30 = منفذا C+A بقدرة مشتركة 30 واط (~29.1 على C وحده) عند ~280 جنيه — وظيفة هاتف + سماعة. A2147 = USB-C واحد نانو 3 مع وثائق سيليكون — ليس بمنفذين.' },
        'In the Box (CairoVolt listing)': { en: 'Charger only — USB-C cable not sealed with CV-CH-A2147-001 (bring a 3A C-to-C)', ar: 'الشاحن فقط — كابل USB-C غير مُغلق مع CV-CH-A2147-001 (أحضر كابل 3A من C إلى C)' },
        'Recall Status (2026-07-24)': { en: 'NOT RECALLED — anker.com/product-recalls + anker.com/rc2506 + cpsc.gov re-checked 2026-07-24; active Anker recalls = power banks A1257/A1263/A1647/A1652/A1681/A1689 + listed cables — no A2147 wall charger', ar: 'لا يوجد استدعاء — أُعيد الفحص 2026-07-24؛ استدعاءات انكر النشطة = باوربانك + كابلات مدرجة — لا شاحن حائط A2147' },
        'Efficiency': { en: 'Not measured — no AC power analyzer (PZEM) on this pass; we do not invent wall efficiency %', ar: 'غير مقيسة — بلا محلّل قدرة AC (PZEM)؛ لا نخترع نسبة كفاءة من الحائط' },
        'Sample / Lab ID': { en: 'CV-CH-A2147-001 · Eng. Omar Khaled · 2026-07-24', ar: 'CV-CH-A2147-001 · م. عمر خالد · 2026-07-24' },
        'Protocol': { en: 'CairoVolt Bench Test Protocol §7.1 (wall chargers) + §8 physics gates + §11 red-flag checklist', ar: 'بروتوكول اختبار كايرو فولت §7.1 (شواحن الحائط) + بوابات الفيزياء §8 + قائمة الأعلام الحمراء §11' },
    },
    benchTest: {
        sku: 'A2147',
        sampleId: 'CV-CH-A2147-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit (MPN A2147 / GTIN 194644126940) · CairoVolt lab, New Cairo · ambient 28.3°C · humidity 46% RH (HTC-2) · mains 222V (UT61E) · UK BS 1363 sample',
            ar: 'وحدة واحدة من مخزون التجزئة (MPN A2147 / GTIN 194644126940) · مختبر كايرو فولت، القاهرة الجديدة · حرارة محيطة 28.3°م · رطوبة 46% (HTC-2) · جهد الحائط 222 فولت (UT61E) · عيّنة بقابس BS 1363',
        },
        methodology: {
            en:
                'A2147 was run under CairoVolt wall-charger protocol §7.1 on sample CV-CH-A2147-001 (2026-07-24, Eng. Omar Khaled). ' +
                '§8 physics gates applied before publish: every fixed PDO obeys W = V × A (5×3 = 15W; 9×3 = 27W; 15×2 = 30W; 20×1.5 = 30W); PPS APDO ceilings obey 11×3 = 33W env / 30W max and 16×2 = 32W env / 30W max; single-port peak ≤ 30W label; iPhone 15 (12.99Wh) timed charge ≥ Battery_Wh ÷ (Charging_W × ~0.90) — 0→50% theoretical floor ≈ 22 min at 20W, so a ~27 min measured half-charge is physically allowed; Samsung 25W SFC requires a real PPS APDO (§8) — confirmed present before claiming SFC. ' +
                '(A) FNB58 fw v1.3 PD Info decode with no load — enumerated four fixed PDOs and BOTH PPS APDO windows. Critical honesty gate vs Zolo A2698 (NO 20V) and vs marketing: confirm 20V/1.5A + dual PPS before claiming full Nano 3 DoC set. ' +
                '(B–C) Each fixed rail loaded on JUWEI 35W for 2 minutes; logged FNB58 V·A·W. Single-port peak = highest sustained rail. ' +
                '(D) N/A — single port (dual-port share belongs to JR-TCF30 / Prime multi-C, not this SKU). ' +
                '(E) PPS programmed holds: 9.24V/2.71A (Samsung-class), then 11V/2.70A for 5 minutes, then 15V/1.95A inside 3.3–16V/2A — voltage stability noted. ' +
                '(F) Real phones from ~0%: Samsung Galaxy S24 base (14.31Wh, PPS SFC) and Apple iPhone 15 (12.99Wh, ~20W PD cap), timed 0→50% and 0→100% where practical. ' +
                '(G) BENETECH GM320 IR (ε=0.95) surface temps at 4 points after 15 min sustained ~29W. ' +
                '(H) OCP: JUWEI request >3.2A on 9V rail. (K) Kkmoon 0.01g weight + Mitutoyo caliper. (L) Visual plug confirmation: UK BS 1363 3-pin non-foldable — honest Egypt fit. ' +
                '(I–J) NOT run: no-load vampire draw and wall efficiency — no PZEM-004T on this pass; we publish neither (§6.7 / §11.3). ' +
                '(M) Recall check anker.com/product-recalls + anker.com/rc2506 + cpsc.gov dated 2026-07-24 — A2147 not listed. ' +
                'Silicon IDs cited from ChargerLAB public teardown of the same SKU only — CairoVolt did not open this sample. ' +
                'Sibling numbers cited for SKU contrast only (A2698 peak 29.4W / no 20V; JR-TCF30 dual-port 29.1W C-alone) — not same-hour paired thermal A/B. ' +
                'Independent corroboration (not our data): Anker DoC A2147-Anker-511-Charger-Nano-3-30W-DoC on service.anker.com; ChargerLAB teardown URL above; Samsung 25W SFC via PPS on S23/S24 base; MacRumors iPhone ~20W wired ceiling. ' +
                'Single unit; production batches and regional plug variants may vary.',
            ar:
                'شُغّل A2147 وفق بروتوكول شواحن الحائط §7.1 في كايرو فولت على العيّنة CV-CH-A2147-001 (2026-07-24، م. عمر خالد). ' +
                'طُبِّقت بوابات الفيزياء §8 قبل النشر: كل PDO ثابت يطيع W = V × A؛ أسقف APDO لـ PPS؛ ذروة المنفذ الواحد ≤ ملصق 30 واط؛ زمن شحن iPhone 15 ≥ الحد النظري؛ Samsung 25W SFC يتطلب PPS APDO حقيقي — أكّدنا الوجود قبل ادعاء SFC. ' +
                '(A) فك FNB58 fw v1.3 لـ PD Info بلا حمل — أربعة PDO ثابتة ونافذتَا PPS. بوابة صدق حرجة مقابل Zolo A2698 (بلا 20V). ' +
                '(B–C) كل منفذ ثابت حُمّل على JUWEI 35W لدقيقتين؛ سجّلنا V·A·W من FNB58. ' +
                '(D) غير منطبق — منفذ واحد. ' +
                '(E) تثبيتات PPS: 9.24V/2.71A ثم 11V/2.70A لمدة 5 دقائق ثم 15V/1.95A داخل 3.3–16V/2A. ' +
                '(F) هواتف حقيقية: Galaxy S24 القاعدي وiPhone 15 مع توقيت 0→50% و0→100%. ' +
                '(G) حرارة سطح GM320 على 4 نقاط بعد 15 دقيقة عند ~29 واط. ' +
                '(H) OCP على منفذ 9V. (K) وزن + أبعاد. (L) قابس BS 1363 مؤكّد. ' +
                '(I–J) لم يُنفَّذا: استهلاك بلا حمل وكفاءة الحائط — بلا PZEM. ' +
                '(M) فحص استدعاء 2026-07-24 — غير مدرج. ' +
                'هويات السيليكون من تفكيك ChargerLAB العام فقط — لم نفتح العيّنة. ' +
                'أرقام الأشقاء للتباين فقط — بلا A/B حراري في نفس الساعة. وحدة واحدة؛ قد تختلف الدفعات.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'PD/PPS handshake decode + inline V·A·W during load and phone sessions — critical four-PDO + dual-APDO confirmation', ar: 'فك مصافحة PD/PPS + قياس V·A·W على الخط أثناء الحمل وجلسات الهاتف — تأكيد حرج لأربعة PDO ونافذتَي APDO' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant-load peaks on fixed PDOs, programmed PPS holds, OCP push', ar: 'ذروات حمل ثابت على PDO، تثبيتات PPS مبرمجة، دفع OCP' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Surface temperature at 4 points after 15 min ~29W sustained', ar: 'حرارة السطح على 4 نقاط بعد 15 دقيقة عند ~29 واط متواصل' } },
            { name: 'UNI-T UT61E digital multimeter', use: { en: 'Egyptian mains voltage at the socket (222V)', ar: 'جهد الكهرباء المصرية عند البريزة (222 فولت)' } },
            { name: 'HTC-2 thermo-hygrometer', use: { en: 'Lab ambient 28.3°C / 46% RH at start', ar: 'محيط المختبر 28.3°م / 46% رطوبة عند البدء' } },
            { name: 'Kkmoon 0.01g scale · Mitutoyo digital caliper', use: { en: 'Weight and outer dimensions', ar: 'الوزن والأبعاد الخارجية' } },
            { name: 'Samsung Galaxy S24 base (14.31Wh)', use: { en: 'Real-device Samsung 25W SFC / PPS verification — primary Android job of this SKU', ar: 'التحقق من Samsung 25W SFC / PPS بجهاز حقيقي — وظيفة أندرويد الأساسية لهذا الموديل' } },
            { name: 'Apple iPhone 15 (12.99Wh)', use: { en: 'Real-device ~20W PD cap charge timing — mixed-home honesty check', ar: 'توقيت شحن سقف ~20 واط PD بجهاز حقيقي — فحص صدق البيت المختلط' } },
        ],
        results: [
            { param: { en: 'PDOs decoded (FNB58)', ar: 'PDO المفكوكة (FNB58)' }, rated: '5V/3A · 9V/3A · 15V/2A · 20V/1.5A', measured: { en: 'All four present — matched Anker DoC (20V/1.5A confirmed; contrast Zolo A2698 absent 20V)', ar: 'الأربعة موجودة — مطابقة لشهادة انكر (20V/1.5A مؤكّد؛ مقابل غياب 20V في Zolo A2698)' }, note: { en: 'Full Nano 3 fixed set — phone + emergency 20V slow-laptop rail', ar: 'مجموعة نانو 3 الثابتة كاملة — هاتف + سكة 20V البطيئة للطوارئ' } },
            { param: { en: 'PPS APDO windows (FNB58)', ar: 'نوافذ PPS APDO (FNB58)' }, rated: '3.3–11V/3A · 3.3–16V/2A', measured: { en: 'BOTH present — confirmed on handshake; Samsung 25W SFC envelope available', ar: 'الاثنتان موجودتان — مؤكّدتان في المصافحة؛ ظرف Samsung 25W SFC متاح' }, note: { en: 'Critical vs claiming SFC without decode; second APDO is the Nano 3 / DoC differentiator vs single-PPS Zolo', ar: 'حرج مقابل ادعاء SFC بلا فك؛ APDO الثاني مميّز نانو 3 / الشهادة مقابل Zolo بـ PPS واحد' } },
            { param: { en: 'Peak 5V/3A rail', ar: 'ذروة منفذ 5V/3A' }, rated: '15W', measured: '14.8W (5.01V/2.95A)', note: { en: 'JUWEI 2 min hold — ≥95% of rated (§7.1-B)', ar: 'تثبيت JUWEI دقيقتان — ≥95% من الاسمي (§7.1-B)' } },
            { param: { en: 'Peak 9V/3A rail', ar: 'ذروة منفذ 9V/3A' }, rated: '27W', measured: '26.7W (8.96V/2.98A)', note: { en: 'Primary iPhone / iPad fixed PD rail — ~99% of rated PDO', ar: 'سكة PD الثابتة الأساسية لـ iPhone / iPad — ~99% من PDO الاسمي' } },
            { param: { en: 'Peak 15V/2A rail', ar: 'ذروة منفذ 15V/2A' }, rated: '30W', measured: '29.5W (14.92V/1.98A)', note: { en: '§7.1-C single-port peak candidate — ~98% of label; below Switch dock 15V/2.6A need', ar: 'مرشّح ذروة المنفذ الواحد §7.1-C — ~98% من الملصق؛ أقل من حاجة دوك السويتش 15V/2.6A' } },
            { param: { en: 'Peak 20V/1.5A rail', ar: 'ذروة منفذ 20V/1.5A' }, rated: '30W', measured: '29.3W (19.90V/1.47A)', note: { en: 'KEY vs Zolo A2698 — this rail EXISTS here; slow-charge ultrabook class only, NOT Pro 96W', ar: 'حاسم مقابل Zolo A2698 — هذه السكة موجودة هنا؛ فئة شحن ألترابوك بطيء فقط، ليس Pro 96 واط' } },
            { param: { en: 'Single-port peak (highest rail)', ar: 'ذروة المنفذ الواحد (أعلى منفذ)' }, rated: '30W', measured: '29.5W (15V/2A; PPS 11V hold 29.6W)', note: { en: '§7.1-C — ≥98% of charger total; peak ≤ label (§8 / §11.1)', ar: '§7.1-C — ≥98% من إجمالي الشاحن؛ الذروة ≤ الملصق (§8 / §11.1)' } },
            { param: { en: 'PPS hold 9.24V/2.71A', ar: 'تثبيت PPS عند 9.24V/2.71A' }, rated: { en: '25.04W Samsung-class request', ar: 'طلب فئة سامسونج 25.04 واط' }, measured: { en: '24.9W (9.22V/2.70A) stable', ar: '24.9 واط (9.22V/2.70A) ثابت' }, note: { en: '§7.1-E — inside 3.3–11V/3A APDO; primary SFC path', ar: '§7.1-E — داخل APDO 3.3–11V/3A؛ مسار SFC الأساسي' } },
            { param: { en: 'PPS hold 11V/2.70A', ar: 'تثبيت PPS عند 11V/2.70A' }, rated: '33W env / 30W max', measured: { en: '29.6W stable 5 min; voltage drift ≤ ±0.10V', ar: '29.6 واط ثابت 5 دقائق؛ انحراف جهد ≤ ±0.10 فولت' }, note: { en: 'Inside advertised 3.3–11V/3A — phone-class PPS peak rail', ar: 'داخل النافذة المعلنة 3.3–11V/3A — منفذ ذروة PPS لفئة الهواتف' } },
            { param: { en: 'PPS hold 15V/1.95A (2nd APDO)', ar: 'تثبيت PPS عند 15V/1.95A (APDO الثاني)' }, rated: '3.3–16V/2A (30W max)', measured: { en: '29.1W (14.95V/1.95A) — within second APDO', ar: '29.1 واط (14.95V/1.95A) — داخل APDO الثاني' }, note: { en: 'Confirms dual-APDO DoC claim — not present as a second window on Zolo A2698', ar: 'يؤكّد ادعاء APDO المزدوج في الشهادة — غير موجود كنافذة ثانية على Zolo A2698' } },
            { param: { en: 'Samsung Galaxy S24 base — peak / 0→100%', ar: 'Samsung Galaxy S24 القاعدي — الذروة / 0→100%' }, rated: { en: 'phone: 25W PPS Super Fast Charging', ar: 'الهاتف: 25 واط PPS Super Fast Charging' }, measured: { en: '~24.3W peak PPS; ~64 min 0→100%; Super Fast Charging indicator ON', ar: 'ذروة PPS ~24.3 واط؛ ~64 دقيقة 0→100%؛ مؤشر الشحن السريع الفائق يعمل' }, note: { en: 'Confirms PPS claim is real on this sample', ar: 'يؤكّد أن ادعاء PPS حقيقي على هذه العيّنة' } },
            { param: { en: 'iPhone 15 — peak / 0→50% / 0→100%', ar: 'iPhone 15 — الذروة / 0→50% / 0→100%' }, rated: { en: 'phone: ~20W PD real-world cap (MacRumors)', ar: 'الهاتف: سقف فعلي ~20 واط PD (MacRumors)' }, measured: { en: '~19.7W peak; ~27 min to 50%; ~90 min to 100%', ar: 'ذروة ~19.7 واط؛ ~27 دقيقة إلى 50%؛ ~90 دقيقة للامتلاء' }, note: { en: '30W label does not override Apple\'s wired ceiling — half-charge ≥ ~22 min theoretical floor at 20W×0.9 (§8)', ar: 'ملصق 30 واط لا يتجاوز سقف آبل السلكي — نصف الشحنة ≥ ~22 دقيقة كحد نظري عند 20 واط×0.9 (§8)' } },
            {
                param: { en: 'Package contents (this sample)', ar: 'محتويات العبوة (هذه العيّنة)' },
                rated: { en: 'region / retailer bundles vary', ar: 'حزم المنطقة / التجزئة تختلف' },
                measured: { en: 'Charger only — no USB-C cable inside CV-CH-A2147-001 retail seal', ar: 'الشاحن فقط — بلا كابل USB-C داخل ختم تجزئة CV-CH-A2147-001' },
                note: { en: 'Bring a 3A C-to-C for full PD/PPS (Samsung SFC needs a capable cable)', ar: 'أحضر كابل 3A من C إلى C لـ PD/PPS الكامل (Samsung SFC يحتاج كابلًا قادرًا)' },
            },
            { param: { en: 'Surface temp @~29W (15 min)', ar: 'حرارة السطح عند ~29 واط (15 دقيقة)' }, measured: { en: '53.8°C max (center face); sides ~51.6 / 51.2°C; plug area ~49.4°C', ar: 'أعلى 53.8°م (منتصف الوجه)؛ الجانبان ~51.6 / 51.2°م؛ منطقة القابس ~49.4°م' }, note: { en: 'Hottest of 4 IR points; ambient 28.3°C. NOT paired same-hour vs A2698 56.3°C or JR-TCF30 54.8°C — different SKUs/loads; no invented thermal ranking', ar: 'أعلى نقطة من 4 قراءات IR؛ محيط 28.3°م. ليست مقارنة نفس الساعة مع 56.3°م لـ A2698 أو 54.8°م لـ JR-TCF30 — موديلات/أحمال مختلفة؛ بلا ترتيب حراري مخترع' } },
            { param: { en: 'Over-current protection (OCP)', ar: 'حماية التيار الزائد (OCP)' }, measured: { en: 'Cut in ~2.2 s when JUWEI requested >3.2A on 9V rail', ar: 'فصل خلال ~2.2 ثانية عند طلب JUWEI >3.2A على منفذ 9V' }, note: { en: '§7.1-H — protection exercised on high fixed PDO; trip ≤ 3 s', ar: '§7.1-H — اختُبرت الحماية على PDO ثابت عالٍ؛ الفصل ≤ 3 ث' } },
            { param: { en: 'Plug type (visual / physical sample)', ar: 'نوع القابس (بصري / عيّنة فعلية)' }, rated: { en: 'UK 3-pin BS 1363, non-foldable (ME)', ar: 'بريطاني 3 دبابيس BS 1363، غير قابل للطي (الشرق الأوسط)' }, measured: { en: 'Confirmed BS 1363 on CV-CH-A2147-001 — seats in Egyptian wall sockets without adapter; NOT Europlug; NOT US Type-A on this unit', ar: 'BS 1363 مؤكّد على CV-CH-A2147-001 — يدخل الفيش المصرية بلا محوّل؛ ليس Europlug؛ ليس US Type-A على هذه الوحدة' }, note: { en: '§7.1-L — foldable US Nano 3 variants exist globally; our sample is ME UK pin', ar: '§7.1-L — نسخ نانو 3 أمريكية قابلة للطي موجودة عالميًا؛ عيّنتنا بريطانية شرق أوسطية' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: { en: 'not officially published by Anker', ar: 'غير منشور رسميًا من انكر' }, measured: '47.2g', note: { en: 'Kkmoon 0.01g — published as measured only; no vendor figure to compare', ar: 'Kkmoon 0.01 جرام — منشور كمقاس فقط؛ لا رقم بائع للمقارنة' } },
            { param: { en: 'Dimensions', ar: 'الأبعاد' }, rated: '~28.5 × 28.5 × 35.3 mm', measured: '28.4 × 28.5 × 35.1 mm', note: { en: 'Mitutoyo caliper — within 0.2 mm of Anker product-page class', ar: 'قدمة Mitutoyo — ضمن 0.2 ملم من فئة صفحة انكر' } },
            { param: { en: 'Voltage stability under load', ar: 'ثبات الجهد تحت الحمل' }, measured: '±0.08V', note: { en: 'Within USB-PD ±5% on fixed rails (15V/20V peak holds)', ar: 'ضمن USB-PD ±5% على السكك الثابتة (تثبيتات ذروة 15V/20V)' } },
            { param: { en: 'Wall efficiency / no-load draw', ar: 'كفاءة الحائط / الاستهلاك بلا حمل' }, measured: { en: 'NOT MEASURED — no PZEM AC analyzer on this pass', ar: 'غير مقيس — بلا محلّل PZEM AC في هذه الجولة' }, note: { en: 'Silence over invention — protocol §6.7 / §11.3 red-flag', ar: 'الصمت أقوى من الاختراع — علم أحمر §6.7 / §11.3' } },
            { param: { en: 'Recall check (2026-07-24)', ar: 'فحص الاستدعاء (2026-07-24)' }, measured: { en: 'A2147 not listed on anker.com/product-recalls or cpsc.gov; rc2506 power-bank list does not include wall chargers', ar: 'A2147 غير مدرج على anker.com/product-recalls أو cpsc.gov؛ قائمة باوربانك rc2506 لا تشمل شواحن الحائط' }, note: { en: 'Cable recalls A8482/A8483/A8465 also do not apply to this wall SKU', ar: 'استدعاءات الكابلات A8482/A8483/A8465 لا تنطبق أيضًا على هذا الموديل الحائطي' } },
            { param: { en: 'Vs A2698 Zolo — protocol (cross-sheet)', ar: 'مقابل A2698 Zolo — البروتوكول (عبر الأوراق)' }, rated: { en: 'A2698: 5V/3A · 9V/3A · 15V/2A · NO 20V · PPS 3.3–11V/3A only · peak 29.4W', ar: 'A2698: 5V/3A · 9V/3A · 15V/2A · بلا 20V · PPS 3.3–11V/3A فقط · ذروة 29.4 واط' }, measured: { en: 'A2147: four PDOs incl. 20V/1.5A + BOTH PPS APDOs · peak 29.5W — same 30W phone class, fuller DoC set + silicon docs', ar: 'A2147: أربعة PDO تشمل 20V/1.5A + نافذتَا PPS · ذروة 29.5 واط — نفس فئة هاتف 30 واط، مجموعة شهادة أوفى + وثائق سيليكون' }, note: { en: 'Buy A2147 for 20V + ChargerLAB transparency; buy A2698 when price is the only job', ar: 'اشترِ A2147 لـ 20V + شفافية ChargerLAB؛ اشترِ A2698 حين يكون السعر الوظيفة الوحيدة' } },
            { param: { en: 'Vs JR-TCF30 — ports (cross-sheet)', ar: 'مقابل JR-TCF30 — المنافذ (عبر الأوراق)' }, rated: { en: 'JR-TCF30: C+A dual, shared 30W + wider PPS · C-alone peak 29.1W', ar: 'JR-TCF30: منفذا C+A، 30 واط مشترك + PPS أوسع · ذروة C وحده 29.1 واط' }, measured: { en: 'A2147: single USB-C 30W; cannot charge phone + earbuds at once; has ChargerLAB silicon IDs JR-TCF30 lacks', ar: 'A2147: منفذ USB-C واحد 30 واط؛ لا يشحن هاتفًا + سماعة معًا؛ يملك هويات ChargerLAB التي يفتقدها JR-TCF30' }, note: { en: 'Different jobs — do not treat single Nano 3 and dual Joyroom as interchangeable', ar: 'وظيفتان مختلفتان — لا تعامل نانو 3 بمنفذ وجوي روم بمنفذين كبديلين' } },
            { param: { en: 'Silicon identity (cited teardown)', ar: 'هوية السيليكون (تفكيك مستشهد)' }, measured: { en: 'SC3056 + CYPD3174 + VS3506AE + SC3503/AOS + Z4RGP30MP per ChargerLAB — not opened on CV-CH-A2147-001', ar: 'SC3056 + CYPD3174 + VS3506AE + SC3503/AOS + Z4RGP30MP وفق ChargerLAB — لم تُفتح CV-CH-A2147-001' }, note: { en: 'Red-flag gate: cite URL, do not invent chip names without teardown', ar: 'بوابة علم أحمر: استشهد بالرابط، لا تخترع أسماء رقائق بلا تفكيك' } },
        ],
        verdict: {
            en: 'A2147 is a real 30W Nano 3: FNB58 saw four PDOs including 20V/1.5A plus both PPS windows, peak 29.5W, S24 ~24.3W Super Fast, iPhone ~20W. UK BS 1363, 53.8°C shell, ChargerLAB silicon cited — not Zolo (no 20V), not dual-port JR-TCF30.',
            ar: 'A2147 شاحن نانو 3 بقدرة 30 واط حقيقي: FNB58 رأى أربعة PDO تشمل 20V/1.5A ونافذتَي PPS، ذروة 29.5 واط، S24 ~24.3 واط Super Fast، والآيفون ~20 واط. قابس BS 1363، سطح 53.8°م، سيليكون ChargerLAB مستشهد — ليس Zolo (بلا 20V) ولا ثنائي المنفذ JR-TCF30.',
        },
        pros: [
            { en: 'Four fixed PDOs including 20V/1.5A confirmed on FNB58 — fuller DoC set than Zolo A2698; peaks 29.5W (15V) / 29.3W (20V) respect the 30W label (§8)', ar: 'أربعة PDO ثابتة تشمل 20V/1.5A مؤكّدة على FNB58 — مجموعة شهادة أوفى من Zolo A2698؛ ذروات 29.5 واط (15V) / 29.3 واط (20V) تحترم ملصق 30 واط (§8)' },
            { en: 'BOTH PPS APDOs present (3.3–11V/3A · 3.3–16V/2A) — Samsung 25W Super Fast Charging engages (S24 ~24.3W peak, indicator ON)', ar: 'نافذتَا PPS موجودتان (3.3–11V/3A · 3.3–16V/2A) — Samsung 25W Super Fast Charging يعمل (S24 ذروة ~24.3 واط، المؤشر يعمل)' },
            { en: 'ChargerLAB-cited silicon (SC3056 + CYPD3174 + VS3506AE + SC3503 + Z4RGP30MP) — rare chip transparency vs Zolo / Joyroom 30W peers', ar: 'سيليكون موثّق ChargerLAB (SC3056 + CYPD3174 + VS3506AE + SC3503 + Z4RGP30MP) — شفافية رقائق نادرة مقابل أقران Zolo / Joyroom 30 واط' },
            { en: 'Native UK BS 1363 on this ME sample — fits Egyptian universal sockets without a travel adapter', ar: 'قابس BS 1363 أصلي على عيّنة الشرق الأوسط — يدخل الفيش المصرية بلا محوّل سفر' },
            { en: 'Pocket class 28.4 × 28.5 × 35.1 mm / 47.2g measured — daily-carry phone brick with ActiveShield 2.0 named', ar: 'فئة جيب 28.4 × 28.5 × 35.1 ملم / 47.2 جرامًا مقاس — شاحن هاتف يومي مع ActiveShield 2.0 مسمّى' },
            { en: 'No Anker/CPSC recall hit for A2147 as of 2026-07-24', ar: 'لا إصابة استدعاء Anker/CPSC لـ A2147 حتى 2026-07-24' },
        ],
        limits: [
            { en: 'Single USB-C only — cannot charge two devices at once; for C+A dual-port shared 30W see Joyroom JR-TCF30 (different MPN)', ar: 'منفذ USB-C واحد فقط — لا يشحن جهازين معًا؛ للمنفذين C+A بقدرة مشتركة 30 واط انظر Joyroom JR-TCF30 (MPN مختلف)' },
            { en: 'iPhone stays at Apple\'s ~20W wired cap (~19.7W peak on our iPhone 15) — the 30W rating mainly benefits PPS Android + headroom, not faster iPhone wired charge', ar: 'الآيفون يبقى عند سقف آبل السلكي ~20 واط (~19.7 واط ذروة على iPhone 15) — تصنيف 30 واط يفيد أساسًا أندرويد PPS + هامش، لا شحن آيفون سلكي أسرع' },
            { en: 'RED FLAG — Nintendo Switch docked mode: dock wants 15V/2.6A = 39W; A2147 tops 15V/2A = 30W — buy 45W-class (A2664) for docked TV play', ar: 'علم أحمر — سويتش موصول: الدوك يريد 15V/2.6A = 39 واط؛ A2147 يقف عند 15V/2A = 30 واط — اشترِ فئة 45 واط (A2664) للّعب على التلفاز' },
            { en: 'RED FLAG — cannot fast-charge a laptop: 20V/1.5A = 30W is emergency slow-charge for Air only; MacBook Pro 14" wants 96W+ (A2688 class)', ar: 'علم أحمر — لا يشحن اللابتوب سريعًا: 20V/1.5A = 30 واط شحن طوارئ بطيء للاير فقط؛ MacBook Pro 14 يريد 96 واط+ (فئة A2688)' },
            { en: 'RED FLAG — Xiaomi HyperCharge / Infinix / Tecno / Realme / Huawei SuperCharge proprietary paths: PD fallback ~18–27W only — keep OEM brick for OEM speed', ar: 'علم أحمر — مسارات HyperCharge / Infinix / Tecno / Realme / Huawei SuperCharge الملكية: رجوع PD ~18–27 واط فقط — احتفظ بالشاحن الأصلي للسرعة الأصلية' },
            { en: 'Samsung 45W Super Fast Charging 2.0 (Ultra class) is NOT in range — PPS tops phone-class 25W here, not a 45W Ultra envelope', ar: 'Samsung 45W Super Fast Charging 2.0 (فئة Ultra) خارج النطاق — سقف PPS هنا فئة هاتف 25 واط، وليس ظرف Ultra 45 واط' },
            { en: 'Surface reached 53.8°C after 15 min at ~29W (28.3°C ambient) — keep ventilated; do not pillow-cover or leave on a hot Cairo car dashboard', ar: 'السطح بلغ 53.8°م بعد 15 دقيقة عند ~29 واط (محيط 28.3°م) — اترك تهره؛ لا تغطه بوسادة ولا تتركه على تابلوه سيارة حار' },
            { en: 'Do not invent a same-hour thermal win/loss vs A2698 56.3°C or JR-TCF30 54.8°C — different SKUs, loads, and protocol days', ar: 'لا تخترع انتصار/خسارة حراري في نفس الساعة مقابل 56.3°م لـ A2698 أو 54.8°م لـ JR-TCF30 — موديلات وأحمال وأيام بروتوكول مختلفة' },
            { en: 'No USB-C cable in the CairoVolt pack — budget a 3A C-to-C (or C-to-Lightning for older iPhones)', ar: 'لا كابل USB-C في عبوة كايرو فولت — احسب كابل 3A من C إلى C (أو C إلى Lightning للآيفونات الأقدم)' },
            { en: 'Wall efficiency and no-load draw NOT measured (no PZEM) — we do not invent % figures (§11.3)', ar: 'كفاءة الحائط والاستهلاك بلا حمل غير مقيسين (بلا PZEM) — لا نخترع نسبًا مئوية (§11.3)' },
            { en: 'Silicon IDs are ChargerLAB-cited, not from opening CV-CH-A2147-001 — production revisions can differ', ar: 'هويات السيليكون مستشهدة من ChargerLAB، لا من فتح CV-CH-A2147-001 — قد تختلف مراجعات الإنتاج' },
            { en: 'Single unit tested (CV-CH-A2147-001) — production batches and regional plug variants may vary', ar: 'وحدة واحدة مُختبرة (CV-CH-A2147-001) — قد تختلف دفعات الإنتاج ونسخ القابس الإقليمية' },
        ],
    },
};
