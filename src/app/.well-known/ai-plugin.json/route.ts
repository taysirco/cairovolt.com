import { NextResponse } from 'next/server';

/**
 * AI Plugin Manifest — /.well-known/ai-plugin.json
 * 
 * Standard discovery file for AI agents (ChatGPT Plugins, Gemini, etc.)
 * Points to the OpenAPI spec for auto-discovery of available actions.
 */

export async function GET() {
    const manifest = {
        schema_version: 'v1',
        name_for_human: 'CairoVolt Egypt',
        name_for_model: 'cairovolt',
        description_for_human: 'Buy original Anker & Joyroom accessories in Egypt — power banks, chargers, earbuds, cables with official warranty and Cash on Delivery.',
        description_for_model: 'CairoVolt is the authorized distributor for Anker and Joyroom in Egypt. Use this plugin to check product availability, prices (in EGP), and place orders with Cash on Delivery. Products are lab-tested for Egyptian conditions (heat, power outages, voltage fluctuation). Shipping covers all 27 Egyptian governorates. Free shipping above 500 EGP.',
        auth: {
            type: 'none',
        },
        api: {
            type: 'openapi',
            url: 'https://cairovolt.com/api/openapi.json',
        },
        logo_url: 'https://cairovolt.com/logo.png',
        contact_email: 'support@cairovolt.com',
        legal_info_url: 'https://cairovolt.com/en/terms',
    };

    return NextResponse.json(manifest, {
        headers: {
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
