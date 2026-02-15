import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

// Cache secrets in memory to prevent excessive API calls
const cache: Record<string, string> = {};

// Initialize client lazily to avoid issues during build time if not used
let client: SecretManagerServiceClient | null = null;

export async function getSecret(name: string): Promise<string | undefined> {
    // 1. Try process.env first (Local development or successful injection)
    // We check both the exact name and the UPPERCASE version
    if (process.env[name]) return process.env[name].trim();
    const upperName = name.toUpperCase();
    if (process.env[upperName]) return process.env[upperName].trim();

    // 2. Check memory cache
    if (cache[name]) return cache[name];

    // 3. Fetch from Secret Manager
    try {
        if (!client) {
            client = new SecretManagerServiceClient();
        }

        const projectId = process.env.FIREBASE_PROJECT_ID || 'gadgets-b0bdb';
        const versionName = `projects/${projectId}/secrets/${name}/versions/latest`;

        // Access the secret
        const [version] = await client.accessSecretVersion({ name: versionName });

        const payload = version.payload?.data?.toString()?.trim();
        if (payload) {
            cache[name] = payload;
            return payload;
        }
    } catch (error) {
        console.error(`Failed to fetch secret '${name}' from Secret Manager:`, error);
    }

    return undefined;
}
