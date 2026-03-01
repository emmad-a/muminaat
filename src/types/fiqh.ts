export type Madhab = "hanafi" | "maliki" | "shafii" | "hanbali";

export type RulingType =
  | "wajib"      // Obligatory
  | "mustahab"   // Recommended
  | "mubah"      // Permissible
  | "makruh"     // Disliked
  | "haram";     // Forbidden

export type AuthenticityGrade =
  | "sahih"           // Authentic
  | "hasan"           // Good
  | "daif"            // Weak
  | "mawdu"           // Fabricated
  | "disputed";       // Authenticity disputed among scholars

export type HadithCollection =
  | "bukhari"         // Sahih al-Bukhari
  | "muslim"          // Sahih Muslim
  | "tirmidhi"        // Jami at-Tirmidhi
  | "abu_dawud"       // Sunan Abu Dawud
  | "nasai"           // Sunan an-Nasa'i
  | "ibn_majah"       // Sunan Ibn Majah
  | "malik"           // Muwatta Imam Malik
  | "ahmad"           // Musnad Ahmad
  | "darimi"          // Sunan al-Darimi
  | "other";          // Other collections

// Verified Quran citation
export interface QuranCitation {
  surah: number;
  ayah: number | [number, number]; // Single ayah or range
  text?: string;                    // Arabic text (fetched from API)
  translation?: string;             // English translation
}

// Verified Hadith citation with full authentication
export interface HadithCitation {
  collection: HadithCollection;
  collectionName: string;           // Full name: "Sahih al-Bukhari"
  bookNumber?: number;
  bookName?: string;
  hadithNumber: number | string;
  grade: AuthenticityGrade;
  gradedBy?: string;                // Scholar who graded it: "Al-Albani", "Darussalam"
  text?: string;                    // Arabic text
  translation?: string;             // English translation
  narratedBy?: string;              // "Narrated by Abu Hurairah"
  sunnahComRef?: string;            // Reference for Sunnah.com API
  notes?: string;                   // Any notes on authenticity disputes
}

// Scholar citation for fiqh rulings
export interface ScholarCitation {
  name: string;
  nameArabic?: string;
  book?: string;                    // Source book: "Al-Mughni", "Al-Hidayah"
  volume?: number;
  page?: number;
  chapter?: string;
}

// Evidence with proper citations
export interface Evidence {
  quran?: QuranCitation[];
  hadith?: HadithCitation[];
  ijma?: string;                    // Scholarly consensus description
  qiyas?: string;                   // Analogical reasoning description
  scholars?: ScholarCitation[];
  notes?: string;
}

export interface MadhabPosition {
  ruling: string;
  rulingType?: RulingType;
  evidence: string;                 // Summary of evidence (for display)
  evidenceDetails?: Evidence;       // Detailed verified citations
  details?: string;
  conditions?: string[];
  scholars?: string[];
  primarySources?: ScholarCitation[]; // Classical fiqh book sources
}

// Verification status for content review
export type VerificationStatus =
  | "verified"        // Reviewed and verified by scholars
  | "needs_review"    // Content needs scholarly review
  | "draft"           // Initial draft, not yet reviewed
  | "disputed";       // Content has disputed elements

// Scholar review tracking system
export type ReviewStatus =
  | "unreviewed"          // Not yet reviewed
  | "ai_audited"          // Checked by AI audit
  | "scholar_verified"    // Verified by a qualified scholar
  | "needs_correction";   // Flagged for correction

export type ReportType =
  | "incorrect_ruling"
  | "wrong_evidence"
  | "madhab_error"
  | "typo_formatting"
  | "other";

export interface UserReport {
  type: ReportType;
  description: string;
  date: string;          // ISO date string
  status: "pending" | "reviewed" | "resolved";
  questionId: string;
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

  // New verification fields
  verificationStatus?: VerificationStatus;
  verifiedBy?: string;              // Scholar/reviewer who verified
  verifiedDate?: string;            // ISO date string
  lastUpdated?: string;             // ISO date string

  // Primary evidence (shared across madhabs)
  primaryEvidence?: Evidence;

  // Notes for content that needs attention
  reviewNotes?: string;
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

// Hadith collection full names for display
export const HADITH_COLLECTION_NAMES: Record<HadithCollection, string> = {
  bukhari: "Sahih al-Bukhari",
  muslim: "Sahih Muslim",
  tirmidhi: "Jami at-Tirmidhi",
  abu_dawud: "Sunan Abu Dawud",
  nasai: "Sunan an-Nasa'i",
  ibn_majah: "Sunan Ibn Majah",
  malik: "Muwatta Imam Malik",
  ahmad: "Musnad Ahmad",
  darimi: "Sunan al-Darimi",
  other: "Other Collection",
};

// Authenticity grade display names
export const AUTHENTICITY_GRADES: Record<AuthenticityGrade, {
  name: string;
  nameArabic: string;
  description: string;
  color: string;
}> = {
  sahih: {
    name: "Sahih (Authentic)",
    nameArabic: "صحيح",
    description: "Meets all conditions of authenticity",
    color: "green",
  },
  hasan: {
    name: "Hasan (Good)",
    nameArabic: "حسن",
    description: "Good chain, acceptable for rulings",
    color: "blue",
  },
  daif: {
    name: "Da'if (Weak)",
    nameArabic: "ضعيف",
    description: "Weak chain, not used for rulings",
    color: "yellow",
  },
  mawdu: {
    name: "Mawdu' (Fabricated)",
    nameArabic: "موضوع",
    description: "Fabricated, rejected",
    color: "red",
  },
  disputed: {
    name: "Disputed",
    nameArabic: "مختلف فيه",
    description: "Scholars differ on authenticity",
    color: "orange",
  },
};
