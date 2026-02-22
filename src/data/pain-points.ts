export interface PainPointSolution {
    id: string;
    slug: string;
    targetKeyword: {
        en: string;
        ar: string;
    };
    problemStatement: {
        en: string;
        ar: string;
    };
    engineeringExplanation: {
        en: string;
        ar: string;
    };
    recommendedProductSlugs: string[];
    relatedPainPoints: string[];
}

// Pillar 3: Micro-Intent Routing (Project Titan)
// Captures hyperspecific long-tail searches and maps them to technical solutions.
export const painPointsDB: PainPointSolution[] = [
    {
        id: 'iphone-15-overheating-car',
        slug: 'iphone-15-pro-max-car-overheating-solution',
        targetKeyword: {
            en: 'Why does my iPhone 15 Pro Max overheat in the car charger',
            ar: 'حل مشكلة سخونة الايفون 15 برو ماكس في شاحن السيارة'
        },
        problemStatement: {
            en: 'High ambient temperatures in Egypt combined with inefficient 5V/1A legacy car chargers cause thermal throttling and battery degradation in modern iPhones.',
            ar: 'درجات الحرارة المرتفعة في مصر مع استخدام شواحن سيارة قديمة (5V/1A) تسبب اختناق حراري وتدهور سريع لبطارية الآيفون.'
        },
        engineeringExplanation: {
            en: 'The solution requires a Power Delivery (PD) 3.0 certified car charger with dynamic voltage scaling (PPS). This allows the charger to negotiate the exact voltage (9V) and current required, shifting the heat generation from the phone\'s internal power management IC to the car charger itself.',
            ar: 'الحل الهندسي يكمن في استخدام شاحن سيارة يدعم تقنية Power Delivery (PD) 3.0 مع PPS. هذا يسمح بالتفاوض الدقيق على الفولتية، مما ينقل الحرارة الناتجة عن تحويل الطاقة من داخل الآيفون إلى شاحن السيارة نفسه.'
        },
        recommendedProductSlugs: [
            'joyroom-60w-car-charger',
            'joyroom-72w-car-charger'
        ],
        relatedPainPoints: ['slow-charging-maps-navigation']
    },
    {
        id: 'slow-charging-maps-navigation',
        slug: 'battery-drains-while-plugged-in-using-google-maps',
        targetKeyword: {
            en: 'Battery drains while charging when using Google Maps',
            ar: 'البطارية بتنقص والموبايل في الشاحن اثناء تشغيل الخرائط'
        },
        problemStatement: {
            en: 'Running GPS, 4G/5G data, and maximum screen brightness consumes circa 12W of power. Standard 10W chargers result in a net negative power draw (battery drain).',
            ar: 'تشغيل الـ GPS وبيانات الهاتف وأقصى سطوع للشاشة يستهلك حوالي 12 واط. استخدام شاحن تقليدي (10 واط) يؤدي إلى استنزاف مستمر للبطارية رغم توصيلها بالشاحن.'
        },
        engineeringExplanation: {
            en: 'To achieve positive net charge during intensive navigation workflows, a power source delivering a minimum of 20W PD output is mandatory. This exceeds the consumption rate and actively replenishes the cell.',
            ar: 'لتحقيق شحن إيجابي أثناء استخدام برامج الملاحة، يجب توفر مصدر طاقة يضخ 20 واط (PD) كحد أدنى. هذا يتجاوز معدل الاستهلاك المرتفع ويقوم بشحن خلية البطارية فعلياً.'
        },
        recommendedProductSlugs: [
            'joyroom-72w-car-charger',
            'joyroom-15w-magsafe-car-mount'
        ],
        relatedPainPoints: ['iphone-15-overheating-car']
    }
];

export function getPainPointBySlug(slug: string): PainPointSolution | undefined {
    return painPointsDB.find(p => p.slug === slug);
}
