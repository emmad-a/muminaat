"use client";

import { Ayah } from "@/types/quran";

interface AyahRowProps {
  ayah: Ayah;
  isActive: boolean;
  readingMode: boolean;
  arabicFontSize: number;
  translationFontSize: number;
  showTranslation: boolean;
  isBookmarked: boolean;
  activeWordIndex: number | null;
  onPlay: () => void;
  onBookmark: () => void;
  onShare?: () => void;
}

export default function AyahRow({
  ayah,
  isActive,
  readingMode,
  arabicFontSize,
  translationFontSize,
  showTranslation,
  isBookmarked,
  activeWordIndex,
  onPlay,
  onBookmark,
  onShare,
}: AyahRowProps) {
  if (readingMode) {
    return (
      <div
        id={`ayah-${ayah.numberInSurah}`}
        className={`py-2 text-center transition-colors duration-300 cursor-pointer ${
          isActive ? "bg-gold-50/60 dark:bg-gold-900/20" : ""
        }`}
        onClick={onPlay}
      >
        <span
          className="font-arabic leading-[2.4] text-gray-800 dark:text-gray-200"
          style={{ fontSize: arabicFontSize }}
          dir="rtl"
        >
          <ArabicText text={ayah.text} activeWordIndex={activeWordIndex} />{" "}
          <span className="text-gold-400 text-[0.6em]">
            ﴿{toArabicNumeral(ayah.numberInSurah)}﴾
          </span>
        </span>
      </div>
    );
  }

  return (
    <div
      id={`ayah-${ayah.numberInSurah}`}
      className={`group py-6 border-b border-gray-50 dark:border-neutral-800/50 transition-colors duration-300 ${
        isActive ? "bg-gold-50/40 dark:bg-gold-900/30 border-l-4 border-l-gold-400 pl-4 -ml-4 rounded-r-lg" : ""
      }`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* Verse number */}
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800 text-xs font-medium text-gray-500 dark:text-gray-400">
            {ayah.numberInSurah}
          </span>

          {/* Play */}
          <button
            onClick={onPlay}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            aria-label="Play this verse"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M3 1.5L12 7L3 12.5V1.5Z"/>
            </svg>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Bookmark */}
          <button
            onClick={onBookmark}
            className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors ${
              isBookmarked ? "text-gold-500" : "text-gray-300 dark:text-gray-600"
            }`}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
              <path d="M3 2C3 1.44772 3.44772 1 4 1H10C10.5523 1 11 1.44772 11 2V13L7 10L3 13V2Z"/>
            </svg>
          </button>

          {/* Copy */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(`${ayah.text}\n\n${ayah.translation}\n\n— ${ayah.surahNumber}:${ayah.numberInSurah}`);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-gray-300 dark:text-gray-600 hover:text-gray-500"
            aria-label="Copy verse"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="4" y="4" width="9" height="9" rx="1.5"/>
              <path d="M10 4V2.5C10 1.67 9.33 1 8.5 1H2.5C1.67 1 1 1.67 1 2.5V8.5C1 9.33 1.67 10 2.5 10H4"/>
            </svg>
          </button>

          {/* Share */}
          {onShare && (
            <button
              onClick={onShare}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-gray-300 dark:text-gray-600 hover:text-gold-500"
              aria-label="Share verse"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8a2 2 0 100-4 2 2 0 000 4zM11 4a2 2 0 100-4 2 2 0 000 4zM11 14a2 2 0 100-4 2 2 0 000 4zM4.7 7.1l4.6 2.3M9.3 3.1L4.7 5.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Arabic text */}
      <div dir="rtl" className="mb-3">
        <p
          className="font-arabic leading-[2.2] text-gray-800 dark:text-gray-200"
          style={{ fontSize: arabicFontSize }}
        >
          <ArabicText text={ayah.text} activeWordIndex={activeWordIndex} />
        </p>
      </div>

      {/* Translation */}
      {showTranslation && (
        <p
          className="text-gray-500 dark:text-gray-400 leading-relaxed"
          style={{ fontSize: translationFontSize }}
        >
          {ayah.translation}
        </p>
      )}

      {/* Sajda indicator */}
      {ayah.sajda && (
        <p className="text-xs text-gold-500 mt-2 font-medium">
          ۩ Sajdah
        </p>
      )}
    </div>
  );
}

/**
 * Renders Arabic text with optional word-level highlighting.
 * When activeWordIndex is null, renders as a plain text node (zero cost).
 * When set, splits text by spaces and highlights the active word in gold.
 */
function ArabicText({ text, activeWordIndex }: { text: string; activeWordIndex: number | null }) {
  // Always split into spans so React doesn't reconcile between text nodes and elements
  const words = text.split(" ");

  if (activeWordIndex === null) {
    // Still render spans, just with no highlight — avoids DOM structure thrashing
    return (
      <>
        {words.map((word, idx) => (
          <span key={idx}>
            {word}
            {idx < words.length - 1 ? " " : ""}
          </span>
        ))}
      </>
    );
  }

  return (
    <>
      {words.map((word, idx) => (
        <span
          key={idx}
          className={
            idx === activeWordIndex
              ? "text-gold-400 transition-colors duration-150"
              : "transition-colors duration-150"
          }
          style={
            idx === activeWordIndex
              ? { textShadow: "0 0 8px rgba(201,168,76,0.4)" }
              : undefined
          }
        >
          {word}
          {idx < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

function toArabicNumeral(num: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(num)
    .split("")
    .map((d) => arabicNumerals[parseInt(d)])
    .join("");
}
