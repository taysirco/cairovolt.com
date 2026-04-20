"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { trackPurchase, trackPrintInvoice, trackWhatsappClick } from '@/lib/analytics';
import { ttqPlaceAnOrder, ttqCompletePayment } from '@/lib/tiktokPixel';
import ShareButtons from '@/components/products/ShareButtons';

interface OrderItem {
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface OrderData {
    orderId: string;
    customerName: string;
    phone: string;
    whatsapp: string;
    address: string;
    city: string;
    cityLabel: string;
    items: OrderItem[];
    subtotal: number;
    couponCode?: string | null;
    couponDiscount?: number;
    subtotalAfterDiscount?: number;
    shipping: number;
    total: number;
    orderDate: string;
}

// Bilingual Governorate labels
const GOVERNORATE_LABELS: Record<string, { ar: string; en: string }> = {
    'cairo': { ar: 'القاهرة', en: 'Cairo' },
    'giza': { ar: 'الجيزة', en: 'Giza' },
    'alexandria': { ar: 'الإسكندرية', en: 'Alexandria' },
    'qalyubia': { ar: 'القليوبية', en: 'Qalyubia' },
    'dakahlia': { ar: 'الدقهلية', en: 'Dakahlia' },
    'sharqia': { ar: 'الشرقية', en: 'Sharqia' },
    'gharbia': { ar: 'الغربية', en: 'Gharbia' },
    'monufia': { ar: 'المنوفية', en: 'Monufia' },
    'beheira': { ar: 'البحيرة', en: 'Beheira' },
    'kafr-el-sheikh': { ar: 'كفر الشيخ', en: 'Kafr El Sheikh' },
    'damietta': { ar: 'دمياط', en: 'Damietta' },
    'port-said': { ar: 'بورسعيد', en: 'Port Said' },
    'ismailia': { ar: 'الإسماعيلية', en: 'Ismailia' },
    'suez': { ar: 'السويس', en: 'Suez' },
    'fayoum': { ar: 'الفيوم', en: 'Fayoum' },
    'beni-suef': { ar: 'بني سويف', en: 'Beni Suef' },
    'minya': { ar: 'المنيا', en: 'Minya' },
    'asyut': { ar: 'أسيوط', en: 'Asyut' },
    'sohag': { ar: 'سوهاج', en: 'Sohag' },
    'qena': { ar: 'قنا', en: 'Qena' },
    'luxor': { ar: 'الأقصر', en: 'Luxor' },
    'aswan': { ar: 'أسوان', en: 'Aswan' },
    'red-sea': { ar: 'البحر الأحمر', en: 'Red Sea' },
    'north-sinai': { ar: 'شمال سيناء', en: 'North Sinai' },
    'south-sinai': { ar: 'جنوب سيناء', en: 'South Sinai' },
    'matrouh': { ar: 'مطروح', en: 'Matrouh' },
    'new-valley': { ar: 'الوادي الجديد', en: 'New Valley' },
};

function ConfirmContent() {
    const searchParams = useSearchParams();
    const locale = useLocale();
    const isArabic = locale === 'ar';
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(true);

    const currency = isArabic ? 'جنيه' : 'EGP';

    useEffect(() => {
        // Get order data from URL params or sessionStorage
        const orderParam = searchParams.get('order');

        if (orderParam) {
            try {
                const decoded = JSON.parse(decodeURIComponent(orderParam));
                setOrderData(decoded);
            } catch (e) {
                console.error('Failed to parse order data from URL');
            }
        } else {
            // Try sessionStorage
            try {
                const stored = sessionStorage.getItem('lastOrder');
                if (stored) {
                    setOrderData(JSON.parse(stored));
                }
            } catch (e) {
                console.error('Failed to read order data from sessionStorage');
            }
        }
        setLoading(false);
    }, [searchParams]);

    // Analytics: log order on confirmation page
    useEffect(() => {
        if (orderData) {
            trackPurchase(
                orderData.orderId,
                orderData.items.map(item => ({
                    item_id: item.name,
                    item_name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                orderData.total,
                orderData.shipping
            );

            // TikTok Pixel: CompletePayment — fires on the actual confirmation page
            // Dedup: only fire once per order to avoid double-counting with checkout
            const ttqKey = `ttq_complete_${orderData.orderId}`;
            try {
                if (!sessionStorage.getItem(ttqKey)) {
                    sessionStorage.setItem(ttqKey, '1');
                    const contentIds = orderData.items.map(i => i.name).join(',');
                    const contentNames = orderData.items.map(i => i.name).join(', ');
                    const totalQty = orderData.items.reduce((s, i) => s + i.quantity, 0);
                    ttqPlaceAnOrder({
                        content_id: contentIds,
                        content_name: contentNames,
                        value: orderData.total,
                        quantity: totalQty,
                    });
                    ttqCompletePayment({
                        content_id: contentIds,
                        content_name: contentNames,
                        value: orderData.total,
                        quantity: totalQty,
                    });
                }
            } catch {
                // sessionStorage may be unavailable in private browsing
            }
        }
    }, [orderData]);

    // Resolve governorate label based on locale
    const getGovLabel = (cityKey: string, fallbackLabel: string) => {
        const gov = GOVERNORATE_LABELS[cityKey];
        if (gov) return isArabic ? gov.ar : gov.en;
        return fallbackLabel;
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="animate-pulse">{isArabic ? 'جاري التحميل...' : 'Loading...'}</div>
            </div>
        );
    }

    if (!orderData) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="bg-yellow-50 p-8 rounded-2xl max-w-md mx-auto">
                    <div className="text-5xl mb-4">⚠</div>
                    <h1 className="text-2xl font-bold text-yellow-700 mb-2">
                        {isArabic ? 'لا يوجد طلب' : 'No Order Found'}
                    </h1>
                    <p className="text-gray-600">
                        {isArabic ? 'لم يتم العثور على بيانات الطلب.' : 'Order data could not be found.'}
                    </p>
                    <Link
                        href="/"
                        className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {isArabic ? 'العودة للتسوق' : 'Back to Shopping'}
                    </Link>
                </div>
            </div>
        );
    }

    return (
            <div className="container mx-auto px-4 py-8 max-w-3xl" dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-green-700 mb-2">
                        {isArabic ? 'تم تأكيد طلبك بنجاح!' : 'Your Order is Confirmed!'}
                    </h1>
                    <p className="text-gray-600">
                        {isArabic ? 'شكراً لك على ثقتك في كايرو فولت' : 'Thank you for choosing CairoVolt'}
                    </p>
                </div>

                {/* Order ID and Date */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl mb-6 shadow-lg">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div>
                            <p className="text-blue-100 text-sm">{isArabic ? 'رقم الطلب' : 'Order Number'}</p>
                            <p className="text-2xl font-bold font-mono">{orderData.orderId}</p>
                        </div>
                        <div className={isArabic ? 'text-left' : 'text-right'}>
                            <p className="text-blue-100 text-sm">{isArabic ? 'تاريخ الطلب' : 'Order Date'}</p>
                            <p className="font-bold">{orderData.orderDate}</p>
                        </div>
                    </div>
                </div>

                {/* Order Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Customer Info */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border shadow-sm">
                        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-2xl">👤</span> {isArabic ? 'بيانات العميل' : 'Customer Details'}
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                                <span className="text-gray-500">{isArabic ? 'الاسم' : 'Name'}</span>
                                <span className="font-medium">{orderData.customerName}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                                <span className="text-gray-500">{isArabic ? 'الهاتف' : 'Phone'}</span>
                                <span className="font-medium font-mono" dir="ltr">{orderData.phone}</span>
                            </div>
                            {orderData.whatsapp && orderData.whatsapp !== orderData.phone && (
                                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                                    <span className="text-gray-500">{isArabic ? 'واتساب' : 'WhatsApp'}</span>
                                    <span className="font-medium font-mono" dir="ltr">{orderData.whatsapp}</span>
                                </div>
                            )}
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                                <span className="text-gray-500">{isArabic ? 'المحافظة' : 'Governorate'}</span>
                                <span className="font-medium">{getGovLabel(orderData.city, orderData.cityLabel)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border shadow-sm">
                        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <SvgIcon name="pin" className="w-6 h-6 inline-block" /> {isArabic ? 'عنوان التوصيل' : 'Delivery Address'}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{orderData.address}</p>
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                <SvgIcon name="truck" className="w-4 h-4 inline-block" /> {isArabic ? 'سيتم التوصيل خلال 2-5 أيام عمل' : 'Delivery within 2-5 business days'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Products Invoice */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border shadow-sm mb-6">
                    <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <SvgIcon name="cart" className="w-6 h-6 inline-block" /> {isArabic ? 'تفاصيل الفاتورة' : 'Invoice Details'}
                    </h2>

                    {/* Products List */}
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {orderData.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between py-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100 dark:border-gray-700">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-1"
                                                sizes="64px"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <SvgIcon name="package" className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm sm:text-base line-clamp-2">{item.name}</p>
                                        <p className="text-sm text-gray-500 mt-1">{isArabic ? 'الكمية' : 'Qty'}: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className={`${isArabic ? 'text-left' : 'text-right'} flex-shrink-0 ms-2`}>
                                    <p className="font-bold text-sm sm:text-base">{(item.price * item.quantity).toLocaleString()} {currency}</p>
                                    {item.quantity > 1 && (
                                        <p className="text-xs text-gray-500">{item.price.toLocaleString()} × {item.quantity}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div className="mt-4 pt-4 border-t-2 border-gray-200 dark:border-gray-700 space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>{isArabic ? 'المجموع الفرعي' : 'Subtotal'}</span>
                            <span>{orderData.subtotal.toLocaleString()} {currency}</span>
                        </div>
                        {/* Coupon discount line */}
                        {orderData.couponCode && orderData.couponDiscount && orderData.couponDiscount > 0 && (
                            <div className="flex justify-between text-green-600 font-medium">
                                <span className="flex items-center gap-1">
                                    🎁 {isArabic ? `كوبون ${orderData.couponCode}` : `Coupon ${orderData.couponCode}`}
                                </span>
                                <span>- {orderData.couponDiscount.toLocaleString()} {currency}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-gray-600">
                            <span>{isArabic ? 'الشحن' : 'Shipping'}</span>
                            <span className={orderData.shipping === 0 ? 'text-green-600 font-medium' : ''}>
                                {orderData.shipping === 0 ? <>{isArabic ? 'مجاني' : 'Free'} <SvgIcon name="gift" className="w-4 h-4 inline-block" /></> : `${orderData.shipping} ${currency}`}
                            </span>
                        </div>
                        <div className="flex justify-between text-xl font-bold pt-2 border-t">
                            <span>{isArabic ? 'الإجمالي' : 'Total'}</span>
                            <span className="text-green-600">{orderData.total.toLocaleString()} {currency}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl mb-6 border border-green-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <SvgIcon name="money" className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="font-bold text-green-800 dark:text-green-400">
                                {isArabic ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
                            </h3>
                            <p className="text-sm text-green-600 dark:text-green-500">
                                {isArabic
                                    ? `ادفع ${orderData.total.toLocaleString()} جنيه عند استلام الطلب`
                                    : `Pay ${orderData.total.toLocaleString()} EGP upon receiving your order`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* What's Next */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border shadow-sm mb-6">
                    <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <SvgIcon name="clipboard" className="w-6 h-6 inline-block" /> {isArabic ? 'الخطوات القادمة' : 'What\'s Next'}
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold text-sm">1</span>
                            </div>
                            <div>
                                <p className="font-medium">{isArabic ? 'سنتواصل معك قريباً' : 'We\'ll contact you soon'}</p>
                                <p className="text-sm text-gray-500">{isArabic ? 'للتأكد من بيانات الطلب والعنوان' : 'To verify your order details and address'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold text-sm">2</span>
                            </div>
                            <div>
                                <p className="font-medium">{isArabic ? 'تجهيز الطلب' : 'Order Processing'}</p>
                                <p className="text-sm text-gray-500">{isArabic ? 'سيتم تجهيز طلبك وشحنه خلال 24 ساعة' : 'Your order will be prepared and shipped within 24 hours'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-green-600 font-bold text-sm">3</span>
                            </div>
                            <div>
                                <p className="font-medium">{isArabic ? 'استلام الطلب والدفع' : 'Receive & Pay'}</p>
                                <p className="text-sm text-gray-500">{isArabic ? 'الدفع عند الاستلام نقداً للمندوب' : 'Pay cash to the courier upon delivery'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Share with Friends */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border shadow-sm mb-6 text-center">
                    <h2 className="font-bold text-lg mb-3">
                        {isArabic ? '📤 شارك المنتج مع أصدقائك!' : '📤 Share with your friends!'}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                        {isArabic ? 'ارسل الرابط لأصحابك عشان يستفيدوا بنفس العرض' : 'Send the link to your friends so they can get the same deal'}
                    </p>
                    <div className="flex justify-center">
                        <ShareButtons
                            slug={orderData.items[0]?.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || 'product'}
                            productName={orderData.items[0]?.name || ''}
                            price={orderData.total}
                            locale={locale}
                            compact={false}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-center"
                    >
                        {isArabic ? 'متابعة التسوق' : 'Continue Shopping'}
                    </Link>
                    <button
                        onClick={() => { trackPrintInvoice(orderData.orderId); window.print(); }}
                        className="px-8 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-colors"
                    >
                        <SvgIcon name="printer" className="w-5 h-5 inline-block" /> {isArabic ? 'طباعة الفاتورة' : 'Print Invoice'}
                    </button>
                </div>

                {/* WhatsApp Support */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm mb-2">{isArabic ? 'هل لديك استفسار؟' : 'Have a question?'}</p>
                    <a
                        href={`https://wa.me/201558245974?text=${encodeURIComponent(isArabic ? `استفسار عن الطلب رقم ${orderData.orderId}` : `Inquiry about order #${orderData.orderId}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsappClick('confirm')}
                        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                    >
                        <SvgIcon name="chat" className="w-5 h-5 inline-block" /> {isArabic ? 'تواصل معنا عبر واتساب' : 'Contact us on WhatsApp'}
                    </a>
                </div>
            </div>
    );
}

export default function ConfirmPage() {
    const locale = useLocale();
    const isArabic = locale === 'ar';

    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="animate-pulse">{isArabic ? 'جاري التحميل...' : 'Loading...'}</div>
            </div>
        }>
            <ConfirmContent />
        </Suspense>
    );
}
