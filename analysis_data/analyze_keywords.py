import glob
import csv
import os
import re

def parse_volume(vol_str):
    if not vol_str:
        return 0
    try:
        return int(float(vol_str.replace(',', '').replace('"', '').replace('‎', '').replace('%', '')))
    except:
        return 0

def categorize_keyword(keyword):
    text = keyword.lower()
    
    brand = "Unknown"
    # Detect brand
    if re.search(r'anker|انكر|أنكر', text):
        brand = "Anker"
    elif re.search(r'joyroom|joy room|جوي روم|جوى روم', text):
        brand = "Joyroom"
    
    category = "Other Accessories"
    
    # Categories regex
    if re.search(r'power ?bank|portable|battery|باور ?بانك|بطارية|متنقل', text):
        category = "Power Banks"
    elif re.search(r'car charger|car adapter|شاحن (سيارة|عربية)|سيارة', text):
        category = "Car Chargers"
    elif re.search(r'wall charger|adapter|plug|cube|brick|charger|fast charger|شاحن|رأس', text) and not re.search(r'car|سيارة', text):
         # "charger" alone often means wall charger if not car
        category = "Wall Chargers"
    elif re.search(r'cable|cord|wire|lightning|type ?c|usb|lead|كابل|وصلة|سلك|كيبل', text):
        category = "Cables"
    elif re.search(r'headphone|earbud|earphone|airpod|headset|neckband|buds|سماعة|سماعات|ايربودز', text):
        category = "Audio & Headphones"
    elif re.search(r'watch|smart ?watch|band|strap|ساعة|ساعه|مؤقت|استيك', text):
        category = "Smart Watches"
    elif re.search(r'speaker|soundcore|مكبر|صب|اسبيكر', text): 
        category = "Speakers"
    elif re.search(r'holder|mount|stand|magnetic|clip|حامل|مثبت|قاعدة', text):
        category = "Car Holders & Mounts"
    elif re.search(r'cover|case|screen|protector|glass|pouch|جراب|كفر|شاشة|حماية', text):
        category = "Protection (Cases & Screens)"
    
    # Logic to fix "charger" generalized if it didn't hit specific buckets but hit "Unknown" brand
    # If no category hit, and contains basic generic terms:
    
    return brand, category

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    files = glob.glob(os.path.join(script_dir, "Keyword Stats *.csv"))
    
    keywords_data = {} # (brand, category) -> list of dicts
    
    all_keywords = set()

    print(f"Found {len(files)} files.")

    for file_path in files:
        print(f"Processing {os.path.basename(file_path)}...")
        try:
            # Attempt to read with utf-16le (common for Google Planner)
            with open(file_path, 'r', encoding='utf-16le') as f:
                content = f.read()
            
            lines = content.strip().split('\n')
            
            header_idx = -1
            for i, line in enumerate(lines):
                if "Keyword" in line and "Avg. monthly searches" in line:
                    header_idx = i
                    break
            
            if header_idx == -1:
                print(f"Skipping {file_path}: No header found.")
                continue

            delimiter = '\t' if '\t' in lines[header_idx] else ','
            
            # csv module might struggle with list of strings if not properly formatted line by line
            # We will manually parse simply to avoid quoting issues if complex, but DictReader is safest usually
            # But let's check if there are empty lines or weird chars
            
            reader = csv.DictReader(lines[header_idx:], delimiter=delimiter)
            
            for row in reader:
                kw = row.get('Keyword', '').strip()
                vol_str = row.get('Avg. monthly searches', '0')
                
                if not kw:
                    continue
                    
                if kw in all_keywords:
                    continue
                
                all_keywords.add(kw)
                
                vol = parse_volume(vol_str)
                brand, category = categorize_keyword(kw)
                
                if (brand, category) not in keywords_data:
                    keywords_data[(brand, category)] = []
                
                keywords_data[(brand, category)].append({
                    'keyword': kw,
                    'volume': vol
                })
                
        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    # Generate Report
    output_lines = []
    output_lines.append("# Analysis of Joyroom & Anker Keywords")
    output_lines.append(f"TOTAL UNIQUE KEYWORDS: {len(all_keywords)}\n")

    # Order: Brand -> Category -> Keywords (sorted by volume)
    
    for brand in ["Anker", "Joyroom", "Unknown"]:
        # Check if we have data for this brand
        brand_data = {k: v for k, v in keywords_data.items() if k[0] == brand}
        if not brand_data:
            continue
            
        output_lines.append(f"## {brand.upper()} PRODUCTS")
        
        # Sort categories alphabetically or by custom order
        sorted_cats = sorted(set(k[1] for k in brand_data.keys()))
        
        for cat in sorted_cats:
            items = brand_data.get((brand, cat), [])
            if not items:
                continue
                
            # Sort by volume desc
            items.sort(key=lambda x: x['volume'], reverse=True)
            
            output_lines.append(f"\n### {cat}")
            output_lines.append("| Keyword | Monthly Searches |")
            output_lines.append("|---|---|")
            
            for item in items:
                output_lines.append(f"| {item['keyword']} | {item['volume']} |")
        
        output_lines.append("\n---\n")

    with open("/Users/ahmedsalem/Desktop/all my projects/mobile_accessories/keyword_analysis_report.md", "w", encoding="utf-8") as f:
        f.write("\n".join(output_lines))
    
    print("Report generated at /Users/ahmedsalem/Desktop/all my projects/mobile_accessories/keyword_analysis_report.md")

if __name__ == "__main__":
    main()
