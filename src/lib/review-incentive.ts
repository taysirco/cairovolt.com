/**
 * Review thank-you incentive — single source of truth.
 *
 * POLICY (Google review snippets / Merchant Center product ratings):
 * the incentive must be sentiment-NEUTRAL. It is given for submitting any
 * honest review — positive or negative — and the messaging must say so
 * explicitly. Never condition the reward on a star count, and never gate
 * which reviews get published by sentiment.
 *
 * The code is revealed on the thank-you screen AFTER submission (not in the
 * WhatsApp message) so it rewards completed reviews only.
 */
export const REVIEW_THANKS_CODE = 'SHOKRAN10';

/** Human label used in messages/UI, e.g. "خصم 10%" */
export const REVIEW_THANKS_LABEL_AR = 'خصم 10%';
export const REVIEW_THANKS_LABEL_EN = '10% off';
