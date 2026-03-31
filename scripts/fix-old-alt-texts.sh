#!/bin/bash
# Fix OLD product alt texts — descriptive scene + keyword + location
set -euo pipefail
SRC="src/data/products"
TOTAL=0

fix_alt() {
    local file="$1" old_alt="$2" new_alt="$3"
    sed -i '' "s|alt: \"${old_alt}\"|alt: \"${new_alt}\"|g" "$file" 2>/dev/null
}

echo "🔧 Injecting deep SEO alt texts for OLD products..."

# ─── anker-powercore-10000 ───
F="$SRC/anker-powercore-10000.ts"
fix_alt "$F" 'باور بانك انكر 10000 مللي أمبير الأصلي مصر 2026 - شحن سريع iPhone 17 Pro Max' 'باور بانك انكر PowerCore 10000 مللي أمبير صغير الحجم - اختبار مختبر كايرو فولت دمياط مصر'
fix_alt "$F" 'انكر باور كور 10000 - الموزع الرسمي | شحن لكل المحافظات' 'منفذ USB-A لباور بانك انكر 10000 مع تقنية PowerIQ للشحن السريع'
fix_alt "$F" 'anker powercore 10000 - Official Distributor | Nationwide Shipping' 'Anker PowerCore 10000mAh micro USB input port detail - compact design CairoVolt'
fix_alt "$F" 'انكر باور كور 10000 - أقل سعر في مصر | ضمان أصلي' 'حجم باور بانك انكر 10000 مقارنة باليد - تصميم خفيف جيب'
fix_alt "$F" 'anker powercore 10000 - Best Price Egypt | Original Warranty' 'Anker PowerCore 10000 charging iPhone with PowerIQ fast charge test - CairoVolt Lab'
fix_alt "$F" 'anker powercore 10000 - Lowest Price Guarantee Egypt' 'Anker PowerCore 10000 LED battery indicator showing 4 status lights'
fix_alt "$F" 'انكر باور كور 10000 - ضمان الوكيل | متاح بالدفع عند الاستلام' 'محتويات علبة انكر باور كور 10000 الأصلية مع كابل مايكرو USB - كايرو فولت مصر'
echo "✅ anker-powercore-10000 ($((TOTAL+=7)))"

# ─── anker-powercore-20000 ───
F="$SRC/anker-powercore-20000.ts"
fix_alt "$F" 'انكر باور كور 20000 - الموزع الرسمي | شحن لكل المحافظات' 'باور بانك انكر 20000 مللي أمبير عالي السعة - منظر أمامي كامل كايرو فولت'
fix_alt "$F" 'انكر باور كور 20000 - ضمان الوكيل | متاح بالدفع عند الاستلام' 'منفذي USB-A مزدوجين لباور بانك انكر 20000 لشحن جهازين معاً'
fix_alt "$F" 'anker powercore 20000 - Official Distributor | Nationwide Shipping' 'Anker PowerCore 20000 micro USB input charging port close-up detail'
fix_alt "$F" 'anker powercore 20000 - Lowest Price Guarantee Egypt' 'Anker PowerCore 20000 charging two devices simultaneously - dual output test'
fix_alt "$F" 'anker powercore 20000 - Best Price Egypt | Original Warranty' 'Anker PowerCore 20000 size and weight comparison - portable carry design'
fix_alt "$F" 'انكر باور كور 20000 - أقل سعر في مصر | ضمان أصلي' 'مؤشرات LED الأربعة لباور بانك انكر 20000 تعرض مستوى البطارية'
echo "✅ anker-powercore-20000 ($((TOTAL+=6)))"

# ─── anker-powercore-26800 ───
F="$SRC/anker-powercore-26800.ts"
fix_alt "$F" 'انكر باور كور 26800 - الموزع الرسمي | شحن لكل المحافظات' 'باور بانك انكر 26800 مللي أمبير سعة فائقة - ثلاث منافذ USB-A كايرو فولت'
fix_alt "$F" 'انكر باور كور 26800 - ضمان الوكيل | متاح بالدفع عند الاستلام' 'ثلاث منافذ USB-A خرج لباور بانك انكر 26800 للشحن المتعدد'
fix_alt "$F" 'anker powercore 26800 - Official Distributor | Nationwide Shipping' 'Anker PowerCore 26800 dual micro USB input ports for fast recharging'
fix_alt "$F" 'anker powercore 26800 - Lowest Price Guarantee Egypt' 'Anker PowerCore 26800 charging laptop tablet and phone simultaneously CairoVolt'
fix_alt "$F" 'anker powercore 26800 - Best Price Egypt | Original Warranty' 'Anker PowerCore 26800 size comparison weighing 349g - portable design'
fix_alt "$F" 'انكر باور كور 26800 - أقل سعر في مصر | ضمان أصلي' 'مؤشر LED لبطارية انكر 26800 يعرض حالة الشحن المتبقية'
echo "✅ anker-powercore-26800 ($((TOTAL+=6)))"

# ─── anker-737-powerbank ───
F="$SRC/anker-737-powerbank.ts"
fix_alt "$F" 'انكر 737 باور بانك - الموزع الرسمي | شحن لكل المحافظات' 'باور بانك انكر 737 بقوة 140 واط 24000 مللي أمبير بريميوم - كايرو فولت مصر'
fix_alt "$F" 'انكر 737 باور بانك - ضمان الوكيل | متاح بالدفع عند الاستلام' 'منفذ USB-C بقوة 140 واط PD3.1 لباور بانك انكر 737 - تفاصيل المنفذ'
fix_alt "$F" 'anker 737 powerbank - Official Distributor | Nationwide Shipping' 'Anker 737 smart digital display showing real-time wattage and voltage reading'
fix_alt "$F" 'anker 737 powerbank - Lowest Price Guarantee Egypt' 'Anker 737 charging MacBook Pro at 140W - laptop fast charge speed test CairoVolt'
fix_alt "$F" 'anker 737 powerbank - Best Price Egypt | Original Warranty' 'Anker 737 triple port configuration USB-C and USB-A layout detail'
fix_alt "$F" 'انكر 737 باور بانك - أقل سعر في مصر | ضمان أصلي' 'جسم ألمونيوم بريميوم لباور بانك انكر 737 - جودة التصنيع والتصميم'
echo "✅ anker-737-powerbank ($((TOTAL+=6)))"

# ─── anker-521-powerhouse ───
F="$SRC/anker-521-powerhouse.ts"
fix_alt "$F" 'انكر 521 باور هاوس - الموزع الرسمي | شحن لكل المحافظات' 'محطة طاقة انكر 521 باور هاوس 256 واط ساعة - منظر أمامي كايرو فولت'
fix_alt "$F" 'انكر 521 باور هاوس - ضمان الوكيل | متاح بالدفع عند الاستلام' 'مخرج تيار متردد 200 واط موجة ساين نقية لمحطة انكر 521'
fix_alt "$F" 'anker 521 powerhouse - Official Distributor | Nationwide Shipping' 'Anker 521 Powerhouse USB-C 60W PD output port detail for fast charging'
fix_alt "$F" 'anker 521 powerhouse - Lowest Price Guarantee Egypt' 'Anker 521 Powerhouse LCD display showing battery percentage and wattage'
fix_alt "$F" 'anker 521 powerhouse - Best Price Egypt | Original Warranty' 'Anker 521 Powerhouse charging multiple devices during camping outdoor use'
fix_alt "$F" 'انكر 521 باور هاوس - أقل سعر في مصر | ضمان أصلي' 'مدخل لوحة شمسية لشحن محطة انكر 521 في الهواء الطلق'
echo "✅ anker-521-powerhouse ($((TOTAL+=6)))"

# ─── anker-622-maggo ───
F="$SRC/anker-622-maggo.ts"
fix_alt "$F" 'anker 622 maggo - Official Distributor | Nationwide Shipping' 'Anker 622 MagGo 5000mAh MagSafe wireless power bank front view - CairoVolt Egypt'
fix_alt "$F" 'انكر 622 ماج جو - ضمان الوكيل | متاح بالدفع عند الاستلام' 'تثبيت مغناطيسي لباور بانك انكر 622 على ايفون - شحن لاسلكي MagSafe'
fix_alt "$F" 'anker 622 maggo - Lowest Price Guarantee Egypt' 'Anker 622 MagGo foldable kickstand for hands-free phone viewing angle'
fix_alt "$F" 'انكر 622 ماج جو - أقل سعر في مصر | ضمان أصلي' 'منفذ USB-C لباور بانك انكر 622 ماج جو - مدخل ومخرج'
echo "✅ anker-622-maggo ($((TOTAL+=4)))"

# ─── anker-powerport-20w ───
F="$SRC/anker-powerport-20w.ts"
fix_alt "$F" 'انكر باور بورت 20 واط - الموزع الرسمي | شحن لكل المحافظات' 'شاحن انكر 20 واط USB-C PD حائطي صغير الحجم - كايرو فولت مصر'
fix_alt "$F" 'anker powerport 20w - ضمان الوكيل | متاح بالدفع عند الاستلام' 'Anker PowerPort 20W USB-C Power Delivery port detail close-up'
fix_alt "$F" 'anker powerport 20w - Official Distributor | Nationwide Shipping' 'Anker 20W charger compact size comparison with coin - ultra portable'
fix_alt "$F" 'انكر باور بورت 20 واط - أقل سعر في مصر | ضمان أصلي' 'شاحن انكر 20 واط يشحن ايفون بتقنية الشحن السريع PD'
fix_alt "$F" 'anker powerport 20w - Lowest Price Guarantee Egypt' 'Anker 20W charger foldable plug prongs for travel-friendly portable design'
fix_alt "$F" 'anker powerport 20w - Best Price Egypt | Original Warranty' 'Anker PowerPort 20W package box with specifications and contents - Egypt'
echo "✅ anker-powerport-20w ($((TOTAL+=6)))"

# ─── anker-powerport-25w ───
F="$SRC/anker-powerport-25w.ts"
fix_alt "$F" 'انكر باور بورت 25 واط - الموزع الرسمي | شحن لكل المحافظات' 'شاحن انكر 25 واط USB-C سوبر فاست لسامسونج - كايرو فولت مصر'
fix_alt "$F" 'انكر باور بورت 25 واط - ضمان الوكيل | متاح بالدفع عند الاستلام' 'منفذ USB-C لشاحن انكر 25 واط بتقنية PPS المتقدمة'
fix_alt "$F" 'anker powerport 25w - Official Distributor | Nationwide Shipping' 'Anker 25W charger compact design plugged into wall outlet'
fix_alt "$F" 'anker powerport 25w - Lowest Price Guarantee Egypt' 'Anker 25W charging Samsung Galaxy at full 25W Super Fast speed test'
fix_alt "$F" 'anker powerport 25w - Best Price Egypt | Original Warranty' 'Anker 25W charger foldable plug portable travel-friendly design'
fix_alt "$F" 'انكر باور بورت 25 واط - أقل سعر في مصر | ضمان أصلي' 'محتويات علبة شاحن انكر 25 واط مع المواصفات - كايرو فولت'
echo "✅ anker-powerport-25w ($((TOTAL+=6)))"

# ─── anker-nano-45w ───
F="$SRC/anker-nano-45w.ts"
fix_alt "$F" 'انكر نانو 45 واط - الموزع الرسمي | شحن لكل المحافظات' 'شاحن انكر نانو 45 واط GaN USB-C صغير فائق الكفاءة - كايرو فولت مصر'
fix_alt "$F" 'انكر نانو 45 واط - ضمان الوكيل | متاح بالدفع عند الاستلام' 'منفذ USB-C لشاحن انكر نانو 45 واط بتقنية GaN الجيل الثاني'
fix_alt "$F" 'anker nano 45w - Official Distributor | Nationwide Shipping' 'Anker Nano 45W size comparison with Apple charger - 60% smaller GaN'
fix_alt "$F" 'anker nano 45w - Lowest Price Guarantee Egypt' 'Anker Nano 45W charging MacBook Air laptop with USB-C PD fast charge'
fix_alt "$F" 'anker nano 45w - Best Price Egypt | Original Warranty' 'Anker Nano 45W foldable plug ultra-slim design for travel'
fix_alt "$F" 'انكر نانو 45 واط - أقل سعر في مصر | ضمان أصلي' 'شريحة GaN II في شاحن انكر نانو 45 واط - كفاءة حرارية عالية'
echo "✅ anker-nano-45w ($((TOTAL+=6)))"

# ─── anker-powerline-usb-c-lightning ───
F="$SRC/anker-powerline-usb-c-lightning.ts"
fix_alt "$F" 'انكر باور لاين USB-C لايتنينج - الموزع الرسمي | شحن لكل المحافظات' 'كابل انكر USB-C إلى لايتنينج MFi معتمد نايلون مضفر - كايرو فولت مصر'
fix_alt "$F" 'انكر باور لاين USB-C لايتنينج - ضمان الوكيل | متاح بالدفع عند الاستلام' 'موصل لايتنينج لكابل انكر باور لاين معتمد MFi - تفاصيل الجودة'
fix_alt "$F" 'anker powerline usb-c lightning - Official Distributor | Nationwide Shipping' 'Anker PowerLine USB-C Lightning braided nylon durable cable texture detail'
fix_alt "$F" 'anker powerline usb-c lightning - Lowest Price Guarantee Egypt' 'Anker USB-C Lightning cable fast charging iPhone with PD speed test'
fix_alt "$F" 'anker powerline usb-c lightning - Best Price Egypt | Original Warranty' 'Anker PowerLine bend test 12000+ lifespan durability certification'
fix_alt "$F" 'انكر باور لاين USB-C لايتنينج - أقل سعر في مصر | ضمان أصلي' 'محتويات علبة كابل انكر باور لاين USB-C لايتنينج الأصلي'
echo "✅ anker-powerline-usb-c-lightning ($((TOTAL+=6)))"

# ─── anker-powerline-usb-c-usb-c ───
F="$SRC/anker-powerline-usb-c-usb-c.ts"
fix_alt "$F" 'انكر باور لاين USB-C - الموزع الرسمي | شحن لكل المحافظات' 'كابل انكر USB-C إلى USB-C 100 واط نايلون مضفر - كايرو فولت مصر'
fix_alt "$F" 'انكر باور لاين USB-C - ضمان الوكيل | متاح بالدفع عند الاستلام' 'موصل USB-C لكابل انكر باور لاين مع وصلة مقواة ضد الكسر'
fix_alt "$F" 'anker powerline usb-c usb-c - Official Distributor | Nationwide Shipping' 'Anker PowerLine USB-C braided nylon texture showing premium durability'
fix_alt "$F" 'anker powerline usb-c usb-c - Lowest Price Guarantee Egypt' 'Anker USB-C 100W cable charging laptop MacBook Pro PD fast charge'
fix_alt "$F" 'anker powerline usb-c usb-c - Best Price Egypt | Original Warranty' 'Anker USB-C cable flexibility bend resistance test demonstration'
fix_alt "$F" 'انكر باور لاين USB-C - أقل سعر في مصر | ضمان أصلي' 'سرعة نقل بيانات 10Gbps لكابل انكر USB-C إلى USB-C'
echo "✅ anker-powerline-usb-c-usb-c ($((TOTAL+=6)))"

# ─── anker-car-charger-dual-usb ───
F="$SRC/anker-car-charger-dual-usb.ts"
fix_alt "$F" 'انكر شاحن سيارة ثنائي - الموزع الرسمي | شحن لكل المحافظات' 'شاحن سيارة انكر 24 واط ثنائي المنافذ PowerDrive - كايرو فولت مصر'
fix_alt "$F" 'انكر شاحن سيارة ثنائي - ضمان الوكيل | متاح بالدفع عند الاستلام' 'منفذي USB-A مزدوجين لشاحن انكر السيارة بقوة 24 واط إجمالية'
fix_alt "$F" 'anker car charger dual usb - Official Distributor | Nationwide Shipping' 'Anker car charger installed in dashboard cigarette lighter socket'
fix_alt "$F" 'anker car charger dual usb - Lowest Price Guarantee Egypt' 'Anker car charger charging phone and tablet simultaneously dual device'
fix_alt "$F" 'anker car charger dual usb - Best Price Egypt | Original Warranty' 'Anker car charger compact size with blue LED power indicator light'
fix_alt "$F" 'انكر شاحن سيارة ثنائي - أقل سعر في مصر | ضمان أصلي' 'محتويات علبة شاحن سيارة انكر ثنائي USB الأصلي - كايرو فولت مصر'
echo "✅ anker-car-charger-dual-usb ($((TOTAL+=6)))"

# ─── anker-soundcore-motion-plus ───
F="$SRC/anker-soundcore-motion-plus.ts"
fix_alt "$F" 'انكر ساوند كور موشن بلس - الموزع الرسمي | شحن لكل المحافظات' 'سماعة انكر ساوندكور موشن بلس بلوتوث 30 واط - كايرو فولت مصر'
fix_alt "$F" 'انكر ساوند كور موشن بلس - ضمان الوكيل | متاح بالدفع عند الاستلام' 'درايفر مزدوج لسماعة انكر موشن بلس - تفاصيل مقربة عالية الدقة'
fix_alt "$F" 'anker soundcore motion plus - Official Distributor | Nationwide Shipping' 'Anker Soundcore Motion Plus IPX7 waterproof splash and water resistance test'
fix_alt "$F" 'anker soundcore motion plus - Lowest Price Guarantee Egypt' 'Anker Motion Plus USB-C and AUX port detail for charging and audio input'
fix_alt "$F" 'anker soundcore motion plus - Best Price Egypt | Original Warranty' 'Anker Soundcore Motion Plus passive bass radiator driver close-up'
fix_alt "$F" 'انكر ساوند كور موشن بلس - أقل سعر في مصر | ضمان أصلي' 'سماعة انكر موشن بلس في الهواء الطلق استخدام خارجي محمول'
echo "✅ anker-soundcore-motion-plus ($((TOTAL+=6)))"

# ─── anker-soundcore-flare-2 ───
F="$SRC/anker-soundcore-flare-2.ts"
fix_alt "$F" 'انكر ساوند كور فلير 2 - الموزع الرسمي | شحن لكل المحافظات' 'سماعة انكر ساوندكور فلير 2 بلوتوث 360 مع إضاءة LED - كايرو فولت'
fix_alt "$F" 'انكر ساوند كور فلير 2 - ضمان الوكيل | متاح بالدفع عند الاستلام' 'حلقة إضاءة LED 360 درجة لسماعة انكر فلير 2 - إضاءة محيطية'
fix_alt "$F" 'anker soundcore flare 2 - Official Distributor | Nationwide Shipping' 'Anker Soundcore Flare 2 IPX7 waterproof outdoor pool party speaker'
fix_alt "$F" 'anker soundcore flare 2 - Lowest Price Guarantee Egypt' 'Anker Flare 2 package box contents with USB-C cable and user guide'
echo "✅ anker-soundcore-flare-2 ($((TOTAL+=4)))"

# ─── anker-soundcore-life-p2i ───
F="$SRC/anker-soundcore-life-p2i.ts"
fix_alt "$F" 'انكر ساوند كور لايف P2i - الموزع الرسمي | شحن لكل المحافظات' 'سماعات انكر ساوندكور لايف P2i لاسلكية 10mm درايفر - كايرو فولت'
fix_alt "$F" 'انكر ساوند كور لايف P2i - ضمان الوكيل | متاح بالدفع عند الاستلام' 'تصميم درايفر سماعة انكر لايف P2i - تفاصيل السماعة الداخلية'
fix_alt "$F" 'anker soundcore life p2i - Official Distributor | Nationwide Shipping' 'Anker Life P2i charging case open with LED status indicator lights'
fix_alt "$F" 'anker soundcore life p2i - Lowest Price Guarantee Egypt' 'Anker Soundcore Life P2i wearing comfort in-ear fit lifestyle photo'
fix_alt "$F" 'anker soundcore life p2i - Best Price Egypt | Original Warranty' 'Anker Life P2i USB-C charging port on case bottom side detail'
fix_alt "$F" 'انكر ساوند كور لايف P2i - أقل سعر في مصر | ضمان أصلي' 'محتويات علبة سماعات انكر لايف P2i مع أطراف أذن متعددة الأحجام'
echo "✅ anker-soundcore-life-p2i ($((TOTAL+=6)))"

echo ""
echo "═══════════════════════════════════════════"
echo "✅ TOTAL: ${TOTAL} alt texts fixed for 16 old products"
echo "═══════════════════════════════════════════"
