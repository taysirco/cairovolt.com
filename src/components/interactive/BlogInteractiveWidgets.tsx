'use client';

import dynamic from 'next/dynamic';

// Dynamic imports for interactive components (zero impact on initial bundle)
const MermaidDiagram = dynamic(() => import('./MermaidDiagram'), { ssr: false });
const BatteryCalculator = dynamic(() => import('./BatteryCalculator'), { ssr: false });
const ChargingSpeedCalculator = dynamic(() => import('./ChargingSpeedCalculator'), { ssr: false });

/**
 * Renders interactive widgets (Mermaid diagrams, calculators) for specific blog articles.

 */
export function BlogInteractiveWidgets({ slug, locale }: { slug: string; locale: string }) {
    const isArabic = locale === 'ar';
    const chartByLocale = (arabicChart: string, englishChart: string) =>
        isArabic ? arabicChart : englishChart;

    // Map slugs to their interactive content
    const widgets: Record<string, React.ReactNode> = {
        // Power bank buying guide — battery calculator + decision flowchart
        'best-power-bank-egypt-2026': (
            <>
                <BatteryCalculator locale={locale} />
                <MermaidDiagram
                    title={isArabic ? '🗺️ خريطة اختيار الباور بانك المناسب' : '🗺️ Power Bank Selection Flowchart'}
                    locale={locale}
                    chart={chartByLocale(`flowchart TD
    A["حدد الأجهزة التي ستشحنها"] --> B{"هل تحتاج لشحن لابتوب؟"}
    B -->|نعم| C["طابق قدرة USB-C PD المطلوبة مع مواصفات اللابتوب"]
    B -->|لا| D{"كم مرة تحتاج لإعادة شحن الهاتف؟"}
    D -->|استخدام يومي خفيف| E["قارن خيارات السعة الأصغر والوزن"]
    D -->|رحلات أو استخدام ممتد| F["قارن السعة الأكبر والوزن وقيود السفر"]
    C --> G["راجع المنافذ والكابل والتوافر وشروط الضمان"]
    E --> G
    F --> G

    style A fill:#3b82f6,color:#fff,stroke:#2563eb
    style G fill:#22c55e,color:#fff,stroke:#16a34a`, `flowchart TD
    A["List the devices you need to charge"] --> B{"Do you need laptop charging?"}
    B -->|Yes| C["Match the required USB-C PD output to the laptop specifications"]
    B -->|No| D{"How many phone recharges do you need?"}
    D -->|Light daily use| E["Compare lower-capacity options and weight"]
    D -->|Travel or extended use| F["Compare higher capacity, weight, and travel limits"]
    C --> G["Review ports, cable, availability, and warranty terms"]
    E --> G
    F --> G

    style A fill:#3b82f6,color:#fff,stroke:#2563eb
    style G fill:#22c55e,color:#fff,stroke:#16a34a`)}
                />
            </>
        ),

        // iPhone charger guide — charging speed calculator + cable decision tree
        'best-iphone-17-charger-egypt': (
            <>
                <ChargingSpeedCalculator locale={locale} />
                <MermaidDiagram
                    title={isArabic ? '🗺️ خريطة اختيار شاحن الايفون' : '🗺️ iPhone Charger Selection Guide'}
                    locale={locale}
                    chart={chartByLocale(`flowchart TD
    A["حدد موديل الايفون والأجهزة الأخرى"] --> B{"هل ستشحن جهازًا واحدًا؟"}
    B -->|نعم| C["راجع القدرة ومعيار الشحن الموصى بهما من الشركة المصنّعة"]
    B -->|لا| D["احسب توزيع القدرة بين المنافذ عند الاستخدام المتزامن"]
    C --> E{"هل الكابل مناسب لمنفذ الهاتف والشاحن؟"}
    D --> E
    E -->|نعم| F["قارن الحجم والسعر والتوافر وشروط الضمان"]
    E -->|لا| G["اختر كابلًا متوافقًا قبل الطلب"]

    style A fill:#f59e0b,color:#fff,stroke:#d97706
    style F fill:#22c55e,color:#fff,stroke:#16a34a
    style G fill:#3b82f6,color:#fff,stroke:#2563eb`, `flowchart TD
    A["Identify the iPhone model and any other devices"] --> B{"Will you charge one device?"}
    B -->|Yes| C["Review the manufacturer-recommended output and charging standard"]
    B -->|No| D["Check power allocation across ports during simultaneous charging"]
    C --> E{"Does the cable match the phone and charger ports?"}
    D --> E
    E -->|Yes| F["Compare size, price, availability, and warranty terms"]
    E -->|No| G["Choose a compatible cable before ordering"]

    style A fill:#f59e0b,color:#fff,stroke:#d97706
    style F fill:#22c55e,color:#fff,stroke:#16a34a
    style G fill:#3b82f6,color:#fff,stroke:#2563eb`)}
                />
            </>
        ),

        // Anker vs Joyroom — comparison flowchart
        'anker-vs-joyroom-comparison': (
            <>
                <BatteryCalculator locale={locale} />
                <MermaidDiagram
                    title={isArabic ? '🗺️ أيهما تختار: انكر أم جوي روم؟' : '🗺️ Anker vs Joyroom: Which to Choose?'}
                    locale={locale}
                    chart={chartByLocale(`flowchart TD
    A["حدد الجهاز والاستخدام"] --> B["اكتب القدرة والمنفذ والميزات المطلوبة"]
    B --> C["كوّن قائمة موديلات مطابقة من انكر وجوي روم"]
    C --> D["قارن المواصفات المنشورة والسعر الحالي والتوافر"]
    D --> E["راجع مدة ضمان كايرو فولت وشروطه لكل موديل"]
    E --> F["اختر الموديل الأنسب لاحتياجك وميزانيتك"]

    style A fill:#6366f1,color:#fff,stroke:#4f46e5
    style F fill:#22c55e,color:#fff,stroke:#16a34a`, `flowchart TD
    A["Define the device and use case"] --> B["List the required output, port, and features"]
    B --> C["Shortlist matching Anker and Joyroom models"]
    C --> D["Compare published specifications, current price, and availability"]
    D --> E["Review the CairoVolt warranty duration and terms for each model"]
    E --> F["Choose the model that fits your needs and budget"]

    style A fill:#6366f1,color:#fff,stroke:#4f46e5
    style F fill:#22c55e,color:#fff,stroke:#16a34a`)}
                />
            </>
        ),

        // Product-information review flowchart. Packaging cues alone are not proof.
        'how-to-identify-original-anker': (
            <MermaidDiagram
                title={isArabic ? '🗺️ خطوات مراجعة بيانات منتج انكر' : '🗺️ Anker Product Information Checks'}
                locale={locale}
                chart={chartByLocale(`flowchart TD
    A["راجع منتج انكر"] --> B{"هل رقم الموديل والقدرة يطابقان وثائق الشركة؟"}
    B -->|لا| X1["أوقف المراجعة وتواصل مع البائع أو دعم الشركة"]
    B -->|نعم| C{"هل توجد أداة تحقق من الشركة لهذا الموديل؟"}
    C -->|نعم| D["اتبع تعليمات الأداة أو دعم الشركة"]
    C -->|لا| E["احتفظ بالفاتورة وشروط ضمان البائع"]
    D --> E
    E --> F{"هل يوجد تلف أو سخونة غير معتادة؟"}
    F -->|نعم| X2["توقف عن الاستخدام واطلب دعمًا مؤهلًا"]
    F -->|لا| G["اكتملت المراجعة الأولية — وليست شهادة أصالة"]

    style A fill:#3b82f6,color:#fff
    style G fill:#22c55e,color:#fff,stroke:#16a34a
    style X1 fill:#f59e0b,color:#fff,stroke:#d97706
    style X2 fill:#ef4444,color:#fff,stroke:#dc2626`, `flowchart TD
    A["Review an Anker product"] --> B{"Do the model number and rating match manufacturer documentation?"}
    B -->|No| X1["Pause and contact the seller or manufacturer support"]
    B -->|Yes| C{"Is a manufacturer verification tool available for this model?"}
    C -->|Yes| D["Follow the tool or manufacturer support instructions"]
    C -->|No| E["Keep the invoice and the seller's warranty terms"]
    D --> E
    E --> F{"Is there damage or unusual heat?"}
    F -->|Yes| X2["Stop use and seek qualified support"]
    F -->|No| G["Initial checks complete — not an authenticity certificate"]

    style A fill:#3b82f6,color:#fff
    style G fill:#22c55e,color:#fff,stroke:#16a34a
    style X1 fill:#f59e0b,color:#fff,stroke:#d97706
    style X2 fill:#ef4444,color:#fff,stroke:#dc2626`)}
            />
        ),

        // Bluetooth earbuds — comparison chart
        'best-bluetooth-earbuds-egypt-2026': (
            <MermaidDiagram
                title={isArabic ? '🗺️ خريطة اختيار السماعة المناسبة' : '🗺️ Earbuds Selection Guide'}
                locale={locale}
                chart={chartByLocale(`flowchart TD
    A["حدد استخدامك الأساسي"] --> B{"هل تحتاج عزل ضوضاء؟"}
    B -->|نعم| C["قارن موديلات ANC ودرجة الملاءمة والبطارية"]
    B -->|لا| D{"هل الأولوية للمكالمات أم الموسيقى أم الرياضة؟"}
    D -->|مكالمات| E["راجع مواصفات الميكروفون وتعدد الأجهزة"]
    D -->|موسيقى| F["راجع الكودكات وخيارات EQ"]
    D -->|رياضة| G["راجع الثبات ومقاومة الماء"]
    C --> H["قارن السعر الحالي والتوافر وشروط الضمان"]
    E --> H
    F --> H
    G --> H

    style A fill:#8b5cf6,color:#fff,stroke:#7c3aed
    style H fill:#22c55e,color:#fff,stroke:#16a34a`, `flowchart TD
    A["Define the main use case"] --> B{"Do you need noise cancellation?"}
    B -->|Yes| C["Compare ANC models, fit, and battery specifications"]
    B -->|No| D{"Are calls, music, or exercise the priority?"}
    D -->|Calls| E["Review microphone and multipoint specifications"]
    D -->|Music| F["Review codecs and EQ options"]
    D -->|Exercise| G["Review fit and water-resistance rating"]
    C --> H["Compare current price, availability, and warranty terms"]
    E --> H
    F --> H
    G --> H

    style A fill:#8b5cf6,color:#fff,stroke:#7c3aed
    style H fill:#22c55e,color:#fff,stroke:#16a34a`)}
            />
        ),

        // How to charge power bank — lifecycle chart
        'how-to-charge-power-bank-correctly': (
            <>
                <BatteryCalculator locale={locale} />
                <MermaidDiagram
                    title={isArabic ? '🗺️ دورة حياة بطارية الباور بانك' : '🗺️ Power Bank Battery Lifecycle'}
                    locale={locale}
                    chart={chartByLocale(`flowchart LR
    A["باور بانك جديد"] --> B["استخدام وشحن وفق تعليمات الشركة"]
    B --> C["راقب مدة التشغيل والحالة الجسدية"]
    C --> D{"هل يوجد انتفاخ أو تلف أو سخونة غير معتادة؟"}
    D -->|نعم| E["توقف عن الاستخدام واطلب دعمًا مؤهلًا"]
    D -->|لا| F["استمر في الاستخدام والمراقبة"]
    G["حرارة عالية أو تفريغ متكرر"] -.-> H["قد يسرّع تآكل البطارية"]
    H -.-> C

    style A fill:#22c55e,color:#fff
    style E fill:#ef4444,color:#fff
    style F fill:#84cc16,color:#fff
    style G fill:#991b1b,color:#fff`, `flowchart LR
    A["New power bank"] --> B["Use and charge according to manufacturer guidance"]
    B --> C["Monitor runtime and physical condition"]
    C --> D{"Any swelling, damage, or unusual heat?"}
    D -->|Yes| E["Stop use and seek qualified support"]
    D -->|No| F["Continue use and monitoring"]
    G["High heat or repeated deep discharge"] -.-> H["May accelerate battery wear"]
    H -.-> C

    style A fill:#22c55e,color:#fff
    style E fill:#ef4444,color:#fff
    style F fill:#84cc16,color:#fff
    style G fill:#991b1b,color:#fff`)}
                />
            </>
        ),

        // Samsung charger article
        'best-samsung-s26-charger': (
            <ChargingSpeedCalculator locale={locale} />
        ),
    };

    const widget = widgets[slug];
    if (!widget) return null;

    return (
        <section className="mt-8">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                🧮 {isArabic ? 'أدوات تفاعلية' : 'Interactive Tools'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {isArabic
                    ? 'استخدم الأدوات التالية لمساعدتك في اتخاذ القرار الصحيح'
                    : 'Use these tools to help you make the right decision'}
            </p>
            {widget}
        </section>
    );
}

export default BlogInteractiveWidgets;
