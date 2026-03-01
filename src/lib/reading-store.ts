/**
 * Reading Progress Store
 * Tracks which ayahs have been actually read (scrolled into view for 2+ seconds)
 * per surah. Stored in localStorage.
 *
 * Shape: { [surahNumber]: number[] } — array of ayah numbers read
 */

const READING_KEY = "muminaat_reading";

export interface ReadingData {
  surahs: Record<number, number[]>; // surahNumber -> array of ayahNumbers read
}

const DEFAULT: ReadingData = { surahs: {} };

export function loadReading(): ReadingData {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(READING_KEY);
    if (!raw) return DEFAULT;
    return JSON.parse(raw);
  } catch {
    return DEFAULT;
  }
}

function saveReading(data: ReadingData): void {
  localStorage.setItem(READING_KEY, JSON.stringify(data));
}

/** Mark specific ayahs as read for a surah */
export function markAyahsRead(surah: number, ayahNumbers: number[]): ReadingData {
  const data = loadReading();
  const existing = new Set(data.surahs[surah] || []);
  for (const a of ayahNumbers) {
    existing.add(a);
  }
  data.surahs[surah] = Array.from(existing).sort((a, b) => a - b);
  saveReading(data);
  return data;
}

/** Get read ayahs for a specific surah */
export function getReadAyahs(surah: number): number[] {
  const data = loadReading();
  return data.surahs[surah] || [];
}

/** Get reading progress for a surah as fraction */
export function getSurahProgress(surah: number, totalAyahs: number): { read: number; total: number; percent: number } {
  const read = getReadAyahs(surah).length;
  return {
    read,
    total: totalAyahs,
    percent: totalAyahs > 0 ? Math.round((read / totalAyahs) * 100) : 0,
  };
}

/** Get all surah progress for the index page */
export function getAllProgress(): Record<number, number> {
  const data = loadReading();
  const result: Record<number, number> = {};
  for (const [surah, ayahs] of Object.entries(data.surahs)) {
    result[Number(surah)] = ayahs.length;
  }
  return result;
}

/** Get total ayahs read across all surahs */
export function getTotalAyahsRead(): number {
  const data = loadReading();
  let total = 0;
  for (const ayahs of Object.values(data.surahs)) {
    total += ayahs.length;
  }
  return total;
}

/**
 * Juz-to-Surah mapping (simplified — maps juz number to which surahs + ayah ranges it covers)
 * For auto-completing Khatam when all ayahs in a juz are read
 */
export const JUZ_MAP: { juz: number; surahs: { surah: number; from: number; to: number }[] }[] = [
  { juz: 1, surahs: [{ surah: 1, from: 1, to: 7 }, { surah: 2, from: 1, to: 141 }] },
  { juz: 2, surahs: [{ surah: 2, from: 142, to: 252 }] },
  { juz: 3, surahs: [{ surah: 2, from: 253, to: 286 }, { surah: 3, from: 1, to: 92 }] },
  { juz: 4, surahs: [{ surah: 3, from: 93, to: 200 }, { surah: 4, from: 1, to: 23 }] },
  { juz: 5, surahs: [{ surah: 4, from: 24, to: 147 }] },
  { juz: 6, surahs: [{ surah: 4, from: 148, to: 176 }, { surah: 5, from: 1, to: 81 }] },
  { juz: 7, surahs: [{ surah: 5, from: 82, to: 120 }, { surah: 6, from: 1, to: 110 }] },
  { juz: 8, surahs: [{ surah: 6, from: 111, to: 165 }, { surah: 7, from: 1, to: 87 }] },
  { juz: 9, surahs: [{ surah: 7, from: 88, to: 206 }, { surah: 8, from: 1, to: 40 }] },
  { juz: 10, surahs: [{ surah: 8, from: 41, to: 75 }, { surah: 9, from: 1, to: 92 }] },
  { juz: 11, surahs: [{ surah: 9, from: 93, to: 129 }, { surah: 10, from: 1, to: 109 }, { surah: 11, from: 1, to: 5 }] },
  { juz: 12, surahs: [{ surah: 11, from: 6, to: 123 }, { surah: 12, from: 1, to: 52 }] },
  { juz: 13, surahs: [{ surah: 12, from: 53, to: 111 }, { surah: 13, from: 1, to: 43 }, { surah: 14, from: 1, to: 52 }] },
  { juz: 14, surahs: [{ surah: 15, from: 1, to: 99 }, { surah: 16, from: 1, to: 128 }] },
  { juz: 15, surahs: [{ surah: 17, from: 1, to: 111 }, { surah: 18, from: 1, to: 74 }] },
  { juz: 16, surahs: [{ surah: 18, from: 75, to: 110 }, { surah: 19, from: 1, to: 98 }, { surah: 20, from: 1, to: 135 }] },
  { juz: 17, surahs: [{ surah: 21, from: 1, to: 112 }, { surah: 22, from: 1, to: 78 }] },
  { juz: 18, surahs: [{ surah: 23, from: 1, to: 118 }, { surah: 24, from: 1, to: 64 }, { surah: 25, from: 1, to: 20 }] },
  { juz: 19, surahs: [{ surah: 25, from: 21, to: 77 }, { surah: 26, from: 1, to: 227 }, { surah: 27, from: 1, to: 55 }] },
  { juz: 20, surahs: [{ surah: 27, from: 56, to: 93 }, { surah: 28, from: 1, to: 88 }, { surah: 29, from: 1, to: 45 }] },
  { juz: 21, surahs: [{ surah: 29, from: 46, to: 69 }, { surah: 30, from: 1, to: 60 }, { surah: 31, from: 1, to: 34 }, { surah: 32, from: 1, to: 30 }, { surah: 33, from: 1, to: 30 }] },
  { juz: 22, surahs: [{ surah: 33, from: 31, to: 73 }, { surah: 34, from: 1, to: 54 }, { surah: 35, from: 1, to: 45 }, { surah: 36, from: 1, to: 27 }] },
  { juz: 23, surahs: [{ surah: 36, from: 28, to: 83 }, { surah: 37, from: 1, to: 182 }, { surah: 38, from: 1, to: 88 }, { surah: 39, from: 1, to: 31 }] },
  { juz: 24, surahs: [{ surah: 39, from: 32, to: 75 }, { surah: 40, from: 1, to: 85 }, { surah: 41, from: 1, to: 46 }] },
  { juz: 25, surahs: [{ surah: 41, from: 47, to: 54 }, { surah: 42, from: 1, to: 53 }, { surah: 43, from: 1, to: 89 }, { surah: 44, from: 1, to: 59 }, { surah: 45, from: 1, to: 37 }] },
  { juz: 26, surahs: [{ surah: 46, from: 1, to: 35 }, { surah: 47, from: 1, to: 38 }, { surah: 48, from: 1, to: 29 }, { surah: 49, from: 1, to: 18 }, { surah: 50, from: 1, to: 45 }, { surah: 51, from: 1, to: 30 }] },
  { juz: 27, surahs: [{ surah: 51, from: 31, to: 60 }, { surah: 52, from: 1, to: 49 }, { surah: 53, from: 1, to: 62 }, { surah: 54, from: 1, to: 55 }, { surah: 55, from: 1, to: 78 }, { surah: 56, from: 1, to: 96 }, { surah: 57, from: 1, to: 29 }] },
  { juz: 28, surahs: [{ surah: 58, from: 1, to: 22 }, { surah: 59, from: 1, to: 24 }, { surah: 60, from: 1, to: 13 }, { surah: 61, from: 1, to: 14 }, { surah: 62, from: 1, to: 11 }, { surah: 63, from: 1, to: 11 }, { surah: 64, from: 1, to: 18 }, { surah: 65, from: 1, to: 12 }, { surah: 66, from: 1, to: 12 }] },
  { juz: 29, surahs: [{ surah: 67, from: 1, to: 30 }, { surah: 68, from: 1, to: 52 }, { surah: 69, from: 1, to: 52 }, { surah: 70, from: 1, to: 44 }, { surah: 71, from: 1, to: 28 }, { surah: 72, from: 1, to: 28 }, { surah: 73, from: 1, to: 20 }, { surah: 74, from: 1, to: 56 }, { surah: 75, from: 1, to: 40 }, { surah: 76, from: 1, to: 31 }, { surah: 77, from: 1, to: 50 }] },
  { juz: 30, surahs: [{ surah: 78, from: 1, to: 40 }, { surah: 79, from: 1, to: 46 }, { surah: 80, from: 1, to: 42 }, { surah: 81, from: 1, to: 29 }, { surah: 82, from: 1, to: 19 }, { surah: 83, from: 1, to: 36 }, { surah: 84, from: 1, to: 25 }, { surah: 85, from: 1, to: 22 }, { surah: 86, from: 1, to: 17 }, { surah: 87, from: 1, to: 19 }, { surah: 88, from: 1, to: 26 }, { surah: 89, from: 1, to: 30 }, { surah: 90, from: 1, to: 20 }, { surah: 91, from: 1, to: 15 }, { surah: 92, from: 1, to: 21 }, { surah: 93, from: 1, to: 11 }, { surah: 94, from: 1, to: 8 }, { surah: 95, from: 1, to: 8 }, { surah: 96, from: 1, to: 19 }, { surah: 97, from: 1, to: 5 }, { surah: 98, from: 1, to: 8 }, { surah: 99, from: 1, to: 8 }, { surah: 100, from: 1, to: 11 }, { surah: 101, from: 1, to: 11 }, { surah: 102, from: 1, to: 8 }, { surah: 103, from: 1, to: 3 }, { surah: 104, from: 1, to: 9 }, { surah: 105, from: 1, to: 5 }, { surah: 106, from: 1, to: 4 }, { surah: 107, from: 1, to: 7 }, { surah: 108, from: 1, to: 3 }, { surah: 109, from: 1, to: 6 }, { surah: 110, from: 1, to: 3 }, { surah: 111, from: 1, to: 5 }, { surah: 112, from: 1, to: 4 }, { surah: 113, from: 1, to: 5 }, { surah: 114, from: 1, to: 6 }] },
];

/** Check if a juz is fully read based on actual reading data */
export function isJuzComplete(juzNumber: number): boolean {
  const juzEntry = JUZ_MAP.find(j => j.juz === juzNumber);
  if (!juzEntry) return false;

  const data = loadReading();

  for (const range of juzEntry.surahs) {
    const readAyahs = new Set(data.surahs[range.surah] || []);
    for (let a = range.from; a <= range.to; a++) {
      if (!readAyahs.has(a)) return false;
    }
  }
  return true;
}

/** Get juz reading progress */
export function getJuzProgress(juzNumber: number): { read: number; total: number; percent: number } {
  const juzEntry = JUZ_MAP.find(j => j.juz === juzNumber);
  if (!juzEntry) return { read: 0, total: 0, percent: 0 };

  const data = loadReading();
  let total = 0;
  let read = 0;

  for (const range of juzEntry.surahs) {
    const readAyahs = new Set(data.surahs[range.surah] || []);
    for (let a = range.from; a <= range.to; a++) {
      total++;
      if (readAyahs.has(a)) read++;
    }
  }

  return { read, total, percent: total > 0 ? Math.round((read / total) * 100) : 0 };
}

/** Get completed juz numbers based on actual reading */
export function getCompletedJuzFromReading(): number[] {
  const completed: number[] = [];
  for (let juz = 1; juz <= 30; juz++) {
    if (isJuzComplete(juz)) completed.push(juz);
  }
  return completed;
}
