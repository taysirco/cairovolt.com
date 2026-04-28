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
                        { question: 'ما الفرق بين سماعات Soundcore R50i و P20i و Liberty 4؟', answer: 'R50i (950 ج.م): الخيار الاقتصادي مع جودة صوت ممتازة وبطارية 10 ساعات. P20i (820 ج.م): نفس السعر لكن بتصميم مختلف وألوان أكثر. Liberty 4 (الأعلى): تأتي بـ ANC، Hi-Res Audio، وHearID للصوت الشخصي. اختر R50i للميزانية، Liberty 4 للتجربة الكاملة.' },
                        { question: 'هل سماعات Soundcore تدعم عزل الضوضاء ANC؟', answer: 'ليس كل الموديلات! R50i و P20i لا تحتوي ANC (لكن تعزل الضوضاء بشكل سلبي). أما Liberty 4 و P40i فتأتي بـ ANC نشط يحجب 98% من الضوضاء. إذا كنت تستخدم المواصلات كثيراً، ANC يستحق الفرق.' },
                        { question: 'كيف أعرف أن سماعة Soundcore أصلية وليست تقليد؟', answer: 'الطريقة الأضمن: حمّل تطبيق Soundcore من App Store أو Google Play وحاول ربط السماعة. إذا لم يتعرف التطبيق عليها = مقلدة 100%. المنتجات الأصلية تظهر فوراً وتتيح لك تحديث firmware وتخصيص EQ.' },
                        { question: 'أيهما أفضل: سماعات Soundcore أم AirPods؟', answer: 'يعتمد على احتياجك! AirPods ممتازة لمستخدمي آيفون وتكامل مع Apple. Soundcore تقدم نفس الجودة (أحياناً أفضل في الباس) بنصف السعر أو أقل، مع Hi-Res Audio وتطبيق تخصيص قوي. للميزانية الذكية، Soundcore هي الخيار.' },
                        { question: 'هل تطبيق Soundcore متاح بالعربي؟', answer: 'التطبيق حالياً بالإنجليزية فقط، لكنه سهل الاستخدام جداً. يتيح لك: تخصيص EQ (الصوت)، تفعيل HearID (ملف صوتي شخصي)، تحديث firmware السماعة، وتتبع السماعة إذا ضاعت. متاح مجاناً على iOS و Android.' },
                         { question: 'كم سعر سماعة Soundcore في مصر؟', answer: 'أسعار سماعات Soundcore في مصر 2026: K20i من 750 جنيه، R50i من 950 جنيه، R50i NC من 1,299 جنيه. كل الأسعار تشمل ضمان 18 شهر من كايرو فولت — الموزع المعتمد لانكر مصر.' },
                         { question: 'إيه أفضل سماعة بلوتوث انكر Soundcore في مصر؟', answer: 'يعتمد على ميزانيتك: K20i (750 ج) لأقصى راحة بدون ضغط على الأذن، R50i (950 ج) لأفضل قيمة مع باس قوي، R50i NC (1,299 ج) لإلغاء الضوضاء. كلها ايربودز ساوند كور أصلية بضمان 18 شهر من كايرو فولت.' }
                    ],
                    en: [
                        { question: 'What is the difference between Soundcore R50i, P20i, and Liberty 4?', answer: 'R50i (EGP 950): Budget-friendly with excellent sound and 10-hour battery. P20i (EGP 820): Same price, different design with more colors. Liberty 4 (Flagship): Features ANC, Hi-Res Audio, and personalized HearID. Choose R50i for budget, Liberty 4 for the full experience.' },
                        { question: 'Do Soundcore earbuds support ANC (Active Noise Cancelling)?', answer: 'Not all models feature ANC. The R50i NC and Space A40 have active noise cancellation with transparency mode, while the R50i and P2i focus on passive noise isolation. Liberty 4 & P40i come with active ANC that blocks 98% of noise. If you commute frequently, ANC is worth the upgrade.' },
                        { question: 'How can I verify if my Soundcore earbuds are genuine?', answer: 'The safest method: Download the Soundcore App from App Store or Google Play and try to pair your earbuds. If the app doesn\'t recognize them = 100% fake. Genuine products appear instantly and allow firmware updates and EQ customization.' },
                        { question: 'Which is better: Soundcore or AirPods?', answer: 'Depends on your needs! AirPods are excellent for iPhone users and Apple ecosystem. Soundcore offers the same quality (sometimes better bass) at half the price or less, with Hi-Res Audio and a powerful customization app. For smart budgets, Soundcore wins.' },
                        { question: 'Is the Soundcore app available in Arabic?', answer: 'The app is currently English-only but very user-friendly. It lets you: customize EQ (sound), activate HearID (personal audio profile), update earbuds firmware, and track lost earbuds. Available free on iOS & Android.' },
                        { question: 'How much do Soundcore earbuds cost in Egypt?', answer: 'Soundcore earbuds prices in Egypt 2026: K20i from EGP 750, R50i from EGP 950, R50i NC from EGP 1,299. All prices include 18-month warranty from CairoVolt — the authorized Anker distributor in Egypt.' },
                        { question: 'What is the best Anker Soundcore earbuds in Egypt?', answer: 'Depends on your budget: K20i (EGP 750) for maximum comfort without ear pressure, R50i (EGP 950) for best value with strong bass, R50i NC (EGP 1,299) for active noise cancellation. All are original Soundcore earbuds with 18-month CairoVolt warranty.' }
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
                    faq: [
                        {
                            question: 'هل سماعة انكر Soundcore بتشتغل مع سامسونج ولا ايفون بس؟',
                            answer: 'سماعات Soundcore بتشتغل مع أي جهاز بلوتوث — سامسونج، ايفون، هواوي، شاومي، لابتوب. اختبار CairoVolt: اقتران مع Samsung S26 في 0.2 ثانية عبر Bluetooth 5.3 بمدى 15 متر. ميزة Pop-up Pairing حصرية لايفون. تطبيق Soundcore متاح Android و iOS.'
                        },
                        {
                            question: 'هل يوجد تأخير في الصوت (Delay) مع الألعاب؟',
                            answer: 'موديلات P40i و Liberty 4 بتدعم وضع الألعاب (Game Mode) بتأخير 60ms فقط — يعني تقريباً صفر lag. R50i العادية تأخيرها ~120ms وهو مقبول للألعاب العادية. لو بتلعب PUBG أو ألعاب تنافسية، اختار موديل فيه Game Mode.'
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
                    faq: [
                        {
                            question: 'Do Anker Soundcore earbuds work with Samsung phones?',
                            answer: 'Yes! Soundcore earbuds work with any Bluetooth device — Samsung, iPhone, Huawei, Xiaomi, laptops. CairoVolt test: paired with Samsung S26 in 0.2 seconds via Bluetooth 5.3 with 15m range. Pop-up Pairing is exclusive to iPhones. Soundcore app available on both Android and iOS.'
                        },
                        {
                            question: 'Is there audio lag when gaming?',
                            answer: 'Models like P40i and Liberty 4 support Game Mode with only 60ms latency — virtually zero lag. The standard R50i has ~120ms delay which is acceptable for casual games. For competitive titles like PUBG, choose a model with dedicated Game Mode.'
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
