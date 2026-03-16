import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore as getFirestoreInternal, Firestore } from 'firebase-admin/firestore';
import { getSecret } from './get-secrets';

let adminApp: App | null = null;
let firestoreInstance: Firestore | null = null;

export async function getFirestore(): Promise<Firestore> {
    if (firestoreInstance) {
        return firestoreInstance;
    }

    const projectId = process.env.FIREBASE_PROJECT_ID || 'gadgets-b0bdb';
    const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';

    if (!getApps().length) {
        const clientEmail = await getSecret('firebase_client_email');
        const privateKeyRaw = await getSecret('firebase_private_key');

        if (!clientEmail || !privateKeyRaw) {
            throw new Error('Firebase Admin initialization failed: Missing client_email or private_key secrets');
        }

        const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

        try {
            adminApp = initializeApp({
                credential: cert({
                    projectId,
                    clientEmail,
                    privateKey,
                }),
            });
        } catch {
            // Race condition in dev hot-reload: app was created between getApps() check and initializeApp()
            adminApp = getApps()[0];
        }
    } else {
        adminApp = getApps()[0];
    }

    firestoreInstance = getFirestoreInternal(adminApp, databaseId);
    return firestoreInstance;
}
