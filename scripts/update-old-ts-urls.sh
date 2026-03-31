#!/bin/bash
# Update OLD product .ts files with new SEO image filenames
set -euo pipefail
SRC="src/data/products"

echo "🔄 Updating 16 old product .ts files..."

update_file() {
    local file="$1" old="$2" new="$3"
    sed -i '' "s|${old}|${new}|g" "$file" 2>/dev/null
}

# ─── anker-powercore-10000 ───
F="$SRC/anker-powercore-10000.ts"
update_file "$F" "anker-anker-powercore-10000-egypt-cairo-1.webp" "anker-powercore-10000mah-slim-portable-power-bank-cairovolt-egypt.webp"
update_file "$F" "anker-anker-powercore-10000-egypt-cairo-2.webp" "anker-powercore-10000-usb-a-output-port-detail-charging.webp"
update_file "$F" "anker-anker-powercore-10000-egypt-cairo-3.webp" "anker-powercore-10000-micro-usb-input-port-compact-design.webp"
update_file "$F" "anker-anker-powercore-10000-egypt-cairo-4.webp" "anker-powercore-10000-size-comparison-hand-pocket-portable.webp"
update_file "$F" "anker-anker-powercore-10000-egypt-cairo-5.webp" "anker-powercore-10000-charging-iphone-fast-poweriq-test.webp"
update_file "$F" "anker-anker-powercore-10000-egypt-cairo-6.webp" "anker-powercore-10000-led-indicator-battery-status-lights.webp"
update_file "$F" "anker-anker-powercore-10000-egypt-cairo-7.webp" "anker-powercore-10000-package-box-contents-cable-egypt.webp"
echo "✅ anker-powercore-10000"

# ─── anker-powercore-20000 ───
F="$SRC/anker-powercore-20000.ts"
for i in $(seq 1 16); do
    case $i in
        1) new="anker-powercore-20000mah-high-capacity-power-bank-cairovolt.webp";;
        2) new="anker-powercore-20000-dual-usb-a-output-ports-detail.webp";;
        3) new="anker-powercore-20000-micro-usb-input-charging-port.webp";;
        4) new="anker-powercore-20000-charging-two-devices-simultaneously.webp";;
        5) new="anker-powercore-20000-size-weight-comparison-portable.webp";;
        6) new="anker-powercore-20000-led-battery-indicator-4-lights.webp";;
        7) new="anker-powercore-20000-poweriq-voltage-boost-technology.webp";;
        8) new="anker-powercore-20000-package-box-contents-cables-egypt.webp";;
        9) new="anker-powercore-20000-side-profile-thickness-design.webp";;
        10) new="anker-powercore-20000-matte-texture-anti-slip-surface.webp";;
        11) new="anker-powercore-20000-charging-tablet-ipad-speed-test.webp";;
        12) new="anker-powercore-20000-multisafety-protection-certification.webp";;
        13) new="anker-powercore-20000-travel-friendly-airline-approved.webp";;
        14) new="anker-powercore-20000-charging-samsung-galaxy-compatible.webp";;
        15) new="anker-powercore-20000-capacity-test-watt-meter-lab.webp";;
        16) new="anker-powercore-20000-full-view-all-angles-360.webp";;
    esac
    update_file "$F" "anker-anker-powercore-20000-egypt-cairo-${i}.webp" "$new"
done
echo "✅ anker-powercore-20000"

# ─── anker-powercore-26800 ───
F="$SRC/anker-powercore-26800.ts"
update_file "$F" "anker-anker-powercore-26800-egypt-cairo-1.webp" "anker-powercore-26800mah-ultra-capacity-power-bank-cairovolt.webp"
update_file "$F" "anker-anker-powercore-26800-egypt-cairo-2.webp" "anker-powercore-26800-triple-usb-a-output-ports-detail.webp"
update_file "$F" "anker-anker-powercore-26800-egypt-cairo-3.webp" "anker-powercore-26800-dual-input-micro-usb-charging.webp"
update_file "$F" "anker-anker-powercore-26800-egypt-cairo-4.webp" "anker-powercore-26800-charging-laptop-tablet-phone-multi.webp"
update_file "$F" "anker-anker-powercore-26800-egypt-cairo-5.webp" "anker-powercore-26800-size-comparison-weight-349g.webp"
update_file "$F" "anker-anker-powercore-26800-egypt-cairo-6.webp" "anker-powercore-26800-led-battery-indicator-status.webp"
update_file "$F" "anker-anker-powercore-26800-egypt-cairo-7.webp" "anker-powercore-26800-capacity-endurance-test-lab-egypt.webp"
update_file "$F" "anker-anker-powercore-26800-egypt-cairo-8.webp" "anker-powercore-26800-package-box-cables-accessories.webp"
echo "✅ anker-powercore-26800"

# ─── anker-737-powerbank ───
F="$SRC/anker-737-powerbank.ts"
update_file "$F" "anker-anker-737-powerbank-egypt-cairo-1.webp" "anker-737-powercore-24000mah-140w-premium-power-bank-cairovolt.webp"
update_file "$F" "anker-anker-737-powerbank-egypt-cairo-2.webp" "anker-737-usb-c-140w-output-port-detail-pd3.1.webp"
update_file "$F" "anker-anker-737-powerbank-egypt-cairo-3.webp" "anker-737-smart-digital-display-wattage-voltage-reading.webp"
update_file "$F" "anker-anker-737-powerbank-egypt-cairo-4.webp" "anker-737-charging-macbook-pro-140w-laptop-fast-charge.webp"
update_file "$F" "anker-anker-737-powerbank-egypt-cairo-5.webp" "anker-737-triple-port-usb-c-usb-a-configuration.webp"
update_file "$F" "anker-anker-737-powerbank-egypt-cairo-6.webp" "anker-737-premium-aluminum-body-design-build-quality.webp"
update_file "$F" "anker-anker-737-powerbank-egypt-cairo-7.webp" "anker-737-size-comparison-compact-24000mah-portable.webp"
update_file "$F" "anker-anker-737-powerbank-egypt-cairo-8.webp" "anker-737-package-contents-cable-pouch-accessories.webp"
echo "✅ anker-737-powerbank"

# ─── anker-521-powerhouse ───
F="$SRC/anker-521-powerhouse.ts"
for i in $(seq 1 10); do
    case $i in
        1) new="anker-521-powerhouse-256wh-portable-power-station-cairovolt.webp";;
        2) new="anker-521-powerhouse-ac-outlet-200w-pure-sine-wave.webp";;
        3) new="anker-521-powerhouse-usb-c-60w-pd-output-port-detail.webp";;
        4) new="anker-521-powerhouse-lcd-display-battery-wattage-status.webp";;
        5) new="anker-521-powerhouse-charging-multiple-devices-camping.webp";;
        6) new="anker-521-powerhouse-solar-panel-input-charging-outdoor.webp";;
        7) new="anker-521-powerhouse-led-flashlight-emergency-lighting.webp";;
        8) new="anker-521-powerhouse-handle-portable-carry-design.webp";;
        9) new="anker-521-powerhouse-all-ports-overview-configuration.webp";;
        10) new="anker-521-powerhouse-package-box-cables-accessories.webp";;
    esac
    update_file "$F" "anker-anker-521-powerhouse-egypt-cairo-${i}.webp" "$new"
done
echo "✅ anker-521-powerhouse"

# ─── anker-622-maggo ───
F="$SRC/anker-622-maggo.ts"
update_file "$F" "anker-anker-622-maggo-egypt-cairo-1.webp" "anker-622-maggo-5000mah-magsafe-wireless-power-bank-cairovolt.webp"
update_file "$F" "anker-anker-622-maggo-egypt-cairo-2.webp" "anker-622-maggo-magnetic-attachment-iphone-wireless-charging.webp"
update_file "$F" "anker-anker-622-maggo-egypt-cairo-3.webp" "anker-622-maggo-foldable-kickstand-phone-stand-viewing.webp"
update_file "$F" "anker-anker-622-maggo-egypt-cairo-4.webp" "anker-622-maggo-usb-c-port-input-output-detail.webp"
update_file "$F" "anker-anker-622-maggo-egypt-cairo-5.webp" "anker-622-maggo-slim-7mm-design-thickness-profile.webp"
update_file "$F" "anker-anker-622-maggo-egypt-cairo-6.webp" "anker-622-maggo-charging-iphone-magnetic-alignment-test.webp"
update_file "$F" "anker-anker-622-maggo-egypt-cairo-7.webp" "anker-622-maggo-package-box-contents-cable-egypt.webp"
echo "✅ anker-622-maggo"

# ─── anker-powerport-20w ───
F="$SRC/anker-powerport-20w.ts"
update_file "$F" "anker-anker-powerport-20w-egypt-cairo-1.webp" "anker-powerport-20w-usb-c-pd-wall-charger-cairovolt-egypt.webp"
update_file "$F" "anker-anker-powerport-20w-egypt-cairo-2.webp" "anker-powerport-20w-usb-c-port-detail-power-delivery.webp"
update_file "$F" "anker-anker-powerport-20w-egypt-cairo-3.webp" "anker-powerport-20w-compact-size-comparison-coin-plug.webp"
update_file "$F" "anker-anker-powerport-20w-egypt-cairo-4.webp" "anker-powerport-20w-charging-iphone-fast-charge-pd.webp"
update_file "$F" "anker-anker-powerport-20w-egypt-cairo-5.webp" "anker-powerport-20w-foldable-plug-prongs-travel-friendly.webp"
update_file "$F" "anker-anker-powerport-20w-egypt-cairo-6.webp" "anker-powerport-20w-package-box-contents-specifications.webp"
echo "✅ anker-powerport-20w"

# ─── anker-powerport-25w ───
F="$SRC/anker-powerport-25w.ts"
update_file "$F" "anker-anker-powerport-25w-egypt-cairo-1.webp" "anker-powerport-25w-usb-c-samsung-super-fast-charger-cairovolt.webp"
update_file "$F" "anker-anker-powerport-25w-egypt-cairo-2.webp" "anker-powerport-25w-usb-c-port-detail-pps-protocol.webp"
update_file "$F" "anker-anker-powerport-25w-egypt-cairo-3.webp" "anker-powerport-25w-compact-design-wall-outlet-plugged.webp"
update_file "$F" "anker-anker-powerport-25w-egypt-cairo-4.webp" "anker-powerport-25w-charging-samsung-galaxy-25w-fast.webp"
update_file "$F" "anker-anker-powerport-25w-egypt-cairo-5.webp" "anker-powerport-25w-foldable-plug-portable-travel.webp"
update_file "$F" "anker-anker-powerport-25w-egypt-cairo-6.webp" "anker-powerport-25w-package-box-contents-specifications.webp"
echo "✅ anker-powerport-25w"

# ─── anker-nano-45w ───
F="$SRC/anker-nano-45w.ts"
update_file "$F" "anker-anker-nano-45w-egypt-cairo-1.webp" "anker-nano-45w-usb-c-gan-charger-compact-cairovolt-egypt.webp"
update_file "$F" "anker-anker-nano-45w-egypt-cairo-2.webp" "anker-nano-45w-usb-c-port-detail-gan-technology.webp"
update_file "$F" "anker-anker-nano-45w-egypt-cairo-3.webp" "anker-nano-45w-size-comparison-apple-charger-compact.webp"
update_file "$F" "anker-anker-nano-45w-egypt-cairo-4.webp" "anker-nano-45w-charging-macbook-air-laptop-fast-pd.webp"
update_file "$F" "anker-anker-nano-45w-egypt-cairo-5.webp" "anker-nano-45w-foldable-plug-ultra-slim-design.webp"
update_file "$F" "anker-anker-nano-45w-egypt-cairo-6.webp" "anker-nano-45w-gan-II-chip-temperature-efficiency.webp"
update_file "$F" "anker-anker-nano-45w-egypt-cairo-7.webp" "anker-nano-45w-package-box-contents-specifications.webp"
echo "✅ anker-nano-45w"

# ─── anker-powerline-usb-c-lightning ───
F="$SRC/anker-powerline-usb-c-lightning.ts"
update_file "$F" "anker-anker-powerline-usb-c-lightning-egypt-cairo-1.webp" "anker-powerline-usb-c-to-lightning-mfi-cable-cairovolt-egypt.webp"
update_file "$F" "anker-anker-powerline-usb-c-lightning-egypt-cairo-2.webp" "anker-powerline-usb-c-lightning-connector-detail-mfi-certified.webp"
update_file "$F" "anker-anker-powerline-usb-c-lightning-egypt-cairo-3.webp" "anker-powerline-usb-c-lightning-braided-nylon-durable.webp"
update_file "$F" "anker-anker-powerline-usb-c-lightning-egypt-cairo-4.webp" "anker-powerline-usb-c-lightning-charging-iphone-fast-pd.webp"
update_file "$F" "anker-anker-powerline-usb-c-lightning-egypt-cairo-5.webp" "anker-powerline-usb-c-lightning-bend-test-12000-lifespan.webp"
update_file "$F" "anker-anker-powerline-usb-c-lightning-egypt-cairo-6.webp" "anker-powerline-usb-c-lightning-package-box-contents.webp"
echo "✅ anker-powerline-usb-c-lightning"

# ─── anker-powerline-usb-c-usb-c ───
F="$SRC/anker-powerline-usb-c-usb-c.ts"
update_file "$F" "anker-anker-powerline-usb-c-usb-c-egypt-cairo-1.webp" "anker-powerline-usb-c-to-usb-c-100w-cable-cairovolt-egypt.webp"
update_file "$F" "anker-anker-powerline-usb-c-usb-c-egypt-cairo-2.webp" "anker-powerline-usb-c-connector-detail-reinforced-joint.webp"
update_file "$F" "anker-anker-powerline-usb-c-usb-c-egypt-cairo-3.webp" "anker-powerline-usb-c-braided-nylon-texture-durability.webp"
update_file "$F" "anker-anker-powerline-usb-c-usb-c-egypt-cairo-4.webp" "anker-powerline-usb-c-100w-charging-laptop-macbook.webp"
update_file "$F" "anker-anker-powerline-usb-c-usb-c-egypt-cairo-5.webp" "anker-powerline-usb-c-cable-flexibility-bend-resistance.webp"
update_file "$F" "anker-anker-powerline-usb-c-usb-c-egypt-cairo-6.webp" "anker-powerline-usb-c-data-transfer-speed-10gbps.webp"
update_file "$F" "anker-anker-powerline-usb-c-usb-c-egypt-cairo-7.webp" "anker-powerline-usb-c-package-box-cable-accessories.webp"
echo "✅ anker-powerline-usb-c-usb-c"

# ─── anker-usb-c-lightning-sureistrong ───
F="$SRC/anker-usb-c-lightning-sureistrong.ts"
update_file "$F" "anker-anker-usb-c-lightning-sureistrong-egypt-cairo-1.webp" "anker-usb-c-lightning-sureistrong-240w-braided-cable-cairovolt.webp"
update_file "$F" "anker-anker-usb-c-lightning-sureistrong-egypt-cairo-2.webp" "anker-usb-c-lightning-sureistrong-connector-detail-kevlar.webp"
update_file "$F" "anker-anker-usb-c-lightning-sureistrong-egypt-cairo-3.webp" "anker-usb-c-lightning-sureistrong-charging-iphone-fast-pd.webp"
update_file "$F" "anker-anker-usb-c-lightning-sureistrong-egypt-cairo-4.webp" "anker-usb-c-lightning-sureistrong-package-box-contents.webp"
echo "✅ anker-usb-c-lightning-sureistrong"

# ─── anker-car-charger-dual-usb ───
F="$SRC/anker-car-charger-dual-usb.ts"
update_file "$F" "anker-anker-car-charger-dual-usb-egypt-cairo-1.webp" "anker-car-charger-dual-usb-24w-powerdrive-cairovolt-egypt.webp"
update_file "$F" "anker-anker-car-charger-dual-usb-egypt-cairo-2.webp" "anker-car-charger-dual-usb-a-ports-detail-24w-output.webp"
update_file "$F" "anker-anker-car-charger-dual-usb-egypt-cairo-3.webp" "anker-car-charger-installed-car-dashboard-cigarette-lighter.webp"
update_file "$F" "anker-anker-car-charger-dual-usb-egypt-cairo-4.webp" "anker-car-charger-charging-phone-tablet-dual-device.webp"
update_file "$F" "anker-anker-car-charger-dual-usb-egypt-cairo-5.webp" "anker-car-charger-compact-size-led-indicator-blue.webp"
update_file "$F" "anker-anker-car-charger-dual-usb-egypt-cairo-6.webp" "anker-car-charger-dual-usb-package-box-contents-egypt.webp"
echo "✅ anker-car-charger-dual-usb"

# ─── anker-soundcore-motion-plus ───
F="$SRC/anker-soundcore-motion-plus.ts"
update_file "$F" "anker-anker-soundcore-motion-plus-egypt-cairo-1.webp" "anker-soundcore-motion-plus-bluetooth-speaker-30w-cairovolt.webp"
update_file "$F" "anker-anker-soundcore-motion-plus-egypt-cairo-2.webp" "anker-soundcore-motion-plus-dual-driver-detail-close-up.webp"
update_file "$F" "anker-anker-soundcore-motion-plus-egypt-cairo-3.webp" "anker-soundcore-motion-plus-ipx7-waterproof-splash-test.webp"
update_file "$F" "anker-anker-soundcore-motion-plus-egypt-cairo-4.webp" "anker-soundcore-motion-plus-usb-c-aux-port-detail.webp"
update_file "$F" "anker-anker-soundcore-motion-plus-egypt-cairo-5.webp" "anker-soundcore-motion-plus-bass-radiator-passive-driver.webp"
update_file "$F" "anker-anker-soundcore-motion-plus-egypt-cairo-6.webp" "anker-soundcore-motion-plus-outdoor-portable-lifestyle.webp"
update_file "$F" "anker-anker-soundcore-motion-plus-egypt-cairo-7.webp" "anker-soundcore-motion-plus-package-box-contents-cable.webp"
echo "✅ anker-soundcore-motion-plus"

# ─── anker-soundcore-flare-2 ───
F="$SRC/anker-soundcore-flare-2.ts"
update_file "$F" "anker-anker-soundcore-flare-2-egypt-cairo-1.webp" "anker-soundcore-flare-2-bluetooth-speaker-360-led-cairovolt.webp"
update_file "$F" "anker-anker-soundcore-flare-2-egypt-cairo-2.webp" "anker-soundcore-flare-2-led-light-ring-360-ambient.webp"
update_file "$F" "anker-anker-soundcore-flare-2-egypt-cairo-3.webp" "anker-soundcore-flare-2-ipx7-waterproof-pool-outdoor.webp"
update_file "$F" "anker-anker-soundcore-flare-2-egypt-cairo-4.webp" "anker-soundcore-flare-2-package-box-contents-cable.webp"
echo "✅ anker-soundcore-flare-2"

# ─── anker-soundcore-life-p2i ───
F="$SRC/anker-soundcore-life-p2i.ts"
update_file "$F" "anker-anker-soundcore-life-p2i-egypt-cairo-1.webp" "anker-soundcore-life-p2i-wireless-earbuds-10mm-cairovolt.webp"
update_file "$F" "anker-anker-soundcore-life-p2i-egypt-cairo-2.webp" "anker-soundcore-life-p2i-earbud-driver-detail-design.webp"
update_file "$F" "anker-anker-soundcore-life-p2i-egypt-cairo-3.webp" "anker-soundcore-life-p2i-charging-case-open-led-status.webp"
update_file "$F" "anker-anker-soundcore-life-p2i-egypt-cairo-4.webp" "anker-soundcore-life-p2i-wearing-comfort-in-ear-fit.webp"
update_file "$F" "anker-anker-soundcore-life-p2i-egypt-cairo-5.webp" "anker-soundcore-life-p2i-usb-c-charging-port-case.webp"
update_file "$F" "anker-anker-soundcore-life-p2i-egypt-cairo-6.webp" "anker-soundcore-life-p2i-package-box-contents-eartips.webp"
echo "✅ anker-soundcore-life-p2i"

echo ""
echo "═══════════════════════════════════════════"
echo "✅ All 16 old product .ts files updated!"
echo "═══════════════════════════════════════════"
