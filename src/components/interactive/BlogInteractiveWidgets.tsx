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

    // Map slugs to their interactive content
    const widgets: Record<string, React.ReactNode> = {
        // Power bank buying guide — battery calculator + decision flowchart
        'best-power-bank-egypt-2026': (
            <>
                <BatteryCalculator locale={locale} />
                <MermaidDiagram
                    title={isArabic ? '🗺️ خريطة اختيار الباور بانك المناسب' : '🗺️ Power Bank Selection Flowchart'}
                    locale={locale}
                    chart={`flowchart TD
    A["What's your budget?"] --> B{"Less than 500 EGP?"}
    B -->|Yes| C["Joyroom 10000mAh\\n~450 EGP"]
    B -->|No| D{"Need to charge laptop?"}
    D -->|Yes| E["Anker Prime 27650mAh\\n3,799 EGP"]
    D -->|No| F{"Want smallest size?"}
    F -->|Yes| G["Anker Nano 10000mAh\\n1,358 EGP"]
    F -->|No| H["Anker PowerCore 20000mAh\\n1,054 EGP"]
    
    style A fill:#3b82f6,color:#fff,stroke:#2563eb
    style C fill:#ef4444,color:#fff,stroke:#dc2626
    style E fill:#3b82f6,color:#fff,stroke:#2563eb
    style G fill:#3b82f6,color:#fff,stroke:#2563eb
    style H fill:#22c55e,color:#fff,stroke:#16a34a`}
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
                    chart={`flowchart TD
    A["What devices do you charge?"] --> B{"iPhone only?"}
    B -->|Yes| C{"Want fastest speed?"}
    C -->|Yes| D["Anker 30W GaN Nano\\n549 EGP"]
    C -->|No| E["Anker 20W\\n379 EGP"]
    B -->|No| F{"iPhone + MacBook?"}
    F -->|Yes| G["Anker 65W GaN\\n999 EGP"]
    F -->|No| H["Anker 30W GaN Nano\\n549 EGP"]
    
    style A fill:#f59e0b,color:#fff,stroke:#d97706
    style D fill:#22c55e,color:#fff,stroke:#16a34a
    style E fill:#3b82f6,color:#fff,stroke:#2563eb
    style G fill:#8b5cf6,color:#fff,stroke:#7c3aed
    style H fill:#22c55e,color:#fff,stroke:#16a34a`}
                />
            </>
        ),

        // Anker vs Joyroom — comparison flowchart
        'anker-vs-joyroom-comparison': (
            <>
                <BatteryCalculator locale={locale} />
                <MermaidDiagram
                    title={isArabic ? '🗺️ أيهما تختار: Anker أم Joyroom؟' : '🗺️ Anker vs Joyroom: Which to Choose?'}
                    locale={locale}
                    chart={`flowchart TD
    A["What matters most?"] --> B{"Top quality + latest tech?"}
    B -->|Yes| C["Choose Anker"]
    B -->|No| D{"Budget is priority?"}
    D -->|Yes| E["Choose Joyroom"]
    D -->|No| F{"Need laptop charging?"}
    F -->|Yes| G["Choose Anker\\n(GaN + Prime series)"]
    F -->|No| H{"Want best earbuds?"}
    H -->|Yes| I["Choose Anker\\n(Soundcore)"]
    H -->|No| J["Choose Joyroom\\n(Great value)"]
    
    style A fill:#6366f1,color:#fff,stroke:#4f46e5
    style C fill:#3b82f6,color:#fff,stroke:#2563eb
    style E fill:#ef4444,color:#fff,stroke:#dc2626
    style G fill:#3b82f6,color:#fff,stroke:#2563eb
    style I fill:#3b82f6,color:#fff,stroke:#2563eb
    style J fill:#ef4444,color:#fff,stroke:#dc2626`}
                />
            </>
        ),

        // How to identify original Anker — verification flowchart
        'how-to-identify-original-anker': (
            <MermaidDiagram
                title={isArabic ? '🗺️ خطوات التحقق من أصالة منتج انكر' : '🗺️ Anker Authenticity Verification Steps'}
                locale={locale}
                chart={`flowchart TD
    A["Got an Anker product?"] --> B{"Has QR code?"}
    B -->|No| X1["❌ Likely FAKE"]
    B -->|Yes| C{"Scan: shows Authentic?"}
    C -->|No| X2["❌ FAKE"]
    C -->|Yes| D{"Weight matches specs?"}
    D -->|No| X3["⚠️ Suspicious"]
    D -->|Yes| E{"Smooth matte plastic?"}
    E -->|No| X4["⚠️ Suspicious"]
    E -->|Yes| F["✅ ORIGINAL"]
    
    style A fill:#3b82f6,color:#fff
    style F fill:#22c55e,color:#fff,stroke:#16a34a
    style X1 fill:#ef4444,color:#fff,stroke:#dc2626
    style X2 fill:#ef4444,color:#fff,stroke:#dc2626
    style X3 fill:#f59e0b,color:#fff,stroke:#d97706
    style X4 fill:#f59e0b,color:#fff,stroke:#d97706`}
            />
        ),

        // Bluetooth earbuds — comparison chart
        'best-bluetooth-earbuds-egypt-2026': (
            <MermaidDiagram
                title={isArabic ? '🗺️ خريطة اختيار السماعة المناسبة' : '🗺️ Earbuds Selection Guide'}
                locale={locale}
                chart={`flowchart TD
    A["What's your priority?"] --> B{"Noise Cancellation?"}
    B -->|Yes| C["Soundcore Liberty 4 NC\\n~2,500 EGP"]
    B -->|No| D{"Budget under 500 EGP?"}
    D -->|Yes| E["Joyroom T03S\\n~350 EGP"]
    D -->|No| F{"Want AirPods look?"}
    F -->|Yes| G["Joyroom T03S Pro\\n~500 EGP"]
    F -->|No| H["Soundcore R50i\\n~900 EGP"]
    
    style A fill:#8b5cf6,color:#fff,stroke:#7c3aed
    style C fill:#3b82f6,color:#fff,stroke:#2563eb
    style E fill:#ef4444,color:#fff,stroke:#dc2626
    style G fill:#ef4444,color:#fff,stroke:#dc2626
    style H fill:#3b82f6,color:#fff,stroke:#2563eb`}
            />
        ),

        // How to charge power bank — lifecycle chart
        'how-to-charge-power-bank-correctly': (
            <>
                <BatteryCalculator locale={locale} />
                <MermaidDiagram
                    title={isArabic ? '🗺️ دورة حياة بطارية الباور بانك' : '🗺️ Power Bank Battery Lifecycle'}
                    locale={locale}
                    chart={`flowchart LR
    A["New\\n100% capacity"] --> B["Year 1\\n~95% capacity"]
    B --> C["Year 2\\n~85% capacity"]
    C --> D["Year 3\\n~70% capacity"]
    D --> E["Replace?"]
    
    F["Bad habits"] -.->|"Heat + full drain"| G["Year 1\\n~60% capacity"]
    G -.-> H["Needs replacing"]
    
    style A fill:#22c55e,color:#fff
    style B fill:#84cc16,color:#fff
    style C fill:#eab308,color:#fff
    style D fill:#f97316,color:#fff
    style E fill:#ef4444,color:#fff
    style F fill:#991b1b,color:#fff
    style G fill:#ef4444,color:#fff
    style H fill:#7f1d1d,color:#fff`}
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
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {isArabic
                    ? 'استخدم الأدوات التالية لمساعدتك في اتخاذ القرار الصحيح'
                    : 'Use these tools to help you make the right decision'}
            </p>
            {widget}
        </section>
    );
}

export default BlogInteractiveWidgets;
