/**
 * 🎟️ POST /api/v1/coupons/validate {code} — تحقق واجهة الـcheckout من كوبون
 * وكيل خادمي لـ validateCoupon (سر الـCRM يبقى خادمياً) — الواجهة لم تعد تحمل قائمة ثابتة.
 */
import { NextResponse } from 'next/server';
import { validateCoupon } from '@/lib/coupons';

export async function POST(req: Request) {
    let code = '';
    try {
        const body = await req.json();
        code = String(body?.code || '');
    } catch { /* جسم فارغ */ }
    const v = await validateCoupon(code);
    return NextResponse.json({ valid: v.valid, type: v.type, value: v.value });
}
