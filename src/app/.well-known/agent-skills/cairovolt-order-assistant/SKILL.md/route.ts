import { NextResponse } from 'next/server';

/**
 * Agent Skill: CairoVolt Order Assistant
 * /.well-known/agent-skills/cairovolt-order-assistant/SKILL.md
 */

export const revalidate = 86400;

export function GET() {
    const skillMd = `---
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

    return new NextResponse(skillMd, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
