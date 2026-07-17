'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

const DASHBOARD_URL = '/api/admin/wholesale';

export default function WholesaleAdminPage() {
    const [secret, setSecret] = useState('');
    const [error, setError] = useState('');
    const [isChecking, setIsChecking] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function checkSession() {
            try {
                const response = await fetch('/api/admin/session', {
                    method: 'GET',
                    credentials: 'same-origin',
                    cache: 'no-store',
                    signal: controller.signal,
                });
                const data = response.ok
                    ? await response.json() as { authenticated?: boolean }
                    : null;

                if (data?.authenticated) {
                    window.location.replace(DASHBOARD_URL);
                    return;
                }
            } catch (sessionError) {
                if (sessionError instanceof DOMException && sessionError.name === 'AbortError') {
                    return;
                }
            }

            setIsChecking(false);
        }

        void checkSession();
        return () => controller.abort();
    }, []);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!secret || isSubmitting) return;

        const submittedSecret = secret;
        setSecret('');
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/admin/session', {
                method: 'POST',
                credentials: 'same-origin',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ secret: submittedSecret }),
            });

            if (response.ok) {
                window.location.replace(DASHBOARD_URL);
                return;
            }

            setError(response.status === 503
                ? 'تسجيل الدخول غير مهيأ على الخادم.'
                : 'مفتاح الإدارة غير صحيح.');
        } catch {
            setError('تعذر الاتصال بالخادم. حاول مرة أخرى.');
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isChecking) {
        return (
            <main style={styles.centeredPage}>
                <p style={styles.status}>جارِ التحقق من الجلسة…</p>
            </main>
        );
    }

    return (
        <main style={styles.centeredPage}>
            <section style={styles.card} aria-labelledby="wholesale-login-title">
                <div style={styles.icon} aria-hidden="true">🔐</div>
                <h1 id="wholesale-login-title" style={styles.title}>لوحة إدارة الجملة</h1>
                <p style={styles.description}>سجّل الدخول للوصول إلى بيانات وكتالوج الجملة.</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="admin-secret" style={styles.label}>مفتاح الإدارة</label>
                    <input
                        id="admin-secret"
                        type="password"
                        value={secret}
                        onChange={(event) => {
                            setSecret(event.target.value);
                            setError('');
                        }}
                        autoComplete="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        autoFocus
                        required
                        style={styles.input}
                    />

                    {error && (
                        <p role="alert" style={styles.error}>{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || !secret}
                        style={{
                            ...styles.button,
                            opacity: isSubmitting || !secret ? 0.6 : 1,
                            cursor: isSubmitting || !secret ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {isSubmitting ? 'جارِ تسجيل الدخول…' : 'دخول آمن'}
                    </button>
                </form>
            </section>
        </main>
    );
}

const styles = {
    centeredPage: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'radial-gradient(circle at top, #172554 0%, #09090b 58%)',
        boxSizing: 'border-box' as const,
    },
    card: {
        width: '100%',
        maxWidth: '410px',
        padding: '36px',
        border: '1px solid #27272a',
        borderRadius: '18px',
        background: '#18181b',
        boxShadow: '0 24px 80px rgba(0, 0, 0, 0.45)',
    },
    icon: {
        marginBottom: '12px',
        textAlign: 'center' as const,
        fontSize: '40px',
    },
    title: {
        margin: '0 0 8px',
        textAlign: 'center' as const,
        color: '#fafafa',
        fontSize: '24px',
        fontWeight: 800,
    },
    description: {
        margin: '0 0 28px',
        textAlign: 'center' as const,
        color: '#a1a1aa',
        fontSize: '13px',
        lineHeight: 1.8,
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        color: '#d4d4d8',
        fontSize: '13px',
        fontWeight: 700,
    },
    input: {
        width: '100%',
        boxSizing: 'border-box' as const,
        padding: '13px 14px',
        border: '1px solid #3f3f46',
        borderRadius: '10px',
        outline: 'none',
        background: '#09090b',
        color: '#fafafa',
        fontSize: '16px',
        direction: 'ltr' as const,
    },
    error: {
        margin: '12px 0 0',
        color: '#fca5a5',
        textAlign: 'center' as const,
        fontSize: '13px',
    },
    button: {
        width: '100%',
        marginTop: '18px',
        padding: '13px 16px',
        border: 0,
        borderRadius: '10px',
        background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
        color: '#ffffff',
        fontFamily: "'Cairo', sans-serif",
        fontSize: '15px',
        fontWeight: 800,
    },
    status: {
        color: '#a1a1aa',
        fontSize: '14px',
    },
};
