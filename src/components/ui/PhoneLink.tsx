'use client';

import { useEffect, useState } from 'react';

/**
 * PhoneLink — Client-side-only phone link renderer.
 *
 * Prevents hydration mismatches caused by browser extensions (e.g., Skype,
 * Google Voice) that detect and replace phone numbers in the DOM between
 * server render and client hydration. By rendering the phone number only
 * after mount, we avoid the server/client DOM diff entirely.
 */
export function PhoneLink({
    phone,
    type = 'tel',
    className = '',
    children,
}: {
    phone: string;
    type?: 'tel' | 'whatsapp';
    className?: string;
    children: React.ReactNode;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const href = type === 'whatsapp'
        ? `https://wa.me/${phone.replace(/^\+/, '')}`
        : `tel:+${phone.replace(/^\+/, '')}`;

    // Before mount: render a span placeholder (no href = no extension interference)
    if (!mounted) {
        return (
            <span className={className} suppressHydrationWarning>
                {children}
            </span>
        );
    }

    // After mount: render the actual link
    return (
        <a
            href={href}
            className={className}
            {...(type === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
            {children}
        </a>
    );
}
