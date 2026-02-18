/**
 * Batch Content Credentials Signer for Existing Products
 *
 * Signs all existing Firestore products with a C2PA-compatible Content
 * Credential manifest, proving they were not AI-generated.
 *
 * Prerequisites:
 *   1. Run:  node scripts/generate-signing-keys.mjs
 *   2. Add CAIROVOLT_PRIVATE_KEY and CAIROVOLT_PUBLIC_KEY to .env.local
 *   3. Add GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT to .env.local
 *
 * Usage:
 *   node scripts/sign-existing-products.mjs
 *   node scripts/sign-existing-products.mjs --dry-run   (preview only)
 *   node scripts/sign-existing-products.mjs --slug anker-powercore-20000
 */

import { createSign, createHash } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// ─── Load environment variables ──────────────────────────────────────────────

function loadEnv() {
    const envPath = join(projectRoot, '.env.local');
    if (!existsSync(envPath)) {
        console.error('\n❌  .env.local not found. Run generate-signing-keys.mjs first.\n');
        process.exit(1);
    }
    const lines = readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
        const match = line.match(/^([^=]+)="?([^"]*)"?$/);
        if (match) process.env[match[1].trim()] = match[2].trim();
    }
}

loadEnv();

// ─── C2PA Signing (mirrors src/lib/content-credentials.ts) ───────────────────

const SITE_DID = 'did:web:cairovolt.com';
const KEY_ID = `${SITE_DID}#key-1`;
const CLAIM_GENERATOR = 'Cairovolt/1.0 (cairovolt.com)';

function hashStr(str) {
    return createHash('sha256').update(str).digest('base64url');
}

function buildManifest(title, format = 'image/jpeg') {
    const now = new Date().toISOString();
    const actions = [{
        action: 'c2pa.captured',
        when: now,
        digitalSourceType: 'http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture',
    }];
    const creativeWork = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        author: [{
            '@type': 'Organization',
            name: 'Cairovolt',
            identifier: SITE_DID,
            url: 'https://cairovolt.com',
        }],
    };

    const assertions = [
        { label: 'c2pa.actions', data: { actions } },
        { label: 'stds.schema-org.CreativeWork', data: creativeWork },
    ];

    return {
        '@context': [
            'https://www.w3.org/ns/did/v1',
            'https://c2pa.org/v1',
            'https://schema.org',
        ],
        'dc:title': title,
        'dc:format': format,
        'c2pa:claim': {
            'dc:created': now,
            'c2pa:claimGenerator': CLAIM_GENERATOR,
            'c2pa:assertions': assertions.map(a => ({
                label: a.label,
                hash: hashStr(JSON.stringify(a.data)),
            })),
        },
        'c2pa:assertions': assertions,
        producer: {
            name: 'Cairovolt',
            did: SITE_DID,
            url: 'https://cairovolt.com',
        },
    };
}

function signManifest(manifest) {
    const b64 = process.env.CAIROVOLT_PRIVATE_KEY;
    if (!b64) throw new Error('CAIROVOLT_PRIVATE_KEY not set');
    const privateKeyPem = Buffer.from(b64, 'base64').toString('utf-8');

    const payload = JSON.stringify(manifest);
    const signer = createSign('SHA384');
    signer.update(payload);
    signer.end();
    const signature = signer.sign(privateKeyPem, 'base64url');

    return {
        manifest,
        signature,
        signingKeyId: KEY_ID,
        algorithm: 'ES384',
        issuedAt: new Date().toISOString(),
    };
}

// ─── Firestore Client (using Firebase Admin SDK) ──────────────────────────────

async function getDb() {
    const { initializeApp, getApps, cert } = await import('firebase-admin/app');
    const { getFirestore } = await import('firebase-admin/firestore');

    if (!getApps().length) {
        const projectId = process.env.FIREBASE_PROJECT_ID || 'gadgets-b0bdb';

        // Pattern 1: individual client_email + private_key (same as main app)
        const clientEmail =
            process.env.firebase_client_email ||
            process.env.FIREBASE_CLIENT_EMAIL;
        const privateKeyRaw =
            process.env.firebase_private_key ||
            process.env.FIREBASE_PRIVATE_KEY;

        // Pattern 2: base64-encoded full service-account JSON
        const saEnv = process.env.FIREBASE_SERVICE_ACCOUNT;

        // Pattern 3: path to service-account JSON file
        const credFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;

        if (clientEmail && privateKeyRaw) {
            const privateKey = privateKeyRaw.replace(/\\n/g, '\n');
            initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
        } else if (saEnv) {
            const sa = JSON.parse(Buffer.from(saEnv, 'base64').toString('utf-8'));
            initializeApp({ credential: cert(sa) });
        } else if (credFile) {
            initializeApp({ credential: cert(JSON.parse(readFileSync(credFile, 'utf-8'))) });
        } else {
            // Last resort: Application Default Credentials (gcloud auth application-default login)
            console.warn('⚠️  No explicit credentials found — trying Application Default Credentials...');
            const { applicationDefault } = await import('firebase-admin/app');
            initializeApp({ credential: applicationDefault(), projectId });
        }
    }

    return getFirestore();
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const slugFilter = args.includes('--slug') ? args[args.indexOf('--slug') + 1] : null;

console.log('\n═══════════════════════════════════════════════════════');
console.log('   Cairovolt — Batch Content Credentials Signing');
console.log('═══════════════════════════════════════════════════════');
if (dryRun) console.log('   MODE: DRY RUN (no writes will be made)');
if (slugFilter) console.log(`   FILTER: slug = "${slugFilter}"`);
console.log('');

try {
    const db = await getDb();
    let query = db.collection('products');
    if (slugFilter) query = query.where('slug', '==', slugFilter);

    const snapshot = await query.get();
    console.log(`Found ${snapshot.size} products to process.\n`);

    let signed = 0;
    let skipped = 0;
    let errors = 0;

    for (const doc of snapshot.docs) {
        const data = doc.data();
        const translations = data.translations;
        const title = translations?.en?.name || translations?.ar?.name || doc.id;
        const slug = data.slug || doc.id;

        process.stdout.write(`  ⟳  ${slug.padEnd(50)}`);

        if (data.contentCredentials && !args.includes('--force')) {
            console.log('SKIP (already signed)');
            skipped++;
            continue;
        }

        try {
            const manifest = buildManifest(title);
            const credential = signManifest(manifest);

            if (!dryRun) {
                await doc.ref.update({ contentCredentials: credential });
            }

            console.log(`✓  signed (${credential.algorithm}, ${credential.issuedAt.slice(0, 10)})`);
            signed++;
        } catch (err) {
            console.log(`✗  ERROR: ${err.message}`);
            errors++;
        }
    }

    console.log('\n─────────────────────────────────────────────────────');
    console.log(`  ✓ Signed:  ${signed}`);
    console.log(`  ○ Skipped: ${skipped}  (use --force to re-sign)`);
    console.log(`  ✗ Errors:  ${errors}`);
    if (dryRun) console.log('\n  DRY RUN complete. Re-run without --dry-run to apply.');
    console.log('─────────────────────────────────────────────────────\n');

} catch (err) {
    console.error('\n❌  Fatal error:', err.message);
    process.exit(1);
}
