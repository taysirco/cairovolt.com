'use client';

import { useState } from 'react';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';
import ReviewComposer from '@/components/reviews/ReviewComposer';

export interface Review {
    id: string;
    customerName: string;
    rating: number;
    title?: string;
    reviewText: string;
    pros?: string[];
    cons?: string[];
    images?: string[];   // صور العميل — مضغوطة، تُعرض مصغّرات كسولة
    reviewDate: string;
    governorate: string;
    isVerified: boolean;
    helpfulCount: number;
}

export interface AggregateRating {
    ratingValue: string;
    reviewCount: number;
}

interface VerifiedReviewsProps {
    locale: string;
    // Server-fetched, purchase-verified data (same source as the JSON-LD),
    // passed down so review text is present in the server-rendered HTML and
    // no duplicate /api/reviews fetch is needed.
    initialReviews: Review[];
    initialAggregateRating: AggregateRating | null;
    // ⭐ النظام المبسّط: كاتب التقييم يعيش على صفحة المنتج نفسها
    productSlug?: string;
    productName?: string;
}

export default function VerifiedReviews({ locale, initialReviews, initialAggregateRating, productSlug, productName }: VerifiedReviewsProps) {
    const isArabic = locale === 'ar';
    const localizeReviewText = (text: string) => isArabic
        ? localizeArabicBrandNames(text)
        : text;
    const reviews = initialReviews;
    const aggregateRating = initialAggregateRating;
    const PAGE_SIZE = 10;
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    // اعرض 10 أولاً؛ «عرض المزيد» يكشف 10 إضافية في كل نقرة.
    const displayedReviews = reviews.slice(0, visibleCount);
    const remaining = Math.max(0, reviews.length - visibleCount);

    const renderStars = (rating: number) => {
        return (
            <div className="stars">
                {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={`star ${star <= rating ? 'star--filled' : ''}`}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    // No reviews yet - show placeholder
    if (reviews.length === 0) {
        return (
            <div className="verified-reviews verified-reviews--empty">
                <h3 className="section-title">
                    {isArabic ? <><SvgIcon name="pencil" className="w-5 h-5 inline-block" /> تقييمات العملاء</> : <><SvgIcon name="pencil" className="w-5 h-5 inline-block" /> Customer Reviews</>}
                </h3>
                <div className="empty-state">
                    <div className="empty-state__icon"><SvgIcon name="chat" className="w-12 h-12 mx-auto" /></div>
                    <p className="empty-state__text">
                        {isArabic
                            ? 'لا توجد تقييمات بعد. اشترِ الآن وشاركنا رأيك!'
                            : 'No reviews yet. Buy now and share your experience!'}
                    </p>
                </div>
                {productSlug && (
                    <ReviewComposer productSlug={productSlug} productName={productName || ''} locale={locale} />
                )}
            </div>
        );
    }

    return (
        <div className="verified-reviews">
            <h3 className="section-title">
                {isArabic ? <><SvgIcon name="pencil" className="w-5 h-5 inline-block" /> تقييمات العملاء الموثقة</> : <><SvgIcon name="pencil" className="w-5 h-5 inline-block" /> Verified Customer Reviews</>}
            </h3>
            <p className="review-disclosure">
                {isArabic
                    ? 'تُراجَع كل التقييمات قبل النشر للتأكد من مصداقيتها — نعرض المدح والنقد بشفافية. وقد يحصل بعض المشترين الموثَّقين على كوبون خصم 5% مقابل تقييم صادق، أياً كان رأيهم.'
                    : 'All reviews are moderated for authenticity before publishing — we show praise and criticism transparently. Some verified buyers may receive a 5% coupon for leaving an honest review, regardless of their opinion.'}
            </p>

            {/* ⭐ اكتب تقييمك — تسجيل جوجل + صور مضغوطة + هدية 5% بعد الموافقة */}
            {productSlug && (
                <ReviewComposer productSlug={productSlug} productName={productName || ''} locale={locale} />
            )}

            {/* Aggregate Rating */}
            {aggregateRating && (
                <div className="aggregate-rating">
                    <div className="aggregate-rating__score">
                        {aggregateRating.ratingValue}
                    </div>
                    <div className="aggregate-rating__details">
                        {renderStars(parseFloat(aggregateRating.ratingValue))}
                        <span className="aggregate-rating__count">
                            {isArabic
                                ? `من ${aggregateRating.reviewCount} تقييم`
                                : `from ${aggregateRating.reviewCount} reviews`}
                        </span>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            <div className="reviews-list">
                {displayedReviews.map(review => (
                    <div key={review.id} className="review-card">
                        <div className="review-header">
                            <div className="review-author">
                                <span className="review-avatar" aria-hidden="true">
                                    {(review.customerName || '★').trim().slice(0, 2)}
                                </span>
                                <div className="review-author__meta">
                                    <span className="review-author__name">
                                        {review.customerName}
                                        {review.isVerified && (
                                            <span className="verified-badge">
                                                ✓ {isArabic ? 'مشتري موثق' : 'Verified purchase'}
                                            </span>
                                        )}
                                    </span>
                                    <div className="review-meta">
                                        {renderStars(review.rating)}
                                        <span className="review-date">
                                            {new Date(review.reviewDate).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {review.title && (
                            <h4 className="review-title">{localizeReviewText(review.title)}</h4>
                        )}

                        <p className="review-text">{localizeReviewText(review.reviewText)}</p>

                        {/* 📷 صور العميل — مصغّرات كسولة لا تُثقل الصفحة، النقر يفتح الأصل */}
                        {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {review.images.map((src, i) => (
                                    <a key={i} href={src} target="_blank" rel="noopener nofollow">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={src} alt={isArabic ? 'صورة من العميل' : 'Customer photo'}
                                            loading="lazy" decoding="async" width={80} height={80}
                                            className="h-20 w-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700" />
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* Pros & Cons */}
                        <div className="review-pros-cons">
                            {review.pros && review.pros.length > 0 && (
                                <div className="pros">
                                    <span className="label"><SvgIcon name="check-circle" className="w-4 h-4 inline-block text-green-500" /></span>
                                    <ul>
                                        {review.pros.map((pro, i) => (
                                            <li key={i}>{localizeReviewText(pro)}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {review.cons && review.cons.length > 0 && (
                                <div className="cons">
                                    <span className="label"><SvgIcon name="x-circle" className="w-4 h-4 inline-block text-red-500" /></span>
                                    <ul>
                                        {review.cons.map((con, i) => (
                                            <li key={i}>{localizeReviewText(con)}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {review.governorate && (
                            <div className="review-location">
                                <SvgIcon name="pin" className="w-4 h-4 inline-block" /> {review.governorate}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* عرض المزيد — 10 إضافية في كل نقرة */}
            {remaining > 0 && (
                <button className="btn-show-more" onClick={() => setVisibleCount(c => c + PAGE_SIZE)}>
                    {isArabic
                        ? `عرض المزيد (${Math.min(PAGE_SIZE, remaining)} من ${remaining})`
                        : `Show more (${Math.min(PAGE_SIZE, remaining)} of ${remaining})`}
                </button>
            )}
            {visibleCount > PAGE_SIZE && (
                <button className="btn-show-less" onClick={() => setVisibleCount(PAGE_SIZE)}>
                    {isArabic ? 'عرض أقل ↑' : 'Show less ↑'}
                </button>
            )}

        </div>
    );
}
