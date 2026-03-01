"use client";

import { useState, useEffect, useCallback } from "react";
import { KhatamProgress, UserProfile } from "@/types/viral";
import { loadKhatam, claimJuz, completeJuz, resetKhatam, getCommunityProgress, getLeaderboard, LeaderboardEntry } from "@/lib/khatam-store";
import { loadUser } from "@/lib/user-store";
import { getCompletedJuzFromReading } from "@/lib/reading-store";

export function useKhatam() {
  const [progress, setProgress] = useState<KhatamProgress | null>(null);
  const [community, setCommunity] = useState<{ completedJuz: number[]; readers: number }>({ completedJuz: [], readers: 0 });
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const p = loadKhatam();

    // Auto-complete juz based on actual reading progress
    const readCompleted = getCompletedJuzFromReading();
    let updated = p;
    for (const juz of readCompleted) {
      if (!p.completedJuz.includes(juz)) {
        updated = completeJuz(juz);
      }
    }

    setProgress(updated);
    setCommunity(getCommunityProgress());
    setLeaderboard(getLeaderboard(updated.completedJuz.length));
    setUserProfile(loadUser());
  }, []);

  const claim = useCallback((juz: number) => {
    const updated = claimJuz(juz);
    setProgress({ ...updated });
    setLeaderboard(getLeaderboard(updated.completedJuz.length));
  }, []);

  const complete = useCallback((juz: number) => {
    const updated = completeJuz(juz);
    setProgress({ ...updated });
    setLeaderboard(getLeaderboard(updated.completedJuz.length));
  }, []);

  const reset = useCallback(() => {
    const updated = resetKhatam();
    setProgress({ ...updated });
    setLeaderboard(getLeaderboard(0));
  }, []);

  const join = useCallback((profile: UserProfile) => {
    setUserProfile(profile);
    const p = loadKhatam();
    setLeaderboard(getLeaderboard(p.completedJuz.length));
  }, []);

  return { progress, community, leaderboard, userProfile, claim, complete, reset, join };
}
