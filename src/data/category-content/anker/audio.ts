import type { CategoryContent } from '../_types';

export const anker_audio_content: CategoryContent = {
            brand: 'Anker',
            brandColor: 'blue',
            categoryName: 'Audio & Earbuds',
            // Soundcore content data
            soundcoreData: {
                title: {
                    en: 'Soundcore by Anker: World\'s Leading Wireless Audio Brand',
                    ar: 'ساوند كور من انكر: العلامة الأولى عالمياً في السماعات اللاسلكية'
                },
                tagline: {
                    en: 'Hear It. Feel It.',
                    ar: 'اسمعها. عيشها.'
                },
                history: {
                    en: 'Soundcore was launched in 2016 as Anker\'s dedicated audio brand, bringing the same commitment to quality and innovation that made Anker #1 in charging. Today, Soundcore has served over 100 million users worldwide with award-winning earbuds and speakers. The brand\'s philosophy is simple: deliver premium audio experiences at accessible prices. From the budget-friendly R50i to the flagship Liberty 4, every Soundcore product is engineered with precision and backed by the Anker quality guarantee.',
                    ar: 'أُطلقت ساوند كور في عام 2016 كعلامة الصوت المتخصصة من انكر، حاملةً نفس الالتزام بالجودة والابتكار الذي جعل انكر الأولى في الشحن. اليوم، خدمت ساوند كور أكثر من 100 مليون مستخدم حول العالم بسماعات ومكبرات صوت حائزة على جوائز. فلسفة العلامة بسيطة: تقديم تجارب صوتية ممتازة بأسعار معقولة. من R50i الاقتصادية إلى Liberty 4 الرائدة — سواء كنت تبحث عن ايربودز انكر اقتصادية أو سماعة بلوتوث بإلغاء ضوضاء احترافي، انكر ساوند كور عندها الحل المناسب لميزانيتك.'
                },
                achievements: [
                    { icon: 'headphones', stat: { en: '100M+', ar: '+100 مليون' }, label: { en: 'Users Worldwide', ar: 'مستخدم حول العالم' } },
                    { icon: 'star', stat: { en: '4.8/5', ar: '4.8/5' }, label: { en: 'Average Rating', ar: 'متوسط التقييم' } },
                    { icon: 'trophy', stat: { en: '#1', ar: 'رقم 1' }, label: { en: 'Budget Earbuds Brand', ar: 'ماركة سماعات اقتصادية' } },
                    { icon: 'phone', stat: { en: '10M+', ar: '+10 مليون' }, label: { en: 'App Downloads', ar: 'تحميل للتطبيق' } },
                    { icon: 'music', stat: { en: '2016', ar: '2016' }, label: { en: 'Year Launched', ar: 'سنة الإطلاق' } },
                    { icon: 'globe', stat: { en: '50+', ar: '+50' }, label: { en: 'Countries', ar: 'دولة' } }
                ],
                technologies: [
                    { name: 'Hi-Res Audio', icon: 'music', description: { en: 'LDAC & aptX HD support for lossless audio quality up to 990kbps. Certified by Japan Audio Society for true audiophile experience.', ar: 'دعم LDAC و aptX HD لجودة صوت بدون فقدان حتى 990kbps. معتمدة من جمعية الصوت اليابانية لتجربة صوتية حقيقية.' } },
                    { name: 'ANC (Active Noise Cancelling)', icon: 'mute', description: { en: 'Advanced noise cancellation that blocks up to 98% of ambient noise. Perfect for commutes, flights, and focused work.', ar: 'عزل ضوضاء متقدم يحجب حتى 98% من الأصوات المحيطة. مثالي للمواصلات والسفر والتركيز.' } },
                    { name: 'HearID', icon: 'brain', description: { en: 'AI-powered personalized audio profile. The Soundcore app analyzes your hearing and creates a custom EQ just for your ears.', ar: 'ملف صوتي شخصي بالذكاء الاصطناعي. تطبيق ساوند كور يحلل سمعك وينشئ EQ مخصص لأذنيك.' } },
                    { name: '360° BassUp', icon: 'speaker', description: { en: 'Proprietary bass enhancement technology for speakers. Delivers powerful, room-filling sound in all directions.', ar: 'تقنية تعزيز الباس الحصرية للسبيكرات. تقدم صوتاً قوياً يملأ الغرفة من كل الاتجاهات.' } },
                    { name: 'LDAC Codec', icon: 'satellite', description: { en: 'Sony\'s premium wireless audio codec supported by Soundcore. Transmits 3x more data than standard Bluetooth for studio-quality sound.', ar: 'كودك الصوت اللاسلكي المتميز من سوني مدعوم في ساوند كور. ينقل 3 أضعاف البيانات لجودة صوت الاستوديو.' } }
                ],
                useCases: [
                    { icon: 'running', title: { en: 'Sports & Fitness', ar: 'رياضة ولياقة' }, description: { en: 'Sweat-proof IPX5 earbuds with secure fit. Beat your workout with bass that moves you.', ar: 'سماعات مقاومة للعرق IPX5 بتثبيت آمن. تغلب على تمرينك بباس يحركك.' } },
                    { icon: 'plane', title: { en: 'Commute & Travel', ar: 'مواصلات وسفر' }, description: { en: 'ANC earbuds that turn chaos into calm. Block out the world and enjoy your music.', ar: 'سماعات ANC تحول الفوضى لهدوء. احجب العالم واستمتع بموسيقاك.' } },
                    { icon: 'home', title: { en: 'Home & Living', ar: 'منزل ومعيشة' }, description: { en: 'Speakers that fill every corner. From Motion+ Hi-Res to Flare 2 party lights.', ar: 'سبيكرات تملأ كل ركن. من Motion+ عالي الدقة لـ Flare 2 بإضاءة الحفلات.' } },
                    { icon: 'party', title: { en: 'Outdoor & Party', ar: 'حفلات ورحلات' }, description: { en: 'Waterproof speakers with 360° sound. IPX7 rated for pool parties and beach days.', ar: 'سبيكرات مقاومة للماء بصوت 360 درجة. تصنيف IPX7 لحفلات المسبح والشاطئ.' } }
                ],
                trustBadges: [
                    { icon: 'music', title: { en: 'Hi-Res Certified', ar: 'صوت Hi-Res معتمد' }, description: { en: 'Japan Audio Society', ar: 'جمعية الصوت اليابانية' } },
                    { icon: 'shield', title: { en: '12-Month Warranty', ar: 'ضمان 12 شهر' }, description: { en: 'Instant replacement', ar: 'استبدال فوري' } },
                    { icon: 'phone', title: { en: 'Soundcore App', ar: 'تطبيق Soundcore' }, description: { en: 'Free EQ & Updates', ar: 'EQ مجاني وتحديثات' } },
                    { icon: 'phone', title: { en: 'iOS/Android', ar: 'iOS/Android' }, description: { en: 'Full compatibility', ar: 'توافق كامل' } },
                    { icon: 'star', title: { en: '4.8/5 Rating', ar: 'تقييم 4.8/5' }, description: { en: 'Global average', ar: 'متوسط عالمي' } },
                    { icon: 'globe', title: { en: 'World\'s Leading', ar: 'الأولى عالمياً' }, description: { en: 'Wireless audio brand', ar: 'في السماعات اللاسلكية' } }
                ],
                faq: {
                    ar: [
                        { question: 'ما الفرق بين سماعات Soundcore R50i و K20i و R50i NC؟', answer: 'شوف دليل الشراء بالأعلى للمقارنة التفصيلية. باختصار: K20i للراحة، R50i لأفضل قيمة صوتية، R50i NC لو محتاج إلغاء ضوضاء.' },
                        { question: 'هل سماعات Soundcore تدعم عزل الضوضاء ANC؟', answer: 'R50i NC و P40i عندهم ANC نشط بيحجب 98% من الضوضاء. باقي الموديلات (R50i، K20i، P20i) فيها عزل سلبي بس. لو بتركب مترو أو ميكروباص كتير، ANC يستاهل الفرق.' },
                        { question: 'أيهما أفضل: سماعات Soundcore أم AirPods؟', answer: 'AirPods أفضل لتكامل Apple ecosystem. Soundcore بتقدم باس أقوى + Hi-Res Audio + تطبيق تخصيص EQ — بأقل من نص السعر. للميزانية الذكية Soundcore بتكسب.' },
                        { question: 'هل سماعات Soundcore بتشتغل مع ايفون 17 وسامسونج S26؟', answer: 'أيوه — كل موديلات Soundcore بتدعم Bluetooth 5.3 فبتشتغل مع أي موبايل (ايفون، سامسونج، شاومي، أوبو). التطبيق متاح مجاناً على iOS و Android.' },
                        { question: 'كام سنة بتعيش سماعات Soundcore؟', answer: 'بالاستخدام اليومي المعتدل: 2-3 سنين. البطارية بتحتفظ بـ 80% من سعتها بعد 500 دورة شحن. الضمان من CairoVolt يغطي 18 شهر استبدال فوري.' }
                    ],
                    en: [
                        { question: 'What is the difference between Soundcore R50i, K20i, and R50i NC?', answer: 'See our buying guide above for the full comparison. Quick summary: K20i for comfort, R50i for best sound value, R50i NC if you need active noise cancellation.' },
                        { question: 'Do Soundcore earbuds support ANC (Active Noise Cancelling)?', answer: 'R50i NC and P40i have active ANC blocking 98% of noise. Other models (R50i, K20i, P20i) use passive isolation only. If you commute frequently on Metro or minibus, ANC is worth the upgrade.' },
                        { question: 'Which is better: Soundcore or AirPods?', answer: 'AirPods excel in Apple ecosystem integration. Soundcore delivers stronger bass + Hi-Res Audio + EQ customization app — at less than half the price. For smart budgets, Soundcore wins.' },
                        { question: 'Do Soundcore earbuds work with iPhone 17 and Samsung S26?', answer: 'Yes — all Soundcore models support Bluetooth 5.3 and work with any phone (iPhone, Samsung, Xiaomi, Oppo). The free Soundcore app is available on both iOS and Android.' },
                        { question: 'How long do Soundcore earbuds last?', answer: 'With moderate daily use: 2-3 years. Battery retains 80% capacity after 500 charge cycles. CairoVolt warranty covers 18 months with instant replacement.' }
                    ]
                }
            },
            metadata: {
                en: {
                    title: 'Anker Soundcore Earbuds Egypt | R50i, P20i, Liberty',
                    description: 'Shop Anker Soundcore earbuds in Egypt. Anker R50i, P20i, Liberty. Premium audio quality with official warranty. Best prices.',
                    keywords: 'anker soundcore, anker earbuds, anker headphones, soundcore r50i, soundcore egypt, anker airpods, airpods anker, soundcore headphones, soundcore earbuds',
                },
                ar: {
                    title: 'سماعات انكر Soundcore | Anker Earbuds Egypt - R50i, P20i',
                    description: 'تسوق سماعات انكر Soundcore الأصلية في مصر. anker soundcore, سماعة انكر, anker r50i, soundcore r50i, anker p20i. سماعة انكر بلوتوث بأفضل سعر.',
                    keywords: 'سماعة انكر, سماعات انكر, سماعه انكر, ايربودز انكر, سماعة بلوتوث انكر, سماعة soundcore, انكر ساوند كور, سماعات انكر ساوند كور بلوتوث, anker soundcore',
                }
            },
            pageContent: {
                ar: {
                    title: 'سماعات انكر Soundcore',
                    subtitle: 'Anker Soundcore - جودة صوت استثنائية',
                    description: `
      80% من السماعات في السوق المصري صوتها بيتشوه عند أعلى مستوى — وبتموت بعد 3 شهور. سماعات **انكر ساوند كور (Anker Soundcore)** معتمدة **Hi-Res Audio** من جمعية الصوت اليابانية + **IPX5** مقاومة العرق + شهادة CE. تقنية **BassUp** حصرية. بطارية تصل لـ 50 ساعة.

      **مثالية لحياتك في مصر:**
      - **زحمة المترو والميكروباص:** ANC بيحجب 98% من الدوشة — اتكلم في التليفون بوضوح
      - **جيم وتمرين:** IPX5 مقاومة للعرق والحرارة — مش هتقع من ودنك
      - **ألعاب:** وضع Game Mode بتأخير 60ms فقط — صفر lag

      **ليه ساوند كور مش أي سماعة؟**
      تطبيق Soundcore المجاني بيخصص الصوت لأذنك بالذات (HearID). لو التطبيق مش شاف السماعة = مقلدة 100%. اطلبها الآن — ضمان 18 شهر + توصيل القاهرة خلال 24 ساعة. تسوق كابل انكر (/anker/cables) لشحن السماعة أو باور بانك انكر (/anker/power-banks) لتشغيلها في الرحلات.
    `,
                    qualityBadges: [
                        { type: 'originality', text: 'وكيل معتمد (سيريال أصلي)' },
                        { type: 'warranty', text: 'ضمان 18 شهر استبدال' },
                        { type: 'expert_verified', text: 'جودة صوت Hi-Res' }
                    ],
                    buyingGuide: [
                        {
                            title: 'دليل اختيار سماعة انكر المناسبة',
                            content: `
- **الفئة الاقتصادية (R50i / P20i):** أفضل قيمة مقابل سعر. صوت قوي (BassUp)، بطارية ممتازة، وتصميم مريح. (بدون عزل ضوضاء)
- **الفئة المتوسطة (P40i / P3):** تدعم عزل الضوضاء (ANC)، علبة شحن لاسلكي، ووضع الألعاب (Game Mode).
- **فئة الفلاجشيب (Liberty 4 / 4 NC):** قمة الصوتيات. دعم LDAC، تتبع ضربات القلب (في Liberty 4)، وأفضل ميكروفونات للمكالمات في السوق.
`
                        },
                        {
                            title: 'تطبيق Soundcore App',
                            content: `
تأكد دائماً من تحميل تطبيق Soundcore. إذا لم تتعرف السماعة على التطبيق، فهذا يعني أنها **غير أصلية**.
التطبيق يتيح لك: تعديل الـ EQ، تفعيل وضع الألعاب، تحديث السوفتوير، والبحث عن السماعة المفقودة.
`
                        }
                    ],
                    products: [
                        { name: 'Anker Soundcore K20i', price: 750, badge: 'أريح تصميم' },
                        { name: 'Anker Soundcore R50i', price: 950, badge: 'اقتصادي ناجح' },
                        { name: 'Anker Soundcore R50i NC', price: 1299, badge: 'ANC الغاء ضوضاء' },
                        { name: 'Anker Soundcore P20i', price: 820, badge: 'Best Value' },
                    ]
                },
                en: {
                    title: 'Anker Soundcore Earbuds',
                    subtitle: 'Exceptional Audio Quality',
                    description: `
      80% of earbuds in the Egyptian market distort at max volume — and die within 3 months. **Anker Soundcore** earbuds are **Hi-Res Audio certified** by the Japan Audio Society + proprietary **BassUp** technology. Battery life up to 50 hours.

      **Perfect for Egyptian Daily Life:**
      - **Metro & minibus commute:** ANC blocks 98% of ambient noise — crystal clear calls
      - **Gym & workouts:** IPX5 sweat-proof — won't fall out during intense sessions
      - **Gaming:** Game Mode with only 60ms latency — zero lag

      **Why Soundcore Over Any Earbuds?**
      The free Soundcore app personalizes sound to YOUR ears (HearID). If the app doesn't detect the earbuds = 100% fake. CairoVolt verified — 18-month warranty + next-day Cairo delivery.
    `,
                    qualityBadges: [
                        { type: 'originality', text: 'Authorized Dealer (Original Serial)' },
                        { type: 'warranty', text: '18-Month Exchange Warranty' },
                        { type: 'expert_verified', text: 'Hi-Res Audio Certified' }
                    ],
                    buyingGuide: [
                        {
                            title: 'Which Anker Earbud Should You Buy?',
                            content: `
- **Budget Series (R50i / P20i):** Best value for money. Powerful sound (BassUp), excellent battery, comfortable fit. (No ANC).
- **Mid-Range Series (P40i / Life Note 3):** Supports Active Noise Cancellation (ANC), Wireless Charging Case, and Game Mode.
- **Flagship Series (Liberty 4 / 4 NC):** The pinnacle of audio. Supports LDAC, Heart Rate Tracking (Liberty 4), and best-in-class Microphones.
`
                        },
                        {
                            title: 'The Soundcore App Advantage',
                            content: `
Always ensure you download the Soundcore App. If the app doesn't recognize your earbuds, **they are likely fake**.
The App allows you to: Customize EQ, Enable Game Mode, Update Firmware, and Find My Earbuds.
`
                        }
                    ],
                    products: [
                        { name: 'Anker Soundcore K20i', price: 750, badge: 'Most Comfortable' },
                        { name: 'Anker Soundcore R50i', price: 950, badge: 'Budget King' },
                        { name: 'Anker Soundcore R50i NC', price: 1299, badge: 'ANC Noise Cancel' },
                        { name: 'Anker Soundcore P20i', price: 820, badge: 'Best Value' },
                    ]
                }
            }
        };
