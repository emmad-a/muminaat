import type { Metadata } from "next";
import { SURAH_NAMES } from "@/lib/quran-api";
import SurahPageClient from "./SurahPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const num = parseInt(id);
  const surah = SURAH_NAMES[num];

  if (!surah || isNaN(num) || num < 1 || num > 114) {
    return { title: "Surah Not Found" };
  }

  return {
    title: `Surah ${surah.transliteration} (${surah.english})`,
    description: `Read Surah ${surah.transliteration} (${surah.arabic}) — ${surah.english} — Surah ${num} of the Holy Quran with Arabic text, English translation, and audio recitation.`,
    openGraph: {
      title: `Surah ${surah.transliteration} — ${surah.english} | Quran`,
      description: `Read Surah ${surah.transliteration} (${surah.arabic}) with Arabic text, English translation, and audio recitation.`,
    },
    alternates: {
      canonical: `/quran/${num}`,
    },
  };
}

export default function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  return <SurahPageClient params={params} />;
}
