"use client";

import { useState, useEffect, useCallback } from "react";
import { QuizQuestion, QuizState, QuizScore } from "@/types/viral";
import { generateDailyQuiz } from "@/data/quiz-bank";
import { loadQuizState, saveQuizScore } from "@/lib/quiz-store";

export function useQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    const qs = generateDailyQuiz();
    setQuestions(qs);
    const state = loadQuizState();
    setQuizState(state);
    if (state.todayScore) {
      setShowResult(true);
      setAnswers(state.todayScore.answers);
    }
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    if (selectedAnswer !== null) return; // Already answered
    setSelectedAnswer(answerIndex);

    // Wait 1.5 seconds then advance
    setTimeout(() => {
      const newAnswers = [...answers, answerIndex];
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Quiz complete — calculate score
        const score = newAnswers.reduce(
          (acc, ans, idx) => acc + (ans === questions[idx].correctIndex ? 1 : 0),
          0
        );
        const today = new Date().toISOString().split("T")[0];
        const quizScore: QuizScore = {
          date: today,
          score,
          total: questions.length,
          hasanahPoints: 0,
          answers: newAnswers,
        };
        const newState = saveQuizScore(quizScore);
        setQuizState(newState);
        setShowResult(true);
      }
    }, 1500);
  }, [selectedAnswer, answers, currentIndex, questions]);

  const alreadyCompleted = quizState?.todayScore !== null && quizState?.todayScore !== undefined;

  return {
    questions,
    currentIndex,
    answers,
    quizState,
    showResult,
    selectedAnswer,
    selectAnswer,
    alreadyCompleted,
    currentQuestion: questions[currentIndex] || null,
  };
}
