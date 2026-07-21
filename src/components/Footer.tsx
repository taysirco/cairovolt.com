'use client';

import { InstantLink as Link } from '@/components/ui/InstantLink';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { trackWhatsappClick } from '@/lib/analytics';

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
        <footer className="cv-auto bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-10 md:pt-16 pb-8" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 mb-8 md:mb-12">
                    {/* About Section */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="mb-3 md:mb-4">
                            <Image
                                src="/cairovolt_logo.webp"
                                alt={isRTL ? 'كايرو فولت' : 'CairoVolt'}
                                width={160}
                                height={89}
                                loading="lazy"
                                sizes="(max-width: 768px) 160px, 160px"
                                className="object-contain h-[58px] md:h-[67px] w-auto dark:[filter:brightness(0)_invert(1)]"
                            />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed mb-4">
                            {t('aboutDescription')}
                        </p>
                        <div className="flex items-center gap-3 text-sm">
                            <a
                                href="https://wa.me/201558245974"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackWhatsappClick('contact')}
                                className="flex items-center gap-1.5 text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors font-medium"
                                suppressHydrationWarning
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                <span suppressHydrationWarning>01558245974</span>
                            </a>
                        </div>
                        <a
                            href="mailto:info@cairovolt.com"
                            className="mt-2 block text-xs text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            info@cairovolt.com
                        </a>
                        <p className="mt-2 text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                            {isRTL
                                ? 'كايرو فولت علامة تجارية تتبع شركة تيسير للاستثمار الذكي (ش.ذ.م.م) — سجل تجاري رقم 8446، رقم التسجيل الضريبي 777471566.'
                                : 'CairoVolt is a brand of Taysir Smart Investment LLC — Commercial Register No. 8446, Tax Registration No. 777471566.'}
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex items-center gap-2 mt-4">
                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/cairovolt"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="CairoVolt على Facebook"
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-200"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/cairovolt/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="CairoVolt على Instagram"
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:text-white dark:hover:text-white transition-all duration-200"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            {/* TikTok */}
                            <a
                                href="https://www.tiktok.com/@cairovolt"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="CairoVolt على TikTok"
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-gray-700 dark:hover:text-white transition-all duration-200"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
                                </svg>
                            </a>
                            {/* YouTube */}
                            <a
                                href="https://www.youtube.com/@cairovolt"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="CairoVolt على YouTube"
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-200"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                            {/* X (Twitter) */}
                            <a
                                href="https://x.com/cairovolt"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="CairoVolt على X"
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Shop by Category — clean generic URLs */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-white">
                            {isRTL ? 'تسوق حسب الفئة' : 'Shop by Category'}
                        </h3>
                        <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
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
                        <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-white">
                            {isRTL ? 'العلامات التجارية' : 'Brands'}
                        </h3>
                        <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
                            <li>
                                <Link href={getLocalizedHref('/anker')} className="hover:text-blue-600 transition-colors font-medium">
                                    {isRTL ? 'جميع منتجات انكر' : 'All Anker Products'}
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
                            <li>
                                <Link href={getLocalizedHref('/soundcore')} className="hover:text-orange-600 transition-colors font-semibold">
                                    {isRTL ? '🎧 ساوندكور من انكر' : '🎧 Soundcore by Anker'}
                                </Link>
                            </li>
                            <li className="ps-4 text-xs">
                                <Link href={getLocalizedHref('/soundcore/audio')} className="hover:text-orange-600 transition-colors text-gray-600 dark:text-gray-400">
                                    {isRTL ? '— ايربودز ساوندكور' : '— Soundcore Earbuds'}
                                </Link>
                            </li>
                            <li className="ps-4 text-xs">
                                <Link href={getLocalizedHref('/soundcore/speakers')} className="hover:text-orange-600 transition-colors text-gray-600 dark:text-gray-400">
                                    {isRTL ? '— سبيكرات ساوندكور' : '— Soundcore Speakers'}
                                </Link>
                            </li>
                            <li className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                <Link href={getLocalizedHref('/joyroom')} className="hover:text-red-600 transition-colors font-medium">
                                    {isRTL ? 'جميع منتجات جوي روم' : 'All Joyroom Products'}
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
                            <li>
                                <Link href={getLocalizedHref('/joyroom/car-accessories')} className="hover:text-red-600 transition-colors">
                                    {isRTL ? 'إكسسوارات سيارة جوي روم' : 'Joyroom Car Accessories'}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-white">
                            {isRTL ? 'أدلة ومقالات' : 'Guides & Resources'}
                        </h3>
                        <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
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
                                <Link href={getLocalizedHref('/lab')} className="hover:text-blue-600 transition-colors">
                                    {isRTL ? 'مركز المواصفات والحسابات' : 'Specifications & Calculations'}
                                </Link>
                            </li>
                            <li>
                                <Link href={getLocalizedHref('/team')} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                    {isRTL ? 'مصادر خارجية للمراجعة' : 'External Review Sources'}
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
                        <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-white">{t('customerService')}</h3>
                        <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
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
                            <li>
                                <Link href={getLocalizedHref('/verify')} className="hover:text-emerald-600 transition-colors">
                                    {isRTL ? 'تحقق من سجل الضمان' : 'Check Warranty Record'}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Certifications & awards of the brands we carry — attributed to the
                    brands (not CairoVolt), verified items only, for buyer trust. */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-6 pb-4">
                    <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {isRTL
                            ? 'العلامات التي نوفّرها حاصلة على اعتمادات وجوائز عالمية'
                            : 'The brands we carry hold international certifications & awards'}
                    </p>
                    <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                        {[
                            { src: '/images/awards/apple-mfi.png', alt: isRTL ? 'شهادة Apple MFi — متوافق مع آيفون وآيباد' : 'Apple MFi — Made for iPhone and iPad' },
                            { src: '/images/awards/hi-res-audio.png', alt: isRTL ? 'اعتماد Hi-Res Audio (ساوندكور)' : 'Hi-Res Audio certified (Soundcore)' },
                            { src: '/images/awards/qi2-certified.png', alt: isRTL ? 'اعتماد Qi2 للشحن اللاسلكي' : 'Qi2 Certified wireless charging' },
                            { src: '/images/awards/tuv-rheinland.png', alt: isRTL ? 'اعتماد TÜV Rheinland لسلامة المنتج' : 'TÜV Rheinland product safety certified' },
                            { src: '/images/awards/ces-innovation.png', alt: isRTL ? 'جائزة CES للابتكار' : 'CES Innovation Award' },
                            { src: '/images/awards/if-world-design.png', alt: isRTL ? 'دليل iF العالمي للتصميم' : 'iF World Design Guide' },
                            { src: '/images/awards/chargerlab-golden-2025.png', alt: isRTL ? 'جائزة ChargerLAB الذهبية 2025 — أنكر' : 'ChargerLAB Golden Charge Awards 2025 — Anker' },
                            { src: '/images/awards/ce-fcc-rohs.png', alt: isRTL ? 'علامات المطابقة CE و FCC و RoHS' : 'CE, FCC and RoHS compliance marks' },
                        ].map((b) => (
                            <span
                                key={b.src}
                                title={b.alt}
                                className="flex h-9 items-center justify-center rounded-lg border border-gray-200 bg-white px-2.5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700"
                            >
                                <Image
                                    src={b.src}
                                    alt={b.alt}
                                    width={54}
                                    height={25}
                                    className="object-contain"
                                    loading="lazy"
                                />
                            </span>
                        ))}
                    </div>
                </div>

                {/* Payment Method — COD statement (wording mirrors the Terms & TrustRibbon copy) */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4 pb-4">
                    <p className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400 text-center">
                        <SvgIcon name="money" className="w-4 h-4 shrink-0 text-green-700 dark:text-green-400" />
                        <span>
                            {isRTL
                                ? 'الدفع عند الاستلام (كاش) متاح للطلبات والعناوين المؤهلة — وكل طلب بفاتورة.'
                                : 'Cash on Delivery (COD) is available for eligible orders and addresses — every order ships with an invoice.'}
                        </span>
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        © {currentYear} {isRTL ? 'كايرو فولت' : 'CairoVolt'}. {t('allRightsReserved')}.
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
