/**
 * SpeakableSpecification for voice / assistant answer extraction.
 * Only attach cssSelectors that match visible on-page content.
 */
interface SpeakableSchemaProps {
    cssSelectors: string[];
    locale: string;
    url?: string;
}

export function SpeakableSchema({ cssSelectors, locale, url }: SpeakableSchemaProps) {
    const selectors = cssSelectors.map(s => s.trim()).filter(Boolean);
    if (!selectors.length) return null;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        inLanguage: locale === 'ar' ? 'ar-EG' : 'en-EG',
        ...(url ? { '@id': url, url } : {}),
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: selectors,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
