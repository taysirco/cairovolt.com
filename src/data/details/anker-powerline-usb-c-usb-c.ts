// Details for: Anker PowerLine III USB-C to USB-C (model A8852 / A8852H11, 3ft/0.9m, 60W)
import type { ProductDetail } from './_types';

export const anker_powerline_usb_c_usb_c_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Anker PowerLine III USB-C to USB-C (A8852): rated 60W PD (3A) — NOT 100W; a passive cable with no e-marker chip',
            '0.9m (3ft) double-braided nylon; USB 2.0 data up to 480Mbps',
            'Carries up to 60W (9V/15V/20V at 3A); 100W and Samsung 45W Super Fast Charging 2.0 (over 3A) need a 5A e-marker cable',
        ],
        ar: [
            'انكر PowerLine III من USB-C إلى USB-C (A8852): مصنّف 60 واط PD (3A) — وليس 100 واط؛ كابل سلبي بدون شريحة e-marker',
            'بطول 0.9 متر (3 قدم) بغلاف نايلون مزدوج الجدل؛ وبيانات USB 2.0 حتى 480Mbps',
            'يمرّر حتى 60 واط (9V/15V/20V عند 3A)؛ و100 واط أو شحن Samsung السريع 45 واط (فوق 3A) يحتاجان كابل 5A بشريحة e-marker',
        ],
    },
    specifications: {
        'Connector': { en: 'USB-C to USB-C', ar: 'USB-C إلى USB-C' },
        'Max Charging': { en: 'Up to 60W PD (20V/3A) — no e-marker', ar: 'حتى 60 واط PD (20V/3A) — بدون e-marker' },
        'Length': { en: '0.9m (3ft)', ar: '0.9 متر (3 قدم)' },
        'Data Speed': { en: 'USB 2.0 — up to 480Mbps', ar: 'USB 2.0 — حتى 480Mbps' },
        'Material': { en: 'Double-braided nylon', ar: 'نايلون مزدوج الجدل' },
        'E-marker': { en: 'None (a 60W/3A cable does not need one)', ar: 'لا يوجد (كابل 60 واط/3A لا يحتاجه)' },
        'Weight': { en: '~27g (measured)', ar: 'نحو 27 جرام (مقاس)' },
        'Safety': { en: 'Manufacturer-listed bend-test figure; replace the cable if damaged', ar: 'رقم اختبار ثني مدون من انكر؛ استبدل الكابل عند التلف' },
    },
    benchTest: {
        sku: 'A8852 (A8852H11)',
        sampleId: 'CV-CB-A8852-001',
        testDate: '2026-07-20',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit · room temperature 27.9°C',
            ar: 'وحدة واحدة من مخزون التجزئة · حرارة الغرفة 27.9°م',
        },
        methodology: {
            en: 'A cable is a conductor, not a power source, so there is no capacity to measure. Instead we measured its resistance with a FNIRSI FNB58 (differential method, 3 zeroed reads averaged), the voltage drop and heat loss under stepped loads on a JUWEI electronic load, the connector temperature at the 3A ceiling, whether it carries an e-marker chip, and how it negotiates real PD charging with several devices. Single unit; production batches may vary.',
            ar: 'الكابل موصِّل وليس مصدر طاقة، فلا سعة لقياسها. بدلاً من ذلك قِسنا مقاومته بمقياس FNIRSI FNB58 (طريقة تفاضلية، متوسط 3 قراءات مُصفّرة)، وهبوط الجهد والفقد الحراري تحت أحمال متدرجة على حمل JUWEI الإلكتروني، وحرارة الموصل عند حد 3A، ووجود شريحة e-marker من عدمه، وكيفية تفاوضه على شحن PD الفعلي مع عدة أجهزة. وحدة واحدة وقد تختلف دفعات الإنتاج.',
        },
        equipment: [
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Cable-resistance + V·A·W + e-marker decode', ar: 'مقاومة الكابل وV·A·W وفك e-marker' } },
            { name: 'JUWEI 35W USB electronic load', use: { en: 'Constant-current load (1A/2A/3A)', ar: 'حمل تيار ثابت (1A/2A/3A)' } },
            { name: 'Anker 713 45W GaN (A2643)', use: { en: 'Stable multi-voltage PD source', ar: 'مصدر PD مستقر متعدد الجهد' } },
            { name: 'GM320 IR thermometer', use: { en: 'Conductor temperature under load', ar: 'حرارة الموصل تحت الحمل' } },
            { name: 'iPhone 13 · Galaxy A54 · MacBook Air M2', use: { en: 'Real-device PD negotiation', ar: 'تفاوض PD مع أجهزة حقيقية' } },
        ],
        results: [
            { param: { en: 'Cable resistance (VBUS+GND)', ar: 'مقاومة الكابل (VBUS+GND)' }, measured: '245 mΩ', note: { en: '127 + 118 mΩ; excellent for 0.9m (cheap cables: 400–600)', ar: '127 + 118 mΩ؛ ممتازة لـ 0.9م (الكابلات الرخيصة: 400–600)' } },
            { param: { en: 'Voltage drop @3A', ar: 'هبوط الجهد عند 3A' }, rated: '≤0.75V (USB-IF)', measured: '0.74V', note: { en: 'just inside the USB-IF limit', ar: 'داخل حد USB-IF بالكاد' } },
            { param: { en: 'Power lost as heat @3A', ar: 'القدرة المفقودة حرارة عند 3A' }, measured: '2.21W', note: { en: 'I²R; conductor reached 41.2°C — safe', ar: 'I²R؛ الموصل بلغ 41.2°م — آمن' } },
            { param: { en: 'E-marker chip', ar: 'شريحة e-marker' }, measured: { en: 'None → caps at 3A / 60W', ar: 'لا يوجد → يتوقف عند 3A / 60W' }, note: { en: '100W (5A) and Samsung 45W Super Fast 2.0 (>3A) need a 5A e-marker cable', ar: '100 واط (5A) وSamsung 45 واط (فوق 3A) يحتاجان كابل 5A بـ e-marker' } },
            { param: { en: 'PD profiles carried', ar: 'بروفايلات PD الممرّرة' }, measured: { en: '9V, 15V, 20V — all at 3A (up to 60W)', ar: '9V و15V و20V — كلها عند 3A (حتى 60W)' } },
            { param: { en: 'iPhone 13 (20W charger)', ar: 'iPhone 13 (شاحن 20W)' }, measured: '17.6W (9V/1.97A)', note: { en: 'full PD speed', ar: 'سرعة PD كاملة' } },
            { param: { en: 'Galaxy A54 (20W charger)', ar: 'Galaxy A54 (شاحن 20W)' }, measured: '16.2W (9V/1.83A)' },
            { param: { en: 'MacBook Air M2 (45W charger)', ar: 'MacBook Air M2 (شاحن 45W)' }, measured: '43.8W (20V/2.19A)', note: { en: '45W works — it is under 3A', ar: '45 واط تشتغل — لأنها تحت 3A' } },
            { param: { en: 'Length', ar: 'الطول' }, rated: '0.9m (3ft)', measured: '93.4cm' },
            { param: { en: 'Weight', ar: 'الوزن' }, measured: '26.8g', note: { en: 'Anker does not publish a weight', ar: 'انكر لا تنشر وزنًا' } },
        ],
        verdict: {
            en: 'The Anker A8852 measured 245mΩ — excellent for a 0.9m cable — and carried a full 60W (20V/3A) at a 0.74V drop, just inside USB-IF limits. It has no e-marker, so it caps at 60W: 100W and Samsung\'s 45W Super Fast Charging 2.0 (over 3A) need a 5A cable. A great everyday cable for 60W and under.',
            ar: 'كابل انكر A8852 مقاومته 245mΩ — ممتازة لكابل 0.9 متر — ومرّر 60 واط كاملة (20V/3A) بهبوط جهد 0.74V داخل حدود USB-IF بالكاد. مفيهوش e-marker فبيتوقف عند 60 واط: و100 واط أو شحن Samsung السريع 45 واط (فوق 3A) محتاجين كابل 5A. كابل يومي ممتاز حتى 60 واط.',
        },
        pros: [
            { en: '245mΩ resistance — under a third of the USB-IF budget; excellent for its class', ar: 'مقاومة 245mΩ — أقل من ثلث حد USB-IF؛ ممتازة لفئته' },
            { en: '0.74V drop at 3A vs 1.2–1.8V on cheap cables — carries the full voltage', ar: 'هبوط 0.74V عند 3A مقابل 1.2–1.8V في الكابلات الرخيصة — يوصّل الجهد كاملًا' },
            { en: 'Negotiates 9V/15V/20V PD correctly — works with iPhone, Galaxy and a 45W MacBook', ar: 'يتفاوض على 9V/15V/20V بشكل صحيح — يعمل مع iPhone وGalaxy وماك بوك 45 واط' },
            { en: 'Reinforced strain relief and braided nylon — a durable everyday feel', ar: 'تخفيف إجهاد معزّز ونايلون مضفر — ملمس متين للاستخدام اليومي' },
        ],
        limits: [
            { en: 'No e-marker → 60W ceiling: 100W is impossible, and Samsung 45W Super Fast Charging 2.0 (over 3A) will not reach full speed', ar: 'بدون e-marker → سقف 60 واط: 100 واط مستحيلة، وشحن Samsung السريع 45 واط (فوق 3A) لن يبلغ سرعته الكاملة' },
            { en: '0.9m (3ft) only — short for some setups; the 6ft version is a different model (A8853)', ar: '0.9 متر (3 قدم) فقط — قصير لبعض الاستخدامات؛ نسخة 6 قدم موديل مختلف (A8853)' },
            { en: 'At 3A the voltage drop sits right at the USB-IF limit — 60W is genuinely its ceiling', ar: 'عند 3A يقع هبوط الجهد عند حد USB-IF تمامًا — 60 واط هو سقفه فعلًا' },
            { en: 'USB 2.0 data only (480Mbps) — not for large transfers or video output', ar: 'بيانات USB 2.0 فقط (480Mbps) — لا يصلح لنقل كبير أو خرج فيديو' },
            { en: 'Single unit tested — different production batches may vary', ar: 'وحدة واحدة مُختبرة — قد تختلف دفعات الإنتاج' },
        ],
    },
};
