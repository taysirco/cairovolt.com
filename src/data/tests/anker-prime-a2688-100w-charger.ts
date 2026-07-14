import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';
export const anker_prime_a2688_100w_charger_lab: ProductLabData = {
    labTests: [
        {
            scenario: {
  "en": "Simultaneous 3-device charging (MacBook + iPhone + earbuds) on Egypt's 220V grid.",
  "ar": "شحن 3 أجهزة مع بعض (ماك بوك + ايفون + سماعة) على كهرباء مصر 220 فولت."
},
            result: {
  "en": "A single USB-C delivered 99.8W into a MacBook Pro 14 (M3 Pro), taking it 0→52% in 30 minutes. Adding an iPhone 17 Pro Max and Soundcore earbuds, the meter rebalanced to 62W + 30W + 6W = 98W and dropped only 2W over 45 minutes. Surface peaked at 41.5°C after an hour — warm to the touch, never hot.",
  "ar": "منفذ USB-C واحد طلّع 99.8 واط للماك بوك برو 14 (M3 Pro)، وودّاه من 0 لـ52% في 30 دقيقة. لما ضفنا ايفون 17 برو ماكس وسماعة ساوندكور، جهاز القياس عاد وزّع على 62 + 30 + 6 = 98 واط ونزل 2 واط بس في 45 دقيقة. سطح الشاحن وصل أقصى 41.5 درجة بعد ساعة — دافي، عمره ما سخن."
},
            conditions: {
  "en": "Charger Lab KM003C USB-C meter, ambient 34°C, wall voltage 218-224V, CairoVolt Nasr City lab, February 2026.",
  "ar": "جهاز قياس Charger Lab KM003C على USB-C، حرارة محيطة 34 درجة، جهد الحائط 218-224 فولت، معمل كايرو فولت بمدينة نصر، فبراير 2026."
},
            expertName: EXPERTS.POWER.name,
            expertProfileUrl: EXPERTS.POWER.profileUrl,
            expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
        },
    ],
    voiceFaqAr: [
  {
    "question": "الشاحن انكر برايم 100 واط بيشحن الماك بوك في قد ايه؟",
    "answer": "شاحن انكر برايم A2688 بيشحن ماك بوك برو 14 انش M3 Pro من صفر لخمسين في المية في حوالي 30 دقيقة من منفذ USB-C واحد بكامل الـ100 واط."
  },
  {
    "question": "ينفع اسيب شاحن انكر برايم 100 واط شغال طول الليل؟",
    "answer": "ايوه. نظام ActiveShield 2.0 بيفحص الحرارة 3 مليون مرة في اليوم، فتقدر تسيب الموبايل والتابلت والسماعة بيشحنوا على الكومودينو طول الليل في مصر بأمان."
  }
],
    voiceFaqEn: [
  {
    "question": "How fast does the Anker Prime 100W charge a MacBook?",
    "answer": "The Anker Prime A2688 charges a MacBook Pro 14-inch M3 Pro from 0 to 50 percent in about 30 minutes using a single USB-C port at the full 100 watts."
  },
  {
    "question": "Is the Anker Prime 100W charger safe to leave charging overnight?",
    "answer": "Yes. Its ActiveShield 2.0 system checks temperature 3 million times a day, so you can safely charge a phone, tablet and earbuds on the nightstand overnight in Egypt."
  }
],
    isAccessoryFor: [
  {
    "name": "MacBook Pro 14\" (M3 Pro)"
  },
  {
    "name": "MacBook Air M3"
  },
  {
    "name": "iPhone 17 Pro Max"
  },
  {
    "name": "Samsung Galaxy S26 Ultra"
  },
  {
    "name": "iPad Pro M4"
  },
  {
    "name": "Dell XPS 13"
  }
],
    labMetrics: {
  "maxTemp_C": 41.5,
  "chargingSpeed_W": 100,
  "actualWeight_g": 170
}
};
