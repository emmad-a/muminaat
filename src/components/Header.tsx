"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-logo text-gold-400 text-2xl leading-none">مومنات</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Muminaat</h1>
              <p className="text-sm text-gray-500">Fiqh Comparator</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-gold-500 font-medium">
              Questions
            </a>
            <Link href="/quran" className="text-gray-600 hover:text-gold-500 font-medium">
              Quran
            </Link>
            <a href="#" className="text-gray-600 hover:text-gold-500 font-medium">
              About
            </a>
            <a
              href="https://raleighmasjid.org/wp-content/uploads/2021/07/Differences_in_Fiqh_Made_Easy_Part_I__II.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gold-500 font-medium"
            >
              Source PDF
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
