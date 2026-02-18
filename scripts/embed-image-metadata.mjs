#!/usr/bin/env node
/**
 * CairoVolt — Professional XMP/IPTC Metadata Embedding
 *
 * Embeds provenance metadata into all WebP product images so that:
 *  - Google, Adobe Content Credentials, and C2PA-compatible tools
 *    can read that images are real camera captures (not AI-generated).
 *  - IPTC DigitalSourceType = "digitalCapture" is the industry standard
 *    signal understood by Google Images, Bing, and stock photo platforms.
 *
 * Uses ExifTool (system-installed) — the gold standard for metadata editing.
 * Processes all 301 WebP images in /public/products/ in parallel batches.
 *
 * Run: node scripts/embed-image-metadata.mjs
 */

import { execFile } from 'child_process';
import { promisify } from 'util';
import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PRODUCTS_DIR = path.join(ROOT, 'public', 'products');

const EXIFTOOL = '/opt/homebrew/bin/exiftool';
const BATCH_SIZE = 20; // process N images in parallel
const NOW_ISO = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// ── XMP/IPTC fields to embed ────────────────────────────────────────────────
//
// DigitalSourceType codes (IPTC standard):
//   digitalCapture  → photographed by a real camera (tells Google it's NOT AI)
//   trainedAlgorithmicMedia → AI-generated (we do NOT use this)
//
// Full code list: https://cv.iptc.org/newscodes/digitalsourcetype/
//
const METADATA_ARGS = [
  // IPTC DigitalSourceType — the most important field for AI vs human detection
  `-XMP-iptcExt:DigitalSourceType=http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture`,

  // Content Authenticity / Provenance
  `-XMP-dc:Creator=CairoVolt`,
  `-XMP-dc:Rights=© ${new Date().getFullYear()} CairoVolt — cairovolt.com. All rights reserved.`,
  `-XMP-dc:Source=cairovolt.com`,

  // Rights Management
  `-XMP-xmpRights:WebStatement=https://cairovolt.com`,
  `-XMP-xmpRights:Marked=True`,
  `-XMP-xmpRights:UsageTerms=Original product photography. All rights reserved by CairoVolt.`,

  // Photoshop / Standard fields (widely read by Google)
  `-XMP-photoshop:Source=CairoVolt — Official Mobile Accessories Distributor, Egypt`,
  `-XMP-photoshop:Credit=cairovolt.com`,
  `-XMP-photoshop:DateCreated=${NOW_ISO}`,
  `-XMP-photoshop:City=Cairo`,
  `-XMP-photoshop:Country=Egypt`,
  `-XMP-photoshop:CountryCode=EG`,

  // Basic IPTC Core
  `-XMP-iptcCore:CreatorContactInfo=https://cairovolt.com`,
  `-XMP-iptcCore:CopyrightNotice=© ${new Date().getFullYear()} CairoVolt`,

  // Dublin Core extended
  `-XMP-dc:Publisher=CairoVolt`,
  `-XMP-dc:Language=ar-EG`,

  // Basic EXIF creator fields (read by all tools)
  `-Artist=CairoVolt`,
  `-Copyright=© ${new Date().getFullYear()} CairoVolt - cairovolt.com`,

  // Overwrite originals in place (no _original backup files)
  `-overwrite_original`,
  `-quiet`,
];

async function embedMetadata(imagePaths) {
  const args = [...METADATA_ARGS, ...imagePaths];
  try {
    await execFileAsync(EXIFTOOL, args, { maxBuffer: 50 * 1024 * 1024 });
    return { ok: imagePaths.length, failed: 0 };
  } catch (err) {
    // ExifTool exit code 1 = some files failed (still partial success)
    const output = (err.stdout || '') + (err.stderr || '');
    const failedMatch = output.match(/(\d+) files? could not be updated/);
    const failed = failedMatch ? parseInt(failedMatch[1]) : imagePaths.length;
    return { ok: imagePaths.length - failed, failed };
  }
}

async function main() {
  console.log('🔍 Scanning product images...');
  const images = await glob('**/*.webp', { cwd: PRODUCTS_DIR, absolute: true });

  if (images.length === 0) {
    console.error('❌ No WebP images found in', PRODUCTS_DIR);
    process.exit(1);
  }

  console.log(`📸 Found ${images.length} WebP images`);
  console.log(`🏷️  Embedding XMP/IPTC provenance metadata...`);
  console.log(`   DigitalSourceType = digitalCapture (real camera, not AI)`);
  console.log(`   Creator = CairoVolt | Country = Egypt\n`);

  // Process in batches
  const batches = [];
  for (let i = 0; i < images.length; i += BATCH_SIZE) {
    batches.push(images.slice(i, i + BATCH_SIZE));
  }

  let totalOk = 0;
  let totalFailed = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const start = i * BATCH_SIZE + 1;
    const end = Math.min((i + 1) * BATCH_SIZE, images.length);
    process.stdout.write(`   Batch ${i + 1}/${batches.length} (images ${start}–${end})... `);

    const { ok, failed } = await embedMetadata(batch);
    totalOk += ok;
    totalFailed += failed;
    console.log(failed === 0 ? `✅ ${ok}` : `⚠️  ${ok} ok, ${failed} failed`);
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`✅ Done: ${totalOk} images tagged successfully`);
  if (totalFailed > 0) console.log(`⚠️  Failed: ${totalFailed} images`);
  console.log(`\n🌐 Google will now read every product image as:`);
  console.log(`   • Source: Real camera capture (not AI-generated)`);
  console.log(`   • Creator: CairoVolt — cairovolt.com`);
  console.log(`   • Rights: © ${new Date().getFullYear()} CairoVolt, Cairo, Egypt`);
  console.log(`\n💡 Verify with: exiftool -XMP:all public/products/anker/**/*.webp | head -20`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
