"use client";

import Link from "next/link";
import { SurahMeta } from "@/types/quran";

interface SurahCardProps {
  surah: SurahMeta;
  isLastRead?: boolean;
}

export default function SurahCard({ surah, isLastRead }: SurahCardProps) {
  return (
    <Link
      href={`/quran/${surah.number}`}
      className={`group flex items-center gap-4 px-4 py-4 rounded-2xl border transition-all duration-200 hover:scale-[1.01] hover:shadow-md active:scale-[0.99] ${
        isLastRead
          ? "border-gold-400/40 bg-gold-50/50 dark:bg-gold-900/20 dark:border-gold-700/40"
          : "border-gray-100 bg-white dark:bg-neutral-900 dark:border-neutral-800 hover:border-gold-400/30 dark:hover:border-gold-400/20"
      }`}
    >
      {/* Number badge */}
      <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rotate-45 rounded-lg border ${
        isLastRead
          ? "border-gold-400/50 bg-gold-400/10"
          : "border-gray-200 dark:border-neutral-700 group-hover:border-gold-400/30"
      } transition-colors`}>
        <span className={`-rotate-45 text-sm font-medium ${
          isLastRead ? "text-gold-500" : "text-gray-500 dark:text-gray-400"
        }`}>
          {surah.number}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[15px] text-gray-900 dark:text-gray-100 truncate">
          {surah.transliteration}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          {surah.englishNameTranslation} &middot; {surah.numberOfAyahs} Ayahs
        </p>
      </div>

      {/* Arabic name */}
      <p className="font-arabic text-xl text-gold-400/70 dark:text-gold-400/50 flex-shrink-0 group-hover:text-gold-400 transition-colors">
        {surah.arabic}
      </p>
    </Link>
  );
}
