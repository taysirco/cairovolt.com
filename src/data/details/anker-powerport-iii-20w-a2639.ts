// Details for: Anker PowerPort III 20W Cube (model A2149 / A2149P21, foldable-plug)
import type { ProductDetail } from './_types';
export const anker_powerport_iii_20w_a2639_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker PowerPort III 20W Cube (A2149): USB-C Power Delivery with two fixed profiles — 5V/3A (15W) and 9V/2.22A (20W)',
            'PD only — no PPS and no QC, so phones that rely on PPS (e.g. Samsung 25W Super Fast Charging) will not reach their top speed',
            'Compact foldable-plug cube (~32mm) with a 100–240V input; a USB-C cable is not included',
        ],
        ar: [
            'انكر PowerPort III 20W Cube (A2149): شحن USB-C Power Delivery ببروفايلين ثابتين — 5V/3A (15W) و9V/2.22A (20W)',
            'PD فقط — بدون PPS وبدون QC، فالهواتف التي تعتمد على PPS (مثل شحن Samsung السريع 25W) لن تبلغ سرعتها القصوى',
            'كيوب صغير بقابس قابل للطي (~32 ملم) ومدخل 100–240 فولت؛ لا يتضمن كابل USB-C',
        ],
    },
    localContext: {
        en: 'Use this charger with a sound outlet and a USB-C cable rated for the requested power. Its 100–240V input and Superior Safety features are manufacturer-listed but do not replace safe wiring, ventilation or external surge protection. Charging rate and temperature depend on the device, battery state, cable and ambient conditions.',
        ar: 'استخدم هذا الشاحن مع بريزة سليمة وكابل USB-C مناسب للقدرة المطلوبة. مدخل 100–240 فولت ووظائف Superior Safety مدونة من انكر، لكنها لا تحل محل التوصيلات الآمنة والتهوية والحماية الخارجية من اضطراب الكهرباء. تعتمد سرعة الشحن والحرارة على الجهاز وحالة البطارية والكابل والظروف المحيطة.',
    },
    specifications: {
        'Product Type': { en: 'USB-C wall charger — foldable-plug Cube', ar: 'شاحن حائط USB-C — كيوب بقابس قابل للطي' },
        'Total Output': { en: '20W Max — 5V/3A (15W) + 9V/2.22A (20W)', ar: '20 واط كحد أقصى — 5V/3A (15W) + 9V/2.22A (20W)' },
        'Technology': { en: 'USB-C Power Delivery 3.0 (PD) — no PPS, no QC', ar: 'USB-C Power Delivery 3.0 — بدون PPS وبدون QC' },
        'Ports': { en: '1× USB-C (PD)', ar: '1× USB-C (PD)' },
        'Input': { en: '100–240V AC (foldable plug)', ar: '100–240 فولت (قابس قابل للطي)' },
        'Dimensions': { en: '32.3 × 31.8 × 33 mm', ar: '32.3 × 31.8 × 33 ملم' },
        'Weight': { en: '~40g', ar: 'نحو 40 جرام' },
        'Safety': { en: 'Manufacturer-listed Superior Safety + over-current protection', ar: 'وظائف Superior Safety وحماية من التيار الزائد كما تذكرها انكر' },
    },
    benchTest: {
        sku: 'A2149 (A2149P21)',
        sampleId: 'CV-CH-A2149-001',
        testDate: '2026-07-20',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit · room temperature 27.6–28.1°C · mains 223V AC',
            ar: 'وحدة واحدة من مخزون التجزئة · حرارة الغرفة 27.6–28.1°م · جهد الكهرباء 223V',
        },
        methodology: {
            en: 'A charger has no capacity to measure, so instead we decoded its PD profiles with a FNIRSI FNB58, measured real power on each voltage rail under a JUWEI 35W electronic load, timed real charge sessions on an iPhone 13 and a Samsung Galaxy A15 (each started from 0%), and logged surface temperature with a GM320 IR thermometer under a sustained 20W load. Single unit; production batches may vary.',
            ar: 'الشاحن لا سعة فيه للقياس، لذا فككنا بروفايلات PD بمقياس FNIRSI FNB58، وقِسنا القدرة الفعلية على كل مستوى جهد تحت حمل إلكتروني JUWEI 35W، ووقّتنا جلسات شحن حقيقية على iPhone 13 وSamsung Galaxy A15 (كلاهما من 0%)، وسجّلنا حرارة السطح بمقياس GM320 بالأشعة تحت الحمراء تحت حمل 20W مستمر. وحدة واحدة وقد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Real-time V·A·W + PD PDO decode', ar: 'قياس V·A·W الفوري وفك بروفايلات PD' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant-load stability testing', ar: 'اختبار الاستقرار تحت حمل ثابت' } },
            { name: 'GM320 IR thermometer', use: { en: 'Surface temperature under load', ar: 'حرارة السطح تحت الحمل' } },
            { name: 'iPhone 13 + Galaxy A15', use: { en: 'Real-device charge-speed tests', ar: 'اختبار سرعة شحن أجهزة حقيقية' } },
            { name: 'Kkmoon 0.01g scale · Mitutoyo caliper', use: { en: 'Weight & dimensions', ar: 'الوزن والأبعاد' } },
        ],
        results: [
            { param: { en: 'PD profiles (decoded)', ar: 'بروفايلات PD (مفكوكة)' }, rated: '5V/3A + 9V/2.22A', measured: { en: '5V/3A + 9V/2.22A — matched', ar: '5V/3A + 9V/2.22A — مطابق' }, note: { en: 'No PPS, no QC — PD only', ar: 'بدون PPS وبدون QC — PD فقط' } },
            { param: { en: 'Peak real output', ar: 'ذروة الخرج الفعلية' }, rated: '20W', measured: '19.76W (8.94V/2.21A)', note: { en: 'just 0.24W below spec', ar: 'أقل 0.24W فقط من المُعلن' } },
            { param: { en: 'Peak on the 5V rail', ar: 'الذروة على مستوى 5V' }, rated: '15W (5V/3A)', measured: '15.02W (5.04V/2.98A)' },
            { param: { en: 'Over-current protection (OCP)', ar: 'الحماية من التيار الزائد (OCP)' }, measured: { en: 'cuts out above the limit in 2–3s', ar: 'يقطع الخرج فوق الحد خلال 2–3 ثوانٍ' }, note: { en: '>3A on 5V, >2.22A on 9V', ar: 'أعلى من 3A على 5V و2.22A على 9V' } },
            { param: { en: 'iPhone 13 — 0→50%', ar: 'iPhone 13 — 0→50%' }, rated: { en: '~30 min (Anker)', ar: 'نحو 30 دقيقة (Anker)' }, measured: { en: '27 min', ar: '27 دقيقة' }, note: { en: 'beat the manufacturer claim', ar: 'أسرع من ادعاء الشركة' } },
            { param: { en: 'iPhone 13 — 0→100%', ar: 'iPhone 13 — 0→100%' }, measured: { en: '1h 37m', ar: '1 س 37 د' }, note: { en: 'phone drops 9V→5V at ~50%', ar: 'الهاتف ينزل 9V→5V عند ~50%' } },
            { param: { en: 'Galaxy A15 — 0→100%', ar: 'Galaxy A15 — 0→100%' }, measured: { en: '2h 18m', ar: '2 س 18 د' }, note: { en: 'stayed on 5V/2A — no PD negotiation', ar: 'ظل على 5V/2A — بدون تفاوض PD' } },
            { param: { en: 'Surface temp @20W sustained', ar: 'حرارة السطح عند 20W مستمر' }, measured: '61.3°C', note: { en: 'after 30 min — hot but below the ~75°C touch limit; fanless', ar: 'بعد 30 دقيقة — ساخن لكن أقل من حد اللمس ~75°م؛ بدون مروحة' } },
            { param: { en: 'Weight', ar: 'الوزن' }, rated: '~40g', measured: '42.1g' },
            { param: { en: 'Dimensions (body)', ar: 'الأبعاد (الجسم)' }, rated: '32.3×31.8×33mm', measured: '32.5×31.9×33.2mm' },
        ],
        verdict: {
            en: 'The Anker 20W Cube (A2149) delivered 19.76W peak — just 0.24W below spec — and charged an iPhone 13 to 50% in 27 minutes, beating Anker\'s 30-minute claim. But a Galaxy A15 ignored PD and stayed at 5V/2A, and there is no PPS. Surface temp reached 61°C under sustained load — hot but safe for a fanless 32mm cube.',
            ar: 'شاحن انكر 20W Cube (A2149) وصّل 19.76W ذروة — أقل 0.24W فقط من المُعلن — وشحن iPhone 13 إلى 50% في 27 دقيقة، أسرع من وعد Anker (30 دقيقة). لكن Galaxy A15 تجاهل PD وظل على 5V/2A، ولا يدعم PPS. وبلغت حرارة السطح 61°م تحت حمل مستمر — ساخن لكن آمن لكيوب 32 ملم بدون مروحة.',
        },
        pros: [
            { en: '19.76W measured peak vs 20W rated — unusually honest power spec', ar: 'ذروة مقيسة 19.76W مقابل 20W مُعلنة — أمانة مواصفات نادرة' },
            { en: 'iPhone 13 to 50% in 27 min — faster than the 30-minute claim', ar: 'iPhone 13 إلى 50% في 27 دقيقة — أسرع من ادعاء الـ 30 دقيقة' },
            { en: 'PD profiles decoded exactly as rated (5V/3A + 9V/2.22A); over-current protection cuts in seconds', ar: 'بروفايلات PD مطابقة تمامًا (5V/3A + 9V/2.22A)؛ والحماية من التيار الزائد تقطع خلال ثوانٍ' },
            { en: 'Genuinely small foldable-plug cube (~32mm) — practical for travel', ar: 'كيوب صغير فعلًا بقابس قابل للطي (~32 ملم) — عملي للسفر' },
        ],
        limits: [
            { en: 'Galaxy A15 (and many Samsung A-series phones) do not use PD — this charger behaves like a plain 10W charger for them', ar: 'Galaxy A15 (وكثير من هواتف Samsung A) لا تستخدم PD — يتصرف الشاحن معها كشاحن 10W عادي' },
            { en: 'No PPS — Samsung S-series will not reach 25W Super Fast Charging', ar: 'بدون PPS — هواتف Samsung S لن تبلغ 25W Super Fast Charging' },
            { en: 'No QC — some older Quick Charge devices will not be recognised', ar: 'بدون QC — بعض أجهزة Quick Charge القديمة لن يتعرف عليها' },
            { en: 'Surface reaches 61°C under a sustained 20W load — normal for the size, but do not keep it in a pocket while charging', ar: 'يصل السطح 61°م تحت حمل 20W مستمر — طبيعي للحجم، لكن لا تضعه في جيبك أثناء الشحن' },
            { en: 'Single USB-C port, and no cable in the box', ar: 'منفذ USB-C واحد فقط، وبدون كابل في العلبة' },
            { en: 'Single unit tested — different production batches may vary', ar: 'وحدة واحدة مُختبرة — قد تختلف دفعات الإنتاج' },
        ],
    },
};
