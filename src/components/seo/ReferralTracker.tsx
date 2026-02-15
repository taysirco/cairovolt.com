'use client';

import { useEffect } from 'react';
import { trackAIReferrer } from '@/lib/ai-traffic-tracking';

/**
 * ReferralTracker Component
 * Client component that tracks referral traffic on mount
 * Place this in your layout to track visitors from search engines and other sources
 */
export function ReferralTracker() {
    useEffect(() => {
        // Track on initial page load
        trackAIReferrer();
    }, []);

    // This component doesn't render any UI
    return null;
}

export default ReferralTracker;
