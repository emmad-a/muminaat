import { FiqhQuestion, Topic } from "@/types/fiqh";
import { PURIFICATION_QUESTIONS } from "./purification";
import { PRAYER_QUESTIONS } from "./prayer";
import { FASTING_QUESTIONS } from "./fasting";
import { ZAKAT_QUESTIONS } from "./zakat";
import { HAJJ_QUESTIONS } from "./hajj";
import { MARRIAGE_QUESTIONS } from "./marriage";
import { TRANSACTIONS_QUESTIONS } from "./transactions";
import { FOOD_QUESTIONS } from "./food";
import { CLOTHING_QUESTIONS } from "./clothing";
import { OATHS_QUESTIONS } from "./oaths";
import { JUDICIARY_QUESTIONS } from "./judiciary";
import { INHERITANCE_QUESTIONS } from "./inheritance";
import { JIHAD_QUESTIONS } from "./jihad";
import { MEDICINE_QUESTIONS } from "./medicine";
import { WORSHIP_QUESTIONS } from "./worship";
import { SOCIAL_QUESTIONS } from "./social";
import { CRIMES_QUESTIONS } from "./crimes";
import { CONTEMPORARY_QUESTIONS } from "./contemporary";
import { FUNERALS_QUESTIONS } from "./funerals";
import { FAMILY_QUESTIONS } from "./family";
import { ETHICS_QUESTIONS } from "./ethics";
import { DUAS_QUESTIONS } from "./duas";
import { IJARAH_QUESTIONS } from "./ijarah";
import { WAKALAH_QUESTIONS } from "./wakalah";
import { MUDHARABAH_QUESTIONS } from "./mudharabah";
import { MUSHARAKAH_QUESTIONS } from "./musharakah";
import { WAQF_QUESTIONS } from "./waqf";
import { MUZARAAH_QUESTIONS } from "./muzaraah";
import { KAFALAH_QUESTIONS } from "./kafalah";

// Combine all questions
export const ALL_QUESTIONS: FiqhQuestion[] = [
  ...PURIFICATION_QUESTIONS,
  ...PRAYER_QUESTIONS,
  ...FASTING_QUESTIONS,
  ...ZAKAT_QUESTIONS,
  ...HAJJ_QUESTIONS,
  ...MARRIAGE_QUESTIONS,
  ...TRANSACTIONS_QUESTIONS,
  ...FOOD_QUESTIONS,
  ...CLOTHING_QUESTIONS,
  ...OATHS_QUESTIONS,
  ...JUDICIARY_QUESTIONS,
  ...INHERITANCE_QUESTIONS,
  ...JIHAD_QUESTIONS,
  ...MEDICINE_QUESTIONS,
  ...WORSHIP_QUESTIONS,
  ...SOCIAL_QUESTIONS,
  ...CRIMES_QUESTIONS,
  ...CONTEMPORARY_QUESTIONS,
  ...FUNERALS_QUESTIONS,
  ...FAMILY_QUESTIONS,
  ...ETHICS_QUESTIONS,
  ...DUAS_QUESTIONS,
  ...IJARAH_QUESTIONS,
  ...WAKALAH_QUESTIONS,
  ...MUDHARABAH_QUESTIONS,
  ...MUSHARAKAH_QUESTIONS,
  ...WAQF_QUESTIONS,
  ...MUZARAAH_QUESTIONS,
  ...KAFALAH_QUESTIONS,
];

// Count questions per topic
const countByTopic = (topic: string) =>
  ALL_QUESTIONS.filter(q => q.topic === topic).length;

// Define all topics with accurate counts
export const TOPICS: Topic[] = [
  {
    id: "purification",
    name: "Purification (Taharah)",
    nameArabic: "الطهارة",
    icon: "💧",
    description: "Rulings on wudu, ghusl, tayammum, and purity",
    questionCount: countByTopic("purification"),
  },
  {
    id: "prayer",
    name: "Prayer (Salah)",
    nameArabic: "الصلاة",
    icon: "🕌",
    description: "Rulings on the five daily prayers and related matters",
    questionCount: countByTopic("prayer"),
  },
  {
    id: "fasting",
    name: "Fasting (Sawm)",
    nameArabic: "الصيام",
    icon: "🌙",
    description: "Rulings on Ramadan fasting and voluntary fasts",
    questionCount: countByTopic("fasting"),
  },
  {
    id: "zakat",
    name: "Zakat",
    nameArabic: "الزكاة",
    icon: "💰",
    description: "Rulings on obligatory charity and wealth purification",
    questionCount: countByTopic("zakat"),
  },
  {
    id: "hajj",
    name: "Hajj & Umrah",
    nameArabic: "الحج والعمرة",
    icon: "🕋",
    description: "Rulings on pilgrimage to Makkah",
    questionCount: countByTopic("hajj"),
  },
  {
    id: "marriage",
    name: "Marriage & Divorce",
    nameArabic: "النكاح والطلاق",
    icon: "💍",
    description: "Rulings on marriage contracts, divorce, and family matters",
    questionCount: countByTopic("marriage"),
  },
  {
    id: "transactions",
    name: "Financial Transactions",
    nameArabic: "المعاملات",
    icon: "📊",
    description: "Rulings on buying, selling, riba, and business dealings",
    questionCount: countByTopic("transactions"),
  },
  {
    id: "food",
    name: "Food & Drink",
    nameArabic: "الأطعمة والأشربة",
    icon: "🍖",
    description: "Rulings on halal and haram food, slaughter, and consumption",
    questionCount: countByTopic("food"),
  },
  {
    id: "clothing",
    name: "Clothing & Adornment",
    nameArabic: "اللباس والزينة",
    icon: "👔",
    description: "Rulings on dress code, awrah, and adornment for men and women",
    questionCount: countByTopic("clothing"),
  },
  {
    id: "oaths",
    name: "Oaths & Vows",
    nameArabic: "الأيمان والنذور",
    icon: "🤝",
    description: "Rulings on swearing oaths, making vows, and expiation",
    questionCount: countByTopic("oaths"),
  },
  {
    id: "judiciary",
    name: "Judiciary & Testimony",
    nameArabic: "القضاء والشهادات",
    icon: "⚖️",
    description: "Rulings on Islamic courts, witnesses, and legal procedures",
    questionCount: countByTopic("judiciary"),
  },
  {
    id: "inheritance",
    name: "Inheritance (Mawaarith)",
    nameArabic: "المواريث",
    icon: "📜",
    description: "Rulings on Islamic inheritance law and distribution of estates",
    questionCount: countByTopic("inheritance"),
  },
  {
    id: "jihad",
    name: "Jihad & Defense",
    nameArabic: "الجهاد والدفاع",
    icon: "🛡️",
    description: "Rulings on defensive warfare, peace treaties, and conduct",
    questionCount: countByTopic("jihad"),
  },
  {
    id: "medicine",
    name: "Medical Ethics",
    nameArabic: "الطب والأخلاقيات",
    icon: "🏥",
    description: "Rulings on medical treatment, bioethics, and health matters",
    questionCount: countByTopic("medicine"),
  },
  {
    id: "worship",
    name: "Worship & Devotion",
    nameArabic: "العبادات والنوافل",
    icon: "🤲",
    description: "Rulings on du'a, dhikr, Quran recitation, and voluntary worship",
    questionCount: countByTopic("worship"),
  },
  {
    id: "social",
    name: "Social Conduct",
    nameArabic: "الآداب والمعاملات",
    icon: "👥",
    description: "Rulings on interpersonal relations, etiquette, and daily life",
    questionCount: countByTopic("social"),
  },
  {
    id: "crimes",
    name: "Crimes & Punishments",
    nameArabic: "الجنايات والعقوبات",
    icon: "⚔️",
    description: "Rulings on hudud, qisas, ta'zir, and criminal law",
    questionCount: countByTopic("crimes"),
  },
  {
    id: "contemporary",
    name: "Contemporary Issues",
    nameArabic: "القضايا المعاصرة",
    icon: "💻",
    description: "Modern fiqh issues: AI, cryptocurrency, technology, and bioethics",
    questionCount: countByTopic("contemporary"),
  },
  {
    id: "funerals",
    name: "Funerals & Burial",
    nameArabic: "الجنائز والدفن",
    icon: "🪦",
    description: "Rulings on death, washing, shrouding, prayer, and burial",
    questionCount: countByTopic("funerals"),
  },
  {
    id: "family",
    name: "Family Relations",
    nameArabic: "صلة الرحم والأسرة",
    icon: "👨‍👩‍👧‍👦",
    description: "Rulings on parent-child relations, custody, and family rights",
    questionCount: countByTopic("family"),
  },
  {
    id: "ethics",
    name: "Islamic Ethics",
    nameArabic: "الأخلاق الإسلامية",
    icon: "⭐",
    description: "Rulings on character, business ethics, environment, and moral conduct",
    questionCount: countByTopic("ethics"),
  },
  {
    id: "duas",
    name: "Duas & Adhkar",
    nameArabic: "الأدعية والأذكار",
    icon: "📿",
    description: "Rulings on supplication, remembrance, etiquette of dua, and special times",
    questionCount: countByTopic("duas"),
  },
  {
    id: "ijarah",
    name: "Ijarah (Hire & Leasing)",
    nameArabic: "الإجارة",
    icon: "🏠",
    description: "Rulings on leasing property, hiring labor, and modern lease-based Islamic finance",
    questionCount: countByTopic("ijarah"),
  },
  {
    id: "wakalah",
    name: "Wakalah (Agency & Proxy)",
    nameArabic: "الوكالة",
    icon: "🤝",
    description: "Rulings on delegation, agency contracts, and power of attorney in Islamic law",
    questionCount: countByTopic("wakalah"),
  },
  {
    id: "mudharabah",
    name: "Mudharabah (Capital-Labor Partnership)",
    nameArabic: "المضاربة",
    icon: "💼",
    description: "Rulings on profit-sharing partnerships between capital providers and entrepreneurs",
    questionCount: countByTopic("mudharabah"),
  },
  {
    id: "musharakah",
    name: "Musharakah (Joint Partnership)",
    nameArabic: "المشاركة",
    icon: "🏢",
    description: "Rulings on joint ventures, equity partnerships, and diminishing musharakah",
    questionCount: countByTopic("musharakah"),
  },
  {
    id: "waqf",
    name: "Waqf (Endowments)",
    nameArabic: "الوقف",
    icon: "🕌",
    description: "Rulings on charitable endowments, irrevocability, and modern waqf structures",
    questionCount: countByTopic("waqf"),
  },
  {
    id: "muzaraah",
    name: "Muzara'ah & Musaqah (Agricultural Contracts)",
    nameArabic: "المزارعة والمساقاة",
    icon: "🌾",
    description: "Rulings on sharecropping, irrigation partnerships, and agricultural finance",
    questionCount: countByTopic("muzaraah"),
  },
  {
    id: "kafalah",
    name: "Kafalah & Hawalah (Guaranty & Debt Transfer)",
    nameArabic: "الكفالة والحوالة",
    icon: "📋",
    description: "Rulings on suretyship, debt transfer, and modern banking guarantees",
    questionCount: countByTopic("kafalah"),
  },
];

// Export individual collections for direct access
export {
  PURIFICATION_QUESTIONS,
  PRAYER_QUESTIONS,
  FASTING_QUESTIONS,
  ZAKAT_QUESTIONS,
  HAJJ_QUESTIONS,
  MARRIAGE_QUESTIONS,
  TRANSACTIONS_QUESTIONS,
  FOOD_QUESTIONS,
  CLOTHING_QUESTIONS,
  OATHS_QUESTIONS,
  JUDICIARY_QUESTIONS,
  INHERITANCE_QUESTIONS,
  JIHAD_QUESTIONS,
  MEDICINE_QUESTIONS,
  WORSHIP_QUESTIONS,
  SOCIAL_QUESTIONS,
  CRIMES_QUESTIONS,
  CONTEMPORARY_QUESTIONS,
  FUNERALS_QUESTIONS,
  FAMILY_QUESTIONS,
  IJARAH_QUESTIONS,
  WAKALAH_QUESTIONS,
  MUDHARABAH_QUESTIONS,
  MUSHARAKAH_QUESTIONS,
  WAQF_QUESTIONS,
  MUZARAAH_QUESTIONS,
  KAFALAH_QUESTIONS,
};

// Statistics
export const STATS = {
  totalQuestions: ALL_QUESTIONS.length,
  totalTopics: TOPICS.length,
  madhabs: 4,
};

console.log(`Loaded ${ALL_QUESTIONS.length} fiqh questions across ${TOPICS.length} topics`);
