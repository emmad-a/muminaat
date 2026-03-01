/**
 * Quran API Integration
 *
 * Using Al-Quran Cloud API: https://alquran.cloud/api
 *
 * Core principles:
 * - Fetch authentic Quranic text from verified sources
 * - Always include both Arabic and translation
 * - Never modify or paraphrase Quranic text
 */

import { QuranCitation } from "@/types/fiqh";
import { SurahMeta, SurahData, Ayah, QuranSearchResult } from "@/types/quran";
import { getCached, setCache } from "@/lib/quran-cache";

const QURAN_API_BASE = "https://api.alquran.cloud/v1";

// Available translations
export type TranslationEdition =
  | "en.sahih"           // Saheeh International
  | "en.pickthall"       // Pickthall
  | "en.yusufali"        // Yusuf Ali
  | "en.asad"            // Muhammad Asad
  | "en.hilali"          // Hilali & Khan
  | "en.ahmedali"        // Ahmed Ali
  | "en.arberry";        // Arberry

// Surah names for reference
export const SURAH_NAMES: Record<number, { arabic: string; english: string; transliteration: string }> = {
  1: { arabic: "الفاتحة", english: "The Opening", transliteration: "Al-Fatihah" },
  2: { arabic: "البقرة", english: "The Cow", transliteration: "Al-Baqarah" },
  3: { arabic: "آل عمران", english: "Family of Imran", transliteration: "Ali 'Imran" },
  4: { arabic: "النساء", english: "The Women", transliteration: "An-Nisa" },
  5: { arabic: "المائدة", english: "The Table Spread", transliteration: "Al-Ma'idah" },
  6: { arabic: "الأنعام", english: "The Cattle", transliteration: "Al-An'am" },
  7: { arabic: "الأعراف", english: "The Heights", transliteration: "Al-A'raf" },
  8: { arabic: "الأنفال", english: "The Spoils of War", transliteration: "Al-Anfal" },
  9: { arabic: "التوبة", english: "The Repentance", transliteration: "At-Tawbah" },
  10: { arabic: "يونس", english: "Jonah", transliteration: "Yunus" },
  11: { arabic: "هود", english: "Hud", transliteration: "Hud" },
  12: { arabic: "يوسف", english: "Joseph", transliteration: "Yusuf" },
  13: { arabic: "الرعد", english: "The Thunder", transliteration: "Ar-Ra'd" },
  14: { arabic: "إبراهيم", english: "Abraham", transliteration: "Ibrahim" },
  15: { arabic: "الحجر", english: "The Rocky Tract", transliteration: "Al-Hijr" },
  16: { arabic: "النحل", english: "The Bee", transliteration: "An-Nahl" },
  17: { arabic: "الإسراء", english: "The Night Journey", transliteration: "Al-Isra" },
  18: { arabic: "الكهف", english: "The Cave", transliteration: "Al-Kahf" },
  19: { arabic: "مريم", english: "Mary", transliteration: "Maryam" },
  20: { arabic: "طه", english: "Ta-Ha", transliteration: "Ta-Ha" },
  21: { arabic: "الأنبياء", english: "The Prophets", transliteration: "Al-Anbiya" },
  22: { arabic: "الحج", english: "The Pilgrimage", transliteration: "Al-Hajj" },
  23: { arabic: "المؤمنون", english: "The Believers", transliteration: "Al-Mu'minun" },
  24: { arabic: "النور", english: "The Light", transliteration: "An-Nur" },
  25: { arabic: "الفرقان", english: "The Criterion", transliteration: "Al-Furqan" },
  26: { arabic: "الشعراء", english: "The Poets", transliteration: "Ash-Shu'ara" },
  27: { arabic: "النمل", english: "The Ant", transliteration: "An-Naml" },
  28: { arabic: "القصص", english: "The Stories", transliteration: "Al-Qasas" },
  29: { arabic: "العنكبوت", english: "The Spider", transliteration: "Al-'Ankabut" },
  30: { arabic: "الروم", english: "The Romans", transliteration: "Ar-Rum" },
  31: { arabic: "لقمان", english: "Luqman", transliteration: "Luqman" },
  32: { arabic: "السجدة", english: "The Prostration", transliteration: "As-Sajdah" },
  33: { arabic: "الأحزاب", english: "The Combined Forces", transliteration: "Al-Ahzab" },
  34: { arabic: "سبأ", english: "Sheba", transliteration: "Saba" },
  35: { arabic: "فاطر", english: "Originator", transliteration: "Fatir" },
  36: { arabic: "يس", english: "Ya-Sin", transliteration: "Ya-Sin" },
  37: { arabic: "الصافات", english: "Those who set the Ranks", transliteration: "As-Saffat" },
  38: { arabic: "ص", english: "Sad", transliteration: "Sad" },
  39: { arabic: "الزمر", english: "The Troops", transliteration: "Az-Zumar" },
  40: { arabic: "غافر", english: "The Forgiver", transliteration: "Ghafir" },
  41: { arabic: "فصلت", english: "Explained in Detail", transliteration: "Fussilat" },
  42: { arabic: "الشورى", english: "The Consultation", transliteration: "Ash-Shura" },
  43: { arabic: "الزخرف", english: "The Ornaments of Gold", transliteration: "Az-Zukhruf" },
  44: { arabic: "الدخان", english: "The Smoke", transliteration: "Ad-Dukhan" },
  45: { arabic: "الجاثية", english: "The Crouching", transliteration: "Al-Jathiyah" },
  46: { arabic: "الأحقاف", english: "The Wind-Curved Sandhills", transliteration: "Al-Ahqaf" },
  47: { arabic: "محمد", english: "Muhammad", transliteration: "Muhammad" },
  48: { arabic: "الفتح", english: "The Victory", transliteration: "Al-Fath" },
  49: { arabic: "الحجرات", english: "The Rooms", transliteration: "Al-Hujurat" },
  50: { arabic: "ق", english: "Qaf", transliteration: "Qaf" },
  51: { arabic: "الذاريات", english: "The Winnowing Winds", transliteration: "Adh-Dhariyat" },
  52: { arabic: "الطور", english: "The Mount", transliteration: "At-Tur" },
  53: { arabic: "النجم", english: "The Star", transliteration: "An-Najm" },
  54: { arabic: "القمر", english: "The Moon", transliteration: "Al-Qamar" },
  55: { arabic: "الرحمن", english: "The Beneficent", transliteration: "Ar-Rahman" },
  56: { arabic: "الواقعة", english: "The Inevitable", transliteration: "Al-Waqi'ah" },
  57: { arabic: "الحديد", english: "The Iron", transliteration: "Al-Hadid" },
  58: { arabic: "المجادلة", english: "The Pleading Woman", transliteration: "Al-Mujadila" },
  59: { arabic: "الحشر", english: "The Exile", transliteration: "Al-Hashr" },
  60: { arabic: "الممتحنة", english: "She that is to be examined", transliteration: "Al-Mumtahanah" },
  61: { arabic: "الصف", english: "The Ranks", transliteration: "As-Saf" },
  62: { arabic: "الجمعة", english: "The Congregation", transliteration: "Al-Jumu'ah" },
  63: { arabic: "المنافقون", english: "The Hypocrites", transliteration: "Al-Munafiqun" },
  64: { arabic: "التغابن", english: "The Mutual Disillusion", transliteration: "At-Taghabun" },
  65: { arabic: "الطلاق", english: "The Divorce", transliteration: "At-Talaq" },
  66: { arabic: "التحريم", english: "The Prohibition", transliteration: "At-Tahrim" },
  67: { arabic: "الملك", english: "The Sovereignty", transliteration: "Al-Mulk" },
  68: { arabic: "القلم", english: "The Pen", transliteration: "Al-Qalam" },
  69: { arabic: "الحاقة", english: "The Reality", transliteration: "Al-Haqqah" },
  70: { arabic: "المعارج", english: "The Ascending Stairways", transliteration: "Al-Ma'arij" },
  71: { arabic: "نوح", english: "Noah", transliteration: "Nuh" },
  72: { arabic: "الجن", english: "The Jinn", transliteration: "Al-Jinn" },
  73: { arabic: "المزمل", english: "The Enshrouded One", transliteration: "Al-Muzzammil" },
  74: { arabic: "المدثر", english: "The Cloaked One", transliteration: "Al-Muddaththir" },
  75: { arabic: "القيامة", english: "The Resurrection", transliteration: "Al-Qiyamah" },
  76: { arabic: "الإنسان", english: "The Human", transliteration: "Al-Insan" },
  77: { arabic: "المرسلات", english: "The Emissaries", transliteration: "Al-Mursalat" },
  78: { arabic: "النبأ", english: "The Tidings", transliteration: "An-Naba" },
  79: { arabic: "النازعات", english: "Those who drag forth", transliteration: "An-Nazi'at" },
  80: { arabic: "عبس", english: "He Frowned", transliteration: "'Abasa" },
  81: { arabic: "التكوير", english: "The Overthrowing", transliteration: "At-Takwir" },
  82: { arabic: "الانفطار", english: "The Cleaving", transliteration: "Al-Infitar" },
  83: { arabic: "المطففين", english: "The Defrauding", transliteration: "Al-Mutaffifin" },
  84: { arabic: "الانشقاق", english: "The Sundering", transliteration: "Al-Inshiqaq" },
  85: { arabic: "البروج", english: "The Mansions of the Stars", transliteration: "Al-Buruj" },
  86: { arabic: "الطارق", english: "The Nightcomer", transliteration: "At-Tariq" },
  87: { arabic: "الأعلى", english: "The Most High", transliteration: "Al-A'la" },
  88: { arabic: "الغاشية", english: "The Overwhelming", transliteration: "Al-Ghashiyah" },
  89: { arabic: "الفجر", english: "The Dawn", transliteration: "Al-Fajr" },
  90: { arabic: "البلد", english: "The City", transliteration: "Al-Balad" },
  91: { arabic: "الشمس", english: "The Sun", transliteration: "Ash-Shams" },
  92: { arabic: "الليل", english: "The Night", transliteration: "Al-Layl" },
  93: { arabic: "الضحى", english: "The Morning Hours", transliteration: "Ad-Duhaa" },
  94: { arabic: "الشرح", english: "The Relief", transliteration: "Ash-Sharh" },
  95: { arabic: "التين", english: "The Fig", transliteration: "At-Tin" },
  96: { arabic: "العلق", english: "The Clot", transliteration: "Al-'Alaq" },
  97: { arabic: "القدر", english: "The Power", transliteration: "Al-Qadr" },
  98: { arabic: "البينة", english: "The Clear Proof", transliteration: "Al-Bayyinah" },
  99: { arabic: "الزلزلة", english: "The Earthquake", transliteration: "Az-Zalzalah" },
  100: { arabic: "العاديات", english: "The Courser", transliteration: "Al-'Adiyat" },
  101: { arabic: "القارعة", english: "The Calamity", transliteration: "Al-Qari'ah" },
  102: { arabic: "التكاثر", english: "The Rivalry in world increase", transliteration: "At-Takathur" },
  103: { arabic: "العصر", english: "The Declining Day", transliteration: "Al-'Asr" },
  104: { arabic: "الهمزة", english: "The Traducer", transliteration: "Al-Humazah" },
  105: { arabic: "الفيل", english: "The Elephant", transliteration: "Al-Fil" },
  106: { arabic: "قريش", english: "Quraysh", transliteration: "Quraysh" },
  107: { arabic: "الماعون", english: "The Small Kindnesses", transliteration: "Al-Ma'un" },
  108: { arabic: "الكوثر", english: "The Abundance", transliteration: "Al-Kawthar" },
  109: { arabic: "الكافرون", english: "The Disbelievers", transliteration: "Al-Kafirun" },
  110: { arabic: "النصر", english: "The Divine Support", transliteration: "An-Nasr" },
  111: { arabic: "المسد", english: "The Palm Fiber", transliteration: "Al-Masad" },
  112: { arabic: "الإخلاص", english: "The Sincerity", transliteration: "Al-Ikhlas" },
  113: { arabic: "الفلق", english: "The Daybreak", transliteration: "Al-Falaq" },
  114: { arabic: "الناس", english: "The Mankind", transliteration: "An-Nas" },
};

// API response types
interface QuranApiAyah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

interface QuranApiResponse {
  code: number;
  status: string;
  data: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
    numberOfAyahs: number;
    ayahs: QuranApiAyah[];
  };
}

interface QuranApiAyahResponse {
  code: number;
  status: string;
  data: QuranApiAyah;
}

/**
 * Fetch a specific ayah with Arabic text
 */
export async function fetchAyah(
  surah: number,
  ayah: number,
  translation: TranslationEdition = "en.sahih"
): Promise<QuranCitation | null> {
  try {
    // Fetch both Arabic and translation in parallel
    const [arabicRes, translationRes] = await Promise.all([
      fetch(`${QURAN_API_BASE}/ayah/${surah}:${ayah}`),
      fetch(`${QURAN_API_BASE}/ayah/${surah}:${ayah}/${translation}`),
    ]);

    if (!arabicRes.ok || !translationRes.ok) {
      console.error(`Failed to fetch ayah ${surah}:${ayah}`);
      return null;
    }

    const arabicData: QuranApiAyahResponse = await arabicRes.json();
    const translationData: QuranApiAyahResponse = await translationRes.json();

    return {
      surah,
      ayah,
      text: arabicData.data.text,
      translation: translationData.data.text,
    };
  } catch (error) {
    console.error("Error fetching ayah:", error);
    return null;
  }
}

/**
 * Fetch a range of ayahs
 */
export async function fetchAyahRange(
  surah: number,
  startAyah: number,
  endAyah: number,
  translation: TranslationEdition = "en.sahih"
): Promise<QuranCitation | null> {
  try {
    // Fetch the entire surah for both Arabic and translation
    const [arabicRes, translationRes] = await Promise.all([
      fetch(`${QURAN_API_BASE}/surah/${surah}`),
      fetch(`${QURAN_API_BASE}/surah/${surah}/${translation}`),
    ]);

    if (!arabicRes.ok || !translationRes.ok) {
      console.error(`Failed to fetch surah ${surah}`);
      return null;
    }

    const arabicData: QuranApiResponse = await arabicRes.json();
    const translationData: QuranApiResponse = await translationRes.json();

    // Extract the range of ayahs
    const arabicAyahs = arabicData.data.ayahs
      .filter((a) => a.numberInSurah >= startAyah && a.numberInSurah <= endAyah)
      .map((a) => a.text)
      .join(" ");

    const translationAyahs = translationData.data.ayahs
      .filter((a) => a.numberInSurah >= startAyah && a.numberInSurah <= endAyah)
      .map((a) => a.text)
      .join(" ");

    return {
      surah,
      ayah: [startAyah, endAyah],
      text: arabicAyahs,
      translation: translationAyahs,
    };
  } catch (error) {
    console.error("Error fetching ayah range:", error);
    return null;
  }
}

/**
 * Fetch entire surah
 */
export async function fetchSurah(
  surahNumber: number,
  translation: TranslationEdition = "en.sahih"
): Promise<{ arabic: QuranApiAyah[]; translation: QuranApiAyah[] } | null> {
  try {
    const [arabicRes, translationRes] = await Promise.all([
      fetch(`${QURAN_API_BASE}/surah/${surahNumber}`),
      fetch(`${QURAN_API_BASE}/surah/${surahNumber}/${translation}`),
    ]);

    if (!arabicRes.ok || !translationRes.ok) {
      console.error(`Failed to fetch surah ${surahNumber}`);
      return null;
    }

    const arabicData: QuranApiResponse = await arabicRes.json();
    const translationData: QuranApiResponse = await translationRes.json();

    return {
      arabic: arabicData.data.ayahs,
      translation: translationData.data.ayahs,
    };
  } catch (error) {
    console.error("Error fetching surah:", error);
    return null;
  }
}

/**
 * Search Quran for a keyword
 */
export async function searchQuran(
  query: string,
  surah?: number
): Promise<Array<{ surah: number; ayah: number; text: string }>> {
  try {
    let url = `${QURAN_API_BASE}/search/${encodeURIComponent(query)}/all/en`;
    if (surah) {
      url = `${QURAN_API_BASE}/search/${encodeURIComponent(query)}/${surah}/en`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Search failed: ${response.status}`);
      return [];
    }

    const data = await response.json();
    if (data.code !== 200 || !data.data.matches) {
      return [];
    }

    return data.data.matches.map((match: {
      surah: { number: number };
      numberInSurah: number;
      text: string;
    }) => ({
      surah: match.surah.number,
      ayah: match.numberInSurah,
      text: match.text,
    }));
  } catch (error) {
    console.error("Error searching Quran:", error);
    return [];
  }
}

/**
 * Create a verified Quran citation manually
 * Use when you have verified text from trusted sources
 */
export function createVerifiedQuranCitation(params: {
  surah: number;
  ayah: number | [number, number];
  arabicText?: string;
  englishTranslation?: string;
}): QuranCitation {
  return {
    surah: params.surah,
    ayah: params.ayah,
    text: params.arabicText,
    translation: params.englishTranslation,
  };
}

/**
 * Format Quran citation for display
 */
export function formatQuranCitation(citation: QuranCitation): string {
  const surahInfo = SURAH_NAMES[citation.surah];
  const surahName = surahInfo?.transliteration || `Surah ${citation.surah}`;

  if (Array.isArray(citation.ayah)) {
    return `${surahName} ${citation.surah}:${citation.ayah[0]}-${citation.ayah[1]}`;
  }
  return `${surahName} ${citation.surah}:${citation.ayah}`;
}

/**
 * Get surah info by number
 */
export function getSurahInfo(surahNumber: number) {
  return SURAH_NAMES[surahNumber] || null;
}

/**
 * Validate that a Quran citation has valid surah/ayah numbers
 */
export function isValidQuranCitation(citation: Partial<QuranCitation>): boolean {
  if (!citation.surah || citation.surah < 1 || citation.surah > 114) {
    return false;
  }

  const ayah = citation.ayah;
  if (typeof ayah === "number") {
    return ayah >= 1;
  } else if (Array.isArray(ayah)) {
    return ayah.length === 2 && ayah[0] >= 1 && ayah[1] >= ayah[0];
  }

  return false;
}

// ============================================================
// Quran Reader API functions
// ============================================================

/**
 * Fetch metadata for all 114 surahs
 */
export async function fetchSurahList(): Promise<SurahMeta[]> {
  const cached = getCached<SurahMeta[]>("surah_list");
  if (cached) return cached;

  try {
    const res = await fetch(`${QURAN_API_BASE}/surah`);
    if (!res.ok) return buildSurahListFromLocal();

    const json = await res.json();
    if (json.code !== 200) return buildSurahListFromLocal();

    const list: SurahMeta[] = json.data.map(
      (s: { number: number; name: string; englishName: string; englishNameTranslation: string; numberOfAyahs: number; revelationType: string }) => {
        const local = SURAH_NAMES[s.number];
        return {
          number: s.number,
          name: s.name,
          englishName: s.englishName,
          englishNameTranslation: s.englishNameTranslation,
          numberOfAyahs: s.numberOfAyahs,
          revelationType: s.revelationType as "Meccan" | "Medinan",
          arabic: local?.arabic || s.name,
          transliteration: local?.transliteration || s.englishName,
        };
      }
    );

    setCache("surah_list", list);
    return list;
  } catch {
    return buildSurahListFromLocal();
  }
}

function buildSurahListFromLocal(): SurahMeta[] {
  return Object.entries(SURAH_NAMES).map(([num, info]) => ({
    number: parseInt(num),
    name: info.arabic,
    englishName: info.transliteration,
    englishNameTranslation: info.english,
    numberOfAyahs: 0,
    revelationType: "Meccan" as const,
    arabic: info.arabic,
    transliteration: info.transliteration,
  }));
}

/**
 * Fetch a full surah with Arabic (Uthmani) + English translation in one call
 */
export async function fetchSurahWithTranslation(
  surahNumber: number,
  edition: TranslationEdition = "en.sahih"
): Promise<SurahData | null> {
  const cacheKey = `surah_${surahNumber}_${edition}`;
  const cached = getCached<SurahData>(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${QURAN_API_BASE}/surah/${surahNumber}/editions/quran-uthmani,${edition}`
    );
    if (!res.ok) return null;

    const json = await res.json();
    if (json.code !== 200) return null;

    const [arabicData, translationData] = json.data as [
      { number: number; name: string; englishName: string; englishNameTranslation: string; numberOfAyahs: number; revelationType: string; ayahs: QuranApiAyah[] },
      { ayahs: QuranApiAyah[] }
    ];

    const local = SURAH_NAMES[surahNumber];

    const meta: SurahMeta = {
      number: arabicData.number,
      name: arabicData.name,
      englishName: arabicData.englishName,
      englishNameTranslation: arabicData.englishNameTranslation,
      numberOfAyahs: arabicData.numberOfAyahs,
      revelationType: arabicData.revelationType as "Meccan" | "Medinan",
      arabic: local?.arabic || arabicData.name,
      transliteration: local?.transliteration || arabicData.englishName,
    };

    const ayahs: Ayah[] = arabicData.ayahs.map((a, i) => ({
      number: a.number,
      numberInSurah: a.numberInSurah,
      surahNumber,
      text: a.text,
      translation: translationData.ayahs[i]?.text || "",
      juz: a.juz,
      page: a.page,
      hizbQuarter: a.hizbQuarter,
      sajda: a.sajda,
    }));

    const surahData: SurahData = { meta, ayahs, fetchedAt: Date.now() };
    setCache(cacheKey, surahData);
    return surahData;
  } catch (error) {
    console.error("Error fetching surah with translation:", error);
    return null;
  }
}

/**
 * Search Quran with enriched results
 */
export async function searchQuranEnriched(
  query: string
): Promise<QuranSearchResult[]> {
  try {
    const url = `${QURAN_API_BASE}/search/${encodeURIComponent(query)}/all/en.sahih`;
    const res = await fetch(url);
    if (!res.ok) return [];

    const data = await res.json();
    if (data.code !== 200 || !data.data?.matches) return [];

    return data.data.matches.map(
      (match: { surah: { number: number; name: string }; numberInSurah: number; text: string }) => {
        const local = SURAH_NAMES[match.surah.number];
        return {
          surah: match.surah.number,
          surahName: local?.transliteration || match.surah.name,
          surahNameArabic: local?.arabic || match.surah.name,
          ayahNumber: match.numberInSurah,
          text: match.text,
        };
      }
    );
  } catch {
    return [];
  }
}
