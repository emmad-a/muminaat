"use client";

import { useRef, useMemo } from "react";
import { ActiveWordInfo, AudioPlayerState, SurahSegments } from "@/types/quran";

/**
 * Core word tracking logic.
 * Given segments and the current player state, determines which word is active.
 *
 * Uses a "sticky" approach: keeps the last known word highlighted during gaps
 * between segments to prevent flickering.
 *
 * - Ayah mode: segments have absolute timestamps in full surah audio.
 *   We subtract the verse's timestampFrom to get relative time matching the individual ayah audio.
 * - Surah mode: timestamps are absolute, matching the full surah audio directly.
 */
export function useWordHighlight(
  segments: SurahSegments | null,
  playerState: AudioPlayerState,
  enabled: boolean
): ActiveWordInfo | null {
  const { currentTime, currentSurah, currentAyah, audioMode, playbackState } = playerState;
  const lastRef = useRef<ActiveWordInfo | null>(null);

  return useMemo(() => {
    if (!enabled || !segments || playbackState === "idle" || playbackState === "error") {
      lastRef.current = null;
      return null;
    }

    // Current time in milliseconds
    const timeMs = currentTime * 1000;

    let result: ActiveWordInfo | null = null;

    if (audioMode === "ayah") {
      if (currentAyah) {
        const verse = segments[currentAyah];
        if (verse) {
          const offset = verse.timestampFrom;

          // Find matching segment
          for (const [wordIdx, startMs, endMs] of verse.segments) {
            const relStart = startMs - offset;
            const relEnd = endMs - offset;
            if (timeMs >= relStart && timeMs < relEnd) {
              result = { ayahNumber: currentAyah, wordIndex: wordIdx - 1 };
              break;
            }
          }

          // If past all segments, highlight last word
          if (!result && verse.segments.length > 0) {
            const last = verse.segments[verse.segments.length - 1];
            const relEnd = last[2] - offset;
            if (timeMs >= relEnd) {
              result = { ayahNumber: currentAyah, wordIndex: last[0] - 1 };
            }
          }

          // Before first segment, highlight first word
          if (!result && verse.segments.length > 0 && timeMs >= 0) {
            result = { ayahNumber: currentAyah, wordIndex: verse.segments[0][0] - 1 };
          }
        }
      }
    } else if (audioMode === "surah") {
      for (const verseNumStr of Object.keys(segments)) {
        const verseNum = parseInt(verseNumStr);
        const verse = segments[verseNum];
        if (!verse) continue;

        if (timeMs < verse.timestampFrom || timeMs > verse.timestampTo) continue;

        for (const [wordIdx, startMs, endMs] of verse.segments) {
          if (timeMs >= startMs && timeMs < endMs) {
            result = { ayahNumber: verseNum, wordIndex: wordIdx - 1 };
            break;
          }
        }

        // Between segments — highlight nearest
        if (!result && verse.segments.length > 0) {
          const last = verse.segments[verse.segments.length - 1];
          if (timeMs >= last[2] && timeMs <= verse.timestampTo) {
            result = { ayahNumber: verseNum, wordIndex: last[0] - 1 };
          }
        }

        // Before first segment in verse but within verse bounds
        if (!result && verse.segments.length > 0) {
          result = { ayahNumber: verseNum, wordIndex: verse.segments[0][0] - 1 };
        }

        if (result) break;
      }
    }

    // Sticky: if no match found but we're still playing the same ayah, keep last value
    if (!result && lastRef.current) {
      if (audioMode === "ayah" && lastRef.current.ayahNumber === currentAyah) {
        return lastRef.current;
      }
      if (audioMode === "surah" && currentSurah) {
        return lastRef.current;
      }
    }

    lastRef.current = result;
    return result;
  }, [enabled, segments, currentTime, currentAyah, audioMode, playbackState, currentSurah]);
}
