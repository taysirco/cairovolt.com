import type { ReactNode } from 'react';

/**
 * Collapsible content section built on native <details>/<summary>.
 * Content stays in the DOM even when closed, so it remains crawlable for
 * SEO/AEO/GEO (Google indexes <details> content) — it is just visually
 * collapsed to keep the product page short and scannable. No JS required.
 */
export default function CollapsibleSection({
    summary,
    children,
    defaultOpen = false,
    className = '',
    summaryClassName = '',
}: {
    summary: ReactNode;
    children: ReactNode;
    defaultOpen?: boolean;
    className?: string;
    summaryClassName?: string;
}) {
    return (
        <details className={`group ${className}`} {...(defaultOpen ? { open: true } : {})}>
            <summary
                className={`flex items-center justify-between gap-3 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden ${summaryClassName}`}
            >
                <span className="flex-1 min-w-0">{summary}</span>
                <svg
                    className="w-6 h-6 flex-none text-blue-500 transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </summary>
            <div className="pt-4">{children}</div>
        </details>
    );
}
