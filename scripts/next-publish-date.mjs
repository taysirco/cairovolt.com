#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// next-publish-date — returns the next available publish date for a new article.
// Scans all blog articles, finds the latest publishDate, returns latest+1 day
// with a random time (9:00–21:59 Cairo). Used by the blog writer workflow.
//
// Usage:
//   node scripts/next-publish-date.mjs              # prints next date ISO
//   node scripts/next-publish-date.mjs --json       # prints JSON with date + time
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = path.join(ROOT, 'src/data/blog');

// Scan all .ts files for publishDate
const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_') && f !== 'index.ts');
let latestDate = new Date();
latestDate.setHours(0, 0, 0, 0);

for (const f of files) {
    const src = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
    const m = src.match(/publishDate:\s*['"`](\d{4}-\d{2}-\d{2}[^'"`]*)['"`]/);
    if (m) {
        const d = new Date(m[1]);
        if (!isNaN(d.getTime()) && d > latestDate) {
            latestDate = new Date(d);
            latestDate.setHours(0, 0, 0, 0);
        }
    }
}

// Next day
const nextDay = new Date(latestDate);
nextDay.setDate(nextDay.getDate() + 1);

// Random time between 9:00 and 21:59 Cairo time
const hh = 9 + Math.floor(Math.random() * 13);  // 9-21
const mm = Math.floor(Math.random() * 60);       // 0-59
const pad = (n) => String(n).padStart(2, '0');

const iso = `${nextDay.getFullYear()}-${pad(nextDay.getMonth() + 1)}-${pad(nextDay.getDate())}T${pad(hh)}:${pad(mm)}:00+02:00`;
const dateOnly = `${nextDay.getFullYear()}-${pad(nextDay.getMonth() + 1)}-${pad(nextDay.getDate())}`;

if (process.argv.includes('--json')) {
    console.log(JSON.stringify({ publishDate: iso, dateOnly, latestExisting: latestDate.toISOString().slice(0, 10) }));
} else {
    console.log(`📅 آخر تاريخ نشر موجود: ${latestDate.toISOString().slice(0, 10)}`);
    console.log(`📅 التاريخ التالي المتاح: ${iso}`);
    console.log(`\n💡 استخدم في المقال الجديد:`);
    console.log(`   publishDate: '${iso}'`);
    console.log(`   modifiedDate: '${iso}'`);
}
