'use client';

import dynamic from 'next/dynamic';

const CartDrawer = dynamic(() => import('@/components/cart/CartDrawer'), {
    ssr: false,
});

const ReferralTracker = dynamic(() => import('@/components/seo/ReferralTracker'), {
    ssr: false
});

interface LazyClientComponentsProps {
    locale: string;
}

export default function LazyClientComponents({ locale }: LazyClientComponentsProps) {
    return (
        <>
            <ReferralTracker />
            <CartDrawer locale={locale} />
        </>
    );
}
