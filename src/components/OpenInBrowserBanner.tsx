'use client';

/**
 * 🌐 بانر «افتح في المتصفح» — يظهر *فقط* داخل المتصفحات المدمجة (in-app WebView:
 * إنستجرام/فيسبوك/تيك‑توك… أو WebView خام) حيث قد يُحجب تسجيل دخول جوجل نهائياً
 * (disallowed_useragent) وتُحجب جلسات فيسبوك (ITP)، فيفشل التقييم.
 * يفتح المتصفح الحقيقي بضغطة واحدة:
 *   • أندرويد: intent:// يفرض كروم (fallback = المتصفح الافتراضي عبر browser_fallback_url).
 *   • iOS: googlechromes:// يفتح كروم إن وُجد + تلميح «افتح في Safari» من قائمة ••• .
 * لا يظهر في المتصفحات الحقيقية ولا في SFSafariViewController (واتساب/iOS) حيث الدخول يعمل.
 */

import { useEffect, useState } from 'react';

export default function OpenInBrowserBanner({ locale }: { locale: string }) {
    const isArabic = locale === 'ar';
    const [show, setShow] = useState(false);
    const [platform, setPlatform] = useState<'android' | 'ios' | 'other'>('other');

    useEffect(() => {
        try {
            if (sessionStorage.getItem('oib_dismissed')) return;
            const ua = navigator.userAgent || '';
            const isAndroid = /Android/.test(ua);
            const isIOS = /iPhone|iPod|iPad/.test(ua);
            // كروم/فايرفوكس/إيدج على iOS متصفحات حقيقية (رغم WKWebView) — لا نزعجها
            const realIOSBrowser = /(CriOS|FxiOS|EdgiOS)/.test(ua);
            const appTokens = /(FBAN|FBAV|FB_IAB|Instagram|Line\/|Twitter|TikTok|musical_ly|BytedanceWebview|Snapchat|Pinterest)/i.test(ua);
            // WebView خام على أندرويد يحمل "; wv)" — بينما Custom Tabs (كروم حقيقي) لا يحمله
            const androidWebview = isAndroid && /;\s*wv\)/.test(ua);
            // WKWebView على iOS يُسقِط "Safari" من الـUA؛ بينما سفاري وSFSafariViewController يحتفظان به
            const iosWebview = isIOS && !realIOSBrowser && !/Safari/.test(ua);
            if (!(appTokens || androidWebview || iosWebview)) return;
            setPlatform(isAndroid ? 'android' : isIOS ? 'ios' : 'other');
            setShow(true);
        } catch { /* لا شيء */ }
    }, []);

    if (!show) return null;

    const openExternal = () => {
        try {
            const u = new URL(window.location.href);
            if (platform === 'android') {
                // intent:// يفرض كروم؛ الشقّ قبل #Intent بلا hash (منطق التقييم يعمل بـ ?rvv)،
                // والرابط الكامل (بالـhash) في browser_fallback_url لو كروم غير مثبّت.
                const fallback = encodeURIComponent(u.href);
                window.location.href =
                    `intent://${u.host}${u.pathname}${u.search}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${fallback};end`;
            } else if (platform === 'ios') {
                // كروم على iOS عبر سكيم https؛ لو غير مثبّت لا يحدث شيء فيبقى تلميح Safari ظاهراً
                window.location.href = `googlechromes://${u.host}${u.pathname}${u.search}${u.hash}`;
            } else {
                window.open(u.href, '_blank', 'noopener');
            }
        } catch { /* لا شيء */ }
    };

    const dismiss = () => {
        try { sessionStorage.setItem('oib_dismissed', '1'); } catch { /* لا شيء */ }
        setShow(false);
    };

    return (
        <div dir={isArabic ? 'rtl' : 'ltr'}
            className="fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-[0_-4px_20px_rgba(0,0,0,0.10)] px-4 py-3">
            <div className="max-w-md mx-auto">
                <div className="flex items-start gap-2.5">
                    <span className="text-xl shrink-0 mt-0.5" aria-hidden="true">🌐</span>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                            {isArabic ? 'افتح في متصفحك لتسجيل الدخول والتقييم' : 'Open in your browser to sign in & review'}
                        </p>
                        {platform === 'ios' && (
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                                {isArabic ? 'أو من قائمة ••• اختر: افتح في Safari' : 'Or from ••• choose: Open in Safari'}
                            </p>
                        )}
                    </div>
                    <button onClick={dismiss} aria-label={isArabic ? 'إغلاق' : 'Dismiss'}
                        className="shrink-0 -mt-1 -me-1 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        ✕
                    </button>
                </div>
                <button onClick={openExternal}
                    className="mt-2.5 w-full py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold transition-colors">
                    {isArabic ? 'افتح في المتصفح' : 'Open in browser'}
                </button>
            </div>
        </div>
    );
}
