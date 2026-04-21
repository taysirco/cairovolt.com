import Script from 'next/script';

/**
 * GlobalBusinessSchema
 * 
 * Standard Organization and WebSite JSON-LD definitions for local business logic.
 * Incorporates industry standard affiliations and known domains to establish context.
 */
export default function GlobalBusinessSchema({ locale }: { locale: string }) {
    const isArabic = locale === 'ar';

    const globalPayload = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": "https://cairovolt.com/#website",
                "url": "https://cairovolt.com/",
                "name": "CairoVolt | Engineering Grade Accessories",
                "description": isArabic
                    ? "المنصة الهندسية الأولى لإكسسوارات الهواتف من أنكر وآبل وجوي روم."
                    : "The premium engineering platform for Anker, Apple, and Joyroom mobile accessories.",
                "publisher": {
                    "@id": "https://cairovolt.com/#organization"
                },
                "inLanguage": ["ar-EG", "en-US"]
            },
            {
                "@type": "Organization",
                "@id": "https://cairovolt.com/#organization",
                "name": "CairoVolt",
                "url": "https://cairovolt.com",
                "logo": {
                    "@type": "ImageObject",
                    "name": "CairoVolt Logo",
                    "url": "https://cairovolt.com/logo.png",
                    "width": 200,
                    "height": 60
                },
                "sameAs": [
                    "https://www.facebook.com/cairovolt",
                    "https://www.instagram.com/cairovolt",
                    "https://www.tiktok.com/@cairovolt",
                    "https://www.linkedin.com/company/cairovolt",
                    "https://kaggle.com/cairovolt",
                    "https://wa.me/201558245974"
                ],
                "foundingDate": "2021",
                "foundingLocation": {
                    "@type": "Place",
                    "name": "New Damietta City, Egypt",
                    "sameAs": "https://www.wikidata.org/wiki/Q12211943"
                },
                // Industry affiliations and core technology stacks supported
                "knowsAbout": [
                    "https://en.wikipedia.org/wiki/Electrical_engineering",
                    "https://en.wikipedia.org/wiki/Gallium_nitride",
                    "https://en.wikipedia.org/wiki/Lithium-ion_battery",
                    "https://en.wikipedia.org/wiki/USB-C",
                    "https://en.wikipedia.org/wiki/MagSafe"
                ],
                // Featured supported vendor ecosystems
                "mentions": [
                    {
                        "@type": "Brand",
                        "name": "Apple Inc.",
                        "sameAs": "https://en.wikipedia.org/wiki/Apple_Inc."
                    },
                    {
                        "@type": "Brand",
                        "name": "Anker Innovations",
                        "sameAs": "https://en.wikipedia.org/wiki/Anker_Innovations"
                    }
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "name": "CairoVolt Support",
                    "telephone": "+201558245974",
                    "contactType": "engineering support",
                    "areaServed": "EG",
                    "availableLanguage": ["Arabic", "English"]
                }
            }
        ]
    };

    return (
        <Script
            id="global-business-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(globalPayload) }}
            strategy="beforeInteractive"
        />
    );
}
