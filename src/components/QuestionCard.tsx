"use client";

import { FiqhQuestion } from "@/types/fiqh";
import MadhabCard from "./MadhabCard";

interface QuestionCardProps {
  question: FiqhQuestion;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Question Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5">
        <h2 className="text-xl font-bold text-white mb-1">{question.question}</h2>
        {question.questionArabic && (
          <p className="text-emerald-100 font-arabic text-lg text-right" dir="rtl">
            {question.questionArabic}
          </p>
        )}
      </div>

      {/* Madhab Positions Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <MadhabCard madhab="hanafi" position={question.positions.hanafi} />
          <MadhabCard madhab="maliki" position={question.positions.maliki} />
          <MadhabCard madhab="shafii" position={question.positions.shafii} />
          <MadhabCard madhab="hanbali" position={question.positions.hanbali} />
        </div>

        {/* Consensus Section */}
        {question.consensus && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚖️</span>
              <h3 className="font-semibold text-gray-800">Scholarly Consensus</h3>
            </div>
            <p className="text-gray-600">{question.consensus}</p>
          </div>
        )}

        {/* Modern Scholars Section */}
        {question.modernScholars && question.modernScholars.length > 0 && (
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📚</span>
              <h3 className="font-semibold text-blue-800">Modern Scholarly Views</h3>
            </div>
            <ul className="text-blue-700 space-y-1">
              {question.modernScholars.map((view, index) => (
                <li key={index}>• {view}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Sources */}
        {question.sources && question.sources.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Sources
            </h4>
            <div className="flex flex-wrap gap-2">
              {question.sources.map((source, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
