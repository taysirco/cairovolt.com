/**
 * CairoVolt Media Verification — C2PA-compatible signing & verification
 *
 * Uses Node.js built-in `crypto` (ES384 = ECDSA P-384 + SHA-384).
 * No external dependencies required.
 *
 * Standards:
 *   - C2PA v1.x  https://c2pa.org/specifications/
 *   - did:web     https://w3c-ccg.github.io/did-method-web/
 *   - JWK/JWKS   RFC 7517
 */

import { createSign, createVerify, createPublicKey, createHash, KeyObject } from 'crypto';
import { getSecret } from '@/lib/get-secrets';

// ─────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────

export const SITE_DID = 'did:web:cairovolt.com';
export const KEY_ID = `${SITE_DID}#key-1`;
export const CLAIM_GENERATOR = 'Cairovolt/1.0 (cairovolt.com)';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

export type CaptureMethod =
    | 'c2pa.captured'      // Real camera / real photo
    | 'c2pa.created'       // Human-created without camera
    | 'c2pa.edited'        // Original edited (e.g., cropped)
    | 'c2pa.ai_generated'  // Fully AI-generated
    | 'c2pa.ai_edited';    // AI-assisted editing

export interface C2PAAction {
    action: CaptureMethod;
    softwareAgent?: string;
    when: string;
    digitalSourceType?: string;
}

export interface C2PAAssertion {
    label: string;
    data: Record<string, unknown>;
}

export interface C2PAClaim {
    'dc:created': string;
    'c2pa:claimGenerator': string;
    'c2pa:assertions': Array<{ label: string; hash: string }>;
}

export interface C2PAManifest {
    '@context': string[];
    'dc:title': string;
    'dc:format': string;
    'c2pa:claim': C2PAClaim;
    'c2pa:assertions': C2PAAssertion[];
    producer: {
        name: string;
        did: string;
        url: string;
    };
    imageHash?: string;
}

export interface SignedCredential {
    manifest: C2PAManifest;
    signature: string;
    signingKeyId: string;
    algorithm: 'ES384';
    issuedAt: string;
}

export interface VerificationResult {
    valid: boolean;
    signer: string;
    captureMethod: CaptureMethod | null;
    isAiGenerated: boolean;
    producer: string;
    issuedAt: string | null;
    error?: string;
}

// ─────────────────────────────────────────────────────────
// ─── Key Helpers
// ─────────────────────────────────────────────────────────

async function getPrivateKeyPem(): Promise<string> {
    const b64 = await getSecret('cairovolt_private_key');
    if (!b64) throw new Error('CAIROVOLT_PRIVATE_KEY / cairovolt_private_key secret not found');
    return Buffer.from(b64, 'base64').toString('utf-8');
}

async function getPublicKeyPem(): Promise<string> {
    const b64 = await getSecret('cairovolt_public_key');
    if (!b64) throw new Error('CAIROVOLT_PUBLIC_KEY / cairovolt_public_key secret not found');
    return Buffer.from(b64, 'base64').toString('utf-8');
}

export async function getPublicKeyJwk(): Promise<Record<string, unknown>> {
    const pem = await getPublicKeyPem();
    const key: KeyObject = createPublicKey(pem);
    return key.export({ format: 'jwk' }) as Record<string, unknown>;
}

// ─────────────────────────────────────────────────────────
// Manifest Builder
// ─────────────────────────────────────────────────────────

export function buildManifest(opts: {
    title: string;
    format?: string;
    captureMethod?: CaptureMethod;
    softwareAgent?: string;
    imageBuffer?: Buffer;
}): C2PAManifest {
    const now = new Date().toISOString();
    const format = opts.format || 'image/jpeg';
    const action: C2PAAction = {
        action: opts.captureMethod || 'c2pa.captured',
        when: now,
        digitalSourceType: opts.captureMethod === 'c2pa.captured'
            ? 'http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture'
            : opts.captureMethod?.startsWith('c2pa.ai')
                ? 'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia'
                : 'http://cv.iptc.org/newscodes/digitalsourcetype/softwareImage',
    };
    if (opts.softwareAgent) action.softwareAgent = opts.softwareAgent;

    const assertions: C2PAAssertion[] = [
        {
            label: 'c2pa.actions',
            data: { actions: [action] },
        },
        {
            label: 'stds.schema-org.CreativeWork',
            data: {
                '@context': 'https://schema.org',
                '@type': 'CreativeWork',
                author: [
                    {
                        '@type': 'Organization',
                        name: 'Cairovolt',
                        identifier: SITE_DID,
                        url: 'https://cairovolt.com',
                        sameAs: [
                            'https://www.facebook.com/cairovolt',
                        ],
                    },
                ],
            },
        },
    ];

    const manifest: C2PAManifest = {
        '@context': [
            'https://www.w3.org/ns/did/v1',
            'https://c2pa.org/v1',
            'https://schema.org',
        ],
        'dc:title': opts.title,
        'dc:format': format,
        'c2pa:claim': {
            'dc:created': now,
            'c2pa:claimGenerator': CLAIM_GENERATOR,
            'c2pa:assertions': assertions.map(a => ({
                label: a.label,
                hash: createHash('sha256')
                    .update(JSON.stringify(a.data))
                    .digest('base64url'),
            })),
        },
        'c2pa:assertions': assertions,
        producer: {
            name: 'Cairovolt',
            did: SITE_DID,
            url: 'https://cairovolt.com',
        },
    };

    if (opts.imageBuffer) {
        manifest.imageHash = createHash('sha256')
            .update(opts.imageBuffer)
            .digest('base64url');
    }

    return manifest;
}

// ─────────────────────────────────────────────────────────
// Signing
// ─────────────────────────────────────────────────────────

export async function signManifest(manifest: C2PAManifest): Promise<SignedCredential> {
    const privateKeyPem = await getPrivateKeyPem();
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

// ─────────────────────────────────────────────────────────
// Verification
// ─────────────────────────────────────────────────────────

export async function verifyCredential(
    signed: SignedCredential,
    publicKeyPemOverride?: string,
): Promise<VerificationResult> {
    try {
        const publicKeyPem = publicKeyPemOverride || await getPublicKeyPem();
        const payload = JSON.stringify(signed.manifest);
        const verifier = createVerify('SHA384');
        verifier.update(payload);
        verifier.end();

        const valid = verifier.verify(publicKeyPem, signed.signature, 'base64url');
        if (!valid) {
            return {
                valid: false,
                signer: signed.manifest.producer?.did || 'unknown',
                captureMethod: null,
                isAiGenerated: false,
                producer: signed.manifest.producer?.name || 'unknown',
                issuedAt: signed.issuedAt,
                error: 'Signature verification failed',
            };
        }

        const actionsAssertion = signed.manifest['c2pa:assertions'].find(
            a => a.label === 'c2pa.actions',
        );
        const actions = actionsAssertion?.data?.actions as C2PAAction[] | undefined;
        const firstAction = actions?.[0];
        const captureMethod = (firstAction?.action as CaptureMethod) || null;
        const isAiGenerated = captureMethod === 'c2pa.ai_generated' || captureMethod === 'c2pa.ai_edited';

        return {
            valid: true,
            signer: signed.signingKeyId,
            captureMethod,
            isAiGenerated,
            producer: signed.manifest.producer?.name || 'unknown',
            issuedAt: signed.issuedAt,
        };
    } catch (err) {
        return {
            valid: false,
            signer: 'unknown',
            captureMethod: null,
            isAiGenerated: false,
            producer: 'unknown',
            issuedAt: null,
            error: err instanceof Error ? err.message : 'Unknown verification error',
        };
    }
}

// ─────────────────────────────────────────────────────────
// JWKS Builder (for /.well-known/jwks.json)
// ─────────────────────────────────────────────────────────

export async function buildJwks() {
    const jwk = await getPublicKeyJwk();
    return {
        keys: [
            {
                ...jwk,
                kid: KEY_ID,
                use: 'sig',
                alg: 'ES384',
            },
        ],
    };
}

// ─────────────────────────────────────────────────────────
// DID Document Builder (for /.well-known/did.json)
// ─────────────────────────────────────────────────────────

export async function buildDidDocument() {
    const jwk = await getPublicKeyJwk();
    return {
        '@context': [
            'https://www.w3.org/ns/did/v1',
            'https://w3id.org/security/suites/jws-2020/v1',
        ],
        id: SITE_DID,
        verificationMethod: [
            {
                id: KEY_ID,
                type: 'JsonWebKey2020',
                controller: SITE_DID,
                publicKeyJwk: {
                    ...jwk,
                    kid: KEY_ID,
                    use: 'sig',
                    alg: 'ES384',
                },
            },
        ],
        assertionMethod: [KEY_ID],
        authentication: [KEY_ID],
        service: [
            {
                id: `${SITE_DID}#cairovolt-store`,
                type: 'LinkedDomains',
                serviceEndpoint: 'https://cairovolt.com',
            },
            {
                id: `${SITE_DID}#content-credentials`,
                type: 'ContentCredentialsVerification',
                serviceEndpoint: 'https://cairovolt.com/api/v1/verify-content',
            },
        ],
    };
}
