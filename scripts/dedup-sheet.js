#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════
 *  Remove Duplicate Rows from Google Sheets
 * ═══════════════════════════════════════════════════════════════════
 * 
 *  Identifies duplicate rows by composite key:
 *    phone + order details + total amount
 *  Keeps the FIRST occurrence, deletes subsequent duplicates.
 *  Deletes from bottom-up to avoid row index shifting.
 * 
 *  Usage:
 *    node scripts/dedup-sheet.js --dry-run   (preview only)
 *    node scripts/dedup-sheet.js             (live — deletes duplicates)
 * ═══════════════════════════════════════════════════════════════════
 */

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const PROJECT_ID = 'gadgets-b0bdb';
const SHEET_ID = '1XMwbuCIsCTTAEp0b3MVj5uTKjov_Y9AGmFcchKOBx1I';
const DRY_RUN = process.argv.includes('--dry-run');

const secretClient = new SecretManagerServiceClient();

async function getSecret(name) {
    try {
        if (process.env[name]) return process.env[name].trim();
        const upper = name.toUpperCase();
        if (process.env[upper]) return process.env[upper].trim();
        const versionName = `projects/${PROJECT_ID}/secrets/${name}/versions/latest`;
        const [version] = await secretClient.accessSecretVersion({ name: versionName });
        return version.payload?.data?.toString()?.trim();
    } catch (err) {
        console.error(`❌ Failed to get secret: ${name}`, err.message);
        return null;
    }
}

async function main() {
    console.log('═══════════════════════════════════════════════════');
    console.log('  🧹 Remove Duplicate Rows from Google Sheets');
    console.log(`  Mode: ${DRY_RUN ? '🔍 DRY RUN (preview only)' : '🚀 LIVE (will DELETE duplicates)'}`);
    console.log('═══════════════════════════════════════════════════\n');

    // ── 1. Secrets ──
    console.log('📦 Fetching secrets...');
    const [gsEmail, gsKeyRaw] = await Promise.all([
        getSecret('google_service_account_email'),
        getSecret('google_private_key'),
    ]);
    if (!gsEmail || !gsKeyRaw) {
        console.error('❌ Google Sheets credentials missing.');
        process.exit(1);
    }
    console.log('✅ Secrets loaded.\n');

    // ── 2. Connect to Sheet ──
    console.log('📊 Connecting to Google Sheets...');
    const gsKey = gsKeyRaw.replace(/\\n/g, '\n');
    const auth = new JWT({
        email: gsEmail,
        key: gsKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new GoogleSpreadsheet(SHEET_ID, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    console.log(`✅ Sheet: "${doc.title}" → "${sheet.title}"\n`);

    // ── 3. Load all rows ──
    console.log('📥 Loading all rows...');
    const rows = await sheet.getRows();
    console.log(`✅ Total rows: ${rows.length}\n`);

    // ── 4. Identify duplicates ──
    // Composite key: phone + details + total
    console.log('🔍 Scanning for duplicates...\n');
    const seen = new Map(); // key → first row index
    const duplicateRowIndices = []; // row indices to delete (0-based in rows array)

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const phone = (row.get('رقم الهاتف') || '').toString().trim();
        const details = (row.get('تفاصيل الطلب') || '').toString().trim();
        const total = (row.get('توتال السعر شامل الشحن') || '').toString().trim();
        const name = (row.get('الاسم') || '').toString().trim();
        const date = (row.get('تاريخ الطلب') || '').toString().trim();

        // Build composite key
        const key = `${phone}||${details}||${total}||${name}||${date}`;

        if (seen.has(key)) {
            duplicateRowIndices.push(i);
        } else {
            seen.set(key, i);
        }
    }

    console.log(`📊 Scan Results:`);
    console.log(`   Total rows:      ${rows.length}`);
    console.log(`   Unique rows:     ${seen.size}`);
    console.log(`   Duplicate rows:  ${duplicateRowIndices.length}\n`);

    if (duplicateRowIndices.length === 0) {
        console.log('✅ No duplicates found!');
        process.exit(0);
    }

    // ── 5. Show duplicates ──
    console.log('─────────────────────────────────────────────────');
    console.log('📋 Duplicate rows to delete:');
    console.log('─────────────────────────────────────────────────');
    for (const idx of duplicateRowIndices) {
        const row = rows[idx];
        const phone = (row.get('رقم الهاتف') || '').toString().trim();
        const name = (row.get('الاسم') || '').toString().trim();
        const details = (row.get('تفاصيل الطلب') || '').toString().trim().slice(0, 50);
        const total = (row.get('توتال السعر شامل الشحن') || '').toString().trim();
        console.log(`  🗑️  Row ${idx + 2} | ${phone} | ${name} | ${details}... | ${total} EGP`);
    }
    console.log('─────────────────────────────────────────────────\n');

    if (DRY_RUN) {
        console.log('🔍 DRY RUN — no changes made. Run without --dry-run to delete duplicates.');
        process.exit(0);
    }

    // ── 6. Delete duplicates (bottom-up to avoid index shifting) ──
    console.log(`🗑️  Deleting ${duplicateRowIndices.length} duplicate rows...\n`);

    // Delete from bottom to top so row indices stay valid
    const sortedDesc = [...duplicateRowIndices].sort((a, b) => b - a);

    let deleted = 0;
    let failed = 0;

    // Process in small batches with pauses to avoid rate limits
    for (let i = 0; i < sortedDesc.length; i++) {
        const idx = sortedDesc[i];
        try {
            await rows[idx].delete();
            deleted++;
            if (deleted % 10 === 0 || deleted === sortedDesc.length) {
                console.log(`  🗑️  Deleted ${deleted}/${sortedDesc.length} rows...`);
            }
        } catch (err) {
            failed++;
            console.error(`  ❌ Failed to delete row ${idx + 2}:`, err.message);
        }

        // Rate limit: pause every 5 deletes
        if ((i + 1) % 5 === 0 && i + 1 < sortedDesc.length) {
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    console.log('\n═══════════════════════════════════════════════════');
    console.log(`  ✅ Deleted: ${deleted} duplicate rows`);
    if (failed > 0) console.log(`  ❌ Failed: ${failed} rows`);
    console.log(`  📊 Remaining rows: ~${rows.length - deleted}`);
    console.log('═══════════════════════════════════════════════════\n');
}

main().catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
});
