"use client";

import { useState, useEffect } from "react";
import { SurahData } from "@/types/quran";
import { fetchSurahWithTranslation, TranslationEdition } from "@/lib/quran-api";

export function useSurahData(surahNumber: number, edition?: TranslationEdition) {
  const [surahData, setSurahData] = useState<SurahData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (surahNumber < 1 || surahNumber > 114) {
      setError("Invalid surah number");
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchSurahWithTranslation(surahNumber, edition)
      .then((data) => {
        if (cancelled) return;
        if (data) {
          setSurahData(data);
        } else {
          setError("Failed to load surah");
        }
      })
      .catch(() => {
        if (!cancelled) setError("Network error");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [surahNumber, edition]);

  return { surahData, isLoading, error };
}
