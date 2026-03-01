"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { loadStreak } from "@/lib/streak-store";

export default function Navbar() {
  const pathname = usePathname();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const data = loadStreak();
    setStreak(data.currentStreak);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const linkClass = (path: string) =>
    `text-sm font-medium transition-colors ${
      isActive(path)
        ? "text-gold-400"
        : "text-neutral-400 hover:text-gold-400"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-b border-neutral-800/50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-logo text-gold-400 text-lg">
              مومنات
            </span>
            <span className="text-sm font-semibold tracking-tight text-white/90">
              Muminaat
            </span>
          </Link>
          {streak > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-500/15">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-bold text-gold-400">{streak}</span>
            </div>
          )}
        </div>
        <nav className="flex items-center gap-6 sm:gap-8">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/quran" className={linkClass("/quran")}>
            Quran
          </Link>
          <Link href="/fiqhcomparator" className={linkClass("/fiqhcomparator")}>
            Fiqh
          </Link>
        </nav>
      </div>
    </header>
  );
}
