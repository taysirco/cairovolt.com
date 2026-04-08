"use client";

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useCart } from '@/context/CartContext';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { trackBeginCheckout } from '@/lib/analytics';
import { ttqInitiateCheckout } from '@/lib/tiktokPixel';
import type { Metadata } from 'next';

// Metadata must be exported from a server layout/page — this is handled by the
// checkout layout.tsx or the admin-level noindex. As a fallback, the middleware
// already blocks bots from /checkout via 410 Gone.

// All Egyptian Governorates (bilingual)
const GOVERNORATES = {
    en: [
        { value: 'cairo', label: 'Cairo' },
        { value: 'giza', label: 'Giza' },
        { value: 'alexandria', label: 'Alexandria' },
        { value: 'qalyubia', label: 'Qalyubia' },
        { value: 'dakahlia', label: 'Dakahlia' },
        { value: 'sharqia', label: 'Sharqia' },
        { value: 'gharbia', label: 'Gharbia' },
        { value: 'monufia', label: 'Monufia' },
        { value: 'beheira', label: 'Beheira' },
        { value: 'kafr-el-sheikh', label: 'Kafr El Sheikh' },
        { value: 'damietta', label: 'Damietta' },
        { value: 'port-said', label: 'Port Said' },
        { value: 'ismailia', label: 'Ismailia' },
        { value: 'suez', label: 'Suez' },
        { value: 'fayoum', label: 'Fayoum' },
        { value: 'beni-suef', label: 'Beni Suef' },
        { value: 'minya', label: 'Minya' },
        { value: 'asyut', label: 'Asyut' },
        { value: 'sohag', label: 'Sohag' },
        { value: 'qena', label: 'Qena' },
        { value: 'luxor', label: 'Luxor' },
        { value: 'aswan', label: 'Aswan' },
        { value: 'red-sea', label: 'Red Sea' },
        { value: 'north-sinai', label: 'North Sinai' },
        { value: 'south-sinai', label: 'South Sinai' },
        { value: 'matrouh', label: 'Matrouh' },
        { value: 'new-valley', label: 'New Valley' },
    ],
    ar: [
        { value: 'cairo', label: 'القاهرة' },
        { value: 'giza', label: 'الجيزة' },
        { value: 'alexandria', label: 'الإسكندرية' },
        { value: 'qalyubia', label: 'القليوبية' },
        { value: 'dakahlia', label: 'الدقهلية' },
        { value: 'sharqia', label: 'الشرقية' },
        { value: 'gharbia', label: 'الغربية' },
        { value: 'monufia', label: 'المنوفية' },
        { value: 'beheira', label: 'البحيرة' },
        { value: 'kafr-el-sheikh', label: 'كفر الشيخ' },
        { value: 'damietta', label: 'دمياط' },
        { value: 'port-said', label: 'بورسعيد' },
        { value: 'ismailia', label: 'الإسماعيلية' },
        { value: 'suez', label: 'السويس' },
        { value: 'fayoum', label: 'الفيوم' },
        { value: 'beni-suef', label: 'بني سويف' },
        { value: 'minya', label: 'المنيا' },
        { value: 'asyut', label: 'أسيوط' },
        { value: 'sohag', label: 'سوهاج' },
        { value: 'qena', label: 'قنا' },
        { value: 'luxor', label: 'الأقصر' },
        { value: 'aswan', label: 'أسوان' },
        { value: 'red-sea', label: 'البحر الأحمر' },
        { value: 'north-sinai', label: 'شمال سيناء' },
        { value: 'south-sinai', label: 'جنوب سيناء' },
        { value: 'matrouh', label: 'مطروح' },
        { value: 'new-valley', label: 'الوادي الجديد' },
    ],
};

// Convert Arabic numerals to English
function convertArabicToEnglish(str: string): string {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    let result = str;
    arabicNumerals.forEach((arabic, index) => {
        result = result.replace(new RegExp(arabic, 'g'), index.toString());
    });
    return result;
}

// ═══════════ Coupon System ═══════════
const VALID_COUPONS: Record<string, { discount: number; label: string; labelEn: string }> = {
    'ORIGINAL10': { discount: 0.10, label: 'خصم 10% — هدية التوثيق', labelEn: '10% Off — Verification Gift' },
};

export default function CheckoutPage() {
    const t = useTranslations('Checkout');
    const tCommon = useTranslations('Common');
    const locale = useLocale();
    const isArabic = locale === 'ar';
    const router = useRouter();
    const { items: cartItems, totalAmount, clearCart, addToCart } = useCart();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [directBuyProcessed, setDirectBuyProcessed] = useState(false);

    // Coupon state
    const [couponInput, setCouponInput] = useState('');
    const [couponCode, setCouponCode] = useState<string | null>(null);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [couponLabel, setCouponLabel] = useState('');
    const [couponError, setCouponError] = useState('');

    const governorates = isArabic ? GOVERNORATES.ar : GOVERNORATES.en;
    const currency = isArabic ? 'جنيه' : 'EGP';

    // Auto-fill coupon from verify flow (localStorage)
    useEffect(() => {
        try {
            const fromVerify = localStorage.getItem('cv_verify_completed') === 'true';
            if (fromVerify && !couponCode) {
                // Auto-apply the coupon silently
                const code = 'ORIGINAL10';
                const coupon = VALID_COUPONS[code];
                if (coupon) {
                    setCouponInput(code);
                    setCouponCode(code);
                    setCouponDiscount(coupon.discount);
                    setCouponLabel(isArabic ? coupon.label : coupon.labelEn);
                }
            }
        } catch { /* private browsing */ }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Coupon handlers
    const handleApplyCoupon = () => {
        setCouponError('');
        const code = couponInput.trim().toUpperCase();
        if (!code) return;
        const coupon = VALID_COUPONS[code];
        if (coupon) {
            setCouponCode(code);
            setCouponDiscount(coupon.discount);
            setCouponLabel(isArabic ? coupon.label : coupon.labelEn);
            setCouponError('');
            // GA4 event
            if (typeof (window as any).gtag === 'function') {
                (window as any).gtag('event', 'coupon_applied', { coupon_code: code, discount: coupon.discount });
            }
        } else {
            setCouponCode(null);
            setCouponDiscount(0);
            setCouponLabel('');
            setCouponError(isArabic ? 'كود الخصم غير صالح' : 'Invalid coupon code');
        }
    };

    const handleRemoveCoupon = () => {
        setCouponCode(null);
        setCouponDiscount(0);
        setCouponLabel('');
        setCouponInput('');
        setCouponError('');
    };

    // Calculated amounts
    const discountAmount = couponCode ? Math.round(totalAmount * couponDiscount) : 0;
    const subtotalAfterDiscount = totalAmount - discountAmount;
    const shipping = subtotalAfterDiscount >= 1350 ? 0 : 40;

    // Direct Buy URL support: ?add_sku=XXX (for BuyAction schema / M2M Commerce)
    useEffect(() => {
        const addSku = searchParams.get('add_sku');
        if (addSku && !directBuyProcessed) {
            setDirectBuyProcessed(true);
            // Fetch product by SKU and add to cart
            fetch(`/api/products?sku=${encodeURIComponent(addSku)}`)
                .then(res => res.ok ? res.json() : null)
                .then(product => {
                    if (product) {
                        addToCart({
                            productId: product.productId || product.id || addSku,
                            name: product.name || addSku,
                            price: product.price || 0,
                            image: product.image || '',
                            quantity: 1,
                        });
                    }
                })
                .catch(() => { /* silently fail for invalid SKU */ });
        }
    }, [searchParams, directBuyProcessed, addToCart]);

    // Redirect if cart is empty
    useEffect(() => {
        if (!loading && cartItems.length === 0 && !searchParams.get('add_sku')) {
            router.push('/');
        }
    }, [cartItems, loading, router, searchParams]);

    // Analytics: log checkout start
    useEffect(() => {
        if (cartItems.length > 0) {
            trackBeginCheckout(
                cartItems.map(item => ({
                    item_id: item.productId,
                    item_name: item.name,
                    item_brand: item.brand,
                    price: item.price,
                    quantity: item.quantity,
                })),
                totalAmount
            );
            // TikTok Pixel: InitiateCheckout
            ttqInitiateCheckout({ value: totalAmount });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Handle phone input - convert Arabic to English
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const converted = convertArabicToEnglish(e.target.value);
        setPhone(converted.replace(/[^0-9]/g, ''));
    };

    // Validate Egyptian phone number format
    const isPhoneValid = (number: string) => /^01[0125][0-9]{8}$/.test(number);

    // Handle WhatsApp input - convert Arabic to English
    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const converted = convertArabicToEnglish(e.target.value);
        setWhatsapp(converted.replace(/[^0-9]/g, ''));
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!isPhoneValid(phone)) {
            alert(isArabic ? 'رقم الهاتف غير صحيح. يجب أن يبدأ بـ 01 ويتكون من 11 رقم.' : 'Invalid phone number. Must start with 01 and be 11 digits.');
            return;
        }

        setLoading(true);

        const formData = new FormData(event.currentTarget);

        const finalTotal = subtotalAfterDiscount + shipping;
        const city = formData.get('city') as string;
        const cityLabel = governorates.find(g => g.value === city)?.label || city;

        const orderData = {
            customerName: formData.get('customerName'),
            phone: phone,
            whatsapp: whatsapp || phone,
            address: formData.get('address'),
            city: city,
            cityLabel: cityLabel,
            items: cartItems,
            totalAmount: finalTotal, // Send final total including shipping
            subtotal: totalAmount, // Original subtotal before discount
            // Coupon data
            couponCode: couponCode || null,
            couponDiscount: discountAmount, // Absolute discount value in EGP
            couponPercent: couponDiscount, // Discount rate (0.10 = 10%)
        };

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (!res.ok) throw new Error('Failed to place order');

            const result = await res.json();

            // Prepare order data for confirmation page
            const confirmData = {
                orderId: result.orderId || `CV-${Date.now().toString(36).toUpperCase()}`,
                customerName: formData.get('customerName') as string,
                phone: phone,
                whatsapp: whatsapp || phone,
                address: formData.get('address') as string,
                city: city,
                cityLabel: cityLabel,
                items: cartItems,
                subtotal: totalAmount,
                couponCode: couponCode || null,
                couponDiscount: discountAmount,
                subtotalAfterDiscount: subtotalAfterDiscount,
                shipping: shipping,
                total: finalTotal,
                orderDate: new Date().toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
            };

            // Store in sessionStorage for confirm page
            sessionStorage.setItem('lastOrder', JSON.stringify(confirmData));

            // Analytics: purchase + TikTok events fire on /confirm page only
            // (after the user sees the confirmation — the true conversion point)

            // Redirect FIRST, then clear cart (to avoid useEffect redirect to /)
            // Use next-intl router to handle locale prefix automatically
            router.push('/confirm');

            // Clear cart after navigation settles using a longer delay
            // loading stays true so useEffect won't redirect to home
            setTimeout(() => clearCart(), 1500);
        } catch (error) {
            alert(isArabic ? 'حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.' : 'An error occurred while placing your order. Please try again.');
            setLoading(false);
        }
    }

    return (
        <>
            <div className="container mx-auto px-4 py-12" dir={isArabic ? 'rtl' : 'ltr'}>
                <h1 className="text-3xl font-bold mb-8 text-center">{t('checkout')}</h1>

                <div className="max-w-2xl mx-auto grid gap-8">
                    {/* Order Summary */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl">
                        <h2 className="font-bold mb-4">{t('orderSummary')}</h2>
                        {cartItems.map((item, idx) => (
                            <div key={idx} className="flex justify-between py-2 border-b">
                                <span>{item.name} x{item.quantity}</span>
                                <span className="font-bold">{item.price * item.quantity} {currency}</span>
                            </div>
                        ))}

                        {/* Subtotal */}
                        <div className="flex justify-between pt-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>{isArabic ? 'المجموع الفرعي' : 'Subtotal'}</span>
                            <span>{totalAmount.toLocaleString()} {currency}</span>
                        </div>

                        {/* ═══ Coupon Input Section ═══ */}
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            {!couponCode ? (
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        🏷️ {isArabic ? 'كود الخصم' : 'Coupon Code'}
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={couponInput}
                                            onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleApplyCoupon())}
                                            placeholder={isArabic ? 'أدخل كود الخصم' : 'Enter coupon code'}
                                            className="flex-1 border rounded-lg p-2.5 text-sm dark:bg-gray-700 dark:border-gray-600 font-mono tracking-wider text-center"
                                            dir="ltr"
                                            id="coupon-input"
                                            autoComplete="off"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleApplyCoupon}
                                            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-colors text-sm whitespace-nowrap"
                                            id="coupon-apply-btn"
                                        >
                                            {isArabic ? 'تطبيق' : 'Apply'}
                                        </button>
                                    </div>
                                    {couponError && (
                                        <p className="text-red-500 text-xs mt-2 animate-pulse">
                                            ❌ {couponError}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600 text-lg">✅</span>
                                        <div>
                                            <p className="text-sm font-bold text-green-700 dark:text-green-400 font-mono">{couponCode}</p>
                                            <p className="text-xs text-green-600 dark:text-green-500">{couponLabel}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleRemoveCoupon}
                                        className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors"
                                        id="coupon-remove-btn"
                                    >
                                        {isArabic ? 'إزالة' : 'Remove'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Discount line */}
                        {couponCode && discountAmount > 0 && (
                            <div className="flex justify-between pt-2 text-sm text-green-600 font-medium">
                                <span>🎁 {isArabic ? `خصم ${Math.round(couponDiscount * 100)}%` : `${Math.round(couponDiscount * 100)}% Discount`}</span>
                                <span>- {discountAmount.toLocaleString()} {currency}</span>
                            </div>
                        )}

                        {/* Shipping line */}
                        <div className="flex justify-between pt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>{isArabic ? 'الشحن' : 'Shipping'}</span>
                            <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                                {shipping === 0 ? (isArabic ? 'مجاني ✅' : 'Free ✅') : `40 ${currency}`}
                            </span>
                        </div>

                        {/* Final total */}
                        <div className="flex justify-between pt-4 mt-2 border-t-2 border-gray-300 dark:border-gray-600 text-lg font-bold">
                            <span>{isArabic ? 'الإجمالي' : 'Total'}</span>
                            <span className="text-green-600">{(subtotalAfterDiscount + shipping).toLocaleString()} {currency}</span>
                        </div>

                        <p className="text-sm text-gray-500 mt-2"><SvgIcon name="money" className="w-4 h-4 inline-block" /> {t('cashOnDelivery')}</p>
                    </div>

                    {/* Checkout Form */}
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border space-y-4">
                        <h2 className="font-bold mb-4">{t('shippingInfo')}</h2>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {isArabic ? 'الاسم بالكامل' : 'Full Name'}
                            </label>
                            <input
                                name="customerName"
                                required
                                autoComplete="name"
                                className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700"
                                placeholder={isArabic ? 'أحمد محمد' : 'Ahmed Mohamed'}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">{t('phone')}</label>
                            <input
                                name="phone"
                                type="tel"
                                required
                                autoComplete="tel"
                                value={phone}
                                onChange={handlePhoneChange}
                                className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700"
                                placeholder="01xxxxxxxxx"
                                dir="ltr"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {isArabic ? 'رقم الواتساب (اختياري)' : 'WhatsApp Number (Optional)'}
                            </label>
                            <input
                                name="whatsapp"
                                type="tel"
                                value={whatsapp}
                                onChange={handleWhatsappChange}
                                className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700"
                                placeholder={isArabic ? '01xxxxxxxxx (اتركه فارغ إذا كان نفس رقم الهاتف)' : '01xxxxxxxxx (Leave empty if same as phone)'}
                                dir="ltr"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">{t('governorate')}</label>
                            <select name="city" required className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700">
                                <option value="">{isArabic ? 'اختر المحافظة' : 'Select Governorate'}</option>
                                {governorates.map((gov) => (
                                    <option key={gov.value} value={gov.value}>{gov.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">{t('address')}</label>
                            <textarea
                                name="address"
                                required
                                autoComplete="street-address"
                                className="w-full border rounded-lg p-3 h-24 dark:bg-gray-800 dark:border-gray-700"
                                placeholder={isArabic ? 'الشارع، المبنى، الطابق، علامة مميزة' : 'Street, Building, Floor, Landmark'}
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                        >
                            {loading
                                ? (isArabic ? 'جاري إرسال الطلب...' : 'Placing Order...')
                                : (isArabic ? 'تأكيد الطلب (الدفع عند الاستلام)' : 'Place Order (Cash on Delivery)')
                            }
                        </button>
                    </form>

                    {/* Quality Badges */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="p-4">
                                <div className="text-3xl mb-2"><SvgIcon name="money" className="w-8 h-8 mx-auto" /></div>
                                <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">
                                    {isArabic ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {isArabic ? 'ادفع لما الطلب يوصلك' : 'Pay when you receive'}
                                </p>
                            </div>
                            <div className="p-4">
                                <div className="text-3xl mb-2"><SvgIcon name="truck" className="w-8 h-8 mx-auto" /></div>
                                <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">
                                    {isArabic ? 'شحن لكل مصر' : 'Nationwide Shipping'}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {isArabic ? '27 محافظة' : '27 Governorates'}
                                </p>
                            </div>
                            <div className="p-4">
                                <div className="text-3xl mb-2"><SvgIcon name="arrows-rotate" className="w-8 h-8 mx-auto" /></div>
                                <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">
                                    {isArabic ? 'استبدال واسترجاع' : 'Returns & Exchange'}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {isArabic ? 'خلال 14 يوم' : 'Within 14 days'}
                                </p>
                            </div>
                            <div className="p-4">
                                <div className="text-3xl mb-2"><SvgIcon name="shield" className="w-8 h-8 mx-auto" /></div>
                                <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">
                                    {isArabic ? 'ضمان المنتج' : 'Product Warranty'}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {isArabic ? 'حسب البراند' : 'By Brand'}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                            <p className="text-xs text-gray-500">
                                🏪 <strong>Anker:</strong> {isArabic ? 'ضمان 18 شهر' : '18 month warranty'} |
                                🏪 <strong>Joyroom:</strong> {isArabic ? 'ضمان 12 شهر' : '12 month warranty'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
