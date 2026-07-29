/**
 * 🏭 /api/admin/wholesale/prices — جسر لوحة الجملة إلى النظام المحاسبي.
 *
 * أسعار الجملة والضمان يملكها acc_products في الـCRM (حيث التكلفة والمخزون)، لا
 * localStorage المتصفح كما كان. هذا المسار وسيط فقط: يحمل سرّ الـCRM في الخادم ولا
 * يكشفه للوحة، ويشترط جلسة أدمن سارية تماماً كصفحة اللوحة نفسها.
 *
 * GET  → { items: [{ sku, wholesalePrice, warrantyMonths, sellPrice, name }] }
 * POST { items } → يعتمدها في المحاسبة ويعيد ملخّص ما تم تحديثه.
 */
import { NextRequest, NextResponse } from 'next/server';
import { isAdminSessionValid } from '@/lib/admin-session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const HEADERS = {
    'Cache-Control': 'private, no-store',
    'X-Robots-Tag': 'noindex, nofollow',
    'Referrer-Policy': 'no-referrer',
};

function crmEndpoint(): { url: string; secret: string } | null {
    const base = process.env.CRM_WEBHOOK_URL || '';
    const secret = process.env.CRM_WEBHOOK_SECRET || '';
    if (!base || !secret) return null;
    try {
        return { url: `${new URL(base).origin}/api/public/wholesale-prices`, secret };
    } catch {
        return null;
    }
}

export async function GET(request: NextRequest) {
    if (!isAdminSessionValid(request)) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: HEADERS });
    }
    const crm = crmEndpoint();
    if (!crm) {
        return NextResponse.json({ error: 'الربط بالنظام المحاسبي غير مُعد' }, { status: 503, headers: HEADERS });
    }
    try {
        const res = await fetch(crm.url, {
            headers: { Authorization: `Bearer ${crm.secret}` },
            signal: AbortSignal.timeout(10_000),
            cache: 'no-store',
        });
        if (!res.ok) {
            return NextResponse.json({ error: `المحاسبة ردّت ${res.status}` }, { status: 502, headers: HEADERS });
        }
        return NextResponse.json(await res.json(), { headers: HEADERS });
    } catch {
        // تعذّر الوصول لا يجب أن يعطّل اللوحة — تكمل بالنسخة المحفوظة محلياً
        return NextResponse.json({ error: 'تعذّر الاتصال بالنظام المحاسبي' }, { status: 502, headers: HEADERS });
    }
}

export async function POST(request: NextRequest) {
    if (!isAdminSessionValid(request)) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: HEADERS });
    }
    const crm = crmEndpoint();
    if (!crm) {
        return NextResponse.json({ error: 'الربط بالنظام المحاسبي غير مُعد' }, { status: 503, headers: HEADERS });
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'JSON غير صالح' }, { status: 400, headers: HEADERS });
    }
    const items = (body as { items?: unknown })?.items;
    if (!Array.isArray(items) || items.length === 0) {
        return NextResponse.json({ error: 'items مطلوبة' }, { status: 400, headers: HEADERS });
    }

    try {
        const res = await fetch(crm.url, {
            method: 'POST',
            headers: { Authorization: `Bearer ${crm.secret}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ items }),
            signal: AbortSignal.timeout(20_000),
        });
        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.ok ? 200 : 502, headers: HEADERS });
    } catch {
        return NextResponse.json({ error: 'تعذّر الاتصال بالنظام المحاسبي' }, { status: 502, headers: HEADERS });
    }
}
