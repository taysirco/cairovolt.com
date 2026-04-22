import { NextResponse } from 'next/server';

/**
 * MCP Discovery — /.well-known/mcp.json
 * 
 * Legacy/alternative MCP discovery endpoint.
 * Some clients check this path for MCP server metadata.
 * Redirects semantically to the canonical server card.
 */

export const revalidate = 86400;

export function GET() {
    const mcpDiscovery = {
        mcp: {
            version: '1.0.0',
            serverCard: 'https://cairovolt.com/.well-known/mcp/server-card.json',
            transport: {
                type: 'streamable-http',
                url: 'https://cairovolt.com/api/v1/mcp',
            },
        },
    };

    return NextResponse.json(mcpDiscovery, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
