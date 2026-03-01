"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { QuranStats } from "@/types/viral";
import { loadStats, recordSurahVisit, recordDailyAyahs, recordTimeSpent } from "@/lib/stats-store";

export function useStats() {
  const [stats, setStats] = useState<QuranStats | null>(null);
  const timerRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setStats(loadStats());
  }, []);

  const visitSurah = useCallback((surahNumber: number) => {
    recordSurahVisit(surahNumber);
    setStats(loadStats());
  }, []);

  const readAyahs = useCallback((count: number) => {
    recordDailyAyahs(count);
    setStats(loadStats());
  }, []);

  // Start timing for a reading session
  const startTimer = useCallback(() => {
    timerRef.current = Date.now();
    // Record time every 30 seconds
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - timerRef.current) / 1000);
      if (elapsed > 0) {
        recordTimeSpent(30);
        timerRef.current = Date.now();
      }
    }, 30000);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timerRef.current) {
      const elapsed = Math.floor((Date.now() - timerRef.current) / 1000);
      if (elapsed > 0) {
        recordTimeSpent(elapsed);
      }
      timerRef.current = 0;
    }
    setStats(loadStats());
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    stats,
    visitSurah,
    readAyahs,
    startTimer,
    stopTimer,
  };
}
