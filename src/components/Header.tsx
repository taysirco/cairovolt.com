'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { trackWhatsappClick, trackPhoneClick } from '@/lib/analytics';

export default function Header() {
    const locale = useLocale();
    const tCat = useTranslations('Categories');
    const tBrand = useTranslations('Brands');
    const isRTL = locale === 'ar';
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { totalItems, setIsOpen } = useCart();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Function to get localized href
    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return locale === 'ar' ? cleanPath : `/${locale}${cleanPath}`;
    };

    // Language switcher - proper path replacement
    const switchLocale = locale === 'ar' ? 'en' : 'ar';
    const getSwitchPath = () => {
        if (!pathname) return switchLocale === 'ar' ? '/' : '/en';

        // Remove current locale prefix 
        const pathWithoutLocale = pathname.replace(/^\/(ar|en)(\/|$)/, '/');
        const cleanPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale;

        if (switchLocale === 'ar') {
            return cleanPath || '/';
        }
        return `/en${cleanPath}`;
    };

    // Categories with proper grouping
    const ankerCategories = [
        { slug: 'power-banks', icon: 'battery', key: 'powerBanks' },
        { slug: 'wall-chargers', icon: 'plug', key: 'wallChargers' },
        { slug: 'cables', icon: 'link', key: 'cables' },
        { slug: 'car-chargers', icon: 'car', key: 'carChargers' },
    ];

    const joyroomCategories = [
        { slug: 'power-banks', icon: 'battery', key: 'powerBanks' },
        { slug: 'audio', icon: 'headphones', key: 'audio' },
        { slug: 'wall-chargers', icon: 'plug', key: 'wallChargers' },
        { slug: 'cables', icon: 'link', key: 'cables' },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg'
                    : 'bg-transparent'
                    }`}
                dir={isRTL ? 'rtl' : 'ltr'}
            >
                {/* Top Bar */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs py-1.5 hidden md:block">
                    <div className="container mx-auto px-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1"><SvgIcon name="check-circle" className="w-3.5 h-3.5" /> {isRTL ? 'منتجات أصلية 100%' : '100% Original Products'}</span>
                            <span className="flex items-center gap-1"><SvgIcon name="truck" className="w-3.5 h-3.5" /> {isRTL ? 'شحن سريع لجميع المحافظات' : 'Fast Shipping Nationwide'}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="tel:+201558245974" className="hover:underline" onClick={() => trackPhoneClick()} suppressHydrationWarning>
                                <SvgIcon name="phone" className="w-3.5 h-3.5 inline-block" />{' '}
                                <span suppressHydrationWarning>01558245974</span>
                            </a>
                            <Link
                                href={getSwitchPath()}
                                className="px-2 py-0.5 bg-white/20 rounded hover:bg-white/30 transition-colors"
                            >
                                {locale === 'ar' ? 'English' : 'العربية'}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Header */}
                <div className="container mx-auto px-4 h-16 md:h-18 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href={getLocalizedHref('/')}
                        className="flex items-center gap-2"
                    >
                        <div className="flex items-center">
                            <Image
                                src="/cairovolt_logo.png"
                                alt="Cairo Volt"
                                width={160}
                                height={89}
                                priority
                                className="object-contain h-[50px] md:h-[58px] w-auto dark:[filter:brightness(0)_invert(1)]"
                            />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent hidden sm:inline">
                            {isRTL ? 'كايرو فولت' : 'Cairo Volt'}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {/* Anker Dropdown */}
                        <div className="relative group">
                            <Link
                                href={getLocalizedHref('/anker')}
                                className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors flex items-center gap-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                {tBrand('anker')}
                                <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Link>
                            <div className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 p-2 mt-1`}>
                                <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    {isRTL ? 'منتجات أنكر' : 'Anker Products'}
                                </div>
                                {ankerCategories.map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        href={getLocalizedHref(`/anker/${cat.slug}`)}
                                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-lg transition-colors"
                                    >
                                        <SvgIcon name={cat.icon} className="w-5 h-5" />
                                        <span>{tCat(cat.key)}</span>
                                    </Link>
                                ))}
                                <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2">
                                    <Link
                                        href={getLocalizedHref('/anker')}
                                        className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                    >
                                    {isRTL ? '← عرض الكل' : 'View All →'}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Joyroom Dropdown */}
                        <div className="relative group">
                            <Link
                                href={getLocalizedHref('/joyroom')}
                                className="px-4 py-2 text-sm font-medium hover:text-red-600 transition-colors flex items-center gap-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                                {tBrand('joyroom')}
                                <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Link>
                            <div className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 p-2 mt-1`}>
                                <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    {isRTL ? 'منتجات جوي روم' : 'Joyroom Products'}
                                </div>
                                {joyroomCategories.map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        href={getLocalizedHref(`/joyroom/${cat.slug}`)}
                                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-lg transition-colors"
                                    >
                                        <SvgIcon name={cat.icon} className="w-5 h-5" />
                                        <span>{tCat(cat.key)}</span>
                                    </Link>
                                ))}
                                <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2">
                                    <Link
                                        href={getLocalizedHref('/joyroom')}
                                        className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    >
                                    {isRTL ? '← عرض الكل' : 'View All →'}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Generic Category Links — clean URLs */}
                        <Link
                            href={getLocalizedHref('/power-banks')}
                            className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {isRTL ? 'باور بانك' : 'Power Banks'}
                        </Link>
                        <Link
                            href={getLocalizedHref('/chargers')}
                            className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {isRTL ? 'شواحن' : 'Chargers'}
                        </Link>
                        <Link
                            href={getLocalizedHref('/blog')}
                            className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {isRTL ? 'المدونة' : 'Blog'}
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-1 sm:gap-3">
                        {/* Cart Button */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="relative p-2 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors touch-target group"
                            aria-label={isRTL ? 'سلة المشتريات' : 'Shopping Cart'}
                        >
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-gray-900">
                                    {totalItems > 9 ? '9+' : totalItems}
                                </span>
                            )}
                        </button>

                        {/* Mobile Language Switcher */}
                        <Link
                            href={getSwitchPath()}
                            className="lg:hidden p-2 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-sm font-bold touch-target"
                        >
                            {locale === 'ar' ? 'EN' : 'ع'}
                        </Link>

                        {/* WhatsApp Button */}
                        <a
                            href="https://wa.me/201558245974"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsappClick('header')}
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition-colors"
                            suppressHydrationWarning
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <span>{isRTL ? 'واتساب' : 'WhatsApp'}</span>
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors touch-target"
                            aria-expanded={mobileMenuOpen}
                            aria-label={isRTL ? 'القائمة' : 'Menu'}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileMenuOpen ? 'visible' : 'invisible'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/50 transition-opacity ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={() => setMobileMenuOpen(false)}
                />

                {/* Menu Panel */}
                <div
                    className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-80 h-full bg-white dark:bg-gray-900 shadow-2xl transform transition-transform ${mobileMenuOpen
                        ? 'translate-x-0'
                        : isRTL ? 'translate-x-full' : '-translate-x-full'
                        }`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                >
                    <div className="p-6">
                        {/* Mobile Logo */}
                        <div className="flex items-center justify-between mb-8">
                            <Link href={getLocalizedHref('/')} className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                                <div className="flex items-center">
                                    <Image
                                        src="/cairovolt_logo.png"
                                        alt="Cairo Volt"
                                        width={120}
                                        height={67}
                                        className="h-[60px] w-auto object-contain dark:[filter:brightness(0)_invert(1)]"
                                    />
                                </div>
                                <span className="text-lg font-bold">
                                    {isRTL ? 'كايرو فولت' : 'Cairo Volt'}
                                </span>
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="space-y-6">
                            {/* Anker Section */}
                            <div>
                                <h3 className="flex items-center gap-2 text-sm font-bold text-blue-600 mb-3">
                                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                    {tBrand('anker')}
                                </h3>
                                <div className="space-y-1">
                                    {ankerCategories.map((cat) => (
                                        <Link
                                            key={cat.slug}
                                            href={getLocalizedHref(`/anker/${cat.slug}`)}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                        >
                                            <SvgIcon name={cat.icon} className="w-5 h-5" />
                                            <span>{tCat(cat.key)}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Joyroom Section */}
                            <div>
                                <h3 className="flex items-center gap-2 text-sm font-bold text-red-600 mb-3">
                                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                                    {tBrand('joyroom')}
                                </h3>
                                <div className="space-y-1">
                                    {joyroomCategories.map((cat) => (
                                        <Link
                                            key={cat.slug}
                                            href={getLocalizedHref(`/joyroom/${cat.slug}`)}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                        >
                                            <SvgIcon name={cat.icon} className="w-5 h-5" />
                                            <span>{tCat(cat.key)}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Shop by Category — generic clean URLs */}
                            <div>
                                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-3">
                                    {isRTL ? 'تسوق حسب الفئة' : 'Shop by Category'}
                                </h3>
                                <div className="space-y-1">
                                    {[
                                        { slug: 'power-banks', icon: 'battery', ar: 'باور بانك', en: 'Power Banks' },
                                        { slug: 'chargers', icon: 'bolt', ar: 'شواحن', en: 'Chargers' },
                                        { slug: 'earbuds', icon: 'headphones', ar: 'سماعات بلوتوث', en: 'Earbuds' },
                                        { slug: 'cables', icon: 'plug', ar: 'كابلات شحن', en: 'Cables' },
                                    ].map((cat) => (
                                        <Link
                                            key={cat.slug}
                                            href={getLocalizedHref(`/${cat.slug}`)}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                        >
                                            <SvgIcon name={cat.icon} className="w-5 h-5" />
                                            <span>{isRTL ? cat.ar : cat.en}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Resources */}
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="space-y-1">
                                    <Link
                                        href={getLocalizedHref('/blog')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium"
                                    >
                                        <SvgIcon name="book" className="w-5 h-5" />
                                        <span>{isRTL ? 'المدونة' : 'Blog'}</span>
                                    </Link>
                                    <Link
                                        href={getLocalizedHref('/about')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                    >
                                        <SvgIcon name="question" className="w-5 h-5" />
                                        <span>{isRTL ? 'من نحن' : 'About Us'}</span>
                                    </Link>
                                    <Link
                                        href={getLocalizedHref('/faq')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                    >
                                        <SvgIcon name="question" className="w-5 h-5" />
                                        <span>{isRTL ? 'أسئلة شائعة' : 'FAQ'}</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <a
                                    href="https://wa.me/201558245974"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackWhatsappClick('header')}
                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 text-white font-medium rounded-xl"
                                    suppressHydrationWarning
                                >
                                    <SvgIcon name="phone" className="w-4 h-4 inline-block" /> {isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Spacer for fixed header */}
            <div className="h-16 md:h-[calc(4.5rem+28px)]"></div>
        </>
    );
}
