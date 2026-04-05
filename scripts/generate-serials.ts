#!/usr/bin/env node
/**
 * CairoVolt Serial Generator CLI v2.0
 * 
 * ══════════════════════════════════════════════════
 * Serial Format: CV-1xxxxxm313
 *   CV-1  → Fixed prefix (brand fingerprint)
 *   xxxxx → 5 random chars  
 *   m313  → Fixed suffix (authenticity seal)
 * ══════════════════════════════════════════════════
 * 
 * Usage:
 *   npx tsx scripts/generate-serials.ts --product anker-nano-45w --count 10
 *   npx tsx scripts/generate-serials.ts --list --product anker-nano-45w
 *   npx tsx scripts/generate-serials.ts --product anker-nano-45w --count 50 --batch B
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// ── Serial Formula: CV-1xxxxxm313 ──
const SERIAL_PREFIX = 'CV-1';
const SERIAL_SUFFIX = 'm313';
const RANDOM_LENGTH = 5;
const SAFE_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

function randomChars(length: number): string {
    const chars: string[] = [];
    for (let i = 0; i < length; i++) {
        chars.push(SAFE_ALPHABET[Math.floor(Math.random() * SAFE_ALPHABET.length)]);
    }
    return chars.join('');
}

function generateSerial(): string {
    return `${SERIAL_PREFIX}${randomChars(RANDOM_LENGTH)}${SERIAL_SUFFIX}`;
}

function generateBatchId(sequence: string = 'A'): string {
    const now = new Date();
    return `BATCH-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${sequence}`;
}

function buildVerifyUrl(serial: string): string {
    const params = new URLSearchParams({
        s: serial,
        utm_source: 'package',
        utm_medium: 'qr',
        utm_campaign: 'c2pa',
    });
    return `https://cairovolt.com/verify?${params.toString()}`;
}

// ── Parse CLI args ──
const args = process.argv.slice(2);
function getArg(name: string): string | undefined {
    const idx = args.indexOf(`--${name}`);
    if (idx !== -1 && args[idx + 1]) return args[idx + 1];
    return undefined;
}
const hasFlag = (name: string) => args.includes(`--${name}`);

async function main() {
    // Init Firebase Admin
    const projectId = process.env.FIREBASE_PROJECT_ID || 'gadgets-b0bdb';

    if (!getApps().length) {
        const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
        if (saPath) {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const sa = require(saPath);
            initializeApp({ credential: cert(sa) });
        } else {
            initializeApp({ projectId });
        }
    }

    const db = getFirestore();
    const serialsRef = db.collection('warranty_serials');

    if (hasFlag('list')) {
        // List existing serials
        const productId = getArg('product');
        let query = serialsRef.orderBy('createdAt', 'desc').limit(50);
        if (productId) {
            query = serialsRef.where('productId', '==', productId).orderBy('createdAt', 'desc').limit(50);
        }

        const snapshot = await query.get();
        console.log(`\n📋 Found ${snapshot.size} serials${productId ? ` for ${productId}` : ''}:\n`);
        console.log('Code\t\t\tProduct\t\t\t\tStatus\t\tBatch');
        console.log('─'.repeat(100));
        snapshot.forEach(doc => {
            const d = doc.data();
            console.log(`${d.code}\t\t${(d.productId || '').substring(0, 20).padEnd(20)}\t${d.status.padEnd(12)}\t${d.batchId || ''}`);
        });
        console.log('');
        return;
    }

    // Generate mode
    const productId = getArg('product') || null;  // Optional — serials are universal
    const count = parseInt(getArg('count') || '10');
    const batchSeq = getArg('batch') || 'A';

    if (count < 1 || count > 500) {
        console.error('❌ --count must be between 1 and 500');
        process.exit(1);
    }

    const batchId = generateBatchId(batchSeq);
    console.log(`\n⚡ Generating ${count} universal serial(s)${productId ? ` linked to "${productId}"` : ''} (Batch: ${batchId})...`);
    console.log(`📐 Format: ${SERIAL_PREFIX}xxxxx${SERIAL_SUFFIX}\n`);

    const serials: string[] = [];
    const batch = db.batch();
    let attempts = 0;

    while (serials.length < count && attempts < count * 3) {
        attempts++;
        const code = generateSerial();

        // Check collision
        const existing = await serialsRef.where('code', '==', code).limit(1).get();
        if (!existing.empty) continue;

        const docRef = serialsRef.doc();
        batch.set(docRef, {
            code,
            productId,      // null = universal serial
            batchId,
            status: 'unused',
            createdAt: FieldValue.serverTimestamp(),
            activatedAt: null,
            warrantyCode: null,
            warrantyExpiresAt: null,
            activatedUA: null,
            activatedIP: null,
        });

        serials.push(code);
    }

    await batch.commit();

    console.log('✅ Generated serials:\n');
    console.log('Serial\t\t\tQR URL');
    console.log('─'.repeat(100));
    serials.forEach(code => {
        const url = buildVerifyUrl(code);
        console.log(`${code}\t\t${url}`);
    });

    console.log(`\n📊 Total: ${serials.length} universal serials saved to Firestore`);
    console.log(`📦 Batch ID: ${batchId}`);
    console.log(`\n🔗 QR URLs are ready for card printing.\n`);
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
