interface QA {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    productName: string;
    qaList: QA[];
    locale: string;
}

/** Product-specific questions shown directly to customers. */
export default function FAQSection({ productName, qaList, locale }: FAQSectionProps) {
    if (!qaList || qaList.length === 0) return null;

    const isArabic = locale === 'ar';

    return (
        <section
            className="mt-12 mb-8 border-t border-gray-200 pt-8"
            aria-label={isArabic ? `أسئلة شائعة عن ${productName}` : `Frequently asked questions about ${productName}`}
        >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {isArabic ? '🎙️ كايرو فولت بتجاوبك (أسئلة الشارع)' : '🎙️ CairoVolt Answers (Common Questions)'}
            </h2>
            <div className="space-y-3">
                {qaList.map((qa, index) => (
                    <details
                        key={index}
                        className="group bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 [&_summary::-webkit-details-marker]:hidden"
                    >
                        <summary className="font-bold text-lg text-gray-800 dark:text-gray-100 outline-none flex justify-between items-center">
                            {qa.question}
                            <span className="text-blue-600 transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <div className="cairovolt-faq-answer mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                            <strong className="text-blue-700 dark:text-blue-400">
                                {isArabic ? 'الإجابة:' : 'Answer:'}
                            </strong>{' '}
                            {qa.answer}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
