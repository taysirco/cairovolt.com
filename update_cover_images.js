const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src/data/blog');
const imgDir = path.join(__dirname, 'public/images/blog/posts');

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.ts'));
let updatedCount = 0;

for (const file of files) {
    const tsPath = path.join(blogDir, file);
    let content = fs.readFileSync(tsPath, 'utf8');
    
    const slug = file.replace('.ts', '');
    const expectedWebp = path.join(imgDir, `${slug}.webp`);
    
    if (fs.existsSync(expectedWebp)) {
        const newCoverImage = `/images/blog/posts/${slug}.webp`;
        const updatedContent = content.replace(/coverImage:\s*['"][^'"]+['"]/, `coverImage: '${newCoverImage}'`);
        if (content !== updatedContent) {
            fs.writeFileSync(tsPath, updatedContent, 'utf8');
            console.log(`Updated ${file}`);
            updatedCount++;
        }
    }
}

console.log(`\nTotal files updated: ${updatedCount}`);
