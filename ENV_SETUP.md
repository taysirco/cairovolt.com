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

## Required for M2M Commerce API (`src/lib/api-auth.ts`)

```bash
# API Key for write operations (POST/PUT/DELETE on /api/products, /api/categories)
# Read operations and /api/v1/checkout remain public for AI agents
CAIROVOLT_API_KEY="your-strong-api-key-here"
```

## Content Credentials — C2PA Digital Signing (`src/lib/content-credentials.ts`)

Cryptographic proof that product images are real (not AI-generated).  
Uses ES384 (ECDSA P-384 + SHA-384). Keys are generated once and stored securely.

### Step 1 — Generate key pair (run once)

```bash
node scripts/generate-signing-keys.mjs
```

### Step 2 — Add to `.env.local`

```bash
# Base64-encoded PKCS8 PEM (keep SECRET — never commit)
CAIROVOLT_PRIVATE_KEY="LS0tLS1CRUdJTi..."

# Base64-encoded SPKI PEM (public — safe to expose)
CAIROVOLT_PUBLIC_KEY="LS0tLS1CRUdJTi..."
```

### Step 3 — Add to Google Secret Manager (production)

```bash
echo -n "$CAIROVOLT_PRIVATE_KEY" | gcloud secrets create CAIROVOLT_PRIVATE_KEY --data-file=-
echo -n "$CAIROVOLT_PUBLIC_KEY"  | gcloud secrets create CAIROVOLT_PUBLIC_KEY  --data-file=-
```

### Step 4 — Sign existing products (run once after key setup)

```bash
node scripts/sign-existing-products.mjs --dry-run   # preview
node scripts/sign-existing-products.mjs             # apply
```

### Verification endpoints (public, no auth required)

| Endpoint | Description |
|---|---|
| `GET /.well-known/did.json` | DID Document (`did:web:cairovolt.com`) |
| `GET /.well-known/jwks.json` | Public key (JWKS format) |
| `GET /api/v1/verify-content?slug=<slug>` | Verify a product by slug |
| `POST /api/v1/verify-content` | Verify a raw SignedCredential object |

---

## Optional

```bash
# Site URL (defaults to https://cairovolt.com)
NEXT_PUBLIC_SITE_URL="https://cairovolt.com"
```
