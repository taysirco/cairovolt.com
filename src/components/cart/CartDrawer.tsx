"use client";

import { useEffect, useRef, useTransition } from 'react';
import { trackViewCart, trackRemoveFromCart } from '@/lib/analytics';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import { SvgIcon } from '@/components/ui/SvgIcon';

export default function CartDrawer({ locale }: { locale: string }) {
    const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, totalAmount, clearCart } = useCart();
    const t = useTranslations('Checkout'); // Reusing Checkout translations or Common
    const isRTL = locale === 'ar';
    const drawerRef = useRef<HTMLDivElement>(null);
    const [isTransitioning, startTransition] = useTransition();
    const scrollYRef = useRef(0);

    // Close on click/touch outside — handles both mouse AND touch (Safari mobile)
    useEffect(() => {
        function handleOutsideInteraction(event: MouseEvent | TouchEvent) {
            const target = event.target as Node;
            if (drawerRef.current && !drawerRef.current.contains(target)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideInteraction);
            document.addEventListener('touchstart', handleOutsideInteraction, { passive: true });

            // iOS Safari scroll lock: position:fixed + saved scroll prevents rubber-band bounce
            scrollYRef.current = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollYRef.current}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideInteraction);
            document.removeEventListener('touchstart', handleOutsideInteraction);

            // Restore scroll position on close
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            window.scrollTo(0, scrollYRef.current);
        };
    }, [isOpen, setIsOpen]);

    // Free Shipping Logic
    const FREE_SHIPPING_THRESHOLD = 500;
    const progress = Math.min((totalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const amountLeft = FREE_SHIPPING_THRESHOLD - totalAmount;
    const isFreeShipping = totalAmount >= FREE_SHIPPING_THRESHOLD;

    // ── GA4 Signal: view_cart when drawer opens ──
    useEffect(() => {
        if (isOpen && items.length > 0) {
            trackViewCart(
                items.map(item => ({
                    item_id: item.productId,
                    item_name: item.name,
                    item_brand: item.brand,
                    price: item.price,
                    quantity: item.quantity,
                })),
                totalAmount
            );
        }
    }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-all text-gray-900 dark:text-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>

            {/* Drawer Container */}
            <div
                ref={drawerRef}
                className={`w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? (isRTL ? 'translate-x-0' : 'translate-x-0') : (isRTL ? '-translate-x-full' : 'translate-x-full')
                    }`}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <h2 className="text-xl font-bold">{isRTL ? 'سلة المشتريات' : 'Shopping Cart'} ({items.length})</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        aria-label={isRTL ? 'إغلاق السلة' : 'Close cart'}
                    >
                        ✕
                    </button>
                </div>

                {/* Free Shipping Progress Bar (Gamification) */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20">
                    <div className="mb-2 text-sm text-center font-medium">
                        {isFreeShipping ? (
                            <span className="text-green-600 dark:text-green-400">
                                <SvgIcon name="gift" className="w-5 h-5 inline-block text-green-500" /> {isRTL ? 'مبروك! لقد حصلت على شحن مجاني' : 'Congrats! You got Free Shipping'}
                            </span>
                        ) : (
                            <span className="text-gray-700 dark:text-gray-300">
                                {isRTL ? 'أضف منتجات بقيمة' : 'Add items worth'}{' '}
                                <span className="font-bold text-blue-600 dark:text-blue-400">{amountLeft.toLocaleString()} {isRTL ? 'ج.م' : 'EGP'}</span>
                                {' '}{isRTL ? 'للحصول على شحن مجاني' : 'for Free Shipping'}
                            </span>
                        )}
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 rounded-full ${isFreeShipping ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Items List — momentum scrolling for iOS Safari */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ WebkitOverflowScrolling: 'touch' }}>
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                            <SvgIcon name="cart" className="w-10 h-10 mx-auto mb-2" />
                            <p>{isRTL ? 'السلة فارغة' : 'Your cart is empty'}</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="mt-4 text-blue-600 font-bold hover:underline"
                            >
                                {isRTL ? 'تصفح المنتجات' : 'Start Shopping'}
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.productId} className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                                {/* Image */}
                                <div className="w-20 h-20 bg-white rounded-lg p-1 relative flex-shrink-0 border border-gray-200 dark:border-gray-700">
                                    {item.image && (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="80px"
                                            className="object-contain"
                                        />
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-sm line-clamp-2">{item.name}</h3>
                                        <div className="text-gray-500 text-xs mt-1">{item.brand}</div>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="font-bold text-blue-600">
                                            {item.price.toLocaleString()} <span className="text-xs text-gray-500">{isRTL ? 'ج.م' : 'EGP'}</span>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 px-2 py-1">
                                            <button
                                                onClick={() => startTransition(() => updateQuantity(item.productId, item.quantity - 1))}
                                                className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-opacity"
                                                aria-label={isRTL ? 'تقليل الكمية' : 'Decrease quantity'}
                                            >
                                                -
                                            </button>
                                            <span className="text-sm font-medium min-w-[1rem] text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => startTransition(() => updateQuantity(item.productId, item.quantity + 1))}
                                                className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-opacity"
                                                aria-label={isRTL ? 'زيادة الكمية' : 'Increase quantity'}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => { trackRemoveFromCart({ item_id: item.productId, item_name: item.name, item_brand: item.brand, price: item.price, quantity: item.quantity }); startTransition(() => removeFromCart(item.productId)); }}
                                    className="text-gray-400 hover:text-red-500 transition-colors self-start"
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Actions */}
                {items.length > 0 && (
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500">{isRTL ? 'المجموع الفرعي' : 'Subtotal'}</span>
                            <span className="text-xl font-bold">{totalAmount.toLocaleString()} {isRTL ? 'ج.م' : 'EGP'}</span>
                        </div>

                        <Link
                            href={`/${locale}/checkout`}
                            onClick={() => setIsOpen(false)}
                            className="block w-full py-4 bg-green-600 hover:bg-green-700 text-white text-center font-bold rounded-xl shadow-lg shadow-green-600/20 transition-all transform active:scale-95"
                        >
                            {isRTL ? 'إتمام الطلب (الدفع عند الاستلام)' : 'Checkout (Cash on Delivery)'}
                        </Link>

                        <div className="mt-3 text-center">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white underline"
                            >
                                {isRTL ? 'تابع التسوق' : 'Continue Shopping'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
