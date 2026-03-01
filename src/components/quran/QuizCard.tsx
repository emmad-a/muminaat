"use client";

import { QuizQuestion } from "@/types/viral";

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
  questionNumber: number;
  total: number;
}

export default function QuizCard({ question, selectedAnswer, onSelect, questionNumber, total }: QuizCardProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs text-neutral-500">Question {questionNumber} of {total}</span>
        <div className="flex gap-1">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`w-6 h-1 rounded-full transition-all ${
                i < questionNumber ? "bg-gold-400" : i === questionNumber - 1 ? "bg-gold-400" : "bg-neutral-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-8 leading-relaxed">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          let bgClass = "bg-neutral-800 border-neutral-700 hover:border-neutral-600 text-white";

          if (selectedAnswer !== null) {
            if (index === question.correctIndex) {
              bgClass = "bg-green-500/20 border-green-500/50 text-green-400";
            } else if (index === selectedAnswer && index !== question.correctIndex) {
              bgClass = "bg-red-500/20 border-red-500/50 text-red-400";
            } else {
              bgClass = "bg-neutral-800/50 border-neutral-700/50 text-neutral-600";
            }
          }

          return (
            <button
              key={index}
              onClick={() => onSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${bgClass} ${
                selectedAnswer === null ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-medium ${
                  selectedAnswer !== null && index === question.correctIndex
                    ? "border-green-500 text-green-400"
                    : selectedAnswer === index && index !== question.correctIndex
                    ? "border-red-500 text-red-400"
                    : "border-neutral-600 text-neutral-400"
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
