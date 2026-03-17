'use client';

import dynamic from 'next/dynamic';

const CartDrawer = dynamic(() => import('@/components/cart/CartDrawer'), {
    ssr: false,
});

const TrafficSource = dynamic(() => import('@/components/content/TrafficSource'), {
    ssr: false
});

interface LazyClientComponentsProps {
    locale: string;
}

export default function LazyClientComponents({ locale }: LazyClientComponentsProps) {
    return (
        <>
            <TrafficSource />
            <CartDrawer locale={locale} />
        </>
    );
}
