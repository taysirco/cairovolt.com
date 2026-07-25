'use client';

/**
 * داشبورد الإشراف على التقييمات
 *
 * يعرض التقييمات المعلّقة والمنشورة والمرفوضة، مع اعتماد/رفض التقييم
 * وإعادة محاولة إرسال مكافأة العميل عند الحاجة.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { SvgIcon } from '@/components/ui/SvgIcon';

type ReviewStatus = 'pending' | 'approved' | 'rejected';
type Notice = { type: 'success' | 'warning' | 'error'; text: string };

interface PendingReview {
    id: string;
    productSlug: string;
    productName: string;
    customerName: string;
    rating: number;
    title?: string;
    reviewText: string;
    images: string[];
    isVerified: boolean;
    authEmail: string;
    authProvider: string;
    rewardPhone: string;
    rewardStatus: string;
    rewardRef?: string;
    reviewDate: string | null;
}

const TABS: Array<{
    id: ReviewStatus;
    label: string;
    shortLabel: string;
    icon: string;
}> = [
    { id: 'pending', label: 'قيد المراجعة', shortLabel: 'معلّقة', icon: 'clock' },
    { id: 'approved', label: 'التقييمات المنشورة', shortLabel: 'منشورة', icon: 'check-circle' },
    { id: 'rejected', label: 'التقييمات المرفوضة', shortLabel: 'مرفوضة', icon: 'x-circle' },
];

const AUTH_PROVIDER_LABELS: Record<string, string> = {
    google: 'Google',
    facebook: 'Facebook',
    order_token: 'رابط طلب موثّق',
};

function formatReviewDate(value: string | null): string {
    if (!value) return 'بدون تاريخ';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value.slice(0, 10);
    return new Intl.DateTimeFormat('ar-EG', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

function ReviewStars({ rating }: { rating: number }) {
    const normalizedRating = Math.max(0, Math.min(5, Math.round(rating)));

    return (
        <div className="flex items-center gap-1" aria-label={`${normalizedRating} من 5 نجوم`}>
            <span className="ml-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-black text-amber-800">
                {normalizedRating}.0
            </span>
            <span className="flex items-center gap-0.5" dir="ltr" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                    <SvgIcon
                        key={index}
                        name="star"
                        className={`h-4 w-4 ${index < normalizedRating ? 'text-amber-400' : 'text-slate-200'}`}
                    />
                ))}
            </span>
        </div>
    );
}

export default function ModerationPage() {
    const [secret, setSecret] = useState('');
    const [authed, setAuthed] = useState(false);
    const [checkingSession, setCheckingSession] = useState(true);
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState<PendingReview[]>([]);
    const [busy, setBusy] = useState('');
    const [notice, setNotice] = useState<Notice | null>(null);
    const [tab, setTab] = useState<ReviewStatus>('pending');
    const [query, setQuery] = useState('');

    const load = useCallback(async (sec: string, status: ReviewStatus) => {
        setLoading(true);
        setNotice(null);

        try {
            const response = await fetch(`/api/reviews/moderate?status=${status}`, {
                headers: sec ? { 'X-Admin-Secret': sec } : {},
                credentials: 'same-origin',
                cache: 'no-store',
            });

            if (response.status === 401) {
                setAuthed(false);
                if (sec) {
                    setNotice({ type: 'error', text: 'مفتاح الإدارة غير صحيح.' });
                }
                return;
            }

            const data = await response.json() as {
                reviews?: PendingReview[];
                error?: string;
            };

            if (!response.ok) {
                setNotice({ type: 'error', text: data.error || 'تعذّر تحميل التقييمات.' });
                return;
            }

            setReviews(data.reviews || []);
            setAuthed(true);
            setTab(status);
            if (sec) sessionStorage.setItem('mod_secret', sec);
        } catch {
            setNotice({ type: 'error', text: 'تعذّر الاتصال بالخادم. حاول مرة أخرى.' });
        } finally {
            setCheckingSession(false);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const savedSecret = sessionStorage.getItem('mod_secret') || '';
        setSecret(savedSecret);
        void load(savedSecret, 'pending');
    }, [load]);

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!secret.trim() || loading) return;
        void load(secret.trim(), 'pending');
    };

    const selectTab = (status: ReviewStatus) => {
        if (status === tab || loading) return;
        setQuery('');
        void load(secret, status);
    };

    const act = async (reviewId: string, action: 'approve' | 'reject') => {
        setBusy(reviewId);
        setNotice(null);

        try {
            const response = await fetch('/api/reviews/moderate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(secret ? { 'X-Admin-Secret': secret } : {}),
                },
                credentials: 'same-origin',
                cache: 'no-store',
                body: JSON.stringify({ action, reviewId }),
            });
            const data = await response.json() as {
                error?: string;
                rewardStatus?: string;
            };

            if (response.status === 401) {
                setAuthed(false);
                setNotice({ type: 'error', text: 'انتهت جلسة الإدارة. سجّل الدخول من جديد.' });
                return;
            }

            if (!response.ok) {
                setNotice({ type: 'error', text: data.error || 'تعذّر تحديث التقييم.' });
                return;
            }

            if (action === 'approve') {
                setNotice(data.rewardStatus === 'crm_notified'
                    ? { type: 'success', text: 'تم نشر التقييم، وكوبون الخصم في طريقه للعميل عبر واتساب.' }
                    : { type: 'warning', text: 'تم نشر التقييم، لكن تعذّر إرسال الكوبون. يمكنك إعادة المحاولة من التقييمات المنشورة.' });
            } else {
                setNotice({ type: 'success', text: 'تم رفض التقييم ونقله إلى قائمة المرفوضة.' });
            }

            setReviews(current => current.filter(review => review.id !== reviewId));
        } catch {
            setNotice({ type: 'error', text: 'تعذّر الاتصال بالخادم. حاول مرة أخرى.' });
        } finally {
            setBusy('');
        }
    };

    const filteredReviews = useMemo(() => {
        const normalizedQuery = query.trim().toLocaleLowerCase('ar');
        if (!normalizedQuery) return reviews;

        return reviews.filter(review => [
            review.customerName,
            review.productName,
            review.reviewText,
            review.title || '',
            review.authEmail,
        ].some(value => value.toLocaleLowerCase('ar').includes(normalizedQuery)));
    }, [query, reviews]);

    const summary = useMemo(() => ({
        total: reviews.length,
        verified: reviews.filter(review => review.isVerified).length,
        rewarded: reviews.filter(review => Boolean(review.rewardRef)).length,
        withImages: reviews.filter(review => review.images.length > 0).length,
    }), [reviews]);

    if (checkingSession) {
        return (
            <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#07111f] text-white" dir="rtl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(59,130,246,.2),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(245,158,11,.12),transparent_30%)]" />
                <div className="relative flex flex-col items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.06]">
                        <SvgIcon name="arrows-rotate" className="h-6 w-6 animate-spin text-sky-300" />
                    </span>
                    <p className="text-sm font-semibold text-slate-300">جارِ التحقق من جلسة الإدارة…</p>
                </div>
            </main>
        );
    }

    if (!authed) {
        return (
            <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#07111f] px-4 py-12 text-white" dir="rtl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_5%,rgba(14,165,233,.22),transparent_34%),radial-gradient(circle_at_15%_90%,rgba(245,158,11,.14),transparent_30%)]" />
                <div className="absolute -right-24 top-24 h-72 w-72 rounded-full border border-white/[0.05]" />
                <div className="absolute -right-12 top-36 h-48 w-48 rounded-full border border-white/[0.05]" />

                <form
                    onSubmit={handleLogin}
                    className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.065] p-6 shadow-[0_30px_100px_rgba(0,0,0,.4)] backdrop-blur-xl sm:p-8"
                >
                    <div className="mb-7">
                        <div className="mb-6 flex items-center justify-between">
                            <span className="text-lg font-black tracking-tight">CairoVolt</span>
                            <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[.16em] text-sky-200">
                                Admin
                            </span>
                        </div>
                        <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-blue-950/40">
                            <SvgIcon name="shield" className="h-7 w-7 text-white" />
                        </span>
                        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">إشراف التقييمات</h1>
                        <p className="mt-2 text-sm leading-7 text-slate-400">
                            راجع تقييمات العملاء وانشر المحتوى الموثوق من مساحة الإدارة الآمنة.
                        </p>
                    </div>

                    <label htmlFor="moderation-secret" className="mb-2 block text-xs font-bold text-slate-300">
                        مفتاح الإدارة
                    </label>
                    <div className="rounded-2xl border border-white/10 bg-[#050c16] p-1 transition focus-within:border-sky-400/60 focus-within:ring-4 focus-within:ring-sky-400/10">
                        <input
                            id="moderation-secret"
                            type="password"
                            value={secret}
                            onChange={event => {
                                setSecret(event.target.value);
                                setNotice(null);
                            }}
                            placeholder="Admin secret"
                            autoComplete="off"
                            autoCapitalize="none"
                            spellCheck={false}
                            autoFocus
                            required
                            className="w-full border-0 bg-transparent px-4 py-3 text-left text-base text-white outline-none placeholder:text-slate-700"
                            dir="ltr"
                        />
                    </div>

                    {notice && (
                        <p role="alert" className="mt-3 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm font-semibold text-rose-200">
                            {notice.text}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !secret.trim()}
                        className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#07111f] shadow-lg transition hover:-translate-y-0.5 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                        {loading ? (
                            <>
                                <SvgIcon name="arrows-rotate" className="h-4 w-4 animate-spin" />
                                جارِ تسجيل الدخول…
                            </>
                        ) : (
                            <>
                                دخول آمن
                                <span aria-hidden="true">←</span>
                            </>
                        )}
                    </button>

                    <p className="mt-5 text-center text-[11px] leading-5 text-slate-500">
                        الجلسة محمية ومخصّصة لفريق كايرو فولت فقط.
                    </p>
                </form>
            </main>
        );
    }

    const activeTab = TABS.find(item => item.id === tab) || TABS[0];

    return (
        <main className="min-h-screen bg-[#f5f6f8] text-[#07111f]" dir="rtl">
            <section className="relative overflow-hidden bg-[#07111f] pb-24 pt-7 text-white sm:pb-28 sm:pt-9">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(14,165,233,.23),transparent_30%),radial-gradient(circle_at_8%_100%,rgba(245,158,11,.13),transparent_26%)]" />
                <div className="absolute -left-16 -top-24 h-72 w-72 rounded-full border border-white/[0.05]" />

                <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.07]">
                                <SvgIcon name="shield" className="h-5 w-5 text-sky-300" />
                            </span>
                            <div>
                                <p className="text-sm font-black">CairoVolt Admin</p>
                                <p className="text-[11px] text-slate-500">مركز إدارة آمن</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => void load(secret, tab)}
                            disabled={loading}
                            className="flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-xs font-bold text-slate-200 transition hover:border-sky-300/30 hover:bg-white/[0.1] disabled:opacity-50"
                        >
                            <SvgIcon name="arrows-rotate" className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            تحديث البيانات
                        </button>
                    </div>

                    <div className="max-w-3xl">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-[11px] font-black text-amber-200">
                            <SvgIcon name="star" className="h-3.5 w-3.5" />
                            تجربة العميل تبدأ من كلمة صادقة
                        </span>
                        <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                            إشراف التقييمات
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                            راجع تجارب العملاء، تحقّق من التفاصيل، وانشر التقييمات بوضوح وشفافية.
                        </p>
                    </div>
                </div>
            </section>

            <div className="relative z-10 mx-auto -mt-16 max-w-6xl px-4 pb-16 sm:px-6">
                <section aria-label="ملخص التقييمات" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {[
                        { label: activeTab.label, value: summary.total, icon: 'mail', tone: 'text-sky-700 bg-sky-50' },
                        { label: 'مشتري موثّق', value: summary.verified, icon: 'shield', tone: 'text-emerald-700 bg-emerald-50' },
                        { label: 'مؤهّل لمكافأة', value: summary.rewarded, icon: 'gift', tone: 'text-amber-700 bg-amber-50' },
                        { label: 'مرفق بصور', value: summary.withImages, icon: 'camera', tone: 'text-violet-700 bg-violet-50' },
                    ].map(item => (
                        <article
                            key={item.label}
                            className="rounded-[1.5rem] border border-slate-200/80 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.07)] sm:p-5"
                        >
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <span className={`grid h-10 w-10 place-items-center rounded-xl ${item.tone}`}>
                                    <SvgIcon name={item.icon} className="h-5 w-5" />
                                </span>
                                <span className="text-2xl font-black tracking-tight sm:text-3xl">{item.value}</span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-500 sm:text-xs">{item.label}</p>
                        </article>
                    ))}
                </section>

                <section className="mt-5 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,.06)]">
                    <div className="border-b border-slate-100 p-3 sm:p-4">
                        <div className="grid grid-cols-3 gap-1 rounded-2xl bg-slate-100 p-1.5">
                            {TABS.map(item => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => selectTab(item.id)}
                                    disabled={loading}
                                    aria-pressed={tab === item.id}
                                    className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-2 text-xs font-black transition sm:text-sm ${
                                        tab === item.id
                                            ? 'bg-[#07111f] text-white shadow-md'
                                            : 'text-slate-500 hover:bg-white hover:text-slate-800'
                                    } disabled:cursor-wait`}
                                >
                                    <SvgIcon name={item.icon} className="hidden h-4 w-4 sm:block" />
                                    <span className="sm:hidden">{item.shortLabel}</span>
                                    <span className="hidden sm:inline">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                        <div>
                            <h2 className="font-black text-slate-900">{activeTab.label}</h2>
                            <p className="mt-1 text-xs text-slate-500">
                                {loading ? 'جارِ تحميل أحدث البيانات…' : `${filteredReviews.length} تقييم ظاهر`}
                            </p>
                        </div>

                        <label className="relative block w-full sm:max-w-xs">
                            <span className="sr-only">ابحث في التقييمات</span>
                            <SvgIcon name="search" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="search"
                                value={query}
                                onChange={event => setQuery(event.target.value)}
                                placeholder="عميل، منتج، أو نص التقييم"
                                className="min-h-11 w-full rounded-xl border border-slate-200 bg-[#f7f8fa] py-2 pl-4 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                            />
                        </label>
                    </div>

                    {notice && (
                        <div
                            role="status"
                            aria-live="polite"
                            className={`mx-4 mt-4 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold sm:mx-5 ${
                                notice.type === 'success'
                                    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                                    : notice.type === 'warning'
                                        ? 'border-amber-200 bg-amber-50 text-amber-800'
                                        : 'border-rose-200 bg-rose-50 text-rose-800'
                            }`}
                        >
                            <SvgIcon
                                name={notice.type === 'success' ? 'check-circle' : notice.type === 'warning' ? 'shield-alert' : 'x-circle'}
                                className="mt-0.5 h-5 w-5 shrink-0"
                            />
                            <span className="leading-6">{notice.text}</span>
                        </div>
                    )}

                    <div className="p-4 sm:p-5">
                        {loading ? (
                            <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-slate-200 bg-[#f7f8fa]">
                                <div className="flex flex-col items-center gap-3 text-slate-500">
                                    <SvgIcon name="arrows-rotate" className="h-6 w-6 animate-spin text-sky-600" />
                                    <p className="text-sm font-bold">جارِ تحميل التقييمات…</p>
                                </div>
                            </div>
                        ) : filteredReviews.length === 0 ? (
                            <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-slate-200 bg-[#f7f8fa] px-6 text-center">
                                <div>
                                    <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white text-slate-400 shadow-sm">
                                        <SvgIcon name={query ? 'search' : activeTab.icon} className="h-6 w-6" />
                                    </span>
                                    <h3 className="font-black text-slate-800">
                                        {query ? 'لا توجد نتائج مطابقة' : 'القائمة فارغة حاليًا'}
                                    </h3>
                                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                        {query
                                            ? 'جرّب البحث باسم عميل أو منتج مختلف.'
                                            : `لا توجد تقييمات ضمن «${activeTab.label}» الآن.`}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredReviews.map(review => (
                                    <article
                                        key={review.id}
                                        className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(15,23,42,.07)]"
                                    >
                                        <div className="p-4 sm:p-5">
                                            <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#07111f] text-sm font-black text-white">
                                                        {review.customerName.trim().charAt(0) || 'ع'}
                                                    </span>
                                                    <div className="min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <h3 className="truncate font-black text-slate-900">{review.customerName}</h3>
                                                            {review.isVerified && (
                                                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-700">
                                                                    <SvgIcon name="check-circle" className="h-3 w-3" />
                                                                    مشترٍ موثّق
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="mt-1 text-[11px] text-slate-400">{formatReviewDate(review.reviewDate)}</p>
                                                    </div>
                                                </div>
                                                <ReviewStars rating={review.rating} />
                                            </header>

                                            <div className="mt-5 grid gap-3 rounded-2xl border border-slate-100 bg-[#f7f8fa] p-4 sm:grid-cols-2">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">المنتج</p>
                                                    <p className="mt-1 text-sm font-bold text-slate-700">{review.productName || review.productSlug}</p>
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">مصدر التقييم</p>
                                                    <p className="mt-1 truncate text-sm font-bold text-slate-700" dir={review.authEmail ? 'ltr' : 'rtl'}>
                                                        {review.authEmail || AUTH_PROVIDER_LABELS[review.authProvider] || 'غير محدد'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-5">
                                                {review.title && <h4 className="mb-2 text-lg font-black text-slate-900">{review.title}</h4>}
                                                <p className="whitespace-pre-wrap text-sm leading-8 text-slate-600 sm:text-base">{review.reviewText}</p>
                                            </div>

                                            <div className="mt-5 flex flex-wrap items-center gap-2">
                                                {review.rewardRef ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-800">
                                                        <SvgIcon name="gift" className="h-3.5 w-3.5" />
                                                        مؤهّل لكوبون 5%
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-500">
                                                        تقييم عضوي
                                                    </span>
                                                )}
                                                {review.authProvider && (
                                                    <span className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-bold text-slate-500">
                                                        {AUTH_PROVIDER_LABELS[review.authProvider] || review.authProvider}
                                                    </span>
                                                )}
                                            </div>

                                            {review.images.length > 0 && (
                                                <div className="mt-5">
                                                    <p className="mb-2 text-xs font-black text-slate-500">صور العميل ({review.images.length})</p>
                                                    <div className="flex gap-2 overflow-x-auto pb-1">
                                                        {review.images.map((src, index) => (
                                                            <a
                                                                key={`${review.id}-${index}`}
                                                                href={src}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:h-28 sm:w-28"
                                                            >
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img
                                                                    src={src}
                                                                    alt={`صورة مرفقة بالتقييم ${index + 1}`}
                                                                    loading="lazy"
                                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                                />
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {tab === 'pending' && (
                                            <footer className="grid gap-2 border-t border-slate-100 bg-[#fafbfc] p-3 sm:grid-cols-[1fr_auto] sm:p-4">
                                                <button
                                                    type="button"
                                                    disabled={busy === review.id}
                                                    onClick={() => void act(review.id, 'approve')}
                                                    className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#07111f] px-5 text-sm font-black text-white transition hover:bg-sky-800 disabled:cursor-wait disabled:opacity-50"
                                                >
                                                    {busy === review.id ? (
                                                        <SvgIcon name="arrows-rotate" className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <SvgIcon name="check-circle" className="h-4 w-4 text-emerald-300" />
                                                    )}
                                                    موافقة ونشر التقييم
                                                    {review.rewardRef && <span className="text-amber-300">+ كوبون 5%</span>}
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={busy === review.id}
                                                    onClick={() => void act(review.id, 'reject')}
                                                    className="min-h-12 rounded-xl border border-rose-200 bg-white px-5 text-sm font-black text-rose-700 transition hover:bg-rose-50 disabled:cursor-wait disabled:opacity-50"
                                                >
                                                    رفض التقييم
                                                </button>
                                            </footer>
                                        )}

                                        {tab === 'approved' && review.rewardStatus === 'notify_failed' && (
                                            <footer className="border-t border-amber-100 bg-amber-50 p-3 sm:p-4">
                                                <button
                                                    type="button"
                                                    disabled={busy === review.id}
                                                    onClick={() => void act(review.id, 'approve')}
                                                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 text-sm font-black text-white transition hover:bg-amber-600 disabled:cursor-wait disabled:opacity-50"
                                                >
                                                    <SvgIcon name="arrows-rotate" className={`h-4 w-4 ${busy === review.id ? 'animate-spin' : ''}`} />
                                                    إعادة محاولة إرسال كوبون 5%
                                                </button>
                                            </footer>
                                        )}
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
