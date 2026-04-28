import type { CategoryContent } from '../_types';

export const anker_cables_content: CategoryContent = {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Cables',
            metadata: {
                en: {
                    title: 'Anker Cable Egypt | Lightning, USB-C, PowerLine',
                    description: 'Original Anker cables in Egypt. PowerLine III Kevlar USB-C & Lightning. MFi certified, 35,000+ bend tested. ✓ CairoVolt verified ✓ 18-month warranty',
                    keywords: 'anker cable, anker lightning cable, anker type c cable, anker powerline, cable egypt',
                },
                ar: {
                    title: 'كابل انكر | Anker Cable Egypt - وصلة انكر للايفون',
                    description: 'كابل انكر الأصلي في مصر. PowerLine III Kevlar شحن سريع USB-C + Lightning. شهادة MFi، يتحمل 35,000+ ثنية. ✓ ضمان 18 شهر ✓ توصيل القاهرة',
                    keywords: 'وصلة انكر للايفون, وصله انكر, وصلة شاحن انكر, كابل شاحن انكر, كابل انكر ايفون, وصلة ايفون, anker type c cable, anker cable type c, anker usb type c, anker lightning',
                }
            },
            pageContent: {
                ar: {
                    title: 'كابلات انكر (الأكثر متانة في العالم)',
                    subtitle: 'Anker PowerLine - كابل العمر الطويل',
                    description: `
      على عكس الكابلات الرخيصة اللي بتتقطع من عند الرأس وبتظهر رسالة "ملحق غير مدعوم" — كابل **Anker PowerLine** مصنوع من ألياف **Kevlar** (نفس المستخدمة في الدروع الواقية). 35,000 ثنية. شريحة Apple MFi C94 أصلية. صفر مشاكل.

      **استثمار مش كابل:**
      كابل أبل الأصلي يتقطع بعد 6 شهور — كابل انكر PowerLine+ III يتحمل 3 سنوات استخدام يومي. ده توفير 800+ جنيه في السنة. اختبار CairoVolt: شددنا الكابل بقوة 80 كجم — لم ينقطع.

      **ليه انكر الرقم 1 عالمياً؟**
      - **Power Delivery سريع:** يشحن ايفون 17 من 0-50% في 30 دقيقة عبر USB-C
      - **معتمد MFi من أبل:** شريحة C94 = توافق تام + لا تحديثات تعطله
      - **ضمان 18 شهر CairoVolt:** استبدال فوري — اطلبه الآن وتوصيل القاهرة خلال 24 ساعة
    `,
                    qualityBadges: [
                        { type: 'originality', text: 'شريحة Apple C94 أصلية' },
                        { type: 'warranty', text: 'ضمان 18 شهر' },
                        { type: 'expert_verified', text: 'يتحمل 80 كجم شد' }
                    ],
                    buyingGuide: [
                        {
                            title: 'الفرق بين إصدارات PowerLine',
                            content: `
- **PowerLine II:** الإصدار الكلاسيكي القوي. يتحمل 12,000 ثنية. (الأكثر مبيعاً)
- **PowerLine III:** أنحف وأقوى. يتحمل 25,000 ثنية.
- **PowerLine+ III:** مغلف بالنايلون المضفر (Braided) وغير قابل للتشابك. يتحمل 35,000 ثنية.
`
                        },
                        {
                            title: 'هل يدعم الشحن السريع؟',
                            content: `
طبعاً. كابلات USB-C to Lightning و USB-C to USB-C تدعم بروتوكول PD لشحن الايفون والسامسونج واللابتوب بأقصى سرعة. تسوق شاحن انكر (/anker/wall-chargers) + كابل PowerLine = أقصى شحن سريع.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'لماذا سعر كابل انكر أغلى من الكابلات العادية؟',
                            answer: 'لأنك تشتري كابل يعيش 5 أضعاف عمر الكابل العادي — اختبار CairoVolt: 35,000 ثنية بدون أي تلف. ومعتمد رسمياً MFi يحمي دائرة شحن هاتفك.'
                        },
                        {
                            question: '⚖️ تحذير: إزاي تفرق بين كابل انكر الأصلي والمقلد؟',
                            answer: 'كابلات مقلدة كتير في السوق بتضر دائرة شحن الموبايل. الأصلي: 1) MFi معتمد — المقلد رسالة خطأ iOS 2) نايلون مجدول — المقلد بلاستيك 3) 35K ثنية — المقلد 2K 4) ضمان 18 شهر CairoVolt.'
                        },
                        {
                            question: 'ما الفرق بين وصلة انكر للايفون ووصله انكر العادية؟',
                            answer: 'وصلة انكر للايفون (Lightning أو USB-C to Lightning) معتمدة MFi — تعمل مع iOS بدون رسائل خطأ. متوفر من CairoVolt بضمان 18 شهر، توصيل القاهرة، دفع عند الاستلام.'
                        },
                        {
                            question: 'هل كابل انكر تايب سي يناسب سامسونج؟',
                            answer: 'أيوه! كابل انكر USB-C يشحن سامسونج سوبر فاست (25W+)، ويتحمل 35,000 ثنية. متوفر من CairoVolt مع ضمان 18 شهر.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerLine Select+ (Braided)', price: 508, badge: 'الأقوى' },
                        { name: 'Anker PowerLine II (USB-C to Lightning)', price: 508, badge: 'شحن سريع' },
                        { name: 'Anker 322 Cable (USB-C to USB-C)', price: 590, badge: 'اقتصادي' },
                    ]
                },
                en: {
                    title: 'Anker Cables (World\'s Strongest)',
                    subtitle: 'Anker PowerLine - The Last Cable You\'ll Buy',
                    description: `
      Unlike cheap cables that snap at the connector and trigger "Accessory Not Supported" errors — **Anker PowerLine** is made from **Kevlar fiber** (same material used in body armor). 35,000 bends. Apple MFi C94 chip. Zero issues.

      **An Investment, Not Just a Cable:**
      Apple's original cable breaks in 6 months — Anker PowerLine+ III lasts 3+ years of daily use. That's EGP 800+ saved per year. CairoVolt test: we pulled the cable with 80kg force — it didn't break.

      **Why Anker Is #1 Worldwide:**
      - **Power Delivery fast charging:** iPhone 17 from 0-50% in 30 minutes via USB-C
      - **MFi Certified by Apple:** C94 chip = perfect compatibility + no software updates will disable it
      - **18-month CairoVolt warranty:** Instant replacement — order now, next-day Cairo delivery
    `,
                    qualityBadges: [
                        { type: 'originality', text: 'Original Apple C94 Chip' },
                        { type: 'warranty', text: '18-Month Warranty — Kevlar Guaranteed' },
                        { type: 'expert_verified', text: 'Withstands 80kg Pull' }
                    ],
                    buyingGuide: [
                        {
                            title: 'PowerLine Generations Explained',
                            content: `
- **PowerLine II:** The classic Durability King. 12,000 bend lifespan. (Best Seller)
- **PowerLine III:** Slimmer yet stronger. 25,000 bend lifespan.
- **PowerLine+ III:** Premium Braided Nylon, tangle-free. 35,000 bend lifespan.
`
                        },
                        {
                            title: 'Does it support Fast Charging?',
                            content: `
Absolutely. Our USB-C to Lightning and USB-C to USB-C cables fully support PD protocols for iPhone, Samsung, and MacBooks.
`
                        }
                    ],
                    faq: [
                        {
                            question: 'Why is Anker cable more expensive?',
                            answer: 'You get 5x lifespan — CairoVolt test: 35,000 bends without damage. Plus official MFi certification protects your phone charging IC.'
                        },
                        {
                            question: '⚠️ How to spot a fake Anker cable?',
                            answer: 'Fake cables damage charging circuits. Original: 1) MFi certified — fakes trigger iOS error 2) Braided nylon — fakes are plastic 3) 35K bends — fakes 2K 4) 18-month CairoVolt warranty.'
                        },
                        {
                            question: 'Does Anker USB-C work with Samsung?',
                            answer: 'Yes! Anker USB-C cable supports Samsung Super Fast (25W+), rated for 35,000 bends. Available from CairoVolt with 18-month warranty, Cairo delivery.'
                        },
                        {
                            question: 'What is the difference between Anker iPhone cable and standard cable?',
                            answer: 'Anker iPhone cables (Lightning or USB-C to Lightning) are MFi certified — they work with iOS without error messages. Available from CairoVolt with 18-month warranty, Cairo delivery, cash on delivery.'
                        }
                    ],
                    products: [
                        { name: 'Anker PowerLine Select+ (Braided)', price: 508, badge: 'Durable' },
                        { name: 'Anker PowerLine II (USB-C to Lightning)', price: 508, badge: 'Fast Charge' },
                        { name: 'Anker 322 Cable (USB-C to USB-C)', price: 590, badge: 'Value' },
                    ]
                }
            }
        };
