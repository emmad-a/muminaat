"use client";

import { SurahMeta } from "@/types/quran";

interface SurahHeaderProps {
  surah: SurahMeta;
  onPlayAll: () => void;
}

export default function SurahHeader({ surah, onPlayAll }: SurahHeaderProps) {
  const showBismillah = surah.number !== 1 && surah.number !== 9;

  return (
    <div className="text-center py-12 px-4">
      {/* Surah number */}
      <p className="text-xs font-medium text-gold-400 tracking-widest uppercase mb-3">
        Surah {surah.number}
      </p>

      {/* Arabic name */}
      <p className="font-arabic text-4xl text-gray-800 dark:text-gray-200 mb-2">
        {surah.arabic}
      </p>

      {/* English name */}
      <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {surah.transliteration}
      </h1>
      <p className="text-sm text-gray-400 mt-1">
        {surah.englishNameTranslation}
      </p>

      {/* Meta */}
      <p className="text-xs text-gray-300 dark:text-gray-600 mt-3">
        {surah.revelationType} &middot; {surah.numberOfAyahs} Ayahs
      </p>

      {/* Play all button */}
      <button
        onClick={onPlayAll}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border border-gold-400/30 text-gold-400 hover:bg-gold-400/10 hover:border-gold-400/60 transition-all active:scale-95"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4 2.5L13 8L4 13.5V2.5Z"/>
        </svg>
        Listen
      </button>

      {/* Bismillah */}
      {showBismillah && (
        <p className="font-arabic text-2xl text-gold-400/60 mt-8">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>
      )}

      {/* Divider */}
      <div className="mt-8 border-b border-gray-100 dark:border-neutral-800" />
    </div>
  );
}
