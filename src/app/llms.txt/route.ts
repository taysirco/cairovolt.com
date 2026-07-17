// The llmstxt.org convention (and AI fetchers such as GPTBot, ClaudeBot, and
// PerplexityBot) look for llms.txt at the SITE ROOT. Serve the maintained
// /.well-known/llms.txt document there as a direct 200 text/plain response —
// same re-export pattern as src/app/openapi.json/route.ts.
export { GET } from '@/app/.well-known/llms.txt/route';

export const revalidate = 3600;
