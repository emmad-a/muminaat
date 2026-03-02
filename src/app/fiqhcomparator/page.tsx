import type { Metadata } from "next";
import FiqhClient from "./FiqhClient";

export const metadata: Metadata = {
  title: "Fiqh Comparator — Compare Islamic Rulings Across Four Madhabs",
  description:
    "Compare Islamic rulings across the four Sunni madhabs — Hanafi, Maliki, Shafi'i, and Hanbali — with authentic evidence from Quran and Sunnah.",
  keywords: [
    "fiqh comparator",
    "Islamic rulings",
    "madhab comparison",
    "Hanafi",
    "Maliki",
    "Shafi'i",
    "Hanbali",
    "Islamic jurisprudence",
    "Quran evidence",
    "Sunnah evidence",
    "fatwa",
    "Islamic law",
  ],
  openGraph: {
    title: "Fiqh Comparator — Compare Islamic Rulings | Muminaat",
    description:
      "Compare rulings across all four Sunni madhabs with authentic evidence from Quran and Sunnah.",
  },
  alternates: {
    canonical: "/fiqhcomparator",
  },
};

export default function FiqhComparatorPage() {
  return <FiqhClient />;
}
