/**
 * CairoVolt Firebase Cloud Functions v2
 * 
 * Triggers:
 * 1. pingGoogleOnProductUpdate — When price/stock changes in Firestore, 
 *    notifies Google Indexing API + busts ISR cache via Next.js webhook.
 * 2. syncMerchantCenter — Syncs product data to Google Merchant Center 
 *    Content API for Shopping tab dominance.
 * 3. trackPurchaseGA4 — Server-side GA4 Measurement Protocol on new orders
 *    to bypass AdBlockers and feed RankBrain task-completion signals.
 *
 * Required env / secrets:
 *   INDEXING_WEBHOOK_SECRET, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY
 *   GA4_MEASUREMENT_ID, GA4_API_SECRET
 *   MERCHANT_CENTER_ID
 *
 * Service account key files (place in functions/ directory):
 *   cairovolt-indexing-key.json   — for Indexing API
 *   merchant-center-key.json     — for Content API (optional, can reuse)
 */

const { onDocumentUpdated, onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const fetch = require("node-fetch");
const { google } = require("googleapis");

// ─── Secrets (set via `firebase functions:secrets:set`) ───
const INDEXING_WEBHOOK_SECRET = defineSecret("INDEXING_WEBHOOK_SECRET");
const GA4_MEASUREMENT_ID = defineSecret("GA4_MEASUREMENT_ID");
const GA4_API_SECRET = defineSecret("GA4_API_SECRET");

const BASE_URL = "https://cairovolt.com";

// ═══════════════════════════════════════════════════════════
// 1. REAL-TIME GOOGLE INDEXING on price/stock change
// ═══════════════════════════════════════════════════════════
exports.pingGoogleOnProductUpdate = onDocumentUpdated(
  {
    document: "products/{productId}",
    secrets: [INDEXING_WEBHOOK_SECRET],
  },
  async (event) => {
    const newVal = event.data.after.data();
    const prevVal = event.data.before.data();

    // Only ping if price or stock actually changed
    if (newVal.price === prevVal.price && newVal.stock === prevVal.stock) {
      return null;
    }

    const slug = newVal.slug;
    if (!slug) return null;

    // Determine both AR and EN URLs for the product
    const brand = (newVal.brand || "").toLowerCase();
    const category = newVal.categorySlug || "";
    const arUrl = `${BASE_URL}/${brand}/${category}/${slug}`;
    const enUrl = `${BASE_URL}/en/${brand}/${category}/${slug}`;

    // Option A: Call our Next.js webhook (which busts ISR cache + pings Google)
    try {
      const webhookUrl = `${BASE_URL}/api/google-index`;
      const secret = INDEXING_WEBHOOK_SECRET.value();

      // Ping AR version
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({
          url: arUrl,
          type: "URL_UPDATED",
          slug: slug,
        }),
      });

      // Ping EN version
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({
          url: enUrl,
          type: "URL_UPDATED",
          slug: slug,
        }),
      });

      console.log(
        `[Indexing] ✅ Google pinged for ${slug} | Price: ${prevVal.price} → ${newVal.price} | Stock: ${prevVal.stock} → ${newVal.stock}`
      );
    } catch (error) {
      console.error(`[Indexing] ❌ Failed for ${slug}:`, error.message);
    }
  }
);

// ═══════════════════════════════════════════════════════════
// 2. GOOGLE MERCHANT CENTER SYNC (Shopping Tab)
// ═══════════════════════════════════════════════════════════
exports.syncMerchantCenter = onDocumentUpdated(
  { document: "products/{productId}" },
  async (event) => {
    const product = event.data.after.data();
    const prevProduct = event.data.before.data();

    // Only sync on meaningful changes
    if (
      product.price === prevProduct.price &&
      product.stock === prevProduct.stock &&
      product.translations?.ar?.name === prevProduct.translations?.ar?.name
    ) {
      return null;
    }

    // Merchant Center requires a key file — skip if not configured
    const fs = require("fs");
    const keyPath = "./merchant-center-key.json";
    if (!fs.existsSync(keyPath)) {
      console.warn("[Merchant] ⚠️ merchant-center-key.json not found, skipping sync");
      return null;
    }

    const merchantId = process.env.MERCHANT_CENTER_ID;
    if (!merchantId) {
      console.warn("[Merchant] ⚠️ MERCHANT_CENTER_ID not set, skipping");
      return null;
    }

    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: keyPath,
        scopes: ["https://www.googleapis.com/auth/content"],
      });

      const shopping = google.content({ version: "v2.1", auth });
      const slug = product.slug;
      const brand = (product.brand || "").toLowerCase();
      const category = product.categorySlug || "";
      const arName = product.translations?.ar?.name || product.slug;
      const arDesc = product.translations?.ar?.description || "";

      await shopping.products.insert({
        merchantId: merchantId,
        requestBody: {
          offerId: product.sku || slug,
          title: arName,
          description: arDesc.substring(0, 5000),
          link: `${BASE_URL}/${brand}/${category}/${slug}`,
          imageLink: product.images?.[0]?.url
            ? `${BASE_URL}${product.images[0].url}`
            : "",
          contentLanguage: "ar",
          targetCountry: "EG",
          availability: (product.stock || 0) > 0 ? "in stock" : "out of stock",
          condition: "new",
          price: {
            value: product.price.toString(),
            currency: "EGP",
          },
          brand: product.brand,
          gtin: product.gtin || undefined,
          shipping: [
            {
              country: "EG",
              price: {
                value: product.price >= 500 ? "0" : "40",
                currency: "EGP",
              },
            },
          ],
        },
      });

      console.log(`[Merchant] ✅ Synced: ${arName} (${product.price} EGP)`);
    } catch (error) {
      console.error("[Merchant] ❌ Shopping API Failed:", error.message);
    }
  }
);

// ═══════════════════════════════════════════════════════════
// 3. SERVER-SIDE GA4 PURCHASE TRACKING (bypasses AdBlockers)
// ═══════════════════════════════════════════════════════════
exports.trackPurchaseGA4 = onDocumentCreated(
  {
    document: "orders/{orderId}",
    secrets: [GA4_MEASUREMENT_ID, GA4_API_SECRET],
  },
  async (event) => {
    const order = event.data.data();
    const measurementId = GA4_MEASUREMENT_ID.value();
    const apiSecret = GA4_API_SECRET.value();

    if (!measurementId || !apiSecret) {
      console.warn("[GA4] ⚠️ GA4 credentials not configured, skipping");
      return null;
    }

    const items = (order.items || []).map((item, idx) => ({
      item_id: item.productId || item.id || `item_${idx}`,
      item_name: item.name || "Unknown",
      price: item.price || 0,
      quantity: item.quantity || 1,
      item_brand: item.brand || "CairoVolt",
    }));

    const payload = {
      client_id: order.userId || `server_${event.data.id}`,
      events: [
        {
          name: "purchase",
          params: {
            currency: "EGP",
            value: order.totalAmount || 0,
            transaction_id: event.data.id,
            shipping: order.shipping || 0,
            items: items,
          },
        },
      ],
    };

    try {
      const endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        console.log(
          `[GA4] ✅ Purchase tracked: ${event.data.id} | ${order.totalAmount} EGP | ${items.length} items`
        );
      } else {
        console.error(`[GA4] ❌ Response: ${res.status}`);
      }
    } catch (error) {
      console.error("[GA4] ❌ Failed:", error.message);
    }
  }
);
