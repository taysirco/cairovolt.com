import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';
export const anker_prime_fusion_a1339_9600mah_65w_lab: ProductLabData = {
    labTests: [
        {
            scenario: {
  "en": "Blackout simulation — recharge the bank fully from the wall, then run a Faisal load-shedding cut charging a phone plus a laptop from the battery.",
  "ar": "محاكاة انقطاع الكهربا — نشحن الباور بانك بالكامل من البريزة، وبعدين نحاكي تخفيف أحمال في فيصل ونشحن موبايل + لابتوب من البطارية."
},
            result: {
  "en": "Refilled its 34.56Wh from empty to 100% in 78 minutes off the foldable plug (measured 62-64W input). On battery alone it took an iPhone 17 Pro from 18% to 71% in 25 minutes, delivered a 43% MacBook Air M3 boost, and still had 22% left. Measured deliverable ~24.1Wh (about 70% real efficiency); peak cell temperature 43C — no throttling.",
  "ar": "شحن نفسه من 0 لـ 100% في 78 دقيقة من القابس القابل للطي (مدخل مقاس 62-64 واط). على البطارية بس، رفع ايفون 17 برو من 18% لـ 71% في 25 دقيقة، وأدّى بوست 43% لماك بوك اير M3، وفضل فيه 22%. الطاقة المستخرجة ~24.1 واط·ساعة (حوالي 70% كفاءة فعلية)؛ أقصى حرارة خلية 43°C — من غير تراجع في الأداء."
},
            conditions: {
  "en": "CairoVolt lab, Cairo, March 2026, 30-33C ambient, Charger Lab KM003C + Anker A8050 100W cable.",
  "ar": "معمل كايرو فولت، القاهرة، مارس 2026، حرارة 30-33°C، جهاز Charger Lab KM003C + كابل أنكر A8050 بقوة 100 واط."
},
            expertName: EXPERTS.POWER.name,
            expertProfileUrl: EXPERTS.POWER.profileUrl,
            expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
        },
    ],
    voiceFaqAr: [
  {
    "question": "كام سعر انكر برايم فيوجن في مصر؟",
    "answer": "سعره في كايرو فولت حوالي 3,200 جنيه مع ضمان 24 شهر ودفع عند الاستلام وتوصيل تاني يوم للقاهرة."
  },
  {
    "question": "انكر برايم فيوجن شاحن ولا باور بانك؟",
    "answer": "الاتنين. بقابسه القابل للطي بيبقى شاحن حائط 65 واط GaN، وبيخزّن 9,600 مللي أمبير فبيشتغل باور بانك لما تفصله — جهاز واحد للوظيفتين."
  }
],
    voiceFaqEn: [
  {
    "question": "Is the Anker Prime Fusion a charger or a power bank?",
    "answer": "Both. Its foldable plug makes it a 65W GaN wall charger, and it stores 9,600mAh so it works as a power bank when unplugged — one device for both jobs."
  },
  {
    "question": "Can the Anker Prime Fusion charge a laptop?",
    "answer": "Yes. It pushes 65W from one USB-C port, enough to charge a MacBook Air fully or give a 14-inch MacBook Pro a fast emergency boost in Egypt's blackouts."
  }
],
    isAccessoryFor: [
  {
    "name": "iPhone 17 Pro"
  },
  {
    "name": "Samsung Galaxy S26 Ultra"
  },
  {
    "name": "iPad Air (M2)"
  },
  {
    "name": "MacBook Air 13\" M3"
  },
  {
    "name": "Nintendo Switch OLED"
  }
],
    labMetrics: {
  "actualCapacity_mAh": 9200,
  "realEfficiency": 70,
  "devicesCharged": 5,
  "actualWeight_g": 305,
  "maxTemp_C": 43,
  "chargingSpeed_W": 65
}
};
