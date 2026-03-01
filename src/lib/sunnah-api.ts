/**
 * Sunnah.com API Integration
 *
 * API Documentation: https://sunnah.api-docs.io/
 *
 * Core principles:
 * - Only fetch hadith from verified collections
 * - Always include authenticity grading
 * - Never modify or paraphrase hadith text
 */

import { HadithCitation, HadithCollection, AuthenticityGrade } from "@/types/fiqh";

const SUNNAH_API_BASE = "https://api.sunnah.com/v1";

// API key should be stored in environment variable
const getApiKey = () => process.env.NEXT_PUBLIC_SUNNAH_API_KEY || "";

// Collection slugs for Sunnah.com API
const COLLECTION_SLUGS: Record<HadithCollection, string> = {
  bukhari: "bukhari",
  muslim: "muslim",
  tirmidhi: "tirmidhi",
  abu_dawud: "abudawud",
  nasai: "nasai",
  ibn_majah: "ibnmajah",
  malik: "malik",
  ahmad: "ahmad",
  darimi: "darimi",
  other: "",
};

// Response types from Sunnah.com API
interface SunnahApiHadith {
  collection: string;
  bookNumber: string;
  chapterId: string;
  hadithNumber: string;
  hadith: {
    lang: string;
    chapterNumber: string;
    chapterTitle: string;
    urn: number;
    body: string;
    grades: Array<{
      graded_by: string;
      grade: string;
    }>;
  }[];
}

interface SunnahApiResponse {
  data: SunnahApiHadith[];
  total: number;
  limit: number;
  previous: number | null;
  next: number | null;
}

/**
 * Fetch a specific hadith from Sunnah.com
 */
export async function fetchHadith(
  collection: HadithCollection,
  hadithNumber: number | string
): Promise<HadithCitation | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("Sunnah.com API key not configured");
    return null;
  }

  const collectionSlug = COLLECTION_SLUGS[collection];
  if (!collectionSlug) {
    console.error(`Unknown collection: ${collection}`);
    return null;
  }

  try {
    const response = await fetch(
      `${SUNNAH_API_BASE}/hadiths/${collectionSlug}:${hadithNumber}`,
      {
        headers: {
          "X-API-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch hadith: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return parseHadithResponse(data, collection);
  } catch (error) {
    console.error("Error fetching hadith:", error);
    return null;
  }
}

/**
 * Search for hadith by keyword
 */
export async function searchHadith(
  query: string,
  collection?: HadithCollection,
  limit: number = 10
): Promise<HadithCitation[]> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("Sunnah.com API key not configured");
    return [];
  }

  try {
    let url = `${SUNNAH_API_BASE}/hadiths?q=${encodeURIComponent(query)}&limit=${limit}`;

    if (collection && COLLECTION_SLUGS[collection]) {
      url += `&collection=${COLLECTION_SLUGS[collection]}`;
    }

    const response = await fetch(url, {
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Failed to search hadith: ${response.status}`);
      return [];
    }

    const data: SunnahApiResponse = await response.json();
    return data.data
      .map((h) => parseHadithResponse(h, collection || "bukhari"))
      .filter((h): h is HadithCitation => h !== null);
  } catch (error) {
    console.error("Error searching hadith:", error);
    return [];
  }
}

/**
 * Fetch hadith by book and number
 */
export async function fetchHadithByBook(
  collection: HadithCollection,
  bookNumber: number,
  hadithNumber: number
): Promise<HadithCitation | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("Sunnah.com API key not configured");
    return null;
  }

  const collectionSlug = COLLECTION_SLUGS[collection];
  if (!collectionSlug) {
    console.error(`Unknown collection: ${collection}`);
    return null;
  }

  try {
    const response = await fetch(
      `${SUNNAH_API_BASE}/collections/${collectionSlug}/books/${bookNumber}/hadiths?limit=100`,
      {
        headers: {
          "X-API-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch hadith: ${response.status}`);
      return null;
    }

    const data: SunnahApiResponse = await response.json();
    const hadith = data.data.find(
      (h) => parseInt(h.hadithNumber) === hadithNumber
    );

    if (!hadith) {
      return null;
    }

    return parseHadithResponse(hadith, collection);
  } catch (error) {
    console.error("Error fetching hadith:", error);
    return null;
  }
}

/**
 * Parse Sunnah.com API response into our HadithCitation format
 */
function parseHadithResponse(
  data: SunnahApiHadith | { hadith: SunnahApiHadith["hadith"]; collection: string; hadithNumber: string },
  collection: HadithCollection
): HadithCitation | null {
  try {
    const arabicHadith = data.hadith?.find((h) => h.lang === "ar");
    const englishHadith = data.hadith?.find((h) => h.lang === "en");

    if (!englishHadith && !arabicHadith) {
      return null;
    }

    // Parse grade from the API response
    const gradeInfo = (englishHadith || arabicHadith)?.grades?.[0];
    const grade = parseGrade(gradeInfo?.grade || "");

    // Type guard for bookNumber - only exists on SunnahApiHadith
    const bookNumber = "bookNumber" in data && data.bookNumber
      ? parseInt(data.bookNumber)
      : undefined;

    return {
      collection,
      collectionName: getCollectionFullName(collection),
      bookNumber,
      bookName: englishHadith?.chapterTitle || arabicHadith?.chapterTitle,
      hadithNumber: data.hadithNumber || "",
      grade,
      gradedBy: gradeInfo?.graded_by,
      text: arabicHadith?.body,
      translation: englishHadith?.body,
      sunnahComRef: `${COLLECTION_SLUGS[collection]}:${data.hadithNumber}`,
    };
  } catch (error) {
    console.error("Error parsing hadith response:", error);
    return null;
  }
}

/**
 * Parse grade string to our AuthenticityGrade type
 */
function parseGrade(gradeStr: string): AuthenticityGrade {
  const lowerGrade = gradeStr.toLowerCase();

  if (lowerGrade.includes("sahih") && !lowerGrade.includes("da'if")) {
    return "sahih";
  }
  if (lowerGrade.includes("hasan") && !lowerGrade.includes("da'if")) {
    return "hasan";
  }
  if (lowerGrade.includes("da'if") || lowerGrade.includes("weak")) {
    return "daif";
  }
  if (lowerGrade.includes("mawdu") || lowerGrade.includes("fabricated")) {
    return "mawdu";
  }

  return "disputed";
}

/**
 * Get full collection name
 */
function getCollectionFullName(collection: HadithCollection): string {
  const names: Record<HadithCollection, string> = {
    bukhari: "Sahih al-Bukhari",
    muslim: "Sahih Muslim",
    tirmidhi: "Jami at-Tirmidhi",
    abu_dawud: "Sunan Abu Dawud",
    nasai: "Sunan an-Nasa'i",
    ibn_majah: "Sunan Ibn Majah",
    malik: "Muwatta Malik",
    ahmad: "Musnad Ahmad",
    darimi: "Sunan al-Darimi",
    other: "Other Collection",
  };
  return names[collection];
}

/**
 * Create a hadith citation manually (for offline/verified data)
 * Use this when you have verified hadith data from trusted sources
 */
export function createVerifiedHadithCitation(params: {
  collection: HadithCollection;
  bookNumber?: number;
  bookName?: string;
  hadithNumber: number | string;
  grade: AuthenticityGrade;
  gradedBy: string;
  arabicText?: string;
  englishText?: string;
  narratedBy?: string;
  notes?: string;
}): HadithCitation {
  return {
    collection: params.collection,
    collectionName: getCollectionFullName(params.collection),
    bookNumber: params.bookNumber,
    bookName: params.bookName,
    hadithNumber: params.hadithNumber,
    grade: params.grade,
    gradedBy: params.gradedBy,
    text: params.arabicText,
    translation: params.englishText,
    narratedBy: params.narratedBy,
    notes: params.notes,
    sunnahComRef: `${COLLECTION_SLUGS[params.collection]}:${params.hadithNumber}`,
  };
}

/**
 * Validate that a hadith citation has required fields
 */
export function isValidHadithCitation(citation: Partial<HadithCitation>): boolean {
  return !!(
    citation.collection &&
    citation.hadithNumber &&
    citation.grade &&
    citation.gradedBy
  );
}

/**
 * Format hadith citation for display
 */
export function formatHadithCitation(citation: HadithCitation): string {
  let formatted = `${citation.collectionName}`;

  if (citation.bookNumber) {
    formatted += `, Book ${citation.bookNumber}`;
  }

  formatted += `, Hadith ${citation.hadithNumber}`;

  if (citation.grade && citation.gradedBy) {
    formatted += ` (${citation.grade} - ${citation.gradedBy})`;
  }

  return formatted;
}
