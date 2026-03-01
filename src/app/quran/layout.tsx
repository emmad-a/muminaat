"use client";

import { createContext, useContext, useEffect, useState } from "react";
import AudioPlayer from "@/components/quran/AudioPlayer";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useQuranSettings } from "@/hooks/useQuranSettings";
import { useBookmarks } from "@/hooks/useBookmarks";
import { SurahMeta, AudioPlayerState, QuranSettings, Bookmark } from "@/types/quran";
import { fetchSurahList } from "@/lib/quran-api";

interface QuranContextType {
  // Audio
  playerState: AudioPlayerState;
  playAyah: (surah: number, ayah: number, totalAyahs: number) => void;
  playSurah: (surah: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  nextAyah: () => void;
  prevAyah: () => void;
  seekTo: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
  setRepeatMode: (mode: "none" | "ayah" | "surah") => void;
  // Settings
  settings: QuranSettings;
  updateSetting: <K extends keyof QuranSettings>(key: K, value: QuranSettings[K]) => void;
  resetSettings: () => void;
  // Bookmarks
  bookmarks: Bookmark[];
  addBookmark: (surah: number, ayah: number, surahName: string) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (surah: number, ayah: number) => boolean;
  // Surah list
  surahList: SurahMeta[];
}

const QuranContext = createContext<QuranContextType | null>(null);

export function useQuranContext() {
  const ctx = useContext(QuranContext);
  if (!ctx) throw new Error("useQuranContext must be used within QuranLayout");
  return ctx;
}

export default function QuranLayout({ children }: { children: React.ReactNode }) {
  const { settings, updateSetting, resetSettings } = useQuranSettings();
  const audio = useAudioPlayer(settings.reciterId, settings.audioMode);
  const bm = useBookmarks();
  const [surahList, setSurahList] = useState<SurahMeta[]>([]);

  useEffect(() => {
    fetchSurahList().then(setSurahList);
  }, []);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === "dark") {
      root.classList.add("dark");
    } else if (settings.theme === "light") {
      root.classList.remove("dark");
    } else {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const apply = () => mq.matches ? root.classList.add("dark") : root.classList.remove("dark");
      apply();
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
  }, [settings.theme]);

  const ctx: QuranContextType = {
    playerState: audio.state,
    playAyah: audio.playAyah,
    playSurah: audio.playSurah,
    pause: audio.pause,
    resume: audio.resume,
    stop: audio.stop,
    nextAyah: audio.nextAyah,
    prevAyah: audio.prevAyah,
    seekTo: audio.seekTo,
    setPlaybackRate: audio.setPlaybackRate,
    setRepeatMode: audio.setRepeatMode,
    settings,
    updateSetting,
    resetSettings,
    bookmarks: bm.bookmarks,
    addBookmark: bm.addBookmark,
    removeBookmark: bm.removeBookmark,
    isBookmarked: bm.isBookmarked,
    surahList,
  };

  const showPlayer = audio.state.playbackState !== "idle";

  return (
    <QuranContext.Provider value={ctx}>
      <div className="min-h-screen pt-14 bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors">
        <main className={showPlayer ? "pb-20" : ""}>
          {children}
        </main>
        {showPlayer && <AudioPlayer />}
      </div>
    </QuranContext.Provider>
  );
}
