// AI SEO Enhancements for product pages
// Separate file to avoid bloating seed-products.ts

export interface ProductSEOEnhancement {
    aiTldr: { en: string[]; ar: string[] };
    localPainPoint: { en: string; ar: string };
    specifications: Record<string, { en: string; ar: string }>;
}

const enhancements: Record<string, ProductSEOEnhancement> = {
    'anker-soundcore-motion-plus': {
        aiTldr: {
            en: ['30W Hi-Res certified sound with deep bass', 'IPX7 fully waterproof — pool & shower safe', '12-hour battery life on single charge', 'Customizable EQ via Soundcore app'],
            ar: ['صوت 30 واط بشهادة Hi-Res وباس عميق', 'مقاوم للماء IPX7 — آمن للمسبح والدش', 'بطارية 12 ساعة بشحنة واحدة', 'تخصيص الصوت عبر تطبيق Soundcore']
        },
        localPainPoint: {
            en: 'Perfect for Egyptian beach trips to Sahel and Ain Sokhna — fully waterproof with powerful sound that cuts through outdoor noise.',
            ar: 'مثالي لرحلات الشواطئ في الساحل والعين السخنة — مقاوم للماء بالكامل وصوت قوي يتغلب على ضوضاء الأماكن المفتوحة.'
        },
        specifications: {
            'Output Power': { en: '30W', ar: '30 واط' },
            'Battery Life': { en: '12 hours', ar: '12 ساعة' },
            'Water Resistance': { en: 'IPX7', ar: 'IPX7' },
            'Connectivity': { en: 'Bluetooth 5.0 + AUX', ar: 'بلوتوث 5.0 + AUX' },
            'Weight': { en: '1.05 kg', ar: '1.05 كجم' },
        }
    },
    'anker-soundcore-flare-2': {
        aiTldr: {
            en: ['360° surround sound with LED light show', 'Link 100+ speakers via PartyCast', 'IPX7 waterproof for pool parties', 'Customizable EQ and light effects via app'],
            ar: ['صوت محيطي 360 درجة مع عرض إضاءة LED', 'ربط 100+ سماعة عبر PartyCast', 'مقاوم للماء IPX7 للحفلات', 'تحكم بالصوت والإضاءة عبر التطبيق']
        },
        localPainPoint: {
            en: 'The ultimate party speaker for Egyptian gatherings and rooftop events — sync dozens of speakers for massive sound coverage.',
            ar: 'سماعة الحفلات المثالية للتجمعات المصرية وحفلات الأسطح — اربط عشرات السماعات لتغطية صوتية ضخمة.'
        },
        specifications: {
            'Output Power': { en: '20W (10W×2)', ar: '20 واط (10×2)' },
            'Battery Life': { en: '12 hours', ar: '12 ساعة' },
            'Water Resistance': { en: 'IPX7', ar: 'IPX7' },
            'Connectivity': { en: 'Bluetooth 5.0', ar: 'بلوتوث 5.0' },
            'Weight': { en: '0.65 kg', ar: '0.65 كجم' },
        }
    },
    'anker-737-powerbank': {
        aiTldr: {
            en: ['140W ultra-fast charging — charges MacBook Pro in 30 min', '24,000mAh massive capacity for laptops + phones', 'Smart digital display shows power & time', 'Airline-safe at 86.4Wh (under 100Wh limit)'],
            ar: ['شحن فائق 140 واط — يشحن ماك بوك برو في 30 دقيقة', 'سعة ضخمة 24,000 مللي أمبير للابتوب والموبايل', 'شاشة رقمية ذكية تعرض الطاقة والوقت', 'آمن للطيران بسعة 86.4Wh']
        },
        localPainPoint: {
            en: 'Essential during Egyptian power outages — keeps your laptop and phone running for hours. Charges MacBook Pro 16" to 50% in just 30 minutes.',
            ar: 'ضروري أثناء انقطاع الكهرباء في مصر — يبقي اللابتوب والموبايل شغالين لساعات. يشحن ماك بوك برو 16 بوصة لـ 50% في 30 دقيقة فقط.'
        },
        specifications: {
            'Capacity': { en: '24,000mAh (86.4Wh)', ar: '24,000 مللي أمبير (86.4Wh)' },
            'Max Output': { en: '140W USB-C', ar: '140 واط USB-C' },
            'Ports': { en: '2× USB-C + 1× USB-A', ar: '2× USB-C + 1× USB-A' },
            'Recharge Time': { en: '<1 hour (140W)', ar: 'أقل من ساعة (140W)' },
            'Weight': { en: '645g', ar: '645 جرام' },
        }
    },
    'anker-622-maggo': {
        aiTldr: {
            en: ['Magnetic snap-on charging for iPhone 15/16/17', 'Built-in foldable kickstand for hands-free viewing', 'USB-C pass-through charging support', 'Ultra-slim design fits in back pocket'],
            ar: ['شحن مغناطيسي بالالتصاق للايفون 15/16/17', 'حامل مدمج قابل للطي للمشاهدة بدون يدين', 'يدعم الشحن التمريري عبر USB-C', 'تصميم نحيف جداً يدخل الجيب الخلفي']
        },
        localPainPoint: {
            en: 'Charge your iPhone wirelessly in Egyptian cafes and universities — the kickstand lets you watch content while charging, no cables needed.',
            ar: 'اشحن ايفونك لاسلكياً في الكافيهات والجامعات المصرية — الحامل يخليك تتفرج على المحتوى وأنت بتشحن بدون كابلات.'
        },
        specifications: {
            'Capacity': { en: '5,000mAh', ar: '5,000 مللي أمبير' },
            'Wireless Output': { en: '7.5W MagSafe', ar: '7.5 واط MagSafe' },
            'Ports': { en: '1× USB-C', ar: '1× USB-C' },
            'Compatibility': { en: 'iPhone 13/14/15/16/17 (MagSafe)', ar: 'ايفون 13/14/15/16/17 (MagSafe)' },
            'Weight': { en: '140g', ar: '140 جرام' },
        }
    },
    'anker-521-powerhouse': {
        aiTldr: {
            en: ['256Wh portable power station with 200W AC outlet', 'LiFePO4 battery lasts 3,000+ cycles (10+ years)', '5-year warranty — industry-leading coverage', 'Powers small appliances during outages'],
            ar: ['محطة طاقة محمولة 256Wh بمنفذ 220 فولت 200 واط', 'بطارية LiFePO4 تدوم 3,000+ دورة (10+ سنوات)', 'ضمان 5 سنوات — الأفضل في السوق', 'تشغل الأجهزة الصغيرة أثناء انقطاع الكهرباء']
        },
        localPainPoint: {
            en: 'The solution for Egyptian power cuts — run your router, charge phones, and power a fan for hours. LiFePO4 battery handles Egypt\'s hot climate better than lithium-ion.',
            ar: 'الحل لانقطاع الكهرباء في مصر — شغّل الراوتر واشحن الموبايلات وشغّل المروحة لساعات. بطارية LiFePO4 تتحمل حرارة مصر أفضل من الليثيوم أيون.'
        },
        specifications: {
            'Capacity': { en: '256Wh', ar: '256 واط/ساعة' },
            'AC Output': { en: '200W (pure sine wave)', ar: '200 واط (موجة جيبية نقية)' },
            'Ports': { en: 'AC + USB-C PD + 2×USB-A + Car socket', ar: 'AC + USB-C PD + 2×USB-A + مقبس سيارة' },
            'Battery Type': { en: 'LiFePO4 (3,000+ cycles)', ar: 'LiFePO4 (3,000+ دورة)' },
            'Weight': { en: '3.7 kg', ar: '3.7 كجم' },
        }
    },
    'anker-powercore-10000': {
        aiTldr: {
            en: ['10,000mAh = 2 full iPhone 17 charges', '22.5W USB-C fast charge (0→50% in 30 min)', 'Only 180g — lighter than iPhone 17 Pro', 'Airline-safe at 37Wh capacity'],
            ar: ['10,000 مللي أمبير = شحنتين كاملتين ايفون 17', 'شحن سريع 22.5 واط USB-C (0→50% في 30 دقيقة)', 'وزن 180 جرام فقط — أخف من ايفون 17 برو', 'مسموح على الطائرة بسعة 37Wh']
        },
        localPainPoint: {
            en: 'The everyday carry essential for Egyptian students and commuters — fits in your pocket, charges your phone twice, and survives Cairo\'s long commutes.',
            ar: 'الرفيق اليومي لطلاب الجامعات والموظفين في مصر — يدخل الجيب ويشحن موبايلك مرتين ويتحمل مشاوير القاهرة الطويلة.'
        },
        specifications: {
            'Capacity': { en: '10,000mAh (37Wh)', ar: '10,000 مللي أمبير (37Wh)' },
            'Max Output': { en: '22.5W USB-C', ar: '22.5 واط USB-C' },
            'Ports': { en: '1× USB-C + 1× USB-A', ar: '1× USB-C + 1× USB-A' },
            'Recharge Time': { en: '3-4 hours (20W)', ar: '3-4 ساعات (20 واط)' },
            'Weight': { en: '180g', ar: '180 جرام' },
        }
    },
    'anker-powercore-20000': {
        aiTldr: {
            en: ['20,000mAh = 4 full iPhone 17 charges', 'Dual USB-A ports for simultaneous charging', 'Airline-safe at 72Wh (under 100Wh limit)', '24-month warranty — double industry standard'],
            ar: ['20,000 مللي أمبير = 4 شحنات ايفون 17', 'منفذين USB-A للشحن المتزامن', 'مسموح على الطائرة بسعة 72Wh', 'ضمان 24 شهر — ضعف المعيار']
        },
        localPainPoint: {
            en: 'The traveler\'s best friend in Egypt — charges your whole family\'s phones on road trips to Hurghada or Marsa Alam. Dual ports mean no fighting over who charges first.',
            ar: 'الرفيق الأمثل للسفر في مصر — يشحن موبايلات العيلة كلها في رحلات الغردقة ومرسى علم. منفذين يعني مفيش خناقة مين يشحن الأول.'
        },
        specifications: {
            'Capacity': { en: '20,000mAh (72Wh)', ar: '20,000 مللي أمبير (72Wh)' },
            'Max Output': { en: '2.4A per port (PowerIQ)', ar: '2.4 أمبير لكل منفذ (PowerIQ)' },
            'Ports': { en: '2× USB-A', ar: '2× USB-A' },
            'Recharge Time': { en: '~10 hours (2A)', ar: '~10 ساعات (2 أمبير)' },
            'Weight': { en: '356g', ar: '356 جرام' },
        }
    },
    'anker-powercore-26800': {
        aiTldr: {
            en: ['26,800mAh = max airline-allowed capacity', '3 USB ports charge 3 devices at once', 'iPhone 17 charged ~5 full times', 'Dual-input for faster recharging (6 hours)'],
            ar: ['26,800 مللي أمبير = أكبر سعة مسموحة على الطائرة', '3 منافذ USB لشحن 3 أجهزة معاً', 'يشحن ايفون 17 حوالي 5 مرات', 'مدخلين للشحن الأسرع (6 ساعات)']
        },
        localPainPoint: {
            en: 'The maximum capacity you can fly with — perfect for Egyptian travelers and expats. Charges the whole family during long power outages.',
            ar: 'أكبر سعة مسموحة للطيران — الاختيار المثالي للمسافرين المصريين والمغتربين. يشحن العيلة كلها أثناء انقطاع الكهرباء الطويل.'
        },
        specifications: {
            'Capacity': { en: '26,800mAh (96.48Wh)', ar: '26,800 مللي أمبير (96.48Wh)' },
            'Max Output': { en: '3A (PowerIQ)', ar: '3 أمبير (PowerIQ)' },
            'Ports': { en: '3× USB-A output + 2× Micro-USB input', ar: '3× USB-A خرج + 2× Micro-USB دخل' },
            'Recharge Time': { en: '6 hours (dual input)', ar: '6 ساعات (مدخلين)' },
            'Weight': { en: '495g', ar: '495 جرام' },
        }
    },
    'anker-powerport-20w': {
        aiTldr: { en: ['20W USB-C PD fast charge for iPhone', 'iPhone 0→50% in just 30 minutes', 'Compact foldable plug design', 'Universal compatibility with all USB-C devices'], ar: ['شحن سريع 20 واط USB-C PD للايفون', 'ايفون من 0 لـ 50% في 30 دقيقة', 'تصميم مدمج بفيشة قابلة للطي', 'متوافق مع جميع أجهزة USB-C'] },
        localPainPoint: { en: 'Replace your slow iPhone box charger — this 20W charger is 3× faster and works with Egypt\'s 220V power grid perfectly.', ar: 'استبدل شاحن علبة الايفون البطيء — الشاحن ده أسرع 3 مرات ويعمل مع كهرباء مصر 220 فولت بشكل مثالي.' },
        specifications: { 'Output': { en: '20W USB-C PD', ar: '20 واط USB-C PD' }, 'Input': { en: '100-240V AC', ar: '100-240 فولت AC' }, 'Ports': { en: '1× USB-C', ar: '1× USB-C' }, 'Compatibility': { en: 'iPhone/iPad/Samsung/Pixel', ar: 'ايفون/ايباد/سامسونج/بيكسل' }, 'Weight': { en: '30g', ar: '30 جرام' } }
    },
    'anker-powerport-25w': {
        aiTldr: { en: ['25W Super Fast Charging for Samsung Galaxy', 'Samsung S26 Ultra 0→50% in 22 minutes', 'PPS + PD dual protocol support', 'Works with iPhone and Samsung equally'], ar: ['شحن فائق السرعة 25 واط لسامسونج جالاكسي', 'سامسونج S26 الترا من 0 لـ 50% في 22 دقيقة', 'يدعم بروتوكولي PPS + PD', 'يعمل مع ايفون وسامسونج بنفس الكفاءة'] },
        localPainPoint: { en: 'Samsung stopped including chargers in the box — this 25W charger is exactly what Samsung recommends for S24/S25/S26 in Egypt.', ar: 'سامسونج لغت الشاحن من العلبة — الشاحن ده هو اللي سامسونج بتوصي بيه لموبايلات S24/S25/S26 في مصر.' },
        specifications: { 'Output': { en: '25W USB-C PPS/PD', ar: '25 واط USB-C PPS/PD' }, 'Input': { en: '100-240V AC', ar: '100-240 فولت AC' }, 'Ports': { en: '1× USB-C', ar: '1× USB-C' }, 'Compatibility': { en: 'Samsung Galaxy S/Note/A series + iPhone', ar: 'سامسونج جالاكسي S/Note/A + ايفون' }, 'Weight': { en: '32g', ar: '32 جرام' } }
    },
    'anker-nano-45w': {
        aiTldr: { en: ['45W GaN charger — smallest in its class', 'Charges MacBook Air and iPad Pro', 'GaN III technology = less heat, more efficient', 'Foldable prongs for travel'], ar: ['شاحن 45 واط GaN — الأصغر في فئته', 'يشحن ماك بوك اير وايباد برو', 'تقنية GaN III = حرارة أقل وكفاءة أعلى', 'فيشة قابلة للطي للسفر'] },
        localPainPoint: { en: 'One tiny charger for your laptop and phone — no more carrying multiple chargers. GaN technology stays cool even in Egypt\'s summer heat.', ar: 'شاحن صغير واحد للابتوب والموبايل — مفيش حاجة لأكتر من شاحن. تقنية GaN تبقى باردة حتى في حر الصيف في مصر.' },
        specifications: { 'Output': { en: '45W USB-C PD 3.0', ar: '45 واط USB-C PD 3.0' }, 'Technology': { en: 'GaN III', ar: 'GaN III' }, 'Ports': { en: '1× USB-C', ar: '1× USB-C' }, 'Compatibility': { en: 'MacBook Air/iPad Pro/iPhone/Samsung', ar: 'ماك بوك اير/ايباد برو/ايفون/سامسونج' }, 'Weight': { en: '68g', ar: '68 جرام' } }
    },
    'anker-powerline-usb-c-lightning': {
        aiTldr: { en: ['MFi certified — guaranteed iPhone compatibility', '30,000+ bend tested durability', 'Supports PD fast charging up to 30W', '18-month warranty with instant replacement'], ar: ['شهادة MFi — توافق مضمون مع الايفون', 'متانة مختبرة لأكثر من 30,000 انحناءة', 'يدعم الشحن السريع PD حتى 30 واط', 'ضمان 18 شهر مع استبدال فوري'] },
        localPainPoint: { en: 'Stop buying cheap cables that break every month — this cable lasts 5× longer and won\'t damage your iPhone battery like fake cables do.', ar: 'بطّل تشتري كابلات رخيصة تبوظ كل شهر — الكابل ده يعيش 5 أضعاف ومش هيضر بطارية الايفون زي الكابلات التقليد.' },
        specifications: { 'Length': { en: '1.8m (6ft)', ar: '1.8 متر' }, 'Max Charging': { en: '30W PD', ar: '30 واط PD' }, 'Certification': { en: 'Apple MFi Certified', ar: 'معتمد من Apple MFi' }, 'Durability': { en: '30,000+ bends', ar: '30,000+ انحناءة' }, 'Connector': { en: 'USB-C to Lightning', ar: 'USB-C إلى Lightning' } }
    },
    'anker-powerline-usb-c-usb-c': {
        aiTldr: { en: ['100W PD charging — powers laptops and phones', 'USB 2.0 data transfer at 480Mbps', 'Double-braided nylon for extreme durability', 'Works with MacBook, iPad Pro, Samsung, Pixel'], ar: ['شحن 100 واط PD — يشحن اللابتوب والموبايل', 'نقل بيانات USB 2.0 بسرعة 480Mbps', 'نايلون مزدوج الجدل لمتانة فائقة', 'يعمل مع ماك بوك وايباد برو وسامسونج'] },
        localPainPoint: { en: 'The one cable that charges everything — from your Samsung phone to your MacBook. No more searching through a drawer of different cables.', ar: 'كابل واحد يشحن كل حاجة — من موبايل سامسونج لماك بوك. مفيش تدوير في الدرج على كابلات مختلفة.' },
        specifications: { 'Length': { en: '1.8m (6ft)', ar: '1.8 متر' }, 'Max Charging': { en: '100W PD', ar: '100 واط PD' }, 'Data Speed': { en: '480 Mbps (USB 2.0)', ar: '480 ميجابت/ثانية' }, 'Material': { en: 'Double-braided nylon', ar: 'نايلون مزدوج الجدل' }, 'Connector': { en: 'USB-C to USB-C', ar: 'USB-C إلى USB-C' } }
    },
    'anker-car-charger-dual-usb': {
        aiTldr: { en: ['48W total — charges 2 devices full speed', 'PowerIQ 3.0 auto-detects optimal charging', '12V/24V compatible with all cars in Egypt', 'LED indicator with compact metal design'], ar: ['48 واط إجمالي — يشحن جهازين بالسرعة الكاملة', 'PowerIQ 3.0 يكشف الشحن الأمثل تلقائياً', 'متوافق 12/24 فولت مع كل سيارات مصر', 'مؤشر LED بتصميم معدني مدمج'] },
        localPainPoint: { en: 'Charge your phone and your passenger\'s during Cairo traffic — 48W means both devices charge at full speed even on long rides to work.', ar: 'اشحن موبايلك وموبايل اللي جنبك في زحمة القاهرة — 48 واط يعني الجهازين يشحنوا بالسرعة الكاملة حتى في المشاوير الطويلة.' },
        specifications: { 'Total Output': { en: '48W (24W per port)', ar: '48 واط (24 واط لكل منفذ)' }, 'Ports': { en: '2× USB-A', ar: '2× USB-A' }, 'Input Voltage': { en: '12-24V DC', ar: '12-24 فولت DC' }, 'Technology': { en: 'PowerIQ 3.0', ar: 'PowerIQ 3.0' }, 'Material': { en: 'Aluminum alloy', ar: 'سبيكة ألومنيوم' } }
    },
    'joyroom-power-bank-10000': {
        aiTldr: { en: ['10,000mAh at Egypt\'s best price point', '22.5W fast charge — budget-friendly speed', 'LED display shows exact battery %', 'Slim design with dual USB ports'], ar: ['10,000 مللي أمبير بأفضل سعر في مصر', 'شحن سريع 22.5 واط — سرعة بسعر اقتصادي', 'شاشة LED تعرض نسبة البطارية بالظبط', 'تصميم نحيف بمنفذين USB'] },
        localPainPoint: { en: 'Original quality at half the Anker price — perfect for Egyptian students who need reliable charging without breaking the bank.', ar: 'جودة أصلية بنص سعر انكر — مثالي لطلاب مصر اللي محتاجين شحن موثوق بدون ما يصرفوا كتير.' },
        specifications: { 'Capacity': { en: '10,000mAh', ar: '10,000 مللي أمبير' }, 'Max Output': { en: '22.5W', ar: '22.5 واط' }, 'Ports': { en: '1× USB-C + 1× USB-A', ar: '1× USB-C + 1× USB-A' }, 'Display': { en: 'LED battery indicator', ar: 'شاشة LED للبطارية' }, 'Weight': { en: '210g', ar: '210 جرام' } }
    },
    'joyroom-power-bank-20000': {
        aiTldr: { en: ['20,000mAh — best value power bank in Egypt', '22.5W fast charging with PD support', 'Charges iPhone 17 four full times', 'Triple output for charging 3 devices'], ar: ['20,000 مللي أمبير — أفضل قيمة باور بانك في مصر', 'شحن سريع 22.5 واط مع دعم PD', 'يشحن ايفون 17 أربع مرات كاملة', 'ثلاث منافذ لشحن 3 أجهزة'] },
        localPainPoint: { en: 'The king of value in Egypt — 20,000mAh for under 800 EGP. Perfect backup during power outages to keep the whole family\'s phones alive.', ar: 'ملك القيمة في مصر — 20,000 مللي أمبير بأقل من 800 جنيه. الحل المثالي لانقطاع الكهرباء عشان تبقي موبايلات العيلة شغالة.' },
        specifications: { 'Capacity': { en: '20,000mAh', ar: '20,000 مللي أمبير' }, 'Max Output': { en: '22.5W PD', ar: '22.5 واط PD' }, 'Ports': { en: '1× USB-C + 2× USB-A', ar: '1× USB-C + 2× USB-A' }, 'Display': { en: 'Digital LED display', ar: 'شاشة LED رقمية' }, 'Weight': { en: '420g', ar: '420 جرام' } }
    },
    'joyroom-t03s-pro-earbuds': {
        aiTldr: { en: ['Egypt\'s #1 best-selling wireless earbuds', '6-hour playtime + 24h with case', 'Touch controls with voice assistant support', 'IPX5 sweat-proof for workouts'], ar: ['السماعة الأكثر مبيعاً في مصر', 'تشغيل 6 ساعات + 24 ساعة مع العلبة', 'تحكم باللمس مع دعم المساعد الصوتي', 'مقاومة العرق IPX5 للتمارين'] },
        localPainPoint: { en: 'The earbuds that every Egyptian university student and gym-goer is wearing — premium sound quality at a price that makes sense for Egypt.', ar: 'السماعة اللي كل طالب جامعة وكل واحد بيروح الجيم في مصر لابسها — جودة صوت ممتازة بسعر معقول لمصر.' },
        specifications: { 'Driver': { en: '13mm dynamic driver', ar: 'سماعة ديناميكية 13mm' }, 'Battery Life': { en: '6h + 24h (case)', ar: '6 ساعات + 24 ساعة (العلبة)' }, 'Connectivity': { en: 'Bluetooth 5.3', ar: 'بلوتوث 5.3' }, 'Water Resistance': { en: 'IPX5', ar: 'IPX5' }, 'Weight': { en: '4.5g per earbud', ar: '4.5 جرام للسماعة' } }
    },
    'joyroom-jr-t03-wireless-earbuds': {
        aiTldr: { en: ['Classic T03 sound trusted by millions', 'Ultra-lightweight at 4g per earbud', 'Low-latency gaming mode', 'USB-C fast charging case'], ar: ['صوت T03 الكلاسيكي الموثوق من الملايين', 'خفيفة جداً 4 جرام للسماعة', 'وضع ألعاب بتأخير منخفض', 'شحن سريع USB-C للعلبة'] },
        localPainPoint: { en: 'The original T03 that started the Joyroom craze in Egypt — still the best budget earbuds you can find in any Egyptian electronics store.', ar: 'الـ T03 الأصلية اللي بدأت موضة جوي روم في مصر — لسه أفضل سماعة اقتصادية تلاقيها في أي محل الكترونيات.' },
        specifications: { 'Driver': { en: '13mm dynamic driver', ar: 'سماعة ديناميكية 13mm' }, 'Battery Life': { en: '5h + 20h (case)', ar: '5 ساعات + 20 ساعة (العلبة)' }, 'Connectivity': { en: 'Bluetooth 5.1', ar: 'بلوتوث 5.1' }, 'Water Resistance': { en: 'IPX4', ar: 'IPX4' }, 'Weight': { en: '4g per earbud', ar: '4 جرام للسماعة' } }
    },
    'joyroom-20w-usb-c-charger': {
        aiTldr: { en: ['20W PD fast charging at best price', 'iPhone 0→50% in 30 minutes', 'Compact design smaller than Apple\'s charger', 'CE/FCC certified safe charging'], ar: ['شحن سريع 20 واط PD بأفضل سعر', 'ايفون من 0 لـ 50% في 30 دقيقة', 'تصميم مدمج أصغر من شاحن ابل', 'شحن آمن بشهادة CE/FCC'] },
        localPainPoint: { en: 'Original fast charger for less than 200 EGP — why risk your iPhone with a 50 EGP fake charger from the street?', ar: 'شاحن سريع أصلي بأقل من 200 جنيه — ليه تخاطر بالايفون بشاحن تقليد بـ 50 جنيه من على الرصيف؟' },
        specifications: { 'Output': { en: '20W USB-C PD', ar: '20 واط USB-C PD' }, 'Input': { en: '100-240V AC', ar: '100-240 فولت AC' }, 'Ports': { en: '1× USB-C', ar: '1× USB-C' }, 'Safety': { en: 'CE/FCC/RoHS certified', ar: 'شهادة CE/FCC/RoHS' }, 'Weight': { en: '28g', ar: '28 جرام' } }
    },
    'joyroom-usb-c-lightning-cable': {
        aiTldr: { en: ['30W PD fast charging for iPhone', 'Braided nylon with 20,000+ bend life', 'Apple MFi equivalent quality', '12-month warranty with free replacement'], ar: ['شحن سريع 30 واط PD للايفون', 'نايلون مجدول يتحمل 20,000+ انحناءة', 'جودة معادلة لشهادة Apple MFi', 'ضمان 12 شهر مع استبدال مجاني'] },
        localPainPoint: { en: 'A reliable iPhone cable that won\'t fray after 2 weeks like the cheap ones from Bab El Khalq — braided nylon lasts 10× longer.', ar: 'كابل ايفون موثوق مش هيتقطع بعد أسبوعين زي الرخيص بتاع باب الخلق — النايلون المجدول يعيش 10 أضعاف.' },
        specifications: { 'Length': { en: '1.2m', ar: '1.2 متر' }, 'Max Charging': { en: '30W PD', ar: '30 واط PD' }, 'Material': { en: 'Braided nylon', ar: 'نايلون مجدول' }, 'Durability': { en: '20,000+ bends', ar: '20,000+ انحناءة' }, 'Connector': { en: 'USB-C to Lightning', ar: 'USB-C إلى Lightning' } }
    },
    'anker-soundcore-life-p2i': {
        aiTldr: { en: ['Bass-boosted 10mm drivers for deep sound', '28-hour total playtime with case', 'IPX5 waterproof for gym and rain', '2 EQ modes: Normal & Bass Up'], ar: ['سماعات 10mm معززة الباس لصوت عميق', '28 ساعة تشغيل إجمالي مع العلبة', 'مقاومة الماء IPX5 للجيم والمطر', 'وضعين صوت: عادي وباس معزز'] },
        localPainPoint: { en: 'Anker audio quality at an Egyptian-friendly price — the perfect upgrade from cheap earbuds without paying AirPods prices.', ar: 'جودة صوت انكر بسعر مناسب لمصر — الترقية المثالية من السماعات الرخيصة بدون ما تدفع سعر اير بودز.' },
        specifications: { 'Driver': { en: '10mm dynamic driver', ar: 'سماعة ديناميكية 10mm' }, 'Battery Life': { en: '7h + 21h (case)', ar: '7 ساعات + 21 ساعة (العلبة)' }, 'Connectivity': { en: 'Bluetooth 5.2', ar: 'بلوتوث 5.2' }, 'Water Resistance': { en: 'IPX5', ar: 'IPX5' }, 'Weight': { en: '5g per earbud', ar: '5 جرام للسماعة' } }
    },
    'joyroom-ft3-smartwatch': {
        aiTldr: { en: ['1.85" HD display with 240+ watch faces', 'Heart rate + SpO2 + sleep tracking', 'IP68 waterproof — swim safe', '7-day battery life on single charge'], ar: ['شاشة HD 1.85 بوصة مع 240+ واجهة ساعة', 'مراقبة نبض القلب + أكسجين الدم + النوم', 'مقاومة الماء IP68 — آمنة للسباحة', 'بطارية 7 أيام بشحنة واحدة'] },
        localPainPoint: { en: 'A smartwatch with Apple Watch features at 1/10th the price — tracks your health during fasting in Ramadan and your fitness goals year-round.', ar: 'ساعة ذكية بمميزات ابل ووتش بعُشر السعر — تتابع صحتك أثناء صيام رمضان وأهدافك الرياضية طول السنة.' },
        specifications: { 'Display': { en: '1.85" HD IPS', ar: '1.85 بوصة HD IPS' }, 'Battery Life': { en: '7 days', ar: '7 أيام' }, 'Water Resistance': { en: 'IP68', ar: 'IP68' }, 'Sensors': { en: 'Heart rate + SpO2 + Accelerometer', ar: 'نبض القلب + أكسجين الدم + مقياس تسارع' }, 'Connectivity': { en: 'Bluetooth 5.2', ar: 'بلوتوث 5.2' } }
    },
    'joyroom-car-mount-zs290': {
        aiTldr: { en: ['360° rotation with one-hand operation', 'Fits phones from 4.7" to 7"', 'Universal dashboard and air vent mount', 'Anti-shake design for bumpy roads'], ar: ['دوران 360 درجة بتشغيل يد واحدة', 'يناسب الموبايلات من 4.7 لـ 7 بوصة', 'تثبيت على التابلوه أو فتحة التكييف', 'تصميم مضاد للاهتزاز للطرق الوعرة'] },
        localPainPoint: { en: 'Built for Egyptian roads — the anti-shake design keeps your phone stable on Cairo\'s bumpy streets and speed bumps.', ar: 'مصمم لطرق مصر — تصميم مضاد للاهتزاز يثبت الموبايل على شوارع القاهرة الوعرة والمطبات.' },
        specifications: { 'Compatibility': { en: '4.7"-7" phones', ar: 'موبايلات 4.7-7 بوصة' }, 'Mount Type': { en: 'Dashboard + Air vent', ar: 'تابلوه + فتحة تكييف' }, 'Rotation': { en: '360°', ar: '360 درجة' }, 'Material': { en: 'ABS + Silicone grip', ar: 'ABS + قبضة سيليكون' }, 'Weight': { en: '85g', ar: '85 جرام' } }
    },
    'joyroom-25w-fast-charger': {
        aiTldr: { en: ['25W PPS for Samsung Super Fast Charging', 'Also charges iPhone at 20W PD', 'Ultra-compact travel-friendly design', 'Multi-layer safety protection'], ar: ['25 واط PPS للشحن الفائق من سامسونج', 'يشحن ايفون أيضاً بـ 20 واط PD', 'تصميم مدمج مناسب للسفر', 'حماية متعددة الطبقات'] },
        localPainPoint: { en: 'One charger for both iPhone and Samsung owners in your family — 25W covers everyone at an unbeatable Egyptian price.', ar: 'شاحن واحد لأصحاب ايفون وسامسونج في العيلة — 25 واط يغطي الكل بسعر لا يُقاوم.' },
        specifications: { 'Output': { en: '25W USB-C PPS/PD', ar: '25 واط USB-C PPS/PD' }, 'Input': { en: '100-240V AC', ar: '100-240 فولت AC' }, 'Ports': { en: '1× USB-C', ar: '1× USB-C' }, 'Safety': { en: 'Over-voltage/current/heat protection', ar: 'حماية من الفولت/التيار/الحرارة الزائدة' }, 'Weight': { en: '30g', ar: '30 جرام' } }
    },
    'joyroom-30w-fast-charger': {
        aiTldr: { en: ['30W GaN — charges iPhone and iPad simultaneously', 'Dual port: USB-C + USB-A', 'GaN technology = cooler charging', 'Compact size despite dual ports'], ar: ['30 واط GaN — يشحن ايفون وايباد معاً', 'منفذين: USB-C + USB-A', 'تقنية GaN = شحن أبرد', 'حجم مدمج رغم المنفذين'] },
        localPainPoint: { en: 'Charge your phone AND your earbuds case from one wall socket — essential when outlets are limited in Egyptian hotel rooms.', ar: 'اشحن الموبايل وعلبة السماعات من بريزة واحدة — ضروري لما الأفياش تبقي محدودة في غرف الفنادق المصرية.' },
        specifications: { 'Output': { en: '30W total (USB-C + USB-A)', ar: '30 واط إجمالي (USB-C + USB-A)' }, 'Technology': { en: 'GaN', ar: 'GaN' }, 'Ports': { en: '1× USB-C + 1× USB-A', ar: '1× USB-C + 1× USB-A' }, 'Input': { en: '100-240V AC', ar: '100-240 فولت AC' }, 'Weight': { en: '45g', ar: '45 جرام' } }
    },
    'joyroom-magnetic-power-bank-10000': {
        aiTldr: { en: ['10,000mAh with MagSafe magnetic attachment', '15W wireless + 20W USB-C wired', 'Built-in kickstand for video calls', 'LED battery percentage display'], ar: ['10,000 مللي أمبير مع تثبيت مغناطيسي MagSafe', '15 واط لاسلكي + 20 واط USB-C سلكي', 'حامل مدمج لمكالمات الفيديو', 'شاشة LED لنسبة البطارية'] },
        localPainPoint: { en: 'Snap it on your iPhone and forget about cables — keep scrolling social media during Cairo metro commutes with hands-free charging.', ar: 'ثبته على ايفونك وانسى الكابلات — كمّل تصفح السوشيال ميديا في مترو القاهرة بشحن بدون ايدين.' },
        specifications: { 'Capacity': { en: '10,000mAh', ar: '10,000 مللي أمبير' }, 'Wireless Output': { en: '15W MagSafe', ar: '15 واط MagSafe' }, 'Wired Output': { en: '20W USB-C PD', ar: '20 واط USB-C PD' }, 'Display': { en: 'LED battery %', ar: 'شاشة LED نسبة البطارية' }, 'Weight': { en: '230g', ar: '230 جرام' } }
    },
    'joyroom-60w-car-charger': {
        aiTldr: { en: ['60W dual USB-C — charges 2 phones at max speed', 'PD 3.0 + QC 4.0 dual protocol', 'Aluminum body for heat dissipation', 'LED power indicator ring'], ar: ['60 واط USB-C مزدوج — يشحن موبايلين بأقصى سرعة', 'بروتوكول PD 3.0 + QC 4.0 مزدوج', 'جسم ألومنيوم لتبديد الحرارة', 'حلقة مؤشر LED للطاقة'] },
        localPainPoint: { en: 'The only car charger you need in Egypt\'s traffic — charges driver and passenger at full speed. Aluminum body handles summer heat better.', ar: 'شاحن السيارة الوحيد اللي محتاجه في زحمة مصر — يشحن السواق والراكب بأقصى سرعة. جسم الألومنيوم يتحمل حرارة الصيف أحسن.' },
        specifications: { 'Total Output': { en: '60W (30W + 30W)', ar: '60 واط (30 + 30)' }, 'Ports': { en: '2× USB-C PD', ar: '2× USB-C PD' }, 'Input Voltage': { en: '12-24V DC', ar: '12-24 فولت DC' }, 'Material': { en: 'Aluminum alloy', ar: 'سبيكة ألومنيوم' }, 'Weight': { en: '32g', ar: '32 جرام' } }
    },
    'joyroom-3-in-1-wireless-charging-station': {
        aiTldr: { en: ['Charges iPhone + AirPods + Apple Watch simultaneously', '15W fast wireless for iPhone', 'Foldable travel-friendly design', 'Qi2 compatible for future devices'], ar: ['يشحن ايفون + اير بودز + ابل ووتش معاً', 'شحن لاسلكي سريع 15 واط للايفون', 'تصميم قابل للطي مناسب للسفر', 'متوافق مع Qi2 للأجهزة المستقبلية'] },
        localPainPoint: { en: 'One station replaces 3 chargers on your nightstand — declutter your bedroom and charge your entire Apple ecosystem overnight.', ar: 'محطة واحدة تغني عن 3 شواحن على الكومودينو — رتب أوضتك واشحن كل أجهزة ابل بتاعتك بالليل.' },
        specifications: { 'iPhone Output': { en: '15W wireless', ar: '15 واط لاسلكي' }, 'AirPods Output': { en: '5W wireless', ar: '5 واط لاسلكي' }, 'Watch Output': { en: '3W magnetic', ar: '3 واط مغناطيسي' }, 'Input': { en: '30W USB-C', ar: '30 واط USB-C' }, 'Compatibility': { en: 'Qi2 / MagSafe', ar: 'Qi2 / MagSafe' } }
    },
    'anker-usb-c-lightning-sureistrong': {
        aiTldr: { en: ['240cm extra-long for couch charging', 'Apple MFi certified for guaranteed compatibility', 'Reinforced stress points with SureIStrong tech', '30W PD fast charging support'], ar: ['240 سم طول إضافي للشحن من الكنبة', 'شهادة Apple MFi لتوافق مضمون', 'نقاط تقوية بتقنية SureIStrong', 'يدعم الشحن السريع 30 واط PD'] },
        localPainPoint: { en: 'Finally a cable long enough to reach from your Egyptian wall outlet to your bed — 2.4m means no more stretching.', ar: 'أخيراً كابل طويل يوصل من البريزة لسريرك — 2.4 متر يعني مفيش تمديد تاني.' },
        specifications: { 'Length': { en: '2.4m (8ft)', ar: '2.4 متر' }, 'Max Charging': { en: '30W PD', ar: '30 واط PD' }, 'Certification': { en: 'Apple MFi', ar: 'Apple MFi' }, 'Durability': { en: 'SureIStrong reinforced', ar: 'تقوية SureIStrong' }, 'Connector': { en: 'USB-C to Lightning', ar: 'USB-C إلى Lightning' } }
    },
    'joyroom-3-in-1-data-cable': {
        aiTldr: { en: ['Lightning + USB-C + Micro-USB in one cable', 'Charges any phone regardless of brand', 'Braided nylon for daily durability', '15W universal charging support'], ar: ['Lightning + USB-C + Micro-USB في كابل واحد', 'يشحن أي موبايل بغض النظر عن الماركة', 'نايلون مجدول للاستخدام اليومي', 'يدعم شحن 15 واط عام'] },
        localPainPoint: { en: 'One cable for the whole Egyptian family — iPhone, Samsung, and Huawei all charge from the same cable. No more cable drawer chaos.', ar: 'كابل واحد للعيلة كلها — ايفون وسامسونج وهواوي كلهم يشحنوا من كابل واحد. مفيش فوضى كابلات تاني.' },
        specifications: { 'Connectors': { en: 'Lightning + USB-C + Micro-USB', ar: 'Lightning + USB-C + Micro-USB' }, 'Length': { en: '1.2m', ar: '1.2 متر' }, 'Max Charging': { en: '15W', ar: '15 واط' }, 'Material': { en: 'Braided nylon', ar: 'نايلون مجدول' }, 'Data Transfer': { en: '480 Mbps', ar: '480 ميجابت/ثانية' } }
    },
    'joyroom-30w-pd-cable': {
        aiTldr: { en: ['30W PD fast charging for iPhone 15/16/17', 'USB-C to USB-C for universal compatibility', 'Braided nylon with reinforced connectors', '1.2m optimal length'], ar: ['شحن سريع 30 واط PD للايفون 15/16/17', 'USB-C إلى USB-C لتوافق شامل', 'نايلون مجدول بموصلات مقواة', 'طول 1.2 متر مثالي'] },
        localPainPoint: { en: 'The perfect cable for the new all-USB-C iPhones — fast charging at a fraction of Apple cable price.', ar: 'الكابل المثالي لموبايلات الايفون الجديدة USB-C — شحن سريع بجزء بسيط من سعر كابل ابل.' },
        specifications: { 'Length': { en: '1.2m', ar: '1.2 متر' }, 'Max Charging': { en: '30W PD', ar: '30 واط PD' }, 'Material': { en: 'Braided nylon', ar: 'نايلون مجدول' }, 'Data Speed': { en: '480 Mbps', ar: '480 ميجابت/ثانية' }, 'Connector': { en: 'USB-C to USB-C', ar: 'USB-C إلى USB-C' } }
    },
    'joyroom-type-c-lightning-24mos': {
        aiTldr: { en: ['24-month warranty — double the standard', '27W PD fast charging for iPhone', 'Ultra-durable reinforced connectors', 'Data + charge dual function'], ar: ['ضمان 24 شهر — ضعف المعيار', 'شحن سريع 27 واط PD للايفون', 'موصلات مقواة فائقة المتانة', 'شحن + نقل بيانات'] },
        localPainPoint: { en: '2-year warranty means this is the last iPhone cable you buy for a long time — saves you money vs replacing cheap cables every month.', ar: 'ضمان سنتين يعني ده آخر كابل ايفون هتشتريه لفترة طويلة — يوفرلك فلوس بدل ما تغير كابلات رخيصة كل شهر.' },
        specifications: { 'Length': { en: '1.2m', ar: '1.2 متر' }, 'Max Charging': { en: '27W PD', ar: '27 واط PD' }, 'Warranty': { en: '24 months', ar: '24 شهر' }, 'Connector': { en: 'USB-C to Lightning', ar: 'USB-C إلى Lightning' }, 'Material': { en: 'TPE reinforced', ar: 'TPE مقوى' } }
    },
    'joyroom-type-c-lightning-36mos': {
        aiTldr: { en: ['36-month warranty — the longest in Egypt', '27W PD fast charging', 'Premium build quality guaranteed for 3 years', 'Zero-hassle replacement policy'], ar: ['ضمان 36 شهر — الأطول في مصر', 'شحن سريع 27 واط PD', 'جودة تصنيع مضمونة 3 سنوات', 'سياسة استبدال بدون تعقيد'] },
        localPainPoint: { en: '3-year warranty on a cable — we literally guarantee this cable outlasts your iPhone. That\'s Egyptian value.', ar: 'ضمان 3 سنوات على كابل — نضمنلك بشكل حرفي إن الكابل ده يعيش أكتر من الايفون نفسه. دي قيمة حقيقية.' },
        specifications: { 'Length': { en: '1.2m', ar: '1.2 متر' }, 'Max Charging': { en: '27W PD', ar: '27 واط PD' }, 'Warranty': { en: '36 months', ar: '36 شهر' }, 'Connector': { en: 'USB-C to Lightning', ar: 'USB-C إلى Lightning' }, 'Material': { en: 'Premium TPE', ar: 'TPE فاخر' } }
    },
    'joyroom-type-c-lightning-braided': {
        aiTldr: { en: ['Double-braided nylon — premium look and feel', '27W PD fast charging for iPhone', 'Tangle-free flat cable design', 'Reinforced aluminum connectors'], ar: ['نايلون مزدوج الجدل — مظهر وملمس فاخر', 'شحن سريع 27 واط PD للايفون', 'تصميم مسطح لا يتشابك', 'موصلات ألومنيوم مقواة'] },
        localPainPoint: { en: 'The premium cable that matches your iPhone aesthetics — braided nylon looks as good as it performs.', ar: 'الكابل الفاخر اللي يليق بالايفون بتاعك — نايلون مجدول شكله حلو زي أداؤه.' },
        specifications: { 'Length': { en: '1.2m', ar: '1.2 متر' }, 'Max Charging': { en: '27W PD', ar: '27 واط PD' }, 'Material': { en: 'Double-braided nylon + aluminum', ar: 'نايلون مزدوج + ألومنيوم' }, 'Connector': { en: 'USB-C to Lightning', ar: 'USB-C إلى Lightning' }, 'Durability': { en: '25,000+ bends', ar: '25,000+ انحناءة' } }
    },
    'joyroom-type-c-to-type-c-cable': {
        aiTldr: { en: ['60W PD for phone + small laptop charging', 'USB 2.0 data transfer at 480Mbps', 'Braided nylon for maximum durability', 'Universal USB-C to USB-C'], ar: ['60 واط PD لشحن الموبايل + اللابتوب الصغير', 'نقل بيانات USB 2.0 بسرعة 480Mbps', 'نايلون مجدول لأقصى متانة', 'USB-C إلى USB-C عالمي'] },
        localPainPoint: { en: 'One cable for Samsung, iPad Pro, MacBook Air, and the new iPhone 15/16/17 — the future of charging is all USB-C.', ar: 'كابل واحد لسامسونج وايباد برو وماك بوك اير والايفون الجديد — مستقبل الشحن كله USB-C.' },
        specifications: { 'Length': { en: '1.2m', ar: '1.2 متر' }, 'Max Charging': { en: '60W PD', ar: '60 واط PD' }, 'Data Speed': { en: '480 Mbps', ar: '480 ميجابت/ثانية' }, 'Material': { en: 'Braided nylon', ar: 'نايلون مجدول' }, 'Connector': { en: 'USB-C to USB-C', ar: 'USB-C إلى USB-C' } }
    },
    'joyroom-usb-a-lightning-1.2m': {
        aiTldr: { en: ['Classic USB-A to Lightning for older chargers', '2.4A fast charging speed', '1.2m perfect everyday length', 'Compatible with all USB-A chargers and PCs'], ar: ['كلاسيكي USB-A إلى Lightning للشواحن القديمة', 'سرعة شحن 2.4 أمبير', '1.2 متر طول مثالي للاستخدام اليومي', 'متوافق مع كل شواحن USB-A والكمبيوتر'] },
        localPainPoint: { en: 'Still using the old USB-A charger? This cable works perfectly with your existing charger — no need to buy new everything.', ar: 'لسه بتستخدم الشاحن القديم USB-A؟ الكابل ده يعمل مع شاحنك الحالي بدون ما تشتري حاجة جديدة.' },
        specifications: { 'Length': { en: '1.2m', ar: '1.2 متر' }, 'Max Charging': { en: '2.4A (12W)', ar: '2.4 أمبير (12 واط)' }, 'Material': { en: 'TPE', ar: 'TPE' }, 'Connector': { en: 'USB-A to Lightning', ar: 'USB-A إلى Lightning' }, 'Compatibility': { en: 'All iPhone/iPad', ar: 'كل ايفون/ايباد' } }
    },
    'joyroom-usb-a-lightning-cable': {
        aiTldr: { en: ['Standard USB-A to Lightning cable', '2.4A max charging speed', 'Durable TPE material construction', '1m compact length'], ar: ['كابل USB-A إلى Lightning قياسي', 'سرعة شحن 2.4 أمبير', 'مصنوع من مادة TPE متينة', 'طول 1 متر مدمج'] },
        localPainPoint: { en: 'The reliable everyday iPhone cable at an unbeatable price — perfect as a backup or for the office.', ar: 'كابل الايفون اليومي الموثوق بسعر لا يُقاوم — مثالي كبديل احتياطي أو للمكتب.' },
        specifications: { 'Length': { en: '1m', ar: '1 متر' }, 'Max Charging': { en: '2.4A (12W)', ar: '2.4 أمبير (12 واط)' }, 'Material': { en: 'TPE', ar: 'TPE' }, 'Connector': { en: 'USB-A to Lightning', ar: 'USB-A إلى Lightning' }, 'Warranty': { en: '12 months', ar: '12 شهر' } }
    },
    'joyroom-usb-a-micro-cable': {
        aiTldr: { en: ['Micro-USB for older Samsung/Xiaomi/Oppo', '2.4A fast charging support', 'Reinforced connector prevents wobble', 'Budget-friendly essential'], ar: ['Micro-USB لسامسونج/شاومي/اوبو القديمة', 'يدعم شحن سريع 2.4 أمبير', 'موصل مقوى يمنع الاهتزاز', 'أساسي بسعر اقتصادي'] },
        localPainPoint: { en: 'Still have a Micro-USB phone? Many Egyptians do. This cable keeps your older device charging fast and reliably.', ar: 'لسه معاك موبايل Micro-USB؟ كتير من المصريين كده. الكابل ده يبقي موبايلك القديم بيشحن بسرعة وبشكل موثوق.' },
        specifications: { 'Length': { en: '1m', ar: '1 متر' }, 'Max Charging': { en: '2.4A (12W)', ar: '2.4 أمبير (12 واط)' }, 'Material': { en: 'TPE', ar: 'TPE' }, 'Connector': { en: 'USB-A to Micro-USB', ar: 'USB-A إلى Micro-USB' }, 'Compatibility': { en: 'Samsung/Xiaomi/Oppo/Huawei', ar: 'سامسونج/شاومي/اوبو/هواوي' } }
    },
    'joyroom-usb-a-type-c-1.2m': {
        aiTldr: { en: ['USB-A to USB-C for Samsung/Pixel/Xiaomi', '3A fast charging (18W)', '1.2m comfortable length', 'Works with older USB-A chargers'], ar: ['USB-A إلى USB-C لسامسونج/بيكسل/شاومي', 'شحن سريع 3 أمبير (18 واط)', 'طول 1.2 متر مريح', 'يعمل مع شواحن USB-A القديمة'] },
        localPainPoint: { en: 'Use your existing USB-A charger with your new Samsung — no need to buy a new charger just because you upgraded your phone.', ar: 'استخدم شاحنك القديم USB-A مع سامسونج الجديد — مش محتاج تشتري شاحن جديد عشان غيرت الموبايل.' },
        specifications: { 'Length': { en: '1.2m', ar: '1.2 متر' }, 'Max Charging': { en: '3A (18W)', ar: '3 أمبير (18 واط)' }, 'Material': { en: 'Braided nylon', ar: 'نايلون مجدول' }, 'Connector': { en: 'USB-A to USB-C', ar: 'USB-A إلى USB-C' }, 'Data Speed': { en: '480 Mbps', ar: '480 ميجابت/ثانية' } }
    },
    'joyroom-usb-a-type-c-cable': {
        aiTldr: { en: ['Standard USB-A to USB-C cable', '3A fast charging for Samsung devices', 'Compact 1m length for desk use', 'Budget-friendly quality'], ar: ['كابل USB-A إلى USB-C قياسي', 'شحن سريع 3 أمبير لأجهزة سامسونج', 'طول 1 متر مدمج للمكتب', 'جودة بسعر اقتصادي'] },
        localPainPoint: { en: 'The cable every Samsung user in Egypt needs as a backup — cheap enough to keep one at home, work, and in the car.', ar: 'الكابل اللي كل مستخدم سامسونج في مصر محتاجه كاحتياطي — رخيص بما يكفي إنك تخلي واحد في البيت والشغل والعربية.' },
        specifications: { 'Length': { en: '1m', ar: '1 متر' }, 'Max Charging': { en: '3A (18W)', ar: '3 أمبير (18 واط)' }, 'Material': { en: 'TPE', ar: 'TPE' }, 'Connector': { en: 'USB-A to USB-C', ar: 'USB-A إلى USB-C' }, 'Warranty': { en: '12 months', ar: '12 شهر' } }
    },
    'joyroom-usb-c-cable-60w': {
        aiTldr: { en: ['60W PD charging for laptops and tablets', 'Premium braided nylon build', 'USB-C to USB-C universal standard', 'E-marker chip for safe high power'], ar: ['شحن 60 واط PD للابتوبات والتابلتات', 'تصنيع نايلون مجدول فاخر', 'USB-C إلى USB-C معيار عالمي', 'شريحة E-marker للطاقة العالية الآمنة'] },
        localPainPoint: { en: 'Charge your iPad Pro AND your Samsung from the same cable — 60W means even small laptops charge at full speed.', ar: 'اشحن ايباد برو وسامسونج من نفس الكابل — 60 واط يعني حتى اللابتوبات الصغيرة تشحن بأقصى سرعة.' },
        specifications: { 'Length': { en: '1.2m', ar: '1.2 متر' }, 'Max Charging': { en: '60W PD', ar: '60 واط PD' }, 'Material': { en: 'Braided nylon', ar: 'نايلون مجدول' }, 'Connector': { en: 'USB-C to USB-C', ar: 'USB-C إلى USB-C' }, 'Data Speed': { en: '480 Mbps', ar: '480 ميجابت/ثانية' } }
    },
    'joyroom-car-phone-mount': {
        aiTldr: { en: ['Strong suction cup holds on any dashboard', 'One-touch release mechanism', 'Fits all phones 4.7" to 7" with cases', 'Multi-angle adjustable arm'], ar: ['كوب شفط قوي يثبت على أي تابلوه', 'آلية تحرير بلمسة واحدة', 'يناسب كل الموبايلات 4.7-7 بوصة بالجراب', 'ذراع متعدد الزوايا'] },
        localPainPoint: { en: 'Suction cup that actually sticks in Egypt\'s summer heat — tested for dashboards that get hot in direct sunlight.', ar: 'كوب شفط يثبت فعلاً في حر الصيف في مصر — مختبر على التابلوهات اللي بتسخن في الشمس المباشرة.' },
        specifications: { 'Compatibility': { en: '4.7"-7" phones with case', ar: 'موبايلات 4.7-7 بوصة بالجراب' }, 'Mount Type': { en: 'Suction cup + vent clip', ar: 'كوب شفط + كليب فتحة تكييف' }, 'Rotation': { en: '360° + tilt', ar: '360 درجة + إمالة' }, 'Material': { en: 'ABS + Silicone', ar: 'ABS + سيليكون' }, 'Weight': { en: '120g', ar: '120 جرام' } }
    },
};

export function getProductSEO(slug: string): ProductSEOEnhancement | undefined {
    return enhancements[slug];
}
