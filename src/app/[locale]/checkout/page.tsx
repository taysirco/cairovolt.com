"use client";

import { useState, useEffect, useRef } from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useCart } from '@/context/CartContext';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { trackBeginCheckout } from '@/lib/analytics';
import { ttqInitiateCheckout } from '@/lib/tiktokPixel';
import { getShippingFee, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
import { BostaTracker } from '@/lib/bosta';
import { BUNDLE_DISCOUNT_PERCENT } from '@/lib/bundle-policy';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';

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

// Inline (per-field) validation errors shown under the checkout inputs.
interface CheckoutFieldErrors {
    customerName?: string;
    phone?: string;
    whatsapp?: string;
    city?: string;
    address?: string;
}

// ═══════════ Order error localization ═══════════
// The order API returns mixed-language strings (English rate-limit/validation
// copy, Arabic catalog/coupon copy). Map the known ones to the visitor's
// locale instead of surfacing raw server text.
function localizeOrderError(status: number | null, raw: unknown, isArabic: boolean): string {
    const message = typeof raw === 'string' ? raw.trim() : '';
    if (status === 429) {
        return isArabic
            ? 'تم استلام محاولات كثيرة خلال وقت قصير. انتظر دقيقة ثم اضغط «تأكيد الطلب» مرة أخرى.'
            : 'Too many attempts in a short time. Please wait a minute, then tap "Place Order" again.';
    }
    if (status === 500 || status === 503) {
        return isArabic
            ? 'الخدمة غير متاحة مؤقتاً. حاول مرة أخرى بعد قليل.'
            : 'The service is temporarily unavailable. Please try again in a moment.';
    }
    if (message.startsWith('Invalid Egyptian phone number')) {
        return isArabic
            ? 'رقم الهاتف غير صحيح. يجب أن يبدأ بـ 01 ويتكون من 11 رقم.'
            : 'Invalid phone number. Must start with 01 and be 11 digits.';
    }
    if (message === 'Invalid WhatsApp number') {
        return isArabic
            ? 'رقم الواتساب غير صحيح. يجب أن يبدأ بـ 01 ويتكون من 11 رقم.'
            : 'Invalid WhatsApp number. Must start with 01 and be 11 digits.';
    }
    if (['Missing required fields', 'Invalid order details', 'Invalid item details', 'Invalid item quantity.'].includes(message)) {
        return isArabic
            ? 'بعض بيانات الطلب غير مكتملة أو غير صحيحة. راجع الحقول ثم حاول مرة أخرى.'
            : 'Some order details are missing or invalid. Please review the fields and try again.';
    }
    if (message.includes('كود الخصم')) {
        return isArabic
            ? message
            : 'The coupon code is invalid or expired — remove or correct it, then confirm the order again.';
    }
    if (message.includes('منتج غير معروف')) {
        return isArabic
            ? message
            : 'An item in your order is not recognized. Refresh the page and try again.';
    }
    if (message.includes('خيار المنتج')) {
        return isArabic
            ? message
            : 'Please select the product option (capacity/model) before ordering.';
    }
    if (message.includes('يطابق أكثر من منتج')) {
        return isArabic
            ? message
            : 'A product code matched more than one product. Refresh the page and try again.';
    }
    // Unmapped server copy: show it only when it matches the page language.
    if (message && /[؀-ۿ]/.test(message) === isArabic) {
        return message;
    }
    return isArabic
        ? 'تعذر إتمام الطلب. حاول مرة أخرى.'
        : 'Unable to place the order. Please try again.';
}

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
// 🎟️ التحقق ديناميكي من سيستم الحسابات عبر /api/v1/coupons/validate —
// كوبونات المؤثرين الجديدة تعمل فور إنشائها بلا أي نشر (القائمة الثابتة أُزيلت).
async function validateCouponRemote(code: string): Promise<{ valid: boolean; type: 'percent' | 'fixed'; value: number }> {
    try {
        const res = await fetch('/api/v1/coupons/validate', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
        });
        if (res.ok) return await res.json();
    } catch { /* شبكة */ }
    return { valid: false, type: 'percent', value: 0 };
}

export default function CheckoutPage() {
    const t = useTranslations('Checkout');
    const locale = useLocale();
    const isArabic = locale === 'ar';
    const router = useRouter();
    const { items: cartItems, totalAmount, clearCart, addToCart, isLoaded } = useCart();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const directBuyProcessedRef = useRef(false);

    // Inline validation + submit error state (replaces the old alert() dialogs)
    const [fieldErrors, setFieldErrors] = useState<CheckoutFieldErrors>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const whatsappInputRef = useRef<HTMLInputElement>(null);
    const citySelectRef = useRef<HTMLSelectElement>(null);
    const addressInputRef = useRef<HTMLTextAreaElement>(null);
    const errorBannerRef = useRef<HTMLDivElement>(null);

    // Coupon state
    const [couponInput, setCouponInput] = useState('');
    const [couponCode, setCouponCode] = useState<string | null>(null);
    const [couponType, setCouponType] = useState<'percent' | 'fixed'>('percent');
    const [couponValue, setCouponValue] = useState(0);
    const [couponChecking, setCouponChecking] = useState(false);
    const [couponLabel, setCouponLabel] = useState('');
    const [couponError, setCouponError] = useState('');

    const governorates = isArabic ? GOVERNORATES.ar : GOVERNORATES.en;
    const currency = isArabic ? 'جنيه' : 'EGP';

    // Auto-fill coupon from verify flow (localStorage)
    useEffect(() => {
        try {
            const fromVerify = localStorage.getItem('cv_verify_completed') === 'true';
            if (fromVerify && !couponCode) {
                // Auto-apply the warranty activation thank-you discount.
                const code = 'WARRANTY10';
                validateCouponRemote(code).then((v) => {
                    if (!v.valid) return;
                    setCouponInput(code);
                    setCouponCode(code);
                    setCouponType(v.type);
                    setCouponValue(v.value);
                    setCouponLabel(isArabic ? 'خصم 10% — شكر تفعيل الضمان' : '10% Off — Warranty Activation Thank You');
                });
            }
        } catch { /* private browsing */ }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Coupon handlers
    const handleApplyCoupon = async () => {
        setCouponError('');
        const code = couponInput.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '').slice(0, 24);
        if (!code || couponChecking) return;
        setCouponChecking(true);
        const v = await validateCouponRemote(code);
        setCouponChecking(false);
        if (v.valid && v.value > 0) {
            setCouponCode(code);
            setCouponType(v.type);
            setCouponValue(v.value);
            setCouponLabel(
                v.type === 'fixed'
                    ? (isArabic ? `خصم ${v.value.toLocaleString()} جنيه` : `EGP ${v.value.toLocaleString()} Off`)
                    : (isArabic ? `خصم ${v.value}%` : `${v.value}% Off`)
            );
            setCouponError('');
            // GA4 event
            const analyticsWindow = window as unknown as {
                gtag?: (command: string, eventName: string, parameters: Record<string, unknown>) => void;
            };
            if (typeof analyticsWindow.gtag === 'function') {
                analyticsWindow.gtag('event', 'coupon_applied', { coupon_code: code, discount: v.value });
            }
        } else {
            setCouponCode(null);
            setCouponValue(0);
            setCouponLabel('');
            setCouponError(isArabic ? 'كود الخصم غير صالح أو منتهي الصلاحية' : 'Invalid or expired coupon code');
        }
    };

    const handleRemoveCoupon = () => {
        setCouponCode(null);
        setCouponValue(0);
        setCouponLabel('');
        setCouponInput('');
        setCouponError('');
    };

    // Calculated amounts
    const discountAmount = couponCode
        ? (couponType === 'fixed' ? Math.min(Math.round(couponValue), totalAmount) : Math.round(totalAmount * (couponValue / 100)))
        : 0;
    // A combo discounts one unit of each distinct product in the set. Extra
    // quantities keep their normal price, matching the server-side quote.
    const bundleDiscount = (() => {
        const groups: Record<string, Map<string, number>> = {};
        for (const it of cartItems) {
            if (!it.bundleId) continue;
            const group = groups[it.bundleId] || (groups[it.bundleId] = new Map());
            if (!group.has(it.productId)) group.set(it.productId, it.price || 0);
        }
        let d = 0;
        for (const group of Object.values(groups)) {
            if (group.size < 2) continue;
            const oneSetTotal = [...group.values()].reduce((sum, price) => sum + price, 0);
            d += Math.round(oneSetTotal * BUNDLE_DISCOUNT_PERCENT / 100);
        }
        return Math.min(d, totalAmount - discountAmount);
    })();
    const subtotalAfterDiscount = totalAmount - discountAmount - bundleDiscount;
    const shipping = getShippingFee(city, subtotalAfterDiscount);
    // Per-governorate published delivery estimate (same source as product and
    // location pages) — shown once the customer selects a governorate.
    const deliveryEstimate = city
        ? BostaTracker.getRegionalStats(city, locale).delivery_estimate
        : null;
    // Free-shipping progress — mirrors the cart drawer nudge, using the same
    // subtotal the shipping fee is computed from.
    const freeShippingAmountLeft = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalAfterDiscount);
    const freeShippingProgress = Math.min((subtotalAfterDiscount / FREE_SHIPPING_THRESHOLD) * 100, 100);
    // Direct-buy URL support for the documented product page action.
    useEffect(() => {
        const addSku = searchParams.get('add_sku');
        if (addSku && !directBuyProcessedRef.current) {
            directBuyProcessedRef.current = true;
            // Fetch product by SKU and add to cart
            fetch(`/api/products?sku=${encodeURIComponent(addSku)}`)
                .then(res => res.ok ? res.json() : null)
                .then(payload => {
                    const product = Array.isArray(payload?.items) ? payload.items[0] : null;
                    const price = Number(product?.price);
                    const stock = Number(product?.stock);
                    if (product && Number.isFinite(price) && price > 0 && stock > 0) {
                        const translation = product.translations?.[isArabic ? 'ar' : 'en']
                            || product.translations?.en;
                        const primaryImage = product.images?.find((image: { isPrimary?: boolean }) => image.isPrimary)
                            || product.images?.[0];
                        addToCart({
                            productId: product.slug || product.id || addSku,
                            sku: product.sku || addSku,
                            name: translation?.name || product.slug || addSku,
                            price,
                            image: primaryImage?.url || '',
                            brand: product.brand,
                            quantity: 1,
                        });
                    }
                })
                .catch(() => { /* silently fail for invalid SKU */ });
        }
    }, [searchParams, addToCart, isArabic]);

    // Redirect if cart is empty (only after localStorage has been loaded)
    useEffect(() => {
        if (isLoaded && !loading && cartItems.length === 0 && !searchParams.get('add_sku')) {
            router.push('/');
        }
    }, [cartItems, loading, router, searchParams, isLoaded]);

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
            const tiktokContents = cartItems.map(item => ({
                content_id: item.sku || item.productId,
                content_name: item.name,
                price: item.price,
                quantity: item.quantity,
            }));
            ttqInitiateCheckout({
                content_id: tiktokContents[0].content_id,
                content_ids: tiktokContents.map(item => item.content_id),
                contents: tiktokContents,
                content_name: cartItems.map(item => item.name).join(', '),
                value: totalAmount,
                quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
            });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Validate Egyptian phone number format
    const isPhoneValid = (number: string) => /^01[0125][0-9]{8}$/.test(number);

    // Localized per-field validation copy (mirrors the server rules in /api/orders)
    const phoneFormatError = isArabic
        ? 'رقم الهاتف غير صحيح. يجب أن يبدأ بـ 01 ويتكون من 11 رقم.'
        : 'Invalid phone number. Must start with 01 and be 11 digits.';
    const whatsappFormatError = isArabic
        ? 'رقم الواتساب غير صحيح. يجب أن يبدأ بـ 01 ويتكون من 11 رقم.'
        : 'Invalid WhatsApp number. Must start with 01 and be 11 digits.';

    const clearFieldError = (field: keyof CheckoutFieldErrors) => {
        setFieldErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

    // Handle phone input - convert Arabic to English
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const converted = convertArabicToEnglish(e.target.value);
        setPhone(converted.replace(/[^0-9]/g, ''));
        clearFieldError('phone');
    };

    // Surface a phone format problem as soon as the customer leaves the field
    const handlePhoneBlur = () => {
        if (phone && !isPhoneValid(phone)) {
            setFieldErrors(prev => ({ ...prev, phone: phoneFormatError }));
        }
    };

    // Handle WhatsApp input - convert Arabic to English
    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const converted = convertArabicToEnglish(e.target.value);
        setWhatsapp(converted.replace(/[^0-9]/g, ''));
        clearFieldError('whatsapp');
    };

    const handleWhatsappBlur = () => {
        if (whatsapp && !isPhoneValid(whatsapp)) {
            setFieldErrors(prev => ({ ...prev, whatsapp: whatsappFormatError }));
        }
    };

    // Move keyboard focus (and the viewport) to a field that failed validation
    const focusInvalidField = (el: HTMLElement | null) => {
        if (!el) return;
        el.focus({ preventScroll: true });
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    // Scroll the submit-error banner into view when a server failure surfaces
    useEffect(() => {
        if (submitError && errorBannerRef.current) {
            errorBannerRef.current.focus({ preventScroll: true });
            errorBannerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [submitError]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitError(null);

        const formData = new FormData(event.currentTarget);
        const customerNameValue = String(formData.get('customerName') || '').trim();
        const addressValue = String(formData.get('address') || '').trim();

        // Inline validation — same rules the order API enforces server-side.
        const errors: CheckoutFieldErrors = {};
        if (customerNameValue.length < 2) {
            errors.customerName = isArabic ? 'من فضلك اكتب الاسم بالكامل.' : 'Please enter your full name.';
        }
        if (!isPhoneValid(phone)) {
            errors.phone = phoneFormatError;
        }
        if (whatsapp && !isPhoneValid(whatsapp)) {
            errors.whatsapp = whatsappFormatError;
        }
        if (!city) {
            errors.city = isArabic ? 'اختر المحافظة لمعرفة الشحن.' : 'Select your governorate for shipping.';
        }
        if (addressValue.length < 5) {
            errors.address = isArabic
                ? 'اكتب العنوان بالتفصيل: الشارع، المبنى، الطابق، علامة مميزة.'
                : 'Please enter your full address: street, building, floor, landmark.';
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            if (errors.customerName) focusInvalidField(nameInputRef.current);
            else if (errors.phone) focusInvalidField(phoneInputRef.current);
            else if (errors.whatsapp) focusInvalidField(whatsappInputRef.current);
            else if (errors.city) focusInvalidField(citySelectRef.current);
            else if (errors.address) focusInvalidField(addressInputRef.current);
            return;
        }
        setFieldErrors({});
        setLoading(true);

        const finalTotal = subtotalAfterDiscount + shipping;
        const cityValue = formData.get('city') as string;
        const cityLabel = governorates.find(g => g.value === cityValue)?.label || cityValue;

        const orderData = {
            customerName: formData.get('customerName'),
            phone: phone,
            whatsapp: whatsapp || phone,
            address: formData.get('address'),
            city: cityValue,
            cityLabel: cityLabel,
            items: cartItems,
            totalAmount: finalTotal, // Send final total including shipping
            subtotal: totalAmount, // Original subtotal before discount
            // Coupon data
            couponCode: couponCode || null,
            couponDiscount: discountAmount, // Absolute discount value in EGP
            couponType, couponValue, // نوع وقيمة الكوبون (percent% أو مبلغ ثابت)
            bundleDiscount, // 🏆 خصم الكومبو 5% (عرض؛ الخادم يعيد حسابه من الكتالوج)
        };

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            const result = await res.json();
            if (!res.ok) {
                setSubmitError(localizeOrderError(res.status, result?.error, isArabic));
                setLoading(false);
                return;
            }

            const serverPricing = result.pricing || {};
            const confirmedSubtotal = Number(serverPricing.subtotalBeforeDiscount ?? totalAmount);
            const confirmedCouponDiscount = Number(serverPricing.couponDiscount ?? discountAmount);
            const confirmedBundleDiscount = Number(serverPricing.bundleDiscount ?? bundleDiscount);
            const confirmedShipping = Number(serverPricing.shippingFee ?? shipping);
            const confirmedTotal = Number(serverPricing.totalAmount ?? finalTotal);
            const confirmedItems = Array.isArray(result.items) ? result.items : cartItems;

            if (typeof result.orderId !== 'string' || !result.orderId) {
                setSubmitError(isArabic
                    ? 'تم استلام رد غير مكتمل من الخادم. حاول تأكيد الطلب مرة أخرى.'
                    : 'The server returned an incomplete response. Please place the order again.');
                setLoading(false);
                return;
            }

            // Prepare order data for confirmation page
            const confirmData = {
                orderId: result.orderId,
                customerName: formData.get('customerName') as string,
                phone: phone,
                whatsapp: whatsapp || phone,
                address: formData.get('address') as string,
                city: cityValue,
                cityLabel: cityLabel,
                items: confirmedItems,
                subtotal: confirmedSubtotal,
                couponCode: couponCode || null,
                couponDiscount: confirmedCouponDiscount,
                bundleDiscount: confirmedBundleDiscount,
                subtotalAfterDiscount: confirmedSubtotal - confirmedCouponDiscount - confirmedBundleDiscount,
                shipping: confirmedShipping,
                total: confirmedTotal,
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
        } catch {
            // Network failure or a non-JSON response — the form state is preserved.
            setSubmitError(isArabic
                ? 'حدث خطأ أثناء إرسال الطلب. تأكد من اتصالك بالإنترنت ثم حاول مرة أخرى.'
                : 'An error occurred while placing your order. Check your connection and try again.');
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
                                <span>
                                    {isArabic ? localizeArabicBrandNames(item.name) : item.name} x{item.quantity}
                                </span>
                                <span className="font-bold">{item.price * item.quantity} {currency}</span>
                            </div>
                        ))}

                        {/* Subtotal */}
                        <div className="flex justify-between pt-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>{isArabic ? 'المجموع الفرعي' : 'Subtotal'}</span>
                            <span>{totalAmount.toLocaleString()} {currency}</span>
                        </div>

                        {/* Coupon — compact inline */}
                        <div className="pt-3 pb-1">
                            {!couponCode ? (
                                <div className="flex gap-1.5 items-center">
                                    <input
                                        type="text"
                                        value={couponInput}
                                        onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleApplyCoupon())}
                                        placeholder={isArabic ? 'كود خصم إن وجد' : 'Coupon code (if any)'}
                                        className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-xs dark:bg-gray-700 font-mono tracking-wider text-center focus:ring-1 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all"
                                        dir="ltr"
                                        id="summary-coupon-input"
                                        autoComplete="off"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleApplyCoupon}
                                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-xs transition-colors whitespace-nowrap"
                                        id="summary-coupon-btn"
                                    >
                                        {isArabic ? 'تطبيق' : 'Apply'}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-800">
                                    <span className="text-xs font-bold text-green-700 dark:text-green-400 font-mono flex items-center gap-1">
                                        ✅ {couponCode}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleRemoveCoupon}
                                        className="text-red-400 hover:text-red-600 text-[10px] font-medium transition-colors"
                                        id="summary-coupon-remove"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                            {couponError && (
                                <p className="text-red-500 text-[10px] mt-1 animate-pulse">❌ {couponError}</p>
                            )}
                        </div>

                        {/* Discount line */}
                        {couponCode && discountAmount > 0 && (
                            <div className="flex justify-between pt-2 text-sm text-green-600 font-medium">
                                <span>🎁 {couponLabel || (isArabic ? 'خصم الكوبون' : 'Coupon discount')}</span>
                                <span>- {discountAmount.toLocaleString()} {currency}</span>
                            </div>
                        )}

                        {/* 🏆 Golden Combo discount line */}
                        {bundleDiscount > 0 && (
                            <div className="flex justify-between pt-2 text-sm text-green-600 font-medium">
                                <span>🏆 {isArabic ? 'خصم الكومبو الذهبي' : 'Golden Combo discount'}</span>
                                <span>- {bundleDiscount.toLocaleString()} {currency}</span>
                            </div>
                        )}

                        {/* Shipping line */}
                        <div className="flex justify-between pt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>{isArabic ? 'الشحن' : 'Shipping'}</span>
                            <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                                {shipping === 0
                                    ? (isArabic ? 'مجاني ✅' : 'Free ✅')
                                    : (!city ? (isArabic ? 'حدد المحافظة' : 'Select Governorate') : `${shipping} ${currency}`)
                                }
                            </span>
                        </div>

                        {/* Per-governorate delivery estimate (published shipping-policy range) */}
                        {deliveryEstimate && (
                            <div className="flex justify-between pt-1 text-xs text-gray-500 dark:text-gray-400">
                                <span>
                                    <SvgIcon name="truck" className="w-3.5 h-3.5 inline-block" /> {isArabic ? 'موعد الوصول' : 'Delivery'}
                                </span>
                                <span>{deliveryEstimate}</span>
                            </div>
                        )}

                        {/* Free Shipping nudge — same logic as the cart drawer */}
                        {freeShippingAmountLeft > 0 && (
                            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <p className="mb-2 text-xs text-center font-medium text-gray-700 dark:text-gray-300">
                                    {isArabic ? 'أضف منتجات بقيمة' : 'Add items worth'}{' '}
                                    <span className="font-bold text-blue-600 dark:text-blue-400">{freeShippingAmountLeft.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}</span>
                                    {' '}{isArabic ? 'للحصول على شحن مجاني' : 'for Free Shipping'}
                                </p>
                                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                        style={{ width: `${freeShippingProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Final total */}
                        <div className="flex justify-between pt-4 mt-2 border-t-2 border-gray-300 dark:border-gray-600 text-lg font-bold">
                            <span>{isArabic ? 'الإجمالي' : 'Total'}</span>
                            <span className={(!city && shipping !== 0) ? "text-amber-500 text-sm" : "text-green-600"}>
                                {(!city && shipping !== 0) 
                                    ? (isArabic ? 'حدد المحافظة أولاً' : 'Select Gov First')
                                    : `${(subtotalAfterDiscount + shipping).toLocaleString()} ${currency}`
                                }
                            </span>
                        </div>

                        <p className="text-sm text-gray-500 mt-2"><SvgIcon name="money" className="w-4 h-4 inline-block" /> {t('cashOnDelivery')}</p>
                    </div>

                    {/* Checkout Form */}
                    <form onSubmit={handleSubmit} noValidate className="bg-white dark:bg-gray-900 p-6 rounded-2xl border space-y-4">
                        <h2 className="font-bold mb-4">{t('shippingInfo')}</h2>

                        <div>
                            <label htmlFor="checkout-name" className="block text-sm font-medium mb-1">
                                {isArabic ? 'الاسم بالكامل' : 'Full Name'}
                            </label>
                            <input
                                id="checkout-name"
                                ref={nameInputRef}
                                name="customerName"
                                required
                                autoComplete="name"
                                onChange={() => clearFieldError('customerName')}
                                aria-invalid={fieldErrors.customerName ? true : undefined}
                                aria-describedby={fieldErrors.customerName ? 'checkout-name-error' : undefined}
                                className={`w-full border rounded-lg p-3 dark:bg-gray-800 ${fieldErrors.customerName ? 'border-red-500 dark:border-red-500' : 'dark:border-gray-700'}`}
                                placeholder={isArabic ? 'أحمد محمد' : 'Ahmed Mohamed'}
                            />
                            {fieldErrors.customerName && (
                                <p id="checkout-name-error" className="text-red-500 text-xs mt-1">{fieldErrors.customerName}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="checkout-phone" className="block text-sm font-medium mb-1">{t('phone')}</label>
                            <input
                                id="checkout-phone"
                                ref={phoneInputRef}
                                name="phone"
                                type="tel"
                                required
                                autoComplete="tel"
                                value={phone}
                                onChange={handlePhoneChange}
                                onBlur={handlePhoneBlur}
                                maxLength={11}
                                aria-invalid={fieldErrors.phone ? true : undefined}
                                aria-describedby={fieldErrors.phone ? 'checkout-phone-error' : undefined}
                                className={`w-full border rounded-lg p-3 dark:bg-gray-800 ${fieldErrors.phone ? 'border-red-500 dark:border-red-500' : 'dark:border-gray-700'}`}
                                placeholder="01xxxxxxxxx"
                                dir="ltr"
                            />
                            {fieldErrors.phone && (
                                <p id="checkout-phone-error" className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="checkout-whatsapp" className="block text-sm font-medium mb-1">
                                {isArabic ? 'رقم الواتساب (اختياري)' : 'WhatsApp Number (Optional)'}
                            </label>
                            <input
                                id="checkout-whatsapp"
                                ref={whatsappInputRef}
                                name="whatsapp"
                                type="tel"
                                value={whatsapp}
                                onChange={handleWhatsappChange}
                                onBlur={handleWhatsappBlur}
                                maxLength={11}
                                aria-invalid={fieldErrors.whatsapp ? true : undefined}
                                aria-describedby={fieldErrors.whatsapp ? 'checkout-whatsapp-error' : undefined}
                                className={`w-full border rounded-lg p-3 dark:bg-gray-800 ${fieldErrors.whatsapp ? 'border-red-500 dark:border-red-500' : 'dark:border-gray-700'}`}
                                placeholder={isArabic ? '01xxxxxxxxx (اتركه فارغ إذا كان نفس رقم الهاتف)' : '01xxxxxxxxx (Leave empty if same as phone)'}
                                dir="ltr"
                            />
                            {fieldErrors.whatsapp && (
                                <p id="checkout-whatsapp-error" className="text-red-500 text-xs mt-1">{fieldErrors.whatsapp}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="checkout-city" className="block text-sm font-medium mb-1">{t('governorate')}</label>
                            <select
                                id="checkout-city"
                                ref={citySelectRef}
                                name="city"
                                required
                                value={city}
                                onChange={(e) => { setCity(e.target.value); clearFieldError('city'); }}
                                aria-invalid={fieldErrors.city ? true : undefined}
                                aria-describedby={fieldErrors.city ? 'checkout-city-error' : undefined}
                                className={`w-full border rounded-lg p-3 dark:bg-gray-800 ${fieldErrors.city ? 'border-red-500 dark:border-red-500' : 'dark:border-gray-700'}`}
                            >
                                <option value="" disabled>{isArabic ? 'اختر المحافظة لمعرفة الشحن' : 'Select Governorate for shipping'}</option>
                                {governorates.map((gov) => (
                                    <option key={gov.value} value={gov.value}>{gov.label}</option>
                                ))}
                            </select>
                            {fieldErrors.city && (
                                <p id="checkout-city-error" className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="checkout-address" className="block text-sm font-medium mb-1">{t('address')}</label>
                            <textarea
                                id="checkout-address"
                                ref={addressInputRef}
                                name="address"
                                required
                                autoComplete="street-address"
                                onChange={() => clearFieldError('address')}
                                aria-invalid={fieldErrors.address ? true : undefined}
                                aria-describedby={fieldErrors.address ? 'checkout-address-error' : undefined}
                                className={`w-full border rounded-lg p-3 h-24 dark:bg-gray-800 ${fieldErrors.address ? 'border-red-500 dark:border-red-500' : 'dark:border-gray-700'}`}
                                placeholder={isArabic ? 'الشارع، المبنى، الطابق، علامة مميزة' : 'Street, Building, Floor, Landmark'}
                            />
                            {fieldErrors.address && (
                                <p id="checkout-address-error" className="text-red-500 text-xs mt-1">{fieldErrors.address}</p>
                            )}
                        </div>



                        {/* Compact trust line at the decisive moment (badges grid repeats the details below) */}
                        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-gray-600 dark:text-gray-400 text-center">
                            <span className="inline-flex items-center gap-1">
                                <SvgIcon name="money" className="w-3.5 h-3.5" /> {isArabic ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
                            </span>
                            <span aria-hidden="true">·</span>
                            <Link
                                href="/return-policy"
                                className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-2 hover:text-green-600 transition-colors"
                            >
                                <SvgIcon name="arrows-rotate" className="w-3.5 h-3.5" /> {isArabic ? 'استبدال واسترجاع خلال 14 يوم' : 'Returns & Exchange within 14 days'}
                            </Link>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1">
                                <SvgIcon name="shield" className="w-3.5 h-3.5" /> {isArabic ? 'ضمان المنتج حسب البراند' : 'Product Warranty by Brand'}
                            </span>
                        </div>

                        {/* Order-failure banner — dismissible, keeps the form state intact */}
                        {submitError && (
                            <div
                                ref={errorBannerRef}
                                tabIndex={-1}
                                role="alert"
                                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 outline-none"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <p className="text-sm font-bold text-red-700 dark:text-red-400">{submitError}</p>
                                    <button
                                        type="button"
                                        onClick={() => setSubmitError(null)}
                                        aria-label={isArabic ? 'إغلاق التنبيه' : 'Dismiss error'}
                                        className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors shrink-0"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <p className="text-xs text-red-600 dark:text-red-300 mt-2">
                                    {isArabic
                                        ? 'بياناتك وسلة مشترياتك محفوظة — راجعها ثم اضغط «تأكيد الطلب» مرة أخرى.'
                                        : 'Your details and cart are saved — review them, then tap "Place Order" again.'}
                                </p>
                                <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                                    {isArabic ? 'لو المشكلة استمرت، اطلب مباشرة عبر واتساب: ' : 'If the problem persists, order directly via WhatsApp: '}
                                    <a
                                        href="https://wa.me/201558245974"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-bold underline"
                                        dir="ltr"
                                    >
                                        01558245974
                                    </a>
                                </p>
                            </div>
                        )}

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
                                {isArabic
                                    ? 'تظهر مدة ضمان كايرو فولت وشروطه في صفحة كل منتج.'
                                    : 'The applicable CairoVolt warranty duration and terms are stated on each product page.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
