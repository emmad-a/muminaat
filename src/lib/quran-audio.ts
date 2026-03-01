/**
 * Audio URL builders and reciter configuration
 */

import { Reciter } from "@/types/quran";

export const RECITERS: Reciter[] = [
  {
    id: "alafasy",
    name: "Mishary Rashid Alafasy",
    nameArabic: "مشاري راشد العفاسي",
    everyAyahPath: "Alafasy_128kbps",
    cdnSlug: "ar.alafasy",
    mp3QuranPath: "server8.mp3quran.net/afs",
    quranCdnId: 7,
  },
  {
    id: "basit",
    name: "Abdul Basit (Murattal)",
    nameArabic: "عبد الباسط عبد الصمد",
    everyAyahPath: "Abdul_Basit_Murattal_192kbps",
    cdnSlug: "ar.abdulbasitmurattal",
    mp3QuranPath: "server7.mp3quran.net/basit",
    quranCdnId: 2,
  },
  {
    id: "husary",
    name: "Mahmoud Khalil Al-Husary",
    nameArabic: "محمود خليل الحصري",
    everyAyahPath: "Husary_128kbps",
    cdnSlug: "ar.husary",
    mp3QuranPath: "server13.mp3quran.net/husr",
    quranCdnId: 6,
  },
  {
    id: "sudais",
    name: "Abdurrahman As-Sudais",
    nameArabic: "عبدالرحمن السديس",
    everyAyahPath: "Abdurrahmaan_As-Sudais_192kbps",
    cdnSlug: "ar.abdurrrahmaansudais",
    mp3QuranPath: "server11.mp3quran.net/sds",
    quranCdnId: 3,
  },
];

const EVERYAYAH_BASE = "https://everyayah.com/data";

function pad(n: number, len: number): string {
  return String(n).padStart(len, "0");
}

export function getAyahAudioUrl(reciter: Reciter, surah: number, ayah: number): string {
  return `${EVERYAYAH_BASE}/${reciter.everyAyahPath}/${pad(surah, 3)}${pad(ayah, 3)}.mp3`;
}

export function getFullSurahAudioUrl(reciter: Reciter, surah: number): string {
  return `https://${reciter.mp3QuranPath}/${pad(surah, 3)}.mp3`;
}

export function getReciterById(id: string): Reciter {
  return RECITERS.find((r) => r.id === id) || RECITERS[0];
}

export function buildPlaylist(surah: number, totalAyahs: number, reciter: Reciter): string[] {
  const urls: string[] = [];
  for (let i = 1; i <= totalAyahs; i++) {
    urls.push(getAyahAudioUrl(reciter, surah, i));
  }
  return urls;
}

export function preloadAudio(url: string): void {
  const audio = new Audio();
  audio.preload = "auto";
  audio.src = url;
}
