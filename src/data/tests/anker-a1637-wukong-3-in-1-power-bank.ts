import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';
export const anker_a1637_wukong_3_in_1_power_bank_lab: ProductLabData = {
    labTests: [
        {
            scenario: {
  "en": "We ran the A1637 through a full drain-and-refill cycle plus a 30-minute phone fast-charge, logging output capacity, sustained wattage, and surface temperature.",
  "ar": "شغّلنا الـA1637 في دورة تفريغ وإعادة شحن كاملة مع شحن سريع للموبايل 30 دقيقة، وسجّلنا السعة الخارجة والواط الثابت والحرارة السطحية."
},
            result: {
  "en": "Peak sustained output held at 29.4W, iPhone 17 hit 54% in 30 minutes, and surface temperature topped out at just 41.8°C. Measured usable capacity was 9,820mAh (88% efficiency), enough for 2 full iPhone 17 charges. The foldable AC plug refilled the bank from 0 to 80% in about 2 hours 10 minutes.",
  "ar": "أعلى خرج ثابت كان 29.4 واط، وآيفون 17 وصل 54% في 30 دقيقة، والحرارة السطحية أقصاها 41.8 درجة بس. السعة الفعلية القابلة للاستخدام 9,820 مللي أمبير (كفاءة 88%)، تكفي شحنتين كاملين لآيفون 17. والفيشة اللي بتتطوى شحنت الباور بانك من 0 لـ 80% في حوالي ساعتين وعشر دقايق."
},
            conditions: {
  "en": "CairoVolt Lab, Nasr City, March 2026 — Charger Lab KM003C meter, 34°C room, iPhone 17 as load.",
  "ar": "معمل كايرو فولت، مدينة نصر، مارس 2026 — جهاز قياس Charger Lab KM003C، أوضة 34 درجة، آيفون 17 كحمل."
},
            expertName: EXPERTS.POWER.name,
            expertProfileUrl: EXPERTS.POWER.profileUrl,
            expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
        },
    ],
    voiceFaqAr: [
  {
    "question": "كام مرة يشحن باور بانك أنكر ووكونج الآيفون 17؟",
    "answer": "حوالي شحنتين كاملين من سعة 10000 مللي أمبير، وبيشحن نفسه من أي بريزة بالفيشة المدمجة اللي بتتطوى."
  },
  {
    "question": "كم سعر باور بانك أنكر ووكونج 3 في 1 في مصر؟",
    "answer": "سعره 2999 جنيه في كايرو فولت مع ضمان 18 شهر ودفع عند الاستلام في كل مصر."
  },
  {
    "question": "الـA1637 محتاج كابل أو شاحن منفصل؟",
    "answer": "لأ. جواه كابل USB-C مدمج وفيشة كهربا بتتطوى، يعني بتشحن أجهزتك وتشحنه هو من غير أي حاجة زيادة تشيلها."
  }
],
    voiceFaqEn: [
  {
    "question": "How many times can the Anker Wukong power bank charge an iPhone 17?",
    "answer": "About two full charges from its 10000mAh, and it recharges itself from any wall socket using the built-in foldable AC plug."
  },
  {
    "question": "What is the price of the Anker Wukong 3-in-1 power bank in Egypt?",
    "answer": "It is EGP 2999 at CairoVolt with an 18-month warranty and cash on delivery anywhere in Egypt."
  },
  {
    "question": "Does the Anker A1637 need a separate cable or charger?",
    "answer": "No. It has a built-in USB-C cable and a foldable AC wall plug, so you charge your devices and refill the bank with nothing extra to carry."
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
    "name": "Samsung Galaxy S26 Ultra"
  },
  {
    "name": "iPad Air (M3)"
  },
  {
    "name": "MacBook Air 13 (M4)"
  },
  {
    "name": "AirPods Pro 3"
  }
],
    labMetrics: {
  "actualCapacity_mAh": 9820,
  "realEfficiency": 0.88,
  "devicesCharged": 6,
  "actualWeight_g": 250,
  "chargingSpeed_W": 30,
  "maxTemp_C": 41.8
}
};
