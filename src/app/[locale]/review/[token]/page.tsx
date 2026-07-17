import { Metadata } from 'next';
import {
    getReviewCustomerDisplayName,
    validateReviewToken,
} from '@/lib/verified-reviews';
import ReviewPageClient from './ReviewPageClient';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';

type Props = {
    params: Promise<{ locale: string; token: string }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isArabic = locale === 'ar';

    return {
        title: isArabic ? 'شارك رأيك | كايرو فولت' : 'Share Your Review | CairoVolt',
        description: isArabic
            ? 'شاركنا تجربتك مع منتجاتنا. رأيك يُحدث فرقاً!'
            : 'Share your experience with our products. Your opinion makes a difference!',
        robots: {
            index: false,
            follow: false
        }
    };
}

export default async function ReviewPage({ params }: Props) {
    const { locale, token } = await params;

    // Validate token server-side
    const tokenData = await validateReviewToken(token);

    return (
        <ReviewPageClient
            locale={locale}
            token={token}
            tokenData={tokenData ? {
                productName: locale === 'ar'
                    ? localizeArabicBrandNames(tokenData.productName)
                    : tokenData.productName,
                productSlug: tokenData.productSlug,
                customerName: getReviewCustomerDisplayName(tokenData.customerName),
                purchaseMonth: tokenData.purchaseDate.toISOString().slice(0, 7),
            } : null}
        />
    );
}
