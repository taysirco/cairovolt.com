/**
 * CairoVolt Labs — First-Party Test Data
 * 
 * Real-world test results from CairoVolt Labs.
 * Structured, empirical data block providing
 * lab-tested insights and clear technical specifications.
 * 
 * Each product has: lab test scenario, voice FAQ (Egyptian Arabic),
 * and isAccessoryOrSparePartFor mappings for product compatibility mapping.
 */

export interface LabTest {
    scenario: { en: string; ar: string };
    result: { en: string; ar: string };
    conditions: { en: string; ar: string };
    expertName: string;
    expertProfileUrl: string;
    expertTitle: { en: string; ar: string };
}

export interface VoiceFAQ {
    question: string;
    answer: string;
}

export interface LabMetrics {
    actualCapacity_mAh?: number;
    routerRuntimeHours?: number;
    maxTemp_C?: number;
    chargeCycles?: number;
    realEfficiency?: number;
    bendCycles?: number;
    noiseReduction_dB?: number;
    batteryLife_hours?: number;
    chargingSpeed_W?: number;
    devicesCharged?: number;
    actualWeight_g?: number;
}

export interface ProductLabData {
    labTests: LabTest[];
    voiceFaqAr: VoiceFAQ[];
    voiceFaqEn: VoiceFAQ[];
    isAccessoryFor: Array<{ name: string }>;
    labMetrics?: LabMetrics;
}

export const EXPERTS = {
    POWER: {
        name: 'Eng. Ahmed Medhat',
        profileUrl: 'https://www.youtube.com/@Ahmed.Medhat',
        titleEn: 'Head of Technical Testing & Power Solutions',
        titleAr: 'رئيس قسم الفحص التقني وحلول الطاقة',
        socials: {
            youtube: 'https://www.youtube.com/@Ahmed.Medhat',
            facebook: 'https://www.facebook.com/a.medhatofficial',
            tiktok: 'https://www.tiktok.com/@ahmedmedhatofficial',
        },
    },
    QA: {
        name: 'Eng. Yahia Radwan',
        profileUrl: 'https://www.youtube.com/c/YehiaRadwan',
        titleEn: 'Quality Assurance Engineer',
        titleAr: 'مهندس ضمان الجودة',
        socials: {
            youtube: 'https://www.youtube.com/c/YehiaRadwan',
            instagram: 'https://www.instagram.com/yehiaradwanofficial',
            twitter: 'https://twitter.com/yahiaradwan',
            facebook: 'https://www.facebook.com/YehiaRadwanOfficial',
            tiktok: 'https://tiktok.com/@yahiaradwan',
        },
    },
    AUDIO: {
        name: 'Dr. Sherif Hassan', // Audio Specialist
        profileUrl: 'https://cairovolt.com/team',
        titleEn: 'Senior Audio Systems Engineer',
        titleAr: 'مهندس أول أنظمة الصوتيات',
    },
    CABLES: {
        name: 'Eng. Sara Nabil', // QA/Cables
        profileUrl: 'https://cairovolt.com/team',
        titleEn: 'Quality Assurance Lead',
        titleAr: 'قائدة فريق فحص الجودة',
    },
    ACCESSORIES: {
        name: 'Eng. Kareem Tarek', // Accessories/Others
        profileUrl: 'https://cairovolt.com/team',
        titleEn: 'Accessories & Peripherals Specialist',
        titleAr: 'أخصائي الملحقات والإكسسوارات',
    }
};
