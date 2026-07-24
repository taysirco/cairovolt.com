export interface UserSolution {
    id: string;
    slug: string;
    searchQuery: {
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
    /** Related solution slugs (same field as URL segment), never internal ids. */
    relatedSolutions: string[];
}

// Solution Routing
// Captures specific user questions and maps them to technical solutions.
// recommendedProductSlugs MUST be active catalog SKUs that match the engineering claim.
export const solutionsDB: UserSolution[] = [
    {
        id: 'iphone-15-overheating-car',
        slug: 'iphone-15-pro-max-car-overheating-solution',
        searchQuery: {
            en: 'Why does my iPhone 15 Pro Max overheat in the car charger',
            ar: 'حل مشكلة سخونة الايفون 15 برو ماكس في شاحن السيارة'
        },
        problemStatement: {
            en: 'High ambient temperatures in Egypt combined with inefficient 5V/1A legacy car chargers cause thermal throttling and battery degradation in modern iPhones.',
            ar: 'درجات الحرارة المرتفعة في مصر مع استخدام شواحن سيارة قديمة (5V/1A) تسبب اختناق حراري وتدهور سريع لبطارية الآيفون.'
        },
        engineeringExplanation: {
            en: 'The solution requires a Power Delivery (PD) 3.0 car charger with PPS where the phone supports it, so the charger negotiates voltage/current and shifts conversion heat off the phone’s power-management IC. Pair it with a USB-C cable rated for the negotiated power — a USB-A-only car adapter cannot provide USB-C PD/PPS.',
            ar: 'الحل يتطلب شاحن سيارة USB-C بدعم Power Delivery (PD) 3.0 وPPS إن كان الهاتف يدعمها، حتى يتفاوض الشاحن على الجهد/التيار وينقل حرارة التحويل بعيدًا عن دائرة إدارة الطاقة داخل الهاتف. اربطه بكابل USB-C يتحمل القدرة المتفاوض عليها — شاحن سيارة USB-A فقط لا يوفّر USB-C PD/PPS.'
        },
        recommendedProductSlugs: [
            'joyroom-60w-car-charger',
            'joyroom-usb-c-cable-60w',
        ],
        relatedSolutions: ['battery-drains-while-plugged-in-using-google-maps']
    },
    {
        id: 'slow-charging-maps-navigation',
        slug: 'battery-drains-while-plugged-in-using-google-maps',
        searchQuery: {
            en: 'Battery drains while charging when using Google Maps',
            ar: 'البطارية بتنقص والموبايل في الشاحن اثناء تشغيل الخرائط'
        },
        problemStatement: {
            en: 'Running GPS, 4G/5G data, and maximum screen brightness consumes circa 12W of power. Standard 10W chargers result in a net negative power draw (battery drain).',
            ar: 'تشغيل الـ GPS وبيانات الهاتف وأقصى سطوع للشاشة يستهلك حوالي 12 واط. استخدام شاحن تقليدي (10 واط) يؤدي إلى استنزاف مستمر للبطارية رغم توصيلها بالشاحن.'
        },
        engineeringExplanation: {
            en: 'To keep a positive net charge during intensive navigation, use a USB-C PD source of at least ~20W — typically a PD car charger in the vehicle, or a ≥20W PD wall charger when parked/at home. Legacy USB-A ~10W adapters usually cannot outpace Maps + GPS + bright screen draw.',
            ar: 'للحفاظ على شحن صافٍ إيجابي أثناء الملاحة المكثفة، استخدم مصدر USB-C PD بقدرة حوالي 20 واط على الأقل — عادة شاحن سيارة PD داخل المركبة، أو شاحن حائط PD ≥20 واط عند التوقف/المنزل. محولات USB-A التقليدية ~10 واط غالبًا لا تتجاوز استهلاك الخرائط + GPS + السطوع العالي.'
        },
        recommendedProductSlugs: [
            'joyroom-60w-car-charger',
            'joyroom-20w-usb-c-charger',
        ],
        relatedSolutions: ['iphone-15-pro-max-car-overheating-solution']
    }
];

export function getSolutionBySlug(slug: string): UserSolution | undefined {
    return solutionsDB.find(p => p.slug === slug);
}

export function getSolutionByIdOrSlug(idOrSlug: string): UserSolution | undefined {
    return solutionsDB.find(p => p.slug === idOrSlug || p.id === idOrSlug);
}
