import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';
export const anker_zolo_usb_c_braided_cable_lab: ProductLabData = {
    labTests: [
        {
            scenario: {
  "en": "Charging a MacBook Pro 16 (M4 Max) from a 140W GaN charger through the 1.5m Zolo cable, with a generic braided 'copy' cable tested alongside.",
  "ar": "شحن ماك بوك برو 16 (M4 Max) من شاحن GaN 140 واط عبر كابل زولو 1.5 متر، مع اختبار كابل 'تقليد' مضفر جنبه."
},
            result: {
  "en": "On the Charger Lab KM003C the Zolo negotiated PD 3.1 EPR at 28V/4.93A and held 138W for the full 42-minute ramp, taking the MacBook 12→71%. The connector surface topped out at 41.5°C, while the generic cable beside it started at 130W, sagged to 92W, and hit 58°C. Data mode clocked 480 Mbps on a 4GB transfer.",
  "ar": "على ميتر Charger Lab KM003C اتفاوض الزولو على PD 3.1 EPR عند 28 فولت/4.93 أمبير وثبت على 138 واط طول 42 دقيقة، طلّع الماك بوك من 12 لـ 71%. سطح الموصل وصل أقصى 41.5°م، بينما الكابل التقليد جنبه بدأ 130 واط ونزل لـ 92 واط ووصل 58°م. وضع الداتا سجّل 480 ميجابت/ث في نقل 4 جيجا."
},
            conditions: {
  "en": "Nasr City lab, ambient 33°C, Charger Lab KM003C inline meter, 42-minute run, February 2026.",
  "ar": "معمل مدينة نصر، حرارة 33°م، ميتر Charger Lab KM003C على الخط، تشغيل 42 دقيقة، فبراير 2026."
},
            expertName: EXPERTS.CABLES.name,
            expertProfileUrl: EXPERTS.CABLES.profileUrl,
            expertTitle: { en: EXPERTS.CABLES.titleEn, ar: EXPERTS.CABLES.titleAr },
        },
    ],
    voiceFaqAr: [
  {
    "question": "كابل أنكر زولو كويس لشحن الماك بوك؟",
    "answer": "أيوه. بيوصّل 140 واط عبر PD 3.1، كفاية لماك بوك برو 16 بوصة بأقصى سرعة. في اختبارنا في القاهرة ثبت على 138 واط وحرارته 41.5 درجة."
  },
  {
    "question": "كام سعر كابل أنكر زولو 140 واط في مصر؟",
    "answer": "حوالي 790 جنيه في CairoVolt، مع ضمان 24 شهر ودفع عند الاستلام في أي مكان في مصر."
  }
],
    voiceFaqEn: [
  {
    "question": "Is the Anker Zolo cable good for charging a MacBook?",
    "answer": "Yes. It delivers 140W over PD 3.1, enough for a 16-inch MacBook Pro at full speed. In our Cairo test it held 138W and stayed at 41.5°C."
  },
  {
    "question": "How much is the Anker Zolo 140W cable in Egypt?",
    "answer": "It's about 790 pounds at CairoVolt, with a 24-month warranty and cash on delivery anywhere in Egypt."
  }
],
    isAccessoryFor: [
  {
    "name": "MacBook Pro 16 (M4 Max)"
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
    "name": "Steam Deck OLED"
  },
  {
    "name": "Dell XPS 15"
  }
],
    labMetrics: {
  "bendCycles": 10000,
  "maxTemp_C": 41.5,
  "chargingSpeed_W": 140,
  "actualWeight_g": 42
}
};
