/**
 * One-time ES384 key pair generator for Cairovolt Content Credentials.
 *
 * Usage:
 *   node scripts/generate-signing-keys.mjs
 *
 * Output:
 *   - Prints CAIROVOLT_PRIVATE_KEY and CAIROVOLT_PUBLIC_KEY as base64 strings
 *   - Copy them into your .env.local (dev) and Google Secret Manager (prod)
 */

import { generateKeyPairSync, createPublicKey } from 'crypto';

const { privateKey, publicKey } = generateKeyPairSync('ec', {
    namedCurve: 'P-384',
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

// Convert to JWK for display
const pubKeyObj = createPublicKey(publicKey);
const jwk = pubKeyObj.export({ format: 'jwk' });

const privateKeyB64 = Buffer.from(privateKey).toString('base64');
const publicKeyB64 = Buffer.from(publicKey).toString('base64');

console.log('\n══════════════════════════════════════════════════════');
console.log('   Cairovolt Content Credentials — Key Generation');
console.log('══════════════════════════════════════════════════════\n');

console.log('Add these to .env.local (development):');
console.log('─────────────────────────────────────');
console.log(`CAIROVOLT_PRIVATE_KEY="${privateKeyB64}"`);
console.log(`CAIROVOLT_PUBLIC_KEY="${publicKeyB64}"`);

console.log('\n─────────────────────────────────────');
console.log('Public Key JWK (used in DID document):');
console.log(JSON.stringify(jwk, null, 2));

console.log('\n─────────────────────────────────────');
console.log('For Google Secret Manager (production):');
console.log('  gcloud secrets create CAIROVOLT_PRIVATE_KEY --data-file=-');
console.log('  gcloud secrets create CAIROVOLT_PUBLIC_KEY  --data-file=-');
console.log('\nKeep the private key SECRET. Never commit it to git.\n');
