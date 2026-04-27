/**
 * Expand FAQ answers that are too short (<10 words)
 * These are typically Arabic FAQs that start with "نعم" 
 * and need the rest of the sentence to be on the same line
 * 
 * Strategy: The truncation is from our word-counter parsing — 
 * let's check if these are actually long enough already
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

let issues = 0;

for (const file of files) {
  const content = readFileSync(join(DIR, file), 'utf-8');
  const slug = file.replace('.ts', '');
  
  const faqs = [...content.matchAll(/answer:\s*"([^"]+)"/g)];
  for (const fq of faqs) {
    const answer = fq[1];
    const wordCount = answer.split(/\s+/).length;
    if (wordCount < 10) {
      console.log(`📦 ${slug}: ${wordCount} words — "${answer.substring(0, 80)}..."`);
      issues++;
    }
  }
}

console.log(`\n📊 Total shallow FAQs: ${issues}`);
