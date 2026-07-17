'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface VerifyResult {
    valid: boolean;
    alreadyActivated?: boolean;
    productId?: string;
    productName?: string;
    productNameEn?: string;
    warrantyCode?: string;
    activatedAt?: string;
    warrantyExpiresAt?: string;
    warrantyDurationMonths?: number | null;
    warrantyTermsUrl?: string;
    error?: string;
    message?: string;
}

type AnalyticsWindow = Window & {
    gtag?: (...args: unknown[]) => void;
};

function track(eventName: string, parameters: Record<string, string> = {}) {
    if (typeof window === 'undefined') return;
    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.gtag?.('event', eventName, parameters);
}

const styles = {
    container: {
        minHeight: '70dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
        background: 'radial-gradient(ellipse at top, #111827 0%, #09090b 65%)',
    },
    card: {
        width: '100%',
        maxWidth: '460px',
        padding: 'clamp(24px, 5vw, 36px)',
        borderRadius: '20px',
        border: '1px solid #27272a',
        background: 'linear-gradient(145deg, #18181b 0%, #111113 100%)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
        color: '#fafafa',
    },
    label: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 12px',
        borderRadius: '999px',
        background: 'rgba(16, 185, 129, 0.12)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        color: '#6ee7b7',
        fontSize: '12px',
        fontWeight: 700,
    },
    input: {
        width: '100%',
        marginTop: '20px',
        padding: '15px 16px',
        borderRadius: '12px',
        border: '1px solid #3f3f46',
        background: '#27272a',
        color: '#fafafa',
        fontSize: '20px',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        textAlign: 'center' as const,
        direction: 'ltr' as const,
        letterSpacing: '0.08em',
        outline: 'none',
        boxSizing: 'border-box' as const,
    },
    primaryButton: {
        width: '100%',
        marginTop: '12px',
        padding: '14px 18px',
        border: 0,
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #059669, #10b981)',
        color: '#fff',
        fontSize: '15px',
        fontWeight: 800,
        fontFamily: 'inherit',
        cursor: 'pointer',
    },
    secondaryButton: {
        width: '100%',
        marginTop: '10px',
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1px solid #3f3f46',
        background: 'transparent',
        color: '#d4d4d8',
        fontSize: '14px',
        fontWeight: 700,
        fontFamily: 'inherit',
        cursor: 'pointer',
    },
};

export default function VerifyClient() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isArabic = !pathname.startsWith('/en');
    const initialSerial = searchParams.get('s') || '';

    const [serial, setSerial] = useState(initialSerial);
    const [result, setResult] = useState<VerifyResult | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        track('warranty_verification_view', { locale: isArabic ? 'ar' : 'en' });
    }, [isArabic]);

    const t = {
        badge: isArabic ? 'التحقق من سجل الضمان' : 'Warranty record verification',
        title: isArabic ? 'تحقق من رقم سيريال كايرو فولت' : 'Check a CairoVolt serial number',
        intro: isArabic
            ? 'أدخل الرقم المطبوع على كرت الضمان للتحقق من أنه صادر عن كايرو فولت، ثم تفعيل سجل الضمان أو عرض حالته.'
            : 'Enter the number printed on the warranty card to confirm that it was issued by CairoVolt, then activate or view its warranty record.',
        scope: isArabic
            ? 'هذا الفحص يؤكد سجل كايرو فولت فقط، ولا يُعد شهادة مستقلة من الشركة المصنعة لإثبات أصالة المنتج.'
            : 'This check confirms CairoVolt\'s own record only; it is not an independent manufacturer certificate of product authenticity.',
        inputLabel: isArabic ? 'رقم السيريال (13 حرفاً)' : 'Serial number (13 characters)',
        submit: isArabic ? 'تحقق من السجل' : 'Check record',
        loading: isArabic ? 'جارِ التحقق...' : 'Checking...',
        successBadge: isArabic ? 'تم العثور على سجل كايرو فولت' : 'CairoVolt record found',
        activatedTitle: isArabic ? 'تم تفعيل سجل الضمان' : 'Warranty record activated',
        existingTitle: isArabic ? 'سجل الضمان مُفعّل بالفعل' : 'Warranty record already active',
        product: isArabic ? 'المنتج المسجل' : 'Registered product',
        warrantyNumber: isArabic ? 'رقم الضمان' : 'Warranty number',
        activatedAt: isArabic ? 'تاريخ التفعيل' : 'Activated',
        expiresAt: isArabic ? 'صالح حتى' : 'Valid until',
        terms: isArabic ? 'شروط الضمان' : 'Warranty terms',
        termsValue: isArabic ? 'راجع السياسة المكتوبة' : 'Review the written policy',
        support: isArabic ? 'تواصل مع الدعم عبر واتساب' : 'Contact support on WhatsApp',
        another: isArabic ? 'تحقق من رقم آخر' : 'Check another serial',
        invalid: isArabic ? 'أدخل رقم سيريال صحيحاً من 13 حرفاً.' : 'Enter a valid 13-character serial number.',
        notFound: isArabic ? 'رقم السيريال غير موجود في سجلات كايرو فولت.' : 'This serial was not found in CairoVolt records.',
        rateLimited: isArabic ? 'تم إجراء محاولات كثيرة. حاول مرة أخرى بعد ساعة.' : 'Too many attempts. Please try again in one hour.',
        unavailable: isArabic ? 'تعذر الاتصال بالخدمة. حاول مرة أخرى.' : 'The service could not be reached. Please try again.',
    };

    const formatDate = (value?: string) => {
        if (!value) return '—';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '—';
        return date.toLocaleDateString(isArabic ? 'ar-EG' : 'en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const normalizedInput = serial.trim();
        if (normalizedInput.length !== 13) {
            setError(t.invalid);
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch('/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ serial: normalizedInput }),
            });
            const data = await response.json() as VerifyResult;

            if (!response.ok || !data.valid) {
                const errorMessages: Record<string, string> = {
                    invalid_request: t.invalid,
                    invalid_format: t.invalid,
                    serial_not_found: t.notFound,
                    rate_limited: t.rateLimited,
                    server_error: t.unavailable,
                };
                setError(errorMessages[data.error || ''] || t.unavailable);
                track('warranty_verification_not_found', { reason: data.error || 'unknown' });
                return;
            }

            setResult(data);
            try {
                localStorage.setItem('cv_verify_completed', 'true');
                localStorage.setItem('cv_verify_ts', Date.now().toString());
            } catch {
                // Storage may be unavailable in private browsing contexts.
            }
            track('warranty_verification_found', {
                state: data.alreadyActivated ? 'existing' : 'activated',
            });
        } catch {
            setError(t.unavailable);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setSerial('');
        setResult(null);
        setError('');
    };

    const productName = isArabic
        ? result?.productName
        : result?.productNameEn || result?.productName;

    return (
        <div style={styles.container} dir={isArabic ? 'rtl' : 'ltr'}>
            <main style={styles.card}>
                {!result ? (
                    <>
                        <span style={styles.label}>✓ {t.badge}</span>
                        <h1 style={{ margin: '18px 0 10px', fontSize: 'clamp(24px, 6vw, 34px)', lineHeight: 1.25 }}>
                            {t.title}
                        </h1>
                        <p style={{ margin: 0, color: '#d4d4d8', lineHeight: 1.8, fontSize: '15px' }}>
                            {t.intro}
                        </p>

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="serial-input" style={{ display: 'block', marginTop: '24px', color: '#a1a1aa', fontSize: '13px' }}>
                                {t.inputLabel}
                            </label>
                            <input
                                id="serial-input"
                                value={serial}
                                onChange={(event) => {
                                    setSerial(event.target.value);
                                    setError('');
                                }}
                                maxLength={13}
                                placeholder="CV-1XXXXXm313"
                                autoComplete="off"
                                spellCheck={false}
                                style={styles.input}
                                aria-invalid={Boolean(error)}
                                aria-describedby={error ? 'serial-error' : 'verification-scope'}
                            />
                            {error && (
                                <p id="serial-error" role="alert" style={{ margin: '12px 0 0', color: '#fca5a5', lineHeight: 1.6, fontSize: '13px' }}>
                                    {error}
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                style={{ ...styles.primaryButton, opacity: loading ? 0.65 : 1, cursor: loading ? 'wait' : 'pointer' }}
                            >
                                {loading ? t.loading : t.submit}
                            </button>
                        </form>

                        <p id="verification-scope" style={{ margin: '18px 0 0', padding: '12px', borderRadius: '10px', background: '#27272a', color: '#a1a1aa', lineHeight: 1.7, fontSize: '12px' }}>
                            {t.scope}
                        </p>
                    </>
                ) : (
                    <>
                        <span style={styles.label}>✓ {t.successBadge}</span>
                        <h1 style={{ margin: '18px 0 10px', fontSize: 'clamp(24px, 6vw, 32px)', lineHeight: 1.3 }}>
                            {result.alreadyActivated ? t.existingTitle : t.activatedTitle}
                        </h1>
                        <p style={{ margin: '0 0 22px', color: '#a1a1aa', lineHeight: 1.7, fontSize: '13px' }}>
                            {t.scope}
                        </p>

                        <dl style={{ margin: 0, padding: '18px', borderRadius: '14px', background: '#0f2f27', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                            {[
                                [t.product, productName || '—'],
                                [t.warrantyNumber, result.warrantyCode || '—'],
                                [t.activatedAt, formatDate(result.activatedAt)],
                                ...(result.warrantyExpiresAt
                                    ? [[t.expiresAt, formatDate(result.warrantyExpiresAt)]]
                                    : []),
                            ].map(([label, value]) => (
                                <div key={label} style={{ display: 'grid', gridTemplateColumns: 'minmax(110px, 0.8fr) 1.2fr', gap: '12px', padding: '8px 0', borderBottom: '1px solid rgba(16, 185, 129, 0.15)' }}>
                                    <dt style={{ color: '#6ee7b7', fontSize: '12px' }}>{label}</dt>
                                    <dd style={{ margin: 0, color: '#fafafa', fontSize: '13px', overflowWrap: 'anywhere' }}>{value}</dd>
                                </div>
                            ))}
                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(110px, 0.8fr) 1.2fr', gap: '12px', padding: '8px 0' }}>
                                <dt style={{ color: '#6ee7b7', fontSize: '12px' }}>{t.terms}</dt>
                                <dd style={{ margin: 0, color: '#fafafa', fontSize: '13px' }}>
                                    <a href={`${isArabic ? '' : '/en'}${result.warrantyTermsUrl || '/warranty'}`} style={{ color: '#a7f3d0' }}>
                                        {result.warrantyDurationMonths
                                            ? (isArabic
                                                ? `${result.warrantyDurationMonths} شهرًا — ${t.termsValue}`
                                                : `${result.warrantyDurationMonths} months — ${t.termsValue}`)
                                            : t.termsValue}
                                    </a>
                                </dd>
                            </div>
                        </dl>

                        <a
                            href={`https://wa.me/201558245974?text=${encodeURIComponent(
                                isArabic
                                    ? `مرحباً، أحتاج مساعدة في سجل الضمان رقم ${result.warrantyCode || ''}`
                                    : `Hello, I need help with warranty record ${result.warrantyCode || ''}`,
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ ...styles.primaryButton, display: 'block', boxSizing: 'border-box', textAlign: 'center', textDecoration: 'none' }}
                        >
                            {t.support}
                        </a>
                        <button type="button" onClick={reset} style={styles.secondaryButton}>
                            {t.another}
                        </button>
                    </>
                )}
            </main>
        </div>
    );
}
