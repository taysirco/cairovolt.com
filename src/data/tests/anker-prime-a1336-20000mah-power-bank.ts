import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';
export const anker_prime_a1336_20000mah_power_bank_lab: ProductLabData = {
    labTests: [
        {
            scenario: {
  "en": "Two laptops plus a phone charging at once during a simulated 3-hour blackout.",
  "ar": "لابتوبين وموبايل بيتشحنوا في نفس الوقت أثناء محاكاة انقطاع كهربا 3 ساعات."
},
            result: {
  "en": "Delivered 100W to a MacBook Pro 14 and 98W to a MacBook Air simultaneously while topping an iPhone 17 over USB-A; total draw held at 198W for 41 minutes before a gentle step-down, peak surface temperature reached 43°C, and the pack still showed 16% on its LCD after powering all three through the full 3-hour cut.",
  "ar": "وصّل 100 واط لـ ماك بوك برو 14 و98 واط لـ ماك بوك اير في نفس الوقت وهو بيشحن آيفون 17 على USB-A؛ السحب الإجمالي فضل 198 واط لمدة 41 دقيقة قبل ما ينزل بالتدريج، وأقصى حرارة سطح وصلت 43 درجة، وفضل على الشاشة 16% بعد ما شغّل التلاتة طول قطع الـ3 ساعات."
},
            conditions: {
  "en": "ChargerLAB KM003C + FNIRSI FNB58 meters, 41°C room simulating a Cairo summer, 100W Anker charger for recharge, February 2026.",
  "ar": "أجهزة ChargerLAB KM003C وFNIRSI FNB58، أوضة 41 درجة تحاكي صيف القاهرة، شاحن أنكر 100 واط لإعادة الشحن، فبراير 2026."
},
            expertName: EXPERTS.POWER.name,
            expertProfileUrl: EXPERTS.POWER.profileUrl,
            expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
        },
    ],
    voiceFaqAr: [
  {
    "question": "كم سعر باور بانك أنكر برايم 20000 في مصر؟",
    "answer": "سعره 5900 جنيه في كايرو فولت بضمان 24 شهر والدفع عند الاستلام في كل مصر، وتوصيل تاني يوم للقاهرة."
  },
  {
    "question": "أنكر A1336 يقدر يشحن لابتوب؟",
    "answer": "أيوة، كل منفذ USB-C بيطلّع لحد 100 واط، كفاية تشحن ماك بوك بسرعة قريبة من الأصلي أو تشغّل لابتوبين مع بعض بإجمالي 200 واط."
  }
],
    voiceFaqEn: [
  {
    "question": "What is the price of the Anker Prime 20,000mAh power bank in Egypt?",
    "answer": "It is EGP 5900 at CairoVolt with a 24-month warranty and cash on delivery across Egypt, plus next-day Cairo delivery."
  },
  {
    "question": "Can the Anker A1336 power bank charge a laptop?",
    "answer": "Yes. Each USB-C port delivers up to 100W, enough to charge a MacBook near adapter speed, or run two laptops together at 200W total."
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
    "name": "MacBook Air M3"
  },
  {
    "name": "MacBook Pro 14 (M4)"
  },
  {
    "name": "iPad Pro M4"
  }
],
    labMetrics: {
  "actualCapacity_mAh": 19100,
  "realEfficiency": 71,
  "devicesCharged": 5,
  "actualWeight_g": 520,
  "chargingSpeed_W": 198,
  "maxTemp_C": 43
}
};
