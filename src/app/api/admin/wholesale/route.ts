import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NextRequest, NextResponse } from 'next/server';
import { isAdminSessionValid } from '@/lib/admin-session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RESPONSE_HEADERS = {
    'Cache-Control': 'private, no-store, no-cache, max-age=0, must-revalidate',
    'Pragma': 'no-cache',
    'Referrer-Policy': 'no-referrer',
    'Vary': 'Cookie',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex',
};

const DASHBOARD_PATH = join(
    process.cwd(),
    'src',
    'server',
    'wholesale-dashboard.html',
);

export async function GET(request: NextRequest) {
    if (!isAdminSessionValid(request)) {
        return new NextResponse('Unauthorized', {
            status: 401,
            headers: {
                ...RESPONSE_HEADERS,
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });
    }

    try {
        const dashboard = await readFile(DASHBOARD_PATH, 'utf8');

        return new NextResponse(dashboard, {
            status: 200,
            headers: {
                ...RESPONSE_HEADERS,
                'Content-Type': 'text/html; charset=utf-8',
            },
        });
    } catch {
        return new NextResponse('Dashboard unavailable', {
            status: 500,
            headers: {
                ...RESPONSE_HEADERS,
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });
    }
}
