'use client';

import Script from 'next/script';

export function GoogleAnalytics() {
    // GA4 Measurement ID
    const gaMeasurementId = 'G-ZH7YYZRWSE';
    // Google Ads Conversion ID
    const googleAdsId = 'AW-18109404098';

    return (
        <>
            {/* Single gtag.js — handles both GA4 + Google Ads */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());

                    // GA4
                    gtag('config', '${gaMeasurementId}', {
                        page_path: window.location.pathname,
                    });

                    // Google Ads
                    gtag('config', '${googleAdsId}');
                `}
            </Script>
        </>
    );
}
