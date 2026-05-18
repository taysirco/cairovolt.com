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
        
        // If coverImage already exists, replace it
        if (/coverImage:\s*['"][^'"]+['"]/.test(content)) {
            const updatedContent = content.replace(/coverImage:\s*['"][^'"]+['"]/, `coverImage: '${newCoverImage}'`);
            if (content !== updatedContent) {
                fs.writeFileSync(tsPath, updatedContent, 'utf8');
                console.log(`Updated ${file}`);
                updatedCount++;
            }
        } else {
            // Otherwise, insert it after slug
            const updatedContent = content.replace(/slug:\s*['"]([^'"]+)['"]\s*,/, `slug: '$1',\n        coverImage: '${newCoverImage}',`);
            if (content !== updatedContent) {
                fs.writeFileSync(tsPath, updatedContent, 'utf8');
                console.log(`Inserted coverImage in ${file}`);
                updatedCount++;
            }
        }
    }
}

console.log(`\nTotal files updated: ${updatedCount}`);
