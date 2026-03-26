
import { products } from './src/data/seed-products';
import { brandData } from './src/data/brand-data';

console.log('Starting Deep Content & Brand Integrity Audit...');

let errorCount = 0;

// 1. Check Brand Data Integrity
console.log('\n--- Checking Brand Data Integrity ---');
const ankerData = JSON.stringify(brandData.anker).toLowerCase();
if (ankerData.includes('joyroom')) {
    console.error('❌ CRITICAL: "Joyroom" found in Anker brand data!');
    errorCount++;
} else {
    console.log('✅ Anker brand data is free of Joyroom references.');
}

const joyroomData = JSON.stringify(brandData.joyroom).toLowerCase();
if (joyroomData.includes('anker')) {
    console.error('❌ CRITICAL: "Anker" found in Joyroom brand data!');
    errorCount++;
} else {
    console.log('✅ Joyroom brand data is free of Anker references.');
}

// 2. Check Product Data Integrity
console.log('\n--- Checking Product Data Integrity ---');
const seenDescriptions = new Map<string, string>();
const seenExpertOpinions = new Map<string, string>();

products.forEach(product => {
    // Check for Cross-Brand Contamination in Content
    const content = JSON.stringify(product).toLowerCase();
    const isAnker = product.brand.toLowerCase() === 'anker';
    const isJoyroom = product.brand.toLowerCase() === 'joyroom';

    if (isAnker && content.includes('joyroom')) {
        console.error(`❌ CRITICAL: "Joyroom" found in Anker product: ${product.slug}`);
        errorCount++;
    }
    if (isJoyroom && content.includes('anker')) {
        console.error(`❌ CRITICAL: "Anker" found in Joyroom product: ${product.slug}`);
        errorCount++;
    }

    // Check for Duplicate Descriptions (English)
    const descEn = product.translations.en.description.trim();
    if (seenDescriptions.has(descEn)) {
        console.warn(`⚠️  Duplicate Description (EN) found: ${product.slug} matches ${seenDescriptions.get(descEn)}`);
        // Duplicate descriptions are bad for SEO, but not always critical if products are variants.
        // Un-commenting errorCount++ would make this strict.
    } else {
        seenDescriptions.set(descEn, product.slug);
    }

    // Check for Duplicate Expert Opinions (English)
    if ((product as any).expertOpinion?.en) {
        const opinionEn = (product as any).expertOpinion.en.trim();
        if (seenExpertOpinions.has(opinionEn)) {
            console.error(`❌ DUPLICATE Expert Opinion found: ${product.slug} matches ${seenExpertOpinions.get(opinionEn)}`);
            errorCount++;
        } else {
            seenExpertOpinions.set(opinionEn, product.slug);
        }
    }
});

console.log(`\nAudit Complete. Found ${errorCount} critical errors.`);

if (errorCount > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
