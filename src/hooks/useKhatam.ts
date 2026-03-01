"use client";

import { useState, useEffect, useCallback } from "react";
import { KhatamProgress } from "@/types/viral";
import { loadKhatam, claimJuz, completeJuz, resetKhatam, getCommunityProgress, getLeaderboard, LeaderboardEntry } from "@/lib/khatam-store";

export function useKhatam() {
  const [progress, setProgress] = useState<KhatamProgress | null>(null);
  const [community, setCommunity] = useState<{ completedJuz: number[]; readers: number }>({ completedJuz: [], readers: 0 });
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const p = loadKhatam();
    setProgress(p);
    setCommunity(getCommunityProgress());
    setLeaderboard(getLeaderboard(p.completedJuz.length));
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

  return { progress, community, leaderboard, claim, complete, reset };
}
