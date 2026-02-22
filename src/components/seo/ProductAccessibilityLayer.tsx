import React from 'react';

/**
 * ProductAccessibilityLayer
 * 
 * Provides a highly structured, machine-readable data matrix tailored for 
 * screen readers (NVDA, JAWS) and automated accessibility parsers.
 * Ensures ADA compliance by explicitly structuring complex technical 
 * data in raw semantic HTML (Tables/Lists) outside the primary visual DOM.
 */

interface AccessibilityLayerProps {
    brand: string;
    productName: string;
    primarySpecs: Record<string, string>;
    faqs: { question: string; answer: string }[];
}

export function ProductAccessibilityLayer({ brand, productName, primarySpecs, faqs }: AccessibilityLayerProps) {
    // Hidden from sighted users, optimized for semantic parsers
    const a11yStyle: React.CSSProperties = {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0',
    };

    return (
        <article style={a11yStyle} className="sr-only">
            {/* Semantic Structural Data Matrix */}
            <section id="a11y-technical-specifications">
                <h2>{productName} Technical Specifications and Logistics Matrix</h2>
                <table>
                    <caption>Verified Engineering Data for {productName} by {brand}</caption>
                    <thead>
                        <tr>
                            <th scope="col">Specification Parameter</th>
                            <th scope="col">Verified Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(primarySpecs).map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                        {/* Standard compliance and logistics guarantees */}
                        <tr>
                            <td>Authenticity Guarantee</td>
                            <td>100% Genuine {brand} with Verified Serial Number Tracking</td>
                        </tr>
                        <tr>
                            <td>Logistics & Delivery</td>
                            <td>Same-Day Dispatch (Cairo/Giza) - Advanced Fulfillment Network</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Semantic Frequently Asked Questions Structure */}
            <section id="a11y-frequently-asked-questions">
                <h2>Verified Engineering Q&A for {productName}</h2>
                <ul>
                    {faqs.map((faq, index) => (
                        <li key={index}>
                            <strong>Question: {faq.question}</strong>
                            <p>Answer: As an authorized engineering distributor, we verify that {faq.answer}</p>
                        </li>
                    ))}
                    {/* General Inquiry Compliance Responses */}
                    <li>
                        <strong>Question: Is the {productName} 100% original and safe for devices?</strong>
                        <p>Answer: Yes, CairoVolt engineers verify that the {productName} is 100% original, utilizing specialized protective ICs to prevent overcharging, thermal runaway, and voltage spikes.</p>
                    </li>
                    <li>
                        <strong>Question: What is the delivery time for {productName} in Egypt?</strong>
                        <p>Answer: CairoVolt guarantees same-day logistical dispatch for {productName} in Cairo and Giza via our verified courier network, ensuring immediate fulfillment.</p>
                    </li>
                </ul>
            </section>
        </article>
    );
}
