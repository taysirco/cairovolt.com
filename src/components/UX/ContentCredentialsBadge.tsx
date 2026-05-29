'use client';

import { useState } from 'react';


interface ContentCredentialsData {
    manifest?: {
        'dc:title'?: string;
        'dc:format'?: string;
        producer?: { name: string; did: string; url: string };
        'c2pa:assertions'?: Array<{
            label: string;
            data: Record<string, unknown>;
        }>;
    };
    signature?: string;
    signingKeyId?: string;
    algorithm?: string;
    issuedAt?: string;
}

interface Props {
    credentials?: ContentCredentialsData | null;
    productSlug?: string;
    locale?: string;
}

const labels = {
    ar: {
        verified: 'محتوى موثّق',
        notSigned: 'غير موقّع بعد',
        realCamera: 'صورة حقيقية',
        aiGenerated: 'مولّد بالذكاء الاصطناعي',
        unknown: 'مصدر غير محدد',
        modalTitle: 'بيانات توثيق المحتوى',
        signer: 'الموقِّع',
        algorithm: 'خوارزمية التوقيع',
        issuedAt: 'تاريخ التوقيع',
        captureMethod: 'طريقة الإنشاء',
        producer: 'المنتج',
        verifyOnline: 'تحقق بنفسك',
        publicKey: 'المفتاح العام (JWKS)',
        standard: 'المعيار',
        did: 'هوية الناشر (DID)',
        close: 'إغلاق',
        captureLabels: {
            'c2pa.captured': 'كاميرا حقيقية',
            'c2pa.created': 'إنشاء بشري',
            'c2pa.edited': 'تحرير بشري',
            'c2pa.ai_generated': 'مولّد بالذكاء الاصطناعي',
            'c2pa.ai_edited': 'محرَّر بالذكاء الاصطناعي',
        } as Record<string, string>,
    },
    en: {
        verified: 'Verified Content',
        notSigned: 'Not Yet Signed',
        realCamera: 'Real Camera',
        aiGenerated: 'AI Generated',
        unknown: 'Unknown Source',
        modalTitle: 'Content Credentials',
        signer: 'Signer',
        algorithm: 'Signing Algorithm',
        issuedAt: 'Signed At',
        captureMethod: 'Capture Method',
        producer: 'Producer',
        verifyOnline: 'Verify Yourself',
        publicKey: 'Public Key (JWKS)',
        standard: 'Standard',
        did: 'Publisher DID',
        close: 'Close',
        captureLabels: {
            'c2pa.captured': 'Real Camera',
            'c2pa.created': 'Human-Created',
            'c2pa.edited': 'Human-Edited',
            'c2pa.ai_generated': 'AI Generated',
            'c2pa.ai_edited': 'AI-Assisted Edit',
        } as Record<string, string>,
    },
};

export function ContentCredentialsBadge({ credentials, productSlug, locale = 'ar' }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const t = labels[locale as 'ar' | 'en'] || labels.ar;
    const isRtl = locale === 'ar';

    if (!credentials) {
        return null;
    }

    const actionsAssertion = credentials.manifest?.['c2pa:assertions']?.find(
        a => a.label === 'c2pa.actions',
    );
    const actions = actionsAssertion?.data?.actions as Array<{ action: string }> | undefined;
    const captureMethod = actions?.[0]?.action || null;
    const isAiGenerated = captureMethod === 'c2pa.ai_generated' || captureMethod === 'c2pa.ai_edited';

    const captureLabel = captureMethod
        ? (t.captureLabels[captureMethod] || captureMethod)
        : t.unknown;

    const issuedDate = credentials.issuedAt
        ? new Date(credentials.issuedAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
        : null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                title={t.modalTitle}
                aria-label={`${t.verified} — ${t.modalTitle}`}
            >
                {isAiGenerated
                    ? <svg className="h-3.5 w-3.5 shrink-0 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9.5 9.5l5 5M14.5 9.5l-5 5"/></svg>
                    : <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                }
                <span>{isAiGenerated ? t.aiGenerated : t.verified}</span>
                <svg className="h-3 w-3 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
                    onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={t.modalTitle}
                    dir={isRtl ? 'rtl' : 'ltr'}
                >
                    <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl dark:bg-zinc-900">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
                            <div className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                                <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
                                    {t.modalTitle}
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                aria-label={t.close}
                            >
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="space-y-3 px-5 py-4 text-sm">
                            {/* Capture Method */}
                            <Row
                                label={t.captureMethod}
                                value={captureLabel}
                                highlight={!isAiGenerated}
                                isRtl={isRtl}
                            />

                            {/* Producer */}
                            {credentials.manifest?.producer?.name && (
                                <Row
                                    label={t.producer}
                                    value={credentials.manifest.producer.name}
                                    isRtl={isRtl}
                                />
                            )}

                            {/* DID */}
                            {credentials.manifest?.producer?.did && (
                                <Row
                                    label={t.did}
                                    value={credentials.manifest.producer.did}
                                    mono
                                    isRtl={isRtl}
                                />
                            )}

                            {/* Algorithm */}
                            {credentials.algorithm && (
                                <Row
                                    label={t.algorithm}
                                    value={credentials.algorithm}
                                    mono
                                    isRtl={isRtl}
                                />
                            )}

                            {/* Standard */}
                            <Row
                                label={t.standard}
                                value="C2PA v1 compatible"
                                isRtl={isRtl}
                            />

                            {/* Issued At */}
                            {issuedDate && (
                                <Row label={t.issuedAt} value={issuedDate} isRtl={isRtl} />
                            )}
                        </div>

                        {/* Footer links */}
                        <div className="flex flex-wrap gap-2 border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
                            {productSlug && (
                                <a
                                    href={`/api/v1/verify-content?slug=${productSlug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400"
                                >
                                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                                    {t.verifyOnline}
                                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                </a>
                            )}
                            <a
                                href="/.well-known/jwks.json"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400"
                            >
                                {t.publicKey}
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function Row({
    label,
    value,
    highlight,
    mono,
    isRtl,
}: {
    label: string;
    value: string;
    highlight?: boolean;
    mono?: boolean;
    isRtl?: boolean;
}) {
    return (
        <div className={`flex items-start justify-between gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="shrink-0 text-zinc-500 dark:text-zinc-400">{label}</span>
            <span
                className={[
                    'text-end font-medium',
                    mono ? 'font-mono text-xs text-zinc-600 dark:text-zinc-300' : 'text-zinc-800 dark:text-zinc-200',
                    highlight ? 'text-emerald-600 dark:text-emerald-400' : '',
                ].join(' ')}
            >
                {value}
            </span>
        </div>
    );
}
