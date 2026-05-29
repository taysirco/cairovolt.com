/**
 * Recommended Arab Tech Creators — independent reviewers CairoVolt recommends following.
 *
 * IMPORTANT: These are NOT CairoVolt employees, authors, or affiliates. This file
 * powers a curated "experts we recommend" directory. Their `title`/`role` describe
 * who they really are publicly (their own channels), NOT any position at CairoVolt.
 * Do not present them as staff, do not attribute CairoVolt content to them, and do
 * not list them as Organization `member` — that would be misrepresentation.
 *
 * Each entry has verified social links. Photos at: /images/blog/authors/<id>.webp
 */

export interface RecommendedCreator {
    id: string;
    name: { ar: string; en: string };
    /** The creator's real public specialty/headline — describes their own work, not a CairoVolt role */
    title: { ar: string; en: string };
    /** The creator's real public role (e.g. channel owner / independent reviewer) */
    role: { ar: string; en: string };
    bio: { ar: string; en: string };
    expertise: { ar: string[]; en: string[] };
    avatar: string;
    country: 'EG' | 'JO' | 'SA' | 'AE';
    url?: string;
    socials: {
        youtube?: string;
        instagram?: string;
        facebook?: string;
        twitter?: string;
        tiktok?: string;
        website?: string;
    };
}

export const recommendedCreators: RecommendedCreator[] = [
    {
        id: 'yehia_radwan',
        name: { ar: 'يحيى رضوان', en: 'Yehia Radwan' },
        title: {
            ar: 'صانع محتوى تقني — مراجعات هواتف وإكسسوارات شحن',
            en: 'Tech Content Creator — Phone & Charging Accessory Reviews',
        },
        role: {
            ar: 'صانع محتوى تقني مستقل',
            en: 'Independent Tech Creator',
        },
        bio: {
            ar: 'صانع محتوى تقني مصري ومن أكثر المراجعين تأثيراً في الوطن العربي. متخصص في مراجعات الهواتف الذكية واختبار إكسسوارات الشحن والباور بانك تحت ظروف الاستخدام الحقيقي في مصر.',
            en: 'Egyptian tech content creator and one of the most influential reviewers in the Arab world. Specializes in smartphone reviews and real-world testing of charging accessories and power banks under Egyptian conditions.',
        },
        expertise: {
            ar: ['مراجعة الهواتف', 'اختبار الشواحن', 'مقارنات الأداء', 'تقنيات الشحن السريع'],
            en: ['Smartphone Reviews', 'Charger Testing', 'Performance Benchmarks', 'Fast Charging Tech'],
        },
        avatar: '/images/blog/authors/yehia_radwan.webp',
        country: 'EG',
        url: 'https://www.youtube.com/@YehiaRadwan',
        socials: {
            youtube: 'https://www.youtube.com/@YehiaRadwan',
            instagram: 'https://www.instagram.com/yehiaradwanofficial',
            facebook: 'https://www.facebook.com/YehiaRadwanOfficial',
            twitter: 'https://twitter.com/YR_YehiaRadwan',
        },
    },
    {
        id: 'ahmed_medhat',
        name: { ar: 'أحمد مدحت', en: 'Ahmed Medhat' },
        title: {
            ar: 'باحث تقني — فيزياء الشحن وتقنيات GaN',
            en: 'Tech Researcher — Charging Physics & GaN Technology',
        },
        role: {
            ar: 'صانع محتوى تقني مستقل',
            en: 'Independent Tech Creator',
        },
        bio: {
            ar: 'باحث وصانع محتوى تقني مصري متخصص في تبسيط العلوم المعقدة وراء تقنيات الشحن الحديثة. يشرح الفرق بين تقنيات GaN والسيليكون، وأسباب تدهور البطاريات، وفيزياء التوصيل الحراري بأسلوب علمي مبسط.',
            en: 'Egyptian tech researcher and content creator specializing in simplifying complex charging technologies. Explains GaN vs Silicon differences, battery degradation causes, and thermal conductivity physics in accessible terms.',
        },
        expertise: {
            ar: ['تقنية GaN', 'فيزياء البطاريات', 'تحليل الشحن السريع', 'حماية الأجهزة'],
            en: ['GaN Technology', 'Battery Physics', 'Fast Charging Analysis', 'Device Protection'],
        },
        avatar: '/images/blog/authors/ahmed_medhat.webp',
        country: 'EG',
        url: 'https://www.youtube.com/@AhmedMedhat1719',
        socials: {
            youtube: 'https://www.youtube.com/@AhmedMedhat1719',
        },
    },
    {
        id: 'mohamed_hakimo',
        name: { ar: 'محمد حكيم', en: 'Mohamed Hakimo' },
        title: {
            ar: 'خبير مراجعة إكسسوارات الشحن والصوتيات',
            en: 'Charging & Audio Accessories Review Expert',
        },
        role: {
            ar: 'مراجع إكسسوارات ومقارنات الماركات',
            en: 'Accessories Reviewer & Brand Comparisons',
        },
        bio: {
            ar: 'مراجع تقني عربي متخصص في اختبار إكسسوارات الشحن والصوتيات. يستخدم أجهزة قياس احترافية (USB Testers) للتحقق من القدرة الفعلية للشواحن ويقدم مقارنات تفصيلية بين Anker وUgreen وBaseus وJoyroom.',
            en: 'Arab tech reviewer specializing in charging and audio accessories testing. Uses professional USB testers to verify actual charger output and delivers detailed brand comparisons between Anker, Ugreen, Baseus, and Joyroom.',
        },
        expertise: {
            ar: ['اختبار الشواحن بأجهزة القياس', 'مقارنات ماركات الإكسسوارات', 'سماعات بلوتوث', 'باور بانك'],
            en: ['Charger Testing with Meters', 'Accessory Brand Comparisons', 'Bluetooth Earbuds', 'Power Banks'],
        },
        avatar: '/images/blog/authors/mohamed_hakimo.webp',
        country: 'AE',
        url: 'https://www.youtube.com/@MohamedHakimo',
        socials: {
            youtube: 'https://www.youtube.com/@MohamedHakimo',
            instagram: 'https://www.instagram.com/mohamedhakimoofficial',
            facebook: 'https://www.facebook.com/mohamedhakimoofficial',
            twitter: 'https://twitter.com/mohamedhakimo_',
            tiktok: 'https://www.tiktok.com/@mohamedhakimoofficial',
        },
    },
    {
        id: 'hazem_adel',
        name: { ar: 'حازم عادل', en: 'Hazem Adel' },
        title: {
            ar: 'مراجع هواتف وإكسسوارات تقنية',
            en: 'Smartphone & Tech Accessories Reviewer',
        },
        role: {
            ar: 'مراجع منتجات ومختبر أداء',
            en: 'Product Reviewer & Performance Tester',
        },
        bio: {
            ar: 'صانع محتوى تقني مصري يقدم مراجعات عملية وشاملة للهواتف الذكية وإكسسواراتها. يركز على تجربة الاستخدام اليومي ومقارنة المنتجات في الفئات السعرية المختلفة المتاحة في السوق المصري.',
            en: 'Egyptian tech content creator delivering practical and comprehensive reviews of smartphones and accessories. Focuses on daily usage experience and product comparisons across different price ranges available in the Egyptian market.',
        },
        expertise: {
            ar: ['مراجعات الهواتف', 'إكسسوارات تقنية', 'اختبار الأداء', 'ترشيحات الشراء'],
            en: ['Smartphone Reviews', 'Tech Accessories', 'Performance Testing', 'Buying Recommendations'],
        },
        avatar: '/images/blog/authors/hazem_adel.webp',
        country: 'EG',
        url: 'https://www.youtube.com/@7azemadel',
        socials: {
            youtube: 'https://www.youtube.com/@7azemadel',
        },
    },
    {
        id: 'ashraf_zamka',
        name: { ar: 'أشرف مصطفى', en: 'Ashraf Mustafa' },
        title: {
            ar: 'مراجع تقني مستقل — يشتري المنتجات بماله الخاص',
            en: 'Independent Tech Reviewer — Self-Funded Product Testing',
        },
        role: {
            ar: 'مراجع مستقل وخبير حيادية',
            en: 'Independent Reviewer & Neutrality Expert',
        },
        bio: {
            ar: 'التقني أشرف مصطفى — مراجع مصري مستقل يتجاوز المليون متابع على يوتيوب. يشتري كل جهاز يراجعه بماله الخاص ويرفض الإعلانات المدفوعة من الشركات لضمان حيادية رأيه. يراجع الشواحن والباور بانك بانتظام.',
            en: 'Ashraf Mustafa — independent Egyptian reviewer with over 1M YouTube subscribers. Purchases every product he reviews with his own money and refuses paid sponsorships from companies to maintain unbiased opinions. Regularly reviews chargers and power banks.',
        },
        expertise: {
            ar: ['مراجعات مستقلة', 'باور بانك وشواحن', 'نصائح شراء', 'حماية المستهلك'],
            en: ['Independent Reviews', 'Power Banks & Chargers', 'Buying Advice', 'Consumer Protection'],
        },
        avatar: '/images/blog/authors/ashraf_zamka.webp',
        country: 'EG',
        url: 'https://www.youtube.com/@ashrafzamka',
        socials: {
            youtube: 'https://www.youtube.com/@ashrafzamka',
            tiktok: 'https://www.tiktok.com/@ashrafzamka',
        },
    },
    {
        id: 'salah_hamed',
        name: { ar: 'صلاح حامد', en: 'Salah G. Hamed' },
        title: {
            ar: 'مؤسس أندرويد باشا — رائد المحتوى التقني العربي',
            en: 'Founder of Android Basha — Arab Tech Content Pioneer',
        },
        role: {
            ar: 'مؤسس شبكة باشا ميديا',
            en: 'Founder, Basha Media Network',
        },
        bio: {
            ar: 'مؤسس شبكة باشا ميديا ومن أوائل صناع المحتوى التقني في المنطقة العربية. يمتلك شبكة قنوات متخصصة (أندرويد باشا، كاميرا باشا، جيمنج باشا). خبرة تتجاوز العقد في مراجعة الأجهزة والإكسسوارات التقنية.',
            en: 'Founder of Basha Media Network and one of the first tech content creators in the Arab region. Runs specialized channels (Android Basha, Camera Basha, Gaming Basha). Over a decade of experience reviewing devices and tech accessories.',
        },
        expertise: {
            ar: ['مراجعات شاملة', 'تغطية مؤتمرات', 'مقارنات أنظمة التشغيل', 'إكسسوارات تقنية'],
            en: ['Comprehensive Reviews', 'Event Coverage', 'OS Comparisons', 'Tech Accessories'],
        },
        avatar: '/images/blog/authors/salah_hamed.webp',
        country: 'JO',
        url: 'https://www.youtube.com/@AndroidBasha',
        socials: {
            youtube: 'https://www.youtube.com/@AndroidBasha',
            instagram: 'https://www.instagram.com/SalahGHamed',
            facebook: 'https://www.facebook.com/SalahGHamed',
            twitter: 'https://twitter.com/SalahGHamed',
        },
    },
    {
        id: 'faisal_alsaif',
        name: { ar: 'فيصل السيف', en: 'Faisal Al-Saif' },
        title: {
            ar: 'مؤسس UTD Saudi — مرجعية تقنية عربية',
            en: 'Founder of UTD Saudi — Arab Tech Authority',
        },
        role: {
            ar: 'مؤسس قناة UTD Saudi',
            en: 'Founder, UTD Saudi',
        },
        bio: {
            ar: 'فيصل السيف — مؤسس TechPills Productions وقناة UTD Saudi التي تتجاوز 10 ملايين مشترك. مقدم برامج تلفزيونية تقنية سابق ومن أبرز المرجعيات التقنية في الشرق الأوسط. يغطي أحدث تقنيات الشحن والإكسسوارات في مراجعاته.',
            en: 'Faisal Al-Saif — founder of TechPills Productions and UTD Saudi channel with 10M+ subscribers. Former TV tech presenter and one of the most prominent tech authorities in the Middle East. Covers the latest charging technologies and accessories in his reviews.',
        },
        expertise: {
            ar: ['تقييم المنتجات', 'تغطية المعارض العالمية', 'تقنيات الشحن', 'ابتكارات تقنية'],
            en: ['Product Evaluation', 'Global Expo Coverage', 'Charging Technology', 'Tech Innovation'],
        },
        avatar: '/images/blog/authors/faisal_alsaif.webp',
        country: 'SA',
        url: 'https://www.youtube.com/@falsaif',
        socials: {
            youtube: 'https://www.youtube.com/@falsaif',
            twitter: 'https://twitter.com/falsaif',
            instagram: 'https://www.instagram.com/faisalaalsaif',
        },
    },
];

/** Utility: get a recommended creator by their ID */
export function getCreatorById(id: string): RecommendedCreator | undefined {
    return recommendedCreators.find(m => m.id === id);
}

/** Country flag emoji helper */
export function getCountryFlag(code: RecommendedCreator['country']): string {
    const flags: Record<string, string> = { EG: '🇪🇬', JO: '🇯🇴', SA: '🇸🇦', AE: '🇦🇪' };
    return flags[code] || '';
}

/** Country name helper */
export function getCountryName(code: RecommendedCreator['country'], locale: 'ar' | 'en'): string {
    const names: Record<string, { ar: string; en: string }> = {
        EG: { ar: 'مصر', en: 'Egypt' },
        JO: { ar: 'الأردن', en: 'Jordan' },
        SA: { ar: 'السعودية', en: 'Saudi Arabia' },
        AE: { ar: 'الإمارات', en: 'UAE' },
    };
    return names[code]?.[locale] || '';
}
