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
                    ar: 'أُطلقت ساوند كور في عام 2016 كعلامة الصوت المتخصصة من انكر، حاملةً نفس الالتزام بالجودة والابتكار الذي جعل انكر الأولى في الشحن. اليوم، خدمت ساوند كور أكثر من 100 مليون مستخدم حول العالم بسماعات ومكبرات صوت حائزة على جوائز. فلسفة العلامة بسيطة: تقديم تجارب صوتية ممتازة بأسعار معقولة. من R50i الاقتصادية إلى Liberty 4 الرائدة، كل منتج ساوند كور مُصمم بدقة ومدعوم بضمان جودة انكر.'
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
                        { question: 'هل تطبيق Soundcore متاح بالعربي؟', answer: 'التطبيق حالياً بالإنجليزية فقط، لكنه سهل الاستخدام جداً. يتيح لك: تخصيص EQ (الصوت)، تفعيل HearID (ملف صوتي شخصي)، تحديث firmware السماعة، وتتبع السماعة إذا ضاعت. متاح مجاناً على iOS و Android.' }
                    ],
                    en: [
                        { question: 'What is the difference between Soundcore R50i, P20i, and Liberty 4?', answer: 'R50i (EGP 950): Budget-friendly with excellent sound and 10-hour battery. P20i (EGP 820): Same price, different design with more colors. Liberty 4 (Flagship): Features ANC, Hi-Res Audio, and personalized HearID. Choose R50i for budget, Liberty 4 for the full experience.' },
                        { question: 'Do Soundcore earbuds support ANC (Active Noise Cancelling)?', answer: 'Not all models! R50i & P20i don\'t have ANC (but provide passive isolation). Liberty 4 & P40i come with active ANC that blocks 98% of noise. If you commute frequently, ANC is worth the upgrade.' },
                        { question: 'How can I verify if my Soundcore earbuds are genuine?', answer: 'The safest method: Download the Soundcore App from App Store or Google Play and try to pair your earbuds. If the app doesn\'t recognize them = 100% fake. Genuine products appear instantly and allow firmware updates and EQ customization.' },
                        { question: 'Which is better: Soundcore or AirPods?', answer: 'Depends on your needs! AirPods are excellent for iPhone users and Apple ecosystem. Soundcore offers the same quality (sometimes better bass) at half the price or less, with Hi-Res Audio and a powerful customization app. For smart budgets, Soundcore wins.' },
                        { question: 'Is the Soundcore app available in Arabic?', answer: 'The app is currently English-only but very user-friendly. It lets you: customize EQ (sound), activate HearID (personal audio profile), update earbuds firmware, and track lost earbuds. Available free on iOS & Android.' }
                    ]
                }
            },
            metadata: {
                en: {
                    title: 'Anker Soundcore Earbuds Egypt | R50i, P20i, Liberty',
                    description: 'Shop Anker Soundcore earbuds in Egypt. Anker R50i, P20i, Liberty. Premium audio quality with official warranty. Best prices.',
                    keywords: 'anker soundcore, anker earbuds, anker r50i, soundcore r50i, anker p20i, anker liberty',
                },
                ar: {
                    title: 'سماعات انكر Soundcore | Anker Earbuds Egypt - R50i, P20i',
                    description: 'تسوق سماعات انكر Soundcore الأصلية في مصر. anker soundcore, سماعة انكر, anker r50i, soundcore r50i, anker p20i. سماعة انكر بلوتوث بأفضل سعر.',
                    keywords: 'anker soundcore, سماعة انكر, سماعات انكر, anker r50i, soundcore r50i, anker p20i, سماعة انكر بلوتوث',
                }
            },
            pageContent: {
                ar: {
                    title: 'سماعات انكر Soundcore',
                    subtitle: 'Anker Soundcore - جودة صوت استثنائية',
                    description: `
      تسوق أفضل **سماعات انكر بلوتوث (Anker Soundcore)** الأصلية في مصر بأفضل الأسعار. استمتع بأقوى صوت محيطي وعزل للضوضاء مع أحدث موديلات مثل Soundcore R50i و P20i. بطارية تدوم طويلاً وصوت نقي جداً للمكالمات والموسيقى مع تطبيق للتحكم الكامل.
      
      **لماذا تختار سماعات انكر (Soundcore)؟**
      - **صوت مخصص لك:** إمكانية تعديل وتخصيص الصوت عبر تطبيق Soundcore المجاني ليلائم أذنك.
      - **عزل الضوضاء للشارع والمواصلات:** موديلات متقدمة تدعم عزل صوت الشارع والدوشة التلقائي.
      - **بطارية جبارة:** استمع بدون انقطاع، مع بطاريات تدوم حتى 50 ساعة مع العلبة في موديلات مختارة.
      - **أفضل قيمة مقابل سعر:** جودة تضاهي أعلى السماعات الفلاج شيب بأسعار اقتصادية ومعقولة جداً.
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
                            question: 'ما هو الفرق بين R50i و P20i؟',
                            answer: 'الفرق الرئيسي في التصميم. R50i بتصميم "عصا" أطول قليلاً وجودة مايك أفضل قليلاً، بينما P20i أصغر وأخف. الصوت والبطارية متطابقان تقريباً.'
                        },
                        {
                            question: 'هل يوجد تأخير في الصوت (Delay) مع الألعاب؟',
                            answer: 'معظم سماعات انكر الحديثة تدعم "وضع الألعاب" (Game Mode) عبر التطبيق، الذي يقلل التأخير لأقل من 70ms لتجربة لعب سلسة.'
                        }
                    ],
                    products: [
                        { name: 'Anker Soundcore R50i', price: 950, badge: 'اقتصادي ناجح' },
                        { name: 'Anker Soundcore P20i', price: 820, badge: 'Best Value' },
                        { name: 'Anker Liberty 4', price: 820, badge: 'Premium ANC' },
                    ]
                },
                en: {
                    title: 'Anker Soundcore Earbuds',
                    subtitle: 'Exceptional Audio Quality',
                    description: `
      Discover the world of **Anker Soundcore** in Egypt, where technology meets pure sound.
      Soundcore earphones are not just earbuds; they are a complete audio experience powered by **AI Audio** and the award-winning Soundcore App.
      
      **Why Choose Soundcore in?**
      - **HearID 2.0:** Analyzes your hearing and creates a personalized sound profile just for you.
      - **Adaptive ANC 3.0:** Detects environmental noise and adjusts cancellation automatically (Transport, Office, Outdoors).
      - **LDAC Hi-Res Audio:** Transmits 3x more data than standard Bluetooth for studio-quality details.
      - **Long Listing Battery:** Up to 50 hours of playtime with the case on select models.
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
                            question: 'What is the difference between R50i and P20i?',
                            answer: 'The main difference is the design. R50i has a slightly longer "stem" design (better mic), while P20i is more compact. Sound and battery are nearly identical.'
                        },
                        {
                            question: 'Is there audio lag when gaming?',
                            answer: 'Most modern Anker earbuds support "Game Mode" via the app, which reduces latency to under 70ms for a smooth gaming experience.'
                        }
                    ],
                    products: [
                        { name: 'Anker Soundcore R50i', price: 950, badge: 'Budget King' },
                        { name: 'Anker Soundcore P20i', price: 820, badge: 'Best Value' },
                        { name: 'Anker Liberty 4', price: 820, badge: 'Premium ANC' },
                    ]
                }
            }
        };
