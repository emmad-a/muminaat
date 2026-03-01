"use client";

import { use, useEffect, useState } from "react";
import { useQuranContext } from "../layout";
import { useSurahData } from "@/hooks/useSurahData";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import SurahHeader from "@/components/quran/SurahHeader";
import AyahList from "@/components/quran/AyahList";
import SurahNavigator from "@/components/quran/SurahNavigator";
import ShareModal from "@/components/share/ShareModal";
import { AyahListSkeleton } from "@/components/quran/LoadingSkeleton";
import { saveLastRead } from "@/lib/quran-settings";
import { recordActivity } from "@/lib/streak-store";
import { recordSurahVisit } from "@/lib/stats-store";
import { ShareCardData } from "@/types/viral";
import { SURAH_NAMES } from "@/lib/quran-api";
import { getReciterById } from "@/lib/quran-audio";
import { useSurahSegments } from "@/hooks/useSurahSegments";
import { useWordHighlight } from "@/hooks/useWordHighlight";

export default function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const surahNumber = parseInt(id);
  const { surahData, isLoading, error } = useSurahData(surahNumber);
  const {
    playerState,
    playAyah,
    playSurah,
    settings,
    isBookmarked,
    addBookmark,
    removeBookmark,
    surahList,
  } = useQuranContext();
  const [shareData, setShareData] = useState<ShareCardData | null>(null);

  // Word-by-word highlighting
  const reciter = getReciterById(settings.reciterId);
  const isPlayingThisSurah = playerState.currentSurah === surahNumber;
  const segments = useSurahSegments(
    reciter.quranCdnId,
    isPlayingThisSurah ? surahNumber : null,
    settings.wordHighlight
  );
  const activeWord = useWordHighlight(segments, playerState, settings.wordHighlight && isPlayingThisSurah);

  // Reading progress tracking (scroll-based)
  const totalAyahs = surahData?.meta.numberOfAyahs || 0;
  const { progress } = useReadingProgress(surahNumber, totalAyahs);

  // Save last read position + record streak/stats
  useEffect(() => {
    if (surahData) {
      saveLastRead({ surah: surahNumber, ayah: 1, timestamp: Date.now() });
      recordActivity();
      recordSurahVisit(surahNumber);
    }
  }, [surahNumber, surahData]);

  // In ayah mode, use playerState.currentAyah.
  // In surah mode with word highlighting, derive active ayah from segments.
  const activeAyah =
    playerState.currentSurah === surahNumber
      ? playerState.audioMode === "ayah"
        ? playerState.currentAyah
        : activeWord?.ayahNumber ?? null
      : null;

  const handlePlayAyah = (ayahNum: number) => {
    if (surahData) {
      playAyah(surahNumber, ayahNum, surahData.meta.numberOfAyahs);
    }
  };

  const handlePlayAll = () => {
    if (!surahData) return;
    if (settings.audioMode === "surah") {
      playSurah(surahNumber);
    } else {
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

  const handleShare = (ayahNum: number) => {
    if (!surahData) return;
    const ayah = surahData.ayahs.find(a => a.numberInSurah === ayahNum);
    if (!ayah) return;
    const surahInfo = SURAH_NAMES[surahNumber];
    setShareData({
      arabicText: ayah.text,
      translation: ayah.translation,
      surahName: surahInfo?.transliteration || surahData.meta.transliteration,
      surahNameArabic: surahInfo?.arabic || surahData.meta.arabic,
      ayahNumber: ayahNum,
      surahNumber,
    });
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

      {/* Reading Progress Bar */}
      {totalAyahs > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-neutral-500">Reading Progress</span>
            <span className="text-xs font-medium text-gold-400">
              {progress.read}/{progress.total} ayahs read
            </span>
          </div>
          <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all duration-700"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
          {progress.percent === 100 && (
            <p className="text-xs text-gold-400 mt-1.5 text-center">
              ✨ Surah complete — MashaAllah!
            </p>
          )}
        </div>
      )}

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
          activeWord={activeWord}
          onPlayAyah={handlePlayAyah}
          onBookmarkAyah={handleBookmark}
          onShareAyah={handleShare}
        />
      ) : null}

      {/* Nav */}
      <SurahNavigator currentSurah={surahNumber} />

      {/* Share Modal */}
      {shareData && (
        <ShareModal data={shareData} onClose={() => setShareData(null)} />
      )}
    </div>
  );
}
