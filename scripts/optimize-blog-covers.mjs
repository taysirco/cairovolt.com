#!/usr/bin/env node
// Optimize every webp in public/images/blog/posts/ for delivery speed:
//   - Re-encode with sharp WebP at quality 82 + effort 6 + smartSubsample
//     (perceptually identical to q85/q88 with default effort, but much smaller).
//   - Preserve every EXIF/XMP field we set in the original pipelines.
//   - Skip files where the re-encoded version isn't smaller.
//
// Run from repo root:  node scripts/optimize-blog-covers.mjs [--dry] [--only=<slug>]
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'public/images/blog/posts');

const args = new Set(process.argv.slice(2));
const dry = args.has('--dry');
const onlyArg = [...args].find(a => a.startsWith('--only='));
const only = onlyArg ? onlyArg.split('=')[1] : null;

const Q = 82;       // perceptually transparent vs the original q85/q88
const EFFORT = 6;   // max — slow encode, smallest file
const KEEP_THRESHOLD = 0.97; // only commit if new file is < 97% of original

function readExif(filePath) {
    try {
        const out = execFileSync('exiftool', ['-json', filePath], { encoding: 'utf8' });
        const parsed = JSON.parse(out);
        return parsed[0] || {};
    } catch {
        return {};
    }
}

function applyExif(filePath, tags) {
    const args = ['-overwrite_original'];
    const map = {
        Artist: 'Artist',
        Copyright: 'Copyright',
        ImageDescription: 'ImageDescription',
        Title: 'XMP-dc:Title',
        Description: 'XMP-dc:Description',
        Creator: 'XMP-dc:Creator',
        Rights: 'XMP-dc:Rights',
        Subject: 'XMP-dc:Subject',
        Credit: 'XMP-photoshop:Credit',
        Source: 'XMP-photoshop:Source',
    };
    for (const [src, dst] of Object.entries(map)) {
        const v = tags[src];
        if (v !== undefined && v !== null && v !== '') {
            args.push(`-${dst}=${Array.isArray(v) ? v.join(',') : v}`);
        }
    }
    args.push(filePath);
    try {
        execFileSync('exiftool', args, { stdio: 'pipe' });
        return true;
    } catch (e) {
        console.warn(`  EXIF re-apply failed: ${e.message?.split('\n')[0]}`);
        return false;
    }
}

async function main() {
    if (!fs.existsSync(POSTS_DIR)) {
        console.error(`Posts dir not found: ${POSTS_DIR}`);
        process.exit(1);
    }
    const all = fs.readdirSync(POSTS_DIR).filter(f => f.toLowerCase().endsWith('.webp')).sort();
    const files = only ? all.filter(f => f.includes(only)) : all;

    if (!files.length) {
        console.log(`No files matched (only=${only}).`);
        return;
    }

    console.log(`Optimizing ${files.length} file(s) in ${POSTS_DIR}${dry ? ' [DRY RUN]' : ''}`);
    console.log(`Settings: webp q=${Q} effort=${EFFORT} smartSubsample, commit if <${(KEEP_THRESHOLD * 100).toFixed(0)}% of original.\n`);

    let totalBefore = 0, totalAfter = 0;
    let optimized = 0, skipped = 0, exifOk = 0;

    for (const name of files) {
        const filePath = path.join(POSTS_DIR, name);
        const before = fs.statSync(filePath).size;
        totalBefore += before;

        const exifTags = readExif(filePath);

        let buf;
        try {
            buf = await sharp(filePath)
                .webp({ quality: Q, effort: EFFORT, smartSubsample: true })
                .toBuffer();
        } catch (e) {
            console.warn(`! ${name}: encode failed (${e.message?.split('\n')[0]}) — kept original`);
            totalAfter += before;
            skipped++;
            continue;
        }

        if (buf.length >= before * KEEP_THRESHOLD) {
            totalAfter += before;
            skipped++;
            console.log(`= ${name}  ${(before / 1024).toFixed(0)}KB (already near-optimal)`);
            continue;
        }

        if (dry) {
            totalAfter += buf.length;
            optimized++;
            const pct = ((1 - buf.length / before) * 100).toFixed(1);
            console.log(`~ ${name}  ${(before / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB  (-${pct}%) [dry]`);
            continue;
        }

        fs.writeFileSync(filePath, buf);
        if (applyExif(filePath, exifTags)) exifOk++;

        const after = fs.statSync(filePath).size;
        totalAfter += after;
        optimized++;
        const pct = ((1 - after / before) * 100).toFixed(1);
        console.log(`+ ${name}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (-${pct}%)`);
    }

    const savedMB = (totalBefore - totalAfter) / 1024 / 1024;
    console.log(`\nDone. Optimized: ${optimized} | Skipped: ${skipped} | EXIF: ${exifOk}`);
    console.log(`Total: ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(totalAfter / 1024 / 1024).toFixed(2)}MB (saved ${savedMB.toFixed(2)}MB)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
