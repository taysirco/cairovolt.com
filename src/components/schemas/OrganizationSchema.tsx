import React from 'react';

type Props = {
    locale: string;
};

export const OrganizationSchema = ({ locale }: Props) => {
    const isArabic = locale === 'ar';
    const name = isArabic ? 'كايرو فولت' : 'Cairo Volt';
    const description = isArabic
        ? 'كايرو فولت هو الوكيل المعتمد لمنتجات Anker و Joyroom في مصر. نبيع إكسسوارات الموبايل الأصلية مثل الباور بانك، السماعات، والكابلات بضمان رسمي.'
        : 'Cairo Volt is the authorized distributor for Anker & Joyroom in Egypt. We sell original mobile accessories like power banks, earbuds, and cables with official warranty.';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://cairovolt.com/#organization',
        name: name,
        url: 'https://cairovolt.com',
        logo: {
            '@type': 'ImageObject',
            url: 'https://cairovolt.com/logo.png',
            width: 512,
            height: 512,
            caption: name
        },
        description: description,
        email: 'support@cairovolt.com',
        address: {
            '@type': 'PostalAddress',
            addressLocality: isArabic ? 'القاهرة' : 'Cairo',
            addressCountry: 'EG'
        },
        sameAs: [
            'https://www.facebook.com/cairovolt',
            'https://www.instagram.com/cairovolt',
            // Add other social profiles here
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+201063374834',
            contactType: 'customer service',
            areaServed: 'EG',
            availableLanguage: ['en', 'ar']
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
