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
            href="/quran/settings"
            className={`w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors ${
              pathname === "/quran/settings"
                ? "text-gold-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
            aria-label="Settings"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7.5 2.25H10.5L11.1 4.05C11.55 4.23 11.97 4.47 12.33 4.77L14.1 4.17L15.6 6.83L14.1 8.1C14.13 8.4 14.13 8.7 14.1 9L15.6 10.27L14.1 12.93L12.33 12.33C11.97 12.63 11.55 12.87 11.1 13.05L10.5 14.85H7.5L6.9 13.05C6.45 12.87 6.03 12.63 5.67 12.33L3.9 12.93L2.4 10.27L3.9 9C3.87 8.7 3.87 8.4 3.9 8.1L2.4 6.83L3.9 4.17L5.67 4.77C6.03 4.47 6.45 4.23 6.9 4.05L7.5 2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <circle cx="9" cy="8.55" r="2.25" stroke="currentColor" strokeWidth="1.5"/>
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
