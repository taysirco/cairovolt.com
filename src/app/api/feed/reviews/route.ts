import { NextResponse } from 'next/server';
import { products as staticProducts } from '@/data/seed-products';
import { getAllApprovedVerifiedReviews } from '@/lib/verified-reviews';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';
import {
    getMerchantGtin,
    getMerchantProductUrl,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
    MERCHANT_FEED_WITHHELD_PRODUCT_SLUGS,
    normalizeMpn,
} from '@/lib/merchant-product-data';

/**
 * Google Merchant Center Product Ratings XML Feed (Schema v2.3)
 * URL: https://cairovolt.com/api/feed/reviews
 *
 * Exposes ONLY real, admin-approved, non-seeded customer reviews from Firestore
 * (verified through `getAllApprovedVerifiedReviews` -> `filterOrderBackedReviews`),
 * matched by GTIN-13, MPN, SKU, brand, and canonical product URL to the exact
 * active catalogue submitted in /api/feed.
 *
 * Register this URL in Google Merchant Center Next -> Data sources -> Product
 * reviews to display verified star ratings in Google Shopping & Free Listings.
 */
export const dynamic = 'force-dynamic';

function xmlEscape(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function cdataEscape(value: string): string {
    return value.replace(/]]>/g, ']]]]><![CDATA[>');
}

export async function GET() {
    const merchantProducts = staticProducts.filter(
        (p) =>
            p.status === 'active'
            && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(p.slug)
            && !MERCHANT_FEED_WITHHELD_PRODUCT_SLUGS.has(p.slug),
    );
    const productBySlug = new Map(merchantProducts.map((p) => [p.slug, p]));

    const approvedReviews = await getAllApprovedVerifiedReviews(500);

    const reviewEntries = approvedReviews
        .map((review) => {
            const product = productBySlug.get(review.productSlug);
            if (!product) return null;
            const trimmedText = (review.reviewText || '').trim();
            if (!trimmedText || review.rating < 1 || review.rating > 5) return null;

            const productUrl = getMerchantProductUrl(product, 'ar');
            const gtin = getMerchantGtin(
                (product as Record<string, unknown>).gtin13 as string | undefined,
                (product as Record<string, unknown>).gtin as string | undefined,
            );
            const mpn = normalizeMpn((product as Record<string, unknown>).mpn as string | undefined);
            const productName = localizeArabicBrandNames(
                product.translations?.ar?.name || product.translations?.en?.name || product.slug,
            );
            const timestamp = review.reviewDate.toISOString();
            const collectionMethod = review.isVerified ? 'post_fulfillment' : 'unsolicited';

            const productIdLines = [
                gtin ? `            <gtins><gtin>${xmlEscape(gtin)}</gtin></gtins>` : null,
                mpn ? `            <mpns><mpn>${xmlEscape(mpn)}</mpn></mpns>` : null,
                product.sku ? `            <skus><sku>${xmlEscape(product.sku)}</sku></skus>` : null,
                `            <brands><brand>${xmlEscape(product.brand)}</brand></brands>`,
            ].filter(Boolean).join('\n');

            const prosXml = review.pros && review.pros.length > 0
                ? `\n      <pros>\n${review.pros.map((pro) => `        <pro><![CDATA[${cdataEscape(pro)}]]></pro>`).join('\n')}\n      </pros>`
                : '';
            const consXml = review.cons && review.cons.length > 0
                ? `\n      <cons>\n${review.cons.map((con) => `        <con><![CDATA[${cdataEscape(con)}]]></con>`).join('\n')}\n      </cons>`
                : '';
            const titleXml = review.title
                ? `\n      <title><![CDATA[${cdataEscape(review.title)}]]></title>`
                : '';

            return `    <review>
      <review_id>${xmlEscape(review.id)}</review_id>
      <reviewer>
        <name is_anonymous="false"><![CDATA[${cdataEscape(review.customerName || 'CairoVolt Customer')}]]></name>
      </reviewer>
      <review_timestamp>${xmlEscape(timestamp)}</review_timestamp>${titleXml}
      <content><![CDATA[${cdataEscape(trimmedText)}]]></content>${prosXml}${consXml}
      <review_url type="group">${xmlEscape(`${productUrl}#reviews`)}</review_url>
      <ratings>
        <overall min="1" max="5">${review.rating}</overall>
      </ratings>
      <products>
        <product>
          <product_ids>
${productIdLines}
          </product_ids>
          <product_name><![CDATA[${cdataEscape(productName)}]]></product_name>
          <product_url>${xmlEscape(productUrl)}</product_url>
        </product>
      </products>
      <is_spam>false</is_spam>
      <collection_method>${collectionMethod}</collection_method>
    </review>`;
        })
        .filter((entry): entry is string => Boolean(entry));

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:vc="http://www.w3.org/2007/XMLSchema-versioning" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.google.com/shopping/reviews/schema/product/2.3/product_reviews.xsd">
  <version>2.3</version>
  <publisher>
    <name>CairoVolt</name>
    <favicon>https://cairovolt.com/favicon.ico</favicon>
  </publisher>
  <reviews>
${reviewEntries.join('\n')}
  </reviews>
</feed>`;

    return new NextResponse(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            'X-Robots-Tag': 'noindex',
        },
    });
}
