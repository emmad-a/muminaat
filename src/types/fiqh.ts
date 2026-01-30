export type Madhab = "hanafi" | "maliki" | "shafii" | "hanbali";

export type RulingType =
  | "wajib"      // Obligatory
  | "mustahab"   // Recommended
  | "mubah"      // Permissible
  | "makruh"     // Disliked
  | "haram";     // Forbidden

export interface MadhabPosition {
  ruling: string;
  rulingType?: RulingType;
  evidence: string;
  details?: string;
  conditions?: string[];
  scholars?: string[];
}

export interface FiqhQuestion {
  id: string;
  question: string;
  questionArabic?: string;
  topic: string;
  subtopic?: string;
  positions: Record<Madhab, MadhabPosition>;
  consensus?: string;
  modernScholars?: string[];
  relatedQuestions?: string[];
  sources?: string[];
}

export interface Topic {
  id: string;
  name: string;
  nameArabic?: string;
  icon: string;
  description: string;
  questionCount: number;
}

export const MADHAB_INFO: Record<Madhab, {
  name: string;
  nameArabic: string;
  founder: string;
  region: string;
  color: string;
}> = {
  hanafi: {
    name: "Hanafi",
    nameArabic: "الحنفي",
    founder: "Imam Abu Hanifa (699-767 CE)",
    region: "South Asia, Turkey, Central Asia",
    color: "emerald",
  },
  maliki: {
    name: "Maliki",
    nameArabic: "المالكي",
    founder: "Imam Malik ibn Anas (711-795 CE)",
    region: "North & West Africa, UAE",
    color: "amber",
  },
  shafii: {
    name: "Shafi'i",
    nameArabic: "الشافعي",
    founder: "Imam Al-Shafi'i (767-820 CE)",
    region: "East Africa, Southeast Asia, Egypt",
    color: "blue",
  },
  hanbali: {
    name: "Hanbali",
    nameArabic: "الحنبلي",
    founder: "Imam Ahmad ibn Hanbal (780-855 CE)",
    region: "Saudi Arabia, Qatar",
    color: "purple",
  },
};
