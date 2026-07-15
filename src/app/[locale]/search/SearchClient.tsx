'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getBrandDisplayName, localizeArabicBrandNames } from '@/lib/arabic-brand-names';

interface SearchProduct {
    slug: string;
    url: string;
    nameAr: string;
    nameEn: string;
    brand: string;
    category: string;
    price: number;
    stock: number;
    image: string;
}

interface SearchClientProps {
    locale: string;
    index: SearchProduct[];
}

/** Arabic-aware normalization (mirror of lib/match-order-product) */
function normalize(input: string): string {
    return (input || '')
        .toLowerCase()
        .replace(/[ً-ٰٟـ]/g, '')
        .replace(/[أإآٱ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .replace(/ؤ/g, 'و')
        .replace(/ئ/g, 'ي')
        .replace(/[^ء-يa-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export default function SearchClient({ locale, index }: SearchClientProps) {
    const isArabic = locale === 'ar';
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const trackedQuery = useRef('');

    const results = useMemo(() => {
        const q = normalize(query);
        if (q.length < 2) return [];
        const terms = q.split(' ').filter(Boolean);
        return index
            .map(p => {
                const haystack = normalize(`${p.nameAr} ${p.nameEn} ${p.brand} ${p.category.replace(/-/g, ' ')} ${p.slug.replace(/-/g, ' ')}`);
                const hits = terms.filter(t => haystack.includes(t)).length;
                return { p, score: hits === terms.length ? 2 : hits > 0 ? 1 : 0, hits };
            })
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score || b.hits - a.hits || a.p.price - b.p.price)
            .slice(0, 24)
            .map(r => r.p);
    }, [query, index]);

    // Internal-search analytics: every settled query is keyword research —
    // zero-result queries especially (content/product gaps).
    useEffect(() => {
        const q = query.trim();
        if (q.length < 2 || q === trackedQuery.current) return;
        const timer = setTimeout(() => {
            trackedQuery.current = q;
            const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
            gtag?.('event', 'search', {
                search_term: q,
                results_count: results.length,
            });
        }, 1200);
        return () => clearTimeout(timer);
    }, [query, results.length]);

    // Keep the URL shareable (?q=) without history spam
    useEffect(() => {
        const q = query.trim();
        const url = new URL(window.location.href);
        if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
        window.history.replaceState(null, '', url.toString());
    }, [query]);

    return (
        <div className="min-h-[70vh] py-10" dir={isArabic ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {isArabic ? 'ابحث في منتجاتنا' : 'Search our products'}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {isArabic
                        ? 'باور بانك، شواحن، سماعات، كابلات — انكر وجوي روم الأصلية'
                        : 'Power banks, chargers, earbuds, cables — original Anker & Joyroom'}
                </p>

                <input
                    type="search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={isArabic ? 'مثال: باور بانك 20000، شاحن 45 واط…' : 'e.g. power bank 20000, 45W charger…'}
                    autoFocus
                    className="w-full px-5 py-4 text-lg rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={isArabic ? 'البحث في المنتجات' : 'Search products'}
                />

                {query.trim().length >= 2 && (
                    <p className="text-sm text-gray-500 mt-4 mb-2">
                        {isArabic
                            ? `${results.length} نتيجة لـ "${query.trim()}"`
                            : `${results.length} results for "${query.trim()}"`}
                    </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {results.map(p => (
                        <Link
                            key={p.slug}
                            href={p.url}
                            className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 hover:shadow-md transition-all"
                        >
                            {p.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={p.image.replace(/\.webp$/, '-480.webp')}
                                    alt={isArabic ? localizeArabicBrandNames(p.nameAr) : p.nameEn}
                                    width={72}
                                    height={72}
                                    loading="lazy"
                                    className="w-18 h-18 rounded-xl object-cover bg-gray-50 dark:bg-gray-800"
                                    onError={e => { (e.target as HTMLImageElement).src = p.image; }}
                                />
                            ) : (
                                <div className="w-18 h-18 rounded-xl bg-gray-100 dark:bg-gray-800" />
                            )}
                            <div className="min-w-0">
                                <div className="font-semibold text-gray-900 dark:text-white truncate">
                                    {isArabic ? localizeArabicBrandNames(p.nameAr) : p.nameEn}
                                </div>
                                <div className="text-sm text-gray-500">{getBrandDisplayName(p.brand, locale)}</div>
                                <div className="text-blue-600 dark:text-blue-400 font-bold mt-1">
                                    {p.price.toLocaleString(isArabic ? 'ar-EG' : 'en-US')} {isArabic ? 'جنيه' : 'EGP'}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {query.trim().length >= 2 && results.length === 0 && (
                    <div className="text-center py-14 text-gray-500">
                        <p className="text-lg mb-3">
                            {isArabic ? 'لا توجد نتائج مطابقة' : 'No matching products'}
                        </p>
                        <p className="text-sm mb-6">
                            {isArabic
                                ? 'جرّب كلمة أبسط (مثل "باور بانك" أو "شاحن")، أو تواصل معنا على واتساب وسنساعدك'
                                : 'Try a simpler term (like "power bank" or "charger"), or message us on WhatsApp'}
                        </p>
                        <a
                            href="https://wa.me/201558245974"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
                        >
                            {isArabic ? 'اسألنا على واتساب' : 'Ask us on WhatsApp'}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
