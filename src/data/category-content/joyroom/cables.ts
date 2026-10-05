import type { CategoryContent } from '../_types';

export const joyroom_cables_content: CategoryContent = {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Cables',
            metadata: {
                en: {
                    title: 'Joyroom Cable Egypt | USB-C PD and Lightning',
                    description: 'Compare Joyroom cables by connector, rated power, data support, and braiding — USB-C to Lightning, USB-C to USB-C, USB-A, and 3-in-1. Current price and CairoVolt warranty are shown per product.',
                    keywords: 'جوي روم cable, جوي روم USB-C cable, جوي روم lightning cable, جوي روم 100W cable, cable egypt, جوي روم auto disconnect, كابل جوي روم, جوي روم cable price egypt',
                },
                ar: {
                    title: 'كابل جوي روم مصر | USB-C PD وLightning',
                    description: 'قارن كابلات جوي روم حسب الموصل والقدرة المقننة ونقل البيانات والتضفير — USB-C إلى Lightning وUSB-C إلى USB-C وUSB-A و3 في 1. السعر الحالي وضمان كايرو فولت موضحان لكل منتج.',
                    keywords: 'كابل جوي روم, وصلة جيروم, سعر كابل جوي روم, كابل USB-C PD, كابل شحن سريع, كابل تايب سي 100 واط, وصلة شاحن ايفون مصر',
                }
            },
            pageContent: {
                ar: {
                    title: 'كابلات جوي روم للشحن ونقل البيانات',
                    subtitle: 'اختر الموصل والقدرة ونقل البيانات حسب الموديل',
                    description: `
      كابلات شحن **جوي روم** — أو «وصلة شاحن جوي روم» زي ما بنقول في مصر — متاحة هنا بموصلات USB-C إلى Lightning وUSB-C إلى USB-C وUSB-A إلى Lightning أو USB-C أو Micro-USB، بالإضافة إلى كابل 3 في 1. القدرة المعلنة ودعم نقل البيانات والتضفير تختلف بين الموديلات، فراجع متطلبات هاتفك وشاحنك قبل الشراء.

      **قارن المتانة والتكلفة بوضوح:**
      راجع خامة الغلاف والموصلات وتقييم الثني المعلن وضمان كايرو فولت لكل موديل. السعر الحالي يظهر في صفحة المنتج، والعمر الفعلي يعتمد على الاستخدام والثني والتخزين.

      **المتانة في ظروف مصر:**
      تساعد طبقة **النايلون المضفر** والموصلات المدعمة في الموديلات الداعمة على مقاومة الاهتراء، لكنها لا تجعل الكابل غير قابل للتلف. تجنب الحرارة المباشرة والثني الحاد. موعد التوصيل تقديري حسب العنوان. تسوق [شاحن جوي روم](/joyroom/wall-chargers) لمنظومة متوافقة.
    `,
                    qualityBadges: [
                        { type: 'warranty', text: 'ضمان كايرو فولت حسب صفحة المنتج' },
                        { type: 'expert_verified', text: 'قدرة الشحن ونقل البيانات تختلف حسب الموديل' }
                    ],
                    buyingGuide: [
                        {
                            title: 'كيف تختار الكابل المناسب؟',
                            content: `
- **USB-C إلى Lightning (20–30 واط معلنة):** لايفون بمنفذ Lightning مع شاحن USB-C PD متوافق.
- **Type-C 60W:** مناسب لأجهزة USB-C التي لا تتجاوز متطلباتها قدرة الكابل، مع شاحن متوافق.
- **Type-C 100W (JR-S-CC100):** العلبة مكتوب عليها 100 واط، لكن عيّنتنا لم تظهر فيها شريحة E-marker وبلغت ذروتها 57.9 واط — تعامل معه ككابل فئة 60 واط.
- **USB-A إلى Lightning أو USB-C أو Micro-USB:** للشواحن القديمة بمنفذ USB-A؛ لا يوفر شحن USB-C PD.
- **3 في 1 (JR-S-1830G):** Lightning وUSB-C وMicro-USB في كابل واحد؛ التيار يتوزع عند توصيل أكثر من جهاز.
`
                        },
                        {
                            title: 'هل يدعم نقل البيانات؟',
                            content: `
دعم نقل البيانات وسرعته يختلفان حسب الموديل؛ بعض الكابلات مخصصة للشحن أو تعمل بسرعة USB 2.0. راجع صفحة المنتج قبل الاعتماد عليها لنقل الملفات أو الفيديو.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل الكابل آمن على بطارية الموبايل؟',
                            answer: 'الكابل ينقل القدرة التي يتفاوض عليها الشاحن والموبايل، والموبايل هو الذي يدير الشحن ويوقفه عند الامتلاء. استخدم كابلًا مصنفًا للقدرة المطلوبة مع شاحن وجهاز متوافقين، وتوقف عن الاستخدام إذا ظهر تلف في الغلاف أو الموصل أو سخونة غير طبيعية.'
                        },
                        {
                            question: 'إيه الفرق بين كابل 60W و 100W؟',
                            answer: 'الرقم هو الحد المقنن للكابل وليس ما يفرضه على الجهاز. كابل USB-C بدون شريحة E-marker محدود بـ 3 أمبير (حوالي 60 واط)، وفي مختبرنا لم تظهر شريحة E-marker في [جوي روم JR-S-CC100](/joyroom/cables/joyroom-type-c-to-type-c-cable) المكتوب على علبته 100 واط وبلغت ذروته 57.9 واط. لشحن لابتوب فوق 60 واط اختر كابلًا مؤكدًا بشريحة E-marker وتيار 5 أمبير.'
                        },
                        {
                            // كان: "ليه كابل جوي روم أحسن من كابل أبل الأصلي؟" — ادعاء تفضيل
                            // مقارن على منتج طرف ثالث، وهو ممنوع تحريرياً. أُعيدت الصياغة إلى
                            // سؤال عن السمات التي يراجعها المشتري. لا يذكر أي كابل معروض هنا
                            // خاصية فصل تلقائي في صفحته، فحُذفت من الإجابة.
                            question: '⚠️ إيه اللي أراجعه في كابل جوي روم قبل الشراء؟',
                            answer: 'راجع القدرة المقننة ودعم PD ونقل البيانات والطول في صفحة الموديل. النايلون المضفر والموصلات المدعمة في بعض الموديلات يساعدان على مقاومة الاهتراء، لكنهما لا يغنيان عن مطابقة قدرة الكابل مع الشاحن والجهاز.'
                        },
                        {
                            question: 'الكابل ده بينقل بيانات ولا شحن بس؟',
                            answer: 'يعتمد ذلك على الموديل. راجع بند نقل البيانات في صفحة المنتج؛ فبعض الكابلات تدعم USB 2.0 وبعضها قد يكون موجهاً للشحن أساساً.'
                        },
                        {
                            question: 'الكابل بيتحمل حرارة الصيف في مصر؟',
                            answer: 'الخامة المضفرة والموصلات المدعمة تساعد على مقاومة الاهتراء، لكنها لا تضمن تحمل حرارة السيارة المغلقة. لا تترك الكابل تحت الشمس أو قرب سطح ساخن، واستبدله إذا تشقق أو ظهر معدن داخلي.'
                        }
                        ,{
                            question: '⚠️ إزاي اعرف كابل جوي روم أصلي من المقلد؟',
                            answer: 'راجع رقم الموديل والمواصفات ووسيلة التحقق الرسمية المتاحة من الشركة، واحتفظ بالفاتورة. الخامة أو كود QR أو سجل الضمان وحدها لا تثبت أصالة الشركة المصنّعة.'
                        }
                        ,{
                            question: 'هل كابل جوي روم بيشحن ايفون 17 بسرعة؟',
                            answer: 'يدعم كابل USB-C to Lightning المتوافق شحن USB-C PD عند استخدام شاحن وهاتف يدعمانه. السرعة الفعلية تعتمد على الهاتف والشاحن وحالة البطارية.'
                        }
                        ,{
                            question: 'ما ضمان كابل جوي روم من CairoVolt؟',
                            answer: 'مدة ضمان كايرو فولت ونطاق التغطية وشروط الاستبدال موضحة في صفحة المنتج وسياسة الضمان. موعد التوصيل تقديري حسب العنوان، والدفع عند الاستلام متاح للطلبات المؤهلة.'
                        }
                    ],
                },
                en: {
                    title: 'Joyroom Cables (USB-C PD & Lightning)',
                    subtitle: 'Choose the connector, power rating, data support, and model features',
                    description: `
      Joyroom charging cables here come in USB-C to Lightning, USB-C to USB-C, and USB-A to Lightning, USB-C, or Micro-USB, plus a 3-in-1 cable. Rated power, data support, and braiding vary by model, so check the exact model and the requirements of your device and charger.

      **Compare Durability and Cost Clearly:**
      Check the jacket, connector reinforcement, stated bend rating, and CairoVolt warranty for each model. The current price is shown on the product page, while service life depends on use, bending, and storage.

      **Care in Hot Conditions:**
      Braided nylon and reinforced connectors on listed models can help resist wear, but do not make a cable damage-proof. Avoid direct heat and sharp bends. Delivery timing is an estimate based on the confirmed address.
    `,
                    qualityBadges: [
                        { type: 'warranty', text: 'CairoVolt warranty as listed per product' },
                        { type: 'expert_verified', text: 'Charging and data ratings vary by model' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Choosing the Right Cable',
                            content: `
- **USB-C to Lightning (listed 20–30W):** For Lightning iPhones with a compatible USB-C PD charger.
- **Type-C 60W:** Suitable when the charger's and device's requirements do not exceed the cable rating.
- **Type-C 100W (JR-S-CC100):** The box says 100W, but our sample showed no E-marker chip and peaked at 57.9W — treat it as a 60W-class cable.
- **USB-A to Lightning, USB-C, or Micro-USB:** For older USB-A chargers; these do not provide USB-C PD charging.
- **3-in-1 (JR-S-1830G):** Lightning, USB-C, and Micro-USB on one cable; current is shared when more than one device is connected.
`
                        },
                        {
                            title: 'Does It Support Data Transfer?',
                            content: `
Data support and speed vary by model. Some cables use USB 2.0 speeds and some may be intended mainly for charging, so check the product page before relying on a cable for file or video transfer.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Is the cable safe for phone battery health?',
                            answer: 'The cable carries the power the charger and phone negotiate, and the phone manages charging and stops it when full. Use a cable rated for the required power with a compatible charger and device, and stop use if the jacket or connector is damaged or unusual heat appears.'
                        },
                        {
                            question: 'What is the difference between a 60W and a 100W cable?',
                            answer: 'The figure is the cable rated limit, not what it forces onto the device. A USB-C cable without an E-marker chip is limited to 3A (about 60W); in our lab the [Joyroom JR-S-CC100](/en/joyroom/cables/joyroom-type-c-to-type-c-cable), boxed as 100W, showed no E-marker and peaked at 57.9W. For laptop charging above 60W, choose a cable with a confirmed 5A E-marker.'
                        },
                        {
                            question: 'Warning: What should I check in a Joyroom cable before buying?',
                            answer: 'Check the rated power, PD support, data transfer, and length on the model page. Braided nylon and reinforced connectors on some models help resist wear, but they do not replace matching the cable rating to the charger and device.'
                        },
                        {
                            question: 'Does this cable transfer data or only charge?',
                            answer: 'It depends on the model. Check the data-transfer line on the product page; some cables support USB 2.0 and others may be charge-focused.'
                        },
                        {
                            question: 'Can the cable handle Egypt summer heat?',
                            answer: 'Braided material and reinforced connectors help resist wear, but they do not guarantee survival in a closed hot car. Do not leave the cable in direct sun or near a hot surface, and replace it if it cracks or internal metal shows.'
                        },
                        {
                            question: 'Warning: How can I tell an original Joyroom cable from a counterfeit?',
                            answer: 'Check the model number, specifications, and any official manufacturer verification method available, and keep the invoice. Material, QR code, or warranty record alone do not prove manufacturer authenticity.'
                        },
                        {
                            question: 'Will a Joyroom cable charge an iPhone 17 quickly?',
                            answer: 'A compatible USB-C to Lightning cable supports USB-C PD when used with a charger and phone that support it. Actual speed depends on the phone, charger, and battery condition.'
                        },
                        {
                            question: 'What warranty covers a Joyroom cable from CairoVolt?',
                            answer: 'CairoVolt warranty duration, coverage, and replacement terms are shown on the product page and warranty policy. Delivery timing is an estimate by address, and cash on delivery is available for eligible orders.'
                        }
                    ],
                }
            }
        };
