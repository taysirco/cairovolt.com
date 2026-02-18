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
            className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl my-8 shadow-xl border border-slate-700"
        >
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🧪</span>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-blue-400">
                            {isArabic ? 'نتائج مختبر كايرو فولت' : 'CairoVolt Labs Test Results'}
                        </h3>
                        <span className="text-yellow-400 text-sm" aria-label={`${rating} out of 5 stars`}>
                            {stars}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-900/40 border border-green-700/50 rounded-full text-xs text-green-400 font-medium">
                            ✔️ {isArabic ? 'فحص معتمد' : 'Verified Lab Test'}
                        </span>
                        <span className="text-xs text-gray-500">
                            {isArabic ? 'بيانات حصرية — غير متوفرة في أي مكان آخر' : 'First-party data — not available elsewhere'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        {isArabic ? 'سيناريو الاختبار' : 'Test Scenario'}
                    </p>
                    <p className="text-gray-200 font-medium">{testScenario}</p>
                </div>

                <div className="bg-green-900/20 rounded-xl p-4 border border-green-700/30">
                    <p className="text-xs text-green-400 uppercase tracking-wider mb-1">
                        {isArabic ? 'النتيجة الحقيقية' : 'Actual Result'}
                    </p>
                    <p className="cairovolt-voice-answer text-green-200 font-bold leading-relaxed">{testResult}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>📍 {testConditions}</span>
                    <span>
                        {expertLinkedIn ? (
                            <a
                                href={expertLinkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 font-medium hover:text-blue-300 transition-colors"
                            >
                                — {expertName}
                            </a>
                        ) : (
                            <span className="text-blue-400 font-medium">— {expertName}</span>
                        )}
                    </span>
                </div>

            </div>
        </div>
    );
}
