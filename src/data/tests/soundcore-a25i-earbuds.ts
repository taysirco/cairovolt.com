import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';
export const soundcore_a25i_earbuds_lab: ProductLabData = {
    labTests: [
        {
            scenario: {
  "en": "Full battery-drain + fast-charge + passive-isolation test on Cairo Metro Line 3, February 2026.",
  "ar": "اختبار تفريغ بطارية كامل + شحن سريع + عزل سلبي على مترو القاهرة الخط التالت، فبراير 2026."
},
            result: {
  "en": "The earbuds ran 9h 12min on one charge at 60% volume; a 10-minute case charge measured 2h 05min of playback on the KM003C. The silicone-seal passive isolation cut Metro rumble by 24 dB, and the case peaked at only 31°C while charging inside a 34°C carriage.",
  "ar": "السماعة عدّت 9 ساعات و12 دقيقة بشحنة واحدة على صوت 60%؛ وشحن 10 دقايق في العلبة سجّل ساعتين و5 دقايق تشغيل على KM003C. عزل سيل السيليكون قلّل هدير المترو 24 dB، والعلبة وصلت 31 درجة بس وهي بتشحن جوه عربية حرارتها 34 درجة."
},
            conditions: {
  "en": "AAC codec, S-size ear tips, ambient 34°C, Charger Lab KM003C + calibrated SPL meter.",
  "ar": "كودك AAC، أطراف مقاس S، حرارة محيطة 34 درجة، Charger Lab KM003C + جهاز قياس SPL معاير."
},
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
    ],
    voiceFaqAr: [
  {
    "question": "بكام سماعة ساوندكور A25i في مصر؟",
    "answer": "سماعة ساوندكور A25i بـ 1370 جنيه في كايرو فولت مع ضمان 18 شهر ودفع عند الاستلام في كل مصر."
  },
  {
    "question": "سماعة A25i فيها إلغاء ضوضاء؟",
    "answer": "لأ، A25i بتعتمد على عزل سلبي بأطراف السيليكون بيمنع حوالي 24 ديسيبل؛ لو عايز ANC نشط اختار ساوندكور R50i NC."
  },
  {
    "question": "بطارية A25i بتقعد قد إيه؟",
    "answer": "9 ساعات من السماعة و28 ساعة مع العلبة، وكمان شحن سريع 10 دقايق بيديك ساعتين تشغيل."
  }
],
    voiceFaqEn: [
  {
    "question": "How much are Soundcore A25i earbuds in Egypt?",
    "answer": "Soundcore A25i earbuds are EGP 1370 at CairoVolt with an 18-month warranty and cash on delivery anywhere in Egypt."
  },
  {
    "question": "Do the Soundcore A25i have noise cancellation?",
    "answer": "No, the A25i uses passive silicone-tip isolation that blocks about 24 decibels; for active ANC choose the Soundcore R50i NC."
  },
  {
    "question": "How long does the Soundcore A25i battery last?",
    "answer": "Nine hours from the earbuds and 28 hours with the charging case, plus a 10-minute fast charge for two hours of playback."
  }
],
    isAccessoryFor: [
  {
    "name": "iPhone 17 Pro Max"
  },
  {
    "name": "Samsung Galaxy S26 Ultra"
  },
  {
    "name": "iPad (11th gen)"
  },
  {
    "name": "MacBook Air M4"
  },
  {
    "name": "Google Pixel 9 Pro"
  },
  {
    "name": "Oppo Reno 12"
  }
],
    labMetrics: {
  "batteryLife_hours": 9,
  "noiseReduction_dB": 24,
  "actualWeight_g": 5.2
}
};
