'use client';

import Script from 'next/script';

export function GoogleAnalytics() {
    // GA4 Measurement ID
    const gaMeasurementId = 'G-ZH7YYZRWSE';

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gaMeasurementId}', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>
        </>
    );
}
