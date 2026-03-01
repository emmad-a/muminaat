"use client";

import { useEffect, useRef } from "react";
import { Ayah } from "@/types/quran";
import AyahRow from "./AyahRow";

interface AyahListProps {
  ayahs: Ayah[];
  activeAyah: number | null;
  readingMode: boolean;
  arabicFontSize: number;
  translationFontSize: number;
  showTranslation: boolean;
  isBookmarked: (surah: number, ayah: number) => boolean;
  onPlayAyah: (ayahNum: number) => void;
  onBookmarkAyah: (ayahNum: number) => void;
}

export default function AyahList({
  ayahs,
  activeAyah,
  readingMode,
  arabicFontSize,
  translationFontSize,
  showTranslation,
  isBookmarked,
  onPlayAyah,
  onBookmarkAyah,
}: AyahListProps) {
  const activeRef = useRef<number | null>(null);

  // Auto-scroll to active ayah during playback
  useEffect(() => {
    if (activeAyah && activeAyah !== activeRef.current) {
      activeRef.current = activeAyah;
      const el = document.getElementById(`ayah-${activeAyah}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeAyah]);

  return (
    <div>
      {ayahs.map((ayah) => (
        <AyahRow
          key={ayah.numberInSurah}
          ayah={ayah}
          isActive={activeAyah === ayah.numberInSurah}
          readingMode={readingMode}
          arabicFontSize={arabicFontSize}
          translationFontSize={translationFontSize}
          showTranslation={showTranslation}
          isBookmarked={isBookmarked(ayah.surahNumber, ayah.numberInSurah)}
          onPlay={() => onPlayAyah(ayah.numberInSurah)}
          onBookmark={() => onBookmarkAyah(ayah.numberInSurah)}
        />
      ))}
    </div>
  );
}
