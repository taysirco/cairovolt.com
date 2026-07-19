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
                <style jsx>{`
                    .verified-reviews--empty {
                        padding: 32px;
                        background: #f8fafc;
                        border-radius: 16px;
                        margin-top: 32px;
                    }
                    .section-title {
                        font-size: 20px;
                        margin-bottom: 24px;
                        color: #1f2937;
                    }
                    .empty-state {
                        text-align: center;
                        padding: 40px 20px;
                    }
                    .empty-state__icon {
                        font-size: 48px;
                        margin-bottom: 16px;
                    }
                    .empty-state__text {
                        color: #6b7280;
                        font-size: 16px;
                    }
                `}</style>
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
                    ? 'تُراجَع كل التقييمات قبل النشر — نعرض المدح والنقد بشفافية.'
                    : 'All reviews are moderated before publishing — we show praise and criticism transparently.'}
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

            <style jsx>{`
                .verified-reviews {
                    margin-top: 48px;
                    padding: 28px;
                    background: #f8fafc;
                    border-radius: 20px;
                }
                :global(.dark) .verified-reviews {
                    background: #0f172a;
                }
                .section-title {
                    font-size: 22px;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 8px;
                }
                :global(.dark) .section-title { color: #f1f5f9; }
                .review-disclosure {
                    max-width: 760px;
                    color: #64748b;
                    font-size: 13px;
                    line-height: 1.7;
                    margin: 0 0 24px;
                }
                :global(.dark) .review-disclosure { color: #94a3b8; }
                .aggregate-rating {
                    display: flex;
                    align-items: center;
                    gap: 18px;
                    padding: 20px 24px;
                    background: #fff;
                    border: 1px solid #eef2f7;
                    border-radius: 16px;
                    margin-bottom: 24px;
                    box-shadow: 0 1px 3px rgba(16,24,40,0.06);
                }
                :global(.dark) .aggregate-rating {
                    background: #1e293b;
                    border-color: #334155;
                }
                .aggregate-rating__score {
                    font-size: 46px;
                    font-weight: 800;
                    line-height: 1;
                    color: #f59e0b;
                }
                .aggregate-rating__count {
                    color: #6b7280;
                    font-size: 14px;
                    margin-top: 6px;
                    display: block;
                }
                :global(.dark) .aggregate-rating__count { color: #94a3b8; }
                .stars { display: inline-flex; gap: 2px; }
                .star { color: #d1d5db; font-size: 18px; line-height: 1; }
                :global(.dark) .star { color: #475569; }
                .star--filled { color: #fbbf24; }
                /* أعلى تخصيصاً من ‎.dark .star‎ حتى تبقى النجوم الممتلئة ذهبية بالوضع الداكن */
                :global(.dark) .star--filled { color: #fbbf24; }
                .reviews-list {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }
                .review-card {
                    background: #fff;
                    border: 1px solid #eef2f7;
                    border-radius: 16px;
                    padding: 20px;
                    box-shadow: 0 1px 2px rgba(16,24,40,0.05);
                    transition: box-shadow .18s ease, transform .18s ease, border-color .18s ease;
                }
                .review-card:hover {
                    box-shadow: 0 8px 24px rgba(16,24,40,0.08);
                    transform: translateY(-2px);
                    border-color: #e2e8f0;
                }
                :global(.dark) .review-card {
                    background: #1e293b;
                    border-color: #334155;
                    box-shadow: none;
                }
                :global(.dark) .review-card:hover { border-color: #475569; }
                .review-header {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 12px;
                    gap: 12px;
                }
                .review-author {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    width: 100%;
                }
                .review-avatar {
                    flex-shrink: 0;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 15px;
                    color: #fff;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    text-transform: uppercase;
                }
                .review-author__meta {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    min-width: 0;
                }
                .review-author__name {
                    font-weight: 700;
                    color: #1f2937;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                :global(.dark) .review-author__name { color: #f1f5f9; }
                .verified-badge {
                    background: #dcfce7;
                    color: #15803d;
                    font-size: 11px;
                    font-weight: 600;
                    padding: 2px 8px;
                    border-radius: 20px;
                    white-space: nowrap;
                }
                :global(.dark) .verified-badge {
                    background: rgba(21,128,61,0.18);
                    color: #4ade80;
                }
                .review-meta {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .review-date { color: #94a3b8; font-size: 12.5px; }
                .review-title {
                    font-size: 16px;
                    font-weight: 700;
                    color: #1f2937;
                    margin: 4px 0 8px;
                }
                :global(.dark) .review-title { color: #e2e8f0; }
                .review-text {
                    color: #475569;
                    line-height: 1.75;
                    margin-bottom: 12px;
                    white-space: pre-line;
                }
                :global(.dark) .review-text { color: #cbd5e1; }
                .review-pros-cons {
                    display: flex;
                    gap: 24px;
                    margin-bottom: 12px;
                    flex-wrap: wrap;
                }
                .pros, .cons { flex: 1; min-width: 150px; }
                .pros ul, .cons ul { list-style: none; padding: 0; margin: 0; }
                .pros li { color: #15803d; font-size: 14px; padding: 2px 0; }
                .cons li { color: #dc2626; font-size: 14px; padding: 2px 0; }
                :global(.dark) .pros li { color: #4ade80; }
                :global(.dark) .cons li { color: #f87171; }
                .label { font-size: 14px; margin-left: 4px; }
                .review-location {
                    color: #94a3b8;
                    font-size: 12.5px;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                }
                .btn-show-more {
                    width: 100%;
                    margin-top: 16px;
                    padding: 13px;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    color: #4f46e5;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all .18s ease;
                }
                .btn-show-more:hover {
                    background: #4f46e5;
                    border-color: #4f46e5;
                    color: #fff;
                }
                :global(.dark) .btn-show-more {
                    background: #1e293b;
                    border-color: #334155;
                    color: #a5b4fc;
                }
                :global(.dark) .btn-show-more:hover {
                    background: #4f46e5;
                    border-color: #4f46e5;
                    color: #fff;
                }
                .btn-show-less {
                    width: 100%;
                    margin-top: 8px;
                    padding: 10px;
                    background: transparent;
                    border: none;
                    border-radius: 12px;
                    color: #94a3b8;
                    font-weight: 500;
                    font-size: 13px;
                    cursor: pointer;
                    transition: color .18s ease;
                }
                .btn-show-less:hover { color: #4f46e5; }
            `}</style>
        </div>
    );
}
