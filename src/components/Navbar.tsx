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
          {pathname.startsWith("/quran") && (
            <Link
              href="/quran/settings"
              className={`transition-colors ${
                pathname === "/quran/settings"
                  ? "text-gold-400"
                  : "text-neutral-400 hover:text-gold-400"
              }`}
              aria-label="Settings"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7.5 2.25H10.5L11.1 4.05C11.55 4.23 11.97 4.47 12.33 4.77L14.1 4.17L15.6 6.83L14.1 8.1C14.13 8.4 14.13 8.7 14.1 9L15.6 10.27L14.1 12.93L12.33 12.33C11.97 12.63 11.55 12.87 11.1 13.05L10.5 14.85H7.5L6.9 13.05C6.45 12.87 6.03 12.63 5.67 12.33L3.9 12.93L2.4 10.27L3.9 9C3.87 8.7 3.87 8.4 3.9 8.1L2.4 6.83L3.9 4.17L5.67 4.77C6.03 4.47 6.45 4.23 6.9 4.05L7.5 2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="9" cy="8.55" r="2.25" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
