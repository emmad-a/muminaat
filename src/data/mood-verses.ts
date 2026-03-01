import { MoodCategory, MoodVerse } from "@/types/viral";

export const MOOD_CATEGORIES: MoodCategory[] = [
  {
    id: "anxious",
    label: "Anxious",
    labelArabic: "قلق",
    icon: "😰",
    color: "from-blue-900/50 to-blue-950/50",
    description: "When your heart feels restless and worried",
  },
  {
    id: "sad",
    label: "Sad",
    labelArabic: "حزين",
    icon: "😢",
    color: "from-indigo-900/50 to-indigo-950/50",
    description: "When sorrow weighs heavy on your soul",
  },
  {
    id: "grateful",
    label: "Grateful",
    labelArabic: "شاكر",
    icon: "🤲",
    color: "from-amber-900/50 to-amber-950/50",
    description: "When you want to thank Allah for His blessings",
  },
  {
    id: "hopeful",
    label: "Hopeful",
    labelArabic: "متفائل",
    icon: "🌅",
    color: "from-emerald-900/50 to-emerald-950/50",
    description: "When you seek hope and optimism",
  },
  {
    id: "lonely",
    label: "Lonely",
    labelArabic: "وحيد",
    icon: "🌙",
    color: "from-purple-900/50 to-purple-950/50",
    description: "When you feel alone in this world",
  },
  {
    id: "angry",
    label: "Angry",
    labelArabic: "غاضب",
    icon: "😤",
    color: "from-red-900/50 to-red-950/50",
    description: "When anger takes hold of you",
  },
  {
    id: "lost",
    label: "Lost",
    labelArabic: "تائه",
    icon: "🧭",
    color: "from-slate-900/50 to-slate-950/50",
    description: "When you need direction and guidance",
  },
  {
    id: "afraid",
    label: "Afraid",
    labelArabic: "خائف",
    icon: "😨",
    color: "from-gray-900/50 to-gray-950/50",
    description: "When fear grips your heart",
  },
  {
    id: "happy",
    label: "Happy",
    labelArabic: "سعيد",
    icon: "😊",
    color: "from-yellow-900/50 to-yellow-950/50",
    description: "When joy fills your heart",
  },
  {
    id: "patient",
    label: "Need Patience",
    labelArabic: "صابر",
    icon: "⏳",
    color: "from-teal-900/50 to-teal-950/50",
    description: "When you need strength to endure",
  },
];

export const MOOD_VERSES: Record<string, MoodVerse[]> = {
  anxious: [
    { surah: 94, ayah: 5 },  // Verily, with hardship comes ease
    { surah: 94, ayah: 6 },  // Verily, with hardship comes ease
    { surah: 2, ayah: 286 }, // Allah does not burden a soul beyond that it can bear
    { surah: 13, ayah: 28 }, // Verily, in the remembrance of Allah do hearts find rest
    { surah: 65, ayah: 3 },  // Whoever relies upon Allah - then He is sufficient for him
    { surah: 3, ayah: 139 }, // Do not weaken and do not grieve
  ],
  sad: [
    { surah: 93, ayah: 3 },  // Your Lord has not forsaken you
    { surah: 93, ayah: 4 },  // And the Hereafter is better for you than the first
    { surah: 93, ayah: 5 },  // And your Lord is going to give you, and you will be satisfied
    { surah: 12, ayah: 87 }, // Do not despair of relief from Allah
    { surah: 94, ayah: 5 },  // With hardship comes ease
    { surah: 2, ayah: 155 }, // We will test you with something of fear and hunger
    { surah: 39, ayah: 53 }, // Do not despair of the mercy of Allah
  ],
  grateful: [
    { surah: 14, ayah: 7 },  // If you are grateful, I will surely increase you
    { surah: 55, ayah: 13 }, // Which of the favors of your Lord would you deny?
    { surah: 16, ayah: 18 }, // If you should count the favors of Allah, you could not enumerate them
    { surah: 31, ayah: 12 }, // Be grateful to Allah
    { surah: 2, ayah: 152 }, // Remember Me; I will remember you. Be grateful to Me
    { surah: 27, ayah: 40 }, // This is from the favor of my Lord to test me
  ],
  hopeful: [
    { surah: 2, ayah: 186 }, // I am near. I respond to the invocation of the supplicant
    { surah: 39, ayah: 53 }, // Allah forgives all sins
    { surah: 94, ayah: 5 },  // With hardship comes ease
    { surah: 65, ayah: 2 },  // He will make for him a way out
    { surah: 65, ayah: 3 },  // He provides for him from where he does not expect
    { surah: 3, ayah: 8 },   // Do not let our hearts deviate after You have guided us
  ],
  lonely: [
    { surah: 2, ayah: 186 }, // I am near
    { surah: 50, ayah: 16 }, // We are closer to him than his jugular vein
    { surah: 57, ayah: 4 },  // He is with you wherever you are
    { surah: 9, ayah: 40 },  // Do not grieve; indeed Allah is with us
    { surah: 20, ayah: 46 }, // Fear not. Indeed, I am with you both
    { surah: 29, ayah: 69 }, // Those who strive for Us — We will surely guide them
  ],
  angry: [
    { surah: 3, ayah: 134 }, // Who restrain anger and who pardon the people
    { surah: 42, ayah: 37 }, // Those who avoid the major sins and who, when angry, forgive
    { surah: 41, ayah: 34 }, // Repel evil with that which is better
    { surah: 7, ayah: 199 }, // Take what is given freely, enjoin what is good, and turn away from the ignorant
    { surah: 3, ayah: 159 }, // It was by the mercy of Allah that you were lenient with them
    { surah: 42, ayah: 43 }, // Whoever is patient and forgives — indeed, that is of the matters of determination
  ],
  lost: [
    { surah: 1, ayah: 6 },   // Guide us to the straight path
    { surah: 93, ayah: 7 },  // He found you lost and guided you
    { surah: 2, ayah: 2 },   // This is the Book about which there is no doubt, a guidance for those conscious of Allah
    { surah: 6, ayah: 125 }, // Whomever Allah wills to guide, He expands his breast to Islam
    { surah: 29, ayah: 69 }, // Those who strive for Us, We will guide them to Our ways
    { surah: 42, ayah: 52 }, // You did not know what is the Book, but We have made it a light
  ],
  afraid: [
    { surah: 2, ayah: 286 }, // Allah does not burden a soul beyond that it can bear
    { surah: 8, ayah: 46 },  // Be patient. Indeed, Allah is with the patient
    { surah: 3, ayah: 173 }, // Sufficient for us is Allah, and He is the best Disposer of affairs
    { surah: 9, ayah: 51 },  // Say, Never will we be struck except by what Allah has decreed for us
    { surah: 33, ayah: 3 },  // Rely upon Allah. And sufficient is Allah as Disposer of affairs
    { surah: 10, ayah: 62 }, // For the allies of Allah there will be no fear, nor shall they grieve
  ],
  happy: [
    { surah: 10, ayah: 58 }, // In the bounty of Allah and in His mercy — in that let them rejoice
    { surah: 30, ayah: 4 },  // And that day the believers will rejoice
    { surah: 55, ayah: 13 }, // Which of the favors of your Lord would you deny?
    { surah: 14, ayah: 7 },  // If you are grateful, I will increase you
    { surah: 93, ayah: 11 }, // But as for the favor of your Lord, report it
    { surah: 28, ayah: 77 }, // Do good as Allah has done good to you
  ],
  patient: [
    { surah: 2, ayah: 153 }, // O you who believe, seek help through patience and prayer
    { surah: 2, ayah: 155 }, // We will surely test you with something of fear and hunger
    { surah: 3, ayah: 200 }, // O you who have believed, persevere and endure
    { surah: 39, ayah: 10 }, // The patient will be given their reward without account
    { surah: 8, ayah: 46 },  // Be patient. Indeed, Allah is with the patient
    { surah: 31, ayah: 17 }, // Be patient over what befalls you. Indeed, that is of the matters of determination
  ],
};
