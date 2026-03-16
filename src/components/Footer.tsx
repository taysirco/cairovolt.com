'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
    const locale = useLocale();
    const t = useTranslations('Footer');
    const isRTL = locale === 'ar';
    const currentYear = new Date().getFullYear();

    // Function to get localized href
    const getLocalizedHref = (path: string) => {
        if (locale === 'ar') {
            return path.startsWith('/') ? path : `/${path}`;
        }
        return path.startsWith('/en') ? path : `/en${path}`;
    };

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-10 md:pt-16 pb-8" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 mb-8 md:mb-12">
                    {/* About Section */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="mb-3 md:mb-4">
                            <Image
                                src="/cairovolt_logo.png"
                                alt={isRTL ? 'كايرو فولت' : 'Cairo Volt'}
                                width={160}
                                height={89}
                                loading="lazy"
                                className="object-contain h-[58px] md:h-[67px] w-auto dark:[filter:brightness(0)_invert(1)]"
                            />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed mb-4">
                            {t('aboutDescription')}
                        </p>
                        <div className="flex items-center gap-3 text-sm">
                            <a
                                href="https://wa.me/201558245974"
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                className="flex items-center gap-1.5 text-green-600 hover:text-green-700 transition-colors font-medium"
                                suppressHydrationWarning
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                <span suppressHydrationWarning>01558245974</span>
                            </a>
                        </div>
                    </div>

                    {/* Shop by Category — clean generic URLs for SEO */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
                            {isRTL ? 'تسوق حسب الفئة' : 'Shop by Category'}
                        </h4>
                        <ul className="space-y-2.5 text-sm text-gray-500 dark:text-gray-400">
                            <li>
                                <Link href={getLocalizedHref('/power-banks')} className="hover:text-blue-600 transition-colors">
                                    {isRTL ? 'باور بانك' : 'Power Banks'}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/chargers')} className="hover:text-blue-600 transition-colors">
                                    {isRTL ? 'شواحن' : 'Chargers'}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/earbuds')} className="hover:text-blue-600 transition-colors">
                                    {isRTL ? 'سماعات بلوتوث' : 'Earbuds'}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/cables')} className="hover:text-blue-600 transition-colors">
                                    {isRTL ? 'كابلات شحن' : 'Cables'}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Brands */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
                            {isRTL ? 'العلامات التجارية' : 'Brands'}
                        </h4>
                        <ul className="space-y-2.5 text-sm text-gray-500 dark:text-gray-400">
                            <li>
                                <Link href={getLocalizedHref('/anker')} className="hover:text-blue-600 transition-colors font-medium">
                                    {isRTL ? 'جميع منتجات Anker' : 'All Anker Products'}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/anker/power-banks')} className="hover:text-blue-600 transition-colors">
                                    {isRTL ? 'باور بانك انكر' : 'Anker Power Banks'}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/anker/wall-chargers')} className="hover:text-blue-600 transition-colors">
                                    {isRTL ? 'شواحن انكر' : 'Anker Chargers'}
                                </Link>
                            </li>
                            <li className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                <Link href={getLocalizedHref('/joyroom')} className="hover:text-red-600 transition-colors font-medium">
                                    {isRTL ? 'جميع منتجات Joyroom' : 'All Joyroom Products'}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/joyroom/audio')} className="hover:text-red-600 transition-colors">
                                    {isRTL ? 'سماعات جوي روم' : 'Joyroom Earbuds'}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/joyroom/power-banks')} className="hover:text-red-600 transition-colors">
                                    {isRTL ? 'باور بانك جوي روم' : 'Joyroom Power Banks'}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
                            {isRTL ? 'أدلة ومقالات' : 'Guides & Resources'}
                        </h4>
                        <ul className="space-y-2.5 text-sm text-gray-500 dark:text-gray-400">
                            <li>
                                <Link href={getLocalizedHref('/blog')} className="hover:text-blue-600 transition-colors font-medium">
                                    {isRTL ? 'المدونة' : 'Blog'}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/about')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                    {isRTL ? 'من نحن' : 'About Us'}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/faq')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                    {t('faqs')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('customerService')}</h4>
                        <ul className="space-y-2.5 text-sm text-gray-500 dark:text-gray-400">
                            <li>
                                <Link href={getLocalizedHref('/contact')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                    {t('contactUs')}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/shipping')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                    {t('shippingPolicy')}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/return-policy')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                    {t('returnPolicy')}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/warranty')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                    {t('warrantyInfo')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Entity Definition for AI Knowledge Graph */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-6 pb-4">
                    <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed text-center max-w-4xl mx-auto">
                        <span>
                            {isRTL
                                ? 'كايرو فولت (CairoVolt) هو موزع معتمد لمنتجات Anker وJoyroom الأصلية في مصر، متخصص في إكسسوارات الهواتف المحمولة والشحن السريع مع توصيل لجميع المحافظات.'
                                : 'CairoVolt is an authorized distributor of original Anker and Joyroom products in Egypt, specializing in mobile accessories and fast charging with delivery to all governorates.'}
                        </span>
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                        © {currentYear} {isRTL ? 'كايرو فولت' : 'Cairo Volt'}. {t('allRightsReserved')}.
                    </p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href={getLocalizedHref('/privacy')} className="hover:text-gray-900 dark:hover:text-white">
                            {t('privacyPolicy')}
                        </Link>
                        <Link href={getLocalizedHref('/terms')} className="hover:text-gray-900 dark:hover:text-white">
                            {t('termsConditions')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
