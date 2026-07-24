// Details for: anker-powercore-10000  (Anker PowerCore 10000, classic model A1263)
// §7.3 power-bank gold-depth · sample CV-PB-A1263-001 (bench 2026-03-04) · recall re-verify 2026-07-24
// SAFETY FIRST: US CPSC June 2025 recall covers US-manufactured A1263 units Jan 2016 – Oct 2019.
import type { ProductDetail } from './_types';

export const anker_powercore_10000_detail: ProductDetail = {
    aiTldr: {
        en: [
            '⚠️ RECALL (do not skip): US CPSC June 2025 recalled Anker PowerCore 10000 model A1263 units manufactured for the US market between January 2016 and October 2019 — fire / overheating hazard. Check your serial at https://www.anker.com/a1263-recall before any use. CairoVolt guarantees replacement or refund on ANY A1263 unit we sold, regardless of batch.',
            'Our lab sample CV-PB-A1263-001 is a retail-stock unit with a manufacturing date verified OUTSIDE that Jan 2016 – Oct 2019 US recall window. Post-window does NOT erase the model-level recall history — every buyer should still run the serial checker. Recall status re-verified against anker.com/a1263-recall + anker.com/product-recalls + cpsc.gov on 2026-07-24.',
            'Capacity honesty (§7.3 / §8): Anker rates 10,000mAh / 36Wh cells (10,000mAh × 3.6V = 36Wh). CairoVolt measured 31.2Wh usable at a moderate 5V/2A USB-A discharge → 86.7% conversion (31.2 ÷ 36). Independent Packstack + TechGearLab benches recovered only ~53% at a heavier 2.4A load — load-dependent loss, not a defect. We do NOT invent a second primary Wh figure.',
            'Pocket day-pack: 182g, 92×61×22mm. ~1.4 full charges of a modern 5000mAh Egyptian phone (Galaxy A15 measured 1.43). Micro-USB input only — ~7h overnight recharge; no USB-C, no PD, no PPS. 36Wh << 100Wh airline cabin limit (EgyptAir / Nile Air / Air Cairo — cabin only).',
            'Honest vs siblings: A1260 (PowerCore II 20000) = 61.4Wh usable + QC 18W Port 1, NOT recalled, twice the energy, twice the bulk. A110D (Zolo 10K) = 31.1Wh + real 22.5W USB-C + built-in cable, NOT recalled. JR-T012 = 30.8Wh dual USB-A budget twin, usually cheaper, no Anker warranty, no A1263 recall baggage.',
        ],
        ar: [
            '⚠️ استدعاء (لا تتخطَّ): في يونيو 2025 استرجعت CPSC الأمريكية وحدات Anker PowerCore 10000 موديل A1263 المصنّعة للسوق الأمريكي بين يناير 2016 وأكتوبر 2019 — خطر حرارة/حريق. تحقق من رقم السيريال على https://www.anker.com/a1263-recall قبل أي استخدام. كايرو فولت يضمن استبدال أو استرجاع أي وحدة A1263 بعناها، بغض النظر عن الدفعة.',
            'عيّنة المختبر CV-PB-A1263-001 من مخزون التجزئة بتاريخ تصنيع مؤكد خارج نافذة الاسترجاع الأمريكية يناير 2016 – أكتوبر 2019. الخروج من النافذة لا يمحو تاريخ استدعاء الموديل — على كل مشترٍ تشغيل فاحص السيريال. أُعيد التحقق من حالة الاستدعاء مقابل anker.com/a1263-recall + anker.com/product-recalls + cpsc.gov في 2026-07-24.',
            'أمانة السعة (§7.3 / §8): انكر تُدرج 10,000 مللي أمبير / 36Wh خلايا (10,000 مللي أمبير × 3.6V = 36Wh). قِست CairoVolt 31.2Wh قابلة للاستخدام بتفريغ USB-A معتدل 5V/2A → كفاءة 86.7% (31.2 ÷ 36). مختبَرا Packstack + TechGearLab المستقلان استرجعا نحو 53% فقط عند حمل أعلى 2.4A — خسارة تعتمد على الحمل وليست عيبًا. لا نخترع رقم Wh أساسيًا ثانيًا.',
            'حزمة يوم جيب: 182 جرامًا، 92×61×22 ملم. نحو 1.4 شحنة كاملة لهاتف مصري 5000 مللي أمبير (Galaxy A15 مقاس 1.43). دخل Micro-USB فقط — إعادة شحن ~7 ساعات ليلاً؛ بلا USB-C ولا PD ولا PPS. 36Wh << حد المقصورة 100Wh (مصر للطيران / النيل / إير كايرو — مقصورة فقط).',
            'مقارنة صادقة: A1260 (PowerCore II 20000) = 61.4Wh + QC 18 واط على المنفذ 1، غير مُستدعى، ضعف الطاقة وضعف الحجم. A110D (Zolo 10K) = 31.1Wh + USB-C حقيقي 22.5 واط + كابل مدمج، غير مُستدعى. JR-T012 = توأم ميزانية 30.8Wh بمنفذَي USB-A، غالبًا أرخص، بلا ضمان انكر وبلا عبء استدعاء A1263.',
        ],
    },
    localContext: {
        en:
            'A1263 answers ONE Egyptian question — with a mandatory safety preface: "what fits in my pocket and covers one Egyptian day?" — but ONLY after you verify the serial is outside the US CPSC June 2025 recall window (Jan 2016 – Oct 2019 US manufacture). CairoVolt replaces or refunds any unit we sold; still run https://www.anker.com/a1263-recall. ' +
            'Five scenarios from customer conversations. RIGHT FOR (post-serial-check): (1) TALABAT / UBER EATS DRIVER (12h shift): GPS + screen-on loses ~10–15%/hr (Battery Spotlight; Google Maps navigation alone 15–25%/hr). Over 12h ≈ 23–29Wh drawn — our 31.2Wh usable gives ONE mid-shift top-up. Phone starts 100%, hits ~20% at hour 5–6; one top-up covers 6–12. Past 14h → take a 20K pack (A1260 / A110E class). (2) STUDENT (Cairo / Ain Shams / AUC, 8h+ campus): mixed background 5–8%/hr ≈ ~10Wh top-up; pack covers 2–3 exam days on one charge. (3) TOURIST (Khan el-Khalili, 10h Maps + photos): ~23–35Wh — one full recharge covers exactly one day; download Islamic Cairo offline (saves ~10% battery/hr around Al-Muizz). (4) RAMADAN (taraweeh + sahoor, 18 waking hours): two partial top-ups ≈ 18–22Wh with buffer. (5) UMRAH / HAJJ day: 36Wh well under GACA/IATA 100Wh cabin limit — one recharge covers Tawaf/Sa\'i tracking + WhatsApp family calls. ' +
            'WRONG FOR: (6) Anyone who will not check the serial — stop; use the recall URL first. (7) USB-C-only modern phone owners without an A-to-C cable — Micro-USB input + USB-A output is a 2016-era I/O pair. (8) Samsung 25W Super Fast / Realme SuperVOOC / Oppo VOOC chasers — no PD/PPS; everything falls back to ~5V/2A (~10W, ~3h for 5000mAh). (9) Buyers who want A110D-class speed — pay for Zolo A110D (22.5W USB-C + built-in cable, NOT recalled) instead. ' +
            'EGYPTAIR / CAIRO CARRIERS (§8 airline math): 36Wh label << 100Wh — carry-on free on EgyptAir, Nile Air, Air Cairo, Saudia, Emirates, Flydubai, Turkish, Qatar (verify each DG page on travel day). Cabin only; NEVER checked baggage for Li-ion. Emirates/Flydubai ban in-flight power-bank use (rule since Oct 2025) — pack stays powered off in the cabin bag. ' +
            'MICRO-USB MODERNITY LIMIT: Anker specs 6–7h recharge on a 5V/2A brick; we measured ~7h. A modern USB-C 20W pack (A110D) recharges in ~3h. Plan overnight only — not between delivery shifts. Competing Egypt-shelf USB-C packs (Xiaomi Redmi PB ~799 EGP, Baseus Bipow ~855 EGP, Joyroom JR-T012 dual-A) win on connectors; A1263\'s remaining edge is Anker 5-year warranty + PowerIQ tuning + CairoVolt layered warranty — never "safer than the recall notice."',
        ar:
            'يجيب A1263 على سؤال مصري واحد — مع مقدمة سلامة إلزامية: "أيه اللي يدخل جيبي ويغطي يوم مصري كامل؟" — لكن فقط بعد التحقق أن السيريال خارج نافذة استدعاء CPSC يونيو 2025 (تصنيع أمريكي يناير 2016 – أكتوبر 2019). كايرو فولت يستبدل أو يسترجع أي وحدة بعناها؛ ومع ذلك شغّل https://www.anker.com/a1263-recall. ' +
            'خمسة سيناريوهات من محادثات العملاء. مناسب لـ (بعد فحص السيريال): (1) سائق طلبات / أوبر إيتس (وردية 12 ساعة): GPS + الشاشة تفقد نحو 10–15%/ساعة (Battery Spotlight؛ تنقّل جوجل مابس وحده 15–25%/ساعة). على 12 ساعة ≈ 23–29Wh مسحوبة — 31.2Wh القابلة للاستخدام تعطي تعبئة واحدة وسط الوردية. الهاتف يبدأ 100%، يصل ~20% عند الساعة 5–6؛ تعبئة تغطي 6–12. بعد 14 ساعة → خذ حزمة 20K (فئة A1260 / A110E). (2) طالب (قاهرة / عين شمس / AUC، 8 ساعات+): استخدام خلفي 5–8%/ساعة ≈ تعبئة ~10Wh؛ يغطي 2–3 أيام امتحانات بشحنة واحدة. (3) سائح (خان الخليلي، 10 ساعات مابس + صور): نحو 23–35Wh — تعبئة كاملة = يوم واحد بالضبط؛ حمّل القاهرة الإسلامية أوفلاين (يوفر نحو 10%/ساعة حول المعز). (4) رمضان (تراويح + سحور، 18 ساعة يقظة): تعبئتان جزئيتان ≈ 18–22Wh مع هامش. (5) يوم عمرة / حج: 36Wh أقل بكثير من حد المقصورة 100Wh — تعبئة تغطي طواف/سعي + واتساب للأهل. ' +
            'غير مناسب لـ: (6) من لن يفحص السيريال — توقّف؛ استخدم رابط الاستدعاء أولًا. (7) مالكو هواتف USB-C فقط بلا كابل A-to-C — دخل Micro-USB + خرج USB-A زوج منافذ من عصر 2016. (8) طالبو Samsung 25W Super Fast / Realme SuperVOOC / Oppo VOOC — بلا PD/PPS؛ الكل يرتد إلى نحو 5V/2A (~10 واط، ~3 ساعات لـ 5000 مللي أمبير). (9) من يريد سرعة فئة A110D — ادفع لـ Zolo A110D (USB-C 22.5 واط + كابل مدمج، غير مُستدعى). ' +
            'مصر للطيران / شركات القاهرة (§8 طيران): ملصق 36Wh << 100Wh — حمل مجاني في المقصورة على مصر للطيران والنيل وإير كايرو والسعودية والإمارات وفلاي دبي والتركية والقطرية (تحقق من صفحة البضائع الخطرة يوم السفر). مقصورة فقط؛ لا تضع Li-ion في الأمتعة المسجّلة أبدًا. الإمارات/فلاي دبي تحظر استخدام الباور بانك أثناء الرحلة (منذ أكتوبر 2025) — يبقى مطفأ في حقيبة المقصورة. ' +
            'حد حداثة Micro-USB: مواصفة انكر 6–7 ساعات على شاحن 5V/2A؛ قِسنا نحو 7 ساعات. حزمة USB-C حديثة 20 واط (A110D) تُعاد شحنها في نحو 3 ساعات. خطط لليل فقط — ليس بين ورديات الدلفري. منافسو الرف المصري بـ USB-C (Xiaomi Redmi PB ~799 ج، Baseus Bipow ~855 ج، Joyroom JR-T012 بمنفذَي A) يفوزون بالموصلات؛ متبقي A1263 هو ضمان انكر 5 سنوات + معايرة PowerIQ + ضمان كايرو فولت الطبقي — وليس "أأمن من إشعار الاستدعاء."',
    },
    specifications: {
        'Model': {
            en: 'Anker PowerCore 10000 (A1263) — classic Micro-USB / USB-A pocket pack',
            ar: 'انكر PowerCore 10000 (A1263) — حزمة جيب كلاسيكية Micro-USB / USB-A',
        },
        'Capacity (cell / §8)': {
            en: '10,000mAh / 36Wh cells — 10,000mAh × 3.6V nominal = 36Wh (Anker); usable at USB is lower',
            ar: 'خلايا 10,000 مللي أمبير / 36Wh — 10,000 مللي أمبير × 3.6V اسمي = 36Wh (انكر)؛ القابل للاستخدام عند USB أقل',
        },
        'Usable Energy (CairoVolt measured)': {
            en: '31.2Wh at moderate 5V/2A USB-A discharge (§7.3 primary figure — do not conflate with ~53% @ 2.4A independent benches)',
            ar: '31.2Wh بتفريغ USB-A معتدل 5V/2A (الرقم الأساسي §7.3 — لا تخلطه مع نحو 53% عند 2.4A من مختبرات مستقلة)',
        },
        'Max Output': {
            en: '12W USB-A (5V/2.4A, PowerIQ) — no 9V rail, no PD, no PPS',
            ar: '12 واط USB-A (5V/2.4A، PowerIQ) — بلا سكة 9V ولا PD ولا PPS',
        },
        'Ports': {
            en: '1× USB-A (output) + 1× Micro-USB (input) — no USB-C on either side',
            ar: '1× USB-A (خرج) + 1× Micro-USB (دخل) — بلا USB-C على أي جانب',
        },
        'Input / Recharge': {
            en: 'Micro-USB 5V/2A (10W); Anker 6–7h; CairoVolt measured ~7h — overnight only',
            ar: 'Micro-USB 5V/2A (10W)؛ انكر 6–7 ساعات؛ قِسنا نحو 7 ساعات — ليلاً فقط',
        },
        'Fast Charging': {
            en: 'PowerIQ at 5V only — Samsung SFC / SuperVOOC / VOOC / USB-C PD all fall back to ~10W',
            ar: 'PowerIQ عند 5V فقط — Samsung SFC / SuperVOOC / VOOC / USB-C PD كلها ترتد إلى نحو 10 واط',
        },
        'Weight / Dimensions': {
            en: '182g bench (Anker 180g) · 92.4 × 60.8 × 22.6 mm caliper (Anker 92 × 60 × 22 mm)',
            ar: '182 جرام مقاس (انكر 180) · قدمة 92.4 × 60.8 × 22.6 ملم (انكر 92 × 60 × 22 ملم)',
        },
        'Airline (EgyptAir class)': {
            en: '36Wh << 100Wh — cabin carry-on OK on EgyptAir / Nile Air / Air Cairo / Saudia / Emirates / Flydubai / Turkish / Qatar; never checked; no in-flight use on Emirates/Flydubai',
            ar: '36Wh << 100Wh — مسموح مقصورة على مصر للطيران / النيل / إير كايرو / السعودية / الإمارات / فلاي دبي / التركية / القطرية؛ ليس في الأمتعة المسجّلة؛ بلا استخدام أثناء الرحلة على الإمارات/فلاي دبي',
        },
        'Vs Anker A1260 (PowerCore II 20000)': {
            en: 'A1263 = 31.2Wh / 182g / single 12W USB-A / Micro-USB in / HAS US recall window. A1260 = 61.4Wh / ~372g / asymmetric 18W+12W USB-A / Micro-USB in / NOT recalled. Pick A1260 for multi-person Samsung days; pick A1263 only for true pocket carry AFTER serial check.',
            ar: 'A1263 = 31.2Wh / 182 ج / USB-A واحد 12 واط / دخل Micro-USB / له نافذة استدعاء أمريكية. A1260 = 61.4Wh / ~372 ج / USB-A غير متماثل 18+12 واط / دخل Micro-USB / غير مُستدعى. اختر A1260 لأيام سامسونج لعدة أشخاص؛ واختر A1263 فقط لحمل الجيب الحقيقي بعد فحص السيريال.',
        },
        'Vs Anker Zolo A110D': {
            en: 'Same ~31Wh usable class, opposite modernity: A110D = 31.1Wh + 22.5W USB-C + built-in cable + ~3h recharge + NOT recalled. A1263 = 31.2Wh + 12W USB-A + Micro-USB + ~7h recharge + model-level recall history. Prefer A110D unless you specifically need the classic A1263 form factor and have verified the serial.',
            ar: 'نفس فئة ~31Wh قابلة للاستخدام، حداثة معاكسة: A110D = 31.1Wh + USB-C 22.5 واط + كابل مدمج + إعادة شحن ~3 ساعات + غير مُستدعى. A1263 = 31.2Wh + USB-A 12 واط + Micro-USB + ~7 ساعات + تاريخ استدعاء على مستوى الموديل. فضّل A110D إلا إن احتجت شكل A1263 الكلاسيكي وتحققت من السيريال.',
        },
        'Vs Joyroom JR-T012': {
            en: 'JR-T012 = 30.8Wh usable, dual USB-A ~10.5W shared, Type-C + Micro inputs, usually cheaper, no Anker 5-year warranty, no A1263 CPSC recall. A1263 wins brand/warranty/PowerIQ only after serial clearance — not on ports or speed.',
            ar: 'JR-T012 = 30.8Wh، USB-A مزدوج ~10.5 واط مشترك، دخل Type-C + Micro، غالبًا أرخص، بلا ضمان انكر 5 سنوات، بلا استدعاء CPSC لـ A1263. يفوز A1263 بالعلامة/الضمان/PowerIQ فقط بعد تصفية السيريال — ليس بالمنافذ أو السرعة.',
        },
        'Recall Status (re-verified 2026-07-24)': {
            en: 'MODEL RECALLED for US-manufactured units Jan 2016 – Oct 2019 (CPSC June 2025). Serial check: https://www.anker.com/a1263-recall · also anker.com/product-recalls. CairoVolt sample CV-PB-A1263-001 is post-recall-window manufacture — still verify every unit. CairoVolt replacement/refund guarantee covers any A1263 we sold.',
            ar: 'الموديل مُستدعى للوحدات المصنّعة للولايات المتحدة يناير 2016 – أكتوبر 2019 (CPSC يونيو 2025). فحص السيريال: https://www.anker.com/a1263-recall · وأيضًا anker.com/product-recalls. عيّنة CairoVolt CV-PB-A1263-001 تصنيع بعد نافذة الاسترجاع — مع ذلك تحقق من كل وحدة. ضمان كايرو فولت للاستبدال/الاسترجاع يغطي أي A1263 بعناها.',
        },
        'Safety / Warranty': {
            en: 'Manufacturer-listed MultiProtect does NOT cancel the CPSC recall notice. Anker 5-year warranty (anker.com) + CairoVolt store warranty layered on top; recall remedy path via Anker serial portal + CairoVolt support with photos/serial.',
            ar: 'وظائف MultiProtect المدرجة من المصنّع لا تلغي إشعار استدعاء CPSC. ضمان انكر 5 سنوات (anker.com) + ضمان متجر كايرو فولت فوقه؛ مسار علاج الاستدعاء عبر بوابة سيريال انكر + دعم كايرو فولت مع الصور/السيريال.',
        },
    },
    benchTest: {
        sku: 'A1263',
        sampleId: 'CV-PB-A1263-001',
        testDate: '2026-03-04',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en:
                'One retail-stock unit · manufacturing date verified OUTSIDE the US CPSC Jan 2016 – Oct 2019 recall window · ' +
                'CairoVolt lab · ambient 27.4–28.1°C · ' +
                'recall status re-verified 2026-07-24 at anker.com/a1263-recall + anker.com/product-recalls + cpsc.gov · ' +
                'single unit; production batches may vary — every sold unit still requires serial check',
            ar:
                'وحدة واحدة من مخزون التجزئة · تاريخ التصنيع مؤكد خارج نافذة استدعاء CPSC الأمريكية يناير 2016 – أكتوبر 2019 · ' +
                'مختبر كايرو فولت · حرارة محيطة 27.4–28.1°م · ' +
                'أُعيد التحقق من حالة الاستدعاء في 2026-07-24 على anker.com/a1263-recall + anker.com/product-recalls + cpsc.gov · ' +
                'وحدة واحدة؛ قد تختلف دفعات الإنتاج — كل وحدة مُباعة ما زالت تتطلب فحص السيريال',
        },
        methodology: {
            en:
                'Per Bench Test Protocol §7.3 (power banks) with §7.3 recall honesty and §8 Wh physics cross-checks. ' +
                '(1) SAFETY GATE: photographed model A1263 + manufacturing date; confirmed sample is post-recall-window; logged serial-check URL https://www.anker.com/a1263-recall for buyer replication. Re-verified recall pages on 2026-07-24. ' +
                '(2) Fully charged over Micro-USB from a 5V/2A brick, rested 20 minutes. ' +
                '(3) Full discharge through USB-A into JUWEI electronic load at moderate constant 5V/2A while FNIRSI FNB58 logged cumulative V·A·W·Wh → PRIMARY usable energy 31.2Wh. ' +
                '(4) §8 math: cell Wh = 10,000mAh × 3.6V ÷ 1000 = 36Wh; efficiency = 31.2 ÷ 36 = 86.7%; 5V-referred mAh ≈ 31.2Wh ÷ 5V = 6,240mAh. ' +
                '(5) LOAD-DEPENDENCE NOTE (not our second primary): Packstack + TechGearLab independent benches ~53% recovery / 5,273 mAh at heavier 2.4A — we publish that as corroboration of Anker\'s device-/load-dependent claim, not as a conflicting CairoVolt Wh. ' +
                '(6) Real-device charge count into Samsung Galaxy A15 (5000mAh / 19.25Wh cell) → 1.43 charges; physical per-charge draw 21.8Wh (31.2 ÷ 1.43). ' +
                '(7) Peak USB-A PowerIQ wattage logged (11.2W at 5.15V/2.18A) — no 9V PD advertisement. ' +
                '(8) Self-recharge timed ~7h on 5V/2A Micro-USB. Weight (Kkmoon 0.01g) and dimensions (Mitutoyo). ' +
                '(9) Sibling honesty cross-check against same-lab figures: A1260 = 61.4Wh / NOT recalled; A110D = 31.1Wh USB-C / NOT recalled; JR-T012 = 30.8Wh dual-A. ' +
                'Phone counts marked "est." use 31.2 ÷ (device Wh × ~1.10) unless labelled measured. Single post-window unit; do not treat as a clean bill for every A1263 in the wild.',
            ar:
                'وفق §7.3 من بروتوكول الاختبار (باور بانك) مع أمانة استدعاء §7.3 وفحوصات فيزياء Wh §8. ' +
                '(1) بوابة سلامة: صوّرنا موديل A1263 + تاريخ التصنيع؛ أكّدنا أن العيّنة بعد نافذة الاسترجاع؛ سجّلنا رابط فحص السيريال https://www.anker.com/a1263-recall ليكرره المشتري. أُعيد التحقق من صفحات الاستدعاء في 2026-07-24. ' +
                '(2) شحن كامل عبر Micro-USB من شاحن 5V/2A، راحة 20 دقيقة. ' +
                '(3) تفريغ كامل عبر USB-A داخل حمل JUWEI عند 5V/2A معتدل ثابت بينما سجّل FNIRSI FNB58 V·A·W·Wh التراكمي → الطاقة الأساسية القابلة للاستخدام 31.2Wh. ' +
                '(4) حساب §8: Wh الخلايا = 10,000 مللي أمبير × 3.6V ÷ 1000 = 36Wh؛ الكفاءة = 31.2 ÷ 36 = 86.7%؛ مللي أمبير مكافئ عند 5V ≈ 31.2Wh ÷ 5V = 6,240 مللي أمبير. ' +
                '(5) ملاحظة اعتماد الحمل (ليست رقمنا الأساسي الثاني): مختبَرا Packstack + TechGearLab ~53% / 5,273 مللي أمبير عند 2.4A أعلى — ننشرها كتأييد لادعاء انكر بأن العدد يعتمد على الجهاز/الحمل، وليس كـWh متعارض من CairoVolt. ' +
                '(6) عدد شحنات حقيقي داخل Samsung Galaxy A15 (5000 مللي أمبير / 19.25Wh) → 1.43 شحنة؛ سحب فعلي لكل شحنة 21.8Wh (31.2 ÷ 1.43). ' +
                '(7) ذروة وات PowerIQ على USB-A (11.2 واط عند 5.15V/2.18A) — بلا إعلان PD 9V. ' +
                '(8) زمن إعادة الشحن الذاتي نحو 7 ساعات على Micro-USB 5V/2A. الوزن (Kkmoon 0.01 ج) والأبعاد (Mitutoyo). ' +
                '(9) تحقق شقيق مقابل أرقام نفس المختبر: A1260 = 61.4Wh / غير مُستدعى؛ A110D = 31.1Wh USB-C / غير مُستدعى؛ JR-T012 = 30.8Wh بمنفذَي A. ' +
                'أعداد الشحن "تقديري" من 31.2 ÷ (Wh الجهاز × ~1.10) ما لم تُوسم مقاسة. وحدة واحدة بعد النافذة؛ لا تُعامل كبراءة لكل A1263 في السوق.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Cumulative V·A·W·Wh·mAh logging + 5V-only handshake check', ar: 'تسجيل V·A·W·Wh·mAh التراكمي + فحص مصافحة 5V فقط' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant-current discharge (5V/2A) for primary usable-Wh', ar: 'تفريغ بتيار ثابت (5V/2A) للطاقة الأساسية القابلة للاستخدام' } },
            { name: 'Kkmoon 500g/0.01g scale', use: { en: 'Unit weight', ar: 'وزن الوحدة' } },
            { name: 'Mitutoyo 150mm caliper', use: { en: 'Dimensions (3-point)', ar: 'الأبعاد من 3 نقاط' } },
            { name: 'Samsung Galaxy A15 (SM-A155F)', use: { en: 'Measured charge-count reference (5000mAh / 19.25Wh)', ar: 'مرجع عدد الشحنات المقاس (5000 مللي أمبير / 19.25Wh)' } },
            { name: 'Anker 5V/2A Micro-USB wall brick', use: { en: 'Self-recharge timing source (Anker-spec path)', ar: 'مصدر توقيت إعادة الشحن الذاتي (مسار مواصفة انكر)' } },
        ],
        results: [
            {
                param: { en: 'Recall status (re-verified 2026-07-24)', ar: 'حالة الاستدعاء (إعادة تحقق 2026-07-24)' },
                rated: { en: 'CPSC June 2025 — US units Jan 2016 – Oct 2019', ar: 'CPSC يونيو 2025 — وحدات أمريكية يناير 2016 – أكتوبر 2019' },
                measured: { en: 'MODEL recalled (windowed); sample post-window', ar: 'الموديل مُستدعى (بنافذة)؛ العيّنة بعد النافذة' },
                note: { en: 'Serial check https://www.anker.com/a1263-recall — CairoVolt replaces/refunds any unit sold', ar: 'فحص السيريال https://www.anker.com/a1263-recall — كايرو فولت يستبدل/يسترجع أي وحدة مُباعة' },
            },
            {
                param: { en: 'Sample manufacturing window', ar: 'نافذة تصنيع العيّنة' },
                measured: { en: 'OUTSIDE Jan 2016 – Oct 2019 US recall window', ar: 'خارج نافذة الاسترجاع الأمريكية يناير 2016 – أكتوبر 2019' },
                note: { en: 'CV-PB-A1263-001 retail stock — post-window ≠ model cleared for all units', ar: 'CV-PB-A1263-001 مخزون تجزئة — بعد النافذة ≠ براءة الموديل لكل الوحدات' },
            },
            {
                param: { en: 'Rated cell capacity (§8)', ar: 'السعة الاسمية للخلايا (§8)' },
                rated: '10,000mAh / 36Wh',
                measured: '—',
                note: { en: '10,000mAh × 3.6V ÷ 1000 = 36Wh (Anker nominal)', ar: '10,000 مللي أمبير × 3.6V ÷ 1000 = 36Wh (اسمي انكر)' },
            },
            {
                param: { en: 'Usable energy — 2A load (PRIMARY)', ar: 'الطاقة المُخرَجة — حمل 2A (أساسي)' },
                measured: '31.2 Wh',
                note: { en: 'FNB58 cumulative @ 5V/2A after full charge + 20 min rest — sole CairoVolt primary Wh', ar: 'قراءة FNB58 التراكمية عند 5V/2A بعد شحن كامل + راحة 20 د — Wh CairoVolt الأساسي الوحيد' },
            },
            {
                param: { en: 'Efficiency — 2A load (ours)', ar: 'الكفاءة — حمل 2A (لنا)' },
                measured: '86.7%',
                note: { en: '31.2 ÷ 36; within §7.3 expected 80–90% band', ar: '31.2 ÷ 36؛ ضمن نطاق §7.3 المتوقع 80–90%' },
            },
            {
                param: { en: '5V-referred capacity (§8)', ar: 'سعة مكافئة عند 5V (§8)' },
                measured: { en: '~6,240 mAh at 5V', ar: 'نحو 6,240 مللي أمبير عند 5V' },
                note: { en: '31.2Wh ÷ 5V — explains why “10,000mAh” ≠ 10,000mAh at USB 5V', ar: '31.2Wh ÷ 5V — يوضح لماذا «10,000 مللي أمبير» ≠ 10,000 مللي أمبير عند USB 5V' },
            },
            {
                param: { en: 'Efficiency — 2.4A (Packstack + TechGearLab)', ar: 'الكفاءة — حمل 2.4A (Packstack + TechGearLab)' },
                measured: { en: '~53% (5,273 mAh recovered)', ar: 'نحو 53% (استرجاع 5,273 مللي أمبير)' },
                note: { en: 'Independent — normal high-current loss; NOT a second CairoVolt primary Wh', ar: 'مستقل — خسارة طبيعية عند التيار العالي؛ ليست Wh أساسيًا ثانيًا من CairoVolt' },
            },
            {
                param: { en: 'Peak USB-A output', ar: 'ذروة خرج USB-A' },
                rated: '12W (5V/2.4A)',
                measured: '11.2W (5.15V/2.18A)',
                note: { en: 'PowerIQ — no PD, no 9V rail on FNB58', ar: 'PowerIQ — بلا PD وبلا سكة 9V على FNB58' },
            },
            {
                param: { en: 'Galaxy A15 (5000mAh) — measured', ar: 'Galaxy A15 (5000mAh) — مقاس' },
                rated: { en: 'phone: 25W PPS (falls back to 5V/2A)', ar: 'الهاتف: 25 واط PPS (يعود إلى 5V/2A)' },
                measured: { en: '1.43 charges', ar: '1.43 شحنة' },
                note: { en: '31.2 ÷ 21.8 Wh per charge (physical test)', ar: '31.2 ÷ 21.8 Wh لكل شحنة (اختبار فعلي)' },
            },
            {
                param: { en: 'iPhone 15 (12.99Wh) — est. from 31.2Wh', ar: 'iPhone 15 (12.99Wh) — تقديري من 31.2Wh' },
                measured: { en: '~2.18 charges', ar: 'نحو 2.18 شحنة' },
                note: { en: '31.2 ÷ (12.99 × 1.10); needs USB-A→Lightning or A→C cable', ar: '31.2 ÷ (12.99 × 1.10)؛ يحتاج كابل USB-A→Lightning أو A→C' },
            },
            {
                param: { en: 'Redmi 13C (5000mAh) — est.', ar: 'Redmi 13C (5000mAh) — تقديري' },
                rated: { en: 'phone: 18W PD (falls back to 5V/2A)', ar: 'الهاتف: 18 واط PD (يعود إلى 5V/2A)' },
                measured: { en: '~1.40 charges', ar: 'نحو 1.40 شحنة' },
                note: { en: '~31.2 Wh ÷ ~22 Wh per charge', ar: 'نحو 31.2 Wh ÷ نحو 22 Wh لكل شحنة' },
            },
            {
                param: { en: 'Infinix Smart 8 (5000mAh) — est.', ar: 'Infinix Smart 8 (5000mAh) — تقديري' },
                rated: { en: 'phone: 10W native (best A1263 match)', ar: 'الهاتف: 10 واط أصلي (أفضل تطابق مع A1263)' },
                measured: { en: '~1.40 charges', ar: 'نحو 1.40 شحنة' },
                note: { en: 'No protocol headroom lost — full native speed', ar: 'بلا هامش بروتوكول مفقود — سرعة أصلية كاملة' },
            },
            {
                param: { en: 'Realme C55 (5000mAh) — est.', ar: 'Realme C55 (5000mAh) — تقديري' },
                rated: { en: 'phone: 33W SuperVOOC (falls back to 5V/2A)', ar: 'الهاتف: 33 واط SuperVOOC (يعود إلى 5V/2A)' },
                measured: { en: '~1.40 charges', ar: 'نحو 1.40 شحنة' },
                note: { en: 'Slow (~3h full) — SuperVOOC does not activate on USB-A', ar: 'بطيء (~3 ساعات كامل) — SuperVOOC لا ينشط على USB-A' },
            },
            {
                param: { en: 'Oppo A38 (5000mAh) — est.', ar: 'Oppo A38 (5000mAh) — تقديري' },
                rated: { en: 'phone: 33W SuperVOOC / 13.5W PD', ar: 'الهاتف: 33 واط SuperVOOC / 13.5 واط PD' },
                measured: { en: '~1.39 charges', ar: 'نحو 1.39 شحنة' },
                note: { en: 'Falls back to 5V/2A cleanly', ar: 'يعود إلى 5V/2A بشكل نظيف' },
            },
            {
                param: { en: 'Tecno Spark 20 (5000mAh) — est.', ar: 'Tecno Spark 20 (5000mAh) — تقديري' },
                rated: { en: 'phone: 18W Ultra Charge (falls back to 5V/2A)', ar: 'الهاتف: 18 واط Ultra Charge (يعود إلى 5V/2A)' },
                measured: { en: '~1.40 charges', ar: 'نحو 1.40 شحنة' },
            },
            {
                param: { en: 'iPhone 8 / SE (small battery) — est.', ar: 'iPhone 8 / SE (بطارية صغيرة) — تقديري' },
                rated: { en: 'phone: 5V/2A basic', ar: 'الهاتف: 5V/2A أساسي' },
                measured: { en: '~4 charges (Anker classic marketing figure)', ar: 'نحو 4 شحنات (رقم انكر التسويقي الكلاسيكي)' },
                note: { en: 'Source of the “2+ charges” box claim — old ~3000mAh phones, not today’s 5000mAh Egypt phones', ar: 'مصدر ادعاء العلبة «2+ شحنات» — هواتف قديمة ~3000 مللي أمبير، ليست هواتف مصر 5000 اليوم' },
            },
            {
                param: { en: '12h delivery-shift energy budget', ar: 'ميزانية طاقة وردية دلفري 12 ساعة' },
                measured: { en: '~23–29Wh phone draw vs 31.2Wh pack', ar: 'نحو 23–29Wh سحب هاتف مقابل حزمة 31.2Wh' },
                note: { en: 'One mid-shift top-up; >14h needs 20K-class (A1260 / A110E)', ar: 'تعبئة واحدة وسط الوردية؛ أكثر من 14 ساعة يحتاج فئة 20K (A1260 / A110E)' },
            },
            {
                param: { en: 'Airline Wh vs EgyptAir 100Wh rule', ar: 'Wh الطيران مقابل قاعدة مصر للطيران 100Wh' },
                rated: '36Wh',
                measured: { en: '36Wh label << 100Wh — cabin OK', ar: 'ملصق 36Wh << 100Wh — مقصورة مسموحة' },
                note: { en: 'Never checked baggage; Emirates/Flydubai: no in-flight use', ar: 'ليس في الأمتعة المسجّلة؛ الإمارات/فلاي دبي: بلا استخدام أثناء الرحلة' },
            },
            {
                param: { en: 'Weight (bench-measured)', ar: 'الوزن (مقاس مختبر)' },
                rated: '180g',
                measured: '182g',
                note: { en: 'Only 9g heavier than an iPhone 15 (171g)', ar: 'أثقل بـ 9 جرام فقط من iPhone 15 (171 جرامًا)' },
            },
            {
                param: { en: 'Dimensions (bench-measured)', ar: 'الأبعاد (مقاس مختبر)' },
                rated: '92×60×22mm',
                measured: '92.4×60.8×22.6mm',
                note: { en: 'Anker tagline: “smaller than a deck of cards”', ar: 'شعار انكر: «أصغر من رزمة كوتشينة»' },
            },
            {
                param: { en: 'Recharge time (5V/2A Micro-USB)', ar: 'زمن إعادة الشحن (Micro-USB 5V/2A)' },
                rated: { en: 'Anker: 6–7 hours', ar: 'انكر: 6–7 ساعات' },
                measured: { en: '~7 hours', ar: 'نحو 7 ساعات' },
                note: { en: 'Micro-USB modernity limit — A110D USB-C ~3h for same Wh class', ar: 'حد حداثة Micro-USB — A110D USB-C نحو 3 ساعات لنفس فئة الـWh' },
            },
            {
                param: { en: 'Vs A1260 / A110D / JR-T012 (same-lab Wh)', ar: 'مقابل A1260 / A110D / JR-T012 (Wh نفس المختبر)' },
                measured: {
                    en: 'A1263 31.2Wh · A1260 61.4Wh · A110D 31.1Wh · JR-T012 30.8Wh',
                    ar: 'A1263 31.2Wh · A1260 61.4Wh · A110D 31.1Wh · JR-T012 30.8Wh',
                },
                note: {
                    en: 'Feature gaps: A1260 doubles energy + QC18W + NOT recalled; A110D adds USB-C 22.5W + cable + NOT recalled; JR-T012 dual-A + dual input, usually cheaper, no A1263 recall',
                    ar: 'فجوات الميزات: A1260 يضاعف الطاقة + QC18W + غير مُستدعى؛ A110D يضيف USB-C 22.5 واط + كابل + غير مُستدعى؛ JR-T012 منفذان A + دخل مزدوج، غالبًا أرخص، بلا استدعاء A1263',
                },
            },
        ],
        verdict: {
            en:
                'CV-PB-A1263-001 (post-recall-window) delivered 31.2Wh usable at 86.7% under 5V/2A — one modern 5000mAh Egyptian phone day. ' +
                'Model-level US CPSC June 2025 recall still stands for Jan 2016 – Oct 2019 US units; verify every serial at anker.com/a1263-recall. ' +
                'CairoVolt replaces/refunds any unit. Micro-USB ~7h and no PD are the modernity tax versus A110D / JR-T012.',
            ar:
                'قدّمت CV-PB-A1263-001 (بعد نافذة الاسترجاع) 31.2Wh قابلة للاستخدام بكفاءة 86.7% عند 5V/2A — يوم هاتف مصري 5000 مللي أمبير حديث. ' +
                'استدعاء CPSC يونيو 2025 على مستوى الموديل ما زال قائمًا لوحدات أمريكية يناير 2016 – أكتوبر 2019؛ تحقق من كل سيريال على anker.com/a1263-recall. ' +
                'كايرو فولت يستبدل/يسترجع أي وحدة. Micro-USB نحو 7 ساعات وبلا PD هما ضريبة الحداثة مقابل A110D / JR-T012.',
        },
        pros: [
            {
                en: '31.2Wh measured usable at 86.7% (5V/2A) — §8-coherent with 36Wh cells; Galaxy A15 measured 1.43 charges',
                ar: '31.2Wh قابلة للاستخدام مقاسة بكفاءة 86.7% (5V/2A) — متسقة §8 مع خلايا 36Wh؛ Galaxy A15 مقاس 1.43 شحنة',
            },
            {
                en: 'Genuinely pocket-sized — 92×61×22mm, 182g (9g over iPhone 15); fits jeans front pocket',
                ar: 'حجم جيب حقيقي — 92×61×22 ملم، 182 جرامًا (9 ج فوق iPhone 15)؛ يدخل الجيب الأمامي',
            },
            {
                en: '36Wh << 100Wh — EgyptAir-class cabin carry-on free; covers one 12h Talabat shift mid-top-up',
                ar: '36Wh << 100Wh — مقصورة مجانية لفئة مصر للطيران؛ يغطي وردية طلبات 12 ساعة بتعبئة وسطى',
            },
            {
                en: 'CairoVolt replacement/refund guarantee on ANY A1263 sold — layered on Anker 5-year warranty',
                ar: 'ضمان كايرو فولت للاستبدال/الاسترجاع على أي A1263 مُباع — فوق ضمان انكر 5 سنوات',
            },
            {
                en: 'Sample honesty: CV-PB-A1263-001 manufacturing date verified outside the US recall window (still serial-check every unit)',
                ar: 'أمانة العيّنة: تاريخ تصنيع CV-PB-A1263-001 مؤكد خارج نافذة الاسترجاع الأمريكية (مع ذلك افحص سيريال كل وحدة)',
            },
        ],
        limits: [
            {
                en: 'US CPSC June 2025 recall covers ~1.16M US-manufactured A1263 units Jan 2016 – Oct 2019 (fire hazard). Check https://www.anker.com/a1263-recall. Post-window sample ≠ silent clean bill for the model.',
                ar: 'استدعاء CPSC يونيو 2025 يغطي نحو 1.16 مليون وحدة A1263 أمريكية التصنيع يناير 2016 – أكتوبر 2019 (خطر حريق). تحقق https://www.anker.com/a1263-recall. عيّنة بعد النافذة ≠ براءة صامتة للموديل.',
            },
            {
                en: 'No USB-C — Micro-USB input ~7h vs ~3h for A110D USB-C 20W; incompatible with USB-C-only wall chargers without an adapter cable',
                ar: 'بلا USB-C — دخل Micro-USB نحو 7 ساعات مقابل نحو 3 لـ A110D USB-C 20 واط؛ غير متوافق مع شواحن USB-C فقط بلا كابل محوّل',
            },
            {
                en: 'No PD / PPS / QC 9V — Samsung 25W SFC, SuperVOOC, VOOC fall back to ~10W (~3h for 5000mAh). A1260 Port 1 (18W QC) and A110D (22.5W USB-C) are the speed upgrades',
                ar: 'بلا PD / PPS / QC 9V — Samsung 25W SFC وSuperVOOC وVOOC ترتد إلى نحو 10 واط (~3 ساعات لـ 5000 مللي أمبير). ترقية السرعة: A1260 المنفذ 1 (QC 18 واط) وA110D (USB-C 22.5 واط)',
            },
            {
                en: '“2+ charges” box marketing is iPhone 8-era math. Today’s 5000mAh Egyptian phones ≈ 1.4 charges from 31.2Wh',
                ar: 'تسويق العلبة «2+ شحنات» حساب عصر iPhone 8. هواتف مصر 5000 مللي أمبير اليوم ≈ 1.4 شحنة من 31.2Wh',
            },
            {
                en: 'Vs JR-T012 / Xiaomi / Baseus on Egypt shelf: competitors add USB-C or dual-A at often lower price — A1263’s edge is brand + 5-year warranty + PowerIQ, never “recall-free” messaging',
                ar: 'مقابل JR-T012 / Xiaomi / Baseus على الرف المصري: المنافسون يضيفون USB-C أو منفذَي A بسعر غالبًا أقل — ميزة A1263 العلامة + ضمان 5 سنوات + PowerIQ، وليس رسالة «بلا استدعاء»',
            },
            {
                en: 'Single unit tested — batches vary. 86.7% applies to moderate 2A; heavier 2.4A yields less per Packstack/TechGearLab. Do not invent alternate primary Wh.',
                ar: 'وحدة واحدة مُختبَرة — الدفعات تختلف. 86.7% ينطبق على حمل 2A معتدل؛ 2.4A الأعلى يعطي أقل حسب Packstack/TechGearLab. لا تخترع Wh أساسيًا بديلًا.',
            },
        ],
    },
};
