import type { MetadataRoute } from "next";

const BASE_URL = "https://muminaat.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/quran`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/fiqhcomparator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/quran/search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/quran/feelings`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/quran/quiz`, lastModified: new Date(), changeFrequency: "daily", priority: 0.5 },
  ];

  const surahPages: MetadataRoute.Sitemap = Array.from({ length: 114 }, (_, i) => ({
    url: `${BASE_URL}/quran/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...surahPages];
}
