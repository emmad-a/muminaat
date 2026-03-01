"use client";

import { use, useEffect } from "react";
import { useQuranContext } from "../layout";
import { useSurahData } from "@/hooks/useSurahData";
import SurahHeader from "@/components/quran/SurahHeader";
import AyahList from "@/components/quran/AyahList";
import SurahNavigator from "@/components/quran/SurahNavigator";
import { AyahListSkeleton } from "@/components/quran/LoadingSkeleton";
import { saveLastRead } from "@/lib/quran-settings";

export default function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const surahNumber = parseInt(id);
  const { surahData, isLoading, error } = useSurahData(surahNumber);
  const {
    playerState,
    playAyah,
    settings,
    isBookmarked,
    addBookmark,
    removeBookmark,
    surahList,
  } = useQuranContext();

  // Save last read position
  useEffect(() => {
    if (surahData) {
      saveLastRead({ surah: surahNumber, ayah: 1, timestamp: Date.now() });
    }
  }, [surahNumber, surahData]);

  const activeAyah =
    playerState.currentSurah === surahNumber ? playerState.currentAyah : null;

  const handlePlayAyah = (ayahNum: number) => {
    if (surahData) {
      playAyah(surahNumber, ayahNum, surahData.meta.numberOfAyahs);
    }
  };

  const handlePlayAll = () => {
    if (surahData) {
      playAyah(surahNumber, 1, surahData.meta.numberOfAyahs);
    }
  };

  const handleBookmark = (ayahNum: number) => {
    if (isBookmarked(surahNumber, ayahNum)) {
      removeBookmark(`${surahNumber}:${ayahNum}`);
    } else {
      const name = surahData?.meta.transliteration || `Surah ${surahNumber}`;
      addBookmark(surahNumber, ayahNum, name);
    }
  };

  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400">Surah not found</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-gold-500 hover:text-gold-600"
        >
          Try again
        </button>
      </div>
    );
  }

  // Find surah meta from list as fallback while loading
  const meta = surahData?.meta || surahList.find((s) => s.number === surahNumber);

  return (
    <div className="max-w-3xl mx-auto px-4 animate-fade-in">
      {/* Header */}
      {meta && <SurahHeader surah={meta} onPlayAll={handlePlayAll} />}

      {/* Reading mode toggle */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => {}}
          className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
            !settings.readingMode
              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Verse by Verse
        </button>
        <button
          onClick={() => {}}
          className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
            settings.readingMode
              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Reading
        </button>
      </div>

      {/* Verses */}
      {isLoading ? (
        <AyahListSkeleton />
      ) : surahData ? (
        <AyahList
          ayahs={surahData.ayahs}
          activeAyah={activeAyah}
          readingMode={settings.readingMode}
          arabicFontSize={settings.arabicFontSize}
          translationFontSize={settings.translationFontSize}
          showTranslation={settings.showTranslation}
          isBookmarked={isBookmarked}
          onPlayAyah={handlePlayAyah}
          onBookmarkAyah={handleBookmark}
        />
      ) : null}

      {/* Nav */}
      <SurahNavigator currentSurah={surahNumber} />
    </div>
  );
}
