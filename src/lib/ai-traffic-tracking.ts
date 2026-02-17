/**
 * AI Traffic Tracking Utility for GA4
 * Tracks referral traffic from AI Answer Engines (ChatGPT, Perplexity, Claude, Gemini)
 * Use this to monitor AEO (Answer Engine Optimization) effectiveness
 */

// List of known AI Answer Engine referrers
export const AI_REFERRERS = [
    // OpenAI / ChatGPT
    'chat.openai.com',
    'chatgpt.com',
    'openai.com',

    // Anthropic / Claude
    'claude.ai',
    'anthropic.com',

    // Google / Gemini
    'gemini.google.com',
    'bard.google.com',

    // Perplexity
    'perplexity.ai',

    // Microsoft / Bing Chat
    'bing.com/chat',
    'copilot.microsoft.com',

    // You.com
    'you.com',

    // Phind (developer-focused)
    'phind.com',

    // Other AI search engines
    'kagi.com',
    'neeva.com',
    'brave.com/search',
] as const;

export type AIReferrer = typeof AI_REFERRERS[number];

interface AITrafficData {
    referrer: string;
    source: string;
    landingPage: string;
    timestamp: string;
    userAgent: string;
}

/**
 * Check if the current page referrer is from an AI Answer Engine
 */
export function isAIReferrer(referrer: string): boolean {
    if (!referrer) return false;

    const referrerLower = referrer.toLowerCase();
    return AI_REFERRERS.some(aiRef => referrerLower.includes(aiRef));
}

/**
 * Get the AI source name from a referrer URL
 */
export function getAISourceName(referrer: string): string | null {
    if (!referrer) return null;

    const referrerLower = referrer.toLowerCase();

    if (referrerLower.includes('chatgpt') || referrerLower.includes('openai')) {
        return 'ChatGPT';
    }
    if (referrerLower.includes('claude') || referrerLower.includes('anthropic')) {
        return 'Claude';
    }
    if (referrerLower.includes('gemini') || referrerLower.includes('bard')) {
        return 'Gemini';
    }
    if (referrerLower.includes('perplexity')) {
        return 'Perplexity';
    }
    if (referrerLower.includes('bing.com/chat') || referrerLower.includes('copilot')) {
        return 'Bing Copilot';
    }
    if (referrerLower.includes('you.com')) {
        return 'You.com';
    }
    if (referrerLower.includes('phind')) {
        return 'Phind';
    }

    return null;
}

/**
 * Track AI referral in GA4
 * Call this function on page load to track AI answer engine traffic
 */
export function trackAIReferrer(): AITrafficData | null {
    // Only run in browser
    if (typeof window === 'undefined') return null;

    const referrer = document.referrer;

    if (!isAIReferrer(referrer)) return null;

    const sourceName = getAISourceName(referrer);

    const trackingData: AITrafficData = {
        referrer: referrer,
        source: sourceName || 'Unknown AI',
        landingPage: window.location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
    };

    // Send to GA4 if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
        gtag('event', 'ai_referral_traffic', {
            event_category: 'AEO',
            event_label: sourceName,
            ai_source: sourceName,
            landing_page: trackingData.landingPage,
            full_referrer: referrer,
        });
    }

    // Log for debugging (remove in production)
    // Track logic here
    if (process.env.NODE_ENV === 'development') {
        console.log('[AI Traffic]', trackingData);
    }

    return trackingData;
}

/**
 * React hook for tracking AI traffic on component mount
 * Usage: useAITrafficTracking() in your layout or page component
 */
export function useAITrafficTracking(): void {
    if (typeof window !== 'undefined') {
        // Track on initial load
        trackAIReferrer();
    }
}

/**
 * GA4 Configuration for AI Traffic Reporting
 * Add these custom dimensions to your GA4 property:
 * 
 * 1. ai_source (Text) - The AI answer engine name
 * 2. landing_page (Text) - The page URL the user landed on
 * 3. full_referrer (Text) - Complete referrer URL for analysis
 * 
 * Create a custom report with:
 * - Dimension: ai_source
 * - Metrics: Sessions, Users, Engagement Rate
 * - Filter: Event name = ai_referral_traffic
 */
export const GA4_SETUP_INSTRUCTIONS = `
To track AI traffic in GA4:

1. Go to GA4 Admin > Data Display > Custom Definitions
2. Create custom dimensions:
   - ai_source (event-scoped)
   - landing_page (event-scoped)
   - full_referrer (event-scoped)

3. Create a custom report:
   - Name: "AI Answer Engine Traffic"
   - Dimensions: ai_source, landing_page
   - Metrics: Sessions, Users, Engagement Rate
   - Filter: Event name contains "ai_referral"

4. Set up a custom audience:
   - Name: "AI Referral Users"
   - Condition: Event ai_referral_traffic occurred
`;

export default trackAIReferrer;
