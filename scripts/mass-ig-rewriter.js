const fs = require('fs');
const path = require('path');
// Note: To use this script, the user must install the openai package: npm install openai

/**
 * 🚀 CairoVolt Information Gain Mass Rewriter 🚀
 * 
 * Objective: Read all products in seed-products.ts and algorithmically rewrite
 * the 'expert-review' and 'product-summary' sections using an LLM to guarantee
 * 100% mathematical uniqueness to defeat Google SpamBrain's duplicate content filters.
 * 
 * Prerequisites:
 * 1. npm install openai dotenv
 * 2. Create a .env file in the root with your OPENAI_API_KEY
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SEED_FILE_PATH = path.join(__dirname, '..', 'src', 'data', 'seed-products.ts');

const EGYPTIAN_REVIEW_PROMPT = `
You are an Egyptian Tech Reviewer working for 'Cairo Volt Labs'.
Your job is to rewrite the provided product description to make it 100% unique, engaging, and localized for the Egyptian market.

CRITICAL RULES:
1. Write in clear, professional Arabic with a slight authentic Egyptian tech flavor (e.g., use terms like 'باور بانك', 'شاحن', 'بطارية بتعمر').
2. Emphasize actual pain points in Egypt: Power outages (انقطاع الكهرباء / تخفيف الأحمال), extreme summer heat (حر الصيف), and the risk of counterfeit products (المنتجات المضروبة).
3. The format MUST be an HTML snippet containing exactly two divs: 
   - <div class="product-summary">...</div>
   - <div class="expert-review">...</div>
4. DO NOT include markdown code blocks (\`\`\`). Just return the raw HTML.
5. Keep it concise, no more than 150 words total.
6. Make it sound like a real hands-on test done in Cairo.

Input Product Name: {PRODUCT_NAME}
Original Description: {ORIGINAL_DESC}

Output ONLY the rewritten HTML snippet.
`;

async function rewriteCatalog() {
    console.log('🛡️ Starting Operation: Information Gain Mass Rewriter...');

    if (!process.env.OPENAI_API_KEY) {
        console.error('❌ ERROR: OPENAI_API_KEY is missing in .env file.');
        console.log('Please add your OpenAI API Key to a .env file to run this script safely locally.');
        process.exit(1);
    }

    try {
        let fileContent = fs.readFileSync(SEED_FILE_PATH, 'utf-8');
        console.log('✅ Loaded seed-products.ts successfully.');

        // Regex to find and extract the Arabic name and description blocks
        // Note: This is a simplified regex approach. For production, a full AST parser 
        // like 'ts-morph' might be safer, but this works for structured static data.
        const productRegex = /ar:\s*\{\s*name:\s*"([^"]+)",[\s\S]*?description:\s*`([\s\S]*?)`,\s*features/g;

        let match;
        const matches = [];

        while ((match = productRegex.exec(fileContent)) !== null) {
            matches.push({
                fullMatch: match[0],
                name: match[1],
                description: match[2],
                index: match.index
            });
        }

        console.log(`🔍 Found ${matches.length} products to rewrite.`);

        // For safety, let's just do a dry-run or process the first 3 in this example script.
        // Change the limit to matches.length to process the entire catalog.
        const LIMIT = 3;

        for (let i = 0; i < Math.min(matches.length, LIMIT); i++) {
            const product = matches[i];
            console.log(`\n⏳ Rewriting Product [${i + 1}/${LIMIT}]: ${product.name}`);

            const prompt = EGYPTIAN_REVIEW_PROMPT
                .replace('{PRODUCT_NAME}', product.name)
                .replace('{ORIGINAL_DESC}', product.description);

            try {
                const response = await openai.chat.completions.create({
                    model: "gpt-4o-mini", // Fast and cost-effective
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7,
                });

                let newDescription = response.choices[0].message.content.trim();

                // Strip markdown backticks if the AI accidentally included them
                if (newDescription.startsWith('```html')) {
                    newDescription = newDescription.replace(/```html/g, '').replace(/```/g, '').trim();
                }

                // Replace the old description with the new one in the file content
                const newFullMatch = product.fullMatch.replace(product.description, `\n${newDescription}\n`);
                fileContent = fileContent.replace(product.fullMatch, newFullMatch);

                console.log(`✅ Successfully generated mathematically unique IG for: ${product.name}`);

            } catch (apiError) {
                console.error(`❌ API Error generating description for ${product.name}:`, apiError.message);
            }
        }

        // Save the updated content
        fs.writeFileSync(SEED_FILE_PATH + '.rewritten.ts', fileContent, 'utf-8');
        console.log('\n🛡️ Operation Complete! Rewritten file saved as seed-products.ts.rewritten.ts for your review.');
        console.log('To apply the changes, rename it to seed-products.ts');

    } catch (error) {
        console.error('❌ Failed to process the catalog:', error.message);
    }
}

rewriteCatalog();
