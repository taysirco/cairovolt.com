'use client';

import { useState, useEffect } from 'react';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface Review {
    id: string;
    customerName: string;
    rating: number;
    title?: string;
    reviewText: string;
    pros?: string[];
    cons?: string[];
    reviewDate: string;
    governorate: string;
    isVerified: boolean;
    helpfulCount: number;
}

interface AggregateRating {
    ratingValue: string;
    reviewCount: number;
}

interface VerifiedReviewsProps {
    productSlug: string;
    locale: string;
}

export default function VerifiedReviews({ productSlug, locale }: VerifiedReviewsProps) {
    const isArabic = locale === 'ar';
    const [reviews, setReviews] = useState<Review[]>([]);
    const [aggregateRating, setAggregateRating] = useState<AggregateRating | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await fetch(`/api/reviews?productSlug=${productSlug}`);
                const data = await response.json();
                setReviews(data.reviews || []);
                setAggregateRating(data.aggregateRating);
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchReviews();
    }, [productSlug]);

    const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

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

    if (loading) {
        return (
            <div className="verified-reviews verified-reviews--loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

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
                                <span className="review-author__name">{review.customerName}</span>
                                {review.isVerified && (
                                    <span className="verified-badge">
                                        ✓ {isArabic ? 'مشتري موثق' : 'Verified'}
                                    </span>
                                )}
                            </div>
                            <div className="review-meta">
                                {renderStars(review.rating)}
                                <span className="review-date">
                                    {new Date(review.reviewDate).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')}
                                </span>
                            </div>
                        </div>

                        {review.title && (
                            <h4 className="review-title">{review.title}</h4>
                        )}

                        <p className="review-text">{review.reviewText}</p>

                        {/* Pros & Cons */}
                        <div className="review-pros-cons">
                            {review.pros && review.pros.length > 0 && (
                                <div className="pros">
                                    <span className="label"><SvgIcon name="check-circle" className="w-4 h-4 inline-block text-green-500" /></span>
                                    <ul>
                                        {review.pros.map((pro, i) => (
                                            <li key={i}>{pro}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {review.cons && review.cons.length > 0 && (
                                <div className="cons">
                                    <span className="label"><SvgIcon name="x-circle" className="w-4 h-4 inline-block text-red-500" /></span>
                                    <ul>
                                        {review.cons.map((con, i) => (
                                            <li key={i}>{con}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="review-location">
                            <SvgIcon name="pin" className="w-4 h-4 inline-block" /> {review.governorate}
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More */}
            {reviews.length > 3 && !showAll && (
                <button className="btn-show-more" onClick={() => setShowAll(true)}>
                    {isArabic
                        ? `عرض كل التقييمات (${reviews.length})`
                        : `Show All Reviews (${reviews.length})`}
                </button>
            )}

            <style jsx>{`
                .verified-reviews {
                    margin-top: 48px;
                    padding: 32px;
                    background: #f8fafc;
                    border-radius: 20px;
                }
                .verified-reviews--loading {
                    display: flex;
                    justify-content: center;
                    padding: 60px;
                }
                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid #e5e7eb;
                    border-top-color: #3b82f6;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .section-title {
                    font-size: 22px;
                    color: #1f2937;
                    margin-bottom: 24px;
                }
                .aggregate-rating {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 20px;
                    background: #fff;
                    border-radius: 12px;
                    margin-bottom: 24px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                .aggregate-rating__score {
                    font-size: 48px;
                    font-weight: 700;
                    color: #1f2937;
                }
                .aggregate-rating__count {
                    color: #6b7280;
                    font-size: 14px;
                    margin-top: 4px;
                    display: block;
                }
                .stars {
                    display: flex;
                    gap: 2px;
                }
                .star {
                    color: #d1d5db;
                    font-size: 18px;
                }
                .star--filled {
                    color: #fbbf24;
                }
                .reviews-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .review-card {
                    background: #fff;
                    border-radius: 12px;
                    padding: 20px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                .review-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 12px;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .review-author {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .review-author__name {
                    font-weight: 600;
                    color: #1f2937;
                }
                .verified-badge {
                    background: #dcfce7;
                    color: #16a34a;
                    font-size: 12px;
                    padding: 2px 8px;
                    border-radius: 20px;
                }
                .review-meta {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .review-date {
                    color: #9ca3af;
                    font-size: 13px;
                }
                .review-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #1f2937;
                    margin-bottom: 8px;
                }
                .review-text {
                    color: #4b5563;
                    line-height: 1.6;
                    margin-bottom: 12px;
                }
                .review-pros-cons {
                    display: flex;
                    gap: 24px;
                    margin-bottom: 12px;
                    flex-wrap: wrap;
                }
                .pros, .cons {
                    flex: 1;
                    min-width: 150px;
                }
                .pros ul, .cons ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .pros li {
                    color: #16a34a;
                    font-size: 14px;
                    padding: 2px 0;
                }
                .cons li {
                    color: #dc2626;
                    font-size: 14px;
                    padding: 2px 0;
                }
                .label {
                    font-size: 14px;
                    margin-left: 4px;
                }
                .review-location {
                    color: #9ca3af;
                    font-size: 13px;
                }
                .btn-show-more {
                    width: 100%;
                    margin-top: 16px;
                    padding: 14px;
                    background: #fff;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    color: #3b82f6;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-show-more:hover {
                    background: #f8fafc;
                    border-color: #3b82f6;
                }
            `}</style>
        </div>
    );
}
