"use client";

interface StreakBadgeProps {
  streak: number;
  className?: string;
}

export default function StreakBadge({ streak, className = "" }: StreakBadgeProps) {
  if (streak <= 0) return null;

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-500/15 ${className}`}>
      <span className="text-sm animate-pulse">🔥</span>
      <span className="text-xs font-bold text-gold-400">{streak}</span>
    </div>
  );
}
