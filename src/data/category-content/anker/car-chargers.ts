import type { CategoryContent } from '../_types';

export const anker_car_chargers_content: CategoryContent = {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Car Chargers',
            metadata: {
                en: {
                    title: 'Anker Car Charger Egypt | Fast Charging 48W',
                    description: 'Shop original Anker Car Charger in Egypt. Fast charging 48W, dual ports. Official warranty.',
                    keywords: 'anker car charger, car charger egypt, fast car charger, anker powerdrive',
                },
                ar: {
                    title: 'شاحن سيارة انكر | Anker Car Charger Egypt - شحن سريع',
                    description: 'تسوق شاحن سيارة انكر الأصلي في مصر. شاحن سيارة انكر سريع، Anker Car Charger بأفضل سعر. شاحن سيارة سريع.',
                    keywords: 'شاحن سيارة انكر, شاحن سيارة سريع, anker car charger, شاحن سيارة',
                }
            },
            pageContent: {
                ar: {
                    title: 'شاحن سيارة انكر (شحن سريع وآمن)',
                    subtitle: 'Anker Car Charger - حول سيارتك لمحطة شحن',
                    description: `
      لا تضحي ببطارية هاتفك باستخدام شواحن سيارة رديئة تسبب سخونة زائدة.
      شواحن **Anker Car Chargers** مصممة لتعمل بكفاءة تحت أشعة الشمس المصرية الحارقة بفضل جسمها المعدني (Alloy Body) الذي يشتت الحرارة، وتقنية PowerIQ التي تضمن شحن آمن وسريع.
      
      **لماذا هو الشاحن المثالي لطرق مصر؟**
      - **ثبات في الولاعة:** تصميم محكم لا يهتز أو يفصل مع المطبات.
      - **شحن جهازين معاً:** اشحن هاتفك وهاتف الراكب بجانبك بنفس السرعة القصوى.
      - **حماية من السخونة:** نظام MultiProtect يفصل الشحن فوراً عند ارتفاع الحرارة بشكل خطر.
    `,
                    qualityBadges: [
                        { type: 'originality', text: 'جسم معدني لتشتيت الحرارة' },
                        { type: 'warranty', text: 'ضمان 18 شهر استبدال' },
                        { type: 'expert_verified', text: 'شحن سريع 48W' }
                    ],
                    buyingGuide: [
                        {
                            title: 'كيف تختار القوة المناسبة؟',
                            content: `
- **للاستخدام العادي (24W):** يشحن جهازين بسرعة عادية (12W لكل جهاز). مناسب لهواتف الاندرويد القديمة والايفون العادي.
- **للسرعة القصوى (48W+):** ضروري للايفون الحديث (14/15/16) وسامسونج. يدعم شحن PD سريع (50% في 30 دقيقة).
`
                        },
                        {
                            title: 'هل يؤثر على بطارية السيارة؟',
                            content: `
لا. شواحن انكر تستهلك طاقة لا تذكر (Micro-Amps) عندما تكون السيارة مطفأة، ولا تسبب أي تفريغ لبطارية السيارة.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'هل يمكنني شحن اللابتوب في السيارة؟',
                            answer: 'نعم، ولكن تحتاج لشاحن سيارة بقوة 65 واط أو أكثر (موديلات Anker Prime Car Charger) لضمان شحن اللابتوب أثناء الاستخدام.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerDrive Speed+ 2', price: 656, badge: 'PD سريع' },
                        { name: 'Anker 323 Car Charger (52W)', price: 656, badge: 'الأقوى' },
                        { name: 'Anker Mini Alloys', price: 656, badge: 'معدني' },
                    ]
                },
                en: {
                    title: 'Anker Car Charger (Fast & Safe)',
                    subtitle: 'Turn Your Car Into a Power Station',
                    description: `
      Don't risk your phone battery with cheap plastic car chargers that melt or overheat.
      **Anker Car Chargers** are built with a premium **Alloy Body** to dissipate heat efficiently, making them perfect for hot local summers.
      
      **Why matches Egyptian Roads?**
      - **Secure Fit:** Engineered snugs fit that won't disconnect on speed bumps.
      - **Dual Fast Charging:** Charge pilot and co-pilot devices at full speed simultaneously.
      - **Heat Protection:** MultiProtect system cuts power instantly if dangerous temperatures are detected.
    `,
                    qualityBadges: [
                        { type: 'originality', text: 'Alloy Heat Dissipation' },
                        { type: 'warranty', text: '18-Month Warranty' },
                        { type: 'expert_verified', text: '48W Fast Charging' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Choosing the Right Wattage',
                            content: `
- **Standard Use (24W):** Charges two devices at standard speed. Good for older phones or maintaining battery while using GPS.
- **Max Speed (48W+):** Essential for iPhone 14/15/16 and Samsung S-Series. Supports PD Fast Charging (0-50% in 30 mins).
`
                        },
                        {
                            title: 'Will it drain my car battery?',
                            content: `
No. Anker chargers draw negligible power when the car is off, ensuring your car battery stays safe even if you leave the charger plugged in.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Can I charge my MacBook in the car?',
                            answer: 'Yes, but you need a high-wattage model (65W+) like the Anker Prime Car Charger to charge a laptop effectively while running.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerDrive Speed+ 2', price: 656, badge: 'PD Fast' },
                        { name: 'Anker 323 Car Charger (52W)', price: 656, badge: 'Powerful' },
                        { name: 'Anker Mini Alloys', price: 656, badge: 'Metallic' },
                    ]
                }
            }
        };
