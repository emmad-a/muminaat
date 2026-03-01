"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { markAyahsRead, getReadAyahs, getSurahProgress } from "@/lib/reading-store";
import { recordDailyAyahs } from "@/lib/stats-store";

/**
 * Hook that tracks which ayahs the user has actually read via scroll.
 * Uses IntersectionObserver — an ayah counts as "read" when it's been
 * visible in the viewport for at least 2 seconds.
 */
export function useReadingProgress(surahNumber: number, totalAyahs: number) {
  const [readAyahs, setReadAyahs] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState({ read: 0, total: totalAyahs, percent: 0 });
  const pendingRef = useRef<Map<number, NodeJS.Timeout>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Load existing read ayahs
  useEffect(() => {
    const existing = getReadAyahs(surahNumber);
    setReadAyahs(new Set(existing));
    setProgress(getSurahProgress(surahNumber, totalAyahs));
  }, [surahNumber, totalAyahs]);

  // Mark an ayah as read
  const markRead = useCallback((ayahNum: number) => {
    setReadAyahs(prev => {
      if (prev.has(ayahNum)) return prev;
      const next = new Set(prev);
      next.add(ayahNum);

      // Save to localStorage + record in daily stats
      markAyahsRead(surahNumber, [ayahNum]);
      recordDailyAyahs(1);
      setProgress(getSurahProgress(surahNumber, totalAyahs));

      return next;
    });
  }, [surahNumber, totalAyahs]);

  // Set up IntersectionObserver
  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    pendingRef.current.forEach(timer => clearTimeout(timer));
    pendingRef.current.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const ayahId = el.id; // "ayah-1", "ayah-2", etc.
          const match = ayahId.match(/^ayah-(\d+)$/);
          if (!match) continue;
          const ayahNum = parseInt(match[1]);

          if (entry.isIntersecting) {
            // Start 2-second timer
            if (!pendingRef.current.has(ayahNum)) {
              const timer = setTimeout(() => {
                markRead(ayahNum);
                pendingRef.current.delete(ayahNum);
              }, 2000);
              pendingRef.current.set(ayahNum, timer);
            }
          } else {
            // Scrolled out — cancel timer
            const timer = pendingRef.current.get(ayahNum);
            if (timer) {
              clearTimeout(timer);
              pendingRef.current.delete(ayahNum);
            }
          }
        }
      },
      {
        threshold: 0.5, // at least 50% visible
      }
    );

    observerRef.current = observer;

    // Observe all ayah elements
    // Slight delay to let the DOM render
    const timeout = setTimeout(() => {
      for (let i = 1; i <= totalAyahs; i++) {
        const el = document.getElementById(`ayah-${i}`);
        if (el) observer.observe(el);
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      pendingRef.current.forEach(timer => clearTimeout(timer));
      pendingRef.current.clear();
    };
  }, [surahNumber, totalAyahs, markRead]);

  return {
    readAyahs,
    progress,
    isAyahRead: (ayahNum: number) => readAyahs.has(ayahNum),
  };
}
