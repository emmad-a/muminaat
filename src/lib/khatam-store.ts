import { KhatamProgress } from "@/types/viral";

const KHATAM_KEY = "muminaat_khatam";

const DEFAULT_KHATAM: KhatamProgress = {
  claimedJuz: [],
  completedJuz: [],
  startedAt: new Date().toISOString(),
  cycleId: 1,
};

export function loadKhatam(): KhatamProgress {
  if (typeof window === "undefined") return DEFAULT_KHATAM;
  try {
    const raw = localStorage.getItem(KHATAM_KEY);
    if (!raw) return DEFAULT_KHATAM;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_KHATAM;
  }
}

export function saveKhatam(data: KhatamProgress): void {
  localStorage.setItem(KHATAM_KEY, JSON.stringify(data));
}

export function claimJuz(juzNumber: number): KhatamProgress {
  const data = loadKhatam();
  if (!data.claimedJuz.includes(juzNumber)) {
    data.claimedJuz.push(juzNumber);
    saveKhatam(data);
  }
  return data;
}

export function completeJuz(juzNumber: number): KhatamProgress {
  const data = loadKhatam();
  if (!data.completedJuz.includes(juzNumber)) {
    data.completedJuz.push(juzNumber);
    saveKhatam(data);
  }
  return data;
}

export function resetKhatam(): KhatamProgress {
  const data = loadKhatam();
  const newData: KhatamProgress = {
    claimedJuz: [],
    completedJuz: [],
    startedAt: new Date().toISOString(),
    cycleId: data.cycleId + 1,
  };
  saveKhatam(newData);
  return newData;
}

// Simulated community progress based on date
export function getCommunityProgress(): { completedJuz: number[]; readers: number } {
  const now = new Date();
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

  function seededRandom(s: number): number {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  }

  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const baseCompleted = Math.min(30, Math.floor(dayOfYear / 12));

  const communityJuz: number[] = [];
  for (let i = 1; i <= 30; i++) {
    if (i <= baseCompleted || seededRandom(seed + i) > 0.6) {
      communityJuz.push(i);
    }
  }

  const readers = Math.floor(800 + seededRandom(seed) * 1200);

  return { completedJuz: communityJuz, readers };
}

// Simulated leaderboard participants
export interface LeaderboardEntry {
  name: string;
  juzCompleted: number;
  isUser: boolean;
  streak: number;
  avatar: string;
}

const PARTICIPANT_NAMES = [
  "Aisha", "Fatima", "Khadijah", "Maryam", "Hafsa",
  "Zainab", "Sumaya", "Noor", "Amina", "Ruqayyah",
  "Safiyya", "Halima", "Asiya", "Rabia", "Huda",
  "Layla", "Sara", "Yasmin", "Iman", "Dina",
];

const AVATARS = ["🌙", "⭐", "🌸", "🕊️", "💎", "🌺", "✨", "🦋", "🌷", "💫"];

export function getLeaderboard(userCompleted: number): LeaderboardEntry[] {
  const now = new Date();
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

  function seededRandom(s: number): number {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  }

  // Generate 10 simulated participants
  const participants: LeaderboardEntry[] = [];
  for (let i = 0; i < 10; i++) {
    const nameIdx = Math.floor(seededRandom(seed + i * 7) * PARTICIPANT_NAMES.length);
    const juz = Math.min(30, Math.floor(seededRandom(seed + i * 13) * 20) + 1);
    const streak = Math.floor(seededRandom(seed + i * 19) * 45) + 1;
    const avatarIdx = Math.floor(seededRandom(seed + i * 23) * AVATARS.length);

    participants.push({
      name: PARTICIPANT_NAMES[nameIdx],
      juzCompleted: juz,
      isUser: false,
      streak,
      avatar: AVATARS[avatarIdx],
    });
  }

  // Add user
  const userData = loadKhatam();
  participants.push({
    name: "You",
    juzCompleted: userCompleted || userData.completedJuz.length,
    isUser: true,
    streak: 0, // Will be filled from streak store
    avatar: "🤲",
  });

  // Sort by juz completed descending
  participants.sort((a, b) => b.juzCompleted - a.juzCompleted);

  return participants;
}
