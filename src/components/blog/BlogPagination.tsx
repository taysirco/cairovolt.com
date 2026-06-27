'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ── Types ─────────────────────────────────────────────────── */
interface ArticleSummary {
    slug: string;
    category: string;
    readingTime: number;
    coverImage?: string;
    publishDate: string;
    modifiedDate: string;
    title: string;
    excerpt: string;
}

interface BlogPaginationProps {
    articles: ArticleSummary[];
    isArabic: boolean;
    locale: string;
    categoryLabels: Record<string, { ar: string; en: string; icon: string }>;
}

const ARTICLES_PER_PAGE = 20;

/* ── Category badge icons (inline SVG paths) ──────────────── */
const iconPaths: Record<string, string> = {
    book: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    scale: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
    wrench: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    bulb: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
};

function CategoryIcon({ name, className }: { name: string; className?: string }) {
    const d = iconPaths[name] || iconPaths.bulb;
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d={d} />
        </svg>
    );
}

/* ── Pagination Numbers ──────────────────────────────────── */
function PaginationNumbers({
    current,
    total,
    onChange,
    isArabic,
}: {
    current: number;
    total: number;
    onChange: (p: number) => void;
    isArabic: boolean;
}) {
    const pages: (number | '…')[] = [];

    if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
    } else {
        pages.push(1);
        if (current > 3) pages.push('…');
        for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
            pages.push(i);
        }
        if (current < total - 2) pages.push('…');
        pages.push(total);
    }

    const btn = (content: React.ReactNode, p: number | null, active = false, disabled = false) => (
        <button
            key={typeof content === 'number' ? content : Math.random()}
            onClick={() => p !== null && onChange(p)}
            disabled={disabled}
            aria-current={active ? 'page' : undefined}
            className={[
                'flex items-center justify-center w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200',
                active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : disabled
                    ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400',
            ].join(' ')}
        >
            {content}
        </button>
    );

    return (
        <nav
            aria-label={isArabic ? 'تصفح صفحات المدونة' : 'Blog pagination'}
            className="flex items-center justify-center gap-1 mt-14"
        >
            {/* Prev */}
            {btn(
                <svg className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>,
                current - 1,
                false,
                current === 1
            )}

            {/* Numbers */}
            {pages.map((p, i) =>
                p === '…' ? (
                    <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm">
                        …
                    </span>
                ) : (
                    btn(p, p, p === current)
                )
            )}

            {/* Next */}
            {btn(
                <svg className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>,
                current + 1,
                false,
                current === total
            )}
        </nav>
    );
}

/* ── Main Component ──────────────────────────────────────── */
export default function BlogPagination({ articles, isArabic, locale, categoryLabels }: BlogPaginationProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);

    const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
    const startIdx = (currentPage - 1) * ARTICLES_PER_PAGE;
    const pageArticles = articles.slice(startIdx, startIdx + ARTICLES_PER_PAGE);

    const getLocalizedHref = useCallback(
        (path: string) => {
            const cleanPath = path.startsWith('/') ? path : `/${path}`;
            return locale === 'ar' ? cleanPath : `/${locale}${cleanPath}`;
        },
        [locale]
    );

    const handlePageChange = useCallback((page: number) => {
        if (page < 1 || page > totalPages) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentPage(page);
            setIsAnimating(false);
            // Smooth scroll to grid top
            gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 180);
    }, [totalPages]);

    // Reset to page 1 if articles change (e.g. filter)
    useEffect(() => {
        setCurrentPage(1);
    }, [articles.length]);

    return (
        <>
            {/* Page counter */}
            {totalPages > 1 && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {isArabic
                        ? `الصفحة ${currentPage} من ${totalPages} — ${articles.length} تدوينة`
                        : `Page ${currentPage} of ${totalPages} — ${articles.length} articles`}
                </p>
            )}

            {/* Grid */}
            <div
                ref={gridRef}
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 max-w-6xl mx-auto transition-opacity duration-200 ${
                    isAnimating ? 'opacity-0' : 'opacity-100'
                }`}
            >
                {pageArticles.map((article) => {
                    const catLabel = categoryLabels[article.category] || { ar: article.category, en: article.category, icon: 'bulb' };

                    return (
                        <Link
                            key={article.slug}
                            href={getLocalizedHref(`/blog/${article.slug}`)}
                            prefetch={true}
                            className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Cover Image */}
                            <div className="relative aspect-[1.91/1] overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/10">
                                {article.coverImage ? (
                                    <Image
                                        src={article.coverImage}
                                        alt={article.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                                        <CategoryIcon name={catLabel.icon} className="w-16 h-16 text-white/20" />
                                    </div>
                                )}
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                {/* Category Badge */}
                                <div className="absolute top-3 start-3">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm text-blue-700 dark:text-blue-300 shadow-sm">
                                        <CategoryIcon name={catLabel.icon} className="w-3.5 h-3.5" />
                                        {isArabic ? catLabel.ar : catLabel.en}
                                    </span>
                                </div>
                                {/* Reading time */}
                                <div className="absolute bottom-3 end-3">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm text-white">
                                        {isArabic ? `${article.readingTime} د` : `${article.readingTime} min`}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-5">
                                <h2 className="text-lg md:text-base font-bold text-gray-900 dark:text-white mb-3 md:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                                    {article.title}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-3 line-clamp-2">
                                    {article.excerpt}
                                </p>

                                {/* Meta */}
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
                                    <span>
                                        {new Date(article.modifiedDate).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                    <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                                        {isArabic ? 'اقرأ المزيد' : 'Read more'}
                                        <svg className="w-3.5 h-3.5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <PaginationNumbers
                    current={currentPage}
                    total={totalPages}
                    onChange={handlePageChange}
                    isArabic={isArabic}
                />
            )}
        </>
    );
}
