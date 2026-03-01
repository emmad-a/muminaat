import { QuizQuestion } from "@/types/viral";

// Surah data for quiz generation
const SURAH_DATA: { num: number; name: string; ayahs: number; type: "Meccan" | "Medinan" }[] = [
  { num: 1, name: "Al-Fatihah", ayahs: 7, type: "Meccan" },
  { num: 2, name: "Al-Baqarah", ayahs: 286, type: "Medinan" },
  { num: 3, name: "Ali 'Imran", ayahs: 200, type: "Medinan" },
  { num: 4, name: "An-Nisa", ayahs: 176, type: "Medinan" },
  { num: 5, name: "Al-Ma'idah", ayahs: 120, type: "Medinan" },
  { num: 18, name: "Al-Kahf", ayahs: 110, type: "Meccan" },
  { num: 19, name: "Maryam", ayahs: 98, type: "Meccan" },
  { num: 36, name: "Ya-Sin", ayahs: 83, type: "Meccan" },
  { num: 55, name: "Ar-Rahman", ayahs: 78, type: "Medinan" },
  { num: 56, name: "Al-Waqi'ah", ayahs: 96, type: "Meccan" },
  { num: 67, name: "Al-Mulk", ayahs: 30, type: "Meccan" },
  { num: 72, name: "Al-Jinn", ayahs: 28, type: "Meccan" },
  { num: 78, name: "An-Naba", ayahs: 40, type: "Meccan" },
  { num: 93, name: "Ad-Duhaa", ayahs: 11, type: "Meccan" },
  { num: 94, name: "Ash-Sharh", ayahs: 8, type: "Meccan" },
  { num: 96, name: "Al-'Alaq", ayahs: 19, type: "Meccan" },
  { num: 112, name: "Al-Ikhlas", ayahs: 4, type: "Meccan" },
  { num: 113, name: "Al-Falaq", ayahs: 5, type: "Meccan" },
  { num: 114, name: "An-Nas", ayahs: 6, type: "Meccan" },
  { num: 110, name: "An-Nasr", ayahs: 3, type: "Medinan" },
  { num: 108, name: "Al-Kawthar", ayahs: 3, type: "Meccan" },
  { num: 103, name: "Al-'Asr", ayahs: 3, type: "Meccan" },
  { num: 12, name: "Yusuf", ayahs: 111, type: "Meccan" },
  { num: 24, name: "An-Nur", ayahs: 64, type: "Medinan" },
  { num: 29, name: "Al-'Ankabut", ayahs: 69, type: "Meccan" },
  { num: 32, name: "As-Sajdah", ayahs: 30, type: "Meccan" },
  { num: 48, name: "Al-Fath", ayahs: 29, type: "Medinan" },
  { num: 57, name: "Al-Hadid", ayahs: 29, type: "Medinan" },
  { num: 87, name: "Al-A'la", ayahs: 19, type: "Meccan" },
  { num: 99, name: "Az-Zalzalah", ayahs: 8, type: "Medinan" },
];

const FAKE_SURAHS = [
  "Al-Qaswah", "An-Nujum", "Al-Barakah", "As-Sakinah",
  "Al-Hikmah", "At-Tawfiq", "Al-Fadilah", "An-Najah",
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generateDailyQuiz(dateString?: string): QuizQuestion[] {
  const date = dateString || new Date().toISOString().split("T")[0];
  const seed = date.split("-").reduce((acc, part) => acc * 100 + parseInt(part), 0);
  const rng = seededRandom(seed);

  const questions: QuizQuestion[] = [];
  const shuffledSurahs = shuffle(SURAH_DATA, rng);

  // Question 1: How many ayahs does surah X have?
  const s1 = shuffledSurahs[0];
  const wrongAyahs = [s1.ayahs + Math.floor(rng() * 20) - 10, s1.ayahs + Math.floor(rng() * 30), s1.ayahs - Math.floor(rng() * 15)].map(n => Math.max(3, n));
  const opts1 = shuffle([String(s1.ayahs), ...wrongAyahs.map(String)], rng);
  questions.push({
    id: `${date}-1`,
    type: "surah_ayah_count",
    question: `How many ayahs are in Surah ${s1.name}?`,
    options: opts1,
    correctIndex: opts1.indexOf(String(s1.ayahs)),
  });

  // Question 2: Meccan or Medinan?
  const s2 = shuffledSurahs[1];
  questions.push({
    id: `${date}-2`,
    type: "meccan_medinan",
    question: `Is Surah ${s2.name} Meccan or Medinan?`,
    options: ["Meccan", "Medinan"],
    correctIndex: s2.type === "Meccan" ? 0 : 1,
  });

  // Question 3: What number is surah X?
  const s3 = shuffledSurahs[2];
  const wrongNums = [s3.num + Math.floor(rng() * 10), s3.num - Math.floor(rng() * 8), s3.num + Math.floor(rng() * 20)].map(n => Math.max(1, Math.min(114, n)));
  const opts3 = shuffle([String(s3.num), ...wrongNums.map(String)], rng);
  questions.push({
    id: `${date}-3`,
    type: "surah_number",
    question: `What is the surah number of ${s3.name}?`,
    options: opts3,
    correctIndex: opts3.indexOf(String(s3.num)),
  });

  // Question 4: Which is NOT a real surah?
  const realSurahs = shuffledSurahs.slice(3, 6).map(s => s.name);
  const fakeSurah = FAKE_SURAHS[Math.floor(rng() * FAKE_SURAHS.length)];
  const opts4 = shuffle([...realSurahs, fakeSurah], rng);
  questions.push({
    id: `${date}-4`,
    type: "not_a_surah",
    question: "Which of these is NOT a surah in the Quran?",
    options: opts4,
    correctIndex: opts4.indexOf(fakeSurah),
  });

  // Question 5: Meccan or Medinan? (another one)
  const s5 = shuffledSurahs[6] || shuffledSurahs[3];
  questions.push({
    id: `${date}-5`,
    type: "meccan_medinan",
    question: `Is Surah ${s5.name} Meccan or Medinan?`,
    options: ["Meccan", "Medinan"],
    correctIndex: s5.type === "Meccan" ? 0 : 1,
  });

  return questions;
}
