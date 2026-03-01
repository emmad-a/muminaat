"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { AudioPlayerState } from "@/types/quran";
import { getAyahAudioUrl, getReciterById, preloadAudio } from "@/lib/quran-audio";

const INITIAL_STATE: AudioPlayerState = {
  playbackState: "idle",
  currentSurah: null,
  currentAyah: null,
  totalAyahs: 0,
  duration: 0,
  currentTime: 0,
  playbackRate: 1,
  repeatMode: "none",
};

export function useAudioPlayer(reciterId: string) {
  const [state, setState] = useState<AudioPlayerState>(INITIAL_STATE);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Create audio element once
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setState((s) => ({ ...s, currentTime: audio.currentTime }));
    };
    const onLoadedMetadata = () => {
      setState((s) => ({ ...s, duration: audio.duration, playbackState: "playing" }));
    };
    const onPlay = () => setState((s) => ({ ...s, playbackState: "playing" }));
    const onPause = () => setState((s) => ({ ...s, playbackState: "paused" }));
    const onError = () => setState((s) => ({ ...s, playbackState: "error" }));
    const onWaiting = () => setState((s) => ({ ...s, playbackState: "loading" }));

    const onEnded = () => {
      const cur = stateRef.current;
      if (cur.repeatMode === "ayah") {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        return;
      }
      if (cur.currentAyah !== null && cur.currentAyah < cur.totalAyahs) {
        // Auto-advance to next ayah
        const nextAyah = cur.currentAyah + 1;
        const reciter = getReciterById(reciterId);
        const url = getAyahAudioUrl(reciter, cur.currentSurah!, nextAyah);
        audio.src = url;
        audio.play().catch(() => {});
        setState((s) => ({ ...s, currentAyah: nextAyah, playbackState: "loading" }));

        // Preload the one after next
        if (nextAyah < cur.totalAyahs) {
          preloadAudio(getAyahAudioUrl(reciter, cur.currentSurah!, nextAyah + 1));
        }
      } else if (cur.repeatMode === "surah" && cur.currentSurah !== null) {
        // Restart surah
        const reciter = getReciterById(reciterId);
        const url = getAyahAudioUrl(reciter, cur.currentSurah, 1);
        audio.src = url;
        audio.play().catch(() => {});
        setState((s) => ({ ...s, currentAyah: 1, playbackState: "loading" }));
      } else {
        setState((s) => ({ ...s, playbackState: "idle" }));
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, [reciterId]);

  const playAyah = useCallback(
    (surah: number, ayah: number, totalAyahs: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      const reciter = getReciterById(reciterId);
      const url = getAyahAudioUrl(reciter, surah, ayah);
      audio.src = url;
      audio.playbackRate = stateRef.current.playbackRate;
      audio.play().catch(() => {});
      setState((s) => ({
        ...s,
        currentSurah: surah,
        currentAyah: ayah,
        totalAyahs,
        playbackState: "loading",
        currentTime: 0,
        duration: 0,
      }));

      // Preload next
      if (ayah < totalAyahs) {
        preloadAudio(getAyahAudioUrl(reciter, surah, ayah + 1));
      }
    },
    [reciterId]
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const resume = useCallback(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = "";
    }
    setState(INITIAL_STATE);
  }, []);

  const nextAyah = useCallback(() => {
    const cur = stateRef.current;
    if (cur.currentSurah && cur.currentAyah && cur.currentAyah < cur.totalAyahs) {
      playAyah(cur.currentSurah, cur.currentAyah + 1, cur.totalAyahs);
    }
  }, [playAyah]);

  const prevAyah = useCallback(() => {
    const cur = stateRef.current;
    if (cur.currentSurah && cur.currentAyah && cur.currentAyah > 1) {
      playAyah(cur.currentSurah, cur.currentAyah - 1, cur.totalAyahs);
    }
  }, [playAyah]);

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
    }
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    const audio = audioRef.current;
    if (audio) audio.playbackRate = rate;
    setState((s) => ({ ...s, playbackRate: rate }));
  }, []);

  const setRepeatMode = useCallback((mode: "none" | "ayah" | "surah") => {
    setState((s) => ({ ...s, repeatMode: mode }));
  }, []);

  return {
    state,
    playAyah,
    pause,
    resume,
    stop,
    nextAyah,
    prevAyah,
    seekTo,
    setPlaybackRate,
    setRepeatMode,
  };
}
