import type { CategoryContent } from '../_types';

export const anker_power_banks_content: CategoryContent = {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Power Banks',
            // PowerBank content data
            powerBankData: {
                title: {
                    en: 'Anker PowerCore: Capacities and Outputs for Different Devices',
                    ar: 'انكر PowerCore: سعات وقدرات تناسب استخدامات مختلفة'
                },
                tagline: {
                    en: 'Power for Life',
                    ar: 'طاقة للحياة'
                },
                history: {
                    en: 'Anker offers portable charging lines including compact Nano models, PowerCore daily-use capacities, and higher-output Prime models for compatible laptops. Capacity, cell specification, ports, output distribution, and CairoVolt warranty terms vary by product, so use the individual product page as the source for the model you are comparing.',
                    ar: 'تقدم انكر خطوط شحن متنقلة تشمل موديلات Nano المدمجة وسعات PowerCore للاستخدام اليومي وموديلات Prime بخرج أعلى لبعض اللابتوبات المتوافقة. تختلف السعة ومواصفات الخلايا والمنافذ وتوزيع القدرة وضمان كايرو فولت حسب المنتج؛ لذلك تُعد صفحة المنتج مرجع الموديل الذي تقارنه.'
                },
                achievements: [
                    { icon: 'battery', stat: { en: '5K–60K', ar: '5K–60K' }, label: { en: 'Capacity range by model', ar: 'نطاق السعة حسب الموديل' } },
                    { icon: 'star', stat: { en: 'USB-C', ar: 'USB-C' }, label: { en: 'On supported models', ar: 'في الموديلات الداعمة' } },
                    { icon: 'trophy', stat: { en: 'PD', ar: 'PD' }, label: { en: 'Fast charging by model', ar: 'شحن سريع حسب الموديل' } },
                    { icon: 'shield', stat: { en: 'Listed', ar: 'موضح' }, label: { en: 'Warranty per product', ar: 'ضمان كل منتج' } },
                    { icon: 'bolt', stat: { en: 'Varies', ar: 'متغير' }, label: { en: 'Output by model', ar: 'القدرة حسب الموديل' } },
                    { icon: 'globe', stat: { en: '2011', ar: '2011' }, label: { en: 'Year Founded', ar: 'سنة التأسيس' } }
                ],
                technologies: [
                    { name: 'PowerIQ', icon: 'brain', description: { en: 'On listed models, PowerIQ helps negotiate a compatible charging output. The delivered power still depends on the device, port, cable, battery state, and model specification.', ar: 'في الموديلات المدرج بها PowerIQ، تساعد التقنية على التفاوض على خرج شحن متوافق. تظل القدرة الفعلية مرتبطة بالجهاز والمنفذ والكابل وحالة البطارية ومواصفات الموديل.' } },
                    { name: 'GaN (Gallium Nitride)', icon: 'bolt', description: { en: 'Selected charging products use GaN components to support compact, higher-output designs. Size, temperature, and efficiency comparisons must be checked on the individual model page.', ar: 'تستخدم منتجات شحن مختارة مكونات GaN لدعم تصميمات مدمجة بقدرة أعلى. يجب مراجعة الحجم والحرارة والكفاءة في صفحة الموديل نفسه.' } },
                    { name: 'MultiProtect', icon: 'shield', description: { en: 'Listed models may include protections for conditions such as over-current, over-voltage, short circuit, or temperature. The included functions vary by model and do not replace correct use.', ar: 'قد تتضمن الموديلات المدرج بها MultiProtect وسائل حماية من حالات مثل زيادة التيار أو الجهد أو القصر أو الحرارة. تختلف الوظائف حسب الموديل ولا تغني عن الاستخدام الصحيح.' } },
                    { name: 'ActiveShield', icon: 'thermometer', description: { en: 'On supported models, ActiveShield monitors temperature and can adjust output according to the product design. Check the exact version and manufacturer-stated behavior on the product page.', ar: 'في الموديلات الداعمة، تراقب ActiveShield الحرارة ويمكنها ضبط الخرج وفق تصميم المنتج. راجع الإصدار والسلوك المعلن من الشركة في صفحة المنتج.' } },
                    { name: 'Battery Cells', icon: 'battery', description: { en: 'Cell chemistry, rated capacity, cycle information, and expected aging vary by product and conditions. Use the product specification rather than assuming one cell grade across the range.', ar: 'تختلف كيمياء الخلايا والسعة المقننة ومعلومات الدورات والعمر المتوقع حسب المنتج وظروف الاستخدام. راجع مواصفات المنتج بدلاً من افتراض نوع خلايا واحد لكل السلسلة.' } }
                ],
                useCases: [
                    { icon: 'suitcase', title: { en: 'Travel & Flights', ar: 'سفر ورحلات' }, description: { en: 'Compare the printed Wh rating with the airline and route rules before travel. Carry-on approval is determined by the airline and authorities, not the product name alone.', ar: 'قارن قيمة Wh المطبوعة بقواعد شركة الطيران والمسار قبل السفر. الموافقة على حمل الباور بانك تحددها الشركة والجهات المختصة، لا اسم المنتج وحده.' } },
                    { icon: 'briefcase', title: { en: 'Daily Work', ar: 'عمل يومي' }, description: { en: 'A 10,000mAh class model can suit daily carry; actual charge count depends on the phone battery and conversion losses.', ar: 'قد تناسب فئة 10,000mAh الحمل اليومي؛ ويعتمد عدد الشحنات الفعلي على بطارية الهاتف وفقد التحويل.' } },
                    { icon: 'tent', title: { en: 'Camping & Emergency', ar: 'تخييم وطوارئ' }, description: { en: 'Higher-capacity models can support longer use, but runtime depends on connected devices, output, temperature, and conversion efficiency.', ar: 'قد تدعم الموديلات الأعلى سعة استخداماً أطول، لكن المدة تعتمد على الأجهزة والخرج والحرارة وكفاءة التحويل.' } },
                    { icon: 'phone', title: { en: 'Light Use & Backup', ar: 'استخدام خفيف' }, description: { en: 'Nano 5,000mAh models offer a compact built-in-connector option; confirm device compatibility and usable capacity.', ar: 'تقدم موديلات Nano 5,000mAh خياراً مدمجاً بموصل مدمج؛ راجع توافق الجهاز والطاقة القابلة للاستخدام.' } }
                ],
                trustBadges: [
                    { icon: 'check-circle', title: { en: 'Invoice & Model Record', ar: 'فاتورة وبيانات الموديل' }, description: { en: 'Keep both for support', ar: 'احتفظ بهما للدعم' } },
                    { icon: 'shield', title: { en: 'CairoVolt Warranty', ar: 'ضمان كايرو فولت' }, description: { en: 'Terms listed per product', ar: 'الشروط حسب المنتج' } },
                    { icon: 'battery', title: { en: 'Capacity Label', ar: 'بيانات السعة' }, description: { en: 'mAh and Wh by model', ar: 'mAh وWh حسب الموديل' } },
                    { icon: 'shield', title: { en: 'Protection Features', ar: 'خصائص الحماية' }, description: { en: 'Listed by model', ar: 'موضحة حسب الموديل' } },
                    { icon: 'star', title: { en: 'Current Product Data', ar: 'بيانات المنتج الحالية' }, description: { en: 'Price and stock on page', ar: 'السعر والمخزون في الصفحة' } },
                    { icon: 'call', title: { en: 'WhatsApp Support', ar: 'دعم واتساب' }, description: { en: 'During listed service hours', ar: 'خلال ساعات الخدمة المعلنة' } }
                ],
                faq: {
                    ar: [
                        { question: 'ما الفرق بين باور بانك انكر 10000 و 20000 مللي أمبير؟', answer: 'راجع جدول السعات في دليل الشراء بالأسفل. باختصار: 10K للجيب واليوم العادي، 20K للسفر والرحلات الطويلة.' },
                        { question: 'هل باور بانك انكر Prime يشحن لابتوب MacBook؟', answer: 'يمكن للموديل الذي يوفر خرج USB-C PD مناسباً شحن MacBook متوافق. راجع قدرة اللابتوب وتوزيع الطاقة عند توصيل عدة أجهزة وتصنيف الكابل في صفحة الموديل.' },
                        { question: 'أيهما أفضل باور بانك انكر أم شاومي (Xiaomi)؟', answer: 'لا توجد نتيجة واحدة لكل الموديلات. قارن السعة بوحدة Wh، خرج USB-C، توزيع القدرة، الوزن، خصائص الحماية، وضمان كل منتج. اختر الموديل الذي يطابق جهازك واحتياجك بدلاً من المقارنة بالعلامة وحدها.' },
                        { question: 'كم مرة يشحن باور بانك انكر iPhone 17 Pro؟', answer: 'القاعدة: كل 5,000mAh = شحنة كاملة تقريباً (بعد خصم 15% خسارة التحويل). راجع الجدول في دليل الشراء للأرقام الدقيقة حسب الموديل.' },
                        { question: 'هل باور بانك انكر مسموح على الطائرة؟', answer: 'راجع قيمة Wh المطبوعة على الموديل وقواعد شركة الطيران والبلد قبل السفر؛ تختلف الموافقة وطريقة الحمل حسب الرحلة. لا تعتمد على mAh أو اسم الموديل وحدهما.' }
                    ],
                    en: [
                        { question: 'What is the difference between Anker 10000mAh and 20000mAh power bank?', answer: 'See the detailed capacity comparison in our buying guide below. Short version: 10K for pocket carry and light daily use, 20K for travel and heavy multi-device usage.' },
                        { question: 'Can Anker Prime power bank charge a MacBook laptop?', answer: 'A model with sufficient USB-C PD output can charge a compatible MacBook. Check the laptop requirement, multi-device power distribution, and cable rating on the exact product page.' },
                        { question: 'Which is better: Anker or Xiaomi power bank?', answer: 'There is no single result across every model. Compare Wh capacity, USB-C output, power distribution, weight, listed protections, and each product warranty, then choose for your device and use case.' },
                        { question: 'How many times can an Anker power bank charge iPhone 17 Pro?', answer: 'Rule: every 5,000mAh ≈ one full charge (after 15% conversion loss). See the exact per-model numbers in our buying guide below.' },
                        { question: 'Are Anker power banks allowed on flights?', answer: 'Check the Wh value printed on the model and the current rules of your airline, route, and country. Approval and carry-on requirements vary, so do not rely on mAh or the product name alone.' }
                    ]
                }
            },
            metadata: {
                en: {
                    title: 'Anker Power Bank & Power Station Egypt | 20000mAh, 10000mAh',
                    description: 'Compare Anker power banks and portable power stations in Egypt, including PowerCore and PowerHouse models, by capacity, Wh rating, USB-C PD output, current price, and CairoVolt warranty.',
                    keywords: 'anker power bank, anker power station, anker power bank 20000mah, anker powercore, anker prime power bank, anker powerhouse, anker 521, power bank egypt, portable power station',
                },
                ar: {
                    title: 'باور بانك انكر ومحطة طاقة | انكر Power Bank مصر',
                    description: 'قارن باور بانك انكر ومحطات الطاقة PowerCore وPowerHouse حسب السعة بوحدة mAh وWh وقدرة USB-C PD. السعر الحالي وضمان كايرو فولت موضحان في صفحة المنتج.',
                    keywords: 'باور بانك انكر, باور بنك انكر, محطة طاقة انكر, انكر باور ستيشن, باور بانك انكر 20000, باور بانك انكر 10000, سعر باور بانك انكر, انكر باور بانك, باور بانك',
                }
            },
            pageContent: {
                ar: {
                    title: 'باور بانك انكر في مصر حسب السعة والقدرة',
                    subtitle: 'انكر Power Bank - قارن mAh وWh وUSB-C PD',
                    description: `
      انقطاع الكهرباء مفاجئ؟ رحلة طويلة والموبايل على 10%؟ قارن باور بانك **انكر** حسب السعة المقننة وقيمة Wh وقدرة الخرج والشاشة أو الكابل المدمج في الموديلات الداعمة.

      **مصمم لكل سيناريو في مصر:**
      يوم عادي في القاهرة، رحلة الغردقة أو الساحل، أو انقطاع كهرباء طويل — عندنا السعة المناسبة لكل حالة. شوف دليل الشراء بالأسفل.

      موعد التوصيل تقديري حسب العنوان وتأكيد الطلب. تسوق [كابل انكر](/anker/cables) + [شاحن حائط انكر](/anker/wall-chargers) لاختيار منظومة متوافقة.
    `,
                    qualityBadges: [
                        { type: 'originality', text: 'فاتورة وبيانات موديل قابلة للمراجعة' },
                        { type: 'warranty', text: 'ضمان كايرو فولت حسب صفحة المنتج والسياسة' },
                        { type: 'expert_verified', text: 'مواصفات واضحة وتوافق موضح لكل موديل' }
                    ],
                    buyingGuide: [
                        {
                            title: 'كيف تختار سعة الباور بانك المناسبة؟',
                            content: `
- **10,000 مللي أمبير:** مناسب غالباً للاستخدام اليومي، مع اختلاف عدد الشحنات حسب الهاتف وكفاءة التحويل. راجع وزن كل موديل في صفحة المنتج.
- **20,000 مللي أمبير:** مناسب للسفر والاستخدام الطويل. تحقق من قيمة Wh وقواعد شركة الطيران قبل السفر.
- **27,650 مللي أمبير (Prime):** مناسب للأجهزة التي تحتاج خرجاً مرتفعاً مثل بعض اللابتوبات، مع دعم شحن عدة أجهزة حسب توزيع الطاقة المعلن.
`
                        },
                        {
                            title: 'الفرق بين الإصدارات (Series)',
                            content: `
- **سلسلة 3 (Essential):** جودة ممتازة وسعر اقتصادي.
- **سلسلة 5 (Nano/PowerCore):** سرعات أعلى وتصميمات أنحف، تدعم الشحن السريع للايفون 17.
- **سلسلة Prime (الجيل الجديد):** أحدث تكنولوجيا، شاشات رقمية، وسرعات تصل لـ 250 وات لشحن كل أجهزتك.
`
                        },
                        {
                            title: 'تحذير: كيف تكتشف انكر المقلد؟',
                            content: `
1. **بيانات الموديل:** طابق رقم الموديل والسعة بوحدة mAh وWh والخرج مع صفحة الشركة أو العبوة الرسمية المتاحة.
2. **وسيلة التحقق:** استخدم فقط وسيلة التحقق التي تعلنها الشركة للموديل والمنطقة؛ وجود رقم تسلسلي أو سجل ضمان لا يثبت وحده أصالة الشركة المصنّعة.
3. **الفاتورة والضمان:** احتفظ بفاتورة كايرو فولت وراجع مدة التغطية وشروط الاستبدال المكتوبة في صفحة المنتج والسياسة.
4. **السلامة:** توقف عن الاستخدام إذا ظهرت سخونة أو انتفاخ أو رائحة غير طبيعية، ولا تستخدم كابلاً أو شاحناً غير متوافق.
`
                        }
                    ],
                    products: [
                        { name: 'باور بانك انكر ووكونج 3 في 1 (A1637)', price: 2999, badge: '🆕 3 في 1' },
                        { name: 'باور بانك انكر برايم 20000 (200W)', price: 5900, badge: '🆕 200W' },
                        { name: 'باور بانك انكر برايم فيوجن 65W', price: 3200, badge: '🆕 Hybrid' },
                        { name: 'Anker PowerCore 20000mAh (iPhone 17 Ready)', price: 1550, badge: 'سعة 20,000mAh' },
                        { name: 'Anker Nano 10000mAh', price: 1300, badge: 'حجم صغير' },
                        { name: 'Anker PowerCore 26800mAh', price: 2300, badge: 'سعة عملاقة' },
                        { name: 'باور بانك انكر زولو 20,000 بكابل مدمج (A110E)', price: 1730, badge: 'كابل مدمج' },
                        { name: 'باور بانك انكر زولو 10,000 بكابل مدمج (A110D)', price: 1270, badge: 'خفيف للجيب' },
                        { name: 'Anker 737 Power Bank', price: 4999, badge: 'Premium' },
                    ]
                },
                en: {
                    title: 'Anker Power Banks in Egypt by Capacity and Output',
                    subtitle: 'Compare mAh, Wh, USB-C PD, ports, and model features',
                    description: `
      Sudden power outage or a long trip with low phone battery? Compare Anker power banks by rated capacity, printed Wh, port output, and display or built-in-cable features on supported models.

      **Designed for Every Egyptian Scenario:**
      Regular Cairo day, Hurghada or Sahel trip, or extended power outage — we have the right capacity for every situation. See our buying guide below.

      Delivery timing is estimated after confirming the address and order details.
    `,
                    qualityBadges: [
                        { type: 'originality', text: 'Invoice and model details available' },
                        { type: 'warranty', text: 'CairoVolt warranty per product and policy' },
                        { type: 'expert_verified', text: 'Clear specifications and compatibility by model' }
                    ],
                    buyingGuide: [
                        {
                            title: 'How to Choose the Right Capacity',
                            content: `
- **10,000mAh:** A practical daily-use size; actual charge count varies by phone and conversion efficiency. Check each model's listed weight.
- **20,000mAh:** Suitable for travel and extended use. Confirm the Wh rating and your airline's rules before flying.
- **27,650mAh (Prime):** Suited to higher-output devices such as compatible laptops, with multi-device charging based on the model's stated power distribution.
`
                        },
                        {
                            title: 'Understanding the Series',
                            content: `
- **Series 3 (Essential / Core):** Reliable quality at an affordable price. Real capacity and practical design. (e.g., PowerCore 10000).
- **Series 5 (Nano / MagGo):** Compact and magnetic options for compatible phones and cases; check each model's alignment and output.
- **Series 7 (Super Fast):** High-speed charging for laptops and tablets. (e.g., Anker 737 with 140W output).
- **Series Prime:** Higher-output models that may include displays or app features; ports and total or per-port output vary by product.
`
                        },
                        {
                            title: 'WARNING: How to Spot Fake Anker?',
                            content: `
1. **Model data:** Match the model number, mAh and Wh capacity, and output against the manufacturer's available product information and packaging.
2. **Verification method:** Use only the manufacturer's stated method for that model and region. A serial number or warranty record alone does not prove manufacturer authenticity.
3. **Invoice and warranty:** Keep the CairoVolt invoice and review the coverage duration and replacement terms on the product page and policy.
4. **Safety:** Stop use if you notice unusual heat, swelling, odor, or damage, and use compatible cables and chargers.
`
                        }
                    ],
                    products: [
                        { name: 'Anker Wukong 3-in-1 Power Bank (A1637)', price: 2999, badge: '🆕 3-in-1' },
                        { name: 'Anker Prime 20K 200W Power Bank', price: 5900, badge: '🆕 200W' },
                        { name: 'Anker Prime Fusion 65W Power Bank', price: 3200, badge: '🆕 Hybrid' },
                        { name: 'Anker PowerCore 20000mAh (iPhone 17)', price: 1550, badge: '20,000mAh' },
                        { name: 'Anker Nano 10000mAh', price: 1300, badge: 'Compact' },
                        { name: 'Anker PowerCore 26800mAh', price: 2300, badge: 'Huge Capacity' },
                        { name: 'Anker Zolo 20,000 Built-in Cable (A110E)', price: 1730, badge: 'Built-in Cable' },
                        { name: 'Anker Zolo 10,000 Built-in Cable (A110D)', price: 1270, badge: 'Pocket-size' },
                        { name: 'Anker 737 Power Bank', price: 4999, badge: 'Flagship' },
                    ]
                }
            }
        };
