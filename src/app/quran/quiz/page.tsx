"use client";

import { useQuiz } from "@/hooks/useQuiz";
import QuizCard from "@/components/quran/QuizCard";

export default function QuizPage() {
  const {
    questions,
    currentIndex,
    quizState,
    showResult,
    selectedAnswer,
    selectAnswer,
    currentQuestion,
  } = useQuiz();

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-neutral-500">Loading quiz...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-gold-400/60 text-sm tracking-widest uppercase mb-3">Daily Challenge</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Quran Quiz</h1>
          <p className="text-neutral-400 text-sm">
            Test your knowledge · Earn Hasanah Points
          </p>
          {quizState && quizState.totalHasanahPoints > 0 && (
            <p className="text-gold-400 text-sm mt-2">
              Total: {quizState.totalHasanahPoints} Hasanah Points ✨
            </p>
          )}
        </div>

        {/* Quiz or Results */}
        {showResult && quizState?.todayScore ? (
          <div className="text-center">
            {/* Score Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-6">
              <div className="text-5xl font-bold text-gold-400 mb-2">
                {quizState.todayScore.score}/{quizState.todayScore.total}
              </div>
              <p className="text-neutral-400 mb-4">
                {quizState.todayScore.score === quizState.todayScore.total
                  ? "MashaAllah! Perfect score!"
                  : quizState.todayScore.score >= 3
                  ? "Great job! Keep learning!"
                  : "Keep going! Every effort counts."}
              </p>
              <div className="inline-flex items-center gap-2 bg-gold-500/10 px-4 py-2 rounded-full">
                <span className="text-gold-400 font-semibold">
                  +{quizState.todayScore.hasanahPoints} Hasanah Points
                </span>
                <span>✨</span>
              </div>
            </div>

            {/* Review Answers */}
            <div className="space-y-3 text-left">
              {questions.map((q, i) => {
                const userAnswer = quizState.todayScore!.answers[i];
                const isCorrect = userAnswer === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border ${
                      isCorrect ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
                    }`}
                  >
                    <p className="text-sm text-neutral-300 mb-1">{q.question}</p>
                    <p className={`text-sm font-medium ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                      {isCorrect ? "✓" : "✗"} Your answer: {q.options[userAnswer]}
                      {!isCorrect && (
                        <span className="text-green-400 ml-2">
                          (Correct: {q.options[q.correctIndex]})
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-neutral-500 text-sm mt-8">
              Come back tomorrow for a new quiz!
            </p>
          </div>
        ) : currentQuestion ? (
          <QuizCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelect={selectAnswer}
            questionNumber={currentIndex + 1}
            total={questions.length}
          />
        ) : null}
      </div>
    </div>
  );
}
