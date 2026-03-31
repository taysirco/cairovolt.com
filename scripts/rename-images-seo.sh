#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# CairoVolt SEO Image Renaming Engine v2.0
# Renames generic numbered images to SEO-descriptive filenames
# ═══════════════════════════════════════════════════════════════

set -euo pipefail
BASE="public/products/anker"
TOTAL=0
ERRORS=0

echo "🏷️  CairoVolt SEO Image Renaming Engine v2.0"
echo "═══════════════════════════════════════════"

rename_images() {
    local slug="$1"
    shift
    local folder="${BASE}/${slug}"
    local names=("$@")
    local count=0
    
    [ -d "$folder" ] || { echo "⚠️  Skip: $slug"; return; }
    
    # Get sorted list of current files
    local files=()
    while IFS= read -r f; do
        files+=("$f")
    done < <(ls -1 "$folder"/*.webp 2>/dev/null | sort -t- -k$(echo "$slug" | tr -cd '-' | wc -c | tr -d ' ') -n)
    
    if [ ${#files[@]} -eq 0 ]; then
        echo "⚠️  No images: $slug"
        return
    fi
    
    for i in "${!files[@]}"; do
        if [ $i -ge ${#names[@]} ]; then
            break
        fi
        local old="${files[$i]}"
        local new_name="${names[$i]}"
        local new_path="${folder}/${new_name}"
        
        if [ "$old" != "$new_path" ]; then
            mv "$old" "$new_path" 2>/dev/null && count=$((count + 1)) || ERRORS=$((ERRORS + 1))
        fi
    done
    
    TOTAL=$((TOTAL + count))
    echo "✅ $slug — ${count} images renamed"
}

echo ""
echo "📸 POWER BANKS"
echo "──────────────"

rename_images "anker-zolo-a110d-10000" \
    "anker-zolo-a110d-10000mah-power-bank-builtin-usb-c-cable-led-display-cairovolt.webp" \
    "anker-zolo-a110d-usb-c-cable-charging-smartphone-fast-charge-22w.webp" \
    "anker-zolo-a110d-led-battery-percentage-display-digital-indicator.webp" \
    "anker-zolo-a110d-dual-port-usb-c-usb-a-output-detail-view.webp" \
    "anker-zolo-a110d-slim-portable-design-pocket-size-comparison.webp" \
    "anker-zolo-a110d-package-contents-box-cable-manual-accessories.webp" \
    "anker-zolo-a110d-10000mah-charging-speed-test-watt-meter-lab.webp" \
    "anker-zolo-a110d-side-profile-thickness-portable-power-bank.webp"

rename_images "anker-zolo-a110e-20000" \
    "anker-zolo-a110e-20000mah-power-bank-builtin-cable-dual-output-cairovolt.webp" \
    "anker-zolo-a110e-usb-c-fast-charging-22w-smartphone-connected.webp" \
    "anker-zolo-a110e-led-digital-display-battery-level-indicator.webp" \
    "anker-zolo-a110e-triple-output-ports-usb-c-usb-a-detail.webp" \
    "anker-zolo-a110e-20000mah-size-hand-comparison-portable.webp" \
    "anker-zolo-a110e-package-box-contents-accessories-unboxing.webp"

rename_images "anker-zolo-a1681-20000" \
    "anker-zolo-a1681-20000mah-45w-power-bank-premium-design-cairovolt.webp" \
    "anker-zolo-a1681-usb-c-45w-pd-fast-charging-laptop-compatible.webp" \
    "anker-zolo-a1681-dual-port-output-detail-usb-c-pd-specification.webp" \
    "anker-zolo-a1681-package-contents-box-cable-manual-egypt.webp"

rename_images "anker-prime-a1695-25000" \
    "anker-prime-a1695-25000mah-165w-power-bank-premium-cairovolt.webp" \
    "anker-prime-a1695-front-view-led-display-watt-output-reading.webp" \
    "anker-prime-a1695-triple-usb-c-port-165w-output-detail.webp" \
    "anker-prime-a1695-charging-macbook-laptop-165w-fast-charge.webp" \
    "anker-prime-a1695-slim-design-aluminum-body-side-profile.webp" \
    "anker-prime-a1695-digital-display-remaining-time-smart-screen.webp" \
    "anker-prime-a1695-multi-device-charging-phone-tablet-laptop.webp" \
    "anker-prime-a1695-package-contents-cable-manual-accessories.webp" \
    "anker-prime-a1695-size-comparison-hand-portable-25000mah.webp" \
    "anker-prime-a1695-25000mah-charging-speed-test-lab-egypt.webp"

echo ""
echo "🔌 CHARGERS"
echo "───────────"

rename_images "anker-a2732-charger-35w" \
    "anker-a2732-35w-dual-usb-c-charger-pd-compact-design-cairovolt.webp" \
    "anker-a2732-dual-usb-c-port-detail-35w-pd-power-delivery.webp" \
    "anker-a2732-charger-size-comparison-compact-travel-adapter.webp" \
    "anker-a2732-charging-two-devices-simultaneously-dual-port.webp" \
    "anker-a2732-foldable-plug-prong-detail-travel-friendly.webp" \
    "anker-a2732-35w-package-box-contents-specifications-egypt.webp"

rename_images "anker-a2741-charger-30w" \
    "anker-a2741-30w-dual-port-charger-usb-c-usb-a-cairovolt.webp" \
    "anker-a2741-usb-c-usb-a-dual-port-detail-30w-output.webp" \
    "anker-a2741-compact-charger-wall-plug-size-comparison.webp" \
    "anker-a2741-charging-iphone-fast-charge-30w-usb-c.webp" \
    "anker-a2741-foldable-plug-design-portable-travel-charger.webp" \
    "anker-a2741-30w-package-box-contents-specifications-egypt.webp"

echo ""
echo "🔗 CABLES"
echo "─────────"

rename_images "anker-a8050-usb-c-cable" \
    "anker-a8050-usb-c-to-usb-c-cable-braided-nylon-cairovolt.webp" \
    "anker-a8050-usb-c-connector-detail-gold-plated-durable.webp" \
    "anker-a8050-braided-nylon-cable-texture-close-up-durability.webp" \
    "anker-a8050-usb-c-cable-connected-to-laptop-charging.webp" \
    "anker-a8050-cable-flexibility-bend-test-reinforced-stress.webp" \
    "anker-a8050-usb-c-cable-length-comparison-measurement.webp" \
    "anker-a8050-package-box-contents-cable-accessories-egypt.webp" \
    "anker-a8050-usb-c-data-transfer-speed-test-lab-benchmark.webp"

echo ""
echo "🎧 AUDIO"
echo "────────"

rename_images "anker-soundcore-k20i" \
    "anker-soundcore-k20i-wireless-earbuds-charging-case-cairovolt.webp" \
    "anker-soundcore-k20i-earbud-close-up-driver-detail-design.webp" \
    "anker-soundcore-k20i-wearing-in-ear-fit-comfort-lifestyle.webp" \
    "anker-soundcore-k20i-charging-case-open-led-indicator.webp" \
    "anker-soundcore-k20i-touch-controls-earbud-surface-detail.webp" \
    "anker-soundcore-k20i-bluetooth-pairing-phone-connection.webp" \
    "anker-soundcore-k20i-usb-c-charging-port-case-detail.webp" \
    "anker-soundcore-k20i-package-contents-eartips-cable-manual.webp" \
    "anker-soundcore-k20i-battery-life-playtime-test-lab-egypt.webp"

rename_images "anker-soundcore-r50i-nc" \
    "anker-soundcore-r50i-nc-active-noise-cancelling-earbuds-cairovolt.webp" \
    "anker-soundcore-r50i-nc-earbud-anc-driver-detail-closeup.webp" \
    "anker-soundcore-r50i-nc-wearing-noise-cancelling-commute.webp" \
    "anker-soundcore-r50i-nc-charging-case-compact-led-status.webp" \
    "anker-soundcore-r50i-nc-transparency-mode-ambient-sound.webp" \
    "anker-soundcore-r50i-nc-app-equalizer-customization-screen.webp" \
    "anker-soundcore-r50i-nc-package-contents-eartips-cable-box.webp"

rename_images "anker-soundcore-r50i" \
    "anker-soundcore-r50i-wireless-earbuds-10mm-driver-cairovolt.webp" \
    "anker-soundcore-r50i-earbud-design-detail-ergonomic-fit.webp" \
    "anker-soundcore-r50i-charging-case-open-earbuds-visible.webp" \
    "anker-soundcore-r50i-wearing-comfortable-in-ear-lifestyle.webp" \
    "anker-soundcore-r50i-usb-c-charging-port-case-bottom.webp" \
    "anker-soundcore-r50i-touch-control-gesture-tap-earbud.webp" \
    "anker-soundcore-r50i-bluetooth-5.3-connection-range-test.webp" \
    "anker-soundcore-r50i-package-box-contents-accessories-egypt.webp"

echo ""
echo "═══════════════════════════════════════════"
echo "✅ TOTAL: ${TOTAL} images renamed | ${ERRORS} errors"
echo "═══════════════════════════════════════════"
