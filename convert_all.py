from PIL import Image
import os
import glob
import re

input_dir = '/Users/ahmedsalem/.gemini/antigravity/brain/a4a376bf-c378-410b-a994-567b08816298/'
output_dir = '/Users/ahmedsalem/Desktop/all my projects/mobile_accessories/public/images/blog/posts/'

def process_image(input_path, output_path):
    print(f"Processing {input_path} -> {output_path}")
    img = Image.open(input_path)
    
    target_width = 1200
    target_height = 630
    
    original_width, original_height = img.size
    
    new_height = int(original_height * (target_width / original_width))
    img = img.resize((target_width, new_height), Image.Resampling.LANCZOS)
    
    top = (new_height - target_height) // 2
    bottom = top + target_height
    img = img.crop((0, top, target_width, bottom))
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, 'WEBP', quality=85)
    print(f"Saved {output_path}")

png_files = glob.glob(os.path.join(input_dir, '*.png'))
count = 0
for file in png_files:
    basename = os.path.basename(file)
    match = re.match(r'(.*)_\d{13}\.png$', basename)
    if match:
        original_name = match.group(1)
        slug = original_name.replace('_', '-')
        output_path = os.path.join(output_dir, f"{slug}.webp")
        
        # We can just check if output exists and skip if we don't want to reprocess.
        # But for safety and to make sure we process the newest ones, let's process if not exists
        if not os.path.exists(output_path):
            try:
                process_image(file, output_path)
                count += 1
            except Exception as e:
                print(f"Error processing {file}: {e}")

print(f"Total processed: {count}")
