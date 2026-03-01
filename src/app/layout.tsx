import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muminaat — Quran & Islamic Scholarship",
  description:
    "Read the Quran with Arabic text, English translations, and audio recitations. Compare fiqh rulings across the four Sunni madhabs.",
  keywords: [
    "Quran",
    "Islamic",
    "Muminaat",
    "fiqh",
    "madhab",
    "Hanafi",
    "Maliki",
    "Shafi'i",
    "Hanbali",
    "recitation",
    "Arabic",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('muminaat_quran_settings');
                if (theme) {
                  const parsed = JSON.parse(theme);
                  if (parsed.theme === 'dark' || (parsed.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#fafafa] dark:bg-black">{children}</body>
    </html>
  );
}
