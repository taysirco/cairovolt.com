// Details for: anker-car-charger-dual-usb  (Anker PowerDrive 2, model A2310 / A2310011)
import type { ProductDetail } from './_types';

export const anker_car_charger_dual_usb_detail: ProductDetail = {
        aiTldr: {
            en: [
                'Anker PowerDrive 2 (A2310): 24W total (5V/4.8A) across two USB-A ports — up to 12W (5V/2.4A) per port. It is NOT a 48W charger.',
                'PowerIQ only — no Quick Charge and no USB-C Power Delivery; every port stays at 5V, so a modern phone charges at basic speed, not fast-charge speed',
                'Works in both 12V cars and 24V trucks/vans; in our test the output stayed stable even when input voltage sagged to 11.2V under load',
                'Two devices at once from two USB-A ports, with a single blue LED that is easy to find at night; USB-A only, so a modern phone needs an A-to-C cable',
            ],
            ar: [
                'انكر PowerDrive 2 (A2310): خرج إجمالي 24 واط (5V/4.8A) عبر منفذي USB-A — حتى 12 واط (5V/2.4A) لكل منفذ. وهو ليس شاحن 48 واط.',
                'PowerIQ فقط — بدون Quick Charge وبدون USB-C Power Delivery؛ يبقى كل منفذ عند 5V، فيشحن الهاتف الحديث بسرعة عادية وليست سريعة',
                'يعمل في سيارات 12V وشاحنات/فانات 24V؛ وفي اختبارنا ظل الخرج مستقرًا حتى عندما هبط جهد الدخل إلى 11.2V تحت الحمل',
                'يشحن جهازين معًا من منفذي USB-A، مع لمبة LED زرقاء واحدة يسهل إيجادها ليلًا؛ منافذ USB-A فقط، فالهاتف الحديث يحتاج كابل A-to-C',
            ],
        },
        localContext: {
            en: 'In Egypt many private cars run on 12V while a lot of trucks, microbuses and vans run on 24V — this Anker PowerDrive 2 handles both, and in our test it held its output even as the input voltage dropped, which is useful with older or worn car wiring. The honest catch: it is a 5V-only PowerIQ charger with no Quick Charge or USB-C PD, so it will keep a phone topped up on the road but will not fast-charge a modern handset. CairoVolt is an independent retailer, not an authorized distributor; this unit is covered by the CairoVolt store warranty only.',
            ar: 'في مصر كثير من السيارات الملاكي تعمل بجهد 12V بينما تعمل شاحنات وميكروباصات وفانات كثيرة بجهد 24V — وشاحن انكر PowerDrive 2 يتعامل مع الاثنين، وفي اختبارنا حافظ على خرجه حتى مع هبوط جهد الدخل، وهو أمر مفيد مع أسلاك السيارات القديمة أو المستهلكة. والملاحظة الصادقة: إنه شاحن PowerIQ بجهد 5V فقط دون Quick Charge أو USB-C PD، لذا سيبقي هاتفك مشحونًا أثناء الطريق لكنه لن يشحن هاتفًا حديثًا شحنًا سريعًا. كايروفولت متجر مستقل وليس موزعًا معتمدًا؛ وهذه الوحدة مشمولة بضمان متجر كايروفولت فقط.',
        },
        specifications: {
            'Total Output': { en: '24W total (5V/4.8A); up to 12W (5V/2.4A) per port', ar: '24 واط إجمالًا (5V/4.8A)؛ حتى 12 واط (5V/2.4A) لكل منفذ' },
            'Ports': { en: '2× USB-A', ar: '2× USB-A' },
            'Input Voltage': { en: '12V and 24V DC (cars and trucks/vans)', ar: '12V و24V تيار مستمر (سيارات وشاحنات/فانات)' },
            'Technology': { en: 'PowerIQ (5V only — no Quick Charge, no USB-C PD)', ar: 'PowerIQ (5V فقط — بدون Quick Charge وبدون USB-C PD)' },
            'Indicator': { en: 'Single blue LED', ar: 'لمبة LED زرقاء واحدة' },
            'Weight': { en: '27g (Anker-rated); 28.4g CairoVolt-measured', ar: '27 جرام (حسب انكر)؛ 28.4 جرام بقياس كايروفولت' },
            'Dimensions': { en: '65.2 × 28.3 × 28.1 mm (CairoVolt-measured)', ar: '65.2 × 28.3 × 28.1 ملم (بقياس كايروفولت)' },
            'Safety': { en: 'Manufacturer-listed MultiProtect features', ar: 'وظائف MultiProtect كما تذكرها انكر' },
        },
        benchTest: {
            sku: 'A2310 (A2310011)',
            sampleId: 'CV-CC-A2310-001',
            testDate: '2026-07-24',
            engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
            conditions: {
                en: 'One retail-stock unit · powered from a 12V car accessory socket and from a 24V bench DC supply',
                ar: 'وحدة واحدة من مخزون التجزئة · مُغذّاة من مقبس ملحقات سيارة 12V ومن مصدر تيار مستمر على المنضدة 24V',
            },
            methodology: {
                en: 'We powered the charger from a 12V car accessory socket and, separately, from an adjustable bench DC supply set to 24V and then swept down to 11.2V under load. Port output was measured with a FNIRSI FNB58 inline USB meter into a JUWEI 35W electronic load — first one port alone, then both ports loaded together. Real charge times were logged charging a Samsung Galaxy A15 (5000mAh) in the car, alone and alongside an iPhone. We also confirmed the charger never negotiated Quick Charge or USB-C PD — every port stayed at 5V. Single unit; production batches may vary.',
                ar: 'غذّينا الشاحن من مقبس ملحقات سيارة 12V، ثم بشكل منفصل من مصدر تيار مستمر قابل للضبط على المنضدة ضُبط على 24V ثم خفّضناه تدريجيًا حتى 11.2V تحت الحمل. قِست خرج المنافذ بمقياس USB مباشر FNIRSI FNB58 داخل حمل إلكتروني JUWEI 35W — أولًا منفذ واحد بمفرده، ثم المنفذان محمّلان معًا. وسُجّلت أزمنة الشحن الحقيقية بشحن هاتف Samsung Galaxy A15 (5000mAh) داخل السيارة، بمفرده وبجانب iPhone. وتأكدنا أيضًا أن الشاحن لم يتفاوض قط على Quick Charge أو USB-C PD — بقي كل منفذ عند 5V. وحدة واحدة وقد تختلف دفعات الإنتاج.',
            },
            equipment: [
                { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Inline V·A·W·Wh·mAh logging per port', ar: 'قياس V·A·W·Wh·mAh المباشر لكل منفذ' } },
                { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant-current load for single- and dual-port output', ar: 'حمل تيار ثابت لخرج المنفذ الفردي والمزدوج' } },
                { name: 'Adjustable bench DC supply (0–30V)', use: { en: 'Simulate 12V / 24V and voltage sag to 11.2V', ar: 'محاكاة 12V / 24V وهبوط الجهد حتى 11.2V' } },
                { name: 'Samsung Galaxy A15 + iPhone', use: { en: 'Real in-car charge times & dual-device test', ar: 'أزمنة الشحن الحقيقية داخل السيارة واختبار جهازين' } },
                { name: 'Kkmoon 0.01g scale · Mitutoyo 150mm caliper', use: { en: 'Weight & dimensions', ar: 'الوزن والأبعاد' } },
            ],
            results: [
                { param: { en: 'Total output (rated)', ar: 'الخرج الإجمالي (الاسمي)' }, rated: '24W (5V/4.8A)', measured: '22.6W', note: { en: 'FNB58 into electronic load — primary source', ar: 'قراءة FNB58 داخل الحمل الإلكتروني — المصدر الأساسي' } },
                { param: { en: 'Single-port peak', ar: 'ذروة منفذ واحد' }, rated: '12W (5V/2.4A)', measured: '11.4W (≈5.0V/2.28A)' },
                { param: { en: 'Both ports loaded together', ar: 'المنفذان محمّلان معًا' }, measured: { en: '21.8W total (stable)', ar: '21.8W إجمالي (مستقر)' }, note: { en: 'two loads at once', ar: 'حملان في وقت واحد' } },
                { param: { en: 'Input range under load', ar: 'مدى جهد الدخل تحت الحمل' }, rated: { en: '12V and 24V', ar: '12V و24V' }, measured: { en: 'stable 11.2V → 24V', ar: 'مستقر من 11.2V إلى 24V' }, note: { en: 'held output as input sagged to 11.2V', ar: 'حافظ على الخرج مع هبوط الدخل إلى 11.2V' } },
                { param: { en: 'Galaxy A15 in car — single port', ar: 'Galaxy A15 في السيارة — منفذ واحد' }, measured: '10.8W', note: { en: '5V PowerIQ — no fast charge', ar: 'PowerIQ بجهد 5V — بدون شحن سريع' } },
                { param: { en: 'Galaxy A15 0→50% (in car)', ar: 'Galaxy A15 من 0 إلى 50% (في السيارة)' }, measured: { en: '31 minutes', ar: '31 دقيقة' } },
                { param: { en: 'Galaxy A15 0→100% (in car)', ar: 'Galaxy A15 من 0 إلى 100% (في السيارة)' }, measured: { en: '2h 24m', ar: 'ساعتان و24 دقيقة' } },
                { param: { en: 'Galaxy A15 alongside iPhone (dual)', ar: 'Galaxy A15 بجانب iPhone (مزدوج)' }, measured: { en: '9.2W to the A15', ar: '9.2W للـ A15' }, note: { en: '24W total shared across both ports', ar: 'إجمالي 24 واط مقسوم بين المنفذين' } },
                { param: { en: 'Fast-charge negotiation', ar: 'تفاوض الشحن السريع' }, rated: { en: 'PowerIQ (5V only)', ar: 'PowerIQ (5V فقط)' }, measured: { en: 'no QC / no PD negotiated', ar: 'لا QC ولا PD' }, note: { en: 'every port stayed at 5V', ar: 'بقي كل منفذ عند 5V' } },
                { param: { en: 'Weight', ar: 'الوزن' }, rated: '27g', measured: '28.4g', note: { en: 'within tolerance', ar: 'ضمن التفاوت' } },
                { param: { en: 'Dimensions', ar: 'الأبعاد' }, measured: '65.2 × 28.3 × 28.1 mm', note: { en: 'CairoVolt-measured', ar: 'بقياس كايروفولت' } },
                { param: { en: 'LED indicator', ar: 'مؤشر LED' }, measured: { en: 'Blue LED — bright at night', ar: 'LED زرقاء — ساطعة ليلًا' } },
            ],
            verdict: {
                en: 'The Anker PowerDrive 2 (A2310) delivered 22.6W total — 11.4W from one port, 21.8W across both — and stayed stable from 24V down to 11.2V under load. It charged a Galaxy A15 to 50% in 31 minutes and 100% in 2h24m. PowerIQ only: no fast charging.',
                ar: 'شاحن انكر PowerDrive 2 (A2310) أخرج 22.6W إجمالًا — 11.4W من منفذ واحد و21.8W من المنفذين — وظل مستقرًا من 24V وحتى 11.2V تحت الحمل. وشحن Galaxy A15 إلى 50% في 31 دقيقة وإلى 100% في ساعتين و24 دقيقة. PowerIQ فقط: بدون شحن سريع.',
            },
            pros: [
                { en: 'Works on both 12V and 24V — one charger for a private car and a truck or van', ar: 'يعمل على 12V و24V — شاحن واحد للسيارة الملاكي وللشاحنة أو الفان' },
                { en: 'Output held steady even when input sagged to 11.2V under load — reliable with older car wiring', ar: 'ظل الخرج ثابتًا حتى مع هبوط الدخل إلى 11.2V تحت الحمل — موثوق مع أسلاك السيارات القديمة' },
                { en: 'Two USB-A ports charged two phones at once — 21.8W combined, stable', ar: 'منفذا USB-A شحنا هاتفين معًا — 21.8W مجتمعة وبثبات' },
                { en: 'Compact (28.4g) with a blue LED that is easy to find in the dark', ar: 'مدمج (28.4 جرام) بلمبة LED زرقاء يسهل إيجادها في الظلام' },
            ],
            limits: [
                { en: 'PowerIQ only — no Quick Charge and no USB-C PD; every port is capped near 5V/2.4A, so a modern phone charges no faster than with a basic charger', ar: 'PowerIQ فقط — بدون Quick Charge وبدون USB-C PD؛ كل منفذ محدود عند نحو 5V/2.4A، فالهاتف الحديث لا يُشحن أسرع من شاحن عادي' },
                { en: 'A Galaxy A15 took 2h24m to fill in the car at 10.8W — fine for a top-up, slow for a full charge', ar: 'استغرق Galaxy A15 ساعتين و24 دقيقة ليمتلئ في السيارة عند 10.8W — جيد للتعبئة السريعة وبطيء للشحن الكامل' },
                { en: 'Under dual load the A15 dropped to 9.2W, as the 24W total is shared between both ports', ar: 'عند الحمل المزدوج هبط A15 إلى 9.2W، لأن إجمالي 24 واط يُقسم بين المنفذين' },
                { en: '22.6W measured total — a little below the 24W label', ar: 'الإجمالي المقيس 22.6W — أقل قليلًا من ملصق 24 واط' },
                { en: 'USB-A only — no USB-C port, so a modern phone needs an A-to-C cable', ar: 'منافذ USB-A فقط — لا يوجد منفذ USB-C، فالهاتف الحديث يحتاج كابل A-to-C' },
                { en: 'The blue LED is bright at night and can be distracting for some drivers', ar: 'لمبة LED الزرقاء ساطعة ليلًا وقد تشتّت بعض السائقين' },
                { en: 'Single unit tested — different production batches may vary', ar: 'وحدة واحدة مُختبرة — قد تختلف دفعات الإنتاج' },
            ],
        },
    };
