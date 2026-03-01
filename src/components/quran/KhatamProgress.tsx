"use client";

import { KhatamProgress as KhatamProgressType } from "@/types/viral";

interface KhatamProgressProps {
  progress: KhatamProgressType | null;
  community: { completedJuz: number[]; readers: number };
  onClaim: (juz: number) => void;
  onComplete: (juz: number) => void;
}

export default function KhatamProgress({ progress, community, onClaim, onComplete }: KhatamProgressProps) {
  if (!progress) return null;

  const allCompleted = new Set([...progress.completedJuz, ...community.completedJuz]);
  const totalCompleted = allCompleted.size;
  const percentage = Math.round((totalCompleted / 30) * 100);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>📖</span> Community Khatam
          </h3>
          <p className="text-sm text-neutral-400 mt-0.5">
            {community.readers.toLocaleString()} readers participating
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-gold-400">{percentage}%</span>
          <p className="text-xs text-neutral-500">{totalCompleted}/30 Juz</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-neutral-800 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Juz Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 mb-4">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => {
          const isClaimed = progress.claimedJuz.includes(juz);
          const isCompleted = progress.completedJuz.includes(juz);
          const isCommunityCompleted = community.completedJuz.includes(juz);

          let bgClass = "bg-neutral-800 hover:bg-neutral-700 text-neutral-400";
          if (isCompleted) {
            bgClass = "bg-gold-500 text-black";
          } else if (isClaimed) {
            bgClass = "bg-gold-500/20 border-gold-500/40 text-gold-400";
          } else if (isCommunityCompleted) {
            bgClass = "bg-neutral-700 text-neutral-300";
          }

          return (
            <button
              key={juz}
              onClick={() => {
                if (isCompleted) return;
                if (isClaimed) {
                  onComplete(juz);
                } else {
                  onClaim(juz);
                }
              }}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all border border-transparent ${bgClass}`}
              title={
                isCompleted
                  ? `Juz ${juz} — Completed`
                  : isClaimed
                  ? `Juz ${juz} — Click to mark complete`
                  : `Juz ${juz} — Click to claim`
              }
            >
              {isCompleted ? "✓" : juz}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-neutral-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-gold-500 inline-block" /> You completed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-gold-500/20 border border-gold-500/40 inline-block" /> You claimed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-neutral-700 inline-block" /> Community
        </span>
      </div>
    </div>
  );
}
