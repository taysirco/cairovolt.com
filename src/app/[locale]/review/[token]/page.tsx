import { Metadata } from 'next';
import { validateReviewToken } from '@/lib/verified-reviews';
import ReviewPageClient from './ReviewPageClient';

type Props = {
    params: Promise<{ locale: string; token: string }>;
};

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
                productName: tokenData.productName,
                productSlug: tokenData.productSlug,
                customerName: tokenData.customerName,
                purchaseDate: tokenData.purchaseDate.toISOString()
            } : null}
        />
    );
}
