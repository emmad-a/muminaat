import type { Metadata } from "next";
import QuranProvider from "@/components/quran/QuranProvider";

export const metadata: Metadata = {
  title: {
    template: "%s — Quran | Muminaat",
    default: "The Noble Quran",
  },
  description:
    "Read all 114 surahs of the Holy Quran with Arabic text, English translations by Saheeh International, and audio recitations by Mishary Rashid Alafasy and other renowned reciters.",
  keywords: [
    "Quran online",
    "read Quran",
    "Quran Arabic text",
    "Quran English translation",
    "Quran recitation",
    "Quran audio",
    "surah",
    "ayah",
    "Mishary Alafasy",
    "Islamic scripture",
    "Saheeh International",
    "Noble Quran",
  ],
  openGraph: {
    title: "The Noble Quran — Muminaat",
    description:
      "Read all 114 surahs with Arabic text, English translations, and audio recitations from renowned reciters.",
  },
};

export default function QuranLayout({ children }: { children: React.ReactNode }) {
  return <QuranProvider>{children}</QuranProvider>;
}
