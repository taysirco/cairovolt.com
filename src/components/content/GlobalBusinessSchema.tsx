import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
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
                    ? 'متجر إكسسوارات موبايل في مصر — انكر وجوي روم مع مواصفات واضحة وسياسات ضمان مكتوبة.'
                    : 'Mobile accessories store in Egypt — Anker and Joyroom products with clear specifications and written warranty policies.',
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
                    ? 'كايرو فولت بائع تجزئة إلكتروني مستقل لإكسسوارات الموبايل ومنتجات انكر وجوي روم، مع مواصفات وأسعار وسياسات مكتوبة وخدمة توصيل داخل مصر.'
                    : 'CairoVolt is an independent online retailer of mobile accessories and Anker and Joyroom products, with published specifications, prices, policies, and delivery within Egypt.',
                // Topical scope of the store, stated as entities rather than
                // keywords. This is what an entity resolver reads to decide
                // which subject area the organization is an authority in.
                knowsAbout: isArabic
                    ? [
                        'باور بانك',
                        'شواحن USB-C',
                        'شحن سريع Power Delivery',
                        'كابلات شحن',
                        'سماعات لاسلكية',
                        'إكسسوارات الموبايل في مصر',
                    ]
                    : [
                        'Power banks',
                        'USB-C chargers',
                        'USB Power Delivery fast charging',
                        'Charging cables',
                        'Wireless earbuds',
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
                    url: 'https://cairovolt.com/logo.png',
                    width: 1024,
                    height: 1024,
                    caption: 'CairoVolt',
                    license: 'https://cairovolt.com/terms',
                    acquireLicensePage: 'https://cairovolt.com/contact',
                    creditText: 'CairoVolt',
                    copyrightNotice: 'CairoVolt',
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
                areaServed: {
                    '@type': 'Country',
                    name: 'Egypt',
                },
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
                    returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
                    customerRemorseReturnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
                    itemDefectReturnFees: 'https://schema.org/FreeReturn',
                    refundType: 'https://schema.org/FullRefund',
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
