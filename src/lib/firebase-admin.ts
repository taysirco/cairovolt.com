import { applicationDefault, initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore as getFirestoreInternal, Firestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

let adminApp: App | null = null;
let firestoreInstance: Firestore | null = null;

export async function getFirestore(): Promise<Firestore> {
    if (firestoreInstance) {
        return firestoreInstance;
    }

    // CairoVolt — Firebase Project ID (legacy name, immutable)
    const projectId = process.env.FIREBASE_PROJECT_ID || 'gadgets-b0bdb';
    const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';

    if (!getApps().length) {
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;
        const credential = clientEmail && privateKeyRaw
            ? cert({
                projectId,
                clientEmail,
                privateKey: privateKeyRaw.replace(/\\n/g, '\n'),
            })
            : applicationDefault();

        try {
            adminApp = initializeApp({
                credential,
                projectId,
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

/** دلو التخزين الافتراضي — صور تقييمات العملاء (تُخدَم بتوكن تنزيل + كاش سنة) */
export async function getStorageBucket() {
    await getFirestore(); // يضمن تهيئة التطبيق
    const bucketName = process.env.FIREBASE_STORAGE_BUCKET
        || `${process.env.FIREBASE_PROJECT_ID || 'gadgets-b0bdb'}.firebasestorage.app`;
    return getStorage(adminApp!).bucket(bucketName);
}
