"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function QuranNav() {
  const pathname = usePathname();
  const isIndex = pathname === "/quran";

  return (
    <nav className="glass sticky top-0 z-40 border-b border-gray-200/60 dark:border-neutral-800/60">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          {!isIndex && (
            <Link
              href="/quran"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Back to surahs"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          )}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-logo text-gold-400 text-lg leading-none">مومنات</span>
            <span className="font-semibold text-gray-900 dark:text-white text-sm tracking-tight">Muminaat</span>
          </Link>
          <span className="text-[10px] font-medium text-gold-400 tracking-widest uppercase">Quran</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Link
            href="/quran/search"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-gray-500 dark:text-gray-400"
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Link>
          <Link
            href="/"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-gray-500 dark:text-gray-400"
            aria-label="Back to Muminaat home"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2.25 9L9 2.25L15.75 9M4.5 7.5V14.25C4.5 14.66 4.84 15 5.25 15H7.5V11.25H10.5V15H12.75C13.16 15 13.5 14.66 13.5 14.25V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
