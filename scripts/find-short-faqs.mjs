import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));
for (const file of files) {
  const content = readFileSync(join(DIR, file), 'utf-8');
  const slug = file.replace('.ts', '');
  const answers = [...content.matchAll(/answer:\s*"([^"]+)"/g)];
  const short = answers.filter(m => m[1].split(/\s+/).length < 10);
  if (short.length > 0) {
    console.log(`\n📦 ${slug}`);
    for (const s of short) {
      console.log(`   ⚠️ [${s[1].split(/\s+/).length} words] "${s[1]}"`);
    }
  }
}
