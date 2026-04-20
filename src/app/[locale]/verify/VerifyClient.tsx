'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

/* ──────────────────────────────────────────────────
   Analytics Helpers — GA4 + TikTok Pixel
   Robust: queues events if scripts haven't loaded yet
   ────────────────────────────────────────────────── */
type WinWithAnalytics = Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    ttq?: { track: (event: string, params?: Record<string, unknown>) => void; page: () => void };
};

// Queue for events fired before gtag loads
const _pendingEvents: Array<{ name: string; params: Record<string, string | number> }> = [];
let _gtagReady = false;

function _flushPendingEvents(w: WinWithAnalytics) {
    while (_pendingEvents.length > 0) {
        const ev = _pendingEvents.shift()!;
        w.gtag!('event', ev.name, ev.params);
    }
    _gtagReady = true;
}

function gtagEvent(eventName: string, params: Record<string, string | number> = {}) {
    if (typeof window === 'undefined') return;
    const w = window as WinWithAnalytics;

    // ── GA4 ──
    if (typeof w.gtag === 'function') {
        if (!_gtagReady) _flushPendingEvents(w);
        w.gtag('event', eventName, params);
    } else {
        // gtag hasn't loaded yet — queue it
        _pendingEvents.push({ name: eventName, params });
        // Also push to dataLayer directly (GTM picks this up even before gtag loads)
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({ event: eventName, ...params });
    }

    // ── TikTok Pixel ──
    if (w.ttq && typeof w.ttq.track === 'function') {
        // Map our events to TikTok standard/custom events
        const ttMap: Record<string, string> = {
            verify_page_load: 'ViewContent',
            verify_scan_start: 'Search',
            verify_success: 'CompleteRegistration',
            verify_whatsapp_share: 'Contact',
            verify_gift_click: 'AddToCart',
            verify_search_redirect: 'ClickButton',
        };
        const ttEvent = ttMap[eventName] || eventName;
        w.ttq.track(ttEvent, { description: eventName, ...params });
    }
}

// Retry flush when gtag becomes available (covers slow networks)
if (typeof window !== 'undefined') {
    const checkGtag = setInterval(() => {
        const w = window as WinWithAnalytics;
        if (typeof w.gtag === 'function' && !_gtagReady) {
            _flushPendingEvents(w);
            clearInterval(checkGtag);
        }
    }, 500);
    // Stop checking after 10 seconds
    setTimeout(() => clearInterval(checkGtag), 10000);
}

/* ──────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────── */
interface VerifyResult {
    valid: boolean;
    alreadyActivated?: boolean;
    productId?: string;
    productName?: string;
    productNameEn?: string;
    warrantyCode?: string;
    activatedAt?: string;
    warrantyExpiresAt?: string;
    error?: string;
    message?: string;
}

/* ──────────────────────────────────────────────────
   SVG Icons (inline — no external dependency)
   ────────────────────────────────────────────────── */
/* Inline SVG icons are used directly in JSX to avoid bundle overhead */

/* ──────────────────────────────────────────────────
   CSS (inline styles — no Tailwind dependency)
   ────────────────────────────────────────────────── */
const styles = {
    container: {
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'max(12px, env(safe-area-inset-top)) 16px max(12px, env(safe-area-inset-bottom))',
        background: 'radial-gradient(ellipse at top, #111827 0%, #09090b 60%)',
        boxSizing: 'border-box' as const,
    },
    card: {
        background: 'linear-gradient(145deg, #18181b 0%, #1c1c22 100%)',
        borderRadius: '16px',
        padding: 'clamp(20px, 4vw, 32px) clamp(16px, 4vw, 24px)',
        maxWidth: '420px',
        width: '100%',
        textAlign: 'center' as const,
        position: 'relative' as const,
        overflow: 'hidden' as const,
        boxSizing: 'border-box' as const,
    },
    cardFear: {
        border: '1px solid rgba(239, 68, 68, 0.3)',
        boxShadow: '0 0 40px rgba(239, 68, 68, 0.08), 0 12px 40px rgba(0,0,0,0.5)',
    },
    cardSuccess: {
        border: '1px solid rgba(16, 185, 129, 0.4)',
        boxShadow: '0 0 40px rgba(16, 185, 129, 0.1), 0 12px 40px rgba(0,0,0,0.5)',
    },
    cardInfo: {
        border: '1px solid rgba(59, 130, 246, 0.3)',
        boxShadow: '0 0 40px rgba(59, 130, 246, 0.08), 0 12px 40px rgba(0,0,0,0.5)',
    },
    input: {
        width: '100%',
        padding: 'clamp(12px, 2.5vw, 16px)',
        background: '#27272a',
        border: '1px solid #3f3f46',
        borderRadius: '12px',
        color: '#fafafa',
        fontSize: 'clamp(18px, 5vw, 22px)',
        fontFamily: "'Outfit', monospace",
        textAlign: 'center' as const,
        letterSpacing: '0.25em',
        outline: 'none',
        transition: 'border-color 0.3s',
        textTransform: 'none' as const,
        direction: 'ltr' as const,
        boxSizing: 'border-box' as const,
    },
    button: {
        width: '100%',
        padding: 'clamp(12px, 2.5vw, 16px)',
        borderRadius: '12px',
        border: 'none',
        fontSize: 'clamp(14px, 3.5vw, 16px)',
        fontWeight: 700,
        fontFamily: "'Cairo', system-ui, sans-serif",
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    primaryBtn: {
        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        color: '#fff',
        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
    },
    giftBtn: {
        background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
        color: '#000',
        boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
    },
    whatsappBtn: {
        background: 'linear-gradient(135deg, #128C7E 0%, #25D366 100%)',
        color: '#fff',
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)',
    },
    outlineBtn: {
        background: 'transparent',
        color: '#a1a1aa',
        border: '1px solid #3f3f46',
    },
    progressBar: {
        width: '100%',
        height: '4px',
        background: '#27272a',
        borderRadius: '4px',
        overflow: 'hidden' as const,
        marginTop: '16px',
    },
    tag: {
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: 600,
        marginBottom: 'clamp(8px, 2vw, 16px)',
    },
    logo: {
        fontSize: '10px',
        color: '#52525b',
        marginTop: 'clamp(12px, 3vw, 24px)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase' as const,
    },
};

/* ──────────────────────────────────────────────────
   Processing Stage Sub-Phases
   ────────────────────────────────────────────────── */
const PROCESSING_PHASES = [
    { text: 'الاتصال بخوادم CairoVolt الإقليمية...', duration: 2000 },
    { text: 'مطابقة البصمة الجنائية C2PA...', duration: 2000 },
    { text: 'تحقق من قاعدة بيانات الضمان العالمية...', duration: 2000 },
    { text: 'تأكيد الأصالة النهائي...', duration: 2000 },
];
const TOTAL_PROCESSING_TIME = PROCESSING_PHASES.reduce((s, p) => s + p.duration, 0);

/* ──────────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────────── */
export default function VerifyClient() {
    const searchParams = useSearchParams();
    const serialFromQR = searchParams.get('s') || '';
    const productFromQR = searchParams.get('p') || '';

    const [step, setStep] = useState(0);
    const [serial, setSerial] = useState(serialFromQR);
    const [result, setResult] = useState<VerifyResult | null>(null);
    const [error, setError] = useState('');
    const [processingPhase, setProcessingPhase] = useState(0);
    const [progressPercent, setProgressPercent] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const startTimeRef = useRef(0);

    // Fire page load event
    useEffect(() => {
        startTimeRef.current = Date.now();
        gtagEvent('verify_page_load', {
            serial_from_qr: serialFromQR ? 'yes' : 'no',
            product_id: productFromQR,
        });
    }, [serialFromQR, productFromQR]);

    // Processing animation engine
    useEffect(() => {
        if (step !== 1) return;

        let elapsed = 0;
        const interval = setInterval(() => {
            elapsed += 50;
            // Calculate current phase
            let cumulative = 0;
            for (let i = 0; i < PROCESSING_PHASES.length; i++) {
                cumulative += PROCESSING_PHASES[i].duration;
                if (elapsed < cumulative) {
                    setProcessingPhase(i);
                    break;
                }
            }
            // Calculate progress percentage
            const pct = Math.min(100, (elapsed / TOTAL_PROCESSING_TIME) * 100);
            setProgressPercent(pct);

            if (elapsed >= TOTAL_PROCESSING_TIME) {
                clearInterval(interval);
                // Transition to result
                if (result) {
                    if (result.valid && !result.alreadyActivated) {
                        setStep(2);
                        gtagEvent('verify_success', {
                            product_id: result.productId || '',
                            warranty_code: result.warrantyCode || '',
                            dwell_time: Math.round((Date.now() - startTimeRef.current) / 1000),
                        });
                    } else if (result.valid && result.alreadyActivated) {
                        setStep(4);
                        gtagEvent('verify_already_activated', {
                            product_id: result.productId || '',
                        });
                    } else {
                        setError(result.message || 'رقم السيريال غير صحيح.');
                        setStep(0);
                        gtagEvent('verify_failed', {
                            serial: serial,
                            reason: result.message || 'invalid_serial',
                            dwell_time: Math.round((Date.now() - startTimeRef.current) / 1000),
                        });
                    }
                }
            }
        }, 50);

        return () => clearInterval(interval);
    }, [step, result]);

    // Submit verification
    const handleVerify = useCallback(async () => {
        if (serial.length < 13 || isSubmitting) return;

        setIsSubmitting(true);
        setError('');

        gtagEvent('verify_scan_start', {
            serial: serial,
            product_id: productFromQR,
            source: serialFromQR ? 'qr_code' : 'manual_entry',
        });

        try {
            const response = await fetch('/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ serial: serial.trim() }),
            });

            const data: VerifyResult = await response.json();
            setResult(data);

            // Start processing animation (dwell time stage)
            setStep(1);
            setProcessingPhase(0);
            setProgressPercent(0);
            setIsSubmitting(false);

            gtagEvent('verify_processing', {
                serial: serial,
                result_valid: data.valid ? 'yes' : 'no',
            });

        } catch {
            setError('حدث خطأ في الاتصال. تأكد من الإنترنت وحاول مرة أخرى.');
            setIsSubmitting(false);
        }
    }, [serial, isSubmitting, productFromQR, serialFromQR]);

    // WhatsApp share
    const handleWhatsAppShare = useCallback(() => {
        if (!result) return;
        gtagEvent('verify_whatsapp_share', {
            product_id: result.productId || '',
            warranty_code: result.warrantyCode || '',
        });
        const text = encodeURIComponent(
            `✅ جهازي أصلي 100% ومعتمد من كايرو فولت!\n` +
            `📋 رقم الضمان: ${result.warrantyCode}\n` +
            `🛡️ ${result.productName}\n\n` +
            `تحقق من جهازك أنت كمان:\n` +
            `https://cairovolt.com`
        );
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }, [result]);

    // Gift click → search injection
    const handleGiftClick = useCallback(() => {
        gtagEvent('verify_gift_click', {
            product_id: result?.productId || '',
            dwell_time: Math.round((Date.now() - startTimeRef.current) / 1000),
        });
        setStep(3);
    }, [result]);

    // Search redirect acknowledgment
    const handleSearchRedirect = useCallback(() => {
        gtagEvent('verify_search_redirect', {
            product_id: result?.productId || '',
            total_dwell_time: Math.round((Date.now() - startTimeRef.current) / 1000),
        });
        // Mark in localStorage for PromoBanner detection
        try {
            localStorage.setItem('cv_verify_completed', 'true');
            localStorage.setItem('cv_verify_ts', Date.now().toString());
        } catch { /* private browsing */ }
    }, [result]);

    const formatDate = (isoStr?: string) => {
        if (!isoStr) return '';
        return new Date(isoStr).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="cv-container" style={styles.container}>
            {/* ═══════════════════════════════════════
                STEP 0: Fear Stage — Serial Input
                ═══════════════════════════════════════ */}
            {step === 0 && (
                <div style={{ ...styles.card, ...styles.cardFear, animation: 'cvFadeIn 0.6s ease-out' }}>
                    {/* Glow border effect */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                        background: 'linear-gradient(90deg, transparent, #ef4444, transparent)',
                        animation: 'cvGlow 3s ease-in-out infinite',
                    }} />

                    <div style={{
                        ...styles.tag,
                        background: 'rgba(239, 68, 68, 0.15)',
                        color: '#fca5a5',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}>
                        ⚠️ إجراء أمني إلزامي
                    </div>

                    <div style={{
                        width: 'clamp(40px, 12vw, 56px)', height: 'clamp(40px, 12vw, 56px)', margin: '0 auto clamp(8px, 2vw, 12px)',
                        color: '#fbbf24',
                        animation: 'cvPulse 2s ease-in-out infinite',
                        flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden',
                    }}>
                        <svg style={{ width: '100%', height: '100%', maxWidth: '56px', maxHeight: '56px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(18px, 5vw, 22px)', fontWeight: 800, color: '#fafafa',
                        margin: '0 0 4px', lineHeight: 1.3,
                    }}>
                        نظام الفحص الجنائي
                    </h1>
                    <h2 style={{
                        fontSize: 'clamp(11px, 3vw, 13px)', fontWeight: 600, color: '#fbbf24',
                        margin: '0 0 clamp(8px, 2vw, 16px)', letterSpacing: '0.1em',
                    }}>
                        C2PA AUTHENTICATION SYSTEM
                    </h2>

                    <p style={{
                        fontSize: 'clamp(12px, 3vw, 13px)', color: '#a1a1aa', lineHeight: 1.6,
                        margin: '0 0 clamp(12px, 3vw, 20px)',
                    }}>
                        السوق المصري ممتلئ بخلايا الليثيوم المقلدة التي تدمر الأجهزة.
                        {' '}
                        <strong style={{ color: '#fafafa' }}>أدخل رقم التحقق المطبوع على الكرت</strong> لمطابقة البصمة
                        الجنائية وتفعيل الضمان الذهبي (14 يوماً).
                    </p>

                    <div style={{ marginBottom: 'clamp(10px, 2vw, 16px)' }}>
                        <input
                            type="text"
                            maxLength={13}
                            placeholder="CV-1XXXXXm313"
                            value={serial}
                            onChange={(e) => {
                                setSerial(e.target.value);
                                setError('');
                            }}
                            onFocus={() => gtagEvent('verify_input_focus')}
                            style={{
                                ...styles.input,
                                borderColor: error ? '#ef4444' : serial.length >= 13 ? '#10b981' : '#3f3f46',
                            }}
                            autoComplete="off"
                            autoFocus={!serialFromQR}
                            id="serial-input"
                        />
                    </div>

                    {error && (
                        <p style={{
                            fontSize: '13px', color: '#fca5a5', margin: '0 0 12px',
                            animation: 'cvFadeIn 0.3s',
                        }}>
                            ❌ {error}
                        </p>
                    )}

                    <button
                        onClick={handleVerify}
                        style={{
                            ...styles.button,
                            ...styles.primaryBtn,
                            opacity: serial.length < 13 || isSubmitting ? 0.4 : 1,
                            cursor: serial.length < 13 || isSubmitting ? 'not-allowed' : 'pointer',
                            pointerEvents: 'auto',
                        }}
                        id="verify-submit-btn"
                    >
                        {isSubmitting ? '⏳ جارِ الإرسال...' : '🔍 مطابقة قواعد البيانات والتفعيل'}
                    </button>

                    <p style={{
                        fontSize: '10px', color: '#52525b', margin: 'clamp(8px, 2vw, 16px) 0 0',
                        lineHeight: 1.5,
                    }}>
                        ⚠️ يُعتبر الضمان لاغياً إذا لم يتم الفحص خلال 24 ساعة من الاستلام
                    </p>

                    <div style={styles.logo}>
                        ⚡ CAIROVOLT — AUTHENTIC SINCE 2024
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════════
                STEP 1: Processing Stage — Dwell Time Engine
                ═══════════════════════════════════════ */}
            {step === 1 && (
                <div style={{ textAlign: 'center', animation: 'cvFadeIn 0.4s' }}>
                    {/* Spinning ring */}
                    <div style={{
                        width: 'clamp(48px, 14vw, 72px)', height: 'clamp(48px, 14vw, 72px)',
                        border: '3px solid #27272a',
                        borderTop: '3px solid #10b981',
                        borderRadius: '50%',
                        margin: '0 auto clamp(12px, 3vw, 24px)',
                        animation: 'cvSpin 1s linear infinite',
                    }} />

                    <p style={{
                        fontSize: '16px', color: '#10b981', fontWeight: 600,
                        margin: '0 0 8px', minHeight: '24px',
                        transition: 'opacity 0.3s',
                    }}>
                        {PROCESSING_PHASES[processingPhase]?.text}
                    </p>

                    <p style={{ fontSize: '12px', color: '#71717a', margin: '0 0 4px' }}>
                        🔗 Serial: <span style={{ fontFamily: "'Outfit', monospace", color: '#a1a1aa' }}>{serial}</span>
                    </p>

                    {/* Progress bar */}
                    <div style={styles.progressBar}>
                        <div style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #059669, #10b981, #34d399)',
                            borderRadius: '4px',
                            width: `${progressPercent}%`,
                            transition: 'width 0.1s linear',
                        }} />
                    </div>

                    <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        marginTop: '8px', fontSize: '11px', color: '#52525b',
                    }}>
                        <span>البصمة الجنائية</span>
                        <span>{Math.round(progressPercent)}%</span>
                    </div>

                    <p style={{
                        fontSize: '12px', color: '#fbbf24', margin: '24px 0 0',
                        animation: 'cvPulse 2s infinite',
                    }}>
                        ⚠️ يرجى عدم إغلاق الصفحة لتجنب إلغاء الضمان
                    </p>
                </div>
            )}

            {/* ═══════════════════════════════════════
                STEP 2: Success Stage — Dopamine Release
                ═══════════════════════════════════════ */}
            {step === 2 && result && (
                <div style={{ ...styles.card, ...styles.cardSuccess, animation: 'cvScaleIn 0.5s ease-out' }}>
                    {/* Success glow */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                        background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
                    }} />

                    <div style={{
                        width: 'clamp(48px, 14vw, 64px)', height: 'clamp(48px, 14vw, 64px)', margin: '0 auto clamp(8px, 2vw, 12px)',
                        color: '#10b981',
                        animation: 'cvBounce 0.6s ease-out',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden',
                    }}>
                        <svg style={{ width: '100%', height: '100%', maxWidth: '64px', maxHeight: '64px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <polyline points="9 12 12 15 16 10" />
                        </svg>
                    </div>

                    <div style={{
                        ...styles.tag,
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#6ee7b7',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                    }}>
                        ✅ VERIFIED — AUTHENTIC
                    </div>

                    <h2 style={{
                        fontSize: 'clamp(20px, 5.5vw, 24px)', fontWeight: 800, color: '#fafafa',
                        margin: '0 0 6px',
                    }}>
                        منتج أصلي 100%
                    </h2>

                    <p style={{
                        fontSize: '14px', color: '#a1a1aa', margin: '0 0 20px',
                    }}>
                        {result.productName} — مُعتمد من CairoVolt
                    </p>

                    {/* Warranty Card */}
                    <div style={{
                        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
                        borderRadius: '12px',
                        padding: 'clamp(14px, 3vw, 20px)',
                        marginBottom: 'clamp(14px, 3vw, 20px)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                    }}>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', marginBottom: '12px',
                        }}>
                            <span style={{ fontSize: '11px', color: '#6ee7b7', fontWeight: 600 }}>
                                🛡️ شهادة ضمان ذهبي
                            </span>
                            <span style={{
                                fontSize: '10px', color: '#34d399',
                                background: 'rgba(16, 185, 129, 0.2)',
                                padding: '2px 8px', borderRadius: '10px',
                            }}>
                                14 يوماً
                            </span>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '11px', color: '#6ee7b7', margin: '0 0 4px' }}>رقم الضمان</p>
                            <p style={{
                                fontSize: 'clamp(16px, 4.5vw, 20px)', fontWeight: 700, color: '#fafafa',
                                fontFamily: "'Outfit', monospace", letterSpacing: '0.1em',
                                margin: '0 0 10px', direction: 'ltr', textAlign: 'center',
                            }}>
                                {result.warrantyCode}
                            </p>
                        </div>

                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            fontSize: '11px', color: '#a7f3d0',
                        }}>
                            <span>تاريخ التفعيل: {formatDate(result.activatedAt)}</span>
                            <span>صالح حتى: {formatDate(result.warrantyExpiresAt)}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button
                            onClick={handleGiftClick}
                            style={{ ...styles.button, ...styles.giftBtn }}
                            id="verify-gift-btn"
                        >
                            🎁 هدية التوثيق — خصم 10% على طلبك الأول
                        </button>

                        <button
                            onClick={handleWhatsAppShare}
                            style={{ ...styles.button, ...styles.whatsappBtn }}
                            id="verify-share-btn"
                        >
                            📸 شارك شهادة التوثيق على واتساب
                        </button>
                    </div>

                    <div style={styles.logo}>
                        ⚡ CAIROVOLT — TRUSTED BY 50,000+ EGYPTIANS
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════════
                STEP 3: Gift — Coupon + Internal Shop Link
                ═══════════════════════════════════════ */}
            {step === 3 && (
                <div style={{ ...styles.card, ...styles.cardSuccess, animation: 'cvFadeIn 0.5s' }}>
                    <div style={{
                        ...styles.tag,
                        background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(245, 158, 11, 0.2))',
                        color: '#fde68a',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                    }}>
                        🎁 عرض حصري لعملاء التوثيق
                    </div>

                    <h2 style={{
                        fontSize: 'clamp(18px, 5vw, 22px)', fontWeight: 800, color: '#fafafa',
                        margin: '0 0 6px',
                    }}>
                        خصم 10% على طلبك القادم
                    </h2>

                    {/* Coupon Code Display */}
                    <div style={{
                        background: 'linear-gradient(135deg, #78350f 0%, #92400e 100%)',
                        borderRadius: '12px',
                        padding: 'clamp(16px, 3vw, 24px)',
                        margin: '16px 0',
                        border: '2px dashed rgba(253, 230, 138, 0.4)',
                    }}>
                        <p style={{ fontSize: '11px', color: '#fde68a', margin: '0 0 8px' }}>كود الخصم الخاص بك</p>
                        <p style={{
                            fontSize: 'clamp(24px, 7vw, 32px)', fontWeight: 800, color: '#fefce8',
                            fontFamily: "'Outfit', monospace", letterSpacing: '0.15em',
                            margin: '0 0 8px', direction: 'ltr',
                        }}>
                            ORIGINAL10
                        </p>
                        <p style={{ fontSize: '11px', color: '#fcd34d', margin: 0 }}>
                            صالح لمدة 7 أيام — استخدمه في صفحة الدفع
                        </p>
                    </div>

                    <p style={{
                        fontSize: '13px', color: '#a1a1aa', margin: '0 0 16px', lineHeight: 1.7,
                    }}>
                        استخدم الكود عند الشراء من أي قسم في المتجر واحصل على الخصم فوراً ✨
                    </p>

                    {/* Primary: Shop Now (internal link — keeps session) */}
                    <a
                        href="/anker/wall-chargers"
                        onClick={() => {
                            handleSearchRedirect();
                            gtagEvent('verify_shop_now', {
                                product_id: result?.productId || '',
                                total_dwell_time: Math.round((Date.now() - startTimeRef.current) / 1000),
                            });
                        }}
                        style={{
                            ...styles.button,
                            ...styles.giftBtn,
                            display: 'block',
                            textDecoration: 'none',
                            textAlign: 'center',
                            marginBottom: '10px',
                        }}
                        id="verify-shop-btn"
                    >
                        🛒 تسوق الآن واستخدم الكود
                    </a>

                    {/* Secondary: branded search nudge (text only) */}
                    <p style={{
                        fontSize: '11px', color: '#71717a', margin: '8px 0 0', lineHeight: 1.6,
                    }}>
                        💡 أو ابحث في جوجل عن: <strong style={{ color: '#a1a1aa' }}>كايرو فولت شواحن انكر</strong>
                    </p>

                    <button
                        onClick={() => setStep(2)}
                        style={{ ...styles.button, ...styles.outlineBtn, marginTop: '10px' }}
                    >
                        ← رجوع لشهادة الضمان
                    </button>

                    <div style={styles.logo}>
                        ⚡ CAIROVOLT
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════════
                STEP 4: Already Activated
                ═══════════════════════════════════════ */}
            {step === 4 && result && (
                <div style={{ ...styles.card, ...styles.cardInfo, animation: 'cvFadeIn 0.5s' }}>
                    <div style={{
                        width: 'clamp(44px, 12vw, 56px)', height: 'clamp(44px, 12vw, 56px)', margin: '0 auto clamp(8px, 2vw, 12px)',
                        color: '#3b82f6',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden',
                    }}>
                        <svg style={{ width: '100%', height: '100%', maxWidth: '56px', maxHeight: '56px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    </div>

                    <div style={{
                        ...styles.tag,
                        background: 'rgba(59, 130, 246, 0.15)',
                        color: '#93c5fd',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                    }}>
                        ℹ️ تم التوثيق مسبقاً
                    </div>

                    <h2 style={{
                        fontSize: 'clamp(17px, 4.5vw, 20px)', fontWeight: 800, color: '#fafafa',
                        margin: '0 0 6px',
                    }}>
                        هذا المنتج مُسجَّل بالفعل
                    </h2>

                    <p style={{
                        fontSize: '13px', color: '#a1a1aa', margin: '0 0 20px', lineHeight: 1.7,
                    }}>
                        {result.productName} تم توثيقه في {formatDate(result.activatedAt)}.
                        <br />
                        رقم الضمان: <strong style={{
                            fontFamily: "'Outfit', monospace", color: '#60a5fa',
                        }}>{result.warrantyCode}</strong>
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button
                            onClick={() => {
                                gtagEvent('verify_support_click');
                                window.open('https://wa.me/201030448aborr?text=' + encodeURIComponent(
                                    `مرحبا، عندي استفسار عن الضمان.\nرقم الضمان: ${result.warrantyCode}\nالمنتج: ${result.productName}`
                                ), '_blank');
                            }}
                            style={{ ...styles.button, ...styles.whatsappBtn }}
                        >
                            💬 تواصل مع الدعم عبر واتساب
                        </button>

                        <button
                            onClick={() => {
                                setStep(0);
                                setSerial('');
                                setResult(null);
                                setIsSubmitting(false);
                            }}
                            style={{ ...styles.button, ...styles.outlineBtn }}
                        >
                            🔄 تحقق من سيريال آخر
                        </button>
                    </div>

                    <div style={styles.logo}>
                        ⚡ CAIROVOLT — AUTHENTIC SINCE 2024
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════════
                Global Animations (injected via style tag)
                ═══════════════════════════════════════ */}
            <style>{`
                @keyframes cvFadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes cvScaleIn {
                    from { opacity: 0; transform: scale(0.95) translateY(8px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes cvPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes cvSpin {
                    to { transform: rotate(360deg); }
                }
                @keyframes cvBounce {
                    0% { transform: scale(0); }
                    50% { transform: scale(1.12); }
                    100% { transform: scale(1); }
                }
                @keyframes cvGlow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
                * { box-sizing: border-box; }
                html, body {
                    overflow-x: hidden;
                    -webkit-tap-highlight-color: transparent;
                }
                input::placeholder {
                    color: #52525b;
                    font-family: 'Outfit', monospace;
                }
                input:focus {
                    border-color: #10b981 !important;
                    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
                }
                button:active {
                    transform: scale(0.97);
                }
                /* Mobile-first: ensure no overflow and proper safe areas */
                @supports (height: 100dvh) {
                    .cv-container { min-height: 100dvh; }
                }
                /* Small phones (320-375px) */
                @media (max-height: 667px) {
                    .cv-container {
                        justify-content: flex-start !important;
                        padding-top: max(16px, env(safe-area-inset-top)) !important;
                    }
                }
                /* Keyboard-visible: allow scroll */
                @media (max-height: 450px) {
                    .cv-container {
                        justify-content: flex-start !important;
                        padding-top: 12px !important;
                    }
                }
            `}</style>
        </div>
    );
}

