# CairoVolt Environment Variables Setup

## Required for Google Indexing API (`src/app/api/google-index/route.ts`)

```bash
# Google Cloud Service Account for Indexing API
GOOGLE_CLIENT_EMAIL="cairovolt-indexer@your-project-id.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Bearer token to protect the webhook endpoint (choose your own strong secret)
INDEXING_WEBHOOK_SECRET="your-strong-random-secret-here"
```

## Required for Firebase Cloud Functions (`functions/index.js`)

Set these via `firebase functions:secrets:set`:

```bash
firebase functions:secrets:set INDEXING_WEBHOOK_SECRET
firebase functions:secrets:set GA4_MEASUREMENT_ID
firebase functions:secrets:set GA4_API_SECRET
```

Also set as regular env vars:
```bash
MERCHANT_CENTER_ID="your-merchant-center-id"
```

## Service Account Key Files (functions/ directory)

- `functions/cairovolt-indexing-key.json` — Google Cloud service account key (Indexing API scope)
- `functions/merchant-center-key.json` — Google Cloud service account key (Content API scope)

> **IMPORTANT:** These files are in `.gitignore`. Never commit them to version control.

## How to obtain these credentials

1. **Google Cloud Console** → Create project → Enable "Web Search Indexing API"
2. **IAM & Admin** → Service Accounts → Create → Download JSON key
3. **Google Search Console** → Add service account email as **Owner**
4. **Google Merchant Center** → Settings → Content API → Enable and link service account
5. **Google Analytics 4** → Admin → Data Streams → Measurement Protocol API secrets

## Optional

```bash
# Site URL (defaults to https://cairovolt.com)
NEXT_PUBLIC_SITE_URL="https://cairovolt.com"
```
