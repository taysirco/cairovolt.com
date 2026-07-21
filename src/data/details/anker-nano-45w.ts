// Details for: anker-nano-45w  (Anker 713 Charger, Nano II 45W, model A2664)
import type { ProductDetail } from './_types';

export const anker_nano_45w_detail: ProductDetail = {
        aiTldr: {
            en: [
                'Anker 713 (Nano II 45W, A2664): a single-port USB-C GaN charger rated 45W — CairoVolt measured a 44.2W peak, about 98% of the rating',
                'Full PD 3.0 profiles (5V/9V/15V at 3A, 20V/2.25A) plus two PPS ranges up to 3.3–21V/3A and 3.3–21V/2.25A — enough for Samsung Super Fast Charging',
                'Fully charged a MacBook Air M2 (0→100%) in 1h 48m; 60g with foldable prongs — a genuinely pocketable laptop-class travel charger',
                'One port and no cable in the box; runs 52–55°C under sustained 45W and is not enough for a 16-inch MacBook Pro (which needs 96W or more)',
            ],
            ar: [
                'انكر 713 (Nano II 45W، الطراز A2664): شاحن GaN بمنفذ USB-C واحد بقدرة اسمية 45 واط — وقاست CairoVolt ذروة 44.2 واط، أي نحو 98% من القدرة الاسمية',
                'بروتوكولات PD 3.0 كاملة (5V/9V/15V عند 3A و20V/2.25A) إضافةً إلى نطاقَي PPS حتى 3.3–21V/3A و3.3–21V/2.25A — كافية لشحن Samsung السريع الفائق',
                'شحن MacBook Air M2 بالكامل (0→100%) في ساعة و48 دقيقة؛ 60 جرامًا بقابس قابل للطي — شاحن سفر عملي بحجم الجيب لفئة اللابتوب',
                'منفذ واحد ولا يوجد كابل في العلبة؛ يعمل بين 52 و55°م تحت حمل 45 واط متواصل ولا يكفي لماك بوك برو 16 بوصة (الذي يحتاج 96 واط أو أكثر)',
            ],
        },
        localContext: {
            en: 'We bench-tested this sample on Egyptian mains (222V) at 27.8°C — representative of a Cairo indoor summer. CairoVolt is an independent retailer: this charger is sold with our own store warranty, not an Anker authorized-distributor warranty, and every figure below is our own measurement.',
            ar: 'اختبرنا هذه العينة على الكهرباء المصرية (222 فولت) عند 27.8°م — وهو ما يمثّل صيفًا داخليًا في القاهرة. CairoVolt متجر مستقل: يُباع هذا الشاحن بضمان المتجر الخاص بنا وليس بضمان موزّع معتمد من انكر، وكل رقم بالأسفل هو من قياسنا الخاص.',
        },
        specifications: {
            'Model': { en: 'Anker 713 (A2664)', ar: 'انكر 713 (A2664)' },
            'Output': { en: 'Up to 45W USB-C PD 3.0', ar: 'حتى 45 واط USB-C PD 3.0' },
            'PD Profiles': { en: '5V/3A · 9V/3A · 15V/3A · 20V/2.25A', ar: '5V/3A · 9V/3A · 15V/3A · 20V/2.25A' },
            'PPS': { en: '3.3–16V/3A · 3.3–21V/2.25A', ar: '3.3–16V/3A · 3.3–21V/2.25A' },
            'Technology': { en: 'GaN (gallium nitride)', ar: 'GaN (نيتريد الغاليوم)' },
            'Ports': { en: '1× USB-C', ar: '1× USB-C' },
            'Plug': { en: 'Foldable prongs', ar: 'قابس قابل للطي' },
            'Weight': { en: '60g', ar: '60 جرام' },
            'Dimensions': { en: '43 × 42 × 35 mm', ar: '43 × 42 × 35 ملم' },
            'Safety': { en: 'Manufacturer-listed ActiveShield + MultiProtect features', ar: 'وظائف ActiveShield وMultiProtect كما تذكرها انكر' },
            'In the Box': { en: 'Charger only — USB-C cable not included', ar: 'الشاحن فقط — كابل USB-C غير مرفق' },
        },
        benchTest: {
            sku: 'A2664',
            sampleId: 'CV-CH-A2664-001',
            testDate: '2026-07-23',
            engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
            conditions: {
                en: 'One retail-stock unit · room temperature 27.8°C · Egyptian mains 222V',
                ar: 'وحدة واحدة من مخزون التجزئة · حرارة الغرفة 27.8°م · الكهرباء المصرية 222 فولت',
            },
            methodology: {
                en: 'We plugged the charger into Egyptian mains (222V) and used a FNIRSI FNB58 inline meter to trigger and log every advertised PD 3.0 fixed rail (5V/9V/15V at 3A and 20V/2.25A) and both PPS ranges into an ATORCH DL24P electronic load, recording peak watts and voltage stability under load. We then ran a real-device test — charging an Apple MacBook Air M2 from 0 to 100% — and held the charger at a sustained 45W for 15 minutes while logging surface temperature with an IR thermometer. Single retail unit; production batches may vary.',
                ar: 'وصّلنا الشاحن بالكهرباء المصرية (222 فولت) واستخدمنا مقياس FNIRSI FNB58 المتصل بالخط لتفعيل وتسجيل كل بروتوكولات PD 3.0 الثابتة (5V/9V/15V عند 3A و20V/2.25A) ونطاقَي PPS داخل حمل إلكتروني ATORCH DL24P، مسجّلين ذروة القدرة وثبات الجهد تحت الحمل. ثم أجرينا اختبارًا بجهاز حقيقي — شحن Apple MacBook Air M2 من 0 إلى 100% — وأبقينا الشاحن على حمل 45 واط متواصل لمدة 15 دقيقة مع تسجيل حرارة السطح بمقياس أشعة تحت حمراء. وحدة تجزئة واحدة، وقد تختلف دفعات الإنتاج.',
            },
            equipment: [
                { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Inline USB-C V·A·W·Wh logging + PD/PPS trigger', ar: 'قياس V·A·W·Wh على الخط + تفعيل PD/PPS' } },
                { name: 'ATORCH DL24P DC electronic load', use: { en: 'Constant-power draw on each PD rail up to 45W', ar: 'سحب قدرة ثابت على كل بروتوكول PD حتى 45 واط' } },
                { name: 'Apple MacBook Air M2 (2022, 52.6Wh)', use: { en: 'Real-device 0→100% charge-time test', ar: 'اختبار زمن الشحن 0→100% بجهاز حقيقي' } },
                { name: 'Uni-T UT303C IR thermometer', use: { en: 'Surface temperature under sustained load', ar: 'حرارة السطح تحت الحمل المتواصل' } },
                { name: 'Kkmoon 0.01g scale', use: { en: 'Weight', ar: 'الوزن' } },
            ],
            results: [
                { param: { en: 'Rated max output', ar: 'أقصى خرج اسمي' }, rated: '45W', measured: '44.2W', note: { en: '~98% of rated — FNB58 peak', ar: 'نحو 98% من الاسمي — ذروة FNB58' } },
                { param: { en: 'Profile 15V/3A', ar: 'البروتوكول 15V/3A' }, rated: '45W', measured: { en: '~44.2W (peak)', ar: 'نحو 44.2 واط (الذروة)' }, note: { en: 'PD 3.0 fixed rail', ar: 'بروتوكول PD 3.0 ثابت' } },
                { param: { en: 'Profile 20V/2.25A', ar: 'البروتوكول 20V/2.25A' }, rated: '45W', measured: { en: '~44.0W', ar: 'نحو 44.0 واط' }, note: { en: 'PD 3.0 fixed rail', ar: 'بروتوكول PD 3.0 ثابت' } },
                { param: { en: 'Profile 9V/3A', ar: 'البروتوكول 9V/3A' }, rated: '27W', measured: '26.8W' },
                { param: { en: 'Voltage stability under load', ar: 'ثبات الجهد تحت الحمل' }, measured: '±0.06–0.08V', note: { en: 'across the fixed PD rails', ar: 'عبر بروتوكولات PD الثابتة' } },
                { param: { en: 'PPS ranges', ar: 'نطاقات PPS' }, rated: '3.3–16V/3A · 3.3–21V/2.25A', measured: { en: 'confirmed', ar: 'مؤكّدة' }, note: { en: 'enables Samsung Super Fast Charging (incl. 45W SFC 2.0 on supported phones)', ar: 'تتيح شحن Samsung السريع الفائق (بما فيه 45W SFC 2.0 على الهواتف المدعومة)' } },
                { param: { en: 'MacBook Air M2 charge (0→100%)', ar: 'شحن MacBook Air M2 (0→100%)' }, measured: { en: '1h 48m', ar: 'ساعة و48 دقيقة' }, note: { en: 'Apple MacBook Air M2, 52.6Wh battery', ar: 'Apple MacBook Air M2، بطارية 52.6Wh' } },
                { param: { en: 'Surface temp @45W (15 min)', ar: 'حرارة السطح عند 45W (15 دقيقة)' }, measured: { en: '52.4–54.8°C', ar: '52.4–54.8°م' }, note: { en: 'sustained full load, 27.8°C ambient', ar: 'حمل كامل متواصل، حرارة محيطة 27.8°م' } },
                { param: { en: 'Weight', ar: 'الوزن' }, measured: '60g', note: { en: 'on a 0.01g scale', ar: 'على ميزان 0.01 جرام' } },
            ],
            verdict: {
                en: 'The Anker 713 (Nano II 45W, A2664) hit a 44.2W peak — 98% of rated — with ±0.06–0.08V stability, and fully charged a MacBook Air M2 in 1h48m. Full PPS to 21V unlocks Samsung Super Fast Charging. One port; 54.8°C under sustained 45W; too little for a 16-inch MacBook Pro.',
                ar: 'شاحن انكر 713 (Nano II 45W، الطراز A2664) بلغ ذروة 44.2W من 45W بثبات جهد ±0.06–0.08V، وشحن MacBook Air M2 بالكامل في ساعة و48 دقيقة. ودعم PPS الكامل حتى 21V يفعّل شحن Samsung السريع الفائق. منفذ واحد؛ 54.8°م تحت حمل 45W متواصل؛ لا يكفي لماك بوك برو 16 بوصة.',
            },
            pros: [
                { en: '44.2W measured from a 45W rating (~98%) — an honest, near-spec peak', ar: '44.2 واط مقيسة من قدرة اسمية 45 واط (نحو 98%) — ذروة صادقة قريبة من المواصفة' },
                { en: 'Full PPS — two ranges up to 3.3–21V/2.25A — enables Samsung Super Fast Charging, including 45W SFC 2.0 on supported Galaxy phones', ar: 'PPS كامل — نطاقان حتى 3.3–21V/2.25A — يتيح شحن Samsung السريع الفائق، بما فيه 45W SFC 2.0 على هواتف Galaxy المدعومة' },
                { en: 'Fully charged a MacBook Air M2 (0→100%) in 1h 48m', ar: 'شحن MacBook Air M2 بالكامل (0→100%) في ساعة و48 دقيقة' },
                { en: '60g with foldable prongs — genuinely pocketable for travel', ar: '60 جرامًا بقابس قابل للطي — عملي بحجم الجيب للسفر' },
                { en: 'Compact GaN build, far smaller than a legacy 45W brick', ar: 'بنية GaN مدمجة، أصغر بكثير من محوّل 45 واط تقليدي' },
                { en: 'Tight ±0.06–0.08V voltage stability across the PD rails under load', ar: 'ثبات جهد ضيّق ±0.06–0.08V عبر بروتوكولات PD تحت الحمل' },
            ],
            limits: [
                { en: 'Single USB-C port — cannot charge a second device at the same time', ar: 'منفذ USB-C واحد — لا يشحن جهازًا ثانيًا في الوقت نفسه' },
                { en: 'Reached 54.8°C on the surface under sustained 45W — warm but within a GaN charger’s normal range', ar: 'بلغ 54.8°م على السطح تحت حمل 45 واط متواصل — دافئ لكن ضمن النطاق الطبيعي لشاحن GaN' },
                { en: 'Not enough for a 16-inch MacBook Pro, which asks for 96W or more', ar: 'لا يكفي لماك بوك برو 16 بوصة الذي يحتاج 96 واط أو أكثر' },
                { en: 'No USB-C cable in the box — supply your own (a standard 3A cable carries the full 45W)', ar: 'لا يوجد كابل USB-C في العلبة — أحضر كابلك الخاص (كابل 3A قياسي يمرّر كامل الـ45 واط)' },
                { en: 'Single unit tested — different production batches may vary', ar: 'وحدة واحدة مُختبرة — قد تختلف دفعات الإنتاج' },
            ],
        },
    };
