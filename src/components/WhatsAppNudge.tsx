'use client';

import { useState, useEffect, useCallback } from 'react';

const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.437-9.884 9.888-9.884a9.86 9.86 0 016.988 2.9 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885';

/**
 * 💬 نداء واتساب ذكي — بدل زر واتساب الدائم على صفحة المنتج.
 *
 * يظهر **مرة واحدة بعد 30 ثانية** لو العميل ما أضافش للسلة (إشارة تردّد) ليساعده يطلب.
 *  • يُلغى لو أضاف للسلة (حدث cv:addtocart) — لا يزاحم عميلاً منخرطاً.
 *  • قابل للإغلاق ويُحفَظ (sessionStorage) فلا يعود في نفس الجلسة.
 *  • **يقف فوق المكدّس السفلي** (شريط الطلب + بوكس الكوبون) بقياس حيّ — بلا تصادم مع
 *    أيّهما ولا مع نفسه؛ z-index بينهما (55) فلا يغطّي الكوبون.
 */
export default function WhatsAppNudge({ isRTL, productName, waPhone = '201558245974' }: { isRTL: boolean; productName: string; waPhone?: string }) {
    const [show, setShow] = useState(false);
    const [bottomPx, setBottomPx] = useState(16);

    const close = useCallback(() => {
        setShow(false);
        try { sessionStorage.setItem('cv_wa_nudge_done', '1'); } catch { /* noop */ }
    }, []);

    // مؤقّت 30ث — يظهر إن لم يُضِف العميل للسلة (ولم يُغلق سابقاً في الجلسة)
    useEffect(() => {
        try { if (sessionStorage.getItem('cv_wa_nudge_done') === '1') return; } catch { /* noop */ }
        let engaged = false;
        const onEngage = () => { engaged = true; };
        window.addEventListener('cv:addtocart', onEngage);
        const t = window.setTimeout(() => { if (!engaged) setShow(true); }, 30000);
        return () => { window.clearTimeout(t); window.removeEventListener('cv:addtocart', onEngage); };
    }, []);

    // لو أضاف للسلة بعد ظهوره → نخفيه (لا نزاحمه)
    useEffect(() => {
        const onEngage = () => close();
        window.addEventListener('cv:addtocart', onEngage);
        return () => window.removeEventListener('cv:addtocart', onEngage);
    }, [close]);

    // التموضع فوق المكدّس السفلي (شريط الطلب + بوكس الكوبون) بمرونة
    useEffect(() => {
        if (!show) return;
        const measure = () => {
            let occupied = 0;
            document.querySelectorAll('div').forEach((el) => {
                if (el.id === 'cv-wa-nudge' || el.closest('#cv-wa-nudge')) return;
                const cs = getComputedStyle(el);
                if (cs.position !== 'fixed') return;
                const bv = parseFloat(cs.bottom);
                if (bv < 0 || bv > 4) return;                 // شريط ملتصق بالأسفل
                const h = (el as HTMLElement).offsetHeight;
                const r = el.getBoundingClientRect();
                if (r.width > window.innerWidth * 0.7 && h >= 40 && h < 220) occupied = Math.max(occupied, h);
            });
            const promo = document.getElementById('promo-banner');       // بوكس الكوبون لو ظاهر
            if (promo && promo.firstElementChild) {
                const pr = (promo.firstElementChild as HTMLElement).getBoundingClientRect();
                occupied = Math.max(occupied, Math.round(window.innerHeight - pr.top));
            }
            setBottomPx(occupied > 0 ? occupied + 12 : 16);
        };
        measure();
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure, { passive: true });
        const iv = window.setInterval(measure, 1200);
        return () => { window.removeEventListener('resize', measure); window.removeEventListener('scroll', measure); window.clearInterval(iv); };
    }, [show]);

    if (!show) return null;

    const helpMsg = isRTL
        ? `مرحبًا 👋 بتصفّح ${productName || 'منتجاتكم'} وحابب مساعدة في الاختيار/الطلب.`
        : `Hi 👋 I'm browsing ${productName || 'your products'} and would like help choosing/ordering.`;
    const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(helpMsg)}`;

    return (
        <div
            dir={isRTL ? 'rtl' : 'ltr'}
            id="cv-wa-nudge"
            className="fixed inset-x-0 z-[55] flex justify-center px-4 pointer-events-none"
            style={{ bottom: bottomPx, transition: 'bottom .2s ease' }}
        >
            <div className="pointer-events-auto w-full max-w-sm rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden" style={{ animation: 'waNudgeUp .35s ease-out' }}>
                <div className="relative p-3">
                    <button onClick={close} aria-label={isRTL ? 'إغلاق' : 'Close'}
                        className={`absolute top-1.5 ${isRTL ? 'left-1.5' : 'right-1.5'} w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 text-lg leading-none`}>×</button>
                    <div className="flex items-center gap-3 pe-6">
                        <span className="w-9 h-9 shrink-0 rounded-full bg-green-500 flex items-center justify-center text-white" aria-hidden="true">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={WA_PATH} /></svg>
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-bold text-gray-900 dark:text-white leading-tight">
                                {isRTL ? 'لسه بتدوّر على اللي يناسبك؟' : 'Still looking for the right one?'}
                            </p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                {isRTL ? 'اسألنا وهنساعدك تختار وتطلب في ثواني' : "Ask us — we'll help you choose & order"}
                            </p>
                        </div>
                    </div>
                    <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={close}
                        className="mt-2.5 w-full flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm py-2.5 transition-colors">
                        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d={WA_PATH} /></svg>
                        {isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                    </a>
                </div>
            </div>
            <style>{`@keyframes waNudgeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </div>
    );
}
