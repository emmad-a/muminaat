import { QuranStats } from "@/types/viral";

const STATS_KEY = "muminaat_stats";

const DEFAULT_STATS: QuranStats = {
  ayahsRead: 0,
  totalSeconds: 0,
  surahVisits: {},
  dailyLog: {},
  firstActiveDate: null,
};

export function loadStats(): QuranStats {
  if (typeof window === "undefined") return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return DEFAULT_STATS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveStats(stats: QuranStats): void {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function recordSurahVisit(surahNumber: number): void {
  const stats = loadStats();
  const today = getToday();

  if (!stats.firstActiveDate) {
    stats.firstActiveDate = today;
  }

  stats.surahVisits[surahNumber] = (stats.surahVisits[surahNumber] || 0) + 1;
  saveStats(stats);
}

export function recordAyahsRead(count: number): void {
  const stats = loadStats();
  const today = getToday();

  stats.ayahsRead += count;
  stats.dailyLog[today] = (stats.dailyLog[today] || 0) + count;

  if (!stats.firstActiveDate) {
    stats.firstActiveDate = today;
  }

  saveStats(stats);
}

export function recordTimeSpent(seconds: number): void {
  const stats = loadStats();
  stats.totalSeconds += seconds;
  saveStats(stats);
}

export function getMonthlyStats(): QuranStats {
  const stats = loadStats();
  const now = new Date();
  const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;

  const monthlyLog: Record<string, number> = {};
  let monthlyAyahs = 0;

  for (const [date, count] of Object.entries(stats.dailyLog)) {
    if (date >= monthStart) {
      monthlyLog[date] = count;
      monthlyAyahs += count;
    }
  }

  return {
    ...stats,
    ayahsRead: monthlyAyahs,
    dailyLog: monthlyLog,
  };
}

export function getFavoriteSurah(stats: QuranStats): number | null {
  const entries = Object.entries(stats.surahVisits);
  if (entries.length === 0) return null;
  entries.sort((a, b) => b[1] - a[1]);
  return parseInt(entries[0][0]);
}

export function getActiveDays(stats: QuranStats): number {
  return Object.keys(stats.dailyLog).length;
}
