/**
 * Settings, bookmarks, and last-read persistence
 */

import { QuranSettings, Bookmark, LastReadPosition } from "@/types/quran";

const SETTINGS_KEY = "muminaat_quran_settings";
const BOOKMARKS_KEY = "muminaat_quran_bookmarks";
const LAST_READ_KEY = "muminaat_quran_last_read";

export const DEFAULT_SETTINGS: QuranSettings = {
  arabicFontSize: 28,
  translationFontSize: 16,
  reciterId: "alafasy",
  showTranslation: true,
  theme: "system",
  readingMode: false,
  playbackRate: 1,
};

function safeGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function loadSettings(): QuranSettings {
  const saved = safeGet<Partial<QuranSettings>>(SETTINGS_KEY);
  return { ...DEFAULT_SETTINGS, ...saved };
}

export function saveSettings(settings: QuranSettings): void {
  safeSet(SETTINGS_KEY, settings);
}

export function loadBookmarks(): Bookmark[] {
  return safeGet<Bookmark[]>(BOOKMARKS_KEY) || [];
}

export function saveBookmarks(bookmarks: Bookmark[]): void {
  safeSet(BOOKMARKS_KEY, bookmarks);
}

export function loadLastRead(): LastReadPosition | null {
  return safeGet<LastReadPosition>(LAST_READ_KEY);
}

export function saveLastRead(position: LastReadPosition): void {
  safeSet(LAST_READ_KEY, position);
}
