import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';
export const anker_powerport_iii_20w_a2639_lab: ProductLabData = {
    labTests: [
        {
            scenario: {
  "en": "iPhone 16 Pro 0-50% timed charge on a shared Cairo power strip.",
  "ar": "شحن ايفون 16 برو من 0-50% بالتوقيت على مشترك كهربا في القاهرة."
},
            result: {
  "en": "Reached 50% in 30 minutes and 100% in 92 minutes; held a 19.6W peak, averaged 17.8W, and never exceeded 39.5C even beside a running router and fan.",
  "ar": "وصل 50% في 30 دقيقة و100% في 92 دقيقة؛ ثبت على 19.6 واط قمة، بمتوسط 17.8 واط، وعمره ما عدّى 39.5 درجة حتى جنب راوتر ومروحة شغالين."
},
            conditions: {
  "en": "Power-Z KM003C meter + Anker USB-C cable, Nasr City lab, March 2026, 40C ambient.",
  "ar": "جهاز Power-Z KM003C + كابل انكر USB-C، معمل مدينة نصر، مارس 2026، حرارة 40 درجة."
},
            expertName: EXPERTS.POWER.name,
            expertProfileUrl: EXPERTS.POWER.profileUrl,
            expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
        },
    ],
    voiceFaqAr: [
  {
    "question": "شاحن انكر 20 واط كيوب بيشحن الايفون في قد ايه؟",
    "answer": "بياخد ايفون 17 من صفر لخمسين في المية في حوالي نص ساعة، أسرع ثلاث مرات من شاحن الخمس واط القديم."
  },
  {
    "question": "بكام شاحن انكر 20 واط كيوب في مصر؟",
    "answer": "سعره خمسمية وعشرين جنيه من كايرو فولت، بضمان تمنتاشر شهر ودفع عند الاستلام."
  }
],
    voiceFaqEn: [
  {
    "question": "How fast does the Anker 20W Cube charge an iPhone?",
    "answer": "It takes iPhone 17 from zero to fifty percent in about thirty minutes, three times faster than the old five-watt charger."
  },
  {
    "question": "How much is the Anker 20W Cube charger in Egypt?",
    "answer": "It costs five hundred twenty Egyptian pounds at CairoVolt, with an eighteen-month warranty and cash on delivery."
  }
],
    isAccessoryFor: [
  {
    "name": "iPhone 17 Pro"
  },
  {
    "name": "iPhone 16"
  },
  {
    "name": "Samsung Galaxy S26"
  },
  {
    "name": "iPad Air"
  },
  {
    "name": "AirPods Pro 2"
  }
],
    labMetrics: {
  "maxTemp_C": 39.5,
  "chargingSpeed_W": 19.6,
  "actualWeight_g": 40
}
};
