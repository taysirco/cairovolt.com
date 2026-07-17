/**
 * Public-channel directory for third-party technology creators.
 *
 * These people are not CairoVolt employees, authors, partners, or sponsors. The
 * labels below describe the broad subjects linked from their public channels and
 * must not be used as proof of credentials, endorsement, or product performance.
 */

export interface RecommendedCreator {
    id: string;
    name: { ar: string; en: string };
    /** Broad subjects visible in the linked public channel; not a credential. */
    title: { ar: string; en: string };
    /** Neutral third-party label; never a CairoVolt role. */
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
            ar: 'قناة محتوى تقني عن الهواتف والإكسسوارات',
            en: 'Technology channel covering phones and accessories',
        },
        role: {
            ar: 'ناشر محتوى خارجي مستقل عن كايرو فولت',
            en: 'Third-party publisher independent from CairoVolt',
        },
        bio: {
            ar: 'رابط إلى قناة عامة تنشر محتوى عن الهواتف وإكسسوارات الشحن. راجع الفيديو المحدد وتاريخه وإفصاحاته قبل الاعتماد على أي نتيجة.',
            en: 'Link to a public channel covering phones and charging accessories. Review the specific video, date, and disclosures before relying on any result.',
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
            ar: 'قناة محتوى تقني عن الشحن وتقنيات GaN',
            en: 'Technology channel covering charging and GaN',
        },
        role: {
            ar: 'ناشر محتوى خارجي مستقل عن كايرو فولت',
            en: 'Third-party publisher independent from CairoVolt',
        },
        bio: {
            ar: 'رابط إلى قناة عامة تتناول موضوعات الشحن والبطاريات. قارن الشرح مع وثائق الشركة المصنّعة ومصادر فنية أخرى.',
            en: 'Link to a public channel discussing charging and batteries. Compare its explanations with manufacturer documentation and other technical sources.',
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
            ar: 'قناة محتوى عن إكسسوارات الشحن والصوتيات',
            en: 'Channel covering charging and audio accessories',
        },
        role: {
            ar: 'ناشر محتوى خارجي مستقل عن كايرو فولت',
            en: 'Third-party publisher independent from CairoVolt',
        },
        bio: {
            ar: 'رابط إلى قناة عامة تتناول الشواحن والصوتيات ومقارنات المنتجات. تحقق من الموديل وطريقة القياس في المنشور الأصلي.',
            en: 'Link to a public channel covering chargers, audio, and product comparisons. Check the exact model and measurement method in the original post.',
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
            ar: 'قناة محتوى عن الهواتف والإكسسوارات التقنية',
            en: 'Channel covering phones and technology accessories',
        },
        role: {
            ar: 'ناشر محتوى خارجي مستقل عن كايرو فولت',
            en: 'Third-party publisher independent from CairoVolt',
        },
        bio: {
            ar: 'رابط إلى قناة عامة تنشر محتوى عن الهواتف والإكسسوارات. قارن المعلومات الواردة مع مواصفات الموديل المنشورة.',
            en: 'Link to a public channel publishing content about phones and accessories. Compare its information with the published model specifications.',
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
            ar: 'قناة محتوى عن الأجهزة وإكسسوارات الشحن',
            en: 'Channel covering devices and charging accessories',
        },
        role: {
            ar: 'ناشر محتوى خارجي مستقل عن كايرو فولت',
            en: 'Third-party publisher independent from CairoVolt',
        },
        bio: {
            ar: 'رابط إلى قناة عامة تنشر محتوى عن الأجهزة والشواحن والباور بانك. راجع إفصاحات الإعلان أو الرعاية في كل منشور على حدة.',
            en: 'Link to a public channel covering devices, chargers, and power banks. Review advertising or sponsorship disclosures on each post separately.',
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
            ar: 'قناة محتوى تقني عن الأجهزة والإكسسوارات',
            en: 'Technology channel covering devices and accessories',
        },
        role: {
            ar: 'ناشر محتوى خارجي مستقل عن كايرو فولت',
            en: 'Third-party publisher independent from CairoVolt',
        },
        bio: {
            ar: 'رابط إلى قناة عامة تنشر محتوى عن الأجهزة والإكسسوارات. استخدم المصدر الأصلي وقارن أكثر من رأي قبل قرار الشراء.',
            en: 'Link to a public channel publishing content about devices and accessories. Use the original source and compare more than one view before buying.',
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
            ar: 'قناة محتوى تقني عن المنتجات والتقنيات الحديثة',
            en: 'Technology channel covering products and current technology',
        },
        role: {
            ar: 'ناشر محتوى خارجي مستقل عن كايرو فولت',
            en: 'Third-party publisher independent from CairoVolt',
        },
        bio: {
            ar: 'رابط إلى قناة عامة تنشر محتوى عن المنتجات والتقنيات الحديثة. تحقق من تاريخ المنشور والموديل والإفصاحات المصاحبة.',
            en: 'Link to a public channel covering products and current technology. Check the post date, exact model, and accompanying disclosures.',
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
