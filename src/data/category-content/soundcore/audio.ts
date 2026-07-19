import type { CategoryContent } from '../_types';

export const soundcore_audio_content: CategoryContent = {
            brand: 'Soundcore',
            brandColor: 'orange',
            categoryName: 'Audio & Earbuds',
            // Soundcore content data
            soundcoreData: {
                title: {
                    en: 'Soundcore: Earbuds and Speakers by Listening Need',
                    ar: 'ساوندكور: سماعات شخصية وسبيكرات حسب طريقة الاستماع'
                },
                tagline: {
                    en: 'Hear It. Feel It.',
                    ar: 'اسمعها. عيشها.'
                },
                history: {
                    en: 'Soundcore launched in 2016 as Anker\'s audio brand. Its range includes compact earbuds, ANC models, open-ear designs, over-ear headphones, and portable speakers. Features such as LDAC, Hi-Res Audio, HearID, app EQ, water resistance, and battery duration vary by model, so compare the exact product rather than applying one specification to the full range.',
                    ar: 'أُطلقت ساوندكور في 2016 كعلامة الصوت التابعة لانكر. تشمل تشكيلتها ايربودز مدمجة وموديلات ANC وتصميمات مفتوحة وهيدفون وسبيكرات محمولة. تختلف ميزات LDAC وHi-Res Audio وHearID وEQ عبر التطبيق وتصنيف الماء ومدة البطارية حسب الموديل؛ لذلك قارن المنتج المحدد ولا تعمم مواصفة واحدة على السلسلة كلها.'
                },
                achievements: [
                    { icon: 'headphones', stat: { en: 'ANC', ar: 'ANC' }, label: { en: 'On selected models', ar: 'في موديلات مختارة' } },
                    { icon: 'star', stat: { en: 'Hi-Res', ar: 'Hi-Res' }, label: { en: 'On listed products', ar: 'في المنتجات المدرجة' } },
                    { icon: 'trophy', stat: { en: 'Earbuds', ar: 'ايربودز' }, label: { en: 'In-ear and open-ear', ar: 'داخل الأذن ومفتوحة' } },
                    { icon: 'phone', stat: { en: 'App', ar: 'تطبيق' }, label: { en: 'Features vary by model', ar: 'الميزات حسب الموديل' } },
                    { icon: 'music', stat: { en: '2016', ar: '2016' }, label: { en: 'Year Launched', ar: 'سنة الإطلاق' } },
                    { icon: 'globe', stat: { en: 'Speakers', ar: 'سبيكرات' }, label: { en: 'Portable models', ar: 'موديلات محمولة' } }
                ],
                technologies: [
                    { name: 'Hi-Res Audio', icon: 'music', description: { en: 'Selected products list Hi-Res Audio certification and may support codecs such as LDAC. Check the model, source device, codec setting, and content before relying on the feature.', ar: 'تذكر منتجات مختارة اعتماد Hi-Res Audio وقد تدعم ترميزات مثل LDAC. راجع الموديل والجهاز المصدر وإعداد الترميز والمحتوى قبل الاعتماد على الميزة.' } },
                    { name: 'ANC (Active Noise Cancelling)', icon: 'mute', description: { en: 'ANC reduces some surrounding noise on supported models. Results vary with fit, tips, frequency, environment, and the selected mode.', ar: 'يقلل ANC بعض الضوضاء المحيطة في الموديلات الداعمة. تتغير النتيجة حسب الملاءمة والطرف والتردد والبيئة والوضع المختار.' } },
                    { name: 'HearID', icon: 'brain', description: { en: 'On compatible models, HearID can create a personalized EQ profile through the Soundcore app. It is an audio preference feature, not a medical hearing test.', ar: 'في الموديلات المتوافقة، يمكن لـHearID إنشاء ملف EQ شخصي عبر تطبيق ساوندكور. هي ميزة لتفضيل الصوت وليست اختبار سمع طبي.' } },
                    { name: 'BassUp', icon: 'speaker', description: { en: 'BassUp is a Soundcore bass-processing feature on listed earbuds and speakers. Its controls and effect vary by model and listening level.', ar: 'BassUp ميزة معالجة للباس في سماعات وسبيكرات ساوندكور المدرج بها. تختلف أدوات التحكم وتأثيرها حسب الموديل ومستوى الاستماع.' } },
                    { name: 'LDAC Codec', icon: 'satellite', description: { en: 'LDAC is available on selected models and compatible source devices. The active bitrate and perceived result depend on settings, connection conditions, and the recording.', ar: 'يتوفر LDAC في موديلات وأجهزة مصدر متوافقة مختارة. يعتمد معدل النقل الفعلي والنتيجة المسموعة على الإعدادات والاتصال والتسجيل.' } }
                ],
                useCases: [
                    { icon: 'running', title: { en: 'Sports & Fitness', ar: 'رياضة ولياقة' }, description: { en: 'Choose a secure fit and a suitable IP rating. Water resistance applies only within the stated conditions and does not guarantee against every exposure.', ar: 'اختر تثبيتاً مناسباً وتصنيف IP ملائماً. مقاومة الماء تسري فقط ضمن الشروط المعلنة ولا تضمن الحماية من كل تعرض.' } },
                    { icon: 'plane', title: { en: 'Commute & Travel', ar: 'مواصلات وسفر' }, description: { en: 'Compare ANC performance, comfort, microphone quality, and battery duration for your travel environment.', ar: 'قارن أداء ANC والراحة وجودة الميكروفون ومدة البطارية حسب بيئة سفرك.' } },
                    { icon: 'home', title: { en: 'Home & Living', ar: 'منزل ومعيشة' }, description: { en: 'Compare speaker size, stated output, EQ support, and room placement—from Motion+ to Flare 2.', ar: 'قارن حجم السبيكر والخرج المعلن ودعم EQ ومكان الاستخدام، من Motion+ إلى Flare 2.' } },
                    { icon: 'party', title: { en: 'Outdoor & Party', ar: 'حفلات ورحلات' }, description: { en: 'Check the exact IP rating, battery estimate, and pairing feature before outdoor use. Avoid salt water unless the product instructions explicitly allow it.', ar: 'راجع تصنيف IP ومدة البطارية وميزة الربط قبل الاستخدام الخارجي. تجنب الماء المالح ما لم تسمح تعليمات المنتج صراحةً.' } }
                ],
                trustBadges: [
                    { icon: 'music', title: { en: 'Hi-Res by Model', ar: 'Hi-Res حسب الموديل' }, description: { en: 'Check product specification', ar: 'راجع مواصفات المنتج' } },
                    { icon: 'shield', title: { en: 'CairoVolt Warranty', ar: 'ضمان كايرو فولت' }, description: { en: 'Terms listed per product', ar: 'الشروط حسب المنتج' } },
                    { icon: 'phone', title: { en: 'Soundcore App', ar: 'تطبيق ساوندكور' }, description: { en: 'Features vary by model', ar: 'الميزات حسب الموديل' } },
                    { icon: 'phone', title: { en: 'iOS/Android', ar: 'iOS/Android' }, description: { en: 'Check model and app version', ar: 'راجع الموديل وإصدار التطبيق' } },
                    { icon: 'star', title: { en: 'Current Product Data', ar: 'بيانات المنتج الحالية' }, description: { en: 'Price and stock on page', ar: 'السعر والمخزون في الصفحة' } },
                    { icon: 'globe', title: { en: 'Earbuds & Speakers', ar: 'ايربودز وسبيكرات' }, description: { en: 'Browse by listening need', ar: 'تصفح حسب الاستخدام' } }
                ],
                faq: {
                    ar: [
                        { question: 'ما الفرق بين سماعات ساوندكور R50i وK20i وR50i NC؟', answer: 'شوف دليل الشراء بالأعلى للمقارنة. باختصار: قارن K20i لتصميمه، وR50i للاستخدام اليومي، وR50i NC إذا كنت تحتاج ANC، مع مراجعة صفحة كل موديل.' },
                        { question: 'هل سماعات ساوندكور تدعم عزل الضوضاء ANC؟', answer: 'تدعم موديلات مثل R50i NC وP40i عزل ANC، بينما تستخدم موديلات أخرى عزلاً سلبياً. تختلف النتيجة حسب الموديل والملاءمة والبيئة؛ راجع صفحة المنتج للمواصفة الدقيقة.' },
                        { question: 'أيهما أفضل: سماعات ساوندكور أم AirPods؟', answer: 'يعتمد على الموديل والجهاز. قارن تكامل النظام وANC والميكروفونات والترميزات وEQ والملاءمة وعمر البطارية والسعر الحالي؛ لا توجد نتيجة واحدة لكل موديلات العلامتين.' },
                        { question: 'هل سماعات ساوندكور بتشتغل مع ايفون وسامسونج؟', answer: 'سماعات ساوندكور تعمل عبر Bluetooth مع الأجهزة المتوافقة، لكن إصدار البلوتوث والميزات تختلف حسب الموديل. تطبيق ساوندكور متاح على iOS وAndroid للموديلات الداعمة.' },
                        { question: 'كام سنة بتعيش سماعات ساوندكور؟', answer: 'لا يمكن ضمان عمر ثابت؛ تتأثر البطارية بدورات الشحن والحرارة ومستوى الصوت والتخزين. راجع ضمان كايرو فولت المكتوب للمنتج، وتسوق [كابل انكر](/anker/cables) متوافقاً أو [سبيكر ساوندكور](/soundcore/speakers) لاستخدام مختلف.' }
                    ],
                    en: [
                        { question: 'What is the difference between Soundcore R50i, K20i, and R50i NC?', answer: 'Use the guide above to compare K20i for its design, R50i for everyday listening, and R50i NC when ANC is needed, then confirm the exact product specifications.' },
                        { question: 'Do Soundcore earbuds support ANC (Active Noise Cancelling)?', answer: 'Models such as R50i NC and P40i list active ANC, while other models use passive isolation. Results vary by model, fit, and environment; check the exact product specification.' },
                        { question: 'Which is better: Soundcore or AirPods?', answer: 'It depends on the exact models and source device. Compare platform integration, ANC, microphones, codecs, EQ, fit, rated battery life, and current price rather than treating either range as one product.' },
                        { question: 'Do Soundcore earbuds work with iPhone and Samsung?', answer: 'Soundcore Bluetooth models work with compatible phones, but Bluetooth version, app support, codecs, and controls vary by product. Check the product page and current app requirements.' },
                        { question: 'How long do Soundcore earbuds last?', answer: 'There is no guaranteed service life. Battery aging depends on charge cycles, heat, volume, and storage. CairoVolt warranty duration and terms are listed on the individual product page and policy.' }
                    ]
                }
            },
            metadata: {
                en: {
                    title: 'Soundcore Earbuds Egypt | R50i, P20i, Liberty 4 NC',
                    description: 'Compare Soundcore earbuds in Egypt: R50i, R50i NC, P20i, K20i, A30i, and Liberty models by ANC, codecs, fit, and battery. Current price and CairoVolt warranty are listed per product.',
                    keywords: 'soundcore, anker earbuds, anker headphones, soundcore earbuds, soundcore r50i, anker r50i nc, soundcore p20i, anker p2i, soundcore k20i, soundcore a30i, soundcore liberty 4 nc, soundcore liberty 5, anker r100, anker airpods, soundcore egypt, anker',
                },
                ar: {
                    title: 'سماعات ساوندكور | ايربودز ساوندكور R50i | سماعة بلوتوث',
                    description: 'قارن سماعات ساوندكور R50i وR50i NC وP20i وK20i وA30i وLiberty حسب ANC والترميزات والملاءمة والبطارية. السعر الحالي وضمان كايرو فولت موضحان لكل منتج.',
                    keywords: 'سماعات ساوندكور, ايربودز ساوندكور, ايربودز ساوندكور r50i, سماعة ساوندكور, سماعة بلوتوث ساوندكور, سماعات ساوندكور بلوتوث, ساوندكور سماعه, سماعه ساوندكور, سعر سماعة ايربودز, انكر',
                }
            },
            pageContent: {
                ar: {
                    title: 'سماعات ساوندكور الأصلية',
                    subtitle: 'ساوندكور - قارن الصوت والعزل والراحة حسب الموديل',
                    description: `
      تختلف سماعات **ساوندكور** في دعم Hi-Res Audio وLDAC وBassUp وANC وتصنيف مقاومة الماء ومدة البطارية. راجع صفحة الموديل لأن هذه الميزات لا تتوفر كلها في كل سماعة.

      **مثالية لحياتك في مصر:**
      - **زحمة المترو والميكروباص:** قارن ANC والملاءمة والميكروفونات؛ الأداء يتغير مع البيئة.
      - **جيم وتمرين:** اختر تثبيتاً مريحاً وتصنيف IP مناسباً، واتبع حدود مقاومة الماء للموديل.
      - **ألعاب:** راجع دعم Game Mode وزمن التأخير المعلن للموديل والجهاز المصدر.

      **ليه تختار ساوندكور المناسبة لك؟**
      يتيح تطبيق ساوندكور ميزات مثل EQ وHearID والتحديثات في الموديلات الداعمة. عدم تعرف التطبيق لا يثبت وحده أن السماعة مقلدة؛ راجع توافق الموديل ووسيلة الشركة الرسمية واحتفظ بالفاتورة. ضمان كايرو فولت وموعد التوصيل التقديري موضحان حسب المنتج والعنوان.

      ⬅️ تصفّح [مركز ساوندكور الكامل](/soundcore) لكل منتجات ساوندكور — ايربودز وسبيكرات في صفحة واحدة. أو تسوق [كابل انكر](/anker/cables) لشحن السماعة، [باور بانك انكر](/anker/power-banks) لتشغيلها في الرحلات، أو [سبيكر ساوندكور](/soundcore/speakers) لصوت أعلى.
    `,
                    qualityBadges: [
                        { type: 'originality', text: 'بيانات الموديل والفاتورة قابلة للمراجعة' },
                        { type: 'warranty', text: 'ضمان كايرو فولت حسب صفحة المنتج والسياسة' },
                        { type: 'expert_verified', text: 'Hi-Res وANC والترميزات حسب الموديل' }
                    ],
                    buyingGuide: [
                        {
                            title: 'دليل اختيار سماعة ساوندكور المناسبة',
                            content: `
- **R50i / P20i:** قارن التصميم والبطارية وBassUp؛ تحقق من وجود ANC في صفحة الموديل.
- **P40i / P3:** قد تتضمن ANC أو شحناً لاسلكياً أو Game Mode حسب الإصدار؛ راجع المواصفات.
- **Liberty 4 / 4 NC:** قارن LDAC وANC والمستشعرات والميكروفونات؛ ليست كل ميزة موجودة في كلا الموديلين.
`
                        },
                        {
                            title: 'تطبيق ساوندكور App',
                            content: `
تحقق أولاً من أن الموديل مدعوم في إصدار تطبيق ساوندكور الحالي. عدم تعرف التطبيق قد ينتج عن التوافق أو الإعدادات أو البرنامج ولا يثبت الأصالة وحده.
قد يتيح التطبيق EQ أو Game Mode أو تحديثات أو العثور على السماعة حسب الموديل.
`
                        }
                    ],
                    products: [
                        { name: 'Soundcore K20i', price: 750, badge: 'تصميم نصف داخل الأذن' },
                        { name: 'Soundcore R50i', price: 880, badge: 'اقتصادي ناجح' },
                        { name: 'Soundcore R50i NC', price: 1199, badge: 'ANC الغاء ضوضاء' },
                        { name: 'Soundcore A25i', price: 1370, badge: '🆕 بطارية 28 ساعة' },
                        { name: 'Soundcore P20i', price: 699, badge: 'TWS مدمجة' },
                        { name: 'Soundcore P25i', price: 770, badge: 'BassUp' },
                        { name: 'Soundcore Life U2i', price: 739, badge: 'نيكباند 22h' },
                        { name: 'Soundcore R50i Vi', price: 785, badge: 'مساعد صوتي' },
                        { name: 'Soundcore P30i', price: 1200, badge: 'XBS باس' },
                        { name: 'Soundcore A30i', price: 1450, badge: '46dB ANC' },
                        { name: 'Soundcore V20i', price: 1449, badge: 'أوبن-إير' },
                        { name: 'Soundcore Liberty Buds', price: 1750, badge: 'كلاسيكي TWS' },
                        { name: 'Soundcore P40i', price: 2052, badge: '60h بطارية' },
                        { name: 'Soundcore Liberty Air 2 Pro', price: 2150, badge: 'LDAC + Qi' },
                        { name: 'Soundcore Liberty 4 NC', price: 2570, badge: 'ANC متقدم' },
                        { name: 'Soundcore C30i', price: 2350, badge: 'فيت مفتوح' },
                        { name: 'Soundcore Life Q20', price: 2350, badge: 'هيدفون ANC' },
                        { name: 'Soundcore Q11i', price: 2312, badge: '60h هيدفون' },
                        { name: 'Soundcore P41i', price: 2439, badge: '60h + XBS' },
                        { name: 'Soundcore Q20i', price: 2522, badge: 'ANC هيدفون' },
                        { name: 'Soundcore C40i', price: 3050, badge: 'ANC مفتوح' },
                        { name: 'Soundcore Liberty 3 Pro', price: 4400, badge: 'ACAA 2.0' },
                        { name: 'Soundcore Liberty 5', price: 3997, badge: 'LDAC Hi-Res' },
                        { name: 'Soundcore Q30', price: 4649, badge: 'هيدفون بريميوم' },
                        { name: 'Soundcore Q45', price: 4685, badge: 'LDAC هيدفون' },
                        { name: 'Soundcore Space One', price: 4700, badge: 'هيدفون ANC' },
                        { name: 'Soundcore Liberty 4 Pro', price: 5830, badge: 'فلاجشيب' },
                    ]
                },
                en: {
                    title: 'Original Soundcore Earbuds',
                    subtitle: 'Compare sound, isolation, fit, and features by model',
                    description: `
      **Soundcore** earbuds vary in support for Hi-Res Audio, LDAC, BassUp, ANC, water-resistance ratings, and battery duration. Check the individual product page because these features are not available on every model.

      **Perfect for Egyptian Daily Life:**
      - **Metro & minibus commute:** Compare ANC, fit, and microphones; results vary with the environment.
      - **Gym & workouts:** Choose a secure fit and suitable IP rating, and follow the model's water-resistance limits.
      - **Gaming:** Check Game Mode support and the model's stated latency with your source device.

      **Choosing the Right Soundcore Model:**
      The Soundcore app provides EQ and features such as HearID or firmware updates on compatible models. App detection alone is not proof of authenticity; check model support, use the manufacturer's available official guidance, and retain your invoice. CairoVolt warranty duration and terms are listed per product.

      ⬅️ Visit the full [Soundcore Hub](/soundcore) to browse all Soundcore products — earbuds and speakers in one place. Also check [Anker cables](/anker/cables) to charge them, [Anker power banks](/anker/power-banks) for travel, or [Soundcore speakers](/soundcore/speakers) for louder sound.
    `,
                    qualityBadges: [
                        { type: 'originality', text: 'Model details and invoice available for review' },
                        { type: 'warranty', text: 'CairoVolt warranty per product and policy' },
                        { type: 'expert_verified', text: 'Hi-Res, ANC, and codecs vary by model' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Which Soundcore Earbud Should You Buy?',
                            content: `
- **R50i / P20i:** Compare design, rated battery, and BassUp; check the product page for ANC availability.
- **P40i / Life Note 3:** May include ANC, wireless charging, or Game Mode depending on the exact version.
- **Liberty 4 / 4 NC:** Compare LDAC, ANC, sensors, and microphones; not every feature is shared by both models.
`
                        },
                        {
                            title: 'The Soundcore App Advantage',
                            content: `
First confirm that the model is supported by the current Soundcore app version. Failure to connect may come from compatibility, settings, or firmware and does not prove authenticity by itself.
Depending on the model, the app may provide EQ, Game Mode, firmware updates, or Find My Earbuds.
`
                        }
                    ],
                    products: [
                        { name: 'Soundcore K20i', price: 750, badge: 'Semi-In-Ear' },
                        { name: 'Soundcore R50i', price: 880, badge: 'Compact TWS' },
                        { name: 'Soundcore R50i NC', price: 1199, badge: 'ANC Noise Cancel' },
                        { name: 'Soundcore A25i', price: 1370, badge: '🆕 28h Battery' },
                        { name: 'Soundcore P20i', price: 699, badge: 'Compact TWS' },
                        { name: 'Soundcore P25i', price: 770, badge: 'BassUp' },
                        { name: 'Soundcore Life U2i', price: 739, badge: 'Neckband 22h' },
                        { name: 'Soundcore R50i Vi', price: 785, badge: 'Voice Assistant' },
                        { name: 'Soundcore P30i', price: 1200, badge: 'XBS Bass' },
                        { name: 'Soundcore A30i', price: 1450, badge: '46dB ANC' },
                        { name: 'Soundcore V20i', price: 1449, badge: 'Open-Ear' },
                        { name: 'Soundcore Liberty Buds', price: 1750, badge: 'Classic TWS' },
                        { name: 'Soundcore P40i', price: 2052, badge: '60h Battery' },
                        { name: 'Soundcore Liberty Air 2 Pro', price: 2150, badge: 'LDAC + Qi' },
                        { name: 'Soundcore Liberty 4 NC', price: 2570, badge: 'Advanced ANC' },
                        { name: 'Soundcore C30i', price: 2350, badge: 'Open Fit' },
                        { name: 'Soundcore Life Q20', price: 2350, badge: 'ANC Headphones' },
                        { name: 'Soundcore Q11i', price: 2312, badge: '60h Headphones' },
                        { name: 'Soundcore P41i', price: 2439, badge: '60h + XBS' },
                        { name: 'Soundcore Q20i', price: 2522, badge: 'ANC Headphones' },
                        { name: 'Soundcore C40i', price: 3050, badge: 'ANC Open-Ear' },
                        { name: 'Soundcore Liberty 3 Pro', price: 4400, badge: 'ACAA 2.0' },
                        { name: 'Soundcore Liberty 5', price: 3997, badge: 'LDAC Hi-Res' },
                        { name: 'Soundcore Q30', price: 4649, badge: 'Premium Headphones' },
                        { name: 'Soundcore Q45', price: 4685, badge: 'LDAC Headphones' },
                        { name: 'Soundcore Space One', price: 4700, badge: 'ANC Headphones' },
                        { name: 'Soundcore Liberty 4 Pro', price: 5830, badge: 'Flagship' },
                    ]
                }
            }
        };
