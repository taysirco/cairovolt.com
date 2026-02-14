'use client';

import ReviewForm from './ReviewForm';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface TokenData {
    productName: string;
    productSlug: string;
    customerName: string;
    purchaseDate: string;
}

interface ReviewPageClientProps {
    locale: string;
    token: string;
    tokenData: TokenData | null;
}

export default function ReviewPageClient({ locale, token, tokenData }: ReviewPageClientProps) {
    const isArabic = locale === 'ar';

    if (!tokenData) {
        return (
            <div className="review-page review-page--error" dir={isArabic ? 'rtl' : 'ltr'}>
                <div className="review-container">
                    <div className="review-error">
                        <div className="review-error__icon"><SvgIcon name="x-circle" className="w-16 h-16 text-red-500 mx-auto" /></div>
                        <h1 className="review-error__title">
                            {isArabic ? 'رابط غير صالح' : 'Invalid Link'}
                        </h1>
                        <p className="review-error__message">
                            {isArabic
                                ? 'عذراً، هذا الرابط غير صالح أو منتهي الصلاحية. إذا كنت ترغب في إضافة تقييم، يرجى التواصل معنا.'
                                : 'Sorry, this link is invalid or expired. If you would like to add a review, please contact us.'}
                        </p>
                        <a href={`/${locale}`} className="review-error__link">
                            {isArabic ? '← العودة للرئيسية' : '← Back to Home'}
                        </a>
                    </div>
                </div>

                <style jsx>{`
                    .review-page--error {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                        padding: 20px;
                    }
                    .review-container {
                        max-width: 500px;
                        width: 100%;
                    }
                    .review-error {
                        background: rgba(255, 255, 255, 0.05);
                        backdrop-filter: blur(10px);
                        border-radius: 20px;
                        padding: 40px;
                        text-align: center;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .review-error__icon {
                        font-size: 64px;
                        margin-bottom: 20px;
                    }
                    .review-error__title {
                        color: #fff;
                        font-size: 24px;
                        margin-bottom: 16px;
                    }
                    .review-error__message {
                        color: rgba(255, 255, 255, 0.7);
                        font-size: 16px;
                        line-height: 1.6;
                        margin-bottom: 24px;
                    }
                    .review-error__link {
                        display: inline-block;
                        color: #3b82f6;
                        text-decoration: none;
                        font-weight: 500;
                    }
                    .review-error__link:hover {
                        text-decoration: underline;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="review-page" dir={isArabic ? 'rtl' : 'ltr'}>
            <div className="review-container">
                {/* Header */}
                <div className="review-header">
                    <div className="review-header__logo">
                        <span className="review-header__logo-icon"><SvgIcon name="bolt" className="w-8 h-8 text-yellow-400" /></span>
                        <span className="review-header__logo-text">CairoVolt</span>
                    </div>
                    <h1 className="review-header__title">
                        {isArabic ? 'شاركنا رأيك' : 'Share Your Feedback'}
                    </h1>
                    <p className="review-header__subtitle">
                        {isArabic
                            ? `كيف كانت تجربتك مع ${tokenData.productName}؟`
                            : `How was your experience with ${tokenData.productName}?`}
                    </p>
                </div>

                {/* Product Info */}
                <div className="review-product">
                    <div className="review-product__badge">
                        <span className="review-product__badge-icon">✓</span>
                        {isArabic ? 'مشتري موثق' : 'Verified Buyer'}
                    </div>
                    <div className="review-product__name">{tokenData.productName}</div>
                    <div className="review-product__date">
                        {isArabic ? 'تاريخ الشراء: ' : 'Purchase Date: '}
                        {new Date(tokenData.purchaseDate).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')}
                    </div>
                </div>

                {/* Review Form */}
                <ReviewForm
                    token={token}
                    productName={tokenData.productName}
                    customerName={tokenData.customerName}
                    locale={locale}
                />
            </div>

            <style jsx>{`
                .review-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    padding: 40px 20px;
                }
                .review-container {
                    max-width: 600px;
                    margin: 0 auto;
                }
                .review-header {
                    text-align: center;
                    margin-bottom: 32px;
                }
                .review-header__logo {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 24px;
                }
                .review-header__logo-icon {
                    font-size: 32px;
                }
                .review-header__logo-text {
                    font-size: 24px;
                    font-weight: 700;
                    color: #fff;
                }
                .review-header__title {
                    color: #fff;
                    font-size: 28px;
                    margin-bottom: 12px;
                }
                .review-header__subtitle {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 16px;
                }
                .review-product {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    text-align: center;
                }
                .review-product__badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(34, 197, 94, 0.2);
                    color: #22c55e;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 14px;
                    margin-bottom: 12px;
                }
                .review-product__badge-icon {
                    font-weight: bold;
                }
                .review-product__name {
                    color: #fff;
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 8px;
                }
                .review-product__date {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 14px;
                }
            `}</style>
        </div>
    );
}
