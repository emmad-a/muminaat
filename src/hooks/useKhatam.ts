"use client";

import { useState, useEffect, useCallback } from "react";
import { KhatamProgress } from "@/types/viral";
import { loadKhatam, claimJuz, completeJuz, resetKhatam, getCommunityProgress } from "@/lib/khatam-store";

export function useKhatam() {
  const [progress, setProgress] = useState<KhatamProgress | null>(null);
  const [community, setCommunity] = useState<{ completedJuz: number[]; readers: number }>({ completedJuz: [], readers: 0 });

  useEffect(() => {
    setProgress(loadKhatam());
    setCommunity(getCommunityProgress());
  }, []);

  const claim = useCallback((juz: number) => {
    const updated = claimJuz(juz);
    setProgress({ ...updated });
  }, []);

  const complete = useCallback((juz: number) => {
    const updated = completeJuz(juz);
    setProgress({ ...updated });
  }, []);

  const reset = useCallback(() => {
    const updated = resetKhatam();
    setProgress({ ...updated });
  }, []);

  return { progress, community, claim, complete, reset };
}
