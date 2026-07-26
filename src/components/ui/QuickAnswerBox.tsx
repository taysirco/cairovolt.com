/**
 * Quick Answer Box — Concise answer section
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
    const hash = typeof answer === 'string' ? answer.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;

    // Labels must stay NEUTRAL. 'مباشرة من المعمل:' and 'Straight from the Lab:'
    // were removed: this box carries editorial buying guidance, not measurements,
    // so a lab label asserted a provenance the copy does not have — on category
    // hubs it sat above generic advice with zero figures and zero citations.
    // CairoVolt runs a real bench-test programme, which is exactly why lab wording
    // must be reserved for blocks carrying an actual measurement with a sample ID
    // or a named third-party source. ('في الجون:' is Egyptian for "spot on" — a
    // register choice, not a provenance claim, so it stays.)
    const arPrefixes = ['باختصار:', 'الخلاصة:', 'في الجون:', 'ع السريع:'];
    const enPrefixes = ['In short:', 'Bottom Line:', 'TL;DR:', 'Quick Take:'];

    const arLabels = ['ملخص سريع', 'إجابتك المختصرة', 'نظرة سريعة'];
    const enLabels = ['Quick summary', 'Short answer', 'Brief overview'];

    const prefix = isArabic ? arPrefixes[hash % arPrefixes.length] : enPrefixes[hash % enPrefixes.length];
    const ariaLabel = isArabic ? arLabels[hash % arLabels.length] : enLabels[hash % enLabels.length];

    const baseClasses = 'quick-answer-box rounded-xl px-5 py-4 mb-6 text-sm leading-relaxed';
    const variantClasses = variant === 'highlighted'
        ? 'bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-gray-700 dark:text-gray-300'
        : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 text-gray-600 dark:text-gray-400';

    return (
        <div
            className={`${baseClasses} ${variantClasses}`}
            dir={isArabic ? 'rtl' : 'ltr'}
            role="complementary"
            aria-label={ariaLabel}
            data-speakable="quick-answer"
        >
            <p>
                <strong className="text-gray-900 dark:text-white">{prefix}</strong>{' '}
                {answer}
            </p>
        </div>
    );
}

export default QuickAnswerBox;
