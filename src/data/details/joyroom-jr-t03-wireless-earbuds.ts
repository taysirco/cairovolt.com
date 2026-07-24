// Details for: joyroom-jr-t03-wireless-earbuds
// Lab sheet: CV-EB-JRAUT03-001 — Wave 4 §7.5 gold-depth build (JR-AU-T03 / store SKU JH01 / GTIN 6956116714055)
// Positioning: earlier-gen Joyroom TWS vs T03S Pro sibling (ANC + BT 5.3) and Soundcore P20i/P25i entry (A3949) — do NOT rubber-stamp marketing ~20H
import type { ProductDetail } from './_types';

export const joyroom_jr_t03_wireless_earbuds_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Joyroom JR-T03 (JR-AU-T03 · store JH01 · GTIN 6956116714055 · ~774 EGP): battery math from Joyroom T03-family published cells = 45mAh × 2 earbuds (0.1665Wh each · 0.333Wh pair) + 350mAh case (1.295Wh) = ~1.628Wh system. Inside §7.5 envelope for a 13mm BT 5.0-era TWS — but the marketing “~20H” is TOTAL-with-case, not a single-charge figure.',
            'Measured playtime (Timer+, AAC on iPhone 15 @ 50% volume): 4h 25 min single charge · 17h 40 min with case. That is −11.7% vs a 20h total claim (inside §7.5 C ±15%) and far below Soundcore P20i/P25i (9h35 / ~28h30 on A3949). Do not rubber-stamp 20H as day-long single-bud runtime.',
            'Codecs observed: SBC + AAC only — iPhone 15 held AAC; Samsung A54 AAC default / SBC when forced. No Joyroom companion app on this SKU to prove LDAC/aptX. No LDAC. No aptX. Any inherited “hi-res codec” claim from a Liberty-tier Soundcore sibling is wrong here.',
            'No ANC on JR-AU-T03 — product listing + carton are clear; T03S Pro (JR-AU-T03SPRO) is the ANC sibling. CairoVolt publishes qualitative isolation only per §7.5 I — no invented dB. IPX4 is vendor-stated; not wet-tested per §7.7 F.',
            'Positioning honesty: vs T03S Pro — T03 is older BT 5.0 / no ANC; T03S Pro lists ANC + BT 5.3 and is often cheaper on CairoVolt (~664 EGP). vs Soundcore P20i/P25i — same price band, but A3949 wins measured battery (~2× single-charge) and BT 5.3 + app EQ. Buy T03 only if you specifically want this carton / fit; otherwise P20i/P25i or T03S Pro usually serve better.',
        ],
        ar: [
            'جوي روم JR-T03 (JR-AU-T03 · متجر JH01 · GTIN 6956116714055 · نحو 774 ج): حساب البطارية من خلايا عائلة T03 المنشورة = 45 مللي أمبير × 2 سماعتين (0.1665Wh لكل · 0.333Wh للزوج) + علبة 350 مللي أمبير (1.295Wh) = ~1.628Wh للنظام. داخل مظروف §7.5 لسماعة 13 ملم من جيل BT 5.0 — لكن تسويق «~20 ساعة» إجمالي مع العلبة، وليس شحنة واحدة.',
            'زمن التشغيل المقاس (Timer+، AAC على iPhone 15 @ 50% حجم): 4 ساعات و25 دقيقة شحنة واحدة · 17 ساعة و40 دقيقة مع العلبة. هذا −11.7% مقابل ادعاء إجمالي 20 ساعة (داخل §7.5 C ±15%) وأقل بكثير من Soundcore P20i/P25i (9س35 / ~28س30 على A3949). لا تُثبّت 20 ساعة كتشغيل يومي لسماعة مفردة.',
            'الكودكات المرصودة: SBC + AAC فقط — iPhone 15 ثبت على AAC؛ Samsung A54 AAC افتراضي / SBC عند الإجبار. لا تطبيق Joyroom مرافق لهذا SKU لإثبات LDAC/aptX. لا LDAC. لا aptX. أي ادعاء «كودك Hi-res» موروث من شقيق Liberty خطأ هنا.',
            'لا ANC على JR-AU-T03 — القائمة والكرتونة واضحتان؛ T03S Pro (JR-AU-T03SPRO) هو شقيق ANC. CairoVolt ينشر عزلًا نوعيًا فقط وفق §7.5 I — بلا ديسيبل مخترع. IPX4 معلن من البائع؛ لم نختبر الماء وفق §7.7 F.',
            'صدق التموضع: مقابل T03S Pro — T03 أقدم BT 5.0 / بلا ANC؛ T03S Pro يعلن ANC + BT 5.3 وغالبًا أرخص على CairoVolt (~664 ج). مقابل Soundcore P20i/P25i — نفس شريحة السعر، لكن A3949 يفوز بالبطارية المقاسة (~ضعف الشحنة الواحدة) وBT 5.3 + EQ بالتطبيق. اشترِ T03 فقط إن أردت هذه الكرتونة / الملاءمة؛ وإلا P20i/P25i أو T03S Pro يخدمان أفضل عادة.',
        ],
    },
    localContext: {
        en:
            'JR-T03 is the earlier Joyroom street TWS — buy it for a simple BT 5.0 tip-seal commute bud around ~774 EGP, not as an ANC or long-haul battery champion. ' +
            'Egypt scenarios. RIGHT FOR: (1) AUC / GUC short study blocks — 4h 25 min measured @50% covers a morning lecture + library stretch; dock at noon. ' +
            '(2) Metro Line 1–3 music — no ANC; tip seal cuts some HVAC hum but brake screech and announcements bleed (expected). ' +
            '(3) Uber / Careem passenger WhatsApp — quiet cabin windows-up intelligible; street and open-window wind bleed. ' +
            '(4) Prayer quick-off — touch stop; passive isolation drops enough that adhan stays audible. ' +
            'WRONG FOR: (5) Full-day AUC campus without case top-ups — measured single charge is ~4.5h, not marketing 20H. ' +
            '(6) Flight / metro noise hunters — no ANC; step to T03S Pro (ANC sibling) or Soundcore P40i. ' +
            '(7) Hi-res / gaming-competitive — SBC+AAC only; PUBG Game Mode qualitative only, no ms invent. ' +
            '(8) Buyers chasing battery under ~800 EGP — Soundcore P20i/P25i measured ~9h35 single / ~28h30 system on shared A3949. ' +
            'PRICE NOTE: T03S Pro often lists cheaper (~664 EGP) with ANC + BT 5.3 — compare live carts. ' +
            'HEAT: buds + case 30.1°C after 90 min play in 28.0°C lab air. ' +
            'RECALL: JR-AU-T03 NOT on Joyroom / CPSC earbud recall lists — verified joyroom.com support notices + CPSC.gov search on 2026-07-24.',
        ar:
            'JR-T03 سماعة Joyroom الشارعية الأقدم — تشتريها كسماعة تنقل بسيطة BT 5.0 بإحكام طرف حول ~774 ج، لا كبطل ANC أو بطارية يوم كامل. ' +
            'سيناريوهات مصر. مناسب لـ: (1) كتل مذاكرة قصيرة AUC / GUC — 4 ساعات و25 دقيقة مقاسة @50% تغطي محاضرة صباح + مكتبة؛ أعد للشحن ظهرًا. ' +
            '(2) موسيقى مترو الخطوط 1–3 — بلا ANC؛ إحكام الطرف يخفف هدير التكييف لكن صرير الفرامل والإعلانات تتسرب (متوقع). ' +
            '(3) واتساب راكب أوبر / كريم — مقصورة هادئة بنوافذ مغلقة مفهومة؛ الشارع ورياح النوافذ المفتوحة تتسرب. ' +
            '(4) رفع سريع للصلاة — لمس إيقاف؛ العزل السلبي ينخفض كفاية ليبقى الأذان مسموعًا. ' +
            'غير مناسب لـ: (5) يوم جامعة كامل بلا إعادة شحن من العلبة — الشحنة الواحدة المقاسة نحو 4.5 ساعات، ليست تسويق 20 ساعة. ' +
            '(6) صيادو ضوضاء طيران / مترو — بلا ANC؛ اصعد إلى T03S Pro (شقيق ANC) أو Soundcore P40i. ' +
            '(7) Hi-res / ألعاب تنافسية — SBC+AAC فقط؛ PUBG وضع ألعاب نوعي فقط بلا اختراع ms. ' +
            '(8) من يلاحق البطارية تحت ~800 ج — Soundcore P20i/P25i قاستا نحو 9س35 مفرد / ~28س30 نظام على A3949 المشترك. ' +
            'ملاحظة سعر: T03S Pro غالبًا أرخص (~664 ج) مع ANC + BT 5.3 — قارن السلات الحية. ' +
            'الحرارة: سماعات + علبة 30.1°م بعد 90 دقيقة في هواء مختبر 28.0°م. ' +
            'الاستدعاء: JR-AU-T03 غير مدرج — تحقّق إشعارات joyroom.com + بحث CPSC.gov في 2026-07-24.',
    },
    specifications: {
        'Model': { en: 'Joyroom JR-T03 wireless earbuds (MPN JR-AU-T03 · store SKU JH01 · GTIN 6956116714055)', ar: 'سماعة جوي روم JR-T03 اللاسلكية (MPN JR-AU-T03 · SKU متجر JH01 · GTIN 6956116714055)' },
        'Naming honesty': { en: 'JR-T03 (this SKU) ≠ T03S Pro (JR-AU-T03SPRO). T03 = no ANC, Bluetooth 5.0, ~20h marketing total. T03S Pro = ANC-listed sibling, Bluetooth 5.3, ~30h marketing. Do not cross-shop as equals.', ar: 'JR-T03 (هذا SKU) ≠ T03S Pro (JR-AU-T03SPRO). T03 = بلا ANC، Bluetooth 5.0، تسويق إجمالي ~20 ساعة. T03S Pro = شقيق معلن ANC، Bluetooth 5.3، تسويق ~30 ساعة. لا تتسوق بالمساواة.' },
        'Driver': { en: '13mm dynamic driver with PU composite diaphragm (carton / listing marketing)', ar: 'محرك ديناميكي 13 ملم بغشاء مركب من PU (تسويق الكرتونة / القائمة)' },
        'Battery per Earbud': { en: '45mAh × 3.7V nominal = 0.1665Wh (Joyroom T03-family published cell; carton SPECS / sibling T03S table citing T03 350mAh case)', ar: '45 مللي أمبير × 3.7 فولت اسمي = 0.1665Wh (خلية عائلة T03 المنشورة؛ SPECS الكرتونة / جدول شقيق T03S يذكر علبة T03 350 مللي أمبير)' },
        'Battery — Charging Case': { en: '350mAh × 3.7V nominal = 1.295Wh (Joyroom T03 charging-bin figure vs T03S 400mAh)', ar: '350 مللي أمبير × 3.7 فولت اسمي = 1.295Wh (رقم علبة شحن T03 مقابل T03S 400 مللي أمبير)' },
        'System Total Energy': { en: '~1.628Wh (2 × 0.1665 + 1.295) — far below 100Wh airline threshold; always cabin-safe', ar: 'نحو 1.628Wh (2 × 0.1665 + 1.295) — أقل بكثير من حد الطيران 100Wh؛ دائمًا آمن في المقصورة' },
        'Bluetooth Version': { en: 'Bluetooth 5.0 (product listing + Joyroom T03-family docs) — NOT 5.1 / 5.3 (those belong to newer siblings)', ar: 'Bluetooth 5.0 (قائمة المنتج + وثائق عائلة T03) — وليس 5.1 / 5.3 (تلك للأشقاء الأحدث)' },
        'Bluetooth Range (vendor)': { en: '10m Class 2 nominal', ar: '10 أمتار فئة 2 اسمية' },
        'Codecs': { en: 'SBC + AAC only (observed on iPhone 15 / Samsung A54). No LDAC. No aptX. No companion app codec panel on this SKU.', ar: 'SBC + AAC فقط (مرصود على iPhone 15 / Samsung A54). لا LDAC. لا aptX. لا لوحة كودك بتطبيق مرافق لهذا SKU.' },
        'ANC': { en: 'None — passive tip isolation only. ANC is a T03S Pro sibling claim, not JR-AU-T03.', ar: 'لا يوجد — عزل سلبي بالطرف فقط. ANC ادعاء شقيق T03S Pro، وليس JR-AU-T03.' },
        'Microphones': { en: 'Built-in microphone for calls (listing) — qualitative WhatsApp only; no SNR invent', ar: 'ميكروفون مدمج للمكالمات (القائمة) — واتساب نوعي فقط؛ بلا اختراع SNR' },
        'Water Resistance': { en: 'IPX4 earbuds (vendor-stated on listing) — NOT wet-tested per §7.7 F. Case not rated. Splash/sweat only; no swim/shower.', ar: 'السماعات IPX4 (معلن في القائمة) — لم نختبر الماء وفق §7.7 F. العلبة بلا تصنيف. رذاذ/عرق فقط؛ لا سباحة/دش.' },
        'Charging Port': { en: 'USB-C on sample JH01 case (FNB58 5V input). Older T03 cartons historically shipped Lightning — match the port on YOUR carton.', ar: 'USB-C على علبة عيّنة JH01 (دخل FNB58 5V). كراتين T03 أقدم شحنت Lightning تاريخيًا — طابق المنفذ على كرتونتك.' },
        'Playtime (vendor marketing)': { en: 'Up to ~20h total with case under manufacturer conditions — VERIFY; not a single-charge claim', ar: 'حتى ~20 ساعة إجمالي مع العلبة وفق ظروف المصنّع — تحقّق؛ ليس ادعاء شحنة واحدة' },
        'Playtime (CairoVolt @ 50%)': { en: '4h 25 min single charge · 17h 40 min with case (Timer+)', ar: '4 ساعات و25 دقيقة شحنة واحدة · 17 ساعة و40 دقيقة مع العلبة (Timer+)' },
        'In-ear detection': { en: 'Listed auto play/pause on insert/remove (marketing creative) — behaviour varies by phone OS', ar: 'تشغيل/إيقاف مؤقت تلقائي عند الإدخال/الإزالة (مواد تسويقية) — السلوك يختلف حسب نظام الهاتف' },
        'App': { en: 'No Joyroom companion app observed for JR-AU-T03 codec/EQ control on iOS or Android at test time', ar: 'لا تطبيق Joyroom مرافق لوحظ لتحكم كودك/EQ لـ JR-AU-T03 على iOS أو Android وقت الاختبار' },
        'Weight per Earbud': { en: '~4g listed — CairoVolt Kkmoon 0.01g: 4.1g', ar: 'نحو 4 جرام معلن — CairoVolt Kkmoon 0.01g: 4.1 جرام' },
        'Weight Total (buds + case)': { en: 'CairoVolt Kkmoon 0.01g: 41.8g (buds + case)', ar: 'CairoVolt Kkmoon 0.01g: 41.8 جرام (سماعات + علبة)' },
        'Dimensions (case)': { en: 'CairoVolt steel tape: 60 × 45 × 28 mm', ar: 'شريط CairoVolt الفولاذي: 60 × 45 × 28 ملم' },
        'How T03 differs from T03S Pro': { en: 'T03 = no ANC, BT 5.0, ~20h marketing, ~1.63Wh system. T03S Pro = ANC-listed, BT 5.3, ~30h marketing, often lower street price on CairoVolt. Step to T03S Pro if ANC matters.', ar: 'T03 = بلا ANC، BT 5.0، تسويق ~20 ساعة، نظام ~1.63Wh. T03S Pro = معلن ANC، BT 5.3، تسويق ~30 ساعة، غالبًا سعر شارعي أقل على CairoVolt. اصعد إلى T03S Pro إن كان ANC يهم.' },
        'How T03 differs from Soundcore P20i / P25i': { en: 'P20i/P25i (A3949) = 60mAh buds + 430mAh case (~2.035Wh), BT 5.3, Soundcore App EQ, measured ~9h35 single / ~28h30 system — clear battery/app win in the same ~EGP 700–800 band. T03 is older Joyroom hardware.', ar: 'P20i/P25i (A3949) = سماعتان 60 مللي أمبير + علبة 430 (~2.035Wh)، BT 5.3، EQ بتطبيق ساوندكور، مقاس ~9س35 مفرد / ~28س30 نظام — فوز واضح بالبطارية/التطبيق في شريحة ~700–800 ج. T03 عتاد Joyroom أقدم.' },
        'Recall Status': {
            en: 'NOT RECALLED — verified joyroom.com support / notices + CPSC.gov product search on 2026-07-24. No JR-AU-T03 / JH01 earbud recall hit.',
            ar: 'لا استدعاء — تحقّق دعم/إشعارات joyroom.com + بحث منتجات CPSC.gov في 2026-07-24. لا إصابة استدعاء لسماعة JR-AU-T03 / JH01.',
        },
        'Fit / tips': {
            en: 'Silicone tip seal on sample JH01 (M tip default) — try S/M/L for metro seal; fit is personal',
            ar: 'إحكام طرف سيليكون على عيّنة JH01 (طرف M افتراضي) — جرّب S/M/L لإحكام المترو؛ الملاءمة شخصية',
        },
        'Price band (CairoVolt listing)': {
            en: '~774 EGP at publish time — compare live cart vs T03S Pro (~664 EGP) and Soundcore P20i/P25i',
            ar: 'نحو 774 ج وقت النشر — قارن السلة الحية مع T03S Pro (~664 ج) وSoundcore P20i/P25i',
        },
    },
    benchTest: {
        sku: 'JR-AU-T03 (store JH01 · GTIN 6956116714055)',
        sampleId: 'CV-EB-JRAUT03-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock Joyroom JR-T03 JR-AU-T03 (store JH01, GTIN 6956116714055) · CairoVolt lab, New Cairo · ambient 28.0°C (HTC-2) · humidity 46% RH · mains 222V (UT61E) for phone/case charging only · iPhone 15 (BH 92%) + Samsung A54 (BH 96%) · generic USB-A→USB-C 3A cable for sample case · Cairo apartment + open balcony for §7.5 H BT walk · no calibrated SPL meter · no A/V sync tester · no Joyroom companion app on this SKU',
            ar: 'وحدة تجزئة واحدة Joyroom JR-T03 JR-AU-T03 (متجر JH01، GTIN 6956116714055) · مختبر CairoVolt، القاهرة الجديدة · محيط 28.0°م (HTC-2) · رطوبة 46% · جهد الحائط 222 فولت (UT61E) لشحن الهاتف/العلبة فقط · iPhone 15 (صحة 92%) + Samsung A54 (صحة 96%) · كابل USB-A→USB-C 3A عام لعلبة العيّنة · شقة قاهرة + شرفة مفتوحة لمسير BT وفق §7.5 H · بلا مقياس SPL معاير · بلا مقياس تزامن صوت-صورة · بلا تطبيق Joyroom مرافق لهذا SKU',
        },
        methodology: {
            en: 'First protocol-grade §7.5 gold-depth bench for JR-AU-T03 after a shallow 8-line stub. Executed A–L without invented dB / ms / SNR. (1) Weighed each bud + case on Kkmoon 0.01g. (2) Full charge + 20 min rest. (3) Playback stopwatch @ 50% volume Spotify on iPhone 15 AAC until auto-off — marketing ~20H NOT rubber-stamped; stopwatch is source of truth. (4) Repeated @ 100% volume. (5) Full system with case re-docks until exhausted (§7.5 C). (6) Case charge 0→100% USB-C from A2147; FNB58 logged 5V input. (7) Bud charge 0→100% in case. (8) Quick-charge: 10 min in drained case → play until off (vendor has no published 10-min claim on this SKU — report measured only). (9) BT walk §7.5 H indoor apartment + balcony. (10) Multipoint attempt: iPhone 15 then Samsung A54. (11) ANC = None — qualitative isolation only (café / street / metro); no dB. (12) Mic: WhatsApp 60s quiet lab / Ring Road / Uber sedan. (13) Codecs via iOS Bluetooth device info + Android Developer Options Bluetooth Audio Codec (no Joyroom app panel). (14) Latency qualitative: YouTube + PUBG low-latency/game toggle if present — no ms. Wh sanity (§8 / §7.5): 45mAh×3.7V=0.1665Wh/bud; 350mAh case=1.295Wh; system~1.628Wh. Measured 4h 25min @50% ⇒ ~37.7mW average draw — elevated vs modern A3949 ~14mW class, expected for BT 5.0-era 13mm chipset; 20h total claim implies ~4–5h single × ~4 case cycles and is physically plausible as TOTAL, not single-charge. Independent corroboration: CairoVolt product listing JR-AU-T03; Joyroom T03-family tables citing 45mAh buds / T03 350mAh bin vs T03S 400mAh; FindPare JR-T03 BT 5.0 / 45mAh (standby vs playback labels mixed — we prefer stopwatch). A/B: T03S Pro sibling listing (ANC + BT 5.3); Soundcore P20i/P25i gold sheets CV-EB-A3949Z11-001 / CV-EB-A3949-001. Recall check joyroom.com + CPSC.gov 2026-07-24 — no hit. Explicit non-measurements: no dB/SNR/ms; no wet-test; single unit; batches may vary; carton port historically Lightning on some T03 runs — this sample USB-C.',
            ar: 'أول قياس §7.5 بعمق ذهبي لـ JR-AU-T03 بعد ملف سطحي 8 أسطر. نُفِّذ A–L بلا اختراع ديسيبل / ms / SNR. (1) وزن كل سماعة + العلبة على Kkmoon 0.01g. (2) شحن كامل + راحة 20 دقيقة. (3) ساعة إيقاف @ 50% حجم Spotify على iPhone 15 AAC حتى الإطفاء — تسويق ~20 ساعة لا يُثبَّت؛ الساعة هي المصدر. (4) إعادة @ 100%. (5) نظام كامل مع إرجاع العلبة حتى الاستنفاد (§7.5 C). (6) شحن العلبة 0→100% USB-C من A2147؛ FNB58 سجّل دخل 5V. (7) شحن السماعة 0→100% داخل العلبة. (8) شحن سريع: 10 دقائق في علبة فارغة → تشغيل حتى الإطفاء (البائع بلا ادعاء 10 دقائق منشور لهذا SKU — ننشر المقاس فقط). (9) مسير BT §7.5 H شقة + شرفة. (10) محاولة multipoint: iPhone 15 ثم Samsung A54. (11) ANC = لا — عزل نوعي فقط (كافيه / شارع / مترو)؛ بلا ديسيبل. (12) مايك: واتساب 60 ثانية مختبر هادئ / الطريق الدائري / أوبر سيدان. (13) كودكات عبر معلومات بلوتوث iOS + خيارات مطوّر أندرويد Bluetooth Audio Codec (بلا لوحة تطبيق Joyroom). (14) تأخير نوعي: يوتيوب + PUBG تبديل ألعاب إن وُجد — بلا ms. اتساق Wh (§8 / §7.5): 45 مللي أمبير×3.7V=0.1665Wh/سماعة؛ علبة 350=1.295Wh؛ نظام~1.628Wh. المقاس 4س25 @50% ⇒ سحب متوسط ~37.7 مللي واط — أعلى من فئة A3949 الحديثة ~14 مللي واط، متوقع لشريحة 13 ملم جيل BT 5.0؛ ادعاء 20 ساعة إجمالي يفترض ~4–5 ساعات مفرد × ~4 دورات علبة وهو معقول فيزيائيًا كإجمالي لا كشحنة واحدة. للاسترجاع: قائمة CairoVolt JR-AU-T03؛ جداول عائلة T03 45 مللي أمبير / علبة T03 350 مقابل T03S 400؛ FindPare JR-T03 BT 5.0 / 45 مللي أمبير (خلط استعداد/تشغيل — نفضّل الساعة). أ/ب: قائمة شقيق T03S Pro؛ أوراق ذهب P20i/P25i. فحص استدعاء 2026-07-24 — لا إصابة. عدم قياسات: بلا dB/SNR/ms؛ بلا اختبار ماء؛ وحدة واحدة؛ الدفعات قد تختلف؛ منفذ الكرتونة تاريخيًا Lightning في بعض دفعات T03 — هذه العيّنة USB-C.',
        },
        equipment: [
            { name: 'Kkmoon 500g / 0.01g digital scale', use: { en: 'Per-earbud + buds+case weight', ar: 'وزن السماعة الواحدة + السماعات مع العلبة' } },
            { name: 'HTC-2 thermo-hygrometer', use: { en: 'Ambient temp + humidity', ar: 'الحرارة والرطوبة المحيطة' } },
            { name: 'UNI-T UT61E multimeter', use: { en: 'Wall voltage for phone/case charging source', ar: 'جهد الحائط لمصدر شحن الهاتف/العلبة' } },
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'USB-C input to case: verified 5V / ~0.35–0.40A / ~1.8–2.0W', ar: 'دخل USB-C للعلبة: مؤكد 5V / ~0.35–0.40A / ~1.8–2.0 واط' } },
            { name: 'Fiberglass 5m tape', use: { en: '§7.5 H BT range walk', ar: 'مسير مدى BT وفق §7.5 H' } },
            { name: 'Apple iPhone 15 + Samsung Galaxy A54', use: { en: 'AAC / SBC codec paths + multipoint attempt + mic / latency trials', ar: 'مسارات AAC / SBC + محاولة multipoint + تجارب مايك / تأخير' } },
            { name: 'Timer+ app', use: { en: 'Playtime / charge stopwatch (§7.5 B–F)', ar: 'ساعة تشغيل / شحن (§7.5 B–F)' } },
            { name: 'Anker A2147 30W wall charger', use: { en: 'Case USB-C charging source (5V only drawn)', ar: 'مصدر شحن USB-C للعلبة (سحب 5V فقط)' } },
            { name: 'BENETECH GM320 IR thermometer (ε=0.95)', use: { en: 'Buds+case shell temp after 90 min play', ar: 'حرارة غلاف السماعات+العلبة بعد 90 دقيقة تشغيل' } },
        ],
        results: [
            { param: { en: 'Rated battery — per earbud', ar: 'البطارية الاسمية — لكل سماعة' }, rated: '45mAh / 0.1665Wh', measured: '—', note: { en: 'Joyroom T03-family published cell; 3.7V nominal', ar: 'خلية عائلة T03 المنشورة؛ 3.7V اسمي' } },
            { param: { en: 'Rated battery — case', ar: 'البطارية الاسمية — العلبة' }, rated: '350mAh / 1.295Wh', measured: '—', note: { en: 'T03 charging bin vs T03S 400mAh sibling table', ar: 'علبة شحن T03 مقابل جدول شقيق T03S 400 مللي أمبير' } },
            { param: { en: 'System total energy', ar: 'إجمالي طاقة النظام' }, rated: '~1.628Wh', measured: '—', note: { en: 'always cabin-safe under 100Wh', ar: 'دائمًا آمن في المقصورة تحت 100Wh' } },
            { param: { en: 'Wh sanity vs ~20H marketing (§8)', ar: 'اتساق Wh مقابل تسويق ~20 ساعة (§8)' }, rated: '~20h total with case', measured: { en: 'PLAUSIBLE as TOTAL — 4h 25min × ~4 case cycles ≈ 17–18h class; NOT a single-charge claim', ar: 'معقول كإجمالي — 4س25 × ~4 دورات علبة ≈ فئة 17–18 ساعة؛ ليس ادعاء شحنة واحدة' }, note: { en: 'do not rubber-stamp 20H as all-day single-bud', ar: 'لا تثبّت 20 ساعة كيوم كامل لسماعة مفردة' } },
            { param: { en: 'Playtime @ 50% — single charge', ar: 'زمن التشغيل @ 50% — شحنة واحدة' }, rated: { en: '~4–5h class (inferred from 20h total ÷ case cycles; vendor marketing emphasises total)', ar: 'فئة ~4–5 ساعات (مستنتج من إجمالي 20 ÷ دورات العلبة؛ التسويق يركز على الإجمالي)' }, measured: '4h 25 min', note: { en: 'Timer+, AAC on iPhone 15; ~37.7mW avg draw from 0.1665Wh — elevated vs A3949, expected for BT 5.0 13mm', ar: 'Timer+، AAC على iPhone 15؛ سحب متوسط ~37.7 مللي واط من 0.1665Wh — أعلى من A3949، متوقع لـ BT 5.0 و13 ملم' } },
            { param: { en: 'Playtime @ 100% volume', ar: 'زمن التشغيل @ 100% حجم' }, measured: '2h 35 min', note: { en: '~59% of 50%-vol figure — louder drive tax expected', ar: 'نحو 59% من رقم 50% — ضريبة قيادة أعلى متوقعة' } },
            { param: { en: 'Total system with case @ 50%', ar: 'إجمالي النظام مع العلبة @ 50%' }, rated: 'up to ~20h', measured: '17h 40 min', note: { en: '−11.7% vs 20h marketing — inside §7.5 C ±15%; stopwatch over rubber stamp', ar: '−11.7% مقابل تسويق 20 ساعة — داخل §7.5 C ±15%؛ الساعة فوق التثبيت' } },
            { param: { en: 'Bud charge 0→100%', ar: 'شحن السماعة 0→100%' }, rated: '~40–60 min class (family docs)', measured: '52 min', note: { en: 'inside case', ar: 'داخل العلبة' } },
            { param: { en: 'Case charge 0→100% USB-C', ar: 'شحن العلبة 0→100% USB-C' }, rated: '~1h class', measured: '1h 08 min', note: { en: 'FNB58: 5V / ~0.38A / ~1.9W — PD irrelevant', ar: 'FNB58: 5V / ~0.38A / ~1.9 واط — PD غير ذي صلة' } },
            { param: { en: 'Quick-charge: 10 min → playback', ar: 'شحن سريع: 10 دقائق → تشغيل' }, rated: { en: 'not published for JR-AU-T03', ar: 'غير منشور لـ JR-AU-T03' }, measured: '55 min', note: { en: 'measured only — no vendor ±20% claim to score against', ar: 'مقاس فقط — لا ادعاء بائع ±20% للمقارنة' } },
            { param: { en: 'BT range indoor apartment', ar: 'مدى BT شقة داخلية' }, rated: '10m Class 2', measured: '8m before first glitch', note: { en: 'inside §7.5 8–12m Class 2 window (low end — older BT 5.0 radio)', ar: 'داخل نافذة §7.5 لفئة 2 8–12م (الطرف الأدنى — راديو BT 5.0 أقدم)' } },
            { param: { en: 'BT range outdoor balcony', ar: 'مدى BT شرفة خارجية' }, measured: '16m before first glitch', note: { en: 'inside §7.5 15–25m open-air window', ar: 'داخل نافذة §7.5 هواء مفتوح 15–25م' } },
            { param: { en: 'Multipoint', ar: 'multipoint' }, rated: { en: 'not listed', ar: 'غير مذكور' }, measured: { en: 'NOT SUPPORTED — second host disconnects first', ar: 'غير مدعوم — المضيف الثاني يفصل الأول' }, note: { en: 'matches listing silence', ar: 'يطابق صمت القائمة' } },
            { param: { en: 'Codecs observed', ar: 'الكودكات المرصودة' }, rated: 'SBC + AAC (typical BT 5.0 TWS)', measured: { en: 'SBC + AAC only — no LDAC / aptX', ar: 'SBC + AAC فقط — لا LDAC / aptX' }, note: { en: 'iPhone 15 AAC; A54 AAC default / SBC forced; no Joyroom app panel', ar: 'iPhone 15 AAC؛ A54 AAC افتراضي / SBC مجبر؛ بلا لوحة تطبيق Joyroom' } },
            { param: { en: 'ANC', ar: 'ANC' }, rated: 'None on JR-AU-T03', measured: { en: 'None — tip seal softens café HVAC; traffic / metro brake screech not blocked. ANC belongs to T03S Pro sibling.', ar: 'لا — إحكام الطرف يخفف تكييف الكافيه؛ مرور / صرير فرامل المترو لا يُحجب. ANC لشقيق T03S Pro.' }, note: { en: 'no dB invented per §7.5 I / §11.3', ar: 'بلا ديسيبل مخترع وفق §7.5 I / §11.3' } },
            { param: { en: 'IPX rating', ar: 'تصنيف IPX' }, rated: 'IPX4 (vendor listing)', measured: { en: 'NOT WET-TESTED — vendor label only', ar: 'لم نختبر الماء — ملصق البائع فقط' }, note: { en: '§7.7 F rule', ar: 'قاعدة §7.7 F' } },
            { param: { en: 'Latency (qualitative)', ar: 'التأخير (نوعي)' }, measured: { en: 'YouTube: acceptable. PUBG with any game/low-latency toggle ON: usable. OFF: lip-sync lag noticeable.', ar: 'يوتيوب: مقبول. PUBG مع أي تبديل ألعاب/تأخر منخفض مفعل: قابل للاستخدام. متوقف: تأخير شفاه ملحوظ.' }, note: { en: 'no ms — no A/V sync tester (§7.5 L / §11.3)', ar: 'بلا ms — لا مقياس تزامن (§7.5 L / §11.3)' } },
            { param: { en: 'Mic quality (qualitative)', ar: 'جودة المايك (نوعي)' }, measured: { en: 'Quiet lab: clear. Ring Road mid-traffic: intelligible, traffic bleeds. Uber sedan AC-on windows-up: clear enough, road hum present.', ar: 'مختبر هادئ: واضح. الطريق الدائري: مفهوم مع تسرب مرور. أوبر بتكييف ونوافذ مغلقة: واضح كفاية مع هدير طريق.' }, note: { en: 'no SNR invented (§7.5 J)', ar: 'بلا SNR مخترع (§7.5 J)' } },
            { param: { en: 'Weight per earbud', ar: 'وزن السماعة' }, rated: '~4g', measured: '4.1g', note: { en: 'Kkmoon 0.01g', ar: 'Kkmoon 0.01g' } },
            { param: { en: 'Weight total (buds + case)', ar: 'الوزن الإجمالي (سماعات + علبة)' }, measured: '41.8g', note: { en: 'Kkmoon 0.01g', ar: 'Kkmoon 0.01g' } },
            { param: { en: 'Case dimensions', ar: 'أبعاد العلبة' }, rated: '60 × 45 × 28 mm (listing)', measured: '60 × 45 × 28 mm', note: { en: 'steel tape', ar: 'شريط فولاذي' } },
            { param: { en: 'A/B vs T03S Pro sibling', ar: 'أ/ب مقابل شقيق T03S Pro' }, measured: { en: 'T03: no ANC, BT 5.0, 17h40 measured total. T03S Pro listing: ANC + BT 5.3 + ~30h marketing, often ~664 EGP (cheaper).', ar: 'T03: بلا ANC، BT 5.0، إجمالي مقاس 17س40. قائمة T03S Pro: ANC + BT 5.3 + تسويق ~30 ساعة، غالبًا ~664 ج (أرخص).' }, note: { en: 'buy T03S Pro if ANC / newer BT matters', ar: 'اشترِ T03S Pro إن كان ANC / BT أحدث يهم' } },
            { param: { en: 'A/B vs Soundcore P20i / P25i', ar: 'أ/ب مقابل Soundcore P20i / P25i' }, measured: { en: 'P20i/P25i gold: ~9h35–9h40 single / ~28h30–28h45 system, BT 5.3, app EQ — clear battery win in same EGP band', ar: 'ذهب P20i/P25i: ~9س35–9س40 مفرد / ~28س30–28س45 نظام، BT 5.3، EQ تطبيق — فوز بطارية واضح في نفس شريحة الجنيه' }, note: { en: 'CV-EB-A3949Z11-001 / CV-EB-A3949-001', ar: 'CV-EB-A3949Z11-001 / CV-EB-A3949-001' } },
            {
                param: { en: 'Surface heat after 90 min play @50%', ar: 'حرارة السطح بعد 90 دقيقة تشغيل @50%' },
                measured: '30.1°C buds+case shell',
                note: { en: 'GM320 spot check in 28.0°C lab air — no thermal shutdown', ar: 'فحص GM320 في هواء مختبر 28.0°م — بلا إغلاق حراري' },
            },
            {
                param: { en: 'Recall status (2026-07-24)', ar: 'حالة الاستدعاء (2026-07-24)' },
                measured: { en: 'NOT recalled', ar: 'غير مُستدعى' },
                note: { en: 'joyroom.com notices + CPSC.gov — no JR-AU-T03 / JH01 hit', ar: 'إشعارات joyroom.com + CPSC.gov — لا إصابة JR-AU-T03 / JH01' },
            },
        ],
        verdict: {
            en:
                'JR-T03 delivered 4h 25min single @50% and 17h 40min with case — inside ±15% of ~20h TOTAL marketing, not a single-charge day. ' +
                'SBC/AAC only, no ANC, BT 5.0. P20i/P25i win battery; T03S Pro adds ANC often cheaper.',
            ar:
                'JR-T03 أخرجت 4س25 مفرد @50% و17س40 مع العلبة — داخل ±15% من تسويق ~20 ساعة كإجمالي، لا كيوم بشحنة واحدة. ' +
                'SBC/AAC فقط، بلا ANC، BT 5.0. P20i/P25i تفوزان بالبطارية؛ T03S Pro يضيف ANC وغالبًا أرخص.',
        },
        pros: [
            { en: '17h 40min measured system total @50% — inside §7.5 C ±15% of ~20h marketing (Timer+)', ar: '17 ساعة و40 دقيقة إجمالي مقاس @50% — داخل §7.5 C ±15% من تسويق ~20 ساعة (Timer+)' },
            { en: '4.1g/bud on 0.01g scale — light for short AUC / metro blocks', ar: '4.1 جرام/سماعة على ميزان 0.01g — خفيفة لكتل AUC / مترو قصيرة' },
            { en: 'Case charges in 1h 08min from any 5V USB-C phone charger — FNB58 ~1.9W', ar: 'العلبة تشحن في 1 ساعة و8 دقائق من أي شاحن هاتف USB-C 5V — FNB58 ~1.9 واط' },
            { en: 'BT clean at 8m indoor / 16m outdoor — inside Class 2 §7.5 window', ar: 'BT نظيف عند 8م داخلي / 16م خارجي — داخل نافذة فئة 2 §7.5' },
            { en: 'Not recalled — verified 2026-07-24', ar: 'لا استدعاء — تحقّق 2026-07-24' },
            { en: 'Wh math coherent: ~1.628Wh system supports ~17–20h total class at measured draw', ar: 'حساب Wh متسق: نظام ~1.628Wh يدعم فئة إجمالي ~17–20 ساعة عند السحب المقاس' },
        ],
        limits: [
            { en: 'Do NOT read marketing ~20H as single-charge runtime — measured single @50% is 4h 25min only', ar: 'لا تقرأ تسويق ~20 ساعة كتشغيل شحنة واحدة — المقاس المفرد @50% هو 4 ساعات و25 دقيقة فقط' },
            { en: 'No ANC — metro / jet noise bleed. T03S Pro is the ANC sibling (and often cheaper on CairoVolt).', ar: 'بلا ANC — ضوضاء المترو / الطيران تتسرب. T03S Pro هو شقيق ANC (وغالبًا أرخص على CairoVolt).' },
            { en: 'SBC + AAC only — no LDAC / aptX. No Joyroom app codec panel on this SKU.', ar: 'SBC + AAC فقط — لا LDAC / aptX. بلا لوحة كودك بتطبيق Joyroom لهذا SKU.' },
            { en: 'Soundcore P20i/P25i measured ~2× single-charge playtime in the same EGP band — clearer daily-driver pick for battery', ar: 'Soundcore P20i/P25i قاستا نحو ضعف تشغيل الشحنة الواحدة في نفس شريحة الجنيه — اختيار يومي أوضح للبطارية' },
            { en: 'Bluetooth 5.0 — older than T03S Pro 5.3 and P20i/P25i 5.3; indoor range sat at low end of Class 2 window (8m)', ar: 'Bluetooth 5.0 — أقدم من T03S Pro 5.3 وP20i/P25i 5.3؛ المدى الداخلي عند الطرف الأدنى لنافذة فئة 2 (8م)' },
            { en: 'IPX4 vendor-stated only — no wet-test. No swim / shower / submersion.', ar: 'IPX4 معلن فقط — بلا اختبار ماء. لا سباحة / دش / غمر.' },
            { en: 'Single unit — batches may vary. No independent audio-lab dB/SNR/ms numbers.', ar: 'وحدة واحدة — الدفعات قد تختلف. بلا أرقام dB/SNR/ms من مختبر صوت مستقل.' },
            { en: 'Some historic T03 cartons used Lightning case ports — match YOUR carton; this sample is USB-C', ar: 'بعض كراتين T03 التاريخية استخدمت منافذ Lightning للعلبة — طابق كرتونتك؛ هذه العيّنة USB-C' },
        ],
    },
};
