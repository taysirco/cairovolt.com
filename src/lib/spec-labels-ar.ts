/**
 * Arabic labels for product specification keys.
 *
 * Every key in src/data/details/*.ts `specifications` is authored in English,
 * so Arabic product pages printed "Model", "Weight", "In the Box" next to
 * Arabic values — in the visible spec table and in the Arabic
 * Product.additionalProperty names. This map covers the most frequent keys
 * (the top ~100 by row count across active products, roughly 60% of all spec
 * rows). A key that is not listed falls back to its English text unchanged:
 * one-off, product-specific keys are better left as authored than machine-
 * translated.
 *
 * Conventions: technical marks stay Latin (PD, PPS, MFi, Qi, Qi2, Wh, mAh,
 * USB-C, USB-A, LDAC, AAC, ANC, FNB58, model codes, and the JBL mark); brand
 * names use the site's Arabic spellings (انكر، ساوندكور، جوي روم).
 *
 * Display-only: specification VALUES and the English keys used for lookups
 * (e.g. `specifications['Capacity']`) are never touched.
 */
export const AR_SPEC_LABELS: Readonly<Record<string, string>> = {
    // Identity & packaging
    'Model': 'الموديل',
    'Product Type': 'نوع المنتج',
    'Category': 'الفئة',
    'Technology': 'التقنية',
    'In the Box': 'محتويات العلبة',
    'In the box': 'محتويات العلبة',
    'In the Box (CairoVolt listing)': 'محتويات العلبة (حسب قائمة كايرو فولت)',
    'Sibling disambiguation': 'التمييز عن الموديلات المشابهة',
    'Launch': 'الإطلاق',
    'Sample / Lab ID': 'رقم العيّنة / المعمل',
    'Protocol': 'بروتوكول الاختبار',

    // Physical
    'Weight': 'الوزن',
    'Weight (measured)': 'الوزن (مُقاس)',
    'Weight / Dimensions': 'الوزن / الأبعاد',
    'Weight per Earbud': 'وزن كل سماعة',
    'Weight Total (buds + case)': 'الوزن الكلي (السماعات + العلبة)',
    'Dimensions': 'الأبعاد',
    'Dimensions (measured)': 'الأبعاد (مُقاسة)',
    'Dimensions (case)': 'أبعاد العلبة',
    'Length': 'الطول',
    'Jacket': 'الغلاف الخارجي',
    'Connectors': 'الموصلات',
    'Display': 'الشاشة',
    'Controls': 'التحكم',
    'Foldable (verified)': 'قابلة للطي (تم التحقق)',
    'Water Resistance': 'مقاومة الماء',
    'Water resistance': 'مقاومة الماء',
    'Plug (Egypt retail sample)': 'القابس (عيّنة البيع في مصر)',

    // Power, ports & charging
    'Ports': 'المنافذ',
    'Input': 'الدخل',
    'Input / Self-recharge': 'الدخل / شحن الباور بانك نفسه',
    'Output': 'الخرج',
    'Output Power': 'قدرة الخرج',
    'Rated Output': 'الخرج المُعلن',
    'Total Output': 'الخرج الإجمالي',
    'Max Power': 'أقصى قدرة',
    'Max Power (CairoVolt-verified this cycle)': 'أقصى قدرة (تحقّق كايرو فولت في هذه الدورة)',
    'USB-A Port': 'منفذ USB-A',
    'USB-A Output': 'خرج USB-A',
    'Charging': 'الشحن',
    'Charging Port': 'منفذ الشحن',
    'Charging Time (vendor)': 'زمن الشحن (حسب الشركة)',
    'Charging Time (vendor / measured)': 'زمن الشحن (الشركة / قياسنا)',
    'Quick Charge': 'الشحن السريع',
    'Quick Charge (vendor)': 'الشحن السريع (حسب الشركة)',
    'Quick Charge (vendor / measured)': 'الشحن السريع (الشركة / قياسنا)',
    'Quick charge (measured)': 'الشحن السريع (مُقاس)',
    'Full charge 0→100% (measured)': 'شحن كامل 0→100% (مُقاس)',
    'PD Fixed Profiles (vendor + FNB58)': 'بروفايلات PD الثابتة (الشركة + FNB58)',
    'Data Speed': 'سرعة نقل البيانات',
    'MFi Certification': 'شهادة MFi',
    'Efficiency': 'الكفاءة',
    'Measured V-drop @ 5V / 2A': 'هبوط الجهد المُقاس @ 5V / 2A',
    'Measured V-drop @ 3A / 5V': 'هبوط الجهد المُقاس @ 3A / 5V',
    'Measured peak on iPhone 13 (via A2147 30W PD)': 'أعلى قدرة مُقاسة على iPhone 13 (عبر A2147 30W PD)',
    'MagSafe compatibility (honest)': 'التوافق مع MagSafe (بصراحة)',
    'Where this cable is enough': 'متى يكفيك هذا الكابل',
    'Where this cable is NOT enough': 'متى لا يكفيك هذا الكابل',
    'Where this cable is NOT for': 'متى لا يناسبك هذا الكابل',

    // Battery & energy
    'Capacity': 'السعة',
    'Battery': 'البطارية',
    'Battery (rated capacity)': 'البطارية (السعة المُعلنة)',
    'Battery per Earbud': 'بطارية كل سماعة',
    'Battery — Charging Case': 'البطارية — علبة الشحن',
    'Battery — total system': 'البطارية — إجمالي النظام',
    'Cell Capacity': 'سعة الخلايا',
    'System Total Energy': 'إجمالي طاقة النظام',
    'Usable Energy (CairoVolt measured)': 'الطاقة القابلة للاستخدام (قياس كايرو فولت)',
    '5V-referred capacity': 'السعة المحسوبة على 5V',
    'Airline': 'الطيران',
    'Airline cabin note': 'ملاحظة مقصورة الطيران',

    // Audio
    'Bluetooth': 'البلوتوث',
    'Bluetooth Version': 'إصدار البلوتوث',
    'Bluetooth Range (vendor)': 'مدى البلوتوث (حسب الشركة)',
    'Bluetooth Profiles': 'بروفايلات البلوتوث',
    'Driver': 'المحرك الصوتي',
    'Audio Architecture': 'البنية الصوتية',
    'Codecs': 'ترميزات الصوت (Codecs)',
    'Codecs (verified via Soundcore App)': 'ترميزات الصوت (تم التحقق عبر تطبيق ساوندكور)',
    'ANC': 'إلغاء الضوضاء (ANC)',
    'ANC modes (verified in Soundcore App)': 'أوضاع إلغاء الضوضاء (تم التحقق في تطبيق ساوندكور)',
    'ANC reduction claim (vendor-stated only)': 'خفض الضوضاء (كما تعلنه الشركة فقط)',
    'Microphone': 'الميكروفون',
    'Microphones': 'الميكروفونات',
    'Multipoint': 'الاتصال المتعدد (Multipoint)',
    'App': 'التطبيق',
    'Wired': 'التشغيل السلكي',
    'Lightshow': 'العرض الضوئي',
    'Fit note (Cairo July practical)': 'ملاحظة الارتداء (استخدام عملي في يوليو بالقاهرة)',
    'Playtime (vendor)': 'مدة التشغيل (حسب الشركة)',
    'Playtime (CairoVolt measured @ 50%)': 'مدة التشغيل (قياس كايرو فولت @ 50%)',
    'Case charge time — wired USB-C (measured)': 'زمن شحن العلبة — سلكي USB-C (مُقاس)',
    'Case charge time — wireless Qi (measured)': 'زمن شحن العلبة — لاسلكي Qi (مُقاس)',
    'Runtime — single charge @ 50% vol, ANC OFF (measured)': 'مدة التشغيل — شحنة واحدة @ 50% صوت، ANC مطفأ (مُقاسة)',
    'Runtime — single charge @ 50% vol, ANC ON (measured)': 'مدة التشغيل — شحنة واحدة @ 50% صوت، ANC مفعّل (مُقاسة)',
    'Total playback with case (measured cycling, ANC OFF, AAC)': 'إجمالي التشغيل مع العلبة (دورات مُقاسة، ANC مطفأ، AAC)',

    // Safety, compliance & warranty
    'Safety': 'السلامة',
    'Compliance': 'المطابقة والعلامات',
    'Recall Status': 'حالة الاستدعاء',
    'Recall Status (2026-07-24)': 'حالة الاستدعاء (2026-07-24)',
    'Recall status (2026-07-24)': 'حالة الاستدعاء (2026-07-24)',
    'Recall status (verified 2026-07-24)': 'حالة الاستدعاء (تم التحقق 2026-07-24)',
    'Safety / Recall (verified 2026-07-24)': 'السلامة / الاستدعاء (تم التحقق 2026-07-24)',
    'Warranty': 'الضمان',
    'Warranty (vendor)': 'الضمان (حسب الشركة)',
};

/** Arabic label for a specification key; unknown keys are returned unchanged. */
export function arSpecLabel(key: string): string {
    return AR_SPEC_LABELS[key] ?? key;
}
