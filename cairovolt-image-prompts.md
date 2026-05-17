# 🎨 CairoVolt Blog Image Prompts — 101 صورة لـ Nano Banana

> **هذا الملف هو المرجع التنفيذي لتوليد صور الـ 101 مقال** عبر **Gemini 2.5 Flash Image (Nano Banana)** + حقن C2PA + EXIF.

---

## ⚙️ Config

```yaml
model: gemini-2.5-flash-image
alias: nano-banana
output_directory: public/images/blog/posts/
output_format: webp
dimensions: 1200x630         # OG image ratio (1.91:1)
quality: 85                   # cwebp -q 85
total_prompts: 101
synthid: enabled              # invisible watermark (Google default — لا يخل بـ "بدون بصمات")
```

---

## 🚫 Global Negative Directive (يُلحق بكل prompt تلقائياً)

> هذا التوجيه يُضاف لكل prompt قبل الإرسال لـ Nano Banana — يضمن عدم وجود بصمات مرئية:

```
ULTRA CLEAN editorial composition. NO brand logos, NO text overlays, NO watermarks,
NO visible model numbers, NO QR codes, NO barcodes, NO embossed branding,
NO printed labels, NO trademark symbols. Generic unbranded product depictions only.
Photorealistic product photography quality. Sharp focus on subject. Soft cinematic lighting.
Aspect ratio 1.91:1 (1200x630 for OG image).
```

---

## 🪪 EXIF Defaults (تُحقن لكل صورة)

```yaml
Artist: "CairoVolt Editorial Team"
Copyright: "© CairoVolt — All Rights Reserved"
Software: "CairoVolt Content Pipeline (Gemini 2.5 Flash Image)"
Make: "Synthetic — Gemini Nano Banana"
XPAuthor: "CairoVolt Team"
Rights: "https://cairovolt.com/license/editorial"
Contact: "editorial@cairovolt.com"
CreatorTool: "CairoVolt CMS v1.0"
Source: "https://cairovolt.com"
# الـ overrides لكل صورة في القسم أدناه (title/description/keywords)
```

---

## 🔐 C2PA Manifest Defaults (تُحقن لكل صورة)

```json
{
  "claim_generator": "CairoVolt-CMS/1.0 (Nano-Banana-Pipeline)",
  "creator": {
    "@type": "Organization",
    "name": "CairoVolt Editorial Team",
    "url": "https://cairovolt.com"
  },
  "actions": [
    {
      "action": "c2pa.created",
      "softwareAgent": "Gemini 2.5 Flash Image (Nano Banana)",
      "digitalSourceType": "trainedAlgorithmicMedia"
    },
    {
      "action": "c2pa.color_adjustments",
      "softwareAgent": "cwebp v1.3 -q 85"
    },
    {
      "action": "c2pa.metadata",
      "softwareAgent": "exiftool v12.x"
    },
    {
      "action": "c2pa.published",
      "softwareAgent": "CairoVolt Next.js CMS"
    }
  ],
  "assertions": {
    "stds.schema-org.CreativeWork": {
      "@type": "ImageObject",
      "publisher": { "@type": "Organization", "name": "CairoVolt" },
      "license": "https://cairovolt.com/license/editorial"
    }
  }
}
```

---

## ⚡ Injection Workflow (لكل صورة)

```bash
# 1. توليد الصورة عبر Nano Banana API (gemini-2.5-flash-image)
#    أرسل: {prompt} + {global_negative_directive}
#    احفظ الـ output في /tmp/{slug}-raw.png

# 2. تحويل + ضغط إلى WebP بأبعاد 1200x630
cwebp -q 85 -resize 1200 630 "/tmp/{slug}-raw.png" -o "/tmp/{slug}.webp"

# 3. حقن EXIF (دمج الـ defaults + per-prompt overrides)
exiftool -overwrite_original \
  -Artist="CairoVolt Editorial Team" \
  -Copyright="© CairoVolt — All Rights Reserved" \
  -Software="CairoVolt Content Pipeline (Gemini 2.5 Flash Image)" \
  -Make="Synthetic — Gemini Nano Banana" \
  -XPAuthor="CairoVolt Team" \
  -Rights="https://cairovolt.com/license/editorial" \
  -XPTitle="{exif.title}" \
  -XPSubject="{exif.title}" \
  -ImageDescription="{exif.description}" \
  -XPKeywords="{exif.keywords}" \
  -Subject="{exif.keywords}" \
  -ImageUniqueID="{slug}-$(date +%Y%m%d)" \
  -CreatorTool="CairoVolt CMS v1.0" \
  "/tmp/{slug}.webp"

# 4. توقيع C2PA Manifest
c2patool "/tmp/{slug}.webp" \
  -m "./c2pa-manifest-{slug}.json" \
  -o "/tmp/{slug}-signed.webp"

# 5. نشر للمجلد العام (يطابق المسار المُستخدم في blog posts)
mv "/tmp/{slug}-signed.webp" "public/images/blog/posts/{slug}.webp"

# 6. تنظيف
rm "/tmp/{slug}-raw.png" "/tmp/{slug}.webp"
```

> 📌 **ملاحظة:** المسار الفعلي في codebase هو `public/images/blog/posts/` (وليس `public/images/posts/`) — مطابق لمسار `coverImage` في `BlogArticle` schema.

---

## 🎨 الـ 101 Prompts (مرتبة برقم المقال)

### 1. `best-power-bank-under-1000-egp-egypt`
**Prompt:** Top-down flat lay product photography of two compact unbranded portable power banks on white Carrara marble surface. LEFT: circular matte black magnetic wireless power bank with foldable metal kickstand extended, single USB-C port on edge. RIGHT: rectangular slim matte charcoal power bank with embedded monochrome LCD displaying 80%, three USB ports along top edge. Soft warm Cairo morning daylight from upper-left window, subtle natural shadows, blurred Cairo cityscape distant background. Cinematic shallow depth of field, ultra-sharp product focus. Editorial tech publication aesthetic.
**EXIF:** `title=Best Power Bank Under 1000 EGP in Egypt — CairoVolt | desc=Two authentic budget power banks compared for the Egyptian market | keywords=power bank,joyroom,anker,egypt,magsafe,budget,authentic`

### 2. `best-100w-fast-charge-power-bank-iphone-samsung`
**Prompt:** Hero studio product photography, three-quarter angle view of premium 100W portable power bank, matte aluminum body with elegant USB-C ports and subtle LED status ring. Connected via thick USB-C cable to slim laptop (left) and modern smartphone (right) both displaying rapid-charge indicators. Charcoal seamless background, dramatic rim lighting from upper right creating elegant product silhouette. Subtle tabletop reflection. Premium tech magazine aesthetic.
**EXIF:** `title=100W Fast Charging Power Bank Egypt | desc=Premium 100W power bank charging laptop and smartphone simultaneously | keywords=100w power bank,fast charging,pd,iphone 17,galaxy s26,egypt`

### 3. `galaxy-s26-ultra-vs-iphone-17-pro-max-power-bank-needs`
**Prompt:** Split-screen editorial composition, two unbranded smartphones positioned mirror-image facing each other. LEFT: larger Android-style phone vertical. RIGHT: slightly smaller iPhone-style phone vertical. Between them a single premium power bank with two USB-C cables extending symmetrically. Floating holographic battery percentage indicators above each phone showing different fill levels. Dark gradient blue-to-black background, cool ambient lighting. Modern tech infographic aesthetic.
**EXIF:** `title=Galaxy S26 Ultra vs iPhone 17 Pro Max Power Bank | desc=Capacity needs comparison for premium flagship phones | keywords=galaxy s26 ultra,iphone 17 pro max,power bank,comparison,battery`

### 4. `magsafe-magnetic-power-bank-worth-extra-cost`
**Prompt:** Lifestyle product photography, person's hand (mostly out of frame) holding modern unbranded smartphone with circular matte black wireless magnetic power bank attached to back via visible magnetic seam. Located in cozy Cairo café with warm wood tabletop, blurred latte cup and laptop in background. Golden afternoon window light. Realistic skin tones, professional editorial composition. Sharp focus on power bank magnetic connection.
**EXIF:** `title=MagSafe Magnetic Power Bank Egypt | desc=Wireless magnetic power bank for iPhone users in Cairo café scene | keywords=magsafe,magnetic power bank,wireless charging,iphone,egypt`

### 5. `power-bank-for-photographers-dslr-cameras`
**Prompt:** Flat lay top-down composition of professional photographer's gear on dark walnut wood table. Central: rectangular high-capacity power bank in matte black with multiple USB-C ports. Surrounding: full-frame DSLR camera body, 70-200mm telephoto lens, mirrorless camera, SD card wallet, neatly coiled cables, leather camera strap. Warm tungsten overhead lighting. Editorial photographer workspace aesthetic.
**EXIF:** `title=Power Bank for DSLR Cameras Egypt | desc=Professional photography gear with high-capacity power bank | keywords=photographer,dslr,power bank,camera,egypt,professional`

### 6. `power-bank-gaming-pubg-freefire-cooling`
**Prompt:** Lifestyle gaming photography, gamer's hands holding horizontal unbranded smartphone with generic mobile game UI on screen, compact portable power bank with cooling fan attachment clipped to phone back. Purple and cyan RGB ambient backlight in dark room. Gaming controller and energy drink slightly defocused on desk. Sharp focus on phone-powerbank connection point. Action-oriented gaming aesthetic.
**EXIF:** `title=Power Bank for Mobile Gaming Egypt | desc=Cooling power bank for PUBG and Free Fire long sessions | keywords=gaming power bank,pubg,free fire,cooling,mobile gaming,egypt`

### 7. `5000-vs-10000-vs-20000-mah-which-capacity`
**Prompt:** Studio product photography, three power banks of escalating size lined up left-to-right on seamless white background: small lipstick-shaped 5000mAh, palm-sized rectangular 10000mAh, book-sized slab 20000mAh. All matte black with USB-C ports facing viewer. Soft diffused studio lighting from above, even shadows showing size progression. Clean editorial size comparison aesthetic.
**EXIF:** `title=5000 vs 10000 vs 20000 mAh Power Bank Comparison | desc=Size and capacity comparison for buyers in Egypt | keywords=5000mah,10000mah,20000mah,power bank,capacity,comparison`

### 8. `20000mah-power-bank-iphone-17-pro-max-charges`
**Prompt:** Macro product photography close-up. Foreground: unbranded modern smartphone screen showing battery charging icon at 67% with charge bolt symbol. Background slightly blurred: rectangular 20000mAh power bank with monochrome LCD percentage display showing 92%. Thick USB-C cable connecting them in elegant foreground arc. Soft cool blue evening ambient lighting suggesting overnight charging. Sharp focus on phone screen and cable.
**EXIF:** `title=20000mAh Power Bank Charges iPhone 17 Pro Max | desc=Real capacity test for high-end iPhone charging | keywords=20000mah,iphone 17 pro max,power bank,charging cycles,egypt`

### 9. `power-bank-with-digital-display-worth-it`
**Prompt:** Extreme macro product photography focused on power bank LCD display. Crisp digital readout showing 78% with input/output watts indicators. Power bank surface texture (matte aluminum with subtle perforated grille) visible in soft focus around display. Sharp pixel-level detail on LCD. Premium studio overhead lighting. Tech product editorial aesthetic.
**EXIF:** `title=Power Bank Digital LCD Display Egypt | desc=Close-up of premium power bank with percentage display | keywords=power bank,lcd display,digital,percentage,premium,egypt`

### 10. `power-bank-charge-4-devices-simultaneously`
**Prompt:** Top-down flat lay product photography on white seamless background. Central: large rectangular unbranded power bank with multiple ports along top edge. Four cables extending outward in elegant arc pattern to: slim laptop, modern smartphone, wireless earbuds case, smartwatch. Each device displaying generic charging status. Clean minimalist composition with negative space, soft diffused daylight from above. Editorial multi-device hub aesthetic.
**EXIF:** `title=Power Bank Charges 4 Devices Simultaneously | desc=Multi-port high-capacity power bank for laptop, phone, earbuds, watch | keywords=multi device charging,power bank,4 ports,laptop,phone,watch,earbuds`

### 11. `why-power-bank-dies-after-6-months-mistakes`
**Prompt:** Side-by-side product comparison on dark slate surface. LEFT: old worn power bank with visible swollen battery bulge, scratched matte finish, frayed cable connector showing exposed wires. RIGHT: pristine new power bank in clean matte black, sleek and intact. Dramatic side lighting accentuating contrast — left side dim and shadowy, right side cleanly lit. Cautionary educational editorial mood.
**EXIF:** `title=Why Power Bank Dies After 6 Months — Mistakes | desc=Damaged vs new power bank comparison showing wear from misuse | keywords=power bank damage,swollen battery,lifespan,care,egypt`

### 12. `anker-vs-joyroom-power-banks-12-models-tested`
**Prompt:** Flat lay top-down product photography on clean light gray surface. Six unbranded power banks arranged in two horizontal rows (three each side): top row in cooler tones (silver/blue accents), bottom row in warmer tones (charcoal/copper accents). All facing USB-C ports toward viewer in consistent orientation. Even soft studio lighting. Editorial brand comparison aesthetic like premium tech magazine spread.
**EXIF:** `title=Anker vs Joyroom Power Banks Test Egypt | desc=12 power bank models tested by CairoVolt with real numbers | keywords=anker vs joyroom,power bank,comparison,test,egypt,12 models`

### 13. `iphone-17-pro-max-charger-20w-30w-45w-which`
**Prompt:** Studio product photography of three compact unbranded wall chargers in escalating size on light gray seamless background: small 20W single-port, medium 30W dual-port GaN, larger 45W multi-port. All in matte white finish with USB-C ports. Arranged horizontally with consistent spacing. Modern unbranded smartphone in soft background showing charging icon. Clean editorial product comparison.
**EXIF:** `title=iPhone 17 Pro Max Charger 20W vs 30W vs 45W | desc=Comparing charger wattages for iPhone Pro Max fast charging | keywords=iphone 17 pro max,charger,20w,30w,45w,fast charging,egypt`

### 14. `best-gan-multi-port-chargers-office-home-egypt`
**Prompt:** Top-down flat lay of five unbranded GaN multi-port chargers on white desk with subtle paper texture. Each charger varies in port count and design — 2-port, 3-port, 4-port, 6-port, 8-port arrangements. All in clean white or charcoal finishes. Wood pencils, paper notepad, minimal stationery in corners suggesting modern office environment. Soft natural daylight. Professional workspace aesthetic.
**EXIF:** `title=Best GaN Multi-Port Chargers for Office Egypt | desc=Five premium multi-port GaN chargers for desk and home | keywords=gan charger,multi port,office,home,desk,egypt`

### 15. `travel-charger-usb-c-usb-a-sahel-trip`
**Prompt:** Lifestyle product photography, compact dual-port travel charger (visible USB-C + USB-A ports) placed atop folded passport beside vintage leather travel wallet and wireless earbud case. All arranged on woven beach mat texture suggesting Sahel beach trip. Warm golden hour Egyptian Mediterranean light from upper right. Shallow depth of field. Summer travel aesthetic.
**EXIF:** `title=Travel Charger USB-C USB-A for Sahel Trip | desc=Compact dual-port charger for Egyptian beach vacation | keywords=travel charger,usb-c,usb-a,sahel,beach,egypt,vacation`

### 16. `20w-30w-45w-65w-100w-charger-which-you-need`
**Prompt:** Editorial product photography, five unbranded wall chargers of escalating size lined up left-to-right on white seamless background, from small compact 20W single-port to large 100W multi-port GaN. Subtle wattage size progression visible in physical dimensions. All matte white finish. Side studio lighting creating elegant graduated shadows. Tech wattage comparison editorial aesthetic.
**EXIF:** `title=20W to 100W Charger Difference — Which You Need | desc=Five wattages compared with visual size progression | keywords=charger wattage,20w,30w,45w,65w,100w,comparison,egypt`

### 17. `2-in-1-wireless-charger-phone-watch-bedside`
**Prompt:** Lifestyle product photography of dual wireless charging stand with unbranded smartphone (vertical, screen showing dim clock face) and smartwatch resting on dedicated puck. Located on bedside table with linen sheets visible in soft background. Warm dim bedroom ambient light suggesting late evening. Cozy domestic aesthetic with shallow depth of field on charging stand.
**EXIF:** `title=2-in-1 Wireless Charger Phone & Watch | desc=Dual wireless charging stand for bedside use | keywords=wireless charger,2 in 1,phone,watch,bedside,egypt`

### 18. `charge-phone-overnight-safe-or-not`
**Prompt:** Moody lifestyle product photography of unbranded smartphone on bedside table charging via cable, screen dimly showing charging indicator at 95%. Moonlight streaming through window blinds creating soft striped shadows across surface. Glass of water beside it. Dark blue cool tones throughout. Suggesting overnight charging scenario in modern Cairo bedroom.
**EXIF:** `title=Is Overnight Phone Charging Safe? | desc=Phone charging through the night with safety considerations | keywords=overnight charging,phone safety,battery,night,egypt`

### 19. `samsung-s26-ultra-45w-super-fast-charging-real`
**Prompt:** Premium product photography of unbranded high-end large-screen smartphone displaying battery rapidly charging at 67% with prominent lightning bolt icon. Connected to compact 45W GaN charger via thick braided USB-C cable. Dark gradient background, cool blue rim lighting with subtle electric accent glow around cable suggesting fast charging energy. Premium tech aesthetic.
**EXIF:** `title=Samsung S26 Ultra 45W Super Fast Charging | desc=Testing real-world Super Fast Charging speeds | keywords=samsung s26 ultra,45w,super fast charging,test,egypt`

### 20. `slimmest-100w-laptop-gan-chargers-egypt`
**Prompt:** Product photography showing dramatic size comparison. Foreground: extremely slim modern GaN 100W charger held between fingertips (fingers mostly out of frame), showing incredible thinness. Background lying flat on dark surface for scale: traditional large brick laptop charger for visual contrast. Dramatic side lighting emphasizing thinness contrast. Editorial tech innovation aesthetic.
**EXIF:** `title=Slimmest 100W GaN Laptop Chargers Egypt | desc=Compact GaN chargers vs traditional bricks size comparison | keywords=gan charger,100w,laptop,slim,thin,egypt,workspace`

### 21. `why-anker-chargers-disappear-egyptian-markets`
**Prompt:** Atmospheric editorial photography of nearly empty retail shelf in Egyptian electronics shop, with only one solitary genuine charger box remaining, surrounded by clear gaps where products used to be displayed. Warm shop ambient lighting with slight mystery mood. Subtle defocused Arabic shop signage in distant background. Cautionary market scarcity aesthetic.
**EXIF:** `title=Why Anker Chargers Disappear from Egyptian Markets | desc=Investigating supply chain issues for authentic chargers | keywords=anker,supply,egypt,market,authentic chargers,scarcity`

### 22. `xiaomi-redmi-note-13-pro-best-charger-egypt`
**Prompt:** Lifestyle product photography, unbranded mid-range Android smartphone (silver/glass back design) placed on textured concrete surface with compact wall charger and braided USB-C cable arranged in geometric composition. Student-style aesthetic with subtle notebook and coffee mug in soft background. Cool natural daylight. Modern minimalist budget tech composition.
**EXIF:** `title=Best Charger for Xiaomi Redmi Note 13 Pro Egypt | desc=Affordable charger options for Xiaomi mid-range users | keywords=xiaomi,redmi note 13 pro,poco,charger,budget,egypt`

### 23. `hyperjuice-professional-charger-when-need-it`
**Prompt:** Lifestyle photography of professional content creator's workspace. Central: high-end multi-port unbranded charger powering external monitor, mirrorless camera, smartphone, and slim laptop simultaneously via organized cable management runs. Studio backdrop slightly defocused. Moody professional lighting. Editorial creator workspace aesthetic.
**EXIF:** `title=HyperJuice Professional Charger for Creators | desc=High-end multi-device charger for content creators and designers | keywords=hyperjuice,professional charger,creator,designer,multi device,egypt`

### 24. `protect-charger-egypt-voltage-fluctuation-summer`
**Prompt:** Editorial concept photography, Egyptian household wall outlet (characteristic Egyptian plug style) with surge protector strip and wall charger plugged in. Subtle electrical voltage waveform overlay in soft transparency. Warm Egyptian apartment interior background slightly blurred. Cautionary educational aesthetic, slightly dramatic Cairo summer afternoon light.
**EXIF:** `title=Protect Charger from Egypt Voltage Fluctuation | desc=Safeguarding home chargers from Egyptian electrical grid issues | keywords=voltage protection,surge protector,egypt,charger,summer,electrical safety`

### 25. `usb-c-240w-cable-gaming-laptop-when-need`
**Prompt:** Macro product photography of thick premium USB-C 240W cable in nylon braided weave (charcoal with subtle red accent), coiled elegantly on dark walnut wood surface. One connector end pointing toward viewer showing reinforced metal housing detail. Sharp focus on cable texture and connector pins. Dramatic side lighting from upper-left. Premium accessory editorial aesthetic.
**EXIF:** `title=USB-C 240W Cable for Gaming Laptops Egypt | desc=Heavy-duty 240W cable for gaming laptop fast charging | keywords=usb-c,240w cable,gaming laptop,fast charging,braided,egypt`

### 26. `3-meter-charging-cable-bed-living-room`
**Prompt:** Lifestyle photography, modern Cairo bedroom with long 3-meter charging cable elegantly arcing from wall outlet across nightstand to unbranded smartphone resting on bed pillow. Cable in soft white/beige finish blending with linen aesthetic. Warm bedside lamp light. Cozy domestic scene with shallow depth of field on cable midpoint.
**EXIF:** `title=3 Meter Charging Cable for Bedroom Egypt | desc=Long durable cables for bedroom and living room use | keywords=3 meter cable,long cable,bedroom,living room,egypt`

### 27. `magnetic-cable-car-charging-pros-cons`
**Prompt:** Dramatic macro product photography of magnetic USB-C cable connector mid-snap toward phone port, with subtle magnetic field lines visualization in soft cyan glow. Located in modern car interior dashboard with leather texture in soft focus. Sharp focus on magnetic connection moment. Tech demonstration aesthetic with cool tones.
**EXIF:** `title=Magnetic Cable for Car Charging Egypt | desc=Pros and cons of magnetic charging cables for vehicles | keywords=magnetic cable,car charger,convenience,charging speed,egypt`

### 28. `usb-c-lightning-vs-usb-c-usb-c-faster`
**Prompt:** Studio product photography on white seamless background. Two unbranded cables lying parallel diagonal: one USB-C to USB-C (charcoal braided), one USB-C to Lightning (also charcoal braided). Both showing connector details prominently with sharp focus on both ends. Even soft studio lighting from above. Clean editorial comparison shot.
**EXIF:** `title=USB-C to Lightning vs USB-C to USB-C Speed | desc=Cable speed comparison for iPhone charging | keywords=usb-c,lightning,cable comparison,iphone,speed,egypt`

### 29. `protect-cables-car-summer-heat-cairo`
**Prompt:** Editorial concept photography of car interior dashboard with visible thermometer showing 65°C+ reading. Two cables in foreground — one healthy braided cable intact, one melted/deformed cable showing visible heat damage. Cairo summer harsh sunlight streaming through windshield creating sharp shadows. Cautionary Egyptian context aesthetic.
**EXIF:** `title=Protect Cables from Cairo Summer Car Heat | desc=Cable damage prevention in 70 Celsius Egyptian car interiors | keywords=cable heat damage,cairo summer,car interior,protection,egypt`

### 30. `short-30cm-cable-power-bank-extends-life`
**Prompt:** Macro product photography of short 30cm USB-C cable elegantly coiled around small portable power bank, demonstrating compact bundle. White seamless background, even diffused studio lighting from above. Sharp focus on cable wrap and USB-C connector detail. Minimalist product aesthetic emphasizing compactness.
**EXIF:** `title=Short 30cm Cable for Power Bank Battery Life | desc=Why short cables extend power bank battery longevity | keywords=short cable,30cm,power bank,battery life,compact,egypt`

### 31. `usb-c-240w-thunderbolt-port-difference`
**Prompt:** Extreme macro photography of two USB-C connector ends side by side on dark surface, showing pin configuration differences. One labeled subtly as basic (fewer visible internal contacts pattern), one as full-spec (denser pin pattern). Sharp technical detail. Cool tech-blue ambient lighting. Educational technical aesthetic.
**EXIF:** `title=Not All USB-C Ports Support 240W or Thunderbolt | desc=How to identify USB-C port capabilities | keywords=usb-c,thunderbolt,240w,port differences,technical,egypt`

### 32. `joyroom-speedy-cable-3-months-review`
**Prompt:** Lifestyle product photography of USB-C braided cable being demonstrated for durability — knotted and pulled, with hand (out of frame) testing strain force. Visible nylon weave texture detail and reinforced stress points. Warm wood desk surface, soft natural daylight from upper-left. Realistic editorial product review aesthetic.
**EXIF:** `title=Joyroom Speedy Cable Review After 3 Months | desc=Long-term durability review of premium cable | keywords=joyroom,speedy cable,review,durability,3 months,egypt`

### 33. `car-charger-100w-laptop-sahel-trip`
**Prompt:** Lifestyle photography from car cockpit perspective, slim unbranded laptop on passenger seat connected via USB-C cable to 100W car charger plugged into 12V dashboard outlet. Egyptian desert highway visible through windshield with golden hour sky and palm trees in distance. Sand-toned car interior. Professional Egyptian road trip aesthetic.
**EXIF:** `title=Car Charger 100W for Laptop on Sahel Trip | desc=Powering laptops on long Egyptian road trips | keywords=car charger,100w,laptop,sahel,road trip,egypt`

### 34. `magnetic-car-phone-holder-wireless-charging`
**Prompt:** Macro lifestyle product photography of magnetic phone holder mounted on car air vent, unbranded smartphone attached vertically displaying navigation. Subtle wireless charging glow effect visible around phone back. Modern car interior with leather and chrome details slightly blurred. Soft Cairo afternoon light through windshield. Premium auto accessory aesthetic.
**EXIF:** `title=Magnetic Car Phone Holder with Wireless Charging | desc=MagSafe car mount with charging for navigation | keywords=magnetic car holder,wireless charging,navigation,car accessory,egypt`

### 35. `car-charger-3-devices-power-distribution`
**Prompt:** Editorial photography of car dashboard cup-holder area with central multi-port USB-C car charger powering three devices simultaneously: smartphone in mount above, smartwatch charging on console, wireless earbuds case on cupholder. Visible cable management. Morning Cairo commute lighting through windshield. Multi-device car hub aesthetic.
**EXIF:** `title=Car Charger for 3 Devices Power Distribution | desc=Smart power distribution between multiple in-car devices | keywords=car charger,multi device,power distribution,commute,egypt`

### 36. `car-charger-stops-working-5-causes-fixes`
**Prompt:** Concept photography of single car charger plug held by hand, partially out of frame, with subtle red warning light overlay glowing softly. Car dashboard 12V outlet visible in background slightly defocused. Dramatic side lighting creating diagnostic troubleshooting mood. Editorial diagnostic aesthetic.
**EXIF:** `title=Car Charger Stops Working — 5 Causes and Fixes | desc=Diagnosing common car charger failures | keywords=car charger troubleshoot,not working,fixes,egypt,diagnostic`

### 37. `car-phone-holder-cooling-fan-summer-protection`
**Prompt:** Lifestyle product photography of car phone holder with built-in cooling fan grille visible, unbranded smartphone mounted vertically in landscape grip. Subtle cool blue airflow particles visualization rising from fan vents. Sun-drenched Egyptian car interior, harsh summer afternoon light. Functional accessory aesthetic showing problem solution.
**EXIF:** `title=Car Phone Holder with Cooling Fan Egypt | desc=Active cooling phone mounts for Cairo summer heat | keywords=phone holder,cooling fan,car accessory,summer heat,cairo`

### 38. `car-charger-usb-c-pd-iphone-15-ipad`
**Prompt:** Premium product photography of compact USB-C PD car charger plugged into modern car 12V outlet, with USB-C cable extending to iPhone-style device on dashboard holder. Black-on-black sophisticated aesthetic. Cool ambient car LED lighting. Apple-ecosystem accessory style with premium feel.
**EXIF:** `title=Car Charger USB-C PD for iPhone 15 and iPad | desc=Essential USB-C PD car chargers for modern Apple devices | keywords=car charger,usb-c pd,iphone 15,ipad,apple,egypt`

### 39. `car-accessories-uber-careem-drivers-egypt`
**Prompt:** Lifestyle dashboard photography from Uber/Careem driver perspective. Phone in mount displaying ride-share app generic UI, USB-C charger keeping phone topped up, additional portable power bank stashed in cup holder. Cairo traffic visible through windshield in soft focus. Realistic gig economy aesthetic with warm daytime tones.
**EXIF:** `title=Car Accessories for Uber and Careem Drivers Egypt | desc=Essential gear for ride-share drivers in Egypt | keywords=uber,careem,driver accessories,car phone holder,egypt`

### 40. `car-charger-toyota-corolla-hyundai-tucson-kia-cerato`
**Prompt:** Editorial triptych photography showing three Egyptian-market car dashboards stacked vertically (cropped to focus on center console area): top sedan dashboard, middle SUV dashboard, bottom compact dashboard. Each with USB-C charger plugged in and similar phone setup arrangement. Consistent natural daylight across all three frames. Compatibility comparison aesthetic.
**EXIF:** `title=Car Charger for Toyota Corolla Hyundai Tucson Kia Cerato | desc=Best car chargers for popular Egyptian car models | keywords=toyota corolla,hyundai tucson,kia cerato,car charger,egypt`

### 41. `gaming-earbuds-pubg-freefire-low-latency`
**Prompt:** Lifestyle product photography of unbranded wireless gaming earbuds with charging case on dark gaming desk. Unbranded smartphone in landscape mode displaying generic battle royale game UI. Purple and cyan RGB ambient backlighting in dark room. Gaming controller and energy drink slightly defocused. Sharp focus on earbud case. Action gaming aesthetic.
**EXIF:** `title=Gaming Earbuds for PUBG Free Fire Low Latency | desc=Low-latency wireless earbuds for mobile gaming | keywords=gaming earbuds,pubg,free fire,low latency,wireless,egypt`

### 42. `airpods-pro-3-vs-soundcore-liberty-4-nc`
**Prompt:** Studio product photography of two pairs of unbranded wireless earbuds in their cases positioned side by side on light gray seamless background. Each case open showing earbuds inside. Subtle visualization of sound waves emanating from each in different tones (cool blue vs warm amber) suggesting different audio profiles. Editorial comparison aesthetic.
**EXIF:** `title=AirPods Pro 3 vs Soundcore Liberty 4 NC | desc=Premium vs budget noise-canceling earbuds compared | keywords=airpods pro 3,soundcore liberty 4 nc,wireless earbuds,comparison,egypt`

### 43. `earbuds-for-quran-recitation-clear-sound`
**Prompt:** Lifestyle photography of unbranded wireless earbuds with white charging case placed on prayer rug (sajjada) beside open Quran with bookmark visible. Soft warm natural daylight from window suggesting late afternoon Asr time. Reverent peaceful aesthetic. Earbuds in subtle pearl white with silver case. Spiritual focus mood.
**EXIF:** `title=Best Earbuds for Quran Recitation Egypt | desc=Clear-sound earbuds for spiritual content listening | keywords=earbuds,quran,recitation,clear sound,spiritual,egypt`

### 44. `bluetooth-earbuds-by-phone-brand-iphone-samsung-xiaomi-oppo`
**Prompt:** Flat lay top-down product photography of single pair of unbranded wireless earbuds in case at center, surrounded by four unbranded smartphones radiating outward representing different brands with subtle design language differences. Light gray seamless background. Even diffused studio lighting. Compatibility comparison aesthetic.
**EXIF:** `title=Bluetooth Earbuds by Phone Brand Compatibility | desc=Choosing earbuds for iPhone Samsung Xiaomi Oppo | keywords=bluetooth earbuds,iphone,samsung,xiaomi,oppo,compatibility,egypt`

### 45. `bluetooth-speaker-beach-pool-ipx67-rating`
**Prompt:** Lifestyle product photography of rugged waterproof unbranded Bluetooth speaker partially submerged in shallow pool water, with visible water droplets and splash motion. Mediterranean blue water tones suggesting Sahel beach pool. Bright Egyptian summer sunlight from above. Action-shot composition with frozen droplet detail. Adventure aesthetic.
**EXIF:** `title=Bluetooth Speaker for Beach and Pool IPX67 | desc=Truly waterproof speakers for Egyptian summer water activities | keywords=bluetooth speaker,beach,pool,ipx67,waterproof,sahel,egypt`

### 46. `earbuds-gym-running-no-drop-sweat-resistant`
**Prompt:** Lifestyle photography of person mid-jog in athletic clothing wearing unbranded wireless earbuds, face partially out of frame. Motion blur on background suggesting active running pace. Modern fitness aesthetic. Egyptian urban running path visible in soft background. Sharp focus on earbud staying securely in ear. Energetic morning light.
**EXIF:** `title=Earbuds for Gym and Running — No Drop Egypt | desc=Secure-fit sweat-resistant earbuds for active workouts | keywords=earbuds,gym,running,sweat resistant,no drop,egypt,fitness`

### 47. `bluetooth-earbuds-disconnect-6-causes-7-fixes`
**Prompt:** Concept photography of single unbranded wireless earbud floating in dark space with subtle wifi/bluetooth signal wave interference visualization in cool blue concentric rings, some breaking up suggesting disconnection issues. Dark gradient background. Technical troubleshooting aesthetic with diagnostic cool mood.
**EXIF:** `title=Why Bluetooth Earbuds Disconnect — Causes and Fixes | desc=6 reasons earbuds drop connection and 7 solutions | keywords=bluetooth earbuds,disconnect,troubleshoot,causes,fixes,egypt`

### 48. `anc-vs-enc-vs-transparency-mode-difference`
**Prompt:** Editorial conceptual triptych composition of one unbranded earbud shown three times with different sound wave visual treatments: LEFT noise canceling (with soft sound wave dampening visualization), CENTER environmental noise canceling (different breaking wave pattern), RIGHT transparency mode (clear waves passing through unobstructed). Clean light gray background. Educational technical aesthetic.
**EXIF:** `title=ANC vs ENC vs Transparency Mode Difference | desc=Understanding earbud noise cancellation technologies | keywords=anc,enc,transparency mode,noise cancellation,earbuds,egypt`

### 49. `bluetooth-speaker-office-home-2000-egp`
**Prompt:** Lifestyle product photography of cylindrical unbranded Bluetooth speaker on minimalist home office desk beside laptop, notebook, and coffee cup. Modern Cairo apartment aesthetic with plants in soft background. Soft natural daylight from window. Productive workspace mood with warm tones.
**EXIF:** `title=Bluetooth Speaker for Office and Home Under 2000 EGP | desc=Best mid-range speakers for productivity and home use | keywords=bluetooth speaker,office,home,2000 egp,egypt,budget`

### 50. `on-ear-vs-over-ear-vs-in-ear-headphones`
**Prompt:** Studio product photography of three distinct headphone types arranged in horizontal row on light marble surface: in-ear true wireless buds (left), on-ear compact headphones (center), over-ear premium headphones (right). All in matching matte black finish for consistency. Even diffused studio lighting from above. Editorial form-factor comparison aesthetic.
**EXIF:** `title=On-Ear vs Over-Ear vs In-Ear Headphones | desc=Which headphone type suits your long work hours | keywords=on-ear,over-ear,in-ear,headphones,comparison,egypt`

### 51. `soundcore-earbuds-under-1000-egp-students`
**Prompt:** Lifestyle flat lay top-down of student college essentials on natural wood study desk: unbranded wireless earbuds in case, smartphone, notebook with pen, coffee cup, textbook corner. Warm casual student aesthetic. Soft natural window daylight. Egyptian university student life mood.
**EXIF:** `title=Best Soundcore Earbuds Under 1000 EGP for Students | desc=Budget wireless earbuds for Egyptian students | keywords=soundcore,earbuds,students,under 1000 egp,budget,egypt`

### 52. `bluetooth-earbud-one-side-only-working`
**Prompt:** Macro product photography of single unbranded wireless earbud held between fingertips, with matching empty charging case slightly out-of-focus in background. Soft warm bokeh in background. Sharp focus on earbud detail. Slightly somber troubleshooting mood. Educational repair aesthetic.
**EXIF:** `title=Bluetooth Earbud Working in One Side Only — Fix | desc=Solving single-side earbud failure before replacement | keywords=earbud one side,not working,fix,troubleshoot,egypt`

### 53. `joyroom-vs-apple-watch-se-5x-price`
**Prompt:** Editorial product photography of two unbranded smartwatches side by side on dark slate surface. LEFT: budget Android-style smartwatch with rectangular face. RIGHT: premium Apple-style smartwatch with rounded rectangular face. Both displaying generic health metrics on screens. Cool studio lighting from upper-left. Wearable tech comparison aesthetic.
**EXIF:** `title=Joyroom Smartwatch vs Apple Watch SE Egypt | desc=Budget vs premium smartwatch worth the price difference | keywords=joyroom,apple watch se,smartwatch,comparison,budget,egypt`

### 54. `sports-smart-watch-under-1500-egp-egypt`
**Prompt:** Lifestyle product photography of rugged unbranded sports smartwatch with silicone strap on athletic person's wrist (mostly out of frame), screen displaying running statistics generic UI. Outdoor Egyptian urban setting background defocused with hint of greenery. Bright morning daylight. Active lifestyle aesthetic.
**EXIF:** `title=Sports Smart Watch Under 1500 EGP Egypt | desc=Best fitness-focused smartwatches in budget range | keywords=sports smartwatch,fitness,under 1500 egp,running,egypt`

### 55. `smartwatch-iphone-samsung-cross-compatibility`
**Prompt:** Lifestyle product photography of single unbranded smartwatch resting between two unbranded smartphones (Android-style and iPhone-style) on light wood surface, suggesting cross-platform compatibility. Subtle sync arrow visualizations between devices in soft cyan. Clean editorial aesthetic with soft natural lighting.
**EXIF:** `title=Smartwatch Compatible with iPhone and Samsung Galaxy | desc=Cross-platform smartwatches for mixed device users | keywords=smartwatch,cross compatibility,iphone,samsung galaxy,egypt`

### 56. `smart-watch-elderly-fall-detection-health`
**Prompt:** Warm lifestyle photography of elderly hand wearing unbranded smartwatch, screen displaying heart rate and emergency icon. Comfortable Egyptian home interior with traditional textiles slightly visible in soft background. Subtle gentle warm lighting from window. Healthcare aesthetic with dignity and care mood.
**EXIF:** `title=Smart Watch for Elderly — Fall Detection Health | desc=Essential health features for senior smartwatch users | keywords=smartwatch elderly,fall detection,blood pressure,seniors,egypt`

### 57. `smartwatch-battery-quick-drain-5-solutions`
**Prompt:** Studio product photography of five identical unbranded smartwatches in a clean horizontal row, each displaying different battery levels (10%, 30%, 50%, 70%, 95%). All on light gray seamless background. Educational visualization aesthetic. Even soft studio lighting from above. Clean comparison composition.
**EXIF:** `title=Smartwatch Battery Quick Drain — 5 Solutions | desc=Extending smartwatch battery life with proven methods | keywords=smartwatch battery,quick drain,battery life,solutions,egypt`

### 58. `anker-vs-joyroom-vs-baseus-value-egypt`
**Prompt:** Editorial product photography arrangement of three premium-looking unbranded power chargers in clean geometric triangle composition on dark surface. Each in different premium finish (matte black, brushed silver, deep navy blue). Dramatic side lighting creating depth and shadow play. Competitive tech comparison aesthetic.
**EXIF:** `title=Anker vs Joyroom vs Baseus — Best Value Egypt | desc=Three top accessory brands compared for Egyptian buyers | keywords=anker,joyroom,baseus,value,comparison,egypt`

### 59. `apple-accessories-egypt-availability-pricing`
**Prompt:** Atmospheric editorial photography of nearly empty electronics retail shelves in Cairo store, with only ghost outlines and price tags where Apple-branded accessories used to be displayed. Warm shop ambient lighting with slight mystery and concerning mood. Subtle Arabic shop signage defocused. Market commentary aesthetic.
**EXIF:** `title=Why Apple Accessories Are Hard to Find in Egypt | desc=Investigating Apple accessory market availability in Egypt | keywords=apple accessories,egypt,availability,pricing,market`

### 60. `poweriq-vooc-superfast-turbopower-explained`
**Prompt:** Conceptual tech photography of single unbranded phone connected to charger with cable, with multiple colored holographic charging protocol indicators floating above as subtle ghost graphics: blue PowerIQ, orange VOOC, purple SuperFast, green TurboPower. Dark gradient technical background with cool ambient glow. Educational tech infographic aesthetic.
**EXIF:** `title=PowerIQ VOOC SuperFast TurboPower Explained | desc=Understanding all major fast charging protocols | keywords=poweriq,vooc,superfast charge,turbopower,charging protocols,egypt`

### 61. `gan-iii-vs-gan-ii-chargers-upgrade-worth-it`
**Prompt:** Editorial cutaway-style product photography of two unbranded GaN chargers in split-view composition showing internal chip architecture. LEFT: GaN II chip with subtle aged appearance and warmer color cast. RIGHT: GaN III chip with cleaner modern architecture and cooler tones. Both shown from above with translucent housing. Technical educational aesthetic.
**EXIF:** `title=GaN III vs GaN II Chargers — Upgrade Worth It | desc=Technology generation comparison for GaN chargers | keywords=gan iii,gan ii,charger upgrade,technology,egypt`

### 62. `qi2-magsafe-wireless-charging-future-egypt`
**Prompt:** Conceptual product photography of unbranded smartphone floating above circular wireless charging pad, with magnetic field lines visualized in soft cyan glow connecting them. Dark gradient background suggesting future tech. Futuristic premium tech demonstration aesthetic. Sharp focus on charging pad surface.
**EXIF:** `title=Qi2 and MagSafe — Wireless Charging Future Egypt | desc=Next generation wireless charging standards explained | keywords=qi2,magsafe,wireless charging,future,egypt`

### 63. `usb-pd-3-1-240w-when-need-it-supports`
**Prompt:** Lifestyle product photography of high-end unbranded gaming laptop being charged via thick USB-C cable connected to compact GaN power source. Power meter floating visualization showing 240W flowing as subtle energy stream particles. Gaming desk environment with RGB ambient backlighting. Demonstration tech aesthetic.
**EXIF:** `title=USB-PD 3.1 240W — When You Need It and Who Supports | desc=Next-gen USB Power Delivery standard explained | keywords=usb-pd 3.1,240w,power delivery,gaming laptop,egypt`

### 64. `bluetooth-5-4-vs-5-3-vs-5-0-real-difference`
**Prompt:** Editorial conceptual photography of single unbranded smartphone at center with three concentric range circles emanating outward, each progressively wider and in different cool tones suggesting Bluetooth signal coverage growth (5.0 smallest, 5.3 medium, 5.4 largest). Dark technical background. Educational tech infographic aesthetic.
**EXIF:** `title=Bluetooth 5.4 vs 5.3 vs 5.0 Real Difference | desc=Bluetooth version comparison for everyday use | keywords=bluetooth 5.4,5.3,5.0,version comparison,wireless,egypt`

### 65. `anker-activeshield-2-0-battery-protection-real`
**Prompt:** Editorial cutaway-style product photography of generic premium unbranded power bank with translucent housing showing internal 9-layer protection structure visualized as subtle illuminated layers in different cool tones (blue/teal/cyan). Technical educational aesthetic. Studio lighting emphasizing internal architectural detail.
**EXIF:** `title=Anker ActiveShield 2.0 Battery Protection Explained | desc=How ActiveShield protects batteries and devices | keywords=anker,activeshield 2.0,battery protection,9 layers,egypt`

### 66. `phone-heating-during-charging-normal-or-danger`
**Prompt:** Conceptual product photography of unbranded smartphone connected to charger via cable, with subtle thermal gradient overlay showing heat zones (cool blue in safe zones, warning yellow/orange near battery area). Dark gradient background. Diagnostic educational aesthetic with technical mood.
**EXIF:** `title=Phone Heating During Charging — Normal or Danger | desc=Understanding safe vs dangerous charging temperatures | keywords=phone heating,charging,temperature,safety,egypt`

### 67. `battery-drain-after-ios-android-update-charger`
**Prompt:** Editorial concept photography of unbranded smartphone screen displaying battery percentage in red dropping rapidly, with subtle "update installed" notification visible at top. Concerned dim ambient lighting around device. Diagnostic troubleshooting aesthetic with cautionary mood.
**EXIF:** `title=Battery Drain After iOS Android Update — Charger Issue | desc=Is your charger the real cause of post-update drain | keywords=battery drain,ios update,android update,charger,egypt`

### 68. `chargers-hajj-umrah-saudi-arabia-essentials`
**Prompt:** Flat lay top-down composition of Hajj/Umrah travel essentials neatly arranged on prayer rug: power bank, compact wall charger, USB-C cables, unbranded smartphone, prayer beads (subha), open Quran, white ihram fabric corner visible. Warm reverent natural daylight from window. Religious travel preparation aesthetic with cultural dignity.
**EXIF:** `title=Chargers and Accessories for Hajj and Umrah | desc=Essential tech kit for Egyptian pilgrims to Saudi Arabia | keywords=hajj,umrah,saudi arabia,chargers,travel,egypt`

### 69. `black-friday-egypt-real-deals-vs-fake-discounts`
**Prompt:** Editorial concept photography of shopping cart filled with unbranded electronics boxes, with floating price tags showing crossed-out prices and discount stamps — some clearly genuine and some suspiciously inflated. Dramatic shopping aesthetic with cautionary mood. Bright but slightly dramatic lighting suggesting deal-hunting tension.
**EXIF:** `title=Black Friday Egypt — Real Deals vs Fake Discounts | desc=Spotting genuine sales during Egyptian Black Friday | keywords=black friday,egypt,deals,fake discounts,shopping`

### 70. `back-to-school-university-accessories-bag-egypt`
**Prompt:** Flat lay top-down photography of open student backpack contents arranged on wood desk: slim laptop, notebook, pens, unbranded smartphone, power bank, USB-C cable, wireless earbuds case, water bottle, textbook. Warm September back-to-school aesthetic. Natural window light from upper-left. Egyptian student preparation mood.
**EXIF:** `title=Back to School University Accessories Bag Egypt | desc=Complete tech kit for Egyptian students returning to school | keywords=back to school,university,accessories,students,egypt`

### 71. `iphone-16-pro-max-vs-iphone-17-pro-max-charger-upgrade`
**Prompt:** Studio product photography of two generations of unbranded iPhone-style devices lying flat side by side on white seamless background, with one premium charger and one USB-C cable centered between them. Subtle generation difference visible in design language (camera bump variation). Editorial Apple ecosystem comparison aesthetic.
**EXIF:** `title=iPhone 16 Pro Max vs iPhone 17 Pro Max — Charger Upgrade | desc=Worth upgrading your charger when changing iPhone generation | keywords=iphone 16 pro max,iphone 17 pro max,charger upgrade,comparison,egypt`

### 72. `samsung-galaxy-a55-a75-charger-affordable-alternatives`
**Prompt:** Lifestyle product photography of mid-range unbranded Samsung-style smartphone on textured concrete surface with compact wall charger and braided USB-C cable arranged geometrically. Cool natural daylight from above. Modern budget Android aesthetic with subtle minimalist composition.
**EXIF:** `title=Samsung Galaxy A55 A75 Chargers — Affordable Alternatives | desc=Best chargers for Samsung A-series budget Android phones | keywords=samsung a55,samsung a75,charger,affordable,android,egypt`

### 73. `xiaomi-redmi-note-14-accessories-students-budget`
**Prompt:** Flat lay composition of unbranded Xiaomi-style budget smartphone with affordable charging accessories spread on natural light wood study desk: wall charger, USB-C cable, small power bank, textbook corner, pencil and notebook. Warm studious window lighting. Egyptian student life aesthetic.
**EXIF:** `title=Xiaomi Redmi Note 14 Accessories for Students Budget | desc=Affordable charger cable and power bank for Xiaomi users | keywords=xiaomi redmi note 14,accessories,student,budget,egypt`

### 74. `oppo-reno-12-supervooc-charger-original-vs-alternative`
**Prompt:** Premium product photography of unbranded Oppo-style smartphone with sleek design connected to proprietary fast charger (visible thick USB-C cable). Dark moody background with subtle accent lighting from upper right. Branded ecosystem aesthetic with premium feel.
**EXIF:** `title=Oppo Reno 12 SuperVOOC Charger — Original vs Alternative | desc=Do you really need Oppo official SuperVOOC charger | keywords=oppo reno 12,supervooc,charger,original,alternative,egypt`

### 75. `realme-c-series-budget-charger-cable-300-egp`
**Prompt:** Lifestyle flat lay of unbranded budget Android phone (Realme-style design) with affordable charging accessories spread on natural fabric surface: basic wall charger, simple USB-C cable. Warm honest budget aesthetic. Soft natural daylight from above. Practical no-frills product photography.
**EXIF:** `title=Realme C Series Budget Charger Under 300 EGP | desc=Ultra-budget chargers and cables for Realme C users | keywords=realme c series,charger,cable,budget,300 egp,egypt`

### 76. `honor-x-series-chargers-vs-samsung-xiaomi`
**Prompt:** Studio product photography of three mid-range unbranded Android smartphones (Honor-style, Samsung-style, Xiaomi-style) arranged in triangle composition on light gray seamless surface. Each with subtle design language differentiation. Even soft studio lighting from above. Competitive mid-range comparison aesthetic.
**EXIF:** `title=Honor X Series Chargers vs Samsung and Xiaomi | desc=Honor X series challenging the Egyptian mid-range market | keywords=honor x series,samsung,xiaomi,charger,mid range,egypt`

### 77. `ipad-pro-m4-vs-ipad-air-charger-requirements`
**Prompt:** Studio product photography of two unbranded iPad-style tablets lying flat side by side on dark wood surface (larger Pro on left, smaller Air on right), with corresponding chargers and USB-C cables arranged between them. Professional creative workspace aesthetic. Soft natural daylight from above.
**EXIF:** `title=iPad Pro M4 vs iPad Air — Charger Requirements | desc=Which iPad needs more powerful charging gear | keywords=ipad pro m4,ipad air,charger,professional,egypt`

### 78. `macbook-air-m3-pro-m4-gan-chargers-alternatives`
**Prompt:** Lifestyle product photography of two unbranded MacBook-style laptops (slim Air and larger Pro) on wood desk with compact GaN chargers next to each, showing dramatic size reduction vs traditional bricks lying in background for comparison. Professional workspace aesthetic with cool natural daylight from window.
**EXIF:** `title=MacBook Air M3 Pro M4 GaN Chargers — Cheaper Alternatives | desc=GaN charger alternatives at half the official price | keywords=macbook air m3,macbook pro m4,gan charger,alternatives,egypt`

### 79. `new-driver-car-accessories-essentials-beginners`
**Prompt:** Lifestyle dashboard photography from new driver perspective, with simple essential accessories laid out: basic phone mount, USB-C charger, small dashcam (subtle). Egyptian driving context with car interior visible. Reassuring beginner-friendly aesthetic with warm natural lighting.
**EXIF:** `title=New Driver Car Accessories Essentials Beginners Egypt | desc=Starter accessory kit for new drivers in Egypt | keywords=new driver,car accessories,essentials,beginners,egypt`

### 80. `chargers-ramadan-night-long-charging-sessions`
**Prompt:** Warm atmospheric lifestyle photography of unbranded smartphone charging on wooden table beside traditional Ramadan lantern (fanous), dates plate, prayer beads. Soft Ramadan night lighting with golden warm tones from fanous. Cultural respectful Ramadan ambiance aesthetic.
**EXIF:** `title=Chargers for Ramadan Night Long Charging Sessions | desc=Best chargers for Ramadan long overnight charging cycles | keywords=ramadan,night charging,chargers,fanous,egypt`

### 81. `phone-charging-during-prayer-fasting-battery-safe`
**Prompt:** Subtle conceptual photography of unbranded smartphone charging on prayer rug edge with Quran and prayer beads (subha) nearby. Soft natural late afternoon Asr light from window. Reverent quiet aesthetic with religious dignity and serene mood.
**EXIF:** `title=Phone Charging During Prayer and Fasting — Battery Safe | desc=Spiritual context for daily charging habits | keywords=phone charging,prayer,fasting,battery safety,egypt`

### 82. `doctor-hospital-power-bank-12-hour-shift`
**Prompt:** Lifestyle product photography of medical scrubs pocket with stethoscope visible and compact black power bank tucked beside it, hand of healthcare worker partially visible. Hospital corridor softly defocused in cool blue background. Professional healthcare aesthetic with practical mood and shallow depth of field.
**EXIF:** `title=Doctor Hospital Power Bank for 12-Hour Shifts | desc=Long-lasting power banks for Egyptian medical professionals | keywords=doctor,hospital,power bank,12 hours,medical,egypt`

### 83. `content-creator-camera-laptop-phone-one-power-bank`
**Prompt:** Lifestyle flat lay of content creator's mobile production setup: unbranded mirrorless camera, slim laptop, smartphone, large high-capacity power bank in center connected to all three via cables in elegant organized arrangement. Studio backdrop slightly defocused in background. Professional creator workspace aesthetic.
**EXIF:** `title=Content Creator Camera Laptop Phone — One Power Bank | desc=Mobile production powered by single high-capacity power bank | keywords=content creator,camera,laptop,phone,power bank,egypt`

### 84. `tuktuk-motorcycle-delivery-driver-fast-charging`
**Prompt:** Authentic Egyptian street photography of motorbike delivery driver's handlebar mount with unbranded smartphone displaying generic delivery app, USB-C charger connected to power source via cable. Cairo street background softly defocused. Realistic gig economy aesthetic with morning daylight.
**EXIF:** `title=Tuk-Tuk Motorcycle Delivery Driver Fast Charging | desc=Charging solutions for Egyptian delivery and gig workers | keywords=tuktuk,motorcycle delivery,fast charging,gig economy,egypt`

### 85. `talabat-mrsool-delivery-driver-phone-holder-charger`
**Prompt:** Lifestyle photography of motorbike delivery driver's handlebar setup with phone mount holding unbranded smartphone displaying generic delivery app UI, weatherproof phone holder, USB-C charging cable. Bright Egyptian afternoon street setting visible in soft background. Realistic gig worker aesthetic.
**EXIF:** `title=Talabat Mrsool Delivery Driver Phone Holder Charger | desc=Best gear for Egyptian food delivery drivers | keywords=talabat,mrsool,delivery driver,phone holder,charger,egypt`

### 86. `anker-solix-solar-power-bank-safari-camping-egypt`
**Prompt:** Adventure lifestyle photography of unfolded solar panel on rocky desert ground in Egyptian Western Desert, connected via cable to power bank charging in golden late afternoon sun. Sahara landscape with rock formations in soft background. Travel adventure aesthetic with warm sunset tones and dust particles in light beams.
**EXIF:** `title=Anker Solix Solar Power Bank — Safari and Camping Egypt | desc=Solar charging for Egyptian desert adventures | keywords=anker solix,solar power bank,safari,camping,western desert,egypt`

### 87. `home-security-cameras-power-backup-outage`
**Prompt:** Lifestyle product photography of small unbranded home security camera mounted on wall corner with backup battery pack visible beside it. Modern Egyptian home interior corridor. Soft natural daylight. Smart home security aesthetic with clean modern composition.
**EXIF:** `title=Home Security Cameras with Power Backup Egypt | desc=Battery backup for cameras during Egyptian power outages | keywords=security cameras,power backup,home,outage,smart home,egypt`

### 88. `electric-scooter-charging-accessories-egypt`
**Prompt:** Lifestyle photography of modern electric scooter parked beside charging station setup, with portable charger and cable extending to scooter charging port. Modern Cairo urban environment background slightly defocused. Sustainable transportation aesthetic with bright midday daylight.
**EXIF:** `title=Electric Scooter Charging Accessories Guide Egypt | desc=Essential charging gear for Egyptian e-scooter users | keywords=electric scooter,charging,accessories,urban,egypt`

### 89. `drone-power-bank-cinematography-photographers`
**Prompt:** Professional gear flat lay photography of unbranded drone with controller, two spare batteries, and large capacity power bank on outdoor location with rocky terrain. Egyptian desert or coastal landscape suggested in soft background. Professional aerial cinematography aesthetic with golden hour lighting.
**EXIF:** `title=Drone Power Bank for Cinematography Photographers | desc=Highest capacity power banks for Egyptian drone operators | keywords=drone,power bank,cinematography,photographer,egypt,aerial`

### 90. `cpap-medical-power-bank-egypt-safety-first`
**Prompt:** Sensitive lifestyle product photography of CPAP medical machine on bedside table connected via cable to medical-grade large capacity unbranded power bank as backup. Bedroom setting with warm dim ambient lighting suggesting nighttime. Healthcare aesthetic with care, dignity, and reassuring mood.
**EXIF:** `title=CPAP Medical Power Bank Egypt — Safety First | desc=Medical-grade backup power for Egyptian CPAP users | keywords=cpap,medical power bank,safety,health,backup,egypt`

### 91. `lithium-ion-vs-lithium-polymer-power-bank-safety`
**Prompt:** Editorial technical product photography of two battery cells displayed side by side on dark slate surface: cylindrical lithium-ion cell on left, flat pouch-style lithium-polymer cell on right. Subtle technical labeling overlay in cool tones. Sharp macro detail showing cell construction differences. Educational technical aesthetic.
**EXIF:** `title=Lithium-Ion vs Lithium-Polymer Power Bank Safety | desc=Battery chemistry safety comparison for buyers | keywords=lithium ion,lithium polymer,battery chemistry,safety,power bank`

### 92. `pass-through-charging-power-bank-myth-truth`
**Prompt:** Conceptual product photography of unbranded power bank with two cables connecting simultaneously: one going IN from wall outlet (charging the bank itself) and one going OUT to phone (charging device). Subtle directional flow visualization in soft glowing arrows. Educational technical aesthetic on dark slate surface.
**EXIF:** `title=Pass-Through Charging Power Bank — Myth or Truth | desc=Charging power bank and devices simultaneously explained | keywords=pass through charging,power bank,simultaneous,charging,egypt`

### 93. `clean-usb-c-port-safely-phone-no-damage`
**Prompt:** Extreme macro photography of soft natural-bristle brush gently cleaning USB-C port of unbranded smartphone. Sharp focus on port detail showing internal pins. Subtle dust particles visible being removed in soft light beam. Clean technical maintenance aesthetic with cool studio lighting.
**EXIF:** `title=Clean USB-C Port Safely on Phone Without Damage | desc=Proper cleaning technique for charging ports | keywords=usb-c cleaning,phone port,maintenance,safe cleaning,egypt`

### 94. `fast-charging-not-working-original-charger-7-causes`
**Prompt:** Editorial concept photography of unbranded smartphone screen displaying slow charging indicator (single bar, no lightning bolt) while connected to authentic original charger via cable. Diagnostic mood with subtle yellow warning visualization. Troubleshooting tech aesthetic on dark surface.
**EXIF:** `title=Fast Charging Not Working — 7 Hidden Causes | desc=Why your original charger fails to charge fast | keywords=fast charging,not working,original charger,causes,fixes,egypt`

### 95. `charger-spark-outlet-when-dangerous-replace`
**Prompt:** Dramatic atmospheric photography of wall outlet with small electric spark visible (subtle, controlled) as charger plug is being inserted, captured in dimly lit room with safety warning mood. Cautionary electrical safety aesthetic. Educational warning tone with sharp focus on spark moment.
**EXIF:** `title=Charger Spark in Outlet — When Dangerous and Replace | desc=When charging spark is normal vs warning sign | keywords=charger spark,outlet,electrical safety,dangerous,replace,egypt`

### 96. `phone-battery-needs-replacement-5-signs`
**Prompt:** Concept product photography of unbranded smartphone showing battery health indicator screen with replacement icon, beside it a fresh new replacement battery suggesting upcoming swap. Tech repair aesthetic with educational mood. Clean studio lighting on light surface.
**EXIF:** `title=Phone Battery Needs Replacement — 5 Warning Signs | desc=Spotting battery degradation before complete failure | keywords=phone battery,replacement,warning signs,degradation,egypt`

### 97. `phone-charging-cold-winter-alexandria-safety`
**Prompt:** Atmospheric winter lifestyle photography of unbranded smartphone charging on table near foggy Alexandria window, with light rain visible outside and condensation patterns on glass. Cool blue tones throughout with subtle warm interior light. Cozy indoor winter scene with charging context.
**EXIF:** `title=Phone Charging in Cold Winter Alexandria — Safety | desc=Charging safety in cold Egyptian winter conditions | keywords=phone charging,cold weather,winter,alexandria,safety,egypt`

### 98. `surge-protector-voltage-spike-egypt-electrical`
**Prompt:** Editorial product photography of premium unbranded surge protector strip with multiple plugs connected, subtle voltage waveform visualization showing spike being absorbed and clamped by protector. Professional electrical accessory aesthetic with technical cool blue tones. Clean studio lighting.
**EXIF:** `title=Surge Protector for Voltage Spike — Egyptian Electrical | desc=Protecting devices from Egyptian voltage fluctuations | keywords=surge protector,voltage spike,electrical,egypt,protection`

### 99. `2-port-vs-4-port-vs-6-port-charger-family`
**Prompt:** Editorial product photography arrangement of three unbranded GaN chargers in escalating port count on light marble surface: small 2-port (left), medium 4-port (center), larger 6-port (right). All in matching matte white finish for consistency. Family devices radiating around them subtly suggesting family use case. Even studio lighting.
**EXIF:** `title=2-Port vs 4-Port vs 6-Port Charger for Family | desc=Choosing the right multi-port charger for Egyptian families | keywords=2 port,4 port,6 port,charger,family,egypt`

### 100. `anker-soundcore-vs-jbl-vs-bose-speakers-egypt`
**Prompt:** Editorial studio product photography of three unbranded Bluetooth speakers in triangle composition on dark slate surface: cylindrical (Anker-style), rectangular (JBL-style), rounded oval (Bose-style), all in matching matte black finish. Subtle sound wave visualizations emanating from each in different colors (cyan, orange, magenta). Competitive audio comparison aesthetic.
**EXIF:** `title=Anker Soundcore vs JBL vs Bose Speakers Egypt | desc=Three premium speaker brands compared in Egyptian market | keywords=anker soundcore,jbl,bose,bluetooth speakers,comparison,egypt`

### 101. `authentic-charger-vs-3-fake-chargers-roi-math`
**Prompt:** Conceptual editorial photography of one premium unbranded charger on left side of simple balance scale, against three smaller cheaper-looking generic chargers on right side. Clean light gray background. Educational comparison aesthetic with subtle math/balance metaphor. Soft studio lighting from above.
**EXIF:** `title=Authentic Charger vs 3 Fakes — ROI Math Calculation | desc=When buying original becomes mathematically cheaper | keywords=authentic vs fake,charger,roi,math,value,egypt`

---

## 📦 ملحق: مولّد C2PA Manifest (JSON Template)

> استخدم هذا الـ template واستبدل `{slug}` و `{title}` و `{publish_date}` بقيم المقال:

```json
{
  "claim_generator": "CairoVolt-CMS/1.0 (Nano-Banana-Pipeline)",
  "title": "{title}",
  "creator": {
    "@type": "Organization",
    "name": "CairoVolt Editorial Team",
    "url": "https://cairovolt.com"
  },
  "actions": [
    {
      "action": "c2pa.created",
      "softwareAgent": "Gemini 2.5 Flash Image (Nano Banana)",
      "digitalSourceType": "trainedAlgorithmicMedia",
      "when": "{generation_iso_timestamp}"
    },
    {
      "action": "c2pa.color_adjustments",
      "softwareAgent": "cwebp v1.3 -q 85 -resize 1200 630"
    },
    {
      "action": "c2pa.metadata",
      "softwareAgent": "exiftool v12.x"
    },
    {
      "action": "c2pa.published",
      "softwareAgent": "CairoVolt Next.js CMS",
      "when": "{publish_date}T00:00:00Z"
    }
  ],
  "assertions": {
    "stds.schema-org.CreativeWork": {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "name": "{title}",
      "url": "https://cairovolt.com/images/blog/posts/{slug}.webp",
      "publisher": {
        "@type": "Organization",
        "name": "CairoVolt",
        "url": "https://cairovolt.com"
      },
      "datePublished": "{publish_date}",
      "license": "https://cairovolt.com/license/editorial",
      "copyrightHolder": "CairoVolt"
    }
  }
}
```

---

## 🚀 سكريبت Batch Generation (مثال bash)

```bash
#!/bin/bash
# generate-blog-images.sh — توليد صور المقالات دفعة واحدة

GLOBAL_DIRECTIVE="ULTRA CLEAN editorial composition. NO brand logos, NO text overlays, NO watermarks, NO visible model numbers, NO QR codes, NO barcodes. Photorealistic product photography quality. Sharp focus. Soft cinematic lighting. Aspect ratio 1.91:1."

OUTPUT_DIR="public/images/blog/posts"
mkdir -p "$OUTPUT_DIR"

# لكل مقال في cairovolt-image-prompts.md:
# 1. استخرج: slug + prompt + exif
# 2. أرسل لـ Gemini API
# 3. حقن EXIF + C2PA
# 4. احفظ في $OUTPUT_DIR

# (الحلقة الكاملة تعتمد على parser للملف — استخدم jq لو حوّلت لـ JSON)
```

---

## ✅ Checklist قبل النشر

- [ ] الصورة بأبعاد 1200×630 (OG image)
- [ ] صيغة WebP بجودة 85
- [ ] EXIF محقون بـ Artist + Copyright + Description + Keywords
- [ ] C2PA Manifest موقّع بالـ defaults + per-image overrides
- [ ] **لا توجد بصمات مرئية** (logos / text / watermarks / model numbers)
- [ ] SynthID مفعّل (افتراضي من Nano Banana — invisible)
- [ ] الملف موجود في `public/images/blog/posts/{slug}.webp`
- [ ] الـ slug يطابق slug المقال في `src/data/blog/{slug}.ts`
- [ ] الـ `coverImage` في BlogArticle يشير للمسار الصحيح

---

## 📚 المراجع

| المورد | الرابط |
|--------|--------|
| Nano Banana (Gemini 2.5 Flash Image) | https://ai.google.dev/gemini-api/docs/image-generation |
| C2PA Specification | https://c2pa.org/specifications/specifications/2.1/index.html |
| c2patool CLI | https://github.com/contentauth/c2patool |
| ExifTool | https://exiftool.org/ |
| cwebp (WebP) | https://developers.google.com/speed/webp/docs/cwebp |
| SynthID (Google) | https://deepmind.google/technologies/synthid/ |
| دليل كتابة التدوينات | [cairovolt-blog.md](cairovolt-blog.md) |
