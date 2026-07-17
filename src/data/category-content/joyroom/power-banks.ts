import type { CategoryContent } from '../_types';

export const joyroom_power_banks_content: CategoryContent = {
    brand: 'Joyroom',
    brandColor: 'red',
    categoryName: 'Power Banks',
    powerBankData: {
        title: {
            en: 'Joyroom Power Banks: Practical Capacity and Charging Options',
            ar: 'باور بانك جوي روم: سعات عملية وخيارات شحن متنوعة'
        },
        tagline: {
            en: 'Choose by capacity, output, ports, and device compatibility',
            ar: 'اختار حسب السعة والقدرة والمنافذ وتوافق جهازك'
        },
        history: {
            en: 'Joyroom offers portable power banks in several capacities and form factors. Features vary by model and may include USB-C input/output, Quick Charge support, built-in cables, magnetic wireless charging, and a digital charge display. Check the individual product page for exact specifications.',
            ar: 'تقدم جوي روم باور بانك بسعات وتصميمات متعددة. تختلف المميزات حسب الموديل وقد تشمل USB-C للإدخال والإخراج، ودعم Quick Charge، وكابلات مدمجة، وشحناً لاسلكياً مغناطيسياً، وشاشة رقمية لنسبة الشحن. راجع صفحة المنتج للمواصفات الدقيقة.'
        },
        achievements: [
            { icon: 'battery', stat: { en: '10K–20K', ar: '10–20 ألف' }, label: { en: 'Common capacities', ar: 'سعات شائعة mAh' } },
            { icon: 'bolt', stat: { en: 'Up to 22.5W', ar: 'حتى 22.5 واط' }, label: { en: 'By model', ar: 'حسب الموديل' } },
            { icon: 'shield', stat: { en: 'Listed', ar: 'موضح' }, label: { en: 'Warranty per product', ar: 'الضمان حسب المنتج' } }
        ],
        technologies: [
            {
                name: 'Smart Charging',
                icon: 'brain',
                description: {
                    en: 'Compatible models negotiate supported voltage and current with the connected device. Confirm the charging protocols on the product page.',
                    ar: 'تتفاوض الموديلات المتوافقة مع الجهاز على الجهد والتيار المدعومين. تأكد من بروتوكولات الشحن في صفحة المنتج.'
                }
            },
            {
                name: 'Quick Charge Options',
                icon: 'bolt',
                description: {
                    en: 'Selected models support wired output up to 22.5W. Actual speed depends on the phone, cable, port, battery level, and charging protocol.',
                    ar: 'تدعم موديلات مختارة خرجاً سلكياً حتى 22.5 واط. السرعة الفعلية تعتمد على الهاتف والكابل والمنفذ ونسبة البطارية وبروتوكول الشحن.'
                }
            },
            {
                name: 'Battery Protection',
                icon: 'shield',
                description: {
                    en: 'Protection features vary by model and may cover over-current, over-voltage, short circuit, over-charge, and temperature conditions.',
                    ar: 'تختلف وسائل الحماية حسب الموديل وقد تشمل التيار والجهد الزائدين، والماس الكهربائي، والشحن الزائد، وظروف الحرارة.'
                }
            },
            {
                name: 'Charge Display',
                icon: 'chart',
                description: {
                    en: 'Some models use a percentage display while others use LED indicators. The product page identifies the display type.',
                    ar: 'تستخدم بعض الموديلات شاشة للنسبة، بينما تستخدم موديلات أخرى مؤشرات LED. توضح صفحة المنتج نوع العرض.'
                }
            }
        ],
        useCases: [
            {
                icon: 'book',
                title: { en: 'Daily Carry', ar: 'استخدام يومي' },
                description: { en: 'A 10,000mAh class model is usually easier to carry for everyday top-ups.', ar: 'موديل فئة 10,000mAh يكون عادةً أسهل للحمل والشحنات اليومية.' }
            },
            {
                icon: 'plane',
                title: { en: 'Travel', ar: 'السفر' },
                description: { en: 'Check the Wh value printed on the unit and your airline rules. Power banks normally travel in carry-on baggage, not checked luggage.', ar: 'تحقق من قيمة Wh المطبوعة على المنتج وقواعد شركة الطيران. عادةً يوضع الباور بانك في حقيبة اليد وليس الأمتعة المشحونة.' }
            },
            {
                icon: 'phone',
                title: { en: 'Cable-Free Charging', ar: 'شحن بدون كابل' },
                description: { en: 'Magnetic wireless models suit compatible phones and cases, with lower usable energy than wired charging due to conversion losses.', ar: 'تناسب الموديلات اللاسلكية المغناطيسية الهواتف والأغطية المتوافقة، مع طاقة قابلة للاستخدام أقل من الشحن السلكي بسبب فقد التحويل.' }
            }
        ],
        trustBadges: [
            { icon: 'shield', title: { en: 'CairoVolt Warranty', ar: 'ضمان كايرو فولت' }, description: { en: 'Duration and terms per product', ar: 'المدة والشروط حسب المنتج' } },
            { icon: 'check-circle', title: { en: 'Model-Level Specs', ar: 'مواصفات لكل موديل' }, description: { en: 'Capacity, ports, and output listed', ar: 'السعة والمنافذ والقدرة موضحة' } },
            { icon: 'call', title: { en: 'Customer Support', ar: 'دعم العملاء' }, description: { en: 'Help choosing a compatible model', ar: 'مساعدة في اختيار موديل متوافق' } }
        ],
        faq: {
            ar: [
                { question: 'جوي روم 10,000 ولا 20,000mAh؟', answer: 'اختار 10,000mAh للحمل اليومي، و20,000mAh للاستخدام الأطول أو شحن أكثر من جهاز. عدد الشحنات الفعلي يختلف حسب بطارية الهاتف وكفاءة التحويل وطريقة الشحن.' },
                { question: 'هل الشحن السريع مناسب لهاتفي؟', answer: 'راجع البروتوكول والقدرة التي يدعمها الهاتف. الباور بانك المتوافق يقدّم القدرة التي يتفاوض عليها الجهاز، والسرعة الفعلية تتأثر بالكابل والمنفذ ونسبة البطارية.' },
                { question: 'هل الباور بانك مسموح على الطائرة؟', answer: 'تحقق من قيمة Wh المطبوعة على المنتج ومن قواعد شركة الطيران قبل السفر. يُحمل الباور بانك عادةً في حقيبة اليد فقط.' },
                { question: 'كيف أحافظ على الباور بانك؟', answer: 'تجنب الشمس والحرارة المرتفعة، ولا تستخدم كابلاً تالفاً، ولا تترك البطارية فارغة فترة طويلة. توقف عن الاستخدام عند انتفاخ الجسم أو ظهور رائحة أو سخونة غير طبيعية.' }
            ],
            en: [
                { question: 'Should I choose 10,000 or 20,000mAh?', answer: 'Choose 10,000mAh for easier daily carry and 20,000mAh for longer use or multiple devices. Actual charge count varies by phone battery, conversion efficiency, and charging method.' },
                { question: 'Is fast charging compatible with my phone?', answer: 'Check the protocol and power supported by your phone. A compatible power bank supplies the power negotiated by the device; actual speed also depends on the cable, port, and battery level.' },
                { question: 'Can I take the power bank on a flight?', answer: 'Check the Wh value printed on the product and your airline rules before travel. Power banks are normally permitted in carry-on baggage only.' },
                { question: 'How should I care for a power bank?', answer: 'Keep it away from direct sun and excessive heat, avoid damaged cables, and do not leave it fully discharged for long periods. Stop using it if the case swells or you notice an unusual smell or heat.' }
            ]
        }
    },
    metadata: {
        en: {
            title: 'Joyroom Power Bank Egypt | 10000 & 20000mAh Options',
            description: 'Compare Joyroom power banks in Egypt by capacity, USB-C and Quick Charge support, built-in cables, displays, and magnetic wireless models. Current price and CairoVolt warranty are listed per product.',
            keywords: 'joyroom power bank, joyroom power bank egypt, joyroom 10000mah, joyroom 20000mah, joyroom magnetic power bank, usb c power bank egypt, باور بانك جوي روم'
        },
        ar: {
            title: 'باور بانك جوي روم مصر | خيارات 10000 و20000mAh',
            description: 'قارن باور بانك جوي روم حسب السعة ودعم USB-C وQuick Charge والكابلات المدمجة والشاشة والموديلات اللاسلكية المغناطيسية. السعر الحالي وضمان كايرو فولت موضحان لكل منتج.',
            keywords: 'باور بانك جوي روم, باور بانك جوي روم 10000, باور بانك جوي روم 20000, سعر باور بانك جوي روم, باور بانك USB-C مصر, باور بانك مغناطيسي, joyroom power bank'
        }
    },
    pageContent: {
        ar: {
            title: 'باور بانك جوي روم في مصر حسب السعة والقدرة',
            subtitle: 'قارن السعة والقدرة والمنافذ قبل الشراء',
            description: `
تختلف موديلات **باور بانك جوي روم** في السعة والقدرة وعدد المنافذ وطريقة الشحن. راجع صفحة كل منتج لمعرفة السعة الاسمية، وقيمة Wh، وقدرة كل منفذ، والبروتوكولات المدعومة، والوزن.

عدد مرات شحن الهاتف لا يساوي قسمة السعة الاسمية مباشرةً، لأن تحويل الجهد والكابل والشحن اللاسلكي يسببون فقداً في الطاقة. لذلك استخدم السعة للمقارنة بين الموديلات، وليس كضمان لعدد ثابت من الشحنات.
`,
            qualityBadges: [
                { type: 'originality', text: 'بيانات الموديل والعبوة موضحة عند الشراء' },
                { type: 'warranty', text: 'ضمان كايرو فولت حسب صفحة المنتج والسياسة' },
                { type: 'expert_verified', text: 'توافق وقدرة موضحان لكل موديل' }
            ],
            buyingGuide: [
                {
                    title: 'اختيار السعة المناسبة',
                    content: `
- **10,000mAh:** مناسب غالباً للحمل اليومي وشحنة احتياطية أثناء العمل أو الدراسة.
- **20,000mAh:** مناسب للاستخدام الأطول أو شحن أكثر من جهاز، لكنه أكبر وأثقل.
- **موديل مغناطيسي:** مناسب للهواتف والأغطية المتوافقة، مع كفاءة أقل من الشحن السلكي عادةً.

قارن أيضاً الوزن والأبعاد وقيمة Wh المطبوعة على المنتج. لا تعتمد على عدد شحنات ثابت؛ فالنتيجة تتغير حسب سعة بطارية الهاتف، وحالة البطاريتين، وطريقة الاستخدام أثناء الشحن.

يمكنك الرجوع إلى [كل موديلات باور بانك جوي روم](/joyroom/power-banks) ثم فتح صفحة المنتج لمراجعة السعر والمخزون والمواصفات الحالية.
`
                },
                {
                    title: 'mAh وWh: كيف تقرأ السعة؟',
                    content: `
**الأرقام التالية تقديرات نظرية وليست قياسات أداء:** تحسب الطاقة الاسمية تقريبياً من المعادلة **Wh ≈ (mAh ÷ 1000) × جهد الخلية الاسمي**. فإذا كانت الخلية مسجلة عند 3.7 فولت، تكون فئة 10,000mAh نحو 37Wh نظرياً، وفئة 20,000mAh نحو 74Wh نظرياً.

اعتمد دائماً قيمة Wh المطبوعة على المنتج أو العبوة، لأنها المرجع لذلك الموديل. والطاقة التي تصل للهاتف تكون أقل ومتغيرة بسبب تحويل الجهد والكابل وطريقة الشحن والاستخدام. اقرأ شرح [الفرق بين السعة الاسمية والطاقة القابلة للاستخدام](/blog/power-bank-10000mah-real-capacity-myth) دون افتراض نسبة فقد أو عدد شحنات ثابت.
`
                },
                {
                    title: 'المنافذ والبروتوكولات وتوافق الكابل',
                    content: `
قد يكون منفذ USB-C للإدخال فقط أو للإخراج فقط أو للوظيفتين حسب الموديل، بينما تختلف وظائف USB-A والكابل المدمج من منتج لآخر. وجود منفذ أو رقم قدرة لا يعني وحده دعم PD أو Quick Charge؛ يجب أن يدعم الباور بانك والهاتف والكابل البروتوكول نفسه.

راجع قدرة كل منفذ منفرداً وتوزيعها عند توصيل أكثر من جهاز. اختر من [كابلات جوي روم](/joyroom/cables) كابلاً بالموصل والقدرة المناسبين، واستخدم [شاحن حائط جوي روم](/joyroom/wall-chargers) متوافقاً مع مدخل الموديل؛ فالكابل أو الشاحن غير المتوافق قد يخفض السرعة أو يمنع تفعيل الشحن السريع.
`
                },
                {
                    title: 'مقارنة موديلات الكتالوج الحالية',
                    content: `
- [باور بانك جوي روم 10,000mAh السلكي](/joyroom/power-banks/joyroom-power-bank-10000): خيار يومي لمن يقدّم سهولة الحمل؛ راجع صفحة المنتج لتحديد المنافذ والبروتوكولات الفعلية.
- [باور بانك جوي روم 20,000mAh السلكي](/joyroom/power-banks/joyroom-power-bank-20000): سعة اسمية أكبر للاستخدام الأطول أو عدة أجهزة، مقابل حجم ووزن أكبر عادةً.
- [باور بانك جوي روم المغناطيسي 10,000mAh](/joyroom/power-banks/joyroom-magnetic-power-bank-10000): يركز على راحة التثبيت والشحن اللاسلكي مع هاتف وغطاء متوافقين؛ تحقق من المحاذاة وطريقة الشحن السلكي في صفحة المنتج.

للمقارنة بين علامة وسعات وتصميمات أخرى، تصفح [باور بانك انكر](/anker/power-banks) وطبّق المعايير نفسها: Wh المطبوعة، وقدرة كل منفذ، والبروتوكول، والوزن، وتوافق الكابل. التوفر والمواصفات النهائية تتبع صفحة المنتج الحالية.
`
                },
                {
                    title: 'السلامة والعناية',
                    content: `
استخدم كابلاً وشاحناً سليمين ومتوافقين، وحافظ على المنافذ جافة ونظيفة. ضع الباور بانك في مكان جيد التهوية أثناء الشحن؛ لا تغطه ولا تضعه تحت وسادة، وأبعده عن الشمس والسيارة المغلقة ومصادر الحرارة.

توقف عن استخدامه إذا انتفخ الجسم أو تضرر أو ظهرت رائحة أو حرارة غير طبيعية، ولا تحاول فتحه أو إصلاح الخلايا. لا تتركه فارغاً فترة طويلة، واتبع تعليمات التخزين الخاصة بالموديل، وسلّمه إلى جهة تدوير نفايات إلكترونية عند انتهاء عمره.
`
                }
            ],
            faq: [
                { question: 'كام مرة يشحن الهاتف؟', answer: 'لا يوجد رقم ثابت؛ يعتمد على سعة بطارية الهاتف وكفاءة التحويل والكابل وطريقة الشحن. الشحن اللاسلكي يفقد طاقة أكثر من الشحن السلكي عادةً.' },
                { question: 'هل يدعم شحن اللابتوب؟', answer: 'فقط إذا كانت قدرة USB-C PD الخارجة من الموديل تساوي أو تتجاوز متطلبات اللابتوب. راجع مواصفات اللابتوب والباور بانك والكابل.' },
                { question: 'هل هو مناسب للسفر الجوي؟', answer: 'راجع قيمة Wh على المنتج وسياسة شركة الطيران. يُحمل الباور بانك عادةً في حقيبة اليد فقط.' },
                { question: 'ما الضمان؟', answer: 'توضح صفحة المنتج وسياسة ضمان كايرو فولت مدة التغطية وشروطها لكل موديل.' }
            ],
            products: [
                { name: 'Joyroom 10000mAh Slim 22.5W', price: 1624, badge: 'حجم مدمج' },
                { name: 'Joyroom 20000mAh Pro 22.5W', price: 997, badge: 'سعة أكبر' },
                { name: 'Joyroom MagSafe 10000mAh', price: 850, badge: 'شحن لاسلكي' }
            ]
        },
        en: {
            title: 'Joyroom Power Banks in Egypt by Capacity and Output',
            subtitle: 'Compare capacity, output, ports, and compatibility',
            description: `
**Joyroom power banks** vary by capacity, output, port count, and charging method. Check each product page for nominal capacity, Wh rating, output per port, supported protocols, weight, and dimensions.

Phone charge count cannot be calculated from nominal mAh alone because voltage conversion, cables, and wireless charging all introduce energy loss. Use capacity to compare models, not as a guarantee of a fixed number of charges.
`,
            qualityBadges: [
                { type: 'originality', text: 'Model and package details shown at purchase' },
                { type: 'warranty', text: 'CairoVolt warranty per product and policy' },
                { type: 'expert_verified', text: 'Compatibility and output listed by model' }
            ],
            buyingGuide: [
                {
                    title: 'Choosing Capacity',
                    content: `
- **10,000mAh:** Usually easier to carry for work, study, and everyday backup power.
- **20,000mAh:** Better for longer use or multiple devices, with greater size and weight.
- **Magnetic model:** Convenient for compatible phones and cases, usually with lower efficiency than wired charging.

Also compare the product's weight, dimensions, and printed Wh rating. Do not rely on a fixed charge count; results vary with phone-battery capacity, the condition of both batteries, and device use while charging.

Return to [all Joyroom power bank models](/en/joyroom/power-banks), then open the individual product page for current price, stock, and specifications.
`
                },
                {
                    title: 'mAh and Wh: Reading Capacity',
                    content: `
**The following figures are theoretical estimates, not performance measurements:** nominal energy can be approximated as **Wh ≈ (mAh ÷ 1000) × nominal cell voltage**. If the cell is rated at 3.7V, the 10,000mAh class is about 37Wh in theory and the 20,000mAh class is about 74Wh in theory.

Always use the Wh value printed on the product or packaging as the model-specific reference. Energy delivered to a phone is lower and variable because of voltage conversion, the cable, the charging method, and device use. Read the guide to [rated capacity versus usable energy](/en/blog/power-bank-10000mah-real-capacity-myth) without assuming a fixed loss percentage or charge count.
`
                },
                {
                    title: 'Ports, Protocols, and Cable Compatibility',
                    content: `
A USB-C port may be input-only, output-only, or bidirectional depending on the model; USB-A and built-in-cable functions also vary. A connector or wattage figure alone does not confirm PD or Quick Charge support—the power bank, phone, and cable must share a compatible protocol.

Check each port's individual output and the power allocation used with multiple devices. Choose a connector- and power-compatible option from [Joyroom cables](/en/joyroom/cables), and pair it with a [Joyroom wall charger](/en/joyroom/wall-chargers) compatible with the model's input. An incompatible cable or charger may reduce speed or prevent fast-charging negotiation.
`
                },
                {
                    title: 'Current Catalogue Model Comparison',
                    content: `
- [Joyroom 10,000mAh wired power bank](/en/joyroom/power-banks/joyroom-power-bank-10000): a daily-carry option; use the product page to confirm its current ports and protocols.
- [Joyroom 20,000mAh wired power bank](/en/joyroom/power-banks/joyroom-power-bank-20000): a higher nominal-capacity option for longer use or multiple devices, usually with more size and weight.
- [Joyroom magnetic 10,000mAh power bank](/en/joyroom/power-banks/joyroom-magnetic-power-bank-10000): prioritizes magnetic attachment and wireless convenience with a compatible phone and case; confirm alignment and wired-charging options on the product page.

To compare another brand and more capacity or form-factor choices, browse [Anker power banks](/en/anker/power-banks) using the same criteria: printed Wh, per-port output, protocol, weight, and cable compatibility. Final specifications and availability follow the current product page.
`
                },
                {
                    title: 'Safety and Care',
                    content: `
Use an undamaged, compatible cable and charger, and keep the ports clean and dry. Charge the power bank in a ventilated place; do not cover it or put it under a pillow, and keep it away from direct sun, closed hot cars, and other heat sources.

Stop using it if the case swells, is damaged, or produces an unusual smell or heat. Do not open the case or attempt cell repairs. Avoid leaving it fully discharged for long periods, follow the model's storage instructions, and take it to an electronics-recycling service at end of life.
`
                }
            ],
            faq: [
                { question: 'How many times will it charge my phone?', answer: 'There is no fixed number. It depends on the phone battery, conversion efficiency, cable, and charging method. Wireless charging usually loses more energy than wired charging.' },
                { question: 'Can it charge a laptop?', answer: 'Only when the model\'s USB-C PD output meets the laptop power requirement. Check the specifications of the laptop, power bank, and cable.' },
                { question: 'Is it suitable for air travel?', answer: 'Check the Wh value on the product and the airline policy. Power banks are normally carried in hand luggage only.' },
                { question: 'What is the warranty?', answer: 'The product page and CairoVolt warranty policy list the duration, coverage, and terms for each model.' }
            ],
            products: [
                { name: 'Joyroom 10000mAh Slim 22.5W', price: 1624, badge: 'Compact' },
                { name: 'Joyroom 20000mAh Pro 22.5W', price: 997, badge: 'Higher Capacity' },
                { name: 'Joyroom MagSafe 10000mAh', price: 850, badge: 'Wireless' }
            ]
        }
    }
};
