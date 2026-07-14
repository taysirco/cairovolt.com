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
const DIGITAL_SOURCE = 'http://cv.iptc.org/newscodes/digitalsourcetype/composite';
const signingSettings = process.env.C2PA_SIGNING_SETTINGS;

const assets = [
    {
        output: 'images/categories/anker/anker-power-banks-category-card-cairovolt-egypt',
        source: 'images/home/cutouts/anker-zolo-a110d-power-bank-cutout-cairovolt.png',
        transparent: true,
        title: 'Anker Power Banks Category — CairoVolt Egypt',
        titleAr: 'قسم باور بانك أنكر — كايرو فولت مصر',
        keywords: ['Anker power bank', 'باور بانك انكر', 'power banks Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/anker/anker-wall-chargers-category-card-cairovolt-egypt',
        source: 'products/anker/anker-nano-45w-1c-pd/anker-nano-45w-1c-pd-main-front-hero-white.webp',
        transparent: false,
        title: 'Anker Wall Chargers Category — CairoVolt Egypt',
        titleAr: 'قسم شواحن أنكر السريعة — كايرو فولت مصر',
        keywords: ['Anker charger', 'شاحن انكر', 'GaN charger Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/anker/anker-cables-category-card-cairovolt-egypt',
        source: 'products/anker/anker-zolo-usb-c-braided-cable/anker-zolo-usb-c-braided-cable-dual-usb-c-connectors-hero.webp',
        transparent: false,
        title: 'Anker Cables Category — CairoVolt Egypt',
        titleAr: 'قسم كابلات أنكر الأصلية — كايرو فولت مصر',
        keywords: ['Anker USB-C cable', 'كابل انكر', 'braided cable Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/anker/anker-car-chargers-category-card-cairovolt-egypt',
        source: 'images/home/cutouts/anker-a2216-magnetic-car-charger-cutout-cairovolt.png',
        transparent: true,
        title: 'Anker Car Chargers Category — CairoVolt Egypt',
        titleAr: 'قسم شواحن السيارة من أنكر — كايرو فولت مصر',
        keywords: ['Anker car charger', 'شاحن سيارة انكر', 'MagSafe car mount Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/anker/anker-soundcore-category-card-cairovolt-egypt',
        source: 'products/anker/anker-soundcore-r50i-nc/anker-soundcore-r50i-nc-active-noise-cancelling-earbuds-cairovolt.webp',
        transparent: false,
        title: 'Soundcore by Anker Category — CairoVolt Egypt',
        titleAr: 'قسم ساوند كور من أنكر — كايرو فولت مصر',
        keywords: ['Soundcore by Anker', 'ساوند كور', 'earbuds Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/joyroom/joyroom-audio-category-card-cairovolt-egypt',
        source: 'products/joyroom/joyroom-t03s-pro-earbuds/joyroom-joyroom-t03s-pro-earbuds-egypt-cairo-9.webp',
        transparent: true,
        title: 'Joyroom Audio Category — CairoVolt Egypt',
        titleAr: 'قسم سماعات جوي روم — كايرو فولت مصر',
        keywords: ['Joyroom earbuds', 'سماعات جوي روم', 'T03S Pro Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/joyroom/joyroom-power-banks-category-card-cairovolt-egypt',
        source: 'products/joyroom/joyroom-power-bank-10000/joyroom-joyroom-power-bank-10000-egypt-cairo-1.webp',
        transparent: false,
        title: 'Joyroom Power Banks Category — CairoVolt Egypt',
        titleAr: 'قسم باور بانك جوي روم — كايرو فولت مصر',
        keywords: ['Joyroom power bank', 'باور بانك جوي روم', 'power bank Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/joyroom/joyroom-wall-chargers-category-card-cairovolt-egypt',
        source: 'products/joyroom/joyroom-20w-usb-c-charger/joyroom-joyroom-20w-usb-c-charger-egypt-cairo-1.webp',
        transparent: false,
        title: 'Joyroom Wall Chargers Category — CairoVolt Egypt',
        titleAr: 'قسم شواحن جوي روم — كايرو فولت مصر',
        keywords: ['Joyroom charger', 'شاحن جوي روم', '20W USB-C charger Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/joyroom/joyroom-cables-category-card-cairovolt-egypt',
        source: 'products/joyroom/joyroom-type-c-lightning-braided/joyroom-joyroom-type-c-lightning-braided-egypt-cairo-1.webp',
        transparent: false,
        title: 'Joyroom Cables Category — CairoVolt Egypt',
        titleAr: 'قسم كابلات جوي روم — كايرو فولت مصر',
        keywords: ['Joyroom cable', 'كابل جوي روم', 'USB-C Lightning cable Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/joyroom/joyroom-smart-watches-category-card-cairovolt-egypt',
        source: 'products/joyroom/joyroom-ft3-smartwatch/joyroom-joyroom-ft3-smartwatch-egypt-cairo-1.webp',
        transparent: false,
        title: 'Joyroom Smart Watches Category — CairoVolt Egypt',
        titleAr: 'قسم ساعات جوي روم الذكية — كايرو فولت مصر',
        keywords: ['Joyroom smartwatch', 'ساعة جوي روم', 'FT3 smartwatch Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/joyroom/joyroom-car-holders-category-card-cairovolt-egypt',
        source: 'products/joyroom/joyroom-car-mount-zs290/joyroom-joyroom-car-mount-zs290-egypt-cairo-1.webp',
        transparent: false,
        trimWhite: true,
        title: 'Joyroom Car Holders Category — CairoVolt Egypt',
        titleAr: 'قسم حوامل السيارة من جوي روم — كايرو فولت مصر',
        keywords: ['Joyroom car holder', 'حامل سيارة جوي روم', 'MagSafe mount Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/joyroom/joyroom-car-accessories-category-card-cairovolt-egypt',
        source: 'products/joyroom/joyroom-60w-car-charger/joyroom-joyroom-60w-car-charger-egypt-cairo-8.webp',
        transparent: false,
        trimWhite: true,
        title: 'Joyroom Car Accessories Category — CairoVolt Egypt',
        titleAr: 'قسم إكسسوارات السيارة من جوي روم — كايرو فولت مصر',
        keywords: ['Joyroom car accessories', 'اكسسوارات سيارة جوي روم', 'car charger Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/soundcore/soundcore-audio-category-card-cairovolt-egypt',
        source: 'images/home/cutouts/soundcore-liberty-5-tws-earbuds-cutout-cairovolt.png',
        transparent: true,
        title: 'Soundcore Earbuds and Headphones Category — CairoVolt Egypt',
        titleAr: 'قسم سماعات وايربودز ساوند كور — كايرو فولت مصر',
        keywords: ['Soundcore earbuds', 'سماعات ساوند كور', 'ANC earbuds Egypt', 'CairoVolt'],
    },
    {
        output: 'images/categories/soundcore/soundcore-speakers-category-card-cairovolt-egypt',
        source: 'products/anker/soundcore-select-4-go-speaker/soundcore-select-4-go-speaker-main-view-cairovolt.webp',
        transparent: false,
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
    const hasAlpha = asset.transparent && Boolean(metadata.hasAlpha);
    const inset = Math.round(size * 0.08);
    const available = size - (inset * 2);

    let productPipeline = sharp(sourcePath, { failOn: 'warning' });
    if (hasAlpha) {
        productPipeline = productPipeline.trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } });
    } else if (asset.trimWhite) {
        productPipeline = productPipeline.trim({
            background: { r: 255, g: 255, b: 255 },
            threshold: 12,
        });
    }

    const product = await productPipeline
        .resize(available, available, {
            fit: 'contain',
            withoutEnlargement: false,
            background: hasAlpha
                ? { r: 0, g: 0, b: 0, alpha: 0 }
                : { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .webp({ quality: 88, alphaQuality: 100, effort: 6, smartSubsample: true })
        .toBuffer();

    await sharp({
        create: {
            width: size,
            height: size,
            channels: hasAlpha ? 4 : 3,
            background: hasAlpha
                ? { r: 0, g: 0, b: 0, alpha: 0 }
                : { r: 255, g: 255, b: 255 },
        },
    })
        .composite([{ input: product, gravity: 'center' }])
        .webp({ quality: 88, alphaQuality: 100, effort: 6, smartSubsample: true })
        .toFile(outputPath);

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

    execFileSync('exiftool', [
        '-overwrite_original',
        `-ImageDescription=${description}`,
        `-XMP-dc:Title=${asset.title}`,
        `-XMP-dc:Description=${description}`,
        '-XMP-dc:Contributor=CairoVolt category asset pipeline',
        `-XMP-dc:Rights=${rightsNotice}`,
        `-XMP-dc:Source=Product catalogue asset associated with ${sourceBrand}: ${asset.source}`,
        `-XMP-dc:Subject=${keywords}`,
        `-XMP-photoshop:Credit=Product catalogue imagery associated with ${sourceBrand}; category derivative prepared for CairoVolt`,
        `-XMP-photoshop:Source=Product catalogue asset associated with ${sourceBrand}`,
        '-XMP-xmpRights:UsageTerms=No reuse rights are granted by this metadata. Contact the applicable rights holder and CairoVolt before reuse.',
        `-XMP-iptcExt:DigitalSourceType=${DIGITAL_SOURCE}`,
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
                            action: 'c2pa.created',
                            softwareAgent: 'CairoVolt category asset pipeline (sharp)',
                            digitalSourceType: DIGITAL_SOURCE,
                            description: `Derived ${size}x${size} category-card variant from an existing product asset`,
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
                    creditText: `Product catalogue imagery associated with ${sourceBrand}; category derivative prepared for CairoVolt`,
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
