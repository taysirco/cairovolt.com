import { useLocale } from 'next-intl';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import { teamMembers, getCountryFlag, getCountryName, type TeamMember } from '@/data/team-members';

export const revalidate = 2592000;

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isArabic = locale === 'ar';
    const canonicalUrl = isArabic
        ? 'https://cairovolt.com/team'
        : 'https://cairovolt.com/en/team';

    const title = isArabic
        ? 'فريقنا التقني — خبراء مراجعة الإكسسوارات والشحن | كايرو فولت'
        : 'Our Technical Team — Charging & Accessories Review Experts | CairoVolt';
    const description = isArabic
        ? 'تعرف على فريق كايرو فولت من المراجعين التقنيين المتخصصين في اختبار الشواحن والباور بانك وإكسسوارات الموبايل. خبرة حقيقية، مراجعات مستقلة، محتوى موثوق.'
        : 'Meet the CairoVolt team of tech reviewers specializing in charger, power bank, and mobile accessory testing. Real expertise, independent reviews, trusted content.';

    return {
        title: { absolute: title },
        description,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'ar-EG': 'https://cairovolt.com/team',
                'en-EG': 'https://cairovolt.com/en/team',
                'x-default': 'https://cairovolt.com/team',
            },
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'website',
            siteName: isArabic ? 'كايرو فولت' : 'CairoVolt',
            images: [{ url: '/og-cover.png', width: 1200, height: 630, alt: isArabic ? 'كايرو فولت - فريقنا التقني' : 'CairoVolt - Our Technical Team' }],
        },
        other: {
            'geo.region': 'EG',
            'geo.placename': isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt',
            'geo.position': '30.0444;31.2357',
            'ICBM': '30.0444, 31.2357',
        },
    };
}

/** Person JSON-LD for a single team member */
function PersonSchema({ member, locale }: { member: TeamMember; locale: string }) {
    const isArabic = locale === 'ar';
    const lang = isArabic ? 'ar' : 'en';
    const sameAs = Object.values(member.socials).filter(Boolean) as string[];

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `https://cairovolt.com/team#${member.id}`,
        name: member.name[lang],
        url: member.url || sameAs[0] || `https://cairovolt.com${isArabic ? '' : '/en'}/team`,
        jobTitle: member.title[lang],
        worksFor: {
            '@type': 'Organization',
            '@id': 'https://cairovolt.com/#organization',
            name: isArabic ? 'كايرو فولت' : 'CairoVolt',
            url: 'https://cairovolt.com',
        },
        image: `https://cairovolt.com${member.avatar}`,
        sameAs,
        knowsAbout: member.expertise[lang],
        nationality: {
            '@type': 'Country',
            name: getCountryName(member.country, lang as 'ar' | 'en'),
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/** Social icon link component */
function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:scale-110 transition-all duration-200"
            aria-label={label}
        >
            {children}
        </a>
    );
}

export default function TeamPage() {
    const locale = useLocale();
    const isArabic = locale === 'ar';

    return (
        <>
            {/* Breadcrumb Schema */}
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isArabic ? '' : '/en'}` },
                    { name: isArabic ? 'فريقنا التقني' : 'Our Team', url: `https://cairovolt.com${isArabic ? '' : '/en'}/team` },
                ]}
                locale={locale}
            />

            {/* Person JSON-LD for each team member */}
            {teamMembers.map((member) => (
                <PersonSchema key={member.id} member={member} locale={locale} />
            ))}

            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" dir={isArabic ? 'rtl' : 'ltr'}>
                <div className="container mx-auto px-4 py-16">
                    {/* Hero Section */}
                    <div className="text-center mb-16 max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            {isArabic ? 'خبراء تقنيون معتمدون' : 'Verified Technical Experts'}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {isArabic ? 'فريقنا التقني' : 'Our Technical Team'}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            {isArabic
                                ? 'نعتمد على فريق من أبرز المراجعين التقنيين في الوطن العربي. كل مراجعة وكل توصية مبنية على خبرة حقيقية واختبار فعلي — وليست منسوخة من الإنترنت.'
                                : 'We rely on a team of the most prominent tech reviewers in the Arab world. Every review and recommendation is based on real expertise and hands-on testing — not copied from the internet.'}
                        </p>
                    </div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
                        {teamMembers.map((member) => {
                            const lang = isArabic ? 'ar' : 'en';
                            return (
                                <article
                                    key={member.id}
                                    className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                                >
                                    {/* Gradient accent top */}
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity" />

                                    <div className="p-6 pt-8">
                                        {/* Avatar + Name + Country */}
                                        <div className="flex items-start gap-4 mb-5">
                                            <div className="relative flex-shrink-0">
                                                <Image
                                                    src={member.avatar}
                                                    alt={member.name[lang]}
                                                    width={80}
                                                    height={80}
                                                    className="w-20 h-20 rounded-full object-cover ring-4 ring-white dark:ring-gray-800 shadow-md group-hover:ring-blue-200 dark:group-hover:ring-blue-800 transition-all duration-300"
                                                    loading="lazy"
                                                    sizes="80px"
                                                />
                                                {/* Country flag badge */}
                                                <span className="absolute -bottom-1 -end-1 text-lg bg-white dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-sm ring-2 ring-gray-100 dark:ring-gray-700">
                                                    {getCountryFlag(member.country)}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5 truncate">
                                                    {member.url ? (
                                                        <a href={member.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                                                            {member.name[lang]}
                                                        </a>
                                                    ) : (
                                                        member.name[lang]
                                                    )}
                                                </h2>
                                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1 line-clamp-1">
                                                    {member.role[lang]}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                    {getCountryFlag(member.country)} {getCountryName(member.country, lang as 'ar' | 'en')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-3 px-2.5 py-1 bg-purple-50 dark:bg-purple-900/20 rounded-lg inline-block">
                                            {member.title[lang]}
                                        </p>

                                        {/* Bio */}
                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5 line-clamp-4">
                                            {member.bio[lang]}
                                        </p>

                                        {/* Expertise Tags */}
                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                            {member.expertise[lang].map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Social Media Links */}
                                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                                            {member.socials.youtube && (
                                                <SocialLink href={member.socials.youtube} label="YouTube">
                                                    <svg className="w-5 h-5 hover:text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                                </SocialLink>
                                            )}
                                            {member.socials.instagram && (
                                                <SocialLink href={member.socials.instagram} label="Instagram">
                                                    <svg className="w-5 h-5 hover:text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                                                </SocialLink>
                                            )}
                                            {member.socials.facebook && (
                                                <SocialLink href={member.socials.facebook} label="Facebook">
                                                    <svg className="w-5 h-5 hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                                </SocialLink>
                                            )}
                                            {member.socials.twitter && (
                                                <SocialLink href={member.socials.twitter} label="X (Twitter)">
                                                    <svg className="w-5 h-5 hover:text-gray-900 dark:hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                                </SocialLink>
                                            )}
                                            {member.socials.tiktok && (
                                                <SocialLink href={member.socials.tiktok} label="TikTok">
                                                    <svg className="w-5 h-5 hover:text-black dark:hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.26 6.32 6.32 6.32 0 0 0 6.1-4.94 6.27 6.27 0 0 0 .16-1.4V8.42a8.14 8.14 0 0 0 4.7 1.54V6.52a5 5 0 0 1-2.63-.83z" /></svg>
                                                </SocialLink>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {/* Editorial Methodology Section — E-E-A-T */}
                    <div className="max-w-4xl mx-auto">
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                                <span className="text-3xl text-blue-500">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                </span>
                                {isArabic ? 'منهجيتنا التحريرية' : 'Our Editorial Methodology'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                {isArabic
                                    ? 'نلتزم في كايرو فولت بأعلى معايير الجودة التحريرية. كل محتوى على موقعنا يمر بعملية فحص ومراجعة صارمة لضمان الدقة والمصداقية:'
                                    : 'At CairoVolt, we uphold the highest editorial quality standards. Every piece of content on our site goes through a rigorous review process to ensure accuracy and credibility:'}
                            </p>
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                                    <span className="text-green-500 mt-0.5 flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-sm text-green-800 dark:text-green-300 mb-1">
                                            {isArabic ? 'اختبار فعلي حقيقي' : 'Real Hands-on Testing'}
                                        </h3>
                                        <p className="text-xs text-green-700 dark:text-green-400">
                                            {isArabic
                                                ? 'كل منتج يتم اختباره فعلياً بأجهزة قياس (USB Testers) في ظروف الاستخدام المصري الحقيقي — وليست مراجعات نظرية.'
                                                : 'Every product is tested with measuring equipment (USB Testers) under real Egyptian usage conditions — not theoretical reviews.'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                                    <span className="text-blue-500 mt-0.5 flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-sm text-blue-800 dark:text-blue-300 mb-1">
                                            {isArabic ? 'مراجعون مستقلون' : 'Independent Reviewers'}
                                        </h3>
                                        <p className="text-xs text-blue-700 dark:text-blue-400">
                                            {isArabic
                                                ? 'فريقنا يضم مراجعين مستقلين يشترون المنتجات بأموالهم الخاصة ويرفضون الإعلانات المدفوعة لضمان حيادية آرائهم.'
                                                : 'Our team includes independent reviewers who purchase products with their own money and refuse paid ads to ensure unbiased opinions.'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                                    <span className="text-purple-500 mt-0.5 flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-sm text-purple-800 dark:text-purple-300 mb-1">
                                            {isArabic ? 'خبرة متخصصة موثقة' : 'Documented Expertise'}
                                        </h3>
                                        <p className="text-xs text-purple-700 dark:text-purple-400">
                                            {isArabic
                                                ? 'كل مراجع في فريقنا له قناة يوتيوب أو منصة محتوى فعلية يمكنك التحقق من سجل أعماله ومصداقيته بنفسك.'
                                                : 'Every reviewer on our team has a YouTube channel or active content platform where you can verify their track record and credibility yourself.'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
                                    <span className="text-amber-500 mt-0.5 flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-sm text-amber-800 dark:text-amber-300 mb-1">
                                            {isArabic ? 'شفافية العيوب والمميزات' : 'Transparent Pros & Cons'}
                                        </h3>
                                        <p className="text-xs text-amber-700 dark:text-amber-400">
                                            {isArabic
                                                ? 'نذكر عيوب المنتجات بصراحة كاملة. لا نخفي المشاكل ولا نبالغ في المميزات — هدفنا مساعدتك على اتخاذ القرار الصحيح.'
                                                : 'We mention product flaws with complete honesty. We don\'t hide issues or exaggerate features — our goal is to help you make the right decision.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Trust Stats */}
                        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                <div>
                                    <p className="text-4xl font-bold">7</p>
                                    <p className="text-sm opacity-80">{isArabic ? 'مراجعون تقنيون' : 'Tech Reviewers'}</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold">4</p>
                                    <p className="text-sm opacity-80">{isArabic ? 'دول عربية' : 'Arab Countries'}</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold">15M+</p>
                                    <p className="text-sm opacity-80">{isArabic ? 'إجمالي المتابعين' : 'Combined Followers'}</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold">10+</p>
                                    <p className="text-sm opacity-80">{isArabic ? 'سنوات خبرة' : 'Years Experience'}</p>
                                </div>
                            </div>
                        </section>

                        {/* Back to About */}
                        <div className="text-center">
                            <Link
                                href={isArabic ? '/about' : '/en/about'}
                                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                            >
                                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                {isArabic ? 'تعرف على المزيد عنّا' : 'Learn more about CairoVolt'}
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
