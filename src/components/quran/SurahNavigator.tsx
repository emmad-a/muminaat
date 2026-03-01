"use client";

import Link from "next/link";
import { SURAH_NAMES } from "@/lib/quran-api";

interface SurahNavigatorProps {
  currentSurah: number;
}

export default function SurahNavigator({ currentSurah }: SurahNavigatorProps) {
  const prev = currentSurah > 1 ? SURAH_NAMES[currentSurah - 1] : null;
  const next = currentSurah < 114 ? SURAH_NAMES[currentSurah + 1] : null;

  return (
    <div className="flex items-center justify-between py-8 border-t border-gray-100 dark:border-neutral-800 mt-8">
      {prev ? (
        <Link
          href={`/quran/${currentSurah - 1}`}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{prev.transliteration}</span>
        </Link>
      ) : <div />}

      {next ? (
        <Link
          href={`/quran/${currentSurah + 1}`}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span>{next.transliteration}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      ) : <div />}
    </div>
  );
}
