"use client";

import { useState } from "react";
import { ReportType } from "@/types/fiqh";
import { addReport } from "@/lib/review-store";

interface ReportIssueModalProps {
  questionId: string;
  questionText: string;
  onClose: () => void;
}

const REPORT_TYPES: { value: ReportType; label: string }[] = [
  { value: "incorrect_ruling", label: "Incorrect ruling" },
  { value: "wrong_evidence", label: "Wrong daleel/evidence" },
  { value: "madhab_error", label: "Madhab position error" },
  { value: "typo_formatting", label: "Typo/formatting" },
  { value: "other", label: "Other" },
];

export default function ReportIssueModal({
  questionId,
  questionText,
  onClose,
}: ReportIssueModalProps) {
  const [reportType, setReportType] = useState<ReportType>("incorrect_ruling");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    addReport(questionId, reportType, description.trim());
    setSubmitted(true);
    setTimeout(onClose, 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">JazakAllahu Khayran</div>
            <p className="text-gray-600">Your report has been submitted. May Allah reward you for helping improve accuracy.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Report an Issue
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                &times;
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
              {questionText}
            </p>

            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as ReportType)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
              >
                {REPORT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Please describe the issue
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., The Hanafi position on this issue should be..."
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
              />

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!description.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-gold-500 rounded-lg hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
