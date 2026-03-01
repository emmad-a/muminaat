"use client";

import { useState, useRef, useCallback } from "react";
import { ShareCardData, ShareCardTheme } from "@/types/viral";
import AyahCard from "./AyahCard";
import CardThemePicker from "./CardThemePicker";
import { generateCardImage, downloadImage, shareImage, incrementShareCount, getShareCount } from "@/lib/share-utils";

interface ShareModalProps {
  data: ShareCardData;
  onClose: () => void;
}

export default function ShareModal({ data, onClose }: ShareModalProps) {
  const [theme, setTheme] = useState<ShareCardTheme>("midnight");
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareCount, setShareCount] = useState(() => getShareCount(data.surahNumber, data.ayahNumber));
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      const blob = await generateCardImage(cardRef.current);
      await downloadImage(blob, `muminaat-${data.surahNumber}-${data.ayahNumber}.png`);
      const count = incrementShareCount(data.surahNumber, data.ayahNumber);
      setShareCount(count);
    } catch (err) {
      console.error("Failed to generate card:", err);
    } finally {
      setIsGenerating(false);
    }
  }, [data.surahNumber, data.ayahNumber]);

  const handleShare = useCallback(async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      const blob = await generateCardImage(cardRef.current);
      const shared = await shareImage(
        blob,
        `Quran ${data.surahNumber}:${data.ayahNumber}`,
        `${data.surahName} ${data.surahNumber}:${data.ayahNumber} — via Muminaat`
      );
      if (!shared) {
        await downloadImage(blob, `muminaat-${data.surahNumber}-${data.ayahNumber}.png`);
      }
      const count = incrementShareCount(data.surahNumber, data.ayahNumber);
      setShareCount(count);
    } catch (err) {
      console.error("Failed to share:", err);
    } finally {
      setIsGenerating(false);
    }
  }, [data]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-neutral-900 rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Share Verse</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">&times;</button>
        </div>

        {/* Card Preview */}
        <div className="flex justify-center mb-4 overflow-hidden rounded-xl">
          <div style={{ transform: "scale(0.65)", transformOrigin: "top center", marginBottom: -225 }}>
            <AyahCard ref={cardRef} data={data} theme={theme} />
          </div>
        </div>

        {/* Theme Picker */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-400">Card Theme</span>
          <CardThemePicker selected={theme} onSelect={setTheme} />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 3v9m0 0l-3-3m3 3l3-3M3 14h12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download
          </button>
          <button
            onClick={handleShare}
            disabled={isGenerating}
            className="flex-1 py-3 bg-gold-500 hover:bg-gold-600 text-black rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 12a3 3 0 100-6 3 3 0 000 6zM14 6a3 3 0 100-6 3 3 0 000 6zM14 18a3 3 0 100-6 3 3 0 000 6zM6.7 10.3l4.6 2.4M11.3 4.3L6.7 6.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Share
          </button>
        </div>

        {/* Sadaqah Jariyah message */}
        <div className="bg-gold-500/10 border border-gold-500/20 rounded-xl p-4 text-center">
          <p className="text-gold-400 text-sm font-medium mb-1">Sadaqah Jariyah</p>
          <p className="text-gray-400 text-xs leading-relaxed">
            Share beneficial knowledge. The Prophet ﷺ said: &ldquo;Whoever guides someone to goodness will have a reward like the one who did it.&rdquo;
          </p>
          {shareCount > 0 && (
            <p className="text-gold-400/60 text-xs mt-2">
              This verse has been shared {shareCount} time{shareCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
