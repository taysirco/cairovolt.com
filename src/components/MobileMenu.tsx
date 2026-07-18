'use client';

import { InstantLink as Link } from '@/components/ui/InstantLink';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { trackWhatsappClick } from '@/lib/analytics';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    isRTL: boolean;
    tBrand: (key: string) => string;
    tCat: (key: string) => string;
    getLocalizedHref: (path: string) => string;
}

export default function MobileMenu({
    isOpen,
    onClose,
    isRTL,
    tBrand,
    tCat,
    getLocalizedHref,
}: MobileMenuProps) {
    const ankerCategories = [
        { slug: 'power-banks', icon: 'battery', key: 'powerBanks' },
        { slug: 'wall-chargers', icon: 'plug', key: 'wallChargers' },
        { slug: 'cables', icon: 'link', key: 'cables' },
        { slug: 'car-chargers', icon: 'car', key: 'carChargers' },
    ];

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
        <div
            className={`fixed inset-0 z-40 lg:hidden ${
                isOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={onClose}
            />

            {/* Menu Panel */}
            <div
                className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-80 h-full bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-200 ease-out will-change-transform ${
                    isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'
                } overflow-y-auto`}
                dir={isRTL ? 'rtl' : 'ltr'}
            >
                {/* pt-20 drops the menu content below the fixed header (h-16) so the
                    close button is never cramped under it. No logo/brand here — the
                    header already shows them; rendering them again was the duplicate. */}
                <div className="px-6 pb-6 pt-20">
                    {/* Close button — large, clear target at the top of the panel */}
                    <div className="flex justify-start mb-6">
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 transition"
                            aria-label={isRTL ? 'إغلاق القائمة' : 'Close menu'}
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                        onClick={onClose}
                                        className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                    >
                                        <SvgIcon name={cat.icon} className="w-5 h-5" />
                                        <span>{tCat(cat.key)}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Soundcore Section (Anker's audio sub-brand) */}
                        <div>
                            <h3 className="flex items-center gap-2 text-sm font-bold text-orange-600 mb-3">
                                <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                                🎧 {isRTL ? 'ساوندكور من انكر' : 'Soundcore by Anker'}
                            </h3>
                            <div className="space-y-1">
                                {soundcoreCategories.map((cat) => (
                                    <Link
                                        key={cat.href}
                                        href={getLocalizedHref(cat.href)}
                                        onClick={onClose}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                                            cat.primary
                                                ? 'font-semibold text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        <SvgIcon name={cat.icon} className="w-5 h-5" />
                                        <span>{isRTL ? cat.label.ar : cat.label.en}</span>
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
                                        onClick={onClose}
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
                                        onClick={onClose}
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
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium"
                                >
                                    <SvgIcon name="book" className="w-5 h-5" />
                                    <span>{isRTL ? 'المدونة' : 'Blog'}</span>
                                </Link>
                                <Link
                                    href={getLocalizedHref('/about')}
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                >
                                    <SvgIcon name="question" className="w-5 h-5" />
                                    <span>{isRTL ? 'من نحن' : 'About Us'}</span>
                                </Link>
                                <Link
                                    href={getLocalizedHref('/team')}
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                >
                                    <SvgIcon name="briefcase" className="w-5 h-5" />
                                    <span>{isRTL ? 'خبراء ننصح بهم' : 'Recommended Experts'}</span>
                                </Link>
                                <Link
                                    href={getLocalizedHref('/faq')}
                                    onClick={onClose}
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
                                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-700 text-white font-medium rounded-xl"
                                suppressHydrationWarning
                            >
                                <SvgIcon name="phone" className="w-4 h-4 inline-block" /> {isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
