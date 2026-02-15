'use client';

import { useEffect, useRef, useState } from 'react';

interface MermaidDiagramProps {
    chart: string;
    title?: string;
    locale?: string;
}

export function MermaidDiagram({ chart, title, locale = 'ar' }: MermaidDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rendered, setRendered] = useState(false);
    const [error, setError] = useState(false);
    const isArabic = locale === 'ar';

    useEffect(() => {
        let cancelled = false;

        async function renderChart() {
            try {
                const mermaid = (await import('mermaid')).default;
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'base',
                    themeVariables: {
                        primaryColor: '#3b82f6',
                        primaryTextColor: '#1e293b',
                        primaryBorderColor: '#93c5fd',
                        lineColor: '#64748b',
                        secondaryColor: '#f0f9ff',
                        tertiaryColor: '#f8fafc',
                        fontFamily: 'inherit',
                        fontSize: '14px',
                    },
                    flowchart: {
                        useMaxWidth: true,
                        htmlLabels: true,
                        padding: 16,
                        curve: 'basis',
                    },
                });

                if (cancelled || !containerRef.current) return;

                const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2)}`;
                const { svg } = await mermaid.render(id, chart);

                if (!cancelled && containerRef.current) {
                    containerRef.current.innerHTML = svg;
                    setRendered(true);
                }
            } catch (err) {
                console.error('Mermaid render error:', err);
                if (!cancelled) setError(true);
            }
        }

        renderChart();
        return () => { cancelled = true; };
    }, [chart]);

    if (error) return null;

    return (
        <div className="my-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
            {title && (
                <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                        {title}
                    </h3>
                </div>
            )}
            <div
                ref={containerRef}
                className={`p-4 md:p-6 flex justify-center items-center min-h-[200px] transition-opacity duration-500 ${rendered ? 'opacity-100' : 'opacity-30'}`}
                dir="ltr"
            >
                {!rendered && !error && (
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {isArabic ? 'جاري تحميل الرسم البياني...' : 'Loading diagram...'}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MermaidDiagram;
