"use client";

import { useState } from "react";
import { KhatamProgress as KhatamProgressType, UserProfile } from "@/types/viral";
import { LeaderboardEntry } from "@/lib/khatam-store";
import { USER_AVATARS, createUser } from "@/lib/user-store";

interface KhatamProgressProps {
  progress: KhatamProgressType | null;
  community: { completedJuz: number[]; readers: number };
  leaderboard: LeaderboardEntry[];
  userProfile: UserProfile | null;
  onClaim: (juz: number) => void;
  onComplete: (juz: number) => void;
  onJoin: (profile: UserProfile) => void;
}

function JoinForm({ onJoin }: { onJoin: (profile: UserProfile) => void }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("🤲");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const profile = createUser(name, avatar);
    onJoin(profile);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
      <div className="text-center mb-6">
        <span className="text-4xl mb-3 block">📖</span>
        <h3 className="text-xl font-bold text-white mb-2">Join the Community Khatam</h3>
        <p className="text-sm text-neutral-400">
          Read the Quran together with the community. Claim juz, track your progress, and see where you rank.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            maxLength={20}
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold-400/50 transition-colors"
          />
        </div>

        {/* Avatar Picker */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Choose Your Avatar
          </label>
          <div className="grid grid-cols-6 gap-2">
            {USER_AVATARS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAvatar(a)}
                className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all ${
                  avatar === a
                    ? "bg-gold-500/20 border-2 border-gold-400 scale-110"
                    : "bg-neutral-800 border border-neutral-700 hover:border-neutral-600"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full py-3.5 bg-gold-500 hover:bg-gold-600 disabled:bg-neutral-700 disabled:text-neutral-500 text-black font-semibold rounded-xl transition-colors"
        >
          Join Khatam Challenge
        </button>
      </form>
    </div>
  );
}

export default function KhatamProgress({ progress, community, leaderboard, userProfile, onClaim, onComplete, onJoin }: KhatamProgressProps) {
  const [tab, setTab] = useState<"progress" | "leaderboard">("progress");

  // Show join form if no user profile
  if (!userProfile) {
    return <JoinForm onJoin={onJoin} />;
  }

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
            {community.readers.toLocaleString()} readers participating · Welcome, {userProfile.name}!
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-gold-400">{percentage}%</span>
          <p className="text-xs text-neutral-500">{totalCompleted}/30 Juz</p>
        </div>
      </div>

      {/* Your Stats Bar */}
      <div className="flex items-center gap-3 bg-gold-500/10 border border-gold-500/20 rounded-xl px-4 py-3 mb-5">
        <span className="text-2xl">{userProfile.avatar}</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gold-400">{userProfile.name}</p>
          <p className="text-xs text-neutral-400">
            {progress.completedJuz.length} juz completed · {progress.claimedJuz.length} claimed
          </p>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-gold-400">{progress.completedJuz.length}/30</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-neutral-800 rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-800 rounded-xl p-1 mb-5">
        <button
          onClick={() => setTab("progress")}
          className={`flex-1 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
            tab === "progress"
              ? "bg-neutral-700 text-white shadow-sm"
              : "text-neutral-400 hover:text-neutral-300"
          }`}
        >
          Juz Grid
        </button>
        <button
          onClick={() => setTab("leaderboard")}
          className={`flex-1 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
            tab === "leaderboard"
              ? "bg-neutral-700 text-white shadow-sm"
              : "text-neutral-400 hover:text-neutral-300"
          }`}
        >
          🏆 Leaderboard
        </button>
      </div>

      {tab === "progress" && (
        <>
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
                      ? `Juz ${juz} — Completed ✓`
                      : isClaimed
                      ? `Juz ${juz} — Tap to mark complete`
                      : `Juz ${juz} — Tap to claim`
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
        </>
      )}

      {tab === "leaderboard" && (
        <div className="space-y-2">
          {leaderboard.map((entry, index) => {
            const rank = index + 1;
            const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;

            return (
              <div
                key={`${entry.name}-${index}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  entry.isUser
                    ? "bg-gold-500/10 border border-gold-500/30"
                    : "bg-neutral-800/50 border border-transparent hover:border-neutral-700"
                }`}
              >
                {/* Rank */}
                <div className="w-7 text-center shrink-0">
                  {medal ? (
                    <span className="text-lg">{medal}</span>
                  ) : (
                    <span className="text-sm font-bold text-neutral-500">#{rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <span className="text-lg shrink-0">{entry.avatar}</span>

                {/* Name + streak */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${entry.isUser ? "text-gold-400" : "text-white"}`}>
                    {entry.name}
                  </p>
                  {entry.streak > 0 && (
                    <p className="text-xs text-neutral-500">
                      🔥 {entry.streak} day streak
                    </p>
                  )}
                </div>

                {/* Juz count */}
                <div className="text-right shrink-0">
                  <span className={`text-sm font-bold ${entry.isUser ? "text-gold-400" : "text-white"}`}>
                    {entry.juzCompleted}
                  </span>
                  <p className="text-xs text-neutral-500">juz</p>
                </div>

                {/* Mini progress */}
                <div className="w-16 shrink-0">
                  <div className="h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        entry.isUser ? "bg-gold-400" : "bg-neutral-500"
                      }`}
                      style={{ width: `${(entry.juzCompleted / 30) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Encouragement */}
          <div className="text-center pt-3 pb-1">
            <p className="text-xs text-neutral-500">
              Complete more juz to climb the leaderboard! 🚀
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
