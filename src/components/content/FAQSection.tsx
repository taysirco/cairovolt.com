// Server Component — structured data
// DO NOT add 'use client' here!
import Script from 'next/script';

interface QA {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    productName: string;
    qaList: QA[];
    locale: string;
}

/**
 * FAQSection — Product-specific FAQ with FAQPage schema + SpeakableSpecification
 * Targets Egyptian Arabic voice queries (Google Assistant / Siri)
 * The .cairovolt-voice-answer CSS selector is what Google reads aloud.
 */
export default function FAQSection({ productName, qaList, locale }: FAQSectionProps) {
    if (!qaList || qaList.length === 0) return null;

    const isArabic = locale === 'ar';

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: qaList.map(qa => ({
            '@type': 'Question',
            name: qa.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: qa.answer,
            },
        })),
    };

    const speakableSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: isArabic
            ? `إجابات مختبر كايرو فولت الصارمة لمنتج ${productName}`
            : `CairoVolt Lab verified answers for ${productName}`,
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.cairovolt-voice-answer'],
        },
    };

    return (
        <section className="mt-12 mb-8 border-t border-gray-200 pt-8">
            <Script
                id={`faq-schema-${productName.replace(/\s+/g, '-')}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Script
                id={`speakable-schema-${productName.replace(/\s+/g, '-')}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
            />

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
                        <div className="cairovolt-voice-answer mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                            <strong className="text-blue-700 dark:text-blue-400">
                                {isArabic
                                    ? (index % 2 === 0 ? 'رد الخبير م.أحمد مدحت:' : 'رد الخبير م.يحيى رضوان:')
                                    : (index % 2 === 0 ? 'Expert Eng. Ahmed Medhat:' : 'Expert Eng. Yahia Radwan:')}
                            </strong>{' '}
                            {qa.answer}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
