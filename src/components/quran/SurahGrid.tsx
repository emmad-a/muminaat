"use client";

import { SurahMeta } from "@/types/quran";
import SurahCard from "./SurahCard";

interface SurahGridProps {
  surahs: SurahMeta[];
  lastReadSurah?: number;
  readingProgress?: Record<number, number>; // surahNumber -> ayahsRead
}

export default function SurahGrid({ surahs, lastReadSurah, readingProgress }: SurahGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {surahs.map((surah) => (
        <SurahCard
          key={surah.number}
          surah={surah}
          isLastRead={surah.number === lastReadSurah}
          readCount={readingProgress?.[surah.number]}
        />
      ))}
    </div>
  );
}
