/**
 * Quick Answer Box — Concise answer snippet
 * Placed below H1 and key H2 headings to provide immediate value.
 *
 * Design: Subtle, professional box that doesn't disrupt reading
 * but catches attention with a complete, citable answer.
 */

interface QuickAnswerBoxProps {
    /** The concise summary text (aim for ~45 words / 3 bullet points) */
    answer: string;
    /** Language direction */
    locale: 'ar' | 'en' | string;
    /** Optional: variant styling */
    variant?: 'subtle' | 'highlighted';
}

export function QuickAnswerBox({ answer, locale, variant = 'subtle' }: QuickAnswerBoxProps) {
    const isArabic = locale === 'ar';
    const prefix = isArabic ? 'باختصار:' : 'In short:';

    const baseClasses = 'quick-answer-box rounded-xl px-5 py-4 mb-6 text-sm leading-relaxed';
    const variantClasses = variant === 'highlighted'
        ? 'bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-gray-700 dark:text-gray-300'
        : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 text-gray-600 dark:text-gray-400';

    return (
        <div
            className={`${baseClasses} ${variantClasses}`}
            dir={isArabic ? 'rtl' : 'ltr'}
            role="complementary"
            aria-label={isArabic ? 'ملخص سريع' : 'Quick summary'}
        >
            <p>
                <strong className="text-gray-900 dark:text-white">{prefix}</strong>{' '}
                {answer}
            </p>
        </div>
    );
}

export default QuickAnswerBox;
