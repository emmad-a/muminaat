"use client";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">☪</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Muminaat</h1>
              <p className="text-sm text-gray-500">Fiqh Comparator</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium">
              Questions
            </a>
            <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium">
              About
            </a>
            <a
              href="https://raleighmasjid.org/wp-content/uploads/2021/07/Differences_in_Fiqh_Made_Easy_Part_I__II.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-600 font-medium"
            >
              Source PDF
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
