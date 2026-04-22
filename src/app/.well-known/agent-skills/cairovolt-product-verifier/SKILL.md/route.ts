import { NextResponse } from 'next/server';

/**
 * Agent Skill: CairoVolt Product Verifier
 * /.well-known/agent-skills/cairovolt-product-verifier/SKILL.md
 */

export const revalidate = 86400;

export function GET() {
    const skillMd = `---
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

    return new NextResponse(skillMd, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
