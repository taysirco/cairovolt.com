#!/usr/bin/env python3
"""Fix OLD product alt texts — descriptive scene + keyword + location"""
import re
import os

SRC = "src/data/products"

# Map: filename → { old_alts_by_img_id → new_alts }
FIXES = {
    "anker-powercore-10000.ts": {
        "img_1": "باور بانك انكر PowerCore 10000 مللي أمبير صغير الحجم - اختبار مختبر كايرو فولت دمياط مصر",
        "img_2": "Anker PowerCore 10000mAh USB-A output port with PowerIQ fast charging detail",
        "img_3": "منفذ مايكرو USB لشحن باور بانك انكر 10000 - تصميم صغير ومدمج",
        "img_4": "Anker PowerCore 10000 size comparison with hand - pocket-friendly portable design",
        "img_5": "اختبار شحن سريع لانكر 10000 مع ايفون - تقنية PowerIQ في مختبر كايرو فولت",
        "img_6": "Anker PowerCore 10000 LED battery indicator showing 4 status lights - charge level",
        "img_7": "محتويات علبة انكر باور كور 10000 الأصلية مع كابل مايكرو USB - كايرو فولت مصر",
    },
    "anker-powercore-20000.ts": {
        "img_1": "باور بانك انكر 20000 مللي أمبير عالي السعة - منظر أمامي كامل كايرو فولت مصر",
        "img_2": "Anker PowerCore 20000 dual USB-A output ports for simultaneous dual device charging",
        "img_3": "منفذ مايكرو USB لشحن باور بانك انكر 20000 - تفاصيل منفذ الإدخال",
        "img_4": "Anker PowerCore 20000 charging two devices simultaneously - dual output test CairoVolt",
        "img_5": "حجم ووزن باور بانك انكر 20000 مقارنة - تصميم محمول خفيف الوزن",
        "img_6": "Anker PowerCore 20000 LED 4-light battery indicator showing remaining charge level",
        "img_7": "تقنية PowerIQ و VoltageBoost في باور بانك انكر 20000 - شحن ذكي محسن",
        "img_8": "Anker PowerCore 20000 package box contents with cables and accessories - Egypt",
        "img_9": "ملف جانبي لباور بانك انكر 20000 يعرض السمك الرفيع والتصميم الأنيق",
        "img_10": "Anker PowerCore 20000 matte anti-slip surface texture - premium build quality",
        "img_11": "اختبار شحن تابلت ايباد من باور بانك انكر 20000 - سرعة الشحن الفعلية",
        "img_12": "Anker PowerCore 20000 MultiSafety protection system certification badge",
        "img_13": "باور بانك انكر 20000 متوافق مع السفر والطيران - معتمد من الخطوط الجوية",
        "img_14": "Anker PowerCore 20000 charging Samsung Galaxy smartphone compatibility test",
        "img_15": "اختبار سعة باور بانك انكر 20000 بجهاز قياس واط في مختبر كايرو فولت",
        "img_16": "Anker PowerCore 20000 full 360-degree view showing all angles and design details",
    },
    "anker-powercore-26800.ts": {
        "img_1": "باور بانك انكر 26800 مللي أمبير سعة فائقة ثلاث منافذ USB-A - كايرو فولت مصر",
        "img_2": "Anker PowerCore 26800 triple USB-A output ports detail for multi-device charging",
        "img_3": "منفذ مايكرو USB مزدوج لشحن باور بانك انكر 26800 بسرعة مضاعفة",
        "img_4": "Anker PowerCore 26800 charging laptop tablet and phone simultaneously - CairoVolt test",
        "img_5": "حجم باور بانك انكر 26800 مقارنة - وزن 349 جرام تصميم محمول",
        "img_6": "Anker PowerCore 26800 LED battery indicator showing charging status level",
        "img_7": "اختبار سعة وتحمل باور بانك انكر 26800 في مختبر كايرو فولت مصر",
        "img_8": "Anker PowerCore 26800 package box with cables and all accessories included",
    },
    "anker-737-powerbank.ts": {
        "img_1": "باور بانك انكر 737 بقوة 140 واط 24000 مللي أمبير بريميوم - كايرو فولت مصر",
        "img_2": "Anker 737 USB-C 140W output port with PD3.1 protocol support detail",
        "img_3": "شاشة ديجيتال ذكية لباور بانك انكر 737 تعرض الواط والفولت في الوقت الحقيقي",
        "img_4": "Anker 737 charging MacBook Pro at 140W speed - laptop fast charge test CairoVolt",
        "img_5": "تكوين المنافذ الثلاثية لباور بانك انكر 737 - USB-C و USB-A",
        "img_6": "Anker 737 premium aluminum body design and build quality close-up",
        "img_7": "حجم باور بانك انكر 737 المدمج مع سعة 24000 مللي أمبير - تصميم محمول",
        "img_8": "Anker 737 package contents including cable pouch and all accessories",
    },
    "anker-521-powerhouse.ts": {
        "img_1": "محطة طاقة انكر 521 باور هاوس 256 واط ساعة متنقلة - كايرو فولت مصر",
        "img_2": "Anker 521 Powerhouse AC outlet 200W pure sine wave output - home appliance ready",
        "img_3": "منفذ USB-C بقوة 60 واط لمحطة انكر 521 باور هاوس - شحن سريع PD",
        "img_4": "Anker 521 Powerhouse LCD display showing battery percentage and wattage",
        "img_5": "شحن أجهزة متعددة من محطة انكر 521 في الهواء الطلق - استخدام تخييم",
        "img_6": "Anker 521 Powerhouse solar panel input for outdoor charging capability",
        "img_7": "كشاف LED مدمج في محطة انكر 521 باور هاوس - إضاءة طوارئ",
        "img_8": "Anker 521 Powerhouse ergonomic handle for portable carry design",
        "img_9": "نظرة شاملة على كل منافذ محطة انكر 521 باور هاوس - تكوين كامل",
        "img_10": "Anker 521 Powerhouse package box with cables and all accessories included",
    },
    "anker-622-maggo.ts": {
        "img_1": "باور بانك انكر 622 ماج جو 5000 مللي أمبير شحن لاسلكي MagSafe - كايرو فولت",
        "img_2": "Anker 622 MagGo magnetic attachment snapping onto iPhone wireless charging test",
        "img_3": "حامل قابل للطي لباور بانك انكر 622 ماج جو - زاوية مشاهدة بدون يدين",
        "img_4": "Anker 622 MagGo USB-C input output port detail for charging and power delivery",
        "img_5": "تصميم رفيع 7mm لباور بانك انكر 622 ماج جو - ملف عرض جانبي",
        "img_6": "Anker 622 MagGo charging iPhone magnetic alignment test - CairoVolt Lab Egypt",
        "img_7": "محتويات علبة انكر 622 ماج جو الأصلية مع كابل USB-C - كايرو فولت مصر",
    },
    "anker-powerport-20w.ts": {
        "img_1": "شاحن انكر 20 واط USB-C PD حائطي صغير الحجم - كايرو فولت مصر",
        "img_2": "Anker PowerPort 20W USB-C Power Delivery port detail close-up",
        "img_3": "حجم شاحن انكر 20 واط مقارنة بعملة معدنية - تصميم فائق الصغر",
        "img_4": "Anker 20W fast charging iPhone with Power Delivery PD protocol speed test",
        "img_5": "شاحن انكر 20 واط بقابس قابل للطي - تصميم مناسب للسفر",
        "img_6": "Anker PowerPort 20W package box contents and specifications - CairoVolt Egypt",
    },
    "anker-powerport-25w.ts": {
        "img_1": "شاحن انكر 25 واط USB-C سوبر فاست تشارج لسامسونج - كايرو فولت مصر",
        "img_2": "Anker 25W USB-C port with PPS protocol for Samsung Super Fast Charging detail",
        "img_3": "شاحن انكر 25 واط مدمج في مقبس الحائط - تصميم صغير وأنيق",
        "img_4": "Anker 25W charging Samsung Galaxy at full speed - Super Fast Charge test CairoVolt",
        "img_5": "قابس قابل للطي لشاحن انكر 25 واط - محمول ومناسب للسفر",
        "img_6": "Anker 25W package box contents with specifications - CairoVolt Egypt",
    },
    "anker-nano-45w.ts": {
        "img_1": "شاحن انكر نانو 45 واط USB-C GaN فائق الكفاءة صغير الحجم - كايرو فولت",
        "img_2": "Anker Nano 45W USB-C port with GaN II technology close-up detail",
        "img_3": "حجم شاحن انكر نانو 45 واط مقارنة بشاحن ابل - أصغر بنسبة 60%",
        "img_4": "Anker Nano 45W charging MacBook Air laptop at full speed with PD fast charge",
        "img_5": "قابس قابل للطي فائق الرفع لشاحن انكر نانو 45 واط - تصميم سفر",
        "img_6": "Anker Nano 45W GaN II chip temperature and efficiency performance test",
        "img_7": "محتويات علبة شاحن انكر نانو 45 واط مع المواصفات - كايرو فولت مصر",
    },
    "anker-powerline-usb-c-lightning.ts": {
        "img_1": "كابل انكر USB-C إلى لايتنينج MFi معتمد نايلون مضفر - كايرو فولت مصر",
        "img_2": "Anker PowerLine USB-C Lightning connector detail MFi certified quality close-up",
        "img_3": "نسيج نايلون مضفر لكابل انكر باور لاين - متانة وجودة عالية",
        "img_4": "Anker USB-C Lightning cable fast charging iPhone with PD Power Delivery test",
        "img_5": "اختبار ثني كابل انكر باور لاين 12000 مرة - شهادة العمر الافتراضي",
        "img_6": "Anker PowerLine USB-C Lightning package box contents - CairoVolt Egypt",
    },
    "anker-powerline-usb-c-usb-c.ts": {
        "img_1": "كابل انكر USB-C إلى USB-C 100 واط نايلون مضفر متين - كايرو فولت مصر",
        "img_2": "Anker PowerLine USB-C connector detail with reinforced joint stress relief",
        "img_3": "نسيج نايلون مضفر لكابل انكر USB-C - جودة بناء متميزة ومتانة",
        "img_4": "Anker USB-C 100W cable charging MacBook laptop with PD fast charging test",
        "img_5": "مرونة كابل انكر USB-C ومقاومة الثني - اختبار المتانة",
        "img_6": "Anker USB-C cable 10Gbps data transfer speed test and specification",
        "img_7": "محتويات علبة كابل انكر USB-C إلى USB-C مع الملحقات - كايرو فولت",
    },
    "anker-car-charger-dual-usb.ts": {
        "img_1": "شاحن سيارة انكر 24 واط ثنائي المنافذ PowerDrive - كايرو فولت مصر",
        "img_2": "Anker car charger dual USB-A ports 24W total output power detail close-up",
        "img_3": "شاحن انكر مركب في لوحة السيارة بمقبس ولاعة السجائر",
        "img_4": "Anker car charger charging phone and tablet simultaneously dual device test",
        "img_5": "شاحن سيارة انكر بحجم صغير مع مؤشر LED أزرق للطاقة",
        "img_6": "Anker dual USB car charger package box and contents - CairoVolt Egypt",
    },
    "anker-soundcore-motion-plus.ts": {
        "img_1": "سماعة انكر ساوندكور موشن بلس بلوتوث 30 واط صوت عالي الجودة - كايرو فولت",
        "img_2": "Anker Soundcore Motion Plus dual driver detail close-up showing speaker quality",
        "img_3": "اختبار مقاومة الماء IPX7 لسماعة انكر موشن بلس - رش واختبار غمر",
        "img_4": "Anker Motion Plus USB-C and AUX 3.5mm port detail for charging and audio input",
        "img_5": "درايفر باس سلبي لسماعة انكر موشن بلس - تعزيز الترددات المنخفضة",
        "img_6": "Anker Soundcore Motion Plus outdoor portable lifestyle photo - waterproof speaker",
        "img_7": "محتويات علبة سماعة انكر موشن بلس مع كابل وملحقات - كايرو فولت مصر",
    },
    "anker-soundcore-flare-2.ts": {
        "img_1": "سماعة انكر ساوندكور فلير 2 بلوتوث 360 درجة مع إضاءة LED - كايرو فولت",
        "img_2": "Anker Soundcore Flare 2 LED light ring 360-degree ambient lighting effect",
        "img_3": "سماعة انكر فلير 2 مقاومة للماء IPX7 - استخدام حمام سباحة وأماكن مفتوحة",
        "img_4": "Anker Flare 2 package box contents with USB-C cable and user guide - Egypt",
    },
    "anker-soundcore-life-p2i.ts": {
        "img_1": "سماعات انكر ساوندكور لايف P2i لاسلكية درايفر 10mm - كايرو فولت مصر",
        "img_2": "Anker Life P2i earbud driver design detail showing 10mm speaker quality",
        "img_3": "علبة شحن انكر لايف P2i مفتوحة مع مؤشرات LED لحالة البطارية",
        "img_4": "Anker Soundcore Life P2i wearing comfort and in-ear fit lifestyle photo",
        "img_5": "منفذ USB-C لشحن علبة سماعات انكر لايف P2i - تفاصيل المنفذ",
        "img_6": "Anker Life P2i package box with multiple ear tip sizes and accessories - Egypt",
    },
}

total = 0

for filename, alts in FIXES.items():
    path = os.path.join(SRC, filename)
    if not os.path.exists(path):
        print(f"❌ NOT FOUND: {path}")
        continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed = 0
    for img_id, new_alt in alts.items():
        # Find the image entry and replace its alt text
        # Pattern: id: "img_X", url: "...", alt: "OLD TEXT"
        pattern = rf'(id: "{img_id}",\s*url: "[^"]*",\s*alt: ")[^"]*(")'
        new_content = re.sub(pattern, rf'\g<1>{new_alt}\2', content, count=1)
        if new_content != content:
            content = new_content
            changed += 1
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    total += changed
    print(f"✅ {filename} — {changed}/{len(alts)} alts fixed")

print(f"\n{'═'*50}")
print(f"✅ TOTAL: {total} alt texts fixed for {len(FIXES)} old products")
print(f"{'═'*50}")
