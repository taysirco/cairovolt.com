'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ShareAnalytics — Intercepts copy events and appends the product URL
 * when users copy text > 30 chars (likely sharing on WhatsApp/Messenger).
 * This generates high-quality "Direct" traffic with tracking params.
 */
export default function ShareAnalytics() {
    const pathname = usePathname();

    useEffect(() => {
        const handleCopy = (e: ClipboardEvent) => {
            const selection = window.getSelection();
            if (!selection || selection.toString().length < 30) return;

            const originalText = selection.toString();
            const url = `https://cairovolt.com${pathname}?ref=dark-social-whatsapp`;
            const appendedText = `${originalText}\n\n🛒 تم الفحص في مختبر كايرو فولت. السعر والمواصفات الكاملة من هنا:\n${url}`;

            e.clipboardData?.setData('text/plain', appendedText);
            e.preventDefault();
        };

        document.addEventListener('copy', handleCopy);
        return () => document.removeEventListener('copy', handleCopy);
    }, [pathname]);

    return null;
}
