"use client";

import { useState, useEffect } from "react";
import WrappedSlide from "@/components/quran/WrappedSlide";
import { loadStats, getMonthlyStats, getFavoriteSurah, getActiveDays } from "@/lib/stats-store";
import { loadStreak } from "@/lib/streak-store";
import { SURAH_NAMES } from "@/lib/quran-api";
import { loadBookmarks } from "@/lib/quran-settings";

export default function WrappedPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState<ReturnType<typeof getMonthlyStats> | null>(null);
  const [allStats, setAllStats] = useState<ReturnType<typeof loadStats> | null>(null);
  const [streak, setStreak] = useState(0);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    setStats(getMonthlyStats());
    setAllStats(loadStats());
    setStreak(loadStreak().currentStreak);
    setBookmarkCount(loadBookmarks().length);
  }, []);

  const totalSlides = 6;
  const favSurah = allStats ? getFavoriteSurah(allStats) : null;
  const favSurahName = favSurah ? SURAH_NAMES[favSurah]?.transliteration || `Surah ${favSurah}` : "None yet";
  const activeDays = allStats ? getActiveDays(allStats) : 0;
  const monthName = new Date().toLocaleString("default", { month: "long" });

  const nextSlide = () => setCurrentSlide((s) => Math.min(s + 1, totalSlides - 1));
  const prevSlide = () => setCurrentSlide((s) => Math.max(s - 1, 0));

  // Auto-advance
  useEffect(() => {
    if (currentSlide >= totalSlides - 1) return;
    const timer = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  if (!stats || !allStats) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-neutral-500">Loading your recap...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 pt-6 pb-4">
        {Array.from({ length: totalSlides }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1 rounded-full transition-all ${
              i === currentSlide ? "w-8 bg-gold-400" : "w-4 bg-neutral-700"
            }`}
          />
        ))}
      </div>

      {/* Slides Container */}
      <div className="flex-1 relative max-w-md mx-auto w-full px-6">
        {/* Slide 0: Welcome */}
        <WrappedSlide isActive={currentSlide === 0}>
          <div className="text-center">
            <p className="text-gold-400/60 text-sm tracking-widest uppercase mb-4">Your {monthName} Recap</p>
            <p className="font-logo text-5xl text-gold-400 mb-4">مومنات</p>
            <h1 className="text-3xl font-bold mb-2">Your Quran Wrapped</h1>
            <p className="text-neutral-400">Let&apos;s see your journey this month</p>
          </div>
        </WrappedSlide>

        {/* Slide 1: Ayahs Read */}
        <WrappedSlide isActive={currentSlide === 1}>
          <div className="text-center">
            <p className="text-neutral-500 text-sm uppercase tracking-widest mb-6">This month you read</p>
            <p className="text-7xl font-black text-gold-400 mb-4">{stats.ayahsRead}</p>
            <p className="text-2xl font-light text-white">ayahs</p>
            <p className="text-neutral-500 text-sm mt-6">
              {stats.ayahsRead > 100
                ? "MashaAllah! Incredible dedication."
                : stats.ayahsRead > 20
                ? "Keep going! Every verse counts."
                : "Start reading to build your stats!"}
            </p>
          </div>
        </WrappedSlide>

        {/* Slide 2: Active Days */}
        <WrappedSlide isActive={currentSlide === 2}>
          <div className="text-center">
            <p className="text-neutral-500 text-sm uppercase tracking-widest mb-6">You were active for</p>
            <p className="text-7xl font-black text-gold-400 mb-4">{activeDays}</p>
            <p className="text-2xl font-light text-white">days</p>
            <p className="text-neutral-500 text-sm mt-6">
              Consistency is beloved to Allah.
            </p>
          </div>
        </WrappedSlide>

        {/* Slide 3: Favorite Surah */}
        <WrappedSlide isActive={currentSlide === 3}>
          <div className="text-center">
            <p className="text-neutral-500 text-sm uppercase tracking-widest mb-6">Your most visited surah</p>
            <p className="text-4xl font-bold text-gold-400 mb-2">{favSurahName}</p>
            {favSurah && (
              <p className="text-lg font-arabic text-gold-400/60">{SURAH_NAMES[favSurah]?.arabic}</p>
            )}
          </div>
        </WrappedSlide>

        {/* Slide 4: Streak */}
        <WrappedSlide isActive={currentSlide === 4}>
          <div className="text-center">
            <p className="text-neutral-500 text-sm uppercase tracking-widest mb-6">Your current streak</p>
            <p className="text-6xl mb-2">🔥</p>
            <p className="text-7xl font-black text-gold-400 mb-2">{streak}</p>
            <p className="text-2xl font-light text-white">days</p>
            <p className="text-neutral-500 text-sm mt-6">
              {streak > 30
                ? "SubhanAllah! What dedication!"
                : streak > 7
                ? "Amazing consistency!"
                : "Build your streak by reading daily!"}
            </p>
          </div>
        </WrappedSlide>

        {/* Slide 5: Summary */}
        <WrappedSlide isActive={currentSlide === 5}>
          <div className="text-center">
            <p className="font-logo text-3xl text-gold-400 mb-6">مومنات</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-neutral-900 rounded-xl p-4">
                <p className="text-2xl font-bold text-gold-400">{stats.ayahsRead}</p>
                <p className="text-xs text-neutral-500">Ayahs Read</p>
              </div>
              <div className="bg-neutral-900 rounded-xl p-4">
                <p className="text-2xl font-bold text-gold-400">{activeDays}</p>
                <p className="text-xs text-neutral-500">Active Days</p>
              </div>
              <div className="bg-neutral-900 rounded-xl p-4">
                <p className="text-2xl font-bold text-gold-400">🔥 {streak}</p>
                <p className="text-xs text-neutral-500">Day Streak</p>
              </div>
              <div className="bg-neutral-900 rounded-xl p-4">
                <p className="text-2xl font-bold text-gold-400">{bookmarkCount}</p>
                <p className="text-xs text-neutral-500">Bookmarks</p>
              </div>
            </div>
            <p className="text-neutral-500 text-sm">
              Keep reading. Every letter earns you reward.
            </p>
          </div>
        </WrappedSlide>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 pb-8 px-6">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="px-6 py-3 rounded-xl bg-neutral-800 text-white disabled:opacity-30 transition-all hover:bg-neutral-700"
        >
          ← Back
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="px-6 py-3 rounded-xl bg-gold-500 text-black font-medium disabled:opacity-30 transition-all hover:bg-gold-400"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
