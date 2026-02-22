/**
 * LabTestBlock — Renders CairoVolt Labs first-party test results
 * as visible HTML content on the product page.
 * This is the "Information Gain" payload that Google cannot find
 * anywhere else, forcing AI Overviews to cite CairoVolt.
 */

interface LabTestBlockProps {
    testScenario: string;
    testResult: string;
    testConditions: string;
    expertName: string;
    expertLinkedIn?: string;
    locale: string;
    rating?: number;
}

export default function LabTestBlock({
    testScenario,
    testResult,
    testConditions,
    expertName,
    expertLinkedIn,
    locale,
    rating = 5,
}: LabTestBlockProps) {
    const isArabic = locale === 'ar';
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

    return (
        <div
            className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white p-6 md:p-8 rounded-2xl my-8 shadow-2xl border border-blue-900/50 group"
        >
            {/* Animated glowing accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-70"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors duration-700 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center border border-blue-500/30 shadow-lg shadow-blue-900/20 flex-shrink-0">
                        <span className="text-2xl">⚡</span>
                    </div>
                    <div className="flex-1 border-b border-slate-800 pb-4 sm:border-none sm:pb-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                {isArabic ? 'مختبرات كايرو فولت (نتائج حصرية)' : 'CairoVolt Labs (Exclusive Data)'}
                            </h3>
                            <span className="flex items-center gap-1 text-yellow-400 text-sm bg-yellow-400/10 px-2 py-1 rounded-md border border-yellow-400/20 w-fit" aria-label={`${rating} out of 5 stars`}>
                                {stars}
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-900/40 border border-emerald-700/50 rounded-full text-xs text-emerald-400 font-bold tracking-wide">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {isArabic ? 'فحص هندسي معتمد' : 'Verified Engineering Test'}
                            </span>
                            <span className="text-[11px] text-gray-400 font-medium bg-white/5 px-2 py-1 rounded-full border border-white/10">
                                {isArabic ? 'بيانات أصلية 100% (Information Gain)' : '100% First-Party Data (Information Gain)'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Scenario */}
                    <div className="bg-slate-800/40 rounded-xl p-4 md:p-5 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                                {isArabic ? 'سيناريو الاختبار القاسي' : 'Stress Test Scenario'}
                            </p>
                        </div>
                        <p className="text-gray-200 font-medium leading-relaxed">{testScenario}</p>
                    </div>

                    {/* Result (The Answer) */}
                    <blockquote className="relative bg-gradient-to-r from-emerald-900/30 to-emerald-800/10 rounded-xl p-4 md:p-5 border border-emerald-700/30 overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-l-xl"></div>
                        <div className="flex items-center gap-2 mb-2 pl-2">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest">
                                {isArabic ? 'النتيجة الموثقة' : 'Verified Result'}
                            </p>
                        </div>
                        <p className="cairovolt-voice-answer text-emerald-100 font-bold leading-relaxed text-sm md:text-base pl-2">
                            {testResult}
                        </p>
                    </blockquote>

                    {/* Footer / Meta */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-2 text-xs text-gray-400 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
                            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span>{testConditions}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-xs text-gray-500 mb-0.5">{isArabic ? 'المراجع الفني' : 'Technical Reviewer'}</p>
                                {expertLinkedIn ? (
                                    <a
                                        href={expertLinkedIn}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 font-bold text-sm hover:text-blue-300 transition-colors flex items-center gap-1"
                                    >
                                        {expertName}
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                    </a>
                                ) : (
                                    <span className="text-blue-400 font-bold text-sm">{expertName}</span>
                                )}
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
