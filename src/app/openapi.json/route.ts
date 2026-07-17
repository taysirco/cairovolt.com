// Keep the established /openapi.json endpoint as a direct 200 response while
// sharing the maintained specification with /api/openapi.json.
export { GET } from '@/app/api/openapi.json/route';
