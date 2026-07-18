'use client';

import { InstantLink as Link } from '@/components/ui/InstantLink';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { trackPhoneClick } from '@/lib/analytics';
import dynamic from 'next/dynamic';

const MobileMenu = dynamic(() => import('@/components/MobileMenu'), { ssr: false });

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
        const initialFrame = window.requestAnimationFrame(handleScroll);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.cancelAnimationFrame(initialFrame);
            window.removeEventListener('scroll', handleScroll);
        };
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

    // Soundcore audio sub-brand — surfaced separately in the dropdown so users
    // searching for "soundcore" / "ساوندكور" find a clear entry point.
    const soundcoreCategories = [
        { href: '/soundcore', icon: 'headphones', label: { en: 'Soundcore Hub (All Audio)', ar: 'ساوندكور (كل المنتجات الصوتية)' }, primary: true },
        { href: '/soundcore/audio', icon: 'headphones', label: { en: 'Soundcore Earbuds & Headphones', ar: 'سماعات وايربودز ساوندكور' } },
        { href: '/soundcore/speakers', icon: 'speaker', label: { en: 'Soundcore Bluetooth Speakers', ar: 'سبيكرات بلوتوث ساوندكور' } },
    ];

    const joyroomCategories = [
        { slug: 'power-banks', icon: 'battery', key: 'powerBanks' },
        { slug: 'audio', icon: 'headphones', key: 'audio' },
        { slug: 'wall-chargers', icon: 'plug', key: 'wallChargers' },
        { slug: 'cables', icon: 'link', key: 'cables' },
        { slug: 'smart-watches', icon: 'watch', key: 'smartWatches' },
        { slug: 'car-holders', icon: 'compass', key: 'carHolders' },
        { slug: 'car-accessories', icon: 'car', key: 'carAccessories' },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl backdrop-saturate-150 shadow-md border-b border-black/5 dark:border-white/10'
                    : 'bg-transparent'
                    }`}
                dir={isRTL ? 'rtl' : 'ltr'}
            >
                {/* Top Bar */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs py-1.5 hidden md:block">
                    <div className="container mx-auto px-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1"><SvgIcon name="check-circle" className="w-3.5 h-3.5" /> {isRTL ? 'ضمان كايرو فولت مكتوب' : 'Written CairoVolt Warranty'}</span>
                            <span className="flex items-center gap-1"><SvgIcon name="truck" className="w-3.5 h-3.5" /> {isRTL ? 'توصيل داخل مصر' : 'Delivery Within Egypt'}</span>
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
                                    src="/cairovolt_logo.webp"
                                    alt="CairoVolt"
                                    width={160}
                                    height={89}
                                    loading="eager"
                                    sizes="(max-width: 768px) 120px, 160px"
                                    className="object-contain h-[57.5px] md:h-[58px] w-auto dark:[filter:brightness(0)_invert(1)]"
                                />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent hidden sm:inline">
                            {isRTL ? 'كايرو فولت' : 'CairoVolt'}
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
                                <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    {isRTL ? 'منتجات انكر' : 'Anker Products'}
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
                                {/* Soundcore audio sub-brand — distinct visual section */}
                                <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2">
                                    <div className="px-3 py-1.5 text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider flex items-center gap-1">
                                        <span>🎧</span> {isRTL ? 'ساوندكور من انكر' : 'Soundcore by Anker'}
                                    </div>
                                    {soundcoreCategories.map((cat) => (
                                        <Link
                                            key={cat.href}
                                            href={getLocalizedHref(cat.href)}
                                            className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                                                cat.primary
                                                    ? 'font-semibold text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                                                    : 'text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600'
                                            }`}
                                        >
                                            <SvgIcon name={cat.icon} className="w-5 h-5" />
                                            <span>{isRTL ? cat.label.ar : cat.label.en}</span>
                                        </Link>
                                    ))}
                                </div>
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
                                <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
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
                        {/* Search */}
                        <Link
                            href={getLocalizedHref('/search')}
                            className="p-2 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors touch-target group"
                            aria-label={isRTL ? 'البحث في المنتجات' : 'Search products'}
                        >
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                            </svg>
                        </Link>

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
                                <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-gray-900">
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

            {/* Mobile Menu (Dynamic / Lazy-loaded) */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                isRTL={isRTL}
                tBrand={tBrand}
                tCat={tCat}
                getLocalizedHref={getLocalizedHref}
            />

            {/* Spacer for fixed header */}
            <div className="h-16 md:h-[calc(4.5rem+28px)]"></div>
        </>
    );
}
