import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
import { governorates } from '@/data/governorates';
import { buildBrandSchemaNodes } from '@/lib/brand-entities';
import {
    STANDARD_DELIVERY_MAX_DAYS,
    STANDARD_DELIVERY_MIN_DAYS,
    STANDARD_RETURN_WINDOW_DAYS,
    STANDARD_SHIPPING_MAX_EGP,
    STANDARD_SHIPPING_MIN_EGP,
} from '@/lib/merchant-product-data';

/** Site-wide WebSite and OnlineStore structured data. */
export default function GlobalBusinessSchema({ locale }: { locale: string }) {
    const isArabic = locale === 'ar';
    const policyPrefix = isArabic ? '' : '/en';
    // Wikidata-linked Brand nodes. Emitted once per page in the site-wide graph
    // so product, category, and brand pages can all reference them by @id.
    const brandSchemaNodes = buildBrandSchemaNodes(locale);

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
                    ? 'متجر إكسسوارات موبايل وصوتيات في مصر — انكر وجوي روم وساوندكور وJBL مع مواصفات واضحة وسياسات ضمان مكتوبة.'
                    : 'Mobile accessories and audio store in Egypt — Anker, Joyroom, Soundcore, and JBL products with clear specifications and written warranty policies.',
                publisher: { '@id': 'https://cairovolt.com/#organization' },
                inLanguage: ['ar-EG', 'en-EG'],
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
                '@type': 'OnlineStore',
                '@id': 'https://cairovolt.com/#organization',
                name: 'CairoVolt',
                // Keep in sync with /api/knowledge-graph, which mirrors this node.
                alternateName: ['كايرو فولت', 'Cairo Volt'],
                legalName: 'شركة تيسير للاستثمار الذكي (ش.ذ.م.م)',
                taxID: '777471566',
                identifier: {
                    '@type': 'PropertyValue',
                    propertyID: isArabic ? 'السجل التجاري (مصر)' : 'Commercial Register (Egypt)',
                    value: '8446',
                },
                url: 'https://cairovolt.com',
                description: isArabic
                    ? 'كايرو فولت بائع تجزئة إلكتروني مستقل لإكسسوارات الموبايل والصوتيات ومنتجات انكر وجوي روم وساوندكور وJBL، مع مواصفات وأسعار وسياسات مكتوبة وخدمة توصيل داخل مصر.'
                    : 'CairoVolt is an independent online retailer of mobile accessories, audio gear, and Anker, Joyroom, Soundcore, and JBL products, with published specifications, prices, policies, and delivery within Egypt.',
                // Topical scope of the store, stated as entities rather than
                // keywords. This is what an entity resolver reads to decide
                // which subject area the organization is an authority in.
                //
                // The three core topics carry a Thing + Wikidata sameAs so the
                // resolver lands on an unambiguous entity (verified IDs:
                // Q2208745 power bank, Q20026619 USB-C, Q56120131 USB Power
                // Delivery). The rest stay plain text: no verified item maps
                // cleanly to them, and an approximate ID is worse than none.
                // Keep in sync with /api/knowledge-graph, which mirrors this node.
                knowsAbout: isArabic
                    ? [
                        { '@type': 'Thing', name: 'باور بانك', sameAs: 'https://www.wikidata.org/wiki/Q2208745' },
                        { '@type': 'Thing', name: 'شواحن USB-C', sameAs: 'https://www.wikidata.org/wiki/Q20026619' },
                        { '@type': 'Thing', name: 'شحن سريع Power Delivery', sameAs: 'https://www.wikidata.org/wiki/Q56120131' },
                        'كابلات شحن',
                        'سماعات لاسلكية',
                        'مكبرات صوت بلوتوث',
                        'سماعات رأس',
                        'إكسسوارات الموبايل في مصر',
                    ]
                    : [
                        { '@type': 'Thing', name: 'Power banks', sameAs: 'https://www.wikidata.org/wiki/Q2208745' },
                        { '@type': 'Thing', name: 'USB-C chargers', sameAs: 'https://www.wikidata.org/wiki/Q20026619' },
                        { '@type': 'Thing', name: 'USB Power Delivery fast charging', sameAs: 'https://www.wikidata.org/wiki/Q56120131' },
                        'Charging cables',
                        'Wireless earbuds',
                        'Bluetooth speakers',
                        'Headphones',
                        'Mobile accessories in Egypt',
                    ],
                // NOTE — deliberately NOT set on this node:
                // • `brand`: schema.org defines it as brands *maintained by* the
                //   organization. CairoVolt resells Anker/Soundcore/Joyroom and
                //   states plainly that it is not their agent or distributor, so
                //   claiming them here would contradict that disclosure. The
                //   Brand entities live as standalone nodes in this @graph and
                //   are referenced from each Product.brand instead.
                // • `currenciesAccepted` / `paymentAccepted`: LocalBusiness-only
                //   properties; OnlineStore descends from Organization. Currency
                //   and COD are stated where they validate — Offer.priceCurrency
                //   and Offer.acceptedPaymentMethod on each product page.
                logo: {
                    '@type': 'ImageObject',
                    '@id': 'https://cairovolt.com/logo.png#image',
                    url: 'https://cairovolt.com/logo.png',
                    contentUrl: 'https://cairovolt.com/logo.png',
                    width: 1024,
                    height: 1024,
                    caption: 'CairoVolt',
                    creator: { '@id': 'https://cairovolt.com/#organization' },
                    copyrightHolder: { '@id': 'https://cairovolt.com/#organization' },
                    creditText: 'CairoVolt',
                    copyrightNotice: '© 2026 CairoVolt.com',
                    license: 'https://cairovolt.com/terms#image-license',
                    acquireLicensePage: 'https://cairovolt.com/contact',
                },
                email: 'info@cairovolt.com',
                // Locality-level HQ address — matches the published legal identity
                // on /contact ('based in New Damietta') and the Merchant Center
                // business-info address. No street-level detail is published.
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: isArabic ? 'دمياط الجديدة' : 'New Damietta',
                    addressRegion: isArabic ? 'دمياط' : 'Damietta',
                    addressCountry: 'EG',
                },
                // Org-level service area (the ContactPoint areaServed below only
                // scopes the phone line). Matches Offer.eligibleRegion on PDPs.
                // The Country node stays first as the coarse claim; the
                // AdministrativeArea list is the same governorate set the
                // /locations pages already publish a delivery estimate for, so
                // "do you deliver to Assiut?" is answerable from the org node
                // itself instead of requiring a crawl to a location page.
                areaServed: [
                    { '@type': 'Country', name: 'Egypt' },
                    ...governorates.map(gov => ({
                        '@type': 'AdministrativeArea',
                        name: isArabic ? gov.nameAr : gov.nameEn,
                        containedInPlace: { '@type': 'Country', name: 'Egypt' },
                    })),
                ],
                sameAs: [
                    'https://www.facebook.com/cairovolt',
                    'https://www.instagram.com/cairovolt',
                    'https://www.tiktok.com/@cairovolt',
                    'https://x.com/cairovolt',
                    'https://www.youtube.com/@cairovolt',
                ],
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+201558245974',
                    contactType: 'customer service',
                    areaServed: 'EG',
                    availableLanguage: ['ar', 'en'],
                    // The published support hours on /about and /contact
                    // ("Daily 10 AM - 10 PM" / "يومياً من 10 صباحاً - 10 مساءً").
                    hoursAvailable: {
                        '@type': 'OpeningHoursSpecification',
                        dayOfWeek: [
                            'https://schema.org/Monday',
                            'https://schema.org/Tuesday',
                            'https://schema.org/Wednesday',
                            'https://schema.org/Thursday',
                            'https://schema.org/Friday',
                            'https://schema.org/Saturday',
                            'https://schema.org/Sunday',
                        ],
                        opens: '10:00',
                        closes: '22:00',
                    },
                },
                hasShippingService: {
                    '@type': 'ShippingService',
                    '@id': 'https://cairovolt.com/#shipping-egypt',
                    name: isArabic ? 'التوصيل القياسي داخل مصر' : 'Standard delivery within Egypt',
                    description: isArabic
                        ? `رسوم التوصيل من ${STANDARD_SHIPPING_MIN_EGP} إلى ${STANDARD_SHIPPING_MAX_EGP} جنيه حسب المحافظة للطلبات الأقل من ${FREE_SHIPPING_THRESHOLD} جنيه، وشحن مجاني من ${FREE_SHIPPING_THRESHOLD} جنيه.`
                        : `Delivery costs ${STANDARD_SHIPPING_MIN_EGP}-${STANDARD_SHIPPING_MAX_EGP} EGP by governorate for orders under ${FREE_SHIPPING_THRESHOLD} EGP and is free from ${FREE_SHIPPING_THRESHOLD} EGP.`,
                    fulfillmentType: 'https://schema.org/FulfillmentTypeDelivery',
                    shippingConditions: [
                        {
                            '@type': 'ShippingConditions',
                            shippingDestination: {
                                '@type': 'DefinedRegion',
                                addressCountry: 'EG',
                            },
                            orderValue: {
                                '@type': 'MonetaryAmount',
                                minValue: 0,
                                maxValue: FREE_SHIPPING_THRESHOLD - 0.01,
                                currency: 'EGP',
                            },
                            shippingRate: {
                                '@type': 'MonetaryAmount',
                                minValue: STANDARD_SHIPPING_MIN_EGP,
                                maxValue: STANDARD_SHIPPING_MAX_EGP,
                                currency: 'EGP',
                            },
                            transitTime: {
                                '@type': 'ServicePeriod',
                                duration: {
                                    '@type': 'QuantitativeValue',
                                    minValue: STANDARD_DELIVERY_MIN_DAYS,
                                    maxValue: STANDARD_DELIVERY_MAX_DAYS,
                                    unitCode: 'DAY',
                                },
                            },
                        },
                        {
                            '@type': 'ShippingConditions',
                            shippingDestination: {
                                '@type': 'DefinedRegion',
                                addressCountry: 'EG',
                            },
                            orderValue: {
                                '@type': 'MonetaryAmount',
                                minValue: FREE_SHIPPING_THRESHOLD,
                                currency: 'EGP',
                            },
                            shippingRate: {
                                '@type': 'MonetaryAmount',
                                value: 0,
                                currency: 'EGP',
                            },
                            transitTime: {
                                '@type': 'ServicePeriod',
                                duration: {
                                    '@type': 'QuantitativeValue',
                                    minValue: STANDARD_DELIVERY_MIN_DAYS,
                                    maxValue: STANDARD_DELIVERY_MAX_DAYS,
                                    unitCode: 'DAY',
                                },
                            },
                        },
                    ],
                },
                hasMerchantReturnPolicy: {
                    '@type': 'MerchantReturnPolicy',
                    '@id': 'https://cairovolt.com/#return-policy',
                    applicableCountry: 'EG',
                    returnPolicyCountry: 'EG',
                    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                    merchantReturnDays: STANDARD_RETURN_WINDOW_DAYS,
                    itemCondition: 'https://schema.org/NewCondition',
                    returnMethod: 'https://schema.org/ReturnByMail',
                    // Same field set as Offer.hasMerchantReturnPolicy on every
                    // product page. The generic `returnFees` is omitted on
                    // purpose: next to the two specific fee properties it read
                    // as "the customer always pays", which contradicts the
                    // visible policy (CairoVolt covers return shipping when a
                    // defect or an order error is confirmed). A FullRefund
                    // refund type is omitted too: the policy says original
                    // shipping fees are non-refundable on remorse returns.
                    customerRemorseReturnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
                    itemDefectReturnFees: 'https://schema.org/FreeReturn',
                    merchantReturnLink: `https://cairovolt.com${policyPrefix}/return-policy`,
                },
            },
            ...brandSchemaNodes,
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
