#!/bin/bash
# Update product .ts files to match renamed images
set -euo pipefail
SRC="src/data/products"

echo "🔄 Updating product .ts files with new image URLs..."

# Function to perform sed replacement
update_file() {
    local file="$1" old="$2" new="$3"
    sed -i '' "s|${old}|${new}|g" "$file" 2>/dev/null
}

# ─── anker-zolo-a110e-20000 ───
F="$SRC/anker-zolo-a110e-20000.ts"
update_file "$F" "anker-anker-zolo-a110e-20000-egypt-cairo-1.webp" "anker-zolo-a110e-20000mah-power-bank-builtin-cable-dual-output-cairovolt.webp"
update_file "$F" "anker-anker-zolo-a110e-20000-egypt-cairo-2.webp" "anker-zolo-a110e-usb-c-fast-charging-22w-smartphone-connected.webp"
update_file "$F" "anker-anker-zolo-a110e-20000-egypt-cairo-3.webp" "anker-zolo-a110e-led-digital-display-battery-level-indicator.webp"
update_file "$F" "anker-anker-zolo-a110e-20000-egypt-cairo-4.webp" "anker-zolo-a110e-triple-output-ports-usb-c-usb-a-detail.webp"
update_file "$F" "anker-anker-zolo-a110e-20000-egypt-cairo-5.webp" "anker-zolo-a110e-20000mah-size-hand-comparison-portable.webp"
update_file "$F" "anker-anker-zolo-a110e-20000-egypt-cairo-6.webp" "anker-zolo-a110e-package-box-contents-accessories-unboxing.webp"
echo "✅ anker-zolo-a110e-20000"

# ─── anker-zolo-a1681-20000 ───
F="$SRC/anker-zolo-a1681-20000.ts"
update_file "$F" "anker-anker-zolo-a1681-20000-egypt-cairo-1.webp" "anker-zolo-a1681-20000mah-45w-power-bank-premium-design-cairovolt.webp"
update_file "$F" "anker-anker-zolo-a1681-20000-egypt-cairo-2.webp" "anker-zolo-a1681-usb-c-45w-pd-fast-charging-laptop-compatible.webp"
update_file "$F" "anker-anker-zolo-a1681-20000-egypt-cairo-3.webp" "anker-zolo-a1681-dual-port-output-detail-usb-c-pd-specification.webp"
update_file "$F" "anker-anker-zolo-a1681-20000-egypt-cairo-4.webp" "anker-zolo-a1681-package-contents-box-cable-manual-egypt.webp"
echo "✅ anker-zolo-a1681-20000"

# ─── anker-prime-a1695-25000 ───
F="$SRC/anker-prime-a1695-25000.ts"
update_file "$F" "anker-anker-prime-a1695-25000-egypt-cairo-1.webp" "anker-prime-a1695-25000mah-165w-power-bank-premium-cairovolt.webp"
update_file "$F" "anker-anker-prime-a1695-25000-egypt-cairo-2.webp" "anker-prime-a1695-front-view-led-display-watt-output-reading.webp"
update_file "$F" "anker-anker-prime-a1695-25000-egypt-cairo-3.webp" "anker-prime-a1695-triple-usb-c-port-165w-output-detail.webp"
update_file "$F" "anker-anker-prime-a1695-25000-egypt-cairo-4.webp" "anker-prime-a1695-charging-macbook-laptop-165w-fast-charge.webp"
update_file "$F" "anker-anker-prime-a1695-25000-egypt-cairo-5.webp" "anker-prime-a1695-slim-design-aluminum-body-side-profile.webp"
update_file "$F" "anker-anker-prime-a1695-25000-egypt-cairo-6.webp" "anker-prime-a1695-digital-display-remaining-time-smart-screen.webp"
update_file "$F" "anker-anker-prime-a1695-25000-egypt-cairo-7.webp" "anker-prime-a1695-multi-device-charging-phone-tablet-laptop.webp"
update_file "$F" "anker-anker-prime-a1695-25000-egypt-cairo-8.webp" "anker-prime-a1695-package-contents-cable-manual-accessories.webp"
update_file "$F" "anker-anker-prime-a1695-25000-egypt-cairo-9.webp" "anker-prime-a1695-size-comparison-hand-portable-25000mah.webp"
update_file "$F" "anker-anker-prime-a1695-25000-egypt-cairo-10.webp" "anker-prime-a1695-25000mah-charging-speed-test-lab-egypt.webp"
echo "✅ anker-prime-a1695-25000"

# ─── anker-a2732-charger-35w ───
F="$SRC/anker-a2732-charger-35w.ts"
update_file "$F" "anker-anker-a2732-charger-35w-egypt-cairo-1.webp" "anker-a2732-35w-dual-usb-c-charger-pd-compact-design-cairovolt.webp"
update_file "$F" "anker-anker-a2732-charger-35w-egypt-cairo-2.webp" "anker-a2732-dual-usb-c-port-detail-35w-pd-power-delivery.webp"
update_file "$F" "anker-anker-a2732-charger-35w-egypt-cairo-3.webp" "anker-a2732-charger-size-comparison-compact-travel-adapter.webp"
update_file "$F" "anker-anker-a2732-charger-35w-egypt-cairo-4.webp" "anker-a2732-charging-two-devices-simultaneously-dual-port.webp"
update_file "$F" "anker-anker-a2732-charger-35w-egypt-cairo-5.webp" "anker-a2732-foldable-plug-prong-detail-travel-friendly.webp"
update_file "$F" "anker-anker-a2732-charger-35w-egypt-cairo-6.webp" "anker-a2732-35w-package-box-contents-specifications-egypt.webp"
echo "✅ anker-a2732-charger-35w"

# ─── anker-a2741-charger-30w ───
F="$SRC/anker-a2741-charger-30w.ts"
update_file "$F" "anker-anker-a2741-charger-30w-egypt-cairo-1.webp" "anker-a2741-30w-dual-port-charger-usb-c-usb-a-cairovolt.webp"
update_file "$F" "anker-anker-a2741-charger-30w-egypt-cairo-2.webp" "anker-a2741-usb-c-usb-a-dual-port-detail-30w-output.webp"
update_file "$F" "anker-anker-a2741-charger-30w-egypt-cairo-3.webp" "anker-a2741-compact-charger-wall-plug-size-comparison.webp"
update_file "$F" "anker-anker-a2741-charger-30w-egypt-cairo-4.webp" "anker-a2741-charging-iphone-fast-charge-30w-usb-c.webp"
update_file "$F" "anker-anker-a2741-charger-30w-egypt-cairo-5.webp" "anker-a2741-foldable-plug-design-portable-travel-charger.webp"
update_file "$F" "anker-anker-a2741-charger-30w-egypt-cairo-6.webp" "anker-a2741-30w-package-box-contents-specifications-egypt.webp"
echo "✅ anker-a2741-charger-30w"

# ─── anker-a8050-usb-c-cable ───
F="$SRC/anker-a8050-usb-c-cable.ts"
update_file "$F" "anker-anker-a8050-usb-c-cable-egypt-cairo-1.webp" "anker-a8050-usb-c-to-usb-c-cable-braided-nylon-cairovolt.webp"
update_file "$F" "anker-anker-a8050-usb-c-cable-egypt-cairo-2.webp" "anker-a8050-usb-c-connector-detail-gold-plated-durable.webp"
update_file "$F" "anker-anker-a8050-usb-c-cable-egypt-cairo-3.webp" "anker-a8050-braided-nylon-cable-texture-close-up-durability.webp"
update_file "$F" "anker-anker-a8050-usb-c-cable-egypt-cairo-4.webp" "anker-a8050-usb-c-cable-connected-to-laptop-charging.webp"
update_file "$F" "anker-anker-a8050-usb-c-cable-egypt-cairo-5.webp" "anker-a8050-cable-flexibility-bend-test-reinforced-stress.webp"
update_file "$F" "anker-anker-a8050-usb-c-cable-egypt-cairo-6.webp" "anker-a8050-usb-c-cable-length-comparison-measurement.webp"
update_file "$F" "anker-anker-a8050-usb-c-cable-egypt-cairo-7.webp" "anker-a8050-package-box-contents-cable-accessories-egypt.webp"
update_file "$F" "anker-anker-a8050-usb-c-cable-egypt-cairo-8.webp" "anker-a8050-usb-c-data-transfer-speed-test-lab-benchmark.webp"
echo "✅ anker-a8050-usb-c-cable"

# ─── anker-soundcore-k20i ───
F="$SRC/anker-soundcore-k20i.ts"
update_file "$F" "anker-anker-soundcore-k20i-egypt-cairo-1.webp" "anker-soundcore-k20i-wireless-earbuds-charging-case-cairovolt.webp"
update_file "$F" "anker-anker-soundcore-k20i-egypt-cairo-2.webp" "anker-soundcore-k20i-earbud-close-up-driver-detail-design.webp"
update_file "$F" "anker-anker-soundcore-k20i-egypt-cairo-3.webp" "anker-soundcore-k20i-wearing-in-ear-fit-comfort-lifestyle.webp"
update_file "$F" "anker-anker-soundcore-k20i-egypt-cairo-4.webp" "anker-soundcore-k20i-charging-case-open-led-indicator.webp"
update_file "$F" "anker-anker-soundcore-k20i-egypt-cairo-5.webp" "anker-soundcore-k20i-touch-controls-earbud-surface-detail.webp"
update_file "$F" "anker-anker-soundcore-k20i-egypt-cairo-6.webp" "anker-soundcore-k20i-bluetooth-pairing-phone-connection.webp"
update_file "$F" "anker-anker-soundcore-k20i-egypt-cairo-7.webp" "anker-soundcore-k20i-usb-c-charging-port-case-detail.webp"
update_file "$F" "anker-anker-soundcore-k20i-egypt-cairo-8.webp" "anker-soundcore-k20i-package-contents-eartips-cable-manual.webp"
update_file "$F" "anker-anker-soundcore-k20i-egypt-cairo-9.webp" "anker-soundcore-k20i-battery-life-playtime-test-lab-egypt.webp"
echo "✅ anker-soundcore-k20i"

# ─── anker-soundcore-r50i-nc ───
F="$SRC/anker-soundcore-r50i-nc.ts"
update_file "$F" "anker-anker-soundcore-r50i-nc-egypt-cairo-1.webp" "anker-soundcore-r50i-nc-active-noise-cancelling-earbuds-cairovolt.webp"
update_file "$F" "anker-anker-soundcore-r50i-nc-egypt-cairo-2.webp" "anker-soundcore-r50i-nc-earbud-anc-driver-detail-closeup.webp"
update_file "$F" "anker-anker-soundcore-r50i-nc-egypt-cairo-3.webp" "anker-soundcore-r50i-nc-wearing-noise-cancelling-commute.webp"
update_file "$F" "anker-anker-soundcore-r50i-nc-egypt-cairo-4.webp" "anker-soundcore-r50i-nc-charging-case-compact-led-status.webp"
update_file "$F" "anker-anker-soundcore-r50i-nc-egypt-cairo-5.webp" "anker-soundcore-r50i-nc-transparency-mode-ambient-sound.webp"
update_file "$F" "anker-anker-soundcore-r50i-nc-egypt-cairo-6.webp" "anker-soundcore-r50i-nc-app-equalizer-customization-screen.webp"
update_file "$F" "anker-anker-soundcore-r50i-nc-egypt-cairo-7.webp" "anker-soundcore-r50i-nc-package-contents-eartips-cable-box.webp"
echo "✅ anker-soundcore-r50i-nc"

# ─── anker-soundcore-r50i ───
F="$SRC/anker-soundcore-r50i.ts"
update_file "$F" "anker-anker-soundcore-r50i-egypt-cairo-1.webp" "anker-soundcore-r50i-wireless-earbuds-10mm-driver-cairovolt.webp"
update_file "$F" "anker-anker-soundcore-r50i-egypt-cairo-2.webp" "anker-soundcore-r50i-earbud-design-detail-ergonomic-fit.webp"
update_file "$F" "anker-anker-soundcore-r50i-egypt-cairo-3.webp" "anker-soundcore-r50i-charging-case-open-earbuds-visible.webp"
update_file "$F" "anker-anker-soundcore-r50i-egypt-cairo-4.webp" "anker-soundcore-r50i-wearing-comfortable-in-ear-lifestyle.webp"
update_file "$F" "anker-anker-soundcore-r50i-egypt-cairo-5.webp" "anker-soundcore-r50i-usb-c-charging-port-case-bottom.webp"
update_file "$F" "anker-anker-soundcore-r50i-egypt-cairo-6.webp" "anker-soundcore-r50i-touch-control-gesture-tap-earbud.webp"
update_file "$F" "anker-anker-soundcore-r50i-egypt-cairo-7.webp" "anker-soundcore-r50i-bluetooth-5.3-connection-range-test.webp"
update_file "$F" "anker-anker-soundcore-r50i-egypt-cairo-8.webp" "anker-soundcore-r50i-package-box-contents-accessories-egypt.webp"
echo "✅ anker-soundcore-r50i"

echo ""
echo "═══════════════════════════════════════════"
echo "✅ All 10 product .ts files updated!"
echo "═══════════════════════════════════════════"
