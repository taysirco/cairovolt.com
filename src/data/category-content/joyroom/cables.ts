import type { CategoryContent } from '../_types';

export const joyroom_cables_content: CategoryContent = {
            brand: 'Joyroom',
            brandColor: 'red',
            categoryName: 'Cables',
            metadata: {
                en: {
                    title: 'Joyroom Cable Egypt | USB-C PD, Lightning and Auto-Disconnect',
                    description: 'Compare Joyroom cables by connector, rated power, data support, braiding, and Auto-Disconnect on listed models. Current price and CairoVolt warranty are shown per product.',
                    keywords: 'جوي روم cable, جوي روم USB-C cable, جوي روم lightning cable, جوي روم 100W cable, cable egypt, جوي روم auto disconnect, كابل جوي روم, جوي روم cable price egypt',
                },
                ar: {
                    title: 'كابل جوي روم مصر | USB-C PD وLightning وفصل تلقائي',
                    description: 'قارن كابلات جوي روم حسب الموصل والقدرة المقننة ونقل البيانات والتضفير والفصل التلقائي في الموديلات الداعمة. السعر الحالي وضمان كايرو فولت موضحان لكل منتج.',
                    keywords: 'كابل جوي روم, وصلة جيروم, سعر كابل جوي روم, كابل USB-C PD, كابل شحن سريع, كابل تايب سي 100 واط, وصلة شاحن ايفون مصر',
                }
            },
            pageContent: {
                ar: {
                    title: 'كابلات جوي روم للشحن ونقل البيانات',
                    subtitle: 'اختر الموصل والقدرة وميزة الفصل التلقائي حسب الموديل',
                    description: `
      يذكر موديل جوي روم S-M411 ميزة **الفصل التلقائي** وفق مواصفات المنتج، بينما تختلف الميزة والقدرة ودعم نقل البيانات بين بقية الكابلات. راجع متطلبات هاتفك وشاحنك قبل الشراء.

      **قارن المتانة والتكلفة بوضوح:**
      راجع خامة الغلاف والموصلات وتقييم الثني المعلن وضمان كايرو فولت لكل موديل. السعر الحالي يظهر في صفحة المنتج، والعمر الفعلي يعتمد على الاستخدام والثني والتخزين.

      **المتانة في ظروف مصر:**
      تساعد طبقة **النايلون المضفر** والموصلات المدعمة في الموديلات الداعمة على مقاومة الاهتراء، لكنها لا تجعل الكابل غير قابل للتلف. تجنب الحرارة المباشرة والثني الحاد. موعد التوصيل تقديري حسب العنوان. تسوق [شاحن جوي روم](/joyroom/wall-chargers) لمنظومة متوافقة.
    `,
                    qualityBadges: [
                        { type: 'originality', text: 'الفصل التلقائي في الموديلات الداعمة' },
                        { type: 'warranty', text: 'ضمان كايرو فولت حسب صفحة المنتج' },
                        { type: 'expert_verified', text: 'قدرة الشحن ونقل البيانات تختلف حسب الموديل' }
                    ],
                    buyingGuide: [
                        {
                            title: 'كيف تختار الكابل المناسب؟',
                            content: `
- **S-M411 (للايفون القديم):** كابل قماشي، يدعم الفصل التلقائي، ولمبة LED بتنور لما يشحن وتطفي لما يفصل.
- **Type-C 60W:** مناسب لأجهزة USB-C التي لا تتجاوز متطلباتها قدرة الكابل، مع شاحن متوافق.
- **Type-C 100W:** مناسب لبعض اللابتوبات والأجهزة الأعلى قدرة عند استخدام شاحن وبروتوكول متوافقين؛ الجهاز يسحب فقط ما يدعمه.
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
                            answer: 'بعض الموديلات تستخدم شريحة Smart IC وتدعم الفصل التلقائي حسب مواصفات المنتج. استخدم الكابل مع شاحن وجهاز متوافقين وتوقف عن الاستخدام إذا ظهر تلف أو سخونة غير طبيعية.'
                        },
                        {
                            question: 'إيه الفرق بين كابل 60W و 100W؟',
                            answer: 'الرقم هو الحد المقنن للكابل وليس ما يفرضه على الجهاز. اختر 60W أو 100W وفق قدرة الشاحن والجهاز، وتحقق من دعم PD ومن تصنيف الكابل المناسب لبعض القدرات الأعلى.'
                        },
                        {
                            question: '⚠️ ليه كابل جوي روم أحسن من كابل أبل الأصلي؟',
                            answer: 'خاصية Auto-Disconnect في الموديلات الداعمة توقف التغذية بعد اكتمال الشحن، والنايلون المضفر والموصلات المدعمة يساعدان على مقاومة الاهتراء. راجع تقييم الثني والضمان لكل موديل.'
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
                    products: [
                        { name: 'Joyroom Light Speed (Auto-Stop)', price: 118, badge: 'Auto-Stop حسب الموديل' },
                        { name: 'Joyroom 100W Type-C', price: 123, badge: 'للابتوب' },
                        { name: 'Joyroom 3-in-1 Braided', price: 237, badge: 'عملي' },
                    ]
                },
                en: {
                    title: 'Joyroom Cables (Auto-Disconnect Tech)',
                    subtitle: 'Choose the connector, power rating, data support, and model features',
                    description: `
      Joyroom lists **Auto-Disconnect** for the S-M411 according to its product specification. Features, rated power, and data support vary across the range, so check the exact model and the requirements of your device and charger.

      **Compare Durability and Cost Clearly:**
      Check the jacket, connector reinforcement, stated bend rating, and CairoVolt warranty for each model. The current price is shown on the product page, while service life depends on use, bending, and storage.

      **Care in Hot Conditions:**
      Braided nylon and reinforced connectors on listed models can help resist wear, but do not make a cable damage-proof. Avoid direct heat and sharp bends. Delivery timing is an estimate based on the confirmed address.
    `,
                    qualityBadges: [
                        { type: 'originality', text: 'Auto-Disconnect on supported models' },
                        { type: 'warranty', text: 'CairoVolt warranty as listed per product' },
                        { type: 'expert_verified', text: 'Charging and data ratings vary by model' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Choosing the Right Cable',
                            content: `
- **S-M411 (Listing):** Fabric braided with listed Auto-Disconnect and LED indicator features; check connector compatibility with the exact iPhone model.
- **Type-C 60W:** Suitable when the charger's and device's requirements do not exceed the cable rating.
- **Type-C 100W:** Suitable for some higher-power laptops and devices with a compatible charger and protocol; the device draws only what it supports.
`
                        },
                        {
                            title: 'Does It Support Data Transfer?',
                            content: `
Data support and speed vary by model. Some cables use USB 2.0 speeds and some may be intended mainly for charging, so check the product page before relying on a cable for file or video transfer.
`
                        }
                    ],
                    products: [
                        { name: 'Joyroom Light Speed (Auto-Stop)', price: 118, badge: 'Auto-Stop by Model' },
                        { name: 'Joyroom 100W Type-C', price: 123, badge: 'Laptop Ready' },
                        { name: 'Joyroom 3-in-1 Braided', price: 237, badge: 'Multi-Use' },
                    ]
                }
            }
        };
