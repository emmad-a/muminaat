import { FiqhQuestion, Topic } from "@/types/fiqh";

export const TOPICS: Topic[] = [
  {
    id: "purification",
    name: "Purification (Taharah)",
    nameArabic: "الطهارة",
    icon: "💧",
    description: "Rulings on wudu, ghusl, tayammum, and purity",
    questionCount: 8,
  },
  {
    id: "prayer",
    name: "Prayer (Salah)",
    nameArabic: "الصلاة",
    icon: "🕌",
    description: "Rulings on the five daily prayers and related matters",
    questionCount: 8,
  },
  {
    id: "fasting",
    name: "Fasting (Sawm)",
    nameArabic: "الصيام",
    icon: "🌙",
    description: "Rulings on Ramadan fasting and related matters",
    questionCount: 4,
  },
];

// Data based on "Differences in Fiqh Made Easy" and classical sources
export const FIQH_QUESTIONS: FiqhQuestion[] = [
  // ========== PURIFICATION QUESTIONS ==========
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
  {
    id: "bleeding-breaks-wudu",
    question: "Does bleeding break wudu?",
    questionArabic: "هل خروج الدم ينقض الوضوء؟",
    topic: "purification",
    subtopic: "nullifiers-of-wudu",
    positions: {
      hanafi: {
        ruling: "Yes, bleeding that flows beyond the wound breaks wudu",
        rulingType: "wajib",
        evidence: "Hadith: The Prophet said about the one who had a nosebleed, 'Go and make wudu' (Ibn Majah)",
        details: "The blood must flow from the wound site. Blood that stays in place does not break wudu",
        conditions: [
          "Blood must flow from its point of exit",
          "Applies to blood from cuts, nosebleeds, etc."
        ],
      },
      maliki: {
        ruling: "No, bleeding does not break wudu",
        rulingType: "mubah",
        evidence: "The principle that only what exits from the two passages breaks wudu",
        details: "Blood is not considered a nullifier unless it exits from the front or back passage",
      },
      shafii: {
        ruling: "No, bleeding does not break wudu",
        rulingType: "mubah",
        evidence: "The hadith about nosebleeds is weak, and there is no authentic evidence that bleeding nullifies wudu",
        details: "Only excretions from the two passages break wudu in the Shafi'i madhab",
      },
      hanbali: {
        ruling: "Yes, copious bleeding breaks wudu",
        rulingType: "wajib",
        evidence: "Based on the hadith of nosebleeds and the principle of impure substances leaving the body",
        details: "Small amounts of blood are excused; only significant bleeding breaks wudu",
      },
    },
    consensus: "All agree that blood is impure (najis). The difference is whether its exit from the body nullifies wudu.",
    sources: [
      "Sunan Ibn Majah",
      "Differences in Fiqh Made Easy, p. 26-28",
    ],
  },
  {
    id: "eating-camel-meat-wudu",
    question: "Does eating camel meat break wudu?",
    questionArabic: "هل أكل لحم الإبل ينقض الوضوء؟",
    topic: "purification",
    subtopic: "nullifiers-of-wudu",
    positions: {
      hanafi: {
        ruling: "No, eating camel meat does not break wudu",
        rulingType: "mubah",
        evidence: "The hadith about camel meat is overruled by more general principles of wudu nullifiers",
        details: "Food consumption is not considered a nullifier of wudu in general",
      },
      maliki: {
        ruling: "No, eating camel meat does not break wudu",
        rulingType: "mubah",
        evidence: "The hadith is interpreted as a recommendation, not an obligation",
        details: "Eating any lawful food does not nullify wudu",
      },
      shafii: {
        ruling: "No, eating camel meat does not break wudu (well-known position)",
        rulingType: "mubah",
        evidence: "The hadith is interpreted as abrogated or recommended, not obligatory",
        details: "Imam al-Nawawi mentioned another position that it does break wudu, but the well-known position is that it does not",
      },
      hanbali: {
        ruling: "Yes, eating camel meat breaks wudu",
        rulingType: "wajib",
        evidence: "Hadith: A man asked the Prophet, 'Should I make wudu after eating camel meat?' He said, 'Yes' (Muslim)",
        details: "This is specific to camel meat, not other meats",
        scholars: ["Imam Ahmad ibn Hanbal", "Ibn Taymiyyah"],
      },
    },
    consensus: "This is a point of significant disagreement. Only the Hanbali madhab requires wudu after eating camel meat.",
    sources: [
      "Sahih Muslim, Hadith 360",
      "Differences in Fiqh Made Easy, p. 30-31",
    ],
  },
  {
    id: "sleeping-breaks-wudu",
    question: "Does sleeping break wudu?",
    questionArabic: "هل النوم ينقض الوضوء؟",
    topic: "purification",
    subtopic: "nullifiers-of-wudu",
    positions: {
      hanafi: {
        ruling: "Deep sleep in a reclining position breaks wudu; light sleep while sitting does not",
        rulingType: "wajib",
        evidence: "Hadith: 'The eyes are the string of the anus, so whoever sleeps should make wudu' (Abu Dawud)",
        details: "If one sleeps while sitting firmly (muta'makkin), wudu is not broken. Lying down always breaks wudu",
        conditions: [
          "Lying down breaks wudu",
          "Sitting firmly while dozing does not break wudu"
        ],
      },
      maliki: {
        ruling: "Deep, long sleep breaks wudu; light, brief sleep does not",
        rulingType: "wajib",
        evidence: "The Companions used to doze while waiting for Isha prayer and then pray without renewing wudu",
        details: "The determining factor is the depth and duration of sleep, not the position",
      },
      shafii: {
        ruling: "Any sleep other than while sitting firmly on the ground breaks wudu",
        rulingType: "wajib",
        evidence: "Combining the hadith with reports of Companions dozing while sitting",
        details: "If one's rear is firmly on the ground while sitting, sleep does not break wudu",
        conditions: [
          "Must be sitting with rear firmly on ground",
          "Sleeping in any other position breaks wudu"
        ],
        scholars: ["Imam al-Shafi'i", "Imam al-Nawawi"],
      },
      hanbali: {
        ruling: "Much sleep breaks wudu; little sleep does not, regardless of position",
        rulingType: "wajib",
        evidence: "Reports that the Prophet and Companions prayed after brief sleep without wudu",
        details: "The criterion is quantity of sleep, not position",
      },
    },
    consensus: "All agree that deep sleep breaks wudu. The difference is about the criteria: position, depth, or duration.",
    sources: [
      "Sunan Abu Dawud, Hadith 203",
      "Differences in Fiqh Made Easy, p. 19-22",
    ],
  },
  {
    id: "tayammum-conditions",
    question: "When is tayammum (dry ablution) permissible?",
    questionArabic: "متى يجوز التيمم؟",
    topic: "purification",
    subtopic: "tayammum",
    positions: {
      hanafi: {
        ruling: "When water is unavailable or using it would cause harm",
        rulingType: "mubah",
        evidence: "Quran 4:43: 'If you are ill or on a journey... and find no water, then seek clean earth'",
        details: "Includes genuine inability to find water, illness that would worsen with water use, or extreme cold",
        conditions: [
          "Must search for water first (about 400 steps / 200 meters)",
          "Illness that would worsen with water",
          "Fear of missing a time-limited prayer",
          "Extreme cold with no way to warm water"
        ],
      },
      maliki: {
        ruling: "When water is unavailable, would cause harm, or would be needed for drinking",
        rulingType: "mubah",
        evidence: "Quran 4:43 and the principle of necessity",
        details: "Also permitted when water is needed for drinking or cooking for oneself or companions",
        conditions: [
          "Absence of water within about 2 miles",
          "Illness that prohibits water use",
          "Need to preserve water for drinking"
        ],
      },
      shafii: {
        ruling: "When water is absent or using it would cause definite harm",
        rulingType: "mubah",
        evidence: "Quran 4:43 with strict interpretation of necessity",
        details: "Must be certain of harm, not merely fear of harm. Must search thoroughly for water first",
        conditions: [
          "Complete absence of water",
          "Illness with medical evidence of harm from water",
          "Must search in all directions"
        ],
        scholars: ["Imam al-Shafi'i", "Imam al-Nawawi"],
      },
      hanbali: {
        ruling: "When water is unavailable or harmful, similar to other madhabs",
        rulingType: "mubah",
        evidence: "Quran 4:43 and various hadiths on tayammum",
        details: "Includes fear of enemies at water source, or inability to reach water due to physical limitations",
        conditions: [
          "Absence of sufficient water",
          "Illness",
          "Fear of enemy or dangerous animal at water source"
        ],
      },
    },
    consensus: "All agree tayammum is permitted when water is unavailable. Differences exist in defining 'unavailable' and 'harmful.'",
    sources: [
      "Quran 4:43",
      "Differences in Fiqh Made Easy, p. 55-62",
    ],
  },
  {
    id: "ghusl-obligatory-actions",
    question: "What are the obligatory actions in ghusl (ritual bath)?",
    questionArabic: "ما هي فرائض الغسل؟",
    topic: "purification",
    subtopic: "ghusl",
    positions: {
      hanafi: {
        ruling: "Three obligations: rinsing mouth, rinsing nose, and washing entire body",
        rulingType: "wajib",
        evidence: "Hadith descriptions of the Prophet's ghusl include rinsing mouth and nose",
        details: "The mouth and nose are considered part of the body that must be washed. Intention is sunnah, not fard",
        conditions: [
          "Water must reach inside the mouth (madmadah)",
          "Water must reach inside the nose (istinshaq)",
          "Water must touch every part of the external body"
        ],
      },
      maliki: {
        ruling: "Five obligations: intention, continuity, rubbing the body, rinsing mouth, and rinsing nose",
        rulingType: "wajib",
        evidence: "The Prophet's practice included all these elements consistently",
        details: "Rubbing (dalk) the body is obligatory, not just letting water flow over it",
        conditions: [
          "Intention at the beginning",
          "Continuity without long pauses",
          "Rubbing water over the body",
          "Rinsing mouth and nose"
        ],
      },
      shafii: {
        ruling: "Two obligations: intention and washing the entire body including mouth and nose",
        rulingType: "wajib",
        evidence: "Quran 5:6: 'If you are in a state of janabah, purify yourselves' combined with hadith",
        details: "Intention is obligatory. Mouth and nose are part of the body. Rubbing is sunnah, not wajib",
        conditions: [
          "Intention",
          "Water reaching every external part including mouth and nose"
        ],
        scholars: ["Imam al-Shafi'i", "Imam al-Nawawi"],
      },
      hanbali: {
        ruling: "Two obligations: intention and washing the entire body",
        rulingType: "wajib",
        evidence: "Similar to Shafi'i reasoning from Quran and Sunnah",
        details: "Rinsing mouth and nose is obligatory as part of washing the body",
        conditions: [
          "Intention",
          "Washing every part of the body including mouth and nose"
        ],
      },
    },
    consensus: "All agree the entire body must be washed. Differences exist on whether intention, rubbing, and mouth/nose rinsing are obligatory or sunnah.",
    sources: [
      "Quran 5:6",
      "Sahih al-Bukhari, Book of Ghusl",
      "Differences in Fiqh Made Easy, p. 63-70",
    ],
  },

  // ========== PRAYER QUESTIONS ==========
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
  {
    id: "reciting-fatihah-behind-imam",
    question: "Should I recite Al-Fatihah when praying behind the imam?",
    questionArabic: "هل أقرأ الفاتحة خلف الإمام؟",
    topic: "prayer",
    subtopic: "recitation",
    positions: {
      hanafi: {
        ruling: "No, the follower should not recite anything behind the imam",
        rulingType: "makruh",
        evidence: "Hadith: 'Whoever has an imam, the imam's recitation is his recitation' (Ahmad)",
        details: "The follower listens in loud prayers and remains silent in quiet prayers. The imam's recitation suffices",
        scholars: ["Abu Hanifa", "Abu Yusuf"],
      },
      maliki: {
        ruling: "Recommended not to recite in loud prayers; permissible in quiet prayers",
        rulingType: "mustahab",
        evidence: "Quran 7:204: 'When the Quran is recited, listen to it and be silent'",
        details: "In Fajr, Maghrib, and Isha, the follower listens. In Dhuhr and Asr, recitation is permissible but not obligatory",
      },
      shafii: {
        ruling: "Obligatory to recite Al-Fatihah in every rak'ah, even behind the imam",
        rulingType: "wajib",
        evidence: "Hadith: 'There is no prayer for the one who does not recite the Opening of the Book' (Bukhari, Muslim)",
        details: "The follower must recite Fatihah in all prayers. In loud prayers, recite during the imam's pause or quietly",
        scholars: ["Imam al-Shafi'i", "Imam al-Nawawi"],
      },
      hanbali: {
        ruling: "Recommended to recite in quiet prayers; silent in loud prayers",
        rulingType: "mustahab",
        evidence: "Combining both evidences — the hadith on Fatihah and the command to listen",
        details: "In quiet prayers (Dhuhr, Asr), reciting Fatihah is recommended. In loud prayers, one should listen",
      },
    },
    consensus: "All agree on the importance of Al-Fatihah. The difference is whether the imam's recitation covers the follower.",
    sources: [
      "Sahih al-Bukhari, Hadith 756",
      "Quran 7:204",
      "Differences in Fiqh Made Easy, p. 100-105",
    ],
  },
  {
    id: "raising-hands-prayer",
    question: "When should I raise my hands (raf' al-yadayn) during prayer?",
    questionArabic: "متى أرفع يدي في الصلاة؟",
    topic: "prayer",
    subtopic: "postures",
    positions: {
      hanafi: {
        ruling: "Only at the opening takbir",
        rulingType: "mustahab",
        evidence: "Hadith of Ibn Mas'ud: He prayed and only raised his hands at the opening",
        details: "Raising hands at other points is not practiced in the Hanafi madhab",
        scholars: ["Abu Hanifa"],
      },
      maliki: {
        ruling: "Only at the opening takbir (the well-known position)",
        rulingType: "mustahab",
        evidence: "This was the practice of the people of Madinah",
        details: "Some Maliki scholars permitted raising hands at other points, but the dominant view is only at the start",
      },
      shafii: {
        ruling: "At opening takbir, before ruku', when rising from ruku', and when standing for the third rak'ah",
        rulingType: "mustahab",
        evidence: "Hadith of Ibn Umar: 'The Prophet raised his hands when he said takbir, when he bowed, and when he rose from bowing' (Bukhari)",
        details: "Hands raised to shoulder or ear level at these four points",
        conditions: [
          "At takbirat al-ihram (opening)",
          "Before going into ruku'",
          "When rising from ruku'",
          "When standing after the first tashahhud"
        ],
        scholars: ["Imam al-Shafi'i", "Imam al-Nawawi"],
      },
      hanbali: {
        ruling: "At opening, before ruku', and when rising from ruku'",
        rulingType: "mustahab",
        evidence: "Same hadith of Ibn Umar used by Shafi'is",
        details: "Three points of raising hands, similar to Shafi'i but not including standing for third rak'ah",
      },
    },
    consensus: "All agree on raising hands at the opening takbir. The difference is about other points during prayer.",
    sources: [
      "Sahih al-Bukhari, Hadith 735",
      "Differences in Fiqh Made Easy, p. 88-92",
    ],
  },
  {
    id: "qunut-fajr",
    question: "Should I recite Qunut supplication in Fajr prayer?",
    questionArabic: "هل أقرأ القنوت في صلاة الفجر؟",
    topic: "prayer",
    subtopic: "supplications",
    positions: {
      hanafi: {
        ruling: "No regular Qunut in Fajr; only Qunut al-Nazilah in times of calamity",
        rulingType: "makruh",
        evidence: "Hadith: The Prophet only did Qunut for a month to supplicate against certain tribes, then stopped",
        details: "Regular Qunut in Fajr is not established. It should only be done during major tribulations",
      },
      maliki: {
        ruling: "Qunut in Fajr is recommended (sunnah)",
        rulingType: "mustahab",
        evidence: "Hadith: 'The Prophet did not cease doing Qunut in Fajr until he left this world' (reported by some)",
        details: "Recited silently before ruku' according to the well-known position",
      },
      shafii: {
        ruling: "Qunut in Fajr is a confirmed sunnah (sunnah mu'akkadah)",
        rulingType: "mustahab",
        evidence: "Hadith of Anas: 'The Prophet did not cease doing Qunut in Fajr until he left this world'",
        details: "Recited after rising from ruku' in the second rak'ah, aloud when leading",
        scholars: ["Imam al-Shafi'i", "Imam al-Nawawi"],
      },
      hanbali: {
        ruling: "No regular Qunut in Fajr; only in times of calamity",
        rulingType: "makruh",
        evidence: "The continuous practice is not authentically established; only temporary Qunut is proven",
        details: "Similar to Hanafi position. Qunut al-Nazilah is permitted in all five prayers during hardship",
      },
    },
    consensus: "All agree on Qunut al-Nazilah (during calamities). The difference is about daily Qunut in Fajr.",
    sources: [
      "Sunan al-Nasa'i",
      "Differences in Fiqh Made Easy, p. 115-118",
    ],
  },
  {
    id: "traveler-shortening-prayer",
    question: "What distance permits shortening prayers while traveling?",
    questionArabic: "ما هي المسافة التي تبيح قصر الصلاة في السفر؟",
    topic: "prayer",
    subtopic: "travel",
    positions: {
      hanafi: {
        ruling: "Three days of travel (approximately 77-81 km or 48-50 miles)",
        rulingType: "wajib",
        evidence: "Hadith: 'It is not permissible for a woman to travel for three days except with a mahram'",
        details: "This is calculated as three days of moderate travel by traditional means (camel/walking). Shortening is obligatory, not optional",
        conditions: [
          "Distance of three days' journey",
          "Intention to travel this distance",
          "Shortening is wajib, not optional"
        ],
      },
      maliki: {
        ruling: "Four burud (approximately 77-81 km or 48-50 miles)",
        rulingType: "mubah",
        evidence: "Reports from Ibn Umar and Ibn Abbas about the distance for shortening",
        details: "Similar distance to Hanafi but the calculation method differs slightly",
      },
      shafii: {
        ruling: "Two marhalah / four burud (approximately 77-81 km or 48-50 miles)",
        rulingType: "mubah",
        evidence: "Hadith: 'Do not shorten prayers in less than four burud' (reported by al-Daraqutni)",
        details: "The distance is about 16 farsakh or two days of moderate travel",
        scholars: ["Imam al-Shafi'i", "Imam al-Nawawi"],
      },
      hanbali: {
        ruling: "Two marhalah (approximately 77-81 km or 48-50 miles)",
        rulingType: "mubah",
        evidence: "Same evidence as Shafi'i madhab",
        details: "Similar calculation to Shafi'i. Approximately 80 kilometers",
      },
    },
    consensus: "All agree that travel permits shortening prayers. The Hanafi calculation differs from the majority, though the actual distance is similar.",
    modernScholars: [
      "Many contemporary scholars use 80 km as the standard distance",
      "Some scholars permit shortening based on 'urf (custom) of what constitutes travel"
    ],
    sources: [
      "Sahih al-Bukhari, Book of Shortening Prayers",
      "Differences in Fiqh Made Easy, p. 125-130",
    ],
  },
  {
    id: "combining-prayers",
    question: "When is it permissible to combine prayers?",
    questionArabic: "متى يجوز الجمع بين الصلاتين؟",
    topic: "prayer",
    subtopic: "travel",
    positions: {
      hanafi: {
        ruling: "Only at Arafah (Dhuhr + Asr) and Muzdalifah (Maghrib + Isha) during Hajj",
        rulingType: "mubah",
        evidence: "The Prophet only combined at these two locations",
        details: "Travel alone does not permit combining. The hadith of combining while traveling is interpreted as apparent combining (one at end of time, next at beginning)",
        conditions: [
          "Only during Hajj rituals",
          "Dhuhr + Asr at Arafah",
          "Maghrib + Isha at Muzdalifah"
        ],
      },
      maliki: {
        ruling: "Permitted while traveling, in rain, illness, and other hardships",
        rulingType: "mubah",
        evidence: "Hadith of Ibn Abbas: The Prophet combined prayers without being in a state of fear or travel (Muslim)",
        details: "Can combine Dhuhr with Asr, and Maghrib with Isha. Rain and mud are valid reasons",
        conditions: [
          "Travel",
          "Rain or mud",
          "Illness",
          "Other genuine hardship"
        ],
      },
      shafii: {
        ruling: "Permitted while traveling; also in rain for Maghrib and Isha at the masjid",
        rulingType: "mubah",
        evidence: "Numerous hadiths of the Prophet combining while traveling",
        details: "Travel is the primary valid reason. Rain permits combining Maghrib and Isha only",
        conditions: [
          "Travel of sufficient distance",
          "Rain (for Maghrib + Isha only)",
          "Not permitted for illness alone in the stronger opinion"
        ],
        scholars: ["Imam al-Shafi'i", "Imam al-Nawawi"],
      },
      hanbali: {
        ruling: "Permitted for travel, illness, rain, fear, and various needs",
        rulingType: "mubah",
        evidence: "Hadith of Ibn Abbas about combining without fear or travel, plus analogy",
        details: "The most lenient position. Illness, being a caregiver, and other needs can permit combining",
        conditions: [
          "Travel",
          "Illness",
          "Rain, snow, or ice",
          "Fear or danger",
          "Nursing mother or caregiver with difficulty"
        ],
        scholars: ["Imam Ahmad ibn Hanbal", "Ibn Taymiyyah"],
      },
    },
    consensus: "All agree combining is permitted during Hajj at Arafah and Muzdalifah. The difference is about other circumstances.",
    sources: [
      "Sahih Muslim, Hadith 705",
      "Differences in Fiqh Made Easy, p. 131-138",
    ],
  },

  // ========== FASTING QUESTIONS ==========
  {
    id: "using-inhaler-while-fasting",
    question: "Does using an asthma inhaler break the fast?",
    questionArabic: "هل استخدام بخاخ الربو يفطر الصائم؟",
    topic: "fasting",
    subtopic: "invalidators",
    positions: {
      hanafi: {
        ruling: "Yes, it breaks the fast as it introduces substance into the body",
        rulingType: "haram",
        evidence: "The general principle that anything entering the body cavity breaks the fast",
        details: "Even if the amount is small, it reaches the throat and potentially the stomach",
      },
      maliki: {
        ruling: "Yes, it breaks the fast",
        rulingType: "haram",
        evidence: "Substance entering through the mouth/nose breaks the fast",
        details: "Similar reasoning to Hanafi position",
      },
      shafii: {
        ruling: "Yes, it likely breaks the fast (the cautious position)",
        rulingType: "haram",
        evidence: "The medicine enters the body through the respiratory tract",
        details: "Some contemporary Shafi'i scholars have permitted it, but the traditional position is that it breaks the fast",
      },
      hanbali: {
        ruling: "Does not break the fast according to many contemporary scholars",
        rulingType: "mubah",
        evidence: "The inhaler delivers medicine to the lungs, not the stomach",
        details: "Ibn Uthaymeen and other scholars ruled that it does not break the fast as it is not food/drink and does not reach the stomach",
        scholars: ["Ibn Uthaymeen", "Ibn Baz"],
      },
    },
    consensus: "This is a modern issue with significant scholarly disagreement. Many contemporary scholars permit it due to necessity.",
    modernScholars: [
      "Ibn Uthaymeen permitted inhalers as they deliver air and medicine to the lungs, not stomach",
      "The Islamic Fiqh Council has discussed this with varying conclusions",
      "Many scholars apply the principle of necessity for those who need it"
    ],
    sources: [
      "Fatawa Ibn Uthaymeen",
      "Contemporary Fiqh Councils",
    ],
  },
  {
    id: "blood-test-fasting",
    question: "Does having a blood test break the fast?",
    questionArabic: "هل تحليل الدم يفطر الصائم؟",
    topic: "fasting",
    subtopic: "invalidators",
    positions: {
      hanafi: {
        ruling: "No, blood extraction does not break the fast",
        rulingType: "mubah",
        evidence: "Only what enters the body breaks the fast, not what exits",
        details: "Donating blood and blood tests do not nullify the fast",
      },
      maliki: {
        ruling: "No, it does not break the fast",
        rulingType: "mubah",
        evidence: "The fast is broken by what enters, not what leaves the body",
        details: "Blood leaving does not invalidate the fast",
      },
      shafii: {
        ruling: "No, it does not break the fast",
        rulingType: "mubah",
        evidence: "Extraction of blood is not among the nullifiers of fasting",
        details: "Cupping (hijamah) is debated, but small blood extraction for tests is permitted",
        scholars: ["Imam al-Nawawi"],
      },
      hanbali: {
        ruling: "Traditional: cupping breaks the fast. Modern scholars: blood tests do not",
        rulingType: "mubah",
        evidence: "Hadith: 'The cupper and the one being cupped have both broken their fast' (Abu Dawud)",
        details: "Many Hanbali scholars distinguish between cupping (large amounts) and blood tests (small amounts)",
        scholars: ["Ibn Uthaymeen permitted blood tests", "Traditional view is stricter on cupping"],
      },
    },
    consensus: "Majority agree blood tests do not break the fast. The Hanbali position on cupping creates some nuance.",
    modernScholars: [
      "Ibn Uthaymeen: Small blood samples for tests do not break the fast",
      "Most contemporary fatwa councils permit blood tests while fasting"
    ],
    sources: [
      "Sunan Abu Dawud, Hadith 2367",
      "Fatawa al-Lajnah al-Da'imah",
    ],
  },
  {
    id: "swallowing-saliva-fasting",
    question: "Does swallowing saliva break the fast?",
    questionArabic: "هل بلع الريق يفطر؟",
    topic: "fasting",
    subtopic: "invalidators",
    positions: {
      hanafi: {
        ruling: "No, swallowing one's own pure saliva does not break the fast",
        rulingType: "mubah",
        evidence: "Saliva is naturally produced in the mouth and impossible to avoid swallowing",
        details: "Only if saliva leaves the mouth and is gathered back does it potentially break the fast",
      },
      maliki: {
        ruling: "No, normal swallowing of saliva is permitted",
        rulingType: "mubah",
        evidence: "This is unavoidable and the Shariah does not burden beyond capability",
        details: "Intentionally gathering and swallowing phlegm is different and should be avoided",
      },
      shafii: {
        ruling: "No, swallowing saliva does not break the fast",
        rulingType: "mubah",
        evidence: "Saliva originates from within the mouth and is naturally swallowed",
        details: "Even swallowing saliva that has gathered is permitted as long as it remains pure",
        scholars: ["Imam al-Nawawi"],
      },
      hanbali: {
        ruling: "No, swallowing normal saliva does not break the fast",
        rulingType: "mubah",
        evidence: "Consensus that normal bodily functions do not invalidate the fast",
        details: "Gathering saliva outside the mouth and swallowing it is makruh but does not break the fast",
      },
    },
    consensus: "All scholars agree that normal swallowing of saliva does not break the fast. It is a natural, unavoidable action.",
    sources: [
      "Various classical fiqh texts",
      "Differences in Fiqh Made Easy",
    ],
  },
  {
    id: "intention-fasting",
    question: "When must the intention (niyyah) be made for fasting?",
    questionArabic: "متى يجب تبييت نية الصيام؟",
    topic: "fasting",
    subtopic: "requirements",
    positions: {
      hanafi: {
        ruling: "Intention can be made until midday for obligatory Ramadan fasts",
        rulingType: "wajib",
        evidence: "Flexibility is given because Ramadan fasting is widely known",
        details: "For make-up fasts and vows, intention must be made the night before",
        conditions: [
          "Ramadan: can intend until Dhuhr time",
          "Make-up fasts: must intend night before",
          "Vowed fasts: must intend night before"
        ],
      },
      maliki: {
        ruling: "Intention must be made before Fajr for all obligatory fasts",
        rulingType: "wajib",
        evidence: "Hadith: 'Whoever does not intend to fast before Fajr has no fast' (Abu Dawud, Nasa'i)",
        details: "The intention must be present before dawn for the fast to be valid",
      },
      shafii: {
        ruling: "Intention must be made the night before for obligatory fasts",
        rulingType: "wajib",
        evidence: "The hadith requiring intention before Fajr",
        details: "For voluntary fasts, intention can be made during the day if nothing has been consumed",
        conditions: [
          "Obligatory: intention before Fajr",
          "Voluntary: can intend during the day"
        ],
        scholars: ["Imam al-Shafi'i", "Imam al-Nawawi"],
      },
      hanbali: {
        ruling: "Intention must be made the night before for obligatory fasts",
        rulingType: "wajib",
        evidence: "Same hadith about intending before Fajr",
        details: "For voluntary fasts, intention can be made during the day before Dhuhr",
        conditions: [
          "Obligatory: night before",
          "Voluntary: can intend before Dhuhr"
        ],
      },
    },
    consensus: "All agree intention is required. The difference is the timing for Ramadan fasts.",
    sources: [
      "Sunan Abu Dawud, Hadith 2454",
      "Sunan al-Nasa'i",
      "Differences in Fiqh Made Easy, p. 175-178",
    ],
  },
];
