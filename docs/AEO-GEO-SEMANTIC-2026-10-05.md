# AEO / GEO / Semantic-SEO pass — 2026-10-05

Branch `claude/aeo-geo-semantic-2026-10`, base `e2de103ca` (identical to production at audit time).

## Method

1. **Audit** — 8 lenses over code + live site (blog answer layer, commerce answer layer, structured data / entity graph, LLM-facing surfaces, internal-link graph, E-E-A-T / citations, crawler rendering, intent gaps). 134 findings.
2. **Adversarial verification** — every finding judged by two independent agents (reality: "can I reproduce it on HEAD/live?"; value & safety: "is the fix house-rule compliant and worth it?"). 128 survived, 6 refuted.
3. **Implementation** — 9 work packages with disjoint file ownership, each followed by an adversarial diff review, then one integration pass (tsc, eslint, generators, blog audit, cross-package contracts).
4. **Gates** — production build; zero-drift diff of title / meta description / canonical / robots / hreflang / H1 for all 836 sitemap URLs vs live; JSON-LD parse of all 851 built pages; token-leak scan of every built artefact; API / markdown-twin / sitemap / feed checks on a local `next start`.

External SEO data was unavailable (Ahrefs: plan has no API access; Semrush: out of API units) — the audit used code, the live site and `docs/GSC-KEYWORD-BASELINE-2026-07-26.md`.

## Biggest single fix — main content was hidden from non-JS crawlers

The four route-level `loading.tsx` files made every page stream its H1, price, quick answer and body into `<div hidden id="S:N">` after the footer, swapped in by inline JS. Most AI fetchers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot) do not run JS, and Readability-style extractors drop `hidden` nodes. Live production: H1 inside a streamed hidden segment on every page type. New build: **0 of 838** pages. `search` and `checkout` (the only routes whose `useSearchParams()` relied on that implicit boundary) now have explicit `<Suspense>` boundaries.

## What changed, by pillar

**Accuracy on answer surfaces (what engines quote verbatim)**
- Blog prices now come from the catalogue at render time via `{{price:<slug>}}` (`src/lib/blog-answer-normalize.ts`, resolved in `getBlogArticleBySlug`) — 153 articles use it, so blog prices follow the 15-minute price sync instead of going stale. Unresolvable tokens degrade to "price on the product page"; the generator refuses tokens in title / meta / excerpt.
- Quick answers / FAQ answers / `abstract` are emitted as plain text (no raw `<strong>`, `**`, `&lt;a`).
- Wrong model codes fixed (PowerPort 25W A2322K11 → A2656111; T03S Pro BT 5.3 / 30H → carton BT 5.2, 7h/35h), phantom rows / placeholder tables removed from category hubs, smart-watch "Bluetooth calling" → call notifications (no mic), unsourced statistics and acoustic dB figures removed or attributed, "official/authorized warranty" self-claims → written store warranty, `verify.anker.com` (does not resolve) → `anker.com/verify`, chip IDs removed unless backed by a verified teardown URL.
- Recalls: blog recall notice (35 live articles), recall badge on listing cards, conditional A1681 wording that is true today.
- Product pages: `aiTldr[0]` is now a ≤50-word, price-free, visible answer-first lead under the H1 (117/117); 32 FAQ pairs lead with the product's own measured/rated fact.

**Entity graph / structured data**
- Linked `@id`s: `BlogPosting #article` + `isPartOf #website`, `FAQPage #faq`, Blog node on `/blog`, AboutPage / ContactPage, Speakable `mainEntity #product`.
- Article `citation` (external references, self-controlled hosts filtered) and `mentions` (PDP `#product` nodes).
- One `MerchantReturnPolicy` shape on the Offer and the org node (default `returnFees` = customer pays return shipping, `itemDefectReturnFees` = free; no blanket `FullRefund`). Follow-up 2026-10-05: the first version dropped the default `returnFees`, and Search Console flagged "Missing field returnFees" on merchant listings — Google documents it as the default fee type that the remorse/defect properties override, so it is back on both nodes.
- Brand `@id`s on CollectionPage `about`; `knowsAbout` Things with verified Wikidata (power bank Q2208745, USB-C Q20026619, USB PD Q56120131); Anker `sameAs` → the brand article; JBL manufacturer = Harman International (Q1585599).
- Removed misapplied HowTo on category pages, duplicate microdata on generic hubs, `inLanguage` on Product.

**LLM-facing surfaces**
- `llms.txt`: buying-guides map (one canonical answer page per common question), recall answer, returns + warranty answers, corrected delivery window, deterministic markdown-twin URLs.
- Markdown twins: `/en` home, `locations/*`, blog "products discussed" + sources; paths without a generator 404 instead of returning a stub; `Accept: text/markdown` only rewrites paths that have a twin.
- Sitemap: 0 of 836 URLs without `lastmod`; product dates from `src/data/catalog-lastmod.generated.ts` (content-hash based, deterministic; `price-sync.yml` regenerates it, non-fatal). `feed.xml` language fixed; `/api/discover-feed?locale=en`; WebSub ping on reveal.
- `/api/products` defaults to the 117 active items (`?status=all` opts out).

**Semantic structure / internal links**
- `/blog` lists all 229 live guides grouped by topic (crawlable, no new URLs); category guide rails ranked by body-link relevance + pinned explainers; PDP "Guides about this product" rail; blog product rail orders body-linked products first.
- Arabic breadcrumb names, Arabic plural agreement, Egyptian query words (وصلة شاحن، راس شاحن، سمارت) where natural, an explicit "Is CairoVolt the official Anker agent? No." FAQ on the Anker hub.

## Ranking-surface changes (all evidenced defects; everything else is byte-identical to live)

| Page | Field | Change |
|---|---|---|
| `/en/joyroom/cables` | title, H1 | "Auto-Disconnect Tech" (no stocked SKU has it) → "USB-C PD & Lightning" |
| `/joyroom/cables`, `/en/joyroom/cables` | meta description | Auto-Disconnect clause → connector list |
| `/joyroom/smart-watches` (both) | meta description | Bluetooth calling → call notifications |
| PowerPort 25W PDP (both) | H1 | A2322K11 → A2656111 (the store's own MPN/label) |
| T03S Pro PDP (both) | H1 | dropped "30H / Bluetooth 5.3" (carton: BT 5.2) |
| 2 Anker verify articles (AR) | meta description | `verify.anker.com` → `anker.com/verify`; dropped "(AN + أرقام)" |
| best-gan-multi-port (both) | meta description | 1,299 → 1,999; truncated "wi..." completed |
| best-power-bank-egypt-2026, new-driver (both) | meta description | "official warranty" → "written store warranty" |
| 2 `/solutions/*` (both) | meta description | unsourced "≈12W" / "5–12W" figures removed |

Owner-approved second batch (2026-10-05, "fix compliance + numbers only"):

| Page | Field | Change |
|---|---|---|
| anker-nano-30w (both) | meta, excerpt | A2741 → A2147 (the body's product); "16 Pro Max 0→50% in 30 min" (never measured) → measured iPhone 15 0→50% ≈27 min |
| PowerCore 10000 review (both) | meta, excerpt | 447 g / 267 g → measured 394 g / ≈214 g, as in the body |
| anker-agent warranty article (both) | title/H1, meta, excerpt | "Anker 18-month warranty" → 18-month **store** warranty (rule 3) |
| 3-meter cable (both) | meta | "6 cables 150–450 EGP, voltage-drop tests, 18-month" → what the body says (no 3 m SKU; longest in stock 1.8 m) |
| 2 Anker power-bank price guides (EN) | title/H1, excerpt | "Official Warranty" → "Store Warranty" |
| 20W–100W guide (AR) | meta | "من 199ج" → 236ج (cheapest charger the article lists) |
| why-phone-charging-slowly (both) | meta, excerpt | unverifiable "500+ support tickets" removed |
| usb-c-cable-guide (EN) | meta, excerpt | "lab test … on 5 cables" → spec comparison of 5 types, two bench-measured |
| `/shipping` (both) | meta description | 1–5 → 1–6 business days (matches body / governorate data) |
| joyroom/smart-watches | meta keywords | dropped "bluetooth calling watch" / "ساعة مكالمات بلوتوث" |

Deliberately left: manufacturer-attributed ANC figures in names/metas (A30i 46dB, Liberty 4 Pro 43dB), tone words ("ultimate", "من الأكثر مبيعاً"), samsung price article ("half the price" holds for Joyroom 25W 342 vs 750–950), best-gan "from 490" (the 280 Joyroom is a single-port aside).

## Owner decisions (not done — need you)

1. **Fabricated reviews — owner chose to leave as is (2026-10-05) pending confirmation of provenance.** `src/data/reviews/*` (commit `41465d2df`, "seed authentic reviews with realistic firestore/order IDs") and `c47c0cc47` ("upgrade all product reviews below 4.7 to 4.7-4.9") are emitted as `Review` + `AggregateRating` JSON-LD on 4 live pages (R50i NC, Liberty 4 NC × 2 locales). If they are not from real delivered orders: stop emitting, delete the seed files and `/api/admin/seed-reviews`.
2. ~~Locked SERP fields contradicting corrected bodies~~ — fixed in the batch above.
3. **Physical / accounting checks:** JR-T012 price 1,624 EGP; Anker 310 jacket (TPE vs braided); PowerCore 20000 hero vs the stocked A1260011; joyroom-car-phone-mount mechanical vs magnetic.
4. **People:** is "Eng. Omar Khaled — Lead Technician" a real, consenting employee, and is there a lab in New Cairo (registered office is New Damietta)? Until confirmed, no Person schema / named bylines.
5. **Satellite pages** linking back (tumblr cairovolteg, gamesuy.wordpress, github althaqelco guide, yumpu upload, rubygems gem) — link-scheme risk. **On-site side DONE:** the 9 article references that pointed to them were removed in `17e3e6b0a`; a live scan of all 836 sitemap pages + llms/feeds/knowledge-graph found 0 links; `src/lib/self-controlled-hosts.ts` now filters them out of every reference surface (visible "further reading", Article.citation, markdown twins) so a re-added one never renders. **Off-site side (owner):** the pages themselves still exist on those platforms — take them down or remove their links to cairovolt.com from those accounts.
6. **Bing Webmaster Tools**: verify via GSC import, submit sitemap.xml, image-sitemap.xml, /api/discover-feed.
7. **Merchant Center** return settings must match the corrected schema (remorse = customer pays, defect = free).

## Deferred (deliberately)

98-article quick-answer trim (snippet churn risk); DefinedTermSet glossary (low value vs rails); FAQPage JSON-LD on hubs (deliberately removed earlier); bulk `modifiedDate` backfill (false freshness); ~412 remaining editor-directive lines in `src/data/details` methodology/notes (rendered on /lab — needs its own sweep); `/verify` has no server-rendered H1 (pre-existing).
