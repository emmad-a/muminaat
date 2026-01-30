import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muminaat - Fiqh Comparator | Compare Islamic Rulings Across Madhabs",
  description:
    "Compare Islamic fiqh rulings across the four Sunni madhabs (Hanafi, Maliki, Shafi'i, Hanbali). Authentic scholarly positions with evidence from Quran and Sunnah.",
  keywords: [
    "Islamic fiqh",
    "madhab comparison",
    "Hanafi",
    "Maliki",
    "Shafi'i",
    "Hanbali",
    "Islamic rulings",
    "prayer",
    "wudu",
    "salah",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
