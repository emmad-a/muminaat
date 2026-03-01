import { QuizState, QuizScore } from "@/types/viral";

const QUIZ_KEY = "muminaat_quiz";

const DEFAULT_STATE: QuizState = {
  todayScore: null,
  totalHasanahPoints: 0,
  history: [],
};

export function loadQuizState(): QuizState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(QUIZ_KEY);
    if (!raw) return DEFAULT_STATE;
    const state: QuizState = JSON.parse(raw);

    // Check if today's score exists
    const today = new Date().toISOString().split("T")[0];
    if (state.todayScore && state.todayScore.date !== today) {
      state.todayScore = null;
    }

    return state;
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveQuizScore(score: QuizScore): QuizState {
  const state = loadQuizState();

  const hasanahPoints = score.score * 10 + (score.score === score.total ? 5 : 0);
  score.hasanahPoints = hasanahPoints;

  state.todayScore = score;
  state.totalHasanahPoints += hasanahPoints;
  state.history.push(score);

  // Keep last 30 days of history
  if (state.history.length > 30) {
    state.history = state.history.slice(-30);
  }

  localStorage.setItem(QUIZ_KEY, JSON.stringify(state));
  return state;
}
