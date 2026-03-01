/**
 * Fetch and parse word timing segments from QuranCDN API.
 * Segments provide [wordIndex, startMs, endMs] for each word in a surah.
 */

import { SurahSegments, VerseSegments, WordSegment } from "@/types/quran";
import { getCached, setCache } from "./quran-cache";

const QURANCDN_BASE = "https://api.qurancdn.com/api/qdc/audio/reciters";

interface QuranCdnVerse {
  verse_key: string;
  timestamp_from: number;
  timestamp_to: number;
  segments: number[][];
}

interface QuranCdnResponse {
  audio_files: Array<{
    verse_timings: QuranCdnVerse[];
  }>;
}

/**
 * Fetch word timing segments for a surah from QuranCDN.
 * Returns null if request fails or data is malformed.
 */
export async function fetchSurahSegments(
  quranCdnId: number,
  surahNumber: number
): Promise<SurahSegments | null> {
  const cacheKey = `segments_${quranCdnId}_${surahNumber}`;
  const cached = getCached<SurahSegments>(cacheKey);
  if (cached) return cached;

  try {
    const url = `${QURANCDN_BASE}/${quranCdnId}/audio_files?chapter=${surahNumber}&segments=true`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data: QuranCdnResponse = await res.json();
    const timings = data.audio_files?.[0]?.verse_timings;
    if (!timings?.length) return null;

    const result: SurahSegments = {};

    for (const verse of timings) {
      // verse_key is "surah:ayah" e.g. "1:3"
      const parts = verse.verse_key.split(":");
      const verseNum = parseInt(parts[1]);
      if (isNaN(verseNum)) continue;

      // Filter valid segments: must be [wordIndex, startMs, endMs]
      const validSegments: WordSegment[] = [];
      if (Array.isArray(verse.segments)) {
        for (const seg of verse.segments) {
          if (Array.isArray(seg) && seg.length >= 3) {
            validSegments.push([seg[0], seg[1], seg[2]]);
          }
        }
      }

      if (validSegments.length > 0) {
        result[verseNum] = {
          segments: validSegments,
          timestampFrom: verse.timestamp_from,
          timestampTo: verse.timestamp_to,
        };
      }
    }

    if (Object.keys(result).length === 0) return null;

    setCache(cacheKey, result);
    return result;
  } catch {
    return null;
  }
}
