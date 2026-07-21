// Details for: anker-powercore-20000  (Anker PowerCore II 20000, model A1260 / A1260011)
import type { ProductDetail } from './_types';

export const anker_powercore_20000_detail: ProductDetail = {
        aiTldr: {
            en: [
                'Anker PowerCore II 20000 (A1260): 20,000mAh (72Wh); real phone charges vary with the device and conversion losses',
                'Two DIFFERENT USB-A ports — Port 1 is PowerIQ 2.0 18W (5V/9V/12V), Port 2 is standard 12W (5V/2.4A)',
                'Recharges over Micro-USB: ~5h with an 18W QC charger or ~10.5h with a standard 5V/2A charger; 8-light LED wheel; ~369g',
                'At 72Wh it is below the common 100Wh airline cabin limit, but carrier rules and approval still apply',
            ],
            ar: [
                'انكر PowerCore II 20000 (A1260): سعة 20,000 مللي أمبير (72Wh)؛ ويختلف عدد شحنات الهاتف حسب الجهاز وخسائر التحويل',
                'منفذا USB-A مختلفان — المنفذ 1 هو PowerIQ 2.0 بقدرة 18W (5V/9V/12V)، والمنفذ 2 قياسي 12W (5V/2.4A)',
                'يُعاد شحنه عبر Micro-USB: نحو 5 ساعات بشاحن QC 18W أو نحو 10.5 ساعة بشاحن 5V/2A قياسي؛ عجلة LED بـ 8 لمبات؛ نحو 369 جرامًا',
                'سعة 72Wh أقل من حد 100Wh الشائع لمقصورة الطيران، مع ضرورة مراجعة قواعد وموافقة شركة الطيران',
            ],
        },
        specifications: {
            'Capacity': { en: '20,000mAh (72Wh)', ar: '20,000 مللي أمبير (72Wh)' },
            'Max Output': { en: 'Port 1: PowerIQ 2.0 18W (5V/9V/12V) · Port 2: 12W (5V/2.4A)', ar: 'المنفذ 1: PowerIQ 2.0 بقدرة 18W (5V/9V/12V) · المنفذ 2: 12W (5V/2.4A)' },
            'Ports': { en: '2× USB-A (output) + 1× Micro-USB (input)', ar: '2× USB-A (خرج) + 1× Micro-USB (دخل)' },
            'Input': { en: 'Micro-USB 5V/2A · 9V/2A (18W QC)', ar: 'Micro-USB بجهد 5V/2A · 9V/2A (18W QC)' },
            'Fast Charging': { en: 'PowerIQ 2.0 + QC 3.0 (9V/12V) on Port 1', ar: 'PowerIQ 2.0 + QC 3.0 (9V/12V) على المنفذ 1' },
            'Battery Indicator': { en: '8-light LED wheel', ar: 'عجلة LED بـ 8 لمبات' },
            'Recharge Time': { en: '~5h via 18W QC (Micro-USB); ~10.5h via 5V/2A', ar: 'نحو 5 ساعات عبر QC 18W (Micro-USB)؛ نحو 10.5 ساعة عبر 5V/2A' },
            'Weight': { en: '369g', ar: '369 جرام' },
            'Dimensions': { en: '170 × 62 × 22 mm', ar: '170 × 62 × 22 ملم' },
            'Safety': { en: 'Manufacturer-listed MultiProtect features', ar: 'وظائف MultiProtect كما تذكرها انكر' },
        },
        benchTest: {
            sku: 'A1260 (A1260011)',
            sampleId: 'CV-PB-A1260-001',
            testDate: '2026-07-19',
            engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
            conditions: {
                en: 'One retail-stock unit · room temperature 27.8–28.5°C',
                ar: 'وحدة واحدة من مخزون التجزئة · حرارة الغرفة 27.8–28.5°م',
            },
            methodology: {
                en: 'We charged the pack to 100% over Micro-USB with an 18W QC charger (Anker A2013), rested it 30 minutes, then ran three separate full discharges — through the PowerIQ 2.0 port, through the standard port, and a two-device dual-load test — into a JUWEI 35W electronic load at 5V/2A (and into Galaxy phones for the charge count). The headline figure is the cumulative Wh logged by a FNIRSI FNB58, so efficiency, charge count and the discharge curve all reconcile to one measurement. Single unit; production batches may vary.',
                ar: 'شحنّا الوحدة حتى 100% عبر Micro-USB بشاحن QC 18W (Anker A2013)، ثم أرحناها 30 دقيقة، ثم أجرينا ثلاث تفريغات كاملة منفصلة — عبر منفذ PowerIQ 2.0، وعبر المنفذ القياسي، واختبار حمل مزدوج لجهازين — داخل حمل إلكتروني JUWEI 35W عند 5V/2A (وداخل هواتف Galaxy لاختبار عدد الشحنات). الرقم الأساسي هو طاقة Wh المتراكمة من FNIRSI FNB58، لذا تتوافق الكفاءة وعدد الشحنات ومنحنى التفريغ مع قياس واحد. وحدة واحدة وقد تختلف دفعات الإنتاج.',
            },
            equipment: [
                { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Cumulative V·A·W·Wh·mAh logging', ar: 'قياس V·A·W·Wh·mAh المتراكم' } },
                { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant-current discharge at 5V/2A', ar: 'تفريغ ثابت عند 5V/2A' } },
                { name: 'Anker PowerPort+ 1 (A2013, QC 3.0 18W)', use: { en: 'Fast Micro-USB QC recharge', ar: 'إعادة الشحن السريع QC عبر Micro-USB' } },
                { name: 'Samsung Galaxy A15 + A54 (5000mAh each)', use: { en: 'Charge-count & dual-load tests', ar: 'اختبار عدد الشحنات والحمل المزدوج' } },
                { name: 'Kkmoon 0.01g scale · Mitutoyo 150mm caliper', use: { en: 'Weight & dimensions', ar: 'الوزن والأبعاد' } },
            ],
            results: [
                { param: { en: 'Rated cell capacity', ar: 'السعة الاسمية (خلايا)' }, rated: '20,000mAh / 72Wh', measured: '—', note: { en: 'Manufacturer spec (3.6V nominal)', ar: 'مواصفة المصنّع (3.6V اسمي)' } },
                { param: { en: 'Usable energy — PowerIQ 2.0 port', ar: 'الطاقة المُخرجة — منفذ PowerIQ 2.0' }, measured: '61.4 Wh', note: { en: 'FNB58 cumulative — primary source', ar: 'قراءة FNB58 التراكمية — المصدر الأساسي' } },
                { param: { en: 'Conversion efficiency', ar: 'كفاءة التحويل' }, measured: '85.3%', note: { en: '61.4 ÷ 72', ar: '61.4 ÷ 72' } },
                { param: { en: 'Usable energy — standard port', ar: 'الطاقة المُخرجة — المنفذ القياسي' }, measured: '60.8 Wh (84.4%)' },
                { param: { en: 'Peak output — PowerIQ 2.0', ar: 'ذروة الخرج — PowerIQ 2.0' }, rated: '18W', measured: '17.1W (9.02V/1.90A)', note: { en: 'Negotiated 9V QC', ar: 'تفاوض 9V QC' } },
                { param: { en: 'Peak output — standard port', ar: 'ذروة الخرج — المنفذ القياسي' }, rated: '12W (5V/2.4A)', measured: '11.6W (5.13V/2.26A)' },
                { param: { en: 'Galaxy A15 charges (5000mAh)', ar: 'شحنات Galaxy A15 (5000mAh)' }, rated: { en: '"5+ charges"', ar: '"5+ شحنات"' }, measured: { en: '2.7 charges', ar: '2.7 شحنة' }, note: { en: '61.4 ÷ 22.1 Wh per charge', ar: '61.4 ÷ 22.1 Wh لكل شحنة' } },
                { param: { en: 'Two devices at once (dual-load)', ar: 'شحن جهازين معًا (dual-load)' }, measured: { en: '15.5W total (stable)', ar: '15.5W إجمالي (مستقر)' }, note: { en: 'PowerIQ 2.0 drops to 5V — fast charge is lost', ar: 'PowerIQ 2.0 يسقط لـ 5V — يضيع الشحن السريع' } },
                { param: { en: 'Recharge — 18W QC (Micro-USB)', ar: 'إعادة الشحن — QC 18W (Micro-USB)' }, measured: { en: '~5h 08m', ar: 'نحو 5 س 08 د' } },
                { param: { en: 'Recharge — standard 5V/2A', ar: 'إعادة الشحن — 5V/2A قياسي' }, measured: { en: '~10h 35m', ar: 'نحو 10 س 35 د' }, note: { en: 'roughly double — a QC charger is worth it', ar: 'نحو الضعف — شاحن QC يستحق' } },
                { param: { en: 'Weight', ar: 'الوزن' }, rated: '369g', measured: '372g', note: { en: 'within tolerance', ar: 'ضمن التفاوت' } },
                { param: { en: 'Dimensions', ar: 'الأبعاد' }, rated: '170×62×22mm', measured: '170.4×62.3×22.1mm', note: { en: 'within tolerance', ar: 'ضمن التفاوت' } },
            ],
            verdict: {
                en: 'The Anker PowerCore II 20000 (A1260) delivered 61.4Wh usable at 85.3% efficiency — enough for 2.7 full charges of a Galaxy A15 (5000mAh). PowerIQ 2.0 hit 17.1W via QC negotiation. The "5+ charges" claim holds only for phones around 3,000mAh; the Micro-USB input roughly doubles recharge time without a QC adapter.',
                ar: 'باور بانك انكر PowerCore II 20000 (A1260) أخرج 61.4Wh فعلية بكفاءة 85.3% — تكفي لـ 2.7 شحنة كاملة لهاتف Galaxy A15 (5000mAh). ووصل منفذ PowerIQ 2.0 إلى 17.1W بتفاوض QC. ووعد "5+ شحنات" واقعي فقط لهواتف بسعة نحو 3000mAh؛ ومدخل Micro-USB يضاعف زمن إعادة الشحن تقريبًا بدون شاحن QC.',
            },
            pros: [
                { en: '85.3% conversion efficiency — strong and in line with independent reviews of this class', ar: 'كفاءة تحويل 85.3% — قوية ومتسقة مع المراجعات المستقلة لهذه الفئة' },
                { en: 'PowerIQ 2.0 genuinely negotiates 9V QC with Samsung — real fast charge (17.1W measured)', ar: 'PowerIQ 2.0 يتفاوض فعليًا على 9V QC مع Samsung — شحن سريع حقيقي (17.1W مقيسة)' },
                { en: 'Stable standard-port output — voltage held above 4.74V until the final 30 minutes', ar: 'خرج المنفذ القياسي ثابت — الجهد ظل فوق 4.74V حتى آخر 30 دقيقة' },
                { en: '2.7 real charges for a 5000mAh phone — solid for a modern handset', ar: '2.7 شحنة حقيقية لهاتف 5000mAh — أداء قوي لهاتف حديث' },
            ],
            limits: [
                { en: '"5+ charges" is misleading for modern phones — realistic figure for a 5000mAh handset is 2.7', ar: '"5+ شحنات" مضلل للهواتف الحديثة — الرقم الواقعي لهاتف 5000mAh هو 2.7' },
                { en: 'Under dual-load the PowerIQ 2.0 port drops to 5V, so fast charge is lost when charging two devices', ar: 'عند الحمل المزدوج يسقط منفذ PowerIQ 2.0 لـ 5V، فيضيع الشحن السريع عند شحن جهازين' },
                { en: 'Micro-USB input, not USB-C — needs a Micro-USB cable and is not compatible with modern USB-C chargers', ar: 'مدخل Micro-USB وليس USB-C — يحتاج كابل Micro-USB وغير متوافق مع شواحن USB-C الحديثة' },
                { en: 'Without a QC charger, recharge takes over 10 hours (about double)', ar: 'بدون شاحن QC، تتجاوز إعادة الشحن 10 ساعات (نحو الضعف)' },
                { en: '372g is relatively heavy versus a modern USB-C power bank of the same capacity', ar: '372 جرامًا ثقيل نسبيًا مقارنة بباور بانك USB-C حديث بنفس السعة' },
                { en: 'Single unit tested — different production batches may vary', ar: 'وحدة واحدة مُختبرة — قد تختلف دفعات الإنتاج' },
            ],
        },
    };
