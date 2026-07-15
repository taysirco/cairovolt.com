#!/usr/bin/env node
/**
 * Prepare direct, crawlable category-card assets.
 *
 * - Produces 480px and 800px WebP variants (transparent where the source is).
 * - Adds truthful XMP/IPTC credit, source, rights, keywords, and source-type data.
 * - Writes a C2PA manifest definition for every final derivative.
 * - Does NOT invent camera or GPS capture data.
 * - Embeds C2PA only when C2PA_SIGNING_SETTINGS supplies a production
 *   credential that c2patool reports as trusted. External consumers (including
 *   Google) still decide trust from their own C2PA trust lists.
 *
 * Usage:
 *   npm run assets:categories
 *   C2PA_SIGNING_SETTINGS=/secure/c2pa.toml npm run assets:categories
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const MANIFEST_DIR = path.join(ROOT, '.c2pa-manifests', 'category-cards');
const SIZES = [480, 800];
const COMPOSITE_SOURCE = 'http://cv.iptc.org/newscodes/digitalsourcetype/composite';
const AI_ASSISTED_SOURCE = 'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia';
const signingSettings = process.env.C2PA_SIGNING_SETTINGS;

const assets = [
    {
        output: 'images/categories/anker/anker-power-banks-category-card-cairovolt-egypt-v2',
        source: 'images/home/cutouts/anker-zolo-a110d-power-bank-cutout-cairovolt.png',
        title: 'Anker Power Banks Category — CairoVolt Egypt',
        titleAr: 'قسم باور بانك أنكر — كايرو فولت مصر',
        keywords: ['Anker power bank', 'باور بانك انكر', 'power banks Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/anker/anker-wall-chargers-category-card-cairovolt-egypt-v2',
        source: 'images/category-sources/anker/anker-nano-45w-wall-charger-transparent-cairovolt.png',
        aiAssisted: true,
        title: 'Anker Wall Chargers Category — CairoVolt Egypt',
        titleAr: 'قسم شواحن أنكر السريعة — كايرو فولت مصر',
        keywords: ['Anker charger', 'شاحن انكر', 'GaN charger Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/anker/anker-cables-category-card-cairovolt-egypt-v2',
        source: 'images/category-sources/anker/anker-zolo-usb-c-cable-transparent-cairovolt.png',
        aiAssisted: true,
        title: 'Anker Cables Category — CairoVolt Egypt',
        titleAr: 'قسم كابلات أنكر الأصلية — كايرو فولت مصر',
        keywords: ['Anker USB-C cable', 'كابل انكر', 'braided cable Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/anker/anker-car-chargers-category-card-cairovolt-egypt-v2',
        source: 'images/home/cutouts/anker-a2216-magnetic-car-charger-cutout-cairovolt.png',
        title: 'Anker Car Chargers Category — CairoVolt Egypt',
        titleAr: 'قسم شواحن السيارة من أنكر — كايرو فولت مصر',
        keywords: ['Anker car charger', 'شاحن سيارة انكر', 'MagSafe car mount Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/anker/anker-soundcore-category-card-cairovolt-egypt-v2',
        source: 'images/category-sources/anker/soundcore-r50i-nc-earbuds-transparent-cairovolt.png',
        aiAssisted: true,
        title: 'Soundcore by Anker Category — CairoVolt Egypt',
        titleAr: 'قسم ساوند كور من أنكر — كايرو فولت مصر',
        keywords: ['Soundcore by Anker', 'ساوند كور', 'earbuds Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/joyroom/joyroom-audio-category-card-cairovolt-egypt-v2',
        source: 'products/joyroom/joyroom-t03s-pro-earbuds/joyroom-joyroom-t03s-pro-earbuds-egypt-cairo-9.webp',
        title: 'Joyroom Audio Category — CairoVolt Egypt',
        titleAr: 'قسم سماعات جوي روم — كايرو فولت مصر',
        keywords: ['Joyroom earbuds', 'سماعات جوي روم', 'T03S Pro Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/joyroom/joyroom-power-banks-category-card-cairovolt-egypt-v2',
        source: 'images/category-sources/joyroom/joyroom-10000mah-magnetic-power-bank-transparent-cairovolt.png',
        aiAssisted: true,
        title: 'Joyroom Power Banks Category — CairoVolt Egypt',
        titleAr: 'قسم باور بانك جوي روم — كايرو فولت مصر',
        keywords: ['Joyroom power bank', 'باور بانك جوي روم', 'power bank Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/joyroom/joyroom-wall-chargers-category-card-cairovolt-egypt-v2',
        source: 'images/category-sources/joyroom/joyroom-20w-usb-c-wall-charger-transparent-cairovolt.png',
        aiAssisted: true,
        title: 'Joyroom Wall Chargers Category — CairoVolt Egypt',
        titleAr: 'قسم شواحن جوي روم — كايرو فولت مصر',
        keywords: ['Joyroom charger', 'شاحن جوي روم', '20W USB-C charger Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/joyroom/joyroom-cables-category-card-cairovolt-egypt-v2',
        source: 'images/category-sources/joyroom/joyroom-usb-c-lightning-braided-cable-transparent-cairovolt.png',
        aiAssisted: true,
        title: 'Joyroom Cables Category — CairoVolt Egypt',
        titleAr: 'قسم كابلات جوي روم — كايرو فولت مصر',
        keywords: ['Joyroom cable', 'كابل جوي روم', 'USB-C Lightning cable Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/joyroom/joyroom-smart-watches-category-card-cairovolt-egypt-v2',
        source: 'images/category-sources/joyroom/joyroom-ft3-smartwatch-transparent-cairovolt.png',
        aiAssisted: true,
        title: 'Joyroom Smart Watches Category — CairoVolt Egypt',
        titleAr: 'قسم ساعات جوي روم الذكية — كايرو فولت مصر',
        keywords: ['Joyroom smartwatch', 'ساعة جوي روم', 'FT3 smartwatch Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/joyroom/joyroom-car-holders-category-card-cairovolt-egypt-v2',
        source: 'images/category-sources/joyroom/joyroom-zs290-magnetic-car-mount-transparent-cairovolt.png',
        aiAssisted: true,
        title: 'Joyroom Car Holders Category — CairoVolt Egypt',
        titleAr: 'قسم حوامل السيارة من جوي روم — كايرو فولت مصر',
        keywords: ['Joyroom car holder', 'حامل سيارة جوي روم', 'MagSafe mount Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/joyroom/joyroom-car-accessories-category-card-cairovolt-egypt-v2',
        source: 'images/category-sources/joyroom/joyroom-60w-retractable-car-charger-transparent-cairovolt.png',
        aiAssisted: true,
        title: 'Joyroom Car Accessories Category — CairoVolt Egypt',
        titleAr: 'قسم إكسسوارات السيارة من جوي روم — كايرو فولت مصر',
        keywords: ['Joyroom car accessories', 'اكسسوارات سيارة جوي روم', 'car charger Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/soundcore/soundcore-audio-category-card-cairovolt-egypt-v2',
        source: 'images/home/cutouts/soundcore-liberty-5-tws-earbuds-cutout-cairovolt.png',
        title: 'Soundcore Earbuds and Headphones Category — CairoVolt Egypt',
        titleAr: 'قسم سماعات وايربودز ساوند كور — كايرو فولت مصر',
        keywords: ['Soundcore earbuds', 'سماعات ساوند كور', 'ANC earbuds Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/soundcore/soundcore-speakers-category-card-cairovolt-egypt-v2',
        source: 'images/category-sources/soundcore/soundcore-select-4-go-speaker-transparent-cairovolt.png',
        aiAssisted: true,
        title: 'Soundcore Bluetooth Speakers Category — CairoVolt Egypt',
        titleAr: 'قسم سبيكرات بلوتوث ساوند كور — كايرو فولت مصر',
        keywords: ['Soundcore speaker', 'سبيكر ساوند كور', 'Bluetooth speaker Egypt', 'CairoVolt'],
    },
];

function ensureInsideRoot(filePath) {
    const normalized = path.resolve(filePath);
    if (!normalized.startsWith(`${ROOT}${path.sep}`)) {
        throw new Error(`Refusing path outside repository: ${normalized}`);
    }
    return normalized;
}

async function makeVariant(asset, size) {
    const sourcePath = ensureInsideRoot(path.join(PUBLIC, asset.source));
    const outputPath = ensureInsideRoot(path.join(PUBLIC, `${asset.output}-${size}.webp`));
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const input = sharp(sourcePath, { failOn: 'warning' });
    const metadata = await input.metadata();
    if (!metadata.hasAlpha) {
        throw new Error(`Category source must have real alpha transparency: ${asset.source}`);
    }
    const inset = Math.round(size * 0.08);
    const available = size - (inset * 2);

    let productPipeline = sharp(sourcePath, { failOn: 'warning' });
    productPipeline = productPipeline.trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } });

    const product = await productPipeline
        .resize(available, available, {
            fit: 'contain',
            withoutEnlargement: false,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .webp({ quality: 88, alphaQuality: 100, effort: 6, smartSubsample: true })
        .toBuffer();

    await sharp({
        create: {
            width: size,
            height: size,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
    })
        .composite([{ input: product, gravity: 'center' }])
        .webp({ quality: 88, alphaQuality: 100, effort: 6, smartSubsample: true })
        .toFile(outputPath);

    const outputMetadata = await sharp(outputPath).metadata();
    if (!outputMetadata.hasAlpha) {
        throw new Error(`Generated category asset lost alpha transparency: ${outputPath}`);
    }

    applyMetadata(outputPath, asset);
    const manifestPath = writeManifest(outputPath, asset, size);
    if (signingSettings) signWithTrustedSettings(outputPath, manifestPath, sourcePath);

    return {
        outputPath,
        bytes: fs.statSync(outputPath).size,
        signed: Boolean(signingSettings),
    };
}

function applyMetadata(outputPath, asset) {
    const keywords = asset.keywords.join(', ');
    const description = `${asset.titleAr} | ${asset.title}`;
    const sourceBrand = getSourceBrand(asset);
    const rightsNotice = `Rights holder is not asserted by this derivative metadata. Product catalogue imagery is associated with ${sourceBrand}.`;
    const digitalSource = asset.aiAssisted ? AI_ASSISTED_SOURCE : COMPOSITE_SOURCE;
    const sourceDescription = asset.aiAssisted
        ? `AI-assisted isolated cutout derived from a product catalogue reference associated with ${sourceBrand}: ${asset.source}`
        : `Product catalogue cutout associated with ${sourceBrand}: ${asset.source}`;

    execFileSync('exiftool', [
        '-overwrite_original',
        `-ImageDescription=${description}`,
        `-XMP-dc:Title=${asset.title}`,
        `-XMP-dc:Description=${description}`,
        '-XMP-dc:Contributor=CairoVolt category asset pipeline',
        `-XMP-dc:Rights=${rightsNotice}`,
        `-XMP-dc:Source=${sourceDescription}`,
        `-XMP-dc:Subject=${keywords}`,
        `-XMP-photoshop:Credit=Product catalogue imagery associated with ${sourceBrand}; category derivative prepared for CairoVolt`,
        `-XMP-photoshop:Source=Product catalogue asset associated with ${sourceBrand}`,
        '-XMP-xmpRights:UsageTerms=No reuse rights are granted by this metadata. Contact the applicable rights holder and CairoVolt before reuse.',
        `-XMP-iptcExt:DigitalSourceType=${digitalSource}`,
        outputPath,
    ], { stdio: ['ignore', 'ignore', 'inherit'] });
}

function getSourceBrand(asset) {
    if (asset.output.includes('/joyroom/')) return 'JOYROOM';
    if (asset.output.includes('/soundcore/') || asset.output.includes('anker-soundcore')) {
        return 'Soundcore';
    }
    return 'Anker';
}

function writeManifest(outputPath, asset, size) {
    fs.mkdirSync(MANIFEST_DIR, { recursive: true });
    const basename = path.basename(outputPath, '.webp');
    const manifestPath = path.join(MANIFEST_DIR, `${basename}.json`);
    const publicUrl = `https://cairovolt.com/${asset.output}-${size}.webp`;
    const sourceBrand = getSourceBrand(asset);
    const digitalSource = asset.aiAssisted ? AI_ASSISTED_SOURCE : COMPOSITE_SOURCE;
    const sourceDescription = asset.aiAssisted
        ? `AI-assisted isolated product cutout, then resized to a ${size}x${size} transparent category-card asset`
        : `Catalogue cutout resized to a ${size}x${size} transparent category-card asset`;
    const manifest = {
        claim_generator: 'CairoVolt Category Asset Pipeline/1.0',
        format: 'image/webp',
        title: asset.title,
        assertions: [
            {
                label: 'c2pa.actions',
                data: {
                    actions: [
                        {
                            action: asset.aiAssisted ? 'c2pa.edited' : 'c2pa.created',
                            softwareAgent: 'CairoVolt category asset pipeline (sharp)',
                            digitalSourceType: digitalSource,
                            description: sourceDescription,
                        },
                        {
                            action: 'c2pa.published',
                            softwareAgent: 'CairoVolt Next.js storefront',
                        },
                    ],
                },
            },
            {
                label: 'stds.schema-org.CreativeWork',
                data: {
                    '@context': 'https://schema.org',
                    '@type': 'ImageObject',
                    name: asset.title,
                    url: publicUrl,
                    contributor: { '@type': 'Organization', name: 'CairoVolt', url: 'https://cairovolt.com' },
                    creditText: asset.aiAssisted
                        ? `AI-assisted cutout based on product catalogue imagery associated with ${sourceBrand}; category derivative prepared for CairoVolt`
                        : `Product catalogue imagery associated with ${sourceBrand}; category derivative prepared for CairoVolt`,
                },
            },
        ],
    };
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    return manifestPath;
}

function collectValidationFailures(value) {
    const failures = [];

    function visit(node) {
        if (!node || typeof node !== 'object') return;
        if (Array.isArray(node)) {
            node.forEach(visit);
            return;
        }

        for (const [key, child] of Object.entries(node)) {
            if ((key === 'failure' || key === 'validation_status') && child) {
                failures.push(...(Array.isArray(child) ? child : [child]));
            } else {
                visit(child);
            }
        }
    }

    visit(value);
    return failures;
}

function signWithTrustedSettings(outputPath, manifestPath, sourcePath) {
    // Signing credentials should normally live outside the repository. Accept
    // an absolute or cwd-relative path, but never copy credentials into output.
    const settingsPath = path.resolve(signingSettings);
    if (!fs.existsSync(settingsPath)) {
        throw new Error(`C2PA_SIGNING_SETTINGS does not exist: ${settingsPath}`);
    }

    const signedPath = outputPath.replace(/\.webp$/, '.signed.webp');
    try {
        execFileSync('c2patool', [
            outputPath,
            '--parent', sourcePath,
            '--manifest', manifestPath,
            '--settings', settingsPath,
            '--output', signedPath,
            '--force',
        ], { stdio: 'pipe' });

        // A cryptographically valid development certificate can still be
        // untrusted. Never publish it merely because c2patool exited cleanly.
        const verification = JSON.parse(execFileSync(
            'c2patool',
            [signedPath, '--settings', settingsPath, '--detailed'],
            { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
        ));
        // Validate the whole provenance tree, not just the active claim. A
        // trusted new signer must not hide an untrusted/invalid parent.
        const failures = collectValidationFailures(verification);
        const successes = verification.validation_results?.activeManifest?.success ?? [];
        const trustedCredential = successes.some((result) => result.code === 'signingCredential.trusted');
        if (
            !verification.active_manifest ||
            verification.validation_state !== 'Valid' ||
            failures.length > 0 ||
            !trustedCredential
        ) {
            const failureCodes = failures
                .map((failure) => typeof failure === 'string'
                    ? failure
                    : failure.code ?? failure.status ?? 'validation failure')
                .join(', ');
            throw new Error(
                `C2PA output did not pass credential trust validation${failureCodes ? `: ${failureCodes}` : ''}`,
            );
        }

        fs.renameSync(signedPath, outputPath);
    } catch (error) {
        fs.rmSync(signedPath, { force: true });
        throw error;
    }
}

async function main() {
    if (signingSettings) {
        console.log('C2PA: production signing settings supplied; each embedded claim will be trust-validated.');
    } else {
        console.log('C2PA: manifest definitions will be written; no untrusted development signature will be embedded.');
    }

    let totalBytes = 0;
    for (const asset of assets) {
        for (const size of SIZES) {
            const result = await makeVariant(asset, size);
            totalBytes += result.bytes;
            console.log(`✓ ${path.relative(ROOT, result.outputPath)} (${Math.round(result.bytes / 1024)} KB${result.signed ? ', C2PA signed' : ''})`);
        }
    }

    console.log(`\nPrepared ${assets.length * SIZES.length} assets (${Math.round(totalBytes / 1024)} KB total).`);
}

main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
});
