/**
 * SpeakableSpecification for voice / assistant answer extraction.
 * Only attach cssSelectors that match visible on-page content.
 *
 * The node is the page's WebPage. Callers that know the page's primary entity
 * can connect it to the graph: `name`, `mainEntityId` (e.g. the Product
 * `…#product` @id) and `isPartOfId` (the site's `…/#website`). All three are
 * optional, and a caller that passes none gets exactly the previous output.
 */
interface SpeakableSchemaProps {
    cssSelectors: string[];
    locale: string;
    url?: string;
    /** WebPage.name — usually the page's visible title / entity name. */
    name?: string;
    /** @id of the entity the page is about (WebPage.mainEntity). */
    mainEntityId?: string;
    /** @id of the WebSite this page belongs to (WebPage.isPartOf). */
    isPartOfId?: string;
}

export function SpeakableSchema({ cssSelectors, locale, url, name, mainEntityId, isPartOfId }: SpeakableSchemaProps) {
    const selectors = cssSelectors.map(s => s.trim()).filter(Boolean);
    if (!selectors.length) return null;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        inLanguage: locale === 'ar' ? 'ar-EG' : 'en-EG',
        ...(url ? { '@id': url, url } : {}),
        ...(name ? { name } : {}),
        ...(isPartOfId ? { isPartOf: { '@id': isPartOfId } } : {}),
        ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
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
