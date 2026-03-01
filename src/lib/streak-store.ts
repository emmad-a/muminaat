import { StreakData } from "@/types/viral";

const STREAK_KEY = "muminaat_streak";

const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  streakFreezes: 1,
  lastFreezeReset: null,
  milestones: [],
};

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export function loadStreak(): StreakData {
  if (typeof window === "undefined") return DEFAULT_STREAK;
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return DEFAULT_STREAK;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_STREAK;
  }
}

export function saveStreak(data: StreakData): void {
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));
}

export function recordActivity(): { streak: StreakData; newMilestone: number | null } {
  const data = loadStreak();
  const today = getToday();
  const yesterday = getYesterday();

  // Reset streak freezes weekly (every Sunday)
  const dayOfWeek = new Date().getDay();
  if (dayOfWeek === 0 && data.lastFreezeReset !== today) {
    data.streakFreezes = 1;
    data.lastFreezeReset = today;
  }

  // Already recorded today
  if (data.lastActiveDate === today) {
    return { streak: data, newMilestone: null };
  }

  if (data.lastActiveDate === yesterday) {
    // Consecutive day
    data.currentStreak += 1;
  } else if (data.lastActiveDate && data.lastActiveDate !== today) {
    // Missed a day - check if we have a freeze
    const lastDate = new Date(data.lastActiveDate);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 2 && data.streakFreezes > 0) {
      // Use a streak freeze
      data.streakFreezes -= 1;
      data.currentStreak += 1;
    } else {
      // Streak broken
      data.currentStreak = 1;
    }
  } else {
    // First ever activity
    data.currentStreak = 1;
  }

  data.lastActiveDate = today;
  if (data.currentStreak > data.longestStreak) {
    data.longestStreak = data.currentStreak;
  }

  // Check milestones
  const MILESTONES = [7, 30, 100, 365];
  let newMilestone: number | null = null;
  for (const m of MILESTONES) {
    if (data.currentStreak >= m && !data.milestones.includes(m)) {
      data.milestones.push(m);
      newMilestone = m;
    }
  }

  saveStreak(data);
  return { streak: data, newMilestone };
}

export function useStreakFreeze(): boolean {
  const data = loadStreak();
  if (data.streakFreezes <= 0) return false;
  data.streakFreezes -= 1;
  saveStreak(data);
  return true;
}

export const MILESTONE_MESSAGES: Record<number, { title: string; hadith: string }> = {
  7: {
    title: "7-Day Streak!",
    hadith: "The most beloved deeds to Allah are those done consistently, even if small. — Sahih al-Bukhari",
  },
  30: {
    title: "30-Day Streak!",
    hadith: "Whoever reads a letter from the Book of Allah will earn a good deed, and each good deed is multiplied by ten. — At-Tirmidhi",
  },
  100: {
    title: "100-Day Streak!",
    hadith: "The best among you are those who learn the Quran and teach it. — Sahih al-Bukhari",
  },
  365: {
    title: "365-Day Streak!",
    hadith: "The Quran will come as an intercessor on the Day of Resurrection. — Sahih Muslim",
  },
};
