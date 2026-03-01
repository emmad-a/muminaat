"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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
        <Link href="/" className="flex items-center gap-2">
          <span className="font-logo text-gold-400 text-lg">
            مومنات
          </span>
          <span className="text-sm font-semibold tracking-tight text-white/90">
            Muminaat
          </span>
        </Link>
        <nav className="flex items-center gap-8">
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
