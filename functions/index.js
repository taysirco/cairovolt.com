"use strict";
/* eslint-disable @typescript-eslint/no-require-imports -- Firebase loads this CommonJS entry point. */

const { createHash } = require("node:crypto");
const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { logger } = require("firebase-functions");
const { defineSecret } = require("firebase-functions/params");
const { google } = require("googleapis");

const INDEXING_WEBHOOK_SECRET = defineSecret("INDEXING_WEBHOOK_SECRET");
const GA4_MEASUREMENT_ID = defineSecret("GA4_MEASUREMENT_ID");
const GA4_API_SECRET = defineSecret("GA4_API_SECRET");

const BASE_URL = "https://cairovolt.com";
const INDEXING_WEBHOOK_URL = `${BASE_URL}/api/indexing`;
const MERCHANT_SCOPE = "https://www.googleapis.com/auth/content";

function cleanString(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function numericValue(value, fallback = 0, max = Number.MAX_SAFE_INTEGER) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.min(parsed, max) : fallback;
}

function canonicalProductUrl(product) {
  const catalogueBrand = cleanString(product.brand, 80).toLowerCase();
  const category = cleanString(product.categorySlug, 100);
  const slug = cleanString(product.slug, 200);

  if (!catalogueBrand || !category || !slug) return "";

  // Preserve the established public route used by the pages, sitemap, feed,
  // and structured data. Legacy Soundcore records may still carry Anker in
  // the catalogue brand field while living under /soundcore/.
  const brand = catalogueBrand === "soundcore"
    || (catalogueBrand === "anker" && ["audio", "speakers"].includes(category))
    ? "soundcore"
    : catalogueBrand;

  const path = [brand, category, slug].map(encodeURIComponent).join("/");
  return `${BASE_URL}/${path}`;
}

function merchantGtin(...candidates) {
  const documentedPrefixes = ["0194644", "0840053", "0848061"];

  for (const candidate of candidates) {
    const gtin = cleanString(candidate, 14);
    if (!/^(?:\d{8}|\d{12}|\d{13}|\d{14})$/.test(gtin)) continue;

    const checkDigit = Number(gtin.at(-1));
    let sum = 0;
    let positionFromRight = 0;
    for (let index = gtin.length - 2; index >= 0; index -= 1) {
      sum += Number(gtin[index]) * (positionFromRight % 2 === 0 ? 3 : 1);
      positionFromRight += 1;
    }

    const isValid = (10 - (sum % 10)) % 10 === checkDigit;
    if (isValid && documentedPrefixes.some((prefix) => gtin.startsWith(prefix))) {
      return gtin;
    }
  }

  return "";
}

function publicImageUrl(value) {
  const path = cleanString(value, 1_500);
  if (!path) return "";

  try {
    const url = new URL(path, BASE_URL);
    return url.origin === BASE_URL && url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function plainText(value, maxLength) {
  return cleanString(value, maxLength * 2)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

async function discardResponseBody(response) {
  try {
    await response.body?.cancel();
  } catch {
    // The status code is sufficient for these server-to-server requests.
  }
}

exports.pingGoogleOnProductUpdate = onDocumentUpdated(
  {
    document: "products/{productId}",
    secrets: [INDEXING_WEBHOOK_SECRET],
  },
  async (event) => {
    const product = event.data?.after.data() || {};
    const previousProduct = event.data?.before.data() || {};

    if (
      product.price === previousProduct.price &&
      product.stock === previousProduct.stock
    ) {
      return null;
    }

    const url = canonicalProductUrl(product);
    const slug = cleanString(product.slug, 200);
    const secret = INDEXING_WEBHOOK_SECRET.value();
    if (!url || !slug || !secret) {
      logger.warn("Index-update webhook is not fully configured; request skipped.");
      return null;
    }

    try {
      const response = await fetch(INDEXING_WEBHOOK_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ url, type: "URL_UPDATED", slug }),
        signal: AbortSignal.timeout(15_000),
      });

      await discardResponseBody(response);
      if (!response.ok) {
        logger.warn("Index-update webhook returned an unsuccessful response.", {
          status: response.status,
        });
        return null;
      }

      logger.info("Index-update webhook completed.");
    } catch {
      logger.error("Index-update webhook request failed.");
    }

    return null;
  }
);

exports.syncMerchantCenter = onDocumentUpdated(
  { document: "products/{productId}" },
  async (event) => {
    const product = event.data?.after.data() || {};
    const previousProduct = event.data?.before.data() || {};

    if (
      product.price === previousProduct.price &&
      product.stock === previousProduct.stock &&
      product.translations?.ar?.name === previousProduct.translations?.ar?.name
    ) {
      return null;
    }

    const merchantId = cleanString(process.env.MERCHANT_ID, 32);
    const dataSourceId = cleanString(process.env.MERCHANT_DATA_SOURCE_ID, 64);
    if (!/^\d+$/.test(merchantId) || !/^\d+$/.test(dataSourceId)) {
      logger.warn("Merchant synchronization is not configured; request skipped.");
      return null;
    }

    const slug = cleanString(product.slug, 200);
    const offerId = cleanString(product.sku || slug, 50);
    const title = plainText(product.translations?.ar?.name || slug, 150);
    const description = plainText(
      product.translations?.ar?.description ||
        product.translations?.ar?.shortDescription ||
        title,
      5_000
    );
    const url = canonicalProductUrl(product);
    const price = numericValue(product.price);
    const imageUrl = publicImageUrl(product.images?.[0]?.url);
    const brand = plainText(product.brand, 70);
    const gtin = merchantGtin(product.gtin13, product.gtin);

    if (!slug || !offerId || !title || !description || !url || price <= 0) {
      logger.warn("Merchant product data is incomplete; synchronization skipped.");
      return null;
    }

    const productAttributes = {
      title,
      description,
      link: url,
      availability: numericValue(product.stock) > 0 ? "in_stock" : "out_of_stock",
      condition: "new",
      price: {
        amountMicros: String(Math.round(price * 1_000_000)),
        currencyCode: "EGP",
      },
      ...(imageUrl ? { imageLink: imageUrl } : {}),
      ...(brand ? { brand } : {}),
      ...(gtin ? { gtins: [gtin] } : {}),
    };

    try {
      const auth = new google.auth.GoogleAuth({ scopes: [MERCHANT_SCOPE] });
      const merchant = google.merchantapi({ version: "products_v1", auth });
      const parent = `accounts/${merchantId}`;

      await merchant.accounts.productInputs.insert({
        parent,
        dataSource: `${parent}/dataSources/${dataSourceId}`,
        requestBody: {
          contentLanguage: "ar",
          feedLabel: "EG",
          offerId,
          productAttributes,
        },
      });

      logger.info("Merchant product synchronization completed.");
    } catch {
      logger.error("Merchant product synchronization failed.");
    }

    return null;
  }
);

exports.trackPurchaseGA4 = onDocumentCreated(
  {
    document: "orders/{orderId}",
    secrets: [GA4_MEASUREMENT_ID, GA4_API_SECRET],
  },
  async (event) => {
    const order = event.data?.data() || {};
    const orderId = cleanString(event.data?.id, 100);
    const measurementId = cleanString(GA4_MEASUREMENT_ID.value(), 100);
    const apiSecret = cleanString(GA4_API_SECRET.value(), 200);

    if (!orderId || !measurementId || !apiSecret) {
      logger.warn("GA4 purchase tracking is not fully configured; event skipped.");
      return null;
    }

    const sourceItems = Array.isArray(order.items) ? order.items.slice(0, 200) : [];
    const items = sourceItems.map((item, index) => ({
      item_id: cleanString(item?.productId || item?.id, 100) || `item_${index + 1}`,
      item_name: cleanString(item?.name, 200) || "Product",
      price: numericValue(item?.price, 0, 10_000_000),
      quantity: Math.max(1, Math.round(numericValue(item?.quantity, 1, 100))),
      item_brand: cleanString(item?.brand, 100) || "CairoVolt",
    }));

    const clientId = createHash("sha256").update(orderId).digest("hex").slice(0, 32);
    const payload = {
      client_id: `server.${clientId}`,
      events: [
        {
          name: "purchase",
          params: {
            currency: "EGP",
            value: numericValue(order.totalAmount, 0, 100_000_000),
            transaction_id: orderId,
            shipping: numericValue(order.shipping, 0, 1_000_000),
            items,
          },
        },
      ],
    };

    const endpoint = new URL("https://www.google-analytics.com/mp/collect");
    endpoint.searchParams.set("measurement_id", measurementId);
    endpoint.searchParams.set("api_secret", apiSecret);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15_000),
      });

      await discardResponseBody(response);
      if (!response.ok) {
        logger.warn("GA4 purchase endpoint returned an unsuccessful response.", {
          status: response.status,
        });
        return null;
      }

      logger.info("GA4 purchase event submitted.");
    } catch {
      logger.error("GA4 purchase event submission failed.");
    }

    return null;
  }
);
