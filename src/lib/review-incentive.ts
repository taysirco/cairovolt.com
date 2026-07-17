/**
 * Review thank-you incentive — single source of truth.
 *
 * The thank-you is sentiment-neutral: it is offered for any submitted review,
 * positive or negative, and never depends on a star rating.
 *
 * The code is revealed on the thank-you screen AFTER submission (not in the
 * WhatsApp message) so it rewards completed reviews only.
 */
export const REVIEW_THANKS_CODE = 'SHOKRAN10';

/** Human label used in messages and the review form. */
export const REVIEW_THANKS_LABEL_AR = 'خصم 10%';
export const REVIEW_THANKS_LABEL_EN = '10% off';
