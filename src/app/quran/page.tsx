"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useQuranContext } from "@/components/quran/QuranProvider";
import SurahGrid from "@/components/quran/SurahGrid";
import { SurahGridSkeleton } from "@/components/quran/LoadingSkeleton";
import KhatamProgress from "@/components/quran/KhatamProgress";
import { useKhatam } from "@/hooks/useKhatam";
import { loadLastRead } from "@/lib/quran-settings";
import { getAllProgress } from "@/lib/reading-store";
import { LastReadPosition } from "@/types/quran";

export default function QuranIndexPage() {
  const { surahList } = useQuranContext();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "meccan" | "medinan">("all");
  const [lastRead, setLastRead] = useState<LastReadPosition | null>(null);
  const [readingProgress, setReadingProgress] = useState<Record<number, number>>({});
  const { progress, community, leaderboard, userProfile, claim, complete, join } = useKhatam();

  useEffect(() => {
    setLastRead(loadLastRead());
    setReadingProgress(getAllProgress());
  }, []);

  const filtered = useMemo(() => {
    let list = surahList;
    if (filter === "meccan") list = list.filter((s) => s.revelationType === "Meccan");
    if (filter === "medinan") list = list.filter((s) => s.revelationType === "Medinan");
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.transliteration.toLowerCase().includes(q) ||
          s.englishNameTranslation.toLowerCase().includes(q) ||
          s.arabic.includes(q) ||
          String(s.number) === q
      );
    }
    return list;
  }, [surahList, filter, search]);

  const isLoading = surahList.length === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Hero */}
      <div className="text-center mb-10">
        <p className="font-arabic text-3xl text-gold-400/70 mb-2">
          القرآن الكريم
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          The Noble Quran
        </h1>
        <p className="text-sm text-gray-400 mt-2">
          114 Surahs &middot; 6,236 Ayahs
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <Link
          href="/quran/feelings"
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-gold-400/30 transition-all hover:scale-[1.02]"
        >
          <span className="text-2xl">💭</span>
          <span className="text-xs font-medium text-neutral-300">Feelings</span>
        </Link>
        <Link
          href="/quran/quiz"
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-gold-400/30 transition-all hover:scale-[1.02]"
        >
          <span className="text-2xl">🧠</span>
          <span className="text-xs font-medium text-neutral-300">Daily Quiz</span>
        </Link>
        <Link
          href="/quran/wrapped"
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-gold-400/30 transition-all hover:scale-[1.02]"
        >
          <span className="text-2xl">📊</span>
          <span className="text-xs font-medium text-neutral-300">My Wrapped</span>
        </Link>
      </div>

      {/* Khatam Progress */}
      <div className="mb-8">
        <KhatamProgress
          progress={progress}
          community={community}
          leaderboard={leaderboard}
          userProfile={userProfile}
          onClaim={claim}
          onComplete={complete}
          onJoin={join}
        />
      </div>

      {/* Continue reading */}
      {lastRead && (
        <Link
          href={`/quran/${lastRead.surah}#ayah-${lastRead.ayah}`}
          className="flex items-center justify-between px-5 py-4 mb-6 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 hover:border-gold-300 transition-colors"
        >
          <div>
            <p className="text-xs font-medium text-gold-500 uppercase tracking-wider mb-1">
              Continue Reading
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Surah {lastRead.surah}, Ayah {lastRead.ayah}
            </p>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-400">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      )}

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
            width="16" height="16" viewBox="0 0 16 16" fill="none"
          >
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search surahs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors placeholder:text-gray-300"
          />
        </div>

        <div className="flex gap-1 bg-gray-100 dark:bg-neutral-900 rounded-xl p-1">
          {(["all", "meccan", "medinan"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                filter === f
                  ? "bg-white dark:bg-neutral-800 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {f === "all" ? "All" : f === "meccan" ? "Meccan" : "Medinan"}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {search && (
        <p className="text-xs text-gray-400 mb-4">
          {filtered.length} {filtered.length === 1 ? "surah" : "surahs"} found
        </p>
      )}

      {/* Grid */}
      {isLoading ? (
        <SurahGridSkeleton />
      ) : (
        <SurahGrid surahs={filtered} lastReadSurah={lastRead?.surah} readingProgress={readingProgress} />
      )}
    </div>
  );
}
