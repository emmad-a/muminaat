import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://muminaat.vercel.app"),
  title: {
    template: "%s | Muminaat",
    default: "Muminaat — Quran & Islamic Scholarship",
  },
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
    "Quran online",
    "Islamic scholarship",
    "Quran translation",
    "Quran audio",
  ],
  openGraph: {
    type: "website",
    siteName: "Muminaat",
    title: "Muminaat — Quran & Islamic Scholarship",
    description:
      "Read the Quran with Arabic text, English translations, and audio recitations. Compare fiqh rulings across the four Sunni madhabs.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Muminaat — Quran & Islamic Scholarship",
    description:
      "Read the Quran with Arabic text, English translations, and audio recitations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
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
      <body className="min-h-screen bg-[#fafafa] dark:bg-black">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
