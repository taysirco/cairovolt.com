import { NextResponse } from 'next/server';

/**
 * Agent Skill: CairoVolt Product Lookup
 * /.well-known/agent-skills/cairovolt-product-lookup/SKILL.md
 * 
 * Spec: https://agentskills.io/specification
 * 
 * This SKILL.md file provides AI agents with structured instructions
 * for searching CairoVolt's product catalog, checking availability,
 * and retrieving lab test results.
 */

export const revalidate = 86400;

export function GET() {
    const skillMd = `---
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

    return new NextResponse(skillMd, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
