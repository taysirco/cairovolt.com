/**
 * CairoVolt Image DNA Sealer
 * Injects EXIF metadata (GPS, author, copyright) into product images
 * to prove physical existence for Google Lens and Image Search.
 *
 * Usage: node scripts/seal-images.mjs
 * Requires: npm install exiftool-vendored --save-dev
 */
import { exiftool } from 'exiftool-vendored';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsDir = path.join(__dirname, '../public/products');

const cairoVoltDNA = {
    Author: 'Eng. Ahmed Mahmoud - CairoVolt Labs',
    Copyright: `© ${new Date().getFullYear()} CairoVolt LLC (CR: 8446). All rights reserved.`,
    Credit: 'Cairo Volt Fulfillment Hub',
    Make: 'Apple',
    Model: 'iPhone 15 Pro Max',
    Software: 'CairoVolt Deep Vision 1.0',
    GPSLatitude: 30.6997469,
    GPSLatitudeRef: 'N',
    GPSLongitude: 31.2088556,
    GPSLongitudeRef: 'E',
    ImageDescription: 'صورة أصلية لمنتج مادي من داخل مخازن كايرو فولت مصر.',
};

async function sealDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await sealDirectory(fullPath);
            continue;
        }

        if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
            try {
                await exiftool.write(fullPath, cairoVoltDNA, ['-overwrite_original']);
                console.log(`✅ Sealed: ${path.relative(productsDir, fullPath)}`);
            } catch (err) {
                console.error(`❌ Failed: ${entry.name} — ${err.message}`);
            }
        }
    }
}

console.log('🔐 CairoVolt Image DNA Sealer — Starting...');
console.log(`📂 Scanning: ${productsDir}\n`);

if (!fs.existsSync(productsDir)) {
    console.error('❌ Products directory not found:', productsDir);
    process.exit(1);
}

sealDirectory(productsDir)
    .then(() => {
        console.log('\n✅ All images sealed successfully.');
        return exiftool.end();
    })
    .catch((err) => {
        console.error('Fatal error:', err);
        exiftool.end();
        process.exit(1);
    });
