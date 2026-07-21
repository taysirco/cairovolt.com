// Details for: anker-622-maggo  (Anker 622 MagGo Magnetic Battery, model A1611)
import type { ProductDetail } from './_types';

export const anker_622_maggo_detail: ProductDetail = {
        aiTldr: {
            en: [
                'Anker 622 MagGo (A1611): a 5,000mAh (19.25Wh) magnetic battery for MagSafe-compatible iPhones — the real charge you get depends on the phone and on wireless losses',
                'Wireless is rated 7.5W but sustains about 5.2W in use; CairoVolt measured 52.5% wireless efficiency (cell→phone), so nearly half the pack\'s energy is lost as heat',
                'Use the USB-C cable when you can: in our test it was 2.4× faster (0→50% in 34 min vs 1h 22m wirelessly) and took an iPhone 13 to 88% versus 69% on the magnet',
                'USB-C is bidirectional — it recharges the pack (~1h 48m) and outputs over the cable; built-in foldable kickstand; ~143g on our scale',
                'It will not top a phone to 100% wirelessly, it can slip off without a case, and its body reached ~41°C after a 60-minute load',
            ],
            ar: [
                'انكر 622 MagGo (A1611): بطارية مغناطيسية بسعة 5,000 مللي أمبير (19.25Wh) لأجهزة ايفون المتوافقة مع MagSafe — ويعتمد الشحن الفعلي على الهاتف وعلى خسائر الشحن اللاسلكي',
                'الشحن اللاسلكي مصنّف 7.5W لكنه يثبت عند نحو 5.2W أثناء الاستخدام؛ وقاست CairoVolt كفاءة لاسلكية 52.5% (من الخلية إلى الهاتف)، أي أن نحو نصف طاقة البطارية يُفقد كحرارة',
                'استخدم كابل USB-C متى أمكن: في اختبارنا كان أسرع بـ 2.4 مرة (0→50% في 34 دقيقة مقابل ساعة و22 دقيقة لاسلكيًا) وأوصل ايفون 13 إلى 88% مقابل 69% على المغناطيس',
                'منفذ USB-C ثنائي الاتجاه — يعيد شحن البطارية (نحو ساعة و48 دقيقة) ويُخرج الطاقة عبر الكابل؛ حامل مدمج قابل للطي؛ نحو 143 جرامًا بميزاننا',
                'لن يصل بالهاتف إلى 100% لاسلكيًا، وقد ينزلق دون جراب، وبلغت حرارة جسمه نحو 41°م بعد حمل 60 دقيقة',
            ],
        },
        localContext: {
            en: 'The kickstand lets you keep watching while a compatible iPhone charges wirelessly, but magnetic alignment, case thickness, temperature and phone use all cut the rate. In CairoVolt\'s bench test the USB-C cable was clearly faster and far more efficient than the magnetic coil — so use the cable when speed matters and the magnet for convenience.',
            ar: 'يتيح الحامل متابعة المشاهدة أثناء شحن ايفون متوافق لاسلكيًا، لكن المحاذاة المغناطيسية وسُمك الجراب والحرارة واستخدام الهاتف كلها تقلّل السرعة. وفي اختبار CairoVolt المعملي كان كابل USB-C أسرع وأكفأ بوضوح من الملف المغناطيسي — لذا استخدم الكابل عندما تهم السرعة والمغناطيس للراحة.',
        },
        specifications: {
            'Capacity': { en: '5,000mAh (19.25Wh)', ar: '5,000 مللي أمبير (19.25Wh)' },
            'Wireless Output': { en: '7.5W (MagSafe-compatible); ~5.2W sustained measured', ar: '7.5 واط (متوافق مع MagSafe)؛ نحو 5.2W ثابتة بالقياس' },
            'Wired Output': { en: 'USB-C, rated 5V/2.4A (12W)', ar: 'USB-C، مصنّف 5V/2.4A (12W)' },
            'Ports': { en: '1× USB-C (bidirectional — input & output)', ar: '1× USB-C (ثنائي الاتجاه — دخل وخرج)' },
            'Kickstand': { en: 'Built-in foldable kickstand', ar: 'حامل مدمج قابل للطي' },
            'Compatibility': { en: 'MagSafe-compatible iPhones and cases; verify exact model fit', ar: 'أجهزة وجرابات ايفون المتوافقة مع MagSafe؛ تحقق من مطابقة الموديل' },
            'Recharge Time': { en: '~1h 48m over USB-C', ar: 'نحو ساعة و48 دقيقة عبر USB-C' },
            'Weight': { en: '140g (measured 143g)', ar: '140 جرام (المقيس 143 جرامًا)' },
            'Dimensions': { en: '105 × 66 × 13 mm', ar: '105 × 66 × 13 ملم' },
            'Safety': { en: 'Manufacturer-listed MultiProtect and magnetic-alignment features', ar: 'وظائف MultiProtect والمحاذاة المغناطيسية كما تذكرها انكر' },
        },
        benchTest: {
            sku: 'A1611',
            sampleId: 'CV-PB-A1611-001',
            testDate: '2026-07-22',
            engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
            conditions: {
                en: 'One retail-stock unit · room temperature 28.4°C',
                ar: 'وحدة واحدة من مخزون التجزئة · حرارة الغرفة 28.4°م',
            },
            methodology: {
                en: 'We charged the pack to 100% over USB-C, rested it, then measured two paths. First, a wired discharge through the USB-C port into a JUWEI 35W electronic load at a 5V/2A load — the port is rated 5V/2.4A, so 5V/2A is a deliberate below-max setting — logging cumulative Wh on a FNIRSI FNB58. Second, a wireless run charging an iPhone 13 from empty on the magnetic pad, logging delivered Wh and tracking the phone\'s battery percentage. Body and iPhone surface temperatures were read with an IR thermometer after 60 minutes under load. Single unit; production batches may vary.',
                ar: 'شحنّا البطارية حتى 100% عبر USB-C، ثم أرحناها، ثم قسنا مسارين. أولًا تفريغ سلكي عبر منفذ USB-C داخل حمل إلكتروني JUWEI 35W عند حمل 5V/2A — والمنفذ مصنّف 5V/2.4A، فإن 5V/2A إعداد متعمّد أقل من الحد الأقصى — مع تسجيل طاقة Wh المتراكمة على FNIRSI FNB58. وثانيًا تشغيل لاسلكي لشحن ايفون 13 من الفراغ على القاعدة المغناطيسية، مع تسجيل الطاقة المُسلّمة وتتبّع نسبة بطارية الهاتف. وقُرئت حرارتا الجسم وسطح الايفون بمقياس أشعة تحت حمراء بعد 60 دقيقة تحت الحمل. وحدة واحدة وقد تختلف دفعات الإنتاج.',
            },
            equipment: [
                { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Cumulative V·A·W·Wh·mAh logging', ar: 'قياس V·A·W·Wh·mAh المتراكم' } },
                { name: 'JUWEI 35W USB electronic load', use: { en: 'Wired constant-current discharge at 5V/2A', ar: 'تفريغ سلكي ثابت التيار عند 5V/2A' } },
                { name: 'Apple iPhone 13', use: { en: 'Wireless charge test & battery-percentage tracking', ar: 'اختبار الشحن اللاسلكي وتتبّع نسبة البطارية' } },
                { name: 'IR thermometer', use: { en: 'Surface temperatures at 60 minutes', ar: 'حرارة الأسطح عند 60 دقيقة' } },
                { name: 'Kkmoon 0.01g scale · Mitutoyo 150mm caliper', use: { en: 'Weight & dimensions', ar: 'الوزن والأبعاد' } },
            ],
            results: [
                { param: { en: 'Rated cell capacity', ar: 'السعة الاسمية (خلايا)' }, rated: '5,000mAh / 19.25Wh', measured: '—', note: { en: 'Manufacturer spec (3.85V nominal)', ar: 'مواصفة المصنّع (3.85V اسمي)' } },
                { param: { en: 'Usable energy — USB-C cable (5V/2A)', ar: 'الطاقة المُخرجة — كابل USB-C (5V/2A)' }, measured: '14.3 Wh', note: { en: 'FNB58 cumulative — primary source', ar: 'قراءة FNB58 التراكمية — المصدر الأساسي' } },
                { param: { en: 'Wired efficiency (at the 5V/2A load)', ar: 'الكفاءة السلكية (عند حمل 5V/2A)' }, measured: '74.3%', note: { en: '14.3 ÷ 19.25; 5V/2A is a chosen below-max load', ar: '14.3 ÷ 19.25؛ و5V/2A حمل مختار أقل من الحد الأقصى' } },
                { param: { en: 'Wired test load', ar: 'حمل الاختبار السلكي' }, rated: '5V/2.4A (12W)', measured: { en: '5V/2A (deliberate below-max)', ar: '5V/2A (متعمّد أقل من الأقصى)' }, note: { en: 'A chosen load, not the port ceiling', ar: 'حمل مختار وليس سقف المنفذ' } },
                { param: { en: 'Sustained wireless power', ar: 'قدرة الشحن اللاسلكي الثابتة' }, rated: '7.5W (MagSafe-compatible)', measured: { en: '5.2W sustained', ar: '5.2W ثابتة' }, note: { en: '~5W sustained is normal for Qi/MagSafe — this is delivered power, not efficiency', ar: 'نحو 5W ثابتة أمر طبيعي لـ Qi/MagSafe — وهذه قدرة مُسلّمة وليست كفاءة' } },
                { param: { en: 'Usable energy — wireless (to iPhone 13)', ar: 'الطاقة المُخرجة — لاسلكيًا (إلى ايفون 13)' }, measured: '10.1 Wh' },
                { param: { en: 'Wireless efficiency (cell→phone)', ar: 'الكفاءة اللاسلكية (من الخلية إلى الهاتف)' }, measured: '52.5%', note: { en: '10.1 ÷ 19.25 — nearly half the pack\'s energy is lost as heat', ar: '10.1 ÷ 19.25 — يُفقد نحو نصف طاقة البطارية كحرارة' } },
                { param: { en: 'iPhone 13 reached — wireless vs wired', ar: 'نسبة ايفون 13 — لاسلكيًا مقابل سلكيًا' }, measured: { en: '69% wireless · 88% wired', ar: '69% لاسلكيًا · 88% سلكيًا' }, note: { en: 'one full pack each way', ar: 'بطارية كاملة واحدة لكل مسار' } },
                { param: { en: 'Time to 50% — wireless vs wired', ar: 'زمن الوصول إلى 50% — لاسلكيًا مقابل سلكيًا' }, measured: { en: 'wireless 1h 22m · wired 34m', ar: 'لاسلكيًا ساعة و22 دقيقة · سلكيًا 34 دقيقة' }, note: { en: '2.4× faster over the cable', ar: 'أسرع بـ 2.4 مرة عبر الكابل' } },
                { param: { en: 'MagGo self-recharge (USB-C)', ar: 'إعادة شحن MagGo نفسه (USB-C)' }, measured: { en: '~1h 48m', ar: 'نحو ساعة و48 دقيقة' } },
                { param: { en: 'Peak temperature (60-min load)', ar: 'ذروة الحرارة (حمل 60 دقيقة)' }, measured: { en: '41.3°C body · 38.4°C iPhone back', ar: '41.3°م للجسم · 38.4°م لظهر الايفون' } },
                { param: { en: 'Weight', ar: 'الوزن' }, rated: '140g', measured: '143g', note: { en: 'slightly over, within tolerance', ar: 'أعلى قليلًا، ضمن التفاوت' } },
            ],
            verdict: {
                en: 'Use the cable when you can. Over USB-C the 622 MagGo delivered 14.3Wh at 74.3% and hit 50% in 34 minutes; wirelessly it sustained just 5.2W, delivered 10.1Wh at 52.5% efficiency — 2.4× slower and about 28% less energy — taking an iPhone 13 to 69% versus 88% wired.',
                ar: 'استخدم الكابل متى أمكن. عبر USB-C أخرج 622 MagGo طاقة 14.3Wh بكفاءة 74.3% ووصل إلى 50% في 34 دقيقة؛ ولاسلكيًا ثبت عند 5.2W فقط وأخرج 10.1Wh بكفاءة 52.5% — أبطأ بـ 2.4 مرة وطاقة أقل بنحو 28% — وأوصل ايفون 13 إلى 69% مقابل 88% سلكيًا.',
            },
            pros: [
                { en: 'Strong magnetic hold on an iPhone 13 — it snapped on square and stayed aligned', ar: 'إمساك مغناطيسي قوي على ايفون 13 — يلتصق بدقة ويبقى محاذيًا' },
                { en: 'Built-in foldable kickstand for hands-free viewing while it charges', ar: 'حامل مدمج قابل للطي للمشاهدة دون إمساك أثناء الشحن' },
                { en: '143g on our scale — genuinely pocketable for a 5,000mAh MagSafe bank', ar: '143 جرامًا بميزاننا — مناسب فعلًا للجيب لباور بانك MagSafe سعة 5,000mAh' },
                { en: 'USB-C is bidirectional — recharge the pack and output over the cable at 74.3% efficiency', ar: 'منفذ USB-C ثنائي الاتجاه — يعيد شحن البطارية ويُخرج الطاقة عبر الكابل بكفاءة 74.3%' },
                { en: 'The cable path is fast — 0→50% in 34 minutes, 2.4× quicker than the magnet', ar: 'مسار الكابل سريع — 0→50% في 34 دقيقة، أسرع بـ 2.4 مرة من المغناطيس' },
            ],
            limits: [
                { en: 'Wireless sustains only about 5.2W of the 7.5W rating — expect slow top-ups on the magnet', ar: 'الشحن اللاسلكي يثبت عند نحو 5.2W فقط من تصنيف 7.5W — توقّع تعبئة بطيئة على المغناطيس' },
                { en: 'Wireless efficiency measured 52.5% (cell→phone) — nearly half the pack\'s energy is lost as heat', ar: 'الكفاءة اللاسلكية المقيسة 52.5% (من الخلية إلى الهاتف) — يُفقد نحو نصف طاقة البطارية كحرارة' },
                { en: 'It would not take the iPhone past 69% wirelessly in our run — you cannot reach 100% on the coil alone', ar: 'لم يتجاوز الايفون 69% لاسلكيًا في تجربتنا — لا يمكن بلوغ 100% على الملف وحده' },
                { en: 'Without a case the magnet can slip, breaking alignment and interrupting the charge', ar: 'دون جراب قد ينزلق المغناطيس فتنكسر المحاذاة وينقطع الشحن' },
                { en: 'The body reached 41.3°C after 60 minutes under load — warm to hold', ar: 'بلغت حرارة الجسم 41.3°م بعد 60 دقيقة تحت الحمل — دافئ عند الإمساك' },
                { en: 'Single unit tested — different production batches may vary', ar: 'وحدة واحدة مُختبرة — قد تختلف دفعات الإنتاج' },
            ],
        },
    };
