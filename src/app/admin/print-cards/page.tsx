'use client';

import { useState, useCallback, useRef } from 'react';

const API_KEY = 'cv-serials-dev-key-2026';

/* ── Auth Credentials (simple client-side gate) ── */
const ADMIN_USER = 'admin123';
const ADMIN_PASS = 'ABMabm2122@@';

interface GeneratedSerial {
    code: string;
    url: string;
}

export default function PrintCardsPage() {
    /* ── Auth State ── */
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authUser, setAuthUser] = useState('');
    const [authPass, setAuthPass] = useState('');
    const [authError, setAuthError] = useState('');

    /* ── Main page hooks (must be before any return) ── */
    const [count, setCount] = useState(10);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedSerials, setGeneratedSerials] = useState<GeneratedSerial[]>([]);
    const [error, setError] = useState('');
    const [showPrint, setShowPrint] = useState(false);
    const printRef = useRef<HTMLDivElement>(null);

    const handleGenerate = useCallback(async () => {
        setError('');
        setIsGenerating(true);

        try {
            const res = await fetch('/api/serials/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                },
                body: JSON.stringify({ count }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'فشل التوليد');

            const serials: GeneratedSerial[] = data.serials.map((code: string, i: number) => ({
                code,
                url: data.qrUrls[i],
            }));

            setGeneratedSerials(serials);
            setShowPrint(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'حدث خطأ');
        } finally {
            setIsGenerating(false);
        }
    }, [count]);

    const handlePrint = useCallback(() => {
        setShowPrint(true);
        setTimeout(() => window.print(), 600);
    }, []);

    const handleLogin = () => {
        if (authUser === ADMIN_USER && authPass === ADMIN_PASS) {
            setIsAuthenticated(true);
            setAuthError('');
        } else {
            setAuthError('اسم المستخدم أو كلمة المرور غير صحيحة');
        }
    };

    /* ── If not authenticated, show login ── */
    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#09090b',
                padding: '20px',
            }}>
                <div style={{
                    background: '#18181b',
                    borderRadius: '16px',
                    padding: 'clamp(24px, 5vw, 40px)',
                    width: '100%',
                    maxWidth: '400px',
                    border: '1px solid #27272a',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <div style={{
                            fontSize: '40px',
                            marginBottom: '8px',
                        }}>🔐</div>
                        <h1 style={{
                            fontSize: '20px',
                            fontWeight: 800,
                            color: '#fafafa',
                            margin: '0 0 4px',
                        }}>
                            CairoVolt Admin
                        </h1>
                        <p style={{
                            fontSize: '13px',
                            color: '#71717a',
                            margin: 0,
                        }}>
                            سجّل الدخول للوصول إلى لوحة إعداد الشحنات
                        </p>
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                        <label style={{ fontSize: '12px', color: '#a1a1aa', display: 'block', marginBottom: '6px' }}>
                            اسم المستخدم
                        </label>
                        <input
                            type="text"
                            value={authUser}
                            onChange={(e) => { setAuthUser(e.target.value); setAuthError(''); }}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            placeholder="Username"
                            autoComplete="username"
                            autoFocus
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                background: '#09090b',
                                border: '1px solid #3f3f46',
                                borderRadius: '10px',
                                color: '#fafafa',
                                fontSize: '15px',
                                fontFamily: "'Outfit', monospace",
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '12px', color: '#a1a1aa', display: 'block', marginBottom: '6px' }}>
                            كلمة المرور
                        </label>
                        <input
                            type="password"
                            value={authPass}
                            onChange={(e) => { setAuthPass(e.target.value); setAuthError(''); }}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            placeholder="Password"
                            autoComplete="current-password"
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                background: '#09090b',
                                border: '1px solid #3f3f46',
                                borderRadius: '10px',
                                color: '#fafafa',
                                fontSize: '15px',
                                fontFamily: "'Outfit', monospace",
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s',
                            }}
                        />
                    </div>

                    {authError && (
                        <p style={{
                            fontSize: '13px',
                            color: '#fca5a5',
                            margin: '0 0 14px',
                            textAlign: 'center',
                        }}>
                            ❌ {authError}
                        </p>
                    )}

                    <button
                        onClick={handleLogin}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: 'linear-gradient(135deg, #059669, #10b981)',
                            color: '#fff',
                            fontSize: '15px',
                            fontWeight: 700,
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontFamily: "'Cairo', sans-serif",
                            transition: 'opacity 0.2s',
                        }}
                    >
                        🔓 دخول
                    </button>

                    <p style={{
                        fontSize: '10px',
                        color: '#3f3f46',
                        textAlign: 'center',
                        margin: '16px 0 0',
                    }}>
                        ⚡ CAIROVOLT INTERNAL SYSTEM
                    </p>
                </div>

                <style>{`
                    input:focus { border-color: #10b981 !important; box-shadow: 0 0 0 3px rgba(16,185,129,0.15); }
                    button:hover { opacity: 0.9; }
                    button:active { transform: scale(0.98); }
                `}</style>
            </div>
        );
    }

    /* ── Main page content (after auth) ── */

    const qrUrl = (url: string) =>
        `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}&color=000000&bgcolor=ffffff&margin=1`;

    // Group cards into pages of 8
    const pages: GeneratedSerial[][] = [];
    for (let i = 0; i < generatedSerials.length; i += 8) {
        pages.push(generatedSerials.slice(i, i + 8));
    }

    return (
        <>
            {/* ═══ Print Styles ═══ */}
            <style>{`
                @page { 
                    size: A4 portrait; 
                    margin: 0; 
                }
                @media print {
                    .no-print { display: none !important; }
                    .print-only { display: block !important; }
                    body { 
                        background: #fff !important; 
                        margin: 0; 
                        padding: 0; 
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }

                @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            {/* ═══════════════════════════════════════
                CONTROL PANEL (Screen Only)
                ═══════════════════════════════════════ */}
            <div className="no-print" style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)',
                fontFamily: "'Cairo', 'Outfit', system-ui, sans-serif",
                color: '#fafafa',
                padding: 'clamp(16px, 4vw, 40px)',
                display: showPrint ? 'none' : 'block',
            }}>
                {/* Header */}
                <div style={{
                    maxWidth: '700px', margin: '0 auto clamp(20px, 4vw, 40px)',
                    textAlign: 'center',
                }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                        marginBottom: '8px',
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="#d4a017">
                            <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                        </svg>
                        <span style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 'clamp(22px, 5vw, 32px)',
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #d4a017, #f59e0b)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>CairoVolt</span>
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(20px, 4.5vw, 28px)',
                        fontWeight: 700, color: '#fafafa',
                        margin: '0 0 4px',
                    }}>
                        🖨️ مُولّد سيريالات CairoVolt
                    </h1>
                    <p style={{ fontSize: '13px', color: '#71717a', margin: 0 }}>
                        سيريالات عالمية (Universal) غير مرتبطة بمنتج أو قسم
                    </p>
                    <p dir="ltr" style={{ fontSize: '12px', color: '#d4a017', margin: '8px 0 0', fontFamily: "'Outfit', monospace", letterSpacing: '0.08em', textAlign: 'center' }}>
                        CV-1XXXXXm313
                    </p>
                </div>

                {/* Main Card */}
                <div style={{
                    maxWidth: '700px', margin: '0 auto',
                    background: 'rgba(24, 24, 27, 0.8)',
                    border: '1px solid #27272a',
                    borderRadius: '16px',
                    padding: 'clamp(20px, 4vw, 32px)',
                    backdropFilter: 'blur(20px)',
                }}>
                    {/* Count Input */}
                    <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                        <label style={{
                            display: 'block', fontSize: '15px', fontWeight: 700,
                            color: '#d4a017', marginBottom: '12px',
                        }}>
                            عدد السيريالات المطلوبة
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                            <button
                                onClick={() => setCount(c => Math.max(1, c - 10))}
                                style={{
                                    width: '44px', height: '44px',
                                    background: '#27272a', border: '1px solid #3f3f46',
                                    borderRadius: '10px', color: '#fafafa',
                                    fontSize: '20px', fontWeight: 700,
                                    cursor: 'pointer', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                }}
                            >−</button>
                            <input
                                type="number"
                                min={1}
                                max={200}
                                value={count}
                                onChange={(e) => setCount(Math.min(200, Math.max(1, parseInt(e.target.value) || 1)))}
                                style={{
                                    width: '100px', padding: '12px',
                                    background: '#0a0a0a',
                                    border: '1px solid #3f3f46',
                                    borderRadius: '10px',
                                    color: '#fafafa',
                                    fontSize: '24px',
                                    fontFamily: "'Outfit', monospace",
                                    textAlign: 'center',
                                    fontWeight: 700,
                                }}
                            />
                            <button
                                onClick={() => setCount(c => Math.min(200, c + 10))}
                                style={{
                                    width: '44px', height: '44px',
                                    background: '#27272a', border: '1px solid #3f3f46',
                                    borderRadius: '10px', color: '#fafafa',
                                    fontSize: '20px', fontWeight: 700,
                                    cursor: 'pointer', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                }}
                            >+</button>
                        </div>
                        <p style={{ fontSize: '11px', color: '#52525b', marginTop: '8px' }}>
                            الحد الأقصى: 200 سيريال
                        </p>
                    </div>

                    {/* Quick count buttons */}
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
                        {[10, 20, 50, 100, 200].map(n => (
                            <button
                                key={n}
                                onClick={() => setCount(n)}
                                style={{
                                    padding: '8px 18px',
                                    background: count === n ? 'rgba(212, 160, 23, 0.15)' : '#1a1a1a',
                                    border: `1px solid ${count === n ? '#d4a017' : '#3f3f46'}`,
                                    borderRadius: '8px',
                                    color: count === n ? '#d4a017' : '#a1a1aa',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontFamily: "'Outfit', monospace",
                                    transition: 'all 0.2s',
                                }}
                            >
                                {n}
                            </button>
                        ))}
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '10px',
                            padding: '12px 16px',
                            marginBottom: '16px',
                            color: '#fca5a5',
                            fontSize: '13px',
                            textAlign: 'center',
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: isGenerating
                                ? '#27272a'
                                : 'linear-gradient(135deg, #92400e 0%, #d97706 100%)',
                            color: isGenerating ? '#71717a' : '#000',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: 800,
                            fontFamily: "'Cairo', sans-serif",
                            cursor: isGenerating ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s',
                        }}
                    >
                        {isGenerating ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{
                                    width: '18px', height: '18px',
                                    border: '2px solid #52525b',
                                    borderTop: '2px solid #d4a017',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                    display: 'inline-block',
                                }} />
                                جارِ التوليد...
                            </span>
                        ) : (
                            `⚡ توليد ${count} سيريال`
                        )}
                    </button>
                </div>

                {/* ═══════════════════════════════════════
                    RESULTS TABLE
                    ═══════════════════════════════════════ */}
                {generatedSerials.length > 0 && (
                    <div style={{
                        maxWidth: '700px', margin: '24px auto 0',
                        animation: 'fadeIn 0.5s ease-out',
                    }}>
                        {/* Summary Bar */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            background: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            borderRadius: '12px',
                            padding: '14px 20px',
                            marginBottom: '16px',
                            flexWrap: 'wrap',
                            gap: '10px',
                        }}>
                            <span style={{ color: '#6ee7b7', fontWeight: 700, fontSize: '15px' }}>
                                ✅ تم توليد {generatedSerials.length} سيريال عالمي
                            </span>
                            <button
                                onClick={handlePrint}
                                style={{
                                    padding: '10px 24px',
                                    background: 'linear-gradient(135deg, #059669, #10b981)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    fontFamily: "'Cairo', sans-serif",
                                    cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                }}
                                title="اختر 'حفظ بتنسيق PDF' من نافذة الطباعة"
                            >
                                📄 تصدير PDF / طباعة
                            </button>
                        </div>

                        {/* Serials Table */}
                        <div style={{
                            background: 'rgba(24, 24, 27, 0.8)',
                            border: '1px solid #27272a',
                            borderRadius: '12px',
                            overflow: 'hidden',
                        }}>
                            <table style={{
                                width: '100%', borderCollapse: 'collapse',
                                fontSize: '13px',
                            }}>
                                <thead>
                                    <tr style={{ background: '#1a1a1a' }}>
                                        <th style={{ padding: '12px 16px', textAlign: 'right', color: '#71717a', fontWeight: 600 }}>#</th>
                                        <th style={{ padding: '12px 16px', textAlign: 'right', color: '#71717a', fontWeight: 600 }}>السيريال</th>
                                        <th style={{ padding: '12px 16px', textAlign: 'right', color: '#71717a', fontWeight: 600 }}>رابط QR</th>
                                        <th style={{ padding: '12px 16px', textAlign: 'center', color: '#71717a', fontWeight: 600 }}>نسخ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {generatedSerials.map((s, i) => (
                                        <tr key={s.code} style={{
                                            borderTop: '1px solid #1f1f23',
                                            animation: `fadeIn 0.3s ease-out ${i * 0.03}s both`,
                                        }}>
                                            <td style={{ padding: '10px 16px', color: '#52525b' }}>{i + 1}</td>
                                            <td style={{
                                                padding: '10px 16px',
                                                fontFamily: "'Outfit', monospace",
                                                fontWeight: 700, color: '#d4a017',
                                                letterSpacing: '0.05em',
                                                direction: 'ltr',
                                            }}>
                                                {s.code}
                                            </td>
                                            <td style={{
                                                padding: '10px 16px',
                                                fontFamily: "'Outfit', monospace",
                                                fontSize: '11px', color: '#52525b',
                                                maxWidth: '300px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                direction: 'ltr',
                                            }}>
                                                {s.url}
                                            </td>
                                            <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(s.url)}
                                                    style={{
                                                        background: 'none', border: '1px solid #3f3f46',
                                                        borderRadius: '6px', padding: '4px 10px',
                                                        color: '#a1a1aa', fontSize: '11px',
                                                        cursor: 'pointer',
                                                        fontFamily: "'Cairo', sans-serif",
                                                    }}
                                                >
                                                    📋
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Bottom print button */}
                        <div style={{ textAlign: 'center', margin: '24px 0' }}>
                            <button
                                onClick={handlePrint}
                                style={{
                                    padding: '14px 40px',
                                    background: 'linear-gradient(135deg, #059669, #10b981)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    fontWeight: 800,
                                    fontFamily: "'Cairo', sans-serif",
                                    cursor: 'pointer',
                                }}
                            >
                                📄 تصدير {generatedSerials.length} كارت كملف PDF
                            </button>
                            <p style={{ fontSize: '12px', color: '#71717a', marginTop: '10px' }}>
                                تلميح: في نافذة الطباعة، قم باختيار <strong>&quot;Save as PDF (حفظ بتنسيق PDF)&quot;</strong>
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* ═══════════════════════════════════════
                PRINT LAYOUT (A4 Cards)
                ═══════════════════════════════════════ */}
            <div
                ref={printRef}
                className="print-only"
                style={{
                    display: showPrint ? 'block' : 'none',
                    background: '#fff',
                    fontFamily: "'Cairo', 'Outfit', system-ui, sans-serif",
                }}
            >
                {/* Back button (screen only) */}
                <div className="no-print" style={{
                    position: 'fixed', top: '16px', right: '16px', zIndex: 999,
                }}>
                    <button
                        onClick={() => setShowPrint(false)}
                        style={{
                            padding: '10px 20px',
                            background: '#18181b',
                            color: '#fafafa',
                            border: '1px solid #3f3f46',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontFamily: "'Cairo', sans-serif",
                        }}
                    >
                        ← العودة للوحة التحكم
                    </button>
                </div>

                {pages.map((pageCards, pageIdx) => (
                    <div
                        key={pageIdx}
                        style={{
                            width: '210mm',
                            height: '297mm', // Strict A4 height
                            padding: '24mm 14mm', // Vertical and horizontal centering
                            display: 'grid',
                            gridTemplateColumns: '85.6mm 85.6mm',
                            gridTemplateRows: 'repeat(4, 53.98mm)',
                            gap: '10mm',
                            justifyContent: 'center',
                            alignContent: 'center',
                            pageBreakAfter: 'always',
                            pageBreakInside: 'avoid',
                            boxSizing: 'border-box',
                            margin: '0 auto',
                        }}
                    >
                        {pageCards.map((card) => (
                            <div
                                key={card.code}
                                style={{
                                    width: '85.6mm',
                                    height: '53.98mm',
                                    background: 'linear-gradient(145deg, #0a0a0a, #1a1a1a)',
                                    borderRadius: '3mm',
                                    padding: '4mm',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    color: '#fafafa',
                                    border: '0.3mm solid #b8860b',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    WebkitPrintColorAdjust: 'exact',
                                    printColorAdjust: 'exact' as never,
                                }}
                            >
                                {/* Inner border */}
                                <div style={{
                                    position: 'absolute',
                                    top: '1.5mm', left: '1.5mm', right: '1.5mm', bottom: '1.5mm',
                                    border: '0.15mm solid rgba(184, 134, 11, 0.3)',
                                    borderRadius: '2mm',
                                    pointerEvents: 'none',
                                }} />

                                {/* Header */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '2mm',
                                    width: '100%',
                                }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#d4a017">
                                        <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                                    </svg>
                                    <span style={{
                                        fontFamily: "'Outfit', sans-serif",
                                        fontSize: '10pt',
                                        fontWeight: 700,
                                        color: '#d4a017',
                                        letterSpacing: '0.5mm',
                                    }}>CairoVolt</span>
                                </div>

                                {/* Subtitle */}
                                <div style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: '5pt',
                                    color: '#b8860b',
                                    letterSpacing: '1mm',
                                    textTransform: 'uppercase',
                                    textAlign: 'center',
                                    width: '100%',
                                }}>
                                    C2PA PRODUCT AUTHENTICATION
                                </div>

                                {/* QR Code */}
                                <div style={{
                                    width: '22mm', height: '22mm',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    position: 'relative',
                                }}>
                                    <div style={{
                                        position: 'absolute', top: '-1mm', left: '-1mm',
                                        width: '4mm', height: '4mm',
                                        borderTop: '0.3mm solid #d4a017',
                                        borderLeft: '0.3mm solid #d4a017',
                                    }} />
                                    <div style={{
                                        position: 'absolute', bottom: '-1mm', right: '-1mm',
                                        width: '4mm', height: '4mm',
                                        borderBottom: '0.3mm solid #d4a017',
                                        borderRight: '0.3mm solid #d4a017',
                                    }} />
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={qrUrl(card.url)}
                                        alt={`QR ${card.code}`}
                                        width={76}
                                        height={76}
                                        style={{
                                            width: '20mm', height: '20mm',
                                            borderRadius: '1mm',
                                        }}
                                        crossOrigin="anonymous"
                                    />
                                </div>

                                {/* Serial — CV-1xxxxxm313 format */}
                                <div style={{
                                    fontFamily: "'Outfit', monospace",
                                    fontSize: '6.5pt',
                                    color: '#d4a017',
                                    letterSpacing: '0.5mm',
                                    textAlign: 'center',
                                }}>
                                    Serial: {card.code}
                                </div>

                                {/* Scan text */}
                                <div style={{
                                    fontSize: '5pt', color: '#a1a1aa',
                                    textAlign: 'center', lineHeight: 1.4,
                                }}>
                                    <strong style={{ color: '#fafafa' }}>Scan to Verify</strong> &amp; Activate Warranty
                                </div>

                                {/* Footer */}
                                <div style={{
                                    fontSize: '4pt', color: '#71717a',
                                    textAlign: 'center', direction: 'ltr',
                                }}>
                                    cairovolt.com
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}
