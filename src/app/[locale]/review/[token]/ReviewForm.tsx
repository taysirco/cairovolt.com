'use client';

import { useState } from 'react';

interface ReviewFormProps {
    token: string;
    productName: string;
    customerName: string;
    locale: string;
}

export default function ReviewForm({ token, productName, customerName, locale }: ReviewFormProps) {
    const isArabic = locale === 'ar';

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [pros, setPros] = useState(['']);
    const [cons, setCons] = useState(['']);
    const [displayName, setDisplayName] = useState(customerName);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (rating === 0) {
            setError(isArabic ? 'يرجى اختيار تقييم بالنجوم' : 'Please select a star rating');
            return;
        }

        if (reviewText.trim().length < 10) {
            setError(isArabic ? 'يرجى كتابة تقييم لا يقل عن 10 أحرف' : 'Please write a review with at least 10 characters');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    rating,
                    title: title.trim() || undefined,
                    reviewText: reviewText.trim(),
                    pros: pros.filter(p => p.trim()),
                    cons: cons.filter(c => c.trim()),
                    customerDisplayName: displayName.trim() || undefined
                })
            });

            const data = await response.json();

            if (data.success) {
                setIsSuccess(true);
            } else {
                setError(data.error || (isArabic ? 'حدث خطأ' : 'An error occurred'));
            }
        } catch (err) {
            setError(isArabic ? 'حدث خطأ في الاتصال' : 'Connection error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const addPro = () => setPros([...pros, '']);
    const addCon = () => setCons([...cons, '']);
    const updatePro = (index: number, value: string) => {
        const newPros = [...pros];
        newPros[index] = value;
        setPros(newPros);
    };
    const updateCon = (index: number, value: string) => {
        const newCons = [...cons];
        newCons[index] = value;
        setCons(newCons);
    };
    const removePro = (index: number) => setPros(pros.filter((_, i) => i !== index));
    const removeCon = (index: number) => setCons(cons.filter((_, i) => i !== index));

    if (isSuccess) {
        return (
            <div className="review-success">
                <div className="review-success__icon">✓</div>
                <h2 className="review-success__title">
                    {isArabic ? 'شكراً لك!' : 'Thank You!'}
                </h2>
                <p className="review-success__message">
                    {isArabic
                        ? 'تم إرسال تقييمك بنجاح. رأيك يُحدث فرقاً ويساعد عملاء آخرين!'
                        : 'Your review has been submitted successfully. Your opinion makes a difference!'}
                </p>
                <a href={`/${locale}`} className="review-success__link">
                    {isArabic ? '← تسوق المزيد' : '← Shop More'}
                </a>

                <style jsx>{`
                    .review-success {
                        background: rgba(255, 255, 255, 0.05);
                        backdrop-filter: blur(10px);
                        border-radius: 20px;
                        padding: 60px 40px;
                        text-align: center;
                        border: 1px solid rgba(34, 197, 94, 0.3);
                    }
                    .review-success__icon {
                        font-size: 72px;
                        margin-bottom: 24px;
                    }
                    .review-success__title {
                        color: #22c55e;
                        font-size: 28px;
                        margin-bottom: 16px;
                    }
                    .review-success__message {
                        color: rgba(255, 255, 255, 0.7);
                        font-size: 16px;
                        line-height: 1.6;
                        margin-bottom: 32px;
                    }
                    .review-success__link {
                        display: inline-block;
                        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                        color: #fff;
                        padding: 14px 32px;
                        border-radius: 12px;
                        text-decoration: none;
                        font-weight: 600;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="review-form">
            {/* Star Rating */}
            <div className="form-group">
                <label className="form-label">
                    {isArabic ? 'تقييمك *' : 'Your Rating *'}
                </label>
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map(star => (
                        <button
                            key={star}
                            type="button"
                            className={`star ${star <= (hoverRating || rating) ? 'star--active' : ''}`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            ★
                        </button>
                    ))}
                </div>
                <div className="rating-text">
                    {rating === 1 && (isArabic ? 'سيء' : 'Poor')}
                    {rating === 2 && (isArabic ? 'مقبول' : 'Fair')}
                    {rating === 3 && (isArabic ? 'جيد' : 'Good')}
                    {rating === 4 && (isArabic ? 'جيد جداً' : 'Very Good')}
                    {rating === 5 && (isArabic ? 'ممتاز!' : 'Excellent!')}
                </div>
            </div>

            {/* Title (Optional) */}
            <div className="form-group">
                <label className="form-label">
                    {isArabic ? 'عنوان التقييم (اختياري)' : 'Review Title (Optional)'}
                </label>
                <input
                    type="text"
                    className="form-input"
                    placeholder={isArabic ? 'مثال: منتج رائع!' : 'Example: Great product!'}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    maxLength={100}
                />
            </div>

            {/* Review Text */}
            <div className="form-group">
                <label className="form-label">
                    {isArabic ? 'تقييمك *' : 'Your Review *'}
                </label>
                <textarea
                    className="form-textarea"
                    placeholder={isArabic
                        ? 'شاركنا تجربتك مع المنتج... ما أعجبك؟ هل تنصح به؟'
                        : 'Share your experience with this product... What did you like? Would you recommend it?'}
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    rows={4}
                    required
                    minLength={10}
                />
                <div className="char-count">
                    {reviewText.length}/500
                </div>
            </div>

            {/* Pros */}
            <div className="form-group">
                <label className="form-label">
                    {isArabic ? '👍 المميزات (اختياري)' : '👍 Pros (Optional)'}
                </label>
                {pros.map((pro, index) => (
                    <div key={index} className="list-input">
                        <input
                            type="text"
                            className="form-input form-input--small"
                            placeholder={isArabic ? 'ميزة...' : 'A pro...'}
                            value={pro}
                            onChange={e => updatePro(index, e.target.value)}
                        />
                        {pros.length > 1 && (
                            <button type="button" className="btn-remove" onClick={() => removePro(index)}>×</button>
                        )}
                    </div>
                ))}
                {pros.length < 5 && (
                    <button type="button" className="btn-add" onClick={addPro}>
                        + {isArabic ? 'إضافة ميزة' : 'Add Pro'}
                    </button>
                )}
            </div>

            {/* Cons */}
            <div className="form-group">
                <label className="form-label">
                    {isArabic ? '👎 العيوب (اختياري)' : '👎 Cons (Optional)'}
                </label>
                {cons.map((con, index) => (
                    <div key={index} className="list-input">
                        <input
                            type="text"
                            className="form-input form-input--small"
                            placeholder={isArabic ? 'عيب...' : 'A con...'}
                            value={con}
                            onChange={e => updateCon(index, e.target.value)}
                        />
                        {cons.length > 1 && (
                            <button type="button" className="btn-remove" onClick={() => removeCon(index)}>×</button>
                        )}
                    </div>
                ))}
                {cons.length < 5 && (
                    <button type="button" className="btn-add" onClick={addCon}>
                        + {isArabic ? 'إضافة عيب' : 'Add Con'}
                    </button>
                )}
            </div>

            {/* Display Name */}
            <div className="form-group">
                <label className="form-label">
                    {isArabic ? 'اسم العرض' : 'Display Name'}
                </label>
                <input
                    type="text"
                    className="form-input"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    maxLength={50}
                />
                <div className="form-hint">
                    {isArabic
                        ? 'سيظهر هذا الاسم بجانب تقييمك'
                        : 'This name will appear next to your review'}
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="form-error">
                    ⚠ {error}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? (isArabic ? 'جاري الإرسال...' : 'Submitting...')
                    : (isArabic ? '✓ إرسال التقييم' : '✓ Submit Review')}
            </button>

            <style jsx>{`
                .review-form {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 32px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .form-group {
                    margin-bottom: 24px;
                }
                .form-label {
                    display: block;
                    color: #fff;
                    font-weight: 500;
                    margin-bottom: 10px;
                    font-size: 15px;
                }
                .form-input, .form-textarea {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 12px;
                    padding: 14px 16px;
                    color: #fff;
                    font-size: 15px;
                    transition: all 0.2s;
                }
                .form-input:focus, .form-textarea:focus {
                    outline: none;
                    border-color: #3b82f6;
                    background: rgba(255, 255, 255, 0.15);
                }
                .form-input::placeholder, .form-textarea::placeholder {
                    color: rgba(255, 255, 255, 0.4);
                }
                .form-input--small {
                    padding: 10px 14px;
                }
                .form-textarea {
                    resize: vertical;
                    min-height: 100px;
                }
                .form-hint {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 13px;
                    margin-top: 6px;
                }
                .char-count {
                    text-align: left;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 12px;
                    margin-top: 6px;
                }
                .star-rating {
                    display: flex;
                    gap: 8px;
                }
                .star {
                    background: none;
                    border: none;
                    font-size: 40px;
                    color: rgba(255, 255, 255, 0.3);
                    cursor: pointer;
                    transition: all 0.2s;
                    padding: 0;
                }
                .star:hover, .star--active {
                    color: #fbbf24;
                    transform: scale(1.1);
                }
                .rating-text {
                    color: #fbbf24;
                    font-size: 14px;
                    margin-top: 8px;
                    height: 20px;
                }
                .list-input {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 8px;
                }
                .btn-remove {
                    background: rgba(239, 68, 68, 0.2);
                    border: none;
                    color: #ef4444;
                    width: 40px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 20px;
                }
                .btn-add {
                    background: none;
                    border: 1px dashed rgba(255, 255, 255, 0.3);
                    color: rgba(255, 255, 255, 0.6);
                    padding: 8px 16px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    width: 100%;
                }
                .btn-add:hover {
                    border-color: rgba(255, 255, 255, 0.5);
                    color: rgba(255, 255, 255, 0.8);
                }
                .form-error {
                    background: rgba(239, 68, 68, 0.2);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    color: #fca5a5;
                    padding: 12px 16px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    font-size: 14px;
                }
                .btn-submit {
                    width: 100%;
                    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                    border: none;
                    color: #fff;
                    padding: 16px;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-submit:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
                }
                .btn-submit:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            `}</style>
        </form>
    );
}
