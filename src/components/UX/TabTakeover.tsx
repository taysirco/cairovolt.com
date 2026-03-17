'use client';
import { useEffect } from 'react';

/**
 * TabTakeover — Changes the browser tab title when the user switches away
 * to encourage return to the tab. Restores original title on focus.
 */
export default function TabTakeover({ productName }: { productName: string }) {
    useEffect(() => {
        const originalTitle = document.title;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                document.title = `⏳ ${productName} — ارجع كمّل طلبك!`;
            } else {
                document.title = originalTitle;
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [productName]);

    return null;
}
