// Details for: joyroom-ft3-smartwatch (Joyroom FT3 / JR-FT3 — Fit-Life smartwatch)
// Lab sheet: CV-SW-JRFT3-001 — §7.8 accessory gold-depth + battery/BT practical tests (2026-07-24).
// CRITICAL: HR / SpO2 / BP / sleep = consumer wellness estimates ONLY — not a medical device.
// IP68 = vendor-stated; CairoVolt does NOT invent submersion lab results (§7.8 F / protocol).
// Do NOT confuse with JR-FT3 Pro marketing that claims on-watch Bluetooth calling — our JR-FT3
// sample (and CairoVolt product FAQ) has call notifications / reject-mute only, no mic for BT calls.
import type { ProductDetail } from './_types';

export const joyroom_ft3_smartwatch_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Battery (sample CV-SW-JRFT3-001, defined daily profile): 4 days 7 h from 100%→auto-off with BT always paired, ~90 screen wakes/day, HR every 10 min, notifications on — under the common vendor “~5 days typical” class, not a foggy “week+” claim. Magnetic charge 0→100% = 1 h 58 min (Timer+; Anker A2147 5V USB-C path via included magnetic puck; FNB58 ~4.8–5.1 V / ~0.35–0.48 A bulk).',
            'Accuracy honesty: HR / SpO2 / BP / sleep tiles are consumer wellness estimates ONLY — NOT medical measurements, NOT diagnostic, NOT a substitute for a clinic cuff / pulse oximeter / sleep study. No ECG on this SKU. We did NOT publish clinical SpO2 or BP accuracy vs instruments. Not a medical device.',
            'Egypt fit (~1092 EGP): AUC/GUC/Cairo Uni / Smart Village wrist for WhatsApp + call banners; Metro Line 3 / microbus commute + gym / Corniche walk modes we exercised; 40.1 g as worn (Kkmoon) for July heat. IPS noon glare washes outdoors — shade or hand-cup. CairoVolt independent store warranty.',
            'SKU honesty: carton MPN JR-FT3 · store SKU JW02 · GTIN 6956116714017. Call notify/reject-mute only on this sample — NO on-watch BT calling mic (≠ some FT3 Pro calling ads). Smart Time Pro via sample QR (iPhone 13 iOS 17.5 + Galaxy A54 Android 14). Outdoor Run distance = phone-GPS-assisted when phone present — not Ultra dual-frequency GNSS. IP68 = vendor-stated only; NO CairoVolt submersion lab (§7.8 / speaker-style IP cite-only rule).',
            'Recall (2026-07-24): no Joyroom / CPSC hit for JR-FT3 / JW02 on cpsc.gov + Joyroom notices. Anker power-bank recalls (A1257/A1263/A1647/A1652/A1681/A1689 class) do NOT apply to Joyroom watches. Single retail unit — verify printed codes on your carton.',
        ],
        ar: [
            'البطارية (عيّنة CV-SW-JRFT3-001، ملف يومي معرّف): 4 أيام و7 ساعات من 100% حتى الإطفاء التلقائي مع بلوتوث مقترن دائمًا، ~90 إيقاظ شاشة/يوم، نبض كل 10 دقائق، إشعارات مفعّلة — تحت فئة المصنّع الشائعة «~5 أيام استخدام عادي»، وليس ادعاء ضبابي «أسبوع+». الشحن المغناطيسي 0→100% = 1 س 58 د (Timer+؛ مسار USB-C 5V من Anker A2147 عبر القرص المغناطيسي المرفق؛ FNB58 ~4.8–5.1 فولت / ~0.35–0.48 أمبير في الشحن الكبير).',
            'أمانة الدقة: بلاطات النبض / SpO2 / الضغط / النوم تقديرات عافية للمستهلك فقط — ليست قياسات طبية، وليست تشخيصًا، وليست بديلاً عن كُمّ عيادي / مقياس أكسجين / دراسة نوم. لا ECG على هذا الموديل. لم ننشر دقة SpO2 أو ضغط سريرية مقابل أجهزة. ليست جهازًا طبيًا.',
            'مصر (~1092 جنيه): معصم AUC/GUC/جامعة القاهرة / القرية الذكية للافتات واتساب والمكالمات؛ تنقّل مترو خط 3 / ميكروباص + أوضاع جيم / مشي كورنيش مارسناها؛ 40.1 ج كما تُرتدى (Kkmoon) لحر يوليو. وهج ظهيرة IPS يغسل في الخارج — ظل أو تظليل باليد. ضمان متجر CairoVolt المستقل.',
            'أمانة الموديل: الكرتون MPN JR-FT3 · SKU المتجر JW02 · GTIN 6956116714017. إشعار مكالمة/رفض-كتم فقط على هذه العيّنة — بلا مايك مكالمات بلوتوث من الساعة (≠ بعض إعلانات مكالمات FT3 Pro). Smart Time Pro عبر QR العيّنة (iPhone 13 iOS 17.5 + Galaxy A54 Android 14). مسافة الركض الخارجي بمساعدة GPS الهاتف عند وجوده — ليست GNSS ثنائية التردد فئة Ultra. IP68 = بيان مصنّع فقط؛ بلا مختبر غمر من CairoVolt (قاعدة الاستشهاد بالـ IP فقط).',
            'الاستدعاء (2026-07-24): لا نتيجة Joyroom / CPSC لـ JR-FT3 / JW02 على cpsc.gov + إشعارات جوي روم. استدعاءات باوربانك Anker (فئة A1257/A1263/A1647/A1652/A1681/A1689) لا تنطبق على ساعات جوي روم. وحدة تجزئة واحدة — تحقق من الأكواد المطبوعة على كرتونك.',
        ],
    },
    localContext: {
        en:
            'CairoVolt is an independent retailer — JR-FT3 carries our store warranty. At ~1092 EGP this is the Egyptian “notifications + step count + gym modes without Apple Watch money” answer, not a clinical wearable. ' +
            'Six Cairo scenarios. RIGHT FOR: (1) STUDENT / OFFICE WRIST (AUC / GUC / Cairo University / Smart Village) — WhatsApp + call banners on the wrist so the phone stays in a bag during lectures or meetings; our 3-day wear notes: silicone strap stayed comfortable in AC offices, wiped clean after Metro sweat. ' +
            '(2) GYM / CORNICHE WALK — vendor lists ~20 sports modes; we exercised Outdoor Walk, Outdoor Run, Indoor Cycle, and Elliptical; distance is phone-GPS-assisted when the phone is present — do not expect Ultra-class dual-frequency GPS. ' +
            '(3) CAIRO SUMMER COMMUTE (Metro Line 3 / microbus / Uber) — light body (~40 g with strap measured) and IP68 vendor rating for rain/splash/sweat; wipe dry before magnetic charging; hot showers/soap/pool chemicals are outside what we claim. ' +
            '(4) BUDGET FIRST SMARTWATCH — buyer who wants a big IPS face and multi-day battery without 15k+ EGP Apple/Samsung money; measured 4 d 7 h under our wake/HR/BT profile covers a work week with one mid-week top-up. ' +
            '(5) ANDROID + IPHONE HOUSEHOLD SPARE — Smart Time Pro installed on both iPhone 13 and Galaxy A54 on this sample; notification delay is phone-OS permission dependent (Android battery savers can mute the watch). ' +
            '(6) SAHEL / AIN SOKHNA WEEKEND — daylight glanceable time + steps; outdoor Cairo-sun readability was usable at max brightness but washed in direct noon glare (IPS, not OLED). ' +
            'WRONG FOR: (7) MEDICAL DIAGNOSIS / CLINIC DECISIONS — HR, SpO2, BP and sleep tiles are consumer estimates; not a medical device; do not medicate or ER-triage from the watch. ' +
            '(8) APPLE WATCH ULTRA BUYERS — no dual-frequency GPS, no dive computer, no Action Button ecosystem, no watchOS App Store, no ECG. ' +
            '(9) ECG / AFib clinical expectations — this SKU has no ECG hardware or cleared diagnostic pathway. ' +
            '(10) BUYERS EXPECTING ON-WATCH BLUETOOTH CALLING — JR-FT3 (this SKU) is call-notification / reject-mute class on our sample and product FAQ; do not buy it for mic/speaker watch calls (some “FT3 Pro” listings market calling — different marketing SKU). ' +
            'HEAT / SWEAT: Cairo July–August mean high ~35°C (WeatherSpark). After outdoor walks the strap collected salt film — rinse/wipe and dry before charging. ' +
            'AUTHENTICITY: match printed JR-FT3 / JW02 and GTIN 6956116714017 on the carton; do not assume FT3 Pro calling features from a similar photo. ' +
            'RECALL (2026-07-24): no Joyroom / CPSC recall hit for JR-FT3; Anker power-bank recalls do not apply to Joyroom watches.',
        ar:
            'CairoVolt متجر تجزئة مستقل — وJR-FT3 يحمل ضمان المتجر. عند ~1092 جنيه هذا رد مصر «إشعارات + خطوات + أوضاع جيم بلا فلوس Apple Watch»، وليس جهازًا سريريًا. ' +
            'ستة سيناريوهات قاهرية. مناسب لـ: (1) معصم طالب / مكتب (AUC / GUC / جامعة القاهرة / القرية الذكية) — لافتات واتساب ومكالمات على المعصم ليبقى الهاتف في الحقيبة؛ ملاحظات ارتداء 3 أيام: سوار السيليكون بقي مريحًا في مكاتب التكييف، ويُمسَح بعد عرق المترو. ' +
            '(2) جيم / مشي كورنيش — المصنّع يدرج ~20 وضعًا رياضيًا؛ مارسنا مشي خارجي وركض خارجي ودراجة داخلية وإليپتيكال؛ المسافة بمساعدة GPS الهاتف عند وجوده — لا تتوقع GPS ثنائي التردد فئة Ultra. ' +
            '(3) تنقّل صيف القاهرة (مترو خط 3 / ميكروباص / أوبر) — جسم خفيف (~40 ج مع السوار مقاس) وتصنيف IP68 بيان مصنّع للمطر/رذاذ/عرق؛ جفّف قبل الشحن المغناطيسي؛ الدش الساخن/الصابون/كيماويات المسبح خارج ما ندّعيه. ' +
            '(4) أول ساعة ذكية بميزانية — من يريد وجه IPS كبير وبطارية أيام بلا 15 ألف+ جنيه Apple/Samsung؛ 4 أيام و7 ساعات المقاسة تحت ملف الإيقاظ/النبض/البلوتوث تغطي أسبوع عمل مع تعبئة منتصف الأسبوع. ' +
            '(5) بيت أندرويد + آيفون — Smart Time Pro ثُبّت على iPhone 13 وGalaxy A54 في هذه العيّنة؛ تأخير الإشعار يعتمد على أذونات نظام الهاتف (موفّرات بطارية أندرويد قد تكتم الساعة). ' +
            '(6) عطلة الساحل / العين السخنة — وقت وخطوات قابلة للGlance؛ قراءة شمس القاهرة في الخارج كانت مقبولة بأقصى سطوع لكنها تغسل في وهج الظهيرة المباشرة (IPS وليست OLED). ' +
            'غير مناسب لـ: (7) التشخيص الطبي / قرارات العيادة — بلاطات النبض وSpO2 والضغط والنوم تقديرات مستهلك؛ ليست جهازًا طبيًا؛ لا تداوِ أو تُفرز للطوارئ من الساعة. ' +
            '(8) مشترو Apple Watch Ultra — بلا GPS ثنائي التردد، بلا حاسوب غوص، بلا منظومة Action Button، بلا متجر watchOS، بلا ECG. ' +
            '(9) توقعات ECG / رجفان أذيني سريرية — لا عتاد ECG ولا مسار تشخيصي معتمد على هذا الموديل. ' +
            '(10) من يتوقع مكالمات بلوتوث من الساعة — JR-FT3 (هذا الموديل) فئة إشعار مكالمة / رفض-كتم على عينتنا وFAQ المنتج؛ لا تشترِه لمكالمات بمايك/سماعة (بعض قوائم «FT3 Pro» تسوّق المكالمات — تسويق/موديل مختلف). ' +
            'الحرارة / العرق: متوسط عظمى القاهرة يوليو–أغسطس ~35°م (WeatherSpark). بعد مشي خارجي تجمّع ملح على السوار — اشطف/امسح وجفّف قبل الشحن. ' +
            'الأصالة: طابق JR-FT3 / JW02 وGTIN 6956116714017 المطبوعين على الكرتون؛ لا تفترض ميزات مكالمات FT3 Pro من صورة مشابهة. ' +
            'الاستدعاء (2026-07-24): لا نتيجة Joyroom / CPSC لـ JR-FT3؛ استدعاءات باوربانك Anker لا تنطبق على ساعات جوي روم.',
    },
    specifications: {
        'Model': {
            en: 'Joyroom FT3 Fit-Life smartwatch — MPN JR-FT3 · store SKU JW02 · GTIN 6956116714017 · ~1092 EGP',
            ar: 'ساعة جوي روم FT3 Fit-Life — MPN JR-FT3 · SKU المتجر JW02 · GTIN 6956116714017 · ~1092 جنيه',
        },
        'Display': {
            en: '1.85" HD IPS (CairoVolt product listing) — outdoor noon glare washes the panel; max brightness usable in shade',
            ar: '1.85 بوصة HD IPS (قائمة منتج CairoVolt) — وهج الظهيرة يغسل اللوحة؛ أقصى سطوع مقبول في الظل',
        },
        'Connectivity': {
            en: 'Bluetooth 5.2 (listing) — paired to phone for notifications / sync; Class-2 phone-tether range, not a standalone LTE watch',
            ar: 'بلوتوث 5.2 (القائمة) — يقترن بالهاتف للإشعارات/المزامنة؛ مدى Class-2 مربوط بالهاتف، وليست ساعة LTE مستقلة',
        },
        'Sensors (honesty)': {
            en: 'Optical HR + SpO2 + accelerometer (and BP / sleep tiles in-app) — consumer wellness estimates ONLY; NOT a medical device; no ECG',
            ar: 'نبض بصري + SpO2 + مقياس تسارع (وبلاطات ضغط/نوم في التطبيق) — تقديرات عافية للمستهلك فقط؛ ليست جهازًا طبيًا؛ بلا ECG',
        },
        'Sports modes': {
            en: 'Vendor-listed ~20 modes (customize in Smart Time Pro) — CairoVolt exercised Outdoor Walk, Outdoor Run, Indoor Cycle, Elliptical only',
            ar: '~20 وضعًا مدرجًا من المصنّع (تخصيص في Smart Time Pro) — مارست CairoVolt مشي خارجي وركض خارجي ودراجة داخلية وإليپتيكال فقط',
        },
        'Water resistance': {
            en: 'IP68 VENDOR-STATED — follow Joyroom depth/duration/water-type/drying instructions; CairoVolt did NOT run a submersion lab; resistance can diminish with wear',
            ar: 'IP68 بيان مصنّع — اتبع تعليمات جوي روم للعمق/المدة/نوع الماء/التجفيف؛ لم تُجرِ CairoVolt اختبار غمر؛ قد تتراجع المقاومة مع الاستخدام',
        },
        'Calling': {
            en: 'Call notifications + reject/mute on this JR-FT3 sample — NO microphone for on-watch Bluetooth calling (do not confuse with some FT3 Pro calling listings)',
            ar: 'إشعارات مكالمات + رفض/كتم على عيّنة JR-FT3 هذه — بلا ميكروفون لمكالمات بلوتوث من الساعة (لا تخلط مع بعض قوائم FT3 Pro للمكالمات)',
        },
        'Companion app': {
            en: 'Smart Time Pro (iOS App Store + Google Play on our sample QR/manual) — features vary by OS version, permissions, and app build; not Apple Watch / Galaxy Watch native OS',
            ar: 'Smart Time Pro (App Store + Google Play على QR/دليل عينتنا) — الميزات تختلف حسب إصدار النظام والأذونات وبناء التطبيق؛ ليست نظام Apple Watch / Galaxy Watch الأصلي',
        },
        'Battery (vendor class)': {
            en: 'Common retail sheets quote ~5 days typical / ~10–12 days power-save / ~20 days standby / ~2 h charge / ~250 mAh — verify on your carton; actual runtime is profile-dependent',
            ar: 'أوراق التجزئة الشائعة تذكر ~5 أيام عادي / ~10–12 يوم توفير / ~20 يوم استعداد / ~2 س شحن / ~250 مللي أمبير — تحقق من كرتونك؛ المدة الفعلية تعتمد على ملف الاستخدام',
        },
        'Battery (CairoVolt measured)': {
            en: '4 days 7 hours (100%→auto-off) under: BT always on + paired, ~90 screen wakes/day, HR every 10 min, notifications enabled, no Always-On (SKU has none)',
            ar: '4 أيام و7 ساعات (100%→إطفاء تلقائي) تحت: بلوتوث دائم ومقترن، ~90 إيقاظ شاشة/يوم، نبض كل 10 د، إشعارات مفعّلة، بلا Always-On (الموديل بلاها)',
        },
        'Charge 0→100% (measured)': {
            en: '1 h 58 min magnetic puck from included cable on Anker A2147 5V USB-C path — FNB58 saw ~4.8–5.1 V / ~0.35–0.48 A class during bulk charge',
            ar: '1 س 58 د عبر القرص المغناطيسي والكابل المرفق على مسار USB-C 5V من Anker A2147 — رأى FNB58 فئة ~4.8–5.1 فولت / ~0.35–0.48 أمبير أثناء الشحن الكبير',
        },
        'Body dimensions (listing / measured)': {
            en: 'Listing 44 × 38 × 10.5 mm — CairoVolt Mitutoyo case (excl. crown/strap): 44.2 × 38.1 × 10.6 mm',
            ar: 'القائمة 44 × 38 × 10.5 ملم — حالة Mitutoyo لدى CairoVolt (بدون التاج/السوار): 44.2 × 38.1 × 10.6 ملم',
        },
        'Weight (listing / measured)': {
            en: 'Listing 38 g (body class) — CairoVolt: case alone 31.2 g; case + silicone strap as worn 40.1 g (Kkmoon 0.01g)',
            ar: 'القائمة 38 ج (فئة الجسم) — CairoVolt: الهيكل وحده 31.2 ج؛ الهيكل + سوار سيليكون كما يُرتدى 40.1 ج (Kkmoon 0.01 ج)',
        },
        'Strap': {
            en: 'Silicone, ~20 mm class lugs — 3-day Cairo wear: soft, traps sweat/salt in July heat; rinse and dry; no rashes on our tester',
            ar: 'سيليكون، عروات فئة ~20 ملم — ارتداء 3 أيام في القاهرة: ناعم، يحبس العرق/الملح في حر يوليو؛ اشطف وجفّف؛ بلا طفح على مختبِرنا',
        },
        'Phone OS (vendor)': {
            en: 'Common sheets: Android 8.0+ / iOS 12.0+ — confirm live app store page; we validated iOS 17.5 + Android 14 on this sample',
            ar: 'الأوراق الشائعة: Android 8.0+ / iOS 12.0+ — أكّد صفحة المتجر الحالية؛ تحقّقنا من iOS 17.5 + Android 14 على هذه العيّنة',
        },
        'Recall status (2026-07-24)': {
            en: 'NOT RECALLED — cpsc.gov + Joyroom public notices: zero hits for JR-FT3 / JW02 on 2026-07-24. Anker power-bank recalls are Anker-only and do not apply',
            ar: 'لا يوجد استدعاء — cpsc.gov + إشعارات جوي روم: صفر نتائج لـ JR-FT3 / JW02 في 2026-07-24. استدعاءات باوربانك Anker خاصة بانكر ولا تنطبق',
        },
        'Warranty': {
            en: 'CairoVolt store warranty (independent retailer) — water ingress subject to stated IP-use conditions and written exclusions; verify live terms',
            ar: 'ضمان متجر CairoVolt (تاجر مستقل) — دخول الماء يخضع لشروط استخدام IP والاستثناءات المكتوبة؛ راجع الشروط الحالية',
        },
        'In the Box (sample)': {
            en: 'Watch + silicone strap + magnetic charge cable + quick guide — confirm live package contents before ordering',
            ar: 'ساعة + سوار سيليكون + كابل شحن مغناطيسي + دليل سريع — أكّد محتويات العبوة الحالية قبل الطلب',
        },
    },
    benchTest: {
        sku: 'JR-FT3 (JW02)',
        sampleId: 'CV-SW-JRFT3-001',
        testDate: '2026-07-24',
        engineer: { en: 'Eng. Omar Khaled — Lead Technician', ar: 'م. عمر خالد — رئيس فريق التقنيين' },
        conditions: {
            en: 'One retail-stock unit — MPN JR-FT3 · store SKU JW02 · GTIN 6956116714017 · CairoVolt lab + New Cairo daily wear, ambient lab 28.4°C (HTC-2) · humidity 43% RH · outdoor walk segments ~34–37°C air · pairing phones: Apple iPhone 13 (iOS 17.5) and Samsung Galaxy A54 (Android 14) · Smart Time Pro from sample QR · IP68 NOT immersion-tested · recall check 2026-07-24 (cpsc.gov + Joyroom notices: no JR-FT3 hit) · single unit; production batches may vary',
            ar: 'وحدة واحدة من مخزون التجزئة — MPN JR-FT3 · SKU JW02 · GTIN 6956116714017 · مختبر CairoVolt + ارتداء يومي القاهرة الجديدة، حرارة مختبر 28.4°م (HTC-2) · رطوبة 43% · مقاطع مشي خارجي هواء ~34–37°م · هواتف الاقتران: Apple iPhone 13 (iOS 17.5) وSamsung Galaxy A54 (Android 14) · Smart Time Pro من QR العيّنة · IP68 لم يُختبر بالغمر · فحص استدعاء 2026-07-24 (cpsc.gov + إشعارات جوي روم: لا نتيجة JR-FT3) · وحدة واحدة؛ قد تختلف دفعات الإنتاج',
        },
        methodology: {
            en:
                'Treated as Bench Test Protocol §7.8 accessory (weight/dims, materials, multi-day practical wear) PLUS defined battery/BT practical tests — not a medical metrology bench. ' +
                '(A) Weight on Kkmoon 0.01g: case alone, then case+strap as worn; case dims with Mitutoyo caliper (excl. crown/strap). ' +
                '(B) Companion app: followed carton QR + Arabic/English quick guide → Smart Time Pro; installed on iPhone 13 and Galaxy A54; logged first-pair success and a 8-hour continuous BT stability window (phone in pocket / bag, watch on wrist) counting disconnect banners. ' +
                '(C) Battery rundown: charged to 100% on magnetic puck, rested 30 min, then daily-wear profile until auto-off — BT always paired, notifications on (WhatsApp + Phone + Gmail), raise-to-wake + tap wakes totaling ~90/day by hand tally, continuous HR sampling interval set to 10 min in-app, brightness mid, no music control loops, two ~25-min Outdoor Walk sessions and one ~20-min Indoor Cycle across the rundown. Timer+ wall-clock from 100% to power-off. ' +
                '(D) Charge 0→100%: after rundown, magnetic cable on Anker A2147 USB-C 5V path with FNIRSI FNB58 inline on the USB-C leg; Timer+ to full icon. ' +
                '(E) Sports modes: recorded vendor “~20 modes” list presence in-app; exercised Outdoor Walk, Outdoor Run (phone GPS on), Indoor Cycle, Elliptical — logged start/stop and sync to Smart Time Pro only; we do NOT publish medical-grade HR accuracy vs chest strap. ' +
                '(F) Notifications: qualitative WhatsApp + incoming-call banner delivery on both phones (Android with unrestricted battery for the app). ' +
                '(G) Display: qualitative outdoor readability at New Cairo noon vs shade at max brightness. ' +
                '(H) Strap comfort: 3-day continuous day-wear notes (sweat, edges, buckle). ' +
                '(I) IP68: vendor mark on carton/manual cited only — NO pressure/submersion lab (§7.8 F). ' +
                '(J) Health tiles: confirmed UI presence of HR / SpO2 / BP / sleep; explicitly NOT cross-checked against clinical instruments; disclosed as non-medical — no invented SpO2 clinical accuracy %. ' +
                'Independent corroboration (not our data): common JR-FT3 retail sheets (~5 d typical / ~2 h charge / IP68 / 20 sports / Android 8+ / iOS 12+); WeatherSpark Cairo July–August highs. ' +
                'Not measured: ECG (absent), clinical SpO2/BP accuracy, swim-lane submersion, LTE, watchOS apps, onboard GNSS chipset. Single retail unit.',
            ar:
                'عُومل كاختبار §7.8 للإكسسوارات (وزن/أبعاد، مواد، ارتداء عملي متعدد الأيام) مع اختبارات بطارية/بلوتوث عملية معرّفة — وليس منضدة مقاييس طبية. ' +
                '(A) الوزن على Kkmoon 0.01 ج: الهيكل وحده ثم الهيكل+السوار كما يُرتدى؛ أبعاد الهيكل بقدمة Mitutoyo (بدون تاج/سوار). ' +
                '(B) التطبيق: اتبعنا QR الكرتون + الدليل → Smart Time Pro؛ ثبّتناه على iPhone 13 وGalaxy A54؛ سجّلنا نجاح أول اقتران ونافذة ثبات بلوتوث 8 ساعات (الهاتف في الجيب/الحقيبة) مع عدّ لافتات الفصل. ' +
                '(C) تفريغ البطارية: شحن إلى 100% على القرص المغناطيسي، راحة 30 د، ثم ملف ارتداء يومي حتى الإطفاء — بلوتوث مقترن دائمًا، إشعارات (واتساب + هاتف + Gmail)، إيقاظ رفع/لمس بإجمالي ~90/يوم، فاصل نبض 10 د في التطبيق، سطوع متوسط، جلستا مشي خارجي ~25 د وجلسة دراجة داخلية ~20 د. ساعة جدارية Timer+ من 100% حتى الإطفاء. ' +
                '(D) شحن 0→100%: بعد التفريغ، الكابل المغناطيسي على مسار USB-C 5V من Anker A2147 مع FNIRSI FNB58 على خط USB-C؛ Timer+ حتى أيقونة الاكتمال. ' +
                '(E) الأوضاع الرياضية: تسجيل وجود قائمة «~20 وضعًا»؛ ممارسة مشي خارجي وركض خارجي (GPS الهاتف) ودراجة داخلية وإليپتيكال — بدء/إيقاف ومزامنة فقط؛ لا ننشر دقة نبض طبية مقابل حزام صدر. ' +
                '(F) الإشعارات: تقييم نوعي لواتساب ولافتة مكالمة على الهاتفين. ' +
                '(G) الشاشة: قراءة نوعية تحت شمس الظهيرة مقابل الظل بأقصى سطوع. ' +
                '(H) راحة السوار: ملاحظات ارتداء 3 أيام (عرق، حواف، إبزيم). ' +
                '(I) IP68: علامة المصنّع على الكرتون/الدليل فقط — بلا مختبر غمر (§7.8 F). ' +
                '(J) بلاطات الصحة: تأكيد وجود نبض/SpO2/ضغط/نوم في الواجهة؛ صراحة بلا مطابقة لأجهزة سريرية؛ بلا ادعاء دقة SpO2 سريرية. ' +
                'تأييد مستقل (ليس بياناتنا): أوراق تجزئة JR-FT3 الشائعة (~5 أيام عادي / ~2 س شحن / IP68 / 20 رياضة / Android 8+ / iOS 12+)؛ عظمى القاهرة يوليو–أغسطس من WeatherSpark. ' +
                'لم يُقس: ECG (غائب)، دقة SpO2/ضغط سريرية، غمر سباحة، LTE، تطبيقات watchOS، GNSS مدمج في الساعة. وحدة تجزئة واحدة.',
        },
        equipment: [
            { name: 'Kkmoon 0.01g scale', use: { en: 'Case-alone and case+strap mass', ar: 'كتلة الهيكل وحده والهيكل+السوار' } },
            { name: 'Mitutoyo digital caliper', use: { en: 'Case length × width × thickness', ar: 'طول × عرض × سماكة الهيكل' } },
            { name: 'HTC-2 thermo-hygrometer', use: { en: 'Lab ambient temperature and humidity', ar: 'حرارة ورطوبة محيط المختبر' } },
            { name: 'FNIRSI FNB58 (fw v1.3)', use: { en: 'Inline V·A on USB-C leg during magnetic 0→100% charge', ar: 'V·A على خط USB-C أثناء الشحن المغناطيسي 0→100%' } },
            { name: 'Anker A2147 30W USB-C PD wall charger', use: { en: '5V source for magnetic charge cable', ar: 'مصدر 5V لكابل الشحن المغناطيسي' } },
            { name: 'Timer+ stopwatch', use: { en: 'Battery rundown clock and 0→100% charge duration', ar: 'ساعة تفريغ البطارية ومدة الشحن 0→100%' } },
            { name: 'Apple iPhone 13 (iOS 17.5) + Samsung Galaxy A54 (Android 14)', use: { en: 'Smart Time Pro pairing, BT stability, notifications, phone-GPS sports', ar: 'اقتران Smart Time Pro وثبات البلوتوث والإشعارات ورياضات GPS الهاتف' } },
            { name: '5m fiberglass tape (informational)', use: { en: 'Strap usable length check vs wrist 105–175 mm class listing', ar: 'فحص طول السوار القابل للاستخدام مقابل فئة معصمي 105–175 ملم' } },
        ],
        results: [
            {
                param: { en: 'Recall status', ar: 'حالة الاستدعاء' },
                rated: { en: 'N/A (Joyroom watch)', ar: 'غ/م (ساعة جوي روم)' },
                measured: { en: 'No Joyroom / CPSC recall hit for JR-FT3 / JW02 — checked 2026-07-24', ar: 'لا نتيجة استدعاء Joyroom / CPSC لـ JR-FT3 / JW02 — فحص 2026-07-24' },
                note: { en: 'Anker power-bank recalls do not apply to this SKU', ar: 'استدعاءات باوربانك Anker لا تنطبق على هذا الموديل' },
            },
            {
                param: { en: 'Case dimensions (excl. crown/strap)', ar: 'أبعاد الهيكل (بدون تاج/سوار)' },
                rated: '44 × 38 × 10.5 mm',
                measured: '44.2 × 38.1 × 10.6 mm',
                note: { en: 'Mitutoyo — within §7.8 A ±5% band of listing', ar: 'Mitutoyo — ضمن نطاق §7.8 A ±5% من القائمة' },
            },
            {
                param: { en: 'Weight — case alone', ar: 'الوزن — الهيكل وحده' },
                rated: { en: '38 g body-class listing', ar: 'قائمة فئة جسم 38 ج' },
                measured: '31.2 g',
                note: { en: 'Kkmoon 0.01g — listing is body-class; strap adds mass separately', ar: 'Kkmoon 0.01 ج — القائمة فئة جسم؛ السوار يضيف كتلة منفصلة' },
            },
            {
                param: { en: 'Weight — case + silicone strap (as worn)', ar: 'الوزن — هيكل + سوار سيليكون (كما يُرتدى)' },
                measured: '40.1 g',
                note: { en: 'Kkmoon 0.01g — light all-day wrist feel', ar: 'Kkmoon 0.01 ج — إحساس معصم خفيف طوال اليوم' },
            },
            {
                param: { en: 'Battery life — defined daily profile', ar: 'عمر البطارية — ملف يومي معرّف' },
                rated: { en: '~5 days typical (common retail sheet)', ar: '~5 أيام استخدام عادي (ورقة تجزئة شائعة)' },
                measured: { en: '4 days 7 hours (100% → auto-off)', ar: '4 أيام و7 ساعات (100% → إطفاء تلقائي)' },
                note: {
                    en: 'Profile: BT on+paired · ~90 screen wakes/day · HR every 10 min · notifications on · mid brightness · 2×~25 min Outdoor Walk + 1×~20 min Indoor Cycle',
                    ar: 'الملف: بلوتوث مقترن · ~90 إيقاظ/يوم · نبض كل 10 د · إشعارات · سطوع متوسط · مشيان خارجيان ~25 د + دراجة داخلية ~20 د',
                },
            },
            {
                param: { en: 'Charge time 0→100% (magnetic)', ar: 'زمن الشحن 0→100% (مغناطيسي)' },
                rated: { en: '~2 hours (common retail sheet)', ar: '~2 ساعتان (ورقة تجزئة شائعة)' },
                measured: '1 h 58 min',
                note: {
                    en: 'Timer+ on included magnetic cable + A2147 5V USB-C; FNB58 ~4.8–5.1 V / ~0.35–0.48 A class in bulk phase',
                    ar: 'Timer+ على الكابل المغناطيسي المرفق + A2147 USB-C 5V؛ FNB58 فئة ~4.8–5.1 فولت / ~0.35–0.48 أمبير في مرحلة الشحن الكبير',
                },
            },
            {
                param: { en: 'Bluetooth pairing — first connect', ar: 'اقتران البلوتوث — أول اتصال' },
                rated: 'Bluetooth 5.2',
                measured: {
                    en: 'Smart Time Pro paired on first attempt — iPhone 13 and Galaxy A54',
                    ar: 'اقترن Smart Time Pro من أول محاولة — iPhone 13 وGalaxy A54',
                },
            },
            {
                param: { en: 'Bluetooth pairing stability (8 h window)', ar: 'ثبات اقتران البلوتوث (نافذة 8 س)' },
                measured: {
                    en: '0 unexpected disconnect banners on iPhone 13; 1 brief reconnect on Galaxy A54 after Android battery optimization killed the app once (restored after “Unrestricted” battery)',
                    ar: '0 لافتة فصل غير متوقع على iPhone 13؛ إعادة اتصال قصيرة واحدة على Galaxy A54 بعد أن قتل تحسين البطارية التطبيق مرة (عادت بعد بطارية «غير مقيّدة»)',
                },
                note: {
                    en: 'Phone ~3–8 m pocket/bag — Class-2 tether behaviour, not a 30 m miracle claim',
                    ar: 'الهاتف ~3–8 م جيب/حقيبة — سلوك ربط Class-2، وليس ادعاء معجزة 30 م',
                },
            },
            {
                param: { en: 'Sports modes — vendor list vs exercised', ar: 'الأوضاع الرياضية — قائمة المصنّع مقابل ما مورس' },
                rated: { en: '~20 modes (vendor / in-app customize)', ar: '~20 وضعًا (مصنّع / تخصيص في التطبيق)' },
                measured: {
                    en: 'In-app list present (~20). Exercised only: Outdoor Walk, Outdoor Run, Indoor Cycle, Elliptical — all started/stopped and synced to Smart Time Pro',
                    ar: 'القائمة موجودة في التطبيق (~20). مورس فقط: مشي خارجي، ركض خارجي، دراجة داخلية، إليپتيكال — كلها بدأت/توقفت وتزامنت إلى Smart Time Pro',
                },
                note: {
                    en: 'Outdoor Run distance used phone GPS while phone was on-body; we do not claim Ultra-class GNSS accuracy',
                    ar: 'مسافة الركض الخارجي استخدمت GPS الهاتف وهو على الجسم؛ لا ندّعي دقة GNSS فئة Ultra',
                },
            },
            {
                param: { en: 'Notification delivery (qualitative)', ar: 'توصيل الإشعارات (نوعي)' },
                measured: {
                    en: 'WhatsApp + Phone call banners appeared on-wrist within ~1–3 s when app background rights were correct; Arabic sender names mostly readable, some emoji truncated',
                    ar: 'لافتات واتساب ومكالمات الهاتف ظهرت على المعصم خلال ~1–3 ث عند صحة أذونات الخلفية؛ أسماء المرسلين بالعربية مقروءة غالبًا، وبعض الإيموجي يُقتطع',
                },
                note: {
                    en: 'Android OEM battery savers can delay or drop banners — not a watch-only fault',
                    ar: 'موفّرات بطارية أندرويد قد تؤخر أو تسقط اللافتات — ليست عيب الساعة وحدها',
                },
            },
            {
                param: { en: 'Display outdoor readability (Cairo sun, qualitative)', ar: 'مقروئية الشاشة في الخارج (شمس القاهرة، نوعي)' },
                measured: {
                    en: 'Shade / late afternoon: clear at max brightness. Direct New Cairo noon sun: washed / needs hand-cupping — expected IPS behaviour, not OLED punch',
                    ar: 'الظل / العصر: واضحة بأقصى سطوع. شمس ظهيرة القاهرة الجديدة المباشرة: تغسل / تحتاج تظليل باليد — سلوك IPS متوقع وليس قوة OLED',
                },
            },
            {
                param: { en: 'Strap material & 3-day comfort', ar: 'مادة السوار وراحة 3 أيام' },
                rated: { en: 'Silicone strap (vendor)', ar: 'سوار سيليكون (مصنّع)' },
                measured: {
                    en: 'Soft edges, secure buckle; after July walks: salt film under strap — wiped clean, no skin irritation on tester across 3 day-wear days',
                    ar: 'حواف ناعمة وإبزيم ثابت؛ بعد مشي يوليو: طبقة ملح تحت السوار — مُسحت، بلا تهيّج جلد على المختبِر عبر 3 أيام ارتداء',
                },
            },
            {
                param: { en: 'Companion app name / platforms', ar: 'اسم التطبيق المرافق / المنصات' },
                measured: {
                    en: 'Smart Time Pro — installed from iOS App Store and Google Play via sample QR/manual; not Wear OS / watchOS native',
                    ar: 'Smart Time Pro — ثُبّت من App Store وGoogle Play عبر QR/دليل العيّنة؛ ليس Wear OS / watchOS أصليًا',
                },
                note: {
                    en: 'App UI/features change with store updates — re-check permissions after OS updates',
                    ar: 'واجهة/ميزات التطبيق تتغير مع تحديثات المتجر — أعد فحص الأذونات بعد تحديثات النظام',
                },
            },
            {
                param: { en: 'On-watch Bluetooth calling (mic/speaker)', ar: 'مكالمات بلوتوث من الساعة (مايك/سماعة)' },
                rated: { en: 'Some FT3 Pro listings claim calling — different marketing SKU', ar: 'بعض قوائم FT3 Pro تدّعي المكالمات — تسويق/موديل مختلف' },
                measured: {
                    en: 'NOT present on JR-FT3 sample CV-SW-JRFT3-001 — call notification + reject/mute only; no usable mic path for watch calls',
                    ar: 'غير موجود على عيّنة JR-FT3 CV-SW-JRFT3-001 — إشعار مكالمة + رفض/كتم فقط؛ بلا مسار مايك صالح لمكالمات الساعة',
                },
            },
            {
                param: { en: 'IP68 water resistance', ar: 'مقاومة الماء IP68' },
                rated: { en: 'IP68 (vendor-stated on carton/manual)', ar: 'IP68 (بيان مصنّع على الكرتون/الدليل)' },
                measured: {
                    en: 'Vendor mark observed — NO CairoVolt submersion / depth / duration lab this date',
                    ar: 'لُوحظت علامة المصنّع — بلا مختبر غمر/عمق/مدة من CairoVolt في هذا التاريخ',
                },
                note: {
                    en: 'Protocol §7.8 F — cite manufacturer only; resistance can diminish with wear, soap, heat, impacts',
                    ar: 'البروتوكول §7.8 F — استشهد بالمصنّع فقط؛ قد تتراجع المقاومة مع الاستخدام والصابون والحرارة والصدمات',
                },
            },
            {
                param: { en: 'Health tiles — medical honesty audit', ar: 'بلاطات الصحة — تدقيق الأمانة الطبية' },
                measured: {
                    en: 'HR / SpO2 / BP / sleep UI present — treated as consumer estimates ONLY; NOT cross-checked vs clinical cuff/oximeter; NOT a medical device; no ECG',
                    ar: 'واجهة نبض / SpO2 / ضغط / نوم موجودة — تُعامل كتقديرات مستهلك فقط؛ بلا مطابقة لكُمّ/مقياس أكسجين سريري؛ ليست جهازًا طبيًا؛ بلا ECG',
                },
                note: {
                    en: 'Red flag if any seller copy claims “medical accuracy” or “diagnose hypertension/AFib” for this SKU',
                    ar: 'راية حمراء إن ادّعت نسخة بائع «دقة طبية» أو «تشخيص ضغط/رجفان» لهذا الموديل',
                },
            },
            {
                param: { en: 'Red-flag audit (listing honesty)', ar: 'تدقيق الرايات الحمراء (أمانة القائمة)' },
                measured: {
                    en: 'PASS with caveats: carton matched JR-FT3 / GTIN 6956116714017; no ECG claim on our sample docs; IP68 present as rating mark only. FAIL risks to watch for: “medical grade HR/BP”, “Apple Watch Ultra alternative”, “ECG”, or FT3 Pro calling features sold as this JW02 SKU',
                    ar: 'نجاح بتحفظات: الكرتون طابق JR-FT3 / GTIN 6956116714017؛ بلا ادعاء ECG على مستندات عينتنا؛ IP68 كعلامة تصنيف فقط. مخاطر فشل راقبها: «نبض/ضغط درجة طبية»، «بديل Apple Watch Ultra»، «ECG»، أو ميزات مكالمات FT3 Pro تُباع كموديل JW02 هذا',
                },
            },
        ],
        verdict: {
            en: 'JR-FT3 is an honest ~1092 EGP notification/sports watch: 4 d 7 h battery under our wake/HR/BT profile, 1 h 58 min magnetic charge, stable Smart Time Pro pairing — not a medical device, not Apple Watch Ultra, no ECG, IP68 vendor-stated only.',
            ar: 'JR-FT3 ساعة إشعارات/رياضة أمينة عند ~1092 جنيه: بطارية 4 أيام و7 ساعات تحت ملف الإيقاظ/النبض/البلوتوث، شحن مغناطيسي 1 س 58 د، اقتران Smart Time Pro مستقر — ليست جهازًا طبيًا، وليست Apple Watch Ultra، بلا ECG، وIP68 بيان مصنّع فقط.',
        },
        pros: [
            {
                en: 'Measured 4 days 7 hours runtime under a spelled-out profile (BT on, ~90 wakes/day, HR @10 min, notifications) — close to common ~5-day typical sheets without marketing fog',
                ar: 'عمر مقاس 4 أيام و7 ساعات تحت ملف مكتوب (بلوتوث، ~90 إيقاظ/يوم، نبض كل 10 د، إشعارات) — قريب من أوراق ~5 أيام الشائعة بلا ضباب تسويقي',
            },
            {
                en: 'Magnetic 0→100% in 1 h 58 min on the included puck + A2147 5V path (Timer+ / FNB58) — overnight or lunch-break recharge is realistic',
                ar: 'شحن مغناطيسي 0→100% في 1 س 58 د على القرص المرفق + مسار A2147 5V (Timer+ / FNB58) — إعادة شحن ليلًا أو في استراحة الغداء واقعية',
            },
            {
                en: '40.1 g as worn (Kkmoon) and soft silicone — comfortable for 3 Cairo summer day-wear days after sweat wipe-downs',
                ar: '40.1 ج كما تُرتدى (Kkmoon) وسيليكون ناعم — مريحة لـ3 أيام ارتداء صيف قاهري بعد مسح العرق',
            },
            {
                en: 'Smart Time Pro paired cleanly on both iPhone 13 and Galaxy A54; WhatsApp/call banners usable when phone permissions are correct',
                ar: 'Smart Time Pro اقترن بنظافة على iPhone 13 وGalaxy A54؛ لافتات واتساب/المكالمات قابلة للاستخدام عند صحة أذونات الهاتف',
            },
            {
                en: 'Four exercised sports modes started/stopped and synced — enough for gym + Corniche walk logging without Ultra money',
                ar: 'أربعة أوضاع رياضية مُمارَسة بدأت/توقفت وتزامنت — كافية لتسجيل الجيم ومشي الكورنيش بلا فلوس Ultra',
            },
        ],
        limits: [
            {
                en: 'NOT a medical device — HR / SpO2 / BP / sleep are consumer estimates only; do not diagnose, dose medication, or ER-triage from the watch; no ECG on JR-FT3',
                ar: 'ليست جهازًا طبيًا — النبض / SpO2 / الضغط / النوم تقديرات مستهلك فقط؛ لا تشخّص أو تضبط دواء أو تُفرز للطوارئ من الساعة؛ بلا ECG على JR-FT3',
            },
            {
                en: 'Wrong for Apple Watch Ultra buyers — no dual-frequency GPS, no dive computer, no watchOS apps, no Action Button ecosystem, no clinical sensors',
                ar: 'غير مناسبة لمشتري Apple Watch Ultra — بلا GPS ثنائي التردد، بلا حاسوب غوص، بلا تطبيقات watchOS، بلا منظومة Action Button، بلا حسّاسات سريرية',
            },
            {
                en: 'IP68 is vendor-stated only — CairoVolt did NOT run submersion depth/duration labs; follow Joyroom water-type and drying rules; wipe sweat before charging',
                ar: 'IP68 بيان مصنّع فقط — لم تُجرِ CairoVolt مختبرات غمر عمق/مدة؛ اتبع قواعد جوي روم لنوع الماء والتجفيف؛ امسح العرق قبل الشحن',
            },
            {
                en: 'No on-watch Bluetooth calling mic/speaker on this JR-FT3 sample — call notify/reject only; do not buy JW02 expecting FT3 Pro calling ads',
                ar: 'بلا مايك/سماعة مكالمات بلوتوث على عيّنة JR-FT3 هذه — إشعار/رفض فقط؛ لا تشترِ JW02 متوقعًا إعلانات مكالمات FT3 Pro',
            },
            {
                en: 'IPS outdoor noon glare washes the face — hand-shade or step into shade; not an Ultra-bright OLED outdoor panel',
                ar: 'وهج ظهيرة IPS يغسل الوجه — ظلّل باليد أو ادخل الظل؛ ليست لوحة OLED ساطعة فئة Ultra',
            },
            {
                en: 'Android notification reliability depends on OEM battery settings — one reconnect during our 8 h A54 window until “Unrestricted” battery was set',
                ar: 'موثوقية إشعارات أندرويد تعتمد على إعدادات بطارية الشركة — إعادة اتصال واحدة خلال نافذة A54 لـ8 س حتى ضبط البطارية «غير مقيّدة»',
            },
            {
                en: 'Single retail unit CV-SW-JRFT3-001; batches vary — verify printed JR-FT3, JW02, GTIN 6956116714017, and live Smart Time Pro store page on your unit',
                ar: 'وحدة تجزئة واحدة CV-SW-JRFT3-001؛ الدفعات تختلف — تحقق من JR-FT3 وJW02 وGTIN 6956116714017 المطبوعين وصفحة Smart Time Pro الحالية على وحدتك',
            },
        ],
    },
};
