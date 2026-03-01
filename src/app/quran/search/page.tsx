"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuranSearch } from "@/hooks/useQuranSearch";

export default function QuranSearchPage() {
  const [query, setQuery] = useState("");
  const { results, isSearching } = useQuranSearch(query);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      {/* Search input */}
      <div className="relative mb-8">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
          width="20" height="20" viewBox="0 0 20 20" fill="none"
        >
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search the Quran..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:border-gray-400 dark:focus:border-neutral-500 transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-600"
        />
      </div>

      {/* Loading */}
      {isSearching && (
        <div className="flex items-center justify-center py-12">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Results */}
      {!isSearching && results.length > 0 && (
        <>
          <p className="text-xs text-gray-400 mb-4">{results.length} results found</p>
          <div className="space-y-3">
            {results.map((r) => (
              <Link
                key={`${r.surah}:${r.ayahNumber}`}
                href={`/quran/${r.surah}#ayah-${r.ayahNumber}`}
                className="block p-4 rounded-2xl border border-gray-100 dark:border-neutral-800 hover:border-gray-200 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900 transition-all hover:shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-gold-500">
                    {r.surahName} {r.surah}:{r.ayahNumber}
                  </span>
                  <span className="font-arabic text-sm text-gray-400 dark:text-gray-500">
                    {r.surahNameArabic}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                  {r.text}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Empty state */}
      {!isSearching && query.trim().length >= 2 && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-300 dark:text-gray-600">No results found</p>
          <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">
            Try different keywords
          </p>
        </div>
      )}

      {/* Initial state */}
      {!query.trim() && (
        <div className="text-center py-16">
          <p className="font-arabic text-2xl text-gray-200 dark:text-gray-700 mb-2">
            ابحث في القرآن
          </p>
          <p className="text-sm text-gray-300 dark:text-gray-600">
            Search across English translations
          </p>
        </div>
      )}
    </div>
  );
}
