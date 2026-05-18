const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src/data/blog');
const imgDir = path.join(__dirname, 'public/images/blog/posts');

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.ts') && f !== '_types.ts');
const images = fs.readdirSync(imgDir).filter(f => f.endsWith('.webp'));

function similarity(s1, s2) {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  let longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  let costs = new Array();
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

for (const file of files) {
    const tsPath = path.join(blogDir, file);
    let content = fs.readFileSync(tsPath, 'utf8');
    const slug = file.replace('.ts', '');
    
    // Check if coverImage already exists and has a value
    if (/coverImage:\s*['"][^'"]+['"]/.test(content)) {
        continue; // skip
    }
    
    // Find best matching image
    let bestImg = null;
    let bestScore = 0;
    
    const words = slug.split('-');
    
    for (const img of images) {
        const imgSlug = img.replace('.webp', '');
        let score = 0;
        
        // Count matching words
        const imgWords = imgSlug.split('-');
        let matches = 0;
        for (const w of words) {
            if (imgWords.includes(w)) matches++;
        }
        
        // Weight by similarity as tie breaker
        score = matches * 10 + similarity(slug, imgSlug);
        
        if (score > bestScore && matches >= 2) {
            bestScore = score;
            bestImg = img;
        }
    }
    
    if (bestImg) {
        const newCoverImage = `/images/blog/posts/${bestImg}`;
        const updatedContent = content.replace(/slug:\s*['"]([^'"]+)['"]\s*,/, `slug: '$1',\n        coverImage: '${newCoverImage}',`);
        if (content !== updatedContent) {
            fs.writeFileSync(tsPath, updatedContent, 'utf8');
            console.log(`Matched ${file} with ${bestImg}`);
        }
    } else {
        console.log(`No good match for ${file}`);
    }
}
