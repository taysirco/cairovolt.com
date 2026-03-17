'use client';

import { useEffect } from 'react';
import { trackReferrer } from '@/lib/analytics-tracking';

/**
 * TrafficSource Component
 * Client component that tracks referral traffic on mount
 * Place this in your layout to track visitors from search engines and other sources
 */
export function TrafficSource() {
    useEffect(() => {
        // Track on initial page load
        trackReferrer();
    }, []);

    // This component doesn't render any UI
    return null;
}

export default TrafficSource;
