"use client";

import { useState, useEffect, useRef } from "react";
import { QuranSearchResult } from "@/types/quran";
import { searchQuranEnriched } from "@/lib/quran-api";

export function useQuranSearch(query: string, debounceMs = 400) {
  const [results, setResults] = useState<QuranSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    timerRef.current = setTimeout(async () => {
      try {
        const data = await searchQuranEnriched(trimmed);
        setResults(data);
        setError(null);
      } catch {
        setError("Search failed");
      } finally {
        setIsSearching(false);
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, debounceMs]);

  return { results, isSearching, error };
}
