import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="pt-28 pb-28 px-6 relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative">
          {/* Arabic logo */}
          <p className="font-logo text-5xl md:text-7xl text-gold-400 mb-4 leading-relaxed animate-fade-in">
            مومنات
          </p>

          {/* English name with gold underline */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">
            <span className="gold-underline">Muminaat</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-neutral-500 tracking-[0.2em] uppercase mt-4 mb-8">
            believer
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-neutral-400 font-light max-w-lg mx-auto leading-relaxed">
            Your companion for Quran reading, listening, and Islamic scholarship.
          </p>
        </div>
      </section>

      {/* Quick Access */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4">
          <Link
            href="/quran/feelings"
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-neutral-950 border border-neutral-800/80 hover:border-gold-400/30 transition-all hover:-translate-y-1"
          >
            <span className="text-3xl">💭</span>
            <span className="text-sm font-medium text-neutral-300">Feelings</span>
            <span className="text-xs text-neutral-500">Find comfort in the Quran</span>
          </Link>
          <Link
            href="/quran/quiz"
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-neutral-950 border border-neutral-800/80 hover:border-gold-400/30 transition-all hover:-translate-y-1"
          >
            <span className="text-3xl">🧠</span>
            <span className="text-sm font-medium text-neutral-300">Daily Quiz</span>
            <span className="text-xs text-neutral-500">Test your knowledge</span>
          </Link>
          <Link
            href="/quran/wrapped"
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-neutral-950 border border-neutral-800/80 hover:border-gold-400/30 transition-all hover:-translate-y-1"
          >
            <span className="text-3xl">📊</span>
            <span className="text-sm font-medium text-neutral-300">My Wrapped</span>
            <span className="text-xs text-neutral-500">Your monthly recap</span>
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Quran Card */}
          <Link
            href="/quran"
            className="group relative overflow-hidden rounded-3xl bg-neutral-950 border border-neutral-800/80 p-10 transition-all duration-300 hover:border-gold-400/30 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gold-400/5 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mb-8">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold-400">
                  <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-3 tracking-tight">
                Quran
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                Read all 114 surahs with Arabic text and English translation. Listen to beautiful recitations verse by verse.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700/50 text-xs text-neutral-400">
                  114 Surahs
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700/50 text-xs text-neutral-400">
                  Audio Playback
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700/50 text-xs text-neutral-400">
                  4 Reciters
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700/50 text-xs text-neutral-400">
                  Search
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gold-400 group-hover:gap-3 transition-all">
                <span>Start Reading</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>

          {/* Fiqh Comparator Card */}
          <Link
            href="/fiqhcomparator"
            className="group relative overflow-hidden rounded-3xl bg-neutral-950 border border-neutral-800/80 p-10 transition-all duration-300 hover:border-gold-400/30 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gold-400/5 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mb-8">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold-400">
                  <path d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-3 tracking-tight">
                Fiqh Comparator
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                Compare Islamic rulings across the four Sunni madhabs with authentic evidence from Quran and Sunnah.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700/50 text-xs text-neutral-400">
                  4 Madhabs
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700/50 text-xs text-neutral-400">
                  With Evidence
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700/50 text-xs text-neutral-400">
                  Scholar Verified
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gold-400 group-hover:gap-3 transition-all">
                <span>Explore Rulings</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800/50 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
          {/* Logo mark */}
          <div className="text-center">
            <p className="font-logo text-2xl text-gold-400 mb-1">مومنات</p>
            <p className="text-xs text-neutral-600 tracking-widest uppercase">Muminaat</p>
          </div>
          <p className="text-sm text-neutral-600 text-center max-w-md">
            For educational purposes only. Consult qualified scholars for personal matters.
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-600">
            <Link href="/quran" className="hover:text-gold-400 transition-colors">
              Quran
            </Link>
            <Link href="/fiqhcomparator" className="hover:text-gold-400 transition-colors">
              Fiqh
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
