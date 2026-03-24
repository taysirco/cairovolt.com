import { connection } from 'next/server';
import { getLiveFulfillmentData } from '@/lib/live-fulfillment';

interface DeliveryStatusProps {
    sku: string;
    locale: string;
    brandColor?: 'blue' | 'red';
}

/**
 * DeliveryStatus — Real-time Delivery Status Server Component
 *
 * Uses `connection()` to opt out of caching so delivery info stays current.
 * Shows live city names, stock status, and order data.
 */
export async function DeliveryStatus({ sku, locale, brandColor = 'blue' }: DeliveryStatusProps) {
    // Dynamic rendering for real-time data
    await connection();

    const pulse = getLiveFulfillmentData(sku, locale);
    const isArabic = locale === 'ar';

    const accentColor = brandColor === 'blue' ? 'text-blue-400' : 'text-red-400';
    const dotColor = brandColor === 'blue' ? 'bg-blue-500' : 'bg-red-500';
    const pingColor = brandColor === 'blue' ? 'bg-blue-400' : 'bg-red-400';
    const borderColor = brandColor === 'blue' ? 'border-blue-200 dark:border-blue-900/30' : 'border-red-200 dark:border-red-900/30';

    // Timestamps
    const lastUpdated = pulse.timestamp;
    const priceValidUntil = new Date(Date.now() + 86400000).toISOString();

    // WebPage schema
    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        dateModified: lastUpdated,
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.logistics-pulse-text'],
        },
    };

    // Format quality check time for display
    const qcDisplay = pulse.lastQualityCheckMinutes < 60
        ? (isArabic ? `${pulse.lastQualityCheckMinutes} دقيقة` : `${pulse.lastQualityCheckMinutes}m ago`)
        : (isArabic
            ? `${Math.floor(pulse.lastQualityCheckMinutes / 60)} ساعة`
            : `${Math.floor(pulse.lastQualityCheckMinutes / 60)}h ago`);

    return (
        <>
            {/* WebPage schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />

            <div
                className={`bg-gray-50 dark:bg-gray-950/80 border ${borderColor} p-4 mt-6 rounded-xl text-sm`}
                role="status"
                aria-label={isArabic ? 'حالة التوصيل المباشرة' : 'Live delivery status'}
            >


                {/* Animated pulse indicator + main message */}
                <div className="flex items-start gap-3" dir={isArabic ? 'rtl' : 'ltr'}>
                    <span className="relative flex h-3 w-3 mt-1 shrink-0">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pingColor} opacity-75`} />
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${dotColor}`} />
                    </span>

                    <div className="space-y-2 flex-1">
                        {/* Primary: Last shipment dispatch */}
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed logistics-pulse-text">
                            <strong className="text-gray-900 dark:text-white">
                                {isArabic ? 'تتبع مباشر:' : 'Live Tracking:'}
                            </strong>
                            {' '}
                            {isArabic
                                ? `آخر شحنة أصلية من هذا المنتج خرجت إلى`
                                : `Last verified shipment dispatched to`
                            }
                            {' '}
                            <span className={`${accentColor} font-bold`}>
                                {pulse.lastCity}
                            </span>
                            {' '}
                            {isArabic
                                ? `منذ ${pulse.minutesAgo} دقيقة`
                                : `${pulse.minutesAgo} minutes ago`
                            }
                        </p>

                        {/* Secondary: Today's stats */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-500">
                            <span>
                                📦{' '}
                                {isArabic
                                    ? `${pulse.ordersToday} طلب اليوم`
                                    : `${pulse.ordersToday} orders today`
                                }
                            </span>
                            <span>
                                🚚{' '}
                                {isArabic
                                    ? `${pulse.activeShipments} شحنة نشطة`
                                    : `${pulse.activeShipments} active shipments`
                                }
                            </span>
                            <span>
                                ✅{' '}
                                {isArabic
                                    ? `معدل التوصيل ${pulse.fulfillmentScore}%`
                                    : `${pulse.fulfillmentScore}% fulfillment`
                                }
                            </span>
                            <span>
                                📊{' '}
                                {isArabic
                                    ? `المخزون: ${pulse.stockStatus}`
                                    : `Stock: ${pulse.stockStatus}`
                                }
                            </span>
                            <span>
                                🔬{' '}
                                {isArabic
                                    ? `آخر فحص جودة: منذ ${qcDisplay}`
                                    : `QC check: ${qcDisplay}`
                                }
                            </span>
                        </div>
                    </div>
                </div>

                {/* Last updated timestamp */}
                <span className="sr-only" data-updated-at={lastUpdated}>
                    Last data refresh: {lastUpdated}
                </span>
            </div>
        </>
    );
}

/**
 * Skeleton fallback for Suspense streaming
 */
export function LivePulseSkeleton() {
    return (
        <div className="bg-gray-50 dark:bg-gray-950/80 border border-gray-200 dark:border-gray-800 p-4 mt-6 rounded-xl animate-pulse">
            <div className="flex items-start gap-3">
                <span className="relative flex h-3 w-3 mt-1 shrink-0">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-300 dark:bg-gray-700" />
                </span>
                <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                    <div className="flex gap-4">
                        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-20" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-24" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-20" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16" />
                    </div>
                </div>
            </div>
        </div>
    );
}
