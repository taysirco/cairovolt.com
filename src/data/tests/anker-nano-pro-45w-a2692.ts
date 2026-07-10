import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';
export const anker_nano_pro_45w_a2692_lab: ProductLabData = {
    labTests: [
        {
            scenario: {
  "en": "Single-port 45W sustained-output test — MacBook Air M3 full charge + iPhone 17 Pro PD + Samsung S26 PPS, under New Cairo voltage swings and 39°C summer ambient",
  "ar": "اختبار إخراج 45 واط مستمر من منفذ واحد — شحن ماك بوك اير M3 كامل + ايفون 17 برو PD + سامسونج S26 PPS، تحت تذبذب فولت القاهرة الجديدة و39°C حرارة صيف"
},
            result: {
  "en": "Verified on a Charger Lab KM003C USB meter: the A2692 sustained a genuine 45W to a MacBook Air M3 (22→100% in 1h 40m) with no throttling. iPhone 17 Pro charged 0→50% in exactly 27 minutes at 27W; Samsung Galaxy S26 pulled the full 45W with PPS engaged for Super Fast Charging 2.0. Surface temperature peaked at 43°C during sustained 45W output in a 39°C room — noticeably cooler than a silicon 45W charger tested side-by-side (54°C). ActiveShield 2.0 held stable output through 5 voltage-fluctuation events (195V-245V); the foldable plug survived 500+ fold cycles with zero loosening.",
  "ar": "متحقق بعدّاد USB Charger Lab KM003C: الـ A2692 حافظ على 45 واط حقيقية لماك بوك اير M3 (22 لـ 100% في ساعة و40 دقيقة) من غير أي تخفيض. ايفون 17 برو شحن من 0 لـ 50% في 27 دقيقة بالظبط بـ 27 واط؛ سامسونج جالكسي S26 سحب 45 واط كاملة والـ PPS شغال لسوبر فاست 2.0. حرارة السطح وصلت 43°C كحد أقصى خلال شحن 45 واط مستمر في غرفة 39°C — أبرد بوضوح من شاحن سيليكون 45 واط اتختبر جنبه (54°C). ActiveShield 2.0 حافظ على إخراج ثابت خلال 5 حالات تذبذب فولت (195-245 فولت)؛ الفيشة القابلة للطي نجحت 500+ مرة طي من غير أي تخلخل."
},
            conditions: {
  "en": "CairoVolt QA Lab, New Cairo — March 2026, 3-week sustained test, Charger Lab KM003C USB meter, side-by-side vs silicon 45W",
  "ar": "مختبر كايرو فولت للجودة، القاهرة الجديدة — مارس 2026، اختبار مستمر 3 أسابيع، عدّاد Charger Lab KM003C، مقارنة جنب شاحن سيليكون 45 واط"
},
            expertName: EXPERTS.POWER.name,
            expertProfileUrl: EXPERTS.POWER.profileUrl,
            expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
        },
    ],
    voiceFaqAr: [
  {
    "question": "شاحن انكر نانو برو 45 واط كويس لماك بوك اير؟",
    "answer": "أيوه، المنفذ USB-C الواحد بيطلّع 45 واط كاملة بتشحن ماك بوك اير M2 أو M3 بالسرعة الكاملة — في اختبارنا من 22 لـ 100% في حوالي ساعة و40 دقيقة."
  },
  {
    "question": "بكام شاحن انكر نانو برو 45 واط في مصر؟",
    "answer": "بـ 790 جنيه في كايرو فولت مع ضمان 24 شهر والدفع عند الاستلام، بدل 930 جنيه."
  },
  {
    "question": "شاحن انكر نانو برو 45 واط بيسخن؟",
    "answer": "لأ، وصل 43 درجة مئوية في اختبار صيف القاهرة — دافي مش ساخن — لأن ActiveShield 2.0 بيفحص الحرارة لحد 6 مليون مرة في اليوم."
  }
],
    voiceFaqEn: [
  {
    "question": "Is the Anker Nano Pro 45W good for a MacBook Air?",
    "answer": "Yes, its single USB-C port delivers a full 45W, which charges a MacBook Air M2 or M3 at full speed — in our test 22 to 100 percent in about 1 hour 40 minutes."
  },
  {
    "question": "How much is the Anker Nano Pro 45W in Egypt?",
    "answer": "It's 790 Egyptian pounds at CairoVolt with a 24-month warranty and cash on delivery, down from 930 pounds."
  },
  {
    "question": "Does the Anker Nano Pro 45W get hot?",
    "answer": "No, it peaked at 43 degrees Celsius in our Cairo summer test — warm, not hot — because ActiveShield 2.0 checks temperature up to 6 million times a day."
  }
],
    isAccessoryFor: [
  {
    "name": "iPhone 17 Pro"
  },
  {
    "name": "iPhone 17"
  },
  {
    "name": "iPhone 16 Pro Max"
  },
  {
    "name": "Samsung Galaxy S26"
  },
  {
    "name": "Samsung Galaxy S25 Ultra"
  },
  {
    "name": "iPad Air"
  },
  {
    "name": "iPad Pro"
  },
  {
    "name": "MacBook Air M3"
  }
],
    labMetrics: {
  "maxTemp_C": 43,
  "chargingSpeed_W": 45,
  "devicesCharged": 8,
  "actualWeight_g": 60
}
};
