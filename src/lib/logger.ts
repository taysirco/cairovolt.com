/**
 * Structured Logger — Production-safe logging utility
 * 
 * Strategy:
 *   - `logger.error()` → ALWAYS outputs (critical for monitoring)
 *   - `logger.warn()`  → Only in development (operational noise)
 *   - `logger.info()`  → Only in development (debug info)
 *   - `logger.debug()` → Only in development (verbose trace)
 * 
 * This replaces raw `console.log/warn` calls to prevent
 * information leakage and log pollution in production.
 */

const isDev = process.env.NODE_ENV === 'development';

export const logger = {
    /** Always outputs — use for genuine errors that need attention */
    error: (...args: unknown[]) => console.error(...args),

    /** Dev-only — use for non-critical warnings */
    warn: (...args: unknown[]) => {
        if (isDev) console.warn(...args);
    },

    /** Dev-only — use for operational info (request logs, sync status) */
    info: (...args: unknown[]) => {
        if (isDev) console.log(...args);
    },

    /** Dev-only — use for verbose debugging */
    debug: (...args: unknown[]) => {
        if (isDev) console.log('[DEBUG]', ...args);
    },
};
