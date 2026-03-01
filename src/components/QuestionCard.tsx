"use client";

import { useState, useEffect } from "react";
import { FiqhQuestion, ReviewStatus } from "@/types/fiqh";
import MadhabCard from "./MadhabCard";
import ReportIssueModal from "./ReportIssueModal";
import { getReviewStatus } from "@/lib/review-store";

interface QuestionCardProps {
  question: FiqhQuestion;
}

function ReviewBadge({ status }: { status: ReviewStatus }) {
  if (status === "unreviewed") return null;

  const config = {
    scholar_verified: { dot: "bg-blue-400", text: "Scholar Verified", bg: "bg-blue-500/20" },
    ai_audited: { dot: "bg-yellow-400", text: "AI Checked", bg: "bg-yellow-500/20" },
    needs_correction: { dot: "bg-red-400", text: "Under Review", bg: "bg-red-500/20" },
  } as const;

  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium text-white/90 ${c.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.text}
    </span>
  );
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>("unreviewed");

  useEffect(() => {
    setReviewStatus(getReviewStatus(question.id));
  }, [question.id]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Question Header */}
      <div className="bg-gradient-to-r from-neutral-900 to-black px-6 py-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-white mb-1">{question.question}</h2>
          <ReviewBadge status={reviewStatus} />
        </div>
        {question.questionArabic && (
          <p className="text-gold-300/70 font-arabic text-lg text-right" dir="rtl">
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

        {/* Report Issue */}
        <div className="border-t pt-3 mt-4 flex justify-end">
          <button
            onClick={() => setShowReportModal(true)}
            className="text-xs text-gray-400 hover:text-gold-500 transition-colors"
          >
            Report an Issue
          </button>
        </div>
      </div>

      {showReportModal && (
        <ReportIssueModal
          questionId={question.id}
          questionText={question.question}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
}
