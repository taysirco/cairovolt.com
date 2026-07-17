// Root-level companion to /llms.txt (llmstxt.org convention): serve the
// maintained /.well-known/llms-full.txt catalog reference at the site root —
// same re-export pattern as src/app/openapi.json/route.ts.
export { GET } from '@/app/.well-known/llms-full.txt/route';

export const revalidate = 3600;
