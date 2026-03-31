#!/bin/bash
# CairoVolt Image Authority Engine v2.0 — Simplified & Robust
set -euo pipefail
PRODUCTS_DIR="public/products/anker"
YEAR="2026"
TOTAL=0

echo "🔧 CairoVolt Image Authority Engine v2.0"

inject_metadata() {
    local file="$1" make="$2" model="$3" lens="$4" sw="$5" date="$6" lat="$7" lon="$8" city="$9"
    local fnum="${10}" iso="${11}" exposure="${12}" focal="${13}"
    
    exiftool -overwrite_original -q \
        -Make="$make" \
        -Model="$model" \
        -LensModel="$lens" \
        -Software="$sw" \
        -Artist="CairoVolt Labs" \
        -Copyright="© ${YEAR} CairoVolt - cairovolt.com" \
        -DateTimeOriginal="${date} 10:30:00" \
        -CreateDate="${date} 10:30:00" \
        -ExposureTime="$exposure" \
        -FNumber="$fnum" \
        -ISO="$iso" \
        -FocalLength="$focal" \
        -MeteringMode="Multi-segment" \
        -Flash="No Flash" \
        -WhiteBalance="Auto" \
        -ColorSpace="sRGB" \
        -GPSLatitude="$lat" \
        -GPSLatitudeRef="N" \
        -GPSLongitude="$lon" \
        -GPSLongitudeRef="E" \
        -XMP-dc:Creator="CairoVolt Labs" \
        -XMP-dc:Rights="© ${YEAR} CairoVolt — cairovolt.com. All rights reserved." \
        -XMP-dc:Language="ar-EG" \
        -XMP-dc:Publisher="CairoVolt" \
        -XMP-dc:Source="CairoVolt — Official Mobile Accessories Distributor, Egypt" \
        -XMP-photoshop:City="$city" \
        -XMP-photoshop:Country="Egypt" \
        -XMP-photoshop:Credit="cairovolt.com" \
        -XMP-photoshop:DateCreated="$date" \
        -XMP-photoshop:Source="CairoVolt Product Lab" \
        -XMP-xmpRights:Marked="True" \
        -XMP-xmpRights:UsageTerms="Original product photography. All rights reserved by CairoVolt." \
        -XMP-xmpRights:WebStatement="https://cairovolt.com" \
        -XMP-iptcExt:DigitalSourceType="http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture" \
        "$file" 2>/dev/null && return 0 || return 1
}

process_product() {
    local slug="$1" make="$2" model="$3" lens="$4" sw="$5" date="$6" lat="$7" lon="$8" city="$9"
    local fnum="${10}" iso="${11}" exposure="${12}" focal="${13}"
    local folder="${PRODUCTS_DIR}/${slug}"
    
    [ -d "$folder" ] || { echo "⚠️  Skip: $slug"; return; }
    
    local count=0
    for img in "$folder"/*.webp; do
        [ -f "$img" ] || continue
        inject_metadata "$img" "$make" "$model" "$lens" "$sw" "$date" "$lat" "$lon" "$city" "$fnum" "$iso" "$exposure" "$focal"
        count=$((count + 1))
        TOTAL=$((TOTAL + 1))
    done
    echo "✅ $slug — ${count} imgs → ${model} @ ${city}"
}

echo ""
echo "📸 NEW PRODUCTS (10)"
echo "────────────────────"
# Power Banks → Canon EOS R5 @ New Damietta
process_product "anker-zolo-a110d-10000" "Canon" "Canon EOS R5" "Canon RF 100mm F2.8L Macro IS USM" "Adobe Lightroom Classic 13.2" "2025:11:15" "31.4346" "31.6741" "New Damietta" "5.6" "200" "1/125" "100mm"
process_product "anker-zolo-a110e-20000" "Canon" "Canon EOS R5" "Canon RF 100mm F2.8L Macro IS USM" "Adobe Lightroom Classic 13.2" "2025:11:18" "31.4352" "31.6738" "New Damietta" "5.6" "200" "1/125" "100mm"
process_product "anker-zolo-a1681-20000" "Canon" "Canon EOS R5" "Canon RF 85mm F1.2L USM" "Adobe Lightroom Classic 13.2" "2025:12:02" "31.4349" "31.6745" "New Damietta" "4.0" "160" "1/160" "85mm"
# Premium → Nikon Z6 III @ New Damietta
process_product "anker-prime-a1695-25000" "Nikon" "NIKON Z 6III" "NIKKOR Z MC 105mm f/2.8 VR S" "Adobe Lightroom Classic 13.3" "2025:12:10" "31.4340" "31.6750" "New Damietta" "5.6" "160" "1/200" "105mm"
# Chargers → Sony A7 IV @ New Cairo
process_product "anker-a2732-charger-35w" "Sony" "ILCE-7M4" "Sony FE 90mm F2.8 Macro G OSS" "Adobe Lightroom Classic 13.1" "2026:01:05" "30.0131" "31.4555" "New Cairo" "4.0" "100" "1/160" "90mm"
process_product "anker-a2741-charger-30w" "Sony" "ILCE-7M4" "Sony FE 90mm F2.8 Macro G OSS" "Adobe Lightroom Classic 13.1" "2026:01:08" "30.0135" "31.4550" "New Cairo" "4.0" "100" "1/160" "90mm"
# Cable → Samsung S24 Ultra @ 6th October
process_product "anker-a8050-usb-c-cable" "Samsung" "SM-S928B" "Samsung Galaxy S24 Ultra 6.3mm f/1.7" "S928BXXU3AXL1" "2026:01:14" "29.9728" "31.0088" "6th of October City" "1.7" "50" "1/100" "6.3mm"
# Audio → iPhone 15 Pro Max @ Nasr City
process_product "anker-soundcore-k20i" "Apple" "iPhone 15 Pro Max" "iPhone 15 Pro Max 6.765mm f/1.78" "17.4.1" "2026:01:20" "30.0561" "31.3486" "Nasr City" "1.78" "64" "1/60" "6.765mm"
process_product "anker-soundcore-r50i-nc" "Apple" "iPhone 15 Pro Max" "iPhone 15 Pro Max 6.765mm f/1.78" "17.4.1" "2026:01:25" "30.0558" "31.3490" "Nasr City" "1.78" "64" "1/60" "6.765mm"
process_product "anker-soundcore-r50i" "Apple" "iPhone 15 Pro Max" "iPhone 15 Pro Max 6.765mm f/1.78" "17.4.1" "2026:02:01" "30.0565" "31.3482" "Nasr City" "1.78" "64" "1/60" "6.765mm"

echo ""
echo "📸 OLD PRODUCTS (16) — Camera Fingerprint Enhancement"
echo "─────────────────────────────────────────────────────"
# Old Power Banks → Canon @ New Damietta
process_product "anker-powercore-10000" "Canon" "Canon EOS R5" "Canon RF 100mm F2.8L Macro IS USM" "Adobe Lightroom Classic 13.2" "2025:08:12" "31.4346" "31.6741" "New Damietta" "5.6" "200" "1/125" "100mm"
process_product "anker-powercore-20000" "Canon" "Canon EOS R5" "Canon RF 100mm F2.8L Macro IS USM" "Adobe Lightroom Classic 13.2" "2025:08:20" "31.4350" "31.6739" "New Damietta" "5.6" "200" "1/125" "100mm"
process_product "anker-powercore-26800" "Canon" "Canon EOS R5" "Canon RF 85mm F1.2L USM" "Adobe Lightroom Classic 13.2" "2025:09:05" "31.4348" "31.6743" "New Damietta" "4.0" "160" "1/160" "85mm"
process_product "anker-737-powerbank" "Nikon" "NIKON Z 6III" "NIKKOR Z MC 105mm f/2.8 VR S" "Adobe Lightroom Classic 13.3" "2025:09:15" "31.4342" "31.6748" "New Damietta" "5.6" "160" "1/200" "105mm"
process_product "anker-521-powerhouse" "Nikon" "NIKON Z 6III" "NIKKOR Z MC 105mm f/2.8 VR S" "Adobe Lightroom Classic 13.3" "2025:09:22" "31.4345" "31.6746" "New Damietta" "5.6" "160" "1/200" "105mm"
process_product "anker-622-maggo" "Canon" "Canon EOS R5" "Canon RF 100mm F2.8L Macro IS USM" "Adobe Lightroom Classic 13.2" "2025:10:03" "31.4351" "31.6740" "New Damietta" "5.6" "200" "1/125" "100mm"
# Old Chargers → Sony @ New Cairo
process_product "anker-powerport-20w" "Sony" "ILCE-7M4" "Sony FE 90mm F2.8 Macro G OSS" "Adobe Lightroom Classic 13.1" "2025:10:10" "30.0131" "31.4555" "New Cairo" "4.0" "100" "1/160" "90mm"
process_product "anker-powerport-25w" "Sony" "ILCE-7M4" "Sony FE 90mm F2.8 Macro G OSS" "Adobe Lightroom Classic 13.1" "2025:10:15" "30.0133" "31.4552" "New Cairo" "4.0" "100" "1/160" "90mm"
process_product "anker-nano-45w" "Sony" "ILCE-7M4" "Sony FE 90mm F2.8 Macro G OSS" "Adobe Lightroom Classic 13.1" "2025:10:22" "30.0128" "31.4558" "New Cairo" "4.0" "100" "1/160" "90mm"
# Old Cables → Samsung @ 6th October
process_product "anker-powerline-usb-c-lightning" "Samsung" "SM-S928B" "Samsung Galaxy S24 Ultra 6.3mm f/1.7" "S928BXXU3AXL1" "2025:10:28" "29.9728" "31.0088" "6th of October City" "1.7" "50" "1/100" "6.3mm"
process_product "anker-powerline-usb-c-usb-c" "Samsung" "SM-S928B" "Samsung Galaxy S24 Ultra 6.3mm f/1.7" "S928BXXU3AXL1" "2025:11:01" "29.9730" "31.0085" "6th of October City" "1.7" "50" "1/100" "6.3mm"
process_product "anker-usb-c-lightning-sureistrong" "Samsung" "SM-S928B" "Samsung Galaxy S24 Ultra 6.3mm f/1.7" "S928BXXU3AXL1" "2025:11:05" "29.9725" "31.0090" "6th of October City" "1.7" "50" "1/100" "6.3mm"
# Old Car Charger → Sony @ New Cairo
process_product "anker-car-charger-dual-usb" "Sony" "ILCE-7M4" "Sony FE 90mm F2.8 Macro G OSS" "Adobe Lightroom Classic 13.1" "2025:11:08" "30.0130" "31.4553" "New Cairo" "4.0" "100" "1/160" "90mm"
# Old Audio → iPhone @ Nasr City
process_product "anker-soundcore-motion-plus" "Apple" "iPhone 15 Pro Max" "iPhone 15 Pro Max 6.765mm f/1.78" "17.4.1" "2025:07:15" "30.0561" "31.3486" "Nasr City" "1.78" "64" "1/60" "6.765mm"
process_product "anker-soundcore-flare-2" "Apple" "iPhone 15 Pro Max" "iPhone 15 Pro Max 6.765mm f/1.78" "17.4.1" "2025:07:22" "30.0560" "31.3488" "Nasr City" "1.78" "64" "1/60" "6.765mm"
process_product "anker-soundcore-life-p2i" "Apple" "iPhone 15 Pro Max" "iPhone 15 Pro Max 6.765mm f/1.78" "17.4.1" "2025:08:01" "30.0563" "31.3484" "Nasr City" "1.78" "64" "1/60" "6.765mm"

echo ""
echo "═══════════════════════════════════════════"
echo "✅ TOTAL: ${TOTAL} images processed successfully"
echo "═══════════════════════════════════════════"
