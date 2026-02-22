'use client';

import Script from 'next/script';

export function GoogleAnalytics() {
    // Only load the tracking script if the Measurement ID is provided in the environment
    const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID;

    if (!gaMeasurementId) {
        return null; // Silent skip during local dev if missing
    }

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
