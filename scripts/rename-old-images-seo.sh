#!/bin/bash
# CairoVolt SEO Image Renaming — OLD Products (16)
set -euo pipefail
BASE="public/products/anker"
TOTAL=0

echo "🏷️  Renaming OLD product images with SEO names..."

rename_seq() {
    local slug="$1"; shift
    local folder="${BASE}/${slug}"
    [ -d "$folder" ] || { echo "⚠️  Skip: $slug"; return; }
    local files=($(ls -1 "$folder"/*.webp 2>/dev/null | sort))
    local count=0
    for i in "${!files[@]}"; do
        [ $i -ge $# ] && break
        local new_name="${!i+1}"
        eval "new_name=\${$((i+1))}"
        local new_path="${folder}/${new_name}"
        [ "${files[$i]}" != "$new_path" ] && mv "${files[$i]}" "$new_path" 2>/dev/null && count=$((count+1))
    done
    TOTAL=$((TOTAL+count))
    echo "✅ $slug — ${count} renamed"
}

# ─── POWER BANKS ───
rename_seq "anker-powercore-10000" \
    "anker-powercore-10000mah-slim-portable-power-bank-cairovolt-egypt.webp" \
    "anker-powercore-10000-usb-a-output-port-detail-charging.webp" \
    "anker-powercore-10000-micro-usb-input-port-compact-design.webp" \
    "anker-powercore-10000-size-comparison-hand-pocket-portable.webp" \
    "anker-powercore-10000-charging-iphone-fast-poweriq-test.webp" \
    "anker-powercore-10000-led-indicator-battery-status-lights.webp" \
    "anker-powercore-10000-package-box-contents-cable-egypt.webp"

rename_seq "anker-powercore-20000" \
    "anker-powercore-20000mah-high-capacity-power-bank-cairovolt.webp" \
    "anker-powercore-20000-dual-usb-a-output-ports-detail.webp" \
    "anker-powercore-20000-micro-usb-input-charging-port.webp" \
    "anker-powercore-20000-charging-two-devices-simultaneously.webp" \
    "anker-powercore-20000-size-weight-comparison-portable.webp" \
    "anker-powercore-20000-led-battery-indicator-4-lights.webp" \
    "anker-powercore-20000-poweriq-voltage-boost-technology.webp" \
    "anker-powercore-20000-package-box-contents-cables-egypt.webp" \
    "anker-powercore-20000-side-profile-thickness-design.webp" \
    "anker-powercore-20000-matte-texture-anti-slip-surface.webp" \
    "anker-powercore-20000-charging-tablet-ipad-speed-test.webp" \
    "anker-powercore-20000-multisafety-protection-certification.webp" \
    "anker-powercore-20000-travel-friendly-airline-approved.webp" \
    "anker-powercore-20000-charging-samsung-galaxy-compatible.webp" \
    "anker-powercore-20000-capacity-test-watt-meter-lab.webp" \
    "anker-powercore-20000-full-view-all-angles-360.webp"

rename_seq "anker-powercore-26800" \
    "anker-powercore-26800mah-ultra-capacity-power-bank-cairovolt.webp" \
    "anker-powercore-26800-triple-usb-a-output-ports-detail.webp" \
    "anker-powercore-26800-dual-input-micro-usb-charging.webp" \
    "anker-powercore-26800-charging-laptop-tablet-phone-multi.webp" \
    "anker-powercore-26800-size-comparison-weight-349g.webp" \
    "anker-powercore-26800-led-battery-indicator-status.webp" \
    "anker-powercore-26800-capacity-endurance-test-lab-egypt.webp" \
    "anker-powercore-26800-package-box-cables-accessories.webp"

rename_seq "anker-737-powerbank" \
    "anker-737-powercore-24000mah-140w-premium-power-bank-cairovolt.webp" \
    "anker-737-usb-c-140w-output-port-detail-pd3.1.webp" \
    "anker-737-smart-digital-display-wattage-voltage-reading.webp" \
    "anker-737-charging-macbook-pro-140w-laptop-fast-charge.webp" \
    "anker-737-triple-port-usb-c-usb-a-configuration.webp" \
    "anker-737-premium-aluminum-body-design-build-quality.webp" \
    "anker-737-size-comparison-compact-24000mah-portable.webp" \
    "anker-737-package-contents-cable-pouch-accessories.webp"

rename_seq "anker-521-powerhouse" \
    "anker-521-powerhouse-256wh-portable-power-station-cairovolt.webp" \
    "anker-521-powerhouse-ac-outlet-200w-pure-sine-wave.webp" \
    "anker-521-powerhouse-usb-c-60w-pd-output-port-detail.webp" \
    "anker-521-powerhouse-lcd-display-battery-wattage-status.webp" \
    "anker-521-powerhouse-charging-multiple-devices-camping.webp" \
    "anker-521-powerhouse-solar-panel-input-charging-outdoor.webp" \
    "anker-521-powerhouse-led-flashlight-emergency-lighting.webp" \
    "anker-521-powerhouse-handle-portable-carry-design.webp" \
    "anker-521-powerhouse-all-ports-overview-configuration.webp" \
    "anker-521-powerhouse-package-box-cables-accessories.webp"

rename_seq "anker-622-maggo" \
    "anker-622-maggo-5000mah-magsafe-wireless-power-bank-cairovolt.webp" \
    "anker-622-maggo-magnetic-attachment-iphone-wireless-charging.webp" \
    "anker-622-maggo-foldable-kickstand-phone-stand-viewing.webp" \
    "anker-622-maggo-usb-c-port-input-output-detail.webp" \
    "anker-622-maggo-slim-7mm-design-thickness-profile.webp" \
    "anker-622-maggo-charging-iphone-magnetic-alignment-test.webp" \
    "anker-622-maggo-package-box-contents-cable-egypt.webp"

# ─── CHARGERS ───
rename_seq "anker-powerport-20w" \
    "anker-powerport-20w-usb-c-pd-wall-charger-cairovolt-egypt.webp" \
    "anker-powerport-20w-usb-c-port-detail-power-delivery.webp" \
    "anker-powerport-20w-compact-size-comparison-coin-plug.webp" \
    "anker-powerport-20w-charging-iphone-fast-charge-pd.webp" \
    "anker-powerport-20w-foldable-plug-prongs-travel-friendly.webp" \
    "anker-powerport-20w-package-box-contents-specifications.webp"

rename_seq "anker-powerport-25w" \
    "anker-powerport-25w-usb-c-samsung-super-fast-charger-cairovolt.webp" \
    "anker-powerport-25w-usb-c-port-detail-pps-protocol.webp" \
    "anker-powerport-25w-compact-design-wall-outlet-plugged.webp" \
    "anker-powerport-25w-charging-samsung-galaxy-25w-fast.webp" \
    "anker-powerport-25w-foldable-plug-portable-travel.webp" \
    "anker-powerport-25w-package-box-contents-specifications.webp"

rename_seq "anker-nano-45w" \
    "anker-nano-45w-usb-c-gan-charger-compact-cairovolt-egypt.webp" \
    "anker-nano-45w-usb-c-port-detail-gan-technology.webp" \
    "anker-nano-45w-size-comparison-apple-charger-compact.webp" \
    "anker-nano-45w-charging-macbook-air-laptop-fast-pd.webp" \
    "anker-nano-45w-foldable-plug-ultra-slim-design.webp" \
    "anker-nano-45w-gan-II-chip-temperature-efficiency.webp" \
    "anker-nano-45w-package-box-contents-specifications.webp"

# ─── CABLES ───
rename_seq "anker-powerline-usb-c-lightning" \
    "anker-powerline-usb-c-to-lightning-mfi-cable-cairovolt-egypt.webp" \
    "anker-powerline-usb-c-lightning-connector-detail-mfi-certified.webp" \
    "anker-powerline-usb-c-lightning-braided-nylon-durable.webp" \
    "anker-powerline-usb-c-lightning-charging-iphone-fast-pd.webp" \
    "anker-powerline-usb-c-lightning-bend-test-12000-lifespan.webp" \
    "anker-powerline-usb-c-lightning-package-box-contents.webp"

rename_seq "anker-powerline-usb-c-usb-c" \
    "anker-powerline-usb-c-to-usb-c-100w-cable-cairovolt-egypt.webp" \
    "anker-powerline-usb-c-connector-detail-reinforced-joint.webp" \
    "anker-powerline-usb-c-braided-nylon-texture-durability.webp" \
    "anker-powerline-usb-c-100w-charging-laptop-macbook.webp" \
    "anker-powerline-usb-c-cable-flexibility-bend-resistance.webp" \
    "anker-powerline-usb-c-data-transfer-speed-10gbps.webp" \
    "anker-powerline-usb-c-package-box-cable-accessories.webp"

rename_seq "anker-usb-c-lightning-sureistrong" \
    "anker-usb-c-lightning-sureistrong-240w-braided-cable-cairovolt.webp" \
    "anker-usb-c-lightning-sureistrong-connector-detail-kevlar.webp" \
    "anker-usb-c-lightning-sureistrong-charging-iphone-fast-pd.webp" \
    "anker-usb-c-lightning-sureistrong-package-box-contents.webp"

# ─── CAR CHARGER ───
rename_seq "anker-car-charger-dual-usb" \
    "anker-car-charger-dual-usb-24w-powerdrive-cairovolt-egypt.webp" \
    "anker-car-charger-dual-usb-a-ports-detail-24w-output.webp" \
    "anker-car-charger-installed-car-dashboard-cigarette-lighter.webp" \
    "anker-car-charger-charging-phone-tablet-dual-device.webp" \
    "anker-car-charger-compact-size-led-indicator-blue.webp" \
    "anker-car-charger-dual-usb-package-box-contents-egypt.webp"

# ─── AUDIO ───
rename_seq "anker-soundcore-motion-plus" \
    "anker-soundcore-motion-plus-bluetooth-speaker-30w-cairovolt.webp" \
    "anker-soundcore-motion-plus-dual-driver-detail-close-up.webp" \
    "anker-soundcore-motion-plus-ipx7-waterproof-splash-test.webp" \
    "anker-soundcore-motion-plus-usb-c-aux-port-detail.webp" \
    "anker-soundcore-motion-plus-bass-radiator-passive-driver.webp" \
    "anker-soundcore-motion-plus-outdoor-portable-lifestyle.webp" \
    "anker-soundcore-motion-plus-package-box-contents-cable.webp"

rename_seq "anker-soundcore-flare-2" \
    "anker-soundcore-flare-2-bluetooth-speaker-360-led-cairovolt.webp" \
    "anker-soundcore-flare-2-led-light-ring-360-ambient.webp" \
    "anker-soundcore-flare-2-ipx7-waterproof-pool-outdoor.webp" \
    "anker-soundcore-flare-2-package-box-contents-cable.webp"

rename_seq "anker-soundcore-life-p2i" \
    "anker-soundcore-life-p2i-wireless-earbuds-10mm-cairovolt.webp" \
    "anker-soundcore-life-p2i-earbud-driver-detail-design.webp" \
    "anker-soundcore-life-p2i-charging-case-open-led-status.webp" \
    "anker-soundcore-life-p2i-wearing-comfort-in-ear-fit.webp" \
    "anker-soundcore-life-p2i-usb-c-charging-port-case.webp" \
    "anker-soundcore-life-p2i-package-box-contents-eartips.webp"

echo ""
echo "✅ TOTAL: ${TOTAL} old images renamed"
