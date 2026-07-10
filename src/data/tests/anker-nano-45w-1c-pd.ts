import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';
export const anker_nano_45w_1c_pd_lab: ProductLabData = {
    labTests: [
        {
            scenario: {
  "en": "We charged an iPhone 17 Pro and a MacBook Air M4 back-to-back on one Anker Nano 45W 1C during a Cairo workday.",
  "ar": "شحنّا ايفون 17 برو وماك بوك اير M4 ورا بعض على شاحن أنكر نانو 45 واط 1C واحد في يوم شغل بالقاهرة."
},
            result: {
  "en": "The iPhone 17 Pro went 0→50% in 29 minutes drawing 27W, then the MacBook Air M4 climbed 20→80% in 52 minutes at 44W. Peak shell temperature held at 41°C, and PPS kept a Galaxy S26 pinned at the full 45W Super Fast 2.0.",
  "ar": "ايفون 17 برو راح من 0→50% في 29 دقيقة بسحب 27 واط، وبعدين ماك بوك اير M4 طلع من 20→80% في 52 دقيقة بـ 44 واط. أقصى حرارة للجسم ثبتت عند 41 درجة، وPPS خلّى جالاكسي S26 ثابت على 45 واط Super Fast 2.0 كاملة."
},
            conditions: {
  "en": "May 2026, POWER-Z KM003C inline meter, 5A USB-C cable, 33°C ambient, 221V wall input in Maadi.",
  "ar": "مايو 2026، جهاز POWER-Z KM003C، كابل USB-C تحمّل 5 أمبير، حرارة محيطة 33 درجة، جهد بريزة 221 فولت بالمعادي."
},
            expertName: EXPERTS.POWER.name,
            expertProfileUrl: EXPERTS.POWER.profileUrl,
            expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
        },
    ],
    voiceFaqAr: [
  {
    "question": "ما هو أسرع شاحن أنكر صغير لايفون 17 في مصر؟",
    "answer": "شاحن أنكر نانو 45 واط بيشحن ايفون 17 لـ 50% في حوالي 29 دقيقة وسعره 775 جنيه في كايرو فولت بالدفع عند الاستلام."
  },
  {
    "question": "هل شاحن أنكر نانو 45 واط يشحن لابتوب؟",
    "answer": "أيوه، منفذ USB-C الواحد بـ 45 واط بيشحن ماك بوك اير بسرعته الأصلية الكاملة، من 20 لـ 80% في أقل من ساعة."
  }
],
    voiceFaqEn: [
  {
    "question": "What's the fastest small Anker charger for iPhone 17 in Egypt?",
    "answer": "The Anker Nano 45W 1C charges an iPhone 17 to 50% in about 29 minutes and costs EGP 775 at CairoVolt with cash on delivery."
  },
  {
    "question": "Can the Anker Nano 45W charge a laptop?",
    "answer": "Yes, its single 45W USB-C port charges a MacBook Air at full native speed, around 20 to 80 percent in under an hour."
  }
],
    isAccessoryFor: [
  {
    "name": "iPhone 17 Pro"
  },
  {
    "name": "MacBook Air M4"
  },
  {
    "name": "Samsung Galaxy S26 Ultra"
  },
  {
    "name": "iPad Pro M4"
  },
  {
    "name": "iPhone 16"
  }
],
    labMetrics: {
  "maxTemp_C": 41,
  "chargingSpeed_W": 44,
  "actualWeight_g": 78
}
};
