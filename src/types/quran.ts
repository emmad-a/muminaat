/**
 * Quran Feature Types
 */

export type AudioMode = "ayah" | "surah";

export interface Reciter {
  id: string;
  name: string;
  nameArabic: string;
  everyAyahPath: string;
  cdnSlug: string;
  mp3QuranPath: string;
  quranCdnId: number;
}

/** [wordIndex, startMs, endMs] — absolute timestamps within full surah audio */
export type WordSegment = [number, number, number];

export interface VerseSegments {
  segments: WordSegment[];
  timestampFrom: number;
  timestampTo: number;
}

/** Keyed by verse number (1-indexed) */
export type SurahSegments = Record<number, VerseSegments>;

export interface ActiveWordInfo {
  ayahNumber: number;
  wordIndex: number;
}

export interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
  arabic: string;
  transliteration: string;
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  surahNumber: number;
  text: string;
  translation: string;
  juz: number;
  page: number;
  hizbQuarter: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

export interface SurahData {
  meta: SurahMeta;
  ayahs: Ayah[];
  fetchedAt: number;
}

export type PlaybackState = "idle" | "loading" | "playing" | "paused" | "error";

export interface AudioPlayerState {
  playbackState: PlaybackState;
  currentSurah: number | null;
  currentAyah: number | null;
  totalAyahs: number;
  duration: number;
  currentTime: number;
  playbackRate: number;
  repeatMode: "none" | "ayah" | "surah";
  audioMode: AudioMode;
}

export interface QuranSearchResult {
  surah: number;
  surahName: string;
  surahNameArabic: string;
  ayahNumber: number;
  text: string;
}

export interface QuranSettings {
  arabicFontSize: number;
  translationFontSize: number;
  reciterId: string;
  showTranslation: boolean;
  theme: "light" | "dark" | "system";
  readingMode: boolean;
  playbackRate: number;
  audioMode: AudioMode;
  wordHighlight: boolean;
}

export interface Bookmark {
  id: string;
  surah: number;
  ayah: number;
  surahName: string;
  createdAt: number;
}

export interface LastReadPosition {
  surah: number;
  ayah: number;
  timestamp: number;
}
