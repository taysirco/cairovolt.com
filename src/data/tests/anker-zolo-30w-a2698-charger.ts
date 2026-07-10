import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';
export const anker_zolo_30w_a2698_charger_lab: ProductLabData = {
    labTests: [
        {
            scenario: {
  "en": "Sustained near-30W load into a MacBook Air M4 during a 45-minute video call in a 34°C room, next to a no-name '30W GaN' rival on the same wall.",
  "ar": "حمل قريب من 30 واط لماك بوك اير M4 في مكالمة فيديو 45 دقيقة في أوضة 34°C، جنب شاحن '30 واط GaN' مجهول على نفس الحيطة."
},
            result: {
  "en": "Held 29.6W output with no throttling; surface peaked at 39°C on our FLIR camera — 22°C cooler than the rival brick, which climbed to 61°C and briefly dropped output. Even when wall voltage sagged to 205V, the Zolo never cut off.",
  "ar": "ثبت على 29.6 واط من غير ما يخفّض؛ والسطح وصل 39°C على كاميرا FLIR — أبرد بـ 22°C من الشاحن المجهول اللي وصل 61°C وخفّض الخرج لحظة. حتى لما الفولت نزل لـ 205، الزولو عمره ما فصل."
},
            conditions: {
  "en": "August 2025, Faisal, Cairo. Charger Lab KM003C + FLIR thermal camera, wall voltage dipping to 205V during peak-load evening.",
  "ar": "أغسطس 2025، فيصل، القاهرة. Charger Lab KM003C + كاميرا FLIR حرارية، والفولت بينزل لـ 205 في ذروة الأحمال بالليل."
},
            expertName: EXPERTS.POWER.name,
            expertProfileUrl: EXPERTS.POWER.profileUrl,
            expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
        },
    ],
    voiceFaqAr: [
  {
    "question": "الشاحن انكر زولو 30 واط بيشحن الايفون في قد ايه؟",
    "answer": "بيشحن الايفون 17 من صفر لـ 50% في حوالي 28 دقيقة من منفذ USB-C واحد بقوة 30 واط."
  },
  {
    "question": "شاحن انكر زولو 30 واط ينفع للماك بوك اير؟",
    "answer": "أيوه، الـ 30 واط بتاعته زي شاحن أبل الأصلي للماك بوك اير، فبيشحن الماك بوك اير 13 بوصة بأقصى سرعة."
  }
],
    voiceFaqEn: [
  {
    "question": "How fast does the Anker Zolo 30W charge an iPhone?",
    "answer": "It charges an iPhone 17 from zero to fifty percent in about 28 minutes over a single USB-C port at 30 watts."
  },
  {
    "question": "Is the Anker Zolo 30W charger good for a MacBook Air?",
    "answer": "Yes. Its 30 watts match Apple's own MacBook Air adapter, so it charges a 13-inch MacBook Air at full speed."
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
    "name": "iPad Air (M2)"
  },
  {
    "name": "MacBook Air 13\" (M4)"
  },
  {
    "name": "AirPods Pro 3"
  }
],
    labMetrics: {
  "maxTemp_C": 39,
  "chargingSpeed_W": 30,
  "actualWeight_g": 46
}
};
