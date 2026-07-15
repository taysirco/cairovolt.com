/**
 * GlobalBusinessSchema — the SINGLE source of truth for the site-wide
 * `#organization` and `#website` JSON-LD nodes.
 *
 * Rendered once in src/app/[locale]/layout.tsx, so every page (products,
 * blog, categories…) that references these nodes by @id resolves them —
 * including `#return-policy`, which ProductSchema offers point to.
 *
 * Rules that keep this valid:
 *  - Plain <script>, NOT next/script: next/script injects after hydration,
 *    making the markup invisible to non-JS crawlers (GPTBot, ClaudeBot,
 *    PerplexityBot). JSON-LD must be in the server-rendered HTML.
 *  - No other component may declare `#organization` or `#website`.
 *    Page-level entities (e.g. `#local-business` on the homepage) link here
 *    via parentOrganization/publisher @id references instead.
 *  - No SearchAction: the site has no /search route, and Google retired
 *    the sitelinks searchbox in 2024.
 */
export default function GlobalBusinessSchema({ locale }: { locale: string }) {
    const isArabic = locale === 'ar';

    const globalPayload = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': 'https://cairovolt.com/#website',
                url: 'https://cairovolt.com/',
                name: 'CairoVolt',
                alternateName: 'كايرو فولت',
                description: isArabic
                    ? 'متجر إكسسوارات الموبايل الأصلية في مصر — انكر وجوي روم بضمان رسمي وبيانات اختبار معملية.'
                    : 'Original mobile accessories store in Egypt — Anker & Joyroom with official warranty and lab test data.',
                publisher: { '@id': 'https://cairovolt.com/#organization' },
                inLanguage: ['ar-EG', 'en-EG'],
                // /search exists as a real route (client-side product search).
                // Google retired the sitelinks searchbox, but SearchAction still
                // tells AI agents & other engines how to query the catalog.
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: `https://cairovolt.com${isArabic ? '' : '/en'}/search?q={search_term_string}`,
                    },
                    'query-input': 'required name=search_term_string',
                },
            },
            {
                '@type': 'Organization',
                '@id': 'https://cairovolt.com/#organization',
                name: 'CairoVolt',
                alternateName: 'كايرو فولت',
                legalName: 'شركة كايرو فولت ذات مسئولية محدودة',
                url: 'https://cairovolt.com',
                description: isArabic
                    ? 'كايرو فولت هو الوكيل المعتمد لمنتجات انكر و Joyroom في مصر. نبيع إكسسوارات الموبايل الأصلية مثل الباور بانك، السماعات، والكابلات بضمان رسمي.'
                    : 'CairoVolt is the authorized distributor for Anker & Joyroom in Egypt. We sell original mobile accessories like power banks, earbuds, and cables with official warranty.',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://cairovolt.com/logo.png',
                    width: 1024,
                    height: 1024,
                    caption: 'CairoVolt',
                },
                email: 'support@cairovolt.com',
                taxID: '777-471-566',
                vatID: '777-471-566',
                iso6523Code: '0188:8446',
                identifier: [
                    {
                        '@type': 'PropertyValue',
                        name: isArabic ? 'رقم التسجيل الضريبي' : 'Tax Registration Number',
                        value: '777-471-566',
                    },
                    {
                        '@type': 'PropertyValue',
                        name: isArabic ? 'رقم السجل التجاري' : 'Commercial Registration Number',
                        value: '8446',
                    },
                ],
                brand: [
                    {
                        '@type': 'Brand',
                        name: 'Anker',
                        sameAs: [
                            'https://en.wikipedia.org/wiki/Anker_(brand)',
                            'https://www.wikidata.org/wiki/Q28452620',
                        ],
                    },
                    {
                        '@type': 'Brand',
                        name: 'Joyroom',
                        sameAs: 'https://www.joyroom.com/',
                    },
                ],
                award: [
                    isArabic ? 'موزع معتمد لمنتجات انكر في مصر' : 'Authorized Distributor for Anker in Egypt',
                    isArabic ? 'موزع معتمد لمنتجات Joyroom في مصر' : 'Authorized Distributor for Joyroom in Egypt',
                ],
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: isArabic ? 'القاهرة' : 'Cairo',
                    addressCountry: 'EG',
                },
                foundingDate: '2021',
                foundingLocation: {
                    '@type': 'Place',
                    name: 'New Damietta City, Egypt',
                    sameAs: 'https://www.wikidata.org/wiki/Q12211943',
                },
                numberOfEmployees: {
                    '@type': 'QuantitativeValue',
                    minValue: 5,
                    maxValue: 25,
                },
                knowsAbout: [
                    'https://en.wikipedia.org/wiki/Electrical_engineering',
                    'https://en.wikipedia.org/wiki/Gallium_nitride',
                    'https://en.wikipedia.org/wiki/Lithium-ion_battery',
                    'https://en.wikipedia.org/wiki/USB-C',
                    'https://en.wikipedia.org/wiki/MagSafe',
                ],
                sameAs: [
                    'https://www.facebook.com/cairovolt',
                    'https://www.instagram.com/cairovolt',
                    'https://www.tiktok.com/@cairovolt',
                    'https://www.linkedin.com/company/cairovolt',
                    'https://kaggle.com/cairovolt',
                    'https://wa.me/201558245974',
                    'https://x.com/cairovolt',
                    'https://www.youtube.com/@cairovolt',
                    // Additional verified official brand profiles (real channels of
                    // this business). sameAs is the correct, penalty-free home for
                    // brand profile ROOTS — never deep article/post URLs.
                    'https://www.twitch.tv/cairovolt_eg',
                    'https://soundcloud.com/cairovolt',
                    'https://github.com/althaqelco',
                    'https://www.tumblr.com/cairovolteg',
                    'https://www.dailymotion.com/CairoVolt_eg',
                    'https://www.deviantart.com/cairovoltart',
                    'https://www.flickr.com/people/204670108@N05/',
                    'https://www.openstreetmap.org/user/CairoVoltEG',
                    'https://archive.org/details/@ahmed_taysir971',
                    'https://gravatar.com/gamesez',
                    'https://vk.com/id211367981',
                ],
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+201558245974',
                    contactType: 'customer service',
                    areaServed: 'EG',
                    availableLanguage: ['ar', 'en'],
                },
                department: [
                    {
                        '@type': 'Organization',
                        name: isArabic ? 'مختبرات كايرو فولت للفحص التقني' : 'CairoVolt Tech & QA Labs',
                        description: isArabic ? 'مركز الفحص التقني وإدارة الخوادم' : 'Technical testing center and server management',
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: 'New Damietta City',
                            addressCountry: 'EG',
                        },
                    },
                    {
                        '@type': 'Organization',
                        name: isArabic ? 'مستودعات كايرو فولت للشحن' : 'CairoVolt Fulfillment Hub',
                        description: isArabic ? 'مستودعات الشحن اللوجستي' : 'Logistics fulfillment warehouses',
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: 'New Cairo 3',
                            addressCountry: 'EG',
                        },
                    },
                ],
                // Organization-level return policy. Product offers reference it
                // via @id — defining it here (layout level) means the reference
                // resolves on EVERY page, not just the homepage.
                hasMerchantReturnPolicy: {
                    '@type': 'MerchantReturnPolicy',
                    '@id': 'https://cairovolt.com/#return-policy',
                    applicableCountry: 'EG',
                    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                    merchantReturnDays: 14,
                    returnMethod: 'https://schema.org/ReturnByMail',
                    returnFees: 'https://schema.org/FreeReturn',
                    refundType: 'https://schema.org/FullRefund',
                    url: `https://cairovolt.com${isArabic ? '' : '/en'}/return-policy`,
                },
                // NOTE: We intentionally do NOT list the independent reviewers from
                // /team as Organization `member`. They are creators we recommend, not
                // CairoVolt staff. Claiming them as members would be a false employment
                // signal. If/when real employees are added, list them here.
            },
        ],
    };

    return (
        <script
            id="global-business-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(globalPayload) }}
        />
    );
}
