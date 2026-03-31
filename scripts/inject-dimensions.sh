#!/bin/bash
# Inject width/height into product .ts image entries
set -euo pipefail
SRC="src/data/products"
BASE="public/products/anker"
TOTAL=0

echo "📐 Injecting real width/height into product images..."

for tsfile in "$SRC"/anker-*.ts; do
    slug=$(basename "$tsfile" .ts)
    folder="${BASE}/${slug}"
    [ -d "$folder" ] || continue
    
    count=0
    # Find all image URLs in the file
    while IFS= read -r url; do
        filepath="public${url}"
        if [ -f "$filepath" ]; then
            w=$(exiftool -ImageWidth -s3 "$filepath" 2>/dev/null)
            h=$(exiftool -ImageHeight -s3 "$filepath" 2>/dev/null)
            if [ -n "$w" ] && [ -n "$h" ]; then
                basename_img=$(basename "$url")
                # Add width and height after the isPrimary field
                sed -i '' "/${basename_img}/s|isPrimary: true }|isPrimary: true, width: ${w}, height: ${h} }|" "$tsfile" 2>/dev/null
                sed -i '' "/${basename_img}/s|isPrimary: false }|isPrimary: false, width: ${w}, height: ${h} }|" "$tsfile" 2>/dev/null
                count=$((count + 1))
            fi
        fi
    done < <(grep -o 'url: "[^"]*"' "$tsfile" | sed 's/url: "//;s/"//')
    
    TOTAL=$((TOTAL + count))
    echo "✅ $slug — $count images sized"
done

echo ""
echo "═══════════════════════════════════════════"
echo "✅ TOTAL: ${TOTAL} images with width/height"
echo "═══════════════════════════════════════════"
