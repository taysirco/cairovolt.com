import type { ProductReview } from './_shared';

// Verified-purchase reviews only — populated by the order-gated review system.
// Never seed synthetic reviews (same policy as JBL, see JBL-STRATEGY.md §4).
// An explicit empty array is REQUIRED: it blocks the fallback synthetic-review
// generator in src/data/product-reviews.ts for this slug.
export const soundcore_r60i_nc_reviews: ProductReview[] = [];
