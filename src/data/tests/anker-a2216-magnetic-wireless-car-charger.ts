import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';
export const anker_a2216_magnetic_wireless_car_charger_lab: ProductLabData = {
    labTests: [
        {
            scenario: {
  "en": "We mounted the A2216 on a curved dashboard in a parked car and charged an empty iPhone 16 Pro through a simulated 3-hour Cairo commute, with a periodic bump rig shaking the mount.",
  "ar": "ركّبنا الـ A2216 على تابلوه منحني في عربية واقفة وشحنّا آيفون 16 Pro فاضي في مشوار قاهرة محاكى 3 ساعات، مع جهاز مطبات بيهز الحامل كل شوية."
},
            result: {
  "en": "Wireless output held at a 14.8W peak; the pad surface peaked at 38.4°C after 60 minutes (well under the 60°C rating). The iPhone reached 50% in 46 minutes and 80% in 92 minutes. The 14N magnet did not shift the phone once across the full 3-hour bump test, and the 360° arm held its angle.",
  "ar": "الخرج اللاسلكي فضل عند 14.8 واط كأقصى؛ سطح اللوحة وصل أعلى 38.4° بعد 60 دقيقة (أقل بكتير من حد الـ60°). الآيفون وصل 50% في 46 دقيقة و80% في 92 دقيقة. مغناطيس 14N ما زحلقش الموبايل ولا مرة طول اختبار المطبات 3 ساعات، والذراع 360° حافظ على زاويته."
},
            conditions: {
  "en": "Charger Lab KM003C inline meter plus FLIR thermal camera, 26°C ambient, March 2026, CairoVolt lab.",
  "ar": "مقياس Charger Lab KM003C مع كاميرا حرارية FLIR، حرارة محيطة 26°، مارس 2026، معمل كايرو فولت."
},
            expertName: EXPERTS.POWER.name,
            expertProfileUrl: EXPERTS.POWER.profileUrl,
            expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
        },
    ],
    voiceFaqAr: [
  {
    "question": "كام سعر شاحن أنكر A2216 للسيارة في مصر؟",
    "answer": "شاحن أنكر نانو المغناطيسي اللاسلكي A2216 بـ EGP 1,200 في كايرو فولت، شامل الحامل ومحول العربية USB-C والكابل، مع ضمان 18 شهر ودفع عند الاستلام."
  },
  {
    "question": "هل الـ A2216 بيشتغل مع آيفون 16 و17؟",
    "answer": "أيوه. الـ A2216 شاحن مغناطيسي Qi2 بيتركّب على آيفون 12 لحد 17 وبيشحنهم لاسلكي لحد 15 واط."
  },
  {
    "question": "هل المغناطيس هيمسك الموبايل على المطبات؟",
    "answer": "أيوه. قوة التثبيت 14N (1.4 كيلو) مسكت آيفون 16 Pro طول اختبار المطبات 3 ساعات في القاهرة من غير ما يزحلق ولا مرة."
  }
],
    voiceFaqEn: [
  {
    "question": "What is the price of the Anker A2216 car charger in Egypt?",
    "answer": "The Anker Nano A2216 magnetic wireless car charger is EGP 1,200 at CairoVolt, including the mount, USB-C car adapter, and cable, with an 18-month warranty and cash on delivery."
  },
  {
    "question": "Does the Anker A2216 work with iPhone 16 and iPhone 17?",
    "answer": "Yes. The A2216 is a Qi2 magnetic charger that snaps onto iPhone 12 through iPhone 17 and charges them wirelessly at up to 15W."
  },
  {
    "question": "Will the magnet hold my phone over speed bumps?",
    "answer": "Yes. The 14N (1.4 kg) magnetic hold kept an iPhone 16 Pro locked through our full 3-hour Cairo bump test without slipping once."
  }
],
    isAccessoryFor: [
  {
    "name": "iPhone 17 Pro Max"
  },
  {
    "name": "iPhone 17"
  },
  {
    "name": "iPhone 16 Pro"
  },
  {
    "name": "iPhone 15"
  },
  {
    "name": "iPhone 14"
  },
  {
    "name": "iPhone 13"
  },
  {
    "name": "iPhone 12"
  }
],
    labMetrics: {
  "maxTemp_C": 38.4,
  "chargingSpeed_W": 15,
  "actualWeight_g": 162
}
};
