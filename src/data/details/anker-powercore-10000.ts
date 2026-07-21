// Details for: anker-powercore-10000
import type { ProductDetail } from './_types';

export const anker_powercore_10000_detail: ProductDetail = {
        aiTldr: {
            en: [
                '10,000mAh (36Wh) nominal capacity; real phone charges vary with the device and conversion losses',
                'Single USB-A output rated up to 12W (5V/2.4A) via PowerIQ — no USB-C and no Power Delivery',
                'Recharges over Micro-USB (5V/2A); listed weight about 180g',
                'At 36Wh it is below the common 100Wh airline cabin limit, but carrier rules and approval still apply',
            ],
            ar: [
                'سعة اسمية 10,000 مللي أمبير (36Wh)؛ ويختلف عدد شحنات الهاتف حسب الجهاز وخسائر التحويل',
                'مخرج USB-A واحد حتى 12 واط (5V/2.4A) عبر PowerIQ — بدون USB-C وبدون Power Delivery',
                'يُعاد شحنه عبر Micro-USB (5V/2A)؛ الوزن المدوّن يقارب 180 جرامًا',
                'سعة 36Wh أقل من حد 100Wh الشائع لمقصورة الطيران، مع ضرورة مراجعة قواعد وموافقة شركة الطيران',
            ],
        },
        specifications: {
            'Capacity': { en: '10,000mAh (36Wh)', ar: '10,000 مللي أمبير (36Wh)' },
            'Max Output': { en: '12W USB-A (5V/2.4A, PowerIQ)', ar: '12 واط USB-A (5V/2.4A، PowerIQ)' },
            'Ports': { en: '1× USB-A (output) + 1× Micro-USB (input)', ar: '1× USB-A (خرج) + 1× Micro-USB (دخل)' },
            'Input': { en: 'Micro-USB 5V/2A (10W)', ar: 'Micro-USB بجهد 5V/2A (10W)' },
            'Fast Charging': { en: 'PowerIQ (5V only) — no PD / PPS', ar: 'PowerIQ (5V فقط) — بدون PD / PPS' },
            'Recharge Time': { en: 'About 5 hours via Micro-USB', ar: 'نحو 5 ساعات عبر Micro-USB' },
            'Weight': { en: '180g', ar: '180 جرام' },
            'Dimensions': { en: '92 × 60 × 22 mm', ar: '92 × 60 × 22 ملم' },
            'Safety': { en: 'Manufacturer-listed MultiProtect features', ar: 'وظائف MultiProtect كما تذكرها انكر' },
        },
        benchTest: {
            sku: 'A1263',
            sampleId: 'CV-PB-A1263-001',
            testDate: '2026-07-18',
            engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
            conditions: {
                en: 'One retail-stock unit · room temperature 27.4–28.1°C',
                ar: 'وحدة واحدة من مخزون التجزئة · حرارة الغرفة 27.4–28.1°م',
            },
            methodology: {
                en: 'We charged the power bank to 100% over Micro-USB (5V/2A), rested it for 20 minutes, then fully discharged it through the USB-A port into a Samsung Galaxy A15 until the pack shut off. The headline figure is the cumulative Wh logged by a FNIRSI FNB58 USB meter, so the efficiency, charge count and discharge curve all reconcile to one measurement. Tested on a single unit; production batches may vary.',
                ar: 'شحنّا الباور بانك حتى 100% عبر Micro-USB (5V/2A)، ثم أرحناه 20 دقيقة، ثم فرّغناه بالكامل عبر منفذ USB-A داخل هاتف Samsung Galaxy A15 حتى إغلاق الوحدة تلقائيًا. الرقم الأساسي هو طاقة Wh المتراكمة من مقياس FNIRSI FNB58، لذلك تتوافق الكفاءة وعدد الشحنات ومنحنى التفريغ مع قياس واحد. الاختبار على وحدة واحدة وقد تختلف دفعات الإنتاج.',
            },
            equipment: [
                { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Cumulative V·A·W·Wh·mAh logging', ar: 'قياس V·A·W·Wh·mAh المتراكم' } },
                { name: 'Kkmoon 500g/0.01g scale', use: { en: 'Unit weight', ar: 'وزن الوحدة' } },
                { name: 'Mitutoyo 150mm caliper', use: { en: 'Dimensions (3-point)', ar: 'الأبعاد من 3 نقاط' } },
                { name: 'Samsung Galaxy A15 (SM-A155F)', use: { en: 'Charge-count test (5000mAh / 19.25Wh)', ar: 'اختبار عدد الشحنات (5000mAh / 19.25Wh)' } },
                { name: 'HTC-2 thermometer', use: { en: 'Room temperature', ar: 'حرارة الغرفة' } },
            ],
            results: [
                { param: { en: 'Rated cell capacity', ar: 'السعة الاسمية (خلايا)' }, rated: '10,000mAh / 36Wh', measured: '—', note: { en: 'Manufacturer spec (3.6V nominal)', ar: 'مواصفة المصنّع (3.6V اسمي)' } },
                { param: { en: 'Actual usable energy', ar: 'الطاقة المُخرجة الفعلية' }, measured: '31.2 Wh', note: { en: 'FNB58 cumulative reading — primary source', ar: 'قراءة FNB58 التراكمية — المصدر الأساسي' } },
                { param: { en: 'Conversion efficiency', ar: 'كفاءة التحويل' }, measured: '86.7%', note: { en: '31.2 ÷ 36', ar: '31.2 ÷ 36' } },
                { param: { en: 'Peak USB-A output', ar: 'ذروة خرج USB-A' }, rated: '12W (5V/2.4A)', measured: '11.2W (5.15V/2.18A)', note: { en: 'PowerIQ — no PD', ar: 'PowerIQ — بدون PD' } },
                { param: { en: 'Sustained USB-A output', ar: 'خرج USB-A المستقر' }, measured: '10.8W (5.09V/2.12A)', note: { en: 'Stable from 10% to 85%', ar: 'مستقر من 10% إلى 85%' } },
                { param: { en: 'Galaxy A15 charges (5000mAh)', ar: 'شحنات Galaxy A15 (5000mAh)' }, rated: { en: '"2+ charges"', ar: '"2+ شحنات"' }, measured: { en: '1.43 charges', ar: '1.43 شحنة' }, note: { en: '31.2 ÷ 21.8 Wh per charge', ar: '31.2 ÷ 21.8 Wh لكل شحنة' } },
                { param: { en: 'Full discharge time (USB-A)', ar: 'وقت التفريغ الكامل (USB-A)' }, measured: { en: '2h 59m', ar: '2 س 59 د' } },
                { param: { en: 'Recharge time (Micro-USB 10W)', ar: 'وقت إعادة الشحن (Micro-USB 10W)' }, measured: { en: '5h 12m', ar: '5 س 12 د' }, note: { en: '0→100% via 5V/2A', ar: '0→100% عبر 5V/2A' } },
                { param: { en: 'Weight', ar: 'الوزن' }, rated: '180g', measured: '182g', note: { en: 'within tolerance', ar: 'ضمن التفاوت' } },
                { param: { en: 'Dimensions', ar: 'الأبعاد' }, rated: '92×60×22mm', measured: '92.3×60.5×22.4mm', note: { en: 'within tolerance', ar: 'ضمن التفاوت' } },
            ],
            verdict: {
                en: 'The Anker PowerCore 10000 (A1263) delivered 31.2Wh usable from 36Wh cells — an efficient 86.7%, enough for 1.43 full charges of a Galaxy A15 (5000mAh). USB-A peaked at 11.2W vs 12W rated. The "2+ charges" claim only holds for phones around 3,500mAh or smaller.',
                ar: 'باور بانك انكر PowerCore 10000 (A1263) أخرج 31.2Wh فعلية من خلايا 36Wh — كفاءة عالية 86.7%، تكفي لـ 1.43 شحنة كاملة لهاتف Galaxy A15 (5000mAh). ذروة USB-A بلغت 11.2W مقابل 12W مُعلنة. ووعد "2+ شحنات" واقعي فقط لهواتف بسعة نحو 3500mAh أو أقل.',
            },
            pros: [
                { en: '86.7% conversion efficiency — strong for its price tier and in line with independent reviews', ar: 'كفاءة تحويل 86.7% — ممتازة لفئته السعرية ومتسقة مع المراجعات المستقلة' },
                { en: 'Genuinely pocket-sized: 92.3×60.5×22.4mm, shorter than a credit card', ar: 'حجم جيب حقيقي: 92.3×60.5×22.4mm أقصر من كارت ائتمان طولًا' },
                { en: 'Stable USB-A output — voltage held above 4.82V until the final 17 minutes', ar: 'خرج USB-A ثابت — الجهد ظل فوق 4.82V حتى آخر 17 دقيقة' },
                { en: 'Peak 11.2W sits very close to the rated 12W — no power overstatement', ar: 'ذروة 11.2W قريبة جدًا من 12W المُعلنة — لا مبالغة في مواصفة القدرة' },
            ],
            limits: [
                { en: '"2+ charges" is misleading for most modern 5000mAh phones — the real figure is 1.43', ar: '"2+ شحنات" مضلل لأغلب هواتف 5000mAh الحديثة — الرقم الحقيقي 1.43' },
                { en: 'Slow Micro-USB recharge: 5h 12m — there is no USB-C input', ar: 'إعادة شحن Micro-USB بطيئة: 5 س 12 د — لا يوجد دخل USB-C' },
                { en: 'No PD or PPS — fast charging is limited to 5V PowerIQ', ar: 'بدون PD أو PPS — الشحن السريع محدود بـ 5V PowerIQ' },
                { en: 'Single unit tested — different production batches may vary', ar: 'وحدة واحدة مُختبرة — قد تختلف دفعات الإنتاج' },
            ],
        },
    };
