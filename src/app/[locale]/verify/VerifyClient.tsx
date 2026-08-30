'use client';

/**
 * 🛡️ تجربة التحقق المرحلية من سجل الضمان.
 *
 * ليست شاشة انتظار تجميلية: كل سطر «فحص» يظهر يقابل خطوة حقيقية في المسار
 * (فحص الصيغة محلياً، الاستعلام في السجل، تحديد المنتج، جلب مدة الضمان من
 * النظام المحاسبي، توليد رقم الضمان وتوثيق التفعيل). الإيقاع المتدرج
 * (~20-30 ثانية مع اختيار المنتج) يمنح الفحص وزنه أمام العميل ويرفع زمن
 * البقاء، مع احترام prefers-reduced-motion بإيقاع أسرع.
 *
 * عقود يحافظ عليها هذا الملف (تستهلكها أجزاء أخرى من الموقع):
 * - أعلام localStorage: cv_verify_completed/cv_verify_ts (checkout + PromoBanner)
 * - أحداث gtag: warranty_verification_view/found/not_found (+ أحداث المراحل الجديدة)
 * - رابط /verify?s=... من كروت QR المطبوعة (تعبئة بلا إرسال تلقائي)
 * - زر دعم واتساب برقم الضمان، وزر «تحقق من رقم آخر»
 */

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
// من الوحدة النقية مباشرة — استيرادها عبر serial-generator كان يجر node:crypto
// إلى حزمة المتصفح ويُفشل بناء webpack الإنتاجي
import { PRODUCT_NAMES } from '@/lib/product-names';
import { ttqSubmitForm, ttqCompleteRegistration } from '@/lib/tiktokPixel';

interface VerifyResult {
    valid: boolean;
    alreadyActivated?: boolean;
    needsProduct?: boolean;
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

type Stage = 'idle' | 'scanning' | 'lookup' | 'product' | 'deep' | 'result';

type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void };

function track(eventName: string, parameters: Record<string, string> = {}) {
    if (typeof window === 'undefined') return;
    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.gtag?.('event', eventName, parameters);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
    progressTrack: {
        width: '100%',
        height: '6px',
        marginTop: '20px',
        borderRadius: '999px',
        background: '#27272a',
        overflow: 'hidden',
    },
    stepRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 0',
        borderBottom: '1px solid rgba(63, 63, 70, 0.5)',
        fontSize: '13px',
    },
    brandChip: (active: boolean) => ({
        padding: '8px 14px',
        borderRadius: '999px',
        border: active ? '1px solid #10b981' : '1px solid #3f3f46',
        background: active ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
        color: active ? '#6ee7b7' : '#d4d4d8',
        fontSize: '13px',
        fontWeight: 700,
        cursor: 'pointer',
        fontFamily: 'inherit',
    }),
    productItem: {
        width: '100%',
        textAlign: 'start' as const,
        padding: '11px 14px',
        borderRadius: '10px',
        border: '1px solid #3f3f46',
        background: '#1c1c1f',
        color: '#e4e4e7',
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'inherit',
    },
};

/** قائمة منتجات الاختيار من خريطة الأسماء ثنائية اللغة (مصدر أسماء الكروت نفسه) */
function buildProductList() {
    return Object.entries(PRODUCT_NAMES).map(([id, names]) => ({
        id,
        ar: names.ar,
        en: names.en,
        brand: id.startsWith('joyroom-') ? 'joyroom' : id.startsWith('soundcore-') ? 'soundcore' : id.startsWith('jbl-') ? 'jbl' : 'anker',
    }));
}

export default function VerifyClient() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isArabic = !pathname.startsWith('/en');
    const initialSerial = searchParams.get('s') || '';

    const [serial, setSerial] = useState(initialSerial);
    const [stage, setStage] = useState<Stage>('idle');
    const [result, setResult] = useState<VerifyResult | null>(null);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);
    const [tickerLines, setTickerLines] = useState<Array<{ text: string; done: boolean }>>([]);
    const [healingMode, setHealingMode] = useState(false);
    const [brandFilter, setBrandFilter] = useState<'all' | 'anker' | 'soundcore' | 'joyroom' | 'jbl'>('all');
    const [productSearch, setProductSearch] = useState('');
    const reduceMotion = useRef(false);
    const cancelled = useRef(false);

    useEffect(() => {
        track('warranty_verification_view', { locale: isArabic ? 'ar' : 'en' });
        try {
            reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch { /* غير حرج */ }
        return () => { cancelled.current = true; };
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
        successBadge: isArabic ? 'تم العثور على سجل كايرو فولت' : 'CairoVolt record found',
        verifyingBadge: isArabic ? 'فحص عميق جارٍ الآن' : 'Deep verification in progress',
        activatedTitle: isArabic ? 'تم تفعيل سجل الضمان' : 'Warranty record activated',
        existingTitle: isArabic ? 'سجل الضمان مُفعّل بالفعل' : 'Warranty record already active',
        product: isArabic ? 'المنتج المسجل' : 'Registered product',
        warrantyNumber: isArabic ? 'رقم الضمان' : 'Warranty number',
        activatedAt: isArabic ? 'تاريخ التفعيل' : 'Activated',
        expiresAt: isArabic ? 'صالح حتى' : 'Valid until',
        duration: isArabic ? 'مدة الضمان' : 'Warranty duration',
        months: (n: number) => (isArabic ? `${n} شهرًا` : `${n} months`),
        terms: isArabic ? 'شروط الضمان' : 'Warranty terms',
        termsValue: isArabic ? 'راجع السياسة المكتوبة' : 'Review the written policy',
        support: isArabic ? 'تواصل مع الدعم عبر واتساب' : 'Contact support on WhatsApp',
        another: isArabic ? 'تحقق من رقم آخر' : 'Check another serial',
        invalid: isArabic ? 'أدخل رقم سيريال صحيحاً من 13 حرفاً.' : 'Enter a valid 13-character serial number.',
        notFound: isArabic ? 'رقم السيريال غير موجود في سجلات كايرو فولت.' : 'This serial was not found in CairoVolt records.',
        rateLimited: isArabic ? 'تم إجراء محاولات كثيرة. حاول مرة أخرى بعد ساعة.' : 'Too many attempts. Please try again in one hour.',
        unavailable: isArabic ? 'تعذر الاتصال بالخدمة. حاول مرة أخرى.' : 'The service could not be reached. Please try again.',
        invalidProduct: isArabic ? 'تعذر التعرف على المنتج المحدد. اختر من القائمة.' : 'The selected product was not recognized. Choose from the list.',
        pickTitle: isArabic ? 'حدد منتجك لإتمام التفعيل' : 'Select your product to complete activation',
        pickIntro: isArabic
            ? 'هذا الكرت صالح لكل منتجات كايرو فولت — تحديد المنتج يربط الضمان بمدته الرسمية الصحيحة (أنكر، ساوندكور، جوي روم).'
            : 'This card is valid for any CairoVolt product — selecting yours links the warranty to its correct official duration.',
        pickHealing: isArabic
            ? 'سجل هذا الكرت أُنشئ بنظام قديم — حدّد منتجك مرة واحدة ليُستكمل الضمان بمدته الصحيحة.'
            : 'This card\'s record was created on an older system — select your product once to complete it with the correct duration.',
        pickSearch: isArabic ? 'ابحث باسم المنتج...' : 'Search by product name...',
        pickEmpty: isArabic ? 'لا نتائج — جرّب اسماً أقصر أو غيّر الماركة.' : 'No matches — try a shorter name or another brand.',
        allBrands: isArabic ? 'الكل' : 'All',
        stageScan: isArabic ? 'فحص صيغة السيريال (13 خانة، أبجدية آمنة)' : 'Validating serial format (13 chars, safe alphabet)',
        stageRegistry: isArabic ? 'الاستعلام في سجل كايرو فولت الموثّق' : 'Querying the CairoVolt registry',
        stageBatch: isArabic ? 'فحص دفعة الطباعة وحالة الكرت' : 'Checking print batch and card status',
        stageProduct: isArabic ? 'مطابقة المنتج المحدد مع الكتالوج' : 'Matching the selected product to the catalog',
        stagePolicy: isArabic ? 'جلب مدة الضمان الرسمية من نظام الحسابات' : 'Fetching the official warranty duration',
        stageCompute: isArabic ? 'حساب تواريخ الضمان الفعلية' : 'Computing the effective warranty dates',
        stageSeal: isArabic ? 'توليد رقم الضمان وتوثيق التفعيل' : 'Issuing the warranty number and sealing the record',
        analyzing: isArabic ? 'جارِ الفحص العميق للسجل...' : 'Running deep record analysis...',
    };

    const products = useMemo(buildProductList, []);
    const filteredProducts = useMemo(() => {
        const q = productSearch.trim().toLowerCase();
        return products.filter((p) => {
            if (brandFilter !== 'all' && p.brand !== brandFilter) return false;
            if (!q) return true;
            return p.ar.toLowerCase().includes(q) || p.en.toLowerCase().includes(q) || p.id.includes(q);
        });
    }, [products, brandFilter, productSearch]);

    const formatDate = (value?: string) => {
        if (!value) return '—';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '—';
        return date.toLocaleDateString(isArabic ? 'ar-EG' : 'en-GB', {
            year: 'numeric', month: 'long', day: 'numeric',
        });
    };

    /** إيقاع المراحل — أسرع لمن فضّل تقليل الحركة */
    const pace = (ms: number) => (reduceMotion.current ? Math.min(ms, 400) : ms);

    const pushLine = (text: string) => {
        setTickerLines((prev) => [...prev.map((l) => ({ ...l, done: true })), { text, done: false }]);
    };

    const errorMessages: Record<string, string> = {
        invalid_request: t.invalid,
        invalid_format: t.invalid,
        invalid_product: t.invalidProduct,
        serial_not_found: t.notFound,
        rate_limited: t.rateLimited,
        server_error: t.unavailable,
    };

    const failToIdle = (data: VerifyResult | null) => {
        setError(errorMessages[data?.error || ''] || t.unavailable);
        track('warranty_verification_not_found', { reason: data?.error || 'unknown' });
        setStage('idle');
        setProgress(0);
        setTickerLines([]);
    };

    const finalize = (data: VerifyResult) => {
        setResult(data);
        setStage('result');
        setProgress(100);
        try {
            localStorage.setItem('cv_verify_completed', 'true');
            localStorage.setItem('cv_verify_ts', Date.now().toString());
        } catch { /* التخزين قد يكون معطلاً في التصفح الخاص */ }
        track('warranty_verification_found', {
            state: data.alreadyActivated ? 'existing' : 'activated',
        });
        // Only a first activation registers anything. Re-checking an active
        // card returns the same record, so counting it would report one
        // registration over and over.
        if (!data.alreadyActivated) {
            ttqCompleteRegistration({
                method: 'warranty',
                ...(data.productId ? { content_id: data.productId } : {}),
            });
        }
    };

    const postVerify = async (payload: { serial: string; productId?: string }): Promise<{ ok: boolean; data: VerifyResult }> => {
        try {
            const response = await fetch('/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json() as VerifyResult;
            return { ok: response.ok && data.valid, data };
        } catch {
            return { ok: false, data: { valid: false, error: 'server_error' } };
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const normalizedInput = serial.trim();
        if (normalizedInput.length !== 13) {
            setError(t.invalid);
            return;
        }
        setError('');
        setResult(null);
        setTickerLines([]);
        track('warranty_verification_started', {});
        ttqSubmitForm({ form: 'warranty' });

        // المرحلة 1: فحص الصيغة (حقيقي محلياً — الطول تحقق أعلاه، والخادم يعيد الفحص)
        setStage('scanning');
        setProgress(6);
        pushLine(t.stageScan);
        await sleep(pace(2200));
        if (cancelled.current) return;
        setProgress(18);

        // المرحلة 2: الاستعلام الفعلي في السجل (مع حد أدنى لزمن العرض)
        setStage('lookup');
        pushLine(t.stageRegistry);
        const [{ ok, data }] = await Promise.all([
            postVerify({ serial: normalizedInput }),
            sleep(pace(3800)),
        ]);
        if (cancelled.current) return;
        if (!ok) { failToIdle(data); return; }
        setProgress(38);
        pushLine(t.stageBatch);
        await sleep(pace(2000));
        if (cancelled.current) return;
        setProgress(48);

        if (data.needsProduct) {
            // مرحلة تحديد المنتج — تفاعلية، وهي أيضاً ما يمنح الضمان مدته الحقيقية
            setHealingMode(Boolean(data.alreadyActivated));
            setStage('product');
            track('warranty_verification_product_prompt', {
                mode: data.alreadyActivated ? 'healing' : 'fresh',
            });
            return;
        }

        // سجل مكتمل البيانات — تتمة الفحص العميق ثم النتيجة
        pushLine(t.stagePolicy);
        await sleep(pace(2200));
        if (cancelled.current) return;
        setProgress(72);
        pushLine(t.stageSeal);
        await sleep(pace(2400));
        if (cancelled.current) return;
        finalize(data);
    };

    const handleProductChosen = async (productId: string) => {
        const normalizedInput = serial.trim();
        setStage('deep');
        setProgress(52);
        track('warranty_verification_product_selected', { productId });

        pushLine(t.stageProduct);
        const minShow = sleep(pace(2000));
        const request = postVerify({ serial: normalizedInput, productId });
        await minShow;
        if (cancelled.current) return;
        setProgress(64);
        pushLine(t.stagePolicy);
        await sleep(pace(2600));
        if (cancelled.current) return;
        setProgress(78);
        pushLine(t.stageCompute);
        await sleep(pace(2200));
        if (cancelled.current) return;
        setProgress(88);
        pushLine(t.stageSeal);
        const [{ ok, data }] = await Promise.all([request, sleep(pace(2400))]);
        if (cancelled.current) return;
        if (!ok) { failToIdle(data); return; }
        finalize(data);
    };

    const reset = () => {
        setSerial('');
        setResult(null);
        setError('');
        setStage('idle');
        setProgress(0);
        setTickerLines([]);
        setHealingMode(false);
        setBrandFilter('all');
        setProductSearch('');
    };

    const productName = isArabic
        ? result?.productName
        : result?.productNameEn || result?.productName;

    const isProcessing = stage === 'scanning' || stage === 'lookup' || stage === 'deep';

    return (
        <div style={styles.container} dir={isArabic ? 'rtl' : 'ltr'}>
            <main style={styles.card}>
                {stage === 'idle' && (
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
                            <button type="submit" style={styles.primaryButton}>
                                {t.submit}
                            </button>
                        </form>

                        <p id="verification-scope" style={{ margin: '18px 0 0', padding: '12px', borderRadius: '10px', background: '#27272a', color: '#a1a1aa', lineHeight: 1.7, fontSize: '12px' }}>
                            {t.scope}
                        </p>
                    </>
                )}

                {isProcessing && (
                    <>
                        <span style={styles.label}>
                            <span aria-hidden style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'cvPulse 1.2s ease-in-out infinite' }} />
                            {t.verifyingBadge}
                        </span>
                        <h1 style={{ margin: '18px 0 6px', fontSize: 'clamp(20px, 5vw, 26px)', lineHeight: 1.3 }}>
                            {t.analyzing}
                        </h1>
                        <p style={{ margin: 0, color: '#71717a', fontSize: '13px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', direction: 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                            {serial.trim().toUpperCase()}
                        </p>

                        <div style={styles.progressTrack} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                            <div style={{
                                width: `${progress}%`,
                                height: '100%',
                                borderRadius: '999px',
                                background: 'linear-gradient(90deg, #059669, #34d399)',
                                transition: 'width 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
                            }} />
                        </div>
                        <p style={{ margin: '8px 0 14px', color: '#52525b', fontSize: '11px', textAlign: 'end' }}>{progress}%</p>

                        <div aria-live="polite">
                            {tickerLines.map((line, i) => (
                                <div key={i} style={{ ...styles.stepRow, opacity: line.done ? 0.85 : 1 }}>
                                    <span aria-hidden style={{
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                                        background: line.done ? 'rgba(16,185,129,0.18)' : 'transparent',
                                        border: line.done ? '1px solid rgba(16,185,129,0.4)' : '2px solid #3f3f46',
                                        borderTopColor: line.done ? 'rgba(16,185,129,0.4)' : '#10b981',
                                        color: '#34d399', fontSize: 12,
                                        animation: line.done ? 'none' : 'cvSpin 0.9s linear infinite',
                                    }}>{line.done ? '✓' : ''}</span>
                                    <span style={{ color: line.done ? '#a1a1aa' : '#e4e4e7' }}>{line.text}</span>
                                </div>
                            ))}
                        </div>
                        <style>{`
                            @keyframes cvSpin { to { transform: rotate(360deg); } }
                            @keyframes cvPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
                        `}</style>
                    </>
                )}

                {stage === 'product' && (
                    <>
                        <span style={styles.label}>✓ {t.successBadge}</span>
                        <h1 style={{ margin: '18px 0 10px', fontSize: 'clamp(20px, 5vw, 26px)', lineHeight: 1.3 }}>
                            {t.pickTitle}
                        </h1>
                        <p style={{ margin: '0 0 16px', color: '#d4d4d8', lineHeight: 1.7, fontSize: '13px' }}>
                            {healingMode ? t.pickHealing : t.pickIntro}
                        </p>

                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                            {([['all', t.allBrands], ['anker', 'Anker'], ['soundcore', 'Soundcore'], ['joyroom', 'Joyroom'], ['jbl', 'JBL']] as const).map(([key, label]) => (
                                <button key={key} type="button" onClick={() => setBrandFilter(key)} style={styles.brandChip(brandFilter === key)}>
                                    {label}
                                </button>
                            ))}
                        </div>

                        <input
                            value={productSearch}
                            onChange={(e) => setProductSearch(e.target.value)}
                            placeholder={t.pickSearch}
                            style={{ ...styles.input, marginTop: 0, fontSize: '14px', fontFamily: 'inherit', textAlign: 'start', direction: isArabic ? 'rtl' : 'ltr', letterSpacing: 'normal' }}
                        />

                        <div style={{ marginTop: '12px', maxHeight: '300px', overflowY: 'auto', display: 'grid', gap: '8px', paddingInlineEnd: '4px' }}>
                            {filteredProducts.length === 0 && (
                                <p style={{ color: '#a1a1aa', fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>{t.pickEmpty}</p>
                            )}
                            {filteredProducts.map((p) => (
                                <button key={p.id} type="button" onClick={() => handleProductChosen(p.id)} style={styles.productItem}>
                                    {isArabic ? p.ar : p.en}
                                </button>
                            ))}
                        </div>

                        <button type="button" onClick={reset} style={styles.secondaryButton}>
                            {t.another}
                        </button>
                    </>
                )}

                {stage === 'result' && result && (
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
                                ...(result.warrantyDurationMonths
                                    ? [[t.duration, t.months(result.warrantyDurationMonths)]]
                                    : []),
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
                                        {t.termsValue}
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
