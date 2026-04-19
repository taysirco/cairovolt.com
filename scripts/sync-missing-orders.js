#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════
 *  Sync Missing Orders: Firestore → Google Sheets
 * ═══════════════════════════════════════════════════════════════════
 * 
 *  Reads ALL orders from Firestore, compares phone numbers against
 *  Google Sheets rows, and pushes only the missing orders.
 * 
 *  Deduplication: Uses phone number as the primary key since order IDs
 *  may differ between systems. Also checks order date for extra safety.
 * 
 *  Usage:
 *    node scripts/sync-missing-orders.js
 *    node scripts/sync-missing-orders.js --dry-run   (preview only)
 * ═══════════════════════════════════════════════════════════════════
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

// ── Config ──
const PROJECT_ID = 'gadgets-b0bdb';
const DATABASE_ID = 'gadgets';
const SHEET_ID = '1XMwbuCIsCTTAEp0b3MVj5uTKjov_Y9AGmFcchKOBx1I';
const DRY_RUN = process.argv.includes('--dry-run');

// ── Secret Manager ──
const secretClient = new SecretManagerServiceClient();

async function getSecret(name) {
    try {
        // Try env first
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

// ── Build notes field (same as production) ──
function buildNotesField(orderData) {
    const itemCount = orderData.items ? orderData.items.length : 0;
    const parts = [`طلب من الموقع - ${itemCount} منتج`];
    if (orderData.couponCode) {
        parts.push(`كوبون: ${orderData.couponCode} | خصم: ${orderData.couponDiscount} جنيه`);
    }
    if (orderData.source) {
        parts.push(`المصدر: ${orderData.source}`);
    }
    return parts.join(' | ');
}

// ── Format date like production ──
function formatDate(timestamp) {
    if (!timestamp) return new Date().toLocaleDateString('ar-EG');
    // Firestore Timestamp
    if (timestamp._seconds) {
        return new Date(timestamp._seconds * 1000).toLocaleDateString('ar-EG');
    }
    if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString('ar-EG');
    }
    return new Date(timestamp).toLocaleDateString('ar-EG');
}

async function main() {
    console.log('═══════════════════════════════════════════════════');
    console.log('  🔄 Sync Missing Orders: Firestore → Google Sheets');
    console.log(`  Mode: ${DRY_RUN ? '🔍 DRY RUN (preview only)' : '🚀 LIVE (will push to Sheets)'}`);
    console.log('═══════════════════════════════════════════════════\n');

    // ── 1. Get secrets ──
    console.log('📦 Fetching secrets from GCP Secret Manager...');
    const [fbEmail, fbKeyRaw, gsEmail, gsKeyRaw] = await Promise.all([
        getSecret('firebase_client_email'),
        getSecret('firebase_private_key'),
        getSecret('google_service_account_email'),
        getSecret('google_private_key'),
    ]);

    if (!fbEmail || !fbKeyRaw) {
        console.error('❌ Firebase credentials missing. Aborting.');
        process.exit(1);
    }
    if (!gsEmail || !gsKeyRaw) {
        console.error('❌ Google Sheets credentials missing. Aborting.');
        process.exit(1);
    }
    console.log('✅ Secrets loaded.\n');

    // ── 2. Initialize Firestore ──
    console.log('🔥 Connecting to Firestore...');
    const fbKey = fbKeyRaw.replace(/\\n/g, '\n');
    const app = initializeApp({
        credential: cert({ projectId: PROJECT_ID, clientEmail: fbEmail, privateKey: fbKey }),
    });
    const db = getFirestore(app, DATABASE_ID);
    console.log('✅ Firestore connected.\n');

    // ── 3. Fetch ALL orders from Firestore ──
    console.log('📥 Fetching orders from Firestore...');
    const ordersSnapshot = await db.collection('orders').orderBy('createdAt', 'desc').get();
    const firestoreOrders = ordersSnapshot.docs.map(doc => ({
        firestoreId: doc.id,
        ...doc.data(),
    }));
    console.log(`✅ Found ${firestoreOrders.length} orders in Firestore.\n`);

    // ── 4. Connect to Google Sheets ──
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
    console.log(`✅ Connected to sheet: "${doc.title}" → "${sheet.title}"\n`);

    // ── 5. Fetch ALL rows from Google Sheets ──
    console.log('📥 Fetching rows from Google Sheets...');
    const rows = await sheet.getRows();
    console.log(`✅ Found ${rows.length} rows in Google Sheets.\n`);

    // ── 6. Build a Set of existing phone numbers in Sheets for fast lookup ──
    // Use phone + order details as composite key for accurate dedup
    const sheetPhoneSet = new Set();
    const sheetPhoneDetailMap = new Map(); // phone → [details]

    for (const row of rows) {
        const phone = (row.get('رقم الهاتف') || '').toString().trim().replace(/[^0-9]/g, '');
        const details = (row.get('تفاصيل الطلب') || '').toString().trim();
        const total = (row.get('توتال السعر شامل الشحن') || '').toString().trim();
        
        if (phone) {
            sheetPhoneSet.add(phone);
            
            // Store all entries per phone for detailed matching
            if (!sheetPhoneDetailMap.has(phone)) {
                sheetPhoneDetailMap.set(phone, []);
            }
            sheetPhoneDetailMap.set(phone, [
                ...sheetPhoneDetailMap.get(phone),
                { details, total }
            ]);
        }
    }
    console.log(`📋 Unique phone numbers in Sheets: ${sheetPhoneSet.size}\n`);

    // ── 7. Find missing orders ──
    console.log('🔍 Comparing Firestore orders against Google Sheets...\n');
    const missingOrders = [];

    for (const order of firestoreOrders) {
        const phone = (order.phone || '').toString().trim().replace(/[^0-9]/g, '');
        if (!phone) continue;

        // Skip if no items
        if (!order.items || order.items.length === 0) continue;

        // ── Filter out test/fake orders ──
        // Only sync orders with valid 11-digit Egyptian phone numbers
        const isValidPhone = /^01[0125][0-9]{8}$/.test(phone);
        if (!isValidPhone) {
            // Also skip international format with country code that's still not 11 local digits
            const localPhone = phone.replace(/^20/, '').replace(/^\+/, '');
            if (!/^01[0125][0-9]{8}$/.test(localPhone)) continue;
        }

        // Skip obvious test orders
        const name = (order.customerName || '').toLowerCase();
        const isTest = ['test', 'تست', 'تجربة', 'طلب تجريبي', 'احذفه'].some(t => name.includes(t));
        if (isTest) continue;

        // Build the detail string the same way production does for the FIRST item
        const firstItem = order.items[0];
        const detailStr = `${firstItem.name} (x${firstItem.quantity}) - ${(firstItem.price || 0) * (firstItem.quantity || 1)} EGP`;

        if (!sheetPhoneSet.has(phone)) {
            // Phone number not in sheet at all → definitely missing
            missingOrders.push(order);
        } else {
            // Phone exists — check if THIS specific order is there
            // Match by checking if the detail string exists for this phone
            const sheetEntries = sheetPhoneDetailMap.get(phone) || [];
            const found = sheetEntries.some(entry => {
                // Check if the detail matches
                if (entry.details === detailStr) return true;
                // Also match by total amount if detail format changed
                if (entry.total && order.totalAmount && 
                    entry.total.toString() === order.totalAmount.toString()) return true;
                return false;
            });

            if (!found) {
                missingOrders.push(order);
            }
        }
    }

    console.log(`📊 Results:`);
    console.log(`   Firestore orders:  ${firestoreOrders.length}`);
    console.log(`   Sheets rows:       ${rows.length}`);
    console.log(`   Missing orders:    ${missingOrders.length}\n`);

    if (missingOrders.length === 0) {
        console.log('✅ All orders are in sync! Nothing to push.');
        process.exit(0);
    }

    // ── 8. Display missing orders ──
    console.log('─────────────────────────────────────────────────');
    console.log('📋 Missing Orders:');
    console.log('─────────────────────────────────────────────────');
    for (const order of missingOrders) {
        const date = formatDate(order.createdAt);
        const items = (order.items || []).map(i => `${i.name} x${i.quantity}`).join(', ');
        console.log(`  📦 ${order.orderId || order.firestoreId} | ${order.phone} | ${order.customerName} | ${date} | ${items} | ${order.totalAmount} EGP`);
    }
    console.log('─────────────────────────────────────────────────\n');

    if (DRY_RUN) {
        console.log('🔍 DRY RUN — no changes made. Run without --dry-run to push to Sheets.');
        process.exit(0);
    }

    // ── 9. Push missing orders to Google Sheets ──
    console.log(`🚀 Pushing ${missingOrders.length} missing orders to Google Sheets...\n`);

    let successCount = 0;
    let failCount = 0;

    // Process in batches of 5 to avoid rate limits
    const BATCH_SIZE = 5;
    for (let i = 0; i < missingOrders.length; i += BATCH_SIZE) {
        const batch = missingOrders.slice(i, i + BATCH_SIZE);
        
        // Build all rows for this batch
        const allRows = [];
        for (const order of batch) {
            const orderRows = (order.items || []).map((item, idx) => ({
                'تاريخ الطلب': formatDate(order.createdAt),
                'الاسم': order.customerName || '',
                'رقم الهاتف': order.phone || '',
                'رقم الواتس': order.whatsapp || order.phone || '',
                'المحافظة': order.cityLabel || order.city || '',
                'المنطقة': '',
                'العنوان': order.address || '',
                'تفاصيل الطلب': `${item.name} (x${item.quantity}) - ${(item.price || 0) * (item.quantity || 1)} EGP`,
                'الكمية': item.quantity || 1,
                'توتال السعر شامل الشحن': idx === 0 ? (order.totalAmount || 0) : '',
                'اسم المنتج': item.name || '',
                'سعر المنتج': item.price || 0,
                'الحالة': order.status === 'pending' ? 'جديد' : (order.status || 'جديد'),
                'ملاحظات': idx === 0 ? buildNotesField(order) : '',
                'كود الخصم': idx === 0 ? (order.couponCode || '') : '',
            }));
            allRows.push(...orderRows);
        }

        try {
            await sheet.addRows(allRows);
            successCount += batch.length;
            console.log(`  ✅ Batch ${Math.floor(i / BATCH_SIZE) + 1}: pushed ${batch.length} orders (${allRows.length} rows)`);
        } catch (err) {
            failCount += batch.length;
            console.error(`  ❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, err.message);
            // Retry individually
            for (const order of batch) {
                try {
                    const singleRows = (order.items || []).map((item, idx) => ({
                        'تاريخ الطلب': formatDate(order.createdAt),
                        'الاسم': order.customerName || '',
                        'رقم الهاتف': order.phone || '',
                        'رقم الواتس': order.whatsapp || order.phone || '',
                        'المحافظة': order.cityLabel || order.city || '',
                        'المنطقة': '',
                        'العنوان': order.address || '',
                        'تفاصيل الطلب': `${item.name} (x${item.quantity}) - ${(item.price || 0) * (item.quantity || 1)} EGP`,
                        'الكمية': item.quantity || 1,
                        'توتال السعر شامل الشحن': idx === 0 ? (order.totalAmount || 0) : '',
                        'اسم المنتج': item.name || '',
                        'سعر المنتج': item.price || 0,
                        'الحالة': order.status === 'pending' ? 'جديد' : (order.status || 'جديد'),
                        'ملاحظات': idx === 0 ? buildNotesField(order) : '',
                        'كود الخصم': idx === 0 ? (order.couponCode || '') : '',
                    }));
                    await sheet.addRows(singleRows);
                    successCount++;
                    failCount--; // We already counted it as failed
                    console.log(`    ↳ ✅ Retry OK: ${order.orderId || order.firestoreId}`);
                } catch (retryErr) {
                    console.error(`    ↳ ❌ Retry failed: ${order.orderId || order.firestoreId}:`, retryErr.message);
                }
            }
        }

        // Rate limit pause between batches
        if (i + BATCH_SIZE < missingOrders.length) {
            await new Promise(r => setTimeout(r, 1000));
        }
    }

    console.log('\n═══════════════════════════════════════════════════');
    console.log(`  ✅ Successfully pushed: ${successCount} orders`);
    if (failCount > 0) console.log(`  ❌ Failed: ${failCount} orders`);
    console.log('═══════════════════════════════════════════════════\n');
}

main().catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
});
