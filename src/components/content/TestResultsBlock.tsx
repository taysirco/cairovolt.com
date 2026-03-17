/**
 * TestResultsBlock — Renders CairoVolt Labs first-party test results
 * as visible HTML content on the product page.
 * Highly structured, empirical data block designed to provide
 * first-party insights and clear technical specifications.
 */

interface TestResultsBlockProps {
    testScenario: string;
    testResult: string;
    testConditions: string;
    expertName: string;
    expertProfileUrl?: string;
    locale: string;
    rating?: number;
}

export default function TestResultsBlock({
    testScenario,
    testResult,
    testConditions,
    expertName,
    expertProfileUrl,
    locale,
    rating = 5,
}: TestResultsBlockProps) {
    const isArabic = locale === 'ar';
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

    // Hash to ensure consistency per-product but variety across the site
    const hash = typeof testScenario === 'string' ? testScenario.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;

    const arTitles = [
        'الفحص التقني (مختبرات كايرو فولت)',
        'نتائج حصرية من معمل كايرو فولت',
        'اختبار الأداء الفعلي (كايرو فولت)',
        'الخلاصة الهندسية من خبرائنا',
        'تحليل الأداء الشامل (CairoVolt Labs)',
        'كشف التجربة العملية (مختبراتنا)',
        'رأينا التقني بصراحة (حصري)'
    ];
    const enTitles = [
        'Technical Audit (CairoVolt Labs)',
        'Exclusive Lab Results',
        'Real-World Performance Test',
        'Engineering Verdict',
        'Comprehensive Performance Analysis',
        'Hands-on Lab Experience',
        'Expert Technical Review'
    ];

    const arScenarios = ['سيناريو الاختبار القاسي', 'ظروف التجربة الفعلية', 'طريقة فحص المنتج', 'اختبار الضغط العالي'];
    const enScenarios = ['Stress Test Scenario', 'Real-World Conditions', 'Testing Methodology', 'High-Load Testing'];

    const arResults = ['النتيجة الموثقة', 'الخلاصة النهائية', 'ما لاحظناه فعلياً', 'قرائات الاختبار'];
    const enResults = ['Verified Result', 'Final Verdict', 'Actual Observations', 'Test Readings'];

    const arReviewers = ['المراجع الفني', 'مهندس الفحص', 'خبير كايرو فولت', 'المشرف التقني', 'مهندس الاختبارات'];
    const enReviewers = ['Technical Reviewer', 'Quality Engineer', 'CairoVolt Expert', 'Technical Lead', 'Testing Specialist'];

    const selectedArTitle = arTitles[hash % arTitles.length];
    const selectedEnTitle = enTitles[hash % enTitles.length];
    const selectedArScenario = arScenarios[hash % arScenarios.length];
    const selectedEnScenario = enScenarios[hash % enScenarios.length];
    const selectedArResult = arResults[hash % arResults.length];
    const selectedEnResult = enResults[hash % enResults.length];
    const selectedArReviewer = arReviewers[hash % arReviewers.length];
    const selectedEnReviewer = enReviewers[hash % enReviewers.length];

    return (
        <div
            className="relative overflow-hidden bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-slate-900 dark:to-black text-gray-900 dark:text-white p-6 md:p-8 rounded-2xl my-8 shadow-2xl border border-gray-200 dark:border-blue-900/50 group"
        >
            {/* Animated glowing accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-70"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-200/30 dark:bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-300/40 dark:group-hover:bg-blue-500/30 transition-colors duration-700 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-500/30 shadow-lg shadow-blue-100/50 dark:shadow-blue-900/20 flex-shrink-0">
                        <span className="text-2xl">⚡</span>
                    </div>
                    <div className="flex-1 border-b border-gray-200 dark:border-slate-800 pb-4 sm:border-none sm:pb-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 dark:from-blue-400 to-cyan-500 dark:to-cyan-300">
                                {isArabic ? selectedArTitle : selectedEnTitle}
                            </h3>
                            <span className="flex items-center gap-1 text-yellow-400 text-sm bg-yellow-400/10 px-2 py-1 rounded-md border border-yellow-400/20 w-fit" aria-label={`${rating} out of 5 stars`}>
                                {stars}
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700/50 rounded-full text-xs text-emerald-700 dark:text-emerald-400 font-bold tracking-wide">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {isArabic ? 'فحص هندسي معتمد' : 'Verified Engineering Test'}
                            </span>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-full border border-gray-200 dark:border-white/10">
                                {isArabic ? 'بيانات أصلية 100% — مختبرياً' : '100% Lab-Verified Data'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Scenario */}
                    <div className="bg-gray-50 dark:bg-slate-800/40 rounded-xl p-4 md:p-5 border border-gray-200 dark:border-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-800/60 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 text-gray-400 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                                {isArabic ? selectedArScenario : selectedEnScenario}
                            </p>
                        </div>
                        <p className="text-gray-700 dark:text-gray-200 font-medium leading-relaxed">{testScenario}</p>
                    </div>

                    {/* Result (The Answer) */}
                    <blockquote className="relative bg-gradient-to-r from-emerald-50 dark:from-emerald-900/30 to-emerald-50/50 dark:to-emerald-800/10 rounded-xl p-4 md:p-5 border border-emerald-200 dark:border-emerald-700/30 overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-l-xl"></div>
                        <div className="flex items-center gap-2 mb-2 pl-2">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">
                                {isArabic ? selectedArResult : selectedEnResult}
                            </p>
                        </div>
                        <p className="cairovolt-voice-answer text-emerald-800 dark:text-emerald-100 font-bold leading-relaxed text-sm md:text-base pl-2">
                            {testResult}
                        </p>
                    </blockquote>

                    {/* Footer / Meta */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-slate-800">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700">
                            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span>{testConditions}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-xs text-gray-500 mb-0.5">{isArabic ? selectedArReviewer : selectedEnReviewer}</p>
                                {expertProfileUrl ? (
                                    <a
                                        href={expertProfileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 font-bold text-sm hover:text-blue-500 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
                                    >
                                        {expertName}
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                                    </a>
                                ) : (
                                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{expertName}</span>
                                )}
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
