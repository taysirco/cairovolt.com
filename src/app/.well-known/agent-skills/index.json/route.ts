import { NextResponse } from 'next/server';
import { createHash } from 'crypto';

/**
 * Agent Skills Discovery Index — /.well-known/agent-skills/index.json
 * 
 * Cloudflare Agent Skills Discovery RFC v0.2.0
 * Spec: https://github.com/cloudflare/agent-skills-discovery-rfc
 * 
 * Enables AI agents to discover what skills CairoVolt publishes.
 * Uses progressive disclosure: agents load name+description first,
 * then fetch the full SKILL.md only when the skill is activated.
 * 
 * IMPORTANT: `digest` MUST be the SHA-256 of the SKILL.md raw bytes,
 * not a derived value. We compute it from the actual content served
 * by each SKILL.md route to ensure verification passes.
 */

export const revalidate = 86400; // 24h ISR

// ────────────────────────────────────────────────────────────────
// The SKILL.md content is duplicated here to compute accurate
// SHA-256 digests. If the SKILL.md route content changes, these
// must be updated in sync.
// ────────────────────────────────────────────────────────────────

const PRODUCT_LOOKUP_SKILL = `---
name: cairovolt-product-lookup
description: Search CairoVolt product catalog, check real-time availability and pricing in EGP, view independent lab test results, and place Cash on Delivery orders for Anker and Joyroom products in Egypt.
---

# CairoVolt Product Lookup

Search CairoVolt's product catalog for Anker and Joyroom mobile accessories in Egypt.

## Quick Start

Check if a product is available:

\`\`\`bash
curl "https://cairovolt.com/api/v1/checkout?q=anker+power+bank"
\`\`\`

Get a specific product by slug:

\`\`\`bash
curl "https://cairovolt.com/api/v1/checkout?slug=anker-737-powerbank"
\`\`\`

## Response Format

The API returns JSON with:
- \`available\`: boolean — whether the product is in stock
- \`product\`: object — name (en/ar), price (EGP), stock count, image URL
- \`shipping\`: object — fee (40 EGP, free above 500 EGP), estimated 1-3 days
- \`payment\`: object — Cash on Delivery
- \`actions.buy\`: object — ready-to-use POST action for placing an order

## Available Categories

- Power Banks (باور بانك)
- Wall Chargers (شاحن حائط)
- Car Chargers (شاحن سيارة)
- Cables (كابلات)
- Earbuds / Audio (سماعات)
- Speakers (سبيكر)
- Smart Watches (ساعات ذكية)
- Home UPS (يو بي اس منزلي)

## Brands

- **Anker** — Premium tier, 18-month warranty
- **Joyroom** — Value tier, 12-month warranty
- **Soundcore** — Audio sub-brand of Anker

## Lab Test Data

CairoVolt Labs independently tests every product at 37–42°C (Egyptian summer conditions).

Get full lab results:

\`\`\`bash
curl "https://cairovolt.com/api/lab-data/json"
\`\`\`

Get the full product catalog with lab data in markdown:

\`\`\`bash
curl "https://cairovolt.com/api/llms/catalog"
\`\`\`

## Key Facts

- All prices in EGP (Egyptian Pounds)
- Cash on Delivery to all 27 governorates
- Free shipping above 500 EGP
- C2PA verified authenticity (verify at cairovolt.com/verify)
- WhatsApp support: +201558245974

## OpenAPI Specification

Full API spec: https://cairovolt.com/api/openapi.json
`;

const ORDER_ASSISTANT_SKILL = `---
name: cairovolt-order-assistant
description: Help Egyptian customers place orders on CairoVolt via the M2M Commerce API.
---

# CairoVolt Order Assistant

Place Cash on Delivery orders for Anker and Joyroom products in Egypt.

## Quick Start

### Step 1: Find the product

\`\`\`bash
curl "https://cairovolt.com/api/v1/checkout?q=anker+737"
\`\`\`

### Step 2: Place the order

\`\`\`bash
curl -X POST "https://cairovolt.com/api/v1/checkout" \\
  -H "Content-Type: application/json" \\
  -d '{
    "slug": "anker-737-powerbank",
    "quantity": 1,
    "customerName": "Ahmed Mohamed",
    "phone": "+201012345678",
    "address": "15 شارع التحرير، وسط البلد",
    "city": "cairo"
  }'
\`\`\`

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| \`customerName\` | string | Full name in Arabic or English |
| \`phone\` | string | Egyptian mobile number (e.g., +201012345678) |
| \`address\` | string | Full delivery address |
| \`city\` | string | City or governorate (e.g., cairo, alexandria, giza) |

## Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| \`quantity\` | integer | 1 | Number of units |
| \`whatsapp\` | string | same as phone | WhatsApp number for order updates |

## Shipping Rules

- **Standard fee:** 40 EGP
- **Free shipping:** Orders above 500 EGP
- **Coverage:** All 27 Egyptian governorates
- **Delivery time:** 1–3 business days via Bosta courier

## Payment

- Cash on Delivery only — customer pays after inspecting the product
- No prepayment required

## Order Response

A successful order returns:
- \`order.id\` — Firestore document ID
- \`order.orderId\` — Human-readable ID (e.g., CV-123456)
- \`order.pricing\` — subtotal, shipping, total in EGP
- \`tracking.whatsapp\` — WhatsApp link for order updates

## Error Handling

| Status | Meaning |
|--------|---------|
| 400 | Missing required fields |
| 404 | Product not found |
| 409 | Product out of stock |

## API Specification

Full spec: https://cairovolt.com/api/openapi.json
`;

const PRODUCT_VERIFIER_SKILL = `---
name: cairovolt-product-verifier
description: Verify the authenticity of Anker and Joyroom products sold in Egypt using CairoVolt's C2PA digital fingerprinting system.
---

# CairoVolt Product Verifier

Verify product authenticity using CairoVolt's C2PA digital verification system.

## Quick Start

\`\`\`bash
curl -X POST "https://cairovolt.com/api/v1/verify-content" \\
  -H "Content-Type: application/json" \\
  -d '{"serial": "CV-A1B2C3D4E5F"}'
\`\`\`

## How It Works

1. Every CairoVolt product includes a warranty card with a **13-character serial number**
2. The serial format: \`CV-XXXXXXXXXXX\` (letters and numbers)
3. Each serial is cryptographically signed using **ES384 (ECDSA P-384 + SHA-384)**
4. The signing identity is \`did:web:cairovolt.com\`

## Verification Methods

### API Verification
POST to \`https://cairovolt.com/api/v1/verify-content\` with:
\`\`\`json
{ "serial": "CV-A1B2C3D4E5F" }
\`\`\`

### Web Verification
Direct customers to: \`https://cairovolt.com/verify\`
They enter the serial number from their warranty card.

## Response

A verified product returns:
- \`verified\`: true
- \`product\`: product name, brand, category
- \`purchaseDate\`: when it was sold
- \`warrantyExpiry\`: warranty end date
- \`c2pa.algorithm\`: ES384
- \`c2pa.identity\`: did:web:cairovolt.com

## C2PA Technical Details

| Field | Value |
|-------|-------|
| Standard | C2PA v1 (c2pa.org) |
| Identity | did:web:cairovolt.com |
| Algorithm | ES384 (ECDSA P-384 + SHA-384) |
| DID Document | https://cairovolt.com/.well-known/did.json |
| JWKS | https://cairovolt.com/.well-known/jwks.json |

## When to Use This Skill

- Customer asks "Is my Anker charger original?"
- Customer asks "هل المنتج ده أصلي؟" (Is this product genuine?)
- Customer has a serial number they want to verify
- Customer purchased from a third-party seller and wants authenticity confirmation
`;

export function GET() {
    // Compute REAL SHA-256 digests from the actual SKILL.md content
    const productLookupDigest = createHash('sha256').update(PRODUCT_LOOKUP_SKILL).digest('hex');
    const orderAssistantDigest = createHash('sha256').update(ORDER_ASSISTANT_SKILL).digest('hex');
    const productVerifierDigest = createHash('sha256').update(PRODUCT_VERIFIER_SKILL).digest('hex');

    const index = {
        $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
        skills: [
            {
                name: 'cairovolt-product-lookup',
                type: 'skill-md',
                description: 'Search CairoVolt product catalog, check real-time availability and pricing in EGP, view independent lab test results, and place Cash on Delivery orders for Anker and Joyroom products in Egypt. Covers power banks, chargers, earbuds, cables, speakers, and home UPS systems.',
                url: '/.well-known/agent-skills/cairovolt-product-lookup/SKILL.md',
                digest: `sha256:${productLookupDigest}`,
            },
            {
                name: 'cairovolt-order-assistant',
                type: 'skill-md',
                description: 'Help Egyptian customers place orders on CairoVolt via the M2M Commerce API. Handles product lookup by name or SKU, confirms availability, calculates shipping (free above 500 EGP), and submits Cash on Delivery orders to all 27 governorates.',
                url: '/.well-known/agent-skills/cairovolt-order-assistant/SKILL.md',
                digest: `sha256:${orderAssistantDigest}`,
            },
            {
                name: 'cairovolt-product-verifier',
                type: 'skill-md',
                description: 'Verify the authenticity of Anker and Joyroom products sold in Egypt using CairoVolt\'s C2PA digital fingerprinting system. Takes a 13-character serial number and returns cryptographic verification status.',
                url: '/.well-known/agent-skills/cairovolt-product-verifier/SKILL.md',
                digest: `sha256:${productVerifierDigest}`,
            },
        ],
    };

    return NextResponse.json(index, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
