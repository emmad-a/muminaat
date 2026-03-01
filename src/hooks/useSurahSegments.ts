"use client";

import { useState, useEffect } from "react";
import { SurahSegments } from "@/types/quran";
import { fetchSurahSegments } from "@/lib/quran-segments";

/**
 * React hook to load word timing segments for a surah.
 * Only fetches when enabled (wordHighlight setting is on).
 */
export function useSurahSegments(
  quranCdnId: number,
  surahNumber: number | null,
  enabled: boolean
): SurahSegments | null {
  const [segments, setSegments] = useState<SurahSegments | null>(null);

  useEffect(() => {
    if (!enabled || !surahNumber) {
      setSegments(null);
      return;
    }

    let cancelled = false;

    fetchSurahSegments(quranCdnId, surahNumber).then((data) => {
      if (!cancelled) setSegments(data);
    });

    return () => {
      cancelled = true;
    };
  }, [quranCdnId, surahNumber, enabled]);

  return segments;
}
