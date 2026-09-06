# OpenAI (ChatGPT) Ads — Measurement Pixel + Conversions API

Implemented 2026-09-06 against the official references as they read that day:
[Measurement Pixel](https://developers.openai.com/ads/measurement-pixel) ·
[Conversions API](https://developers.openai.com/ads/conversions-api) ·
[Supported Events](https://developers.openai.com/ads/supported-events).

| Item | Value |
|---|---|
| Pixel ID (public) | `K8QGQ8ULRsFPeG892Pi4w9` — `src/lib/openai-ads/shared.ts` |
| CAPI key (secret) | env `OPENAI_ADS_CAPI_KEY` — never `NEXT_PUBLIC`, never committed |
| Primary conversion | `order_created` · `data.type = contents` · currency `EGP` in **piastres** |
| Event id (both channels) | `order_<orderId>` e.g. `order_CV-MF2X1K-9A3F` |
| Framework / hosting | Next.js 16 App Router (`next/server` `after()`), Firebase App Hosting backend `naqrastore` |

## 1. Where the real conversion happens

Shopper path: product page → cart (`CartContext`) → `/checkout` form → `POST /api/orders`
→ server re-prices every line from the catalogue, applies coupon/bundle, computes shipping →
**`db.collection('orders').add(orderData)` (Firestore, the durable order record)** → Sheets + CRM sync →
JSON response `{ orderId, adsEvent, items, pricing }` → client stores the order in `sessionStorage`
and navigates to `/confirm`.

The conversion is the Firestore commit, so:

* the **server** sends `order_created` to the Conversions API from `after()` right after the commit;
* the **browser** fires the pixel `order_created` in the checkout page **as soon as the API response
  confirms the order** (before `router.push('/confirm')`), not on the thank-you page — a customer who
  closes the tab before `/confirm` renders still converted;
* `/confirm` fires **no** OpenAI event (it keeps its GA4/TikTok events untouched);
* `/verify` (warranty-card activation) is a post-purchase page and fires **no** OpenAI event.

Neither `/thank-you?success=…` nor `sessionStorage` is treated as proof of an order. There is no new
public endpoint: the only server event is produced by the order route itself.

## 2. Why `order_created`, not `lead_created`

`POST /api/orders` creates a real purchase order: a durable Firestore document with a stable
`orderId`, catalogue-resolved products, quantities and a server-computed total, status `pending`,
`paymentMethod: 'cod'`. That is `order_created` (`contents` shape). Cash on delivery means *accepted
by the system*, not paid or delivered — the event says the same.

**Action required in Ads Manager:** the event you exported earlier was `lead_created`. If the
campaign objective / conversion goal is still set to `lead_created`, switch it to
`order_created`. The code does not change the goal; a mismatch means the campaign optimises toward
an event this site never sends.

## 3. Events

| Event | Where | Data |
|---|---|---|
| `page_viewed` | every route (`OpenAiPixelPageView`) | `contents:[{id: pathname, content_type:'page'}]` — dedupes Strict Mode/hydration via last-path memory |
| `contents_viewed` | product page mount (`ProductPageClient`) | catalogue SKU (or slug) + unit amount |
| `items_added` | `CartContext.addToCart` and `addBundleToCart` | each line with sku/slug, qty, unit amount |
| `checkout_started` | `/checkout` mount (same effect as GA4 `begin_checkout`) | cart lines + subtotal |
| `order_created` | browser: checkout after 2xx · server: `after()` in `/api/orders` | server lines + server total, `event_id` = CAPI `id` |

**Left out on purpose:** `lead_created` (WhatsApp/phone taps are not purchases and the form is not a
lead form), `registration_completed` (warranty activation is post-purchase), and any event from the
two API order endpoints `api/v1/checkout` and `api/v1/quick-cod` (agent/API-initiated orders with no
browser page and no `oppref`; add later only with an agreed `action_source`).

## 4. Amount definition

`data.amount` = **server `totalAmount`** = subtotal − coupon discount − bundle discount **+ shipping
fee** — what the courier collects, the same figure GA4 and TikTok receive. Sent as an integer in
piastres (`1730 EGP → 173000`). `contents[].amount` is the catalogue unit price in piastres, so the
sum of lines differs from `amount` by discounts and shipping. Never the browser total, never margin.

## 5. Dedup, attribution, consent, matching

* **One id per order**: `order_<orderId>` derived on the server from the persisted order id. Retry
  of the same order = same id; a refresh of `/confirm` fires nothing (sessionStorage guard) and could
  not mint a new id anyway; a second real order gets a new `orderId` → new id. Order-level
  idempotency is unchanged (phone/SKU dedupe stays in `quick-cod`; the checkout form keeps its own
  post-commit guard).
* **Attribution**: the checkout page reads the pixel's first-party cookies and ships
  `adsContext = { pageUrl, oppref (__oppref), obref (__obref, only with consent), consent }` inside
  the order POST. The server validates (allowed hosts only, path without query/fragment, printable
  opaque tokens ≤ 512 chars, `Origin` header must be our host when present) and passes `oppref`
  unmodified on the event and `obref` inside `user`. Fallback `source_url` is
  `https://cairovolt.com/checkout`. Note: the pixel reports the page *origin* as its `source_url`;
  the server sends origin + path of the checkout page — a deliberate, documented difference.
* **Consent**: no banner exists today; measurement defaults to allowed (the pixel default). A stored
  denial (`localStorage.cv_measurement_consent = 'denied'`) is applied before init in `<head>`,
  blocks every browser event, is forwarded with the order and makes the server skip CAPI. Helpers:
  `setMeasurementConsent(true|false)` in `src/lib/openai-ads/pixel.ts`. Blocked events are not replayed.
* **Matching**: phone only (the COD form's reliable identifier). Egyptian mobile → `20` +
  national digits → SHA-256. Browser: `oaiq('init', { user: { phone_number_sha256, country:'EG',
  region } })` right before the measure call. Server: `user.phone_numbers_sha256[]`, `countries`,
  `regions`, `ip_address`, `user_agent`, `obref`. Non-Egyptian or malformed numbers are dropped, not
  guessed. No raw or hashed identifiers are logged.

## 6. Failure isolation

Everything analytics-related is inside `try/catch`; the order response is already sent before CAPI
runs (`after()`), and the browser measure runs after the order is committed. CAPI: 5 s timeout, one
retry only for network/429/5xx with the same id and timestamp, 4xx logged and final, missing key →
one warning and skip. `after()` on App Hosting (Cloud Run) keeps the worker alive for the deferred
task; it is best-effort delivery, not a queue — a container that dies mid-send loses that one event
(the pixel channel still reports it).

## 7. Tests

`npm run test:ads` (Node 24 `node:test`, all HTTP mocked — 19 cases): event shape and field names,
piastre conversion, catalogue ids, stable ids, phone normalisation, URL/ref hygiene, consent
skipping, missing key, 4xx final, 429/5xx/network single retry with identical id+timestamp, timeout.
Also run: `npm run typecheck`, `npm run lint`, `npm run build`.

Not tested here (needs a valid key or a browser): a real `validate_only:true` round trip, SDK load
in a real browser, Ads Manager event visibility, ad attribution.

## 8. Rollout

1. Create the secret (never paste the key in chat or code):
   `firebase apphosting:secrets:set openai_ads_capi_key --project gadgets-b0bdb`
   then `firebase apphosting:secrets:grantaccess openai_ads_capi_key --backend naqrastore --project gadgets-b0bdb`
   and verify the stored length with `firebase apphosting:secrets:access openai_ads_capi_key --project gadgets-b0bdb | wc -c`
   (a masked paste has silently stored a token three times before).
2. Uncomment the `OPENAI_ADS_CAPI_KEY` block in `apphosting.yaml` and roll out.
3. Validate once with test data: call `sendOrderCreatedEvent(..., { validateOnly: true })` from a
   throwaway script — a 2xx proves the payload shape, **not** that a conversion was recorded or
   attributed.
4. Ads Manager → Conversions → the pixel `K8QGQ8ULRsFPeG892Pi4w9`: check that `page_viewed`,
   `contents_viewed`, `items_added`, `checkout_started` appear from browsing, and `order_created`
   after a real order (browser + server deduplicated to one). Distinguish: code shipped → SDK
   loaded (Network: `oaiq.min.js`, then requests to `bzr.openai.com`) → CAPI 2xx → event visible in
   Ads Manager → conversion attributed to an ad (only with a click/impression in window).

## 9. Review before/after deploy

* Privacy: hashed phone leaves the browser (pixel) and server (CAPI); `obref`/IP/UA are sent with
  the order only under the default-allowed consent. Confirm this matches the privacy policy.
* Consent UI: none exists; the hooks are in place if one is added.
* Security: no new public endpoint; `adsContext` is validated; the CAPI key is server-only.
* Data: `amount` includes shipping — keep GA4/TikTok/OpenAI consistent if that definition changes.
