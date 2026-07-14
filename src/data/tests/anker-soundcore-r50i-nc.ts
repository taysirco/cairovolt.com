// Lab test data for: anker-soundcore-r50i-nc (ANC Earbuds)
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_soundcore_r50i_nc_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Cairo Metro noise cancellation test — Line 3 (new line) rush hour, measuring ANC effectiveness against 85dB ambient noise',
                    ar: 'اختبار عزل ضوضاء مترو القاهرة — خط 3 (الجديد) ساعة ذروة، قياس فعالية ANC ضد 85dB ضوضاء محيطة',
                },
                result: {
                    en: 'ANC reduced ambient metro noise from 85dB to approximately 52dB (33dB reduction) — sufficient to hear podcast clearly without raising volume above 40%. Transparency mode captured announcements clearly. Battery: 6 hours 20 minutes with ANC active at 60% volume. IPX5 verified: survived 30-minute simulated rain test. Ear tips maintained seal during walking/running commute.',
                    ar: 'ANC قلل ضوضاء المترو من 85dB لحوالي 52dB (تخفيض 33dB) — كافي تسمع بودكاست بوضوح بدون رفع الصوت فوق 40%. وضع الشفافية التقط الإعلانات بوضوح. البطارية: 6 ساعات و20 دقيقة مع ANC شغال على صوت 60%. IPX5 متحقق: نجح في اختبار مطر محاكى 30 دقيقة. أطراف الأذن حافظت على الإحكام أثناء المشي والجري.',
                },
                conditions: {
                    en: 'Cairo Metro Line 3, Attaba to Cairo Airport, rush hour — October 2025, 85dB ambient measured',
                    ar: 'مترو القاهرة خط 3، العتبة لمطار القاهرة، ساعة ذروة — أكتوبر 2025، 85dB ضوضاء مقاسة',
                },
                expertName: EXPERTS.AUDIO.name,
                expertProfileUrl: EXPERTS.AUDIO.profileUrl,
                expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'انكر R50i NC بتعزل ضوضاء المترو فعلاً؟',
                answer: 'أيوة! اختبرناها في مترو القاهرة خط 3 ساعة الذروة. ANC قلل الضوضاء من 85dB لـ 52dB — تقدر تسمع بودكاست على صوت 40% بس بوضوح.',
            },
            {
                question: 'البطارية بتكفي مشوار طويل مع ANC شغال؟',
                answer: '6 ساعات و20 دقيقة مع ANC شغال! يعني مشوار روح وجي للشغل ويومين كمان.',
            },
        ],
        voiceFaqEn: [
            {
                question: 'Do the Anker R50i NC actually cancel Cairo Metro noise?',
                answer: 'Yes! Tested on Metro Line 3 during rush hour. ANC reduced 85dB ambient noise to ~52dB — clear podcast listening at just 40% volume.',
            },
        ],
        isAccessoryFor: [
            { name: 'iPhone 17' },
            { name: 'Samsung Galaxy S26' },
            { name: 'iPad' },
        ],
        labMetrics: {
            noiseReduction_dB: 33,
            batteryLife_hours: 6.33,
            maxTemp_C: 30,
            actualWeight_g: 5.2,
        },
    };
