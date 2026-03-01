import { UserProfile } from "@/types/viral";

const USER_KEY = "muminaat_user";

export const USER_AVATARS = ["🤲", "🌙", "⭐", "🌸", "🕊️", "💎", "🌺", "✨", "🦋", "🌷", "💫", "☀️"];

export function loadUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveUser(profile: UserProfile): void {
  localStorage.setItem(USER_KEY, JSON.stringify(profile));
}

export function createUser(name: string, avatar: string): UserProfile {
  const profile: UserProfile = {
    name: name.trim(),
    avatar,
    joinedAt: new Date().toISOString(),
  };
  saveUser(profile);
  return profile;
}
