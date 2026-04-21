import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';

export const revalidate = 2592000;

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isArabic = locale === 'ar';

    const title = isArabic ? 'اتصل بنا | كايرو فولت' : 'Contact Us | Cairo Volt';
    const description = isArabic
        ? 'تواصل معنا عبر واتساب أو الهاتف. نحن هنا لمساعدتك في اختيار أفضل إكسسوارات الموبايل من Anker و Joyroom في مصر.'
        : 'Contact us via WhatsApp or phone. We are here to help you choose the best mobile accessories from Anker and Joyroom in Egypt.';

    return {
        title: { absolute: title },
        description,
        alternates: {
            canonical: isArabic
                ? 'https://cairovolt.com/contact'
                : 'https://cairovolt.com/en/contact',
            languages: {
                'ar-EG': 'https://cairovolt.com/contact',
                'en-EG': 'https://cairovolt.com/en/contact',
                'x-default': 'https://cairovolt.com/contact',
            },
        },
        openGraph: {
            title,
            description,
            url: isArabic
                ? 'https://cairovolt.com/contact'
                : 'https://cairovolt.com/en/contact',
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'website',
            siteName: isArabic ? 'كايرو فولت' : 'CairoVolt',
            images: [{
                url: '/og-cover.png',
                width: 1200,
                height: 630,
                alt: isArabic ? 'كايرو فولت - اتصل بنا' : 'CairoVolt - Contact Us',
            }],
        },
        other: {
            'geo.region': 'EG',
            'geo.placename': isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt',
            'geo.position': '30.0444;31.2357',
            'ICBM': '30.0444, 31.2357',
        },
    };
}

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
    const isArabic = locale === 'ar';
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isArabic ? '' : '/en'}` },
                    { name: isArabic ? 'اتصل بنا' : 'Contact Us', url: `https://cairovolt.com${isArabic ? '' : '/en'}/contact` },
                ]}
                locale={locale}
            />
            <ContactPageClient />
        </>
    );
}

