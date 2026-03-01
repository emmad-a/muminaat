"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import MoodGrid from "@/components/quran/MoodGrid";
import ShareModal from "@/components/share/ShareModal";
import { MOOD_CATEGORIES, MOOD_VERSES } from "@/data/mood-verses";
import { ShareCardData } from "@/types/viral";
import { SURAH_NAMES } from "@/lib/quran-api";

interface LoadedVerse {
  surah: number;
  ayah: number;
  arabicText: string;
  translation: string;
}

export default function FeelingsPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [verses, setVerses] = useState<LoadedVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [shareData, setShareData] = useState<ShareCardData | null>(null);

  const fetchVerses = useCallback(async (moodId: string) => {
    const refs = MOOD_VERSES[moodId];
    if (!refs) return;

    setLoading(true);
    setVerses([]);

    try {
      const fetched: LoadedVerse[] = [];

      for (const ref of refs) {
        try {
          const [arabicRes, translationRes] = await Promise.all([
            fetch(`https://api.alquran.cloud/v1/ayah/${ref.surah}:${ref.ayah}`),
            fetch(`https://api.alquran.cloud/v1/ayah/${ref.surah}:${ref.ayah}/en.sahih`),
          ]);

          if (arabicRes.ok && translationRes.ok) {
            const arabicData = await arabicRes.json();
            const translationData = await translationRes.json();

            fetched.push({
              surah: ref.surah,
              ayah: ref.ayah,
              arabicText: arabicData.data.text,
              translation: translationData.data.text,
            });
          }
        } catch {
          // Skip failed fetches
        }
      }

      setVerses(fetched);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedMood) {
      fetchVerses(selectedMood);
    }
  }, [selectedMood, fetchVerses]);

  const handleShare = (verse: LoadedVerse) => {
    const surahInfo = SURAH_NAMES[verse.surah];
    setShareData({
      arabicText: verse.arabicText,
      translation: verse.translation,
      surahName: surahInfo?.transliteration || `Surah ${verse.surah}`,
      surahNameArabic: surahInfo?.arabic || "",
      ayahNumber: verse.ayah,
      surahNumber: verse.surah,
    });
  };

  const selectedCategory = MOOD_CATEGORIES.find(c => c.id === selectedMood);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-gold-400/60 text-sm tracking-widest uppercase mb-3">
            What does the Quran say when you feel...
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            How Are You Feeling?
          </h1>
          <p className="text-neutral-400 text-sm">
            Select your emotion and find comfort in Allah&apos;s words
          </p>
        </div>

        {/* Mood Grid */}
        <MoodGrid
          categories={MOOD_CATEGORIES}
          onSelect={setSelectedMood}
          selected={selectedMood}
        />

        {/* Results */}
        {selectedMood && (
          <div className="mt-10">
            {/* Selected mood header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{selectedCategory?.icon}</span>
              <div>
                <h2 className="text-lg font-semibold">
                  When you feel <span className="text-gold-400">{selectedCategory?.label?.toLowerCase()}</span>
                </h2>
                <p className="text-neutral-400 text-sm">{selectedCategory?.description}</p>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-neutral-900 rounded-2xl p-6 animate-pulse">
                    <div className="h-8 bg-neutral-800 rounded mb-4 w-3/4 mx-auto" />
                    <div className="h-4 bg-neutral-800 rounded mb-2 w-full" />
                    <div className="h-4 bg-neutral-800 rounded w-2/3" />
                  </div>
                ))}
              </div>
            )}

            {/* Verses */}
            {!loading && verses.length > 0 && (
              <div className="space-y-4">
                {verses.map((verse, index) => {
                  const surahInfo = SURAH_NAMES[verse.surah];
                  return (
                    <div
                      key={`${verse.surah}:${verse.ayah}`}
                      className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 transition-all hover:border-neutral-700"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Arabic */}
                      <p className="font-arabic text-xl md:text-2xl leading-[2.2] text-center text-white/90 mb-4" dir="rtl">
                        {verse.arabicText}
                      </p>

                      {/* Divider */}
                      <div className="flex items-center gap-3 my-4 mx-auto w-1/3">
                        <div className="flex-1 h-px bg-gold-400/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400/40" />
                        <div className="flex-1 h-px bg-gold-400/20" />
                      </div>

                      {/* Translation */}
                      <p className="text-neutral-400 text-sm leading-relaxed text-center mb-4">
                        {verse.translation}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                        <span className="text-xs text-gold-400/60">
                          {surahInfo?.transliteration} {verse.surah}:{verse.ayah}
                        </span>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/quran/${verse.surah}#ayah-${verse.ayah}`}
                            className="text-xs text-neutral-500 hover:text-gold-400 transition-colors"
                          >
                            Read in context →
                          </Link>
                          <button
                            onClick={() => handleShare(verse)}
                            className="text-xs text-neutral-500 hover:text-gold-400 transition-colors flex items-center gap-1"
                          >
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M3 8a2 2 0 100-4 2 2 0 000 4zM11 4a2 2 0 100-4 2 2 0 000 4zM11 14a2 2 0 100-4 2 2 0 000 4zM4.7 7.1l4.6 2.3M9.3 3.1L4.7 5.4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Share Modal */}
      {shareData && (
        <ShareModal data={shareData} onClose={() => setShareData(null)} />
      )}
    </div>
  );
}
