import { NextResponse } from 'next/server';

/**
 * MCP Server Cards (Array) — /.well-known/mcp/server-cards.json
 * 
 * Array-format listing of all MCP servers hosted by this domain.
 * Some clients check this endpoint for multi-server discovery.
 * Points to the canonical single server card.
 */

export const revalidate = 86400;

export function GET() {
    const serverCards = {
        servers: [
            {
                name: 'CairoVolt Commerce',
                description: 'Egypt\'s authorized Anker & Joyroom distributor — product search, availability, orders, lab data.',
                serverCardUrl: 'https://cairovolt.com/.well-known/mcp/server-card.json',
                transport: {
                    type: 'streamable-http',
                    url: 'https://cairovolt.com/api/v1/mcp',
                },
            },
        ],
    };

    return NextResponse.json(serverCards, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
