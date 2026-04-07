'use client';

import React from 'react';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { productReviewsDb } from '@/data/product-reviews';
import type { ProductReview } from '@/data/product-reviews';

interface SocialProofStripProps {
  locale: string;
}

// Curate best reviews from the database for homepage display
function getTopReviews(): (ProductReview & { productSlug: string })[] {
  const topReviewSlugs = [
    'joyroom-t03s-pro-earbuds',
    'anker-powercore-10000',
    'anker-powerport-20w',
    'joyroom-power-bank-20000',
    'anker-powerline-usb-c-lightning',
    'anker-soundcore-r50i',
    'anker-powercore-20000',
    'joyroom-power-bank-10000',
  ];

  const reviews: (ProductReview & { productSlug: string })[] = [];

  for (const slug of topReviewSlugs) {
    const productReviews = productReviewsDb[slug];
    if (productReviews && productReviews.length > 0) {
      // Pick the best review (5 stars, longest text)
      const best = productReviews
        .filter((r) => r.rating >= 4)
        .sort((a, b) => (b.reviewBody?.ar?.length || 0) - (a.reviewBody?.ar?.length || 0))[0];
      if (best) {
        reviews.push({ ...best, productSlug: slug });
      }
    }
  }

  return reviews;
}

export default function SocialProofStrip({ locale }: SocialProofStripProps) {
  const isAr = locale === 'ar';
  const reviews = getTopReviews();

  // Double the reviews for seamless infinite scroll
  const scrollReviews = [...reviews, ...reviews];

  return (
    <section id="social-proof" className="py-12 lg:py-16 overflow-hidden" style={{ background: '#0d1222' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
            <SvgIcon name="chat" className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold text-green-300 tracking-wide uppercase">
              {isAr ? 'آراء عملائنا' : 'Customer Reviews'}
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white font-outfit">
            {isAr ? 'ليه الناس بتحب كايرو فولت؟' : 'Why People Love CairoVolt?'}
          </h2>
        </div>
      </div>

      {/* Scrolling Reviews Ticker */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0d1222] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0d1222] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-social-ticker" dir="ltr" style={{ width: 'max-content' }}>
          {scrollReviews.map((review, idx) => (
            <div
              key={`${review.productSlug}-${idx}`}
              className="flex-shrink-0 w-[320px] sm:w-[360px] bg-white/[0.03] rounded-2xl border border-white/[0.06] p-5 hover:bg-white/[0.06] transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <SvgIcon
                    key={s}
                    name="star"
                    className={`w-4 h-4 ${s <= review.rating ? 'text-amber-400' : 'text-slate-600'}`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 mb-4" dir={isAr ? 'rtl' : 'ltr'}>
                &ldquo;{isAr ? review.reviewBody?.ar : review.reviewBody?.en}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                  {review.author?.charAt(0) || '?'}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-200">{review.author || 'عميل'}</div>
                  <div className="text-xs text-slate-500">{review.location || ''}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
