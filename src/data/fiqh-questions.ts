import { FiqhQuestion, Topic } from "@/types/fiqh";

export const TOPICS: Topic[] = [
  {
    id: "purification",
    name: "Purification (Taharah)",
    nameArabic: "الطهارة",
    icon: "💧",
    description: "Rulings on wudu, ghusl, tayammum, and purity",
    questionCount: 5,
  },
  {
    id: "prayer",
    name: "Prayer (Salah)",
    nameArabic: "الصلاة",
    icon: "🕌",
    description: "Rulings on the five daily prayers and related matters",
    questionCount: 5,
  },
];

// Sample data based on "Differences in Fiqh Made Easy" and classical sources
// This is starter data - you will expand this from the PDF and other sources
export const FIQH_QUESTIONS: FiqhQuestion[] = [
  // PURIFICATION QUESTIONS
  {
    id: "wiping-socks-wudu",
    question: "Can I wipe over socks during wudu instead of washing my feet?",
    questionArabic: "هل يجوز المسح على الجوارب في الوضوء؟",
    topic: "purification",
    subtopic: "wudu",
    positions: {
      hanafi: {
        ruling: "Permissible only with thick leather socks (khuffayn)",
        rulingType: "mubah",
        evidence: "Hadith of al-Mughirah: The Prophet wiped over his khuff (Bukhari 206)",
        details: "Socks must be thick enough to walk on without tearing, cover the ankles, and stay up without being tied",
        conditions: [
          "Must be leather or thick material",
          "Must cover the ankles",
          "Must be put on while in a state of wudu",
          "Time limit: 1 day for resident, 3 days for traveler"
        ],
        scholars: ["Abu Hanifa", "Abu Yusuf", "Muhammad al-Shaybani"],
      },
      maliki: {
        ruling: "Permissible only with leather socks (khuffayn)",
        rulingType: "mubah",
        evidence: "Multiple authentic narrations of the Prophet wiping over leather socks",
        details: "The socks must be made of leather. Regular cloth or wool socks are not valid",
        conditions: [
          "Must be made of leather",
          "Must cover the area that must be washed in wudu",
          "Must be put on while in wudu"
        ],
        scholars: ["Imam Malik"],
      },
      shafii: {
        ruling: "Permissible with any thick socks that prevent water from reaching the skin",
        rulingType: "mubah",
        evidence: "General application of the hadith of al-Mughirah, plus reports of Companions wiping over jawrab (socks)",
        details: "The dominant position allows wiping over thick socks (jawrab) that are durable enough for walking",
        conditions: [
          "Must be thick enough to prevent water seeping through",
          "Must be durable for walking",
          "Must cover the obligatory areas"
        ],
        scholars: ["Imam al-Nawawi", "Imam al-Shafi'i (later position)"],
      },
      hanbali: {
        ruling: "Permissible with any socks that cover the feet and ankles",
        rulingType: "mubah",
        evidence: "Hadith of al-Mughirah and reports that the Prophet wiped over jawrabayn (socks) and na'layn (sandals)",
        details: "The most lenient position. Thin socks are also valid as long as they cover the required area",
        conditions: [
          "Must cover what is obligatory to wash",
          "Must stay on the feet normally",
          "Must be put on in a state of purity"
        ],
        scholars: ["Imam Ahmad ibn Hanbal", "Ibn Taymiyyah", "Ibn Uthaymeen"],
      },
    },
    consensus: "All four madhabs agree that wiping over leather khuff is valid. The difference is regarding non-leather socks.",
    modernScholars: [
      "Ibn Uthaymeen (d. 2001) permitted regular cotton socks",
      "Al-Albani (d. 1999) permitted thin socks based on athar",
    ],
    sources: [
      "Sahih al-Bukhari, Hadith 206",
      "Differences in Fiqh Made Easy, p. 45-52",
    ],
  },
  {
    id: "vomit-breaks-wudu",
    question: "Does vomiting break wudu?",
    questionArabic: "هل القيء ينقض الوضوء؟",
    topic: "purification",
    subtopic: "nullifiers-of-wudu",
    positions: {
      hanafi: {
        ruling: "Yes, vomiting a mouthful or more breaks wudu",
        rulingType: "wajib",
        evidence: "Hadith: The Prophet vomited and broke his wudu (Abu Dawud, though disputed)",
        details: "A mouthful is defined as an amount that one cannot hold in the mouth without difficulty",
        conditions: [
          "Must be a mouthful or more",
          "Applies to vomit of food, water, bile, or blood"
        ],
      },
      maliki: {
        ruling: "No, vomiting does not break wudu regardless of amount",
        rulingType: "mubah",
        evidence: "The principle that only what exits from the two private parts breaks wudu",
        details: "Wudu is only broken by what exits from the front or back passages",
      },
      shafii: {
        ruling: "No, vomiting does not break wudu",
        rulingType: "mubah",
        evidence: "There is no authentic hadith establishing vomit as a nullifier of wudu",
        details: "The authentic hadiths only establish excretions from the two passages as nullifiers",
      },
      hanbali: {
        ruling: "Yes, vomiting in large amounts breaks wudu",
        rulingType: "wajib",
        evidence: "Based on the hadith reported by Abu Dawud and general principle of impure substances exiting the body",
        details: "Small amounts that do not reach the mouth are excused",
      },
    },
    consensus: "Scholars agree that blood, pus, and impurities exiting from the two passages break wudu. The disagreement is specifically about vomit.",
    sources: [
      "Sunan Abu Dawud, Hadith 2381",
      "Differences in Fiqh Made Easy, p. 23-25",
    ],
  },
  {
    id: "touching-women-wudu",
    question: "Does touching a woman break wudu?",
    questionArabic: "هل لمس المرأة ينقض الوضوء؟",
    topic: "purification",
    subtopic: "nullifiers-of-wudu",
    positions: {
      hanafi: {
        ruling: "No, touching a woman does not break wudu unless accompanied by arousal and emission",
        rulingType: "mubah",
        evidence: "Hadith that the Prophet kissed one of his wives and prayed without making wudu (Ahmad, Abu Dawud)",
        details: "Skin-to-skin contact alone is not a nullifier. Only the emission of pre-seminal fluid (madhy) breaks wudu",
      },
      maliki: {
        ruling: "Touching with desire breaks wudu; without desire it does not",
        rulingType: "wajib",
        evidence: "Interpretation of Quran 4:43 'or you touched women' combined with context of desire",
        details: "The key factor is whether the touch was accompanied by shahwa (desire). A handshake or accidental touch does not break wudu",
        conditions: [
          "Touch must be with desire/pleasure",
          "Touch must be skin-to-skin",
        ],
      },
      shafii: {
        ruling: "Any skin-to-skin touch with a marriageable woman breaks wudu",
        rulingType: "wajib",
        evidence: "Direct reading of Quran 4:43 'or you touched women' (lamastum al-nisa)",
        details: "This applies to any non-mahram woman. Touching through a barrier (cloth) does not break wudu",
        conditions: [
          "Must be skin-to-skin contact",
          "Must be with a non-mahram",
          "Does not apply to children"
        ],
        scholars: ["Imam al-Shafi'i", "Imam al-Nawawi"],
      },
      hanbali: {
        ruling: "Touching with desire breaks wudu",
        rulingType: "wajib",
        evidence: "Combining the Quranic verse with the hadith of the Prophet kissing and praying",
        details: "Similar to the Maliki position. The determining factor is desire (shahwa)",
      },
    },
    consensus: "All agree that sexual intercourse requires ghusl. The difference is about non-sexual touching.",
    sources: [
      "Quran 4:43",
      "Sunan Abu Dawud, Hadith 179",
    ],
  },

  // PRAYER QUESTIONS
  {
    id: "hands-position-prayer",
    question: "Where should I place my hands during standing (qiyam) in prayer?",
    questionArabic: "أين أضع يدي في القيام في الصلاة؟",
    topic: "prayer",
    subtopic: "postures",
    positions: {
      hanafi: {
        ruling: "Below the navel for men; on the chest for women",
        rulingType: "mustahab",
        evidence: "Hadith of Ali: 'From the Sunnah is placing the right hand over the left below the navel' (Abu Dawud)",
        details: "Right hand over left wrist, below the navel. Women place hands on chest.",
      },
      maliki: {
        ruling: "Hands should hang at the sides (sadl); placing on chest is also valid",
        rulingType: "mubah",
        evidence: "This was the practice of the people of Madinah according to Imam Malik",
        details: "Both sadl (hands at sides) and qabd (hands folded) are permissible, but sadl is the well-known position",
      },
      shafii: {
        ruling: "On the chest, below the throat and above the navel",
        rulingType: "mustahab",
        evidence: "Hadith: 'People were commanded to place the right hand on the left forearm in prayer' (Bukhari)",
        details: "Right hand grasping left wrist, placed on the upper chest",
        scholars: ["Imam al-Shafi'i", "Imam al-Nawawi"],
      },
      hanbali: {
        ruling: "On the chest or slightly below",
        rulingType: "mustahab",
        evidence: "Hadith of Wa'il ibn Hujr describing the Prophet's prayer (Sahih Ibn Khuzaymah)",
        details: "Similar to Shafi'i position, on or near the chest",
      },
    },
    consensus: "All agree that placing hands is sunnah, not obligatory. Prayer is valid regardless of hand position.",
    sources: [
      "Sahih al-Bukhari, Book of Prayer",
      "Sunan Abu Dawud, Hadith 756",
    ],
  },
  {
    id: "saying-ameen-aloud",
    question: "Should I say 'Ameen' aloud after Surah Al-Fatihah?",
    questionArabic: "هل أقول آمين جهراً بعد الفاتحة؟",
    topic: "prayer",
    subtopic: "recitation",
    positions: {
      hanafi: {
        ruling: "Say Ameen silently, even in loud prayers",
        rulingType: "mustahab",
        evidence: "Hadith: 'When the Imam says Ameen, say Ameen' — interpreted as saying it, not loudly",
        details: "The imam and followers both say Ameen quietly",
      },
      maliki: {
        ruling: "The imam says Ameen silently; followers may say it silently or not at all",
        rulingType: "mustahab",
        evidence: "Practice of the people of Madinah was to say it silently",
        details: "Some Maliki scholars say the follower should not say Ameen at all",
      },
      shafii: {
        ruling: "Say Ameen aloud in prayers where Fatihah is recited aloud",
        rulingType: "mustahab",
        evidence: "Hadith: 'When the Imam says Ameen, say Ameen, for whoever's Ameen coincides with the angels, his past sins are forgiven' (Bukhari)",
        details: "Both imam and followers say it aloud in Fajr, Maghrib, and Isha",
        scholars: ["Imam al-Shafi'i"],
      },
      hanbali: {
        ruling: "Say Ameen aloud in loud prayers",
        rulingType: "mustahab",
        evidence: "Multiple hadiths indicating the Prophet and Companions said Ameen loudly",
        details: "Similar to Shafi'i position",
      },
    },
    consensus: "All agree saying Ameen is legislated. The difference is whether it should be audible.",
    sources: [
      "Sahih al-Bukhari, Hadith 782",
      "Sahih Muslim, Hadith 410",
    ],
  },
  {
    id: "minimum-congregation-friday",
    question: "What is the minimum number of people required for Friday (Jumu'ah) prayer?",
    questionArabic: "ما هو الحد الأدنى لصلاة الجمعة؟",
    topic: "prayer",
    subtopic: "jumuah",
    positions: {
      hanafi: {
        ruling: "Three men besides the imam (total of 4)",
        rulingType: "wajib",
        evidence: "The word 'congregation' (jama'ah) requires a minimum group",
        details: "Must be adult, male, free, resident Muslims",
        conditions: [
          "Imam plus 3 followers minimum",
          "All must be male",
          "All must be residents (not travelers)"
        ],
      },
      maliki: {
        ruling: "Twelve men besides the imam (total of 13)",
        rulingType: "wajib",
        evidence: "Based on the incident where people left during the khutbah and only 12 remained",
        details: "This is for the validity of establishing Jumu'ah in a location",
      },
      shafii: {
        ruling: "Forty men including the imam",
        rulingType: "wajib",
        evidence: "The first Jumu'ah prayer in Madinah was established with 40 people",
        details: "Must be 40 adult, male, free, resident Muslims",
        conditions: [
          "Forty including imam",
          "Must remain throughout khutbah and prayer"
        ],
        scholars: ["Imam al-Shafi'i", "Imam al-Nawawi"],
      },
      hanbali: {
        ruling: "Forty men including the imam",
        rulingType: "wajib",
        evidence: "Same as Shafi'i — based on the establishment of first Jumu'ah",
        details: "Similar conditions to Shafi'i madhab",
      },
    },
    consensus: "All agree Jumu'ah requires a congregation and cannot be prayed alone. The number differs significantly.",
    sources: [
      "Sahih Muslim, Book of Jumu'ah",
      "Differences in Fiqh Made Easy, p. 156-158",
    ],
  },
];
