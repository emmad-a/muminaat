"use client";

import { useQuranContext } from "@/app/quran/layout";
import { SURAH_NAMES } from "@/lib/quran-api";
import { getReciterById } from "@/lib/quran-audio";

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer() {
  const {
    playerState,
    pause,
    resume,
    stop,
    nextAyah,
    prevAyah,
    seekTo,
    setPlaybackRate,
    setRepeatMode,
    settings,
  } = useQuranContext();

  const { playbackState, currentSurah, currentAyah, duration, currentTime, playbackRate, repeatMode, totalAyahs } =
    playerState;

  const surahInfo = currentSurah ? SURAH_NAMES[currentSurah] : null;
  const reciter = getReciterById(settings.reciterId);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isPlaying = playbackState === "playing";
  const isLoading = playbackState === "loading";

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seekTo(ratio * duration);
  };

  const speeds = [0.5, 0.75, 1, 1.25, 1.5];
  const nextSpeed = () => {
    const idx = speeds.indexOf(playbackRate);
    const next = speeds[(idx + 1) % speeds.length];
    setPlaybackRate(next);
  };

  const cycleRepeat = () => {
    if (repeatMode === "none") setRepeatMode("ayah");
    else if (repeatMode === "ayah") setRepeatMode("surah");
    else setRepeatMode("none");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-gray-200/50 dark:border-neutral-800/50 animate-slide-up">
      {/* Progress bar */}
      <div
        className="h-1 cursor-pointer group"
        onClick={handleSeek}
      >
        <div className="h-full bg-gray-200/60 dark:bg-neutral-700/60 relative">
          <div
            className="h-full bg-gold-400 transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-400 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {surahInfo?.transliteration || "—"}{" "}
            <span className="text-gold-400 font-normal">
              {currentAyah ? `${currentAyah}/${totalAyahs}` : ""}
            </span>
          </p>
          <p className="text-[11px] text-gray-400 truncate">
            {reciter.name} &middot; {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          {/* Speed */}
          <button
            onClick={nextSpeed}
            className="w-9 h-9 flex items-center justify-center rounded-full text-xs font-medium text-gray-400 hover:text-gold-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            title="Playback speed"
          >
            {playbackRate}x
          </button>

          {/* Repeat */}
          <button
            onClick={cycleRepeat}
            className={`w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors ${
              repeatMode !== "none" ? "text-gold-400" : "text-gray-400"
            }`}
            title={`Repeat: ${repeatMode}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 5.5C1 3.84 2.34 2.5 4 2.5H12L10 0.5M15 10.5C15 12.16 13.66 13.5 12 13.5H4L6 15.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {repeatMode === "ayah" && <span className="absolute text-[7px] font-bold">1</span>}
          </button>

          {/* Prev */}
          <button
            onClick={prevAyah}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 3V13M5 8L13 3V13L5 8Z"/>
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={isPlaying ? pause : resume}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-gold-400 text-black hover:bg-gold-300 active:scale-95 transition-all"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="3" y="2" width="4" height="12" rx="1"/>
                <rect x="9" y="2" width="4" height="12" rx="1"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 2L13 8L4 14V2Z"/>
              </svg>
            )}
          </button>

          {/* Next */}
          <button
            onClick={nextAyah}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13 3V13M11 8L3 3V13L11 8Z"/>
            </svg>
          </button>

          {/* Stop/Close */}
          <button
            onClick={stop}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 1L13 13M1 13L13 1"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
