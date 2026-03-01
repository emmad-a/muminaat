// Share card themes
export type ShareCardTheme = "midnight" | "desert" | "ocean" | "dawn";

export interface ShareCardData {
  arabicText: string;
  translation: string;
  surahName: string;
  surahNameArabic: string;
  ayahNumber: number;
  surahNumber: number;
}

// Streak
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null; // ISO date string YYYY-MM-DD
  streakFreezes: number;
  lastFreezeReset: string | null; // ISO date, resets weekly
  milestones: number[]; // milestone days achieved
}

// Stats
export interface QuranStats {
  ayahsRead: number;
  totalSeconds: number;
  surahVisits: Record<number, number>; // surah number -> visit count
  dailyLog: Record<string, number>; // YYYY-MM-DD -> ayahs read that day
  firstActiveDate: string | null;
}

// User Profile
export interface UserProfile {
  name: string;
  avatar: string;
  joinedAt: string;
}

// Khatam
export interface KhatamProgress {
  claimedJuz: number[]; // juz numbers claimed by user
  completedJuz: number[]; // juz completed
  startedAt: string;
  cycleId: number;
}

// Quiz
export interface QuizQuestion {
  id: string;
  type: "surah_ayah_count" | "meccan_medinan" | "surah_number" | "not_a_surah";
  question: string;
  options: string[];
  correctIndex: number;
}

export interface QuizScore {
  date: string; // YYYY-MM-DD
  score: number;
  total: number;
  hasanahPoints: number;
  answers: number[]; // indexes selected
}

export interface QuizState {
  todayScore: QuizScore | null;
  totalHasanahPoints: number;
  history: QuizScore[];
}

// Mood
export interface MoodCategory {
  id: string;
  label: string;
  labelArabic: string;
  icon: string;
  color: string; // tailwind color class
  description: string;
}

export interface MoodVerse {
  surah: number;
  ayah: number;
  arabicText?: string;
  translation?: string;
}
