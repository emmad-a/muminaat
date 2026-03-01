"use client";

import { useState, useEffect } from "react";
import { ALL_QUESTIONS } from "@/data/questions";
import { ReviewStatus, ReportType, UserReport } from "@/types/fiqh";
import {
  getReviewStats,
  getAllReports,
  getReviewStatus,
  setReviewStatus,
  updateReportStatus,
} from "@/lib/review-store";

const STATUS_LABELS: Record<ReviewStatus, { label: string; color: string; icon: string }> = {
  unreviewed: { label: "Unreviewed", color: "bg-gray-100 text-gray-700", icon: "" },
  ai_audited: { label: "AI Checked", color: "bg-yellow-100 text-yellow-800", icon: "Y" },
  scholar_verified: { label: "Scholar Verified", color: "bg-blue-100 text-blue-800", icon: "B" },
  needs_correction: { label: "Under Review", color: "bg-red-100 text-red-800", icon: "R" },
};

const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  incorrect_ruling: "Incorrect ruling",
  wrong_evidence: "Wrong daleel/evidence",
  madhab_error: "Madhab position error",
  typo_formatting: "Typo/formatting",
  other: "Other",
};

export default function AdminPage() {
  const [stats, setStats] = useState<Record<ReviewStatus, number>>({
    unreviewed: 0,
    ai_audited: 0,
    scholar_verified: 0,
    needs_correction: 0,
  });
  const [reports, setReports] = useState<UserReport[]>([]);
  const [questionStatuses, setQuestionStatuses] = useState<Record<string, ReviewStatus>>({});
  const [activeTab, setActiveTab] = useState<"overview" | "reports" | "questions">("overview");
  const [topicFilter, setTopicFilter] = useState<string>("");

  useEffect(() => {
    setStats(getReviewStats(ALL_QUESTIONS.length));
    setReports(getAllReports());
    const statuses: Record<string, ReviewStatus> = {};
    for (const q of ALL_QUESTIONS) {
      statuses[q.id] = getReviewStatus(q.id);
    }
    setQuestionStatuses(statuses);
  }, []);

  function handleStatusChange(questionId: string, newStatus: ReviewStatus) {
    setReviewStatus(questionId, newStatus);
    setQuestionStatuses((prev) => ({ ...prev, [questionId]: newStatus }));
    setStats(getReviewStats(ALL_QUESTIONS.length));
  }

  function handleReportStatusChange(
    questionId: string,
    reportDate: string,
    newStatus: "pending" | "reviewed" | "resolved",
  ) {
    updateReportStatus(questionId, reportDate, newStatus);
    setReports(getAllReports());
  }

  const topics = Array.from(new Set(ALL_QUESTIONS.map((q) => q.topic))).sort();
  const filteredQuestions = topicFilter
    ? ALL_QUESTIONS.filter((q) => q.topic === topicFilter)
    : ALL_QUESTIONS;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-2">
                <span className="font-logo text-gold-400 text-lg leading-none">مومنات</span>
                <span className="font-bold text-gray-900">Muminaat</span>
              </a>
              <span className="text-gray-300">|</span>
              <span className="text-sm font-medium text-gray-500">Admin Dashboard</span>
            </div>
            <a href="/" className="text-sm text-gold-500 hover:text-gold-600">
              Back to App
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-400">{stats.unreviewed}</div>
            <div className="text-sm text-gray-500">Unreviewed</div>
          </div>
          <div className="bg-white rounded-xl border border-yellow-200 p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.ai_audited}</div>
            <div className="text-sm text-yellow-700">AI Checked</div>
          </div>
          <div className="bg-white rounded-xl border border-blue-200 p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.scholar_verified}</div>
            <div className="text-sm text-blue-700">Scholar Verified</div>
          </div>
          <div className="bg-white rounded-xl border border-red-200 p-4">
            <div className="text-2xl font-bold text-red-600">{stats.needs_correction}</div>
            <div className="text-sm text-red-700">Needs Correction</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
          {(["overview", "reports", "questions"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "overview" ? "Overview" : tab === "reports" ? `Reports (${reports.length})` : "Questions"}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Review Progress</h2>
            <div className="space-y-3">
              {(Object.entries(stats) as [ReviewStatus, number][]).map(([status, count]) => {
                const pct = Math.round((count / ALL_QUESTIONS.length) * 100);
                const colors = {
                  unreviewed: "bg-gray-300",
                  ai_audited: "bg-yellow-400",
                  scholar_verified: "bg-blue-500",
                  needs_correction: "bg-red-400",
                };
                return (
                  <div key={status}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{STATUS_LABELS[status].label}</span>
                      <span className="text-gray-500">{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${colors[status]}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t text-sm text-gray-500">
              Total: {ALL_QUESTIONS.length} questions across {topics.length} topics
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {reports.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-3xl mb-2">No reports yet</div>
                <p className="text-sm">User-submitted issue reports will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Question ID</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Type</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Description</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {reports.map((report, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {new Date(report.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-600">
                          {report.questionId}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            {REPORT_TYPE_LABELS[report.type]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 max-w-md truncate">
                          {report.description}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={report.status}
                            onChange={(e) =>
                              handleReportStatusChange(
                                report.questionId,
                                report.date,
                                e.target.value as "pending" | "reviewed" | "resolved",
                              )
                            }
                            className="text-xs border border-gray-200 rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === "questions" && (
          <div>
            {/* Topic filter */}
            <div className="mb-4">
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">All topics ({ALL_QUESTIONS.length})</option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t} ({ALL_QUESTIONS.filter((q) => q.topic === t).length})
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">ID</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Question</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Topic</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Review Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredQuestions.map((q) => (
                      <tr key={q.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">
                          {q.id}
                        </td>
                        <td className="px-4 py-3 text-gray-700 max-w-sm truncate">
                          {q.question}
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {q.topic}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={questionStatuses[q.id] ?? "unreviewed"}
                            onChange={(e) =>
                              handleStatusChange(q.id, e.target.value as ReviewStatus)
                            }
                            className={`text-xs border rounded px-2 py-1 ${STATUS_LABELS[questionStatuses[q.id] ?? "unreviewed"].color}`}
                          >
                            <option value="unreviewed">Unreviewed</option>
                            <option value="ai_audited">AI Checked</option>
                            <option value="scholar_verified">Scholar Verified</option>
                            <option value="needs_correction">Needs Correction</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
