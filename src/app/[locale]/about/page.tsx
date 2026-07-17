import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';

export const revalidate = 2592000;

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });
    const canonicalUrl = locale === 'ar'
        ? 'https://cairovolt.com/about'
        : 'https://cairovolt.com/en/about';
    return {
        title: { absolute: t('metaTitle') },
        description: t('metaDescription'),
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'ar-EG': 'https://cairovolt.com/about',
                'en-EG': 'https://cairovolt.com/en/about',
                'x-default': 'https://cairovolt.com/about',
            },
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: t('metaTitle'),
            description: t('metaDescription'),
            url: canonicalUrl,
            locale: locale === 'ar' ? 'ar_EG' : 'en_US',
            type: 'website',
            siteName: locale === 'ar' ? 'كايرو فولت' : 'CairoVolt',
            images: [{ url: '/og-cover.png', width: 1200, height: 630, alt: locale === 'ar' ? 'كايرو فولت - اكسسوارات الموبايل' : 'CairoVolt - Mobile Accessories' }],
        },
    };
}

export default async function AboutPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'About' });
    const isArabic = locale === 'ar';

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isArabic ? '' : '/en'}` },
                    { name: t('title'), url: `https://cairovolt.com${isArabic ? '' : '/en'}/about` },
                ]}
                locale={locale}
            />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        {/* Hero Section */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {t('title')}
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t('subtitle')}
                            </p>
                        </div>

                        {/* Mission */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                <span className="text-3xl text-blue-500">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </span>
                                {t('mission.title')}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t('mission.description')}
                            </p>
                        </section>

                        {/* Brand relationship disclosure */}
                        <section className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-2xl p-8 mb-8">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                                {t('relationship.title')}
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {t('relationship.description')}
                            </p>
                        </section>

                        {/* Why Choose Us */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                                <span className="text-3xl text-yellow-500">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                                </span>
                                {t('whyUs.title')}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {['original', 'warranty', 'prices', 'support'].map((item) => (
                                    <div key={item} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                                        <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">
                                            {t(`whyUs.${item}.title`)}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            {t(`whyUs.${item}.description`)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Our Brands */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                                <span className="text-3xl text-amber-500">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                </span>
                                {t('brands.title')}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-6">
                                    <h3 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-400">
                                        {isArabic ? 'انكر' : 'Anker'}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">{t('brands.anker')}</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-6">
                                    <h3 className="text-2xl font-bold mb-2 text-purple-700 dark:text-purple-400">
                                        {isArabic ? 'جوي روم' : 'Joyroom'}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">{t('brands.joyroom')}</p>
                                </div>
                            </div>
                        </section>

                        {/* Purchase and warranty information */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8 mt-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                                <span className="text-3xl text-green-600">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </span>
                                {isArabic ? 'معلومات شراء واضحة' : 'Clear Purchase Information'}
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                                    <span className="text-2xl flex-shrink-0 text-green-500">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-green-800 dark:text-green-300">
                                            {isArabic ? 'بيانات المنتج قبل الشراء' : 'Product details before purchase'}
                                        </h3>
                                        <p className="text-sm text-green-700 dark:text-green-400">
                                            {isArabic
                                                ? 'توضح صفحة كل منتج الموديل والسعر والمواصفات والتوافق والتوافر قبل إتمام الطلب.'
                                                : 'Each product page lists its model, price, specifications, compatibility, and availability before checkout.'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                                    <span className="text-2xl flex-shrink-0 text-green-500">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-green-800 dark:text-green-300">
                                            {isArabic ? 'ضمان كايرو فولت مكتوب' : 'Written CairoVolt warranty'}
                                        </h3>
                                        <p className="text-sm text-green-700 dark:text-green-400">
                                            {isArabic
                                                ? 'مدة الضمان وتغطيته موضحتان لكل منتج، ويمكن متابعة سجل الضمان باستخدام سيريال كايرو فولت.'
                                                : 'Warranty duration and coverage are listed per product, and the CairoVolt warranty record can be checked using its serial.'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                                    <span className="text-2xl flex-shrink-0 text-blue-500">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-blue-800 dark:text-blue-300">
                                            {isArabic ? 'دعم وفاتورة طلب' : 'Order support and record'}
                                        </h3>
                                        <p className="text-sm text-blue-700 dark:text-blue-400">
                                            {isArabic
                                                ? 'يتلقى العميل رقم طلب واضحاً، ويمكنه التواصل معنا عبر واتساب لمتابعة الطلب أو طلب خدمة الضمان.'
                                                : 'Customers receive a clear order number and can contact us on WhatsApp for order or warranty support.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Editorial approach */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                                <span className="text-3xl text-purple-500">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                </span>
                                {isArabic ? 'منهج إعداد المحتوى' : 'How We Prepare Content'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                {isArabic
                                    ? 'نراجع مواصفات الموديل المعلنة ومعلومات التوافق وسياسات الضمان قبل نشر صفحة المنتج. نميّز بوضوح بين مواصفات الشركة المصنّعة والحسابات التقديرية ونحدّث المحتوى عندما تتغير معلومات المنتج.'
                                    : 'We review published model specifications, compatibility information, and warranty terms before a product page goes live. Manufacturer specifications and calculated estimates are clearly distinguished and updated when product information changes.'}
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="text-center p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <span className="text-3xl mb-2 block text-blue-500">
                                        <svg className="w-7 h-7 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    </span>
                                    <h3 className="font-bold text-sm mb-1">{isArabic ? 'مواصفات محددة' : 'Model-specific details'}</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {isArabic ? 'الموديل والقدرة والمنافذ موضحة قبل الشراء' : 'Model, power, and ports are listed before purchase'}
                                    </p>
                                </div>
                                <div className="text-center p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <span className="text-3xl mb-2 block text-green-500">
                                        <svg className="w-7 h-7 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </span>
                                    <h3 className="font-bold text-sm mb-1">{isArabic ? 'إرشادات توافق' : 'Compatibility guidance'}</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {isArabic ? 'نوضح متطلبات الجهاز والبروتوكول المناسب' : 'Device and protocol requirements are explained'}
                                    </p>
                                </div>
                                <div className="text-center p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <span className="text-3xl mb-2 block text-amber-500">
                                        <svg className="w-7 h-7 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                    </span>
                                    <h3 className="font-bold text-sm mb-1">{isArabic ? 'تقديرات واضحة' : 'Clearly marked estimates'}</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {isArabic ? 'النتائج الفعلية قد تختلف حسب الجهاز والاستخدام' : 'Actual results can vary by device and use'}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Trust & Quality: Editorial Policy */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                <span className="text-3xl text-blue-500">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                </span>
                                {isArabic ? 'سياسة المحتوى التحريري' : 'Editorial Content Policy'}
                            </h2>
                            <div className="text-gray-600 dark:text-gray-300 space-y-3 text-sm leading-relaxed">
                                <p>
                                    {isArabic
                                        ? 'في كايرو فولت، نلتزم بالشفافية الكاملة في محتوانا التحريري:'
                                        : 'At CairoVolt, we are committed to full transparency in our editorial content:'}
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>{isArabic
                                            ? 'المقارنات تعتمد على المواصفات المعلنة والتوافق والسعر المتاح وقت التحديث'
                                            : 'Comparisons use published specifications, compatibility, and the price available at the time of update'}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>{isArabic
                                            ? 'نذكر عيوب المنتجات بصراحة بجانب مميزاتها'
                                            : 'We honestly mention product drawbacks alongside advantages'}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>{isArabic
                                            ? 'السعر النهائي والتوافر يظهران في صفحة المنتج وقت الطلب'
                                            : 'Final price and availability are shown on the product page at checkout time'}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>{isArabic
                                            ? 'التقييمات المنشورة مرتبطة بطلبات شراء وتخضع لقواعد محتوى موحدة'
                                            : 'Published reviews are linked to purchases and follow consistent content rules'}</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Contact and service information */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                                <span className="text-3xl text-red-500">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </span>
                                {isArabic ? 'التواصل والخدمة' : 'Contact & Service'}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                        </span>
                                        <div>
                                            <p className="font-bold text-sm">{isArabic ? 'واتساب' : 'WhatsApp'}</p>
                                            <p className="text-sm text-gray-500" dir="ltr">+201558245974</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        </span>
                                        <div>
                                            <p className="font-bold text-sm">{isArabic ? 'البريد الإلكتروني' : 'Email'}</p>
                                            <p className="text-sm text-gray-500">support@cairovolt.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                        </span>
                                        <div>
                                            <p className="font-bold text-sm">{isArabic ? 'الموقع' : 'Website'}</p>
                                            <p className="text-sm text-gray-500">cairovolt.com</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </span>
                                        <div>
                                            <p className="font-bold text-sm">{isArabic ? 'نموذج العمل' : 'Business Model'}</p>
                                            <p className="text-sm text-gray-500">{isArabic ? 'متجر إلكتروني؛ لا يوجد فرع استقبال أو استلام حضوري معلن' : 'Online retailer; no advertised walk-in or pickup branch'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </span>
                                        <div>
                                            <p className="font-bold text-sm">{isArabic ? 'ساعات العمل' : 'Working Hours'}</p>
                                            <p className="text-sm text-gray-500">{isArabic ? 'يومياً من 10 صباحاً - 10 مساءً' : 'Daily 10 AM - 10 PM'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                                        </span>
                                        <div>
                                            <p className="font-bold text-sm">{isArabic ? 'التوصيل' : 'Delivery'}</p>
                                            <p className="text-sm text-gray-500">{isArabic ? 'مدة تقديرية 1-5 أيام عمل حسب العنوان وتأكيد الطلب' : 'Estimated 1-5 business days, subject to address and order confirmation'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* External review sources */}
                        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-lg text-white text-center">
                            <h2 className="text-2xl font-bold mb-3">
                                {isArabic ? 'مصادر خارجية للمراجعة' : 'External Review Sources'}
                            </h2>
                            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                                {isArabic
                                    ? 'روابط إلى قنوات تقنية مستقلة يمكن الرجوع إليها ضمن بحثك قبل الشراء. أصحاب القنوات لا يعملون لدى كايرو فولت، ووجود الرابط لا يعني شراكة أو اعتماداً أو تبنياً لكل محتواهم.'
                                    : 'Links to independent technology channels that you can consult as part of your pre-purchase research. The creators do not work for CairoVolt, and inclusion does not imply partnership, endorsement, or adoption of all their content.'}
                            </p>
                            <Link
                                href={isArabic ? '/team' : '/en/team'}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                {isArabic ? 'تصفّح القائمة' : 'Browse the list'}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}
