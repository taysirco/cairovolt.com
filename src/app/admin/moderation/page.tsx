'use client';

/**
 * 🛡️ داشبورد الإشراف على التقييمات — النظام المبسّط
 *
 * قائمة التقييمات المعلّقة (نجوم/نص/صور/مشترٍ موثَّق) مع موافقة/رفض بضغطة.
 * الموافقة تنشر التقييم على صفحة المنتج وتُطلق كوبون 5% واتساب تلقائياً عبر الـCRM.
 * الدخول: سر الأدمن (ADMIN_TASKS_SECRET) — يُحفظ بالجلسة فقط.
 */

import { useCallback, useEffect, useState } from 'react';

interface PendingReview {
    id: string;
    productSlug: string; productName: string;
    customerName: string; rating: number;
    title?: string; reviewText: string;
    images: string[];
    isVerified: boolean;
    authEmail: string; authProvider: string;
    rewardPhone: string; rewardStatus: string;
    reviewDate: string | null;
}

export default function ModerationPage() {
    const [secret, setSecret] = useState('');
    const [authed, setAuthed] = useState(false);
    const [reviews, setReviews] = useState<PendingReview[]>([]);
    const [busy, setBusy] = useState('');
    const [msg, setMsg] = useState('');
    const [tab, setTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

    const load = useCallback(async (sec: string, status: string) => {
        const res = await fetch(`/api/reviews/moderate?status=${status}`, {
            headers: { 'X-Admin-Secret': sec }, cache: 'no-store',
        });
        if (res.status === 401) { setAuthed(false); setMsg('سر غير صحيح'); return; }
        const j = await res.json();
        setReviews(j.reviews || []);
        setAuthed(true);
        sessionStorage.setItem('mod_secret', sec);
    }, []);

    useEffect(() => {
        const saved = sessionStorage.getItem('mod_secret');
        if (saved) { setSecret(saved); load(saved, 'pending'); }
    }, [load]);

    const act = async (reviewId: string, action: 'approve' | 'reject') => {
        setBusy(reviewId); setMsg('');
        try {
            const res = await fetch('/api/reviews/moderate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Admin-Secret': secret },
                body: JSON.stringify({ action, reviewId }),
            });
            const j = await res.json();
            if (!res.ok) { setMsg(String(j.error || 'فشل')); return; }
            setMsg(action === 'approve'
                ? (j.rewardStatus === 'crm_notified' ? '✅ نُشر — وكوبون 5% في طريقه للعميل واتساب 🎁' : '✅ نُشر — ⚠️ تعذّر إرسال الكوبون (أعد الموافقة للمحاولة مجدداً)')
                : '🚫 رُفض');
            setReviews(r => r.filter(x => x.id !== reviewId));
        } finally { setBusy(''); }
    };

    if (!authed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir="rtl">
                <div className="bg-white rounded-2xl shadow p-6 w-full max-w-sm space-y-3">
                    <h1 className="font-bold text-lg">🛡️ إشراف التقييمات</h1>
                    <input type="password" value={secret} onChange={e => setSecret(e.target.value)}
                        placeholder="سر الأدمن" className="w-full border rounded-lg px-3 py-2" dir="ltr" />
                    <button onClick={() => load(secret, 'pending')}
                        className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-bold">دخول</button>
                    {msg && <p className="text-sm text-rose-600">{msg}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
            <div className="max-w-3xl mx-auto space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold text-xl">🛡️ إشراف التقييمات</h1>
                    <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm">
                        {(['pending', 'approved', 'rejected'] as const).map(t => (
                            <button key={t} onClick={() => { setTab(t); load(secret, t); }}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${tab === t ? 'bg-blue-600 text-white' : 'text-gray-600'}`}>
                                {t === 'pending' ? '⏳ معلّقة' : t === 'approved' ? '✅ منشورة' : '🚫 مرفوضة'}
                            </button>
                        ))}
                    </div>
                </div>
                {msg && <p className="text-sm font-medium bg-white rounded-xl p-3 shadow-sm">{msg}</p>}
                {reviews.length === 0 && <p className="text-gray-500 text-center py-10">لا توجد تقييمات هنا 🎉</p>}
                {reviews.map(r => (
                    <div key={r.id} className="bg-white rounded-2xl shadow-sm p-4 space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <div>
                                <span className="font-bold">{r.customerName}</span>
                                {r.isVerified && <span className="mr-2 text-xs bg-emerald-100 text-emerald-700 rounded-full px-2 py-0.5">✓ مشترٍ موثَّق</span>}
                                <span className="mr-2 text-amber-500">{'⭐'.repeat(r.rating)}</span>
                            </div>
                            <span className="text-xs text-gray-400">{r.reviewDate?.slice(0, 10)}</span>
                        </div>
                        <p className="text-sm text-gray-500">{r.productName} <span className="text-gray-300">|</span> {r.authEmail} <span className="text-gray-300">|</span> واتساب: <span dir="ltr">{r.rewardPhone}</span></p>
                        {r.title && <p className="font-semibold">{r.title}</p>}
                        <p className="text-gray-800 leading-relaxed">{r.reviewText}</p>
                        {r.images.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                                {r.images.map((src, i) => (
                                    <a key={i} href={src} target="_blank" rel="noopener">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={src} alt="" loading="lazy" className="h-24 w-24 object-cover rounded-lg border" />
                                    </a>
                                ))}
                            </div>
                        )}
                        {tab === 'pending' && (
                            <div className="flex gap-2 pt-1">
                                <button disabled={busy === r.id} onClick={() => act(r.id, 'approve')}
                                    className="flex-1 py-2 rounded-lg bg-emerald-600 text-white font-bold disabled:opacity-50">
                                    {busy === r.id ? '…' : '✅ موافقة + كوبون 5%'}
                                </button>
                                <button disabled={busy === r.id} onClick={() => act(r.id, 'reject')}
                                    className="flex-1 py-2 rounded-lg bg-rose-600 text-white font-bold disabled:opacity-50">🚫 رفض</button>
                            </div>
                        )}
                        {/* تقييم منشور لكن الكوبون لم يصل للعميل → زر إعادة إرسال (idempotent في الـCRM) */}
                        {tab === 'approved' && r.rewardStatus === 'notify_failed' && (
                            <div className="pt-1">
                                <button disabled={busy === r.id} onClick={() => act(r.id, 'approve')}
                                    className="w-full py-2 rounded-lg bg-amber-500 text-white font-bold disabled:opacity-50">
                                    {busy === r.id ? '…' : '🔁 إعادة إرسال كوبون 5% (تعذّر أول مرة)'}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
